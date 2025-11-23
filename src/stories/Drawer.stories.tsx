import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Drawer } from '../components/Drawer';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const meta: Meta<typeof Drawer.Root> = {
  title: 'Components/Drawer',
  component: Drawer.Root,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Slide-in panel component from any direction (left, right, top, bottom) with focus trap and scroll lock.'
      }
    }
  }
};
export default meta;
type Story = StoryObj<typeof Drawer.Root>;

/**
 * Right Drawer (Default)
 */
export const RightDrawer: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Right Drawer</Button>
        <Drawer.Root open={open} onOpenChange={setOpen} position="right">
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Close />
            <Drawer.Header>
              <Drawer.Title>Right Drawer</Drawer.Title>
              <Drawer.Description>
                This drawer slides in from the right side
              </Drawer.Description>
            </Drawer.Header>
            <div>
              <p className="text-gray-700">
                This is the drawer content. You can add any content here.
              </p>
            </div>
            <Drawer.Footer>
              <Button intent="secondary" onClick={() => setOpen(false)}>
                Close
              </Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>
      </>
    );
  }
};

/**
 * Left Drawer
 */
export const LeftDrawer: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Left Drawer</Button>
        <Drawer.Root open={open} onOpenChange={setOpen} position="left">
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Close />
            <Drawer.Header>
              <Drawer.Title>Navigation</Drawer.Title>
            </Drawer.Header>
            <nav className="space-y-2">
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">Home</a>
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">Products</a>
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">About</a>
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">Contact</a>
            </nav>
          </Drawer.Content>
        </Drawer.Root>
      </>
    );
  }
};

/**
 * Top Drawer
 */
export const TopDrawer: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Top Drawer</Button>
        <Drawer.Root open={open} onOpenChange={setOpen} position="top">
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Close />
            <Drawer.Header>
              <Drawer.Title>Announcement</Drawer.Title>
              <Drawer.Description>
                Check out our latest updates
              </Drawer.Description>
            </Drawer.Header>
            <p className="text-gray-700">
              We've released new features! Click below to learn more.
            </p>
            <Drawer.Footer>
              <Button onClick={() => setOpen(false)}>Got it</Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>
      </>
    );
  }
};

/**
 * Bottom Drawer
 */
export const BottomDrawer: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Bottom Drawer</Button>
        <Drawer.Root open={open} onOpenChange={setOpen} position="bottom">
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Close />
            <Drawer.Header>
              <Drawer.Title>Quick Actions</Drawer.Title>
            </Drawer.Header>
            <div className="grid grid-cols-3 gap-3">
              <Button fullWidth intent="secondary">Action 1</Button>
              <Button fullWidth intent="secondary">Action 2</Button>
              <Button fullWidth intent="secondary">Action 3</Button>
            </div>
          </Drawer.Content>
        </Drawer.Root>
      </>
    );
  }
};

/**
 * With Form
 */
export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Add New Item</Button>
        <Drawer.Root open={open} onOpenChange={setOpen} position="right">
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Close />
            <Drawer.Header>
              <Drawer.Title>Add New Item</Drawer.Title>
              <Drawer.Description>
                Fill out the form below to add a new item
              </Drawer.Description>
            </Drawer.Header>
            <div className="space-y-4">
              <Input
                label="Item Name"
                placeholder="Enter item name"
                required
              />
              <Input
                label="Description"
                placeholder="Enter description"
              />
              <Input
                label="Price"
                type="number"
                placeholder="0.00"
                required
              />
              <Input
                label="Category"
                placeholder="Select category"
              />
            </div>
            <Drawer.Footer>
              <Button intent="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>
                Save
              </Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>
      </>
    );
  }
};

/**
 * Settings Panel
 */
export const SettingsPanel: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Settings</Button>
        <Drawer.Root open={open} onOpenChange={setOpen} position="right">
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Close />
            <Drawer.Header>
              <Drawer.Title>Settings</Drawer.Title>
              <Drawer.Description>
                Manage your account settings and preferences
              </Drawer.Description>
            </Drawer.Header>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Account</h3>
                <div className="space-y-3">
                  <Input label="Name" defaultValue="John Doe" />
                  <Input label="Email" type="email" defaultValue="john@example.com" />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Email notifications</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Dark mode</span>
                    <input type="checkbox" />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Danger Zone</h3>
                <Button intent="danger" size="sm">Delete Account</Button>
              </div>
            </div>
            <Drawer.Footer>
              <Button intent="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>
                Save Changes
              </Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>
      </>
    );
  }
};

/**
 * Shopping Cart Example
 */
export const ShoppingCart: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const items = [
      { id: 1, name: 'Product 1', price: 29.99, quantity: 2 },
      { id: 2, name: 'Product 2', price: 49.99, quantity: 1 },
    ];

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
      <>
        <Button onClick={() => setOpen(true)}>View Cart (2)</Button>
        <Drawer.Root open={open} onOpenChange={setOpen} position="right">
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Close />
            <Drawer.Header>
              <Drawer.Title>Shopping Cart</Drawer.Title>
              <Drawer.Description>
                {items.length} items in your cart
              </Drawer.Description>
            </Drawer.Header>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}

              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>
            <Drawer.Footer>
              <Button intent="secondary" onClick={() => setOpen(false)}>
                Continue Shopping
              </Button>
              <Button onClick={() => setOpen(false)}>
                Checkout
              </Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>
      </>
    );
  }
};

/**
 * All Positions
 */
export const AllPositions: Story = {
  render: () => {
    const [position, setPosition] = React.useState<'left' | 'right' | 'top' | 'bottom' | null>(null);

    return (
      <>
        <div className="flex gap-3">
          <Button onClick={() => setPosition('left')}>Left</Button>
          <Button onClick={() => setPosition('right')}>Right</Button>
          <Button onClick={() => setPosition('top')}>Top</Button>
          <Button onClick={() => setPosition('bottom')}>Bottom</Button>
        </div>

        <Drawer.Root open={position !== null} onOpenChange={(open) => !open && setPosition(null)} position={position || 'right'}>
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Close />
            <Drawer.Header>
              <Drawer.Title>{position} Drawer</Drawer.Title>
              <Drawer.Description>
                This drawer slides in from the {position}
              </Drawer.Description>
            </Drawer.Header>
            <p className="text-gray-700">Drawer content here</p>
            <Drawer.Footer>
              <Button onClick={() => setPosition(null)}>Close</Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>
      </>
    );
  }
};
