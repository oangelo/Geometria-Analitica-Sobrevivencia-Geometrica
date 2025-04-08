# Diretrizes Unificadas para Criação de Slides Interativos de Geometria Analítica: Sobrevivência Geométrica

## Objetivo
Criar slides interativos para um curso de Geometria Analítica, usando o tema pós-apocalíptico como contexto narrativo, com foco em visualizações que demonstrem os conceitos matemáticos de forma intuitiva enquanto utilizam metáforas de sobrevivência e reconstrução.

## Tom e Estilo
- Manter um tom **bem-humorado**, **sutil** e **sarcástico**, evitando piadas forçadas
- Utilizar referências temáticas de sobrevivência pós-apocalíptica sem menções diretas a franquias específicas
- Preferir humor **sofisticado** e **sutil** que enriqueça o conteúdo sem distrair
- Utilizar metáforas de sobrevivência para explicar conceitos (ex: "coordenadas são como marcações no seu dispositivo de rastreamento para encontrar abrigos")
- Incluir mnemônicos temáticos para facilitar a memorização de conceitos e fórmulas

## Recursos Técnicos e Implementação

### Estrutura do Template HTML
O template HTML está estruturado da seguinte forma:
- **Cabeçalho**: Configurações do Reveal.js, referências CSS e MathJax
- **Corpo**: Divisão em seções com `<section>` aninhadas (horizontais para tópicos principais, verticais para subtópicos)
- **Scripts**: Inicialização do Reveal.js, MathJax e funções interativas

### Como Utilizar o Template

1. **Estrutura de Slides**:
   ```html
   <!-- Seção horizontal para um tópico principal -->
   <section>
     <!-- Slide vertical 1: Briefing de Missão -->
     <section class="mission-briefing">
       <h2>Título do Tópico</h2>
       <!-- Conteúdo do slide... -->
     </section>
     
     <!-- Slide vertical 2: Relatório de Campo -->
     <section class="field-report level-basic">
       <!-- Conteúdo do slide... -->
     </section>
     
     <!-- Mais slides verticais... -->
   </section>
   ```

2. **Classes específicas para tipos de slide**:
   - `mission-briefing`: Slide de introdução com definição formal
   - `field-report`: Slide de contextualização e aplicações
   - `simulator`: Slide com visualização interativa
   - `survival-training`: Slide de exercícios práticos
   - `debriefing`: Slide de fechamento e síntese

3. **Classes para níveis de complexidade**:
   - `level-basic`: Nível Básico (iniciante)
   - `level-intermediate`: Nível Intermediário
   - `level-advanced`: Nível Avançado

4. **Containers para visualizações**:
   ```html
   <div class="canvas-container">
     <canvas id="[id-unico-do-topico]-canvas" width="800" height="500"></canvas>
     <div class="simulator-controls">
       <!-- Controles interativos aqui, com IDs específicos do tópico -->
     </div>
   </div>
   ```

5. **Formatação de fórmulas**:
   ```html
   <p class="formula">\( fórmula_LaTeX_aqui \)</p>
   ```

### Componentes Visuais Temáticos

1. **Painel de Informações** (para relatórios e informações):
   ```html
   <div class="info-panel">
     <div class="info-screen">
       <!-- Conteúdo aqui -->
     </div>
   </div>
   ```

2. **Dica de Sobrevivência** (para conceitos importantes):
   ```html
   <div class="survival-tip">
     <p>DICA DE SOBREVIVÊNCIA: Texto da dica aqui.</p>
   </div>
   ```

3. **Box de Definição** (para fórmulas e definições formais):
   ```html
   <div class="definition-box">
     <p class="formula">\( expressão_matemática \)</p>
     <p>Explicação da definição.</p>
   </div>
   ```

4. **Mnemônico Temático** (para memorização):
   ```html
   <p class="mnemonic">"Texto do mnemônico temático aqui."</p>
   ```

## Implementação de JavaScript com IIFEs

Para garantir que as diferentes visualizações não interfiram umas nas outras, TODAS as implementações JavaScript devem usar o padrão IIFE (Immediately Invoked Function Expression):

