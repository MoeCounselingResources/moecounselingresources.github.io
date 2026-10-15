/* =========================================================================
   HOW TO LEARN, MODULE 4 TOOL: the review-calendar planner.
   All wording is in assets/data/htl-spacing.js (HTL_MODULE.try). Dates are worked out as whole LOCAL calendar days
   (year, month, day), never as milliseconds of local time, so daylight saving changes and month ends cannot shift a date.
   The plan saves ONLY in the student's own browser under "moeller-ex-htl-calendar" (try/catch, visible warning if the
   browser blocks saving, two-step Clear my data). It stores the subject, exam date, number of sessions, style and
   which sessions are checked off. Nothing is sent anywhere.
   ========================================================================= */
(function(){
  'use strict';
  window.HTL_INTERACTIVES = window.HTL_INTERACTIVES || {};

  /* ---------- date math on whole calendar days ---------- */
  const DAY = 86400000;
  const dayNum = (y, m, d) => Math.round(Date.UTC(y, m - 1, d) / DAY);          // m is 1-12; UTC has no DST
  const fromNum = n => { const t = new Date(n * DAY); return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() }; };
  const pad = n => String(n).padStart(2, '0');
  const iso = n => { const o = fromNum(n); return o.y + '-' + pad(o.m) + '-' + pad(o.d); };
  function parseISO(s){                                                            // returns a day number or null
    if(typeof s !== 'string') return null;
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s); if(!m) return null;
    const y = +m[1], mo = +m[2], d = +m[3];
    if(y < 2000 || y > 2100) return null;
    const n = dayNum(y, mo, d), o = fromNum(n);
    return (o.y === y && o.m === mo && o.d === d) ? n : null;                      // rejects 2026-02-30 and the like
  }
  const todayNum = () => { const t = new Date(); return dayNum(t.getFullYear(), t.getMonth() + 1, t.getDate()); };
  function pretty(n){                                                              // built from the calendar parts, noon local
    const o = fromNum(n);
    try{ return new Date(o.y, o.m - 1, o.d, 12).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }); }
    catch(e){ return iso(n); }
  }

  /* Review day numbers between today and the day before the exam. Never the same day twice, never fewer than 1. */
  function planDays(today, exam, want, style){
    const avail = exam - today;                                                    // candidate days: today .. exam-1
    if(avail < 1) return [];
    const n = Math.min(want, avail);
    if(n === 1) return [today];
    const out = [];
    for(let i = 0; i < n; i++){
      const f = i / (n - 1);
      const g = style === 'close' ? 1 - Math.pow(1 - f, 1.7) : f;                 // 'close' = big gaps first, smaller gaps near the exam
      out.push(Math.round(g * (avail - 1)));
    }
    for(let i = 1; i < n; i++) if(out[i] <= out[i - 1]) out[i] = out[i - 1] + 1;   // strictly increasing
    if(out[n - 1] > avail - 1) out[n - 1] = avail - 1;
    for(let i = n - 2; i >= 0; i--) if(out[i] >= out[i + 1]) out[i] = out[i + 1] - 1;
    return out.map(o => today + o);
  }
  window.HTL_SPACING_TEST = { dayNum, fromNum, iso, parseISO, planDays };          // plain functions, used by the tests only

  window.HTL_INTERACTIVES.spacing = function(host){
    if(!host || typeof HTL_MODULE === 'undefined' || !window.HTL) return;
    const { esc, escA, fmt } = window.HTL;
    const T = HTL_MODULE.try;
    const KEY = 'moeller-ex-htl-calendar', MAX_SUBJECT = 60, STYLES = ['even', 'close'];
    const $ = id => document.getElementById(id);

    host.innerHTML =
      '<div class="htl-tool"><h3>' + esc(T.title) + '</h3><p>' + esc(T.intro) + '</p><p class="htl-privacy">' + esc(T.privacy) + '</p>' +
      '<p class="htl-warn" id="htl-sp-blocked" role="alert" hidden>' + esc(T.blocked) + '</p>' +
      '<div class="htl-sp-fields">' +
        '<div class="htl-sp-wide"><label class="tool-label" for="htl-sp-subject">' + esc(T.subjectLabel) + '</label><input class="tool-input" id="htl-sp-subject" type="text" maxlength="' + MAX_SUBJECT + '" autocomplete="off" placeholder="' + escA(T.subjectPlaceholder) + '"></div>' +
        '<div><label class="tool-label" for="htl-sp-exam">' + esc(T.examLabel) + '</label><input class="tool-input" id="htl-sp-exam" type="date"></div>' +
        '<div><label class="tool-label" for="htl-sp-n">' + esc(T.sessionsLabel) + '</label><select class="tool-input" id="htl-sp-n">' + T.sessionsOpts.map((o, i) => '<option value="' + (i + 3) + '">' + esc(o) + '</option>').join('') + '</select></div>' +
        '<div class="htl-sp-wide"><label class="tool-label" for="htl-sp-style">' + esc(T.styleLabel) + '</label><select class="tool-input" id="htl-sp-style" aria-describedby="htl-sp-stylenote">' + STYLES.map(s => '<option value="' + s + '">' + esc(T.styles[s]) + '</option>').join('') + '</select>' +
        '<p class="htl-small" id="htl-sp-stylenote">' + esc(T.styleNote) + '</p></div>' +
      '</div>' +
      '<div class="htl-actions"><button type="button" class="tool-btn" id="htl-sp-make">' + esc(T.make) + '</button><button type="button" class="tool-btn secondary" id="htl-sp-clear">' + esc(T.clear) + '</button></div>' +
      '<div class="htl-confirm" id="htl-sp-confirm" role="group" aria-labelledby="htl-sp-confirm-t" hidden><span id="htl-sp-confirm-t">' + esc(T.clearAsk) + '</span> <button type="button" class="tool-btn" id="htl-sp-cyes">' + esc(T.clearYes) + '</button><button type="button" class="tool-btn secondary" id="htl-sp-cno">' + esc(T.clearNo) + '</button></div>' +
      '<p class="htl-status" id="htl-sp-status" role="status" aria-live="polite"></p>' +
      '<div class="htl-sp-plan" id="htl-sp-plan"></div>' +
      '<div class="htl-sheet" id="htl-sp-sheet"></div></div>';

    const status = t => { $('htl-sp-status').textContent = t; };

    /* ---------- state ---------- */
    let state = null;            // { subject, exam:'YYYY-MM-DD', sessions, style, done:[] } once a plan exists
    let days = [];               // computed review day numbers for the current state
    let storageOK = true;
    try{ localStorage.setItem(KEY + '-probe', '1'); localStorage.removeItem(KEY + '-probe'); }catch(e){ storageOK = false; }
    if(!storageOK) $('htl-sp-blocked').hidden = false;

    function validate(o){                                                          // strict: returns a clean object or null
      if(!o || typeof o !== 'object' || Array.isArray(o) || o.v !== 1) return null;
      if(typeof o.subject !== 'string' || o.subject.length > MAX_SUBJECT) return null;
      if(parseISO(o.exam) === null) return null;
      if(!Number.isInteger(o.sessions) || o.sessions < 3 || o.sessions > 5) return null;
      if(typeof o.style !== 'string' || STYLES.indexOf(o.style) < 0) return null;
      if(!Array.isArray(o.done) || o.done.length > o.sessions) return null;
      const seen = {};
      for(const i of o.done){ if(!Number.isInteger(i) || i < 0 || i >= o.sessions || seen[i]) return null; seen[i] = 1; }
      return { subject: o.subject.replace(/\s+/g, ' ').trim(), exam: o.exam, sessions: o.sessions, style: o.style, done: o.done.slice().sort((a, b) => a - b) };
    }
    function save(msg){
      if(!storageOK){ $('htl-sp-blocked').hidden = false; return; }
      try{
        if(!state) localStorage.removeItem(KEY);
        else localStorage.setItem(KEY, JSON.stringify({ v: 1, subject: state.subject, exam: state.exam, sessions: state.sessions, style: state.style, done: state.done }));
        if(msg) status(msg);
      }catch(e){ storageOK = false; $('htl-sp-blocked').hidden = false; }
    }

    /* ---------- draw the plan ---------- */
    function draw(focusFirst){
      const out = $('htl-sp-plan');
      if(!state){ out.innerHTML = ''; return; }
      const today = todayNum(), exam = parseISO(state.exam);
      if(exam <= today){ days = []; out.innerHTML = '<p class="htl-warn">' + esc(T.stale) + '</p>'; return; }
      days = planDays(today, exam, state.sessions, state.style);
      state.done = state.done.filter(i => i < days.length);
      const doneN = state.done.length;
      out.innerHTML = '<h4 tabindex="-1" id="htl-sp-h">' + esc(fmt(T.planFor, { s: state.subject || '' }).replace(/\s+$/, '')) + '</h4>' +
        '<p class="htl-small">' + esc(fmt(T.examOn, { d: pretty(exam) })) + '</p>' +
        '<p class="htl-small">' + esc(days.length < state.sessions ? fmt(T.fewer, { n: days.length, want: state.sessions }) : fmt(T.full, { n: days.length })) + '</p>' +
        '<ul class="htl-sp-list">' + days.map((d, i) => '<li><label class="htl-sp-item' + (state.done.indexOf(i) >= 0 ? ' is-done' : '') + '"><input type="checkbox" data-i="' + i + '"' + (state.done.indexOf(i) >= 0 ? ' checked' : '') + '> <span>' + esc(fmt(T.session, { i: i + 1, d: pretty(d) }) + (d === today ? T.todayTag : '')) + '</span></label></li>').join('') + '</ul>' +
        '<p class="htl-status" id="htl-sp-count" role="status" aria-live="polite">' + esc(doneN === days.length ? T.allDone : fmt(T.left, { n: doneN, total: days.length })) + '</p>' +
        '<div class="htl-example"><strong>' + esc(T.howTitle) + ':</strong> ' + esc(T.how) + '</div>' +
        '<p><button type="button" class="tool-btn secondary" id="htl-sp-print">' + esc(T.printBtn) + '</button></p>';
      if(focusFirst) $('htl-sp-h').focus();
    }
    $('htl-sp-plan').addEventListener('change', e => {
      const c = e.target; if(!c || !c.matches || !c.matches('input[type=checkbox][data-i]') || !state) return;
      const i = +c.dataset.i, at = state.done.indexOf(i);
      if(c.checked && at < 0) state.done.push(i); else if(!c.checked && at >= 0) state.done.splice(at, 1);
      state.done.sort((a, b) => a - b);
      c.closest('.htl-sp-item').classList.toggle('is-done', c.checked);
      $('htl-sp-count').textContent = state.done.length === days.length ? T.allDone : fmt(T.left, { n: state.done.length, total: days.length });
      save();
    });
    $('htl-sp-plan').addEventListener('click', e => { if(e.target && e.target.id === 'htl-sp-print'){ wantSheet = true; try{ window.print(); }catch(err){ endPrint(); } } });

    /* ---------- make a plan ---------- */
    const clipSubject = s => String(s).replace(/\s+/g, ' ').trim().slice(0, MAX_SUBJECT);
    $('htl-sp-make').addEventListener('click', () => {
      const subject = clipSubject($('htl-sp-subject').value), examStr = $('htl-sp-exam').value;
      if(!subject){ status(T.needSubject); $('htl-sp-subject').focus(); return; }
      const exam = parseISO(examStr);
      if(exam === null){ status(T.needDate); $('htl-sp-exam').focus(); return; }
      if(exam <= todayNum()){ status(T.notFuture); $('htl-sp-exam').focus(); return; }
      const want = +$('htl-sp-n').value, style = $('htl-sp-style').value;
      state = validate({ v: 1, subject, exam: examStr, sessions: want, style: STYLES.indexOf(style) >= 0 ? style : 'even', done: [] });
      if(!state){ status(T.needDate); return; }
      draw(true); status(''); save(storageOK ? T.saved : '');
    });
    [$('htl-sp-subject'), $('htl-sp-exam')].forEach(i => i.addEventListener('keydown', e => { if(e.key === 'Enter'){ e.preventDefault(); $('htl-sp-make').click(); } }));

    /* ---------- clear my data (two steps, Escape cancels) ---------- */
    $('htl-sp-clear').addEventListener('click', () => { $('htl-sp-confirm').hidden = false; $('htl-sp-cno').focus(); });
    $('htl-sp-cno').addEventListener('click', () => { $('htl-sp-confirm').hidden = true; $('htl-sp-clear').focus(); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape' && !$('htl-sp-confirm').hidden){ $('htl-sp-confirm').hidden = true; $('htl-sp-clear').focus(); } });
    $('htl-sp-cyes').addEventListener('click', () => {
      state = null; days = []; draw(); try{ localStorage.removeItem(KEY); }catch(e){}
      $('htl-sp-subject').value = ''; $('htl-sp-exam').value = ''; $('htl-sp-n').value = '3'; $('htl-sp-style').value = 'even';
      $('htl-sp-confirm').hidden = true; status(T.cleared); $('htl-sp-clear').focus();
    });

    /* ---------- load a saved plan (storage probe is separate from JSON.parse) ---------- */
    if(storageOK){
      let raw = null;
      try{ raw = localStorage.getItem(KEY); }catch(e){ raw = null; }
      if(raw){
        let parsed = null;
        try{ parsed = JSON.parse(raw); }catch(e){ parsed = null; }
        const ok = validate(parsed);
        if(ok){
          state = ok;
          $('htl-sp-subject').value = ok.subject; $('htl-sp-exam').value = ok.exam; $('htl-sp-n').value = String(ok.sessions); $('htl-sp-style').value = ok.style;
          draw();
        }
      }
    }
    // the date picker should not offer today or earlier
    try{ const t = fromNum(todayNum() + 1); $('htl-sp-exam').min = t.y + '-' + pad(t.m) + '-' + pad(t.d); }catch(e){}

    /* ---------- print: one clean page, built only when the Print button was used ---------- */
    function buildSheet(){
      if(!state || !days.length) return false;
      $('htl-sp-sheet').innerHTML = '<h2>' + esc(T.printTitle) + '</h2>' +
        '<p><strong>' + esc(T.printSubject) + ':</strong> ' + esc(state.subject) + '</p>' +
        '<p><strong>' + esc(T.printExam) + ':</strong> ' + esc(pretty(parseISO(state.exam))) + '</p>' +
        '<h3>' + esc(T.printDates) + '</h3><ul class="htl-sp-sheet-list">' + days.map(d => '<li>' + esc(pretty(d)) + '</li>').join('') + '</ul>' +
        '<p>' + esc(T.how) + '</p>';
      document.body.classList.add('htl-sp-printing');
      return true;
    }
    let wantSheet = false;
    const endPrint = () => { wantSheet = false; document.body.classList.remove('htl-sp-printing'); $('htl-sp-sheet').innerHTML = ''; };
    window.addEventListener('beforeprint', () => { if(wantSheet) buildSheet(); });
    window.addEventListener('afterprint', endPrint);
  };
})();
