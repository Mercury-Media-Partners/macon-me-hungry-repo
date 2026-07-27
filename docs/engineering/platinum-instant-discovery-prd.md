# PRD: Platinum Instant Discovery & Viral Night Out Builder

* **Feature Name**: Platinum Instant Discovery & Viral Night Out Builder (Plan A)
* **Author**: OutATL Engineering & UX Team
* **Status**: Draft / Pending Implementation Approval
* **Date**: July 22, 2026

---

## 1. Executive Summary

OutATL currently operates as a high-performance static directory for LGBTQ+ businesses, venues, and culture in Atlanta. While visual quality and SEO coverage are high, user interaction relies on standard full-page navigations and static listing cards.

**Plan A ("Platinum Instant Discovery & Viral Night Out Builder")** introduces three transformative capabilities to OutATL:
1. **Instant Slide-Over Venue Drawer**: Zero-page-reload venue previews with deep-linking support (`?venue=slug`).
2. **Shareable "Night Out" Itinerary Builder**: A viral B2C loop allowing users to bundle 2–4 venues into a shareable custom link (`outatl.com/?itinerary=venue-a,venue-b`) for group chats.
3. **Hero Quick-Search Integration**: Instant search input and intent chips embedded directly into the primary video hero.
4. **Native Merchant Conversion Hooks**: In-grid owner acquisition cards seamlessly integrated into listing feeds.
5. **Mobile Compact Filter Sheet**: Reduced filter height on mobile screens via a clean bottom-sheet filter modal.

---

## 2. Business & Product Objectives

* **B2C Engagement**: Increase session duration by 40% and eliminate full-page reload friction for browsing venues.
* **Viral Acquisition**: Drive user-to-user organic referral traffic via iMessage/WhatsApp/Instagram itinerary sharing.
* **B2B Lead Generation**: Increase click-through rates to `/list-your-business` by embedding native owner conversion prompts inside directory results.
* **Mobile UX Excellence**: Eliminate vertical filter scroll fatigue on mobile viewports.

---

## 3. User Experience & Feature Specifications

### 3.1. Instant Slide-Over Venue Drawer (`VenueQuickDrawer.tsx`)
* **Trigger**: Clicking any business card in `DirectoryFinder` (or opening URL with `?venue=[slug]`).
* **UI Structure**:
  * Backdrop blur overlay with smooth slide-in transition from right (desktop) or bottom (mobile).
  * High-res hero image / photo carousel with category tag and tier status badge.
  * Venue Name, Tagline, Address, Neighborhood, MARTA station proximity.
  * Real-Time Open/Closed Status Badge calculated in `America/New_York` timezone.
  * Highlights (Patio, Bilingual Staff, Pet-Friendly).
  * CTAs:
    * `+ Add to Night Out` (adds to itinerary store).
    * `View Full Details & Profile →` (navigates to `/businesses/[slug]`).
    * `Get Directions ↗` (opens Google Maps).
* **Deep-Linking**: Syncs `?venue=[slug]` in browser history using `history.pushState` so drawer links can be copied directly.

### 3.2. Shareable "Night Out" Itinerary Builder (`ItineraryBar.tsx` & Store)
* **State Management**: NanoStore `$itineraryStore` storing an array of venue IDs.
* **Floating Action Bar**:
  * Appears at the bottom-center of the screen when `$itineraryStore` contains $\ge 1$ items.
  * Badge displays total spots: `🍷 Night Out Plan (3 Spots)`.
  * Actions: `View Plan` and `Copy Share Link`.
* **Share Modal / Drawer**:
  * Shows ordered venue list with re-order or remove controls.
  * Generates compressed URL parameter: `https://outatl.com/?itinerary=blakes-on-the-park,the-heretic,finca-to-filter`.
  * Clicking `Copy Link` copies URL with a toast confirmation ("Itinerary link copied! Share with your group 💃").
* **Shared Itinerary Viewer Banner**:
  * When a visitor lands on `outatl.com/?itinerary=...`, display a top hero banner:
    > *"Curated Atlanta Night Out: 3 Spots Selected. Explore below or open in map."*
  * Automatically filters directory or highlights these venues on the map.

### 3.3. Hero-Integrated Quick Search (`HeroSearch.tsx`)
* **Location**: Embedded inside `VideoHero.astro` on `index.astro` and `es/index.astro`.
* **Components**:
  * Search input box: *"Search cafes, dance clubs, patios..."*
  * Quick-filter pills: `🍷 Nightlife`, `☕ Cafes & Work`, `🌳 Patios`, `💃 Drag Shows`.
* **Behavior**: Submitting search or tapping a pill smooth-scrolls down to `#bar-finder` and sets active filter state seamlessly.

### 3.4. Native Merchant Conversion Cards (`MerchantClaimCard.tsx`)
* **Placement**: Injected into `DirectoryFinder` grid results at slot #6 and #18.
* **Design**: Styled like a VIP card with gradient accent border.
* **Copy**:
  * EN: *"Own a local venue or business in Atlanta? Join OutATL for free & connect with locals and visitors."*
  * ES: *"¿Tienes un negocio local en Atlanta? Únete a OutATL gratis y conecta con la comunidad."*
* **CTAs**: `Claim Your Listing →` (navigates to `/list-your-business`) and `See Owner Preview` (triggers `?preview=true`).

### 3.5. Mobile Compact Filter Sheet
* **Viewport Scope**: Screens `< 768px`.
* **Behavior**: Collapses Category, Neighborhood, and Feature chip rows into a single sticky button: `🔍 Filter Options (2 Active)`.
* **Filter Sheet**: Tapping opens a sleek bottom slide-up sheet with clean switches and radio buttons.

---

## 4. Technical Architecture & File Changes

```
src/
├── stores/
│   ├── itineraryStore.ts         # NanoStore for itinerary items & URL serialization
│   └── drawerStore.ts            # NanoStore for active quick-drawer venue slug
├── components/
│   ├── directory/
│   │   ├── DirectoryFinder.tsx   # Updated to consume drawer & itinerary stores
│   │   ├── VenueQuickDrawer.tsx  # New: Slide-over drawer component
│   │   ├── ItineraryBar.tsx      # New: Floating itinerary bar & share modal
│   │   ├── MerchantClaimCard.tsx # New: In-grid merchant claim component
│   │   └── MobileFilterSheet.tsx # New: Mobile bottom-sheet filter modal
│   └── home/
│       └── VideoHero.astro       # Updated to include quick search bar
└── pages/
    ├── index.astro               # Updated with itinerary URL handler script
    └── es/index.astro            # Updated with bilingual itinerary URL handler
```

---

## 5. Success Metrics & Verification

1. **Build Verification**: Zero TypeScript / Astro build errors (`bun run build`).
2. **Interactive Testing**:
   - Verify drawer opens and closes without page reload.
   - Verify `?venue=slug` updates URL without refreshing page.
   - Verify adding 2 venues creates valid shareable `?itinerary=...` link.
   - Verify mobile filter sheet toggles smoothly.
3. **SEO & Accessibility**:
   - Ensure screen-reader access (`aria-modal`, `aria-label`) on drawer and modals.
   - Preserve all existing structured JSON-LD schemas.
