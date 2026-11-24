# Pocket Ledger

A mobile budget app for Canadian students and young adults.

Log a purchase in under 10 seconds, see where this month’s money went, and
import a CSV exported from your bank. There is **no live bank connection** —
CSV import only, on purpose.

A data science layer sits on top (merchant cleanup, category suggestions,
month-end forecast, unusual-spend flags). Training happens in Python; inference
runs on the phone in TypeScript.

## Stack

- **App:** Expo (React Native) + TypeScript strict, Expo Router
- **Backend:** Supabase (Postgres, Auth, Row Level Security)
- **Local data:** TanStack Query (coming with the data-model phase)
- **CSV:** papaparse + Expo document picker (later phase)
- **Data science:** Python, pandas, scikit-learn — trained offline, exported to the app
- **Tests:** Jest + React Native Testing Library; pytest for `ml/` later
- **CI:** GitHub Actions (typecheck, lint, Jest)
- **Hosting:** Vercel web preview (phone-width column); Android APK via EAS later

## Status

Phase 0 setup is complete. Phase 1 auth (sign-up / sign-in / session / sign-out)
is on `main`. Purchase entry and budgets come next.

## Run locally

```bash
npm install
cp .env.example .env.local
# Put your Supabase project URL and publishable key in .env.local
npm start
```

Then:

- Press `w` for the web preview (phone-width column), or
- Scan the QR code with **Expo Go** on a physical phone (same Wi‑Fi as the
  computer). First load can take a couple of minutes while the bundle downloads.

Useful scripts:

```bash
npm run typecheck
npm run lint
npm test
npm run web
```

## License

Not yet licensed.
