import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, forwardRef, } from 'react';
import { mergeTw } from '../core/mergeTw';
const TableContext = createContext({});
const TableRoot = forwardRef(function TableRoot({ striped, hoverable = true, dense, className, tw, children, ...props }, ref) {
    return (_jsx(TableContext.Provider, { value: { striped, hoverable, dense }, children: _jsx("div", { className: "w-full overflow-x-auto", children: _jsx("table", { ref: ref, className: mergeTw('w-full border-collapse text-left text-sm', className, tw), ...props, children: children }) }) }));
});
/* -------------------------------- Sections -------------------------------- */
const TableHeader = forwardRef(function TableHeader({ className, tw, ...props }, ref) {
    return _jsx("thead", { ref: ref, className: mergeTw('border-b border-gray-200', className, tw), ...props });
});
const TableBody = forwardRef(function TableBody({ className, tw, ...props }, ref) {
    return _jsx("tbody", { ref: ref, className: mergeTw('divide-y divide-gray-100', className, tw), ...props });
});
const TableFooter = forwardRef(function TableFooter({ className, tw, ...props }, ref) {
    return (_jsx("tfoot", { ref: ref, className: mergeTw('border-t border-gray-200 bg-gray-50 font-medium', className, tw), ...props }));
});
const TableRow = forwardRef(function TableRow({ selected, className, tw, ...props }, ref) {
    const { striped, hoverable } = useContext(TableContext);
    return (_jsx("tr", { ref: ref, "data-selected": selected || undefined, className: mergeTw('transition-colors', striped && 'even:bg-gray-50/70', hoverable && 'hover:bg-gray-50', selected && 'bg-brand-50', className, tw), ...props }));
});
const TableHead = forwardRef(function TableHead({ className, tw, ...props }, ref) {
    const { dense } = useContext(TableContext);
    return (_jsx("th", { ref: ref, scope: "col", className: mergeTw('whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-gray-500', dense ? 'px-3 py-2' : 'px-4 py-3', className, tw), ...props }));
});
const TableCell = forwardRef(function TableCell({ className, tw, ...props }, ref) {
    const { dense } = useContext(TableContext);
    return (_jsx("td", { ref: ref, className: mergeTw('align-middle text-gray-700', dense ? 'px-3 py-2' : 'px-4 py-3', className, tw), ...props }));
});
/* -------------------------------- Caption --------------------------------- */
const TableCaption = forwardRef(function TableCaption({ className, tw, ...props }, ref) {
    return _jsx("caption", { ref: ref, className: mergeTw('mt-3 text-xs text-gray-500', className, tw), ...props });
});
/* --------------------------------- Export --------------------------------- */
/**
 * Compound data table. `striped`, `hoverable` and `dense` on Root cascade to
 * rows/cells via context.
 *
 * @example
 * <Table.Root hoverable>
 *   <Table.Header><Table.Row><Table.Head>Name</Table.Head></Table.Row></Table.Header>
 *   <Table.Body><Table.Row><Table.Cell>Ada</Table.Cell></Table.Row></Table.Body>
 * </Table.Root>
 */
export const Table = {
    Root: TableRoot,
    Header: TableHeader,
    Body: TableBody,
    Footer: TableFooter,
    Row: TableRow,
    Head: TableHead,
    Cell: TableCell,
    Caption: TableCaption,
};
