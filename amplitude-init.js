/* SIGNARA — Amplitude Analytics + Session Replay
   Client-side only. Loaded as an ES module on every page.

   No bundler, so the pinned unified SDK loads from esm.sh
   with its dependencies inlined (?bundle).

   Bump the SDK by changing VERSION below — nothing else.

   Why the URL is concatenated: Cloudflare's Email Address
   Obfuscation rewrites any package name joined to a version by
   "@" (it looks like an email address) and breaks the import.
   Keeping PKG, VERSION and "@" as separate pieces avoids that. */

const PKG     = '@amplitude/unified';
const VERSION = '1.1.21';
const SDK_URL = 'https://esm.sh/' + PKG + '@' + VERSION + '?bundle';

const amplitude = await import(SDK_URL);

// Guard against double-initialisation within a single page lifecycle.
if (!window.__SIGNARA_AMPLITUDE__) {
    window.__SIGNARA_AMPLITUDE__ = true;

  amplitude.initAll('58cd011712ac5c3d1b38dbe23c4f263f', {
        serverZone: 'EU',
        analytics: { autocapture: true },
        sessionReplay: { sampleRate: 1 }
  });
}
