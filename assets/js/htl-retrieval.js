/* =========================================================================
   HOW TO LEARN, MODULE 3 TOOLS: the brain-dump timer and the self-quiz builder.
   All wording is in assets/data/htl-retrieval.js (HTL_MODULE.try). The brain-dump box is never saved.
   The student's quiz cards save ONLY in their own browser under "moeller-ex-htl-quiz" (try/catch, with a
   visible warning if the browser blocks saving) and can be cleared with the Clear my data button.
   ========================================================================= */
(function(){
  'use strict';
  window.HTL_INTERACTIVES = window.HTL_INTERACTIVES || {};
  window.HTL_INTERACTIVES.retrieval = function(host){
    if(!host || typeof HTL_MODULE === 'undefined' || !window.HTL) return;
    const { esc, escA, fmt } = window.HTL;
    const T = HTL_MODULE.try, DB = T.dump, Q = T.quiz;
    const KEY = 'moeller-ex-htl-quiz', MAX_CARDS = 30, MAX_LEN = 200;
    const clip = s => String(s).replace(/\s+/g, ' ').trim().slice(0, MAX_LEN);

    host.innerHTML =
      '<div class="htl-tool"><h3>' + esc(DB.title) + '</h3><ol class="htl-list">' + DB.steps.map(s => '<li>' + esc(s) + '</li>').join('') + '</ol>' +
      '<div class="htl-timer"><span class="htl-timer-l" id="htl-tlabel">' + esc(DB.timerLabel) + '</span> <span class="htl-timer-t" id="htl-time" role="timer" aria-labelledby="htl-tlabel">5:00</span>' +
      '<button type="button" class="tool-btn" id="htl-tstart">' + esc(DB.timerStart) + '</button><button type="button" class="tool-btn secondary" id="htl-treset">' + esc(DB.timerReset) + '</button></div>' +
      '<p class="htl-status" id="htl-tstatus" role="status" aria-live="polite"></p>' +
      '<label class="tool-label" for="htl-dump">' + esc(DB.boxLabel) + '</label><textarea class="tool-textarea" id="htl-dump" rows="5" placeholder="' + escA(DB.boxPlaceholder) + '"></textarea>' +
      '<p><button type="button" class="tool-btn secondary" id="htl-dclear">' + esc(DB.clearBox) + '</button></p></div>' +
      '<div class="htl-tool" id="htl-quiztool"><h3>' + esc(Q.title) + '</h3><p>' + esc(Q.intro) + '</p><p class="htl-privacy">' + esc(Q.privacy) + '</p>' +
      '<p class="htl-warn" id="htl-blocked" role="alert" hidden>' + esc(Q.blocked) + '</p>' +
      '<div id="htl-build">' +
        '<p class="htl-small"><strong>' + esc(Q.starterTitle) + '</strong></p><div class="htl-chips">' + Q.starters.map((s, i) => '<button type="button" class="htl-chip" data-s="' + i + '">' + esc(s) + '</button>').join('') + '</div>' +
        '<div class="htl-fields"><div><label class="tool-label" for="htl-q">' + esc(Q.qLabel) + '</label><input class="tool-input" id="htl-q" type="text" maxlength="' + MAX_LEN + '" autocomplete="off" placeholder="' + escA(Q.qPlaceholder) + '"></div>' +
        '<div><label class="tool-label" for="htl-a">' + esc(Q.aLabel) + '</label><input class="tool-input" id="htl-a" type="text" maxlength="' + MAX_LEN + '" autocomplete="off" placeholder="' + escA(Q.aPlaceholder) + '"></div></div>' +
        '<p><button type="button" class="tool-btn" id="htl-add">' + esc(Q.add) + '</button></p>' +
        '<h4>' + esc(Q.yourCards) + '</h4><ul class="htl-cards" id="htl-cards"></ul><p class="htl-small" id="htl-none"></p>' +
        '<div class="htl-actions"><button type="button" class="tool-btn" id="htl-start">' + esc(Q.start) + '</button><button type="button" class="tool-btn secondary" id="htl-print">' + esc(Q.printBtn) + '</button><button type="button" class="tool-btn secondary" id="htl-clear">' + esc(Q.clear) + '</button></div>' +
        '<div class="htl-confirm" id="htl-confirm" role="group" aria-labelledby="htl-confirm-t" hidden><span id="htl-confirm-t">' + esc(Q.clearAsk) + '</span> <button type="button" class="tool-btn" id="htl-cyes">' + esc(Q.clearYes) + '</button><button type="button" class="tool-btn secondary" id="htl-cno">' + esc(Q.clearNo) + '</button></div>' +
      '</div>' +
      '<div id="htl-run" hidden></div>' +
      '<p class="htl-status" id="htl-qstatus" role="status" aria-live="polite"></p><div class="htl-sheet" id="htl-sheet"></div></div>';

    const $ = id => document.getElementById(id);

    /* ---------- brain dump: timer (nothing here is saved) ---------- */
    let tLeft = 300, tId = null;
    const show = () => { $('htl-time').textContent = Math.floor(tLeft / 60) + ':' + String(tLeft % 60).padStart(2, '0'); };
    const stopT = () => { clearInterval(tId); tId = null; $('htl-tstart').textContent = DB.timerStart; };
    $('htl-tstart').addEventListener('click', () => {
      if(tId){ stopT(); $('htl-tstatus').textContent = fmt(DB.timerStopped, { t: $('htl-time').textContent }); return; }
      if(tLeft <= 0) tLeft = 300;
      $('htl-tstatus').textContent = DB.timerStarted; $('htl-tstart').textContent = DB.timerStop; show();
      tId = setInterval(() => { tLeft--; show(); if(tLeft <= 0){ stopT(); $('htl-tstatus').textContent = DB.timerDone; } }, 1000);
    });
    $('htl-treset').addEventListener('click', () => { stopT(); tLeft = 300; show(); $('htl-tstatus').textContent = ''; });
    $('htl-dclear').addEventListener('click', () => { $('htl-dump').value = ''; $('htl-dump').focus(); });

    /* ---------- quiz cards: saved on this device only ---------- */
    let cards = [], storageOK = true;
    try{ localStorage.setItem(KEY + '-probe', '1'); localStorage.removeItem(KEY + '-probe'); }catch(e){ storageOK = false; }
    if(storageOK){
      try{
        const raw = localStorage.getItem(KEY), o = raw ? JSON.parse(raw) : null;
        if(o && typeof o === 'object' && !Array.isArray(o) && Array.isArray(o.cards)){
          o.cards.slice(0, MAX_CARDS).forEach(c => { try{ if(c && typeof c === 'object' && typeof c.q === 'string' && typeof c.a === 'string'){ const q = clip(c.q), a = clip(c.a); if(q && a) cards.push({ q, a }); } }catch(e){} });
        }
      }catch(e){ /* unreadable saved data: start fresh, no warning */ }
    }
    if(!storageOK) $('htl-blocked').hidden = false;
    const status = t => { $('htl-qstatus').textContent = t; };
    function save(msg){
      if(!storageOK){ $('htl-blocked').hidden = false; return; }
      try{
        if(!cards.length) localStorage.removeItem(KEY); else localStorage.setItem(KEY, JSON.stringify({ v: 1, cards }));
        if(msg) status(msg);
      }catch(e){ storageOK = false; $('htl-blocked').hidden = false; }
    }
    function drawCards(){
      $('htl-cards').innerHTML = cards.map((c, i) => '<li class="htl-card"><div><strong>' + esc(c.q) + '</strong><span>' + esc(c.a) + '</span></div>' +
        '<button type="button" class="tool-btn secondary" data-i="' + i + '" aria-label="' + escA(Q.remove + ': ' + c.q.slice(0, 40)) + '">' + esc(Q.remove) + '</button></li>').join('');
      $('htl-none').textContent = cards.length ? '' : Q.none;
    }
    drawCards();
    $('htl-cards').addEventListener('click', e => {
      const b = e.target.closest('button[data-i]'); if(!b) return;
      cards.splice(+b.dataset.i, 1); drawCards(); save(Q.removed);
      const next = $('htl-cards').querySelector('button'); (next || $('htl-q')).focus();
    });
    host.querySelectorAll('.htl-chip').forEach(b => b.addEventListener('click', () => { $('htl-q').value = Q.starters[+b.dataset.s]; $('htl-a').focus(); }));
    $('htl-add').addEventListener('click', () => {
      const q = clip($('htl-q').value), a = clip($('htl-a').value);
      if(!q || !a){ status(Q.needBoth); return; }
      if(cards.length >= MAX_CARDS){ status(Q.tooMany); return; }
      cards.push({ q, a }); $('htl-q').value = ''; $('htl-a').value = ''; drawCards(); save(Q.added + (storageOK ? ' ' + Q.saved : '')); $('htl-q').focus();
    });
    [$('htl-q'), $('htl-a')].forEach(i => i.addEventListener('keydown', e => { if(e.key === 'Enter'){ e.preventDefault(); $('htl-add').click(); } }));

    /* clear my data (two steps) */
    $('htl-clear').addEventListener('click', () => { $('htl-confirm').hidden = false; $('htl-cno').focus(); });
    $('htl-cno').addEventListener('click', () => { $('htl-confirm').hidden = true; $('htl-clear').focus(); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape' && !$('htl-confirm').hidden){ $('htl-confirm').hidden = true; $('htl-clear').focus(); } });
    $('htl-cyes').addEventListener('click', () => { cards = []; drawCards(); try{ localStorage.removeItem(KEY); }catch(e){} $('htl-confirm').hidden = true; status(Q.cleared); $('htl-clear').focus(); });

    /* ---------- quiz mode ---------- */
    const run = $('htl-run'), build = $('htl-build');
    const shuffle = a => { a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    function startQuiz(){
      if(!cards.length){ status(Q.needCards); return; }
      const queue = shuffle(cards.map((c, i) => i)), missed = new Set(), total = cards.length;
      let step = 0;
      build.hidden = true; run.hidden = false;
      const ask = () => {
        if(!queue.length){ done(); return; }
        const c = cards[queue[0]];
        run.innerHTML = '<div class="htl-qcard"><p class="htl-small">' + esc(Q.question) + ' ' + Math.min(++step, 99) + '</p><h4 tabindex="-1" id="htl-qh">' + esc(c.q) + '</h4><p class="htl-small">' + esc(Q.think) + '</p>' +
          '<p><button type="button" class="tool-btn" id="htl-show">' + esc(Q.show) + '</button></p><div id="htl-ans" role="status" aria-live="polite"></div></div>';
        $('htl-qh').focus();
        $('htl-show').addEventListener('click', () => {
          $('htl-ans').innerHTML = '<p class="htl-answer" id="htl-answer" tabindex="-1">' + esc(c.a) + '</p><p><button type="button" class="tool-btn" id="htl-got">' + esc(Q.gotIt) + '</button><button type="button" class="tool-btn secondary" id="htl-not">' + esc(Q.notYet) + '</button></p>';
          $('htl-show').hidden = true; $('htl-answer').focus();
          $('htl-got').addEventListener('click', () => { queue.shift(); ask(); });
          $('htl-not').addEventListener('click', () => { const i = queue.shift(); missed.add(i); queue.push(i); ask(); });
        });
      };
      const done = () => {
        run.innerHTML = '<div class="htl-qcard"><h4 tabindex="-1" id="htl-qh">' + esc(Q.doneTitle) + '</h4><p>' + esc(fmt(Q.doneText, { n: total - missed.size, total })) + '</p>' +
          '<p><button type="button" class="tool-btn" id="htl-again">' + esc(Q.again) + '</button><button type="button" class="tool-btn secondary" id="htl-edit">' + esc(Q.back) + '</button></p></div>';
        $('htl-qh').focus();
        $('htl-again').addEventListener('click', startQuiz);
        $('htl-edit').addEventListener('click', () => { run.hidden = true; build.hidden = false; $('htl-q').focus(); });
      };
      ask();
    }
    $('htl-start').addEventListener('click', startQuiz);

    /* ---------- print the cards (button, or a plain Ctrl+P) ---------- */
    function buildSheet(){
      $('htl-sheet').innerHTML = '<h2>' + esc(Q.printTitle) + '</h2><table class="htl-ptable"><thead><tr><th scope="col">' + esc(Q.qLabel) + '</th><th scope="col">' + esc(Q.aLabel) + '</th></tr></thead><tbody>' +
        (cards.length ? cards : [{ q: '', a: '' }]).map(c => '<tr><td>' + esc(c.q) + '</td><td>' + esc(c.a) + '</td></tr>').join('') + '</tbody></table>';
      document.body.classList.add('htl-printing');
    }
    let wantSheet = false;
    const endPrint = () => { wantSheet = false; document.body.classList.remove('htl-printing'); $('htl-sheet').innerHTML = ''; };
    // Only the Print my cards button prints the card sheet; a plain Ctrl+P prints the whole page as usual.
    window.addEventListener('beforeprint', () => { if(wantSheet) buildSheet(); }); window.addEventListener('afterprint', endPrint);
    $('htl-print').addEventListener('click', () => { wantSheet = true; try{ window.print(); }catch(e){ endPrint(); } });
  };
})();
