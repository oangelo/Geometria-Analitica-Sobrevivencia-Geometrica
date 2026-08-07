// Simuladores 3D - Capítulo VI
// Cada simulador expõe uma função de inicialização via window.init*Simulator

// Vetores em R3 (Soma e Módulo)
window.initR3Vetores = function() {
  const canvas = document.getElementById('r3-vetores-canvas');
  if (!canvas || canvas.dataset.initialized) return;
  canvas.dataset.initialized = 'true';
  const ctx = canvas.getContext('2d');

  const uxSlider = document.getElementById('r3-ux');
  const uySlider = document.getElementById('r3-uy');
  const uzSlider = document.getElementById('r3-uz');
  const vxSlider = document.getElementById('r3-vx');
  const vySlider = document.getElementById('r3-vy');
  const vzSlider = document.getElementById('r3-vz');
  const uxValue = document.getElementById('r3-ux-value');
  const uyValue = document.getElementById('r3-uy-value');
  const uzValue = document.getElementById('r3-uz-value');
  const vxValue = document.getElementById('r3-vx-value');
  const vyValue = document.getElementById('r3-vy-value');
  const vzValue = document.getElementById('r3-vz-value');
  const somaSpan = document.getElementById('r3-soma');
  const magUSpan = document.getElementById('r3-mag-u');

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const scale = 30;

  function project3D(x, y, z) {
    const L = 0.4; const alpha = Math.PI / 6;
    const screenX = centerX + (x - z * L * Math.cos(alpha)) * scale;
    const screenY = centerY - (y + z * L * Math.sin(alpha)) * scale;
    return { x: screenX, y: screenY };
  }

  function drawAxes() {
    ctx.strokeStyle = '#555'; ctx.lineWidth = 1; ctx.font = "12px 'Courier New', monospace"; ctx.fillStyle = '#ADFF2F';
    const O = project3D(0,0,0);
    let Px = project3D(5,0,0); ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Px.x, Px.y); ctx.stroke(); ctx.fillText("X", Px.x + 5, Px.y);
    let Py = project3D(0,5,0); ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Py.x, Py.y); ctx.stroke(); ctx.fillText("Y", Py.x, Py.y - 5);
    let Pz = project3D(0,0,5); ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Pz.x, Pz.y); ctx.stroke(); ctx.fillText("Z", Pz.x + 5, Pz.y + 5);
  }

  function drawVector(vec, color, label) {
    const origin = project3D(0,0,0);
    const endPoint = project3D(vec.x, vec.y, vec.z);
    ctx.beginPath(); ctx.moveTo(origin.x, origin.y); ctx.lineTo(endPoint.x, endPoint.y);
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
    const headlen = 10; const angle = Math.atan2(endPoint.y - origin.y, endPoint.x - origin.x);
    ctx.beginPath(); ctx.moveTo(endPoint.x, endPoint.y);
    ctx.lineTo(endPoint.x - headlen * Math.cos(angle - Math.PI / 6), endPoint.y - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(endPoint.x - headlen * Math.cos(angle + Math.PI / 6), endPoint.y - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath(); ctx.fillStyle = color; ctx.fill();
    if (label) { ctx.fillStyle = color; ctx.font = "14px 'Courier New', monospace"; ctx.fillText(label, endPoint.x + 8, endPoint.y); }
  }

  function drawVectorFromTo(start, end, color) {
    const p1 = project3D(start.x, start.y, start.z);
    const p2 = project3D(end.x, end.y, end.z);
    ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.setLineDash([5, 5]); ctx.stroke(); ctx.setLineDash([]);
  }

  function draw() {
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawAxes();
    const u = { x: parseFloat(uxSlider.value), y: parseFloat(uySlider.value), z: parseFloat(uzSlider.value) };
    const v = { x: parseFloat(vxSlider.value), y: parseFloat(vySlider.value), z: parseFloat(vzSlider.value) };
    const s = { x: u.x + v.x, y: u.y + v.y, z: u.z + v.z };
    uxValue.textContent = u.x.toFixed(1); uyValue.textContent = u.y.toFixed(1); uzValue.textContent = u.z.toFixed(1);
    vxValue.textContent = v.x.toFixed(1); vyValue.textContent = v.y.toFixed(1); vzValue.textContent = v.z.toFixed(1);
    somaSpan.textContent = `(${s.x.toFixed(1)}, ${s.y.toFixed(1)}, ${s.z.toFixed(1)})`;
    magUSpan.textContent = Math.sqrt(u.x**2 + u.y**2 + u.z**2).toFixed(2).replace('.', ',');
    drawVector(u, '#FFD700', 'u');
    drawVector(v, '#4682B4', 'v');
    drawVector(s, '#ADFF2F', 'u+v');
    drawVectorFromTo(u, s, 'rgba(70,130,180,0.4)');
    drawVectorFromTo(v, s, 'rgba(255,215,0,0.4)');
  }

  function setupControls() {
    [uxSlider, uySlider, uzSlider, vxSlider, vySlider, vzSlider].forEach(s => s.addEventListener('input', draw));
  }
  const allElementsExist = [canvas, uxSlider, uySlider, uzSlider, vxSlider, vySlider, vzSlider, uxValue, uyValue, uzValue, vxValue, vyValue, vzValue, somaSpan, magUSpan].every(el => !!el);
  if (allElementsExist) { setupControls(); draw(); } else { console.error("R3 Vetores: Elementos não encontrados."); }
};

// Produto Interno R3
window.initProdutoInternoR3 = function() {
  const canvas = document.getElementById('produto-interno-r3-canvas');
  if (!canvas || canvas.dataset.initialized) return;
  canvas.dataset.initialized = 'true';
  const ctx = canvas.getContext('2d');

  const uxSlider = document.getElementById('pi-r3-ux'); 
  const uySlider = document.getElementById('pi-r3-uy');
  const uzSlider = document.getElementById('pi-r3-uz');
  const vxSlider = document.getElementById('pi-r3-vx');
  const vySlider = document.getElementById('pi-r3-vy');
  const vzSlider = document.getElementById('pi-r3-vz');
  const uxValue = document.getElementById('pi-r3-ux-value');
  const uyValue = document.getElementById('pi-r3-uy-value');
  const uzValue = document.getElementById('pi-r3-uz-value');
  const vxValue = document.getElementById('pi-r3-vx-value');
  const vyValue = document.getElementById('pi-r3-vy-value');
  const vzValue = document.getElementById('pi-r3-vz-value');
  const dotValueSpan = document.getElementById('pi-r3-dot-value');
  const angleValueSpan = document.getElementById('pi-r3-angle-value');

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const scale = 30; 

  function project3D(x, y, z) {
    const L = 0.4; const alpha = Math.PI / 6; 
    const screenX = centerX + (x - z * L * Math.cos(alpha)) * scale;
    const screenY = centerY - (y + z * L * Math.sin(alpha)) * scale; 
    return { x: screenX, y: screenY };
  }

  function drawAxes() {
    ctx.strokeStyle = '#555'; ctx.lineWidth = 1; ctx.font = "12px 'Courier New', monospace"; ctx.fillStyle = '#ADFF2F';
    const O = project3D(0,0,0);
    let Px = project3D(5,0,0); ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Px.x, Px.y); ctx.stroke(); ctx.fillText("X", Px.x + 5, Px.y);
    let Py = project3D(0,5,0); ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Py.x, Py.y); ctx.stroke(); ctx.fillText("Y", Py.x, Py.y - 5);
    let Pz = project3D(0,0,5); ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Pz.x, Pz.y); ctx.stroke(); ctx.fillText("Z", Pz.x + 5, Pz.y + 5);
  }
  
  function drawVector(vec, color) {
    const origin = project3D(0,0,0);
    const endPoint = project3D(vec.x, vec.y, vec.z);
    ctx.beginPath(); ctx.moveTo(origin.x, origin.y); ctx.lineTo(endPoint.x, endPoint.y);
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
    const headlen = 10; const angle = Math.atan2(endPoint.y - origin.y, endPoint.x - origin.x);
    ctx.beginPath(); ctx.moveTo(endPoint.x, endPoint.y);
    ctx.lineTo(endPoint.x - headlen * Math.cos(angle - Math.PI / 6), endPoint.y - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(endPoint.x - headlen * Math.cos(angle + Math.PI / 6), endPoint.y - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath(); ctx.fillStyle = color; ctx.fill();
  }

  function draw() {
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawAxes();
    const u = { x: parseFloat(uxSlider.value), y: parseFloat(uySlider.value), z: parseFloat(uzSlider.value) };
    const v = { x: parseFloat(vxSlider.value), y: parseFloat(vySlider.value), z: parseFloat(vzSlider.value) };
    uxValue.textContent = u.x.toFixed(1); uyValue.textContent = u.y.toFixed(1); uzValue.textContent = u.z.toFixed(1);
    vxValue.textContent = v.x.toFixed(1); vyValue.textContent = v.y.toFixed(1); vzValue.textContent = v.z.toFixed(1);
    drawVector(u, '#FFD700'); 
    drawVector(v, '#4682B4'); 
    const dotProduct = u.x * v.x + u.y * v.y + u.z * v.z;
    const magU = Math.sqrt(u.x**2 + u.y**2 + u.z**2);
    const magV = Math.sqrt(v.x**2 + v.y**2 + v.z**2);
    let angleDeg = 0;
    if (magU > 0.001 && magV > 0.001) {
      const cosTheta = Math.max(-1, Math.min(1, dotProduct / (magU * magV)));
      angleDeg = Math.acos(cosTheta) * (180 / Math.PI);
    }
    dotValueSpan.innerHTML = `\\( ${dotProduct.toFixed(2)} \\)`;
    angleValueSpan.innerHTML = `\\( ${angleDeg.toFixed(1)}^\\circ \\)`;
    if (window.MathJax && window.MathJax.typeset) { window.MathJax.typeset([dotValueSpan, angleValueSpan]); }
  }

  function setupControls() { 
    [uxSlider, uySlider, uzSlider, vxSlider, vySlider, vzSlider].forEach(s => s.addEventListener('input', draw));
  }
  const allElementsExist = [canvas, uxSlider, uySlider, uzSlider, vxSlider, vySlider, vzSlider, uxValue, uyValue, uzValue, vxValue, vyValue, vzValue, dotValueSpan, angleValueSpan].every(el => !!el);
  if(allElementsExist) { setupControls(); draw(); } else { console.error("Produto Interno R3: Elementos não encontrados.");}
};

// Produto Vetorial
window.initProdutoVetorial = function() {
  const canvas = document.getElementById('produto-vetorial-canvas');
  if (!canvas || canvas.dataset.initialized) return;
  canvas.dataset.initialized = 'true';
  const ctx = canvas.getContext('2d');
  const uxSlider = document.getElementById('pv-ux'); const uySlider = document.getElementById('pv-uy'); const uzSlider = document.getElementById('pv-uz');
  const vxSlider = document.getElementById('pv-vx'); const vySlider = document.getElementById('pv-vy'); const vzSlider = document.getElementById('pv-vz');
  const uxValue = document.getElementById('pv-ux-value'); const uyValue = document.getElementById('pv-uy-value'); const uzValue = document.getElementById('pv-uz-value');
  const vxValue = document.getElementById('pv-vx-value'); const vyValue = document.getElementById('pv-vy-value'); const vzValue = document.getElementById('pv-vz-value');
  const resultVectorSpan = document.getElementById('pv-result-vector'); const areaValueSpan = document.getElementById('pv-area-value');
  const centerX = canvas.width / 2; const centerY = canvas.height / 2; const scale = 40;

  function project3D(x,y,z) { 
    const L = 0.4; const alpha = Math.PI / 6;
    const screenX = centerX + (x - z * L * Math.cos(alpha)) * scale;
    const screenY = centerY - (y + z * L * Math.sin(alpha)) * scale;
    return { x: screenX, y: screenY };
  }
  function drawAxes() { 
    ctx.strokeStyle = '#555'; ctx.lineWidth = 1; ctx.font = "12px 'Courier New', monospace"; ctx.fillStyle = '#ADFF2F';
    const O = project3D(0,0,0);
    let Px = project3D(3,0,0); ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Px.x, Px.y); ctx.stroke(); ctx.fillText("X", Px.x + 5, Px.y);
    let Py = project3D(0,3,0); ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Py.x, Py.y); ctx.stroke(); ctx.fillText("Y", Py.x, Py.y - 5);
    let Pz = project3D(0,0,3); ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Pz.x, Pz.y); ctx.stroke(); ctx.fillText("Z", Pz.x + 5, Pz.y + 5);
  }
  function drawVector(vec, color, lineWidth = 2) { 
    const origin = project3D(0,0,0); const endPoint = project3D(vec.x, vec.y, vec.z);
    ctx.beginPath(); ctx.moveTo(origin.x, origin.y); ctx.lineTo(endPoint.x, endPoint.y);
    ctx.strokeStyle = color; ctx.lineWidth = lineWidth; ctx.stroke();
    const headlen = 10; const angle = Math.atan2(endPoint.y - origin.y, endPoint.x - origin.x);
    ctx.beginPath(); ctx.moveTo(endPoint.x, endPoint.y);
    ctx.lineTo(endPoint.x - headlen * Math.cos(angle - Math.PI / 6), endPoint.y - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(endPoint.x - headlen * Math.cos(angle + Math.PI / 6), endPoint.y - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath(); ctx.fillStyle = color; ctx.fill();
  }
  function drawParallelogram(u, v, color) { 
    const O = project3D(0,0,0); const Pu = project3D(u.x, u.y, u.z);
    const Pv = project3D(v.x, v.y, v.z); const Puv = project3D(u.x + v.x, u.y + v.y, u.z + v.z);
    ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Pu.x, Pu.y); ctx.lineTo(Puv.x, Puv.y);
    ctx.lineTo(Pv.x, Pv.y); ctx.closePath(); ctx.fillStyle = color; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.stroke();
  }
  function draw() { 
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, canvas.width, canvas.height); drawAxes();
    const u = { x: parseFloat(uxSlider.value), y: parseFloat(uySlider.value), z: parseFloat(uzSlider.value) };
    const v = { x: parseFloat(vxSlider.value), y: parseFloat(vySlider.value), z: parseFloat(vzSlider.value) };
    uxValue.textContent = u.x.toFixed(1); uyValue.textContent = u.y.toFixed(1); uzValue.textContent = u.z.toFixed(1);
    vxValue.textContent = v.x.toFixed(1); vyValue.textContent = v.y.toFixed(1); vzValue.textContent = v.z.toFixed(1);
    const w = { x: u.y * v.z - u.z * v.y, y: u.z * v.x - u.x * v.z, z: u.x * v.y - u.y * v.x };
    const area = Math.sqrt(w.x**2 + w.y**2 + w.z**2);
    drawParallelogram(u, v, 'rgba(70, 130, 180, 0.2)');
    drawVector(u, '#FFD700'); drawVector(v, '#4682B4'); drawVector(w, '#ADFF2F', 3);
    resultVectorSpan.innerHTML = `\\( (${w.x.toFixed(1)}, ${w.y.toFixed(1)}, ${w.z.toFixed(1)}) \\)`;
    areaValueSpan.innerHTML = `\\( ${area.toFixed(2)} \\)`;
    if (window.MathJax && window.MathJax.typeset) { window.MathJax.typeset([resultVectorSpan, areaValueSpan]); }
  }
  function setupControls() { 
    [uxSlider, uySlider, uzSlider, vxSlider, vySlider, vzSlider].forEach(s => s.addEventListener('input', draw));
  }
  const allElementsExist = [canvas, uxSlider, uySlider, uzSlider, vxSlider, vySlider, vzSlider, uxValue, uyValue, uzValue, vxValue, vyValue, vzValue, resultVectorSpan, areaValueSpan].every(el => !!el);
  if(allElementsExist){ setupControls(); draw(); } else { console.error("Produto Vetorial: Elementos não encontrados.");}
};

