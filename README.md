# OutATL — Atlanta Uncovered

**OutATL** is a high-authority, bilingual (EN/ES) digital directory for Atlanta's queer community and local businesses, built for the 2026 World Cup moment and beyond. It turns local venues, retail, and professional networks into premium digital assets serving tourists, residents, and local stakeholders alike.

> *Built for the Beautiful People Out & About in Atlanta.*

---

## 🚀 Architectural Vision: Digital Stewardship

Migrated from a legacy React SPA to **Astro v5** for a "Zero-Hardcoded" content strategy. Decoupling business data from presentation logic achieves:

- **Maximum SEO** — Static Site Generation (SSG) for every business and neighborhood page.
- **Agent-Ready Maintenance** — New listings are added by creating a single Markdown file.
- **Stakeholder Value** — Integrated impact data visualized directly on listing cards.

---

## 🏗️ Technology Stack

| Layer | Technology |
|---|---|
| Framework | [Astro v5](https://astro.build/) — SSG |
| Styling | Tailwind CSS v4 |
| Design System | "Studio Noir" (HSL-based tokens, dark-first) |
| Typography | Bebas Neue (display) & Space Grotesk (body) |
| Content | Astro Content Collections (Markdown-driven) |
| Interactivity | React islands via `@astrojs/react` |
| State | `nanostores` + `@nanostores/react` |
| i18n | Route-level `/es/` prefix, `langStore` nanostore |

---

## 📂 Project Structure

```text
/
├── src/
│   ├── components/
│   │   ├── directory/       # DirectoryFinder (filters, mode switch, cards)
│   │   ├── home/            # Hero, IntentGrid, InteractiveMap, CTASection
│   │   ├── navigation/      # Navbar, Footer
│   │   ├── blog/            # Neon Stream blog & press cards
│   │   └── world-cup/       # Match schedule & knockout bracket
│   ├── content/
│   │   ├── businesses/      # Markdown listings — one file per business
│   │   ├── attractions/     # Parks & cultural attractions
│   │   ├── blog/            # Bilingual blog articles (lang: "en" | "es")
│   │   └── press/           # JSON press mention clips
│   ├── data/
│   │   └── matches.json     # Group stage match database
│   ├── layouts/             # Layout.astro — theme init, global wrappers
│   ├── pages/               # Route templates; /es/ mirror for Spanish
│   ├── stores/              # nanostores: langStore, modeStore
│   └── styles/              # global.css — design tokens, component classes
├── public/                  # Static assets, logos, humans.txt, llms.txt
├── parked/                  # Archived code (persona system, onboarding, etc.)
└── legacy-vite/             # Archived legacy React boilerplate
```

---

## ✨ Core Features

### 1. 🗂️ Directory Finder (`/` → `#bar-finder`)
- **Day / Night mode switch** — slides between lifestyle/daytime and nightlife listings using a single `$siteMode` nanostore.
- **Dynamic filter counts** — category chips and neighborhood pills show live counts that update as other filters change; chips with zero matches are dimmed and disabled.
- **Real-time Open/Closed badges** — computed against Atlanta timezone (America/New_York) from frontmatter hours strings; handles overnight and multi-day schedules.
- **MARTA Transit Badges** — `🚆 Station Name — X min walk` shown on every card using curated `transit_station` / `transit_time_en` / `transit_time_es` frontmatter fields.
- **Stadium proximity bar** — visualized on nightlife cards (distance from Mercedes-Benz Stadium).
- **Custom feature filters** — Patio & Outdoor, Bilingual Staff.
- **URL hash parameters** — deep-link to pre-filtered states via `#bar-finder?mode=night&hood=midtown&category=Dance+Club`.

### 2. 🗺️ Interactive Map (`/map`)
- Embedded on the homepage as the primary discovery CTA; replaces the former lead magnet.

### 3. ⚽ Match Hub & Knockout Bracket
- **Group Stage Schedule** — parsed from `matches.json`, displayed on `/matches` and `/es/matches`.
- **Knockout Viewer** — SVG/Mermaid flowchart with Atlanta match highlights.

### 4. 📰 Neon Stream (Blog & Press)
- **Bilingual portals** — `/blog` (EN) and `/es/blog` (ES) with strict route-level isolation.
- **Mixed grid feed** — blog posts and press clips rendered chronologically.
- **Client-side category filtering** — no hydration penalty.

### 5. ♿ Accessibility Protocol Widget
- Floating widget: High Contrast, Highlight Links, Pause Animations — settings persisted in `localStorage`, bilingual attribution.

### 6. 🦶 Footer — Community Hub Layout
- **Stats ribbon** — live counts for businesses, neighborhoods, languages.
- **3-column navigation** — Explore / Connect / Info.
- **Social links & legal** — Instagram, newsletter opt-in, privacy policy.

---

## 📝 How to Add Content

### Adding a Business

1. Create `src/content/businesses/<slug>.md`.
2. Populate frontmatter conforming to the `businesses` schema in `src/content.config.ts`.

**Key frontmatter fields:**
```yaml
title: "Venue Name"
neighborhood: "Midtown"          # Midtown | East Atlanta | Buckhead
category: "Dance Club"
category_type: "nightlife"       # nightlife | lifestyle | wellness | professional | outdoors
operating_mode: "night"          # day | night | both
tier: "free"                     # free | promoter | headliner
rating: 4.5
hours: "Mon-Fri - 9pm-3am, Sat - 9pm-4am"
transit_station: "Midtown"       # MARTA station name (no "Station" suffix)
transit_time_en: "4 min walk"
transit_time_es: "4 min a pie"
stadiumMin: 12                   # drive minutes to Mercedes-Benz Stadium
has_patio: true
bilingual_staff: false
```

### Adding a Blog Post

1. Create `src/content/blog/<slug>.md`.
2. Set `lang: "en" | "es"`, `category`, `pubDate`, and SEO tags.

### Adding a Press Clip

1. Create `src/content/press/<slug>.json`.
2. Include `publisher`, `url`, `excerpt`, and `lang`.

### Adding a Job Listing

1. Create `src/content/jobs/<slug>.md`.
2. Populate frontmatter conforming to the `jobs` schema in `src/content.config.ts`.
3. Note: The number of jobs that appear on a business's profile is dictated by their tier (`free` = 0, `promoter` = max 2, `headliner` = unlimited).

**Key frontmatter fields:**
```yaml
title: "Lead Bartender"
business_slug: "finca-to-filter"  # Must match the business's markdown filename
job_type: "full-time"             # full-time | part-time | contract | freelance
wage_range: "$15-$25/hr + tips"
apply_url: "mailto:jobs@example.com"
pub_date: 2026-07-11
expiration_date: 2026-08-11       # Optional. If set, job auto-hides after this date.
```

---

## 🧞 Commands

| Command | Action |
|:---|:---|
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build static production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro -- --help` | Astro CLI help |

> **Note:** Requires Node.js ≥ 22.12.0. Use `nvm use 22` if needed.

---

## 🗃️ Parked / Archived Code

The `parked/` directory holds intentionally disabled features:

| File | Description |
|---|---|
| `OnboardingMenu.tsx` | Persona-based onboarding (Local / Tourist mode) — disabled |
| `personaStore.ts` | Nanostore for persona state — disabled |
| `syncStores.ts` | Cross-store sync logic — disabled |
| `LeadMagnet.astro` | Email capture widget — replaced by Interactive Map |
| `WatchParties.astro` | World Cup watch party finder — pending re-activation |

---

*OutATL — Atlanta / Uncovered*
