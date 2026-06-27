# Clarity — Landing Page

> Project 2 from the Udemy course **Claude Code with Python, Power BI, Excel, PowerPoint & Word**

A production-ready landing page for **Clarity**, a fictional collaborative data-management and workflow platform built to replace spreadsheets for mid-sized businesses.

---

## About the Project

This project was built entirely with vanilla HTML, CSS, and JavaScript — no frameworks, no libraries, no dependencies. It demonstrates how to use **Claude Code** to scaffold and implement a complete, polished SaaS landing page from a detailed specification.

**Product:** Clarity — spreadsheet replacement for modern teams  
**Target audience:** Operations managers, finance leads, and CEOs at companies with 20–500 employees  
**Goal:** Convert visitors into free-trial sign-ups or demo requests

---

## Features Implemented

- **Dark-mode design** with a premium SaaS aesthetic using a full CSS custom properties (design tokens) system
- **9 fully-styled sections:** Navigation, Hero, Social Proof, Features, How It Works, Testimonials, Pricing, CTA, Footer
- **Scroll animations** via `IntersectionObserver` with directional fade variants and staggered delays
- **Animated number counters** in the Social Proof section
- **Typewriter effect** on the hero heading accent line
- **Annual/monthly pricing toggle** with live price updates
- **Sign-up modal** with focus trap, ESC/backdrop close, form validation, and success state
- **Responsive layout** (mobile-first, breakpoints at 480px / 768px / 1024px / 1280px)
- **Accessible markup** — WCAG AA compliant, keyboard navigable, visible focus rings throughout
- **Respects `prefers-reduced-motion`** — all animations disabled for users who opt out

---

## Project Structure

```
Project2 - Clarity Landing/
├── index.html          # All HTML markup (9 sections + modal)
├── css/
│   ├── reset.css       # Minimal modern reset
│   ├── variables.css   # All 50+ CSS custom properties (design tokens)
│   └── styles.css      # All layout, component, and animation styles
├── js/
│   └── main.js         # All interactivity (8 init functions)
└── assets/             # Empty — all visuals are CSS-only
```

---

## Getting Started

No build step required. Open `index.html` directly in a browser, or serve with any static file server:

```bash
# Using Node.js (if installed)
npx serve .

# Using Python
python -m http.server 8080
```

Then visit `http://localhost:8080` (or whichever port is used).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | Semantic HTML5 |
| Styles | Vanilla CSS (BEM, custom properties, flexbox, grid) |
| Interactivity | Vanilla ES2020+ JavaScript |
| Font | Inter via Google Fonts |
| Testing | Playwright (smoke tests) |

---

## Course

**Claude Code with Python, Power BI, Excel, PowerPoint & Word**  
Available on Udemy — teaches how to leverage Claude Code across a variety of tools and project types.