// Produto Misto
window.initProdutoMisto = function() {
  const canvas = document.getElementById('produto-misto-canvas');
  if (!canvas || canvas.dataset.initialized) return;
  canvas.dataset.initialized = 'true';
  const ctx = canvas.getContext('2d');
  const wzSlider = document.getElementById('pm-wz-slider'); 
  const wzValueSpan = document.getElementById('pm-wz-value-span'); 
  const uxValSpan = document.getElementById('pm-ux-val'); const uyValSpan = document.getElementById('pm-uy-val'); const uzValSpan = document.getElementById('pm-uz-val');
  const vxValSpan = document.getElementById('pm-vx-val'); const vyValSpan = document.getElementById('pm-vy-val'); const vzValSpan = document.getElementById('pm-vz-val');
  const wxValSpan = document.getElementById('pm-wx-val'); const wyValSpan = document.getElementById('pm-wy-val');
  const volumeValueSpan = document.getElementById('pm-volume-value');
  const resetBtn = document.getElementById('pm-reset-btn');
  const centerX = canvas.width / 2; const centerY = canvas.height / 2; const scale = 25;
  let u_vec = { x: 2, y: 0.5, z: 0.2 }; 
  let v_vec = { x: 0.5, y: 2, z: 0.3 };
  let w_vec = { x: 0.2, y: 0.3, z: 1 }; 

  function project3D(x,y,z) { 
    const L = 0.4; const alpha = Math.PI / 6;
    const screenX = centerX + (x - z * L * Math.cos(alpha)) * scale;
    const screenY = centerY - (y + z * L * Math.sin(alpha)) * scale;
    return { x: screenX, y: screenY };
  }
  function drawAxes() { 
    ctx.strokeStyle = '#555'; ctx.lineWidth = 1; ctx.font = "12px 'Courier New', monospace"; ctx.fillStyle = '#ADFF2F';
    const O = project3D(0,0,0);
    let Px = project3D(5,0,0); ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Px.x, Px.y); ctx.stroke(); ctx.fillText("X", Px.x + 5, Px.y);
    let Py = project3D(0,5,0); ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Py.x, Py.y); ctx.stroke(); ctx.fillText("Y", Py.x, Py.y - 5);
    let Pz = project3D(0,0,5); ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Pz.x, Pz.y); ctx.stroke(); ctx.fillText("Z", Pz.x + 5, Pz.y + 5);
  }
  function drawVector(vec, color, lineWidth = 2) { 
    const origin = project3D(0,0,0); const endPoint = project3D(vec.x, vec.y, vec.z);
    ctx.beginPath(); ctx.moveTo(origin.x, origin.y); ctx.lineTo(endPoint.x, endPoint.y);
    ctx.strokeStyle = color; ctx.lineWidth = lineWidth; ctx.stroke();
    const headlen = 10; const angle = Math.atan2(endPoint.y - origin.y, endPoint.x - origin.x);
    ctx.beginPath(); ctx.moveTo(endPoint.x, endPoint.y);
    ctx.lineTo(endPoint.x - headlen * Math.cos(angle - Math.PI / 6), endPoint.y - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(endPoint.x - headlen * Math.cos(angle + Math.PI / 6), endPoint.y - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath(); ctx.fillStyle = color; ctx.fill();
  }
  function drawSolidFace(p1,p2,p3,p4,fillColor) {
    ctx.beginPath();
    ctx.moveTo(p1.x,p1.y); ctx.lineTo(p2.x,p2.y);
    ctx.lineTo(p3.x,p3.y); ctx.lineTo(p4.x,p4.y);
    ctx.closePath();
    ctx.fillStyle = fillColor; ctx.fill();
    ctx.strokeStyle = 'rgba(200,200,200,0.4)'; ctx.stroke();
  }
  function drawParallelepiped(u,v,w,fillColor) {
    const O = {x:0,y:0,z:0};
    const P0 = project3D(O.x,O.y,O.z);
    const P_u = project3D(u.x,u.y,u.z);
    const P_v = project3D(v.x,v.y,v.z);
    const P_w = project3D(w.x,w.y,w.z);
    const P_uv = project3D(u.x+v.x, u.y+v.y, u.z+v.z);
    const P_uw = project3D(u.x+w.x, u.y+w.y, u.z+w.z);
    const P_vw = project3D(v.x+w.x, v.y+w.y, v.z+w.z);
    const P_uvw = project3D(u.x+v.x+w.x, u.y+v.y+w.y, u.z+v.z+w.z);
    const faces = [
      { points: [P0, P_v, P_vw, P_w], z: (O.z+v.z+v.z+w.z+w.z)/4 },
      { points: [P0, P_u, P_uw, P_w], z: (O.z+u.z+u.z+w.z+w.z)/4 },
      { points: [P0, P_u, P_uv, P_v], z: (O.z+u.z+u.z+v.z+v.z)/4 },
      { points: [P_uw, P_uvw, P_vw, P_w].sort((a,b) => a.y - b.y), z: (u.z+w.z+u.z+v.z+w.z+v.z+w.z+w.z)/4 },
      { points: [P_u, P_uv, P_uvw, P_uw].sort((a,b) => a.y - b.y), z: (u.z+u.z+v.z+u.z+v.z+w.z+u.z+w.z)/4 },
      { points: [P_v, P_uv, P_uvw, P_vw].sort((a,b) => a.y - b.y), z: (v.z+u.z+v.z+u.z+v.z+w.z+v.z+w.z)/4 }
    ];
    faces.sort((a, b) => a.z - b.z);
    faces.forEach(face => drawSolidFace(face.points[0], face.points[1], face.points[2], face.points[3], fillColor));
  }
  function draw() { 
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, canvas.width, canvas.height); drawAxes();
    w_vec.z = parseFloat(wzSlider.value); 
    wzValueSpan.textContent = w_vec.z.toFixed(1);
    uxValSpan.textContent = u_vec.x.toFixed(1); uyValSpan.textContent = u_vec.y.toFixed(1); uzValSpan.textContent = u_vec.z.toFixed(1);
    vxValSpan.textContent = v_vec.x.toFixed(1); vyValSpan.textContent = v_vec.y.toFixed(1); vzValSpan.textContent = v_vec.z.toFixed(1);
    wxValSpan.textContent = w_vec.x.toFixed(1); wyValSpan.textContent = w_vec.y.toFixed(1);
    const mixedProduct = (u_vec.y * v_vec.z - u_vec.z * v_vec.y) * w_vec.x + 
                         (u_vec.z * v_vec.x - u_vec.x * v_vec.z) * w_vec.y + 
                         (u_vec.x * v_vec.y - u_vec.y * v_vec.x) * w_vec.z;
    const volume = Math.abs(mixedProduct);
    drawParallelepiped(u_vec, v_vec, w_vec, 'rgba(173, 255, 47, 0.15)');
    drawVector(u_vec, '#FFD700'); drawVector(v_vec, '#4682B4'); drawVector(w_vec, '#FF6347');
    volumeValueSpan.innerHTML = `\\( ${volume.toFixed(2)} \\)`;
    if (window.MathJax && window.MathJax.typeset) { window.MathJax.typeset([volumeValueSpan]); }
  }
  function resetVectorsPM() { u_vec = { x: 2, y: 0.5, z: 0.2 }; v_vec = { x: 0.5, y: 2, z: 0.3 }; wzSlider.value = 1; draw(); }
  function setupControls() { if (wzSlider) wzSlider.addEventListener('input', draw); if (resetBtn) resetBtn.addEventListener('click', resetVectorsPM); }
  const allElementsExist = [canvas, wzSlider, wzValueSpan, uxValSpan, uyValSpan, uzValSpan, vxValSpan, vyValSpan, vzValSpan, wxValSpan, wyValSpan, volumeValueSpan, resetBtn].every(el => !!el);
  if(allElementsExist){ setupControls(); resetVectorsPM(); } else { console.error("Produto Misto: Elementos não encontrados.");}
};

