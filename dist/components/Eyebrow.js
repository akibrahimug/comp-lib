import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { mergeTw } from '../core/mergeTw';
/**
 * Eyebrow / overline label — a small uppercase monospace kicker above headings.
 *
 * @example
 * <Eyebrow>Why us</Eyebrow>
 */
export const Eyebrow = forwardRef(function Eyebrow({ dot = true, dotTw = 'bg-accent', className, tw, children, ...props }, ref) {
    return (_jsxs("span", { ref: ref, className: mergeTw('inline-flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-fg-muted', className, tw), ...props, children: [dot && (_jsxs("span", { className: "relative flex h-1.5 w-1.5", children: [_jsx("span", { className: mergeTw('absolute inline-flex h-full w-full rounded-full opacity-70', dotTw) }), _jsx("span", { className: mergeTw('relative inline-flex h-1.5 w-1.5 rounded-full', dotTw) })] })), children] }));
});
