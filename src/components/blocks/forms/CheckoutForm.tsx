import React, {
  forwardRef,
  useState,
  type ReactNode,
  type HTMLAttributes,
  type FormEvent,
} from 'react';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { Select } from '../../Select';
import {
  mergeTw,
  accentSolid,
  ghostControl,
  inputSurface,
  SlotProps,
  BlockVariantContext,
} from '../_shared';

/* ════════════════════════════════════════════════════════════════════════
   CheckoutForm — pre-assembled, themeable checkout flow.
   Composed from library primitives (Input, Select, Button) and semantic
   tokens. 6 layout designs via `variant`, contact / shipping / payment
   sections, and an order-summary panel with line items + total. Renders a
   complete checkout out of the box.

     // Data-prop form:
     <CheckoutForm variant="twoColumn"
       items={[{ name: 'Aero Runner', price: 129, qty: 1 }]}
       shipping={9} />

     // Slot-composition form:
     <CheckoutForm variant="card">
       <CheckoutForm.Section title="Contact"> … </CheckoutForm.Section>
       <CheckoutForm.Summary items={items} />
     </CheckoutForm>
   ════════════════════════════════════════════════════════════════════════ */

export type CheckoutFormVariant =
  | 'single'
  | 'twoColumn'
  | 'steps'
  | 'card'
  | 'glass'
  | 'compact';

export const CHECKOUTFORM_VARIANTS: CheckoutFormVariant[] = [
  'single',
  'twoColumn',
  'steps',
  'card',
  'glass',
  'compact',
];

export interface LineItem {
  name: ReactNode;
  price: number;
  qty?: number;
  image?: string;
}

export interface CheckoutFormProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onSubmit'> {
  /** One of the 6 layout designs. */
  variant?: CheckoutFormVariant;
  className?: string;
  tw?: string;

  /* —— Data props (used when no children are provided) —— */
  /** Submit handler — receives the native event (default-prevented). */
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  /** Order line items shown in the summary. */
  items?: LineItem[];
  /** Flat shipping cost. */
  shipping?: number;
  /** Currency symbol. */
  currency?: string;
}

/* ──────────────────────────── Surfaces ──────────────────────────────────── */

const surfaces: Record<CheckoutFormVariant, string> = {
  single: 'bg-elevated border border-edge/10 shadow-luxe-sm',
  twoColumn: 'bg-transparent',
  steps: 'bg-elevated border border-edge/10 shadow-luxe-sm',
  card: 'bg-panel/80 border border-edge/12 shadow-luxe-sm backdrop-blur-xl',
  glass: 'glass',
  compact: 'bg-elevated border border-edge/10 shadow-luxe-sm',
};

const DEFAULT_ITEMS: LineItem[] = [
  { name: 'Aero Runner — Carbon', price: 129, qty: 1 },
  { name: 'Trail Socks (3-pack)', price: 24, qty: 2 },
];

function money(n: number, currency: string) {
  return `${currency}${n.toFixed(2)}`;
}

/* ----------------------------------- Field -------------------------------- */

function field(extra?: string) {
  return mergeTw(inputSurface, 'h-11 rounded-xl', extra);
}

export interface CheckoutFieldProps extends Omit<SlotProps, 'title'> {
  label?: ReactNode;
}

const CheckoutField = forwardRef<HTMLDivElement, CheckoutFieldProps>(function CheckoutField(
  { label, children, className, tw, ...rest },
  ref
) {
  return (
    <div ref={ref} className={mergeTw('w-full', className, tw)} {...rest}>
      {label ? <span className="mb-1.5 block text-sm font-medium text-fg-muted">{label}</span> : null}
      {children}
    </div>
  );
});

/* ----------------------------------- Section ------------------------------ */

export interface CheckoutSectionProps extends Omit<SlotProps, 'title'> {
  /** Section heading. */
  title?: ReactNode;
  /** Step index shown as a numbered badge. */
  step?: number;
}

const CheckoutSection = forwardRef<HTMLElement, CheckoutSectionProps>(function CheckoutSection(
  { title, step, children, className, tw, ...rest },
  ref
) {
  return (
    <section ref={ref as never} className={mergeTw('flex flex-col gap-4', className, tw)} {...(rest as Record<string, unknown>)}>
      {title ? (
        <h3 className="flex items-center gap-2.5 font-display text-base font-semibold tracking-tight text-fg">
          {typeof step === 'number' ? (
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/12 text-xs font-semibold text-primary">
              {step}
            </span>
          ) : null}
          {title}
        </h3>
      ) : null}
      {children}
    </section>
  );
});

