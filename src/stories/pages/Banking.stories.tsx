import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '../../components/Table';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Avatar } from '../../components/Avatar';
import { Input } from '../../components/Input';
import { Progress } from '../../components/Progress';
import { Pagination } from '../../components/Pagination';
import { Toggle } from '../../components/Toggle';
import { Dialog } from '../../components/Dialog';
import { DropdownMenu } from '../../components/DropdownMenu';
import { Alert } from '../../components/Alert';
import {
  LuxeStage,
  Icon,
  ThemeSwitcher,
  surface,
  accentBtn,
  ghostBtn,
  darkInput,
  money,
} from './_kit';

const meta: Meta = {
  title: 'Pages/Banking',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    options: { showPanel: false },
    docs: {
      description: {
        component:
          'Ledger — a personal-finance app. An accounts overview with a spend chart and budgets, a searchable & filterable transactions table with working pagination, a send-money flow (recipient → amount → review dialog) that posts a new transaction, and a cards screen with a freeze toggle and live limits. Runtime themeable.',
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

type View = 'accounts' | 'transactions' | 'send' | 'cards';
const NAV: { id: View; i: string; l: string }[] = [
  { id: 'accounts', i: 'wallet', l: 'Accounts' },
  { id: 'transactions', i: 'barchart', l: 'Transactions' },
  { id: 'send', i: 'send', l: 'Send money' },
  { id: 'cards', i: 'creditcard', l: 'Cards' },
];

type Cat = 'Income' | 'Groceries' | 'Dining' | 'Transport' | 'Shopping' | 'Bills' | 'Subscriptions';
type Txn = { id: string; merchant: string; cat: Cat; date: string; amount: number; icon: string };

const SEED: Txn[] = [
  { id: 't1', merchant: 'Acme Payroll', cat: 'Income', date: 'Jun 18', amount: 4200, icon: 'wallet' },
  { id: 't2', merchant: 'Whole Foods Market', cat: 'Groceries', date: 'Jun 17', amount: -86.42, icon: 'bag' },
  { id: 't3', merchant: 'Blue Bottle Coffee', cat: 'Dining', date: 'Jun 17', amount: -6.5, icon: 'coffee' },
  { id: 't4', merchant: 'Uber', cat: 'Transport', date: 'Jun 16', amount: -23.1, icon: 'truck' },
  { id: 't5', merchant: 'Apple Store', cat: 'Shopping', date: 'Jun 15', amount: -129.0, icon: 'bag' },
  { id: 't6', merchant: 'Netflix', cat: 'Subscriptions', date: 'Jun 15', amount: -15.99, icon: 'play' },
  { id: 't7', merchant: 'City Power & Light', cat: 'Bills', date: 'Jun 14', amount: -112.34, icon: 'zap' },
  { id: 't8', merchant: 'Trader Joe\'s', cat: 'Groceries', date: 'Jun 13', amount: -54.27, icon: 'bag' },
  { id: 't9', merchant: 'Spotify', cat: 'Subscriptions', date: 'Jun 12', amount: -10.99, icon: 'play' },
  { id: 't10', merchant: 'Shell', cat: 'Transport', date: 'Jun 11', amount: -61.0, icon: 'truck' },
  { id: 't11', merchant: 'The Ivy Bistro', cat: 'Dining', date: 'Jun 10', amount: -78.5, icon: 'utensils' },
  { id: 't12', merchant: 'Amazon', cat: 'Shopping', date: 'Jun 9', amount: -42.18, icon: 'bag' },
  { id: 't13', merchant: 'Freelance Invoice', cat: 'Income', date: 'Jun 8', amount: 850, icon: 'wallet' },
  { id: 't14', merchant: 'Comcast', cat: 'Bills', date: 'Jun 7', amount: -89.99, icon: 'globe' },
];

const catTone: Record<Cat, string> = {
  Income: 'bg-success-500/10 text-success-300 border border-success-500/20',
  Groceries: 'bg-accent/10 text-accent border border-accent/25',
  Dining: 'bg-accent2/10 text-accent2 border border-accent2/30',
  Transport: 'bg-info-500/10 text-info-300 border border-info-500/20',
  Shopping: 'bg-gold-500/10 text-gold-300 border border-gold-500/20',
  Bills: 'bg-danger-500/10 text-danger-300 border border-danger-500/20',
  Subscriptions: 'bg-fg/5 text-fg-muted border border-edge/10',
};
const CATS: ('All' | Cat)[] = ['All', 'Income', 'Groceries', 'Dining', 'Transport', 'Shopping', 'Bills', 'Subscriptions'];

const ACCOUNTS = [
  { name: 'Everyday Checking', no: '•• 4821', balance: 8264.12, icon: 'wallet', grad: 'from-accent/30 to-accent2/20' },
  { name: 'High-Yield Savings', no: '•• 9930', balance: 24180.0, icon: 'shield', grad: 'from-emerald-400/25 to-accent/20' },
  { name: 'Platinum Credit', no: '•• 1107', balance: -1342.55, icon: 'creditcard', grad: 'from-accent2/30 to-accent/15' },
];

const BUDGETS = [
  { c: 'Groceries', spent: 412, cap: 600, variant: 'brand' as const },
  { c: 'Dining', spent: 286, cap: 300, variant: 'gold' as const },
  { c: 'Transport', spent: 148, cap: 250, variant: 'success' as const },
  { c: 'Shopping', spent: 322, cap: 300, variant: 'danger' as const },
];

const PEOPLE = [
  { name: 'Ava Bennett', handle: '@avab', init: 'AB' },
  { name: 'Marcus Lee', handle: '@mlee', init: 'ML' },
  { name: 'Priya Shah', handle: '@priya', init: 'PS' },
  { name: 'Diego Ramos', handle: '@dramos', init: 'DR' },
  { name: 'Hana Sato', handle: '@hana', init: 'HS' },
];

const CHART = [62, 48, 70, 55, 80, 67, 90, 74, 60, 85, 72, 95];
const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

export const App: Story = {
  render: () => {
    const Inner = () => {
      const [view, setView] = useState<View>('accounts');
      const [txns, setTxns] = useState<Txn[]>(SEED);
      const [query, setQuery] = useState('');
      const [cat, setCat] = useState<'All' | Cat>('All');
      const [page, setPage] = useState(1);
      const [frozen, setFrozen] = useState(false);
      const [toast, setToast] = useState<string | null>(null);

      // send flow
      const [to, setTo] = useState<typeof PEOPLE[number] | null>(null);
      const [amount, setAmount] = useState('');
      const [note, setNote] = useState('');
      const [review, setReview] = useState(false);

      const totalBalance = ACCOUNTS.reduce((n, a) => n + a.balance, 0);

      const filtered = useMemo(() => {
        let list = cat === 'All' ? txns : txns.filter((t) => t.cat === cat);
        const q = query.trim().toLowerCase();
        if (q) list = list.filter((t) => t.merchant.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q));
        return list;
      }, [txns, cat, query]);

      const pageSize = 7;
      const count = Math.max(1, Math.ceil(filtered.length / pageSize));
      const safePage = Math.min(page, count);
      const slice = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

      const amt = parseFloat(amount) || 0;
      const sendMoney = () => {
        if (!to || amt <= 0) return;
        setTxns((t) => [{ id: `s${Date.now()}`, merchant: to.name, cat: 'Shopping', date: 'Jun 18', amount: -amt, icon: 'send' }, ...t]);
        setReview(false);
        setToast(`Sent ${money(amt)} to ${to.name}.`);
        setTo(null); setAmount(''); setNote('');
        setView('transactions');
        setPage(1);
        setTimeout(() => setToast(null), 4000);
      };

      return (
        <LuxeStage className="flex" switcher={false}>
          {/* sidebar */}
          <aside className="hidden w-60 shrink-0 flex-col border-r border-edge/10 bg-canvas/50 lg:flex">
            <div className="flex h-16 items-center gap-2.5 border-b border-edge/10 px-6">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-sheen text-onaccent shadow-accent"><Icon name="wallet" className="h-4 w-4" /></span>
              <span className="font-display text-[17px] font-semibold tracking-tight text-fg">Ledger</span>
            </div>
            <nav className="flex-1 space-y-1 p-3">
              {NAV.map((n) => {
                const active = n.id === view;
                return (
                  <button key={n.id} onClick={() => { setView(n.id); setPage(1); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${active ? 'border border-accent/40 bg-accent/10 text-fg' : 'text-fg-muted hover:bg-fg/5 hover:text-fg'}`}>
                    <Icon name={n.i} className="h-[18px] w-[18px]" />
                    {n.l}
                    {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />}
                  </button>
                );
              })}
            </nav>
            <div className="m-3 rounded-2xl border border-edge/10 bg-accent/[0.06] p-4">
              <p className="text-xs uppercase tracking-wider text-fg-subtle">Net worth</p>
              <p className="mt-1 font-display text-xl text-fg">{money(totalBalance)}</p>
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-success-400"><Icon name="arrow" className="h-3 w-3 -rotate-45" /> 4.2% this month</p>
            </div>
          </aside>

          {/* main */}
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="flex h-16 items-center justify-between gap-3 border-b border-edge/10 bg-canvas/50 px-4 backdrop-blur-xl sm:px-6">
              <h1 className="font-display text-base text-fg sm:text-lg">{NAV.find((n) => n.id === view)!.l}</h1>
              <div className="flex items-center gap-2 sm:gap-2.5">
                <ThemeSwitcher className="hidden sm:inline-flex" />
                <Button size="sm" tw={accentBtn} onClick={() => setView('send')}><Icon name="send" className="h-4 w-4" /> Send</Button>
                <Avatar size="sm" tw="bg-accent text-onaccent text-xs font-semibold">JD</Avatar>
              </div>
            </header>

            {/* mobile nav */}
            <div className="flex gap-1.5 overflow-x-auto border-b border-edge/10 px-4 py-2 scrollbar-luxe lg:hidden">
              {NAV.map((n) => (
                <button key={n.id} onClick={() => { setView(n.id); setPage(1); }} className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-sm ${n.id === view ? 'bg-accent/15 text-fg' : 'text-fg-muted'}`}>
                  <Icon name={n.i} className="h-4 w-4" /> {n.l}
                </button>
              ))}
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
              {toast && <Alert variant="success" title="Transfer sent" onClose={() => setToast(null)} tw="bg-success-500/10 text-success-200 border-success-500/25">{toast}</Alert>}

              {/* ACCOUNTS */}
              {view === 'accounts' && (
                <>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {ACCOUNTS.map((a) => (
                      <div key={a.no} className={`relative overflow-hidden ${surface.card} p-5`}>
                        <div aria-hidden className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${a.grad} blur-2xl`} />
                        <div className="relative flex items-center justify-between">
                          <span className="grid h-9 w-9 place-items-center rounded-lg border border-edge/10 bg-fg/[0.03] text-accent"><Icon name={a.icon} className="h-4 w-4" /></span>
                          <span className="font-mono text-xs text-fg-subtle">{a.no}</span>
                        </div>
                        <p className="relative mt-4 text-xs uppercase tracking-wider text-fg-subtle">{a.name}</p>
                        <p className={`relative mt-1 font-display text-2xl ${a.balance < 0 ? 'text-danger-300' : 'text-fg'}`}>{money(a.balance)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                    <div className={`${surface.card} p-6`}>
                      <div className="flex items-center justify-between">
                        <h2 className="font-display text-base text-fg">Spending</h2>
                        <Badge tw="bg-accent/10 text-accent border border-accent/30">This year</Badge>
                      </div>
                      <div className="mt-8 flex h-44 items-end gap-2">
                        {CHART.map((v, i) => (
                          <div key={i} className="group flex flex-1 flex-col items-center gap-2">
                            <div className="relative w-full overflow-hidden rounded-t-md bg-fg/[0.04]" style={{ height: '100%' }}>
                              <div className="absolute bottom-0 w-full rounded-t-md bg-accent/70 transition-all duration-500 group-hover:bg-accent" style={{ height: `${v}%` }} />
                            </div>
                            <span className="font-mono text-[10px] text-fg-subtle">{MONTHS[i]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={`${surface.card} p-5`}>
                      <h2 className="font-display text-base text-fg">Budgets</h2>
                      <div className="mt-5 space-y-4">
                        {BUDGETS.map((b) => (
                          <div key={b.c}>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-fg-muted">{b.c}</span>
                              <span className="tabular-nums text-fg">{money(b.spent)} <span className="text-fg-subtle">/ {money(b.cap)}</span></span>
                            </div>
                            <Progress value={Math.min(100, (b.spent / b.cap) * 100)} variant={b.variant} size="sm" tw="mt-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={`${surface.card} overflow-hidden`}>
                    <div className="flex items-center justify-between border-b border-edge/10 px-5 py-4">
                      <h2 className="font-display text-base text-fg">Recent activity</h2>
                      <button onClick={() => setView('transactions')} className="text-sm text-accent hover:underline">View all</button>
                    </div>
                    <TxnTable rows={txns.slice(0, 5)} />
                  </div>
                </>
              )}

              {/* TRANSACTIONS */}
              {view === 'transactions' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="w-full sm:max-w-xs">
                      <Input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Search transactions…" tw={darkInput} prefix={<Icon name="search" className="h-4 w-4" />} />
                    </div>
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger tw="inline-flex h-10 items-center gap-2 rounded-lg border border-edge/12 bg-fg/[0.04] px-3 text-sm text-fg-muted hover:text-fg">
                        <Icon name="filter" className="h-4 w-4" /> {cat}
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content tw={menuContent}>
                        {CATS.map((c) => <DropdownMenu.Item key={c} tw={menuItem} onClick={() => { setCat(c); setPage(1); }}>{c}</DropdownMenu.Item>)}
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </div>
                  <div className={`${surface.card} overflow-hidden`}>
                    <TxnTable rows={slice} />
                    <div className="flex items-center justify-between border-t border-edge/10 px-5 py-3">
                      <span className="font-mono text-[11px] text-fg-subtle">{filtered.length} transactions</span>
                      {count > 1 && <Pagination page={safePage} count={count} onChange={setPage} tw={paginationTw} />}
                    </div>
                  </div>
                </div>
              )}

              {/* SEND */}
              {view === 'send' && (
                <div className="mx-auto max-w-xl space-y-6">
                  <div className={`${surface.card} p-6`}>
                    <p className="text-xs uppercase tracking-wider text-fg-subtle">Recipient</p>
                    <div className="mt-3 flex gap-3 overflow-x-auto pb-1 scrollbar-luxe">
                      {PEOPLE.map((p) => (
                        <button key={p.handle} onClick={() => setTo(p)} className={`flex shrink-0 flex-col items-center gap-2 rounded-xl border p-3 transition ${to?.handle === p.handle ? 'border-accent bg-accent/10' : 'border-edge/12 hover:border-edge/25'}`}>
                          <Avatar tw={to?.handle === p.handle ? 'bg-accent text-onaccent font-semibold' : 'bg-elevated text-fg'}>{p.init}</Avatar>
                          <span className="text-xs text-fg">{p.name.split(' ')[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={`${surface.card} p-6 text-center`}>
                    <p className="text-xs uppercase tracking-wider text-fg-subtle">Amount</p>
                    <div className="mt-3 flex items-center justify-center gap-1">
                      <span className="font-display text-3xl text-fg-subtle">$</span>
                      <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                        inputMode="decimal"
                        placeholder="0"
                        className="w-44 bg-transparent text-center font-display text-5xl font-light text-fg placeholder:text-fg-subtle/40 focus:outline-none"
                      />
                    </div>
                    <div className="mt-4 flex justify-center gap-2">
                      {[10, 25, 50, 100].map((q) => (
                        <button key={q} onClick={() => setAmount(String(q))} className="rounded-full border border-edge/12 bg-fg/[0.04] px-3 py-1 text-sm text-fg-muted transition hover:text-fg">${q}</button>
                      ))}
                    </div>
                    <div className="mx-auto mt-5 max-w-xs">
                      <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="What's it for?" size="sm" tw={darkInput} prefix={<Icon name="file" className="h-4 w-4" />} />
                    </div>
                    <p className="mt-4 text-xs text-fg-subtle">From Everyday Checking · {money(ACCOUNTS[0].balance)} available</p>
                  </div>

                  <Button fullWidth size="lg" tw={accentBtn} disabled={!to || amt <= 0} onClick={() => setReview(true)}>
                    {to && amt > 0 ? `Review ${money(amt)} to ${to.name.split(' ')[0]}` : 'Choose a recipient & amount'}
                  </Button>
                </div>
              )}

              {/* CARDS */}
              {view === 'cards' && (
                <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                  <div className="space-y-5">
                    <div className={`relative aspect-[1.6] overflow-hidden rounded-3xl border border-edge/15 bg-gradient-to-br from-accent/30 via-panel to-accent2/25 p-6 transition ${frozen ? 'opacity-60 saturate-50' : ''}`}>
                      <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl" />
                      <div className="relative flex h-full flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <span className="font-display text-lg font-semibold text-fg">Ledger</span>
                          {frozen ? <Badge tw="bg-info-500/15 text-info-200 border border-info-500/30">Frozen</Badge> : <Icon name="wifi" className="h-5 w-5 text-fg-muted" />}
                        </div>
                        <div>
                          <p className="font-mono text-lg tracking-[0.2em] text-fg">5412 •••• •••• 1107</p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="font-mono text-xs uppercase tracking-wider text-fg-muted">Jordan Doe</span>
                            <span className="font-mono text-xs text-fg-muted">07/29</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`${surface.card} flex items-center justify-between p-4`}>
                      <div>
                        <p className="text-sm font-medium text-fg">Freeze card</p>
                        <p className="text-xs text-fg-subtle">Instantly block new transactions.</p>
                      </div>
                      <Toggle checked={frozen} onChange={() => setFrozen((v) => !v)} />
                    </div>
                  </div>

                  <div className={`${surface.card} p-6`}>
                    <h2 className="font-display text-base text-fg">Card limits</h2>
                    <div className="mt-5 space-y-5">
                      <div>
                        <div className="flex items-center justify-between text-sm"><span className="text-fg-muted">Monthly spend</span><span className="tabular-nums text-fg">{money(1342)} / {money(3000)}</span></div>
                        <Progress value={45} variant="brand" size="sm" tw="mt-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm"><span className="text-fg-muted">ATM withdrawals</span><span className="tabular-nums text-fg">{money(200)} / {money(800)}</span></div>
                        <Progress value={25} variant="success" size="sm" tw="mt-2" />
                      </div>
                    </div>
                    <div className="mt-6 space-y-2">
                      {['Contactless payments', 'Online transactions', 'International use'].map((s, i) => (
                        <div key={s} className="flex items-center justify-between rounded-xl border border-edge/10 bg-fg/[0.02] px-4 py-3">
                          <span className="text-sm text-fg-muted">{s}</span>
                          <Toggle defaultChecked={i < 2} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* REVIEW */}
          <Dialog.Root open={review} onOpenChange={setReview}>
            <Dialog.Overlay />
            <Dialog.Content tw="max-w-sm border border-edge/10 bg-panel text-fg">
              <Dialog.Close tw="text-fg-subtle hover:text-fg" />
              <Dialog.Header>
                <Dialog.Title tw="text-fg">Confirm transfer</Dialog.Title>
              </Dialog.Header>
              {to && (
                <div className="text-center">
                  <Avatar size="xl" tw="mx-auto bg-accent/15 text-accent font-semibold">{to.init}</Avatar>
                  <p className="mt-3 font-display text-3xl text-fg">{money(amt)}</p>
                  <p className="text-sm text-fg-muted">to {to.name} · {to.handle}</p>
                  {note && <p className="mt-1 text-xs text-fg-subtle">“{note}”</p>}
                </div>
              )}
              <Dialog.Footer>
                <Button intent="ghost" tw={ghostBtn} onClick={() => setReview(false)}>Cancel</Button>
                <Button tw={accentBtn} onClick={sendMoney}><Icon name="send" className="h-4 w-4" /> Send now</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Root>
        </LuxeStage>
      );
    };
    return <Inner />;
  },
};

function TxnTable({ rows }: { rows: Txn[] }) {
  if (rows.length === 0) return <div className="px-5 py-12 text-center text-sm text-fg-subtle">No transactions found.</div>;
  return (
    <Table.Root hoverable tw="text-fg-muted">
      <Table.Header tw="border-edge/10">
        <Table.Row tw="hover:bg-transparent">
          <Table.Head tw="text-fg-subtle">Merchant</Table.Head>
          <Table.Head tw="text-fg-subtle">Category</Table.Head>
          <Table.Head tw="text-fg-subtle">Date</Table.Head>
          <Table.Head tw="text-fg-subtle text-right">Amount</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body tw="divide-edge/10">
        {rows.map((t) => (
          <Table.Row key={t.id} tw="hover:bg-fg/[0.03]">
            <Table.Cell>
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-edge/10 bg-fg/[0.03] text-fg-muted"><Icon name={t.icon} className="h-4 w-4" /></span>
                <span className="font-medium text-fg">{t.merchant}</span>
              </div>
            </Table.Cell>
            <Table.Cell><span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${catTone[t.cat]}`}>{t.cat}</span></Table.Cell>
            <Table.Cell tw="text-fg-subtle">{t.date}</Table.Cell>
            <Table.Cell tw={`text-right font-medium tabular-nums ${t.amount >= 0 ? 'text-success-300' : 'text-fg'}`}>
              {t.amount >= 0 ? '+' : '−'}{money(Math.abs(t.amount))}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
