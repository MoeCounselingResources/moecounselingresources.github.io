/* =========================================================================
   FINANCIAL AID VISUALS — loaded only by financial-aid.html.
   A section in topics.js can list visuals:  visuals: [{kind:"hub", ...}, ...]
   Kinds: hub (circles around a center, tap to learn more), defs (side-by-side
   definitions), checklist, needChart, flow (numbered steps), grants, loans,
   stepper (linear timeline). Content lives in topics.js; this file only draws it.
   Colors come from the brand variables in styles.css (navy, gold, sky).
   ========================================================================= */

const FAV_REGISTRY = {};
let FAV_COUNT = 0;
const favMoney = n => '$' + Math.round(n).toLocaleString('en-US');
const favEsc = s => escapeHtml(s == null ? '' : String(s));

function renderFaVisuals(list, scope){
  return list.map(v=>{
    const id = `fav${++FAV_COUNT}`;
    FAV_REGISTRY[id] = Object.assign({scope}, v);
    const fn = FAV_RENDER[v.kind];
    return fn ? `<div class="fav favw-${v.kind}" data-fav-id="${id}">${v.heading ? `<h3 class="fav-heading">${favEsc(v.heading)}</h3>` : ''}${fn(v, id)}</div>` : '';
  }).join('');
}

function wireFaVisuals(){
  document.querySelectorAll('[data-fav-id]').forEach(el=>{
    if(el.dataset.favWired) return; el.dataset.favWired = '1';
    const v = FAV_REGISTRY[el.dataset.favId];
    const fn = v && FAV_WIRE[v.kind];
    if(fn) fn(el, v);
  });
}

/* ---------- shared: info panel ---------- */
function favPanel(prompt){
  return `<div class="fav-panel" aria-live="polite"><p class="fav-panel-prompt">${favEsc(prompt || 'Tap a circle to learn more.')}</p></div>`;
}
function favShow(panel, title, text, extraHtml){
  panel.innerHTML = `<h4 class="fav-panel-h">${favEsc(title)}</h4><p class="fav-panel-p">${favEsc(text)}</p>${extraHtml || ''}`;
}
function favLink(l){
  if(!l) return '';
  const ext = /^https?:/i.test(l.url);
  return `<a class="fav-panel-link" href="${favEsc(l.url)}"${ext ? ' target="_blank" rel="noopener"' : ''}>${favEsc(l.text)}${ext ? ' ↗' : ''}</a>`;
}

/* ---------- hub: circles around a center (sources of aid, cost of attendance) ---------- */
function favHubLayout(n){
  const W = 820, H = 540, cx = 410, cy = 270, rx = 300, ry = 190, r = 74;
  return Array.from({length:n}, (_, i)=>{
    const a = (-90 + i * 360 / n) * Math.PI / 180;
    return {x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a), r, W, H, cx, cy};
  });
}
const FAV_RENDER = {};
const FAV_WIRE = {};

