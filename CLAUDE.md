# CLAUDE.md

OutATL — bilingual (EN/ES) Astro v6 business directory for Atlanta's LGBTQ+ community, built for the 2026 World Cup. Static-first, content-collection-driven (`src/content.config.ts`), React islands, NanoStores, Tailwind v4.

## Business listing tiers (`src/content/businesses/*.md`, schema in `src/content.config.ts`)

| Tier | Allowed | Prohibited |
| :--- | :--- | :--- |
| `free` | title, tagline, category, category_type, neighborhood, vibe, address, hours, phone, established, order_highlights | website, socials, gallery_images (max 1 total), video_url, events, cta_label, cta_url, jobs |
| `promoter` | All Free + website, socials, gallery_images (≤5), events (≤3 recurring weekly), jobs (≤2 active), lat/lng | video_url, cta_label, cta_url |
| `headliner` | Everything — unlimited events/jobs, cta_label/cta_url, video_url, pinned priority rendering | — |

The system auto-hides prohibited fields and shows an upsell block (`SmartSidebar.astro`) — don't work around this by adding a prohibited field "just this once."

## Required reading before you touch these areas

*   **Anything beyond the tier table above** (bilingual/SEO standards, data-integrity rules, devlog format) → read `docs/agents.md`.
*   **Any user-facing or structural change** → once finished, append a dated entry to `docs/devlog.md`, following the format in `docs/agents.md`.
*   **Brand voice, mission framing, or copy decisions** → check `docs/soul.md`.
*   **Quoting a price for any tier** → check `docs/contracts/` and the latest iteration in `docs/business/value_ladder_evolution.md` first. Several other business docs contain superseded figures (flagged inline where known).
*   **i18n**: never hardcode UI strings — use `src/i18n/en.ts` / `src/i18n/es.ts` and keep both files in sync.

## Docs directory map

See [`docs/index.md`](docs/index.md) for the full index (living vs. historical vs. business/sales collateral). Quick summary:

*   `docs/agents.md`, `docs/devlog.md`, `docs/soul.md` — core living docs (root level)
*   `docs/business/` — pricing strategy, business plan, sales guides (some historical, flagged inline)
*   `docs/contracts/` — signed agreement templates — **pricing source of truth**
*   `docs/reference/` — non-product reference data (e.g. event lineups)
*   `docs/archive/` — superseded, point-in-time documents + compressed completed PRDs

## Known drift to watch for

`src/content/bars/` (6 files) exists on disk but is **not** registered as a collection in `src/content.config.ts` (only `businesses`, `landing_pages`, `blog`, `attractions`, `jobs` are). It looks like a leftover from the pre-rebrand `bars` → `businesses` migration (see `docs/devlog.md`, June 11 2026 entry). Don't assume it's live content — confirm with the user before touching it.

Raw/unsorted assets (photo dumps, etc.) belong in `/assets-inbox/` at the repo root, not in `docs/`.
