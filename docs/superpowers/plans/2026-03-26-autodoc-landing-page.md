# AutoDoc Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 4-page static marketing site for AutoDoc (Homepage, Features, About, Privacy) using the Murmur brand identity, deployed on Cloudflare Pages.

**Architecture:** Static HTML/CSS site — no build tools, no framework. Each page is a standalone HTML file sharing a single CSS stylesheet. Google Fonts loaded via CDN. Responsive via CSS media queries. Dark mode via `prefers-color-scheme`. Subtle scroll animations via vanilla JS IntersectionObserver.

**Tech Stack:** HTML, CSS (custom properties), vanilla JavaScript, Google Fonts (Instrument Serif, DM Sans, JetBrains Mono), Cloudflare Pages

**Spec:** `docs/superpowers/specs/2026-03-26-autodoc-landing-page-design.md`

---

## File Structure

```
/
├── index.html              — Homepage
├── features.html           — Features page
├── about.html              — About page
├── privacy.html            — Privacy page
├── css/
│   └── style.css           — All styles: tokens, reset, layout, components, pages, responsive, dark mode
├── js/
│   └── main.js             — Mobile nav toggle, scroll fade-in animations
├── assets/
│   └── screenshots/        — App screenshots (placeholder PNGs initially)
└── _headers                — Cloudflare Pages cache/security headers
```

---

### Task 1: CSS Foundation — Design Tokens & Reset

**Files:**
- Create: `css/style.css`

This task creates the entire CSS file with design tokens, reset, and shared component styles. All subsequent tasks reference these styles.

- [ ] **Step 1: Create `css/style.css` with design tokens, reset, and shared styles**

```css
/* === DESIGN TOKENS === */
:root {
  /* Backgrounds */
  --bg: #FAFAF7;
  --bg-deep: #F0EFE9;
  --bg-card: #FFFFFF;
  --bg-dark: #1A1A17;

  /* Text */
  --text: #1A1A17;
  --text-secondary: #6B6A63;
  --text-tertiary: #9C9B94;

  /* Brand */
  --sage: #7A9E7E;
  --sage-light: #E8F0E8;
  --sage-dark: #4A6B4E;
  --clay: #C2886E;
  --dusk: #8B7EAA;

  /* Borders */
  --border: rgba(26,26,23,0.1);
  --border-strong: rgba(26,26,23,0.18);

  /* Fonts */
  --font-display: 'Instrument Serif', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Radii */
  --radius: 12px;
  --radius-sm: 6px;
  --radius-btn: 8px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #141413;
    --bg-deep: #1C1C1A;
    --bg-card: #1E1E1C;
    --text: #E8E7E2;
    --text-secondary: #9C9B94;
    --text-tertiary: #6B6A63;
    --border: rgba(232,231,226,0.08);
    --border-strong: rgba(232,231,226,0.14);
  }
}

/* === RESET === */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }
button { font-family: inherit; cursor: pointer; }
```

Write the full file including all component styles listed in steps 2-4 below in a single file.

- [ ] **Step 2: Add navigation styles**

Within the same `style.css`, include:

```css
/* === NAVIGATION === */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 60px;
  border-bottom: 1px solid var(--border);
  background: var(--bg);
  backdrop-filter: blur(12px);
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}
.nav-wordmark {
  font-family: var(--font-display);
  font-size: 20px;
  letter-spacing: -0.02em;
}
.nav-links {
  display: flex;
  gap: 28px;
  align-items: center;
  font-size: 14px;
  color: var(--text-secondary);
}
.nav-links a:hover { color: var(--text); }
.nav-hamburger {
  display: none;
  background: none;
  border: none;
  color: var(--text);
  padding: 8px;
}
.nav-mobile {
  display: none;
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: var(--bg);
  z-index: 200;
  flex-direction: column;
  padding: 80px 24px 24px;
  gap: 24px;
}
.nav-mobile.open { display: flex; }
.nav-mobile a {
  font-size: 24px;
  font-family: var(--font-display);
}
.nav-mobile-close {
  position: absolute;
  top: 16px;
  right: 24px;
  background: none;
  border: none;
  color: var(--text);
  font-size: 28px;
  cursor: pointer;
}
```

