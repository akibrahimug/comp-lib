import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from '../components/Dialog';
import { Button } from '../components/Button';
import { useState } from 'react';

const meta: Meta<typeof Dialog.Root> = {
  title: 'Components/Dialog',
  component: Dialog.Root,
  parameters: { docs: { source: { type: 'dynamic' } } },
};

export default meta;
type Story = StoryObj<typeof Dialog.Root>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Close />
            <Dialog.Header>
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.Description>
                This is a dialog description providing context about the modal.
              </Dialog.Description>
            </Dialog.Header>
            <div className="py-4">
              <p className="text-sm text-gray-600">
                Dialog content goes here. You can add forms, information, or any other content.
              </p>
            </div>
            <Dialog.Footer>
              <Button intent="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button intent="primary" onClick={() => setOpen(false)}>
                Confirm
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      </>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Edit Profile</Button>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Close />
            <Dialog.Header>
              <Dialog.Title>Edit Profile</Dialog.Title>
              <Dialog.Description>
                Make changes to your profile here.
              </Dialog.Description>
            </Dialog.Header>
            <form
              className="space-y-4 py-4"
              onSubmit={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  defaultValue="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  defaultValue="john@example.com"
                />
              </div>
            </form>
            <Dialog.Footer>
              <Button intent="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button intent="primary" type="submit">
                Save Changes
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      </>
    );
  },
};

export const Destructive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button intent="danger" onClick={() => setOpen(true)}>
          Delete Account
        </Button>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Close />
            <Dialog.Header>
              <Dialog.Title>Are you sure?</Dialog.Title>
              <Dialog.Description>
                This action cannot be undone. This will permanently delete your account.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer>
              <Button intent="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button intent="danger" onClick={() => setOpen(false)}>
                Yes, Delete
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      </>
    );
  },
};
