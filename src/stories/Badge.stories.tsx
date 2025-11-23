import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: `
# Badge

Label or status indicator component with multiple variants and sizes. Perfect for tags, counts, and status indicators.

## Import
\`\`\`tsx
import { Badge } from '@kasomaibrahim/comp-lib';
\`\`\`

## Props

- **variant**: 'default' | 'success' | 'warning' | 'danger' | 'info' (default: 'default')
- **size**: 'sm' | 'md' | 'lg' (default: 'md')
- **tw**: string - Additional Tailwind classes

## Examples

\`\`\`tsx
// Basic badge
<Badge>New</Badge>

// Success status
<Badge variant="success">Active</Badge>

// Danger status
<Badge variant="danger">Error</Badge>

// Warning
<Badge variant="warning">Pending</Badge>

// Info
<Badge variant="info">Beta</Badge>

// Different sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>

// With counts
<Badge variant="danger">5</Badge>
<Badge variant="info">New: 12</Badge>
\`\`\`

## Variants

- **default** - Gray badge for general use
- **success** - Green for positive states
- **warning** - Yellow for warnings
- **danger** - Red for errors/critical
- **info** - Blue for informational

## Use Cases

- Status indicators
- Tags and categories
- Notification counts
- Feature badges
- Version labels
        `
      }
    }
  },
  tags: ['autodocs']
};
export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * Playground - Interactive badge with all props
 */
export const Playground: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'md'
  }
};

/**
 * All Variant Types
 * Shows all 5 available variants
 */
export const VariantTypes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Default</h3>
        <Badge variant="default">Default Badge</Badge>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Primary</h3>
        <Badge variant="primary">Primary Badge</Badge>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Success</h3>
        <Badge variant="success">Success Badge</Badge>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Danger</h3>
        <Badge variant="danger">Danger Badge</Badge>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Warning</h3>
        <Badge variant="warning">Warning Badge</Badge>
      </div>
    </div>
  )
};

/**
 * Variant Comparison
 * All variants side by side
 */
export const VariantComparison: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="warning">Warning</Badge>
    </div>
  )
};

/**
 * All Size Variants
 * Shows all 3 available sizes
 */
export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Small</h3>
        <Badge size="sm">Small Badge</Badge>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Medium (Default)</h3>
        <Badge size="md">Medium Badge</Badge>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Large</h3>
        <Badge size="lg">Large Badge</Badge>
      </div>
    </div>
  )
};

/**
 * Size Comparison
 * All sizes side by side
 */
export const SizeComparison: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  )
};

/**
 * Status Indicators
 * Common use case for status badges
 */
export const StatusIndicators: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Server Status:</span>
        <Badge variant="success">Online</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Payment Status:</span>
        <Badge variant="warning">Pending</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Connection:</span>
        <Badge variant="danger">Offline</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Verification:</span>
        <Badge variant="primary">Verified</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Role:</span>
        <Badge variant="default">Admin</Badge>
      </div>
    </div>
  )
};

/**
 * Count Badges
 * Numeric indicators and counters
 */
export const CountBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Notification Counts</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Messages</span>
            <Badge variant="primary" size="sm">5</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Alerts</span>
            <Badge variant="danger" size="sm">12</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Updates</span>
            <Badge variant="success" size="sm">3</Badge>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">High Numbers</h3>
        <div className="flex gap-2">
          <Badge variant="primary">99+</Badge>
          <Badge variant="danger">1.2k</Badge>
          <Badge variant="success">500</Badge>
        </div>
      </div>
    </div>
  )
};

/**
 * Category Tags
 * Using badges as tags or labels
 */
export const CategoryTags: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Technologies</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary">React</Badge>
          <Badge variant="primary">TypeScript</Badge>
          <Badge variant="primary">Tailwind</Badge>
          <Badge variant="primary">Storybook</Badge>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Article Tags</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">JavaScript</Badge>
          <Badge variant="default">Tutorial</Badge>
          <Badge variant="default">Web Development</Badge>
          <Badge variant="default">Best Practices</Badge>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Product Labels</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">In Stock</Badge>
          <Badge variant="warning">Low Stock</Badge>
          <Badge variant="danger">Out of Stock</Badge>
          <Badge variant="primary">New Arrival</Badge>
        </div>
      </div>
    </div>
  )
};

/**
 * Complete Variant Matrix
 * All variants across all sizes
 */
export const VariantMatrix: Story = {
  render: () => (
    <div className="space-y-6">
      {['default', 'primary', 'success', 'danger', 'warning'].map((variant) => (
        <div key={variant}>
          <h3 className="text-sm font-semibold mb-3 text-gray-700 capitalize">{variant}</h3>
          <div className="flex items-center gap-3">
            <Badge variant={variant as any} size="sm">Small</Badge>
            <Badge variant={variant as any} size="md">Medium</Badge>
            <Badge variant={variant as any} size="lg">Large</Badge>
          </div>
        </div>
      ))}
    </div>
  )
};

/**
 * In Context Examples
 * Real-world usage scenarios
 */
export const InContextExamples: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">User Card with Badges</h3>
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">John Doe</h4>
              <p className="text-sm text-gray-500">Software Engineer</p>
            </div>
            <Badge variant="success">Active</Badge>
          </div>
          <div className="flex gap-2 mt-3">
            <Badge variant="primary" size="sm">Admin</Badge>
            <Badge variant="default" size="sm">Premium</Badge>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Notification List</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <span className="text-sm text-gray-900">New message received</span>
            <Badge variant="primary" size="sm">New</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <span className="text-sm text-gray-900">Payment successful</span>
            <Badge variant="success" size="sm">Success</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <span className="text-sm text-gray-900">Action required</span>
            <Badge variant="warning" size="sm">Pending</Badge>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Dashboard Stats</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">1,234</div>
            <div className="text-sm text-gray-500 mt-1">Total Users</div>
            <Badge variant="success" size="sm" tw="mt-2">+12%</Badge>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">567</div>
            <div className="text-sm text-gray-500 mt-1">Active Now</div>
            <Badge variant="primary" size="sm" tw="mt-2">Live</Badge>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">89</div>
            <div className="text-sm text-gray-500 mt-1">Pending</div>
            <Badge variant="warning" size="sm" tw="mt-2">Review</Badge>
          </div>
        </div>
      </div>
    </div>
  )
};

/**
 * Custom Styling
 * Using the tw prop for custom styles
 */
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Custom Border Radius</h3>
        <div className="flex gap-2">
          <Badge tw="rounded-none">Square</Badge>
          <Badge tw="rounded-full">Pill</Badge>
          <Badge tw="rounded-xl">Extra Rounded</Badge>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Custom Styling</h3>
        <div className="flex gap-2">
          <Badge tw="font-bold uppercase tracking-wide">Bold</Badge>
          <Badge tw="italic">Italic</Badge>
          <Badge tw="border-2 border-gray-400">Bordered</Badge>
        </div>
      </div>
    </div>
  )
};
