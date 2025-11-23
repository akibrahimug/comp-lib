import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const meta: Meta<typeof Card.Root> = {
  title: 'Components/Card',
  component: Card.Root,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Container component with compound slots (Root, Header, Title, Description, Content, Footer) for structured content display.'
      }
    }
  }
};
export default meta;
type Story = StoryObj<typeof Card.Root>;

/**
 * Basic Card
 * Simple card with content
 */
export const Basic: Story = {
  render: () => (
    <Card.Root tw="w-[420px]">
      <Card.Content>
        <p className="text-gray-700">This is a basic card with just content.</p>
      </Card.Content>
    </Card.Root>
  )
};

/**
 * Card with Header
 * Card with title and description in header
 */
export const WithHeader: Story = {
  render: () => (
    <Card.Root tw="w-[420px]">
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>This is a description of the card content.</Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-gray-700">
          Main content goes here. You can add any content you want.
        </p>
      </Card.Content>
    </Card.Root>
  )
};

/**
 * Card with Footer
 * Card with action buttons in footer
 */
export const WithFooter: Story = {
  render: () => (
    <Card.Root tw="w-[420px]">
      <Card.Header>
        <Card.Title>Confirm Action</Card.Title>
        <Card.Description>Are you sure you want to proceed?</Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-gray-700">
          This action cannot be undone. Please confirm.
        </p>
      </Card.Content>
      <Card.Footer>
        <Button intent="secondary">Cancel</Button>
        <Button intent="primary">Confirm</Button>
      </Card.Footer>
    </Card.Root>
  )
};

/**
 * Complete Card
 * Card with all sections: header, content, and footer
 */
export const Complete: Story = {
  render: () => (
    <Card.Root tw="w-[480px]">
      <Card.Header>
        <Card.Title>Profile Settings</Card.Title>
        <Card.Description>
          Update your profile information and preferences
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          <Input label="Full Name" defaultValue="John Doe" />
          <Input label="Email" type="email" defaultValue="john@example.com" />
          <Input label="Phone" type="tel" defaultValue="+1 234 567 8900" />
        </div>
      </Card.Content>
      <Card.Footer>
        <Button intent="secondary">Cancel</Button>
        <Button intent="primary">Save Changes</Button>
      </Card.Footer>
    </Card.Root>
  )
};

/**
 * Multiple Cards Layout
 * Different card layouts side by side
 */
export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-4xl">
      <Card.Root>
        <Card.Header>
          <Card.Title>Statistics</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Users</span>
              <span className="font-semibold">1,234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Now</span>
              <span className="font-semibold">567</span>
            </div>
          </div>
        </Card.Content>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title>Recent Activity</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-2 text-sm">
            <div className="text-gray-700">User logged in</div>
            <div className="text-gray-700">File uploaded</div>
            <div className="text-gray-700">Settings updated</div>
          </div>
        </Card.Content>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title>Quick Actions</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-2">
            <Button fullWidth intent="secondary" size="sm">
              Export Data
            </Button>
            <Button fullWidth intent="secondary" size="sm">
              Import Data
            </Button>
          </div>
        </Card.Content>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title>Notifications</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="text-sm text-gray-600">
            You have 3 new notifications
          </div>
        </Card.Content>
        <Card.Footer>
          <Button size="sm" fullWidth>View All</Button>
        </Card.Footer>
      </Card.Root>
    </div>
  )
};

/**
 * Nested Content
 * Card with complex nested content
 */
export const NestedContent: Story = {
  render: () => (
    <Card.Root tw="w-[560px]">
      <Card.Header>
        <Card.Title>Team Members</Card.Title>
        <Card.Description>Manage your team members and their roles</Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="space-y-3">
          {[
            { name: 'John Doe', role: 'Admin', email: 'john@example.com' },
            { name: 'Jane Smith', role: 'Editor', email: 'jane@example.com' },
            { name: 'Bob Johnson', role: 'Viewer', email: 'bob@example.com' },
          ].map((member, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{member.name}</div>
                <div className="text-sm text-gray-500">{member.email}</div>
              </div>
              <div className="text-sm text-gray-600">{member.role}</div>
            </div>
          ))}
        </div>
      </Card.Content>
      <Card.Footer>
        <Button intent="primary">Add Member</Button>
      </Card.Footer>
    </Card.Root>
  )
};
