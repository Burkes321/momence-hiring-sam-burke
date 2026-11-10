# Coding conventions

- Use ES2015+ syntax, including `const` and `let`, ES modules, template literals, and destructuring where appropriate.
- Use arrow functions for standalone functions, callbacks, and React components.
- Do not use nested ternaries. If ternaries would be nested, extract each ternary into a separate variable named in `UPPER_SNAKE_CASE`.
- Use named exports for functions and React components. Never default-export a function, directly or through an identifier.
- Tool configuration objects may use default exports when required by the tool.
- Keep shared type definitions in `src/types`. Keep parsing, conversion, and formatting utilities in `src/utils`, with their unit tests alongside them.
- Keep module-level constants, static configuration, and reusable formatter instances in a `const.ts` file in their respective folder. Functions, components, styles, and values derived inside functions remain with their implementation.
- Keep query options such as `staleTime`, `gcTime`, retry policy, and refetch settings in the folder's `const.ts`; keep `queryKey` and `queryFn` at the query call site.
- Keep README files only at the project root. Do not add nested README files; use a comment near the relevant code when an explanation is needed.
- Do not update the README for every feature. Update it only when requested or when essential setup or usage instructions would otherwise become incorrect.
- Comment only when it adds useful context, such as explaining non-obvious behavior or a decision. Avoid comments that merely restate what the code does; straightforward code does not need a comment.

# Git workflow

- Before implementing a feature, switch to a new branch dedicated to that feature. Keep the task isolated and focused on that branch.
- Verify and commit the completed changes, push the branch, and open a pull request on GitHub.
- Merge through the GitHub pull request after the relevant checks pass. Do not implement features directly on `main` or push feature commits directly to `main`.
