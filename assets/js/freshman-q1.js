/* =========================================================================
   FRESHMAN FOUNDATIONS, QUARTER 1 — draws the page from FRESHMAN_Q1 (assets/data/freshman-q1.js).
   The "720 Days" reflection saves only in the student's own browser. Nothing is ever sent anywhere.
   All wording lives in the data file; this file is logic only.
   ========================================================================= */
(function(){
  'use strict';
  const D = FRESHMAN_Q1;
  const root = document.getElementById('fq-root');
  if(!root || !D) return;
  const esc = escapeHtml;
  const md = t => esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  const ul = items => '<ul>' + items.map(i => '<li>' + md(i) + '</li>').join('') + '</ul>';

  const stageEl = document.getElementById('fq-stage'); if(stageEl) stageEl.textContent = D.stage;
  const titleEl = document.getElementById('fq-title'); if(titleEl) titleEl.textContent = D.title;
  const backEl = document.getElementById('fq-back'); if(backEl){ backEl.textContent = D.back.text; backEl.href = D.back.href; }
  const footEl = document.getElementById('fq-footer');
  if(footEl) footEl.innerHTML = '<a href="' + esc(D.footerBack.href) + '">' + esc(D.footerBack.text) + '</a>';

  /* ---------- sections ---------- */
  const Y = D.yearAhead, R = D.days720, S = D.study, M = D.myths, Q = D.quiz, RS = D.resources;

  const yearHtml = '<section class="fq-sec" id="year"><h2>' + esc(Y.title) + '</h2><ol class="fq-quarters">' +
    Y.quarters.map((q, i) => '<li class="fq-q' + (i === Y.current ? ' is-now' : '') + '"' + (i === Y.current ? ' aria-current="step"' : '') + '>' +
      (i === Y.current ? '<span class="fq-now">' + esc(Y.youAreHere) + '</span>' : '') +
      '<strong>' + esc(q.label) + '</strong><span>' + esc(q.text) + '</span></li>').join('') + '</ol></section>';

  const daysHtml = '<section class="fq-sec" id="720-days"><h2>' + esc(R.title) + '</h2>' +
    '<p class="fq-prompt">' + esc(R.prompt) + '</p><div class="fq-fields">' +
    R.fields.map(f => '<div class="fq-field"><label class="tool-label" for="fq-' + f.id + '">' + esc(f.label) + '</label>' +
      '<textarea class="tool-textarea" id="fq-' + f.id + '" rows="3" placeholder="' + esc(R.placeholder) + '" data-f="' + f.id + '"></textarea></div>').join('') +
    '</div><div class="fq-foot"><button type="button" class="tool-btn" id="fq-print">' + esc(R.print) + '</button>' +
    '<span class="fq-status" id="fq-status" role="status" aria-live="polite"></span></div>' +
    '<p class="fq-privacy">' + esc(R.privacy) + '</p><div class="fq-sheet" id="fq-sheet"></div></section>';

  const houses = (typeof COUNSELORS !== 'undefined' ? COUNSELORS : []).filter(c => /house/i.test(c.role));
  const resHtml = '<section class="fq-sec" id="resources"><h2>' + esc(RS.title) + '</h2><p>' + esc(RS.intro) + '</p>' +
    '<h3>' + esc(RS.counselorsTitle) + '</h3><p class="fq-hint">' + esc(RS.counselorsNote) + '</p><div class="panel-grid fq-houses">' +
    houses.map(c => '<div class="panel-card">' +
      (c.crest ? '<div class="crest-wrap' + (c.crestBoxed ? ' boxed' : '') + '"><img src="' + esc(c.crest) + '" alt="' + esc(c.role) + ' crest"></div>' : '') +
      '<div class="role">' + esc(c.role) + '</div><div class="name">' + esc(c.name) + '</div>' +
      '<div class="meta">' + (c.email ? '<div>' + esc(c.email) + '</div>' : '') + '</div></div>').join('') +
    '</div><div class="fq-links">' + RS.links.map(l => '<a class="fq-link" href="' + esc(l.href) + '"><strong>' + esc(l.text) + '</strong><span>' + esc(l.desc) + '</span></a>').join('') + '</div></section>';

  const cardHtml = c => '<div class="fq-card" id="card-' + c.id + '"><h3><button type="button" class="fq-card-btn" aria-expanded="false" aria-controls="fq-p-' + c.id + '"><span>' + esc(c.title) + '</span><span class="fq-chev" aria-hidden="true"></span></button></h3>' +
    '<div class="fq-card-body" id="fq-p-' + c.id + '" hidden>' + (c.lead ? '<p>' + esc(c.lead) + '</p>' : '') +
    (c.compare ? '<ul class="fq-compare">' + c.compare.map(x => '<li><b>' + esc(x.label) + '</b>' + esc(x.text) + '</li>').join('') + '</ul>' : '') +
    '<p class="fq-strat">' + esc(c.strategiesLabel) + '</p>' + ul(c.items) +
    (c.gold ? '<div class="fq-gold"><strong>' + esc(c.gold.title) + '</strong><p>' + esc(c.gold.text) + '</p></div>' : '') + '</div></div>';

  const studyHtml = '<section class="fq-sec" id="study-skills"><h2>' + esc(S.title) + '</h2><h3 class="fq-big">' + esc(S.heading) + '</h3>' +
    '<p class="fq-question">' + esc(S.question) + '</p><p>' + esc(S.egIntro) + '</p>' + ul(S.eg) +
    '<h3>' + esc(S.realityTitle) + '</h3>' + ul(S.reality) + '<p>' + esc(S.realityClose) + '</p>' +
    '<p><a class="fq-video" href="' + esc(S.video.href) + '" target="_blank" rel="noopener noreferrer">' + esc(S.video.text) + '</a> <span class="fq-hint">' + esc(S.video.note) + '</span></p>' +
    '<h3>' + esc(S.strategiesTitle) + '</h3><div class="fq-tools"><span class="fq-hint">' + esc(S.strategiesHint) + '</span>' +
    '<button type="button" class="tool-btn secondary" id="fq-toggle-all">' + esc(S.expandAll) + '</button></div>' +
    S.cards.map(cardHtml).join('') + '</section>';

  const mythHtml = '<section class="fq-sec" id="myths"><h2>' + esc(M.title) + '</h2><p class="fq-hint">' + esc(M.hint) + '</p><div class="fq-flips">' +
    M.cards.map(c => '<button type="button" class="fq-flip" aria-pressed="false"><span class="fq-face fq-front"><b>' + esc(M.mythLabel) + '</b><span>' + esc(c.myth) + '</span><em>' + esc(M.tap) + '</em></span>' +
      '<span class="fq-face fq-back" aria-hidden="true"><b>' + esc(M.truthLabel) + '</b><span>' + esc(c.truth) + '</span><em>' + esc(M.tapBack) + '</em></span></button>').join('') +
    '</div><p class="fq-close">' + esc(M.close) + '</p></section>';

  const quizHtml = '<section class="fq-sec" id="quiz"><h2>' + esc(Q.title) + '</h2><p>' + esc(Q.intro) + '</p><div id="fq-quiz"></div></section>';

  root.innerHTML = yearHtml + daysHtml + resHtml + studyHtml + mythHtml + quizHtml;

  /* ---------- 720 Days: save on this device ---------- */
  let store = {}, storageOK = true;
  try{ const raw = localStorage.getItem(R.key); if(raw){ const o = JSON.parse(raw); if(o && typeof o === 'object') store = o; }
       localStorage.setItem(R.key + '-probe', '1'); localStorage.removeItem(R.key + '-probe'); }catch(e){ storageOK = false; }
  const statusEl = document.getElementById('fq-status');
  const setStatus = k => { statusEl.classList.toggle('is-warn', k === 'blocked'); statusEl.textContent = k === 'blocked' ? R.blocked : (k === 'saved' ? R.saved : ''); };
  if(!storageOK) setStatus('blocked');
  let timer = null;
  root.querySelectorAll('textarea[data-f]').forEach(t => {
    if(typeof store[t.dataset.f] === 'string') t.value = store[t.dataset.f];
    t.addEventListener('input', () => {
      store[t.dataset.f] = t.value;
      clearTimeout(timer);
      timer = setTimeout(() => { try{ localStorage.setItem(R.key, JSON.stringify(store)); setStatus('saved'); }catch(e){ setStatus('blocked'); } }, 400);
    });
  });
  document.getElementById('fq-print').addEventListener('click', () => {
    const sheet = document.getElementById('fq-sheet');
    sheet.innerHTML = '<h2>' + esc(R.printTitle) + '</h2><p>' + esc(R.prompt) + '</p>' +
      R.fields.map(f => '<h3>' + esc(f.label) + '</h3><p class="fq-pre">' + esc((store[f.id] || '').trim() || R.nothing) + '</p>').join('');
    document.body.classList.add('fq-printing'); root.classList.add('fq-print-target');
    const done = () => { document.body.classList.remove('fq-printing'); root.classList.remove('fq-print-target'); sheet.innerHTML = ''; window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    window.print();
  });

  /* ---------- expandable cards ---------- */
  const cards = Array.from(root.querySelectorAll('.fq-card'));
  const allBtn = document.getElementById('fq-toggle-all');
  function setCard(card, open){
    const b = card.querySelector('.fq-card-btn');
    b.setAttribute('aria-expanded', open ? 'true' : 'false');
    card.querySelector('.fq-card-body').hidden = !open;
    card.classList.toggle('is-open', open);
  }
  function syncAll(){ allBtn.textContent = cards.every(c => c.classList.contains('is-open')) ? S.collapseAll : S.expandAll; }
  cards.forEach(c => c.querySelector('.fq-card-btn').addEventListener('click', () => { setCard(c, !c.classList.contains('is-open')); syncAll(); }));
  allBtn.addEventListener('click', () => { const open = !cards.every(c => c.classList.contains('is-open')); cards.forEach(c => setCard(c, open)); syncAll(); });

  /* ---------- flip cards ---------- */
  root.querySelectorAll('.fq-flip').forEach(b => b.addEventListener('click', () => {
    const on = b.getAttribute('aria-pressed') !== 'true';
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    b.classList.toggle('is-flipped', on);
    b.querySelector('.fq-front').setAttribute('aria-hidden', on ? 'true' : 'false');
    b.querySelector('.fq-back').setAttribute('aria-hidden', on ? 'false' : 'true');
  }));

  /* ---------- quiz ---------- */
  const quizEl = document.getElementById('fq-quiz');
  let qi = 0, score = 0;
  function showQuestion(){
    const q = Q.questions[qi], total = Q.questions.length;
    quizEl.innerHTML = '<div class="fq-quiz-card"><p class="fq-count">' + esc(Q.questionLabel) + ' ' + (qi + 1) + ' ' + esc(Q.of) + ' ' + total + '</p>' +
      '<h3 class="fq-qtext" tabindex="-1">' + esc(q.q) + '</h3><div class="fq-opts">' +
      q.options.map((o, i) => '<button type="button" class="fq-opt" data-i="' + i + '">' + esc(o) + '</button>').join('') +
      '</div><div class="fq-fb" id="fq-fb" role="status" aria-live="polite"></div></div>';
    quizEl.querySelectorAll('.fq-opt').forEach(b => b.addEventListener('click', () => answer(+b.dataset.i)));
  }
  function answer(i){
    const q = Q.questions[qi], ok = i === q.answer;
    if(ok) score++;
    quizEl.querySelectorAll('.fq-opt').forEach((b, k) => {
      b.disabled = true;
      if(k === q.answer) b.classList.add('is-right');
      else if(k === i) b.classList.add('is-wrong');
    });
    const last = qi === Q.questions.length - 1;
    document.getElementById('fq-fb').innerHTML = '<p><strong>' + esc(ok ? Q.right : Q.notQuite) + '</strong> ' + esc(Q.theAnswer) + ' ' + esc(q.options[q.answer]) + '</p><p>' + esc(q.why) + '</p>' +
      '<button type="button" class="tool-btn" id="fq-next">' + esc(last ? Q.results : Q.next) + '</button>';
    const nb = document.getElementById('fq-next'); nb.focus();
    nb.addEventListener('click', () => { if(last) showResults(); else { qi++; showQuestion(); quizEl.querySelector('.fq-qtext').focus(); } });
  }
  function showResults(){
    const total = Q.questions.length;
    quizEl.innerHTML = '<div class="fq-quiz-card"><h3 class="fq-qtext" tabindex="-1">' + esc(Q.scoreLine.replace('{n}', score).replace('{total}', total)) + '</h3><p>' +
      esc(score >= 4 ? Q.scoreHigh : Q.scoreLow) + '</p><button type="button" class="tool-btn" id="fq-again">' + esc(Q.again) + '</button></div>';
    quizEl.querySelector('.fq-qtext').focus();
    document.getElementById('fq-again').addEventListener('click', () => { qi = 0; score = 0; showQuestion(); });
  }
  showQuestion();
})();
