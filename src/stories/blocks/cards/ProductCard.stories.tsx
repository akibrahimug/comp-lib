import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from '../../../components/blocks/cards/ProductCard';
import { BLOCK_VARIANTS } from '../../../components/blocks/_shared';
import { LuxeStage, Container, Eyebrow, withSourceBelow } from '../../sections/_luxe';

const meta: Meta<typeof ProductCard> = {
  title: 'Blocks/Cards/ProductCard',
  component: ProductCard,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'An e-commerce product tile composed from Button + Badge and semantic tokens. ' +
          '6 designs, inline star rating, optional sale badge & strikethrough price; data-prop or slot API.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ProductCard>;

const SAMPLE = {
  image: 'https://picsum.photos/seed/aero/480/360',
  title: 'Aero Runner — Carbon',
  price: 129,
  originalPrice: 189,
  rating: 4.5,
  reviews: 212,
  badge: 'Sale',
  cta: 'Add to cart',
};

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { ProductCard } from '@kasoma/comp-lib';

<ProductCard
  variant="elevated"          // minimal | bordered | elevated | glass | gradient | feature
  image="/sneaker.jpg"
  title="Aero Runner — Carbon"
  price={129}
  originalPrice={189}
  rating={4.5}
  reviews={212}
  badge="Sale"
  cta="Add to cart"
/>`,
  },
  render: () => (
    <LuxeStage>
      <Container className="py-16">
        <Eyebrow>ProductCard · 6 designs</Eyebrow>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {BLOCK_VARIANTS.map((variant) => (
            <div key={variant} className="flex flex-col items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
                {variant}
              </span>
              <ProductCard variant={variant} {...SAMPLE} />
            </div>
          ))}
        </div>
      </Container>
    </LuxeStage>
  ),
};

export const Composition: Story = {
  name: 'Slot composition',
  parameters: {
    sourceCode: `<ProductCard variant="glass">
  <ProductCard.Media src="/sneaker.jpg" alt="Aero Runner" badge="New" />
  <ProductCard.Body>
    <ProductCard.Title>Aero Runner — Carbon</ProductCard.Title>
    <ProductCard.Rating value={4.5} reviews={212} />
    <ProductCard.Price amount={129} originalPrice={189} />
    <ProductCard.Action>Add to cart</ProductCard.Action>
  </ProductCard.Body>
</ProductCard>`,
  },
  render: () => (
    <LuxeStage>
      <Container className="flex justify-center py-16">
        <ProductCard variant="glass">
          <ProductCard.Media src={SAMPLE.image} alt="Aero Runner" badge="New" />
          <ProductCard.Body>
            <ProductCard.Title>Aero Runner — Carbon</ProductCard.Title>
            <ProductCard.Rating value={4.5} reviews={212} />
            <ProductCard.Price amount={129} originalPrice={189} />
            <ProductCard.Action>Add to cart</ProductCard.Action>
          </ProductCard.Body>
        </ProductCard>
      </Container>
    </LuxeStage>
  ),
};

export const Feature: Story = {
  render: () => (
    <LuxeStage>
      <Container className="flex justify-center py-16">
        <ProductCard variant="feature" {...SAMPLE} />
      </Container>
    </LuxeStage>
  ),
};
