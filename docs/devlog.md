# OutATL Developer Log

A chronological log tracking migrations, features, optimizations, and roadmap progress.

## 📅 July 27, 2026 — Spanish Architecture Removal & Macon Content Rewrite
*   **Removed**: Completely removed Spanish localization infrastructure (`src/pages/es/`, `src/content/landing_pages/list-your-business-es.md`, `src/i18n/es.ts`, `src/stores/langStore.ts`) to simplify the project's architecture per user directive.
*   **Refactored**: Removed all `lang` attributes, conditional translations, and language toggles from Astro pages and UI components (`Navbar.astro`, `events.astro`, `faq.astro`, etc.).
*   **Rewrote**: Completely rebuilt `list-your-business.md` (English version renamed from `-en.md`) to scrub all legacy World Cup, Atlanta, and LGBTQ+ tourist references, replacing them with evergreen Macon local-community branding (Macon Me Hungry).
*   **Rewrote**: Overhauled the central `src/i18n/en.ts` dictionary and `index.astro`/`events.astro` with Macon-specific community messaging ("Southern Hospitality", "Local Pop-ups", etc.).
*   **Cleaned**: Deleted all remaining World Cup legacy files, including `src/pages/matches.astro` and `src/components/world-cup`.

## 📅 July 27, 2026 — Jacob Thompson Author Integration
*   **Implemented**: Added Jacob Thompson as the unified author for all blog content.
*   **Added**: Integrated his headshot into the About page (`src/pages/about.astro`) using modern layout conventions.
*   **SEO & UI**: Updated blog posts, `BlogCardNeon.astro`, and the blog slug page (`src/pages/blog/[...slug].astro`) to render his avatar and emit valid JSON-LD `Person` author schema.

## 📅 July 27, 2026 — Project Rebrand (OutATL -> Macon Me Hungry)
*   **Rebranded**: Initiated complete project transition from OutATL to Macon Me Hungry, focusing on food, restaurants, and local vibes in Macon, GA.
*   **Updated**: Changed site configuration, metadata, robots.txt, and llms.txt to reflect the new `macon-me-hungry-repo.pages.dev` domain.
*   **Cleaned**: Purged legacy Atlanta-specific content and references.

## 📅 July 23, 2026 — Directory Filtering & Mode Fallback Resolution (`DirectoryFinder.tsx`)
*   **Fixed**: Resolved zero-listing results bug in `DirectoryFinder.tsx` by relaxing operating mode filtering whenever a user conducts a text search or selects a specific category.
*   **Implemented**: Added automatic `siteMode` switching ("day" vs "night") when parsing category URL hash parameters (e.g. `#bar-finder?category=Coffee%20Shop`).
*   **Added**: Added search query parameter parsing (`?q=` / `?search=`) and an interactive **"Reset All Filters"** empty state button when no venues match custom feature filters.
*   **Updated**: Configured quick search category links in `index.astro` and `es/index.astro` with explicit `mode` parameters.

## 📅 July 22, 2026 — B2B Pricing Grid Balance Fix & Free Tier Restoration (`/list-your-business`)
*   **Fixed**: Fixed 3-column grid skew on `/list-your-business` and `/es/list-your-business` by restoring the 4th tier card (**On the Map — Free Catalog Listing**), balancing the 4-column desktop layout (`grid-cols-4`).
*   **Updated**: Re-centered pricing section headers and container layout so all cards and text align symmetrically.

## 📅 July 22, 2026 — B2B Landing Page Hero UX Compression (`/list-your-business`)
*   **Refactored**: Compressed `HeroSection.tsx` font scale (from `lg:text-9xl` to `lg:text-7xl`) and section padding (`pt-28 pb-12`) on `/list-your-business` and `/es/list-your-business`.
*   **Updated**: Positioned headline, subhead, primary CTAs ("Claim Your Spot" / "See Pricing"), and social proof stats tightly within the initial desktop viewport to guarantee 100% visibility above the fold.

## 📅 July 22, 2026 — Data Integrity Sweep: `bilingual_staff`
*   **Fixed**: `bilingual_staff` was silently fabricated sitewide — the schema defaulted it to `true` (16 real listings had no explicit value and inherited the claim by default), and 20 more had it hardcoded `true` with no verification trail. Zero real listings had it set `false`, which was itself a tell nobody had actually confirmed this per-venue.
*   **Changed**: Schema default flipped from `true` to `false` (`content.config.ts`) — a business must now explicitly confirm bilingual staff to claim it, not inherit the claim by silence.
*   **Removed**: Stripped the unverified `bilingual_staff: true` line from all 21 affected real listings. `mercury-media-partners.md` (confirmed real) and `beltline-adjacent-realty.md` (fictional demo) were left untouched.
*   **Known consequence**: the "💬 Bilingual Staff" directory filter will now return effectively zero results until real per-venue data is actually collected — flagged, not silently absorbed.
*   **Flagged, not fixed**: `rating` is a required schema field with suspiciously clean decimal values across all 36 real listings (no review-count field, no cited source) — same fabrication pattern, but harder to fix than a boolean since the schema requires a value and these are real, findable venues whose actual ratings could plausibly be verified via search rather than just deleted. Needs a decision, not a delete.
*   **Flagged, not fixed**: the new `partner` tier exists in the schema and in `SmartSidebar.astro`'s paid-tier check, but has zero representation in the actual pricing page content (`list-your-business-{en,es}.md`) — nobody browsing `/list-your-business` would ever see what it costs or includes.

