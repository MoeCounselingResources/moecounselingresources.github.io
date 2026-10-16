# Flashcard Studio proxy (Cloudflare Worker)

The page never holds the Anthropic API key. It posts to this Worker, which holds the key as a secret.
This folder is not part of the published site's pages; nothing here runs on GitHub Pages.

## Deploy

1. Install and sign in: `npm i -g wrangler && wrangler login`
2. Make a working folder outside the repo, with `src/index.js` = `scripts/flashcard-proxy-worker.js`, and a `wrangler.toml`:

   ```toml
   name = "moeller-flashcard-proxy"
   main = "src/index.js"
   compatibility_date = "2025-01-01"

   # Optional but recommended: a real rate limiter (20 requests / 60 s per IP)
   [[unsafe.bindings]]
   name = "RATE_LIMITER"
   type = "ratelimit"
   namespace_id = "1001"
   simple = { limit = 20, period = 60 }
   ```
3. `wrangler secret put ANTHROPIC_API_KEY`
4. `wrangler deploy`, then paste the Worker URL into `api.url` in `assets/data/flashcard-studio.js`.
5. In the Anthropic console, set a monthly spend limit on that key.

## Local testing

`wrangler dev` with `ANTHROPIC_API_KEY=…` in `.dev.vars`; set `api.url` to `http://localhost:8787` (the Worker allows `http://localhost:8000` as an origin).

## What it enforces

Allowed origins, one allowed model, token and size caps per request type, one user message only, per-IP rate limit. It stores and logs nothing. No student login exists, so this is not authentication; the spend limit is the backstop.
