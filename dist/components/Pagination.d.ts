import React, { type HTMLAttributes } from 'react';
export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
    /** Current page (1-indexed) */
    page: number;
    /** Total number of pages */
    count: number;
    /** Called with the next page when a control is activated */
    onChange: (page: number) => void;
    /** How many pages to show around the current page */
    siblingCount?: number;
    /** Show the Previous / Next arrows */
    showEdges?: boolean;
    className?: string;
    tw?: string;
}
/**
 * Pagination control with a smart ellipsis range. Fully controlled.
 *
 * @example
 * <Pagination page={page} count={12} onChange={setPage} />
 */
export declare const Pagination: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<HTMLElement>>;
