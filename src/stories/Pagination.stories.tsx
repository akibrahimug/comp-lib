import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '../components/Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Pagination

Fully-controlled pagination with a smart ellipsis range.

\`\`\`tsx
import { Pagination } from '@kasomaibrahim/comp-lib';

const [page, setPage] = useState(1);
<Pagination page={page} count={12} onChange={setPage} />
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Pagination>;

function Demo({ count, siblingCount }: { count: number; siblingCount?: number }) {
  const [page, setPage] = useState(1);
  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination page={page} count={count} siblingCount={siblingCount} onChange={setPage} />
      <p className="font-mono text-xs text-gray-500">
        page {page} / {count}
      </p>
    </div>
  );
}

export const Basic: Story = { render: () => <Demo count={5} /> };
export const ManyPages: Story = { render: () => <Demo count={24} /> };
export const WideSiblings: Story = { render: () => <Demo count={24} siblingCount={2} /> };
