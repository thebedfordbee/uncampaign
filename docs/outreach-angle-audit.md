# Don Scott / UNCAMPAIGN Media & Academic Outreach Angle Audit

*Prepared: May 26, 2026. Source: full read of the public-facing site at https://www.donforbedford.com/ plus repo inspection. This is a research/reporting document — no live-site changes were made.*

A note on rigor: throughout, **[EXISTS]** marks something currently live and verifiable on the site, **[IMPLIED]** marks something the site gestures at but does not fully deliver, and **[RECOMMENDED]** marks something this report suggests building. No press mentions, endorsements, metrics, or functionality have been invented. Where the site's own marketing overstates what it delivers, that is flagged as a gap, not repeated as fact.

---

## 1. Executive Summary

Don Scott is running for Bedford Town Supervisor (Bedford, NY, Westchester County) in the November 3, 2026 election against incumbent Ellen Calves. He is a Republican in a heavily Democratic town, running what the site calls **The Uncampaign**: a deliberately unconventional, near-zero-dollar campaign with a self-imposed total spending cap of **$49.99** (actual spend to date: **$13.12**, domain registration only).

The website is not a brochure. It is a working **civic-technology portfolio** that doubles as the campaign's entire argument. It includes a published carbon-and-dollar footprint comparison against the 2021 winning campaign, a reusable AI "Bedford Roundtable" decision framework with its full instruction set published, a real public-voter-record lookup tool, a plain-English translation of the 762-page town code, NotebookLM-built meeting recaps, AI-generated campaign photography that openly labels itself as such, and even two election-night speeches — victory and concession — both written and published before Election Day.

The story is unusually credible because the campaign **shows its work**: it publishes its prompts, its spending math with peer-reviewed sources, its methodology, and its own limitations. That self-documentation is exactly what makes it pitchable to journalists, civic technologists, and academics — and exactly what makes it a strong Pollie Awards candidate.

**The five strongest angles** (detailed in §4 and §6):

