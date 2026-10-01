/* =========================================================================
   SITE SHELL — the shared header, landing page, hub dashboards, class
   pages, and topic pages. Edit the menu in SITE_NAV / GRADE_PAGES below;
   page content lives in assets/data/.
   ========================================================================= */

const GRADE_PAGES = [
  {key:"senior",    file:"seniors.html",    name:"Seniors",    tab:"Senior"},
  {key:"junior",    file:"juniors.html",    name:"Juniors",    tab:"Junior"},
  {key:"sophomore", file:"sophomores.html", name:"Sophomores", tab:"Sophomore"},
  {key:"freshman",  file:"freshmen.html",   name:"Freshmen",   tab:"Freshman"}
];

const SITE_NAV = [
  {hub:"school",  text:"School Counseling",  href:"school-counseling.html"},
  {hub:"college", text:"College Counseling", href:"college-counseling.html"}
];

/* ---------- helpers ---------- */
function pageInfo(){
  const d = document.body.dataset;
  return {kind:d.kind, hub:d.hub || null, page:d.page || null};
}
function currentView(){
  const v = new URLSearchParams(location.search).get('view');
  return v === 'school' ? 'school' : 'college';
}
function gradeHref(g, view){
  return g.file + (view === 'school' ? '?view=school' : '');
}
function linkAttrs(href){
  return isExternal(href) ? ` href="${escapeHtml(href)}" target="_blank" rel="noopener"` : ` href="${escapeHtml(href)}"`;
}
function gradeData(key){ return (typeof YEARS !== 'undefined' && YEARS[key]) || null; }

/* ---------- header ---------- */
function renderSiteHeader(activeView){
  const info = pageInfo();
  const header = document.getElementById('site-header');
  if(!header) return;
  // Which hub is "current", and which view the class tabs should open in
  let activeHub = info.hub;
  let tabView = info.hub === 'school' ? 'school' : 'college';
  if(info.kind === 'grade'){ activeHub = activeView; tabView = activeView; }
  if(info.kind === 'landing'){ activeHub = null; }

  header.innerHTML = `
    <div class="header-inner">
      <div class="site-brand">
        <a class="wordmark" href="index.html">Moeller <span>Counseling</span></a>
        <nav class="hub-links" aria-label="Counseling teams">
          ${SITE_NAV.map(n=>`<a data-hub="${n.hub}" href="${n.href}"${n.hub===activeHub ? ' aria-current="page"' : ''}>${escapeHtml(n.text)}</a>`).join('')}
        </nav>
      </div>
      <nav class="year-tabs" aria-label="Class pages">
        ${GRADE_PAGES.map(g=>{
          const y = gradeData(g.key);
          const label = (y && y.tabLabel) || g.tab;
          return `<a class="year-tab" href="${gradeHref(g, tabView)}"${info.page===g.key ? ' aria-current="page"' : ''}>${escapeHtml(label)}</a>`;
        }).join('')}
      </nav>
    </div>
  `;
}

function heroHtml(stage, title, blurb, hub, extra){
  return `
    ${extra || ''}
    ${stage ? `<span class="hero-stage${hub==='school' ? ' hub-school' : ''}">${escapeHtml(stage)}</span>` : ''}
    <h1>${escapeHtml(title)}</h1>
    ${blurb ? `<p>${escapeHtml(blurb)}</p>` : ''}
  `;
}

function classLinksHtml(view, hidePrograms){
  return `<div class="class-row">${GRADE_PAGES.map(g=>{
    const y = gradeData(g.key) || {};
    const program = hidePrograms ? '' : view === 'school' ? 'School & Academics' : (y.collegeLabel || '');
    return `
      <a class="class-link" href="${gradeHref(g, view)}">
        <span class="grade">${escapeHtml(g.name)}</span>
        ${y.label ? `<span class="classof">${escapeHtml(y.label)}</span>` : ''}
        ${program ? `<span class="program">${escapeHtml(program)}</span>` : ''}
      </a>`;
  }).join('')}</div>`;
}