- [ ] **Step 3: Add button, badge, section, footer, and utility styles**

```css
/* === BUTTONS === */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: var(--radius-btn);
  font-size: 15px;
  font-weight: 500;
  border: none;
  transition: opacity 0.2s;
}
.btn:hover { opacity: 0.85; }
.btn-primary {
  background: var(--bg-dark);
  color: var(--bg);
}
@media (prefers-color-scheme: dark) {
  .btn-primary { background: var(--bg); color: var(--bg-dark); }
}
.btn-secondary {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border-strong);
}
.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid rgba(250,250,247,0.15);
}

/* === BADGE === */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border: 1px solid var(--border-strong);
  border-radius: 100px;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
  font-weight: 500;
  width: fit-content;
}
.badge::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--sage);
}

/* === SECTION HELPERS === */
.section { padding: 80px 60px; }
.section--deep { background: var(--bg-deep); }
.section--dark { background: var(--bg-dark); color: #FAFAF7; }
.section-label {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  font-weight: 500;
  margin-bottom: 12px;
}
.section--dark .section-label { color: #9C9B94; }
.section-title {
  font-family: var(--font-display);
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
}
.section-title em { font-style: italic; color: var(--sage); }
.section-desc {
  font-size: 16px;
  color: var(--text-secondary);
  max-width: 640px;
  font-weight: 300;
  line-height: 1.7;
}
.section--dark .section-desc { color: #9C9B94; }

/* === TWO-COLUMN GRID === */
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}
.grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
}

/* === SCREENSHOT CONTAINER === */
.screenshot {
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);
}
.screenshot img {
  width: 100%;
  height: auto;
  display: block;
}
.screenshot--dark {
  background: #1E1E1C;
  border-color: rgba(255,255,255,0.06);
  padding: 24px;
}

/* === FEATURE CHECKLIST === */
.checklist {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.checklist-item {
  display: flex;
  gap: 12px;
  align-items: start;
}
.checklist-icon {
  color: var(--sage);
  font-size: 18px;
  line-height: 1;
  flex-shrink: 0;
}
.checklist-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 2px;
}
.checklist-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* === TRUST BAR === */
.trust-bar {
  display: flex;
  justify-content: center;
  gap: 48px;
  padding: 40px 60px;
  font-size: 13px;
  color: var(--text-tertiary);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

/* === STATS CARD === */
.stats-card {
  background: var(--bg-deep);
  border-radius: var(--radius);
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.stat-number {
  font-family: var(--font-display);
  font-size: 36px;
  color: var(--sage);
  margin-bottom: 4px;
}
.stat-label {
  font-size: 14px;
  color: var(--text-secondary);
}
.stat-divider {
  height: 1px;
  background: var(--border);
}

/* === PRINCIPLE CARDS === */
.principle-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 32px;
}
.principle-title {
  font-family: var(--font-display);
  font-size: 24px;
  color: var(--sage);
  line-height: 1;
  margin-bottom: 12px;
}
.principle-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* === PRIVACY COMPARISON === */
.privacy-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.privacy-card {
  border-radius: var(--radius);
  padding: 32px;
}
.privacy-card--local {
  border: 2px solid var(--sage);
}
.privacy-card--servers {
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.privacy-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 20px;
}
.privacy-badge--local {
  background: var(--sage-light);
  color: var(--sage-dark);
}
.privacy-badge--servers {
  background: var(--bg-deep);
  color: var(--text-secondary);
}
.privacy-nothing {
  font-family: var(--font-display);
  font-size: 28px;
  color: var(--text-tertiary);
  margin-bottom: 8px;
}

/* === COMMITMENT LIST === */
.commitment {
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 24px;
  display: flex;
  gap: 16px;
  align-items: start;
}
.commitment-number {
  font-family: var(--font-display);
  font-size: 20px;
  color: var(--sage);
  line-height: 1;
  min-width: 24px;
}
.commitment-title {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 4px;
}
.commitment-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* === HERO (homepage) === */
.hero {
  padding: 100px 60px 80px;
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute;
  top: -20%;
  right: -10%;
  width: 60vw;
  height: 60vw;
  border-radius: 50%;
  background: radial-gradient(circle, var(--sage-light) 0%, transparent 70%);
  opacity: 0.3;
  pointer-events: none;
}
.hero-headline {
  font-family: var(--font-display);
  font-size: clamp(48px, 7vw, 64px);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.03em;
  margin-bottom: 28px;
  max-width: 700px;
  position: relative;
}
.hero-headline em { font-style: italic; color: var(--sage); }
.hero-sub {
  font-size: 18px;
  color: var(--text-secondary);
  max-width: 520px;
  font-weight: 300;
  line-height: 1.7;
}
.hero-ctas {
  margin-top: 40px;
  display: flex;
  gap: 12px;
}
.hero-meta {
  margin-top: 48px;
  display: flex;
  gap: 28px;
  font-size: 12px;
  color: var(--text-tertiary);
}

/* === PAGE HERO (inner pages) === */
.page-hero {
  padding: 100px 60px 60px;
}
.page-hero--center { text-align: center; }
.page-hero--center .section-desc {
  margin-left: auto;
  margin-right: auto;
}
.page-hero .hero-headline {
  font-size: clamp(40px, 5vw, 48px);
}

/* === CENTERED CTA SECTION === */
.cta-section { text-align: center; }
.cta-section .section-title {
  margin-left: auto;
  margin-right: auto;
}
.cta-section .section-desc {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 32px;
}
.cta-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

/* === SCROLL FADE === */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* === FOOTER === */
.footer {
  padding: 40px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: var(--text-tertiary);
  border-top: 1px solid var(--border);
}
.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
}
.footer-links {
  display: flex;
  gap: 24px;
}
.footer-links a:hover { color: var(--text); }

/* === RESPONSIVE === */
@media (max-width: 1024px) {
  .section { padding: 60px 40px; }
  .nav { padding: 16px 40px; }
  .hero { padding: 80px 40px 60px; }
  .page-hero { padding: 80px 40px 60px; }
  .footer { padding: 40px; }
  .trust-bar { padding: 32px 40px; gap: 32px; flex-wrap: wrap; }
}

@media (max-width: 768px) {
  .section { padding: 60px 24px; }
  .nav { padding: 12px 24px; }
  .nav-links { display: none; }
  .nav-hamburger { display: block; }
  .hero { padding: 60px 24px 48px; }
  .page-hero { padding: 60px 24px 48px; }
  .hero-meta { flex-direction: column; gap: 8px; }
  .hero-ctas { flex-direction: column; }
  .hero-ctas .btn { text-align: center; justify-content: center; }
  .grid-2 { grid-template-columns: 1fr; gap: 32px; }
  .grid-3 { grid-template-columns: 1fr; }
  .trust-bar {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    padding: 32px 24px;
  }
  .privacy-grid { grid-template-columns: 1fr; }
  .cta-buttons { flex-direction: column; align-items: center; }
  .footer { flex-direction: column; gap: 16px; text-align: center; padding: 32px 24px; }
  .footer-links { flex-wrap: wrap; justify-content: center; }
  .stats-card { padding: 32px; }

  /* Reverse grid order on mobile for alternating sections */
  .grid-2--reverse-mobile { direction: ltr; }
  .grid-2--reverse-mobile > :first-child { order: 2; }
  .grid-2--reverse-mobile > :last-child { order: 1; }
}
```

