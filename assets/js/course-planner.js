/* =========================================================================
   COURSE PLANNER — draws course-planner.html from COURSE_PLANNER_TEXT (wording),
   COURSE_CATALOG (courses) and COURSE_RULES (graduation rules, sequences, pathways, programs).
   The plan saves only in the student's own browser. Nothing is ever sent anywhere.
   The one on-demand outside script is SheetJS, loaded from cdnjs only when "Download as Excel"
   is clicked (same approach as assets/js/app-tracker.js). All wording lives in the data file.
   ========================================================================= */
(function(){
  'use strict';
  const T = typeof COURSE_PLANNER_TEXT !== 'undefined' ? COURSE_PLANNER_TEXT : null;
  const root = document.getElementById('cp-root');
  if(!root || !T) return;

  /* ---------- helpers ---------- */
  const esc = s => { const d = document.createElement('div'); d.textContent = s == null ? '' : String(s); return d.innerHTML; };
  const escA = s => esc(s).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const fmt = (t, o) => Object.keys(o || {}).reduce((s, k) => s.split('{' + k + '}').join(o[k]), String(t || ''));
  const num = n => { const v = Math.round((+n || 0) * 100) / 100; return String(v); };
  const GRADES = [9, 10, 11, 12];
  const LEVEL_CLASS = {'CP2':'cp2', 'CP1 Level 1':'l1', 'CP1':'cp1', 'Honors':'h', 'Honors+':'hp', 'AP':'ap', 'CCP':'ccp', 'PF':'pf'};
  const lvClass = lv => 'cp-lv-' + (LEVEL_CLASS[lv] || 'none');
  const gradeName = g => fmt(T.grid.gradeHead, {n:g});
  const isObj = o => !!o && typeof o === 'object' && !Array.isArray(o);
  const strList = a => Array.isArray(a) ? a.filter(x => typeof x === 'string') : [];
  const numList = a => Array.isArray(a) ? a.filter(x => typeof x === 'number') : [];
  /* prereqAny / coreqAny: an array of groups (one id from each group satisfies); a flat list of ids is read as one group */
  const groupList = a => { if(!Array.isArray(a)) return []; const flat = a.filter(x => typeof x === 'string'); const groups = a.filter(Array.isArray).map(strList).filter(g => g.length); if(flat.length) groups.push(flat); return groups; };
  const titleEntry = e => isObj(e) && typeof e.title === 'string' && !e.id && !Array.isArray(e.choose) ? e.title : '';

  /* ---------- hero / footer ---------- */
  const set = (id, txt) => { const el = document.getElementById(id); if(el) el.textContent = txt; };
  set('cp-stage', T.stage); set('cp-title', T.title); set('cp-intro', T.intro);
  const backEl = document.getElementById('cp-back'); if(backEl){ backEl.textContent = T.back.text; backEl.href = T.back.href; }
  const footEl = document.getElementById('cp-footer');
  if(footEl) footEl.innerHTML = esc(T.footer) + ' <a href="' + escA(T.footerBack.href) + '">' + esc(T.footerBack.text) + '</a>';

  /* ---------- data: validate the catalog and rules against the contract ---------- */
  const RAW_CAT = typeof COURSE_CATALOG !== 'undefined' && Array.isArray(COURSE_CATALOG) ? COURSE_CATALOG : null;
  const R = typeof COURSE_RULES !== 'undefined' && isObj(COURSE_RULES) ? COURSE_RULES : null;
  if(!RAW_CAT || !R || !RAW_CAT.length){
    root.innerHTML = '<p class="cp-blocked" role="alert">' + esc(T.missingData) + '</p>';
    return;
  }
  const CAT = [], byId = Object.create(null);
  RAW_CAT.forEach(c => {
    if(!isObj(c) || typeof c.id !== 'string' || !c.id || typeof c.title !== 'string' || byId[c.id]) return;
    const course = {
      id:c.id, title:c.title, dept:typeof c.dept === 'string' ? c.dept : '', level:typeof c.level === 'string' ? c.level : '',
      credits:typeof c.credits === 'number' && c.credits >= 0 ? c.credits : 0, term:typeof c.term === 'string' ? c.term : '',
      grades:numList(c.grades), prereq:strList(c.prereq), prereqNote:typeof c.prereqNote === 'string' ? c.prereqNote : '',
      prereqAny:groupList(c.prereqAny), recommended:strList(c.recommended), coreqAny:groupList(c.coreqAny), alsoDepts:strList(c.alsoDepts), online:c.online === true,
      coreq:strList(c.coreq), counts:typeof c.counts === 'string' ? c.counts : 'Electives', countsNote:typeof c.countsNote === 'string' ? c.countsNote : '',
      language:typeof c.language === 'string' ? c.language : '', sciTag:typeof c.sciTag === 'string' ? c.sciTag : '', ssTag:typeof c.ssTag === 'string' ? c.ssTag : '',
      page:typeof c.page === 'number' ? c.page : 0
    };
    CAT.push(course); byId[course.id] = course;
  });
  const DEPTS = []; CAT.forEach(c => { if(c.dept && !DEPTS.includes(c.dept)) DEPTS.push(c.dept); });
  const ROWS = T.grid.rows.slice();
  const ROW_KEYS = ROWS.map(r => r.key);
  const OTHER = T.grid.otherRow.key;
  const rowOf = c => ROW_KEYS.includes(c.counts) ? c.counts : OTHER;
  const MIN = isObj(R.minimums) ? R.minimums : {};
  const minOf = key => typeof MIN[key] === 'number' ? MIN[key] : 0;
  const TOTAL = typeof R.totalCredits === 'number' ? R.totalCredits : 25;
  const YEAR_MIN = isObj(R.perYearMin) ? R.perYearMin : {};
  const SEQ = isObj(R.sequences) ? R.sequences : {};
  /* sequences come either as an array of tracks or as {page, note, tracks:[...]}; a track's year can hold ids or {choose:[ids], label} */
  const seqOf = kind => isObj(SEQ[kind]) && Array.isArray(SEQ[kind].tracks) ? SEQ[kind].tracks : (Array.isArray(SEQ[kind]) ? SEQ[kind] : []);
  const seqNote = kind => isObj(SEQ[kind]) && typeof SEQ[kind].note === 'string' ? SEQ[kind].note : '';
  const tracks = kind => seqOf(kind).filter(t => isObj(t) && typeof t.track === 'string');
  const trackKey = t => typeof t.id === 'string' && t.id ? t.id : t.track;
  const trackByName = (kind, name) => tracks(kind).find(t => trackKey(t) === name) || null;
  const flatIds = entries => { const out = []; (Array.isArray(entries) ? entries : []).forEach(e => { if(typeof e === 'string') out.push(e); else if(isObj(e) && Array.isArray(e.choose)) strList(e.choose).forEach(id => out.push(id)); }); return out; };
  const RULES = Array.isArray(R.rules) ? R.rules.filter(isObj) : [];
  const ruleById = id => RULES.find(r => r.id === id) || null;
  const MOE = isObj(R.moeTerm) ? R.moeTerm : {perYear:0.25, byGradYear:{}};
  const PATHS = Array.isArray(R.pathways) ? R.pathways.filter(p => isObj(p) && typeof p.id === 'string') : [];
  const PATH_NOTE = typeof R.pathwaysNote === 'string' ? R.pathwaysNote : (typeof R.pathwayNote === 'string' ? R.pathwayNote : '');
  const titleOf = ref => byId[ref] ? byId[ref].title : (typeof ref === 'string' ? ref : '');
  const levelTitle = c => (c.level && !c.title.endsWith(c.level) && c.title.indexOf(' ' + c.level + ':') < 0) ? c.title + ' ' + c.level : c.title;
  const termText = c => (T.details.terms[c.term] || c.term || T.sheet.empty) + (c.online ? ' ' + T.details.online : '');

  /* ---------- state ---------- */
  const thisYear = new Date().getFullYear();
  const YEARS = []; for(let y = 2027; y <= Math.max(2030, thisYear + 4); y++) YEARS.push(y);
  const mathTracks = tracks('math'), sciTracks = tracks('science');
  const defaultTrack = list => { const cp1 = list.find(t => t.level === 'CP1' || trackKey(t) === 'cp1' || t.track === 'CP1'); return cp1 ? trackKey(cp1) : (list[0] ? trackKey(list[0]) : ''); };
  let state = { gradYear: YEARS[Math.min(3, YEARS.length - 1)], levels:{math:defaultTrack(mathTracks), science:defaultTrack(sciTracks)}, waiver:false, courses:[] };
  let pending = [];           /* choice groups waiting for a pick: {grade, label, choose:[ids]} — not saved */
  let viewYear = 9;           /* phone view */
  let storageOK = true;
  const KEY = T.storage.key;

  function loadSaved(){
    try{ localStorage.setItem(KEY + '-probe', '1'); localStorage.removeItem(KEY + '-probe'); }catch(e){ storageOK = false; }
    let raw = null;
    try{ raw = localStorage.getItem(KEY); }catch(e){ storageOK = false; return null; }
    if(!raw) return null;
    let o = null;
    try{ o = JSON.parse(raw); }catch(e){ return null; }
    if(!isObj(o)) return null;
    let dropped = 0;
    if(typeof o.gradYear === 'number' && YEARS.includes(o.gradYear)) state.gradYear = o.gradYear;
    if(isObj(o.levels)){
      if(typeof o.levels.math === 'string' && trackByName('math', o.levels.math)) state.levels.math = o.levels.math;
      if(typeof o.levels.science === 'string' && trackByName('science', o.levels.science)) state.levels.science = o.levels.science;
    }
    state.waiver = o.waiver === true;
    if(Array.isArray(o.courses)){
      o.courses.forEach(e => {
        try{
          if(!isObj(e) || typeof e.id !== 'string' || typeof e.grade !== 'number' || !GRADES.includes(e.grade) || !byId[e.id] || e.id === '__proto__') throw new Error('bad');
          if(has(e.grade, e.id)) return;   // a repeated entry is skipped quietly
          state.courses.push({grade:e.grade, id:e.id});
        }catch(err){ dropped++; }
      });
    }
    return {n:state.courses.length, dropped};
  }
  function save(){
    if(!storageOK){ setStatus(T.storage.blocked, true); return; }
    if(!state.courses.length && !state.waiver){ try{ localStorage.removeItem(KEY); }catch(e){} return; }   // an empty plan leaves nothing behind
    try{
      localStorage.setItem(KEY, JSON.stringify({v:1, gradYear:state.gradYear, levels:{math:state.levels.math, science:state.levels.science}, waiver:state.waiver, courses:state.courses.map(c => ({grade:c.grade, id:c.id}))}));
    }catch(e){ storageOK = false; setStatus(T.storage.blocked, true); showBlocked(); }
  }
  const has = (grade, id) => state.courses.some(c => c.grade === grade && c.id === id);
  const inPlan = id => state.courses.find(c => c.id === id) || null;
  function addCourse(grade, id, quiet){
    const c = byId[id]; if(!c) return false;
    if(has(grade, id)){ if(!quiet) setStatus(fmt(T.grid.duplicate, {course:c.title, grade:gradeName(grade)})); return false; }
    state.courses.push({grade, id});
    if(!quiet) setStatus(fmt(T.grid.added, {course:c.title, grade:gradeName(grade)}));
    return true;
  }
  function removeCourse(grade, id){
    const c = byId[id];
    state.courses = state.courses.filter(x => !(x.grade === grade && x.id === id));
    if(c) setStatus(fmt(T.grid.removed, {course:c.title, grade:gradeName(grade)}));
  }

  /* ---------- status ---------- */
  let statusEl = null, blockedEl = null;
  function setStatus(msg, warn){
    if(!statusEl) return;
    statusEl.classList.toggle('is-warn', !!warn);
    statusEl.textContent = '';
    setTimeout(() => { statusEl.textContent = msg; }, 20);
  }
  function showBlocked(){ if(blockedEl) blockedEl.hidden = storageOK; }

  /* ---------- the one-page shell ---------- */
  const opt = (v, label, sel) => '<option value="' + escA(v) + '"' + (sel ? ' selected' : '') + '>' + esc(label) + '</option>';
  const trackOpts = (list, cur) => list.map(t => opt(trackKey(t), fmt(T.start.trackOption, {track:t.track}), trackKey(t) === cur)).join('');
  const S = T.start;
  root.innerHTML =
    '<div class="cp-screen">' +
    '<p class="cp-blocked" id="cp-blocked" role="alert" hidden>' + esc(T.storage.blocked) + '</p>' +
    '<div class="cp-disclaimer"><span class="cp-badge">' + esc(T.disclaimerLabel) + '</span> ' + esc(R.disclaimer || '') + '</div>' +
    '<nav class="cp-jump" aria-label="' + escA(T.jump.label) + '"><ul>' + T.jump.items.map(j => '<li><a href="#' + escA(j.id) + '">' + esc(j.text) + '</a></li>').join('') + '</ul></nav>' +

    '<section class="cp-sec" id="cp-start"><h2>' + esc(S.title) + '</h2><div class="cp-fields">' +
      '<div class="cp-field"><label class="tool-label" for="cp-year">' + esc(S.gradYearLabel) + '</label><select class="tool-select" id="cp-year">' + YEARS.map(y => opt(String(y), String(y), y === state.gradYear)).join('') + '</select></div>' +
      '<div class="cp-field"><label class="tool-label" for="cp-math">' + esc(S.mathLabel) + '</label><select class="tool-select" id="cp-math">' + trackOpts(mathTracks, state.levels.math) + '</select></div>' +
      '<div class="cp-field"><label class="tool-label" for="cp-sci">' + esc(S.scienceLabel) + '</label><select class="tool-select" id="cp-sci">' + trackOpts(sciTracks, state.levels.science) + '</select></div>' +
    '</div><div class="cp-actions"><button type="button" class="tool-btn" id="cp-typical">' + esc(S.typical) + '</button><button type="button" class="tool-btn secondary" id="cp-blank">' + esc(S.blank) + '</button></div>' +
    '<div class="cp-confirm" id="cp-start-confirm" hidden></div><p class="cp-hint">' + esc(S.typicalHint) + '</p></section>' +

    '<section class="cp-sec" id="cp-grid-sec"><h2>' + esc(T.grid.title) + '</h2><p>' + esc(T.grid.intro) + '</p>' +
      '<div class="cp-year-tabs" role="group" aria-label="' + escA(T.grid.yearTabsLabel) + '" id="cp-year-tabs">' + GRADES.map(g => '<button type="button" class="cp-ytab" data-year="' + g + '" aria-pressed="' + (g === viewYear) + '">' + esc(fmt(T.grid.yearTab, {n:g})) + '</button>').join('') + '</div>' +
      '<div class="cp-table-wrap"><table class="cp-table" id="cp-table"><thead><tr><th scope="col" class="cp-col-sub">' + esc(T.grid.subjectHead) + '</th>' +
        GRADES.map(g => '<th scope="col" class="cp-col-g" data-grade="' + g + '">' + esc(gradeName(g)) + '</th>').join('') +
        '<th scope="col" class="cp-col-min">' + esc(T.grid.minHead) + '</th><th scope="col" class="cp-col-tot">' + esc(T.grid.totalHead) + '</th></tr></thead><tbody id="cp-tbody"></tbody></table></div>' +
      '<div class="cp-foot"><button type="button" class="tool-btn" id="cp-print">' + esc(T.actions.print) + '</button><button type="button" class="tool-btn secondary" id="cp-excel">' + esc(T.actions.excel) + '</button>' +
      '<button type="button" class="tool-btn danger" id="cp-clear">' + esc(T.storage.clear) + '</button><span class="cp-status" id="cp-status" role="status" aria-live="polite"></span></div>' +
      '<div class="cp-confirm" id="cp-clear-confirm" hidden></div><p class="cp-privacy">' + esc(T.storage.privacy) + '</p></section>' +

    '<section class="cp-sec" id="cp-tracker-sec"><h2>' + esc(T.tracker.title) + '</h2><p>' + esc(T.tracker.intro) + '</p><div id="cp-tracker" aria-live="polite"></div>' +
      '<h3>' + esc(T.tracker.waiverTitle) + '</h3><div class="cp-check"><input type="checkbox" id="cp-waiver"' + (state.waiver ? ' checked' : '') + '><label for="cp-waiver">' + esc(T.tracker.waiverLabel) + '</label></div>' +
      '<div id="cp-waiver-info" hidden></div></section>' +

    '<section class="cp-sec" id="cp-conn-sec"><h2>' + esc(T.connections.title) + '</h2><p>' + esc(T.connections.intro) + '</p><div id="cp-conn" aria-live="polite"></div>' +
      '<h3>' + esc(T.connections.nextTitle) + '</h3><p class="cp-hint">' + esc(T.connections.nextIntro) + '</p><div id="cp-next"></div></section>' +

    '<section class="cp-sec" id="cp-path-sec"><h2>' + esc(T.pathways.title) + '</h2><p>' + esc(T.pathways.intro) + '</p>' +
      '<div class="cp-field cp-field-narrow"><label class="tool-label" for="cp-path">' + esc(T.pathways.pickLabel) + '</label><select class="tool-select" id="cp-path"><option value="">' + esc(T.pathways.pickPlaceholder) + '</option>' + pathOptions() + '</select></div>' +
      '<div id="cp-path-panel"></div>' +
      '<h3>' + esc(T.pathways.hubTitle) + '</h3><p class="cp-hint">' + esc(T.pathways.hubIntro) + '</p><div id="cp-hub">' + hubHtml() + '</div></section>' +

    '<section class="cp-sec" id="cp-prog-sec"><h2>' + esc(T.programs.title) + '</h2><p>' + esc(T.programs.intro) + '</p>' + programsHtml() +
      '<h3>' + esc(T.programs.levelsTitle) + '</h3>' + levelsHtml() + registrationHtml() + '</section>' +
    '</div>' +
    '<div class="cp-sheet" id="cp-sheet"></div>' +
    '<div class="cp-overlay" id="cp-overlay" hidden><div class="cp-dialog" role="dialog" aria-modal="true" aria-labelledby="cp-dialog-title" id="cp-dialog"></div></div>';

  statusEl = document.getElementById('cp-status');
  blockedEl = document.getElementById('cp-blocked');

  /* ---------- static panels ---------- */
  function pathOptions(){
    const groups = [];
    PATHS.forEach(p => { const g = typeof p.group === 'string' ? p.group : ''; if(!groups.includes(g)) groups.push(g); });
    return groups.map(g => {
      const items = PATHS.filter(p => (typeof p.group === 'string' ? p.group : '') === g).map(p => opt(p.id, p.name, false)).join('');
      return g ? '<optgroup label="' + escA(g) + '">' + items + '</optgroup>' : items;
    }).join('');
  }
  function pathKeys(yrs){
    const out = [];
    GRADES.forEach(g => { if(Array.isArray(yrs[g]) && yrs[g].length) out.push({key:String(g), grades:[g]}); });
    Object.keys(yrs).forEach(k => {
      const m = /^(\d+)-(\d+)$/.exec(k); if(!m || !Array.isArray(yrs[k]) || !yrs[k].length) return;
      const grades = GRADES.filter(g => g >= +m[1] && g <= +m[2]); if(grades.length) out.push({key:k, grades});
    });
    return out;
  }
  function hubHtml(){
    const charts = Array.isArray(R.hubCharts) ? R.hubCharts.filter(isObj) : [];
    if(!charts.length) return '';
    const P = T.pathways;
    return (typeof R.hubIntro === 'string' && R.hubIntro ? '<p>' + esc(R.hubIntro) + '</p>' : '') + charts.map(ch => {
      const nodes = (Array.isArray(ch.nodes) ? ch.nodes.filter(isObj) : []).map(n => ({key:typeof n.course === 'string' ? n.course : (typeof n.title === 'string' ? n.title : ''), name:typeof n.course === 'string' ? titleOf(n.course) : (typeof n.title === 'string' ? n.title : ''), grades:numList(n.grades), prereq:n.prereq, recommended:n.recommended, coreq:n.coreq, group:typeof n.group === 'string' ? n.group : ''})).filter(n => n.name);
      const edges = Array.isArray(ch.edges) ? ch.edges.filter(e => Array.isArray(e) && e.length >= 2) : [];
      const list = a => strList(a).map(titleOf).join(', ');
      return '<div class="cp-hubchart"><h4>' + esc(ch.title || ch.id || '') + (typeof ch.page === 'number' ? ' <span class="cp-page">' + esc(fmt(P.page, {n:ch.page})) + '</span>' : '') + '</h4><ul class="cp-hublist">' +
        nodes.map(n => {
          const leads = edges.filter(e => e[0] === n.key).map(e => titleOf(e[1]) + (e[2] === 'dashed' ? ' ' + P.hubLeadsOptional : ''));
          const bits = [];
          if(n.grades.length) bits.push(fmt(P.hubGrades, {grades:n.grades.join(', ')}));
          if(n.group) bits.push(fmt(P.hubGroup, {group:n.group}));
          bits.push(fmt(P.hubPrereq, {list:list(n.prereq) || P.hubNone}));
          if(strList(n.recommended).length) bits.push(fmt(P.hubRecommended, {list:list(n.recommended)}));
          if(strList(n.coreq).length) bits.push(fmt(P.hubCoreq, {list:list(n.coreq)}));
          bits.push(fmt(P.hubLeads, {list:leads.join(', ') || P.hubNone}));
          return '<li><strong>' + esc(n.name) + '</strong><ul>' + bits.map(b => '<li>' + esc(b) + '</li>').join('') + '</ul></li>';
        }).join('') + '</ul></div>';
    }).join('');
  }
  function programsHtml(){
    const progs = Array.isArray(R.programs) ? R.programs.filter(isObj) : [];
    return '<ul class="cp-programs">' + progs.map(p => '<li><strong>' + esc(p.title || '') + '</strong>' + (typeof p.page === 'number' ? ' <span class="cp-page">' + esc(fmt(T.programs.page, {n:p.page})) + '</span>' : '') +
      '<span>' + esc(p.summary || '') + '</span>' + (typeof p.link === 'string' && /^https:\/\//.test(p.link) ? ' <a href="' + escA(p.link) + '" target="_blank" rel="noopener noreferrer" aria-label="' + escA(T.programs.link + ': ' + (p.title || '')) + '">' + esc(T.programs.link) + '</a>' : '') + '</li>').join('') + '</ul>';
  }
  function levelsHtml(){
    const lv = Array.isArray(R.levels) ? R.levels.filter(isObj) : [];
    let h = (typeof R.levelsNote === 'string' && R.levelsNote ? '<p>' + esc(R.levelsNote) + (typeof R.levelsPage === 'number' ? ' <span class="cp-page">' + esc(fmt(T.programs.page, {n:R.levelsPage})) + '</span>' : '') + '</p>' : '') + '<dl class="cp-levels">' + lv.map(l => '<div><dt>' + (l.code ? '<span class="cp-lvtag ' + lvClass(l.code) + '">' + esc(l.code) + '</span> ' : '') + esc(l.name || '') + '</dt><dd>' + esc(l.plain || '') + '</dd></div>').join('') + '</dl>';
    if(isObj(R.apFee)) h += '<p><strong>' + esc(T.programs.apFee) + ':</strong> ' + esc(R.apFee.text || '') + (typeof R.apFee.page === 'number' ? ' <span class="cp-page">' + esc(fmt(T.programs.page, {n:R.apFee.page})) + '</span>' : '') + '</p>';
    if(isObj(R.ccp)) h += '<p><strong>' + esc(T.programs.ccp) + ':</strong> ' + esc(R.ccp.text || '') + (typeof R.ccp.page === 'number' ? ' <span class="cp-page">' + esc(fmt(T.programs.page, {n:R.ccp.page})) + '</span>' : '') + '</p>';
    return h;
  }
  function registrationHtml(){
    if(!isObj(R.registration) || !strList(R.registration.steps).length) return '';
    return '<h3>' + esc(T.programs.registrationTitle) + '</h3><ol class="cp-steps">' + strList(R.registration.steps).map(s => '<li>' + esc(s) + '</li>').join('') + '</ol>' +
      (typeof R.registration.page === 'number' ? '<p class="cp-page">' + esc(fmt(T.programs.registrationPage, {n:R.registration.page})) + '</p>' : '');
  }

  /* ---------- computing the tracker ---------- */
  function plannedCourses(){ return state.courses.map(e => ({grade:e.grade, c:byId[e.id]})).filter(x => x.c); }
  function compute(){
    const P = plannedCourses();
    const rows = {}; ROW_KEYS.concat([OTHER]).forEach(k => { rows[k] = {have:0, need:minOf(k)}; });
    const years = {}; GRADES.forEach(g => { years[g] = 0; });
    let total = 0;
    P.forEach(({grade, c}) => {
      const k = rowOf(c); rows[k].have += c.credits;
      if(c.counts !== 'None' && c.counts !== 'MoeTerm'){ total += c.credits; years[grade] += c.credits; }
    });
    const sciTags = P.map(x => x.c.sciTag).filter(Boolean), ssTags = P.map(x => x.c.ssTag).filter(Boolean);
    const sci = ruleById('scienceCore'), ss = ruleById('ssCore');
    const sciMissing = sci ? strList(sci.need).filter(t => !sciTags.includes(t)).concat(strList(sci.oneOf).length && !strList(sci.oneOf).some(t => sciTags.includes(t)) ? [strList(sci.oneOf).join(' ' + T.tracker.or + ' ')] : []) : [];
    const ssMissing = ss ? strList(ss.need).filter(t => !ssTags.includes(t)) : [];
    const mathMissing = GRADES.filter(g => !P.some(x => x.grade === g && rowOf(x.c) === 'Mathematics'));
    const langs = {}; P.forEach(({grade, c}) => { if(rowOf(c) === 'World Language' && c.language){ langs[c.language] = langs[c.language] || new Set(); langs[c.language].add(grade); } });
    let bestLang = '', bestYears = 0; Object.keys(langs).forEach(l => { if(langs[l].size > bestYears){ bestYears = langs[l].size; bestLang = l; } });
    const yearsPlanned = GRADES.filter(g => P.some(x => x.grade === g)).length;
    const per = typeof MOE.perYear === 'number' ? MOE.perYear : 0.25;
    const by = isObj(MOE.byGradYear) ? MOE.byGradYear : {};
    const moeNeed = typeof by[state.gradYear] === 'number' ? by[state.gradYear] : (typeof by.default === 'number' ? by.default : 1);
    return {rows, years, total, sciMissing, ssMissing, mathMissing, bestLang, bestYears, moe:{have:yearsPlanned * per, need:moeNeed, years:yearsPlanned, per}};
  }

  /* ---------- connections ---------- */
  function flags(){
    const out = [], keys = {}, notesOut = [];
    const C = T.connections;
    state.courses.forEach(e => {
      const c = byId[e.id]; if(!c) return;
      const key = e.grade + ':' + e.id, g = gradeName(e.grade);
      const mark = msg => { out.push(msg); keys[key] = true; };
      c.prereq.forEach(pid => {
        const p = byId[pid]; if(!p) return;
        const planned = state.courses.filter(x => x.id === pid);
        if(!planned.length) mark(fmt(C.prereqMissing, {course:levelTitle(c), grade:g, prereq:levelTitle(p)}));
        else if(!planned.some(x => x.grade < e.grade)) mark(fmt(C.prereqLate, {course:levelTitle(c), grade:g, prereq:levelTitle(p), prereqGrade:gradeName(Math.min.apply(null, planned.map(x => x.grade)))}));
      });
      c.prereqAny.forEach(group => {
        const opts = group.filter(pid => byId[pid]);
        if(opts.length && !opts.some(pid => state.courses.some(x => x.id === pid && x.grade < e.grade))){
          const names = opts.map(pid => levelTitle(byId[pid])).join(' ' + T.tracker.or + ' ');
          const anyPlanned = opts.some(pid => state.courses.some(x => x.id === pid));
          mark(fmt(anyPlanned ? C.prereqAnyLate : C.prereqAnyMissing, {course:levelTitle(c), grade:g, list:names}));
        }
      });
      if(c.grades.length && !c.grades.includes(e.grade)) mark(fmt(C.gradeOff, {course:levelTitle(c), grade:g, grades:c.grades.map(gradeName).join(', ')}));
      if(c.prereqNote) notesOut.push(fmt(C.prereqNote, {course:levelTitle(c), note:c.prereqNote}));
    });
    return {list:out, keys, notes:notesOut};
  }
  function suggestions(){
    const lines = [], seen = {};
    ['math', 'science'].forEach(kind => tracks(kind).forEach(t => {
      const yrs = isObj(t.years) ? t.years : {};
      GRADES.forEach(g => {
        if(g === 12) return;
        const here = flatIds(yrs[g]).filter(id => has(g, id));
        if(!here.length) return;
        const next = flatIds(yrs[g + 1]).filter(id => byId[id] && !inPlan(id));
        if(!next.length) return;
        here.forEach(id => {
          const k = id + '>' + g; if(seen[k]) return; seen[k] = true;
          lines.push({course:byId[id], grade:g, next:next.map(n => byId[n]), nextGrade:g + 1});
        });
      });
    }));
    return lines;
  }

  /* ---------- rendering the grid ---------- */
  function chipHtml(grade, c, flagged){
    const label = fmt(T.grid.chipLabel, {course:levelTitle(c), level:c.level || '', credits:num(c.credits) + (c.credits === 1 ? ' credit' : ' credits')});
    return '<span class="cp-chipwrap"><button type="button" class="cp-chip ' + lvClass(c.level) + '" data-act="details" data-grade="' + grade + '" data-id="' + escA(c.id) + '" aria-label="' + escA(label + (flagged ? '. ' + T.grid.flagMark : '')) + '">' +
      '<span class="cp-chip-t">' + esc(c.title) + '</span><span class="cp-chip-m">' + (c.level ? '<span class="cp-lvtag ' + lvClass(c.level) + '">' + esc(c.level) + '</span>' : '') + '<span>' + esc(num(c.credits)) + '</span>' + (flagged ? '<span class="cp-flag">' + esc(T.grid.flagMark) + '</span>' : '') + '</span></button>' +
      '<button type="button" class="cp-x" data-act="remove" data-grade="' + grade + '" data-id="' + escA(c.id) + '" aria-label="' + escA(fmt(T.grid.removeLabel, {course:levelTitle(c), grade:gradeName(grade)})) + '">×</button></span>';
  }
  function renderGrid(calc, fl){
    const tb = document.getElementById('cp-tbody');
    const showOther = state.courses.some(e => byId[e.id] && rowOf(byId[e.id]) === OTHER);
    const rows = ROWS.concat(showOther ? [T.grid.otherRow] : []);
    let h = '';
    rows.forEach(r => {
      const isPE = r.key === 'Physical Education', row = calc.rows[r.key] || {have:0, need:0};
      h += '<tr><th scope="row" class="cp-col-sub">' + esc(r.label) + '</th>';
      GRADES.forEach(g => {
        const items = state.courses.filter(e => e.grade === g && byId[e.id] && rowOf(byId[e.id]) === r.key);
        const pend = pending.filter(p => p.grade === g && p.row === r.key);
        h += '<td class="cp-col-g" data-grade="' + g + '"><span class="cp-cell-g">' + esc(gradeName(g)) + '</span><div class="cp-cell">' +
          items.map(e => chipHtml(g, byId[e.id], !!fl.keys[g + ':' + e.id])).join('') +
          pend.map(p => '<button type="button" class="cp-choose" data-act="choose" data-pend="' + escA(p.key) + '" aria-label="' + escA(fmt(T.grid.chooseLabel, {label:p.label, grade:gradeName(g)})) + '">' + esc(fmt(T.grid.choose, {label:p.label})) + '</button>').join('') +
          (isPE && state.waiver && !items.length ? '<span class="cp-waived">' + esc(T.grid.waiverCell) + '</span>' : '') +
          '<button type="button" class="cp-add" data-act="add" data-grade="' + g + '" data-row="' + escA(r.key) + '" aria-label="' + escA(fmt(T.grid.addLabel, {subject:r.label, grade:gradeName(g)})) + '">' + esc(T.grid.add) + '</button></div></td>';
      });
      const minTxt = isPE && state.waiver ? T.grid.waiverCell : (r.key === OTHER ? T.sheet.empty : num(row.need));
      h += '<td class="cp-col-min">' + esc(minTxt) + '</td><td class="cp-col-tot">' + esc(num(row.have)) + '</td></tr>';
    });
    h += '<tr class="cp-yearrow"><th scope="row" class="cp-col-sub">' + esc(T.grid.yearTotalRow) + '</th>' +
      GRADES.map(g => '<td class="cp-col-g" data-grade="' + g + '"><span class="cp-cell-g">' + esc(gradeName(g)) + '</span><strong>' + esc(num(calc.years[g])) + '</strong><span class="cp-hint"> ' + esc(fmt(T.grid.yearMin, {n:num(YEAR_MIN[g] || 0)})) + '</span></td>').join('') +
      '<td class="cp-col-min">' + esc(num(TOTAL)) + '</td><td class="cp-col-tot"><strong>' + esc(num(calc.total)) + '</strong></td></tr>';
    tb.innerHTML = h;
  }

  /* ---------- rendering the tracker ---------- */
  function renderTracker(calc){
    const K = T.tracker;
    const line = (txt, done) => '<li class="' + (done ? 'is-done' : 'is-open') + '"><span class="cp-mark">' + esc(done ? K.statusDone : K.statusOpen) + '</span> ' + esc(txt) + '</li>';
    let h = '<p class="cp-total">' + esc(fmt(calc.total >= TOTAL ? (calc.total > TOTAL ? K.totalOver : K.totalDone) : K.total, {have:num(calc.total), need:num(TOTAL)})) + '</p><ul class="cp-reqs">';
    ROWS.forEach(r => {
      const row = calc.rows[r.key];
      if(r.key === 'Physical Education' && state.waiver){ h += line(K.rowWaiver, true); return; }
      const wlRule = ruleById('worldLangSame'), wlNeed = wlRule && typeof wlRule.years === 'number' ? wlRule.years : 2;
      const done = row.have >= row.need && !(r.key === 'Science' && calc.sciMissing.length) && !(r.key === 'Social Studies' && calc.ssMissing.length) && !(r.key === 'World Language' && (calc.bestYears || 0) < wlNeed);
      let txt = fmt(done ? K.rowDone : K.row, {subject:r.label, have:num(row.have), need:num(row.need)});
      if(!done){
        const core = r.key === 'Science' ? calc.sciMissing : (r.key === 'Social Studies' ? calc.ssMissing : []);
        txt += ', ' + (core.length ? fmt(K.stillNeedList, {list:core.join(', ')}) : fmt(K.stillNeed, {n:num(row.need - row.have)}));
      }
      h += line(txt, done);
    });
    h += '</ul><h3>' + esc(K.yearsTitle) + '</h3><ul class="cp-reqs">' + GRADES.map(g => {
      const need = YEAR_MIN[g] || 0, have = calc.years[g], done = have >= need;
      return line(fmt(done ? K.yearDone : K.yearShort, {grade:gradeName(g), have:num(have), need:num(need), n:num(need - have)}), done);
    }).join('') + '</ul>' + (typeof R.classesPerSemester === 'number' ? '<p class="cp-hint">' + esc(fmt(K.classesPerSemester, {n:R.classesPerSemester})) + (typeof R.perYearMinNote === 'string' ? ' ' + esc(R.perYearMinNote) : '') + '</p>' : '');
    h += '<h3>' + esc(K.rulesTitle) + '</h3><ul class="cp-reqs">';
    const pg = id => { const r = ruleById(id); return r && typeof r.page === 'number' ? ' ' + fmt(K.rulePage, {n:r.page}) : ''; };
    h += line((calc.mathMissing.length ? fmt(K.mathEveryYear.missing, {grades:calc.mathMissing.map(gradeName).join(', ')}) : K.mathEveryYear.ok) + pg('mathEveryYear'), !calc.mathMissing.length);
    if(ruleById('scienceCore')) h += line((calc.sciMissing.length ? fmt(K.scienceCore.missing, {list:calc.sciMissing.join(', ')}) : K.scienceCore.ok) + pg('scienceCore'), !calc.sciMissing.length);
    if(ruleById('ssCore')) h += line((calc.ssMissing.length ? fmt(K.ssCore.missing, {list:calc.ssMissing.join(', ')}) : K.ssCore.ok) + pg('ssCore'), !calc.ssMissing.length);
    const wl = ruleById('worldLangSame'), need = wl && typeof wl.years === 'number' ? wl.years : 2, enc = wl && typeof wl.encouraged === 'number' ? wl.encouraged : 3;
    let wlTxt, wlOk = calc.bestYears >= need;
    if(!calc.bestYears) wlTxt = K.worldLang.none;
    else if(calc.bestYears < need) wlTxt = fmt(K.worldLang.missing, {n:calc.bestYears, lang:calc.bestLang});
    else if(calc.bestYears < enc) wlTxt = fmt(K.worldLang.encouraged, {n:calc.bestYears, lang:calc.bestLang});
    else wlTxt = fmt(K.worldLang.ok, {n:calc.bestYears, lang:calc.bestLang});
    h += line(wlTxt + pg('worldLangSame'), wlOk);
    h += '</ul><h3>' + esc(K.moeTermTitle) + '</h3><ul class="cp-reqs">';
    const m = calc.moe, mDone = m.have >= m.need;
    h += line(fmt(mDone ? K.moeTermDone : K.moeTerm, {have:num(m.have), need:num(m.need), n:m.years, per:num(m.per)}), mDone) + '</ul>' + (typeof MOE.note === 'string' && MOE.note ? '<p class="cp-hint">' + esc(MOE.note) + '</p>' : '');
    document.getElementById('cp-tracker').innerHTML = h;
    const W = isObj(R.peWaiver) ? R.peWaiver : {};
    const wi = document.getElementById('cp-waiver-info');
    wi.hidden = !state.waiver;
    wi.innerHTML = '<p>' + esc(W.text || '') + '</p>' + (strList(W.sports).length ? '<p><strong>' + esc(K.waiverSports) + '</strong></p><ul class="cp-sports">' + strList(W.sports).map(s => '<li>' + esc(s) + '</li>').join('') + '</ul>' : '') +
      (W.bandRule ? '<p>' + esc(W.bandRule) + '</p>' : '') + (W.onlyOne ? '<p>' + esc(W.onlyOne) + '</p>' : '') + (typeof W.page === 'number' ? '<p class="cp-page">' + esc(fmt(K.waiverPage, {n:W.page})) + '</p>' : '');
  }

  function renderConnections(fl){
    const C = T.connections;
    document.getElementById('cp-conn').innerHTML = (fl.list.length ? '<ul class="cp-flags">' + fl.list.map(m => '<li>' + esc(m) + '</li>').join('') + '</ul>' : '<p class="cp-ok">' + esc(C.none) + '</p>') +
      (fl.notes && fl.notes.length ? '<h3>' + esc(C.notesTitle) + '</h3><ul class="cp-notes">' + fl.notes.map(m => '<li>' + esc(m) + '</li>').join('') + '</ul>' : '');
    const sug = suggestions();
    let h = sug.length ? '<ul class="cp-next">' + sug.map(s => '<li>' + esc(fmt(C.nextLine, {course:levelTitle(s.course), grade:gradeName(s.grade), next:s.next.map(levelTitle).join(' ' + T.tracker.or + ' '), nextGrade:gradeName(s.nextGrade)})) +
      ' ' + s.next.map(n => '<button type="button" class="tool-btn secondary small" data-act="addto" data-grade="' + s.nextGrade + '" data-id="' + escA(n.id) + '" id="cp-next-' + escA(n.id) + '-' + s.nextGrade + '">' + esc(fmt(C.nextAdd, {course:levelTitle(n), grade:gradeName(s.nextGrade)})) + '</button>').join(' ') + '</li>').join('') + '</ul>' : '<p class="cp-hint">' + esc(C.nextNone) + '</p>';
    const notes = [];
    [['math', state.levels.math], ['science', state.levels.science]].forEach(([k, n]) => { const t = trackByName(k, n); if(t) strList(t.notes).forEach(x => notes.push(x)); if(t && typeof t.note === 'string' && t.note) notes.push(t.note); if(seqNote(k)) notes.push(seqNote(k)); });
    if(notes.length) h += '<p class="cp-hint"><strong>' + esc(C.sequenceNotes) + ':</strong> ' + notes.map(esc).join(' ') + '</p>';
    document.getElementById('cp-next').innerHTML = h;
  }

  /* ---------- pathway panel ---------- */
  function renderPath(){
    const sel = document.getElementById('cp-path'), panel = document.getElementById('cp-path-panel');
    const p = PATHS.find(x => x.id === sel.value);
    if(!p){ panel.innerHTML = ''; return; }
    const P = T.pathways, yrs = isObj(p.years) ? p.years : {};
    let h = '<div class="cp-path"><h3>' + esc(p.name || '') + (typeof p.page === 'number' ? ' <span class="cp-page">' + esc(fmt(P.page, {n:p.page})) + '</span>' : '') + '</h3>';
    const item = (id, grades, label) => {
      const c = byId[id];
      if(!c) return '<li>' + esc(fmt(P.unmatched, {title:id})) + '</li>';
      const planned = grades.some(g => has(g, id));
      return '<li><span>' + (label ? '<em>' + esc(label) + ':</em> ' : '') + esc(levelTitle(c)) + '</span> ' + (planned ? '<span class="cp-inplan">' + esc(T.picker.inPlan) + '</span>' :
        '<span class="cp-path-btns">' + grades.map(g => '<button type="button" class="tool-btn secondary small" data-act="addto" data-grade="' + g + '" data-id="' + escA(id) + '" id="cp-path-' + escA(id) + '-' + g + '" aria-label="' + escA(fmt(P.addOneLabel, {course:levelTitle(c), grade:gradeName(g)})) + '">' + esc(grades.length > 1 ? fmt(P.addOneTo, {grade:gradeName(g)}) : P.addOne) + '</button>').join('') + '</span>') + '</li>';
    };
    h += '<div class="cp-path-years">' + pathKeys(yrs).map(({key, grades}) => {
      const entries = Array.isArray(yrs[key]) ? yrs[key] : [];
      const title = grades.length > 1 ? (key === '11-12' ? P.juniorSenior : fmt(P.rangeLabel, {a:gradeName(grades[0]), b:gradeName(grades[grades.length - 1])})) : gradeName(grades[0]);
      const lis = [];
      entries.forEach(e => { if(typeof e === 'string') lis.push(item(e, grades, '')); else if(titleEntry(e)) lis.push('<li>' + esc(fmt(P.unmatched, {title:titleEntry(e)})) + '</li>'); else if(isObj(e) && Array.isArray(e.choose)) strList(e.choose).forEach(id => lis.push(item(id, grades, typeof e.label === 'string' ? e.label : ''))); });
      return '<div class="cp-path-year"><h4>' + esc(title) + '</h4>' + (lis.length ? '<ul>' + lis.join('') + '</ul>' : '<p class="cp-hint">' + esc(P.noCourses) + '</p>') + '</div>';
    }).join('') + '</div>';
    h += '<p><button type="button" class="tool-btn" data-act="addall" data-path="' + escA(p.id) + '" id="cp-addall">' + esc(P.addAll) + '</button></p>';
    if(strList(p.clubs).length) h += '<p><strong>' + esc(P.clubs) + ':</strong> ' + esc(strList(p.clubs).join(' · ')) + '</p>';
    if(typeof p.note === 'string' && p.note) h += '<p>' + esc(p.note) + '</p>';
    if(PATH_NOTE) h += '<p class="cp-hint">' + esc(PATH_NOTE) + '</p>';
    panel.innerHTML = h + '</div>';
  }

  /* ---------- the print sheet ---------- */
  function sheetRows(calc){
    const SH = T.sheet, out = [];
    out.push([SH.title]);
    out.push([SH.nameLine, '', '', SH.yearLine, String(state.gradYear)]);
    out.push([SH.subject].concat(GRADES.flatMap(g => [fmt(SH.gradeCol, {n:g}), fmt(SH.creditsCol, {n:g})])).concat([SH.minCol, SH.totalCol]));
    const showOther = state.courses.some(e => byId[e.id] && rowOf(byId[e.id]) === OTHER);
    ROWS.concat(showOther ? [T.grid.otherRow] : []).forEach(r => {
      const per = GRADES.map(g => state.courses.filter(e => e.grade === g && byId[e.id] && rowOf(byId[e.id]) === r.key).map(e => byId[e.id]));
      const isPE = r.key === 'Physical Education';
      const n = Math.max(1, Math.max.apply(null, per.map(a => a.length)));
      for(let i = 0; i < n; i++){
        const row = [i === 0 ? r.label : ''];
        GRADES.forEach((g, gi) => {
          const c = per[gi][i];
          if(c) row.push(levelTitle(c), c.credits);
          else row.push(i === 0 && isPE && state.waiver && gi === 0 ? SH.waiver : '', i === 0 && !per[gi].length ? 0 : '');
        });
        if(i === 0){
          const need = r.key === OTHER ? '' : (isPE ? fmt(SH.minOrWaiver, {n:num(minOf(r.key))}) : minOf(r.key));
          row.push(need, calc.rows[r.key].have);
        } else row.push('', '');
        out.push(row);
      }
    });
    out.push([SH.yearRow].concat(GRADES.flatMap(g => [fmt(SH.yearMin, {n:num(YEAR_MIN[g] || 0)}), calc.years[g]])).concat([TOTAL, calc.total]));
    out.push([SH.moeTermRow, fmt(SH.moeTermValue, {have:num(calc.moe.have), need:num(calc.moe.need)})]);
    out.push([]);
    out.push([SH.notes]);
    out.push([R.disclaimer || '']);
    RULES.forEach(r => { if(typeof r.text === 'string' && r.text) out.push([r.text]); });
    if(typeof MOE.note === 'string' && MOE.note) out.push([MOE.note]);
    const trackName = (k, key) => { const t = trackByName(k, key); return (t && (t.track || t.name)) || SH.empty; };
    out.push([fmt(SH.levels, {math:trackName('math', state.levels.math), science:trackName('science', state.levels.science)})]);
    return out;
  }
  function renderSheet(calc){
    const rows = sheetRows(calc);
    const cell = (v, tag) => '<' + tag + '>' + esc(v === '' || v == null ? '' : v) + '</' + tag + '>';
    let h = '<h2>' + esc(rows[0][0]) + '</h2><p class="cp-sheet-line">' + esc(rows[1][0]) + ' ______________________ &nbsp; ' + esc(rows[1][3]) + ' ' + esc(rows[1][4]) + '</p>';
    h += '<table class="cp-sheet-table"><thead><tr>' + rows[2].map(v => cell(v, 'th')).join('') + '</tr></thead><tbody>';
    let i = 3;
    for(; i < rows.length && rows[i].length; i++) h += '<tr>' + rows[i].map((v, k) => cell(v, k === 0 ? 'th' : 'td')).join('') + '</tr>';
    h += '</tbody></table>';
    for(i++; i < rows.length; i++) h += '<p class="cp-sheet-note">' + esc(rows[i][0] || '') + '</p>';
    document.getElementById('cp-sheet').innerHTML = h;
  }

  /* ---------- update everything ---------- */
  function update(){
    const calc = compute(), fl = flags();
    const active = document.activeElement && document.activeElement.id;
    renderGrid(calc, fl); renderTracker(calc); renderConnections(fl); renderPath(); renderSheet(calc);
    if(active){ const el = document.getElementById(active); if(el && el !== document.activeElement) el.focus(); }
    save();
  }

  /* ---------- dialog (picker and details) ---------- */
  const overlay = document.getElementById('cp-overlay'), dialog = document.getElementById('cp-dialog');
  let opener = null, openerSel = '';
  function openDialog(html){
    opener = document.activeElement;
    const d = opener && opener.dataset ? opener.dataset : {};
    openerSel = d.act ? '[data-act="' + d.act + '"]' + (d.grade ? '[data-grade="' + d.grade + '"]' : '') + (d.row ? '[data-row="' + d.row.replace(/"/g, '') + '"]' : '') + (d.id ? '[data-id="' + d.id.replace(/"/g, '') + '"]' : '') : '';
    dialog.innerHTML = html; overlay.hidden = false; document.body.classList.add('cp-modal-open');
    const first = dialog.querySelector('input, select, button');
    (dialog.querySelector('[data-autofocus]') || first || dialog).focus();
  }
  function closeDialog(){
    if(overlay.hidden) return;
    overlay.hidden = true; dialog.innerHTML = ''; document.body.classList.remove('cp-modal-open');
    if(opener && document.body.contains(opener)) opener.focus();
    else if(openerSel){ const again = root.querySelector(openerSel); if(again) again.focus(); }
    opener = null; openerSel = '';
  }
  overlay.addEventListener('click', e => { if(e.target === overlay) closeDialog(); });
  dialog.addEventListener('keydown', e => {
    if(e.key !== 'Tab') return;
    const f = Array.from(dialog.querySelectorAll('input, select, button, a[href]')).filter(x => !x.disabled && x.offsetParent !== null);
    if(!f.length) return;
    if(e.shiftKey && document.activeElement === f[0]){ e.preventDefault(); f[f.length - 1].focus(); }
    else if(!e.shiftKey && document.activeElement === f[f.length - 1]){ e.preventDefault(); f[0].focus(); }
  });

  let picker = null; /* {grade, row, only:[ids]|null, pendKey} */
  function openPicker(grade, row, pend){
    const PK = T.picker, rowLabel = (ROWS.find(r => r.key === row) || {}).label || '';
    picker = {grade, row, only:pend ? pend.choose : null, pendKey:pend ? pend.key : null, dept:'', eligible:true, q:'', onlyRow:!!row && row !== OTHER};
    const title = pend ? fmt(PK.titleChoice, {label:pend.label, grade:gradeName(grade)}) : fmt(PK.title, {grade:gradeName(grade)});
    openDialog('<h2 class="cp-dialog-title" id="cp-dialog-title">' + esc(title) + '</h2>' +
      (pend ? '' : '<div class="cp-pick-filters"><div class="cp-field"><label class="tool-label" for="cp-pk-dept">' + esc(PK.deptLabel) + '</label><select class="tool-select" id="cp-pk-dept" data-autofocus><option value="">' + esc(PK.allDepts) + '</option>' + DEPTS.map(d => opt(d, d, false)).join('') + '</select></div>' +
        '<div class="cp-field"><label class="tool-label" for="cp-pk-q">' + esc(PK.searchLabel) + '</label><input class="tool-input" type="search" id="cp-pk-q" autocomplete="off" placeholder="' + escA(PK.searchPlaceholder) + '"></div>' +
        '<div class="cp-check"><input type="checkbox" id="cp-pk-elig" checked><label for="cp-pk-elig">' + esc(fmt(PK.eligibleLabel, {grade:gradeName(grade)})) + '</label></div>' +
        (picker.onlyRow ? '<div class="cp-check"><input type="checkbox" id="cp-pk-row" checked><label for="cp-pk-row">' + esc(fmt(PK.rowOnlyLabel, {subject:rowLabel})) + '</label></div>' : '') + '</div>') +
      '<p class="cp-hint" id="cp-pk-count" role="status" aria-live="polite"></p><ul class="cp-pick-list" id="cp-pk-list"></ul><p class="cp-hint">' + esc(PK.hint) + '</p>' +
      '<p><button type="button" class="tool-btn secondary" id="cp-pk-close">' + esc(PK.close) + '</button></p>');
    renderPickList();
  }
  function renderPickList(){
    if(!picker) return;
    const PK = T.picker, list = document.getElementById('cp-pk-list'), count = document.getElementById('cp-pk-count');
    const q = picker.q.trim().toLowerCase();
    const items = CAT.filter(c => {
      if(picker.only) return picker.only.includes(c.id);
      if(picker.dept && c.dept !== picker.dept && !c.alsoDepts.includes(picker.dept)) return false;
      if(picker.eligible && c.grades.length && !c.grades.includes(picker.grade)) return false;
      if(picker.onlyRow && rowOf(c) !== picker.row) return false;
      if(q && c.title.toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
    count.textContent = items.length === 1 ? PK.count1 : fmt(PK.count, {n:items.length});
    list.innerHTML = items.length ? items.map(c => '<li><div class="cp-pick-main"><strong>' + esc(c.title) + '</strong> <span class="cp-lvtag ' + lvClass(c.level) + '">' + esc(c.level || '') + '</span>' +
      '<span class="cp-pick-meta">' + esc(fmt(c.credits === 1 ? T.grid.credit1 : T.grid.credits, {n:num(c.credits)})) + ' · ' + esc(termText(c)) + (c.grades.length ? ' · ' + esc(fmt(PK.gradesLine, {grades:c.grades.join(', ')})) : '') + '</span></div>' +
      (has(picker.grade, c.id) ? '<span class="cp-inplan">' + esc(PK.inPlan) + '</span>' : '<button type="button" class="tool-btn small" data-act="pick" data-id="' + escA(c.id) + '" aria-label="' + escA(fmt(PK.addBtnLabel, {course:c.title, level:c.level || '', grade:gradeName(picker.grade)})) + '">' + esc(PK.addBtn) + '</button>') + '</li>').join('') :
      '<li class="cp-hint">' + esc(PK.none) + '</li>';
  }
  function openDetails(grade, id){
    const c = byId[id]; if(!c) return;
    const D = T.details;
    const req = c.prereq.map(titleOf).filter(Boolean);
    const leads = CAT.filter(x => x.prereq.includes(c.id) || x.prereqAny.some(g => g.includes(c.id))).map(levelTitle);
    const counts = c.counts === 'None' ? D.countsNone : (c.counts === 'MoeTerm' ? D.countsMoeTerm : ((ROWS.find(r => r.key === c.counts) || {}).label || c.counts));
    const dl = [[D.level, c.level || T.sheet.empty], [D.credits, num(c.credits)], [D.term, termText(c)],
      [D.grades, c.grades.length ? c.grades.map(gradeName).join(', ') : T.sheet.empty], [D.counts, counts + (c.countsNote ? ' — ' + c.countsNote : '')],
      [D.requires, (req.length ? req.join(', ') : D.requiresNone) + (c.prereqNote ? ' — ' + c.prereqNote : '')]];
    c.prereqAny.forEach(group => dl.push([D.requiresAny, group.map(titleOf).join(' ' + T.tracker.or + ' ')]));
    if(c.recommended.length) dl.push([D.recommended, c.recommended.map(titleOf).join(', ')]);
    if(c.coreq.length) dl.push([D.coreq, c.coreq.map(titleOf).join(', ')]);
    c.coreqAny.forEach(group => dl.push([D.coreqAny, group.map(titleOf).join(' ' + T.tracker.or + ' ')]));
    dl.push([D.leadsTo, leads.length ? leads.join(', ') : D.leadsToNone]);
    openDialog('<h2 class="cp-dialog-title" id="cp-dialog-title">' + esc(c.title) + '</h2><p class="cp-hint">' + esc(fmt(D.planned, {grade:gradeName(grade)})) + (c.page ? ' · ' + esc(fmt(D.page, {n:c.page})) : '') + '</p>' +
      '<dl class="cp-dl">' + dl.map(([k, v]) => '<div><dt>' + esc(k) + '</dt><dd>' + esc(v) + '</dd></div>').join('') + '</dl>' +
      '<p class="cp-actions"><button type="button" class="tool-btn danger" data-act="remove" data-grade="' + grade + '" data-id="' + escA(c.id) + '" data-close="1">' + esc(fmt(D.remove, {grade:gradeName(grade)})) + '</button><button type="button" class="tool-btn secondary" id="cp-dt-close" data-autofocus>' + esc(D.close) + '</button></p>');
  }
  dialog.addEventListener('input', e => {
    if(!picker) return;
    if(e.target.id === 'cp-pk-dept') picker.dept = e.target.value;
    if(e.target.id === 'cp-pk-q') picker.q = e.target.value;
    if(e.target.id === 'cp-pk-elig') picker.eligible = e.target.checked;
    if(e.target.id === 'cp-pk-row') picker.onlyRow = e.target.checked;
    renderPickList();
  });
  dialog.addEventListener('click', e => {
    const b = e.target.closest('button'); if(!b) return;
    if(b.id === 'cp-pk-close' || b.id === 'cp-dt-close'){ closeDialog(); return; }
    if(b.dataset.act === 'pick' && picker){
      const g = picker.grade, key = picker.pendKey;
      if(addCourse(g, b.dataset.id)){
        if(key){ pending = pending.filter(p => p.key !== key); closeDialog(); }
        update(); if(!key) renderPickList();
      }
    }
    if(b.dataset.act === 'remove'){ removeCourse(+b.dataset.grade, b.dataset.id); closeDialog(); update(); }
  });
  document.addEventListener('keydown', e => {
    if(e.key !== 'Escape') return;
    if(!overlay.hidden){ closeDialog(); return; }
    ['cp-start-confirm', 'cp-clear-confirm'].forEach(id => { const el = document.getElementById(id); if(el && !el.hidden){ hideConfirm(id); } });
  });

  /* ---------- inline two-step confirms ---------- */
  let confirmOpener = null;
  function showConfirm(id, text, yes, no, onYes){
    const el = document.getElementById(id); confirmOpener = document.activeElement;
    el.innerHTML = '<span>' + esc(text) + '</span><button type="button" class="tool-btn" data-c="yes">' + esc(yes) + '</button><button type="button" class="tool-btn secondary" data-c="no">' + esc(no) + '</button>';
    el.hidden = false; el.querySelector('[data-c="no"]').focus();
    el.onclick = e => { const b = e.target.closest('button'); if(!b) return; const y = b.dataset.c === 'yes'; hideConfirm(id); if(y) onYes(); };
  }
  function hideConfirm(id){ const el = document.getElementById(id); el.hidden = true; el.innerHTML = ''; if(confirmOpener && document.body.contains(confirmOpener)) confirmOpener.focus(); confirmOpener = null; }

  /* ---------- typical plan ---------- */
  function loadTypical(){
    const TP = isObj(R.typicalPlan) ? R.typicalPlan : {};
    state.courses = []; pending = [];
    let n = 0, pk = 0;
    const addPending = (grade, label, ids) => { ids = ids.filter(id => byId[id]); if(ids.length === 1){ if(addCourse(grade, ids[0], true)) n++; } else if(ids.length){ pending.push({key:'p' + (++pk), grade, label, choose:ids, row:rowOf(byId[ids[0]])}); } };
    GRADES.forEach(g => {
      const entries = Array.isArray(TP[g]) ? TP[g] : [];
      entries.forEach(e => {
        if(typeof e === 'string'){ const c = byId[e]; if(!c) return; if(c.counts === 'Mathematics' || c.counts === 'Science') return; if(addCourse(g, e, true)) n++; }
        else if(isObj(e) && Array.isArray(e.choose)){
          const ids = strList(e.choose).filter(id => byId[id]);
          const subj = ids.length && ids.every(id => byId[id].counts === 'Mathematics') ? 'math' : (ids.length && ids.every(id => byId[id].counts === 'Science') ? 'science' : '');
          const t = subj ? trackByName(subj, state.levels[subj]) : null;
          if(t && isObj(t.years) && Array.isArray(t.years[g]) && t.years[g].length) return;   // the track already covers this subject and year
          addPending(g, typeof e.label === 'string' ? e.label : '', ids);
        }
      });
      [['math', state.levels.math, 'Mathematics'], ['science', state.levels.science, 'Science']].forEach(([kind, name, rowKey]) => {
        const t = trackByName(kind, name);
        const yearEntries = t && isObj(t.years) && Array.isArray(t.years[g]) ? t.years[g] : [];
        if(!yearEntries.length){ /* fall back to the typical plan's own math/science course for this year */
          entries.forEach(e => { if(typeof e === 'string' && byId[e] && byId[e].counts === rowKey && addCourse(g, e, true)) n++; });
          return;
        }
        const subj = (ROWS.find(r => r.key === rowKey) || {}).label || rowKey;
        yearEntries.forEach(e => {
          if(typeof e === 'string'){ if(byId[e] && addCourse(g, e, true)) n++; }
          else if(isObj(e) && Array.isArray(e.choose)) addPending(g, typeof e.label === 'string' && e.label ? e.label : fmt(T.start.levelChoice, {subject:subj, track:t.track}), strList(e.choose));
        });
      });
    });
    update();
    setStatus(fmt(T.start.typicalDone, {n, c:pending.length}));
  }

  /* ---------- print ---------- */
  let printTimer = null;
  function endPrint(){ document.body.classList.remove('cp-printing'); clearTimeout(printTimer); }
  window.addEventListener('afterprint', endPrint);
  window.addEventListener('beforeprint', () => document.body.classList.add('cp-printing'));
  function printPlan(){
    document.body.classList.add('cp-printing');
    printTimer = setTimeout(endPrint, 3000);
    window.print();
  }

  /* ---------- Excel (SheetJS loads from cdnjs only on click; see app-tracker.js) ---------- */
  function loadSheetJS(){
    if(window.XLSX) return Promise.resolve(window.XLSX);
    return new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
      s.crossOrigin = 'anonymous'; s.referrerPolicy = 'no-referrer';
      s.onload = () => res(window.XLSX); s.onerror = () => { s.remove(); rej(new Error('load')); };
      document.head.appendChild(s);
    });
  }
  async function exportExcel(){
    const btn = document.getElementById('cp-excel');
    btn.disabled = true; btn.textContent = T.actions.excelBusy;
    try{
      const XLSX = await loadSheetJS();
      const rows = sheetRows(compute());
      const ws = XLSX.utils.aoa_to_sheet(rows);
      ws['!cols'] = rows[2].map((v, i) => ({wch: i === 0 ? 26 : (i % 2 === 1 && i < 9 ? 30 : 12)}));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, T.actions.sheetName);
      XLSX.writeFile(wb, T.actions.excelFile);
      setStatus(T.actions.excelDone);
    }catch(err){
      setStatus(T.actions.excelOffline, true);
    }finally{
      btn.disabled = false; btn.textContent = T.actions.excel;
    }
  }

  /* ---------- events ---------- */
  root.addEventListener('click', e => {
    const b = e.target.closest('button'); if(!b || dialog.contains(b)) return;
    const act = b.dataset.act;
    if(act === 'add'){ openPicker(+b.dataset.grade, b.dataset.row, null); return; }
    if(act === 'choose'){ const p = pending.find(x => x.key === b.dataset.pend); if(p) openPicker(p.grade, p.row, p); return; }
    if(act === 'details'){ openDetails(+b.dataset.grade, b.dataset.id); return; }
    if(act === 'remove'){ removeCourse(+b.dataset.grade, b.dataset.id); update(); return; }
    if(act === 'addto'){ if(addCourse(+b.dataset.grade, b.dataset.id)) update(); return; }
    if(act === 'addall'){
      const p = PATHS.find(x => x.id === b.dataset.path); if(!p) return;
      let n = 0, skipped = 0;
      const yrs = isObj(p.years) ? p.years : {};
      pathKeys(yrs).forEach(({key, grades}) => (Array.isArray(yrs[key]) ? yrs[key] : []).forEach(e => {
        if(typeof e !== 'string'){ skipped++; return; }           /* choice groups stay a choice */
        const c = byId[e]; if(!c){ skipped++; return; }
        const g = grades.find(x => c.grades.includes(x)) || grades[0];
        if(addCourse(g, e, true)) n++; else skipped++;
      }));
      update(); setStatus(fmt(T.pathways.addedAll, {n, skipped, name:p.name || ''})); return;
    }
    if(b.classList.contains('cp-ytab')){ viewYear = +b.dataset.year; root.dataset.year = String(viewYear); root.querySelectorAll('.cp-ytab').forEach(x => x.setAttribute('aria-pressed', String(+x.dataset.year === viewYear))); return; }
    if(b.id === 'cp-typical'){
      if(state.courses.length) showConfirm('cp-start-confirm', S.replaceConfirm, S.replaceYes, S.replaceNo, loadTypical); else loadTypical();
      return;
    }
    if(b.id === 'cp-blank'){
      const go = () => { state.courses = []; pending = []; update(); setStatus(S.blankDone); };
      if(state.courses.length) showConfirm('cp-start-confirm', S.replaceConfirm, S.replaceYes, S.replaceNo, go); else go();
      return;
    }
    if(b.id === 'cp-clear'){
      showConfirm('cp-clear-confirm', T.storage.clearConfirm, T.storage.clearYes, T.storage.clearNo, () => {
        try{ localStorage.removeItem(KEY); }catch(err){}
        state.courses = []; pending = []; state.waiver = false; document.getElementById('cp-waiver').checked = false;
        update(); setStatus(T.storage.cleared);
      });
      return;
    }
    if(b.id === 'cp-print'){ printPlan(); return; }
    if(b.id === 'cp-excel'){ exportExcel(); return; }
  });
  document.getElementById('cp-year').addEventListener('change', e => { state.gradYear = +e.target.value; update(); setStatus(fmt(S.yearChanged, {year:state.gradYear})); });
  document.getElementById('cp-math').addEventListener('change', e => { state.levels.math = e.target.value; update(); });
  document.getElementById('cp-sci').addEventListener('change', e => { state.levels.science = e.target.value; update(); });
  document.getElementById('cp-waiver').addEventListener('change', e => { state.waiver = e.target.checked; update(); });
  document.getElementById('cp-path').addEventListener('change', renderPath);

  /* ---------- go ---------- */
  const loaded = loadSaved();
  root.dataset.year = String(viewYear);
  document.getElementById('cp-year').value = String(state.gradYear);
  document.getElementById('cp-math').value = state.levels.math;
  document.getElementById('cp-sci').value = state.levels.science;
  document.getElementById('cp-waiver').checked = state.waiver;
  showBlocked();
  update();
  if(!storageOK) setStatus(T.storage.blocked, true);
  else if(loaded && loaded.n) setStatus(fmt(T.storage.loaded, {n:loaded.n}) + (loaded.dropped ? ' ' + fmt(T.storage.dropped, {n:loaded.dropped}) : ''));
})();
