import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Input } from '../../components/Input';
import { Drawer } from '../../components/Drawer';
import { Dialog } from '../../components/Dialog';
import { DropdownMenu } from '../../components/DropdownMenu';
import { Alert } from '../../components/Alert';
import {
  LuxeStage,
  Container,
  Icon,
  ThemeSwitcher,
  surface,
  accentBtn,
  ghostBtn,
  darkInput,
  money,
  Stars,
} from './_kit';

const meta: Meta = {
  title: 'Pages/E-commerce',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    options: { showPanel: false },
    docs: {
      description: {
        component:
          'AURELIA — a working boutique storefront built entirely from the library. Filter by category, search live, favourite items, open a quick-view, manage a real cart (quantity & remove) in a Drawer, then run the full checkout to a confirmation. Runtime themeable from the top bar.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const menuContent = 'border-edge/10 bg-panel/95 text-fg backdrop-blur-xl';
const menuItem = 'text-fg-muted hover:bg-fg/5 hover:text-fg focus:bg-fg/5';

type Cat = 'New' | 'Women' | 'Men' | 'Accessories';
type Product = {
  id: string;
  name: string;
  cat: Cat;
  price: number;
  was?: number;
  rating: number;
  reviews: number;
  icon: string;
  from: string;
  to: string;
  tag?: string;
};

const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Cashmere Lounge Coat', cat: 'Women', price: 240, was: 320, rating: 4.8, reviews: 128, icon: 'shirt', from: 'from-accent/25', to: 'to-accent2/20', tag: 'Sale' },
  { id: 'p2', name: 'Tailored Wool Blazer', cat: 'Men', price: 189, rating: 4.6, reviews: 86, icon: 'shirt', from: 'from-accent2/25', to: 'to-accent/15' },
  { id: 'p3', name: 'Silk Slip Dress', cat: 'Women', price: 156, rating: 4.9, reviews: 211, icon: 'shirt', from: 'from-accent/20', to: 'to-accent2/25', tag: 'New' },
  { id: 'p4', name: 'Leather Weekender', cat: 'Accessories', price: 295, rating: 4.7, reviews: 64, icon: 'bag', from: 'from-accent2/20', to: 'to-accent/20' },
  { id: 'p5', name: 'Merino Crew Knit', cat: 'Men', price: 98, was: 128, rating: 4.5, reviews: 142, icon: 'shirt', from: 'from-accent/15', to: 'to-accent2/25', tag: 'Sale' },
  { id: 'p6', name: 'Structured Tote', cat: 'Accessories', price: 178, rating: 4.8, reviews: 97, icon: 'bag', from: 'from-accent2/25', to: 'to-accent/20', tag: 'New' },
  { id: 'p7', name: 'Pleated Midi Skirt', cat: 'Women', price: 132, rating: 4.4, reviews: 53, icon: 'shirt', from: 'from-accent/25', to: 'to-accent2/15' },
  { id: 'p8', name: 'Oxford Chukka Boots', cat: 'Men', price: 215, rating: 4.7, reviews: 119, icon: 'bag', from: 'from-accent2/20', to: 'to-accent/25' },
];

const CATS: ('All' | Cat)[] = ['All', 'New', 'Women', 'Men', 'Accessories'];
const SORTS = ['Featured', 'Price: low to high', 'Price: high to low', 'Top rated'] as const;
type Sort = (typeof SORTS)[number];
const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

type Line = { id: string; size: string; qty: number };

function Tile({ p, large }: { p: Product; large?: boolean }) {
  return (
    <div className={`relative grid place-items-center overflow-hidden bg-gradient-to-br ${p.from} ${p.to} ${large ? 'h-full min-h-56' : 'aspect-[4/5]'}`}>
      <div aria-hidden className="absolute inset-0 opacity-60 [background:radial-gradient(120%_80%_at_50%_-10%,theme(colors.canvas/0),theme(colors.canvas/0.5))]" />
      <Icon name={p.icon} className={`relative text-fg/30 ${large ? 'h-24 w-24' : 'h-14 w-14'}`} />
      {p.tag && (
        <span className="absolute left-3 top-3">
          <Badge tw={p.tag === 'Sale' ? 'bg-danger-500/90 text-white border-0' : 'bg-accent text-onaccent border-0'}>{p.tag}</Badge>
        </span>
      )}
    </div>
  );
}

export const Storefront: Story = {
  render: () => {
    const App = () => {
      const [cat, setCat] = useState<'All' | Cat>('All');
      const [query, setQuery] = useState('');
      const [sort, setSort] = useState<Sort>('Featured');
      const [wish, setWish] = useState<Set<string>>(new Set(['p3']));
      const [cart, setCart] = useState<Line[]>([{ id: 'p1', size: 'M', qty: 1 }]);
      const [cartOpen, setCartOpen] = useState(false);
      const [quick, setQuick] = useState<Product | null>(null);
      const [quickSize, setQuickSize] = useState('M');
      const [view, setView] = useState<'shop' | 'checkout' | 'done'>('shop');

      const byId = (id: string) => PRODUCTS.find((p) => p.id === id)!;

      const filtered = useMemo(() => {
        let list = PRODUCTS.filter((p) => (cat === 'All' ? true : cat === 'New' ? p.tag === 'New' : p.cat === cat));
        const q = query.trim().toLowerCase();
        if (q) list = list.filter((p) => p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q));
        const s = [...list];
        if (sort === 'Price: low to high') s.sort((a, b) => a.price - b.price);
        if (sort === 'Price: high to low') s.sort((a, b) => b.price - a.price);
        if (sort === 'Top rated') s.sort((a, b) => b.rating - a.rating);
        return s;
      }, [cat, query, sort]);

      const cartCount = cart.reduce((n, l) => n + l.qty, 0);
      const subtotal = cart.reduce((n, l) => n + byId(l.id).price * l.qty, 0);
      const shipping = subtotal > 250 || subtotal === 0 ? 0 : 12;
      const total = subtotal + shipping;

      const addToCart = (id: string, size = 'M') => {
        setCart((c) => {
          const i = c.findIndex((l) => l.id === id && l.size === size);
          if (i >= 0) {
            const next = [...c];
            next[i] = { ...next[i], qty: next[i].qty + 1 };
            return next;
          }
          return [...c, { id, size, qty: 1 }];
        });
        setCartOpen(true);
      };
      const setQty = (i: number, d: number) =>
        setCart((c) => c.map((l, idx) => (idx === i ? { ...l, qty: Math.max(1, l.qty + d) } : l)));
      const removeLine = (i: number) => setCart((c) => c.filter((_, idx) => idx !== i));
      const toggleWish = (id: string) =>
        setWish((w) => {
          const next = new Set(w);
          next.has(id) ? next.delete(id) : next.add(id);
          return next;
        });

      /* ─────────────────────────── checkout view ─────────────────────────── */
      if (view === 'done') {
        return (
          <LuxeStage className="grid place-items-center" switcher={false}>
            <Container className="py-20">
              <div className={`${surface.card} mx-auto max-w-lg p-10 text-center`}>
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success-500/15 text-success-300">
                  <Icon name="check" className="h-8 w-8" />
                </span>
                <h1 className="mt-6 font-display text-3xl font-light text-fg">Order confirmed</h1>
                <p className="mt-2 text-fg-muted">
                  Thank you — order <span className="font-mono text-fg">#AUR-4821</span> is on its way.
                  A receipt was sent to your email.
                </p>
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-fg-muted">
                  <Icon name="truck" className="h-4 w-4 text-accent" /> Arriving Tue–Thu · Free returns within 30 days
                </div>
                <Button
                  tw={`mt-8 ${accentBtn}`}
                  onClick={() => {
                    setCart([]);
                    setView('shop');
                  }}
                >
                  Continue shopping <Icon name="arrow" className="h-4 w-4" />
                </Button>
              </div>
            </Container>
          </LuxeStage>
        );
      }

      if (view === 'checkout') {
        return (
          <LuxeStage switcher={false}>
            <header className="sticky top-0 z-30 border-b border-edge/10 bg-canvas/70 backdrop-blur-xl">
              <Container className="flex h-16 items-center justify-between">
                <button onClick={() => setView('shop')} className="inline-flex items-center gap-2 text-sm text-fg-muted transition hover:text-fg">
                  <Icon name="arrow" className="h-4 w-4 rotate-180" /> Back to shop
                </button>
                <span className="font-display text-lg font-semibold tracking-tight text-fg">AURELIA</span>
                <div className="flex items-center gap-1.5 text-xs text-fg-subtle">
                  <Icon name="lock" className="h-3.5 w-3.5 text-success-400" /> Secure checkout
                </div>
              </Container>
            </header>
            <Container className="grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr]">
              <form
                className="space-y-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  setView('done');
                  window.scrollTo({ top: 0 });
                }}
              >
                <section>
                  <h2 className="font-display text-lg text-fg">Contact</h2>
                  <div className="mt-4 grid gap-4">
                    <Input type="email" required placeholder="Email address" tw={darkInput} prefix={<Icon name="mail" className="h-4 w-4" />} />
                  </div>
                </section>
                <section>
                  <h2 className="font-display text-lg text-fg">Shipping address</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <Input required placeholder="First name" tw={darkInput} />
                    <Input required placeholder="Last name" tw={darkInput} />
                    <Input required placeholder="Address" tw={`${darkInput} sm:col-span-2`} />
                    <Input required placeholder="City" tw={darkInput} />
                    <Input required placeholder="Postal code" tw={darkInput} />
                  </div>
                </section>
                <section>
                  <h2 className="font-display text-lg text-fg">Payment</h2>
                  <div className="mt-4 grid gap-4">
                    <Input required placeholder="Card number" tw={darkInput} prefix={<Icon name="creditcard" className="h-4 w-4" />} />
                    <div className="grid grid-cols-2 gap-4">
                      <Input required placeholder="MM / YY" tw={darkInput} />
                      <Input required placeholder="CVC" tw={darkInput} />
                    </div>
                  </div>
                </section>
                <Button type="submit" size="lg" fullWidth tw={accentBtn}>
                  Pay {money(total)} <Icon name="arrow" className="h-4 w-4" />
                </Button>
              </form>

              <aside className={`${surface.card} h-fit p-6`}>
                <h2 className="font-display text-base text-fg">Order summary</h2>
                <ul className="mt-5 space-y-4">
                  {cart.map((l, i) => {
                    const p = byId(l.id);
                    return (
                      <li key={`${l.id}-${l.size}`} className="flex items-center gap-3">
                        <div className="h-14 w-14 overflow-hidden rounded-lg"><Tile p={p} large /></div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-fg">{p.name}</p>
                          <p className="text-xs text-fg-subtle">Size {l.size} · Qty {l.qty}</p>
                        </div>
                        <span className="text-sm tabular-nums text-fg">{money(p.price * l.qty)}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-6 space-y-2 border-t border-edge/10 pt-5 text-sm">
                  <Row k="Subtotal" v={money(subtotal)} />
                  <Row k="Shipping" v={shipping === 0 ? 'Free' : money(shipping)} />
                  <div className="flex items-center justify-between border-t border-edge/10 pt-3 text-base">
                    <span className="font-medium text-fg">Total</span>
                    <span className="font-display text-fg">{money(total)}</span>
                  </div>
                </div>
              </aside>
            </Container>
          </LuxeStage>
        );
      }

      /* ───────────────────────────── shop view ───────────────────────────── */
      return (
        <LuxeStage switcher={false}>
          {/* announcement */}
          <div className="bg-accent/10 py-2 text-center text-xs text-fg-muted">
            Free shipping on orders over {money(250)} · Use code <span className="font-mono text-accent">AURELIA10</span> for 10% off
          </div>

          {/* nav */}
          <header className="sticky top-0 z-30 border-b border-edge/10 bg-canvas/70 backdrop-blur-xl">
            <Container className="flex h-16 items-center justify-between gap-4">
              <span className="font-display text-xl font-semibold tracking-tight text-fg">AURELIA</span>
              <nav className="hidden items-center gap-1 md:flex">
                {CATS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`rounded-lg px-3 py-2 text-sm transition-colors ${cat === c ? 'bg-fg/[0.06] text-fg' : 'text-fg-muted hover:text-fg'}`}
                  >
                    {c}
                  </button>
                ))}
              </nav>
              <div className="flex items-center gap-2">
                <div className="hidden sm:block sm:w-44 lg:w-56">
                  <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…" size="sm" tw={darkInput} prefix={<Icon name="search" className="h-4 w-4" />} />
                </div>
                <ThemeSwitcher className="hidden lg:inline-flex" />
                <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-edge/10 bg-fg/[0.03] text-fg-muted transition hover:text-fg" aria-label="Wishlist">
                  <Icon name="heart" className="h-4 w-4" />
                  {wish.size > 0 && <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-onaccent">{wish.size}</span>}
                </button>
                <button onClick={() => setCartOpen(true)} className="relative grid h-9 w-9 place-items-center rounded-lg border border-edge/10 bg-fg/[0.03] text-fg-muted transition hover:text-fg" aria-label="Cart">
                  <Icon name="bag" className="h-4 w-4" />
                  {cartCount > 0 && <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-onaccent">{cartCount}</span>}
                </button>
              </div>
            </Container>
            {/* mobile categories */}
            <div className="flex gap-1.5 overflow-x-auto px-4 pb-2 scrollbar-luxe md:hidden">
              {CATS.map((c) => (
                <button key={c} onClick={() => setCat(c)} className={`shrink-0 rounded-lg px-3 py-1.5 text-sm ${cat === c ? 'bg-accent/15 text-fg' : 'text-fg-muted'}`}>{c}</button>
              ))}
            </div>
          </header>

          {/* hero */}
          <Container className="py-10">
            <div className="relative overflow-hidden rounded-3xl border border-edge/10 bg-gradient-to-br from-accent/15 via-panel/40 to-accent2/15 p-8 sm:p-12">
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">The Atelier Edit · SS26</p>
              <h1 className="mt-4 max-w-xl font-display text-4xl font-light leading-tight text-fg sm:text-5xl">
                Quietly luxurious essentials, <span className="italic text-accent-gradient">made to last.</span>
              </h1>
              <p className="mt-4 max-w-md text-fg-muted">Considered fabrics, honest pricing, and a wardrobe that works as hard as you do.</p>
              <div className="mt-6 flex gap-3">
                <Button tw={accentBtn} onClick={() => setCat('New')}>Shop new in</Button>
                <Button intent="ghost" tw={ghostBtn} onClick={() => setCat('Women')}>Womenswear</Button>
              </div>
            </div>
          </Container>

          {/* toolbar + grid */}
          <Container className="pb-20">
            <div className="flex items-center justify-between gap-4 border-b border-edge/10 pb-4">
              <p className="text-sm text-fg-muted">
                <span className="font-medium text-fg">{filtered.length}</span> item{filtered.length === 1 ? '' : 's'}
                {cat !== 'All' && <> in <span className="text-fg">{cat}</span></>}
              </p>
              <DropdownMenu.Root align="end">
                <DropdownMenu.Trigger tw="inline-flex h-9 items-center gap-2 rounded-lg border border-edge/12 bg-fg/[0.04] px-3 text-sm text-fg-muted hover:text-fg">
                  <Icon name="sliders" className="h-4 w-4" /> {sort}
                </DropdownMenu.Trigger>
                <DropdownMenu.Content tw={menuContent}>
                  {SORTS.map((s) => (
                    <DropdownMenu.Item key={s} tw={menuItem} onClick={() => setSort(s)}>{s}</DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>

            {filtered.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-fg-muted">No pieces match “{query}”.</p>
                <Button tw={`mt-4 ${ghostBtn}`} intent="ghost" onClick={() => { setQuery(''); setCat('All'); }}>Clear filters</Button>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4">
                {filtered.map((p) => (
                  <div key={p.id} className={`${surface.card} group overflow-hidden p-0`}>
                    <div className="relative">
                      <Tile p={p} />
                      <button
                        onClick={() => toggleWish(p.id)}
                        aria-label="Save"
                        className={`absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full backdrop-blur transition ${wish.has(p.id) ? 'bg-accent text-onaccent' : 'bg-canvas/60 text-fg-muted hover:text-fg'}`}
                      >
                        <Icon name="heart" className="h-4 w-4" />
                      </button>
                      <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                        <Button fullWidth size="sm" tw={`${ghostBtn} bg-canvas/80 backdrop-blur`} intent="ghost" onClick={() => { setQuick(p); setQuickSize('M'); }}>
                          Quick view
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="truncate text-sm font-medium text-fg">{p.name}</h3>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <Stars value={p.rating} />
                        <span className="text-[11px] text-fg-subtle">({p.reviews})</span>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-base text-fg">{money(p.price)}</span>
                          {p.was && <span className="text-xs text-fg-subtle line-through">{money(p.was)}</span>}
                        </div>
                        <button onClick={() => addToCart(p.id)} aria-label="Add to cart" className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-onaccent transition hover:brightness-110">
                          <Icon name="plus" className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Container>

          {/* cart drawer */}
          <Drawer.Root open={cartOpen} onOpenChange={setCartOpen} position="right">
            <Drawer.Overlay tw="bg-canvas/60 backdrop-blur-sm" />
            <Drawer.Content tw="flex max-w-md flex-col border-l border-edge/10 bg-panel/95 p-0 text-fg backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-edge/10 p-5">
                <h2 className="font-display text-lg text-fg">Your bag <span className="text-fg-subtle">· {cartCount}</span></h2>
                <Drawer.Close tw="static text-fg-subtle hover:text-fg" />
              </div>

              {cart.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 p-10 text-center">
                  <Icon name="bag" className="h-12 w-12 text-fg-subtle/50" />
                  <p className="text-fg-muted">Your bag is empty.</p>
                  <Button tw={accentBtn} onClick={() => setCartOpen(false)}>Start shopping</Button>
                </div>
              ) : (
                <>
                  <div className="flex-1 space-y-4 overflow-y-auto p-5 scrollbar-luxe">
                    {cart.map((l, i) => {
                      const p = byId(l.id);
                      return (
                        <div key={`${l.id}-${l.size}`} className="flex gap-3">
                          <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl"><Tile p={p} large /></div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-fg">{p.name}</p>
                                <p className="text-xs text-fg-subtle">Size {l.size}</p>
                              </div>
                              <button onClick={() => removeLine(i)} aria-label="Remove" className="text-fg-subtle transition hover:text-danger-400">
                                <Icon name="trash" className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <div className="inline-flex items-center rounded-lg border border-edge/12">
                                <button onClick={() => setQty(i, -1)} aria-label="Decrease" className="grid h-7 w-7 place-items-center text-fg-muted hover:text-fg"><Icon name="minus" className="h-3.5 w-3.5" /></button>
                                <span className="w-7 text-center text-sm tabular-nums text-fg">{l.qty}</span>
                                <button onClick={() => setQty(i, 1)} aria-label="Increase" className="grid h-7 w-7 place-items-center text-fg-muted hover:text-fg"><Icon name="plus" className="h-3.5 w-3.5" /></button>
                              </div>
                              <span className="text-sm font-medium tabular-nums text-fg">{money(p.price * l.qty)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t border-edge/10 p-5">
                    {shipping > 0 && (
                      <p className="mb-3 text-xs text-fg-muted">
                        Add <span className="text-accent">{money(250 - subtotal)}</span> more for free shipping.
                      </p>
                    )}
                    <div className="space-y-2 text-sm">
                      <Row k="Subtotal" v={money(subtotal)} />
                      <Row k="Shipping" v={shipping === 0 ? 'Free' : money(shipping)} />
                      <div className="flex items-center justify-between pt-1 text-base">
                        <span className="font-medium text-fg">Total</span>
                        <span className="font-display text-fg">{money(total)}</span>
                      </div>
                    </div>
                    <Button fullWidth size="lg" tw={`mt-4 ${accentBtn}`} onClick={() => { setCartOpen(false); setView('checkout'); window.scrollTo({ top: 0 }); }}>
                      Checkout <Icon name="arrow" className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </Drawer.Content>
          </Drawer.Root>

          {/* quick view */}
          <Dialog.Root open={!!quick} onOpenChange={(o) => !o && setQuick(null)}>
            <Dialog.Overlay />
            <Dialog.Content tw="max-w-2xl border border-edge/10 bg-panel p-0 text-fg">
              <Dialog.Close tw="z-10 text-fg-subtle hover:text-fg" />
              {quick && (
                <div className="grid sm:grid-cols-2">
                  <div className="min-h-64"><Tile p={quick} large /></div>
                  <div className="p-6">
                    {quick.tag && <Badge tw="bg-accent/10 text-accent border border-accent/30">{quick.tag}</Badge>}
                    <Dialog.Title tw="mt-3 font-display text-2xl text-fg">{quick.name}</Dialog.Title>
                    <div className="mt-2 flex items-center gap-2">
                      <Stars value={quick.rating} />
                      <span className="text-xs text-fg-subtle">{quick.rating} · {quick.reviews} reviews</span>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="font-display text-2xl text-fg">{money(quick.price)}</span>
                      {quick.was && <span className="text-sm text-fg-subtle line-through">{money(quick.was)}</span>}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                      Cut from responsibly-sourced fabric with a relaxed, considered silhouette. Designed in-house, made to be worn for years.
                    </p>
                    <p className="mt-5 text-xs uppercase tracking-wider text-fg-subtle">Size</p>
                    <div className="mt-2 flex gap-2">
                      {SIZES.map((s) => (
                        <button
                          key={s}
                          onClick={() => setQuickSize(s)}
                          className={`grid h-9 min-w-9 place-items-center rounded-lg border px-2 text-sm transition ${quickSize === s ? 'border-accent bg-accent/15 text-fg' : 'border-edge/12 text-fg-muted hover:text-fg'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <Button fullWidth size="lg" tw={`mt-6 ${accentBtn}`} onClick={() => { addToCart(quick.id, quickSize); setQuick(null); }}>
                      <Icon name="bag" className="h-4 w-4" /> Add to bag · {money(quick.price)}
                    </Button>
                  </div>
                </div>
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
