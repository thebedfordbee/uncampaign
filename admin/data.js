/* ============================================================
   UNCAMPAIGN Command Center — Static Data
   agents, prompts, sample data, calendar generator
   ============================================================ */

/* ============================================================
   SCAN DEFAULTS (fallback when scan-data.json unavailable)
   ============================================================ */
const SCAN_DEFAULTS = {
  scanDate: '2026-04-27', scanTime: '12:00', pagesScanned: 12,
  overallScore: 59, grade: 'D', previousScore: null, scoreChange: null,
  note: 'Initial stub. Run a full scan to update.',
  categories: {
    sitemapCoverage:           { score: 80, status: 'warn', notes: 'Sitemap present; references old GitHub Pages domain in Sitemap directive.' },
    metadataQuality:           { score: 75, status: 'warn', notes: 'Main pages have titles/descriptions; issue subpages need review.' },
    analyticsCoverage:         { score: 0,  status: 'fail', notes: 'No analytics platform installed on any page.' },
    ga4Coverage:               { score: 0,  status: 'fail', notes: 'Google Analytics 4 not installed.' },
    searchConsoleVerification: { score: 0,  status: 'fail', notes: 'No Google Search Console verification tag.' },
    bingVerification:          { score: 0,  status: 'fail', notes: 'No Bing Webmaster Tools verification tag.' },
    microsoftClarity:          { score: 0,  status: 'fail', notes: 'Microsoft Clarity not installed.' },
    robotsNoindex:             { score: 90, status: 'pass', notes: 'robots.txt configured; admin disallowed; public pages accessible.' },
    canonicalTags:             { score: 85, status: 'pass', notes: 'Main pages have canonical tags; issue subpages need review.' },
    brokenLinks:               { score: 90, status: 'pass', notes: 'One placeholder found: Instagram footer link (#).' },
    accessibility:             { score: 65, status: 'warn', notes: 'Missing ARIA labels on some elements; heading hierarchy needs review.' },
    performance:               { score: 70, status: 'warn', notes: 'Persona PNGs likely unoptimized; no lazy loading on below-fold images.' },
    mobileUX:                  { score: 82, status: 'pass', notes: 'Responsive layout functional; mobile nav works.' },
    schema:                    { score: 78, status: 'warn', notes: 'FAQPage schema on homepage; issue pages lack structured data.' },
    internalLinking:           { score: 90, status: 'pass', notes: 'All 9 issue subpages verified with back-links to issues overview. Footer nav minimal but functional.' },
    imageAltText:              { score: 70, status: 'warn', notes: 'Some persona/social images may have generic or missing alt text.' },
    llmDiscoverability:        { score: 40, status: 'fail', notes: 'No llms.txt; no explicit AI agent guidance; minimal entity markup.' },
    securityPrivacy:           { score: 90, status: 'pass', notes: 'Cloudflare Pages (HTTPS); no mixed content. Admin is disallowed and noindexed.' },
    campaignCompliance:        { score: 90, status: 'pass', notes: 'Good candidate disclosure; no paid ads so no disclaimer triggers.' },
    aiTransparency:            { score: 88, status: 'pass', notes: '/pages/ai.html exists; clear disclosure language present.' },
    spendingTransparency:      { score: 82, status: 'pass', notes: 'Spending section on homepage; budget cap prominently featured.' },
    contentFreshness:          { score: 75, status: 'warn', notes: 'Site recently launched; monitor as campaign progresses.' }
  },
  criticalCount: 4, importantCount: 3, enhancementCount: 3, infoCount: 2,
  scanHistory: [{ scanDate: '2026-04-27', overallScore: 59, grade: 'D', pagesScanned: 12, note: 'Initial stub' }]
};

/* ============================================================
   FINDINGS DATA
   ============================================================ */
const FINDINGS_DATA = [
  { id:'FIND-001', title:'No Google Analytics 4 installed', severity:'critical', category:'Analytics', affectedPage:'All pages',
    explanation:'GA4 tracking is absent from every public page. You have no way to measure visitors, traffic sources, or content performance.',
    whyItMatters:'Without analytics you cannot measure campaign impact or build Pollie Awards evidence. Essential before launch.',
    suggestedFix:'Create a GA4 property at analytics.google.com. Get the G-XXXXXXXXXX ID. Run the "Check GA4 Coverage" Claude Code prompt.',
    watchOuts:'Add to all pages including issue subpages — not just the homepage. Do NOT add to /admin/.',
    status:'open', dateFound:'2026-04-27', dateResolved:null },

  { id:'FIND-002', title:'No Google Search Console verification', severity:'critical', category:'Analytics', affectedPage:'All pages',
    explanation:'GSC is not verified. You cannot see how Google indexes the site, what keywords drive clicks, or if there are crawl errors.',
    whyItMatters:'Required to monitor search appearance, submit sitemap, and catch indexing issues early.',
    suggestedFix:'Go to search.google.com/search-console. Add property. Get verification meta tag. Run "Check Google Search Console" prompt.',
    watchOuts:'After verification, submit sitemap.xml URL in GSC.',
    status:'open', dateFound:'2026-04-27', dateResolved:null },

  { id:'FIND-003', title:'No Bing Webmaster Tools verification', severity:'critical', category:'Analytics', affectedPage:'All pages',
    explanation:'Bing Webmaster Tools not verified. Bing powers multiple search engines and AI assistants (Copilot) used by Bedford residents.',
    whyItMatters:'Bing indexes independently and feeds AI tools. Missing = less AI discoverability.',
    suggestedFix:'Go to bing.com/webmasters. Add site. Get verification meta tag. Run "Check Bing Webmaster Tools" prompt.',
    watchOuts:'Import GSC data into Bing for faster indexing once both are set up.',
    status:'open', dateFound:'2026-04-27', dateResolved:null },

  { id:'FIND-004', title:'No Microsoft Clarity installed', severity:'critical', category:'Analytics', affectedPage:'All pages',
    explanation:'Microsoft Clarity (free session recording + heatmaps) not installed. Would show exactly how visitors interact with the site.',
    whyItMatters:'Free, GDPR-friendly, zero cost. Shows scroll depth, click maps, session recordings. Essential for understanding voter behavior.',
    suggestedFix:'Create Clarity project at clarity.microsoft.com. Get script. Run "Check Microsoft Clarity" prompt.',
    watchOuts:'Completely free for sites of this size.',
    status:'open', dateFound:'2026-04-27', dateResolved:null },

  { id:'FIND-005', title:'No llms.txt for AI discoverability', severity:'important', category:'LLM Discoverability', affectedPage:'/',
    explanation:'No llms.txt at /llms.txt. This file guides AI assistants on how to understand and represent the site.',
    whyItMatters:'Bedford residents use ChatGPT, Copilot, Perplexity to research local politics. llms.txt ensures accurate AI representation of Don\'s candidacy. Also aligns with the AI transparency brand.',
    suggestedFix:'Run the "LLM Discoverability Audit" Claude Code prompt to create a proper llms.txt.',
    watchOuts:'Content must be accurate and reflect Don\'s actual positions.',
    status:'open', dateFound:'2026-04-27', dateResolved:null },

  { id:'FIND-006', title:'robots.txt Sitemap URL points to wrong domain', severity:'important', category:'Crawlability', affectedPage:'/robots.txt',
    explanation:'robots.txt Sitemap directive references thebedfordbee.github.io/don-scott/sitemap.xml. Site is at uncampaign.pages.dev.',
    whyItMatters:'Search engines use robots.txt to find the sitemap. Wrong domain confuses crawlers. Fixed as part of Command Center setup.',
    suggestedFix:'Already fixed in robots.txt during Command Center setup. Run full scan to verify.',
    watchOuts:'Verify all sitemap.xml URLs also use the correct domain.',
    status:'resolved', dateFound:'2026-04-27', dateResolved:'2026-04-27' },

  { id:'FIND-007', title:'Instagram footer link is a placeholder (#)', severity:'important', category:'Links', affectedPage:'All pages (footer)',
    explanation:'Instagram social link in the footer points to # with a code comment: "TODO: replace # with real Instagram URL when available".',
    whyItMatters:'Dead social links look unfinished. Should be removed or replaced.',
    suggestedFix:'Either add the real Instagram URL or remove the icon from the footer until the account is ready.',
    watchOuts:'Update consistently across all pages that share the footer.',
    status:'open', dateFound:'2026-04-27', dateResolved:null },

  /* FIND-008 (No privacy policy page) excluded — intentional UNCAMPAIGN policy. See CFG.ignoreMissingPrivacyPolicy. */

  { id:'FIND-009', title:'sitemap.xml domain inconsistency', severity:'important', category:'Crawlability', affectedPage:'/sitemap.xml',
    explanation:'sitemap.xml mixes URLs from uncampaign.pages.dev and thebedfordbee.github.io/don-scott. This causes inconsistent canonical signals.',
    whyItMatters:'Mixed domains in sitemap may cause indexing confusion. Search engines may not index all pages correctly.',
    suggestedFix:'Run the "Fix Sitemap Coverage" Claude Code prompt to standardize all URLs to uncampaign.pages.dev.',
    watchOuts:'Ensure canonical tags on all pages also use the correct domain.',
    status:'open', dateFound:'2026-04-27', dateResolved:null },

  { id:'FIND-010', title:'Issue subpages lack structured data', severity:'enhancement', category:'Schema', affectedPage:'pages/issues/*.html',
    explanation:'Homepage has FAQPage JSON-LD. Individual issue pages (roads, energy costs, etc.) have no structured data.',
    whyItMatters:'Issue pages represent Don\'s positions. Schema helps search engines and AI surface this content accurately.',
    suggestedFix:'Run the "Check Schema Markup" Claude Code prompt.',
    watchOuts:'Use Article or FAQPage schema as appropriate per page.',
    status:'open', dateFound:'2026-04-27', dateResolved:null },

  { id:'FIND-011', title:'Persona images likely unoptimized', severity:'enhancement', category:'Performance', affectedPage:'Homepage (personas)',
    explanation:'8 persona PNG images in assets/img/personas/ may not be optimized for web. PNGs are typically larger than WebP.',
    whyItMatters:'Large images slow page load, hurting UX and rankings.',
    suggestedFix:'Run "Performance Audit" prompt. Convert to WebP; add lazy loading to below-fold images.',
    watchOuts:'Check actual file sizes first — may already be acceptable.',
    status:'open', dateFound:'2026-04-27', dateResolved:null },

  { id:'FIND-012', title:'Issue subpages lack back-links to Issues overview', severity:'enhancement', category:'Navigation', affectedPage:'pages/issues/*.html',
    explanation:'Verified 2026-04-27: all 9 issue subpages (advocacy-government, battery-storage, bedford-hills, cell-service, consultants, energy-costs, growth-character, leaf-blower-ban, roads-infrastructure) contain a link to ../issues.html. No missing back-links found.',
    whyItMatters:'Good internal linking helps user navigation and SEO crawlability.',
    suggestedFix:'No fix needed. All issue pages already link back to the issues overview.',
    watchOuts:'Re-run "Internal Linking Audit" after adding any new issue subpage to verify it also includes the back-link.',
    status:'resolved', dateFound:'2026-04-27', dateResolved:'2026-04-27' },

  /* FIND-013 (No privacy policy or terms) excluded — intentional UNCAMPAIGN policy. See CFG.ignoreMissingTerms. */

  { id:'FIND-014', title:'Site deployed on Cloudflare Pages', severity:'info', category:'Infrastructure', affectedPage:'Site-wide',
    explanation:'Site is at uncampaign.pages.dev on Cloudflare Pages. Provides HTTPS, CDN, and Cloudflare Access capability.',
    whyItMatters:'Good foundation. Cloudflare Access can provide stronger /admin/ protection at no cost.',
    suggestedFix:'Consider enabling Cloudflare Access for /admin/ for stronger protection.',
    watchOuts:'Custom domain (e.g. donscottbedford.com) can be added to Cloudflare Pages.',
    status:'info', dateFound:'2026-04-27', dateResolved:null },

  { id:'FIND-015', title:'Facebook page active; Instagram pending', severity:'info', category:'Social', affectedPage:'Footer',
    explanation:'Facebook page (DonScottBedfordNY) is active and linked. Instagram is a placeholder.',
    whyItMatters:'Social presence supports earned media. Keep footer link current.',
    suggestedFix:'Replace Instagram # with real URL when account is ready, or remove icon for now.',
    watchOuts:'Update consistently across all pages.',
    status:'info', dateFound:'2026-04-27', dateResolved:null }
];

