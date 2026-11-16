/* Accessible enhancements for Ayusatva: scroll reveal, responsive tilt, tridosha explorer. */
(()=>{
  'use strict';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const data={
    vata:{name:'Vāta',dev:'वात',element:'AIR & SPACE · TRADITIONAL ASSOCIATIONS',desc:'Classically associated with movement and activity, including motion, respiration and nerve-related functions within the traditional framework.',traits:['Light','Mobile','Dry']},
    pitta:{name:'Pitta',dev:'पित्त',element:'FIRE & WATER · TRADITIONAL ASSOCIATIONS',desc:'Classically associated with transformation, heat and digestion, including the traditional concept of metabolic activity.',traits:['Warm','Sharp','Fluid']},
    kapha:{name:'Kapha',dev:'कफ',element:'WATER & EARTH · TRADITIONAL ASSOCIATIONS',desc:'Classically associated with cohesion, stability and lubrication in the body, within the Ayurvedic explanatory framework.',traits:['Heavy','Stable','Cool']}
  };
  const tabs=[...document.querySelectorAll('[data-dosha]')];
  const orb=document.getElementById('dosha-sphere');
  const panel=document.getElementById('dosha-panel');
  function choose(key,focus=false){
    const d=data[key];if(!d||!panel)return;
    for(const tab of tabs){const active=tab.dataset.dosha===key;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;if(active){panel.setAttribute('aria-labelledby',tab.id);if(focus)tab.focus();}}
    document.getElementById('dosha-name').innerHTML=`${d.name} <span lang="sa">${d.dev}</span>`;
    document.getElementById('dosha-element').textContent=d.element;
    document.getElementById('dosha-description').textContent=d.desc;
    document.getElementById('dosha-traits').replaceChildren(...d.traits.map(label=>{const e=document.createElement('span');e.textContent=label;return e;}));
    orb?.setAttribute('data-current',key);
  }
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>choose(tab.dataset.dosha));
    tab.addEventListener('keydown',e=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
      e.preventDefault();let n=e.key==='Home'?0:e.key==='End'?tabs.length-1:(index+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length;
      choose(tabs[n].dataset.dosha,true);
    });
  });
  if(reduced){document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('revealed'));return;}
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target)}}),{rootMargin:'0px 0px -30px 0px',threshold:.10});document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el));}
  else document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('revealed'));
  if(matchMedia('(hover:hover) and (pointer:fine)').matches){
    document.querySelectorAll('[data-tilt]').forEach(card=>{
      card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.setProperty('--tilt-x',`${(-y*5).toFixed(2)}deg`);card.style.setProperty('--tilt-y',`${(x*5).toFixed(2)}deg`);});
      card.addEventListener('pointerleave',()=>{card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg');});
    });
  }
})();
