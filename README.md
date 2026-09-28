# Ilham Saputra (Aam) - Portfolio

A single-page portfolio built as an engineering drawing set. Six sheets, one bound
document, navigated from a title block that stays in the corner and keeps its
readout true as you scroll.

Static HTML, CSS and JavaScript. No build step, no framework, no dependencies.

## Run it

Any static server works. From the project root:

```sh
npx serve .
# or
python -m http.server 8000
```

Then open the printed address. Opening `index.html` directly over `file://` mostly
works, but a server is closer to production and avoids path surprises.

## Deploy it

Target is **`ilhamsaputra.site`**. The canonical link, `og:url` and `og:image`
are already absolute against that host, so social previews resolve as soon as DNS
points at it. If the domain changes, four lines at the top of `index.html` change
with it.

Push the repository and point any static host at the root.

- **Netlify** - no build command, publish directory `.`, then add the custom domain.
- **Vercel** - framework preset "Other", no build command, output directory `.`
- **GitHub Pages** - Settings, Pages, deploy from branch, root folder, plus a
  `CNAME` file containing `ilhamsaputra.site`.

Nothing needs compiling, so what is in the repo is what ships.

## Layout

```
index.html          the whole page; the direction contract is the comment at the top of <body>
css/base.css        palette, type, the drawing border, the title block, dimension lines
css/sheets.css      the six sheet layouts and all scroll choreography
js/main.js          title-block readout, pan measurement, reduced-motion fallbacks
assets/photos/      portraits (WebP, alpha preserved)
assets/social-card.png  generated 1200x630 Open Graph card
assets/work/        the five project captures (WebP)
assets/logos/       stack marks (SVG and WebP)
assets/doc/         the generated CV (source: aam-assets/cv/cv.html)
aam-assets/         original untouched source material
PRODUCT.md          product truth: every fact on the page traces to this file
DESIGN.md           the visual system, written from the built result
robots.txt          crawl rules; AI crawlers explicitly welcomed
sitemap.xml         one URL, with the six work images declared
llms.txt            plain-text summary for language models
_headers            caching and security headers (Netlify / Cloudflare Pages)
```

`assets/` holds the optimised files the site actually serves. `aam-assets/` is the
untouched source. Re-export into `assets/` if you replace anything; the originals
were 4.5 MB and ship at 1189 KB. The `.json` files beside each image record where it
came from, so provenance travels with the file.

## The CV

`assets/doc/Ilham-Saputra-CV.pdf` is the file the Download CV button serves. It is
**generated**, not hand-made, and it is built ATS-first: the parser comes before the
art, because the CV's job is to get through the filter that the portfolio never has to.

Source: `aam-assets/cv/cv-ats.html`. Two A4 pages, `noindex`, behind the `robots.txt`
disallow on `/aam-assets/`.

**The rules that make it parse.** Break any of these and it silently stops working:

- One column, one linear DOM order. No grid, no flex, no floats, no tables.
- Nothing absolutely positioned. No running header or footer, so no text is stranded
  in a region parsers skip.
- Conventional section headings, spelled the way parsers match them: Summary, Skills,
  Work Experience, Projects, Education, Volunteering and Leadership.
- Dates as `Month YYYY - Month YYYY`, directly under the employer, never in a margin.
- Project titles carry their link rather than printing the URL beside it. This is the
  one place the design wins over the parser: a link annotation usually does not
  survive text extraction, so those URLs are absent from the ATS text layer. The
  portfolio URL in the contact header is written as plain text and covers discovery.
- No information in a graphic. There are no images at all.
- No `break-inside: avoid` on tall blocks. An avoided block that straddles a page
  break jumps whole to the next page and strands the gap, which is what pushed this
  onto a third page. Entries flow; only headings hold to their content.

Regenerate by rendering that file through Chrome's `Page.printToPDF` with
`printBackground: true`, `preferCSSPageSize: true` and `generateTaggedPDF: true`. The
result carries selectable text with ToUnicode maps on all 11 embedded fonts, a tagged
structure tree, and live link annotations. **Never export it as an image.**

To check a change really parsed, extract the text back out and read it in order. Font
subsets each number their glyphs from 1, so a naive extractor that merges every font's
map will drop letters; that is the extractor's bug, not the file's.

**It must agree with the site.** The original resume said Kediri, carried the previous
phone number and listed WebLuwuk, all of which contradicted the page. Every fact in
`cv-ats.html` traces to `PRODUCT.md`, and WebLuwuk stays withdrawn.

`aam-assets/cv/cv.html` is a second, designed version in the site's drawing language:
sheet border, title block, two-column project grid. It reads better to a human and
worse to a parser, so it is not what the site serves. Keep it if you want something to
hand over in person.

## Findability

Four things carry the SEO weight, in rough order of what actually matters:

