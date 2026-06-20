import React, { forwardRef, type ReactNode, type HTMLAttributes, type AnchorHTMLAttributes } from 'react';
import { mergeTw } from '../core/mergeTw';

/* ---------------------------------- Root ---------------------------------- */

export interface BreadcrumbRootProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  tw?: string;
}

const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbRootProps>(function BreadcrumbRoot(
  { className, tw, children, ...props },
  ref
) {
  return (
    <nav ref={ref} aria-label="Breadcrumb" className={mergeTw(className, tw)} {...props}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">{children}</ol>
    </nav>
  );
});

/* ---------------------------------- Item ---------------------------------- */

export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
  className?: string;
  tw?: string;
}

const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(function BreadcrumbItem(
  { className, tw, children, ...props },
  ref
) {
  return (
    <li ref={ref} className={mergeTw('inline-flex items-center gap-1.5', className, tw)} {...props}>
      {children}
    </li>
  );
});

/* ---------------------------------- Link ---------------------------------- */

export interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  tw?: string;
}

const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(function BreadcrumbLink(
  { className, tw, children, ...props },
  ref
) {
  return (
    <a
      ref={ref}
      className={mergeTw(
        'rounded transition-colors hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600',
        className,
        tw
      )}
      {...props}
    >
      {children}
    </a>
  );
});

/* --------------------------------- Page ----------------------------------- */

export interface BreadcrumbPageProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
  tw?: string;
}

/** The current (non-navigable) page. */
const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(function BreadcrumbPage(
  { className, tw, children, ...props },
  ref
) {
  return (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={mergeTw('font-medium text-gray-900', className, tw)}
      {...props}
    >
      {children}
    </span>
  );
});

/* ------------------------------- Separator -------------------------------- */

export interface BreadcrumbSeparatorProps extends HTMLAttributes<HTMLLIElement> {
  className?: string;
  tw?: string;
  children?: ReactNode;
}

const BreadcrumbSeparator = forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(function BreadcrumbSeparator(
  { className, tw, children, ...props },
  ref
) {
  return (
    <li
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={mergeTw('text-gray-300 [&>svg]:h-3.5 [&>svg]:w-3.5', className, tw)}
      {...props}
    >
      {children ?? (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </li>
  );
});

/* --------------------------------- Export --------------------------------- */

/**
 * Breadcrumb navigation. Compose with Link for navigable crumbs, Page for the
 * current page, and Separator between them.
 *
 * @example
 * <Breadcrumb.Root>
 *   <Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link></Breadcrumb.Item>
 *   <Breadcrumb.Separator />
 *   <Breadcrumb.Item><Breadcrumb.Page>Settings</Breadcrumb.Page></Breadcrumb.Item>
 * </Breadcrumb.Root>
 */
export const Breadcrumb = {
  Root: BreadcrumbRoot,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Page: BreadcrumbPage,
  Separator: BreadcrumbSeparator,
};
