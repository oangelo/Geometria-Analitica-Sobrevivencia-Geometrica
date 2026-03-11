# Guia de Trabalho para Agentes - Slide Decks

Este documento descreve o processo obrigatório para correções e criação de novos slides no projeto Sobrevivência Geométrica.

## Processo de Correção/Criação de Slides

Sempre que for solicitada uma **correção visual** ou **criação de novo slide**, siga obrigatoriamente estes passos:

### 1. Verificação Visual Automatizada

Após fazer qualquer alteração em arquivos HTML/CSS de slides, **você DEVE**:

```
1. Subir um servidor web local
2. Navegar até o slide em questão
3. Usar o skill de visão para capturar e analisar a tela
4. Verificar se os elementos aparecem corretamente e na posição certa
```

**Por que isso é importante:**
- O Reveal.js aplica transformações CSS que podem interferir no layout
- Estilos inline podem conflitar com classes globais
- Elementos podem parecer corretos no código mas renderizados de forma diferente no navegador
- Centralização, alinhamento e espaçamento precisam ser verificados visualmente

### 2. Servidor Web para Validação do Usuário

Sempre forneça ao usuário:

```
1. Suba um servidor web local (python3 -m http.server 8080)
2. Forneça a URL completa do slide específico
3. Exemplo: http://localhost:8080/capitulo-0.html#/3/1
```

Isso permite que o usuário verifique o resultado em tempo real no próprio navegador.

### 3. Casos que Exigem Verificação Visual

- [ ] Centralização de elementos (canvas, imagens, textos, listas)
- [ ] Alinhamento de listas (esquerda, centro, direita)
- [ ] Posicionamento de imagens relativas a textos
- [ ] Espaçamento entre elementos
- [ ] Tamanho e escala de elementos visuais
- [ ] Quebra de linha em textos longos
- [ ] Renderização de fórmulas matemáticas (MathJax)

### 4. Workflow Recomendado

```
Usuário solicita correção
         ↓
Fazer a alteração no código
         ↓
Subir servidor web local
         ↓
Navegar até o slide
         ↓
CAPTURAR SCREENSHOT com visão
         ↓
ANALISAR se está correto
         ↓
   ├─ Sim → Mostrar ao usuário (URL + screenshot)
   │
   └─ Não → Corrigir → Repetir verificação
         ↓
Usuário aprova
         ↓
Commit + Push
```

### 5. Exemplo de Uso do Skill de Visão

```javascript
// Subir servidor
terminal: python3 -m http.server 8080

// Navegar para o slide
browser_navigate: http://localhost:8080/capitulo-0.html#/3/1

// Verificar elemento específico
browser_vision: "O canvas está centralizado horizontalmente?"

// Ou verificar layout geral
browser_vision: "A lista com os 3 itens está alinhada ao centro?"
```

### 6. Dicas Importantes

- **Cache**: O navegador pode cachear CSS. Use parâmetros de query (`?v=2`, `?nocache=1`) ou reinicie o servidor
- **Reveal.js**: Slides aninhados usam formato `#/slide/secao` na URL
- **Resolução**: A verificação é feita em 1366x768 (padrão do Reveal.js)
- **MathJax**: Fórmulas matemáticas podem demorar a renderizar - aguarde `MathJax.typesetPromise()`

### 7. Checklist antes de Commit

- [ ] Alteração foi verificada visualmente via screenshot
- [ ] Usuário teve acesso à URL para validação
- [ ] Layout está correto em diferentes resoluções (se aplicável)
- [ ] Não há regressões em outros slides (verificar slides adjacentes)

---

**Lembrete**: Nunca assuma que o código está correto sem verificar visualmente. CSS é imprevisível, especialmente com frameworks como Reveal.js.