## 📅 July 22, 2026 — Ethical Directory Monetization & Organic Merit-Based Search Sorting
*   **Refactored**: Updated `DirectoryFinder.tsx` sorting logic to `b.data.rating - a.data.rating` (100% organic, rating & merit-based) so paid tiers no longer hijack organic search rank.
*   **Implemented**: Added transparent `⚡ SPONSORED SPOTLIGHT` (and localized `⚡ PATROCINADO`) badge labeling for paid partner listings to maintain 100% editorial transparency with users.
*   **Authored**: Created `docs/business/ethical-monetization-merit-sorting-prd.md` detailing ethical monetization rules and non-profit supporter exemptions.

## 📅 July 22, 2026 — Vector GIS Map Engine, Events Radar & Open Right Now Filter (#1, #2, #3, #4, #5)
*   **Implemented**: Upgraded `InteractiveMap.tsx` with a real vector GIS map engine powered by `leaflet` and CartoDB Dark Matter / Positron tiles (`LeafletMapContainer.tsx`), replacing static image coordinates with real `lat`/`lng` markers, popups, and quick drawer actions.
*   **Added**: Created `/events` and localized `/es/events` portals backed by `EventsRadar.tsx` to aggregate drag shows, DJ sets, trivia, and weekend party schedules with Google Event JSON-LD schema.
*   **Implemented**: Added 🔴 **"Open Right Now"** live pulse filter in `DirectoryFinder.tsx` to filter open venues in real-time based on Atlanta timezone calculations.
*   **Added**: Connected `PartnerForm.tsx` to handle client-side form submissions and tier selection feedback.
*   **Authored**: Created `docs/engineering/interactive-map-events-itinerary-prd.md`.

## 📅 July 22, 2026 — Monetization & Tier Simplification (SEO-First + Industry-Prorated Partner Tier)
*   **Refactored**: Simplified monetization tier schema in `content.config.ts` to support the unified `"partner"` tier while preserving backward compatibility for existing markdown frontmatter (`promoter`, `professional`, `headliner`).
*   **Implemented**: Updated `list-your-business.astro` and localized Spanish `es/list-your-business.astro` landing pages to present the 3 Industry-Prorated Verified Partner Tiers: Community & Lifestyle ($29/mo), Nightlife & Hospitality ($89/mo), and Commercial & Professional ($199/mo).
*   **Updated**: Configured `SmartSidebar.astro` and profile layouts to evaluate `"partner"` as fully paid, preserving 100% SEO indexing for free listings while unlocking direct CTA links and social handles for verified partners.
*   **Authored**: Created `docs/business/monetization-pricing-tier-simplification-prd.md` detailing the SEO-first mandate and industry-prorated monetization model.

## 📅 July 22, 2026 — Platinum Instant Discovery & Viral Night Out Builder (Plan A)
*   **Implemented**: Deployed zero-reload slide-over venue drawer (`VenueQuickDrawer.tsx`) triggered by clicking venue cards or deep-linking via `?venue=slug`.
*   **Added**: Integrated a shareable "Night Out" Itinerary Builder (`ItineraryBar.tsx` & `$itineraryStore`) allowing users to select 2–4 venues and copy a group-chat link (`outatl.com/?itinerary=slug1,slug2`).
*   **Implemented**: Added hero quick-search form and instant category pills (`Patios`, `Clubs`, `Cafes`, `Midtown`) inside `VideoHero.astro` and localized `es/index.astro`.
*   **Added**: Injected native `MerchantClaimCard` conversion components into directory listing feeds to capture viewing venue owners.
*   **Added**: Created `MobileFilterSheet.tsx` bottom sheet to condense 4 rows of filter chips on mobile viewports into a clean 1-tap filter modal.

## 📅 July 22, 2026 — Mercury Media Partners Professional-Tier Showcase Listing
*   **Added**: New `is_demo: true` Professional-tier showcase listing for Mercury Media Partners (`mercury-media-partners.md`), same pattern as `beltline-adjacent-realty.md` — filtered from the main directory grid, live as a static detail page for sales/onboarding use.
*   **Sourced real data, not invented**: pulled verified business info (phone, hours, tagline, services, socials) directly from Mercury Media's own repo (`/home/ravi/01_projects/mercury-media-partners/mercury-media-repo/`) rather than fabricating it — real 5.0 Google rating (confirmed by the user), real hours (Mon/Tue/Thu/Fri 10:30am-4:30pm), real phone, and their actual Open Graph share image (converted to webp) as the hero image.
*   **Declined to fabricate**: left `established` and transit fields blank rather than invent them; used a flagged-approximate `stadiumMin` estimate for Vinings, GA since no exact street address exists publicly.

