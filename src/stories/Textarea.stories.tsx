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
  parameters: {
    docs: {
      description: {
        component: `
# Textarea

Multi-line text input with auto-resize, character counter, and error states. Fully accessible with proper ARIA attributes.

## Import
\`\`\`tsx
import { Textarea } from '@kasomaibrahim/comp-lib';
\`\`\`

## Props

- **label**: string - Textarea label text
- **description**: string - Helper text below textarea
- **error**: string - Error message (shows error state)
- **required**: boolean - Shows required asterisk
- **rows**: number - Initial number of rows (default: 3)
- **maxLength**: number - Maximum character limit
- **showCounter**: boolean - Show character counter
- **autoSize**: boolean - Auto-resize based on content
- **disabled**: boolean - Disables the textarea
- **placeholder**: string - Placeholder text

## Examples

\`\`\`tsx
// Basic
<Textarea label="Message" placeholder="Enter message..." />

// With character counter
<Textarea
  label="Bio"
  maxLength={200}
  showCounter
  placeholder="Tell us about yourself"
/>

// Auto-resize
<Textarea
  label="Description"
  autoSize
  placeholder="This grows with content"
/>

// With error
<Textarea
  label="Comments"
  error="This field is required"
/>

// Required field
<Textarea
  label="Feedback"
  required
  description="Please provide detailed feedback"
/>
\`\`\`

## Accessibility

- Labels properly associated with htmlFor
- Error states use aria-invalid and aria-describedby
- Description linked with aria-describedby
- Required status indicated visually and semantically
- Character counter announced to screen readers

## Use Cases

- Form inputs for multi-line text
- Comments and feedback
- Bio/description fields
- Message composition
- Code/text editing
        `
      }
    }
  },
  tags: ['autodocs']
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
