/* =========================================================================
   HOW TO LEARN, MODULE 1 TOOL: pick one skill and its first small practice step.
   All wording is in assets/data/htl-brain.js (HTL_MODULE.try). NOTHING is saved or sent anywhere:
   no localStorage, no network. A one-page sheet can be printed with the Print button.
   ========================================================================= */
(function(){
  'use strict';
  window.HTL_INTERACTIVES = window.HTL_INTERACTIVES || {};
  window.HTL_INTERACTIVES.brain = function(host){
    if(!host || typeof HTL_MODULE === 'undefined' || !window.HTL) return;
    const { esc, escA } = window.HTL;
    const T = HTL_MODULE.try, MAX = 200, MAX_SKILL = 80;
    const $ = id => document.getElementById(id);
    const clip = (s, n) => String(s || '').replace(/\s+/g, ' ').trim().slice(0, n);

    host.innerHTML =
      '<div class="htl-tool"><h3>' + esc(T.title) + '</h3><p>' + esc(T.intro) + '</p><p class="htl-privacy">' + esc(T.privacy) + '</p>' +
      '<h4>' + esc(T.skillTitle) + '</h4>' +
      '<p class="htl-small"><strong>' + esc(T.starterTitle) + '</strong></p><div class="htl-chips">' + T.starters.map((s, i) => '<button type="button" class="htl-chip" data-s="' + i + '">' + esc(s) + '</button>').join('') + '</div>' +
      '<label class="tool-label" for="htl-brain-skill">' + esc(T.skillLabel) + '</label><input class="tool-input" id="htl-brain-skill" type="text" maxlength="' + MAX_SKILL + '" autocomplete="off" placeholder="' + escA(T.skillPlaceholder) + '">' +
      '<h4>' + esc(T.stepsTitle) + '</h4>' +
      T.steps.map(s => '<div class="htl-brain-step"><label class="tool-label" for="htl-brain-' + escA(s.id) + '">' + esc(s.label) + '</label><p class="htl-small" id="htl-brain-' + escA(s.id) + '-h">' + esc(s.hint) + '</p>' +
        '<input class="tool-input" id="htl-brain-' + escA(s.id) + '" type="text" maxlength="' + MAX + '" autocomplete="off" aria-describedby="htl-brain-' + escA(s.id) + '-h" placeholder="' + escA(s.placeholder) + '"></div>').join('') +
      '<div class="htl-actions"><button type="button" class="tool-btn" id="htl-brain-show">' + esc(T.show) + '</button><button type="button" class="tool-btn secondary" id="htl-brain-print">' + esc(T.printBtn) + '</button><button type="button" class="tool-btn secondary" id="htl-brain-clear">' + esc(T.clear) + '</button></div>' +
      '<p class="htl-status" id="htl-brain-status" role="status" aria-live="polite"></p>' +
      '<div class="htl-brain-plan" id="htl-brain-plan" hidden></div>' +
      '<div class="htl-brain-sheet" id="htl-brain-sheet"></div></div>';

    const status = t => { $('htl-brain-status').textContent = t; };
    const vals = () => ({ skill: clip($('htl-brain-skill').value, MAX_SKILL), steps: T.steps.map(s => ({ label: s.label, v: clip($('htl-brain-' + s.id).value, MAX) })) });

    host.querySelectorAll('.htl-chip').forEach(b => b.addEventListener('click', () => {
      $('htl-brain-skill').value = T.starters[+b.dataset.s];
      status(T.chosen); $('htl-brain-' + T.steps[0].id).focus();
    }));

    $('htl-brain-show').addEventListener('click', () => {
      const d = vals();
      if(!d.skill){ status(T.needSkill); $('htl-brain-skill').focus(); return; }
      const p = $('htl-brain-plan');
      p.innerHTML = '<h4 tabindex="-1" id="htl-brain-ph">' + esc(T.planTitle) + '</h4><dl><dt>' + esc(T.planSkill) + '</dt><dd>' + esc(d.skill) + '</dd>' +
        d.steps.map(s => '<dt>' + esc(s.label) + '</dt><dd>' + esc(s.v || T.blank) + '</dd>').join('') + '</dl><p class="htl-small">' + esc(T.planTip) + '</p>';
      p.hidden = false; status(T.planShown); $('htl-brain-ph').focus();
    });

    $('htl-brain-clear').addEventListener('click', () => {
      $('htl-brain-skill').value = ''; T.steps.forEach(s => { $('htl-brain-' + s.id).value = ''; });
      $('htl-brain-plan').hidden = true; $('htl-brain-plan').innerHTML = ''; status(T.cleared); $('htl-brain-skill').focus();
    });

    /* ---------- print one page (only when the Print button was used) ---------- */
    function buildSheet(){
      const d = vals();
      $('htl-brain-sheet').innerHTML = '<h2>' + esc(T.printTitle) + '</h2><dl><dt>' + esc(T.planSkill) + '</dt><dd>' + esc(d.skill) + '</dd>' +
        d.steps.map(s => '<dt>' + esc(s.label) + '</dt><dd>' + esc(s.v) + '</dd>').join('') + '<dt>' + esc(T.printCheck) + '</dt><dd></dd></dl>';
      document.body.classList.add('htl-brain-printing');
    }
    let wantSheet = false;
    const endPrint = () => { wantSheet = false; document.body.classList.remove('htl-brain-printing'); $('htl-brain-sheet').innerHTML = ''; };
    window.addEventListener('beforeprint', () => { if(wantSheet) buildSheet(); });
    window.addEventListener('afterprint', endPrint);
    $('htl-brain-print').addEventListener('click', () => { wantSheet = true; try{ window.print(); }catch(e){ endPrint(); } });
  };
})();
