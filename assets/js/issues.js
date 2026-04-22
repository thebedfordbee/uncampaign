/* UNCAMPAIGN — Issues page: persona card flip + mobile accordion */
(function () {
  'use strict';

  /* --- Persona card flip (front ↔ back) --- */
  var cards = document.querySelectorAll('.persona-card');
  if (cards.length) {
    cards.forEach(function (card) {
      var front   = card.querySelector('.persona-card__front');
      var back    = card.querySelector('.persona-card__back');
      var backBtn = card.querySelector('.persona-card__back-btn');
      var nameEl  = card.querySelector('.persona-card__name');
      var baseName = nameEl ? nameEl.textContent.trim() : 'Persona';

      function doFlip() {
        var flipped = card.classList.toggle('is-flipped');
        card.setAttribute('aria-pressed', String(flipped));
        card.setAttribute('aria-label',
          flipped ? baseName + ' — tap to go back'
                  : baseName + ' — tap to learn more');
        if (front)   front.setAttribute('aria-hidden', String(flipped));
        if (back)    back.setAttribute('aria-hidden', String(!flipped));
        if (backBtn) backBtn.tabIndex = flipped ? 0 : -1;
      }

      function doUnflip() {
        card.classList.remove('is-flipped');
        card.setAttribute('aria-pressed', 'false');
        card.setAttribute('aria-label', baseName + ' — tap to learn more');
        if (front)   front.setAttribute('aria-hidden', 'false');
        if (back)    back.setAttribute('aria-hidden', 'true');
        if (backBtn) backBtn.tabIndex = -1;
        card.focus();
      }

      if (backBtn) backBtn.tabIndex = -1;

      card.addEventListener('click', function (e) {
        if (e.target === backBtn || (backBtn && backBtn.contains(e.target))) return;
        doFlip();
      });

      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          doFlip();
        }
      });

      if (backBtn) {
        backBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          doUnflip();
        });
      }
    });
  }

  /* --- Mobile persona accordion (expand/collapse rows) --- */
  var wrappers = document.querySelectorAll('.persona-card-wrapper');
  if (!wrappers.length) return;

  function resetCard(card) {
    if (!card || !card.classList.contains('is-flipped')) return;
    var front   = card.querySelector('.persona-card__front');
    var back    = card.querySelector('.persona-card__back');
    var backBtn = card.querySelector('.persona-card__back-btn');
    var nameEl  = card.querySelector('.persona-card__name');
    card.classList.remove('is-flipped');
    card.setAttribute('aria-pressed', 'false');
    if (nameEl) card.setAttribute('aria-label', nameEl.textContent.trim() + ' — tap to learn more');
    if (front)   front.setAttribute('aria-hidden', 'false');
    if (back)    back.setAttribute('aria-hidden', 'true');
    if (backBtn) backBtn.tabIndex = -1;
  }

  wrappers.forEach(function (wrapper) {
    var trigger = wrapper.querySelector('.persona-row-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', function () {
      var expanding = !wrapper.classList.contains('is-expanded');

      // Collapse all wrappers and reset any flipped cards inside
      wrappers.forEach(function (w) {
        if (w.classList.contains('is-expanded')) {
          w.classList.remove('is-expanded');
          var t = w.querySelector('.persona-row-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
          resetCard(w.querySelector('.persona-card'));
        }
      });

      // Open the tapped wrapper if it was closed
      if (expanding) {
        wrapper.classList.add('is-expanded');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

})();

/* --- Roundtable image lightbox --- */
(function () {
  'use strict';

  var trigger  = document.querySelector('.issues-hero__visual');
  var modal    = document.getElementById('rt-modal');
  if (!trigger || !modal) return;

  var closeBtn = modal.querySelector('.rt-modal__close');
  var backdrop = modal.querySelector('.rt-modal__backdrop');
  var lastFocus;

  function openModal() {
    lastFocus = document.activeElement;
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function closeModal() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeydown);
    if (lastFocus) lastFocus.focus();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') closeModal();
  }

  trigger.addEventListener('click', openModal);
  if (closeBtn)  closeBtn.addEventListener('click',  closeModal);
  if (backdrop)  backdrop.addEventListener('click',  closeModal);

})();
