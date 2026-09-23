// Script para visualização de vetores posição e deslocamento
document.addEventListener("DOMContentLoaded", function () {
  // Inicializar quando o slide específico for mostrado
  Reveal.addEventListener("vector-position-slide", function () {
    console.log("Slide de vetores posição ativo, inicializando canvas...");
    setTimeout(function () {
      initPositionVectorCanvas(
        document.getElementById("positionVectorCanvas"),
      );
    }, 200); // Pequeno atraso para garantir que o slide esteja completamente renderizado
  });

  // Se o slide já estiver ativo na carga inicial, inicializar
  if (
    Reveal.getCurrentSlide().classList.contains("vector-position-slide") ||
    Reveal.getCurrentSlide().dataset.state === "vector-position-slide"
  ) {
    console.log("Slide de vetores posição já está ativo na carga inicial");
    setTimeout(function () {
      initPositionVectorCanvas(
        document.getElementById("positionVectorCanvas"),
      );
    }, 200);
  }
});

function initPositionVectorCanvas(canvas) {
  if (!canvas) {
    console.error("Canvas não encontrado!");
    return;
  }

  console.log("Inicializando canvas de vetores posição...");

  // Desativar os atalhos de teclado do Reveal.js durante interações com o canvas
  function disableRevealKeyboard() {
    Reveal.configure({ keyboard: false });
  }

  function enableRevealKeyboard() {
    Reveal.configure({ keyboard: true });
  }

  const ctx = canvas.getContext("2d");
  const positionInfo = document.getElementById("position-info");
  const interactionHint = document.getElementById("position-interaction-hint");

  // Configuração básica
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = 30;

  // Vetores iniciais
  let positionVector1 = { x: 2, y: 3 }; // r₁ - Vetor posição inicial (verde)
  let displacementVector = { x: 3, y: -2 }; // Δr - Vetor deslocamento (vermelho)
  let positionVector2 = { x: 0, y: 0 }; // r₂ - Vetor posição final (azul) - será calculado

  // Estado de interação
  let isDragging = false;
  let selectedVector = null;
  let hoverVector = null;

  // Configurações de estilo
  const handleRadius = 15; // Tamanho do círculo manipulável nas pontas dos vetores
  const colors = {
    position1: "#ADFF2F", // Vetor posição inicial (verde)
    displacement: "#FF6347", // Vetor deslocamento (vermelho)
    position2: "#4169E1", // Vetor posição final (azul)
    handle: "#FFFFFF", // Círculo manipulável
    handleHover: "#FFD700", // Círculo quando hovering (amarelo)
    grid: "#333333", // Linhas de grid
    axes: "#00FF00", // Eixos principais
  };

  function drawGrid() {
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 0.5;

    // Grade
    for (let x = 0; x <= width; x += scale) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += scale) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Eixos
    ctx.strokeStyle = colors.axes;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Marcações nos eixos
    ctx.fillStyle = colors.axes;
    ctx.font = "12px monospace";

    // Eixo X
    for (
      let i = -Math.floor(centerX / scale);
      i <= Math.floor((width - centerX) / scale);
      i++
    ) {
      if (i !== 0) {
        const x = centerX + i * scale;
        ctx.beginPath();
        ctx.moveTo(x, centerY - 3);
        ctx.lineTo(x, centerY + 3);
        ctx.stroke();
        ctx.fillText(i.toString(), x - 3, centerY + 15);
      }
    }

    // Eixo Y
    for (
      let i = -Math.floor(centerY / scale);
      i <= Math.floor((height - centerY) / scale);
      i++
    ) {
      if (i !== 0) {
        const y = centerY - i * scale;
        ctx.beginPath();
        ctx.moveTo(centerX - 3, y);
        ctx.lineTo(centerX + 3, y);
        ctx.stroke();
        ctx.fillText(i.toString(), centerX + 7, y + 4);
      }
    }

    // Origem
    ctx.fillText("O", centerX - 15, centerY + 15);
  }

  function drawVector(
    startX,
    startY,
    x,
    y,
    color,
    label,
    isHighlighted = false,
  ) {
    const endX = startX + x * scale;
    const endY = startY - y * scale;

    // Linha do vetor
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Desenhar a seta
    if (Math.abs(x) > 0.1 || Math.abs(y) > 0.1) {
      // Não desenhar seta para vetores muito pequenos
      const angle = Math.atan2(-y, x); // y é negativo devido à inversão do canvas
      const arrowSize = 10;

      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(
        endX - arrowSize * Math.cos(angle - Math.PI / 6),
        endY - arrowSize * Math.sin(angle - Math.PI / 6),
      );
      ctx.lineTo(
        endX - arrowSize * Math.cos(angle + Math.PI / 6),
        endY - arrowSize * Math.sin(angle + Math.PI / 6),
      );
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    }

    // Círculo manipulável na ponta do vetor
    ctx.beginPath();
    ctx.arc(endX, endY, handleRadius, 0, Math.PI * 2);
    ctx.fillStyle = isHighlighted
      ? colors.handleHover
      : "rgba(255, 255, 255, 0.3)";
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Label
    ctx.fillStyle = color;
    ctx.font = "16px monospace";
    ctx.fillText(label, endX + 15, endY);

    return { x: endX, y: endY }; // Retorna a posição final para uso em outros cálculos
  }

  function calculateFinalPosition() {
    // Calcula a posição final somando o vetor inicial e o deslocamento
    positionVector2 = {
      x: positionVector1.x + displacementVector.x,
      y: positionVector1.y + displacementVector.y,
    };

    return positionVector2;
  }

  function updatePositionInfo() {
    if (positionInfo) {
      positionInfo.textContent = `r₁ = (${positionVector1.x.toFixed(1)},${positionVector1.y.toFixed(1)}) | Δr = (${displacementVector.x.toFixed(1)},${displacementVector.y.toFixed(1)}) | r₂ = (${positionVector2.x.toFixed(1)},${positionVector2.y.toFixed(1)})`;
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    drawGrid();

    // Calcular posição final
    calculateFinalPosition();

    // Desenhar vetor posição inicial (da origem)
    const pos1End = drawVector(
      centerX,
      centerY,
      positionVector1.x,
      positionVector1.y,
      colors.position1,
      "r₁",
      hoverVector === "position1",
    );

    // Desenhar vetor deslocamento (a partir do final do vetor posição)
    drawVector(
      pos1End.x,
      pos1End.y,
      displacementVector.x,
      displacementVector.y,
      colors.displacement,
      "Δr",
      hoverVector === "displacement",
    );

    // Desenhar vetor posição final (da origem)
    drawVector(
      centerX,
      centerY,
      positionVector2.x,
      positionVector2.y,
      colors.position2,
      "r₂",
      false,
    );

    // Atualizar informações de posição
    updatePositionInfo();
  }

  function isNearVectorTip(mouseX, mouseY, startX, startY, vector) {
    const tipX = startX + vector.x * scale;
    const tipY = startY - vector.y * scale;

    const distance = Math.sqrt((mouseX - tipX) ** 2 + (mouseY - tipY) ** 2);
    return distance < handleRadius;
  }

  function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    // Calcular a posição do mouse relativa ao canvas, considerando qualquer escala
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (evt.clientX - rect.left) * scaleX,
      y: (evt.clientY - rect.top) * scaleY,
    };
  }

  function updateCursor(isOverHandle) {
    canvas.style.cursor = isOverHandle ? "pointer" : "default";
  }

  function checkHover(mouseX, mouseY) {
    // Verificar se o mouse está sobre a ponta do vetor posição inicial
    if (
      isNearVectorTip(mouseX, mouseY, centerX, centerY, positionVector1)
    ) {
      hoverVector = "position1";
      updateCursor(true);
      render();
      return true;
    }

    // Calcular a posição final do vetor posição inicial para verificar o deslocamento
    const pos1EndX = centerX + positionVector1.x * scale;
    const pos1EndY = centerY - positionVector1.y * scale;

    // Verificar se o mouse está sobre a ponta do vetor deslocamento
    if (
      isNearVectorTip(mouseX, mouseY, pos1EndX, pos1EndY, displacementVector)
    ) {
      hoverVector = "displacement";
      updateCursor(true);
      render();
      return true;
    }

    if (hoverVector) {
      hoverVector = null;
      updateCursor(false);
      render();
    }
    return false;
  }

  // Eventos do mouse - com captura de evento e prevenção de propagação
  canvas.addEventListener(
    "mousemove",
    function (event) {
      event.stopPropagation(); // Impedir que o Reveal.js capture o evento

      const mousePos = getMousePos(canvas, event);

      if (isDragging && selectedVector) {
        if (selectedVector === "position1") {
          // Calcular nova posição relativa à origem
          const vecX = (mousePos.x - centerX) / scale;
          const vecY = -(mousePos.y - centerY) / scale;

          positionVector1.x = vecX;
          positionVector1.y = vecY;
        } else if (selectedVector === "displacement") {
          // Calcular posição final do vetor posição inicial
          const pos1EndX = centerX + positionVector1.x * scale;
          const pos1EndY = centerY - positionVector1.y * scale;

          // Calcular nova posição relativa ao final do vetor posição inicial
          const vecX = (mousePos.x - pos1EndX) / scale;
          const vecY = -(mousePos.y - pos1EndY) / scale;

          displacementVector.x = vecX;
          displacementVector.y = vecY;
        }

        render();
      } else {
        // Verificar hover
        checkHover(mousePos.x, mousePos.y);
      }
    },
    true,
  ); // Capturar na fase de captura

  canvas.addEventListener(
    "mousedown",
    function (event) {
      console.log("Canvas mousedown");
      event.stopPropagation(); // Impedir que o Reveal.js capture o evento
      event.preventDefault(); // Impedir comportamento padrão

      const mousePos = getMousePos(canvas, event);

      // Verificar se o mouse está sobre a ponta do vetor posição inicial
      if (
        isNearVectorTip(mousePos.x, mousePos.y, centerX, centerY, positionVector1)
      ) {
        console.log("Selecionando vetor posição inicial");
        isDragging = true;
        selectedVector = "position1";
        canvas.style.cursor = "grabbing";
        disableRevealKeyboard();
      } else {
        // Calcular a posição final do vetor posição inicial
        const pos1EndX = centerX + positionVector1.x * scale;
        const pos1EndY = centerY - positionVector1.y * scale;

        // Verificar se o mouse está sobre a ponta do vetor deslocamento
        if (
          isNearVectorTip(mousePos.x, mousePos.y, pos1EndX, pos1EndY, displacementVector)
        ) {
          console.log("Selecionando vetor deslocamento");
          isDragging = true;
          selectedVector = "displacement";
          canvas.style.cursor = "grabbing";
          disableRevealKeyboard();
        }
      }

      // Esconder a dica de interação após o primeiro clique
      if (isDragging && interactionHint) {
        interactionHint.style.opacity = "0.5";
      }
    },
    true,
  ); // Capturar na fase de captura

  // Usar window para capturar mouse up em qualquer lugar
  window.addEventListener(
    "mouseup",
    function (event) {
      if (isDragging) {
        console.log("Finalizando arrasto");
        event.stopPropagation(); // Só impedir propagação se estávamos arrastando
        isDragging = false;
        selectedVector = null;
        canvas.style.cursor = hoverVector ? "pointer" : "default";
        enableRevealKeyboard();
      }
    },
    true,
  ); // Capturar na fase de captura

  canvas.addEventListener("mouseleave", function (event) {
    if (!isDragging) {
      // Não interromper o arrasto se o mouse sair do canvas
      hoverVector = null;
      updateCursor(false);
      render();
    }
  });

  // Prevenir que cliques no canvas avancem os slides
  canvas.addEventListener(
    "click",
    function (event) {
      event.stopPropagation();
    },
    true,
  );

  // Renderização inicial
  console.log("Renderizando canvas inicial");
  render();
}
