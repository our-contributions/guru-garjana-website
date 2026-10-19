// Share page: "if each of us tells N friends" calculator and copy-message button.
(function () {
  var GOAL = 1000000;
  var friendsEl = document.getElementById('chain-friends');
  var roundsEl = document.getElementById('chain-rounds');
  var rowsEl = document.getElementById('chain-rows');
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-friends]'));

  function series(k) {
    var total = 1, wave = 1, rounds = 0, out = [];
    while (total < GOAL && rounds < 40) {
      rounds += 1;
      wave *= k;
      total += wave;
      out.push({ round: rounds, total: total });
    }
    return out;
  }

  function render(k) {
    var s = series(k);
    var n = s.length;
    var step = Math.max(1, Math.ceil(n / 5));
    var idx = [];
    for (var i = n - 1; i >= 0; i -= step) idx.unshift(i);
    idx = idx.slice(-5);
    friendsEl.textContent = k;
    roundsEl.textContent = n;
    rowsEl.innerHTML = idx.map(function (j) {
      var r = s[j];
      var size = Math.round(18 + Math.min(1, Math.log10(r.total) / 6.4) * 66);
      var last = j === n - 1 ? ' is-last' : '';
      return '<div class="chain-step"><div class="chain-dot' + last + '" style="width: ' + size + 'px; height: ' + size + 'px"></div>' +
        '<div class="chain-label">Round ' + r.round + '</div><div class="chain-total">' + r.total.toLocaleString('en-US') + '</div></div>';
    }).join('');
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(Number(b.getAttribute('data-friends')) === k));
    });
  }

  if (friendsEl && roundsEl && rowsEl) {
    buttons.forEach(function (b) {
      b.addEventListener('click', function () { render(Number(b.getAttribute('data-friends'))); });
    });
  }

  var copyBtn = document.getElementById('copy-btn');
  var copyLabel = document.getElementById('copy-label');
  var message = document.getElementById('share-message');
  if (!copyBtn || !copyLabel || !message) return;

  function copied() {
    copyLabel.textContent = 'Copied!';
    setTimeout(function () { copyLabel.textContent = 'Copy message'; }, 2500);
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); copied(); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
  }

  copyBtn.addEventListener('click', function () {
    var text = message.textContent.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(copied, function () { fallbackCopy(text); });
    } else {
      fallbackCopy(text);
    }
  });
})();