FAV_RENDER.hub = (v)=>{
  const pts = favHubLayout(v.items.length);
  const W = 820, H = 540, cr = 88;
  const pos = (x, y, r) => `left:${((x - r) / W * 100).toFixed(2)}%;top:${((y - r) / H * 100).toFixed(2)}%;width:${(2 * r / W * 100).toFixed(2)}%;`;
  const groups = v.groups ? `<div class="fav-chips" role="group" aria-label="Highlight a group">${v.groups.map(g=>
    `<button type="button" class="fav-chip fav-tone-${favEsc(g.tone)}" data-group="${favEsc(g.key)}" aria-pressed="false">${favEsc(g.label)}</button>`).join('')}</div>` : '';
  return `${groups}
    <div class="fav-hub" style="--fav-ratio:${W}/${H}">
      <svg class="fav-hub-lines" viewBox="0 0 ${W} ${H}" aria-hidden="true">
        ${pts.map((p, i)=>`<line class="fav-spoke" data-i="${i}" x1="${p.cx}" y1="${p.cy}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}"/>`).join('')}
      </svg>
      <div class="fav-hub-center" style="${pos(410, 270, cr)}"><span>${favEsc(v.center)}</span></div>
      ${v.items.map((it, i)=>`<button type="button" class="fav-hub-item fav-tone-${favEsc(it.tone || 'sky')}" data-i="${i}"${it.group ? ` data-group="${favEsc(it.group)}"` : ''} aria-pressed="false" style="${pos(pts[i].x, pts[i].y, pts[i].r)}"><span>${favEsc(it.label)}</span></button>`).join('')}
    </div>
    ${favPanel(v.prompt)}`;
};
FAV_WIRE.hub = (el, v)=>{
  const items = el.querySelectorAll('.fav-hub-item');
  const spokes = el.querySelectorAll('.fav-spoke');
  const chips = el.querySelectorAll('.fav-chip');
  const panel = el.querySelector('.fav-panel');
  const reset = ()=>{
    items.forEach(b=>{ b.setAttribute('aria-pressed', 'false'); b.classList.remove('is-dim'); });
    spokes.forEach(s=>s.classList.remove('is-on'));
    chips.forEach(c=>c.setAttribute('aria-pressed', 'false'));
  };
  items.forEach(b=>b.addEventListener('click', ()=>{
    const i = +b.dataset.i, it = v.items[i];
    reset();
    b.setAttribute('aria-pressed', 'true');
    spokes[i].classList.add('is-on');
    const g = it.group && v.groups ? v.groups.find(x=>x.key === it.group) : null;
    favShow(panel, it.label, it.text, (g ? `<p class="fav-panel-tag fav-tone-${favEsc(g.tone)}">${favEsc(g.label)}</p>` : '') + favLink(it.link));
  }));
  chips.forEach(c=>c.addEventListener('click', ()=>{
    const on = c.getAttribute('aria-pressed') !== 'true';
    reset();
    if(!on){ panel.innerHTML = `<p class="fav-panel-prompt">${favEsc(v.prompt)}</p>`; return; }
    c.setAttribute('aria-pressed', 'true');
    const g = v.groups.find(x=>x.key === c.dataset.group);
    items.forEach((b, i)=>{
      const inGroup = b.dataset.group === g.key;
      b.classList.toggle('is-dim', !inGroup);
      if(inGroup) spokes[i].classList.add('is-on');
    });
    favShow(panel, g.label, g.text);
  }));
};

/* ---------- defs: two definitions side by side ---------- */
FAV_RENDER.defs = (v)=>`<div class="fav-defs">${v.items.map(d=>`
  <div class="fav-def fav-tone-${favEsc(d.tone)}">
    <h4>${favEsc(d.title)}</h4>
    <p>${favEsc(d.text)}</p>
  </div>`).join('')}</div>`;

/* ---------- checklist: things to have ready, saved in this browser ---------- */
FAV_RENDER.checklist = (v, id)=>{
  const keyBase = `crh-check-${v.scope}-${v.key || id}`;
  return `<div class="fav-check">
    <div class="fav-check-top">
      <span class="fav-check-count" aria-live="polite">0 of ${v.items.length} ready</span>
      <button type="button" class="fav-check-clear">Clear</button>
    </div>
    <div class="fav-check-bar" aria-hidden="true"><span></span></div>
    <ul class="fav-check-list">${v.items.map((t, i)=>`
      <li><label class="check-item"><input type="checkbox" data-check-key="${favEsc(keyBase)}-${i}"><span>${favEsc(t)}</span></label></li>`).join('')}
    </ul>
    ${v.note ? `<p class="fav-check-note">${favEsc(v.note)}</p>` : ''}
  </div>`;
};
FAV_WIRE.checklist = (el, v)=>{
  const boxes = [...el.querySelectorAll('input[type="checkbox"]')];
  const count = el.querySelector('.fav-check-count');
  const bar = el.querySelector('.fav-check-bar span');
  const update = ()=>{
    const n = boxes.filter(b=>b.checked).length;
    count.textContent = n === boxes.length ? `All ${n} ready. You're set to file.` : `${n} of ${boxes.length} ready`;
    bar.style.width = (n / boxes.length * 100) + '%';
    el.classList.toggle('is-done', n === boxes.length);
  };
  boxes.forEach(b=>b.addEventListener('change', update));
  el.querySelector('.fav-check-clear').addEventListener('click', ()=>{
    boxes.forEach(b=>{ b.checked = false; try{ localStorage.setItem(b.dataset.checkKey, '0'); }catch(e){} });
    update();
  });
  update();
};