/* ---------- stacked, collapsible sections (works for any page object) ---------- */
function renderStacked(pageObj, storeKey, targetId){
  const wrap = document.getElementById(targetId);
  if(!wrap || !pageObj) return;
  const order = pageObj.order || Object.keys(pageObj.sections || {});
  const queues = [];
  wrap.innerHTML = order.map((key, idx)=>{
    const s = pageObj.sections[key];
    if(!s) return '';
    const body = renderSectionBody(s, storeKey, key);
    queues[idx] = {s, mgs: PENDING_MINI_GUIDES.slice()};
    return `
      <div class="resource-section" data-sec="${idx}">
        <div class="section-head-row" role="button" tabindex="0" aria-expanded="true" data-collapse-key="crh-collapsed-${escapeHtml(storeKey)}-${escapeHtml(key)}">
          <div class="section-titles">
            <h2>${escapeHtml(s.title)}</h2>
            ${s.note ? `<span class="section-note">${escapeHtml(s.note)}</span>` : ''}
          </div>
          <span class="chevron" aria-hidden="true">⌄</span>
        </div>
        <div class="section-body">
          ${s.desc ? `<p class="section-desc">${escapeHtml(s.desc)}</p>` : ''}
          ${body}
          ${s.guide ? renderGuideWidget(s.guide) : ''}
        </div>
      </div>`;
  }).join('');
  wireSectionInteractions();
  queues.forEach((q, idx)=>{
    if(!q) return;
    const el = wrap.querySelector(`[data-sec="${idx}"]`);
    if(q.s.guide) wireGuideWidget(el.querySelector('.guide-widget'), q.s.guide);
    if(q.s.dates) wireDatesWidget(el.querySelector('.dates-widget'), q.s.dates);
    if(q.s.tool) wireToolWidget(el.querySelector('.tscore-tool'), q.s.tool);
    q.mgs.forEach(({id, data}) => wireMiniGuide(el.querySelector(`[data-mgid="${id}"]`), data));
  });
}

/* ---------- landing page ---------- */
function renderLanding(){
  document.getElementById('hero').innerHTML = heroHtml(
    null,
    'Moeller Counseling',
    ''
  );
  const doorList = hub => HUBS[hub].boxes.map(b=>`<li><a${linkAttrs(b.href)}>${escapeHtml(b.title)}</a></li>`).join('');
  document.getElementById('doorways').innerHTML = `
    <div class="door-pair">
      <section class="door school">
        <h2>School Counseling</h2>
        <p>${escapeHtml(HUBS.school.blurb)}</p>
        <ul>${doorList('school')}</ul>
        <a class="door-cta" href="${HUBS.school.page}">Open School Counseling</a>
      </section>
      <section class="door college">
        <h2>College Counseling</h2>
        <p>${escapeHtml(HUBS.college.blurb)}</p>
        <ul>${doorList('college')}</ul>
        <a class="door-cta" href="${HUBS.college.page}">Open College Counseling</a>
      </section>
    </div>
    <div class="bridge">
      <div class="bridge-head">
        <h2>Class pages</h2>
        <p>Shared by both teams: each one has a college view and a school view.</p>
      </div>
      ${classLinksHtml('college')}
    </div>
  `;
  document.title = 'Moeller Counseling';
}

