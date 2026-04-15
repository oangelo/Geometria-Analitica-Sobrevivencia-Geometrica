# Exercícios — Instruções para Agentes

## Referências

Antes de começar qualquer trabalho, leia estes documentos (nesta ordem):

1. **`checklist-conceitos-permitidos.md`** — o que pode e não pode usar por capítulo, progressão narrativa obrigatória
2. **`diretrizes-listas-de-exercicios.md`** — os 8 princípios de design de listas + formato de enunciado + fundamentação teórica
3. **`../ESTILO.md`** — referência completa de notação matemática (pontos, vetores, cônicas, CSS)
4. **`../AGENTS.md`** — guia geral do repositório (estrutura, worktrees, convenções)

---

## Estrutura de arquivos por tópico

> **Nota sobre branches:** Os exercícios estão sendo editados diretamente na branch `main`
> do repositório raiz (`exercicios/`), e não nos worktrees.
> O workflow de worktrees (`worktrees/exercicios/` → `feature/exercicios`) não está em uso
> para este projeto no momento.

Cada tópico tem três arquivos:

```
capitulo-N/
├── topico.html                 # Loader (HTML completo, monta manual + exercícios via fetch)
├── topico-manual.html          # Fundamentação teórica (fragmento HTML)
└── topico/                     # Pasta com exercícios individuais
    ├── nome-exercicio-01.html
    ├── nome-exercicio-02.html
    └── ...
```

- **`topico.html`** — arquivo principal. Contém CSS inline, configuração MathJax e JS que faz fetch do manual e dos exercícios. NÃO editar o CSS ou a estrutura de loader sem necessidade.
- **`topico-manual.html`** — fragmento HTML com `<section class="manual-contexto" data-context="manual-sobrevivencia">`. Contém apenas a fundamentação teórica (conceitos, fórmulas, técnicas).
- **`topico/*.html`** — fragmentos HTML com `<div class="exercise">`. Cada arquivo é um exercício completo.

---

## Como criar um exercício

1. Leia `checklist-conceitos-permitidos.md` — identifique o capítulo e a progressão narrativa obrigatória
2. Leia `diretrizes-listas-de-exercicios.md` — entenda os 9 princípios, a progressão pedagógica (4 fases) e os exemplos
3. Gere a **progressão pedagógica** para o tópico (seguindo o padrão das 4 fases e os exemplos de Álgebra/Frações)
4. Para cada exercício, escreva o **parágrafo narrativo** que conecta ao anterior (princípio 9)
5. Use APENAS conceitos já abordados até aquele ponto na progressão
6. Escreva o enunciado como texto corrido (ver seção de formato abaixo)
7. Inclua dica (níveis básico/intermediário) e solução completa
8. Termine com "Reflexão de Sobrevivência"
9. Adicione o arquivo ao array `EXERCICIOS` no loader (`topico.html`)
10. Verifique MathJax: `grep -c '\\\\' arquivo.html`

---

## Formato de cada exercício (fragmento HTML)

```html
<div class="exercise">
<h3>TÍTULO EM MAIÚSCULAS</h3>

<p><em>Parágrafo narrativo: conexão com exercício anterior, motivação matemática,
o que mudou, para onde estamos indo. Este parágrafo é OBRIGATÓRIO e vem ANTES
do enunciado. Ver princípio 9 em diretrizes-listas-de-exercicios.md.</em></p>

<p>Enunciado do problema com $math$ inline e dados necessários.</p>

<p><strong>(a)</strong> Primeira parte do problema...</p>
<p><strong>(b)</strong> Segunda parte...</p>

<details class="hint-details">
<summary>DICA DE SOBREVIVÊNCIA</summary>
<div class="hint">
<p>Dica que destrava o início sem revelar a resolução completa.</p>
</div>
</details>

<details>
<summary>ACESSO NÍVEL: SUPERVISOR</summary>
<ol class="solution-steps">
<li>Primeiro passo da resolução...</li>
<li>Segundo passo...</li>
</ol>
<div class="formula">
$$fórmula principal$$
</div>
<p><strong>Reflexão de Sobrevivência:</strong> Conexão entre o problema e o cenário pós-apocalíptico.</p>
</details>
</div>
```

### Regras de formatação

- **Parágrafo narrativo:** `<p><em>...</em></p>` antes do enunciado — OBRIGATÓRIO (princípio 9)
- **Enunciado:** texto corrido com `<p>`, sem `<div>` wrapper, sem `<ul><li>`
- **Sub-itens:** `<p><strong>(a)</strong> texto...</p>` (nunca `<ul><li>`)
- **Referências:** pelo conceito ("no exercício anterior sobre produto escalar"), nunca pelo número
- **Dica:** omitir completamente nos exercícios OMEGA (desafiador, sem dica)
- **Reflexão de Sobrevivência:** obrigatória em todos os exercícios, dentro do `<details>` da solução

---

## Progressão de dificuldade

Cada lista deve ter progressão clara. Não é obrigatório um número fixo de exercícios — cobrir o conteúdo é mais importante.

| Nível | Nome | Quantidade típica | Dica | Características |
|-------|------|-------------------|------|-----------------|
| ALFA | Básico | 2-3 | Sim, explícita | Cálculos diretos, conceito isolado, conexão clara com definição |
| BETA | Intermediário | 2-3 | Sim | Múltiplos conceitos, algumas etapas, interpretação necessária |
| GAMMA | Avançado | 2-3 | Mínima | Análise, múltiplas estratégias, pode exigir escolha de método |
| OMEGA | Desafiador | 1-2 | Não | Múltiplos conceitos integrados, pode exigir criatividade |

