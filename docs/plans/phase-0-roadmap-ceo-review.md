# Phase 0 — office-hours + CEO review (roadmap)

Date: 2026-11-23  
Repo: abdullahnawan/pocket-ledger  
Prior approved design: `docs/designs/pocket-ledger-v1-scope.md` (2026-10-26, Approach A)

This is the Phase 0 roadmap check: stress-test the plan against what we know now.
**No roadmap changes are applied here.** Abdullah decides what to keep.

## What changed since the approved design

- Auth (sign-up, sign-in, persisted session, route guards, sign-out) is already on `main`.
- Web preview is live on Vercel; phone column layout is locked in ADR-001.
- Second tester is named: Fatime.
- Demand evidence is still weak: founder is user zero; trip-savings is still the only dated pull.

## Challenges (CEO lens)

1. **Retention is still unowned.** The approved design already recorded that Phases 0–11 have no reminder, streak, or weekly nudge. That risk has not shrunk. Do not invent a notification phase now — but do not pretend Phase 4 alone proves habit.
2. **v1 still ends at Phase 4.** Approach A (daily driver before ML) remains the right bet. Do not reorder toward categorizer/forecast until Abdullah has four weeks of his own entries on a real APK.
3. **Hosted web ≠ phone proof.** Vercel proves the UI path; Expo Go / EAS APK is still the real install test for Fatime (“10+ transactions”).
4. **Scope creep via “hosted polish”.** Resist building desktop layouts, live bank links, or LLM insights. CSV-only and phone-only stay deliberate.
5. **Portfolio honesty.** No resume metrics until `ml/reports/` has measured numbers from a script in this repo.

## Recommendations (needs Abdullah’s OK before applying)

| # | Suggestion | Default if no reply |
|---|------------|---------------------|
| 1 | Keep Approach A: finish Phases 1–4, then EAS APK + four weeks of use before Phase 6+ | Keep |
| 2 | After Phase 4, add an explicit “install + 4-week self-test” gate before Phase 6 | Keep as checklist note only |
| 3 | Do not add push notifications in v1 | Keep (no change) |
| 4 | Confirm email in Supabase: leave on for production, or turn off for faster solo testing — Abdullah’s call | No change until he says |

## Decision needed from Abdullah

Reply with which rows above to apply (by number), or “keep plan as written.”
Until then, the roadmap in `CLAUDE.md` stays as-is.
