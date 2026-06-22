import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FAQ, FAQ_VARIANTS } from '../../../components/blocks/marketing/FAQ';
import { LuxeStage, withSourceBelow } from '../../sections/_luxe';

const meta: Meta<typeof FAQ> = {
  title: 'Blocks/Marketing/FAQ',
  component: FAQ,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A full-width FAQ section that composes the Accordion primitive, restyled onto semantic tokens. ' +
          '6 layout designs (accordion · twoColumn · bordered · cards · centered · split), data-prop or slot API.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof FAQ>;

const SAMPLE = {
  eyebrow: 'Help center',
  title: 'Frequently asked questions',
  items: [
    { q: 'Is the whole system themeable?', a: 'Yes. Every block is styled only through semantic tokens, so flipping one data-theme attribute re-tints the entire suite.' },
    { q: 'Can I compose my own structure?', a: 'Every block ships a compound slot API alongside the data-prop form — render children for total control.' },
    { q: 'Does it work with Tailwind?', a: 'It is Tailwind-first. The tw prop merges last via twMerge so your overrides always win.' },
    { q: 'Is it accessible?', a: 'Keyboard navigation, focus management and ARIA wiring are handled by the underlying primitives.' },
    { q: 'How big is the bundle?', a: 'Primitives are tree-shaken and there is no runtime theme cost — you pay only for what you import.' },
    { q: 'Can I bring my own icons?', a: 'Yes. Icon slots accept any ReactNode, so inline SVGs or your icon library both work.' },
  ],
};

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { FAQ } from '@kasoma/comp-lib';

<FAQ
  variant="accordion"         // accordion | twoColumn | bordered | cards | centered | split
  eyebrow="Help center"
  title="Frequently asked questions"
  items={[
    { q: 'Is the whole system themeable?', a: 'Yes — semantic tokens.' },
    // …
  ]}
/>`,
  },
  render: () => (
    <LuxeStage>
      {FAQ_VARIANTS.map((variant) => (
        <div key={variant} className="relative">
          <span className="absolute left-5 top-4 z-10 font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
            {variant}
          </span>
          <FAQ variant={variant} {...SAMPLE} />
          <div className="h-px w-full bg-edge/10" />
        </div>
      ))}
    </LuxeStage>
  ),
};

export const Composition: Story = {
  name: 'Slot composition',
  parameters: {
    sourceCode: `<FAQ variant="twoColumn">
  <FAQ.Title>Frequently asked questions</FAQ.Title>
  <FAQ.Items items={items} className="mt-12" />
</FAQ>`,
  },
  render: () => (
    <LuxeStage>
      <FAQ variant="twoColumn">
        <div className="flex max-w-2xl flex-col gap-4">
          <FAQ.Eyebrow>Help center</FAQ.Eyebrow>
          <FAQ.Title>Frequently asked questions</FAQ.Title>
        </div>
        <FAQ.Items items={SAMPLE.items} className="mt-12" />
      </FAQ>
    </LuxeStage>
  ),
};

export const Split: Story = {
  render: () => (
    <LuxeStage>
      <FAQ variant="split" {...SAMPLE} />
    </LuxeStage>
  ),
};
