# Checklist por Seção — Slides Reveal.js

**Versão:** 1.0 (adaptado do Cálculo Vetorial)
**Uso:** Agente 3 (implementador) e Agente 4 (verificador) verificam cada seção contra este checklist.
**Referência:** `template-spec.md` (fluxo pedagógico), `narrative-spec.md` (inserts + fragmentos), `pedagogical-spec.md` (dissonância), `AGENTS.md` (pipeline).

---

## Para cada seção de conteúdo (02–NN)

### ABERTURA (V1)

- [ ] V1 tem pergunta-problema ou motivação concreta (por que estudamos isso)?
- [ ] V1 conecta com o tópico anterior (progressão)?
- [ ] V1 tem insert narrativo (1-2 frases, parágrafo final)?
  - Se não houver conexão natural, foi criada por analogia/contraste/ironia?
- [ ] Insert usa tom seco, sem adjetivos dramáticos?
- [ ] Insert não repete fato de outro insert/fragmento do capítulo?

### CONCEITO (V2)

- [ ] V2 apresenta a ideia ANTES da fórmula?
- [ ] V2 tem analogia visual ou exemplo intuitivo (sobrevivência ou cotidiano)?
- [ ] O aluno entende O QUE é antes de ver COMO se calcula?

### FORMALIZAÇÃO (V3–V4)

- [ ] V3 tem definição matemática precisa?
- [ ] Fórmula principal está em destaque (`formula` ou `formula-spotlight` após issue #45)?
- [ ] V4 tem interpretação geométrica ou propriedades importantes?
- [ ] Layout está correto (painel duplo quando comparando, definition-box quando explanando)?

### APLICAÇÃO (V5–V6)

- [ ] Pelo menos 1 exemplo guiado com `problem-section` / `training-problem` (enunciado apenas)?
- [ ] Toda taxonomia / caso de classificação (posições relativas, casos de método) tem ≥1 exemplo numérico correspondente (enunciado apenas)?
- [ ] Exemplo é um problema clássico do tópico (não um truque)?
- [ ] Exemplo é calculável em aula (número razoável de passos)?
- [ ] Se há 2-3 exemplos, são variações progressivas ou casos diferentes?
- [ ] Variantes de layout não se repetem em exemplos consecutivos (alternância)?
- [ ] Se o exemplo tem fragmento (painel duplo): esquerda = matemática, direita = fragmento?
- [ ] Fragmento NÃO força conexão lógica com o exemplo (justaposição livre é válida)?
- [ ] Fragmento gera emoção (dissonância, ironia, desconforto, curiosidade)?
- [ ] Fragmento tem 2-4 frases, tom seco, sem classe CSS especial?
- [ ] Fragmento com dado numérico tem fonte verificável (IBGE, IPEA, ONU, dados oficiais)?
- [ ] Fragmento não é partidário (crítica sistêmica, não partidária)?
- [ ] Fragmentos ao longo do capítulo distribuem beats narrativos sem repetição?

### EXPLORAÇÃO (V7, se aplicável)

- [ ] Visualização interativa com Canvas 2D?
- [ ] Posição flexível: pode estar entre CONCEITO e FORMALIZAÇÃO, ou na INTERPRETAÇÃO, quando apoia a definição — não obrigatoriamente no V7 final?
- [ ] IIFE com `window.vizNome = { init, cleanup }`?
- [ ] IDs únicos para cada canvas?
- [ ] Paleta de cores segue a tabela do tema (verde terminal, amarelo, vermelho)?

### QUALIDADE DE CONTEÚDO (todas as seções de conteúdo)

- [ ] Exemplos são clássicos E simples (2-5 passos em sala, sem truque de substituição longo)?
- [ ] Narrativa é concreta: fatos verificáveis, sem "o engenheiro que calculou..." genérico?
- [ ] Fragmentos variam beats e não repetem inserts de V1 nem entre si?
- [ ] Conteúdo técnico é prioridade: inserções não roubam o foco da matemática?

---

## Para cada seção especial

### 00-capa

- [ ] Título do capítulo correto?
- [ ] Subtítulo temático coerente com o arco do capítulo (issue #46)?
- [ ] Zero slides verticais?

### 01-narrativa

- [ ] Apresenta o tema social do capítulo (3-5 frases, tom seco)?
- [ ] Sem fórmulas matemáticas?
- [ ] Planta a pergunta-problema do capítulo sem resposta?

### NN-resumo

- [ ] Cheat sheet de fórmulas (todas do capítulo)?
- [ ] Mapa de conexões entre tópicos?
- [ ] Sem insert narrativo (referência técnica pura)?

### NN+1-reflexao

- [ ] Dissonância final (1 frase)?
- [ ] Pergunta aberta sem resposta?
- [ ] Sem resolução — aluno sai com desconforto?

---

## Técnico (todas as seções)

- [ ] MathJax: `\(...\)` inline, `\[...\]` bloco, sem `\\` duplo?
- [ ] Verificação: `grep -c '\\\\' arquivo.html` — resultado = 0?
- [ ] Zero CSS inline (`grep -n 'style=' arquivo.html` — vazio)?
- [ ] Zero blocos `<style>` nos arquivos de seção?
- [ ] HTML fragmento (sem `<html>`, `<head>`, `<body>`, sem scripts de MathJax/Reveal)?
- [ ] `\\` apenas dentro de `<script>` (config MathJax) e `bmatrix`?
- [ ] IDs únicos para cada canvas (sem colisões)?
- [ ] Nenhum script CDN duplicado nas seções (tudo no loader)?

---

## Coerência narrativa (verificação entre seções)

- [ ] Todo tópico (02–NN) tem insert no V1?
- [ ] Os inserts formam um arco narrativo coerente (cada beat é único)?
- [ ] Nenhum fato se repete entre inserts?
- [ ] Tipo de crítica diferente de capítulos adjacentes (issue #46)?
- [ ] Inserts usam tipos variados (justaposição, ironia, contraste, fato impactante)?
- [ ] O arco narrativo faz sentido lendo apenas os inserts em ordem?
- [ ] Fragmentos junto a exemplos complementam (sem repetir) os inserts de V1?
- [ ] Fragmentos ao longo do capítulo formam arco coerente com inserts?
- [ ] Nenhum dado inventado — números com fonte?
- [ ] Nenhum partidarismo — crítica sistêmica?
