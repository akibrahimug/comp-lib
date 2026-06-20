import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { mergeTw } from '../core/mergeTw';
/**
 * Keyboard key hint.
 *
 * @example
 * Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search.
 */
export const Kbd = forwardRef(function Kbd({ className, tw, children, ...props }, ref) {
    return (_jsx("kbd", { ref: ref, className: mergeTw('inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded border border-edge/20 bg-fg/[0.06] px-1.5', 'font-mono text-[11px] font-medium text-fg-muted', className, tw), ...props, children: children }));
});
