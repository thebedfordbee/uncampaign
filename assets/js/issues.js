/* UNCAMPAIGN — Issues page: persona card flip */
(function () {
  'use strict';

  var cards = document.querySelectorAll('.persona-card');
  if (!cards.length) return;

  cards.forEach(function (card) {
    var front = card.querySelector('.persona-card__front');
    var back  = card.querySelector('.persona-card__back');
    var backBtn = card.querySelector('.persona-card__back-btn');
    var nameEl  = card.querySelector('.persona-card__name');
    var baseName = nameEl ? nameEl.textContent.trim() : 'Persona';

    function doFlip() {
      var flipped = card.classList.toggle('is-flipped');
      card.setAttribute('aria-pressed', String(flipped));
      card.setAttribute('aria-label',
        flipped ? baseName + ' — tap to go back'
                : baseName + ' — tap to learn more');
      if (front) front.setAttribute('aria-hidden', String(flipped));
      if (back)  back.setAttribute('aria-hidden', String(!flipped));
      if (backBtn) backBtn.tabIndex = flipped ? 0 : -1;
    }

    function doUnflip() {
      card.classList.remove('is-flipped');
      card.setAttribute('aria-pressed', 'false');
      card.setAttribute('aria-label', baseName + ' — tap to learn more');
      if (front) front.setAttribute('aria-hidden', 'false');
      if (back)  back.setAttribute('aria-hidden', 'true');
      if (backBtn) backBtn.tabIndex = -1;
      card.focus();
    }

    // Set initial tabindex on back button
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
})();
