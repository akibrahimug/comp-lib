import React, { type ElementType, type ComponentPropsWithoutRef, type PropsWithChildren } from 'react';
import { type TVOptions, type InferVariantProps } from './tv';
type AsProp<C extends ElementType> = {
    as?: C;
};
type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);
type PolymorphicProps<C extends ElementType, P> = PropsWithChildren<P & AsProp<C>> & Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, P>> & {
    className?: string;
    tw?: string;
};
export type PolymorphicComponent<P, D extends ElementType> = <C extends ElementType = D>(props: PolymorphicProps<C, P> & {
    ref?: any;
}) => React.ReactElement | null;
export interface CreateComponentOptions<Cfg extends Record<string, any>, D extends ElementType> extends TVOptions<any> {
    as?: D;
    displayName?: string;
}
export declare function createComponent<Cfg extends Record<string, any>, D extends ElementType = 'div'>(opts: CreateComponentOptions<Cfg, D>): PolymorphicComponent<InferVariantProps<any>, D>;
export {};
