# Don Scott Uncampaign Website — Site-Wide Audit

**Audit date:** 2026-05-06  
**Auditor:** Claude Code (senior technical SEO, LLM optimization, UX, accessibility, performance, analytics, schema, political compliance, and static-site QA pass)  
**Site:** https://www.donforbedford.com  
**Platform:** Static HTML, hosted on Cloudflare Pages  
**Total pages inspected:** 50 HTML files + sitemap.xml, robots.txt, llms.txt, _redirects, site.webmanifest

---

## Executive Summary

**Overall grade: B+ (strong foundation, several fixable gaps before wide promotion)**

The Uncampaign website is a genuinely well-built, thoughtfully designed static site. The metadata architecture is well above average for a local political campaign. The llms.txt and robots.txt show real intentionality. The design system is cohesive. The schema work is present and generally correct. The Cloudflare Pages deployment is clean.

That said, there are several issues that need fixing before pushing wide press or social promotion:

### Biggest Risks
1. **Blog post is completely invisible to search and AI.** `blog/the-danger-of-one-party-towns` is not in `sitemap.xml`. It won't be crawled reliably.
2. **Character encoding corruption** in `election.html` JSON-LD schema (`â€"` instead of `—`) — will fail Google Rich Results validation.
3. **All major PNG campaign images are 1.2–4.7 MB each.** Total image payload is ~160–180 MB. This is a severe Core Web Vitals liability on mobile. Most images have companion `.webp` versions — they just need to be used.
4. **Internal nav links use relative `.html` paths** (`pages/rules.html` instead of `/pages/rules`), creating inconsistency with canonical URLs.
5. **No campaign legal disclaimer** is present anywhere. This needs attorney review before press push.
6. **Template page** (`/pages/template`) is publicly accessible with placeholder content and no noindex directive.

### Biggest Opportunities
1. **FAQPage schema on Don Bot** — 150+ Q&A pairs on one page is a perfect FAQPage schema candidate. This could generate rich results and dominate AI search answers.
2. **Convert 301-redirect clean URLs to 200 rewrites** — eliminates redirect chains for `/photos`, `/podcasts`, `/best-of-bedford`, and all sub-pages.
3. **Blog post in sitemap** — one line adds the primary editorial content to search.
4. **Swap PNG references to WebP** — the WebP versions already exist for persona and roundtable images. A simple `<picture>` or `src` swap could cut image payload by 90%+.
5. **llms.txt blog section** — adds new editorial content to AI retrieval and citation layer.

---

## Critical Fixes

| # | Priority | Page/File | Issue | Why It Matters | Recommended Fix | Effort | Skill |
|---|----------|-----------|-------|----------------|-----------------|--------|-------|
| 1 | 🔴 Critical | `sitemap.xml` | Blog post `/blog/the-danger-of-one-party-towns` not in sitemap | Google and AI crawlers won't reliably discover or index the article | Add `<url><loc>https://www.donforbedford.com/blog/the-danger-of-one-party-towns</loc><lastmod>2026-05-06</lastmod></url>` | 5 min | HTML/XML |
| 2 | 🔴 Critical | `pages/election.html` | UTF-8 encoding corruption in JSON-LD schema: `â€"` instead of `—` (em dash) | Fails Google Rich Results validator; looks broken to AI parsers reading JSON | Find and replace `â€"` → `—` in both the schema WebSite description and OG image alt text on this page | 5 min | Text editor |
| 3 | 🔴 Critical | All HTML pages | Main site navigation uses relative `.html` paths (`pages/rules.html`, `pages/issues.html`) instead of clean canonical URLs | Internal links passing PageRank and crawl signals point to `.html` URLs, not canonicals; creates crawl confusion on Cloudflare Pages | Change nav `href` values: `pages/rules.html` → `/pages/rules`, `pages/issues.html` → `/pages/issues`, `pages/ideas.html` → `/pages/ideas`, `pages/best-of-bedford.html` → `/best-of-bedford`. Same fix for mobile nav. Also fix footer: `blog/` → `/blog`, `pages/election.html` → `/election`, `pages/ai.html` → `/pages/ai` | 20 min | HTML |
| 4 | 🔴 Critical | `pages/template.html` | Publicly accessible at `/pages/template` with placeholder content (`[Page Title]`, `[Page description]`) and no noindex directive | Placeholder content could appear in search results; embarrassing if discovered by press | Add `<meta name="robots" content="noindex, nofollow">` to `pages/template.html`, or delete the file if not needed | 5 min | HTML |
| 5 | 🟠 High | All major PNG images | Most PNG campaign images are 1.2–4.7 MB each; total image payload ~160–180 MB | Severe LCP and CLS risk on mobile; likely fails Core Web Vitals; hurts PageSpeed score materially | Audit note below. Short-term: switch `src` to WebP counterparts where available (personas, roundtable). Hero image `.jpg` at 356 KB is fine. Medium-term: use `<picture>` elements for format switching. | 1–2 hrs | HTML/optimization |
| 6 | 🟠 High | Whole site | No campaign financial disclaimer or "Paid for by" language anywhere | NY Election Law requires political advertising and campaign materials to include required disclosures. Legal exposure. | See Legal section below. Flag for attorney review immediately. | 30 min | Legal + HTML |
| 7 | 🟠 High | `pages/don-bot.html` | 150+ Q&A pairs exist but no FAQPage structured data schema | FAQPage schema on a page with real Q&A content is one of the highest-ROI schema implementations available — can generate accordion rich results and AI snippet citations | Add `FAQPage` schema. See Schema Recommendations section for pattern. | 30–60 min | JSON-LD |
| 8 | 🟠 High | `assets/img/og-image.png` used for 10+ pages | Nearly all non-roundtable pages share a single OG image | Reduces social share differentiation across all major campaign pages | See OG/Social Image Plan. Minimum: create a second distinct image for election page, don-bot, and blog. | 1–2 hrs | Design |

