# salon-market-place

Next.js frontend for a salon marketplace. Backend integration is not implemented. Do not invent API endpoints, DTOs, authentication, or other backend behavior.

Coding conventions for people and agents are in [AGENTS.md](./AGENTS.md).

## Current stack

These versions are installed and recorded in `package.json` and `package-lock.json`:

- Next.js 16.4.0
- React 19.3.0
- TypeScript 5.9.3 (`typescript` is declared as `^5`)
- Tailwind CSS 4.3.3 (`tailwindcss` is declared as `^4`)

The App Router lives at the repository root in `app/`. There is no `src/` directory. `next.config.ts` enables `cacheComponents` and `partialPrefetching`.

## Approved stack, not installed yet

These packages are approved for later implementation. They are not dependencies today, and this repository does not contain their setup:

- Redux Toolkit, for genuinely shared client-side state
- Axios, for HTTP calls once a real API contract exists
- React Hook Form, Zod, and `@hookform/resolvers`, for forms

## Requirements

- Node.js `>=20.9.0` (required by the installed Next.js release)
- npm, with the existing `package-lock.json`

## Commands

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
```

| Script | What it runs |
| --- | --- |
| `dev` | `next dev` |
| `build` | `next build` |
| `start` | `next start` |
| `lint` | `eslint` |

No `typecheck` or format script is defined. Do not assume `lint` or `build` succeed until the command has been run in the current tree.

## Language, direction, and type

The intended application defaults are Persian (`lang="fa"`) and right-to-left (`dir="rtl"`).

The final font is not selected. It will be chosen later from the approved Figma design. Do not guess a font, download one, or copy font files from another project before that decision.

The generated starter layout may still show the create-next-app language and font until those application defaults are implemented.
