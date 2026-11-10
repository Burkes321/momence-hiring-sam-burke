# CZK Currency Converter

React, TypeScript, and Vite foundation for the Momence take-home exercise.
The application fetches the official CNB text feed using TanStack Query, validates
it, and displays the fixing date and currency quotations in a table.
The converter supports instant CZK conversion, input validation, and quantity-aware
quotations. Light/dark themes and visual polish are planned next.

## Development

Use Node.js 24 (`nvm use`), then:

```sh
npm ci
npm run dev
```

Open the local URL to see the latest available fixing and exchange rates.
Vite proxies `/api/rates` to the fixed CNB source during development.
Production uses the Vercel function in `api/rates.ts` to retrieve that same feed.
It accepts GET requests, limits upstream requests to eight seconds, and caches
successful responses at the edge for five minutes. Failures are never cached.
Parsing and conversion run in the browser. A manual refresh can receive a cached
response, including malformed upstream data, until that five-minute cache expires.

For deployment by the project owner, import the repository into Vercel using the
Vite preset, Node.js 24, build command `npm run build`, and output directory `dist`.
No environment variables or routing rewrites are required. After deployment,
verify `/api/rates` returns CNB text and that the application displays its fixing date.

## Checks

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

`npm run preview` serves the production frontend build locally. It does not emulate Vercel Functions.

Parser, conversion, and converter interaction tests use a synthetic CNB-format
fixture and never contact the live feed.
Official quotations retain their foreign-currency quantities: for example,
`100 HUF = 6.25 CZK` is the price of 100 forints, not one forint.

Conversion uses `CZK amount × (foreign quotation quantity / CZK rate)` without
intermediate rounding. Results use each currency's standard display precision.
JavaScript numbers are suitable for this reference converter; settlement or
accounting would require a deliberate decimal arithmetic and rounding policy.