/* ------------------------------ Default sections -------------------------- */

function ContactSection({ step }: { step?: number }) {
  return (
    <CheckoutSection title="Contact" step={step}>
      <CheckoutField label="Email">
        <Input type="email" name="email" placeholder="you@example.com" autoComplete="email" tw={field()} />
      </CheckoutField>
    </CheckoutSection>
  );
}

function ShippingSection({ step }: { step?: number }) {
  return (
    <CheckoutSection title="Shipping" step={step}>
      <div className="grid gap-4 sm:grid-cols-2">
        <CheckoutField label="First name">
          <Input name="firstName" autoComplete="given-name" tw={field()} />
        </CheckoutField>
        <CheckoutField label="Last name">
          <Input name="lastName" autoComplete="family-name" tw={field()} />
        </CheckoutField>
      </div>
      <CheckoutField label="Address">
        <Input name="address" placeholder="500 Market St" autoComplete="street-address" tw={field()} />
      </CheckoutField>
      <div className="grid gap-4 sm:grid-cols-3">
        <CheckoutField label="City">
          <Input name="city" autoComplete="address-level2" tw={field()} />
        </CheckoutField>
        <CheckoutField label="ZIP">
          <Input name="zip" autoComplete="postal-code" tw={field()} />
        </CheckoutField>
        <CheckoutField label="Country">
          <Select name="country" defaultValue="us" tw={field('bg-elevated/70')}>
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="uk">United Kingdom</option>
          </Select>
        </CheckoutField>
      </div>
    </CheckoutSection>
  );
}

function PaymentSection({ step }: { step?: number }) {
  return (
    <CheckoutSection title="Payment" step={step}>
      <CheckoutField label="Card number">
        <Input name="card" placeholder="1234 5678 9012 3456" inputMode="numeric" autoComplete="cc-number" tw={field()} />
      </CheckoutField>
      <div className="grid gap-4 sm:grid-cols-2">
        <CheckoutField label="Expiry">
          <Input name="expiry" placeholder="MM / YY" autoComplete="cc-exp" tw={field()} />
        </CheckoutField>
        <CheckoutField label="CVC">
          <Input name="cvc" placeholder="123" inputMode="numeric" autoComplete="cc-csc" tw={field()} />
        </CheckoutField>
      </div>
    </CheckoutSection>
  );
}

/* ----------------------------------- Summary ------------------------------ */

export interface CheckoutSummaryProps extends SlotProps {
  items?: LineItem[];
  shipping?: number;
  currency?: string;
  /** Pay button label. Pass null to hide it (e.g. when the form owns submit). */
  cta?: ReactNode | null;
}

