import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Progress } from '../components/Progress';
import { Avatar } from '../components/Avatar';
import { Toggle } from '../components/Toggle';
import { Checkbox } from '../components/Checkbox';
import { Input } from '../components/Input';
import { Skeleton } from '../components/Skeleton';
import { Alert } from '../components/Alert';
import { Accordion } from '../components/Accordion';
import { DropdownMenu } from '../components/DropdownMenu';
import { Popover } from '../components/Popover';
import { Dialog } from '../components/Dialog';
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
  darkInput,
} from './sections/_luxe';

/**
 * The library's own landing page — fully themeable (try the switcher in the top
 * bar) and genuinely interactive: the explorer below renders live, working
 * components for every category.
 */
const meta: Meta = {
  title: 'Intro/Welcome',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    options: { showPanel: false },
    docs: {
      description: {
        component:
          'A Tailwind-first, variant-driven, polymorphic React component library — presented in a runtime-themeable showcase. Default theme is "Slate"; switch to Aurum, Evergreen or Daylight from the top bar.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

/* Theme-adaptive class strings for portaled overlays. */
const menuContent = 'border-edge/10 bg-panel/95 text-fg backdrop-blur-xl';
const menuItem = 'text-fg-muted hover:bg-fg/5 hover:text-fg focus:bg-fg/5';

const stats = [
  { v: '28', l: 'Components' },
  { v: '12', l: 'Sections' },
  { v: '4', l: 'Themes' },
  { v: '0kb', l: 'Runtime CSS' },
];

const categories = [
  { id: 'forms', i: 'grid', t: 'Forms', d: 'Button · Input · Toggle · Checkbox' },
  { id: 'layout', i: 'layers', t: 'Layout', d: 'Card · Accordion · Table' },
  { id: 'overlays', i: 'bell', t: 'Overlays', d: 'Dialog · Popover · Menu' },
  { id: 'feedback', i: 'gauge', t: 'Feedback', d: 'Alert · Progress · Skeleton' },
] as const;

type CatId = (typeof categories)[number]['id'];

/* ─────────────────────── Live, interactive demos ──────────────────────── */

function FormsDemo() {
  const [name, setName] = useState('Ada Lovelace');
  const [emails, setEmails] = useState(true);
  const [terms, setTerms] = useState(false);
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-fg-muted">Display name</span>
        <Input value={name} onChange={(e) => setName(e.target.value)} tw={darkInput} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-fg-muted">Email</span>
        <Input type="email" placeholder="you@company.com" tw={darkInput} prefix={<Icon name="mail" className="h-4 w-4" />} />
      </label>
      <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-edge/10 bg-fg/[0.02] p-4">
        <label className="flex items-center gap-3 text-sm text-fg-muted">
          <Toggle checked={emails} onChange={() => setEmails((v) => !v)} /> Product emails
        </label>
        <label className="flex items-center gap-2.5 text-sm text-fg-muted">
          <Checkbox checked={terms} onChange={() => setTerms((v) => !v)} /> Accept terms
        </label>
        <Button tw={accentBtn} disabled={!terms}>
          {terms ? `Save ${name.split(' ')[0]}` : 'Accept terms first'}
        </Button>
      </div>
    </div>
  );
}

function LayoutDemo() {
  const faqs = [
    { v: 'a', q: 'How do I theme a component?', a: 'Pass Tailwind classes through the tw prop — twMerge resolves conflicts for you.' },
    { v: 'b', q: 'Is it tree-shakable?', a: 'Yes. Every component is a named export and the package is side-effect free.' },
    { v: 'c', q: 'Does it support SSR?', a: 'Stable ids and isomorphic effects keep Next.js and Remix hydrated.' },
  ];
  return (
    <Accordion.Root type="single" collapsible defaultValue={['a']} tw="divide-edge/10">
      {faqs.map((f) => (
        <Accordion.Item key={f.v} value={f.v}>
          <Accordion.Trigger tw="text-fg hover:text-accent">{f.q}</Accordion.Trigger>
          <Accordion.Content tw="text-fg-muted">{f.a}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

function OverlaysDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button intent="ghost" tw={ghostBtn}>
            Menu <Icon name="arrow" className="h-4 w-4 rotate-90" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content tw={menuContent}>
          <DropdownMenu.Item tw={menuItem}>Duplicate</DropdownMenu.Item>
          <DropdownMenu.Item tw={menuItem}>Share</DropdownMenu.Item>
          <DropdownMenu.Separator tw="bg-edge/10" />
          <DropdownMenu.Item destructive>Delete</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <Popover.Root>
        <Popover.Trigger>
          <Button intent="ghost" tw={ghostBtn}>Popover</Button>
        </Popover.Trigger>
        <Popover.Content tw="w-64 border-edge/10 bg-panel/95 text-fg backdrop-blur-xl">
          <Popover.Close tw="text-fg-subtle hover:text-fg" />
          <p className="text-sm font-medium text-fg">Anchored panel</p>
          <p className="mt-1 text-sm text-fg-muted">Positioned, dismissible, focus-returning.</p>
        </Popover.Content>
      </Popover.Root>

      <Button tw={accentBtn} onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Overlay />
        <Dialog.Content tw="border border-edge/10 bg-panel text-fg">
          <Dialog.Close tw="text-fg-subtle hover:text-fg" />
          <Dialog.Header>
            <Dialog.Title tw="text-fg">Publish release</Dialog.Title>
            <Dialog.Description tw="text-fg-muted">This will ship v1.4.0 to all users.</Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Button intent="ghost" tw={ghostBtn} onClick={() => setOpen(false)}>Cancel</Button>
            <Button tw={accentBtn} onClick={() => setOpen(false)}>Publish</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}

function FeedbackDemo() {
  const [v, setV] = useState(20);
  const [alert, setAlert] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setV((p) => (p >= 100 ? 0 : p + 3)), 200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="space-y-4">
      {alert ? (
        <Alert variant="success" title="Deploy succeeded" onClose={() => setAlert(false)}>
          Build #1287 is live in production.
        </Alert>
      ) : (
        <button className="text-sm text-accent underline" onClick={() => setAlert(true)}>Reset alert</button>
      )}
      <div className="space-y-2">
        <Progress value={v} variant="brand" showValue tw="[&_span]:text-fg-muted [&>div>div]:bg-accent" />
        <Progress value={100 - v} variant="info" tw="[&>div>div]:bg-accent2" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge tw="bg-accent/10 text-accent border border-accent/30">Shipping</Badge>
        <Badge tw="bg-fg/5 text-fg-muted border border-edge/10">Queued</Badge>
        <Badge tw="bg-accent2/10 text-accent2 border border-accent2/30">Beta</Badge>
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-edge/10 bg-fg/[0.02] p-3">
        <Skeleton shape="circle" width={36} height={36} />
        <div className="flex-1">
          <Skeleton shape="text" width="55%" />
          <div className="mt-2"><Skeleton shape="text" width="35%" /></div>
        </div>
      </div>
    </div>
  );
}

function Explorer() {
  const [cat, setCat] = useState<CatId>('forms');
  const demos: Record<CatId, React.ReactNode> = {
    forms: <FormsDemo />,
    layout: <LayoutDemo />,
    overlays: <OverlaysDemo />,
    feedback: <FeedbackDemo />,
  };
  return (
    <div id="explorer" className="scroll-mt-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Eyebrow>Live explorer</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-light text-fg sm:text-4xl">
            Real components, <span className="italic text-accent-gradient">really working.</span>
          </h2>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
          recolors with the theme ↗
        </p>
      </div>

      {/* category tabs (functional internal nav) */}
      <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-edge/12 bg-edge/12 sm:grid-cols-4">
        {categories.map((c) => {
          const active = c.id === cat;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(c.id)}
              aria-pressed={active}
              className={`group flex items-start gap-3 p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
                active ? 'bg-accent/[0.08]' : 'bg-panel/70 hover:bg-fg/[0.04]'
              }`}
            >
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-colors ${active ? 'border-accent/40 text-accent' : 'border-edge/10 text-fg-muted'}`}>
                <Icon name={c.i} className="h-4 w-4" />
              </span>
              <span>
                <span className={`block text-sm font-medium ${active ? 'text-fg' : 'text-fg-muted'}`}>{c.t}</span>
                <span className="mt-0.5 block text-[11px] leading-tight text-fg-subtle">{c.d}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* live panel */}
      <div className={`${surface.glass} mt-4 p-6 sm:p-8`}>{demos[cat]}</div>
    </div>
  );
}

/* ───────────────────────────────── Page ───────────────────────────────── */

export const Welcome: Story = {
  render: () => (
    <LuxeStage switcher={false}>
      {/* top bar */}
      <Container className="flex items-center justify-between gap-4 py-6">
        <Logo />
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <Button
            as="a"
            href="https://github.com/akibrahimug/comp-lib"
            target="_blank"
            rel="noreferrer"
            size="sm"
            intent="ghost"
            tw={ghostBtn + ' hidden sm:inline-flex'}
          >
            <Icon name="github" className="h-4 w-4" /> GitHub
          </Button>
        </div>
      </Container>

      {/* hero */}
      <Container className="relative pb-20 pt-14 sm:pt-20">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-6 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-accent/10 blur-[130px]" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <div className="animate-fade-up [animation-delay:40ms]">
              <Chip tone="accent"><Icon name="sparkle" className="h-3 w-3" /> v1.4 — 4 themes, 28 components</Chip>
            </div>
            <h1 className="mt-5 animate-fade-up font-display text-[2.6rem] font-light leading-[1.04] tracking-tightest text-fg [animation-delay:120ms] sm:mt-6 sm:text-6xl lg:text-7xl">
              Components with
              <br />
              <span className="text-accent-shimmer font-normal italic">taste.</span>
            </h1>
            <p className="mt-7 max-w-md animate-fade-up text-lg leading-relaxed text-fg-muted [animation-delay:200ms]">
              A Tailwind-first, polymorphic React library. Theme it at runtime with the{' '}
              <code className="rounded bg-fg/5 px-1.5 py-0.5 font-mono text-sm text-accent">tw</code> prop —
              every primitive bends to your brand.
            </p>

            <div className="mt-9 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:280ms]">
              <Button size="lg" tw={accentBtn + ' group'} onClick={() => document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' })}>
                Try it live
                <Icon name="arrow" className="h-4 w-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
              </Button>
              <Button size="lg" intent="ghost" tw={ghostBtn} onClick={linkTo('Components/Button')}>
                Browse components
              </Button>
            </div>

            <dl className="mt-10 grid max-w-md animate-fade-up grid-cols-2 gap-px overflow-hidden rounded-2xl border border-edge/12 bg-edge/12 [animation-delay:340ms] sm:mt-12 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.l} className="bg-panel/80 px-3 py-5 text-center">
                  <dt className="font-display text-2xl text-fg">{s.v}</dt>
                  <dd className="mt-1 font-mono text-[10px] uppercase tracking-widest text-fg-subtle">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* live component panel */}
          <div className="animate-fade-up [animation-delay:420ms]">
            <div className={`${surface.glass} p-6`}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">Live components</span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" /> rendered
                </span>
              </div>
              <div className="mt-5 space-y-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Button size="sm" tw={accentBtn} onClick={linkTo('Components/Button')}>Primary</Button>
                  <Button size="sm" intent="ghost" tw={ghostBtn} onClick={linkTo('Components/Button')}>Ghost</Button>
                  <Button size="sm" intent="ghost" tw={ghostBtn} loading>Loading</Button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tw="bg-accent/10 text-accent border border-accent/30">New</Badge>
                  <Badge tw="bg-fg/5 text-fg-muted border border-edge/10">Stable</Badge>
                  <Badge tw="bg-accent2/10 text-accent2 border border-accent2/30">Beta</Badge>
                </div>
                <div className="space-y-2.5">
                  <Progress value={82} variant="brand" showValue tw="[&_span]:text-fg-muted [&>div>div]:bg-accent" />
                  <Progress value={46} variant="info" tw="[&>div>div]:bg-accent2" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2.5">
                    {['AL', 'AT', 'GH', 'KJ'].map((a, i) => (
                      <Avatar key={a} size="sm" tw={`ring-2 ring-panel ${i === 0 ? 'bg-accent text-onaccent' : 'bg-elevated text-fg'} text-[11px] font-medium`}>
                        {a}
                      </Avatar>
                    ))}
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-elevated text-[11px] text-fg-muted ring-2 ring-panel">+9</span>
                  </div>
                  <label className="flex items-center gap-2.5 text-sm text-fg-muted">
                    <Toggle defaultChecked /> Notify
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* explorer */}
      <Container className="pb-28">
        <Explorer />
      </Container>
    </LuxeStage>
  ),
};
