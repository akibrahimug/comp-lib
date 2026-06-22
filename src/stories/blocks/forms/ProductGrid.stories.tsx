import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProductGrid, PRODUCTGRID_VARIANTS } from '../../../components/blocks/forms/ProductGrid';
import { LuxeStage, Container, withSourceBelow } from '../../sections/_luxe';

const meta: Meta<typeof ProductGrid> = {
  title: 'Blocks/Forms/ProductGrid',
  component: ProductGrid,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A themeable e-commerce product grid (self-contained items composed from Button + Badge + star rating). ' +
          '6 layout designs.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ProductGrid>;

const PRODUCTS = [
  { title: 'Aero Runner', price: 129, originalPrice: 189, badge: 'Sale', rating: 4.5 },
  { title: 'Trail Blazer', price: 149, rating: 4.8 },
  { title: 'Court Classic', price: 99, rating: 4.2 },
  { title: 'Studio Flex', price: 89, badge: 'New', rating: 4.6 },
];

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { ProductGrid } from '@kasoma/comp-lib';

<ProductGrid
  variant="grid3"           // grid3 | grid4 | list | masonry | compact | featured
  products={[{ title: 'Aero Runner', price: 129, originalPrice: 189, badge: 'Sale', rating: 4.5 }]}
/>`,
  },
  render: () => (
    <LuxeStage>
      <Container className="flex flex-col gap-14 py-16">
        {PRODUCTGRID_VARIANTS.map((v) => (
          <div key={v} className="flex flex-col gap-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
              {v}
            </span>
            <ProductGrid variant={v} products={PRODUCTS} />
          </div>
        ))}
      </Container>
    </LuxeStage>
  ),
};

export const Grid3: Story = {
  render: () => (
    <LuxeStage>
      <Container className="py-16">
        <ProductGrid variant="grid3" products={PRODUCTS} />
      </Container>
    </LuxeStage>
  ),
};
