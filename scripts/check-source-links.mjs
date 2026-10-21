/* Checks every source link in assets/data/evidence.js and prints status, redirects and failures.
   Run from the repo root on a computer with internet access:  node scripts/check-source-links.mjs
   Needs Node 18 or newer. Nothing is changed; it only reports. Fix a failing link in evidence.js, or add a TODO comment next to it. */
import { readFileSync } from 'node:fs';
const src = readFileSync(new URL('../assets/data/evidence.js', import.meta.url), 'utf8');
const urls = [...src.matchAll(/url:\s*"([^"]+)"/g)].map(m => m[1]);
const ua = { 'User-Agent': 'Mozilla/5.0 (link check for Moeller counseling site)' };
async function check(u){
  for(const method of ['HEAD', 'GET']){
    try{
      const ctrl = new AbortController(), t = setTimeout(() => ctrl.abort(), 25000);
      const r = await fetch(u, { method, redirect: 'follow', headers: ua, signal: ctrl.signal }); clearTimeout(t);
      if(r.status < 400 || method === 'GET') return { status: r.status, final: r.url };
    }catch(e){ if(method === 'GET') return { status: 'ERR', final: String(e.message || e) }; }
  }
}
let bad = 0;
for(const [i, u] of urls.entries()){
  const r = await check(u), moved = typeof r.final === 'string' && r.final.replace(/\/$/, '') !== u.replace(/\/$/, '') && r.status !== 'ERR';
  const flag = r.status === 200 ? (moved ? 'REDIRECT' : 'ok') : 'FAIL';
  if(flag !== 'ok') bad++;
  console.log(`${String(i + 1).padStart(2)}  ${flag.padEnd(8)} ${r.status}  ${u}${moved ? '\n              -> ' + r.final : ''}`);
}
console.log(`\n${urls.length} links checked, ${bad} need a look.`);