1. **JSON-LD structured data** in the `<head>`: a `ProfilePage` wrapping a `Person`
   (role, location, skills, employer, university, contact, LinkedIn) plus an
   `ItemList` of the five projects as `CreativeWork` nodes. This is what lets a
   search engine understand who you are rather than guessing from prose. Validate
   changes at [validator.schema.org](https://validator.schema.org/).
2. **`llms.txt`** at the root. A plain-text brief for language models, following the
   [llmstxt.org](https://llmstxt.org/) convention, so an AI search answer about
   "AI automation, Indonesia" can quote real facts instead of paraphrasing HTML.
   It ends with an explicit instruction not to invent figures.
3. **`robots.txt` and `sitemap.xml`.** The sitemap declares the six work images as
   `image:image` entries, which is how they become eligible for image search.
   `robots.txt` allows GPTBot, ClaudeBot, PerplexityBot and the rest by name.
4. **`max-image-preview:large`** in the robots meta. Without it Google shows a
   thumbnail; with it the social card runs full width and the page becomes eligible
   for Discover.

**All of it hardcodes `https://ilhamsaputra.site`.** If the domain changes,
update: the canonical and Open Graph tags in `index.html`, every `@id` and `url` in
the JSON-LD block, `robots.txt`, `sitemap.xml` and `llms.txt`.

`sitemap.xml` carries a `lastmod` date. Bump it when you change the page.

## The design system in one minute

Four colour roles and two tints, and nothing else paints:

| Role | Sheet | Model space | Job |
|---|---|---|---|
| `--sheet` | `#E4E6E0` | `#101416` | the ground |
| `--ink` | `#14181A` | `#E7EAE3` | all content |
| `--redline` | `#B32E17` | `#FF6242` | the live element and the one action |
| `--construction` | `#8FB8D0` | `#3F5E70` | structure only, never information |

Two rules make the rest follow:

1. **Anything drawn in construction blue carries no information.** It is the
   non-photo blue a draughtsman used because it did not reproduce on the copier.
   Grid, sheet border, row rules. Never a word you need to read.
2. **State is line weight and dash pattern, not colour.** Pending is a thin dashed
   edge, current is a thick solid one. The page still reads correctly in greyscale
   and to a colour-blind reader.

Type is Archivo (variable, its width axis pushed to 118 for plate lettering) and
Spline Sans Mono. Mono carries the drawing's annotation layer: measured values, field
labels, sheet identification. It never sets running prose.

## Motion

One grammar: **the sheet plots itself.** Lines extend from a start point, hidden
edges become visible edges, dimension values land last.

It runs on native CSS scroll-driven animations (`view-timeline` and
`animation-timeline`), so the browser drives it off the compositor. There is no
animation library and no scroll event listener anywhere in the page.

Three fallback layers, in order:

1. **Reduced motion** (`prefers-reduced-motion: reduce`) - nothing animates, the
   pinned horizontal pan becomes a scroll-snap rail the reader drives, and every
   element is already in its finished state. Content is visible by default; the
   animations only ever add.
2. **No scroll timelines** (older browsers) - an IntersectionObserver adds a class
   and CSS transitions carry the reveals.
3. **No JavaScript** - the page is fully readable and every link works. Only the
   live readout and the horizontal pan need JS.

### The horizontal pan

Sheet 03 pins for one viewport and pans sideways through the five project plates.
`js/main.js` measures the travel from the plates' own geometry and sets the scroll
runway to match, so the pan starts at zero the moment it pins and finishes exactly
as it releases. A `ResizeObserver` re-measures when a capture, the fonts, or the
zoom level changes anything.

Two details worth knowing if you edit it:

- `scrollWidth` drops a flex row's trailing padding in Chrome, which leaves the
  last plate short of the viewport. The travel is measured from the first and last
  children's bounding rects instead.
- `scroll-padding` on `html` insets the view-timeline's visibility range, which
  pushes a pinned animation ahead of its own pin. There is none set, on purpose.

## Editing content

Everything is in `index.html` and reads in document order, sheet by sheet.

To add a tenth project: copy an `<article class="part">` block into `#pan-track`, add
a row to `.idx__list`, and set `--ar` on the new `.part__view` to the capture's aspect
ratio (width divided by height). The pan re-measures itself. Then update the four
places that also list the work: the `ItemList` and `CreativeWork` nodes in the JSON-LD
block, `sitemap.xml`, `llms.txt`, and `PRODUCT.md`.

The fifteen plates are ordered AI automation, then web, then data, which is the same
order the practices appear in on sheet 02 and in the parts list. Keep that.

`PAN_PACE` in `js/main.js` sets how much scroll a pixel of pan costs. It is 0.45, so
the track moves about 2.2x faster than the wheel. Raise it toward 1.0 for a slower,
more cinematic pan; lower it if you add more projects.

**Do not invent numbers.** Only the metrics recorded in `PRODUCT.md` appear on the
page, each attached to the project it came from. Most of the fifteen projects have no
recorded figure, so they use a non-numeric span annotation instead of a made-up one.
Keep it that way.

Two captures contain numbers that are not yours: Excellent Chimp's own marketing
counters, and AIUEO's figures, which that page itself labels as placeholder examples.
Neither is quoted anywhere on the site, and neither should be.

## Things to know before you edit

**WebLuwuk is withdrawn, not deleted.** The founder role and its "10+ client
projects" figure are off the site at your request. The facts are preserved under
"Withdrawn, not deleted" in `PRODUCT.md`. To put it back you need three edits: a
balloon on sheet 01, a revision row on sheet 05, and the Revision letter in the
sheet 06 title block (it would become D).

**Your contacts live in `PRODUCT.md`, not the resume PDF.** The PDF in `aam-assets/`
still carries an older city and phone number. The site follows `PRODUCT.md`. Worth
re-exporting the PDF so the downloadable CV agrees with the page.

**The `aam.glb` 3D scan** is in `aam-assets/` and is deliberately not shipped.

**The social card** (`assets/social-card.png`) is generated, not hand-drawn. If you
change the hero, regenerate it so the two agree.
