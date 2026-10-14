# salon-market-place

Next.js frontend for a salon marketplace. Backend integration is not implemented. Do not invent API endpoints, DTOs, authentication, or other backend behavior.

Coding conventions for people and agents are in [AGENTS.md](./AGENTS.md).

## Current stack

These versions are installed and recorded in `package.json` and `package-lock.json`:

- Next.js 16.4.0
- React 19.3.0
- TypeScript 5.9.3 (`typescript` is declared as `^5`)
- Tailwind CSS 4.3.3 (`tailwindcss` is declared as `^4`)
- `clsx` 2.1.1 and `tailwind-merge` 3.7.0, combined in the `cn()` helper in `lib/utils.ts`

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
4. For a styling change, check the result in the browser as described in [Validating a styling change](#validating-a-styling-change).

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

The roles below come from the Figma color styles. The hues are the warm ivory, plum, and champagne palette for the marketplace.

| Token | Value | Used for |
| --- | --- | --- |
| `ink` | `#2c2426` | Primary text and icons |
| `text-secondary` | `#5e5456` | Secondary text, inactive icons and options |
| `text-muted` | `#786c68` | Placeholders, empty field labels, weekday headings |
| `primary` | `#d4cbc3` | Borders, dividers, image placeholders, the map canvas |
| `accent` | `#7a3e52` | Brand accent: active navigation, today marker, range slider, saved state |
| `accent-soft` | `#d9b8c2` | Decorative rose: eyebrow rules, hairline frames, photo plates. Never used as text. |
| `background` | `#fbf7f2` | Page, cards, and popover background |
| `surface` | `#f3ebe3` | Filled fields, footer, hover background, search workspace |
| `surface-strong` | `#e9dfd6` | Stronger hover fill (calendar days, carousel arrows) and the slider rail |
| `stars` | `#b08d3e` | Rating stars |
| `error` | `#9b3a42` | Validation messages and invalid outlines |
| `success` | `#2f6b4f` | Positive confirmation, once a flow has one |
| `warning` | `#8a5a12` | Caution, once a flow has one |
| `info` | `#3d5c73` | Neutral notices, once a flow has one |
| `brand` | `#2c2026` | Solid fallback behind the primary-button gradient |
| `on-accent` | `#fff` | Text and icons on `accent`, `selected`, and `brand` |

Semantic aliases point at the palette. Use one when the role matters more than the hue:

| Token | Points to | Used for |
| --- | --- | --- |
| `border` | `primary` | Control and chip borders |
| `focus` | `ink` | Keyboard focus outlines |
| `hover` | `surface` | Hover background of options and secondary buttons |
| `selected` | `accent` | Selected days, chips, rating options, saved hearts |
| `disabled` | `text-muted` | Text of disabled options |

`success`, `warning`, and `info` are reserved for feedback that does not exist in the current screens. Do not use them as decoration. Links inherit the color of the text around them. There is no dark mode.

### Gradients, shadows, radii, and layers

- **Gradients.** `--gradient-button`, `--gradient-title`, and `--gradient-hero` point to SVG files in `public/home/`. Use `text-gradient-button`, `text-gradient-title`, or `text-gradient-hero` for gradient text. These are utilities, so they work with breakpoints, for example `lg:text-gradient-hero`. The primary button uses `--gradient-button` as its background.
- **Box shadows:**
  - `shadow-box`: fields, panels, and inputs.
  - `shadow-card`: salon cards at rest.
  - `shadow-card-hover`: salon cards under a pointer.
  - `shadow-popover`: menus and search panels.
  - `shadow-sheet`: the mobile filter sheet.
  - `shadow-glass`: glass bars and the glass button.
  - `shadow-glow`: the accent ring on a focused filter input and an open filter chip.
  - `shadow-button`: the primary button, so it lifts slightly off the page.
- **Filter shadows** follow the painted shape:
  - `drop-shadow-box`: the sticky search pill.
  - `drop-shadow-nav`: the mobile bottom navigation.
- **Radii** use Tailwind's default scale:
  - `rounded-sm` (4px): focusable text links.
  - `rounded-lg` (8px): fields, buttons, and compact panels.
  - `rounded-xl` (12px): salon cards, the search form, popovers, the map, and the filter sidebar.
  - `rounded-2xl`: the header bar.
  - `rounded-3xl` and `rounded-4xl`: pills.
  - `rounded-full`: circular buttons.
- **Layers** have no tokens yet:
  - `-z-10`: decorative backgrounds.
  - `z-40`: search popovers and the mobile menu sheet.
  - `z-50`: the sticky search header, the bottom navigation, and the desktop menu panel.
  - `z-60`: the mobile filter sheet on the search page, which covers the bottom navigation.

### Spacing, sizing, and typography

- **Spacing.** Use Tailwind's 0.25rem scale. Divide a Figma pixel value by 4: 343px is `max-w-85.75`, and 27px is `px-6.75`. Avoid arbitrary `[…px]` values when a step exists.
- **No named spacing tokens.** The canonical-class check rewrites any equal value to the token's name, so a `gutter` token would also rename unrelated 27px heights. Use these steps instead:
  - Page gutter: `px-6.75 lg:px-18` (27px on phones, 72px from the `lg` breakpoint).
  - Control heights: `h-11.5` (46px) for header and CTA buttons.
  - Search controls are `h-13.5` (54px) on phones and `lg:h-14.5` (58px) on desktop, set in `searchFieldClassName`.
- **Containers.** `max-w-page` (1440px) for full-width sections and `max-w-search` (1046px) for the search bar.
- **Breakpoints.** The design has two layouts: phones below `lg` (64rem) and desktop from `lg`. `sm` and `xl` only adjust card width, the large CTA artwork, and whether the search page fits the filter sidebar beside the map.
- **Type scale.** Use Tailwind's sizes. Figma's 30px is `text-3xl`, and 48px is `text-5xl`.
- **Weights.** `font-semibold` for UI text and labels. `font-medium` or `font-bold` for headings, as the design specifies.
- **Line heights** given by the design use spacing steps, for example `leading-14.5`.

## Icons and SVG assets

- **Location.** Every SVG is a React component in `components/icons/`, one component per file. Icons are named `<name>-icon.tsx` and export `<Name>Icon`, for example `trash-icon.tsx` exports `TrashIcon`. Decorative backgrounds keep a descriptive name, for example `HeroBackground` and `GlowEllipse`.
- **Imports.** `components/icons/index.ts` re-exports every component. Import from the folder, for example `import { SearchIcon, TrashIcon } from "@/components/icons";`, and add each new component to `index.ts`.
- **Props.** Each component accepts every SVG prop (`width`, `height`, `className`, `strokeWidth`, `preserveAspectRatio`, and so on), spread last so callers can override the defaults:
  - The default `width` and `height` are the Figma size, and the `viewBox` never changes.
  - Single-color glyphs draw with `currentColor`. Set the color with a text utility on the icon or its parent, for example `text-text-secondary` or `text-stars`.
  - State variants are props: `HeartIcon` takes `filled`, and `MenuToggleIcon` takes `variant` (`header`, `compact`, or `mobile`) and `open`.
  - Components default to `aria-hidden="true"`.
- **Fixed colors.** Backgrounds keep the gradient colors from Figma. Gradient and filter IDs come from `useId`, so a component can render more than once on a page. Carousel arrows are real buttons, not a decorative SVG pill.
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
  - A selector variant that must sit beside its base utility (`placeholder:`, `focus-visible:`): pass it to `cn()` as a separate argument, as `searchFieldInputClassName` does.
  - A repeated control with several states: write a class-name helper that takes the state, such as `searchChipClassName` or `searchInputClassName` in `features/search/search-classes.ts`.
- **Focus.** Use `focus-ring-<offset>` (`focus-ring-0`, `focus-ring-2`, `focus-ring-4`) from `app/globals.css`. It draws a 2px `--color-focus` outline on `:focus-visible`, and also on a label whose visually hidden input has focus. It skips `aria-invalid="true"` controls so they keep their error outline.
- **Outline pitfall.** Do not combine `outline-none` with `outline-2` utilities. `outline-none` sets `--tw-outline-style: none`, which also hides the later outline.
- **Component stylesheets.** Only `features/search/search.css` remains, for the reason given in [CSS exceptions](#css-exceptions). It is imported once in `app/globals.css` with `layer(components)`, so utilities in JSX can still override it. Read tokens there with `var(--…)`. Do not add `!important`.

## Styling conventions

### Styling hierarchy

Use the first option that can express the style:

1. **Utilities in JSX** for layout, spacing, and one-off composition.
2. **Design tokens** from `@theme` (`bg-surface`, `shadow-box`, `max-w-search`) rather than raw values. See [Design system](#design-system).
3. **Project utilities and variants** from `app/globals.css`: `focus-ring-*`, `text-gradient-*`, and `unavailable:`.
4. **A class-name helper in TypeScript**, when a component repeats the same class list or chooses classes from its state. Examples are `buttonClassName` in `components/ui/button.tsx` and the helpers in `features/search/search-classes.ts`. Keep the helper beside the component that owns it, and move it to `components/ui/` only when a second feature needs it.
5. **A CSS rule**, only when Tailwind cannot express the style. See [CSS exceptions](#css-exceptions).

A component owns its base look and its variants. A caller passes only placement through `className`, such as height, margin, width, or visibility, and does not restyle the component.

### Composing classes with `cn()`

`cn()` in `lib/utils.ts` passes its arguments through `clsx` and then `tailwind-merge`. Import it from `@/lib/utils`.

- **When to use it.** Use it when a class list has a condition or merges a `className` prop. A fixed string needs no `cn()`.
- **Conditions.** Write `condition && "classes"` or a ternary, such as `selected ? "text-selected" : "text-text-secondary"`.
- **The `className` prop goes last**, so a caller's utility replaces the default from the same group. For example, `className="px-0"` replaces `Button`'s `px-8`.
- **State selector variants.** Pass `placeholder:`, `focus-visible:`, and similar variants as a separate argument from the utility they override. See [Conflicts](#css-and-tailwind-conventions).
- **Line heights.** `tailwind-merge` removes an earlier `leading-*` when a later font size follows it in the same variant. Write the line height with the size instead: `text-lg/none` or `text-sm/normal`.
- **Project classes.** `lib/utils.ts` registers the project's shadows, drop shadows, containers, `text-gradient-*`, and `focus-ring-*` with `tailwind-merge`. When `@theme` gains a shadow, drop shadow, or container, or `globals.css` gains a utility, register it there too. Otherwise conflicts that involve it may not resolve.
- **Complete class names.** Tailwind generates CSS only for class names that appear in full in the source. Never build one from a template such as `` `bg-${color}` ``. Map each state to a full string, for example with `Record<Variant, string>`.

### Responsive design

- Write mobile-first: an unprefixed utility is the phone layout, and `lg:` is the desktop layout. The breakpoints are listed under [Spacing, sizing, and typography](#spacing-sizing-and-typography). Do not add an intermediate layout that the design does not have.
- Switch elements with `hidden lg:block`, `lg:hidden`, and similar utilities, and keep logical properties for RTL.
- Check a change at a phone width (402px, the Figma frame), a tablet width (1024px), and a desktop width (1440px).

### Interaction and accessibility

- **Hover.** Tailwind v4 applies `hover:` only on devices that support hover (`@media (hover: hover)`). Never let hover be the only way to see information.
- **Unavailable controls.** Use `unavailable:` (native `disabled` or `aria-disabled="true"`) for the unavailable look, and `hover:not-unavailable:` so hover feedback skips those controls.
- **Focus.** Every focusable control gets `focus-ring-<offset>`. An invalid control sets `aria-invalid="true"` and shows `outline-2 outline-error` instead.
- **Selected and invalid states** come from React state, through a class-name helper. Set the matching ARIA state (`aria-pressed`, `aria-selected`, `aria-invalid`, a checked input) together with the classes.
- **Reduced motion and transitions.** See [Motion and interaction](#motion-and-interaction).
- **Icons** take their color from `currentColor`. See [Icons and SVG assets](#icons-and-svg-assets).

### CSS exceptions

Only these styles remain plain CSS:

- **`app/globals.css`:** the `@theme` tokens, the `unavailable` custom variant, and the `text-gradient-*` and `focus-ring-*` utilities. These extend Tailwind itself.
- **`features/search/search.css`:** the thumbs of the price range sliders. Each browser engine needs its own pseudo-element (`::-webkit-slider-thumb`, `::-moz-range-thumb`), and the thumb's focus outline depends on the input's `:focus-visible`. Arbitrary variants could express this, but the rules are clearer as CSS. The slider input itself uses utilities in `price-filter.tsx`.

Before adding a CSS rule, confirm that no utility, variant, or arbitrary value can express it. Explain the reason in a comment, read tokens with `var(--…)`, and import the file once in `app/globals.css` with `layer(components)`.

### Validating a styling change

1. Run `npm run lint` and `npm run build`.
2. Check the Problems panel for canonical-class and conflict warnings in the files you changed.
3. Search the repository for every class name, selector, or data attribute you removed, so no reference remains.
4. Run `npm run dev`. Check the changed screens at 402px, 1024px, and 1440px, and check each state you touched: hover, keyboard focus, disabled or `aria-disabled`, selected, and invalid.

The repository has no automated visual or accessibility tests. State which of these checks you actually ran.

### Rules for AI agents

- Follow the [styling hierarchy](#styling-hierarchy). Do not add a stylesheet, CSS Modules, `tailwind.config.*`, `!important`, or `@apply` component classes.
- Compose conditional classes with `cn()` from `@/lib/utils`. Do not add another class-name or variant library without approval.
- Never build a class name dynamically.
- Keep token values and visual results unchanged, unless the design changes them.
- Remove a class, selector, or CSS rule only after searching for every reference to it.
- Report only the checks you ran, as listed in [Validating a styling change](#validating-a-styling-change).

## Motion and interaction

- **Transitions.**
  - Keep them short and limited to color, background, opacity, filter, shadow, or a transform that does not move layout (`scale`, `translate`).
  - Use the motion tokens: `duration-fast` (150ms) for color, opacity, and press feedback; `duration-base` (220ms) with `animate-overlay` or `animate-rise` for menus, panels, and the sticky bar; `duration-slow` (360ms) with `animate-sheet` or an image `scale` for larger reveals.
  - Primary buttons styled by `buttonClassName` fill with `accent` on hover: a `clip-path` circle on `::before` grows from the center until it covers the button (`--duration-slow`). The light variants keep their background and border hover only. `isolate` keeps the layer between the button's background and its content, and `overflow-hidden` clips it to the radius without clipping the focus outline or shadow. Unavailable buttons get no fill, and reduced motion shows the fill without the growing circle.
  - Page content uses `animate-fade-up` (650ms, `backwards` fill) for the hero, header, and `Reveal` in `components/ui/reveal.tsx`. Saved hearts use `animate-pop`. Do not use `fill-mode: both` on an ancestor: it keeps a stacking context and can trap `fixed` children such as the mobile menu sheet.
  - Easing is `ease-standard` for entries and `ease-exit` for departures. Do not invent a one-off duration.
  - Do not add an animation library, and do not use motion that delays input. Do not fade the page in from transparent.
- **Reduced motion.**
  - `app/globals.css` shortens every animation and transition when `prefers-reduced-motion: reduce` is set. Entrance utilities still use `motion-safe:` so those users never start from a hidden frame.
  - The carousel scroller uses `motion-safe:scroll-smooth`, and `scrollBy` is called without `behavior`, so users who prefer reduced motion get an instant jump.
  - The sticky header checks `prefers-reduced-motion` before its smooth `scrollIntoView`.
  - `<html>` has no global smooth scrolling.
- **Interaction.**
  - Every control is reachable by keyboard and has a visible focus ring.
  - Buttons have an explicit `type`.
  - A control that is unavailable for now uses `aria-disabled="true"` with a `title` explanation.
