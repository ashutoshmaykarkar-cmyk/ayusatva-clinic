/* Kalasha: clean vector artwork with subtle pointer and keyboard 3D tilt. No WebGL, shaders, particles or procedural geometry. */
(() => {
  'use strict';
  const scene = document.getElementById('kalasha-interactive');
  if (!scene) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let holding = false;
  let start = null;
  let tiltX = 0, tiltY = 0;
  const clamp = (x, min, max) => Math.max(min, Math.min(max, x));
  function setTilt(x, y) {
    tiltX = clamp(x, -6, 6);
    tiltY = clamp(y, -8, 8);
    scene.style.setProperty('--kalasha-x', tiltX.toFixed(2) + 'deg');
    scene.style.setProperty('--kalasha-y', tiltY.toFixed(2) + 'deg');
  }
  scene.addEventListener('pointerdown', e => {
    if (e.button !== undefined && e.button !== 0) return;
    holding = true;
    start = { x: e.clientX, y: e.clientY, tiltX, tiltY };
    scene.classList.add('is-dragging');
    scene.setPointerCapture?.(e.pointerId);
  });
  scene.addEventListener('pointermove', e => {
    if (!holding || !start) return;
    setTilt(start.tiltX + (e.clientY-start.y)*-.06, start.tiltY + (e.clientX-start.x)*.07);
  });
  const release = () => { holding = false; start = null; scene.classList.remove('is-dragging'); };
  scene.addEventListener('pointerup', release);
  scene.addEventListener('pointercancel', release);
  scene.addEventListener('lostpointercapture', release);
  scene.addEventListener('keydown', e => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home'].includes(e.key)) return;
    e.preventDefault();
    if (e.key === 'Home') setTilt(0, 0);
    else if (e.key === 'ArrowLeft') setTilt(tiltX, tiltY-2);
    else if (e.key === 'ArrowRight') setTilt(tiltX, tiltY+2);
    else if (e.key === 'ArrowUp') setTilt(tiltX+2, tiltY);
    else if (e.key === 'ArrowDown') setTilt(tiltX-2, tiltY);
  });
  document.getElementById('reset-3d')?.addEventListener('click', () => { setTilt(0, 0); scene.focus({ preventScroll: true }); });
  if (reduced) scene.classList.add('no-ambient-motion');
  setTilt(0, 0);
})();
