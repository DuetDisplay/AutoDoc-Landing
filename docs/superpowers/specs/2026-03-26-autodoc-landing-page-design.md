# AutoDoc Landing Page — Design Spec

## Overview

A marketing website for AutoDoc, an AI-powered meeting notetaker that runs locally. Deployed on Cloudflare Pages. Four pages: Homepage, Features, About, Privacy.

**Brand identity:** Murmur design system — Instrument Serif + DM Sans fonts, sage/clay/dusk earth-tone palette, editorial warmth with functional clarity. Tone is calm and precise; no hype, no jargon, no exclamation marks.

**Primary CTA:** Direct download (Mac + PC buttons on every page).

**License:** AGPL-3.0 (dual-licensing model).

---

## Tech Stack

- Static HTML/CSS site (no framework needed)
- Cloudflare Pages deployment
- Google Fonts: Instrument Serif, DM Sans, JetBrains Mono
- Responsive: mobile-first, breakpoints at 768px and 1024px
- Dark mode support via `prefers-color-scheme`
- App screenshots sourced from the Autodoc-Local-CC React app

## Design Tokens

From the Murmur brand guide:

```
Colors:
  --bg: #FAFAF7 (light) / #141413 (dark)
  --bg-deep: #F0EFE9 (light) / #1C1C1A (dark)
  --bg-card: #FFFFFF (light) / #1E1E1C (dark)
  --text: #1A1A17 (light) / #E8E7E2 (dark)
  --text-secondary: #6B6A63 (light) / #9C9B94 (dark)
  --text-tertiary: #9C9B94 (light) / #6B6A63 (dark)
  --sage: #7A9E7E (brand accent)
  --sage-light: #E8F0E8
  --sage-dark: #4A6B4E
  --clay: #C2886E (warnings, warmth)
  --dusk: #8B7EAA (AI indicator)
  --border: rgba(26,26,23,0.1)

Fonts:
  Display: Instrument Serif (headlines)
  Body: DM Sans (body text)
  Mono: JetBrains Mono (data/code)

Radius: 12px (cards), 6px (small), 8px (buttons)
```

## Shared Components

### Navigation
- Left: Waveform logo SVG (4 bars) + "AutoDoc" in Instrument Serif
- Right: Features, About, Privacy, GitHub (text links) + "Download" (primary button)
- Sticky on scroll with subtle border-bottom
- Mobile: hamburger menu

### Footer
- Left: Logo + "AutoDoc © 2026"
- Right: Features, About, Privacy, GitHub links
- Thin border-top separator

