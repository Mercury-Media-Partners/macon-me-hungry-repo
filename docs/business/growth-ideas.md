# Growth Ideas: B2B Sign-Up & B2C Sharing

Brainstormed July 11, 2026. Unactioned idea backlog — nothing here is scoped, committed, or scheduled. Promote an idea out of this file (and note it in `docs/devlog.md`) once it's actually being built.

---

## Make sign-up more appetizing for business owners

1. **"Founding Member" permanent badge, not just a Founder *rate*.** The Founder pricing deadline (July 19) is currently just a discount. Make it a status symbol too — anyone who signs up before the Cup ends keeps a permanent "Founding Local" mark on their listing forever, even after they move to standard pricing later. Cheap to build (one boolean field); trades on "was here first" being something nobody can buy into after the window closes.

2. **Show them the traffic before they pay.** The B2B pitch is currently hypothetical ("tourists will search for you"). Surface real anonymized numbers in the onboarding pitch instead — e.g. "Midtown queer bars got 1,200 searches last week; your free listing captured 40 of them." Reuse the same data pipeline that powers the consumer-facing Impact Dashboard.

3. **Turn owners into the sales force.** A referral loop where a paying business that refers another paying business gets a free month or a "Community Partner" badge. `finca_sales_guide.md` shows the sales motion is already relationship-driven (get their story, keep it casual) — a referral perk fits that culture better than a discount-code blast.

4. **Auto-generated shareable "I'm on OutATL" graphic.** The moment a business signs up, generate an Instagram-story-sized image with their tagline/photo/badge, ready to post. Free marketing for OutATL, zero extra effort for the owner, and it plugs directly into the "get their story" onboarding step already in the sales script.

5. **Community-vouched trust badge, separate from paid tiers.** A badge earned by other verified businesses/users vouching for a listing (not bought). Gives owners a non-monetary reason to want in — belonging to a trusted network — matching `soul.md`'s stewardship framing better than pure upsell pressure, and gives Free-tier owners something to work toward besides "pay us."

## Make it more appetizing for users to use and share

1. **A shareable "passport."** Users check off venues visited across categories/neighborhoods; hitting milestones unlocks a shareable badge/graphic ("ATL Local," "World Cup Explorer"). People share achievements, not directory listings — this is the highest-leverage share mechanic on this list.

2. **Itinerary builder with a shareable link.** Let a user string together 2–3 filtered picks ("Friday Midtown night: dinner → trivia → late bar") into one shareable link/card. Going out is inherently a group-planning activity — this is the most natural place a link gets forwarded into a group chat.

3. **Revive the parked Watch Party finder.** `parked/WatchParties.astro` is already built and disabled, "pending re-activation." A World Cup watch-party finder is inherently social ("where are you watching the match?") — lowest-effort idea on this list since it's already half-built.

4. **Invite-based unlocks tied to a real partner perk.** "Bring 3 friends, unlock a drink special at a Headliner venue" — ties user referral directly to paying-business value, strengthening both sides of the marketplace instead of being a standalone gimmick.

5. **Lightweight "vibe check" reactions instead of full reviews.** The directory is currently 100% owner-curated — no user voice at all. A low-friction tap ("Confirmed: still queer-friendly," "Patio's open tonight") with an optional photo gives users a reason to return and a reason to share, without building a full review system.
