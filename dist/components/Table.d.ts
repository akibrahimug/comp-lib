import React, { type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';
export interface TableRootProps extends HTMLAttributes<HTMLTableElement> {
    striped?: boolean;
    hoverable?: boolean;
    dense?: boolean;
    className?: string;
    tw?: string;
}
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
    /** Visually mark the row as selected */
    selected?: boolean;
    tw?: string;
}
export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
    tw?: string;
}
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
    tw?: string;
}
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
export declare const Table: {
    Root: React.ForwardRefExoticComponent<TableRootProps & React.RefAttributes<HTMLTableElement>>;
    Header: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & {
        tw?: string;
    } & React.RefAttributes<HTMLTableSectionElement>>;
    Body: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & {
        tw?: string;
    } & React.RefAttributes<HTMLTableSectionElement>>;
    Footer: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & {
        tw?: string;
    } & React.RefAttributes<HTMLTableSectionElement>>;
    Row: React.ForwardRefExoticComponent<TableRowProps & React.RefAttributes<HTMLTableRowElement>>;
    Head: React.ForwardRefExoticComponent<TableHeadProps & React.RefAttributes<HTMLTableCellElement>>;
    Cell: React.ForwardRefExoticComponent<TableCellProps & React.RefAttributes<HTMLTableCellElement>>;
    Caption: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableCaptionElement> & {
        tw?: string;
    } & React.RefAttributes<HTMLTableCaptionElement>>;
};
