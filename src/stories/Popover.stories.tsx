import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from '../components/Popover';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const meta: Meta<typeof Popover.Root> = {
  title: 'Components/Popover',
  component: Popover.Root,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Popover

Floating panel anchored to a trigger, with portal positioning, outside-click / Escape dismissal and focus return.

\`\`\`tsx
import { Popover, Button } from '@kasomaibrahim/comp-lib';

<Popover.Root side="bottom" align="end">
  <Popover.Trigger><Button>Open</Button></Popover.Trigger>
  <Popover.Content>
    <Popover.Close />
    Anything you like in here.
  </Popover.Content>
</Popover.Root>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Popover.Root>;

export const Basic: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger>
        <Button intent="secondary">Show details</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Close />
        <h3 className="text-sm font-semibold text-gray-900">Dimensions</h3>
        <p className="mt-1 text-sm text-gray-600">Set the width and height of the layer.</p>
      </Popover.Content>
    </Popover.Root>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover.Root align="start">
      <Popover.Trigger>
        <Button>Invite teammate</Button>
      </Popover.Trigger>
      <Popover.Content tw="w-80">
        <Popover.Close />
        <h3 className="text-sm font-semibold text-gray-900">Invite by email</h3>
        <p className="mt-1 text-sm text-gray-600">We'll send them a magic link.</p>
        <div className="mt-3 space-y-3">
          <Input label="Email" type="email" placeholder="name@company.com" />
          <Button fullWidth>Send invite</Button>
        </div>
      </Popover.Content>
    </Popover.Root>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex gap-4">
      {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
        <Popover.Root key={side} side={side}>
          <Popover.Trigger>
            <Button intent="ghost">{side}</Button>
          </Popover.Trigger>
          <Popover.Content tw="w-44">
            <p className="text-sm text-gray-600">Opens on the {side}.</p>
          </Popover.Content>
        </Popover.Root>
      ))}
    </div>
  ),
};
