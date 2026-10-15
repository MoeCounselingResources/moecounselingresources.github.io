/* =========================================================================
   HOW TO LEARN, MODULE 8 TOOL: "Set up your study spot" checklist.
   All wording is in assets/data/htl-focus.js (HTL_MODULE.try). Ticks live in memory only; nothing is saved.
   ========================================================================= */
(function(){
  'use strict';
  window.HTL_INTERACTIVES = window.HTL_INTERACTIVES || {};
  window.HTL_INTERACTIVES.focus = function(host){
    if(!host || typeof HTL_MODULE === 'undefined' || !window.HTL) return;
    const { esc, escA, fmt } = window.HTL;
    const T = HTL_MODULE.try, S = T.steps, total = S.length;
    host.innerHTML =
      '<div class="htl-tool"><h3>' + esc(T.title) + '</h3><p>' + esc(T.intro) + '</p>' +
      '<fieldset class="htl-focus-set"><legend class="htl-small">' + esc(T.groupLabel) + '</legend><ul class="htl-focus-list">' +
      S.map((s, i) => '<li class="htl-focus-item"><input type="checkbox" id="htl-focus-c' + i + '" data-i="' + i + '"><label for="htl-focus-c' + i + '"><strong>' + esc(s.label) + '</strong><span class="htl-focus-why">' + esc(s.why) + '</span></label></li>').join('') +
      '</ul></fieldset>' +
      '<p class="htl-focus-count"><strong>' + esc(T.countLabel) + ': <span id="htl-focus-n">0</span> ' + esc(T.of) + ' ' + total + '</strong></p>' +
      '<p class="htl-status" id="htl-focus-status" role="status" aria-live="polite">' + esc(T.none) + '</p>' +
      '<div class="htl-actions"><button type="button" class="tool-btn" id="htl-focus-print">' + esc(T.printBtn) + '</button></div>' +
      '<div class="htl-sheet" id="htl-focus-sheet"></div></div>';
    const $ = id => document.getElementById(id);
    const boxes = () => Array.prototype.slice.call(host.querySelectorAll('input[type=checkbox]'));
    function update(){
      const n = boxes().filter(b => b.checked).length;
      $('htl-focus-n').textContent = n;
      $('htl-focus-status').textContent = fmt(T.countSr, { n: n, total: total }) + ' ' + (n === 0 ? T.none : n === total ? T.all : T.some);
    }
    host.addEventListener('change', e => { if(e.target && e.target.matches('input[type=checkbox]')) update(); });

    function buildSheet(){
      const bs = boxes();
      $('htl-focus-sheet').innerHTML = '<h2>' + esc(T.printTitle) + '</h2><ul class="htl-focus-plist">' +
        S.map((s, i) => '<li><span class="htl-focus-pbox" aria-hidden="true">' + (bs[i] && bs[i].checked ? '&#10003;' : '') + '</span><span><strong>' + esc(s.label) + '</strong><br>' + esc(s.why) + '</span></li>').join('') +
        '</ul><p>' + esc(T.printNote) + '</p><p class="htl-small">' + esc(T.printPrivacy) + '</p>';
      document.body.classList.add('htl-focus-printing');
    }
    let want = false;
    const endPrint = () => { want = false; document.body.classList.remove('htl-focus-printing'); $('htl-focus-sheet').innerHTML = ''; };
    window.addEventListener('beforeprint', () => { if(want) buildSheet(); });
    window.addEventListener('afterprint', endPrint);
    $('htl-focus-print').addEventListener('click', () => { want = true; try{ window.print(); }catch(e){ endPrint(); } });
    update();
    $('htl-focus-status').textContent = T.none;
  };
})();
