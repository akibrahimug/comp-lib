export function tv(opts) {
    const { base = "", variants = {}, defaultVariants = {}, compoundVariants = [], } = opts;
    return function getClassNames(variantProps) {
        const vp = { ...defaultVariants, ...(variantProps || {}) };
        const variantClasses = Object.entries(variants).map(([k, map]) => {
            const val = vp[k];
            return val != null ? map[val] ?? "" : "";
        });
        const compound = compoundVariants
            .filter((rule) => Object.entries(rule).every(([rk, rv]) => rk === "class" ? true : vp[rk] === rv))
            .map((r) => r.class);
        const { className, tw } = vp;
        return [base, ...variantClasses, ...compound, className, tw]
            .filter(Boolean)
            .join(" ");
    };
}