/* ---------- needChart: cost minus SAI equals need, with an SAI slider ---------- */
FAV_RENDER.needChart = (v)=>{
  return `<div class="fav-need">
    <p class="fav-need-formula"><span class="fav-f-cost">Cost</span> − <span class="fav-f-sai">SAI</span> = <span class="fav-f-need">Need</span></p>
    <label class="fav-need-slider">
      <span>Try a Student Aid Index (SAI): <strong class="fav-sai-out">${favMoney(v.sai)}</strong></span>
      <input type="range" min="0" max="${v.saiMax}" step="500" value="${v.sai}" aria-label="Student Aid Index">
    </label>
    <div class="fav-need-rows">${v.colleges.map(c=>`
      <div class="fav-need-row" data-cost="${c.cost}">
        <div class="fav-need-label"><strong>${favEsc(c.label)}</strong><span>Cost ${favMoney(c.cost)}</span></div>
        <div class="fav-need-track">
          <div class="fav-need-bar">
            <span class="fav-seg-sai"></span><span class="fav-seg-need"></span>
          </div>
        </div>
        <div class="fav-need-val"><span>Need</span><strong></strong></div>
      </div>`).join('')}
    </div>
    <div class="fav-need-legend" aria-hidden="true"><span><i class="fav-k-sai"></i>Your family's share (SAI)</span><span><i class="fav-k-need"></i>Financial need</span></div>
    ${v.note ? `<p class="fav-need-note">${favEsc(v.note)}</p>` : ''}
  </div>`;
};
FAV_WIRE.needChart = (el, v)=>{
  const slider = el.querySelector('input[type="range"]');
  const out = el.querySelector('.fav-sai-out');
  const max = Math.max(...v.colleges.map(c=>c.cost));
  const draw = ()=>{
    const sai = +slider.value;
    out.textContent = favMoney(sai);
    el.querySelectorAll('.fav-need-row').forEach(row=>{
      const cost = +row.dataset.cost, need = Math.max(0, cost - sai), share = Math.min(sai, cost);
      row.querySelector('.fav-need-bar').style.width = (cost / max * 100) + '%';
      row.querySelector('.fav-seg-sai').style.width = (share / cost * 100) + '%';
      row.querySelector('.fav-seg-need').style.width = (need / cost * 100) + '%';
      row.querySelector('.fav-need-val strong').textContent = favMoney(need);
      row.classList.toggle('is-zero', need === 0);
    });
  };
  slider.addEventListener('input', draw);
  draw();
};

/* ---------- flow: numbered steps joined by a gold line ---------- */
FAV_RENDER.flow = (v)=>`<ol class="fav-flow">${v.items.map((it, i)=>`
    <li><button type="button" class="fav-flow-step" data-i="${i}" aria-pressed="false">
      <span class="fav-flow-num">${i + 1}</span><span class="fav-flow-label">${favEsc(it.label)}</span>
    </button></li>`).join('')}</ol>
  ${favPanel(v.prompt)}`;
FAV_WIRE.flow = (el, v)=>{
  const steps = el.querySelectorAll('.fav-flow-step');
  const panel = el.querySelector('.fav-panel');
  steps.forEach(b=>b.addEventListener('click', ()=>{
    steps.forEach(x=>x.setAttribute('aria-pressed', 'false'));
    b.setAttribute('aria-pressed', 'true');
    const it = v.items[+b.dataset.i];
    favShow(panel, it.label, it.text, favLink(it.link));
  }));
};

/* ---------- grants: icon cards with bullets ---------- */
const FAV_ICONS = {
  federal: '<path d="M4 10h16M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18M12 3l9 5H3z"/>',
  ohio: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  teach: '<path d="M3 7l9-4 9 4-9 4z"/><path d="M7 9v5c0 1.7 2.2 3 5 3s5-1.3 5-3V9"/><path d="M21 7v6"/>',
  merit: '<circle cx="12" cy="9" r="5"/><path d="M8.5 13.2 7 21l5-2.6 5 2.6-1.5-7.8"/>',
  loan: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>'
};
FAV_RENDER.grants = (v)=>`<div class="fav-grants">${v.items.map(g=>`
  <article class="fav-grant">
    <div class="fav-grant-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${FAV_ICONS[g.icon] || FAV_ICONS.federal}</svg></div>
    <div class="fav-grant-body">
      <h4>${favEsc(g.title)}</h4>
      ${g.amount ? `<p class="fav-grant-amount">${favEsc(g.amount)}</p>` : ''}
      <ul>${g.bullets.map(b=> typeof b === 'string'
        ? `<li>${favEsc(b)}</li>`
        : `<li>${favEsc(b.text)}<ul class="fav-grant-sub">${b.sub.map(s=>`<li><span>${favEsc(s.label)}</span><strong>${favEsc(s.value)}</strong></li>`).join('')}</ul></li>`).join('')}</ul>
      ${g.warning ? `<p class="fav-grant-warn">${favEsc(g.warning)}</p>` : ''}
      ${g.link ? favLink(g.link) : ''}
    </div>
  </article>`).join('')}</div>`;

