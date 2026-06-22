import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar, SIDEBAR_VARIANTS } from '../../../components/blocks/app/Sidebar';
import { LuxeStage, withSourceBelow } from '../../sections/_luxe';

const meta: Meta<typeof Sidebar> = {
  title: 'Blocks/App/Sidebar',
  component: Sidebar,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A themeable app side-navigation rail with grouped items, badges and a footer region. ' +
          '6 layout designs (minimal · grouped · iconRail · floating · glass · dark); data-prop or slot API. ' +
          'iconRail collapses to icons only.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Sidebar>;

const GROUPS = [
  {
    label: 'Workspace',
    items: [
      { label: 'Overview', active: true },
      { label: 'Projects', badge: '12' },
      { label: 'Reports' },
    ],
  },
  {
    label: 'Account',
    items: [{ label: 'Settings' }, { label: 'Billing', badge: 'New' }],
  },
];

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { Sidebar } from '@kasoma/comp-lib';

<Sidebar
  variant="grouped"          // minimal | grouped | iconRail | floating | glass | dark
  brand="comp·lib"
  groups={[
    { label: 'Workspace', items: [
      { label: 'Overview', active: true },
      { label: 'Projects', badge: '12' },
    ] },
  ]}
  footer={<span className="text-fg-muted">v2.0 · comp·lib</span>}
/>`,
  },
  render: () => (
    <LuxeStage switcher={false}>
      <div className="grid grid-cols-1 gap-10 p-8 lg:grid-cols-2">
        {SIDEBAR_VARIANTS.map((variant) => (
          <div key={variant} className="relative">
            <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
              {variant}
            </span>
            <div className="relative h-80 overflow-hidden rounded-xl border border-edge/10 bg-canvas/40">
              <Sidebar
                variant={variant}
                groups={GROUPS}
                footer={<span className="text-fg-muted">v2.0 · comp·lib</span>}
              />
            </div>
          </div>
        ))}
      </div>
    </LuxeStage>
  ),
};

export const Composition: Story = {
  name: 'Slot composition',
  parameters: {
    sourceCode: `<Sidebar variant="floating">
  <Sidebar.Brand>comp·lib</Sidebar.Brand>
  <Sidebar.Group label="Workspace">
    <Sidebar.Item active>Overview</Sidebar.Item>
    <Sidebar.Item badge="12">Projects</Sidebar.Item>
  </Sidebar.Group>
  <Sidebar.Footer>v2.0 · comp·lib</Sidebar.Footer>
</Sidebar>`,
  },
  render: () => (
    <LuxeStage switcher={false}>
      <div className="h-[28rem] p-8">
        <div className="relative h-full max-w-[18rem] overflow-hidden rounded-xl border border-edge/10 bg-canvas/40">
          <Sidebar variant="floating">
            <Sidebar.Brand>comp·lib</Sidebar.Brand>
            <nav className="flex-1 px-3 py-2">
              <Sidebar.Group label="Workspace">
                <Sidebar.Item active label="Overview" />
                <Sidebar.Item badge="12" label="Projects" />
                <Sidebar.Item label="Reports" />
              </Sidebar.Group>
            </nav>
            <Sidebar.Footer>v2.0 · comp·lib</Sidebar.Footer>
          </Sidebar>
        </div>
      </div>
    </LuxeStage>
  ),
};

export const Grouped: Story = {
  render: () => (
    <LuxeStage switcher={false}>
      <div className="h-[28rem] p-8">
        <div className="relative h-full w-64 overflow-hidden rounded-xl border border-edge/10 bg-canvas/40">
          <Sidebar
            variant="grouped"
            groups={GROUPS}
            footer={<span className="text-fg-muted">v2.0 · comp·lib</span>}
          />
        </div>
      </div>
    </LuxeStage>
  ),
};