- [ ] **Step 4: Verify the file was created correctly**

Run: `wc -l css/style.css`
Expected: File exists with ~350-400 lines

- [ ] **Step 5: Commit**

```bash
git add css/style.css
git commit -m "feat: add CSS foundation with Murmur design tokens and component styles"
```

---

### Task 2: JavaScript — Mobile Nav & Scroll Animations

**Files:**
- Create: `js/main.js`

- [ ] **Step 1: Create `js/main.js`**

```javascript
// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  const mobileClose = document.querySelector('.nav-mobile-close');
  const mobileLinks = document.querySelectorAll('.nav-mobile a');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
    mobileClose?.addEventListener('click', () => mobileNav.classList.remove('open'));
    mobileLinks.forEach(link =>
      link.addEventListener('click', () => mobileNav.classList.remove('open'))
    );
  }

  // Scroll fade-in animations
  const faders = document.querySelectorAll('.fade-in');
  if (faders.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    faders.forEach((el) => observer.observe(el));
  }
});
```

- [ ] **Step 2: Commit**

```bash
git add js/main.js
git commit -m "feat: add mobile nav toggle and scroll fade-in animations"
```

---

### Task 3: Shared HTML Partials — Nav & Footer Markup

Since this is a static site with no build tool, nav and footer HTML will be duplicated across pages. This task documents the exact markup to use. All four page tasks (4-7) will include this verbatim.

