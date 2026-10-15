/* =========================================================================
   SOPHOMORE FUTURE FOCUS, QUARTER 4 — draws the page from SOPHOMORE_Q4 (assets/data/sophomore-q4.js).
   The brag sheet drafter saves only in the student's own browser. Nothing is ever sent anywhere.
   All wording lives in the data file; this file is logic only.
   ========================================================================= */
(function(){
  'use strict';
  const D = typeof SOPHOMORE_Q4 !== 'undefined' ? SOPHOMORE_Q4 : null;
  const root = document.getElementById('fq-root');
  if(!root || !D) return;
  const esc = escapeHtml;
  const escA = t => esc(t).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const md = t => esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  const fmt = (t, o) => Object.keys(o).reduce((s, k) => s.split('{' + k + '}').join(String(o[k])), t);
  const FIELD_ID = /^[a-z]+$/;

  const stageEl = document.getElementById('fq-stage'); if(stageEl) stageEl.textContent = D.stage;
  const titleEl = document.getElementById('fq-title'); if(titleEl) titleEl.textContent = D.title;
  const backEl = document.getElementById('fq-back'); if(backEl){ backEl.textContent = D.back.text; backEl.href = D.back.href; }
  const footEl = document.getElementById('fq-footer');
  if(footEl) footEl.innerHTML = '<a href="' + escA(D.footerBack.href) + '">' + esc(D.footerBack.text) + '</a>';

  const Y = D.yearAhead, B = D.brag, T = D.tests, R = D.results, TL = D.timeline, N = D.next;
  const FIELDS = B.fields.filter(f => FIELD_ID.test(f.id));
  const MAX_ROWS = Math.max(1, Math.min(100, +B.maxRows || 30));
  const MAX_LEN = Math.max(20, Math.min(2000, +B.maxLen || 400));

  /* ---------- section markup ---------- */
  const yearHtml = '<section class="fq-sec" id="year"><h2>' + esc(Y.title) + '</h2><ol class="fq-quarters">' +
    Y.quarters.map((q, i) => '<li class="fq-q' + (i === Y.current ? ' is-now' : '') + '"' + (i === Y.current ? ' aria-current="step"' : '') + '>' +
      (i === Y.current ? '<span class="fq-now">' + esc(Y.youAreHere) + '</span>' : '') +
      '<strong>' + esc(q.label) + '</strong><span>' + esc(q.text) + '</span></li>').join('') + '</ol></section>';

  const bragHtml = '<section class="fq-sec" id="brag"><h2>' + esc(B.title) + '</h2>' +
    B.paras.map(p => '<p>' + md(p) + '</p>').join('') +
    '<h3>' + esc(B.drafterTitle) + '</h3><p>' + esc(B.drafterLead) + '</p>' +
    '<div class="fq-status is-warn sq4-blocked" id="sq4-blocked" hidden>' + esc(B.blocked) + '</div>' +
    '<div class="sq4-rows" id="sq4-rows"></div>' +
    '<div class="fq-foot sq4-actions">' +
      '<button type="button" class="tool-btn" id="sq4-add">' + esc(B.addRow) + '</button>' +
      '<button type="button" class="tool-btn secondary" id="sq4-print">' + esc(B.print) + '</button>' +
      '<button type="button" class="tool-btn danger" id="sq4-clear" aria-expanded="false" aria-controls="sq4-confirm">' + esc(B.clear) + '</button>' +
      '<span class="fq-status" id="sq4-status" role="status" aria-live="polite"></span>' +
    '</div>' +
    '<div class="sq4-confirm" id="sq4-confirm" role="group" aria-labelledby="sq4-confirm-text" hidden>' +
      '<p id="sq4-confirm-text">' + esc(B.clearAsk) + '</p>' +
      '<button type="button" class="tool-btn" id="sq4-clear-yes">' + esc(B.clearYes) + '</button> ' +
      '<button type="button" class="tool-btn secondary" id="sq4-clear-no">' + esc(B.clearNo) + '</button>' +
    '</div>' +
    '<p class="fq-privacy">' + esc(B.privacy) + '</p>' +
    '<div class="fq-gold"><p>' + esc(B.scoirNote) + '</p></div>' +
    '<div class="fq-sheet" id="fq-sheet"></div></section>';

  const testsHtml = '<section class="fq-sec" id="tests"><h2>' + esc(T.title) + '</h2>' +
    T.paras.map(p => '<p>' + md(p) + '</p>').join('') +
    '<p><a class="fq-video" href="' + escA(T.practice.href) + '" target="_blank" rel="noopener noreferrer">' + esc(T.practice.text) + '</a> <span class="fq-hint">' + esc(T.practice.note) + '</span></p>' +
    '<div class="fq-links"><a class="fq-link" href="' + escA(T.page.href) + '"><strong>' + esc(T.page.text) + '</strong><span>' + esc(T.page.desc) + '</span></a></div></section>';

  const resultsHtml = '<section class="fq-sec" id="results"><h2>' + esc(R.title) + '</h2>' +
    R.paras.map(p => '<p>' + md(p) + '</p>').join('') + '</section>';

  const timelineHtml = '<section class="fq-sec" id="timeline"><h2>' + esc(TL.title) + '</h2><p>' + esc(TL.lead) + '</p>' +
    '<ol class="sq4-tl">' + TL.steps.map(s => '<li class="sq4-tl-step"><span class="sq4-tl-dot" aria-hidden="true"></span><strong class="sq4-tl-when">' + esc(s.when) + '</strong><span class="sq4-tl-text">' + md(s.text) + '</span></li>').join('') + '</ol>' +
    '<ul class="sq4-notes">' + TL.notes.map(n => '<li>' + md(n) + '</li>').join('') + '</ul></section>';

  const nextHtml = '<section class="fq-sec" id="next"><h2>' + esc(N.title) + '</h2><p>' + esc(N.intro) + '</p>' +
    '<ol class="sq4-sessions">' + N.items.map(i => '<li>' + esc(i) + '</li>').join('') + '</ol>' +
    '<h3>' + esc(N.linksTitle) + '</h3><div class="fq-links">' +
    N.links.map(l => '<a class="fq-link" href="' + escA(l.href) + '"><strong>' + esc(l.text) + '</strong><span>' + esc(l.desc) + '</span></a>').join('') + '</div></section>';

  root.innerHTML = yearHtml + bragHtml + testsHtml + resultsHtml + timelineHtml + nextHtml;

  /* ---------- brag sheet: storage ---------- */
  const KEY = B.key;
  const blankRow = () => { const r = {}; FIELDS.forEach(f => { r[f.id] = ''; }); return r; };
  const cleanStr = v => typeof v === 'string' ? v.slice(0, MAX_LEN) : '';
  // Accept only an array of plain objects with string fields; anything else is ignored.
  function validateRows(parsed){
    const list = parsed && typeof parsed === 'object' && Array.isArray(parsed.rows) ? parsed.rows : null;
    if(!list) return null;
    const out = [];
    for(const item of list.slice(0, MAX_ROWS)){
      if(!item || typeof item !== 'object' || Array.isArray(item)) return null;
      const r = blankRow();
      FIELDS.forEach(f => { r[f.id] = cleanStr(Object.prototype.hasOwnProperty.call(item, f.id) ? item[f.id] : ''); });
      out.push(r);
    }
    return out;
  }
  // 1) Can this browser store anything? Probe using only our own key (no other key is ever written).
  let storageOK = true;
  try{
    if(localStorage.getItem(KEY) === null){ localStorage.setItem(KEY, ''); localStorage.removeItem(KEY); }
  }catch(e){ storageOK = false; }
  // 2) Separately, read and validate whatever is saved. A bad value is simply ignored.
  let rows = null;
  if(storageOK){
    try{
      const raw = localStorage.getItem(KEY);
      if(raw){ rows = validateRows(JSON.parse(raw)); }
    }catch(e){ rows = null; }
  }
  if(!rows || !rows.length) rows = [blankRow()];

  const rowsEl = document.getElementById('sq4-rows'), statusEl = document.getElementById('sq4-status'), blockedEl = document.getElementById('sq4-blocked');
  const addBtn = document.getElementById('sq4-add'), printBtn = document.getElementById('sq4-print'), clearBtn = document.getElementById('sq4-clear');
  const confirmEl = document.getElementById('sq4-confirm'), yesBtn = document.getElementById('sq4-clear-yes'), noBtn = document.getElementById('sq4-clear-no');
  const setStatus = t => { statusEl.textContent = t || ''; };
  const showBlocked = () => { storageOK = false; blockedEl.hidden = false; };
  if(!storageOK) showBlocked();

  let timer = null;
  function save(immediate){
    clearTimeout(timer);
    const run = () => {
      try{ localStorage.setItem(KEY, JSON.stringify({rows: rows})); if(storageOK) setStatus(B.saved); }
      catch(e){ showBlocked(); }
    };
    if(immediate) run(); else timer = setTimeout(run, 400);
  }

  /* ---------- brag sheet: rows ---------- */
  function rowHtml(r, i){
    const n = i + 1;
    return '<div class="sq4-row" role="group" aria-labelledby="sq4-rl-' + n + '" data-i="' + i + '">' +
      '<div class="sq4-row-head"><span class="sq4-row-num" id="sq4-rl-' + n + '">' + esc(fmt(B.rowLabel, {n: n})) + '</span>' +
      '<button type="button" class="tool-btn secondary sq4-remove" data-i="' + i + '" aria-label="' + escA(fmt(B.removeRow, {n: n})) + '">' + esc(B.removeRow.replace(/\s*\{n\}\s*/, '')) + '</button></div>' +
      '<div class="sq4-grid">' + FIELDS.map(f => {
        const id = 'sq4-r' + n + '-' + f.id;
        const ctl = f.wide
          ? '<textarea class="tool-textarea" id="' + id + '" rows="2" maxlength="' + MAX_LEN + '" placeholder="' + escA(f.placeholder) + '" data-i="' + i + '" data-f="' + f.id + '">' + esc(r[f.id]) + '</textarea>'
          : '<input class="tool-input" type="text" id="' + id + '" maxlength="' + MAX_LEN + '" autocomplete="off" placeholder="' + escA(f.placeholder) + '" data-i="' + i + '" data-f="' + f.id + '" value="' + escA(r[f.id]) + '">';
        return '<div class="fq-field' + (f.wide ? ' sq4-wide' : '') + '"><label class="tool-label" for="' + id + '">' + esc(f.label) + '</label>' + ctl + '</div>';
      }).join('') + '</div></div>';
  }
  function render(){
    rowsEl.innerHTML = rows.map(rowHtml).join('');
    rowsEl.querySelectorAll('[data-f]').forEach(el => el.addEventListener('input', () => {
      const i = +el.dataset.i, f = el.dataset.f;
      if(rows[i] && FIELD_ID.test(f)){ rows[i][f] = el.value.slice(0, MAX_LEN); save(false); }
    }));
    rowsEl.querySelectorAll('.sq4-remove').forEach(b => b.addEventListener('click', () => removeRow(+b.dataset.i)));
    addBtn.disabled = rows.length >= MAX_ROWS;
  }
  function focusRow(i, selector){
    const row = rowsEl.querySelector('.sq4-row[data-i="' + i + '"]');
    const el = row && row.querySelector(selector || '[data-f]');
    if(el) el.focus(); else addBtn.focus();
  }
  function addRow(){
    if(rows.length >= MAX_ROWS){ setStatus(fmt(B.full, {max: MAX_ROWS})); return; }
    rows.push(blankRow()); render(); save(true);
    setStatus(B.added); focusRow(rows.length - 1);
  }
  function removeRow(i){
    if(!rows[i]) return;
    rows.splice(i, 1);
    if(!rows.length) rows.push(blankRow());
    render(); save(true); setStatus(B.removed);
    focusRow(Math.min(i, rows.length - 1), '.sq4-remove');
  }
  addBtn.addEventListener('click', addRow);
  render();

  /* ---------- print ---------- */
  printBtn.addEventListener('click', () => {
    const sheet = document.getElementById('fq-sheet');
    const filled = rows.filter(r => FIELDS.some(f => r[f.id].trim()));
    sheet.innerHTML = '<h2>' + esc(B.printTitle) + '</h2><p class="sq4-print-note">' + esc(B.printNote) + '</p>' +
      '<table class="sq4-print-table"><thead><tr>' + FIELDS.map(f => '<th scope="col">' + esc(f.label) + '</th>').join('') + '</tr></thead><tbody>' +
      (filled.length ? filled : [blankRow()]).map(r => '<tr>' + FIELDS.map(f => '<td class="fq-pre">' + esc(r[f.id].trim() || B.nothing) + '</td>').join('') + '</tr>').join('') +
      '</tbody></table>';
    document.body.classList.add('fq-printing'); root.classList.add('fq-print-target');
    const done = () => { document.body.classList.remove('fq-printing'); root.classList.remove('fq-print-target'); sheet.innerHTML = ''; window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    window.print();
  });

  /* ---------- clear: two-step confirm ---------- */
  function hideConfirm(){ confirmEl.hidden = true; clearBtn.setAttribute('aria-expanded', 'false'); }
  clearBtn.addEventListener('click', () => {
    const open = confirmEl.hidden;
    confirmEl.hidden = !open; clearBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if(open) yesBtn.focus();
  });
  noBtn.addEventListener('click', () => { hideConfirm(); clearBtn.focus(); });
  yesBtn.addEventListener('click', () => {
    clearTimeout(timer);
    rows = [blankRow()];
    try{ localStorage.removeItem(KEY); }catch(e){}
    render(); hideConfirm(); setStatus(B.cleared); clearBtn.focus();
  });
})();
