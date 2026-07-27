# PRD: Migrate Hosting from Netlify to Cloudflare Pages

**Status**: Proposed — not yet implemented. Move to `docs/archive/completed-prds.md` (compressed to one bullet) once shipped, per `docs/agents.md`.

**Do not start before July 20, 2026.** The Founder-rate deadline and World Cup Final both land July 19 — the highest-traffic weekend the site has had. A hosting migration during that window is unnecessary risk for zero user-facing upside.

## 1. Objective & Scope

Now that the domain is owned/managed directly, evaluate and execute consolidating hosting onto Cloudflare Pages and off Netlify, reducing vendor footprint to one (assuming DNS also lives on Cloudflare).

**Important framing**: owning the domain does not by itself require a hosting migration — Cloudflare DNS can point at Netlify hosting with zero conflict. This PRD is only worth executing if the actual goal is full vendor consolidation (one dashboard, one bill, one set of docs), not just DNS control.

---

## 2. Current State Audit

* **The site is fully static.** `astro.config.mjs` has no `adapter` configured and no `output: 'server'`/`'hybrid'` — it's Astro's default static build. This matters: Cloudflare Pages can serve the static `dist/` output directly, no Astro adapter needed for this migration.
* **`@astrojs/cloudflare` is a dead dependency.** It's in `package.json` but unused in the config — leftover from a June 14, 2026 attempt (per `docs/devlog.md`) that was abandoned the next day when the team connected the domain to Netlify instead. Should be removed regardless of what this PRD decides.
* **No `netlify.toml` exists in the repo.** Whatever build settings, redirects, or headers are configured live only in Netlify's dashboard, invisible to the codebase. Before migrating, someone needs to actually open the Netlify dashboard and document what's configured there so nothing silently gets lost.
* **One real Netlify-proprietary dependency: Netlify Forms.** `src/pages/list-your-business.astro` and its `/es` counterpart both render a hidden static `<form name="partner-inquiry" data-netlify="true" netlify-honeypot="bot-field">` — this exists purely so Netlify's build-time HTML scanner detects the form and provisions a backend for it. The actual interactive form (`PartnerForm.tsx`) submits via:
  ```js
  fetch("/", { method: "POST", headers: {...}, body: new URLSearchParams({ "form-name": "partner-inquiry", ...formData }) })
  ```
  This only works because Netlify's edge specifically intercepts POSTs to `/` matching a known form name. On Cloudflare Pages, this fetch would just hit the static homepage and silently do nothing — **this is the one hard blocker for this migration**, not a config tweak.
