# Component Library - Complete Documentation

Comprehensive documentation for all components with usage examples, theme configuration, and variants.

---

## Table of Contents

### Form Components
- [Button](#button)
- [Input](#input)
- [Textarea](#textarea)
- [Select](#select)
- [Checkbox](#checkbox)
- [Radio](#radio)
- [Toggle](#toggle)

### Layout Components
- [Card](#card)
- [Tabs](#tabs)

### Feedback Components
- [Toast](#toast)
- [Spinner](#spinner)
- [LoadingOverlay](#loadingoverlay)
- [Tooltip](#tooltip)
- [Dialog](#dialog)
- [Drawer](#drawer)

### Display Components
- [Avatar](#avatar)
- [Badge](#badge)

---

## Button

Interactive button component with multiple variants, sizes, and states.

### Default Theme Configuration

```js
// tailwind.config.cjs - Button colors
colors: {
  brand: {
    DEFAULT: "#005BBB",
    600: "#005BBB",
    700: "#004E9F",
    800: "#003E7D"
  },
  gray: {
    100: "#F2F4F7",
    200: "#EAECF0",
    400: "#98A2B3",
    900: "#101828"
  },
  danger: {
    600: "#DC2626",
    700: "#B91C1C"
  }
}

// Button variants configuration
variants: {
  intent: {
    primary: 'bg-brand-600 text-white hover:bg-brand-700',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    danger: 'bg-danger-600 text-white hover:bg-danger-700',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-900'
  },
  size: {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-11 px-6 text-base'
  }
}
```

### Import

```tsx
import { Button } from '@yourorg/component-library';
```

### Basic Usage

```tsx
<Button>Click me</Button>
<Button intent="secondary">Secondary</Button>
<Button intent="danger">Delete</Button>
<Button intent="ghost">Cancel</Button>
```

### Variants

#### Intent Variants
```tsx
// Primary (default)
<Button intent="primary">Primary Button</Button>

// Secondary
<Button intent="secondary">Secondary Button</Button>

// Danger
<Button intent="danger">Delete Item</Button>

// Ghost
<Button intent="ghost">Cancel</Button>
```

#### Size Variants
```tsx
// Small
<Button size="sm">Small</Button>

// Medium (default)
<Button size="md">Medium</Button>

// Large
<Button size="lg">Large</Button>
```

#### State Variants
```tsx
// Loading state
<Button loading={true}>Loading...</Button>

// Disabled state
<Button disabled>Disabled</Button>

// Full width
<Button fullWidth>Full Width Button</Button>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `intent` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the button |
| `loading` | `boolean` | `false` | Shows loading state |
| `fullWidth` | `boolean` | `false` | Makes button full width |
| `disabled` | `boolean` | `false` | Disables the button |
| `as` | `React.ElementType` | `'button'` | Change the rendered element |
| `tw` | `string` | - | Additional Tailwind classes |

### Advanced Examples

```tsx
// Polymorphic rendering
<Button as="a" href="/dashboard">
  Go to Dashboard
</Button>

// Custom styling with tw prop
<Button tw="shadow-lg">
  Custom Shadow
</Button>

// With icons
<Button>
  <SaveIcon className="w-4 h-4" />
  Save Changes
</Button>
```

### Accessibility

- Keyboard navigation: ✅ Native `<button>` behavior
- Focus visible: ✅ `focus:ring-2` indicator
- ARIA: ✅ Supports all native button ARIA attributes
- Disabled state: ✅ `disabled:opacity-60 disabled:cursor-not-allowed`

---

## Input

Text input field with label, description, error states, and icon support.

### Default Theme Configuration

```js
// Input colors
colors: {
  gray: {
    200: "#EAECF0",  // Border
    300: "#D0D5DD",  // Hover border
    400: "#98A2B3",  // Icon color
    500: "#667085",  // Description text
    700: "#344054",  // Label text
    900: "#101828"   // Input text
  },
  brand: {
    600: "#005BBB"   // Focus ring
  },
  danger: {
    600: "#DC2626"   // Error color
  }
}

// Input configuration
base: 'w-full px-3 py-2 border border-gray-200 rounded-md'
focus: 'focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600'
error: 'border-danger-600 focus:ring-danger-600'
```

### Import

```tsx
import { Input } from '@yourorg/component-library';
```

### Basic Usage

```tsx
<Input
  label="Email"
  placeholder="Enter your email"
/>
```

### Variants

#### With Label and Description
```tsx
<Input
  label="Username"
  description="Choose a unique username"
  placeholder="johndoe"
/>
```

#### Error State
```tsx
<Input
  label="Password"
  error="Password must be at least 8 characters"
  defaultValue="short"
/>
```

#### With Prefix Icon
```tsx
<Input
  label="Search"
  placeholder="Search..."
  prefixIcon={<SearchIcon className="w-4 h-4" />}
/>
```

#### With Suffix Icon
```tsx
<Input
  label="Website"
  placeholder="https://example.com"
  suffixIcon={<LinkIcon className="w-4 h-4" />}
/>
```

#### Required Field
```tsx
<Input
  label="Email"
  required
  placeholder="you@example.com"
/>
```

#### Disabled State
```tsx
<Input
  label="Locked Field"
  disabled
  value="Cannot edit this"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Input label text |
| `description` | `string` | - | Helper text below input |
| `error` | `string` | - | Error message (shows error state) |
| `required` | `boolean` | `false` | Shows required asterisk |
| `prefixIcon` | `ReactNode` | - | Icon before input |
| `suffixIcon` | `ReactNode` | - | Icon after input |
| `disabled` | `boolean` | `false` | Disables the input |
| `tw` | `string` | - | Additional Tailwind classes |

### Accessibility

- Labels: ✅ Properly associated with `htmlFor`
- Required: ✅ Visual indicator with `*`
- Error: ✅ `aria-invalid` and `aria-describedby`
- Focus: ✅ Clear focus ring

---

## Textarea

Multi-line text input with auto-resize and character counting.

### Default Theme Configuration

```js
// Same color system as Input
base: 'w-full px-3 py-2 border border-gray-200 rounded-md resize-none'
focus: 'focus:outline-none focus:ring-2 focus:ring-brand-600'
```

### Import

```tsx
import { Textarea } from '@yourorg/component-library';
```

### Basic Usage

```tsx
<Textarea
  label="Description"
  placeholder="Enter description"
/>
```

### Variants

#### With Character Counter
```tsx
<Textarea
  label="Bio"
  maxLength={200}
  defaultValue="Web developer and designer"
/>
// Shows: "26 / 200" counter
```

#### Auto-resize
```tsx
<Textarea
  label="Comments"
  placeholder="Your comments..."
  rows={3}
/>
// Automatically expands as you type
```

#### With Description
```tsx
<Textarea
  label="Feedback"
  description="Please provide detailed feedback"
  rows={4}
/>
```

#### Error State
```tsx
<Textarea
  label="Message"
  error="Message is required"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Textarea label |
| `description` | `string` | - | Helper text |
| `error` | `string` | - | Error message |
| `maxLength` | `number` | - | Max characters (shows counter) |
| `rows` | `number` | `3` | Initial rows |
| `required` | `boolean` | `false` | Required field indicator |
| `tw` | `string` | - | Additional classes |

---

## Card

Container component with compound slots for structured content.

### Default Theme Configuration

```js
// Card colors and shadows
colors: {
  gray: {
    100: "#F2F4F7",  // Header background
    200: "#EAECF0",  // Border
    500: "#667085",  // Description text
    700: "#344054",  // Title text
  }
}
boxShadow: {
  card: "0 1px 2px rgba(16,24,40,0.05), 0 4px 8px rgba(16,24,40,0.06)"
}

// Card configuration
root: 'bg-white border border-gray-200 rounded-xl shadow-card'
header: 'px-6 py-4 border-b border-gray-200'
```

### Import

```tsx
import { Card } from '@yourorg/component-library';
```

### Basic Usage

```tsx
<Card.Root>
  <Card.Content>
    Simple card content
  </Card.Content>
</Card.Root>
```

### Variants

#### With Header
```tsx
<Card.Root>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card description text</Card.Description>
  </Card.Header>
  <Card.Content>
    Main content goes here
  </Card.Content>
</Card.Root>
```

#### With Footer
```tsx
<Card.Root>
  <Card.Header>
    <Card.Title>Confirm Action</Card.Title>
  </Card.Header>
  <Card.Content>
    Are you sure you want to proceed?
  </Card.Content>
  <Card.Footer>
    <Button intent="secondary">Cancel</Button>
    <Button intent="primary">Confirm</Button>
  </Card.Footer>
</Card.Root>
```

#### Complete Example
```tsx
<Card.Root>
  <Card.Header>
    <Card.Title>Profile Settings</Card.Title>
    <Card.Description>
      Update your profile information
    </Card.Description>
  </Card.Header>
  <Card.Content>
    <Input label="Name" defaultValue="John Doe" />
    <Input label="Email" defaultValue="john@example.com" />
  </Card.Content>
  <Card.Footer>
    <Button intent="secondary">Cancel</Button>
    <Button>Save Changes</Button>
  </Card.Footer>
</Card.Root>
```

### Compound Components

| Component | Description |
|-----------|-------------|
| `Card.Root` | Container wrapper |
| `Card.Header` | Header section with border |
| `Card.Title` | Title text |
| `Card.Description` | Description text |
| `Card.Content` | Main content area |
| `Card.Footer` | Footer with actions |

### Props

All compound components accept:
- `as`: Change rendered element
- `tw`: Additional Tailwind classes
- Standard HTML attributes

---

## Checkbox

Checkbox input with indeterminate state support.

### Default Theme Configuration

```js
// Checkbox colors
colors: {
  brand: {
    600: "#005BBB"  // Checked background
  },
  gray: {
    200: "#EAECF0",  // Border
    700: "#344054"   // Label text
  }
}

// Checkbox configuration
base: 'w-4 h-4 rounded border-2 border-gray-200'
checked: 'bg-brand-600 border-brand-600'
```

### Import

```tsx
import { Checkbox } from '@yourorg/component-library';
```

### Variants

#### Basic Checkbox
```tsx
<Checkbox label="Accept terms and conditions" />
```

#### With Description
```tsx
<Checkbox
  label="Email notifications"
  description="Receive updates via email"
/>
```

#### Indeterminate State
```tsx
<Checkbox
  label="Select all"
  indeterminate={true}
/>
```

#### Controlled
```tsx
const [checked, setChecked] = useState(false);

<Checkbox
  label="Subscribe to newsletter"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Checkbox label |
| `description` | `string` | - | Helper text |
| `indeterminate` | `boolean` | `false` | Indeterminate state |
| `checked` | `boolean` | - | Controlled checked state |
| `defaultChecked` | `boolean` | - | Uncontrolled default |
| `disabled` | `boolean` | `false` | Disabled state |

---

## Radio

Radio button for mutually exclusive selections.

### Default Theme Configuration

```js
// Same color system as Checkbox
base: 'w-4 h-4 rounded-full border-2 border-gray-200'
checked: 'border-[6px] border-brand-600'
```

### Import

```tsx
import { Radio } from '@yourorg/component-library';
```

### Variants

#### Radio Group
```tsx
<div>
  <Radio name="plan" value="basic" label="Basic Plan" />
  <Radio name="plan" value="pro" label="Pro Plan" />
  <Radio name="plan" value="enterprise" label="Enterprise Plan" />
</div>
```

#### With Description
```tsx
<Radio
  name="plan"
  value="pro"
  label="Pro Plan"
  description="$29/month - All features included"
/>
```

#### Disabled
```tsx
<Radio
  label="Unavailable Option"
  disabled
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Radio label |
| `description` | `string` | - | Helper text |
| `name` | `string` | - | Group name |
| `value` | `string` | - | Radio value |
| `disabled` | `boolean` | `false` | Disabled state |

---

## Toggle

Switch/toggle component with ARIA support.

### Default Theme Configuration

```js
// Toggle colors
colors: {
  brand: {
    600: "#005BBB"  // Active background
  },
  gray: {
    200: "#EAECF0"  // Inactive background
  }
}

// Toggle configuration
track: 'w-11 h-6 rounded-full transition-colors'
thumb: 'w-5 h-5 bg-white rounded-full shadow-sm transition-transform'
```

### Import

```tsx
import { Toggle } from '@yourorg/component-library';
```

### Variants

#### Basic Toggle
```tsx
<Toggle label="Enable notifications" />
```

#### With Description
```tsx
<Toggle
  label="Dark mode"
  description="Use dark theme across the app"
/>
```

#### Controlled
```tsx
const [enabled, setEnabled] = useState(false);

<Toggle
  label="Auto-save"
  checked={enabled}
  onChange={setEnabled}
/>
```

#### Disabled
```tsx
<Toggle
  label="Premium feature"
  disabled
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Toggle label |
| `description` | `string` | - | Helper text |
| `checked` | `boolean` | - | Controlled state |
| `defaultChecked` | `boolean` | - | Uncontrolled default |
| `onChange` | `(checked: boolean) => void` | - | Change handler |
| `disabled` | `boolean` | `false` | Disabled state |

---

## Select

Native select with custom styling.

### Default Theme Configuration

```js
// Same styling as Input
base: 'w-full px-3 py-2 pr-10 border border-gray-200 rounded-md'
focus: 'focus:outline-none focus:ring-2 focus:ring-brand-600'
```

### Import

```tsx
import { Select } from '@yourorg/component-library';
```

### Variants

#### Basic Select
```tsx
<Select label="Country">
  <option value="">Select a country</option>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
  <option value="ca">Canada</option>
</Select>
```

#### With Description
```tsx
<Select
  label="Payment Method"
  description="Choose your preferred payment method"
>
  <option value="card">Credit Card</option>
  <option value="paypal">PayPal</option>
  <option value="bank">Bank Transfer</option>
</Select>
```

#### Error State
```tsx
<Select
  label="Role"
  error="Please select a role"
>
  <option value="">Select role</option>
  <option value="admin">Admin</option>
  <option value="user">User</option>
</Select>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Select label |
| `description` | `string` | - | Helper text |
| `error` | `string` | - | Error message |
| `required` | `boolean` | `false` | Required indicator |
| `disabled` | `boolean` | `false` | Disabled state |

---

## Tabs

Tab navigation with keyboard support and roving tabindex.

### Default Theme Configuration

```js
// Tabs colors
colors: {
  brand: {
    600: "#005BBB"  // Active tab
  },
  gray: {
    100: "#F2F4F7",  // Tab background
    500: "#667085",  // Inactive tab text
    900: "#101828"   // Active tab text
  }
}

// Tabs configuration
list: 'flex border-b border-gray-200'
tab: 'px-4 py-2 font-medium transition-colors'
active: 'border-b-2 border-brand-600 text-brand-600'
```

### Import

```tsx
import { Tabs } from '@yourorg/component-library';
```

### Variants

#### Basic Tabs
```tsx
<Tabs.List>
  <Tabs.Tab value="overview">Overview</Tabs.Tab>
  <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
  <Tabs.Tab value="settings">Settings</Tabs.Tab>
</Tabs.List>

<Tabs.Panel value="overview">
  Overview content
</Tabs.Panel>
<Tabs.Panel value="analytics">
  Analytics content
</Tabs.Panel>
<Tabs.Panel value="settings">
  Settings content
</Tabs.Panel>
```

#### Vertical Tabs
```tsx
<Tabs.List orientation="vertical">
  <Tabs.Tab value="profile">Profile</Tabs.Tab>
  <Tabs.Tab value="security">Security</Tabs.Tab>
</Tabs.List>
```

### Accessibility

- Keyboard: ✅ Arrow keys navigate tabs
- Focus: ✅ Roving tabindex
- ARIA: ✅ `role="tablist"`, `role="tab"`, `role="tabpanel"`

---

## Tooltip

Positioned tooltip with customizable placement.

### Default Theme Configuration

```js
// Tooltip colors
colors: {
  gray: {
    800: "#1D2939"  // Tooltip background
  }
}

// Tooltip configuration
base: 'bg-gray-800 text-white text-sm px-3 py-2 rounded-md shadow-lg'
```

### Import

```tsx
import { Tooltip } from '@yourorg/component-library';
```

### Variants

#### Basic Tooltip
```tsx
<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>
```

#### Positions
```tsx
// Top (default)
<Tooltip content="Top tooltip" position="top">
  <Button>Top</Button>
</Tooltip>

// Right
<Tooltip content="Right tooltip" position="right">
  <Button>Right</Button>
</Tooltip>

// Bottom
<Tooltip content="Bottom tooltip" position="bottom">
  <Button>Bottom</Button>
</Tooltip>

// Left
<Tooltip content="Left tooltip" position="left">
  <Button>Left</Button>
</Tooltip>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | - | Tooltip content |
| `position` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | Tooltip position |
| `children` | `ReactElement` | - | Trigger element |

---

## Dialog

Modal dialog with focus trap and scroll lock.

### Default Theme Configuration

```js
// Dialog colors
overlay: 'bg-black/50'
dialog: 'bg-white rounded-xl shadow-xl max-w-md w-full'
```

### Import

```tsx
import { Dialog } from '@yourorg/component-library';
```

### Variants

#### Basic Dialog
```tsx
const [open, setOpen] = useState(false);

<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Overlay />
  <Dialog.Content>
    <Dialog.Title>Dialog Title</Dialog.Title>
    <Dialog.Description>
      This is the dialog description
    </Dialog.Description>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </Dialog.Content>
</Dialog.Root>
```

#### Confirmation Dialog
```tsx
<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Overlay />
  <Dialog.Content>
    <Dialog.Title>Delete Item?</Dialog.Title>
    <Dialog.Description>
      This action cannot be undone.
    </Dialog.Description>
    <div className="flex gap-2 mt-4">
      <Button intent="secondary" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button intent="danger" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  </Dialog.Content>
</Dialog.Root>
```

### Features

- ✅ Focus trap - Focus stays within dialog
- ✅ Scroll lock - Body scroll disabled when open
- ✅ ESC to close - Press ESC to dismiss
- ✅ Click outside - Click overlay to close

---

## Drawer

Slide-in panel from any direction.

### Default Theme Configuration

```js
// Drawer animations (from tailwind.config.cjs)
keyframes: {
  "slide-in-from-right": { "0%": { transform: "translateX(100%)" }},
  "slide-in-from-left": { "0%": { transform: "translateX(-100%)" }},
  "slide-in-from-top": { "0%": { transform: "translateY(-100%)" }},
  "slide-in-from-bottom": { "0%": { transform: "translateY(100%)" }}
}
```

### Import

```tsx
import { Drawer } from '@yourorg/component-library';
```

### Variants

#### Right Drawer (default)
```tsx
<Drawer.Root open={open} onOpenChange={setOpen}>
  <Drawer.Overlay />
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Drawer Title</Drawer.Title>
    </Drawer.Header>
    <Drawer.Body>
      Drawer content
    </Drawer.Body>
  </Drawer.Content>
</Drawer.Root>
```

#### Different Positions
```tsx
// Left
<Drawer.Content position="left">...</Drawer.Content>

// Top
<Drawer.Content position="top">...</Drawer.Content>

// Bottom
<Drawer.Content position="bottom">...</Drawer.Content>
```

---

## Toast

Notification system with multiple variants.

### Default Theme Configuration

```js
// Toast colors
colors: {
  success: { 600: "#16A34A" },
  danger: { 600: "#DC2626" },
  info: { 600: "#0284C7" },
  accent: { 600: "#F59E0B" }  // Warning
}
```

### Import

```tsx
import { Toast, useToast } from '@yourorg/component-library';
```

### Variants

#### Using Toast Hook
```tsx
const { toast } = useToast();

// Success
toast.success('Changes saved successfully!');

// Error
toast.error('Failed to save changes');

// Info
toast.info('New update available');

// Warning
toast.warning('Your session will expire soon');
```

#### Toast Provider
```tsx
// In your app root
<ToastProvider>
  <App />
</ToastProvider>
```

### Props

| Method | Description |
|--------|-------------|
| `toast.success(message)` | Show success toast |
| `toast.error(message)` | Show error toast |
| `toast.info(message)` | Show info toast |
| `toast.warning(message)` | Show warning toast |

---

## Spinner

Loading spinner with sizes and colors.

### Default Theme Configuration

```js
// Spinner animation
keyframes: {
  spin: {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" }
  }
}

// Spinner variants
size: {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-3'
}
```

### Import

```tsx
import { Spinner } from '@yourorg/component-library';
```

### Variants

#### Sizes
```tsx
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
```

#### Colors
```tsx
<Spinner color="brand" />
<Spinner color="danger" />
<Spinner color="success" />
```

#### With Label
```tsx
<div className="flex items-center gap-2">
  <Spinner />
  <span>Loading...</span>
</div>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Spinner size |
| `color` | `'brand' \| 'danger' \| 'success' \| 'white'` | `'brand'` | Spinner color |

---

## Avatar

Profile image component with fallback initials.

### Default Theme Configuration

```js
// Avatar sizes
size: {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
  '2xl': 'w-20 h-20 text-2xl'
}
```

### Import

```tsx
import { Avatar } from '@yourorg/component-library';
```

### Variants

#### With Image
```tsx
<Avatar src="/user.jpg" alt="John Doe" />
```

#### With Initials Fallback
```tsx
<Avatar name="John Doe" />
// Shows "JD"
```

#### Sizes
```tsx
<Avatar src="/user.jpg" size="xs" />
<Avatar src="/user.jpg" size="sm" />
<Avatar src="/user.jpg" size="md" />
<Avatar src="/user.jpg" size="lg" />
<Avatar src="/user.jpg" size="xl" />
<Avatar src="/user.jpg" size="2xl" />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image URL |
| `alt` | `string` | - | Image alt text |
| `name` | `string` | - | Name for initials fallback |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Avatar size |

---

## Badge

Label or status indicator component.

### Default Theme Configuration

```js
// Badge variants
variants: {
  variant: {
    default: 'bg-gray-100 text-gray-900',
    primary: 'bg-brand-100 text-brand-900',
    success: 'bg-success-100 text-success-900',
    danger: 'bg-danger-100 text-danger-900',
    warning: 'bg-accent-100 text-accent-900'
  },
  size: {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  }
}
```

### Import

```tsx
import { Badge } from '@yourorg/component-library';
```

### Variants

#### Variant Types
```tsx
<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="warning">Warning</Badge>
```

#### Sizes
```tsx
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

#### Use Cases
```tsx
// Status indicator
<Badge variant="success">Active</Badge>
<Badge variant="danger">Inactive</Badge>

// Count badge
<Badge variant="primary">5</Badge>

// Category tag
<Badge variant="default">React</Badge>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'success' \| 'danger' \| 'warning'` | `'default'` | Badge style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `tw` | `string` | - | Additional classes |

---

## LoadingOverlay

Full-page loading overlay.

### Import

```tsx
import { LoadingOverlay } from '@yourorg/component-library';
```

### Usage

```tsx
// Show loading overlay
<LoadingOverlay visible={isLoading} />

// With custom message
<LoadingOverlay visible={isLoading} message="Loading data..." />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | `false` | Show/hide overlay |
| `message` | `string` | - | Optional loading message |

---

## Theming

### Customizing Colors

All components use the Tailwind theme. Customize in `tailwind.config.cjs`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Change primary brand color
        brand: {
          DEFAULT: "#YOUR_COLOR",
          600: "#YOUR_COLOR",
          700: "#DARKER_SHADE"
        },
        // Add custom colors
        custom: {
          600: "#123456"
        }
      }
    }
  }
}
```

### Using Custom Classes

Every component accepts a `tw` prop for Tailwind overrides:

```tsx
<Button tw="shadow-xl rounded-full">
  Custom Button
</Button>
```

### Polymorphic Components

Change the rendered element with `as`:

```tsx
<Button as="a" href="/link">Link Button</Button>
<Card.Content as="article">Article Card</Card.Content>
```

---

## Accessibility Checklist

✅ **Keyboard Navigation**: All interactive components support keyboard
✅ **Focus Indicators**: Clear focus rings on all focusable elements
✅ **ARIA Labels**: Proper ARIA attributes for screen readers
✅ **Semantic HTML**: Using correct HTML elements
✅ **Color Contrast**: WCAG AA compliant color ratios
✅ **Focus Trap**: Modals and dialogs trap focus appropriately
✅ **Live Regions**: Toast notifications use ARIA live regions

---

## Browser Support

- ✅ Chrome (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Edge (latest 2 versions)
- ✅ SSR Compatible - All components work with Next.js/Remix

---

## TypeScript Support

All components are fully typed with TypeScript. Enjoy autocomplete and type safety:

```tsx
import { Button } from '@yourorg/component-library';

// TypeScript will show all valid props and variants
<Button
  intent="primary"  // ✅ Autocomplete shows: primary, secondary, danger, ghost
  size="md"        // ✅ Autocomplete shows: sm, md, lg
  onClick={(e) => {}} // ✅ Proper event types
/>
```

---

## Performance

- 🎯 **Tree-shakable**: Import only what you use
- 📦 **Small bundle**: ~55KB ESM output
- ⚡ **Zero runtime**: Tailwind CSS (no CSS-in-JS runtime)
- 🚀 **Fast builds**: Optimized build pipeline

---

For implementation patterns and architecture details, see [COMPONENT_GUIDE.md](./COMPONENT_GUIDE.md).