/* ============================================================
   AGENTS (41 total)
   ============================================================ */
const AGENTS = [

/* --- WEBSITE / TECHNICAL (17) --- */
{ id:'seo', cat:'tech', name:'SEO Agent', tagline:'On-page SEO audit',
  purpose:'Audit the full site for on-page SEO issues, quick wins, and missed opportunities.',
  when:'Monthly or after adding new pages.',
  reviews:'Titles, meta descriptions, headings, canonicals, schema, keywords, crawlability.',
  output:'Prioritized issue list with Claude Code fix prompts.', tool:'cc' },

{ id:'local-seo', cat:'tech', name:'Local SEO Agent', tagline:'Bedford-specific local SEO',
  purpose:'Check for local SEO signals specific to Bedford, NY — NAP consistency, local schema, local keywords.',
  when:'Quarterly or before press pushes.',
  reviews:'Local business schema, NAP data, Bedford keyword usage, Google Business Profile signals.',
  output:'Local SEO gap report with quick win recommendations.', tool:'cc' },

{ id:'sitemap', cat:'tech', name:'Sitemap/Crawl Agent', tagline:'Sitemap vs. live pages audit',
  purpose:'Audit sitemap.xml against all live pages. Find missing URLs, orphaned pages, and domain inconsistencies.',
  when:'Monthly or after adding new pages.',
  reviews:'sitemap.xml, all HTML files, canonical URLs, robots.txt Sitemap directive.',
  output:'Sitemap gap report + recommended sitemap.xml updates.', tool:'cc' },

{ id:'metadata', cat:'tech', name:'Metadata Agent', tagline:'All page metadata review',
  purpose:'Review every public page for title tags, meta descriptions, og tags, Twitter cards, and canonical correctness.',
  when:'Monthly or after content updates.',
  reviews:'All public HTML — title, meta description, og:*, twitter:*, canonical, robots meta.',
  output:'Page-by-page metadata table + missing or weak metadata flagged.', tool:'cc' },

{ id:'llm', cat:'tech', name:'LLM Discoverability Agent', tagline:'AI/LLM visibility audit',
  purpose:'Check how well AI systems can understand and represent this campaign. Create llms.txt if missing.',
  when:'Monthly or after major content changes.',
  reviews:'llms.txt existence, entity clarity, structured data, content organization, AI-friendly signals.',
  output:'Discoverability score + llms.txt draft.', tool:'cc' },

{ id:'a11y', cat:'tech', name:'Accessibility Agent', tagline:'WCAG 2.1 AA basics audit',
  purpose:'Audit for common accessibility issues affecting voters with disabilities.',
  when:'Monthly or after adding new features.',
  reviews:'Heading hierarchy, ARIA labels, alt text, keyboard nav, color contrast signals, form labels.',
  output:'Accessibility issue list with severity + fix prompts.', tool:'cc' },

{ id:'perf', cat:'tech', name:'Performance Agent', tagline:'Page speed audit',
  purpose:'Check for performance issues slowing the site: unoptimized images, render-blocking scripts, large files.',
  when:'Monthly or after adding images or scripts.',
  reviews:'Image sizes and formats, lazy loading, render-blocking scripts, unused CSS, file sizes.',
  output:'Performance issue list with optimization prompts.', tool:'cc' },

{ id:'analytics', cat:'tech', name:'Analytics Agent', tagline:'Verify GA4 + GSC + Clarity',
  purpose:'Verify all analytics platforms are correctly installed and firing on all public pages.',
  when:'After initial setup, then monthly.',
  reviews:'GA4 snippet, GSC verification tag, Bing verification tag, Microsoft Clarity script.',
  output:'Analytics coverage report + install prompts for missing platforms.', tool:'cc' },

{ id:'schema', cat:'tech', name:'Schema Agent', tagline:'Structured data / JSON-LD audit',
  purpose:'Audit all JSON-LD schema markup. Add missing schema to issue pages and key content.',
  when:'Monthly or after adding new pages.',
  reviews:'JSON-LD on all pages — type, accuracy, completeness, errors.',
  output:'Schema coverage report + add/fix prompts.', tool:'cc' },

{ id:'design', cat:'tech', name:'Design Consistency Agent', tagline:'Visual consistency audit',
  purpose:'Check all pages follow the same design system — colors, typography, spacing, components.',
  when:'After adding new pages or changing CSS.',
  reviews:'All public HTML — CSS variable usage, component patterns, header/footer consistency.',
  output:'Design consistency report + fix prompts.', tool:'cc' },

{ id:'mobile', cat:'tech', name:'Mobile UX Agent', tagline:'Mobile experience audit',
  purpose:'Check mobile experience across all pages — viewport, touch targets, responsive layout.',
  when:'Monthly or after layout changes.',
  reviews:'Viewport meta, touch target sizes, responsive breakpoints, mobile nav.',
  output:'Mobile UX issue list + fix prompts.', tool:'cc' },

{ id:'security', cat:'tech', name:'Security Headers Agent', tagline:'Security + HTTPS audit',
  purpose:'Check for security issues: mixed content, risky external scripts, HTTPS configuration.',
  when:'Quarterly.',
  reviews:'External script sources, mixed content signals, HTTPS enforcement.',
  output:'Security findings with recommendations.', tool:'cc' },

{ id:'privacy', cat:'tech', name:'Privacy Agent', tagline:'Data handling + script audit',
  purpose:'Audit data collection disclosures, third-party script sources, and cookie-related signals. Does not check for privacy policy — intentional project policy.',
  when:'Quarterly or after adding forms or scripts.',
  reviews:'Forms, data collection paths, third-party scripts (GA4, Clarity, etc.), consent signals. No privacy policy check.',
  output:'Data handling gap report + recommendations for third-party scripts and form submissions.', tool:'cc' },

{ id:'legal', cat:'tech', name:'Legal/Compliance Agent', tagline:'Campaign compliance audit',
  purpose:'Check for required political disclosures, FEC/state compliance, candidate identification.',
  when:'Monthly.',
  reviews:'All public pages — candidate name, paid-for disclaimers, required identifiers.',
  output:'Compliance issue list + fix recommendations.', tool:'cc' },

{ id:'intlinks', cat:'tech', name:'Internal Linking Agent', tagline:'Internal link structure',
  purpose:'Audit internal link structure. Find orphaned pages, broken anchors, missing nav links.',
  when:'Monthly.',
  reviews:'All internal hrefs, nav links, footer links, issue page cross-links.',
  output:'Link structure map + orphan/broken link report.', tool:'cc' },

{ id:'freshness', cat:'tech', name:'Content Freshness Agent', tagline:'Staleness check',
  purpose:'Identify stale content that needs updating as the campaign progresses.',
  when:'Monthly.',
  reviews:'All page content — dates, spending figures, calendar info, issue pages, Q&A.',
  output:'Freshness report + priority update list.', tool:'cc' },

{ id:'conversion', cat:'tech', name:'Conversion/Engagement Agent', tagline:'User flow + CTA audit',
  purpose:'Identify friction in key user flows — idea submission, conversation requests, newsletter signup.',
  when:'Monthly.',
  reviews:'Form pages, CTA placement, user flows from landing to conversion.',
  output:'Conversion friction report + improvement prompts.', tool:'cc' },

{ id:'template-consistency', cat:'tech', name:'Page Template Consistency Agent', tagline:'Sitewide template + design audit',
  purpose:'Ensure all public pages follow a consistent visual and structural pattern based on the site design system. Flag pages that deviate from the established header/nav/footer pattern, typography, button styles, metadata structure, hero layout, CTA placement, and responsive behavior.',
  when:'After adding new pages, after CSS changes, or monthly.',
  reviews:'All public HTML pages vs. pages/template.html — header, nav, footer, CSS variable usage, hero structure, button classes, form structure, internal navigation, metadata pattern, issue-page template, accessibility basics, responsive signals.',
  output:'Page-by-page consistency report: pass/warn/fail per check. Sitewide audit prompt, page-specific fix prompt, and "normalize this page to site pattern" prompt for each deviating page.',
  tool:'cc' },

/* --- CAMPAIGN AGENTS (23) --- */
{ id:'campaign-mgr', cat:'campaign', name:'Campaign Manager Agent', tagline:'Campaign strategy review',
  purpose:'Review campaign priorities, strategic alignment, and 2–3 move look-ahead for the week.',
  when:'Weekly.',
  reviews:'Campaign calendar, current tactics, issue salience, Bedford context, open tasks.',
  output:'Weekly strategic brief with 3 highest-leverage next moves.', tool:'gpt' },

{ id:'daily-pri', cat:'campaign', name:'Daily Priorities Agent', tagline:"Today's top 3",
  purpose:"Generate today's 3 highest-leverage campaign tasks based on phase and calendar.",
  when:'Every morning.',
  reviews:'Calendar, open tasks, campaign phase, upcoming milestones.',
  output:"Today's 3 priorities with brief rationale.", tool:'gpt' },

{ id:'message', cat:'campaign', name:'Message Discipline Agent', tagline:'Tone + message audit',
  purpose:'Audit recent public content for tone consistency and campaign principle alignment.',
  when:'Weekly or before press outreach.',
  reviews:'Recent posts, emails, site copy — checked against 15 campaign tone rules.',
  output:'Message discipline score + flagged items + corrected versions.', tool:'gpt' },

{ id:'don-voice', cat:'campaign', name:'Don Voice Agent', tagline:"Draft in Don's voice",
  purpose:"Write or review copy in Don's authentic voice — calm, neighborly, specific, never consultant-speak.",
  when:'Before publishing any content.',
  reviews:'Draft copy checked against Don voice principles.',
  output:"Revised copy in Don's voice with change notes.", tool:'gpt' },

{ id:'issues', cat:'campaign', name:'Local Issues Agent', tagline:'Bedford issue → Don remedy',
  purpose:'Translate Bedford local issues and grievances into calm, constructive Don messaging.',
  when:'When a local issue needs a response.',
  reviews:"Issue context, Bedford governance relevance, Don's positions, contrast-not-attack principle.",
  output:'Don messaging on the issue in 3 tonal options.', tool:'gpt' },

{ id:'governance', cat:'campaign', name:'Bedford Governance Agent', tagline:'Explain Bedford government',
  purpose:'Explain Town Supervisor role, Town Board structure, and local governance context accurately.',
  when:'For content that requires explaining what the Supervisor actually does.',
  reviews:'Supervisor powers, Town Board structure, budget authority, services under Supervisor control.',
  output:'Plain-language governance explainer.', tool:'gpt' },

{ id:'frontporch', cat:'campaign', name:'Front Porch Conversation Agent', tagline:'Conversation scripts',
  purpose:"Draft Don's talking points and conversation scripts for 1:1 resident interactions.",
  when:'Before events, meetups, or informal conversations.',
  reviews:'Campaign principles, Don voice rules, local issue context.',
  output:'Conversation script or talking points — calm, neighborly, never pushy.', tool:'gpt' },

{ id:'ai-trans', cat:'campaign', name:'AI Transparency Agent', tagline:'AI disclosure updates',
  purpose:'Update AI transparency page and create content explaining how AI is being used in this campaign.',
  when:'Monthly or after using AI for significant new outputs.',
  reviews:'Current AI page, recent AI usage, outputs reviewed by humans.',
  output:'Updated AI transparency page copy + social post about AI use.', tool:'both' },

{ id:'spend-trans', cat:'campaign', name:'Spending Transparency Agent', tagline:'Spending update',
  purpose:'Update spending log and create public-facing spending update content.',
  when:'After any expense, or monthly if no expenses.',
  reviews:'Current spending data, $49.99 budget cap, transparency commitment.',
  output:'Spending update for site + social post.', tool:'both' },

{ id:'askdon-kb', cat:'campaign', name:'Ask Don KB Agent', tagline:'Update Q&A knowledge base',
  purpose:"Add new Q&A entries to Don's knowledge base from resident questions and interactions.",
  when:'After every batch of resident questions.',
  reviews:"Existing KB, new questions received, Don's positions, tone rules.",
  output:'New KB entries in standard Q&A format.', tool:'both' },

{ id:'voter-q', cat:'campaign', name:'Voter Question Response Agent', tagline:'Draft voter answers',
  purpose:"Draft responses to specific voter questions in Don's calm, direct voice.",
  when:'When a specific question needs a written response.',
  reviews:"Question text, Don's positions, Bedford context, tone rules.",
  output:"Drafted response in Don's voice + channel recommendation.", tool:'gpt' },

{ id:'press-ready', cat:'campaign', name:'Press Readiness Agent', tagline:'Press materials',
  purpose:'Prepare press materials, talking points, and backgrounders for media inquiries.',
  when:'Before press outreach or after receiving media interest.',
  reviews:'Campaign narrative, key facts, spending data, AI story, Bedford context.',
  output:'Press-ready backgrounder + talking points.', tool:'gpt' },

{ id:'earned-media', cat:'campaign', name:'Earned Media Agent', tagline:'Press angles + pitches',
  purpose:'Identify earned media opportunities and draft pitches for local Bedford media.',
  when:'Monthly or after campaign milestones.',
  reviews:'Campaign narrative, recent developments, press contacts, pitch angles.',
  output:'3 press angles + one full draft pitch.', tool:'gpt' },

{ id:'social-cal', cat:'campaign', name:'Social Calendar Agent', tagline:'Weekly social calendar',
  purpose:"Build this week's social media calendar — one post per day, 7 days.",
  when:'Every Monday morning.',
  reviews:'Theme rotation, current events, campaign phase, prior week performance.',
  output:'7-day social calendar with post text and platform recommendations.', tool:'gpt' },

{ id:'email', cat:'campaign', name:'Email Series Agent', tagline:'Campaign emails',
  purpose:'Draft campaign emails and Substack-style updates for subscribers.',
  when:'Weekly or for milestone announcements.',
  reviews:'Campaign news, issue highlights, AI transparency, Bedford context.',
  output:"Full email draft in Don's voice — subject, body, CTA.", tool:'gpt' },

{ id:'site-expand', cat:'campaign', name:'Website Expansion Agent', tagline:'Plan new site sections',
  purpose:'Plan and brief new website sections or pages based on campaign needs.',
  when:'When a new content area is needed.',
  reviews:'Current site structure, missing content, campaign priorities, user needs.',
  output:'Website copy brief + Claude Code implementation prompt.', tool:'both' },

{ id:'pollie-ev', cat:'campaign', name:'Pollie Evidence Agent', tagline:'Document evidence',
  purpose:'Document evidence for Pollie Awards across all relevant categories.',
  when:'Weekly (Saturday) and after major milestones.',
  reviews:'Recent outputs, metrics, screenshots, prompts used, results.',
  output:'Structured evidence entries for Pollie Vault.', tool:'gpt' },

{ id:'pollie-sub', cat:'campaign', name:'Pollie Submission Agent', tagline:'Submission narratives',
  purpose:'Draft Pollie Awards submission narratives across all applicable categories.',
  when:'When preparing the formal Pollie submission.',
  reviews:'Full Pollie Vault, campaign metrics, innovation story, AI story, results.',
  output:'Pollie submission narrative by category.', tool:'gpt' },

{ id:'debate', cat:'campaign', name:'Debate/Forum Prep Agent', tagline:'Forum prep',
  purpose:"Prepare Don for candidate forums — anticipated questions, talking points, time management.",
  when:'Before any candidate forum or public event.',
  reviews:"Forum format, anticipated questions, Don's positions, contrast strategy.",
  output:'Forum prep brief + answer outlines.', tool:'gpt' },

{ id:'contrast', cat:'campaign', name:'Contrast Boundary Agent', tagline:'Contrast without attacks',
  purpose:'Identify contrasts with the incumbent without making personal attacks or going negative.',
  when:'When contrast messaging is needed.',
  reviews:"Non-attack rules, Bedford governance record, contrast vs. attack distinction.",
  output:'Contrast messaging in 3 tonal options.', tool:'gpt' },

{ id:'rapid', cat:'campaign', name:'Rapid Response Agent', tagline:'Quick response drafts',
  purpose:'Draft quick responses to Bedford news, events, or campaign developments.',
  when:'When something time-sensitive requires a response.',
  reviews:"Incident context, Don's positions, tone rules.",
  output:"Response draft in Don's voice — 3 options from brief to detailed.", tool:'gpt' },

{ id:'election-cal', cat:'campaign', name:'Election Calendar Agent', tagline:'Timeline review',
  purpose:'Review campaign calendar for gaps, missing milestones, and scheduling conflicts.',
  when:'Monthly.',
  reviews:'Campaign calendar, milestones, recurring tasks, phase transitions.',
  output:'Calendar gap report + recommended additions.', tool:'gpt' },

{ id:'final-push', cat:'campaign', name:'Final Push Agent', tagline:'30/14/7-day strategy',
  purpose:'Plan and execute the final push in the last 30, 14, and 7 days before Election Day.',
  when:'Starting August 4 (90 days out). Run again at 60, 30, 14, and 7 days.',
  reviews:'Voter touchpoints, content calendar, messaging state, open tasks.',
  output:'Final push plan with daily priorities for each phase.', tool:'gpt' },

/* --- BEDFORD BEE SIGNAL (1) --- */
{ id:'bee-signal', cat:'special', name:'Bedford Bee Signal Translator', tagline:'Issue signal from Bee coverage',
  purpose:'Extract issue signals from Bedford Bee coverage to inform Don\'s remedy messaging. PRIVATE USE ONLY.',
  when:'When reviewing Bee content for issue salience and community grievances.',
  reviews:'Bedford Bee articles and posts — extract issues, grievances, community concerns worth addressing.',
  output:"List of issues where Don can name the remedy. NEVER cite the Bee publicly.",
  tool:'gpt',
  warning:'PRIVATE SIGNAL SOURCE ONLY. Do not cite, coordinate with, or echo the Bee in any public messaging. Do not make Don sound like the Bee. The Bee names the absurdity. Don names the remedy.' }

]; /* end AGENTS */

