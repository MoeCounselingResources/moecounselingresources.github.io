/* =========================================================================
   FLASHCARD STUDIO PROXY — a Cloudflare Worker. NOT served by the site; deploy it separately.
   It holds the Anthropic API key so the key never reaches a student's browser.

   Setup (once):
     1. npm i -g wrangler && wrangler login
     2. Make a folder with this file as src/index.js and a wrangler.toml (see scripts/README-flashcard-proxy.md)
     3. wrangler secret put ANTHROPIC_API_KEY
     4. wrangler deploy  → copy the https://….workers.dev URL into api.url in assets/data/flashcard-studio.js
     5. Set a monthly spend limit on the API key in the Anthropic console (the real backstop).
   Local test: wrangler dev (needs ANTHROPIC_API_KEY in .dev.vars), then api.url = http://localhost:8787

   What it accepts: POST {kind:'generate'|'check', model, max_tokens, system, messages:[{role:'user',content}]}
   What it returns: the Anthropic response body as is ({content:[{type:'text',text}]}).
   What it does NOT do: store, log, or forward anything but that request body. No student accounts exist,
   so there is no login; protection is origin check, model whitelist, size/token caps, and a rate limit.
   ========================================================================= */

const ALLOWED_ORIGINS = ['https://moecounselingresources.github.io', 'http://localhost:8000', 'http://127.0.0.1:8000'];
const ALLOWED_MODELS = ['claude-sonnet-4-6'];
const MAX_TOKENS = { generate: 2000, check: 150 };
const MAX_BODY_BYTES = 80000;          // notes are capped at 30,000 characters by the page
const MAX_SYSTEM_CHARS = 4000;
const MAX_USER_CHARS = { generate: 32000, check: 3000 };
const LIMIT_PER_MINUTE = 20;           // per IP, best effort when no rate-limit binding is set up

const hits = new Map();                // per-isolate fallback counter

function cors(origin){
  return { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400', 'Vary': 'Origin' };
}
function reply(status, body, origin){
  return new Response(JSON.stringify(body), { status: status, headers: Object.assign({ 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, origin ? cors(origin) : {}) });
}
async function limited(request, env){
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if(env.RATE_LIMITER && typeof env.RATE_LIMITER.limit === 'function'){          // Cloudflare rate-limit binding (preferred)
    const r = await env.RATE_LIMITER.limit({ key: ip }); return !r.success;
  }
  const now = Date.now(), win = hits.get(ip) || []; const recent = win.filter(t => now - t < 60000); recent.push(now); hits.set(ip, recent);
  if(hits.size > 5000) hits.clear();
  return recent.length > LIMIT_PER_MINUTE;
}

export default {
  async fetch(request, env){
    const origin = request.headers.get('Origin') || '';
    const okOrigin = ALLOWED_ORIGINS.indexOf(origin) > -1;
    if(request.method === 'OPTIONS') return okOrigin ? new Response(null, { status: 204, headers: cors(origin) }) : new Response(null, { status: 403 });
    if(request.method !== 'POST') return reply(405, { error: 'method' }, okOrigin ? origin : '');
    if(!okOrigin) return reply(403, { error: 'origin' }, '');
    if(!env.ANTHROPIC_API_KEY) return reply(500, { error: 'not configured' }, origin);
    if(await limited(request, env)) return reply(429, { error: 'slow down' }, origin);

    const len = parseInt(request.headers.get('Content-Length') || '0', 10);
    if(len > MAX_BODY_BYTES) return reply(413, { error: 'too large' }, origin);
    let raw; try{ raw = await request.text(); }catch(e){ return reply(400, { error: 'body' }, origin); }
    if(raw.length > MAX_BODY_BYTES) return reply(413, { error: 'too large' }, origin);
    let b; try{ b = JSON.parse(raw); }catch(e){ return reply(400, { error: 'json' }, origin); }

    const kind = b && b.kind;
    if(kind !== 'generate' && kind !== 'check') return reply(400, { error: 'kind' }, origin);
    if(ALLOWED_MODELS.indexOf(b.model) < 0) return reply(400, { error: 'model' }, origin);
    const maxTokens = Math.floor(Number(b.max_tokens));
    if(!(maxTokens > 0) || maxTokens > MAX_TOKENS[kind]) return reply(400, { error: 'max_tokens' }, origin);
    if(typeof b.system !== 'string' || b.system.length > MAX_SYSTEM_CHARS) return reply(400, { error: 'system' }, origin);
    const m = b.messages;
    if(!Array.isArray(m) || m.length !== 1 || !m[0] || m[0].role !== 'user' || typeof m[0].content !== 'string' || m[0].content.length > MAX_USER_CHARS[kind]) return reply(400, { error: 'messages' }, origin);

    let up;
    try{
      up = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ model: b.model, max_tokens: maxTokens, system: b.system, messages: [{ role: 'user', content: m[0].content }] })
      });
    }catch(e){ return reply(502, { error: 'upstream' }, origin); }
    if(!up.ok) return reply(up.status === 429 ? 429 : 502, { error: 'upstream' }, origin);   // never pass upstream error text to the browser
    const j = await up.json();
    return reply(200, { content: Array.isArray(j.content) ? j.content.filter(c => c.type === 'text').map(c => ({ type: 'text', text: c.text })) : [] }, origin);
  }
};
