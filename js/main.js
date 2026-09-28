/* ═══════════════════════════════════════════════════════════════════════════
   GENERAL ARRANGEMENT · plot controller
   Three jobs, nothing more:
     1. keep the title block's readout true (current sheet, plot percentage)
     2. measure the horizontal pan so CSS can drive it from a scroll timeline
     3. carry the reveal grammar on browsers without scroll-driven animations
   No scroll event listeners anywhere; IntersectionObserver and rAF only.
   ═══════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js');

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  // How much page scroll buys a pixel of horizontal pan. At 1 the mapping is 1:1,
  // which reads beautifully with a handful of plates and becomes a slog with fifteen.
  // Below 1 the track moves faster than the scroll: the pin still starts at zero and
  // still finishes exactly as it releases, it just costs less of the reader's wheel.
  const PAN_PACE = 0.45;
  const hasScrollTimeline = CSS.supports('animation-timeline', 'view()');

  /* ── 1. Plot style (sheet / model space) ─────────────────────────────── */
  const styleBtn = document.getElementById('plotstyle');
  const styleVal = document.getElementById('plotstyle-val');
  const STORE = 'aam.plotstyle';

  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function applyStyle(mode) {
    if (mode) root.setAttribute('data-plot-style', mode);
    else root.removeAttribute('data-plot-style');

    const dark = mode ? mode === 'model' : systemDark.matches;
    if (styleVal) styleVal.textContent = dark ? 'Model' : 'Sheet';
    if (styleBtn) styleBtn.setAttribute('aria-pressed', String(dark));
  }

  let stored = null;
  try { stored = localStorage.getItem(STORE); } catch { /* private mode */ }
  applyStyle(stored);

  systemDark.addEventListener('change', () => {
    if (!root.hasAttribute('data-plot-style')) applyStyle(null);
  });

  styleBtn?.addEventListener('click', () => {
    const dark = styleBtn.getAttribute('aria-pressed') === 'true';
    const next = dark ? 'sheet' : 'model';
    applyStyle(next);
    try { localStorage.setItem(STORE, next); } catch { /* private mode */ }
  });

  /* ── 2. Title block: mobile disclosure ───────────────────────────────── */
  const tb = document.getElementById('titleblock');
  const tbToggle = tb?.querySelector('.tb__toggle');
  const tbIndex = document.getElementById('tb-index');

  tbToggle?.addEventListener('click', () => {
    const open = tbToggle.getAttribute('aria-expanded') === 'true';
    tbToggle.setAttribute('aria-expanded', String(!open));
    if (tbIndex) tbIndex.hidden = open;
  });

  // Jumping to a sheet closes the index behind you.
  tbIndex?.addEventListener('click', (e) => {
    if (!e.target.closest('a')) return;
    tbToggle?.setAttribute('aria-expanded', 'false');
    tbIndex.hidden = true;
  });

  /* ── 3. Live readout: current sheet + plot percentage ────────────────── */
  const sheets = [...document.querySelectorAll('.sheet[data-sheet]')];
  const outSheet = document.getElementById('tb-sheet');
  const outSheetName = document.getElementById('tb-sheet-name');
  const SHEET_NAMES = {
    '01': 'General arrangement', '02': 'Section A-A', '03': 'Assemblies',
    '04': 'Parts list', '05': 'Revision history', '06': 'Title block',
  };
  const outPlot = document.getElementById('tb-plot');
  const bar = document.getElementById('tb-bar');
  const links = new Map(
    [...document.querySelectorAll('[data-sheet-link]')].map((a) => [a.dataset.sheetLink, a])
  );

  function setSheet(id) {
    if (root.dataset.sheet === id) return;
    root.dataset.sheet = id;
    if (outSheet) outSheet.textContent = id;
    if (outSheetName) outSheetName.textContent = SHEET_NAMES[id] ?? '';
    links.forEach((a, key) => {
      if (key === id) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  if (sheets.length) {
    // Which sheet owns the middle of the viewport.
    const spy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setSheet(e.target.dataset.sheet);
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    sheets.forEach((s) => spy.observe(s));
  }

  // Plot percentage, read on animation frames rather than scroll events.
  let ticking = false;
  let lastPct = -1;

  function readPlot() {
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.round((window.scrollY / max) * 100) : 100;
    if (pct === lastPct) return;
    lastPct = pct;
    if (outPlot) outPlot.textContent = String(pct);
    if (bar) bar.style.setProperty('--p', String(pct / 100));
  }

  function requestPlot() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(readPlot);
    }
  }

  // Drive the readout from a scroll-linked observer rather than a scroll listener.
  if ('onscrollend' in window) {
    window.addEventListener('scrollend', requestPlot, { passive: true });
  }
  // A sentinel per sheet keeps the number moving during the scroll itself.
  const pulse = new IntersectionObserver(requestPlot, {
    threshold: [0, 0.02, 0.05, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 0.95, 1]
  });
  sheets.forEach((s) => pulse.observe(s));
  readPlot();

  /* ── 4. Horizontal pan: measure the travel, let CSS animate it ───────── */
  const pan = document.getElementById('pan');
  const track = document.getElementById('pan-track');
  const stick = pan?.querySelector('.pan__stick');

  function measurePan() {
    if (!pan || !track) return;

    const horizontal =
      hasScrollTimeline && !reduce.matches && window.matchMedia('(min-width: 901px)').matches;

    if (!horizontal) {
      pan.style.removeProperty('height');
      track.style.removeProperty('--pan-dist');
      return;
    }

    // Measure the track from its own children. scrollWidth drops the trailing
    // padding on a flex row, which leaves the last plate short of the viewport.
    const first = track.firstElementChild;
    const last = track.lastElementChild;
    if (!first || !last) return;

    const cs = getComputedStyle(track);
    const padL = parseFloat(cs.paddingInlineStart) || 0;
    const padR = parseFloat(cs.paddingInlineEnd) || 0;
    // Rect deltas are transform-invariant, so this reads true mid-animation.
    const span = last.getBoundingClientRect().right - first.getBoundingClientRect().left;
    const extent = span + padL + padR;

    const viewport = stick?.clientWidth || window.innerWidth;
    const distance = Math.max(0, Math.round(extent - viewport));
    track.style.setProperty('--pan-dist', distance + 'px');

    // Runway = the pinned viewport, plus the horizontal travel. Read the sticky
    // element rather than innerHeight so svh and the runway cannot disagree.
    const stickH = stick?.offsetHeight || window.innerHeight;
    pan.style.height = stickH + Math.round(distance * PAN_PACE) + 'px';
  }

  measurePan();
  window.addEventListener('resize', debounce(measurePan, 160), { passive: true });
  reduce.addEventListener('change', measurePan);
  if (document.fonts?.ready) document.fonts.ready.then(measurePan);
  window.addEventListener('load', measurePan);

  // Anything that changes a plate's width (late capture, font swap, zoom)
  // must re-measure, or the runway and the travel drift apart.
  if (track && 'ResizeObserver' in window) {
    const remeasure = debounce(measurePan, 120);
    const ro = new ResizeObserver(remeasure);
    ro.observe(track);
    [...track.children].forEach((c) => ro.observe(c));
  }

  function debounce(fn, ms) {
    let t;
    return (...a) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...a), ms);
    };
  }

  /* ── 5. Reveal fallback for browsers without scroll timelines ────────── */
  if (!hasScrollTimeline && !reduce.matches) {
    const targets = document.querySelectorAll('.sheet:not(.sheet--01) [data-plot]');
    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-plotted');
          obs.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );
    targets.forEach((t) => io.observe(t));
  }

  /* ── 6. Index links jump into the pinned pan at the right plate ──────── */
  // The pan's travel is 1:1 with page scroll while pinned, so the scroll position
  // that parks a plate at the viewport's left edge is simply the pan's document
  // top plus that plate's own offset along the track.
  document.querySelectorAll('.idx__list a').forEach((a) => {
    a.addEventListener('click', (ev) => {
      const id = a.getAttribute('href')?.slice(1);
      const part = id && document.getElementById(id);
      if (!part || !pan || !track || !stick) return;

      const horizontal =
        hasScrollTimeline && !reduce.matches && window.matchMedia('(min-width: 901px)').matches;
      if (!horizontal) return; // the rail is a real scroller; let the anchor work

      // The pinned window is the runway measurePan built, not a width guess.
      const travel = pan.offsetHeight - stick.offsetHeight;
      if (travel <= 0) return;

      ev.preventDefault();

      // Rect deltas are transform-invariant, so this is correct mid-pan.
      const first = track.firstElementChild;
      const offset =
        (part.getBoundingClientRect().left - first.getBoundingClientRect().left) * PAN_PACE;

      // pan.offsetTop is measured against .sheet--03's positioned box, not the
      // document, so it must come from the rect.
      const panTop = pan.getBoundingClientRect().top + window.scrollY;
      const top = panTop + Math.min(Math.max(offset, 0), travel);

      window.scrollTo({ top, behavior: 'smooth' });
      part.setAttribute('tabindex', '-1');
      part.focus({ preventScroll: true });
    });
  });

  /* Focusing a link inside a translated plate makes the browser scroll the sticky
     box to reveal it, which desyncs the pan from its timeline permanently. Snap it
     back; the plate is already where the scroll position says it should be. */
  stick?.addEventListener('focusin', () => {
    if (stick.scrollLeft !== 0) stick.scrollLeft = 0;
    if (stick.scrollTop !== 0) stick.scrollTop = 0;
  });

  /* ── 7. Sheet size readout: honest about the stock it is drawn on ────── */
  const outSize = document.getElementById('tb-size');
  function readSize() {
    if (!outSize) return;
    const w = window.innerWidth;
    outSize.textContent = w >= 1440 ? 'A2' : w >= 1024 ? 'A3' : w >= 700 ? 'A4' : 'A5';
  }
  readSize();
  window.addEventListener('resize', debounce(readSize, 160), { passive: true });
})();
