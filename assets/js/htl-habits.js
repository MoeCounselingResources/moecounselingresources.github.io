/* =========================================================================
   HOW TO LEARN, MODULE 7 TOOL: "Build an if-then plan" (up to 3 plans).
   All wording is in assets/data/htl-habits.js (HTL_MODULE.try). NOTHING is saved: no localStorage, no cookies,
   no network. Plans exist only in memory and on the page until the student reloads or leaves.
   ========================================================================= */
(function(){
  'use strict';
  window.HTL_INTERACTIVES = window.HTL_INTERACTIVES || {};
  window.HTL_INTERACTIVES.habits = function(host){
    if(!host || typeof HTL_MODULE === 'undefined' || !window.HTL) return;
    const { esc, escA, fmt } = window.HTL;
    const T = HTL_MODULE.try, MAX = 100, MAX_PLANS = 3, SHORT_WORDS = 9;
    const clip = s => String(s).replace(/\s+/g, ' ').trim().slice(0, MAX);
    const cleanWhen = s => clip(s).replace(/^when\s+/i, '').replace(/[.,!?\s]+$/, '');
    const cleanAct = s => clip(s).replace(/^i\s+will\s+/i, '').replace(/[.,!?\s]+$/, '');
    const isLong = a => a.split(/\s+/).filter(Boolean).length > SHORT_WORDS;
    const $ = id => document.getElementById(id);

    host.innerHTML =
      '<div class="htl-tool"><h3>' + esc(T.title) + '</h3><p>' + esc(T.intro) + '</p><p class="htl-habits-note">' + esc(T.honest) + '</p><p class="htl-privacy">' + esc(T.privacy) + '</p>' +
      '<h4>' + esc(T.whenTitle) + '</h4><div class="htl-chips" role="group" aria-label="' + escA(T.whenTitle) + '">' + T.whenChips.map((s, i) => '<button type="button" class="htl-chip" data-k="w" data-i="' + i + '">' + esc(s) + '</button>').join('') + '</div>' +
      '<label class="tool-label" for="htl-h-when">' + esc(T.whenLabel) + '</label><input class="tool-input" id="htl-h-when" type="text" maxlength="' + MAX + '" autocomplete="off" placeholder="' + escA(T.whenPlaceholder) + '">' +
      '<h4>' + esc(T.actionTitle) + '</h4><div class="htl-chips" role="group" aria-label="' + escA(T.actionTitle) + '">' + T.actionChips.map((s, i) => '<button type="button" class="htl-chip" data-k="a" data-i="' + i + '">' + esc(s) + '</button>').join('') + '</div>' +
      '<label class="tool-label" for="htl-h-act">' + esc(T.actionLabel) + '</label><input class="tool-input" id="htl-h-act" type="text" maxlength="' + MAX + '" autocomplete="off" aria-describedby="htl-h-hint" placeholder="' + escA(T.actionPlaceholder) + '">' +
      '<p class="htl-small htl-habits-hint" id="htl-h-hint" hidden>' + esc(T.smallHint) + '</p>' +
      '<p class="htl-habits-preview" id="htl-h-preview" aria-hidden="true"></p>' +
      '<p><button type="button" class="tool-btn" id="htl-h-add">' + esc(T.add) + '</button></p>' +
      '<p class="htl-status" id="htl-h-status" role="status" aria-live="polite"></p>' +
      '<h4>' + esc(T.yourPlans) + '</h4><ul class="htl-cards htl-habits-plans" id="htl-h-plans"></ul><p class="htl-small" id="htl-h-none"></p>' +
      '<div class="htl-actions"><button type="button" class="tool-btn" id="htl-h-print">' + esc(T.printBtn) + '</button><button type="button" class="tool-btn secondary" id="htl-h-clear">' + esc(T.clear) + '</button></div>' +
      '<div class="htl-sheet" id="htl-sheet"></div></div>';

    const status = t => { $('htl-h-status').textContent = t; };
    let plans = [];

    const hint = () => { $('htl-h-hint').hidden = !isLong(cleanAct($('htl-h-act').value)); };
    const preview = () => {
      const w = cleanWhen($('htl-h-when').value), a = cleanAct($('htl-h-act').value);
      $('htl-h-preview').textContent = (w || a) ? fmt(T.planLine, { w: w || '...', a: a || '...' }) : '';
    };
    ['htl-h-when', 'htl-h-act'].forEach(id => $(id).addEventListener('input', () => { hint(); preview(); }));
    host.querySelectorAll('.htl-chip').forEach(b => b.addEventListener('click', () => {
      const w = b.dataset.k === 'w', f = w ? $('htl-h-when') : $('htl-h-act');
      f.value = (w ? T.whenChips : T.actionChips)[+b.dataset.i]; hint(); preview(); (w ? $('htl-h-act') : $('htl-h-add')).focus();
    }));

    function draw(){
      $('htl-h-plans').innerHTML = plans.map((p, i) => '<li class="htl-card"><div><strong>' + esc(fmt(T.planLine, p)) + '</strong></div>' +
        '<button type="button" class="tool-btn secondary" data-i="' + i + '" aria-label="' + escA(T.remove + ': ' + fmt(T.planLine, p).slice(0, 60)) + '">' + esc(T.remove) + '</button></li>').join('');
      $('htl-h-none').textContent = plans.length ? '' : T.none;
    }
    draw();

    function add(){
      const w = cleanWhen($('htl-h-when').value), a = cleanAct($('htl-h-act').value);
      if(!w || !a){ status(T.needBoth); (w ? $('htl-h-act') : $('htl-h-when')).focus(); return; }
      if(plans.length >= MAX_PLANS){ status(T.tooMany); return; }
      plans.push({ w, a });
      $('htl-h-when').value = ''; $('htl-h-act').value = ''; hint(); preview(); draw();
      status(T.added + (isLong(a) ? ' ' + T.smallHint : ''));
      $('htl-h-when').focus();
    }
    $('htl-h-add').addEventListener('click', add);
    [$('htl-h-when'), $('htl-h-act')].forEach(i => i.addEventListener('keydown', e => { if(e.key === 'Enter'){ e.preventDefault(); add(); } }));
    $('htl-h-plans').addEventListener('click', e => {
      const b = e.target.closest('button[data-i]'); if(!b) return;
      plans.splice(+b.dataset.i, 1); draw(); status(T.removed);
      (document.querySelector('#htl-h-plans button') || $('htl-h-when')).focus();
    });
    $('htl-h-clear').addEventListener('click', () => {
      plans = []; $('htl-h-when').value = ''; $('htl-h-act').value = ''; hint(); preview(); draw(); status(T.cleared); $('htl-h-when').focus();
    });

    /* ---------- print: only when the Print button was used; one page ---------- */
    let wantSheet = false;
    function buildSheet(){
      $('htl-sheet').innerHTML = '<h2>' + esc(T.printTitle) + '</h2><ol class="htl-habits-plist">' + plans.map(p => '<li>' + esc(fmt(T.planLine, p)) + '</li>').join('') + '</ol>' +
        '<p>' + esc(T.honest) + '</p><p class="htl-small">' + esc(T.printFoot) + '</p>';
      document.body.classList.add('htl-habits-printing');
    }
    function endPrint(){ wantSheet = false; document.body.classList.remove('htl-habits-printing'); $('htl-sheet').innerHTML = ''; }
    window.addEventListener('beforeprint', () => { if(wantSheet) buildSheet(); });
    window.addEventListener('afterprint', endPrint);
    $('htl-h-print').addEventListener('click', () => {
      if(!plans.length){ status(T.needPlan); return; }
      wantSheet = true; try{ window.print(); }catch(e){ endPrint(); }
    });
  };
})();
