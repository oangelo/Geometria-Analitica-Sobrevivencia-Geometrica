# Diretrizes para Criação de Slides Interativos de Geometria Analítica: Sobrevivência Geométrica

## IMPORTANTE: Uso do CSS Existente
- **NUNCA gere CSS adicional** em blocos de estilo ou estilos inline
- **SEMPRE use apenas as classes existentes** no arquivo style.css fornecido
- **NÃO crie novas classes ou estilos personalizados** - use apenas o que já existe
- Todas as visualizações e elementos interativos devem usar apenas as classes CSS já definidas

## Objetivo
Criar slides interativos para um curso de Geometria Analítica, usando o tema pós-apocalíptico como contexto narrativo, com foco em visualizações que demonstrem os conceitos matemáticos de forma intuitiva enquanto utilizam metáforas de sobrevivência e reconstrução.

## Tom e Estilo
- Manter um tom **bem-humorado**, **sutil** e **sarcástico**, evitando piadas forçadas
- Utilizar referências temáticas de sobrevivência pós-apocalíptica sem menções diretas a franquias específicas
- Preferir humor **sofisticado** e **sutil** que enriqueça o conteúdo sem distrair
- Utilizar metáforas de sobrevivência para explicar conceitos (ex: "coordenadas são como marcações no seu dispositivo de rastreamento para encontrar abrigos")
- Incluir mnemônicos temáticos para facilitar a memorização de conceitos e fórmulas

## Recursos Técnicos e Implementação

### Classes CSS Disponíveis
O arquivo `styles.css` já contém todas as classes necessárias. Utilize apenas estas classes existentes:

1. **Cabeçalhos e Texto**:
   - Títulos: Padrões do Reveal.js com classes `.reveal h1`, `.reveal h2`, etc.
   - Fórmulas: `.formula` para destacar expressões matemáticas
   - Texto padrão: `.reveal section p` e `.reveal section blockquote`

2. **Tipos de Slides**:
   - `.mission-briefing`: Slide de introdução com definição formal
   - `.field-report`: Slide de contextualização e aplicações
   - `.simulator`: Slide com visualização interativa
   - `.survival-training`: Slide de exercícios práticos
   - `.debriefing`: Slide de fechamento e síntese

3. **Níveis de Complexidade**:
   - `.level-basic`: Nível Básico (iniciante)
   - `.level-intermediate`: Nível Intermediário
   - `.level-advanced`: Nível Avançado

4. **Elementos de Visualização**:
   - `.canvas-container`: Container para canvas de visualização
   - `.simulator-controls`: Área para controles de simulação
   - `.control-panel`: Painel com controles interativos
   - `.operation-btn`: Botões para operações nas visualizações
   - `.hint-message`: Mensagens de dica abaixo do simulador

5. **Elementos Temáticos**:
   - `.info-panel` e `.info-screen`: Para painel de informações
   - `.survival-tip`: Para dicas importantes
   - `.definition-box`: Para definições formais
   - `.mnemonic`: Para mnemônicos temáticos
   - `.training-problem`: Para exercícios práticos
   - `.problem-context`: Para contextualização de problemas

6. **Efeitos Visuais**:
   - `.crt-effect`: Efeito de scan line para interfaces antigas
   - `.interactive-element`: Efeito de pulsação para elementos interativos
   - `.radiation-glow`: Efeito de glow para elementos destacados

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

2. **Canvas para Visualizações**:
   ```html
   <div class="canvas-container">
     <canvas id="[id-unico-do-topico]-canvas" width="800" height="400"></canvas>
     <div class="simulator-controls">
       <!-- Controles interativos aqui, com IDs específicos do tópico -->
     </div>
   </div>
   ```

3. **Formatação de Fórmulas**:
   ```html
   <p class="formula">\( fórmula_LaTeX_aqui \)</p>
   ```

### Componentes Visuais Temáticos

1. **Painel de Informações**:
   ```html
   <div class="info-panel">
     <div class="info-screen">
       <!-- Conteúdo aqui -->
     </div>
   </div>
   ```

