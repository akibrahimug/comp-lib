import React, { ElementType, PropsWithChildren, ComponentPropsWithoutRef } from 'react';

declare function cx(...parts: Array<string | undefined | false | null>): string;

declare function mergeTw(...classes: Array<string | undefined | null | false>): string;

type VariantConfig = Record<string, Record<string | number | boolean, string>>;
type InferVariantProps<Cfg extends VariantConfig> = {
    [K in keyof Cfg]?: keyof Cfg[K] extends string | number | boolean ? keyof Cfg[K] : never;
} & {
    [dataAttr: `data-${string}`]: any;
};
interface TVOptions<Cfg extends VariantConfig> {
    base?: string;
    variants?: Cfg;
    defaultVariants?: Partial<InferVariantProps<Cfg>>;
    compoundVariants?: Array<Partial<InferVariantProps<Cfg>> & {
        class: string;
    }>;
}
declare function tv<Cfg extends VariantConfig>(opts: TVOptions<Cfg>): (variantProps?: Partial<InferVariantProps<Cfg>> & {
    tw?: string;
    className?: string;
}) => string;

type AsProp<C extends ElementType> = {
    as?: C;
};
type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);
type PolymorphicProps<C extends ElementType, P> = PropsWithChildren<P & AsProp<C>> & Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, P>> & {
    className?: string;
    tw?: string;
};
type PolymorphicComponent<P, D extends ElementType> = <C extends ElementType = D>(props: PolymorphicProps<C, P> & {
    ref?: any;
}) => React.ReactElement | null;
interface CreateComponentOptions<Cfg extends Record<string, any>, D extends ElementType> extends TVOptions<any> {
    as?: D;
    displayName?: string;
}
declare function createComponent<Cfg extends Record<string, any>, D extends ElementType = 'div'>(opts: CreateComponentOptions<Cfg, D>): PolymorphicComponent<InferVariantProps<any>, D>;

type SlotConfig = {
    [slotName: string]: TVOptions<any>;
};
declare function createSlots<SCfg extends SlotConfig>(slots: SCfg, opts?: {
    displayName?: string;
    as?: ElementType;
}): {
    Root: any;
} & Record<Capitalize<Exclude<keyof SCfg, "root"> & string>, any>;

declare const Button: PolymorphicComponent<InferVariantProps<any>, "button">;

declare const Card: {
    Root: any;
} & Record<"Description" | "Footer" | "Header" | "Title" | "Content", any>;

export { Button, Card, createComponent, createSlots, cx, mergeTw, tv };
export type { CreateComponentOptions, InferVariantProps, PolymorphicComponent, TVOptions };
