# Next steps — finishing Phase 0

Written 2026-11-19, after pushing the Expo scaffold and reviewing it.
Scope here is deliberately short: the rest of Phase 0 and the gate into Phase 1.
The full phase list lives in `../PROGRESS.md`; this file is about *how* the next
few commits get made, not what comes in month three.

Rules that apply to every step below: one roadmap item per commit, tests written
before the code they test, `typecheck` + `lint` + `test` clean before committing,
Conventional Commit message, and I stop and report after each one.

## 0. Clean up what the template left behind

One commit, no new behavior.

- Delete the `reset-project` script — it calls a file that does not exist.
- Remove the seven dependencies nothing imports: `@expo/ui`, `expo-glass-effect`,
  `expo-symbols`, `expo-image`, `expo-web-browser`, `expo-device`, `expo-font`.
- Decide on web: drop `react-dom`, `react-native-web`, the `web` script and the
  `web` block in `app.json`, unless a browser preview is wanted for quick UI work.
- **Verify:** `npx expo-doctor` clean, and `npx expo start` with the app actually
  opening in Expo Go on the phone.

Why first: it is the cheapest commit available, and it settles the open question
of whether the scaffold runs at all — which is still unverified.

`chore: drop unused template dependencies and scripts`

## 1. Quality gates: ESLint, Prettier, and the missing scripts

One commit.

- ESLint with `eslint-config-expo` plus Prettier, one config file, no custom rules
  until a real disagreement comes up.
- Add `typecheck` (`tsc --noEmit`) and `test` scripts. `lint` already exists but
  cannot pass today because no config file exists.
- **Verify:** all three scripts run and print clean output, pasted into the report.

Why second: every later commit claims these three checks passed. Right now only
typecheck is real, so the claim is partly on trust. This step ends that.

`chore: add eslint, prettier and typecheck/test scripts`

## 2. Jest and one real test

One commit.

- `jest-expo` preset + React Native Testing Library.
- One smoke test that renders the home screen and asserts the title is on screen.
  Not coverage — just proof the harness works, so step 3 can be test-first.
- **Verify:** `npm test` passes; break the assertion on purpose once to confirm it
  can actually fail.

`test: add jest-expo and react native testing library with a smoke test`

## 3. `src/lib/money.ts` — the first real logic

One commit, written test-first.

Integer cents only, CAD, no floats anywhere. The functions:

- `parseAmount(input: string): number | null` — turns what someone types into cents.
- `formatCents(cents: number): string` — turns cents into `$12.34`.

Tests to write before the code, because these are the cases that bite later:

| Input | Expected | Why |
|---|---|---|
| `"12.34"` | `1234` | the normal case |
| `"12.3"`, `"12"` | `1230`, `1200` | short decimals |
| `"12.345"` | reject, or round once and document which | silent rounding is how money goes missing |
| `"$12.34"`, `"12,34"`, `" 12.34 "` | parsed | people paste and type messily |
| `""`, `"abc"`, `"-5"` | `null` | bad input must not become `NaN` cents |
| `0`, `-1234` | `$0.00`, `-$12.34` | refunds are negative by design |

Why this is its own commit: it is the only code in Phase 0 that can be wrong in a
way a user would notice, and everything downstream — entry, budgets, charts, the
forecast — is built on it.

`feat(money): add CAD cent parsing and formatting`

## 4. CI

One commit.

- One GitHub Actions workflow: install, typecheck, lint, test, on every push and PR.
- Node version pinned to what the dev machine runs.
- The pytest job gets added later, with the `ml/` package in Phase 6. Not now.
- **Verify:** the run goes green on GitHub, and link the run in the report.

`ci: run typecheck, lint and tests on push and pull request`

## 5. README update, then the gate into Phase 1

- README currently says "the app is not scaffolded yet", which is now false, and
  "nothing to run yet", which will be false after step 0. Fix both, add the real
  run instructions.
- `/plan-ceo-review` — the `/office-hours` half of that roadmap item is done and
  approved; this half is not. It is the last unchecked Phase 0 box.
- Then `superpowers:brainstorming` on Phase 1 (Supabase + auth) before any code.

## How I want to work through these

- **Order is fixed.** 0 before 1 because it answers "does it run". 1 and 2 before
  3 because money logic should be the first thing the gates actually guard.
- **One slice per session.** I finish a step fully, verify with real command output,
  commit, then stop and tell you what to try. No running ahead into step 4 because
  step 3 went quickly.
- **Nothing gets pushed unless you say so in that session.** Steps 0-5 can all sit
  as local commits until you ask.
- **Branches:** these are small and on `main`. Phase 1 onward gets a branch per
  phase (`phase-1-auth`) merged by PR, as the project rules say.
- **If a step turns out bigger than one commit,** I say so and split it rather than
  quietly making one large commit.
- **Blocked on you, not on code:** whether to keep web support (step 0), and
  naming the second trip-group user, which is one of the v1 success criteria.
