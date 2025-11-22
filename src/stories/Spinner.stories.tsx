import type { Meta, StoryObj } from '@storybook/react';
import { Spinner, LoadingOverlay } from '../components/Spinner';
import { Button } from '../components/Button';
import { useState } from 'react';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    size: { control: { type: 'radio' }, options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: { control: { type: 'radio' }, options: ['brand', 'white', 'gray', 'danger', 'success'] },
  },
  parameters: { docs: { source: { type: 'dynamic' } } },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 'md',
    color: 'brand',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner color="brand" />
      <Spinner color="gray" />
      <Spinner color="danger" />
      <Spinner color="success" />
      <div className="bg-gray-900 p-4 rounded">
        <Spinner color="white" />
      </div>
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button disabled>
        <Spinner size="sm" color="white" className="mr-2" />
        Loading...
      </Button>
      <Button intent="secondary" disabled>
        <Spinner size="sm" className="mr-2" />
        Processing...
      </Button>
    </div>
  ),
};

export const WithLoadingOverlay: StoryObj = {
  render: () => {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 3000);
    };

    return (
      <>
        <Button onClick={handleClick}>Show Loading Overlay (3s)</Button>
        <LoadingOverlay show={loading} message="Loading data..." />
      </>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="lg" tw="text-purple-600" />
      <Spinner size="lg" tw="text-orange-500" />
      <Spinner size="lg" tw="text-pink-600" />
    </div>
  ),
};
