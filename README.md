# CZK Currency Converter

React, TypeScript, and Vite foundation for the Momence take-home exercise.
The application fetches the official CNB text feed using TanStack Query and logs
it to the browser console in development. The converter, feed parsing, and
light/dark themes are planned next.

## Development

Use Node.js 24 (`nvm use`), then:

```sh
npm ci
npm run dev
```

Open the local URL and the browser developer console to see
`CNB exchange rates (raw feed):` followed by the downloaded text.
Vite proxies `/api/rates` to the fixed CNB source during development.
The production API handler will be added in a later step.

## Checks

```sh
npm run typecheck
npm run lint
npm run build
```

`npm run preview` serves the production frontend build locally. It does not emulate Vercel Functions.
