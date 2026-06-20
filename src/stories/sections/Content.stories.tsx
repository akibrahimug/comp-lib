import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Avatar } from '../../components/Avatar';
import { Accordion } from '../../components/Accordion';
import { Stat } from '../../components/Stat';
import {
  LuxeStage,
  Container,
  Eyebrow,
  Logo,
  Icon,
  surface,
  accentBtn,
  ghostBtn,
  withSourceBelow,
} from './_luxe';

const meta: Meta = {
  title: 'Sections/Content',
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'Content & conversion sections — social proof, metrics, FAQ, logo cloud, call-to-action and footer — all composed from the component library and runtime-themeable. Switch themes from the toolbar; each section shows its source below.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

/* ───────────────────────────── TESTIMONIALS ───────────────────────────── */

const quotes = [
  { q: 'We replaced three in-house kits with comp·lib and shipped a rebrand in a weekend. The theming is genuinely magic.', n: 'Ada Obi', r: 'Founder, Nimbus', i: 'AO' },
  { q: 'The accessibility is the real story — focus traps and ARIA just work. Our audit went from red to green overnight.', n: 'Leo Park', r: 'Staff Engineer, Aether', i: 'LP' },
  { q: 'Polymorphic components plus tiny bundles. It feels like a framework, but it gets out of the way.', n: 'Mara Vu', r: 'Design Lead, Lumen', i: 'MV' },
  { q: 'Storybook-first docs meant the whole team adopted it in a day. No bikeshedding over class names anymore.', n: 'Sam Cole', r: 'PM, Obsidian', i: 'SC' },
];

export const Testimonials: Story = {
  parameters: {
    sourceCode: `import { Avatar, Icon } from '@kasoma/comp-lib';

<figure className={surface.card + ' p-7'}>
  <div className="flex gap-1 text-accent">
    {Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" />)}
  </div>
  <blockquote className="mt-5 text-fg">"{quote}"</blockquote>
  <figcaption className="mt-6 flex items-center gap-3">
    <Avatar size="sm">{initials}</Avatar>
    <div><div className="text-fg">{name}</div><div className="text-fg-subtle">{role}</div></div>
  </figcaption>
</figure>`,
  },
  render: () => (
    <LuxeStage>
      <Container className="py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Loved by builders</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-light tracking-tight text-fg sm:text-5xl">
            Trusted to ship the <span className="italic text-accent-gradient">details.</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {quotes.map((t, idx) => (
            <figure
              key={t.n}
              className={`${surface.card} animate-fade-up p-7`}
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" className="h-4 w-4" />
                ))}
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
    </LuxeStage>
  ),
};

/* ──────────────────────────────── STATS ───────────────────────────────── */

export const Stats: Story = {
  parameters: {
    sourceCode: `import { Stat, Icon } from '@kasoma/comp-lib';

<div className="grid sm:grid-cols-2 lg:grid-cols-4">
  <Stat label="Downloads / mo" value="128k" delta="+24%" trend="up" icon={<Icon name="download" />} />
  <Stat label="Components"     value="32"   hint="and counting" icon={<Icon name="grid" />} />
  <Stat label="Bundle (gzip)"  value="9.4kb" delta="-12%" trend="up" icon={<Icon name="bolt" />} />
  <Stat label="A11y score"     value="100"  hint="Lighthouse" icon={<Icon name="shield" />} />
</div>`,
  },
  render: () => (
    <LuxeStage>
      <Container className="py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>By the numbers</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-light tracking-tight text-fg sm:text-5xl">
            Built for scale, <span className="italic text-accent-gradient">measured in trust.</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Downloads / mo', value: '128k', delta: '+24%', trend: 'up' as const, icon: 'download' },
            { label: 'Components', value: '32', hint: 'and counting', icon: 'grid' },
            { label: 'Bundle (gzip)', value: '9.4kb', delta: '-12%', trend: 'up' as const, icon: 'bolt' },
            { label: 'A11y score', value: '100', hint: 'Lighthouse', icon: 'shield' },
          ].map((s, idx) => (
            <div key={s.label} className="animate-fade-up" style={{ animationDelay: `${idx * 70}ms` }}>
              <Stat
                label={s.label}
                value={s.value}
                delta={s.delta}
                trend={s.trend}
                hint={s.hint}
                icon={<Icon name={s.icon} className="h-4 w-4" />}
                tw={surface.card + ' p-6'}
              />
            </div>
          ))}
        </div>
      </Container>
    </LuxeStage>
  ),
};

/* ───────────────────────────────── FAQ ────────────────────────────────── */

const faqs = [
  { v: 'license', q: 'What license is comp·lib released under?', a: 'MIT. Use it in personal and commercial projects, fork it, and ship it — no attribution required (though always appreciated).' },
  { v: 'ssr', q: 'Does it work with Next.js and Remix?', a: 'Yes. Every component is SSR-safe: stable ids via useId, isomorphic layout effects, and no window access during render.' },
  { v: 'theme', q: 'How does theming work?', a: 'All colors are CSS variables. Swap a data-theme attribute or override tokens at runtime — every component re-tints instantly, no rebuild.' },
  { v: 'tree', q: 'Will I ship the whole library?', a: 'No. The package is side-effect-free and fully tree-shakable, so you only bundle the components you import.' },
];