**Nav markup** (used on all pages):

```html
<nav class="nav">
  <a href="/" class="nav-logo">
    <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="14" width="4" height="12" rx="2" fill="#7A9E7E"/>
      <rect x="14" y="8" width="4" height="24" rx="2" fill="#7A9E7E"/>
      <rect x="22" y="11" width="4" height="18" rx="2" fill="#7A9E7E"/>
      <rect x="30" y="16" width="4" height="8" rx="2" fill="#7A9E7E"/>
    </svg>
    <span class="nav-wordmark">AutoDoc</span>
  </a>
  <div class="nav-links">
    <a href="/features.html">Features</a>
    <a href="/about.html">About</a>
    <a href="/privacy.html">Privacy</a>
    <a href="#" target="_blank">GitHub</a>
    <a href="#" class="btn btn-primary" style="padding: 8px 18px; font-size: 13px;">Download</a>
  </div>
  <button class="nav-hamburger" aria-label="Menu">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
  </button>
</nav>

<!-- Mobile nav -->
<div class="nav-mobile">
  <button class="nav-mobile-close" aria-label="Close">&times;</button>
  <a href="/">Home</a>
  <a href="/features.html">Features</a>
  <a href="/about.html">About</a>
  <a href="/privacy.html">Privacy</a>
  <a href="#" target="_blank">GitHub</a>
  <a href="#" class="btn btn-primary" style="margin-top: 16px; justify-content: center;">Download</a>
</div>
```

**Footer markup** (used on all pages):

```html
<footer class="footer">
  <div class="footer-logo">
    <svg viewBox="0 0 40 40" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="14" width="4" height="12" rx="2" fill="#7A9E7E"/>
      <rect x="14" y="8" width="4" height="24" rx="2" fill="#7A9E7E"/>
      <rect x="22" y="11" width="4" height="18" rx="2" fill="#7A9E7E"/>
      <rect x="30" y="16" width="4" height="8" rx="2" fill="#7A9E7E"/>
    </svg>
    <span>AutoDoc &copy; 2026</span>
  </div>
  <div class="footer-links">
    <a href="/features.html">Features</a>
    <a href="/about.html">About</a>
    <a href="/privacy.html">Privacy</a>
    <a href="#" target="_blank">GitHub</a>
  </div>
</footer>
```

No files created in this task — this is a reference for Tasks 4-7.

---

### Task 4: Homepage (`index.html`)

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create `index.html` with full page content**

The file must include:
- `<!DOCTYPE html>` with charset, viewport, OG meta tags, Google Fonts link, `css/style.css` link
- Meta tags: `<title>AutoDoc — Your meetings, your machine</title>`, description, OG title/description/image
- Nav markup (from Task 3)
- Mobile nav (from Task 3)
- **Hero section**: badge, headline "Your meetings, *your machine.*", subtitle, two CTAs (Download for Mac + View on GitHub), meta line
- **App screenshot section**: full-width screenshot container with `screenshot--dark` class. Use a placeholder `<div>` with text until real screenshots are available.
- **Trust bar**: 4 items — "Nothing leaves your device", "Fully open source", "Built by ex-Apple engineers", "Works offline"
- **Feature 1 — Summaries**: grid-2, text left (label "Summaries", headline "The notes you'd write *if you had time.*", body text, no checklist on homepage), screenshot right
- **Feature 2 — Search**: grid-2 on bg-deep, screenshot left, text right (label "Search", headline "Ask your *meetings.*", body with Q3 roadmap example)
- **Feature 3 — Review**: grid-2, text left (label "Review", headline "The full *picture.*", body text), screenshot right
- **Dark privacy section**: centered, headline "Your data never leaves *your machine.*", body, ghost button to /privacy.html
- **Team teaser**: centered, label "Built by", headline "Ex-Apple engineers. Creators of *Duet.*", body, sage link to /about.html
- **Final CTA**: bg-deep, centered, headline "Ready to own your *meetings?*", body, Download for Mac + Download for PC + GitHub buttons
- Footer (from Task 3)
- `<script src="js/main.js"></script>` before `</body>`
- Add `fade-in` class to each feature section, privacy section, team teaser, and final CTA

