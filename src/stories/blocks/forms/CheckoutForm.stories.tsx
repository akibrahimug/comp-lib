import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckoutForm, CHECKOUTFORM_VARIANTS } from '../../../components/blocks/forms/CheckoutForm';
import { LuxeStage, Container, withSourceBelow } from '../../sections/_luxe';

const meta: Meta<typeof CheckoutForm> = {
  title: 'Blocks/Forms/CheckoutForm',
  component: CheckoutForm,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A themeable checkout form (contact / shipping / payment) with an order-summary panel, ' +
          'composed from Input + Select + Button. 6 layout designs.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof CheckoutForm>;

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { CheckoutForm } from '@kasoma/comp-lib';

<CheckoutForm variant="twoColumn" />  // single | twoColumn | steps | card | glass | compact`,
  },
  render: () => (
    <LuxeStage>
      <Container className="flex flex-col gap-14 py-16">
        {CHECKOUTFORM_VARIANTS.map((v) => (
          <div key={v} className="flex flex-col gap-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
              {v}
            </span>
            <CheckoutForm variant={v} />
          </div>
        ))}
      </Container>
    </LuxeStage>
  ),
};

export const TwoColumn: Story = {
  render: () => (
    <LuxeStage>
      <Container className="py-16">
        <CheckoutForm variant="twoColumn" />
      </Container>
    </LuxeStage>
  ),
};