/* ============================================================
   CLAUDE CODE PROMPTS (23)
   ============================================================ */
const CLAUDE_PROMPTS = [

{ id:'full-scan', title:'Full Site Health Scan',
  desc:'Complete audit — SEO, analytics, accessibility, performance, compliance, AI discoverability, and more.',
  when:'Monthly or after any major site changes.',
  text:`You are the campaign manager and technical lead for Don Scott's Uncampaign — a 2026 race for Bedford Town Supervisor in Bedford, New York. The site is at https://uncampaign.pages.dev on Cloudflare Pages.

TASK: Perform a complete site health scan and update /admin/data/scan-data.json.

PROJECT-LEVEL OVERRIDES (these are intentional — never flag as issues):
- No privacy policy page: intentional UNCAMPAIGN policy (CFG.ignoreMissingPrivacyPolicy = true)
- No terms of service page: intentional (CFG.ignoreMissingTerms = true)
- Do NOT create findings, deductions, or opportunities for missing privacy/terms pages.

BEFORE STARTING:
1. Read CLAUDE.md carefully.
2. List ALL public HTML files in the repo (index.html + pages/**/*.html). Note any pages not in sitemap.xml.
3. Do NOT modify any public HTML, CSS, JS, or image files.
4. Do NOT commit any secrets or credentials.
5. Preserve all existing public site behavior.

SCAN CHECKLIST — for each item, note exactly which files pass/fail:
1. INVENTORY — List all public HTML pages. Compare against sitemap.xml; flag new pages not in sitemap.
2. SITEMAP — For each URL in sitemap.xml: is the file present? Is the domain uncampaign.pages.dev?
3. ROBOTS.TXT — Verify /admin/ is disallowed; confirm Sitemap directive is https://uncampaign.pages.dev/sitemap.xml.
4. METADATA — For each public page: read the file and extract title, meta description, og:title, og:description, canonical, robots meta. Flag missing or empty values with exact file path.
5. SCHEMA — Read each public HTML file and check for <script type="application/ld+json">. List exact files with no schema.
6. GA4 — Read each public page's <head>. Check for gtag.js or G-XXXXXXXXXX pattern. Note exact files missing GA4.
7. GOOGLE SEARCH CONSOLE — Read index.html. Check for meta[name="google-site-verification"].
8. BING WEBMASTER — Read index.html. Check for meta[name="msvalidate.01"].
9. MICROSOFT CLARITY — Read each public page. Check for clarity.ms/tag script. Note exact files missing Clarity.
10. INTERNAL LINKS — For each public HTML file: extract all internal hrefs. Verify each target file exists. List exact broken links with source file and target. For issue subpages (pages/issues/*.html): open each file and confirm it contains a link to ../issues.html — only flag as missing if you actually verified the file lacks the link.
11. IMAGE ALT TEXT — Read each public HTML file. List any <img> tags with missing or empty alt attributes. Note exact file and element.
12. ACCESSIBILITY — Check heading hierarchy (h1 → h2 → h3), ARIA labels on nav/buttons, form labels. Note exact files with issues.
13. PERFORMANCE — Check image files in assets/ for file sizes >200KB. Check public HTML for non-deferred scripts in <head> and missing lazy loading on below-fold images.
14. MOBILE UX — Check each page for viewport meta tag. Check CSS for responsive patterns.
15. LLM DISCOVERABILITY — Check for /llms.txt at repo root. Note if missing.
16. AI TRANSPARENCY — Check /pages/ai.html exists and is reachable via nav or footer link.
17. SPENDING TRANSPARENCY — Check index.html for spending section with current data.
18. CAMPAIGN COMPLIANCE — Check each public page for candidate name display.
19. SECURITY — Check for any http:// (non-HTTPS) resource references. List external scripts.
20. CONTENT FRESHNESS — Note any sections referencing dates that appear stale.
21. NOINDEX CHECK — Read /admin/index.html: confirm noindex,nofollow present. Read all public pages: confirm none have accidental noindex.
22. TEMPLATE CONSISTENCY — Check that all public pages link to the same CSS file, share the same nav/footer structure, and follow the design system pattern from pages/template.html.

SCORING RULES PER CATEGORY (each can reach 100/100 when fully fixed):
- Score 100 = no issues detected for this category across all files
- Score 90 = minor/cosmetic issues only, all critical requirements met
- Score 70-89 = some pages missing requirements (warn)
- Score 1-69 = significant gaps (warn/fail depending on severity)
- Score 0 = completely absent (fail)
- NEVER deduct for privacy/terms absence — intentional project policy
- NEVER carry over a finding from a previous scan unless you verified it still exists

OUTPUT FORMAT:
After scanning, write results to /admin/data/scan-data.json with this structure:
{
  "scanDate": "YYYY-MM-DD",
  "scanTime": "HH:MM",
  "pagesScanned": N,
  "overallScore": 0-100,
  "grade": "A|B|C|D|F",
  "previousScore": N_or_null,
  "scoreChange": N_or_null,
  "categories": {
    "sitemapCoverage": {"score":0-100,"status":"pass|warn|fail","notes":"exact files missing from sitemap if any"},
    "metadataQuality": {"score":0-100,"status":"pass|warn|fail","notes":"exact files with missing metadata if any"},
    "analyticsCoverage": {"score":0-100,"status":"pass|warn|fail","notes":""},
    "ga4Coverage": {"score":0-100,"status":"pass|warn|fail","notes":"exact files missing GA4 if any"},
    "searchConsoleVerification": {"score":0-100,"status":"pass|warn|fail","notes":""},
    "bingVerification": {"score":0-100,"status":"pass|warn|fail","notes":""},
    "microsoftClarity": {"score":0-100,"status":"pass|warn|fail","notes":"exact files missing Clarity if any"},
    "robotsNoindex": {"score":0-100,"status":"pass|warn|fail","notes":""},
    "canonicalTags": {"score":0-100,"status":"pass|warn|fail","notes":"exact files missing canonical if any"},
    "brokenLinks": {"score":0-100,"status":"pass|warn|fail","notes":"exact broken hrefs with source file if any"},
    "accessibility": {"score":0-100,"status":"pass|warn|fail","notes":"exact files/elements with issues"},
    "performance": {"score":0-100,"status":"pass|warn|fail","notes":"exact files/sizes if over threshold"},
    "mobileUX": {"score":0-100,"status":"pass|warn|fail","notes":""},
    "schema": {"score":0-100,"status":"pass|warn|fail","notes":"exact files missing schema if any"},
    "internalLinking": {"score":0-100,"status":"pass|warn|fail","notes":"exact files with missing back-links if any (verify by reading each file)"},
    "imageAltText": {"score":0-100,"status":"pass|warn|fail","notes":"exact files/elements with missing alt text"},
    "llmDiscoverability": {"score":0-100,"status":"pass|warn|fail","notes":""},
    "securityPrivacy": {"score":0-100,"status":"pass|warn|fail","notes":"no privacy/terms deductions — check only HTTPS/mixed-content/script sources"},
    "campaignCompliance": {"score":0-100,"status":"pass|warn|fail","notes":""},
    "aiTransparency": {"score":0-100,"status":"pass|warn|fail","notes":""},
    "spendingTransparency": {"score":0-100,"status":"pass|warn|fail","notes":""},
    "contentFreshness": {"score":0-100,"status":"pass|warn|fail","notes":""}
  },
  "findings": [
    {
      "id": "FIND-XXX",
      "title": "",
      "severity": "critical|important|enhancement|info",
      "category": "",
      "affectedPage": "exact file path or URL",
      "detectedCondition": "what the scanner actually found",
      "expectedCondition": "what the scanner expected to find",
      "explanation": "",
      "suggestedFix": "",
      "deduction": N,
      "status": "open|resolved",
      "dateFound": "YYYY-MM-DD",
      "dateResolved": null
    }
  ],
  "criticalCount": N, "importantCount": N, "enhancementCount": N, "infoCount": N
}
Also append entry to scanHistory array.

RESOLVED FINDINGS: If a previous finding's condition no longer exists (you verified by reading the file), set its status to "resolved" and add "dateResolved". Do not carry it forward as open. Do not add findings for privacy/terms pages.

AFTER COMPLETING:
1. Write results to /admin/data/scan-data.json.
2. Commit: git add admin/data/scan-data.json && git commit -m "Site health scan [date] — score [N]/100"
3. Push: git push
4. Report: plain-English summary of top 5 findings and recommended next actions.
5. Rollback: if anything breaks, git revert HEAD && git push

SAFETY: Do NOT modify public HTML, CSS, JS, or images. Do NOT add /admin/ to sitemap.xml.` },

{ id:'update-scan', title:'Update Scan Data Only',
  desc:'Write new scan results to scan-data.json without running a full audit.',
  when:'After manually reviewing the site and computing scores outside Claude Code.',
  text:`You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Update /admin/data/scan-data.json with new scan data.

STEPS:
1. Read the current /admin/data/scan-data.json.
2. Update the scanDate, scanTime, overallScore, grade, pagesScanned, previousScore, scoreChange, categories, findings, and counts with the new data provided.
3. Append a new entry to the scanHistory array.
4. Write the updated JSON back to /admin/data/scan-data.json.
5. Commit: git add admin/data/scan-data.json && git commit -m "Update scan data [date]"
6. Push: git push
7. Confirm success.` },

{ id:'fix-sitemap', title:'Fix Sitemap Coverage',
  desc:'Audit sitemap.xml against live pages and update to include all missing public URLs.',
  when:'After adding new pages or finding sitemap gaps.',
  text:`You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Audit and fix sitemap.xml to include all live public pages.

STEPS:
1. Inspect the repo. List all public HTML files.
2. Read the current sitemap.xml.
3. Compare: which public pages are missing from the sitemap?
4. Check: are all sitemap URLs using the correct domain (uncampaign.pages.dev)?
5. Check: does robots.txt Sitemap directive point to https://uncampaign.pages.dev/sitemap.xml?
6. Update sitemap.xml to add missing pages using the uncampaign.pages.dev domain.
7. Update robots.txt Sitemap directive if needed.
8. Do NOT add /admin/ or any non-public pages to the sitemap.

AFTER:
- Commit: git add sitemap.xml robots.txt && git commit -m "Fix sitemap coverage and domain"
- Push: git push
- Report: list of URLs added and any issues found.
- Rollback: git revert HEAD && git push if anything breaks.` },

{ id:'metadata-report', title:'Generate Metadata Report',
  desc:'Report all page titles, meta descriptions, og tags, and canonical tags across the site.',
  when:'Monthly metadata audit.',
  text:`You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Generate a metadata report for all public pages.

STEPS:
1. Inspect the repo. List all public HTML files.
2. For each page, extract: title, meta description, og:title, og:description, canonical URL, robots meta.
3. Flag any page that is: missing a title, missing a meta description, has a description over 160 characters, has a title over 60 characters, missing canonical, or accidentally noindexed.
4. Output a table with one row per page.

OUTPUT FORMAT:
Page | Title | Description | Canonical | Issues

Do NOT modify any files. This is a read-only audit.
Report: list of pages with issues and recommended fixes.` },

{ id:'check-ga4', title:'Check GA4 Coverage',
  desc:'Verify GA4 is installed on all public pages. Install it if missing.',
  when:'After receiving GA4 measurement ID from Google Analytics console.',
  text:`You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Verify and install Google Analytics 4 on all public pages.

STEPS:
1. Inspect all public HTML files.
2. Check each for a GA4 measurement ID (G-XXXXXXXXXX pattern or gtag.js script tag).
3. If GA4 is already present: report which pages have it and confirm it looks correct.
4. If GA4 is missing from any page: add the GA4 snippet to the <head> of EVERY public HTML file.
   Template (replace G-XXXXXXXXXX with the real ID):
   <!-- Google Analytics 4 -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');</script>
5. Do NOT add GA4 to /admin/index.html.
6. Verify snippet appears on all public pages consistently.

NOTE: Replace G-XXXXXXXXXX with the actual GA4 measurement ID before running this prompt.

AFTER: Commit and push. Report files modified. Rollback path: git revert HEAD && git push.` },

{ id:'check-gsc', title:'Check Google Search Console',
  desc:'Verify GSC verification tag. Add if missing.',
  when:'After getting GSC verification meta tag from search.google.com/search-console.',
  text:`You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Verify Google Search Console verification tag on the homepage.

STEPS:
1. Read index.html.
2. Check for a meta tag with name="google-site-verification".
3. If present: confirm it looks correct and report the value.
4. If missing: add the verification tag to the <head> of index.html (and only index.html — GSC only requires it on one page).
   Template: <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE">
5. Replace YOUR_VERIFICATION_CODE with the actual code before running.

AFTER: Commit and push. Report result. Rollback path: git revert HEAD && git push.` },

{ id:'check-bing', title:'Check Bing Webmaster Tools',
  desc:'Verify Bing verification tag. Add if missing.',
  when:'After getting Bing verification meta tag from bing.com/webmasters.',
  text:`You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Verify Bing Webmaster Tools verification tag on the homepage.

STEPS:
1. Read index.html.
2. Check for a meta tag with name="msvalidate.01".
3. If present: confirm it looks correct.
4. If missing: add the verification tag to the <head> of index.html.
   Template: <meta name="msvalidate.01" content="YOUR_BING_CODE">
5. Replace YOUR_BING_CODE with the actual code before running.

AFTER: Commit and push. Report result. Rollback path: git revert HEAD && git push.` },

{ id:'check-clarity', title:'Check Microsoft Clarity',
  desc:'Verify Clarity script. Install if missing.',
  when:'After creating a Clarity project at clarity.microsoft.com.',
  text:`You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Install Microsoft Clarity on all public pages.

STEPS:
1. Check all public HTML files for a Microsoft Clarity script tag (contains "clarity.ms/tag/" or "microsoft clarity").
2. If Clarity is already present: confirm it appears on all public pages.
3. If missing: add the Clarity script to the <head> of every public HTML file.
   Template (replace CLARITY_PROJECT_ID with your actual ID):
   <script type="text/javascript">(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","CLARITY_PROJECT_ID");</script>
4. Do NOT add to /admin/index.html.

AFTER: Commit and push. Report files modified. Rollback path: git revert HEAD && git push.` },

{ id:'check-robots', title:'Check Robots/Noindex',
  desc:'Audit robots.txt and all page-level noindex directives.',
  when:'Monthly or after any changes to robots.txt or meta robots tags.',
  text:`You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Audit robots.txt and all noindex meta tags.

STEPS:
1. Read robots.txt. Verify: /admin/ is disallowed; public pages are accessible; Sitemap directive is correct.
2. Check every public HTML file for meta robots tags. Flag any that say noindex (these should NOT be noindexed unless intentional).
3. Check /admin/index.html. Confirm it has <meta name="robots" content="noindex, nofollow">.
4. Report any issues found.

Do NOT modify any files. Read-only audit.
Report: robots.txt status, any accidentally noindexed public pages, admin noindex confirmed.` },

{ id:'check-schema', title:'Check Schema Markup',
  desc:'Audit all JSON-LD schema. Add missing schema to issue pages.',
  when:'Monthly or after adding new pages.',
  text:`You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Audit structured data and add missing schema to key pages.

STEPS:
1. Check each public HTML file for <script type="application/ld+json"> blocks.
2. List: which pages have schema, which types are used, and which pages have none.
3. For pages with no schema: add appropriate JSON-LD. Suggestions:
   - Issue pages: Article or FAQPage schema
   - Main pages: WebPage + Person schema (already on homepage)
4. Validate that existing schema is syntactically correct (no JSON errors).

AFTER: Commit and push. Report: schema added to which pages. Rollback path: git revert HEAD && git push.` },

{ id:'a11y-audit', title:'Accessibility Audit',
  desc:'Check heading hierarchy, ARIA labels, alt text, and keyboard navigation basics.',
  when:'Monthly.',
  text:`You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Perform a WCAG 2.1 AA basics accessibility audit.

STEPS:
1. Check each public HTML file for:
   - Heading hierarchy: does every page start with h1? Does the hierarchy descend logically (h1→h2→h3)?
   - Alt text: do all <img> tags have meaningful alt attributes? (Not just "" or "image")
   - ARIA labels: do interactive elements (buttons, nav links, form inputs) have descriptive ARIA labels or visible labels?
   - Form labels: do all form inputs have associated <label> elements?
   - Focus management: do interactive elements appear keyboard-accessible?
2. Note severity: critical (blocks access), important (degrades experience), enhancement (best practice).

Report: page-by-page findings + fix recommendations. Do not modify files in this pass.` },

{ id:'perf-audit', title:'Performance Audit',
  desc:'Check image sizes, lazy loading, render-blocking scripts, and large files.',
  when:'Monthly or after adding new images.',
  text:`You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Perform a site performance audit.

STEPS:
1. Check all image files in assets/img/ and subdirectories. Note file sizes (use file system data).
2. Check all public HTML for <img> tags: do below-fold images have loading="lazy"?
3. Check for render-blocking scripts: are there non-deferred script tags in <head>?
4. Check for large CSS or JS files.
5. Check if images are in modern formats (WebP preferred over PNG/JPEG for photos).
6. Identify the top 5 performance issues by impact.

Report: findings with file sizes and specific fix recommendations. Do not modify files in this pass.` },

{ id:'template-consistency', title:'Page Template Consistency Audit',
  desc:'Verify all pages match the site template — header, nav, footer, typography, metadata, CTAs, responsive behavior.',
  when:'After adding new pages or after CSS changes.',
  text:`You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Audit all public pages for template and design consistency.

BEFORE STARTING:
1. Read pages/template.html to understand the canonical page structure.
2. Read assets/css/site.css to understand the design token system.
3. List all public HTML files to audit.

CHECK EACH PAGE AGAINST THESE STANDARDS:
- [ ] Links to assets/css/site.css (not hardcoded inline styles)
- [ ] Uses CSS variables (var(--color), var(--font), etc.) — not hardcoded hex colors
- [ ] Same <header> / nav structure as template.html
- [ ] Same <footer> structure as template.html
- [ ] Has <meta name="viewport" content="width=device-width, initial-scale=1.0">
- [ ] Has title tag (page-specific, not generic)
- [ ] Has meta description
- [ ] Has canonical tag pointing to correct domain
- [ ] H1 exists and is page-specific (not copy of site name)
- [ ] Button/link classes match design system (.btn, .btn-primary, etc.)
- [ ] CTA placement follows page rhythm (not buried)
- [ ] Internal nav link back to relevant parent page (issue subpages → issues.html)
- [ ] No inline style= overrides that break design consistency
- [ ] Responsive: no fixed-width elements that break mobile
- [ ] Images have alt text

FOR ISSUE PAGES (pages/issues/*.html) also check:
- [ ] Has Article or FAQPage schema
- [ ] Has "Back to Issues" breadcrumb link
- [ ] Consistent hero/header structure matching other issue pages

OUTPUT:
1. Table: page | checks passed | checks failed | issues
2. For each failing page, output a targeted "normalize this page" Claude Code prompt:

---
NORMALIZE PROMPT for [page]:
You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).
TASK: Normalize [page path] to match the site template.
ISSUES FOUND: [list exact issues]
STEPS: [specific fixes only]
After fixing: git add [file] && git commit -m "Normalize [page] to site template" && git push
Rollback: git revert HEAD && git push
---

3. Sitewide summary: total pages, pass rate, top recurring issue.

Do not modify files during this audit pass. Report only.` },

{ id:'design-audit', title:'Design Consistency Audit',
  desc:'Verify all pages use the same design system — colors, typography, components.',
  when:'After adding new pages or changing CSS.',
  text:`You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Verify design system consistency across all pages.

STEPS:
1. Read assets/css/site.css. Note the design tokens (colors, spacing, typography).
2. Check each public HTML page: does it link to site.css? Does it use the design tokens as CSS variables?
3. Check header and footer: are they identical across all pages?
4. Check for any inline styles or hardcoded colors that bypass the design system.
5. Check new pages (links.html) vs. template.html for structural consistency.

Report: pages with inconsistencies + recommended fixes. Do not modify files.` },

{ id:'mobile-audit', title:'Mobile UX Audit',
  desc:'Check viewport meta, touch targets, and responsive layout across all pages.',
  when:'Monthly.',
  text:`You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Audit mobile UX across all pages.

STEPS:
1. Check every public HTML file for <meta name="viewport" content="width=device-width, initial-scale=1.0">.
2. Check for interactive elements with touch targets smaller than 44×44px (look at CSS sizing for buttons and links).
3. Check for horizontal overflow: any elements with fixed widths that might cause horizontal scrolling on mobile.
4. Check mobile nav: does the hamburger menu work? Are all nav links accessible on mobile?
5. Check images: do they have max-width:100% or equivalent?

Report: findings per page + fix recommendations. Do not modify files.` },

{ id:'security-audit', title:'Security & Privacy Audit',
  desc:'Check for mixed content, risky external scripts, HTTPS enforcement.',
  when:'Quarterly.',
  text:`You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Perform a basic security and privacy audit.

STEPS:
1. Check all public HTML for any http:// (non-HTTPS) resource references.
2. List all external script sources (src="https://..."). Note: GA4, Clarity, GSC, Bing are expected.
3. Flag any unexpected or unknown external scripts.
4. Check if forms POST to external services and whether those services are disclosed.
5. Check if /admin/ is properly disallowed in robots.txt and has noindex meta.
6. Verify no public pages accidentally have noindex meta tags.

Report: security and privacy findings + recommendations. Do not modify files.` },

{ id:'llm-audit', title:'LLM Discoverability Audit',
  desc:'Check llms.txt, entity clarity, AI-friendly content structure. Create llms.txt if missing.',
  when:'Monthly.',
  text:`You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Audit LLM and AI discoverability. Create llms.txt if missing.

STEPS:
1. Check if /llms.txt exists at the repo root.
2. If missing: create /llms.txt with this structure:
   # Don Scott for Bedford — The Uncampaign
   # https://uncampaign.pages.dev

   ## About
   Don Scott is a candidate for Bedford Town Supervisor in Bedford, New York, running in the 2026 election.
   This is the Uncampaign — a deliberately unconventional local campaign focused on civic participation,
   radical spending transparency ($49.99 budget cap), and AI-assisted operations with full human oversight.

   ## Key Pages
   / — Homepage: campaign overview, issues, Q&A, spending transparency
   /pages/issues.html — Local issues Don is focused on
   /pages/ai.html — AI transparency: how AI is being used in this campaign
   /pages/ideas.html — Submit ideas or questions to Don
   /pages/rules.html — The Uncampaign rules and principles
   /pages/odds.html — Honest assessment of the electoral odds

   ## What This Campaign Is
   - Bedford deserves a choice. Uncontested elections are unhealthy.
   - Campaign spend target: $49.99 total.
   - No signs, mailers, robocalls, or consultant class.
   - AI used openly for strategy, content, and site building. All outputs reviewed by humans.

   ## Contact
   Use /pages/ideas.html to submit questions or ideas.

3. Check if the homepage and key pages have clear entity markup (Person schema with Don's name and role).
4. Note any AI-unfriendly content patterns (walls of text, unclear headings).

AFTER (if llms.txt created): Commit and push. Rollback path: git revert HEAD && git push.` },

{ id:'intlinks-audit', title:'Internal Linking Audit',
  desc:'Find orphaned pages, broken internal links, missing nav coverage.',
  when:'Monthly.',
  text:`You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Audit internal link structure.

STEPS:
1. Inspect all public HTML files.
2. Map all internal hrefs: which pages link to which other pages?
3. Identify orphaned pages: public pages that are not linked from any other page.
4. Identify all issue subpages: do they link back to /pages/issues.html?
5. Check nav and footer: are they consistent across all pages? Are any key pages missing?
6. Flag any internal href that points to a file that does not exist in the repo.

Report: link map, orphaned pages, broken internal links, navigation gaps. Do not modify files.` },

{ id:'legal-audit', title:'Legal & Compliance Audit',
  desc:'Check campaign disclosures and political compliance basics for this New York State local race.',
  when:'Monthly.',
  text:`You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Perform a campaign legal and compliance audit.

CONTEXT: New York State local race. No paid advertising, so no paid-for disclaimer requirements are triggered. No privacy policy or terms pages are required or expected for this campaign — intentional project policy.

STEPS:
1. Check each public page for: candidate name display, any required "authorized by" or "paid for by" equivalent disclosures (N/A if no paid ads).
2. Check if the Ideas/submission form has a note about how submitted data is used.
3. Check the footer for any missing required disclosures.
4. Verify no public page accidentally includes disqualifying language or unverified factual claims.

Report: compliance status by page + recommended additions. Do not check for or flag missing privacy policy or terms pages. Do not modify files.` },

{ id:'add-page', title:'Add New Website Page',
  desc:'Add a new page to the site following the existing design system and structure.',
  when:'When adding a new section or page to the site.',
  text:`You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Add a new page to the site.

BEFORE STARTING:
1. Read CLAUDE.md carefully.
2. Read pages/template.html and at least two existing pages to understand the structure.
3. Read assets/css/site.css to understand the design system.

PAGE DETAILS:
- Page name/title: [SPECIFY]
- URL path: [SPECIFY]
- Purpose: [SPECIFY]
- Key content sections: [SPECIFY]

STEPS:
1. Create the new HTML file based on template.html.
2. Match the header, footer, nav, and design system exactly.
3. Add appropriate page-specific meta: title, description, og tags, canonical.
4. Add the page to sitemap.xml with the correct uncampaign.pages.dev domain.
5. Add a link to the page in the appropriate nav section.
6. Verify the design is consistent with the rest of the site.

AFTER: Commit and push. Report what was created. Rollback path: git revert HEAD && git push.` },

{ id:'update-spending', title:'Update Spending Transparency',
  desc:'Update spending data on the homepage and in admin config.',
  when:'After any campaign expense, or monthly if no expenses.',
  text:`You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Update spending transparency data.

STEPS:
1. Read index.html. Find the spending/expense section.
2. Update the current spend total with the new amount provided.
3. If there is an expense accordion or list, add the new expense entry with: date, item, amount, purpose.
4. Update the spending percentage CSS variable (--spend-pct) if used.
5. Update admin/config.js: set spendActual to the new total.
6. Ensure the total stays at or below $49.99.

NEW SPEND DATA: [PROVIDE: date, item, amount, purpose]

AFTER: Commit and push. Report what was updated. Rollback path: git revert HEAD && git push.` },

{ id:'update-ai-page', title:'Update AI Transparency Page',
  desc:'Update /pages/ai.html with new AI tools, outputs, and transparency notes.',
  when:'Monthly or after using AI for significant new outputs.',
  text:`You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Update the AI transparency page at /pages/ai.html.

STEPS:
1. Read the current /pages/ai.html.
2. Add the following new content: [PROVIDE: new AI tools used, outputs generated, human review notes]
3. Ensure the page maintains the same design system and tone as the rest of the site.
4. Tone: calm, honest, informative. This page is a feature, not a disclaimer.
5. Preserve all existing content.

AFTER: Commit and push. Report what was added. Rollback path: git revert HEAD && git push.` },

{ id:'update-askdon', title:'Update Ask Don Knowledge Base',
  desc:'Add new Q&A entries to the Ask Don knowledge base.',
  when:'After every batch of resident questions.',
  text:`You are the technical lead for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Update the Ask Don knowledge base / chatbot context with new Q&A entries.

STEPS:
1. Find the Ask Don knowledge base file(s) in the repo. Check /pages/don-bot.html and any supporting JS or data files.
2. Review the existing Q&A format.
3. Add the following new entries in the same format: [PROVIDE: new questions and Don's answers]
4. Tone of answers: calm, direct, neighborly, specific to Bedford. Never political consultant speak.
5. Each answer should reflect Don's actual positions and be reviewed by a human before use.

AFTER: Commit and push. Report what was added. Rollback path: git revert HEAD && git push.` },

{ id:'pollie-export', title:'Generate Pollie Evidence Export',
  desc:'Export a structured summary of campaign evidence for Pollie Awards submission.',
  when:'Monthly (Pollie Evidence Export day) or before submission.',
  text:`You are the campaign manager for Don Scott's Uncampaign (uncampaign.pages.dev).

TASK: Generate a structured Pollie Awards evidence export.

STEPS:
1. Inspect the full repo. Note: all pages, features, tools built.
2. Read CLAUDE.md for campaign philosophy and goals.
3. Read /pages/ai.html for AI transparency details.
4. Check index.html for spending transparency section.
5. Read admin/data/scan-data.json for site health metrics.

OUTPUT FORMAT — for each Pollie-eligible element, document:
- Asset name and description
- Category angle (Technology Innovation, AI-Enhanced Voter Engagement, New/Unusual Tactic, Website, etc.)
- URL
- Date launched
- What makes it notable
- Metrics available
- Human review notes
- Innovation story

Also output a summary narrative: "The Uncampaign built [X] in [Y timeframe] spending $[Z] of the $49.99 budget, using AI to [specific achievements]."

Do not modify any files. This is a read-only export.` }

]; /* end CLAUDE_PROMPTS */

