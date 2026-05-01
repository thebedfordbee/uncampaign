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
// Opens a custom email capture modal on any [data-subscribe-trigger] click.
// Modal DOM is injected by this script; no per-page HTML changes required.
// To revert: remove this block and the matching CSS block in site.css.
// =============================================
(function () {
  "use strict";

  var API_URL = "https://script.google.com/macros/s/AKfycbwjYjib02X1GLNhqqVnGCjEcAYPVNwSLceFhNUEFg5CvBIzqcBolAVeTMx09-i9_CFN/exec";

  function init() {
    /* ---------- Build modal DOM ---------- */
    var overlay = document.createElement("div");
    overlay.id = "subscribe-modal-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "subscribe-modal-headline");
    overlay.setAttribute("tabindex", "-1");

    var panel = document.createElement("div");
    panel.className = "subscribe-modal__panel";
    overlay.appendChild(panel);

    var closeBtn = document.createElement("button");
    closeBtn.className = "subscribe-modal__close";
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Close subscribe form");
    closeBtn.innerHTML = "&#x2715;";
    panel.appendChild(closeBtn);

    /* Form view */
    var formView = document.createElement("div");
    formView.className = "subscribe-modal__form-view";
    panel.appendChild(formView);

    var eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow subscribe-modal__eyebrow";
    eyebrow.textContent = "Uncampaign Updates";
    formView.appendChild(eyebrow);

    var headline = document.createElement("h2");
    headline.className = "subscribe-modal__headline";
    headline.id = "subscribe-modal-headline";
    headline.textContent = "Sign Up";
    formView.appendChild(headline);

    var bodyP = document.createElement("p");
    bodyP.className = "subscribe-modal__body";
    bodyP.textContent = "Occasional notes from Don — Bedford updates, campaign experiments, and useful things.";
    formView.appendChild(bodyP);

    var form = document.createElement("form");
    form.className = "subscribe-modal__form";
    form.noValidate = true;
    formView.appendChild(form);

    /* Email field */
    var emailField = document.createElement("div");
    emailField.className = "subscribe-modal__field";
    form.appendChild(emailField);

    var emailLabel = document.createElement("label");
    emailLabel.className = "subscribe-modal__label";
    emailLabel.setAttribute("for", "subscribe-email");
    emailLabel.textContent = "Email address";
    emailField.appendChild(emailLabel);

    var emailInput = document.createElement("input");
    emailInput.className = "subscribe-modal__input";
    emailInput.type = "email";
    emailInput.id = "subscribe-email";
    emailInput.name = "email";
    emailInput.autocomplete = "email";
    emailInput.required = true;
    emailInput.placeholder = "you@example.com";
    emailField.appendChild(emailInput);

    /* Name field */
    var nameField = document.createElement("div");
    nameField.className = "subscribe-modal__field";
    form.appendChild(nameField);

    var nameLabel = document.createElement("label");
    nameLabel.className = "subscribe-modal__label";
    nameLabel.setAttribute("for", "subscribe-name");
    nameLabel.appendChild(document.createTextNode("Name "));
    var optSpan = document.createElement("span");
    optSpan.className = "subscribe-modal__optional";
    optSpan.textContent = "(optional)";
    nameLabel.appendChild(optSpan);
    nameField.appendChild(nameLabel);

    var nameInput = document.createElement("input");
    nameInput.className = "subscribe-modal__input";
    nameInput.type = "text";
    nameInput.id = "subscribe-name";
    nameInput.name = "name";
    nameInput.autocomplete = "given-name";
    nameInput.placeholder = "Your Name";
    nameField.appendChild(nameInput);

    /* Error */
    var errorEl = document.createElement("p");
    errorEl.className = "subscribe-modal__error";
    errorEl.setAttribute("role", "alert");
    errorEl.setAttribute("aria-live", "polite");
    errorEl.hidden = true;
    form.appendChild(errorEl);

    /* Submit button */
    var submitBtn = document.createElement("button");
    submitBtn.className = "btn btn--primary subscribe-modal__submit";
    submitBtn.type = "submit";
    form.appendChild(submitBtn);

    var btnLabel = document.createElement("span");
    btnLabel.className = "subscribe-modal__btn-label";
    btnLabel.textContent = "Subscribe";
    submitBtn.appendChild(btnLabel);

    var btnLoading = document.createElement("span");
    btnLoading.className = "subscribe-modal__btn-loading";
    btnLoading.hidden = true;
    btnLoading.setAttribute("aria-hidden", "true");
    btnLoading.textContent = "Subscribing…";
    submitBtn.appendChild(btnLoading);

    /* Fine print */
    var finePrint = document.createElement("p");
    finePrint.className = "subscribe-modal__fine-print";
    finePrint.textContent = "No fundraising. No spam. Unsubscribe anytime.";
    formView.appendChild(finePrint);

    /* Success view */
    var successView = document.createElement("div");
    successView.className = "subscribe-modal__success-view";
    successView.hidden = true;
    panel.appendChild(successView);

    var successIcon = document.createElement("p");
    successIcon.className = "subscribe-modal__success-icon";
    successIcon.setAttribute("aria-hidden", "true");
    successIcon.innerHTML = "&#x2713;";
    successView.appendChild(successIcon);

    var successHeadline = document.createElement("h2");
    successHeadline.className = "subscribe-modal__headline subscribe-modal__success-headline";
    successHeadline.textContent = "You’re on the list.";
    successView.appendChild(successHeadline);

    var successBody = document.createElement("p");
    successBody.className = "subscribe-modal__body";
    successBody.textContent = "Thanks for keeping an eye on this very abnormal campaign.";
    successView.appendChild(successBody);

    var doneBtn = document.createElement("button");
    doneBtn.className = "btn btn--secondary subscribe-modal__done";
    doneBtn.type = "button";
    doneBtn.textContent = "Close";
    successView.appendChild(doneBtn);

    document.body.appendChild(overlay);

    /* ---------- State ---------- */
    var lastFocused = null;
    var submitting  = false;

    function openModal(trigger) {
      lastFocused = trigger || null;
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
      emailInput.focus();
    }

    function closeModal() {
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
      if (lastFocused) {
        try { lastFocused.focus(); } catch (ignore) {}
        lastFocused = null;
      }
    }

    function resetModal() {
      formView.removeAttribute("hidden");
      successView.setAttribute("hidden", "");
      form.reset();
      clearError();
      setLoading(false);
    }

    function showError(msg) {
      errorEl.textContent = msg;
      errorEl.removeAttribute("hidden");
      emailInput.classList.add("is-invalid");
    }

    function clearError() {
      errorEl.setAttribute("hidden", "");
      errorEl.textContent = "";
      emailInput.classList.remove("is-invalid");
    }

    function setLoading(loading) {
      submitting = loading;
      submitBtn.disabled = loading;
      if (loading) {
        btnLabel.setAttribute("hidden", "");
        btnLoading.removeAttribute("hidden");
        btnLoading.removeAttribute("aria-hidden");
      } else {
        btnLabel.removeAttribute("hidden");
        btnLoading.setAttribute("hidden", "");
        btnLoading.setAttribute("aria-hidden", "true");
      }
    }

    function isValidEmail(val) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
    }

    function apiPost(payload) {
      var body = JSON.stringify(payload);
      return fetch(API_URL, {
        method:  "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body:    body
      }).catch(function () {
        return fetch(API_URL, {
          method:  "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
          body:    new URLSearchParams({ payload: body }).toString()
        });
      });
    }

    /* ---------- Event wiring ---------- */

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (submitting) return;
      clearError();
      var email = emailInput.value.trim();
      var name  = nameInput.value.trim();
      if (!email || !isValidEmail(email)) {
        showError("Please enter a valid email address.");
        emailInput.focus();
        return;
      }
      setLoading(true);
      apiPost({
        action:     "subscribe",
        email:      email,
        name:       name,
        source:     "subscribe_modal",
        page:       window.location.pathname,
        user_agent: navigator.userAgent
      })
      .then(function () {
        setLoading(false);
        formView.setAttribute("hidden", "");
        successView.removeAttribute("hidden");
        doneBtn.focus();
      })
      .catch(function () {
        setLoading(false);
        showError("Something went wrong. Please try again, or email Don directly.");
      });
    });

    /* Open: event delegation -- catches clicks on any [data-subscribe-trigger] */
    document.addEventListener("click", function (e) {
      var trigger = e.target.closest("[data-subscribe-trigger]");
      if (!trigger) return;
      e.preventDefault();
      e.stopPropagation();
      resetModal();
      openModal(trigger);
    });

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeModal();
    });

    closeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      closeModal();
    });

    doneBtn.addEventListener("click", closeModal);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) closeModal();
    });

    /* Focus trap */
    overlay.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var focusable = Array.prototype.filter.call(
        overlay.querySelectorAll("button:not([disabled]), input:not([disabled])"),
        function (el) { return !el.closest("[hidden]"); }
      );
      var first = focusable[0];
      var last  = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* Run after DOM is ready */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
// =============================================
// END SUBSCRIBE MODAL
// =============================================
