# PRD: Ethical Directory Monetization & Merit-Based Search Architecture

* **Document Status**: Approved / Pending Execution
* **Author**: OutATL Growth & Engineering Team
* **Date**: July 22, 2026

---

## 1. Executive Summary & Core Philosophy

OutATL is committed to being **Atlanta's #1 most trusted independent LGBTQ+ directory**. To maintain complete editorial integrity, user trust, and community credibility, OutATL enforces an **Ethical Monetization Policy**:

1. **Zero Pay-to-Play Organic Bias**: Default search and directory results in `DirectoryFinder` and `InteractiveMap` are **100% merit-based** (sorted by Rating, Community Reputation, and Operating Status). Paid tiers NEVER hijack organic search rankings.
2. **Transparent "Sponsored Spotlight" Labeling**: Paid promotional real estate is restricted to 1 dedicated top slot per search, explicitly labeled **`SPONSORED SPOTLIGHT`** or **`PATROCINADO`**, preserving full transparency for consumers.
3. **Utility & Conversion Monetization**: Venues pay for **direct customer conversion tools** (direct outbound website links, Instagram handles, custom `"Book Table"` CTA buttons, weekly event calendar sync, job board access, and lead analytics) rather than paid ranking corruption.
4. **Grassroots & Non-Profit Exemption**: Local LGBTQ+ non-profits, community youth organizations, zine projects, and grassroots initiatives receive 100% free verified partner status.

---

## 2. Technical Requirements & Sorting Logic

### 2.1. Organic Merit Sorting (`DirectoryFinder.tsx`)
```ts
// Organic sorting: 100% Merit & Rating Based
const sortedListings = filteredModeMatched.sort((a, b) => b.data.rating - a.data.rating);
```

### 2.2. Transparent Sponsored Spotlight Slot
* **Placement**: Injected cleanly at slot #1 of search results *only* if a paid partner matches the current filter query.
* **Visual Styling**: Rendered with an explicit top badge:
  * EN: `⚡ SPONSORED SPOTLIGHT`
  * ES: `⚡ PATROCINADO`
* **Fairness Guarantee**: The remaining directory grid items (#2 to #N) remain strictly sorted by rating.

---

## 3. Targeted Implementation Files

1. `src/components/directory/DirectoryFinder.tsx`: Update sorting logic to rating/merit-based and add transparent `SPONSORED SPOTLIGHT` badge for paid cards in slot #1.
2. `docs/devlog.md`: Append developer log entry.
