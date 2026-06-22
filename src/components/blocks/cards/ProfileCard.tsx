import React, {
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { Avatar } from '../../Avatar';
import { Button } from '../../Button';
import {
  mergeTw,
  surfaceVariants,
  accentSolid,
  ghostControl,
  SlotProps,
  BlockVariant,
  BlockVariantContext,
  useBlockVariant,
} from '../_shared';

/* ════════════════════════════════════════════════════════════════════════
   ProfileCard — person / team-member tile.
   Composed from library primitives (Avatar, Button) and semantic tokens,
   exposing the shared 6 designs via `variant` and a compound slot API. Renders
   complete from data props alone, so it works out of the box:

     // Data-prop form (renders a full profile):
     <ProfileCard variant="elevated" name="Ada Lovelace" role="Principal Engineer"
       avatar="/ada.jpg" bio="Designs the systems behind the systems."
       socials={[{ platform: 'github', href: '#' }]} cta="Follow" />

     // Slot-composition form (full control):
     <ProfileCard variant="glass">
       <ProfileCard.Avatar src="/ada.jpg">AL</ProfileCard.Avatar>
       <ProfileCard.Name>Ada Lovelace</ProfileCard.Name>
       <ProfileCard.Role>Principal Engineer</ProfileCard.Role>
       <ProfileCard.Bio>Designs the systems behind the systems.</ProfileCard.Bio>
       <ProfileCard.Socials socials={[{ platform: 'github', href: '#' }]} />
       <ProfileCard.Action>Follow</ProfileCard.Action>
     </ProfileCard>
   ════════════════════════════════════════════════════════════════════════ */

/** A social link rendered as an inline-SVG icon button. */
export type SocialPlatform = 'github' | 'twitter' | 'linkedin' | 'dribbble' | 'website';

export interface SocialLink {
  /** Known platform — selects the icon. */
  platform: SocialPlatform;
  /** Destination URL. */
  href: string;
  /** Accessible label (defaults to the platform name). */
  label?: string;
}

export interface ProfileCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  /** One of the 6 designs. */
  variant?: BlockVariant;
  /** Extra className. */
  className?: string;
  /** Extra Tailwind classes (merged last). */
  tw?: string;

  /* —— Data props (used when no children are provided) —— */
  /** Person's name. */
  name?: ReactNode;
  /** Role / title, e.g. "Principal Engineer". */
  role?: ReactNode;
  /** Avatar image URL (falls back to initials from `name`). */
  avatar?: string;
  /** Short bio paragraph. */
  bio?: ReactNode;
  /** Social links rendered as icon buttons. */
  socials?: SocialLink[];
  /** Call-to-action label. */
  cta?: ReactNode;
}

/* ---------------------------------- types --------------------------------- */

export type ProfileSlotProps = SlotProps<HTMLDivElement>;

