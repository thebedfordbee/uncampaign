/* UNCAMPAIGN — Custom GA4 Event Tracking
   Loaded on every page via <script src="/assets/js/analytics.js" defer>.
   Requires the existing gtag.js base tag already present in each page's <head>.
   All handlers use event delegation on document; no existing code is modified by
   this file. Dispatched CustomEvents from chat-modal.js handle modal step and
   submit tracking. No PII is sent to GA4. */
(function () {
  'use strict';

  if (typeof gtag !== 'function') return;

  function track(name, params) {
    gtag('event', name, params || {});
  }

  /* ── Subscribe modal ──────────────────────────────────────────────────────
     site.js opens the modal on [data-subscribe-trigger] clicks.
     We listen here independently — no conflict. */
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-subscribe-trigger]');
    if (!trigger) return;
    var loc =
      trigger.closest('.site-nav__mobile') ? 'nav_mobile' :
      trigger.closest('.site-nav')         ? 'nav' :
      trigger.closest('.site-footer')      ? 'footer' :
      trigger.closest('.rule-card__cta')   ? 'rule_cta' : 'page';
    track('subscribe_modal_open', { trigger_location: loc });
  });

  /* Close: fires when the injected modal's close/done/overlay is clicked
     while the modal is still open. Uses delegation so it works after
     site.js injects the modal DOM. */
  document.addEventListener('click', function (e) {
    var overlay = document.getElementById('subscribe-modal-overlay');
    if (!overlay || !overlay.classList.contains('is-open')) return;
    if (
      e.target.closest('.subscribe-modal__close') ||
      e.target.closest('.subscribe-modal__done') ||
      e.target === overlay
    ) {
      track('subscribe_modal_close', {});
    }
  });

  /* ── Chat request modal ───────────────────────────────────────────────────
     chat-modal.js dispatches chatModalStep and chatModalSuccess CustomEvents.
     We also track the open action via [data-chat-req-open] delegation. */
  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-chat-req-open]');
    if (!opener) return;
    var loc =
      opener.closest('.homepage-contact__actions') ? 'homepage_contact' :
      opener.closest('.rule-card__cta')            ? 'rule_cta' :
      opener.closest('.links-link-stack')          ? 'links_page' : 'page';
    track('chat_request_open', { trigger_location: loc });
  });

  document.addEventListener('chatModalStep', function (e) {
    track('chat_request_step', { step_number: e.detail && e.detail.step });
  });

  document.addEventListener('chatModalSuccess', function (e) {
    track('chat_request_submit', {
      meeting_format: (e.detail && e.detail.meetingFormat) || 'unknown',
      time_preference: (e.detail && e.detail.timePreference) || 'unknown'
    });
  });

  /* ── Rule card expand (rules.html) ───────────────────────────────────────
     rules.js runs first (listener on element); by the time this fires,
     is-expanded reflects the new state. Only track expansions. */
  document.addEventListener('click', function (e) {
    var toggle = e.target.closest('.rule-card__toggle');
    if (!toggle) return;
    var wrapper = toggle.closest('.rule-card-wrapper');
    if (!wrapper || !wrapper.classList.contains('is-expanded')) return;
    var titleEl = wrapper.querySelector('.rule-card__title');
    var title   = titleEl ? titleEl.textContent.trim() : '';
    var numMatch = title.match(/Rule\s+(\d+)/i);
    track('rule_card_expanded', {
      rule_number: numMatch ? numMatch[1] : 'unknown',
      rule_name: title.replace(/^Rule\s+\d+:\s*/i, '').substring(0, 50)
    });
  });

  /* Rule CTA clicked (inside an expanded rule card) */
  document.addEventListener('click', function (e) {
    var cta = e.target.closest('.rule-card__cta .cta-row a, .rule-card__cta .cta-row button');
    if (!cta) return;
    var wrapper = cta.closest('.rule-card-wrapper');
    var titleEl = wrapper && wrapper.querySelector('.rule-card__title');
    var ruleName = titleEl
      ? titleEl.textContent.trim().replace(/^Rule\s+\d+:\s*/i, '').substring(0, 50)
      : 'unknown';
    var dest = cta.hasAttribute('data-subscribe-trigger')
      ? 'subscribe'
      : (cta.href || cta.textContent.trim()).substring(0, 100);
    track('rule_cta_clicked', { rule_name: ruleName, cta_destination: dest });
  });

  /* ── Homepage feature cards ───────────────────────────────────────────────
     The six linked cards in the .cards-grid on index.html */
  document.addEventListener('click', function (e) {
    var card = e.target.closest('.cards-grid a.card');
    if (!card) return;
    var titleEl = card.querySelector('.card__title');
    track('nav_feature_clicked', {
      card_label: (titleEl ? titleEl.textContent.trim() : 'unknown').substring(0, 50)
    });
  });

  /* ── Spending accordion (index.html) ─────────────────────────────────────
     Inline script in index.html toggles is-open on the accordion wrapper.
     By delegation time, the toggle has already run; only fire on open. */
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('.expense-accordion__trigger');
    if (!trigger) return;
    var accordion = trigger.closest('.expense-accordion');
    if (accordion && accordion.classList.contains('is-open')) {
      track('spending_detail_expanded', {});
    }
  });

  /* ── AI tools accordion (ai.html) ────────────────────────────────────────
     Inline script in ai.html toggles is-open; only fire on open. */
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('.ai-tools-accordion .idea-category__trigger');
    if (!trigger) return;
    var item = trigger.closest('.idea-category');
    if (!item || !item.classList.contains('is-open')) return;
    var nameEl = trigger.querySelector('.idea-category__name');
    track('ai_tool_expanded', {
      tool_name: (nameEl ? nameEl.textContent.trim() : 'unknown').substring(0, 50)
    });
  });

  /* ── Instruction set viewed (data-instr-toggle, many pages) ──────────────
     site.js handles toggle; we only fire when the panel just became visible. */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-instr-toggle]');
    if (!btn) return;
    var panelId = btn.getAttribute('data-instr-toggle');
    var panel   = panelId && document.getElementById(panelId);
    if (!panel || panel.hidden) return;   /* panel is now visible = just opened */
    var name = panelId.replace(/^instr-panel-/, '').replace(/-/g, ' ');
    track('instruction_set_viewed', { panel_name: name.substring(0, 50) });
  });

  /* ── Instruction set copied (.instr-panel__copy on many pages) ───────────
     Fire on any Copy All button regardless of which page. */
  document.addEventListener('click', function (e) {
    var copyBtn = e.target.closest('.instr-panel__copy');
    if (!copyBtn) return;
    /* Prefer AI accordion category name, fall back to panel title text */
    var toolName = '';
    var catItem = copyBtn.closest('.idea-category');
    if (catItem) {
      var nameEl = catItem.querySelector('.idea-category__name');
      if (nameEl) toolName = nameEl.textContent.trim();
    }
    if (!toolName) {
      var panel    = copyBtn.closest('.instr-panel');
      var titleEl  = panel && panel.querySelector('.instr-panel__title');
      if (titleEl) toolName = titleEl.textContent.trim().replace(/^Public Instruction Set\s*[—–-]\s*/i, '');
    }
    track('instruction_set_copied', {
      tool_name: (toolName || 'unknown').substring(0, 50)
    });
  });

  /* ── Persona card flip (issues.html) ─────────────────────────────────────
     issues.js flips first; is-flipped reflects the new state.
     Only track when the card just flipped TO the flipped state. */
  document.addEventListener('click', function (e) {
    var card = e.target.closest('.persona-card');
    if (!card) return;
    if (!card.classList.contains('is-flipped')) return; /* just unflipped — skip */
    var nameEl = card.querySelector('.persona-card__name');
    track('persona_card_flipped', {
      persona_name: (nameEl ? nameEl.textContent.trim() : 'unknown').substring(0, 50)
    });
  });

  /* ── Issue deep-dive link (issues.html) ──────────────────────────────────
     Relative hrefs like "issues/roads-infrastructure.html" */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href*="issues/"]');
    if (!link) return;
    var href = link.getAttribute('href') || '';
    /* Exclude nav links like /pages/issues (no trailing slash before a slug) */
    if (!/issues\/[a-z]/.test(href)) return;
    var slug = href.split('/').pop().replace(/\.html$/, '');
    track('issue_deep_dive_clicked', { issue_name: slug.substring(0, 50) });
  });

  /* ── Photo lightbox trigger (hero image on many pages) ───────────────────
     site.js attaches to .issues-hero__visual[aria-haspopup="dialog"];
     our delegation fires for the same clicks. */
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('.issues-hero__visual[aria-haspopup="dialog"]');
    if (!trigger) return;
    var img   = trigger.querySelector('img');
    var label = img && img.alt ? img.alt : document.title;
    track('photo_lightbox_opened', { photo_label: label.substring(0, 80) });
  });

  /* ── Social link clicks ───────────────────────────────────────────────────
     Matches donforbedford Facebook and Instagram links site-wide. */
  document.addEventListener('click', function (e) {
    var link = e.target.closest(
      'a[href*="facebook.com/donforbedford"], a[href*="instagram.com/donforbedford"]'
    );
    if (!link) return;
    var href     = link.href || '';
    var platform = href.includes('facebook') ? 'facebook' : 'instagram';
    var loc =
      link.closest('.site-nav__mobile') ? 'nav_mobile' :
      link.closest('.site-nav')         ? 'nav' :
      link.closest('.site-footer')      ? 'footer' :
      link.closest('.rule-card__cta')   ? 'rule_cta' :
      link.closest('.links-social')     ? 'links_page' : 'page';
    track('social_link_clicked', { platform: platform, trigger_location: loc });
  });

  /* ── Wallpaper download (rules.html Rule 01) ─────────────────────────────
     Matches any <a download> link on the site. */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[download]');
    if (!link) return;
    track('wallpaper_downloaded', {});
  });

  /* ── SPCA link (rules.html Rule 02) ──────────────────────────────────────
  */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href*="spcawestchester.org"]');
    if (!link) return;
    track('spca_link_clicked', {});
  });

  /* ── Blog article share (blog article pages) ─────────────────────────────
     Listens for clicks on the share dropdown items by id. */
  document.addEventListener('click', function (e) {
    var item = e.target.closest('#share-facebook, #share-twitter, #share-email, #share-sms, #share-copy');
    if (!item) return;
    var method = item.id.replace('share-', '') || 'unknown';
    track('article_shared', {
      share_method: method,
      article_title: document.title.substring(0, 80)
    });
  });

  /* ── Blog article AI summary toggle ─────────────────────────────────────
     Only fire when summary is about to open (currently hidden). */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('#summarize-btn');
    if (!btn) return;
    var summary = document.getElementById('ai-summary');
    if (!summary || !summary.hidden) return; /* already open — skip */
    track('article_summary_toggled', {
      article_title: document.title.substring(0, 80)
    });
  });

  /* ── Links page share button ─────────────────────────────────────────────
  */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('#links-share-btn');
    if (!btn) return;
    track('links_page_shared', {
      share_method: navigator.share ? 'native' : 'copy'
    });
  });

  /* ── Scroll milestones ────────────────────────────────────────────────────
     GA4 Enhanced Measurement fires at 90%. This adds 25 / 50 / 75.
     Each milestone fires only once per page load. */
  var MILESTONES = [25, 50, 75];
  var fired      = {};

  function onScroll() {
    var total   = document.documentElement.scrollHeight;
    var visible = window.scrollY + window.innerHeight;
    var pct     = total > 0 ? Math.round((visible / total) * 100) : 0;
    for (var i = 0; i < MILESTONES.length; i++) {
      var m = MILESTONES[i];
      if (pct >= m && !fired[m]) {
        fired[m] = true;
        track('scroll_milestone', {
          milestone: m,
          page_path: window.location.pathname
        });
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); /* check immediately (short pages may be pre-scrolled) */

})();
