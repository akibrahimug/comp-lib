import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SettingsForm, SETTINGSFORM_VARIANTS } from '../../../components/blocks/forms/SettingsForm';
import { LuxeStage, Container, withSourceBelow } from '../../sections/_luxe';

const meta: Meta<typeof SettingsForm> = {
  title: 'Blocks/Forms/SettingsForm',
  component: SettingsForm,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A grouped settings form (profile / account / notifications) with a sticky save bar, ' +
          'composed from Input + Select + Textarea + Toggle. 6 layout designs.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SettingsForm>;

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { SettingsForm } from '@kasoma/comp-lib';

<SettingsForm variant="tabs" />  // tabs | sections | sidebar | cards | inline | split`,
  },
  render: () => (
    <LuxeStage>
      <Container className="flex flex-col gap-14 py-16">
        {SETTINGSFORM_VARIANTS.map((v) => (
          <div key={v} className="flex flex-col gap-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
              {v}
            </span>
            <SettingsForm variant={v} />
          </div>
        ))}
      </Container>
    </LuxeStage>
  ),
};

export const Tabs: Story = {
  render: () => (
    <LuxeStage>
      <Container className="py-16">
        <SettingsForm variant="tabs" />
      </Container>
    </LuxeStage>
  ),
};
