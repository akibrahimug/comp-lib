import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  PricingTable,
  PRICING_TABLE_VARIANTS,
  type PricingTier,
} from '../../../components/blocks/marketing/PricingTable';
import { LuxeStage, withSourceBelow } from '../../sections/_luxe';

const meta: Meta<typeof PricingTable> = {
  title: 'Blocks/Marketing/PricingTable',
  component: PricingTable,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A full-width pricing section that composes the PricingCard block, themed with semantic tokens. ' +
          '6 layout designs (cards · comparison · toggle · twoTier · glass · gradient); the toggle variant swaps monthly/annual prices.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof PricingTable>;

const TIERS: PricingTier[] = [
  {
    name: 'Starter',
    description: 'For side projects.',
    price: 0,
    annualPrice: 0,
    features: ['1 project', 'Community support', 'Up to 1k MAU'],
    cta: 'Start free',
  },
  {
    name: 'Pro',
    description: 'For growing teams.',
    price: 29,
    annualPrice: 23,
    features: ['Unlimited projects', 'SSO + audit log', '99.9% SLA', 'Priority support'],
    cta: 'Upgrade',
    ribbon: 'Most popular',
    highlighted: true,
  },
  {
    name: 'Scale',
    description: 'For large orgs.',
    price: 99,
    annualPrice: 79,
    features: ['Everything in Pro', 'SAML + SCIM', 'Dedicated CSM', 'Custom contracts'],
    cta: 'Contact sales',
  },
];

const TWO_TIERS = TIERS.slice(0, 2);

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { PricingTable } from '@kasoma/comp-lib';

<PricingTable
  variant="cards"             // cards | comparison | toggle | twoTier | glass | gradient
  eyebrow="Pricing"
  title="Simple, fair pricing."
  tiers={[
    { name: 'Pro', price: 29, annualPrice: 23, features: ['SSO'], cta: 'Upgrade', ribbon: 'Most popular', highlighted: true },
    // …
  ]}
/>`,
  },
  render: () => (
    <LuxeStage>
      {PRICING_TABLE_VARIANTS.map((variant) => (
        <div key={variant} className="relative">
          <span className="absolute left-5 top-4 z-10 font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
            {variant}
          </span>
          <PricingTable
            variant={variant}
            eyebrow="Pricing"
            title="Simple, fair pricing."
            tiers={variant === 'twoTier' ? TWO_TIERS : TIERS}
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
    sourceCode: `<PricingTable variant="cards">
  <PricingTable.Title>Simple, fair pricing.</PricingTable.Title>
  <PricingTable.Tiers tiers={tiers} className="mt-12" />
</PricingTable>`,
  },
  render: () => (
    <LuxeStage>
      <PricingTable variant="cards">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <PricingTable.Title>Simple, fair pricing.</PricingTable.Title>
        </div>
        <PricingTable.Tiers tiers={TIERS} className="mt-12" />
      </PricingTable>
    </LuxeStage>
  ),
};

export const Toggle: Story = {
  name: 'Monthly / annual toggle',
  render: () => (
    <LuxeStage>
      <PricingTable
        variant="toggle"
        eyebrow="Pricing"
        title="Pay monthly or save with annual."
        tiers={TIERS}
      />
    </LuxeStage>
  ),
};
