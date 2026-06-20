import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Avatar } from '../../components/Avatar';
import { Toggle } from '../../components/Toggle';
import { Accordion } from '../../components/Accordion';
import {
  LuxeStage,
  Container,
  Eyebrow,
  Chip,
  Logo,
  Icon,
  ThemeSwitcher,
  surface,
  accentBtn,
  ghostBtn,
} from '../sections/_luxe';

const meta: Meta = {
  title: 'Pages/Landing',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A complete, runtime-themeable marketing landing page — navigation, hero, logo cloud, features, testimonials, pricing, FAQ, CTA and footer — assembled end-to-end from the component library. Switch themes from the toolbar.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

/* ------------------------------------------------------------------ chrome */

function NavBar() {
  const links = ['Features', 'Pricing', 'Docs', 'Changelog'];
  const [active, setActive] = useState('Features');
  return (
    <div className="sticky top-0 z-40 border-b border-edge/10 bg-canvas/70 backdrop-blur-xl">
      <Container className="flex items-center justify-between py-4">
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
          <ThemeSwitcher className="hidden lg:inline-flex" />
          <Button intent="ghost" size="sm" tw={ghostBtn + ' hidden sm:inline-flex'}>Sign in</Button>
          <Button size="sm" tw={accentBtn}>Get started</Button>
        </div>
      </Container>
    </div>
  );
}

/* ------------------------------------------------------------------- hero */

function Hero() {
  return (
    <Container className="relative pb-20 pt-14 sm:pb-28 sm:pt-20">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="animate-fade-up">
          <Chip tone="accent"><Icon name="sparkle" className="h-3 w-3" /> v1.4 — now with 32 components</Chip>
        </div>
        <h1 className="mt-6 animate-fade-up font-display text-[2.6rem] font-light leading-[1.05] tracking-tightest text-fg [animation-delay:120ms] sm:text-6xl lg:text-7xl">
          Interfaces that feel
          <br />
          <span className="text-accent-shimmer font-normal italic">quietly expensive.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-xl animate-fade-up text-lg leading-relaxed text-fg-muted [animation-delay:200ms]">
          A Tailwind-first, variant-driven React system — polymorphic, tree-shakable and accessible,
          with a design language you can re-theme in seconds.
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
      </div>
    </Container>
  );
}

/* ------------------------------------------------------------ logo cloud */

function LogoCloud() {
  return (
    <Container className="pb-8">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.28em] text-fg-subtle">
        Trusted by teams shipping daily
      </p>
      <div className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
        {['NORTHWIND', 'AETHER', 'LUMEN', 'OBSIDIAN', 'VANTA', 'HELIX'].map((b) => (
          <span key={b} className="text-center font-display text-lg font-medium tracking-tight text-fg-subtle/70">{b}</span>
        ))}
      </div>
    </Container>
  );
}

/* -------------------------------------------------------------- features */

const features = [
  { i: 'layers', t: 'Variant engine', d: 'A tiny tv() composer drives every variant, size and compound state.' },
  { i: 'bolt', t: 'Polymorphic', d: 'Render any component as any element with the as prop, fully typed.' },
  { i: 'shield', t: 'Accessible', d: 'Focus traps, roving tabindex and ARIA wiring ship in the box.' },
  { i: 'gauge', t: 'Zero runtime', d: 'Pure Tailwind classes — nothing to hydrate or parse at runtime.' },
  { i: 'grid', t: 'Composable slots', d: 'createSlots() builds Card.Header / Table.Row style APIs effortlessly.' },
  { i: 'globe', t: 'SSR-safe', d: 'Stable ids and isomorphic effects keep Next.js and Remix hydrated.' },
];

function Features() {
  return (
    <Container className="py-16 sm:py-24 lg:py-28">
      <div className="max-w-2xl">
        <Eyebrow>Why comp·lib</Eyebrow>
        <h2 className="mt-5 font-display text-4xl font-light leading-tight tracking-tight text-fg sm:text-5xl">
          Everything you need,<span className="text-accent-gradient"> nothing you don't.</span>
        </h2>
      </div>
      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-edge/10 bg-edge/10 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, idx) => (
          <div key={f.t} className="group relative animate-fade-up bg-panel/80 p-8 transition-colors hover:bg-elevated/80" style={{ animationDelay: `${idx * 60}ms` }}>
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
  );
}

/* ---------------------------------------------------------- testimonials */

const quotes = [
  { q: 'We replaced three in-house kits with comp·lib and shipped a rebrand in a weekend.', n: 'Ada Obi', r: 'Founder, Nimbus', i: 'AO' },
  { q: 'The accessibility is the real story — focus traps and ARIA just work.', n: 'Leo Park', r: 'Staff Engineer', i: 'LP' },
  { q: 'Polymorphic components plus tiny bundles. It feels like a framework that gets out of the way.', n: 'Mara Vu', r: 'Design Lead', i: 'MV' },
];

