/* ========================================================================
   Rendering engine (from the original College Resource Hub).
   No need to edit this file — content lives in assets/data/ and
   assets/js/shared-content.js.
   ======================================================================== */

const DEFAULT_SECTION_ORDER = ["research","essays","timeline","testing","financialAid"];

function isExternal(url){ return /^https?:\/\//i.test(url); }
function resourceLinkHtml(url){
  if(isExternal(url)) return `<a class="resource-link" href="${escapeHtml(url)}" target="_blank" rel="noopener">Open ↗</a>`;
  return `<a class="resource-link" href="${escapeHtml(url)}">Open</a>`;
}

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderHero(year){
  const y = YEARS[year];
  const hero = document.getElementById('hero');
  hero.classList.remove('animate');
  hero.innerHTML = `
    <span class="hero-stage">${escapeHtml(y.stage)}</span>
    <h1>${escapeHtml(y.label)}</h1>
    <p>${escapeHtml(y.blurb)}</p>
  `;
  void hero.offsetWidth;
  hero.classList.add('animate');
}

/* Which checklist period matches today? Each group lists its calendar months
   (1 = January); if none match, the first group opens. */
function currentChecklistGroup(groups){
  const m = new Date().getMonth() + 1;
  const i = groups.findIndex(g => (g.months || []).includes(m));
  return i >= 0 ? i : 0;
}

/* ---------- Deadline notifications built from popular-colleges.js ---------- */
const MONTH_NUM = {sep:9, oct:10, nov:11, dec:12};
const MONTH_ABBR = {9:'Sept.', 10:'Oct.', 11:'Nov.', 12:'Dec.'};
function collegeSlug(name){ return 'college-' + String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function collegeShortName(c){
  if(c.shortName) return c.shortName;
  return c.name.replace(/^(The )?University of /i, '').replace(/ University$/i, '').replace(/ University /i, ' ');
}
/* "Sept 15, Oct 15, Nov 15" -> [{m:9,d:15},...]. Parentheticals (e.g. materials deadlines) are ignored. */
function earlyDeadlineDates(text){
  const out = [];
  const re = /\b(sep|oct|nov|dec)[a-z]*\.?\s*(\d{1,2})\b/gi;
  const clean = String(text || '').replace(/\([^)]*\)/g, '');
  let m;
  while((m = re.exec(clean))) out.push({m: MONTH_NUM[m[1].toLowerCase()], d: parseInt(m[2], 10)});
  return out;
}
function buildDeadlineNotices(cfg, yearKey){
  if(typeof POPULAR_COLLEGES === 'undefined') return [];
  const classOf = parseInt((YEARS[yearKey] || {}).classOf, 10);
  if(!classOf) return [];
  return (cfg.dates || []).map(({month, day})=>{
    const iso = `${classOf - 1}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const schools = POPULAR_COLLEGES.filter(c => earlyDeadlineDates(c.earlyDeadline).some(x => x.m === month && x.d === day))
      .sort((a, b) => collegeShortName(a).localeCompare(collegeShortName(b)));
    if(!schools.length) return null;
    const links = schools.map(c => `<a href="popular-colleges.html#${escapeHtml(collegeSlug(c.name))}">${escapeHtml(collegeShortName(c))}</a>`);
    return {
      iso, date: `${MONTH_ABBR[month]} ${day}`, title: 'Early deadline',
      detailHtml: `Early deadline for ${links.join(', ')}.<span class="dates-note">${escapeHtml(cfg.note || '')}</span>`
    };
  }).filter(Boolean);
}
/* Fixed dates plus any generated from the college data, in date order. */
function resolveDates(s, yearKey){
  if(!s.dates && !s.deadlineNotices) return null;
  const all = (s.dates || []).concat(s.deadlineNotices ? buildDeadlineNotices(s.deadlineNotices, yearKey) : []);
  return all.sort((a, b) => String(a.iso || '').localeCompare(String(b.iso || '')));
}

function renderSectionBody(s, year, key){
  PENDING_MINI_GUIDES.length = 0;
  if(s.type === 'formEmbed'){
    const hasRealUrl = s.formUrl && s.formUrl !== '#';
    return `
      <div class="resp-box">
        <h3>${escapeHtml(s.infoTitle)}</h3>
        <ul>${s.infoItems.map(i=>`<li>${escapeHtml(i)}</li>`).join('')}</ul>
      </div>
      <div class="form-embed-wrap">
        ${hasRealUrl ? `
          <div class="form-embed-box"><iframe src="${escapeHtml(s.formUrl)}" title="${escapeHtml(s.title)}" loading="lazy"></iframe></div>
          <a class="fairtest-cta" href="${escapeHtml(s.formUrl)}" target="_blank" rel="noopener">Open the form in a new tab ↗</a>
        ` : `
          <div class="form-embed-placeholder">
            <p>The Microsoft Form isn't linked yet. Once it's created, add its link here so it shows up for students and families.</p>
          </div>
        `}
      </div>
    `;
  }
  if(s.type === 'callout'){
    return `
      <div class="fairtest-box">
        <p>${escapeHtml(s.body)}</p>
        ${s.ctaUrl ? `<a class="fairtest-cta" href="${escapeHtml(s.ctaUrl)}" target="_blank" rel="noopener">${escapeHtml(s.ctaText || 'Open ↗')}</a>` : ''}
      </div>
    `;
  }
  if(s.type === 'feeWaivers'){
    return renderFeeWaiversHtml(s.waivers);
  }
  if(s.type === 'essayGuides'){
    return renderEssayGuidesHtml(s);
  }
  if(s.type === 'schoolLists'){
    return renderSchoolListsHtml(s, year, key);
  }
  if(s.type === 'activitiesGuide'){
    return renderActivitiesGuideHtml(s);
  }
  if(s.type === 'essayPrompts'){
    return renderEssayPromptsHtml(s);
  }
  if(s.type === 'essayBrainstorm'){
    return renderEssayBrainstormHtml(s, year);
  }
  if(s.type === 'checklist'){
    const openIdx = currentChecklistGroup(s.groups);
    return s.groups.map((g, gi)=>{
      const gid = `crh-group-${year}-${key}-${gi}`;
      return `
      <div class="checklist-group">
        <h3 class="checklist-group-title">
          <button type="button" class="group-toggle" aria-expanded="${gi === openIdx}" aria-controls="${escapeHtml(gid)}" data-group-key="${escapeHtml(gid)}" data-default-open="${gi === openIdx ? '1' : '0'}">
            <span>${escapeHtml(g.label)}</span><span class="chevron" aria-hidden="true">⌄</span>
          </button>
        </h3>
        <ul class="checklist" id="${escapeHtml(gid)}"${gi === openIdx ? '' : ' hidden'}>
          ${g.items.map((item, ii)=>{
            const ck = `crh-check-${year}-${key}-${gi}-${ii}`;
            // item is a string, or {text, detail} for a short description under the text
            const text = typeof item === 'string' ? item : item.text;
            const detail = typeof item === 'string' ? '' : item.detail;
            return `<li><label class="check-item"><input type="checkbox" data-check-key="${escapeHtml(ck)}"><span>${escapeHtml(text)}${detail ? `<small class="check-detail">${escapeHtml(detail)}</small>` : ''}</span></label></li>`;
          }).join('')}
        </ul>
      </div>
    `;
    }).join('');
  }
  if(s.type === 'responsibilities'){
    return `<div class="resp-grid">${s.groups.map((g, gi)=>{
      let inner;
      if(g.body){
        inner = `<p>${escapeHtml(g.body)}</p>`;
      } else if(g.checkable){
        inner = `<ul class="checklist">${g.items.map((item, ii)=>{
          const ck = `crh-check-${year}-${key}-resp${gi}-${ii}`;
          const text = typeof item === 'string' ? item : item.text;
          const sub = typeof item === 'string' ? null : item.sub;
          const subHtml = sub ? `<ul class="sub-bullets">${sub.map(s2=>{
            if(s2.modal){
              return `<li><button type="button" class="inline-link" data-modal="${escapeHtml(s2.modal)}">${escapeHtml(s2.text)}</button></li>`;
            }
            return `<li>${escapeHtml(s2.text || s2)}</li>`;
          }).join('')}</ul>` : '';
          return `<li><label class="check-item"><input type="checkbox" data-check-key="${escapeHtml(ck)}"><span>${escapeHtml(text)}</span></label>${subHtml}</li>`;
        }).join('')}</ul>`;
      } else {
        inner = `<ul>${g.items.map(i=>`<li>${escapeHtml(i)}</li>`).join('')}</ul>`;
      }
      return `
      <div class="resp-box">
        <h3>${escapeHtml(g.title)}</h3>
        ${inner}
      </div>
    `;
    }).join('')}</div>`;
  }
  const items = s.items || [];
  const cards = items.map(item=>{
    const imgs = item.images || (item.image ? [item.image] : []);
    let mgHtml = '';
    if(item.miniGuide){
      const mgId = `mg-${PENDING_MINI_GUIDES.length}`;
      PENDING_MINI_GUIDES.push({id: mgId, data: item.miniGuide});
      mgHtml = renderMiniGuide(mgId);
    }
    const bulletHtml = b => (b && typeof b === 'object' && b.label)
      ? `<strong>${escapeHtml(b.label)}</strong> ${escapeHtml(b.text)}`   // {label, text}: bold lead-in
      : (b && typeof b === 'object')
      ? `<a${linkAttrs(b.url)}>${escapeHtml(b.text)}</a>${b.after ? escapeHtml(b.after) : ''}`   // {text, url, after}
      : escapeHtml(b);
    // numbered: true on an item shows its bullets as a numbered list (steps in order).
    const listTag = item.numbered ? 'ol class="steps-list"' : 'ul';
    const bulletsHtml = item.bullets ? `<${listTag}>${item.bullets.map(b=>`<li>${bulletHtml(b)}</li>`).join('')}</${item.numbered ? 'ol' : 'ul'}>` : '';
    return `
    <div class="resource-card${s.stacked ? ' wide' : ''}">
      ${imgs.length ? `<div class="resource-images">${imgs.map(src=>`<img src="${escapeHtml(src)}" alt="${escapeHtml(item.title)}">`).join('')}</div>` : ''}
      <div class="resource-text">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.desc)}</p>
        ${bulletsHtml}
      </div>
      ${mgHtml}
      ${item.url ? resourceLinkHtml(item.url) : ''}
    </div>
  `;
  }).join('');
  const tableHtml = s.table ? `
    <div class="data-table-wrap">
      ${s.table.caption ? `<div class="data-table-caption">${escapeHtml(s.table.caption)}</div>` : ''}
      <div class="data-table-scroll">
        <table class="data-table${s.table.wrap ? ' wrap' : ''}">
          <thead><tr>${s.table.headers.map(h=>`<th>${escapeHtml(h)}</th>`).join('')}</tr></thead>
          <tbody>${s.table.rows.map(r=>`<tr>${r.map(c=>`<td>${escapeHtml(c)}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>
    </div>
  ` : '';
  const datesHtml = (s.dates || s.deadlineNotices) ? `
    <div class="dates-widget">
      <div class="dates-stage">
        <div class="dates-badge"></div>
        <div class="dates-body">
          <h3></h3>
          <p></p>
        </div>
      </div>
      <div class="dates-nav">
        <button class="guide-arrow dates-prev">← Back</button>
        <div class="guide-dots dates-dots"></div>
        <button class="guide-arrow dates-next">Next →</button>
      </div>
    </div>
  ` : '';
  const toolHtml = s.tool ? renderToolWidget(s.tool) : '';
  const timelineHtml = s.timeline ? renderTimelineHtml(s.timeline) : '';
  // section.visuals: drawn by assets/js/fa-visuals.js on pages that load it (Financial Aid).
  const visualsHtml = (s.visuals && typeof renderFaVisuals === 'function') ? renderFaVisuals(s.visuals, `${year}-${key}`) : '';
  // section.widget: a small interactive tool drawn by assets/js/concordance.js on pages that load it (ACT/SAT).
  const widgetHtml = (s.widget && typeof renderPageWidget === 'function') ? renderPageWidget(s.widget) : '';
  return `${visualsHtml}${datesHtml}${timelineHtml}${tableHtml}${toolHtml}<div class="resource-grid${s.stacked ? ' stacked' : ''}">${cards}</div>${widgetHtml}`;
}

/* Vertical timeline (section.timeline). Past items are dimmed; the first item still ahead
   is tagged "Up next", or "Now" if today falls inside its iso–isoEnd span. */
function renderTimelineHtml(items){
  const today = new Date(); today.setHours(0,0,0,0);
  const day = iso => { const d = new Date(iso + 'T00:00:00'); return isNaN(d) ? null : d; };
  let nextFound = false;
  return `<ol class="timeline">${items.map(it=>{
    const start = it.iso ? day(it.iso) : null;
    const end = it.isoEnd ? day(it.isoEnd) : start;
    let state = '', tag = '';
    if(end && end < today){ state = ' is-past'; tag = 'Passed'; }
    else if(!nextFound && start){
      nextFound = true; state = ' is-next';
      tag = (start <= today) ? 'Now' : 'Up next';
    }
    return `
      <li class="tl-item${state}">
        <div class="tl-badge">${escapeHtml(it.date)}</div>
        <div class="tl-body">
          <h3>${escapeHtml(it.title)}${tag ? ` <span class="tl-tag">${tag}</span>` : ''}</h3>
          ${it.detail ? `<p>${escapeHtml(it.detail)}</p>` : ''}
        </div>
      </li>`;
  }).join('')}</ol>`;
}

function renderIndexNav(year){
  const y = YEARS[year];
  const nav = document.getElementById('index-nav');
  const order = y.order || DEFAULT_SECTION_ORDER;
  let active = null;
  try{ active = localStorage.getItem(`crh-index-active-${year}`); }catch(e){}
  if(!active || !y.sections[active]) active = order[0];
  const hashKey = decodeURIComponent(location.hash.replace(/^#/, ''));
  if(hashKey && y.sections[hashKey] && order.includes(hashKey)) active = hashKey;

  nav.innerHTML = order.map(key=>{
    const s = y.sections[key];
    if(!s) return '';
    return `<button data-key="${escapeHtml(key)}" aria-current="${key===active}">${escapeHtml(s.navLabel || s.title)}</button>`;
  }).join('');

  function selectSection(key){
    nav.querySelectorAll('button').forEach(b=>b.setAttribute('aria-current', b.dataset.key===key));
    renderIndexContent(year, key);
    try{ localStorage.setItem(`crh-index-active-${year}`, key); }catch(e){}
  }
  nav.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      selectSection(btn.dataset.key);
      // Keep the address bar in step with the index without adding history or jumping.
      try{ history.replaceState(null, '', '#' + btn.dataset.key); }catch(e){}
    });
  });

  // Deep links: seniors.html#writingGuide switches to that index section.
  window.addEventListener('hashchange', ()=>{
    let key = '';
    try{ key = decodeURIComponent(location.hash.replace(/^#/, '')); }catch(e){}
    if(!key || !y.sections[key] || !order.includes(key)) return;
    selectSection(key);
    const c = document.getElementById('index-content');
    if(c) c.scrollIntoView({behavior:'smooth', block:'start'});
  });

  renderIndexContent(year, active);
}

function renderIndexContent(year, key){
  const y = YEARS[year];
  const s = y.sections[key];
  const content = document.getElementById('index-content');
  if(!s){ content.innerHTML = ''; return; }
  content.classList.remove('animate');
  content.innerHTML = `
    <h2>${escapeHtml(s.title)}</h2>
    ${s.desc ? `<p class="section-desc">${escapeHtml(s.desc)}</p>` : ''}
    ${renderSectionBody(s, year, key)}
    ${s.guide ? renderGuideWidget(s.guide) : ''}
    ${s.resources && s.type !== 'activitiesGuide' && s.type !== 'essayPrompts' ? `<div class="ag-widget">${agResourcesHtml(s.resources, s)}</div>` : ''}
  `;
  const mgQueue = PENDING_MINI_GUIDES.slice();
  void content.offsetWidth;
  content.classList.add('animate');
  wireSectionInteractions();
  if(s.guide) wireGuideWidget(content.querySelector('.guide-widget'), s.guide);
  const resolvedDates = resolveDates(s, year);
  if(resolvedDates) wireDatesWidget(content.querySelector('.dates-widget'), resolvedDates);
  if(s.tool) wireToolWidget(content.querySelector('.tscore-tool'), s.tool);
  mgQueue.forEach(({id, data}) => wireMiniGuide(content.querySelector(`[data-mgid="${id}"]`), data));
}

/* Circular "submit or not" mind map (data: the `tool` object in assets/data/senior.js).
   Coordinates are in a design space 820 wide; the map scales with its column.
   An option with a `detail` gets a small note bubble joined to its answer circle. */
const TM_BASE = {
  w: 820, h: 740,
  center: {x: 410, y: 370, r: 70},
  optR: 82, ansR: 95, noteR: 76, notePad: 55,
  quads: [
    {o:{x:275, y:235}, a:{x:95,  y:95}},
    {o:{x:545, y:235}, a:{x:725, y:95}},
    {o:{x:275, y:505}, a:{x:95,  y:645}},
    {o:{x:545, y:505}, a:{x:725, y:645}}
  ]
};
function tmLayout(opts){
  const b = TM_BASE;
  const hasTop = opts.some((o,i)=>o.detail && i < 2);
  const hasBottom = opts.some((o,i)=>o.detail && i >= 2);
  const top = hasTop ? b.notePad : 0, bottom = hasBottom ? b.notePad : 0;
  const shift = pt => ({x: pt.x, y: pt.y + top});
  const quads = b.quads.map((q,i)=>{
    const a = shift(q.a), left = q.a.x < b.center.x, upper = i < 2;
    return {o: shift(q.o), a,
      n: {x: q.a.x + (left ? 205 : -205), y: a.y + (upper ? -70 : 70)}};
  });
  return Object.assign({}, b, {h: b.h + top + bottom, center: Object.assign({}, b.center, {y: b.center.y + top}), quads});
}
function tmCircleStyle(g, pt, r){
  return `left:${((pt.x - r) / g.w * 100).toFixed(3)}%;top:${((pt.y - r) / g.h * 100).toFixed(3)}%;width:${(2 * r / g.w * 100).toFixed(3)}%;height:${(2 * r / g.h * 100).toFixed(3)}%;`;
}
function tmBranchPath(g, q){
  const dx = q.a.x - q.o.x, dy = q.a.y - q.o.y, len = Math.hypot(dx, dy);
  const mx = (q.o.x + q.a.x) / 2, my = (q.o.y + q.a.y) / 2;
  const bend = 38 * (q.a.x < g.center.x ? 1 : -1);
  const cx = mx + (-dy / len) * bend, cy = my + (dx / len) * bend;
  return `M${q.o.x} ${q.o.y} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${q.a.x} ${q.a.y}`;
}
function renderToolWidget(tool){
  const opts = tool.options || [];
  const g = tmLayout(opts);
  const quads = g.quads.slice(0, opts.length);
  const spokes = quads.map(q=>`<line class="tm-spoke" x1="${g.center.x}" y1="${g.center.y}" x2="${q.o.x}" y2="${q.o.y}"/>`).join('');
  const branches = quads.map((q,i)=>`<path class="tm-branch" data-i="${i}" pathLength="1" d="${tmBranchPath(g, q)}"/>`
    + (opts[i].detail ? `<path class="tm-branch tm-branch-note" data-i="${i}" pathLength="1" d="M${q.a.x} ${q.a.y} L${q.n.x} ${q.n.y}"/>` : '')).join('');
  const optBtns = opts.map((o,i)=>`
      <button type="button" class="tm-opt" data-idx="${i}" aria-pressed="false" style="${tmCircleStyle(g, quads[i].o, g.optR)}"><span class="tm-opt-text">${escapeHtml(o.label)}</span></button>
      <div class="tm-ans" data-i="${i}" style="${tmCircleStyle(g, quads[i].a, g.ansR)}" aria-hidden="true">
        <div class="tm-ans-fill tm-tone-${escapeHtml(o.tone || 'recommend')}">
          <span class="tm-ans-text">${escapeHtml(o.answer)}</span>
        </div>
      </div>
      ${o.detail ? `<div class="tm-nb" data-i="${i}" style="${tmCircleStyle(g, quads[i].n, g.noteR)}" aria-hidden="true"><div class="tm-nb-fill"><span>${escapeHtml(o.detail)}</span></div></div>` : ''}`).join('');
  return `
    <div class="tscore-tool">
      ${tool.title ? `<h3 class="tscore-title">${escapeHtml(tool.title)}</h3><span class="tscore-bar" aria-hidden="true"></span>` : ''}
      <div class="tm-info">
        ${tool.infoHeading ? `<h4 class="tm-info-h">${escapeHtml(tool.infoHeading)}</h4>` : ''}
        ${tool.infoText ? `<p class="tm-info-p">${escapeHtml(tool.infoText)}</p>` : ''}
        ${tool.infoChecks ? `<ul class="tm-checks">${tool.infoChecks.map(c=>`<li><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="4 12.5 9.5 18 20 6.5"/></svg><span>${escapeHtml(c)}</span></li>`).join('')}</ul>` : ''}
      </div>
      <div class="tm-map" style="--tm-ratio:${g.w} / ${g.h}">
        <svg class="tm-lines" viewBox="0 0 ${g.w} ${g.h}" aria-hidden="true" focusable="false">${spokes}${branches}</svg>
        <div class="tm-center" style="${tmCircleStyle(g, g.center, g.center.r)}"><span>${escapeHtml(tool.centerLabel || '')}</span></div>
        ${optBtns}
      </div>
      <div class="tm-live" id="tscore-result" aria-live="polite" aria-atomic="true"></div>
      ${tool.note ? `<p class="tm-note">${escapeHtml(tool.note)}</p>` : ''}
    </div>
  `;
}

function wireToolWidget(root, tool){
  if(!root) return;
  const opts = tool.options || [];
  const buttons = root.querySelectorAll('.tm-opt');
  const marks = root.querySelectorAll('.tm-ans, .tm-nb, .tm-branch');
  const live = root.querySelector('.tm-live');
  function select(sel){
    buttons.forEach((b,i)=>{
      b.setAttribute('aria-pressed', i===sel);
      b.classList.toggle('is-on', i===sel);
    });
    marks.forEach(m=>m.classList.toggle('is-on', Number(m.dataset.i)===sel));
    const o = sel >= 0 ? opts[sel] : null;
    live.textContent = o ? `${o.label}: ${o.answer}${o.detail ? ' ' + o.detail : ''}` : '';
  }
  let current = -1;
  buttons.forEach((btn, i)=>{
    btn.addEventListener('click', ()=>{
      current = (current === i) ? -1 : i;
      select(current);
    });
  });
}

function renderGuideWidget(guide){
  return `
    <div class="guide-widget">
      <h3 class="guide-widget-title">${escapeHtml(guide.title || 'Interactive how-to guide')}</h3>
      ${guide.subtitle ? `<p class="guide-widget-sub">${escapeHtml(guide.subtitle)}</p>` : ''}
      <div class="guide-progress"><span class="guide-current">1</span> / <span class="guide-total">${guide.steps.length}</span> — <span class="guide-step-title"></span></div>
      <div class="guide-stage">
        <div class="guide-image-wrap" style="display:none;"><img alt=""><span class="guide-image-hint">Click to enlarge</span></div>
        <div class="guide-body">
          <div class="guide-text"></div>
        </div>
      </div>
      <div class="guide-nav">
        <button class="guide-arrow guide-prev">← Back</button>
        <div class="guide-dots"></div>
        <button class="guide-arrow guide-next">Next →</button>
      </div>
    </div>
  `;
}

function wireGuideWidget(root, guide){
  if(!root) return;
  const steps = guide.steps;
  let i = 0;
  const stage = root.querySelector('.guide-stage');
  const imgWrap = root.querySelector('.guide-image-wrap');
  const img = imgWrap.querySelector('img');
  const text = root.querySelector('.guide-text');
  const current = root.querySelector('.guide-current');
  const stepTitle = root.querySelector('.guide-step-title');
  const dots = root.querySelector('.guide-dots');
  const prevBtn = root.querySelector('.guide-prev');
  const nextBtn = root.querySelector('.guide-next');

  const renderDots = ()=>{
    dots.innerHTML = steps.map((_, idx)=>
      `<button class="guide-dot" aria-current="${idx===i}" aria-label="Step ${idx+1}" data-idx="${idx}"></button>`
    ).join('');
    dots.querySelectorAll('.guide-dot').forEach(dot=>{
      dot.addEventListener('click', ()=>{ i = parseInt(dot.dataset.idx, 10); render(); });
    });
  };

  const render = ()=>{
    const step = steps[i];
    current.textContent = i+1;
    stepTitle.textContent = step.title;
    if(step.image){
      imgWrap.style.display = '';
      img.src = step.image;
      img.alt = step.title;
      img.onclick = () => openImageLightbox(step.image, step.title);
      stage.classList.remove('no-image');
    } else {
      imgWrap.style.display = 'none';
      stage.classList.add('no-image');
    }
    if(step.bullets){
      text.innerHTML = `<ul>${step.bullets.map(b=>`<li>${escapeHtml(b)}</li>`).join('')}</ul>`;
    } else {
      text.innerHTML = `<p>${escapeHtml(step.body || '')}</p>`;
    }
    prevBtn.disabled = i === 0;
    nextBtn.disabled = i === steps.length - 1;
    renderDots();
  };

  prevBtn.addEventListener('click', ()=>{ if(i>0){ i--; render(); } });
  nextBtn.addEventListener('click', ()=>{ if(i<steps.length-1){ i++; render(); } });
  render();
}

function renderMiniGuide(mgId){
  return `
    <div class="mini-guide" data-mgid="${mgId}">
      <div class="mg-progress"><span class="mg-current">1</span> / <span class="mg-total"></span></div>
      <div class="mg-stage">
        <div class="mg-icon"></div>
        <div class="mg-body">
          <h4 class="mg-title"></h4>
          <div class="mg-text"></div>
        </div>
      </div>
      <div class="mg-nav">
        <button class="guide-arrow mg-prev">← Back</button>
        <div class="guide-dots mg-dots"></div>
        <button class="guide-arrow mg-next">Next →</button>
      </div>
    </div>
  `;
}

function wireMiniGuide(root, mg){
  if(!root) return;
  const steps = mg.steps;
  let i = 0;
  const iconEl = root.querySelector('.mg-icon');
  const titleEl = root.querySelector('.mg-title');
  const textEl = root.querySelector('.mg-text');
  const current = root.querySelector('.mg-current');
  const total = root.querySelector('.mg-total');
  const dots = root.querySelector('.mg-dots');
  const prevBtn = root.querySelector('.mg-prev');
  const nextBtn = root.querySelector('.mg-next');

  total.textContent = steps.length;

  const renderDots = ()=>{
    dots.innerHTML = steps.map((_, idx)=>
      `<button class="guide-dot" aria-current="${idx===i}" aria-label="Step ${idx+1}" data-idx="${idx}"></button>`
    ).join('');
    dots.querySelectorAll('.guide-dot').forEach(dot=>{
      dot.addEventListener('click', ()=>{ i = parseInt(dot.dataset.idx, 10); render(); });
    });
  };

  const render = ()=>{
    const step = steps[i];
    current.textContent = i+1;
    titleEl.textContent = step.title;
    iconEl.innerHTML = `<svg viewBox="0 0 24 24">${STEP_ICONS[step.icon] || STEP_ICONS.checklist}</svg>`;
    textEl.innerHTML = step.bullets
      ? `<ul>${step.bullets.map(b=>`<li>${escapeHtml(b)}</li>`).join('')}</ul>`
      : `<p>${escapeHtml(step.body || '')}</p>`;
    prevBtn.disabled = i === 0;
    nextBtn.disabled = i === steps.length - 1;
    renderDots();
  };

  prevBtn.addEventListener('click', ()=>{ if(i>0){ i--; render(); } });
  nextBtn.addEventListener('click', ()=>{ if(i<steps.length-1){ i++; render(); } });
  render();
}

function wireDatesWidget(root, dates){
  if(!root) return;
  const today = new Date();
  today.setHours(0,0,0,0);
  const active = dates.filter(d => !d.iso || new Date(d.iso + 'T23:59:59') >= today);
  if(!active.length){ root.style.display = 'none'; return; }
  dates = active;
  let i = 0;
  let timer = null;
  const badge = root.querySelector('.dates-badge');
  const titleEl = root.querySelector('.dates-body h3');
  const textEl = root.querySelector('.dates-body p');
  const dots = root.querySelector('.dates-dots');
  const prevBtn = root.querySelector('.dates-prev');
  const nextBtn = root.querySelector('.dates-next');

  const renderDots = ()=>{
    dots.innerHTML = dates.map((_, idx)=>
      `<button class="guide-dot" aria-current="${idx===i}" aria-label="${idx+1}" data-idx="${idx}"></button>`
    ).join('');
    dots.querySelectorAll('.guide-dot').forEach(dot=>{
      dot.addEventListener('click', ()=>{ goTo(parseInt(dot.dataset.idx, 10)); });
    });
  };

  const render = ()=>{
    const d = dates[i];
    badge.textContent = d.date;
    titleEl.textContent = d.title;
    if(d.detailHtml) textEl.innerHTML = d.detailHtml; else textEl.textContent = d.detail;
    renderDots();
  };

  const goTo = (idx, {restart = true} = {})=>{
    i = ((idx % dates.length) + dates.length) % dates.length;
    render();
    if(restart) restartTimer();
  };

  const restartTimer = ()=>{
    if(timer) clearInterval(timer);
    if(dates.length > 1){
      timer = setInterval(()=> goTo(i + 1, {restart:false}), 6000);
    }
  };

  prevBtn.addEventListener('click', ()=> goTo(i - 1));
  nextBtn.addEventListener('click', ()=> goTo(i + 1));
  if(dates.length < 2){
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }
  render();
  restartTimer();
}

function renderSections(year){
  const y = YEARS[year];
  const wrap = document.getElementById('sections');
  wrap.classList.remove('animate');
  wrap.innerHTML = (y.order || DEFAULT_SECTION_ORDER).map(key=>{
    const s = y.sections[key];
    if(!s) return '';
    const collapseKey = `crh-collapsed-${year}-${key}`;
    const body = renderSectionBody(s, year, key);
    return `
      <div class="resource-section">
        <div class="section-head-row" role="button" tabindex="0" aria-expanded="true" data-collapse-key="${escapeHtml(collapseKey)}">
          <div class="section-titles">
            <h2>${escapeHtml(s.title)}</h2>
            ${s.note ? `<span class="section-note">${escapeHtml(s.note)}</span>` : ''}
          </div>
          <span class="chevron" aria-hidden="true">⌄</span>
        </div>
        <div class="section-body">
          ${s.desc ? `<p class="section-desc">${escapeHtml(s.desc)}</p>` : ''}
          ${body}
        </div>
      </div>
    `;
  }).join('');
  void wrap.offsetWidth;
  wrap.classList.add('animate');
  wireSectionInteractions();
}

function wireSectionInteractions(){
  document.querySelectorAll('.ag-checker').forEach(wireActivityChecker);
  document.querySelectorAll('.eg-widget').forEach(wireEssayGuides);
  document.querySelectorAll('.sl-widget').forEach(wireSchoolLists);
  document.querySelectorAll('.eb-widget').forEach(wireEssayBrainstorm);

  document.querySelectorAll('.section-head-row').forEach(row=>{
    if(row.dataset.wired) return; row.dataset.wired = '1';
    const body = row.nextElementSibling;
    const key = row.dataset.collapseKey;
    const applyState = collapsed=>{
      body.classList.toggle('is-hidden', collapsed);
      row.setAttribute('aria-expanded', String(!collapsed));
    };
    let collapsed = false;
    try{ collapsed = localStorage.getItem(key) === '1'; }catch(e){}
    applyState(collapsed);
    const toggle = ()=>{
      collapsed = !collapsed;
      applyState(collapsed);
      try{ localStorage.setItem(key, collapsed ? '1' : '0'); }catch(e){}
    };
    row.addEventListener('click', toggle);
    row.addEventListener('keydown', e=>{
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        toggle();
      }
    });
  });

  document.querySelectorAll('.group-toggle').forEach(btn=>{
    if(btn.dataset.wired) return; btn.dataset.wired = '1';
    const list = document.getElementById(btn.getAttribute('aria-controls'));
    const key = btn.dataset.groupKey;
    const apply = open=>{
      list.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
    };
    let open = btn.dataset.defaultOpen === '1';
    try{
      const saved = localStorage.getItem(key);   // '1' open, '0' closed; none = use today's default
      if(saved === '1') open = true; else if(saved === '0') open = false;
    }catch(e){}
    apply(open);
    btn.addEventListener('click', ()=>{
      open = !open;
      apply(open);
      try{ localStorage.setItem(key, open ? '1' : '0'); }catch(e){}
    });
  });

  document.querySelectorAll('input[data-check-key]').forEach(cb=>{
    if(cb.dataset.wired) return; cb.dataset.wired = '1';
    const key = cb.dataset.checkKey;
    try{ cb.checked = localStorage.getItem(key) === '1'; }catch(e){}
    cb.addEventListener('change', ()=>{
      try{ localStorage.setItem(key, cb.checked ? '1' : '0'); }catch(e){}
    });
  });

  if(typeof wireFaVisuals === 'function') wireFaVisuals();   // Financial Aid visuals, if loaded
  if(typeof wirePageWidgets === 'function') wirePageWidgets();   // ACT/SAT converter, if loaded
}

function renderCounselors(){
  const grid = document.getElementById('counselor-grid');
  if(!grid) return;
  grid.innerHTML = COUNSELORS.map(c=>`
    <div class="panel-card">
      ${c.crest ? `<div class="crest-wrap${c.crestBoxed ? ' boxed' : ''}"><img src="${escapeHtml(c.crest)}" alt="${escapeHtml(c.role)} crest"></div>` : ''}
      <div class="role">${escapeHtml(c.role)}</div>
      <div class="name">${escapeHtml(c.name)}</div>
      <div class="meta">
        ${c.email ? `<div>${escapeHtml(c.email)}</div>` : ''}
      </div>
      ${c.moreInfo ? `<a class="more-info" href="${escapeHtml(c.moreInfo)}">More info</a>` : ''}
    </div>
  `).join('');
}

/* ---------- Activities guide + Essay prompts (data: assets/data/senior.js) ---------- */
function agList(items){ return `<ul class="ag-list">${(items||[]).map(t=>`<li>${escapeHtml(t)}</li>`).join('')}</ul>`; }
function agCount(text, limit){
  const n = [...String(text)].length;
  return `<span class="ag-chip${n > limit ? ' over' : ''}">${n}/${limit}</span>`;
}
function agResourcesHtml(resources, s){
  if(!resources || !resources.length) return '';
  return `<div class="ag-resources">
    <h3 class="ag-h">${escapeHtml((s && s.resourcesHeading) || 'From Common App')}</h3>
    ${resources.map(r=>`
      <a class="ag-resource" href="${escapeHtml(r.url)}" target="_blank" rel="noopener">
        <span class="ag-resource-title">${escapeHtml(r.title)}<span aria-hidden="true">&nbsp;↗</span></span>
        ${r.desc ? `<span class="ag-resource-desc">${escapeHtml(r.desc)}</span>` : ''}
        <span class="ag-resource-src">Source: ${escapeHtml(r.source || 'Common App')}${(r.kind === undefined ? 'PDF' : r.kind) ? ` (${escapeHtml(r.kind === undefined ? 'PDF' : r.kind)})` : ''}</span>
      </a>`).join('')}
  </div>`;
}
function renderActivitiesGuideHtml(s){
  const fieldsWithLimits = (s.fields||[]).filter(f=>f.limit);
  return `
    <div class="ag-widget">
      <div class="ag-two">
        <div class="ag-block"><h3 class="ag-h">Why it matters</h3>${agList(s.why)}</div>
        <div class="ag-block"><h3 class="ag-h">Choosing and ordering</h3>${agList(s.choosing)}</div>
      </div>

      <h3 class="ag-h">What each box asks for</h3>
      <div class="ag-fields">
        ${(s.fields||[]).map(f=>`
          <div class="ag-field">
            <div class="ag-field-top"><span class="ag-field-label">${escapeHtml(f.label)}</span>${f.limit ? `<span class="ag-limit">${f.limit} characters</span>` : ''}</div>
            <p>${escapeHtml(f.help)}</p>
          </div>`).join('')}
      </div>

      <h3 class="ag-h">Writing your 150-character description</h3>
      ${agList(s.writing)}

      <h3 class="ag-h">Activity Examples: Before and After</h3>
      <div class="ag-examples">
        ${(s.examples||[]).map(e=>`
          <div class="ag-example">
            <div class="ag-before"><span class="ag-tag">Before</span><p>${escapeHtml(e.before)}</p></div>
            <div class="ag-after"><span class="ag-tag">Better</span><p>${escapeHtml(e.after)}</p>${agCount(e.after,150)}</div>
          </div>`).join('')}
      </div>

      <h3 class="ag-h">Full Length Activity Examples</h3>
      <div class="ag-entries">
        ${(s.entries||[]).map(e=>`
          <div class="ag-entry">
            <div class="ag-entry-row"><span class="ag-entry-k">Position</span><span>${escapeHtml(e.position)}</span>${agCount(e.position,50)}</div>
            <div class="ag-entry-row"><span class="ag-entry-k">Organization</span><span>${escapeHtml(e.org)}</span>${agCount(e.org,100)}</div>
            <div class="ag-entry-row"><span class="ag-entry-k">Description</span><span>${escapeHtml(e.desc)}</span>${agCount(e.desc,150)}</div>
          </div>`).join('')}
      </div>

      <div class="ag-checker">
        <h3 class="ag-h">Try yours</h3>
        <p class="ag-checker-note">Draft an entry here and watch the counts. Nothing is saved or sent anywhere, so copy it into Common App when it's ready.</p>
        ${fieldsWithLimits.map(f=>`
          <label class="ag-check-field">
            <span class="ag-check-label">${escapeHtml(f.label)} <span class="ag-check-count" aria-live="polite">0/${f.limit}</span></span>
            ${f.limit > 60
              ? `<textarea rows="${f.limit > 120 ? 3 : 2}" data-limit="${f.limit}"></textarea>`
              : `<input type="text" data-limit="${f.limit}">`}
          </label>`).join('')}
      </div>

      <h3 class="ag-h">Action verbs to start with</h3>
      <div class="ag-verbs">
        ${(s.verbs||[]).map(g=>`
          <div class="ag-verb-group"><span class="ag-verb-title">${escapeHtml(g.group)}</span>
            <p>${g.words.map(escapeHtml).join(' · ')}</p></div>`).join('')}
      </div>
      ${s.verbNote ? `<p class="ag-note">${escapeHtml(s.verbNote)}</p>` : ''}

      ${s.honors ? `
        <h3 class="ag-h">What goes in the Honors section</h3>
        <p class="ag-p">${escapeHtml(s.honors.intro)}</p>
        <ul class="ag-pills">${s.honors.items.map(h=>`<li>${escapeHtml(h)}</li>`).join('')}</ul>
      ` : ''}

      ${agResourcesHtml(s.resources, s)}
    </div>
  `;
}
function wireActivityChecker(root){
  if(!root || root.dataset.wired) return; root.dataset.wired = '1';
  root.querySelectorAll('[data-limit]').forEach(el=>{
    const limit = +el.dataset.limit;
    const count = el.closest('.ag-check-field').querySelector('.ag-check-count');
    const update = ()=>{
      const n = [...el.value].length;
      count.textContent = n > limit ? `${n}/${limit} · ${n - limit} over` : `${n}/${limit}`;
      count.classList.toggle('over', n > limit);
      el.classList.toggle('over', n > limit);
    };
    el.addEventListener('input', update);
  });
}
function renderEssayPromptsHtml(s){
  return `
    <div class="ag-widget">
      <ol class="ep-list">
        ${(s.prompts||[]).map((p,i)=>`
          <li class="ep-card">
            <div class="ep-head"><span class="ep-num">${i+1}</span><h3>${escapeHtml(p.title)}</h3></div>
            <p class="ep-summary">${escapeHtml(p.summary)}</p>
            <div class="ep-cols">
              <div><span class="ep-k">Think about</span>${agList(p.think)}</div>
              <div><span class="ep-k">Ask yourself</span>${agList(p.ask)}</div>
            </div>
          </li>`).join('')}
      </ol>
      ${s.promptNote ? `<p class="ag-note">${escapeHtml(s.promptNote)}</p>` : ''}
      ${agResourcesHtml(s.resources, s)}
    </div>
  `;
}

/* ---------- Essay Brainstorm (data: senior.js > essayBrainstorm; prompt text comes from essayPrompts) ---------- */
const EB_KEY = 'moeller-essay-brainstorm-v1';
const EB_MAX_VALUES = 5, EB_MAX_STARS = 3, EB_PARTS = ['Which prompt fits you?', 'Gather ideas', 'Your mind map'];
let EB_COUNTER = 0;
function renderEssayBrainstormHtml(s, year){
  EB_COUNTER++;
  return `<div class="eb-widget" data-year="${ebAttr(year)}" data-uid="eb${EB_COUNTER}"></div>`;
}
/* Attribute-safe escape for student text (also escapes quotes). */
function ebAttr(str){ return escapeHtml(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function ebLoad(){
  try{
    const o = JSON.parse(localStorage.getItem(EB_KEY) || 'null');
    if(o && typeof o === 'object'){
      return {
        quiz: (o.quiz && typeof o.quiz === 'object') ? o.quiz : {},
        values: Array.isArray(o.values) ? o.values.filter(v=>typeof v === 'string').slice(0, EB_MAX_VALUES) : [],
        custom: typeof o.custom === 'string' ? o.custom.slice(0, 80) : '',
        refl: Array.isArray(o.refl) ? o.refl.map(v=>typeof v === 'string' ? v.slice(0, 80) : '') : [],
        links: (o.links && typeof o.links === 'object') ? o.links : {},
        stars: Array.isArray(o.stars) ? o.stars.filter(n=>Number.isInteger(n)).slice(0, EB_MAX_STARS) : []
      };
    }
  }catch(e){}
  return {quiz:{}, values:[], custom:'', refl:[], links:{}, stars:[]};
}
function ebSave(st){ try{ localStorage.setItem(EB_KEY, JSON.stringify(st)); }catch(e){} }
/* Tally the quiz. shown = the top-scoring prompts (all ties); if only one, the next-highest score(s) are added. */
function ebTally(quiz, st){
  const scores = [0,0,0,0,0,0,0,0];
  let answered = 0;
  quiz.forEach((q, qi)=>{
    const a = st.quiz[qi];
    if(Number.isInteger(a) && q.options[a]){ answered++; q.options[a].p.forEach(n=>{ if(n >= 1 && n <= 7) scores[n]++; }); }
  });
  const nums = [1,2,3,4,5,6,7];
  const distinct = Array.from(new Set(nums.map(n=>scores[n]).filter(n=>n > 0))).sort((a,b)=>b-a);
  let shown = [];
  if(distinct.length){
    shown = nums.filter(n=>scores[n] === distinct[0]);
    if(shown.length < 2 && distinct[1]) shown = shown.concat(nums.filter(n=>scores[n] === distinct[1]));
  }
  return {scores, shown, answered};
}
function ebWrap(text, max){
  const words = String(text).split(/\s+/).filter(Boolean), lines = [];
  let cur = '';
  words.forEach(w=>{
    while(w.length > max){ if(cur){ lines.push(cur); cur = ''; } lines.push(w.slice(0, max)); w = w.slice(max); }
    if(!cur) cur = w; else if((cur + ' ' + w).length <= max) cur += ' ' + w; else { lines.push(cur); cur = w; }
  });
  if(cur) lines.push(cur);
  return lines.length ? lines : [''];
}
function ebNode(cx, cy, text, cls, max){
  const lines = ebWrap(text, max), lh = 17;
  const w = Math.max(56, Math.max(...lines.map(l=>l.length)) * 8.4 + 22), h = lines.length * lh + 14;
  const x = cx.toFixed(1);
  return `<g class="eb-node ${cls}"><rect x="${(cx - w/2).toFixed(1)}" y="${(cy - h/2).toFixed(1)}" width="${w.toFixed(1)}" height="${h}" rx="10"/><text text-anchor="middle" x="${x}" y="${(cy - h/2 + 7 + lh*0.78).toFixed(1)}">${lines.map((l,i)=>`<tspan x="${x}" dy="${i ? lh : 0}">${escapeHtml(l)}</tspan>`).join('')}</text></g>`;
}
/* values: chosen value names. answers: [{text, value|null}] */
function ebMapSvg(values, answers){
  const W = 800, cx = W/2, cy = 290;
  const connected = answers.filter(a=>a.value), loose = answers.filter(a=>!a.value);
  let lines = '', nodes = '';
  const n = values.length;
  values.forEach((v, i)=>{
    const ang = (-90 + i * 360 / n) * Math.PI / 180;
    const vx = cx + 140 * Math.cos(ang), vy = cy + 105 * Math.sin(ang);
    lines += `<line x1="${cx}" y1="${cy}" x2="${vx.toFixed(1)}" y2="${vy.toFixed(1)}"/>`;
    nodes += ebNode(vx, vy, v, 'eb-n-value', 14);
    const kids = connected.filter(a=>a.value === v);
    kids.forEach((a, j)=>{
      const off = (j - (kids.length - 1) / 2) * 26 * Math.PI / 180;
      const r = 250 + (j % 2) * 28;
      const x = Math.max(80, Math.min(W - 80, cx + r * 1.25 * Math.cos(ang + off)));
      const y = Math.max(40, Math.min(2*cy - 40, cy + r * 0.95 * Math.sin(ang + off)));
      lines += `<line x1="${vx.toFixed(1)}" y1="${vy.toFixed(1)}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`;
      nodes += ebNode(x, y, a.text, 'eb-n-leaf', 16);
    });
  });
  nodes += ebNode(cx, cy, 'Me', 'eb-n-me', 6);
  let H = 2 * cy;
  if(loose.length){
    const top = H + 14;
    nodes += `<text class="eb-cluster-label" x="20" y="${top + 10}">Not connected yet</text>`;
    loose.forEach((a, i)=>{
      nodes += ebNode(100 + (i % 4) * 195, top + 52 + Math.floor(i / 4) * 58, a.text, 'eb-n-loose', 16);
    });
    H = top + 52 + Math.ceil(loose.length / 4) * 58;
  }
  return `<svg class="eb-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Mind map: you in the center, your values around you, and your ideas connected to them"><g class="eb-lines">${lines}</g>${nodes}</svg>`;
}
function wireEssayBrainstorm(root){
  if(!root || root.dataset.wired) return; root.dataset.wired = '1';
  const y = YEARS[root.dataset.year] || {};
  const cfg = y.sections.essayBrainstorm;
  const prompts = ((y.sections.essayPrompts || {}).prompts) || [];
  const uid = root.dataset.uid;
  const st = ebLoad();
  let part = 0;
  const persist = ()=> ebSave(st);
  const chosen = ()=> st.values.filter(v => cfg.values.includes(v) || v === st.custom);
  const answersList = ()=>{
    const vals = chosen(), out = [];
    cfg.reflections.forEach((r, i)=>{
      const text = (st.refl[i] || '').trim();
      if(!text) return;
      const lk = st.links[i];
      out.push({i, label: r.label, text, value: (lk && vals.includes(lk)) ? lk : null});
    });
    return out;
  };
  const validStars = ()=>{
    const ok = answersList().filter(a=>a.value).map(a=>a.i);
    return st.stars.filter(n=>ok.includes(n));
  };

  function go(n, focus){
    part = Math.max(0, Math.min(2, n));
    root.innerHTML = `
      <p class="eb-privacy">Your answers save only in this browser. Nothing is sent anywhere.</p>
      <ol class="eb-steps" aria-label="Steps">${EB_PARTS.map((t,i)=>`<li${i === part ? ' aria-current="step"' : ''}><span class="eb-step-n">${i+1}</span> ${escapeHtml(t)}</li>`).join('')}</ol>
      <div class="eb-body"></div>
      <div class="guide-nav eb-nav eb-noprint">
        <button type="button" class="guide-arrow eb-back"${part === 0 ? ' disabled' : ''}>← Back</button>
        <button type="button" class="guide-arrow eb-next"${part === 2 ? ' disabled' : ''}>Next →</button>
      </div>`;
    root.querySelector('.eb-back').addEventListener('click', ()=> go(part - 1, true));
    root.querySelector('.eb-next').addEventListener('click', ()=> go(part + 1, true));
    [renderQuiz, renderGather, renderMap][part]();
    const h = root.querySelector('.eb-part-h');
    if(h && focus){ h.setAttribute('tabindex', '-1'); h.focus(); }
  }

  /* ---- Part 1: which prompt fits ---- */
  function resultsHtml(){
    const t = ebTally(cfg.quiz, st);
    if(!t.answered) return `<p class="ag-note">Answer a few questions above and your best-fit prompts will show up here.</p>`;
    const cards = t.shown.map(n=>{
      const p = prompts[n - 1] || {};
      return `<li class="ep-card">
        <div class="ep-head"><span class="ep-num">${n}</span><h3>${escapeHtml(p.title || 'Prompt ' + n)}</h3></div>
        ${p.summary ? `<p class="ep-summary">${escapeHtml(p.summary)}</p>` : ''}
        ${(p.ask && p.ask.length) ? `<div class="ep-cols"><div><span class="ep-k">Ask yourself</span>${agList(p.ask)}</div></div>` : ''}
      </li>`;
    }).join('');
    return `${t.shown.length ? `<h4 class="eb-sub">Your best-fit ${t.shown.length > 1 ? 'prompts' : 'prompt'}</h4><ol class="ep-list">${cards}</ol>` : `<p class="ag-p">Your answers did not point to one prompt yet. Try answering a few more.</p>`}
      <p class="ag-note">Prompt 7 accepts any topic, so treat this as a starting point, not a verdict.</p>`;
  }
  function renderQuiz(){
    const body = root.querySelector('.eb-body');
    body.innerHTML = `
      <h3 class="eb-part-h">Which prompt fits you?</h3>
      <p class="ag-p">Pick the answer that fits best. Skip any question you like.</p>
      ${cfg.quiz.map((q, qi)=>`
        <fieldset class="eb-q"><legend>${qi + 1}. ${escapeHtml(q.q)}</legend>
          ${q.options.map((o, oi)=>`<label class="eb-opt"><input type="radio" name="${uid}-q${qi}" value="${oi}"${st.quiz[qi] === oi ? ' checked' : ''}> <span>${escapeHtml(o.t)}</span></label>`).join('')}
        </fieldset>`).join('')}
      <div class="eb-results" aria-live="polite">${resultsHtml()}</div>`;
    body.querySelectorAll('input[type=radio]').forEach(r=>{
      r.addEventListener('change', ()=>{
        st.quiz[Number(r.name.split('-q')[1])] = Number(r.value); persist();
        body.querySelector('.eb-results').innerHTML = resultsHtml();
      });
    });
  }

  /* ---- Part 2: gather ideas ---- */
  function renderGather(note){
    const body = root.querySelector('.eb-body');
    const customChip = st.custom ? `<button type="button" class="sl-chip eb-chip" data-v="${ebAttr(st.custom)}" aria-pressed="${st.values.includes(st.custom)}">${escapeHtml(st.custom)}</button>` : '';
    body.innerHTML = `
      <h3 class="eb-part-h">Gather ideas</h3>
      <h4 class="eb-sub">Pick up to ${EB_MAX_VALUES} values that feel like you</h4>
      <div class="sl-chip-row eb-chips" role="group" aria-label="Values">
        ${cfg.values.map(v=>`<button type="button" class="sl-chip eb-chip" data-v="${ebAttr(v)}" aria-pressed="${st.values.includes(v)}">${escapeHtml(v)}</button>`).join('')}${customChip}
      </div>
      <p class="eb-msg" role="status" aria-live="polite">${escapeHtml(note || '')}</p>
      <div class="eb-custom">
        <label class="eg-label" for="${uid}-custom">Add your own</label>
        <div class="eb-row"><input type="text" id="${uid}-custom" class="modal-search eb-input" maxlength="80" autocomplete="off" placeholder="One word or a short phrase">
        <button type="button" class="guide-arrow eb-add">Add</button></div>
      </div>
      <h4 class="eb-sub">Jot down a few words for each</h4>
      ${cfg.reflections.map((r, i)=>`
        <div class="eb-refl"><label class="eg-label" for="${uid}-r${i}">${escapeHtml(r.label)} <span class="eb-hint">${escapeHtml(r.hint)}</span></label>
        <input type="text" id="${uid}-r${i}" class="modal-search eb-input" maxlength="80" autocomplete="off" value="${ebAttr(st.refl[i] || '')}"></div>`).join('')}`;
    const msg = body.querySelector('.eb-msg');
    body.querySelector('.eb-chips').addEventListener('click', e=>{
      const b = e.target.closest('.eb-chip'); if(!b) return;
      const v = b.dataset.v, at = st.values.indexOf(v);
      if(at >= 0){ st.values.splice(at, 1); b.setAttribute('aria-pressed', 'false'); msg.textContent = ''; }
      else if(st.values.length >= EB_MAX_VALUES){ msg.textContent = `You can pick up to ${EB_MAX_VALUES} values. Unselect one to make room.`; return; }
      else { st.values.push(v); b.setAttribute('aria-pressed', 'true'); msg.textContent = ''; }
      persist();
    });
    const ci = body.querySelector(`#${uid}-custom`);
    const add = ()=>{
      const v = ci.value.trim().replace(/\s+/g, ' ');
      if(!v) return;
      if(cfg.values.some(x=>x.toLowerCase() === v.toLowerCase())){ msg.textContent = `"${v}" is already in the list above. Pick it there.`; return; }
      st.values = st.values.filter(x=>x !== st.custom);
      st.custom = v;
      if(st.values.length >= EB_MAX_VALUES){ persist(); renderGather(`You already have ${EB_MAX_VALUES} values. Unselect one, then pick "${v}".`); return; }
      st.values.push(v); persist(); renderGather(`Added "${v}".`);
      const again = root.querySelector(`#${uid}-custom`); if(again) again.focus();
    };
    body.querySelector('.eb-add').addEventListener('click', add);
    ci.addEventListener('keydown', e=>{ if(e.key === 'Enter'){ e.preventDefault(); add(); } });
    cfg.reflections.forEach((r, i)=>{
      body.querySelector(`#${uid}-r${i}`).addEventListener('input', e=>{ st.refl[i] = e.target.value; persist(); });
    });
  }

  /* ---- Part 3: mind map ---- */
  function renderMap(){
    const body = root.querySelector('.eb-body');
    const vals = chosen(), ans = answersList();
    if(!vals.length || !ans.length){
      body.innerHTML = `<h3 class="eb-part-h">Your mind map</h3>
        <p class="ag-note">${!vals.length ? 'Pick at least one value' : 'Add at least one idea'} in "Gather ideas" first, then come back to build your map.</p>`;
      return;
    }
    body.innerHTML = `
      <div class="eb-printable">
      <h3 class="eb-part-h">Your mind map</h3>
      <div class="eb-noprint">
        <p class="ag-p">For each idea, choose the value it shows about you.</p>
        <div class="eb-links">${ans.map(a=>`
          <div class="eb-link"><label class="eg-label" for="${uid}-l${a.i}">${escapeHtml(a.label)}: <span class="eb-ans">${escapeHtml(a.text)}</span></label>
          <select id="${uid}-l${a.i}" class="modal-search eb-select" data-i="${a.i}"><option value="">Not connected</option>${vals.map(v=>`<option value="${ebAttr(v)}"${a.value === v ? ' selected' : ''}>${escapeHtml(v)}</option>`).join('')}</select></div>`).join('')}
        </div>
      </div>
      <div class="eb-map" tabindex="0" role="group" aria-label="Mind map (scrolls sideways on small screens)"></div>
      <div class="eb-noprint eb-topics"></div>
      <div class="eb-summary"></div>
      </div>
      <div class="eb-actions">
        <button type="button" class="guide-arrow eb-print">Print</button>
        <button type="button" class="guide-arrow eb-clear">Clear my answers</button>
      </div>`;
    const draw = focusStar =>{
      const a = answersList(), keep = validStars(), conn = a.filter(x=>x.value);
      const mapEl = body.querySelector('.eb-map');
      mapEl.innerHTML = ebMapSvg(vals, a);
      mapEl.scrollLeft = Math.max(0, (mapEl.scrollWidth - mapEl.clientWidth) / 2);
      body.querySelector('.eb-topics').innerHTML = `<h4 class="eb-sub">Possible essay topics</h4>
        ${conn.length ? `<p class="ag-p">Star up to ${EB_MAX_STARS} you'd like to talk through.</p>
        <ul class="eb-topic-list">${conn.map(x=>`<li><button type="button" class="eb-star" data-i="${x.i}" aria-pressed="${keep.includes(x.i)}" aria-label="Star topic: ${escapeHtml(x.text)} shows ${escapeHtml(x.value)}"><span aria-hidden="true">${keep.includes(x.i) ? '★' : '☆'}</span></button><span>${escapeHtml(x.text)} → shows ${escapeHtml(x.value)}</span></li>`).join('')}</ul>
        <p class="eb-msg" role="status" aria-live="polite"></p>` : `<p class="ag-note">Connect an idea to a value above and it will show up here as a topic.</p>`}`;
      const t = ebTally(cfg.quiz, st), stars = conn.filter(x=>keep.includes(x.i));
      body.querySelector('.eb-summary').innerHTML = `<div class="fairtest-box eb-summary-box"><h4 class="eb-sub">My brainstorm summary</h4>
        <p><strong>Best-fit prompt${t.shown.length > 1 ? 's' : ''}:</strong> ${t.shown.length ? t.shown.map(n=>`Prompt ${n}, ${escapeHtml((prompts[n-1] || {}).title || '')}`).join('; ') : 'Not chosen yet'}</p>
        <p><strong>Values:</strong> ${vals.map(escapeHtml).join(', ')}</p>
        <p><strong>Topic ideas:</strong></p>${stars.length ? `<ul>${stars.map(x=>`<li>${escapeHtml(x.text)} → shows ${escapeHtml(x.value)}</li>`).join('')}</ul>` : '<p>None starred yet</p>'}
        <p class="eb-bring">Bring this to your counselor or English teacher to talk it through.</p></div>`;
      if(focusStar != null){ const b = body.querySelector(`.eb-star[data-i="${focusStar}"]`); if(b) b.focus(); }
    };
    draw();
    body.querySelectorAll('.eb-select').forEach(sel=>{
      sel.addEventListener('change', ()=>{ st.links[sel.dataset.i] = sel.value; persist(); draw(); });
    });
    body.querySelector('.eb-topics').addEventListener('click', e=>{
      const b = e.target.closest('.eb-star'); if(!b) return;
      const i = Number(b.dataset.i), keep = validStars();
      if(keep.includes(i)) st.stars = keep.filter(n=>n !== i);
      else if(keep.length >= EB_MAX_STARS){
        const m = body.querySelector('.eb-topics .eb-msg'); if(m) m.textContent = `You can star up to ${EB_MAX_STARS} topics. Unstar one to pick another.`;
        return;
      } else st.stars = keep.concat(i);
      persist(); draw(i);
    });
    body.querySelector('.eb-print').addEventListener('click', ()=>{
      document.body.classList.add('eb-printing');
      const done = ()=>{ document.body.classList.remove('eb-printing'); window.removeEventListener('afterprint', done); };
      window.addEventListener('afterprint', done);
      window.print();
    });
    body.querySelector('.eb-clear').addEventListener('click', ()=>{
      if(!window.confirm('Clear all of your Essay Brainstorm answers? This cannot be undone.')) return;
      st.quiz = {}; st.values = []; st.custom = ''; st.refl = []; st.links = {}; st.stars = [];
      try{ localStorage.removeItem(EB_KEY); }catch(e){}
      go(0, true);
    });
  }
  go(0, false);
}

