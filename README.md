# @kasoma/comp-lib

A Tailwind-first, variant-driven, polymorphic React component library — shipped with a **runtime-themeable design system**, ready-to-copy **page templates** and **section blocks**, and an interactive Storybook showcase.

This is not a demo app. It's a full component system: 30+ accessible components and primitives, a `tv()` variant engine, polymorphic `as`/`tw` APIs, SSR-safe hooks, and a CSS-variable theme layer you can re-skin at runtime.

## Documentation

- **Storybook** — run `npm run storybook`. Opens on the **Intro / Welcome** landing page, a live, themeable tour of the whole system.
- **[Complete Component Documentation](./COMPONENT_DOCS.md)** — examples, variants, and theme config per component.
- **[Implementation Guide](./COMPONENT_GUIDE.md)** — patterns and architecture for building new components.

## Features

- **Tailwind-First** — every component is styled with Tailwind CSS, no runtime CSS-in-JS.
- **Runtime Theming** — 4 built-in themes (Daylight, Slate, Aurum, Evergreen) driven by CSS-variable tokens; swap the whole palette by setting `data-theme` on a root element.
- **Variant System** — a powerful `tv()` function for composable, type-safe variants.
- **Polymorphic** — the `as` prop renders any component as any element/component.
- **Tweakable** — the `tw` prop extends or overrides styles at the call site, conflict-aware via `tailwind-merge`.
- **Pages & Sections** — copy-ready page templates and section blocks composed from the primitives.
- **TypeScript** — full type safety with first-class IntelliSense.
- **Accessible** — WCAG 2.1 AA: keyboard navigation, focus management, ARIA wiring.
- **Tree-Shakable** — named exports, `sideEffects: false` — bundle only what you use.
- **SSR-Safe** — hydration-safe ids and isomorphic effects for Next.js, Remix, etc.

## Installation

```bash
npm install @kasoma/comp-lib react react-dom tailwindcss
```

### Peer Dependencies

- `react` >= 18
- `react-dom` >= 18
- `tailwindcss` >= 3

## Quick Start

```tsx
import { Button, Input, Dialog } from '@kasoma/comp-lib';

function App() {
  return (
    <>
      <Button intent="primary" size="md">
        Save Changes
      </Button>

      <Input label="Email" type="email" placeholder="you@example.com" />
    </>
  );
}
```

## Tailwind Configuration

