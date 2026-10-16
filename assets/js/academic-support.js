/* =========================================================================
   ACADEMIC SUPPORT — logic for academic-support.html. Wording and the Chem Block schedule: assets/data/academic-support.js.
   Nothing on this page saves anything (no storage, no cookies). The next Chem Block session is worked out from the
   date on the student's own device.
   ========================================================================= */
(function(){
  'use strict';
  if(typeof ACADEMIC_SUPPORT === 'undefined') return;
  const D = ACADEMIC_SUPPORT, root = document.getElementById('as-root'); if(!root) return;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt = (s, o) => String(s).replace(/\{(\w+)\}/g, (m, k) => (o && o[k] != null ? o[k] : m));
  const set = (id, t) => { const el = document.getElementById(id); if(el) el.textContent = t; };
  set('as-title', D.title); set('as-stage', D.stage); set('as-intro', D.intro); set('as-footer', D.footer);
  const back = document.getElementById('as-back'); if(back){ back.textContent = D.back.text; back.href = D.back.href; }
  document.title = D.title + ' · Moeller Counseling';

  /* ---------- dates: "Aug 31" -> a real date in the right school year ---------- */
  const MONTHS = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const startYear = today.getMonth() >= 6 ? today.getFullYear() : today.getFullYear() - 1;   // July starts the next school year
  function parseDay(t){
    const m = /^([A-Za-z]{3})\w*\s+(\d{1,2})$/.exec(String(t).trim()); if(!m) return null;
    const mi = MONTHS.indexOf(m[1].toLowerCase()); if(mi < 0) return null;
    return new Date(mi >= 7 ? startYear : startYear + 1, mi, +m[2]);
  }
  const rows = D.chem.rows.map(r => Object.assign({}, r, { date: parseDay(r.session) }));
  const nextRow = rows.filter(r => r.date && r.date >= today).sort((a, b) => a.date - b.date)[0] || null;

  /* ---------- page ---------- */
  const C = D.chem, cols = C.columns;
  const groupCards = D.groups.cards.map(c => '<li class="as-card"><h3>' + esc(c.subject) + '</h3><p class="as-where">' + esc(c.where) + '</p><p class="as-time">' + esc(c.time) + '</p></li>').join('');
  const tutorCards = D.tutors.cards.map(c => '<li class="as-card"><h3>' + esc(c.title) + '</h3><p>' + esc(c.text) + '</p></li>').join('');
  const toolCards = D.tools.cards.map(c => '<li class="as-card as-tool"><h3>' + esc(c.title) + '</h3><p>' + esc(c.text) + (c.soon ? ' <span class="as-soon">' + esc(c.soon) + '</span>' : '') + '</p>' +
    (/^[\w.-]+\.html$/.test(c.href) ? '<a class="as-go" href="' + esc(c.href) + '">' + esc(c.go) + '</a>' : '') + '</li>').join('');
  const filterBtns = [1, 2, 3, 4].map(q => '<button type="button" class="as-fbtn" data-q="' + q + '" aria-pressed="false">Q' + q + '</button>').join('') +
    '<button type="button" class="as-fbtn" data-q="all" aria-pressed="true">' + esc(C.all) + '</button>';
  const tbody = rows.map((r, i) => {
    const isNext = r === nextRow;
    return '<tr role="row" data-q="' + (+r.q || 0) + '"' + (isNext ? ' class="is-next" aria-current="date"' : '') + '>' +
      '<td role="cell" data-label="' + esc(cols.quarter) + '"><span class="as-val">Q' + esc(r.q) + '</span></td>' +
      '<td role="cell" data-label="' + esc(cols.chapter) + '"><span class="as-val">' + esc(r.chapter) + '</span></td>' +
      '<td role="cell" data-label="' + esc(cols.test) + '"><span class="as-val">' + esc(r.test) + '</span></td>' +
      '<td role="cell" data-label="' + esc(cols.session) + '"><span class="as-val">' + esc(r.session) + (isNext ? ' <span class="as-next-badge">' + esc(C.nextBadge) + '</span>' : '') + '</span></td>' +
      '<td role="cell" data-label="' + esc(cols.topic) + '"><span class="as-val">' + esc(r.topic) + '</span></td></tr>';
  }).join('');
  const nextText = nextRow ? fmt(C.next, { date: nextRow.session, topic: nextRow.topic }) : C.none;

  root.innerHTML =
    '<section class="as-sec" id="groups" aria-labelledby="as-h-groups"><h2 id="as-h-groups">' + esc(D.groups.title) + '</h2><p class="as-lead">' + esc(D.groups.intro) + ' ' + esc(D.groups.when) + '</p><ul class="as-cards">' + groupCards + '</ul></section>' +
    '<section class="as-sec" id="chem" aria-labelledby="as-h-chem"><h2 id="as-h-chem">' + esc(C.title) + '</h2><p class="as-lead">' + esc(C.intro) + '</p>' +
    '<p class="as-nextline"><strong>' + esc(nextText) + '</strong></p>' +
    '<div class="as-filters" role="group" aria-label="' + esc(C.filterLabel) + '">' + filterBtns + '</div>' +
    '<p class="as-status" id="as-status" role="status" aria-live="polite"></p>' +
    '<table class="as-table" role="table" aria-label="' + esc(C.tableLabel) + '"><thead role="rowgroup"><tr role="row">' +
    ['quarter', 'chapter', 'test', 'session', 'topic'].map(k => '<th role="columnheader" scope="col">' + esc(cols[k]) + '</th>').join('') + '</tr></thead><tbody role="rowgroup" id="as-body">' + tbody + '</tbody></table>' +
    '<p class="as-note">' + esc(C.note) + '</p></section>' +
    '<section class="as-sec" id="tutors" aria-labelledby="as-h-tutors"><h2 id="as-h-tutors">' + esc(D.tutors.title) + '</h2><p class="as-lead">' + esc(D.tutors.intro) + '</p><ul class="as-cards">' + tutorCards + '</ul></section>' +
    '<section class="as-sec" id="tools" aria-labelledby="as-h-tools"><h2 id="as-h-tools">' + esc(D.tools.title) + '</h2><ul class="as-cards">' + toolCards + '</ul></section>';

  /* ---------- quarter filter ---------- */
  const btns = Array.from(root.querySelectorAll('.as-fbtn')), trs = Array.from(root.querySelectorAll('#as-body tr')), status = document.getElementById('as-status');
  function apply(q){
    btns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.q === String(q))));
    let n = 0;
    trs.forEach(tr => { const show = q === 'all' || tr.dataset.q === String(q); tr.hidden = !show; if(show) n++; });
    status.textContent = fmt(C.status, { n: n, total: trs.length });
  }
  btns.forEach(b => b.addEventListener('click', () => apply(b.dataset.q === 'all' ? 'all' : +b.dataset.q)));
  apply('all');
})();
