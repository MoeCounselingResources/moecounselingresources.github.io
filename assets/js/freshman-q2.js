/* =========================================================================
   FRESHMAN FOUNDATIONS, QUARTER 2 — draws the page from FRESHMAN_Q2 (assets/data/freshman-q2.js).
   The learning reflection saves only in the student's own browser. Nothing is ever sent anywhere.
   All wording lives in the data file; this file is logic only.
   ========================================================================= */
(function(){
  'use strict';
  const D = FRESHMAN_Q2;
  const root = document.getElementById('fq-root');
  if(!root || !D) return;
  const esc = escapeHtml;
  const md = t => esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  const ul = items => '<ul>' + items.map(i => '<li>' + md(i) + '</li>').join('') + '</ul>';
  const escA = t => esc(t).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const KINDS = {core:1, add:1, range:1};
  const fmt = (t, o) => Object.keys(o).reduce((s, k) => s.split('{' + k + '}').join(o[k]), t);
  const shuffle = a => { a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  const stageEl = document.getElementById('fq-stage'); if(stageEl) stageEl.textContent = D.stage;
  const titleEl = document.getElementById('fq-title'); if(titleEl) titleEl.textContent = D.title;
  const backEl = document.getElementById('fq-back'); if(backEl){ backEl.textContent = D.back.text; backEl.href = D.back.href; }
  const footEl = document.getElementById('fq-footer');
  if(footEl) footEl.innerHTML = '<a href="' + esc(D.footerBack.href) + '">' + esc(D.footerBack.text) + '</a>';

  const Y = D.yearAhead, L = D.learn, B = D.basics, W = D.why, G = D.degrees, M = D.match, BG = D.bingo, T = D.tips, N = D.next;

  /* ---------- section markup ---------- */
  const yearHtml = '<section class="fq-sec" id="year"><h2>' + esc(Y.title) + '</h2><ol class="fq-quarters">' +
    Y.quarters.map((q, i) => '<li class="fq-q' + (i === Y.current ? ' is-now' : '') + '"' + (i === Y.current ? ' aria-current="step"' : '') + '>' +
      (i === Y.current ? '<span class="fq-now">' + esc(Y.youAreHere) + '</span>' : '') +
      '<strong>' + esc(q.label) + '</strong><span>' + esc(q.text) + '</span></li>').join('') + '</ol></section>';

  const learnHtml = '<section class="fq-sec" id="learn"><h2>' + esc(L.title) + '</h2>' +
    L.paras.map(p => '<p>' + esc(p) + '</p>').join('') +
    (L.stylesTitle ? '<h3>' + esc(L.stylesTitle) + '</h3>' : '') + '<ul class="fq2-styles">' + L.styles.map(s => '<li><b>' + esc(s.label) + '</b>' + esc(s.text) + '</li>').join('') + '</ul>' +
    '<div class="fq-gold"><strong>' + esc(L.gold.title) + '</strong><p>' + esc(L.gold.text) + '</p>' +
      (L.more ? '<p>' + esc(L.more.lead) + ' <a class="fq2-more" href="' + escA(L.more.href) + '">' + esc(L.more.text) + '</a></p>' : '') + '</div>' +
    '<p><a class="fq-video" href="' + escA(L.quiz.href) + '" target="_blank" rel="noopener noreferrer" aria-label="' + escA(L.quiz.label) + '">' + esc(L.quiz.text) + '</a> <span class="fq-hint">' + esc(L.quiz.note) + '</span></p>' +
    '<h3>' + esc(L.reflectTitle) + '</h3><div class="fq2-fields">' +
    L.fields.map(f => '<div class="fq-field"><label class="tool-label" for="fq-' + escA(f.id) + '">' + esc(f.label) + '</label>' +
      '<textarea class="tool-textarea" id="fq-' + escA(f.id) + '" rows="3" placeholder="' + escA(L.placeholder) + '" data-f="' + escA(f.id) + '"></textarea></div>').join('') +
    '</div><div class="fq-foot"><button type="button" class="tool-btn" id="fq-print">' + esc(L.print) + '</button>' +
    '<span class="fq-status" id="fq-status" role="status" aria-live="polite"></span></div>' +
    '<p class="fq-privacy">' + esc(L.privacy) + '</p><div class="fq-sheet" id="fq-sheet"></div></section>';

  const basicsHtml = '<section class="fq-sec" id="basics"><h2>' + esc(B.title) + '</h2><p class="fq-question">' + esc(B.lead) + '</p>' +
    '<h3>' + esc(B.whatTitle) + '</h3><div class="fq2-tiles">' +
    B.what.map((c, i) => '<div class="fq2-tile"><span class="fq2-num" aria-hidden="true">' + (i + 1) + '</span><strong>' + esc(c.title) + '</strong><span>' + esc(c.text) + '</span></div>').join('') + '</div></section>';

  const money = n => '$' + n.toLocaleString('en-US');
  const chartMax = Math.max.apply(null, W.earnings.rows.map(r => r.value));
  const whyHtml = '<section class="fq-sec" id="why"><h2>' + esc(W.title) + '</h2><ul class="fq2-chips">' +
    W.reasons.map(r => '<li>' + esc(r) + '</li>').join('') + '</ul>' +
    '<h3>' + esc(W.chartTitle) + '</h3><figure class="fq2-chart"><ul class="fq2-bars">' +
    W.earnings.rows.map((r, i) => '<li class="fq2-bar' + (i >= 5 ? ' is-high' : '') + '"><span class="fq2-bar-l">' + esc(r.label) + '</span>' +
      '<span class="fq2-track"><span class="fq2-fill" style="width:' + (r.value / chartMax * 100).toFixed(1) + '%"></span></span><span class="fq2-bar-v">' + money(r.value) + '</span></li>').join('') +
    '</ul><figcaption>' + esc(W.caption) + '</figcaption></figure>' +
    '<p class="fq-close">' + esc(W.money) + '</p></section>';

  const degCard = c => {
    return '<div class="fq-card" id="card-' + escA(c.id) + '"><h3><button type="button" class="fq-card-btn" aria-expanded="false" aria-controls="fq-p-' + escA(c.id) + '"><span>' + esc(c.title) + ' <small>' + esc(c.summary) + '</small></span><span class="fq-chev" aria-hidden="true"></span></button></h3>' +
      '<div class="fq-card-body" id="fq-p-' + escA(c.id) + '" hidden>' + ul(c.items) +
      (c.links ? '<p class="fq2-cl">' + c.links.map(l => '<a class="fq-video" href="' + escA(l.href) + '">' + esc(l.text) + '</a>').join(' · ') + '</p>' : '') + '</div></div>';
  };
  const tlRow = c => {
    const name = c.title.replace(' degree', '').split(':')[0];
    if(!c.segs.length) return '<li class="fq2-tr"><span class="fq2-tr-l">' + esc(name) + '</span><span class="fq2-tr-v fq-hint">' + esc(c.summary) + '</span></li>';
    const total = c.segs.reduce((n, s) => n + s.years, 0);
    const desc = c.segs.map(s => s.label).join(' + ');
    return '<li class="fq2-tr"><span class="fq2-tr-l">' + esc(name) + '</span><span class="fq2-tl" role="img" aria-label="' + escA(name + ': ' + desc) + '" style="width:' + (total / 10 * 100) + '%">' +
      c.segs.map(s => '<span class="fq2-seg is-' + (KINDS[s.kind] ? s.kind : 'core') + '" style="flex:' + (+s.years || 1) + ' 1 0"></span>').join('') + '</span><span class="fq2-tr-v">' + esc(c.summary) + '</span></li>';
  };
  const degreesHtml = '<section class="fq-sec" id="degrees"><h2>' + esc(G.title) + '</h2><p>' + esc(G.lead) + '</p>' +
    '<h3>' + esc(G.timelineTitle) + '</h3><ul class="fq2-legend" aria-hidden="true">' + G.legend.map(l => '<li><i class="fq2-seg is-' + escA(l.kind) + '"></i>' + esc(l.text) + '</li>').join('') + '</ul><p class="fq-hint">' + esc(G.scale) + '</p><ul class="fq2-timeline">' + G.cards.map(tlRow).join('') + '</ul>' +
    '<div class="fq-tools"><span class="fq-hint">' + esc(G.hint) + '</span><button type="button" class="tool-btn secondary" id="fq-toggle-all">' + esc(G.openAll) + '</button></div>' +
    G.cards.map(degCard).join('') + '</section>';

  const matchHtml = '<section class="fq-sec" id="match"><h2>' + esc(M.title) + '</h2><p>' + esc(M.intro) + '</p><div id="fq-match"></div><p class="fq-hint">' + esc(M.note) + '</p></section>';

  const bingoHtml = '<section class="fq-sec" id="bingo"><h2>' + esc(BG.title) + '</h2><p>' + esc(BG.intro) + '</p>' +
    '<div class="fq-foot"><button type="button" class="tool-btn" id="fq-make">' + esc(BG.make) + '</button><span class="fq-status" id="fq-bingo-msg" role="status" aria-live="polite"></span></div>' +
    '<div id="fq-card" class="fq2-bingo" role="group" aria-label="' + escA(BG.cardLabel) + '" hidden></div>' +
    '<h3>' + esc(BG.glossaryTitle) + '</h3><div class="fq-field"><label class="tool-label" for="fq-search">' + esc(BG.searchLabel) + '</label>' +
    '<input class="tool-input" type="search" id="fq-search" autocomplete="off" placeholder="' + escA(BG.searchPlaceholder) + '"></div>' +
    '<p class="fq-hint" id="fq-gcount" role="status" aria-live="polite"></p><dl class="fq2-gloss" id="fq-gloss"></dl></section>';

  const tipsHtml = '<section class="fq-sec" id="tips"><h2>' + esc(T.title) + '</h2><p>' + esc(T.lead) + '</p><div class="fq2-tiles">' +
    T.cards.map((c, i) => '<div class="fq2-tile"><span class="fq2-num" aria-hidden="true">' + (i + 1) + '</span><strong>' + esc(c.title) + '</strong><span>' + esc(c.text) + '</span></div>').join('') + '</div></section>';

  const nextHtml = '<section class="fq-sec" id="explore"><h2>' + esc(N.title) + '</h2><p>' + esc(N.intro) + '</p><div class="fq-links">' +
    N.links.map(l => '<a class="fq-link" href="' + escA(l.href) + '"><strong>' + esc(l.text) + '</strong><span>' + esc(l.desc) + '</span></a>').join('') + '</div></section>';

  root.innerHTML = yearHtml + learnHtml + basicsHtml + whyHtml + degreesHtml + matchHtml + bingoHtml + tipsHtml + nextHtml;

  /* ---------- reflection: save on this device + print ---------- */
  let store = {}, storageOK = true;
  try{ const raw = localStorage.getItem(L.key); if(raw){ const o = JSON.parse(raw); if(o && typeof o === 'object') store = o; }
       localStorage.setItem(L.key + '-probe', '1'); localStorage.removeItem(L.key + '-probe'); }catch(e){ storageOK = false; }
  const statusEl = document.getElementById('fq-status');
  const setStatus = k => { statusEl.classList.toggle('is-warn', k === 'blocked'); statusEl.textContent = k === 'blocked' ? L.blocked : (k === 'saved' ? L.saved : ''); };
  if(!storageOK) setStatus('blocked');
  let timer = null;
  root.querySelectorAll('textarea[data-f]').forEach(t => {
    if(typeof store[t.dataset.f] === 'string') t.value = store[t.dataset.f];
    t.addEventListener('input', () => {
      store[t.dataset.f] = t.value;
      clearTimeout(timer);
      timer = setTimeout(() => { try{ localStorage.setItem(L.key, JSON.stringify(store)); setStatus('saved'); }catch(e){ setStatus('blocked'); } }, 400);
    });
  });
  document.getElementById('fq-print').addEventListener('click', () => {
    const sheet = document.getElementById('fq-sheet');
    sheet.innerHTML = '<h2>' + esc(L.printTitle) + '</h2>' +
      L.fields.map(f => '<h3>' + esc(f.label) + '</h3><p class="fq-pre">' + esc((store[f.id] || '').trim() || L.nothing) + '</p>').join('');
    document.body.classList.add('fq-printing'); root.classList.add('fq-print-target');
    const done = () => { document.body.classList.remove('fq-printing'); root.classList.remove('fq-print-target'); sheet.innerHTML = ''; window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    window.print();
  });

  /* ---------- degree cards ---------- */
  const cards = Array.from(root.querySelectorAll('.fq-card'));
  const allBtn = document.getElementById('fq-toggle-all');
  function setCard(card, open){
    card.querySelector('.fq-card-btn').setAttribute('aria-expanded', open ? 'true' : 'false');
    card.querySelector('.fq-card-body').hidden = !open;
    card.classList.toggle('is-open', open);
  }
  const syncAll = () => { allBtn.textContent = cards.every(c => c.classList.contains('is-open')) ? G.closeAll : G.openAll; };
  cards.forEach(c => c.querySelector('.fq-card-btn').addEventListener('click', () => { setCard(c, !c.classList.contains('is-open')); syncAll(); }));
  allBtn.addEventListener('click', () => { const open = !cards.every(c => c.classList.contains('is-open')); cards.forEach(c => setCard(c, open)); syncAll(); });

  /* ---------- career match game ---------- */
  const matchEl = document.getElementById('fq-match');
  let order = shuffle(M.careers), mi = 0, mscore = 0;
  function showCareer(){
    const c = order[mi], total = order.length;
    matchEl.innerHTML = '<div class="fq-quiz-card"><p class="fq-count">' + esc(M.questionLabel) + ' ' + (mi + 1) + ' ' + esc(M.of) + ' ' + total + '</p>' +
      '<h3 class="fq-qtext" tabindex="-1">' + esc(c.name) + '</h3><p>' + esc(M.prompt) + '</p><div class="fq-opts">' +
      M.choices.map((o, i) => '<button type="button" class="fq-opt" data-i="' + i + '">' + esc(o) + '</button>').join('') +
      '</div><div class="fq-fb" id="fq-mfb" role="status" aria-live="polite"></div></div>';
    matchEl.querySelectorAll('.fq-opt').forEach(b => b.addEventListener('click', () => pick(+b.dataset.i)));
  }
  function pick(i){
    const c = order[mi], ok = i === c.answer; if(ok) mscore++;
    matchEl.querySelectorAll('.fq-opt').forEach((b, k) => { b.disabled = true; if(k === c.answer) b.classList.add('is-right'); else if(k === i) b.classList.add('is-wrong'); });
    const last = mi === order.length - 1;
    document.getElementById('fq-mfb').innerHTML = '<p><strong>' + esc(ok ? M.right : M.notQuite) + '</strong> ' + esc(M.theAnswer) + ' ' + esc(M.choices[c.answer]) + '</p><p>' + esc(c.why) + '</p>' +
      '<button type="button" class="tool-btn" id="fq-mnext">' + esc(last ? M.results : M.next) + '</button>';
    const nb = document.getElementById('fq-mnext'); nb.focus();
    nb.addEventListener('click', () => { if(last) showMatchResults(); else { mi++; showCareer(); matchEl.querySelector('.fq-qtext').focus(); } });
  }
  function showMatchResults(){
    matchEl.innerHTML = '<div class="fq-quiz-card"><h3 class="fq-qtext" tabindex="-1">' + esc(fmt(M.scoreLine, {n: mscore, total: order.length})) + '</h3><p>' +
      esc(mscore >= 8 ? M.scoreHigh : M.scoreLow) + '</p><button type="button" class="tool-btn" id="fq-magain">' + esc(M.again) + '</button></div>';
    matchEl.querySelector('.fq-qtext').focus();
    document.getElementById('fq-magain').addEventListener('click', () => { order = shuffle(M.careers); mi = 0; mscore = 0; showCareer(); });
  }
  showCareer();

  /* ---------- bingo ---------- */
  const cardEl = document.getElementById('fq-card'), makeBtn = document.getElementById('fq-make'), bmsg = document.getElementById('fq-bingo-msg');
  const LINES = [];
  for(let r = 0; r < 5; r++){ LINES.push([0,1,2,3,4].map(c => r * 5 + c)); LINES.push([0,1,2,3,4].map(c => c * 5 + r)); }
  LINES.push([0,6,12,18,24], [4,8,12,16,20]);
  let marked = new Set();
  function drawCard(terms){
    cardEl.hidden = false;
    cardEl.innerHTML = terms.map((t, i) => i === 12
      ? '<div class="fq2-cell is-free is-on" role="img" aria-label="' + escA(BG.freeLabel) + '">' + esc(BG.free) + '</div>'
      : '<button type="button" class="fq2-cell" data-i="' + i + '" aria-pressed="false">' + esc(BG.breaks[t] || t) + '</button>').join('');
    cardEl.querySelectorAll('.fq2-cell[data-i]').forEach(b => b.addEventListener('click', () => {
      const i = +b.dataset.i, on = !marked.has(i);
      if(on) marked.add(i); else marked.delete(i);
      b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
      const won = LINES.some(l => l.every(k => k === 12 || marked.has(k)));
      bmsg.textContent = won ? BG.win : '';
    }));
  }
  makeBtn.addEventListener('click', () => {
    const terms = shuffle(D.glossary.map(g => g.term)).slice(0, 24);
    terms.splice(12, 0, BG.free);
    marked = new Set(); bmsg.textContent = '';
    drawCard(terms);
    makeBtn.textContent = BG.remake;
  });

  /* ---------- glossary ---------- */
  const glossEl = document.getElementById('fq-gloss'), gcount = document.getElementById('fq-gcount'), search = document.getElementById('fq-search');
  const sorted = D.glossary.slice().sort((a, b) => a.term.localeCompare(b.term));
  function drawGloss(){
    const q = search.value.trim().toLowerCase();
    const list = q ? sorted.filter(g => g.term.toLowerCase().includes(q) || g.def.toLowerCase().includes(q)) : sorted;
    glossEl.innerHTML = list.map(g => '<div class="fq2-gi"><dt>' + esc(g.term) + '</dt><dd>' + esc(g.def) + '</dd></div>').join('') ||
      '<p class="fq-hint">' + esc(BG.none) + '</p>';
    gcount.textContent = fmt(BG.count, {n: list.length, total: sorted.length});
  }
  search.addEventListener('input', drawGloss);
  drawGloss();
})();
