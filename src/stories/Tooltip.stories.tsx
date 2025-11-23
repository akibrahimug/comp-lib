import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../components/Tooltip';
import { Button } from '../components/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Hover/focus tooltip with customizable positioning (top, right, bottom, left).'
      }
    }
  }
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

/**
 * Playground
 */
export const Playground: Story = {
  args: {
    content: 'This is a tooltip',
    position: 'top',
    children: <Button>Hover me</Button>
  }
};

/**
 * Basic Tooltip
 */
export const Basic: Story = {
  render: () => (
    <Tooltip content="This is a helpful tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  )
};

/**
 * Position Variants
 */
export const PositionVariants: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-20">
      <div>
        <h3 className="text-sm font-semibold mb-4 text-center text-gray-700">Top (Default)</h3>
        <Tooltip content="Tooltip on top" position="top">
          <Button>Top</Button>
        </Tooltip>
      </div>
      <div className="flex items-center gap-20">
        <div>
          <h3 className="text-sm font-semibold mb-4 text-center text-gray-700">Left</h3>
          <Tooltip content="Tooltip on left" position="left">
            <Button>Left</Button>
          </Tooltip>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4 text-center text-gray-700">Right</h3>
          <Tooltip content="Tooltip on right" position="right">
            <Button>Right</Button>
          </Tooltip>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-4 text-center text-gray-700">Bottom</h3>
        <Tooltip content="Tooltip on bottom" position="bottom">
          <Button>Bottom</Button>
        </Tooltip>
      </div>
    </div>
  )
};

/**
 * With Different Elements
 */
export const DifferentElements: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Tooltip content="Button tooltip">
        <Button>Button</Button>
      </Tooltip>

      <Tooltip content="This is a link tooltip">
        <a href="#" className="text-brand-600 hover:underline">
          Hover this link
        </a>
      </Tooltip>

      <Tooltip content="Icon button tooltip">
        <button className="p-2 rounded-md hover:bg-gray-100">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 15 15">
            <path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z" />
          </svg>
        </button>
      </Tooltip>

      <Tooltip content="Badge tooltip">
        <span className="px-2 py-1 bg-brand-100 text-brand-800 rounded-full text-sm font-medium cursor-help">
          Badge
        </span>
      </Tooltip>
    </div>
  )
};

/**
 * Long Content
 */
export const LongContent: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="This is a longer tooltip with more detailed information that might wrap to multiple lines">
        <Button>Hover for details</Button>
      </Tooltip>

      <Tooltip content="Short tooltip with lots of words that should wrap nicely in the tooltip container">
        <Button>Long text</Button>
      </Tooltip>
    </div>
  )
};

/**
 * Icon Toolbar Example
 */
export const IconToolbar: Story = {
  render: () => (
    <div className="flex gap-1 p-2 bg-gray-100 rounded-lg">
      <Tooltip content="Bold (Ctrl+B)">
        <button className="p-2 rounded hover:bg-white transition-colors">
          <strong>B</strong>
        </button>
      </Tooltip>

      <Tooltip content="Italic (Ctrl+I)">
        <button className="p-2 rounded hover:bg-white transition-colors">
          <em>I</em>
        </button>
      </Tooltip>

      <Tooltip content="Underline (Ctrl+U)">
        <button className="p-2 rounded hover:bg-white transition-colors">
          <u>U</u>
        </button>
      </Tooltip>

      <div className="w-px bg-gray-300 mx-1" />

      <Tooltip content="Align Left">
        <button className="p-2 rounded hover:bg-white transition-colors">
          ≡
        </button>
      </Tooltip>

      <Tooltip content="Align Center">
        <button className="p-2 rounded hover:bg-white transition-colors">
          ≣
        </button>
      </Tooltip>

      <Tooltip content="Align Right">
        <button className="p-2 rounded hover:bg-white transition-colors">
          ≡
        </button>
      </Tooltip>

      <div className="w-px bg-gray-300 mx-1" />

      <Tooltip content="Insert Link">
        <button className="p-2 rounded hover:bg-white transition-colors">
          🔗
        </button>
      </Tooltip>

      <Tooltip content="Insert Image">
        <button className="p-2 rounded hover:bg-white transition-colors">
          🖼️
        </button>
      </Tooltip>
    </div>
  )
};

/**
 * Help Icons Example
 */
export const HelpIcons: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Username</label>
        <Tooltip content="Your username must be unique and between 3-20 characters" position="right">
          <span className="text-gray-400 cursor-help">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 15 15">
              <path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z" />
            </svg>
          </span>
        </Tooltip>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">API Key</label>
        <Tooltip content="Your API key is used to authenticate requests. Keep it secret!" position="right">
          <span className="text-gray-400 cursor-help">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 15 15">
              <path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z" />
            </svg>
          </span>
        </Tooltip>
      </div>
    </div>
  )
};

/**
 * All Variants
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 flex flex-col items-center">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold mb-2 text-gray-700">Simple Tooltip</h3>
          <Tooltip content="Basic tooltip">
            <Button>Hover</Button>
          </Tooltip>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2 text-gray-700">Long Content</h3>
          <Tooltip content="This is a longer tooltip with more content that demonstrates wrapping">
            <Button>Long tooltip</Button>
          </Tooltip>
        </div>
      </div>

      <div className="flex gap-8">
        <Tooltip content="Top tooltip" position="top">
          <Button size="sm">Top</Button>
        </Tooltip>
        <Tooltip content="Right tooltip" position="right">
          <Button size="sm">Right</Button>
        </Tooltip>
        <Tooltip content="Bottom tooltip" position="bottom">
          <Button size="sm">Bottom</Button>
        </Tooltip>
        <Tooltip content="Left tooltip" position="left">
          <Button size="sm">Left</Button>
        </Tooltip>
      </div>
    </div>
  )
};