Add the library to your Tailwind content paths so its classes are generated:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@kasoma/comp-lib/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Optionally override library tokens
      colors: {
        brand: { 600: '#yourBrand', 700: '#yourBrandDark' },
      },
    },
  },
};
```

## Theming

The library ships a **runtime theme system** built on CSS-variable tokens. Each theme defines a small set of semantic tokens which Tailwind maps to utility classes — switch the active theme by setting `data-theme` on any ancestor (typically `<html>`), and the entire surface re-skins instantly.

**Built-in themes:** `daylight` (light, default) · `slate` · `aurum` · `evergreen`.

```tsx
// Swap the whole palette at runtime — no re-render of styles required.
document.documentElement.setAttribute('data-theme', 'aurum');
```

Semantic tokens are exposed as Tailwind utilities:

| Token            | Utilities                                  | Role                          |
| ---------------- | ------------------------------------------ | ----------------------------- |
| `--c-canvas`     | `bg-canvas`                                | App background                |
| `--c-panel`      | `bg-panel`                                 | Cards / surfaces              |
| `--c-elevated`   | `bg-elevated`                              | Raised surfaces               |
| `--c-edge`       | `border-edge`                              | Hairline borders              |
| `--c-fg`         | `text-fg`, `text-fg-muted`, `text-fg-subtle` | Foreground text             |
| `--c-accent`     | `text-primary`, `bg-primary` (+ `/opacity`) | Primary accent (theme-following) |
| `--c-accent-2`   | `text-accent2`, `bg-accent2`               | Secondary / counter-tone      |
| `--c-on-accent`  | `text-primary-fg`, `text-onaccent`         | Text on accent fills          |

> The theme-following accent is exposed as **`primary`** / **`primary-fg`** (e.g. `bg-primary`, `text-primary`, `border-primary/30`, `ring-primary/20`, `text-primary-fg`). Note: `bg-accent` / `text-accent` refer to a separate **static amber** ramp and do _not_ follow the theme — use `primary` for accents.

The token definitions live in `tailwind.config.js` (a small `addBase` plugin maps `:root` + `[data-theme="…"]`), with helper utilities (`text-accent-gradient`, `text-accent-shimmer`, mesh/grain stage) in `src/styles/tailwind.css`. Adopt the same config in your app to inherit all four themes, or define your own palettes against the same token names.

Every component also accepts the `tw` prop, so you can theme any element ad-hoc against these tokens:

```tsx
<Button tw="bg-primary text-primary-fg hover:brightness-110">Themed</Button>
<Badge tw="border border-primary/30 bg-primary/10 text-primary">New</Badge>
```

## Components

> For complete documentation with all variants, sizes, and examples, see [COMPONENT_DOCS.md](./COMPONENT_DOCS.md) or browse Storybook.

**Form** — Button · Input · Textarea · Select · Checkbox · Radio · Toggle

**Layout** — Card · Tabs · Accordion · Table

**Navigation** — Breadcrumb · Pagination

**Overlay** — Dialog (`Modal` alias) · Drawer · Popover · DropdownMenu · Tooltip

**Feedback** — Toast · Alert · Progress · Spinner · Skeleton

**Display** — Avatar · Badge · Icon

**Media** — Gallery · Carousel

**Primitives** — Eyebrow · Kbd · IconButton · Stat · Code

## Blocks

Beyond primitives, the library ships a **Blocks** tier: pre-assembled, fully-customizable components — the kind Tailwind UI / Material UI / shadcn-blocks sell — each with **6 built-in designs** via a `variant` prop, composed from the in-house primitives and themed entirely through the semantic tokens (so every design re-skins across all 4 themes for free).

Every block is importable from the package, renders complete from data props, **and** exposes a compound slot API for full structural control:

```tsx
import { PricingCard } from '@kasoma/comp-lib';

// Data-prop form — renders a complete tier out of the box:
<PricingCard
  variant="feature"            // minimal | bordered | elevated | glass | gradient | feature
  name="Pro"
  price={29}
  period="/mo"
  features={['SSO & SAML', 'Audit log', '99.9% SLA']}
  cta="Upgrade"
  ribbon="Most popular"
/>

// Slot composition — full structural control:
<PricingCard variant="gradient">
  <PricingCard.Header name="Pro" description="For growing teams" />
  <PricingCard.Price amount={29} period="/mo" />
  <PricingCard.Features items={['SSO & SAML', 'Audit log']} />
  <PricingCard.Action>Upgrade</PricingCard.Action>
</PricingCard>
```

| Family | Designs | Blocks |
| ------ | ------- | ------ |
| **Cards** | `minimal · bordered · elevated · glass · gradient · feature` | PricingCard · ProductCard · StatCard · ProfileCard · TestimonialCard · BlogCard |
| **Marketing** | 6 layout designs each | Hero · FeatureGrid · PricingTable · CTASection · FAQ · Testimonials |
| **App UI** | 6 layout designs each | Navbar · Sidebar · Footer · DashboardShell · EmptyState · CommandPalette |
| **Forms / Auth / Commerce** | 6 layout designs each | SignIn · SignUp · SettingsForm · ContactForm · CheckoutForm · ProductGrid |

Browse them under **Blocks/** in Storybook — each story shows all 6 designs with copy-paste source, live in every theme.

## Pages & Sections

Beyond individual components, Storybook includes copy-ready compositions that show how the primitives assemble into real screens. All are fully themeable via the theme switcher in the toolbar.

- **Pages** — `Landing`, `Pricing`, `Contact` — complete, multi-section page templates.
- **Sections** — `Marketing`, `Content`, `App Shell`, `Dashboard`, `Auth` — reusable blocks (heroes, feature grids, testimonials, pricing tables, FAQs, footers, dashboards, auth flows).

Each story includes a source panel so you can copy the markup straight into your app.

## Core API

### tv() — Tailwind Variants

Create variant-driven className composers:

```tsx
import { tv } from '@kasoma/comp-lib';