```javascript
// IIFE para visualização de [TÓPICO]
(function() {
  // Variáveis privadas - não vazam para o escopo global
  let canvas, ctx, outrasVariaveis;
  
  // Funções privadas - só acessíveis dentro deste escopo
  function init() {
    // Obter elementos do DOM
    canvas = document.getElementById('[id-do-topico]-canvas');
    if (!canvas) return; // Sai se o canvas não existir nesta página
    
    // Continua inicialização...
  }
  
  function draw() {
    // Implementação do desenho...
  }
  
  // Outras funções privadas...
  
  // Inicializar quando o DOM estiver pronto
  document.addEventListener('DOMContentLoaded', init);
  
  // OPCIONAL: Expor uma API mínima para interações externas
  window.[topicoVisualization] = {
    reset: function() {
      // Código para resetar...
    }
    // Outros métodos públicos se necessário...
  };
})();
```

### Benefícios do Padrão IIFE:

1. **Isolamento de escopo**: Variáveis e funções não vazam para o escopo global
2. **Prevenção de conflitos**: Mesmo com nomes similares, não há colisão entre visualizações
3. **Carregamento condicional**: Cada visualização só inicializa se seu canvas estiver presente na página
4. **API controlada**: Apenas os métodos explicitamente expostos são acessíveis externamente

### Diretrizes para Integridade do Código:

1. **IDs exclusivos por tópico**: Use prefixos consistentes em todos os IDs (ex: `coordenadas-`, `vetores-`, `retas-`)
2. **Verificação de existência**: Sempre verifique se um elemento existe antes de manipulá-lo
3. **Desvinculação de eventos**: Ao resetar estados, remova event listeners anteriores para evitar duplicação
4. **Comentários claros**: Delimite seções de código com comentários descritivos

## Componentes Interativos para Cada Tópico

Cada tópico de Geometria Analítica DEVE ter sua própria visualização interativa com a mesma estrutura e estética, mas adaptada ao conteúdo específico. Para cada visualização:

### 1. Estrutura Básica da Visualização
- Um arquivo HTML independente para desenvolvimento e teste
- Canvas HTML5 para renderização
- Controles deslizantes ou outro método de interação
- Feedback visual temático (interface de dispositivo tecnológico retro-futurista)
- Tutorial inicial que desaparece após interação

### 2. Elementos Interativos por Tópico

**Coordenadas e Pontos**:
- Canvas com plano cartesiano
- Ponto arrastável com coordenadas visíveis
- Cálculo automático de distância da origem
- Identificação de quadrante
- Feedback visual baseado na "radiação" (distância)

**Vetores no Plano**:
- Vetores arrastáveis por suas extremidades
- Visualização de componentes (projeções nos eixos)
- Controles para soma e subtração de vetores
- Cálculo de produto escalar com ângulo visível
- Simulação de "rotas de caravana" usando vetores

**Equações da Reta**:
- Reta interativa alterável por dois pontos
- Visualização das diferentes formas da equação
- Controles para parâmetros (inclinação, intercepto)
- Distância de ponto à reta com indicação visual
- Posições relativas entre retas (paralelas, perpendiculares)

**Vetores no Espaço**:
- Visualização 3D rotacionável
- Controles para componentes tridimensionais
- Produto vetorial com regra da mão direita visual
- Produto misto com visualização de volume
- Simulação de "navegação em estruturas" com vetores 3D

**Equações do Plano**:
- Plano 3D interativo
- Visualização do vetor normal
- Distância de ponto a plano com indicação visual
- Interseções com outros planos ou retas
- Simulação de "construção de fortificações" com planos

**Cônicas**:
- Visualização interativa de cada cônica
- Controles para parâmetros (focos, eixos, excentricidade)
- Transição entre diferentes cônicas
- Aplicações em "zonas de radiação" com visualização temática
- Construção geométrica das cônicas com feedback visual

### 3. Implementação do JavaScript com IIFE

Cada visualização deve seguir este padrão de implementação:

