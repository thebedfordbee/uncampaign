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