---

## Page-by-Page Audit

### Homepage (`/`)
- **Purpose:** Campaign entry point, establishes the Uncampaign premise, transparency, AI use, CTAs
- **SEO status:** ✅ Strong. Title (62 chars), description (149 chars) are well-crafted and appropriately keyword-rich. H1 is unique. Canonical correct.
- **LLM status:** ✅ Strong. Clear entity definition, geography, office, premise. Transparent AI disclosure. Key sections are scannable.
- **UX status:** ✅ Strong. Logical content flow. Spending tracker is a standout feature. CTAs are clear without being pressured.
- **OG/social status:** ✅ Good. Standard 1200×630 og-image. All required fields present. og:image:alt is descriptive.
- **Schema status:** ✅ Good. WebSite + WebPage + Person in `@graph`. Person has sameAs links to social profiles. Could add `SearchAction` if a search feature is added later; leave it out now.
- **Performance status:** ⚠️ Hero image is JPG at 356 KB — acceptable. However, no `rel="preload"` for LCP image. Add `<link rel="preload" as="image" href="/assets/img/home-hero-don-scott-bedford.jpg">` in `<head>`.
- **Analytics/tag status:** ✅ GA4 (`G-G7WVQR4MTH`) and Microsoft Clarity (`wis1l4ilnm`) both present and correctly placed.
- **Legal/disclaimer status:** 🔴 No campaign disclaimer anywhere on the page.
- **Recommended fixes:** Add hero preload tag. Add campaign disclaimer to footer. Fix nav links to use canonical paths.

---

### Rules (`/pages/rules`)
- **SEO status:** ⚠️ Title "The Rulebook | Don for Bedford" (30 chars) is too short and misses key terms. Meta description is good.
- **LLM status:** ✅ Good. Rules as a list format is highly scannable and citable.
- **OG/social status:** ✅ Acceptable. Using default og-image — a dedicated "rulebook" OG would be stronger but not critical.
- **Schema status:** ✅ Has WebSite + WebPage + BreadcrumbList + Person. Solid.
- **Recommended title:** `Campaign Rules — What the Uncampaign Won't Do | Don Scott for Bedford` (69 chars) or `The Rulebook: No Mailers, No Robocalls | Don Scott for Bedford` (62 chars)

---

### Issues/Bedford Roundtable (`/pages/issues`)
- **SEO status:** ✅ Strong. Title (61 chars), description cover key local topics (roads, growth, Bedford Hills, energy costs).
- **OG/social status:** ✅ Has a distinct, page-specific OG image (`roundtable-scene.png`). Good differentiation.
- **Schema status:** ✅ CollectionPage with `hasPart` array pointing to issue sub-pages. Well-structured.
- **Note:** The roundtable-scene.png is used as both the issues page OG *and* the election page OG — they should use different images.

---

### Ideas (`/pages/ideas`)
- **SEO status:** ✅ Title good (61 chars). Description solid.
- **Schema status:** ⚠️ No OG or schema observed in first 30 lines beyond canonical/favicons. Needs verification that full OG and schema are present (partial read).
- **Performance:** ⚠️ If this page loads a large JS file for idea voting/ranking, audit the JS weight and lazy-load strategy.

---

### Don Bot (`/pages/don-bot`)
- **SEO status:** ✅ Title (46 chars, OK). Description good.
- **OG/social status:** ✅ Using default OG image. A Don Bot-specific image would be stronger.
- **Schema status:** 🔴 Missing FAQPage schema. This is the highest-opportunity schema item on the whole site.
- **LLM status:** ✅ Very strong for AI answer engines if FAQPage schema is added. Currently the Q&A content may not be well-structured for LLM extraction without schema.

---

### AI Transparency (`/pages/ai`)
- **SEO status:** ✅ Good title (53 chars). Excellent content for a unique, citable page.
- **OG/social status:** ⚠️ OG image is `don-bot.png` at **1536×1024** — non-standard. The `og:image:width` and `og:image:height` say 1536×1024, which is technically accurate but may render oddly on some platforms. Ideal is 1200×630.
- **LLM status:** ✅ Excellent. AI transparency pages are increasingly valuable for AI citation and trust signals.
- **Recommended fix:** Create a proper 1200×630 OG image for this page, or use the default `og-image.png`.

---

### Election (`/election`)
- **SEO status:** ✅ Strong title (66 chars). Description is useful and covers voter info keywords. Note: `dateModified: 2026-05-06` is in schema — keep updated.
- **OG/social status:** ⚠️ Using `roundtable-scene.png` which is the Issues page image — wrong context for an election info page. Should have its own voter-information-themed OG image.
- **Schema status:** 🔴 **Encoding corruption** in JSON-LD: `â€"` appears instead of `—` in the WebSite schema description. Also appears in the OG image alt text on line 21. This breaks the JSON-LD and will fail validation.
- **Recommended fix:** Find/replace `â€"` → `—` in `pages/election.html` and assign a distinct OG image.

---

### Blog Index (`/blog`)
- **SEO status:** ⚠️ Title "Blog | Don Scott for Bedford" (28 chars) is too generic/short. Meta description is reasonable.
- **OG/social status:** ✅ Fields complete. Using default OG image — acceptable for index page.
- **Schema status:** ✅ CollectionPage + BreadcrumbList. Good.
- **Recommended title:** `The Uncampaign Blog | Don Scott for Bedford Town Supervisor` (59 chars)

---