- [ ] **Step 2: Open in browser and verify**

Run: `open index.html` (macOS) or check in browser
Verify: Page loads, fonts render, sections visible, nav links work, responsive at 768px and 375px

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add homepage with hero, features, privacy statement, and team section"
```

---

### Task 5: Features Page (`features.html`)

**Files:**
- Create: `features.html`

- [ ] **Step 1: Create `features.html` with full page content**

Same HTML boilerplate as `index.html` but with:
- `<title>Features — AutoDoc</title>`, appropriate OG/meta tags
- Nav + Mobile nav (from Task 3)
- **Page hero** (centered): label "Features", headline "Everything you need. *Nothing you don't.*", subtitle
- **Feature 1 — Summaries**: numbered "01" in sage, headline "The notes you'd write *if you had time.*", body paragraph, checklist (Decisions, Action items, Metrics & key topics, Editable after the fact), screenshot right
- **Feature 2 — Recording**: bg-deep, numbered "02", headline "One click to *capture everything.*", body, checklist (Screen or window capture, Calendar integration, Works offline), screenshot left, text right. Use `grid-2--reverse-mobile` so text comes first on mobile.
- **Feature 3 — Search**: numbered "03", headline "Ask your *meetings.*", body with example question, checklist (Full-text search, AI Q&A), screenshot right
- **Feature 4 — Review**: bg-deep, numbered "04", headline "The full *picture.*", body, checklist (Split-panel review, Synced audio playback, Inline editing), screenshot left, text right. Use `grid-2--reverse-mobile`.
- **Bottom CTA**: headline "See for *yourself.*", body, Download for Mac + Download for PC buttons
- Footer (from Task 3)
- `fade-in` on each feature section and CTA

- [ ] **Step 2: Verify in browser**

Run: `open features.html`
Verify: All 4 feature sections render with alternating layout, checklists display correctly

- [ ] **Step 3: Commit**

```bash
git add features.html
git commit -m "feat: add features page with 4 detailed feature sections"
```

---

### Task 6: About Page (`about.html`)

**Files:**
- Create: `about.html`

- [ ] **Step 1: Create `about.html` with full page content**

Same HTML boilerplate with:
- `<title>About — AutoDoc</title>`, appropriate OG/meta tags
- Nav + Mobile nav (from Task 3)
- **Page hero**: label "About", headline "Meetings deserve *better.*", subtitle about independence from big AI
- **Origin story** (grid-2): Left — headline "From *Duet* to AutoDoc", two body paragraphs about the team journey. Right — stats card with: "10+" / Years at Apple, "Duet" / Previous product, "AGPL-3.0" / Open source forever. Each stat separated by `stat-divider`.
- **Three principles** (bg-deep): label "What we believe", headline "Three principles.", grid-3 of principle cards:
  1. "Notes should be useful." — about structured output
  2. "Your data, your choice." — privacy-first but not cloud-never
  3. "Independent by design." — not locked into any AI ecosystem
- **Bottom CTA**: headline "Try it *yourself.*", Download for Mac + Download for PC + GitHub
- Footer
- `fade-in` on origin, principles, CTA

- [ ] **Step 2: Verify in browser**

Run: `open about.html`
Verify: Stats card displays, principle cards layout in 3 columns (1 column on mobile)

- [ ] **Step 3: Commit**

```bash
git add about.html
git commit -m "feat: add about page with origin story, stats, and principles"
```

---

### Task 7: Privacy Page (`privacy.html`)

**Files:**
- Create: `privacy.html`

- [ ] **Step 1: Create `privacy.html` with full page content**

Same HTML boilerplate with:
- `<title>Privacy — AutoDoc</title>`, appropriate OG/meta tags
- Nav + Mobile nav (from Task 3)
- **Page hero**: label "Privacy", headline "We can't see your data. *By design.*", subtitle
- **What stays where** (privacy-grid): Left card (sage border) — "Your machine" badge, 6 checkmark items (recordings, transcripts, summaries, search index, AI processing, settings). Right card — "Our servers" badge, centered "Nothing." in display font, subtext.
- **Four commitments** (bg-deep): label "Our commitments", headline "Plain language, *no exceptions.*", 4 commitment cards in a vertical stack:
  1. No telemetry
  2. No accounts (mentions Google Calendar syncs directly to device)
  3. No third-party AI
  4. Verify it yourself (mentions AGPL-3.0)
- **Google Calendar note**: headline "A note about *Google Calendar.*", paragraph explaining direct sync from Google to device, AutoDoc never in the middle, data lives only on your machine.
- **Bottom CTA** (dark section): headline "Questions?", body about code being best privacy policy, GitHub button
- Footer
- `fade-in` on each section

- [ ] **Step 2: Verify in browser**

Run: `open privacy.html`
Verify: Two-column privacy comparison renders, commitments stack vertically

- [ ] **Step 3: Commit**

```bash
git add privacy.html
git commit -m "feat: add privacy page with data comparison, commitments, and calendar note"
```

---

### Task 8: Cloudflare Pages Config & Headers

**Files:**
- Create: `_headers`

- [ ] **Step 1: Create `_headers` for Cloudflare Pages**

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/css/*
  Cache-Control: public, max-age=31536000, immutable

/js/*
  Cache-Control: public, max-age=31536000, immutable

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

- [ ] **Step 2: Commit**

```bash
git add _headers
git commit -m "feat: add Cloudflare Pages security and cache headers"
```

---

### Task 9: Screenshots from App

**Files:**
- Create: `assets/screenshots/` directory with placeholder images

- [ ] **Step 1: Create placeholder screenshot assets**

Create simple SVG placeholders for each screenshot location:
- `assets/screenshots/meeting-review.svg` — placeholder for the main Meeting Review page
- `assets/screenshots/summary-view.svg` — placeholder for the summary panel
- `assets/screenshots/search-page.svg` — placeholder for the Search/Ask AI page
- `assets/screenshots/recording-ui.svg` — placeholder for the recording interface
- `assets/screenshots/dashboard.svg` — placeholder for the dashboard

Each placeholder should be a simple SVG with the Murmur bg-deep color and centered text describing what screenshot goes there. These will be replaced with real screenshots later.

- [ ] **Step 2: Update all HTML files to reference the placeholder screenshots**

Replace the placeholder `<div>` screenshot containers in all four HTML files with `<img>` tags pointing to the SVG placeholders.

- [ ] **Step 3: Verify all pages render with placeholders**

Open each page and confirm images load.

- [ ] **Step 4: Commit**

```bash
git add assets/ index.html features.html about.html privacy.html
git commit -m "feat: add placeholder screenshot assets and wire them into all pages"
```

---

### Task 10: Final QA & Polish

- [ ] **Step 1: Test all page links**

Click every nav link, footer link, and CTA button across all 4 pages. Verify no broken links (except # placeholders for download/GitHub).

- [ ] **Step 2: Test responsive breakpoints**

Resize browser to 1024px, 768px, and 375px. Verify:
- Nav collapses to hamburger at 768px
- Grids collapse to single column at 768px
- All text remains readable, no horizontal overflow
- CTA buttons stack vertically on mobile

- [ ] **Step 3: Test dark mode**

Toggle system dark mode. Verify:
- Background colors switch
- Text colors switch
- Primary buttons invert
- Sage accent remains consistent
- Screenshots still look good against dark bg

- [ ] **Step 4: Test scroll animations**

Scroll through homepage. Verify `fade-in` sections animate in once and don't re-trigger.

- [ ] **Step 5: Fix any issues found**

Address any visual bugs, broken layouts, or missing styles.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "fix: QA polish — responsive fixes, dark mode, link verification"
```
