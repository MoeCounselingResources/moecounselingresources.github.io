/* =========================================================================
   MOELLER POPULAR COLLEGES — interactive range chart with search + filters.
   Data lives in assets/data/popular-colleges.js.
   ========================================================================= */

(function(){
  const AXES = {
    act: {min:16, max:36, ticks:[16,20,24,28,32,36], label:'ACT'},
    sat: {min:1000, max:1600, ticks:[1000,1100,1200,1300,1400,1500,1600], label:'SAT'}
  };
  const PLAN_CHOICES = ['Early Action','Early Decision','Restrictive Early Action','Rolling','Priority Deadline'];
  const POLICY_CHOICES = ['Required','Expected','Optional'];

  const state = {test:'act', score:'', q:'', policies:new Set(), plans:new Set(), stars:false, superscore:false, sort:'name', openName:null};
  const esc = s => escapeHtml(s == null ? '' : String(s));
  const pct = (v, ax) => Math.max(0, Math.min(100, (v - ax.min) / (ax.max - ax.min) * 100));
  const policyGroup = p => p === 'Optional*' ? 'Optional' : p;

  function scoreStatus(c){
    const r = c[state.test]; const s = parseFloat(state.score);
    if(!r || isNaN(s)) return null;
    if(s > r.high) return 'above';
    if(s < r.low) return 'below';
    return 'within';
  }

  function filtered(){
    const q = state.q.trim().toLowerCase();
    let list = POPULAR_COLLEGES.filter(c => {
      if(q && !c.name.toLowerCase().includes(q)) return false;
      if(state.policies.size && !state.policies.has(policyGroup(c.testingPolicy))) return false;
      if(state.plans.size && !c.plans.some(p => state.plans.has(p))) return false;
      if(state.stars && c.stars === 'No') return false;
      if(state.superscore && c.superscore === 'No') return false;
      return true;
    });
    const mid = c => c[state.test] ? (c[state.test].low + c[state.test].high) / 2 : null;
    const s = parseFloat(state.score);
    list.sort((a, b) => {
      if(state.sort === 'name') return a.name.localeCompare(b.name);
      const ma = mid(a), mb = mid(b);
      if(ma == null && mb == null) return a.name.localeCompare(b.name);
      if(ma == null) return 1;
      if(mb == null) return -1;
      if(state.sort === 'high') return mb - ma;
      if(state.sort === 'low') return ma - mb;
      if(state.sort === 'closest' && !isNaN(s)) return Math.abs(ma - s) - Math.abs(mb - s);
      return a.name.localeCompare(b.name);
    });
    return list;
  }

  function row(c){
    const ax = AXES[state.test];
    const r = c[state.test];
    const s = parseFloat(state.score);
    const status = scoreStatus(c);
    const statusLabel = {above:'Above range', within:'In range', below:'Below range'}[status];
    const policyLabel = c.testingPolicy === 'Required' ? 'Test required' : c.testingPolicy === 'Expected' ? 'Test expected' : 'Test optional';
    const grid = ax.ticks.map(t => `<span class="pc-gridline" style="left:${pct(t, ax)}%"></span>`).join('');
    const bar = r
      ? `<span class="pc-bar${r.nonResident ? ' nonres' : ''}" style="left:${pct(r.low, ax)}%; width:${pct(r.high, ax) - pct(r.low, ax)}%"><span>${r.low}</span><span>${r.high}</span></span>`
      : `<span class="pc-none">No ${ax.label} range reported</span>`;
    const you = !isNaN(s) ? `<span class="pc-you" style="left:${pct(s, ax)}%" aria-hidden="true"></span>` : '';
    const sub = [c.plans.join(' · ')];
    if(r && r.nonResident) sub.push('Non-resident range');
    const isOpen = state.openName === c.name;
    return `
      <div class="pc-row${isOpen ? ' open' : ''}" data-name="${esc(c.name)}">
        <button type="button" class="pc-row-main" aria-expanded="${isOpen}">
          <span class="pc-name">${esc(c.name)}<small>${esc(sub.join(' · '))}</small></span>
          <span class="pc-track" aria-label="${r ? `${ax.label} middle 50%: ${r.low} to ${r.high}` : 'No range reported'}">${grid}${bar}${you}</span>
          <span class="pc-status ${status || ''}">${status ? statusLabel : policyLabel}</span>
        </button>
        ${isOpen ? detail(c) : ''}
      </div>`;
  }

  function dd(label, v){ return v ? `<div><dt>${esc(label)}</dt><dd>${esc(v)}</dd></div>` : ''; }

  function detail(c){
    const tracked = trackerHasCollege(trackerLoad(), c.name);
    return `
      <div class="pc-detail">
        <dl class="pc-detail-grid">
          ${dd('Early plan', c.earlyType)}
          ${dd('Early deadline', c.earlyDeadline)}
          ${dd('Regular deadline', c.regularDeadline)}
          ${dd('Testing policy', c.testingPolicyFull)}
          ${dd('Middle 50% ACT', c.act ? c.act.label : 'Not reported')}
          ${dd('Middle 50% SAT', c.sat ? c.sat.label : 'Not reported')}
          ${dd('Official score report required', c.officialScores)}
          ${dd('Superscores', c.superscore)}
          ${dd('STARS (self-reported academic record)', c.stars)}
          ${dd('Additional materials', c.additional)}
          ${dd('Testing notes', c.testingNotes)}
        </dl>
        ${c.notes ? `<p class="pc-detail-notes"><strong>Counselor note:</strong> ${esc(c.notes)}</p>` : ''}
        <div class="pc-detail-actions">
          ${c.link ? `<a class="tool-btn secondary" href="${esc(c.link)}" target="_blank" rel="noopener">Admissions website ↗</a>` : ''}
          ${tracked
            ? `<span class="pc-added">On your App Tracker ✓ <a href="app-tracker.html">Open tracker</a></span>`
            : `<button type="button" class="tool-btn gold" data-act="track">Add to my App Tracker</button>`}
        </div>
      </div>`;
  }

  function render(){
    const ax = AXES[state.test];
    const list = filtered();
    document.getElementById('pc-axis').innerHTML = `
      <span>College</span>
      <span class="pc-ticks">${ax.ticks.map(t => `<span style="left:${pct(t, ax)}%">${t}</span>`).join('')}</span>
      <span style="text-align:right">${state.score ? 'Your score' : 'Testing'}</span>`;
    document.getElementById('pc-rows').innerHTML = list.length
      ? list.map(row).join('')
      : '<div class="pc-empty">No colleges match those filters. Try removing one.</div>';
    document.getElementById('pc-count').textContent = `Showing ${list.length} of ${POPULAR_COLLEGES.length} colleges · ${ax.label} middle 50% ranges`;

    document.querySelectorAll('.pc-row').forEach(el => {
      el.querySelector('.pc-row-main').addEventListener('click', () => {
        state.openName = state.openName === el.dataset.name ? null : el.dataset.name;
        render();
      });
      const t = el.querySelector('[data-act="track"]');
      if(t) t.addEventListener('click', () => {
        const d = trackerLoad();
        if(!trackerHasCollege(d, el.dataset.name)){
          d.colleges.push(trackerCollegeFromName(el.dataset.name));
          trackerSave(d);
        }
        render();
      });
    });
  }

  function chips(id, choices, set){
    const box = document.getElementById(id);
    box.innerHTML = choices.map(c => `<button type="button" class="chip" aria-pressed="false" data-v="${esc(c)}">${esc(c)}</button>`).join('');
    box.querySelectorAll('.chip').forEach(b => b.addEventListener('click', () => {
      set.has(b.dataset.v) ? set.delete(b.dataset.v) : set.add(b.dataset.v);
      b.setAttribute('aria-pressed', String(set.has(b.dataset.v)));
      render();
    }));
  }

  function init(){
    document.getElementById('pc-cycle').textContent = POPULAR_COLLEGES_CYCLE;
    chips('pc-policy', POLICY_CHOICES, state.policies);
    chips('pc-plans', PLAN_CHOICES, state.plans);

    document.getElementById('pc-search').addEventListener('input', e => { state.q = e.target.value; render(); });
    const score = document.getElementById('pc-score');
    score.addEventListener('input', e => { state.score = e.target.value; render(); });
    document.getElementById('pc-sort').addEventListener('change', e => { state.sort = e.target.value; render(); });
    document.querySelectorAll('#pc-test button').forEach(b => b.addEventListener('click', () => {
      state.test = b.dataset.test;
      document.querySelectorAll('#pc-test button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      const ax = AXES[state.test];
      score.placeholder = state.test === 'act' ? 'e.g., 27' : 'e.g., 1250';
      score.min = state.test === 'act' ? 1 : 400; score.max = state.test === 'act' ? 36 : 1600;
      document.getElementById('pc-score-label').textContent = `My ${ax.label} score (optional)`;
      state.score = ''; score.value = '';
      render();
    }));
    [['pc-stars','stars'],['pc-super','superscore']].forEach(([id, key]) => {
      const b = document.getElementById(id);
      b.addEventListener('click', () => { state[key] = !state[key]; b.setAttribute('aria-pressed', String(state[key])); render(); });
    });
    render();
  }
  init();
})();
