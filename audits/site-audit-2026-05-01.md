# UNCAMPAIGN Website Audit — 2026-05-01

---

## Executive Summary

The site is in strong shape for a low-budget local campaign. The design is clean and consistent, the copy mostly earns its place, and the technical foundation is genuinely above average — real structured data, solid ARIA, a thoughtful accessibility posture, and a clean Cloudflare Pages deployment pipeline. The AI transparency angle is coherently executed throughout.

The audit found no catastrophic failures, but it did surface several meaningful gaps:

- **Two pages have broken canonical URLs** because their redirect rules are missing from `_redirects`. Sharing those URLs produces a 404.
- **The sitemap and canonical URLs are inconsistent** across roughly half the main pages — some declare the `.html` URL, some don't, and some conflict with what Cloudflare Pages actually serves.
- **Photo share pages have nonstandard OG image dimensions** (1080×1350 portrait), which crop awkwardly on Facebook, iMessage, and LinkedIn.
- **The footer is too sparse** for a site with this many features.
- **The main nav has no Don Bot link**, despite Don Bot being a flagship tool.
- **Apps Script integrations succeed silently** — no response-body checking means the "success" state can appear even when the server-side write fails.

Fixes are mostly small. The canonical/redirect issues are the highest urgency. Everything else is Medium or Low.

---

## Priority Fixes

### Critical

---

**C-01 — Missing `_redirects` entry for Scout pet page**
- **Location:** `_redirects`, `pages/best-of-bedford-cutest-pet-scout.html`
- **Why it matters:** The page exists and has a canonical of `https://www.donforbedford.com/best-of-bedford-cutest-pet-scout`, but there is no redirect rule in `_redirects` mapping that short URL to the actual file. Anyone sharing the canonical URL gets a 404.
- **Recommended fix:** Add to `_redirects`:
  ```
  /best-of-bedford-cutest-pet-scout /pages/best-of-bedford-cutest-pet-scout 301
  ```
  Also add the URL to `sitemap.xml`.
- **Effort:** Small
- **Pollie relevance:** Pet contest is a Pollie-eligible fun/engagement piece. A broken share URL undermines it.

---

**C-02 — Missing `_redirects` entry for Bedford How-To Guide**
- **Location:** `_redirects`, `pages/bedford-how-to-guide.html`
- **Why it matters:** The page canonical is `https://www.donforbedford.com/bedford-how-to-guide`, but there is no redirect rule. The page is also missing from `sitemap.xml`. Any external link to the canonical URL returns a 404. The page is only reachable via the relative link from Best-Of (`/pages/best-of-bedford.html`).
- **Recommended fix:** Add to `_redirects`:
  ```
  /bedford-how-to-guide /pages/bedford-how-to-guide 301
  ```
  Add to `sitemap.xml`. This page is a real civic utility tool — it should be crawlable and linkable.
- **Effort:** Small
- **Pollie relevance:** The How-To Guide is a strong civic-utility demonstration. It needs a working canonical URL to be citable.

---

### High

---

**H-01 — Canonical URL inconsistency (`.html` vs. clean) across main pages**
- **Location:** `pages/issues.html`, `pages/ideas.html`, `pages/don-bot.html`, `pages/ai.html`, `pages/odds.html`, `sitemap.xml`
- **Why it matters:** Cloudflare Pages automatically strips `.html` extensions and serves every file at its clean URL. So `pages/issues.html` is served at `/pages/issues`. But its canonical declares `/pages/issues.html`. This creates conflicting signals — the canonical says one URL but the served URL is different. Google may treat them as duplicates with ambiguous signals. Some pages correctly declare clean canonicals (`rules.html` → `/pages/rules`) while others don't, so the site sends mixed messages.
- **Recommended fix:** Standardize all canonicals to the clean (no `.html`) form. For `pages/`-prefixed pages:
  - `issues.html` → `/pages/issues`
  - `ideas.html` → `/pages/ideas`
  - `don-bot.html` → `/pages/don-bot`
  - `ai.html` → `/pages/ai`
  - `odds.html` → `/pages/odds`
  - `press.html` → `/pages/press`
  Then update `sitemap.xml` to match.
- **Effort:** Small (find/replace across ~8 files)
- **Pollie relevance:** Clean canonical strategy matters if anyone links to specific pages in press coverage.

---

**H-02 — Sitemap includes `/pages/rules.html` but the canonical says `/pages/rules`**
- **Location:** `sitemap.xml` line 18, `pages/rules.html` canonical
- **Why it matters:** This is a specific case of H-01 but inverted — the HTML canonical says `/pages/rules` (correct) while the sitemap declares `/pages/rules.html` (wrong). Googlebot will see a disagreement between canonical and sitemap.
- **Recommended fix:** Change the sitemap entry to `https://www.donforbedford.com/pages/rules`.
- **Effort:** Small

---

**H-03 — Photo share OG images are portrait (1080×1350), not landscape**
- **Location:** `photos/ribbon.html`, `photos/shake.html`, and all photo share pages
- **Why it matters:** Twitter `summary_large_image`, Facebook link preview, iMessage, and LinkedIn all expect 1200×630 (2:1 landscape). Sharing a portrait-format image into these contexts causes cropping, awkward letterboxing, or a fallback to generic. The photos are a shareable civic humor piece — the social preview is literally the point.
- **Recommended fix:** Create companion 1200×630 crop versions of each photo as `assets/img/social/[slug]-og.png` and use those for OG/Twitter tags while keeping the portrait versions for the page display image. Alternatively, add `og:image:type` and dimensions appropriate for a crop hint. At minimum, test how the current portrait images actually render when shared on Facebook, iMessage, and X.
- **Effort:** Medium (image crops + tag updates)
- **Pollie relevance:** Photo pages are a creative/humor Pollie category entry. Social preview quality matters.

---

**H-04 — `ai.html` OG image is non-standard dimensions (1536×1024)**
- **Location:** `pages/ai.html` head, lines 18–20
- **Why it matters:** The page uses `don-bot.png` (1536×1024) as its OG image. The platform standard for `summary_large_image` is 1200×630. At 1536×1024, platforms will crop or scale the image in unpredictable ways. The AI page is one of the most strategically shareable pages (Pollie documentation, press, civic interest) — it deserves a properly dimensioned share image.
- **Recommended fix:** Either use `og-image.png` (already 1200×630) or create a specific `og-image-ai.png` at 1200×630.
- **Effort:** Small

---

**H-05 — Main nav has no Don Bot link**
- **Location:** All pages, header nav
- **Why it matters:** Don Bot is a flagship interaction tool — the AI-powered Q&A is highlighted on the homepage and throughout the campaign philosophy. But it appears nowhere in the primary nav. Users who visit any page other than the homepage have no nav-level path to it. The homepage addresses this in a section CTA, but that's not visible from inner pages.
- **Recommended fix:** Add `Don Bot` to the primary nav as the 6th item, or replace the least-used nav item. Nav currently: Home | Rules | Issues | Ideas | Best-Of. Suggest: Home | Rules | Issues | Ideas | Best-Of | Ask Don (linking to don-bot). If nav space is tight on mobile, consider consolidating or using a "Tools" dropdown.
- **Effort:** Small (nav update across all pages — currently ~15 HTML files)

