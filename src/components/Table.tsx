import React, {
  createContext,
  useContext,
  forwardRef,
  type HTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react';
import { mergeTw } from '../core/mergeTw';

interface TableContextValue {
  striped?: boolean;
  hoverable?: boolean;
  dense?: boolean;
}
const TableContext = createContext<TableContextValue>({});

/* ---------------------------------- Root ---------------------------------- */

export interface TableRootProps extends HTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  hoverable?: boolean;
  dense?: boolean;
  className?: string;
  tw?: string;
}

const TableRoot = forwardRef<HTMLTableElement, TableRootProps>(function TableRoot(
  { striped, hoverable = true, dense, className, tw, children, ...props },
  ref
) {
  return (
    <TableContext.Provider value={{ striped, hoverable, dense }}>
      <div className="w-full overflow-x-auto">
        <table ref={ref} className={mergeTw('w-full border-collapse text-left text-sm', className, tw)} {...props}>
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
});

/* -------------------------------- Sections -------------------------------- */

const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement> & { tw?: string }>(
  function TableHeader({ className, tw, ...props }, ref) {
    return <thead ref={ref} className={mergeTw('border-b border-gray-200', className, tw)} {...props} />;
  }
);

const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement> & { tw?: string }>(
  function TableBody({ className, tw, ...props }, ref) {
    return <tbody ref={ref} className={mergeTw('divide-y divide-gray-100', className, tw)} {...props} />;
  }
);

const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement> & { tw?: string }>(
  function TableFooter({ className, tw, ...props }, ref) {
    return (
      <tfoot ref={ref} className={mergeTw('border-t border-gray-200 bg-gray-50 font-medium', className, tw)} {...props} />
    );
  }
);

/* ---------------------------------- Row ----------------------------------- */

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Visually mark the row as selected */
  selected?: boolean;
  tw?: string;
}

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { selected, className, tw, ...props },
  ref
) {
  const { striped, hoverable } = useContext(TableContext);
  return (
    <tr
      ref={ref}
      data-selected={selected || undefined}
      className={mergeTw(
        'transition-colors',
        striped && 'even:bg-gray-50/70',
        hoverable && 'hover:bg-gray-50',
        selected && 'bg-brand-50',
        className,
        tw
      )}
      {...props}
    />
  );
});

/* --------------------------------- Head ----------------------------------- */

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  tw?: string;
}

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  { className, tw, ...props },
  ref
) {
  const { dense } = useContext(TableContext);
  return (
    <th
      ref={ref}
      scope="col"
      className={mergeTw(
        'whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-gray-500',
        dense ? 'px-3 py-2' : 'px-4 py-3',
        className,
        tw
      )}
      {...props}
    />
  );
});

/* --------------------------------- Cell ----------------------------------- */

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  tw?: string;
}

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { className, tw, ...props },
  ref
) {
  const { dense } = useContext(TableContext);
  return (
    <td
      ref={ref}
      className={mergeTw('align-middle text-gray-700', dense ? 'px-3 py-2' : 'px-4 py-3', className, tw)}
      {...props}
    />
  );
});

/* -------------------------------- Caption --------------------------------- */

const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement> & { tw?: string }>(
  function TableCaption({ className, tw, ...props }, ref) {
    return <caption ref={ref} className={mergeTw('mt-3 text-xs text-gray-500', className, tw)} {...props} />;
  }
);

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
