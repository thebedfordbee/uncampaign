# GA4 Setup Blueprint — Don Scott for Bedford / The Uncampaign

**Prepared:** May 6, 2026  
**Site:** https://www.donforbedford.com  
**GA4 Property:** `G-G7WVQR4MTH` (confirmed live on all 52 pages)  
**Clarity Property:** `wis1l4ilnm` (confirmed live on all 52 pages)  
**Platform:** Cloudflare Pages / Static HTML  
**GTM:** Not installed — all tracking is direct `gtag.js`

---

## Current State Assessment

**What's already working:**
- GA4 base tag (`G-G7WVQR4MTH`) is installed on every page via inline `<script>` blocks
- Microsoft Clarity (`wis1l4ilnm`) is installed site-wide for session recordings and heatmaps
- GA4 Enhanced Measurement is likely collecting: page views, scrolls (90% depth only), outbound link clicks, and site search (if configured)

**What is missing:**
- No custom events — zero. Every meaningful interaction (modal opens, form submissions, card flips, CTA clicks, tool uses) is invisible in GA4 right now
- No key events / conversions configured in GA4 admin
- No custom dimensions
- No audiences defined
- No UTM parameters in use on any outbound shares
- No Looker Studio connection
- No custom reports or explorations built

**The single most important thing to do first:**  
Open GA4 → Admin → Data Streams → your web stream → Enhanced Measurement, and confirm these are ON: Scrolls, Outbound clicks, Site search, Video engagement, File downloads. This costs zero effort and turns on meaningful automatic tracking immediately.

---

## 1. Executive Summary

This is a low-traffic, high-meaning site. You are not trying to optimize ad spend or maximize conversion funnels in the commercial sense. You are trying to answer: *Are real Bedford residents finding this, engaging with it, and doing something — a conversation request, a survey, a vote, an email sign-up — that proves the campaign is working?*

The right GA4 setup for this site is simple, honest, and focused:

