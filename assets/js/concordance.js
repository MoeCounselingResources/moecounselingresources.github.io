/* =========================================================================
   ACT / SAT SCORE CONVERTER — loaded only by act-sat.html.
   A section in topics.js can list a widget:
     widget: {kind:"concordance", table:[[act, sat, satLow, satHigh], ...], ...}
   The table is the official 2018 ACT–SAT concordance (ACT composite -> SAT total).
   SAT -> ACT uses the SAT range each ACT score covers. All text and numbers live in
   topics.js; this file only draws and wires the converter.
   ========================================================================= */

const PW_REGISTRY = {};
let PW_COUNT = 0;
const pwEsc = s => escapeHtml(s == null ? '' : String(s));

function renderPageWidget(w){
  if(w.kind !== 'concordance') return '';
  const id = `pw${++PW_COUNT}`;
  PW_REGISTRY[id] = w;
  return `
  <div class="cw" data-pw-id="${id}">
    ${w.heading ? `<h3 class="cw-heading">${pwEsc(w.heading)}</h3>` : ''}
    ${w.intro ? `<p class="cw-intro">${pwEsc(w.intro)}</p>` : ''}
    <div class="cw-seg" role="group" aria-label="Which score do you have?">
      <button type="button" class="cw-mode" data-mode="act" aria-pressed="true">I have an ACT score</button>
      <button type="button" class="cw-mode" data-mode="sat" aria-pressed="false">I have an SAT score</button>
    </div>
    <label class="cw-label" for="${id}-in">ACT composite score</label>
    <input class="cw-input" id="${id}-in" type="number" inputmode="numeric" autocomplete="off">
    <div class="cw-result" aria-live="polite"></div>
    ${w.note ? `<p class="cw-note">${pwEsc(w.note)}</p>` : ''}
    ${w.link ? `<a class="cw-link" href="${pwEsc(w.link.url)}" target="_blank" rel="noopener">${pwEsc(w.link.text)} ↗</a>` : ''}
  </div>`;
}

function wirePageWidgets(){
  document.querySelectorAll('[data-pw-id]').forEach(el=>{
    if(el.dataset.pwWired) return; el.dataset.pwWired = '1';
    wireConcordance(el, PW_REGISTRY[el.dataset.pwId]);
  });
}

function wireConcordance(el, w){
  const rows = w.table.map(r => ({act:r[0], sat:r[1], lo:r[2], hi:r[3]}));   // highest ACT first
  const minAct = Math.min(...rows.map(r => r.act)), maxAct = Math.max(...rows.map(r => r.act));
  const minSat = Math.min(...rows.map(r => r.lo)), maxSat = Math.max(...rows.map(r => r.hi));
  const input = el.querySelector('.cw-input');
  const label = el.querySelector('.cw-label');
  const out = el.querySelector('.cw-result');
  const modes = el.querySelectorAll('.cw-mode');
  let mode = 'act';

  const prompt = txt => { out.className = 'cw-result is-empty'; out.innerHTML = `<p class="cw-msg">${pwEsc(txt)}</p>`; };
  const answer = (k, v, r) => { out.className = 'cw-result'; out.innerHTML = `<p class="cw-k">${pwEsc(k)}</p><p class="cw-v">${pwEsc(v)}</p><p class="cw-r">${pwEsc(r)}</p>`; };

  function update(){
    const raw = input.value.trim();
    if(!raw){ return prompt(mode === 'act' ? 'Enter an ACT composite score to see the SAT equivalent.' : 'Enter an SAT total score to see the ACT equivalent.'); }
    const n = Number(raw);
    if(!isFinite(n)) return prompt('Enter a number.');
    if(mode === 'act'){
      const act = Math.round(n);
      if(act > maxAct || act < 1) return prompt(`ACT composite scores run from 1 to ${maxAct}.`);
      if(act < minAct) return prompt(`The official table starts at an ACT composite of ${minAct}. Lower scores aren't covered.`);
      const r = rows.find(x => x.act === act);
      answer('Estimated SAT total', String(r.sat), `Likely range: ${r.lo}–${r.hi}`);
    } else {
      const sat = Math.round(n / 10) * 10;   // SAT totals come in steps of 10
      if(sat > 1600 || sat < 400) return prompt('SAT total scores run from 400 to 1600.');
      if(sat < minSat) return prompt(`The official table starts at an SAT total of ${minSat}. Lower scores aren't covered.`);
      const r = rows.find(x => sat >= x.lo && sat <= x.hi);
      if(!r) return prompt('That score falls between rows of the official table. Try a nearby score.');
      answer('Estimated ACT composite', String(r.act), `SAT ${r.lo}–${r.hi} matches an ACT composite of ${r.act}.`);
    }
  }

  modes.forEach(b => b.addEventListener('click', ()=>{
    mode = b.dataset.mode;
    modes.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    label.textContent = mode === 'act' ? 'ACT composite score' : 'SAT total score';
    input.min = mode === 'act' ? minAct : minSat; input.max = mode === 'act' ? maxAct : maxSat;
    input.placeholder = mode === 'act' ? 'e.g., 27' : 'e.g., 1280';
    input.value = '';
    update();
  }));
  input.placeholder = 'e.g., 27';
  input.addEventListener('input', update);
  update();
}