---

**H-06 — Footer nav has only one link ("AI Transparency")**
- **Location:** All pages, footer nav
- **Why it matters:** The footer is a missed navigation opportunity. It currently shows only "AI Transparency" under "Pages." On a site with 10+ substantive pages, the footer should function as a second-chance navigation layer — especially important for users who reach inner pages via social share and have no prior context about what the campaign site contains.
- **Recommended fix:** Add at minimum: Rules, Issues, Don Bot, Best-Of, Press to the footer Pages list. Consider a second footer column for the civic tools (Ideas, Roundtable, How-To Guide).
- **Effort:** Small (HTML update across all pages)
- **Pollie relevance:** A well-linked footer signals site completeness to judges reviewing the full site.

---

**H-07 — `press.html` is missing its `<title>` tag and `<link rel="canonical">`**
- **Location:** `pages/press.html`
- **Why it matters:** From the first 20 lines read, `press.html` has no visible `<title>` tag (only OG tags) and no canonical link. If the page genuinely has no `<title>`, the browser tab will show a blank title. Google may generate its own title from page content, which is often suboptimal. The press page is the most likely page to earn inbound links — it needs a proper title and canonical.
- **Recommended fix:** Verify the page has a `<title>` tag and `<link rel="canonical">`. If missing, add:
  ```html
  <title>Press | Don Scott for Bedford Town Supervisor</title>
  <link rel="canonical" href="https://www.donforbedford.com/pages/press">
  ```
- **Effort:** Small

---

### Medium

---

**M-01 — `Content-Signal` directive in `robots.txt` is not a real robots.txt directive**
- **Location:** `robots.txt` lines 7–8
- **Why it matters:** `Content-Signal: search=yes, ai-input=yes, ai-train=no` is not part of the Robots Exclusion Protocol and will be silently ignored by all crawlers. It won't do anything. The actual AI training restrictions must be implemented through recognized standards (`User-agent: CCBot / Disallow: /` etc., which the file already does correctly below this line).
- **Recommended fix:** Move this line into a comment or remove it. The meaningful blocking is already accomplished by the `User-agent: CCBot`, `User-agent: Bytespider`, and `User-agent: meta-externalagent` blocks.
- **Effort:** Small

---

**M-02 — `/podcasts` is in sitemap but nav link is commented out**
- **Location:** `sitemap.xml` line 34, all HTML files (nav comment)
- **Why it matters:** A sitemap URL that users cannot navigate to via normal site navigation sends conflicting signals. If the podcasts page isn't ready or isn't live, it shouldn't be in the sitemap. If it is live, the nav link should be uncommented.
- **Recommended fix:** Either (a) uncomment the Podcast nav link if the page is live and useful, or (b) remove the `/podcasts` entry from `sitemap.xml` until the page is ready.
- **Effort:** Small

---

**M-03 — `<!-- TODO: -->` comment left in cutest pet page source**
- **Location:** `pages/best-of-bedford-cutest-pet.html` line 18
- **Why it matters:** `<!-- TODO: Replace with page-specific cutest-pet-og.png (1200x630) based on the dogshow hero visual -->` is visible in view-source. Not a functional issue, but it looks unpolished if a developer or journalist inspects the source.
- **Recommended fix:** Either do the task (create a page-specific OG image) or remove the comment. Creating the image is worthwhile — the cutest pet page is highly shareable and deserves a distinctive social preview.
- **Effort:** Small (remove comment) / Medium (create and deploy image)

---

**M-04 — `og:site_name` inconsistency on photo share pages**
- **Location:** `photos/ribbon.html` and other photo share pages, `og:site_name`
- **Why it matters:** Most pages declare `og:site_name` as `"Don Scott for Bedford"`. Photo pages (at minimum `ribbon.html`) declare `"Don for Bedford"` — missing "Scott." Social platforms display this in link previews. Inconsistency looks like an oversight.
- **Recommended fix:** Standardize `og:site_name` to `"Don Scott for Bedford"` across all photo share pages.
- **Effort:** Small

---

**M-05 — Photo share pages missing `max-image-preview:large`**
- **Location:** `photos/ribbon.html` (and likely all photo share pages)
- **Why it matters:** All main pages include `meta name="robots" content="index, follow, max-image-preview:large"`. Photo pages have `content="index, follow"` without the `max-image-preview` directive. This may cause Google to show a smaller preview thumbnail instead of the full image in search results.
- **Recommended fix:** Add `max-image-preview:large` to the robots meta on all photo share pages.
- **Effort:** Small

---

**M-06 — Voter Report Card uses a different Apps Script endpoint**
- **Location:** `pages/best-of-bedford-voter-report-card.html` line 1064
- **Why it matters:** Every other integration uses the shared endpoint `AKfycbwjYjib02...`. The Voter Report Card uses a different script: `AKfycbywHW-nW2z...`. This may be intentional (voter lookup has different data architecture), but if that second script is ever rotated or deprecated, this integration will silently fail while the others keep working.
- **Recommended fix:** Document why this script is different. If it can be consolidated into the main script handler with a different `action` key, do so. If not, note it clearly in a comment so future maintainers understand the two-script architecture.
- **Effort:** Small (documentation) / Medium (consolidation)

---

**M-07 — Apps Script success handling is optimistic (no response-body check)**
- **Location:** `assets/js/chat-modal.js` lines 178–195, `assets/js/site.js` (subscribe), `pages/ideas.html` (ideas voting), all other Apps Script integrations
- **Why it matters:** All form submissions use `.then(function() { showStep('ok') })` without checking whether the Google Apps Script response indicates success or failure. Apps Script returns HTTP 200 even for internal errors, with the error described in the response body. The current code will show "Thanks" to the user even if the server-side write failed. This means silent data loss is possible without any user notification.
- **Recommended fix:** Parse the response JSON and check for a `"result": "success"` field before showing the confirmation state. Show an error if the response indicates failure.
- **Effort:** Medium (update all form handlers)

---

**M-08 — Chat modal error message says "email Don directly" with no email address**
- **Location:** `assets/js/chat-modal.js` line 198, `assets/js/site.js` line 466
- **Why it matters:** The error fallback reads: `"Something went wrong. Please try again, or email Don directly."` There is no email address linked. A user who hits this error has no way to follow the instruction. This is a dead end.
- **Recommended fix:** Replace with a specific email address or a link to the contact section. E.g.: `"Something went wrong. Please try again or email don@donforbedford.com directly."`
- **Effort:** Small

---

