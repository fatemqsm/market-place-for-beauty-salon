# Agent instructions

These rules apply to implementation work in `salon-market-place`. Setup commands and the installed-versus-approved stack are in `README.md`. Do not repeat that guide here, and do not treat planned folders or packages as if they already exist.

If Next.js later inserts its managed agent-rules block, identified by the comments `BEGIN:nextjs-agent-rules` and `END:nextjs-agent-rules`, leave that block unchanged and keep these project rules outside it.

## Inspect, then change as little as possible

- Read the relevant code and the current configuration before editing.
- Before using a version-sensitive Next.js API, read the matching guide in `node_modules/next/dist/docs/`. This app is Next.js 16 with `cacheComponents: true` and `partialPrefetching: true` in `next.config.ts`.
- Implement the smallest change that solves the request.
- Do not refactor unrelated code, add abstractions without a current need, or create empty folders and placeholder files.
- Do not migrate the project into `src/` unless that move is explicitly approved.
- Ask before adding, removing, or upgrading a dependency, and before changing an architectural decision already recorded here.
- After an authorized change, name the files you changed. Report a lint, build, or typecheck result only when that command was actually run and you observed its output. Say so when a check was skipped.

## Where code goes

Keep the root App Router. Create a directory only when real code needs it.

- `app/`: routes, layouts, `loading` and `error` boundaries, and global CSS. Do not put shared components or domain logic in route files.
- `components/ui/`: feature-independent primitives such as `Button`, `Input`, and `Loading`, once a real screen needs them.
- `components/icons/`: every SVG as a React component that takes SVG props, one component per file. The only SVG files kept in `public/` are the gradients that CSS loads through `url()`. See "Icons and SVG assets" in `README.md`.
- `features/<feature>/`: components, Zod schemas, types, and API calls that belong to one feature.
- `lib/`: shared infrastructure, including `lib/api/` when a real HTTP client is implemented.
- `hooks/`: a hook used by more than one feature.
- `types/`: a type used by more than one independent feature.
- `store/`: the Redux Toolkit store and slices, once shared client state exists.
- `global.d.ts`: ambient declarations only. Ordinary application types stay in normal modules.

The path alias `@/*` maps to the repository root.

## Components

- Keep each component small and give it one responsibility.
- Add a shared primitive before copying the same control into a second feature.
- Leave a component inside its feature until a second, independent feature needs the same behavior. A similar appearance is not enough reason to move it into `components/ui/`.
- Start shared UI with `Button`, `Input`, and `Loading` when implementation starts. Do not build a larger kit, or any component, until Figma and a real feature require it.
- Do not add components, routes, or feature folders as part of a documentation-only task.

## TypeScript

- Leave `strict` enabled.
- Put ordinary types in modules. Do not rely on a file becoming global because it has no import or export.
- Keep a small, local props type in the component file.
- Add `Component.types.ts` beside the component when the types are reused or large enough to stand alone. Do not add an empty type file.
- Keep feature types in that feature. Move a type to `types/` only when separate features import it.
- Use `global.d.ts` only for real ambient declarations. Do not re-export feature or component types from it.

## Tailwind CSS

- Keep Tailwind CSS v4 and the CSS-first setup in `app/globals.css`. Do not add `tailwind.config.*` or Tailwind v3 patterns unless that change is explicitly approved.
- Use utility classes for one-off layout and simple composition.
- Follow "Styling conventions" in `README.md`: the styling hierarchy, `cn()` from `@/lib/utils` for conditional or merged classes, and plain CSS only for the listed exceptions.
- Add design tokens through the current `@theme` approach when the approved design supplies the values. Leave Tailwind's default palette in place.
- Follow the token, icon, focus, conflict, and canonical-class conventions in the "Design system" and "CSS and Tailwind conventions" sections of `README.md`.
- Do not add CSS Modules or a second styling system unless an approved implementation needs it.

## Persian, RTL, and type

- The intended document defaults are `lang="fa"` and `dir="rtl"`. Set them on the root layout when implementing application UI, unless an approved requirement says otherwise.
- Prefer logical CSS properties (`margin-inline`, `padding-inline`, `text-start`, and the matching Tailwind logical utilities) so RTL layout stays correct.
- The fonts come from the approved Figma design: Vazirmatn for text and Agbalumo for the wordmark, both loaded through `next/font` in `app/layout.tsx`. Do not add another font, or copy font files from another repository, unless the design and the license both confirm it.
- Format digits according to the value. A telephone number, code, or identifier does not automatically use the same digits as surrounding prose or a displayed price.
- Add Jalali date handling only when a product requirement needs a date.

## Forms

- Use React Hook Form for nontrivial form state and submission.
- Validate with Zod, and connect the schema with `@hookform/resolvers` when that integration fits the installed versions.
- Keep the schema next to the feature that owns the form. Share it only when another form uses the same rules.
- Associate each label and error with its control. Keep keyboard use and visible focus intact.
- These packages are approved and are not installed. Do not install them in a documentation task. Install them only in the implementation task that introduces the form, after approval.

## HTTP and the backend

- Axios is the approved HTTP client. It is not installed.
- When a real API integration starts, put the shared Axios instance and shared error handling in `lib/api/`.
- Keep a feature's requests and its request/response types inside that feature until another feature uses the same contract.
- Do not invent URLs, DTOs, authentication, retries, or other backend behavior.
- Do not add a client, interceptors, environment variables, or mocks before a real contract or an approved implementation task exists.

## Redux Toolkit and other state

Redux Toolkit is an approved, required part of the stack. It is not installed. Do not install it in a documentation task.

- Before the first feature that needs it, check `package.json`. If it is missing, stop and get approval for a separate installation task.
- Use it for client state that independent parts of the app must share.
- Keep transient UI state in React state.
- Keep form state in React Hook Form.
- Do not put server payloads, field values, or temporary component state in the store by default.
- Add the store, provider, slices, and their types only when that shared state exists. Do not add an empty store or placeholder slices to create `store/`.

## Rendering and caching

- Prefer Server Components.
- Add `"use client"` on the smallest component that needs a browser API, an event handler, client state, or a client-only library. Do not mark a page or the root layout as a client component because one child is interactive.
- Choose prerendering, request-time rendering, and caching from the route's data, using the installed Next.js 16 docs and the current `cacheComponents` setting. Do not copy Next.js 13 `revalidate` or Pages Router patterns from other projects.
- `generateStaticParams` does not by itself mean the whole route is prerendered.
- Keep request-specific or user-specific data out of a shared cache unless the installed caching docs say that use is safe.
- Add `loading` and `error` boundaries when that route's async work needs them. Do not add routes, fetches, or cache policies before the feature and its API contract exist.

## Accessibility

- Use semantic elements.
- Tie labels and error text to their inputs.
- Keep keyboard operation and a visible focus style.
- Set the correct button `type`, and expose disabled and loading state, including `aria-busy` while a button is submitting.
- Give a meaningful loading state an accessible name or status announcement.
- Keep layouts usable on small screens and in RTL.
- Do not add motion that blocks use of the control.

## Dependencies, checks, and comments

- Keep npm and `package-lock.json`.
- Dependency installation is a separate approved task. Redux Toolkit, Axios, React Hook Form, Zod, and `@hookform/resolvers` still need that installation step. Do not add them while only updating docs.
- Do not add another state, styling, date, icon, or component library without a concrete need and approval.
- When verification is in scope, use `npm run lint` and `npm run build`. There is no `typecheck` script.
- Comment a non-obvious constraint, business rule, or trade-off. Do not comment what the code already states. Leave an existing comment in place when it is still accurate.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