**Total típico:** 8-15 exercícios por tópico. Mínimo 6. Adicionar mais se o tópico for complexo ou tiver muitos sub-conceitos.

---

## Temática e Tom

### Cenário
Pós-apocalíptico: "Zona Devastada", "Abrigo", "Mutantes", "Traje de Proteção", "RemoveRad", "SUPERVISOR", "REFÚGIO-TEC"

### Tom
Sério com humor sutil e sarcástico. Sem piadas forçadas. O cenário é o pano de fundo, não o protagonista — a matemática é o protagonista.

### Vocabulário temático (use consistentemente)

| Termo | Uso |
|-------|-----|
| RemoveRad | Antirradiativo (não "RadAway") |
| Zona Devastada | Wasteland (não usar inglês) |
| Mutantes | Criaturas hostis |
| SUPERVISOR | Autoridade máxima (não "Overseer") |
| Traje de Proteção | Armadura (não "Power Armor") |
| MISSÃO | Exercício (usado nos títulos) |
| DICA DE SOBREVIVÊNCIA | Hint |
| ACESSO NÍVEL: SUPERVISOR | Solução |
| Reflexão de Sobrevivência | Conexão temática no final |

---

## Regras Críticas

### MathJax

- **Delimitadores:** `$inline$` e `$$bloco$$`
- **Configuração:** já está no template loader (não reconfigurar)
- **Script:** `<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>` (já no loader)
- **Verificar:** após escrever cada arquivo, garantir que não há barras duplas acidentais

### CSS

- Usar APENAS classes existentes do template: `.exercise`, `.hint`, `.formula`, `.mission-counter`, `.solution-steps`, `.terminal-border`, `.terminal-line`, `.hint-details`, `.warning`, `.danger`, `.success`
- NÃO criar novas classes
- NÃO adicionar `<style>` nos fragmentos de exercícios (o CSS fica no loader)

### Restrições matemáticas

- **NUNCA** usar cálculo diferencial ou integral
- Apenas álgebra, geometria e trigonometria básica
- Respeitar a progressão do curso: não antecipar conceitos de capítulos futuros
- Consultar `checklist-conceitos-permitidos.md` para cada capítulo

### Notação (resumo — ver `../ESTILO.md` para referência completa)

- Pontos: letras **maiúsculas** com coordenadas — $A(2, -3)$, $P(x_0, y_0)$
- Vetores: `$\vec{v}$` (nunca negrito); índices fora — `$\vec{n}_1$`, não `$\vec{n_1}$`
- Separador decimal: vírgula — `$0{,}6$`
- Focos de cônicas: sempre LaTeX `$F_1$`, nunca Unicode "F₁"
- Canônicos: `$\vec{e}_1, \vec{e}_2$` ou `$\vec{i}, \vec{j}$` — nunca reutilizar essas letras como variáveis

---

## Pipeline de Revisão

Cada tópico de exercício pode passar por até 4 etapas com 3 agentes distintos.

### Etapa 1 — RTC (Revisão Técnica de Conteúdo)

**Agente:** 1 (pesquisa)

**Objetivo:** Antes de escrever exercícios, validar o conteúdo.

- Ler `diretrizes-listas-de-exercicios.md` e `checklist-conceitos-permitidos.md`
- Identificar a progressão narrativa do tópico
- Verificar quais conceitos podem e não podem ser usados
- Listar os exercícios planejados com justificativa narrativa
- Gerar o `intro.html` (fundamentação teórica)

**Entregável:** `intro.html` + lista de exercícios planejados com descrição

### Etapa 2 — Implementação

**Agente:** 2 (escrita)

**Objetivo:** Escrever os exercícios seguindo o plano do RTC.

- Seguir o plano aprovado
- Escrever cada exercício como arquivo individual
- Seguir o formato especificado (ver acima)
- Atualizar o array `EXERCICIOS` no loader
- Verificar MathJax em cada arquivo

**Entregável:** arquivos `exercicio-*.html` + loader atualizado

### Etapa 3 — Revisão

**Agente:** 3 (revisão)

**Objetivo:** Verificar qualidade e consistência.

- Conferir se a progressão narrativa está clara
- Verificar notação matemática (ver `../ESTILO.md`)
- Verificar se nenhum conceito de capítulo futuro foi antecipado
- Verificar CSS (só classes existentes)
- Verificar MathJax (sem barras duplas acidentais)
- Verificar vocabulário temático consistente

**Entregável:** lista de correções ou aprovação

### Etapa 4 — Resumo

**Qualquer agente**

**Objetivo:** Documentar o que foi feito.

- Resumir exercícios criados
- Listar conceitos cobertos
- Identificar lacunas para preenchimento futuro

---

## Fundamentação Teórica (manual)

O arquivo `*-manual.html` é uma mini-aula passiva. Para detalhes de formatação, ver `diretrizes-listas-de-exercicios.md`.

**Estrutura:**

```html
<section class="manual-contexto" data-context="manual-sobrevivencia">
    <div class="terminal-border">
        <h2 class="terminal-line">> MANUAL DE SOBREVIVÊNCIA MATEMÁTICA: [TÓPICO]</h2>

        <p>Contextualização (1-2 parágrafos: por que este tópico importa na Zona Devastada?)</p>

        <p>Conceito principal: explicação com $math$ inline.</p>

        <div class="formula">
        $$fórmula principal$$
        </div>

        <p>Parâmetros e interpretações da fórmula.</p>

        <p>Conexão com próximo conceito (se houver): "Com isso, podemos agora..."</p>

        <p>Técnicas principais: lista de métodos de resolução.</p>
    </div>
</section>
```
