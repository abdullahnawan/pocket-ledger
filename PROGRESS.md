# Pocket Ledger — progress

Snapshot taken 2026-11-19 by reading the repo, not from memory. Every "done"
below was verified against the working tree or `git log`.

## Where the project stands

One commit exists (`1d4cb8d docs: add README and gitignore`). Everything else in
the folder is **uncommitted work in the working tree**: the Expo scaffold and the
approved scope document.

Scope decision from `docs/designs/pocket-ledger-v1-scope.md` (status: APPROVED,
2026-10-26): **v1 ends at Phase 4**, then an Android APK goes on a real phone and
gets used for four weeks before the CSV import and data-science phases start.

## Done

| Thing | Where | State |
|---|---|---|
| Repo audit, decision to build fresh | — | done |
| `git init`, `.gitignore` (CLAUDE.md, secrets, `ml/data/raw/`, Expo/native artifacts) | `.gitignore` | committed; later additions uncommitted |
| README stub (what it is, stack, status) | `README.md` | committed |
| `/office-hours` scope review | `docs/designs/pocket-ledger-v1-scope.md` | uncommitted |
| Expo + TypeScript strict + Expo Router scaffold | `app/_layout.tsx`, `app/index.tsx`, `app.json`, `tsconfig.json` | uncommitted, **not yet run on a phone** |

Verified absent: no `src/`, no `supabase/`, no `ml/`, no test setup, no ESLint
config, no CI workflow.

## Next up (Phase 0, in order)

1. `/plan-ceo-review` on the roadmap — the `/office-hours` half is done, this half isn't.
2. Commit the scaffold, and confirm it actually boots in Expo Go before calling it done.
3. ESLint + Prettier, and `typecheck` / `test` scripts — `package.json` currently has
   only `lint: expo lint` with no ESLint config, and no `typecheck` or `test` script at all.
4. Jest (`jest-expo`) + React Native Testing Library with one passing smoke test.
5. `src/lib/money.ts` — parse/format CAD integer cents, with tests.
6. GitHub Actions: typecheck, lint, test on every push and PR.

## What's left after that

| Phase | Scope | Status |
|---|---|---|
| 1 — Supabase + auth | Project via Supabase MCP, `.env.example`, client, sign-up/sign-in, session persistence, guarded routes, error/loading states | not started |
| 2 — Data model | Migrations for `categories`, `transactions`, `budgets`, `imports`; RLS on every table; default-category trigger; advisors clean; generated TS types; TanStack Query hooks; `/cso` review | not started |
| 3 — Manual entry | Add-purchase screen (keypad, merchant, category, date, note), optimistic save, day-grouped list, edit/delete, category management | not started |
| 4 — Monthly view | Month switcher + total, spending by category (chart + ADR for the library), per-category budgets, budget vs. actual | not started |
| **v1 gate** | EAS Android APK on a real phone, quick-add timed under 10s, 28 days of real self-logged entries, one friend installed | not started |
| 5 — CSV import | Synthetic bank fixtures, generic parser + column mapper, RBC/TD then Scotiabank/CIBC/BMO presets, `dedupe_hash`, import UI, history screen | deferred past v1 |
| 6 — Merchant normalization | Python `ml/` package + pytest CI, synthetic labeled dataset, normalizer in Python and TS with a parity test | deferred past v1 |
| 7 — Categorizer | Keyword/history baseline, TF-IDF + logistic regression, ADR, JSON export, TS inference + parity test, in-app suggestions, label export, real-data re-evaluation | deferred past v1 |
| 8 — Forecast | Python backtest (baseline vs. exponential smoothing vs. day-of-week), ADR, TS port with parity test, month-end card | deferred past v1 |
| 9 — Anomaly flags | Robust z-score per category, large first-time-merchant rule, badges + explanations, dismissals | deferred past v1 |
| 10 — Insights | 3–5 plain-language sentences from trends/forecast/budgets, insights screen | deferred past v1 |
| 11 — Release | Empty/error/loading states, debt sweep, security review, icon + splash + name, APK, README with a metrics table filled only from `ml/reports/`, resume notes | deferred past v1 |

## Open items that block later work

- Second trip-group user still unnamed (needed for the v1 success criteria).
- Chart library choice (`victory-native` vs `react-native-gifted-charts`) — Phase 4 ADR.
- One month of a real bank CSV export is needed before Phase 5 can be built honestly.
- Stray empty git repo at `C:\.git` still needs deleting by hand.

No metric appears anywhere in this file, because no script in this repo has
produced one yet.
