import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { DropdownMenu } from '../../components/DropdownMenu';
import { Popover } from '../../components/Popover';
import { Avatar } from '../../components/Avatar';
import { Input } from '../../components/Input';
import { LuxeStage, Container, Eyebrow, Logo, Icon, Kbd, surface, accentBtn, ghostBtn, darkInput, withSourceBelow } from './_luxe';

const meta: Meta = {
  title: 'Sections/App Shell',
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'Site chrome — a glass navbar with working search & notification popovers and an account menu, a copy-to-clipboard CTA, and a rich footer. Runtime themeable.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const menuContent = 'border-edge/10 bg-panel/95 text-fg backdrop-blur-xl';
const menuItem = 'text-fg-muted hover:bg-fg/5 hover:text-fg focus:bg-fg/5';

/* ──────────────────────────────── NAVBAR ──────────────────────────────── */

const dot: Record<string, string> = {
  accent: 'bg-accent',
  success: 'bg-success-400',
  accent2: 'bg-accent2',
};

const notifications = [
  { who: 'Grace Hopper', what: 'commented on Pricing', when: '4m', tone: 'accent' },
  { who: 'Linus T.', what: 'merged PR #284', when: '1h', tone: 'success' },
  { who: 'Billing', what: 'invoice paid', when: '3h', tone: 'accent2' },
];

export const Navbar: Story = {
  parameters: {
    sourceCode: `import { DropdownMenu, Popover, Avatar, Input, Kbd, Icon } from '@kasoma/comp-lib';

<header className="sticky top-0">
  <Logo />
  <nav>{links.map((l) => <button key={l}>{l}</button>)}</nav>

  <Popover.Root>
    <Popover.Trigger>Search… <Kbd>⌘K</Kbd></Popover.Trigger>
    <Popover.Content>
      <Input prefix={<Icon name="search" />} placeholder="Search components…" />
    </Popover.Content>
  </Popover.Root>

  <Popover.Root>
    <Popover.Trigger><Icon name="bell" /></Popover.Trigger>
    <Popover.Content>{/* notifications */}</Popover.Content>
  </Popover.Root>

  <DropdownMenu.Root align="end">
    <DropdownMenu.Trigger><Avatar size="sm">AL</Avatar></DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Item icon={<Icon name="users" />}>Profile</DropdownMenu.Item>
      <DropdownMenu.Item destructive icon={<Icon name="logout" />}>Sign out</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</header>`,
  },
  render: () => {
    const Demo = () => {
      const [active, setActive] = useState('Product');
      const [unread, setUnread] = useState(3);
      const links = ['Product', 'Solutions', 'Developers', 'Pricing'];
      return (
        <LuxeStage switcher={false}>
          <div className="sticky top-0 z-30 border-b border-edge/10 bg-canvas/70 backdrop-blur-xl">
            <Container className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-3 lg:gap-8">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger tw="grid h-9 w-9 place-items-center rounded-lg border border-edge/12 bg-fg/[0.04] text-fg-muted hover:text-fg lg:hidden">
                    <Icon name="menu" className="h-5 w-5" />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content tw={menuContent}>
                    {links.map((l) => (
                      <DropdownMenu.Item key={l} tw={menuItem} onClick={() => setActive(l)}>{l}</DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
                <Logo />
                <nav className="hidden items-center gap-1 lg:flex">
                  {links.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setActive(l)}
                      className={`rounded-lg px-3 py-2 text-sm transition-colors ${active === l ? 'bg-fg/[0.06] text-fg' : 'text-fg-muted hover:text-fg'}`}
                    >
                      {l}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="flex items-center gap-2.5">
                {/* search */}
                <Popover.Root align="end">
                  <Popover.Trigger tw="hidden md:block">
                    <span className="flex h-9 w-64 items-center gap-2 rounded-lg border border-edge/10 bg-fg/[0.03] px-3 text-sm text-fg-subtle transition hover:border-edge/20">
                      <Icon name="search" className="h-4 w-4" /> Search…
                      <Kbd tw="ml-auto">⌘K</Kbd>
                    </span>
                  </Popover.Trigger>
                  <Popover.Content tw="w-80 border-edge/10 bg-panel/95 text-fg backdrop-blur-xl">
                    <Input autoFocus placeholder="Search components…" tw={darkInput} prefix={<Icon name="search" className="h-4 w-4" />} />
                    <div className="mt-3 space-y-1">
                      {['Button', 'Dialog', 'Data table', 'Theme tokens'].map((r) => (
                        <button key={r} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-fg-muted transition hover:bg-fg/5 hover:text-fg">
                          <Icon name="arrow" className="h-3.5 w-3.5 text-fg-subtle" /> {r}
                        </button>
                      ))}
                    </div>
                  </Popover.Content>
                </Popover.Root>

                {/* notifications */}
                <Popover.Root align="end">
                  <Popover.Trigger tw="relative grid h-9 w-9 place-items-center rounded-lg border border-edge/10 bg-fg/[0.03] text-fg-muted transition hover:text-fg">
                    <Icon name="bell" className="h-4 w-4" />
                    {unread > 0 && <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />}
                  </Popover.Trigger>
                  <Popover.Content tw="w-80 border-edge/10 bg-panel/95 text-fg backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-fg">Notifications</p>
                      <button onClick={() => setUnread(0)} className="text-xs text-accent hover:underline">Mark all read</button>
                    </div>
                    <ul className="mt-3 space-y-1">
                      {notifications.map((n, i) => (
                        <li key={i} className="flex items-start gap-3 rounded-lg p-2 transition hover:bg-fg/5">
                          <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dot[n.tone]}`} />
                          <p className="text-sm text-fg-muted">
                            <span className="font-medium text-fg">{n.who}</span> {n.what}
                            <span className="ml-1 font-mono text-[11px] text-fg-subtle">· {n.when}</span>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </Popover.Content>
                </Popover.Root>

                {/* account */}
                <DropdownMenu.Root align="end">
                  <DropdownMenu.Trigger tw="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas">
                    <Avatar size="sm" tw="bg-accent text-onaccent text-xs font-semibold">AL</Avatar>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content tw={menuContent}>
                    <DropdownMenu.Label tw="text-fg-subtle">Ada Lovelace</DropdownMenu.Label>
                    <DropdownMenu.Item tw={menuItem} icon={<Icon name="users" className="h-4 w-4" />}>Profile</DropdownMenu.Item>
                    <DropdownMenu.Item tw={menuItem} icon={<Icon name="cog" className="h-4 w-4" />}>Settings</DropdownMenu.Item>
                    <DropdownMenu.Separator tw="bg-edge/10" />
                    <DropdownMenu.Item destructive icon={<Icon name="logout" className="h-4 w-4" />}>Sign out</DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </div>
            </Container>
          </div>

          <Container className="py-20">
            <div className={`${surface.glass} p-10`}>
              <Badge tw="bg-accent2/10 text-accent2 border border-accent2/30">Live</Badge>
              <h2 className="mt-4 font-display text-3xl text-fg">{active} workspace</h2>
              <p className="mt-2 max-w-prose text-fg-muted">
                The nav stays pinned with a frosted treatment. Search and the bell open real
                popovers; the avatar opens a keyboard-navigable menu. Switch themes top-right.
              </p>
            </div>
            <div className="h-[55vh]" />
          </Container>
        </LuxeStage>
      );
    };
    return <Demo />;
  },
};

/* ────────────────────────────────── CTA ───────────────────────────────── */

export const CTA: Story = {
  parameters: {
    sourceCode: `import { Button, Eyebrow, Icon } from '@kasoma/comp-lib';

<section className="rounded-3xl border border-accent/30 bg-accent/[0.07] text-center">
  <Eyebrow>Ready when you are</Eyebrow>
  <h2 className="font-display text-6xl">
    Ship the interface your product <span className="italic">deserves.</span>
  </h2>
  <Button size="lg" tw={accentBtn}>Get started free <Icon name="arrow" /></Button>
  <button onClick={copy}><Icon name="sparkle" /> npm i @kasoma/comp-lib</button>
</section>`,
  },
  render: () => {
    const Demo = () => {
      const [copied, setCopied] = useState(false);
      const copy = () => {
        navigator.clipboard?.writeText('npm i @kasoma/comp-lib').catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      };
      return (
        <LuxeStage className="grid place-items-center">
          <Container className="py-16 sm:py-28">
            <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-accent/[0.07] p-8 text-center shadow-accent sm:rounded-[2rem] sm:p-12 lg:p-20">
              <div aria-hidden className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-accent2/20 blur-3xl" />
              <div className="relative">
                <Eyebrow>Ready when you are</Eyebrow>
                <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-light leading-tight tracking-tight text-fg sm:text-5xl lg:text-6xl">
                  Ship the interface your
                  <br />
                  product <span className="italic text-accent-shimmer">deserves.</span>
                </h2>
                <p className="mx-auto mt-6 max-w-lg text-lg text-fg-muted">
                  Install once, theme in minutes, and never fight a UI library again.
                </p>
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button size="lg" tw={accentBtn + ' group'}>
                    Get started free
                    <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                  <button
                    onClick={copy}
                    className="inline-flex items-center gap-2 rounded-xl border border-edge/10 bg-canvas/60 px-4 py-3 font-mono text-sm text-fg-muted transition hover:border-edge/20"
                  >
                    <Icon name={copied ? 'check' : 'sparkle'} className={`h-4 w-4 ${copied ? 'text-success-400' : 'text-accent'}`} />
                    {copied ? 'Copied!' : 'npm i @kasoma/comp-lib'}
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </LuxeStage>
      );
    };
    return <Demo />;
  },
};

/* ──────────────────────────────── FOOTER ──────────────────────────────── */

const footerCols = [
  { h: 'Product', links: ['Components', 'Sections', 'Tokens', 'Changelog', 'Roadmap'] },
  { h: 'Developers', links: ['Docs', 'API reference', 'Storybook', 'GitHub', 'Status'] },
  { h: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
];

export const Footer: Story = {
  parameters: {
    sourceCode: `import { Icon } from '@kasoma/comp-lib';

<footer className="border-t border-edge/10">
  <Logo />
  <p>A Tailwind-first React component system.</p>
  {['github', 'twitter', 'globe'].map((s) => (
    <a key={s} href="#"><Icon name={s} /></a>
  ))}

  {footerCols.map((col) => (
    <div key={col.h}>
      <h4>{col.h}</h4>
      {col.links.map((l) => <a key={l} href="#">{l}</a>)}
    </div>
  ))}
</footer>`,
  },
  render: () => (
    <LuxeStage className="flex flex-col justify-end">
      <div className="h-24" />
      <footer className="border-t border-edge/10 bg-canvas/60">
        <Container className="py-16">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
            <div>
              <Logo />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
                A Tailwind-first React component system for teams who care about the details.
              </p>
              <div className="mt-6 flex items-center gap-3">
                {(['github', 'twitter', 'globe'] as const).map((s) => (
                  <a
                    key={s}
                    href="https://github.com/akibrahimug/comp-lib"
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-9 w-9 place-items-center rounded-lg border border-edge/10 bg-fg/[0.03] text-fg-muted transition hover:border-accent/40 hover:text-accent"
                    aria-label={s}
                  >
                    <Icon name={s} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            {footerCols.map((col) => (
              <div key={col.h}>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-subtle">{col.h}</h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" onClick={(e) => e.preventDefault()} className="text-sm text-fg-muted transition-colors hover:text-fg">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-edge/10 pt-8 sm:flex-row">
            <p className="font-mono text-xs text-fg-subtle">© 2026 comp·lib — MIT licensed.</p>
            <div className="flex items-center gap-6 text-xs text-fg-subtle">
              <a href="#" onClick={(e) => e.preventDefault()} className="transition-colors hover:text-fg-muted">Privacy</a>
              <a href="#" onClick={(e) => e.preventDefault()} className="transition-colors hover:text-fg-muted">Terms</a>
              <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-success-400" /> All systems operational</span>
            </div>
          </div>
        </Container>
      </footer>
    </LuxeStage>
  ),
};