/* ============================================================
   GPT PROJECT PROMPTS (18)
   ============================================================ */
const GPT_PROMPTS = [

{ id:'weekly-priorities', title:'Build Weekly Campaign Priorities',
  desc:"Generate this week's 3-5 highest-leverage campaign priorities.",
  when:'Every Monday morning.',
  text:`You are the campaign manager for Don Scott's Uncampaign — a 2026 race for Bedford Town Supervisor in Bedford, New York.

CAMPAIGN CONTEXT:
- Candidate: Don Scott
- Race: Bedford Town Supervisor, 2026 election (November 3, 2026)
- Campaign: The Uncampaign — unconventional, AI-assisted, $49.99 total budget cap
- Principles: Bedford deserves a choice. Transparency over theatrics. Technology over money. Conversation over campaigning.
- Non-negotiables: No signs, mailers, robocalls, door knocking, pressure tactics, personal attacks, or national framing.
- Current spend: $0 of $49.99 budget
- AI used openly with human oversight

TASK: Generate this week's 3-5 highest-leverage campaign priorities.

For each priority include:
1. What to do (specific action, not vague)
2. Why it matters now (context and timing)
3. Who owns it: Mike (technical/strategy) or Don (candidate/voice)
4. Estimated time required
5. How it advances the campaign's core goal

Current campaign phase: [SPECIFY: Launch / Build / Activate / Final Push]
Key context this week: [SPECIFY any relevant events, news, or campaign developments]

Format as a numbered list with clear, actionable items.` },

{ id:'daily-social-cal', title:'Build Daily Social Calendar',
  desc:"7-day social media calendar with post text and platform recommendations.",
  when:'Every Monday for the week ahead.',
  text:`You are the social media strategist for Don Scott's Uncampaign — a 2026 race for Bedford Town Supervisor in Bedford, New York.

CAMPAIGN CONTEXT:
- This is not a traditional political campaign. No pressure. No partisan bait.
- Campaign principles: Bedford deserves a choice. Transparency. AI-use openly acknowledged. Calm, neighborly tone.
- No national political framing. Always anchor to Bedford and the actual role of Town Supervisor.
- The campaign's behavior is the proof. No slogans.

TASK: Build a 7-day social media calendar for the week of [SPECIFY DATE].

For each day:
1. Date and day
2. Theme (from rotation: choice/democracy, spending transparency, AI transparency, Ask Don, local issue, front porch invitation, what the Supervisor does, civic participation, myth vs. fact, etc.)
3. Post text (ready to publish, ~100-150 words)
4. Platform recommendation (Facebook, and/or Instagram when ready)
5. Hashtag suggestions (local, minimal, never partisan)

Tone: calm, specific to Bedford, thoughtful, occasionally dry humor. Never consultant speak. Never cringe.` },

{ id:'draft-social', title:'Draft Social Posts',
  desc:'Draft 1-3 social posts on a specific topic in Don\'s voice.',
  when:'Whenever a specific topic needs a social post.',
  text:`You are the communications director for Don Scott's Uncampaign — a 2026 race for Bedford Town Supervisor in Bedford, New York.

CAMPAIGN CONTEXT:
- Tone: calm, neighborly, specific, direct. Never slogany. Never consultant-speak.
- Always anchor to Bedford and the actual role of Town Supervisor.
- No personal attacks. No national framing. No pressure.
- Acknowledge AI use when relevant to the campaign story.

TASK: Draft 3 social media post options on this topic: [SPECIFY TOPIC]

For each option:
1. Draft post text (100-200 words)
2. Note the specific tone (informational / warm / dry humor / civic)
3. Platform recommendation
4. Any suggested hashtags or handles to include

Additional context: [SPECIFY any relevant facts, events, or links]` },

{ id:'draft-email', title:'Draft Email / Substack Update',
  desc:"Draft a campaign email update in Don's voice.",
  when:'Weekly or for milestone announcements.',
  text:`You are the communications director for Don Scott's Uncampaign — a 2026 race for Bedford Town Supervisor in Bedford, New York.

CAMPAIGN CONTEXT:
- This is a weekly or periodic email to campaign subscribers.
- Tone: warm, direct, candid. Like a neighbor updating neighbors. Never a political pitch.
- Content mix: campaign update, issue spotlight, what's being built, transparency note.
- No pressure. No ask for donations (this campaign doesn't fundraise).
- Acknowledge AI assistance where relevant.

TASK: Draft a campaign email for [SPECIFY WEEK/DATE or TOPIC].

Include:
1. Subject line (3 options)
2. Opening paragraph (direct, not "I'm writing to...")
3. Main content (campaign update / issue spotlight / transparency note — as relevant)
4. What Don is working on or thinking about
5. Closing (warm, low-pressure, invites response)
6. Sign-off from Don

Additional context: [SPECIFY any specific news, issues, or campaign updates to include]` },

{ id:'draft-press-pitch', title:'Draft Press Pitch',
  desc:'Draft a press pitch to local Bedford media on a specific angle.',
  when:'Monthly or after a campaign milestone worth pitching.',
  text:`You are the press strategist for Don Scott's Uncampaign — a 2026 race for Bedford Town Supervisor in Bedford, New York.

CAMPAIGN CONTEXT:
- The Uncampaign is a legitimate news story: a local race run with AI assistance, a $49.99 budget cap, and radical transparency.
- Press angles: AI-assisted campaign, radical spending transparency, civic participation theme, Bedford deserves a choice, unusual tactics.
- Target: local Bedford/Westchester media, local blogs, civic journalism outlets.
- Tone: factual, concise, not "we're amazing" — let the facts be interesting.

TASK: Draft a press pitch for this angle: [SPECIFY ANGLE]

Include:
1. Subject line
2. Opening hook (1-2 sentences: the interesting fact)
3. The story (what's happening, why it matters to Bedford readers)
4. Key facts/quotes from Don
5. Call to action (interview offer, site link)
6. Length: under 250 words — pitches should be short

Don's contact: [SPECIFY]
Site: https://uncampaign.pages.dev` },

{ id:'draft-press-release', title:'Draft Press Release',
  desc:'Draft a formal press release for a campaign announcement.',
  when:'For major campaign milestones or announcements.',
  text:`You are the press strategist for Don Scott's Uncampaign — a 2026 race for Bedford Town Supervisor in Bedford, New York.

TASK: Draft a press release for: [SPECIFY ANNOUNCEMENT]

Standard press release format:
FOR IMMEDIATE RELEASE (or: EMBARGOED UNTIL [date])

[HEADLINE — factual, specific, not promotional]

[DATELINE] — [OPENING PARAGRAPH: who, what, when, where, why in ~75 words]

[SECOND PARAGRAPH: context, background on the campaign and candidate]

[QUOTE FROM DON — calm, direct, in his voice, relevant to the announcement]

[THIRD PARAGRAPH: additional details or context]

[BOILERPLATE: "About Don Scott for Bedford: Don Scott is a candidate for Bedford Town Supervisor in 2026. The Uncampaign is an unconventional local campaign focused on civic participation, radical spending transparency, and open AI-assisted operations. More at https://uncampaign.pages.dev"]

Contact: [SPECIFY]
###

Tone: factual, calm, never promotional. Let the facts be the story.` },

{ id:'don-qa', title:"Draft Don Q&A Answer",
  desc:"Draft Don's answer to a specific resident question.",
  when:'When a specific question from a resident needs a written response.',
  text:`You are the communications director for Don Scott's Uncampaign — a 2026 race for Bedford Town Supervisor in Bedford, New York.

DON'S VOICE RULES:
- Sound like a thoughtful local resident talking to neighbors
- Never sound like a political consultant or marketing agency
- Prefer clarity over flourish; specificity over abstraction; restraint over aggression
- Anchor to Bedford and the actual role of Town Supervisor
- Never personal attacks; never national bait; never empty slogans
- Humor: sparingly and dryly only

TASK: Draft Don's answer to this resident question: [PASTE QUESTION]

Format:
1. Direct answer (no "great question!" opening)
2. Brief context or reasoning
3. What Don would actually do or advocate for
4. Closing that invites follow-up

Length: 100-200 words. Conversational, not formal.

Additional context about Don's position on this topic: [SPECIFY if known]` },

{ id:'resident-response', title:'Draft Response to Resident Idea',
  desc:"Draft Don's response to a resident submission from the Ideas page.",
  when:'When reviewing Ideas page submissions.',
  text:`You are the communications director for Don Scott's Uncampaign — a 2026 race for Bedford Town Supervisor in Bedford, New York.

TASK: Draft Don's response to this resident submission:

[PASTE SUBMISSION TEXT HERE]

Submitted via: Ideas page
Resident name (if provided): [NAME or "a Bedford resident"]

DRAFT A RESPONSE THAT:
1. Acknowledges what the person said specifically (not generically)
2. Engages honestly with the idea or question
3. Notes what Don thinks or what he would do differently
4. Is warm without being gushing
5. Is short: under 150 words
6. Sounds like Don, not a campaign

If the idea is good: say so and explain why. If it's outside the scope of Town Supervisor: explain what the Supervisor actually can do. If Don disagrees: say so calmly.` },

{ id:'issue-messaging', title:'Turn Local Issue into Don Messaging',
  desc:"Translate a Bedford local issue into Don's calm, constructive remedy messaging.",
  when:'When a local issue needs a public response from Don.',
  text:`You are the communications director for Don Scott's Uncampaign — a 2026 race for Bedford Town Supervisor in Bedford, New York.

CAMPAIGN PRINCIPLE: The Bee names the absurdity. Don names the remedy.

DON'S APPROACH: Never exploit grievances for political advantage. Explain what the Supervisor can actually do. Be specific. Be calm. Be useful.

ISSUE: [DESCRIBE THE ISSUE]

BACKGROUND CONTEXT: [PROVIDE any relevant facts, history, or Bedford governance context]

TASK: Create Don's messaging on this issue in 3 options:

Option 1: Brief (for social post, 100 words)
Option 2: Medium (for website or email, 250 words)
Option 3: Talking points (for conversation, 5 bullet points)

Each version must:
- Name what Don thinks or would do (not just criticize the problem)
- Anchor to what the Town Supervisor can actually control
- Avoid personal attacks or partisan framing
- Sound like a thoughtful neighbor, not a politician` },

{ id:'ai-explainer', title:'Create AI Transparency Explainer',
  desc:'Draft an explanation of how AI is being used in this campaign.',
  when:'Monthly or after using AI for significant new outputs.',
  text:`You are the AI transparency officer for Don Scott's Uncampaign — a 2026 race for Bedford Town Supervisor in Bedford, New York.

CAMPAIGN PRINCIPLE: AI use is a feature, not a liability. We acknowledge it openly.

CONTEXT: The Uncampaign uses AI (Claude, GPT-4) to: build the website, draft and review content, run site health scans, generate strategy briefs, and build campaign tools. Every AI output is reviewed by a human before going public.

TASK: Write an AI transparency update for [SPECIFY: social post / email section / website page update].

This update should cover:
1. What AI tools were used this month/period
2. What they helped build or draft
3. What human review looked like
4. Why this matters: AI makes this campaign possible at $49.99
5. What voters can do with the same tools

Tone: honest, informative, slightly nerdy (this is a feature). Never defensive. Never over-promising. Never claiming AI "replaced" human judgment.` },

{ id:'spending-update', title:'Create Spending Transparency Update',
  desc:'Draft a public spending update for social or site.',
  when:'Monthly or after any expense.',
  text:`You are the transparency director for Don Scott's Uncampaign — a 2026 race for Bedford Town Supervisor in Bedford, New York.

CAMPAIGN PRINCIPLE: Radical spending transparency. $49.99 total budget cap. Every expense is public.

CURRENT SPENDING:
- Total budget: $49.99
- Amount spent: [SPECIFY]
- Remaining: [SPECIFY]
- Expenses: [LIST each expense: date, item, amount, purpose]

TASK: Draft a spending transparency update for [SPECIFY: social post / email section / website].

The update should:
1. State the total spent clearly
2. List specific expenses (what, why, how much)
3. Highlight how much has been done with so little
4. Invite residents to compare this to a typical local campaign budget
5. Reinforce the principle: constraints drive creativity

Tone: matter-of-fact, slightly proud, never boastful. Let the numbers speak.` },

{ id:'frontporch-script', title:'Create Front Porch Conversation Script',
  desc:"Script for Don's 1:1 conversations with Bedford residents.",
  when:"Before events, meetups, or informal conversations Don might have.",
  text:`You are the field director for Don Scott's Uncampaign — a 2026 race for Bedford Town Supervisor in Bedford, New York.

CAMPAIGN PRINCIPLE: Availability over intrusion. Conversation over campaigning. Don is available — he doesn't chase.

CONTEXT: Don may find himself in organic conversations with residents — at the post office, at local events, at the library. He is not a traditional campaigner. He is a neighbor.

TASK: Create a front porch conversation script/guide for: [SPECIFY CONTEXT — e.g., general conversation, specific issue, post an event]

The script should include:
1. Opening: how to introduce the campaign without pitching (2-3 sentences)
2. Key listening questions (what to ask the resident)
3. Core messages for 3 likely topic areas: [SPECIFY or use: why running, specific issue, the Uncampaign model]
4. How to wrap up without pressure (leave an opening, not a close)
5. Graceful exits if the person isn't interested

Tone: calm, neighborly, never political, never pressuring. Don is interesting — let the conversation be interesting.` },

{ id:'debate-prep', title:'Create Debate/Forum Prep',
  desc:"Prepare Don for a candidate forum or public debate.",
  when:'Before any candidate forum or public event.',
  text:`You are the debate coach for Don Scott's Uncampaign — a 2026 race for Bedford Town Supervisor in Bedford, New York.

FORUM CONTEXT:
- Format: [SPECIFY format, time limits, topics if known]
- Date: [SPECIFY]
- Other candidates: [SPECIFY if known]

DON'S PRINCIPLES FOR PUBLIC FORUMS:
- Never attack personally. Contrast on record and approach.
- Anchor every answer to Bedford and the actual Supervisor role.
- Be honest about the uphill nature of this race.
- AI transparency and spending transparency are strengths, not liabilities.
- "Bedford deserves a choice" is the through line.

TASK: Create a forum prep brief including:
1. 5 anticipated questions with Don's draft answers
2. 3 contrast points (vs. typical campaigns, not personal attacks)
3. Stats and facts Don should know cold
4. Time management guide for typical answer lengths
5. What to do if asked about long-shot odds (Don should be honest)
6. Closing statement draft (60 seconds)` },

{ id:'weekly-recap', title:'Create Weekly Recap',
  desc:"Draft a weekly recap of what the campaign accomplished.",
  when:'Every Friday or for weekly communications.',
  text:`You are the communications director for Don Scott's Uncampaign — a 2026 race for Bedford Town Supervisor in Bedford, New York.

TASK: Draft a weekly campaign recap for the week of [SPECIFY DATE].

What happened this week:
- [LIST key activities, posts, site updates, conversations, news]
- Spending update (if any): [SPECIFY]
- Site/analytics update (if any): [SPECIFY]

FORMAT OPTIONS (choose one):
1. Short social post (100 words): "This week on the Uncampaign..."
2. Email section (200 words): recap for weekly newsletter
3. Internal brief (300 words): team summary for Mike and Don

For whichever format chosen:
- Be specific about what was built, written, or done
- Note anything that got unexpected traction
- Note what didn't work
- Keep the tone honest and unspun

The campaign's behavior is the proof. The recap should reflect that.` },

{ id:'pollie-narrative', title:'Create Pollie Evidence Narrative',
  desc:'Draft a Pollie Awards submission narrative for a specific category.',
  when:'When preparing Pollie Awards submission.',
  text:`You are the awards submission director for Don Scott's Uncampaign — a 2026 race for Bedford Town Supervisor in Bedford, New York.

POLLIE AWARDS CATEGORY: [SPECIFY e.g., Technology Innovation / AI-Enhanced Voter Engagement / New and Unusual Tactic / Website / Digital Series]

EVIDENCE TO HIGHLIGHT:
- [LIST key assets, metrics, dates, and what makes them notable]
- Campaign budget: $49.99 total
- AI tools used: Claude, GPT-4
- Key innovations: [SPECIFY]
- Audience reach: [SPECIFY metrics if available]
- Press coverage: [SPECIFY if any]

TASK: Draft a Pollie Awards submission narrative for this category.

The narrative must:
1. Open with the hook (what makes this remarkable)
2. Explain what was built and how (the AI + human collaboration story)
3. Provide evidence of impact (metrics, reach, press, community response)
4. Connect to the campaign's core mission (choice, transparency, civic participation)
5. Close with the replicability argument: this is a model for future local campaigns

Length: 400-600 words. Tone: confident but not boastful. Let the innovation speak.` },

{ id:'askdon-additions', title:'Create Ask Don KB Additions',
  desc:"Draft new knowledge base entries for the Ask Don chatbot.",
  when:'After receiving new resident questions.',
  text:`You are the content strategist for Don Scott's Uncampaign — a 2026 race for Bedford Town Supervisor in Bedford, New York.

TASK: Create new knowledge base entries for the Ask Don chatbot/Q&A system.

NEW QUESTIONS TO ANSWER:
[LIST questions received from residents — paste them here]

For each question, draft a KB entry in this format:
Q: [question as a resident would ask it]
A: [Don's answer — calm, direct, specific to Bedford, in his voice]
Keywords: [3-5 terms someone might use to ask this]
Notes: [any caveats or human review needed]

DON'S VOICE RULES:
- Direct, not evasive
- Specific to Bedford and the Supervisor role
- Never blames, attacks, or generalizes
- Acknowledges uncertainty when genuine
- Invites follow-up

If the question is about something outside the Supervisor's powers: explain what the Supervisor can actually do instead.` },

{ id:'site-copy-brief', title:'Create Website Copy Brief',
  desc:'Draft a copy brief for a new website section or page.',
  when:'When planning a new page or major site update.',
  text:`You are the content strategist for Don Scott's Uncampaign — a 2026 race for Bedford Town Supervisor in Bedford, New York.

NEW PAGE/SECTION: [SPECIFY name and purpose]

TASK: Create a website copy brief for this new section.

The brief should include:
1. Page purpose (one sentence: what this page does for the visitor)
2. Target audience (which Bedford residents would visit this page)
3. Key messages (3-5 things the page must communicate)
4. Content sections (heading structure with placeholder copy)
5. CTAs (what do we want the visitor to do next?)
6. Tone notes (any specific tone considerations)
7. SEO notes (suggested title tag, meta description, target keywords)
8. Claude Code prompt (a brief for the developer to build this page)

Align with the Uncampaign design system: calm, neighborly, specific, never political theater.` },

{ id:'final-push', title:'Create Final Push Plan',
  desc:'Plan the 30/14/7-day final push strategy before Election Day.',
  when:'Starting around August 4 (90 days out). Revisit at 60, 30, 14, 7 days.',
  text:`You are the campaign manager for Don Scott's Uncampaign — a 2026 race for Bedford Town Supervisor in Bedford, New York.

ELECTION DAY: November 3, 2026
DAYS REMAINING: [SPECIFY]

CURRENT CAMPAIGN STATUS:
- Spend to date: [SPECIFY]
- Site health score: [SPECIFY]
- Email list size: [SPECIFY if known]
- Social following: [SPECIFY]
- Press coverage so far: [SPECIFY]
- Open tasks: [SPECIFY key unfinished items]

TASK: Create the final push plan for the [SPECIFY: 90/60/30/14/7]-day phase.

The plan must include:
1. Phase objective (what success looks like at the end of this phase)
2. Weekly priorities (specific, not vague)
3. Daily social calendar theme rotation (condensed)
4. Key content to produce (emails, press pitches, site updates)
5. Availability strategy (how Don stays accessible without being intrusive)
6. Pollie evidence captures scheduled
7. What NOT to do (maintain non-negotiables even under pressure)
8. Election Day plan

Tone: serious but calm. This campaign is not going to panic in the final stretch.` }

]; /* end GPT_PROMPTS */