/* ---------- hub dashboards ---------- */
function renderHub(hubKey){
  const h = HUBS[hubKey];
  document.getElementById('hero').innerHTML = heroHtml(h.title + ' Hub', h.title, h.blurb, hubKey);
  document.getElementById('dashboard').innerHTML = `
    <div class="dash-grid">
      ${h.boxes.map(b=>`
        <a class="dash-box"${linkAttrs(b.href)}>
          <h3>${escapeHtml(b.title)}</h3>
          <p>${escapeHtml(b.desc)}</p>
          ${b.leads ? `<span class="leads">${escapeHtml(b.leads)}</span>` : ''}
        </a>`).join('')}
    </div>`;
  document.getElementById('classes').innerHTML = `
    <div class="block-head"><h2>${escapeHtml(h.classHeading)}</h2>${h.classIntro ? `<p>${escapeHtml(h.classIntro)}</p>` : ''}</div>
    ${classLinksHtml(hubKey, h.hideClassPrograms)}`;
  document.getElementById('cross').innerHTML = h.newsletter ? `
    <div class="newsletter-box">
      <div class="newsletter-head">
        <h2>${escapeHtml(h.newsletter.heading)}</h2>
        ${h.newsletter.week ? `<span class="newsletter-week">${escapeHtml(h.newsletter.week)}</span>` : ''}
      </div>
      <div class="newsletter-items">
        ${h.newsletter.items.map(n=>`
          <div class="newsletter-item">
            <h3>${escapeHtml(n.title)}</h3>
            <p>${escapeHtml(n.text)}</p>
          </div>`).join('')}
      </div>
    </div>` : `
    <div class="cross-strip">
      <div><h2>${escapeHtml(h.cross.heading)}</h2><p>${escapeHtml(h.cross.intro)}</p></div>
      <ul class="cross-links">
        ${h.cross.links.map(l=>`<li><a${linkAttrs(l.href)}>${escapeHtml(l.text)}</a>${l.note ? ` <span>— ${escapeHtml(l.note)}</span>` : ''}</li>`).join('')}
      </ul>
    </div>`;
  document.title = h.title + ' · Moeller Counseling';
}

/* ---------- class (grade) pages ---------- */
function renderGradePage(key){
  const y = YEARS[key];
  renderHero(key);

  // College view
  const indexedWrap = document.getElementById('indexed-wrap');
  if(y.layout === 'indexed'){
    indexedWrap.classList.add('active');
    renderIndexNav(key);
  } else {
    indexedWrap.classList.remove('active');
    renderStacked(y, key, 'sections');
  }

  // School view
  const school = y.school;
  if(school){
    document.getElementById('school-intro').innerHTML = school.blurb ? `<p>${escapeHtml(school.blurb)}</p>` : '';
    renderStacked(school, key + '-school', 'school-sections');
  }

  // Switch
  const sw = document.getElementById('view-switch');
  sw.innerHTML = `
    <button type="button" role="tab" data-view="college">${escapeHtml(y.collegeLabel || 'College & Career')}</button>
    ${school ? `<button type="button" role="tab" data-view="school">School &amp; Academics</button>` : ''}
  `;
  const setView = (view, push)=>{
    if(view === 'school' && !school) view = 'college';
    sw.querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected', String(b.dataset.view === view)));
    document.getElementById('pane-college').hidden = view !== 'college';
    document.getElementById('pane-school').hidden = view !== 'school';
    document.getElementById('view-note').textContent = view === 'school'
      ? 'From School Counseling'
      : 'From College Counseling';
    if(push){
      const url = new URL(location.href);
      if(view === 'school') url.searchParams.set('view', 'school'); else url.searchParams.delete('view');
      history.replaceState(null, '', url);
    }
    renderSiteHeader(view);
  };
  sw.querySelectorAll('button').forEach(b=>b.addEventListener('click', ()=>setView(b.dataset.view, true)));
  setView(currentView(), false);
  document.title = `${GRADE_PAGES.find(g=>g.key===key).name} · ${y.label} · Moeller Counseling`;
}

/* ---------- topic pages ---------- */
function renderTopicPage(key){
  const t = YEARS[key];
  const h = HUBS[t.hub];
  document.getElementById('hero').innerHTML = heroHtml(
    h.title, t.label, t.blurb, t.hub,
    `<a class="back-link" href="${h.page}">← Back to ${escapeHtml(h.title)}</a><br>`
  );
  renderStacked(t, key, 'sections');
  document.title = `${t.label} · Moeller Counseling`;
}

/* ---------- start ---------- */
(function init(){
  const info = pageInfo();
  if(info.kind === 'landing') renderLanding();
  if(info.kind === 'hub') renderHub(info.hub);
  if(info.kind === 'grade') renderGradePage(info.page);
  if(info.kind === 'topic') renderTopicPage(info.page);
  if(info.kind !== 'grade') renderSiteHeader(null);
  renderCounselors();
  renderAnnouncements();
})();
