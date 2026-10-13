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

No `typecheck`, test, format, or stylelint script is defined. Do not assume `lint` or `build` succeed until the command has been run in the current tree.

### Validation workflow

1. `npm run lint` runs ESLint with the Next.js core-web-vitals and TypeScript configs.
2. `npm run build` compiles the app and runs the TypeScript check. It is the only type check in the repository.
3. Canonical-class and class-conflict warnings come from the Tailwind CSS IntelliSense editor extension (`suggestCanonicalClasses`, `cssConflict`), not from `npm run lint`. Check the Problems panel for the files you changed.

## Language, direction, and type

`app/layout.tsx` sets Persian (`lang="fa"`) and right-to-left (`dir="rtl"`) on `<html>`. Use logical properties and utilities (`ps-*`, `pe-*`, `inset-s-*`, `inset-e-*`, `text-start`) so layouts stay correct in RTL.

Fonts come from the approved Figma design and load through `next/font/google` in `app/layout.tsx`:

- Vazirmatn is `--font-sans`. Tailwind's base styles apply it to the whole document.
- Agbalumo is `--font-logo` (`font-logo`) and is used only by the VeriFAM wordmark.

## Design system

All tokens live in the `@theme` block of `app/globals.css`, using Tailwind CSS v4's CSS-first configuration. There is no `tailwind.config.*` file. Because the block is a plain `@theme` and not `@theme inline`, every token is both a utility (`bg-surface`) and a CSS variable (`var(--color-surface)`).

- In JSX, use the utility: `text-text-secondary`, `bg-hover`, `shadow-card`.
- In a component stylesheet, use the variable: `background: var(--color-surface)`.
- Do not write raw hex values or arbitrary colors such as `bg-[#…]` in components. If the design introduces a new recurring value, add a token to `@theme` and use it. Keep genuinely one-off values local to their component.

### Colors

The palette below comes from the Figma color styles.

| Token | Value | Used for |
| --- | --- | --- |
| `ink` | `#2c2c2c` | Primary text and icons |
| `text-secondary` | `#6b6b6b` | Secondary text, inactive icons and options |
| `text-muted` | `#9a9a9a` | Placeholders, empty field labels, weekday headings |
| `primary` | `#b8b8c8` | Borders, dividers, image placeholders |
| `accent` | `#d4a8b0` | Brand accent: active navigation, today marker, range slider |
| `background` | `#fff` | Page and popover background |
| `surface` | `#faf8f9` | Filled fields, footer, hover background |
| `stars` | `#ffefae` | Rating stars |
| `error` | `#c47a7a` | Validation messages and invalid outlines |

Semantic aliases point at the palette. Use one when the role matters more than the hue:

| Token | Points to | Used for |
| --- | --- | --- |
| `border` | `primary` | Control and chip borders |
| `focus` | `ink` | Keyboard focus outlines |
| `hover` | `surface` | Hover background of options and secondary buttons |
| `selected` | `accent` | Selected days, chips, rating options, saved hearts |
| `disabled` | `text-muted` | Text of disabled options |

The design defines no success, warning, info, link, or overlay colors, so there are no tokens for them. Links inherit the color of the text around them. Add those tokens when the design supplies values. There is no dark mode.

### Gradients, shadows, radii, and layers

- **Gradients.** `--gradient-button`, `--gradient-title`, and `--gradient-hero` point to SVG files in `public/home/`. Use `text-gradient-button`, `text-gradient-title`, or `text-gradient-hero` for gradient text. These are utilities, so they work with breakpoints, for example `lg:text-gradient-hero`. The primary button uses `--gradient-button` as its background.
- **Box shadows:**
  - `shadow-box`: fields, panels, and inputs.
  - `shadow-card`: salon cards.
  - `shadow-popover`: the menu.
  - `shadow-glass`: the glass button.
- **Filter shadows** follow the painted shape:
  - `drop-shadow-box`: the sticky search pill.
  - `drop-shadow-nav`: the mobile bottom navigation.
- **Radii** use Tailwind's default scale:
  - `rounded-sm` (4px): focusable text links.
  - `rounded-lg` (8px): cards, fields, buttons, and panels.
  - `rounded-2xl`: the header bar.
  - `rounded-3xl` and `rounded-4xl`: pills.
  - `rounded-full`: circular buttons.
- **Layers** have no tokens yet:
  - `-z-10`: decorative backgrounds.
  - `z-40`: search popovers and the mobile menu sheet.
  - `z-50`: the sticky search header, the bottom navigation, and the desktop menu panel.

### Spacing, sizing, and typography

- **Spacing.** Use Tailwind's 0.25rem scale. Divide a Figma pixel value by 4: 343px is `max-w-85.75`, and 27px is `px-6.75`. Avoid arbitrary `[…px]` values when a step exists.
- **No named spacing tokens.** The canonical-class check rewrites any equal value to the token's name, so a `gutter` token would also rename unrelated 27px heights. Use these steps instead:
  - Page gutter: `px-6.75 lg:px-18` (27px on phones, 72px from the `lg` breakpoint).
  - Control heights: `h-11.5` (46px) for header and CTA buttons. Search controls are `h-13.5` (54px) on phones and `lg:h-14.5` (58px) on desktop; `.search-field` uses the same heights.