// Equação do Plano
window.initEquacaoPlano = function() {
  const canvas = document.getElementById('equacao-plano-canvas');
  if (!canvas || canvas.dataset.initialized) return;
  canvas.dataset.initialized = 'true';
  const ctx = canvas.getContext('2d');
  const aSlider = document.getElementById('plano-a'); const bSlider = document.getElementById('plano-b'); const cSlider = document.getElementById('plano-c'); const dSlider = document.getElementById('plano-d');
  const aValue = document.getElementById('plano-a-value'); const bValue = document.getElementById('plano-b-value'); const cValue = document.getElementById('plano-c-value'); const dValue = document.getElementById('plano-d-value');
  const eqDisplay = document.getElementById('plano-eq-display');
  const centerX = canvas.width / 2; const centerY = canvas.height / 2; const scale = 30; 

  function project3D(x,y,z) { 
    const L = 0.4; const alpha = Math.PI / 6;
    const screenX = centerX + (x - z * L * Math.cos(alpha)) * scale;
    const screenY = centerY - (y + z * L * Math.sin(alpha)) * scale;
    return { x: screenX, y: screenY };
  }
  function drawAxes() { 
    ctx.strokeStyle = '#555'; ctx.lineWidth = 1; ctx.font = "12px 'Courier New', monospace"; ctx.fillStyle = '#ADFF2F';
    const O = project3D(0,0,0);
    let Px = project3D(5,0,0); ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Px.x, Px.y); ctx.stroke(); ctx.fillText("X", Px.x + 5, Px.y);
    let Py = project3D(0,5,0); ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Py.x, Py.y); ctx.stroke(); ctx.fillText("Y", Py.x, Py.y - 5);
    let Pz = project3D(0,0,5); ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Pz.x, Pz.y); ctx.stroke(); ctx.fillText("Z", Pz.x + 5, Pz.y + 5);
  }
  function drawVectorFromPoint(startVec, dirVec, color, lineWidth = 2) { 
    const startPoint = project3D(startVec.x, startVec.y, startVec.z);
    const endPoint = project3D(startVec.x + dirVec.x, startVec.y + dirVec.y, startVec.z + dirVec.z);
    ctx.beginPath(); ctx.moveTo(startPoint.x, startPoint.y); ctx.lineTo(endPoint.x, endPoint.y);
    ctx.strokeStyle = color; ctx.lineWidth = lineWidth; ctx.stroke();
    const headlen = 10; const angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
    ctx.beginPath(); ctx.moveTo(endPoint.x, endPoint.y);
    ctx.lineTo(endPoint.x - headlen * Math.cos(angle - Math.PI / 6), endPoint.y - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(endPoint.x - headlen * Math.cos(angle + Math.PI / 6), endPoint.y - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath(); ctx.fillStyle = color; ctx.fill();
  }
  function drawPlanePatch(normal, d_const, planeDrawSize, fillColor) {
    const { a, b, c } = normal;
    if (Math.abs(a) < 0.01 && Math.abs(b) < 0.01 && Math.abs(c) < 0.01) return; 
    let P0; 
    if (Math.abs(c) > 0.01) P0 = { x: 0, y: 0, z: -d_const / c };
    else if (Math.abs(b) > 0.01) P0 = { x: 0, y: -d_const / b, z: 0 };
    else P0 = { x: -d_const / a, y: 0, z: 0 };
    let d1, d2; 
    if (Math.abs(c) > 0.01) { d1 = { x: 1, y: 0, z: -a / c }; d2 = { x: 0, y: 1, z: -b / c };}
    else if (Math.abs(b) > 0.01) { d1 = { x: 1, y: -a/b, z: 0}; d2 = { x: 0, y: -c/b, z: 1};}
    else { d1 = { x: -b/a, y: 1, z: 0}; d2 = { x: -c/a, y: 0, z: 1};}
    const magD1 = Math.sqrt(d1.x**2 + d1.y**2 + d1.z**2); if(magD1 > 0.01) { d1.x /= magD1; d1.y /= magD1; d1.z /= magD1;}
    const n_vec = {x:a, y:b, z:c};
    d2 = { x: n_vec.y*d1.z - n_vec.z*d1.y, y: n_vec.z*d1.x - n_vec.x*d1.z, z: n_vec.x*d1.y - n_vec.y*d1.x};
    const magD2 = Math.sqrt(d2.x**2 + d2.y**2 + d2.z**2); if(magD2 > 0.01) { d2.x /= magD2; d2.y /= magD2; d2.z /= magD2;}
    const ps = planeDrawSize;
    const p_1 = project3D(P0.x + ps*d1.x + ps*d2.x, P0.y + ps*d1.y + ps*d2.y, P0.z + ps*d1.z + ps*d2.z);
    const p_2 = project3D(P0.x - ps*d1.x + ps*d2.x, P0.y - ps*d1.y + ps*d2.y, P0.z - ps*d1.z + ps*d2.z);
    const p_3 = project3D(P0.x - ps*d1.x - ps*d2.x, P0.y - ps*d1.y - ps*d2.y, P0.z - ps*d1.z - ps*d2.z);
    const p_4 = project3D(P0.x + ps*d1.x - ps*d2.x, P0.y + ps*d1.y - ps*d2.y, P0.z + ps*d1.z - ps*d2.z);
    ctx.beginPath();
    ctx.moveTo(p_1.x, p_1.y); ctx.lineTo(p_2.x, p_2.y);
    ctx.lineTo(p_3.x, p_3.y); ctx.lineTo(p_4.x, p_4.y);
    ctx.closePath();
    ctx.fillStyle = fillColor; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.stroke();
    drawVectorFromPoint(P0, {x:normal.a*1.5, y:normal.b*1.5, z:normal.c*1.5}, '#FF6347', 2); 
  }
  function draw() { 
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, canvas.width, canvas.height); drawAxes();
    const normal = { a: parseFloat(aSlider.value), b: parseFloat(bSlider.value), c: parseFloat(cSlider.value) };
    const d_const = parseFloat(dSlider.value);
    aValue.textContent = normal.a.toFixed(1); bValue.textContent = normal.b.toFixed(1); cValue.textContent = normal.c.toFixed(1); dValue.textContent = d_const.toFixed(1);
    eqDisplay.innerHTML = `\\( ${normal.a.toFixed(1)}x ${normal.b < 0 ? '-' : '+'} ${Math.abs(normal.b).toFixed(1)}y ${normal.c < 0 ? '-' : '+'} ${Math.abs(normal.c).toFixed(1)}z ${d_const < 0 ? '-' : '+'} ${Math.abs(d_const).toFixed(1)} = 0 \\)`;
    if (window.MathJax && window.MathJax.typeset) { window.MathJax.typeset([eqDisplay]); }
    drawPlanePatch(normal, d_const, 4, 'rgba(173, 255, 47, 0.2)');
  }
  function setupControls() { 
    [aSlider, bSlider, cSlider, dSlider].forEach(s => s.addEventListener('input', draw));
  }
  const allElementsExist = [canvas, aSlider, bSlider, cSlider, dSlider, aValue, bValue, cValue, dValue, eqDisplay].every(el => !!el);
  if(allElementsExist){ setupControls(); draw(); } else { console.error("Equação Plano: Elementos não encontrados.");}
};