**M-09 — Rule card headings use `<h2>` when section heading is also `<h2>`**
- **Location:** `pages/rules.html` lines 321–628
- **Why it matters:** The section heading "Ten Deliberate Choices" is `<h2>`. Each of the 10 rule cards also uses `<h2>` for its title (e.g. `<h2 class="rule-card__title">Rule 01: No Signs</h2>`). This creates 11 `<h2>` tags on one page with no hierarchy. Screen reader users navigating by headings will encounter a flat list of `<h2>` items without the structural context that `<h3>` would provide.
- **Recommended fix:** Change rule card titles to `<h3>`. The section heading `<h2>` is the section parent; each rule is a child topic.
- **Effort:** Small

---

**M-10 — Sitemap includes `/pages/odds.html` but page has not been added to nav**
- **Location:** `sitemap.xml`, all nav HTML
- **Why it matters:** The Election Day speeches page (`pages/odds.html`) is in the sitemap but is linked from only one place: Rule 10's "Do this instead" CTA. It's one of the most interesting/shareable pages on the site — pre-written win and loss speeches. It deserves wider discovery. Consider adding it to the footer or a "More" nav section.
- **Recommended fix:** Add to footer nav. Consider a "Read the Script" callout somewhere visible. It's a great Pollie showcase piece.
- **Effort:** Small

---

**M-11 — `bedford-how-to-guide` is not in sitemap.xml**
- **Location:** `sitemap.xml`
- **Why it matters:** The Bedford How-To Guide is a useful, linkable civic tool but it is absent from the sitemap. Googlebot will only find it by crawling from the Best-Of page. A dedicated sitemap entry improves crawl frequency and priority.
- **Recommended fix:** Add `https://www.donforbedford.com/bedford-how-to-guide` to `sitemap.xml`.
- **Effort:** Small

---

**M-12 — `best-of-bedford-cutest-pet-scout` is not in sitemap.xml**
- **Location:** `sitemap.xml`
- **Why it matters:** The Scout pet card exists, has a canonical, and is presumably live — but is invisible to search engines. Also blocked by the missing redirect (C-01 above).
- **Recommended fix:** After fixing the redirect (C-01), add `https://www.donforbedford.com/best-of-bedford-cutest-pet-scout` to sitemap. Update `lastmod` to current date.
- **Effort:** Small

---

**M-13 — `functions/result.js` redirects to `/pages/best-of-bedford.html` (not canonical URL)**
- **Location:** `functions/result.js` line 24 and line 28
- **Why it matters:** The Cloudflare Function for typing challenge result sharing uses `https://www.donforbedford.com/pages/best-of-bedford.html` as both the fallback redirect and the game link. The canonical for that page is `https://www.donforbedford.com/best-of-bedford`. Using the `.html` URL in server-rendered HTML is inconsistent with the canonical strategy.
- **Recommended fix:** Update both references in `functions/result.js` to use `https://www.donforbedford.com/best-of-bedford`.
- **Effort:** Small

---

### Low

---

**L-01 — No `llms.txt` file**
- **Location:** Site root
- **Why it matters:** `llms.txt` is a convention (modeled on `robots.txt`) that gives large language models structured context about a site's purpose, content, and preferences. For a campaign that is explicitly AI-forward and wants to demonstrate civic usefulness to AI systems, having an `llms.txt` is on-brand and potentially distinctive. It is already referenced implicitly in the `robots.txt` philosophy.
- **Recommended fix:** Create `/llms.txt` with a concise plain-text summary of what the campaign is, who Don Scott is, what Bedford Town Supervisor does, the campaign philosophy, and links to key pages. This is also great for the Pollie Awards documentation.
- **Effort:** Small

---

**L-02 — Subscribe modal headline is generic ("Sign Up")**
- **Location:** `assets/js/site.js` line 245
- **Why it matters:** "Sign Up" is the most generic possible headline for an email subscription. The campaign's entire brand is about being specific, candid, and non-generic. The form body says "Occasional notes from Don — Bedford updates, campaign experiments, and useful things." That copy is much better and should set the tone.
- **Recommended fix:** Change headline to something more on-brand, e.g. `"Stay in the Loop"` or `"Get Occasional Updates"` or `"Follow Along"`.
- **Effort:** Small

---

**L-03 — Subscribe success message slightly weak**
- **Location:** `assets/js/site.js` line 354
- **Why it matters:** "Thanks for keeping an eye on this very abnormal campaign." is dry humor but "very abnormal" feels both dismissive and hedging at the same time. The campaign's confident restraint is usually tighter than this.
- **Recommended fix:** Consider: `"You're on the list. Occasional updates, nothing more."` or just `"Thanks. You're on the list."` The fine print below already says "No fundraising. No spam. Unsubscribe anytime." — let that do the reassurance work.
- **Effort:** Small

---

**L-04 — Homepage "Confused? Ask Don." section heading is slightly off-brand**
- **Location:** `index.html` line 639
- **Why it matters:** "Confused?" implies the site is hard to understand, which is the opposite of what the campaign wants to suggest. The site is intentionally calm and accessible.
- **Recommended fix:** Alternatives: `"Have a Question?"` / `"Want to Ask Something?"` / `"Common Questions"`. The eyebrow already says "Common Questions" — the h2 could simply be `"Ask Don"` or `"Two Ways to Get an Answer"`.
- **Effort:** Small

---

**L-05 — "Do this instead" label is redundant inside the rule card CTA panel**
- **Location:** `pages/rules.html`, each rule card `.rule-card__cta-label`
- **Why it matters:** Each rule card toggle says "Do this instead" to expand, and then the expanded panel has a `<p class="rule-card__cta-label">Do this instead</p>` header above the CTA heading. That label repeats what the toggle button just said. The CTA heading (`<h3>`) already provides context.
- **Recommended fix:** Remove the `<p class="rule-card__cta-label">Do this instead</p>` line from each rule card CTA. The toggle label is sufficient.
- **Effort:** Small

---

**L-06 — Title tag format is inconsistent across pages**
- **Location:** All `<title>` tags
- **Why it matters:** The site uses both `|` and `—` as separators, and some pages say "Don for Bedford" while others say "Don Scott for Bedford." Google uses title tags in search snippets and browser tabs.

  Current pattern audit:
  | Page | Title |
  |---|---|
  | Homepage | `The Uncampaign — Don Scott for Bedford Town Supervisor` |
  | Rules | `The Rulebook \| Don for Bedford` |
  | Issues | `The Bedford Roundtable \| Don Scott for Bedford Town Supervisor` |
  | Ideas | `100+ Ideas for Bedford — Don Scott for Bedford Town Supervisor` |
  | Don Bot | `Ask Don \| Don Bot for Bedford Town Supervisor` |
  | AI | `How We Use AI \| Don Scott for Bedford Town Supervisor` |
  | Best-Of | `Best of Bedford \| Interactive Civic Projects for Bedford \| Don Scott` |
  | Links | `Don Scott — Links \| For Bedford` |
  | Photos | `Photos from the Uncampaign \| Don for Bedford` |

  Issues: Mixed separators. "Don for Bedford" missing "Scott" on several pages. Best-Of title has two pipes (looks like three fields, which is unusual). Links title structure is awkward.

