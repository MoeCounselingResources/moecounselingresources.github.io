/* =========================================================================
   EXPLORE COURSES AND PATHWAYS — logic for course-maps.html.
   Wording: assets/data/course-maps-text.js · Courses and pathways: assets/data/course-maps.js · Look: assets/css/course-maps.css
   Nothing on this page saves anything (no localStorage, no cookies). The only thing in the address bar is #pathway-id.
   ========================================================================= */
(function(){
  if(typeof CM_TEXT === 'undefined' || typeof PATHWAYS === 'undefined' || typeof COURSES === 'undefined' || typeof DEPT_COLORS === 'undefined') return;
  const root = document.getElementById('cm-root'); if(!root) return;
  const T = CM_TEXT, NAVY = '#0C2340', SLATE = '#5B6770', CLOUD = '#C1C6C8';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt = (s, o) => String(s).replace(/\{(\w+)\}/g, (m, k) => (o && o[k] != null ? o[k] : m));
  const $ = id => document.getElementById(id);
  const hexOk = h => /^#[0-9a-fA-F]{6}$/.test(h) ? h : '#898781';
  /* a light tint of a color (t = how much white), so dark text on it is always readable */
  const tint = (h, t) => { const n = parseInt(hexOk(h).slice(1), 16), m = v => Math.round(v + (255 - v) * t); return 'rgb(' + m(n >> 16) + ',' + m(n >> 8 & 255) + ',' + m(n & 255) + ')'; };
  const list = a => (a || []).map(x => '<li>' + esc(x) + '</li>').join('');

  document.getElementById('cm-title').textContent = T.title;
  document.getElementById('cm-stage').textContent = T.stage;
  document.getElementById('cm-footer').textContent = T.footer;
  document.title = T.title + ' · Moeller Counseling';

  /* ---------- shared course/pathway pieces ---------- */
  const chipHtml = c => '<li class="cm-chip is-' + esc(c.type) + '">' +
    (c.type === 'key' ? '<span class="cm-star" aria-hidden="true">★</span><span class="cm-sr">' + esc(T.keyWord) + ': </span>' : '') +
    '<span>' + esc(c.name) + '</span>' +
    (c.type === 'opt' ? ' <span class="cm-opt">' + esc(T.optWord) + '</span>' : '') + '</li>';
  const pathStyle = p => '--pc:' + hexOk(p.color) + ';--pt:' + tint(p.color, 0.82);
  const gradeBlocks = p => T.gradeNames.map((g, i) =>
    '<section class="cm-gradecol"><h4>' + esc(g) + '</h4><ul class="cm-chips">' + ((p.years[i] || []).map(chipHtml).join('')) + '</ul></section>').join('');
  const clubs = p => String(p.cocurr || '').split('·').map(s => s.trim()).filter(Boolean);
  const legendHtml = '<ul class="cm-legend" aria-label="' + esc(T.legend.label) + '">' +
    '<li><span class="cm-sw is-key" aria-hidden="true">★</span>' + esc(T.legend.key) + '</li>' +
    '<li><span class="cm-sw is-req" aria-hidden="true"></span>' + esc(T.legend.req) + '</li>' +
    '<li><span class="cm-sw is-opt" aria-hidden="true"></span>' + esc(T.legend.opt) + '</li></ul>';

  /* ---------- page skeleton: tabs, select, three panels ---------- */
  const tools = (id, area, desktopOnly) =>
    '<div class="cm-tools"><button type="button" class="cm-btn cm-expand' + (desktopOnly ? ' cm-desktop-only' : '') + '" data-area="' + id + '" data-name="' + esc(area) + '" aria-controls="cm-area-' + id + '"></button>' +
    '<button type="button" class="cm-btn cm-print" aria-label="' + esc(fmt(T.printAria, { area })) + '">' + esc(T.print) + '</button></div>';
  root.innerHTML =
    '<p class="cm-intro">' + esc(T.intro) + '</p>' +
    '<div class="cm-tabbar"><div class="cm-tabs" role="tablist" aria-label="' + esc(T.tabBarLabel) + '">' +
    T.tabs.map((t, i) => '<button type="button" role="tab" class="cm-tab" id="cm-tab-' + t.id + '" data-tab="' + t.id + '" aria-controls="cm-panel-' + t.id + '" aria-selected="false" tabindex="-1">' + esc(t.label) + '</button>').join('') + '</div>' +
    '<div class="cm-select"><label for="cm-select">' + esc(T.tabSelectLabel) + '</label><select id="cm-select">' +
    T.tabs.map(t => '<option value="' + t.id + '">' + esc(t.label) + '</option>').join('') + '</select></div></div>' +

    '<section class="cm-panel" id="cm-panel-explorer" role="tabpanel" aria-labelledby="cm-tab-explorer" data-tab="explorer" hidden>' +
    '<div class="cm-panelhead"><div><h2>' + esc(T.explorer.heading) + '</h2><p>' + esc(T.explorer.help) + '</p></div>' + tools('explorer', T.tabs[0].area, true) + '</div>' +
    '<div class="cm-area" id="cm-area-explorer" tabindex="0" role="region" aria-label="' + esc(T.explorer.heading) + '">' +
    '<ul class="cm-tiles" aria-label="' + esc(T.explorer.tilesLabel) + '">' +
    PATHWAYS.map(p => '<li><button type="button" class="cm-tile" data-id="' + esc(p.id) + '" aria-expanded="false" aria-controls="cm-xp-panel" style="' + pathStyle(p) + '">' +
      '<span class="cm-tileicon" aria-hidden="true">' + esc(p.icon) + '</span><span class="cm-tiletext"><strong>' + esc(p.name) + '</strong><span>' + esc(p.desc) + '</span></span></button></li>').join('') + '</ul>' +
    '<div class="cm-xp" id="cm-xp-panel" role="region" aria-labelledby="cm-xp-h" hidden></div></div>' +
    '<p class="cm-sr" id="cm-xp-live" role="status" aria-live="polite"></p></section>' +

    '<section class="cm-panel" id="cm-panel-web" role="tabpanel" aria-labelledby="cm-tab-web" data-tab="web" hidden>' +
    '<div class="cm-panelhead"><div><h2>' + esc(T.web.heading) + '</h2><p>' + esc(T.web.help) + '</p></div>' + tools('web', T.tabs[1].area, false) + '</div>' +
    '<div class="cm-webctl"><div class="cm-filters" role="group" aria-label="' + esc(T.web.filterLabel) + '"></div>' +
    '<div class="cm-pick"><label for="cm-pick">' + esc(T.web.pickLabel) + '</label><select id="cm-pick"></select> <button type="button" class="cm-btn" id="cm-reset">' + esc(T.web.reset) + '</button></div>' +
    '<p class="cm-note">' + esc(T.web.bigger) + '</p></div>' +
    '<div class="cm-area cm-webarea" id="cm-area-web" tabindex="0" role="region" aria-label="' + esc(T.web.scrollLabel) + '"><div class="cm-webwrap" id="cm-webwrap">' +
    '<canvas id="cm-canvas" role="img" aria-label="' + esc(T.web.mapLabel) + '"></canvas><div class="cm-tip" id="cm-tip" aria-hidden="true" hidden></div></div></div>' +
    '<div class="cm-info" id="cm-info" role="status" aria-live="polite"></div></section>' +

    '<section class="cm-panel" id="cm-panel-cards" role="tabpanel" aria-labelledby="cm-tab-cards" data-tab="cards" hidden>' +
    '<div class="cm-panelhead"><div><h2>' + esc(T.cards.heading) + '</h2><p>' + esc(T.cards.help) + '</p></div>' + tools('cards', T.tabs[2].area, true) + '</div>' +
    '<div class="cm-cardfilter"><div class="cm-filters" id="cm-cardfilters" role="group" aria-label="' + esc(T.cards.filterLabel) + '">' +
    PATHWAYS.map(p => '<button type="button" class="cm-fbtn" data-id="' + esc(p.id) + '" aria-pressed="false" style="' + pathStyle(p) + '"><span class="cm-fdot" aria-hidden="true"></span>' + esc(p.name) + '</button>').join('') +
    '<button type="button" class="cm-btn" id="cm-cardall">' + esc(T.cards.showAll) + '</button></div>' +
    '<p class="cm-note" id="cm-cardstatus" role="status" aria-live="polite"></p></div>' +
    '<div class="cm-area" id="cm-area-cards" tabindex="0" role="region" aria-label="' + esc(T.cards.cardsLabel) + '"><div class="cm-cards">' +
    PATHWAYS.map(p => '<article class="cm-card" data-id="' + esc(p.id) + '" aria-labelledby="cm-card-h-' + esc(p.id) + '" style="' + pathStyle(p) + '"><div class="cm-cardband" aria-hidden="true"></div>' +
      '<header class="cm-cardhead"><span class="cm-cardicon" aria-hidden="true">' + esc(p.icon) + '</span><div><h3 id="cm-card-h-' + esc(p.id) + '">' + esc(p.name) + '</h3>' +
      '<p><strong>' + esc(T.cocurrTitle) + ':</strong> ' + esc(clubs(p).join(', ')) + '</p></div></header>' +
      '<div class="cm-cols">' + gradeBlocks(p) + '</div></article>').join('') + '</div></div></section>';

  /* ---------- tabs and select ---------- */
  const tabs = Array.from(root.querySelectorAll('.cm-tab')), panels = Array.from(root.querySelectorAll('.cm-panel')), sel = $('cm-select');
  let activeTab = 'explorer';
  function showTab(id, focusTab){
    activeTab = id;
    tabs.forEach(b => { const on = b.dataset.tab === id; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; if(on && focusTab) b.focus(); });
    panels.forEach(p => { p.hidden = p.dataset.tab !== id; });
    sel.value = id;
    if(id === 'web') drawWeb();
  }
  tabs.forEach((b, i) => {
    b.addEventListener('click', () => showTab(b.dataset.tab, false));
    b.addEventListener('keydown', e => {
      let j = null;
      if(e.key === 'ArrowRight') j = (i + 1) % tabs.length; else if(e.key === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
      else if(e.key === 'Home') j = 0; else if(e.key === 'End') j = tabs.length - 1;
      if(j != null){ e.preventDefault(); showTab(tabs[j].dataset.tab, true); }
    });
  });
  sel.addEventListener('change', () => showTab(sel.value, false));

  /* ---------- expand / collapse (taller area on screen; no fullscreen) ---------- */
  root.querySelectorAll('.cm-expand').forEach(b => {
    const area = $('cm-area-' + b.dataset.area);
    const label = () => {
      const open = area.classList.contains('is-expanded'), action = open ? T.collapse : T.expand;
      b.textContent = action; b.setAttribute('aria-label', fmt(T.expandAria, { action, area: b.dataset.name }));
    };
    label();
    b.addEventListener('click', () => { area.classList.toggle('is-expanded'); label(); if(b.dataset.area === 'web') drawWeb(); });
  });
  root.querySelectorAll('.cm-print').forEach(b => b.addEventListener('click', () => { if(activeTab === 'web') drawWeb(); window.print(); }));

  /* ---------- Tab 1: pathway explorer ---------- */
  const tiles = Array.from(root.querySelectorAll('.cm-tile')), xp = $('cm-xp-panel'), xpArea = $('cm-area-explorer'), live = $('cm-xp-live');
  let openId = null;
  function openPathway(id, fromHash){
    const p = PATHWAYS.find(x => x.id === id);
    if(!p || openId === id){ // tap the open one again: close it
      if(openId){ const old = PATHWAYS.find(x => x.id === openId); live.textContent = fmt(T.explorer.closed, { name: old.name }); }
      openId = null; xp.hidden = true; xp.innerHTML = ''; xpArea.classList.remove('has-open');
      tiles.forEach(t => { t.setAttribute('aria-expanded', 'false'); t.classList.remove('is-open'); });
      try{ history.replaceState(null, '', location.pathname + location.search); }catch(e){}
      return;
    }
    openId = id;
    tiles.forEach(t => { const on = t.dataset.id === id; t.setAttribute('aria-expanded', String(on)); t.classList.toggle('is-open', on); });
    xp.style.cssText = pathStyle(p);
    xp.innerHTML = '<div class="cm-xphead"><span class="cm-cardicon" aria-hidden="true">' + esc(p.icon) + '</span><div><h3 id="cm-xp-h">' + esc(p.name) + ': ' + esc(T.explorer.panelHint) + '</h3><p>' + esc(p.desc) + '</p></div></div>' +
      legendHtml + '<div class="cm-cols">' + gradeBlocks(p) + '</div>' +
      '<section class="cm-clubs"><h4>' + esc(T.cocurrTitle) + '</h4><ul>' + list(clubs(p)) + '</ul></section>';
    xp.hidden = false; xpArea.classList.add('has-open');
    live.textContent = fmt(T.explorer.opened, { name: p.name });
    try{ history.replaceState(null, '', '#' + id); }catch(e){}
    if(!fromHash) xp.scrollIntoView({ block: 'nearest', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  tiles.forEach(t => t.addEventListener('click', () => openPathway(t.dataset.id, false)));

  /* ---------- Tab 3: timeline cards with filter ---------- */
  const fbtns = Array.from(root.querySelectorAll('.cm-fbtn')), cards = Array.from(root.querySelectorAll('.cm-card')), cstatus = $('cm-cardstatus');
  const chosen = new Set();
  function applyCards(){
    cards.forEach(c => { c.hidden = chosen.size > 0 && !chosen.has(c.dataset.id); });
    fbtns.forEach(b => b.setAttribute('aria-pressed', String(chosen.has(b.dataset.id))));
    cstatus.textContent = chosen.size ? fmt(T.cards.someShown, { n: chosen.size, total: PATHWAYS.length }) : fmt(T.cards.allShown, { n: PATHWAYS.length });
  }
  fbtns.forEach(b => b.addEventListener('click', () => { chosen.has(b.dataset.id) ? chosen.delete(b.dataset.id) : chosen.add(b.dataset.id); applyCards(); }));
  $('cm-cardall').addEventListener('click', () => { chosen.clear(); applyCards(); });
  applyCards();

  /* ---------- Tab 2: course web (canvas) ---------- */
  // Courses with the same name are shown once (the first one in the data file wins).
  const seenName = {}, alias = {}, COURSE_LIST = [];
  COURSES.forEach(c => { if(seenName[c.name]){ alias[c.id] = seenName[c.name]; } else { seenName[c.name] = c.id; COURSE_LIST.push(c); } });
  const byId = {}; COURSE_LIST.forEach(c => { byId[c.id] = c; });
  const pre = {}, unl = {};
  COURSE_LIST.forEach(c => { pre[c.id] = []; unl[c.id] = []; });
  COURSE_LIST.forEach(c => (c.prereq || []).forEach(p => { p = alias[p] || p; if(byId[p] && pre[c.id].indexOf(p) < 0){ pre[c.id].push(p); unl[p].push(c.id); } }));
  const DEPTS = Object.keys(DEPT_COLORS).filter(d => COURSE_LIST.some(c => c.dept === d));
  const deptColor = d => hexOk(DEPT_COLORS[d]);
  const names = ids => ids.map(i => byId[i].name);
  const grades = c => c.grade.slice().sort((a, b) => a - b).join(', ');
  const web = { dept: 'All', sel: null, pos: {}, w: 0, h: 0 };
  const canvas = $('cm-canvas'), ctx = canvas.getContext('2d'), wrap = $('cm-webwrap'), tip = $('cm-tip'), info = $('cm-info'), pick = $('cm-pick'), scroller = $('cm-area-web');
  const R = c => 6 + 2.2 * unl[c.id].length, COLW = 250, PADX = 36, TOP = 40, ROW = 36;
  const FONT = '12px "Libre Franklin", -apple-system, "Segoe UI", sans-serif';

  root.querySelector('#cm-panel-web .cm-filters').innerHTML =
    '<button type="button" class="cm-fbtn" data-dept="All" aria-pressed="true">' + esc(T.web.all) + '</button>' +
    DEPTS.map(d => '<button type="button" class="cm-fbtn" data-dept="' + esc(d) + '" aria-pressed="false" style="--pc:' + deptColor(d) + '"><span class="cm-fdot" aria-hidden="true"></span>' + esc(d) + '</button>').join('');
  pick.innerHTML = '<option value="">' + esc(T.web.pickNone) + '</option>' +
    COURSE_LIST.slice().sort((a, b) => a.name.localeCompare(b.name)).map(c => '<option value="' + esc(c.id) + '">' + esc(c.name) + ' (' + esc(c.dept) + ')</option>').join('');

  function layout(){
    const vis = COURSE_LIST.filter(c => web.dept === 'All' || c.dept === web.dept), cols = [[], [], [], []];
    vis.forEach(c => cols[Math.min(Math.max(Math.min.apply(null, c.grade), 9), 12) - 9].push(c));
    web.pos = {}; let most = 1;
    cols.forEach((col, ci) => {
      col.sort((a, b) => DEPTS.indexOf(a.dept) - DEPTS.indexOf(b.dept) || a.name.localeCompare(b.name));
      most = Math.max(most, col.length);
      col.forEach((c, i) => { web.pos[c.id] = { x: PADX + ci * COLW, y: TOP + i * ROW + 14 }; });
    });
    web.w = PADX * 2 + 3 * COLW + 230; web.h = TOP + most * ROW + 24;
  }
  function related(){
    if(!web.sel) return null;
    const s = {}; s[web.sel] = 1; pre[web.sel].forEach(i => { s[i] = 1; }); unl[web.sel].forEach(i => { s[i] = 1; }); return s;
  }
  function drawWeb(){
    layout();
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.round(web.w * dpr); canvas.height = Math.round(web.h * dpr);
    canvas.style.width = web.w + 'px'; canvas.style.height = web.h + 'px'; wrap.style.width = web.w + 'px'; wrap.style.height = web.h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, web.w, web.h);
    ctx.font = 'bold 13px "Libre Franklin", sans-serif'; ctx.fillStyle = NAVY; ctx.textBaseline = 'middle';
    T.gradeNames.forEach((g, i) => { ctx.fillText(g, PADX + i * COLW - 6, 16); ctx.fillStyle = CLOUD; ctx.fillRect(PADX + i * COLW - 6, 28, COLW - 40, 1); ctx.fillStyle = NAVY; });
    const rel = related();
    // lines from a course to the courses it unlocks
    COURSE_LIST.forEach(c => pre[c.id].forEach(p => {
      const a = web.pos[p], b = web.pos[c.id]; if(!a || !b) return;
      const hot = rel && (p === web.sel || c.id === web.sel);
      ctx.globalAlpha = rel ? (hot ? 1 : 0.05) : 0.28; ctx.strokeStyle = hot ? NAVY : SLATE; ctx.lineWidth = hot ? 2 : 1;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }));
    ctx.globalAlpha = 1;
    COURSE_LIST.forEach(c => {
      const p = web.pos[c.id]; if(!p) return;
      const on = !rel || rel[c.id]; ctx.globalAlpha = on ? 1 : 0.15;
      ctx.beginPath(); ctx.arc(p.x, p.y, R(c), 0, Math.PI * 2); ctx.fillStyle = deptColor(c.dept); ctx.fill();
      ctx.lineWidth = c.id === web.sel ? 4 : 2; ctx.strokeStyle = NAVY; ctx.stroke();
      ctx.font = (c.id === web.sel ? 'bold ' : '') + FONT; ctx.fillStyle = NAVY; ctx.textBaseline = 'middle';
      ctx.fillText(c.name, p.x + R(c) + 6, p.y);
    });
    ctx.globalAlpha = 1;
  }
  function infoHtml(c){
    const row = (k, v) => '<div><dt>' + esc(k) + '</dt><dd>' + v + '</dd></div>';
    const lst = ids => ids.length ? esc(names(ids).join(', ')) : esc(T.web.none);
    return '<h3>' + esc(c.name) + '</h3><dl>' + row(T.web.dept, esc(c.dept)) + row(T.web.gradeLevel, esc(grades(c))) +
      row(T.web.prereq, pre[c.id].length ? esc(names(pre[c.id]).join(', ')) : esc(T.web.noPrereq)) + row(T.web.unlocks, lst(unl[c.id])) +
      (c.note ? row(T.web.note, esc(c.note)) : '') + '</dl>';
  }
  function select(id, center){
    web.sel = id && byId[id] ? id : null;
    if(web.sel && !web.pos[web.sel]){ web.dept = 'All'; syncFilters(); }
    drawWeb(); pick.value = web.sel || '';
    if(!web.sel){ tip.hidden = true; info.innerHTML = ''; return; }
    const c = byId[web.sel], p = web.pos[web.sel];
    info.innerHTML = infoHtml(c);
    tip.innerHTML = infoHtml(c); tip.hidden = false;
    const tw = Math.min(260, web.w - 16); tip.style.width = tw + 'px';
    // just below the circle (above it if there is no room), so it never covers the circle's own name
    let left = Math.min(Math.max(8, p.x - 24), web.w - tw - 8), top = p.y + R(c) + 10;
    tip.style.left = left + 'px'; tip.style.top = top + 'px';
    if(top + tip.offsetHeight > web.h - 4) tip.style.top = Math.max(4, p.y - R(c) - 10 - tip.offsetHeight) + 'px';
    if(center){ scroller.scrollTo({ left: Math.max(0, p.x - scroller.clientWidth / 3), top: Math.max(0, p.y - scroller.clientHeight / 3) }); }
  }
  function syncFilters(){ root.querySelectorAll('#cm-panel-web .cm-fbtn').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.dept === web.dept))); }
  root.querySelectorAll('#cm-panel-web .cm-fbtn').forEach(b => b.addEventListener('click', () => {
    web.dept = b.dataset.dept; syncFilters();
    if(web.sel && !(web.dept === 'All' || byId[web.sel].dept === web.dept)) web.sel = null;
    if(web.sel){ select(web.sel, false); } else { select(null); }
  }));
  pick.addEventListener('change', () => select(pick.value || null, true));
  $('cm-reset').addEventListener('click', () => { web.dept = 'All'; syncFilters(); select(null); info.textContent = T.web.cleared; });
  canvas.addEventListener('click', e => {
    const r = canvas.getBoundingClientRect(), x = (e.clientX - r.left) * (web.w / r.width), y = (e.clientY - r.top) * (web.h / r.height);
    let best = null, bd = 1e9;
    COURSE_LIST.forEach(c => { const p = web.pos[c.id]; if(!p) return; const d = Math.hypot(p.x - x, p.y - y); if(d <= R(c) + 6 && d < bd){ bd = d; best = c.id; } });
    if(best) select(best, false); else if(web.sel){ select(null); }
  });
  canvas.style.cursor = 'pointer';
  window.addEventListener('beforeprint', () => { if(activeTab === 'web') drawWeb(); });

  /* ---------- start ---------- */
  const hash = (location.hash || '').slice(1), fromHash = PATHWAYS.some(p => p.id === hash) ? hash : null;
  showTab('explorer', false);
  if(fromHash) openPathway(fromHash, true);
  drawWeb();
})();
