type VariantConfig = Record<string, Record<string, string>>;

export type InferVariantProps<Cfg extends VariantConfig> = {
  [K in keyof Cfg]?: keyof Cfg[K];
};

export interface TVOptions<Cfg extends VariantConfig> {
  base?: string;
  variants?: Cfg;
  defaultVariants?: {
    [K in keyof Cfg]?: keyof Cfg[K];
  };
  compoundVariants?: Array<Partial<InferVariantProps<Cfg>> & { class: string }>;
}

export function tv<Cfg extends VariantConfig>(opts: TVOptions<Cfg>) {
  const {
    base = "",
    variants = {} as Cfg,
    defaultVariants = {},
    compoundVariants = [],
  } = opts;
  return function getClassNames(
    variantProps?: Partial<InferVariantProps<Cfg>> & {
      tw?: string;
      className?: string;
    }
  ) {
    const vp = { ...defaultVariants, ...(variantProps || {}) } as any;
    const variantClasses = Object.entries(variants).map(([k, map]) => {
      const val = vp[k];
      return val != null ? (map as any)[val] ?? "" : "";
    });
    const compound = compoundVariants
      .filter((rule) =>
        Object.entries(rule).every(([rk, rv]) =>
          rk === "class" ? true : vp[rk] === rv
        )
      )
      .map((r) => r.class);
    const { className, tw } = vp;
    return [base, ...variantClasses, ...compound, className, tw]
      .filter(Boolean)
      .join(" ");
  };
}
