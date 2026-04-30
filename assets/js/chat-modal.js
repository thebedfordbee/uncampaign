/* UNCAMPAIGN — Chat Request Modal
   Shared by /don-bot and /rules.
   Handles the multi-step "Request a Chat with Don" form flow and
   sends submissions to the same Google Apps Script endpoint used by /ideas,
   using action:"chatRequest" which writes to the "Chat Requests" sheet tab. */
(function () {
  'use strict';

  var CHAT_API_URL = 'https://script.google.com/macros/s/AKfycbwjYjib02X1GLNhqqVnGCjEcAYPVNwSLceFhNUEFg5CvBIzqcBolAVeTMx09-i9_CFN/exec';

  var modal       = document.getElementById('chat-req-modal');
  if (!modal) return;

  var backdrop    = document.getElementById('chat-req-backdrop');
  var closeBtn    = document.getElementById('chat-req-close');
  var step1       = document.getElementById('chat-step-1');
  var step2       = document.getElementById('chat-step-2');
  var step3       = document.getElementById('chat-step-3');
  var confirmEl   = document.getElementById('chat-req-confirm');
  var form        = document.getElementById('chat-req-form');
  var submitBtn   = document.getElementById('chat-req-submit');
  var errorEl     = document.getElementById('chat-req-error');
  var phoneField  = document.getElementById('chat-phone-field');
  var backTo1Btn  = document.getElementById('chat-back-1');
  var backTo2Btn  = document.getElementById('chat-back-2');
  var doneBtn     = document.getElementById('chat-req-done');

  var meetingType   = '';
  var preferredTime = '';
  var submitting    = false;
  var lastFocused   = null;

  /* ── Open / Close ─────────────────────────────────────────────────── */
  function openModal(triggerEl) {
    lastFocused = triggerEl || document.activeElement;
    resetModal();
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    var firstBtn = step1 && step1.querySelector('.chat-choice-btn');
    if (firstBtn) firstBtn.focus();
  }

  function closeModal() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function resetModal() {
    meetingType   = '';
    preferredTime = '';
    submitting    = false;
    showStep(1);
    modal.querySelectorAll('.chat-choice-btn').forEach(function (btn) {
      btn.classList.remove('is-selected');
      btn.setAttribute('aria-pressed', 'false');
    });
    if (form) form.reset();
    clearError();
    if (phoneField) phoneField.hidden = false;
    if (submitBtn) { submitBtn.textContent = 'Send Request'; submitBtn.disabled = false; }
    modal.querySelectorAll('.chat-req-form input, .chat-req-form textarea').forEach(function (el) {
      el.classList.remove('is-invalid');
    });
  }

  /* ── Step navigation ──────────────────────────────────────────────── */
  function showStep(n) {
    [step1, step2, step3, confirmEl].forEach(function (el) {
      if (el) el.hidden = true;
    });
    var target = null;
    if (n === 1)         target = step1;
    else if (n === 2)    target = step2;
    else if (n === 3)    target = step3;
    else if (n === 'ok') target = confirmEl;

    if (n === 3 && phoneField) {
      phoneField.hidden = (meetingType !== 'in-person');
    }

    if (target) {
      target.hidden = false;
      var first = target.querySelector('button:not([disabled]), input:not([disabled]), textarea:not([disabled])');
      if (first) first.focus();
    }
  }

  /* ── Step 1 — meeting type ────────────────────────────────────────── */
  if (step1) {
    step1.querySelectorAll('.chat-choice-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        meetingType = btn.getAttribute('data-value');
        step1.querySelectorAll('.chat-choice-btn').forEach(function (b) {
          b.classList.toggle('is-selected', b === btn);
          b.setAttribute('aria-pressed', String(b === btn));
        });
        setTimeout(function () { showStep(2); }, 160);
      });
    });
  }

  /* ── Step 2 — preferred time ──────────────────────────────────────── */
  if (step2) {
    step2.querySelectorAll('.chat-choice-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        preferredTime = btn.getAttribute('data-value');
        step2.querySelectorAll('.chat-choice-btn').forEach(function (b) {
          b.classList.toggle('is-selected', b === btn);
          b.setAttribute('aria-pressed', String(b === btn));
        });
        setTimeout(function () { showStep(3); }, 160);
      });
    });
  }

  /* ── Back buttons ─────────────────────────────────────────────────── */
  if (backTo1Btn) backTo1Btn.addEventListener('click', function () { showStep(1); });
  if (backTo2Btn) backTo2Btn.addEventListener('click', function () { showStep(2); });

  /* ── Form submission ──────────────────────────────────────────────── */
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (submitting) return;

      var name   = (document.getElementById('chat-name')   || {}).value || '';
      var street = (document.getElementById('chat-street') || {}).value || '';
      var email  = (document.getElementById('chat-email')  || {}).value || '';
      var phone  = (document.getElementById('chat-phone')  || {}).value || '';
      var note   = (document.getElementById('chat-note')   || {}).value || '';

      name   = name.trim();
      street = street.trim();
      email  = email.trim();
      phone  = phone.trim();
      note   = note.trim();

      modal.querySelectorAll('.chat-req-form input, .chat-req-form textarea').forEach(function (el) {
        el.classList.remove('is-invalid');
      });

      var err = '';
      if (!name)   { err = 'Your name is required.';              markInvalid('chat-name'); }
      else if (!street) { err = 'Street address is required.';    markInvalid('chat-street'); }
      else if (!email)  { err = 'Email address is required.';     markInvalid('chat-email'); }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        err = 'Please enter a valid email address.';               markInvalid('chat-email');
      } else if (meetingType === 'in-person' && !phone) {
        err = 'A cell phone number is required for in-person meetings.';
        markInvalid('chat-phone');
      }

      if (err) { showError(err); return; }
      clearError();

      submitting    = true;
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled    = true;

      var payload = {
        action:         'chatRequest',
        type:           'chat_request',
        meeting_format: meetingType,
        preferred_time: preferredTime,
        name:           name,
        street:         street,
        email:          email,
        phone:          phone,
        note:           note,
        submitted_at:   new Date().toISOString(),
        page_url:       window.location.href,
        user_agent:     navigator.userAgent
      };

      var rawBody = JSON.stringify(payload);

      function doPost(contentType, body) {
        return fetch(CHAT_API_URL, {
          method:  'POST',
          headers: { 'Content-Type': contentType },
          body:    body
        }).then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res;
        });
      }

      doPost('text/plain;charset=utf-8', rawBody)
      .catch(function () {
        return doPost(
          'application/x-www-form-urlencoded;charset=UTF-8',
          new URLSearchParams({ payload: rawBody }).toString()
        );
      })
      .then(function () {
        submitting = false;
        showStep('ok');
      })
      .catch(function () {
        submitting = false;
        submitBtn.textContent = 'Send Request';
        submitBtn.disabled    = false;
        showError('Something went wrong. Please try again, or email Don directly.');
      });
    });
  }

  /* ── Helpers ──────────────────────────────────────────────────────── */
  function showError(msg) {
    if (!errorEl) return;
    errorEl.textContent = msg;
    errorEl.hidden = false;
    errorEl.focus();
  }

  function clearError() {
    if (!errorEl) return;
    errorEl.textContent = '';
    errorEl.hidden = true;
  }

  function markInvalid(id) {
    var el = document.getElementById(id);
    if (el) el.classList.add('is-invalid');
  }

  /* ── Close / keyboard / backdrop ─────────────────────────────────── */
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  if (doneBtn)  doneBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
  });

  /* Focus trap */
  modal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var focusables = Array.from(modal.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    )).filter(function (el) {
      return !el.closest('[hidden]') && el.offsetParent !== null;
    });
    if (focusables.length < 2) return;
    var first = focusables[0];
    var last  = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });

  /* ── Wire up opener buttons ───────────────────────────────────────── */
  document.querySelectorAll('[data-chat-req-open]').forEach(function (btn) {
    btn.addEventListener('click', function () { openModal(btn); });
  });

  /* ── Auto-open from URL param (?ask=real-don) ─────────────────────── */
  try {
    var params = new URLSearchParams(window.location.search);
    if (params.get('ask') === 'real-don') {
      setTimeout(function () { openModal(null); }, 250);
    }
  } catch (e) {}

})();
