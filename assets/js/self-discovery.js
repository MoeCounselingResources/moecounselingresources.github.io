/* =========================================================================
   SELF-DISCOVERY — draws the page from SELF_DISCOVERY (assets/data/self-discovery.js) and saves each
   student's answers in their own browser. Nothing is ever sent anywhere.
   All wording lives in the data file; this file is logic only.
   ========================================================================= */
(function(){
  'use strict';
  const D = SELF_DISCOVERY;
  const STORE_KEY = 'moeller-self-discovery-v1';
  const root = document.getElementById('sd-root');
  if(!root || !D) return;

  const TRACKS = Object.keys(D.tracks);
  const footerEl = document.getElementById('sd-footer');
  if(footerEl) footerEl.textContent = D.footer;
  const esc = escapeHtml;
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- saved answers ---------- */
  let state = {answers:{}, done:{}};
  let storageOK = true;
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if(raw){
      const o = JSON.parse(raw);
      if(o && typeof o === 'object'){ state.answers = o.answers || {}; state.done = o.done || {}; }
    }
    localStorage.setItem(STORE_KEY + '-probe', '1');
    localStorage.removeItem(STORE_KEY + '-probe');
  }catch(e){ storageOK = false; }

  let saveTimer = null;
  function setStatus(kind){
    const el = document.getElementById('sd-status');
    if(!el) return;
    el.classList.toggle('is-warn', kind === 'blocked');
    el.textContent = kind === 'blocked' ? D.storageBlocked : (kind === 'saved' ? D.saved : '');
  }
  function scheduleSave(){
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveNow, 400);
  }
  function saveNow(){
    try{
      localStorage.setItem(STORE_KEY, JSON.stringify({v:1, answers:state.answers, done:state.done}));
      storageOK = true; setStatus('saved');
    }catch(e){ storageOK = false; setStatus('blocked'); }
  }

  /* ---------- lookups ---------- */
  const flat = track => D.tracks[track].sections.flatMap(s => s.exercises.map(e => Object.assign({section:s.title}, e)));
  const exById = (track, id) => flat(track).find(e => e.id === id);
  const optionsOf = b => b.options === 'virtues' ? D.virtues : (b.options || []);
  const lower = s => String(s).toLowerCase();

  function hasContent(v){
    if(v == null) return false;
    if(typeof v === 'string') return v.trim() !== '';
    if(Array.isArray(v)) return v.some(hasContent);
    if(typeof v === 'object') return Object.keys(v).some(k => hasContent(v[k]));
    return !!v;
  }
  const answersFor = ex => state.answers[ex] || (state.answers[ex] = {});
  const getV = (ex, b, def) => { const a = state.answers[ex]; return a && a[b] !== undefined ? a[b] : def; };
  function setV(ex, b, v){ answersFor(ex)[b] = v; changed(ex); }
  function statusOf(ex){
    if(state.done[ex]) return 'done';
    return hasContent(state.answers[ex]) ? 'started' : 'new';
  }
  function changed(ex){
    scheduleSave();
    refreshDot(ex);
  }

  /* ---------- where we are ---------- */
  let cur = {track:'9-10', view:'ex', ex:null};
  let shownSig = '';

  function parseUrl(){
    const q = new URLSearchParams(location.search).get('track');
    let track = TRACKS.includes(q) ? q : TRACKS[0];
    let h = '';
    try{ h = decodeURIComponent(location.hash.replace(/^#/, '')); }catch(e){}
    if(h === 'summary') return {track, view:'summary', ex:null};
    let ex = null;
    if(h){
      for(const t of TRACKS){ if(exById(t, h)){ track = t; ex = h; break; } }
    }
    if(!ex) ex = flat(track)[0].id;
    return {track, view:'ex', ex};
  }

  /* ---------- the page frame (rebuilt when the track changes) ---------- */
  function buildShell(){
    const t = D.tracks[cur.track];
    document.getElementById('sd-intro').textContent = t.intro;
    const list = flat(cur.track);
    root.innerHTML = `
      <p class="sd-privacy">${esc(D.privacy)}</p>
      ${D.pointer ? `<p class="sd-pointer">${esc(D.pointer.text)} <a href="${esc(D.pointer.href)}">${esc(D.pointer.linkText)}</a></p>` : ''}
      <div class="sd-tabs" role="tablist" aria-label="${esc(D.tabsLabel)}">
        ${TRACKS.map(k => `<button type="button" role="tab" class="sd-tab" data-track="${esc(k)}" aria-selected="${k === cur.track}">${esc(D.tracks[k].label)}</button>`).join('')}
      </div>
      <p class="sd-status" id="sd-status" role="status" aria-live="polite"></p>
      <div class="sd-layout">
        <aside class="sd-side">
          <div class="sd-progress">
            <div class="sd-ptext" id="sd-ptext"></div>
            <div class="sd-bar" id="sd-bar" role="progressbar" aria-label="Exercises done" aria-valuemin="0" aria-valuemax="${list.length}"><span id="sd-fill"></span></div>
          </div>
          <div class="sd-jump">
            <label class="tool-label" for="sd-jump">${esc(D.jumpLabel)}</label>
            <select class="tool-select" id="sd-jump">
              ${t.sections.map(s => `<optgroup label="${esc(s.title)}">${s.exercises.map(e => `<option value="${esc(e.id)}">${esc(e.title)}</option>`).join('')}</optgroup>`).join('')}
              <option value="summary">${esc(D.summaryTitle)}</option>
            </select>
          </div>
          <details class="sd-mapwrap" id="sd-mapwrap"${window.matchMedia && window.matchMedia('(min-width:821px)').matches ? ' open' : ''}>
            <summary class="sd-mapsum"><span id="sd-mapsum-t">${esc(D.mapTitle)}</span></summary>
            <nav class="sd-map" aria-label="${esc(D.mapTitle)}">
              <ol class="sd-stages">${t.sections.map((s, si) => `
                <li class="sd-stage">
                  <h2 class="sd-nav-h"><span class="sd-stage-n" aria-hidden="true">${si + 1}</span>${esc(s.title)}</h2>
                  <ol class="sd-path">${s.exercises.map(e => `
                    <li class="sd-node" data-s="new"><a class="sd-nav-a" href="#${esc(e.id)}" data-ex="${esc(e.id)}"><span class="sd-dot" data-s="new" aria-hidden="true"></span><span class="sd-nav-t">${esc(e.title)}</span><span class="sd-vh"></span></a></li>`).join('')}
                  </ol>
                </li>`).join('')}
              </ol>
            </nav>
          </details>
          <button type="button" class="tool-btn secondary sd-mine" id="sd-mine">${esc(D.summaryTitle)}</button>
        </aside>
        <main class="sd-main" id="sd-main"></main>
      </div>`;
    list.forEach(e => refreshDot(e.id));
    refreshProgress();
    if(!storageOK) setStatus('blocked');
  }

  const STATUS_WORDS = {new:'New', started:'Started', done:'Done'};
  function refreshDot(ex){
    const a = root.querySelector(`.sd-nav-a[data-ex="${CSS.escape(ex)}"]`);
    if(!a) return;
    const s = statusOf(ex);
    a.querySelector('.sd-dot').dataset.s = s;
    if(a.parentElement) a.parentElement.dataset.s = s;
    a.querySelector('.sd-vh').textContent = ', ' + STATUS_WORDS[s];
    refreshProgress();
  }
  function refreshProgress(){
    const list = flat(cur.track);
    const n = list.filter(e => state.done[e.id]).length;
    const txt = document.getElementById('sd-ptext');
    if(!txt) return;
    txt.textContent = `${n} of ${list.length} done`;
    document.getElementById('sd-fill').style.width = (list.length ? (n / list.length * 100) : 0) + '%';
    document.getElementById('sd-bar').setAttribute('aria-valuenow', String(n));
    const mt = document.getElementById('sd-mapsum-t'); if(mt) mt.textContent = `${D.mapTitle}: ${n} of ${list.length} done`;
    if(window.TP) window.TP.progress(list.length ? (n / list.length * 100) : 0);
  }
  function markNav(){
    root.querySelectorAll('.sd-nav-a').forEach(a => {
      if(cur.view === 'ex' && a.dataset.ex === cur.ex) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    const mine = document.getElementById('sd-mine');
    if(mine) mine.setAttribute('aria-pressed', String(cur.view === 'summary'));
    const j = document.getElementById('sd-jump');
    if(j) j.value = cur.view === 'summary' ? 'summary' : cur.ex;
  }

  /* ---------- blocks ---------- */
  const uid = (ex, b, n) => `sd-${ex}-${b}${n == null ? '' : '-' + n}`;
  const paras = t => String(t).split(/\n\s*\n/).map(p => `<p>${esc(p)}</p>`).join('');
  const hintHtml = b => b.hint ? `<p class="sd-hint">${esc(b.hint)}</p>` : '';

  function counselorsHtml(){
    const hs = (typeof COUNSELORS !== 'undefined' ? COUNSELORS : []).filter(c => /house/i.test(c.role) && c.email);
    return `<ul class="sd-counselors">${hs.map(c => `<li><strong>${esc(c.role)}</strong>: ${esc(c.name)}, <a href="mailto:${esc(c.email)}">${esc(c.email)}</a></li>`).join('')}</ul>`;
  }
  function careHtml(){
    return `<div class="sd-care">
      <p>${esc(D.care.text)}</p>
      <details><summary>${esc(D.care.detailsTitle)}</summary>${counselorsHtml()}</details>
    </div>`;
  }

  function textBlock(ex, b){
    return `<div class="sd-block">
      <label class="tool-label sd-label" for="${uid(ex, b.id)}">${esc(b.label)}</label>${hintHtml(b)}
      <textarea class="tool-textarea" id="${uid(ex, b.id)}" rows="${b.rows || 4}" data-t="text" data-b="${esc(b.id)}">${esc(getV(ex, b.id, ''))}</textarea>
    </div>`;
  }

  function listInner(ex, b){
    const arr = getV(ex, b.id, []);
    const n = Math.max(b.count || 5, arr.length);
    return `<ol class="sd-list">${Array.from({length:n}, (_, i) => `
      <li><input class="tool-input" type="text" data-t="list" data-b="${esc(b.id)}" data-i="${i}" aria-label="${esc(b.label)}, item ${i + 1}" value="${esc(arr[i] || '')}"></li>`).join('')}</ol>
      <button type="button" class="tool-btn secondary small" data-act="addlist" data-b="${esc(b.id)}">${esc(b.addLabel || 'Add another')}</button>`;
  }
  function listBlock(ex, b){
    return `<fieldset class="sd-block sd-fs" data-block="${esc(b.id)}"><legend class="sd-label">${esc(b.label)}</legend>${hintHtml(b)}<div class="sd-inner">${listInner(ex, b)}</div></fieldset>`;
  }

  /* pick: value is {picks:[...], custom:[...]} */
  const pickVal = (ex, b) => { const v = getV(ex, b.id, null); return (v && Array.isArray(v.picks)) ? v : {picks:[], custom:[]}; };
  function pickInner(ex, b){
    const v = pickVal(ex, b);
    const opts = optionsOf(b).concat(v.custom.filter(c => !optionsOf(b).includes(c)));
    return `${b.max ? `<p class="sd-count" data-count="${esc(b.id)}" aria-live="polite">${v.picks.length} of ${b.max}</p>` : ''}
      <div class="sd-chips">${opts.map(o => `<button type="button" class="sd-chip" data-act="chip" data-b="${esc(b.id)}" data-v="${esc(o)}" aria-pressed="${v.picks.includes(o)}">${esc(o)}</button>`).join('')}</div>
      ${b.other ? `<div class="sd-other">
        <label class="tool-label" for="${uid(ex, b.id, 'other')}">Something else?</label>
        <div class="sd-other-row"><input class="tool-input" type="text" maxlength="30" id="${uid(ex, b.id, 'other')}" data-other="${esc(b.id)}"><button type="button" class="tool-btn secondary small" data-act="addother" data-b="${esc(b.id)}">Add</button></div>
      </div>` : ''}`;
  }
  function pickBlock(ex, b){
    return `<fieldset class="sd-block sd-fs" data-block="${esc(b.id)}"><legend class="sd-label">${esc(b.label)}</legend>${hintHtml(b)}<div class="sd-inner">${pickInner(ex, b)}</div></fieldset>`;
  }
  function flashCount(b, msg){
    const el = root.querySelector(`[data-count="${CSS.escape(b.id)}"]`);
    if(!el) return;
    el.textContent = msg; el.classList.add('is-flash');
    clearTimeout(flashCount.t);
    flashCount.t = setTimeout(() => {
      const v = pickVal(cur.ex, b);
      el.textContent = `${v.picks.length} of ${b.max}`; el.classList.remove('is-flash');
    }, 2600);
  }
  function togglePick(ex, b, val){
    const v = JSON.parse(JSON.stringify(pickVal(ex, b)));
    const at = v.picks.indexOf(val);
    if(at >= 0){ v.picks.splice(at, 1); }
    else if(b.max === 1){ v.picks = [val]; }
    else if(b.max && v.picks.length >= b.max){ flashCount(b, `${b.max} max. Tap one to swap it out.`); return false; }
    else v.picks.push(val);
    setV(ex, b.id, v);
    return true;
  }

  /* perPick: one writing box per pick; value is {pickText: answer} */
  function perPickInner(ex, b){
    const src = exBlocks(ex).find(x => x.id === b.from);
    const picks = src ? pickVal(ex, src).picks : [];
    const vals = getV(ex, b.id, {});
    if(!picks.length) return `<p class="sd-hint">Pick some above, and a box for each one will show up here.</p>`;
    return picks.map((p, i) => {
      const label = b.label.replace('{x}', lower(p));
      return `<div class="sd-pp">
        <label class="tool-label sd-label" for="${uid(ex, b.id, i)}">${esc(label)}</label>
        <textarea class="tool-textarea" id="${uid(ex, b.id, i)}" rows="3" data-t="pp" data-b="${esc(b.id)}" data-k="${esc(p)}">${esc(vals[p] || '')}</textarea>
      </div>`;
    }).join('');
  }
  function perPickBlock(ex, b){
    return `<div class="sd-block" data-block="${esc(b.id)}" data-perpick="${esc(b.from)}">${perPickInner(ex, b)}</div>`;
  }

  /* table: value is {rows:[{colKey:value}]}; with rowLabels the first column is the row name */
  function tableInner(ex, b){
    const v = getV(ex, b.id, {rows:[]});
    const rows = Array.isArray(v.rows) ? v.rows : [];
    const labeled = Array.isArray(b.rowLabels);
    const n = labeled ? b.rowLabels.length : Math.max(b.rows || 3, rows.length);
    const cols = b.columns;
    const head = `<thead><tr>${cols.map(c => `<th scope="col">${esc(c.label)}</th>`).join('')}</tr></thead>`;
    let body = '';
    for(let r = 0; r < n; r++){
      const row = rows[r] || {};
      body += '<tr>' + cols.map((c, ci) => {
        if(labeled && ci === 0) return `<th scope="row" class="sd-rowname" data-label="${esc(c.label)}">${esc(b.rowLabels[r])}</th>`;
        const rowName = labeled ? b.rowLabels[r] : `row ${r + 1}`;
        const aria = `${c.label || 'Entry'}, ${rowName}`;
        const val = row[c.key] || '';
        if(c.options){
          return `<td data-label="${esc(c.label)}"><select class="tool-select" data-t="tbl" data-b="${esc(b.id)}" data-r="${r}" data-c="${esc(c.key)}" aria-label="${esc(aria)}">
            <option value="">Choose</option>${c.options.map(o => `<option${o === val ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select></td>`;
        }
        const ph = (ci === 0 && b.rowPlaceholders && b.rowPlaceholders[r]) ? ` placeholder="${esc(b.rowPlaceholders[r])}"` : '';
        return `<td data-label="${esc(c.label)}"><input class="tool-input" type="text" data-t="tbl" data-b="${esc(b.id)}" data-r="${r}" data-c="${esc(c.key)}" aria-label="${esc(aria)}" value="${esc(val)}"${ph}></td>`;
      }).join('') + '</tr>';
    }
    return `<table class="sd-table">${head}<tbody>${body}</tbody></table>
      ${(!labeled && b.addRow) ? `<button type="button" class="tool-btn secondary small" data-act="addrow" data-b="${esc(b.id)}">Add a row</button>` : ''}`;
  }
  function tableBlock(ex, b){
    return `<fieldset class="sd-block sd-fs" data-block="${esc(b.id)}"><legend class="sd-label">${esc(b.label)}</legend>${hintHtml(b)}<div class="sd-inner">${tableInner(ex, b)}</div></fieldset>`;
  }

  /* script: value is {fieldKey: text}; builds a live sentence */
  function scriptSentence(b, vals, plain){
    return b.template.replace(/\{(\w+)\}/g, (m, k) => {
      const f = b.fields.find(x => x.key === k);
      const val = (vals[k] || '').trim();
      if(plain) return val || `[${f ? (f.placeholder || f.label) : k}]`;
      return val ? `<span class="sd-filled">${esc(val)}</span>` : `<span class="sd-blank">${esc(f ? (f.placeholder || f.label) : k)}</span>`;
    });
  }
  function scriptBlock(ex, b){
    const vals = getV(ex, b.id, {});
    return `<fieldset class="sd-block sd-fs sd-script" data-block="${esc(b.id)}"><legend class="sd-label">${esc(b.label)}</legend>
      <div class="sd-fields">${b.fields.map((f, i) => `
        <div><label class="tool-label" for="${uid(ex, b.id, i)}">${esc(f.label)}</label>
        <input class="tool-input" type="text" id="${uid(ex, b.id, i)}" data-t="scr" data-b="${esc(b.id)}" data-k="${esc(f.key)}" placeholder="${esc(f.placeholder || '')}" value="${esc(vals[f.key] || '')}"></div>`).join('')}</div>
      <p class="sd-sentence" data-sentence="${esc(b.id)}" aria-live="polite">${scriptSentence(b, vals, false)}</p>
      <button type="button" class="tool-btn secondary small" data-act="copy" data-b="${esc(b.id)}">Copy</button>
      <span class="sd-copied" data-copied="${esc(b.id)}" role="status"></span>
    </fieldset>`;
  }

  const exBlocks = ex => (exById(cur.track, ex) || {blocks:[]}).blocks;
  function blockHtml(ex, b){
    switch(b.type){
      case 'note': return `<div class="sd-note">${paras(b.text)}</div>`;
      case 'care': return careHtml();
      case 'text': return textBlock(ex, b);
      case 'list': return listBlock(ex, b);
      case 'pick': return pickBlock(ex, b);
      case 'perPick': return perPickBlock(ex, b);
      case 'table': return tableBlock(ex, b);
      case 'script': return scriptBlock(ex, b);
      case 'link': return `<p class="sd-linkp"><a class="sd-link" href="${esc(b.href)}">${esc(b.text)}</a></p>`;
      default: return '';
    }
  }

  /* ---------- an exercise ---------- */
  function closeOutHtml(ex){
    return `<section class="sd-close" aria-labelledby="sd-close-h">
      <p class="sd-cp-tag"><span aria-hidden="true">⚑</span> ${esc(D.closeOut.tag)}</p>
      <h3 id="sd-close-h">${esc(D.closeOut.title)}</h3>
      ${D.closeOut.prompts.map(p => `
        <div class="sd-close-row"><label for="${uid(ex, p.id)}">${esc(p.label)}</label>
        <input class="tool-input" type="text" id="${uid(ex, p.id)}" data-t="text" data-b="${esc(p.id)}" value="${esc(getV(ex, p.id, ''))}"></div>`).join('')}
    </section>`;
  }
  function renderExercise(){
    const list = flat(cur.track);
    const i = list.findIndex(e => e.id === cur.ex);
    const e = list[i];
    const next = list[i + 1];
    const done = !!state.done[e.id];
    document.getElementById('sd-main').innerHTML = `
      <article class="sd-ex sd-card">
        <header class="sd-xhero">
          <p class="sd-eyebrow">${esc(e.section)} <span aria-hidden="true">·</span> <span>${esc(e.minutes || '')}</span></p>
          <h2 class="sd-h" id="sd-h" tabindex="-1">${esc(e.title)}</h2>
          <div class="sd-why">${paras(e.why || '')}</div>
        </header>
        <div class="sd-xbody">
        ${e.blocks.map(b => blockHtml(e.id, b)).join('')}
        ${closeOutHtml(e.id)}
        <div class="sd-foot">
          <button type="button" class="tool-btn gold sd-donebtn" id="sd-done" aria-pressed="${done}"><span class="sd-check" aria-hidden="true"></span>Mark as done</button>
          ${next ? `<a class="sd-next" href="#${esc(next.id)}">Next: ${esc(next.title)} →</a>` : `<a class="sd-next" href="#summary">See all my answers →</a>`}
        </div>
        </div>
      </article>`;
  }

  /* ---------- My answers ---------- */
  function blockAnswer(ex, b){
    const v = getV(ex, b.id, null);
    if(!hasContent(v)) return null;
    if(b.type === 'text') return {label:b.label, lines:[String(v).trim()]};
    if(b.type === 'list') return {label:b.label, lines:v.filter(hasContent).map((x, i) => `${i + 1}. ${String(x).trim()}`)};
    if(b.type === 'pick') return {label:b.label, lines:[v.picks.join(', ')]};
    if(b.type === 'perPick'){
      const src = (exById(cur.track, ex).blocks).find(x => x.id === b.from);
      const picks = src ? pickVal(ex, src).picks : [];
      return picks.filter(p => hasContent(v[p])).map(p => ({label:b.label.replace('{x}', lower(p)), lines:[String(v[p]).trim()]}));
    }
    if(b.type === 'table'){
      const labeled = Array.isArray(b.rowLabels);
      const lines = (v.rows || []).map((row, r) => {
        const parts = b.columns.map((c, ci) => (labeled && ci === 0) ? null : (hasContent(row[c.key]) ? `${c.label}: ${String(row[c.key]).trim()}` : null)).filter(Boolean);
        if(!parts.length) return null;
        const name = labeled ? b.rowLabels[r] : (row[b.columns[0].key] ? null : `Row ${r + 1}`);
        return (name ? name + ' — ' : '') + parts.join(' | ');
      }).filter(Boolean);
      return lines.length ? {label:b.label, lines} : null;
    }
    if(b.type === 'script') return {label:b.label, lines:[scriptSentence(b, v, true)]};
    return null;
  }
  function exerciseAnswers(e){
    const out = [];
    e.blocks.forEach(b => {
      const r = blockAnswer(e.id, b);
      if(Array.isArray(r)) out.push(...r); else if(r) out.push(r);
    });
    D.closeOut.prompts.forEach(p => {
      const v = getV(e.id, p.id, '');
      if(hasContent(v)) out.push({label:p.label, lines:[String(v).trim()]});
    });
    return out;
  }
  function summaryData(){
    return flat(cur.track).map(e => ({e, answers:exerciseAnswers(e)})).filter(x => x.answers.length || state.done[x.e.id]);
  }
  function renderSummary(){
    const data = summaryData();
    document.getElementById('sd-main').innerHTML = `
      <article class="sd-ex sd-sum">
        <p class="sd-eyebrow">${esc(D.tracks[cur.track].label)}</p>
        <h2 class="sd-h" id="sd-h" tabindex="-1">${esc(D.summaryTitle)}</h2>
        <div class="sd-actions">
          <button type="button" class="tool-btn" data-act="print">Print</button>
          <button type="button" class="tool-btn secondary" data-act="download">Download as text</button>
          <button type="button" class="tool-btn danger" data-act="erase">Erase my answers</button>
        </div>
        ${data.length ? data.map(({e, answers}) => `
          <section class="sd-sum-ex">
            <h3>${esc(e.section)}: ${esc(e.title)}${state.done[e.id] ? ' <span class="sd-badge">Done</span>' : ''}</h3>
            ${answers.map(a => `<div class="sd-qa"><p class="sd-q">${esc(a.label)}</p>${a.lines.map(l => `<p class="sd-a">${esc(l)}</p>`).join('')}</div>`).join('')}
          </section>`).join('') : `<p class="sd-why">${esc(D.summaryEmpty)}</p>`}
      </article>`;
  }
  function summaryText(){
    const out = [`${D.title}: ${D.summaryTitle}`, D.tracks[cur.track].label, new Date().toLocaleDateString(), ''];
    summaryData().forEach(({e, answers}) => {
      out.push(`${e.section.toUpperCase()}: ${e.title}${state.done[e.id] ? ' (done)' : ''}`);
      answers.forEach(a => { out.push(a.label); a.lines.forEach(l => out.push('  ' + l.replace(/\n/g, '\n  '))); });
      out.push('');
    });
    return out.join('\n');
  }
  function download(){
    const blob = new Blob([summaryText()], {type:'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'my-self-discovery-answers.txt';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function erase(){
    if(!window.confirm('Erase all of your answers on this device? This clears both grade levels and can\'t be undone.')) return;
    state = {answers:{}, done:{}};
    clearTimeout(saveTimer);
    try{ localStorage.removeItem(STORE_KEY); setStatus('saved'); }catch(e){ setStatus('blocked'); }
    flat(cur.track).forEach(e => refreshDot(e.id));
    refreshProgress();
    renderSummary();
    focusHeading();
  }

  /* ---------- showing a view ---------- */
  function focusHeading(){
    const h = document.getElementById('sd-h');
    if(h) h.focus({preventScroll:true});
  }
  function scrollToTop(){
    const top = root.getBoundingClientRect().top + window.pageYOffset - 84;
    if(window.pageYOffset > top) window.scrollTo({top:Math.max(top, 0), behavior:'auto'});
  }
  function route(userNav){
    const next = parseUrl();
    const sig = `${next.track}|${next.view}|${next.ex}`;
    if(sig === shownSig) return;
    const trackChanged = next.track !== cur.track || !shownSig;
    cur = next; shownSig = sig;
    if(trackChanged) buildShell();
    markNav();
    if(cur.view === 'summary') renderSummary(); else renderExercise();
    document.title = (cur.view === 'summary' ? D.summaryTitle + ' · ' : '') + D.title + ' · Moeller Counseling';
    if(userNav){
      const phone = window.matchMedia && window.matchMedia('(max-width:820px)').matches, mw = document.getElementById('sd-mapwrap');
      if(phone && mw) mw.open = false;   // on a phone the open map would push the exercise off screen
      focusHeading(); scrollToTop();
      if(phone){ const h = document.getElementById('sd-h'); if(h) h.scrollIntoView({block:'start', behavior:'auto'}); }
    }
  }

  /* ---------- events ---------- */
  function copyText(text, el){
    const done = () => { el.textContent = 'Copied!'; setTimeout(() => { el.textContent = ''; }, 2000); };
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done, el));
    } else fallbackCopy(text, done, el);
  }
  function fallbackCopy(text, done, el){
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try{ ok = document.execCommand('copy'); }catch(e){}
    ta.remove();
    if(ok) done(); else { el.textContent = 'Press and hold to select the text above, then copy.'; }
  }
  const blockOf = id => exBlocks(cur.ex).find(b => b.id === id);
  function rerenderBlock(b, focusSel){
    const wrap = root.querySelector(`[data-block="${CSS.escape(b.id)}"] .sd-inner`);
    if(!wrap) return;
    wrap.innerHTML = b.type === 'list' ? listInner(cur.ex, b) : (b.type === 'pick' ? pickInner(cur.ex, b) : tableInner(cur.ex, b));
    if(focusSel){ const f = wrap.querySelector(focusSel); if(f) f.focus(); }
  }
  function refreshPerPicks(pickId){
    root.querySelectorAll(`[data-perpick="${CSS.escape(pickId)}"]`).forEach(el => {
      const b = blockOf(el.dataset.block);
      el.innerHTML = perPickInner(cur.ex, b);
    });
  }

  root.addEventListener('input', e => {
    const t = e.target;
    const kind = t.dataset && t.dataset.t;
    if(!kind) return;
    const ex = cur.ex, b = t.dataset.b;
    if(kind === 'text') setV(ex, b, t.value);
    else if(kind === 'list'){
      const arr = (getV(ex, b, []) || []).slice();
      arr[+t.dataset.i] = t.value;
      for(let i = 0; i < arr.length; i++) if(arr[i] === undefined) arr[i] = '';
      setV(ex, b, arr);
    } else if(kind === 'tbl'){
      const v = JSON.parse(JSON.stringify(getV(ex, b, {rows:[]})));
      v.rows = v.rows || [];
      const r = +t.dataset.r;
      for(let i = 0; i <= r; i++) v.rows[i] = v.rows[i] || {};
      v.rows[r][t.dataset.c] = t.value;
      setV(ex, b, v);
    } else if(kind === 'pp'){
      const v = Object.assign({}, getV(ex, b, {}));
      v[t.dataset.k] = t.value;
      setV(ex, b, v);
    } else if(kind === 'scr'){
      const v = Object.assign({}, getV(ex, b, {}));
      v[t.dataset.k] = t.value;
      setV(ex, b, v);
      const blk = blockOf(b);
      const s = root.querySelector(`[data-sentence="${CSS.escape(b)}"]`);
      if(s) s.innerHTML = scriptSentence(blk, v, false);
    }
  });

  root.addEventListener('change', e => {
    const t = e.target;
    if(t.id === 'sd-jump'){ location.hash = t.value; }
  });

  function addOther(bId){
    const b = blockOf(bId);
    const input = root.querySelector(`[data-other="${CSS.escape(bId)}"]`);
    let val = (input.value || '').trim();
    if(!val) { input.focus(); return; }
    const known = optionsOf(b).concat(pickVal(cur.ex, b).custom).find(o => lower(o) === lower(val));
    const v = JSON.parse(JSON.stringify(pickVal(cur.ex, b)));
    if(known) val = known; else v.custom.push(val);
    setV(cur.ex, b.id, v);
    if(!v.picks.includes(val)) togglePick(cur.ex, b, val);
    rerenderBlock(b, `[data-other="${CSS.escape(bId)}"]`);
    refreshPerPicks(b.id);
  }

  root.addEventListener('click', e => {
    const tab = e.target.closest('.sd-tab');
    if(tab){
      const t = tab.dataset.track;
      if(t !== cur.track){
        history.pushState(null, '', `?track=${t}#${flat(t)[0].id}`);
        route(true);
      }
      return;
    }
    if(e.target.closest('#sd-mine')){ location.hash = 'summary'; return; }
    if(e.target.closest('#sd-done')){
      const ex = cur.ex;
      state.done[ex] = !state.done[ex];
      const doneBtn = e.target.closest('#sd-done');
      doneBtn.setAttribute('aria-pressed', String(!!state.done[ex]));
      changed(ex);
      if(state.done[ex] && window.TP){
        window.TP.flash(doneBtn);
        const node = root.querySelector(`.sd-nav-a[data-ex="${CSS.escape(ex)}"] .sd-dot`);
        window.TP.flash(node);
      }
      return;
    }
    const btn = e.target.closest('[data-act]');
    if(!btn) return;
    const act = btn.dataset.act;
    if(act === 'print') window.print();
    else if(act === 'download') download();
    else if(act === 'erase') erase();
    else if(act === 'addlist'){
      const b = blockOf(btn.dataset.b);
      const arr = (getV(cur.ex, b.id, []) || []).slice();
      const n = Math.max(b.count || 5, arr.length);
      while(arr.length < n) arr.push('');
      arr.push('');
      setV(cur.ex, b.id, arr);
      rerenderBlock(b, `.sd-list li:last-child input`);
    } else if(act === 'addrow'){
      const b = blockOf(btn.dataset.b);
      const v = JSON.parse(JSON.stringify(getV(cur.ex, b.id, {rows:[]})));
      v.rows = v.rows || [];
      const n = Math.max(b.rows || 3, v.rows.length);
      while(v.rows.length < n) v.rows.push({});
      v.rows.push({});
      setV(cur.ex, b.id, v);
      rerenderBlock(b, `tbody tr:last-child input, tbody tr:last-child select`);
    } else if(act === 'chip'){
      const b = blockOf(btn.dataset.b);
      const changedPick = togglePick(cur.ex, b, btn.dataset.v);
      if(changedPick){
        rerenderBlock(b, `.sd-chip[data-v="${CSS.escape(btn.dataset.v)}"]`);
        refreshPerPicks(b.id);
      }
    } else if(act === 'addother'){
      addOther(btn.dataset.b);
    } else if(act === 'copy'){
      const b = blockOf(btn.dataset.b);
      copyText(scriptSentence(b, getV(cur.ex, b.id, {}), true), root.querySelector(`[data-copied="${CSS.escape(b.id)}"]`));
    }
  });

  root.addEventListener('keydown', e => {
    if(e.key === 'Enter' && e.target.dataset && e.target.dataset.other){
      e.preventDefault();
      addOther(e.target.dataset.other);
    }
  });

  // widening the window (a phone turned sideways) must not leave the map closed with its summary hidden
  if(window.matchMedia){ const mq = window.matchMedia('(min-width:821px)'); const openMap = () => { const mw = document.getElementById('sd-mapwrap'); if(mw && mq.matches) mw.open = true; }; if(mq.addEventListener) mq.addEventListener('change', openMap); else if(mq.addListener) mq.addListener(openMap); }
  window.addEventListener('hashchange', () => route(true));
  window.addEventListener('popstate', () => route(true));
  window.addEventListener('pagehide', () => { if(saveTimer){ clearTimeout(saveTimer); saveNow(); } });

  route(false);
})();