/* ============================================================
   SAMPLE TASKS (localStorage default)
   ============================================================ */
const SAMPLE_TASKS_DEFAULT = [
  { id:'task-001', task:'Install Google Analytics 4 on all pages', owner:'Mike', priority:'high', status:'open',
    dueDate:'2026-05-04', category:'Analytics', notes:'See FIND-001. Use "Check GA4 Coverage" Claude Code prompt after installing.',
    createdDate:'2026-04-27', completedDate:null },
  { id:'task-002', task:'Verify Google Search Console', owner:'Mike', priority:'high', status:'open',
    dueDate:'2026-05-04', category:'Analytics', notes:'See FIND-002. Set up property at search.google.com/search-console first.',
    createdDate:'2026-04-27', completedDate:null },
  { id:'task-003', task:'Verify Bing Webmaster Tools', owner:'Mike', priority:'high', status:'open',
    dueDate:'2026-05-11', category:'Analytics', notes:'See FIND-003. bing.com/webmasters',
    createdDate:'2026-04-27', completedDate:null },
  { id:'task-004', task:'Install Microsoft Clarity', owner:'Mike', priority:'high', status:'open',
    dueDate:'2026-05-11', category:'Analytics', notes:'See FIND-004. clarity.microsoft.com — free.',
    createdDate:'2026-04-27', completedDate:null },
  { id:'task-005', task:'Create llms.txt for AI discoverability', owner:'Mike', priority:'high', status:'open',
    dueDate:'2026-05-11', category:'SEO', notes:'See FIND-005. Use "LLM Discoverability Audit" Claude Code prompt.',
    createdDate:'2026-04-27', completedDate:null },
  { id:'task-006', task:'Fix Instagram footer link (placeholder #)', owner:'Mike', priority:'medium', status:'open',
    dueDate:'2026-05-18', category:'Content', notes:'Either add real Instagram URL or remove icon. Update across all pages.',
    createdDate:'2026-04-27', completedDate:null },
  { id:'task-007', task:'Standardize sitemap.xml domain to uncampaign.pages.dev', owner:'Mike', priority:'medium', status:'open',
    dueDate:'2026-05-18', category:'SEO', notes:'See FIND-009. Use "Fix Sitemap Coverage" Claude Code prompt.',
    createdDate:'2026-04-27', completedDate:null },
  { id:'task-008', task:'Set admin password hash in config.js', owner:'Mike', priority:'high', status:'open',
    dueDate:'2026-05-04', category:'Admin', notes:'Generate SHA-256 hash at emn178.github.io/online-tools/sha256.html. Replace placeholder.',
    createdDate:'2026-04-27', completedDate:null },
  { id:'task-009', task:'Configure Apps Script URL in config.js', owner:'Mike', priority:'medium', status:'open',
    dueDate:'2026-05-11', category:'Admin', notes:'Deploy Google Apps Script web app. Get URL. Update APPS_SCRIPT_URL_PLACEHOLDER.',
    createdDate:'2026-04-27', completedDate:null },
  /* task-010 (Create privacy policy page) removed — intentional UNCAMPAIGN policy. */
];