function renderFeeWaiversHtml(waivers){
  return `<div class="panel-grid">${waivers.map(w=>`
    <div class="panel-card fee-card">
      <div class="school">${escapeHtml(w.school)}</div>
      ${w.code ? `<div class="code">Code: ${escapeHtml(w.code)}</div>` : ''}
      ${w.details ? `<ul>${w.details.map(d=>`<li>${escapeHtml(d)}</li>`).join('')}</ul>` : ''}
      ${w.link ? `<a class="more-info" href="${escapeHtml(w.link.url)}" target="_blank" rel="noopener">${escapeHtml(w.link.text)} ↗</a>` : ''}
    </div>
  `).join('')}</div>`;
}

/* ---------- Supplemental Essay Guides (list in assets/data/essay-guides.js) ---------- */
function essayGuideSortKey(name){ return name.replace(/^(the |university of |suny )/i, ''); }
function essayGuideSearchText(g){
  return (g.name + ' ' + (g.aka || '')).toLowerCase().replace(/[^a-z0-9&\s]+/g, ' ');
}
function renderEssayGuidesHtml(s){
  if(typeof ESSAY_GUIDES === 'undefined'){
    return `<div class="fairtest-box"><p>The essay guide list isn't available right now. Check each college's own admissions site for its supplemental prompts, or ask your counselor.</p></div>`;
  }
  const src = (typeof ESSAY_GUIDES_SOURCE !== 'undefined') ? ESSAY_GUIDES_SOURCE : {};
  const sorted = ESSAY_GUIDES.slice().sort((a, b) => essayGuideSortKey(a.name).localeCompare(essayGuideSortKey(b.name)));
  const groups = [];
  sorted.forEach(g=>{
    const letter = essayGuideSortKey(g.name).charAt(0).toUpperCase();
    let grp = groups[groups.length - 1];
    if(!grp || grp.letter !== letter){ grp = {letter, items: []}; groups.push(grp); }
    grp.items.push(g);
  });
  const tips = (s.tips && s.tips.length) ? `<ul class="eg-tips">${s.tips.map(t=>`<li>${escapeHtml(t)}</li>`).join('')}</ul>` : '';
  return `
    <div class="eg-widget">
      ${tips}
      <label class="eg-label" for="eg-search">Find your school</label>
      <input type="text" id="eg-search" class="modal-search eg-search" placeholder="e.g. Notre Dame, UPenn, WashU" autocomplete="off" aria-controls="eg-list">
      <p class="eg-count" aria-live="polite">${sorted.length} schools</p>
      <div class="eg-list" id="eg-list">
        ${groups.map(grp=>`
        <section class="eg-group">
          <h3 class="eg-letter">${escapeHtml(grp.letter)}</h3>
          <ul>
            ${grp.items.map(g=>`<li data-search="${escapeHtml(essayGuideSearchText(g))}"><a href="${escapeHtml(g.url)}" target="_blank" rel="noopener">${escapeHtml(g.name)}<span class="eg-arrow" aria-hidden="true">&nbsp;↗</span></a></li>`).join('')}
          </ul>
        </section>`).join('')}
      </div>
      <p class="eg-empty" hidden>No guide for that school on this list. Check the college's own admissions site for its prompts, or ask your counselor.</p>
      <p class="eg-source">Guides by ${escapeHtml(src.name || 'College Essay Guy')}${src.year ? ` (${escapeHtml(src.year)})` : ''}. Links open on their site. Prompts change every year, so confirm yours in the Common App before you write.${src.moreUrl ? ` <a href="${escapeHtml(src.moreUrl)}" target="_blank" rel="noopener">${escapeHtml(src.moreText || 'More guidance ↗')}</a>` : ''}</p>
    </div>`;
}
function wireEssayGuides(root){
  if(!root || root.dataset.wired) return; root.dataset.wired = '1';
  const input = root.querySelector('.eg-search');
  const count = root.querySelector('.eg-count');
  const empty = root.querySelector('.eg-empty');
  const items = Array.from(root.querySelectorAll('.eg-group li'));
  const groups = Array.from(root.querySelectorAll('.eg-group'));
  const total = items.length;
  const words = t => t.toLowerCase().replace(/[^a-z0-9&\s]+/g, ' ').split(/\s+/).filter(Boolean);
  const apply = ()=>{
    const q = words(input.value);
    let shown = 0;
    items.forEach(li=>{
      const ok = q.every(w => li.dataset.search.includes(w));
      li.hidden = !ok;
      if(ok) shown++;
    });
    groups.forEach(g=>{ g.hidden = !g.querySelector('li:not([hidden])'); });
    count.textContent = q.length ? `${shown} of ${total} schools` : `${total} schools`;
    empty.hidden = shown > 0;
  };
  input.addEventListener('input', apply);
}

