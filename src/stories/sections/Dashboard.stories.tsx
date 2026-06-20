import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '../../components/Table';
import { Badge } from '../../components/Badge';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { Progress } from '../../components/Progress';
import { Pagination } from '../../components/Pagination';
import { Input } from '../../components/Input';
import { DropdownMenu } from '../../components/DropdownMenu';
import { Popover } from '../../components/Popover';
import { Dialog } from '../../components/Dialog';
import { Alert } from '../../components/Alert';
import {
  LuxeStage,
  Logo,
  Icon,
  ThemeSwitcher,
  surface,
  accentBtn,
  ghostBtn,
  darkInput,
} from './_luxe';

const meta: Meta = {
  title: 'Sections/Dashboard',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A working dashboard app — the sidebar routes between real views, search filters the table live, pagination works, row menus / notifications / upgrade all open, and the whole thing is runtime themeable from the top bar.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const menuContent = 'border-edge/10 bg-panel/95 text-fg backdrop-blur-xl';
const menuItem = 'text-fg-muted hover:bg-fg/5 hover:text-fg focus:bg-fg/5';
const paginationTw =
  '[&_[aria-current=page]]:bg-accent [&_[aria-current=page]]:text-onaccent [&_[aria-current=page]]:hover:bg-accent ' +
  '[&_button:not([aria-current])]:text-fg-muted [&_button:hover]:bg-fg/5';

type View = 'overview' | 'analytics' | 'customers' | 'projects' | 'billing';

const nav: { id: View; i: string; l: string }[] = [
  { id: 'overview', i: 'dashboard', l: 'Overview' },
  { id: 'analytics', i: 'barchart', l: 'Analytics' },
  { id: 'customers', i: 'users', l: 'Customers' },
  { id: 'projects', i: 'folder', l: 'Projects' },
  { id: 'billing', i: 'creditcard', l: 'Billing' },
];

type Customer = { name: string; email: string; plan: string; mrr: string; status: string; init: string };
const customers: Customer[] = [
  { name: 'Ada Lovelace', email: 'ada@analytical.engine', plan: 'Foundry', mrr: '$1,200', status: 'Active', init: 'AL' },
  { name: 'Alan Turing', email: 'alan@enigma.uk', plan: 'Studio', mrr: '$240', status: 'Active', init: 'AT' },
  { name: 'Grace Hopper', email: 'grace@navy.mil', plan: 'Studio', mrr: '$240', status: 'Past due', init: 'GH' },
  { name: 'Katherine J.', email: 'kat@nasa.gov', plan: 'Solo', mrr: '$0', status: 'Trialing', init: 'KJ' },
  { name: 'Linus T.', email: 'linus@kernel.org', plan: 'Foundry', mrr: '$1,200', status: 'Active', init: 'LT' },
  { name: 'Margaret H.', email: 'margaret@mit.edu', plan: 'Studio', mrr: '$240', status: 'Active', init: 'MH' },
  { name: 'Dennis R.', email: 'dennis@bell.labs', plan: 'Foundry', mrr: '$1,200', status: 'Active', init: 'DR' },
  { name: 'Barbara L.', email: 'barbara@usaf.mil', plan: 'Solo', mrr: '$0', status: 'Trialing', init: 'BL' },
  { name: 'Edsger D.', email: 'edsger@ut.nl', plan: 'Studio', mrr: '$240', status: 'Past due', init: 'ED' },
];

const statusTone: Record<string, string> = {
  Active: 'bg-success-500/10 text-success-300 border border-success-500/20',
  'Past due': 'bg-danger-500/10 text-danger-300 border border-danger-500/20',
  Trialing: 'bg-accent2/10 text-accent2 border border-accent2/30',
};

const activity = [
  { who: 'Grace Hopper', what: 'payment failed', when: '4m', tone: 'danger' },
  { who: 'Linus T.', what: 'upgraded to Foundry', when: '1h', tone: 'accent' },
  { who: 'Ada Lovelace', what: 'invited 3 teammates', when: '3h', tone: 'accent2' },
  { who: 'System', what: 'nightly backup complete', when: '6h', tone: 'success' },
];
const toneDot: Record<string, string> = {
  danger: 'bg-danger-400',
  accent: 'bg-accent',
  accent2: 'bg-accent2',
  success: 'bg-success-400',
};

/* ───────────────────────────── small pieces ───────────────────────────── */

function Stat({ label, value, delta, up, icon, pct }: { label: string; value: string; delta: string; up: boolean; icon: string; pct: number }) {
  return (
    <div className={`${surface.card} p-5`}>
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-fg-subtle">{label}</span>
        <span className="grid h-8 w-8 place-items-center rounded-lg border border-edge/10 bg-fg/[0.03] text-accent">
          <Icon name={icon} className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-4 font-display text-3xl text-fg">{value}</div>
      <div className="mt-2 flex items-center gap-2">
        <span className={`inline-flex items-center gap-1 text-xs font-medium ${up ? 'text-success-400' : 'text-danger-400'}`}>
          <Icon name="arrow" className={`h-3 w-3 ${up ? '-rotate-45' : 'rotate-45'}`} />{delta}
        </span>
        <span className="text-xs text-fg-subtle">vs last month</span>
      </div>
      <Progress value={pct} size="sm" tw={up ? 'mt-4 [&>div>div]:bg-accent' : 'mt-4 [&>div>div]:bg-danger-500'} />
    </div>
  );
}

function RowMenu({ onView }: { onView: () => void }) {
  return (
    <DropdownMenu.Root align="end">
      <DropdownMenu.Trigger tw="grid h-8 w-8 place-items-center rounded-lg text-fg-subtle hover:bg-fg/5 hover:text-fg">
        <span className="text-lg leading-none">⋯</span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content tw={menuContent}>
        <DropdownMenu.Item tw={menuItem} onClick={onView}>View details</DropdownMenu.Item>
        <DropdownMenu.Item tw={menuItem}>Edit</DropdownMenu.Item>
        <DropdownMenu.Separator tw="bg-edge/10" />
        <DropdownMenu.Item destructive>Suspend</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

function CustomerTable({ rows, onView, compact }: { rows: Customer[]; onView: (c: Customer) => void; compact?: boolean }) {
  if (rows.length === 0) {
    return <div className="px-5 py-12 text-center text-sm text-fg-subtle">No customers match your search.</div>;
  }
  return (
    <Table.Root hoverable tw="text-fg-muted">
      <Table.Header tw="border-edge/10">
        <Table.Row tw="hover:bg-transparent">
          <Table.Head tw="text-fg-subtle">Customer</Table.Head>
          <Table.Head tw="text-fg-subtle">Plan</Table.Head>
          <Table.Head tw="text-fg-subtle text-right">MRR</Table.Head>
          {!compact && <Table.Head tw="text-fg-subtle">Status</Table.Head>}
          <Table.Head tw="w-10" />
        </Table.Row>
      </Table.Header>
      <Table.Body tw="divide-edge/10">
        {rows.map((c) => (
          <Table.Row key={c.email} tw="hover:bg-fg/[0.03]">
            <Table.Cell>
              <div className="flex items-center gap-3">
                <Avatar size="sm" tw="bg-elevated text-fg text-xs">{c.init}</Avatar>
                <div className="min-w-0">
                  <div className="truncate font-medium text-fg">{c.name}</div>
                  <div className="truncate font-mono text-[11px] text-fg-subtle">{c.email}</div>
                </div>
              </div>
            </Table.Cell>
            <Table.Cell tw="text-fg-muted">{c.plan}</Table.Cell>
            <Table.Cell tw="text-right font-medium tabular-nums text-fg">{c.mrr}</Table.Cell>
            {!compact && (
              <Table.Cell>
                <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${statusTone[c.status]}`}>{c.status}</span>
              </Table.Cell>
            )}
            <Table.Cell><RowMenu onView={() => onView(c)} /></Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

/* ───────────────────────────────── views ──────────────────────────────── */

function Overview({ rows, onView }: { rows: Customer[]; onView: (c: Customer) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="MRR" value="$48,210" delta="12.4%" up icon="wallet" pct={78} />
        <Stat label="Customers" value="2,318" delta="3.1%" up icon="users" pct={64} />
        <Stat label="Churn" value="1.8%" delta="0.4%" up={false} icon="chart" pct={18} />
        <Stat label="NPS" value="72" delta="6 pts" up icon="star" pct={86} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <div className={`${surface.card} overflow-hidden`}>
          <div className="flex items-center justify-between border-b border-edge/10 px-5 py-4">
            <div>
              <h2 className="font-display text-base text-fg">Recent customers</h2>
              <p className="font-mono text-[11px] text-fg-subtle">{rows.length} shown</p>
            </div>
          </div>
          <CustomerTable rows={rows.slice(0, 5)} onView={onView} />
        </div>
        <div className={`${surface.card} p-5`}>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base text-fg">Activity</h2>
            <Badge tw="bg-accent/10 text-accent border border-accent/30">Live</Badge>
          </div>
          <ol className="mt-5 space-y-5">
            {activity.map((a, i) => (
              <li key={i} className="relative flex gap-3 pl-1">
                <span className="relative mt-1.5 flex">
                  <span className={`h-2 w-2 rounded-full ${toneDot[a.tone]}`} />
                  {i < activity.length - 1 && <span className="absolute left-1/2 top-3 h-9 w-px -translate-x-1/2 bg-edge/10" />}
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-fg"><span className="font-medium">{a.who}</span> <span className="text-fg-muted">{a.what}</span></p>
                  <p className="font-mono text-[11px] text-fg-subtle">{a.when} ago</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function CustomersView({ rows, onView }: { rows: Customer[]; onView: (c: Customer) => void }) {
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const count = Math.max(1, Math.ceil(rows.length / pageSize));
  const safePage = Math.min(page, count);
  const slice = rows.slice((safePage - 1) * pageSize, safePage * pageSize);
  return (
    <div className={`${surface.card} overflow-hidden`}>
      <div className="flex items-center justify-between border-b border-edge/10 px-5 py-4">
        <h2 className="font-display text-base text-fg">All customers</h2>
        <span className="font-mono text-[11px] text-fg-subtle">{rows.length} total</span>
      </div>
      <CustomerTable rows={slice} onView={onView} />
      {rows.length > pageSize && (
        <div className="flex justify-end border-t border-edge/10 px-5 py-3">
          <Pagination page={safePage} count={count} onChange={setPage} tw={paginationTw} />
        </div>
      )}
    </div>
  );
}

function Analytics() {
  const data = [38, 52, 47, 63, 58, 72, 80, 69, 88, 94, 82, 100];
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Signups" value="1,204" delta="18%" up icon="users" pct={72} />
        <Stat label="Conversion" value="4.6%" delta="0.8%" up icon="gauge" pct={46} />
        <Stat label="Revenue" value="$48.2k" delta="12%" up icon="wallet" pct={82} />
      </div>
      <div className={`${surface.card} p-6`}>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base text-fg">Signups this year</h2>
          <Badge tw="bg-accent/10 text-accent border border-accent/30">+18% YoY</Badge>
        </div>
        <div className="mt-8 flex h-48 items-end gap-2">
          {data.map((v, i) => (
            <div key={i} className="group flex flex-1 flex-col items-center gap-2">
              <div className="relative w-full overflow-hidden rounded-t-md bg-fg/[0.04]" style={{ height: '100%' }}>
                <div
                  className="absolute bottom-0 w-full rounded-t-md bg-accent/70 transition-all duration-500 group-hover:bg-accent"
                  style={{ height: `${v}%` }}
                />
              </div>
              <span className="font-mono text-[10px] text-fg-subtle">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const projects = [
    { name: 'Aurora', desc: 'Marketing site redesign', pct: 82, team: ['AL', 'AT', 'GH'] },
    { name: 'Helix', desc: 'Mobile app v2', pct: 46, team: ['LT', 'MH'] },
    { name: 'Vanta', desc: 'Design tokens migration', pct: 93, team: ['DR', 'BL', 'ED'] },
    { name: 'Lumen', desc: 'Docs & Storybook', pct: 31, team: ['KJ'] },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((p) => (
        <div key={p.name} className={`${surface.card} p-5`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-edge/10 bg-fg/[0.03] text-accent"><Icon name="layers" className="h-5 w-5" /></span>
              <div>
                <h3 className="font-display text-base text-fg">{p.name}</h3>
                <p className="text-xs text-fg-subtle">{p.desc}</p>
              </div>
            </div>
            <Badge tw="bg-fg/5 text-fg-muted border border-edge/10">{p.pct}%</Badge>
          </div>
          <Progress value={p.pct} tw="mt-5 [&>div>div]:bg-accent" />
          <div className="mt-4 flex -space-x-2">
            {p.team.map((t) => (
              <Avatar key={t} size="xs" tw="bg-elevated text-fg text-[10px] ring-2 ring-panel">{t}</Avatar>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Billing({ onUpgrade }: { onUpgrade: () => void }) {
  const invoices = [
    { id: 'INV-0241', date: 'Jun 1, 2026', amount: '$240.00', status: 'Paid' },
    { id: 'INV-0228', date: 'May 1, 2026', amount: '$240.00', status: 'Paid' },
    { id: 'INV-0215', date: 'Apr 1, 2026', amount: '$240.00', status: 'Paid' },
  ];
  return (
    <div className="space-y-6">
      <div className={`${surface.card} p-6`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-fg-subtle">Current plan</p>
            <h2 className="mt-1 font-display text-2xl text-fg">Studio · <span className="text-accent">$240</span><span className="text-sm text-fg-subtle">/mo</span></h2>
          </div>
          <Button tw={accentBtn} onClick={onUpgrade}><Icon name="rocket" className="h-4 w-4" /> Upgrade plan</Button>
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm text-fg-muted"><span>Seats used</span><span className="tabular-nums">8 / 10</span></div>
          <Progress value={80} tw="mt-2 [&>div>div]:bg-accent" />
        </div>
      </div>
      <div className={`${surface.card} overflow-hidden`}>
        <div className="border-b border-edge/10 px-5 py-4"><h2 className="font-display text-base text-fg">Invoices</h2></div>
        <Table.Root hoverable tw="text-fg-muted">
          <Table.Header tw="border-edge/10">
            <Table.Row tw="hover:bg-transparent">
              <Table.Head tw="text-fg-subtle">Invoice</Table.Head>
              <Table.Head tw="text-fg-subtle">Date</Table.Head>
              <Table.Head tw="text-fg-subtle text-right">Amount</Table.Head>
              <Table.Head tw="text-fg-subtle">Status</Table.Head>
              <Table.Head tw="w-10" />
            </Table.Row>
          </Table.Header>
          <Table.Body tw="divide-edge/10">
            {invoices.map((inv) => (
              <Table.Row key={inv.id} tw="hover:bg-fg/[0.03]">
                <Table.Cell tw="font-medium text-fg">{inv.id}</Table.Cell>
                <Table.Cell>{inv.date}</Table.Cell>
                <Table.Cell tw="text-right tabular-nums text-fg">{inv.amount}</Table.Cell>
                <Table.Cell><span className="inline-flex rounded-full bg-success-500/10 px-2 py-0.5 text-[11px] font-medium text-success-300 border border-success-500/20">{inv.status}</span></Table.Cell>
                <Table.Cell>
                  <button className="grid h-8 w-8 place-items-center rounded-lg text-fg-subtle hover:bg-fg/5 hover:text-fg" aria-label="Download"><Icon name="download" className="h-4 w-4" /></button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
}

/* ─────────────────────────────── the app ──────────────────────────────── */

const titles: Record<View, string> = {
  overview: 'Overview',
  analytics: 'Analytics',
  customers: 'Customers',
  projects: 'Projects',
  billing: 'Billing',
};

export const Dashboard: Story = {
  render: () => {
    const App = () => {
      const [view, setView] = useState<View>('overview');
      const [query, setQuery] = useState('');
      const [detail, setDetail] = useState<Customer | null>(null);
      const [upgrade, setUpgrade] = useState(false);
      const [unread, setUnread] = useState(3);

      const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return customers;
        return customers.filter((c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.plan.toLowerCase().includes(q));
      }, [query]);

      const showSearch = view === 'overview' || view === 'customers';

      return (
        <LuxeStage className="flex" switcher={false}>
          {/* sidebar */}
          <aside className="hidden w-60 shrink-0 flex-col border-r border-edge/10 bg-canvas/50 lg:flex">
            <div className="flex h-16 items-center border-b border-edge/10 px-6"><Logo /></div>
            <nav className="flex-1 space-y-1 p-3">
              {nav.map((n) => {
                const active = n.id === view;
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setView(n.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${active ? 'border border-accent/40 bg-accent/10 text-fg' : 'text-fg-muted hover:bg-fg/5 hover:text-fg'}`}
                  >
                    <Icon name={n.i} className="h-[18px] w-[18px]" />
                    {n.l}
                    {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />}
                  </button>
                );
              })}
            </nav>
            <div className="m-3 rounded-2xl border border-edge/10 bg-accent/[0.06] p-4">
              <p className="font-display text-sm text-fg">Storage</p>
              <Progress value={72} tw="mt-3 [&>div>div]:bg-accent" />
              <p className="mt-2 font-mono text-[11px] text-fg-subtle">72 of 100 GB used</p>
              <Button size="sm" fullWidth tw={`mt-3 ${ghostBtn}`} intent="ghost" onClick={() => setUpgrade(true)}>Upgrade</Button>
            </div>
          </aside>

          {/* main */}
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="flex h-16 items-center justify-between gap-3 border-b border-edge/10 bg-canvas/50 px-4 backdrop-blur-xl sm:px-6">
              <div className="min-w-0">
                <h1 className="truncate font-display text-base text-fg sm:text-lg">{titles[view]}</h1>
                <p className="font-mono text-[11px] text-fg-subtle">Tuesday, 18 June</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-2.5">
                {showSearch && (
                  <div className="hidden w-44 lg:block xl:w-56">
                    <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search customers…" size="sm" tw={darkInput} prefix={<Icon name="search" className="h-4 w-4" />} />
                  </div>
                )}
                <ThemeSwitcher className="hidden sm:inline-flex" />
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
                      {activity.slice(0, 3).map((a, i) => (
                        <li key={i} className="flex items-start gap-3 rounded-lg p-2 hover:bg-fg/5">
                          <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${toneDot[a.tone]}`} />
                          <p className="text-sm text-fg-muted"><span className="font-medium text-fg">{a.who}</span> {a.what} <span className="font-mono text-[11px] text-fg-subtle">· {a.when}</span></p>
                        </li>
                      ))}
                    </ul>
                  </Popover.Content>
                </Popover.Root>
                <DropdownMenu.Root align="end">
                  <DropdownMenu.Trigger>
                    <Button size="sm" tw={accentBtn}><Icon name="plus" className="h-4 w-4" /> New</Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content tw={menuContent}>
                    <DropdownMenu.Item tw={menuItem} onClick={() => setView('projects')}>Project</DropdownMenu.Item>
                    <DropdownMenu.Item tw={menuItem} onClick={() => setView('customers')}>Customer</DropdownMenu.Item>
                    <DropdownMenu.Item tw={menuItem} onClick={() => setView('billing')}>Invoice</DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </div>
            </header>

            {/* mobile nav (sidebar is desktop-only) */}
            <div className="flex gap-1.5 overflow-x-auto border-b border-edge/10 px-4 py-2 scrollbar-luxe lg:hidden">
              {nav.map((n) => {
                const active = n.id === view;
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setView(n.id)}
                    className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors ${active ? 'bg-accent/15 text-fg' : 'text-fg-muted hover:text-fg'}`}
                  >
                    <Icon name={n.i} className="h-4 w-4" />
                    {n.l}
                  </button>
                );
              })}
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
              {query && showSearch && (
                <Alert variant="neutral" tw="bg-fg/[0.03] text-fg-muted border-edge/10">
                  Filtering by <span className="font-medium text-fg">“{query}”</span> — {filtered.length} match{filtered.length === 1 ? '' : 'es'}.
                </Alert>
              )}
              {view === 'overview' && <Overview rows={filtered} onView={setDetail} />}
              {view === 'analytics' && <Analytics />}
              {view === 'customers' && <CustomersView rows={filtered} onView={setDetail} />}
              {view === 'projects' && <Projects />}
              {view === 'billing' && <Billing onUpgrade={() => setUpgrade(true)} />}
            </div>
          </div>

          {/* customer detail dialog */}
          <Dialog.Root open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
            <Dialog.Overlay />
            <Dialog.Content tw="border border-edge/10 bg-panel text-fg">
              <Dialog.Close tw="text-fg-subtle hover:text-fg" />
              {detail && (
                <>
                  <div className="flex items-center gap-4">
                    <Avatar size="lg" tw="bg-accent text-onaccent font-semibold">{detail.init}</Avatar>
                    <div>
                      <Dialog.Title tw="text-fg">{detail.name}</Dialog.Title>
                      <p className="font-mono text-xs text-fg-subtle">{detail.email}</p>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[['Plan', detail.plan], ['MRR', detail.mrr], ['Status', detail.status]].map(([k, v]) => (
                      <div key={k} className="rounded-xl border border-edge/10 bg-fg/[0.02] p-3">
                        <div className="text-[11px] uppercase tracking-wider text-fg-subtle">{k}</div>
                        <div className="mt-1 text-sm font-medium text-fg">{v}</div>
                      </div>
                    ))}
                  </div>
                  <Dialog.Footer>
                    <Button intent="ghost" tw={ghostBtn} onClick={() => setDetail(null)}>Close</Button>
                    <Button tw={accentBtn}>Open profile</Button>
                  </Dialog.Footer>
                </>
              )}
            </Dialog.Content>
          </Dialog.Root>

          {/* upgrade dialog */}
          <Dialog.Root open={upgrade} onOpenChange={setUpgrade}>
            <Dialog.Overlay />
            <Dialog.Content tw="border border-edge/10 bg-panel text-fg">
              <Dialog.Close tw="text-fg-subtle hover:text-fg" />
              <Dialog.Header>
                <Dialog.Title tw="text-fg">Upgrade to Foundry</Dialog.Title>
                <Dialog.Description tw="text-fg-muted">Unlock white-label tokens, a dedicated engineer and SLAs.</Dialog.Description>
              </Dialog.Header>
              <Dialog.Footer>
                <Button intent="ghost" tw={ghostBtn} onClick={() => setUpgrade(false)}>Maybe later</Button>
                <Button tw={accentBtn} onClick={() => setUpgrade(false)}>Upgrade now</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Root>
        </LuxeStage>
      );
    };
    return <App />;
  },
};
