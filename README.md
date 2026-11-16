# English OS — Personal 90-Day English Learning System

A calm, local-first web app that guides one learner through 90 days of Reading, Writing and Speaking practice,
**16/11/2026 (Day 1) → 13/02/2027 (Day 90)**, timezone Asia/Ho_Chi_Minh.

## Run

Requires Node.js 20.9+ (22 recommended).

```bash
npm install
npm run dev        # http://localhost:3000
```

Production: `npm run build && npm run start`

Checks: `npm run typecheck` · `npm run lint` · `npm test`

## How it works

- **First run** → welcome → preferences → baseline assessment → estimated CEFR level → Day 1.
- **Today** always opens the right lesson: Review → Learn → Read → Write → Speak → Reflect → Complete.
- **Missed days** are never piled up: resume one lesson at a time, move the plan forward, or jump to today
  (skipped lessons stay open; their vocabulary joins the review queue).
- **Adaptive**: rolling skill scores (0–100) adjust word targets, speaking time and scaffolding
  (<60 support · 60–79 on target · 80+ stretch). The same weakness in 3+ sessions creates a targeted practice module.
- **Checkpoints** on Day 30, 60 and 90; the final assessment mirrors the baseline for a Day 1 ↔ Day 90 report.

## Structure

| Path | Purpose |
| --- | --- |
| `src/lib/domain` | Types and deterministic date logic |
| `src/lib/curriculum` | 90-day content (`content/phase1-4.ts`), builder, assessments, practice prompts |
| `src/lib/engine` | Scoring, adaptation, SRS, plan/recovery, writing analysis, reports |
| `src/lib/storage` | Zod-validated persistence, repository interfaces, export/import |
| `src/lib/ai` | Optional AI provider abstraction (server-side) |
| `src/store` | Client store (localStorage + IndexedDB audio) |
| `src/components`, `src/app` | UI and routes |

## Data & privacy

Everything stays in your browser: progress in `localStorage` (`elos:state:v1`), recordings in IndexedDB (`elos-audio`).
No account, no server database. Use **Settings → Export data** for backups. Data is tied to the browser and the
address (e.g. `localhost:3000`) — keep using the same one, or export/import.

## Optional AI feedback

Copy `.env.example` to `.env.local` and set `ANTHROPIC_API_KEY`. Feedback buttons then appear in Writing, Speaking and
Weekly review. Without a key the app falls back to rubrics and self-review. To add another provider, implement
`AiProvider` in `src/lib/ai/server.ts`.

## Adding content

Lessons are authored as compact seeds in `src/lib/curriculum/content/`. Review days (every 7th day) and checkpoints are
generated from the surrounding lessons. `npm test` verifies that all 90 days have real content.

## Deploy (GitHub Pages → myecourse.kenvinzone.com)

Every push to `main` runs `.github/workflows/deploy.yml`: tests, a static build (`STATIC_EXPORT=1`, output in `out/`)
and a GitHub Pages deployment. One-time setup: repo **Settings → Pages → Source: GitHub Actions**, custom domain
`myecourse.kenvinzone.com`, and a DNS record `CNAME myecourse → kenvinzone-stockai.github.io`.
The static site has no server, so optional AI feedback is off there; everything else works the same.
