/* UNCAMPAIGN — Issue detail page: voice panel accordion (mobile) + hero lightbox */
(function () {
  'use strict';

  var panels = document.querySelectorAll('.voice-panel');
  if (!panels.length) return;

  panels.forEach(function (panel) {
    var trigger = panel.querySelector('.voice-panel__trigger');
    if (!trigger) return;

    trigger.addEventListener('click', function () {
      var isOpen = panel.classList.contains('is-open');

      // Collapse all panels
      panels.forEach(function (p) {
        p.classList.remove('is-open');
        var t = p.querySelector('.voice-panel__trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });

      // Open this one if it was closed
      if (!isOpen) {
        panel.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

})();

/* --- Hero image lightbox (same pattern as /issues page) --- */
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
