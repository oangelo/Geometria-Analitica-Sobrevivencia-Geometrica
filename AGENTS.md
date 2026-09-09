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

## Git Worktrees (Feature Branches)

This repo uses Git worktrees organized by content type. Each worktree has its own branch for independent development.

### Structure

```
Geometria-Analitica-Sobrevivencia-Geometrica/
├── worktrees/
│   ├── exercicios/   → branch 'feature/exercicios'
│   ├── slides/       → branch 'feature/slides'
│   └── provas/       → branch 'feature/provas'
└── (root)            → branch 'main' (principal worktree)
```

### Workflow

1. **Navigate to the appropriate worktree** based on the content you're editing:
   - Exercises → `worktrees/exercicios/`
   - Slides → `worktrees/slides/`
   - Exams → `worktrees/provas/`

2. **Make changes and commit** within that worktree (commits are independent per branch)

3. **Integrate to main** via merge:
   ```bash
   # From the main worktree root
   git merge feature/exercicios
   ```

4. **Start the dev server** from the appropriate directory to test changes:
   ```bash
   cd worktrees/exercicios && python3 -m http.server 8080
   ```

> The `worktrees/` directory is gitignored and not committed.

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

3. **Exercise count:** Flexible — cover the content with as many exercises as needed. Minimum 6, typical 8-15. Priority is content coverage, not a fixed number.
   - Q1–Q3: Basic, with explicit hints
   - Q4–Q6: Intermediate, some hints
   - Q7+: Advanced, minimal hints, multiple concepts

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

> **Guia completo:** `slide-decks/AGENTS.md` — regras críticas, pipeline de revisão, coerência com exercícios, verificações obrigatórias.

1. **CSS Rule (CRITICAL):** NEVER add inline styles or `<style>` blocks. Use ONLY classes from `slide-decks/styles.css`. Verify with `grep 'style=' capitulo-N/*.html`.

2. **Navigation structure:**
   - Horizontal: Between main topics (one per exercise topic)
   - Vertical: Deepening within each topic (motivation → concept → visualization → practice → synthesis)

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

6. **Coherence with exercises:** Each horizontal section should correspond to a topic in the exercise list for that chapter. See `slide-decks/AGENTS.md` §3.

7. **Review pipeline (3 agents):** See `slide-decks/AGENTS.md` §5 — Revisor (RTC) → Planejador (fino detalhado) → Implementador. Each step requires professor approval before proceeding.

8. **Visual verification required:** See `slide-decks/AGENTS.md` §7 — mandatory screenshot verification after any change.

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

## Slide Design Principles

When creating or reviewing slides, follow these principles:

### 1. Necessity Before Definition

Before presenting a concept or formula, show **why** it's needed. What problem creates the demand? What practical context motivates the tool? Only then comes the formal definition.

**Bad**: "A vector \(\vec{v}\) in the plane is an ordered pair \((x,y)\) with magnitude and direction."
**Good**: "Coordinates tell you *where* you are. But to go from Shelter Alpha to Outpost Bravo, we need to know not just distance, but *direction*. We need a tool that captures direction **and** magnitude. → Now: a vector is..."

### 2. Slide as Narrative, Not Encyclopedia

Each vertical stack should tell a story with progression: motivation → concept → visualization → practice → synthesis. The scaffold (`mission-briefing`, `field-report`, `simulator`, `survival-training`, `debriefing`) is a guide, not a rigid mold.

### 3. Coherence with Exercises

Each horizontal section corresponds to a topic in the exercise list. Slides introduce what exercises practice. If an exercise presupposes knowledge not covered in slides, that's a gap to flag.

### 4. Build on Prior Knowledge

Slides should revisit concepts from earlier chapters/topics and show how the new concept extends them. The student never starts from zero.

### 5. One Idea Per Vertical Slide

Don't overload a single slide. If it has more than one definition + one example, split it.

### 6. Visualization When Didactically Useful

Canvas interactives are valuable for inherently geometric concepts (vectors, lines, conics). Don't force visualizations where a good `field-report` suffices.

---

## Exercise Design Principles

When creating or reviewing exercises, follow these principles:

### 1. Mathematical Narrative

The exercise list must tell a **mathematical story**, not just be a collection of problems. The student should understand WHY each concept exists and HOW concepts connect.

**Bad**: Random list of unrelated exercises about vectors.
**Good**: Progression that shows how two points define a vector, two vectors define an angle (dot product), two vectors define an area (cross product).

### 2. Clear Motivation

Each exercise should start with a clear statement of purpose:

```
"O objetivo deste exercício é entender como usar o produto escalar 
para encontrar ângulos entre vetores."
```

This tells the student WHY the exercise exists, not just WHAT to calculate.

### 3. Logical Progression

Exercises should build on each other. Example for the dot product topic:

| Phase | Exercises | Concept |
|-------|-----------|---------|
| Construction | Q1-Q3 | Two points → a vector |
| New tool | Q4-Q6 | Two vectors → angle (dot product) |
| Motivation | Q7-Q9 | Why dot product > direct trigonometry |
| Combination | Q10+ | Multiple concepts → complex applications |

### 4. Content Coverage Over Fixed Count

Do not enforce a rigid number of exercises. Cover the content thoroughly:
- Minimum 6 exercises per topic
- Typical: 8-15 exercises
- Add more if the topic is complex or has many sub-concepts

### 5. Web Search for Missing Exercises

Use FireCrawl to search for exercises from textbooks and adapt them to the post-apocalyptic theme:
```bash
# Search for exercises on a topic
curl -X POST http://100.65.237.67:3002/v1/search \
  -H "Content-Type: application/json" \
  -d '{"query": "exercícios produto escalar geometria analítica", "limit": 3}'
```

---

## Cursor Rules Integration

The following Cursor rule files are automatically applied:
- `.cursor/rules/exercicios.mdc` — For `exercicios/**/*.html`
- `.cursor/rules/slides.mdc` — For `slide-decks/**/*.html`
- `.cursor/rules/provas.mdc` — For `provas/**/*.html`

These rules contain essential guidelines. Reference `ESTILO.md` for complete notation reference.

---

## Quality Checklist

Before any commit, verify:

- [ ] Mathematical notation uses correct LaTeX (points uppercase, vectors with `\vec{}`)
- [ ] No new CSS — only existing classes from template stylesheets
- [ ] No inline styles — `grep 'style='` returns empty for slide section files
- [ ] LaTeX delimiters correct — `grep '\\\\(' ... | grep -v script` returns empty
- [ ] Decimal numbers use comma: `\(0{,}5\)` not `\(0.5\)`
- [ ] No calculus concepts — only algebra/geometry/trigonometry
- [ ] Exercise difficulty follows progressive difficulty (basic → advanced)
- [ ] Each exercise has a clear motivation statement
- [ ] Hints use `<details class="hint-details">` structure
- [ ] Files named in lowercase kebab-case
- [ ] For slides: verified visually via screenshot (see `slide-decks/AGENTS.md`)
- [ ] For slides: each section starts with motivation, not definition
- [ ] For slides: topics correspond to exercise list topics

---

## Reference Documents

- `ESTILO.md` — Complete style guide for mathematical notation
- `README.md` — Course overview and content index
- `exercicios/agents.md` — Agent guide for exercise creation (workflow, format, rules)
- `exercicios/diretrizes-listas-de-exercicios.md` — 8 design principles for exercise lists
- `exercicios/checklist-conceitos-permitidos.md` — Concept progression by chapter
- `slide-decks/AGENTS.md` — Detailed slide guide: rules, pipeline, verification, narrative principles
- `slide-decks/prompt.md` — CSS classes, templates, examples