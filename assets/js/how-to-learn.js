/* =========================================================================
   HOW TO LEARN — draws the hub, the module pages, and the sources page from
   HOW_TO_LEARN (assets/data/how-to-learn.js), a module's HTL_MODULE (assets/data/htl-<module>.js),
   and EVIDENCE (assets/data/evidence.js). Logic only; all wording lives in the data files.
   Module-specific tools register themselves in window.HTL_INTERACTIVES (see assets/js/htl-retrieval.js).
   ========================================================================= */
(function(){
  'use strict';
  const D = HOW_TO_LEARN, M = D.m;
  const page = document.body.dataset.htlPage;
  const root = document.getElementById('htl-root');
  if(!root || !D) return;
  const esc = t => String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const escA = t => esc(t).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const fmt = (t, o) => Object.keys(o).reduce((s, k) => s.split('{' + k + '}').join(o[k]), t);
  const LABEL_CLASS = { 'Strong': 'strong', 'Moderate': 'moderate', 'Mixed': 'mixed', 'Not supported': 'notsupported' };
  const labelHtml = label => '<span class="htl-label htl-l-' + (LABEL_CLASS[label] || 'mixed') + '"><span class="htl-label-mark" aria-hidden="true"></span>' + esc(label) + '</span>';
  const safeUrl = u => /^https?:\/\//.test(u) ? u : '#';   // ledger links are used exactly as approved (one is http only)
  const moduleById = id => D.modules.find(m => m.id === id) || null;
  window.HTL = { esc, escA, fmt };

  const setText = (id, t) => { const el = document.getElementById(id); if(el) el.textContent = t; };
  const setBack = (b) => { const el = document.getElementById('htl-back'); if(el){ el.textContent = b.text; el.href = b.href; } };
  setText('htl-stage', D.stage);
  const footEl = document.getElementById('htl-footer');
  const byline = () => '<span class="htl-byline">' + esc(D.bylineText) + '<a href="how-to-learn-sources.html">' + esc(D.bylineLink) + '</a>.</span>';
  // module pages end with a small muted byline; the hub and the sources page use the site's usual footer line
  if(footEl) footEl.innerHTML = page === 'module' ? byline() : esc(D.siteFooter);
  window.HTL.byline = byline;

  function sourcesList(ids){
    return ids.map(id => EVIDENCE[id]).filter(Boolean).map(e => e.sources.map(s =>
      '<li><a href="' + escA(safeUrl(s.url)) + '" target="_blank" rel="noopener noreferrer">' + esc(s.title) + ' <span class="htl-vh">' + esc(M.opensNew) + '</span></a> <span class="htl-type">' + esc(s.type) + '</span></li>').join('')).join('');
  }

  /* ---------- hub ---------- */
  function renderHub(){
    setText('htl-title', D.title); setText('htl-intro', D.intro); setBack(D.back);
    document.title = D.title + ' · Moeller Counseling';
    let h = '<section class="htl-sec" id="trouble"><h2>' + esc(D.troubleTitle) + '</h2><p>' + esc(D.troubleIntro) + '</p><ul class="htl-choices">' +
      D.trouble.map((t, i) => '<li><button type="button" class="htl-choice" data-i="' + i + '" aria-pressed="false">' + esc(t.text) + '</button><div class="htl-result" role="status" aria-live="polite"></div></li>').join('') +
      '</ul></section>';
    h += '<section class="htl-sec" id="modules"><h2>' + esc(D.modulesTitle) + '</h2><ol class="htl-modules">' +
      D.modules.map(m => '<li class="htl-mod' + (m.built ? ' is-built' : ' is-soon') + '"><div class="htl-mod-head"><span class="htl-mod-n" aria-hidden="true">' + m.n + '</span>' +
        (m.built ? '<h3><a href="' + escA(m.file) + '">' + esc(m.title) + '</a></h3>' : '<h3>' + esc(m.title) + ' <span class="htl-soon">' + esc(D.soonLabel) + '</span></h3>') + '</div>' +
        '<p>' + esc(m.blurb) + '</p><p class="htl-ev">' + esc(D.evidenceLabel) + ' ' + m.evidence.map(id => labelHtml(EVIDENCE[id].label) + ' <span class="htl-topic">' + esc(EVIDENCE[id].topic) + '</span>').join(' · ') + '</p></li>').join('') +
      '</ol></section>';
    h += '<section class="htl-sec"><p><a class="htl-biglink" href="how-to-learn-sources.html"><strong>' + esc(D.sourcesLink) + '</strong><span>' + esc(D.sourcesBlurb) + '</span></a></p>' +
      '<p class="htl-privacy">' + esc(D.privacy) + '</p><p class="htl-privacy">' + esc(D.counselor) + '</p></section>';
    root.innerHTML = h;
    root.querySelectorAll('.htl-choice').forEach(b => b.addEventListener('click', () => {
      root.querySelectorAll('.htl-choice').forEach(x => { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); x.nextElementSibling.innerHTML = ''; });
      const res = b.nextElementSibling;   // the answer opens right under the sentence that was tapped
      const t = D.trouble[+b.dataset.i], m = moduleById(t.module);
      res.innerHTML = m ? '<p><strong>' + esc(D.troubleTry) + '</strong> ' + (m.built ? '<a href="' + escA(m.file) + '">' + esc(m.n + '. ' + m.title) + '</a>' : esc(m.n + '. ' + m.title) + ' <span class="htl-soon">' + esc(D.troubleSoon) + '</span>') + '</p>' : '';
    }));
  }

  /* ---------- sources page ---------- */
  function renderSources(){
    const S = D.src;
    setText('htl-title', S.title); setText('htl-intro', S.intro); setBack({ text: M.back.text, href: M.back.href });
    document.title = S.title + ' · Moeller Counseling';
    let h = '<section class="htl-sec"><p>' + esc(S.how) + '</p><h2>' + esc(S.legendTitle) + '</h2><ul class="htl-legend">' +
      S.legend.map(l => '<li>' + labelHtml(l.label) + ' ' + esc(l.text) + '</li>').join('') + '</ul></section>';
    h += '<section class="htl-sec">' + Object.keys(EVIDENCE).map(id => {
      const e = EVIDENCE[id];
      return '<article class="htl-src"><h3>' + esc(e.topic) + ' ' + labelHtml(e.label) + '</h3><p>' + esc(e.plain) + '</p><p class="htl-note">' + esc(e.labelNote) + '</p><ul class="htl-sources">' + sourcesList([id]) + '</ul>' +
        '<p class="htl-privacy">' + esc(S.reviewed) + ': ' + esc(e.lastReviewed) + '</p></article>';
    }).join('') + '</section>';
    root.innerHTML = h;
  }

  /* ---------- module page ---------- */
  function renderModule(){
    const X = HTL_MODULE;
    setText('htl-title', X.title); setBack(M.back);
    setText('htl-intro', 'Module ' + X.n + ' of ' + D.modules.length);
    document.title = X.title + ' · Moeller Counseling';
    const ids = X.evidence;
    const primary = EVIDENCE[ids[0]];
    let h = '<section class="htl-sec"><h2>' + esc(M.hook) + '</h2><p class="htl-hook">' + esc(X.hook) + '</p></section>';
    h += '<section class="htl-sec" id="quick"><h2>' + esc(M.quick) + '</h2><p>' + esc(X.quick.question) + '</p><ul class="htl-choices">' +
      X.quick.options.map((o, i) => '<li><button type="button" class="htl-choice" data-i="' + i + '" aria-pressed="false">' + esc(o.text) + '</button><div class="htl-result" role="status" aria-live="polite"></div></li>').join('') +
      '</ul></section>';
    h += '<section class="htl-sec" id="idea"><h2>' + esc(M.idea) + '</h2><p>' + esc(X.idea.text) + '</p><div class="htl-example"><strong>' + esc(X.idea.exampleLabel) + ':</strong> ' + esc(X.idea.example) + '</div></section>';
    h += '<section class="htl-sec" id="try"><h2>' + esc(M.try) + '</h2><div id="htl-interactive"></div></section>';
    h += '<section class="htl-sec" id="week"><h2>' + esc(M.week) + '</h2><div class="htl-gold"><p>' + esc(X.week) + '</p></div></section>';
    h += '<section class="htl-sec" id="supports"><h2>' + esc(M.supports) + '</h2><ul class="htl-list">' + X.supports.map(s => '<li>' + esc(s) + '</li>').join('') + '</ul></section>';
    h += '<section class="htl-sec" id="research"><h2>' + esc(M.research) + '</h2><details class="htl-details"><summary>' + ids.map(id => esc(EVIDENCE[id].topic) + ': ' + labelHtml(EVIDENCE[id].label)).join(' · ') + '</summary>' +
      '<p>' + esc(X.research.intro) + '</p>' + ids.map(id => '<p><strong>' + esc(EVIDENCE[id].topic) + '.</strong> ' + esc(EVIDENCE[id].says) + '</p><p class="htl-note">' + esc(EVIDENCE[id].labelNote) + '</p>').join('') +
      (X.research.extra ? '<p>' + esc(X.research.extra) + '</p>' : '') +
      '<h3>' + esc(M.sources) + '</h3><ul class="htl-sources">' + sourcesList(ids) + '</ul><p class="htl-privacy">' + esc(M.reviewed) + ': ' + esc(primary.lastReviewed) + ' · <a href="how-to-learn-sources.html">' + esc(D.sourcesLink) + '</a></p></details></section>';
    h += '<section class="htl-sec" id="reflect"><h2>' + esc(M.reflection) + '</h2><ol class="htl-list">' + X.reflection.map(q => '<li>' + esc(q) + '</li>').join('') + '</ol><p class="htl-privacy">' + esc(M.counselor) + '</p></section>';
    const pv = moduleById(X.prev), nx = moduleById(X.next);
    const nav = (m, label) => m ? (m.built ? '<a class="htl-navlink" href="' + escA(m.file) + '"><span>' + esc(label) + '</span><strong>' + esc(m.title) + '</strong></a>' : '<span class="htl-navlink is-soon"><span>' + esc(label) + '</span><strong>' + esc(m.title) + ' ' + esc(M.soon) + '</strong></span>') : '';
    h += '<nav class="htl-nav" aria-label="Module navigation">' + nav(pv, M.prev) + nav(nx, M.next) + '</nav>';
    root.innerHTML = h;
    root.querySelectorAll('#quick .htl-choice').forEach(b => b.addEventListener('click', () => {
      root.querySelectorAll('#quick .htl-choice').forEach(x => { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); x.nextElementSibling.innerHTML = ''; });
      const res = b.nextElementSibling;
      res.innerHTML = '<p>' + esc(X.quick.options[+b.dataset.i].fix) + '</p>';
    }));
    // remember that this module was opened (its id only; read by the hub's progress bar)
    try{
      const K = D.visitedKey, raw = window.localStorage.getItem(K);
      let seen = [];
      try{ seen = raw && raw.length < 2000 ? JSON.parse(raw) : []; }catch(e){ seen = []; }   // a damaged or oversized value starts the list over
      seen = Array.isArray(seen) ? seen.filter((id, i, a) => typeof id === 'string' && moduleById(id) && a.indexOf(id) === i) : [];
      if(moduleById(X.id) && seen.indexOf(X.id) < 0) seen.push(X.id);
      const out = JSON.stringify(seen);
      if(out !== raw) window.localStorage.setItem(K, out);
    }catch(e){}
    const tool = window.HTL_INTERACTIVES && window.HTL_INTERACTIVES[X.id];
    if(tool) tool(document.getElementById('htl-interactive'));
  }

  if(page === 'hub'){
    // the visual hub (assets/js/htl-hub.js); renderHub above is the plain fallback
    if(window.HTL_HUB){ setText('htl-title', D.title); setText('htl-intro', D.intro); setBack(D.back); document.title = D.title + ' · Moeller Counseling'; window.HTL_HUB(D, { esc, escA, fmt, labelHtml, byline: window.HTL.byline }); } else renderHub();
  } else if(page === 'sources') renderSources(); else if(page === 'module') renderModule();
})();