### Blog Post: The Danger of One-Party Towns (`/blog/the-danger-of-one-party-towns`)
- **SEO status:** 🔴 **Not in sitemap.** This is the only substantive editorial content on the site. It's effectively invisible to search and AI without sitemap inclusion. Title (53 chars) is good.
- **OG/social status:** ✅ Excellent. Uses `og:type = "article"` correctly. Has `article:published_time`, `article:author`, `article:tag`. Has a distinct 1200×630 blog OG image (`05062026-og.png`). Best OG implementation on the site.
- **Schema status:** ✅ Has `Article` schema. Add `dateModified` and `image` property for completeness.
- **Content:** ⚠️ `meta name="keywords"` is present but ignored by all modern search engines. Remove to clean up the head.
- **Recommended fixes:** Add to sitemap. Remove `meta name="keywords"`. Add `dateModified` and `image` to Article schema.

---

### Best of Bedford Hub (`/best-of-bedford`)
- **SEO status:** ✅ Title good (68 chars, near limit — acceptable). Meta description solid.
- **OG/social status:** ✅ Complete fields. Default OG image — dedicated image would be stronger.
- **Routing note:** This URL 301-redirects from `/best-of-bedford` → `/pages/best-of-bedford`. The canonical says `/best-of-bedford`. See routing consistency issue in Duplicate/Cleanup section.

---

### Links (`/links`)
- **SEO status:** ✅ Canonical correct. Title adequate.
- **OG/social status:** ✅ Complete.
- **Design system issue:** ⚠️ `theme-color` is `#3E5240` on this page; everywhere else it's `#4A5240`. Also `safari-pinned-tab.svg color` is `#3E5240` here. Minor but inconsistent.
- **Recommended fix:** Change both to `#4A5240` to match rest of site.

---

### Press (`/pages/press`)
- **SEO status:** ✅ Good description, reasonable title.
- **Technical issue:** ⚠️ The `<title>` element is placed **after** the OG `<meta>` tags. Standard practice (and some parsers expect) `<title>` before OG tags. Not catastrophic but sloppy.
- **Recommended fix:** Move `<title>` to before OG meta tags.

---

### Podcasts/Bedford Brief (`/podcasts`)
- **SEO status:** ✅ Title strong (53 chars). Distinct product name ("The Bedford Brief") is good.
- **OG/social status:** ⚠️ Source comment `<!-- TODO: Replace with a Bedford Brief-specific OG image once available -->` is in production HTML. Create or assign an OG image.
- **Routing note:** 301 from `/podcasts` → `/pages/podcasts`. See routing note.

---

### Odds (`/pages/odds`)
- **SEO status:** ⚠️ Title is **79 characters** — will truncate in Google SERPs (limit ~60–65 chars). "Don Scott Election Day Speeches | Bedford Town Supervisor Odds | The Uncampaign" gets cut before "The Uncampaign."
- **OG/social status:** ✅ OG title is shorter and correct (47 chars). OG description is punchy and shareworthy.
- **Schema status:** ✅ Has WebPage + BreadcrumbList. Decent.
- **Recommended title:** `Don Scott Already Wrote Both Election Day Speeches | The Uncampaign` (68 chars — still slightly long but matches OG title) or `Election Night Speeches — Both of Them | Don Scott for Bedford` (62 chars).

---

### Photos Gallery (`/photos`)
- **SEO status:** ✅ Title and description adequate.
- **OG/social status:** ⚠️ `og:site_name` is "Don for Bedford" — should be "Don Scott for Bedford" for consistency with all other pages.
- **Routing note:** 301 from `/photos` → `/pages/photos`. Canonical correctly says `/photos`.

---

### Photo Share Pages (`/photos/ribbon`, etc., 12 pages)
- **SEO status:** ✅ Each has unique, on-brand title and description. Canonical URLs correct. All indexed.
- **OG/social status:** ⚠️ Images are **1080×1350 (portrait/Instagram format)**. Twitter/X `summary_large_image` card renders best at 1200×630 (landscape). Portrait images on Twitter will show as cropped center squares. On iMessage and iCloud sharing, portrait images look great. Facebook handles portrait. Slack and Discord may crop. This is a judgment call based on primary share surface.
- **Technical gap:** `og:image:secure_url` is **missing** on photo share pages (present on all other pages).
- **Schema status:** Photo pages appear to lack JSON-LD structured data. At minimum add BreadcrumbList. For Pollie evidence: ImageObject schema would be valuable.
- **Recommended fix:** Add `og:image:secure_url` to all 12 photo share page OG blocks. Add BreadcrumbList schema.

---

### Issue Deep-Dives (`/pages/issues/*`, 9 pages)
- **Partial read only** — confirmed all 9 are in sitemap with correct URLs.
- **Sitemap coverage:** ✅ All 9 issue sub-pages confirmed in sitemap.
- **Recommended:** Ensure each issue page has BreadcrumbList schema with 3 levels: Home → Issues → [Issue Name].

---

### Best-of-Bedford Sub-Pages (8+ pages)
- **Partial read only** — confirmed all are in sitemap.
- **Routing note:** `/best-of-bedford-community-picks` and `/best-of-bedford-code-red` use 200 rewrites (correct). Others use 301 redirects (see routing section).

---

### Admin (`/admin`)
- ✅ Correctly has `noindex, nofollow` robots directive. Not in sitemap. Password-gated. No issues.

---

## Metadata Matrix

