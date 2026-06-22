import React, {
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { Avatar } from '../../Avatar';
import { Badge } from '../../Badge';
import {
  mergeTw,
  surfaceVariants,
  accentSoft,
  SlotProps,
  BlockVariant,
  BlockVariantContext,
} from '../_shared';

/* ════════════════════════════════════════════════════════════════════════
   BlogCard — article / post preview tile.
   Composed from library primitives (Badge, Avatar) and semantic tokens,
   exposing the shared 6 designs via `variant` and a compound slot API. Renders
   complete from data props alone, so it works out of the box:

     // Data-prop form (renders a full article preview):
     <BlogCard variant="elevated" image="/cover.jpg" category="Engineering"
       title="Designing themeable systems" excerpt="A field guide to tokens."
       author="Ada Lovelace" authorAvatar="/ada.jpg"
       date="Jun 21, 2026" readTime="6 min read" href="#" />

     // Slot-composition form (full control):
     <BlogCard variant="glass" href="#">
       <BlogCard.Media src="/cover.jpg" alt="Cover" />
       <BlogCard.Body>
         <BlogCard.Category>Engineering</BlogCard.Category>
         <BlogCard.Title>Designing themeable systems</BlogCard.Title>
         <BlogCard.Excerpt>A field guide to tokens.</BlogCard.Excerpt>
         <BlogCard.Meta author="Ada Lovelace" date="Jun 21, 2026" readTime="6 min read" />
       </BlogCard.Body>
     </BlogCard>
   ════════════════════════════════════════════════════════════════════════ */

export interface BlogCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** One of the 6 designs. */
  variant?: BlockVariant;
  /** Extra className. */
  className?: string;
  /** Extra Tailwind classes (merged last). */
  tw?: string;

  /* —— Data props (used when no children are provided) —— */
  /** Cover image URL. */
  image?: string;
  /** Category / tag label. */
  category?: ReactNode;
  /** Article title. */
  title?: ReactNode;
  /** Short excerpt / dek. */
  excerpt?: ReactNode;
  /** Author name. */
  author?: ReactNode;
  /** Author avatar URL (falls back to initials). */
  authorAvatar?: string;
  /** Publish date, e.g. "Jun 21, 2026". */
  date?: ReactNode;
  /** Read-time label, e.g. "6 min read". */
  readTime?: ReactNode;
  /** When set, the whole card becomes a link. */
  href?: string;
}

/* ---------------------------------- types --------------------------------- */

export type BlogSlotProps = SlotProps<HTMLDivElement>;

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

const BlogCardRoot = forwardRef<HTMLDivElement, BlogCardProps>(
  function BlogCard(
    {
      variant = 'elevated',
      className,
      tw,
      children,
      image,
      category,
      title,
      excerpt,
      author,
      authorAvatar,
      date,
      readTime,
      href,
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
            'group/card relative flex w-full max-w-sm flex-col gap-4 overflow-hidden rounded-2xl p-4 text-fg transition-transform',
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
              <BlogMedia src={image} alt={typeof title === 'string' ? title : undefined} />
              <BlogBody>
                {category ? <BlogCategory>{category}</BlogCategory> : null}
                {title ? <BlogTitle href={href}>{title}</BlogTitle> : null}
                {excerpt ? <BlogExcerpt>{excerpt}</BlogExcerpt> : null}
                {author || date || readTime ? (
                  <BlogMeta
                    author={author}
                    authorAvatar={authorAvatar}
                    date={date}
                    readTime={readTime}
                  />
                ) : null}
              </BlogBody>
            </>
          )}
        </div>
      </BlockVariantContext.Provider>
    );
  }
);

/* ---------------------------------- Media --------------------------------- */

export interface BlogMediaProps extends BlogSlotProps {
  /** Image URL. */
  src?: string;
  /** Alt text for the image. */
  alt?: string;
}