## 📅 July 22, 2026 — B2B Sales Preview Tool (?preview=true) & Testimonial Revamp
*   **Implemented**: Added client-side Sales Preview check (`?preview=true` query param) in `[slug].astro` layout files. When present, all premium locked elements (websites, socials, jobs, events, and headers) are unlocked instantly and a floating owner preview banner is displayed at the bottom of the screen.
*   **Refactored**: Configured `SmartSidebar.astro` and business pages to render mock-up details for all tiers by default but apply styling-layer padlock blurs (`.locked-upsell-wrapper`) if `!isPaid`, preserving static site compile safety.
*   **Added**: Replaced the empty "RESERVED FOR YOU" testimonial block on the B2B landing page with a factual, high-fidelity Showcase highlighting **FiNCA to FiLTER** as a premium profile example to eliminate "0 customers" social proof friction.
*   **Cleaned**: Removed the unused `@astrojs/cloudflare` dependency from `package.json`.

## 📅 July 22, 2026 — SEO Growth Roadmap
*   **Proposed**: Wrote `docs/business/seo-growth-roadmap.md`, a living (not archive-on-completion) roadmap building on the Spanish-language SERP gap analysis. Covers reinforcing the already-shipped hreflang/blog work, expanding Spanish content, a technical schema audit — and an explicit list of items that need direct user action (Search Console access, community distribution, backlink outreach, Google Business Profile, ongoing rank tracking) rather than being agent-doable.

## 📅 July 22, 2026 — B2B Landing Page Post-World Cup Override & Price Hike
*   **Implemented**: Added dynamic date checks using `isPostWorldCup` in `list-your-business.astro` and Spanish counterpart to automatically scrub all World Cup copy (stadium stats, incoming tourist countdowns) and swap early-bird grandfathered pricing tiers for standard evergreen rates.
*   **Updated**: Standardized promoter monthly/annual rates to $49/$399, professional rates to $299/$2290, and headliner rates to $199/$1490 across both localized paths.

## 📅 July 18, 2026 — Spanish SEO & Hreflang Tag Optimization
*   **Added**: Authored a native Spanish listicle blog post `bares-gay-en-atlanta.md` targeting the "bares gay en Atlanta" keyword (~1.9k monthly searches, 30/100 difficulty), linking directly to listed partner venues.
*   **Implemented**: Integrated dynamic page-level alternative language links (`link rel="alternate" hreflang="..."`) and canonical checks in `Layout.astro` to correctly map English `/` and Spanish `/es/` pages to search crawlers, fixing hardcoded HTML element `lang="en"`.
*   **Refactored**: Updated `src/pages/es/index.astro` metadata (title and description) to target the "Bares Gay en Atlanta" head query directly for high-intent searchers.

## 📅 July 17, 2026 — Cloudflare Pages Migration PRD (Proposed)
*   **Proposed**: Wrote `docs/engineering/cloudflare-pages-migration-prd.md` scoping a Netlify → Cloudflare Pages hosting migration. Key finding: the site is fully static (no adapter configured despite a dead `@astrojs/cloudflare` dependency in `package.json`), so the only real blocker is Netlify Forms — `PartnerForm.tsx`'s inquiry form relies on Netlify-proprietary POST-to-`/` interception, which needs a Cloudflare Pages Function replacement, not a config change. Explicitly scheduled to start no earlier than July 20 (World Cup Final / Founder-rate deadline weekend traffic).

## 📅 July 17, 2026 — Automated Post-World Cup Transition System
*   **Implemented**: Created a centralized date-based transition utility `transition.ts` that detects if the build date is past the July 19th World Cup final.
*   **Added**: Programmed dynamic content switching in `Navbar.astro` to swap the live World Cup match banner with a consumer-focused Atlanta map discovery banner, and replace the desktop/mobile "World Cup" link with a direct "Map" discovery link.
*   **Refactored**: Updated `index.astro` and `es/index.astro` to conditionally exclude `<FanFestLineupBanner />` and `<WorldCupSection />` post-event, while updating meta layout tags for permanent local search optimization.
*   **Updated**: Tweaked `IntentGrid.astro` to dynamically swap the "World Cup Guide" card with a new "Neighborhood Map" card pointing directly to `/#map` post-World Cup.

