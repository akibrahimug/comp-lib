import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '../components/Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  argTypes: {
    variant: { control: 'radio', options: ['brand', 'gold', 'success', 'danger', 'info'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    value: { control: { type: 'range', min: 0, max: 100 } },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Progress

Determinate or indeterminate progress bar.

\`\`\`tsx
import { Progress } from '@kasomaibrahim/comp-lib';

<Progress value={64} variant="gold" showValue />
<Progress value={null} /> {/* indeterminate */}
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Progress>;

export const Playground: Story = {
  args: { value: 64, variant: 'brand', size: 'md', showValue: true },
  render: (args) => (
    <div className="w-[420px]">
      <Progress {...args} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex w-[420px] flex-col gap-4">
      <Progress value={30} variant="brand" showValue />
      <Progress value={55} variant="gold" showValue />
      <Progress value={72} variant="success" showValue />
      <Progress value={88} variant="info" showValue />
      <Progress value={96} variant="danger" showValue />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-[420px] flex-col gap-4">
      <Progress value={60} size="sm" />
      <Progress value={60} size="md" />
      <Progress value={60} size="lg" />
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <div className="w-[420px]">
      <Progress value={null} variant="gold" label="Loading" />
    </div>
  ),
};

export const Animated: Story = {
  render: () => {
    const Demo = () => {
      const [v, setV] = useState(0);
      useEffect(() => {
        const id = setInterval(() => setV((p) => (p >= 100 ? 0 : p + 4)), 220);
        return () => clearInterval(id);
      }, []);
      return (
        <div className="w-[420px]">
          <Progress value={v} variant="success" showValue />
        </div>
      );
    };
    return <Demo />;
  },
};
