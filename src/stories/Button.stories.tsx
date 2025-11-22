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
  parameters: { docs: { source: { type: 'dynamic' } } }
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { children: 'Button', intent: 'primary' } };
export const Secondary: Story = { args: { children: 'Button', intent: 'secondary' } };
export const Danger: Story = { args: { children: 'Delete', intent: 'danger' } };
export const Ghost: Story = { args: { children: 'Ghost', intent: 'ghost' } };

export const Sizes: Story = {
  render: (args) => (
    <div className="flex gap-3">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
  args: { intent: 'primary' }
};

export const FullWidth: Story = { args: { children: 'Full width', fullWidth: true } };
export const Loading: Story = { args: { children: 'Loading…', loading: true } };
