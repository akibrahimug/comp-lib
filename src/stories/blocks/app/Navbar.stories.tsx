import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Navbar, NAVBAR_VARIANTS } from '../../../components/blocks/app/Navbar';
import { LuxeStage, withSourceBelow } from '../../sections/_luxe';

const meta: Meta<typeof Navbar> = {
  title: 'Blocks/App/Navbar',
  component: Navbar,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A sticky, responsive app navigation bar composed from Button + Avatar + Input and semantic tokens. ' +
          '6 layout designs (minimal · centered · split · glass · withSearch · mega), data-prop or slot API.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Navbar>;

const LINKS = [
  { label: 'Product', active: true },
  { label: 'Solutions' },
  { label: 'Pricing' },
  { label: 'Docs' },
];

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { Navbar, Button } from '@kasoma/comp-lib';

<Navbar
  variant="split"             // minimal | centered | split | glass | withSearch | mega
  brand="comp·lib"
  links={[{ label: 'Product', active: true }, { label: 'Pricing' }, { label: 'Docs' }]}
  actions={<Button>Get started</Button>}
/>`,
  },
  render: () => (
    <LuxeStage switcher={false}>
      <div className="flex flex-col gap-10 py-8">
        {NAVBAR_VARIANTS.map((variant) => (
          <div key={variant} className="relative">
            <span className="mb-2 block px-5 font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
              {variant}
            </span>
            {/* isolate sticky positioning per preview */}
            <div className="relative overflow-hidden rounded-xl border border-edge/10">
              <Navbar variant={variant} links={LINKS} tw="!static" />
              <div className="h-24 bg-canvas/40" />
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
    sourceCode: `<Navbar variant="glass">
  <Navbar.Brand>comp·lib</Navbar.Brand>
  <Navbar.Links links={[{ label: 'Product', active: true }, { label: 'Docs' }]} />
  <Navbar.Actions>
    <Navbar.Avatar initials="AL" />
  </Navbar.Actions>
</Navbar>`,
  },
  render: () => (
    <LuxeStage switcher={false}>
      <Navbar variant="glass">
        <Navbar.Brand>
          <span className="font-display text-[17px] font-semibold tracking-tight text-fg">
            comp·lib
          </span>
        </Navbar.Brand>
        <Navbar.Links links={LINKS} tw="mx-auto" />
        <Navbar.Actions tw="ml-auto">
          <Navbar.Avatar initials="AL" />
        </Navbar.Actions>
      </Navbar>
      <div className="h-64" />
    </LuxeStage>
  ),
};

export const Split: Story = {
  render: () => (
    <LuxeStage switcher={false}>
      <Navbar variant="split" links={LINKS} />
      <div className="h-64" />
    </LuxeStage>
  ),
};
