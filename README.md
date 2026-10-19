# Guru Garjana Academy website

A plain HTML/CSS site: no build step, no framework. Vercel serves the files as they are.

| Page | File | Address |
|---|---|---|
| Home | `index.html` | `/` |
| Give $1, tell 3 friends | `1dollar.html` | `/1dollar` |

```
index.html          Home page
1dollar.html        Share page ($1 x 1 million)
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

**Photos.** Replace a file in `assets/img/` with one of the same name, or change the `src` in the HTML. Keep photos under about 300 KB and around 1200 px wide.

**Voices section.** It is built but hidden until you have real quotes. In `index.html`:

1. Fill in the `[Name]`, `[year]` and quote placeholders.
2. Remove the word `hidden` from `<section id="voices" hidden`.
3. Add `<a href="#voices" ...>Voices</a>` back to the menu.

**Links to set when ready**

- "Register as a player" opens an email to gurugarjana@gmail.com. Swap in a Google Form link if you make one.
- "Book us" links open an email with the subject "Booking request".
- Donate buttons go to the Zeffy form: `https://www.zeffy.com/en-US/donation-form/donate-to-make-a-difference-20014`

## Deploying

Every change pushed to the `main` branch on GitHub deploys automatically on Vercel. Each pull request gets its own preview link.

The share message and social previews point to `https://gurugarjana.org/1dollar`. That link only works once the gurugarjana.org domain points to this Vercel project.
