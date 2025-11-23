import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../components/Tooltip';
import { Button } from '../components/Button';

const meta: Meta<typeof Tooltip.Root> = {
  title: 'Components/Tooltip',
  component: Tooltip.Root,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Tooltip

Hover/focus tooltip with customizable positioning (top, right, bottom, left). Shows on mouse enter/leave and focus/blur events.

## Import
\`\`\`tsx
import { Tooltip } from '@kasomaibrahim/comp-lib';
\`\`\`

## Components

- **Tooltip.Root** - Context provider with position prop
- **Tooltip.Trigger** - Element that triggers the tooltip
- **Tooltip.Content** - Tooltip content (portal rendered)

## Props

**Tooltip.Root:**
- **position**: 'top' | 'right' | 'bottom' | 'left' (default: 'top')

**Tooltip.Trigger:**
- **as**: 'button' | 'span' | 'div' (default: 'button')
- **tw**: string - Additional Tailwind classes

## Examples

\`\`\`tsx
// Basic
<Tooltip.Root>
  <Tooltip.Trigger>Hover me</Tooltip.Trigger>
  <Tooltip.Content>Tooltip text</Tooltip.Content>
</Tooltip.Root>

// Different positions
<Tooltip.Root position="right">
  <Tooltip.Trigger>Hover</Tooltip.Trigger>
  <Tooltip.Content>Shows on right</Tooltip.Content>
</Tooltip.Root>

// Custom trigger element
<Tooltip.Root>
  <Tooltip.Trigger as="span">
    Help icon
  </Tooltip.Trigger>
  <Tooltip.Content>Help text</Tooltip.Content>
</Tooltip.Root>
\`\`\`

## Accessibility

- ARIA describedby linking trigger to content
- Shows on both hover and keyboard focus
- Portal rendered for proper stacking
        `
      }
    }
  },
  tags: ['autodocs']
};
export default meta;
type Story = StoryObj<typeof Tooltip.Root>;

/**
 * Basic Tooltip
 */
export const Basic: Story = {
  render: () => (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button>Hover me</Button>
      </Tooltip.Trigger>
      <Tooltip.Content>This is a helpful tooltip</Tooltip.Content>
    </Tooltip.Root>
  )
};

/**
 * Position Variants
 */
export const PositionVariants: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-20">
      <div>
        <h3 className="text-sm font-semibold mb-4 text-center text-gray-700">Top (Default)</h3>
        <Tooltip.Root position="top">
          <Tooltip.Trigger>
            <Button>Top</Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Tooltip on top</Tooltip.Content>
        </Tooltip.Root>
      </div>
      <div className="flex items-center gap-20">
        <div>
          <h3 className="text-sm font-semibold mb-4 text-center text-gray-700">Left</h3>
          <Tooltip.Root position="left">
            <Tooltip.Trigger>
              <Button>Left</Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Tooltip on left</Tooltip.Content>
          </Tooltip.Root>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4 text-center text-gray-700">Right</h3>
          <Tooltip.Root position="right">
            <Tooltip.Trigger>
              <Button>Right</Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Tooltip on right</Tooltip.Content>
          </Tooltip.Root>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-4 text-center text-gray-700">Bottom</h3>
        <Tooltip.Root position="bottom">
          <Tooltip.Trigger>
            <Button>Bottom</Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Tooltip on bottom</Tooltip.Content>
        </Tooltip.Root>
      </div>
    </div>
  )
};

/**
 * With Different Elements
 */
export const DifferentElements: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button>Button</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Button tooltip</Tooltip.Content>
      </Tooltip.Root>

      <Tooltip.Root>
        <Tooltip.Trigger as="span">
          <a href="#" className="text-brand-600 hover:underline">
            Hover this link
          </a>
        </Tooltip.Trigger>
        <Tooltip.Content>This is a link tooltip</Tooltip.Content>
      </Tooltip.Root>

      <Tooltip.Root>
        <Tooltip.Trigger>
          <button className="p-2 rounded-md hover:bg-gray-100">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 15 15">
              <path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z" />
            </svg>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>Icon button tooltip</Tooltip.Content>
      </Tooltip.Root>

      <Tooltip.Root>
        <Tooltip.Trigger as="span">
          <span className="px-2 py-1 bg-brand-100 text-brand-800 rounded-full text-sm font-medium cursor-help">
            Badge
          </span>
        </Tooltip.Trigger>
        <Tooltip.Content>Badge tooltip</Tooltip.Content>
      </Tooltip.Root>
    </div>
  )
};

