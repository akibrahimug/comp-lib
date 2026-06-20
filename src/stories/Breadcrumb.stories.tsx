import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from '../components/Breadcrumb';

const meta: Meta<typeof Breadcrumb.Root> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb.Root,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Breadcrumb

Accessible breadcrumb navigation (\`nav\` + ordered list, \`aria-current="page"\`).

\`\`\`tsx
import { Breadcrumb } from '@kasomaibrahim/comp-lib';

<Breadcrumb.Root>
  <Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link></Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item><Breadcrumb.Page>Settings</Breadcrumb.Page></Breadcrumb.Item>
</Breadcrumb.Root>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Breadcrumb.Root>;

export const Basic: Story = {
  render: () => (
    <Breadcrumb.Root>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">Projects</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Page>Aurora</Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.Root>
  ),
};

export const SlashSeparator: Story = {
  render: () => (
    <Breadcrumb.Root>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator>/</Breadcrumb.Separator>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator>/</Breadcrumb.Separator>
      <Breadcrumb.Item>
        <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.Root>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <Breadcrumb.Root>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <span aria-hidden className="px-1 text-gray-400">…</span>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">Settings</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Page>Billing</Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.Root>
  ),
};
