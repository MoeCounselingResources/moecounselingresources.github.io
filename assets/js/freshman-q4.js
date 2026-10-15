/* =========================================================================
   FRESHMAN FOUNDATIONS, QUARTER 4: MENTAL HEALTH — draws the page from FRESHMAN_Q4 (assets/data/freshman-q4.js).
   PRIVACY: this page has no text boxes and no inputs that store anything, and it NEVER uses localStorage,
   sessionStorage, IndexedDB, or cookies (students may use shared or family devices). No tracking, no
   external requests. All wording lives in the data file; this file is logic only.
   ========================================================================= */
(function(){
  'use strict';
  const D = FRESHMAN_Q4;
  const root = document.getElementById('fq-root');
  if(!root || !D) return;
  const esc = escapeHtml;
  const escA = t => esc(t).replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const stageEl = document.getElementById('fq-stage'); if(stageEl) stageEl.textContent = D.stage;
  const titleEl = document.getElementById('fq-title'); if(titleEl) titleEl.textContent = D.title;
  const backEl = document.getElementById('fq-back'); if(backEl){ backEl.textContent = D.back.text; backEl.href = D.back.href; }
  const footEl = document.getElementById('fq-footer');
  if(footEl) footEl.innerHTML = '<a href="' + escA(D.footerBack.href) + '">' + esc(D.footerBack.text) + '</a>';

  const S = D.support, Y = D.yearAhead;
  const houses = (typeof COUNSELORS !== 'undefined' ? COUNSELORS : []).filter(c => /house/i.test(c.role));

  /* ---------- support block: one data object, rendered twice (full at top, compact near the end) ---------- */
  const mail = e => '<a class="fq4-mail" href="mailto:' + escA(e) + '">' + esc(e) + '</a>';
  function supportHtml(id, compact){
    const lines = '<ul class="fq4-lines">' + S.lines.map(l =>
      '<li><span class="fq4-line-text">' + esc(l.text) + '</span><span class="fq4-acts">' +
      l.actions.map(a => '<a class="fq4-btn" href="' + escA(a.href) + '"' + (a.ariaLabel ? ' aria-label="' + escA(a.ariaLabel) + '"' : '') + '>' + esc(a.label) + '</a>').join('') + '</span></li>').join('') + '</ul>';
    let houseHtml;
    if(compact){
      houseHtml = '<ul class="fq4-house-list">' + houses.map(c =>
        '<li><strong>' + esc(c.role) + '</strong> ' + esc(c.name) + (c.email ? ' · ' + mail(c.email) : '') + '</li>').join('') + '</ul>';
    } else {
      houseHtml = '<div class="panel-grid fq-houses">' + houses.map(c => '<div class="panel-card">' +
        (c.crest ? '<div class="crest-wrap' + (c.crestBoxed ? ' boxed' : '') + '"><img src="' + escA(c.crest) + '" alt=""></div>' : '') +
        '<div class="role">' + esc(c.role) + '</div><div class="name">' + esc(c.name) + '</div>' +
        '<div class="meta">' + (c.email ? '<div>' + mail(c.email) + '</div>' : '') + '</div></div>').join('') + '</div>';
    }
    return '<section class="fq4-support' + (compact ? ' is-compact' : '') + '" id="' + escA(id) + '" aria-labelledby="' + escA(id) + '-h">' +
      '<h2 id="' + escA(id) + '-h">' + esc(S.title) + '</h2>' + (compact ? '' : '<p class="fq4-lead">' + esc(S.lead) + '</p>') + lines +
      '<h3>' + esc(S.housesTitle) + '</h3>' + (compact ? '' : '<p class="fq-hint">' + esc(S.housesNote) + '</p>') + houseHtml +
      '<p class="fq4-note">' + esc(S.emailNote) + '</p><p class="fq4-note">' + esc(S.notSubstitute) + '</p>' +
      '<p class="fq4-walkin">' + esc(S.walkIn) + '</p></section>';
  }

  const yearHtml = '<section class="fq-sec" id="year"><h2>' + esc(Y.title) + '</h2><ol class="fq-quarters">' +
    Y.quarters.map((q, i) => '<li class="fq-q' + (i === Y.current ? ' is-now' : '') + '"' + (i === Y.current ? ' aria-current="step"' : '') + '>' +
      (i === Y.current ? '<span class="fq-now">' + esc(Y.youAreHere) + '</span>' : '') +
      '<strong>' + esc(q.label) + '</strong><span>' + esc(q.text) + '</span></li>').join('') + '</ol></section>';

  const sectionsHtml = D.sections.map(s =>
    '<section class="fq-sec" id="' + escA(s.id) + '"><h2>' + esc(s.title) + '</h2>' +
    (s.intro ? '<p>' + esc(s.intro) + '</p>' : '') +
    '<div class="fq4-ph"><span class="fq4-badge">' + esc(D.placeholderBadge) + '</span><p>' + esc(D.placeholderNote) + '</p></div></section>').join('');

  root.innerHTML = supportHtml('fq4-support-top', false) + yearHtml + sectionsHtml + supportHtml('fq4-support-end', true);
})();