/* ============================================================
   SAMPLE INBOX
   ============================================================ */
const SAMPLE_INBOX_DEFAULT = [
  { id:'inbox-001', type:'submission', date:'2026-04-25',
    name:'A Bedford Resident', contact:'',
    message:"I had no idea the Town Supervisor race was even contested this year. Thanks for running. What's your position on the proposed leaf blower ban? A lot of people in my neighborhood have strong feelings about it.",
    source:'Ideas page', status:'unread', assignedTo:null, notes:'', addressed:false },
  { id:'inbox-002', type:'submission', date:'2026-04-24',
    name:'Patricia M.', contact:'patricia@example.com',
    message:"The roads on our street have been terrible for two years. There's a pothole that's been reported multiple times and nothing happens. Is this something the Town Supervisor actually controls? Or is it a different level of government?",
    source:'Ideas page', status:'unread', assignedTo:null, notes:'', addressed:false },
  { id:'inbox-003', type:'chat-request', date:'2026-04-23',
    name:'James R.', contact:'jamesr@example.com',
    message:"I'd like to talk to Don about energy costs — specifically the battery storage proposals. I have a technical background and some thoughts. Is he available for a conversation?",
    source:'Chat request', status:'unread', assignedTo:'Don', notes:'', addressed:false },
  { id:'inbox-004', type:'submission', date:'2026-04-22',
    name:'Anonymous', contact:'',
    message:"You should make a simple explainer video about what the Town Supervisor actually does. Most people have no idea. It would probably get shared a lot.",
    source:'Ideas page', status:'unread', assignedTo:'Mike', notes:'Good idea. Consider for Content Studio.', addressed:false },
  { id:'inbox-005', type:'submission', date:'2026-04-21',
    name:'Tom & Linda K.', contact:'',
    message:"We appreciate that you're running. Even if you don't win, the fact that there's a choice this year means our votes mean something. Good luck.",
    source:'Ideas page', status:'unread', assignedTo:null, notes:'', addressed:false }
];

