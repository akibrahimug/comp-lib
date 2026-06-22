import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SignIn, SIGNIN_VARIANTS } from '../../../components/blocks/forms/SignIn';
import { LuxeStage, Container, withSourceBelow } from '../../sections/_luxe';

const meta: Meta<typeof SignIn> = {
  title: 'Blocks/Forms/SignIn',
  component: SignIn,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A themeable authentication form composed from Input + Checkbox + Button. ' +
          '6 layout designs, optional social providers, data-prop or slot API.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SignIn>;

const SOCIALS = [{ provider: 'google' as const }, { provider: 'github' as const }];

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { SignIn } from '@kasoma/comp-lib';

<SignIn
  variant="card"            // centered | split | card | glass | minimal | social
  title="Welcome back"
  subtitle="Sign in to continue"
  socials={[{ provider: 'google' }, { provider: 'github' }]}
  forgotHref="#"
  signupHref="#"
/>`,
  },
  render: () => (
    <LuxeStage>
      <Container className="flex flex-col items-center gap-12 py-16">
        {SIGNIN_VARIANTS.map((v) => (
          <div key={v} className="flex w-full flex-col items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
              {v}
            </span>
            <SignIn variant={v} socials={SOCIALS} forgotHref="#" signupHref="#" />
          </div>
        ))}
      </Container>
    </LuxeStage>
  ),
};

export const Composition: Story = {
  name: 'Slot composition',
  parameters: {
    sourceCode: `<SignIn variant="glass">
  <SignIn.Header title="Welcome back" subtitle="Sign in to continue" />
  <SignIn.Field type="email" name="email" label="Email" placeholder="you@example.com" />
  <SignIn.Field type="password" name="password" label="Password" />
  <SignIn.Actions>Sign in</SignIn.Actions>
</SignIn>`,
  },
  render: () => (
    <LuxeStage>
      <Container className="flex justify-center py-16">
        <SignIn variant="glass">
          <SignIn.Header title="Welcome back" subtitle="Sign in to continue" />
          <SignIn.Field type="email" name="email" label="Email" placeholder="you@example.com" />
          <SignIn.Field type="password" name="password" label="Password" placeholder="••••••••" />
          <SignIn.Actions>Sign in</SignIn.Actions>
        </SignIn>
      </Container>
    </LuxeStage>
  ),
};

export const Card: Story = {
  render: () => (
    <LuxeStage>
      <Container className="flex justify-center py-16">
        <SignIn variant="card" socials={SOCIALS} forgotHref="#" signupHref="#" />
      </Container>
    </LuxeStage>
  ),
};
