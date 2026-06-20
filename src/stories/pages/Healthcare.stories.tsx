import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Avatar } from '../../components/Avatar';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Progress } from '../../components/Progress';
import { Dialog } from '../../components/Dialog';
import { Alert } from '../../components/Alert';
import { Accordion } from '../../components/Accordion';
import { DropdownMenu } from '../../components/DropdownMenu';
import {
  LuxeStage,
  Icon,
  ThemeSwitcher,
  surface,
  accentBtn,
  ghostBtn,
  darkInput,
} from './_kit';

const meta: Meta = {
  title: 'Pages/Healthcare',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    options: { showPanel: false },
    docs: {
      description: {
        component:
          'Meridian Health — a patient portal. Routes between an overview with live vitals, a searchable doctor directory, a 3-step appointment booking flow (pick a clinician → date & time → reason & confirm) that writes back to your upcoming visits, and an expandable medical-records view. Runtime themeable.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const menuContent = 'border-edge/10 bg-panel/95 text-fg backdrop-blur-xl';
const menuItem = 'text-fg-muted hover:bg-fg/5 hover:text-fg focus:bg-fg/5';

type View = 'overview' | 'doctors' | 'records';

const NAV: { id: View; i: string; l: string }[] = [
  { id: 'overview', i: 'dashboard', l: 'Overview' },
  { id: 'doctors', i: 'users', l: 'Find care' },
  { id: 'records', i: 'file', l: 'Records' },
];

type Doctor = { id: string; name: string; spec: string; rating: number; init: string; next: string };
const DOCTORS: Doctor[] = [
  { id: 'd1', name: 'Dr. Maya Okonkwo', spec: 'Cardiology', rating: 4.9, init: 'MO', next: 'Tomorrow' },
  { id: 'd2', name: 'Dr. Elias Bauer', spec: 'Dermatology', rating: 4.7, init: 'EB', next: 'Thu' },
  { id: 'd3', name: 'Dr. Priya Nair', spec: 'General practice', rating: 4.8, init: 'PN', next: 'Today' },
  { id: 'd4', name: 'Dr. Tomas Lindgren', spec: 'Orthopaedics', rating: 4.6, init: 'TL', next: 'Mon' },
  { id: 'd5', name: 'Dr. Hana Sato', spec: 'Pediatrics', rating: 4.9, init: 'HS', next: 'Wed' },
  { id: 'd6', name: 'Dr. Omar Haddad', spec: 'Neurology', rating: 4.5, init: 'OH', next: 'Fri' },
];
const SPECS = ['All', 'Cardiology', 'Dermatology', 'General practice', 'Orthopaedics', 'Pediatrics', 'Neurology'];

const VITALS = [
  { l: 'Heart rate', v: '68', u: 'bpm', i: 'activity', pct: 62, variant: 'success' as const },
  { l: 'Blood pressure', v: '118/76', u: 'mmHg', i: 'gauge', pct: 54, variant: 'success' as const },
  { l: 'Steps today', v: '7,840', u: '/ 10k', i: 'zap', pct: 78, variant: 'brand' as const },
  { l: 'Sleep', v: '6h 52m', u: 'last night', i: 'clock', pct: 70, variant: 'gold' as const },
];

const MEDS = [
  { name: 'Atorvastatin 10mg', when: 'Once daily · evening', next: '9:00 PM', tone: 'accent' },
  { name: 'Vitamin D3 2000IU', when: 'Once daily · morning', next: 'Taken', tone: 'success' },
  { name: 'Metformin 500mg', when: 'Twice daily · meals', next: '1:00 PM', tone: 'accent2' },
];
const toneDot: Record<string, string> = { accent: 'bg-accent', accent2: 'bg-accent2', success: 'bg-success-400' };

const RECORDS = [
  { t: 'Annual physical exam', dr: 'Dr. Priya Nair', date: 'Mar 14, 2026', body: 'All systems within normal range. BMI 23.1. Recommended continued exercise and follow-up bloodwork in 12 months.', tags: ['Wellness'] },
  { t: 'Lipid panel — results', dr: 'Lab · Meridian', date: 'Mar 14, 2026', body: 'Total cholesterol 184 mg/dL, HDL 58, LDL 104, Triglycerides 110. Continue current statin dose.', tags: ['Lab', 'Normal'] },
  { t: 'Cardiology consult', dr: 'Dr. Maya Okonkwo', date: 'Jan 8, 2026', body: 'ECG normal sinus rhythm. No structural concerns on echo. Routine annual follow-up advised.', tags: ['Cardiology'] },
  { t: 'Dermatology — skin check', dr: 'Dr. Elias Bauer', date: 'Nov 2, 2025', body: 'Full-body mole mapping complete. One benign nevus photographed for monitoring. No biopsy required.', tags: ['Dermatology'] },
];

const DAYS = [
  { d: 'Mon', n: '16' }, { d: 'Tue', n: '17' }, { d: 'Wed', n: '18' },
  { d: 'Thu', n: '19' }, { d: 'Fri', n: '20' }, { d: 'Sat', n: '21' },
];
const SLOTS = ['9:00', '9:30', '10:15', '11:00', '13:30', '14:00', '15:45', '16:30'];

type Appt = { dr: Doctor; day: string; time: string };

export const Portal: Story = {
  render: () => {
    const App = () => {
      const [view, setView] = useState<View>('overview');
      const [spec, setSpec] = useState('All');
      const [query, setQuery] = useState('');
      const [appts, setAppts] = useState<Appt[]>([{ dr: DOCTORS[0], day: 'Tue 17', time: '10:15' }]);

      // booking flow
      const [booking, setBooking] = useState<Doctor | null>(null);
      const [step, setStep] = useState(1);
      const [day, setDay] = useState<string | null>(null);
      const [time, setTime] = useState<string | null>(null);
      const [reason, setReason] = useState('');
      const [toast, setToast] = useState<string | null>(null);

      const openBooking = (dr: Doctor) => { setBooking(dr); setStep(1); setDay(null); setTime(null); setReason(''); };
      const confirm = () => {
        if (!booking || !day || !time) return;
        setAppts((a) => [{ dr: booking, day, time }, ...a]);
        setBooking(null);
        setToast(`Appointment booked with ${booking.name}.`);
        setView('overview');
        setTimeout(() => setToast(null), 4000);
      };

      const doctors = useMemo(() => {
        let list = spec === 'All' ? DOCTORS : DOCTORS.filter((d) => d.spec === spec);
        const q = query.trim().toLowerCase();
        if (q) list = list.filter((d) => d.name.toLowerCase().includes(q) || d.spec.toLowerCase().includes(q));
        return list;
      }, [spec, query]);

      return (
        <LuxeStage className="flex" switcher={false}>
          {/* sidebar */}
          <aside className="hidden w-60 shrink-0 flex-col border-r border-edge/10 bg-canvas/50 lg:flex">
            <div className="flex h-16 items-center gap-2.5 border-b border-edge/10 px-6">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-sheen text-onaccent shadow-accent"><Icon name="activity" className="h-4 w-4" /></span>
              <span className="font-display text-[17px] font-semibold tracking-tight text-fg">Meridian</span>
            </div>
            <nav className="flex-1 space-y-1 p-3">
              {NAV.map((n) => {
                const active = n.id === view;
                return (
                  <button key={n.id} onClick={() => setView(n.id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${active ? 'border border-accent/40 bg-accent/10 text-fg' : 'text-fg-muted hover:bg-fg/5 hover:text-fg'}`}>
                    <Icon name={n.i} className="h-[18px] w-[18px]" />
                    {n.l}
                    {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />}
                  </button>
                );
              })}
            </nav>
            <div className="m-3 rounded-2xl border border-edge/10 bg-accent/[0.06] p-4">
              <p className="flex items-center gap-2 text-sm font-medium text-fg"><Icon name="phone" className="h-4 w-4 text-accent" /> 24/7 nurse line</p>
              <p className="mt-1 text-xs text-fg-muted">Speak to a registered nurse anytime.</p>
              <Button size="sm" fullWidth tw={`mt-3 ${ghostBtn}`} intent="ghost">Call now</Button>
            </div>
          </aside>

          {/* main */}
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="flex h-16 items-center justify-between gap-3 border-b border-edge/10 bg-canvas/50 px-4 backdrop-blur-xl sm:px-6">
              <div className="min-w-0">
                <h1 className="truncate font-display text-base text-fg sm:text-lg">{NAV.find((n) => n.id === view)!.l}</h1>
                <p className="font-mono text-[11px] text-fg-subtle">Good morning, Jordan</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-2.5">
                <ThemeSwitcher className="hidden sm:inline-flex" />
                <Button size="sm" tw={accentBtn} onClick={() => openBooking(DOCTORS[2])}><Icon name="plus" className="h-4 w-4" /> Book</Button>
                <Avatar size="sm" tw="bg-accent text-onaccent text-xs font-semibold">JD</Avatar>
              </div>
            </header>

            {/* mobile nav */}
            <div className="flex gap-1.5 overflow-x-auto border-b border-edge/10 px-4 py-2 scrollbar-luxe lg:hidden">
              {NAV.map((n) => (
                <button key={n.id} onClick={() => setView(n.id)} className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-sm ${n.id === view ? 'bg-accent/15 text-fg' : 'text-fg-muted'}`}>
                  <Icon name={n.i} className="h-4 w-4" /> {n.l}
                </button>
              ))}
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
              {toast && <Alert variant="success" title="Booked" onClose={() => setToast(null)} tw="bg-success-500/10 text-success-200 border-success-500/25">{toast}</Alert>}

              {/* OVERVIEW */}
              {view === 'overview' && (
                <>
                  <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                    <div className="space-y-6">
                      {/* next appointment */}
                      <div className={`${surface.card} overflow-hidden`}>
                        <div className="border-b border-edge/10 px-5 py-4"><h2 className="font-display text-base text-fg">Upcoming appointments</h2></div>
                        {appts.length === 0 ? (
                          <div className="px-5 py-10 text-center text-sm text-fg-subtle">No upcoming visits. <button onClick={() => setView('doctors')} className="text-accent hover:underline">Find a doctor</button></div>
                        ) : (
                          <ul className="divide-y divide-edge/10">
                            {appts.map((a, i) => (
                              <li key={i} className="flex items-center gap-4 px-5 py-4">
                                <Avatar tw="bg-elevated text-fg text-xs font-semibold">{a.dr.init}</Avatar>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-medium text-fg">{a.dr.name}</p>
                                  <p className="text-xs text-fg-subtle">{a.dr.spec}</p>
                                </div>
                                <div className="text-right">
                                  <p className="inline-flex items-center gap-1.5 text-sm text-fg"><Icon name="calendar" className="h-3.5 w-3.5 text-accent" /> {a.day}</p>
                                  <p className="font-mono text-xs text-fg-subtle">{a.time}</p>
                                </div>
                                <Badge tw="bg-accent2/10 text-accent2 border border-accent2/30">Video</Badge>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* vitals */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        {VITALS.map((v) => (
                          <div key={v.l} className={`${surface.card} p-5`}>
                            <div className="flex items-center justify-between">
                              <span className="text-xs uppercase tracking-wider text-fg-subtle">{v.l}</span>
                              <span className="grid h-8 w-8 place-items-center rounded-lg border border-edge/10 bg-fg/[0.03] text-accent"><Icon name={v.i} className="h-4 w-4" /></span>
                            </div>
                            <div className="mt-3 flex items-baseline gap-1.5">
                              <span className="font-display text-2xl text-fg">{v.v}</span>
                              <span className="text-xs text-fg-subtle">{v.u}</span>
                            </div>
                            <Progress value={v.pct} variant={v.variant} size="sm" tw="mt-4" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* meds + care team */}
                    <div className="space-y-6">
                      <div className={`${surface.card} p-5`}>
                        <div className="flex items-center justify-between">
                          <h2 className="font-display text-base text-fg">Medications</h2>
                          <Icon name="pill" className="h-4 w-4 text-accent" />
                        </div>
                        <ul className="mt-4 space-y-3">
                          {MEDS.map((m) => (
                            <li key={m.name} className="flex items-center gap-3 rounded-xl border border-edge/10 bg-fg/[0.02] p-3">
                              <span className={`h-2 w-2 shrink-0 rounded-full ${toneDot[m.tone]}`} />
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-fg">{m.name}</p>
                                <p className="text-xs text-fg-subtle">{m.when}</p>
                              </div>
                              <span className={`shrink-0 text-xs ${m.next === 'Taken' ? 'text-success-400' : 'text-fg-muted'}`}>{m.next}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={`${surface.card} p-5`}>
                        <h2 className="font-display text-base text-fg">Your care team</h2>
                        <div className="mt-4 space-y-3">
                          {DOCTORS.slice(0, 3).map((d) => (
                            <div key={d.id} className="flex items-center gap-3">
                              <Avatar size="sm" tw="bg-elevated text-fg text-xs">{d.init}</Avatar>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-fg">{d.name}</p>
                                <p className="text-xs text-fg-subtle">{d.spec}</p>
                              </div>
                              <Button size="sm" intent="ghost" tw={ghostBtn} onClick={() => openBooking(d)}>Book</Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* DOCTORS */}
              {view === 'doctors' && (
                <>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="w-full sm:max-w-xs">
                      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search doctors or specialties…" tw={darkInput} prefix={<Icon name="search" className="h-4 w-4" />} />
                    </div>
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger tw="inline-flex h-10 items-center gap-2 rounded-lg border border-edge/12 bg-fg/[0.04] px-3 text-sm text-fg-muted hover:text-fg">
                        <Icon name="filter" className="h-4 w-4" /> {spec}
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content tw={menuContent}>
                        {SPECS.map((s) => <DropdownMenu.Item key={s} tw={menuItem} onClick={() => setSpec(s)}>{s}</DropdownMenu.Item>)}
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {doctors.map((d) => (
                      <div key={d.id} className={`${surface.card} p-5`}>
                        <div className="flex items-center gap-3">
                          <Avatar size="lg" tw="bg-accent/15 text-accent font-semibold">{d.init}</Avatar>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-fg">{d.name}</p>
                            <p className="text-xs text-fg-subtle">{d.spec}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-sm">
                          <span className="inline-flex items-center gap-1 text-fg-muted"><Icon name="star" className="h-3.5 w-3.5 text-accent [&_path]:fill-accent" /> {d.rating}</span>
                          <span className="inline-flex items-center gap-1 text-fg-muted"><Icon name="calendar" className="h-3.5 w-3.5" /> Next: {d.next}</span>
                        </div>
                        <Button fullWidth tw={`mt-4 ${accentBtn}`} onClick={() => openBooking(d)}>Book appointment</Button>
                      </div>
                    ))}
                  </div>
                  {doctors.length === 0 && <p className="py-12 text-center text-fg-muted">No clinicians match your search.</p>}
                </>
              )}

              {/* RECORDS */}
              {view === 'records' && (
                <div className={`${surface.card} mx-auto max-w-3xl p-2 sm:p-4`}>
                  <Accordion.Root type="single" collapsible defaultValue={['rec-0']} tw="divide-edge/10">
                    {RECORDS.map((r, i) => (
                      <Accordion.Item key={r.t} value={`rec-${i}`}>
                        <Accordion.Trigger tw="px-3 text-fg hover:text-accent">
                          <span className="flex items-center gap-3 text-left">
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-edge/10 bg-fg/[0.03] text-accent"><Icon name="file" className="h-4 w-4" /></span>
                            <span>
                              <span className="block text-sm font-medium text-fg">{r.t}</span>
                              <span className="block font-mono text-[11px] text-fg-subtle">{r.dr} · {r.date}</span>
                            </span>
                          </span>
                        </Accordion.Trigger>
                        <Accordion.Content tw="px-3 text-fg-muted">
                          <p className="pl-12">{r.body}</p>
                          <div className="mt-3 flex gap-2 pl-12">
                            {r.tags.map((t) => <Badge key={t} tw="bg-fg/5 text-fg-muted border border-edge/10">{t}</Badge>)}
                            <button className="inline-flex items-center gap-1 text-xs text-accent hover:underline"><Icon name="download" className="h-3.5 w-3.5" /> PDF</button>
                          </div>
                        </Accordion.Content>
                      </Accordion.Item>
                    ))}
                  </Accordion.Root>
                </div>
              )}
            </div>
          </div>

          {/* BOOKING FLOW */}
          <Dialog.Root open={!!booking} onOpenChange={(o) => !o && setBooking(null)}>
            <Dialog.Overlay />
            <Dialog.Content tw="max-w-lg border border-edge/10 bg-panel text-fg">
              <Dialog.Close tw="text-fg-subtle hover:text-fg" />
              {booking && (
                <>
                  <div className="flex items-center gap-3">
                    <Avatar tw="bg-accent/15 text-accent font-semibold">{booking.init}</Avatar>
                    <div>
                      <Dialog.Title tw="text-fg">{booking.name}</Dialog.Title>
                      <p className="text-xs text-fg-subtle">{booking.spec}</p>
                    </div>
                  </div>

                  {/* stepper */}
                  <div className="mt-5 flex items-center gap-2">
                    {['Date', 'Time', 'Confirm'].map((s, i) => (
                      <React.Fragment key={s}>
                        <span className={`inline-flex items-center gap-1.5 text-xs ${step >= i + 1 ? 'text-fg' : 'text-fg-subtle'}`}>
                          <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${step > i + 1 ? 'bg-success-500 text-white' : step === i + 1 ? 'bg-accent text-onaccent' : 'bg-fg/10 text-fg-subtle'}`}>
                            {step > i + 1 ? '✓' : i + 1}
                          </span>
                          {s}
                        </span>
                        {i < 2 && <span className="h-px flex-1 bg-edge/15" />}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="mt-6">
                    {step === 1 && (
                      <div>
                        <p className="text-sm text-fg-muted">Select a day</p>
                        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                          {DAYS.map((d) => {
                            const label = `${d.d} ${d.n}`;
                            return (
                              <button key={label} onClick={() => setDay(label)} className={`rounded-xl border p-2 text-center transition ${day === label ? 'border-accent bg-accent/15 text-fg' : 'border-edge/12 text-fg-muted hover:text-fg'}`}>
                                <span className="block text-[11px] uppercase tracking-wider text-fg-subtle">{d.d}</span>
                                <span className="block font-display text-lg">{d.n}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {step === 2 && (
                      <div>
                        <p className="text-sm text-fg-muted">Available times on <span className="text-fg">{day}</span></p>
                        <div className="mt-3 grid grid-cols-4 gap-2">
                          {SLOTS.map((t) => (
                            <button key={t} onClick={() => setTime(t)} className={`rounded-lg border py-2 text-sm transition ${time === t ? 'border-accent bg-accent/15 text-fg' : 'border-edge/12 text-fg-muted hover:text-fg'}`}>{t}</button>
                          ))}
                        </div>
                      </div>
                    )}
                    {step === 3 && (
                      <div className="space-y-4">
                        <div className="rounded-xl border border-edge/10 bg-fg/[0.02] p-4 text-sm">
                          <div className="flex items-center justify-between"><span className="text-fg-subtle">When</span><span className="text-fg">{day} · {time}</span></div>
                          <div className="mt-2 flex items-center justify-between"><span className="text-fg-subtle">Type</span><span className="text-fg">Video consultation</span></div>
                        </div>
                        <label className="block">
                          <span className="mb-1.5 block text-sm font-medium text-fg-muted">Reason for visit</span>
                          <Textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3} placeholder="Briefly describe your symptoms or reason…" tw={darkInput} />
                        </label>
                      </div>
                    )}
                  </div>

                  <Dialog.Footer>
                    {step > 1 ? (
                      <Button intent="ghost" tw={ghostBtn} onClick={() => setStep((s) => s - 1)}>Back</Button>
                    ) : (
                      <Button intent="ghost" tw={ghostBtn} onClick={() => setBooking(null)}>Cancel</Button>
                    )}
                    {step < 3 ? (
                      <Button tw={accentBtn} disabled={(step === 1 && !day) || (step === 2 && !time)} onClick={() => setStep((s) => s + 1)}>
                        Continue <Icon name="arrow" className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button tw={accentBtn} onClick={confirm}><Icon name="check" className="h-4 w-4" /> Confirm booking</Button>
                    )}
                  </Dialog.Footer>
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
