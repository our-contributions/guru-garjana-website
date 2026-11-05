# Guru Garjana Academy website

Static site: plain HTML, CSS and a little JavaScript. No build step, no framework.
Hosted on Vercel from the `main` branch of `our-contributions/guru-garjana-website`.
Every push to `main` goes live. Every other branch and pull request gets its own preview link.

## Working rules

- Make each change on a branch and open a pull request. Merge to `main` only after Abhishek approves the Vercel preview.
- Change only what is asked. The design below is settled; don't restyle or "improve" other parts.
- Never invent facts, numbers, quotes or names. Use a visible `[PLACEHOLDER]` and ask.
- Before finishing, check both pages at phone width (390 px) and desktop (1440 px): no sideways scrolling, every image loads, share-page buttons work. Quick local preview: `python3 -m http.server`, then open `/index.html` and `/1dollar.html`.

## Files

- `index.html`: home page
- `1dollar.html`: share page ("Give $1, tell 3 friends"), served at `/1dollar`
- `about-us.html`, `our-work.html`, `book-us.html`, `bootstrapping.html` ("Learn to play"), `blog.html`, `blog/*.html`: inner pages rebuilt from the old site, at the old addresses
- The header, toran and footer are repeated in every page except `1dollar.html`. A menu change means editing all of them (list in `README.md`).
- The menu's "Play With Us" goes to `/bootstrapping` (Learn to play). The footer keeps "Play With Us" (`/#join`, Saturday practice) and "Learn to Play" as separate links. Home "Come play with us" has a "What you get" heading (Learn / Grow / Serve).
- `assets/css/styles.css`: brand colour variables, goal dots, share-page buttons and circles
- `assets/js/give.js`: share-page calculator ("if each of us tells 2 / 3 / 5 friends") and the "Copy message" button
- `assets/js/book.js` and `api/book.js`: the performance request form on `book-us.html`. The page script preselects the package (`?package=rhythm`) and sends the form. `api/book.js` is a Vercel serverless function that emails the request through Resend. It needs `RESEND_API_KEY` in Vercel; `BOOKING_TO` and `BOOKING_FROM` are optional (see the top of the file).
- `assets/img/`: photos named by where they appear (table in `README.md`), plus logos and icons
- `vercel.json`: clean URLs, and redirects from the old site's pages (`/donate` and `/give` go to `/1dollar`; `/join-us` goes to `/#join`)
- Most styling is inline on elements, carried over from the original design. Follow the same pattern for new sections.

## Brand and colour logic

- Purple `#662D91` (CSS `--play`) is **our play and skills**: performing, practice, booking, team photos, stage-like bands.
- Gold `#FFBF00` (CSS `--serve`) is **serving the cause**: give and share buttons, the goal, the dots, the partner list, highlights.
- Gold is too light for text on white. Use it only for fills, highlights and shapes, with dark text `#221C26` on top. Purple carries coloured text.
- Mostly white pages. Section tints: lavender `#F7F2FA` (play sections), pale gold `#FFF8E6` (serve sections). Footer `#2A1838`.
- Text `#221C26`, secondary text `#5E5566`, dividers `#E7E1EA`.
- Buttons: serve actions use a gold background with dark text; play actions use a purple background with white text. Corner radius 10 px.
- Section labels: a short 28 × 3 px bar in the section's colour, then the label in dark text.
- Purple and gold together echo the Paithani saree pairing. That's intentional.

## Look and feel

- Minimal, warm and human. Real photos of the group only: no stock photos, no emoji, no gradient backgrounds.
- Fonts (Google Fonts): Tiro Devanagari Marathi for headings (Latin letters only), Mukta for body text, Kalam for small handwritten notes, used sparingly.
- Traditional touches, drawn as inline SVG or CSS:
  - a marigold-and-leaf toran under the header
  - arch-shaped photo frames (`border-radius: 999px 999px 14px 14px`) with an offset outline
  - triangle "temple border" edges on purple sections
  - a goal grid of 100 dots, each worth $10,000
- Logo: `logo-colour.png` in the header, `logo-white.png` on dark or purple backgrounds. The wordmark beside it is text: "Guru Garjana", with "ACADEMY" in small capitals.

## Writing rules

- English only. The audience is global: no country or city-specific references (no India, Mumbai, chai, Diwali). "Dhol-Tasha", "dhol" and "tasha" are fine.
- Warm, plain and short, written as "we" and "you". Every line should be concise and emotionally human.
- Headlines 8 words or fewer. Paragraphs 2 sentences or fewer. One feeling per section.
- The $1 ask is always spelled out: buttons say "Give $1"; the idea is "Give $1, then ask three friends to do the same". Never "pass it on" on its own, which reads as unclear.
- Never claim what $1 buys. The approved line: "Your $1 joins gifts from people everywhere. Together they fund schooling, meals and safety for children who need it most."
- Home "Three ways to add your beat", in this order: Play with us, Book us, Give $1 and ask 3 friends. No separate Donate or "Give monthly" card there (the Donate link stays in the footer and on Our work).
- Don't name individual members on the site without Abhishek's go-ahead.

