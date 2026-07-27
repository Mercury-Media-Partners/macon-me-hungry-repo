# Macon Me Hungry AI Agent Workspace & Workflow Guide

Welcome to the **Macon Me Hungry** codebase. This guide outlines repository structure, engineering standards, and metadata guidelines to ensure any AI agent can safely navigate, maintain, and expand the directory.

---

## 🛠️ Tech Stack & Constraints

*   **Framework**: [Astro v6](https://astro.build/) (Static Site Generation / Hybrid Mode)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Package Manager**: `bun` (uses `bun.lockb` but runs in Node environment)
*   **Node Version Constraint**: Requires Node.js **`>=22.12.0`** per `package.json` `engines`. (Use `nvm` or system config to enforce Node 22+ before building).
*   **State Management**: NanoStores (`$lang`, `$siteMode`, `$userPersona`).
*   **Routing & Localization**: Astro i18n routing (`/` for English default, `/es/` for Spanish).

---

## 📂 Key Directories

*   `src/content/businesses/` - Contains the markdown directory listings for all local businesses. All fields are strongly typed via Astro Content Collections.
*   `src/components/directory/` - Core search and filtering UI, including the **Dual State Master Switch** and category tabs.
*   `src/components/business/` - UI components for listing detail pages (SmartSidebar, EditorialHero, etc.).
*   `src/i18n/` - Localization dictionaries (`en.ts` and `es.ts`).
*   `docs/` - Project documentation, business strategies, audits, and developer logs.

---

## 📝 Rules for Modifying Listings

Any new or modified listing in `src/content/businesses/` must follow the schema in `src/content.config.ts`. Here are the tier guidelines:

### 1. Free Tier (`tier: "free"`)
*   **Allowed**: title, tagline, category, category_type, neighborhood, vibe, address, hours, phone, established, order_highlights.
*   **Prohibited**: website, socials, gallery_images (max 1), video_url, events, cta_label, cta_url, jobs.
*   *Catch*: The system automatically hides prohibited fields and displays an upsell block in `SmartSidebar.astro`.

### 2. Promoter Tier (`tier: "promoter"`)
*   **Allowed**: All Free fields + website, socials, gallery_images (up to 5), events (up to 3 recurring weekly events), jobs (up to 2 active jobs), lat/lng.
*   **Prohibited**: video_url, cta_label, cta_url.

### 3. Headliner Tier (`tier: "headliner"`)
*   **Allowed**: All fields, including unlimited events, unlimited jobs, custom CTA buttons (`cta_label`, `cta_url`), video headers (`video_url`), and permanently pinned priority rendering.

---

## ⚠️ Data Integrity & Factual Accuracy

Business frontmatter represents real venues, real people, and real jobs — treat every optional field as a fact to verify, not a blank to fill in.

*   **Never fabricate values** for factual fields (`jobs_supported`, `local_sourcing`, `established`, `phone`, `rating`, `hours`, etc.) to make a listing look more complete. A prior cleanup pass had to strip 10 fabricated/unverified claims sitewide — don't reintroduce this.
*   **If a fact is unknown, omit the field.** Optional schema fields are optional for this reason; an absent field is correct, a guessed one is not.
*   **Flag uncertain data for human review** in your response rather than silently guessing (e.g., an ambiguous hours string, an unverifiable stat from a source document).

---

## 🌐 Bilingual & SEO Standards

1.  **Zero-Hardcoded Translations**: Component text must use translation hooks (`t(en, es)`) or fetch keys from `src/i18n/es.ts` and `src/i18n/en.ts`.
2.  **i18n Sync**: Whenever you add a category key or UI string, update **both** translation files.
3.  **Schema Markup**: All business detail routes (`src/pages/businesses/[slug].astro` and `src/pages/es/businesses/[slug].astro`) must render a structured JSON-LD (`LocalBusiness`) block in the `<head>` using frontmatter metadata.

---

## 📓 Developer Log Requirement

`docs/devlog.md` is the chronological record of every migration, feature, and fix in this codebase — keep it current.

*   **After completing any user-facing or structural change** (new feature, schema change, content migration, fix, refactor), append a dated entry to `docs/devlog.md`.
*   **One topic per bullet, one session per date header.** Don't bundle unrelated workstreams under a single bullet — future greps for e.g. "pricing" or "accessibility" depend on entries being scoped narrowly.
*   **Use the existing format**: `## 📅 <Month DD, YYYY> — <Short Theme>` followed by `**Verb**: description` bullets (`Implemented`, `Fixed`, `Added`, `Updated`, `Refactored`, `Removed`, `Localized`, `Security`, `Performance`, `Cleaned`).
*   Keep the `🚀 Upcoming Roadmap Steps` section at the bottom current — remove items once shipped, add new ones as they're identified.
*   **Rollover policy**: once `docs/devlog.md` passes ~150 lines, move every entry older than the current quarter into `docs/archive/devlog-archive.md` (newest-first, same format), leaving only recent history live. This keeps "append an entry" a cheap operation indefinitely.