const BlogMedia = forwardRef<HTMLDivElement, BlogMediaProps>(
  function BlogCardMedia({ src, alt, children, className, tw, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={mergeTw(
          'relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-edge/10 bg-canvas/40',
          className,
          tw
        )}
        {...rest}
      >
        {children ??
          (src ? (
            <img
              src={src}
              alt={alt ?? ''}
              className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-fg-subtle">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-10 w-10">
                <path
                  d="M3 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6zM3 16l4.5-4.5a2 2 0 012.8 0L15 16M14 13l1.5-1.5a2 2 0 012.8 0L21 14M9 9.5a1 1 0 11-2 0 1 1 0 012 0z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}
      </div>
    );
  }
);

/* ----------------------------------- Body --------------------------------- */

const BlogBody = forwardRef<HTMLDivElement, BlogSlotProps>(
  function BlogCardBody({ children, className, tw, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={mergeTw('flex flex-1 flex-col gap-2.5 px-1', className, tw)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

/* --------------------------------- Category ------------------------------- */

const BlogCategory = forwardRef<HTMLSpanElement, SlotProps<HTMLSpanElement>>(
  function BlogCardCategory({ children, className, tw, ...rest }, ref) {
    return (
      <Badge
        ref={ref as React.Ref<HTMLSpanElement>}
        tw={mergeTw(
          'w-fit uppercase tracking-wider',
          accentSoft,
          className,
          tw
        )}
        {...(rest as Record<string, unknown>)}
      >
        {children}
      </Badge>
    );
  }
);

/* ----------------------------------- Title -------------------------------- */

export interface BlogTitleProps extends SlotProps<HTMLHeadingElement> {
  /** When set, wraps the title in a link with a hover affordance. */
  href?: string;
}

const BlogTitle = forwardRef<HTMLHeadingElement, BlogTitleProps>(
  function BlogCardTitle({ href, children, className, tw, ...rest }, ref) {
    return (
      <h3
        ref={ref}
        className={mergeTw('font-display text-lg font-semibold leading-snug text-fg', className, tw)}
        {...rest}
      >
        {href ? (
          <a
            href={href}
            className="transition-colors before:absolute before:inset-0 hover:text-primary"
          >
            {children}
          </a>
        ) : (
          children
        )}
      </h3>
    );
  }
);

/* ---------------------------------- Excerpt ------------------------------- */

const BlogExcerpt = forwardRef<HTMLParagraphElement, SlotProps<HTMLParagraphElement>>(
  function BlogCardExcerpt({ children, className, tw, ...rest }, ref) {
    return (
      <p
        ref={ref}
        className={mergeTw('text-sm leading-relaxed text-fg-muted', className, tw)}
        {...rest}
      >
        {children}
      </p>
    );
  }
);

/* ----------------------------------- Meta --------------------------------- */

export interface BlogMetaProps extends BlogSlotProps {
  /** Author name. */
  author?: ReactNode;
  /** Author avatar URL (falls back to initials). */
  authorAvatar?: string;
  /** Publish date. */
  date?: ReactNode;
  /** Read-time label. */
  readTime?: ReactNode;
}

const BlogMeta = forwardRef<HTMLDivElement, BlogMetaProps>(
  function BlogCardMeta(
    { author, authorAvatar, date, readTime, children, className, tw, ...rest },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={mergeTw(
          'mt-auto flex items-center gap-2.5 border-t border-edge/10 pt-3 text-xs text-fg-subtle',
          className,
          tw
        )}
        {...rest}
      >
        {children ?? (
          <>
            {author ? (
              <span className="flex items-center gap-2">
                <Avatar size="xs" tw="bg-fg/[0.06] text-fg-muted">
                  {authorAvatar ? (
                    <img
                      src={authorAvatar}
                      alt={typeof author === 'string' ? author : ''}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initialsFrom(author)
                  )}
                </Avatar>
                <span className="font-medium text-fg-muted">{author}</span>
              </span>
            ) : null}
            {(author && (date || readTime)) ? (
              <span aria-hidden="true" className="text-fg-subtle/60">
                ·
              </span>
            ) : null}
            {date ? <span>{date}</span> : null}
            {date && readTime ? (
              <span aria-hidden="true" className="text-fg-subtle/60">
                ·
              </span>
            ) : null}
            {readTime ? <span>{readTime}</span> : null}
          </>
        )}
      </div>
    );
  }
);

/* --------------------------------- Export --------------------------------- */

type BlogCardComponent = typeof BlogCardRoot & {
  Media: typeof BlogMedia;
  Body: typeof BlogBody;
  Category: typeof BlogCategory;
  Title: typeof BlogTitle;
  Excerpt: typeof BlogExcerpt;
  Meta: typeof BlogMeta;
};

export const BlogCard = BlogCardRoot as BlogCardComponent;
BlogCard.Media = BlogMedia;
BlogCard.Body = BlogBody;
BlogCard.Category = BlogCategory;
BlogCard.Title = BlogTitle;
BlogCard.Excerpt = BlogExcerpt;
BlogCard.Meta = BlogMeta;
