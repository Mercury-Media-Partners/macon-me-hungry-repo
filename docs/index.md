# Docs Index

This folder mixes living operating docs, historical snapshots, and business/sales collateral. Use this index to know which is which before trusting a claim in any of them.

## Living — authoritative, update as things change

| Doc | Purpose |
| :--- | :--- |
| [`agents.md`](agents.md) | Engineering rules, tech stack, content schema/tier rules, data-integrity and devlog-logging requirements. Start here for any code change. |
| [`devlog.md`](devlog.md) | Chronological changelog of every migration, feature, and fix. Source of truth for "what actually shipped." |
| [`soul.md`](soul.md) | Brand mission, voice, and creed. Check before copy/tone decisions. |
| [`business/value_ladder_evolution.md`](business/value_ladder_evolution.md) | Append-only log of pricing/tier strategy iterations. **The latest iteration + `contracts/` are the source of truth for current pricing** — cross-check before quoting a price anywhere else. |
| [`business/seo-growth-roadmap.md`](business/seo-growth-roadmap.md) | Phased SEO growth plan (Spanish-language search gap). Update phases in place as they ship — don't archive this like a normal PRD. Includes an explicit list of items that need you, not an agent. |

## Active — proposed, not yet shipped

| Doc | Status |
| :--- | :--- |
| [`engineering/cloudflare-pages-migration-prd.md`](engineering/cloudflare-pages-migration-prd.md) | Proposed. **Do not start before July 20, 2026** (World Cup Final / Founder-rate deadline weekend). Compress to one bullet in `archive/completed-prds.md` and delete this file once shipped. |

## Historical — point-in-time, do not treat as current state

| Doc | Why it's here |
| :--- | :--- |
| [`archive/project_audit.md`](archive/project_audit.md) | Launch-day audit (June 11, 2026). Most graded issues have since shipped — banner at top points to `devlog.md`. |
| [`archive/completed-prds.md`](archive/completed-prds.md) | One-line-each summary of 4 shipped PRDs (howdy email, performance, accessibility, FAQ overhaul), compressed from full documents — full write-ups are in git history if needed. |
| [`business/business_plan.md`](business/business_plan.md) | Original (June 11, 2026) vision + pricing proposal. Vision/pitch playbook still current; pricing figures are superseded — see banner at top. |
| [`business/pricing_prd.md`](business/pricing_prd.md) | Founder/Standard rate PRD. Monthly rates accurate; annual rates were superseded before shipping — see banner at top. |

## Business & sales collateral — not engineering rules

| Doc | Purpose |
| :--- | :--- |
| [`business/finca_sales_guide.md`](business/finca_sales_guide.md) | One-off sales script for upselling a specific business (FiNCA to FiLTER). |
| [`business/growth-ideas.md`](business/growth-ideas.md) | Unactioned brainstorm backlog for B2B sign-up and B2C sharing growth ideas. Nothing here is scheduled. |
| [`business/seo-serp-analysis-bares-gay-atlanta.md`](business/seo-serp-analysis-bares-gay-atlanta.md) | SERP research/competitive analysis for the "bares gay en atlanta" keyword, captured July 17, 2026. Analysis only, no action items scheduled. |
| [`contracts/promoter_agreement.md`](contracts/promoter_agreement.md) | Signed Promoter tier services agreement template. Treat pricing here as ground truth. |
| [`contracts/headliner_agreement.md`](contracts/headliner_agreement.md) | Signed Headliner tier services agreement template. Treat pricing here as ground truth. |
| [`reference/fan-fest-lineup.md`](reference/fan-fest-lineup.md) | FIFA Fan Festival 2026 Atlanta artist lineup — reference data for content/copy, not a product doc. |

## Folder layout

```
docs/
├── agents.md, devlog.md, soul.md   — core living docs, root level
├── business/                       — pricing strategy, business plan, sales guides, growth ideas
├── contracts/                      — signed agreement templates (pricing source of truth)
├── reference/                      — non-product reference data
└── archive/                        — superseded, point-in-time documents + compressed completed PRDs

(engineering/ reappears temporarily whenever a new PRD is proposed but not yet shipped — see docs/agents.md)
```

Raw/unsorted assets (e.g. photo dumps) do not belong in `docs/` — see `/assets-inbox/` at the repo root instead.
