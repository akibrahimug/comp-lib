import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../components/Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    autoSize: { control: 'boolean' },
    showCounter: { control: 'boolean' },
  },
  parameters: { docs: { source: { type: 'dynamic' } } },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    rows: 4,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Bio',
    description: 'Tell us about yourself',
    placeholder: 'I am...',
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    label: 'Feedback',
    error: 'Feedback cannot be empty',
    rows: 4,
  },
};

export const WithCounter: Story = {
  args: {
    label: 'Tweet',
    placeholder: 'What\'s happening?',
    maxLength: 280,
    showCounter: true,
    rows: 3,
  },
};

export const AutoSize: Story = {
  args: {
    label: 'Auto-resizing Textarea',
    description: 'This textarea grows as you type',
    placeholder: 'Start typing...',
    autoSize: true,
    rows: 2,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    placeholder: 'Cannot edit',
    disabled: true,
    defaultValue: 'This content is read-only',
    rows: 3,
  },
};