```javascript
// IIFE para isolar o escopo da visualização
(function() {
  // 1. Variáveis privadas
  let canvas, ctx, estado, elementos;
  
  // 2. Funções de conversão entre coordenadas matemáticas e canvas
  function mathToCanvas(x, y) {
    // Conversão de coordenadas matemáticas para canvas
  }
  
  function canvasToMath(x, y) {
    // Conversão de coordenadas canvas para matemáticas
  }
  
  // 3. Funções de desenho
  function drawGrid() {
    // Desenho do grid e eixos
  }
  
  function drawElements() {
    // Desenho dos elementos específicos do tópico
  }
  
  function draw() {
    // Função principal de desenho
    drawGrid();
    drawElements();
    // Outros elementos visuais
  }
  
  // 4. Manipuladores de eventos
  function handleMouseDown(e) {
    // Lógica para clique do mouse
  }
  
  function handleMouseMove(e) {
    // Lógica para movimento do mouse
  }
  
  function handleMouseUp() {
    // Lógica para soltar o botão do mouse
  }
  
  // 5. Atualização da interface e feedback
  function updateUI() {
    // Atualização dos elementos da interface (valores, textos)
    // Feedback visual baseado no estado atual
  }
  
  // 6. Inicialização - só executa se o canvas existir
  function init() {
    // Obter o canvas
    canvas = document.getElementById('id-unico-do-topico-canvas');
    if (!canvas) return; // Encerra se o canvas não existir
    
    ctx = canvas.getContext('2d');
    
    // Configuração inicial
    // Registro de eventos
    // Primeiro desenho
  }
  
  // 7. Iniciar a aplicação quando o DOM estiver pronto
  document.addEventListener('DOMContentLoaded', init);
  
  // 8. OPCIONAL: API pública mínima
  window.topicoVisualization = {
    // Métodos públicos (apenas o essencial)
    reset: function() {
      // Resetar estado
    }
    // Outros métodos públicos...
  };
})();
```

### 4. Requisitos de Interatividade

Todas as visualizações DEVEM incluir:
- **Manipulação direta**: Arrastar elementos para modificar parâmetros
- **Controles alternativos**: Sliders ou botões para ajustes precisos
- **Feedback visual temático**: Estilo interface retro-futurista
- **Feedback numérico**: Valores atualizados em tempo real
- **Estados múltiplos**: Possibilidade de visualizar diferentes configurações
- **Mensagens contextuais**: Dicas e explicações matemáticas durante a interação
- **Tutorial inicial**: Overlay com instruções básicas
- **Efeitos visuais**: Scan lines, vinheta e outros elementos de estética retro-futurista

## Processo de Integração no Template Principal

1. **Desenvolvimento separado**:
   - Criar cada visualização como um arquivo HTML independente
   - Testar completamente a interatividade antes da integração

2. **Integração no template**:
   - Copiar o HTML do slide para a seção apropriada do template
   - Adicionar o JavaScript (com IIFE) ao arquivo de scripts da apresentação
   - Garantir que todos os IDs são únicos usando prefixos consistentes

3. **Teste da integração**:
   - Verificar se cada visualização funciona corretamente no contexto do Reveal.js
   - Testar navegação entre slides para confirmar que as visualizações não interferem entre si
   - Confirmar que as visualizações só inicializam quando seus slides são exibidos

## Checklist Final de Implementação

Para cada tópico, verificar:

1. **Estrutura de slides completa**:
   - Briefing → Relatório → Simulador → Treinamento → Debriefing

2. **Visualização interativa**:
   - Implementação com IIFE para isolamento de escopo
   - IDs únicos com prefixos de tópico
   - Verificação de existência de elementos antes da manipulação
   - Feedback visual e contextual adequado à temática pós-apocalíptica

3. **Qualidade técnica**:
   - Código JavaScript encapsulado e modular
   - Tratamento adequado de eventos para evitar vazamento de memória
   - Performance otimizada para desenho em canvas
   - Consistência visual entre todas as visualizações

4. **Progressão pedagógica**:
   - Níveis de complexidade claramente definidos (básico → avançado)
   - Narrativa temática coesa e conectada aos conceitos matemáticos
   - Feedback contextualizado que reforça a compreensão conceitual

Seguindo estas diretrizes detalhadas e adotando o padrão IIFE para todas as visualizações, você garantirá slides interativos consistentes, modulares e livres de conflitos para uma experiência de aprendizado envolvente em Geometria Analítica com tema pós-apocalíptico.