2. **Dica de Sobrevivência**:
   ```html
   <div class="survival-tip">
     <p>DICA DE SOBREVIVÊNCIA: Texto da dica aqui.</p>
   </div>
   ```

3. **Box de Definição**:
   ```html
   <div class="definition-box">
     <p class="formula">\( expressão_matemática \)</p>
     <p>Explicação da definição.</p>
   </div>
   ```

4. **Mnemônico Temático**:
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

## Componentes Interativos para Cada Tópico

Cada tópico de Geometria Analítica DEVE ter sua própria visualização interativa com a mesma estrutura e estética, mas adaptada ao conteúdo específico. Para cada visualização:

### 1. Estrutura Básica da Visualização
- Um arquivo HTML independente para desenvolvimento e teste
- Canvas HTML5 para renderização
- Controles deslizantes ou outro método de interação
- Feedback visual temático (interface de dispositivo tecnológico retro-futurista)
- Tutorial inicial que desaparece após interação

### 2. Padrões HTML para Elementos Interativos
Utilize estes padrões HTML para todos os elementos interativos, garantindo consistência:

**Controles Deslizantes**:
```html
<div class="control-panel">
  <label for="[id-controle]">Rótulo:</label>
  <input type="range" id="[id-controle]" min="-10" max="10" value="0" step="0.5">
  <span id="[id-controle]-value">0</span>
</div>
```

**Botões de Operação**:
```html
<div class="control-panel">
  <button id="[id-botao]" class="operation-btn">Nome da Operação</button>
</div>
```

**Mensagens e Dicas**:
```html
<div class="hint-message">
  <p>Texto da dica ou mensagem.</p>
</div>
```

## Processo de Integração no Template Principal

1. **Desenvolvimento separado**:
   - Criar cada visualização como um arquivo HTML independente
   - Testar completamente a interatividade antes da integração
   - Garantir que o HTML usa apenas classes existentes no styles.css

2. **Integração no template**:
   - Copiar o HTML do slide para a seção apropriada do template
   - Adicionar o JavaScript (com IIFE) ao arquivo de scripts da apresentação
   - Garantir que todos os IDs são únicos usando prefixos consistentes

3. **Teste da integração**:
   - Verificar se cada visualização funciona corretamente no contexto do Reveal.js
   - Testar navegação entre slides para confirmar que as visualizações não interferem entre si

## Lembrete Importante
- **NUNCA inclua tags `<style>` ou atributos `style=""` inline**
- **SEMPRE utilize apenas as classes CSS já definidas** no arquivo styles.css
- **Todos os estilos visuais devem ser aplicados usando as classes disponíveis**
- **Não crie classes personalizadas** - adapte seu HTML para usar as classes existentes

## Tópicos Específicos de Geometria Analítica

1. **Coordenadas e Pontos ("Mapeamento da Wasteland")**
   - Sistema de coordenadas cartesianas
   - Distância entre pontos
   - Ponto médio e baricentro
   - Contexto: Mapeamento de locais de recursos e abrigos

2. **Vetores no Plano ("Rotas de Caravanas")**
   - Operações vetoriais básicas
   - Produto escalar e aplicações
   - Bases e componentes
   - Contexto: Planejamento de rotas comerciais seguras

3. **Equações da Reta ("Linhas de Suprimento")**
   - Formas das equações da reta
   - Posições relativas entre retas
   - Distância de ponto à reta
   - Contexto: Construção de rotas de abastecimento

4. **Vetores no Espaço ("Navegação 3D")**
   - Produto vetorial e aplicações
   - Produto misto
   - Contexto: Navegação em estruturas complexas

5. **Equações do Plano ("Fortificações")**
   - Formas das equações do plano
   - Posições relativas entre planos
   - Distância de ponto a plano
   - Contexto: Planejamento de assentamentos e defesas

6. **Cônicas ("Zonas de Radiação")**
   - Circunferência
   - Elipse
   - Hipérbole
   - Parábola
   - Contexto: Mapeamento de zonas de contaminação e áreas seguras

## Exemplo de Implementação Completa: Usando apenas classes CSS existentes

