# Guia de Remoção de Facilitações - Capítulo 5 (Cônicas)

## Objetivo
Tornar os exercícios do Capítulo 5 mais desafiadores, alinhando-se ao estilo do Capítulo 0 (Preparação), removendo facilitações que eliminam o raciocínio do aluno.

## Princípios Gerais

### 1. Remover Explicações Pós-Primeiro Igual
**Regra**: Tudo que aparece APÓS o primeiro sinal `=` e antes da lacuna deve ser removido se for uma explicação ou passo intermediário.

**Exemplo** (t2-parabola.html, linha 99):
- **ANTES**: `d) O foco é $F(h, k + p) = F(2, 1 + ($<span class="lacuna"></span>$)) = F(2, $<span class="lacuna"></span>$)$.`
- **DEPOIS**: `d) O foco é $F($<span class="lacuna"></span>$, $<span class="lacuna"></span>$)$.`

### 2. Não Fornecer Cálculos Intermediários
**Regra**: Não mostrar operações aritméticas prontas. O aluno deve calcular.

**Exemplo** (t3-elipse.html, linha 21):
- **ANTES**: `c) Calcule $c^2 = a^2 - b^2 = 25 - 16 =$ <span class="lacuna"></span>, logo $c =$ <span class="lacuna"></span>.`
- **DEPOIS**: `c) Calcule $c^2 = a^2 - b^2$, depois $c =$ <span class="lacuna"></span>.`

### 3. Deixar o Aluno Derivar Fórmulas
**Regra**: Não mostrar expansões algébricas completas.

**Exemplo** (t2-parabola.html, linha 24):
- **ANTES**: `d) Expandindo o lado esquerdo: $x^2 + y^2 - 2py + p^2 = y^2 + 2py + p^2$. Simplificando: $x^2 =$ <span class="lacuna"></span>.`
- **DEPOIS**: `d) Desenvolva e simplifique: $x^2 =$ <span class="lacuna"></span>.`

### 4. Verificações Conceituais
**Regra**: Verificações devem pedir confirmação, não fornecer resposta.

**Exemplo** (t2-parabola.html, linha 54):
- **ANTES**: `Verificação: $p = 2$, foco em $(0, 2)$, diretriz $y = -2$, vértice na origem. A distância vértice-foco é igual à distância vértice-diretriz: $|p| = 2$.`
- **DEPOIS**: `Verificação: A distância vértice-foco deve ser igual à distância vértice-diretriz. Verifique se seu resultado satisfaz essa condição.`

### 5. Reduzir Decomposição
**Regra**: Não decompor cálculos simples em múltiplos sub-itens.

**Exemplo** (t5-classificacao-discriminante.html, linha 15):
- **ANTES**: `a) Para $x^2 + 4y^2 - 4 = 0$: identifique $A =$ <span class="lacuna"></span>, $B =$ <span class="lacuna"></span>, $C =$ <span class="lacuna"></span>. Calcule $B^2 - 4AC = 0 - 4 \cdot 1 \cdot 4 =$ <span class="lacuna"></span>.`
- **DEPOIS**: `a) Identifique $A$, $B$, $C$ e calcule o discriminante $\Delta = B^2 - 4AC$.`

## Arquivos para Modificar

### 1. t1-lugar-geometrico.html
**Prioridade**: Média
**Facilitações identificadas**:
- Linha 18: `b) O ponto médio de $AB$ é $M = \left(\frac{1 + 5}{2}, \frac{2 + 2}{2}\right) = ($<span class="lacuna"></span>$, $<span class="lacuna"></span>$)$.`
  - **Mudar para**: `b) O ponto médio de $AB$ é $M = ($<span class="lacuna"></span>$, $<span class="lacuna"></span>$)$.`

- Linha 21: `c) O vetor $\overrightarrow{AB} = (5 - 1, 2 - 2) = ($<span class="lacuna"></span>$, $<span class="lacuna"></span>$)$ é horizontal.`
  - **Mudar para**: `c) O vetor $\overrightarrow{AB} = ($<span class="lacuna"></span>$, $<span class="lacuna"></span>$)$.`

