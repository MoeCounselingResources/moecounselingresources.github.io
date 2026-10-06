/* Honor Roll Calculator. Course list: assets/data/courses.js. Usually no need to edit this file. */
(function(){
const GPA_CALC_URL = "gpa-calculator.html";
const track = n => calcTrack("honor-roll-"+n);
/* ---------- Unweighted scale ---------- */
function uw(g){ if(g>=90) return 4; if(g>=80) return 3+(g-80)*0.1; if(g>=70) return 1+(g-70)*0.2; return 0; }
const r1 = x => Math.round(x*10)/10;
const trunc2 = x => Math.floor(x*100+1e-6)/100;
const fmt = x => x==null ? "–" : trunc2(x).toFixed(2);
const letter = g => g>=90?"A":g>=80?"B":g>=75?"C":g>=70?"D":"F";
const esc = s => String(s).replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

/* ---------- Courses (same list as the GPA Calculator) ---------- */
const RAW = MOELLER_COURSES;
const CATALOG = RAW.trim().split("\n").map((l,i)=>{const [dept,name,lv,cr]=l.split("|");return {id:i,dept,name,pf:lv==="PF",credits:+cr};});
const DEPTS = [...new Set(CATALOG.map(c=>c.dept))];
const QUARTERS = ["1","2","3","4"];

/* ---------- State ---------- */
const KEY="moeller-honor-roll-v1";
let state = load(); let tab = state.tab || "1"; let uid = Date.now();
function load(){ try{ const s=JSON.parse(localStorage.getItem(KEY)); if(s&&s.q) return s; }catch(e){} return {q:{"1":[],"2":[],"3":[],"4":[]}, tab:"1"}; }
function save(){ state.tab=tab; try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){} }
function newRow(c){ return {id:"r"+(uid++), course:c?c.id:"", custom:"", credits:c?c.credits:1, pf:c?c.pf:false, grade:"", result:"P"}; }

/* ---------- Math ---------- */
function rowRes(r){
  if(r.pf) return {counted:false, fail:r.result==="F"};
  if(r.grade===""||r.grade==null) return {counted:false};
  let g=Number(r.grade); if(isNaN(g)||g<0||g>100) return {counted:false};
  g=Math.floor(g); return {counted:true, g, u:r1(uw(g)), fail:g<70};
}
function summarize(rows){
  let cr=0,pts=0,fails=0,entered=0;
  rows.forEach(r=>{ const x=rowRes(r); if(x.fail) fails++; if(x.counted){ cr+=+r.credits; pts+=x.u*r.credits; entered++; } });
  return {cr, pts, fails, entered, gpa: cr?pts/cr:null, missing: rows.filter(r=>!r.pf && (r.grade===""||r.grade==null)).length};
}
function verdict(s){
  if(s.gpa==null) return {t:"Enter your grades", n:"Add your classes for this quarter and type in each grade.", c:""};
  const v=trunc2(s.gpa);
  if(s.fails) return {t:"Not eligible this quarter", n:"Honor roll requires no class failures. A grade below 70 or a failed pass/fail class rules it out.", c:"bad"};
  if(v>=3.8) return {t:"First Honors", n:"Unweighted GPA of 3.80–4.00 with no failures.", c:"good"};
  if(v>=3.4) return {t:"Second Honors", n:`Unweighted GPA of 3.40–3.79 with no failures. First Honors starts at 3.80 (${(3.8-v).toFixed(2)} away).`, c:"good"};
  return {t:"Not on honor roll", n:`Second Honors starts at a 3.40 unweighted GPA. You're ${(3.4-v).toFixed(2)} away.`, c:""};
}

/* ---------- Render ---------- */
const $=s=>document.querySelector(s);
function renderTabs(){
  $("#tabs").innerHTML = QUARTERS.map(q=>{ const s=summarize(state.q[q]); const v=verdict(s);
    const sub = s.gpa==null ? "No grades yet" : (s.fails ? fmt(s.gpa)+" · not eligible" : fmt(s.gpa)+(v.c==="good"?" · "+v.t:""));
    return `<button class="tab" role="tab" aria-selected="${q===tab}" data-tab="${q}">Quarter ${q}<small>${sub}</small></button>`;}).join("");
}
function courseOptions(r){
  let h=`<option value="">Choose a course…</option>`;
  for(const d of DEPTS) h+=`<optgroup label="${esc(d)}">`+CATALOG.filter(c=>c.dept===d).map(c=>`<option value="${c.id}" ${String(r.course)===String(c.id)?"selected":""}>${esc(c.name)}</option>`).join("")+`</optgroup>`;
  return h+`<option value="custom" ${r.course==="custom"?"selected":""}>Another course (type it in)</option>`;
}
function rowHTML(r){
  const x=rowRes(r);
  const grade = r.pf
    ? `<div class="f"><label for="g-${r.id}">Result</label><select id="g-${r.id}" data-k="result"><option value="P" ${r.result==="P"?"selected":""}>Pass</option><option value="F" ${r.result==="F"?"selected":""}>Fail</option></select></div>`
    : `<div class="f"><label for="g-${r.id}">Grade %</label><input class="grade" id="g-${r.id}" data-k="grade" type="number" inputmode="decimal" min="0" max="100" step="any" placeholder="—" value="${esc(r.grade)}"></div>`;
  const pts = r.pf ? `<div class="pts"><b>—</b><span>pass/fail</span></div>`
    : x.counted ? `<div class="pts"><b>${x.u.toFixed(1)}</b><span>${letter(x.g)}</span></div>` : `<div class="pts"><b>—</b><span>points</span></div>`;
  return `<div class="row ${x.fail?"fail":x.counted?"ok":""}" data-id="${r.id}">
    <div class="f course"><label for="c-${r.id}">Course</label><select id="c-${r.id}" data-k="course">${courseOptions(r)}</select>
      ${r.course==="custom"?`<input class="custom-name" data-k="custom" aria-label="Course name" placeholder="Course name" value="${esc(r.custom)}">`:""}</div>
    <div class="f"><label for="cr-${r.id}">Credits</label><select id="cr-${r.id}" data-k="credits">${[0.25,0.5,1,1.5].map(v=>`<option value="${v}" ${+r.credits===v?"selected":""}>${v}</option>`).join("")}</select></div>
    ${grade}${pts}
    <button class="del" data-del="${r.id}" aria-label="Remove this course" title="Remove">×</button></div>`;
}
function renderPanel(){
  const rows=state.q[tab]; const prev = QUARTERS.slice(0,QUARTERS.indexOf(tab)).reverse().find(q=>state.q[q].length);
  $("#panel").innerHTML = `<h2>Quarter ${tab}</h2>
    <p class="callout"><b>Use your quarter grades, not your semester or final grades.</b> Enter the grade for each class from this quarter's report card. For the quarter you're in now, enter your current grades to see where you're headed. Course level doesn't matter here: an A counts as 4.0 whether the class is CP, Honors, or AP.</p>
    <div class="rows">${rows.length?rows.map(rowHTML).join(""):`<div class="empty">No classes yet for Quarter ${tab}. ${prev?`Copy your classes from Quarter ${prev} and update the grades, or add them one at a time.`:"Add each class you're taking this quarter."}</div>`}</div>
    <div class="actions">
      <button class="btn" id="add">Add a class</button>
      ${!rows.length&&prev?`<button class="btn ghost" id="copy" data-from="${prev}">Copy classes from Quarter ${prev}</button>`:""}
      ${rows.length?`<button class="btn ghost" id="clearQ">Clear Quarter ${tab}</button>`:""}
    </div>
    <details class="how"><summary>How honor roll is figured</summary><ul>
      <li>First Honors: unweighted GPA of 3.80 to 4.00 with no class failures.</li>
      <li>Second Honors: unweighted GPA of 3.40 to 3.79 with no class failures.</li>
      <li>Unweighted points: 90–100 = 4.0; 89 = 3.9 down to 80 = 3.0; 79 = 2.8 down to 70 = 1.0 (0.2 per point); below 70 = 0 and counts as a failure.</li>
      <li>Each class counts in proportion to its credits. Pass/fail classes don't count toward the GPA, but failing one still rules out honor roll.</li>
      <li>Decimal grades drop to the whole number (89.7 counts as 89), and GPAs are cut off at two decimals, so 3.799 shows as 3.79.</li>
    </ul></details>`;
}
function renderReadout(){
  const s=summarize(state.q[tab]); const v=verdict(s);
  const lo=3.0, hi=4.0, pos=x=>((Math.min(hi,Math.max(lo,x))-lo)/(hi-lo)*100);
  $("#readout").innerHTML = `<div class="ro-head">Quarter ${tab} unweighted GPA</div>
    <div class="big"><b>${fmt(s.gpa)}</b><span>out of 4.00</span></div>
    <div class="meter" aria-hidden="true">
      <div class="track"><div class="zone second" style="left:${pos(3.4)}%;width:${pos(3.8)-pos(3.4)}%"></div><div class="zone first" style="left:${pos(3.8)}%;right:0"></div></div>
      ${s.gpa!=null?`<div class="marker" style="left:${pos(trunc2(s.gpa))}%"></div>`:""}
      <span class="tick" style="left:${pos(3.4)}%">3.40</span><span class="tick" style="left:${pos(3.8)}%">3.80</span>
    </div>
    <div class="ro-body"><p class="status ${v.c}">${v.t}</p><p class="note">${v.n}</p>
      <dl><dt>Classes with grades</dt><dd>${s.entered}</dd><dt>Still need a grade</dt><dd>${s.missing}</dd><dt>Failed classes</dt><dd class="${s.fails?"bad":""}">${s.fails}</dd></dl></div>`;
}
function render(){ renderTabs(); renderPanel(); renderReadout(); }

/* ---------- Events ---------- */
document.addEventListener("click",e=>{
  if(!e.target.closest(".calc")) return;
  const t=e.target.closest("[data-tab]"); if(t){ tab=t.dataset.tab; save(); render(); return; }
  if(e.target.id==="add"){ track("added-class"); state.q[tab].push(newRow()); save(); render(); const s=document.querySelectorAll(".row select[data-k='course']"); s[s.length-1]?.focus(); return; }
  if(e.target.id==="copy"){ track("copied-quarter"); state.q[tab]=state.q[e.target.dataset.from].map(r=>({...r,id:"r"+(uid++),grade:"",result:"P"})); save(); render(); return; }
  if(e.target.id==="clearQ"){ if(confirm(`Remove every class from Quarter ${tab}?`)){ state.q[tab]=[]; save(); render(); } return; }
  const d=e.target.closest("[data-del]"); if(d){ state.q[tab]=state.q[tab].filter(r=>r.id!==d.dataset.del); save(); render(); }
});
document.addEventListener("change",e=>{
  if(!e.target.closest(".calc")) return;
  const rowEl=e.target.closest(".row"); if(!rowEl) return;
  const r=state.q[tab].find(x=>x.id===rowEl.dataset.id); const k=e.target.dataset.k;
  if(k==="course"){ const v=e.target.value; r.course = v==="custom"||v===""?v:+v; const c=CATALOG[r.course];
    if(c&&typeof r.course==="number"){ r.credits=c.credits; r.pf=c.pf; } else { r.pf=false; }
    save(); render(); (r.course==="custom"?document.querySelector(`.row[data-id="${r.id}"] .custom-name`):document.getElementById("g-"+r.id))?.focus(); return; }
  if(k==="credits"){ r.credits=+e.target.value; save(); render(); document.getElementById("cr-"+r.id)?.focus(); return; }
  if(k==="result"){ r.result=e.target.value; save(); render(); document.getElementById("g-"+r.id)?.focus(); return; }
  if(k==="custom"){ r.custom=e.target.value; save(); }
});
document.addEventListener("input",e=>{
  if(!e.target.closest(".calc")) return;
  if(e.target.dataset.k!=="grade") return;
  const rowEl=e.target.closest(".row"); const r=state.q[tab].find(x=>x.id===rowEl.dataset.id);
  r.grade=e.target.value; save(); track("entered-grade");
  const tmp=document.createElement("div"); tmp.innerHTML=rowHTML(r); const fresh=tmp.firstElementChild;
  rowEl.className=fresh.className; rowEl.querySelector(".pts").replaceWith(fresh.querySelector(".pts"));
  renderTabs(); renderReadout();
});
document.getElementById("gpalink").href = GPA_CALC_URL;
render();
})();