/** Derive up-to-2-letter initials from a name for the avatar fallback. */
function initialsFrom(name: ReactNode): string {
  if (typeof name !== 'string') return '';
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

/* ---------------------------------- Root ---------------------------------- */

const ProfileCardRoot = forwardRef<HTMLDivElement, ProfileCardProps>(
  function ProfileCard(
    {
      variant = 'elevated',
      className,
      tw,
      children,
      name,
      role,
      avatar,
      bio,
      socials,
      cta,
      ...rest
    },
    ref
  ) {
    const hasChildren = React.Children.count(children) > 0;

    return (
      <BlockVariantContext.Provider value={variant}>
        <div
          ref={ref}
          className={mergeTw(
            'group/card relative flex w-full max-w-sm flex-col items-center gap-3 rounded-2xl p-6 text-center text-fg transition-transform',
            surfaceVariants[variant],
            className,
            tw
          )}
          {...rest}
        >
          {hasChildren ? (
            children
          ) : (
            <>
              <ProfileAvatar src={avatar}>{initialsFrom(name)}</ProfileAvatar>
              {name ? <ProfileName>{name}</ProfileName> : null}
              {role ? <ProfileRole>{role}</ProfileRole> : null}
              {bio ? <ProfileBio>{bio}</ProfileBio> : null}
              {socials?.length ? <ProfileSocials socials={socials} /> : null}
              {cta ? <ProfileAction>{cta}</ProfileAction> : null}
            </>
          )}
        </div>
      </BlockVariantContext.Provider>
    );
  }
);

/* ---------------------------------- Avatar -------------------------------- */

export interface ProfileAvatarProps extends ProfileSlotProps {
  /** Avatar image URL. */
  src?: string;
  /** Alt text for the image. */
  alt?: string;
}

const ProfileAvatar = forwardRef<HTMLDivElement, ProfileAvatarProps>(
  function ProfileCardAvatar({ src, alt, children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    const accented = variant === 'feature' || variant === 'gradient';
    return (
      <Avatar
        ref={ref as React.Ref<HTMLDivElement>}
        size="xl"
        tw={mergeTw(
          'ring-2 ring-offset-2 ring-offset-transparent',
          accented
            ? 'bg-primary/15 text-primary ring-primary/40'
            : 'bg-fg/[0.06] text-fg-muted ring-edge/15',
          className,
          tw
        )}
        {...(rest as Record<string, unknown>)}
      >
        {src ? (
          <img src={src} alt={alt ?? ''} className="h-full w-full object-cover" />
        ) : (
          children
        )}
      </Avatar>
    );
  }
);

/* ----------------------------------- Name --------------------------------- */

const ProfileName = forwardRef<HTMLHeadingElement, SlotProps<HTMLHeadingElement>>(
  function ProfileCardName({ children, className, tw, ...rest }, ref) {
    return (
      <h3
        ref={ref}
        className={mergeTw('mt-1 font-display text-lg font-semibold leading-tight text-fg', className, tw)}
        {...rest}
      >
        {children}
      </h3>
    );
  }
);

/* ----------------------------------- Role --------------------------------- */

const ProfileRole = forwardRef<HTMLParagraphElement, SlotProps<HTMLParagraphElement>>(
  function ProfileCardRole({ children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    return (
      <p
        ref={ref}
        className={mergeTw(
          'text-sm font-medium',
          variant === 'feature' || variant === 'gradient' ? 'text-primary' : 'text-fg-muted',
          className,
          tw
        )}
        {...rest}
      >
        {children}
      </p>
    );
  }
);

/* ----------------------------------- Bio ---------------------------------- */

const ProfileBio = forwardRef<HTMLParagraphElement, SlotProps<HTMLParagraphElement>>(
  function ProfileCardBio({ children, className, tw, ...rest }, ref) {
    return (
      <p
        ref={ref}
        className={mergeTw('text-sm leading-relaxed text-fg-subtle', className, tw)}
        {...rest}
      >
        {children}
      </p>
    );
  }
);

/* --------------------------------- Socials -------------------------------- */

export interface ProfileSocialsProps extends ProfileSlotProps {
  /** Social links rendered as icon buttons. */
  socials?: SocialLink[];
}

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  const common = {
    viewBox: '0 0 24 24',
    'aria-hidden': true,
    className: 'h-[18px] w-[18px]',
  } as const;
  switch (platform) {
    case 'github':
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85l-.01 2.74c0 .27.18.58.69.48A10 10 0 0012 2z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg {...common} fill="currentColor">
          <path d="M18.9 2.3h3.3l-7.2 8.2L23.7 22h-6.6l-5.2-6.8L5.9 22H2.6l7.7-8.8L1.7 2.3h6.8l4.7 6.2 5.7-6.2zm-1.2 17.7h1.8L7.4 4.2H5.5l12.2 15.8z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...common} fill="currentColor">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
        </svg>
      );
    case 'dribbble':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="9.5" />
          <path d="M4.5 8.5c5.5.5 11 0 14.5-3M2.7 13.5C9 12 14 14 17 19M9 3c4 5 5.5 11 5 18" strokeLinecap="round" />
        </svg>
      );
    case 'website':
    default:
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="9.5" />
          <path d="M2.5 12h19M12 2.5c2.8 2.5 4.3 6 4.3 9.5S14.8 19 12 21.5M12 2.5C9.2 5 7.7 8.5 7.7 12s1.5 7 4.3 9.5" strokeLinecap="round" />
        </svg>
      );
  }
}

const ProfileSocials = forwardRef<HTMLDivElement, ProfileSocialsProps>(
  function ProfileCardSocials({ socials, children, className, tw, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={mergeTw('mt-1 flex items-center justify-center gap-1.5', className, tw)}
        {...rest}
      >
        {children ??
          socials?.map((s, i) => (
            <a
              key={`${s.platform}-${i}`}
              href={s.href}
              aria-label={s.label ?? s.platform}
              className="grid h-9 w-9 place-items-center rounded-xl border border-edge/12 bg-fg/[0.04] text-fg-muted transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
            >
              <SocialIcon platform={s.platform} />
            </a>
          ))}
      </div>
    );
  }
);

/* ---------------------------------- Action -------------------------------- */

export interface ProfileActionProps extends SlotProps<HTMLButtonElement> {
  /** Accent (filled) or ghost (outline) styling. Defaults to the variant. */
  tone?: 'accent' | 'ghost';
}

const ProfileAction = forwardRef<HTMLButtonElement, ProfileActionProps>(
  function ProfileCardAction({ tone, children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    const resolved =
      tone ?? (variant === 'feature' || variant === 'gradient' ? 'accent' : 'ghost');
    return (
      <Button
        ref={ref as React.Ref<HTMLButtonElement>}
        fullWidth
        intent="ghost"
        tw={mergeTw(
          'mt-3 rounded-xl',
          resolved === 'accent' ? accentSolid : ghostControl,
          className,
          tw
        )}
        {...(rest as Record<string, unknown>)}
      >
        {children}
      </Button>
    );
  }
);

/* --------------------------------- Export --------------------------------- */

type ProfileCardComponent = typeof ProfileCardRoot & {
  Avatar: typeof ProfileAvatar;
  Name: typeof ProfileName;
  Role: typeof ProfileRole;
  Bio: typeof ProfileBio;
  Socials: typeof ProfileSocials;
  Action: typeof ProfileAction;
};

export const ProfileCard = ProfileCardRoot as ProfileCardComponent;
ProfileCard.Avatar = ProfileAvatar;
ProfileCard.Name = ProfileName;
ProfileCard.Role = ProfileRole;
ProfileCard.Bio = ProfileBio;
ProfileCard.Socials = ProfileSocials;
ProfileCard.Action = ProfileAction;