## Facts in use (update everywhere when they change)

- Raised: **$30,000** as of Oct 2026. Goal **$1,000,000 by 2030**. Shown as 3 filled dots out of 100.
- "Our path" milestones: 2026 $30K (we are here), 2027 $100K, 2028 $250K, 2029 $500K, 2030 $1M.
- Drumming since 2022; 69+ performances. Non-profit 501(c)(3); donations are tax-deductible.
- Donations:
  - Zeffy form: https://www.zeffy.com/en-US/donation-form/donate-to-make-a-difference-20014
  - Zelle: gurugarjana@gmail.com
  - Employer matching through Benevity
- Partners: Kranti, Akshaya Patra, Friends of Foster Children (Palm Beach), Darkness to Light, Snehwan (snehwan.in: a home and schooling for children of struggling farming families). Plus "Animal rescue": any group caring for animals, pets or wild, with no named organisation. On the site they're described without place names.
- Partner lists appear in three places, so update all three: `index.html` (Our work), `our-work.html` (Our beats, their impact), `1dollar.html` (Where your $1 goes).
- Causes we serve (`our-work.html`): girls born into hardship, feeding hungry children, children in foster care, protecting children from abuse, and animals in need.
- Saturday practice, 8:30–10:30 AM:
  - North: Okeeheelee Park
  - Central: Quiet Waters, Tradewinds or Spanish River Athletic Park
  - South: Markham Park
  - Each park name links to Google Maps.
- The share message links to `https://gurugarjana.org/1dollar`. The social preview tags use `https://gurugarjana.org`.
- The caption under the top photo reads "That's us at BMM 2024!"
- Booking packages (`book-us.html`): Rhythm from $300 (at least 2 dhols, 1 tasha), Celebration from $500 (more than 4 dhols, 1 tasha), Grand Garjana from $1,000 (7–8 players), flexible pricing for causes. Each package button opens the request form with that package selected. Form fields: package, name, email, phone, date, start time, duration (30 minutes / 1 hour / more than 1 hour), address, type (procession / stage performance), message.
- New-player WhatsApp group: https://chat.whatsapp.com/F8IfWvE8BxxCILdNJh06y0. YouTube channel: https://www.youtube.com/@gurugarjana7228. Lessons are free.
- "69+ performances" appears on `index.html` (numbers strip and the "Since 2022" line in Play with us) and on `book-us.html`.

**Where the amount raised appears:**

- `index.html`: "$30,000 raised for children"; "$30,000 raised · $970,000 to go"; the "Our path" line; "69+ performances and $30,000 raised" in Play with us; the number of `dot dot--filled` spans; "3 filled" in the dots' `aria-label`.
- `1dollar.html`: "$30,000 of $1,000,000 raised"; the dots; their `aria-label`.

## Photos

- To replace a photo, save the new one under the same file name. Each file's spot and shape are listed in `README.md`.
- Preparing a photo:
  - Crop to the spot's shape, keeping faces clear of the curved top of arch frames.
  - Resize: about 1200 px on the long side; arches 720 × 960; 4:5 spots 960 × 1200; band 1800 × 818; link preview 1200 × 630.
  - Save as JPEG at about quality 82, roughly 100–200 KB.
  - Always remove EXIF and GPS data. Pillow: `ImageOps.exif_transpose`, then save without EXIF.
- Practice photos (casual clothes, in the park) go **only** in the "Play with us" collage.
- Never show identifiable children from partner programs.
- Drum heads often show the drum maker's phone numbers. Avoid crops where they dominate.
- Full-size originals are not in the repo. Ask Abhishek for the original before re-cropping.

## Open items

- The Voices section in `index.html` is built but has the `hidden` attribute until real quotes arrive. It has `[Name]` and `[year]` placeholders, and its menu link was removed.
- "Register as a player" still opens an email to gurugarjana@gmail.com. The booking form sends through Resend, but only once `RESEND_API_KEY` is set in Vercel. Until then, people who submit it see a message asking them to email gurugarjana@gmail.com. To send from gurugarjana.org instead of Resend's test sender, verify the domain in Resend and set `BOOKING_FROM`.
- The receipt form became "Ask for a receipt" on `our-work.html`: an email with the amount filled in. The old site's Login was not rebuilt (a static site can't host member logins).
- Photo spots on the inner pages show `[PHOTO: …]` boxes until photos arrive (list in `README.md`). Photos and videos will be done in one round, after the design and content are finished.
- The assessment rubrics on `bootstrapping.html` (dhol, tasha, zanj) come from the old site. The tasha rubric says "all 4 basic tasha taals", but only 3 tasha lessons exist.
- Not carried over from the old site: unlinked draft pages (learn, pathak, members, events, practices, youngsters, competitions, surveys, store) and the cookie banner.
- If these older photo files still exist, they are unused and can be deleted: `hero-dhol.jpg`, `hands-stick-dhol.jpg`, `work-banner.jpg`, `night-event.jpg`.
- The original design canvas on claude.ai is out of date. This repo is the source of truth.
