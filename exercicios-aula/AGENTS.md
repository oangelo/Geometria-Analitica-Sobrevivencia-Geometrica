# Guia para Agentes de IA - Exercícios de Sala de Aula

> **Workflow:** Consulte `/AGENTS.md` para regras de commits, visualização e fluxo de entrega.

## Visão Geral

**Exercícios de sala** são folhas A4 coluna dupla para resolução em aula, com:

- Diálogo guiado (baby steps)
- Lacunas para preencher
- Sem tema narrativo (diferente dos exercícios de casa)
- Objetivo e direto
- Foco em reforço do conteúdo apresentado em aula

**Características:**

- Perguntas que levam o aluno a pensar
- Checkpoints de verificação
- Foco em aplicação imediata do conteúdo
- Conceitos são revisitados passo a passo, assumindo mínimo conhecimento prévio

---

## Estrutura de Arquivos

```
exercicios-aula/
├── AGENTS.md                    # Este guia
├── sala-styles.css              # CSS compartilhado para impressão
├── capitulo-i-o-espaco-vetorial-r2/
│   ├── index.html               # Monta a folha final
│   ├── exercicio-1.html         # Fragmento HTML
│   ├── exercicio-2.html
│   └── ...
├── capitulo-ii-vetores/
│   ├── index.html
│   └── exercicio-*.html
└── ...
```

### Organização por Capítulo

| Capítulo | Conteúdo | Tópicos |
|----------|----------|---------|
| 0 | Preparação para a Wasteland | Álgebra, Frações, Sistemas, Trigonometria, Revisão |
| I | O Espaço Vetorial R² | Conjunto R², Operações, Vetores, Ponto Médio/Baricentro |
| II | Produto Interno no R² | Produto Escalar, Módulo, Distância, Projeção, Ortogonalidade, Ângulo, Área |
| III | Estudo da Reta no R² | Equação, Posições Relativas, Perpendicularidade, Distância, Reduzida |
| IV | A Circunferência no R² | Equação, 3 Pontos, Posições Relativas, Pontos, Polares |
| V | Cônicas | Lugares Geométricos, Parábola, Elipse, Hipérbole |
| VI | R³ e Geometria no Espaço | R³, Produto Interno, Produto Vetorial, Plano, Reta, Esfera |

---

## Como Funciona

### Montagem (index.html)

O arquivo `index.html` usa JavaScript `fetch()` para carregar os exercícios:

```javascript
const EXERCICIOS = [
  'exercicio-1.html',
  'exercicio-2.html',
  // ... na ordem desejada
];

async function carregarExercicios() {
  const container = document.getElementById('exercicios-container');

  for (const arquivo of EXERCICIOS) {
    const response = await fetch(arquivo);
    const html = await response.text();
    container.insertAdjacentHTML('beforeend', html);
  }

  // Renderiza matemática após carregar todos
  renderMathInElement(document.body, {...});
}
```

**Vantagens:**

- Reordenar exercícios = mudar a lista
- Remover exercício = tirar da lista
- Editar exercício = modificar apenas aquele arquivo

### Exercício Individual (exercicio-N.html)

Cada exercício é um **fragmento HTML** (sem `<html>`, `<head>`, `<body>`):

```html
<section class="exercicio" data-topico="retas" data-dificuldade="medio">
  <p class="exercicio-enunciado">
    <span class="exercicio-numero">1.</span>
    Enunciado do exercício.
  </p>

  <p class="questao">Pergunta principal.</p>
  <p class="dialogo">Texto explicativo que guia o aluno.</p>
  <p class="subitem">a) Item: <span class="lacuna"></span></p>
  <p class="subitem">b) Item: <span class="lacuna"></span></p>
  <p class="dica">Dica opcional.</p>
  <p class="checkpoint">
    <span class="checkmark"></span>
    Verificação.
  </p>
</section>
```

---

## Metadados (data-attributes)

Atributos opcionais no `<section>`:

| Atributo           | Valores                                              | Descrição            |
| ------------------ | ---------------------------------------------------- | -------------------- |
| `data-topico`      | `pontos`, `vetores`, `retas`, `circulos`, `conicas`  | Tópico matemático    |
| `data-dificuldade` | `facil`, `medio`, `dificil`                          | Nível de dificuldade |

---

## Classes CSS Disponíveis

### Exercício

