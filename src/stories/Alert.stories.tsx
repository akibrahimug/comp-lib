import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '../components/Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    variant: { control: 'radio', options: ['info', 'success', 'warning', 'danger', 'neutral'] },
    title: { control: 'text' },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Alert

Inline contextual feedback with five intents, optional title, custom/default icon, and an optional dismiss action.

\`\`\`tsx
import { Alert } from '@kasomaibrahim/comp-lib';

<Alert variant="success" title="Saved" onClose={() => {}}>
  Your changes were saved.
</Alert>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Playground: Story = {
  args: {
    variant: 'info',
    title: 'Heads up',
    children: 'This is an informational message with some helpful context.',
  },
  render: (args) => (
    <div className="max-w-xl">
      <Alert {...args} />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-3">
      <Alert variant="info" title="Information">A new version of the docs is available.</Alert>
      <Alert variant="success" title="Payment received">Your invoice has been settled.</Alert>
      <Alert variant="warning" title="Approaching limit">You have used 90% of your quota.</Alert>
      <Alert variant="danger" title="Something went wrong">We couldn't reach the server. Try again.</Alert>
      <Alert variant="neutral">A quiet, neutral note without a title.</Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(true);
      return (
        <div className="max-w-xl">
          {open ? (
            <Alert variant="success" title="You're all set" onClose={() => setOpen(false)}>
              Dismiss this alert with the close button.
            </Alert>
          ) : (
            <button className="text-sm text-brand-600 underline" onClick={() => setOpen(true)}>
              Reset alert
            </button>
          )}
        </div>
      );
    };
    return <Demo />;
  },
};

export const TitleOnly: Story = {
  render: () => (
    <div className="max-w-xl">
      <Alert variant="warning" title="Your trial ends in 3 days" />
    </div>
  ),
};