function renderAnnouncements(){
  const box = document.getElementById('updates-box');
  if(!box) return;
  const today = new Date();
  today.setHours(0,0,0,0);
  const todayIso = today.getFullYear() + '-' + String(today.getMonth()+1).padStart(2,'0') + '-' + String(today.getDate()).padStart(2,'0');
  const visits = (typeof REP_VISITS !== 'undefined' ? REP_VISITS : [])
    .filter(v => v.date >= todayIso)
    .map(v => ({date:v.date, visits:[v.name + (v.time ? '|' + v.time : '')]}));
  const upcoming = ANNOUNCEMENTS
    .filter(a => !a.expires || new Date(a.expires + 'T23:59:59') >= today)
    .concat(visits)
    .sort((a,b) => new Date(a.date) - new Date(b.date));
  // One bar per date; every event that day is its own box on that bar.
  const items = [];
  upcoming.forEach(a => {
    let g = items.find(x => x.date === a.date);
    if(!g){ g = {date:a.date, chips:[]}; items.push(g); }
    if(a.visits){
      a.visits.forEach(v => {
        const [name, time] = v.split('|');
        g.chips.push({title:name, body:time || '', tag:'College Rep'});
      });
    } else {
      g.chips.push({title:a.title, body:a.body, tag:''});
    }
  });

  if(!items.length){ box.style.display = 'none'; return; }

  const chipsEl = document.getElementById('updates-chips');
  const monthEl = document.getElementById('updates-month');
  const dayEl = document.getElementById('updates-day');
  const dotsEl = document.getElementById('updates-dots');
  let i = 0;
  let timer = null;

  const formatBadge = (iso) => {
    const d = new Date(iso + 'T12:00:00');
    return {
      month: d.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase(),
      day: d.toLocaleDateString('en-US', { day: 'numeric', timeZone: 'UTC' })
    };
  };

  const renderDots = () => {
    dotsEl.innerHTML = items.map((_, idx)=>
      `<button class="updates-dot" aria-current="${idx===i}" aria-label="Event ${idx+1}" data-idx="${idx}"></button>`
    ).join('');
    dotsEl.querySelectorAll('.updates-dot').forEach(dot=>{
      dot.addEventListener('click', ()=> goTo(parseInt(dot.dataset.idx, 10)));
    });
  };

  const show = () => {
    const item = items[i];
    chipsEl.innerHTML = item.chips.map(c => `
      <div class="updates-chip">
        ${c.tag ? `<span class="updates-chip-tag">${escapeHtml(c.tag)}</span>` : ''}
        <span class="updates-chip-title">${escapeHtml(c.title || '')}</span>
        ${c.body ? `<span class="updates-chip-body">${escapeHtml(c.body)}</span>` : ''}
      </div>`).join('');
    const badge = formatBadge(item.date);
    monthEl.textContent = badge.month;
    dayEl.textContent = badge.day;
    renderDots();
  };

  const goTo = (idx, {restart = true} = {}) => {
    box.classList.add('fading');
    setTimeout(()=>{
      i = ((idx % items.length) + items.length) % items.length;
      show();
      box.classList.remove('fading');
    }, 250);
    if(restart) restartTimer();
  };

  const restartTimer = () => {
    if(timer) clearInterval(timer);
    if(items.length > 1){
      timer = setInterval(()=> goTo(i + 1, {restart:false}), 8000);
    }
  };

  document.getElementById('updates-prev').addEventListener('click', ()=> goTo(i - 1));
  document.getElementById('updates-next').addEventListener('click', ()=> goTo(i + 1));

  if(items.length < 2){
    document.getElementById('updates-prev').style.display = 'none';
    document.getElementById('updates-next').style.display = 'none';
  }

  show();
  restartTimer();
}

