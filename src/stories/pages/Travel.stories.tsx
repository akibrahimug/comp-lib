import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Avatar } from '../../components/Avatar';
import { Input } from '../../components/Input';
import { Dialog } from '../../components/Dialog';
import { Popover } from '../../components/Popover';
import { Carousel } from '../../components/Carousel';
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
  title: 'Pages/Travel',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    options: { showPanel: false },
    docs: {
      description: {
        component:
          'Wander — a stays marketplace. Search & filter destinations, open a listing with a working photo Carousel and amenities, adjust nights & guests in a live booking widget, reserve through a price-breakdown dialog, and watch confirmed stays land in Trips. Runtime themeable.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

type Kind = 'Beach' | 'City' | 'Cabin' | 'Lakeside' | 'Desert';
type Stay = {
  id: string;
  title: string;
  place: string;
  kind: Kind;
  price: number;
  rating: number;
  reviews: number;
  guests: number;
  beds: number;
  baths: number;
  host: string;
  hostInit: string;
  grads: string[];
  superhost?: boolean;
};

const STAYS: Stay[] = [
  { id: 's1', title: 'Cliffside villa with infinity pool', place: 'Amalfi, Italy', kind: 'Beach', price: 412, rating: 4.95, reviews: 188, guests: 6, beds: 3, baths: 2, host: 'Sofia', hostInit: 'S', superhost: true, grads: ['from-sky-400/30 to-accent/25', 'from-accent2/30 to-sky-300/20', 'from-accent/25 to-accent2/30'] },
  { id: 's2', title: 'Loft above the old town', place: 'Lisbon, Portugal', kind: 'City', price: 168, rating: 4.82, reviews: 240, guests: 4, beds: 2, baths: 1, host: 'Tiago', hostInit: 'T', grads: ['from-accent/25 to-accent2/20', 'from-accent2/25 to-accent/15', 'from-accent/20 to-accent2/25'] },
  { id: 's3', title: 'A-frame cabin in the pines', place: 'Banff, Canada', kind: 'Cabin', price: 224, rating: 4.9, reviews: 132, guests: 5, beds: 2, baths: 1, host: 'Maya', hostInit: 'M', superhost: true, grads: ['from-emerald-400/30 to-accent/20', 'from-accent/20 to-emerald-300/25', 'from-accent2/20 to-emerald-400/25'] },
  { id: 's4', title: 'Glass house on the lake', place: 'Hallstatt, Austria', kind: 'Lakeside', price: 356, rating: 4.88, reviews: 96, guests: 4, beds: 2, baths: 2, host: 'Lena', hostInit: 'L', grads: ['from-cyan-400/30 to-accent/20', 'from-accent/25 to-cyan-300/20', 'from-accent2/25 to-cyan-400/20'] },
  { id: 's5', title: 'Desert dome under the stars', place: 'Joshua Tree, USA', kind: 'Desert', price: 198, rating: 4.79, reviews: 174, guests: 2, beds: 1, baths: 1, host: 'Dax', hostInit: 'D', grads: ['from-orange-400/30 to-accent2/25', 'from-accent2/30 to-orange-300/20', 'from-accent/20 to-orange-400/25'] },
  { id: 's6', title: 'Whitewashed cove cottage', place: 'Santorini, Greece', kind: 'Beach', price: 289, rating: 4.93, reviews: 312, guests: 4, beds: 2, baths: 1, host: 'Nikos', hostInit: 'N', superhost: true, grads: ['from-sky-400/30 to-accent/20', 'from-accent/20 to-sky-300/25', 'from-accent2/25 to-sky-400/20'] },
];

const KINDS: ('All' | Kind)[] = ['All', 'Beach', 'City', 'Cabin', 'Lakeside', 'Desert'];
const kindIcon: Record<Kind, string> = { Beach: 'globe', City: 'building', Cabin: 'home', Lakeside: 'globe', Desert: 'flame' };
const CLEANING = 45;
const SERVICE_PCT = 0.12;

type Trip = { stay: Stay; nights: number; guests: number };

export const Explore: Story = {
  render: () => {
    const App = () => {
      const [kind, setKind] = useState<'All' | Kind>('All');
      const [query, setQuery] = useState('');
      const [wish, setWish] = useState<Set<string>>(new Set(['s3']));
      const [open, setOpen] = useState<Stay | null>(null);
      const [view, setView] = useState<'explore' | 'trips'>('explore');

      // booking widget state (per open stay)
      const [nights, setNights] = useState(5);
      const [guests, setGuests] = useState(2);
      const [confirm, setConfirm] = useState(false);
      const [trips, setTrips] = useState<Trip[]>([{ stay: STAYS[5], nights: 4, guests: 2 }]);
      const [toast, setToast] = useState<string | null>(null);

      const openStay = (s: Stay) => { setOpen(s); setNights(5); setGuests(Math.min(2, s.guests)); };

      const filtered = useMemo(() => {
        let list = kind === 'All' ? STAYS : STAYS.filter((s) => s.kind === kind);
        const q = query.trim().toLowerCase();
        if (q) list = list.filter((s) => s.place.toLowerCase().includes(q) || s.title.toLowerCase().includes(q) || s.kind.toLowerCase().includes(q));
        return list;
      }, [kind, query]);

      const toggleWish = (id: string) => setWish((w) => { const n = new Set(w); n.has(id) ? n.delete(id) : n.add(id); return n; });

      const subtotal = open ? open.price * nights : 0;
      const service = Math.round(subtotal * SERVICE_PCT);
      const total = subtotal + CLEANING + service;

      const reserve = () => {
        if (!open) return;
        setTrips((t) => [{ stay: open, nights, guests }, ...t]);
        setConfirm(false);
        setToast(`Booked ${open.title} — ${nights} nights.`);
        setOpen(null);
        setView('trips');
        setTimeout(() => setToast(null), 4000);
      };

      return (
        <LuxeStage switcher={false}>
          {/* nav */}
          <header className="sticky top-0 z-30 border-b border-edge/10 bg-canvas/70 backdrop-blur-xl">
            <Container className="flex h-16 items-center justify-between gap-4">
              <button onClick={() => setView('explore')} className="inline-flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-sheen text-onaccent shadow-accent"><Icon name="pin" className="h-4 w-4" /></span>
                <span className="font-display text-[17px] font-semibold tracking-tight text-fg">Wander</span>
              </button>
              <nav className="hidden items-center gap-1 sm:flex">
                <button onClick={() => setView('explore')} className={`rounded-lg px-3 py-2 text-sm ${view === 'explore' ? 'bg-fg/[0.06] text-fg' : 'text-fg-muted hover:text-fg'}`}>Explore</button>
                <button onClick={() => setView('trips')} className={`rounded-lg px-3 py-2 text-sm ${view === 'trips' ? 'bg-fg/[0.06] text-fg' : 'text-fg-muted hover:text-fg'}`}>
                  Trips {trips.length > 0 && <span className="ml-1 rounded-full bg-accent/15 px-1.5 text-xs text-accent">{trips.length}</span>}
                </button>
              </nav>
              <div className="flex items-center gap-2">
                <ThemeSwitcher className="hidden lg:inline-flex" />
                <Avatar size="sm" tw="bg-accent text-onaccent text-xs font-semibold">JD</Avatar>
              </div>
            </Container>
          </header>

          {view === 'explore' && (
            <>
              {/* hero search */}
              <Container className="py-10">
                <div className="text-center">
                  <h1 className="font-display text-4xl font-light leading-tight text-fg sm:text-5xl">
                    Find your next <span className="italic text-accent-gradient">somewhere.</span>
                  </h1>
                  <p className="mt-3 text-fg-muted">Hand-picked homes in the world's most beautiful corners.</p>
                </div>
                <div className={`${surface.glass} mx-auto mt-8 flex max-w-2xl flex-col gap-2 p-2 sm:flex-row sm:items-center`}>
                  <div className="flex-1">
                    <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Where to? Try “Lisbon” or “cabin”…" tw={`${darkInput} border-0 bg-transparent`} prefix={<Icon name="search" className="h-4 w-4" />} />
                  </div>
                  <Button tw={accentBtn} onClick={() => { /* live filter already applied */ }}>
                    <Icon name="search" className="h-4 w-4" /> Search
                  </Button>
                </div>
              </Container>

              {/* filter chips */}
              <Container className="pb-2">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-luxe">
                  {KINDS.map((k) => (
                    <button key={k} onClick={() => setKind(k)} className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${kind === k ? 'border-accent bg-accent/15 text-fg' : 'border-edge/12 text-fg-muted hover:text-fg'}`}>
                      {k !== 'All' && <Icon name={kindIcon[k as Kind]} className="h-4 w-4" />} {k}
                    </button>
                  ))}
                </div>
              </Container>

              {/* grid */}
              <Container className="pb-20">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((s) => (
                    <button key={s.id} onClick={() => openStay(s)} className="group text-left">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                        <div className={`h-full w-full bg-gradient-to-br ${s.grads[0]} transition-transform duration-500 group-hover:scale-105`} />
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => { e.stopPropagation(); toggleWish(s.id); }}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); toggleWish(s.id); } }}
                          className={`absolute right-3 top-3 grid h-8 w-8 cursor-pointer place-items-center rounded-full backdrop-blur transition ${wish.has(s.id) ? 'bg-accent text-onaccent' : 'bg-canvas/50 text-fg-muted hover:text-fg'}`}
                        >
                          <Icon name="heart" className="h-4 w-4" />
                        </span>
                        {s.superhost && <span className="absolute left-3 top-3"><Badge tw="bg-canvas/80 text-fg border border-edge/10 backdrop-blur">Superhost</Badge></span>}
                      </div>
                      <div className="mt-3 flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-medium text-fg">{s.place}</p>
                          <p className="truncate text-sm text-fg-muted">{s.title}</p>
                        </div>
                        <span className="inline-flex shrink-0 items-center gap-1 text-sm text-fg"><Icon name="star" className="h-3.5 w-3.5 text-accent [&_path]:fill-accent" /> {s.rating}</span>
                      </div>
                      <p className="mt-1 text-sm text-fg"><span className="font-semibold">{money(s.price)}</span> <span className="text-fg-subtle">night</span></p>
                    </button>
                  ))}
                </div>
                {filtered.length === 0 && (
                  <div className="py-24 text-center">
                    <p className="text-fg-muted">No stays match “{query}”.</p>
                    <Button tw={`mt-4 ${ghostBtn}`} intent="ghost" onClick={() => { setQuery(''); setKind('All'); }}>Reset search</Button>
                  </div>
                )}
              </Container>
            </>
          )}

          {view === 'trips' && (
            <Container className="py-10">
              {toast && <Alert variant="success" title="Trip booked" onClose={() => setToast(null)} tw="mb-6 bg-success-500/10 text-success-200 border-success-500/25">{toast}</Alert>}
              <h1 className="font-display text-3xl font-light text-fg">Your trips</h1>
              <p className="mt-2 text-fg-muted">{trips.length} upcoming stay{trips.length === 1 ? '' : 's'}.</p>
              {trips.length === 0 ? (
                <div className="mt-10 text-center">
                  <Icon name="map" className="mx-auto h-12 w-12 text-fg-subtle/40" />
                  <p className="mt-4 text-fg-muted">No trips yet.</p>
                  <Button tw={`mt-4 ${accentBtn}`} onClick={() => setView('explore')}>Explore stays</Button>
                </div>
              ) : (
                <div className="mt-8 space-y-4">
                  {trips.map((t, i) => (
                    <div key={i} className={`${surface.card} flex flex-col gap-4 p-4 sm:flex-row sm:items-center`}>
                      <div className={`h-28 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br sm:w-44 ${t.stay.grads[0]}`} />
                      <div className="min-w-0 flex-1">
                        <Badge tw="bg-accent2/10 text-accent2 border border-accent2/30">{t.stay.kind}</Badge>
                        <h3 className="mt-2 font-display text-lg text-fg">{t.stay.place}</h3>
                        <p className="text-sm text-fg-muted">{t.stay.title}</p>
                        <div className="mt-2 flex flex-wrap gap-4 text-xs text-fg-subtle">
                          <span className="inline-flex items-center gap-1"><Icon name="calendar" className="h-3.5 w-3.5" /> {t.nights} nights</span>
                          <span className="inline-flex items-center gap-1"><Icon name="users" className="h-3.5 w-3.5" /> {t.guests} guests</span>
                          <span className="inline-flex items-center gap-1"><Icon name="pin" className="h-3.5 w-3.5" /> Hosted by {t.stay.host}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-lg text-fg">{money(t.stay.price * t.nights + CLEANING + Math.round(t.stay.price * t.nights * SERVICE_PCT))}</p>
                        <p className="text-xs text-fg-subtle">total paid</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Container>
          )}

          {/* STAY DETAIL */}
          <Dialog.Root open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
            <Dialog.Overlay />
            <Dialog.Content tw="max-w-3xl border border-edge/10 bg-panel p-0 text-fg">
              <Dialog.Close tw="z-20 bg-canvas/60 text-fg backdrop-blur hover:text-fg" />
              {open && (
                <div className="max-h-[85vh] overflow-y-auto scrollbar-luxe">
                  <Carousel showDots showArrows loop className="[&_button]:!bg-canvas/70 [&_button]:!text-fg">
                    {open.grads.map((g, i) => (
                      <div key={i} className={`aspect-[16/10] w-full bg-gradient-to-br ${g}`} />
                    ))}
                  </Carousel>

                  <div className="grid gap-6 p-6 sm:grid-cols-[1.5fr_1fr]">
                    <div>
                      <div className="flex items-center gap-2">
                        {open.superhost && <Badge tw="bg-accent/10 text-accent border border-accent/30">Superhost</Badge>}
                        <span className="inline-flex items-center gap-1 text-sm text-fg-muted"><Stars value={open.rating} /> {open.rating} · {open.reviews} reviews</span>
                      </div>
                      <Dialog.Title tw="mt-3 font-display text-2xl text-fg">{open.title}</Dialog.Title>
                      <p className="mt-1 inline-flex items-center gap-1.5 text-fg-muted"><Icon name="pin" className="h-4 w-4 text-accent" /> {open.place}</p>

                      <div className="mt-5 flex flex-wrap gap-4 border-y border-edge/10 py-4 text-sm text-fg-muted">
                        <span className="inline-flex items-center gap-1.5"><Icon name="users" className="h-4 w-4" /> {open.guests} guests</span>
                        <span className="inline-flex items-center gap-1.5"><Icon name="bed" className="h-4 w-4" /> {open.beds} bedrooms</span>
                        <span className="inline-flex items-center gap-1.5"><Icon name="home" className="h-4 w-4" /> {open.baths} baths</span>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                        Wake to uninterrupted views and slow mornings. This {open.kind.toLowerCase()} retreat pairs
                        natural materials with quiet luxury — the kind of place you don't want to leave.
                      </p>

                      <p className="mt-5 text-xs uppercase tracking-wider text-fg-subtle">What this place offers</p>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-fg-muted">
                        {['Wi-Fi', 'Self check-in', 'Kitchen', 'Free parking', 'Pool', 'Workspace'].map((a) => (
                          <span key={a} className="inline-flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-success-400" /> {a}</span>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center gap-3 rounded-xl border border-edge/10 bg-fg/[0.02] p-4">
                        <Avatar tw="bg-accent/15 text-accent font-semibold">{open.hostInit}</Avatar>
                        <div>
                          <p className="text-sm font-medium text-fg">Hosted by {open.host}</p>
                          <p className="text-xs text-fg-subtle">Responds within an hour</p>
                        </div>
                      </div>
                    </div>

                    {/* booking widget */}
                    <div className="sm:sticky sm:top-2 sm:self-start">
                      <div className={`${surface.card} p-5`}>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display text-2xl text-fg">{money(open.price)}</span>
                          <span className="text-sm text-fg-subtle">night</span>
                        </div>

                        <div className="mt-4 space-y-3">
                          <Stepper label="Nights" value={nights} min={1} max={30} onChange={setNights} icon="calendar" />
                          <Popover.Root>
                            <Popover.Trigger tw="w-full">
                              <span className="flex w-full items-center justify-between rounded-xl border border-edge/12 bg-fg/[0.03] px-3.5 py-2.5 text-sm text-fg-muted transition hover:border-edge/20">
                                <span className="inline-flex items-center gap-2"><Icon name="users" className="h-4 w-4" /> Guests</span>
                                <span className="text-fg">{guests}</span>
                              </span>
                            </Popover.Trigger>
                            <Popover.Content tw="w-72 border-edge/10 bg-panel/95 text-fg backdrop-blur-xl">
                              <Stepper label="Guests" value={guests} min={1} max={open.guests} onChange={setGuests} icon="users" />
                              <p className="mt-2 text-xs text-fg-subtle">This home allows up to {open.guests} guests.</p>
                            </Popover.Content>
                          </Popover.Root>
                        </div>

                        <div className="mt-5 space-y-2 text-sm">
                          <Row k={`${money(open.price)} × ${nights} nights`} v={money(subtotal)} />
                          <Row k="Cleaning fee" v={money(CLEANING)} />
                          <Row k="Service fee" v={money(service)} />
                          <div className="flex items-center justify-between border-t border-edge/10 pt-3 text-base">
                            <span className="font-medium text-fg">Total</span>
                            <span className="font-display text-fg">{money(total)}</span>
                          </div>
                        </div>

                        <Button fullWidth size="lg" tw={`mt-5 ${accentBtn}`} onClick={() => setConfirm(true)}>Reserve</Button>
                        <p className="mt-3 text-center text-xs text-fg-subtle">You won't be charged yet</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Dialog.Content>
          </Dialog.Root>

          {/* CONFIRM */}
          <Dialog.Root open={confirm} onOpenChange={setConfirm}>
            <Dialog.Overlay />
            <Dialog.Content tw="max-w-md border border-edge/10 bg-panel text-fg">
              <Dialog.Close tw="text-fg-subtle hover:text-fg" />
              <Dialog.Header>
                <Dialog.Title tw="text-fg">Confirm and pay</Dialog.Title>
                <Dialog.Description tw="text-fg-muted">{open?.title} · {open?.place}</Dialog.Description>
              </Dialog.Header>
              <div className="space-y-2 rounded-xl border border-edge/10 bg-fg/[0.02] p-4 text-sm">
                <Row k="Dates" v={`${nights} nights`} />
                <Row k="Guests" v={`${guests}`} />
                <div className="flex items-center justify-between border-t border-edge/10 pt-2 text-base">
                  <span className="font-medium text-fg">Total</span>
                  <span className="font-display text-fg">{money(total)}</span>
                </div>
              </div>
              <Dialog.Footer>
                <Button intent="ghost" tw={ghostBtn} onClick={() => setConfirm(false)}>Back</Button>
                <Button tw={accentBtn} onClick={reserve}><Icon name="check" className="h-4 w-4" /> Confirm & pay</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Root>
        </LuxeStage>
      );
    };
    return <App />;
  },
};

function Stepper({ label, value, min, max, onChange, icon }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void; icon: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-edge/12 bg-fg/[0.03] px-3.5 py-2">
      <span className="inline-flex items-center gap-2 text-sm text-fg-muted"><Icon name={icon} className="h-4 w-4" /> {label}</span>
      <span className="inline-flex items-center gap-2">
        <button onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Fewer ${label}`} className="grid h-7 w-7 place-items-center rounded-lg border border-edge/12 text-fg-muted transition hover:text-fg disabled:opacity-40"><Icon name="minus" className="h-3.5 w-3.5" /></button>
        <span className="w-6 text-center text-sm tabular-nums text-fg">{value}</span>
        <button onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`More ${label}`} className="grid h-7 w-7 place-items-center rounded-lg border border-edge/12 text-fg-muted transition hover:text-fg disabled:opacity-40"><Icon name="plus" className="h-3.5 w-3.5" /></button>
      </span>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between text-fg-muted">
      <span>{k}</span>
      <span className="tabular-nums text-fg">{v}</span>
    </div>
  );
}
