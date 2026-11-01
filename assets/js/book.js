/* Book us: preselect the package from the cards, validate, and send the
   performance request to /api/book (which emails it through Resend).
   Without JavaScript the form still posts to /api/book and comes back to
   /book-us?sent=1 or ?error=1. */
(function () {
  var form = document.getElementById('booking-form');
  if (!form) return;

  var select = document.getElementById('bf-package');
  var errorBox = document.getElementById('bf-error');
  var sentBox = document.getElementById('bf-sent');
  var button = form.querySelector('.form-submit');
  var FALLBACK = 'Sorry, we couldn’t send your request. Please email us at gurugarjana@gmail.com.';

  function choosePackage(key) {
    if (!key) return;
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].value === key) { select.value = key; return true; }
    }
  }

  function showError(text) {
    errorBox.textContent = text;
    errorBox.hidden = false;
  }

  function showSent() {
    form.hidden = true;
    sentBox.hidden = false;
    sentBox.focus();
  }

  // Package from the address, e.g. /book-us?package=rhythm#request
  var params = new URLSearchParams(window.location.search);
  choosePackage(params.get('package'));
  if (params.get('sent') === '1') showSent();
  if (params.get('error') === '1') showError(FALLBACK);

  // No past dates
  var date = document.getElementById('bf-date');
  var now = new Date();
  date.min = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  // Package buttons: select the package and jump to the form without reloading
  document.querySelectorAll('[data-package]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (!choosePackage(link.getAttribute('data-package'))) return;
      event.preventDefault();
      history.replaceState(null, '', '?package=' + link.getAttribute('data-package') + '#request');
      document.getElementById('request').scrollIntoView({ behavior: 'smooth' });
      document.getElementById('bf-name').focus({ preventScroll: true });
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    errorBox.hidden = true;

    var firstInvalid = null;
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      if (field.name === 'company') return;
      var ok = field.checkValidity();
      if (field.type !== 'radio') field.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (!ok && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      showError('Please fill in every field. The highlighted ones still need an answer.');
      firstInvalid.focus();
      return;
    }

    var data = {};
    new FormData(form).forEach(function (value, key) { data[key] = value; });

    button.disabled = true;
    button.textContent = 'Sending…';

    fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        return response.json().catch(function () { return {}; }).then(function (body) {
          if (!response.ok) throw new Error(body.error || 'failed');
        });
      })
      .then(showSent)
      .catch(function (err) {
        showError(err && err.message && err.message.indexOf('Please') === 0 ? err.message : FALLBACK);
        button.disabled = false;
        button.textContent = 'Send booking request';
      });
  });
})();
