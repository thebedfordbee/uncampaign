/* UNCAMPAIGN — Site JS */
(function () {
  'use strict';

  // --- Mobile nav toggle ---
  var toggle = document.querySelector('.nav-toggle');
  var mobileMenu = document.querySelector('.site-nav__mobile');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      mobileMenu.classList.toggle('is-open', !expanded);
    });

    // Close when a nav link is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('is-open');
      });
    });

    // Close when clicking outside the header
    document.addEventListener('click', function (e) {
      if (!toggle.closest('.site-header').contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('is-open');
      }
    });
  }

  // --- FAQ accordion ---
  var questions = document.querySelectorAll('.faq-item__question');

  questions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      var answerId = this.getAttribute('aria-controls');
      var answer = document.getElementById(answerId);

      // Collapse all other items
      questions.forEach(function (other) {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          var otherAnswer = document.getElementById(other.getAttribute('aria-controls'));
          if (otherAnswer) otherAnswer.style.maxHeight = '0';
        }
      });

      // Toggle this item
      this.setAttribute('aria-expanded', String(!expanded));
      if (answer) {
        answer.style.maxHeight = expanded ? '0' : answer.scrollHeight + 'px';
      }
    });
  });

})();

// --- Instruction set reveal + copy-to-clipboard ---
(function () {
  'use strict';

  // Toggle reveal
  document.querySelectorAll('[data-instr-toggle]').forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('data-instr-toggle'));
    if (!panel) return;

    btn.addEventListener('click', function () {
      var isHidden = panel.hasAttribute('hidden');
      if (isHidden) {
        panel.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        panel.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Copy all
  document.querySelectorAll('.instr-panel__copy').forEach(function (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var panel  = copyBtn.closest('.instr-panel');
      var textEl = panel && panel.querySelector('.instr-panel__text');
      if (!textEl) return;
      var text = textEl.textContent.trim();

      function confirm() {
        var lbl = copyBtn.querySelector('.instr-panel__copy-label');
        if (lbl) lbl.textContent = 'Copied!';
        copyBtn.classList.add('is-copied');
        setTimeout(function () {
          if (lbl) lbl.textContent = 'Copy All';
          copyBtn.classList.remove('is-copied');
        }, 2200);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(confirm).catch(function () { fallback(text, confirm); });
      } else {
        fallback(text, confirm);
      }
    });
  });

  function fallback(text, cb) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try { if (document.execCommand('copy')) cb(); } catch (e) {}
    document.body.removeChild(ta);
  }

})();

// --- Instruction set close (X) buttons ---
(function () {
  'use strict';
  document.querySelectorAll('.instr-panel__close').forEach(function (closeBtn) {
    closeBtn.addEventListener('click', function () {
      var panel = closeBtn.closest('.instr-panel');
      if (!panel) return;
      panel.setAttribute('hidden', '');
      var panelId = panel.id;
      var toggleBtn = panelId ? document.querySelector('[data-instr-toggle="' + panelId + '"]') : null;
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.focus();
      }
    });
  });
})();

// --- Hero image lightbox ---
// Handles any .issues-hero__visual[aria-haspopup="dialog"] button on any page.
(function () {
  'use strict';

  var triggers = document.querySelectorAll('.issues-hero__visual[aria-haspopup="dialog"]');
  if (!triggers.length) return;

  var overlay = document.createElement('div');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Expanded image');
  overlay.setAttribute('tabindex', '-1');
  overlay.style.cssText = 'position:fixed;inset:0;z-index:500;display:none;align-items:center;justify-content:center;padding:1.5rem;background:rgba(10,10,10,0.92);cursor:zoom-out';

  var lbImg = document.createElement('img');
  lbImg.style.cssText = 'max-width:100%;max-height:90vh;object-fit:contain;display:block;border-radius:6px;box-shadow:0 24px 80px rgba(0,0,0,0.5);cursor:default';
  lbImg.alt = '';

  var lbClose = document.createElement('button');
  lbClose.type = 'button';
  lbClose.setAttribute('aria-label', 'Close expanded image');
  lbClose.innerHTML = '&#x2715;';
  lbClose.style.cssText = 'position:absolute;top:0.75rem;right:0.75rem;width:2.25rem;height:2.25rem;border-radius:50%;border:none;background:rgba(0,0,0,0.6);color:#fff;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;z-index:1;flex-shrink:0';

  overlay.appendChild(lbImg);
  overlay.appendChild(lbClose);
  document.body.appendChild(overlay);

  function openLightbox(trigger) {
    var heroImg = trigger.querySelector('img');
    if (!heroImg) return;
    lbImg.src = heroImg.src;
    lbImg.alt = heroImg.alt;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    overlay.focus();
  }

  function closeLightbox() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () { openLightbox(trigger); });
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });

  lbClose.addEventListener('click', function (e) {
    e.stopPropagation();
    closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.style.display !== 'none') closeLightbox();
  });
})();

