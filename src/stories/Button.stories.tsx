import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    intent: { control: { type: 'radio' }, options: ['primary','secondary','danger','ghost'] },
    size: { control: { type: 'radio' }, options: ['sm','md','lg'] },
    fullWidth: { control: 'boolean' },
    loading: { control: 'boolean' }
  },
  parameters: {
    docs: {
      page: () => import('./Button.mdx')
    }
  },
  tags: ['autodocs']
};
export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Playground - Interactive button with all props
 */
export const Playground: Story = {
  args: {
    children: 'Button',
    intent: 'primary',
    size: 'md',
    loading: false,
    fullWidth: false,
    disabled: false
  }
};

/**
 * All Intent Variants
 * Shows all available button intents: primary, secondary, danger, and ghost
 */
export const IntentVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Primary</h3>
        <Button intent="primary">Primary Button</Button>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Secondary</h3>
        <Button intent="secondary">Secondary Button</Button>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Danger</h3>
        <Button intent="danger">Delete Item</Button>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Ghost</h3>
        <Button intent="ghost">Cancel</Button>
      </div>
    </div>
  )
};

/**
 * All Size Variants
 * Shows all available sizes: sm, md, lg
 */
export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Small</h3>
        <Button size="sm">Small Button</Button>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Medium (Default)</h3>
        <Button size="md">Medium Button</Button>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Large</h3>
        <Button size="lg">Large Button</Button>
      </div>
    </div>
  )
};

/**
 * Size Comparison
 * All sizes side by side for comparison
 */
export const SizeComparison: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
};

/**
 * State Variants
 * Shows loading, disabled, and full-width states
 */
export const StateVariants: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Loading</h3>
        <Button loading={true}>Processing...</Button>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Disabled</h3>
        <Button disabled>Disabled Button</Button>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Full Width</h3>
        <Button fullWidth>Full Width Button</Button>
      </div>
    </div>
  )
};

/**
 * Complete Variant Matrix
 * All intents across all sizes
 */
export const VariantMatrix: Story = {
  render: () => (
    <div className="space-y-6">
      {['primary', 'secondary', 'danger', 'ghost'].map((intent) => (
        <div key={intent}>
          <h3 className="text-sm font-semibold mb-3 text-gray-700 capitalize">{intent}</h3>
          <div className="flex items-center gap-3">
            <Button intent={intent as any} size="sm">{intent} sm</Button>
            <Button intent={intent as any} size="md">{intent} md</Button>
            <Button intent={intent as any} size="lg">{intent} lg</Button>
          </div>
        </div>
      ))}
    </div>
  )
};

/**
 * Polymorphic Example
 * Button rendered as different elements
 */
export const Polymorphic: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">As Button (default)</h3>
        <Button>Standard Button</Button>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">As Link</h3>
        <Button as="a" href="https://example.com" target="_blank">
          Link Button
        </Button>
      </div>
    </div>
  )
};

/**
 * Custom Styling
 * Using the tw prop for custom Tailwind classes
 */
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Custom Shadow</h3>
        <Button tw="shadow-xl">Shadow Button</Button>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Custom Border Radius</h3>
        <Button tw="rounded-full">Rounded Full</Button>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Custom Padding</h3>
        <Button tw="px-8 py-4">Extra Padding</Button>
      </div>
    </div>
  )
};

// Individual variant exports for quick reference
export const Primary: Story = { args: { children: 'Primary', intent: 'primary' } };
export const Secondary: Story = { args: { children: 'Secondary', intent: 'secondary' } };
export const Danger: Story = { args: { children: 'Delete', intent: 'danger' } };
export const Ghost: Story = { args: { children: 'Cancel', intent: 'ghost' } };
