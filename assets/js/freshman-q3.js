/* =========================================================================
   FRESHMAN FOUNDATIONS, QUARTER 3 — draws the page from FRESHMAN_Q3 (assets/data/freshman-q3.js).
   The four-year planner uses the course list in assets/data/courses.js (MOELLER_COURSES).
   It saves only the chosen courses (grade, course name, level) in the student's own browser.
   Nothing is ever sent anywhere. All wording lives in the data file; this file is logic only.
   ========================================================================= */
(function(){
  'use strict';
  const D = FRESHMAN_Q3;
  const root = document.getElementById('fq-root');
  if(!root || !D) return;
  const esc = escapeHtml;
  const escA = t => esc(t).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const fmt = (t, o) => Object.keys(o).reduce((s, k) => s.split('{' + k + '}').join(o[k]), t);

  const stageEl = document.getElementById('fq-stage'); if(stageEl) stageEl.textContent = D.stage;
  const titleEl = document.getElementById('fq-title'); if(titleEl) titleEl.textContent = D.title;
  const backEl = document.getElementById('fq-back'); if(backEl){ backEl.textContent = D.back.text; backEl.href = D.back.href; }
  const footEl = document.getElementById('fq-footer');
  if(footEl) footEl.innerHTML = '<a href="' + escA(D.footerBack.href) + '">' + esc(D.footerBack.text) + '</a>';

  const Y = D.yearAhead, P = D.planner, PH = D.placeholders;

  /* ---------- course list (parsed strictly; bad lines are skipped) ---------- */
  const CATALOG = [], BYNAME = {}, DEPTS = [];
  try{
    String(typeof MOELLER_COURSES === 'string' ? MOELLER_COURSES : '').split('\n').forEach(line => {
      const p = line.split('|');
      if(p.length !== 4) return;
      const dept = p[0].trim(), name = p[1].trim();
      const levels = p[2].split(',').map(s => s.trim()).filter(Boolean);
      const cents = Math.round(parseFloat(p[3]) * 100);
      if(!dept || !name || !levels.length || !(cents > 0) || BYNAME[name]) return;
      const c = {dept: dept, name: name, levels: levels, cents: cents};
      CATALOG.push(c); BYNAME[name] = c;
      if(DEPTS.indexOf(dept) < 0) DEPTS.push(dept);
    });
  }catch(e){}

  /* credits are held in hundredths so 0.25 and 0.5 add up with no float artifacts */
  const credText = cents => { const v = cents / 100; return String(Math.round(v * 100) / 100); };
  const credLabel = cents => credText(cents) + ' ' + (cents === 100 ? P.creditWord : P.creditsWord);
  const levelTitle = l => Object.prototype.hasOwnProperty.call(P.levels, l) ? P.levels[l] : l;
  const levelOpt = l => Object.prototype.hasOwnProperty.call(P.levels, l) ? l + ' (' + P.levels[l] + ')' : l;
  const gradeOf = id => P.grades.filter(g => g.id === id)[0];

  /* ---------- state: {grade id: [{name, level}]} ---------- */
  let plan = {};
  P.grades.forEach(g => { plan[g.id] = []; });
  let storageOK = true;
  const STORE_VERSION = 1;
  function load(){
    try{
      const raw = localStorage.getItem(P.key);
      if(raw){
        const o = JSON.parse(raw);
        if(o && o.v === STORE_VERSION && Array.isArray(o.courses)){
          o.courses.forEach(e => {
            if(!e || typeof e.name !== 'string' || typeof e.level !== 'string' || typeof e.grade !== 'string') return;
            const c = Object.prototype.hasOwnProperty.call(BYNAME, e.name) ? BYNAME[e.name] : null;
            if(!c || c.levels.indexOf(e.level) < 0 || !plan[e.grade]) return;
            if(plan[e.grade].some(x => x.name === e.name)) return;
            plan[e.grade].push({name: e.name, level: e.level});
          });
        }
      }
      localStorage.setItem(P.key + '-probe', '1'); localStorage.removeItem(P.key + '-probe');
    }catch(e){ storageOK = false; }
  }
  function persist(){
    const courses = [];
    P.grades.forEach(g => plan[g.id].forEach(x => courses.push({grade: g.id, name: x.name, level: x.level})));
    try{ localStorage.setItem(P.key, JSON.stringify({v: STORE_VERSION, courses: courses})); return true; }
    catch(e){ storageOK = false; return false; }
  }

  /* ---------- markup ---------- */
  const yearHtml = '<section class="fq-sec" id="year"><h2>' + esc(Y.title) + '</h2><ol class="fq-quarters">' +
    Y.quarters.map((q, i) => '<li class="fq-q' + (i === Y.current ? ' is-now' : '') + '"' + (i === Y.current ? ' aria-current="step"' : '') + '>' +
      (i === Y.current ? '<span class="fq-now">' + esc(Y.youAreHere) + '</span>' : '') +
      '<strong>' + esc(q.label) + '</strong><span>' + esc(q.text) + '</span></li>').join('') + '</ol></section>';

  const noteHtml = '<div class="fq3-note" role="note"><strong>' + esc(D.planningOnlyLabel) + '</strong><p>' + esc(D.planningOnly) + '</p></div>';

  const panelHtml = g =>
    '<section class="fq3-panel" aria-labelledby="fq3-h-' + escA(g.id) + '" data-grade="' + escA(g.id) + '">' +
    '<h3 id="fq3-h-' + escA(g.id) + '">' + esc(g.label) + '</h3>' +
    '<div class="fq3-add">' +
      '<div class="fq-field"><label class="tool-label" for="fq3-d-' + escA(g.id) + '">' + esc(P.deptLabel) + '</label>' +
        '<select class="tool-select fq3-sel" id="fq3-d-' + escA(g.id) + '" data-role="dept"><option value="">' + esc(P.deptPlaceholder) + '</option>' +
        DEPTS.map(d => '<option value="' + escA(d) + '">' + esc(d) + '</option>').join('') + '</select></div>' +
      '<div class="fq-field"><label class="tool-label" for="fq3-c-' + escA(g.id) + '">' + esc(P.courseLabel) + '</label>' +
        '<select class="tool-select fq3-sel" id="fq3-c-' + escA(g.id) + '" data-role="course" disabled><option value="">' + esc(P.coursePlaceholder) + '</option></select></div>' +
      '<div class="fq-field" data-role="levelwrap" hidden><label class="tool-label" for="fq3-l-' + escA(g.id) + '">' + esc(P.levelLabel) + '</label>' +
        '<select class="tool-select fq3-sel" id="fq3-l-' + escA(g.id) + '" data-role="level"></select></div>' +
      '<button type="button" class="tool-btn" data-role="add">' + esc(P.add) + '</button>' +
    '</div>' +
    '<ul class="fq3-list" data-role="list"></ul>' +
    '<p class="fq3-year" data-role="year"></p></section>';

  const plannerHtml = '<section class="fq-sec" id="planner"><h2>' + esc(P.title) + '</h2>' + noteHtml +
    '<p>' + esc(P.intro) + '</p>' +
    (CATALOG.length ? '<div class="fq3-grid">' + P.grades.map(panelHtml).join('') + '</div>' +
      '<p class="fq3-total" id="fq3-total"></p>' +
      '<div class="fq-foot"><button type="button" class="tool-btn" id="fq3-print">' + esc(P.print) + '</button>' +
      '<span id="fq3-clearwrap"><button type="button" class="tool-btn secondary" id="fq3-clear">' + esc(P.clear) + '</button></span>' +
      '<span class="fq-status" id="fq3-status" role="status" aria-live="polite"></span></div>' +
      '<p class="fq-privacy">' + esc(P.privacy) + '</p><div class="fq-sheet" id="fq-sheet"></div>'
    : '<p class="fq-status is-warn">' + esc(P.unavailable) + '</p>') + '</section>';

  const phHtml = PH.sections.map(s =>
    '<section class="fq-sec fq3-ph" id="' + escA(s.id) + '" aria-labelledby="fq3-ph-' + escA(s.id) + '">' +
    '<span class="fq3-badge">' + esc(PH.badge) + '</span><h2 id="fq3-ph-' + escA(s.id) + '">' + esc(s.title) + '</h2>' +
    '<p>' + esc(PH.line) + '</p></section>').join('');

  root.innerHTML = yearHtml + plannerHtml + '<div class="fq3-phs">' + phHtml + '</div>';
  if(!CATALOG.length) return;

  /* ---------- behavior ---------- */
  const statusEl = document.getElementById('fq3-status');
  let flash = '';
  const status = msg => {
    if(!storageOK){ statusEl.classList.add('is-warn'); statusEl.textContent = P.blocked; return; }
    statusEl.classList.remove('is-warn'); statusEl.textContent = msg || '';
  };
  const sum = list => list.reduce((n, x) => n + BYNAME[x.name].cents, 0);

  function render(){
    let total = 0;
    P.grades.forEach(g => {
      const panel = root.querySelector('.fq3-panel[data-grade="' + g.id + '"]');
      const list = plan[g.id], yc = sum(list); total += yc;
      const ul = panel.querySelector('[data-role="list"]');
      ul.innerHTML = list.length ? list.map((x, i) => {
        const c = BYNAME[x.name];
        return '<li class="fq3-item"><span class="fq3-name">' + esc(x.name) + '</span>' +
          '<span class="fq3-chip" title="' + escA(levelTitle(x.level)) + '">' + esc(x.level) + '</span>' +
          '<span class="fq3-cr">' + esc(credLabel(c.cents)) + '</span>' +
          '<button type="button" class="tool-btn secondary fq3-rm" data-i="' + i + '" aria-label="' + escA(fmt(P.removeLabel, {course: x.name, grade: g.label})) + '">' + esc(P.remove) + '</button></li>';
      }).join('') : '<li class="fq3-empty">' + esc(P.empty) + '</li>';
      panel.querySelector('[data-role="year"]').innerHTML = esc(P.yearTotal) + ': <strong>' + esc(credText(yc)) + '</strong>';
    });
    document.getElementById('fq3-total').innerHTML = esc(P.allTotal) + ': <strong>' + esc(credText(total)) + '</strong>';
  }
  function save(msg){ const ok = persist(); status(ok ? P.saved : ''); if(ok && msg) statusEl.textContent = msg + ' ' + P.saved; }

  P.grades.forEach(g => {
    const panel = root.querySelector('.fq3-panel[data-grade="' + g.id + '"]');
    const dSel = panel.querySelector('[data-role="dept"]'), cSel = panel.querySelector('[data-role="course"]');
    const lSel = panel.querySelector('[data-role="level"]'), lWrap = panel.querySelector('[data-role="levelwrap"]');
    dSel.addEventListener('change', () => {
      const d = dSel.value;
      cSel.innerHTML = '<option value="">' + esc(P.coursePlaceholder) + '</option>' +
        CATALOG.filter(c => c.dept === d).map(c => '<option value="' + escA(c.name) + '">' + esc(c.name) + '</option>').join('');
      cSel.disabled = !d; lWrap.hidden = true; lSel.innerHTML = '';
    });
    cSel.addEventListener('change', () => {
      const c = Object.prototype.hasOwnProperty.call(BYNAME, cSel.value) ? BYNAME[cSel.value] : null;
      if(c && c.levels.length > 1){
        lSel.innerHTML = c.levels.map(l => '<option value="' + escA(l) + '">' + esc(levelOpt(l)) + '</option>').join('');
        lWrap.hidden = false;
      } else { lWrap.hidden = true; lSel.innerHTML = ''; }
    });
    panel.querySelector('[data-role="add"]').addEventListener('click', () => {
      const c = Object.prototype.hasOwnProperty.call(BYNAME, cSel.value) ? BYNAME[cSel.value] : null;
      if(!c){ statusEl.classList.remove('is-warn'); statusEl.textContent = P.addNeedsCourse; return; }
      if(plan[g.id].some(x => x.name === c.name)){ statusEl.classList.remove('is-warn'); statusEl.textContent = fmt(P.duplicate, {course: c.name, grade: g.label}); return; }
      const level = c.levels.length > 1 ? lSel.value : c.levels[0];
      plan[g.id].push({name: c.name, level: c.levels.indexOf(level) < 0 ? c.levels[0] : level});
      render(); save(fmt(P.added, {course: c.name}));
      cSel.value = ''; lWrap.hidden = true; lSel.innerHTML = '';
      cSel.focus();
    });
    panel.querySelector('[data-role="list"]').addEventListener('click', e => {
      const b = e.target.closest('.fq3-rm'); if(!b) return;
      const i = +b.dataset.i, x = plan[g.id][i]; if(!x) return;
      plan[g.id].splice(i, 1); render(); save(fmt(P.removed, {course: x.name}));
      const next = panel.querySelectorAll('.fq3-rm')[Math.min(i, plan[g.id].length - 1)];
      (next || panel.querySelector('[data-role="dept"]')).focus();
    });
  });

  /* clear planner: inline two-step confirm */
  const clearWrap = document.getElementById('fq3-clearwrap');
  function clearIdle(focus){
    clearWrap.innerHTML = '<button type="button" class="tool-btn secondary" id="fq3-clear">' + esc(P.clear) + '</button>';
    const b = document.getElementById('fq3-clear'); b.addEventListener('click', clearAsk); if(focus) b.focus();
  }
  function clearAsk(){
    clearWrap.innerHTML = '<span class="fq3-confirm" role="group" aria-label="' + escA(P.clearAsk) + '"><span>' + esc(P.clearAsk) + '</span>' +
      '<button type="button" class="tool-btn" id="fq3-yes">' + esc(P.clearYes) + '</button>' +
      '<button type="button" class="tool-btn secondary" id="fq3-no">' + esc(P.clearNo) + '</button></span>';
    document.getElementById('fq3-no').addEventListener('click', () => clearIdle(true));
    document.getElementById('fq3-yes').addEventListener('click', () => {
      P.grades.forEach(g => { plan[g.id] = []; });
      render(); save(P.cleared); clearIdle(true);
    });
    document.getElementById('fq3-no').focus();
  }
  document.getElementById('fq3-clear').addEventListener('click', clearAsk);

  /* print sheet: title, per-grade lists, totals, and the planning-only sentence */
  document.getElementById('fq3-print').addEventListener('click', () => {
    const sheet = document.getElementById('fq-sheet');
    let total = 0;
    sheet.innerHTML = '<h2>' + esc(P.printTitle) + '</h2><p class="fq3-ps">' + esc(D.planningOnly) + '</p>' +
      P.grades.map(g => {
        const list = plan[g.id], yc = sum(list); total += yc;
        return '<h3>' + esc(g.label) + '</h3>' + (list.length ? '<ul>' + list.map(x =>
          '<li>' + esc(x.name) + ' (' + esc(x.level) + '), ' + esc(credLabel(BYNAME[x.name].cents)) + '</li>').join('') + '</ul>' : '<p>' + esc(P.printEmpty) + '</p>') +
          '<p><strong>' + esc(P.yearTotal) + ': ' + esc(credText(yc)) + '</strong></p>';
      }).join('') +
      '<h3>' + esc(P.printTotal) + ': ' + esc(credText(total)) + '</h3>';
    document.body.classList.add('fq-printing'); root.classList.add('fq-print-target');
    const done = () => { document.body.classList.remove('fq-printing'); root.classList.remove('fq-print-target'); sheet.innerHTML = ''; window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    window.print();
  });

  load(); render();
  if(!storageOK) status('');
})();
