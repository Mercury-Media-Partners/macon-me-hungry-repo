# Macon Me Hungry — Discover Macon's Best Bites

**Macon Me Hungry** is your curated guide to the greatest restaurants, food trucks, and hidden gems in Macon, GA. From Downtown soul food to Mulberry St tacos, find exactly what you're craving. 

> *Built for the foodies of Macon, GA.*

---

## 🚀 Architectural Vision: Digital Stewardship

Built with **Astro v6** for a "Zero-Hardcoded" content strategy. Decoupling business data from presentation logic achieves:

- **Maximum SEO** — Static Site Generation (SSG) for every business and neighborhood page.
- **Agent-Ready Maintenance** — New listings are added by creating a single Markdown file.

---

## 🏗️ Technology Stack

| Layer | Technology |
|---|---|
| Framework | [Astro v6](https://astro.build/) — SSG |
| Styling | Tailwind CSS v4 |
| Design System | Bespoke Macon Me Hungry Theme |
| Typography | Playfair Display (heading) & Montserrat (body) |
| Content | Astro Content Collections (Markdown-driven) |
| Interactivity | React islands via `@astrojs/react` |
| State | `nanostores` + `@nanostores/react` |

---

## 📂 Project Structure

```text
/
├── src/
│   ├── components/
│   │   ├── directory/       # DirectoryFinder (filters, cards)
│   │   ├── home/            # Hero, IntentGrid, InteractiveMap
│   │   ├── navigation/      # Navbar, Footer
│   │   └── blog/            # Blog cards
│   ├── content/
│   │   ├── businesses/      # Markdown listings — one file per business
│   │   ├── blog/            # Blog articles
│   │   └── press/           # JSON press mention clips
│   ├── layouts/             # Layout.astro — theme init, global wrappers
│   ├── pages/               # Route templates
│   ├── stores/              # nanostores
│   └── styles/              # global.css — design tokens, component classes
├── public/                  # Static assets, logos, humans.txt, llms.txt
└── legacy-vite/             # Archived legacy React boilerplate
```

---

## 📝 How to Add Content

### Adding a Business

1. Create `src/content/businesses/<slug>.md`.
2. Populate frontmatter conforming to the `businesses` schema in `src/content.config.ts`.

**Key frontmatter fields:**
```yaml
title: "Venue Name"
neighborhood: "Downtown"
category: "Soul Food"
category_type: "lifestyle"
tier: "free"
rating: 4.5
hours: "Mon-Fri - 9am-3pm"
```

---

## 🧞 Commands

| Command | Action |
|:---|:---|
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build static production site to `./dist/` |
| `npm run preview` | Preview the production build locally |

> **Note:** Requires Node.js ≥ 22.12.0. Use `nvm use 22` if needed.