- **Recommended fix:** Standardize to `[Page Title] | Don Scott for Bedford` pattern. Example: `The Rulebook | Don Scott for Bedford`. The homepage can keep its longer form as the brand statement. Reserve `—` for subtitles only.
- **Effort:** Small

---

**L-07 — `homepage-audit-report.md` is untracked in root**
- **Location:** Git working tree (git status shows `?? homepage-audit-report.md`)
- **Why it matters:** A previous audit file is sitting untracked in the root directory. It's either stale work that should be committed to `/audits/` or deleted. It should not live in the repo root untracked.
- **Recommended fix:** Either move and commit to `/audits/` or delete it. Once this new audit is committed, the old one can be discarded.
- **Effort:** Small

---

**L-08 — Best-Of card `bob-series-card__status` badges not visible — cards appear without Live/Coming Soon status pill**
- **Location:** `pages/best-of-bedford.html`, card markup
- **Why it matters:** The CSS defines `.bob-series-card__status--live` and `.bob-series-card__status--coming` classes for status badges, but scanning the HTML, the status badge elements appear absent from the card markup (cards go straight from thumbnail to title/desc). This means users can't easily tell at a glance which entries are live vs. coming soon. All cards currently appear live (no "Coming Soon" chips visible), which may be accurate, but worth confirming. If any are still in development, a "Coming Soon" pill should be added.
- **Recommended fix:** Confirm status for each Best-Of card. Add `<span class="bob-series-card__status bob-series-card__status--live">Live</span>` or `--coming` accordingly.
- **Effort:** Small

---

## Page Inventory

All publicly accessible pages, routes, and shareable URL states identified:

| URL | File | Type | Status |
|---|---|---|---|
| `/` | `index.html` | Homepage | ✓ Live |
| `/links` | `links.html` | Linktree hub | ✓ Live |
| `/pages/rules` | `pages/rules.html` | Main page | ✓ Live |
| `/pages/issues` | `pages/issues.html` | Main page | ✓ Live (canonical incorrect — see H-01) |
| `/pages/ideas` | `pages/ideas.html` | Main page | ✓ Live (canonical incorrect — see H-01) |
| `/pages/don-bot` | `pages/don-bot.html` | Main page | ✓ Live (canonical incorrect — see H-01) |
| `/pages/ai` | `pages/ai.html` | Main page | ✓ Live (canonical incorrect — see H-01) |
| `/pages/odds` | `pages/odds.html` | Speeches page | ✓ Live (canonical incorrect — see H-01) |
| `/pages/press` | `pages/press.html` | Press kit | ✓ Live (missing title/canonical — see H-07) |
| `/photos` | `pages/photos.html` → via 301 | Photo gallery | ✓ Live |
| `/best-of-bedford` | `pages/best-of-bedford.html` → via 301 | Series hub | ✓ Live |
| `/best-of-bedford-fastest-typist` | `pages/best-of-bedford-fastest-typist.html` → via 301 | Game | ✓ Live |
| `/best-of-bedford-cutest-pet` | `pages/best-of-bedford-cutest-pet.html` → via 301 | Pet contest | ✓ Live |
| `/best-of-bedford-cutest-pet-bo` | via 301 | Pet card | ✓ Live |
| `/best-of-bedford-cutest-pet-gosa` | via 301 | Pet card | ✓ Live |
| `/best-of-bedford-cutest-pet-pj` | via 301 | Pet card | ✓ Live |
| `/best-of-bedford-cutest-pet-ugly` | via 301 | Pet card | ✓ Live |
| `/best-of-bedford-cutest-pet-scout` | `pages/best-of-bedford-cutest-pet-scout.html` | Pet card | ⚠️ Broken canonical (C-01) |
| `/best-of-bedford-voter-report-card` | via 301 | Civic tool | ✓ Live |
| `/best-of-bedford-community-picks` | via 200 rewrite | Survey | ✓ Live |
| `/best-of-bedford-code-red` | via 200 rewrite | Trivia game | ✓ Live |
| `/bedford-how-to-guide` | `pages/bedford-how-to-guide.html` | Civic tool | ⚠️ Broken canonical (C-02) |
| `/podcasts` | `pages/podcasts.html` | Podcast archive | ⚠️ In sitemap, nav commented out (M-02) |
| `/result` | `functions/result.js` | Typing result share | ✓ Live (Cloudflare Function) |
| `/photos/ribbon` | `photos/ribbon.html` | Photo share | ✓ Live |
| `/photos/shake` | `photos/shake.html` | Photo share | ✓ Live |
| `/photos/baby` | `photos/baby.html` | Photo share | ✓ Live |
| `/photos/coffee` | `photos/coffee.html` | Photo share | ✓ Live |
| `/photos/podium` | `photos/podium.html` | Photo share | ✓ Live |
| `/photos/garbage` | `photos/garbage.html` | Photo share | ✓ Live |
| `/photos/group` | `photos/group.html` | Photo share | ✓ Live |
| `/photos/crossing` | `photos/crossing.html` | Photo share | ✓ Live |
| `/photos/map` | `photos/map.html` | Photo share | ✓ Live |
| `/photos/road` | `photos/road.html` | Photo share | ✓ Live |
| `/photos/porch` | `photos/porch.html` | Photo share | ✓ Live |
| `/photos/dog` | `photos/dog.html` | Photo share | ✓ Live |
| `/pages/issues/leaf-blower-ban` | `pages/issues/leaf-blower-ban.html` | Issue deep-dive | ✓ Live |
| `/pages/issues/roads-infrastructure` | `pages/issues/roads-infrastructure.html` | Issue deep-dive | ✓ Live |
| `/pages/issues/bedford-hills` | `pages/issues/bedford-hills.html` | Issue deep-dive | ✓ Live |
| `/pages/issues/battery-storage` | `pages/issues/battery-storage.html` | Issue deep-dive | ✓ Live |
| `/pages/issues/cell-service` | `pages/issues/cell-service.html` | Issue deep-dive | ✓ Live |
| `/pages/issues/energy-costs` | `pages/issues/energy-costs.html` | Issue deep-dive | ✓ Live |
| `/pages/issues/growth-character` | `pages/issues/growth-character.html` | Issue deep-dive | ✓ Live |
| `/pages/issues/consultants` | `pages/issues/consultants.html` | Issue deep-dive | ✓ Live |
| `/pages/issues/advocacy-government` | `pages/issues/advocacy-government.html` | Issue deep-dive | ✓ Live |
| `/admin` | `admin/index.html` | Admin dashboard | Internal only |

**Modals / Interactive overlays:**
- Subscribe modal (injected by `site.js` — appears on all pages via `[data-subscribe-trigger]`)
- Chat request modal (present on `index.html`, `pages/rules.html`)
- Hero image lightbox (present on all pages with `.issues-hero__visual`)
- Ideas submit modal (`pages/ideas.html`)
- Ideas matchup voting module (`pages/ideas.html`)

