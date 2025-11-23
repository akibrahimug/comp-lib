import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../components/Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Native select dropdown with custom styling, label, description, and error states.'
      }
    }
  }
};
export default meta;
type Story = StoryObj<typeof Select>;

/**
 * Playground
 */
export const Playground: Story = {
  args: {
    label: 'Country',
    children: (
      <>
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
      </>
    )
  }
};

/**
 * Basic Select
 */
export const Basic: Story = {
  render: () => (
    <div className="w-80">
      <Select label="Country">
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
        <option value="au">Australia</option>
        <option value="de">Germany</option>
      </Select>
    </div>
  )
};

/**
 * With Description
 */
export const WithDescription: Story = {
  render: () => (
    <div className="w-80">
      <Select
        label="Payment Method"
        description="Choose your preferred payment method"
      >
        <option value="">Select payment method</option>
        <option value="card">Credit Card</option>
        <option value="paypal">PayPal</option>
        <option value="bank">Bank Transfer</option>
      </Select>
    </div>
  )
};

/**
 * Required Field
 */
export const Required: Story = {
  render: () => (
    <div className="w-80">
      <Select
        label="Role"
        required
        description="Select your role in the organization"
      >
        <option value="">Select a role</option>
        <option value="admin">Administrator</option>
        <option value="editor">Editor</option>
        <option value="viewer">Viewer</option>
      </Select>
    </div>
  )
};

/**
 * Error State
 */
export const WithError: Story = {
  render: () => (
    <div className="w-80">
      <Select
        label="Department"
        error="Please select a department"
      >
        <option value="">Select department</option>
        <option value="eng">Engineering</option>
        <option value="sales">Sales</option>
        <option value="marketing">Marketing</option>
      </Select>
    </div>
  )
};

/**
 * Disabled State
 */
export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <Select
        label="Locked Selection"
        disabled
        defaultValue="locked"
      >
        <option value="locked">This option is locked</option>
        <option value="other">Other option</option>
      </Select>
    </div>
  )
};

/**
 * Grouped Options
 */
export const GroupedOptions: Story = {
  render: () => (
    <div className="w-80">
      <Select label="Choose a category">
        <option value="">Select an option</option>
        <optgroup label="Fruits">
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange</option>
        </optgroup>
        <optgroup label="Vegetables">
          <option value="carrot">Carrot</option>
          <option value="broccoli">Broccoli</option>
          <option value="spinach">Spinach</option>
        </optgroup>
      </Select>
    </div>
  )
};

/**
 * Form Example
 */
export const FormExample: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Shipping Information</h2>

      <Select
        label="Country"
        required
        defaultValue="us"
      >
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
        <option value="au">Australia</option>
      </Select>

      <Select
        label="State / Province"
        required
        description="Select your state or province"
      >
        <option value="">Select state</option>
        <option value="ca">California</option>
        <option value="ny">New York</option>
        <option value="tx">Texas</option>
        <option value="fl">Florida</option>
      </Select>

      <Select
        label="Shipping Method"
        required
      >
        <option value="">Select shipping method</option>
        <option value="standard">Standard (5-7 days) - Free</option>
        <option value="express">Express (2-3 days) - $15</option>
        <option value="overnight">Overnight - $35</option>
      </Select>
    </div>
  )
};

/**
 * All Variants
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Normal</h3>
        <Select label="Normal Select">
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </Select>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">With Description</h3>
        <Select
          label="Select with Description"
          description="This select has helper text"
        >
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </Select>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Error</h3>
        <Select
          label="Select with Error"
          error="This field is required"
        >
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </Select>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Disabled</h3>
        <Select
          label="Disabled Select"
          disabled
        >
          <option value="1">Locked option</option>
        </Select>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Required</h3>
        <Select
          label="Required Select"
          required
        >
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </Select>
      </div>
    </div>
  )
};

/**
 * Time Zone Selector
 */
export const TimeZoneSelector: Story = {
  render: () => (
    <div className="w-96">
      <Select
        label="Time Zone"
        description="Select your local time zone"
        defaultValue="pst"
      >
        <option value="">Select time zone</option>
        <optgroup label="US Time Zones">
          <option value="est">Eastern (EST)</option>
          <option value="cst">Central (CST)</option>
          <option value="mst">Mountain (MST)</option>
          <option value="pst">Pacific (PST)</option>
        </optgroup>
        <optgroup label="International">
          <option value="gmt">London (GMT)</option>
          <option value="cet">Paris (CET)</option>
          <option value="jst">Tokyo (JST)</option>
          <option value="aest">Sydney (AEST)</option>
        </optgroup>
      </Select>
    </div>
  )
};
