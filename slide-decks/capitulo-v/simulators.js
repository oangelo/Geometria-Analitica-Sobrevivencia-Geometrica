/* Simuladores e visualizações do Capítulo V — Cônicas.
   Padrão canônico: IIFE + window.vizX = { init, cleanup }.
   init() é idempotente (dataset.initialized) e cleanup() cancela o RAF.
   Paleta: #ADFF2F principal, #FFD700 destaque, #ff3333 alerta, #87CEFA apoio. */
(function () {
  'use strict';

  function drawGrid(ctx, originX, originY, width, height) {
    var gridSize = 20;
    ctx.strokeStyle = 'rgba(100, 100, 100, 0.3)';
    ctx.lineWidth = 0.5;
    for (var x = originX % gridSize; x < width; x += gridSize) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (var y = originY % gridSize; y < height; y += gridSize) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, originY); ctx.lineTo(width, originY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(originX, 0); ctx.lineTo(originX, height); ctx.stroke();
    ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
    ctx.font = '10px monospace';
    var labelOffset = 2 * gridSize;
    for (var i = 1; originX + i * labelOffset < width; i++) {
      ctx.fillText(String(i * labelOffset / gridSize), originX + i * labelOffset - 5, originY + 12);
    }
    for (var j = 1; originX - j * labelOffset > 0; j++) {
      ctx.fillText(String(-(j * labelOffset / gridSize)), originX - j * labelOffset - 5, originY + 12);
    }
    for (var k = 1; originY + k * labelOffset < height; k++) {
      ctx.fillText(String(-(k * labelOffset / gridSize)), originX + 5, originY + k * labelOffset + 3);
    }
    for (var m = 1; originY - m * labelOffset > 0; m++) {
      ctx.fillText(String(m * labelOffset / gridSize), originX + 5, originY - m * labelOffset + 3);
    }
  }

  function fmt(v, digits) {
    return v.toFixed(digits).replace('.', ',');
  }

  /* ============================================================
     DEFINIÇÃO EM AÇÃO — Parábola (d(P,F) = d(P,d))
     ============================================================ */
  function setupDefParabola() {
    var canvas = document.getElementById('def-parabola-canvas');
    if (!canvas || canvas.dataset.initialized) return;
    canvas.dataset.initialized = 'true';
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;
    var originX = W / 2, originY = H * 0.62;
    var scale = 62;
    var p = 1.4;
    var t = -3;
    var dir = 1;
    var rafId = null;

    function render() {
      ctx.clearRect(0, 0, W, H);
      drawGrid(ctx, originX, originY, W, H);

      var focusY = originY - p * scale;
      var directrixY = originY + p * scale;

      ctx.strokeStyle = '#87CEFA';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(0, directrixY); ctx.lineTo(W, directrixY); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#87CEFA';
      ctx.font = '12px monospace';
      ctx.fillText('d: y = -p', 12, directrixY - 6);

      ctx.beginPath(); ctx.strokeStyle = '#ADFF2F'; ctx.lineWidth = 2;
      for (var px = 0; px <= W; px++) {
        var x = (px - originX) / scale;
        var yv = x * x / (4 * p);
        var py = originY - yv * scale;
        if (px === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();

      ctx.fillStyle = '#FFD700';
      ctx.beginPath(); ctx.arc(originX, focusY, 5, 0, Math.PI * 2); ctx.fill();
      ctx.font = '12px monospace';
      ctx.fillText('F(0, p)', originX + 8, focusY - 8);

      var xP = t;
      var yP = xP * xP / (4 * p);
      var Px = originX + xP * scale;
      var Py = originY - yP * scale;
      var Dx = Px, Dy = directrixY;

      ctx.strokeStyle = 'rgba(173, 255, 47, 0.9)';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(Px, Py); ctx.lineTo(originX, focusY); ctx.stroke();
      ctx.strokeStyle = '#87CEFA';
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(Px, Py); ctx.lineTo(Dx, Dy); ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#ff3333';
      ctx.beginPath(); ctx.arc(Px, Py, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#e6e6e6';
      ctx.font = '13px monospace';
      ctx.fillText('P', Px + 8, Py - 8);

      ctx.fillStyle = '#ADFF2F';
      ctx.font = '14px monospace';
      ctx.fillText('d(P,F) = d(P,d) = ' + fmt(Math.abs(xP * xP / (4 * p) + p), 2), 12, 22);
    }

    function frame() {
      t += dir * 0.03;
      if (t > 3) { t = 3; dir = -1; }
      if (t < -3) { t = -3; dir = 1; }
      render();
      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    canvas.__cleanup = function () { if (rafId) cancelAnimationFrame(rafId); rafId = null; };
  }

  /* ============================================================
     DEFINIÇÃO EM AÇÃO — Elipse (d(P,F1) + d(P,F2) = 2a)
     ============================================================ */
  function setupDefElipse() {
    var canvas = document.getElementById('def-elipse-canvas');
    if (!canvas || canvas.dataset.initialized) return;
    canvas.dataset.initialized = 'true';
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;
    var cx = W / 2, cy = H / 2;
    var scale = 88;
    var a = 2.6, b = 1.5;
    var c = Math.sqrt(a * a - b * b);
    var t = 0;
    var rafId = null;

    function render() {
      ctx.clearRect(0, 0, W, H);
      drawGrid(ctx, cx, cy, W, H);

      ctx.beginPath(); ctx.strokeStyle = '#ADFF2F'; ctx.lineWidth = 2;
      ctx.ellipse(cx, cy, a * scale, b * scale, 0, 0, Math.PI * 2);
      ctx.stroke();

      var f1x = cx - c * scale, f2x = cx + c * scale;
      var Px = cx + a * Math.cos(t) * scale;
      var Py = cy - b * Math.sin(t) * scale;

      ctx.strokeStyle = 'rgba(173, 255, 47, 0.75)';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(Px, Py); ctx.lineTo(f1x, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(Px, Py); ctx.lineTo(f2x, cy); ctx.stroke();

      ctx.fillStyle = '#FFD700';
      ctx.beginPath(); ctx.arc(f1x, cy, 5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(f2x, cy, 5, 0, Math.PI * 2); ctx.fill();
      ctx.font = '12px monospace';
      ctx.fillText('F1', f1x - 24, cy - 8);
      ctx.fillText('F2', f2x + 8, cy - 8);

      ctx.fillStyle = '#ff3333';
      ctx.beginPath(); ctx.arc(Px, Py, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#e6e6e6';
      ctx.font = '13px monospace';
      ctx.fillText('P', Px + 8, Py - 8);

      var d1 = Math.sqrt(Math.pow(Px - f1x, 2) + Math.pow(Py - cy, 2)) / scale;
      var d2 = Math.sqrt(Math.pow(Px - f2x, 2) + Math.pow(Py - cy, 2)) / scale;
      ctx.fillStyle = '#ADFF2F';
      ctx.font = '14px monospace';
      ctx.fillText('d1 + d2 = ' + fmt(d1 + d2, 2) + '  (2a = ' + fmt(2 * a, 1) + ')', 12, 22);
    }

    function frame() {
      t += 0.012;
      if (t > Math.PI * 2) t = 0;
      render();
      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    canvas.__cleanup = function () { if (rafId) cancelAnimationFrame(rafId); rafId = null; };
  }

  /* ============================================================
     DEFINIÇÃO EM AÇÃO — Hipérbole (|d(P,F1) - d(P,F2)| = 2a)
     ============================================================ */
  function setupDefHiperbole() {
    var canvas = document.getElementById('def-hiperbole-canvas');
    if (!canvas || canvas.dataset.initialized) return;
    canvas.dataset.initialized = 'true';
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;
    var cx = W / 2, cy = H / 2;
    var scale = 80;
    var a = 1.5, b = 1.2;
    var c = Math.sqrt(a * a + b * b);
    var u = -1.4;
    var dir = 1;
    var rafId = null;

    function render() {
      ctx.clearRect(0, 0, W, H);
      drawGrid(ctx, cx, cy, W, H);

      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 5]);
      var slope = b / a;
      ctx.beginPath();
      ctx.moveTo(cx - W, cy + slope * W);
      ctx.lineTo(cx + W, cy - slope * W);
      ctx.moveTo(cx - W, cy - slope * W);
      ctx.lineTo(cx + W, cy + slope * W);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath(); ctx.strokeStyle = '#ADFF2F'; ctx.lineWidth = 2;
      var first = true;
      for (var uu = -1.4; uu <= 1.4; uu += 0.02) {
        var px = cx + a * Math.cosh(uu) * scale;
        var py = cy - b * Math.sinh(uu) * scale;
        if (first) { ctx.moveTo(px, py); first = false; } else ctx.lineTo(px, py);
      }
      ctx.stroke();

      var f1x = cx - c * scale, f2x = cx + c * scale;
      var Px = cx + a * Math.cosh(u) * scale;
      var Py = cy - b * Math.sinh(u) * scale;

      ctx.strokeStyle = 'rgba(173, 255, 47, 0.75)';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(Px, Py); ctx.lineTo(f1x, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(Px, Py); ctx.lineTo(f2x, cy); ctx.stroke();

      ctx.fillStyle = '#FFD700';
      ctx.beginPath(); ctx.arc(f1x, cy, 5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(f2x, cy, 5, 0, Math.PI * 2); ctx.fill();
      ctx.font = '12px monospace';
      ctx.fillText('F1', f1x - 24, cy - 8);
      ctx.fillText('F2', f2x + 8, cy - 8);

      ctx.fillStyle = '#ff3333';
      ctx.beginPath(); ctx.arc(Px, Py, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#e6e6e6';
      ctx.font = '13px monospace';
      ctx.fillText('P', Px + 8, Py - 8);

      var d1 = Math.sqrt(Math.pow(Px - f1x, 2) + Math.pow(Py - cy, 2)) / scale;
      var d2 = Math.sqrt(Math.pow(Px - f2x, 2) + Math.pow(Py - cy, 2)) / scale;
      ctx.fillStyle = '#ADFF2F';
      ctx.font = '14px monospace';
      ctx.fillText('|d1 - d2| = ' + fmt(Math.abs(d1 - d2), 2) + '  (2a = ' + fmt(2 * a, 1) + ')', 12, 22);
    }

    function frame() {
      u += dir * 0.012;
      if (u > 1.4) { u = 1.4; dir = -1; }
      if (u < -1.4) { u = -1.4; dir = 1; }
      render();
      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    canvas.__cleanup = function () { if (rafId) cancelAnimationFrame(rafId); rafId = null; };
  }

  /* ============================================================
     SIMULADOR — Parábola (y = ax² + bx + c)
     ============================================================ */
  function setupParabolaSimulator() {
    var canvas = document.getElementById('parabola-canvas');
    if (!canvas || canvas.dataset.initialized) return;
    canvas.dataset.initialized = 'true';
    var ctx = canvas.getContext('2d');
    var aSlider = document.getElementById('a-slider');
    var bSlider = document.getElementById('b-slider');
    var cSlider = document.getElementById('c-slider');
    var aValue = document.getElementById('a-value');
    var bValue = document.getElementById('b-value');
    var cValue = document.getElementById('c-value');
    if (!aSlider || !bSlider || !cSlider) return;

    var scannerY = 0, scannerDir = 1, rafId = null;

    function render() {
      var a = parseFloat(aSlider.value);
      var b = parseFloat(bSlider.value);
      var cEq = parseFloat(cSlider.value);
      aValue.textContent = fmt(a, 1);
      bValue.textContent = fmt(b, 1);
      cValue.textContent = fmt(cEq, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var originX = canvas.width / 2;
      var originY = canvas.height / 2;
      drawGrid(ctx, originX, originY, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(173, 255, 47, 0.05)';
      ctx.fillRect(0, scannerY, canvas.width, 4);

      var scale = 20;
      ctx.beginPath(); ctx.strokeStyle = '#ADFF2F'; ctx.lineWidth = 2;
      for (var pixelX = 0; pixelX <= canvas.width; pixelX++) {
        var x = (pixelX - originX) / scale;
        var yVal = a * x * x + b * x + cEq;
        var pixelY = originY - yVal * scale;
        if (pixelX === 0) ctx.moveTo(pixelX, pixelY);
        else ctx.lineTo(pixelX, pixelY);
      }
      ctx.stroke();

      if (a !== 0) {
        var vertexX = -b / (2 * a);
        var vertexY = a * vertexX * vertexX + b * vertexX + cEq;
        var pVertexX = originX + vertexX * scale;
        var pVertexY = originY - vertexY * scale;
        ctx.beginPath(); ctx.arc(pVertexX, pVertexY, 5, 0, Math.PI * 2); ctx.fillStyle = '#FFD700'; ctx.fill();
        ctx.fillStyle = '#FFFFFF'; ctx.font = '12px monospace';
        ctx.fillText('V(' + fmt(vertexX, 1) + ',' + fmt(vertexY, 1) + ')', pVertexX + 8, pVertexY - 8);

        var pParam = 1 / (4 * a);
        var focusX = vertexX;
        var focusY = vertexY + pParam;
        var pFocusX = originX + focusX * scale;
        var pFocusY = originY - focusY * scale;
        ctx.beginPath(); ctx.arc(pFocusX, pFocusY, 4, 0, Math.PI * 2); ctx.fillStyle = '#FF6347'; ctx.fill();
        ctx.fillText('F(' + fmt(focusX, 1) + ',' + fmt(focusY, 1) + ')', pFocusX + 8, pFocusY - 8);

        ctx.beginPath(); ctx.setLineDash([5, 5]); ctx.strokeStyle = '#FFD700';
        ctx.moveTo(pVertexX, 0); ctx.lineTo(pVertexX, canvas.height); ctx.stroke();

        var diretrizY = vertexY - pParam;
        var pDiretrizY = originY - diretrizY * scale;
        ctx.strokeStyle = '#87CEFA';
        ctx.moveTo(0, pDiretrizY); ctx.lineTo(canvas.width, pDiretrizY); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#87CEFA';
        ctx.fillText('d: y=' + fmt(diretrizY, 1), 10, pDiretrizY - 5 > 15 ? pDiretrizY - 5 : 15);
      }
    }

    function frame() {
      scannerY += scannerDir * 2;
      if (scannerY > canvas.height || scannerY < 0) scannerDir *= -1;
      render();
      rafId = requestAnimationFrame(frame);
    }

    aSlider.addEventListener('input', render);
    bSlider.addEventListener('input', render);
    cSlider.addEventListener('input', render);
    rafId = requestAnimationFrame(frame);

    canvas.__cleanup = function () {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
      aSlider.removeEventListener('input', render);
      bSlider.removeEventListener('input', render);
      cSlider.removeEventListener('input', render);
    };
  }

  /* ============================================================
     SIMULADOR — Elipse (a, b e rotação; focos arrastáveis)
     ============================================================ */
  function setupEllipseSimulator() {
    var canvas = document.getElementById('ellipse-canvas');
    if (!canvas || canvas.dataset.initialized) return;
    canvas.dataset.initialized = 'true';
    var ctx = canvas.getContext('2d');
    var aSlider = document.getElementById('a-ellipse-slider');
    var bSlider = document.getElementById('b-ellipse-slider');
    var rotationSlider = document.getElementById('rotation-slider');
    var aValue = document.getElementById('a-ellipse-value');
    var bValue = document.getElementById('b-ellipse-value');
    var rotationValue = document.getElementById('rotation-value');
    if (!aSlider || !bSlider || !rotationSlider) return;

    var focusData = [
      { relX: -100, relY: 0, absX: 0, absY: 0 },
      { relX: 100, relY: 0, absX: 0, absY: 0 }
    ];
    var draggingFocus = null;

    function getMousePos(evt) {
      var rect = canvas.getBoundingClientRect();
      return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
    }

    function onMouseDown(e) {
      var m = getMousePos(e);
      for (var i = 0; i < focusData.length; i++) {
        var dx = m.x - focusData[i].absX;
        var dy = m.y - focusData[i].absY;
        if (Math.sqrt(dx * dx + dy * dy) < 12) { draggingFocus = i; return; }
      }
    }

    function onMouseMove(e) {
      if (draggingFocus === null) return;
      var m = getMousePos(e);
      var originX = canvas.width / 2;
      var originY = canvas.height / 2;
      var rotRad = parseFloat(rotationSlider.value) * Math.PI / 180;
      var cosR = Math.cos(-rotRad);
      var sinR = Math.sin(-rotRad);
      var relX = (m.x - originX) * cosR - (m.y - originY) * sinR;
      var relY = (m.x - originX) * sinR + (m.y - originY) * cosR;
      focusData[draggingFocus].relX = relX;
      focusData[draggingFocus].relY = relY;
      var f1 = focusData[0], f2 = focusData[1];
      var distFoci = Math.sqrt(Math.pow(f2.relX - f1.relX, 2) + Math.pow(f2.relY - f1.relY, 2));
      var newC = distFoci / 2;
      var currentA = parseFloat(aSlider.value);
      if (currentA <= newC) { currentA = newC + 15; aSlider.value = currentA.toFixed(0); }
      var newBsq = currentA * currentA - newC * newC;
      if (newBsq < 25) {
        currentA = Math.sqrt(newC * newC + 25) + 5;
        aSlider.value = currentA.toFixed(0);
        newBsq = currentA * currentA - newC * newC;
      }
      bSlider.value = Math.sqrt(newBsq).toFixed(0);
      var angleFoci = Math.atan2(f2.relY - f1.relY, f2.relX - f1.relX);
      rotationSlider.value = (angleFoci * 180 / Math.PI).toFixed(0);
      render();
    }

    function onMouseUp() { draggingFocus = null; }

    function render() {
      var aAxis = parseFloat(aSlider.value);
      var bAxis = parseFloat(bSlider.value);
      var rotationDeg = parseFloat(rotationSlider.value);
      var rotationRad = rotationDeg * Math.PI / 180;
      aValue.textContent = aAxis.toFixed(0);
      bValue.textContent = bAxis.toFixed(0);
      rotationValue.textContent = rotationDeg.toFixed(0) + '°';

      var cDist = aAxis >= bAxis
        ? Math.sqrt(aAxis * aAxis - bAxis * bAxis)
        : Math.sqrt(bAxis * bAxis - aAxis * aAxis);
      var majorAxis = Math.max(aAxis, bAxis);
      var eccentricity = majorAxis > 0 ? cDist / majorAxis : 0;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var originX = canvas.width / 2;
      var originY = canvas.height / 2;
      drawGrid(ctx, originX, originY, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(originX, originY);
      ctx.rotate(rotationRad);
      ctx.beginPath(); ctx.strokeStyle = '#ADFF2F'; ctx.lineWidth = 2;
      ctx.ellipse(0, 0, aAxis, bAxis, 0, 0, 2 * Math.PI);
      ctx.stroke();

      if (draggingFocus === null) {
        if (aAxis >= bAxis) {
          focusData[0].relX = -cDist; focusData[0].relY = 0;
          focusData[1].relX = cDist; focusData[1].relY = 0;
        } else {
          focusData[0].relX = 0; focusData[0].relY = -cDist;
          focusData[1].relX = 0; focusData[1].relY = cDist;
        }
      }
      ctx.fillStyle = '#FF6347';
      ctx.beginPath(); ctx.arc(focusData[0].relX, focusData[0].relY, 6, 0, 2 * Math.PI); ctx.fill();
      ctx.fillText('F1', focusData[0].relX + 10, focusData[0].relY);
      ctx.beginPath(); ctx.arc(focusData[1].relX, focusData[1].relY, 6, 0, 2 * Math.PI); ctx.fill();
      ctx.fillText('F2', focusData[1].relX + 10, focusData[1].relY);
      ctx.restore();

      var cosAbs = Math.cos(rotationRad);
      var sinAbs = Math.sin(rotationRad);
      for (var i = 0; i < focusData.length; i++) {
        focusData[i].absX = (focusData[i].relX * cosAbs - focusData[i].relY * sinAbs) + originX;
        focusData[i].absY = (focusData[i].relX * sinAbs + focusData[i].relY * cosAbs) + originY;
      }

      ctx.fillStyle = '#ADFF2F'; ctx.font = '12px monospace';
      ctx.fillText('a=' + aAxis.toFixed(0) + ', b=' + bAxis.toFixed(0) + ', c=' + fmt(cDist, 1), 10, 20);
      ctx.fillText('Excentricidade e=' + fmt(eccentricity, 2), 10, 40);
    }

    function onInput() { draggingFocus = null; render(); }

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);
    aSlider.addEventListener('input', onInput);
    bSlider.addEventListener('input', onInput);
    rotationSlider.addEventListener('input', onInput);
    render();

    canvas.__cleanup = function () {
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseUp);
      aSlider.removeEventListener('input', onInput);
      bSlider.removeEventListener('input', onInput);
      rotationSlider.removeEventListener('input', onInput);
    };
  }

  /* ============================================================
     SIMULADOR — Hipérbole (a, b e orientação)
     ============================================================ */
  function setupHyperbolaSimulator() {
    var canvas = document.getElementById('hyperbola-canvas');
    if (!canvas || canvas.dataset.initialized) return;
    canvas.dataset.initialized = 'true';
    var ctx = canvas.getContext('2d');
    var aSlider = document.getElementById('a-hyper-slider');
    var bSlider = document.getElementById('b-hyper-slider');
    var orientationSlider = document.getElementById('orientation-slider');
    var aValue = document.getElementById('a-hyper-value');
    var bValue = document.getElementById('b-hyper-value');
    var orientationValue = document.getElementById('orientation-value');
    if (!aSlider || !bSlider || !orientationSlider) return;

    function render() {
      var aAxis = parseFloat(aSlider.value);
      var bAxis = parseFloat(bSlider.value);
      var orientation = parseInt(orientationSlider.value, 10);
      aValue.textContent = aAxis.toFixed(0);
      bValue.textContent = bAxis.toFixed(0);
      orientationValue.textContent = orientation === 0 ? 'Eixo X' : 'Eixo Y';

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var originX = canvas.width / 2;
      var originY = canvas.height / 2;
      drawGrid(ctx, originX, originY, canvas.width, canvas.height);
      var cDist = Math.sqrt(aAxis * aAxis + bAxis * bAxis);

      ctx.beginPath(); ctx.strokeStyle = '#FFD700'; ctx.lineWidth = 1; ctx.setLineDash([5, 5]);
      if (orientation === 0) {
        ctx.moveTo(0, originY - (bAxis / aAxis) * originX);
        ctx.lineTo(canvas.width, originY + (bAxis / aAxis) * (canvas.width - originX));
        ctx.moveTo(0, originY + (bAxis / aAxis) * originX);
        ctx.lineTo(canvas.width, originY - (bAxis / aAxis) * (canvas.width - originX));
      } else {
        ctx.moveTo(0, originY - (aAxis / bAxis) * originX);
        ctx.lineTo(canvas.width, originY + (aAxis / bAxis) * (canvas.width - originX));
        ctx.moveTo(0, originY + (aAxis / bAxis) * originX);
        ctx.lineTo(canvas.width, originY - (aAxis / bAxis) * (canvas.width - originX));
      }
      ctx.stroke(); ctx.setLineDash([]);

      ctx.beginPath(); ctx.strokeStyle = '#ADFF2F'; ctx.lineWidth = 2;
      var rangeLimit = Math.max(originX, originY) * 1.5;
      var step = 1;
      var xc, yc, ySq, xSq;

      if (orientation === 0) {
        for (xc = aAxis; xc < rangeLimit; xc += step) {
          ySq = ((xc * xc / (aAxis * aAxis)) - 1) * (bAxis * bAxis);
          if (ySq < 0) continue;
          var yv = Math.sqrt(ySq);
          if (xc === aAxis) ctx.moveTo(originX + xc, originY - yv);
          else ctx.lineTo(originX + xc, originY - yv);
        }
        for (xc = rangeLimit - step; xc >= aAxis; xc -= step) {
          ySq = ((xc * xc / (aAxis * aAxis)) - 1) * (bAxis * bAxis);
          if (ySq < 0) continue;
          ctx.lineTo(originX + xc, originY + Math.sqrt(ySq));
        }
        for (xc = -aAxis; xc > -rangeLimit; xc -= step) {
          ySq = ((xc * xc / (aAxis * aAxis)) - 1) * (bAxis * bAxis);
          if (ySq < 0) continue;
          if (xc === -aAxis) ctx.moveTo(originX + xc, originY - Math.sqrt(ySq));
          else ctx.lineTo(originX + xc, originY - Math.sqrt(ySq));
        }
        for (xc = -rangeLimit + step; xc <= -aAxis; xc += step) {
          ySq = ((xc * xc / (aAxis * aAxis)) - 1) * (bAxis * bAxis);
          if (ySq < 0) continue;
          ctx.lineTo(originX + xc, originY + Math.sqrt(ySq));
        }
      } else {
        for (yc = aAxis; yc < rangeLimit; yc += step) {
          xSq = ((yc * yc / (aAxis * aAxis)) - 1) * (bAxis * bAxis);
          if (xSq < 0) continue;
          var xv = Math.sqrt(xSq);
          if (yc === aAxis) ctx.moveTo(originX + xv, originY - yc);
          else ctx.lineTo(originX + xv, originY - yc);
        }
        for (yc = rangeLimit - step; yc >= aAxis; yc -= step) {
          xSq = ((yc * yc / (aAxis * aAxis)) - 1) * (bAxis * bAxis);
          if (xSq < 0) continue;
          ctx.lineTo(originX - Math.sqrt(xSq), originY - yc);
        }
        for (yc = -aAxis; yc > -rangeLimit; yc -= step) {
          xSq = ((yc * yc / (aAxis * aAxis)) - 1) * (bAxis * bAxis);
          if (xSq < 0) continue;
          if (yc === -aAxis) ctx.moveTo(originX + Math.sqrt(xSq), originY - yc);
          else ctx.lineTo(originX + Math.sqrt(xSq), originY - yc);
        }
        for (yc = -rangeLimit + step; yc <= -aAxis; yc += step) {
          xSq = ((yc * yc / (aAxis * aAxis)) - 1) * (bAxis * bAxis);
          if (xSq < 0) continue;
          ctx.lineTo(originX - Math.sqrt(xSq), originY - yc);
        }
      }
      ctx.stroke();

      ctx.fillStyle = '#FF6347';
      if (orientation === 0) {
        ctx.beginPath(); ctx.arc(originX + cDist, originY, 5, 0, 2 * Math.PI); ctx.fill();
        ctx.beginPath(); ctx.arc(originX - cDist, originY, 5, 0, 2 * Math.PI); ctx.fill();
        ctx.fillStyle = '#FFD700';
        ctx.beginPath(); ctx.arc(originX + aAxis, originY, 5, 0, 2 * Math.PI); ctx.fill();
        ctx.beginPath(); ctx.arc(originX - aAxis, originY, 5, 0, 2 * Math.PI); ctx.fill();
      } else {
        ctx.beginPath(); ctx.arc(originX, originY - cDist, 5, 0, 2 * Math.PI); ctx.fill();
        ctx.beginPath(); ctx.arc(originX, originY + cDist, 5, 0, 2 * Math.PI); ctx.fill();
        ctx.fillStyle = '#FFD700';
        ctx.beginPath(); ctx.arc(originX, originY - aAxis, 5, 0, 2 * Math.PI); ctx.fill();
        ctx.beginPath(); ctx.arc(originX, originY + aAxis, 5, 0, 2 * Math.PI); ctx.fill();
      }
      ctx.fillStyle = '#ADFF2F'; ctx.font = '12px monospace';
      ctx.fillText('a=' + aAxis.toFixed(0) + ', b=' + bAxis.toFixed(0) + ', c=' + fmt(cDist, 1), 10, 20);
      ctx.fillText('Excentricidade e=' + fmt(cDist / aAxis, 2), 10, 40);
    }

    aSlider.addEventListener('input', render);
    bSlider.addEventListener('input', render);
    orientationSlider.addEventListener('input', render);
    render();

    canvas.__cleanup = function () {
      aSlider.removeEventListener('input', render);
      bSlider.removeEventListener('input', render);
      orientationSlider.removeEventListener('input', render);
    };
  }

  function cleanupCanvas(id) {
    var canvas = document.getElementById(id);
    if (canvas && canvas.__cleanup) canvas.__cleanup();
    if (canvas) canvas.dataset.initialized = '';
  }

  function makeViz(setup, canvasId) {
    return {
      init: function () { setup(); },
      cleanup: function () { cleanupCanvas(canvasId); }
    };
  }

  window.vizDefParabola = makeViz(setupDefParabola, 'def-parabola-canvas');
  window.vizDefElipse = makeViz(setupDefElipse, 'def-elipse-canvas');
  window.vizDefHiperbole = makeViz(setupDefHiperbole, 'def-hiperbole-canvas');
  window.vizParabola = makeViz(setupParabolaSimulator, 'parabola-canvas');
  window.vizElipse = makeViz(setupEllipseSimulator, 'ellipse-canvas');
  window.vizHiperbola = makeViz(setupHyperbolaSimulator, 'hyperbola-canvas');
})();