// =============================================
// BEGIN SUBSCRIBE MODAL
// Intercepts all a[href="https://donforbedford.substack.com/"] clicks
// and opens a custom email capture modal backed by the Apps Script endpoint.
// To revert: remove this block and the matching CSS block in site.css.
// =============================================
(function () {
  'use strict';

  var APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwjYjib02X1GLNhqqVnGCjEcAYPVNwSLceFhNUEFg5CvBIzqcBolAVeTMx09-i9_CFN/exec';

  // --- Build modal DOM ---
  var overlay = document.createElement('div');
  overlay.id = 'subscribe-modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'subscribe-modal-headline');
  overlay.setAttribute('tabindex', '-1');

  overlay.innerHTML =
    '<div class="subscribe-modal__panel">' +
      '<button class="subscribe-modal__close" type="button" aria-label="Close subscribe form">&#x2715;</button>' +

      '<div class="subscribe-modal__form-view">' +
        '<p class="eyebrow subscribe-modal__eyebrow">Uncampaign Updates</p>' +
        '<h2 class="subscribe-modal__headline" id="subscribe-modal-headline">Receive Uncampaign Updates</h2>' +
        '<p class="subscribe-modal__body">Useful, occasional emails from Don during the campaign. Bedford updates, campaign experiments, local questions, and the occasional useful thing that would never survive a normal campaign newsletter.</p>' +
        '<form class="subscribe-modal__form" novalidate>' +
          '<div class="subscribe-modal__field">' +
            '<label class="subscribe-modal__label" for="subscribe-email">Email address</label>' +
            '<input class="subscribe-modal__input" type="email" id="subscribe-email" name="email" autocomplete="email" required placeholder="you@example.com">' +
          '</div>' +
          '<div class="subscribe-modal__field">' +
            '<label class="subscribe-modal__label" for="subscribe-name">Name <span class="subscribe-modal__optional">(optional)</span></label>' +
            '<input class="subscribe-modal__input" type="text" id="subscribe-name" name="name" autocomplete="given-name" placeholder="Your name">' +
          '</div>' +
          '<p class="subscribe-modal__error" role="alert" aria-live="polite" hidden></p>' +
          '<button class="btn btn--primary subscribe-modal__submit" type="submit">' +
            '<span class="subscribe-modal__btn-label">Subscribe</span>' +
            '<span class="subscribe-modal__btn-loading" hidden aria-hidden="true">Subscribing…</span>' +
          '</button>' +
        '</form>' +
        '<p class="subscribe-modal__fine-print">No fundraising blasts. No spam. Just campaign updates and useful Bedford notes. You can unsubscribe anytime.</p>' +
      '</div>' +

      '<div class="subscribe-modal__success-view" hidden>' +
        '<p class="subscribe-modal__success-icon" aria-hidden="true">&#x2713;</p>' +
        ‘<h2 class="subscribe-modal__headline subscribe-modal__success-headline">You’re on the list.</h2>’ +
        '<p class="subscribe-modal__body">Thanks for keeping an eye on this very abnormal campaign.</p>' +
        '<button class="btn btn--secondary subscribe-modal__done" type="button">Close</button>' +
      '</div>' +

    '</div>';

  document.body.appendChild(overlay);

  var closeBtn    = overlay.querySelector('.subscribe-modal__close');
  var form        = overlay.querySelector('.subscribe-modal__form');
  var emailInput  = overlay.querySelector('#subscribe-email');
  var nameInput   = overlay.querySelector('#subscribe-name');
  var errorEl     = overlay.querySelector('.subscribe-modal__error');
  var submitBtn   = overlay.querySelector('.subscribe-modal__submit');
  var btnLabel    = overlay.querySelector('.subscribe-modal__btn-label');
  var btnLoading  = overlay.querySelector('.subscribe-modal__btn-loading');
  var formView    = overlay.querySelector('.subscribe-modal__form-view');
  var successView = overlay.querySelector('.subscribe-modal__success-view');
  var doneBtn     = overlay.querySelector('.subscribe-modal__done');
  var lastFocused = null;
  var submitting  = false;

  function openModal(trigger) {
    lastFocused = trigger || null;
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (emailInput) emailInput.focus();
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocused) {
      try { lastFocused.focus(); } catch (e) {}
      lastFocused = null;
    }
  }

  function resetModal() {
    formView.removeAttribute('hidden');
    successView.setAttribute('hidden', '');
    if (form) form.reset();
    clearError();
    setLoading(false);
  }

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.removeAttribute('hidden');
    if (emailInput) emailInput.classList.add('is-invalid');
  }

  function clearError() {
    errorEl.setAttribute('hidden', '');
    errorEl.textContent = '';
    if (emailInput) emailInput.classList.remove('is-invalid');
  }

  function setLoading(loading) {
    submitting = loading;
    submitBtn.disabled = loading;
    if (loading) {
      btnLabel.setAttribute('hidden', '');
      btnLoading.removeAttribute('hidden');
      btnLoading.removeAttribute('aria-hidden');
    } else {
      btnLabel.removeAttribute('hidden');
      btnLoading.setAttribute('hidden', '');
      btnLoading.setAttribute('aria-hidden', 'true');
    }
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  function apiPost(payload) {
    var body = JSON.stringify(payload);
    return fetch(APPS_SCRIPT_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body:    body
    }).catch(function () {
      return fetch(APPS_SCRIPT_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body:    new URLSearchParams({ payload: body }).toString()
      });
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (submitting) return;

      clearError();

      var email = emailInput ? emailInput.value.trim() : '';
      var name  = nameInput  ? nameInput.value.trim()  : '';

      if (!email || !isValidEmail(email)) {
        showError('Please enter a valid email address.');
        if (emailInput) emailInput.focus();
        return;
      }

      setLoading(true);

      apiPost({
        action:     'subscribe',
        email:      email,
        name:       name,
        source:     'subscribe_modal',
        page:       window.location.pathname,
        user_agent: navigator.userAgent
      })
      .then(function () {
        setLoading(false);
        formView.setAttribute('hidden', '');
        successView.removeAttribute('hidden');
        if (doneBtn) doneBtn.focus();
      })
      .catch(function () {
        setLoading(false);
        showError('Something went wrong. Please try again, or email Don directly.');
      });
    });
  }

  // Wire all subscribe CTAs by their shared Substack href
  var ctaTriggers = document.querySelectorAll('a[href="https://donforbedford.substack.com/"]');
  ctaTriggers.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      resetModal();
      openModal(el);
    });
  });

  // Close: backdrop click
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  // Close: close button
  if (closeBtn) {
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeModal();
    });
  }

  // Close: done button in success view
  if (doneBtn) {
    doneBtn.addEventListener('click', closeModal);
  }

  // Close: Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
  });

  // Focus trap — only considers elements not inside a [hidden] ancestor
  overlay.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var candidates = overlay.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    var focusable = Array.prototype.filter.call(candidates, function (el) {
      return !el.closest('[hidden]');
    });
    var first = focusable[0];
    var last  = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  });

})();
// =============================================
// END SUBSCRIBE MODAL
// =============================================