| Page | Current Title | Chars | Proposed Title | Current Meta Desc | Chars | OG Image | Schema Type | In Sitemap | Index |
|------|--------------|-------|----------------|-------------------|-------|----------|-------------|------------|-------|
| Homepage `/` | The Uncampaign — Don Scott for Bedford Town Supervisor | 62 | ✅ Keep | The Uncampaign is Don Scott's calm… | 149 | og-image.png (1200×630) | WebSite, WebPage, Person | ✅ | index |
| Rules `/pages/rules` | The Rulebook \| Don for Bedford | 30 | Campaign Rules — What the Uncampaign Won't Do \| Don Scott | Same | 134 | og-image.png | WebSite, WebPage, BreadcrumbList, Person | ✅ | index |
| Issues `/pages/issues` | The Bedford Roundtable \| Don Scott for Bedford Town Supervisor | 61 | ✅ Keep | A clear, AI-assisted way… | 155 | roundtable-scene.png (1200×630) | WebSite, CollectionPage | ✅ | index |
| Ideas `/pages/ideas` | 100+ Ideas for Bedford — Don Scott for Bedford Town Supervisor | 61 | ✅ Keep | 100+ practical ideas… | 139 | og-image.png | Needs verification | ✅ | index |
| Don Bot `/pages/don-bot` | Ask Don \| Don Bot for Bedford Town Supervisor | 46 | Ask Don Bot — Q&A with Don Scott for Bedford Town Supervisor | Same | 143 | og-image.png | ⚠️ Missing FAQPage | ✅ | index |
| AI `/pages/ai` | How We Use AI \| Don Scott for Bedford Town Supervisor | 53 | ✅ Keep | A transparent look… | 152 | don-bot.png (1536×1024 ⚠️) | WebPage | ✅ | index |
| Election `/election` | 2026 Bedford Town Supervisor Election \| Don Scott vs. Ellen Calves | 66 | ✅ Keep | The 2026 Town of Bedford… | 155 | roundtable-scene.png (⚠️ reuse) | 🔴 Schema encoding broken | ✅ | index |
| Blog Index `/blog` | Blog \| Don Scott for Bedford | 28 | The Uncampaign Blog \| Don Scott for Bedford Town Supervisor | Articles from Don Scott's campaign… | 140 | og-image.png | CollectionPage, BreadcrumbList | ✅ | index |
| Blog Post | The Danger of One-Party Towns \| Don Scott for Bedford | 53 | ✅ Keep | Local elections are moving… | 155 | 05062026-og.png (1200×630 ✅) | Article | 🔴 MISSING | index |
| Best of Bedford `/best-of-bedford` | Best of Bedford \| Interactive Civic Projects for Bedford \| Don Scott | 68 | Best of Bedford — Civic Series \| Don Scott for Bedford | Same | og-image.png | CollectionPage | ✅ | index |
| Links `/links` | Don Scott — Links \| For Bedford | 31 | Don Scott — For Bedford (all links) | Everything in one place… | 148 | og-image.png | ProfilePage | ✅ | index |
| Press `/pages/press` | Press \| Don Scott for Bedford | 29 | Press Room \| Don Scott for Bedford Town Supervisor | A $49.99 local campaign… | 152 | og-image.png | WebPage | ✅ | index |
| Podcasts `/podcasts` | The Bedford Brief \| Bedford Town Board Meeting Recaps | 53 | ✅ Keep | The Bedford Brief turns… | 148 | og-image.png (⚠️ TODO) | WebPage | ✅ | index |
| Odds `/pages/odds` | Don Scott Election Day Speeches \| Bedford Town Supervisor Odds \| The Uncampaign | 79 ⚠️ | Don Scott Already Wrote Both Election Day Speeches | Don Scott wrote both Election Day speeches… | 141 | og-image.png | WebPage, BreadcrumbList | ✅ | index |
| Photos `/photos` | Photos from the Uncampaign \| Don for Bedford | 46 | Photos from the Uncampaign \| Don Scott for Bedford | Photos from Don Scott's… | 148 | og-image.png | WebPage | ✅ | index |
| Photo/Ribbon `/photos/ribbon` | Ribbon Cutting \| Photos from the Uncampaign | 44 | ✅ Keep | Giant scissors are a local candidate's… | 155 | ribbon.png (1080×1350 ⚠️) | ⚠️ Missing schema | ✅ | index |
| Template `/pages/template` | [Page Title] — Don Scott for Bedford | — | Delete or noindex | Placeholder | — | none | none | ❌ Not in sitemap | 🔴 Needs noindex |

---

## Schema Recommendations

### Priority 1: Fix Encoding in `pages/election.html`

**Current (broken):**
```json
"description": "The Uncampaign â€" Don Scott for Bedford Town Supervisor"
```

**Fix:**
```json
"description": "The Uncampaign — Don Scott for Bedford Town Supervisor"
```

Also fix the OG image alt text on line 21 of `election.html`:
```html
<!-- Current (broken): -->
<meta property="og:image:alt" content="2026 Bedford Town Supervisor Election â€" Voter Information">

<!-- Fix: -->
<meta property="og:image:alt" content="2026 Bedford Town Supervisor Election — Voter Information">
```

---

### Priority 2: FAQPage Schema on `pages/don-bot.html`