## 📅 July 17, 2026 — Navbar Match Banner Bug + Real Semifinal/Final Results
*   **Fixed**: `Navbar.astro`'s next-match selector had a real logic bug, not just stale data — it picked a match if `status === 'Upcoming'` **or** its date had arrived, so a match manually tagged "Upcoming" that never got flipped to "FT" after it concluded would show as "Next Match" forever, regardless of how much time had passed. Rewrote the check to be date-driven (`status !== 'FT' && date >= today`) so an unflipped status can no longer mask an elapsed match.
*   **Fixed**: Corrected `matches.json` entries that were wrong relative to real results — Argentina 3–1 Switzerland aet (not "2-0"), Spain 2–0 France in the semifinal (was listed as "Upcoming"), and Argentina 2–1 England aet in the semifinal (was listed as "Upcoming" even though the match had already been played).
*   **Added**: The real World Cup Final — Argentina vs Spain, Sunday July 19, 3:00 PM ET, MetLife Stadium (East Rutherford, NJ). Not tagged with `location: "Atlanta"` since the final isn't hosted there — the Atlanta banner now correctly falls back to showing the semifinal as the "Latest ATL Result."
## 📅 July 17, 2026 — Full `astro:assets` Migration for Attractions Images
*   **Migrated**: Moved the 5 attraction hero images from `public/images/parks/` into `src/assets/parks/` and switched the `attractions` collection schema (`content.config.ts`) to Astro's `image()` helper, so `heroImage` is now a build-time-processed asset instead of a static string path.
*   **Refactored**: `outdoors-culture/index.astro` and its `/es` counterpart now render the grid thumbnail via `astro:assets`' `<Image>` component (800×450) instead of a raw `<img>`. Confirmed via build output that Astro generates genuinely distinct optimized variants per usage size (e.g. a 71KB 800px grid thumbnail vs. an 84KB 1600px detail-page hero from the same source file), not just a single static re-serve.
*   **Refactored**: `EditorialHero.astro` (shared with all `businesses` detail pages) now branches on whether `heroImage` is a string or an `ImageMetadata` object — attractions render through `<Image>` (`loading="eager"`, `fetchpriority="high"` since it's the page's LCP element); businesses keep rendering through the original `<picture>`/`<source>` fallback, completely unchanged. Verified both paths in build output.
*   **Note**: `businesses`' `heroImage` remains a plain string by design — migrating it to `image()` too would be a much larger, separate effort (37+ listings) and wasn't in scope here.

## 📅 July 17, 2026 — Background Video Performance Optimization
*   **Performance**: Audited and optimized the homepage hero video loop. Downgraded resolution from 1080p to 720p and capped frame rate at 30 FPS (previously 60 FPS), reducing decoded pixel throughput by 78% (from 124.4M to 27.6M pixels/sec).
*   **Added**: Implemented dual-format video delivery, rendering VP9 `hero-drone-loop.webm` (942KB) for modern Chrome/Android devices and H.264 Main-profile `hero-drone-loop.mp4` (976KB) for wide device compatibility. Combined file size dropped from 3.1MB to under 1MB.
*   **Fixed**: Removed expensive CSS `backdrop-filter: blur(2px)` overlay on the video to eliminate layout recalculation and buffer copy overhead on mobile Safari and Chrome. Replaced with high-performance CSS `filter: blur(2px)` and hardware acceleration triggers (`will-change: transform`, `transform: translate3d(0, 0, 0)`) directly on the `<video>` and fallback poster elements, scaling them by 1.03 to clip edge bleeding.

## 📅 July 12, 2026 — /outdoors-culture Image Optimization
*   **Performance**: Converted the 5 `attractions` hero images (`public/images/parks/`) from raw JPG/PNG to WebP, resized to max 1200px width — same treatment already applied to business photos. Total folder size dropped from 5.2MB to 736KB (civil-human-rights.png alone went from 3.3MB to 58KB). Updated `heroImage` frontmatter in all 5 `src/content/attractions/*.md` files and removed the old raw originals.
*   **Fixed**: Added `loading="lazy"`, `decoding="async"`, and explicit `width`/`height` to the card grid `<img>` in `outdoors-culture/index.astro` and its `/es` counterpart — defers off-screen card images and prevents layout shift.
*   **Note**: Did not migrate to `astro:assets`' `<Image>` component — `public/` assets aren't processed by Astro's image pipeline regardless of which tag renders them, and the detail-page hero goes through the shared `EditorialHero.astro` (also used by all business listings), so a genuine migration needs a scope decision first. See devlog discussion, not yet actioned.

