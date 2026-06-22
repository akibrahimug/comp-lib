import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ContactForm, CONTACTFORM_VARIANTS } from '../../../components/blocks/forms/ContactForm';
import { LuxeStage, Container, withSourceBelow } from '../../sections/_luxe';

const meta: Meta<typeof ContactForm> = {
  title: 'Blocks/Forms/ContactForm',
  component: ContactForm,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A themeable contact form (name / email / subject / message) composed from Input + Textarea + Button. ' +
          '6 layout designs incl. a contact-details sidebar.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ContactForm>;

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { ContactForm } from '@kasoma/comp-lib';

<ContactForm variant="split" />  // simple | split | card | glass | withDetails | minimal`,
  },
  render: () => (
    <LuxeStage>
      <Container className="flex flex-col gap-14 py-16">
        {CONTACTFORM_VARIANTS.map((v) => (
          <div key={v} className="flex flex-col gap-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
              {v}
            </span>
            <ContactForm variant={v} />
          </div>
        ))}
      </Container>
    </LuxeStage>
  ),
};

export const Split: Story = {
  render: () => (
    <LuxeStage>
      <Container className="py-16">
        <ContactForm variant="split" />
      </Container>
    </LuxeStage>
  ),
};
