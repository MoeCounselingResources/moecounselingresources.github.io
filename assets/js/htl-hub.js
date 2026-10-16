/* =========================================================================
   HOW TO LEARN HUB — draws the visual hub: progress bar, "Which sentence sounds like you?" cards, the module cards in
   two groups, and the "See how they connect" mind map. Used only by how-to-learn.html.
   Wording and the module list: assets/data/how-to-learn.js · Evidence labels: assets/data/evidence.js · Look: assets/css/htl-hub.css
   Nothing here saves anything. The progress bar only READS the keys the tools already use (each module's "key" in the data file).
   ========================================================================= */
(function(){
  'use strict';
  window.HTL_HUB = function(D, H){
    const root = document.getElementById('htl-root');
    if(!root || !D || typeof EVIDENCE === 'undefined') return;
    const esc = H.esc, escA = H.escA, fmt = H.fmt, labelHtml = H.labelHtml;
    const byId = id => D.modules.find(m => m.id === id) || null;
    const href = m => (m && m.built && /^[\w.-]+\.html$/.test(m.file)) ? m.file : '#';

    /* simple inline icons, drawn in the current color */
    const ICON = {
      brain: '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 3 3 3 0 0 0 1 2.5A3 3 0 0 0 7 17a3 3 0 0 0 5 1V5a2 2 0 0 0-3-1z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 3 3 3 0 0 1-1 2.5A3 3 0 0 1 17 17a3 3 0 0 1-5 1"/>',
      myths: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"/>',
      retrieval: '<rect x="4" y="5" width="16" height="12" rx="2"/><path d="M8 21h8M9 10h6M9 13h4"/>',
      spacing: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M8 3v4M16 3v4M8 14h2M14 14h2"/>',
      interleaving: '<path d="M4 7h4l8 10h4M4 17h4l3-4M13 11l3-4h4"/><path d="M18 5l2 2-2 2M18 15l2 2-2 2"/>',
      mindset: '<path d="M4 19l6-6 3 3 7-8"/><path d="M15 8h5v5"/>',
      habits: '<path d="M20 12a8 8 0 1 1-3-6.2"/><path d="M20 4v4h-4M8.5 12.5l2.5 2.5 4.5-5"/>',
      focus: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 12h.01M12 2v3M12 19v3M2 12h3M19 12h3"/>',
      sleep: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
      executive: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 9l1.5 1.5L13 8M9 15h6M14 3v2"/>'
    };
    const svg = (id, size) => '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (ICON[id] || ICON.brain) + '</svg>';
    const clock = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';

    /* progress: the module pages record their own id in storage; the hub only reads that list (and clears it on request) */
    let blocked = false;
    const readVisited = () => {
      let raw = null;
      try{ raw = window.localStorage.getItem(D.visitedKey); }catch(e){ blocked = true; return 0; }   // only a storage error counts as "blocked"
      if(!raw || raw.length > 2000) return 0;
      try{
        const v = JSON.parse(raw);
        return Array.isArray(v) ? D.modules.filter(m => v.indexOf(m.id) > -1).length : 0;
      }catch(e){ return 0; }
    };
    const total = D.modules.length;
    const n0 = readVisited();
    const progressHtml = '<section class="hh-progress" aria-labelledby="hh-prog-h"><h2 class="hh-vh" id="hh-prog-h">' + esc(D.progressLabel) + '</h2>' +
      '<p class="hh-prog-text"><strong id="hh-prog-t">' + esc(fmt(D.progressText, { n: n0, total: total })) + '</strong></p>' +
      '<div class="hh-bar" id="hh-bar" role="progressbar" aria-valuemin="0" aria-valuemax="' + total + '" aria-valuenow="' + n0 + '" aria-valuetext="' + escA(fmt(D.progressText, { n: n0, total: total })) + '" aria-labelledby="hh-prog-h"><span style="width:' + (total ? n0 / total * 100 : 0) + '%"></span></div>' +
      '<p class="hh-note">' + esc(D.progressNote) + '</p>' +
      (blocked ? '<p class="hh-warn" role="status">' + esc(D.progressBlocked) + '</p>' : '') +
      '<p class="hh-prog-actions"><button type="button" class="hh-clear" id="hh-clear">' + esc(D.progressClear) + '</button> <span class="hh-note" id="hh-prog-s" role="status" aria-live="polite"></span></p></section>';

    /* troubleshooter: tappable cards that open the matching module in place */
    const troubleHtml = '<section class="hh-sec" id="trouble" aria-labelledby="hh-trouble-h"><h2 id="hh-trouble-h" class="hh-h2">' + esc(D.troubleTitle) + '</h2><p class="hh-lead">' + esc(D.troubleIntro) + '</p>' +
      '<ul class="hh-trouble">' + D.trouble.map((t, i) => {
        const m = byId(t.module);
        const body = m ? '<p class="hh-try"><strong>' + esc(D.troubleTry) + '</strong> ' + (m.built ? esc(D.moduleWord + ' ' + m.n + ': ' + m.title) : esc(D.moduleWord + ' ' + m.n + ': ' + m.title) + ' <span class="htl-soon">' + esc(D.troubleSoon) + '</span>') + '</p><p>' + esc(m.blurb) + '</p>' +
          (m.built ? '<a class="hh-go" href="' + escA(href(m)) + '" aria-label="' + escA(D.goLabel + ': ' + m.title) + '">' + esc(D.goLabel) + '</a>' : '') : '';
        return '<li class="hh-tc" data-i="' + i + '"><button type="button" class="hh-tbtn" aria-expanded="false" aria-controls="hh-tp-' + i + '"><span>' + esc(t.text) + '</span><span class="hh-chev" aria-hidden="true"></span></button>' +
          '<div class="hh-tpanel" id="hh-tp-' + i + '"><div class="hh-tinner"><div class="hh-tbody">' + body + '</div></div></div></li>';
      }).join('') + '</ul></section>';

    /* module cards in two groups */
    const card = m => {
      const ev = m.evidence.map(id => EVIDENCE[id] ? '<span class="hh-ev">' + labelHtml(EVIDENCE[id].label) + (m.evidence.length > 1 ? ' <span class="htl-topic">' + esc(EVIDENCE[id].topic) + '</span>' : '') + '</span>' : '').join('');
      return '<li class="hh-card' + (m.built ? '' : ' is-soon') + '"><div class="hh-block"><span class="hh-ico">' + svg(m.id, 34) + '</span><span class="hh-num" aria-hidden="true">' + m.n + '</span></div>' +
        '<div class="hh-cbody"><h3>' + esc(m.title) + '</h3><p>' + esc(m.blurb) + '</p><div class="hh-meta">' + ev + '<span class="hh-time">' + clock + esc(D.timeLabel) + '</span></div>' +
        (m.built ? '<a class="hh-start" href="' + escA(href(m)) + '" aria-label="' + escA(D.startLabel + ': ' + m.title) + '">' + esc(D.startLabel) + '</a>' : '<span class="htl-soon">' + esc(D.soonLabel) + '</span>') + '</div></li>';
    };
    const groupsHtml = D.groups.map(g => '<section class="hh-group" aria-labelledby="hh-g-' + escA(g.id) + '"><h2 class="hh-band" id="hh-g-' + escA(g.id) + '">' + esc(g.title) + '</h2>' +
      '<ol class="hh-grid">' + g.ids.map(id => byId(id)).filter(Boolean).map(card).join('') + '</ol></section>').join('');
    const modulesHtml = '<div id="modules">' + groupsHtml + '</div>';

    /* mind map: two layouts (phone / wide) drawn from the same data; decorative and supplementary */
    const node = (m, x, y, r, cls) => '<a href="' + escA(href(m)) + '" aria-label="' + escA(m.n + '. ' + m.title) + '"><g class="hh-node ' + cls + '"><circle class="hh-hit" cx="' + x + '" cy="' + y + '" r="' + (r + 8) + '"/><circle cx="' + x + '" cy="' + y + '" r="' + r + '"/><text x="' + x + '" y="' + (y + 5) + '" text-anchor="middle" class="hh-nt">' + esc(m.n) + '</text><text x="' + x + '" y="' + (y + r + 18) + '" text-anchor="middle" class="hh-nl">' + esc(m.short || m.title) + '</text></g></a>';
    const hub = (x, y, r, t) => '<g class="hh-hubnode"><circle cx="' + x + '" cy="' + y + '" r="' + r + '"/><text text-anchor="middle" class="hh-ht">' + t.split(' ').map((w, i, a) => '<tspan x="' + x + '" y="' + (y + 5 - (a.length - 1) * 8 + i * 16) + '">' + esc(w) + '</tspan>').join('') + '</text></g>';
    const line = (x1, y1, x2, y2) => '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"/>';
    const map = (w, h, cx, cy, hubs, cols) => {
      let lines = '', nodes = '';
      D.groups.forEach((g, gi) => {
        lines += line(cx, cy, hubs[gi][0], hubs[gi][1]);
        g.ids.forEach((id, i) => { const p = cols[gi][i]; lines += line(hubs[gi][0], hubs[gi][1], p[0], p[1]); });
      });
      D.groups.forEach((g, gi) => { g.ids.forEach((id, i) => { const p = cols[gi][i], m = byId(id); if(m) nodes += node(m, p[0], p[1], 30, 'g' + gi); }); });
      const hubsSvg = D.groups.map((g, gi) => hub(hubs[gi][0], hubs[gi][1], 44, g.title)).join('');
      return '<svg viewBox="0 0 ' + w + ' ' + h + '" role="group" aria-label="' + escA(D.mapLabel) + '" focusable="false"><g class="hh-lines" aria-hidden="true">' + lines + '</g>' + hubsSvg +
        '<g class="hh-centernode"><circle cx="' + cx + '" cy="' + cy + '" r="46"/><text text-anchor="middle" class="hh-ct">' + D.mapCenter.split(' ').map((wd, i, a) => '<tspan x="' + cx + '" y="' + (cy + 5 - (a.length - 1) * 9 + i * 18) + '">' + esc(wd) + '</tspan>').join('') + '</text></g>' + nodes + '</svg>';
    };
    const colP = (x, y0, step) => [0, 1, 2, 3, 4].map(i => [x, y0 + i * step]);
    const phone = map(360, 700, 180, 56, [[90, 168], [270, 168]], [colP(60, 270, 86), colP(300, 270, 86)]);
    const wide = map(900, 470, 450, 235, [[270, 235], [630, 235]], [colP(70, 50, 92), colP(830, 50, 92)]);
    const mapHtml = '<section class="hh-sec"><details class="hh-details" id="hh-map"><summary>' + esc(D.mapTitle) + '</summary><p class="hh-lead">' + esc(D.mapIntro) + '</p>' +
      '<div class="hh-map hh-map-phone">' + phone + '</div><div class="hh-map hh-map-wide">' + wide + '</div></details></section>';

    const tailHtml = '<section class="hh-sec"><p><a class="htl-biglink" href="how-to-learn-sources.html"><strong>' + esc(D.sourcesLink) + '</strong><span>' + esc(D.sourcesBlurb) + '</span></a></p>' +
      '<p class="htl-privacy">' + esc(D.privacy) + '</p><p class="htl-privacy">' + esc(D.counselor) + '</p></section>';

    root.innerHTML = progressHtml + troubleHtml + modulesHtml + mapHtml + tailHtml;

    /* the whole module card opens its module; the Start link stays the keyboard and screen-reader way in */
    root.querySelectorAll('.hh-card').forEach(c => c.addEventListener('click', e => {
      if(e.target.closest('a')) return;
      const a = c.querySelector('.hh-start'); if(a) a.click();
    }));

    /* clear my progress (the only thing on this page that writes: it removes the one list) */
    const clearBtn = document.getElementById('hh-clear');
    if(clearBtn) clearBtn.addEventListener('click', () => {
      let failed = false;
      try{ window.localStorage.removeItem(D.visitedKey); }catch(e){ failed = true; }
      const t = fmt(D.progressText, { n: 0, total: total });
      document.getElementById('hh-prog-t').textContent = t;
      const bar = document.getElementById('hh-bar'); bar.setAttribute('aria-valuenow', '0'); bar.setAttribute('aria-valuetext', t); bar.firstElementChild.style.width = '0%';
      document.getElementById('hh-prog-s').textContent = failed ? D.progressBlocked : D.progressCleared;
    });

    /* open / close a troubleshooter card (one at a time) */
    const cards = Array.from(root.querySelectorAll('.hh-tc'));
    cards.forEach(c => c.querySelector('.hh-tbtn').addEventListener('click', () => {
      const btn = c.querySelector('.hh-tbtn'), open = btn.getAttribute('aria-expanded') !== 'true';
      cards.forEach(o => { o.classList.remove('is-open'); o.querySelector('.hh-tbtn').setAttribute('aria-expanded', 'false'); });
      if(open){ c.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); }
    }));
  };
})();
