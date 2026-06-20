import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { mergeTw } from '../core/mergeTw';
const DOTS = '…';
function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
/** Build the page list with ellipses, mirroring common pagination UIs. */
function usePaginationRange(page, count, siblingCount) {
    const totalNumbers = siblingCount * 2 + 5; // first, last, current, 2 dots
    if (totalNumbers >= count)
        return range(1, count);
    const leftSibling = Math.max(page - siblingCount, 1);
    const rightSibling = Math.min(page + siblingCount, count);
    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < count - 1;
    if (!showLeftDots && showRightDots) {
        return [...range(1, 3 + 2 * siblingCount), DOTS, count];
    }
    if (showLeftDots && !showRightDots) {
        return [1, DOTS, ...range(count - (2 + 2 * siblingCount), count)];
    }
    return [1, DOTS, ...range(leftSibling, rightSibling), DOTS, count];
}
const arrow = (dir) => (_jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: _jsx("path", { d: dir === 'prev' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6', stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }));
const cellBase = 'inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 disabled:pointer-events-none disabled:opacity-40';
/**
 * Pagination control with a smart ellipsis range. Fully controlled.
 *
 * @example
 * <Pagination page={page} count={12} onChange={setPage} />
 */
export const Pagination = forwardRef(function Pagination({ page, count, onChange, siblingCount = 1, showEdges = true, className, tw, ...props }, ref) {
    const items = usePaginationRange(page, count, siblingCount);
    const go = (p) => onChange(Math.min(Math.max(1, p), count));
    return (_jsxs("nav", { ref: ref, "aria-label": "Pagination", className: mergeTw('flex items-center gap-1', className, tw), ...props, children: [showEdges && (_jsx("button", { type: "button", onClick: () => go(page - 1), disabled: page <= 1, "aria-label": "Previous page", className: mergeTw(cellBase, 'text-gray-600 hover:bg-gray-100'), children: arrow('prev') })), items.map((item, i) => item === DOTS ? (_jsx("span", { className: "inline-flex h-9 min-w-9 items-center justify-center text-gray-400", children: DOTS }, `dots-${i}`)) : (_jsx("button", { type: "button", onClick: () => go(item), "aria-current": item === page ? 'page' : undefined, className: mergeTw(cellBase, item === page
                    ? 'bg-brand-600 text-white shadow-sm hover:bg-brand-700'
                    : 'text-gray-700 hover:bg-gray-100'), children: item }, item))), showEdges && (_jsx("button", { type: "button", onClick: () => go(page + 1), disabled: page >= count, "aria-label": "Next page", className: mergeTw(cellBase, 'text-gray-600 hover:bg-gray-100'), children: arrow('next') }))] }));
});
