import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../components/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: `
# Avatar

Profile image component with automatic fallback to initials. Supports 6 sizes from xs to 2xl.

## Import
\`\`\`tsx
import { Avatar } from '@kasomaibrahim/comp-lib';
\`\`\`

## Props
- **src**: string - Image URL
- **alt**: string - Image alt text
- **name**: string - Name for initials fallback
- **size**: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'md')
- **tw**: string - Additional Tailwind classes

## Sizes
- **xs** (24px) - Compact lists, mentions
- **sm** (32px) - Dense tables
- **md** (40px) - Default size
- **lg** (48px) - User profiles
- **xl** (64px) - Profile headers
- **2xl** (80px) - Large profile pages

## Examples
\`\`\`tsx
// With image
<Avatar src="/user.jpg" alt="John Doe" />

// Initials fallback
<Avatar name="John Doe" />  // Shows "JD"

// Custom size
<Avatar src="/user.jpg" size="xl" />

// With ring
<Avatar src="/user.jpg" tw="ring-4 ring-brand-600" />
\`\`\`
        `
      }
    }
  },
  tags: ['autodocs']
};
export default meta;
type Story = StoryObj<typeof Avatar>;

/**
 * Playground - Interactive avatar with all props
 */
export const Playground: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=12',
    alt: 'User Avatar',
    size: 'md'
  }
};

/**
 * All Size Variants
 * Shows all 6 available sizes: xs, sm, md, lg, xl, 2xl
 */
export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Extra Small (xs)</h3>
        <Avatar
          src="https://i.pravatar.cc/150?img=1"
          alt="User"
          size="xs"
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Small (sm)</h3>
        <Avatar
          src="https://i.pravatar.cc/150?img=2"
          alt="User"
          size="sm"
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Medium (md) - Default</h3>
        <Avatar
          src="https://i.pravatar.cc/150?img=3"
          alt="User"
          size="md"
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Large (lg)</h3>
        <Avatar
          src="https://i.pravatar.cc/150?img=4"
          alt="User"
          size="lg"
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Extra Large (xl)</h3>
        <Avatar
          src="https://i.pravatar.cc/150?img=5"
          alt="User"
          size="xl"
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">2XL</h3>
        <Avatar
          src="https://i.pravatar.cc/150?img=6"
          alt="User"
          size="2xl"
        />
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
    <div className="flex items-end gap-4">
      <div className="text-center">
        <Avatar src="https://i.pravatar.cc/150?img=1" alt="User" size="xs" />
        <p className="text-xs mt-1">xs</p>
      </div>
      <div className="text-center">
        <Avatar src="https://i.pravatar.cc/150?img=2" alt="User" size="sm" />
        <p className="text-xs mt-1">sm</p>
      </div>
      <div className="text-center">
        <Avatar src="https://i.pravatar.cc/150?img=3" alt="User" size="md" />
        <p className="text-xs mt-1">md</p>
      </div>
      <div className="text-center">
        <Avatar src="https://i.pravatar.cc/150?img=4" alt="User" size="lg" />
        <p className="text-xs mt-1">lg</p>
      </div>
      <div className="text-center">
        <Avatar src="https://i.pravatar.cc/150?img=5" alt="User" size="xl" />
        <p className="text-xs mt-1">xl</p>
      </div>
      <div className="text-center">
        <Avatar src="https://i.pravatar.cc/150?img=6" alt="User" size="2xl" />
        <p className="text-xs mt-1">2xl</p>
      </div>
    </div>
  )
};

/**
 * With Images
 * Avatar with profile images
 */
export const WithImages: Story = {
  render: () => (
    <div className="flex gap-3">
      <Avatar src="https://i.pravatar.cc/150?img=10" alt="John Doe" />
      <Avatar src="https://i.pravatar.cc/150?img=20" alt="Jane Smith" />
      <Avatar src="https://i.pravatar.cc/150?img=30" alt="Bob Johnson" />
    </div>
  )
};

/**
 * Initials Fallback
 * Shows initials when no image is provided
 */
export const InitialsFallback: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Full Names</h3>
        <div className="flex gap-3">
          <Avatar name="John Doe" />
          <Avatar name="Jane Smith" />
          <Avatar name="Bob Johnson" />
          <Avatar name="Alice Williams" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Single Names</h3>
        <div className="flex gap-3">
          <Avatar name="Alex" />
          <Avatar name="Sam" />
          <Avatar name="Jordan" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Different Sizes</h3>
        <div className="flex items-end gap-3">
          <Avatar name="John Doe" size="sm" />
          <Avatar name="Jane Smith" size="md" />
          <Avatar name="Bob Johnson" size="lg" />
          <Avatar name="Alice Williams" size="xl" />
        </div>
      </div>
    </div>
  )
};

/**
 * User List Example
 * Practical example showing avatars in a user list
 */
export const UserListExample: Story = {
  render: () => (
    <div className="max-w-md space-y-3">
      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
        <Avatar src="https://i.pravatar.cc/150?img=12" alt="John Doe" />
        <div>
          <p className="font-medium text-gray-900">John Doe</p>
          <p className="text-sm text-gray-500">john@example.com</p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
        <Avatar name="Jane Smith" />
        <div>
          <p className="font-medium text-gray-900">Jane Smith</p>
          <p className="text-sm text-gray-500">jane@example.com</p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
        <Avatar src="https://i.pravatar.cc/150?img=25" alt="Bob Johnson" />
        <div>
          <p className="font-medium text-gray-900">Bob Johnson</p>
          <p className="text-sm text-gray-500">bob@example.com</p>
        </div>
      </div>
    </div>
  )
};

/**
 * Avatar Group
 * Overlapping avatars for groups
 */
export const AvatarGroup: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Small Group</h3>
        <div className="flex -space-x-2">
          <Avatar src="https://i.pravatar.cc/150?img=1" alt="User 1" size="md" tw="ring-2 ring-white" />
          <Avatar src="https://i.pravatar.cc/150?img=2" alt="User 2" size="md" tw="ring-2 ring-white" />
          <Avatar src="https://i.pravatar.cc/150?img=3" alt="User 3" size="md" tw="ring-2 ring-white" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Large Group</h3>
        <div className="flex -space-x-2">
          <Avatar src="https://i.pravatar.cc/150?img=10" alt="User 1" size="md" tw="ring-2 ring-white" />
          <Avatar src="https://i.pravatar.cc/150?img=20" alt="User 2" size="md" tw="ring-2 ring-white" />
          <Avatar src="https://i.pravatar.cc/150?img=30" alt="User 3" size="md" tw="ring-2 ring-white" />
          <Avatar src="https://i.pravatar.cc/150?img=40" alt="User 4" size="md" tw="ring-2 ring-white" />
          <Avatar name="+5" size="md" tw="ring-2 ring-white bg-gray-300" />
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
    <div className="flex gap-4">
      <Avatar
        src="https://i.pravatar.cc/150?img=15"
        alt="User"
        tw="ring-4 ring-brand-600"
      />
      <Avatar
        src="https://i.pravatar.cc/150?img=16"
        alt="User"
        tw="ring-4 ring-success-600"
      />
      <Avatar
        src="https://i.pravatar.cc/150?img=17"
        alt="User"
        tw="ring-4 ring-danger-600"
      />
    </div>
  )
};
