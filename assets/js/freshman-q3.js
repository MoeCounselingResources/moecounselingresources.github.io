/* =========================================================================
   FRESHMAN FOUNDATIONS, QUARTER 3 — draws the page from FRESHMAN_Q3 (assets/data/freshman-q3.js).
   Registration steps, levels, and graduation requirements are read from COURSE_RULES
   (assets/data/course-rules.js), never retyped here. The checklist saves only in the student's own
   browser. Nothing is ever sent anywhere. All wording lives in the data file; this file is logic only.
   ========================================================================= */
(function(){
  'use strict';
  const D = FRESHMAN_Q3;
  const root = document.getElementById('fq-root');
  if(!root || !D) return;
  const esc = escapeHtml;
  const escA = t => esc(t).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const fmt = (t, o) => Object.keys(o).reduce((s, k) => s.split('{' + k + '}').join(o[k]), t);
  const num = n => (typeof n === 'number' && isFinite(n)) ? String(n) : '';
  const R = (typeof COURSE_RULES === 'object' && COURSE_RULES) ? COURSE_RULES : null;

  const stageEl = document.getElementById('fq-stage'); if(stageEl) stageEl.textContent = D.stage;
  const titleEl = document.getElementById('fq-title'); if(titleEl) titleEl.textContent = D.title;
  const backEl = document.getElementById('fq-back'); if(backEl){ backEl.textContent = D.back.text; backEl.href = D.back.href; }
  const footEl = document.getElementById('fq-footer');
  if(footEl) footEl.innerHTML = '<a href="' + escA(D.footerBack.href) + '">' + esc(D.footerBack.text) + '</a>';

  const Y = D.yearAhead, RG = D.registration, LV = D.levels, RQ = D.requirements, P = D.planner, C = D.checklist, K = D.links;
  const cite = page => page ? '<p class="fq-hint fq3-cite">' + esc(fmt(D.guideSource, {page: num(page)})) + '</p>' : '';
  const joinAnd = list => { list = (list || []).map(String); return list.length < 2 ? list.join('') : list.slice(0, -1).join(', ') + RQ.listAnd + list[list.length - 1]; };

  /* ---------- year ahead ---------- */
  const yearHtml = '<section class="fq-sec" id="year"><h2>' + esc(Y.title) + '</h2><ol class="fq-quarters">' +
    Y.quarters.map((q, i) => '<li class="fq-q' + (i === Y.current ? ' is-now' : '') + '"' + (i === Y.current ? ' aria-current="step"' : '') + '>' +
      (i === Y.current ? '<span class="fq-now">' + esc(Y.youAreHere) + '</span>' : '') +
      '<strong>' + esc(q.label) + '</strong><span>' + esc(q.text) + '</span></li>').join('') + '</ol></section>';

  /* ---------- 1. registration ---------- */
  let regHtml = '<section class="fq-sec" id="registration"><h2>' + esc(RG.title) + '</h2><p>' + esc(RG.lead) + '</p>';
  if(R && R.registration && Array.isArray(R.registration.steps)){
    regHtml += '<ol class="fq3-timeline" aria-label="' + escA(RG.timelineLabel) + '">' +
      RG.timeline.map(t => '<li class="fq3-tl"><strong>' + esc(t.label) + '</strong><span>' + esc(t.text) + '</span></li>').join('') + '</ol>' +
      '<h3>' + esc(RG.stepsTitle) + '</h3><ol class="fq3-steps">' +
      R.registration.steps.map(s => '<li><span class="fq3-num" aria-hidden="true"></span><span>' + esc(String(s)) + '</span></li>').join('') + '</ol>' +
      '<div class="fq-gold"><p>' + esc(RG.tip) + '</p></div>' + cite(R.registration.page);
  }else regHtml += '<p class="fq3-missing" role="status">' + esc(D.rulesMissing) + '</p>';
  regHtml += '</section>';

  /* ---------- 2. levels ---------- */
  let lvHtml = '<section class="fq-sec" id="levels"><h2>' + esc(LV.title) + '</h2><p>' + esc(LV.lead) + '</p>';
  if(R && Array.isArray(R.levels)){
    lvHtml += '<div class="fq3-levels">' + R.levels.map(l => '<div class="fq3-level"><strong>' + esc(String(l.name || l.code || '')) + '</strong><span>' + esc(String(l.plain || '')) + '</span></div>').join('') + '</div>' +
      '<p class="fq-hint fq3-cite">' + esc(LV.pageNote) + '</p>';
  }else lvHtml += '<p class="fq3-missing" role="status">' + esc(D.rulesMissing) + '</p>';
  lvHtml += '</section>';

  /* ---------- 3. requirements ---------- */
  let rqHtml = '<section class="fq-sec" id="requirements"><h2>' + esc(RQ.title) + '</h2>';
  if(R && R.minimums && typeof R.minimums === 'object'){
    const mins = R.minimums, moe = R.moeTerm || {}, rules = Array.isArray(R.rules) ? R.rules : [], py = R.perYearMin || {};
    rqHtml += '<p>' + esc(fmt(RQ.lead, {total: num(R.totalCredits)})) + '</p>' +
      '<div class="fq3-tablewrap"><table class="fq3-table"><caption>' + esc(RQ.tableCaption) + '</caption><thead><tr><th scope="col">' + esc(RQ.colSubject) + '</th><th scope="col">' + esc(RQ.colCredits) + '</th></tr></thead><tbody>' +
      Object.keys(mins).map(k => '<tr><th scope="row">' + esc(k) + '</th><td>' + esc(num(mins[k])) + '</td></tr>').join('') +
      '<tr class="fq3-total"><th scope="row">' + esc(RQ.totalRow) + '</th><td>' + esc(num(R.totalCredits)) + '</td></tr>' +
      '<tr><th scope="row">' + esc(RQ.moeTermRow) + '</th><td>' + esc(RQ.moeTermShort) + '</td></tr></tbody></table></div>' +
      (moe.note ? '<p class="fq-hint">' + esc(String(moe.note)) + '</p>' : '');
    const ruleText = r => {
      if(r.text) return esc(String(r.text));
      let t = '';
      if(Array.isArray(r.need) && r.need.length) t += fmt(RQ.ruleNeed, {list: joinAnd(r.need)});
      if(Array.isArray(r.oneOf) && r.oneOf.length) t += ' ' + fmt(RQ.ruleOneOf, {list: joinAnd(r.oneOf)});
      if(r.years) t += ' ' + fmt(RQ.ruleLang, {years: num(r.years), encouraged: num(r.encouraged)});
      return esc(t.trim());
    };
    if(rules.length) rqHtml += '<h3>' + esc(RQ.rulesTitle) + '</h3><ul class="fq3-rules">' + rules.map(r => '<li>' + ruleText(r) + '</li>').join('') + '</ul>';
    const grades = Object.keys(py);
    if(grades.length) rqHtml += '<h3>' + esc(RQ.perYearTitle) + '</h3><p>' + esc(RQ.perYearLead) + '</p><ul class="fq3-years">' +
      grades.map(g => '<li><strong>' + esc(fmt(RQ.perYearLabel, {grade: g})) + '</strong><span>' + esc(fmt(RQ.perYearValue, {n: num(py[g])})) + '</span></li>').join('') + '</ul>';
    rqHtml += '<p class="fq-hint fq3-cite">' + esc(RQ.cite) + '</p>';
  }else rqHtml += '<p class="fq3-missing" role="status">' + esc(D.rulesMissing) + '</p>';
  rqHtml += '</section>';

  /* ---------- 4. planner ---------- */
  const plHtml = '<section class="fq-sec" id="planner"><h2>' + esc(P.title) + '</h2><p>' + esc(P.lead) + '</p>' +
    '<p class="fq3-cta"><a class="fq3-big" href="' + escA(P.href) + '">' + esc(P.button) + '</a></p>' +
    '<h3>' + esc(P.howTitle) + '</h3><ol class="fq3-steps">' + P.steps.map(s => '<li><span class="fq3-num" aria-hidden="true"></span><span>' + esc(s) + '</span></li>').join('') + '</ol>' +
    '<p class="fq-hint">' + esc(P.note) + '</p></section>';

  /* ---------- 5. checklist ---------- */
  const ckHtml = '<section class="fq-sec" id="checklist"><h2>' + esc(C.title) + '</h2><p>' + esc(C.lead) + '</p>' +
    '<ul class="fq3-checks">' + C.items.map(it => '<li><label class="fq3-check"><input type="checkbox" id="fq3-c-' + escA(it.id) + '" data-c="' + escA(it.id) + '"><span class="fq3-box" aria-hidden="true"></span><span>' + esc(it.label) + '</span></label></li>').join('') + '</ul>' +
    '<p class="fq3-progress" id="fq3-progress" role="status" aria-live="polite"></p>' +
    '<div class="fq-foot"><button type="button" class="tool-btn" id="fq3-print">' + esc(C.print) + '</button>' +
    '<button type="button" class="tool-btn secondary" id="fq3-clear">' + esc(C.clear) + '</button>' +
    '<span class="fq-status" id="fq3-status" role="status" aria-live="polite"></span></div>' +
    '<p class="fq-privacy">' + esc(C.privacy) + '</p><div class="fq-sheet" id="fq-sheet"></div></section>';

  /* ---------- 6. links ---------- */
  const lkHtml = '<section class="fq-sec" id="explore"><h2>' + esc(K.title) + '</h2><p>' + esc(K.intro) + '</p><div class="fq-links">' +
    K.items.map(l => '<a class="fq-link" href="' + escA(l.href) + '"><strong>' + esc(l.text) + '</strong><span>' + esc(l.desc) + '</span></a>').join('') + '</div></section>';

  root.innerHTML = yearHtml + regHtml + lvHtml + rqHtml + plHtml + ckHtml + lkHtml;

  /* ---------- checklist: save on this device, clear, print ---------- */
  let store = {}, storageOK = true;
  try{ const raw = localStorage.getItem(C.key); if(raw){ const o = JSON.parse(raw); if(o && typeof o === 'object') store = o; }
       localStorage.setItem(C.key + '-probe', '1'); localStorage.removeItem(C.key + '-probe'); }catch(e){ storageOK = false; }
  const statusEl = document.getElementById('fq3-status'), progEl = document.getElementById('fq3-progress');
  const setStatus = k => { statusEl.classList.toggle('is-warn', k === 'blocked'); statusEl.textContent = k === 'blocked' ? C.blocked : (k === 'saved' ? C.saved : (k === 'cleared' ? C.cleared : '')); };
  if(!storageOK) setStatus('blocked');
  const boxes = Array.from(root.querySelectorAll('input[data-c]'));
  const progress = () => { const n = boxes.filter(b => b.checked).length; progEl.textContent = n === boxes.length ? C.allDone : fmt(C.progress, {n: n, total: boxes.length}); };
  const save = k => { try{ localStorage.setItem(C.key, JSON.stringify(store)); setStatus(k || 'saved'); }catch(e){ setStatus('blocked'); } };
  boxes.forEach(b => {
    b.checked = store[b.dataset.c] === true;
    b.addEventListener('change', () => { store[b.dataset.c] = b.checked; progress(); save(); });
  });
  progress();
  document.getElementById('fq3-clear').addEventListener('click', () => { store = {}; boxes.forEach(b => { b.checked = false; }); progress(); save('cleared'); });
  document.getElementById('fq3-print').addEventListener('click', () => {
    const sheet = document.getElementById('fq-sheet');
    sheet.innerHTML = '<h2>' + esc(C.printTitle) + '</h2><ul class="fq3-psheet">' +
      C.items.map(it => '<li><b>' + esc(store[it.id] === true ? C.printDone : C.printTodo) + '</b> ' + esc(it.label) + '</li>').join('') + '</ul>' +
      '<h3>' + esc(C.printNotes) + '</h3><div class="fq3-plines" aria-hidden="true"><span></span><span></span><span></span><span></span></div>';
    document.body.classList.add('fq-printing'); root.classList.add('fq-print-target');
    const done = () => { document.body.classList.remove('fq-printing'); root.classList.remove('fq-print-target'); sheet.innerHTML = ''; window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    window.print();
  });
})();
