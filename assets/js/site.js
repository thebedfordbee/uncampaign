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
