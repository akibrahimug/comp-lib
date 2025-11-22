import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { children: 'Button', intent: 'primary' } };
export const Secondary: Story = { args: { children: 'Button', intent: 'secondary' } };
export const Danger: Story = { args: { children: 'Delete', intent: 'danger' } };
export const Ghost: Story = { args: { children: 'Ghost', intent: 'ghost' } };
