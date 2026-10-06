/* =========================================================================
   VISIT COUNTING for the calculators (optional, off by default).
   1. Sign up at https://www.goatcounter.com and pick a code, e.g. "moeller-counseling".
   2. Put that code between the quotes below and commit.
   No names or grades are ever sent: only page visits and a few button clicks.
   ========================================================================= */
const GOATCOUNTER_CODE = "";

(function(){
  if(!GOATCOUNTER_CODE) return;
  const s=document.createElement("script"); s.async=true; s.src="https://gc.zgo.at/count.js";
  s.dataset.goatcounter="https://"+GOATCOUNTER_CODE+".goatcounter.com/count";
  document.head.appendChild(s);
  document.addEventListener("DOMContentLoaded",()=>{
    const f=document.querySelector("footer .footer-inner");
    if(f) f.insertAdjacentHTML("beforeend"," This page counts visits anonymously. No names or grades are collected.");
  });
})();

/* Count an action at most once per visit, e.g. calcTrack("gpa-entered-grade") */
function calcTrack(name){
  if(!GOATCOUNTER_CODE) return;
  try{ if(sessionStorage.getItem("gc-"+name)) return; sessionStorage.setItem("gc-"+name,"1"); }catch(e){}
  let tries=0;
  (function send(){
    if(window.goatcounter && window.goatcounter.count){ window.goatcounter.count({path:name, title:name, event:true}); }
    else if(++tries<10){ setTimeout(send,500); }
  })();
}
