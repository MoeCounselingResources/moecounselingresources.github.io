/* =========================================================================
   HOW TO LEARN, MODULE 5 TOOL: "Mix your practice set".
   All wording is in assets/data/htl-interleaving.js (HTL_MODULE.try). Everything stays in memory: nothing typed
   here is saved, and nothing is sent anywhere.
   ========================================================================= */
(function(){
  'use strict';
  window.HTL_INTERACTIVES = window.HTL_INTERACTIVES || {};
  window.HTL_INTERACTIVES.interleaving = function(host){
    if(!host || typeof HTL_MODULE === 'undefined' || !window.HTL) return;
    const { esc, escA, fmt } = window.HTL;
    const T = HTL_MODULE.try;
    const MIN_T = 2, MAX_T = 4, MAX_LEN = 60, $ = id => document.getElementById(id);
    let nTypes = MIN_T, items = [], mixed = [], mixedClean = true;

    const counts = [1, 2, 3, 4, 5, 6];
    const rowHtml = i => '<div class="htl-il-row" data-row="' + i + '">' +
      '<div><label class="tool-label" for="htl-il-t' + i + '">' + esc(fmt(T.typeLabel, { i: i + 1 })) + '</label><input class="tool-input" id="htl-il-t' + i + '" type="text" maxlength="' + MAX_LEN + '" autocomplete="off" placeholder="' + escA(T.typePlaceholders[i] || '') + '"></div>' +
      '<div><label class="tool-label" for="htl-il-c' + i + '">' + esc(fmt(T.countLabel, { i: i + 1 })) + '</label><select class="tool-input" id="htl-il-c' + i + '">' + counts.map(c => '<option value="' + c + '"' + (c === 2 ? ' selected' : '') + '>' + c + '</option>').join('') + '</select></div>' +
      '<div class="htl-il-rm"><button type="button" class="tool-btn secondary" data-rm="' + i + '" aria-label="' + escA(fmt(T.removeType, { i: i + 1 })) + '">' + esc(T.remove) + '</button></div></div>';

    host.innerHTML =
      '<div class="htl-tool"><h3>' + esc(T.title) + '</h3><p>' + esc(T.intro) + '</p><p class="htl-privacy">' + esc(T.noSave) + '</p>' +
      '<div class="htl-il-rows" id="htl-il-rows"></div>' +
      '<div class="htl-actions"><button type="button" class="tool-btn secondary" id="htl-il-add">' + esc(T.addType) + '</button><button type="button" class="tool-btn" id="htl-il-make">' + esc(T.make) + '</button></div>' +
      '<p class="htl-status" id="htl-il-status" role="status" aria-live="polite"></p>' +
      '<div id="htl-il-out" hidden></div>' +
      '<div class="htl-sheet" id="htl-il-sheet"></div></div>';

    const status = t => { $('htl-il-status').textContent = t; };
    const rows = $('htl-il-rows');

    // Keep what was typed when rows are added or removed.
    function readRows(){ const r = []; for(let i = 0; i < MAX_T; i++){ const t = $('htl-il-t' + i); if(t) r.push({ t: t.value, c: $('htl-il-c' + i).value }); } return r; }
    function drawRows(vals, focusId){
      rows.innerHTML = Array.from({ length: nTypes }, (_, i) => rowHtml(i)).join('');
      vals.slice(0, nTypes).forEach((v, i) => { $('htl-il-t' + i).value = v.t; $('htl-il-c' + i).value = v.c; });
      rows.querySelectorAll('[data-rm]').forEach(b => { b.hidden = nTypes <= MIN_T; });
      $('htl-il-add').disabled = nTypes >= MAX_T;
      if(focusId && $(focusId)) $(focusId).focus();
    }
    drawRows([]);
    $('htl-il-add').addEventListener('click', () => {
      if(nTypes >= MAX_T){ status(T.maxTypes); return; }
      const v = readRows(); nTypes++; drawRows(v, 'htl-il-t' + (nTypes - 1)); status(fmt(T.added, { n: nTypes }));
    });
    rows.addEventListener('click', e => {
      const b = e.target.closest('button[data-rm]'); if(!b) return;
      if(nTypes <= MIN_T){ status(T.minTypes); return; }
      const at = +b.dataset.rm, v = readRows(); v.splice(at, 1); nTypes--; drawRows(v, 'htl-il-t' + Math.min(at, nTypes - 1)); status(T.removed);
    });

    /* ---------- ordering ---------- */
    const shuffle = a => { a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    const hasRepeat = a => a.some((x, i) => i > 0 && x === a[i - 1]);
    function greedy(list){                                    // most-remaining-first, never the same as the last one when avoidable
      const left = {}; list.forEach(x => { left[x] = (left[x] || 0) + 1; });
      const out = [];
      while(out.length < list.length){
        const keys = Object.keys(left).filter(k => left[k] > 0);
        const last = out.length ? String(out[out.length - 1]) : null;
        let pool = keys.filter(k => k !== last); if(!pool.length) pool = keys;
        const top = Math.max.apply(null, pool.map(k => left[k]));
        const best = pool.filter(k => left[k] === top), pick = best[Math.floor(Math.random() * best.length)];
        left[pick]--; out.push(+pick);
      }
      return out;
    }
    function mixOrder(list){
      for(let k = 0; k < 300; k++){ const s = shuffle(list); if(!hasRepeat(s)) return s; }   // random orders first, so it looks shuffled
      return greedy(list);                                                                       // always finds an order when one exists
    }

    /* ---------- build and show ---------- */
    function build(){
      const v = readRows(), types = [], seen = Object.create(null);
      for(const r of v){
        const t = r.t.replace(/\s+/g, ' ').trim().slice(0, MAX_LEN);
        if(!t) continue;
        const k = t.toLowerCase();
        if(seen[k]){ status(T.dupTypes); return false; }
        seen[k] = 1; types.push({ t, c: Math.min(6, Math.max(1, parseInt(r.c, 10) || 1)) });
      }
      if(types.length < 2){ status(T.needTypes); const first = v.findIndex(r => !r.t.trim()); $('htl-il-t' + (first < 0 ? 0 : first)).focus(); return false; }
      items = types; return true;
    }
    const blockedList = () => { const o = []; items.forEach((it, i) => { for(let k = 0; k < it.c; k++) o.push(i); }); return o; };
    function show(focusHeading, msg){
      mixed = mixOrder(blockedList()); mixedClean = !hasRepeat(mixed);
      const li = i => '<li>' + esc(items[i].t) + '</li>';
      const out = $('htl-il-out'); out.hidden = false;
      out.innerHTML =
        '<div class="htl-il-cols">' +
          '<div class="htl-il-col"><h4 tabindex="-1" id="htl-il-bh">' + esc(T.blockedTitle) + '</h4><p class="htl-small">' + esc(T.blockedNote) + '</p><ol>' + blockedList().map(li).join('') + '</ol></div>' +
          '<div class="htl-il-col"><h4 id="htl-il-mh">' + esc(T.mixedTitle) + '</h4><p class="htl-small">' + esc(T.mixedNote + (mixedClean ? '' : ' ' + T.mixedNoteHard)) + '</p><ol id="htl-il-mixed">' + mixed.map(li).join('') + '</ol></div>' +
        '</div>' +
        '<div class="htl-example"><strong>' + esc(T.feedbackTitle) + '</strong> ' + esc(T.feedback) + ' ' + esc(T.whenHard) + '</div>' +
        '<div class="htl-actions"><button type="button" class="tool-btn" id="htl-il-re">' + esc(T.reshuffle) + '</button><button type="button" class="tool-btn secondary" id="htl-il-print">' + esc(T.printBtn) + '</button></div>';
      status(msg);
      if(focusHeading) $('htl-il-bh').focus();
    }
    $('htl-il-make').addEventListener('click', () => { if(build()) show(true, fmt(T.built, { n: blockedList().length })); });
    $('htl-il-out').addEventListener('click', e => {
      if(e.target.id === 'htl-il-re'){
        const before = mixed.join(',');
        for(let k = 0; k < 10; k++){ mixed = mixOrder(blockedList()); if(mixed.join(',') !== before) break; }   // try for a different order
        mixedClean = !hasRepeat(mixed);
        $('htl-il-mixed').innerHTML = mixed.map(i => '<li>' + esc(items[i].t) + '</li>').join('');
        status(T.reshuffled); $('htl-il-re').focus();
      }
      else if(e.target.id === 'htl-il-print'){ wantSheet = true; try{ window.print(); }catch(err){ endPrint(); } }
    });
    rows.addEventListener('keydown', e => { if(e.key === 'Enter' && e.target.matches('input')){ e.preventDefault(); $('htl-il-make').click(); } });

    /* ---------- print the mixed list: only when the Print button was used ---------- */
    function buildSheet(){
      if(!items.length || !mixed.length) return;
      $('htl-il-sheet').innerHTML = '<h2>' + esc(T.printTitle) + '</h2><ol class="htl-il-sheet-list">' +
        mixed.map((i, n) => '<li>' + esc(fmt(T.problemLine, { i: n + 1, t: items[i].t })) + '</li>').join('') + '</ol>' +
        '<p><strong>' + esc(T.feedbackTitle) + '</strong> ' + esc(T.feedback) + '</p>';
      document.body.classList.add('htl-il-printing');
    }
    let wantSheet = false;
    const endPrint = () => { wantSheet = false; document.body.classList.remove('htl-il-printing'); $('htl-il-sheet').innerHTML = ''; };
    window.addEventListener('beforeprint', () => { if(wantSheet) buildSheet(); });
    window.addEventListener('afterprint', endPrint);
  };
})();