// Equação da Reta
window.initEquacaoReta = function() {
  const canvas = document.getElementById('equacao-reta-espaco-canvas');
  if (!canvas || canvas.dataset.initialized) return;
  canvas.dataset.initialized = 'true';
  const ctx = canvas.getContext('2d');
  const x0Slider = document.getElementById('reta-x0'); const y0Slider = document.getElementById('reta-y0'); const z0Slider = document.getElementById('reta-z0');
  const vaSlider = document.getElementById('reta-va'); const vbSlider = document.getElementById('reta-vb'); const vcSlider = document.getElementById('reta-vc');
  const x0Val = document.getElementById('reta-x0-val'); const y0Val = document.getElementById('reta-y0-val'); const z0Val = document.getElementById('reta-z0-val');
  const vaVal = document.getElementById('reta-va-val'); const vbVal = document.getElementById('reta-vb-val'); const vcVal = document.getElementById('reta-vc-val');
  const centerX = canvas.width / 2; const centerY = canvas.height / 2; const scale = 30;

  function project3D(x,y,z) { 
    const L = 0.4; const alpha = Math.PI / 6;
    const screenX = centerX + (x - z * L * Math.cos(alpha)) * scale;
    const screenY = centerY - (y + z * L * Math.sin(alpha)) * scale;
    return { x: screenX, y: screenY };
  }
  function drawAxes() { 
    ctx.strokeStyle = '#555'; ctx.lineWidth = 1; ctx.font = "12px 'Courier New', monospace"; ctx.fillStyle = '#ADFF2F';
    const O = project3D(0,0,0);
    let Px = project3D(5,0,0); ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Px.x, Px.y); ctx.stroke(); ctx.fillText("X", Px.x + 5, Px.y);
    let Py = project3D(0,5,0); ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Py.x, Py.y); ctx.stroke(); ctx.fillText("Y", Py.x, Py.y - 5);
    let Pz = project3D(0,0,5); ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Pz.x, Pz.y); ctx.stroke(); ctx.fillText("Z", Pz.x + 5, Pz.y + 5);
  }
  function drawLineSegment3D(pStart, pEnd, color, lineWidth = 2) { 
    const start = project3D(pStart.x, pStart.y, pStart.z); const end = project3D(pEnd.x, pEnd.y, pEnd.z);
    ctx.beginPath(); ctx.moveTo(start.x, start.y); ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = color; ctx.lineWidth = lineWidth; ctx.stroke();
  }
  function draw() { 
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, canvas.width, canvas.height); drawAxes();
    const P0 = { x: parseFloat(x0Slider.value), y: parseFloat(y0Slider.value), z: parseFloat(z0Slider.value) };
    const v_dir = { x: parseFloat(vaSlider.value), y: parseFloat(vbSlider.value), z: parseFloat(vcSlider.value) };
    x0Val.textContent = P0.x.toFixed(1); y0Val.textContent = P0.y.toFixed(1); z0Val.textContent = P0.z.toFixed(1);
    vaVal.textContent = v_dir.x.toFixed(1); vbVal.textContent = v_dir.y.toFixed(1); vcVal.textContent = v_dir.z.toFixed(1);
    const tMin = -15; const tMax = 15;
    const lineStart = { x: P0.x + tMin * v_dir.x, y: P0.y + tMin * v_dir.y, z: P0.z + tMin * v_dir.z };
    const lineEnd = { x: P0.x + tMax * v_dir.x, y: P0.y + tMax * v_dir.y, z: P0.z + tMax * v_dir.z };
    drawLineSegment3D(lineStart, lineEnd, '#ADFF2F', 2);
    const projP0 = project3D(P0.x, P0.y, P0.z);
    ctx.beginPath(); ctx.arc(projP0.x, projP0.y, 5, 0, 2 * Math.PI); ctx.fillStyle = '#FFD700'; ctx.fill();
    const v_end = {x: P0.x + v_dir.x*2, y: P0.y + v_dir.y*2, z: P0.z + v_dir.z*2};
    drawLineSegment3D(P0, v_end, 'rgba(255,100,70,0.7)', 1); 
  }
  function setupControls() { 
    [x0Slider, y0Slider, z0Slider, vaSlider, vbSlider, vcSlider].forEach(s => s.addEventListener('input', draw));
  }
  const allElementsExist = [canvas, x0Slider, y0Slider, z0Slider, vaSlider, vbSlider, vcSlider, x0Val, y0Val, z0Val, vaVal, vbVal, vcVal].every(el => !!el);
  if(allElementsExist){ setupControls(); draw(); } else { console.error("Equação Reta: Elementos não encontrados.");}
};
