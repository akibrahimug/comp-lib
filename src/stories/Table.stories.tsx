import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '../components/Table';
import { Badge } from '../components/Badge';

const meta: Meta<typeof Table.Root> = {
  title: 'Components/Table',
  component: Table.Root,
  argTypes: {
    striped: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    dense: { control: 'boolean' },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Table

Compound, semantic data table. \`striped\`, \`hoverable\` and \`dense\` set on **Table.Root** cascade to rows and cells.

\`\`\`tsx
import { Table } from '@kasomaibrahim/comp-lib';

<Table.Root hoverable striped>
  <Table.Header>
    <Table.Row><Table.Head>Name</Table.Head></Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row><Table.Cell>Ada Lovelace</Table.Cell></Table.Row>
  </Table.Body>
</Table.Root>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Table.Root>;

const rows = [
  { name: 'Ada Lovelace', email: 'ada@analytical.engine', role: 'Owner', status: 'Active' },
  { name: 'Alan Turing', email: 'alan@enigma.uk', role: 'Admin', status: 'Active' },
  { name: 'Grace Hopper', email: 'grace@navy.mil', role: 'Editor', status: 'Invited' },
  { name: 'Katherine Johnson', email: 'katherine@nasa.gov', role: 'Viewer', status: 'Active' },
];

const statusBadge = (s: string) =>
  s === 'Active' ? <Badge variant="success">{s}</Badge> : <Badge variant="warning">{s}</Badge>;

export const Playground: Story = {
  args: { striped: false, hoverable: true, dense: false },
  render: (args) => (
    <div className="max-w-3xl rounded-2xl border border-gray-200 bg-white p-1 shadow-sm">
      <Table.Root {...args}>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Email</Table.Head>
            <Table.Head>Role</Table.Head>
            <Table.Head>Status</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((r) => (
            <Table.Row key={r.email}>
              <Table.Cell tw="font-medium text-gray-900">{r.name}</Table.Cell>
              <Table.Cell tw="text-gray-500">{r.email}</Table.Cell>
              <Table.Cell>{r.role}</Table.Cell>
              <Table.Cell>{statusBadge(r.status)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  ),
};

export const Striped: Story = {
  ...Playground,
  args: { striped: true, hoverable: false },
};

export const WithSelectionAndFooter: Story = {
  render: () => (
    <div className="max-w-3xl rounded-2xl border border-gray-200 bg-white p-1 shadow-sm">
      <Table.Root hoverable>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Role</Table.Head>
            <Table.Head tw="text-right">Seats</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row selected>
            <Table.Cell tw="font-medium text-gray-900">Ada Lovelace</Table.Cell>
            <Table.Cell>Owner</Table.Cell>
            <Table.Cell tw="text-right tabular-nums">1</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell tw="font-medium text-gray-900">Alan Turing</Table.Cell>
            <Table.Cell>Admin</Table.Cell>
            <Table.Cell tw="text-right tabular-nums">3</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell tw="font-semibold text-gray-900">Total</Table.Cell>
            <Table.Cell />
            <Table.Cell tw="text-right font-semibold tabular-nums text-gray-900">4</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table.Root>
    </div>
  ),
};
