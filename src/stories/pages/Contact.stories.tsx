import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Badge } from '../../components/Badge';
import {
  LuxeStage,
  Container,
  Eyebrow,
  Logo,
  Icon,
  ThemeSwitcher,
  surface,
  darkInput,
  accentBtn,
} from '../sections/_luxe';

const meta: Meta = {
  title: 'Pages/Contact',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component: 'A complete contact page — split layout with a themed form and contact channels — composed from the component library.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

function NavBar() {
  return (
    <div className="sticky top-0 z-40 border-b border-edge/10 bg-canvas/70 backdrop-blur-xl">
      <Container className="flex items-center justify-between py-4">
        <Logo />
        <ThemeSwitcher className="hidden lg:inline-flex" />
      </Container>
    </div>
  );
}

const channels = [
  { i: 'mail', t: 'Email us', d: 'hello@complib.dev', h: 'Replies within a business day.' },
  { i: 'github', t: 'Open an issue', d: 'github.com/comp-lib', h: 'Bugs, features and questions.' },
  { i: 'bell', t: 'Status & updates', d: 'status.complib.dev', h: 'Live uptime and incidents.' },
];

export const FullPage: Story = {
  render: () => {
    const Demo = () => {
      const [sent, setSent] = useState(false);
      return (
        <LuxeStage>
          <NavBar />
          <Container className="py-16 sm:py-24">
            <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              {/* Left: pitch + channels */}
              <div>
                <Eyebrow>Contact</Eyebrow>
                <h1 className="mt-5 font-display text-4xl font-light tracking-tight text-fg sm:text-5xl">
                  Let's build something <span className="italic text-accent-gradient">together.</span>
                </h1>
                <p className="mt-5 max-w-md text-lg text-fg-muted">
                  Questions about plans, partnerships or the roadmap? Send a note — a real human will reply.
                </p>
                <div className="mt-10 space-y-3">
                  {channels.map((c) => (
                    <div key={c.t} className={`${surface.card} flex items-start gap-4 p-5`}>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-edge/10 bg-fg/[0.03] text-accent">
                        <Icon name={c.i} className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="text-sm font-medium text-fg">{c.t}</div>
                        <div className="text-sm text-accent">{c.d}</div>
                        <div className="mt-0.5 text-xs text-fg-subtle">{c.h}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: form */}
              <div className={`${surface.card} p-7 sm:p-9`}>
                {sent ? (
                  <div className="flex flex-col items-center py-16 text-center">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent">
                      <Icon name="check" className="h-7 w-7" />
                    </span>
                    <h3 className="mt-5 font-display text-2xl text-fg">Message sent</h3>
                    <p className="mt-2 max-w-xs text-sm text-fg-muted">Thanks for reaching out — we'll get back to you shortly.</p>
                    <Button tw={accentBtn + ' mt-6'} onClick={() => setSent(false)}>Send another</Button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl text-fg">Send a message</h3>
                      <Badge tw="bg-accent/10 text-accent border border-accent/30">Avg. reply &lt; 24h</Badge>
                    </div>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <Input label="First name" placeholder="Ada" tw={darkInput} required />
                      <Input label="Last name" placeholder="Obi" tw={darkInput} required />
                    </div>
                    <div className="mt-4">
                      <Input label="Work email" type="email" placeholder="ada@nimbus.io" tw={darkInput} required />
                    </div>
                    <div className="mt-4">
                      <label className="mb-1.5 block text-sm font-medium text-fg">Message</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Tell us what you're building…"
                        className={surface.input + ' resize-none'}
                      />
                    </div>
                    <Button type="submit" fullWidth tw={accentBtn + ' mt-6'}>
                      Send message <Icon name="arrow" className="h-4 w-4" />
                    </Button>
                    <p className="mt-3 text-center text-xs text-fg-subtle">
                      By submitting you agree to our privacy policy.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </Container>
        </LuxeStage>
      );
    };
    return <Demo />;
  },
};
