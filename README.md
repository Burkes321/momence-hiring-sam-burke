# CZK Currency Converter

Momence take-home exercise: a React app that retrieves the latest available Czech
National Bank exchange rates, displays the official quotations, and converts CZK
into a selected foreign currency as you type.

[Live demo](https://momence-hiring-sam-burke.vercel.app/) ·
[GitHub repository](https://github.com/Burkes321/momence-hiring-sam-burke)

## Task requirements

| Requirement | Implementation |
| --- | --- |
| Retrieve the latest CNB rates on startup | TanStack Query requests `/api/rates`, which forwards the exact assigned CNB feed. |
| Parse and clearly display the downloaded data | A strict parser validates the feed; a table shows country, currency, code, quotation quantity, rate, and fixing date. |
| Convert CZK into a selected currency | A labelled amount input and currency select update the result immediately, with validation and currency-specific display precision. |
| Commit throughout development and upload to GitHub | The public repository contains incremental feature and test commits. |
| Deploy online | The live demo is hosted on Vercel. |
| Include appropriate automated tests | Vitest covers parsing, conversion, form interactions, request states, themes, typography, and the production endpoint. |
| Use the required stack | React with Hooks, TypeScript, Styled Components, and TanStack Query (React Query), built with Vite. No Next.js. |

The UI includes light and dark themes, initially matching the system preference,
and a rates table that scrolls horizontally on narrow screens. Controls have
labels and visible keyboard focus; conversion results and request states use
accessible status feedback. Failed refreshes retain previously loaded rates and
the user's inputs, with a warning and retry action.

## Development

Use Node.js 24 and npm:

```sh
nvm use
npm ci
npm run dev
```

Open the URL printed by Vite. No environment variables are required.

## Data and caching decisions

The assigned [CNB daily text feed](https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt)
is the source of truth, using the [documented CNB format](https://www.cnb.cz/en/faq/Format-of-the-foreign-exchange-market-rates/).
A same-origin proxy avoids dependence on cross-origin browser access and gives
the app control over upstream timeouts and shared caching.

Shared caching reduces repeated requests to CNB across visitors. TanStack Query
handles client caching and request states, keeping that logic out of the UI.
Conversions run locally so editing an amount feels immediate and creates no
additional network traffic.

The app favours caching and an explicit refresh action over continuous polling
to limit unnecessary traffic. The trade-off is that a refresh may return a cached
fixing. Showing the feed's fixing date makes the age of the rates visible, and
retaining previously loaded rates after a failed refresh keeps the converter
usable while clearly warning the user.

## Conversion and trade-offs

CNB quotations give the CZK price for the stated quantity of foreign currency.
For example, the synthetic test quotation `100 HUF = 6.25 CZK` describes 100
forints, so `1000 CZK` converts to `16,000 HUF`.

```text
foreign amount = CZK amount × (foreign quotation quantity / CZK rate)
```

Calculation does not round intermediate results. Display formatting follows each
currency's standard precision. Input must be a finite, non-negative amount with
up to two decimal places; invalid input removes the conversion result.

- JavaScript numbers suit this reference converter. Settlement or accounting would require a deliberate decimal arithmetic and rounding policy. Reference rates exclude provider fees and spreads.
- The strict parser rejects malformed tables rather than presenting partial or ambiguous rates.
- A small custom Styled Components design system keeps this single page consistent. For a larger application with multiple contributors, I would start from an established UI library to reduce the maintenance burden.
- A native table and select fit the small data set. There is no routing, historical data, polling, or persistence; the theme choice lasts until the page reloads.

## Checks

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

`npm run preview` serves the production frontend build locally. It does not emulate Vercel Functions.

The suite uses a synthetic CNB-format fixture and mocked requests, without
contacting the live feed. It covers malformed data, quotation quantities (including
HUF, JPY, and IDR), input validation, rounding, initial request failures, refresh
recovery, retained inputs, theme switching, and endpoint caching and error handling.
Component and app tests use React Testing Library with jsdom; endpoint tests run
in Node. These tests do not replace a manual browser review of layout and usability.

## Hosting

The app is deployed on Vercel using the Vite preset, Node.js 24, build command
`npm run build`, and output directory `dist`. The root `api/rates.ts` file provides
the production endpoint. No environment variables or routing rewrites are needed.

## AI assistance

AI tooling assisted with planning, scaffolding, implementation, tests, documentation,
and review. Automated checks cover the behaviour described above; they do not
establish that every browser or visual state has been manually verified.
