import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from '../../../components/blocks/cards/ProfileCard';
import { BLOCK_VARIANTS } from '../../../components/blocks/_shared';
import { LuxeStage, Container, Eyebrow, withSourceBelow } from '../../sections/_luxe';

const meta: Meta<typeof ProfileCard> = {
  title: 'Blocks/Cards/ProfileCard',
  component: ProfileCard,
  decorators: [withSourceBelow],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'A person / team-member tile composed from Avatar + Button and semantic tokens. ' +
          '6 designs, avatar with initials fallback, inline social icons & optional CTA; data-prop or slot API.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ProfileCard>;

const SAMPLE = {
  name: 'Ada Lovelace',
  role: 'Principal Engineer',
  avatar: 'https://i.pravatar.cc/160?img=47',
  bio: 'Designs the systems behind the systems. Lover of clean abstractions and well-named tokens.',
  socials: [
    { platform: 'github' as const, href: '#' },
    { platform: 'twitter' as const, href: '#' },
    { platform: 'linkedin' as const, href: '#' },
    { platform: 'website' as const, href: '#' },
  ],
  cta: 'Follow',
};

export const AllVariants: Story = {
  name: 'All 6 designs',
  parameters: {
    sourceCode: `import { ProfileCard } from '@kasoma/comp-lib';

<ProfileCard
  variant="elevated"          // minimal | bordered | elevated | glass | gradient | feature
  name="Ada Lovelace"
  role="Principal Engineer"
  avatar="/ada.jpg"
  bio="Designs the systems behind the systems."
  socials={[
    { platform: 'github', href: '#' },
    { platform: 'twitter', href: '#' },
    { platform: 'linkedin', href: '#' },
  ]}
  cta="Follow"
/>`,
  },
  render: () => (
    <LuxeStage>
      <Container className="py-16">
        <Eyebrow>ProfileCard · 6 designs</Eyebrow>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {BLOCK_VARIANTS.map((variant) => (
            <div key={variant} className="flex flex-col items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
                {variant}
              </span>
              <ProfileCard variant={variant} {...SAMPLE} />
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
    sourceCode: `<ProfileCard variant="glass">
  <ProfileCard.Avatar src="/ada.jpg">AL</ProfileCard.Avatar>
  <ProfileCard.Name>Ada Lovelace</ProfileCard.Name>
  <ProfileCard.Role>Principal Engineer</ProfileCard.Role>
  <ProfileCard.Bio>Designs the systems behind the systems.</ProfileCard.Bio>
  <ProfileCard.Socials
    socials={[
      { platform: 'github', href: '#' },
      { platform: 'twitter', href: '#' },
    ]}
  />
  <ProfileCard.Action>Follow</ProfileCard.Action>
</ProfileCard>`,
  },
  render: () => (
    <LuxeStage>
      <Container className="flex justify-center py-16">
        <ProfileCard variant="glass">
          <ProfileCard.Avatar src={SAMPLE.avatar}>AL</ProfileCard.Avatar>
          <ProfileCard.Name>Ada Lovelace</ProfileCard.Name>
          <ProfileCard.Role>Principal Engineer</ProfileCard.Role>
          <ProfileCard.Bio>
            Designs the systems behind the systems.
          </ProfileCard.Bio>
          <ProfileCard.Socials
            socials={[
              { platform: 'github', href: '#' },
              { platform: 'twitter', href: '#' },
            ]}
          />
          <ProfileCard.Action>Follow</ProfileCard.Action>
        </ProfileCard>
      </Container>
    </LuxeStage>
  ),
};

export const Feature: Story = {
  render: () => (
    <LuxeStage>
      <Container className="flex justify-center py-16">
        <ProfileCard variant="feature" {...SAMPLE} />
      </Container>
    </LuxeStage>
  ),
};
