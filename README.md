# thesignara.com — site source

Static site for thesignara.com, deployed via Cloudflare Pages (git-connected).

## Structure

| Path | Serves |
|---|---|
| `index.html` | `/` — coming-soon homepage |
| `pulse.html` | `/pulse` — Pulse daily brief (see warning below) |
| `academy/ads-start/` | `/academy/ads-start/` — Ads program, 4 steps + title |
| `og-image.png`, `pulse-og.png`, `favicon.ico`, `apple-touch-icon.png` | binary assets — fetch with `./fetch-assets.sh` before first push |

Source reconstructed from the live site on 2026-07-12 (Cloudflare edge injections removed: email obfuscation, insights beacon).

## One-time setup

1. **Assets**: run `./fetch-assets.sh` (downloads the 4 binaries from the live site into the repo).
2. **GitHub**: create a private repo `signara-site`, then:
   ```
   git remote add origin git@github.com:<you>/signara-site.git
   git push -u origin main
   ```
3. **Cloudflare**: Dashboard → Workers & Pages → Create → Pages → **Connect to Git** → select the repo.
   Build settings: no framework, no build command, output directory `/`.
4. **Domain switch** (the old direct-upload project cannot be converted):
   - Wait for the first git deployment to succeed; verify it on the `*.pages.dev` preview URL.
   - Old Pages project → Custom domains → remove `thesignara.com` (and `www` if present).
   - New project → Custom domains → add `thesignara.com`. Propagation is near-instant since DNS stays on Cloudflare.
   - Keep the old project for a few days as rollback, then delete.

## Pulse

`/pulse` is served by a **Cloudflare Worker** on a zone route. Worker routes attach to the DNS zone, not the Pages project, so the domain switch does not affect it — Pulse keeps updating.

- `pulse.html` in this repo is a static snapshot (2026-07-12) kept only as a fallback; while the Worker route is active it is shadowed and never served.
- Before switching, confirm in the Worker's Triggers that it uses a zone route (e.g. `thesignara.com/pulse*`). If Pulse were instead a Pages Function inside the OLD project, it would die with it and must be ported into this repo's `functions/` directory first.

## Publishing from now on

Edit → commit → push. Every push to `main` deploys production; other branches get preview URLs.
