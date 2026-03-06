#!/usr/bin/env python3
"""
Split monolithic exercise HTML files into individual exercise files
with a manifest-based loader pattern.

Handles two cases:
  A) Inline files (chapters I-VI): theory + exercises all in one HTML file
  B) Loader files (chapter 0): already uses fetch → already converted, skip

Usage:
    python3 scripts/split-exercises.py              # process all chapters
    python3 scripts/split-exercises.py --dry-run    # preview without writing
"""

import os
import re
import sys
import unicodedata
from pathlib import Path
from bs4 import BeautifulSoup, Comment, NavigableString

EXERCICIOS_ROOT = Path(__file__).resolve().parent.parent / "exercicios"

LOADER_SCRIPT = '''    const MANUAL = "{manual_file}";
    const EXERCICIOS = [
{exercise_list}
    ];

    async function carregarManual(arquivo) {{
        const container = document.getElementById('manual-container');
        if (!container) return;
        try {{
            const resposta = await fetch(arquivo);
            if (!resposta.ok) throw new Error(`Falha ao carregar ${{arquivo}}`);
            container.innerHTML = await resposta.text();
        }} catch (erro) {{
            container.innerHTML = `<div class="terminal-border"><p class="danger">Erro ao carregar ${{arquivo}}.</p></div>`;
            console.error(erro);
        }}
    }}

    async function carregarExercicios(exercicios) {{
        const container = document.getElementById('exercicios-container');
        if (!container) return;

        container.innerHTML = `
            <section class="enunciados-exercicios" data-context="exercicios-enunciados">
                <div class="terminal-border">
                    <h2 class="terminal-line">> MISSÕES E ENUNCIADOS</h2>
                    <div class="mission-counter" id="mission-container"></div>
                </div>
            </section>`;

        const missionContainer = document.getElementById('mission-container');
        for (const arquivo of exercicios) {{
            try {{
                const resposta = await fetch(arquivo);
                if (!resposta.ok) throw new Error(`Falha ao carregar ${{arquivo}}`);
                missionContainer.insertAdjacentHTML('beforeend', await resposta.text());
            }} catch (erro) {{
                missionContainer.insertAdjacentHTML('beforeend',
                    `<div class="exercise"><p class="danger">Erro ao carregar ${{arquivo}}.</p></div>`);
                console.error(erro);
            }}
        }}
    }}

    document.addEventListener('DOMContentLoaded', async () => {{
        await carregarManual(MANUAL);
        await carregarExercicios(EXERCICIOS);

        if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {{
            await window.MathJax.typesetPromise();
        }}
    }});'''


def slugify(text):
    text = unicodedata.normalize('NFD', text)
    text = text.encode('ascii', 'ignore').decode('ascii')
    text = text.lower()
    text = re.sub(r'^missao\s+\d+\s*:\s*', '', text)
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s]+', '-', text.strip())
    text = re.sub(r'-+', '-', text)
    return text


def extract_manual_content(terminal_border, mission_counter):
    """Extract theory content from terminal-border, before mission-counter."""
    parts = []
    for child in terminal_border.children:
        if child is mission_counter:
            break
        if isinstance(child, Comment):
            continue
        s = str(child)
        if isinstance(child, NavigableString) and not child.strip():
            continue
        parts.append(s)
    return '\n'.join(parts)


def extract_exercises(mission_counter):
    """Extract all exercise divs from mission-counter."""
    return mission_counter.find_all('div', class_='exercise', recursive=False)


def build_manual_file(manual_content):
    return (
        '<section class="manual-contexto" data-context="manual-sobrevivencia">\n'
        '    <div class="terminal-border">\n'
        f'    {manual_content}\n'
        '\n    </div>\n'
        '</section>\n'
    )


def build_loader(head_str, frame_str, footer_str, script_content):
    return (
        '<!DOCTYPE html>\n'
        '<html lang="pt-BR">\n'
        f'{head_str}\n'
        '<body>\n'
        '    <!-- TÍTULO E INTRODUÇÃO -->\n'
        f'    {frame_str}\n'
        '\n'
        '        <div id="manual-container"></div>\n'
        '\n'
        '    <div id="exercicios-container"></div>\n'
        '\n'
        '    <script>\n'
        f'{script_content}\n'
        '    </script>\n'
        '\n'
        '\n'
        '    <!-- RODAPÉ DO DOCUMENTO -->\n'
        f'    {footer_str}\n'
        '</body>\n'
        '</html>\n'
    )