```html
<section class="exercicio">
  <p class="exercicio-enunciado">
    <span class="exercicio-numero">N.</span>
    Texto do enunciado.
  </p>
</section>
```

### Questão

```html
<p class="questao">Pergunta que o aluno deve responder.</p>
```

### Diálogo

```html
<p class="dialogo">Texto explicativo que guia o aluno passo a passo.</p>
```

### Subitens

```html
<p class="subitem">a) Passo: <span class="lacuna"></span></p>
<p class="subitem">b) Passo: <span class="lacuna"></span></p>
```

### Lacunas

```html
<!-- Inline (para respostas curtas) -->
<span class="lacuna"></span>

<!-- Bloco (linha inteira, para cálculos) -->
<span class="lacuna-grande"></span>
```

### Fórmula Destacada

```html
<p class="formula">$$d(A,B) = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$$</p>
```

**IMPORTANTE:** Não coloque `<span class="lacuna">` dentro de equações LaTeX. Use texto simples para fórmulas com lacunas.

### Dica

```html
<p class="dica">Texto de ajuda para o aluno.</p>
```

### Checkpoint

```html
<p class="checkpoint">
  <span class="checkmark"></span>
  Verificação: o resultado faz sentido?
</p>
```

### Espaço de Trabalho

```html
<div class="workspace"></div>
```

---

## Notação Matemática

### KaTeX (não MathJax)

- Inline: `$...$`
- Bloco: `$$...$$`

### Convenções de Notação

| Elemento | LaTeX | Exemplo renderizado |
|----------|-------|---------------------|
| Ponto | `$A(x_0, y_0)$` | A(x₀, y₀) |
| Vetor | `$\vec{v}$` | v⃗ |
| Vetor com componentes | `$\vec{v} = (a, b)$` | v⃗ = (a, b) |
| Distância | `$d(A,B)$` | d(A,B) |
| Módulo | `$\|\vec{v}\|$` | ‖v⃗‖ |
| Produto escalar | `$\vec{u} \cdot \vec{v}$` | u⃗ · v⃗ |
| Ângulo | `$\theta$` | θ |

### Variáveis Simples

Use `<strong>` em vez de LaTeX para variáveis simples:

- `<strong>x</strong>` em vez de `$x$`
- `<strong>v⃗</strong>` em vez de `$\vec{v}$`

Isso melhora performance e evita problemas com lacunas.

---

## Quantidade de Exercícios

A quantidade de exercícios por lista depende do conteúdo de cada capítulo. Não há limite fixo — o objetivo é cobrir adequadamente os tópicos com exercícios que guiem o aluno passo a passo.

**Diretrizes:**
- Cada exercício deve ter 2-4 questões
- Cada questão deve ter 2-4 subitens com lacunas
- Incluir checkpoints de verificação
- Priorizar cobertura completa sobre quantidade

---

## Nível de Dificuldade

**Reforço:** conteúdo foi apresentado em aula, mas o aluno pode não ter absorvido.

- ✅ Assumir mínimo conhecimento prévio — se o aluno não sabe desenhar um triângulo retângulo, guiar esse passo também
- ✅ Quebrar cada tarefa em micro-decisões — nenhum passo deve ser "óbvio demais"
- ✅ Focar em aplicação imediata
- ✅ Checkpoints para auto-verificação a cada subitem
- ✅ Baby steps extremos: cada subitem é uma única operação mental

---

## Estilo de Diálogo

**Objetivo:** Guiar o aluno sem dar a resposta diretamente.

### Exemplo Errado (muito óbvio)

> O vetor perpendicular a (a, b) é (-b, a). Escreva o vetor perpendicular.

### Exemplo Certo (guia o pensamento)

> O produto escalar de dois vetores perpendiculares é zero. Como escolher as coordenadas de um vetor para que o produto escalar seja zero?

### Padrões de Diálogo

1. **Contextualizar:** "Considere os pontos A(1, 2) e B(4, 8)."
2. **Questionar:** "Qual é o vetor diretor que vai de A até B?"
3. **Guiar:** "Para encontrar o deslocamento em cada direção..."
4. **Verificar:** "Some os componentes. O resultado faz sentido?"

---

## Micro-passos

Exercícios de sala devem quebrar cada tarefa em **micro-decisões** — passos tão pequenos que o aluno nunca "trava".

