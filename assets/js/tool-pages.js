/* =========================================================================
   TOOL PAGES — tiny shared helper for the gold progress bar under the hero (see assets/css/tool-pages.css).
   window.TP.progress(0-100) sets the bar. How to Learn module pages get a reading-progress bar automatically.
   Nothing here saves or sends anything.
   ========================================================================= */
(function(){
  'use strict';
  let bar = null;
  function ensure(){
    if(bar) return bar;
    const hero = document.querySelector('.hero');
    if(!hero) return null;
    const wrap = document.createElement('div');
    wrap.className = 'tp-progress';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML = '<span></span>';
    hero.insertAdjacentElement('afterend', wrap);
    bar = wrap.firstChild;
    return bar;
  }
  window.TP = {
    progress(pct){
      const b = ensure(); if(!b) return;
      b.style.width = Math.max(0, Math.min(100, pct)) + '%';
    },
    flash(el){
      if(!el) return;
      el.classList.remove('tp-flash');
      void el.offsetWidth;
      el.classList.add('tp-flash');
      setTimeout(() => el.classList.remove('tp-flash'), 600);
    }
  };
  if(document.body.dataset.htlPage === 'module'){
    const update = () => {
      const h = document.documentElement, max = h.scrollHeight - h.clientHeight;
      window.TP.progress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    update();
  }
})();
