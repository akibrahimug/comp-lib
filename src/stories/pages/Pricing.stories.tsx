import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Toggle } from '../../components/Toggle';
import { Table } from '../../components/Table';
import { Accordion } from '../../components/Accordion';
import {
  LuxeStage,
  Container,
  Eyebrow,
  Logo,
  Icon,
  ThemeSwitcher,
  surface,
  accentBtn,
  ghostBtn,
} from '../sections/_luxe';

const meta: Meta = {
  title: 'Pages/Pricing',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A complete pricing page — tier cards, a full feature-comparison table, and an FAQ — composed from the component library and runtime-themeable.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

function NavBar() {
  return (
    <div className="sticky top-0 z-40 border-b border-edge/10 bg-canvas/70 backdrop-blur-xl">
      <Container className="flex items-center justify-between py-4">
        <Logo />
        <div className="flex items-center gap-3">
          <ThemeSwitcher className="hidden lg:inline-flex" />
          <Button size="sm" tw={accentBtn}>Get started</Button>
        </div>
      </Container>
    </div>
  );
}

const tiers = [
  { name: 'Solo', monthly: 0, blurb: 'For side-projects.', featured: false },
  { name: 'Studio', monthly: 24, blurb: 'For product teams.', featured: true },
  { name: 'Foundry', monthly: null as number | null, blurb: 'For platforms.', featured: false },
];

const matrix: { label: string; values: (boolean | string)[] }[] = [
  { label: 'Components', values: ['32', '32', '32'] },
  { label: 'Showcase sections', values: [true, true, true] },
  { label: 'Figma design kit', values: [false, true, true] },
  { label: 'Theme builder', values: [false, true, true] },
  { label: 'White-label tokens', values: [false, false, true] },
  { label: 'Priority support', values: [false, true, true] },
  { label: 'Dedicated engineer', values: [false, false, true] },
  { label: 'SLA & security audits', values: [false, false, true] },
];

const faqs = [
  { v: 'switch', q: 'Can I change plans later?', a: 'Yes — upgrade or downgrade at any time. Changes are prorated automatically.' },
  { v: 'trial', q: 'Is there a free trial?', a: 'Solo is free forever. Studio includes a 14-day trial, no card required.' },
  { v: 'refund', q: 'What is your refund policy?', a: 'Full refund within 30 days, no questions asked.' },
];

const Cell = ({ v }: { v: boolean | string }) =>
  typeof v === 'string' ? (
    <span className="text-fg">{v}</span>
  ) : v ? (
    <Icon name="check" className="mx-auto h-4 w-4 text-accent" />
  ) : (
    <Icon name="x" className="mx-auto h-4 w-4 text-fg-subtle/40" />
  );

export const FullPage: Story = {
  render: () => {
    const Demo = () => {
      const [annual, setAnnual] = useState(true);
      const priceOf = (m: number | null) => (m === null ? 'Custom' : m === 0 ? '$0' : annual ? `$${Math.round(m * 0.8)}` : `$${m}`);
      return (
        <LuxeStage>
          <NavBar />
          <Container className="py-16 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Pricing</Eyebrow>
              <h1 className="mt-5 font-display text-4xl font-light tracking-tight text-fg sm:text-6xl">
                Simple pricing, <span className="italic text-accent-gradient">serious polish.</span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg text-fg-muted">
                Start free. Upgrade when your team is ready. Every plan ships the full component set.
              </p>
              <div className="mx-auto mt-7 flex w-fit flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl border border-edge/12 bg-fg/[0.04] px-4 py-2.5">
                <span className={`text-sm ${!annual ? 'text-fg' : 'text-fg-subtle'}`}>Monthly</span>
                <Toggle checked={annual} onChange={() => setAnnual((v) => !v)} />
                <span className={`text-sm ${annual ? 'text-fg' : 'text-fg-subtle'}`}>Annual</span>
                <Badge tw="bg-accent/10 text-accent border border-accent/30">Save 20%</Badge>
              </div>
            </div>

            {/* Tier cards */}
            <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
              {tiers.map((t, idx) => (
                <div
                  key={t.name}
                  className={`relative animate-fade-up p-8 ${t.featured ? 'rounded-3xl border border-accent/40 bg-accent/[0.07] shadow-accent' : surface.card}`}
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  {t.featured && (
                    <div className="absolute -top-3 left-8">
                      <Badge tw="bg-accent text-onaccent border-0 px-3 py-1 font-semibold uppercase tracking-wider">Most popular</Badge>
                    </div>
                  )}
                  <h3 className="font-display text-xl text-fg">{t.name}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{t.blurb}</p>
                  <div className="mt-6 flex items-end gap-1">
                    <span className="font-display text-5xl font-light text-fg">{priceOf(t.monthly)}</span>
                    {t.monthly !== null && t.monthly > 0 && <span className="mb-1.5 text-sm text-fg-subtle">/{annual ? 'mo, billed yearly' : 'mo'}</span>}
                  </div>
                  <Button fullWidth intent={t.featured ? 'primary' : 'ghost'} tw={`mt-6 ${t.featured ? accentBtn : ghostBtn}`}>
                    {t.monthly === null ? 'Contact sales' : `Choose ${t.name}`}
                  </Button>
                </div>
              ))}
            </div>

            {/* Comparison table */}
            <div className="mt-20">
              <h2 className="text-center font-display text-2xl font-light text-fg sm:text-3xl">Compare every feature</h2>
              <div className={`${surface.card} mt-8 overflow-hidden p-0`}>
                <Table.Root hoverable>
                  <Table.Header>
                    <Table.Row>
                      <Table.Head className="text-fg-muted">Feature</Table.Head>
                      {tiers.map((t) => (
                        <Table.Head key={t.name} className={`text-center ${t.featured ? 'text-accent' : 'text-fg'}`}>{t.name}</Table.Head>
                      ))}
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {matrix.map((row) => (
                      <Table.Row key={row.label}>
                        <Table.Cell className="font-medium text-fg">{row.label}</Table.Cell>
                        {row.values.map((v, i) => (
                          <Table.Cell key={i} className="text-center"><Cell v={v} /></Table.Cell>
                        ))}
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </div>
            </div>

            {/* FAQ */}
            <div className="mx-auto mt-20 max-w-2xl">
              <h2 className="text-center font-display text-2xl font-light text-fg sm:text-3xl">Billing questions</h2>
              <div className={`${surface.card} mt-8 p-2 sm:p-3`}>
                <Accordion.Root type="single" collapsible defaultValue={['switch']}>
                  {faqs.map((f) => (
                    <Accordion.Item key={f.v} value={f.v}>
                      <Accordion.Trigger>{f.q}</Accordion.Trigger>
                      <Accordion.Content>{f.a}</Accordion.Content>
                    </Accordion.Item>
                  ))}
                </Accordion.Root>
              </div>
            </div>
          </Container>
        </LuxeStage>
      );
    };
    return <Demo />;
  },
};
