// Simuladores 3D - Capítulo VI
// Refactor (decisão #45 + template-spec §4.4): IIFE por simulador expondo
// window.vizX = { init, cleanup }. Renderização é orientada a eventos (sliders),
// sem loops de animação: cleanup é no-op por design (os canvas vivem durante todo o deck).
// O glifo da capa (com rAF) tem cleanup próprio em 00-capa.html.

(function () {
  'use strict';

  // ==================== HELPERS COMPARTILHADOS ====================

  // Projeção oblíqua padrão (cavalier): L=0.4, alpha=π/6
  function makeProjector(centerX, centerY, scale) {
    var L = 0.4;
    var cosA = Math.cos(Math.PI / 6);
    var sinA = Math.sin(Math.PI / 6);
    return function project3D(x, y, z) {
      return {
        x: centerX + (x - z * L * cosA) * scale,
        y: centerY - (y + z * L * sinA) * scale
      };
    };
  }

  function drawAxes(ctx, project3D, axisLen) {
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1;
    ctx.font = "12px 'Courier New', monospace";
    ctx.fillStyle = '#ADFF2F';
    var O = project3D(0, 0, 0);
    var Px = project3D(axisLen, 0, 0);
    ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Px.x, Px.y); ctx.stroke();
    ctx.fillText('X', Px.x + 5, Px.y);
    var Py = project3D(0, axisLen, 0);
    ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Py.x, Py.y); ctx.stroke();
    ctx.fillText('Y', Py.x, Py.y - 5);
    var Pz = project3D(0, 0, axisLen);
    ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Pz.x, Pz.y); ctx.stroke();
    ctx.fillText('Z', Pz.x + 5, Pz.y + 5);
  }

  function drawArrow(ctx, pStart, pEnd, color, lineWidth, label) {
    ctx.beginPath();
    ctx.moveTo(pStart.x, pStart.y);
    ctx.lineTo(pEnd.x, pEnd.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth || 2;
    ctx.stroke();
    var headlen = 10;
    var angle = Math.atan2(pEnd.y - pStart.y, pEnd.x - pStart.x);
    ctx.beginPath();
    ctx.moveTo(pEnd.x, pEnd.y);
    ctx.lineTo(pEnd.x - headlen * Math.cos(angle - Math.PI / 6), pEnd.y - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(pEnd.x - headlen * Math.cos(angle + Math.PI / 6), pEnd.y - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    if (label) {
      ctx.fillStyle = color;
      ctx.font = "14px 'Courier New', monospace";
      ctx.fillText(label, pEnd.x + 8, pEnd.y);
    }
  }

  function drawVectorAt(ctx, project3D, vec, color, lineWidth, label) {
    drawArrow(ctx, project3D(0, 0, 0), project3D(vec.x, vec.y, vec.z), color, lineWidth, label);
  }

  function readVec(sliderIds) {
    return sliderIds.map(function (id) { return parseFloat(document.getElementById(id).value); });
  }

  function typeset(els) {
    if (window.MathJax && window.MathJax.typeset) window.MathJax.typeset(els);
  }

  var CANVAS_BG = '#0c0c0c'; // paleta do tema
  var COLOR_U = '#FFD700';
  var COLOR_V = '#4682B4';
  var COLOR_RESULT = '#ADFF2F';
  var COLOR_NORMAL = '#FF6347';

  // ==================== SIMULADOR: VETORES EM R³ ====================

  function initR3Vetores() {
    var canvas = document.getElementById('r3-vetores-canvas');
    if (!canvas || canvas.dataset.initialized) return;
    canvas.dataset.initialized = 'true';
    var ctx = canvas.getContext('2d');
    var project3D = makeProjector(canvas.width / 2, canvas.height / 2, 30);

    var ids = ['r3-ux', 'r3-uy', 'r3-uz', 'r3-vx', 'r3-vy', 'r3-vz'];
    var sliders = ids.map(function (id) { return document.getElementById(id); });
    var values = ids.map(function (id) { return document.getElementById(id + '-value'); });
    var somaSpan = document.getElementById('r3-soma');
    var magUSpan = document.getElementById('r3-mag-u');

    var allElementsExist = sliders.concat(values, [canvas, somaSpan, magUSpan]).every(function (el) { return !!el; });
    if (!allElementsExist) { console.error('R3 Vetores: Elementos não encontrados.'); return; }

    function drawVectorFromTo(start, end, color) {
      var p1 = project3D(start.x, start.y, start.z);
      var p2 = project3D(end.x, end.y, end.z);
      ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = color; ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]); ctx.stroke(); ctx.setLineDash([]);
    }

    function draw() {
      ctx.fillStyle = CANVAS_BG;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawAxes(ctx, project3D, 5);
      var u = { x: parseFloat(sliders[0].value), y: parseFloat(sliders[1].value), z: parseFloat(sliders[2].value) };
      var v = { x: parseFloat(sliders[3].value), y: parseFloat(sliders[4].value), z: parseFloat(sliders[5].value) };
      var s = { x: u.x + v.x, y: u.y + v.y, z: u.z + v.z };
      values.forEach(function (el, i) { el.textContent = [u.x, u.y, u.z, v.x, v.y, v.z][i].toFixed(1); });
      somaSpan.textContent = '(' + s.x.toFixed(1) + ', ' + s.y.toFixed(1) + ', ' + s.z.toFixed(1) + ')';
      magUSpan.textContent = Math.sqrt(u.x * u.x + u.y * u.y + u.z * u.z).toFixed(2).replace('.', ',');
      drawVectorAt(ctx, project3D, u, COLOR_U, 2, 'u');
      drawVectorAt(ctx, project3D, v, COLOR_V, 2, 'v');
      drawVectorAt(ctx, project3D, s, COLOR_RESULT, 2, 'u+v');
      drawVectorFromTo(u, s, 'rgba(70,130,180,0.4)');
      drawVectorFromTo(v, s, 'rgba(255,215,0,0.4)');
    }

    sliders.forEach(function (s) { s.addEventListener('input', draw); });
    draw();
  }

  // ==================== SIMULADOR: PRODUTO INTERNO R³ ====================

  function initProdutoInternoR3() {
    var canvas = document.getElementById('produto-interno-r3-canvas');
    if (!canvas || canvas.dataset.initialized) return;
    canvas.dataset.initialized = 'true';
    var ctx = canvas.getContext('2d');
    var project3D = makeProjector(canvas.width / 2, canvas.height / 2, 30);

    var ids = ['pi-r3-ux', 'pi-r3-uy', 'pi-r3-uz', 'pi-r3-vx', 'pi-r3-vy', 'pi-r3-vz'];
    var sliders = ids.map(function (id) { return document.getElementById(id); });
    var values = ids.map(function (id) { return document.getElementById(id + '-value'); });
    var dotValueSpan = document.getElementById('pi-r3-dot-value');
    var angleValueSpan = document.getElementById('pi-r3-angle-value');

    var allElementsExist = sliders.concat(values, [canvas, dotValueSpan, angleValueSpan]).every(function (el) { return !!el; });
    if (!allElementsExist) { console.error('Produto Interno R3: Elementos não encontrados.'); return; }

    function draw() {
      ctx.fillStyle = CANVAS_BG;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawAxes(ctx, project3D, 5);
      var u = { x: parseFloat(sliders[0].value), y: parseFloat(sliders[1].value), z: parseFloat(sliders[2].value) };
      var v = { x: parseFloat(sliders[3].value), y: parseFloat(sliders[4].value), z: parseFloat(sliders[5].value) };
      values.forEach(function (el, i) { el.textContent = [u.x, u.y, u.z, v.x, v.y, v.z][i].toFixed(1); });
      drawVectorAt(ctx, project3D, u, COLOR_U);
      drawVectorAt(ctx, project3D, v, COLOR_V);
      var dotProduct = u.x * v.x + u.y * v.y + u.z * v.z;
      var magU = Math.sqrt(u.x * u.x + u.y * u.y + u.z * u.z);
      var magV = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
      var angleDeg = 0;
      if (magU > 0.001 && magV > 0.001) {
        var cosTheta = Math.max(-1, Math.min(1, dotProduct / (magU * magV)));
        angleDeg = Math.acos(cosTheta) * (180 / Math.PI);
      }
      dotValueSpan.innerHTML = '\\( ' + dotProduct.toFixed(2) + ' \\)';
      angleValueSpan.innerHTML = '\\( ' + angleDeg.toFixed(1) + '^\\circ \\)';
      typeset([dotValueSpan, angleValueSpan]);
    }

    sliders.forEach(function (s) { s.addEventListener('input', draw); });
    draw();
  }

  // ==================== SIMULADOR: PRODUTO VETORIAL ====================

  function initProdutoVetorial() {
    var canvas = document.getElementById('produto-vetorial-canvas');
    if (!canvas || canvas.dataset.initialized) return;
    canvas.dataset.initialized = 'true';
    var ctx = canvas.getContext('2d');
    var project3D = makeProjector(canvas.width / 2, canvas.height / 2, 40);

    var ids = ['pv-ux', 'pv-uy', 'pv-uz', 'pv-vx', 'pv-vy', 'pv-vz'];
    var sliders = ids.map(function (id) { return document.getElementById(id); });
    var values = ids.map(function (id) { return document.getElementById(id + '-value'); });
    var resultVectorSpan = document.getElementById('pv-result-vector');
    var areaValueSpan = document.getElementById('pv-area-value');

    var allElementsExist = sliders.concat(values, [canvas, resultVectorSpan, areaValueSpan]).every(function (el) { return !!el; });
    if (!allElementsExist) { console.error('Produto Vetorial: Elementos não encontrados.'); return; }

    function drawParallelogram(u, v, color) {
      var O = project3D(0, 0, 0);
      var Pu = project3D(u.x, u.y, u.z);
      var Pv = project3D(v.x, v.y, v.z);
      var Puv = project3D(u.x + v.x, u.y + v.y, u.z + v.z);
      ctx.beginPath();
      ctx.moveTo(O.x, O.y); ctx.lineTo(Pu.x, Pu.y); ctx.lineTo(Puv.x, Puv.y); ctx.lineTo(Pv.x, Pv.y);
      ctx.closePath();
      ctx.fillStyle = color; ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.stroke();
    }

    function draw() {
      ctx.fillStyle = CANVAS_BG;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawAxes(ctx, project3D, 3);
      var u = { x: parseFloat(sliders[0].value), y: parseFloat(sliders[1].value), z: parseFloat(sliders[2].value) };
      var v = { x: parseFloat(sliders[3].value), y: parseFloat(sliders[4].value), z: parseFloat(sliders[5].value) };
      values.forEach(function (el, i) { el.textContent = [u.x, u.y, u.z, v.x, v.y, v.z][i].toFixed(1); });
      var w = {
        x: u.y * v.z - u.z * v.y,
        y: u.z * v.x - u.x * v.z,
        z: u.x * v.y - u.y * v.x
      };
      var area = Math.sqrt(w.x * w.x + w.y * w.y + w.z * w.z);
      drawParallelogram(u, v, 'rgba(70, 130, 180, 0.2)');
      drawVectorAt(ctx, project3D, u, COLOR_U);
      drawVectorAt(ctx, project3D, v, COLOR_V);
      drawVectorAt(ctx, project3D, w, COLOR_RESULT, 3);
      resultVectorSpan.innerHTML = '\\( (' + w.x.toFixed(1) + ', ' + w.y.toFixed(1) + ', ' + w.z.toFixed(1) + ') \\)';
      areaValueSpan.innerHTML = '\\( ' + area.toFixed(2) + ' \\)';
      typeset([resultVectorSpan, areaValueSpan]);
    }

    sliders.forEach(function (s) { s.addEventListener('input', draw); });
    draw();
  }

  // ==================== SIMULADOR: PRODUTO MISTO ====================

  function initProdutoMisto() {
    var canvas = document.getElementById('produto-misto-canvas');
    if (!canvas || canvas.dataset.initialized) return;
    canvas.dataset.initialized = 'true';
    var ctx = canvas.getContext('2d');
    var project3D = makeProjector(canvas.width / 2, canvas.height / 2, 25);

    var wzSlider = document.getElementById('pm-wz-slider');
    var wzValueSpan = document.getElementById('pm-wz-value-span');
    var uxValSpan = document.getElementById('pm-ux-val');
    var uyValSpan = document.getElementById('pm-uy-val');
    var uzValSpan = document.getElementById('pm-uz-val');
    var vxValSpan = document.getElementById('pm-vx-val');
    var vyValSpan = document.getElementById('pm-vy-val');
    var vzValSpan = document.getElementById('pm-vz-val');
    var wxValSpan = document.getElementById('pm-wx-val');
    var wyValSpan = document.getElementById('pm-wy-val');
    var volumeValueSpan = document.getElementById('pm-volume-value');
    var resetBtn = document.getElementById('pm-reset-btn');

    var allElementsExist = [canvas, wzSlider, wzValueSpan, uxValSpan, uyValSpan, uzValSpan, vxValSpan, vyValSpan, vzValSpan, wxValSpan, wyValSpan, volumeValueSpan, resetBtn].every(function (el) { return !!el; });
    if (!allElementsExist) { console.error('Produto Misto: Elementos não encontrados.'); return; }

    var DEFAULT_U = { x: 2, y: 0.5, z: 0.2 };
    var DEFAULT_V = { x: 0.5, y: 2, z: 0.3 };
    var u_vec = { x: 2, y: 0.5, z: 0.2 };
    var v_vec = { x: 0.5, y: 2, z: 0.3 };
    var w_vec = { x: 0.2, y: 0.3, z: 1 };

    function drawSolidFace(p1, p2, p3, p4, fillColor) {
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y); ctx.lineTo(p4.x, p4.y);
      ctx.closePath();
      ctx.fillStyle = fillColor; ctx.fill();
      ctx.strokeStyle = 'rgba(200,200,200,0.4)'; ctx.stroke();
    }

    function drawParallelepiped(u, v, w, fillColor) {
      var O = { x: 0, y: 0, z: 0 };
      var P0 = project3D(O.x, O.y, O.z);
      var P_u = project3D(u.x, u.y, u.z);
      var P_v = project3D(v.x, v.y, v.z);
      var P_w = project3D(w.x, w.y, w.z);
      var P_uv = project3D(u.x + v.x, u.y + v.y, u.z + v.z);
      var P_uw = project3D(u.x + w.x, u.y + w.y, u.z + w.z);
      var P_vw = project3D(v.x + w.x, v.y + w.y, v.z + w.z);
      var P_uvw = project3D(u.x + v.x + w.x, u.y + v.y + w.y, u.z + v.z + w.z);
      var faces = [
        { points: [P0, P_v, P_vw, P_w], z: (O.z + v.z + v.z + w.z + w.z) / 4 },
        { points: [P0, P_u, P_uw, P_w], z: (O.z + u.z + u.z + w.z + w.z) / 4 },
        { points: [P0, P_u, P_uv, P_v], z: (O.z + u.z + u.z + v.z + v.z) / 4 },
        { points: [P_uw, P_uvw, P_vw, P_w].sort(function (a, b) { return a.y - b.y; }), z: (u.z + w.z + u.z + v.z + w.z + v.z + w.z + w.z) / 4 },
        { points: [P_u, P_uv, P_uvw, P_uw].sort(function (a, b) { return a.y - b.y; }), z: (u.z + u.z + v.z + u.z + v.z + w.z + u.z + w.z) / 4 },
        { points: [P_v, P_uv, P_uvw, P_vw].sort(function (a, b) { return a.y - b.y; }), z: (v.z + u.z + v.z + u.z + v.z + w.z + v.z + w.z) / 4 }
      ];
      faces.sort(function (a, b) { return a.z - b.z; });
      faces.forEach(function (face) { drawSolidFace(face.points[0], face.points[1], face.points[2], face.points[3], fillColor); });
    }

    function draw() {
      ctx.fillStyle = CANVAS_BG;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawAxes(ctx, project3D, 5);
      w_vec.z = parseFloat(wzSlider.value);
      wzValueSpan.textContent = w_vec.z.toFixed(1);
      uxValSpan.textContent = u_vec.x.toFixed(1); uyValSpan.textContent = u_vec.y.toFixed(1); uzValSpan.textContent = u_vec.z.toFixed(1);
      vxValSpan.textContent = v_vec.x.toFixed(1); vyValSpan.textContent = v_vec.y.toFixed(1); vzValSpan.textContent = v_vec.z.toFixed(1);
      wxValSpan.textContent = w_vec.x.toFixed(1); wyValSpan.textContent = w_vec.y.toFixed(1);
      var mixedProduct = (u_vec.y * v_vec.z - u_vec.z * v_vec.y) * w_vec.x +
        (u_vec.z * v_vec.x - u_vec.x * v_vec.z) * w_vec.y +
        (u_vec.x * v_vec.y - u_vec.y * v_vec.x) * w_vec.z;
      var volume = Math.abs(mixedProduct);
      drawParallelepiped(u_vec, v_vec, w_vec, 'rgba(173, 255, 47, 0.15)');
      drawVectorAt(ctx, project3D, u_vec, COLOR_U);
      drawVectorAt(ctx, project3D, v_vec, COLOR_V);
      drawVectorAt(ctx, project3D, w_vec, COLOR_NORMAL);
      volumeValueSpan.innerHTML = '\\( ' + volume.toFixed(2) + ' \\)';
      typeset([volumeValueSpan]);
    }

    function resetVectorsPM() {
      u_vec = { x: DEFAULT_U.x, y: DEFAULT_U.y, z: DEFAULT_U.z };
      v_vec = { x: DEFAULT_V.x, y: DEFAULT_V.y, z: DEFAULT_V.z };
      wzSlider.value = 1;
      draw();
    }

    if (wzSlider) wzSlider.addEventListener('input', draw);
    if (resetBtn) resetBtn.addEventListener('click', resetVectorsPM);
    resetVectorsPM();
  }

  // ==================== SIMULADOR: EQUAÇÃO DO PLANO ====================

  function initEquacaoPlano() {
    var canvas = document.getElementById('equacao-plano-canvas');
    if (!canvas || canvas.dataset.initialized) return;
    canvas.dataset.initialized = 'true';
    var ctx = canvas.getContext('2d');
    var project3D = makeProjector(canvas.width / 2, canvas.height / 2, 30);

    var aSlider = document.getElementById('plano-a');
    var bSlider = document.getElementById('plano-b');
    var cSlider = document.getElementById('plano-c');
    var dSlider = document.getElementById('plano-d');
    var aValue = document.getElementById('plano-a-value');
    var bValue = document.getElementById('plano-b-value');
    var cValue = document.getElementById('plano-c-value');
    var dValue = document.getElementById('plano-d-value');
    var eqDisplay = document.getElementById('plano-eq-display');

    var allElementsExist = [canvas, aSlider, bSlider, cSlider, dSlider, aValue, bValue, cValue, dValue, eqDisplay].every(function (el) { return !!el; });
    if (!allElementsExist) { console.error('Equação Plano: Elementos não encontrados.'); return; }

    function drawVectorFromPoint(startVec, dirVec, color, lineWidth) {
      var startPoint = project3D(startVec.x, startVec.y, startVec.z);
      var endPoint = project3D(startVec.x + dirVec.x, startVec.y + dirVec.y, startVec.z + dirVec.z);
      drawArrow(ctx, startPoint, endPoint, color, lineWidth || 2);
    }

    function drawPlanePatch(normal, d_const, planeDrawSize, fillColor) {
      var a = normal.a, b = normal.b, c = normal.c;
      if (Math.abs(a) < 0.01 && Math.abs(b) < 0.01 && Math.abs(c) < 0.01) return;
      var P0;
      if (Math.abs(c) > 0.01) P0 = { x: 0, y: 0, z: -d_const / c };
      else if (Math.abs(b) > 0.01) P0 = { x: 0, y: -d_const / b, z: 0 };
      else P0 = { x: -d_const / a, y: 0, z: 0 };
      var d1, d2;
      if (Math.abs(c) > 0.01) { d1 = { x: 1, y: 0, z: -a / c }; d2 = { x: 0, y: 1, z: -b / c }; }
      else if (Math.abs(b) > 0.01) { d1 = { x: 1, y: -a / b, z: 0 }; d2 = { x: 0, y: -c / b, z: 1 }; }
      else { d1 = { x: -b / a, y: 1, z: 0 }; d2 = { x: -c / a, y: 0, z: 1 }; }
      var magD1 = Math.sqrt(d1.x * d1.x + d1.y * d1.y + d1.z * d1.z);
      if (magD1 > 0.01) { d1.x /= magD1; d1.y /= magD1; d1.z /= magD1; }
      var n_vec = { x: a, y: b, z: c };
      d2 = { x: n_vec.y * d1.z - n_vec.z * d1.y, y: n_vec.z * d1.x - n_vec.x * d1.z, z: n_vec.x * d1.y - n_vec.y * d1.x };
      var magD2 = Math.sqrt(d2.x * d2.x + d2.y * d2.y + d2.z * d2.z);
      if (magD2 > 0.01) { d2.x /= magD2; d2.y /= magD2; d2.z /= magD2; }
      var ps = planeDrawSize;
      var p_1 = project3D(P0.x + ps * d1.x + ps * d2.x, P0.y + ps * d1.y + ps * d2.y, P0.z + ps * d1.z + ps * d2.z);
      var p_2 = project3D(P0.x - ps * d1.x + ps * d2.x, P0.y - ps * d1.y + ps * d2.y, P0.z - ps * d1.z + ps * d2.z);
      var p_3 = project3D(P0.x - ps * d1.x - ps * d2.x, P0.y - ps * d1.y - ps * d2.y, P0.z - ps * d1.z - ps * d2.z);
      var p_4 = project3D(P0.x + ps * d1.x - ps * d2.x, P0.y + ps * d1.y - ps * d2.y, P0.z + ps * d1.z - ps * d2.z);
      ctx.beginPath();
      ctx.moveTo(p_1.x, p_1.y); ctx.lineTo(p_2.x, p_2.y);
      ctx.lineTo(p_3.x, p_3.y); ctx.lineTo(p_4.x, p_4.y);
      ctx.closePath();
      ctx.fillStyle = fillColor; ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.stroke();
      drawVectorFromPoint(P0, { x: a * 1.5, y: b * 1.5, z: c * 1.5 }, COLOR_NORMAL, 2);
    }

    function draw() {
      ctx.fillStyle = CANVAS_BG;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawAxes(ctx, project3D, 5);
      var normal = { a: parseFloat(aSlider.value), b: parseFloat(bSlider.value), c: parseFloat(cSlider.value) };
      var d_const = parseFloat(dSlider.value);
      aValue.textContent = normal.a.toFixed(1);
      bValue.textContent = normal.b.toFixed(1);
      cValue.textContent = normal.c.toFixed(1);
      dValue.textContent = d_const.toFixed(1);
      eqDisplay.innerHTML = '\\( ' + normal.a.toFixed(1) + 'x ' + (normal.b < 0 ? '-' : '+') + ' ' + Math.abs(normal.b).toFixed(1) + 'y ' + (normal.c < 0 ? '-' : '+') + ' ' + Math.abs(normal.c).toFixed(1) + 'z ' + (d_const < 0 ? '-' : '+') + ' ' + Math.abs(d_const).toFixed(1) + ' = 0 \\)';
      typeset([eqDisplay]);
      drawPlanePatch(normal, d_const, 4, 'rgba(173, 255, 47, 0.2)');
    }

    [aSlider, bSlider, cSlider, dSlider].forEach(function (s) { s.addEventListener('input', draw); });
    draw();
  }

  // ==================== SIMULADOR: EQUAÇÃO DA RETA ====================

  function initEquacaoReta() {
    var canvas = document.getElementById('equacao-reta-espaco-canvas');
    if (!canvas || canvas.dataset.initialized) return;
    canvas.dataset.initialized = 'true';
    var ctx = canvas.getContext('2d');
    var project3D = makeProjector(canvas.width / 2, canvas.height / 2, 30);

    var pointIds = ['reta-x0', 'reta-y0', 'reta-z0'];
    var dirIds = ['reta-va', 'reta-vb', 'reta-vc'];
    var pointSliders = pointIds.map(function (id) { return document.getElementById(id); });
    var dirSliders = dirIds.map(function (id) { return document.getElementById(id); });
    var pointVals = pointIds.map(function (id) { return document.getElementById(id + '-val'); });
    var dirVals = dirIds.map(function (id) { return document.getElementById(id + '-val'); });

    var allElementsExist = pointSliders.concat(dirSliders, pointVals, dirVals, [canvas]).every(function (el) { return !!el; });
    if (!allElementsExist) { console.error('Equação Reta: Elementos não encontrados.'); return; }

    function drawLineSegment3D(pStart, pEnd, color, lineWidth) {
      var start = project3D(pStart.x, pStart.y, pStart.z);
      var end = project3D(pEnd.x, pEnd.y, pEnd.z);
      ctx.beginPath();
      ctx.moveTo(start.x, start.y); ctx.lineTo(end.x, end.y);
      ctx.strokeStyle = color; ctx.lineWidth = lineWidth || 2; ctx.stroke();
    }

    function draw() {
      ctx.fillStyle = CANVAS_BG;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawAxes(ctx, project3D, 5);
      var P0 = { x: parseFloat(pointSliders[0].value), y: parseFloat(pointSliders[1].value), z: parseFloat(pointSliders[2].value) };
      var v_dir = { x: parseFloat(dirSliders[0].value), y: parseFloat(dirSliders[1].value), z: parseFloat(dirSliders[2].value) };
      pointVals.forEach(function (el, i) { el.textContent = [P0.x, P0.y, P0.z][i].toFixed(1); });
      dirVals.forEach(function (el, i) { el.textContent = [v_dir.x, v_dir.y, v_dir.z][i].toFixed(1); });
      var tMin = -15;
      var tMax = 15;
      var lineStart = { x: P0.x + tMin * v_dir.x, y: P0.y + tMin * v_dir.y, z: P0.z + tMin * v_dir.z };
      var lineEnd = { x: P0.x + tMax * v_dir.x, y: P0.y + tMax * v_dir.y, z: P0.z + tMax * v_dir.z };
      drawLineSegment3D(lineStart, lineEnd, COLOR_RESULT, 2);
      var projP0 = project3D(P0.x, P0.y, P0.z);
      ctx.beginPath(); ctx.arc(projP0.x, projP0.y, 5, 0, 2 * Math.PI); ctx.fillStyle = COLOR_U; ctx.fill();
      var v_end = { x: P0.x + v_dir.x * 2, y: P0.y + v_dir.y * 2, z: P0.z + v_dir.z * 2 };
      drawLineSegment3D(P0, v_end, 'rgba(255,100,70,0.7)', 1);
    }

    pointSliders.concat(dirSliders).forEach(function (s) { s.addEventListener('input', draw); });
    draw();
  }

  // ==================== API PÚBLICA (window.vizX = { init, cleanup }) ====================

  function noopCleanup() { /* orientado a eventos: sem loops para cancelar */ }

  window.vizR3Vetores = { init: initR3Vetores, cleanup: noopCleanup };
  window.vizProdutoInternoR3 = { init: initProdutoInternoR3, cleanup: noopCleanup };
  window.vizProdutoVetorial = { init: initProdutoVetorial, cleanup: noopCleanup };
  window.vizProdutoMisto = { init: initProdutoMisto, cleanup: noopCleanup };
  window.vizEquacaoPlano = { init: initEquacaoPlano, cleanup: noopCleanup };
  window.vizEquacaoReta = { init: initEquacaoReta, cleanup: noopCleanup };
})();
