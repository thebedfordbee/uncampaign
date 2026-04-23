/* UNCAMPAIGN — Issue detail page: voice panel accordion (mobile) */
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