function renderModalSchoolList(schools, query){
  const q = (query || '').trim().toLowerCase();
  const filtered = q ? schools.filter(s => s.name.toLowerCase().includes(q)) : schools;
  if(!filtered.length){
    return `<div class="modal-school-list"><div class="modal-empty">No matching schools.</div></div>`;
  }
  const statusLabel = {required:"Required", encouraged:"Highly Encouraged"};
  return `<div class="modal-school-list">${filtered.map(s=>`
    <div class="modal-school-row">
      <span class="modal-school-name">${escapeHtml(s.name)}</span>
      <span class="modal-school-status ${escapeHtml(s.status)}">${escapeHtml(statusLabel[s.status] || s.status)}</span>
    </div>
  `).join('')}</div>`;
}

function openImageLightbox(src, title){
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  document.querySelector('.modal-box').style.maxWidth = '820px';
  content.innerHTML = `
    <h2 class="modal-title" id="modal-title">${escapeHtml(title || 'Screenshot')}</h2>
    <img src="${escapeHtml(src)}" alt="${escapeHtml(title || '')}" style="width:100%; height:auto; border-radius:8px; border:1px solid var(--rule); display:block;">
  `;
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
}

function openModal(key){
  const modal = MODALS[key];
  if(!modal) return;
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  document.querySelector('.modal-box').style.maxWidth = '';
  content.innerHTML = `
    <h2 class="modal-title" id="modal-title">${escapeHtml(modal.title)}</h2>
    <p class="modal-intro">${escapeHtml(modal.intro)}</p>
    ${modal.schools ? `
      <input type="text" class="modal-search" id="modal-search" placeholder="${escapeHtml(modal.searchPlaceholder || 'Search…')}">
      <div id="modal-school-results">${renderModalSchoolList(modal.schools, '')}</div>
      <p class="modal-note">This list is a starting point — check with your counselor if your school isn't listed yet.</p>
    ` : ''}
  `;
  if(modal.schools){
    const searchInput = document.getElementById('modal-search');
    searchInput.addEventListener('input', ()=>{
      document.getElementById('modal-school-results').innerHTML = renderModalSchoolList(modal.schools, searchInput.value);
    });
  }
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  const overlay = document.getElementById('modal-overlay');
  overlay.hidden = true;
  document.body.style.overflow = '';
}