### CTA Buttons
- Primary: dark bg (#1A1A17), light text, 8px radius
- Secondary: transparent with border
- Download sections always show both "Download for Mac" and "Download for PC"

---

## Page 1: Homepage (/)

### Hero
- Badge pill: "Open source · 100% local" with sage dot
- Headline (Instrument Serif, ~56px): "Your meetings, *your machine.*" — italic "your machine" in sage
- Subtitle (DM Sans, 18px, secondary color): "AutoDoc records, transcribes, and summarizes your meetings — without sending a single byte to the cloud. Built by ex-Apple engineers."
- Two CTAs: "Download for Mac" (primary) + "View on GitHub" (secondary)
- Meta line below: "macOS · Windows · Linux" | "AGPL-3.0" | "From the creators of Duet"

### App Screenshot
- Full-width screenshot of the Meeting Review page (summary + transcript side by side)
- Dark background with rounded corners, placed directly below hero

### Trust Bar
- Four items centered horizontally, small text with icons:
  - Nothing leaves your device
  - Fully open source
  - Built by ex-Apple engineers
  - Works offline

### Feature Section 1: Summaries
- Label: "Summaries"
- Headline: "The notes you'd write *if you had time.*"
- Body: "Every meeting distilled into what actually matters — decisions made, action items assigned, metrics discussed, and topics covered. Based on Andy Grove's High Output Management framework."
- Right: Screenshot of summary view
- Layout: text left, image right

### Feature Section 2: Search
- Label: "Search"
- Headline: "Ask your *meetings.*"
- Body: "'What did we decide about the Q3 roadmap?' Search across every meeting you've ever had, or just ask a question in plain English."
- Left: Screenshot of Search/Ask AI page
- Layout: image left, text right
- Background: --bg-deep (#F0EFE9)

### Feature Section 3: Review
- Label: "Review"
- Headline: "The full *picture.*"
- Body: "Video, audio, and transcript — synced and searchable. Scrub to any moment. Edit anything after the fact. Your meetings become a living reference you can always go back to."
- Right: Screenshot of Meeting Review with audio player
- Layout: text left, image right

### Privacy Statement (dark section)
- Dark background (#1A1A17), centered text
- Headline: "Your data never leaves *your machine.*"
- Body: "No accounts. No servers. No telemetry. Everything runs on your computer, stays on your computer. That's it."
- CTA: "Read our privacy commitment →" (ghost button linking to /privacy)

### Team Teaser
- Label: "Built by"
- Headline: "Ex-Apple engineers. Creators of *Duet.*"
- Body: "We've spent a decade building tools people trust with their most important work. AutoDoc is our answer to meeting tools that treat your conversations as their data."
- Link: "Learn more about us →" (sage text linking to /about)

### Final CTA
- Background: --bg-deep
- Headline: "Ready to own your *meetings?*"
- Body: "Free, open source, and private by default."
- Two buttons: "Download AutoDoc" (Mac) + "Download AutoDoc" (PC) + "View source on GitHub"

---

## Page 2: Features (/features)

### Hero
- Label: "Features"
- Headline: "Everything you need. *Nothing you don't.*"
- Subtitle: "One app that records, transcribes, summarizes, and searches your meetings. All on your machine."
- Centered layout

### Feature 1: Summaries (detailed)
- Number: "01" in sage
- Headline: "The notes you'd write *if you had time.*"
- Body paragraph + checklist:
  - ✓ **Decisions** — What was decided, by whom, and the context behind it.
  - ✓ **Action items** — Tasks with owners and deadlines, pulled from the conversation.
  - ✓ **Metrics & key topics** — Numbers discussed, KPIs mentioned, and the topics that drove the conversation.
  - ✓ **Editable after the fact** — Refine summaries and transcripts whenever you want.
- Right: Full summary view screenshot
- Layout: text left, image right

### Feature 2: Recording (detailed)
- Number: "02" in sage
- Headline: "One click to *capture everything.*"
- Body + checklist:
  - ✓ **Screen or window capture** — Record exactly what you need.
  - ✓ **Calendar integration** — Connect Google Calendar so recordings are named and organized.
  - ✓ **Works offline** — No internet required.
- Left: Recording UI screenshot
- Layout: image left, text right
- Background: --bg-deep

### Feature 3: Search & Ask (detailed)
- Number: "03" in sage
- Headline: "Ask your *meetings.*"
- Body + checklist:
  - ✓ **Full-text search** — Find any word across every transcript and summary instantly.
  - ✓ **AI Q&A** — Ask questions in plain English. Answers cite the meetings they came from.
- Right: Search page screenshot
- Layout: text left, image right

### Feature 4: Review & Playback (detailed)
- Number: "04" in sage
- Headline: "The full *picture.*"
- Body + checklist:
  - ✓ **Split-panel review** — Structured summary and full transcript side by side.
  - ✓ **Synced audio playback** — Skip, rewind, and scrub — the transcript follows along.
  - ✓ **Inline editing** — Fix a name, add context, correct a quote — everything is editable.
- Left: Meeting Review screenshot
- Layout: image left, text right
- Background: --bg-deep

### Bottom CTA
- Headline: "See for *yourself.*"
- Body: "Download AutoDoc and try it on your next meeting."
- Buttons: Download for Mac + Download for PC

---

## Page 3: About (/about)

### Hero
- Label: "About"
- Headline: "Meetings deserve *better.*"
- Subtitle: "Every meeting tool we tried was built to feed data into someone else's AI platform. We wanted something different — a tool that's genuinely good at capturing what matters, without making you dependent on big tech to do it."

### Origin Story (two-column)
- Left column:
  - Headline: "From *Duet* to AutoDoc"
  - Paragraph 1: "We're the team behind Duet — a tool trusted by thousands. After years of building collaborative software, we kept running into the same problem: meetings generate the most important decisions in a company, but the tools for capturing them are either bad or exploitative."
  - Paragraph 2: "AutoDoc is our take on what a meeting tool should be. Structured notes that surface what actually matters. Privacy you don't have to think about. And no lock-in to any AI company's ecosystem."
- Right column: Stats card on --bg-deep background:
  - 10+ — Years building software at Apple
  - Duet — Our previous product, trusted by thousands
  - AGPL-3.0 — Fully open source, forever

### Three Principles (cards on --bg-deep background)
- Label: "What we believe"
- Headline: "Three principles."
- Cards:
  1. **Notes should be useful.** — "A wall of transcript isn't a meeting note. AutoDoc organizes your meetings into decisions, action items, and key topics — the things you'd actually write down if you had time."
  2. **Your data, your choice.** — "Privacy-first doesn't mean cloud-never. It means you decide where your data lives and who has access. Today that's your machine. We'll always give you the choice."
  3. **Independent by design.** — "We're not building on top of someone else's AI platform. AutoDoc is open source and doesn't lock you into any ecosystem. The code is yours to read, audit, and contribute to."

### Bottom CTA
- Headline: "Try it *yourself.*"
- Body: "Free, open source, and private by default."
- Buttons: Download for Mac + Download for PC + View source on GitHub

---

## Page 4: Privacy (/privacy)

### Hero
- Label: "Privacy"
- Headline: "We can't see your data. *By design.*"
- Subtitle: "AutoDoc runs entirely on your machine. There are no servers to send data to, no accounts to sign into, and no analytics watching what you do. This page explains exactly how that works."

### What Stays Where (two-column comparison)
- Left card (sage border): "Your machine"
  - ✓ Meeting recordings (video + audio)
  - ✓ Full transcripts
  - ✓ AI-generated summaries
  - ✓ Search index
  - ✓ All AI processing
  - ✓ App settings and preferences
- Right card (subtle border): "Our servers"
  - Large centered text: "Nothing."
  - "We don't operate servers. There's nowhere for your data to go."

### Four Commitments
- Label: "Our commitments"
- Headline: "Plain language, *no exceptions.*"
- Numbered list:
  1. **No telemetry** — AutoDoc does not phone home. No usage analytics, no crash reports, no "anonymous" data collection.
  2. **No accounts** — Download it, open it, use it. No email, no signup, no login. The optional Google Calendar connection syncs directly between Google and your device — AutoDoc never sits in the middle.
  3. **No third-party AI** — Transcription and summarization run on your hardware using open models. Your meeting audio is never sent to OpenAI, Google, or anyone else.
  4. **Verify it yourself** — AutoDoc is open source under AGPL-3.0. Every line of code is public. If you don't trust our words, read our code.

### Google Calendar Note
- Headline: "A note about *Google Calendar.*"
- Body: "AutoDoc can optionally connect to Google Calendar to name and organize your recordings. When you connect, Google sends your event titles and times directly to the app on your device — we're never in the middle. Nothing is stored on our servers because we don't have servers. The calendar data lives only on your machine, alongside everything else. The connection is entirely optional and can be removed at any time in Settings."

### Bottom CTA (dark section)
- Headline: "Questions?"
- Body: "Our code is the best privacy policy we can offer. But if you have specific questions, open an issue on GitHub."
- Button: "View source on GitHub"

---

## File Structure

```
/
├── index.html          (Homepage)
├── features.html       (Features)
├── about.html          (About)
├── privacy.html        (Privacy)
├── css/
│   └── style.css       (Shared styles — Murmur design tokens + components)
├── assets/
│   └── screenshots/    (App screenshots from Autodoc-Local-CC)
└── _headers            (Cloudflare Pages headers if needed)
```

## Responsive Behavior

- **Desktop (>1024px):** Full layout as designed — two-column grids, side-by-side screenshots
- **Tablet (768–1024px):** Two-column grids collapse to single column, padding reduces
- **Mobile (<768px):** Single column throughout, hero text scales down (clamp), nav becomes hamburger, screenshot images stack below text, trust bar wraps to 2x2 grid

## Animations

Minimal, per brand guide:
- Subtle fade-in on scroll for feature sections (IntersectionObserver)
- Hover transitions on buttons (opacity/border shifts, not color changes)
- No scroll-jacking, parallax, or heavy animations
