/* =========================================================================
   EDUCATION FOR PARENTS — draws the hub, the six guide pages, and the sources page from
   PARENT_ED (assets/data/parent-education.js), a guide's PE_MODULE (assets/data/pe-<guide>.js),
   and PE_EVIDENCE (assets/data/pe-evidence.js). Logic only; all wording lives in the data files.
   Styling reuses the How to Learn classes (.htl-*) so the two sections look alike, plus .pe-* extras.
   Nothing is saved: the tools keep what a parent types in memory only, until the page is closed.
   ========================================================================= */
(function(){
  'use strict';
  if(typeof PARENT_ED === 'undefined') return;
  const D = PARENT_ED, M = D.m;
  const page = document.body.dataset.pePage;
  const root = document.getElementById('htl-root');
  if(!root) return;

  const esc = t => String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const escA = t => esc(t).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const fmt = (t, o) => Object.keys(o).reduce((s, k) => s.split('{' + k + '}').join(o[k]), String(t));
  const LABEL_CLASS = { 'Strong': 'strong', 'Moderate': 'moderate', 'Mixed': 'mixed', 'Not supported': 'notsupported' };
  const labelHtml = label => '<span class="htl-label htl-l-' + (LABEL_CLASS[label] || 'mixed') + '"><span class="htl-label-mark" aria-hidden="true"></span>' + esc(label) + '</span>';
  const safeUrl = u => /^https?:\/\//.test(u) ? u : '#';
  const safeHref = u => /^(https?:\/\/|[a-z0-9-]+\.html(#[\w-]*)?$)/i.test(u || '') ? u : '#';
  const moduleById = id => D.modules.find(m => m.id === id) || null;
  const EV = id => (typeof PE_EVIDENCE !== 'undefined' && PE_EVIDENCE[id]) || null;
  const evIds = ids => (ids || []).filter(id => EV(id));

  const setText = (id, t) => { const el = document.getElementById(id); if(el) el.textContent = t; };
  const setBack = b => { const el = document.getElementById('htl-back'); if(el){ el.textContent = b.text; el.href = b.href; } };
  setText('htl-stage', D.stage);
  const footEl = document.getElementById('htl-footer');
  const byline = '<span class="htl-byline">' + esc(D.bylineText) + '<a href="pe-sources.html">' + esc(D.bylineLink) + '</a>.</span>';
  if(footEl) footEl.innerHTML = page === 'module' ? byline : esc(D.siteFooter);

  function sourcesList(ids){
    return evIds(ids).map(id => EV(id).sources.map(s =>
      '<li><a href="' + escA(safeUrl(s.url)) + '" target="_blank" rel="noopener noreferrer">' + esc(s.title) + ' <span class="htl-vh">' + esc(M.opensNew) + '</span></a> <span class="htl-type">' + esc(s.type) + '</span></li>').join('')).join('');
  }
  function evLine(ids){
    return evIds(ids).map(id => '<span class="pe-evpair">' + labelHtml(EV(id).label) + ' <span class="htl-topic">' + esc(EV(id).topic) + '</span></span>').join(' ');
  }
  // one-at-a-time choice buttons: the answer opens right under the button that was tapped
  function wireChoices(scope, getHtml){
    const btns = scope.querySelectorAll('.htl-choice');
    btns.forEach(b => b.addEventListener('click', () => {
      btns.forEach(x => { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); x.nextElementSibling.innerHTML = ''; });
      b.nextElementSibling.innerHTML = getHtml(+b.dataset.i);
    }));
  }
  const choiceList = texts => '<ul class="htl-choices">' + texts.map((t, i) => '<li><button type="button" class="htl-choice" data-i="' + i + '" aria-pressed="false">' + esc(t) + '</button><div class="htl-result" role="status" aria-live="polite"></div></li>').join('') + '</ul>';

  // printing: only the tool's printable sheet is shown (see parent-education.css)
  function printSheet(sheet, status){
    if(!sheet) return;
    document.body.classList.add('pe-printing');
    sheet.classList.add('is-printing');
    const done = () => { document.body.classList.remove('pe-printing'); sheet.classList.remove('is-printing'); window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    if(status) status.textContent = M.printing;
    setTimeout(() => { window.print(); setTimeout(done, 1000); }, 50);
  }

  /* ---------- hub ---------- */
  function renderHub(){
    setText('htl-title', D.title); setText('htl-intro', D.intro); setBack(D.back);
    document.title = D.title + ' · Moeller Counseling';
    let h = '<section class="htl-sec pe-belief" aria-labelledby="pe-belief-t"><h2 id="pe-belief-t">' + esc(D.beliefTitle) + '</h2><ul>' +
      D.belief.map(b => '<li>' + esc(b) + '</li>').join('') + '</ul></section>';
    h += '<section class="htl-sec" id="trouble"><h2>' + esc(D.troubleTitle) + '</h2><p>' + esc(D.troubleIntro) + '</p>' + choiceList(D.trouble.map(t => t.text)) + '</section>';
    h += '<section class="htl-sec" id="guides"><h2>' + esc(D.modulesTitle) + '</h2><p>' + esc(D.modulesIntro) + '</p><ol class="htl-modules pe-modules">' +
      D.modules.map(m => '<li class="htl-mod' + (m.built ? ' is-built' : ' is-soon') + '"><div class="htl-mod-head"><span class="htl-mod-n" aria-hidden="true">' + m.n + '</span>' +
        (m.built ? '<h3><a href="' + escA(m.file) + '">' + esc(m.title) + '</a></h3>' : '<h3>' + esc(m.title) + ' <span class="htl-soon">' + esc(D.soonLabel) + '</span></h3>') + '</div>' +
        '<p>' + esc(m.blurb) + '</p><p class="pe-time">' + esc(D.timeLabel) + '</p><p class="htl-ev"><span class="htl-vh">' + esc(D.evidenceLabel) + '</span>' + evLine(m.evidence) + '</p></li>').join('') +
      '</ol></section>';
    const sessions = (D.sessions || []).filter(s => s && s.title);
    if(sessions.length){
      h += '<section class="htl-sec" id="sessions"><h2>' + esc(D.sessionsTitle) + '</h2><ul class="pe-sessions">' + sessions.map(s =>
        '<li><span class="pe-date">' + esc(s.date) + '</span><strong>' + (s.url ? '<a href="' + escA(safeHref(s.url)) + '">' + esc(s.title) + '</a>' : esc(s.title)) + '</strong>' + (s.desc ? '<span>' + esc(s.desc) + '</span>' : '') + '</li>').join('') + '</ul></section>';
    }
    h += '<section class="htl-sec" id="books"><h2>' + esc(D.booksTitle) + '</h2><p>' + esc(D.booksIntro) + '</p><ul class="pe-books">' +
      D.books.map(b => '<li><cite>' + esc(b.title) + '</cite><span class="pe-author">' + esc(b.author) + '</span><span>' + esc(b.desc) + '</span></li>').join('') + '</ul></section>';
    const fs = D.forStudents;
    h += '<section class="htl-sec"><h2>' + esc(D.forStudentsTitle) + '</h2><p><a class="htl-biglink" href="' + escA(safeHref(fs.href)) + '"><strong>' + esc(fs.text) + '</strong><span>' + esc(fs.note) + '</span></a></p>' +
      '</section><section class="htl-sec"><p><a class="htl-biglink" href="pe-sources.html"><strong>' + esc(D.sourcesLink) + '</strong><span>' + esc(D.sourcesBlurb) + '</span></a></p>' +
      '<p class="htl-privacy">' + esc(D.privacy) + '</p><p class="htl-privacy">' + esc(D.counselor) + '</p></section>';
    root.innerHTML = h;
    wireChoices(root.querySelector('#trouble'), i => {
      const m = moduleById(D.trouble[i].module);
      if(!m) return '';
      return '<p><strong>' + esc(D.troubleTry) + '</strong> ' + (m.built ? '<a href="' + escA(m.file) + '">' + esc(M.guideWord + ' ' + m.n + ': ' + m.title) + '</a>' : esc(m.title) + ' <span class="htl-soon">' + esc(D.soonLabel) + '</span>') + '</p>';
    });
  }

  /* ---------- sources page ---------- */
  function renderSources(){
    const S = D.src;
    setText('htl-title', S.title); setText('htl-intro', S.intro); setBack(S.back);
    document.title = S.title + ' · Moeller Counseling';
    let h = '<section class="htl-sec"><p>' + esc(S.how) + '</p><h2>' + esc(S.legendTitle) + '</h2><ul class="htl-legend">' +
      S.legend.map(l => '<li>' + labelHtml(l.label) + ' ' + esc(l.text) + '</li>').join('') + '</ul></section>';
    h += '<section class="htl-sec">' + Object.keys(PE_EVIDENCE).map(id => {
      const e = PE_EVIDENCE[id];
      const usedIn = D.modules.filter(m => m.evidence.indexOf(id) >= 0 && m.built).map(m => '<a href="' + escA(m.file) + '">' + esc(M.guideWord + ' ' + m.n) + '</a>').join(', ');
      return '<article class="htl-src"><h3>' + esc(e.topic) + ' ' + labelHtml(e.label) + '</h3><p>' + esc(e.plain) + '</p><p class="htl-note">' + esc(e.labelNote) + '</p><ul class="htl-sources">' + sourcesList([id]) + '</ul>' +
        '<p class="htl-privacy">' + esc(S.reviewed) + ': ' + esc(e.lastReviewed) + (usedIn ? ' · ' + usedIn : '') + '</p></article>';
    }).join('') + '</section>';
    root.innerHTML = h;
  }

  /* ---------- tools ---------- */
  const TOOLS = {};

  // Guide 1: swap cards, filtered by grade, printable
  TOOLS.swaps = function(host, T){
    const grades = [9, 10, 11, 12];
    let grade = 0;
    const card = c => '<li class="pe-swap"><p><span class="pe-k">' + esc(T.insteadLabel) + '</span> ' + esc(c.instead) + '</p><p class="pe-swap-try"><span class="pe-k">' + esc(T.tryLabel) + '</span> ' + esc(c.try) + '</p><p class="pe-swap-why"><span class="pe-k">' + esc(T.whyLabel) + '</span> ' + esc(c.why) + '</p></li>';
    host.innerHTML = '<div class="htl-tool"><h3>' + esc(T.title) + '</h3><p>' + esc(T.intro) + '</p>' +
      '<div class="pe-filter" role="group" aria-labelledby="pe-sw-l"><span class="tool-label" id="pe-sw-l">' + esc(T.filterLabel) + '</span><div class="htl-chips">' +
      '<button type="button" class="htl-chip" data-g="0" aria-pressed="true">' + esc(T.all) + '</button>' +
      grades.map(g => '<button type="button" class="htl-chip" data-g="' + g + '" aria-pressed="false">' + esc(T.gradeNames[g]) + '</button>').join('') + '</div></div>' +
      '<p class="htl-status" id="pe-sw-status" role="status" aria-live="polite"></p><ul class="pe-swaps" id="pe-sw-list"></ul>' +
      '<div class="htl-actions"><button type="button" class="tool-btn" id="pe-sw-print">' + esc(T.printBtn) + '</button></div>' +
      '<p class="htl-privacy">' + esc(M.noSave) + '</p>' +
      '<div class="pe-sheet" id="pe-sw-sheet"></div></div>';
    const list = host.querySelector('#pe-sw-list'), status = host.querySelector('#pe-sw-status'), sheet = host.querySelector('#pe-sw-sheet');
    const shown = () => T.cards.filter(c => !grade || !c.grades.length || c.grades.indexOf(grade) >= 0);
    function draw(announce){
      const cs = shown();
      list.innerHTML = cs.map(card).join('');
      if(announce) status.textContent = fmt(T.shown, { n: cs.length });
    }
    host.querySelectorAll('.htl-chip').forEach(b => b.addEventListener('click', () => {
      grade = +b.dataset.g;
      host.querySelectorAll('.htl-chip').forEach(x => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
      draw(true);
    }));
    host.querySelector('#pe-sw-print').addEventListener('click', () => {
      sheet.innerHTML = '<h2>' + esc(T.printTitle) + (grade ? ' (' + esc(T.gradeNames[grade]) + ')' : '') + '</h2><ul class="pe-swaps">' + shown().map(card).join('') + '</ul>';
      printSheet(sheet, status);
    });
    draw(false);
  };

  // Guide 2: rescue / coach / step away scenarios (no score)
  TOOLS.scenarios = function(host, T){
    // vary where the coaching answer sits, so the right-looking answer isn't always in the same spot
    T = Object.assign({}, T, { scenarios: T.scenarios.map((s, si) => { const k = si % s.options.length; return Object.assign({}, s, { options: s.options.slice(k).concat(s.options.slice(0, k)) }); }) });
    host.innerHTML = '<div class="htl-tool"><h3>' + esc(T.title) + '</h3><p>' + esc(T.intro) + '</p><ol class="pe-scenarios">' +
      T.scenarios.map((s, si) => '<li class="pe-scn"><p class="pe-scn-q"><span class="htl-vh">' + esc(T.situationWord + ' ' + (si + 1) + ': ') + '</span>' + esc(s.situation) + '</p>' +
        '<ul class="htl-choices" data-s="' + si + '">' + s.options.map((o, oi) => '<li><button type="button" class="htl-choice" data-i="' + oi + '" aria-pressed="false">' + esc(o.text) + '</button><div class="htl-result" role="status" aria-live="polite"></div></li>').join('') + '</ul></li>').join('') +
      '</ol><div class="htl-example"><strong>' + esc(T.patternTitle) + ':</strong> ' + esc(T.pattern) + '</div></div>';
    host.querySelectorAll('.pe-scn .htl-choices').forEach(ul => {
      const s = T.scenarios[+ul.dataset.s];
      wireChoices(ul, i => {
        const o = s.options[i];
        return '<p><span class="pe-kind pe-kind-' + escA(o.kind) + '">' + esc(T.kinds[o.kind] || o.kind) + '</span> ' + esc(o.feedback) + '</p>';
      });
    });
  };

  // Guide 3: four-week handoff planner (editable, printable, not saved)
  TOOLS.handoff = function(host, T){
    const MAX = 120;
    const clip = s => String(s || '').replace(/\s+/g, ' ').trim().slice(0, MAX);
    host.innerHTML = '<div class="htl-tool"><h3>' + esc(T.title) + '</h3><p>' + esc(T.intro) + '</p>' +
      '<label class="tool-label" for="pe-ho-task">' + esc(T.taskLabel) + '</label><input class="tool-input" id="pe-ho-task" type="text" maxlength="' + MAX + '" autocomplete="off" placeholder="' + escA(T.taskPlaceholder) + '">' +
      '<p class="htl-small pe-gap">' + esc(T.startersLabel) + '</p><div class="htl-chips">' + T.starters.map((s, i) => '<button type="button" class="htl-chip" data-s="' + i + '">' + esc(s) + '</button>').join('') + '</div>' +
      '<div class="htl-actions"><button type="button" class="tool-btn" id="pe-ho-go">' + esc(T.go) + '</button></div>' +
      '<p class="htl-status" id="pe-ho-status" role="status" aria-live="polite"></p>' +
      '<div id="pe-ho-out" hidden></div><p class="htl-privacy">' + esc(M.noSave) + '</p><div class="pe-sheet" id="pe-ho-sheet"></div></div>';
    const input = host.querySelector('#pe-ho-task'), out = host.querySelector('#pe-ho-out'), status = host.querySelector('#pe-ho-status'), sheet = host.querySelector('#pe-ho-sheet');
    host.querySelectorAll('.htl-chip').forEach(b => b.addEventListener('click', () => { input.value = T.starters[+b.dataset.s]; input.focus(); }));
    let task = '';
    function build(){
      task = clip(input.value);
      if(!task){ status.textContent = T.needTask; input.focus(); return; }
      const f = t => fmt(t, { task: task });
      out.innerHTML = '<ol class="pe-weeks">' + T.stages.map((st, i) =>
        '<li class="pe-week"><h4>' + esc(T.weekWord + ' ' + (i + 1) + ': ' + st.name) + '</h4>' +
        '<label class="tool-label" for="pe-ho-y' + i + '">' + esc(T.youLabel) + '</label><textarea class="tool-textarea" id="pe-ho-y' + i + '" rows="3" maxlength="300">' + esc(f(st.you)) + '</textarea>' +
        '<label class="tool-label" for="pe-ho-h' + i + '">' + esc(T.himLabel) + '</label><textarea class="tool-textarea" id="pe-ho-h' + i + '" rows="3" maxlength="300">' + esc(f(st.him)) + '</textarea></li>').join('') + '</ol>' +
        '<h4>' + esc(T.talkTitle) + '</h4><textarea class="tool-textarea" id="pe-ho-talk" rows="3" maxlength="400" aria-label="' + escA(T.talkTitle) + '">' + esc(f(T.talk)) + '</textarea>' +
        '<div class="htl-example pe-gap"><strong>' + esc(T.slipTitle) + ':</strong> ' + esc(T.slip) + '</div>' +
        '<p class="htl-small">' + esc(T.editHint) + '</p><div class="htl-actions"><button type="button" class="tool-btn" id="pe-ho-print">' + esc(T.printBtn) + '</button></div>';
      out.hidden = false;
      status.textContent = fmt(T.built, { task: task });
      out.querySelector('#pe-ho-print').addEventListener('click', () => {
        const val = id => out.querySelector('#' + id).value;
        sheet.innerHTML = '<h2>' + esc(T.printTitle) + ': ' + esc(task) + '</h2><table class="pe-ptable"><thead><tr><th scope="col">' + esc(T.weekWord) + '</th><th scope="col">' + esc(T.youLabel) + '</th><th scope="col">' + esc(T.himLabel) + '</th></tr></thead><tbody>' +
          T.stages.map((st, i) => '<tr><th scope="row">' + esc((i + 1) + '. ' + st.name) + '</th><td>' + esc(val('pe-ho-y' + i)) + '</td><td>' + esc(val('pe-ho-h' + i)) + '</td></tr>').join('') + '</tbody></table>' +
          '<h3>' + esc(T.talkTitle) + '</h3><p>' + esc(val('pe-ho-talk')) + '</p><h3>' + esc(T.slipTitle) + '</h3><p>' + esc(T.slip) + '</p>';
        printSheet(sheet, status);
      });
    }
    host.querySelector('#pe-ho-go').addEventListener('click', build);
    input.addEventListener('keydown', e => { if(e.key === 'Enter'){ e.preventDefault(); build(); } });
  };

  // Guide 4: supportive statement builder
  TOOLS.script = function(host, T){
    const MAX = 100;
    host.innerHTML = '<div class="htl-tool"><h3>' + esc(T.title) + '</h3><p>' + esc(T.intro) + '</p>' +
      '<fieldset class="pe-fs"><legend class="tool-label">' + esc(T.situationLabel) + '</legend><div class="htl-chips" id="pe-sc-sit">' +
      T.situations.map((s, i) => '<button type="button" class="htl-chip" data-i="' + i + '" aria-pressed="false">' + esc(s) + '</button>').join('') + '</div>' +
      '<input class="tool-input" id="pe-sc-own" type="text" maxlength="' + MAX + '" autocomplete="off" aria-label="' + escA(T.situationPlaceholder) + '" placeholder="' + escA(T.situationPlaceholder) + '"></fieldset>' +
      '<fieldset class="pe-fs"><legend class="tool-label">' + esc(T.habitLabel) + '</legend><div class="htl-chips" id="pe-sc-hab">' +
      T.habits.map((s, i) => '<button type="button" class="htl-chip" data-i="' + i + '" aria-pressed="false">' + esc(s.text) + '</button>').join('') + '</div></fieldset>' +
      '<div class="htl-actions"><button type="button" class="tool-btn" id="pe-sc-go">' + esc(T.build) + '</button></div>' +
      '<p class="htl-status" id="pe-sc-status" role="status" aria-live="polite"></p>' +
      '<div id="pe-sc-out" hidden><label class="tool-label" for="pe-sc-text">' + esc(T.outLabel) + '</label><textarea class="tool-textarea pe-statement" id="pe-sc-text" rows="4" maxlength="600"></textarea>' +
      '<div class="htl-actions"><button type="button" class="tool-btn secondary" id="pe-sc-copy">' + esc(T.copy) + '</button></div>' +
      '<div class="htl-example pe-gap">' + esc(T.tip) + '</div></div><p class="htl-privacy">' + esc(M.noSave) + '</p></div>';
    let sit = -1, hab = -1;
    const own = host.querySelector('#pe-sc-own'), status = host.querySelector('#pe-sc-status'), out = host.querySelector('#pe-sc-out'), text = host.querySelector('#pe-sc-text');
    function toggle(group, setter){
      const btns = host.querySelectorAll(group + ' .htl-chip');
      btns.forEach(b => b.addEventListener('click', () => {
        const on = b.getAttribute('aria-pressed') !== 'true';
        btns.forEach(x => x.setAttribute('aria-pressed', 'false'));
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        setter(on ? +b.dataset.i : -1);
      }));
    }
    toggle('#pe-sc-sit', i => { sit = i; if(i >= 0) own.value = ''; });
    toggle('#pe-sc-hab', i => { hab = i; });
    own.addEventListener('input', () => { if(own.value.trim()){ sit = -1; host.querySelectorAll('#pe-sc-sit .htl-chip').forEach(x => x.setAttribute('aria-pressed', 'false')); } });
    host.querySelector('#pe-sc-go').addEventListener('click', () => {
      const situation = own.value.replace(/\s+/g, ' ').trim().slice(0, MAX) || (sit >= 0 ? T.situations[sit] : '');
      if(!situation){ status.textContent = T.need; own.focus(); return; }
      const parts = [fmt(T.lines[0], { situation: situation }), hab >= 0 ? fmt(T.lines[1], { habit: T.habits[hab].line }) : T.lineNoHabit, T.lines[2]];
      text.value = parts.join(' ');
      out.hidden = false; status.textContent = '';
      text.focus();
    });
    host.querySelector('#pe-sc-copy').addEventListener('click', () => {
      const ok = () => { status.textContent = T.copied; }, fail = () => { status.textContent = T.copyFail; text.select(); };
      try{
        if(navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text.value).then(ok, fail);
        else { text.select(); document.execCommand('copy') ? ok() : fail(); }
      }catch(e){ fail(); }
    });
  };

  // Guide 5: question balance (results vs. the person)
  TOOLS.questions = function(host, T){
    host.innerHTML = '<div class="htl-tool"><h3>' + esc(T.title) + '</h3><p>' + esc(T.intro) + '</p>' +
      '<fieldset class="pe-fs"><legend class="tool-label">' + esc(T.groupLabel) + '</legend><ul class="pe-checks">' +
      T.items.map((it, i) => '<li><label><input type="checkbox" data-i="' + i + '"> <span>' + esc(it.q) + '</span></label></li>').join('') + '</ul></fieldset>' +
      '<div class="htl-actions"><button type="button" class="tool-btn" id="pe-q-go">' + esc(T.show) + '</button></div>' +
      '<div id="pe-q-out" role="status" aria-live="polite"></div><p class="htl-note">' + esc(T.note) + '</p><p class="htl-privacy">' + esc(M.noSave) + '</p></div>';
    const out = host.querySelector('#pe-q-out');
    host.querySelector('#pe-q-go').addEventListener('click', () => {
      const picked = Array.from(host.querySelectorAll('.pe-checks input:checked')).map(x => T.items[+x.dataset.i]);
      if(!picked.length){ out.innerHTML = '<p class="htl-warn">' + esc(T.needOne) + '</p>'; return; }
      const res = picked.filter(x => x.kind === 'results'), r = res.length, p = picked.length - r;
      const verdict = r === picked.length ? T.allResults : (p >= r ? T.balanced : T.mostResults);
      const bar = '<div class="pe-bar" aria-hidden="true"><span class="pe-bar-r" style="flex:' + r + '"></span><span class="pe-bar-p" style="flex:' + p + '"></span></div>';
      let h = '<div class="pe-q-result"><p><strong>' + esc(fmt(T.resultLine, { r: r, p: p, n: picked.length })) + '</strong></p>' + bar + '<p>' + esc(verdict) + '</p>';
      if(r) h += '<h4>' + esc(T.swapsTitle) + '</h4><ul class="pe-qswaps">' + res.map(x => '<li><span class="pe-qold">' + esc(x.q) + '</span> <span class="pe-k">' + esc(T.swapArrow) + '</span> ' + esc(x.swap) + '</li>').join('') + '</ul>';
      out.innerHTML = h + '</div>';
    });
  };

  // Guide 6: what are you seeing? (highest level with anything checked)
  TOOLS.check = function(host, T){
    host.innerHTML = '<div class="htl-tool"><div class="pe-urgent" role="note"><strong>' + esc(T.urgentTitle) + '.</strong> ' + esc(T.urgent) + '</div>' +
      '<h3>' + esc(T.title) + '</h3><p>' + esc(T.intro) + '</p>' +
      T.levels.map((lv, li) => '<fieldset class="pe-fs pe-level pe-level-' + escA(lv.id) + '"><legend>' + esc(lv.label) + '</legend><ul class="pe-checks">' +
        lv.items.map((it, ii) => '<li><label><input type="checkbox" data-l="' + li + '" data-i="' + ii + '"> <span>' + esc(it) + '</span></label></li>').join('') + '</ul></fieldset>').join('') +
      '<div class="htl-actions"><button type="button" class="tool-btn" id="pe-ck-go">' + esc(T.show) + '</button><button type="button" class="tool-btn secondary" id="pe-ck-clear">' + esc(T.clear) + '</button></div>' +
      '<div id="pe-ck-out" role="status" aria-live="polite"></div><p class="htl-privacy">' + esc(M.noSave) + '</p></div>';
    const out = host.querySelector('#pe-ck-out');
    host.querySelector('#pe-ck-go').addEventListener('click', () => {
      const checked = Array.from(host.querySelectorAll('input:checked')).map(x => +x.dataset.l);
      if(!checked.length){ out.innerHTML = '<p class="htl-warn">' + esc(T.none) + '</p>'; return; }
      const lv = T.levels[Math.max.apply(null, checked)];
      out.innerHTML = '<div class="pe-ck-result pe-level-' + escA(lv.id) + '"><h4>' + esc(T.resultTitle) + ': ' + esc(lv.label) + '</h4><p>' + esc(lv.advice) + '</p>' +
        (lv.links || []).map(l => '<p><a href="' + escA(safeHref(l.href)) + '">' + esc(l.text) + '</a></p>').join('') + '</div>';
    });
    host.querySelector('#pe-ck-clear').addEventListener('click', () => {
      host.querySelectorAll('input:checked').forEach(x => { x.checked = false; });
      out.innerHTML = '<p class="htl-status">' + esc(T.cleared) + '</p>';
    });
  };

  /* ---------- guide page ---------- */
  function renderModule(){
    if(typeof PE_MODULE === 'undefined') return;
    const X = PE_MODULE;
    setText('htl-title', X.title); setBack(M.back);
    setText('htl-intro', M.guideWord + ' ' + X.n + ' ' + M.of + ' ' + D.modules.length);
    document.title = X.title + ' · Moeller Counseling';
    const ids = evIds(X.evidence);
    let h = '<section class="htl-sec"><h2>' + esc(M.hook) + '</h2><p class="htl-hook">' + esc(X.hook) + '</p></section>';
    h += '<section class="htl-sec" id="quick"><h2>' + esc(M.quick) + '</h2><p>' + esc(X.quick.question) + '</p>' + choiceList(X.quick.options.map(o => o.text)) + '</section>';
    h += '<section class="htl-sec" id="idea"><h2>' + esc(M.idea) + '</h2><p>' + esc(X.idea.text) + '</p><div class="htl-example"><strong>' + esc(X.idea.exampleLabel) + ':</strong> ' + esc(X.idea.example) + '</div></section>';
    h += '<section class="htl-sec" id="try"><h2>' + esc(M.try) + '</h2><div id="pe-interactive"></div></section>';
    h += '<section class="htl-sec" id="week"><h2>' + esc(M.week) + '</h2><div class="htl-gold"><p>' + esc(X.week) + '</p></div></section>';
    h += '<section class="htl-sec" id="supports"><h2>' + esc(M.supports) + '</h2><ul class="htl-list">' + X.supports.map(s => '<li>' + esc(s) + '</li>').join('') + '</ul>' +
      (X.related ? '<p><a class="htl-biglink" href="' + escA(safeHref(X.related.href)) + '"><strong>' + esc(X.related.text) + '</strong></a></p>' : '') + '</section>';
    if(ids.length){
      h += '<section class="htl-sec" id="research"><h2>' + esc(M.research) + '</h2><details class="htl-details"><summary>' + ids.map(id => esc(EV(id).topic) + ': ' + labelHtml(EV(id).label)).join(' ') + '</summary>' +
        '<p>' + esc(X.research.intro) + '</p>' + ids.map(id => '<p><strong>' + esc(EV(id).topic) + '.</strong> ' + esc(EV(id).says) + '</p><p class="htl-note">' + esc(EV(id).labelNote) + '</p>').join('') +
        (X.research.extra ? '<p>' + esc(X.research.extra) + '</p>' : '') +
        '<h3>' + esc(M.sources) + '</h3><ul class="htl-sources">' + sourcesList(ids) + '</ul><p class="htl-privacy">' + esc(M.reviewed) + ': ' + esc(EV(ids[0]).lastReviewed) + ' · <a href="pe-sources.html">' + esc(D.sourcesLink) + '</a></p></details></section>';
    }
    h += '<section class="htl-sec" id="reflect"><h2>' + esc(M.reflection) + '</h2><ol class="htl-list">' + X.reflection.map(q => '<li>' + esc(q) + '</li>').join('') + '</ol><p class="htl-privacy">' + esc(M.counselor) + '</p></section>';
    const pv = moduleById(X.prev), nx = moduleById(X.next);
    const nav = (m, label) => (m && m.built) ? '<a class="htl-navlink" href="' + escA(m.file) + '"><span>' + esc(label) + '</span><strong>' + esc(m.title) + '</strong></a>' : '';
    const backNav = '<a class="htl-navlink" href="' + escA(M.back.href) + '"><span>' + esc(D.title) + '</span><strong>' + esc(D.modulesTitle) + '</strong></a>';
    h += '<nav class="htl-nav" aria-label="Guide navigation">' + nav(pv, M.prev) + (nx ? nav(nx, M.next) : backNav) + '</nav>';
    root.innerHTML = h;
    wireChoices(root.querySelector('#quick'), i => '<p>' + esc(X.quick.options[i].fix) + '</p>');
    const tool = X.try && TOOLS[X.try.type];
    if(tool) tool(document.getElementById('pe-interactive'), X.try);
  }

  if(page === 'hub') renderHub();
  else if(page === 'sources') renderSources();
  else if(page === 'module') renderModule();
})();
