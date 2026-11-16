/* Ayusatva premium imagery: deliberately subtle depth without WebGL mesh/glitches. */
(() => {
  'use strict';
  const motionDisabled = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (motionDisabled || !finePointer) return;
  document.querySelectorAll('[data-premium-tilt]').forEach(card => {
    const photo = card.querySelector('.therapy-card-media img');
    let raf = 0;
    let active = false;
    let x = 0, y = 0;
    const update = () => {
      raf = 0;
      if (!active) return;
      const bounds = card.getBoundingClientRect();
      const nx = Math.max(-.5,Math.min(.5,(x-bounds.left)/bounds.width-.5));
      const ny = Math.max(-.5,Math.min(.5,(y-bounds.top)/bounds.height-.5));
      card.style.setProperty('--premium-rotate-y',`${(nx*5).toFixed(2)}deg`);
      card.style.setProperty('--premium-rotate-x',`${(-ny*4).toFixed(2)}deg`);
      photo?.style.setProperty('--premium-pan-x',`${(-nx*7).toFixed(1)}px`);
      photo?.style.setProperty('--premium-pan-y',`${(-ny*6).toFixed(1)}px`);
    };
    card.addEventListener('pointerenter',e => {if(e.pointerType!=='mouse')return;active=true;x=e.clientX;y=e.clientY;if(!raf)raf=requestAnimationFrame(update)});
    card.addEventListener('pointermove',e => {if(e.pointerType!=='mouse')return;active=true;x=e.clientX;y=e.clientY;if(!raf)raf=requestAnimationFrame(update)});
    card.addEventListener('pointerleave',() => {active=false;if(raf)cancelAnimationFrame(raf);raf=0;card.style.removeProperty('--premium-rotate-x');card.style.removeProperty('--premium-rotate-y');photo?.style.removeProperty('--premium-pan-x');photo?.style.removeProperty('--premium-pan-y')});
  });
})();
