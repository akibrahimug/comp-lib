import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SignUp, SIGNUP_VARIANTS } from '../../../components/blocks/forms/SignUp';
import { LuxeStage, Container, withSourceBelow } from '../../sections/_luxe';

const meta: Meta<typeof SignUp> = {
  title: 'Blocks/Forms/SignUp',
  component: SignUp,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A themeable registration form composed from Input + Checkbox + Button. ' +
          '6 layout designs (incl. a 2-step flow), social providers, data-prop or slot API.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SignUp>;

const SOCIALS = [{ provider: 'google' as const }, { provider: 'github' as const }];

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { SignUp } from '@kasoma/comp-lib';

<SignUp
  variant="card"            // centered | split | card | glass | steps | social
  title="Create your account"
  subtitle="Start your free trial"
  socials={[{ provider: 'google' }, { provider: 'github' }]}
  signinHref="#"
/>`,
  },
  render: () => (
    <LuxeStage>
      <Container className="flex flex-col items-center gap-12 py-16">
        {SIGNUP_VARIANTS.map((v) => (
          <div key={v} className="flex w-full flex-col items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
              {v}
            </span>
            <SignUp variant={v} socials={SOCIALS} signinHref="#" />
          </div>
        ))}
      </Container>
    </LuxeStage>
  ),
};

export const Split: Story = {
  render: () => (
    <LuxeStage>
      <Container className="flex justify-center py-16">
        <SignUp variant="split" socials={SOCIALS} signinHref="#" />
      </Container>
    </LuxeStage>
  ),
};
