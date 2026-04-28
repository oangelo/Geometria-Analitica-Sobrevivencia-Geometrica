# Guia de Trabalho para Agentes - Slide Decks

Este documento descreve o processo obrigatório para criar e revisar slides no projeto **Geometria Analítica: Sobrevivência Geométrica**.

---

## 1. Regras Críticas (Verificação Obrigatória)

Antes de qualquer commit, execute **todas** as verificações abaixo. Se qualquer uma falhar, corrija antes de prosseguir.

### 1.1 CSS — NENHUM estilo inline

```
REGRA: ZERO atributos style="..." nos arquivos HTML de seção.
       ZERO blocos <style> nos arquivos HTML de seção.
       USE APENAS classes de slide-decks/styles.css.
```

**Verificação obrigatória (rodar para cada arquivo alterado):**

```bash
grep -n 'style=' slide-decks/capitulo-N/*.html
# Resultado esperado: VAZIO. Qualquer hit é VIOLAÇÃO.
```

**Se encontrar inline styles:** Mova o estilo para `styles.css` com uma classe semântica, ou substitua por uma classe existente.

**Exceções (apenas no loader principal, não nas seções):** O `capitulo-N.html` principal pode conter `<style>` no `<head>` se for absolutamente necessário para inicialização — mas prefira sempre `styles.css`.

### 1.2 LaTeX — Delimitadores com UMA barra

```
REGRA: No arquivo HTML, delimitadores MathJax usam UMA barra:
       Inline:  \( ... \)       (NÃO: \\( ... \\))
       Display: \[ ... \]       (NÃO: \\[ ... \\])
       Comandos: \vec{v}         (NÃO: \\vec{v})
```

**Verificação obrigatória:**

```bash
# Procure barras duplas em LaTeX (fora de <script> e bmatrix)
grep -n '\\\\(' slide-decks/capitulo-N/*.html | grep -v 'inlineMath\|displayMath\|script'
grep -n '\\\\[' slide-decks/capitulo-N/*.html | grep -v 'inlineMath\|displayMath\|script'
grep -n '\\\\vec\|\\\\frac\|\\\\sqrt\|\\\\left\|\\\\right' slide-decks/capitulo-N/*.html | grep -v 'script'
# Resultado esperado: VAZIO. Qualquer hit é LaTeX quebrado.
```

**Correção em massa:**

```bash
sed -i '/inlineMath\|displayMath/!{s/\\\\(/\\(/g; s/\\\\)/\\)/g; s/\\\\\[/\\[/g; s/\\\\\]/\\]/g; s/\\\\\([a-zA-Z]\)/\\\1/g}' arquivo.html
```

**Atenção:** Dentro de `<script>` (config do MathJax), `\\` é correto — é JavaScript. Dentro de `bmatrix`, `\\` também é correto (separador de linha). O `sed` acima preserva ambos.

### 1.3 Notação Matemática

| Elemento | Correto | Errado |
|----------|---------|--------|
| Pontos | `\(A\)`, `\(P(x_0, y_0)\)` | `\(a\)`, `\(b\)` (minúscula) |
| Vetores | `\vec{v}` | `**v**` ou `\mathbf{v}` |
| Índices de vetor | `\vec{v}_1` | `\vec{v_1}` |
| Vetores canônicos | `\vec{e}_1, \vec{e}_2` ou `\vec{i}, \vec{j}` | Nunca reusar i, j, k como variáveis |
| Separador decimal | `\(0{,}5\)` (vírgula) | `\(0.5\)` (ponto) |
| Focos (cônicas) | `\(F_1\)`, `\(F_2\)` (LaTeX) | F₁, F₂ (Unicode) |

### 1.4 Escopo — Conceitos de capítulos posteriores

Capítulo N pode usar tudo de Cap 0 a N-1, mais os conceitos próprios de Cap N. **NADA de Cap N+1 em diante.**

Ao revisar slides, verificar se algum conceito fora do escopo aparece. Exemplo: slides do Cap I (R²) não devem mencionar produto vetorial ou espaço R³.

---

## 2. Princípios de Narrativa para Slides

Slides não são enciclopédia — são **aula narrada**. Cada stack vertical conta uma história com começo, meio e fim.

### 2.1 Necessidade antes de definição

Antes de apresentar um conceito ou fórmula, o slide deve mostrar **por que** ele é necessário. Qual problema cria a demanda? Qual foi a motivação histórica ou prática?

