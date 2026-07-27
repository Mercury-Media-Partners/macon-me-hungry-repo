# SEO Growth Roadmap: Spanish-Language Search Gap & Beyond

**Status**: Living roadmap, not a single-shot PRD — update phases as they land rather than archiving this when "done." Builds on `docs/business/seo-serp-analysis-bares-gay-atlanta.md` (the research) and what's already shipped from it.

## 1. Where We Are

* **Research done**: SERP analysis for "bares gay en atlanta" identified that zero of the top-10 results are actual Spanish-language pages, despite the query being in Spanish — the clearest exploitable gap OutATL has, given it already has real `/es/` infrastructure.
* **Already shipped** (July 17-18, verified working via a clean build):
  * `Layout.astro` now emits correct `hreflang="en"`/`"es"`/`"x-default"` + canonical tags, and fixed a real pre-existing bug where `<html lang="en">` was hardcoded even on `/es/` pages.
  * `/es/` homepage title/description rewritten to target "Bares Gay en Atlanta" directly instead of a generic "Inicio" title.
  * A real Spanish blog post, `bares-gay-en-atlanta.md`, targeting the exact phrase with real venue content (Blake's, The Heretic, Mary's, Bulldogs, Woof's) — confirmed in the sitemap.
* **Context shift**: the World Cup has now concluded (per the July 22 devlog — standard pricing is live, the post-World-Cup transition system is active). Content strategy from here should assume evergreen local search intent, not tournament urgency.
* **Separate, non-blocking track**: the Netlify → Cloudflare Pages migration (`docs/engineering/cloudflare-pages-migration-prd.md`) is being handled on its own with Gemini — doesn't block anything below.

## 2. Goal

Turn the current one-time content gap into sustained organic ranking and traffic for Spanish-language Atlanta LGBTQ+ nightlife search — not just the one blog post that's already live.

---

## 3. Phased Plan (things I can do)

### Phase 1 — Reinforce what's already shipped
* Add an `FAQPage` schema block to the Spanish blog post itself (a short "¿Cuáles son los mejores bares gay en Atlanta?" Q&A) — increases odds of both a rich snippet and AI Overview inclusion for this specific page.
* Add an actual internal link to the new blog post from the `/es/` homepage or footer — right now nothing links to it except the blog index itself, which slows how much link equity and crawl priority it gets.
* Audit hreflang/canonical output across every page type, not just the homepage (business detail pages, `/faq`, `/matches`, `/outdoors-culture`) — only the homepage has been spot-checked so far.
* Confirm `robots.txt` isn't blocking anything relevant and the sitemap stays clean as new content is added.

### Phase 2 — Expand Spanish content (I can draft, you review before publishing)
* 3-5 more Spanish posts/pages targeting adjacent long-tail queries — e.g. "vida nocturna gay atlanta," "discotecas gay atlanta," "mejores bares gay midtown atlanta." I can draft these grounded in real listing data, same as the first post — no invented business facts, per the project's own data-integrity rule.
* Review existing `/es/` copy for stale World-Cup framing now that the tournament's over — confirm the automated transition system actually caught everything rather than assuming it did.

### Phase 3 — Technical/structural SEO audit
* Schema markup audit across page types beyond business/FAQ — attractions, blog, jobs pages, checking for missed `Article`/`JobPosting`/similar structured data opportunities.
* Pass over image `alt` text sitewide for quality, not just presence — compounds with image search, not just accessibility.

---

## 4. What I Cannot Do — Needs You

* **Google Search Console.** This is the single biggest gap right now: verify domain ownership, manually submit the sitemap, monitor actual indexing/coverage status, check for manual actions. Everything above is optimization done blind without this — I have no credentialed access to set it up or check it.
* **Distribution into real community spaces.** The SERP research showed a Reddit thread and a Facebook group post both outranking individual venues — authentic community placement carries real weight for this exact query. Sharing the new Spanish content into relevant Atlanta or Spanish-speaking LGBTQ+ community spaces (subreddits, Facebook groups, Nextdoor, WhatsApp groups) needs a real person with real standing in those communities. Anything I did here would be inauthentic and likely violate those platforms' rules anyway.
* **Backlink outreach.** Atlanta Pride Committee and Lost-n-Found Youth are already linked from the footer — asking either for a reciprocal link or a mention, or pursuing local press/blog coverage, needs a real person making a real ask.
* **Google Business Profile**, if OutATL has or should have its own listing (separate from the individual venues in the directory) — claiming/optimizing it is a manual, credentialed action.
* **Ongoing SERP rank tracking.** The tool behind your screenshot is presumably a paid subscription — periodically re-pulling that data to see whether rank actually moves is on you. I can analyze whatever you bring back, same as the first one.
* **Sign-off on the FAQ's trust/consent answer.** Still an open item from the FAQ overhaul PRD — the "why is my business already listed" answer describes exactly how listings get sourced, and needs your confirmation since it's a public statement about your own process, not just copy I can freely adjust.
* **Netlify/Cloudflare dashboard actions, DNS, env vars** — you're already on this with Gemini; noted here only so it's clear that track and this one don't block each other.

---

## 5. Suggested Order

1. Phase 1 now, if you want me to start — low risk, reinforces what's already live.
2. Get Search Console access sorted in parallel, ideally first — without it, nothing below has a real feedback loop to confirm it's working.
3. Phase 2 content once Phase 1 ships.
4. Phase 4 distribution/backlink pushes alongside Phase 2 — new content needs somewhere to get shared, not just to sit on the site.
