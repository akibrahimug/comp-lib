import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PricingCard } from '../../../components/blocks/cards/PricingCard';
import { BLOCK_VARIANTS } from '../../../components/blocks/_shared';
import { LuxeStage, Container, Eyebrow, withSourceBelow } from '../../sections/_luxe';

/**
 * PricingCard — the reference Block. Six designs via `variant`, a compound slot
 * API for full control, and a data-prop form that renders complete out of the box.
 * Switch themes from the toolbar; every variant re-tints automatically.
 */
const meta: Meta<typeof PricingCard> = {
  title: 'Blocks/Cards/PricingCard',
  component: PricingCard,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A pre-assembled pricing tier composed from library primitives and semantic tokens. ' +
          '6 designs (minimal · bordered · elevated · glass · gradient · feature), fully themeable, ' +
          'usable via data props or the `PricingCard.*` slot API.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof PricingCard>;

const SAMPLE = {
  name: 'Pro',
  description: 'For growing teams that need more.',
  price: 29,
  period: '/mo',
  features: ['Unlimited projects', 'SSO & SAML', 'Audit log', '99.9% uptime SLA'],
  cta: 'Upgrade to Pro',
  footnote: 'Cancel anytime — no questions asked.',
};

/* ───────────────────────────── All variants ──────────────────────────────── */

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { PricingCard } from '@kasoma/comp-lib';

// One component, six designs — pass any variant:
<PricingCard
  variant="feature"          // minimal | bordered | elevated | glass | gradient | feature
  name="Pro"
  description="For growing teams that need more."
  price={29}
  period="/mo"
  features={['Unlimited projects', 'SSO & SAML', 'Audit log', '99.9% uptime SLA']}
  cta="Upgrade to Pro"
  ribbon="Most popular"
  footnote="Cancel anytime — no questions asked."
/>`,
  },
  render: () => (
    <LuxeStage>
      <Container className="py-16">
        <Eyebrow>PricingCard · 6 designs</Eyebrow>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {BLOCK_VARIANTS.map((variant) => (
            <div key={variant} className="flex flex-col items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
                {variant}
              </span>
              <PricingCard
                variant={variant}
                {...SAMPLE}
                ribbon={variant === 'feature' ? 'Most popular' : undefined}
              />
            </div>
          ))}
        </div>
      </Container>
    </LuxeStage>
  ),
};

/* ─────────────────────────── Slot composition ─────────────────────────────── */

export const Composition: Story = {
  name: 'Slot composition',
  parameters: {
    sourceCode: `import { PricingCard } from '@kasoma/comp-lib';

// Full structural control via the compound slot API:
<PricingCard variant="gradient">
  <PricingCard.Ribbon>Most popular</PricingCard.Ribbon>
  <PricingCard.Header name="Pro" description="For growing teams" />
  <PricingCard.Price amount={29} period="/mo" />
  <PricingCard.Features
    items={[
      'Unlimited projects',
      'SSO & SAML',
      { label: 'Phone support', included: false },
    ]}
  />
  <PricingCard.Action>Upgrade to Pro</PricingCard.Action>
  <PricingCard.Footer>Cancel anytime</PricingCard.Footer>
</PricingCard>`,
  },
  render: () => (
    <LuxeStage>
      <Container className="flex justify-center py-16">
        <PricingCard variant="gradient">
          <PricingCard.Ribbon>Most popular</PricingCard.Ribbon>
          <PricingCard.Header name="Pro" description="For growing teams" />
          <PricingCard.Price amount={29} period="/mo" />
          <PricingCard.Features
            items={[
              'Unlimited projects',
              'SSO & SAML',
              'Audit log',
              { label: 'Phone support', included: false },
            ]}
          />
          <PricingCard.Action>Upgrade to Pro</PricingCard.Action>
          <PricingCard.Footer>Cancel anytime</PricingCard.Footer>
        </PricingCard>
      </Container>
    </LuxeStage>
  ),
};

/* ─────────────────────────── Single (Feature) ─────────────────────────────── */

export const Feature: Story = {
  render: () => (
    <LuxeStage>
      <Container className="flex justify-center py-16">
        <PricingCard variant="feature" ribbon="Most popular" {...SAMPLE} />
      </Container>
    </LuxeStage>
  ),
};
