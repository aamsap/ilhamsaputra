# Design

<!-- impeccable:design-schema 1 -->

Recorded from the built result, not from intention. Where this file and the code
disagree, the code is right and this file is stale.

Direction: **General Arrangement**, seed key `e3576ee6`, visitor mode Experience.
The contract it was built to is the HTML comment at the top of `<body>` in
`index.html`.

## The world

An ISO 128 / ISO 7200 engineering drawing sheet set. A person documented the way a
machine is: one bound set of six sheets, drawn to spec, with claims carrying
dimension lines and history kept in a revision table.

This is a working system, not a motif. The drawing conventions do real jobs:

| Convention | Job it does here |
|---|---|
| Title block (ISO 7200) | persistent navigation, live readout, the one contact action |
| Sheet index 01-06 | the page's wayfinding key; anchors, tag and title block all agree |
| Dimension line | measures a real span, and annotates a real metric with its baseline |
| Hidden vs visible edge (ISO 128) | the entire state system: pending, current, past |
| Section cut A-A + hatching | the three practices shown as material strata |
| Balloon and leader | annotates the subject without writing on top of it |
| Bill of materials | the tool list, as a table with item numbers and function |
| Revision table | employment history, because that is what a revision table is |
| Non-photo blue | the layer that carries no information, exactly as on paper |

## Colour

Closed at **four roles and two tints**. Nothing outside this list paints. The only
other colour on the page is inside third-party brand marks and the real product
screenshots, which are other people's identities, not this one's.

| Token | Sheet | Model space | Role |
|---|---|---|---|
| `--sheet` | `#E4E6E0` | `#101416` | the ground |
| `--sheet-2` | `#EEF0EA` | `#171D20` | inset panel, plate frame |
| `--ink` | `#14181A` | `#E7EAE3` | all content |
| `--ink-2` | `#4E5751` | `#97A19A` | secondary annotation |
| `--redline` | `#B32E17` | `#FF6242` | the live element, and the one action |
| `--on-redline` | `#E4E6E0` | `#101416` | foreground on a redline field |
| `--construction` | `#8FB8D0` | `#3F5E70` | structure only, never information |

The ground is a cool grey-green drafting film, deliberately not the warm cream that
this kind of brief usually attracts. Light was chosen from the use scene, not from
category habit: all five proof captures are light-mode interfaces and the portraits
are studio-lit, so a light sheet lets the real evidence sit on the page instead of
being punched out of a dark void.

**Two rules govern everything else.**

1. **Construction blue carries no information.** It is the non-photo blue pencil that
   did not reproduce on the copier. It paints the sheet frame, the zone ticks and
   table row rules. It never paints a word, a link affordance or a state. If you
   find yourself reaching for it to say something, use `--ink-2`.
2. **State is line weight and dash pattern, not colour.** Pending is thin and dashed;
   current is thick and solid. Colour, where it appears on a state, is redundant.
   The page reads correctly in greyscale and to a colour-blind reader. This rule
   outranks visual preference: do not dilute it.

Redline is rationed. It marks the live thing and the primary action, not emphasis in
general. On a sheet it should be countable on one hand.

### Contrast, measured

Every pair passes WCAG AA in both themes. Worst case is redline text on the sheet
ground at 5.03:1. Secondary annotation is 5.95:1 light, 6.95:1 dark. Construction
blue computes 1.68:1 and is therefore permanently disqualified from carrying text,
which is the same conclusion rule 1 reaches from the other direction.

## Type

- **Display and UI:** Archivo (variable). Plate lettering runs the width axis to
  `wdth 118` at `wght 800`, uppercase, `letter-spacing: -.035em`. The width extreme
  is the point; at normal width it is an ordinary grotesque.
- **Annotation:** Spline Sans Mono, tabular figures.

Mono carries the drawing's annotation layer: measured values, field labels, sheet
identification, item numbers, dates. It never sets running prose. Body copy, section
headings and project descriptions are all Archivo.

Display caps at `6rem`. Body measure caps at 65-75ch; `.lede` at 46ch.

## Layout

Six sheets, each a distinct layout family, in a `1560px` maximum with a
`clamp(1.15rem, 3.6vw, 2.4rem)` gutter.

