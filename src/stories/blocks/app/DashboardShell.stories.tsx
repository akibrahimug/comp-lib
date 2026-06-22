import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  DashboardShell,
  DASHBOARD_SHELL_VARIANTS,
} from '../../../components/blocks/app/DashboardShell';
import { Sidebar } from '../../../components/blocks/app/Sidebar';
import { Navbar } from '../../../components/blocks/app/Navbar';
import { LuxeStage, withSourceBelow } from '../../sections/_luxe';

const meta: Meta<typeof DashboardShell> = {
  title: 'Blocks/App/DashboardShell',
  component: DashboardShell,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A themeable app-layout wrapper that arranges Sidebar + Topbar + Content with responsive ' +
          'grid/flex positioning. 6 layouts (sidebarLeft · sidebarRight · topnav · compact · glass · split); ' +
          'renders labelled placeholder regions by default, or compose real blocks via slots.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof DashboardShell>;

export const AllVariants: Story = {
  name: 'All 6 layouts',
  parameters: {
    sourceCode: `import { DashboardShell, Sidebar, Navbar } from '@kasoma/comp-lib';

<DashboardShell variant="sidebarLeft">  {/* sidebarLeft | sidebarRight | topnav | compact | glass | split */}
  <DashboardShell.Sidebar><Sidebar variant="grouped" groups={…} /></DashboardShell.Sidebar>
  <DashboardShell.Topbar><Navbar variant="minimal" /></DashboardShell.Topbar>
  <DashboardShell.Content>{/* page content */}</DashboardShell.Content>
</DashboardShell>`,
  },
  render: () => (
    <LuxeStage switcher={false}>
      <div className="grid grid-cols-1 gap-10 p-8 xl:grid-cols-2">
        {DASHBOARD_SHELL_VARIANTS.map((variant) => (
          <div key={variant} className="relative">
            <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
              {variant}
            </span>
            <div className="h-80 overflow-hidden rounded-xl border border-edge/10">
              <DashboardShell variant={variant} />
            </div>
          </div>
        ))}
      </div>
    </LuxeStage>
  ),
};

const GROUPS = [
  {
    label: 'Workspace',
    items: [
      { label: 'Overview', active: true },
      { label: 'Projects', badge: '12' },
      { label: 'Reports' },
    ],
  },
];

export const Composition: Story = {
  name: 'Slot composition (real blocks)',
  parameters: {
    sourceCode: `<DashboardShell variant="sidebarLeft">
  <DashboardShell.Sidebar>
    <Sidebar variant="grouped" groups={groups} tw="h-full border-0" />
  </DashboardShell.Sidebar>
  <DashboardShell.Topbar>
    <Navbar variant="minimal" tw="!static border-0 bg-transparent" links={links} />
  </DashboardShell.Topbar>
  <DashboardShell.Content>…</DashboardShell.Content>
</DashboardShell>`,
  },
  render: () => (
    <LuxeStage switcher={false}>
      <div className="h-[34rem] p-8">
        <div className="h-full overflow-hidden rounded-xl border border-edge/10">
          <DashboardShell variant="sidebarLeft">
            <DashboardShell.Sidebar>
              <Sidebar variant="grouped" groups={GROUPS} tw="h-full border-0" />
            </DashboardShell.Sidebar>
            <DashboardShell.Topbar>
              <Navbar
                variant="minimal"
                tw="!static border-0 bg-transparent"
                links={[{ label: 'Dashboard', active: true }, { label: 'Activity' }]}
              />
            </DashboardShell.Topbar>
            <DashboardShell.Content>
              <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
                <h1 className="font-display text-2xl font-semibold tracking-tight text-fg">
                  Good afternoon
                </h1>
                <div className="grid gap-4 sm:grid-cols-3">
                  {['Revenue', 'Active users', 'Churn'].map((t) => (
                    <div
                      key={t}
                      className="rounded-2xl border border-edge/10 bg-elevated/60 p-4 shadow-luxe-sm"
                    >
                      <p className="text-xs text-fg-subtle">{t}</p>
                      <p className="mt-1 font-display text-xl font-semibold text-fg">
                        {Math.round(Math.random() * 900) + 100}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </DashboardShell.Content>
          </DashboardShell>
        </div>
      </div>
    </LuxeStage>
  ),
};

export const SidebarLeft: Story = {
  render: () => (
    <LuxeStage switcher={false}>
      <div className="h-[30rem] p-8">
        <div className="h-full overflow-hidden rounded-xl border border-edge/10">
          <DashboardShell variant="sidebarLeft" />
        </div>
      </div>
    </LuxeStage>
  ),
};
