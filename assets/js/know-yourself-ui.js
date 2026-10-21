/* =========================================================================
   KNOW YOURSELF — the visual layer on know-yourself.html: the step indicator, the navy hero on each exercise,
   and the phone progress bar. The page itself (index, exercises, saving) is drawn by assets/js/engine.js and
   assets/js/exercises.js; this file only adds structure around what they draw and never touches saved answers.
   Wording: the "ui" block in assets/data/know-yourself.js. Look: assets/css/know-yourself.css and assets/css/tool-pages.css.
   ========================================================================= */
(function(){
  'use strict';
  const content = document.getElementById('index-content'), nav = document.getElementById('index-nav'), wrap = document.getElementById('indexed-wrap');
  const Y = (typeof YEARS !== 'undefined' && YEARS['know-yourself']) || null;
  if(!content || !nav || !wrap || !Y || !Y.ui) return;
  const U = Y.ui;
  const fmt = (t, o) => Object.keys(o).reduce((s, k) => s.split('{' + k + '}').join(o[k]), String(t));
  const steps = () => Array.from(nav.querySelectorAll('button[data-key]'));
  const current = () => steps().findIndex(b => b.getAttribute('aria-current') === 'true');

  nav.setAttribute('aria-label', U.stepsLabel);

  /* phones: a progress bar with Back and Next replaces the step circles */
  const mobile = document.createElement('div');
  mobile.className = 'ky-mobile';
  mobile.innerHTML = '<p class="ky-mstep" id="ky-mstep"></p><div class="ky-mbar" id="ky-mbar" role="progressbar" aria-valuemin="1" aria-valuemax="1" aria-valuenow="1" aria-label="' + U.stepsLabel.replace(/"/g, '&quot;') + '"><span></span></div>' +
    '<div class="ky-mbtns"><button type="button" class="tool-btn secondary" id="ky-prev"></button><button type="button" class="tool-btn" id="ky-next"></button></div>';
  wrap.insertBefore(mobile, wrap.firstChild);
  mobile.querySelector('#ky-prev').textContent = U.back;
  mobile.querySelector('#ky-next').textContent = U.next;
  mobile.querySelector('#ky-prev').addEventListener('click', () => go(-1));
  mobile.querySelector('#ky-next').addEventListener('click', () => go(1));
  function go(d){
    const st = steps(), i = current(), to = st[i + d];
    if(to){ to.click(); const h = content.querySelector('.ky-hero h2, h2'); if(h){ h.setAttribute('tabindex', '-1'); h.focus({preventScroll:true}); } window.scrollTo({top: Math.max(0, wrap.getBoundingClientRect().top + window.pageYOffset - 70), behavior:'auto'}); }
  }

  function enhance(){
    const st = steps(), i = current(), n = st.length;
    if(i < 0) return;
    st.forEach((b, j) => { b.classList.toggle('is-before', j < i); b.setAttribute('data-n', String(j + 1)); });
    const label = st[i].textContent.trim();
    document.getElementById('ky-mstep').textContent = fmt(U.stepOf, {n: i + 1, total: n, name: label});
    const bar = document.getElementById('ky-mbar');
    bar.setAttribute('aria-valuemax', String(n)); bar.setAttribute('aria-valuenow', String(i + 1));
    bar.firstChild.style.width = ((i + 1) / n * 100) + '%';
    document.getElementById('ky-prev').disabled = i === 0;
    document.getElementById('ky-next').disabled = i === n - 1;
    if(window.TP) window.TP.progress((i + 1) / n * 100);
    // the navy hero: the exercise title and its opening paragraphs
    if(content.querySelector('.ky-hero')) return;
    const h2 = content.querySelector(':scope > h2'), body = content.querySelector('.ex-body');
    if(!h2) return;
    const hero = document.createElement('header');
    hero.className = 'ky-hero';
    const eyebrow = document.createElement('p');
    eyebrow.className = 'ky-eyebrow';
    eyebrow.textContent = fmt(U.exerciseOf, {n: i + 1, total: n});
    hero.appendChild(eyebrow); hero.appendChild(h2);
    const intro = document.createElement('div');
    intro.className = 'ky-intro';
    while(body && body.firstElementChild && body.firstElementChild.tagName === 'P') intro.appendChild(body.firstElementChild);
    if(intro.children.length) hero.appendChild(intro);
    content.insertBefore(hero, content.firstChild);
  }
  let queued = false;
  const queue = () => { if(queued) return; queued = true; setTimeout(() => { queued = false; enhance(); }, 0); };
  new MutationObserver(queue).observe(content, {childList: true});
  new MutationObserver(queue).observe(nav, {attributes: true, attributeFilter: ['aria-current'], subtree: true});
  enhance();
})();
