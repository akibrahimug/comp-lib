import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  EmptyState,
  EMPTY_STATE_VARIANTS,
} from '../../../components/blocks/app/EmptyState';
import { Button } from '../../../components/Button';
import { accentSolid, ghostControl, mergeTw } from '../../../components/blocks/_shared';
import { LuxeStage, withSourceBelow } from '../../sections/_luxe';

const meta: Meta<typeof EmptyState> = {
  title: 'Blocks/App/EmptyState',
  component: EmptyState,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A themeable empty / zero / error state with an inline SVG illustration, title, description and action. ' +
          '6 designs (minimal · illustrated · card · cta · error · search); data-prop or slot API.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

const COPY: Record<string, { title: string; description: string }> = {
  minimal: { title: 'Nothing here yet', description: 'Items you add will show up in this list.' },
  illustrated: { title: 'No projects', description: 'Create a project to organize your work.' },
  card: { title: 'Inbox zero', description: 'You have caught up on everything. Nice work.' },
  cta: { title: 'Start your first build', description: 'Spin up a themeable layout in seconds.' },
  error: { title: 'Something went wrong', description: 'We could not load this view. Try again.' },
  search: { title: 'No results found', description: 'Try a different keyword or clear the filters.' },
};

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { EmptyState, Button } from '@kasoma/comp-lib';

<EmptyState
  variant="cta"              // minimal | illustrated | card | cta | error | search
  title="Start your first build"
  description="Spin up a themeable layout in seconds."
  action={<Button>New project</Button>}
/>`,
  },
  render: () => (
    <LuxeStage switcher={false}>
      <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-2">
        {EMPTY_STATE_VARIANTS.map((variant) => (
          <div key={variant} className="relative">
            <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
              {variant}
            </span>
            <div className="overflow-hidden rounded-xl border border-edge/10 bg-canvas/40">
              <EmptyState
                variant={variant}
                title={COPY[variant].title}
                description={COPY[variant].description}
                action={
                  variant === 'search' ? (
                    <Button intent="ghost" tw={mergeTw('rounded-lg', ghostControl)}>
                      Clear filters
                    </Button>
                  ) : variant === 'error' ? (
                    <Button intent="ghost" tw={mergeTw('rounded-lg', ghostControl)}>
                      Retry
                    </Button>
                  ) : variant === 'cta' ? undefined : (
                    <Button intent="ghost" tw={mergeTw('rounded-lg', accentSolid)}>
                      New project
                    </Button>
                  )
                }
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
    sourceCode: `<EmptyState variant="card">
  <EmptyState.Icon />
  <EmptyState.Title>No results</EmptyState.Title>
  <EmptyState.Description>Try a different query.</EmptyState.Description>
  <EmptyState.Action><Button>Clear search</Button></EmptyState.Action>
</EmptyState>`,
  },
  render: () => (
    <LuxeStage switcher={false}>
      <div className="grid place-items-center p-8">
        <div className="w-full max-w-md">
          <EmptyState variant="card">
            <EmptyState.Icon />
            <div className="flex flex-col items-center gap-1.5">
              <EmptyState.Title>No results</EmptyState.Title>
              <EmptyState.Description>Try a different query.</EmptyState.Description>
            </div>
            <EmptyState.Action>
              <Button intent="ghost" tw={mergeTw('rounded-lg', accentSolid)}>
                Clear search
              </Button>
            </EmptyState.Action>
          </EmptyState>
        </div>
      </div>
    </LuxeStage>
  ),
};

export const Cta: Story = {
  render: () => (
    <LuxeStage switcher={false}>
      <div className="grid place-items-center p-8">
        <div className="w-full max-w-md">
          <EmptyState
            variant="cta"
            title="Start your first build"
            description="Spin up a themeable layout in seconds."
          />
        </div>
      </div>
    </LuxeStage>
  ),
};