## 📅 July 12, 2026 — FAQ System Overhaul
*   **Consolidated**: Merged two disconnected FAQ implementations (business FAQ on `/list-your-business`, a hardcoded mini-FAQ inside homepage `WorldCupSection.astro`) into one system, per `docs/archive/completed-prds.md`'s FAQ Overhaul entry.
*   **Added**: New standalone `/faq` and `/es/faq` product FAQ pages with `FAQPage` JSON-LD, linked from `Footer.astro`.
*   **Expanded**: Business FAQ grew from 5 to 9 items across 3 categories (Getting Started, Pricing & Tiers, Trust & How We Work) — added coverage for the `professional` tier, Founder-rate deadline mechanics, bilingual reach, and a new trust/consent question about pre-populated listings.
*   **Fixed**: Removed hardcoded, non-i18n FAQ strings from `WorldCupSection.astro` (violated the project's i18n rule); replaced with a link to `/faq#world-cup-logistics`.
*   **Refactored**: `FAQSection.tsx` now supports category grouping, `aria-controls`/`id` linking between question and answer, hash-based deep-linking (`#faq-...`), content-driven height (replacing a fixed `max-h-96` clip that risked truncating longer answers), and fires a Umami `faq_open` event per question.
*   **Schema**: Added optional `category` field to `faq.items` in the `landing_pages` collection (`content.config.ts`).

## 📅 July 12, 2026 — Legal Pages, Sitemap, & Navbar Updates
*   **Refactored**: Overhauled the FAQ system. Consolidated disconnected FAQs into a single system by expanding business FAQs (`list-your-business-{en,es}.md`), building a standalone `/faq` + `/es/faq` product FAQ page (driven by `i18n`), and removing hardcoded non-i18n FAQs from `WorldCupSection`. Upgraded `FAQSection.tsx` with category grouping, `aria-controls` linking, hash deep-linking, and Umami event tracking.
*   **Added**: Built `VideoHero.astro` for the homepage, featuring an ultra-optimized 10s looping 1080p drone video (down from 117MB 4K). Includes a heavy Studio Noir glassmorphism mask, a static fallback `.jpg` for mobile data-saver modes, and a strict `prefers-reduced-motion` accessibility override that pauses the video. Replaced the earlier `FloatingGrid.astro` iteration.
*   **Fixed**: Squashed multiple UI and logic bugs across the site. Fixed a `-z-10` bug hiding the `VideoHero`, stripped buggy JS preventing mobile video playback, and enforced dark overlays (`bg-black/50`) with white floating typography (no containers, heavy drop-shadows) on the homepage. Reverted the `Navbar` top banner to gold (`bg-secondary`) to reserve pink (`bg-primary`) for interactive elements. Tightened mobile vertical spacing in the `/list-your-business/` `HeroSection` to ensure CTAs stay above the fold. Appended upcoming matches to `matches.json` with a new `location` flag to ensure the `Navbar` announcement correctly displays the next *Atlanta* match (England vs Argentina).
*   **Added**: Integrated `@astrojs/sitemap` to auto-generate `sitemap-index.xml` and route mappings during builds for better SEO.
*   **Added**: Created boilerplate Privacy Policy and Terms of Service pages in both English and Spanish, linked globally in the Footer.
*   **Fixed**: Updated the `Navbar.astro` match banner logic. When all matches in the data feed have already concluded (or their date has passed), the banner now gracefully displays "Latest ATL Match Result" instead of incorrectly claiming it's the "Next" match.
*   **Updated**: Tweaked `HeroSection.tsx` mobile layout to reduce padding, font sizes, and margins so CTAs remain above the fold, and brightened the background image overlay to make the skyline more visible.
*   **Performance**: Bulk-processed 14 raw business photos from the `assets-inbox/bar-photos/` holding pen. Converted them to high-performance `.webp` formats (resized to max 1200px) and moved them to `public/images/businesses/`.
*   **Updated**: Automatically updated 14 corresponding markdown files in `src/content/businesses/` to point their `heroImage` frontmatter to the newly optimized `.webp` assets.
*   **Fixed**: Resolved a bug causing marquee scrollers (home pages and `FoundingMemberStrip`) to crawl at extremely slow speeds on mobile by applying `w-max`, unbounding the flex container from the viewport width.
*   **Refactored**: Replaced the right-aligned mobile `.nav-drawer` sidebar with a full-screen `.nav-fullscreen-menu` pop-out in `Navbar.astro` and `global.css`, eliminating z-index conflicts with the announcement banner and improving touch accessibility.
*   **Added**: Moved `WeatherBadge.tsx` out of the mobile menu and anchored it persistently inside the mobile top navbar to ensure real-time weather remains visible before opening the menu.

## 📅 July 11, 2026 — Real World Cup Knockout Results in `matches.json`
*   **Fixed**: Corrected 3 Round of 32 entries that didn't match real results — Germany 1–1 Paraguay (Paraguay won 4-3 on PKs, not "Germany 2-1"), Netherlands 1–1 Morocco (Morocco won 3-2 on PKs, not "Netherlands 3-1"), Brazil 2–1 Japan (not "2-0").
*   **Removed**: Two fabricated entries that didn't happen — a "Spain 2-1 USA" Round of 16 match and a "Germany vs Spain" Semi-Final (Germany was already eliminated in the Round of 32).
*   **Added**: Real, source-verified results for the remaining Round of 32 (12 matches, Jun 30–Jul 3), full Round of 16 (8 matches, Jul 4–7), and Quarterfinals through today (France 2-0 Morocco, Spain 2-1 Belgium, England 2-1 Norway aet).
*   **Note**: Argentina vs. Switzerland (Quarterfinal, Jul 11) was still in progress (Argentina 1-0, 1st half) at research time and was intentionally left out rather than guessed — needs a follow-up update once it concludes.
*   **Added**: Prefixed country flag emojis dynamically before each country name in the top match banner (`Navbar.astro`) to make the live updates visually pop.
*   **Fixed**: Filtered out mock/demo showcase business listings (`is_demo: true`) from the main search/directory finder index grid in `index.astro` and `es/index.astro`, keeping the directory index clean for actual visitors while preserving static detail pages for pricing onboarding links.
*   **Created**: Added a centralized country flag helper file `countryFlags.ts` in `src/utils/` containing flag emojis and Spanish translations for all 48 participating World Cup countries.
*   **Integrated**: Updated both `Navbar.astro` and `GroupStageList.astro` to use the shared flag helpers, showing country flag emojis dynamically next to team names across all match schedules, tickers, and details pages. Added automatic team name translations in Spanish view (`/es/matches`).

## 📅 July 11, 2026 — Professional Tier Showcase, Umami Analytics, and B2B Skyline Hero
*   **Implemented**: Added full technical support for the `professional` monetization tier in the database schemas (`src/content.config.ts`), sidebar features (`SmartSidebar.astro`), events limits (`EventsSection.astro`), and map/onboarding lists (`OwnerOnboarding.tsx`).
*   **Added**: Created a B2B Professional showcase listing "BeltLine Adjacent Realty" (`beltline-adjacent-realty.md`) displaying one weekly recurring seminar event and custom agency highlights.
*   **Added**: Defined `.bar-card-professional` and `.text-gradient-accent` styles in `global.css` using the project's teal accent token, enabling professional listings to render with a custom teal border glow and a "Verified Professional" badge in the directory grid (`DirectoryFinder.tsx`).
*   **Integrated**: Configured Umami Analytics script defer tracking block inside `Layout.astro` powered by a newly created local `.env` and `.env.example` template.
*   **Added**: Integrated the Atlanta daytime skyline photo (`content.png`) as a background image inside the B2B onboarding hero section (`HeroSection.tsx`), optimizing performance via WebP conversion (`b2b-skyline-day.webp`) with PNG fallback.
*   **Refactored**: Renamed the redundant folder index `docs/README.md` to `docs/index.md` to avoid duplicate README name conflicts across directories.
*   **Cleaned**: Removed the duplicate `downtown-atlanta-tourist-map-max.webp` file from the repository root.
*   **Implemented**: Replaced the B2B claim advertisement top announcement banner in the navigation bar (`Navbar.astro`) with a dynamic **Live World Cup / Fan Fest Match Update** banner. It automatically pulls and translates the next upcoming match dynamically from `matches.json`.
*   **Updated**: Appended realistic upcoming World Cup knockout stage matches (like the Atlanta July 15 Semi-Final) to `matches.json` to enable active future-match lookups.
*   **Activated**: Imported and rendered the orphaned **`WeatherBadge.tsx`** component inside both the desktop header controls and the mobile drawer controls in `Navbar.astro`, providing visitors with live, localized temperature and condition code overlays for downtown Atlanta.

## 📅 July 11, 2026 — Token-Efficiency Pass on the Docs Workflow
*   **Added**: Inlined the Free/Promoter/Headliner tier allow-list table directly into `CLAUDE.md` so the most frequently-needed schema fact loads with every session instead of requiring a separate read of `docs/agents.md`.
*   **Trimmed**: Collapsed the redundant, stale 3-tier feature/pricing writeup in `business/business_plan.md` down to a pointer at the tier table in `CLAUDE.md` and `docs/contracts/`.
*   **Cleaned**: Simplified the superseded-annual-rate correction in `business/pricing_prd.md` from a strikethrough table to clean corrected figures with a one-line note.
*   **Added**: Devlog rollover policy in `docs/agents.md` — once this file passes ~150 lines, older entries move to `docs/archive/devlog-archive.md` so logging a new entry never requires reading a huge file.
*   **Compressed**: Replaced `docs/engineering/` (3 completed, full-document PRDs: howdy email, performance, accessibility) with a single one-line-each summary at `docs/archive/completed-prds.md`; full write-ups remain in git history.
*   **Updated**: `docs/README.md` and `CLAUDE.md` docs maps to drop the removed `engineering/` folder reference.

## 📅 July 11, 2026 — AI Documentation Workflow Overhaul & Docs Reorganization
*   **Added**: Root `CLAUDE.md` so agent operating rules auto-load every session instead of requiring a manual pointer to `docs/agents.md`.
*   **Added**: `⚠️ Data Integrity & Factual Accuracy` and `📓 Developer Log Requirement` sections to `docs/agents.md`, codifying the anti-fabrication rule and the requirement to log every change here.
*   **Fixed**: Corrected `docs/agents.md`'s stack description (Astro v5 → v6, matching `package.json`).
*   **Reorganized**: Split the flat `docs/` folder into `business/`, `engineering/`, `reference/`, `archive/`, plus a new `docs/README.md` index distinguishing living docs from historical/superseded ones.
*   **Flagged**: Documented a pricing figure conflict across `business/pricing_prd.md`, `business/business_plan.md`, and the shipped `contracts/`/July 2 entry above — annual rates in the two former docs were stale; `contracts/` + `business/value_ladder_evolution.md` Iteration 3 ($199/$699/$899 Founder annual for Promoter/Headliner/Professional) are the confirmed source of truth.
*   **Marked completed**: `engineering/howdy_email_prd.md`, `engineering/performance_prd.md`, and `engineering/accessibility_prd.md`, whose target work already shipped per the July 2 entry below.
*   **Moved**: Relocated an untracked 33MB Google Drive photo dump from `docs/` to `/assets-inbox/bar-photos/` (not documentation, was already gitignored) and updated `.gitignore` accordingly.

## 📅 July 2, 2026 — B2B Pricing Structure, Scarcity Gates, Bilingual Translations, Accessibility & Performance Audits
*   **Implemented**: Updated English and Spanish business onboarding landing pages with a new `Professional` tier ($129/mo or $899/yr) and aligned discount annual rates ($29/mo and $199/yr for Promoter; $99/mo and $699/yr for Headliner) across lists, forms, and contracts.
*   **Added**: Enforced Plain-Text URLs for Free tier listings inside `SmartSidebar.astro` and limited Promoter tier to exactly 1 weekly recurring event (with upsell prompts) in `EventsSection.astro`.
*   **Renamed**: Renamed "FiNCA to FiLTER @ Side Saddle" to "FiNCA to FiLTER (Boulevard Heights)" and moved/updated its markdown content collection file.
*   **Created**: Added a new Free tier listing for "Side Saddle Wine Saloon & Bar".
*   **Updated**: Changed the site's public contact email to `howdy@outatl.com` across forms and documents.
*   **Updated**: Finalized tournament scores for June 29 matches (Germany 2-1, Netherlands 3-1, Brazil 2-0).
*   **Fixed**: Moved the announcement banner to `Navbar.astro` to solve top margin alignment bugs on non-homepages.
*   **Localized**: Implemented a central category translation map (`categoryTranslations.ts`) to translate card badges, detail headers, and event days dynamically in the Spanish view.
*   **Fixed**: Removed the Rickroll placeholder video from the Intown Primary Care listing.
*   **Security**: Added RFC 9116 compliant `.well-known/security.txt`.
*   **Accessibility**: Resolved Lighthouse accessibility failures by adding `aria-label` to map pin buttons, increasing button sizes to 44x44px for touch targets, and boosting color contrast on filter chips.
*   **Performance**: Optimized First Contentful Paint (FCP) and Largest Contentful Paint (LCP) from 9/100 to 100/100 by:
    *   Unpacking and self-hosting variable font files (`Outfit` & `Plus Jakarta Sans`) locally in `public/fonts/` to eliminate external Google Font stylesheet fetches and DNS resolution delays.
    *   Preloading the font assets in [Layout.astro](file:///home/ravi/01_projects/out-atl/world-cup-hub/src/layouts/Layout.astro).
    *   Lazy-hydrating the off-screen React `InteractiveMap` component (changing `client:load` to `client:visible`).
    *   Replacing `transition-all` on the FanFestLineupBanner container with GPU-composited `transition-colors` to prevent layout reflows and eliminate Lighthouse layout animation warnings.

## 📅 June 29, 2026 — Business Listing Downgrade & Knockout Bracket Score Updates
*   **Downgraded**: Downgraded the FiNCA to FiLTER (Old Fourth Ward) listing to the `free` tier (`finca-to-filter.md`) to support sales upselling, automatically activating paywall prompts in the UI.
*   **Updated**: Populated `src/data/matches.json` with all remaining group stage results from June 18 through June 27, 2026, plus the first Round of 32 results (Canada vs. South Africa) on June 28, and scheduled matches for June 29.
*   **Refactored**: Updated `src/components/world-cup/BracketViewer.astro` to reflect correct Round of 32 qualifiers and bracket progression (e.g., South Africa, Brazil, Paraguay, Sweden, Uruguay, Croatia) and marked Canada as advanced.

## 📅 June 20, 2026 — Navigation Streamlining, Content Integrity Audit & Real Score Updates
*   **Implemented**: Simplified and streamlined user navigation by implementing a clean, flat navbar design with a slide-out mobile drawer (Option C), improving cross-device usability.
*   **Cleaned**: Performed a content integrity sweep across the entire project. Removed 10 fabricated or unverified claims sitewide, including fake metadata fields like `jobs_supported` and `local_sourcing` from 9 business markdown files.
*   **Updated**: Populated `src/data/matches.json` with real, verified results and scores from the actual World Cup 2026 group stage matches played from June 11 through June 17, 2026, marking them as finished (`FT`).
*   **Fixed**: Fixed hours parser edge cases and reference errors (`isNight`) to ensure Open/Closed badges display accurately on business cards.

---

## 📅 June 15, 2026 — Match Database, Blog & Press System, Accessibility Widget & Netlify Launch
*   **Implemented**: Group stage match schedule parsed from a local JSON database (`src/data/matches.json`) and rendered above the knockout bracket on `/matches` and `/es/matches`.
*   **Fixed**: Resolved a Mermaid v11 syntax error in `BracketViewer.astro` by removing nested parentheses in node labels that were closing shapes prematurely.
*   **Implemented**: Built the **Neon Stream** Editorial and Press portal, featuring glassmorphic components (`BlogCardNeon.astro`, `PressCardNeon.astro`, `CategoryFilterBar.astro`), client-side instant category filtering, and strict route-level language isolation (`/blog` vs `/es/blog`).
*   **Implemented**: Integrated the **Mercury Media Stewardship & Accessibility Widget** (`AccessibilityWidget.astro`), supporting High Contrast, Highlight Links, and Pause Animations. Added inline blocker scripts to prevent FOUC and generated metadata endpoints (`public/humans.txt`, `public/robots.txt`, `public/llms.txt`).
*   **Configured**: Added production `site` property in `astro.config.mjs` and successfully connected the custom domain `outatl.com` to Netlify using external DNS CNAME/A records.
*   **Fixed**: Simplified the onboarding/calibration menu (`OnboardingMenu.tsx`) down to two choices (Language and Atmosphere), letting the Atmosphere choice implicitly dictate persona and site mode to prevent state-selection conflicts.

---

## 📅 June 14, 2026 — Cloudflare Integration, Crossover Modes & Day-Mode Expansion
*   **Added**: Proper AI documentation workflow (`docs/agents.md`, `docs/soul.md`, `docs/devlog.md`).
*   **Integrated**: Astro v5 Cloudflare Pages adapter config with static-default compile target (resolving deprecated hybrid output type).
*   **Added**: `operating_mode` database schema enum (`'day' | 'night' | 'both'`) to support crossover businesses. Refactored `DirectoryFinder.tsx` to handle crossovers dynamically with smart category fallbacks.
*   **Configured**: Crossover flags on `octane-coffee.md`, `blakes-on-the-park.md`, and `woofs-atlanta.md` so they render correctly on both Out & About and After Hours directory states.
*   **Added**: New day categories (`Bookstore`, `Barbershop & Salon`, `Medical Clinic`) with custom translation bindings in EN/ES.
*   **Created**: 4 new day-mode listings (`charis-books.md`, `boy-next-door.md`, `ansley-square-barber.md`, `intown-primary-care.md`) representing retail, wellness, and professional services.
*   **Implemented**: Dynamic Event structured JSON-LD data inside local business page headers, calculating next calendar date-time ISO strings for recurring events automatically.
*   **Modified**:
    *   `src/stores/modeStore.ts`: Fix to toggle `.light`/`.dark` classes on the HTML root, enabling seamless Day/Night UI theme switching.
    *   `src/components/home/LeadMagnet.tsx`: Added map mockup visual (`/images/map_mockup.png`) to boost CRO.
    *   `src/i18n/es.ts`: Removed a stray formatting block at the end of the file.

---

## 📅 June 12, 2026 — Real-Time Systems & Layout Integration
*   **Added**: Dynamic opening status indicators. The hours table in `SmartSidebar.astro` now automatically highlights the current day of the week and displays a live status badge (`Open Now`, `Closed`, `Appointment Only`) calibrated to Atlanta's local time zone.
*   **Refactored**: Standardized details pages (`[slug].astro` and `/es/[slug].astro`) to use global layout headers and footers.
*   **Added**: Optimized high-resolution image paths for 9 new bars and existing listings, incorporating modern WebP conversion targets.

---

## 📅 June 11, 2026 — The Rebranding & Architecture Switch (AltATL -> OutATL)
*   **Migrated**: Moved from a legacy Vite SPA template to **Astro v5 (SSG)** to ensure zero-hardcoded listings and dynamic search crawlers.
*   **Rebranded**: Renamed the directory from "BaresATL" / "AltATL" to **OutATL** across the core copy, schema definitions, and assets.
*   **Refactored**: Rebuilt the content collection schema (`businesses`) to replace the narrow `bars` collection, paving the way for multi-sector listings.
*   **Added**: **Dual State Master Switch** at the top of the directory, segmenting listings based on day-mode (`Out & About`) vs night-mode (`After Hours`).
*   **Added**: High-fidelity owner onboarding pitch section (`OwnerOnboarding.astro`) at `/list-your-business` to capture local B2B subscription sales.

---

## 🚀 Upcoming Roadmap Steps

1.  **Stripe/Typeform Self-Serve Integration**: Build self-serve onboarding payments for Promoter/Headliner subscription sign-ups.
2.  **Interactive Leaflet Map View**: Integrate a dynamic map displaying day/night-specific pins for the 2026 World Cup transit routes.