export const FAQ: Story = {
  parameters: {
    sourceCode: `import { Accordion } from '@kasoma/comp-lib';

<Accordion.Root type="single" collapsible defaultValue={['license']}>
  {faqs.map((f) => (
    <Accordion.Item key={f.v} value={f.v}>
      <Accordion.Trigger>{f.q}</Accordion.Trigger>
      <Accordion.Content>{f.a}</Accordion.Content>
    </Accordion.Item>
  ))}
</Accordion.Root>`,
  },
  render: () => (
    <LuxeStage>
      <Container className="py-16 sm:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-light tracking-tight text-fg sm:text-5xl">
              Questions,<br /><span className="italic text-accent-gradient">answered.</span>
            </h2>
            <p className="mt-5 text-fg-muted">
              Still curious? Reach the team on Discord or open an issue on GitHub.
            </p>
            <Button intent="ghost" tw={ghostBtn + ' mt-6'}>
              <Icon name="github" className="h-4 w-4" /> Ask on GitHub
            </Button>
          </div>
          <div className={`${surface.card} p-2 sm:p-3`}>
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
    </LuxeStage>
  ),
};

/* ────────────────────────────── LOGO CLOUD ────────────────────────────── */

export const LogoCloud: Story = {
  parameters: {
    sourceCode: `<p className="text-fg-subtle">Powering teams at</p>
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
  {brands.map((b) => (
    <span key={b} className="font-display text-fg-subtle/70">{b}</span>
  ))}
</div>`,
  },
  render: () => (
    <LuxeStage>
      <Container className="py-20 sm:py-28">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.28em] text-fg-subtle">
          Powering product teams everywhere
        </p>
        <div className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {['NORTHWIND', 'AETHER', 'LUMEN', 'OBSIDIAN', 'VANTA', 'HELIX'].map((b, idx) => (
            <span
              key={b}
              className="animate-fade-up text-center font-display text-lg font-medium tracking-tight text-fg-subtle/70 transition-colors hover:text-fg"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              {b}
            </span>
          ))}
        </div>
      </Container>
    </LuxeStage>
  ),
};

/* ──────────────────────────────── CTA ─────────────────────────────────── */

export const CTA: Story = {
  parameters: {
    sourceCode: `import { Button, Icon } from '@kasoma/comp-lib';

<div className="rounded-3xl border border-accent/30 bg-accent/[0.08] p-12 text-center shadow-accent">
  <h2 className="font-display text-5xl text-fg">Ready to build something bold?</h2>
  <Button size="lg" tw={accentBtn}>Get started <Icon name="arrow" /></Button>
  <Button size="lg" intent="ghost" tw={ghostBtn}>Read the docs</Button>
</div>`,
  },
  render: () => (
    <LuxeStage>
      <Container className="py-16 sm:py-24">
        <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-accent/[0.08] px-8 py-16 text-center shadow-accent sm:px-16">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-4xl font-light tracking-tight text-fg sm:text-5xl">
              Ready to build something <span className="italic text-accent-gradient">quietly expensive?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-fg-muted">
              Install the library, pick a theme, and ship your first page today.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" tw={accentBtn + ' group'}>
                Get started
                <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button size="lg" intent="ghost" tw={ghostBtn}>
                <Icon name="folder" className="h-4 w-4" /> Read the docs
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </LuxeStage>
  ),
};

/* ──────────────────────────────── FOOTER ──────────────────────────────── */

const footerCols = [
  { h: 'Product', links: ['Components', 'Sections', 'Pages', 'Tokens', 'Changelog'] },
  { h: 'Resources', links: ['Docs', 'Storybook', 'Templates', 'Figma kit'] },
  { h: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
];

export const Footer: Story = {
  parameters: {
    sourceCode: `<footer className="border-t border-edge/10">
  <Container className="grid gap-10 py-14 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
    <Logo />
    {columns.map((c) => (
      <nav key={c.h}>
        <h4>{c.h}</h4>
        {c.links.map((l) => <a key={l} href="#">{l}</a>)}
      </nav>
    ))}
  </Container>
</footer>`,
  },
  render: () => (
    <LuxeStage switcher={false}>
      <footer className="border-t border-edge/10">
        <Container className="grid gap-10 py-14 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              A Tailwind-first, variant-driven React component library for teams who care about the details.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {(['github', 'twitter', 'mail'] as const).map((n) => (
                <a
                  key={n}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label={n}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-edge/12 bg-fg/[0.04] text-fg-muted transition-colors hover:text-fg"
                >
                  <Icon name={n} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {footerCols.map((c) => (
            <nav key={c.h}>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-subtle">{c.h}</h4>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </Container>
        <div className="border-t border-edge/10">
          <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-fg-subtle sm:flex-row">
            <span>© {new Date().getFullYear()} comp·lib — MIT licensed.</span>
            <span className="flex items-center gap-1.5">
              <Icon name="check" className="h-3.5 w-3.5 text-accent" /> Built with the library itself
            </span>
          </Container>
        </div>
      </footer>
    </LuxeStage>
  ),
};
