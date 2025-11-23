import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from '../components/Dialog';
import { Button } from '../components/Button';
import { useState } from 'react';

const meta: Meta<typeof Dialog.Root> = {
  title: 'Components/Dialog',
  component: Dialog.Root,
  parameters: {
    docs: {
      description: {
        component: `
# Dialog (Modal)

Centered modal dialog with overlay, focus trap, and scroll lock. Perfect for confirmations, forms, and important messages.

## Import
\`\`\`tsx
import { Dialog } from '@kasomaibrahim/comp-lib';
// Or use Modal alias
import { Modal } from '@kasomaibrahim/comp-lib';
\`\`\`

## Components

- **Dialog.Root** / **Modal.Root** - Context provider with state management
- **Dialog.Overlay** / **Modal.Overlay** - Semi-transparent backdrop
- **Dialog.Content** / **Modal.Content** - Main dialog container
- **Dialog.Header** / **Modal.Header** - Header section
- **Dialog.Title** / **Modal.Title** - Dialog title
- **Dialog.Description** / **Modal.Description** - Dialog description
- **Dialog.Footer** / **Modal.Footer** - Footer with actions
- **Dialog.Close** / **Modal.Close** - Close button (X icon)

## Dialog.Root Props

- **open**: boolean - Controlled open state
- **defaultOpen**: boolean - Initial open state (uncontrolled)
- **onOpenChange**: (open: boolean) => void - Open state change callback

## Examples

\`\`\`tsx
// Basic Dialog
const [open, setOpen] = useState(false);

<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Overlay />
  <Dialog.Content>
    <Dialog.Close />
    <Dialog.Header>
      <Dialog.Title>Confirm Action</Dialog.Title>
      <Dialog.Description>Are you sure you want to continue?</Dialog.Description>
    </Dialog.Header>
    <Dialog.Footer>
      <Button intent="secondary" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={() => setOpen(false)}>Confirm</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

// With Form
<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Overlay />
  <Dialog.Content>
    <Dialog.Close />
    <Dialog.Header>
      <Dialog.Title>Add User</Dialog.Title>
      <Dialog.Description>Fill in the details below</Dialog.Description>
    </Dialog.Header>
    <form>
      <Input label="Name" required />
      <Input label="Email" type="email" required />
    </form>
    <Dialog.Footer>
      <Button type="submit">Save</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

// Uncontrolled
<Dialog.Root defaultOpen={false}>
  <Dialog.Content>...</Dialog.Content>
</Dialog.Root>
\`\`\`

## Accessibility

- Proper ARIA labels (aria-modal, aria-labelledby, aria-describedby)
- Focus trap keeps focus inside dialog
- ESC key closes dialog
- Click overlay to close
- Focus returns to trigger on close
- Body scroll lock when open

## Use Cases

- Confirmation dialogs
- Alert messages
- Form modals
- Details/info popups
- Delete confirmations
- Multi-step wizards
        `
      }
    }
  },
  tags: ['autodocs']
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
