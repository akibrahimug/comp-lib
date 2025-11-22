import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from '../components/Toast';
import { Button } from '../components/Button';

const meta: Meta = {
  title: 'Components/Toast',
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  parameters: { docs: { source: { type: 'dynamic' } } },
};

export default meta;

function ToastDemo() {
  const toast = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        intent="primary"
        onClick={() => toast.info('This is an info message')}
      >
        Info Toast
      </Button>
      <Button
        intent="primary"
        tw="bg-success-600 hover:bg-success-700"
        onClick={() => toast.success('Operation completed successfully!')}
      >
        Success Toast
      </Button>
      <Button
        intent="primary"
        tw="bg-accent-600 hover:bg-accent-700 text-gray-900"
        onClick={() => toast.warning('Warning: Please review your changes')}
      >
        Warning Toast
      </Button>
      <Button
        intent="danger"
        onClick={() => toast.error('An error occurred. Please try again.')}
      >
        Error Toast
      </Button>
    </div>
  );
}

export const Default: StoryObj = {
  render: () => <ToastDemo />,
};

export const LongDuration: StoryObj = {
  render: () => {
    const toast = useToast();
    return (
      <Button onClick={() => toast.info('This toast will stay for 10 seconds', 10000)}>
        Show Long Toast (10s)
      </Button>
    );
  },
};

export const Multiple: StoryObj = {
  render: () => {
    const toast = useToast();
    return (
      <Button
        onClick={() => {
          toast.success('First toast');
          setTimeout(() => toast.info('Second toast'), 500);
          setTimeout(() => toast.warning('Third toast'), 1000);
        }}
      >
        Show Multiple Toasts
      </Button>
    );
  },
};