def process_file(filepath, dry_run=False):
    """Process a single HTML file. Returns number of exercises extracted."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'const EXERCICIOS' in content:
        return -1  # already converted

    soup = BeautifulSoup(content, 'html.parser')
    mission_counter = soup.find('div', class_='mission-counter')

    if not mission_counter:
        return 0

    exercises = extract_exercises(mission_counter)
    if not exercises:
        return 0

    filepath = Path(filepath)
    base_dir = filepath.parent
    topic_name = filepath.stem
    exercise_dir = base_dir / topic_name
    manual_filepath = base_dir / f"{topic_name}-manual.html"

    # Find structural elements
    terminal_border = mission_counter.find_parent('div', class_='terminal-border')
    if not terminal_border:
        terminal_border = mission_counter.parent

    head = soup.find('head')
    terminal_frame = soup.find('div', class_='terminal-frame')
    footer = soup.find('div', class_='footer')

    if not head or not terminal_frame:
        print(f"    WARNING: missing head or terminal-frame, skipping")
        return 0

    # Extract manual content
    manual_content = extract_manual_content(terminal_border, mission_counter)
    manual_html = build_manual_file(manual_content)

    # Extract exercises into files
    exercise_files = []
    seen_slugs = set()

    for i, ex in enumerate(exercises, 1):
        h3 = ex.find('h3')
        title = h3.get_text(strip=True) if h3 else ''
        slug = slugify(title) if title else f"exercicio-{i:02d}"
        if not slug:
            slug = f"exercicio-{i:02d}"

        base_slug = slug
        counter = 2
        while slug in seen_slugs:
            slug = f"{base_slug}-{counter}"
            counter += 1
        seen_slugs.add(slug)

        ex_filename = f"{slug}.html"
        ex_filepath = exercise_dir / ex_filename
        exercise_files.append((ex_filepath, str(ex) + '\n'))

    # Build loader
    ex_list = ',\n'.join(f'        "{topic_name}/{ef.name}"' for ef, _ in exercise_files)
    script_content = LOADER_SCRIPT.format(
        manual_file=f"{topic_name}-manual.html",
        exercise_list=ex_list,
    )
    loader_html = build_loader(
        str(head),
        str(terminal_frame),
        str(footer) if footer else '<div class="footer">REFÚGIO-TEC</div>',
        script_content,
    )

    if dry_run:
        print(f"    Would create: {manual_filepath.name}")
        print(f"    Would create: {exercise_dir.name}/ ({len(exercise_files)} files)")
        for ef, _ in exercise_files:
            print(f"      - {ef.name}")
        print(f"    Would update: {filepath.name}")
        return len(exercise_files)

    # Write files
    exercise_dir.mkdir(exist_ok=True)

    with open(manual_filepath, 'w', encoding='utf-8') as f:
        f.write(manual_html)

    for ef_path, ef_content in exercise_files:
        with open(ef_path, 'w', encoding='utf-8') as f:
            f.write(ef_content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(loader_html)

    return len(exercise_files)


def main():
    dry_run = '--dry-run' in sys.argv

    if not EXERCICIOS_ROOT.is_dir():
        print(f"ERROR: {EXERCICIOS_ROOT} not found")
        sys.exit(1)

    if dry_run:
        print("=== DRY RUN MODE (no files will be written) ===\n")

    total_exercises = 0
    total_topics = 0

    for chapter_dir in sorted(EXERCICIOS_ROOT.iterdir()):
        if not chapter_dir.is_dir() or chapter_dir.name.startswith('.'):
            continue

        print(f"\n{'=' * 60}")
        print(f"  {chapter_dir.name}")
        print(f"{'=' * 60}")

        for html_file in sorted(chapter_dir.glob('*.html')):
            if html_file.name.endswith('-manual.html'):
                continue
            if html_file.name in ('index.html',):
                continue

            count = process_file(html_file, dry_run=dry_run)

            if count == -1:
                print(f"  SKIP  {html_file.name} (already converted)")
            elif count == 0:
                print(f"  SKIP  {html_file.name} (no exercises)")
            else:
                total_topics += 1
                total_exercises += count
                print(f"  DONE  {html_file.name} → {count} exercises")

    print(f"\n{'=' * 60}")
    print(f"  TOTAL: {total_topics} topics, {total_exercises} exercises")
    print(f"{'=' * 60}")


if __name__ == '__main__':
    main()
