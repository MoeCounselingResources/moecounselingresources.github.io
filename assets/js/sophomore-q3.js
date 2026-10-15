/* =========================================================================
   SOPHOMORE FUTURE FOCUS, QUARTER 3 — draws the page from SOPHOMORE_Q3 (assets/data/sophomore-q3.js).
   Nothing on this page saves: no browser storage, nothing sent anywhere. The ranking lives in memory only.
   All wording lives in the data file; this file is logic only.
   ========================================================================= */
(function(){
  'use strict';
  const D = SOPHOMORE_Q3;
  const root = document.getElementById('sq3-root');
  if(!root || !D) return;
  const esc = escapeHtml;
  const md = t => esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  const escA = t => esc(t).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const fmt = (t, o) => Object.keys(o).reduce((s, k) => s.split('{' + k + '}').join(o[k]), t);
  const shuffle = a => { a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const stageEl = document.getElementById('sq3-stage'); if(stageEl) stageEl.textContent = D.stage;
  const titleEl = document.getElementById('sq3-title'); if(titleEl) titleEl.textContent = D.title;
  const backEl = document.getElementById('sq3-back'); if(backEl){ backEl.textContent = D.back.text; backEl.href = D.back.href; }
  const footEl = document.getElementById('sq3-footer');
  if(footEl) footEl.innerHTML = '<a href="' + escA(D.footerBack.href) + '">' + esc(D.footerBack.text) + '</a>';

  const Y = D.yearAhead, I = D.important, R = D.rank, T = D.transcript, N = D.next;
  const factors = I.factors.filter(f => f && typeof f.id === 'string' && typeof f.name === 'string');
  const byId = {}; factors.forEach(f => { byId[f.id] = f; });
  const linkCards = links => '<div class="fq-links">' + links.map(l => '<a class="fq-link" href="' + escA(l.href) + '"><strong>' + esc(l.text) + '</strong><span>' + esc(l.desc) + '</span></a>').join('') + '</div>';

  /* ---------- section markup ---------- */
  const yearHtml = '<section class="fq-sec" id="year"><h2>' + esc(Y.title) + '</h2><ol class="fq-quarters">' +
    Y.quarters.map((q, i) => '<li class="fq-q' + (i === Y.current ? ' is-now' : '') + '"' + (i === Y.current ? ' aria-current="step"' : '') + '>' +
      (i === Y.current ? '<span class="fq-now">' + esc(Y.youAreHere) + '</span>' : '') +
      '<strong>' + esc(q.label) + '</strong><span>' + esc(q.text) + '</span></li>').join('') + '</ol></section>';

  const importantHtml = '<section class="fq-sec" id="important"><h2>' + esc(I.title) + '</h2>' +
    I.paras.map(p => '<p>' + md(p) + '</p>').join('') +
    '<h3>' + esc(I.factorsTitle) + '</h3><p class="fq-hint">' + esc(I.factorsLead) + '</p><ol class="sq3-factors">' +
    factors.map((f, i) => '<li class="sq3-factor"><span class="sq3-num" aria-hidden="true">' + (i + 1) + '</span><div><strong>' + esc(f.name) + '</strong><span>' + esc(f.note || '') + '</span></div></li>').join('') +
    '</ol></section>';

  const rankHtml = '<section class="fq-sec" id="rank"><h2>' + esc(R.title) + '</h2><p>' + esc(R.intro) + '</p>' +
    '<ol class="sq3-rank" id="sq3-rank" aria-label="' + escA(R.listLabel) + '"></ol>' +
    '<p class="fq-status" id="sq3-live" role="status" aria-live="polite"></p>' +
    '<div class="fq-foot"><button type="button" class="tool-btn" id="sq3-show" aria-expanded="false" aria-controls="sq3-reveal">' + esc(R.show) + '</button>' +
    '<button type="button" class="tool-btn secondary" id="sq3-reset">' + esc(R.reset) + '</button></div>' +
    '<div class="sq3-reveal" id="sq3-reveal" hidden><h3 class="sq3-reveal-title" tabindex="-1">' + esc(R.revealTitle) + '</h3>' +
    R.revealParas.map(p => '<p>' + md(p) + '</p>').join('') +
    '<p class="sq3-you" id="sq3-you"></p>' +
    '<h3>' + esc(R.reflectTitle) + '</h3><p class="fq-hint">' + esc(R.reflectLead) + '</p><ul class="sq3-prompts">' +
    R.prompts.map(p => '<li>' + esc(p) + '</li>').join('') + '</ul></div></section>';

  const transcriptHtml = '<section class="fq-sec" id="transcript"><h2>' + esc(T.title) + '</h2><p>' + esc(T.lead) + '</p>' +
    '<div class="sq3-tgrid"><div class="sq3-find"><h3>' + esc(T.findTitle) + '</h3><ol class="sq3-steps">' + T.steps.map(s => '<li>' + md(s) + '</li>').join('') + '</ol></div>' +
    '<div><h3>' + esc(T.whatTitle) + '</h3><ul class="sq3-facts">' + T.facts.map(f => '<li><b>' + esc(f.title) + '</b>' + esc(f.text) + '</li>').join('') + '</ul></div></div>' +
    '<div class="fq-gold"><strong>' + esc(T.gold.title) + '</strong><p>' + esc(T.gold.text) + '</p></div>' +
    linkCards(T.links) + '</section>';

  const nextHtml = '<section class="fq-sec" id="explore"><h2>' + esc(N.title) + '</h2><p>' + esc(N.intro) + '</p>' + linkCards(N.links) + '</section>';

  root.innerHTML = yearHtml + importantHtml + rankHtml + transcriptHtml + nextHtml;

  /* ---------- ranking activity (in memory only) ---------- */
  const listEl = document.getElementById('sq3-rank'), live = document.getElementById('sq3-live');
  const showBtn = document.getElementById('sq3-show'), resetBtn = document.getElementById('sq3-reset');
  const reveal = document.getElementById('sq3-reveal'), youEl = document.getElementById('sq3-you');
  let order = shuffle(factors.map(f => f.id));
  let dragId = null;

  function draw(){
    listEl.innerHTML = order.map((id, i) => {
      const f = byId[id], n = f.name;
      return '<li class="sq3-item" data-id="' + escA(id) + '" draggable="true">' +
        '<span class="sq3-pos"><span class="sq3-vh">' + esc(R.positionLabel) + ' </span>' + (i + 1) + '</span>' +
        '<span class="sq3-name">' + esc(n) + '</span>' +
        '<span class="sq3-ctl"><button type="button" class="sq3-btn" data-dir="-1" aria-label="' + escA(fmt(R.moveUp, {name: n})) + '"' + (i === 0 ? ' aria-disabled="true"' : '') + '><span aria-hidden="true">&#9650;</span></button>' +
        '<button type="button" class="sq3-btn" data-dir="1" aria-label="' + escA(fmt(R.moveDown, {name: n})) + '"' + (i === order.length - 1 ? ' aria-disabled="true"' : '') + '><span aria-hidden="true">&#9660;</span></button></span></li>';
    }).join('');
    if(!reveal.hidden) drawYou();
  }
  function move(id, dir){
    const from = order.indexOf(id), to = from + dir, f = byId[id];
    if(from < 0) return;
    if(to < 0){ live.textContent = fmt(R.atTop, {name: f.name}); return; }
    if(to >= order.length){ live.textContent = fmt(R.atBottom, {name: f.name}); return; }
    order.splice(from, 1); order.splice(to, 0, id);
    draw();
    const item = Array.from(listEl.querySelectorAll('.sq3-item')).find(li => li.dataset.id === id);
    if(item){
      const btn = item.querySelector('.sq3-btn[data-dir="' + dir + '"]');
      if(btn) btn.focus();
      if(!reduced){ item.classList.add('is-moved'); setTimeout(() => item.classList.remove('is-moved'), 500); }
    }
    live.textContent = fmt(R.moved, {name: f.name, pos: to + 1, total: order.length});
  }
  function moveTo(id, index){
    const from = order.indexOf(id);
    if(from < 0 || index < 0 || index >= order.length || from === index) return;
    order.splice(from, 1); order.splice(index, 0, id);
    draw();
    live.textContent = fmt(R.moved, {name: byId[id].name, pos: index + 1, total: order.length});
  }
  function drawYou(){
    const ids = (R.topIds || []).filter(id => byId[id] && order.indexOf(id) >= 0);
    if(!ids.length){ youEl.textContent = ''; return; }
    youEl.innerHTML = esc(R.revealYou) + ' ' + ids.map(id => '<b>#' + (order.indexOf(id) + 1) + '</b> (' + esc(byId[id].name) + ')').join(' ' + esc(R.revealAnd) + ' ') + '.';
    listEl.querySelectorAll('.sq3-item').forEach(li => li.classList.toggle('is-key', ids.indexOf(li.dataset.id) >= 0));
  }

  listEl.addEventListener('click', e => {
    const btn = e.target.closest('.sq3-btn'); if(!btn) return;
    const li = btn.closest('.sq3-item'); if(!li) return;
    move(li.dataset.id, +btn.dataset.dir);
  });
  listEl.addEventListener('keydown', e => {
    const li = e.target.closest('.sq3-item'); if(!li) return;
    if(!e.altKey || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return;
    e.preventDefault();
    move(li.dataset.id, e.key === 'ArrowUp' ? -1 : 1);
  });
  /* optional mouse drag; the buttons are the primary control */
  listEl.addEventListener('dragstart', e => {
    const li = e.target.closest('.sq3-item'); if(!li) return;
    dragId = li.dataset.id; li.classList.add('is-dragging');
    try{ e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', dragId); }catch(err){}
  });
  listEl.addEventListener('dragover', e => {
    const li = e.target.closest('.sq3-item'); if(!li || !dragId) return;
    e.preventDefault();
    listEl.querySelectorAll('.is-over').forEach(x => x.classList.remove('is-over'));
    if(li.dataset.id !== dragId) li.classList.add('is-over');
  });
  listEl.addEventListener('dragleave', e => { const li = e.target.closest('.sq3-item'); if(li) li.classList.remove('is-over'); });
  listEl.addEventListener('drop', e => {
    const li = e.target.closest('.sq3-item'); e.preventDefault();
    if(li && dragId && li.dataset.id !== dragId) moveTo(dragId, order.indexOf(li.dataset.id));
    dragId = null;
    listEl.querySelectorAll('.is-over, .is-dragging').forEach(x => x.classList.remove('is-over', 'is-dragging'));
  });
  listEl.addEventListener('dragend', () => { dragId = null; listEl.querySelectorAll('.is-over, .is-dragging').forEach(x => x.classList.remove('is-over', 'is-dragging')); });

  showBtn.addEventListener('click', () => {
    const open = reveal.hidden;
    reveal.hidden = !open;
    showBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    showBtn.textContent = open ? R.hide : R.show;
    if(open){ drawYou(); reveal.querySelector('.sq3-reveal-title').focus(); }
    else listEl.querySelectorAll('.is-key').forEach(x => x.classList.remove('is-key'));
  });
  resetBtn.addEventListener('click', () => {
    order = shuffle(order);
    draw();
    live.textContent = R.resetDone;
    const first = listEl.querySelector('.sq3-btn'); if(first) first.focus();
  });
  draw();
})();
