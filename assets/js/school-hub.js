/* =========================================================================
   SCHOOL COUNSELING HUB — draws the colorful cards and the grade selector.
   Wording, links, grade tags, colors, and icons live in assets/data/hubs.js (HUBS.school.boxes).
   The student's grade saves on this device only, under "moeller-grade-pref".
   ========================================================================= */
(function(){
  const GRADES = [9, 10, 11, 12], KEY = 'moeller-grade-pref';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  /* only this site's own pages or https links; anything else becomes # (hrefs come from hubs.js) */
  const safeHref = u => /^(https:\/\/|[\w.\/-]+\.html(\?[\w=&.-]*)?$)/i.test(String(u)) ? u : '#';
  const extAttrs = u => /^https:/i.test(String(u)) ? ' target="_blank" rel="noopener noreferrer"' : '';
  const ACCENTS = { sky: 'sky', gold: 'gold', navy: 'navy' };
  /* simple inline icons (24x24, drawn with the current text color) */
  const ICONS = {
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    brain: '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 3 3 3 0 0 0 1 2.5A3 3 0 0 0 7 17a3 3 0 0 0 5 1V5a2 2 0 0 0-3-1z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 3 3 3 0 0 1-1 2.5A3 3 0 0 1 17 17a3 3 0 0 1-5 1"/>',
    map: '<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',
    calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2M12 12h2M16 12h0M8 16h2M12 16h2M16 16h0"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    people: '<circle cx="9" cy="8" r="3"/><path d="M3 19c0-3.3 2.7-5 6-5s6 1.7 6 5"/><circle cx="17" cy="9" r="2.4"/><path d="M17 14c2.6 0 4 1.4 4 4"/>',
    web: '<circle cx="6" cy="7" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="17" r="3"/><path d="M8 8.5l2.8 6.2M16.2 8.2l-3 6.6M8.5 7l7 -0.6"/>',
    home: '<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-6h4v6"/>'
  };
  const svg = n => '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[n] || ICONS.star) + '</svg>';

  const read = () => { try{ const v = localStorage.getItem(KEY); return /^(9|10|11|12)$/.test(v) ? parseInt(v, 10) : null; }catch(e){ return null; } };
  const write = g => { try{ if(g == null) localStorage.removeItem(KEY); else localStorage.setItem(KEY, String(g)); return true; }catch(e){ return false; } };

  window.renderSchoolHubCards = function(h){
    const host = document.getElementById('dashboard'); if(!host) return;
    const cards = h.boxes.map((b, i) => {
      const gr = (b.grades || GRADES).filter(g => GRADES.indexOf(g) > -1), acc = ACCENTS[b.accent] || 'sky';
      return '<li class="sh-card sh-' + acc + '" data-grades="' + gr.join(',') + '">' +
        '<div class="sh-icon">' + svg(b.icon) + '</div>' +
        '<div class="sh-body"><h3>' + esc(b.title) + '</h3><p>' + esc(b.desc) + '</p>' +
        '<div class="sh-tags"><span class="sh-vh">Best for grade' + (gr.length > 1 ? 's ' : ' ') + gr.join(', ') + '.</span>' +
        '<span class="sh-tags-cap" aria-hidden="true">Best for grades</span>' +
        GRADES.map(g => '<span class="sh-tag' + (gr.indexOf(g) > -1 ? ' on' : '') + '" data-g="' + g + '" aria-hidden="true">' + g + '</span>').join('') + '</div>' +
        '<span class="sh-fit" hidden></span>' +
        '<a class="sh-open" href="' + esc(safeHref(b.href)) + '"' + extAttrs(b.href) + ' aria-label="Open ' + esc(b.title) + '">Open</a></div></li>';
    }).join('');
    host.innerHTML =
      '<section class="sh-wrap" aria-labelledby="sh-h">' +
      '<div class="sh-picker"><h2 id="sh-h">What grade are you in?</h2>' +
      '<p class="sh-pick-help">Pick your grade to highlight what fits you. Everything stays open.</p>' +
      '<div class="sh-grades" role="group" aria-label="Choose your grade">' +
      GRADES.map(g => '<button type="button" class="sh-grade" data-g="' + g + '" aria-pressed="false">' + g + '<span class="sh-vh"> grade</span></button>').join('') +
      '<button type="button" class="sh-grade sh-all" data-g="" aria-pressed="true">All grades</button></div>' +
      '<p class="sh-status" id="sh-status" role="status" aria-live="polite"></p>' +
      '<p class="sh-warn" id="sh-warn" hidden>This browser is blocking saving, so your grade will not be remembered next time.</p>' +
      '<p class="sh-privacy">Your choice saves only on this device.</p></div>' +
      '<h2 class="sh-vh">Counseling tools and resources</h2><ul class="sh-grid">' + cards + '</ul></section>';

    const all = Array.from(host.querySelectorAll('.sh-card')), btns = Array.from(host.querySelectorAll('.sh-grade'));
    const status = host.querySelector('#sh-status'), warn = host.querySelector('#sh-warn');
    function apply(g, announce){
      btns.forEach(b => b.setAttribute('aria-pressed', String((b.dataset.g === '' && g == null) || (g != null && b.dataset.g === String(g)))));
      all.forEach(c => {
        const fits = g == null || c.dataset.grades.split(',').indexOf(String(g)) > -1;
        c.classList.toggle('is-dim', !fits);
        c.classList.toggle('is-fit', g != null && fits);
        const f = c.querySelector('.sh-fit');
        if(g != null && fits){ f.hidden = false; f.textContent = 'Fits grade ' + g; } else if(g != null){ f.hidden = false; f.textContent = 'Made for other grades. Open it anytime.'; } else { f.hidden = true; f.textContent = ''; }
        c.querySelectorAll('.sh-tag').forEach(t => t.classList.toggle('sel', g != null && t.dataset.g === String(g) && t.classList.contains('on')));
      });
      if(announce) status.textContent = g == null ? 'Showing all cards.' : 'Showing what fits grade ' + g + '. Faded cards still open.';
    }
    btns.forEach(b => b.addEventListener('click', () => {
      const g = b.dataset.g === '' ? null : parseInt(b.dataset.g, 10);
      const ok = write(g); warn.hidden = ok; apply(g, true);
    }));
    apply(read(), false);
  };
})();
