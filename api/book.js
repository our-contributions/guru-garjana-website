// Vercel serverless function: POST /api/book
// Emails a performance request from /book-us through Resend (https://resend.com).
//
// Environment variables (Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY  required. Until it is set, requests fail with a message
//                   that points people to gurugarjana@gmail.com.
//   BOOKING_TO      optional. Where requests go. Default: gurugarjana@gmail.com
//   BOOKING_FROM    optional. Sender, on a domain verified in Resend, e.g.
//                   "Guru Garjana Website <bookings@gurugarjana.org>".
//                   Default: Resend's test sender, which can only deliver to
//                   the email address of the Resend account owner.

const PACKAGES = {
  'not-sure': 'Not sure yet',
  'rhythm': 'Rhythm (from $300)',
  'celebration': 'Celebration (from $500)',
  'grand-garjana': 'Grand Garjana (from $1,000)',
  'cause': 'Performing for a cause'
};
const DURATIONS = ['30 minutes', '1 hour', 'More than 1 hour'];
const TYPES = ['Procession', 'Stage performance'];
const LIMITS = { name: 200, email: 100, phone: 30, date: 10, time: 5, address: 300, message: 1000 };

function clean(value, max) {
  return String(value == null ? '' : value).replace(/\r\n?/g, '\n').trim().slice(0, max);
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function validate(body) {
  const f = {};
  for (const key of Object.keys(LIMITS)) f[key] = clean(body[key], LIMITS[key]);
  f.package = clean(body.package, 30);
  f.duration = clean(body.duration, 30);
  f.type = clean(body.type, 30);

  const missing = Object.keys(LIMITS).filter((k) => !f[k]);
  if (missing.length) return { error: 'Please fill in every field.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return { error: 'Please check your email address.' };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(f.date)) return { error: 'Please check the date.' };
  if (!/^\d{2}:\d{2}$/.test(f.time)) return { error: 'Please check the start time.' };
  if (!PACKAGES[f.package]) return { error: 'Please choose a package.' };
  if (!DURATIONS.includes(f.duration)) return { error: 'Please choose a duration.' };
  if (!TYPES.includes(f.type)) return { error: 'Please choose a type of performance.' };
  return { fields: f };
}

function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC'
  });
}

function formatTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
}

function buildEmail(f) {
  const rows = [
    ['Package', PACKAGES[f.package]],
    ['Name', f.name],
    ['Email', f.email],
    ['Phone', f.phone],
    ['Date', formatDate(f.date)],
    ['Start time', formatTime(f.time)],
    ['Duration', f.duration],
    ['Type', f.type],
    ['Address', f.address],
    ['Message', f.message]
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n') + '\n\nReply to this email to answer the requester.';
  const html =
    '<div style="font-family:Arial,sans-serif;font-size:15px;color:#221C26">' +
    '<h2 style="color:#662D91;margin:0 0 16px">New performance request</h2>' +
    '<table cellpadding="8" style="border-collapse:collapse">' +
    rows.map(([k, v]) =>
      `<tr><td style="border-bottom:1px solid #E7E1EA;font-weight:bold;vertical-align:top;white-space:nowrap">${k}</td>` +
      `<td style="border-bottom:1px solid #E7E1EA;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`).join('') +
    '</table><p style="color:#5E5566">Reply to this email to answer the requester.</p></div>';
  return {
    subject: `Booking request: ${PACKAGES[f.package]} on ${formatDate(f.date)}`,
    text,
    html
  };
}

function reply(req, res, status, error) {
  const wantsJson = (req.headers.accept || '').includes('application/json') ||
    (req.headers['content-type'] || '').includes('application/json');
  if (wantsJson) {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(error ? { ok: false, error } : { ok: true }));
  } else {
    // Plain HTML form post (no JavaScript): go back to the page
    res.statusCode = 303;
    res.setHeader('Location', error ? '/book-us?error=1#request' : '/book-us?sent=1#request');
    res.end();
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.statusCode = 405;
    return res.end();
  }

  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = Object.fromEntries(new URLSearchParams(body)); }
  }

  // Hidden "company" field: people never see it, spam bots fill it in
  if (clean(body.company, 200)) return reply(req, res, 200);

  const { fields, error } = validate(body);
  if (error) return reply(req, res, 400, error);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('book: RESEND_API_KEY is not set');
    return reply(req, res, 503, 'not_configured');
  }

  const email = buildEmail(fields);
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.BOOKING_FROM || 'Guru Garjana Website <onboarding@resend.dev>',
        to: [process.env.BOOKING_TO || 'gurugarjana@gmail.com'],
        reply_to: fields.email,
        subject: email.subject,
        text: email.text,
        html: email.html
      })
    });
    if (!response.ok) {
      console.error('book: Resend error', response.status, await response.text());
      return reply(req, res, 502, 'send_failed');
    }
  } catch (err) {
    console.error('book: Resend request failed', err);
    return reply(req, res, 502, 'send_failed');
  }

  return reply(req, res, 200);
};

module.exports._test = { validate, buildEmail };