/**
 * Long Content
 */
export const LongContent: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button>Hover for details</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>This is a longer tooltip with more detailed information that might wrap to multiple lines</Tooltip.Content>
      </Tooltip.Root>

      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button>Long text</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Short tooltip with lots of words that should wrap nicely in the tooltip container</Tooltip.Content>
      </Tooltip.Root>
    </div>
  )
};

/**
 * Icon Toolbar Example
 */
export const IconToolbar: Story = {
  render: () => (
    <div className="flex gap-1 p-2 bg-gray-100 rounded-lg">
      <Tooltip.Root>
        <Tooltip.Trigger>
          <button className="p-2 rounded hover:bg-white transition-colors">
            <strong>B</strong>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>Bold (Ctrl+B)</Tooltip.Content>
      </Tooltip.Root>

      <Tooltip.Root>
        <Tooltip.Trigger>
          <button className="p-2 rounded hover:bg-white transition-colors">
            <em>I</em>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>Italic (Ctrl+I)</Tooltip.Content>
      </Tooltip.Root>

      <Tooltip.Root>
        <Tooltip.Trigger>
          <button className="p-2 rounded hover:bg-white transition-colors">
            <u>U</u>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>Underline (Ctrl+U)</Tooltip.Content>
      </Tooltip.Root>

      <div className="w-px bg-gray-300 mx-1" />

      <Tooltip.Root>
        <Tooltip.Trigger>
          <button className="p-2 rounded hover:bg-white transition-colors">
            ≡
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>Align Left</Tooltip.Content>
      </Tooltip.Root>

      <Tooltip.Root>
        <Tooltip.Trigger>
          <button className="p-2 rounded hover:bg-white transition-colors">
            ≣
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>Align Center</Tooltip.Content>
      </Tooltip.Root>

      <Tooltip.Root>
        <Tooltip.Trigger>
          <button className="p-2 rounded hover:bg-white transition-colors">
            ≡
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>Align Right</Tooltip.Content>
      </Tooltip.Root>

      <div className="w-px bg-gray-300 mx-1" />

      <Tooltip.Root>
        <Tooltip.Trigger>
          <button className="p-2 rounded hover:bg-white transition-colors">
            🔗
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>Insert Link</Tooltip.Content>
      </Tooltip.Root>

      <Tooltip.Root>
        <Tooltip.Trigger>
          <button className="p-2 rounded hover:bg-white transition-colors">
            🖼️
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>Insert Image</Tooltip.Content>
      </Tooltip.Root>
    </div>
  )
};

/**
 * Help Icons Example
 */
export const HelpIcons: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Username</label>
        <Tooltip.Root position="right">
          <Tooltip.Trigger as="span">
            <span className="text-gray-400 cursor-help">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 15 15">
                <path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z" />
              </svg>
            </span>
          </Tooltip.Trigger>
          <Tooltip.Content>Your username must be unique and between 3-20 characters</Tooltip.Content>
        </Tooltip.Root>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">API Key</label>
        <Tooltip.Root position="right">
          <Tooltip.Trigger as="span">
            <span className="text-gray-400 cursor-help">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 15 15">
                <path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z" />
              </svg>
            </span>
          </Tooltip.Trigger>
          <Tooltip.Content>Your API key is used to authenticate requests. Keep it secret!</Tooltip.Content>
        </Tooltip.Root>
      </div>
    </div>
  )
};

/**
 * All Variants
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 flex flex-col items-center">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold mb-2 text-gray-700">Simple Tooltip</h3>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <Button>Hover</Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Basic tooltip</Tooltip.Content>
          </Tooltip.Root>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2 text-gray-700">Long Content</h3>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <Button>Long tooltip</Button>
            </Tooltip.Trigger>
            <Tooltip.Content>This is a longer tooltip with more content that demonstrates wrapping</Tooltip.Content>
          </Tooltip.Root>
        </div>
      </div>

      <div className="flex gap-8">
        <Tooltip.Root position="top">
          <Tooltip.Trigger>
            <Button size="sm">Top</Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Top tooltip</Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root position="right">
          <Tooltip.Trigger>
            <Button size="sm">Right</Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Right tooltip</Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root position="bottom">
          <Tooltip.Trigger>
            <Button size="sm">Bottom</Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Bottom tooltip</Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root position="left">
          <Tooltip.Trigger>
            <Button size="sm">Left</Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Left tooltip</Tooltip.Content>
        </Tooltip.Root>
      </div>
    </div>
  )
};