### Princípio

Se um subitem exige mais de uma operação mental, divida em dois subitens.

### Ciclo de Confirmação

Quando possível, o exercício deve fechar um ciclo: **calcular → usar o resultado → confirmar**.

Não basta calcular uma razão e verificar que a fórmula "funciona". O aluno precisa usar a razão para fazer uma **previsão** — e depois confirmar que a previsão bate com a realidade. Isso prova que a ferramenta é útil, não só correta.

### Exemplo: Progressão Cognitiva (Exercício de Trigonometria)

Este exemplo mostra como planejar um exercício inteiro pensando primeiro na **lógica da progressão**, sem valores numéricos.

#### O que o aluno precisa aprender

1. Um triângulo retângulo tem três partes nomeadas (hipotenusa, cateto oposto, cateto adjacente)
2. Os nomes dependem de qual ângulo você escolhe
3. Existem três razões que relacionam essas partes
4. As razões funcionam nos dois sentidos: descobrir razão a partir dos lados, OU descobrir lado a partir da razão

#### A progressão

**Fase 1 — Construir a figura**
- Desenhar um triângulo retângulo
- Marcar o ângulo reto
- Colocar os tamanhos dos lados

**Fase 2 — Nomear as partes**
- Escolher um dos ângulos agudos (θ)
- Identificar qual cateto está "oposto" a θ
- Identificar qual cateto está "adjacente" a θ
- A hipotenusa é sempre a mesma (oposta ao ângulo reto)

**Fase 3 — Construir as razões**
- Escrever a razão "oposto ÷ hipotenusa" — isso tem nome: seno
- Escrever a razão "adjacente ÷ hipotenusa" — isso tem nome: cosseno
- Escrever a razão "oposto ÷ adjacente" — isso tem nome: tangente
- Verificar que tangente = seno ÷ cosseno

**Fase 4 — Usar as razões no sentido direto**
- Calcular o valor numérico de cada razão

**Fase 5 — Usar as razões no sentido inverso (ciclo de confirmação)**
- Agora supor que só conhece a hipotenusa e o ângulo
- Usar o seno para "prever" o cateto oposto
- Usar o cosseno para "prever" o cateto adjacente
- Comparar com os valores que já estavam no desenho — batem?

**Fase 6 — Construir ângulos notáveis**
- Desenhar um triângulo retângulo isósceles (catetos iguais)
- Calcular a hipotenusa por Pitágoras
- Calcular as razões para esse triângulo — isso dá os valores de 45°

**Fase 7 — Construir 30° e 60°**
- Desenhar um triângulo equilátero
- Traçar a altura — divide em dois retângulos
- Identificar os lados de cada metade
- Calcular as razões para 30° e 60°

**Fase 8 — Verificação cruzada**
- Comparar sen 30° com cos 60° — são iguais? Por quê?
- Usar sen 30° para prever um cateto e confirmar

#### O que mudou em relação à versão anterior

| Antes | Agora |
|-------|-------|
| Dava os valores e pedia para identificar | Primeiro desenha, depois coloca valores dados |
| Calculava e verificava | Calcula, USA para prever, e confirma |
| Ângulos notáveis eram um passo só | São duas fases separadas (45° primeiro, depois 30°/60°) |
| Verificação era "confere?" | Verificação é "use a ferramenta para prever e compare" |

---

## Fluxo de Criação

### Criar Novo Capítulo

1. Criar pasta: `exercicios-aula/capitulo-N-nome/`
2. Criar `index.html` (copiar de capítulo existente ou template)
3. Criar `exercicio-1.html` a `exercicio-6.html`
4. Atualizar lista `EXERCICIOS` no `index.html`
5. Testar no navegador

### Criar/Editar Exercício

1. Abrir `exercicio-N.html`
2. Seguir a estrutura de classes CSS
3. Usar `<strong>` para variáveis simples
4. Usar LaTeX apenas para fórmulas complexas
5. Incluir `data-topico` e `data-dificuldade`

### Reordenar Exercícios

Basta mudar a ordem no array `EXERCICIOS` em `index.html`:

```javascript
const EXERCICIOS = [
  'exercicio-3.html', // Mudou ordem
  'exercicio-1.html',
  'exercicio-2.html',
  // ...
];
```

---

## Pipeline de Revisão (2 Agentes)