* **Environment variables currently set in Netlify** (per this week's work): `PUBLIC_UMAMI_WEBSITE_ID`. Whatever else may be configured in Netlify's dashboard needs to be inventoried before cutover (see Task 1 below).
* **Astro's `image()` pipeline is newly in use** (the `attractions` collection migration, July 17). Build-time image processing behavior should be spot-checked on Cloudflare Pages' build environment before cutover — different platforms occasionally differ in available system libraries (e.g. `sharp` native bindings) even though this is usually a non-issue on Cloudflare Pages' Node-based build image.

---

## 3. Goals

1. Fully static site builds and serves correctly from Cloudflare Pages.
2. The business inquiry form (`PartnerForm.tsx`) keeps working with zero data loss — every submission reaches a human, the same as it does today.
3. No downtime during cutover.
4. Netlify-specific dead code (`@astrojs/cloudflare` dependency, hidden Netlify Forms markup) removed once migration is verified.

### Non-goals
- No SSR/hybrid rendering — the site stays static; this PRD does not introduce or require Astro's Cloudflare *adapter* (only needed for SSR).
- Not migrating the domain registrar or re-architecting DNS beyond what's needed to point at the new host.
- Not redesigning `PartnerForm.tsx`'s UI/fields — only its submission backend.

---

## 4. Proposed Solution

### 4.1 Replace Netlify Forms with a Cloudflare Pages Function
Cloudflare Pages supports serverless Functions colocated in the same project (`/functions` directory, file-based routing). Add `functions/api/partner-inquiry.ts` that:
1. Accepts the POST body (switch `PartnerForm.tsx` from `URLSearchParams`/`fetch("/")` to a JSON `fetch("/api/partner-inquiry")` call — cleaner than replicating Netlify's form-name convention).
2. Validates required fields server-side (business name, contact name, email, tier — currently only client-validated via `required` attributes, which is not a real safeguard).
3. Forwards the submission via a transactional email API (e.g. Resend — simple API, generous free tier, no infra to run) to `howdy@outatl.com`.
4. Keeps the existing honeypot field (`bot-field`) as a server-side check — reject silently (200 response, no email sent) if populated, same anti-spam behavior as today.

This is the "own it" option rather than swapping one third-party form vendor (Netlify Forms) for another (Formspree/Getform) — consolidation was the whole point of this migration.

### 4.2 Cloudflare Pages project setup
* Connect the same git repo, build command `npm run build`, output directory `dist`.
* Replicate every environment variable currently in Netlify's dashboard (inventory these first — see Task 1) into Cloudflare Pages' project settings, plus whatever new secret the email API needs (e.g. `RESEND_API_KEY`).

### 4.3 Parallel run, not a hard cutover
Deploy to Cloudflare Pages on its default `*.pages.dev` preview URL while Netlify keeps serving `outatl.com`. Verify everything end-to-end on the preview URL (see Verification Plan) before touching DNS. Only repoint DNS once the preview deploy has been fully validated — keep the Netlify site live and untouched as a fallback until the new setup has run cleanly for at least a few days.

### 4.4 Cleanup (after cutover is confirmed stable)
* Remove the hidden Netlify Forms markup from `list-your-business.astro` and its `/es` counterpart.
* Remove `@astrojs/cloudflare` from `package.json` (still unused — Pages doesn't need it for a static site).
* Decommission the Netlify site.

---

## 5. Implementation Tasks

1. **Inventory Netlify's dashboard config** — environment variables, any redirects/headers set outside the repo, custom domain/SSL settings, and (important) **export any historical form submissions** stored in Netlify's Forms UI — they will not carry over automatically and won't exist anywhere else once the Netlify site is decommissioned.
2. **Pick and provision the email/notification service** for the new form backend (Resend recommended; needs an account + API key + verified sending domain for `outatl.com`).
3. **Build `functions/api/partner-inquiry.ts`** per §4.1.
4. **Update `PartnerForm.tsx`** to POST JSON to the new endpoint instead of the Netlify form-encoded pattern; remove the Netlify-specific `bot-field` naming convention if no longer needed (keep the honeypot mechanism itself).
5. **Create the Cloudflare Pages project**, connect the repo, set build settings and environment variables.
6. **Deploy to the `*.pages.dev` preview URL** and run the full verification plan below.
7. **Cut over DNS** once verified — lower TTLs a day in advance if possible to minimize propagation delay.
8. **Monitor for 3-5 days** with both sites still provisioned before decommissioning Netlify and doing the cleanup pass in §4.4.

---

## 6. Open Questions (need your input before starting)

1. **Email provider preference** — Resend is the default recommendation here (simplest integration), but if there's already an existing transactional email account/vendor in use elsewhere, use that instead to avoid a third new vendor.
2. **Is DNS actually moving to Cloudflare, or staying wherever it is now?** If DNS isn't going to Cloudflare too, confirm this migration still delivers the consolidation benefit you're after — otherwise you'd be trading one hosting vendor for another with no net vendor reduction.
3. **Any known custom redirects/headers in the Netlify dashboard** worth flagging now, before the inventory step turns them up?

---

## 7. Verification Plan

* `npm run build` locally — confirm it still produces a clean static `dist/` (should be unaffected by this migration, since output type doesn't change).
* Deploy to Cloudflare Pages preview URL; confirm all routes render, including `/es/` i18n routes, `/faq`, `/outdoors-culture` (image pipeline), and `/matches`.
* Submit a real test inquiry through `PartnerForm.tsx` on the preview URL end-to-end — confirm an email actually arrives at `howdy@outatl.com`, confirm the honeypot rejection path still works (fill the hidden field via devtools and confirm no email sends).
* Confirm `PUBLIC_UMAMI_WEBSITE_ID` is set on the Cloudflare Pages project and the Umami script renders in the preview deploy's page source.
* Confirm `sitemap-index.xml` still generates correctly.
* Only after all of the above pass: cut over DNS, then re-verify the same checklist against the live domain.
