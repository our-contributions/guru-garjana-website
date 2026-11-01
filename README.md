# Guru Garjana Academy website

A plain HTML/CSS site: no build step, no framework. Vercel serves the files as they are.

| Page | File | Address |
|---|---|---|
| Home | `index.html` | `/` |
| Give $1, tell 3 friends | `1dollar.html` | `/1dollar` |
| About us (vision, mission, plan) | `about-us.html` | `/about-us` |
| Our work (causes, partners, ways to give) | `our-work.html` | `/our-work` |
| Book us (packages and prices) | `book-us.html` | `/book-us` |
| Learn to play (lessons for new players) | `bootstrapping.html` | `/bootstrapping` |
| Blog | `blog.html` | `/blog` |
| Blog post: One beat at a time | `blog/one-beat-at-a-time.html` | `/blog/one-beat-at-a-time` |

```
index.html          Home page
1dollar.html        Share page ($1 x 1 million)
about-us.html       About us
our-work.html       Our work
book-us.html        Book us
bootstrapping.html  Learn to play (lessons, videos, assessment)
blog.html           Blog list
blog/               One file per blog post
vercel.json         Clean URLs (/1dollar) and redirects from the old site's pages
assets/css/         styles.css (brand colours live at the top)
assets/js/          give.js (share-page calculator and "Copy message" button)
assets/img/         photos, logos, favicons, social preview image
```

## Colour logic

- Purple `#662D91`: our play and skills (performing, practice, booking)
- Gold `#FFBF00`: serving the cause (giving, sharing, the goal)

Gold is too light for text on white, so it is only used for buttons, highlights and shapes, with dark text on top.

## Common updates

**Amount raised** (currently $30,000). Update it in both pages:

1. Search for `30,000` and `970,000` in `index.html`, and for `30,000` in `1dollar.html`.
2. Update the dots: each `<span class="dot dot--filled">` is $10,000. Change plain `<span class="dot">` lines to `dot dot--filled` as the total grows. Also update the `3 filled` number in the `aria-label` beside them.
3. On `index.html`, update the "Our path" line.

**Photos.** To swap a photo, upload a new file with the same name into `assets/img/`. Crop it to the same shape, keep it under about 300 KB, and remove location data first.

| File | Where it appears | Shape |
|---|---|---|
| `hero.jpg` | Home: big arch at the top | Tall portrait |
| `hero-closeup.jpg` | Home: small circle on the top photo | Square |
| `moment-1.jpg` to `moment-4.jpg` | Home: row of four arches under "We dream of a world…" | 3:4 portrait |
| `our-work.jpg` | Home: "Our work" | 4:5 portrait |
| `band.jpg` | Home: behind the purple "Play the dhol" band, tinted purple | Wide |
| `practice-1.jpg` to `practice-3.jpg` | Home: "Play with us" collage. Practice photos only | 1 tall, 2 near-square |
| `share-1.jpg` to `share-3.jpg` | Share page: the three arches | 3:4 portrait |
| `share-where.jpg` | Share page: "Where your $1 goes" | 4:5 portrait |
| `og-image.jpg` | Preview picture when the link is shared | 1200 × 630 |

**Voices section.** It is built but hidden until you have real quotes. In `index.html`:

1. Fill in the `[Name]`, `[year]` and quote placeholders.
2. Remove the word `hidden` from `<section id="voices" hidden`.
3. Add `<a href="#voices" ...>Voices</a>` back to the menu.

**Links to set when ready**

- "Register as a player" opens an email to gurugarjana@gmail.com. Swap in a Google Form link if you make one.
- "Book us" links open an email with the subject "Booking request".
- Donate buttons go to the Zeffy form: `https://www.zeffy.com/en-US/donation-form/donate-to-make-a-difference-20014`

## Inner pages

Every page repeats the same header, toran and footer. If you change a menu link, change it in all pages: `index.html`, `about-us.html`, `our-work.html`, `book-us.html`, `bootstrapping.html`, `blog.html` and every file in `blog/`. (`1dollar.html` has its own short header on purpose.) Mark the current page's menu link with `aria-current="page"` and the purple underline.

**Photos still to come.** These spots show a grey `[PHOTO: …]` box until the photo arrives. To add one, save it in `assets/img/` and swap the box for an `<img>` with the same frame styles as the home page.

| File | Where it appears | Shape |
|---|---|---|
| `about-hero.jpg` | About us: arch at the top | 4:5 portrait |
| `work-hero.jpg` | Our work: arch at the top | 4:5 portrait |
| `book-hero.jpg` | Book us: arch at the top | 4:5 portrait |
| `book-band.jpg` | Book us: behind the purple "Your celebration" band, tinted purple | Wide |

**Learn to play.** Lesson videos are on YouTube, and each row links to one. The WhatsApp group link appears three times: search for `chat.whatsapp.com` to change it. Each lesson section ends with its assessment rubric, in a box that opens on tap. Dhol Taal 9 and Zanj Taal 8 have no video yet.

**Book us.** Prices: Rhythm from $300, Celebration from $500, Grand Garjana from $1,000, and flexible pricing for causes. Each "Request" button opens an email with the package name already filled in.

**New blog post.** Copy `blog/one-beat-at-a-time.html` to `blog/<short-name>.html`, change the title, date, description and body, then add a card for it at the top of the list in `blog.html`.

## Deploying

Every change pushed to the `main` branch on GitHub deploys automatically on Vercel. Each pull request gets its own preview link.

The share message and social previews point to `https://gurugarjana.org/1dollar`. That link only works once the gurugarjana.org domain points to this Vercel project.
