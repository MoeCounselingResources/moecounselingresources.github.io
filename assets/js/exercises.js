/* =========================================================================
   EXERCISES — draws the seven interactive exercises from EXERCISES (assets/data/exercises.js) wherever a
   section has  type: "exercise", exercise: "roles"  (see engine.js). Each exercise saves in the student's
   own browser under its own "moeller-ex-..." key. Nothing is ever sent anywhere.
   All wording lives in the data file; this file is logic only.
   ========================================================================= */
(function(){
  'use strict';
  if(typeof EXERCISES === 'undefined') return;
  const X = EXERCISES;
  const esc = escapeHtml;

  /* ---------- small helpers ---------- */
  // **bold** and *italic* in the data file's text
  const md = t => esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');
  const paras = list => list.map(p => `<p>${md(p)}</p>`).join('');
  const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const clone = o => JSON.parse(JSON.stringify(o));
  const has = v => typeof v === 'string' ? v.trim() !== '' : !!v;

  const fmtN = (t, n) => String(t).split('{n}').join(n);
  const reduceMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // a flame that grows from a small spark (1) to a big blaze (5); drawn with the current text color
  const flame = n => `<svg class="ex-flame ex-flame-${n}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12.5 2c.7 3.4-1.1 5-2.6 6.9C8.4 10.7 7 12.4 7 14.9A5 5 0 0 0 17 14.9c0-2-1-3.6-1.6-4.7-.4 1.3-1.2 2-2.1 2.2.7-3.2-.1-6.8-.8-10.4z"/></svg>`;

  function readKey(key){
    try{ const r = localStorage.getItem(key); return r ? JSON.parse(r) : null; }catch(e){ return null; }
  }

  /* ---------- picking tiles (roles, values) ---------- */
  function tileGrid(id, items, picked, max){
    return `<div class="ex-tiles">${items.map((it, i) => `
      <div class="ex-tile${picked.includes(it.name) ? ' is-picked' : ''}">
        <button type="button" class="ex-tile-name" data-act="desc" aria-expanded="false" aria-controls="${id}-d${i}">${esc(it.name)}</button>
        <button type="button" class="ex-tile-pick" data-act="pick" data-v="${esc(it.name)}" aria-pressed="${picked.includes(it.name)}" aria-label="Pick ${esc(it.name)}"><span aria-hidden="true">${picked.includes(it.name) ? '✓' : '+'}</span></button>
        <p class="ex-tile-desc" id="${id}-d${i}" hidden>${esc(it.desc)}</p>
      </div>`).join('')}</div>`;
  }
  function toggleDesc(btn){
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    document.getElementById(btn.getAttribute('aria-controls')).hidden = !open;
  }

  /* ---------- the exercise builders ---------- */
  const B = {};

  /* ===== 1. What role do you play? ===== */
  B.roles = {
    init: s => { s.picks = s.picks || []; s.notes = s.notes || {}; },
    html(d, s){
      return `${paras(d.intro)}
        <p class="ex-stepstitle">${esc(d.stepsTitle)}</p>
        <ol class="ex-steps">${d.steps.map(t => `<li>${md(t)}</li>`).join('')}</ol>
        <p class="ex-count" data-count aria-live="polite">${s.picks.length} of ${d.max} ${esc(d.pickedLabel)}</p>
        ${tileGrid('ex-roles', d.items, s.picks, d.max)}
        <div class="ex-write" data-write>${B.roles.write(d, s)}</div>`;
    },
    write(d, s){
      return `<h3>${esc(d.writeTitle)}</h3>
        <div class="ex-example"><strong>${esc(d.exampleLabel)}</strong><p>${md(d.example)}</p></div>
        ${s.picks.length ? s.picks.map((r, i) => `
          <div class="ex-field"><label class="tool-label" for="ex-roles-n${i}">${esc(r)}</label>
          <textarea class="tool-textarea" id="ex-roles-n${i}" rows="3" data-act="note" data-k="${esc(r)}" placeholder="${esc(d.placeholder)}">${esc(s.notes[r] || '')}</textarea></div>`).join('') : `<p class="ex-hint">Pick a role above, and a writing box for it shows up here.</p>`}`;
    },
    pick(ctx, v){
      const d = ctx.def, s = ctx.state;
      const at = s.picks.indexOf(v);
      if(at >= 0) s.picks.splice(at, 1);
      else if(s.picks.length >= d.max){ flash(ctx, `${d.max} max. Tap one to swap it out.`); return false; }
      else s.picks.push(v);
      return true;
    },
    after(ctx){
      const cnt = ctx.body.querySelector('[data-count]');
      cnt.textContent = `${ctx.state.picks.length} of ${ctx.def.max} ${ctx.def.pickedLabel}`;
      ctx.body.querySelector('[data-write]').innerHTML = B.roles.write(ctx.def, ctx.state);
    },
    click(ctx, t){
      if(t.dataset.act === 'pick'){
        if(B.roles.pick(ctx, t.dataset.v)){
          const on = ctx.state.picks.includes(t.dataset.v);
          t.setAttribute('aria-pressed', String(on)); t.firstChild.textContent = on ? '✓' : '+';
          t.closest('.ex-tile').classList.toggle('is-picked', on);
          B.roles.after(ctx); ctx.save();
        }
        return true;
      }
    },
    input(ctx, t){ if(t.dataset.act === 'note'){ ctx.state.notes[t.dataset.k] = t.value; ctx.save(); return true; } },
    print(d, s){
      if(!s.picks.length) return `<p>${esc(X.ui.nothing)}</p>`;
      return s.picks.map(r => `<h3>${esc(r)}</h3><p class="ex-pre">${esc(s.notes[r] || '')}</p>`).join('');
    }
  };

  /* ===== 2. I love / I know ===== */
  B.loveknow = {
    init: s => { s.love = s.love || []; s.know = s.know || []; s.done = !!s.done; },
    html(d, s){
      return `${paras(d.intro)}
        <div class="ex-two">${d.lists.map(l => `
          <section class="ex-listcol" data-list="${l.id}">${B.loveknow.col(d, s, l)}</section>`).join('')}</div>
        <div class="ex-star" data-star>${B.loveknow.starHtml(d, s)}</div>`;
    },
    col(d, s, l){
      const arr = s[l.id];
      return `<h3>${esc(l.title)}</h3>
        <p class="ex-hint"><strong>Examples:</strong> ${esc(l.examples)}</p>
        <div class="ex-addrow"><label class="ex-vh" for="ex-lk-${l.id}">${esc(l.label)}</label>
          <input class="tool-input" type="text" id="ex-lk-${l.id}" data-add="${l.id}" maxlength="120">
          <button type="button" class="tool-btn secondary small" data-act="add" data-l="${l.id}">${esc(d.addLabel)}</button></div>
        <p class="ex-count${arr.length >= d.target ? ' is-met' : ''}" aria-live="polite">${arr.length} of ${d.target} (${esc(d.aim)})</p>
        <ul class="ex-items">${arr.map((it, i) => `
          <li class="${it.star ? 'is-starred' : ''}"><span class="ex-item-t">${esc(it.t)}</span>
            <button type="button" class="ex-icon" data-act="star" data-l="${l.id}" data-i="${i}" aria-pressed="${!!it.star}" aria-label="Star: ${esc(it.t)}">★</button>
            <button type="button" class="ex-icon" data-act="rm" data-l="${l.id}" data-i="${i}" aria-label="Remove: ${esc(it.t)}">×</button></li>`).join('')}</ul>`;
    },
    starHtml(d, s){
      const ready = s.done || (s.love.length >= d.target && s.know.length >= d.target);
      if(ready) return `<div class="ex-gold"><p>${esc(d.starPrompt)}</p></div>`;
      return `<button type="button" class="tool-btn secondary" data-act="done">${esc(d.doneLabel)}</button>`;
    },
    click(ctx, t){
      const d = ctx.def, s = ctx.state, a = t.dataset.act;
      const refresh = (id) => {
        ctx.body.querySelector(`[data-list="${id}"]`).innerHTML = B.loveknow.col(d, s, d.lists.find(x => x.id === id));
        ctx.body.querySelector('[data-star]').innerHTML = B.loveknow.starHtml(d, s);
      };
      if(a === 'add'){
        const inp = ctx.body.querySelector(`[data-add="${t.dataset.l}"]`);
        const v = inp.value.trim();
        if(!v){ inp.focus(); return true; }
        s[t.dataset.l].push({t: v, star: false});
        refresh(t.dataset.l); ctx.save();
        ctx.body.querySelector(`[data-add="${t.dataset.l}"]`).focus();
        return true;
      }
      if(a === 'star'){ const it = s[t.dataset.l][+t.dataset.i]; it.star = !it.star; refresh(t.dataset.l); ctx.save(); ctx.body.querySelector(`[data-act="star"][data-l="${t.dataset.l}"][data-i="${t.dataset.i}"]`).focus(); return true; }
      if(a === 'rm'){ s[t.dataset.l].splice(+t.dataset.i, 1); refresh(t.dataset.l); ctx.save(); ctx.body.querySelector(`[data-add="${t.dataset.l}"]`).focus(); return true; }
      if(a === 'done'){ s.done = true; ctx.body.querySelector('[data-star]').innerHTML = B.loveknow.starHtml(d, s); ctx.save(); return true; }
    },
    keydown(ctx, e){
      if(e.key === 'Enter' && e.target.dataset.add){ e.preventDefault(); ctx.body.querySelector(`[data-act="add"][data-l="${e.target.dataset.add}"]`).click(); return true; }
    },
    print(d, s){
      return d.lists.map(l => {
        const arr = s[l.id].slice().sort((a, b) => (b.star ? 1 : 0) - (a.star ? 1 : 0));
        return `<h3>${esc(l.title)}</h3>` + (arr.length ? `<ul>${arr.map(i => `<li>${i.star ? '★ ' : ''}${esc(i.t)}</li>`).join('')}</ul>` : `<p>${esc(X.ui.nothing)}</p>`);
      }).join('');
    }
  };

  /* ===== 3. Top 3 values ===== */
  B.values = {
    init: s => { s.step = s.step || 1; s.r = s.r || [[], [], []]; s.moments = s.moments || {}; },
    pool(d, s, step){ return step === 1 ? d.items : s.r[step - 2].map(n => d.items.find(i => i.name === n)).filter(Boolean); },
    html(d, s){ return `${paras(d.intro)}<div data-vals>${B.values.stage(d, s)}</div>`; },
    // the bracket: all values -> top 10 -> top 5 -> top 3, with the current round lit
    bracket(d, s){
      const sizes = [d.items.length].concat(d.rounds);
      const at = Math.min(s.step - 1, 3);   // 0..3 (the moments step counts as the last box)
      return `<ol class="ex-bracket" aria-label="${esc(d.bracketLabel)}">${sizes.map((n, i) => {
        const state = i < at + 1 ? (i === at ? 'is-now' : 'is-past') : '';
        const text = i === 0 ? fmtN(d.bracketAll, n) : fmtN(d.bracketTop, n);
        return `<li class="ex-bk ${state}"${i === at ? ' aria-current="step"' : ''}><span class="ex-bk-n" aria-hidden="true">${n}</span><span class="ex-bk-t">${esc(text)}</span></li>`;
      }).join('')}</ol>`;
    },
    stage(d, s){
      if(s.step > 3){
        const top = s.r[2];
        return `<h3>${esc(d.topTitle)}</h3><p>${esc(d.momentsPrompt)}</p>
          <div class="ex-gold-cards">${top.map((n, i) => `
            <div class="ex-goldcard"><h4>${esc(n)}</h4><p class="ex-hint">${esc((d.items.find(x => x.name === n) || {}).desc || '')}</p>
            <label class="tool-label" for="ex-val-m${i}">One moment when I lived ${esc(n.toLowerCase())}</label>
            <textarea class="tool-textarea" id="ex-val-m${i}" rows="3" data-act="moment" data-k="${esc(n)}" placeholder="${esc(d.momentsPlaceholder)}">${esc(s.moments[n] || '')}</textarea></div>`).join('')}</div>
          <button type="button" class="tool-btn secondary small" data-act="back">Change my picks</button>`;
      }
      const max = d.rounds[s.step - 1];
      const picked = s.r[s.step - 1];
      return `${B.values.bracket(d, s)}<div class="ex-round" data-round="${s.step}"><h3>${esc(d.roundTitles[s.step - 1])}</h3>
        <p class="ex-count${picked.length === max ? ' is-met' : ''}" data-count aria-live="polite">${picked.length} of ${max}</p>
        ${tileGrid('ex-val' + s.step, B.values.pool(d, s, s.step), picked, max)}
        <div class="ex-nav">
          ${s.step > 1 ? `<button type="button" class="tool-btn secondary" data-act="prev">Back</button>` : ''}
          <button type="button" class="tool-btn gold" data-act="next" ${picked.length === max ? '' : 'disabled'}>${s.step === 3 ? 'Done: write my moments' : 'Continue'}</button>
        </div></div>`;
    },
    redraw(ctx, enter){
      const host = ctx.body.querySelector('[data-vals]');
      host.innerHTML = B.values.stage(ctx.def, ctx.state);
      if(enter && !reduceMotion()) host.classList.add('is-entering');
      if(enter) setTimeout(() => host.classList.remove('is-entering'), 700);
    },
    // moving between rounds: the tiles you did not pick fade away, then the shorter list slides in
    move(ctx, delta){
      const host = ctx.body.querySelector('[data-vals]');
      const go = () => { ctx.state.step += delta; B.values.redraw(ctx, true); ctx.save(); focusFirst(ctx.body.querySelector('[data-vals]')); };
      if(delta > 0 && !reduceMotion() && host.querySelector('.ex-tile')){
        host.querySelectorAll('.ex-tile:not(.is-picked)').forEach(t => t.classList.add('is-leaving'));
        host.classList.add('is-leaving-round');
        setTimeout(go, 380);
      } else go();
    },
    click(ctx, t){
      const d = ctx.def, s = ctx.state, a = t.dataset.act;
      if(a === 'pick'){
        const arr = s.r[s.step - 1], max = d.rounds[s.step - 1], v = t.dataset.v, at = arr.indexOf(v);
        if(at >= 0) arr.splice(at, 1);
        else if(arr.length >= max){ flash(ctx, `${max} max. Tap one to swap it out.`); return true; }
        else arr.push(v);
        for(let i = s.step; i < 3; i++) s.r[i] = s.r[i].filter(n => s.r[i - 1].includes(n));   // keep later rounds inside this one
        const on = arr.includes(v);
        t.setAttribute('aria-pressed', String(on)); t.firstChild.textContent = on ? '✓' : '+';
        t.closest('.ex-tile').classList.toggle('is-picked', on);
        const c = ctx.body.querySelector('[data-count]'); c.textContent = `${arr.length} of ${max}`; c.classList.toggle('is-met', arr.length === max);
        ctx.body.querySelector('[data-act="next"]').disabled = arr.length !== max;
        ctx.save(); return true;
      }
      if(a === 'next'){ B.values.move(ctx, 1); return true; }
      if(a === 'prev'){ B.values.move(ctx, -1); return true; }
      if(a === 'back'){ s.step = 3; B.values.redraw(ctx); ctx.save(); return true; }
    },
    input(ctx, t){ if(t.dataset.act === 'moment'){ ctx.state.moments[t.dataset.k] = t.value; ctx.save(); return true; } },
    print(d, s){
      if(!s.r[2].length) return `<p>${esc(X.ui.nothing)}</p>`;
      return `<h3>${esc(d.topTitle)}</h3>` + s.r[2].map(n => `<h4>${esc(n)}</h4><p class="ex-pre">${esc(s.moments[n] || '')}</p>`).join('') +
        (s.r[0].length ? `<p class="ex-hint">Top 10: ${esc(s.r[0].join(', '))}</p>` : '');
    }
  };

  /* ===== 4. What fires you up? ===== */
  B.fires = {
    init: s => { s.rate = s.rate || {}; s.fire = s.fire || ''; s.role = s.role || ''; s.text = s.text || ''; },
    html(d, s){
      return `${paras(d.intro)}
        ${d.groups.map(g => `<fieldset class="ex-fs"><legend>${esc(g.title)}</legend>
          ${g.items.map((it, i) => `
            <div class="ex-rate" role="group" aria-label="${esc(it)}">
              <span class="ex-rate-l">${esc(it)}</span>
              <span class="ex-scale" data-r="${s.rate[it] || 0}"><span aria-hidden="true">${d.scaleLow}</span>${[1,2,3,4,5].map(n => `<button type="button" class="ex-n ex-fl" data-act="rate" data-i="${esc(it)}" data-n="${n}" aria-pressed="${s.rate[it] === n}" aria-label="${esc(it)}: ${n} of 5">${flame(n)}</button>`).join('')}<span aria-hidden="true">${d.scaleHigh}</span></span>
            </div>`).join('')}</fieldset>`).join('')}
        <div data-results>${B.fires.results(d, s)}</div>`;
    },
    fires(d, s){ return Object.keys(s.rate).filter(k => s.rate[k] >= 4).sort((a, b) => s.rate[b] - s.rate[a]); },
    results(d, s){
      const list = B.fires.fires(d, s);
      const roles = ((readKey(X.roles.key) || {}).picks) || [];
      return `<section class="ex-results"><h3>${esc(d.resultsTitle)}</h3>
        ${list.length ? `<ul class="ex-firelist">${list.map(k => `<li><span>${esc(k)}</span><strong>🔥${s.rate[k]}</strong></li>`).join('')}</ul>` : `<p class="ex-hint">${esc(d.resultsEmpty)}</p>`}
        <p>${esc(d.connectPrompt)}</p>
        <div class="ex-field"><label class="tool-label" for="ex-fire-pick">${esc(d.fireLabel)}</label>
          <select class="tool-select" id="ex-fire-pick" data-act="fire"><option value="">Choose</option>${list.map(k => `<option${k === s.fire ? ' selected' : ''}>${esc(k)}</option>`).join('')}</select></div>
        <div class="ex-field"><span class="tool-label" id="ex-role-l">${esc(d.roleLabel)}</span>
          ${roles.length ? `<p class="ex-hint">${esc(d.rolesFromEx1)}</p><div class="ex-chips" role="group" aria-labelledby="ex-role-l">${roles.map(r => `<button type="button" class="ex-chip" data-act="role" data-v="${esc(r)}" aria-pressed="${s.role === r}">${esc(r)}</button>`).join('')}</div>` : `<p class="ex-hint">${esc(d.noRoles)}</p><input class="tool-input" type="text" id="ex-role-free" data-act="rolefree" aria-labelledby="ex-role-l" value="${esc(s.role)}">`}</div>
        <div class="ex-field"><label class="tool-label" for="ex-fire-text">${esc(d.connectLabel)}</label>
          <textarea class="tool-textarea" id="ex-fire-text" rows="3" data-act="ftext">${esc(s.text)}</textarea></div>
        <a class="tool-btn" href="${esc(d.opportunitiesHref)}">${esc(d.findOpportunities)}</a></section>`;
    },
    click(ctx, t){
      const s = ctx.state, d = ctx.def;
      if(t.dataset.act === 'rate'){
        const n = +t.dataset.n, k = t.dataset.i;
        if(s.rate[k] === n) delete s.rate[k]; else s.rate[k] = n;
        t.parentNode.querySelectorAll('.ex-n').forEach(b => b.setAttribute('aria-pressed', String(s.rate[k] === +b.dataset.n)));
        t.parentNode.dataset.r = String(s.rate[k] || 0);
        if(s.fire && !(s.rate[s.fire] >= 4)) s.fire = '';
        ctx.body.querySelector('[data-results]').innerHTML = B.fires.results(d, s);
        ctx.save(); return true;
      }
      if(t.dataset.act === 'role'){
        s.role = s.role === t.dataset.v ? '' : t.dataset.v;
        t.parentNode.querySelectorAll('.ex-chip').forEach(b => b.setAttribute('aria-pressed', String(s.role === b.dataset.v)));
        ctx.save(); return true;
      }
    },
    input(ctx, t){
      if(t.dataset.act === 'fire'){ ctx.state.fire = t.value; ctx.save(); return true; }
      if(t.dataset.act === 'rolefree'){ ctx.state.role = t.value; ctx.save(); return true; }
      if(t.dataset.act === 'ftext'){ ctx.state.text = t.value; ctx.save(); return true; }
    },
    print(d, s){
      const list = B.fires.fires(d, s);
      return `<h3>${esc(d.resultsTitle)}</h3>` + (list.length ? `<ul>${list.map(k => `<li>${esc(k)} (${s.rate[k]} of 5)</li>`).join('')}</ul>` : `<p>${esc(X.ui.nothing)}</p>`) +
        (has(s.fire) || has(s.role) || has(s.text) ? `<h3>${esc(d.fireLabel)} + ${esc(d.roleLabel)}</h3><p>${esc(s.fire)}${s.fire && s.role ? ' + ' : ''}${esc(s.role)}</p><p class="ex-pre">${esc(s.text)}</p>` : '');
    }
  };

  /* ===== 5. Montage essay ===== */
  B.montage = {
    init: s => { s.threads = s.threads || []; s.custom = s.custom || []; s.moments = s.moments || {}; s.best = s.best || ''; },
    html(d, s){
      return `${paras(d.intro)}
        <p class="ex-stepstitle">${esc(d.stepsTitle)}</p>
        <ol class="ex-steps">${d.steps.map(t => `<li>${md(t)}</li>`).join('')}</ol>
        <div class="ex-example"><strong>${esc(d.exampleLabel)}</strong><p>${md(d.example)}</p></div>
        <h3>${esc(d.threadsTitle)}</h3>
        <p class="ex-count" data-count aria-live="polite">${s.threads.length} of ${d.maxThreads}</p>
        <div data-chips>${B.montage.chips(d, s)}</div>
        <div data-threads>${B.montage.threads(d, s)}</div>`;
    },
    chips(d, s){
      const all = d.threads.concat(s.custom.filter(c => !d.threads.includes(c)));
      return `<div class="ex-chips" role="group" aria-label="${esc(d.threadsTitle)}">${all.map(t => `<button type="button" class="ex-chip" data-act="thread" data-v="${esc(t)}" aria-pressed="${s.threads.includes(t)}">${esc(t)}</button>`).join('')}</div>
        <div class="ex-addrow"><label class="tool-label" for="ex-mo-own">${esc(d.writeOwn)}</label>
          <input class="tool-input" type="text" id="ex-mo-own" maxlength="60" data-own>
          <button type="button" class="tool-btn secondary small" data-act="addown">${esc(d.addLabel)}</button></div>`;
    },
    threads(d, s){
      if(!s.threads.length) return '';
      return `${s.threads.map((th, ti) => `
        <fieldset class="ex-fs ex-thread${s.best === th ? ' is-best' : ''}"><legend>Thread: ${esc(th)}</legend>
          ${Array.from({length: d.momentSlots}, (_, i) => `<div class="ex-field"><label class="tool-label" for="ex-mo-${ti}-${i}">${esc(d.momentLabel)} ${i + 1}</label>
          <input class="tool-input" type="text" id="ex-mo-${ti}-${i}" data-act="moment" data-t="${esc(th)}" data-i="${i}" value="${esc((s.moments[th] || [])[i] || '')}"></div>`).join('')}
        </fieldset>`).join('')}
        <fieldset class="ex-fs"><legend>${esc(d.bestQuestion)}</legend>
          <div class="ex-chips">${s.threads.map(th => `<button type="button" class="ex-chip${s.best === th ? ' is-best' : ''}" data-act="best" data-v="${esc(th)}" aria-pressed="${s.best === th}">${esc(th)}</button>`).join('')}</div>
        </fieldset>
        <p class="ex-linkp"><a class="ex-link" href="${esc(d.nextStep.href)}">${esc(d.nextStep.text)}</a></p>`;
    },
    redraw(ctx){
      ctx.body.querySelector('[data-count]').textContent = `${ctx.state.threads.length} of ${ctx.def.maxThreads}`;
      ctx.body.querySelector('[data-chips]').innerHTML = B.montage.chips(ctx.def, ctx.state);
      ctx.body.querySelector('[data-threads]').innerHTML = B.montage.threads(ctx.def, ctx.state);
    },
    toggle(ctx, v){
      const s = ctx.state, at = s.threads.indexOf(v);
      if(at >= 0){ s.threads.splice(at, 1); if(s.best === v) s.best = ''; }
      else if(s.threads.length >= ctx.def.maxThreads){ flash(ctx, `${ctx.def.maxThreads} max. Tap one to swap it out.`); return false; }
      else s.threads.push(v);
      return true;
    },
    click(ctx, t){
      const s = ctx.state, a = t.dataset.act;
      if(a === 'thread'){ if(B.montage.toggle(ctx, t.dataset.v)){ B.montage.redraw(ctx); ctx.save(); const b = ctx.body.querySelector(`[data-act="thread"][data-v="${CSS.escape(t.dataset.v)}"]`); if(b) b.focus(); } return true; }
      if(a === 'addown'){
        const inp = ctx.body.querySelector('[data-own]'), v = inp.value.trim();
        if(!v){ inp.focus(); return true; }
        const known = ctx.def.threads.concat(s.custom).find(x => x.toLowerCase() === v.toLowerCase());
        const name = known || v;
        if(!known) s.custom.push(name);
        if(!s.threads.includes(name)) B.montage.toggle(ctx, name);
        B.montage.redraw(ctx); ctx.save(); ctx.body.querySelector('[data-own]').focus();
        return true;
      }
      if(a === 'best'){ s.best = s.best === t.dataset.v ? '' : t.dataset.v; B.montage.redraw(ctx); ctx.save(); const b = ctx.body.querySelector(`[data-act="best"][data-v="${CSS.escape(t.dataset.v)}"]`); if(b) b.focus(); return true; }
    },
    input(ctx, t){
      if(t.dataset.act === 'moment'){ const arr = (ctx.state.moments[t.dataset.t] = ctx.state.moments[t.dataset.t] || []); arr[+t.dataset.i] = t.value; for(let i = 0; i < arr.length; i++) if(arr[i] === undefined) arr[i] = ''; ctx.save(); return true; }
    },
    keydown(ctx, e){ if(e.key === 'Enter' && e.target.dataset.own !== undefined){ e.preventDefault(); ctx.body.querySelector('[data-act="addown"]').click(); return true; } },
    print(d, s){
      if(!s.threads.length) return `<p>${esc(X.ui.nothing)}</p>`;
      return s.threads.map(th => `<h3>Thread: ${esc(th)}${s.best === th ? ' ★ (my pick)' : ''}</h3><ol>${(s.moments[th] || []).filter(has).map(m => `<li>${esc(m)}</li>`).join('')}</ol>`).join('');
    }
  };

  /* ===== 6. Pre-mortem ===== */
  const icsEsc = t => String(t).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
  const pad = n => String(n).padStart(2, '0');
  function downloadIcs(fix, date, plan){
    const [y, m, dd] = date.split('-').map(Number);
    const d0 = new Date(Date.UTC(y, m - 1, dd)), d1 = new Date(Date.UTC(y, m - 1, dd + 1));
    const ymd = d => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
    const now = new Date();
    const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Moeller Counseling//Pre-mortem//EN', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
      `UID:${Date.now()}-${Math.floor(Math.random() * 1e6)}@moeller-counseling`, `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${ymd(d0)}`, `DTEND;VALUE=DATE:${ymd(d1)}`, `SUMMARY:${icsEsc(fix)}`,
      `DESCRIPTION:${icsEsc('My plan: ' + plan)}`, 'END:VEVENT', 'END:VCALENDAR'];
    const blob = new Blob([lines.join('\r\n') + '\r\n'], {type: 'text/calendar;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'my-fix-this-week.ics';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  B.premortem = {
    init(s, d){ if(typeof s.plan !== 'string') s.plan = d.defaultPlan; s.rounds = (s.rounds && s.rounds.length) ? s.rounds : [{what: '', surprise: '', fix: '', date: ''}]; },
    html(d, s){
      return `${paras(d.intro)}
        <ol class="ex-steps ex-bigsteps">${d.steps.map(st => `<li><strong>${esc(st.title)}</strong> ${md(st.text)}${st.examples ? `<br><em>Examples:</em> ${esc(st.examples)}` : ''}</li>`).join('')}</ol>
        <div class="ex-gold"><p><strong>Tips:</strong> ${esc(d.tips)}</p></div>
        <div class="ex-field"><label class="tool-label" for="ex-pm-plan">${esc(d.planLabel)}</label>
          <textarea class="tool-textarea" id="ex-pm-plan" rows="2" data-act="plan">${esc(s.plan)}</textarea></div>
        <div data-meter>${B.premortem.meter(d, s)}</div>
        <div data-rounds>${B.premortem.rounds(d, s)}</div>
        <button type="button" class="tool-btn secondary" data-act="addround">${esc(d.addRound)}</button>
        <p class="ex-links">${d.links.map(l => `<a class="ex-link" href="${esc(l.href)}">${esc(l.text)}</a>`).join(' · ')}</p>
        <details class="ex-details"><summary>${esc(d.counselorTitle)}</summary><p>${esc(d.counselorNote)}</p></details>`;
    },
    latest(s){ for(let i = s.rounds.length - 1; i >= 0; i--){ const n = parseInt(s.rounds[i].surprise, 10); if(n >= 1 && n <= 10) return n; } return 0; },
    meter(d, s){
      const n = B.premortem.latest(s);
      return `<div class="ex-meter${n >= 8 ? ' is-gold' : ''}" role="img" aria-label="${esc(d.meterLabel)}: ${n} of 10">
        <span class="ex-meter-l">${esc(d.meterLabel)}</span><span class="ex-meter-bar"><span style="width:${n * 10}%"></span></span><strong>${n || '–'}</strong></div>
        ${n ? `<p class="ex-hint">${esc(n >= 8 ? d.meterGood : d.meterKeep)}</p>` : ''}`;
    },
    rounds(d, s){
      return s.rounds.map((r, i) => `
        <fieldset class="ex-fs ex-round"><legend>${esc(d.roundTitle)} ${i + 1}</legend>
          <div class="ex-field"><label class="tool-label" for="ex-pm-w${i}">${esc(d.happenedLabel)}</label>
            <textarea class="tool-textarea" id="ex-pm-w${i}" rows="3" data-act="rf" data-i="${i}" data-f="what">${esc(r.what)}</textarea></div>
          <div class="ex-grid3">
            <div><label class="tool-label" for="ex-pm-s${i}">${esc(d.surpriseLabel)}</label>
              <select class="tool-select" id="ex-pm-s${i}" data-act="rf" data-i="${i}" data-f="surprise"><option value="">Choose</option>${Array.from({length: 10}, (_, k) => `<option${String(k + 1) === String(r.surprise) ? ' selected' : ''}>${k + 1}</option>`).join('')}</select></div>
            <div><label class="tool-label" for="ex-pm-f${i}">${esc(d.fixLabel)}</label>
              <input class="tool-input" type="text" id="ex-pm-f${i}" data-act="rf" data-i="${i}" data-f="fix" value="${esc(r.fix)}"></div>
            <div><label class="tool-label" for="ex-pm-d${i}">${esc(d.dateLabel)}</label>
              <input class="tool-input" type="date" id="ex-pm-d${i}" data-act="rf" data-i="${i}" data-f="date" value="${esc(r.date)}"></div>
          </div>
          <button type="button" class="tool-btn secondary small" data-act="ics" data-i="${i}">${esc(d.calendar)}</button>
          <span class="ex-msg" data-msg="${i}" role="status"></span>
          ${s.rounds.length > 1 ? `<button type="button" class="tool-btn danger small" data-act="rmround" data-i="${i}">${esc(d.removeRound)}</button>` : ''}
        </fieldset>`).join('');
    },
    click(ctx, t){
      const s = ctx.state, d = ctx.def, a = t.dataset.act;
      if(a === 'addround'){ s.rounds.push({what: '', surprise: '', fix: '', date: ''}); ctx.body.querySelector('[data-rounds]').innerHTML = B.premortem.rounds(d, s); ctx.save(); const last = ctx.body.querySelectorAll('[data-rounds] textarea'); last[last.length - 1].focus(); return true; }
      if(a === 'rmround'){ s.rounds.splice(+t.dataset.i, 1); ctx.body.querySelector('[data-rounds]').innerHTML = B.premortem.rounds(d, s); ctx.body.querySelector('[data-meter]').innerHTML = B.premortem.meter(d, s); ctx.save(); return true; }
      if(a === 'ics'){
        const r = s.rounds[+t.dataset.i], msg = ctx.body.querySelector(`[data-msg="${t.dataset.i}"]`);
        if(!has(r.fix) || !r.date){ msg.textContent = d.calendarNeeds; return true; }
        msg.textContent = ''; downloadIcs(r.fix.trim(), r.date, s.plan); return true;
      }
    },
    input(ctx, t){
      const s = ctx.state;
      if(t.dataset.act === 'plan'){ s.plan = t.value; ctx.save(); return true; }
      if(t.dataset.act === 'rf'){
        s.rounds[+t.dataset.i][t.dataset.f] = t.value;
        if(t.dataset.f === 'surprise') ctx.body.querySelector('[data-meter]').innerHTML = B.premortem.meter(ctx.def, s);
        ctx.save(); return true;
      }
    },
    print(d, s){
      return `<h3>${esc(d.planLabel)}</h3><p>${esc(s.plan)}</p>` + s.rounds.filter(r => has(r.what) || has(r.fix)).map((r, i) =>
        `<h3>${esc(d.roundTitle)} ${i + 1}</h3><p class="ex-pre">${esc(r.what)}</p><p>${esc(d.surpriseLabel)} ${esc(r.surprise || '–')}</p><p>${esc(d.fixLabel)}: ${esc(r.fix)}${r.date ? ' (' + esc(r.date) + ')' : ''}</p>`).join('');
    }
  };

  /* ===== 7. What do you actually need? ===== */
  B.needs = {
    init: s => { s.mine = s.mine || []; s.parent = s.parent || []; s.mode = s.mode || 'student'; s.options = (s.options && s.options.length) ? s.options : [{name: '', scores: {}}, {name: '', scores: {}}]; },
    html(d, s){ return `${paras(d.intro)}<div data-needs>${B.needs.stage(d, s)}</div>`; },
    chips(list, picked, who){
      return `<div class="ex-chips" role="group" aria-label="Needs">${list.map(n => `<button type="button" class="ex-chip" data-act="need" data-who="${who}" data-v="${esc(n)}" aria-pressed="${picked.includes(n)}">${esc(n)}</button>`).join('')}</div>`;
    },
    stage(d, s){
      const parent = s.mode === 'parent';
      const links = `<p class="ex-links">${d.links.map(l => `<a class="ex-link" href="${esc(l.href)}">${esc(l.text)}</a>`).join(' · ')}</p>`;
      const compare = (s.mine.length || s.parent.length) ? `
        <h3>${esc(d.compareTitle)}</h3>
        <div class="ex-two ex-compare">
          <div><h4>${esc(d.studentColumn)}</h4><ul>${s.mine.map(n => `<li class="${s.parent.includes(n) ? 'is-shared' : ''}">${esc(n)}${s.parent.includes(n) ? ` <span class="ex-tag">${esc(d.shared)}</span>` : ''}</li>`).join('') || '<li class="ex-hint">–</li>'}</ul></div>
          <div><h4>${esc(d.parentColumn)}</h4><ul>${s.parent.map(n => `<li class="${s.mine.includes(n) ? 'is-shared' : ''}">${esc(n)}${s.mine.includes(n) ? ` <span class="ex-tag">${esc(d.shared)}</span>` : ''}</li>`).join('') || '<li class="ex-hint">–</li>'}</ul></div>
        </div>` : '';
      if(parent) return `<h3>${esc(d.parentTitle)}</h3><p>${esc(d.parentPrompt)}</p>
        <p class="ex-count" data-count aria-live="polite">${s.parent.length} of ${d.max}</p>
        ${B.needs.chips(d.needs, s.parent, 'parent')}${compare}
        <div class="ex-gold"><p><strong>${esc(d.parentTipTitle)}:</strong> ${esc(d.parentTip)}</p></div>
        <button type="button" class="tool-btn" data-act="mode" data-m="student">${esc(d.studentButton)}</button>`;
      return `<h3>${esc(d.step1)}</h3>
        <p class="ex-count" data-count aria-live="polite">${s.mine.length} of ${d.max}</p>
        ${B.needs.chips(d.needs, s.mine, 'mine')}
        <h3>${esc(d.step2)}</h3><p>${esc(d.step2Text)}</p>
        ${s.mine.length ? B.needs.table(d, s) : `<p class="ex-hint">Pick your needs above, and the score table shows up here.</p>`}
        <p class="ex-hint">${esc(d.scoreNote)}</p>
        <h3>${esc(d.step3)}</h3><p>${md(d.step3Text)}</p>
        <button type="button" class="tool-btn secondary" data-act="mode" data-m="parent">${esc(d.parentButton)}</button>
        ${compare}
        <div class="ex-gold"><p><strong>${esc(d.parentTipTitle)}:</strong> ${esc(d.parentTip)}</p></div>${links}`;
    },
    table(d, s){
      const tot = o => s.mine.reduce((a, n) => a + (parseInt(o.scores[n], 10) || 0), 0);
      return `<div class="ex-tablewrap"><table class="ex-table"><thead><tr><th scope="col">${esc(d.optionLabel)}</th>${s.mine.map(n => `<th scope="col">${esc(n)}</th>`).join('')}<th scope="col">${esc(d.totalLabel)}</th></tr></thead><tbody>
        ${s.options.map((o, oi) => `<tr><td data-label="${esc(d.optionLabel)}"><input class="tool-input" type="text" data-act="oname" data-o="${oi}" aria-label="${esc(d.optionLabel)} ${oi + 1} name" placeholder="${esc(d.optionPlaceholder)}" value="${esc(o.name)}"></td>
          ${s.mine.map(n => `<td data-label="${esc(n)}"><select class="tool-select" data-act="score" data-o="${oi}" data-n="${esc(n)}" aria-label="${esc(n)}, ${esc(o.name || d.optionLabel + ' ' + (oi + 1))}"><option value="">–</option>${[1,2,3,4,5].map(k => `<option${String(k) === String(o.scores[n]) ? ' selected' : ''}>${k}</option>`).join('')}</select></td>`).join('')}
          <td data-label="${esc(d.totalLabel)}"><strong data-total="${oi}">${tot(o)}</strong></td></tr>`).join('')}
        </tbody></table></div>
        ${s.options.length < d.maxOptions ? `<button type="button" class="tool-btn secondary small" data-act="addopt">${esc(d.addOption)}</button>` : ''}`;
    },
    redraw(ctx){ ctx.body.querySelector('[data-needs]').innerHTML = B.needs.stage(ctx.def, ctx.state); },
    click(ctx, t){
      const s = ctx.state, d = ctx.def, a = t.dataset.act;
      if(a === 'need'){
        const arr = t.dataset.who === 'parent' ? s.parent : s.mine, v = t.dataset.v, at = arr.indexOf(v);
        if(at >= 0) arr.splice(at, 1);
        else if(arr.length >= d.max){ flash(ctx, `${d.max} max. Tap one to swap it out.`); return true; }
        else arr.push(v);
        ctx.save(); B.needs.redraw(ctx);
        const b = ctx.body.querySelector(`[data-act="need"][data-who="${t.dataset.who}"][data-v="${CSS.escape(v)}"]`); if(b) b.focus();
        return true;
      }
      if(a === 'mode'){ s.mode = t.dataset.m; ctx.save(); B.needs.redraw(ctx); focusFirst(ctx.body.querySelector('[data-needs]')); return true; }
      if(a === 'addopt'){ s.options.push({name: '', scores: {}}); ctx.save(); B.needs.redraw(ctx); const ins = ctx.body.querySelectorAll('[data-act="oname"]'); ins[ins.length - 1].focus(); return true; }
    },
    input(ctx, t){
      const s = ctx.state, d = ctx.def;
      if(t.dataset.act === 'oname'){ s.options[+t.dataset.o].name = t.value; ctx.save(); return true; }
      if(t.dataset.act === 'score'){
        s.options[+t.dataset.o].scores[t.dataset.n] = t.value;
        const o = s.options[+t.dataset.o];
        ctx.body.querySelector(`[data-total="${t.dataset.o}"]`).textContent = s.mine.reduce((a, n) => a + (parseInt(o.scores[n], 10) || 0), 0);
        ctx.save(); return true;
      }
    },
    print(d, s){
      let out = `<h3>${esc(d.studentColumn)}</h3><p>${esc(s.mine.join(', ') || X.ui.nothing)}</p>`;
      const opts = s.options.filter(o => has(o.name));
      if(opts.length) out += `<h3>${esc(d.step2)}</h3><ul>${opts.map(o => `<li>${esc(o.name)}: ${s.mine.map(n => `${esc(n)} ${esc(o.scores[n] || '–')}`).join(', ')} (${esc(d.totalLabel)} ${s.mine.reduce((a, n) => a + (parseInt(o.scores[n], 10) || 0), 0)})</li>`).join('')}</ul>`;
      if(s.parent.length) out += `<h3>${esc(d.parentColumn)}</h3><p>${esc(s.parent.join(', '))}</p><p>${esc(d.shared)}: ${esc(s.mine.filter(n => s.parent.includes(n)).join(', ') || '–')}</p>`;
      return out;
    }
  };

  /* ---------- shared behavior ---------- */
  function flash(ctx, msg){
    const c = ctx.body.querySelector('[data-count]');
    if(!c) return;
    const old = c.textContent;
    c.textContent = msg; c.classList.add('is-flash');
    clearTimeout(ctx.ft);
    ctx.ft = setTimeout(() => { c.classList.remove('is-flash'); c.textContent = old; }, 2600);
  }
  function focusFirst(el){ const f = el.querySelector('h3'); if(f){ f.setAttribute('tabindex', '-1'); f.focus({preventScroll: false}); } }

  function setStatus(ctx, kind){
    const el = ctx.host.querySelector('.ex-status');
    if(!el) return;
    el.classList.toggle('is-warn', kind === 'blocked');
    el.textContent = kind === 'blocked' ? X.ui.blocked : (kind === 'saved' ? X.ui.saved : '');
  }
  function printSheet(ctx){
    let sheet = ctx.host.querySelector('.ex-sheet');
    if(sheet) sheet.remove();
    sheet = document.createElement('div');
    sheet.className = 'ex-sheet';
    const title = ctx.host.dataset.title || X.ui.printTitle;
    sheet.innerHTML = `<h2>${esc(title)}: ${esc(X.ui.printTitle)}</h2>${B[ctx.id].print(ctx.def, ctx.state)}<p class="ex-credit">${esc(X.credits[ctx.def.credit] || '')}</p>`;
    ctx.host.appendChild(sheet);
    document.body.classList.add('ex-printing'); ctx.host.classList.add('ex-print-target');
    const done = () => { document.body.classList.remove('ex-printing'); ctx.host.classList.remove('ex-print-target'); sheet.remove(); window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    window.print();
  }

  window.renderExercise = function(host, id){
    const def = X[id], b = B[id];
    if(!def || !b) return;
    const state = readKey(def.key) || {};
    const ctx = {host, id, def, state, t: null, ft: null};
    b.init(state, def);
    ctx.save = () => {
      clearTimeout(ctx.t);
      ctx.t = setTimeout(() => {
        try{ localStorage.setItem(def.key, JSON.stringify(state)); setStatus(ctx, 'saved'); }catch(e){ setStatus(ctx, 'blocked'); }
      }, 350);
    };
    host.classList.add('ex');
    host.dataset.ex = id;
    host.innerHTML = `<div class="ex-body">${b.html(def, state)}</div>
      <div class="ex-foot"><button type="button" class="tool-btn secondary ex-print" data-act="printsheet">${esc(X.ui.print)}</button>
        <span class="ex-status" role="status" aria-live="polite"></span></div>
      <p class="ex-privacy">${esc(X.ui.privacy)}</p>
      <p class="ex-credit">${esc(X.credits[def.credit] || '')}</p>`;
    ctx.body = host.querySelector('.ex-body');
    try{ localStorage.getItem(def.key); }catch(e){ setStatus(ctx, 'blocked'); }

    host.addEventListener('click', e => {
      const t = e.target.closest('[data-act]');
      if(!t || !host.contains(t)) return;
      if(t.dataset.act === 'printsheet'){ printSheet(ctx); return; }
      if(t.dataset.act === 'desc'){ toggleDesc(t); return; }
      if(b.click && b.click(ctx, t)) return;
    });
    const onInput = e => { const t = e.target; if(t.dataset && t.dataset.act && b.input) b.input(ctx, t); };
    host.addEventListener('input', onInput);
    host.addEventListener('change', e => { if(e.target.tagName === 'SELECT') onInput(e); });
    host.addEventListener('keydown', e => { if(b.keydown) b.keydown(ctx, e); });
    window.addEventListener('pagehide', () => { if(ctx.t){ clearTimeout(ctx.t); try{ localStorage.setItem(def.key, JSON.stringify(state)); }catch(e){} } });
  };
})();