**Ruim:**
> "Um vetor \(\vec{v}\) no plano é um par ordenado \((x,y)\) com magnitude e direção."

**Bom:**
> "Coordenadas dizem *onde* você está. Mas para ir do Abrigo Alpha ao Posto Bravo, precisamos saber não só a distância, mas a *direção*. Precisamos de uma ferramenta que capture direção **e** magnitude."
>
> *(só agora vem a definição formal)*

**Tipos de motivação que funcionam:**
- Aplicação temática (navegação, defesa, recursos)
- Limitação de uma ferramenta anterior ("sabemos calcular X, mas e quando Y?")
- Pergunta provocadora ("como determinar se duas retas são paralelas só com as equações?")
- Conexão histórica (quem precisou disso e por quê)

### 2.2 Slide como narrativa, não como enciclopédia

Cada stack vertical (os slides que você navega para baixo dentro de um tópico) deve ter uma progressão lógica:

```
Motivação → Conceito → Visualização/Exemplo → Prática → Fechamento
```

Nem todo tópico precisa de todos os tipos de slide. O scaffold serve como guia, não como molde rígido:

| Tipo | Classe | Propósito |
|------|--------|-----------|
| Briefing | `mission-briefing` | Apresentar o problema/motivação |
| Conceito | `mission-briefing` | Definição formal (após motivação) |
| Relatório de campo | `field-report` | Aplicações e contexto |
| Simulador | `simulator` | Visualização interativa |
| Treinamento | `survival-training` | Exercício prático |
| Debriefing | `debriefing` | Síntese e conexão com próximo tópico |

### 2.3 Construir sobre o já sabido

Slides devem retomar conceitos de capítulos/tópicos anteriores e mostrar como o novo conceito nasce deles ou os generaliza. O aluno não começa do zero a cada tópico.

**Exemplo:** Antes de introduzir produto escalar, retomar que vetores representam deslocamentos — "já sabemos somar vetores e multiplicar por escalar. Mas como comparar a *direção* de dois vetores?"

Referências devem ser por **conceito**, nunca por número de slide.

### 2.4 Uma ideia por slide vertical

Não entupir um slide com múltiplos conceitos. Se o slide tem mais que: uma definição + um exemplo, ou uma motivação + uma fórmula, provavelmente deve ser dividido em dois slides verticais.

### 2.5 Visualização quando didaticamente útil

Nem todo conceito precisa de canvas interativo. Visualizações devem ser adicionadas quando:
- O conceito é inerentemente geométrico (vetores, retas, cônicas)
- A animação ajuda a entender algo que texto estático não captura
- O aluno precisa ver a consequence de mudar parâmetros

Quando não houver visualização, não forçar — um `field-report` bom supre a necessidade.

---

## 3. Estrutura Horizontal/Vertical e Coerência com Exercícios

### 3.1 Mapeamento com as listas de exercício

Os slides de cada capítulo devem cobrir **os mesmos tópicos** das listas de exercício correspondentes. A correspondência é:

```
Capítulo N (slides)           Capítulo N (exercícios)
─────────────────            ──────────────────────────
Tópico 1 (seção horiz.)   ↔   Tópico 1 (pasta de exercícios)
Tópico 2 (seção horiz.)   ↔   Tópico 2 (pasta de exercícios)
...
```

Cada tópico da lista de exercícios vira uma **seção horizontal** no Reveal.js. Os slides verticais dessa seção aprofundam o tópico.

### 3.2 Ordem das seções

A ordem das seções horizontais deve seguir a mesma progressão das listas de exercício. Consulte `exercicios/capitulo-N/` para verificar os tópicos existentes e sua ordem.

**Atenção:** nem todo tópico de exercício precisa de slides com mesmo nível de detalhe. Alguns são mais extensos (produto escalar, cônicas) e pedem mais slides verticais; outros são mais diretos (notação) e podem ter apenas 2-3 slides.

### 3.3 O que os slides preparam, os exercícios praticam

Os slides introduzem o conceito com motivação e definição. Os exercícios partem daí para a prática. Se um exercício pressupõe conhecimento que não aparece nos slides, ou os slides estão incompletos, ou o exercício está fora do escopo.

Ao revisar slides, o Agente Revisor DEVE mapear explicitamente a correspondência:

