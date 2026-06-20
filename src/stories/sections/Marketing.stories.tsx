import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Toggle } from '../../components/Toggle';
import {
  LuxeStage,
  Container,
  Eyebrow,
  Chip,
  Logo,
  Icon,
  surface,
  accentBtn,
  ghostBtn,
} from './_luxe';

const meta: Meta = {
  title: 'Sections/Marketing',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'Marketing sections composed entirely from the component library and dressed in the runtime-themeable identity. Switch themes from the swatch picker (top-right).',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

/* ─────────────────────────────── Top nav ──────────────────────────────── */

function NavBar() {
  const links = ['Components', 'Sections', 'Tokens', 'Docs'];
  const [active, setActive] = useState('Components');
  return (
    <Container className="flex items-center justify-between py-6">
      <Logo />
      <nav className="hidden items-center gap-1 md:flex">
        {links.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setActive(l)}
            className={`rounded-lg px-3 py-2 text-sm transition-colors ${
              active === l ? 'bg-fg/[0.06] text-fg' : 'text-fg-muted hover:text-fg'
            }`}
          >
            {l}
          </button>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <Button intent="ghost" size="sm" tw={ghostBtn + ' hidden sm:inline-flex'}>
          Sign in
        </Button>
        <Button size="sm" tw={accentBtn}>Get started</Button>
      </div>
    </Container>
  );
}

/* ──────────────────────────────── HERO ────────────────────────────────── */

export const Hero: Story = {
  render: () => (
    <LuxeStage>
      <NavBar />
      <Container className="relative pb-20 pt-12 sm:pb-28 sm:pt-24">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="animate-fade-up [animation-delay:40ms]">
            <Chip tone="accent"><Icon name="sparkle" className="h-3 w-3" /> v1.4 — now with 28 components</Chip>
          </div>
          <h1 className="mt-6 animate-fade-up font-display text-[2.5rem] font-light leading-[1.05] tracking-tightest text-fg [animation-delay:120ms] sm:mt-7 sm:text-6xl lg:text-7xl">
            Interfaces that feel
            <br />
            <span className="text-accent-shimmer font-normal italic">quietly expensive.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl animate-fade-up text-lg leading-relaxed text-fg-muted [animation-delay:200ms]">
            A Tailwind-first, variant-driven React system. Polymorphic, tree-shakable, and
            accessible — engineered so every screen you ship looks considered.
          </p>
          <div className="mt-9 flex animate-fade-up flex-col items-center justify-center gap-3 [animation-delay:280ms] sm:flex-row">
            <Button size="lg" tw={accentBtn + ' group'}>
              Start building
              <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button size="lg" intent="ghost" tw={ghostBtn}>
              <Icon name="github" className="h-4 w-4" /> Star on GitHub
            </Button>
          </div>
          <div className="mt-6 flex animate-fade-up flex-wrap items-center justify-center gap-2 text-xs text-fg-subtle [animation-delay:340ms]">
            <Icon name="check" className="h-3.5 w-3.5 text-accent" /> MIT licensed
            <span className="mx-2 h-1 w-1 rounded-full bg-fg-subtle/50" />
            <Icon name="check" className="h-3.5 w-3.5 text-accent" /> SSR-safe
            <span className="mx-2 h-1 w-1 rounded-full bg-fg-subtle/50" />
            <Icon name="check" className="h-3.5 w-3.5 text-accent" /> Zero runtime CSS
          </div>
        </div>

        {/* floating preview */}
        <div className="relative mx-auto mt-20 max-w-4xl animate-fade-up [animation-delay:420ms]">
          <div className={`${surface.glass} p-3`}>
            <div className="flex items-center gap-1.5 px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-danger-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-success-500/70" />
              <span className="ml-3 font-mono text-[11px] text-fg-subtle">preview — app/dashboard.tsx</span>
            </div>
            <div className="grid gap-4 rounded-xl border border-edge/10 bg-elevated/70 p-6 sm:grid-cols-3">
              {[
                { k: 'Revenue', v: '$48,210', d: '+12.4%', i: 'wallet' },
                { k: 'Active users', v: '8,392', d: '+3.1%', i: 'users' },
                { k: 'Latency', v: '124ms', d: '-8ms', i: 'gauge' },
              ].map((s) => (
                <div key={s.k} className={`${surface.card} p-4`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-fg-subtle">{s.k}</span>
                    <Icon name={s.i} className="h-4 w-4 text-accent/80" />
                  </div>
                  <div className="mt-3 font-display text-2xl text-fg">{s.v}</div>
                  <div className="mt-1 inline-flex items-center gap-1 text-xs text-success-400">
                    <Icon name="arrow" className="h-3 w-3 -rotate-45" /> {s.d}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* marquee */}
        <div className="mt-16 overflow-hidden">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.28em] text-fg-subtle">
            Trusted by teams shipping daily
          </p>
          <div className="relative mt-6 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
            <div className="flex shrink-0 animate-marquee items-center gap-14 pr-14">
              {['NORTHWIND', 'AETHER', 'LUMEN', 'OBSIDIAN', 'VANTA', 'HELIX', 'NORTHWIND', 'AETHER', 'LUMEN', 'OBSIDIAN', 'VANTA', 'HELIX'].map((b, i) => (
                <span key={i} className="font-display text-lg font-medium tracking-tight text-fg-subtle/70">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </LuxeStage>
  ),
};

/* ─────────────────────────────── FEATURES ─────────────────────────────── */

const features = [
  { i: 'layers', t: 'Variant engine', d: 'A tiny tv() composer drives every variant, size and compound state — no class soup.' },
  { i: 'bolt', t: 'Polymorphic', d: 'Render any component as any element with the as prop, keeping full prop types.' },
  { i: 'shield', t: 'Accessible', d: 'Focus traps, roving tabindex and ARIA wiring ship in the box — WCAG AA by default.' },
  { i: 'gauge', t: 'Zero runtime', d: 'Pure Tailwind classes. Nothing to hydrate, nothing to parse at runtime.' },
  { i: 'grid', t: 'Composable slots', d: 'createSlots() builds Card.Header / Table.Row style compound APIs effortlessly.' },
  { i: 'globe', t: 'SSR-safe', d: 'Stable ids and isomorphic effects keep Next.js and Remix perfectly hydrated.' },
];

export const Features: Story = {
  render: () => (
    <LuxeStage>
      <Container className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-2xl">
          <Eyebrow>Why comp·lib</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-light leading-tight tracking-tight text-fg sm:text-5xl">
            Everything you need,
            <span className="text-accent-gradient"> nothing you don't.</span>
          </h2>
          <p className="mt-5 text-lg text-fg-muted">
            Each primitive is small, typed and unopinionated about your design — until you theme it in seconds.
          </p>
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-edge/10 bg-edge/10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, idx) => (
            <div
              key={f.t}
              className="group relative animate-fade-up bg-panel/80 p-8 transition-colors hover:bg-elevated/80"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-edge/10 bg-fg/[0.03] text-accent transition-colors group-hover:border-accent/40">
                <Icon name={f.i} className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl text-fg">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{f.d}</p>
              <span className="absolute right-8 top-8 font-mono text-[11px] text-fg-subtle/60">0{idx + 1}</span>
            </div>
          ))}
        </div>
      </Container>
    </LuxeStage>
  ),
};

/* ──────────────────────────────── PRICING ─────────────────────────────── */

const tiers = [
  { name: 'Solo', monthly: 0, blurb: 'For side-projects and prototypes.', features: ['28 components', 'Community Discord', 'MIT license', 'Storybook docs'], featured: false },
  { name: 'Studio', monthly: 24, blurb: 'For teams shipping product.', features: ['Everything in Solo', 'Figma design kit', 'Theme builder', 'Priority issues', 'Private sections'], featured: true },
  { name: 'Foundry', monthly: null as number | null, blurb: 'For platforms at scale.', features: ['Everything in Studio', 'White-label tokens', 'Dedicated engineer', 'SLA & audits'], featured: false },
];

export const Pricing: Story = {
  render: () => {
    const Demo = () => {
      const [annual, setAnnual] = useState(true);
      const priceOf = (m: number | null) => {
        if (m === null) return 'Custom';
        if (m === 0) return '$0';
        return annual ? `$${Math.round(m * 0.8)}` : `$${m}`;
      };
      return (
        <Container className="py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-light tracking-tight text-fg sm:text-5xl">
              Pay for polish, <span className="italic text-accent-gradient">not lock-in.</span>
            </h2>
            <div className="mx-auto mt-7 flex w-fit max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl border border-edge/12 bg-fg/[0.04] px-4 py-2.5">
              <span className={`text-sm ${!annual ? 'text-fg' : 'text-fg-subtle'}`}>Monthly</span>
              <Toggle checked={annual} onChange={() => setAnnual((v) => !v)} />
              <span className={`text-sm ${annual ? 'text-fg' : 'text-fg-subtle'}`}>Annual</span>
              <Badge tw="bg-accent/10 text-accent border border-accent/30">Save 20%</Badge>
            </div>
          </div>

          <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
            {tiers.map((t, idx) => (
              <div
                key={t.name}
                className={`relative animate-fade-up p-8 ${
                  t.featured
                    ? 'rounded-3xl border border-accent/40 bg-accent/[0.07] shadow-accent'
                    : surface.card
                }`}
                style={{ animationDelay: `${idx * 90}ms` }}
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
                  {t.monthly !== null && t.monthly > 0 && (
                    <span className="mb-1.5 text-sm text-fg-subtle">/{annual ? 'mo, billed yearly' : 'mo'}</span>
                  )}
                </div>
                <Button fullWidth intent={t.featured ? 'primary' : 'ghost'} tw={`mt-6 ${t.featured ? accentBtn : ghostBtn}`}>
                  {t.monthly === null ? 'Contact sales' : `Choose ${t.name}`}
                </Button>
                <ul className="mt-8 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-fg-muted">
                      <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${t.featured ? 'bg-accent/20 text-accent' : 'bg-fg/5 text-fg-muted'}`}>
                        <Icon name="check" className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      );
    };
    return (
      <LuxeStage>
        <Demo />
      </LuxeStage>
    );
  },
};
