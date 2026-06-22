import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BlogCard } from '../../../components/blocks/cards/BlogCard';
import { BLOCK_VARIANTS } from '../../../components/blocks/_shared';
import { LuxeStage, Container, Eyebrow, withSourceBelow } from '../../sections/_luxe';

const meta: Meta<typeof BlogCard> = {
  title: 'Blocks/Cards/BlogCard',
  component: BlogCard,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'An article-preview tile composed from Badge + Avatar and semantic tokens. ' +
          '6 designs, cover image with fallback, category chip and an author/date/read-time meta row; data-prop or slot API.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof BlogCard>;

const SAMPLE = {
  image: 'https://picsum.photos/seed/themeable/640/360',
  category: 'Engineering',
  title: 'Designing themeable systems that re-tint themselves',
  excerpt:
    'A field guide to semantic tokens: how a handful of variables let one component library wear four different skins.',
  author: 'Ada Lovelace',
  authorAvatar: 'https://i.pravatar.cc/96?img=47',
  date: 'Jun 21, 2026',
  readTime: '6 min read',
  href: '#',
};

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { BlogCard } from '@kasoma/comp-lib';

<BlogCard
  variant="elevated"          // minimal | bordered | elevated | glass | gradient | feature
  image="/cover.jpg"
  category="Engineering"
  title="Designing themeable systems that re-tint themselves"
  excerpt="A field guide to semantic tokens."
  author="Ada Lovelace"
  authorAvatar="/ada.jpg"
  date="Jun 21, 2026"
  readTime="6 min read"
  href="#"
/>`,
  },
  render: () => (
    <LuxeStage>
      <Container className="py-16">
        <Eyebrow>BlogCard · 6 designs</Eyebrow>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {BLOCK_VARIANTS.map((variant) => (
            <div key={variant} className="flex flex-col items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
                {variant}
              </span>
              <BlogCard variant={variant} {...SAMPLE} />
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
    sourceCode: `<BlogCard variant="glass" href="#">
  <BlogCard.Media src="/cover.jpg" alt="Cover" />
  <BlogCard.Body>
    <BlogCard.Category>Engineering</BlogCard.Category>
    <BlogCard.Title href="#">
      Designing themeable systems that re-tint themselves
    </BlogCard.Title>
    <BlogCard.Excerpt>A field guide to semantic tokens.</BlogCard.Excerpt>
    <BlogCard.Meta
      author="Ada Lovelace"
      authorAvatar="/ada.jpg"
      date="Jun 21, 2026"
      readTime="6 min read"
    />
  </BlogCard.Body>
</BlogCard>`,
  },
  render: () => (
    <LuxeStage>
      <Container className="flex justify-center py-16">
        <BlogCard variant="glass" href={SAMPLE.href}>
          <BlogCard.Media src={SAMPLE.image} alt="Cover" />
          <BlogCard.Body>
            <BlogCard.Category>Engineering</BlogCard.Category>
            <BlogCard.Title href={SAMPLE.href}>
              Designing themeable systems that re-tint themselves
            </BlogCard.Title>
            <BlogCard.Excerpt>
              A field guide to semantic tokens.
            </BlogCard.Excerpt>
            <BlogCard.Meta
              author="Ada Lovelace"
              authorAvatar={SAMPLE.authorAvatar}
              date="Jun 21, 2026"
              readTime="6 min read"
            />
          </BlogCard.Body>
        </BlogCard>
      </Container>
    </LuxeStage>
  ),
};

export const Feature: Story = {
  render: () => (
    <LuxeStage>
      <Container className="flex justify-center py-16">
        <BlogCard variant="feature" {...SAMPLE} />
      </Container>
    </LuxeStage>
  ),
};
