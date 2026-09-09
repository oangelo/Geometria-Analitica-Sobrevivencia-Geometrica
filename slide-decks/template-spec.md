# Spec: Template Canônico — Slides Reveal.js

**Versão:** 1.0 (adaptado do Cálculo Vetorial — pendente de aprovação na issue #45)
**Curso:** Geometria Analítica — Sobrevivência Geométrica (pós-apocalíptico)
**Destinatário:** Agente de implementação de slides

> **ATENÇÃO:** Este spec está em **validação**. O template canônico é definido na **issue #45** (Definir template canônico dos slides). Leia os comentários da issue antes de implementar — as decisões lá aprovadas têm precedência sobre este documento.
>
> **Complementos:** `template-system.md` (âncoras e variantes), `narrative-spec.md` (inserts e fragmentos), `pedagogical-spec.md` (dissonância), `visual-design-spec.md` (design visual), `section-checklist.md` (verificação).
>
> **CSS:** todos os estilos em `styles.css` — zero CSS inline nos arquivos de seção.

---

## Estrutura de diretório (proposta)

```
slide-decks/
├── styles.css               # Único stylesheet (classes canônicas)
├── capitulo-N.html          # Loader principal (configura Reveal + MathJax)
├── capitulo-N/              # Seções do capítulo
│   ├── 00-capa.html         # Título + subtítulo + borda temática
│   ├── 01-narrativa.html    # 1 seção H: contexto narrativo do capítulo
│   ├── 02-topico-1.html     # Tópico 1 (slides verticais)
│   ├── 03-topico-2.html     # Tópico 2 (slides verticais)
│   ├── ...
│   ├── NN-topico-N.html     # Último tópico
│   ├── N+1-resumo.html      # Fórmulas-chave e conexões
│   ├── N+2-reflexao.html    # Pergunta aberta + dissonância final
│   └── visualizacoes.js     # (opcional) Canvas 2D
└── svg/                     # SVGs estáticos compartilhados
```

### Mapeamento de tópicos

Cada arquivo de tópico (`02-topico-1.html` em diante) corresponde a **um tópico de exercício** já existente em `exercicios/capitulo-N/`. A ordem das seções horizontais segue a progressão das listas de exercício (ver `slide-decks/AGENTS.md` §3).

---

## Navegação

- **Horizontal:** uma seção por arquivo (capa, narrativa, tópicos, resumo, reflexão)
- **Vertical:** aprofundamento dentro de cada seção (slides aninhados com `<section>`)

```
→  [Capa]  →  [Narrativa]  →  [Tópico 1]  →  [Tópico 2]  →  ...  →  [Resumo]  →  [Reflexão]
                               ↕                           ↕
                           motivação                   motivação
                           conceito                    conceito
                           formalização                formalização
                           exemplo                     exemplo
                           visualização                visualização
```

---

## Especificação por tipo de seção

### `00-capa.html`

- **1 slide horizontal** (sem slides verticais)
- Classes existentes: `title-screen`, `subtitle`, `warning-text`, `doc-code`, `chapter-meta`, `cover-glyph`
- Conteúdo: `doc-code` no topo, título do capítulo, subtítulo temático, **glifo geométrico animado** (canvas `.cover-glyph`), aviso de classificação narrativa, metadados do capítulo
- **Glifo por capítulo:** cada capítulo tem um motivo geométrico próprio, leve (~40-50 linhas), animação sutil contínua via `requestAnimationFrame`. Não é o mini-jogo do cap 0 — é um "emblema vivo":
  - Cap 0: grade cartesiana pulsante (revisão)
  - Cap I: ponto + vetor girando em R² (glifo padrão do template)
  - Cap II: dois vetores abrindo ângulo (produto escalar)
  - Cap III: reta varrendo o plano
  - Cap IV: circunferência expandindo do centro
  - Cap V: ponto traçando uma cônica (definição por focos)
  - Cap VI: eixo z subindo do plano (R²→R³)
- **JS do glifo:** IIFE, `window.vizCapa = { init, cleanup }`, `cancelAnimationFrame` quando o slide não está visível
- **Paleta do canvas:** `#ADFF2F` principal + destaques `#FFD700`/`#ff3333` (decisão #5 revisada — ver issue #45)

### `01-narrativa.html`

- **1 slide horizontal**
- Apresenta o tema social do capítulo (ver `narrative-spec.md` — arcos por capítulo)
- Texto: 3 a 5 frases, tom seco, sem fórmulas matemáticas
- A pergunta-problema do capítulo pode aparecer aqui (sem resposta)

### `NN-topico-N.html` (tópicos de conteúdo)

- **1 seção horizontal** com slides verticais aninhados (5 a 8 slides)
- O conteúdo deve alinhar com os exercícios revisados do tópico correspondente

#### Fluxo pedagógico obrigatório

Cada seção de conteúdo segue este fluxo. A ordem não é sugerida — é obrigatória:

```
━━━ ABERTURA (V1) ━━━
  Pergunta-problema ou situação concreta que motiva o tópico
  Conexão com tópico anterior (progressão)
  Insert narrativo (1-2 frases, parágrafo final) — OBRIGATÓRIO
    → Se não houver conexão natural, criar por analogia, contraste ou ironia
    → Layout âncora (A3)

━━━ CONCEITO (V2) ━━━
  A ideia ANTES da fórmula
  O que é, para que serve, analogia visual
  Exemplo intuitivo (sobrevivência ou cotidiano)
  → Layout variável (V-CONCEITO)

━━━ FORMALIZAÇÃO (V3-V4) ━━━
  V3: Definição matemática precisa + fórmula principal
  V4: Interpretação geométrica e/ou propriedades
  → Layout variável (V-FORMULA)

━━━ APLICAÇÃO (V5-V6) ━━━
  1 a 3 exemplos clássicos, calculáveis em aula
  → **Taxonomias e classificações:** sempre que a seção apresentar uma TABELA DE CASOS/classificação
    (ex.: posições relativas — reta/reta, reta/plano, plano/plano; casos de um método como
    escalonamento), cada caso deve ter **≥ 1 exemplo numérico** correspondente (sem solução), além
    do mínimo de 1–3 exemplos por seção. O objetivo é que o aluno exercite o método em CADA caso,
    não apenas decore a tabela.
  → Exemplos podem usar dual-panel: esquerda = matemática, direita = fragmento narrativo
  → Fragmento NÃO precisa ter relação lógica com o exemplo (justaposição emocional)
  → Nem todos os exemplos precisam de fragmento (dinâmico)
  → Fragmentos seguem `narrative-spec.md`
  → Layout variável (V-EXEMPLO) — REGRA DE ALTERNÂNCIA: nunca repetir a mesma variante em
    exemplos consecutivos
  → Se o exemplo for complexo, adicionar V-DICA após (estratégia, sem valores calculados)

━━━ EXPLORAÇÃO (V7, opcional) ━━━
  Visualização interativa (Canvas 2D)
  → IIFE com window.vizNome = { init, cleanup }
  → IDs únicos para cada canvas
  → POSICIONAMENTO FLEXÍVEL: quando a visualização apoia a compreensão da definição,
    pode ser colocada ENTRE CONCEITO e FORMALIZAÇÃO, ou na INTERPRETAÇÃO, ANTES dos
    exemplos. O critério é pedagógico.
```

**Número típico de slides por seção:** 5 (mínimo) a 8 (máximo).

**Exceções permitidas:** nenhuma. Todo tópico tem motivação, conceito, fórmula, exemplo e (quando aplicável) visualização; e todo caso de uma taxonomia/classificação tem exemplo numérico.

### `N+1-resumo.html`

- **2 a 3 slides verticais**
- Slide 1: fórmulas-chave do capítulo em formato "cheat sheet"
- Slide 2: conexões entre os tópicos
- Slide 3 (opcional): mini-mapa conceitual visual
- Usa `definition-box` / `formula` para fórmulas

### `N+2-reflexao.html`

- **1 a 2 slides verticais**
- 1 frase final que planta dissonância (segue `narrative-spec.md`)
- 1 pergunta aberta sem resposta (segue `pedagogical-spec.md`)
- Sem resolução — o aluno sai com o desconforto

---

## Loader `capitulo-N.html`

Manter o formato modular já implementado em `capitulo-i.html`:

- Array `SECTIONS` com a lista de arquivos de seção (a ordem define a navegação horizontal)
- `fetch()` + `DOMParser` para carregar as seções
- Reveal.js + MathJax inicializados no loader (nunca nas seções)
- Ao adicionar/remover seções, atualizar o array

**Pendência (issue #45):** padronizar todos os capítulos (Cap 0 e Cap II–VI) neste formato.

---

## Seções HTML (fragmentos)

Cada arquivo de seção é um **HTML fragmento** (não um documento completo). Estrutura:

```html
<!-- SEÇÃO: Tópico -->
<div class="slides">
  <section>
    <!-- V1: Abertura (âncora A3) -->
    <section class="field-report">
      <h2>Tópico: A Pergunta</h2>
      <p>Motivação...</p>
      <p class="narrative-insert">Insert narrativo: 1-2 frases, tom seco.</p>
    </section>

    <!-- V2: Conceito -->
    <section class="mission-briefing">
      <h3>Conceito</h3>
      <div class="definition-box">...</div>
    </section>

    <!-- V5: Exemplo -->
    <section class="survival-training">
      <h3>Exemplo</h3>
      <div class="dual-panel">
        <div class="problem-section">...</div>
        <div class="v-bar"></div>
        <div class="fragmento">...</div>
      </div>
    </section>
  </section>
</div>
```

**Regras obrigatórias:**
- IDs de canvas: prefixo do tópico (ex: `vetores-canvas`)
- JavaScript: SEMPRE em IIFE para evitar vazamento de escopo
- NENHUM `<style>` inline ou bloco `<style>` no arquivo de seção
- NENHUM `<script src="mathjax">` no arquivo de seção (já está no loader)
- Classes: APENAS as definidas em `styles.css`

---

## Classes CSS (styles.css)

O inventário completo está em `slide-decks/prompt.md`. Classes principais:

| Classe | Uso |
|--------|-----|
| `mission-briefing` | Definição formal, introdução de conceito |
| `field-report` | Contextualização, motivação, aplicações |
| `simulator` | Visualização interativa com canvas |
| `survival-training` | Exercícios práticos |
| `debriefing` | Síntese, fechamento, conexão com próximo tópico |
| `definition-box` | Caixa de definição formal |
| `formula` | Destaque de fórmula |
| `survival-tip` | Dica contextual |
| `mnemonic` | Mnemônico temático |
| `canvas-container` | Container para canvas |
| `info-panel` / `info-screen` | Painel de informações |
| `training-problem` | Problema prático |
| `summary-box` | Caixa de resumo |
| `next-mission` | Conexão com próximo tópico |
| `narrative-text` | Texto narrativo temático |

**Classes a adicionar (pendente aprovação issue #45):** `dual-panel`, `triple-panel`, `formula-spotlight`, `problem-section`, `compact-solution`, `slide-header`, `slide-footer`, `controls-container`, `control-slider`, variante temática do insert narrativo.

**NÃO criar classes CSS novas** nos arquivos de seção. Se precisa de estilo novo, adicionar em `styles.css`.

---

## Regras

### MathJax

- Inline: `\(f(x)\)`
- Bloco: `\[ formula \]`
- **NUNCA** usar `$...$` (dollar sign)
- **NUNCA** usar `\\(`, `\\[`, `\\frac` (barra dupla quebra MathJax)
- Verificação: `grep -c '\\\\' arquivo.html` — resultado deve ser 0
- Exceções: config do MathJax dentro de `<script>` (JavaScript requer `\\`) e separadores `bmatrix`

### Limites

- Máximo 250 palavras por slide
- Máximo 2-3 fórmulas complexas por slide
- Títulos com menos de 60 caracteres
- Texto de narrativa: 3-5 frases no máximo

### Contraste (acessibilidade)

- Texto informativo: ratio **mínimo 4.5:1** (WCAG AA) sobre o fundo `#0c0c0c`
- Opacidade baixa é permitida **apenas** em elementos decorativos (molduras, marcas d'água) — ver `visual-design-spec.md` §3
- Metadados e headers/footers usam cores sólidas ou opacidade ≥ 0.55, nunca abaixo disso

### CSS

- **Zero CSS inline** nos arquivos de seção
- Se precisa de estilo novo → adicionar em `styles.css` (com classe semântica)

### Reveal.js

- Usar cópia local ou CDN conforme o padrão atual do capítulo (ver issue #45)
- Plugin de math configurado no loader

### JavaScript (visualizações)

- Encapsular em IIFE
- Expor via `window.vizNome = { init, cleanup }`
- Usar `requestAnimationFrame`, nunca `setInterval`
- Cleanup: `cancelAnimationFrame` quando slide não está visível
- IDs únicos para cada canvas
- Código em `visualizacoes.js` compartilhado, ou inline na seção se for específico
