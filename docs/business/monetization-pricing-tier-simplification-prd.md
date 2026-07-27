# PRD: OutATL Monetization & Tier Simplification (SEO-First + Industry-Prorated Partner Tier)

* **Document Status**: Approved / Ready for Implementation Plan
* **Author**: OutATL Product & Growth Engineering
* **Date**: July 22, 2026

---

## 1. Executive Summary & Core Philosophy

OutATL is transitioning from a complex 4-tier feature matrix (*Free, Promoter $49/mo, Professional $299/mo, Headliner $199/mo*) to a **Streamlined 1-Tier Partner Model ("OutATL Verified Partner")** with **Industry-Prorated Pricing**.

### Key Principles:
1. **SEO Supremacy First**: 100% of venues in Atlanta (free and paid) get complete, un-throttled indexing for Google search dominance. We do NOT withhold address, hours, category, transit, or descriptive text from search engines just because a venue is free.
2. **One Paid Status ("Verified Partner")**: Eliminates feature comparison paralysis. Paying partners unlock 100% of premium conversion capabilities (direct website links, socials, event schedules, job board access, custom CTAs, and top search grid placement).
3. **Industry-Prorated Pricing**: Pricing is scaled by business margin and industry category rather than feature access:
   * **Community & Lifestyle** ($29/mo or $290/yr): Cafes, Bookstores, Barbers, Vintage Retail, Solo Artists.
   * **Nightlife & Hospitality** ($89/mo or $890/yr): Bars, Dance Clubs, Drag Venues, Restaurants, Event Spaces.
   * **Commercial & Professional** ($199/mo or $1,990/yr): Real Estate, Medical, Legal, Financial, Home Contractors.

---

## 2. Competitive & Business Justification

### Why 4-Tier Feature Matrices Fail for Local Directories:
* **Buyer Decision Paralysis**: Local business owners do not want to compare 15 bullet points to decide between "Promoter" and "Professional".
* **Low Conversion**: Complex pricing creates friction during sales outreach.
* **Pricing Inequity**: Charging a small coffee shop ($200k ARR) the same as a multi-story dance club ($2M+ ARR) or real estate firm ($5M+ ARR) results in either undercharging corporate clients or priced-out small businesses.

### Why the Industry-Prorated Single-Tier Wins:
* **Crystal Clear Offer**: *"One plan. Everything unlocked. Direct website links, event postings, top search placement, and custom booking buttons."*
* **Fair ROI Alignment**: A coffee shop gets ROI from 2 extra cup sales per week. A real estate firm gets ROI from 1 client every 3 years.

---

## 3. Detailed Architecture & Tier Definition

### 3.1. Free Listing Tier (`tier: "free"`)
* **Purpose**: Catalog depth, consumer utility, and #1 Google SEO rankings.
* **Features Included**:
  * Full title, tagline, neighborhood, category, category_type, operating_mode.
  * Address, MARTA transit station proximity, live open/closed status badge.
  * Full JSON-LD `LocalBusiness` schema for Google search crawlers.
  * Up to 1 gallery photo.
  * Search inclusion in `DirectoryFinder` and `InteractiveMap`.
* **Paid Upgrade Triggers (Locked for Free)**:
  * Direct outbound website link.
  * Social media handles (Instagram, Facebook, Twitter).
  * Weekly recurring events & job postings.
  * Custom conversion CTA buttons (`"Book Table"`, `"View Menu"`).
  * Priority pinned rendering at top of search results.

### 3.2. OutATL Verified Partner Tier (`tier: "partner"` / legacy aliases supported)
* **Purpose**: Maximum customer acquisition and direct lead conversion for venue owners.
* **Features Unlocked (100% for All Partners)**:
  * 🟢 **Direct Outbound Website Link**: Direct dofollow/clean link to venue's booking or home page.
  * 🟢 **Active Social Links**: Direct Instagram, Facebook, and Twitter handles.
  * 🟢 **Event Schedule Sync**: Up to 5 recurring weekly events or special party announcements.
  * 🟢 **Job Board Access**: Post active local job openings on OutATL's job board.
  * 🟢 **Custom Conversion CTA Button**: Custom button (`"Book Table"`, `"RSVP Now"`, `"Order Online"`) linking to direct URL.
  * 🟢 **Featured Spotlight Placement**: Top-of-grid priority sorting with glowing `★ Verified Partner` badge.
  * 🟢 **Full Media Gallery**: Up to 5 high-res gallery images.

---

## 4. Industry-Prorated Pricing Matrix

| Industry Category | Target Venues & Services | Monthly Rate | Annual Rate (Save 17%) |
| :--- | :--- | :---: | :---: |
| **Community & Lifestyle** | Cafes, Bookstores, Barbershops, Retail, Bakeries | **$29 / mo** | **$290 / yr** |
| **Nightlife & Hospitality** | Bars, Dance Clubs, Drag Venues, Restaurants, Event Spaces | **$89 / mo** | **$890 / yr** |
| **Commercial & Professional** | Real Estate Agencies, Law Firms, Medical Clinics, Contractors | **$199 / mo** | **$1,990 / yr** |

---

## 5. Schema & Content Collection Updates

### 5.1. Frontmatter Tier Backward Compatibility
To avoid breaking any existing markdown files in `src/content/businesses/`, the Zod schema in `src/content.config.ts` will accept:
* `'free'` (Free Tier)
* `'partner'` (New Single Paid Partner Status)
* Legacy aliases (`'promoter'`, `'professional'`, `'headliner'`) will be mapped dynamically to `'partner'` at runtime.

---

## 6. Target Implementation Files

1. `src/content.config.ts`: Update business collection schema and landing page schema.
2. `src/pages/list-your-business.astro` & `src/pages/es/list-your-business.astro`: Update B2B sales copy, pricing cards, and partner claim form to reflect the new 3-industry prorated tier system.
3. `src/components/business/SmartSidebar.astro`: Update upgrade banner text to reflect the simplified "Verified Partner" tier.
4. `src/i18n/en.ts` & `src/i18n/es.ts`: Update translation keys for tier names and pricing descriptions.
5. `docs/devlog.md`: Append developer log entry.