O pipeline tem 2 etapas com 2 agentes distintos. Entre cada etapa, o professor revisa e aprova antes de prosseguir.

```
Agente 1 — Planejador (gera PDI)
         ↓ Revisão humana (professor comenta aprovação/ajustes)
Agente 2 — Implementador (executa o PDI)
```

### Agente 1 — Planejador (gera PDI)

**Propósito:** Analisar referências (exercícios de casa, slides, checklist de conceitos) e gerar um Plano de Implementação Detalhado (PDI) em linguagem natural, sem código.

**Entrada:** Issue do GitHub com os tópicos a cobrir

**Processo:**
1. Ler o AGENTS.md (este arquivo) para estrutura e regras
2. Ler os exercícios de casa do capítulo (`exercicios/capitulo-N/`)
3. Ler os slides do capítulo (`slide-decks/capitulo-N/`)
4. Ler o checklist de conceitos permitidos (`exercicios/checklist-conceitos-permitidos.md`)
5. Ler as diretrizes pedagógicas (`exercicios/diretrizes-listas-de-exercicios.md`)
6. Gerar PDI como comentário na issue

**Saída (PDI):**
- **Progressão narrativa:** descrição dos "atos cognitivos" da lista
- **Cada exercício em detalhe:**
  - Código (SALA-N-M)
  - Tópico e dificuldade
  - Conexão com exercício anterior (texto explícito)
  - Descrição geral
  - **Progressão cognitiva** — fases do raciocínio, sem valores numéricos
  - Checkpoint de verificação
  - Se tem dica ou não
- **Resumo:** tabela com todos os exercícios
- **Arquivos a criar:** lista com marcações NOVO

**ATENÇÃO:** O PDI é um **plano cognitivo**, não um exercício finalizado.
- ✅ Descreva o que o aluno vai FAZER e PENSAR em cada fase
- ✅ Use linguagem natural ("calcular", "identificar", "verificar")
- ❌ NÃO inclua valores numéricos específicos (isso é responsabilidade do Implementador)
- ❌ NÃO escreva o HTML final (isso é responsabilidade do Implementador)

**Como invocar:**

> Execute o Agente Planejador na issue #N.
>
> ANTES de começar:
> 1. Leia `exercicios-aula/AGENTS.md` — estrutura, classes CSS, template, notação
> 2. Leia os exercícios de casa em `exercicios/capitulo-N/`
> 3. Leia os slides em `slide-decks/capitulo-N/`
> 4. Leia `exercicios/checklist-conceitos-permitidos.md` — seção do capítulo
> 5. Leia `exercicios/diretrizes-listas-de-exercicios.md` — princípios pedagógicos
>
> Gere um PDI como comentário na issue, em linguagem natural, sem código.

**Formato do PDI:**

```markdown
## PDI — Plano Detalhado de Implementação
**Tópico:** Exercícios de Sala — Capítulo N: [NOME]
**Issue:** #N
**Formato:** A4 coluna dupla, sem tema narrativo, KaTeX

---

### Progressão Narrativa da Lista

[Ato 1, Ato 2, Ato 3... descrevendo a progressão cognitiva]

---

### Exercícios

#### SALA-N-M — [Tópico] — [Dificuldade]
**Conexão:** [texto conectando com exercício anterior]
**Descrição:** [descrição geral em linguagem natural]

**Progressão cognitiva:**
- Fase 1: [o que o aluno faz primeiro — desenhar, identificar, etc.]
- Fase 2: [o que o aluno faz depois — calcular, comparar, etc.]
- Fase 3: [ciclo de confirmação — usar resultado para prever e verificar]

**Checkpoint:** [verificação que o aluno pode fazer]
**Com dica.** / **Sem dica.**

---

### Resumo

| Exercício | Arquivo | Tópico | Dificuldade | Questões |
|-----------|---------|--------|-------------|----------|
| SALA-N-1 | `exercicio-1.html` | ... | ... | ... |

### Arquivos a Criar

| Arquivo | Ação |
|---------|------|
| `capitulo-N-nome/index.html` | NOVO |
| `capitulo-N-nome/exercicio-1.html` | NOVO |
```

**Exemplo de progressão cognitiva (sem valores):**

