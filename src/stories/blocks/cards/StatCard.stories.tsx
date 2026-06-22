import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from '../../../components/blocks/cards/StatCard';
import { BLOCK_VARIANTS } from '../../../components/blocks/_shared';
import { LuxeStage, Container, Eyebrow, withSourceBelow } from '../../sections/_luxe';

const WalletIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M3 7a2 2 0 012-2h11a2 2 0 012 2v1h1a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7zm14 4a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const meta: Meta<typeof StatCard> = {
  title: 'Blocks/Cards/StatCard',
  component: StatCard,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A KPI / metric tile with label, value, trend delta (green up / red down) and an optional icon. ' +
          '6 designs, themeable, data-prop or slot API.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof StatCard>;

const SAMPLE = {
  label: 'Monthly revenue',
  value: '$48,210',
  delta: '12.4%',
  deltaDirection: 'up' as const,
  hint: 'vs last month',
  icon: <WalletIcon />,
};

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { StatCard } from '@kasoma/comp-lib';

<StatCard
  variant="elevated"          // minimal | bordered | elevated | glass | gradient | feature
  label="Monthly revenue"
  value="$48,210"
  delta="12.4%"
  deltaDirection="up"
  hint="vs last month"
  icon={<WalletIcon />}
/>`,
  },
  render: () => (
    <LuxeStage>
      <Container className="py-16">
        <Eyebrow>StatCard · 6 designs</Eyebrow>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {BLOCK_VARIANTS.map((variant) => (
            <div key={variant} className="flex flex-col items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
                {variant}
              </span>
              <StatCard
                variant={variant}
                {...SAMPLE}
                deltaDirection={variant === 'bordered' ? 'down' : 'up'}
                delta={variant === 'bordered' ? '3.1%' : '12.4%'}
              />
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
    sourceCode: `<StatCard variant="glass">
  <StatCard.Icon><WalletIcon /></StatCard.Icon>
  <StatCard.Label>Monthly revenue</StatCard.Label>
  <StatCard.Value>$48,210</StatCard.Value>
  <StatCard.Delta direction="up">12.4%</StatCard.Delta>
  <StatCard.Hint>vs last month</StatCard.Hint>
</StatCard>`,
  },
  render: () => (
    <LuxeStage>
      <Container className="flex justify-center py-16">
        <StatCard variant="glass">
          <div className="flex items-start justify-between gap-3">
            <StatCard.Label>Monthly revenue</StatCard.Label>
            <StatCard.Icon>
              <WalletIcon />
            </StatCard.Icon>
          </div>
          <StatCard.Value>$48,210</StatCard.Value>
          <div className="mt-1 flex items-center gap-2">
            <StatCard.Delta direction="up">12.4%</StatCard.Delta>
            <StatCard.Hint>vs last month</StatCard.Hint>
          </div>
        </StatCard>
      </Container>
    </LuxeStage>
  ),
};

export const Feature: Story = {
  render: () => (
    <LuxeStage>
      <Container className="flex justify-center py-16">
        <StatCard variant="feature" {...SAMPLE} />
      </Container>
    </LuxeStage>
  ),
};
