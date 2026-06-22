import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TestimonialCard } from '../../../components/blocks/cards/TestimonialCard';
import { BLOCK_VARIANTS } from '../../../components/blocks/_shared';
import { LuxeStage, Container, Eyebrow, withSourceBelow } from '../../sections/_luxe';

const meta: Meta<typeof TestimonialCard> = {
  title: 'Blocks/Cards/TestimonialCard',
  component: TestimonialCard,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A customer-quote tile composed from the Avatar primitive and semantic tokens. ' +
          '6 designs, inline star rating and an author row with avatar; data-prop or slot API.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof TestimonialCard>;

const SAMPLE = {
  quote:
    'It paid for itself in the first week. The theming alone saved us a full design sprint — everything just re-tints.',
  name: 'Ada Lovelace',
  role: 'CTO, Analytical Engines',
  avatar: 'https://i.pravatar.cc/160?img=32',
  rating: 5,
};

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { TestimonialCard } from '@kasoma/comp-lib';

<TestimonialCard
  variant="elevated"          // minimal | bordered | elevated | glass | gradient | feature
  rating={5}
  quote="It paid for itself in the first week."
  name="Ada Lovelace"
  role="CTO, Analytical Engines"
  avatar="/ada.jpg"
/>`,
  },
  render: () => (
    <LuxeStage>
      <Container className="py-16">
        <Eyebrow>TestimonialCard · 6 designs</Eyebrow>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {BLOCK_VARIANTS.map((variant) => (
            <div key={variant} className="flex flex-col items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
                {variant}
              </span>
              <TestimonialCard variant={variant} {...SAMPLE} />
            </div>
          ))}
        </div>
      </Container>
    </LuxeStage>
  ),
};

export const Composition: Story = {
  name: 'Slot composition',
  parameters: {
    sourceCode: `<TestimonialCard variant="glass">
  <TestimonialCard.Rating value={5} />
  <TestimonialCard.Quote>
    It paid for itself in the first week.
  </TestimonialCard.Quote>
  <TestimonialCard.Author
    name="Ada Lovelace"
    role="CTO, Analytical Engines"
    avatar="/ada.jpg"
  />
</TestimonialCard>`,
  },
  render: () => (
    <LuxeStage>
      <Container className="flex justify-center py-16">
        <TestimonialCard variant="glass">
          <TestimonialCard.Rating value={5} />
          <TestimonialCard.Quote>{SAMPLE.quote}</TestimonialCard.Quote>
          <TestimonialCard.Author
            name="Ada Lovelace"
            role="CTO, Analytical Engines"
            avatar={SAMPLE.avatar}
          />
        </TestimonialCard>
      </Container>
    </LuxeStage>
  ),
};

export const Feature: Story = {
  render: () => (
    <LuxeStage>
      <Container className="flex justify-center py-16">
        <TestimonialCard variant="feature" {...SAMPLE} />
      </Container>
    </LuxeStage>
  ),
};
