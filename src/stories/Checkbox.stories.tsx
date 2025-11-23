import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../components/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Checkbox input with label, description, and indeterminate state support. Fully accessible with proper ARIA attributes.'
      }
    }
  }
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

/**
 * Playground
 */
export const Playground: Story = {
  args: {
    label: 'Accept terms and conditions',
    disabled: false,
    indeterminate: false
  }
};

/**
 * Basic Checkbox
 */
export const Basic: Story = {
  args: {
    label: 'Accept terms and conditions'
  }
};

/**
 * With Description
 */
export const WithDescription: Story = {
  args: {
    label: 'Email notifications',
    description: 'Receive email updates about your account activity'
  }
};

/**
 * Checked by Default
 */
export const Checked: Story = {
  args: {
    label: 'Remember me',
    defaultChecked: true
  }
};

/**
 * Indeterminate State
 */
export const Indeterminate: Story = {
  args: {
    label: 'Select all',
    indeterminate: true
  }
};

/**
 * Disabled States
 */
export const DisabledStates: Story = {
  render: () => (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Disabled Unchecked</h3>
        <Checkbox label="Cannot check this" disabled />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Disabled Checked</h3>
        <Checkbox label="Cannot uncheck this" disabled defaultChecked />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Disabled Indeterminate</h3>
        <Checkbox label="Partially selected" disabled indeterminate />
      </div>
    </div>
  )
};

/**
 * Checkbox Group
 */
export const CheckboxGroup: Story = {
  render: () => (
    <div className="space-y-3 w-80">
      <h3 className="text-sm font-semibold text-gray-900">Notification Preferences</h3>
      <Checkbox
        label="Email notifications"
        description="Receive emails about account activity"
      />
      <Checkbox
        label="Push notifications"
        description="Receive push notifications on your devices"
      />
      <Checkbox
        label="SMS notifications"
        description="Receive text messages for important updates"
      />
      <Checkbox
        label="Marketing emails"
        description="Receive promotional emails and newsletters"
      />
    </div>
  )
};

/**
 * Select All Pattern
 */
export const SelectAllPattern: Story = {
  render: () => {
    const [items, setItems] = React.useState([
      { id: 1, label: 'Item 1', checked: false },
      { id: 2, label: 'Item 2', checked: false },
      { id: 3, label: 'Item 3', checked: false },
    ]);

    const allChecked = items.every(item => item.checked);
    const someChecked = items.some(item => item.checked) && !allChecked;

    return (
      <div className="space-y-3 w-64 p-4 border border-gray-200 rounded-lg">
        <Checkbox
          label="Select All"
          checked={allChecked}
          indeterminate={someChecked}
          onChange={(e) => {
            const checked = e.target.checked;
            setItems(items.map(item => ({ ...item, checked })));
          }}
          tw="font-semibold"
        />
        <div className="border-t border-gray-200 pt-3 space-y-2">
          {items.map((item) => (
            <Checkbox
              key={item.id}
              label={item.label}
              checked={item.checked}
              onChange={(e) => {
                setItems(items.map(i =>
                  i.id === item.id ? { ...i, checked: e.target.checked } : i
                ));
              }}
              tw="ml-4"
            />
          ))}
        </div>
      </div>
    );
  }
};

/**
 * All Variants
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Unchecked</h3>
        <Checkbox label="Unchecked checkbox" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Checked</h3>
        <Checkbox label="Checked checkbox" defaultChecked />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Indeterminate</h3>
        <Checkbox label="Indeterminate checkbox" indeterminate />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">With Description</h3>
        <Checkbox
          label="Checkbox with description"
          description="This checkbox has helper text"
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Disabled</h3>
        <Checkbox label="Disabled checkbox" disabled />
      </div>
    </div>
  )
};

import React from 'react';
