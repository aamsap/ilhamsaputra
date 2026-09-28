# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Plain static HTML/CSS/JS (user decision). No build step. Native CSS scroll-driven
animations where supported, with a JS/IntersectionObserver fallback path. GSAP
permitted for scroll-pinning and scrub work that CSS cannot express. Deploy target
open (GitHub Pages / Netlify / Vercel all viable).

## Users

Four confirmed audiences, all primary, all landing on the same single page:

1. **Recruiters and hiring managers** scanning for role fit in data analytics, web
   development, or automation. They need credentials, employment history, and a CV
   download inside the first minute.
2. **International remote clients** (Upwork-style engagements). They need evidence of
   reliability, delivered outcomes, and cross-timezone collaboration.
3. **Direct clients** for WebLuwuk and freelance work. They need to understand the
   service and reach a contact action.
4. **Peers and the design/dev community.** For this audience the site itself is the
   portfolio piece; craft is the argument.

Consequence: the page must serve a fast credential scan AND a slow craft read without
splitting into two sites.

## Product Purpose

A single-page personal portfolio for Ilham Saputra ("Aam") that converts a first
visit into either a hire conversation or a contact inquiry, and that demonstrates
front-end capability through its own execution rather than by claiming it.

## Positioning

Aam sits at the intersection of three practices that are usually three different
people: AI-driven automation, data analytics and visualization, and web development.
The differentiating mechanism is the seam between them: he takes a manual business
process, automates it with AI in the loop, and then renders the result as something
a non-technical person can read and act on. That end-to-end span (raw process to
AI-driven pipeline to legible interface) is the claim a neighboring portfolio cannot
truthfully copy.

**AI-driven automation leads.** It is the practice to foreground: workflow automation,
AI agents built for a specific client's business, AI-assisted document and email
processing. The other two practices are how the result gets delivered and read.

## Confirmed Facts (from Resume + Portfolio PDF)

**Identity**

- Ilham Saputra, called Aam. Malang, Indonesia.
- ilhamsaputraferdinand@gmail.com · +62 851-9080-9668 · linkedin.com/in/ilham-saputra-aam
- **These contacts are current and authoritative.** The resume PDF in `aam-assets/`
  still carries an older city (Kediri) and phone number. The site follows this file,
  not the PDF. Re-export the PDF when convenient.

**Experience**

- Data Specialist, Excellent Chimp (June 2025 - Present, Indonesia, remote). Custom
  data visualization dashboards in Excel, Tableau, Looker Studio, Power BI. AI-driven
  workflow automation via n8n, Apps Script, Python and Excel macros, reducing manual
  work by up to 15 hours per week per client. International clients. 5-star rating
  across all projects, repeat clients.
- Frontend Web Developer, Titik Koma Bintang (July 2023 - January 2025, Luwuk, Central
  Sulawesi, Indonesia, remote, part-time). Government websites, e-commerce platforms
  and learning management systems. Responsive interfaces in JavaScript with React, Vue
  and SvelteKit, styled with Tailwind CSS to accessibility and performance standards.
  API integration with back-end developers. Performance and SQL query optimisation.
  Cross-browser testing. Agile: sprint planning, code review, iterative delivery.
  Client-specific features including interactive dashboards, payment gateways and user
  analytics.
- Digital Cadre, Ministry of Villages, Development of Disadvantaged Regions, and
  Transmigration (January 2023 - December 2024, Banggai Regency, Central Sulawesi,
  Indonesia, hybrid, contract). Public digital literacy: online public services access,
  e-commerce onboarding for small business, Sistem Informasi Desa (SID) rollout,
  cybersecurity awareness training, community data collection, technical support.
- **Software Programmer, Titik Koma Bintang** (January 2022 - July 2023, Luwuk, Central
  Sulawesi, Indonesia, contract). Point of Sale (POS) software for pharmacies and retail
  shops covering inventory management, billing and sales. Written and maintained in
  **Java and C#**. Database schema and query design for large datasets. Real-time
  inventory updates, automated reports, multi-user access control. Client requirements
  gathering with cross-functional teams, software testing, and client training through
  deployment.

**Date correction.** The resume PDF in `aam-assets/` records the Excellent Chimp start
as January 2025 and shows Titik Koma Bintang as a single "Web Developer" role spanning
January 2022 to January 2025. The user has since confirmed the accurate record above:
Excellent Chimp began June 2025, and Titik Koma Bintang was two distinct roles. This
file is authoritative; the PDF is stale.

**Education**

- Bachelor of Informatics Engineering, Universitas Dipa Makassar, South Sulawesi,
  Indonesia. 2024, ongoing.

**Skills**

- Leadership: problem solving, analytical thinking, technical support, digital
  literacy training.
- Technical: HTML, CSS, JavaScript, Tailwind, React, Vue, SvelteKit, AI agents and
  LLM APIs, Apps Script, n8n, VBA, Python, Java, C#, SQL, Power BI, Tableau,
  Looker Studio.
- Fields of interest: AI, data analytics and visualization, automation, growth.

**Volunteering and Leadership**

- Secretary, Facilitator, Inspirator at Kelas Inspirasi (Banggai, Kediri, Malang,
  Baubau, Indonesia). Coordinates professionals visiting schools to share their
  professions with students.
- Speaker at Relawan OK (Luwuk, Indonesia). Online safety, digital ethics,
  responsible social media, cyberbullying response for students.

**Work (nine projects, each with a real screen capture in `aam-assets/porto/`)**

Ordered on the site as AI automation, then web, then data.

1. **AI Customer Service & Social Media Pipeline** (`porto/automation.png`) - two
   self-hosted n8n workflows. A webhook-triggered support agent queries session history
   and a price list, calls Claude to generate a contextual reply, and routes escalations
   to a human admin. A second pipeline reads the day's posts from Google Sheets, loops
   through multi-part thread structures, and writes success or failure back to the
   source sheet.
