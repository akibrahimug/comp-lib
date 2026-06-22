import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  CTASection,
  CTA_SECTION_VARIANTS,
} from '../../../components/blocks/marketing/CTASection';
import { LuxeStage, withSourceBelow } from '../../sections/_luxe';

const meta: Meta<typeof CTASection> = {
  title: 'Blocks/Marketing/CTASection',
  component: CTASection,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A full-width call-to-action section composed from Button + semantic tokens. ' +
          '6 layout designs (simple · centered · split · gradient · glass · card), data-prop or slot API.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof CTASection>;

const SAMPLE = {
  title: 'Ready to ship something that feels expensive?',
  subtitle:
    'Drop in a section, switch the theme, and go live. No design system to maintain.',
  primaryCta: 'Start building',
  secondaryCta: 'Read the docs',
};

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { CTASection } from '@kasoma/comp-lib';

<CTASection
  variant="gradient"          // simple | centered | split | gradient | glass | card
  title="Ready to ship something that feels expensive?"
  subtitle="Drop in a section, switch the theme, and go live."
  primaryCta="Start building"
  secondaryCta="Read the docs"
/>`,
  },
  render: () => (
    <LuxeStage>
      {CTA_SECTION_VARIANTS.map((variant) => (
        <div key={variant} className="relative">
          <span className="absolute left-5 top-4 z-10 font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
            {variant}
          </span>
          <CTASection variant={variant} {...SAMPLE} />
          <div className="h-px w-full bg-edge/10" />
        </div>
      ))}
    </LuxeStage>
  ),
};

export const Composition: Story = {
  name: 'Slot composition',
  parameters: {
    sourceCode: `<CTASection variant="card">
  <CTASection.Title>Ready to ship?</CTASection.Title>
  <CTASection.Subtitle>Drop in a section, switch the theme, go live.</CTASection.Subtitle>
  <CTASection.Actions primaryCta="Start building" secondaryCta="Read the docs" />
</CTASection>`,
  },
  render: () => (
    <LuxeStage>
      <CTASection variant="card">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <CTASection.Title>Ready to ship?</CTASection.Title>
          <CTASection.Subtitle>
            Drop in a section, switch the theme, and go live.
          </CTASection.Subtitle>
          <CTASection.Actions primaryCta="Start building" secondaryCta="Read the docs" />
        </div>
      </CTASection>
    </LuxeStage>
  ),
};

export const Gradient: Story = {
  render: () => (
    <LuxeStage>
      <CTASection variant="gradient" {...SAMPLE} />
    </LuxeStage>
  ),
};
