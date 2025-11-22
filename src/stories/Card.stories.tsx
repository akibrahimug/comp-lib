import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const meta: Meta<typeof Card.Root> = {
  title: 'Components/Card',
  component: Card.Root,
  parameters: { layout: 'centered' }
};
export default meta;
type Story = StoryObj<typeof Card.Root>;

export const Basic: Story = {
  render: () => (
    <Card.Root className="w-[420px]">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="text-lg font-semibold">Card title</div>
        <div className="mt-1 text-sm text-gray-600">Optional description</div>
      </div>
      <div className="px-6 py-5">Body content here</div>
      <div className="px-6 py-4 border-t border-gray-100 flex gap-2 justify-end">
        <Button intent="ghost">Close</Button>
        <Button>Action</Button>
      </div>
    </Card.Root>
  )
};
