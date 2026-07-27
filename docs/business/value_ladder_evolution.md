# OutATL Business Model & Value Ladder Evolution

This document tracks the strategic evolution of the OutATL pricing tiers, feature distribution, and B2B monetization hooks. Each major change or strategic review is appended below with a horizontal separator (`---`) to preserve historical design context.

---

## Iteration 1: Gated Utility & Pay-to-Play Gating (Original Model)
*Date: June 11, 2026*

### Strategic Context
Designed to enforce hard limits on free tiers to force conversion. Features were focused on gatekeeping basic utilities and hiding competitive suggestions on paid tiers.

### Tier Structure:
1. **On the Map (Free):**
   * Features: Name, physical address, phone, hours, and exactly 1 photo.
   * Locked: Website links, social handles, event calendars, maps.
2. **Promoter ($49/mo):**
   * Features: Active links (Website, Instagram), interactive maps, 5 photo gallery, up to 3 weekly event listings.
3. **Headliner ($149 - $199/mo):**
   * Features: Pinned priority listing, unlimited events, video headers, custom conversion CTA buttons ("Buy Tickets").
   * Competitive Gate: Complete removal of competitor recommendations ("Similar Venues") from their listing detail page.

### Strategic Critiques:
* **User Experience Deficit:** Removing "similar business recommendations" from Headliner pages destroys the discovery purpose of the directory, hurting overall user engagement.
* **Low Annual Adoption:** A flat 10x monthly multiplier on annual tiers offers no high-yield incentive to pay upfront, exposing the business to major post-World Cup churn.

---

## Iteration 2: Amplified Leverage & B2C Discovery Alignment
*Date: July 2, 2026 (11:40 AM)*

### Strategic Context
Pivoted from gated utility (punishing the user) to amplified reach and B2B marketing support. Ensured that B2C search utility remained intact across all tiers.

### Tier Structure:
1. **On the Map (Free - $0):**
   * Features: Standard search listings, active map integration, 1 photo, and active website/social links.
2. **Promoter ($29/mo Founder / $49/mo Standard):**
   * Features: Priority search boost, up to 5 photo gallery, and up to 3 weekly recurring event listings on the local calendar.
3. **Professional ($129/mo Founder / $299/mo Standard):**
   * Features: Embedded lead capture forms, local neighborhood spotlight placement, verified trust badges, and SEO schema optimization.
4. **Headliner ($99/mo Founder / $199/mo Standard):**
   * Features: Custom POS/ticketing integrations (e.g. "Buy Tickets" button), background video headers, bilingual editorial curation, and social media/press boosts.

### Strategic Critiques:
* **Over-Generous Promoter Tier:** Allowing 3 weekly events on the $29 Promoter tier covers 100% of a typical cafe or bar's calendar (Trivia, Happy Hour, Brunch). It leaves zero incentive for active venues to upgrade to the Headliner tier.
* **Free Tier Website Value Leak:** Providing fully clickable, active outbound website links on the Free tier makes it too easy for businesses to capture directory traffic and funnel it to their own pages without ever paying us a dollar.

---

## Iteration 3: Refined Value Ladder (Event Scarcity & Link Friction)
*Date: July 2, 2026 (12:12 PM)*

### Strategic Context
Refined the balance between consumer discovery and merchant conversion. We preserve information accessibility for the B2C visitor while introducing conversion friction for the merchant.

### Tier Structure:

| Tier | Price (Founder / Standard) | Features & Upgrade Levers | Merchant Friction / Goad |
| :--- | :--- | :--- | :--- |
| **On the Map (Free)** | $0 / $0 | Business name, phone, address, hours, active map view, and **plain-text URL** (non-clickable). | Merchant's URL is visible to users but requires manual copy-pasting (high friction). Social links and event calendars are locked. |
| **Promoter (Lifestyle/Cafes)** | $29/mo ($199/yr) / $49/mo ($399/yr) | **Clickable website & social links**, up to 5 gallery images, and **exactly 1 weekly recurring event** (e.g., Trivia Night). | Limited to 1 event. If the business hosts multiple events (brunch, karaoke, open mic), they cannot list them. |
| **Professional (Services)** | $129/mo ($899/yr) / $299/mo ($2,290/yr) | Promoter features + **Direct B2B Lead Capture form widget** on page, priority search placement in professional services categories, verified status badge. | Focused strictly on B2B conversion optimization (Realtors, Clinics). |
| **Headliner (Venues/Clubs)** | $99/mo ($699/yr) / $199/mo ($1,490/yr) | Promoter features + **Unlimited event listings**, custom conversion CTA button ("Buy Tickets", "Book a Table"), video headers, manually translated bilingual description write-up by OutATL. | The ultimate conversion engine for high-traffic venues. |

### Upgrade Incentives (The "Why they pay" levers):
1. **The Link Lever:** Moving from Free to Promoter transforms a static, plain-text domain URL into a live, high-conversion link. Users on mobile can tap once to visit the store or view Instagram menus.
2. **The Calendar Lever:** Promoter allows exactly **one** recurring event. A music venue, theater, or club cannot survive on 1 event slot. They are forced to buy Headliner to publish their monthly calendars and link direct ticket checkout buttons.

---

> **This is the current iteration.** Iteration 3's Founder rates match `docs/contracts/` and the July 2, 2026 `docs/devlog.md` entry. Append a new `## Iteration N` section here (don't edit past iterations) the next time pricing strategy changes.
