import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  CommandPalette,
  COMMAND_PALETTE_VARIANTS,
  type CommandPaletteVariant,
} from '../../../components/blocks/app/CommandPalette';
import { Button } from '../../../components/Button';
import { Kbd } from '../../../components/Kbd';
import { accentSolid, ghostControl, mergeTw } from '../../../components/blocks/_shared';
import { LuxeStage, withSourceBelow } from '../../sections/_luxe';

const meta: Meta<typeof CommandPalette> = {
  title: 'Blocks/App/CommandPalette',
  component: CommandPalette,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A themeable ⌘K command menu composing the library Dialog + Input + Kbd. ' +
          'Controlled via open / onOpenChange, filters items by typed text. ' +
          '6 designs (minimal · grouped · withFooter · icons · recent · glass); data-prop or slot API.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof CommandPalette>;

const GROUPS = [
  {
    label: 'Suggestions',
    items: [
      { label: 'Search documentation', shortcut: '⌘ D' },
      { label: 'Create new project', shortcut: '⌘ N' },
      { label: 'Open settings', shortcut: '⌘ ,' },
    ],
  },
  {
    label: 'Navigation',
    items: [
      { label: 'Go to dashboard' },
      { label: 'Go to billing' },
      { label: 'Go to team members' },
    ],
  },
];

/** A trigger + palette demo wired to local state. */
function PaletteDemo({ variant }: { variant: CommandPaletteVariant }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        intent="ghost"
        onClick={() => setOpen(true)}
        tw={mergeTw('gap-3 rounded-lg', ghostControl)}
      >
        <span className="text-fg-muted">Search…</span>
        <span className="flex items-center gap-1">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </span>
      </Button>
      <CommandPalette
        variant={variant}
        open={open}
        onOpenChange={setOpen}
        groups={GROUPS}
      />
    </div>
  );
}

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { CommandPalette } from '@kasoma/comp-lib';

const [open, setOpen] = useState(false);

<CommandPalette
  variant="grouped"          // minimal | grouped | withFooter | icons | recent | glass
  open={open}
  onOpenChange={setOpen}
  groups={[
    { label: 'Suggestions', items: [
      { label: 'Create new project', shortcut: '⌘ N' },
      { label: 'Open settings', shortcut: '⌘ ,' },
    ] },
  ]}
/>`,
  },
  render: () => (
    <LuxeStage switcher={false}>
      <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 lg:grid-cols-3">
        {COMMAND_PALETTE_VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
              {variant}
            </span>
            <PaletteDemo variant={variant} />
          </div>
        ))}
      </div>
    </LuxeStage>
  ),
};

export const Composition: Story = {
  name: 'Slot composition',
  parameters: {
    sourceCode: `<CommandPalette variant="withFooter" open={open} onOpenChange={setOpen}>
  <CommandPalette.Input value={q} onValueChange={setQ} />
  <CommandPalette.Group label="Actions">
    <CommandPalette.Item icon={…} shortcut="⌘ N">New file</CommandPalette.Item>
    <CommandPalette.Item shortcut="⌘ ,">Settings</CommandPalette.Item>
  </CommandPalette.Group>
  <CommandPalette.Footer />
</CommandPalette>`,
  },
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(false);
      const [q, setQ] = useState('');
      return (
        <div>
          <Button
            intent="ghost"
            onClick={() => setOpen(true)}
            tw={mergeTw('rounded-lg', accentSolid)}
          >
            Open command palette
          </Button>
          <CommandPalette variant="withFooter" open={open} onOpenChange={setOpen}>
            <CommandPalette.Input value={q} onValueChange={setQ} />
            <div className="py-1">
              <CommandPalette.Group label="Actions">
                <CommandPalette.Item shortcut="⌘ N" onSelect={() => setOpen(false)}>
                  New file
                </CommandPalette.Item>
                <CommandPalette.Item shortcut="⌘ ," onSelect={() => setOpen(false)}>
                  Settings
                </CommandPalette.Item>
              </CommandPalette.Group>
            </div>
            <CommandPalette.Footer />
          </CommandPalette>
        </div>
      );
    }
    return (
      <LuxeStage switcher={false}>
        <div className="grid place-items-center p-16">
          <Demo />
        </div>
      </LuxeStage>
    );
  },
};

export const Grouped: Story = {
  render: () => (
    <LuxeStage switcher={false}>
      <div className="grid place-items-center p-16">
        <PaletteDemo variant="grouped" />
      </div>
    </LuxeStage>
  ),
};