**Shareable URL states:**
- `/result?wpm=X&rank=X&town=X` — Typing challenge result share page (Cloudflare Function)
- `/pages/best-of-bedford-cutest-pet-bo.html`, etc. — Pet-specific share pages with individual OG images
- All photo share pages (`/photos/ribbon`, etc.)
- `?ask=real-don` query param on any page opens the chat request modal (auto-open behavior in `chat-modal.js`)

---

## Social Sharing Audit

**Overall:** The site has a strong social sharing foundation — `og:type`, `og:url`, `og:title`, `og:description`, `og:image` with width/height, `og:image:alt`, `og:site_name`, `og:locale`, and full Twitter card tags are present on every main page. The photo share pages have properly distinct images per page (excellent). Pet-specific pages have pet-specific OG images. The Cloudflare Function for typing results generates server-side OG tags dynamically.

**Issues found:**

1. **Photo OG images are portrait (1080×1350)** — See H-03. These will be cropped by Facebook and iMessage, which expect 1200×630.

2. **`ai.html` OG image is non-standard 1536×1024** — See H-04.

3. **`og:image:secure_url` is missing from photo share pages** — Main pages all include `<meta property="og:image:secure_url">` as a duplicate of `og:image` (for legacy Facebook https enforcement). Photo pages appear to omit it. Minor, but inconsistent.

4. **`og:site_name` says "Don for Bedford" on some photo pages** — See M-04.

5. **Cutest pet page OG image is the generic `og-image.png`** — A TODO comment acknowledges this (see M-03). The cutest pet page shares with the same image as the homepage, missing an opportunity for a distinctive, more viral share image.

6. **Voter Report Card, Best-Of, and Code Red all use the generic `og-image.png`** — These high-engagement tools share with the same generic image. Page-specific share images would meaningfully increase clickthrough on social.

7. **The typing result share page (`/result`) uses the generic `og-image.png`** — The result page is the most share-optimized piece of infrastructure on the site (individual scores, ranks, hamlets), but it uses the same generic OG image. A page-specific result card image (even a simple score-display design) would significantly improve share performance.

8. **`og:type` is `website` on most pages** — Most individual article/tool pages would benefit from `og:type: "article"` or `og:type: "website"` but this is a minor signal.

**What's working well:**
- Each photo share page has a unique, page-specific image — excellent
- Each pet share page has a unique pet image — excellent
- OG image dimensions (1200×630) are correct for all main pages
- `og:image:alt` is present everywhere — good accessibility
- Twitter cards are set to `summary_large_image` consistently

---

## SEO / LLM Discoverability Audit

**Overall:** The SEO foundation is genuinely strong for this category of site. Structured data (JSON-LD) is present on every page with `WebSite`, `WebPage`, `Person`, and `BreadcrumbList` nodes. The `FAQPage` schema on Don Bot is particularly valuable. `robots.txt` correctly references the sitemap. Google Analytics and Microsoft Clarity are in place.

**Issues found:**

1. **Canonical strategy is inconsistent** — See H-01 and H-02. Some pages declare `.html` canonicals on a platform that strips extensions. Resolves the duplicate content risk.

2. **Sitemap has mixed URL formats** — Some entries are clean URLs (no `.html`), others include `.html`. The sitemap should be the authoritative record of preferred URLs — it should match canonicals exactly.

3. **`/bedford-how-to-guide` not in sitemap** — See M-11. This is a substantive civic-utility page that should be indexed.

4. **`/best-of-bedford-cutest-pet-scout` not in sitemap** — See M-12.

5. **Rule card `<h2>` hierarchy problem** — See M-09. Affects heading structure for semantic HTML.

6. **No `llms.txt`** — See L-01. Strong on-brand opportunity.

7. **Internal linking is thin for cross-page navigation** — Most pages navigate to each other only through the nav bar. Body copy rarely links between pages. Google uses internal link signals to understand site architecture. The Bedford How-To Guide, Don Bot, and Ideas page could each usefully link to each other with contextual in-text links.

8. **`pages/press.html` has no `<title>` or canonical visible** — See H-07. Could hurt press page indexing and snippet quality.

9. **No `rel="prev"` / `rel="next"` pagination signals** — Not applicable (no paginated content).

**What's working well:**
- `WebSite` + `Person` schema with `sameAs` social links established a clear entity for Don Scott across all pages
- `BreadcrumbList` schema on every page
- `FAQPage` schema on Don Bot (one of the most valuable SEO signals on the site)
- `CollectionPage` schema on Best-Of and Issues pages
- `ItemList` schema on Best-Of listing all six series entries
- `robots.txt` allows AI agents and search crawlers, blocks training scrapers
- `max-image-preview:large` on all main pages (good for Google Images and AI Overviews)
- All images include `alt` attributes
- All `<main>` elements have `id="main-content"` for skip-link targets

---

## Copy Audit

**Overall:** The copy is mostly excellent — calm, dry, neighborly, specific, and on-brand. The campaign voice is consistent throughout. The issues below are precision edits, not rewrites.

### Issues by location

**Homepage hero deck:**
> "I'm Don Scott, and I'm running for Bedford Town Supervisor because local elections should not go uncontested. This campaign is intentionally unconventional: less noise, minimal spending, total transparency, smarter technology, and more ways for residents to participate."

The list-of-attributes format ("less noise, minimal spending, total transparency...") reads slightly like campaign marketing. The first sentence is strong. Consider cutting the list and letting the page sections do the explaining:
> "I'm Don Scott, and I'm running for Bedford Town Supervisor because local elections should not go uncontested."

---

**Homepage AI section:**
> "We're not hiding it."

Works tonally. Fine.

> "Modern tools can lower the barriers to civic participation. A small local campaign can now access the same technology that large organizations pay millions for. That is part of what makes the $49.99 model possible — and part of what running for office without a consultant class actually looks like."

"that large organizations pay millions for" — mildly hyperbolic. The point lands fine, but "that were inaccessible a few years ago" is more precise.

---

**Homepage contact section:**
> "Confused? Ask Don."

See L-04. "Confused?" is slightly off-brand. Suggest "Have a question?" or just "Ask Don."

> "This campaign puts a high value on availability. If you have a question, there are two easy ways to get an answer: one version of Don never sleeps, and the other is real, human, and available with a few more guardrails."

"one version of Don never sleeps" is charming. "with a few more guardrails" is also good — but "a few more guardrails" is slightly vague for someone unfamiliar with the campaign. Consider "the other is real, human, and takes appointments."

---

**Rules page intro:**
> "Mine won't."

Perfect.

> "I'm running because Bedford deserves a choice in an election that should not be uncontested. That does not require noise, pressure, or performance. It requires a name on the ballot, a clear point of view, and an open invitation to talk if you want to."

Very good. The phrase "a clear point of view" could be sharpened to "a clear set of positions" but this is nitpicking.

---

**Rule 02 — No Fundraising CTA:**
> "Invest in pooches, not politicians."

Good. Dry and specific.

---

**Rule 04 — No Mailers:**
> "I will not be sending dramatic postcards to your house pretending urgency in 72-point Helvetica."

Excellent. Leave this alone.

---

**Rule 09 — All Photos CTA:**
> "Scroll once. That should cover it."

