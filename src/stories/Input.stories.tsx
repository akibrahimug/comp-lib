import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    size: { control: { type: 'radio' }, options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
  parameters: { docs: { source: { type: 'dynamic' } } },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Username',
    description: 'Choose a unique username',
    placeholder: 'johndoe',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    error: 'Password must be at least 8 characters',
    type: 'password',
  },
};

export const WithPrefixSuffix: Story = {
  render: (args) => (
    <div className="space-y-4">
      <Input
        {...args}
        label="Search"
        placeholder="Search..."
        prefix={
          <svg width="16" height="16" fill="none" viewBox="0 0 15 15">
            <path
              fill="currentColor"
              d="M10 6.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-.691 3.516a4.5 4.5 0 1 1 .707-.707l2.838 2.837a.5.5 0 0 1-.708.708L9.31 10.016Z"
            />
          </svg>
        }
      />
      <Input
        label="Website"
        placeholder="example.com"
        prefix={<span className="text-sm">https://</span>}
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input size="sm" placeholder="Small" label="Small" />
      <Input size="md" placeholder="Medium" label="Medium" />
      <Input size="lg" placeholder="Large" label="Large" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
    disabled: true,
    defaultValue: 'Read only',
  },
};

export const Playground: Story = {
  args: {
    label: 'Label',
    placeholder: 'Type something...',
    description: 'This is a description',
  },
};
