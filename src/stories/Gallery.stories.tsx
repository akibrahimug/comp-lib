import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Gallery, GalleryImage, GalleryLightbox, useGalleryLightbox } from '../components/Gallery';
import { Button } from '../components/Button';

const meta: Meta<typeof Gallery> = {
  title: 'Components/Gallery',
  component: Gallery,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Gallery

Image gallery component with grid layouts and lightbox support. Perfect for photo portfolios, product catalogs, and image collections.

## Import
\`\`\`tsx
import { Gallery, GalleryImage, GalleryLightbox, useGalleryLightbox } from '@kasomaibrahim/comp-lib';
\`\`\`

## Components

- **Gallery** - Container with grid layout
- **GalleryImage** - Individual image component
- **GalleryLightbox** - Fullscreen image viewer
- **useGalleryLightbox** - Hook for lightbox state management

## Gallery Props

- **columns**: '1' | '2' | '3' | '4' | '5' | '6' (default: '3')
- **gap**: 'none' | 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- **tw**: string - Additional Tailwind classes

## GalleryImage Props

- **src**: string - Image URL
- **alt**: string - Image alt text
- **aspectRatio**: 'square' | 'video' | 'portrait' | 'auto' (default: 'square')
- **objectFit**: 'cover' | 'contain' | 'fill' (default: 'cover')
- **onClick**: () => void - Click handler (for lightbox)

## Examples

\`\`\`tsx
// Basic gallery
<Gallery columns="3" gap="md" tw="grid">
  {images.map((img, i) => (
    <GalleryImage key={i} src={img.src} alt={img.alt} />
  ))}
</Gallery>

// With lightbox
const { isOpen, currentIndex, open, close, next, previous } =
  useGalleryLightbox(images);

<Gallery columns="3" gap="md" tw="grid">
  {images.map((img, i) => (
    <GalleryImage
      key={i}
      src={img.src}
      alt={img.alt}
      onClick={() => open(i)}
    />
  ))}
</Gallery>

{isOpen && (
  <GalleryLightbox
    images={images}
    currentIndex={currentIndex}
    onClose={close}
    onNext={next}
    onPrevious={previous}
  />
)}
\`\`\`

## Accessibility

- Proper alt text for all images
- Keyboard navigation in lightbox (ESC, Arrow keys)
- Focus trap when lightbox is open
- Body scroll lock in lightbox
- Lazy loading for images

## Use Cases

- Photo portfolios
- Product galleries
- Image grids
- Instagram-style layouts
- Masonry layouts
        `
      }
    }
  },
  tags: ['autodocs']
};
export default meta;
type Story = StoryObj<typeof Gallery>;

// Sample images from Picsum Photos
const sampleImages = [
  { src: 'https://picsum.photos/seed/1/800/600', alt: 'Landscape 1' },
  { src: 'https://picsum.photos/seed/2/800/600', alt: 'Landscape 2' },
  { src: 'https://picsum.photos/seed/3/800/600', alt: 'Landscape 3' },
  { src: 'https://picsum.photos/seed/4/800/600', alt: 'Landscape 4' },
  { src: 'https://picsum.photos/seed/5/800/600', alt: 'Landscape 5' },
  { src: 'https://picsum.photos/seed/6/800/600', alt: 'Landscape 6' },
  { src: 'https://picsum.photos/seed/7/800/600', alt: 'Landscape 7' },
  { src: 'https://picsum.photos/seed/8/800/600', alt: 'Landscape 8' },
  { src: 'https://picsum.photos/seed/9/800/600', alt: 'Landscape 9' },
];

/**
 * Playground
 */
export const Playground: Story = {
  args: {
    columns: '3',
    gap: 'md',
  },
  render: (args) => (
    <Gallery {...args} tw="grid">
      {sampleImages.slice(0, 6).map((image, index) => (
        <GalleryImage key={index} {...image} />
      ))}
    </Gallery>
  ),
};

/**
 * Basic Gallery
 * Simple 3-column grid
 */
export const Basic: Story = {
  render: () => (
    <Gallery columns="3" gap="md" tw="grid">
      {sampleImages.slice(0, 6).map((image, index) => (
        <GalleryImage key={index} {...image} />
      ))}
    </Gallery>
  ),
};

