/* =========================================================================
   HOW TO LEARN, MODULE 2 TOOL: "Predict, then test".
   All wording is in assets/data/htl-myths.js (HTL_MODULE.try). NOTHING is saved or sent anywhere:
   no localStorage, no network. The student rates how well they think they know a topic (1-5), answers
   3 questions they wrote or 5 built-in easy ones, marks their own answers, then compares guess and result.
   ========================================================================= */
(function(){
  'use strict';
  window.HTL_INTERACTIVES = window.HTL_INTERACTIVES || {};
  window.HTL_INTERACTIVES.myths = function(host){
    if(!host || typeof HTL_MODULE === 'undefined' || !window.HTL) return;
    const { esc, escA, fmt } = window.HTL;
    const T = HTL_MODULE.try, MAX = 200, MAX_TOPIC = 80;
    const $ = id => document.getElementById(id);
    const clip = (s, n) => String(s || '').replace(/\s+/g, ' ').trim().slice(0, n);

    let pairs = '';
    for(let i = 1; i <= 3; i++){
      pairs += '<div class="htl-fields htl-myths-pair"><div><label class="tool-label" for="htl-myths-q' + i + '">' + esc(fmt(T.qLabel, { n: i })) + '</label><input class="tool-input" id="htl-myths-q' + i + '" type="text" maxlength="' + MAX + '" autocomplete="off" placeholder="' + escA(T.qPlaceholder) + '"></div>' +
        '<div><label class="tool-label" for="htl-myths-a' + i + '">' + esc(fmt(T.aLabel, { n: i })) + '</label><input class="tool-input" id="htl-myths-a' + i + '" type="text" maxlength="' + MAX + '" autocomplete="off" placeholder="' + escA(T.aPlaceholder) + '"></div></div>';
    }
    let rates = '';
    for(let n = 1; n <= 5; n++) rates += '<label class="htl-myths-opt"><input type="radio" name="htl-myths-rate" value="' + n + '" aria-label="' + escA(fmt(T.rateLabel, { n })) + '"><span aria-hidden="true">' + n + '</span></label>';

    host.innerHTML =
      '<div class="htl-tool"><h3>' + esc(T.title) + '</h3><p>' + esc(T.intro) + '</p><p class="htl-privacy">' + esc(T.privacy) + '</p>' +
      '<p class="htl-status" id="htl-myths-status" role="status" aria-live="polite"></p>' +
      '<div class="htl-myths-view" id="htl-myths-setup">' +
        '<fieldset class="htl-myths-fs"><legend>' + esc(T.modeLegend) + '</legend><div class="htl-myths-opts">' +
          '<label class="htl-myths-opt"><input type="radio" name="htl-myths-mode" value="builtin" checked>' + esc(T.modeBuiltin) + '</label>' +
          '<label class="htl-myths-opt"><input type="radio" name="htl-myths-mode" value="own">' + esc(T.modeOwn) + '</label></div></fieldset>' +
        '<div class="htl-myths-own" id="htl-myths-own" hidden><p>' + esc(T.ownIntro) + '</p>' +
          '<label class="tool-label" for="htl-myths-topic">' + esc(T.topicLabel) + '</label><input class="tool-input" id="htl-myths-topic" type="text" maxlength="' + MAX_TOPIC + '" autocomplete="off" placeholder="' + escA(T.topicPlaceholder) + '">' + pairs + '</div>' +
        '<fieldset class="htl-myths-fs"><legend>' + esc(T.rateLegend) + '</legend><p class="htl-small" style="margin:0 0 6px">' + esc(T.rateNote) + '</p><div class="htl-myths-opts htl-myths-rate">' + rates + '</div></fieldset>' +
        '<p><button type="button" class="tool-btn" id="htl-myths-start">' + esc(T.start) + '</button></p></div>' +
      '<div class="htl-myths-view" id="htl-myths-run" hidden></div></div>';

    const setup = $('htl-myths-setup'), run = $('htl-myths-run');
    const status = t => { $('htl-myths-status').textContent = t; };
    const mode = () => host.querySelector('input[name="htl-myths-mode"]:checked').value;
    const rating = () => { const r = host.querySelector('input[name="htl-myths-rate"]:checked'); return r ? +r.value : 0; };
    host.querySelectorAll('input[name="htl-myths-mode"]').forEach(r => r.addEventListener('change', () => { $('htl-myths-own').hidden = mode() !== 'own'; status(''); }));

    $('htl-myths-start').addEventListener('click', () => {
      let items, topic;
      if(mode() === 'own'){
        topic = clip($('htl-myths-topic').value, MAX_TOPIC);
        if(!topic){ status(T.needTopic); $('htl-myths-topic').focus(); return; }
        items = [];
        for(let i = 1; i <= 3; i++){
          const q = clip($('htl-myths-q' + i).value, MAX), a = clip($('htl-myths-a' + i).value, MAX);
          if(!q || !a){ status(T.needOwn); $('htl-myths-' + (q ? 'a' : 'q') + i).focus(); return; }
          items.push({ q, a });
        }
      }else{
        topic = T.builtinTopic; items = T.items.map(x => ({ q: x.q, a: x.a }));
      }
      const r = rating();
      if(!r){ status(T.needRate); host.querySelector('input[name="htl-myths-rate"]').focus(); return; }
      status(''); runTest(items, topic, r);
    });

    function runTest(items, topic, r){
      setup.hidden = true; run.hidden = false;
      const results = [];
      let idx = 0;
      const ask = () => {
        if(idx >= items.length){ finish(); return; }
        const c = items[idx];
        run.innerHTML = '<div class="htl-qcard"><p class="htl-small">' + esc(fmt(T.qOf, { n: idx + 1, total: items.length })) + '</p><h4 tabindex="-1" id="htl-myths-qh">' + esc(c.q) + '</h4><p class="htl-small">' + esc(T.think) + (idx === 0 ? ' ' + esc(T.owning) : '') + '</p>' +
          '<p><button type="button" class="tool-btn" id="htl-myths-show">' + esc(T.show) + '</button></p><div id="htl-myths-ans" role="status" aria-live="polite"></div></div>';
        $('htl-myths-qh').focus();
        $('htl-myths-show').addEventListener('click', () => {
          $('htl-myths-ans').innerHTML = '<p class="htl-answer" id="htl-myths-answer" tabindex="-1">' + esc(c.a) + '</p><p><button type="button" class="tool-btn" id="htl-myths-got">' + esc(T.gotIt) + '</button><button type="button" class="tool-btn secondary" id="htl-myths-not">' + esc(T.notYet) + '</button></p>';
          $('htl-myths-show').hidden = true; $('htl-myths-answer').focus();
          const mark = ok => { results.push({ q: c.q, a: c.a, ok }); idx++; ask(); };
          $('htl-myths-got').addEventListener('click', () => mark(true));
          $('htl-myths-not').addEventListener('click', () => mark(false));
        });
      };
      const finish = () => {
        const n = results.filter(x => x.ok).length, total = results.length, frac = total ? n / total : 0;
        const msg = (r >= 4 && frac <= 0.6) ? T.over : (r <= 2 && frac >= 0.8) ? T.under : T.match;
        run.innerHTML = '<div class="htl-qcard"><h4 tabindex="-1" id="htl-myths-qh">' + esc(T.doneTitle) + '</h4>' +
          '<p>' + esc(fmt(T.youRated, { topic, r })) + ' ' + esc(fmt(T.youGot, { n, total })) + '</p>' +
          '<ul class="htl-myths-res">' + results.map(x => '<li><b>' + esc(x.ok ? T.got : T.missed) + '</b><strong>' + esc(x.q) + '</strong><span>' + esc(x.a) + '</span></li>').join('') + '</ul>' +
          '<p>' + esc(msg) + '</p><div class="htl-gold"><p>' + esc(T.takeaway) + '</p></div>' +
          '<p><button type="button" class="tool-btn" id="htl-myths-again">' + esc(T.again) + '</button><button type="button" class="tool-btn secondary" id="htl-myths-over">' + esc(T.startOver) + '</button></p></div>';
        $('htl-myths-qh').focus();
        $('htl-myths-again').addEventListener('click', () => runTest(items, topic, r));
        $('htl-myths-over').addEventListener('click', () => { run.hidden = true; run.innerHTML = ''; setup.hidden = false; $('htl-myths-start').focus(); });
      };
      ask();
    }
  };
})();
