import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Toggle } from '../components/Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Switch/toggle component with ARIA switch role. Perfect for on/off settings.'
      }
    }
  }
};
export default meta;
type Story = StoryObj<typeof Toggle>;

/**
 * Playground
 */
export const Playground: Story = {
  args: {
    label: 'Enable notifications',
    disabled: false
  }
};

/**
 * Basic Toggle
 */
export const Basic: Story = {
  args: {
    label: 'Enable notifications'
  }
};

/**
 * With Description
 */
export const WithDescription: Story = {
  args: {
    label: 'Dark mode',
    description: 'Use dark theme across the application'
  }
};

/**
 * Checked by Default
 */
export const Checked: Story = {
  args: {
    label: 'Auto-save',
    description: 'Automatically save changes',
    defaultChecked: true
  }
};

/**
 * Disabled States
 */
export const DisabledStates: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Disabled Off</h3>
        <Toggle label="Cannot enable" disabled />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Disabled On</h3>
        <Toggle label="Cannot disable" disabled defaultChecked />
      </div>
    </div>
  )
};

/**
 * Controlled Toggle
 */
export const Controlled: Story = {
  render: () => {
    const [enabled, setEnabled] = React.useState(false);

    return (
      <div className="w-80 space-y-4">
        <Toggle
          label="Controlled toggle"
          description="This toggle is controlled by React state"
          checked={enabled}
          onChange={setEnabled}
        />
        <div className="p-3 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-700">
            Toggle is: <span className="font-semibold">{enabled ? 'ON' : 'OFF'}</span>
          </p>
        </div>
      </div>
    );
  }
};

/**
 * Settings Panel Example
 */
export const SettingsPanel: Story = {
  render: () => {
    const [settings, setSettings] = React.useState({
      notifications: true,
      emailUpdates: false,
      darkMode: false,
      autoSave: true,
      analytics: false
    });

    const updateSetting = (key: keyof typeof settings) => (checked: boolean) => {
      setSettings(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div className="w-96 space-y-6 p-6 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900">Settings</h3>

        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Notifications</h4>
            <Toggle
              label="Push notifications"
              description="Receive push notifications on your devices"
              checked={settings.notifications}
              onChange={updateSetting('notifications')}
            />
          </div>

          <div className="border-b border-gray-200 pb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Email</h4>
            <Toggle
              label="Email updates"
              description="Receive email updates about your account"
              checked={settings.emailUpdates}
              onChange={updateSetting('emailUpdates')}
            />
          </div>

          <div className="border-b border-gray-200 pb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Appearance</h4>
            <Toggle
              label="Dark mode"
              description="Use dark theme across the app"
              checked={settings.darkMode}
              onChange={updateSetting('darkMode')}
            />
          </div>

          <div className="border-b border-gray-200 pb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Editor</h4>
            <Toggle
              label="Auto-save"
              description="Automatically save changes as you type"
              checked={settings.autoSave}
              onChange={updateSetting('autoSave')}
            />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Privacy</h4>
            <Toggle
              label="Analytics"
              description="Help us improve by sharing anonymous usage data"
              checked={settings.analytics}
              onChange={updateSetting('analytics')}
            />
          </div>
        </div>
      </div>
    );
  }
};

/**
 * Toggle Group
 */
export const ToggleGroup: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">Privacy Settings</h3>
      <Toggle
        label="Profile visible"
        description="Make your profile visible to other users"
        defaultChecked
      />
      <Toggle
        label="Show email"
        description="Display your email on your profile"
      />
      <Toggle
        label="Show activity"
        description="Show your recent activity to followers"
        defaultChecked
      />
      <Toggle
        label="Allow messages"
        description="Let other users send you messages"
        defaultChecked
      />
    </div>
  )
};

/**
 * All Variants
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Off</h3>
        <Toggle label="Toggle off" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">On</h3>
        <Toggle label="Toggle on" defaultChecked />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">With Description</h3>
        <Toggle
          label="Toggle with description"
          description="This toggle has helper text"
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Disabled Off</h3>
        <Toggle label="Disabled toggle" disabled />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Disabled On</h3>
        <Toggle label="Disabled toggle on" disabled defaultChecked />
      </div>
    </div>
  )
};

/**
 * With State Indicator
 */
export const WithStateIndicator: Story = {
  render: () => {
    const [enabled, setEnabled] = React.useState(false);

    return (
      <div className="w-80 space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <div className="font-medium text-gray-900">Feature Flag</div>
            <div className="text-sm text-gray-500">Enable experimental features</div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-medium ${enabled ? 'text-success-600' : 'text-gray-400'}`}>
              {enabled ? 'Enabled' : 'Disabled'}
            </span>
            <Toggle
              label=""
              checked={enabled}
              onChange={setEnabled}
            />
          </div>
        </div>
      </div>
    );
  }
};
