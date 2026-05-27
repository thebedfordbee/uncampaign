# Press Kit — Internal README

This folder is the campaign's press/media kit. It exists to let a reporter, academic, civic-tech writer, podcast host, or campaign-industry editor understand The UNCAMPAIGN in under 20 minutes — and to preserve evidence for later coverage and case-study/awards documentation.

Guiding principle, same as the rest of the site: **the campaign's behavior is the proof.** Lead with receipts, don't overclaim, and clearly separate what exists from what is recommended or still developing.

## What's in here

| File / folder | Purpose | Audience-facing? |
|---|---|---|
| `index.html` | The public press kit page. Route: `/press-kit/` | Yes |
| `fact-sheet.html` | Printable one-page fact sheet (print-to-PDF in the browser) | Yes |
| `fact-sheet.md` | Same fact sheet in Markdown (easy to paste/quote) | Yes |
| `quote-bank.md` | Quotes in Don's voice, labeled Published vs. Suggested-for-review | Yes |
| `coverage.md` | Tracker for real press hits. Currently: none logged | Internal mostly |
| `README.md` | This file | Internal |
| `evidence/` | Proof-asset folders, each with a README describing what to capture | Internal |

The deeper strategy document (outlet targeting, outreach sequencing) lives at `/docs/outreach-angle-audit.md`. That is **internal** — it is not linked from any public page and should not be promoted to reporters, because it contains outreach targeting strategy rather than press-facing material.

## What still needs to be captured

These are listed as `TODO` on the public page's Proof Assets section and detailed per-folder under `evidence/`:

- [ ] Dated, frozen spend-ledger snapshot (`evidence/spend-ledger/`)
- [ ] Short demo videos: Bedford Roundtable, Voter Report Card (`evidence/videos/`)
- [ ] Analytics top-line snapshot: GA4 + Microsoft Clarity (`evidence/analytics/`)
- [ ] Hi-res headshot + logo files (`evidence/screenshots/` or a dedicated brand folder)
- [ ] Quote cards / shareable images (`evidence/quotes/`)
- [ ] Build timeline export from Git (`evidence/build-history/`)
- [ ] Key page screenshots: footprint, AI prompts, speeches, voter tool (`evidence/screenshots/`, `evidence/prompts/`)

Do **not** fabricate any of these. If an asset doesn't exist yet, leave it marked TODO.

## How to update the spend figure

The current spend (**$13.12** at time of writing) is **not** stored in a single shared variable — it is hardcoded per page. The **Footprint Tracker (`/pages/footprint.html`, served at `/footprint`) is the source of truth.** When spend changes, update, in this order:

1. `/pages/footprint.html` — the canonical breakdown.
2. `index.html` (home) — the spend-compare module.
3. `/press-kit/index.html` — the Fast Facts row (and re-link, don't restate, where possible).
4. `/press-kit/fact-sheet.html` and `/press-kit/fact-sheet.md` — the spend-to-date lines.
5. `llms.txt` — the "Campaign Spending" line.

The press kit deliberately phrases spend as "$13.12 … live figure on the Footprint Tracker" and links out, to minimize the number of places that must change.

## How to update analytics

Analytics are already wired site-wide: **GA4** (`G-G7WVQR4MTH`) and **Microsoft Clarity** (`wis1l4ilnm`). To produce a shareable snapshot for press/awards: export a top-line view (sessions, top pages, and a Clarity heatmap if useful), redact nothing sensitive, save dated images into `evidence/analytics/`, and reference them — do not type unverified numbers into any public page.

## How to add press coverage later

When a real story runs:

1. Add a row to `coverage.md` (outlet, headline, author, date, link, angle).
2. Optionally save a screenshot into `evidence/coverage/`.
3. Only then consider surfacing a "Coverage" section on the public press kit page. Until a real hit exists, the page says coverage is not yet available — **never list speculative or pending coverage as if it ran.**

## How to preserve evidence for future awards / case studies

- Capture assets **as milestones happen**, not retroactively — dated screenshots are far more credible than reconstructions.
- Keep the Git history intact; it is itself a build-timeline artifact (`evidence/build-history/`).
- For each flagship tool, keep: a screenshot, a short screen recording, and a copy of the published prompt/methodology.
- Back up the `evidence/` set off-repo periodically (the repo is the working copy, not the archive of record).

## Content rules for anyone editing this kit

- No "first," "only," "revolutionary," or "unprecedented" unless it can be proven.
- No claiming press interest, academic interest, or awards viability as fact.
- No fabricated analytics, endorsements, screenshots, or contacts.
- Prefer grounded language: "available for review," "documented on the site," "published methodology."
- If a figure can't be safely verified in code, mark it `TODO` rather than guessing.
- Keep the tone calm, local, candid, useful, and restrained. Don't nationalize the race. Don't reference other local publications.