/* ---------- loans: subsidized vs. unsubsidized, with yearly limits ---------- */
FAV_RENDER.loans = (v)=>`
  <div class="fav-loans-top">
    <div class="fav-loan fav-loan-sub"><h4>Subsidized</h4><p>${favEsc(v.sub)}</p></div>
    <div class="fav-loan fav-loan-center">
      <h4>${favEsc(v.center)}</h4>
      <div class="fav-rate"><strong>${favEsc(v.rate)}</strong><span>${favEsc(v.rateNote)}</span></div>
    </div>
    <div class="fav-loan fav-loan-unsub"><h4>Unsubsidized</h4><p>${favEsc(v.unsub)}</p></div>
  </div>
  <p class="fav-loans-caption">${favEsc(v.limitsCaption)}</p>
  <ol class="fav-chevrons">${v.years.map(y=>`
    <li class="fav-chevron"><span class="fav-chev-year">${favEsc(y.year)}</span><strong>${favEsc(y.total)}</strong><span class="fav-chev-sub">${favEsc(y.sub)}</span></li>`).join('')}
  </ol>
  ${v.footnote ? `<p class="fav-loans-foot">${favEsc(v.footnote)}</p>` : ''}`;

/* ---------- stepper: a linear, clickable timeline ---------- */
FAV_RENDER.stepper = (v)=>`
  <div class="fav-stepper">
    <div class="fav-step-track">
      <div class="fav-step-line" aria-hidden="true"><span></span></div>
      <ol class="fav-step-dots">${v.steps.map((s, i)=>`
        <li><button type="button" class="fav-step-dot" data-i="${i}" aria-label="Step ${i + 1}: ${favEsc(s.title)}">
          <span class="fav-step-when">${favEsc(s.when || '')}</span><span class="fav-step-num">${i + 1}</span>
        </button></li>`).join('')}
      </ol>
    </div>
    <div class="fav-panel fav-step-panel" aria-live="polite"></div>
    <div class="dates-nav fav-step-nav">
      <button type="button" class="guide-arrow fav-step-prev">← Back</button>
      <span class="fav-step-pos"></span>
      <button type="button" class="guide-arrow fav-step-next">Next →</button>
    </div>
  </div>`;
FAV_WIRE.stepper = (el, v)=>{
  const dots = el.querySelectorAll('.fav-step-dot');
  const panel = el.querySelector('.fav-step-panel');
  const fill = el.querySelector('.fav-step-line span');
  const prev = el.querySelector('.fav-step-prev'), next = el.querySelector('.fav-step-next');
  const pos = el.querySelector('.fav-step-pos');
  let cur = 0;
  const go = i=>{
    cur = Math.max(0, Math.min(v.steps.length - 1, i));
    dots.forEach((d, j)=>{
      d.classList.toggle('is-done', j < cur);
      d.classList.toggle('is-current', j === cur);
      d.setAttribute('aria-current', j === cur ? 'step' : 'false');
    });
    fill.style.width = (v.steps.length > 1 ? cur / (v.steps.length - 1) * 100 : 0) + '%';
    const s = v.steps[cur];
    const phase = v.steps.slice(0, cur + 1).map(x=>x.when).filter(Boolean).pop() || `Step ${cur + 1}`;
    panel.innerHTML = `<p class="fav-panel-tag fav-tone-gold">${favEsc(phase)}</p>
      <h4 class="fav-panel-h">${favEsc(s.title)}</h4><p class="fav-panel-p">${favEsc(s.text)}</p>`;
    pos.textContent = `Step ${cur + 1} of ${v.steps.length}`;
    prev.disabled = cur === 0; next.disabled = cur === v.steps.length - 1;
  };
  dots.forEach(d=>d.addEventListener('click', ()=>go(+d.dataset.i)));
  prev.addEventListener('click', ()=>go(cur - 1));
  next.addEventListener('click', ()=>go(cur + 1));
  go(0);
};
