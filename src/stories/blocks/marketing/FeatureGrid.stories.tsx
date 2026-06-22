import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  FeatureGrid,
  FEATURE_GRID_VARIANTS,
} from '../../../components/blocks/marketing/FeatureGrid';
import { LuxeStage, withSourceBelow } from '../../sections/_luxe';

const meta: Meta<typeof FeatureGrid> = {
  title: 'Blocks/Marketing/FeatureGrid',
  component: FeatureGrid,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A full-width marketing features section, themed with semantic tokens. ' +
          '6 layout designs (grid3 · grid2 · alternating · iconLeft · bordered · spotlight), data-prop or slot API.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof FeatureGrid>;

const Bolt = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
    <path
      d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const SAMPLE = {
  eyebrow: 'Why teams switch',
  title: 'Everything you need, nothing you don’t.',
  subtitle:
    'A Tailwind-first, variant-driven system. Each feature re-tints automatically across every theme.',
  features: [
    { icon: Bolt, title: 'Blazing fast', description: 'Tree-shaken primitives with zero runtime theme cost.' },
    { icon: Bolt, title: 'Themeable', description: 'Semantic tokens flip the whole suite in one attribute.' },
    { icon: Bolt, title: 'Composable', description: 'Compound slot APIs give you total structural control.' },
    { icon: Bolt, title: 'Accessible', description: 'Keyboard, focus and ARIA wiring handled for you.' },
    { icon: Bolt, title: 'Typed', description: 'Strict TypeScript with discriminated variant unions.' },
    { icon: Bolt, title: 'Documented', description: 'Every block ships with live Storybook examples.' },
  ],
};

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { FeatureGrid } from '@kasoma/comp-lib';

<FeatureGrid
  variant="grid3"             // grid3 | grid2 | alternating | iconLeft | bordered | spotlight
  eyebrow="Why teams switch"
  title="Everything you need, nothing you don’t."
  subtitle="A Tailwind-first, variant-driven system."
  features={[
    { icon: <Bolt />, title: 'Blazing fast', description: 'Tree-shaken primitives.' },
    // …
  ]}
/>`,
  },
  render: () => (
    <LuxeStage>
      {FEATURE_GRID_VARIANTS.map((variant) => (
        <div key={variant} className="relative">
          <span className="absolute left-5 top-4 z-10 font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
            {variant}
          </span>
          <FeatureGrid variant={variant} {...SAMPLE} />
          <div className="h-px w-full bg-edge/10" />
        </div>
      ))}
    </LuxeStage>
  ),
};

export const Composition: Story = {
  name: 'Slot composition',
  parameters: {
    sourceCode: `<FeatureGrid variant="grid2">
  <FeatureGrid.Eyebrow>Why teams switch</FeatureGrid.Eyebrow>
  <FeatureGrid.Title>Everything you need.</FeatureGrid.Title>
  <FeatureGrid.Items>
    <FeatureGrid.Item title="Blazing fast" description="Tree-shaken primitives." />
    <FeatureGrid.Item title="Themeable" description="Semantic tokens." />
  </FeatureGrid.Items>
</FeatureGrid>`,
  },
  render: () => (
    <LuxeStage>
      <FeatureGrid variant="grid2">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <FeatureGrid.Eyebrow>Why teams switch</FeatureGrid.Eyebrow>
          <FeatureGrid.Title>Everything you need.</FeatureGrid.Title>
        </div>
        <FeatureGrid.Items className="mt-12">
          <FeatureGrid.Item icon={Bolt} title="Blazing fast" description="Tree-shaken primitives." />
          <FeatureGrid.Item icon={Bolt} title="Themeable" description="Semantic tokens flip the suite." />
        </FeatureGrid.Items>
      </FeatureGrid>
    </LuxeStage>
  ),
};

export const Spotlight: Story = {
  render: () => (
    <LuxeStage>
      <FeatureGrid variant="spotlight" {...SAMPLE} />
    </LuxeStage>
  ),
};
