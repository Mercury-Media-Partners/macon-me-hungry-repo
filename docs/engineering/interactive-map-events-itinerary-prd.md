# PRD: Interactive GIS Map, Live Events Radar, Shared Itinerary Hub & Automated Leads (Features #1, #2, #3, #4 & #5)

* **Document Status**: Draft / Pending Execution Approval
* **Author**: OutATL Core Product & Engineering
* **Date**: July 22, 2026

---

## 1. Executive Summary

This PRD outlines the technical specifications for implementing the next major milestone of OutATL:
1. **Real Vector GIS Map Upgrade & Hover-Sync (#4)**: Replacing static image coordinates with a real interactive Leaflet map engine (CartoDB Dark Matter / Positron tiles) with exact `lat`/`lng` coordinates and live directory card hover-syncing.
2. **Shared Itinerary Route Experience (#1)**: Enhancing `?itinerary=...` links with a step-by-step route itinerary view and MARTA transit guidance.
3. **Live Events & Nightlife Radar Calendar (#2)**: Launching `/events` and `/es/events` to index and showcase weekly drag shows, trivia, DJ nights, and party announcements.
4. **🔴 Real-Time "Open Right Now" Live Filter (#3)**: Atlanta-timezone status calculations highlighting open venues in real-time.
5. **Merchant Lead Capture Integration (#5)**: Connecting `PartnerForm.tsx` to handle inbound claims and tier inquiries cleanly.

---

## 2. Feature Specifications

### 2.1. Real Vector GIS Map Upgrade (`LeafletMap.tsx` / `InteractiveMap.tsx`)
* **Problem**: The current map uses static percentage coordinates (`x: 18, y: 78`) on a static image, which limits zooming, tile exploration, and accurate venue positioning.
* **Solution**: Upgrade to `leaflet` with CartoDB Dark Matter tiles (matching dark mode) and CartoDB Positron tiles (matching light mode).
* **Technical Details**:
  * Real geographic coordinates (`lat: 33.7816, lng: -84.3828` for Midtown, etc.).
  * Custom styled SVG markers for categories (Nightlife, Cafes, Outdoors/Parks, MARTA Stations).
  * Smooth pan-to-marker animation when hovering/clicking cards in `DirectoryFinder`.
  * Mobile tap popup displaying venue summary + "Open in Quick Drawer" action.

### 2.2. Shared Itinerary Route Experience (`ItineraryView.tsx`)
* **Trigger**: Visiting `outatl.com/?itinerary=slug1,slug2` or tapping "View Plan" in `ItineraryBar`.
* **UI**:
  * Header: *"Curated Atlanta Night Out: X Spots Selected"*.
  * Ordered route list showing Stop 1 → Stop 2 → Stop 3.
  * Distance & travel time estimates between stops (walking / MARTA line).
  * Direct "Share via iMessage / WhatsApp" share button.

### 2.3. Live Events & Nightlife Radar (`/events` & `/es/events`)
* **Routes**: `/events` and `/es/events`.
* **Data Source**: Aggregates all event objects from `src/content/businesses/*.md`.
* **Filters**:
  * Day pills: *All Days*, *Tonight*, *Friday Night*, *Saturday Night*, *Sunday Drag Brunch*.
  * Category pills: *Drag Shows*, *DJ & Dancing*, *Trivia & Games*, *Live Music*.
* **SEO**: Full event structured data schema (`Event` JSON-LD) for Google Events indexing.

### 2.4. 🔴 "Open Right Now" Live Radar Filter
* **Implementation**: Calculates local Atlanta time (`America/New_York`).
* **Behavior**: 1-tap filter pill in `DirectoryFinder` and map toggle showing only venues currently operating, with a pulsing emerald status ring.

### 2.5. Merchant Lead Capture Integration (`PartnerForm.tsx`)
* **Behavior**: Handles form submission for business claims, displays clear success confirmation toasts, and validates tier selection.

---

## 3. Architecture & File Plan

```
src/
├── components/
│   ├── map/
│   │   ├── InteractiveMap.tsx      # Upgraded with Leaflet & CartoDB tiles
│   │   └── LeafletMapContainer.tsx # Dynamic client:only component
│   ├── events/
│   │   └── EventsRadar.tsx         # Filterable event calendar
│   └── directory/
│       └── ItineraryView.tsx       # Route itinerary map view
└── pages/
    ├── events.astro                # English events portal
    └── es/events.astro             # Spanish events portal
```

---

## 4. Verification Plan

1. **Build Verification**: Run `bun run build` to verify 100% compilation across all pages including new `/events` routes.
2. **Map Verification**: Confirm Leaflet tiles render cleanly in dark and light modes with custom markers.
3. **Event Verification**: Confirm `/events` aggregates event frontmatter accurately.
