import React, { type HTMLAttributes } from 'react';
export type SkeletonShape = 'text' | 'circle' | 'rect' | 'rounded';
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    shape?: SkeletonShape;
    /** Width — number (px) or any CSS length */
    width?: number | string;
    /** Height — number (px) or any CSS length */
    height?: number | string;
    /** Number of stacked lines (text shape only) */
    lines?: number;
    className?: string;
    tw?: string;
}
/**
 * Loading placeholder with a moving shimmer. Use `lines` for multi-line text
 * blocks, or `shape` + width/height for avatars, thumbnails and cards.
 *
 * @example
 * <Skeleton shape="circle" width={40} height={40} />
 * <Skeleton lines={3} />
 */
export declare const Skeleton: React.ForwardRefExoticComponent<SkeletonProps & React.RefAttributes<HTMLDivElement>>;
