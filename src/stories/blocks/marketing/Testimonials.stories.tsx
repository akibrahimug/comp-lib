import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Testimonials,
  TESTIMONIALS_VARIANTS,
} from '../../../components/blocks/marketing/Testimonials';
import { LuxeStage, withSourceBelow } from '../../sections/_luxe';

const meta: Meta<typeof Testimonials> = {
  title: 'Blocks/Marketing/Testimonials',
  component: Testimonials,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A full-width social-proof section composed from Avatar + inline stars and semantic tokens. ' +
          '6 layout designs (grid · single · carousel · masonry · logos · gradient), data-prop or slot API.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Testimonials>;

const SAMPLE = {
  eyebrow: 'Loved by builders',
  title: 'Teams ship faster with the system.',
  items: [
    { quote: 'We swapped four themes in a sprint without touching a single component. Wild.', name: 'Ada Okafor', role: 'Head of Design, Northwind', avatar: 'https://i.pravatar.cc/96?img=5' },
    { quote: 'The compound APIs mean I never fork a component just to tweak one slot.', name: 'Marco Reyes', role: 'Staff Engineer, Helios', avatar: 'https://i.pravatar.cc/96?img=12' },
    { quote: 'Genuinely the most polished Tailwind kit we have shipped to production.', name: 'Lena Vogt', role: 'CTO, Fernweh', avatar: 'https://i.pravatar.cc/96?img=32' },
    { quote: 'Accessibility was already handled — that alone saved us weeks.', name: 'Priya Nair', role: 'Frontend Lead, Lumen', avatar: 'https://i.pravatar.cc/96?img=47' },
    { quote: 'The theme tokens are the right abstraction. Everything just re-tints.', name: 'Tom Bauer', role: 'Founder, Driftless', avatar: 'https://i.pravatar.cc/96?img=15' },
    { quote: 'It feels quietly expensive out of the box, which is exactly what we wanted.', name: 'Sofia Marchetti', role: 'Design Eng, Cobalt', avatar: 'https://i.pravatar.cc/96?img=24' },
  ],
};

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { Testimonials } from '@kasoma/comp-lib';

<Testimonials
  variant="grid"              // grid | single | carousel | masonry | logos | gradient
  eyebrow="Loved by builders"
  title="Teams ship faster with the system."
  items={[
    { quote: 'We swapped four themes in a sprint.', name: 'Ada Okafor', role: 'Head of Design', avatar: '/ada.jpg' },
    // …
  ]}
/>`,
  },
  render: () => (
    <LuxeStage>
      {TESTIMONIALS_VARIANTS.map((variant) => (
        <div key={variant} className="relative">
          <span className="absolute left-5 top-4 z-10 font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
            {variant}
          </span>
          <Testimonials
            variant={variant}
            {...SAMPLE}
            items={variant === 'single' ? SAMPLE.items.slice(0, 1) : SAMPLE.items}
          />
          <div className="h-px w-full bg-edge/10" />
        </div>
      ))}
    </LuxeStage>
  ),
};

export const Composition: Story = {
  name: 'Slot composition',
  parameters: {
    sourceCode: `<Testimonials variant="grid">
  <Testimonials.Title>Teams ship faster.</Testimonials.Title>
  <Testimonials.Items items={items} className="mt-14" />
</Testimonials>`,
  },
  render: () => (
    <LuxeStage>
      <Testimonials variant="grid">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <Testimonials.Eyebrow>Loved by builders</Testimonials.Eyebrow>
          <Testimonials.Title>Teams ship faster.</Testimonials.Title>
        </div>
        <Testimonials.Items items={SAMPLE.items.slice(0, 3)} className="mt-14" />
      </Testimonials>
    </LuxeStage>
  ),
};

export const Single: Story = {
  render: () => (
    <LuxeStage>
      <Testimonials
        variant="single"
        eyebrow="Loved by builders"
        title="One voice, front and center."
        items={SAMPLE.items.slice(0, 1)}
      />
    </LuxeStage>
  ),
};
