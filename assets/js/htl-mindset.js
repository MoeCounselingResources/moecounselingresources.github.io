/* =========================================================================
   HOW TO LEARN, MODULE 6 TOOL: "Add a strategy to your not yet".
   All wording is in assets/data/htl-mindset.js (HTL_MODULE.try). NOTHING is saved: no localStorage, no cookies,
   no network. The card exists only in memory and on the page until the student reloads or leaves.
   ========================================================================= */
(function(){
  'use strict';
  window.HTL_INTERACTIVES = window.HTL_INTERACTIVES || {};
  window.HTL_INTERACTIVES.mindset = function(host){
    if(!host || typeof HTL_MODULE === 'undefined' || !window.HTL) return;
    const { esc, escA, fmt } = window.HTL;
    const T = HTL_MODULE.try, MAX = 100;
    const clip = s => String(s).replace(/\s+/g, ' ').trim().slice(0, MAX);
    /* "I can't solve x" / "cannot solve x" / "solve x." -> "solve x" */
    const cleanHard = s => clip(s).replace(/^i\s*(can['’]?t|cannot|can\s+not)\s+/i, '').replace(/(^|\s)yet\s*[.!?]*$/i, '').replace(/[.!?\s]+$/, '');
    const $ = id => document.getElementById(id);

    host.innerHTML =
      '<div class="htl-tool"><h3>' + esc(T.title) + '</h3><p>' + esc(T.intro) + '</p><p class="htl-privacy">' + esc(T.privacy) + '</p>' +
      '<div id="htl-m-form">' +
        '<h4>' + esc(T.step1) + '</h4>' +
        '<label class="tool-label" for="htl-m-hard">' + esc(T.hardLabel) + '</label>' +
        '<input class="tool-input" id="htl-m-hard" type="text" maxlength="' + MAX + '" autocomplete="off" aria-describedby="htl-m-hardhelp" placeholder="' + escA(T.hardPlaceholder) + '">' +
        '<p class="htl-small" id="htl-m-hardhelp">' + esc(T.hardHelp) + '</p>' +
        '<h4>' + esc(T.step2) + '</h4>' +
        '<fieldset class="htl-mindset-strats"><legend class="tool-label">' + esc(T.stratLegend) + '</legend>' +
        T.strategies.map((s, i) => '<label class="htl-mindset-opt"><input type="radio" name="htl-m-strat" value="' + i + '"><span>' + esc(s) + '</span></label>').join('') + '</fieldset>' +
        '<label class="tool-label" for="htl-m-own">' + esc(T.ownLabel) + '</label>' +
        '<input class="tool-input" id="htl-m-own" type="text" maxlength="' + MAX + '" autocomplete="off" placeholder="' + escA(T.ownPlaceholder) + '">' +
        '<h4>' + esc(T.step3) + '</h4>' +
        '<label class="tool-label" for="htl-m-when">' + esc(T.whenLabel) + '</label>' +
        '<input class="tool-input" id="htl-m-when" type="text" maxlength="' + MAX + '" autocomplete="off" placeholder="' + escA(T.whenPlaceholder) + '">' +
        '<p><button type="button" class="tool-btn" id="htl-m-make">' + esc(T.make) + '</button></p>' +
      '</div>' +
      '<p class="htl-status" id="htl-m-status" role="status" aria-live="polite"></p>' +
      '<div id="htl-m-result"></div>' +
      '<div class="htl-sheet" id="htl-sheet"></div></div>';

    const status = t => { $('htl-m-status').textContent = t; };
    let card = null;

    /* typing your own strategy clears the chosen one, and choosing one clears the typed one */
    host.querySelectorAll('input[name="htl-m-strat"]').forEach(r => r.addEventListener('change', () => { $('htl-m-own').value = ''; }));
    $('htl-m-own').addEventListener('input', () => { if($('htl-m-own').value.trim()) host.querySelectorAll('input[name="htl-m-strat"]').forEach(r => { r.checked = false; }); });
    host.querySelectorAll('#htl-m-form input[type=text]').forEach(i => i.addEventListener('keydown', e => { if(e.key === 'Enter'){ e.preventDefault(); $('htl-m-make').click(); } }));

    $('htl-m-make').addEventListener('click', () => {
      const hard = cleanHard($('htl-m-hard').value);
      const own = clip($('htl-m-own').value);
      const sel = host.querySelector('input[name="htl-m-strat"]:checked');
      const strat = own || (sel ? T.strategies[+sel.value] : '');
      const when = clip($('htl-m-when').value);
      if(!hard){ status(T.needHard); $('htl-m-hard').focus(); return; }
      if(!strat){ status(T.needStrat); (host.querySelector('input[name="htl-m-strat"]') || $('htl-m-own')).focus(); return; }
      if(!when){ status(T.needWhen); $('htl-m-when').focus(); return; }
      card = { hard, strat, when };
      showCard();
    });

    function showCard(){
      $('htl-m-form').hidden = true;
      $('htl-m-result').innerHTML =
        '<div class="htl-qcard htl-mindset-card"><h4 tabindex="-1" id="htl-m-ch">' + esc(T.cardTitle) + '</h4>' +
        '<p class="htl-mindset-big">' + esc(fmt(T.cantYet, { x: card.hard })) + '</p>' +
        '<p><strong>' + esc(T.tryLine) + ':</strong> ' + esc(card.strat) + '</p>' +
        '<p><strong>' + esc(T.whenLine) + ':</strong> ' + esc(card.when) + '</p>' +
        '<p class="htl-small">' + esc(T.cardNote) + '</p></div>' +
        '<div class="htl-actions"><button type="button" class="tool-btn" id="htl-m-print">' + esc(T.printBtn) + '</button><button type="button" class="tool-btn secondary" id="htl-m-again">' + esc(T.again) + '</button></div>';
      status(T.made);
      $('htl-m-ch').focus();
      $('htl-m-print').addEventListener('click', () => { wantSheet = true; try{ window.print(); }catch(e){ endPrint(); } });
      $('htl-m-again').addEventListener('click', () => {
        card = null; $('htl-m-result').innerHTML = '';
        $('htl-m-hard').value = ''; $('htl-m-own').value = ''; $('htl-m-when').value = '';
        host.querySelectorAll('input[name="htl-m-strat"]').forEach(r => { r.checked = false; });
        $('htl-m-form').hidden = false; status(T.cleared); $('htl-m-hard').focus();
      });
    }

    /* ---------- print: only when the Print button was used; one page ---------- */
    let wantSheet = false;
    function buildSheet(){
      if(!card) return;
      $('htl-sheet').innerHTML = '<h2>' + esc(T.printTitle) + '</h2><p class="htl-mindset-big">' + esc(fmt(T.cantYet, { x: card.hard })) + '</p>' +
        '<p><strong>' + esc(T.tryLine) + ':</strong> ' + esc(card.strat) + '</p><p><strong>' + esc(T.whenLine) + ':</strong> ' + esc(card.when) + '</p>' +
        '<p>' + esc(T.cardNote) + '</p><p class="htl-small">' + esc(T.printFoot) + '</p>';
      document.body.classList.add('htl-mindset-printing');
    }
    function endPrint(){ wantSheet = false; document.body.classList.remove('htl-mindset-printing'); $('htl-sheet').innerHTML = ''; }
    window.addEventListener('beforeprint', () => { if(wantSheet) buildSheet(); });
    window.addEventListener('afterprint', endPrint);
  };
})();
