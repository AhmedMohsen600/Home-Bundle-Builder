# Home Bundle Builder

React take-home implementation for the EcomExperts Frontend Bundle Builder task.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Useful commands

```bash
npm run build
npm run lint
npm test
```

## Notes

- The app uses a feature-based structure under `src/features/bundle-builder`.
- Product/step content is rendered from `src/features/bundle-builder/data/catalog.json`.
- Variant quantities are tracked independently, so each selected color appears as its own review-panel line.
- `Save my system for later` persists the shopper configuration to `localStorage` and restores it on return.
- Product images use public Wyze product imagery where available; the unavailable tiny Figma-only details were approximated from the shared design screenshot.