Good. Leave this alone.

---

**Best-Of page:**
> "Some may call it a stunt. Don sees it differently. Local government should be more creative about involving residents, surfacing local insight, and making civic life feel less like homework."

"Some may call it a stunt" is a mild defense. The campaign's usual posture is to let behavior speak without pre-defending. Consider: "Local government should be more creative about involving residents. That's the premise. These are small experiments in what that could look like."

---

**Best-Of card CTAs (inline styles):**
- "Start Typing →", "Submit and/or Vote →", "Get Your Grade →", "Test Your Knowledge →", "Vote Now →", "Open the Guide →"
- The "Submit and/or Vote →" construction is awkward. "Submit or Vote →" or just "Enter the Contest →" is cleaner.

---

**Chat modal confirmation:**
> "Thanks. Don will reach back out shortly to schedule."

Fine for tone. "reach back out" is slightly redundant ("reach out" or "get back to you"). Suggest: "Thanks. Don will get back to you shortly."

---

**Subscribe modal fine print:**
> "No fundraising. No spam. Unsubscribe anytime."

Leave this alone. It's perfect.

---

**Error messages (apps script fallback):**
> "Something went wrong. Please try again, or email Don directly."

No email address given. See M-08.

---

## Link Audit

**External links verified:**
- `https://www.facebook.com/DonScottBedfordNY/` — Present in footer and Rule 03
- `https://www.instagram.com/donforbedford/` — Present in footer and Rule 03
- `https://spcawestchester.org/` — Rule 02 CTA

**Internal nav links:**
- All pages use relative paths (`../index.html`, `rules.html`, etc.) which resolve correctly relative to their file location when served by Cloudflare Pages via the 301 redirect routing.
- The 301 chain: `/best-of-bedford` → `/pages/best-of-bedford` → serves `pages/best-of-bedford.html`. The browser URL bar shows `/pages/best-of-bedford` after the redirect. Relative links (`href="rules.html"`) therefore resolve to `/pages/rules.html` — correct.
- The 200 rewrite pages (`community-picks`, `code-red`) are served at the canonical URL directly. Their relative internal links would resolve relative to `/best-of-bedford-community-picks` and `/best-of-bedford-code-red`, which means `href="../assets/css/site.css"` would resolve to `/assets/css/site.css` — correct.

**Issues found:**

1. **`/best-of-bedford-cutest-pet-scout` canonical link is broken** — See C-01. The canonical link points to a URL with no redirect rule.

2. **`/bedford-how-to-guide` canonical link is broken** — See C-02.

3. **`functions/result.js` links to `/pages/best-of-bedford.html`** — See M-13. Should be `/best-of-bedford`.

4. **`admin/config.js` references production Apps Script endpoint in source** — The admin config has the production script URL in the JavaScript. This is fine if admin is not publicly linked and Cloudflare Pages doesn't serve it, but worth confirming the `/admin` path is either protected or not sensitive.

5. **Photo page `<link rel="stylesheet" href="../assets/css/site.css">` uses relative path** — For photo pages at `/photos/ribbon.html`, the path `../assets/css/site.css` resolves to `/assets/css/site.css`. This is correct and will work.

6. **`sitemap.xml` uses `https://www.donforbedford.com/pages/rules.html` but canonical is `/pages/rules`** — Mismatch. See H-02.

7. **Podcast nav link is commented out but page appears in sitemap** — See M-02.

**Apps Script endpoints in source:**
- Main endpoint: `AKfycbwjYjib02X1GLNhqqVnGCjEcAYPVNwSLceFhNUEFg5CvBIzqcBolAVeTMx09-i9_CFN/exec`
  - Used by: `site.js` (subscribe), `chat-modal.js` (chat request), `ideas.html` (idea voting/submission), `best-of-bedford-community-picks.html`, `bedford-how-to-guide.html` (suggest question), `best-of-bedford-cutest-pet.html`, `best-of-bedford-code-red.html`, `best-of-bedford-fastest-typist.html`, `pages/photos.html`
- Voter Report Card endpoint: `AKfycbywHW-nW2zx6neSqr2VvXp1LPvWa8pFdHYOWpfCaSyGhe9vJX7QfWKtJP5n1q6ZfxdjHw/exec`
  - Used by: `best-of-bedford-voter-report-card.html` only

Both endpoints are exposed in client-side source code, which is expected behavior for Apps Script/Google Forms integrations. Note that anyone can find and call these endpoints. If the Apps Script handler doesn't include spam/bot protection, it may be vulnerable to bulk submissions.

---

## Design Consistency Audit

**Overall:** The design system is coherent and consistently applied. The cream/sage/moss/charcoal palette is used correctly across all pages. Typography, cards, forms, modals, hero sections, and section spacing are consistent. This is notably good for a campaign site.

**Issues found:**

1. **Alternating card shading uses `nth-child(even)` — may be order-dependent** — The cards grid applies a cream background to even-indexed cards. If cards are ever reordered, the shading pattern changes. Minor.

2. **`best-of-bedford-cutest-pet.html` has an inline `TODO` comment visible in source** — See M-03.

3. **Card CTAs on Best-Of hub use inline styles** — The "Start Typing →" CTAs use `style="margin-top:auto;font-size:0.875rem;font-weight:600;color:var(--moss);"`. This should be a CSS class for maintainability (e.g. `.bob-series-card__cta`). Not visible to users but creates maintenance debt.

4. **Photo share pages use a different page layout than the main site** — Photo pages are intentionally simpler (centered, card-style), which is fine. But they lack the full site header/nav. Users who land on a photo share page from social have no navigation path to the rest of the site. The header is absent, so there's no "Don Scott for Bedford" wordmark visible until they scroll to the page footer (if there is one).

   Recommendation: Add at minimum a small branded header bar to photo share pages so social visitors know whose campaign they've landed on.

5. **`bob-series-card__status` CSS is defined but status badges are not present in markup** — See L-08.

6. **Rule card icon SVGs are inline and not standardized** — Each rule has a bespoke SVG. Some SVGs have `width`/`height` attributes, others don't. Minor inconsistency but not user-facing.

7. **Hover states on Best-Of cards transition is defined (`0.15s ease`) but no `transform`** — Homepage cards have a `-2px` vertical translate on hover; Best-Of cards don't. This is a subtle inconsistency but not an issue.

**What's working well:**
- `@media (prefers-reduced-motion)` is handled in every component that has CSS transitions
- Focus-visible states (`:focus-visible`) are consistently applied
- `aria-label` attributes are present on all icon-only interactive elements
- Hero image lightbox, subscribe modal, and chat modal all have proper focus traps and Escape key handling
- Mobile nav is properly gated behind `aria-expanded` state

---

## Google Sheets / Apps Script Audit

### Integrations identified