const CheckoutSummary = forwardRef<HTMLDivElement, CheckoutSummaryProps>(function CheckoutSummary(
  { items = DEFAULT_ITEMS, shipping = 9, currency = '$', cta, children, className, tw, ...rest },
  ref
) {
  const subtotal = items.reduce((s, i) => s + i.price * (i.qty ?? 1), 0);
  const total = subtotal + shipping;

  return (
    <div
      ref={ref}
      className={mergeTw('flex flex-col gap-5 rounded-2xl border border-edge/12 bg-panel/60 p-6', className, tw)}
      {...rest}
    >
      {children ?? (
        <>
          <h3 className="font-display text-base font-semibold tracking-tight text-fg">Order summary</h3>
          <ul className="flex flex-col gap-3">
            {items.map((it, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-lg border border-edge/10 bg-canvas/40">
                  {it.image ? (
                    <img src={it.image} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5 text-fg-subtle">
                      <path d="M6 7h12l-1 13H7L6 7Zm3 0V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-fg">{it.name}</p>
                  <p className="text-xs text-fg-subtle">Qty {it.qty ?? 1}</p>
                </div>
                <span className="text-sm font-medium text-fg">{money(it.price * (it.qty ?? 1), currency)}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 border-t border-edge/10 pt-4 text-sm">
            <div className="flex justify-between text-fg-muted">
              <span>Subtotal</span>
              <span>{money(subtotal, currency)}</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span>Shipping</span>
              <span>{money(shipping, currency)}</span>
            </div>
            <div className="mt-1 flex justify-between border-t border-edge/10 pt-3 text-base font-semibold text-fg">
              <span>Total</span>
              <span>{money(total, currency)}</span>
            </div>
          </div>
          {cta !== null ? (
            <Button type="submit" fullWidth intent="ghost" tw={mergeTw('h-11 rounded-xl', accentSolid)}>
              {cta ?? `Pay ${money(total, currency)}`}
            </Button>
          ) : null}
        </>
      )}
    </div>
  );
});

/* ----------------------------------- Stepper ------------------------------ */

function Stepper({ step, steps }: { step: number; steps: string[] }) {
  return (
    <div className="mb-2 flex items-center gap-3">
      {steps.map((label, i) => {
        const n = i + 1;
        const reached = n <= step;
        return (
          <React.Fragment key={label}>
            <div className="flex items-center gap-2">
              <span
                className={mergeTw(
                  'grid h-7 w-7 place-items-center rounded-full border text-xs font-semibold transition',
                  reached ? 'border-primary bg-primary text-primary-fg' : 'border-edge/20 bg-fg/[0.04] text-fg-subtle'
                )}
              >
                {n}
              </span>
              <span className={mergeTw('text-sm font-medium', n === step ? 'text-fg' : 'text-fg-subtle')}>{label}</span>
            </div>
            {n < steps.length ? <span className="h-px flex-1 bg-edge/15" /> : null}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ----------------------------------- Root --------------------------------- */

const CheckoutFormRoot = forwardRef<HTMLDivElement, CheckoutFormProps>(function CheckoutForm(
  { variant = 'single', className, tw, children, onSubmit, items = DEFAULT_ITEMS, shipping = 9, currency = '$', ...rest },
  ref
) {
  const hasChildren = React.Children.count(children) > 0;
  const [step, setStep] = useState(1);
  const numbered = variant === 'steps' || variant === 'compact';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  const wrapper = (inner: ReactNode, padded = true) => (
    <BlockVariantContext.Provider value={variant as never}>
      <div
        ref={ref}
        className={mergeTw(
          'w-full text-fg',
          variant === 'twoColumn' ? 'max-w-5xl' : variant === 'compact' ? 'max-w-md' : 'max-w-xl',
          'rounded-2xl',
          surfaces[variant],
          padded && variant !== 'twoColumn' ? 'p-6 sm:p-8' : '',
          className,
          tw
        )}
        {...rest}
      >
        {inner}
      </div>
    </BlockVariantContext.Provider>
  );

  if (hasChildren) {
    return wrapper(children);
  }

  /* —— steps design —— */
  if (variant === 'steps') {
    const stepLabels = ['Contact', 'Shipping', 'Payment'];
    return wrapper(
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Stepper step={step} steps={stepLabels} />
        {step === 1 ? <ContactSection /> : step === 2 ? <ShippingSection /> : <PaymentSection />}
        {step === 3 ? <CheckoutSummary items={items} shipping={shipping} currency={currency} cta={null} /> : null}
        <div className="flex gap-2.5">
          {step > 1 ? (
            <Button type="button" intent="ghost" onClick={() => setStep((s) => s - 1)} tw={mergeTw('h-11 rounded-xl', ghostControl)}>
              Back
            </Button>
          ) : null}
          {step < 3 ? (
            <Button type="button" fullWidth intent="ghost" onClick={() => setStep((s) => s + 1)} tw={mergeTw('h-11 rounded-xl', accentSolid)}>
              Continue
            </Button>
          ) : (
            <Button type="submit" fullWidth intent="ghost" tw={mergeTw('h-11 rounded-xl', accentSolid)}>
              Place order
            </Button>
          )}
        </div>
      </form>
    );
  }

  /* —— twoColumn design: form left, sticky summary right —— */
  if (variant === 'twoColumn') {
    return wrapper(
      <div className="grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 rounded-2xl border border-edge/10 bg-elevated p-6 shadow-luxe-sm sm:p-8">
          <ContactSection step={1} />
          <ShippingSection step={2} />
          <PaymentSection step={3} />
        </form>
        <div className="lg:sticky lg:top-6">
          <CheckoutSummary items={items} shipping={shipping} currency={currency} />
        </div>
      </div>,
      false
    );
  }

  /* —— single / card / glass / compact —— */
  return wrapper(
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <ContactSection step={numbered ? 1 : undefined} />
      <ShippingSection step={numbered ? 2 : undefined} />
      <PaymentSection step={numbered ? 3 : undefined} />
      <CheckoutSummary items={items} shipping={shipping} currency={currency} />
    </form>
  );
});

/* --------------------------------- Export --------------------------------- */

type CheckoutFormComponent = typeof CheckoutFormRoot & {
  Section: typeof CheckoutSection;
  Field: typeof CheckoutField;
  Summary: typeof CheckoutSummary;
};

export const CheckoutForm = CheckoutFormRoot as CheckoutFormComponent;
CheckoutForm.Section = CheckoutSection;
CheckoutForm.Field = CheckoutField;
CheckoutForm.Summary = CheckoutSummary;