> **Fase 1 — Construir a figura:** Desenhar um triângulo retângulo, marcar o ângulo reto, colocar os tamanhos dos lados.
>
> **Fase 2 — Nomear as partes:** Escolher um ângulo agudo, identificar cateto oposto e adjacente.
>
> **Fase 3 — Construir as razões:** Escrever as razões "oposto ÷ hipotenusa", "adjacente ÷ hipotenusa", "oposto ÷ adjacente".
>
> **Fase 4 — Usar no sentido direto:** Calcular os valores numéricos das razões.
>
> **Fase 5 — Usar no sentido inverso:** Usar as razões para prever catetos e confirmar com os valores do desenho.

### O que o PDI NÃO é

| PDI (Planejador) | Exercício finalizado (Implementador) |
|------------------|--------------------------------------|
| "Desenhar um triângulo retângulo" | `<p class="subitem">a) Desenhe um triângulo retângulo. Marque o ângulo reto com um quadrado pequeno.</p>` |
| "Calcular o seno como fração" | `<p class="subitem">d) O seno de θ é a razão entre qual cateto e qual lado? Escreva a fração: sen θ = <span class="lacuna"></span>/<span class="lacuna"></span></p>` |
| "Usar o seno para prever o cateto" | `<p class="subitem">f) Agora inverta: suponha que você só conhecesse a hipotenusa e o ângulo. Usando o seno, calcule o cateto oposto: cateto oposto = sen θ × hipotenusa = <span class="lacuna"></span>. Confere com o valor dado? <span class="lacuna"></span></p>` |

O PDI descreve a **lógica cognitiva**. O Implementador transforma em **instruções claras e didáticas** que o aluno segue passo a passo.

### Agente 2 — Implementador

**Propósito:** Executar o PDI. Transformar a progressão cognitiva em exercícios HTML didáticos, com linguagem clara e lacunas nos pontos certos.

**Entrada:** PDI + aprovação do professor na issue

**Processo:**
1. Ler o PDI nos comentários da issue
2. Ler o AGENTS.md (este arquivo) para template, classes CSS e princípios pedagógicos
3. Criar pasta do capítulo
4. Criar `index.html` seguindo o template
5. Para cada exercício do PDI:
   - Ler a progressão cognitiva (fases)
   - Transformar cada fase em subitens (a, b, c...) com linguagem clara
   - Adicionar lacunas nos pontos certos (cálculos, resultados)
   - Adicionar checkpoints de verificação
   - Adicionar diálogo que guia sem dar a resposta
6. Após cada arquivo: verificar estrutura HTML
7. Após todos os arquivos: subir servidor e testar no navegador

**Responsabilidades do Implementador:**
- **Linguagem clara:** Cada subitem deve ser uma instrução completa que o aluno entende sem contexto adicional
- **Diálogo guiado:** Usar perguntas, não afirmações. "Qual é o cateto oposto?" e não "O cateto oposto é..."
- **Conexão entre subitens:** Cada subitem deve construir sobre o anterior. Usar frases como "Usando o resultado anterior..." ou "Agora que você identificou..."
- **Lacunas nos pontos certos:** Nunca dentro de equações LaTeX. Sempre em pontos de cálculo ou resultado
- **Checkpoints após cada questão:** Verificação que o aluno pode fazer sozinho

**Como invocar:**

> Execute o Agente Implementador na issue #N.
>
> Leia o PDI nos comentários da issue (`gh issue view N --comments`).
> Leia `exercicios-aula/AGENTS.md` para template, classes CSS e princípios pedagógicos (especialmente "Micro-passos" e "Ciclo de Confirmação").
> Siga o PDI na ordem definida.
> Para cada exercício: transforme a progressão cognitiva em subitens claros e didáticos.
> Após criar todos os arquivos, suba servidor e teste: `python3 -m http.server 8080`

---