| Sheet | Content | Layout family |
|---|---|---|
| 01 General arrangement | name, span, subject, actions | asymmetric split with an annotated figure |
| 02 Section A-A | the three practices | full-bleed hatched strata with a travelling cut line |
| 03 Assemblies | fifteen projects | parts index, then a pinned horizontal pan |
| 04 Parts list | tooling | bill of materials table |
|  |  | (below 760px the Practice column folds under Function rather than being dropped) |
| 05 Revision history | employment, education, field work | revision table with note cells |
| 06 Title block | contact | the corner block at full size |

A fixed drawing border with zone ticks and corner registration marks frames the whole
document. The title block is docked bottom-right for sheets 01-05 and stands down on
sheet 06, because by then it has become the page. Sheets whose content reaches the
bottom-right corner (the parts table, the section strata, the pan's rest position)
reserve `19rem` for it rather than letting it occlude them.

## Motion

**One grammar: the sheet plots itself.** Lines extend from a start point, hidden
edges become visible edges, dimension values land last.

Implemented on native CSS scroll-driven animations (`view-timeline`,
`animation-timeline`). No animation library. **No scroll event listener anywhere** in
the page; `js/main.js` uses IntersectionObserver, ResizeObserver and rAF only.

Authored moments, in order of the scroll:

1. The drawing border plots itself in on load, then the hero lands in sequence:
   plate lettering, dimension line stroking itself in, lede, actions, balloons.
2. Sheet 02's section cut line sweeps across while the hatches wipe in behind it.
3. Sheet 03 pins for one viewport and pans horizontally through the fifteen plates, grouped by practice.
4. Sheet 05's revision rules draw downward from each revision mark.
5. Sheet 06's title block assembles cell by cell.

Everything else shares one `[data-plot]` reveal (a short blur-up from an
already-visible base). The parts table is the one exception: twelve identical
arrivals would read as twelve events, so its rows get a lighter, faster variant that
reads as a single sweep down the sheet.

### The three fallback layers

1. `prefers-reduced-motion: reduce` - nothing animates, the pan becomes a scroll-snap
   rail the reader drives, the cut line is hidden. **Base CSS is always the finished,
   visible state**; animations only ever add. This is not decoration, it is the rule
   that makes layers 2 and 3 work.
2. No `view-timeline` support - an IntersectionObserver adds `.is-plotted` and CSS
   transitions carry the reveals.
3. No JavaScript - the page is fully readable and every link works.

### The pinned pan, precisely

`js/main.js` measures the travel from the first and last plate's bounding rects (not
`scrollWidth`, which drops a flex row's trailing padding in Chrome) and sets the
runway to the sticky element's height plus that travel. The CSS animates the track
over `animation-range: contain`, which for a subject taller than the viewport is
exactly the period it fully covers the viewport, which is exactly the sticky pin.

The runway is the travel multiplied by `PAN_PACE` (0.58). At 1.0 the mapping is 1:1,
which read beautifully with five plates and became a slog at nine; below 1.0 the track
moves faster than the wheel. Translate is still exactly `0` when it pins and exactly
full travel when it releases, so the pace is a dial and not a fudge. The index jump
scales by the same constant.

Result: translate is `0` at the moment it pins, tracks scroll linearly through the
middle, and reaches full travel exactly as it releases. Verified by probing the computed
transform at nine scroll positions.

**The pan is full-bleed on purpose.** `.pan` cancels the sheet gutter with a negative
inline margin and `.pan__track` re-applies it as its own padding. Without this, the
sticky element's `overflow: hidden` box is the sheet's padding box, so plates get cut
on an invisible line about 52px inside the window instead of bleeding off the screen
edge, and the clip box stops matching the rectangle the travel was measured against.
Content still lines up with sheets 02 and 04 because the gutter moved rather than
disappeared.

Three traps, each hit once and each worth remembering:

- **`scroll-padding` on `html` insets the view-timeline's visibility range** and will
  push a pinned animation ahead of its own pin. There is none set, deliberately.
- **A percentage width inside an `auto` grid track cannot resolve during intrinsic
  sizing**, so the track silently falls back to the image's natural width. Plate
  widths are definite: `min(calc(52svh * var(--ar)), 50rem)`. The 50rem cap has to
  live inside `width` for the same reason: a `max-width` is ignored while the grid
  works out intrinsic sizes, so an ultra-wide capture would still ask for its full
  aspect width and take the difference out of the text column, which is what pushed
  a project name into four lines.
- **Focusing a link inside a translated plate** makes the browser scroll the sticky
  box to reveal it, which desyncs the pan from its timeline permanently. A `focusin`
  handler on `.pan__stick` snaps `scrollLeft` back to zero. Plates carry
  `tabindex="-1"` so the index jump can move focus with the scroll.

Below 901px none of this applies: the pan becomes a real horizontal scroller. Every
plate is top-aligned there (`align-items: start` on both track and plate), because a
flex row stretches its children and a plate that then centres its own content starts
at a different y from its neighbours.

## Components

- **Buttons** - `.btn--redline` (primary, one intent) and `.btn--ink` (ghost, inverts
  on hover). `2.6px` border, mono uppercase label, `translateY(1px)` on `:active`.
  One label per intent across the whole page: Contact, See the work, Download CV.
- **Dimension lines** - three variants. `dim--hero` is a true dimension with
  extension lines and inward arrowheads. `dim--bar` is a comparison carrying a
  recorded baseline and its outcome. `dim--span` measures scope where no honest
  number exists. `dim--fig` states a recorded figure whose baseline was never
  recorded.
- **Plates** - a real capture inset in a frame with corner ticks, sized from its own
  aspect ratio so it never letterboxes.
- **Balloons** - a numbered circle and a leader that touches the subject, with the
  text sitting in whitespace, never over the face.
- **Mark boxes** - a part with a real product mark shows it, desaturated until the
  row is hovered or focused, because a monochrome drawing identifies a part on
  inspection and colour is the reward for looking. A part that is not a single
  product (AI agents, or a pair of BI tools) gets a lettered box instead. A mark box
  never repeats the part's own name, and one mark never stands for several products:
  Power BI has its own row because its mark could not honestly head a row that also
  named Tableau and Looker Studio.

  Marks are not all square, so the 20px box uses `object-fit: contain` and letterboxes
  rather than stretching. Third-party marks are their owners' trademarks, used to
  identify the tool; each carries its origin in a `.json` sidecar.

## Browser surfaces

Themed from the palette, because they are part of the drawing too: text selection,
caret, focus ring (`2.6px` redline, `3px` offset), scrollbar (thin, construction
blue), and tabular figures on every measured value.

## Responsive notes worth keeping

Explicit grid placement, not auto-placement, in any cell that has a definite row.
Sheet 02's stratum mark had a definite row and no column, which let it claim column 1
ahead of the auto-placed heading; the heading then overflowed the `auto` track. Every
cell in that grid is now placed by hand.

The section cut line is withdrawn below 820px. It needs width to read as a cut rather
than as a rule struck through body copy.

The title block docks across the foot of a phone screen, so every sheet reserves room
for it. Scale and stock size drop there; availability and the action stay.

## Content rules

These are design rules because breaking them changes what the page means.

- **Every fact traces to `PRODUCT.md`.** No exceptions, including numbers that would
  merely look good.
- **A metric ships with its baseline** where one is recorded. Where one is not, the
  figure is stated plainly rather than drawn as a comparison, because inventing the
  "before" would fake a measurement in a page whose whole thesis is measurement.
- **Classification is not measurement.** The parts list says which practice a tool
  belongs to. It does not claim how often it is used, because that was never
  recorded. An earlier draft did, in the page's own measurement grammar, and it was
  the single worst thing in the build.
- **Real captures, unchromed.** The five project images are the actual interfaces.
  They are not wrapped in fake browser chrome or replaced with mockups.
- **Portraits are real and cut out with a real alpha channel**, faded at the bottom
  because the source is cropped mid-torso. No geometric mask standing in for a
  contour.

## What this world has not used yet

Honest inventory for whoever extends this. All are native to the form and unbuilt:
the detail bubble ("SEE DETAIL A") for a second view of a project; sheet-to-sheet
cross-references; a graphic scale bar, which would make the `SCALE 1:1` readout mean
something; and revision clouds around what changed. The plot-style toggle currently
inverts the palette only; a real model space would also drop the sheet frame and the
title block.
