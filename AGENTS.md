# Coding conventions

- Use ES2015+ syntax, including `const` and `let`, ES modules, template literals, and destructuring where appropriate.
- Use arrow functions for standalone functions, callbacks, and React components.
- Use named exports for functions and React components. Never default-export a function, directly or through an identifier.
- Tool configuration objects may use default exports when required by the tool.
- Keep module-level constants, static configuration, and reusable formatter instances in a `const.ts` file in their respective folder. Functions, components, styles, and values derived inside functions remain with their implementation.
- Keep query options such as `staleTime`, `gcTime`, retry policy, and refetch settings in the folder's `const.ts`; keep `queryKey` and `queryFn` at the query call site.
- Keep README files only at the project root. Do not add nested README files; use a comment near the relevant code when an explanation is needed.
- Comment only when it adds useful context, such as explaining non-obvious behavior or a decision. Avoid comments that merely restate what the code does; straightforward code does not need a comment.