function Testimonials() {
  return (
    <Container className="py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Loved by builders</Eyebrow>
        <h2 className="mt-5 font-display text-4xl font-light tracking-tight text-fg sm:text-5xl">
          Trusted to ship the <span className="italic text-accent-gradient">details.</span>
        </h2>
      </div>
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {quotes.map((t) => (
          <figure key={t.n} className={`${surface.card} p-7`}>
            <div className="flex gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" className="h-4 w-4" />)}
            </div>
            <blockquote className="mt-5 text-[15px] leading-relaxed text-fg">"{t.q}"</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <Avatar size="sm" tw="bg-accent/15 text-accent">{t.i}</Avatar>
              <div>
                <div className="text-sm font-medium text-fg">{t.n}</div>
                <div className="text-xs text-fg-subtle">{t.r}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Container>
  );
}

/* --------------------------------------------------------------- pricing */

const tiers = [
  { name: 'Solo', monthly: 0, blurb: 'For side-projects and prototypes.', features: ['32 components', 'Community Discord', 'MIT license'], featured: false },
  { name: 'Studio', monthly: 24, blurb: 'For teams shipping product.', features: ['Everything in Solo', 'Figma design kit', 'Theme builder', 'Priority issues'], featured: true },
  { name: 'Foundry', monthly: null as number | null, blurb: 'For platforms at scale.', features: ['Everything in Studio', 'White-label tokens', 'Dedicated engineer', 'SLA & audits'], featured: false },
];

function Pricing() {
  const [annual, setAnnual] = useState(true);
  const priceOf = (m: number | null) => (m === null ? 'Custom' : m === 0 ? '$0' : annual ? `$${Math.round(m * 0.8)}` : `$${m}`);
  return (
    <Container className="py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Pricing</Eyebrow>
        <h2 className="mt-5 font-display text-4xl font-light tracking-tight text-fg sm:text-5xl">
          Pay for polish, <span className="italic text-accent-gradient">not lock-in.</span>
        </h2>
        <div className="mx-auto mt-7 flex w-fit flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl border border-edge/12 bg-fg/[0.04] px-4 py-2.5">
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
}

/* ------------------------------------------------------------------- faq */

const faqs = [
  { v: 'license', q: 'What license is comp·lib released under?', a: 'MIT — use it anywhere, fork it, ship it. No attribution required.' },
  { v: 'ssr', q: 'Does it work with Next.js and Remix?', a: 'Yes. Every component is SSR-safe with stable ids and isomorphic effects.' },
  { v: 'theme', q: 'How does theming work?', a: 'Colors are CSS variables. Swap data-theme or override tokens at runtime — no rebuild.' },
];

function FAQ() {
  return (
    <Container className="py-16 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-light tracking-tight text-fg sm:text-5xl">Questions, answered.</h2>
        </div>
        <div className={`${surface.card} mt-10 p-2 sm:p-3`}>
          <Accordion.Root type="single" collapsible defaultValue={['license']}>
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
  );
}

/* ------------------------------------------------------------- cta/footer */

function CTA() {
  return (
    <Container className="py-16 sm:py-24">
      <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-accent/[0.08] px-8 py-16 text-center shadow-accent sm:px-16">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-4xl font-light tracking-tight text-fg sm:text-5xl">
            Ship your next page <span className="italic text-accent-gradient">today.</span>
          </h2>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" tw={accentBtn}>Get started <Icon name="arrow" className="h-4 w-4" /></Button>
            <Button size="lg" intent="ghost" tw={ghostBtn}><Icon name="folder" className="h-4 w-4" /> Read the docs</Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

const footerCols = [
  { h: 'Product', links: ['Components', 'Sections', 'Pages', 'Changelog'] },
  { h: 'Resources', links: ['Docs', 'Storybook', 'Figma kit'] },
  { h: 'Company', links: ['About', 'Blog', 'Contact'] },
];

function SiteFooter() {
  return (
    <footer className="border-t border-edge/10">
      <Container className="grid gap-10 py-14 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-fg-muted">
            A Tailwind-first React component library for teams who care about the details.
          </p>
        </div>
        {footerCols.map((c) => (
          <nav key={c.h}>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-subtle">{c.h}</h4>
            <ul className="mt-4 space-y-3">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-sm text-fg-muted transition-colors hover:text-fg">{l}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <div className="border-t border-edge/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-fg-subtle sm:flex-row">
          <span>© {new Date().getFullYear()} comp·lib — MIT licensed.</span>
          <span className="flex items-center gap-1.5"><Icon name="check" className="h-3.5 w-3.5 text-accent" /> Built with the library itself</span>
        </Container>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------- page */

export const FullPage: Story = {
  render: () => (
    <LuxeStage>
      <NavBar />
      <Hero />
      <LogoCloud />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <SiteFooter />
    </LuxeStage>
  ),
};
