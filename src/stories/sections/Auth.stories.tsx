import React, { useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Checkbox } from '../../components/Checkbox';
import { Toggle } from '../../components/Toggle';
import { Avatar } from '../../components/Avatar';
import { Badge } from '../../components/Badge';
import { Alert } from '../../components/Alert';
import { Progress } from '../../components/Progress';
import { Dialog } from '../../components/Dialog';
import { LuxeStage, Container, Logo, Eyebrow, Icon, surface, accentBtn, ghostBtn, darkInput } from './_luxe';

const meta: Meta = {
  title: 'Sections/Auth',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'Authentication & account flows — controlled forms with password show/hide, a live strength meter, submit feedback and a delete-confirm dialog. Runtime themeable.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-fg-muted">{label}</span>
      {children}
    </label>
  );
}

function PasswordInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [show, setShow] = useState(false);
  return (
    <Input
      type={show ? 'text' : 'password'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      tw={darkInput}
      prefix={<Icon name="lock" className="h-4 w-4" />}
      suffix={
        <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'} className="text-fg-subtle transition hover:text-fg">
          <Icon name={show ? 'eye-off' : 'eye'} className="h-4 w-4" />
        </button>
      }
    />
  );
}

function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button intent="ghost" tw={ghostBtn}><Icon name="google" className="h-4 w-4" /> Google</Button>
      <Button intent="ghost" tw={ghostBtn}><Icon name="github" className="h-4 w-4" /> GitHub</Button>
    </div>
  );
}

function Divider({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px flex-1 bg-edge/10" />
      <span className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">{children}</span>
      <span className="h-px flex-1 bg-edge/10" />
    </div>
  );
}