document.addEventListener('click', (e)=>{
  const trigger = e.target.closest('[data-modal]');
  if(trigger){ openModal(trigger.dataset.modal); return; }
  if(e.target.id === 'modal-close' || e.target.id === 'modal-overlay'){ closeModal(); }
});
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') closeModal();
});

/* ---------- College exploration lists (data: assets/data/exploration-lists.js) ----------
   A section with  type: "schoolLists"  and  lists: ["goldilocks", ...]  shows each list
   on its own tab, with search and filters. Any "items" on the section show below. */
let SL_COUNTER = 0;
function slSearchText(t){ return String(t).toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9&\s]+/g, ' '); }
function slSchoolHtml(sc, list){
  const large = list.largeAt && sc.size >= list.largeAt;
  const tags = (sc.tags || []);
  const meta = [];
  if(sc.size) meta.push(sc.size.toLocaleString('en-US') + ' undergrads');
  if(sc.state) meta.push(sc.state);
  if(sc.note) meta.push(sc.note);
  const pills = [];
  if(sc.ohio) pills.push('<span class="sl-tag ohio">Ohio public</span>');
  tags.forEach(t => pills.push(`<span class="sl-tag">${escapeHtml((list.tagLabels || {})[t] || t)}</span>`));
  const flags = ['large', 'b', 'e'].filter(f => f === 'large' ? large : f === 'b' ? (tags.includes('b') || tags.includes('b-ish')) : tags.includes(f)).join(' ');
  return `<li class="${large ? 'is-large' : ''}" data-search="${escapeHtml(slSearchText(sc.name + ' ' + (sc.state || '')))}" data-name="${escapeHtml(sc.name + '/' + (sc.state || ''))}" data-flags="${flags}">
      <span class="sl-name">${escapeHtml(sc.name)}</span>
      ${meta.length ? `<span class="sl-meta">${escapeHtml(meta.join(', '))}</span>` : ''}
      ${pills.length ? `<span class="sl-tags">${pills.join('')}</span>` : ''}
    </li>`;
}
function renderSchoolListsHtml(s, year, key){
  if(typeof EXPLORATION_LISTS === 'undefined'){
    return `<div class="fairtest-box"><p>The school lists aren't available right now. Ask your counselor for a copy.</p></div>`;
  }
  const keys = (s.lists || Object.keys(EXPLORATION_LISTS)).filter(k => EXPLORATION_LISTS[k]);
  const uid = 'sl' + (++SL_COUNTER);
  const tabs = keys.map((k, i)=>{
    const L = EXPLORATION_LISTS[k];
    return `<button type="button" role="tab" id="${uid}-tab-${i}" aria-controls="${uid}-panel-${i}" data-list="${escapeHtml(k)}" aria-selected="false" tabindex="-1">
      <span class="sl-tab-name">${escapeHtml(L.tab)}</span>${L.sub ? `<span class="sl-tab-sub">${escapeHtml(L.sub)}</span>` : ''}
    </button>`;
  }).join('');
  const panels = keys.map((k, i)=>{
    const L = EXPLORATION_LISTS[k];
    const kinds = L.kinds || null;
    const groups = L.groups.map((g, gi)=>`
      <section class="sl-group" data-group="${gi}" data-kind="${escapeHtml(g.kind || '')}">
        <h4 class="sl-group-title">${escapeHtml(g.name)}</h4>
        ${g.intro ? `<p class="sl-group-intro">${escapeHtml(g.intro)}</p>` : ''}
        <ul>${g.schools.map(sc => slSchoolHtml(sc, L)).join('')}</ul>
      </section>`).join('');
    const chips = L.groups.map((g, gi)=>`<button type="button" class="sl-chip" data-group="${gi}" data-kind="${escapeHtml(g.kind || '')}" aria-pressed="false">${escapeHtml(g.name)}</button>`).join('');
    return `
    <div class="sl-panel" role="tabpanel" id="${uid}-panel-${i}" aria-labelledby="${uid}-tab-${i}" data-list="${escapeHtml(k)}" hidden>
      <h3 class="sl-title">${escapeHtml(L.title)}</h3>
      <p class="sl-intro">${escapeHtml(L.intro)}</p>
      ${L.largeLabel ? `<p class="sl-legend"><span class="sl-swatch" aria-hidden="true"></span>${escapeHtml(L.largeLabel)}</p>` : ''}
      ${L.tagNote ? `<p class="sl-legend">${escapeHtml(L.tagNote)}</p>` : ''}
      <div class="sl-controls">
        <div class="sl-search-wrap">
          <label class="eg-label" for="${uid}-search-${i}">Search this list</label>
          <input type="search" id="${uid}-search-${i}" class="modal-search sl-search" placeholder="${escapeHtml(L.searchPlaceholder || (L.groups.some(g => g.schools.some(sc => sc.state)) ? 'School name or state' : 'School name'))}" autocomplete="off">
        </div>
        ${kinds ? `<div class="sl-kind" role="group" aria-label="Browse">
          ${kinds.map((kd, ki)=>`<button type="button" data-kind="${escapeHtml(kd.key)}" aria-pressed="${ki === 0}">${escapeHtml(kd.label)}</button>`).join('')}
        </div>` : ''}
        <div class="sl-chip-row" role="group" aria-label="Show one group">
          <button type="button" class="sl-chip" data-group="all" aria-pressed="true">All</button>${chips}
        </div>
        ${L.toggles ? `<div class="sl-chip-row" role="group" aria-label="Filters">${L.toggles.map(t=>`<button type="button" class="sl-chip sl-toggle" data-flag="${escapeHtml(t.key)}" aria-pressed="false">${escapeHtml(t.label)}</button>`).join('')}</div>` : ''}
      </div>
      <p class="sl-count" aria-live="polite"></p>
      <div class="sl-groups">${groups}</div>
      <p class="sl-empty" hidden>No schools on this list match. Try a different spelling, clear a filter, or ask your counselor.</p>
      <p class="eg-source">From Moeller College Counseling. ${L.groups.some(g => g.schools.some(sc => sc.size)) ? 'Enrollment numbers are approximate and change every year' : 'Programs change over time'}, so confirm details on each college's website.</p>
    </div>`;
  }).join('');
  const extra = (s.items && s.items.length) ? `<div class="resource-grid sl-extra">${s.items.map(item=>`
    <div class="resource-card">
      <div class="resource-text"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.desc || '')}</p></div>
      ${item.url ? resourceLinkHtml(item.url) : ''}
    </div>`).join('')}</div>` : '';
  return `
    <div class="sl-widget" data-store="crh-sl-${escapeHtml(year)}-${escapeHtml(key)}">
      <div class="sl-tabs" role="tablist" aria-label="School lists">${tabs}</div>
      ${panels}
    </div>
    ${extra}`;
}
function wireSchoolLists(root){
  if(!root || root.dataset.wired) return; root.dataset.wired = '1';
  const tabs = Array.from(root.querySelectorAll('.sl-tabs [role="tab"]'));
  const panels = Array.from(root.querySelectorAll('.sl-panel'));
  const store = root.dataset.store;
  const select = (idx, focus)=>{
    tabs.forEach((t, i)=>{ t.setAttribute('aria-selected', String(i === idx)); t.tabIndex = i === idx ? 0 : -1; });
    panels.forEach((p, i)=>{ p.hidden = i !== idx; });
    if(focus) tabs[idx].focus();
    try{ localStorage.setItem(store, tabs[idx].dataset.list); }catch(e){}
  };
  tabs.forEach((t, i)=>{
    t.addEventListener('click', ()=> select(i));
    t.addEventListener('keydown', e=>{
      if(e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
        e.preventDefault();
        select((i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length, true);
      }
    });
  });
  let start = 0;
  try{ const saved = localStorage.getItem(store); const j = tabs.findIndex(t => t.dataset.list === saved); if(j >= 0) start = j; }catch(e){}
  select(start);

  panels.forEach(panel=>{
    const input = panel.querySelector('.sl-search');
    const count = panel.querySelector('.sl-count');
    const empty = panel.querySelector('.sl-empty');
    const groups = Array.from(panel.querySelectorAll('.sl-group'));
    const groupChips = Array.from(panel.querySelectorAll(".sl-chip[data-group]"));
    const toggles = Array.from(panel.querySelectorAll('.sl-toggle'));
    const kindBtns = Array.from(panel.querySelectorAll('.sl-kind button'));
    let kind = kindBtns.length ? kindBtns[0].dataset.kind : '';
    let group = 'all';
    const flags = new Set();
    const words = t => slSearchText(t).split(/\s+/).filter(Boolean);
    const apply = ()=>{
      const q = words(input.value);
      const names = new Set();
      let totalNames = new Set();
      groups.forEach(g=>{
        const inKind = !kind || g.dataset.kind === kind;
        const inGroup = group === 'all' || g.dataset.group === group;
        let shownHere = 0;
        g.querySelectorAll('li').forEach(li=>{
          if(inKind) totalNames.add(li.dataset.name);
          const f = li.dataset.flags.split(' ');
          const ok = inKind && inGroup && q.every(w => li.dataset.search.includes(w)) && [...flags].every(x => f.includes(x));
          li.hidden = !ok;
          if(ok){ shownHere++; names.add(li.dataset.name); }
        });
        g.hidden = !shownHere;
      });
      groupChips.forEach(c=>{
        c.hidden = c.dataset.group !== 'all' && kind && c.dataset.kind !== kind;
        c.setAttribute('aria-pressed', String(c.dataset.group === group));
      });
      const filtered = q.length || flags.size || group !== 'all';
      count.textContent = filtered ? `${names.size} of ${totalNames.size} schools` : `${totalNames.size} schools`;
      empty.hidden = names.size > 0;
    };
    input.addEventListener('input', apply);
    groupChips.forEach(c => c.addEventListener('click', ()=>{ group = c.dataset.group; apply(); }));
    toggles.forEach(t => t.addEventListener('click', ()=>{
      const on = t.getAttribute('aria-pressed') !== 'true';
      t.setAttribute('aria-pressed', String(on));
      if(on) flags.add(t.dataset.flag); else flags.delete(t.dataset.flag);
      apply();
    }));
    kindBtns.forEach(b => b.addEventListener('click', ()=>{
      kind = b.dataset.kind; group = 'all';
      kindBtns.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      apply();
    }));
    apply();
  });
}
