# CZK Currency Converter

React, TypeScript, and Vite foundation for the Momence take-home exercise.
The application fetches the official CNB text feed using TanStack Query, validates
it, and displays the fixing date and currency quotations in a table.
The converter supports instant CZK conversion, input validation, and quantity-aware
quotations. Light/dark themes and visual polish are planned next.

The converter starts at 1000 CZK and selects EUR when available. Enter a
non-negative amount with up to two decimal places; empty or invalid input hides
the result. Changing the amount or currency uses the loaded rates without another
request. Refresh keeps the controls usable and preserves the amount and currency
selection. If refresh fails, the previous fixing remains available with a warning
and a Retry action.

## Development

Use Node.js 24 (`nvm use`), then:

```sh
npm ci
npm run dev
```

Open the local URL to see the latest available fixing and exchange rates.
Vite proxies `/api/rates` to the fixed CNB source during development.
The production API handler will be added in a later step.

## Checks

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

`npm run preview` serves the production frontend build locally. It does not emulate Vercel Functions.

Parser, conversion, and converter interaction tests use a synthetic CNB-format
fixture and never contact the live feed. App integration tests exercise the actual
fetch-and-parse path with mocked HTTP responses, including initial failures,
refresh failures, and recalculation when a new fixing arrives.
Official quotations retain their foreign-currency quantities: for example,
`100 HUF = 6.25 CZK` is the price of 100 forints, not one forint.

Conversion uses `CZK amount × (foreign quotation quantity / CZK rate)` without
intermediate rounding. Results use each currency's standard display precision.
JavaScript numbers are suitable for this reference converter; settlement or
accounting would require a deliberate decimal arithmetic and rounding policy.