function BrandPanel({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <div className="relative hidden overflow-hidden border-r border-edge/10 lg:block">
      <div className="mesh grain absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -left-10 top-1/3 h-72 w-72 rounded-full bg-accent/15 blur-[100px]" />
      <div className="relative flex h-full flex-col justify-between p-12">
        <Logo />
        <div>
          <Icon name="sparkle" className="h-7 w-7 text-accent" />
          <blockquote className="mt-6 font-display text-3xl font-light leading-snug text-fg">"{quote}"</blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <Avatar size="sm" tw="bg-elevated text-fg text-xs">{author.split(' ').map((w) => w[0]).join('')}</Avatar>
            <div>
              <div className="text-sm font-medium text-fg">{author}</div>
              <div className="font-mono text-[11px] text-fg-subtle">{role}</div>
            </div>
          </figcaption>
        </div>
        <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
          <span>SOC2</span><span>·</span><span>GDPR</span><span>·</span><span>99.99% uptime</span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────── LOGIN ───────────────────────────────── */

export const Login: Story = {
  render: () => {
    const Demo = () => {
      const [email, setEmail] = useState('');
      const [pw, setPw] = useState('');
      const [done, setDone] = useState(false);
      return (
        <LuxeStage className="grid lg:grid-cols-2">
          <BrandPanel quote="We replaced three component libraries with one and shipped a redesign in a weekend." author="Grace Hopper" role="VP Engineering, Lumen" />
          <div className="flex items-center justify-center px-5 py-12 sm:p-6 sm:py-16">
            <form
              className="w-full max-w-sm animate-fade-up"
              onSubmit={(e) => { e.preventDefault(); setDone(true); }}
            >
              <div className="lg:hidden"><Logo /></div>
              <h1 className="mt-8 font-display text-3xl font-light text-fg lg:mt-0">Welcome back</h1>
              <p className="mt-2 text-sm text-fg-muted">Sign in to your comp·lib workspace.</p>

              {done && (
                <div className="mt-6">
                  <Alert variant="success" title="Signed in" onClose={() => setDone(false)}>
                    Welcome back{email ? `, ${email}` : ''}.
                  </Alert>
                </div>
              )}

              <div className="mt-8 space-y-4">
                <SocialButtons />
                <Divider>or</Divider>
                <Field label="Email">
                  <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ada@company.com" tw={darkInput} prefix={<Icon name="mail" className="h-4 w-4" />} />
                </Field>
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-sm font-medium text-fg-muted">Password</span>
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-accent hover:underline">Forgot?</a>
                  </div>
                  <PasswordInput value={pw} onChange={setPw} placeholder="••••••••" />
                </div>
                <label className="flex items-center gap-2.5 text-sm text-fg-muted">
                  <Checkbox /> Keep me signed in
                </label>
                <Button type="submit" fullWidth size="lg" tw={accentBtn}>
                  Sign in <Icon name="arrow" className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-8 text-center text-sm text-fg-muted">
                New here? <a href="#" onClick={(e) => e.preventDefault()} className="font-medium text-accent hover:underline">Create an account</a>
              </p>
            </form>
          </div>
        </LuxeStage>
      );
    };
    return <Demo />;
  },
};

/* ─────────────────────────────── SIGNUP ───────────────────────────────── */

export const Signup: Story = {
  render: () => {
    const Demo = () => {
      const [pw, setPw] = useState('');
      const [terms, setTerms] = useState(false);
      const [done, setDone] = useState(false);
      const strength = Math.min(100, pw.length * 14);
      const strengthLabel = pw.length === 0 ? '—' : strength < 42 ? 'Weak' : strength < 84 ? 'Good' : 'Strong';
      const strengthVar = strength < 42 ? 'danger' : strength < 84 ? 'gold' : 'success';
      return (
        <LuxeStage className="grid lg:grid-cols-2">
          <div className="flex items-center justify-center px-5 py-12 sm:p-6 sm:py-16">
            <form className="w-full max-w-sm animate-fade-up" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
              <div className="lg:hidden"><Logo /></div>
              <Badge tw="mt-8 bg-accent/10 text-accent border border-accent/30 lg:mt-0">Free forever plan</Badge>
              <h1 className="mt-4 font-display text-3xl font-light text-fg">Create your account</h1>
              <p className="mt-2 text-sm text-fg-muted">No credit card required.</p>

              {done ? (
                <div className="mt-8">
                  <Alert variant="success" title="Account created" onClose={() => setDone(false)}>
                    Check your inbox to verify your email.
                  </Alert>
                </div>
              ) : (
                <div className="mt-8 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="First name"><Input placeholder="Ada" tw={darkInput} /></Field>
                    <Field label="Last name"><Input placeholder="Lovelace" tw={darkInput} /></Field>
                  </div>
                  <Field label="Work email">
                    <Input type="email" required placeholder="ada@company.com" tw={darkInput} prefix={<Icon name="mail" className="h-4 w-4" />} />
                  </Field>
                  <Field label="Password">
                    <PasswordInput value={pw} onChange={setPw} placeholder="At least 8 characters" />
                  </Field>
                  {pw.length > 0 && (
                    <div className="flex items-center gap-3">
                      <Progress value={strength} variant={strengthVar as any} size="sm" />
                      <span className="w-12 shrink-0 text-right text-xs text-fg-muted">{strengthLabel}</span>
                    </div>
                  )}
                  <label className="flex items-start gap-2.5 text-sm text-fg-muted">
                    <Checkbox checked={terms} onChange={() => setTerms((v) => !v)} tw="mt-0.5" />
                    <span>I agree to the <a href="#" onClick={(e) => e.preventDefault()} className="text-accent hover:underline">Terms</a> and <a href="#" onClick={(e) => e.preventDefault()} className="text-accent hover:underline">Privacy Policy</a>.</span>
                  </label>
                  <Button type="submit" fullWidth size="lg" tw={accentBtn} disabled={!terms}>
                    {terms ? 'Create account' : 'Accept the terms to continue'} {terms && <Icon name="arrow" className="h-4 w-4" />}
                  </Button>
                </div>
              )}
              <p className="mt-8 text-center text-sm text-fg-muted">
                Already have an account? <a href="#" onClick={(e) => e.preventDefault()} className="font-medium text-accent hover:underline">Sign in</a>
              </p>
            </form>
          </div>
          <BrandPanel quote="The accessibility defaults alone saved us an entire audit cycle. It just works." author="Alan Turing" role="Design Systems Lead, Aether" />
        </LuxeStage>
      );
    };
    return <Demo />;
  },
};

/* ─────────────────────────────── SETTINGS ─────────────────────────────── */

const prefs = [
  { t: 'Product updates', d: 'New components, releases and changelogs.', on: true },
  { t: 'Security alerts', d: 'Sign-ins from new devices and key changes.', on: true },
  { t: 'Weekly digest', d: 'A Monday summary of your workspace activity.', on: false },
  { t: 'Marketing', d: 'Occasional tips and offers. No spam, ever.', on: false },
];

function SettingsToggle({ t, d, on }: { t: string; d: string; on: boolean }) {
  const [checked, setChecked] = useState(on);
  return (
    <div className="flex items-center justify-between gap-6 py-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-fg">{t}</p>
        <p className="mt-0.5 text-sm text-fg-muted">{d}</p>
      </div>
      <Toggle checked={checked} onChange={() => setChecked((v) => !v)} />
    </div>
  );
}

export const Settings: Story = {
  render: () => {
    const Demo = () => {
      const [confirm, setConfirm] = useState(false);
      const [saved, setSaved] = useState(false);
      return (
        <LuxeStage>
          <Container className="py-16">
            <div className="mx-auto max-w-3xl">
              <Eyebrow>Account</Eyebrow>
              <h1 className="mt-4 font-display text-4xl font-light text-fg">Settings</h1>
              <p className="mt-2 text-fg-muted">Manage your profile, notifications and security.</p>

              {saved && (
                <div className="mt-6"><Alert variant="success" title="Saved" onClose={() => setSaved(false)}>Your changes have been saved.</Alert></div>
              )}

              <section className={`${surface.card} mt-10 p-6`}>
                <h2 className="font-display text-lg text-fg">Profile</h2>
                <div className="mt-6 flex items-center gap-5">
                  <Avatar size="2xl" tw="bg-accent text-onaccent font-semibold">AL</Avatar>
                  <div className="flex gap-3">
                    <Button size="sm" tw={accentBtn}>Change photo</Button>
                    <Button size="sm" intent="ghost" tw={ghostBtn}>Remove</Button>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Full name"><Input defaultValue="Ada Lovelace" tw={darkInput} /></Field>
                  <Field label="Email"><Input defaultValue="ada@analytical.engine" tw={darkInput} /></Field>
                </div>
              </section>

              <section className={`${surface.card} mt-6 p-6`}>
                <h2 className="font-display text-lg text-fg">Notifications</h2>
                <div className="mt-2 divide-y divide-edge/10">
                  {prefs.map((p) => <SettingsToggle key={p.t} {...p} />)}
                </div>
              </section>

              <section className="mt-6 rounded-2xl border border-danger-500/30 bg-danger-500/[0.06] p-6">
                <h2 className="font-display text-lg text-danger-300">Danger zone</h2>
                <div className="mt-4 flex items-center justify-between gap-6">
                  <div>
                    <p className="text-sm font-medium text-fg">Delete workspace</p>
                    <p className="mt-0.5 text-sm text-fg-muted">Permanently remove your workspace and all data.</p>
                  </div>
                  <Button intent="danger" tw="bg-danger-600 hover:bg-danger-700 border-0 shrink-0" onClick={() => setConfirm(true)}>Delete</Button>
                </div>
              </section>

              <div className="mt-8 flex justify-end gap-3">
                <Button intent="ghost" tw={ghostBtn}>Cancel</Button>
                <Button tw={accentBtn} onClick={() => { setSaved(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Save changes</Button>
              </div>
            </div>
          </Container>

          <Dialog.Root open={confirm} onOpenChange={setConfirm}>
            <Dialog.Overlay />
            <Dialog.Content tw="border border-edge/10 bg-panel text-fg">
              <Dialog.Close tw="text-fg-subtle hover:text-fg" />
              <Dialog.Header>
                <Dialog.Title tw="text-fg">Delete workspace?</Dialog.Title>
                <Dialog.Description tw="text-fg-muted">This action is irreversible. All projects and data will be permanently removed.</Dialog.Description>
              </Dialog.Header>
              <Dialog.Footer>
                <Button intent="ghost" tw={ghostBtn} onClick={() => setConfirm(false)}>Cancel</Button>
                <Button intent="danger" tw="bg-danger-600 hover:bg-danger-700 border-0" onClick={() => setConfirm(false)}>Yes, delete</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Root>
        </LuxeStage>
      );
    };
    return <Demo />;
  },
};
