import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Footer, FOOTER_VARIANTS } from '../../../components/blocks/app/Footer';
import { LuxeStage, withSourceBelow } from '../../sections/_luxe';

const meta: Meta<typeof Footer> = {
  title: 'Blocks/App/Footer',
  component: Footer,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A themeable site footer with brand, link columns and a bottom bar. ' +
          '6 layout designs (simple · columns · cta · newsletter · minimal · dark); data-prop or slot API. ' +
          'The newsletter design composes Input + Button.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Footer>;

const COLUMNS = [
  {
    title: 'Product',
    links: [{ label: 'Features' }, { label: 'Pricing' }, { label: 'Changelog' }],
  },
  {
    title: 'Company',
    links: [{ label: 'About' }, { label: 'Careers' }, { label: 'Blog' }],
  },
  {
    title: 'Resources',
    links: [{ label: 'Docs' }, { label: 'Support' }, { label: 'Status' }],
  },
];

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { Footer } from '@kasoma/comp-lib';

<Footer
  variant="columns"          // simple | columns | cta | newsletter | minimal | dark
  columns={[
    { title: 'Product', links: [{ label: 'Features' }, { label: 'Pricing' }] },
    { title: 'Company', links: [{ label: 'About' }, { label: 'Careers' }] },
  ]}
  bottom="© 2026 comp·lib. All rights reserved."
/>`,
  },
  render: () => (
    <LuxeStage switcher={false}>
      <div className="flex flex-col gap-10 py-8">
        {FOOTER_VARIANTS.map((variant) => (
          <div key={variant} className="relative">
            <span className="mb-2 block px-5 font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
              {variant}
            </span>
            <div className="relative overflow-hidden rounded-xl border border-edge/10">
              <Footer variant={variant} columns={COLUMNS} />
            </div>
          </div>
        ))}
      </div>
    </LuxeStage>
  ),
};

export const Composition: Story = {
  name: 'Slot composition',
  parameters: {
    sourceCode: `<Footer variant="cta">
  <Footer.Brand>Build faster with themeable blocks.</Footer.Brand>
  <Footer.Column title="Product">
    <a href="#">Features</a>
    <a href="#">Pricing</a>
  </Footer.Column>
  <Footer.Bottom>© 2026 comp·lib</Footer.Bottom>
</Footer>`,
  },
  render: () => (
    <LuxeStage switcher={false}>
      <div className="py-8">
        <div className="overflow-hidden rounded-xl border border-edge/10">
          <Footer variant="columns">
            <div className="flex flex-col gap-10 pb-10 md:flex-row md:justify-between">
              <Footer.Brand>Build faster with themeable blocks.</Footer.Brand>
              <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 md:max-w-2xl">
                {COLUMNS.map((c) => (
                  <Footer.Column key={String(c.title)} title={c.title} links={c.links} />
                ))}
              </div>
            </div>
            <Footer.Bottom>© 2026 comp·lib. All rights reserved.</Footer.Bottom>
          </Footer>
        </div>
      </div>
    </LuxeStage>
  ),
};

export const Newsletter: Story = {
  render: () => (
    <LuxeStage switcher={false}>
      <div className="py-8">
        <div className="overflow-hidden rounded-xl border border-edge/10">
          <Footer variant="newsletter" />
        </div>
      </div>
    </LuxeStage>
  ),
};