```
Tópico X (slides):
  - Slide 1: Motivação (por que medir ângulos?)
  - Slide 2: Definição (produto escalar)
  - Slide 3: Propriedades
  - Slide 4: Aplicação (cálculo de ângulos)
  
Tópico X (exercícios):
  - Exercícios 1-3: Cálculo direto de produto escalar
  - Exercícios 4-6: Aplicação para ângulos
  - Exercícios 7+: Combinações
  
Lacuna: Slides não cobrem "projeção vetorial", mas exercício 5 pressupõe esse conhecimento.
Ação: Adicionar slide de projeção ou sinalizar no RTC.
```

---

## 4. Formato dos Arquivos de Seção

### 4.1 Estrutura de pastas

Cada capítulo tem sua pasta com seções modulares carregadas via `fetch()`:

```
slide-decks/
├── styles.css
├── capitulo-i.html          ← Loader principal (configura Reveal + MathJax)
├── capitulo-i/
│   ├── 1-conjunto-r2.html
│   ├── 2-notacao.html
│   ├── 3-vetores.html
│   ├── 4-aplicacoes.html
│   └── ...
├── svg/                     ← SVGs estáticos compartilhados
└── capitulo-ii.html         ← Próximo capítulo
```

### 4.2 Loader principal (`capitulo-N.html`)

O loader carrega seções dinamicamente e inicializa Reveal + MathJax:

```javascript
const SECTIONS = [
  'capitulo-i/1-conjunto-r2.html',
  'capitulo-i/2-notacao.html',
  'capitulo-i/3-vetores.html',
  // ...
];
```

Ao adicionar/remover seções, atualize este array. A ordem define a navegação horizontal.

### 4.3 Arquivo de seção (`capitulo-N/topico.html`)

Cada seção é um HTML **fragmento** (não um documento completo). Estrutura:

```html
<!-- SEÇÃO: Vetores no Plano -->
<div class="slides">
  <!-- Necessidade -->
  <section class="field-report">
    <h2>Vetores: Por Que Precisamos?</h2>
    <!-- Motivação: coordenadas dizem onde, vetores dizem para onde -->
  </section>

  <!-- Definição formal -->
  <section class="mission-briefing">
    <h2>Vetores no Plano</h2>
    <!-- Definição com definition-box -->
  </section>

  <!-- Visualização -->
  <section class="simulator">
    <h3>Simulador: Vetores</h3>
    <div class="canvas-container">
      <canvas id="vetores-canvas" width="800" height="400"></canvas>
    </div>
  </section>

  <!-- Debriefing -->
  <section class="debriefing">
    <h3>Síntese: Vetores</h3>
    <!-- Conexão com próximo tópico -->
  </section>
</div>
```

**Regras obrigatórias:**
- IDs de canvas: prefixo do tópico (ex: `vetores-canvas`, `r2Canvas`)
- JavaScript: SEMPRE em IIFE para evitar vazamento de escopo
- NENHUM `<style>` inline ou bloco `<style>` no arquivo de seção
- NENHUM `<script src="mathjax">` no arquivo de seção (já está no loader)
- Classes: APENAS as definidas em `styles.css`

### 4.4 JavaScript para visualizações

Padrão IIFE obrigatório:

```javascript
(function() {
  function init() {
    const canvas = document.getElementById('topico-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    // ... lógica de desenho
  }
  document.addEventListener('DOMContentLoaded', init);
  // Re-resize ao mudar de slide (Reveal)
  if (window.Reveal) {
    Reveal.on('slidechanged', function() {
      if (document.getElementById('topico-canvas')) init();
    });
  }
})();
```

---

## 5. Pipeline de Revisão (2 Agentes)

### Agente 1 — Revisor (gera RTC)

**Entrada:** Slide atual + exercícios do mesmo capítulo

**Processo:**
1. Ler os slides do capítulo em revisão
2. Ler as listas de exercício do mesmo capítulo (`exercicios/capitulo-N/`)
3. Verificar regras críticas (inline styles, LaTeX, notação, escopo)
4. Mapear correspondência slides↔exercícios
5. Avaliar princípios de narrativa (necessidade antes de definição, progressão, uma ideia por slide)
6. Gerar RTC como comentário no issue do GitHub

