/* =========================================================================
   FLASHCARD STUDIO — logic for flashcard-studio.html.
   Wording and settings: assets/data/flashcard-studio.js · Look: assets/css/flashcard-studio.css
   Notes text goes to the card-maker proxy (api.url) only to make cards and to check answers; it is never saved.
   What saves on this device: decks (questions, answers, hints, stats), the coin total, the best streak, and card themes.
   A PDF is read in the browser and thrown away; only its text is used.
   ========================================================================= */
(function(){
  'use strict';
  if(typeof FLASHCARD_STUDIO === 'undefined') return;
  const D = FLASHCARD_STUDIO, root = document.getElementById('fc-root'); if(!root) return;

  /* ---------- helpers ---------- */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt = (s, o) => String(s).replace(/\{(\w+)\}/g, (m, k) => (o && o[k] != null ? o[k] : m));
  const $ = id => document.getElementById(id);
  const num = n => Number(n).toLocaleString('en-US');
  const plural = (n, one, many) => n === 1 ? one : fmt(many, { n: num(n) });
  const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
  const reduceMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clip = (s, n) => String(s == null ? '' : s).replace(/\s+/g, ' ').trim().slice(0, n);
  const shuffle = a => { const b = a.slice(); for(let i = b.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); const t = b[i]; b[i] = b[j]; b[j] = t; } return b; };
  const setText = (id, t) => { const el = $(id); if(el) el.textContent = t; };
  setText('fc-title', D.title); setText('fc-stage', D.stage); setText('fc-intro', D.intro); setText('fc-footer', D.footer);
  const backEl = $('fc-back'); if(backEl){ backEl.textContent = D.back.text; backEl.href = D.back.href; }
  document.title = D.title + ' · Moeller Counseling';

  /* ---------- storage (try/catch everywhere; a visible warning when the browser blocks it) ---------- */
  let blocked = false;
  const store = {
    read(key){ try{ return window.localStorage.getItem(key); }catch(e){ blocked = true; return null; } },
    write(key, val){ try{ window.localStorage.setItem(key, val); return true; }catch(e){ blocked = true; return false; } },
    remove(key){ try{ window.localStorage.removeItem(key); return true; }catch(e){ blocked = true; return false; } }
  };
  const okId = s => typeof s === 'string' && /^[\w-]{1,40}$/.test(s);
  function cleanCard(c){
    if(!c || typeof c !== 'object') return null;
    const q = clip(c.question, 300), a = clip(c.answer, 400);
    return q && a ? { question: q, answer: a, hint: clip(c.hint, 200) } : { question: q, answer: a, hint: clip(c && c.hint, 200) };
  }
  function cleanDeck(d){
    if(!d || typeof d !== 'object' || !okId(String(d.id))) return null;
    const cards = Array.isArray(d.cards) ? d.cards.slice(0, 60).map(cleanCard).filter(Boolean) : [];
    const s = d.stats && typeof d.stats === 'object' ? d.stats : {};
    const n = v => clamp(Math.floor(Number(v)) || 0, 0, 1e7);
    return { id: String(d.id), name: clip(d.name, 80) || 'My deck', cards, stats: { studied: n(s.studied), correct: n(s.correct), coins: n(s.coins), bestStreak: n(s.bestStreak) } };
  }
  const loadDecks = () => { const raw = store.read(D.keys.decks); if(!raw || raw.length > 2e6) return []; try{ const v = JSON.parse(raw); return Array.isArray(v) ? v.slice(0, D.maxDecks).map(cleanDeck).filter(Boolean) : []; }catch(e){ return []; } };
  const saveDecks = a => store.write(D.keys.decks, JSON.stringify(a));
  const loadInt = key => { const v = parseInt(store.read(key), 10); return Number.isFinite(v) ? clamp(v, 0, 1e9) : 0; };
  const loadThemes = () => {
    const ids = D.shop.items.map(i => i.id), raw = store.read(D.keys.themes); let owned = [], active = null;
    try{ const v = JSON.parse(raw || '{}'); if(v && Array.isArray(v.owned)) owned = v.owned.filter((x, i, a) => ids.indexOf(x) > -1 && a.indexOf(x) === i); if(v && owned.indexOf(v.active) > -1) active = v.active; }catch(e){}
    return { owned, active };
  };

  /* ---------- state (notes live only in memory) ---------- */
  const S = { screen: 'input', notes: '', deck: null, coins: loadInt(D.keys.coins), bestEver: loadInt(D.keys.streak), themes: loadThemes(), busy: false, sess: null, timerSecs: 45, timerPaused: false };
  const defaultName = () => fmt(D.review.defaultName, { date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) });
  const hideOutside = on => { ['site-header', 'fc-hero', 'main', 'fc-foot'].forEach(id => { const el = $(id) || document.getElementById(id); if(el){ if(on) el.setAttribute('inert', ''); else el.removeAttribute('inert'); } }); };

  /* ---------- dialogs (focus trap, Escape, focus returns) ---------- */
  let dlg = null;
  function openDialog(titleHtml, bodyHtml, opts){
    closeDialog(true);
    const opener = document.activeElement;
    const wrap = document.createElement('div'); wrap.className = 'fc-dlgwrap';
    wrap.innerHTML = '<div class="fc-dlg" role="dialog" aria-modal="true" aria-labelledby="fc-dlg-t"><div class="fc-dlghead"><h2 id="fc-dlg-t">' + titleHtml + '</h2></div><div class="fc-dlgbody">' + bodyHtml + '</div></div>';
    const host = S.screen === 'study' ? $('fc-study') : document.body; host.appendChild(wrap);
    const box = wrap.querySelector('.fc-dlg');
    const focusables = () => Array.from(box.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(e => !e.disabled && e.offsetParent !== null);
    dlg = { wrap, box, opener, onClose: opts && opts.onClose };
    wrap.addEventListener('keydown', e => {
      if(e.key === 'Escape'){ e.preventDefault(); e.stopPropagation(); closeDialog(); }
      else if(e.key === 'Tab'){ const f = focusables(); if(!f.length) return; const first = f[0], last = f[f.length - 1];
        if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); } else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); } }
    });
    if(S.screen !== 'study'){ hideOutside(true); }
    else { const st = $('fc-studyin'); if(st) st.setAttribute('inert', ''); }
    const f = focusables(); (opts && opts.focus ? box.querySelector(opts.focus) : f[0]) ? (opts && opts.focus ? box.querySelector(opts.focus) : f[0]).focus() : box.focus();
    return box;
  }
  function closeDialog(silent){
    if(!dlg) return; const d = dlg; dlg = null; d.wrap.remove();
    if(S.screen !== 'study') hideOutside(false); else { const st = $('fc-studyin'); if(st) st.removeAttribute('inert'); }
    if(!silent){ if(d.opener && d.opener.isConnected) d.opener.focus(); if(d.onClose) d.onClose(); }
  }

  /* ---------- live announcements ---------- */
  function say(t){ const l = $('fc-live') || $('fc-live-main'); if(!l) return; l.textContent = ''; setTimeout(() => { l.textContent = t; }, 30); }

  /* =====================================================================
     STEP 1 — notes
     ===================================================================== */
  function renderInput(){
    S.screen = 'input'; document.body.classList.remove('fc-study-open'); hideOutside(false);
    const I = D.input, n = loadDecks().length;
    root.innerHTML =
      '<section class="fc-sec" aria-labelledby="fc-h-in"><h2 id="fc-h-in">' + esc(I.title) + '</h2>' +
      '<div class="fc-in2">' +
      '<div class="fc-box"><label for="fc-notes" class="fc-lbl">' + esc(I.pasteLabel) + '</label>' +
      '<textarea id="fc-notes" class="fc-notes" rows="10" maxlength="200000" placeholder="' + esc(I.pastePlaceholder) + '">' + esc(S.notes) + '</textarea>' +
      '<div class="fc-row"><p class="fc-count" id="fc-count"></p><button type="button" class="fc-btn fc-btn2" id="fc-clear">' + esc(I.clear) + '</button></div></div>' +
      '<div class="fc-box"><span class="fc-lbl" id="fc-up-l">' + esc(I.uploadTitle) + '</span>' +
      '<div class="fc-drop" id="fc-drop" role="group" aria-labelledby="fc-up-l"><p class="fc-droptext">' + esc(I.dropText) + '</p>' +
      '<button type="button" class="fc-btn fc-btn2" id="fc-choose">' + esc(I.choose) + '</button>' +
      '<input type="file" id="fc-file" accept=".pdf,application/pdf" class="fc-vh" tabindex="-1" aria-hidden="true"><p class="fc-small">' + esc(I.pdfOnly) + '</p></div>' +
      '<div class="fc-prog" id="fc-prog" hidden><progress id="fc-pbar" max="100" value="0" aria-labelledby="fc-pmsg"></progress><p id="fc-pmsg" class="fc-small" role="status" aria-live="polite"></p></div>' +
      '<p class="fc-err" id="fc-pdferr" role="alert" hidden></p></div></div>' +
      '<p class="fc-priv">' + esc(I.privacy) + '</p><p class="fc-priv">' + esc(I.pdfPrivacy) + '</p>' +
      '<p class="fc-err" id="fc-generr" role="alert" hidden></p>' +
      '<div class="fc-actions"><button type="button" class="fc-btn fc-go" id="fc-gen" disabled><span class="fc-spin" aria-hidden="true" hidden></span><span id="fc-gen-t">' + esc(I.generate) + '</span></button>' +
      '<button type="button" class="fc-btn fc-btn2" id="fc-manual">' + esc(I.manual) + '</button>' +
      '<button type="button" class="fc-btn fc-btn2" id="fc-mydecks">' + esc(fmt(I.myDecks, { n: n })) + '</button></div>' +
      (blocked ? '<p class="fc-warn" role="status">' + esc(D.decks.blocked) + '</p>' : '') + '</section>';
    const ta = $('fc-notes'), gen = $('fc-gen');
    const upd = () => {
      S.notes = ta.value; const len = ta.value.length;
      $('fc-count').textContent = (len === 1 ? I.countOne : fmt(I.count, { n: num(len) })) + (len > D.pdf.maxChars ? ' · ' + fmt(I.tooLong, { n: num(D.pdf.maxChars) }) : '');
      gen.disabled = S.busy || !ta.value.trim();
    };
    ta.addEventListener('input', upd); upd();
    $('fc-clear').addEventListener('click', () => { ta.value = ''; upd(); $('fc-pdferr').hidden = true; $('fc-generr').hidden = true; $('fc-prog').hidden = true; say(I.cleared); ta.focus(); });
    $('fc-mydecks').addEventListener('click', () => openDecks());
    $('fc-manual').addEventListener('click', () => { S.deck = { id: '', name: defaultName(), cards: [{ question: '', answer: '', hint: '' }], stats: { studied: 0, correct: 0, coins: 0, bestStreak: 0 } }; renderReview(); });
    gen.addEventListener('click', generate);
    // PDF: drag and drop, or Choose file
    const drop = $('fc-drop'), file = $('fc-file');
    $('fc-choose').addEventListener('click', () => file.click());
    file.addEventListener('change', () => { if(file.files && file.files[0]) readPdf(file.files[0]); file.value = ''; });
    ['dragenter', 'dragover'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('is-over'); }));
    ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('is-over'); }));
    drop.addEventListener('drop', e => { const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]; if(f) readPdf(f); });
    // a dropped file elsewhere on the page should not navigate away
    ['dragover', 'drop'].forEach(ev => window.addEventListener(ev, e => { if(!drop.contains(e.target)) e.preventDefault(); }));
  }

  /* ----- PDF reading (PDF.js from cdnjs, checked against fingerprints; the file is never sent anywhere) ----- */
  let pdfReady = null;
  const b64 = buf => { let s = ''; const b = new Uint8Array(buf); for(let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]); return btoa(s); };
  function loadPdfJs(){
    if(pdfReady) return pdfReady;
    pdfReady = new Promise((resolve, reject) => {
      if(window.pdfjsLib){ resolve(); return; }
      const s = document.createElement('script');
      s.src = D.pdf.script; s.integrity = D.pdf.scriptIntegrity; s.crossOrigin = 'anonymous'; s.referrerPolicy = 'no-referrer';
      s.onload = () => resolve(); s.onerror = () => { s.remove(); reject(new Error('script')); };
      document.head.appendChild(s);
    }).then(() => fetch(D.pdf.worker, { credentials: 'omit', referrerPolicy: 'no-referrer' })).then(r => { if(!r.ok) throw new Error('worker'); return r.arrayBuffer(); })
      .then(buf => crypto.subtle.digest('SHA-384', buf).then(h => {
        if('sha384-' + b64(h) !== D.pdf.workerIntegrity) throw new Error('worker hash');
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new Blob([buf], { type: 'text/javascript' }));
      })).catch(e => { pdfReady = null; throw e; });
    return pdfReady;
  }
  async function readPdf(file){
    const I = D.input, err = $('fc-pdferr'), prog = $('fc-prog'), bar = $('fc-pbar'), msg = $('fc-pmsg');
    err.hidden = true;
    const isPdf = /\.pdf$/i.test(file.name || '') || file.type === 'application/pdf';
    if(!isPdf){ err.textContent = I.pdfOnly; err.hidden = false; return; }
    if(file.size > D.pdf.maxBytes){ err.textContent = I.tooBig; err.hidden = false; return; }
    prog.hidden = false; bar.value = 0; msg.textContent = fmt(I.reading, { n: 0, total: '…' }); $('fc-gen').disabled = true;
    let text = '';
    try{
      await loadPdfJs();
      const data = new Uint8Array(await file.arrayBuffer());
      const pdf = await window.pdfjsLib.getDocument({ data: data, isEvalSupported: false }).promise;
      const total = Math.min(pdf.numPages, D.pdf.maxPages);
      for(let p = 1; p <= total; p++){
        msg.textContent = fmt(I.reading, { n: p, total: total }); bar.value = Math.round((p - 1) / total * 100);
        const page = await pdf.getPage(p), tc = await page.getTextContent();
        text += tc.items.map(it => it.str).join(' ') + '\n\n';
        page.cleanup();
        if(text.length > 400000) break;
      }
      bar.value = 100; try{ await pdf.destroy(); }catch(e){}
    }catch(e){
      prog.hidden = true;
      err.textContent = (e && /^(script|worker)/.test(e.message || '')) ? I.pdfLoadFail : I.pdfFail; err.hidden = false;
      $('fc-gen').disabled = !$('fc-notes').value.trim(); return;
    }
    text = text.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
    prog.hidden = true;
    if(text.length < D.pdf.minChars){ err.textContent = I.pdfFail; err.hidden = false; $('fc-gen').disabled = !$('fc-notes').value.trim(); return; }
    const ta = $('fc-notes'); ta.value = ta.value.trim() ? ta.value.trim() + '\n\n' + text : text; ta.value = ta.value.slice(0, 200000);
    ta.dispatchEvent(new Event('input'));
    msg.textContent = ''; err.textContent = ''; say(I.pdfDone); $('fc-prog').hidden = false; $('fc-pbar').value = 100; $('fc-pmsg').textContent = I.pdfDone;
  }

  /* ----- the card maker proxy ----- */
  async function callApi(kind, system, userText, maxTokens){
    if(!D.api.url) throw { code: 'unconfigured' };
    const ctrl = new AbortController(), timer = setTimeout(() => ctrl.abort(), D.api.timeoutMs);
    try{
      const res = await fetch(D.api.url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'omit', referrerPolicy: 'no-referrer', signal: ctrl.signal,
        body: JSON.stringify({ kind: kind, model: D.api.model, max_tokens: maxTokens, system: system, messages: [{ role: 'user', content: userText }] }) });
      if(!res.ok) throw { code: res.status === 429 ? 'busy' : 'http' };
      const j = await res.json();
      const t = j && j.content && j.content[0] && j.content[0].text;
      if(typeof t !== 'string') throw { code: 'shape' };
      return t;
    }catch(e){ if(e && e.code) throw e; throw { code: 'network' }; }
    finally{ clearTimeout(timer); }
  }
  const stripFences = t => String(t).trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
  function parseCards(text){
    let t = stripFences(text); const a = t.indexOf('['), b = t.lastIndexOf(']'); if(a < 0 || b < a) throw { code: 'parse' };
    let arr; try{ arr = JSON.parse(t.slice(a, b + 1)); }catch(e){ throw { code: 'parse' }; }
    if(!Array.isArray(arr)) throw { code: 'parse' };
    const seen = {}, out = [];
    arr.forEach(c => { const k = cleanCard(c); if(!k || !k.question || !k.answer) return; const key = k.question.toLowerCase(); if(seen[key]) return; seen[key] = 1; out.push(k); });
    if(!out.length) throw { code: 'parse' };
    return out.slice(0, 20);
  }
  async function generate(){
    const I = D.input, notes = $('fc-notes').value.trim(); if(!notes || S.busy) return;
    S.busy = true; const gen = $('fc-gen'); gen.disabled = true; gen.querySelector('.fc-spin').hidden = false; $('fc-gen-t').textContent = I.generating; $('fc-generr').hidden = true;
    ['fc-notes', 'fc-clear', 'fc-choose', 'fc-manual', 'fc-mydecks'].forEach(id => { const el = $(id); if(el) el.disabled = true; });
    say(I.generating);
    try{
      const text = await callApi('generate', D.prompts.generate, notes.slice(0, D.pdf.maxChars), D.api.generateMaxTokens);
      const cards = parseCards(text);
      S.deck = { id: '', name: defaultName(), cards: cards, stats: { studied: 0, correct: 0, coins: 0, bestStreak: 0 } };
      S.busy = false; renderReview(); return;
    }catch(e){
      S.busy = false;
      const msg = e && e.code === 'unconfigured' ? I.notConnected : e && e.code === 'busy' ? I.busy : e && e.code === 'network' ? I.offline : I.genFail;
      renderInput(); const er = $('fc-generr'); er.textContent = msg; er.hidden = false; $('fc-notes').focus();
    }
  }

  /* =====================================================================
     STEP 2 — review and edit
     ===================================================================== */
  function renderReview(){
    S.screen = 'review'; document.body.classList.remove('fc-study-open'); hideOutside(false);
    const R = D.review, dk = S.deck;
    root.innerHTML =
      '<section class="fc-sec" aria-labelledby="fc-h-rv"><h2 id="fc-h-rv">' + esc(R.title) + '</h2><p class="fc-lead">' + esc(R.intro) + '</p>' +
      '<div class="fc-namebox"><label for="fc-dname" class="fc-lbl">' + esc(R.deckName) + '</label><input type="text" id="fc-dname" class="fc-inp" maxlength="80" value="' + esc(dk.name) + '"></div>' +
      '<p class="fc-ready" id="fc-ready" role="status" aria-live="polite"></p>' +
      '<div class="fc-cards" id="fc-cardlist"></div>' +
      '<p class="fc-err" id="fc-rverr" role="alert" hidden></p><p class="fc-ok" id="fc-rvok" role="status" aria-live="polite"></p>' +
      '<div class="fc-actions"><button type="button" class="fc-btn fc-btn2" id="fc-add">' + esc(R.add) + '</button></div>' +
      '<div class="fc-actions fc-sticky"><button type="button" class="fc-btn fc-go" id="fc-start">' + esc(R.start) + '</button>' +
      '<button type="button" class="fc-btn fc-btn2" id="fc-save">' + esc(R.save) + '</button>' +
      '<button type="button" class="fc-btn fc-btn2" id="fc-print">' + esc(R.print) + '</button>' +
      '<button type="button" class="fc-btn fc-btn2" id="fc-mydecks2">' + esc(fmt(D.input.myDecks, { n: loadDecks().length })) + '</button>' +
      '<button type="button" class="fc-btn fc-btn2" id="fc-backnotes">' + esc(R.back) + '</button></div>' +
      (blocked ? '<p class="fc-warn" role="status">' + esc(D.decks.blocked) + '</p>' : '') + '</section>';
    drawCards();
    $('fc-dname').addEventListener('input', e => { dk.name = clip(e.target.value, 80); });
    $('fc-add').addEventListener('click', () => { dk.cards.push({ question: '', answer: '', hint: '' }); drawCards(); setCount(); say(R.added); const ls = root.querySelectorAll('.fc-card-ed'); const last = ls[ls.length - 1]; if(last){ last.querySelector('textarea').focus(); last.scrollIntoView({ block: 'center', behavior: reduceMotion() ? 'auto' : 'smooth' }); } });
    $('fc-start').addEventListener('click', () => { if(validate()) startSession(dk.cards.slice(), 'all'); });
    $('fc-save').addEventListener('click', saveDeck);
    $('fc-print').addEventListener('click', () => printCards(dk));
    $('fc-mydecks2').addEventListener('click', () => openDecks());
    $('fc-backnotes').addEventListener('click', renderInput);
    setCount();
  }
  function setCount(){ const n = S.deck.cards.length; setText('fc-ready', n ? (n === 1 ? D.review.readyOne : fmt(D.review.ready, { n: n })) : D.review.none); }
  function drawCards(){
    const R = D.review, list = $('fc-cardlist');
    list.innerHTML = S.deck.cards.map((c, i) =>
      '<fieldset class="fc-card-ed" data-i="' + i + '"><legend>' + esc(fmt(R.card, { n: i + 1 })) + '</legend>' +
      '<label class="fc-lbl" for="fc-q' + i + '">' + esc(R.question) + '</label><textarea id="fc-q' + i + '" class="fc-inp" rows="2" maxlength="300" data-f="question">' + esc(c.question) + '</textarea>' +
      '<label class="fc-lbl" for="fc-a' + i + '">' + esc(R.answer) + '</label><textarea id="fc-a' + i + '" class="fc-inp" rows="2" maxlength="400" data-f="answer">' + esc(c.answer) + '</textarea>' +
      '<label class="fc-lbl" for="fc-h' + i + '">' + esc(R.hint) + '</label><textarea id="fc-h' + i + '" class="fc-inp" rows="2" maxlength="200" data-f="hint">' + esc(c.hint) + '</textarea>' +
      '<button type="button" class="fc-btn fc-btn2 fc-del" data-del="' + i + '" aria-label="' + esc(fmt(R.delLabel, { n: i + 1 })) + '">' + esc(R.del) + '</button></fieldset>').join('');
    list.querySelectorAll('textarea').forEach(t => t.addEventListener('input', () => { const i = +t.closest('.fc-card-ed').dataset.i; S.deck.cards[i][t.dataset.f] = t.value.slice(0, +t.maxLength); }));
    list.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => {
      const i = +b.dataset.del; S.deck.cards.splice(i, 1); drawCards(); setCount(); say(fmt(R.deleted, { n: i + 1 }));
      const next = list.querySelectorAll('.fc-card-ed')[Math.min(i, S.deck.cards.length - 1)]; (next ? next.querySelector('textarea') : $('fc-add')).focus();
    }));
  }
  function validate(){
    const R = D.review, er = $('fc-rverr'); er.hidden = true;
    if(!S.deck.cards.length){ er.textContent = R.needCards; er.hidden = false; $('fc-add').focus(); return false; }
    const bad = S.deck.cards.findIndex(c => !clip(c.question, 300) || !clip(c.answer, 400));
    if(bad > -1){ er.textContent = R.needFields; er.hidden = false; const f = $((clip(S.deck.cards[bad].question, 1) ? 'fc-a' : 'fc-q') + bad); if(f) f.focus(); return false; }
    S.deck.cards = S.deck.cards.map(cleanCard); return true;
  }
  function saveDeck(){
    if(!validate()) return;
    const decks = loadDecks(), dk = S.deck, idx = decks.findIndex(d => d.id === dk.id);
    dk.name = clip($('fc-dname').value, 80) || defaultName();
    if(idx < 0 && decks.length >= D.maxDecks){ const er = $('fc-rverr'); er.textContent = fmt(D.review.full, { n: decks.length }); er.hidden = false; openDecks({ full: true }); return; }
    if(!dk.id) dk.id = String(Date.now());
    const copy = cleanDeck(dk); if(idx < 0) decks.unshift(copy); else decks[idx] = copy;
    const ok = saveDecks(decks); const okEl = $('fc-rvok');
    if(ok){ okEl.textContent = D.review.saved; } else { okEl.textContent = ''; const er = $('fc-rverr'); er.textContent = D.decks.blocked; er.hidden = false; }
    const b = $('fc-mydecks2'); if(b) b.textContent = fmt(D.input.myDecks, { n: loadDecks().length });
  }

  /* ----- my decks dialog ----- */
  function openDecks(opts){
    const T = D.decks, decks = loadDecks(); const full = opts && opts.full;
    const body = () => {
      const ds = loadDecks();
      return (full ? '<p class="fc-warn" role="status">' + esc(T.saveHint) + '</p>' : '') +
        (ds.length ? '<ul class="fc-decklist">' + ds.map(d => '<li class="fc-deck" data-id="' + esc(d.id) + '"><div class="fc-deckinfo"><strong>' + esc(d.name) + '</strong><span>' + esc(d.cards.length === 1 ? T.cardsOne : fmt(T.cards, { n: d.cards.length })) + '</span><span class="fc-small">' + esc(fmt(T.stats, { studied: d.stats.studied, correct: d.stats.correct, best: d.stats.bestStreak })) + '</span></div>' +
          '<div class="fc-deckbtns"><button type="button" class="fc-btn fc-btn2" data-load="' + esc(d.id) + '" aria-label="' + esc(T.load + ': ' + d.name) + '">' + esc(T.load) + '</button>' +
          '<button type="button" class="fc-btn fc-btn2" data-del="' + esc(d.id) + '" aria-label="' + esc(T.del + ': ' + d.name) + '">' + esc(T.del) + '</button></div></li>').join('') + '</ul>' : '<p>' + esc(T.none) + '</p>') +
        '<div class="fc-wipe"><h3>' + esc(T.wipeTitle) + '</h3><p class="fc-small">' + esc(T.wipeText) + '</p><div id="fc-wipearea"><button type="button" class="fc-btn fc-btn2" id="fc-wipe">' + esc(T.wipe) + '</button></div></div>' +
        (blocked ? '<p class="fc-warn" role="status">' + esc(T.blocked) + '</p>' : '') +
        '<p id="fc-dstat" class="fc-small" role="status" aria-live="polite"></p><div class="fc-actions"><button type="button" class="fc-btn fc-go" id="fc-dclose">' + esc(T.close) + '</button></div>';
    };
    const box = openDialog(esc(T.title), body(), { focus: '#fc-dclose' });
    const bind = () => {
      box.querySelector('#fc-dclose').addEventListener('click', () => closeDialog());
      box.querySelectorAll('[data-load]').forEach(b => b.addEventListener('click', () => {
        const d = loadDecks().find(x => x.id === b.dataset.load); if(!d) return; closeDialog(true);
        S.deck = JSON.parse(JSON.stringify(d)); renderReview();
      }));
      box.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => {
        const d = loadDecks().find(x => x.id === b.dataset.del); if(!d) return; const li = b.closest('.fc-deck');
        li.querySelector('.fc-deckbtns').innerHTML = '<span class="fc-small">' + esc(fmt(T.delConfirm, { name: d.name })) + '</span> <button type="button" class="fc-btn fc-btn2" data-yes>' + esc(T.yes) + '</button> <button type="button" class="fc-btn fc-btn2" data-no>' + esc(T.no) + '</button>';
        li.querySelector('[data-no]').addEventListener('click', refresh); li.querySelector('[data-no]').focus();
        li.querySelector('[data-yes]').addEventListener('click', () => { saveDecks(loadDecks().filter(x => x.id !== d.id)); refresh(T.deletedMsg); const sb = $('fc-mydecks') || $('fc-mydecks2'); if(sb) sb.textContent = fmt(D.input.myDecks, { n: loadDecks().length }); });
      }));
      const w = box.querySelector('#fc-wipe');
      w.addEventListener('click', () => {
        box.querySelector('#fc-wipearea').innerHTML = '<p class="fc-small">' + esc(T.wipeConfirm) + '</p><button type="button" class="fc-btn fc-btn2" id="fc-wipeyes">' + esc(T.wipeYes) + '</button> <button type="button" class="fc-btn fc-btn2" id="fc-wipeno">' + esc(T.no) + '</button>';
        box.querySelector('#fc-wipeno').addEventListener('click', refresh); box.querySelector('#fc-wipeno').focus();
        box.querySelector('#fc-wipeyes').addEventListener('click', () => {
          [D.keys.decks, D.keys.coins, D.keys.streak, D.keys.themes].forEach(k => store.remove(k));
          S.coins = 0; S.bestEver = 0; S.themes = { owned: [], active: null }; refresh(T.wiped);
        });
      });
    };
    const refresh = msg => { const b = box.querySelector('.fc-dlgbody'); b.innerHTML = body(); bind(); if(typeof msg === 'string'){ $('fc-dstat').textContent = msg; } const f = b.querySelector('[data-load]') || b.querySelector('#fc-dclose'); f.focus(); };
    bind();
  }

  /* =====================================================================
     STEP 3 — study mode
     ===================================================================== */
  function startSession(cards, mode){
    S.sess = { cards: shuffle(mode === 'all' && !S.sess ? cards : cards).slice(), order: null, mode: mode, i: 0, results: [], streak: 0, best: 0, earned: 0, cardState: null };
    if(mode === 'all' && !S.sess.firstRun){ S.sess.cards = cards.slice(); }
    S.screen = 'study'; document.body.classList.add('fc-study-open'); hideOutside(true);
    let st = $('fc-study'); if(st) st.remove();
    st = document.createElement('div'); st.id = 'fc-study'; st.className = 'fc-full'; st.setAttribute('role', 'region'); st.setAttribute('aria-label', fmt(D.study.region, { name: S.deck.name }));
    st.innerHTML = '<div class="fc-studyin" id="fc-studyin"></div><div class="fc-toasts" id="fc-toasts" aria-hidden="true"></div>';
    document.body.appendChild(st);
    // the study container is outside #main, so only the page behind it is made inert
    document.addEventListener('keydown', studyKeys, true);
    showCard();
  }
  const themeClass = () => S.themes.active ? ' fc-theme-' + S.themes.active : '';
  function studyBar(){
    const T = D.study;
    return '<div class="fc-bar"><button type="button" class="fc-btn fc-btn2" id="fc-exit">' + esc(T.exit) + '</button>' +
      '<div class="fc-bar-r"><span class="fc-streak" id="fc-streak" aria-label="' + esc(fmt(T.streakLabel, { n: S.sess.streak })) + '"><span aria-hidden="true">🔥</span><b id="fc-streakn">' + S.sess.streak + '</b></span>' +
      '<span class="fc-coin" id="fc-coin" aria-label="' + esc(fmt(T.coinCounterLabel, { n: num(S.coins) })) + '"><span class="fc-coinico" aria-hidden="true">MGC</span><b id="fc-coinn">' + num(S.coins) + '</b><span class="fc-float" id="fc-float" aria-hidden="true"></span></span>' +
      '<button type="button" class="fc-btn fc-btn2" id="fc-shop">' + esc(T.shop) + '</button>' +
      '<button type="button" class="fc-btn fc-btn2 fc-gear" id="fc-gear" aria-label="' + esc(T.timerSettings) + '"><span aria-hidden="true">⚙</span></button></div></div>';
  }
  function showCard(){
    const T = D.study, ss = S.sess, c = ss.cards[ss.i], total = ss.cards.length;
    ss.cardState = { attempts: 0, tries: 0, apiMs: 0, t0: performance.now(), remaining: S.timerSecs, phase: 'answering', flipped: false, done: false };
    $('fc-studyin').innerHTML = studyBar() +
      '<p class="fc-cardno" id="fc-cardno">' + esc(fmt(T.cardOf, { n: ss.i + 1, total: total })) + '</p>' +
      '<div class="fc-stage"><div class="fc-flip' + themeClass() + '" id="fc-flip">' +
      '<div class="fc-face fc-front" id="fc-front"><div class="fc-tbar" id="fc-tbarwrap"><div class="fc-tfill" id="fc-tfill"></div><span class="fc-tnum" id="fc-tnum" aria-hidden="true"></span></div>' +
      '<p class="fc-q" id="fc-q">' + esc(c.question) + '</p>' +
      '<form class="fc-ansform" id="fc-ansform" autocomplete="off"><label for="fc-ans" class="fc-lbl">' + esc(T.answerLabel) + '</label>' +
      '<input type="text" id="fc-ans" class="fc-inp fc-ansinp" maxlength="300" aria-describedby="fc-q fc-fb" autocomplete="off" autocapitalize="off" spellcheck="false">' +
      '<div class="fc-actions"><button type="submit" class="fc-btn fc-go" id="fc-submit">' + esc(T.submit) + '</button></div></form>' +
      '<div class="fc-fb" id="fc-fb" role="status" aria-live="polite"></div><div class="fc-fbtns" id="fc-fbtns"></div><p class="fc-small fc-keys">' + esc(T.keys) + '</p></div>' +
      '<div class="fc-face fc-back" id="fc-backface" inert><p class="fc-small fc-backlabel">' + esc(T.yourAnswerWas) + '</p><p class="fc-a" id="fc-a">' + esc(c.answer) + '</p><div class="fc-fb" id="fc-fb2" role="status" aria-live="polite"></div><div class="fc-fbtns" id="fc-fbtns2"></div></div>' +
      '</div></div><div class="fc-live fc-vh" id="fc-live" role="status" aria-live="polite"></div>';
    bindBar(); $('fc-ansform').addEventListener('submit', e => { e.preventDefault(); submitAnswer(); });
    drawTimer(); startTick(); say(fmt(T.cardOf, { n: ss.i + 1, total: total }) + '. ' + c.question);
    $('fc-ans').focus();
  }
  function bindBar(){
    $('fc-exit').addEventListener('click', () => endSession(true));
    $('fc-shop').addEventListener('click', openShop);
    $('fc-gear').addEventListener('click', openTimer);
  }

  /* ----- timer ----- */
  let tick = null, lastT = 0;
  function startTick(){ stopTick(); lastT = performance.now(); tick = setInterval(onTick, 100); }
  function stopTick(){ if(tick){ clearInterval(tick); tick = null; } }
  function onTick(){
    const cs = S.sess && S.sess.cardState; const now = performance.now(), dt = now - lastT; lastT = now;
    if(!cs || cs.phase !== 'answering' && cs.phase !== 'retry' || S.timerSecs === 0 || S.timerPaused || S.busy || dlg) return;
    cs.remaining -= dt / 1000; drawTimer();
    if(cs.remaining <= 0){ cs.remaining = 0; drawTimer(); timeUp(); }
  }
  function drawTimer(){
    const cs = S.sess && S.sess.cardState, fill = $('fc-tfill'), wrap = $('fc-tbarwrap'), numEl = $('fc-tnum'); if(!cs || !fill) return;
    const off = S.timerSecs === 0 || S.timerPaused;
    wrap.classList.toggle('is-off', off);
    if(off){ fill.style.width = '100%'; fill.className = 'fc-tfill is-off'; numEl.textContent = ''; return; }
    const pct = clamp(cs.remaining / S.timerSecs, 0, 1) * 100;
    fill.style.width = pct + '%'; fill.className = 'fc-tfill ' + (pct > 50 ? 'is-gold' : pct > 25 ? 'is-amber' : 'is-red');
    numEl.textContent = fmt(D.timer.seconds, { n: Math.ceil(cs.remaining) });
  }
  function timeUp(){ const cs = S.sess.cardState; if(cs.done || cs.phase === 'checking') return; reveal(true); }
  function openTimer(){
    const T = D.timer, opts = T.options;
    const box = openDialog(esc(T.title),
      '<fieldset class="fc-radios"><legend>' + esc(T.label) + '</legend>' + opts.map((n, i) => '<label class="fc-radio"><input type="radio" name="fc-secs" value="' + n + '"' + (S.timerSecs === n ? ' checked' : '') + '><span>' + esc(n === 0 ? T.off : fmt(T.optionLabel, { n: n })) + '</span></label>').join('') + '</fieldset>' +
      '<label class="fc-check"><input type="checkbox" id="fc-tpause"' + (S.timerPaused ? ' checked' : '') + '><span>' + esc(T.pause) + '</span></label><p class="fc-small">' + esc(T.pauseHelp) + '</p>' +
      '<div class="fc-actions"><button type="button" class="fc-btn fc-go" id="fc-tdone">' + esc(T.done) + '</button></div>', { focus: 'input:checked' });
    box.querySelectorAll('input[name="fc-secs"]').forEach(r => r.addEventListener('change', () => { S.timerSecs = +r.value; const cs = S.sess && S.sess.cardState; if(cs) cs.remaining = S.timerSecs; drawTimer(); }));
    box.querySelector('#fc-tpause').addEventListener('change', e => { S.timerPaused = e.target.checked; drawTimer(); });
    box.querySelector('#fc-tdone').addEventListener('click', () => closeDialog());
  }

  /* ----- answering ----- */
  function setFeedback(kind, text){
    const fb = $('fc-fb'); fb.className = 'fc-fb is-' + kind;
    const word = kind === 'close' ? D.study.closeWord : kind === 'wrong' ? D.study.wrongWord : kind === 'correct' ? D.study.correctWord : '';
    fb.innerHTML = (word ? '<span class="fc-fbword">' + esc(word) + '</span> ' : '') + esc(text);
  }
  function buttons(list, id){
    const el = $(id || 'fc-fbtns'); el.innerHTML = list.map(b => '<button type="button" class="fc-btn ' + (b.go ? 'fc-go' : 'fc-btn2') + '" id="' + b.id + '">' + esc(b.label) + '</button>').join('');
    list.forEach(b => $(b.id).addEventListener('click', b.fn));
  }
  async function submitAnswer(){
    const T = D.study, ss = S.sess, cs = ss.cardState, c = ss.cards[ss.i]; if(!cs || cs.done || cs.phase === 'checking') return;
    const input = $('fc-ans'), ans = clip(input.value, 300);
    if(!ans){ setFeedback('info', T.typeFirst); say(T.typeFirst); input.focus(); return; }
    cs.phase = 'checking'; S.busy = true; cs.attempts++;
    const sub = $('fc-submit'); sub.disabled = true; sub.textContent = T.checking; input.disabled = true; $('fc-fbtns').innerHTML = '';
    const t = performance.now();
    let res = null;
    try{ res = await checkAnswer(c, ans); }catch(e){ res = null; }
    cs.apiMs += performance.now() - t; S.busy = false;
    if(!S.sess || S.sess.cardState !== cs) return;   // left study mode meanwhile
    sub.disabled = false; sub.textContent = T.submit; input.disabled = false;
    if(!res){ cs.attempts--; cs.phase = 'retry'; setFeedback('wrong', T.checkFail); say(T.checkFail); retryButtons(); return; }
    if(res.result === 'correct'){ onCorrect(res.feedback || T.praise[Math.floor(Math.random() * T.praise.length)]); }
    else { cs.phase = 'retry'; setFeedback(res.result, res.feedback); say(T[res.result === 'close' ? 'closeWord' : 'wrongWord'] + '. ' + res.feedback); retryButtons(); }
  }
  function retryButtons(){
    const T = D.study;
    buttons([{ id: 'fc-retry', label: T.tryAgain, go: true, fn: () => { const inp = $('fc-ans'); inp.value = ''; $('fc-fb').textContent = ''; $('fc-fb').className = 'fc-fb'; $('fc-fbtns').innerHTML = ''; S.sess.cardState.phase = 'answering'; inp.focus(); } },
             { id: 'fc-show', label: T.showAnswer, fn: () => reveal(false) }]);
    $('fc-retry').focus();
  }
  async function checkAnswer(card, ans){
    const user = JSON.stringify({ question: card.question, correct_answer: card.answer, student_answer: ans, hint: card.hint });
    const text = await callApi('check', D.prompts.check, user, D.api.checkMaxTokens);
    let t = stripFences(text); const a = t.indexOf('{'), b = t.lastIndexOf('}'); if(a < 0 || b < a) throw { code: 'parse' };
    const j = JSON.parse(t.slice(a, b + 1)); const r = String(j.result || '').toLowerCase();
    if(['correct', 'close', 'wrong'].indexOf(r) < 0) throw { code: 'parse' };
    return { result: r, feedback: clip(j.feedback, 200) };
  }

  /* ----- coins, streak, toasts ----- */
  function saveCoins(){ if(!store.write(D.keys.coins, String(S.coins))) { /* the warning shows on the notes and review screens */ } }
  function award(n){
    if(n <= 0) return; S.coins += n; S.sess.earned += n; saveCoins();
    setText('fc-coinn', num(S.coins)); const c = $('fc-coin'); if(c) c.setAttribute('aria-label', fmt(D.study.coinCounterLabel, { n: num(S.coins) }));
    const f = $('fc-float'); if(f){ const el = document.createElement('span'); el.className = 'fc-floatitem'; el.textContent = '+' + n + ' MGC'; f.appendChild(el); setTimeout(() => el.remove(), reduceMotion() ? 1200 : 1400); }
  }
  function toast(text, big){
    const host = $('fc-toasts'); if(!host) return; const el = document.createElement('div'); el.className = 'fc-toast' + (big ? ' is-big' : ''); el.textContent = text; host.appendChild(el);
    setTimeout(() => el.remove(), 2600);
  }
  function setStreak(n){
    S.sess.streak = n; S.sess.best = Math.max(S.sess.best, n);
    setText('fc-streakn', String(n)); const s = $('fc-streak'); if(s) s.setAttribute('aria-label', fmt(D.study.streakLabel, { n: n }));
    if(n > S.bestEver){ S.bestEver = n; store.write(D.keys.streak, String(n)); }
  }
  function onCorrect(feedback){
    const T = D.study, C = D.coins, ss = S.sess, cs = ss.cardState; cs.done = true; cs.phase = 'correct';
    const first = cs.attempts === 1; let base = first ? C.first : C.second, extra = [];
    award(base);
    if(first){ const secs = (performance.now() - cs.t0 - cs.apiMs) / 1000; if(secs < C.speedSeconds){ award(C.speed); toast(T.toastSpeed, false); extra.push(T.liveSpeed); base += C.speed; } }
    ss.results[ss.i] = first ? 'first' : 'second';
    setStreak(ss.streak + 1);
    if(ss.streak === 3){ award(C.streak3); toast(T.toast3, false); extra.push(T.live3); }
    else if(ss.streak === 5){ award(C.streak5); toast(T.toast5, true); extra.push(T.live5); }
    const earned = base + (ss.streak === 3 ? C.streak3 : ss.streak === 5 ? C.streak5 : 0);
    flip(true); const fb2 = $('fc-fb2'); fb2.className = 'fc-fb is-correct'; fb2.innerHTML = '<span class="fc-fbword">' + esc(T.correctWord) + '</span> ' + esc(feedback);
    const last = ss.i === ss.cards.length - 1;
    buttons([{ id: 'fc-next', label: last ? T.finish : T.next, go: true, fn: advance }], 'fc-fbtns2'); $('fc-next').focus();
    say(T.correctWord + '. ' + plural(earned, T.coinsEarnedOne, T.coinsEarned) + '. ' + feedback + ' ' + extra.join(' '));
    cs.timer = setTimeout(advance, 1500);
  }
  function reveal(timeout){
    const T = D.study, ss = S.sess, cs = ss.cardState; if(cs.done) return; cs.done = true; cs.phase = 'revealed';
    ss.results[ss.i] = 'missed'; setStreak(0);
    flip(true); const fb2 = $('fc-fb2'); fb2.className = 'fc-fb is-wrong'; fb2.textContent = (timeout ? T.timeUp + ' ' : '') + T.missedNote;
    const last = ss.i === ss.cards.length - 1;
    buttons([{ id: 'fc-next', label: last ? T.finish : T.next, go: true, fn: advance }], 'fc-fbtns2'); $('fc-next').focus();
    say((timeout ? T.timeUp : T.missedNote) + ' ' + T.yourAnswerWas + ': ' + ss.cards[ss.i].answer);
  }
  function flip(toBack){
    const f = $('fc-flip'); if(!f) return; f.classList.toggle('is-flipped', toBack); S.sess.cardState.flipped = toBack;
    $('fc-backface').inert = !toBack; $('fc-front').inert = !!toBack;
    if(toBack){ $('fc-front').setAttribute('aria-hidden', 'true'); $('fc-backface').removeAttribute('aria-hidden'); }
  }
  function advance(){
    const ss = S.sess; if(!ss) return; const cs = ss.cardState; if(cs && cs.timer){ clearTimeout(cs.timer); cs.timer = null; }
    if(cs && advancing) return; advancing = true; setTimeout(() => { advancing = false; }, 50);
    if(ss.i >= ss.cards.length - 1){ endSession(false); return; }
    ss.i++; showCard();
  }
  let advancing = false;
  function studyKeys(e){
    if(S.screen !== 'study' || e.key !== 'Escape' || dlg) return;
    const cs = S.sess && S.sess.cardState; if(!cs || cs.done || cs.phase === 'checking') return;
    e.preventDefault(); reveal(false);
  }

  /* ----- shop ----- */
  function openShop(){
    const T = D.shop;
    const body = () => '<p>' + esc(T.intro) + '</p><p class="fc-bal" id="fc-bal" role="status" aria-live="polite">' + esc(fmt(T.balance, { n: num(S.coins) })) + '</p><ul class="fc-shoplist">' +
      T.items.map(it => {
        const owned = S.themes.owned.indexOf(it.id) > -1, active = S.themes.active === it.id;
        const action = active ? '<span class="fc-badge">' + esc(T.inUse) + '</span>' : owned ? '<button type="button" class="fc-btn fc-btn2" data-use="' + it.id + '" aria-label="' + esc(T.use + ': ' + it.name) + '">' + esc(T.use) + '</button>'
          : S.coins >= it.price ? '<button type="button" class="fc-btn fc-go" data-buy="' + it.id + '" aria-label="' + esc(T.buy + ': ' + it.name + ', ' + fmt(T.price, { n: it.price })) + '">' + esc(T.buy) + '</button>'
          : '<span class="fc-small">' + esc(fmt(T.cantAfford, { n: it.price - S.coins })) + '</span>';
        return '<li class="fc-shopitem"><span class="fc-swatch fc-theme-' + it.id + '" aria-hidden="true">Aa</span><div class="fc-shopinfo"><strong>' + esc(it.name) + '</strong><span class="fc-small">' + esc(it.desc) + '</span><span class="fc-small">' + esc(owned ? T.owned : fmt(T.price, { n: it.price })) + '</span></div><div class="fc-shopact">' + action + '</div></li>';
      }).join('') + '</ul><div class="fc-actions"><button type="button" class="fc-btn fc-btn2" id="fc-resettheme">' + esc(T.reset) + '</button><button type="button" class="fc-btn fc-go" id="fc-shopclose">' + esc(T.close) + '</button></div>';
    const box = openDialog(esc(T.title), body(), { focus: '#fc-shopclose' });
    const saveThemes = () => store.write(D.keys.themes, JSON.stringify(S.themes));
    const apply = () => { const f = $('fc-flip'); if(f){ f.className = 'fc-flip' + themeClass() + (S.sess.cardState.flipped ? ' is-flipped' : ''); } };
    const bind = (focusSel, msg) => {
      box.querySelector('.fc-dlgbody').innerHTML = body();
      box.querySelector('#fc-shopclose').addEventListener('click', () => closeDialog());
      box.querySelector('#fc-resettheme').addEventListener('click', () => { S.themes.active = null; saveThemes(); apply(); bind('#fc-resettheme', T.reset + '.'); say(T.resetDone); });
      box.querySelectorAll('[data-use]').forEach(b => b.addEventListener('click', () => { S.themes.active = b.dataset.use; saveThemes(); apply(); bind('[data-use="' + b.dataset.use + '"], .fc-badge'); }));
      box.querySelectorAll('[data-buy]').forEach(b => b.addEventListener('click', () => {
        const it = T.items.find(x => x.id === b.dataset.buy); if(!it || S.coins < it.price || S.themes.owned.indexOf(it.id) > -1) return;
        S.coins -= it.price; saveCoins(); S.themes.owned.push(it.id); S.themes.active = it.id; saveThemes(); apply();
        setText('fc-coinn', num(S.coins)); const ce = $('fc-coin'); if(ce) ce.setAttribute('aria-label', fmt(D.study.coinCounterLabel, { n: num(S.coins) }));
        bind('#fc-shopclose'); say(fmt(T.bought, { name: it.name }));
      }));
      const f = box.querySelector(focusSel || '#fc-shopclose') || box.querySelector('#fc-shopclose'); if(f) f.focus();
    };
    bind('#fc-shopclose');
  }

  /* ----- end of the deck ----- */
  function endSession(early){
    const ss = S.sess; if(!ss) return; stopTick(); const cs = ss.cardState; if(cs && cs.timer) clearTimeout(cs.timer);
    document.removeEventListener('keydown', studyKeys, true); closeDialog(true);
    const first = ss.results.filter(r => r === 'first').length, second = ss.results.filter(r => r === 'second').length, missed = ss.results.filter(r => r === 'missed').length;
    const completed = !early && ss.results.length === ss.cards.length;
    if(completed && ss.mode === 'all'){ const prevEarned = ss.earned; S.sess = ss; award(D.coins.deck); ss.earned = prevEarned + D.coins.deck; }
    // per-deck stats
    const dk = S.deck, st = dk.stats; st.studied += ss.results.filter(Boolean).length; st.correct += first + second; st.coins += ss.earned; st.bestStreak = Math.max(st.bestStreak, ss.best);
    if(dk.id){ const decks = loadDecks(), i = decks.findIndex(d => d.id === dk.id); if(i > -1){ decks[i].stats = cleanDeck(dk).stats; saveDecks(decks); } }
    const st0 = $('fc-study'); if(st0) st0.remove(); document.body.classList.remove('fc-study-open'); hideOutside(false);
    if(early){ const keep = ss; S.sess = null; renderReview(); return; }
    S.last = { first: first, second: second, missed: missed, earned: ss.earned, best: ss.best, missedCards: ss.cards.filter((c, i) => ss.results[i] === 'missed'), all: ss.cards.slice(), deckBonus: completed && ss.mode === 'all' };
    S.sess = null; renderEnd();
  }
  function renderEnd(){
    S.screen = 'end'; const E = D.end, L = S.last;
    root.innerHTML = '<section class="fc-sec fc-end" aria-labelledby="fc-h-end"><h2 id="fc-h-end" tabindex="-1">' + esc(E.title) + '</h2>' +
      '<div class="fc-stats"><div class="fc-stat"><b>' + L.first + '</b><span>' + esc(E.first) + '</span></div><div class="fc-stat"><b>' + L.second + '</b><span>' + esc(E.second) + '</span></div><div class="fc-stat"><b>' + L.missed + '</b><span>' + esc(E.missed) + '</span></div>' +
      '<div class="fc-stat is-coin"><b>' + num(L.earned) + '</b><span>' + esc(E.earned) + '</span></div><div class="fc-stat is-coin"><b>' + num(S.coins) + '</b><span>' + esc(E.total) + '</span></div><div class="fc-stat"><b>' + L.best + '</b><span>' + esc(E.best) + '</span></div></div>' +
      (L.deckBonus ? '<p class="fc-ok">' + esc(D.study.toastDeck) + '</p>' : '') + (L.missed ? '' : '<p class="fc-ok">' + esc(E.allClear) + '</p>') +
      '<div class="fc-actions">' + (L.missed ? '<button type="button" class="fc-btn fc-go" id="fc-missed">' + esc(E.missedOnly) + '</button>' : '') +
      '<button type="button" class="fc-btn ' + (L.missed ? 'fc-btn2' : 'fc-go') + '" id="fc-again">' + esc(E.again) + '</button>' +
      '<button type="button" class="fc-btn fc-btn2" id="fc-eprint">' + esc(E.print) + '</button>' +
      '<button type="button" class="fc-btn fc-btn2" id="fc-eedit">' + esc(E.edit) + '</button>' +
      '<button type="button" class="fc-btn fc-btn2" id="fc-enew">' + esc(E.newNotes) + '</button></div></section>';
    const h = $('fc-h-end'); h.focus();
    say(fmt(E.live, { first: L.first, second: L.second, missed: L.missed }) + (L.deckBonus ? ' ' + D.study.liveDeck : ''));
    const m = $('fc-missed'); if(m) m.addEventListener('click', () => startSession(shuffle(L.missedCards), 'missed'));
    $('fc-again').addEventListener('click', () => startSession(shuffle(L.all), 'all'));
    $('fc-eprint').addEventListener('click', () => printCards(S.deck));
    $('fc-eedit').addEventListener('click', renderReview);
    $('fc-enew').addEventListener('click', () => { S.notes = ''; S.deck = null; renderInput(); });
  }

  /* =====================================================================
     PRINT — a clean two-column sheet of every card (no game parts), built only when a Print button is used
     ===================================================================== */
  function printCards(deck){
    const P = D.print, old = document.title, cards = (deck.cards || []).filter(c => c.question && c.answer);
    const sheet = document.createElement('div'); sheet.className = 'fc-printsheet'; sheet.id = 'fc-printsheet';
    sheet.innerHTML = '<h1>' + esc(deck.name) + '</h1><div class="fc-pgrid">' + cards.map(c => '<div class="fc-pcard"><p class="fc-pq">' + esc(c.question) + '</p><hr><p class="fc-pa">' + esc(c.answer) + '</p></div>').join('') + '</div>';
    document.body.appendChild(sheet); document.body.classList.add('fc-printing'); document.title = fmt(P.page, { name: deck.name });
    const done = () => { window.removeEventListener('afterprint', done); sheet.remove(); document.body.classList.remove('fc-printing'); document.title = old; };
    window.addEventListener('afterprint', done); setTimeout(() => window.print(), 30);
  }

  /* ---------- go ---------- */
  document.body.insertAdjacentHTML('beforeend', '<div class="fc-vh" id="fc-live-main" role="status" aria-live="polite"></div>');
  renderInput();
})();
