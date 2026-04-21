# CLAUDE.md

## Project

`@bordeux/node-aws-secrets-loader` — a small TypeScript library that loads AWS Secrets Manager secrets into `process.env`.

## Tech Stack

- **Build**: tsup (CJS + ESM + .d.ts)
- **Lint/Format**: Biome
- **Test**: Vitest
- **Language**: TypeScript 5
- **Runtime**: Node.js >= 22

## Commands

```sh
npm run build        # Build with tsup (output in build/)
npm run lint         # Check lint + format with Biome
npm run lint:fix     # Auto-fix lint + format issues
npm test             # Run tests with Vitest
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

## Project Structure

```
src/
  index.ts                      # Re-exports from lib/
  lib/
    awsSecretLoader.ts          # Core function: fetches secret, sets env vars
    awsSecretLoader.spec.ts     # Tests
    secretManagerClient.ts      # Client factory with DI for testing
```

## Commit Style

- Use conventional commits — release-please reads these to auto-version and generate changelogs.
  - `feat: ...` → minor version bump
  - `fix: ...` → patch version bump
  - `feat!: ...` or `BREAKING CHANGE:` → major version bump
  - `chore:`, `docs:`, `refactor:`, `test:`, `ci:` → no version bump
- Write concise commit messages focused on the "why", not the "what".
- **Never mention Claude, AI, or "Co-Authored-By: Claude" in commit messages.** Commits should read as if written by a human developer.

## Conventions

- Biome enforces formatting (single quotes, 2-space indent, trailing commas) and linting. Run `npm run lint:fix` before committing.
- Tests live next to source files as `*.spec.ts`.
- The `setSecretManagerClientClass()` function is used for dependency injection in tests — mock constructors must use `function()` (not arrow functions) since they are called with `new`.

## CI/CD

- **PR checks** (`ci.yml`): lint → test → build on every PR to master.
- **Release** (`release.yml`): release-please creates a Release PR on push to master. Merging it publishes to npm via OIDC trusted publishing (no NPM_TOKEN needed).