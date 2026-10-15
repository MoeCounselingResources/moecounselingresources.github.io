/* =========================================================================
   HOW TO LEARN, MODULE 10 TOOLS: task breakdown + weekly planner.
   All wording is in assets/data/htl-executive.js (HTL_MODULE.try).
   Saved ONLY in the student's own browser under "moeller-ex-htl-planner" as {v:1, tasks:{...}, week:{...}}
   (try/catch, strict validation of every loaded value, visible warning if saving is blocked, two-step clear).
   Printing: the sheet is built only when a Print button was used (body class htl-executive-printing).
   ========================================================================= */
(function(){
  'use strict';
  window.HTL_INTERACTIVES = window.HTL_INTERACTIVES || {};
  window.HTL_INTERACTIVES.executive = function(host){
    if(!host || typeof HTL_MODULE === 'undefined' || !window.HTL) return;
    const { esc, escA, fmt } = window.HTL;
    const T = HTL_MODULE.try, K = T.task, W = T.week, S = T.shared;
    const KEY = 'moeller-ex-htl-planner', MAX_LEN = 200, MAX_STEPS = 10, DAYS = 7, TOPN = 3, MIN_LO = 5, MIN_HI = 120;
    const clip = s => (typeof s === 'string' ? s : '').replace(/\s+/g, ' ').trim().slice(0, MAX_LEN);
    const validDate = s => {
      if(typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return '';
      const [y, m, d] = s.split('-').map(Number), dt = new Date(y, m - 1, d);
      return (y >= 2000 && y <= 2100 && dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d) ? s : '';
    };
    const cleanMin = v => { const n = Math.round(Number(v)); return (v !== '' && v != null && isFinite(n) && n >= MIN_LO && n <= MIN_HI) ? n : null; };

    /* ---------- state ---------- */
    const blankWeek = () => ({ days: Array.from({ length: DAYS }, () => ({ due: '', plan: '' })), top: ['', '', ''] });
    let task = { name: '', due: '', steps: [] };
    let week = blankWeek();

    function sanitize(o){
      const out = { task: { name: '', due: '', steps: [] }, week: blankWeek() };
      if(!o || typeof o !== 'object' || Array.isArray(o) || o.v !== 1) return out;
      const t = o.tasks;
      if(t && typeof t === 'object' && !Array.isArray(t)){
        out.task.name = clip(t.name); out.task.due = validDate(t.due);
        if(Array.isArray(t.steps)) t.steps.slice(0, MAX_STEPS).forEach(s => {
          if(s && typeof s === 'object' && !Array.isArray(s)){
            const text = clip(s.t); if(text) out.task.steps.push({ t: text, m: cleanMin(s.m), d: s.d === true });
          }
        });
      }
      const w = o.week;
      if(w && typeof w === 'object' && !Array.isArray(w)){
        if(Array.isArray(w.days)) w.days.slice(0, DAYS).forEach((d, i) => { if(d && typeof d === 'object' && !Array.isArray(d)){ out.week.days[i].due = clip(d.due); out.week.days[i].plan = clip(d.plan); } });
        if(Array.isArray(w.top)) w.top.slice(0, TOPN).forEach((s, i) => { out.week.top[i] = clip(s); });
      }
      return out;
    }

    /* ---------- markup ---------- */
    const dayFields = W.dayNames.map((n, i) =>
      '<fieldset class="htl-ex-day"><legend>' + esc(n) + '</legend>' +
      '<label class="tool-label" for="htl-ex-due' + i + '">' + esc(W.dueLabel) + '</label><textarea class="tool-textarea" id="htl-ex-due' + i + '" rows="2" maxlength="' + MAX_LEN + '" data-day="' + i + '" data-f="due" placeholder="' + escA(W.duePlaceholder) + '"></textarea>' +
      '<label class="tool-label" for="htl-ex-plan' + i + '">' + esc(W.planLabel) + '</label><textarea class="tool-textarea" id="htl-ex-plan' + i + '" rows="2" maxlength="' + MAX_LEN + '" data-day="' + i + '" data-f="plan" placeholder="' + escA(W.planPlaceholder) + '"></textarea></fieldset>').join('');
    const topFields = [0, 1, 2].map(i => '<div><label class="tool-label" for="htl-ex-top' + i + '">' + esc(fmt(W.topLabel, { n: i + 1 })) + '</label><input class="tool-input" id="htl-ex-top' + i + '" type="text" maxlength="' + MAX_LEN + '" autocomplete="off" data-top="' + i + '" placeholder="' + escA(W.topPlaceholder) + '"></div>').join('');

    host.innerHTML =
      '<div class="htl-ex-wrap">' +
      '<div class="htl-tool"><h3>' + esc(K.title) + '</h3><p>' + esc(K.intro) + '</p>' +
      '<p class="htl-privacy">' + esc(S.privacy) + '</p>' +
      '<p class="htl-warn" id="htl-ex-blocked" role="alert" hidden>' + esc(S.blocked) + '</p>' +
      '<div class="htl-fields"><div><label class="tool-label" for="htl-ex-task">' + esc(K.taskLabel) + '</label><input class="tool-input" id="htl-ex-task" type="text" maxlength="' + MAX_LEN + '" autocomplete="off" placeholder="' + escA(K.taskPlaceholder) + '"></div>' +
      '<div><label class="tool-label" for="htl-ex-date">' + esc(K.dueLabel) + '</label><input class="tool-input" id="htl-ex-date" type="date" min="2000-01-01" max="2100-12-31"></div></div>' +
      '<div class="htl-actions"><button type="button" class="tool-btn" id="htl-ex-go">' + esc(K.go) + '</button><button type="button" class="tool-btn secondary" id="htl-ex-scratch">' + esc(K.scratch) + '</button></div>' +
      '<p class="htl-small" id="htl-ex-due-line"></p>' +
      '<h4>' + esc(K.stepsTitle) + '</h4>' +
      '<p class="htl-small"><strong>' + esc(K.starterTitle) + '</strong></p><div class="htl-chips">' + K.starters.map((s, i) => '<button type="button" class="htl-chip" data-s="' + i + '">' + esc(s) + '</button>').join('') + '</div>' +
      '<ol class="htl-ex-steps" id="htl-ex-steps"></ol><p class="htl-small" id="htl-ex-empty"></p>' +
      '<p><button type="button" class="tool-btn secondary" id="htl-ex-add">' + esc(K.add) + '</button></p>' +
      '<p class="htl-ex-smallest" id="htl-ex-smallest"></p><p class="htl-ex-progress" id="htl-ex-progress"></p>' +
      '<h4>' + esc(K.timerTitle) + '</h4><p class="htl-small">' + esc(K.timerHelp) + '</p>' +
      '<div class="htl-timer"><span class="htl-timer-l" id="htl-ex-tlabel">' + esc(K.timerLabel) + '</span> <span class="htl-timer-t" id="htl-ex-time" role="timer" aria-labelledby="htl-ex-tlabel">5:00</span>' +
      '<button type="button" class="tool-btn" id="htl-ex-tstart">' + esc(K.timerStart) + '</button><button type="button" class="tool-btn secondary" id="htl-ex-treset">' + esc(K.timerReset) + '</button></div>' +
      '<p class="htl-status" id="htl-ex-tstatus" role="status" aria-live="polite"></p>' +
      '<p class="htl-status" id="htl-ex-status" role="status" aria-live="polite"></p></div>' +

      '<div class="htl-tool"><h3>' + esc(W.title) + '</h3><p>' + esc(W.intro) + '</p>' +
      '<div class="htl-ex-grid">' + dayFields + '</div>' +
      '<h4>' + esc(W.topTitle) + '</h4><div class="htl-ex-top">' + topFields + '</div>' +
      '<div class="htl-actions"><button type="button" class="tool-btn" id="htl-ex-print">' + esc(W.print) + '</button><button type="button" class="tool-btn secondary" id="htl-ex-printblank">' + esc(W.printBlank) + '</button><button type="button" class="tool-btn secondary" id="htl-ex-clear">' + esc(S.clear) + '</button></div>' +
      '<div class="htl-confirm" id="htl-ex-confirm" role="group" aria-labelledby="htl-ex-confirm-t" hidden><span id="htl-ex-confirm-t">' + esc(S.clearAsk) + '</span> <button type="button" class="tool-btn" id="htl-ex-cyes">' + esc(S.clearYes) + '</button><button type="button" class="tool-btn secondary" id="htl-ex-cno">' + esc(S.clearNo) + '</button></div>' +
      '</div></div><div class="htl-ex-sheet" id="htl-ex-sheet"></div>';

    const $ = id => document.getElementById(id);
    const status = t => { $('htl-ex-status').textContent = t; };

    /* ---------- storage ---------- */
    let storageOK = true;
    try{ localStorage.setItem(KEY + '-probe', '1'); localStorage.removeItem(KEY + '-probe'); }catch(e){ storageOK = false; }
    if(storageOK){
      let raw = null;
      try{ raw = localStorage.getItem(KEY); }catch(e){ storageOK = false; }
      if(raw){
        try{ const s = sanitize(JSON.parse(raw)); task = s.task; week = s.week; }catch(e){ /* unreadable: start fresh */ }
      }
    }
    if(!storageOK) $('htl-ex-blocked').hidden = false;
    const isEmpty = () => !task.name && !task.due && !task.steps.length && !week.top.some(Boolean) && !week.days.some(d => d.due || d.plan);
    function save(msg){
      if(!storageOK){ $('htl-ex-blocked').hidden = false; return; }
      try{
        if(isEmpty()) localStorage.removeItem(KEY);
        else localStorage.setItem(KEY, JSON.stringify({ v: 1, tasks: { name: task.name, due: task.due, steps: task.steps.map(s => ({ t: s.t, m: s.m, d: s.d })) }, week: { days: week.days.map(d => ({ due: d.due, plan: d.plan })), top: week.top.slice() } }));
        if(msg) status(msg);
      }catch(e){ storageOK = false; $('htl-ex-blocked').hidden = false; }
    }

    /* ---------- task breakdown ---------- */
    function dueLine(){
      const el = $('htl-ex-due-line'); const d = validDate(task.due);
      if(!d){ el.textContent = ''; return; }
      const [y, m, dd] = d.split('-').map(Number), now = new Date();
      const days = Math.round((new Date(y, m - 1, dd) - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / 86400000);
      el.textContent = days < 0 ? K.pastDue : days === 0 ? K.dueToday : days === 1 ? K.dayLeft : fmt(K.daysLeft, { d: days });
    }
    function summary(){
      const open = task.steps.filter(s => !s.d && s.m != null);
      const best = open.reduce((b, s) => (!b || s.m < b.m) ? s : b, null);
      task.steps.forEach((s, i) => {
        const li = $('htl-ex-steps').children[i]; if(!li) return;
        const on = s === best; li.classList.toggle('is-smallest', on);
        li.querySelector('.htl-ex-badge').hidden = !on;
        li.classList.toggle('is-done', s.d);
      });
      const done = task.steps.filter(s => s.d).length;
      $('htl-ex-smallest').textContent = !task.steps.length ? '' : best ? fmt(K.smallestLine, { t: best.t, m: best.m }) : (done === task.steps.length ? K.allDone : K.noMinutes);
      $('htl-ex-progress').textContent = task.steps.length ? fmt(K.progress, { d: done, n: task.steps.length }) : '';
      $('htl-ex-empty').textContent = task.steps.length ? '' : K.empty;
      dueLine();
    }
    function drawSteps(focusSel){
      $('htl-ex-steps').innerHTML = task.steps.map((s, i) => {
        const n = i + 1;
        return '<li class="htl-ex-step" data-i="' + i + '"><div class="htl-ex-steprow">' +
          '<label class="htl-ex-check"><input type="checkbox" id="htl-ex-d' + i + '" data-f="d"' + (s.d ? ' checked' : '') + ' aria-label="' + escA(K.doneLabel + ': ' + fmt(K.stepLabel, { n })) + '"></label>' +
          '<div class="htl-ex-stepmain"><label class="tool-label" for="htl-ex-t' + i + '">' + esc(fmt(K.stepLabel, { n })) + ' <span class="htl-ex-badge" hidden>' + esc(K.smallestBadge) + '</span></label>' +
          '<textarea class="tool-textarea" id="htl-ex-t' + i + '" rows="2" maxlength="' + MAX_LEN + '" autocomplete="off" data-f="t">' + esc(s.t) + '</textarea></div>' +
          '<div class="htl-ex-min"><label class="tool-label" for="htl-ex-m' + i + '"><span class="htl-vh">' + esc(K.minLabel) + ' ' + esc(fmt(K.stepLabel, { n })) + '</span><span aria-hidden="true">' + esc(K.minShort) + '</span></label>' +
          '<input class="tool-input" id="htl-ex-m' + i + '" type="number" inputmode="numeric" min="' + MIN_LO + '" max="' + MIN_HI + '" step="1" data-f="m" value="' + (s.m == null ? '' : s.m) + '" title="' + escA(K.minLabel) + '"></div></div>' +
          '<div class="htl-ex-btns"><button type="button" class="tool-btn secondary" data-act="up" aria-label="' + escA(fmt(K.upL, { n })) + '"' + (i === 0 ? ' disabled' : '') + '>' + esc(K.up) + '</button>' +
          '<button type="button" class="tool-btn secondary" data-act="down" aria-label="' + escA(fmt(K.downL, { n })) + '"' + (i === task.steps.length - 1 ? ' disabled' : '') + '>' + esc(K.down) + '</button>' +
          '<button type="button" class="tool-btn secondary" data-act="rm" aria-label="' + escA(fmt(K.removeL, { n })) + '">' + esc(K.remove) + '</button></div></li>';
      }).join('');
      summary();
      if(focusSel){ const f = $('htl-ex-steps').querySelector(focusSel) || $('htl-ex-add'); f.focus(); }
    }
    const stepRows = () => $('htl-ex-steps');
    stepRows().addEventListener('input', e => {
      const li = e.target.closest('.htl-ex-step'); if(!li) return;
      const s = task.steps[+li.dataset.i]; if(!s) return;
      const f = e.target.dataset.f;
      if(f === 't') s.t = clip(e.target.value);
      else if(f === 'm') s.m = cleanMin(e.target.value);
      else if(f === 'd') s.d = e.target.checked;
      summary(); save();
    });
    stepRows().addEventListener('change', e => { if(e.target.dataset.f === 'm'){ const li = e.target.closest('.htl-ex-step'), s = task.steps[+li.dataset.i]; if(s) e.target.value = s.m == null ? '' : s.m; } });
    stepRows().addEventListener('click', e => {
      const b = e.target.closest('button[data-act]'); if(!b) return;
      const i = +b.closest('.htl-ex-step').dataset.i, act = b.dataset.act;
      if(act === 'rm'){
        task.steps.splice(i, 1); save();
        drawSteps(task.steps.length ? '#htl-ex-t' + Math.min(i, task.steps.length - 1) : null); status(K.removed);
      }else{
        const j = act === 'up' ? i - 1 : i + 1; if(j < 0 || j >= task.steps.length) return;
        const tmp = task.steps[i]; task.steps[i] = task.steps[j]; task.steps[j] = tmp; save();
        drawSteps('[data-i="' + j + '"] [data-act="' + act + '"]:not([disabled])'); status(fmt(K.moved, { n: j + 1 }));
        if(document.activeElement === document.body || document.activeElement === $('htl-ex-add')){ const alt = $('htl-ex-steps').querySelector('[data-i="' + j + '"] button:not([disabled])'); if(alt) alt.focus(); }
      }
    });
    function addStep(text, m){
      if(task.steps.length >= MAX_STEPS){ status(K.tooMany); return false; }
      task.steps.push({ t: clip(text), m: m == null ? null : m, d: false }); save(); drawSteps('#htl-ex-t' + (task.steps.length - 1)); status(K.added); return true;
    }
    $('htl-ex-add').addEventListener('click', () => addStep('', null));
    host.querySelectorAll('.htl-chip').forEach(b => b.addEventListener('click', () => addStep(K.starters[+b.dataset.s], null)));
    $('htl-ex-task').addEventListener('input', e => { task.name = clip(e.target.value); save(); });
    $('htl-ex-date').addEventListener('input', e => { task.due = validDate(e.target.value); dueLine(); save(); });
    $('htl-ex-task').addEventListener('keydown', e => { if(e.key === 'Enter'){ e.preventDefault(); $('htl-ex-go').click(); } });
    $('htl-ex-go').addEventListener('click', () => {
      const name = clip($('htl-ex-task').value);
      if(!name){ status(K.needTask); $('htl-ex-task').focus(); return; }
      task.name = name; task.due = validDate($('htl-ex-date').value);
      task.steps = K.stepTemplates.map(s => ({ t: clip(fmt(s.t, { task: name })), m: s.m, d: false }));
      save(); drawSteps('#htl-ex-t0'); status(fmt(K.made, { n: task.steps.length }));
    });
    $('htl-ex-scratch').addEventListener('click', () => { task.steps = []; save(); drawSteps(null); addStep('', null); });

    /* timer (role=timer is not a live region; start/stop/finish go to the polite status line) */
    let tLeft = 300, tEnd = 0, tId = null;
    const showT = () => { $('htl-ex-time').textContent = Math.floor(tLeft / 60) + ':' + String(tLeft % 60).padStart(2, '0'); };
    const stopT = () => { clearInterval(tId); tId = null; $('htl-ex-tstart').textContent = K.timerStart; };
    $('htl-ex-tstart').addEventListener('click', () => {
      if(tId){ stopT(); $('htl-ex-tstatus').textContent = fmt(K.timerStopped, { t: $('htl-ex-time').textContent }); return; }
      if(tLeft <= 0) tLeft = 300;
      $('htl-ex-tstatus').textContent = K.timerStarted; $('htl-ex-tstart').textContent = K.timerStop; showT();
      tEnd = Date.now() + tLeft * 1000;
      tId = setInterval(() => { tLeft = Math.max(0, Math.round((tEnd - Date.now()) / 1000)); showT(); if(tLeft <= 0){ stopT(); $('htl-ex-tstatus').textContent = K.timerDone; } }, 250);
    });
    $('htl-ex-treset').addEventListener('click', () => { stopT(); tLeft = 300; showT(); $('htl-ex-tstatus').textContent = ''; });

    /* ---------- weekly planner ---------- */
    host.querySelectorAll('textarea[data-day]').forEach(el => el.addEventListener('input', () => { week.days[+el.dataset.day][el.dataset.f] = clip(el.value); save(); }));
    host.querySelectorAll('input[data-top]').forEach(el => el.addEventListener('input', () => { week.top[+el.dataset.top] = clip(el.value); save(); }));

    function fillAll(){
      $('htl-ex-task').value = task.name; $('htl-ex-date').value = task.due;
      week.days.forEach((d, i) => { $('htl-ex-due' + i).value = d.due; $('htl-ex-plan' + i).value = d.plan; });
      week.top.forEach((t, i) => { $('htl-ex-top' + i).value = t; });
      drawSteps(null);
    }
    fillAll();

    /* clear my data (two steps; Escape cancels) */
    $('htl-ex-clear').addEventListener('click', () => { $('htl-ex-confirm').hidden = false; $('htl-ex-cno').focus(); });
    $('htl-ex-cno').addEventListener('click', () => { $('htl-ex-confirm').hidden = true; $('htl-ex-clear').focus(); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape' && !$('htl-ex-confirm').hidden){ $('htl-ex-confirm').hidden = true; $('htl-ex-clear').focus(); } });
    $('htl-ex-cyes').addEventListener('click', () => {
      task = { name: '', due: '', steps: [] }; week = blankWeek(); fillAll();
      try{ localStorage.removeItem(KEY); }catch(e){}
      $('htl-ex-confirm').hidden = true; status(S.cleared); $('htl-ex-clear').focus();
    });

    /* ---------- printing: ONE landscape page, only when a Print button was used ---------- */
    let want = null, pageStyle = null;
    function buildSheet(blank){
      const cell = v => '<td>' + (blank ? '' : esc(v)) + '</td>';
      const days = week.days;
      $('htl-ex-sheet').innerHTML = '<h2>' + esc(W.printTitle) + '</h2><p class="htl-ex-pnote">' + esc(W.printNote) + '</p>' +
        '<table class="htl-ex-ptable"><thead><tr><th scope="col"><span class="htl-vh">&nbsp;</span></th>' + W.dayNames.map(n => '<th scope="col">' + esc(n) + '</th>').join('') + '</tr></thead><tbody>' +
        '<tr class="htl-ex-prow-due"><th scope="row">' + esc(W.dueLabel) + '</th>' + days.map(d => cell(d.due)).join('') + '</tr>' +
        '<tr class="htl-ex-prow-plan"><th scope="row">' + esc(W.planLabel) + '</th>' + days.map(d => cell(d.plan)).join('') + '</tr></tbody></table>' +
        '<h3>' + esc(W.printTop) + '</h3><ol class="htl-ex-ptop">' + [0, 1, 2].map(i => '<li>' + (blank ? '' : esc(week.top[i])) + '</li>').join('') + '</ol>';
      if(pageStyle) pageStyle.remove();
      pageStyle = document.createElement('style'); pageStyle.textContent = '@page{size:landscape; margin:0.5in;}'; document.head.appendChild(pageStyle);
      document.body.classList.add('htl-executive-printing');
    }
    const endPrint = () => {
      want = null; document.body.classList.remove('htl-executive-printing'); $('htl-ex-sheet').innerHTML = '';
      if(pageStyle){ pageStyle.remove(); pageStyle = null; }
    };
    // Only the two Print buttons print the sheet; a plain Ctrl+P prints the whole page as usual.
    window.addEventListener('beforeprint', () => { if(want) buildSheet(want === 'blank'); });
    window.addEventListener('afterprint', endPrint);
    const doPrint = kind => { want = kind; try{ window.print(); }catch(e){ endPrint(); } };
    $('htl-ex-print').addEventListener('click', () => doPrint('filled'));
    $('htl-ex-printblank').addEventListener('click', () => doPrint('blank'));
  };
})();
