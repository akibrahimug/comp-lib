import React, { forwardRef, type ElementType, type ComponentPropsWithoutRef, type PropsWithChildren } from 'react';
import { tv, type TVOptions, type InferVariantProps } from './tv';
import { mergeTw } from './mergeTw';

type AsProp<C extends ElementType> = { as?: C };
type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicProps<C extends ElementType, P> = PropsWithChildren<P & AsProp<C>> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, P>> & {
    className?: string;
    tw?: string;
  };

export type PolymorphicComponent<P, D extends ElementType> = <C extends ElementType = D>(
  props: PolymorphicProps<C, P> & { ref?: any }
) => React.ReactElement | null;

export interface CreateComponentOptions<Cfg extends Record<string, any>, D extends ElementType> extends TVOptions<any> {
  as?: D;
  displayName?: string;
}

export function createComponent<Cfg extends Record<string, any>, D extends ElementType = 'div'>(
  opts: CreateComponentOptions<Cfg, D>
): PolymorphicComponent<InferVariantProps<any>, D> {
  const { as, displayName } = opts;
  const getClass = tv(opts as any);
  const Comp = forwardRef<any, any>(function Comp({ as: As = (as as any) || 'div', className, tw, children, ...rest }, ref) {
    const cls = mergeTw(getClass({ ...(rest as any), className, tw }));
    // @ts-expect-error polymorphic
    return <As ref={ref} className={cls} {...rest}>{children}</As>;
  });
  (Comp as any).displayName = displayName || 'Component';
  return Comp as any;
}