/**
 * Column Variants
 * Different numbers of columns
 */
export const ColumnVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">2 Columns</h3>
        <Gallery columns="2" gap="md" tw="grid">
          {sampleImages.slice(0, 4).map((image, index) => (
            <GalleryImage key={index} {...image} />
          ))}
        </Gallery>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">3 Columns (Default)</h3>
        <Gallery columns="3" gap="md" tw="grid">
          {sampleImages.slice(0, 6).map((image, index) => (
            <GalleryImage key={index} {...image} />
          ))}
        </Gallery>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">4 Columns</h3>
        <Gallery columns="4" gap="md" tw="grid">
          {sampleImages.slice(0, 8).map((image, index) => (
            <GalleryImage key={index} {...image} />
          ))}
        </Gallery>
      </div>
    </div>
  ),
};

/**
 * Gap Variants
 * Different spacing between images
 */
export const GapVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Small Gap</h3>
        <Gallery columns="3" gap="sm" tw="grid">
          {sampleImages.slice(0, 6).map((image, index) => (
            <GalleryImage key={index} {...image} />
          ))}
        </Gallery>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Medium Gap (Default)</h3>
        <Gallery columns="3" gap="md" tw="grid">
          {sampleImages.slice(0, 6).map((image, index) => (
            <GalleryImage key={index} {...image} />
          ))}
        </Gallery>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Large Gap</h3>
        <Gallery columns="3" gap="lg" tw="grid">
          {sampleImages.slice(0, 6).map((image, index) => (
            <GalleryImage key={index} {...image} />
          ))}
        </Gallery>
      </div>
    </div>
  ),
};

/**
 * Aspect Ratios
 * Different aspect ratios for images
 */
export const AspectRatios: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Square (1:1)</h3>
        <Gallery columns="4" gap="md" tw="grid">
          {sampleImages.slice(0, 4).map((image, index) => (
            <GalleryImage key={index} {...image} aspectRatio="square" />
          ))}
        </Gallery>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Video (16:9)</h3>
        <Gallery columns="2" gap="md" tw="grid">
          {sampleImages.slice(0, 2).map((image, index) => (
            <GalleryImage key={index} {...image} aspectRatio="video" />
          ))}
        </Gallery>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Portrait (3:4)</h3>
        <Gallery columns="4" gap="md" tw="grid">
          {sampleImages.slice(0, 4).map((image, index) => (
            <GalleryImage key={index} {...image} aspectRatio="portrait" />
          ))}
        </Gallery>
      </div>
    </div>
  ),
};

/**
 * With Lightbox
 * Click images to view in fullscreen
 */
export const WithLightbox: Story = {
  render: () => {
    const { isOpen, currentIndex, open, close, next, previous } = useGalleryLightbox(sampleImages);

    return (
      <>
        <Gallery columns="3" gap="md" tw="grid">
          {sampleImages.map((image, index) => (
            <GalleryImage
              key={index}
              {...image}
              onClick={() => open(index)}
            />
          ))}
        </Gallery>

        {isOpen && (
          <GalleryLightbox
            images={sampleImages}
            currentIndex={currentIndex}
            onClose={close}
            onNext={next}
            onPrevious={previous}
          />
        )}
      </>
    );
  },
};

/**
 * Photo Portfolio
 * Gallery with different column layouts
 */
export const PhotoPortfolio: Story = {
  render: () => {
    const portfolioImages = [
      { src: 'https://picsum.photos/seed/p1/1200/800', alt: 'Portfolio 1' },
      { src: 'https://picsum.photos/seed/p2/1200/800', alt: 'Portfolio 2' },
      { src: 'https://picsum.photos/seed/p3/1200/800', alt: 'Portfolio 3' },
      { src: 'https://picsum.photos/seed/p4/1200/800', alt: 'Portfolio 4' },
      { src: 'https://picsum.photos/seed/p5/1200/800', alt: 'Portfolio 5' },
      { src: 'https://picsum.photos/seed/p6/1200/800', alt: 'Portfolio 6' },
      { src: 'https://picsum.photos/seed/p7/1200/800', alt: 'Portfolio 7' },
      { src: 'https://picsum.photos/seed/p8/1200/800', alt: 'Portfolio 8' },
      { src: 'https://picsum.photos/seed/p9/1200/800', alt: 'Portfolio 9' },
    ];

    const { isOpen, currentIndex, open, close, next, previous } = useGalleryLightbox(portfolioImages);

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Photography Portfolio</h2>
          <p className="text-gray-600">Click any image to view in fullscreen</p>
        </div>

        <Gallery columns="3" gap="lg" tw="grid">
          {portfolioImages.map((image, index) => (
            <GalleryImage
              key={index}
              {...image}
              aspectRatio="video"
              onClick={() => open(index)}
            />
          ))}
        </Gallery>

        {isOpen && (
          <GalleryLightbox
            images={portfolioImages}
            currentIndex={currentIndex}
            onClose={close}
            onNext={next}
            onPrevious={previous}
          />
        )}
      </div>
    );
  },
};

