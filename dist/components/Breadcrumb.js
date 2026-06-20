import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { mergeTw } from '../core/mergeTw';
const BreadcrumbRoot = forwardRef(function BreadcrumbRoot({ className, tw, children, ...props }, ref) {
    return (_jsx("nav", { ref: ref, "aria-label": "Breadcrumb", className: mergeTw(className, tw), ...props, children: _jsx("ol", { className: "flex flex-wrap items-center gap-1.5 text-sm text-gray-500", children: children }) }));
});
const BreadcrumbItem = forwardRef(function BreadcrumbItem({ className, tw, children, ...props }, ref) {
    return (_jsx("li", { ref: ref, className: mergeTw('inline-flex items-center gap-1.5', className, tw), ...props, children: children }));
});
const BreadcrumbLink = forwardRef(function BreadcrumbLink({ className, tw, children, ...props }, ref) {
    return (_jsx("a", { ref: ref, className: mergeTw('rounded transition-colors hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600', className, tw), ...props, children: children }));
});
/** The current (non-navigable) page. */
const BreadcrumbPage = forwardRef(function BreadcrumbPage({ className, tw, children, ...props }, ref) {
    return (_jsx("span", { ref: ref, role: "link", "aria-disabled": "true", "aria-current": "page", className: mergeTw('font-medium text-gray-900', className, tw), ...props, children: children }));
});
const BreadcrumbSeparator = forwardRef(function BreadcrumbSeparator({ className, tw, children, ...props }, ref) {
    return (_jsx("li", { ref: ref, role: "presentation", "aria-hidden": "true", className: mergeTw('text-gray-300 [&>svg]:h-3.5 [&>svg]:w-3.5', className, tw), ...props, children: children ?? (_jsx("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: _jsx("path", { d: "M9 18l6-6-6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })) }));
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
