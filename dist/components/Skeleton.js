import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { mergeTw } from '../core/mergeTw';
const shapes = {
    text: 'h-4 rounded',
    circle: 'rounded-full',
    rect: 'rounded-none',
    rounded: 'rounded-xl',
};
const shimmerClass = 'relative overflow-hidden bg-gray-200/80 before:absolute before:inset-0 ' +
    'before:-translate-x-full before:animate-shimmer ' +
    'before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';
const toLen = (v) => (typeof v === 'number' ? `${v}px` : v);
/**
 * Loading placeholder with a moving shimmer. Use `lines` for multi-line text
 * blocks, or `shape` + width/height for avatars, thumbnails and cards.
 *
 * @example
 * <Skeleton shape="circle" width={40} height={40} />
 * <Skeleton lines={3} />
 */
export const Skeleton = forwardRef(function Skeleton({ shape = 'text', width, height, lines = 1, className, tw, style, ...props }, ref) {
    if (shape === 'text' && lines > 1) {
        return (_jsx("div", { ref: ref, className: mergeTw('flex flex-col gap-2', className, tw), "aria-hidden": "true", ...props, children: Array.from({ length: lines }).map((_, i) => (_jsx("div", { className: mergeTw(shapes.text, shimmerClass), style: { width: i === lines - 1 ? '70%' : '100%' } }, i))) }));
    }
    return (_jsx("div", { ref: ref, "aria-hidden": "true", className: mergeTw(shapes[shape], shimmerClass, className, tw), style: { width: toLen(width), height: toLen(height), ...style }, ...props }));
});