1. **The $13.12 campaign** — radical spending transparency with a hard cap, benchmarked against a real $118,021 local race.
2. **AI in the open** — a campaign that publishes the actual prompts behind every tool and insists every position is human-reviewed.
3. **The one-party-town problem** — a civic argument (backed by Yale's David Schleicher) about why even-year election consolidation drowns out local democracy.
4. **Public-record civic tools** — a Voter Report Card and a plain-English town-code guide that are genuinely useful to residents, not persuasion devices.
5. **The pre-written concession speech** — a disarming, deeply human-interest artifact almost no campaign would publish.

The biggest readiness gaps are the **absence of any captured proof assets** (screenshots, analytics, a frozen spend ledger, a demo video) and a few **marketing-vs-reality discrepancies** (notably "150+ questions" on Don Bot vs. ~69 actually present) that should be reconciled before a reporter counts them.

---

## 2. What the Site Is Actually Saying

**The thesis, in the campaign's own words:** "uncontested elections are unhealthy for any town," and "local politics should be more transparent, less performative, and more respectful of people's time. Smarter tools. Lower costs. More listening." The footer tagline: *"Less Campaign. More Bedford."*

The site organizes that thesis into a few consistent claims:

- **Choice over persuasion.** The reason to run is to give Bedford a contested race, not necessarily to win. The two pre-written speeches both land on the same line: "Bedford still deserved a choice. That was the point of this campaign from the beginning."
- **Transparency over theatrics.** Spending, AI prompts, methodology, and even the staged nature of campaign photos are all disclosed.
- **Technology over money.** AI replaces what consultants and agencies would normally be paid to do: "This campaign uses AI to do what those consultants would have done — at a fraction of the cost, and transparently." The candidate's framing: "AI is a tool. Don is the candidate."
- **Local over national.** The defining line from the victory speech: "There is no Republican way to fill a pothole. There is no Democratic way to answer an email."
- **Availability over intrusion.** No signs, mailers, robocalls, ad spend, ambushes, or door-knocking; instead, a "Request a Chat with Don" flow and Q&A tools. "You are allowed to buy bananas in peace."

**Verified facts the site asserts about the candidate** (from `llms.txt` and pages): Bedford resident since childhood; former Bedford Town Councilman (5 years); former president of the Katonah-Lewisboro School Board; former Katonah Fire Commissioner; former Wetlands Commissioner; Co-Chair of the Westchester Alliance (cross-partisan civic group); active with Braver Angels of NY; runs a legal-marketing firm in Katonah. He also writes bi-weekly columns in local papers (*Mt. Kisco–Bedford Times*, *Katonah–Lewisboro Times*).

**The race:** Election Day Tuesday, Nov 3, 2026; early voting Oct 24–Nov 1; 18 election districts; opponent is incumbent Supervisor Ellen Calves (in office since 2022). The site's election page is neutral and practical, with a live countdown, polling-place table, and FAQ.

---

## 3. What Makes This Campaign Unusual

A ranked inventory of the genuinely atypical features, all **[EXISTS]** unless noted:

1. **A hard public spending cap of $49.99, currently at $13.12.** Not a slogan — a tracked ledger benchmarked against the 2021 winner's $118,021.
2. **A campaign carbon footprint.** The `/footprint` page computes ~53 kg CO₂e for the Uncampaign vs. ~9,662 kg CO₂e for the 2021 winning campaign (~182× less), with a published methodology citing peer-reviewed sources (Sun et al. 2018 for paper; Husom et al. 2025 / OpenAI figures for AI energy, with a conservative 10× safety multiplier; EPA eGRID for grid intensity) and all 195 expense records sourced from the NY State Board of Elections.
3. **Published AI instruction sets.** The `/pages/ai` page lists nine AI-assisted tools and publishes the *actual prompts* behind them, explicitly inviting reuse: the prompts are "meant to be borrowed."
4. **The Bedford Roundtable.** A reusable civic-reasoning framework that runs any local issue through **eight named perspectives** (Don as Chair plus the Preservationist, Practical Family, Main-Streeter, Affordability Realist, Environmental Steward, Civic Skeptic, and Services Neighbor), structured to "optimize for clarity, not agreement" and to surface tradeoffs rather than force consensus.
5. **A real public-voter-record tool.** The Voter Report Card returns a resident's *own* turnout history (from Westchester County Board of Elections public records), an A–F participation grade, and an auto-generated election-day calendar reminder — explicitly "a civic utility, not a campaign targeting tool," and it does not show *who* anyone voted for.
6. **A plain-English town code.** The Bedford How-To Guide translates the 762-page town code into ~30 plain-language Q&As with section citations.
7. **Town-code trivia (Code Red)** built from genuinely strange real provisions (cabaret lighting standards, swine permits, "huckster" as a defined term).
8. **NotebookLM meeting recaps ("The Bedford Brief")** — AI-built audio/video summaries of public Town Board meetings, with the production workflow published; at least one episode is live on Spotify and YouTube.
9. **A newsletter "readability remix"** — the town's own official newsletter, restructured by AI for scannability, with full attribution to the source and an AI colophon ("condensed and restructured with the help of an AI assistant (Claude, by Anthropic), then reviewed by a person").
10. **Self-aware AI campaign photography.** A full photo "album" generated by AI, openly labeled, with the generation instruction set published; the only caption that breaks the bit: the Front Porch Conversation is "the only photo here that actually matters."
11. **Two pre-written election-night speeches.** Both victory and concession, published before the vote, each opening by acknowledging the absurdity of writing them in advance.
12. **Machine-readable by design.** The site ships an `llms.txt`, Schema.org structured data, and explicit guidance for AI systems researching the campaign — itself a notable "AI and democracy" detail.

---

## 4. Strongest Outreach Angles

Each angle below follows the requested structure. Angles are individually pitchable and map to audiences in §5.

### Angle A — "The $13.12 Campaign"
- **Hook:** A candidate for town supervisor has capped his entire campaign at $49.99 — and is publishing every dollar against the $118,021 the last winner spent.
- **Why credible:** The numbers are specific, benchmarked to a real prior race, and sourced to NY State Board of Elections filings (195 itemized records). **[EXISTS]**
- **Site evidence:** Homepage spend-compare module; `/footprint` full breakdown ($37,676 printing/mailers, $13,724 consultants, etc.); `llms.txt` spend line.
- **Best-fit outlets:** Local/regional news, campaign-finance and good-government press, personal-finance-curious general desks.
- **Who cares:** Local reporter, campaign-finance reporter, good-government org researcher.
- **Framing:** "What does a serious local campaign actually *need* to cost?" Lead with the contrast, not the candidate.
- **Risk / how not to pitch:** Don't frame it as a stunt or as implying the 2021 spending was corrupt — the site doesn't, and shouldn't. Keep it curious, not accusatory.
- **Proof asset:** Screenshot of the spend-compare module; a frozen, dated spend ledger; the linked BOE records.

### Angle B — "AI in the Open: A Campaign That Publishes Its Prompts"
- **Hook:** Most campaigns hide their AI use; this one publishes the exact instructions behind every tool and insists a human signs off on every position.
- **Why credible:** Nine tools documented with full instruction sets on `/pages/ai`; the Roundtable instruction set is shipped in the page source. **[EXISTS]**
- **Site evidence:** `/pages/ai`; `assets/js/roundtable-instruction-set.js`; Don Bot's note that AI "does not invent my positions."
- **Best-fit outlets:** AI/tech policy, civic-tech, "AI and democracy" newsletters and podcasts.
- **Who cares:** Civic technologist, AI-ethics writer, tech-policy reporter, professor of digital governance.
- **Framing:** Transparency as the story — "show your work" applied to political AI. A replicable pattern, not a gimmick.
- **Risk / how not to pitch:** Don't overclaim autonomy ("an AI is running for office") — it's AI-*assisted*, human-reviewed. Avoid hype that the campaign itself avoids.
- **Proof asset:** Screenshot of a published instruction set; the `llms.txt`; a short screen-recording of the Roundtable.

### Angle C — "The One-Party Town Problem"
- **Hook:** A Republican is arguing — with a Yale law professor's research — that the real threat to Bedford isn't the other party, it's uncontested elections.
- **Why credible:** The blog essay cites David Schleicher's finding that local votes track national votes "despite strong evidence that voters hold very different views on local issues," and ties it to NY's move of local elections to even years. **[EXISTS]**
- **Site evidence:** `/blog/the-danger-of-one-party-towns`; campaign rules; both speeches.
- **Best-fit outlets:** Political-science blogs, democracy-reform press, NY state politics desks, op-ed pages.
- **Who cares:** Political scientist, election-law academic, democracy-reform editor, civics podcast host.
- **Framing:** Structural, not partisan. The argument is about competition and turnout structure, not about beating Democrats.
- **Risk / how not to pitch:** Must not read as sour grapes from the disadvantaged party. Anchor in the research and the even-year-consolidation policy change.
- **Proof asset:** The essay URL; the Schleicher citation; the even-year-election explainer.

### Angle D — "Public-Record Civic Tools That Actually Help"
- **Hook:** A campaign built a tool that shows you *your own* voting-participation report card — and a plain-English translation of the town's 762-page rulebook.
- **Why credible:** The Voter Report Card uses real Westchester County BOE public records, stores nothing, and only reports participation (never vote choice); the How-To Guide cites actual code sections. **[EXISTS]**
- **Site evidence:** `/best-of-bedford-voter-report-card`; `/bedford-how-to-guide`; `/election` voter lookup.
- **Best-fit outlets:** Local news, civic-tech, library/community-information circles, GovTech.
- **Who cares:** Local reporter, civic-engagement academic, librarian/GovTech writer.
- **Framing:** Utility over persuasion — these help residents regardless of who they vote for.
- **Risk / how not to pitch:** Privacy is the sensitive edge. Lead with the privacy-protective design (no storage, no vote choice) to preempt "creepy voter-targeting" misreads.
- **Proof asset:** Screen recording of a lookup (using the candidate's own record or a demo); screenshot of a How-To answer with its citation.

### Angle E — "The Concession Speech Written Before the Vote"
- **Hook:** He wrote — and published — both his victory and concession speeches before Election Day, "apparently removing even the suspense from losing."
- **Why credible:** Both speeches are live on `/pages/odds`, each self-aware about the absurdity, each landing on "Bedford deserved a choice." **[EXISTS]**
- **Site evidence:** `/pages/odds` (10 reasons he could win, 10 reasons he could lose, both full speeches).
- **Best-fit outlets:** Feature writers, human-interest desks, narrative podcasts, op-ed/essay pages.
- **Who cares:** Feature reporter, newsletter essayist, podcast host who likes character pieces.
- **Framing:** Disarming honesty and self-awareness; the concession is the more powerful artifact.
- **Risk / how not to pitch:** Don't let it read as defeatism or as conceding the race already; it's a transparency-and-humility device, not a prediction.
- **Proof asset:** Screenshot/quote pull from both speeches.

### Angle F — "Campaigning Without a Carbon Footprint"
- **Hook:** The campaign measured its own emissions — 53 kg CO₂e vs. ~9,662 kg for the last winner — and showed the math.
- **Why credible:** Methodology is published with peer-reviewed sources and a deliberately conservative bias ("We'd rather overclaim our footprint than underclaim it"). **[EXISTS]**
- **Site evidence:** `/footprint` carbon section and sources.
- **Best-fit outlets:** Climate/sustainability press, environmental-politics academics.
- **Who cares:** Climate reporter, sustainability researcher.
- **Framing:** A novel lens on campaign waste (mailers as paper/emissions). Secondary to the dollar story but distinctive.
- **Risk / how not to pitch:** The 10× AI-energy multiplier and estimate-based figures are debatable; present as a good-faith estimate, not a precise audit.
- **Proof asset:** Screenshot of the carbon comparison + sources list.

### Angle G — "The Reusable Model: A Campaign-in-a-Box for Small Towns"
- **Hook:** Everything here — prompts, tools, methodology — is published so any small town could copy it.
- **Why credible:** Instruction sets are explicitly "meant to be borrowed"; tools run on free infrastructure (Cloudflare Pages, Google Apps Script). **[EXISTS / IMPLIED]** — the components exist; a packaged "kit" does not yet.
- **Site evidence:** `/pages/ai`; the Apps Script backends; `llms.txt`.
- **Best-fit outlets:** Campaign-industry press, civic-tech, municipal-government associations.
- **Who cares:** Campaign-industry editor, civic-tech founder, municipal-association writer.
- **Framing:** Replicability as the legacy — a case study for low-cost municipal campaigns.
- **Risk / how not to pitch:** Don't claim a turnkey product exists yet; frame as an open, documented model.
- **Proof asset:** A one-page "how to replicate this" explainer **[RECOMMENDED]**; GitHub repo link if made public.

### Angle H — "Civic Engagement as Play: Best of Bedford"
- **Hook:** Instead of buying ads, the campaign built a town typing contest, a cutest-pet vote, and town-code trivia.
- **Why credible:** The typing challenge is a working game with a live hamlet leaderboard; the others are functional with moderation. **[EXISTS]**
- **Site evidence:** `/best-of-bedford` hub and its sub-pages.
- **Best-fit outlets:** Local human-interest, civic-engagement academics, "creative campaigning" features.
- **Who cares:** Local reporter, engagement researcher.
- **Framing:** Lowering the barrier to civic life — "participation can start with a dog."
- **Risk / how not to pitch:** Don't overstate civic depth of the lighter games; pair them with the substantive tools (Voter Report Card, How-To Guide).
- **Proof asset:** Screenshots of the leaderboard and a pet-vote gallery; participation counts once available.

---

## 5. Angle-to-Audience Matrix

| Audience type | Primary angle(s) | Secondary | Best lead artifact |
|---|---|---|---|
| **Local media** (Bedford/Katonah, Record-Review, Halston Media) | A ($13.12), D (civic tools), E (speeches) | H, C | Spend ledger + Voter Report Card demo |
| **Regional NY / Westchester media** (lohud/Journal News, Westchester Mag, Patch, News12) | A, C (one-party towns), D | B, F | Footprint page + Schleicher essay |
| **Political media** (state + national politics desks, election trades) | C, A, G | E | One-party-town essay + spend cap |
| **Civic tech / AI media** (newsletters, GovTech, AI-and-democracy writers) | B (published prompts), G (replicable model), D | F | `/pages/ai` instruction sets + `llms.txt` |
| **Campaign industry publications** (Campaigns & Elections, C&E tech, AAPC/Pollie ecosystem) | G, B, A | H | Footprint + AI methodology + cost model |
| **Democracy reform / good-government orgs** | C, A, D | G | Essay + spend transparency + voter tool |
| **Political science / public policy / civic-engagement academics** | C, B, D, G | F, H | Essay (Schleicher tie-in) + tool documentation |
| **Local newsletters / Substacks / podcasts** | E (speeches), B, C | A, H | Pre-written speeches + AI-in-the-open story |
| **X / Bluesky / LinkedIn commentators** (campaign tech, civic tech, AI ethics) | B, A, G | E | Screenshot of a published prompt; the $13.12 stat |

---

## 6. Top 10 Pitchable Stories

Ranked by overall strength (newsworthiness × credibility × low risk × proof availability):

1. **"A town-supervisor campaign that has spent $13.12."** (Angle A) — Strongest, most universally legible, fully sourced.
2. **"The campaign that publishes its AI prompts."** (Angle B) — Distinctive, timely, ownable in the AI-and-democracy conversation.
3. **"Why a Republican is worried about one-party towns — not the other party."** (Angle C) — Counterintuitive, research-backed, op-ed-ready.
4. **"He wrote his concession speech before the election. On purpose."** (Angle E) — Human-interest hook that opens the door to the whole story.
5. **"Find out your own voter report card."** (Angle D, Voter Report Card) — Useful, shareable, privacy-conscious; strong local hook.
6. **"The 762-page town code, in plain English."** (Angle D, How-To Guide) — Quiet but genuinely useful and replicable.
7. **"A campaign with a carbon footprint — measured and published."** (Angle F) — Novel lens; pairs naturally with story #1.
8. **"A campaign-in-a-box for small towns."** (Angle G) — Forward-looking case-study framing for industry/civic-tech.
9. **"Eight perspectives, one town decision: the Bedford Roundtable."** (Angle B/D) — The most intellectually interesting tool; good for civic-tech deep dives.
10. **"Civic engagement as play: a town typing contest instead of yard signs."** (Angle H) — Light, local, photogenic; a warm closer or sidebar.

---

## 7. Academic / Civic Tech Case Study Potential

This campaign is an unusually clean field case for several research communities:

- **Local democracy & election timing.** The even-year-consolidation argument (Schleicher; "the vote in local elections directly tracks the vote in national elections") makes the campaign a live illustration for scholars of *election timing*, *roll-off/down-ballot drop-off*, and *one-party local governance*. A real candidate testing whether local-first messaging can resist nationalized voting is a natural study subject.
- **AI governance & transparency.** Publishing complete prompts (not just outputs), labeling AI-generated imagery, and asserting human-in-the-loop review is a documented model of *disclosed* political AI — relevant to digital-governance, computational-propaganda, and platform-policy researchers studying what *responsible* campaign AI could look like.
- **Civic technology & participation.** The Voter Report Card (public-record reflection tool), the plain-English code guide, and the Roundtable framework are reusable artifacts. A civic-tech program could study adoption, or fork the open instruction sets.
- **Campaign finance & resource minimalism.** A documented $13.12 campaign with a benchmarked $118,021 comparison is a natural data point for *cost-of-democracy* and *money-in-local-politics* research.
- **Deliberative democracy.** The eight-perspective Roundtable, designed to "optimize for clarity, not agreement" and surface tradeoffs, is a small but concrete experiment in *structured deliberation* / *mini-public* reasoning that deliberation scholars may find interesting.

The site already extends an open invitation: the press page welcomes "interviews, background, or research inquiries" and explicitly invites researchers to study the campaign. **[EXISTS]**

---

## 8. Campaign Industry / Awards Potential

The campaign is being built with a future **Pollie Awards** submission in mind, and the material maps cleanly to likely categories:

- **Use of New Technology / AI / Innovation** — published prompts, NotebookLM recaps, the Roundtable, `llms.txt`. (Hero piece: `/pages/ai`.)
- **Best Website (Local/Down-ballot)** — the entire site is the campaign; design is consistent, accessible, schema-rich.
- **Best Use of Humor / Most Unusual Campaign Tactic** — pre-written speeches, the AI photo album, Code Red, the rulebook ("You are allowed to buy bananas in peace").
- **Best Low-Budget Campaign** — the $13.12 story is almost purpose-built for this.
- **Best Blog / Earned Media** — the one-party-town essay and the column archive.
- **Public Affairs / Civic Engagement** — Voter Report Card, How-To Guide, Community Picks, meeting recaps.

**Evidence trail to preserve now** (because awards judging and reporters both want receipts): dated screenshots of each hero tool, the spend ledger frozen at intervals, analytics snapshots, the Git commit history as a build timeline, and a short behind-the-scenes demo video per flagship tool.

---

## 9. Press-Readiness Gaps

Honest assessment of what could trip up a careful reporter or judge:

1. **No proof assets are captured yet.** There are no saved screenshots, no analytics export, no frozen spend ledger, no demo video. GA4 and Microsoft Clarity *are* installed (visible in `index.html`), so engagement data exists to be pulled — but nothing is packaged. **[GAP]**
2. **Marketing-vs-reality discrepancies.** `llms.txt` and some copy say Don Bot has "150+ questions"; the page's structured data contains ~69. The "100+ Ideas" claim checks out (103). Reconcile the Don Bot number before a reporter counts. **[GAP]**
3. **Placeholders still in the codebase.** The legacy `pages/minutes.html` still has `TODO: Replace with final Spotify/YouTube URL` comments and an `example.com` prediction-app link appears in `odds.html`; the Voter Report Card has a `TODO: Verify next local election date before launch`. The *live* recap page (`recaps.html`, where `/podcasts` and `/recaps` redirect) does have real URLs, but stray placeholders are a credibility risk if found. **[GAP]**
4. **Data-governance opacity on some tools.** Where idea votes and pet votes ultimately go (client-side only vs. persisted, how moderated) isn't documented publicly. A privacy-minded reporter may ask. **[GAP]**
5. **Thin content streams.** The blog has one published essay; the podcast has one episode; the newsletter remix is a one-off. Cadence undercuts a "this is an ongoing operation" framing. **[GAP]**
6. **No press coverage yet** (correctly — the press page claims none). This is honest, but it means outreach is cold-start; the assets in §10 matter more as a result.
7. **No downloadable media kit.** `press.html` offers angles and fast-facts but no logo pack, hi-res headshot, or one-page PDF. Reporters on deadline want these. **[GAP]**
8. **Opponent sensitivity.** The footprint page names the 2021 winner's vendors and spending. It's public-record and fairly framed, but pitches must stay benchmark-curious, never gotcha.

---

## 10. Recommended Proof Assets to Capture

Capture before any outreach; store with date stamps in an `evidence/` or `/audits/` folder and back up off-repo.

- **Spend ledger, frozen + dated** — a screenshot and a saved copy of `/footprint` showing $13.12, plus the linked 195 BOE records.
- **Spend-compare module screenshot** (homepage) — the $118,021 vs $13.12 / 9,000× / 182× visual.
- **Footprint methodology + sources** screenshot — for the carbon angle's credibility.
- **`/pages/ai` instruction-set screenshots** — at least the Roundtable and one other, showing prompts are genuinely published.
- **Roundtable demo video** (30–60s screen recording) running one issue end to end.
- **Voter Report Card demo video** — using the candidate's own record (consent clear) to avoid any privacy question; show the "no vote choice / nothing stored" copy on screen.
- **How-To Guide screenshot** — one answer with its town-code citation visible.
- **Both speeches** — clean quote pulls + screenshots of `/pages/odds`.
- **Bedford Brief recap** — the live Spotify + YouTube links and a screenshot of the published workflow.
- **Best of Bedford** — typing leaderboard screenshot; participation counts once meaningful.
- **Analytics snapshot** — GA4 + Clarity top-line (visits, top pages, any heatmap) to substantiate "people are using this."
- **Git commit history export** — as a dated build timeline (strong for awards + "built fast and cheap" framing).
- **`llms.txt` + structured-data screenshot** — the machine-readable / "AI-ready" detail.
- **One-page fact sheet + hi-res headshot + logo** — the missing media-kit basics.

---

## 11. Suggested Outreach Target Categories

Twenty-five categories (not named individuals yet — that's the next prompt's job):

1. Bedford/Katonah hyperlocal reporter or editor (Record-Review, Halston Media)
2. Westchester County local-politics reporter (lohud / The Journal News)
3. Westchester lifestyle/feature magazine writer
4. Patch / hyperlocal network editor for northern Westchester
5. Regional NY TV/digital assignment desk (e.g., News 12 Westchester)
6. NY State politics / Albany reporter covering election administration
7. Election-law academic (NY-focused; even-year consolidation, election timing)
8. Political scientist studying local elections / nationalization of local politics
9. Civic-engagement / participation scholar (turnout, deliberation)
10. AI-and-democracy newsletter writer / Substacker
11. Civic-technology journalist (GovTech, civic-tech beat)
12. Campaign-industry trade editor (Campaigns & Elections and similar)
13. Political-tech / campaign-tech analyst or columnist
14. Good-government / democracy-reform org communications lead
15. Campaign-finance reporter or watchdog researcher
16. Climate/sustainability reporter interested in novel emissions angles
17. Local-government / municipal-association publication editor
18. Library / public-information / open-data community writer
19. AI-ethics or responsible-AI academic / think-tank fellow
20. Narrative/feature writer or essay-podcast host (for the speeches angle)
21. "Bright spots in democracy" / solutions-journalism outlet
22. LinkedIn civic-tech / GovTech commentator
23. Bluesky / X political-tech and AI-ethics commentators
24. Local or regional civics podcast host
25. Pollie Awards / AAPC-adjacent industry voices and judges (relationship-building, not a pitch)

---

## 12. Recommended Next Prompt for Outlet Matching

Paste the following into Claude or ChatGPT (ideally one with web access) to turn these categories into a named, contact-ready outreach plan. It is self-contained.

```
You are a media and academic outreach strategist for a local political campaign.
I will give you (1) a campaign summary, (2) a set of pre-defined story angles, and
(3) a list of target categories. Your job is to turn the categories into a named,
contact-ready outreach plan WITHOUT fabricating any private contact information.

=== CAMPAIGN SUMMARY ===
Don Scott is running for Bedford Town Supervisor (Bedford, NY, Westchester County) in
the Nov 3, 2026 election against incumbent Ellen Calves. It is "The Uncampaign": a
near-zero-dollar race with a self-imposed $49.99 spending cap (currently $13.12 spent,
domain only), no signs/mailers/robocalls/consultants/ad spend/door-knocking. AI is used
openly and disclosed; every position is human-reviewed. The site (https://www.donforbedford.com)
includes: a published $13.12-vs-$118,021 spending + carbon footprint comparison; an
"AI transparency" page that publishes the actual prompts behind nine tools; the eight-
perspective "Bedford Roundtable" reasoning framework; a public-record Voter Report Card
(no vote choice shown, nothing stored); a plain-English guide to the 762-page town code;
town-code trivia; NotebookLM meeting-recap podcasts; an AI newsletter "readability remix";
AI-generated-and-labeled campaign photos; and two pre-written election speeches (victory
AND concession). Core civic argument: uncontested/one-party local elections are unhealthy,
worsened by NY moving local elections to even years (cites Yale's David Schleicher).
Tone: calm, neighborly, candid, local, useful, restrained, never partisan ragebait.
IMPORTANT: The Bedford Bee is a SEPARATE satirical publication, not part of this campaign —
do not mention or coordinate with it. Do not invent facts, metrics, endorsements, or press.

=== STORY ANGLES (match targets to these) ===
A) The $13.12 campaign (radical spend transparency, benchmarked to a real $118,021 race)
B) AI in the open (publishes its prompts; human-reviewed positions)
C) The one-party-town problem (even-year consolidation; Schleicher research)
D) Public-record civic tools that help (Voter Report Card; plain-English town code)
E) The pre-written concession speech (human-interest / transparency)
F) Campaigning with a measured carbon footprint
G) A replicable "campaign-in-a-box" model for small towns
H) Civic engagement as play (Best of Bedford series)

=== TARGET CATEGORIES (expand each into named targets) ===
[Paste the 25 categories from Section 11 of the outreach audit here.]

=== WHAT I WANT YOU TO PRODUCE ===
For EACH target category, identify 2-5 SPECIFIC real targets: outlet names, and named
reporters/editors/academics/commentators/podcast hosts/newsletter authors who plausibly
cover this beat. For each named target include:
  - Name, role, outlet/affiliation, and why they fit (which angle A-H, and why)
  - Beat evidence (the kind of stories they write) — describe, don't fabricate quotes
  - How to FIND their contact the legitimate way: outlet contact/tips page, masthead,
    university faculty page, newsletter "reply to this email," podcast booking form,
    or public professional social profile. Do NOT invent or guess private emails/phones.
    If you are not confident a contact channel exists, say "verify via [specific page]."
  - Best platform to reach them (email / Substack reply / X / Bluesky / LinkedIn / form)
Then produce, tailored to each target TYPE (local reporter, academic, civic-tech writer,
podcast host, commentator):
  1. Subject lines (3 options each: plain, curious, and stat-led)
  2. A SHORT email version (≤120 words)
  3. A LONGER email version (≤300 words, with 2-3 linkable proof assets)
  4. A DM version (≤300 characters) for X / Bluesky / LinkedIn
  5. One follow-up message (≤80 words) for ~5-7 days later
Match the campaign tone in every message: calm, local, specific, useful, no hype, no
partisan framing, no slogans; re-anchor any national framing back to Bedford and the
actual job of Town Supervisor.
Finally, output a TRACKING SPREADSHEET structure as a table with these columns:
  Target Name | Outlet/Affiliation | Category | Best Angle (A-H) | Platform |
  Contact Method (how to find it) | Status (Not started/Sent/Replied/Scheduled/Published/Declined) |
  Date Contacted | Follow-up Due | Notes | Result/Link
Group the final output by audience tier (Local → Regional → Political → Civic-tech/AI →
Campaign industry → Democracy reform → Academic → Newsletters/Podcasts → Social commentators)
and flag the 10 highest-priority targets to contact first.
```

---

## 13. Priority Action List

Ordered for execution. Items marked **(content fix)** are small site edits to consider; everything else is outreach prep.

1. **Capture the proof assets in §10** — especially the frozen spend ledger, the spend-compare and footprint screenshots, and short demo videos of the Roundtable and Voter Report Card. Nothing ships without receipts.
2. **Reconcile the Don Bot "150+" claim** with the ~69 questions actually present — either add questions or correct the count in copy and `llms.txt`. **(content fix)**
3. **Sweep stray placeholders** — remove/replace the `example.com` prediction-app link in `odds.html`, the `TODO` Spotify/YouTube comments in the legacy `minutes.html`, and verify the Voter Report Card election date. **(content fix)**
4. **Build the missing media-kit basics** — a one-page fact sheet (PDF), a hi-res headshot, and a logo file, linked from `press.html`. **(content fix)**
5. **Pull a GA4 + Clarity top-line snapshot** so "people are using this" is substantiated, not asserted.
6. **Write a one-page "how to replicate this" explainer** to make Angle G (campaign-in-a-box) concrete; decide whether to make the repo public.
7. **Run the §12 prompt** to convert the 25 categories into a named target list with tailored messages and a tracking sheet.
8. **Seed the first wave (cold-start):** lead with the strongest, lowest-risk, most-local stories first — Angle A ($13.12) and Angle E (the speeches) to local/regional and feature/newsletter targets, then Angle B (AI in the open) to civic-tech/AI writers.
9. **Stand up a tracking sheet** using the §12 column structure before sending anything.
10. **Shore up cadence** if outreach lands — having a second blog essay and a second meeting recap ready makes "ongoing operation" credible when a reporter checks back. **(content fix)**

---

*Reminder for whoever acts on this: keep the tone calm, local, candid, and useful in every pitch. The campaign's behavior is the proof — let the $13.12, the published prompts, and the pre-written concession speech do the talking. Don't nationalize it, don't oversell it, and don't reference the Bedford Bee.*