/**
 * Product Gallery
 * Gallery for e-commerce products
 */
export const ProductGallery: Story = {
  render: () => {
    const products = [
      { src: 'https://picsum.photos/seed/prod1/800/800', alt: 'Product 1', name: 'Product 1', price: '$29.99' },
      { src: 'https://picsum.photos/seed/prod2/800/800', alt: 'Product 2', name: 'Product 2', price: '$39.99' },
      { src: 'https://picsum.photos/seed/prod3/800/800', alt: 'Product 3', name: 'Product 3', price: '$49.99' },
      { src: 'https://picsum.photos/seed/prod4/800/800', alt: 'Product 4', name: 'Product 4', price: '$59.99' },
      { src: 'https://picsum.photos/seed/prod5/800/800', alt: 'Product 5', name: 'Product 5', price: '$69.99' },
      { src: 'https://picsum.photos/seed/prod6/800/800', alt: 'Product 6', name: 'Product 6', price: '$79.99' },
    ];

    return (
      <Gallery columns="3" gap="lg" tw="grid">
        {products.map((product, index) => (
          <div key={index} className="space-y-2">
            <GalleryImage {...product} aspectRatio="square" />
            <div>
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <p className="text-brand-600 font-bold">{product.price}</p>
            </div>
            <Button size="sm" fullWidth>Add to Cart</Button>
          </div>
        ))}
      </Gallery>
    );
  },
};

/**
 * Instagram-style Grid
 * Square images in 3 columns
 */
export const InstagramGrid: Story = {
  render: () => {
    const instagramImages = Array.from({ length: 12 }, (_, i) => ({
      src: `https://picsum.photos/seed/ig${i + 1}/600/600`,
      alt: `Post ${i + 1}`,
    }));

    return (
      <Gallery columns="3" gap="sm" tw="grid">
        {instagramImages.map((image, index) => (
          <GalleryImage key={index} {...image} aspectRatio="square" />
        ))}
      </Gallery>
    );
  },
};

/**
 * Masonry-style Layout
 * Mixed aspect ratios
 */
export const MasonryStyle: Story = {
  render: () => {
    const masonryImages = [
      { src: 'https://picsum.photos/seed/m1/600/400', alt: 'Image 1', aspectRatio: 'video' as const },
      { src: 'https://picsum.photos/seed/m2/600/600', alt: 'Image 2', aspectRatio: 'square' as const },
      { src: 'https://picsum.photos/seed/m3/600/800', alt: 'Image 3', aspectRatio: 'portrait' as const },
      { src: 'https://picsum.photos/seed/m4/600/600', alt: 'Image 4', aspectRatio: 'square' as const },
      { src: 'https://picsum.photos/seed/m5/600/400', alt: 'Image 5', aspectRatio: 'video' as const },
      { src: 'https://picsum.photos/seed/m6/600/800', alt: 'Image 6', aspectRatio: 'portrait' as const },
    ];

    return (
      <Gallery columns="3" gap="md" tw="grid">
        {masonryImages.map((image, index) => (
          <GalleryImage key={index} {...image} />
        ))}
      </Gallery>
    );
  },
};

/**
 * Responsive Gallery
 * Adapts columns for different screen sizes
 */
export const ResponsiveGallery: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {sampleImages.map((image, index) => (
        <GalleryImage key={index} {...image} aspectRatio="square" />
      ))}
    </div>
  ),
};
