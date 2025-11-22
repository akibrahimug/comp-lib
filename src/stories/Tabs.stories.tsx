import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '../components/Tabs';

const meta: Meta<typeof Tabs.Root> = {
  title: 'Components/Tabs',
  component: Tabs.Root,
  parameters: { docs: { source: { type: 'dynamic' } } },
};

export default meta;
type Story = StoryObj<typeof Tabs.Root>;

export const Default: Story = {
  render: () => (
    <Tabs.Root defaultValue="tab1">
      <Tabs.TabList>
        <Tabs.Tab value="tab1">Account</Tabs.Tab>
        <Tabs.Tab value="tab2">Password</Tabs.Tab>
        <Tabs.Tab value="tab3">Notifications</Tabs.Tab>
      </Tabs.TabList>
      <Tabs.TabPanels>
        <Tabs.TabPanel value="tab1">
          <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
          <p className="text-gray-600">Manage your account information and preferences.</p>
        </Tabs.TabPanel>
        <Tabs.TabPanel value="tab2">
          <h3 className="text-lg font-semibold mb-2">Password Settings</h3>
          <p className="text-gray-600">Change your password or enable two-factor authentication.</p>
        </Tabs.TabPanel>
        <Tabs.TabPanel value="tab3">
          <h3 className="text-lg font-semibold mb-2">Notification Settings</h3>
          <p className="text-gray-600">Configure how you receive notifications.</p>
        </Tabs.TabPanel>
      </Tabs.TabPanels>
    </Tabs.Root>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs.Root defaultValue="tab1" orientation="vertical">
      <div className="flex gap-4">
        <Tabs.TabList>
          <Tabs.Tab value="tab1">General</Tabs.Tab>
          <Tabs.Tab value="tab2">Security</Tabs.Tab>
          <Tabs.Tab value="tab3">Privacy</Tabs.Tab>
        </Tabs.TabList>
        <Tabs.TabPanels className="flex-1">
          <Tabs.TabPanel value="tab1">
            <h3 className="text-lg font-semibold mb-2">General</h3>
            <p className="text-gray-600">General settings and preferences.</p>
          </Tabs.TabPanel>
          <Tabs.TabPanel value="tab2">
            <h3 className="text-lg font-semibold mb-2">Security</h3>
            <p className="text-gray-600">Security and authentication settings.</p>
          </Tabs.TabPanel>
          <Tabs.TabPanel value="tab3">
            <h3 className="text-lg font-semibold mb-2">Privacy</h3>
            <p className="text-gray-600">Privacy controls and data management.</p>
          </Tabs.TabPanel>
        </Tabs.TabPanels>
      </div>
    </Tabs.Root>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('tab1');
    return (
      <div>
        <p className="mb-4 text-sm text-gray-600">Current tab: {value}</p>
        <Tabs.Root value={value} onValueChange={setValue}>
          <Tabs.TabList>
            <Tabs.Tab value="tab1">First</Tabs.Tab>
            <Tabs.Tab value="tab2">Second</Tabs.Tab>
            <Tabs.Tab value="tab3">Third</Tabs.Tab>
          </Tabs.TabList>
          <Tabs.TabPanels>
            <Tabs.TabPanel value="tab1">First panel content</Tabs.TabPanel>
            <Tabs.TabPanel value="tab2">Second panel content</Tabs.TabPanel>
            <Tabs.TabPanel value="tab3">Third panel content</Tabs.TabPanel>
          </Tabs.TabPanels>
        </Tabs.Root>
      </div>
    );
  },
};
