/* =========================================================================
   HOW TO LEARN, MODULE 9 TOOL: "Find your bedtime window" and wind-down ideas.
   All wording is in assets/data/htl-sleep.js (HTL_MODULE.try). Nothing is saved; no network use.
   Time math is in minutes since midnight, wrapped with modulo 1440 so windows can cross midnight.
   ========================================================================= */
(function(){
  'use strict';
  const DAY = 1440, MIN_H = 8, MAX_H = 10;
  const mod = n => ((n % DAY) + DAY) % DAY;
  // "HH:MM" (24-hour, as a time input gives it) -> minutes since midnight, or null if invalid
  function parse(v){
    const m = /^(\d{1,2}):(\d{2})$/.exec(String(v || ''));
    if(!m) return null;
    const h = +m[1], mi = +m[2];
    return (h > 23 || mi > 59) ? null : h * 60 + mi;
  }
  // minutes since midnight -> "6:30 AM" (12:00 AM is midnight, 12:00 PM is noon)
  function fmt12(mins){
    const t = mod(mins), h = Math.floor(t / 60), m = t % 60;
    return ((h % 12) || 12) + ':' + String(m).padStart(2, '0') + ' ' + (h < 12 ? 'AM' : 'PM');
  }
  // wake minutes -> { from: earliest bedtime (10 h before), to: latest bedtime (8 h before) }
  function window8to10(wake){ return { from: mod(wake - MAX_H * 60), to: mod(wake - MIN_H * 60) }; }
  window.HTL_SLEEP_MATH = { parse, fmt12, window8to10 };

  window.HTL_INTERACTIVES = window.HTL_INTERACTIVES || {};
  window.HTL_INTERACTIVES.sleep = function(host){
    if(!host || typeof HTL_MODULE === 'undefined' || !window.HTL) return;
    const { esc, fmt } = window.HTL;
    const T = HTL_MODULE.try, W = T.windDown;
    host.innerHTML =
      '<div class="htl-tool"><h3>' + esc(T.title) + '</h3>' +
      '<label class="tool-label" for="htl-sleep-wake">' + esc(T.wakeLabel) + '</label>' +
      '<p class="htl-small" id="htl-sleep-help">' + esc(T.wakeHelp) + '</p>' +
      '<input class="tool-input htl-sleep-time" id="htl-sleep-wake" type="time" aria-describedby="htl-sleep-help">' +
      '<div class="htl-sleep-result" id="htl-sleep-result" role="status" aria-live="polite"><p>' + esc(T.empty) + '</p></div>' +
      '<h4>' + esc(T.windDownTitle) + '</h4><p>' + esc(T.windDownIntro) + '</p>' +
      '<ul class="htl-choices">' + W.map((w, i) => '<li><button type="button" class="htl-choice" data-i="' + i + '" aria-pressed="false">' + esc(w) + '</button></li>').join('') + '</ul>' +
      '<p class="htl-status" id="htl-sleep-status" role="status" aria-live="polite"></p>' +
      '<div class="htl-actions"><button type="button" class="tool-btn" id="htl-sleep-print">' + esc(T.printBtn) + '</button></div>' +
      '<p class="htl-privacy" id="htl-sleep-gentle">' + esc(T.gentle) + '</p>' +
      '<div class="htl-sheet" id="htl-sleep-sheet"></div></div>';
    const $ = id => document.getElementById(id);
    const wakeEl = $('htl-sleep-wake');

    function current(){
      const w = parse(wakeEl.value);
      return w == null ? null : { wake: w, win: window8to10(w) };
    }
    function drawResult(){
      const c = current();
      if(!c){ $('htl-sleep-result').innerHTML = '<p>' + esc(T.empty) + '</p>'; return; }
      const from = c.win.from, to = c.win.to;
      // a bedtime window that sits mostly in the afternoon (noon to 6 PM) probably means AM/PM is mixed up
      const odd = from >= 12 * 60 && from < 18 * 60;
      $('htl-sleep-result').innerHTML =
        '<p class="htl-sleep-wakeline">' + esc(fmt(T.resultWake, { wake: fmt12(c.wake) })) + '</p>' +
        '<p class="htl-sleep-big">' + esc(fmt(T.resultLead, { from: fmt12(from), to: fmt12(to) })) + '</p>' +
        (odd ? '<p class="htl-small">' + esc(T.daytimeNote) + '</p>' : '') +
        '<p class="htl-small">' + esc(T.fallAsleep) + '</p>';
    }
    wakeEl.addEventListener('input', drawResult);
    wakeEl.addEventListener('change', drawResult);

    const picks = () => Array.prototype.slice.call(host.querySelectorAll('.htl-choice[aria-pressed="true"]'));
    host.querySelectorAll('.htl-choice').forEach(b => b.addEventListener('click', () => {
      b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      $('htl-sleep-status').textContent = fmt(T.picked, { n: picks().length, total: W.length });
    }));

    function buildSheet(){
      const c = current(), ps = picks().map(b => W[+b.dataset.i]);
      $('htl-sleep-sheet').innerHTML = '<h2>' + esc(T.printTitle) + '</h2>' +
        '<p>' + esc(c ? fmt(T.resultWake, { wake: fmt12(c.wake) }) : T.printNoWake) + '</p>' +
        '<p><strong>' + esc(c ? fmt(T.resultLead, { from: fmt12(c.win.from), to: fmt12(c.win.to) }) : T.printNoWindow) + '</strong></p>' +
        '<p>' + esc(T.fallAsleep) + '</p><h3>' + esc(T.printWind) + '</h3>' +
        (ps.length ? '<ul>' + ps.map(p => '<li>' + esc(p) + '</li>').join('') + '</ul>' : '<p>' + esc(T.printNoWind) + '</p>') +
        '<p class="htl-small">' + esc(T.gentle) + '</p><p class="htl-small">' + esc(T.printNote) + '</p>';
      document.body.classList.add('htl-sleep-printing');
    }
    let want = false;
    const endPrint = () => { want = false; document.body.classList.remove('htl-sleep-printing'); $('htl-sleep-sheet').innerHTML = ''; };
    window.addEventListener('beforeprint', () => { if(want) buildSheet(); });
    window.addEventListener('afterprint', endPrint);
    $('htl-sleep-print').addEventListener('click', () => { want = true; try{ window.print(); }catch(e){ endPrint(); } });
  };
})();
