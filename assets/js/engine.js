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
            return `<li><label class="check-item"><input type="checkbox" data-check-key="${escapeHtml(ck)}"><span>${escapeHtml(item)}</span></label></li>`;
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
    const bulletsHtml = item.bullets ? `<ul>${item.bullets.map(b=>`<li>${escapeHtml(b)}</li>`).join('')}</ul>` : '';
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
        <table class="data-table">
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
  return `${datesHtml}${tableHtml}${toolHtml}<div class="resource-grid${s.stacked ? ' stacked' : ''}">${cards}</div>`;
}

function renderIndexNav(year){
  const y = YEARS[year];
  const nav = document.getElementById('index-nav');
  const order = y.order || DEFAULT_SECTION_ORDER;
  let active = null;
  try{ active = localStorage.getItem(`crh-index-active-${year}`); }catch(e){}
  if(!active || !y.sections[active]) active = order[0];

  nav.innerHTML = order.map(key=>{
    const s = y.sections[key];
    if(!s) return '';
    return `<button data-key="${escapeHtml(key)}" aria-current="${key===active}">${escapeHtml(s.navLabel || s.title)}</button>`;
  }).join('');

  nav.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      nav.querySelectorAll('button').forEach(b=>b.setAttribute('aria-current', b===btn));
      renderIndexContent(year, btn.dataset.key);
      try{ localStorage.setItem(`crh-index-active-${year}`, btn.dataset.key); }catch(e){}
    });
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

function renderToolWidget(tool){
  return `
    <div class="tscore-tool">
      ${tool.title ? `<h3 class="tscore-title">${escapeHtml(tool.title)}</h3>` : ''}
      ${tool.intro ? `<p class="tscore-intro">${escapeHtml(tool.intro)}</p>` : ''}
      ${tool.prompt ? `<p class="tscore-prompt">${escapeHtml(tool.prompt)}</p>` : ''}
      <div class="tscore-options">
        ${tool.options.map((o, idx)=>`<button type="button" class="tscore-option" data-idx="${idx}" aria-pressed="false">${escapeHtml(o.label)}</button>`).join('')}
      </div>
      <div class="tscore-result" id="tscore-result" hidden><p></p></div>
      ${tool.note ? `<p class="tscore-note">${escapeHtml(tool.note)}</p>` : ''}
    </div>
  `;
}

function wireToolWidget(root, tool){
  if(!root) return;
  const buttons = root.querySelectorAll('.tscore-option');
  const result = root.querySelector('.tscore-result');
  const resultP = result.querySelector('p');
  buttons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      buttons.forEach(b=>b.setAttribute('aria-pressed', b===btn));
      const opt = tool.options[parseInt(btn.dataset.idx, 10)];
      resultP.textContent = opt.result;
      result.hidden = false;
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