### 2. t2-parabola.html
**Prioridade**: Alta (exemplo mencionado pelo usuário)
**Facilitações identificadas**:
- Linha 24: Explicação completa da expansão
- Linha 40: `a) $4p = 8$, logo $p =$ <span class="lacuna"></span>.`
  - **Mudar para**: `a) Encontre $p$ a partir de $4p = 8$.`

- Linha 43: `b) O foco é $F(0, p) = F(0, $<span class="lacuna"></span>$)$.`
  - **Mudar para**: `b) O foco é $F($<span class="lacuna"></span>$, $<span class="lacuna"></span>$)$.`

- Linha 99: Exemplo clássico de facilitação excessiva
  - **Mudar para**: `d) O foco é $F($<span class="lacuna"></span>$, $<span class="lacuna"></span>$)$.`

### 3. t3-elipse.html
**Prioridade**: Alta
**Facilitações identificadas**:
- Linha 21: `c) Calcule $c^2 = a^2 - b^2 = 25 - 16 =$ <span class="lacuna"></span>, logo $c =$ <span class="lacuna"></span>.`
  - **Mudar para**: `c) Calcule $c^2 = a^2 - b^2$, depois $c =$ <span class="lacuna"></span>.`

- Linha 68: `c) Calcule $b^2 = a^2 - c^2 = 25 - 9 =$ <span class="lacuna"></span>, logo $b =$ <span class="lacuna"></span>.`
  - **Mudar para**: `c) Calcule $b^2 = a^2 - c^2$, depois $b =$ <span class="lacuna"></span>.`

### 4. t4-hiperbole.html
**Prioridade**: Alta
**Facilitações identificadas**:
- Linha 21: `c) Calcule $c^2 = a^2 + b^2 = 9 + 16 =$ <span class="lacuna"></span>, logo $c =$ <span class="lacuna"></span>.`
  - **Mudar para**: `c) Calcule $c^2 = a^2 + b^2$, depois $c =$ <span class="lacuna"></span>.`

- Linha 90: `c) Calcule $b^2 = c^2 - a^2 = 625 - 225 =$ <span class="lacuna"></span>, logo $b =$ <span class="lacuna"></span>.`
  - **Mudar para**: `c) Calcule $b^2 = c^2 - a^2$, depois $b =$ <span class="lacuna"></span>.`

### 5. t5-classificacao-discriminante.html
**Prioridade**: Média
**Facilitações identificadas**:
- Linha 15: Decomposição excessiva
- Linha 46: `a) Para $x^2 + 2xy + y^2 - 4 = 0$: $A =$ <span class="lacuna"></span>, $B =$ <span class="lacuna"></span>, $C =$ <span class="lacuna"></span>. Calcule $B^2 - 4AC = 4 - 4 \cdot 1 \cdot 1 =$ <span class="lacuna"></span>.`
  - **Mudar para**: `a) Identifique $A$, $B$, $C$ e calcule $\Delta = B^2 - 4AC$.`

### 6. t6-sintese-conicas.html
**Prioridade**: Média
**Facilitações identificadas**:
- Linha 52: `a) $2x^2 + 3y^2 - 6 = 0$: $A =$ <span class="lacuna"></span>, $B =$ <span class="lacuna"></span>, $C =$ <span class="lacuna"></span>. $\Delta = 0 - 24 =$ <span class="lacuna"></span>. Tipo: <span class="lacuna"></span>.`
  - **Mudar para**: `a) $2x^2 + 3y^2 - 6 = 0$: Identifique $A$, $B$, $C$, calcule $\Delta$ e classifique.`

## Checklist de Validação

Para cada exercício modificado, verifique:
- [ ] O aluno ainda consegue entender o que está sendo pedido?
- [ ] A fórmula/conceito básico ainda está disponível?
- [ ] Removemos apenas facilitações, não instruções essenciais?
- [ ] O exercício agora exige raciocínio ao invés de substituição mecânica?

## Nota Importante
NÃO remover:
- Instruções conceituais iniciais
- Definições de fórmulas quando são novas
- Contexto do problema (<Application>)
- Dicas conceituais (não procedimentais)