**Saída (RTC):**
- **Erros críticos:** inline styles, LaTeX quebrado, notação incorreta, conceitos fora de escopo
- **Correspondência slides↔exercícios:** mapear tópicos e identificar lacunas
- **Análise narrativa:** cada stack vertical tem motivação? Conceitos constroem sobre anteriores?
- **Sugestões:** reordenação, adições, remoções

**Como invocar:**

> Execute o Agente Revisor no issue #N (NOME DO CAPÍTULO).
>
> ANTES de começar:
> 1. Leia `slide-decks/AGENTS.md` — regras de localStorage, LaTeX, notação, narrativa
> 2. Leia `slide-decks/prompt.md` — referência de classes CSS e estrutura
> 3. Leia os slides em `slide-decks/capitulo-N/`
> 4. Leia os exercícios em `exercicios/capitulo-N/`
>
> Depois:
> - Execute as verificações obrigatórias (grep para style=, grep para \\\\ LaTeX, notação)
> - Mapeie a correspondência slides↔exercícios
> - Avalie se cada stack vertical segue "necessidade → conceito → visualização → prática → fechamento"
> - Gere um RTC como comentário no issue

**Formato do RTC:**

```markdown
## RTC: Capítulo N — [NOME]

### 1. Erros Críticos

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| 3-vetores.html:47 | CSS | inline style="color: #ffd700" |
| 5-vetores-posicao.html:73 | LaTeX | \\( não vai renderizar (barra dupla) |

### 2. Correspondência Slides ↔ Exercícios

| Tópico Exercícios | Slides Correspondentes | Lacunas |
|-------------------|----------------------|---------|
| 1-conjunto-r2 | 1-conjunto-r2.html | OK |
| 2-igualdade-e-operacoes | 2-notacao.html + 2-operacoes.html | Slides não cobrem igualdade de pares |
| 3-vetores-no-plano | 3-vetores.html | OK |
| 4-aplicacoes | 4-aplicacoes.html | Faltam slides sobre baricentro |

### 3. Análise Narrativa

- **3-vetores.html**: Stack começa com definição formal sem motivação. Propor slide de "por que vetores?" antes da definição.
- **5-vetores-posicao-deslocamento.html**: Boa progressão, mas debriefing não conecta com próximo tópico.

### 4. Sugestões

1. Adicionar slide de motivação antes de "Vetores: As Setas da Sobrevivência"
2. Mover slide sobre norma para depois da motivação (necessidade → ferramenta)
3. Adicionar slide de projeção vetorial (exercício 5 pressupõe conhecimento)
```

### Agente 2 — Implementador

**Entrada:** RTC dos comentários do issue

**Processo:**
1. Ler o RTC nos comentários do issue
2. Ler `slide-decks/AGENTS.md` e `slide-decks/prompt.md`
3. Implementar as correções
4. Executar verificações obrigatórias (grep)
5. Subir servidor e verificar visualmente (screenshot)
6. Se correto, oferecer URL + screenshot ao usuário

**Como invocar:**

> Execute o Agente Implementador no issue #N.
> Leia o RTC nos comentários da issue (usar `gh issue view N --comments`).
> Implemente as correções nos arquivos de slide.
> Execute as verificações obrigatórias (grep para style=, grep para LaTeX quebrado).
> Suba servidor web e tire screenshot dos slides alterados.

---

## 6. Convenções de LaTeX nos Slides

### Delimitadores

No arquivo HTML, os delimitadores MathJax usam **uma barra**:

```
CORRETO:  \( fórmula \)       inline
CORRETO:  \[ fórmula \]       display
ERRADO:   \\( fórmula \\)     barra dupla quebra MathJax
ERRADO:   \\[ fórmula \\]     barra dupla quebra MathJax
```

### Exceções (barra dupla é correto)

1. **Config do MathJax** dentro de `<script>` — JavaScript requer `\\`:
   ```javascript
   inlineMath: [['\\(', '\\)']],
   displayMath: [['\\[', '\\]']],
   ```
2. **Separadores de linha em matrizes** — LaTeX `\\` dentro de `bmatrix`:
   ```html
   \begin{bmatrix} 3 & 1 \\ 4 & 2 \end{bmatrix}
   ```

### Comandos sed para correção

```bash
# Corrige barras duplas em LaTeX, preservando config do MathJax e bmatrix
sed -i '/inlineMath\|displayMath/!{s/\\\\(/\\(/g; s/\\\\)/\\)/g; s/\\\\\[/\\[/g; s/\\\\\]/\\]/g; s/\\\\\([a-zA-Z]\)/\\\1/g}' arquivo.html
```