| Integration | Page | Action key | Endpoint |
|---|---|---|---|
| Subscribe | All pages (site.js) | `subscribe` | Main |
| Chat request | `index.html`, `pages/rules.html` | `chatRequest` | Main |
| Idea voting/submission | `pages/ideas.html` | Unknown | Main |
| Typing challenge score | `pages/best-of-bedford-fastest-typist.html` | Unknown | Main |
| Code Red score | `pages/best-of-bedford-code-red.html` | Unknown | Main |
| Pet contest submission | `pages/best-of-bedford-cutest-pet.html` | Unknown | Main |
| Community Picks vote | `pages/best-of-bedford-community-picks.html` | Unknown | Main |
| Photo engagement | `pages/photos.html` | Unknown | Main |
| How-To suggest | `pages/bedford-how-to-guide.html` | Unknown | Main |
| Voter Report Card lookup | `pages/best-of-bedford-voter-report-card.html` | Unknown | **Different endpoint** |

### Payload structure (subscribe):
```json
{
  "action": "subscribe",
  "email": "[email]",
  "name": "[name or empty]",
  "source": "subscribe_modal",
  "page": "[window.location.pathname]",
  "user_agent": "[navigator.userAgent]"
}
```

### Payload structure (chat request):
```json
{
  "action": "chatRequest",
  "type": "chat_request",
  "meeting_format": "virtual | in-person",
  "preferred_time": "morning | afternoon | evening",
  "name": "[name]",
  "street": "[street address]",
  "email": "[email]",
  "phone": "[phone]",
  "note": "[optional note]",
  "submitted_at": "[ISO timestamp]",
  "page_url": "[window.location.href]",
  "user_agent": "[navigator.userAgent]"
}
```

### CORS behavior:
Both scripts send `Content-Type: text/plain;charset=utf-8` to avoid CORS preflight. There is a fallback to `application/x-www-form-urlencoded` if the first fetch fails. This is a known and effective workaround for Apps Script's CORS limitations.

### Success / error handling:
- **Current behavior:** The `fetch()` `.then()` callback fires on any successful HTTP response — including Apps Script 200 responses that contain an error in the JSON body. The form shows "success" whether or not the actual data write succeeded.
- **Recommended fix:** Parse response JSON in `.then(response => response.json())` and check for a success field before showing confirmation. Show an error if `result !== "success"`. See M-07.

### Duplicate prevention:
No client-side duplicate prevention is visible. If a user submits the subscribe form twice (e.g., double-click or back-and-resubmit), they'll be written twice. Deduplication should be handled server-side in the Apps Script.

### Spam / bot protection:
No `honeypot` field, no rate limiting, and no CAPTCHA visible in client code. The Apps Script endpoint is exposed in source. Anyone can POST arbitrary data to it. For a low-volume local campaign, this is likely acceptable risk — but monitor if the sheet accumulates junk rows.

### Failure visibility:
If a submission fails after the fallback fetch, the error is shown to the user in the `#chat-req-error` element. However, failed submissions are not logged anywhere visible to the campaign. Recommend keeping a running error log in the Apps Script (e.g., a "Errors" sheet tab) so failed submissions can be identified.

### Voter Report Card — different endpoint:
This endpoint is architecturally separate. This may be intentional (voter history lookup is a different data source/handler), but its isolation means it won't be caught if the main endpoint is deprecated. Confirm whether this script handles different data or whether it can be merged.

### Safe test plan:
Do not submit real data to production forms without a safe test mode. To test safely:
1. Add `?test=1` URL parameter handling in the Apps Script: if `test === "1"`, write to a "Test" sheet tab instead of production tabs.
2. Or create a separate Apps Script deployment pointed at a test spreadsheet.
3. Validate: submit the chat form, subscribe modal, and one Best-Of entry. Confirm data lands in the correct sheet tab. Confirm success message appears. Confirm a simulated error (disconnect network) shows the error state.

---

## Editorial Formatting Consistency Audit

**Eyebrows (ALL CAPS):**
- Homepage: `DON SCOTT PRESENTS` → inconsistent casing! Main pages use `Don Scott Presents` (Title Case), Best-Of hub uses `DON SCOTT PRESENTS`. All other eyebrows use Title Case (`RADICAL TRANSPARENCY` is correct ALL CAPS for eyebrow; `A different kind of campaign` is wrong — should be `A DIFFERENT KIND OF CAMPAIGN`).

Wait — looking again at the homepage:
- `<p class="eyebrow">Don Scott Presents</p>` → Title Case (not ALL CAPS)  
- `<p class="eyebrow">A different kind of campaign</p>` → lowercase  
- `<p class="eyebrow">Radical transparency</p>` → Sentence case  
- `<p class="eyebrow">AI transparency</p>` → Mixed  
- `<p class="eyebrow">Common Questions</p>` → Title Case  
- Best-Of page: `<p class="eyebrow">DON SCOTT PRESENTS</p>` → ALL CAPS
- Best-Of page: `<p class="eyebrow">INNOVATING CIVIC ENGAGEMENT</p>` → ALL CAPS

The CSS likely applies `text-transform: uppercase` to `.eyebrow`, so the rendered output is all-caps regardless of source casing. But the source HTML itself is inconsistent — some are written in Title Case, some in lowercase, some in ALL CAPS. This should be standardized in source to ALL CAPS to match the rendered output and avoid confusion.

**Headings (Title Case):**
Headings appear consistent. No major deviations found.

**Buttons:**
- Main CTAs: Title Case ("Chat with Don Scott", "Chat with Don Bot", "Download Wallpaper", "Donate to the SPCA", "View the Photo Timeline", etc.)
- Best-Of inline CTAs: mixed ("Start Typing →", "Submit and/or Vote →") — these are in Title Case but use sentence case for the first word only
- All consistent enough given the intentional informality

**Nav labels:**
- Desktop nav: Home | Rules | Issues | Ideas | Best-Of
- Mobile nav: Same as above
- Consistent across all pages ✓

**Footer labels:**
- "Pages" / "Stay informed" — these are section headers in the footer, using Title Case ✓
- "Less Campaign. More Bedford." tagline — consistent across all pages ✓

**Form labels:**
- Chat modal: "Your Name (Required)", "Street Address (Required)", "Email Address (Required)", "Cell Phone (Required)", "Anything else? (Optional)"
- Subscribe modal: "Email address" (lowercase 'a'), "Name (optional)" — slightly different capitalization pattern from the chat form
- Recommend standardizing: if chat form uses Title Case for labels ("Email Address"), subscribe modal should too ("Email Address", "Name")

**Punctuation:**
- Smart quotes and apostrophes are used consistently (HTML entities: `&#8217;`, `&#8220;`, etc.)
- "em dash" vs "—" are used appropriately
- No inconsistent use of ellipsis found

---

## Nav / Footer Audit

### Top Navigation

| Element | Index | Rules | Issues | Ideas | Best-Of | Other pages |
|---|---|---|---|---|---|---|
| Present | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Logo / home link | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Home link | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Rules link | ✓ | ✓ (aria-current) | ✓ | ✓ | ✓ | ✓ |
| Issues link | ✓ | ✓ | ✓ (aria-current) | ✓ | ✓ | ✓ |
| Ideas link | ✓ | ✓ | ✓ | ✓ (aria-current) | ✓ | ✓ |
| Best-Of link | ✓ | ✓ | ✓ | ✓ | ✓ (aria-current) | ✓ |
| Subscribe CTA | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Mobile nav parity | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