/* ============================================================
   POLLIE EVIDENCE DEFAULT
   ============================================================ */
const POLLIE_EVIDENCE_DEFAULT = [
  { id:'pe-001', name:'Campaign Website — uncampaign.pages.dev', category:'Website',
    url:'https://uncampaign.pages.dev', dateLaunched:'2026-04-01',
    screenshotSaved:false, metricsSaved:false,
    promptUsed:'Built with Claude Code from CLAUDE.md instructions',
    notes:'Full campaign site built with AI assistance, $0 cost, deployed on Cloudflare Pages.',
    impact:'Primary campaign presence. Full issue coverage, Q&A, spending transparency, AI transparency.',
    status:'active' },
  { id:'pe-002', name:'AI Transparency Page', category:'AI-Enhanced Voter Engagement',
    url:'https://uncampaign.pages.dev/pages/ai.html', dateLaunched:'2026-04-01',
    screenshotSaved:false, metricsSaved:false,
    promptUsed:'Claude Code page build',
    notes:'Openly documents AI use in the campaign. Unusual for any local campaign.',
    impact:'Demonstrates AI transparency principle. Potential press angle.',
    status:'active' },
  { id:'pe-003', name:'Spending Transparency Section', category:'Technology Innovation',
    url:'https://uncampaign.pages.dev/#spending', dateLaunched:'2026-04-01',
    screenshotSaved:false, metricsSaved:false,
    promptUsed:'Built into homepage via Claude Code',
    notes:'Live public spending tracker with $49.99 budget cap displayed prominently.',
    impact:'Radical transparency model. No other local campaign does this.',
    status:'active' },
  { id:'pe-004', name:'UNCAMPAIGN Command Center Admin', category:'Technology Innovation',
    url:'https://uncampaign.pages.dev/admin/', dateLaunched:'2026-04-27',
    screenshotSaved:false, metricsSaved:false,
    promptUsed:'Full admin build via Claude Code',
    notes:'Complete private campaign operating system: site health, agents, prompts, calendar, tasks, inbox.',
    impact:'Demonstrates AI-built campaign infrastructure at $0 additional cost.',
    status:'active' }
];

