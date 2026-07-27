# Docs Index

This folder mixes living operating docs, historical snapshots, and business/sales collateral. Use this index to know which is which before trusting a claim in any of them.

## Living — authoritative, update as things change

| Doc | Purpose |
| :--- | :--- |
| [`agents.md`](agents.md) | Engineering rules, tech stack, content schema/tier rules, data-integrity and devlog-logging requirements. Start here for any code change. |
| [`devlog.md`](devlog.md) | Chronological changelog of every migration, feature, and fix. Source of truth for "what actually shipped." |
| [`soul.md`](soul.md) | Brand mission, voice, and creed. Check before copy/tone decisions. |

## Historical — point-in-time, do not treat as current state

| Doc | Why it's here |
| :--- | :--- |
| [`archive/project_audit.md`](archive/project_audit.md) | Launch-day audit (June 11, 2026). Most graded issues have since shipped — banner at top points to `devlog.md`. |
| [`archive/completed-prds.md`](archive/completed-prds.md) | One-line-each summary of 4 shipped PRDs (howdy email, performance, accessibility, FAQ overhaul), compressed from full documents — full write-ups are in git history if needed. |

## Business & sales collateral — not engineering rules

| Doc | Purpose |
| :--- | :--- |
| [`contracts/promoter_agreement.md`](contracts/promoter_agreement.md) | Signed Promoter tier services agreement template. Treat pricing here as ground truth. |
| [`contracts/headliner_agreement.md`](contracts/headliner_agreement.md) | Signed Headliner tier services agreement template. Treat pricing here as ground truth. |

## Folder layout

```
docs/
├── agents.md, devlog.md, soul.md   — core living docs, root level
├── contracts/                      — signed agreement templates (pricing source of truth)
└── archive/                        — superseded, point-in-time documents + compressed completed PRDs
```

Raw/unsorted assets (e.g. photo dumps) do not belong in `docs/` — see `/assets-inbox/` at the repo root instead.