- **Containers.** `max-w-page` (1440px) for full-width sections and `max-w-search` (1046px) for the search bar.
- **Breakpoints.** The design has two layouts: phones below `lg` (64rem) and desktop from `lg`. `sm` and `xl` only adjust card width and the large CTA artwork.
- **Type scale.** Use Tailwind's sizes. Figma's 30px is `text-3xl`, and 48px is `text-5xl`.
- **Weights.** `font-semibold` for UI text and labels. `font-medium` or `font-bold` for headings, as the design specifies.
- **Line heights** given by the design use spacing steps, for example `leading-14.5`.

## Icons and SVG assets

- **Location.** Every SVG is a React component in `components/icons/`, one component per file. Icons are named `<name>-icon.tsx` and export `<Name>Icon`, for example `trash-icon.tsx` exports `TrashIcon`. Decorative backgrounds keep a descriptive name, for example `HeroBackground` and `GlowEllipse`.
- **Imports.** `components/icons/index.ts` re-exports every component. Import from the folder, for example `import { SearchIcon, TrashIcon } from "@/components/icons";`, and add each new component to `index.ts`.
- **Props.** Each component accepts every SVG prop (`width`, `height`, `className`, `strokeWidth`, `preserveAspectRatio`, and so on), spread last so callers can override the defaults:
  - The default `width` and `height` are the Figma size, and the `viewBox` never changes.
  - Single-color glyphs draw with `currentColor`. Set the color with a text utility on the icon or its parent, for example `text-text-secondary` or `text-stars`.
  - State variants are props: `HeartIcon` takes `filled`, `CheckboxIcon` takes `checked`, and `MenuToggleIcon` takes `variant` (`header`, `compact`, or `mobile`) and `open`.
  - Components default to `aria-hidden="true"`.
- **Fixed colors.** Backgrounds keep the gradient colors from Figma, and `CarouselNavIcon` fills its pill with the `surface` token. Gradient and filter IDs come from `useId`, so a component can render more than once on a page.
- **Exception: CSS gradients.** `public/home/gradient-button.svg`, `gradient-title.svg`, and `gradient-hero-title.svg` stay files. CSS reads them through `url()` in the `--gradient-*` tokens for gradient text and the primary button background, which a React component cannot supply.
- **Before adding an icon,** search `components/icons/`.
  - If an existing icon differs only in color or size, use it with different props rather than adding a copy.
  - If it differs only in state, add a prop to the existing component.
  - Do not add an icon library.
- **Accessibility.**
  - Inline icons stay `aria-hidden`, and decorative images use `alt=""`.
  - An icon-only control puts its accessible name on the control, with `aria-label`, not on the icon.

## CSS and Tailwind conventions

- **Setup.** Tailwind CSS 4.3 runs through `@tailwindcss/turbopack`. Use v4 syntax: `@theme`, `@utility`, and the `@container` and `scrollbar-none` utilities. Do not use v3 configuration or patterns.
- **Canonical classes.** Prefer the form that the editor's canonical-class suggestion proposes:
  - `max-w-85.75`, not `max-w-[343px]`.
  - `rounded-4xl`, not `rounded-[32px]`.
  - `inset-e-2`, not `end-2`.
  - `-top-2.75`, not `top-[-11px]`.
  - Keep an arbitrary value only when no step exists, such as `w-[1962.5px]`.
- **Conflicts.** IntelliSense reports a conflict when two utilities in one class list set the same CSS property. It ignores variants that compile to an at-rule (`lg:`, `hover:`, `motion-safe:`), but not plain-selector variants (`disabled:`, `aria-*:`, `has-*:`, `focus-visible:`), even when the states exclude each other. Use these patterns instead:
  - Native `disabled`: `enabled:cursor-pointer enabled:hover:bg-hover disabled:opacity-30`.
  - `aria-disabled`: `not-aria-disabled:cursor-pointer aria-disabled:opacity-40`.
  - State that React already knows (selected day, checked option, saved heart): choose the class in TypeScript, as `dayStateClassName` in `persian-calendar-grid.tsx` does.
  - A repeated control with several states: give it a class in the feature stylesheet, such as `.search-chip` or `.search-input` in `features/home/search/search.css`.
- **Focus.** Use `focus-ring-<offset>` (`focus-ring-0`, `focus-ring-2`, `focus-ring-4`) from `app/globals.css`. It draws a 2px `--color-focus` outline on `:focus-visible`, and also on a label whose visually hidden input has focus. It skips `aria-invalid="true"` controls so they keep their error outline.
- **Outline pitfall.** Do not combine `outline-none` with `outline-2` utilities. `outline-none` sets `--tw-outline-style: none`, which also hides the later outline.
- **Component stylesheets.** `components/ui/button.css` and `features/home/search/search.css` are imported once in `app/globals.css` with `layer(components)`. Utilities in JSX can still override them. Read tokens there with `var(--…)`. Do not add `!important`.

## Motion and interaction

- **Transitions.**
  - Keep them short and limited to color, background, opacity, filter, or shadow.
  - Component CSS uses `var(--default-transition-duration)` (150ms) and `var(--default-transition-timing-function)`. Utilities use `transition-colors` or `transition-opacity`.
  - Do not add an animation library, and do not use motion that delays input.
- **Reduced motion.**
  - The carousel scroller uses `motion-safe:scroll-smooth`, and `scrollBy` is called without `behavior`, so users who prefer reduced motion get an instant jump.
  - The sticky header checks `prefers-reduced-motion` before its smooth `scrollIntoView`.
  - `<html>` has no global smooth scrolling.
- **Interaction.**
  - Every control is reachable by keyboard and has a visible focus ring.
  - Buttons have an explicit `type`.
  - A control that is unavailable for now uses `aria-disabled="true"` with a `title` explanation.