This is the highest-ROI schema opportunity on the site. Add after the existing schema `@graph`:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.donforbedford.com/pages/don-bot#faqpage",
  "name": "Don Bot — Ask Don Scott",
  "description": "Don Scott's human-reviewed answers to common questions about Bedford, local government, the Town Supervisor role, and The Uncampaign.",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does a Town Supervisor actually do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Don's actual answer from the page]"
      }
    },
    {
      "@type": "Question",
      "name": "Why are you running as a Republican in a Democratic town?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Don's actual answer from the page]"
      }
    }
    // ... add all 150+ Q&A pairs
  ]
}
```

**Guidance:** Include all Q&A pairs. Google's FAQ rich results show up to ~3 questions with expandable answers in SERPs. All Q&As benefit AI answer engines regardless of whether rich results appear.

---

### Priority 3: Article Schema Improvements for Blog Post

**Current schema is good.** Add missing fields:

```json
{
  "@type": "Article",
  "@id": "https://www.donforbedford.com/blog/the-danger-of-one-party-towns#article",
  "headline": "The Danger of One-Party Towns",
  "datePublished": "2026-05-06",
  "dateModified": "2026-05-06",   // ← ADD THIS
  "author": {
    "@type": "Person",
    "@id": "https://www.donforbedford.com/#don-scott",
    "name": "Don Scott"
  },
  "image": {                       // ← ADD THIS
    "@type": "ImageObject",
    "url": "https://www.donforbedford.com/assets/img/blog/05062026-og.png",
    "width": 1200,
    "height": 630
  },
  "publisher": {
    "@type": "Organization",
    "name": "Don Scott for Bedford",
    "url": "https://www.donforbedford.com/"
  },
  "isPartOf": { "@id": "https://www.donforbedford.com/#website" }
}
```

---

### Priority 4: BreadcrumbList on Photo Share Pages

Add to each `photos/*.html` page:

```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.donforbedford.com/" },
    { "@type": "ListItem", "position": 2, "name": "Photos", "item": "https://www.donforbedford.com/photos" },
    { "@type": "ListItem", "position": 3, "name": "Ribbon Cutting", "item": "https://www.donforbedford.com/photos/ribbon" }
  ]
}
```

---

### Priority 5: WebSite SearchAction (Optional, only if search is added)

Currently not recommended — site search does not exist. If Don Bot gets a real search interface, add:

```json
{
  "@type": "WebSite",
  "@id": "https://www.donforbedford.com/#website",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.donforbedford.com/pages/don-bot?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

---

### Note on Person Schema

The `Person` schema for Don Scott appears on most pages and is consistent. Consider adding:
- `alumniOf` for Katonah-Lewisboro School Board and other civic roles
- `memberOf` for Westchester Alliance and Braver Angels
- `hasOccupation` for legal marketing firm

These additions strengthen entity disambiguation and AI search citations.

---

## OG / Social Image Plan

### Current Situation
- **11 of ~35 unique pages** share the same `og-image.png` (1200×630, campaign default)
- **Issues page** has a distinct roundtable image ✅
- **Election page** incorrectly reuses the roundtable image ⚠️
- **Blog post** has a distinct article image ✅
- **AI page** uses `don-bot.png` at non-standard 1536×1024 ⚠️
- **Photo share pages** use portrait images (1080×1350) ⚠️ (Twitter crop risk)
- **Podcasts page** is using default with a TODO comment ⚠️

### Recommended Image Plan

| Page | Current Image | Recommended Image | Dimensions | Notes |
|------|--------------|-------------------|-----------|-------|
| Homepage | og-image.png | ✅ Keep | 1200×630 | Strong default |
| Election | roundtable-scene.png | Create new election-specific image | 1200×630 | "Vote. Bedford deserves a choice." style |
| Don Bot | og-image.png | Use don-bot.png at cropped 1200×630 | 1200×630 | Or create a Q&A-themed card |
| AI Transparency | don-bot.png (1536×1024) | Resize/recrop to 1200×630 or use og-image.png | 1200×630 | Fix dimensions |
| Podcasts | og-image.png (TODO) | Create Bedford Brief branded image | 1200×630 | Podcast cover art style |
| Blog post | 05062026-og.png | ✅ Keep | 1200×630 | Best OG on the site |
| Photo share pages | Portrait 1080×1350 | Keep for now; monitor Twitter rendering | 1080×1350 | Instagram-native format; Twitter crops center |
| Best-of-Bedford | og-image.png | Create a "Best of Bedford" series image | 1200×630 | Would differentiate the series visually |

### All Share Images Require
- Minimum 1200×630 for landscape
- Alt text describing the image
- `og:image:secure_url` matching `og:image` (currently missing on photo share pages)

---

## Legal / Disclaimer Recommendations

**⚠️ IMPORTANT: These are suggestions for attorney review. Do not treat as legal advice. New York election law requirements should be verified with a qualified election law attorney before campaign materials are finalized.**

### Issue 1: Campaign Disclaimer Language

New York Election Law §14-106 requires political communications to include a paid-by disclaimer. The exact requirements depend on whether the site constitutes "political advertising" under the statute and whether expenditures trigger reporting thresholds.

**For attorney review:** Suggested draft disclaimer (confirm language):

> Paid for by Don Scott for Bedford Town Supervisor.

Placement options:
- Site-wide footer (preferred)
- Sticky footer bar
- Individual pages where political advocacy occurs

---

### Issue 2: AI Transparency Disclaimer

The site already does excellent work on AI transparency. Consider adding a concise footer note:

> This site uses AI tools for research, drafting, and presentation. All positions attributed to Don Scott are human-reviewed and approved.

---

### Issue 3: Form / Chat Request Modal Disclosure

The "Chat with Don Scott" modal collects name, street address, email, and phone number. It has no disclosure about how data will be used.

**Suggested addition below the submit button:**
> Your information is used only to schedule a conversation with Don. It is not sold, shared, or used for fundraising.

---

### Issue 4: Privacy Policy

The site has no privacy policy page. Since the site uses GA4, Microsoft Clarity (session recording), and a form that collects PII, a basic privacy policy is recommended.

**Suggested approach:** A simple `/privacy` page. Needs attorney review for NY-specific requirements.

---

### Issue 5: No Donation / No Fundraising Clarity

The homepage does not explicitly state "this campaign is not soliciting donations." The spending tracker implies it, but a one-line statement in the footer or FAQ would help:

> This campaign is not fundraising. No donations accepted.

---

### Issue 6: Community Picks / Survey Disclosure

If the Community Picks or Voter Report Card pages collect data, they need disclosure about data use. Review each Best-of-Bedford interactive tool for data collection scope.

---

### Issue 7: Odds Page

The odds/election-night-speeches page is unusual and creative. A brief disclaimer is recommended:

> These speeches were written in advance as a transparency exercise. They do not constitute legal or official election predictions.

---

## Analytics & Verification Checklist

| Item | Status | Notes |
|------|--------|-------|
| GA4 (G-G7WVQR4MTH) | ✅ Present on homepage | Verify it's present on ALL pages including blog post, photo share pages |
| Microsoft Clarity (wis1l4ilnm) | ✅ Present on homepage | Same — verify all pages |
| Google Search Console verification | ⚠️ Needs human verification | Can be done via DNS TXT record (recommended for Cloudflare Pages) or GSC meta tag |
| Bing Webmaster Tools verification | ⚠️ Needs human verification | Add Bing meta tag or DNS method |
| sitemap.xml submitted to GSC | ⚠️ Needs human verification | Submit `https://www.donforbedford.com/sitemap.xml` in GSC |
| sitemap.xml submitted to Bing | ⚠️ Needs human verification | Submit in Bing Webmaster Tools |
| robots.txt confirmed by GSC | ⚠️ Needs human verification | Test via GSC robots.txt tester |
| GA4 on blog post | ⚠️ Partial read | Verify `G-G7WVQR4MTH` tag is in blog post |
| GA4 on photo share pages | ⚠️ Partial read | Verify tag is in all 12 photo pages |
| Microsoft Clarity consent | ⚠️ Review recommended | Clarity records sessions including form fills — confirm if privacy policy needed per your state/use case |
| GA4 consent mode | ⚠️ Review recommended | GA4 consent mode may be required depending on audience geography |
| GA4 data stream events | ⚠️ Needs human verification | Confirm form submission, chat request, Don Bot interactions fire events |

**To check if analytics tags are on all pages:**
```bash
grep -r "G-G7WVQR4MTH" pages/ photos/ blog/ --include="*.html" -l
grep -r "clarity" pages/ photos/ blog/ --include="*.html" -l
```

---

## Performance Checklist

### Image Optimization (Highest Impact)

| Issue | Files Affected | Current Size | Recommended Fix | Estimated Gain |
|-------|---------------|-------------|-----------------|----------------|
| PNG persona images not using WebP | 8 persona images | 2.3–2.6 MB each | Switch to existing `.webp` files (69–121 KB each) | 90%+ reduction |
| roundtable-scene.png | 1 file | 2.9 MB | Convert to WebP or use `<picture>` | 90%+ |
| Pet submission images | 5 files | 1.5–4.7 MB each | Convert to WebP | 80-90% |
| Social photo share images | 12 files | ~1.9–2.75 MB | Resize to 1080×1350 at 200–400 KB WebP | 80%+ |
| wallpaper.png | 1 file | 1.8 MB | OK for download, not for page display | — |
| og-image.png | 1 file | 2 MB | Compress PNG or WebP; 1200×630 og images should be <500 KB | 75%+ |

**Immediate action (no redesign needed):** The persona images already have `.webp` counterparts. Switch `<img src="...persona.png">` to `<img src="...persona.webp">` or use `<picture>` for format switching. Do this before any press hit.

---

### Critical Performance Fixes

1. **Add LCP hero preload** to `index.html` `<head>`:
   ```html
   <link rel="preload" as="image" href="/assets/img/home-hero-don-scott-bedford.jpg" fetchpriority="high">
   ```

2. **Add `loading="lazy"` and `decoding="async"** to all below-fold images:
   ```html
   <img src="..." alt="..." width="1200" height="800" loading="lazy" decoding="async">
   ```
   The hero image in `index.html` should use `loading="eager"` (or omit `loading` attribute — browser default for in-viewport).

3. **Explicit `width` and `height` on all `<img>` tags** — prevents layout shift (CLS). Verify all images have these attributes.

4. **No Google Fonts detected** — this is a performance win. Do not add Google Fonts; the existing system stack is fine.

5. **Inline CSS in `<style>` blocks** — the homepage has ~180 lines of page-specific CSS inline. This is already optimal for a static site (avoids a render-blocking external CSS request for page-specific styles). Keep as-is.

6. **`site.css` is the main stylesheet** — loaded as a render-blocking stylesheet. Consider adding `rel="preload"`:
   ```html
   <link rel="preload" href="/assets/css/site.css" as="style">
   <link rel="stylesheet" href="/assets/css/site.css">
   ```

7. **Webmanifest improvements:**
   Current `site.webmanifest` is missing:
   ```json
   {
     "start_url": "/",
     "lang": "en-US",
     "description": "The Uncampaign — Don Scott for Bedford Town Supervisor",
     "scope": "/"
   }
   ```

---

### GitHub Pages / Cloudflare Pages Constraints

- Cloudflare Pages automatically adds caching headers. No additional work needed for CDN caching.
- The `_redirects` file is properly formatted for Cloudflare Pages.
- No serverless function size concerns for `functions/result.js`.

---

## Broken Link Report

> **Note:** Full live link testing requires browser crawl. The following are confirmed from local file inspection. Live verification recommended via a tool like Screaming Frog or `wget --spider`.

### Confirmed Issues

| Link | Location | Issue | Fix |
|------|----------|-------|-----|
| `pages/rules.html` | Homepage nav | Relative path to `.html` file, not canonical URL | Change to `/pages/rules` |
| `pages/issues.html` | Homepage nav | Same | Change to `/pages/issues` |
| `pages/ideas.html` | Homepage nav | Same | Change to `/pages/ideas` |
| `pages/best-of-bedford.html` | Homepage nav | Same | Change to `/best-of-bedford` |
| `blog/` (relative) | Homepage footer | Relative path | Change to `/blog` |
| `pages/election.html` | Homepage footer | Relative path | Change to `/election` |
| `pages/ai.html` | Homepage footer | Relative path | Change to `/pages/ai` |

### Needs Human Verification

| Link | Location | Risk |
|------|----------|------|
| Substack subscribe URL | `data-subscribe-trigger` buttons | Verify Substack page exists and URL is correct |
| Google Apps Script endpoint | Chat request modal form submission | Verify Apps Script is live and accepting requests |
| Spotify/YouTube podcast links | `pages/podcasts.html` | Verify embeds are live |
| Facebook `https://www.facebook.com/donforbedford` | Footer, links page | Verify page is live and name matches |
| Instagram `https://www.instagram.com/donforbedford/` | Footer, links page | Verify handle is live |
| All `target="_blank"` links | Footer, social, blog | Verify all have `rel="noopener noreferrer"` — confirmed present on homepage social links |

### Links With Correct `rel` Attributes

✅ Homepage footer social links (`Facebook`, `Instagram`) — confirmed have `rel="noopener noreferrer"`.

---

## Duplicate / Cleanup Report

### Routing Inconsistency: 200 Rewrites vs. 301 Redirects

Some clean canonical URLs use 200 rewrites (ideal) and some use 301 redirects (creates redirect chains):

| Clean URL | Routing Method | Canonical in HTML | Issue |
|-----------|---------------|-------------------|-------|
| `/election` | 200 rewrite ✅ | `/election` | Consistent |
| `/blog` | 200 rewrite ✅ | `/blog` | Consistent |
| `/blog/the-danger-of-one-party-towns` | 200 rewrite ✅ | `/blog/the-danger-of-one-party-towns` | Consistent |
| `/best-of-bedford-community-picks` | 200 rewrite ✅ | (verify) | Consistent |
| `/best-of-bedford-code-red` | 200 rewrite ✅ | (verify) | Consistent |
| `/photos` | 301 → `/pages/photos` ⚠️ | `/photos` | Redirect chain; canonical mismatch with served URL |
| `/podcasts` | 301 → `/pages/podcasts` ⚠️ | `/podcasts` | Same |
| `/best-of-bedford` | 301 → `/pages/best-of-bedford` ⚠️ | `/best-of-bedford` | Same |
| `/best-of-bedford-fastest-typist` | 301 → `/pages/…` ⚠️ | (verify) | Same |
| All other `/best-of-bedford-*` | 301 redirects ⚠️ | (verify) | Same |
| `/bedford-how-to-guide` | 301 → `/pages/…` ⚠️ | (verify) | Same |

**Recommended fix:** Convert all 301 entries in `_redirects` to 200 rewrites, matching the pattern used for `/election` and `/blog`. This eliminates redirect chains and ensures the served URL matches the canonical.

```
# Change this:
/photos    /pages/photos    301

# To this:
/photos    /pages/photos    200
```

---

### Pages to Review for Cleanup

| Page | Issue | Recommendation |
|------|-------|----------------|
| `pages/template.html` | Placeholder content, no noindex | Add `noindex, nofollow` robots meta or delete file |
| `pages/minutes.html` | Legacy — redirects to /podcasts | If file still exists, confirm it has noindex or delete it |
| `admin/index.html` | ✅ Correctly noindexed | No action needed |

---

### Duplicate OG Images

- `roundtable-scene.png` is used as the OG image for both `/pages/issues` and `/election` — these should be different.
- 10+ pages share `og-image.png` — acceptable for a small campaign but creating differentiated images for high-traffic pages (Don Bot, Election, Podcasts) would improve social CTR.

---

## Content & Voice Recommendations

### Homepage
The copy is strong and on-brand. Two minor refinements:

1. **Eyebrow "Don Scott Presents"** on the hero — slightly self-promotional. Consider: `"Bedford Town Supervisor Race, 2026"` or no eyebrow at all. The H1 "The Uncampaign" carries the page.

2. **"Confused? Ask Don."** — excellent. Keep.

3. **Footer tagline "Less Campaign. More Bedford."** — strong. Keep.

---

### Rules Page

The page title "The Rulebook" is clear but generic. For press and sharing, consider using the full framing: **"What This Campaign Won't Do"** — which directly answers the most interesting question. The current OG title "The Rulebook | Don for Bedford" is too brief to stand alone as a shareable headline.

---

### Odds Page

The title metadata says "Bedford Town Supervisor Odds" — the word "Odds" may attract a wrong audience (bettors searching for political odds). Consider changing to "Election Night Speeches" or "Pre-Written Speeches" to set the right expectation. The concept itself is a Pollie-worthy creative tactic; the metadata should reinforce the creative angle.

---

### Blog Post

Strong writing. The description ("Local elections are moving onto crowded even-year ballots…") is accurate and compelling. One small note: the `meta name="keywords"` tag is outdated and ignored by all major search engines — remove it to clean up the head.

---

### Press Page

The description focuses on the mechanics ($49.99, no mailers) but could mention the AI angle more directly, as that's likely the most press-interesting hook. Consider: "A $49.99 local campaign that uses AI transparency, open spending records, and civic tech instead of consultants, mailers, or paid ads."

---

### Election Page

**The title and content reference "Ellen Calves" by name as the opponent.** Needs human verification: confirm this is the correct spelling of the incumbent's name and that the campaign is comfortable naming the opponent on the election information page.

---

### Don Bot

The page title "Ask Don | Don Bot for Bedford Town Supervisor" — two names for the same thing in the title tag. Simplify to either "Ask Don Bot — Q&A with Don Scott for Bedford" or "Don Bot — Ask Don Scott About Bedford Town Supervisor Race." Keep it one product name.

---

## Design System Recommendations

The design system is cohesive and well-executed. The CSS variable architecture, component consistency, and mobile-first approach are all strong. Specific gaps:

| Issue | Location | Fix |
|-------|----------|-----|
| `theme-color` inconsistency | `links.html` uses `#3E5240` | Change to `#4A5240` |
| `safari-pinned-tab.svg` color inconsistency | `links.html` uses `#3E5240` | Change to `#4A5240` |
| `og:site_name` inconsistency | `photos.html` uses "Don for Bedford" | Change to "Don Scott for Bedford" |
| Inline `<style>` on every page | All pages | Consistent — page-specific overrides are appropriate for static sites. No action needed. |
| `<title>` after OG tags | `press.html` | Move `<title>` before OG meta tags |
| TODO comment in production HTML | `podcasts.html` OG section | Remove TODO, assign or create a real OG image |
| Template placeholder exposed | `pages/template.html` | Noindex or delete |

The persona card flip effect, expense accordion, and responsive nav are well-implemented. No design system changes needed beyond the above.

---

## Final Launch Checklist

### Must Fix Before Launch (or Before Any Press Pitch)

- [ ] Add blog post to `sitemap.xml`
- [ ] Fix character encoding in `election.html` schema and OG alt text (`â€"` → `—`)
- [ ] Add `<meta name="robots" content="noindex, nofollow">` to `pages/template.html`
- [ ] Fix all internal navigation links to use canonical clean URLs (not `.html` paths)
- [ ] Add `og:image:secure_url` to all 12 photo share pages
- [ ] Add campaign financial disclaimer to footer (⚠️ attorney review first)
- [ ] Verify GA4 and Clarity tags are on ALL pages (blog post, photo pages, issue deep-dives)

### Should Fix Before Sharing Widely

- [ ] Swap persona image `<img src>` from `.png` to `.webp` (major performance win, WebP files already exist)
- [ ] Add `rel="preload"` for LCP hero image on homepage
- [ ] Add FAQPage schema to Don Bot page
- [ ] Fix `theme-color` and `safari-pinned-tab` on `links.html` (#3E5240 → #4A5240)
- [ ] Fix `og:site_name` on `photos.html` ("Don for Bedford" → "Don Scott for Bedford")
- [ ] Move `<title>` before OG tags in `press.html`
- [ ] Convert 301 redirects in `_redirects` to 200 rewrites for `/photos`, `/podcasts`, `/best-of-bedford`, and all `/best-of-bedford-*` pages
- [ ] Remove TODO comment from `podcasts.html` OG section; assign or create Bedford Brief OG image
- [ ] Remove `meta name="keywords"` from blog post
- [ ] Add `dateModified` and `image` fields to Article schema in blog post
- [ ] Add BreadcrumbList schema to photo share pages
- [ ] Fix Odds page title (79 chars → trim to under 65)
- [ ] Improve Blog Index title ("Blog | Don Scott for Bedford" → "The Uncampaign Blog | Don Scott for Bedford Town Supervisor")
- [ ] Add `start_url`, `lang`, `description`, `scope` fields to `site.webmanifest`
- [ ] Add plain-language "No donations accepted" note somewhere visible

### Nice Polish

- [ ] Create election-specific OG image (1200×630) for `/election` page
- [ ] Create Bedford Brief OG image for `/podcasts`
- [ ] Add `article:modified_time` to blog post OG meta
- [ ] Add blog post to `llms.txt` under Key Pages
- [ ] Verify all external links have `rel="noopener noreferrer"` on `target="_blank"` links
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Add Google Search Console and Bing Webmaster verification (DNS TXT method recommended)
- [ ] Review GA4 data stream events for form submissions and Don Bot interactions
- [ ] Add form data disclosure to chat request modal
- [ ] Add basic privacy policy page
- [ ] Consider creating distinct OG images for Don Bot and Best of Bedford hub
- [ ] Add `loading="lazy" decoding="async"` to all below-fold images
- [ ] Consider adding `Person` schema enhancements (memberOf, hasOccupation)

### Pollie / Case Study Evidence to Preserve

- [ ] Screenshot sitemap.xml with all 54 URLs as evidence of launch-day completeness
- [ ] Screenshot llms.txt — document this as a first-mover AI transparency tactic
- [ ] Screenshot schema validation passing in Google Rich Results Test
- [ ] Screenshot GA4 setup and any event tracking (record "first campaign session" date)
- [ ] Screenshot blog post metadata and Article schema — document as content strategy
- [ ] Screenshot spending tracker at every material change ($0 → $13.12 → final)
- [ ] Screenshot chat request modal — document form UX with zero ad spend
- [ ] Screenshot robots.txt design (allows AI for answers, blocks AI training) — document the deliberate decision
- [ ] Screenshot photo share page OG implementation (portrait photos with per-page social metadata)
- [ ] Record any Pollie-relevant press mentions with date/URL/screenshot

---

## Implementation Plan for Second Claude Code Pass

Run these in priority order in a follow-up session:

**Pass 2A — Critical fixes (30 min):**
1. Add blog post URL to `sitemap.xml`
2. Fix encoding in `election.html` schema and alt text
3. Add noindex to `pages/template.html`
4. Fix all internal nav and footer links across every HTML page

**Pass 2B — Performance (1–2 hrs):**
1. Audit every `<img>` tag; swap `.png` → `.webp` where WebP counterparts exist
2. Add hero image preload to `index.html`
3. Audit lazy/eager loading across all pages

**Pass 2C — Schema & Metadata (1–2 hrs):**
1. Add FAQPage schema to Don Bot (requires reading all Q&A pairs)
2. Improve blog post Article schema
3. Add BreadcrumbList to photo share pages
4. Fix theme-color/og:site_name inconsistencies
5. Fix press.html title tag order
6. Fix Odds page title length

**Pass 2D — Routing & Redirects (30 min):**
1. Convert 301s to 200 rewrites in `_redirects`
2. Verify canonical URLs match served URLs after redirect update

**Pass 2E — Legal & Compliance (30 min + attorney review):**
1. Add disclaimer to footer
2. Add data use disclosure to chat modal
3. Stub privacy policy page

---

*Audit complete. Report saved as `SITE-WIDE-AUDIT.md`. No site files were modified during this pass.*