## Template index.html

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Capítulo N - Nome do Capítulo</title>

    <!-- KaTeX para matemática -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
    />
    <script
      defer
      src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"
    ></script>
    <script
      defer
      src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
    ></script>

    <!-- Estilos -->
    <link rel="stylesheet" href="../sala-styles.css" />
  </head>
  <body>
    <div class="page">
      <!-- CABEÇALHO -->
      <header class="header">
        <div class="header-left">
          <h1 class="title">Capítulo N: Nome do Capítulo</h1>
          <p class="subtitle">Geometria Analítica</p>
        </div>
        <div class="header-right">
          <p class="course-info">Geometria Analítica - 2026/1</p>
          <p class="course-info">Nome: _______________________</p>
          <p class="course-info">Data: ___/___/___</p>
        </div>
      </header>

      <!-- INSTRUÇÕES -->
      <div class="instructions">
        <p>
          Resolva os exercícios seguindo o raciocínio proposto. Preencha as
          lacunas.
        </p>
      </div>

      <!-- EXERCÍCIOS (carregados dinamicamente) -->
      <main class="columns" id="exercicios-container">
        <!-- Os exercícios são injetados aqui via JavaScript -->
      </main>

      <!-- RODAPÉ -->
      <footer class="footer">
        <p>Geometria Analítica - Exercícios de Sala | Capítulo N: Nome</p>
      </footer>
    </div>

    <script>
      const EXERCICIOS = [
        'exercicio-1.html',
        'exercicio-2.html',
        'exercicio-3.html',
        'exercicio-4.html',
        'exercicio-5.html',
        'exercicio-6.html',
      ];

      async function carregarExercicios() {
        const container = document.getElementById('exercicios-container');

        for (const arquivo of EXERCICIOS) {
          try {
            const response = await fetch(arquivo);
            if (!response.ok) throw new Error(`Falha ao carregar ${arquivo}`);
            const html = await response.text();
            container.insertAdjacentHTML('beforeend', html);
          } catch (erro) {
            console.error(`Erro ao carregar ${arquivo}:`, erro);
            container.insertAdjacentHTML(
              'beforeend',
              `<p style="color: red;">Erro ao carregar ${arquivo}</p>`
            );
          }
        }

        renderMathInElement(document.body, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
          ],
          throwOnError: false,
        });
      }

      document.addEventListener('DOMContentLoaded', carregarExercicios);
    </script>
  </body>
</html>
```

---

## Teste

```bash
# Navegar para a pasta do capítulo
cd exercicios-aula/capitulo-N-nome/

# Iniciar servidor local
python3 -m http.server 8080

# Abrir no navegador
firefox http://localhost:8080

# Testar impressão (Ctrl+P ou Cmd+P)
```

---

## Exemplo Completo de Exercício

```html
<!-- exercicio-1.html -->
<section class="exercicio" data-topico="vetores" data-dificuldade="medio">
  <p class="exercicio-enunciado">
    <span class="exercicio-numero">1.</span>
    Considere os pontos A(1, 2) e B(4, 8).
  </p>

  <p class="questao">
    Encontre o vetor que vai de A até B.
  </p>

  <p class="dialogo">
    Para ir do ponto A até o ponto B, precisamos saber quanto nos deslocamos em
    cada direção.
  </p>

  <p class="subitem">
    a) O deslocamento em <strong>x</strong> é: <strong>Δx</strong> =
    <span class="lacuna"></span>
  </p>
  <p class="subitem">
    b) O deslocamento em <strong>y</strong> é: <strong>Δy</strong> =
    <span class="lacuna"></span>
  </p>
  <p class="subitem">
    c) O vetor <strong>AB⃗</strong> = (<span class="lacuna"></span>,
    <span class="lacuna"></span>)
  </p>

  <p class="checkpoint">
    <span class="checkmark"></span>
    Verifique: o vetor aponta de A para B?
  </p>

  <p class="questao">Qual é o módulo desse vetor?</p>

  <p class="dialogo">
    O módulo é a distância entre os pontos. Use o teorema de Pitágoras.
  </p>

  <p class="subitem">
    a) <strong>|AB⃗|</strong> = √( <span class="lacuna"></span>² + <span class="lacuna"></span>² )
  </p>
  <p class="subitem">
    b) <strong>|AB⃗|</strong> = <span class="lacuna"></span>
  </p>

  <p class="dica">Calcule primeiro Δx e Δy, depois some os quadrados.</p>
</section>
```

---

## Qualidade Checklist

Antes de criar um exercício, verifique:

- [ ] Enunciado claro e direto
- [ ] Diálogo guia o raciocínio (não dá a resposta)
- [ ] Lacunas estão nos pontos certos
- [ ] Checkpoints para auto-verificação
- [ ] Notação matemática correta
- [ ] Data-topico e data-dificuldade preenchidos
- [ ] 4-6 exercícios por folha
- [ ] Testado no navegador
- [ ] Impressão funciona (coluna dupla A4)
