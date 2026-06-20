import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from '../components/DropdownMenu';
import { Button } from '../components/Button';

const meta: Meta<typeof DropdownMenu.Root> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu.Root,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# DropdownMenu

Portal-positioned menu with outside-click / Escape dismissal and arrow-key roving focus.

\`\`\`tsx
import { DropdownMenu, Button } from '@kasomaibrahim/comp-lib';

<DropdownMenu.Root align="end">
  <DropdownMenu.Trigger><Button intent="secondary">Options</Button></DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Label>Account</DropdownMenu.Label>
    <DropdownMenu.Item>Profile</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item destructive>Sign out</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DropdownMenu.Root>;

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d={d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Basic: Story = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button intent="secondary">Open menu</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>New file</DropdownMenu.Item>
        <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
        <DropdownMenu.Item>Rename</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item destructive>Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
};

export const WithIconsAndLabel: Story = {
  render: () => (
    <DropdownMenu.Root align="end">
      <DropdownMenu.Trigger>
        <Button intent="primary">Account ▾</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content tw="min-w-[14rem]">
        <DropdownMenu.Label>Signed in as Ada</DropdownMenu.Label>
        <DropdownMenu.Item icon={<Icon d="M20 21a8 8 0 10-16 0M12 11a4 4 0 100-8 4 4 0 000 8z" />}>
          Profile
        </DropdownMenu.Item>
        <DropdownMenu.Item icon={<Icon d="M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9" />}>
          Settings
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item destructive icon={<Icon d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />}>
          Sign out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
};

export const Alignments: Story = {
  render: () => (
    <div className="flex gap-6">
      <DropdownMenu.Root align="start">
        <DropdownMenu.Trigger>
          <Button intent="secondary">Align start</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>One</DropdownMenu.Item>
          <DropdownMenu.Item>Two</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <DropdownMenu.Root align="end">
        <DropdownMenu.Trigger>
          <Button intent="secondary">Align end</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>One</DropdownMenu.Item>
          <DropdownMenu.Item>Two</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  ),
};