```html
<!-- Exemplo de tópico completo dentro do template -->
<section>
  <!-- 1. BRIEFING DE MISSÃO -->
  <section class="mission-briefing">
    <h2>Coordenadas e Pontos</h2>
    <h3 class="mission-subtitle">Mapeamento da Wasteland</h3>
    <div class="mission-description">
      <p>As coordenadas são a diferença entre sobreviver e virar almoço de um predador.</p>
      <p class="mnemonic">"XY marca o ponto - X leste/oeste do Abrigo, Y norte/sul. Quem não sabe se localizar na wasteland, vira almoço de mutante."</p>
    </div>
    <div class="definition-box">
      <p class="formula">\( P(x,y) \)</p>
      <p>Um ponto P no plano cartesiano é definido pelo par ordenado de coordenadas (x,y).</p>
    </div>
  </section>
  
  <!-- 2. RELATÓRIO DE CAMPO -->
  <section class="field-report level-basic">
    <h3>Relatório de Campo: Nível Básico</h3>
    <div class="info-panel">
      <div class="info-screen">
        <h4>Aplicações:</h4>
        <ul>
          <li>Localização de fontes de água potável</li>
          <li>Mapeamento de áreas seguras sem radiação</li>
          <li>Marcação de pontos de encontro para caravanas</li>
        </ul>
      </div>
    </div>
    <div class="survival-tip">
      <p>DICA DE SOBREVIVÊNCIA: Sempre memorize as coordenadas do seu Abrigo. É o caminho de volta para casa.</p>
    </div>
  </section>
  
  <!-- 3. SIMULADOR -->
  <section class="simulator">
    <h3>Simulador: Coordenadas</h3>
    <div class="canvas-container">
      <canvas id="coordenadas-canvas" width="800" height="400"></canvas>
      <div class="simulator-controls">
        <div class="control-panel">
          <label for="coordenadas-x">X:</label>
          <input type="range" id="coordenadas-x" min="-10" max="10" value="0" step="0.5">
          <span id="coordenadas-x-value">0</span>
          
          <label for="coordenadas-y">Y:</label>
          <input type="range" id="coordenadas-y" min="-10" max="10" value="0" step="0.5">
          <span id="coordenadas-y-value">0</span>
        </div>
      </div>
    </div>
    <div class="hint-message">
      <p>Arraste o ponto ou use os controles para alterar suas coordenadas.</p>
    </div>
  </section>
  
  <!-- 4. TREINAMENTO DE SOBREVIVÊNCIA -->
  <section class="survival-training">
    <h3>Treinamento de Sobrevivência</h3>
    <div class="training-problem">
      <h4>Problema #1: Abastecimento Crítico</h4>
      <p>Você está no ponto A(3, 4) e precisa alcançar um posto de troca no ponto B(7, -2).</p>
      <ol>
        <li>Calcule a distância direta entre os pontos</li>
        <li>Determine o ponto médio da rota para descanso</li>
      </ol>
    </div>
    <div class="problem-context">
      <p>Uma tempestade de radiação se aproxima. Você tem tempo limitado para chegar ao abrigo.</p>
    </div>
  </section>
  
  <!-- 5. DEBRIEFING -->
  <section class="debriefing">
    <h3>Debriefing: Coordenadas e Pontos</h3>
    <div class="summary-box">
      <p>As coordenadas são a base da sua sobrevivência na wasteland. Dominar este conceito é essencial antes de aventurar-se além dos limites do Abrigo.</p>
    </div>
    <div class="next-mission">
      <p>Próxima missão: Vetores no Plano - A arte de se mover na direção certa.</p>
    </div>
    <div class="instructor-note">
      <p>"Lembre-se: Quem não sabe onde está, não sabe para onde vai. E na wasteland, isso geralmente significa um caminho sem volta."</p>
    </div>
  </section>
</section>
```

Seguindo estas diretrizes detalhadas, você criará slides interativos consistentes para todos os tópicos de Geometria Analítica, mantendo a temática pós-apocalíptica e garantindo uma experiência de aprendizado envolvente e eficaz - tudo isso usando APENAS as classes CSS existentes, sem adicionar novos estilos.
