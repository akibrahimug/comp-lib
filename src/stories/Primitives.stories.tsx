import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon, icons } from '../components/Icon';
import { Eyebrow } from '../components/Eyebrow';
import { Kbd } from '../components/Kbd';
import { IconButton } from '../components/IconButton';
import { Stat } from '../components/Stat';
import { Code } from '../components/Code';

/**
 * Primitives migrated out of the showcase sections into the library. They are
 * theme-aware (they use the semantic tokens shipped by the Tailwind plugin), so
 * they follow the active theme — switch it from the toolbar.
 */
const meta: Meta = {
  title: 'Components/Primitives',
  parameters: {
    docs: {
      description: {
        component:
          'Icon · Eyebrow · Kbd · IconButton · Stat · Code — small building blocks used across the showcase sections, now part of the library.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Icons: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
      {(Object.keys(icons) as (keyof typeof icons)[]).map((n) => (
        <div key={n} className="flex flex-col items-center gap-2 rounded-xl border border-edge/12 bg-panel/60 p-3 text-fg">
          <Icon name={n} className="h-5 w-5 text-accent" />
          <span className="font-mono text-[10px] text-fg-subtle">{n}</span>
        </div>
      ))}
    </div>
  ),
};

export const Stats: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-4 sm:grid-cols-3">
      <Stat label="Revenue" value="$48,210" delta="12.4%" trend="up" hint="vs last month" icon={<Icon name="wallet" />} />
      <Stat label="Customers" value="2,318" delta="3.1%" trend="up" hint="vs last month" icon={<Icon name="users" />} />
      <Stat label="Churn" value="1.8%" delta="0.4%" trend="down" hint="vs last month" icon={<Icon name="chart" />} />
    </div>
  ),
};

export const Bits: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-6 text-fg">
      <div>
        <Eyebrow>Section kicker</Eyebrow>
      </div>
      <div className="flex items-center gap-2 text-sm text-fg-muted">
        Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search.
      </div>
      <div className="flex items-center gap-3">
        <IconButton aria-label="Settings" intent="primary"><Icon name="cog" /></IconButton>
        <IconButton aria-label="Search" intent="secondary"><Icon name="search" /></IconButton>
        <IconButton aria-label="Notifications" intent="ghost"><Icon name="bell" /></IconButton>
        <IconButton aria-label="Delete" intent="danger"><Icon name="trash" /></IconButton>
      </div>
    </div>
  ),
};

export const CodeBlock: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Code
        filename="App.tsx"
        lang="tsx"
        code={`import { Button, Stat, Icon } from '@kasoma/comp-lib';

export function App() {
  return (
    <>
      <Stat label="Revenue" value="$48k" delta="+12%" trend="up"
        icon={<Icon name="wallet" />} />
      <Button intent="primary">Get started</Button>
    </>
  );
}`}
      />
    </div>
  ),
};