**NUNCA use `write_file` ou ferramenta similar para corrigir backslashes** — a ferramenta pode duplicá-los. Use `sed` sempre.

---

## 7. Verificação Visual Obrigatória

Após fazer qualquer alteração em arquivos HTML/CSS de slides, você DEVE verificar visualmente.

### Workflow

```
Fazer alteração no código
         ↓
Subir servidor: python3 -m http.server 8080 (em slide-decks/)
         ↓
Navegar até o slide: http://localhost:8080/capitulo-N.html#/secao
         ↓
CAPTURAR SCREENSHOT
         ↓
ANALISAR: elementos corretos? fórmulas renderizam? layout OK?
         ↓
   ├─ Sim → Oferecer URL + screenshot ao usuário
   └─ Não → Corrigir → Repetir
```

### Casos que exigem verificação visual

- [ ] Centralização de elementos (canvas, textos, listas)
- [ ] Alinhamento de listas
- [ ] Renderização de fórmulas MathJax
- [ ] Espaçamento entre elementos
- [ ] Tamanho e escala de elementos visuais
- [ ] Quebra de linha em textos longos
- [ ] Canvas interativos (testar controles)

### Dicas

- **Cache**: O navegador pode cachear CSS. Use `?v=2` ou reinicie o servidor.
- **Reveal.js**: Slides aninhados usam formato `#/slide/secao` na URL.
- **Resolução**: Padrão do Reveal.js é 1366×768.
- **MathJax**: Fórmulas podem demorar a renderizar — aguarde antes do screenshot.

---

## 8. Checklist antes de Commit

- [ ] **Nenhum inline style**: `grep -r 'style=' slide-decks/capitulo-N/*.html` retorna vazio
- [ ] **LaTeX correto**: `grep -n '\\\\(' slide-decks/capitulo-N/*.html | grep -v script` retorna vazio
- [ ] **Notação**: Pontos maiúsculos, `\vec{}`, vírgula decimal
- [ ] **Escopo**: Nenhum conceito de capítulo posterior
- [ ] **Verificação visual**: Screenshot tirado e analisado
- [ ] **URL fornecida ao usuário** para validação
- [ ] **Sem regressões**: Slides adjacentes não quebraram

---

## 9. Referência Rápida

### Arquivos de referência

| Arquivo | Conteúdo |
|---------|----------|
| `slide-decks/AGENTS.md` | Este arquivo — regras, pipeline, verificações |
| `slide-decks/prompt.md` | Classes CSS disponíveis, estrutura de slides, exemplos |
| `slide-decks/styles.css` | Estilos — NÃO criar novos, usar apenas estes |
| `slide-decks/template.html` | Template base para novos slides |
| `exercicios/capitulo-N/` | Exercícios do capítulo N — referência para coerência |
| `AGENTS.md` (raiz) | Regras gerais do repositório, notação, paleta de cores |
| `ESTILO.md` | Guia completo de notação matemática |

### Classes CSS principais

| Classe | Uso |
|--------|-----|
| `mission-briefing` | Definição formal, introdução de conceito |
| `field-report` | Contextualização, aplicações, nível básico/intermediário |
| `simulator` | Visualização interativa com canvas |
| `survival-training` | Exercícios práticos |
| `debriefing` | Síntese, fechamento, conexão com próximo tópico |
| `level-basic` | Nível básico (com `field-report`) |
| `level-intermediate` | Nível intermediário |
| `level-advanced` | Nível avançado |
| `definition-box` | Caixa de definição formal |
| `formula` | Destaque de fórmula |
| `survival-tip` | Dica contextual |
| `mnemonic` | Mnemônico temático |
| `canvas-container` | Container para canvas |
| `info-panel` / `info-screen` | Painel de informações |
| `training-problem` | Problema prático |
| `problem-context` | Contexto de problema |
| `summary-box` | Caixa de resumo |
| `next-mission` | Conexão com próximo tópico |
| `narrative-text` | Texto narrativo temático |
| `concept-definition` | Definição de conceito (nos slides existentes) |

### Níveis de complexidade

Combine `field-report` com níveis:
```html
<section class="field-report level-basic">...</section>
<section class="field-report level-intermediate">...</section>
<section class="field-report level-advanced">...</section>
```