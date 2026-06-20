import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../components/Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Skeleton

Shimmering loading placeholder. Use \`lines\` for paragraphs or \`shape\` + size for avatars and thumbnails.

\`\`\`tsx
import { Skeleton } from '@kasomaibrahim/comp-lib';

<Skeleton shape="circle" width={40} height={40} />
<Skeleton lines={3} />
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Skeleton shape="circle" width={56} height={56} />
      <Skeleton shape="rounded" width={120} height={80} />
      <Skeleton shape="rect" width={120} height={80} />
      <Skeleton shape="text" width={160} />
    </div>
  ),
};

export const TextLines: Story = {
  render: () => (
    <div className="w-[360px]">
      <Skeleton lines={4} />
    </div>
  ),
};

export const CardPlaceholder: Story = {
  render: () => (
    <div className="w-[340px] rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <Skeleton shape="circle" width={44} height={44} />
        <div className="flex-1">
          <Skeleton shape="text" width="60%" />
          <div className="mt-2">
            <Skeleton shape="text" width="40%" />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Skeleton shape="rounded" height={140} />
      </div>
      <div className="mt-4">
        <Skeleton lines={3} />
      </div>
    </div>
  ),
};
