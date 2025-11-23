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
  parameters: {
    docs: {
      description: {
        component: `
# Input

Text input field with label, description, error states, and icon support. Fully accessible with proper ARIA attributes.

## Import
\`\`\`tsx
import { Input } from '@kasomaibrahim/comp-lib';
\`\`\`

## Props

- **label**: string - Input label text
- **description**: string - Helper text below input
- **error**: string - Error message (shows error state)
- **required**: boolean - Shows required asterisk
- **prefix**: ReactNode - Icon or content before input
- **suffix**: ReactNode - Icon or content after input
- **size**: 'sm' | 'md' | 'lg' (default: 'md')
- **disabled**: boolean - Disables the input
- **type**: string - HTML input type (text, email, password, etc.)

## Theme Configuration

\`\`\`js
colors: {
  gray: { 200: '#EAECF0', 300: '#D0D5DD', 500: '#667085', 700: '#344054' },
  brand: { 600: '#005BBB' },
  danger: { 600: '#DC2626' }
}
\`\`\`

## Accessibility

- Labels properly associated with htmlFor
- Error states use aria-invalid and aria-describedby
- Description linked with aria-describedby
- Required status indicated visually and semantically

## Examples

\`\`\`tsx
// Basic
<Input label="Email" placeholder="you@example.com" />

// With description
<Input
  label="Password"
  description="Must be 8+ characters"
  type="password"
/>

// Error state
<Input
  label="Email"
  error="Invalid email address"
/>

// With icons
<Input
  label="Search"
  prefix={<SearchIcon />}
/>
\`\`\`
        `
      }
    }
  },
  tags: ['autodocs']
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