**Issues:**
- **No Don Bot link in nav** — See H-05
- **Podcast link commented out** — See M-02
- **`aria-current="page"` is correctly set** on active items ✓

### Footer

| Element | Index | Rules | Issues | Best-Of | Other pages |
|---|---|---|---|---|---|
| Present | ✓ | ✓ | ✓ | ✓ | ✓ |
| Logo | ✓ | ✓ | ✓ | ✓ | ✓ |
| Tagline | ✓ | ✓ | ✓ | ✓ | ✓ |
| Social links | ✓ | ✓ | ✓ | ✓ | ✓ |
| Pages: AI Transparency | ✓ | ✓ | ✓ | ✓ | ✓ |
| Subscribe button | ✓ | ✓ | ✓ | ✓ | ✓ |

**Issues:**
- **Footer "Pages" list has only one link ("AI Transparency")** — See H-06. Suggest adding: Rules, Issues, Don Bot, Best-Of, Press
- **Photo share pages appear to have no header nav** — See Design Audit item 4. Social visitors land with no navigation path to the main site
- **Footer is consistent across all pages surveyed** ✓

---

## Recommended Implementation Order

Listed by impact and effort. Do these in order.

### Sprint 1 — Critical fixes (do now, under 2 hours total)

1. **C-01** — Add `best-of-bedford-cutest-pet-scout` to `_redirects` and `sitemap.xml`
2. **C-02** — Add `bedford-how-to-guide` to `_redirects` and `sitemap.xml`
3. **H-01 + H-02** — Standardize all canonical URLs to clean (no `.html`) form, and fix sitemap to match
4. **H-07** — Verify `press.html` has a `<title>` and `<link rel="canonical">`
5. **M-13** — Fix the two hardcoded `.html` links in `functions/result.js`
6. **M-03** — Remove the TODO comment from `best-of-bedford-cutest-pet.html`

### Sprint 2 — Navigation and discoverability (half day)

7. **H-05** — Add Don Bot to primary nav across all pages
8. **H-06** — Expand footer Pages nav links
9. **M-02** — Decide: remove podcasts from sitemap or uncomment nav
10. **M-10** — Add Election Day speeches page to footer nav
11. **M-11** — Add `bedford-how-to-guide` to sitemap (done via C-02 fix)
12. **M-12** — Add scout page to sitemap (done via C-01 fix)

### Sprint 3 — Quality and polish (half day)

13. **H-03** — Create 1200×630 crop versions of photo share images
14. **H-04** — Fix `ai.html` OG image to 1200×630
15. **M-01** — Fix robots.txt `Content-Signal` line (make it a comment or remove)
16. **M-04 + M-05** — Fix photo page `og:site_name` and add `max-image-preview:large`
17. **L-04** — Tweak "Confused?" homepage heading
18. **L-05** — Remove redundant "Do this instead" label from rule card CTAs
19. **L-06** — Standardize `<title>` tag format across all pages
20. **L-07** — Move or delete `homepage-audit-report.md` from root

### Sprint 4 — Apps Script reliability (1 day)

21. **M-07** — Add response-body checking to all Apps Script success handlers
22. **M-08** — Add contact email to error fallback messages
23. **M-06** — Document why the Voter Report Card uses a separate endpoint; add a comment
24. **L-01** — Create `/llms.txt`

### Sprint 5 — Nice-to-haves

25. **L-02 + L-03** — Refine subscribe modal copy
26. **L-08** — Add Live/Coming Soon status badges to Best-Of cards
27. **M-09** — Fix rule card `<h2>` → `<h3>` heading hierarchy
28. Design: add a minimal header/nav to photo share pages

---

## Screenshots / Evidence to Preserve

For Pollie Awards documentation and case study purposes, preserve the following before making any changes:

### Before-state screenshots
- `[ ]` Homepage at desktop (1440px) and mobile (390px)
- `[ ]` Rules page with all 10 rules collapsed, then expanded (Rule 01 and Rule 07)
- `[ ]` Ideas page with the idea matchup module active
- `[ ]` Best-Of hub page
- `[ ]` Cutest Pet page — vote interface (shows current vote counts)
- `[ ]` Voter Report Card — lookup interface
- `[ ]` Code Red — game in progress and final score state
- `[ ]` Community Picks — voting interface
- `[ ]` Don Bot — Q&A accordion open on a question
- `[ ]` AI Transparency page
- `[ ]` Subscribe modal (open state)
- `[ ]` Chat request modal (all 3 steps)
- `[ ]` Spending thermometer (current $13.12 / $49.99 state)
- `[ ]` Footer (shows sparse current state before expansion)
- `[ ]` A social preview from Facebook or iMessage of the homepage, Best-Of, and one photo share page

### OG preview evidence
Run these URLs through social debuggers and save screenshots:
- Facebook Sharing Debugger: `https://developers.facebook.com/tools/debug/` → test homepage, Rules, Don Bot, ai.html, one photo share, one pet share
- Twitter Card Validator: `https://cards-dev.twitter.com/validator` → test same URLs
- LinkedIn Post Inspector: `https://www.linkedin.com/post-inspector/` → test homepage and Best-Of

### Sitemap and robots.txt snapshots
- `[ ]` Screenshot of Google Search Console > Sitemap status (current state before fix)
- `[ ]` Current `robots.txt` (for the record)

### Apps Script evidence
- `[ ]` Screenshot of the Google Sheet with all active tabs visible (Chat Requests, Subscribers, etc.)
- `[ ]` A sample successful submission in each tab (redact PII but show column structure)
- `[ ]` The Apps Script code.gs file (for documentation)

### Analytics snapshots
- `[ ]` Google Analytics acquisition overview (sessions by source/medium)
- `[ ]` Top pages by pageviews
- `[ ]` Microsoft Clarity heatmap on homepage
- `[ ]` Any engagement on the interactive tools (typing scores, pet votes, Code Red completions)

### Performance
- `[ ]` Lighthouse report: run `lighthouse https://www.donforbedford.com/` in Chrome DevTools → save JSON and screenshot
- `[ ]` Lighthouse on `/pages/ideas` (most JS-heavy page)
- `[ ]` Lighthouse on `/best-of-bedford-fastest-typist` (most interactive)

These screenshots + data form the core of a Pollie Awards evidence package for the following likely categories:
- Best Use of Digital Technology in a Local Campaign
- Best Use of AI in a Campaign
- Best Campaign Website
- Best Use of Humor / Creative (photo pages, odds page)
- Best Civic Engagement Tool (typing challenge, voter report card, Code Red, Ideas)
- Most Innovative Tactic

---

*Audit completed: 2026-05-01. Auditor: Claude Code (claude-sonnet-4-6). Repo: C:\Users\micha\Documents\uncampaign. Production: https://www.donforbedford.com*
