/* GPA Calculator. Course list: assets/data/courses.js. Usually no need to edit this file. */
(function(){
const HONOR_ROLL_URL = "honor-roll.html";
const track = n => calcTrack("gpa-"+n);

/* ---------- Grading scale ---------- */
const LEVELS = {
  CP2:{label:"CP2", bonus:0},
  L1:{label:"CP1 Level 1 (math)", bonus:0.1},
  CP1:{label:"CP1", bonus:0.2},
  H:{label:"Honors", bonus:0.5},
  HP:{label:"Honors Plus", bonus:0.5},
  AP:{label:"AP", bonus:1.0},
  CCP:{label:"CCP", bonus:1.0},
  PF:{label:"Pass / Fail", bonus:null}
};
const ALL_LEVELS = ["CP2","L1","CP1","H","HP","AP","CCP","PF"];
function uw(g){ if(g>=90) return 4; if(g>=80) return 3+(g-80)*0.1; if(g>=70) return 1+(g-70)*0.2; return 0; }
function cp2(g){ if(g>=96) return 4.3; if(g>=94) return 4.2; if(g>=92) return 4.1; return uw(g); }
function wt(g,level){ if(g<70) return 0; return cp2(g)+LEVELS[level].bonus; }
const r1 = x => Math.round(x*10)/10;
const trunc2 = x => Math.floor(x*100+1e-6)/100;
const fmt = x => (x==null||isNaN(x)) ? "–" : trunc2(x).toFixed(2);
const letter = g => g>=90?"A":g>=80?"B":g>=75?"C":g>=70?"D":"F";

/* ---------- Course catalog (2024-25 through 2026-27 curriculum guides) ---------- */
/* dept | name | levels | credits */
const RAW = MOELLER_COURSES;
const CATALOG = RAW.trim().split("\n").map((l,i)=>{const [dept,name,lv,cr]=l.split("|");return {id:i,dept,name,levels:lv.split(","),credits:+cr};});
const DEPTS = [...new Set(CATALOG.map(c=>c.dept))];
const byName = n => CATALOG.find(c=>c.name===n);

const YEARS = [
  {key:"9", name:"Freshman"},{key:"10", name:"Sophomore"},{key:"11", name:"Junior"},{key:"12", name:"Senior"}
];
const TYPICAL = {
  "9":["Religion I","English I","Algebra I","Biology","Spanish I","Health and Wellness","Oral Communications"],
  "10":["Religion II","English II","Geometry","Chemistry","U.S. History","Spanish II","Financial Literacy"],
  "11":["Religion III","English III","Algebra II and Trigonometry","World History","Spanish III","Anatomy and Physiology"],
  "12":["Religion IV: Spirituality","World Religions","English IV: Creative Writing","English IV: Contemporary Fiction","Pre-Calculus","Physics","U.S. Government and Politics"]
};

/* ---------- State ---------- */
const KEY = "moeller-gpa-v1";
let state = load();
let tab = state.tab || "9";
let uid = Date.now();
function load(){
  try{ const s = JSON.parse(localStorage.getItem(KEY)); if(s && s.years) return s; }catch(e){}
  return {years:{"9":[],"10":[],"11":[],"12":[]}, capstone:false, tab:"9"};
}
function save(){ state.tab = tab; try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){} }

function newRow(course){
  const c = course || null;
  return {id:"r"+(uid++), course:c?c.id:"", custom:"", level:c?defLevel(c):"CP1", credits:c?c.credits:1, grade:"", pf:"P"};
}
function defLevel(c){ return c.levels.includes("CP1") ? "CP1" : c.levels[0]; }
function courseOf(r){ return r.course===""||r.course==="custom" ? null : CATALOG[r.course]; }

/* ---------- Math ---------- */
function rowResult(r){
  if(r.level==="PF") return {counted:false, fail: r.pf==="F"};
  if(r.grade===""||r.grade==null) return {counted:false};
  let g = Number(r.grade);
  if(isNaN(g)||g<0||g>100) return {counted:false, invalid:true};
  g = Math.floor(g);
  return {counted:true, g, u:r1(uw(g)), w:r1(wt(g,r.level)), fail:g<70};
}
function summarize(rows){
  let cr=0,u=0,w=0,fails=0,earned=0;
  rows.forEach(r=>{
    const res=rowResult(r);
    if(res.fail) fails++;
    if(res.counted){ cr+=+r.credits; u+=res.u*r.credits; w+=res.w*r.credits; }
    if((res.counted && !res.fail) || (r.level==="PF" && r.pf==="P")) earned+=+r.credits;
  });
  return {credits:cr, earned, uw: cr?u/cr:null, w: cr?w/cr:null, fails, uPts:u, wPts:w};
}
function honorRoll(s){
  if(s.uw==null) return {t:"Enter grades to check honor roll", c:""};
  const u = trunc2(s.uw);
  if(s.fails) return {t:"Not eligible for honor roll", n:"A failed class removes honor roll eligibility.", c:"bad"};
  if(u>=3.8) return {t:"First Honors", n:"Unweighted 3.80 or higher, no failures.", c:"good"};
  if(u>=3.4) return {t:"Second Honors", n:"Unweighted 3.40–3.79, no failures.", c:"good"};
  return {t:"Not on honor roll yet", n:`Second Honors starts at 3.40 unweighted (you're ${(3.4-u).toFixed(2)} away).`, c:""};
}
const TIERS = [
  {name:"Summa Cum Laude with High Honors", min:4.5, cap:true},
  {name:"Summa Cum Laude", min:4.5},
  {name:"Magna Cum Laude", min:4.25},
  {name:"Cum Laude", min:4.0}
];
function latin(w){
  if(w==null) return null;
  const v = trunc2(w);
  for(const t of TIERS){ if(t.cap && !state.capstone) continue; if(v>=t.min) return t; }
  return null;
}

/* ---------- Render ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

function renderTabs(){
  const items = [...YEARS.map(y=>({key:y.key,name:y.name,sub:fmtTab(state.years[y.key])})), {key:"all",name:"Overall",sub:"Cumulative"}];
  $("#tabs").innerHTML = items.map(t=>`<button class="tab" role="tab" aria-selected="${t.key===tab}" data-tab="${t.key}">${t.name}<small>${t.sub}</small></button>`).join("");
}
function fmtTab(rows){ const s=summarize(rows); return s.w==null ? "No grades yet" : `${fmt(s.w)} weighted`; }

function courseOptions(r){
  let h = `<option value="">Choose a course…</option>`;
  for(const d of DEPTS){
    h += `<optgroup label="${esc(d)}">` + CATALOG.filter(c=>c.dept===d).map(c=>`<option value="${c.id}" ${String(r.course)===String(c.id)?"selected":""}>${esc(c.name)}</option>`).join("") + `</optgroup>`;
  }
  h += `<option value="custom" ${r.course==="custom"?"selected":""}>Another course (type it in)</option>`;
  return h;
}
function levelOptions(r){
  const c = courseOf(r);
  const offered = c ? c.levels : ALL_LEVELS;
  const rest = ALL_LEVELS.filter(l=>!offered.includes(l));
  let h = offered.map(l=>`<option value="${l}" ${r.level===l?"selected":""}>${LEVELS[l].label}</option>`).join("");
  if(c && rest.length) h += `<optgroup label="Other levels">${rest.map(l=>`<option value="${l}" ${r.level===l?"selected":""}>${LEVELS[l].label}</option>`).join("")}</optgroup>`;
  return h;
}
function creditOptions(r){
  return [0.25,0.5,1,1.5].map(v=>`<option value="${v}" ${+r.credits===v?"selected":""}>${v}</option>`).join("");
}
function rowHTML(r){
  const res = rowResult(r);
  const isPF = r.level==="PF";
  const gradeField = isPF
    ? `<div class="f"><label for="g-${r.id}">Result</label><select id="g-${r.id}" data-k="pf"><option value="P" ${r.pf==="P"?"selected":""}>Pass</option><option value="F" ${r.pf==="F"?"selected":""}>Fail</option></select></div>`
    : `<div class="f"><label for="g-${r.id}">Grade %</label><input class="grade" id="g-${r.id}" data-k="grade" type="number" inputmode="decimal" min="0" max="100" step="any" placeholder="—" value="${esc(r.grade)}"></div>`;
  const pts = isPF ? `<div class="pts"><b>—</b><span>not in GPA</span></div>`
    : res.counted ? `<div class="pts" title="Unweighted ${res.u.toFixed(1)}"><b>${res.w.toFixed(1)}</b><span>${letter(res.g)} · ${res.u.toFixed(1)}</span></div>`
    : `<div class="pts"><b>—</b><span>points</span></div>`;
  return `<div class="row lvl-${r.level} ${res.fail?"fail":""}" data-id="${r.id}">
    <div class="f course"><label for="c-${r.id}">Course</label><select id="c-${r.id}" data-k="course">${courseOptions(r)}</select>
      ${r.course==="custom"?`<input class="custom-name" data-k="custom" aria-label="Course name" placeholder="Course name" value="${esc(r.custom)}">`:""}</div>
    <div class="f level"><label for="l-${r.id}">Level</label><select id="l-${r.id}" data-k="level">${levelOptions(r)}</select></div>
    <div class="f"><label for="cr-${r.id}">Credits</label><select id="cr-${r.id}" data-k="credits">${creditOptions(r)}</select></div>
    ${gradeField}
    ${pts}
    <button class="del" data-del="${r.id}" aria-label="Remove this course" title="Remove">×</button>
  </div>`;
}

function renderYear(){
  const y = YEARS.find(y=>y.key===tab);
  const rows = state.years[tab];
  $("#panel").innerHTML = `
    <div class="panel-head"><h2>${y.name} year</h2></div>
    <p class="callout"><b>Use the final grades from your transcript.</b> Enter each course's final percentage exactly as it appears on your transcript. For a class you're still taking, you can enter your current grade, but the result is only an estimate until the final grade posts.</p>
    <div class="rows">${rows.length ? rows.map(rowHTML).join("") : `<div class="empty">No courses yet. Add them one at a time, or start from a typical ${y.name.toLowerCase()} schedule and adjust it.</div>`}</div>
    <div class="actions">
      <button class="btn" id="add">Add a course</button>
      ${rows.length ? "" : `<button class="btn ghost" id="typical">Start with a typical schedule</button>`}
      ${rows.length ? `<button class="btn ghost" id="clearYear">Clear ${y.name.toLowerCase()} year</button>` : ""}
    </div>
    ${howHTML()}`;
}

function renderOverall(){
  const per = YEARS.map(y=>({y, s:summarize(state.years[y.key])}));
  const all = summarize(YEARS.flatMap(y=>state.years[y.key]));
  const cur = latin(all.w);
  const v = all.w==null?null:trunc2(all.w);
  $("#panel").innerHTML = `
    <div class="panel-head"><h2>Overall</h2></div>
    <p class="callout"><b>Your cumulative GPA is only as accurate as the grades you enter.</b> Fill in each year with the final grades from your transcript. Cumulative GPA combines every graded course from all four years, weighted by credits.</p>
    <div class="tblwrap"><table class="years">
      <thead><tr><th>Year</th><th>Credits in GPA</th><th>Unweighted</th><th>Weighted</th></tr></thead>
      <tbody>${per.map(p=>`<tr><td>${p.y.name}</td><td>${p.s.credits||"–"}</td><td>${fmt(p.s.uw)}</td><td>${fmt(p.s.w)}</td></tr>`).join("")}</tbody>
      <tfoot><tr><td>Cumulative</td><td>${all.credits||"–"}</td><td>${fmt(all.uw)}</td><td>${fmt(all.w)}</td></tr></tfoot>
    </table></div>
    <h2 style="font-size:1.25rem;margin-top:26px">Latin Honors at graduation</h2>
    <p class="hint">Based on cumulative weighted GPA.</p>
    <div class="tiers">${TIERS.map(t=>{
      const on = cur && cur.name===t.name;
      let right = `${t.min.toFixed(2)}+${t.cap?" and Capstone":""}`;
      if(!on && v!=null && v<t.min) right = `${(t.min-v).toFixed(2)} to go`;
      return `<div class="tier ${on?"on":""}"><span>${t.name}</span><span>${right}</span></div>`;}).join("")}</div>
    <label class="check"><input type="checkbox" id="capstone" ${state.capstone?"checked":""}> I've completed the Chaminade Global Scholars Capstone</label>
    <div class="actions"><button class="btn ghost" id="clearAll">Clear all four years</button></div>
    ${howHTML()}`;
}

function howHTML(){
  const gs=[100,95,93,91,89,85,80,79,75,74,70,69];
  return `<details class="how"><summary>How this is calculated</summary>
  <p>Each grade is converted with Moeller's scale. Unweighted points use the 4.0 column for every course. Weighted points add a bonus for the course level: CP1 Level 1 math +0.1, CP1 +0.2, Honors +0.5, AP and CCP +1.0. Each course counts in proportion to its credits.</p>
  <div class="tblwrap"><table class="scale"><thead><tr><th>Grade</th><th>4.0</th><th>CP2</th><th>CP1 L1</th><th>CP1</th><th>Hon</th><th>AP/CCP</th></tr></thead><tbody>
  ${gs.map(g=>`<tr><td>${g}</td><td>${r1(uw(g)).toFixed(1)}</td>${["CP2","L1","CP1","H","AP"].map(l=>`<td>${r1(wt(g,l)).toFixed(1)}</td>`).join("")}</tr>`).join("")}
  </tbody></table></div>
  <ul>
    <li>Decimal grades are dropped to the whole number (89.7 counts as 89).</li>
    <li>Grades below 70 earn 0 points and still count toward the GPA.</li>
    <li>Pass/fail courses earn credit but don't count in the GPA.</li>
    <li>GPAs are cut off (not rounded) at two decimals, so 3.799 shows as 3.79.</li>
    <li>Honor roll is figured each quarter with unweighted grades. Use the <a href="${HONOR_ROLL_URL}">Honor Roll Calculator</a> for that.</li>
  </ul></details>`;
}

function renderReadout(){
  let rows, label;
  if(tab==="all"){ rows = YEARS.flatMap(y=>state.years[y.key]); label="Cumulative GPA"; }
  else { rows = state.years[tab]; label = YEARS.find(y=>y.key===tab).name+" year GPA"; }
  const s = summarize(rows);
  let status, note, cls="";
  if(tab==="all"){
    const t = latin(s.w);
    status = s.w==null ? "Enter grades to see Latin Honors" : t ? t.name : "Below Cum Laude (4.00)";
    note = "Latin Honors use cumulative weighted GPA.";
    cls = t ? "good" : "";
  } else {
    status = s.w==null ? "Enter grades to see your GPA" : `${s.credits} credits counted`; note = `Checking honor roll? It's figured each quarter. Use the <a href="${HONOR_ROLL_URL}">Honor Roll Calculator</a>.`; cls="";
  }
  $("#readout").innerHTML = `
    <div class="ro-head">${label}</div>
    <div class="nums">
      <div class="num"><b>${fmt(s.uw)}</b><span>Unweighted</span></div>
      <div class="num w"><b>${fmt(s.w)}</b><span>Weighted</span></div>
    </div>
    <div class="ro-body">
      <p class="status ${cls}">${status}</p>
      <p class="status-note">${note}</p>
      <dl>
        <dt>Credits counted in GPA</dt><dd>${s.credits}</dd>
        <dt>Credits earned</dt><dd>${s.earned}</dd>
        <dt>Failed classes</dt><dd class="${s.fails?"bad":""}">${s.fails}</dd>
      </dl>
    </div>`;
}

function render(){
  renderTabs();
  tab==="all" ? renderOverall() : renderYear();
  renderReadout();
}
function refreshLight(){ renderTabs(); renderReadout(); }

/* ---------- Events ---------- */
document.addEventListener("click", e=>{
  if(!e.target.closest(".calc")) return;
  const t = e.target.closest("[data-tab]");
  if(t){ tab=t.dataset.tab; if(tab==="all") track("viewed-overall"); save(); render(); return; }
  if(e.target.id==="add"){ track("added-course"); state.years[tab].push(newRow()); save(); render(); const s=document.querySelectorAll(".row select[data-k='course']"); s[s.length-1]?.focus(); return; }
  if(e.target.id==="typical"){ track("used-typical-schedule"); state.years[tab] = TYPICAL[tab].map(n=>newRow(byName(n))); save(); render(); return; }
  if(e.target.id==="clearYear"){ if(confirm("Remove every course from this year?")){ state.years[tab]=[]; save(); render(); } return; }
  if(e.target.id==="clearAll"){ if(confirm("Remove every course from all four years?")){ state.years={"9":[],"10":[],"11":[],"12":[]}; state.capstone=false; save(); render(); } return; }
  const d = e.target.closest("[data-del]");
  if(d){ state.years[tab] = state.years[tab].filter(r=>r.id!==d.dataset.del); save(); render(); }
});
document.addEventListener("change", e=>{
  if(!e.target.closest(".calc")) return;
  if(e.target.id==="capstone"){ state.capstone=e.target.checked; save(); render(); return; }
  const rowEl = e.target.closest(".row"); if(!rowEl) return;
  const r = state.years[tab].find(x=>x.id===rowEl.dataset.id); const k = e.target.dataset.k;
  if(k==="course"){
    r.course = e.target.value==="custom"||e.target.value==="" ? e.target.value : +e.target.value;
    const c = courseOf(r); if(c){ r.level=defLevel(c); r.credits=c.credits; }
    save(); render();
    if(r.course==="custom") document.querySelector(`.row[data-id="${r.id}"] .custom-name`)?.focus();
    else document.getElementById("g-"+r.id)?.focus();
    return;
  }
  if(k==="level"){ r.level=e.target.value; save(); render(); document.getElementById("l-"+r.id)?.focus(); return; }
  if(k==="credits"){ r.credits=+e.target.value; save(); render(); document.getElementById("cr-"+r.id)?.focus(); return; }
  if(k==="pf"){ r.pf=e.target.value; save(); render(); document.getElementById("g-"+r.id)?.focus(); return; }
  if(k==="custom"){ r.custom=e.target.value; save(); }
});
document.addEventListener("input", e=>{
  if(!e.target.closest(".calc")) return;
  if(e.target.dataset.k!=="grade") return;
  const rowEl = e.target.closest(".row");
  const r = state.years[tab].find(x=>x.id===rowEl.dataset.id);
  r.grade = e.target.value; save(); track("entered-grade");
  // update just this row's points + readout without losing focus
  const tmp = document.createElement("div"); tmp.innerHTML = rowHTML(r);
  const fresh = tmp.firstElementChild;
  rowEl.className = fresh.className;
  rowEl.querySelector(".pts").replaceWith(fresh.querySelector(".pts"));
  refreshLight();
});
document.getElementById("hrlink").href = HONOR_ROLL_URL;
render();
})();
