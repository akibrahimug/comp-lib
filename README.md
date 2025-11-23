# @kasomaibrahim/comp-lib

A Tailwind-first, variant-driven, polymorphic React component library built for modern web applications.

## Documentation

- **[Complete Component Documentation](./COMPONENT_DOCS.md)** - Comprehensive docs with examples, theme config, and all variants for each component
- **[Implementation Guide](./COMPONENT_GUIDE.md)** - Patterns and architecture for building new components
- **Storybook** - Run `npm run storybook` to view interactive examples

## Features

- **Tailwind-First**: All components styled with Tailwind CSS
- **Variant System**: Powerful `tv()` function for composable, type-safe variants
- **Polymorphic**: Use the `as` prop to render components as any HTML element
- **TypeScript**: Full type safety with excellent IntelliSense
- **Accessible**: WCAG AA compliant with keyboard navigation and ARIA support
- **Tree-Shakable**: Only bundle what you use (`sideEffects: false`)
- **SSR-Safe**: Works seamlessly with Next.js, Remix, and other SSR frameworks
- **Customizable**: Use the `tw` prop to extend styles at call-site

## Installation

```bash
npm install @kasomaibrahim/comp-lib react react-dom tailwindcss
```

### Peer Dependencies

- `react` >= 18
- `react-dom` >= 18
- `tailwindcss` >= 3

## Quick Start

```tsx
import { Button, Input, Dialog } from '@kasomaibrahim/comp-lib';

function App() {
  return (
    <>
      <Button intent="primary" size="md">
        Save Changes
      </Button>

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
      />
    </>
  );
}
```

## Tailwind Configuration

Add the library to your Tailwind content paths:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@kasomaibrahim/comp-lib/dist/**/*.{js,ts,jsx,tsx}',
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

## Components (17 Total)

> For complete documentation with all variants, sizes, and examples, see [COMPONENT_DOCS.md](./COMPONENT_DOCS.md)

### Form Components (7)

- **[Button](./COMPONENT_DOCS.md#button)** - Polymorphic button with variants (primary, secondary, danger, ghost) and 3 sizes
- **[Input](./COMPONENT_DOCS.md#input)** - Text input with label, description, error states, prefix/suffix icons
- **[Textarea](./COMPONENT_DOCS.md#textarea)** - Multi-line input with auto-resize and character counter
- **[Select](./COMPONENT_DOCS.md#select)** - Native select with custom styling
- **[Checkbox](./COMPONENT_DOCS.md#checkbox)** - Checkbox with indeterminate state support
- **[Radio](./COMPONENT_DOCS.md#radio)** - Radio button with label and description
- **[Toggle](./COMPONENT_DOCS.md#toggle)** - Switch/toggle component with ARIA switch role

### Layout Components (5)

- **[Card](./COMPONENT_DOCS.md#card)** - Compound component (Root, Header, Title, Description, Content, Footer)
- **[Tabs](./COMPONENT_DOCS.md#tabs)** - Accessible tabs with roving tabindex and keyboard navigation
- **[Dialog](./COMPONENT_DOCS.md#dialog)** - Modal with focus trap, scroll lock, and ESC to close
- **[Drawer](./COMPONENT_DOCS.md#drawer)** - Slide-in panel from any direction (left, right, top, bottom)
- **[Tooltip](./COMPONENT_DOCS.md#tooltip)** - Hover/focus tooltip with 4 positions

### Feedback Components (3)

- **[Toast](./COMPONENT_DOCS.md#toast)** - Toast notifications with manager (success, error, warning, info)
- **[Spinner](./COMPONENT_DOCS.md#spinner)** - Loading spinner with 3 sizes and multiple colors
- **[LoadingOverlay](./COMPONENT_DOCS.md#loadingoverlay)** - Full-page loading overlay with spinner

### Display Components (2)

- **[Avatar](./COMPONENT_DOCS.md#avatar)** - Profile images with 6 sizes (xs-2xl) and initials fallback
- **[Badge](./COMPONENT_DOCS.md#badge)** - Labels and status indicators with 5 variants and 3 sizes

### Media Components (2)

- **[Gallery](./COMPONENT_DOCS.md#gallery)** - Image gallery with grid layouts and lightbox support
- **[Carousel](./COMPONENT_DOCS.md#carousel)** - Slideshow component with auto-play and navigation

## Core API

### tv() - Tailwind Variants

Create variant-driven className composers:

```tsx
import { tv } from '@kasomaibrahim/comp-lib';

const button = tv({
  base: 'px-4 py-2 rounded font-medium',
  variants: {
    intent: {
      primary: 'bg-brand-600 text-white hover:bg-brand-700',
      secondary: 'bg-gray-200 text-gray-900',
    },
    size: {
      sm: 'h-8 text-sm',
      md: 'h-10 text-base',
    },
  },
  defaultVariants: { intent: 'primary', size: 'md' },
  compoundVariants: [
    { intent: 'primary', size: 'lg', class: 'shadow-lg' },
  ],
});

// Use it
<button className={button({ intent: 'secondary', size: 'sm' })}>
  Click me
</button>
```

### createComponent() - Polymorphic Components

Build polymorphic components with variant support:

```tsx
import { createComponent } from '@kasomaibrahim/comp-lib';

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

// Use with polymorphism
<Badge as="div" variant="success" tw="inline-flex items-center gap-1">
  Active
</Badge>
```

### createSlots() - Compound Components

Create compound components with shared context:

```tsx
import { createSlots } from '@kasomaibrahim/comp-lib';

const Alert = createSlots({
  root: { base: 'p-4 rounded-lg border border-gray-200' },
  title: { base: 'font-semibold text-lg text-gray-900' },
  description: { base: 'text-sm text-gray-600 mt-1' },
});

// Use it
<Alert.Root>
  <Alert.Title>Success</Alert.Title>
  <Alert.Description>Your changes have been saved.</Alert.Description>
</Alert.Root>
```

### Utility Functions

- **mergeTw(...classes)**: Tailwind-aware class merging using `tailwind-merge`
- **cx(...classes)**: Simple class name joiner

## The `tw` Prop

All components support the `tw` prop for ad-hoc styling:

```tsx
<Button intent="primary" tw="rounded-full shadow-2xl">
  Custom Styled Button
</Button>

<Input label="Name" tw="max-w-sm" />
```

## Hooks

- **useStableId(prefix?)**: SSR-safe ID generation
- **useLockScroll(lock)**: Lock body scroll (for modals)
- **useFocusTrap(ref, active)**: Trap focus within element
- **useFocusReturn()**: Return focus on unmount
- **useIsomorphicLayoutEffect**: SSR-safe layout effect

## Accessibility

All components follow WCAG 2.1 AA guidelines:

- Semantic HTML with proper ARIA attributes
- Keyboard navigation (Tab, Arrow keys, Enter, Escape)
- Focus management and visible focus states
- Screen reader support with `aria-live`, `aria-describedby`, etc.
- Color contrast compliance
- Reduced motion support via `prefers-reduced-motion`

## SSR Support

All components are SSR-safe and compatible with:

- **Next.js** (App Router & Pages Router)
- **Remix**
- **Gatsby**
- Any React SSR framework

The library uses React 18's `useId` for hydration-safe IDs and checks for `window` before accessing browser APIs.

## Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Build library
npm run build

# Run tests
npm test

# Type check
npm run typecheck
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

## Storybook

View the full component documentation and interactive examples:

```bash
npm run storybook
```

Or visit the deployed Storybook (if configured).

---

Built with Tailwind CSS, TypeScript, and React 18.
