# AGENTS.md — Guide for AI Coding Agents

This repository contains educational materials for the **Geometria Analítica: Sobrevivência Geométrica** course (Analytic Geometry: Geometric Survival), developed by Prof. Angelo Mondaini Calvão for engineering courses at IPRJ/UERJ.

All materials follow a **post-apocalyptic theme** inspired by survival games, with serious educational tone and subtle humor.

---

## Repository Structure

| Directory | Content |
|-----------|---------|
| `exercicios/` | Interactive HTML exercise lists |
| `slide-decks/` | Reveal.js presentations per chapter |
| `provas/` | Exams, answer keys, and answer sheets |
| `visualizacoes/` | Standalone interactive visualizations |
| `games/` | Themed educational games |
| `notas/` | Student grade sheets by semester |

---

## Build/Test/Lint Commands

### Local Development Server

```bash
# Start local web server for testing (from repository root)
python3 -m http.server 8080

# Access exercises: http://localhost:8080/exercicios/capitulo-i-o-espaco-vetorial-r2/1-conjunto-r2.html
# Access slides: http://localhost:8080/slide-decks/capitulo-i.html#/3/1
```

### Testing Individual Files

No automated test suite exists. Manual verification required:
1. Start local server: `python3 -m http.server 8080`
2. Open file in browser
3. Verify MathJax rendering, layout, interactivity
4. For slides with Reveal.js, check all navigation directions

---

## Code Style Guidelines

### General Conventions

- **File naming**: lowercase kebab-case (e.g., `p1-2025-1.html`, `capitulo-i.html`)
- **Language**: Portuguese (pt-BR) for all content
- **No calculus**: Onlyalgebra, geometry, and basic trigonometry
- **Reference textbook**: MACHADO, A. S. *Álgebra linear e geometria analítica*. 2. ed. Atual, 1982.

### Mathematical Notation (Mandatory)

| Element | Correct | Wrong |
|---------|---------|-------|
| Points | `$A$`, `$B$`, `$P(x_0, y_0)$` | `$a$`, `$b$` (lowercase) |
| Vectors | `\vec{v}` → $\vec{v}$ | `**v**` or `\mathbf{v}` |
| Vector indices | `\vec{v}_1` | `\vec{v_1}` |
| Canonical vectors | `\vec{e}_1, \vec{e}_2, \vec{e}_3` OR `\vec{i}, \vec{j}, \vec{k}` | Never reuse i, j, k as other variables |
| Decimal separator | `$0{,}6$` (comma) | `$0.6$` (period) |
| Foci (conics) | `$F_1$`, `$F_2$` (LaTeX) | `F₁`, `F₂` (Unicode) |

### CSS Color Palette (Do NOT create new colors)

| Color | Hex | Usage |
|-------|-----|-------|
| Terminal green | `#4caf50` | Borders, titles, main elements |
| Dark background | `#0c0c0c` | Page background |
| Light text | `#e6e6e6` | Body text |
| Yellow | `#ffeb3b` | `<code>` highlighting |
| Orange | `#ff9800` | `.warning` class |
| Red | `#f44336` | `.danger` class |
| Light green | `#8bc34a` | `.success` class |
| Internal background | `#1c1c1c` | `<details>`, internal blocks |

---

## Content Rules by Directory

### Exercises (`exercicios/`)

1. **Three-file pattern required per topic:**
   - `<topico>-manual.html` — Theory, formulas, general guidance
   - `<topico>-enunciados.html` — Exercises, statements, solutions
   - `<topico>.html` — Loader that aggregates manual + exercises

2. **Mandatory blocks with data attributes:**
   - `<section class="manual-contexto" data-context="manual-sobrevivencia">` for theory
   - `<section class="enunciados-exercicios" data-context="exercicios-enunciados">` for exercises

3. **Exercise count:** Exactly 12 exercises per topic with difficulty progression:
   - Q1–Q3: Basic, with explicit hints
   - Q4–Q6: Intermediate, some hints
   - Q7–Q9: Advanced, minimal hints
   - Q10–Q12: Challenging, no hints, multiple concepts

4. **Hint/Solution structure:**
   ```html
   <details class="hint-details">
     <summary>DICA DE SOBREVIVÊNCIA</summary>
     ...
   </details>
   <details>
     <summary>ACESSO NÍVEL: SUPERVISOR</summary>
     ...solution...
   </details>
   ```

5. **Template:** Use `exercicios/template.html` as base

### Slide Decks (`slide-decks/`)

1. **CSS Rule (CRITICAL):** NEVER add inline styles or `<style>` blocks. Use ONLY classes from `slide-decks/styles.css`

2. **Navigation structure:**
   - Horizontal: Between main topics
   - Vertical: Deepening within each topic

3. **Slide type classes:** `mission-briefing`, `field-report`, `simulator`, `survival-training`, `debriefing`

4. **JavaScript pattern:** Always use IIFE to avoid global scope leakage:
   ```javascript
   (function() {
     function init() {
       const canvas = document.getElementById('[topic]-canvas');
       if (!canvas) return;
       // ...
     }
     document.addEventListener('DOMContentLoaded', init);
   })();
   ```

5. **Template:** Use `slide-decks/template.html` as base

6. **Visual verification required:** See `/slide-decks/AGENTS.md` for mandatory screenshot verification workflow

### Exams (`provas/`)

1. **Mandatory workflow (DO NOT skip steps):**
   - Collect exam type (P1, P2, PS, PF) and topics
   - Propose detailed plan and await explicit approval
   - Only then generate the three HTML files

2. **Exam structure:**
   - 4 questions, total 10.0 points, each question worth 2.5 points
   - Each question has 2–4 items with variable scoring
   - Last item should be a verification task when possible

3. **Output files:**
   - `{type}-{year}-{semester}.html` — Exam (from `template-prova.html`)
   - `gabarito-{type}-{year}-{semester}.html` — Answer key
   - `folha-{type}-{year}-{semester}.html` — Answer sheet

---

## Cursor Rules Integration

The following Cursor rule files are automatically applied:
- `.cursor/rules/exercicios.mdc` — For `exercicios/**/*.html`
- `.cursor/rules/slides.mdc` — For `slide-decks/**/*.html`
- `.cursor/rules/provas.mdc` — For `provas/**/*.html`

These rules contain essential guidelines. Reference `ESTILO.md` for complete notation reference and `AGENTES.md` forhigh-level structure.

---

## Quality Checklist

Before any commit, verify:

- [ ] Mathematical notation uses correct LaTeX (points uppercase, vectors with `\vec{}`)
- [ ] No new CSS — only existing classes from template stylesheets
- [ ] Decimal numbers use comma: `$0{,}5$` not `$0.5$`
- [ ] No calculus concepts — only algebra/geometry/trigonometry
- [ ] Exercise difficulty follows Q1–Q12 progression pattern
- [ ] Hints use `<details class="hint-details">` structure
- [ ] Files named in lowercase kebab-case
- [ ] For slides: verified visually via screenshot (see `slide-decks/AGENTS.md`)

---

## Reference Documents

- `ESTILO.md` — Complete style guide for mathematical notation
- `AGENTES.md` — Portuguese version of this guide
- `README.md` — Course overview and content index
- `exercicios/prompt.md` — Detailed exercise creation reference
- `slide-decks/prompt.md` — Detailed slide creation reference