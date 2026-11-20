# ADR-001: Phone layout, with web kept as a preview

## Status
Accepted

## Date
2026-11-19

## Context
Pocket Ledger is a mobile budget app. Expo's template also ships a web build (`react-dom`, `react-native-web`, `npm run web`, and the `web` block in `app.json`). The Phase 0 cleanup had an open choice: drop that web build, or keep it for quick UI checks.

Abdullah decided to keep the web preview, and that the product itself is a phone app. A wide browser window must show the same portrait phone UI, not a separate desktop layout.

## Decision
Keep the web preview. Every screen is a portrait phone layout, including in the browser.

- `app.json` stays `orientation: "portrait"`.
- The root layout caps the app column at 430px (a large phone) and centers it. On a phone that cap does nothing, because the screen is already narrower.
- Outside that column, on web only, the page background is a neutral gray so the preview reads as a phone.
- Controls added later are sized for touch (at least 44px) and work without hover.
- Expo Go on a phone remains the check that the app actually runs. The browser is for looking at layout between those checks.
- `app.json` uses `web.output: "single"`. That serves one client-rendered page. `server` renders each request on the server, and in dev that path crashes with `Requiring unknown module` before the page is drawn.

## Alternatives Considered

### Drop web
- Pros: Fewer dependencies, one runtime to think about.
- Cons: Every layout check needs a phone or an emulator.
- Rejected: Abdullah wants the browser preview for quick UI work.

### A responsive desktop layout on web
- Pros: The page would use a wide monitor.
- Cons: Two layouts to design and test, and the product is used on a phone.
- Rejected: One phone layout is the product.

## Consequences
- Phase 0 cleanup keeps `react-dom`, `react-native-web`, the `web` script, and the `web` block in `app.json`.
- New screens go inside the existing shell in `app/_layout.tsx`. They do not add a desktop breakpoint.
- The second person who will install and test v1 is Fatime, from the trip group. That is a product fact, recorded in the v1 scope, not part of this layout decision.