const button = tv({
  base: 'px-4 py-2 rounded font-medium',
  variants: {
    intent: {
      primary: 'bg-brand-600 text-white hover:bg-brand-700',
      secondary: 'bg-gray-200 text-gray-900',
    },
    size: { sm: 'h-8 text-sm', md: 'h-10 text-base' },
  },
  defaultVariants: { intent: 'primary', size: 'md' },
  compoundVariants: [{ intent: 'primary', size: 'lg', class: 'shadow-lg' }],
});

<button className={button({ intent: 'secondary', size: 'sm' })}>Click me</button>;
```

### createComponent() — Polymorphic Components

```tsx
import { createComponent } from '@kasoma/comp-lib';

const Badge = createComponent({
  as: 'span',
  displayName: 'Badge',
  base: 'px-2 py-1 rounded text-xs font-medium',
  variants: {
    variant: {
      default: 'bg-gray-100 text-gray-900',
      success: 'bg-success-100 text-success-900',
    },
  },
  defaultVariants: { variant: 'default' },
});

<Badge as="div" variant="success" tw="inline-flex items-center gap-1">
  Active
</Badge>;
```

### createSlots() — Compound Components

```tsx
import { createSlots } from '@kasoma/comp-lib';

const Alert = createSlots({
  root: { base: 'p-4 rounded-lg border border-gray-200' },
  title: { base: 'font-semibold text-lg text-gray-900' },
  description: { base: 'text-sm text-gray-600 mt-1' },
});

<Alert.Root>
  <Alert.Title>Success</Alert.Title>
  <Alert.Description>Your changes have been saved.</Alert.Description>
</Alert.Root>;
```

### Utility Functions

- **mergeTw(...classes)** — Tailwind-aware class merging via `tailwind-merge`.
- **cx(...classes)** — simple class name joiner.

## The `tw` Prop

All components support the `tw` prop for ad-hoc styling and theming:

```tsx
<Button intent="primary" tw="rounded-full shadow-2xl">Custom Styled</Button>
<Input label="Name" tw="max-w-sm" />
```

## Hooks

- **useStableId(prefix?)** — SSR-safe ID generation
- **useLockScroll(lock)** — lock body scroll (for modals/drawers)
- **useFocusTrap(ref, active)** — trap focus within an element
- **useFocusReturn()** — return focus on unmount
- **useIsomorphicLayoutEffect** — SSR-safe layout effect

## Accessibility

All components follow WCAG 2.1 AA guidelines:

- Semantic HTML with proper ARIA attributes
- Keyboard navigation (Tab, Arrow keys, Enter, Escape)
- Focus management and visible focus states
- Screen reader support with `aria-live`, `aria-describedby`, etc.
- Color contrast compliance
- Reduced motion support via `prefers-reduced-motion`

## SSR Support

All components are SSR-safe and compatible with Next.js (App & Pages Router), Remix, Gatsby, and any React SSR framework. The library uses React 18's `useId` for hydration-safe IDs and guards browser APIs behind `window` checks.

## Development

```bash
npm install          # install dependencies
npm run storybook    # start Storybook (lands on Intro / Welcome)
npm run build        # build the library
npm test             # run tests (Vitest)
npm run typecheck    # type-check (tsc --noEmit)
npm run lint         # lint (ESLint)
```

## Publishing

This library uses [semantic-release](https://github.com/semantic-release/semantic-release) for automated versioning and publishing.

Commit message format:

- `feat: ...` → minor version bump
- `fix: ...` → patch version bump
- `BREAKING CHANGE: ...` → major version bump

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or PR.

---

Built with Tailwind CSS, TypeScript, and React 18.
