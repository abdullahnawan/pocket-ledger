# Pocket Ledger

A mobile budget app for tracking monthly spending.

Log a purchase in a few seconds, see where this month's money went, and import a
CSV exported from your bank instead of typing everything in by hand. There is no
live bank connection — you stay in control of what data goes in.

On top of the app sits a data science layer: cleaning up messy bank descriptions,
suggesting a category for each purchase, projecting month-end spending, and
flagging unusual transactions.

## Stack

- **App:** Expo (React Native) + TypeScript, Expo Router
- **Backend:** Supabase (Postgres, Auth, Row Level Security)
- **Data science:** Python, pandas, scikit-learn — trained offline, exported to run on the phone
- **Tests:** Jest + React Native Testing Library, pytest

## Status

Early development. The app is not scaffolded yet — this repo is being built in
small steps, starting with project setup.

## Running it

Nothing to run yet. Setup instructions will land here with the first working build.

## License

Not yet licensed.
