import React, { useEffect, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Avatar } from '../../components/Avatar';
import { Checkbox } from '../../components/Checkbox';
import { Drawer } from '../../components/Drawer';
import { Dialog } from '../../components/Dialog';
import { Progress } from '../../components/Progress';
import { Tabs } from '../../components/Tabs';
import {
  LuxeStage,
  Container,
  Icon,
  ThemeSwitcher,
  surface,
  accentBtn,
  ghostBtn,
  money,
  Stars,
} from './_kit';

const meta: Meta = {
  title: 'Pages/Restaurant',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    options: { showPanel: false },
    docs: {
      description: {
        component:
          'Saffron — a food-ordering experience. Browse a menu by category (Tabs), customise dishes in a dialog (size choice + extras with quantity), build an order in the cart Drawer, then place it to a live, auto-advancing order tracker. Runtime themeable.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

type CatId = 'starters' | 'mains' | 'sides' | 'desserts' | 'drinks';
const CATEGORIES: { id: CatId; label: string; icon: string }[] = [
  { id: 'starters', label: 'Starters', icon: 'leaf' },
  { id: 'mains', label: 'Mains', icon: 'utensils' },
  { id: 'sides', label: 'Sides', icon: 'flame' },
  { id: 'desserts', label: 'Desserts', icon: 'star' },
  { id: 'drinks', label: 'Drinks', icon: 'coffee' },
];

type Item = {
  id: string;
  cat: CatId;
  name: string;
  desc: string;
  price: number;
  grad: string;
  veg?: boolean;
  spicy?: boolean;
  popular?: boolean;
  customizable?: boolean;
};

const MENU: Item[] = [
  { id: 'm1', cat: 'starters', name: 'Charred Padrón Peppers', desc: 'Sea salt, smoked aioli', price: 9, grad: 'from-emerald-400/25 to-accent/20', veg: true },
  { id: 'm2', cat: 'starters', name: 'Tuna Crudo', desc: 'Yuzu, avocado, crispy shallot', price: 14, grad: 'from-accent/20 to-accent2/25', popular: true },
  { id: 'm3', cat: 'mains', name: 'Saffron Risotto', desc: 'Parmesan, aged butter, herbs', price: 22, grad: 'from-gold-500/25 to-accent/20', veg: true, customizable: true, popular: true },
  { id: 'm4', cat: 'mains', name: 'Harissa Roast Chicken', desc: 'Charred lemon, toum, flatbread', price: 26, grad: 'from-orange-400/25 to-accent2/20', spicy: true, customizable: true },
  { id: 'm5', cat: 'mains', name: 'Wild Mushroom Pappardelle', desc: 'Truffle, pecorino, thyme', price: 24, grad: 'from-accent2/25 to-accent/15', veg: true, customizable: true },
  { id: 'm6', cat: 'sides', name: 'Truffle Fries', desc: 'Parmesan, parsley', price: 8, grad: 'from-gold-500/20 to-accent/15', veg: true },
  { id: 'm7', cat: 'sides', name: 'Charred Broccolini', desc: 'Chili, garlic, lemon', price: 9, grad: 'from-emerald-400/25 to-accent2/15', veg: true, spicy: true },
  { id: 'm8', cat: 'desserts', name: 'Pistachio Basque Cheesecake', desc: 'Burnt top, sea salt', price: 12, grad: 'from-accent/20 to-gold-500/25', veg: true, popular: true },
  { id: 'm9', cat: 'desserts', name: 'Dark Chocolate Fondant', desc: 'Salted caramel, vanilla gelato', price: 13, grad: 'from-accent2/30 to-accent/15', veg: true },
  { id: 'm10', cat: 'drinks', name: 'Saffron Spritz', desc: 'Aperol, prosecco, citrus', price: 14, grad: 'from-orange-400/25 to-accent/20' },
  { id: 'm11', cat: 'drinks', name: 'Cold Brew Tonic', desc: 'Single-origin, orange peel', price: 7, grad: 'from-accent/20 to-accent2/20', veg: true },
];

const SIZES = [
  { id: 'reg', label: 'Regular', add: 0 },
  { id: 'lg', label: 'Large', add: 4 },
  { id: 'sharing', label: 'Sharing', add: 9 },
];
const EXTRAS = [
  { id: 'cheese', label: 'Extra parmesan', add: 2 },
  { id: 'truffle', label: 'Shaved truffle', add: 6 },
  { id: 'egg', label: 'Soft egg', add: 2.5 },
  { id: 'bread', label: 'Sourdough', add: 3 },
];

type Line = { uid: string; item: Item; qty: number; size: string; extras: string[]; unit: number };

const STAGES = ['Order received', 'In the kitchen', 'Out for delivery', 'Delivered'] as const;

export const Order: Story = {
  render: () => {
    const App = () => {
      const [cat, setCat] = useState<CatId>('mains');
      const [cart, setCart] = useState<Line[]>([]);
      const [cartOpen, setCartOpen] = useState(false);
      const [customize, setCustomize] = useState<Item | null>(null);
      const [size, setSize] = useState('reg');
      const [extras, setExtras] = useState<string[]>([]);
      const [qty, setQty] = useState(1);
      const [tracking, setTracking] = useState(false);
      const [stage, setStage] = useState(0);

      // live order tracker — advances every 2.6s
      useEffect(() => {
        if (!tracking) return;
        if (stage >= STAGES.length - 1) return;
        const t = setTimeout(() => setStage((s) => Math.min(STAGES.length - 1, s + 1)), 2600);
        return () => clearTimeout(t);
      }, [tracking, stage]);

      const openCustomize = (item: Item) => { setCustomize(item); setSize('reg'); setExtras([]); setQty(1); };

      const unitPrice = (item: Item, sizeId: string, extraIds: string[]) =>
        item.price + (SIZES.find((s) => s.id === sizeId)?.add ?? 0) + extraIds.reduce((n, e) => n + (EXTRAS.find((x) => x.id === e)?.add ?? 0), 0);

      const addSimple = (item: Item) =>
        setCart((c) => {
          const uid = `${item.id}-reg-`;
          const i = c.findIndex((l) => l.uid === uid);
          if (i >= 0) { const next = [...c]; next[i] = { ...next[i], qty: next[i].qty + 1 }; return next; }
          return [...c, { uid, item, qty: 1, size: 'reg', extras: [], unit: item.price }];
        });

      const addCustom = () => {
        if (!customize) return;
        const uid = `${customize.id}-${size}-${[...extras].sort().join(',')}`;
        const unit = unitPrice(customize, size, extras);
        setCart((c) => {
          const i = c.findIndex((l) => l.uid === uid);
          if (i >= 0) { const next = [...c]; next[i] = { ...next[i], qty: next[i].qty + qty }; return next; }
          return [...c, { uid, item: customize, qty, size, extras: [...extras], unit }];
        });
        setCustomize(null);
        setCartOpen(true);
      };

      const setLineQty = (uid: string, d: number) =>
        setCart((c) => c.flatMap((l) => (l.uid === uid ? (l.qty + d <= 0 ? [] : [{ ...l, qty: l.qty + d }]) : [l])));

      const count = cart.reduce((n, l) => n + l.qty, 0);
      const subtotal = cart.reduce((n, l) => n + l.unit * l.qty, 0);
      const delivery = subtotal > 0 ? 3.5 : 0;
      const total = subtotal + delivery;

      const lineLabel = (l: Line) => {
        const parts: string[] = [];
        const sz = SIZES.find((s) => s.id === l.size);
        if (sz && sz.add > 0) parts.push(sz.label);
        l.extras.forEach((e) => { const x = EXTRAS.find((y) => y.id === e); if (x) parts.push(x.label); });
        return parts.join(' · ');
      };

      const placeOrder = () => { setCartOpen(false); setTracking(true); setStage(0); };

      const items = useMemo(() => MENU.filter((m) => m.cat === cat), [cat]);

      /* ───────────────────────── order tracking view ─────────────────────── */
      if (tracking) {
        const pct = (stage / (STAGES.length - 1)) * 100;
        const stageIcon = ['check', 'flame', 'truck', 'home'];
        return (
          <LuxeStage switcher={false}>
            <header className="border-b border-edge/10 bg-canvas/70 backdrop-blur-xl">
              <Container className="flex h-16 items-center justify-between">
                <span className="font-display text-lg font-semibold tracking-tight text-fg">Saffron</span>
                <ThemeSwitcher className="hidden sm:inline-flex" />
              </Container>
            </header>
            <Container className="py-12">
              <div className="mx-auto max-w-lg">
                <div className="text-center">
                  <Badge tw="bg-accent/10 text-accent border border-accent/30">Order #SF-2207</Badge>
                  <h1 className="mt-4 font-display text-3xl font-light text-fg">
                    {stage < STAGES.length - 1 ? 'Your order is on its way' : 'Delivered — enjoy!'}
                  </h1>
                  <p className="mt-2 text-fg-muted">
                    {stage < STAGES.length - 1 ? <>Estimated arrival <span className="text-fg">7:42 PM</span> · 18 min</> : 'Thanks for ordering with Saffron.'}
                  </p>
                </div>

                <div className={`${surface.card} mt-8 p-6`}>
                  <Progress value={pct} variant="brand" tw="[&>div>div]:bg-accent" />
                  <ol className="mt-6 space-y-4">
                    {STAGES.map((s, i) => {
                      const done = i < stage;
                      const active = i === stage;
                      return (
                        <li key={s} className="flex items-center gap-4">
                          <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition ${done ? 'border-success-500/40 bg-success-500/15 text-success-300' : active ? 'border-accent/50 bg-accent/15 text-accent' : 'border-edge/12 bg-fg/[0.02] text-fg-subtle'}`}>
                            <Icon name={done ? 'check' : stageIcon[i]} className="h-4 w-4" />
                          </span>
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${active || done ? 'text-fg' : 'text-fg-subtle'}`}>{s}</p>
                            {active && <p className="text-xs text-accent">In progress…</p>}
                          </div>
                          {active && stage < STAGES.length - 1 && <span className="h-2 w-2 animate-glow-pulse rounded-full bg-accent" />}
                        </li>
                      );
                    })}
                  </ol>
                </div>

                <div className={`${surface.card} mt-5 flex items-center gap-4 p-5`}>
                  <Avatar size="lg" tw="bg-accent/15 text-accent font-semibold">RM</Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-fg">Rosa M. · your courier</p>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-fg-muted"><Stars value={5} /> 4.9 · 1,204 deliveries</div>
                  </div>
                  <button className="grid h-10 w-10 place-items-center rounded-full border border-edge/12 text-fg-muted transition hover:text-fg" aria-label="Call courier"><Icon name="phone" className="h-4 w-4" /></button>
                </div>

                <Button fullWidth intent="ghost" tw={`mt-6 ${ghostBtn}`} onClick={() => { setTracking(false); setCart([]); setStage(0); }}>
                  Back to menu
                </Button>
              </div>
            </Container>
          </LuxeStage>
        );
      }

      /* ─────────────────────────────── menu view ─────────────────────────── */
      return (
        <LuxeStage switcher={false}>
          {/* nav */}
          <header className="sticky top-0 z-30 border-b border-edge/10 bg-canvas/70 backdrop-blur-xl">
            <Container className="flex h-16 items-center justify-between gap-4">
              <span className="font-display text-xl font-semibold tracking-tight text-fg">Saffron</span>
              <div className="flex items-center gap-2">
                <ThemeSwitcher className="hidden lg:inline-flex" />
                <button onClick={() => setCartOpen(true)} className="relative inline-flex h-9 items-center gap-2 rounded-lg border border-edge/10 bg-fg/[0.03] px-3 text-sm text-fg-muted transition hover:text-fg">
                  <Icon name="bag" className="h-4 w-4" /> Cart
                  {count > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-onaccent">{count}</span>}
                </button>
              </div>
            </Container>
          </header>

          {/* restaurant hero */}
          <Container className="py-8">
            <div className="relative overflow-hidden rounded-3xl border border-edge/10 bg-gradient-to-br from-accent/15 via-panel/40 to-accent2/15 p-8">
              <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
              <div className="relative flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h1 className="font-display text-4xl font-light text-fg">Saffron</h1>
                  <p className="mt-2 text-fg-muted">Modern Mediterranean · small plates & wood-fired mains</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                    <span className="inline-flex items-center gap-1.5 text-fg"><Stars value={4.8} /> 4.8 <span className="text-fg-subtle">(2.1k)</span></span>
                    <span className="text-fg-subtle">·</span>
                    <span className="inline-flex items-center gap-1.5 text-fg-muted"><Icon name="clock" className="h-4 w-4" /> 25–35 min</span>
                    <span className="text-fg-subtle">·</span>
                    <span className="inline-flex items-center gap-1.5 text-fg-muted"><Icon name="truck" className="h-4 w-4" /> {money(3.5)} delivery</span>
                  </div>
                </div>
                <Badge tw="bg-success-500/15 text-success-200 border border-success-500/30"><span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-success-400" /> Open now</Badge>
              </div>
            </div>
          </Container>

          {/* menu tabs */}
          <Container className="pb-28">
            <Tabs.Root value={cat} onValueChange={(v) => setCat(v as CatId)}>
              <Tabs.TabList tw="sticky top-16 z-20 gap-1 overflow-x-auto border-edge/10 bg-canvas/70 py-1 backdrop-blur-xl scrollbar-luxe">
                {CATEGORIES.map((c) => (
                  <Tabs.Tab
                    key={c.id}
                    value={c.id}
                    tw="shrink-0 gap-2 rounded-lg border-b-2 border-transparent px-4 text-fg-muted hover:text-fg aria-selected:border-accent aria-selected:text-fg"
                  >
                    <span className="inline-flex items-center gap-2"><Icon name={c.icon} className="h-4 w-4" /> {c.label}</span>
                  </Tabs.Tab>
                ))}
              </Tabs.TabList>

              <Tabs.TabPanels tw="mt-6">
                {CATEGORIES.map((c) => (
                  <Tabs.TabPanel key={c.id} value={c.id}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {items.filter((m) => m.cat === c.id).map((m) => (
                        <div key={m.id} className={`${surface.card} flex gap-4 p-4`}>
                          <div className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br ${m.grad}`}>
                            {m.popular && <span className="absolute left-1.5 top-1.5"><Badge tw="bg-canvas/80 text-fg border-0 text-[10px] backdrop-blur">★ Popular</Badge></span>}
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-medium text-fg">{m.name}</h3>
                              <span className="shrink-0 font-display text-fg">{money(m.price)}</span>
                            </div>
                            <p className="mt-1 line-clamp-2 text-sm text-fg-muted">{m.desc}</p>
                            <div className="mt-auto flex items-center justify-between pt-3">
                              <div className="flex gap-1.5">
                                {m.veg && <span title="Vegetarian" className="grid h-5 w-5 place-items-center rounded-full bg-success-500/15 text-success-300"><Icon name="leaf" className="h-3 w-3" /></span>}
                                {m.spicy && <span title="Spicy" className="grid h-5 w-5 place-items-center rounded-full bg-danger-500/15 text-danger-300"><Icon name="flame" className="h-3 w-3" /></span>}
                              </div>
                              <Button size="sm" tw={accentBtn} onClick={() => (m.customizable ? openCustomize(m) : addSimple(m))}>
                                <Icon name="plus" className="h-4 w-4" /> {m.customizable ? 'Customize' : 'Add'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tabs.TabPanel>
                ))}
              </Tabs.TabPanels>
            </Tabs.Root>
          </Container>

          {/* floating cart bar */}
          {count > 0 && (
            <div className="fixed inset-x-0 bottom-0 z-40 border-t border-edge/10 bg-panel/90 backdrop-blur-xl">
              <Container className="flex h-16 items-center justify-between">
                <span className="text-sm text-fg-muted"><span className="font-medium text-fg">{count}</span> item{count === 1 ? '' : 's'} · <span className="font-medium text-fg">{money(total)}</span></span>
                <Button tw={accentBtn} onClick={() => setCartOpen(true)}>View cart <Icon name="arrow" className="h-4 w-4" /></Button>
              </Container>
            </div>
          )}

          {/* cart drawer */}
          <Drawer.Root open={cartOpen} onOpenChange={setCartOpen} position="right">
            <Drawer.Overlay tw="bg-canvas/60 backdrop-blur-sm" />
            <Drawer.Content tw="flex max-w-md flex-col border-l border-edge/10 bg-panel/95 p-0 text-fg backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-edge/10 p-5">
                <h2 className="font-display text-lg text-fg">Your order</h2>
                <Drawer.Close tw="static text-fg-subtle hover:text-fg" />
              </div>

              {cart.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 p-10 text-center">
                  <Icon name="utensils" className="h-12 w-12 text-fg-subtle/50" />
                  <p className="text-fg-muted">Your cart is empty.</p>
                  <Button tw={accentBtn} onClick={() => setCartOpen(false)}>Browse the menu</Button>
                </div>
              ) : (
                <>
                  <div className="flex-1 space-y-3 overflow-y-auto p-5 scrollbar-luxe">
                    {cart.map((l) => (
                      <div key={l.uid} className="flex gap-3 rounded-xl border border-edge/10 bg-fg/[0.02] p-3">
                        <div className={`h-16 w-16 shrink-0 rounded-lg bg-gradient-to-br ${l.item.grad}`} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="truncate text-sm font-medium text-fg">{l.item.name}</p>
                            <span className="shrink-0 text-sm tabular-nums text-fg">{money(l.unit * l.qty)}</span>
                          </div>
                          {lineLabel(l) && <p className="mt-0.5 line-clamp-1 text-xs text-fg-subtle">{lineLabel(l)}</p>}
                          <div className="mt-2 inline-flex items-center rounded-lg border border-edge/12">
                            <button onClick={() => setLineQty(l.uid, -1)} aria-label="Decrease" className="grid h-7 w-7 place-items-center text-fg-muted hover:text-fg"><Icon name="minus" className="h-3.5 w-3.5" /></button>
                            <span className="w-7 text-center text-sm tabular-nums text-fg">{l.qty}</span>
                            <button onClick={() => setLineQty(l.uid, 1)} aria-label="Increase" className="grid h-7 w-7 place-items-center text-fg-muted hover:text-fg"><Icon name="plus" className="h-3.5 w-3.5" /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-edge/10 p-5">
                    <div className="space-y-2 text-sm">
                      <Row k="Subtotal" v={money(subtotal)} />
                      <Row k="Delivery" v={money(delivery)} />
                      <div className="flex items-center justify-between pt-1 text-base">
                        <span className="font-medium text-fg">Total</span>
                        <span className="font-display text-fg">{money(total)}</span>
                      </div>
                    </div>
                    <Button fullWidth size="lg" tw={`mt-4 ${accentBtn}`} onClick={placeOrder}>
                      Place order · {money(total)}
                    </Button>
                  </div>
                </>
              )}
            </Drawer.Content>
          </Drawer.Root>

          {/* customize dialog */}
          <Dialog.Root open={!!customize} onOpenChange={(o) => !o && setCustomize(null)}>
            <Dialog.Overlay />
            <Dialog.Content tw="max-w-md border border-edge/10 bg-panel p-0 text-fg">
              <Dialog.Close tw="z-10 bg-canvas/50 text-fg backdrop-blur hover:text-fg" />
              {customize && (
                <>
                  <div className={`h-32 w-full bg-gradient-to-br ${customize.grad}`} />
                  <div className="p-6">
                    <Dialog.Title tw="font-display text-xl text-fg">{customize.name}</Dialog.Title>
                    <p className="mt-1 text-sm text-fg-muted">{customize.desc}</p>

                    <p className="mt-5 text-xs uppercase tracking-wider text-fg-subtle">Portion</p>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {SIZES.map((s) => (
                        <button key={s.id} onClick={() => setSize(s.id)} className={`rounded-xl border px-2 py-2.5 text-center transition ${size === s.id ? 'border-accent bg-accent/15 text-fg' : 'border-edge/12 text-fg-muted hover:text-fg'}`}>
                          <span className="block text-sm">{s.label}</span>
                          <span className="block text-[11px] text-fg-subtle">{s.add === 0 ? 'included' : `+${money(s.add)}`}</span>
                        </button>
                      ))}
                    </div>

                    <p className="mt-5 text-xs uppercase tracking-wider text-fg-subtle">Add extras</p>
                    <div className="mt-2 space-y-1.5">
                      {EXTRAS.map((x) => {
                        const checked = extras.includes(x.id);
                        return (
                          <label key={x.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 transition ${checked ? 'border-accent/40 bg-accent/[0.06]' : 'border-edge/10 hover:border-edge/20'}`}>
                            <Checkbox checked={checked} onChange={() => setExtras((e) => (checked ? e.filter((i) => i !== x.id) : [...e, x.id]))} />
                            <span className="flex-1 text-sm text-fg">{x.label}</span>
                            <span className="text-sm text-fg-subtle">+{money(x.add)}</span>
                          </label>
                        );
                      })}
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-xl border border-edge/12">
                        <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease" className="grid h-9 w-9 place-items-center text-fg-muted hover:text-fg"><Icon name="minus" className="h-4 w-4" /></button>
                        <span className="w-8 text-center text-sm tabular-nums text-fg">{qty}</span>
                        <button onClick={() => setQty((q) => q + 1)} aria-label="Increase" className="grid h-9 w-9 place-items-center text-fg-muted hover:text-fg"><Icon name="plus" className="h-4 w-4" /></button>
                      </div>
                      <Button tw={accentBtn} onClick={addCustom}>
                        Add · {money(unitPrice(customize, size, extras) * qty)}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Dialog.Content>
          </Dialog.Root>
        </LuxeStage>
      );
    };
    return <App />;
  },
};

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between text-fg-muted">
      <span>{k}</span>
      <span className="tabular-nums text-fg">{v}</span>
    </div>
  );
}
