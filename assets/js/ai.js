/* =========================================================================
   AI PAGE — draws ai.html from AI_PAGE (assets/data/ai.js). Logic only; all wording is in the data file.
   ========================================================================= */
(function(){
  'use strict';
  const D = AI_PAGE;
  const root = document.getElementById('ai-root');
  if(!root || !D) return;
  const esc = escapeHtml;
  const md = t => esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');
  const blanks = t => esc(t).replace(/\[[^\]]+\]/g, m => `<mark class="ai-blank">${m}</mark>`);

  document.getElementById('ai-intro').innerHTML = md(D.intro);
  document.getElementById('ai-rule').innerHTML = md(D.rule);

  /* ---------- prompt cards ---------- */
  const L = D.library;
  let copySeq = 0;
  const copyBtn = (text, label) => {
    const id = 'ai-c' + (++copySeq);
    return `<div class="ai-copyrow"><button type="button" class="tool-btn small" data-copy="${esc(text)}" data-status="${id}" ${label ? `aria-label="${esc(L.copy)}: ${esc(label)}"` : ''}>${esc(L.copy)}</button><span class="ai-copied" id="${id}" role="status"></span></div>`;
  };
  function promptCard(p){
    const body = p.subprompts
      ? `<div class="ai-subs">${p.subprompts.map(s => `
          <div class="ai-sub"><h4>${esc(s.label)}</h4><pre class="ai-text">${blanks(s.text)}</pre>${copyBtn(s.text, s.label)}</div>`).join('')}</div>`
      : `<pre class="ai-text">${blanks(p.text)}</pre>${copyBtn(p.text, p.title)}`;
    return `<article class="ai-card" id="${esc(p.id)}">
        <h3>${esc(p.title)}${p.byline ? ` <span class="ai-by">(${esc(p.byline)})</span>` : ''}</h3>
        ${body}
        ${p.examples ? `<p class="ai-examples"><strong>Examples:</strong> ${esc(p.examples)}</p>` : ''}
        ${p.note ? `<p class="ai-note">${esc(p.note)}</p>` : ''}
        ${p.checkLinks ? `<p class="ai-note">${esc(L.clickEvery)}</p>` : ''}
        ${p.resumeReminder ? `<p class="ai-note">${esc(L.resumeReminder)}</p>` : ''}
        ${p.link ? `<p class="ai-linkp">${esc(p.link.before || '')}<a href="${esc(p.link.href)}">${esc(p.link.text)}</a></p>` : ''}
      </article>
      ${p.reality ? realityBox() : ''}`;
  }
  const realityBox = () => `<aside class="ai-reality" aria-labelledby="ai-reality-h">
      <h3 id="ai-reality-h">${esc(D.reality.title)}</h3>
      <p>${md(D.reality.text)} <a href="${esc(D.reality.link.href)}">${esc(D.reality.link.text)}</a>.</p></aside>`;

  /* ---------- the page ---------- */
  root.innerHTML = `
    <section class="ai-sec" aria-labelledby="ai-dd">
      <h2 id="ai-dd">${esc(D.doDont.title)}</h2>
      <div class="ai-dd-grid">${D.doDont.cards.map(c => `
        <article class="ai-dd">
          <h3>${esc(c.topic)}</h3>
          <p class="ai-do"><span class="ai-tag ai-tag-do">${esc(D.doDont.doLabel)}</span> ${md(c.do)}</p>
          <p class="ai-dont"><span class="ai-tag ai-tag-dont">${esc(D.doDont.dontLabel)}</span> ${md(c.dont)}</p>
        </article>`).join('')}</div>
    </section>

    <section class="ai-sec" aria-labelledby="ai-rules">
      <h2 id="ai-rules">${esc(D.rules.title)}</h2>
      <ol class="ai-rules">${D.rules.items.map(r => `<li>${md(r)}</li>`).join('')}</ol>
    </section>

    <section class="ai-sec" aria-labelledby="ai-first">
      <h2 id="ai-first">${esc(D.youGoFirst.title)}</h2>
      <div class="ai-tablewrap"><table class="ai-table">
        <thead><tr><th scope="col">${esc(D.youGoFirst.youLabel)}</th><th scope="col">${esc(D.youGoFirst.aiLabel)}</th></tr></thead>
        <tbody>${D.youGoFirst.rows.map(r => `<tr><td data-label="${esc(D.youGoFirst.youLabel)}">${md(r.you)}</td><td data-label="${esc(D.youGoFirst.aiLabel)}">${r.ai ? md(r.ai) : ''}</td></tr>`).join('')}</tbody>
      </table></div>
      <p>${esc(D.youGoFirst.after)}</p>
      <p><strong>${esc(D.youGoFirst.tipsTitle)}:</strong> ${md(D.youGoFirst.tips)}</p>
    </section>

    <section class="ai-sec" aria-labelledby="ai-lib">
      <h2 id="ai-lib">${esc(L.title)}</h2>
      <p>${esc(L.intro)}</p>
      <div class="ai-tabs" role="tablist" aria-label="${esc(L.title)}">${L.groups.map((g, i) => `
        <button type="button" role="tab" class="ai-tab" id="tab-${esc(g.id)}" data-group="${esc(g.id)}" aria-controls="${esc(g.id)}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(g.label)}</button>`).join('')}</div>
      ${L.groups.map((g, i) => `
        <div class="ai-panel" role="tabpanel" id="${esc(g.id)}" aria-labelledby="tab-${esc(g.id)}" ${i === 0 ? '' : 'hidden'}>
          ${g.intro ? `<p class="ai-groupnote">${esc(g.intro)}</p>` : ''}
          ${g.prompts.map(promptCard).join('')}
        </div>`).join('')}
    </section>

    <p class="ai-credits">${esc(D.credits)}</p>`;

  /* ---------- tabs ---------- */
  const tabs = [...root.querySelectorAll('.ai-tab')];
  function showGroup(id, focus){
    tabs.forEach(t => {
      const on = t.dataset.group === id;
      t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
      document.getElementById(t.dataset.group).hidden = !on;
      if(on && focus) t.focus();
    });
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => { showGroup(t.dataset.group); try{ history.replaceState(null, '', '#' + t.dataset.group); }catch(e){} });
    t.addEventListener('keydown', e => {
      let n = null;
      if(e.key === 'ArrowRight') n = (i + 1) % tabs.length; else if(e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
      if(n !== null){ e.preventDefault(); showGroup(tabs[n].dataset.group, true); }
    });
  });

  /* ---------- copy buttons ---------- */
  function fallback(text, el){
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try{ ok = document.execCommand('copy'); }catch(e){}
    ta.remove();
    el.textContent = ok ? L.copied : L.copyFailed;
  }
  root.addEventListener('click', e => {
    const b = e.target.closest('[data-copy]');
    if(!b) return;
    const el = document.getElementById(b.dataset.status), text = b.dataset.copy;
    const ok = () => { el.textContent = L.copied; setTimeout(() => { el.textContent = ''; }, 2200); };
    if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, () => fallback(text, el));
    else fallback(text, el);
  });

  /* ---------- links like ai.html#decision or ai.html#grade-11 ---------- */
  function goHash(){
    let id = '';
    try{ id = decodeURIComponent(location.hash.replace(/^#/, '')); }catch(e){}
    if(!id) return;
    const g = L.groups.find(x => x.id === id || x.prompts.some(p => p.id === id));
    if(g) showGroup(g.id);
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({block: 'start'});
  }
  window.addEventListener('hashchange', goHash);
  goHash();
})();
