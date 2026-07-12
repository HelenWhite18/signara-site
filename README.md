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

## ⚠ Pulse

`/pulse` says "Today's brief is being compiled" and carries today's date — something regenerates it daily. If that automation deploys via direct upload / API to the OLD Pages project, it will stop updating the live site after the domain switch. It must instead commit `pulse.html` to this repo (a push auto-deploys). Resolve before switching the domain.

## Publishing from now on

Edit → commit → push. Every push to `main` deploys production; other branches get preview URLs.