1. **Confirm Enhanced Measurement is on** — outbound clicks and scroll depth are already collected automatically once enabled
2. **Add ~15 custom events** covering the interactions that actually matter: chat request submissions, subscribe modal opens, civic tool uses, and CTA clicks
3. **Mark 4–5 of those as Key Events** (GA4's term for conversions) so you have a clear signal of meaningful engagement
4. **Build one Looker Studio dashboard** that answers "Is this working?" without requiring you to learn GA4
5. **Adopt a UTM naming convention** so you know where traffic is actually coming from when you share links

The entire setup takes about half a day in GA4 admin and one afternoon of code changes. No paid tools. No GTM needed. No vendor.

---

## 2. Measurement Goals

These are the 7 questions GA4 should answer for this campaign. Every event, report, and dashboard below traces back to one of these.

| # | Question | Why it matters |
|---|---|---|
| 1 | Are real people having real conversations with Don? | Chat request submissions are the campaign's primary conversion — the whole "Front Porch" model depends on it |
| 2 | Are people signing up to stay connected? | Substack list growth is the campaign's owned channel — the one thing you control long-term |
| 3 | Are people using the civic tools, or just visiting the homepage? | The Uncampaign's value proposition is that it *does useful things*. Tool engagement proves the model |
| 4 | Which pages create deep engagement vs. shallow visits? | A visitor who reads Rules → flips all the persona cards → clicks an issue deep-dive is fundamentally different from someone who bounced after 3 seconds |
| 5 | Where is traffic actually coming from? | Without UTMs, GA4 will show "direct" for almost everything shared on mobile. You need real source data to know what's working |
| 6 | Are Bedford-area residents finding this, or is it mostly out-of-town curiosity? | Local engagement is what matters. A thousand views from political Twitter is worth less than 50 views from Katonah |
| 7 | Are there press spikes, and what pages do reporters land on? | A single good press hit can be documented with session data — important for the Pollie case study |

---

## 3. Recommended Events

### How to read this table

- **event_name** — use this exactly, lowercase with underscores
- **trigger** — what user action fires it
- **parameters** — extra data to include
- **key event?** — whether to mark as a conversion in GA4 Admin

GA4 automatically collects: `page_view`, `session_start`, `first_visit`, `scroll` (90%), `click` (outbound links via Enhanced Measurement).

The events below are custom events you add.

---

### Group A — Primary Conversions (most important)

| event_name | trigger | parameters | key event? |
|---|---|---|---|
| `chat_request_submit` | User successfully submits the "Chat with Don" 3-step form | `meeting_format` (virtual/in_person), `time_preference` (morning/afternoon/evening) | **YES** |
| `subscribe_modal_open` | User clicks any Subscribe button, opening the Substack modal | `trigger_location` (nav/footer/rules/hero) | **YES** |
| `subscribe_modal_close` | User closes the Subscribe modal without submitting | `trigger_location` | No |

> **Note on subscribe_submit:** The Substack widget is an embedded iframe from Substack's domain. GA4 cannot see inside it. `subscribe_modal_open` is the best measurable signal. Actual subscriber counts live in your Substack dashboard.

---

### Group B — Civic Tool Engagement (the campaign's proof points)

| event_name | trigger | parameters | key event? |
|---|---|---|---|
| `chat_request_open` | User clicks "Chat with Don" or "Request a Conversation," opening the modal | `trigger_location` (hero/nav/rules/links) | No |
| `chat_request_step` | User advances to step 2 or 3 of the chat modal | `step_number` (2 or 3) | No |
| `don_bot_page_view` | User visits `/pages/don-bot.html` | *(page_view handles this)* | No |
| `voter_lookup_performed` | User submits the Voter Report Card lookup form | `lookup_type` if applicable | **YES** |
| `idea_voted` | User casts a vote in the Ideas ranking tool | `idea_title` | **YES** |
| `quiz_completed` | User reaches the end of the Code Red quiz | `score` if available | No |
| `community_pick_submitted` | User submits a Community Picks survey response | — | No |
| `typing_challenge_completed` | User finishes the typing challenge | `wpm` if available | No |
| `pet_voted` | User votes in the cutest pet contest | `pet_name` | No |
| `voter_report_card_page_view` | User visits the Voter Report Card page | *(page_view handles this)* | No |

---

### Group C — Content & Deep Engagement

| event_name | trigger | parameters | key event? |
|---|---|---|---|
| `rule_card_expanded` | User clicks to expand a rule card | `rule_number` (1–10), `rule_name` | No |
| `rule_cta_clicked` | User clicks the "Do this instead" CTA inside an expanded rule | `rule_name`, `cta_destination` | No |
| `persona_card_flipped` | User clicks to flip a persona card on the Issues page | `persona_name` | No |
| `issue_deep_dive_clicked` | User clicks into an issue detail page from the Issues hub | `issue_name` | No |
| `spending_detail_expanded` | User expands the spending accordion on the homepage | — | No |
| `ai_tool_expanded` | User expands a tool section on the AI Transparency page | `tool_name` | No |
| `instruction_set_viewed` | User opens the public roundtable instruction panel | — | No |
| `instruction_set_copied` | User clicks "Copy All" on any instruction set | `tool_name` | No |
| `article_summary_toggled` | User opens the AI summary panel on a blog article | `article_title` | No |
| `article_shared` | User clicks the Share button on a blog article | `share_method` (facebook/twitter/email/sms/copy), `article_title` | No |
| `photo_lightbox_opened` | User opens a photo in the lightbox | `photo_label` if available | No |
| `blog_search_used` | User types in the blog search box and gets results | `search_term` | No |
| `podcast_section_viewed` | User visits the Podcasts/Minutes page | *(page_view handles this)* | No |

---

### Group D — Navigation & Outbound

> GA4 Enhanced Measurement already collects outbound link clicks automatically if enabled. These custom events add *context* to those clicks.

| event_name | trigger | parameters | key event? |
|---|---|---|---|
| `social_link_clicked` | User clicks Facebook or Instagram link | `platform` (facebook/instagram), `trigger_location` | No |
| `links_page_shared` | User triggers the native share dialog on links.html | `share_method` (native/copy) | No |
| `nav_feature_clicked` | User clicks a main feature card on the homepage | `card_label` (Rules/Issues/Ideas/BestOf/DonBot/Photos) | No |
| `wallpaper_downloaded` | User clicks "Download Wallpaper" from Rules page | — | No |
| `spca_link_clicked` | User clicks the SPCA donation link from Rules page | — | No |
| `odds_page_viewed` | User visits `/pages/odds` | *(page_view handles this, but flag as notable)* | No |
| `election_info_viewed` | User visits `/pages/election` | *(page_view handles this)* | No |
| `press_page_viewed` | User visits `/pages/press` | *(page_view handles this)* | No |

---

### Group E — Scroll Depth (supplementing Enhanced Measurement's 90% default)

GA4 Enhanced Measurement fires one `scroll` event at 90% depth. For long pages on this site, you also want earlier milestones.

| event_name | trigger | parameters | key event? |
|---|---|---|---|
| `scroll_milestone` | User scrolls to 25%, 50%, or 75% of page height | `milestone` (25/50/75), `page_path` | No |

> Implement this with an `IntersectionObserver` or a scroll listener in `site.js`. Only fire each milestone once per page load.

---

## 4. Key Events / Conversions

Mark **only these 4** as Key Events in GA4 (Admin → Events → toggle "Mark as key event"). Do not mark everything — it dilutes the signal.

| Event | Why it's a conversion |
|---|---|
| `chat_request_submit` | This is the campaign's primary action. Someone gave Don their name, address, and contact info and asked to talk. That's the whole model. |
| `subscribe_modal_open` | Strongest measurable signal of subscribe intent given Substack iframe limitation. Real list growth lives in Substack but this is your GA4 proxy. |
| `voter_lookup_performed` | The Voter Report Card is a civic tool with direct local value. A lookup means Bedford is real to this person. |
| `idea_voted` | Voting is participation. It means someone engaged with the campaign's ideas, not just glanced at it. |

**Do not convert:** rule_card_expanded, outbound clicks, scroll milestones, page views. These are engagement indicators, not conversions.

---

## 5. Audiences

Create these audiences in GA4 (Admin → Audiences → New Audience). They are simple, a novice can build them from the UI, and they tell you who your most valuable visitors actually are.

### Audience 1: Highly Engaged Visitors
**Definition:** Session duration > 120 seconds AND (scrolled 75%+ on any page OR expanded any card OR used any civic tool)  
**Build with:** `engagement_time_msec > 120000` AND `event_name` contains `_expanded` OR `_flipped` OR `_performed` OR `_voted`  
**Use:** Understand what your best visitors look like. Compare their traffic sources vs. bounce visitors.

### Audience 2: Conversation Requesters
**Definition:** Fired `chat_request_submit`  
**Build with:** `event_name = chat_request_submit`  
**Use:** Your highest-value audience. How did they arrive? What did they do before submitting?

### Audience 3: Subscribe Intenders
**Definition:** Fired `subscribe_modal_open` but NOT `chat_request_submit`  
**Use:** People interested enough to open the subscribe modal. Track whether they eventually return and convert to a conversation request.

### Audience 4: Civic Tool Users
**Definition:** Fired any of: `voter_lookup_performed`, `idea_voted`, `quiz_completed`, `community_pick_submitted`, `pet_voted`  
**Use:** The "useful tools" cohort. These visitors validated the Uncampaign model.

### Audience 5: Returning Visitors
**Definition:** `session_number > 1`  
**Use:** People who came back. In a campaign, repeat visits are rare and meaningful. What brought them back?

### Audience 6: Local Interest (Bedford Area)
**Definition:** City contains "Bedford" OR "Katonah" OR "Bedford Hills" OR "Pound Ridge" OR "Armonk" OR "Mount Kisco"  
**Build with:** Geography dimension: City dimension filter  
**Use:** The only visitors who can actually vote for Don. Check this monthly — what percentage of your traffic is local?

### Audience 7: Press / Referral Visitors
**Definition:** Session source matches known press outlets (bedfordbee.com, lohud.com, patch.com, etc.) OR medium = referral  
**Use:** Identify press spikes. Capture screenshots when referral traffic surges from a specific domain.

---

## 6. Reports

### Reports to monitor regularly (built-in GA4 Reports)

**Traffic Acquisition** (Reports → Acquisition → Traffic acquisition)  
- Primary dimension: Session default channel group  
- Secondary dimension: Session source / medium  
- Metrics to watch: Sessions, Engaged sessions, Engagement rate, Key events  
- **What to look for:** "Direct" traffic is often misattributed mobile shares. After you add UTMs, this should shrink. "Organic Search" showing up means Google is finding you. Referral spikes = press.

**Engagement → Pages and screens** (Reports → Engagement → Pages and screens)  
- Dimension: Page path and screen class  
- Metrics: Views, Unique page views, Average engagement time, Scrolled (Enhanced Measurement)  
- **What to look for:** Which pages are people spending time on? Which get views but no engagement time?

**Engagement → Events** (Reports → Engagement → Events)  
- After you add custom events, this becomes your primary dashboard  
- Sort by event count to see what's most popular  
- **What to look for:** `chat_request_submit` count (your most important number), `subscribe_modal_open`, tool engagement events

**Engagement → Key events** (Reports → Engagement → Key events / Conversions)  
- Shows your 4 marked key events as a group  
- Add dimension: Session source / medium to see which sources drive conversions

**Demographics → Overview** (Reports → Demographics)  
- City dimension is your local geography check  
- **What to look for:** What percentage of users are from Bedford-area zip codes and cities?

### Custom Reports to build (Reports → Library → Create new report)

**Report: Civic Tool Usage**  
- Events: `voter_lookup_performed`, `idea_voted`, `quiz_completed`, `community_pick_submitted`, `pet_voted`, `instruction_set_copied`  
- Dimension: Page path  
- Metric: Event count, Users  
- Purpose: Single view of all tool engagement

**Report: CTA Performance**  
- Events: `chat_request_open`, `chat_request_submit`, `subscribe_modal_open`, `rule_cta_clicked`, `social_link_clicked`, `nav_feature_clicked`  
- Dimension: Event name, event parameter `trigger_location`  
- Metric: Event count  
- Purpose: Which CTAs actually get clicked? Which are ignored?

---

## 7. Explorations

Build these in GA4's Explore section (Explore → Template gallery). Each uses the "Free form" or "Funnel exploration" template unless noted.

---

### Exploration 1: Conversation Request Funnel

**Type:** Funnel exploration  
**Question:** How many visitors progress through the chat request flow, and where do they drop off?

| Step | Event | Step name |
|---|---|---|
| 1 | `page_view` (any page) | Site visit |
| 2 | `chat_request_open` | Opened the chat modal |
| 3 | `chat_request_step` (step_number = 2) | Reached step 2 |
| 4 | `chat_request_step` (step_number = 3) | Reached step 3 |
| 5 | `chat_request_submit` | Submitted |

**Dimensions:** Session default channel group (segment by traffic source)  
**Insight:** Where does the biggest drop happen? Between open and step 2 means the form is confusing. Between step 3 and submit means something technical.

---

### Exploration 2: Traffic Source Quality

**Type:** Free form  
**Question:** Which traffic sources bring engaged visitors, not just visits?

**Rows:** Session source / medium  
**Columns:** Sessions, Engaged sessions, Engagement rate, Average engagement time, Key events, Key events / session  
**Sort:** Key events / session descending  
**Insight:** A source with high sessions but 0 key events is noise. A source with few sessions but high engagement rate is gold.

---

### Exploration 3: Content Depth (Page-by-Page Engagement)

**Type:** Free form  
**Question:** Which pages are people actually reading, and which are they bouncing from?

**Rows:** Page path and screen class  
**Columns:** Views, Users, Average engagement time per session, Scrolled users (Enhanced Measurement 90%), Bounce rate  
**Filter:** Exclude admin pages, exclude direct photo sub-pages  
**Sort:** Average engagement time descending  
**Insight:** Any page under 10 seconds average engagement time is either a pass-through or a bounce. Pages over 60 seconds are being read.

---

### Exploration 4: CTA Performance Matrix

**Type:** Free form  
**Question:** Which CTAs are actually clicked, and which are decorative?

**Rows:** Event name (filter to: `chat_request_open`, `subscribe_modal_open`, `rule_cta_clicked`, `nav_feature_clicked`, `social_link_clicked`, `instruction_set_copied`, `ai_tool_expanded`, `rule_card_expanded`)  
**Columns:** Event count, Users who triggered event, Event count / total users  
**Breakout dimension:** `trigger_location` parameter (requires custom dimension setup — see Section 10)  
**Insight:** If `rule_cta_clicked` has 0 events, people expand rule cards but ignore the CTAs inside them. If `subscribe_modal_open` events are 10x `chat_request_submit`, the subscribe flow is the easier ask.

---

### Exploration 5: Returning Visitor Behavior

**Type:** Free form  
**Segment:** Apply the "Returning Visitors" audience  
**Question:** What do people do on their second visit? Are they deeper or the same?

**Rows:** Page path  
**Columns:** Views, Average engagement time, Key events  
**Comparison:** No segment (all visitors) vs. Returning Visitors segment  
**Insight:** If returners go straight to tools or the contact modal, they arrived the first time curious and came back ready to act.

---

### Exploration 6: Civic Tool Engagement Path

**Type:** Path exploration  
**Question:** After using a civic tool, where do visitors go next?

**Starting point:** Any of: `voter_lookup_performed`, `idea_voted`, `quiz_completed`  
**Forward path:** Next 3–5 steps  
**Insight:** Do tool users go to the homepage and submit a chat request? Or do they leave? This tells you if civic tools are a gateway to engagement or a dead end.

---

### Exploration 7: Local vs. Out-of-Town Traffic

**Type:** Free form  
**Question:** What percentage of traffic is actually from Bedford-area towns?

**Rows:** City  
**Columns:** Users, Sessions, Engaged sessions, Key events  
**Filter:** Country = United States  
**Sort:** Key events descending  
**Insight:** Filter by city to group: Bedford, Katonah, Bedford Hills, Pound Ridge, Armonk, Mount Kisco. Compare this group's key events vs. all other cities.

---

### Exploration 8: Press Spike Analysis

**Type:** Free form  
**Question:** When a press spike happens, which pages got the traffic and did it convert?

**Rows:** Session source / medium  
**Columns:** Sessions, Page views (via page path dimension), Key events  
**Date filter:** Set to the day/week of a known press mention  
**Segment:** Filter to medium = referral  
**Insight:** After a press mention, pull this immediately. Screenshot it. Note the referring domain, landing pages, and whether any key events fired. This is Pollie evidence.

---

## 8. Dashboard / Looker Studio Recommendation

**Connect GA4 to Looker Studio:** Go to [Looker Studio](https://lookerstudio.google.com) → Create → Data source → Google Analytics 4 → select property `G-G7WVQR4MTH`. It's free.

### Dashboard Layout: "Is This Working?"

Design this as a single-page, top-to-bottom layout. No tabs. No complexity.

---

**Section 1 — The Numbers That Matter (Scorecards at top)**

| Scorecard | Metric | Plain-English Label |
|---|---|---|
| Chat requests submitted | Key event: chat_request_submit | "People who asked to talk to Don" |
| Subscribe modal opens | Key event: subscribe_modal_open | "People who tried to sign up" |
| Idea votes cast | Key event: idea_voted | "People who voted on an idea" |
| Voter lookups performed | Key event: voter_lookup_performed | "People who used the voter tool" |
| Total users (last 30 days) | Users metric | "Total visitors this month" |
| Bedford-area users | Users filtered by city | "Visitors from Bedford area" |

Add a date range filter at the top that controls all scorecards.

---

**Section 2 — Where Traffic Is Coming From (Bar chart)**

- Chart type: Bar chart
- Dimension: Session default channel group
- Metric: Sessions
- Secondary metric: Key events
- Title: "Where visitors come from — and which sources actually do something"

---

**Section 3 — Which Pages Are People Reading? (Table)**

- Chart type: Table with bars
- Dimension: Page path
- Metrics: Views, Average engagement time per session
- Sort: Average engagement time descending
- Limit: Top 15 pages
- Title: "Pages people actually spend time on"

---

**Section 4 — Civic Tool Engagement (Horizontal bar chart)**

- Chart type: Bar chart (horizontal)
- Dimension: Event name
- Filter: Event name IN (voter_lookup_performed, idea_voted, quiz_completed, community_pick_submitted, pet_voted, instruction_set_copied, don_bot_page_view)
- Metric: Event count
- Title: "Civic tools: who's using what"

---

**Section 5 — Traffic Over Time (Line chart)**

- Chart type: Time series (line)
- Dimension: Date
- Metric: Sessions
- Secondary metric: Key events
- Granularity: Day (weekly if you want smoother line)
- Title: "Visitor activity over time — look for spikes after sharing or press coverage"

---

**Section 6 — Geography Check (Map + Table)**

- Chart type: Geo map (United States, drill to state/city level)
- Dimension: City
- Metric: Users
- Table below with: City, Users, Key events
- Filter: Country = United States
- Title: "Where are visitors located — Bedford-area users are the ones who can vote"

---

**Interpretation notes to add as text boxes in Looker Studio:**

- "Chat requests are the most important number. Even 5 is significant for a campaign this size."
- "Subscribe modal opens don't mean subscriptions — check your Substack dashboard for actual subscriber count."
- "Bedford-area traffic is more valuable than any other metric on this page."
- "A spike in sessions with zero key events usually means a share link went somewhere that wasn't Bedford."

---

## 9. UTM Strategy

Every link you share externally should have UTM parameters so GA4 can tell you exactly where traffic came from. Without them, mobile app shares (Instagram DMs, text messages) show up as "direct" in GA4, which is meaningless.

### Naming Convention

```
utm_source  = where the link lives (platform name)
utm_medium  = what kind of channel it is
utm_campaign = always: uncampaign-2026
utm_content  = what specific thing was shared (optional but useful)
```

### Standard Source/Medium Pairs

| Source | Medium | When to use |
|---|---|---|
| facebook | social | Any Facebook post or profile link |
| instagram | social | Any Instagram post, story, or bio link |
| substack | newsletter | Links inside Substack email issues |
| email | email | Direct emails Don sends personally |
| lohud | press | If lohud.com or Journal News covers it |
| patch | press | If Patch.com covers it |
| bedfordbee | press | If The Bedford Bee links to it |
| westchestermag | press | If Westchester Magazine links to it |
| qr | print | Any QR code on physical material |
| text | sms | Links sent in text messages |
| organic | social | Organic posts without a paid boost |

### Example URLs

```
# Facebook post sharing the homepage
https://www.donforbedford.com/?utm_source=facebook&utm_medium=social&utm_campaign=uncampaign-2026

# Instagram bio link (use this in your link-in-bio)
https://www.donforbedford.com/?utm_source=instagram&utm_medium=social&utm_campaign=uncampaign-2026

# Substack email newsletter link to the Issues page
https://www.donforbedford.com/pages/issues?utm_source=substack&utm_medium=newsletter&utm_campaign=uncampaign-2026

# Direct email from Don linking to the chat modal page
https://www.donforbedford.com/?utm_source=email&utm_medium=email&utm_campaign=uncampaign-2026&utm_content=personal-email

# Press coverage link in a pitch to lohud
https://www.donforbedford.com/pages/ai?utm_source=lohud&utm_medium=press&utm_campaign=uncampaign-2026

# QR code pointing to the links page
https://www.donforbedford.com/links?utm_source=qr&utm_medium=print&utm_campaign=uncampaign-2026

# Instagram post sharing the Best of Bedford hub
https://www.donforbedford.com/pages/best-of-bedford?utm_source=instagram&utm_medium=social&utm_campaign=uncampaign-2026&utm_content=bestof-may2026
```

### Practical rules
- Keep `utm_campaign` identical everywhere: `uncampaign-2026`
- `utm_content` is optional — use it when you're sharing the same link in two different places in the same week and want to compare them
- UTM parameters are case-sensitive. Always use lowercase.
- Build a small cheat sheet or Google Sheet with these pre-built URLs ready to copy-paste
- Your links.html page and the `/links` URL should have an Instagram UTM baked in since that's where Instagram followers land

---

## 10. Implementation Notes

### Current Implementation Status

The site uses inline `<script>` blocks in every HTML file with this standard pattern:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-G7WVQR4MTH"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-G7WVQR4MTH');
</script>
```

This is correct and present on all 52 pages. **Do not change this.**

### Step 1 — Enable Enhanced Measurement (zero code, do this today)

1. Go to GA4 → Admin → Data Streams → your web stream → Enhanced Measurement
2. Toggle ON: Scrolls, Outbound clicks, Site search, Video engagement, File downloads
3. This immediately starts collecting scroll depth (90%) and outbound click data

### Step 2 — Create a New File: `assets/js/analytics.js`

Rather than modifying every HTML file, add a shared analytics file that gets loaded by site.js (which already loads on every page). Add this one line to the bottom of `assets/js/site.js`:

```js
// This line is not needed — instead add the script tag to the shared template
```

Actually, since the site is static HTML with no shared template system, the cleanest approach is:

**Option A (recommended): Add `<script src="/assets/js/analytics.js">` to the `<head>` of every page** alongside the existing GA4 inline script. Since there are ~52 pages, this is a one-time find-and-replace operation on the codebase.

The `analytics.js` file handles all custom event tracking without touching individual page logic.

**Option B:** Extend `assets/js/site.js` with event tracking since it already loads on every page.

### analytics.js — Starter Implementation

Create `assets/js/analytics.js` with the following content. This handles global events (elements present on every page). Page-specific events (like idea_voted or voter_lookup_performed) belong in their respective page JS files.

```javascript
(function () {
  'use strict';

  // Guard: only run after gtag is available
  if (typeof gtag !== 'function') return;

  // ─── Utility ────────────────────────────────────────────────────────────────

  function track(event_name, params) {
    gtag('event', event_name, params || {});
  }

  // ─── Subscribe Modal ─────────────────────────────────────────────────────────

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-subscribe-trigger]');
    if (trigger) {
      var location = trigger.dataset.triggerLocation ||
        (trigger.closest('nav') ? 'nav' :
         trigger.closest('footer') ? 'footer' : 'page');
      track('subscribe_modal_open', { trigger_location: location });
    }
  });

  // ─── Chat Request Modal ───────────────────────────────────────────────────────

  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-chat-req-open]');
    if (opener) {
      var location = opener.dataset.triggerLocation ||
        (opener.closest('nav') ? 'nav' :
         opener.closest('footer') ? 'footer' : 'page');
      track('chat_request_open', { trigger_location: location });
    }
  });

  // Listen for step advancement (chat-modal.js must dispatch a custom event)
  document.addEventListener('chatModalStep', function (e) {
    track('chat_request_step', { step_number: e.detail.step });
  });

  // Listen for successful submission (chat-modal.js must dispatch a custom event)
  document.addEventListener('chatModalSuccess', function (e) {
    track('chat_request_submit', {
      meeting_format: e.detail.meetingFormat || 'unknown',
      time_preference: e.detail.timePreference || 'unknown'
    });
  });

  // ─── Rule Cards (rules.html) ──────────────────────────────────────────────────

  document.addEventListener('click', function (e) {
    var ruleToggle = e.target.closest('[data-rule-toggle]');
    if (ruleToggle) {
      var isOpen = ruleToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        track('rule_card_expanded', {
          rule_number: ruleToggle.dataset.ruleNumber || 'unknown',
          rule_name: ruleToggle.dataset.ruleName || 'unknown'
        });
      }
    }
  });

  // ─── Nav Feature Cards (homepage) ────────────────────────────────────────────

  document.addEventListener('click', function (e) {
    var featureCard = e.target.closest('[data-feature-card]');
    if (featureCard) {
      track('nav_feature_clicked', {
        card_label: featureCard.dataset.featureCard || featureCard.innerText.trim().substring(0, 50)
      });
    }
  });

  // ─── Social Links ─────────────────────────────────────────────────────────────

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href*="facebook.com"], a[href*="instagram.com"]');
    if (link) {
      var href = link.href || '';
      var platform = href.includes('facebook') ? 'facebook' : 'instagram';
      var location = link.closest('nav') ? 'nav' :
                     link.closest('footer') ? 'footer' : 'page';
      track('social_link_clicked', { platform: platform, trigger_location: location });
    }
  });

  // ─── Scroll Milestones ────────────────────────────────────────────────────────
  // GA4 Enhanced Measurement fires scroll at 90%. This adds 25%, 50%, 75%.

  var milestones = [25, 50, 75];
  var fired = {};

  function onScroll() {
    var scrolled = window.scrollY + window.innerHeight;
    var total = document.documentElement.scrollHeight;
    var pct = Math.round((scrolled / total) * 100);
    milestones.forEach(function (m) {
      if (pct >= m && !fired[m]) {
        fired[m] = true;
        track('scroll_milestone', {
          milestone: m,
          page_path: window.location.pathname
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ─── Spending Accordion (homepage) ───────────────────────────────────────────

  document.addEventListener('click', function (e) {
    var spendingToggle = e.target.closest('[data-spending-toggle]');
    if (spendingToggle) {
      track('spending_detail_expanded', {});
    }
  });

  // ─── Instruction Set Copy (issues.html, ai.html) ─────────────────────────────

  document.addEventListener('click', function (e) {
    var copyBtn = e.target.closest('[data-copy-instruction]');
    if (copyBtn) {
      track('instruction_set_copied', {
        tool_name: copyBtn.dataset.toolName || 'unknown'
      });
    }
  });

  // ─── AI Tool Expanded (ai.html) ──────────────────────────────────────────────

  document.addEventListener('click', function (e) {
    var aiToggle = e.target.closest('[data-ai-tool-toggle]');
    if (aiToggle) {
      var isOpen = aiToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        track('ai_tool_expanded', {
          tool_name: aiToggle.dataset.aiToolName || aiToggle.innerText.trim().substring(0, 50)
        });
      }
    }
  });

})();
```

> **Important note on custom events from modals:** The events for `chat_request_step` and `chat_request_submit` require that `chat-modal.js` dispatch `CustomEvent` objects. Add `document.dispatchEvent(new CustomEvent('chatModalStep', { detail: { step: 2 } }))` when the user advances, and `document.dispatchEvent(new CustomEvent('chatModalSuccess', { detail: { meetingFormat, timePreference } }))` on successful form submission. This keeps tracking decoupled from UI logic.

### Step 3 — GA4 Admin Configuration (no code)

In GA4 → Admin:

1. **Mark Key Events:** Admin → Events → find each of the 4 key events listed in Section 4 → toggle "Mark as key event"
2. **Create Custom Dimensions:** Admin → Custom definitions → Custom dimensions → Create dimension  
   - `trigger_location` (Event scope) — for modal/CTA tracking  
   - `meeting_format` (Event scope) — for chat request analysis  
   - `time_preference` (Event scope) — for chat request analysis  
   - `milestone` (Event scope) — for scroll depth  
   - `platform` (Event scope) — for social link tracking  
   - `rule_name` (Event scope) — for rules engagement  
   - `tool_name` (Event scope) — for AI tool tracking  
3. **Create Audiences:** Admin → Audiences → New Audience (see Section 5)
4. **Set data retention to 14 months:** Admin → Data Settings → Data Retention → set to 14 months (covers the full campaign + post-election analysis)

### Rollback Path

The `analytics.js` file is additive — it calls `gtag()` but does not modify any DOM elements or touch the existing tracking snippet. If anything breaks:

1. Remove the `<script src="/assets/js/analytics.js">` tag from all pages
2. The site returns to baseline GA4 page-view-only tracking immediately

No existing functionality can be broken by this file.

### Existing GA4 Tag Health Check

Run this in your browser console on any page to confirm the tag is loading:

```javascript
console.log(typeof gtag, window.dataLayer ? window.dataLayer.length + ' items in dataLayer' : 'no dataLayer');
```

Expected output: `"function"  4 items in dataLayer` (or similar positive number).

---

## 11. Privacy / Campaign Ethics Note

This campaign is built on candor, and its analytics approach should match.

**What this setup does:** It counts actions. How many people opened the chat modal. How many pages got views. Which cities are represented. How visitors arrived. This is the same kind of thing any website owner knows about their site — and it is used here to understand what is useful, not to target or pressure anyone.

**What this setup does not do:**
- No voter file matching or cross-referencing with public voter rolls
- No retargeting or ad pixel tracking (no Facebook Pixel, no Google Ads tag)
- No session recordings tied to individual identities (Microsoft Clarity is session-level, anonymized)
- No persuasion surveillance or behavioral profiling
- No data sold, shared, or passed to any third party
- No attempt to identify who specific visitors are

GA4 anonymizes IP addresses by default. The campaign has no mechanism to connect a GA4 session to a named individual.

If you add a Google Analytics disclosure to your privacy or transparency page, this is appropriate language:

> *"This site uses Google Analytics to understand how people use it — which pages are viewed, which tools are used, and roughly where visitors come from. No personally identifying information is collected. No behavioral data is used to target advertising. Analytics data is used only to understand what is useful and to improve the site."*

This is consistent with the campaign's AI transparency stance: tools are used openly, for legitimate purposes, and explained plainly.

---

## 12. Pollie / Case Study Angle

This analytics setup is itself part of the Uncampaign's innovation story, and it belongs in any future award submission.

### Relevant Pollie Categories

| Category | How this analytics work applies |
|---|---|
| **Technology — Best Use of Technology** | The campaign runs on GA4 + Clarity + Cloudflare analytics, spending $0 on data infrastructure while having more insight than most funded local campaigns |
| **Data and Analytics — Best Use of Data** | A systematic event taxonomy designed specifically for civic engagement measurement (not commercial funnels). Documents engagement depth, not vanity metrics. |
| **Artificial Intelligence** | The AI Transparency page tracks instruction_set_copied events — directly measuring whether residents are learning to use the AI tools the campaign teaches. |
| **Digital/Online — Best Website** | Page-level engagement time and scroll milestones document that the site's design creates genuine reading, not bouncing |
| **Innovation** | The campaign measures participation and civic engagement as conversions rather than donations and sign-ups — a structural redefinition of what political analytics should measure |

### What to Document for the Submission

1. **Screenshot the GA4 property before and after** adding custom events — before/after analytics maturity is a story
2. **Save monthly Looker Studio dashboard screenshots** starting now — a time series of growth is compelling evidence
3. **Capture press spike analyses** (Exploration 8) the moment any coverage happens — referral sessions and key events in a 48-hour window after a press mention
4. **Document the $0 data infrastructure spend** in the campaign's radical transparency section — GA4 Free, Looker Studio Free, Microsoft Clarity Free, Cloudflare Analytics Free = complete analytics stack at $0
5. **Export the Exploration data** for any conversation request spikes — showing conversion events tied to specific outreach moments proves the model worked

### The Case Study Pitch

> *"A local candidate for Town Supervisor built a complete civic engagement analytics stack using zero-budget tools — Google Analytics 4, Microsoft Clarity, and Looker Studio — and designed a custom event taxonomy that measures democratic participation rather than commercial conversion. The campaign tracked conversation requests, voter tool usage, civic content engagement, and geographic reach from Bedford-area residents specifically — and used that data to iterate and prove a new model for low-cost, high-integrity local campaigning."*

This is the story. The data is the evidence.

---

## 13. Next Steps for the Human

### Do today (no code required)

1. **Open GA4** at [analytics.google.com](https://analytics.google.com) and confirm you can access the property `G-G7WVQR4MTH`
2. **Enable Enhanced Measurement:** Admin → Data Streams → your web stream → Enhanced Measurement → toggle all 6 switches ON
3. **Set data retention to 14 months:** Admin → Data Settings → Data Retention → 14 months → Save
4. **Connect Looker Studio:** Go to [lookerstudio.google.com](https://lookerstudio.google.com) → Create → Data source → Google Analytics 4 → select `G-G7WVQR4MTH`

### Do this week (requires code changes)

5. Create `assets/js/analytics.js` with the starter implementation from Section 10
6. Add `<script src="/assets/js/analytics.js" defer></script>` to every HTML page (find-and-replace across the repo — add it after the existing GA4 inline block)
7. Add `CustomEvent` dispatches to `assets/js/chat-modal.js` for `chatModalStep` and `chatModalSuccess` (two small additions)
8. Add `data-chat-req-open` attributes with `data-trigger-location` values to the chat CTA buttons if not already present
9. Add `data-trigger-location` attributes to the subscribe trigger buttons (nav vs. footer vs. hero)

### Do in GA4 admin after the first events appear (1–2 days after code is deployed)

10. Mark the 4 Key Events as conversions (Admin → Events → toggle)
11. Create the 5 Custom Dimensions listed in Section 10
12. Build the 7 Audiences from Section 5
13. Build the 8 Explorations from Section 7

### Adopt immediately

14. **Start using UTM links** for every external share from this point forward — use the table in Section 9. Build a simple Google Sheet with pre-generated URLs for Facebook, Instagram, Substack, and email.

### What access you need

- GA4 Admin or Editor access to property `G-G7WVQR4MTH` (confirm you have this at analytics.google.com)
- Looker Studio account (free with any Google account — use the same Google account as GA4)
- No new accounts, tools, or credentials required

---

*Blueprint prepared using full repo inspection. All event names, pages, and interactive elements are derived from the actual codebase. No GA4 code was added to the site — only this documentation file was created.*
