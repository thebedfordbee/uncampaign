/* UNCAMPAIGN — Rules page: mobile expandable rule cards */
(function () {
  'use strict';

  var wrappers = document.querySelectorAll('.rule-card-wrapper');
  if (!wrappers.length) return;

  /* Wire ARIA IDs dynamically so HTML needs no hard-coded ids */
  wrappers.forEach(function (wrapper, i) {
    var cta = wrapper.querySelector('.rule-card__cta');
    var toggle = wrapper.querySelector('.rule-card__toggle');
    if (cta && !cta.id) { cta.id = 'rule-cta-' + (i + 1); }
    if (toggle && cta) { toggle.setAttribute('aria-controls', cta.id); }
  });

  /* Accordion: one card open at a time (mirrors /issues persona accordion) */
  wrappers.forEach(function (wrapper) {
    var toggle = wrapper.querySelector('.rule-card__toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
      var expanding = !wrapper.classList.contains('is-expanded');

      /* Collapse all open cards */
      wrappers.forEach(function (w) {
        if (w.classList.contains('is-expanded')) {
          w.classList.remove('is-expanded');
          var t = w.querySelector('.rule-card__toggle');
          if (t) {
            t.setAttribute('aria-expanded', 'false');
            var icon = t.querySelector('.rule-card__toggle-icon');
            if (icon) icon.textContent = '+';
          }
        }
      });

      /* Open this card if it was closed */
      if (expanding) {
        wrapper.classList.add('is-expanded');
        toggle.setAttribute('aria-expanded', 'true');
        var icon = toggle.querySelector('.rule-card__toggle-icon');
        if (icon) icon.textContent = '×'; /* × */
      }
    });
  });

})();
