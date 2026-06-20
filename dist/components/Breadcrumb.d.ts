import React, { type ReactNode, type HTMLAttributes, type AnchorHTMLAttributes } from 'react';
export interface BreadcrumbRootProps extends HTMLAttributes<HTMLElement> {
    className?: string;
    tw?: string;
}
export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
    className?: string;
    tw?: string;
}
export interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    className?: string;
    tw?: string;
}
export interface BreadcrumbPageProps extends HTMLAttributes<HTMLSpanElement> {
    className?: string;
    tw?: string;
}
export interface BreadcrumbSeparatorProps extends HTMLAttributes<HTMLLIElement> {
    className?: string;
    tw?: string;
    children?: ReactNode;
}
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
export declare const Breadcrumb: {
    Root: React.ForwardRefExoticComponent<BreadcrumbRootProps & React.RefAttributes<HTMLElement>>;
    Item: React.ForwardRefExoticComponent<BreadcrumbItemProps & React.RefAttributes<HTMLLIElement>>;
    Link: React.ForwardRefExoticComponent<BreadcrumbLinkProps & React.RefAttributes<HTMLAnchorElement>>;
    Page: React.ForwardRefExoticComponent<BreadcrumbPageProps & React.RefAttributes<HTMLSpanElement>>;
    Separator: React.ForwardRefExoticComponent<BreadcrumbSeparatorProps & React.RefAttributes<HTMLLIElement>>;
};
