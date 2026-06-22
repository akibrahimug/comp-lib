import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Hero, HERO_VARIANTS } from '../../../components/blocks/marketing/Hero';
import { LuxeStage, withSourceBelow } from '../../sections/_luxe';

const meta: Meta<typeof Hero> = {
  title: 'Blocks/Marketing/Hero',
  component: Hero,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A full-width marketing hero section composed from Button + Badge and semantic tokens. ' +
          '6 layout designs (split · centered · imageRight · gradient · glass · video), data-prop or slot API.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Hero>;

const SAMPLE = {
  eyebrow: 'v1.4 — themeable',
  title: 'Interfaces that feel quietly expensive.',
  subtitle:
    'A Tailwind-first, variant-driven React system. Drop in a section, switch the theme, ship.',
  primaryCta: 'Start building',
  secondaryCta: 'Read the docs',
  image: 'https://picsum.photos/seed/hero/720/540',
};

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { Hero } from '@kasoma/comp-lib';

<Hero
  variant="split"             // split | centered | imageRight | gradient | glass | video
  eyebrow="v1.4 — themeable"
  title="Interfaces that feel quietly expensive."
  subtitle="A Tailwind-first, variant-driven React system."
  primaryCta="Start building"
  secondaryCta="Read the docs"
  image="/hero.jpg"
/>`,
  },
  render: () => (
    <LuxeStage>
      {HERO_VARIANTS.map((variant) => (
        <div key={variant} className="relative">
          <span className="absolute left-5 top-4 z-10 font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
            {variant}
          </span>
          <Hero variant={variant} {...SAMPLE} />
          <div className="h-px w-full bg-edge/10" />
        </div>
      ))}
    </LuxeStage>
  ),
};

export const Composition: Story = {
  name: 'Slot composition',
  parameters: {
    sourceCode: `<Hero variant="centered">
  <Hero.Eyebrow>v1.4 — themeable</Hero.Eyebrow>
  <Hero.Title>Interfaces that feel quietly expensive.</Hero.Title>
  <Hero.Subtitle>A Tailwind-first, variant-driven React system.</Hero.Subtitle>
  <Hero.Actions primaryCta="Start building" secondaryCta="Read the docs" />
</Hero>`,
  },
  render: () => (
    <LuxeStage>
      <Hero variant="centered">
        <Hero.Eyebrow>v1.4 — themeable</Hero.Eyebrow>
        <Hero.Title>Interfaces that feel quietly expensive.</Hero.Title>
        <Hero.Subtitle>
          A Tailwind-first, variant-driven React system.
        </Hero.Subtitle>
        <Hero.Actions primaryCta="Start building" secondaryCta="Read the docs" />
      </Hero>
    </LuxeStage>
  ),
};

export const Split: Story = {
  render: () => (
    <LuxeStage>
      <Hero variant="split" {...SAMPLE} />
    </LuxeStage>
  ),
};
