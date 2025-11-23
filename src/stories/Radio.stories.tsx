import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Radio } from '../components/Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Radio button for mutually exclusive selections with label and description support.'
      }
    }
  }
};
export default meta;
type Story = StoryObj<typeof Radio>;

/**
 * Playground
 */
export const Playground: Story = {
  args: {
    label: 'Radio option',
    name: 'example',
    value: 'option1'
  }
};

/**
 * Basic Radio
 */
export const Basic: Story = {
  args: {
    label: 'Select this option',
    name: 'basic',
    value: 'option'
  }
};

/**
 * With Description
 */
export const WithDescription: Story = {
  args: {
    label: 'Pro Plan',
    description: '$29/month - All features included',
    name: 'plan',
    value: 'pro'
  }
};

/**
 * Radio Group
 */
export const RadioGroup: Story = {
  render: () => (
    <div className="space-y-3 w-80">
      <h3 className="text-sm font-semibold text-gray-900">Select a plan</h3>
      <Radio
        name="plan"
        value="free"
        label="Free"
        description="Basic features for personal use"
        defaultChecked
      />
      <Radio
        name="plan"
        value="pro"
        label="Pro"
        description="$29/month - Advanced features for professionals"
      />
      <Radio
        name="plan"
        value="enterprise"
        label="Enterprise"
        description="$99/month - Everything you need for your team"
      />
    </div>
  )
};

/**
 * Disabled States
 */
export const DisabledStates: Story = {
  render: () => (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Disabled Unchecked</h3>
        <Radio label="Cannot select" name="disabled1" disabled />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Disabled Checked</h3>
        <Radio label="Selected and locked" name="disabled2" disabled defaultChecked />
      </div>
    </div>
  )
};

/**
 * Controlled Radio Group
 */
export const ControlledGroup: Story = {
  render: () => {
    const [selected, setSelected] = React.useState('card');

    return (
      <div className="w-96 space-y-4">
        <h3 className="text-sm font-semibold text-gray-900">Payment Method</h3>
        <div className="space-y-3">
          <div
            className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
              selected === 'card'
                ? 'border-brand-600 bg-brand-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelected('card')}
          >
            <Radio
              name="payment"
              value="card"
              label="Credit or Debit Card"
              description="Visa, Mastercard, American Express"
              checked={selected === 'card'}
              onChange={(e) => setSelected(e.target.value)}
            />
          </div>
          <div
            className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
              selected === 'paypal'
                ? 'border-brand-600 bg-brand-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelected('paypal')}
          >
            <Radio
              name="payment"
              value="paypal"
              label="PayPal"
              description="Pay with your PayPal account"
              checked={selected === 'paypal'}
              onChange={(e) => setSelected(e.target.value)}
            />
          </div>
          <div
            className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
              selected === 'bank'
                ? 'border-brand-600 bg-brand-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelected('bank')}
          >
            <Radio
              name="payment"
              value="bank"
              label="Bank Transfer"
              description="Direct bank transfer"
              checked={selected === 'bank'}
              onChange={(e) => setSelected(e.target.value)}
            />
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Selected: <span className="font-semibold">{selected}</span>
        </p>
      </div>
    );
  }
};

/**
 * Shipping Options Example
 */
export const ShippingOptions: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">Shipping Method</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
          <Radio
            name="shipping"
            value="standard"
            label="Standard Shipping"
            description="5-7 business days"
            defaultChecked
          />
          <span className="font-semibold text-gray-900">Free</span>
        </div>
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
          <Radio
            name="shipping"
            value="express"
            label="Express Shipping"
            description="2-3 business days"
          />
          <span className="font-semibold text-gray-900">$15.00</span>
        </div>
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
          <Radio
            name="shipping"
            value="overnight"
            label="Overnight Shipping"
            description="Next business day"
          />
          <span className="font-semibold text-gray-900">$35.00</span>
        </div>
      </div>
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
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Unchecked</h3>
        <Radio label="Unchecked radio" name="var1" value="1" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Checked</h3>
        <Radio label="Checked radio" name="var2" value="2" defaultChecked />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">With Description</h3>
        <Radio
          label="Radio with description"
          description="This radio has helper text"
          name="var3"
          value="3"
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Disabled</h3>
        <Radio label="Disabled radio" name="var4" value="4" disabled />
      </div>
    </div>
  )
};