2. **Loan Processing Automation** (`porto/1.png`) - AI system processing email,
   integrating Drive storage, auditing applicant evidence and documents, automatic
   follow-up. Manual work reduced 75%; loans processed increased 100%.
3. **AIUEO**, teraiueo.online (`porto/aiueo.png`) - corporate website for an AI company.
   Product showcase, corporate messaging and a demonstration hub in one site.
   Minimalist dark UI.
4. **Excellent Chimp**, excellentchimp.com (`porto/excellentchimp.png`) - agency
   storefront for a technology consultancy and automation agency. Presents consultancy,
   data visualization and automation as comparable service packages; architecture built
   for B2B service selling and client acquisition.
5. **LottaScent**, lottascent.com (`porto/2.png`) - end-to-end AI fragrance platform.
   Quiz, catalog, blog, and an AI fragrance assistant.
6. **Excel Malang**, excelmalang.online (`porto/excelma.png`) - learning platform and
   booking system for one-on-one and semi-private Excel and data analysis courses in
   Malang. Carries syllabus and class material, mentor availability, pricing tiers and
   enrolment. Localised brand with a mascot, Otiz the Otter.
7. **Heating System Health Assessment Dashboard** (`porto/3.png`) - built for The Dr
   Radiator (cleanmyheatingsystem.co.uk). Turns raw test results into plain readings of
   water quality, system protection, water balance and overall health.
8. **Data Analytics and Dashboard Creation** (`porto/5.png`) - analysis and dashboard
   work across HR, management, sales, health, daily operations and property investment
   projection.
9. **Operations Tooling** (`porto/4.png`) - menu creation tool, school audit tool,
   bookkeeping tool and others, built to raise operational productivity.

**Figures that must not appear on the site.** The Excellent Chimp capture shows that
company's own marketing counters (clients served, quote turnaround); the AIUEO capture
carries numbers its own page labels as placeholder examples. Neither set is Aam's
metric. Do not lift them.

## Assets on Hand

- `aam-assets/Ilham Saputra - Resume.pdf` - the **original, now stale** resume. It
  carries the old city (Kediri), the old phone number and the withdrawn WebLuwuk role.
  Kept as source material; it is not what the site serves.
- `aam-assets/cv/cv-ats.html` - **source for the CV the site serves.** Built ATS-first:
  one column, standard section headings, no tables or graphics, so an applicant
  tracking system parses it cleanly. Generated to `assets/doc/Ilham-Saputra-CV.pdf`.
  Every fact traces to this file. Regenerate the PDF after any change here.
- `aam-assets/cv/cv.html` - a second, designed CV in the site's drawing language.
  Better for a human, worse for a parser. Not shipped; kept as an alternative.
- `aam-assets/Porto.pdf` - portfolio source document.
- `aam-assets/porto/` - real interface captures for the nine projects:
  `1.png`..`5.png`, `automation.png`, `aiueo.png`, `excellentchimp.png`, `excelma.png`.
- `aam-assets/logos/` - html5, css3, javascript, tailwindcss, react, python,
  appsscript SVG marks.
- `aam-assets/favicon.ico`.
- `aam-assets/photos/portrait-alpha.png` - studio portrait, arms crossed, charcoal
  suit and navy tie, **transparent background**. Primary hero subject.
- `aam-assets/photos/portrait2-alpha.png` - second studio portrait, smiling, black
  suit, hands in pockets, **transparent background**. Secondary view.
- `aam-assets/photos/portrait.png`, `portrait2.png` - the same two shots on their
  original light studio grounds.
- `aam-assets/photos/fullbody-portrait.png` - environmental full-body, standing beside
  a side table with a laptop, light studio floor and wall.
- `aam-assets/aam.glb` - 3D scan. **Excluded by user decision**; do not ship it.

## Constraints

- Real photography of Aam exists and must be used; never substitute a stock face or a
  generated likeness. Two of the five files carry a clean alpha channel, so the
  portrait composites directly onto the page ground with no matte box around it.
- The portraits are formal business-studio shots (suit and tie, plain studio light).
  The visual world has to accommodate that register rather than fight it.
- No 3D / WebGL model. User declined it explicitly; the site must earn its technical
  credibility through scroll choreography and typography instead.
- Project screen captures are real and must be shown as they are. They are the
  proof; do not replace them with mockup chrome.
- No invented metrics. Only the numbers already recorded above (75% manual work
  reduction, 100% more loans processed, 15 hours/week saved, 10+ projects, 5-star
  rating) may be stated, and each must stay attached to the project it came from.
- Bilingual reality: source portfolio copy mixes Indonesian and English. The site
  ships in English.

## Accessibility

WCAG AA minimum for all text. All scroll choreography must collapse safely under
`prefers-reduced-motion: reduce`, with content visible by default rather than
revealed by animation.

## Confirmed Decisions

- **Availability: open to work.** Confirmed by the user; the site may state it.
- **Deploy target: `ilhamsaputra.site`** (custom domain). Absolute URLs for
  Open Graph and canonical resolve against this host.
- **WebLuwuk is withdrawn from the site for now**, at the user's request. The founder
  role and its "10+ client projects" figure are not to appear until reinstated. The
  facts are preserved here, struck below, so nothing is lost.

### Withdrawn, not deleted

- Founder, WebLuwuk (August 2025 - Present, Remote). Web development startup serving
  small businesses through to companies. End-to-end delivery: requirements, UI/UX,
  development, deployment. 10+ client projects delivered. SEO and performance tuning.
  **Do not publish until the user reinstates it.**
