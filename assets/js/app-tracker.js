/* =========================================================================
   COLLEGE APPLICATION TRACKER
   Three tabs that mirror the Excel tracker: My Colleges, Essays, Activities.
   Saves automatically in this browser (see tracker-store.js).
   ========================================================================= */

(function(){
  const STATUSES = ['Researching', 'In progress', 'Submitted', 'Accepted', 'Deferred', 'Waitlisted', 'Denied'];
  const FITS = ['', 'Reach', 'Target', 'Likely'];
  const DEADLINE_TYPES = ['', 'Early Action', 'Early Decision', 'Early Decision II', 'Restrictive Early Action', 'Priority', 'Regular Decision', 'Rolling'];
  const TEST_PLANS = ['', 'Test optional (not sending)', 'Self-report scores', 'Send official scores', 'Not sure yet'];
  const PROGRESS = ['Not started', 'Started', 'Editing', 'Completed'];
  const CHECKS = [
    ['applied', 'Application submitted'],
    ['transcript', 'Transcript requested'],
    ['recs', 'Teacher recommendations requested'],
    ['scores', 'Test scores sent or self-reported'],
    ['srar', 'SRAR / SSAR / STARS completed'],
    ['aid', 'Financial aid forms submitted'],
    ['scholarships', 'Scholarship applications submitted']
  ];

  let data = trackerLoad();
  let tab = 'colleges';
  const open = new Set();
  const esc = s => escapeHtml(s == null ? '' : String(s));

  /* ---------- saving ---------- */
  let saveTimer = null;
  function save(){
    clearTimeout(saveTimer);
    setSaved('Saving…');
    saveTimer = setTimeout(()=>{
      setSaved(trackerSave(data) ? 'Saved ✓' : 'Could not save');
    }, 350);
  }
  function setSaved(t){ const el = document.getElementById('at-saved'); if(el) el.textContent = t; }

  /* ---------- helpers ---------- */
  function opts(list, value){
    return list.map(o => `<option value="${esc(o)}"${o === value ? ' selected' : ''}>${esc(o || 'Choose…')}</option>`).join('');
  }
  function fmtDate(iso){
    if(!iso) return '';
    const d = new Date(iso + 'T12:00:00');
    if(isNaN(d)) return iso;
    return d.toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'});
  }
  function daysUntil(iso){
    const d = new Date(iso + 'T12:00:00'); const now = new Date(); now.setHours(12,0,0,0);
    return Math.round((d - now) / 86400000);
  }
  function field(c, key, label, type, extra){
    const v = c[key] || '';
    let input;
    if(type === 'select') input = `<select class="tool-select" data-field="${key}">${opts(extra, v)}</select>`;
    else if(type === 'textarea') input = `<textarea class="tool-textarea" data-field="${key}" rows="2">${esc(v)}</textarea>`;
    else input = `<input class="tool-input" type="${type || 'text'}" data-field="${key}" value="${esc(v)}"${extra ? ` placeholder="${esc(extra)}"` : ''}>`;
    const wide = (type === 'textarea' || type === 'url') ? ' class="wide"' : '';
    return `<div${wide}><label class="tool-label">${esc(label)}</label>${input}</div>`;
  }

  /* ---------- summary ---------- */
  function renderSummary(){
    const el = document.getElementById('at-summary');
    if(!el) return;
    const cs = data.colleges;
    const submitted = cs.filter(c => ['Submitted','Accepted','Deferred','Waitlisted','Denied'].includes(c.status)).length;
    const accepted = cs.filter(c => c.status === 'Accepted').length;
    const upcoming = cs.filter(c => c.deadline && daysUntil(c.deadline) >= 0 && !(c.checks && c.checks.applied))
                       .sort((a,b) => a.deadline.localeCompare(b.deadline))[0];
    let next = 'None set';
    if(upcoming){
      const n = daysUntil(upcoming.deadline);
      next = `${esc(upcoming.name)} · ${fmtDate(upcoming.deadline)} (${n === 0 ? 'today' : n === 1 ? 'tomorrow' : n + ' days'})`;
    }
    el.innerHTML = `
      <div class="at-stat"><b>${cs.length}</b><span>Colleges on your list</span></div>
      <div class="at-stat"><b>${submitted}</b><span>Applications submitted</span></div>
      <div class="at-stat"><b>${accepted}</b><span>Acceptances</span></div>
      <div class="at-stat next"><b>${next}</b><span>Next deadline</span></div>`;
  }

  /* ---------- tabs ---------- */
  function renderTabs(){
    const t = document.getElementById('at-tabs');
    const items = [['colleges','My Colleges', data.colleges.length], ['essays','Essays', data.essays.length], ['activities','Activities', data.activities.length]];
    t.innerHTML = items.map(([k, label, n]) =>
      `<button type="button" role="tab" data-tab="${k}" aria-selected="${tab === k}">${label}<span class="count">${n}</span></button>`).join('');
    t.querySelectorAll('button').forEach(b => b.addEventListener('click', () => { tab = b.dataset.tab; render(); }));
  }

  /* ---------- colleges ---------- */
  function collegeSub(c){
    const bits = [];
    if(c.fit) bits.push(`<span>Fit: <b>${esc(c.fit)}</b></span>`);
    if(c.deadline) bits.push(`<span>${esc(c.deadlineType || 'Deadline')}: <b>${fmtDate(c.deadline)}</b></span>`);
    else if(c.deadlineNote) bits.push(`<span>${esc(c.deadlineNote)}</span>`);
    const done = CHECKS.filter(([k]) => c.checks && c.checks[k]).length;
    bits.push(`<span>Checklist: <b>${done}/${CHECKS.length}</b></span>`);
    return bits.join('');
  }

  function collegeCard(c){
    const isOpen = open.has(c.id);
    return `
    <article class="at-card" data-id="${c.id}" data-status="${esc(c.status)}">
      <div class="at-card-head">
        <input class="at-card-title" data-field="name" value="${esc(c.name)}" aria-label="College name">
        <select class="tool-select" data-field="status" aria-label="Status">${opts(STATUSES, c.status)}</select>
        <button type="button" class="at-toggle" data-act="toggle" aria-expanded="${isOpen}" aria-label="${isOpen ? 'Hide' : 'Show'} details">${isOpen ? '−' : '+'}</button>
      </div>
      <div class="at-card-sub">${collegeSub(c)}</div>
      <div class="at-card-body"${isOpen ? '' : ' hidden'}>
        <h3 class="at-group">Application</h3>
        <div class="at-grid">
          ${field(c,'major','Major','text','e.g., Engineering')}
          ${field(c,'fit','Fit','select',FITS)}
          ${field(c,'appType','Application type','text','Common App, Coalition, school app')}
          ${field(c,'deadlineType','Deadline type','select',DEADLINE_TYPES)}
          ${field(c,'deadline','My deadline','date')}
          ${field(c,'deadlineNote','Deadline details','text','Early/regular dates')}
        </div>
        <h3 class="at-group">Admissions profile</h3>
        <div class="at-grid">
          ${field(c,'gpa','Average GPA','text','e.g., 3.8–4.0')}
          ${field(c,'testRange','Middle 50% ACT/SAT','text','e.g., ACT 28–32')}
          ${field(c,'acceptance','Acceptance rate (overall, early)','text','e.g., 13%, 25% ED')}
        </div>
        <h3 class="at-group">Requirements</h3>
        <div class="at-grid">
          ${field(c,'srar','SRAR / SSAR / STARS required?','text','Yes / No')}
          ${field(c,'recs','Teacher recommendations? How many?','text','e.g., Yes, 1')}
          ${field(c,'transcript','Does Moeller send a transcript?','text','Yes / No')}
          ${field(c,'testingRequired','Standardized testing policy','text','Required, optional…')}
          ${field(c,'testPlan','My test reporting plan','select',TEST_PLANS)}
          ${field(c,'special','Special requirements for my major/program','textarea')}
        </div>
        <h3 class="at-group">Paying for college</h3>
        <div class="at-grid">
          ${field(c,'aidApps','Financial aid applications','text','FAFSA, CSS Profile')}
          ${field(c,'aidDeadlines','Financial aid deadlines','text')}
          ${field(c,'scholarships','School scholarships','text','Name + deadline')}
        </div>
        <h3 class="at-group">Checklist</h3>
        <div class="at-checks">
          ${CHECKS.map(([k, label]) => `<label><input type="checkbox" data-check="${k}"${c.checks && c.checks[k] ? ' checked' : ''}> ${esc(label)}</label>`).join('')}
        </div>
        <h3 class="at-group">Notes</h3>
        <div class="at-grid">
          ${field(c,'notes','Notes','textarea')}
          ${field(c,'link','Admissions website','url','https://')}
        </div>
        <div class="at-card-foot">
          ${c.link ? `<a href="${esc(c.link)}" target="_blank" rel="noopener">Open admissions website ↗</a>` : '<span></span>'}
          <button type="button" class="tool-btn danger small" data-act="delete">Remove college</button>
        </div>
      </div>
    </article>`;
  }

  function renderColleges(el){
    const names = (typeof POPULAR_COLLEGES !== 'undefined' ? POPULAR_COLLEGES : []).map(p => `<option value="${esc(p.name)}">`).join('');
    el.innerHTML = `
      <div class="at-summary" id="at-summary"></div>
      <div class="at-add">
        <div>
          <label class="tool-label" for="at-new">Add a college</label>
          <input class="tool-input" id="at-new" list="at-popular" placeholder="Start typing a college name…" autocomplete="off">
          <datalist id="at-popular">${names}</datalist>
        </div>
        <button type="button" class="tool-btn" id="at-add-btn">Add college</button>
      </div>
      <p class="at-add-hint">Pick a school from the Moeller Popular Colleges list to fill in test ranges, deadlines, and requirements automatically. Always double-check details on the college's website.</p>
      <div id="at-list">
        ${data.colleges.length ? data.colleges.map(collegeCard).join('') :
          `<div class="at-empty">No colleges yet. Add your first one above, or browse <a href="popular-colleges.html">Moeller Popular Colleges</a>.</div>`}
      </div>`;
    renderSummary();

    const input = document.getElementById('at-new');
    const add = () => {
      const name = input.value.trim();
      if(!name) { input.focus(); return; }
      if(trackerHasCollege(data, name)){ alert(name + ' is already on your list.'); return; }
      const c = trackerCollegeFromName(name);
      data.colleges.push(c);
      open.add(c.id);
      save(); render();
      const card = document.querySelector(`.at-card[data-id="${c.id}"]`);
      if(card) card.scrollIntoView({behavior:'smooth', block:'start'});
    };
    document.getElementById('at-add-btn').addEventListener('click', add);
    input.addEventListener('keydown', e => { if(e.key === 'Enter'){ e.preventDefault(); add(); } });

    el.querySelectorAll('.at-card').forEach(card => {
      const c = data.colleges.find(x => x.id === card.dataset.id);
      card.addEventListener('input', e => {
        const f = e.target.dataset.field;
        if(f){ c[f] = e.target.value; }
        const k = e.target.dataset.check;
        if(k){ c.checks = c.checks || {}; c.checks[k] = e.target.checked; }
        if(f === 'status') card.dataset.status = c.status;
        card.querySelector('.at-card-sub').innerHTML = collegeSub(c);
        renderSummary(); save();
      });
      card.addEventListener('change', e => { if(e.target.matches('select, input[type=date], input[type=checkbox]')) card.dispatchEvent(new Event('input')); });
      card.querySelector('[data-act="toggle"]').addEventListener('click', () => {
        open.has(c.id) ? open.delete(c.id) : open.add(c.id);
        const body = card.querySelector('.at-card-body');
        const btn = card.querySelector('[data-act="toggle"]');
        body.hidden = !open.has(c.id);
        btn.textContent = open.has(c.id) ? '−' : '+';
        btn.setAttribute('aria-expanded', String(open.has(c.id)));
      });
      card.querySelector('[data-act="delete"]').addEventListener('click', () => {
        if(!confirm(`Remove ${c.name} from your list? This can't be undone.`)) return;
        data.colleges = data.colleges.filter(x => x.id !== c.id);
        save(); render();
      });
    });
  }

  /* ---------- essays ---------- */
  function renderEssays(el){
    el.innerHTML = `
      <div class="at-section-head">
        <p>List every essay you need, including each college's supplemental prompts. Look for overlaps so one strong essay can cover several prompts.</p>
        <button type="button" class="tool-btn" id="at-add-essay">Add essay</button>
      </div>
      ${data.essays.map((e, i) => `
        <div class="at-row" data-id="${e.id}">
          <div class="at-row-head"><b>${esc(e.college || 'Essay ' + (i + 1))}</b>
            <button type="button" class="tool-btn danger small" data-act="delete">Remove</button></div>
          <div class="at-grid">
            ${field(e,'college','College','text')}
            ${field(e,'deadline','Deadline','date')}
            ${field(e,'platform','Application platform','text','Common App, school portal…')}
            ${field(e,'limit','Word limit','text','e.g., 650 words')}
            ${field(e,'progress','Progress','select',PROGRESS)}
            ${field(e,'prompt','Essay prompt','textarea')}
            ${field(e,'notes','Notes: overlaps, focus, themes to highlight','textarea')}
          </div>
        </div>`).join('') || '<div class="at-empty">No essays yet.</div>'}`;
    document.getElementById('at-add-essay').addEventListener('click', () => {
      data.essays.push({id: trackerUid(), college:'', deadline:'', platform:'', prompt:'', limit:'', progress:'Not started', notes:''});
      save(); render();
    });
    wireRows(el, 'essays', row => row.querySelector('.at-row-head b').textContent = row._item.college || 'Essay');
  }

  /* ---------- activities ---------- */
  function renderActivities(el){
    el.innerHTML = `
      <div class="at-section-head">
        <p>Common App allows up to 10 activities, each with a 150-character description. Lead with your role and impact.</p>
        <button type="button" class="tool-btn" id="at-add-act"${data.activities.length >= 10 ? ' disabled' : ''}>Add activity</button>
      </div>
      ${data.activities.map((a, i) => `
        <div class="at-row" data-id="${a.id}">
          <div class="at-row-head"><b>${esc(a.org || 'Activity ' + (i + 1))}</b>
            <button type="button" class="tool-btn danger small" data-act="delete">Remove</button></div>
          <div class="at-grid">
            ${field(a,'type','Type of activity','text','Athletics, Volunteer, Paid work…')}
            ${field(a,'org','Organization name','text','e.g., Varsity Swim')}
            ${field(a,'title','Title / position','text','e.g., Captain')}
            ${field(a,'grades','Grade(s) participated','text','e.g., 9, 10, 11')}
            ${field(a,'hours','Avg hours per week','number')}
            ${field(a,'weeks','Avg weeks per year','number')}
            <div class="wide"><label class="tool-label">Description (150 characters max)</label>
              <textarea class="tool-textarea" data-field="desc" rows="2" placeholder="Roles, responsibilities, accomplishments, notable events">${esc(a.desc)}</textarea>
              <div class="at-count" data-counter>${(a.desc || '').length} / 150</div></div>
          </div>
        </div>`).join('') || `<div class="at-empty">No activities yet. Example: <em>Varsity Tennis, Team Member, grades 9–11 — "Mentored younger players; managed team calendar; planned spirit days and team dinners."</em></div>`}`;
    const btn = document.getElementById('at-add-act');
    btn.addEventListener('click', () => {
      data.activities.push({id: trackerUid(), type:'', org:'', title:'', grades:'', hours:'', weeks:'', desc:''});
      save(); render();
    });
    wireRows(el, 'activities', row => {
      row.querySelector('.at-row-head b').textContent = row._item.org || 'Activity';
      const n = (row._item.desc || '').length;
      const ct = row.querySelector('[data-counter]');
      ct.textContent = `${n} / 150` + (n > 150 ? ` — ${n - 150} over` : '');
      ct.classList.toggle('over', n > 150);
    });
    el.querySelectorAll('[data-counter]').forEach(ct => {
      const n = parseInt(ct.textContent, 10);
      if(n > 150){ ct.classList.add('over'); ct.textContent += ` — ${n - 150} over`; }
    });
  }

  function wireRows(el, key, onChange){
    el.querySelectorAll('.at-row').forEach(row => {
      const item = data[key].find(x => x.id === row.dataset.id);
      row._item = item;
      const update = e => { const f = e.target.dataset.field; if(f){ item[f] = e.target.value; onChange(row); save(); } };
      row.addEventListener('input', update);
      row.addEventListener('change', update);
      row.querySelector('[data-act="delete"]').addEventListener('click', () => {
        if(!confirm('Remove this row?')) return;
        data[key] = data[key].filter(x => x.id !== item.id);
        save(); render();
      });
    });
  }

  /* ---------- main render ---------- */
  function render(){
    renderTabs();
    const el = document.getElementById('at-panel');
    if(tab === 'colleges') renderColleges(el);
    if(tab === 'essays') renderEssays(el);
    if(tab === 'activities') renderActivities(el);
  }

  /* ---------- download as Excel ---------- */
  function loadSheetJS(){
    if(window.XLSX) return Promise.resolve(window.XLSX);
    return new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
      s.onload = () => res(window.XLSX);
      s.onerror = rej;
      document.head.appendChild(s);
    });
  }
  function downloadBlob(blob, name){
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  async function exportExcel(){
    const btn = document.getElementById('at-export');
    btn.disabled = true; btn.textContent = 'Preparing…';
    try{
      const XLSX = await loadSheetJS();
      const wb = XLSX.utils.book_new();
      const apps = [['School','Status','Major','Average GPA','Middle 50% ACT/SAT','Fit: Reach, Target, Likely','Acceptance rate: Overall, Early','Type of Application','Deadline Type','My Deadline','Deadline Details','Do they require an SRAR/SSAR?','Do they require teacher letters of recommendation? How many?','Does my school need to send a transcript?','Do they require standardized testing?','Test Reporting Plan','Special Application Requirements for Major/Program','Financial Aid Applications','Financial Aid Deadlines','School Scholarships', ...CHECKS.map(c => c[1]),'Notes','Link']];
      data.colleges.forEach(c => apps.push([c.name,c.status,c.major,c.gpa,c.testRange,c.fit,c.acceptance,c.appType,c.deadlineType,c.deadline,c.deadlineNote,c.srar,c.recs,c.transcript,c.testingRequired,c.testPlan,c.special,c.aidApps,c.aidDeadlines,c.scholarships, ...CHECKS.map(([k]) => c.checks && c.checks[k] ? 'Yes' : ''), c.notes, c.link]));
      const essays = [['College Name','Deadline','Application Platform','Essay Prompt','Word Limit','Essay Progress','Notes']];
      data.essays.forEach(e => essays.push([e.college,e.deadline,e.platform,e.prompt,e.limit,e.progress,e.notes]));
      const acts = [['Type of Activity','Organization Name','Title/Position','Grade(s) Participated','Avg hours per week','Avg weeks per year','Description','Character Count (150 max)']];
      data.activities.forEach(a => acts.push([a.type,a.org,a.title,a.grades,a.hours,a.weeks,a.desc,(a.desc || '').length]));
      [['Application Tracker',apps],['Essay Tracker',essays],['Activities',acts]].forEach(([name, rows]) => {
        const ws = XLSX.utils.aoa_to_sheet(rows);
        ws['!cols'] = rows[0].map(() => ({wch: 22}));
        XLSX.utils.book_append_sheet(wb, ws, name);
      });
      XLSX.writeFile(wb, 'My-College-Application-Tracker.xlsx');
    }catch(err){
      alert('The Excel download needs an internet connection. Try again, or use Print instead.');
    }finally{
      btn.disabled = false; btn.textContent = 'Download as Excel';
    }
  }

  /* ---------- backup / restore ---------- */
  function backup(){
    downloadBlob(new Blob([JSON.stringify(data, null, 2)], {type:'application/json'}), 'my-app-tracker-backup.json');
  }
  function restore(file){
    const r = new FileReader();
    r.onload = () => {
      try{
        const d = JSON.parse(r.result);
        if(!Array.isArray(d.colleges)) throw new Error('bad file');
        if(!confirm('Replace everything in your tracker with this backup?')) return;
        data = {colleges: d.colleges, essays: d.essays || [], activities: d.activities || [], updated: d.updated};
        save(); render();
      }catch(e){ alert("That file isn't a tracker backup."); }
    };
    r.readAsText(file);
  }

  /* ---------- start ---------- */
  document.getElementById('at-export').addEventListener('click', exportExcel);
  document.getElementById('at-print').addEventListener('click', () => {
    document.querySelectorAll('.at-card-body').forEach(b => b.hidden = false);
    window.print();
  });
  document.getElementById('at-backup').addEventListener('click', backup);
  document.getElementById('at-restore').addEventListener('change', e => { if(e.target.files[0]) restore(e.target.files[0]); e.target.value = ''; });
  document.getElementById('at-clear').addEventListener('click', () => {
    if(!confirm('Erase your whole tracker from this browser? Download a backup first if you might want it later.')) return;
    data = trackerDefaults(); trackerSave(data); render();
  });
  if(data.updated) setSaved('Saved ✓');
  render();
})();
