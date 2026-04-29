/**
 * Cloudflare Pages Function — /result
 *
 * Returns a server-rendered HTML page with dynamic Open Graph metadata
 * for each Bedford Typing Challenge result. Score data is encoded in
 * URL query params so no backend lookup is required.
 *
 * URL format:
 *   /result?wpm=65&rank=3&town=Katonah
 *
 * Facebook reads og: tags from this page.
 * Twitter/X reads twitter: tags from this page.
 */

export async function onRequest(context) {
  const url  = new URL(context.request.url);
  const wpm  = Math.max(0, parseInt(url.searchParams.get('wpm')  || '0', 10));
  const rank = Math.max(1, parseInt(url.searchParams.get('rank') || '1', 10));
  const town = sanitizeTown(url.searchParams.get('town') || 'Bedford');

  // No valid score in params — redirect to the game
  if (!wpm) {
    return Response.redirect('https://www.donforbedford.com/pages/best-of-bedford.html', 302);
  }

  const canonicalUrl = `https://www.donforbedford.com/result?wpm=${wpm}&rank=${rank}&town=${encodeURIComponent(town)}`;
  const shareImage   = 'https://www.donforbedford.com/assets/img/og-image.png';
  const gameUrl      = 'https://www.donforbedford.com/pages/best-of-bedford.html';

  const ogTitle = `I typed ${wpm} WPM. #${rank} in ${town}.`;
  const ogDesc  = 'Think you can beat my score on the Bedford Typing Challenge?';

  const html = buildPage({ wpm, rank, town, canonicalUrl, shareImage, gameUrl, ogTitle, ogDesc });

  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
      'cache-control': 'public, max-age=3600',
      'x-robots-tag': 'noindex',
    },
  });
}

/* ── Helpers ─────────────────────────────────────────────── */

function sanitizeTown(raw) {
  // Allow only characters that appear in Bedford's hamlet names
  const cleaned = String(raw).replace(/[^a-zA-Z0-9 ',\-.]/g, '').slice(0, 60).trim();
  return cleaned || 'Bedford';
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildPage({ wpm, rank, town, canonicalUrl, shareImage, gameUrl, ogTitle, ogDesc }) {
  const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
  const rankDisplay = `${medal ? medal + ' ' : ''}#${rank} in ${esc(town)}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(ogTitle)} | Bedford Typing Challenge</title>
  <meta name="description" content="${esc(ogDesc)}">
  <meta name="robots" content="noindex">

  <!-- Open Graph — these are what Facebook reads for link previews -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${esc(canonicalUrl)}">
  <meta property="og:title" content="${esc(ogTitle)}">
  <meta property="og:description" content="${esc(ogDesc)}">
  <meta property="og:image" content="${esc(shareImage)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Don Scott for Bedford">

  <!-- Twitter/X Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(ogTitle)}">
  <meta name="twitter:description" content="${esc(ogDesc)}">
  <meta name="twitter:image" content="${esc(shareImage)}">

  <link rel="canonical" href="${esc(canonicalUrl)}">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <meta name="theme-color" content="#4A5240">

  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: #F8F5EF;
      color: #2B2B2B;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1.25rem;
      text-align: center;
    }

    .brand {
      font-size: 0.75rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #7B8C79;
      font-weight: 600;
      margin-bottom: 2.5rem;
    }
    .brand a { color: inherit; text-decoration: none; }

    .result-wpm {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: clamp(5rem, 20vw, 9rem);
      color: #3E5240;
      line-height: 1;
      display: block;
    }
    .result-wpm-label {
      font-size: 0.6875rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #7B8C79;
      display: block;
      margin-top: 0.375rem;
      margin-bottom: 1.5rem;
    }
    .result-rank {
      font-size: 1.125rem;
      color: #2B2B2B;
      margin-bottom: 2.5rem;
      line-height: 1.5;
    }
    .result-rank strong { color: #3E5240; }

    .cta {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: #3E5240;
      color: #fff;
      border-radius: 4px;
      padding: 0.75rem 1.625rem;
      font-size: 0.9375rem;
      font-weight: 600;
      text-decoration: none;
      transition: background 0.15s;
      border: none;
    }
    .cta:hover { background: #2B2B2B; color: #fff; }

    .disclosure {
      margin-top: 2rem;
      font-size: 0.8125rem;
      color: #6A655E;
    }
    .disclosure a { color: #3E5240; text-decoration: underline; text-underline-offset: 2px; }
  </style>
</head>
<body>
  <p class="brand">
    <a href="https://www.donforbedford.com/">Don Scott for Bedford</a>
  </p>

  <span class="result-wpm">${wpm}</span>
  <span class="result-wpm-label">Words per minute</span>

  <p class="result-rank">
    Ranked <strong>${rankDisplay}</strong><br>on the Bedford Typing Challenge.
  </p>

  <a href="${esc(gameUrl)}" class="cta">Can you beat this? Play now &rarr;</a>

  <p class="disclosure">
    <a href="${esc(gameUrl)}">Bedford Typing Challenge</a>
    &middot;
    <a href="https://www.donforbedford.com/pages/best-of-bedford.html">Best of Bedford</a>
    &middot;
    <a href="https://www.donforbedford.com/">Don Scott for Bedford</a>
  </p>
</body>
</html>`;
}