/* ============================================================
   SOCIAL THEMES (rotating calendar)
   ============================================================ */
const SOCIAL_THEMES = [
  'Bedford deserves a choice',
  'Uncontested elections are unhealthy',
  'Campaign spending transparency',
  'AI transparency',
  'Ask Don spotlight',
  'Local issue spotlight',
  'Front porch conversation invitation',
  'What the Town Supervisor actually does',
  'Calm contrast with traditional politics',
  'Civic participation without pressure',
  'Weekly recap',
  'Myth vs. fact',
  "You don't have to vote for Don",
  'Technology over money',
  'Availability over intrusion',
  'Useful civic explanation'
];

/* ============================================================
   GENERATE CALENDAR EVENTS
   ============================================================ */
function generateCalendarEvents() {
  const events = [];
  const MILESTONES = {
    '2026-05-04': { title:'Campaign Calendar Starts', cat:'milestone', owner:'Both', pri:'high', desc:'Official campaign start date. All recurring tasks begin.' },
    '2026-05-11': { title:'First AI Transparency Post', cat:'milestone', owner:'Mike', pri:'high', desc:'Publish first AI transparency post explaining how AI is used.' },
    '2026-05-18': { title:'First Spending Update', cat:'milestone', owner:'Mike', pri:'high', desc:'First public spending update. Total vs. $49.99 budget.' },
    '2026-05-25': { title:'First Ask Don Review', cat:'milestone', owner:'Don', pri:'medium', desc:'Don reviews and responds to Ask Don submissions.' },
    '2026-06-01': { title:'First Press Pitch', cat:'milestone', owner:'Mike', pri:'high', desc:'Draft and send first press pitch to local Bedford media.' },
    '2026-06-08': { title:'First Website Audit', cat:'milestone', owner:'Mike', pri:'high', desc:'Full site health audit. Fix top findings.' },
    '2026-06-15': { title:'First Email Update', cat:'milestone', owner:'Both', pri:'high', desc:'First campaign email/Substack to subscribers.' },
    '2026-08-04': { title:'90-Day Push Begins', cat:'milestone', owner:'Both', pri:'high', desc:'Final 90 days. Increase frequency. Review strategy.' },
    '2026-09-03': { title:'60-Day Push Begins', cat:'milestone', owner:'Both', pri:'high', desc:'Final 60 days. Sharpen messaging. Increase visibility.' },
    '2026-10-04': { title:'30-Day Push Begins', cat:'milestone', owner:'Both', pri:'high', desc:'Final 30 days. Daily attention. Maximum availability.' },
    '2026-10-20': { title:'14-Day Push Begins', cat:'milestone', owner:'Both', pri:'high', desc:'Final 14 days. Focus on voter turnout messaging.' },
    '2026-10-27': { title:'7-Day Push Begins', cat:'milestone', owner:'Both', pri:'high', desc:'Final 7 days. Maximum presence. Daily posts.' },
    '2026-11-03': { title:'ELECTION DAY', cat:'milestone', owner:'Both', pri:'high', desc:'Election Day — Bedford Town Supervisor. Thank voters for choosing to participate.' }
  };

  const d = new Date('2026-05-04');
  const end = new Date('2026-11-03');
  let idx = 0;

  while (d <= end) {
    const ds = d.toISOString().slice(0, 10);
    const dow = d.getDay();

    /* Daily social */
    events.push({ date:ds, title:'Social: ' + SOCIAL_THEMES[idx % 16], cat:'social',
      owner:'Both', pri:'medium', desc:'Daily social post — theme: ' + SOCIAL_THEMES[idx % 16],
      completed:false, drafted:false });

    /* Weekly recurring */
    if (dow === 1) events.push({ date:ds, title:'Draft/send email update', cat:'email', owner:'Mike', pri:'high', desc:'Weekly email to subscribers.', completed:false, drafted:false });
    if (dow === 2) events.push({ date:ds, title:'Improve website section', cat:'website', owner:'Mike', pri:'medium', desc:'Weekly site improvement — new page or content.', completed:false, drafted:false });
    if (dow === 3) events.push({ date:ds, title:'Review inbox submissions', cat:'ops', owner:'Both', pri:'medium', desc:'Check and respond to Ideas page submissions.', completed:false, drafted:false });
    if (dow === 4) events.push({ date:ds, title:'Review chat requests', cat:'ops', owner:'Don', pri:'high', desc:"Don reviews and responds to conversation requests.", completed:false, drafted:false });
    if (dow === 5) events.push({ date:ds, title:'Update spending transparency', cat:'ops', owner:'Mike', pri:'low', desc:'Review and update spending log if needed.', completed:false, drafted:false });
    if (dow === 6) events.push({ date:ds, title:'Capture Pollie evidence', cat:'pollie', owner:'Mike', pri:'medium', desc:'Save screenshots, URLs, metrics for Pollie Awards.', completed:false, drafted:false });
    if (dow === 0) events.push({ date:ds, title:'Run site health scan', cat:'website', owner:'Mike', pri:'medium', desc:'Generate and run site health scan prompt.', completed:false, drafted:false });

    /* Monthly (1st of month) */
    if (d.getDate() === 1) {
      const mon = d.toLocaleString('en-US', { month:'long' });
      [
        { title:`Monthly: Campaign message audit — ${mon}`, cat:'strategy', owner:'Both', pri:'high' },
        { title:`Monthly: Website health audit — ${mon}`, cat:'website', owner:'Mike', pri:'high' },
        { title:`Monthly: AI transparency update — ${mon}`, cat:'website', owner:'Mike', pri:'medium' },
        { title:`Monthly: Press angle review — ${mon}`, cat:'ops', owner:'Mike', pri:'medium' },
        { title:`Monthly: Pollie evidence export — ${mon}`, cat:'pollie', owner:'Mike', pri:'medium' },
        { title:`Monthly: Don Q&A KB update — ${mon}`, cat:'website', owner:'Don', pri:'medium' },
        { title:`Monthly: Spending report — ${mon}`, cat:'ops', owner:'Both', pri:'high' },
        { title:`Monthly: Strategy reset — ${mon}`, cat:'strategy', owner:'Both', pri:'high' }
      ].forEach(m => events.push({ date:ds, ...m, desc:m.title, completed:false, drafted:false }));
    }

    /* Milestones */
    if (MILESTONES[ds]) {
      events.push({ date:ds, completed:false, drafted:false, ...MILESTONES[ds] });
    }

    d.setDate(d.getDate() + 1);
    idx++;
  }

  return events;
}
