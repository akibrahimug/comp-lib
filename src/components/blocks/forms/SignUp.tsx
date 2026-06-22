import React, {
  forwardRef,
  useState,
  type ReactNode,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type FormEvent,
} from 'react';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { Checkbox } from '../../Checkbox';
import {
  mergeTw,
  accentSolid,
  ghostControl,
  inputSurface,
  SlotProps,
  BlockVariantContext,
} from '../_shared';

/* ════════════════════════════════════════════════════════════════════════
   SignUp — pre-assembled, themeable registration form.
   Composed from library primitives (Input, Checkbox, Button) and semantic
   tokens, exposing 6 layout designs via `variant`, a compound slot API, and a
   data-prop form that renders a complete sign-up card out of the box.

     // Data-prop form:
     <SignUp variant="card" title="Create your account"
       subtitle="Start your free trial" signinHref="#"
       socials={[{ provider: 'google' }, { provider: 'github' }]} />

     // Slot-composition form:
     <SignUp variant="glass">
       <SignUp.Header title="Create account" />
       <SignUp.Field type="text" label="Full name" />
       <SignUp.Field type="email" label="Email" />
       <SignUp.Actions>Create account</SignUp.Actions>
     </SignUp>
   ════════════════════════════════════════════════════════════════════════ */

export type SignUpVariant =
  | 'centered'
  | 'split'
  | 'card'
  | 'glass'
  | 'steps'
  | 'social';

export const SIGNUP_VARIANTS: SignUpVariant[] = [
  'centered',
  'split',
  'card',
  'glass',
  'steps',
  'social',
];

export interface SignUpSocialProvider {
  provider: 'google' | 'github' | 'apple';
  href?: string;
  label?: ReactNode;
}

export interface SignUpProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onSubmit'> {
  /** One of the 6 layout designs. */
  variant?: SignUpVariant;
  className?: string;
  tw?: string;

  /* —— Data props (used when no children are provided) —— */
  /** Heading. */
  title?: ReactNode;
  /** Sub-heading. */
  subtitle?: ReactNode;
  /** Submit handler — receives the native event (default-prevented). */
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  /** Social sign-up providers. */
  socials?: SignUpSocialProvider[];
  /** "Sign in" link target. */
  signinHref?: string;
}

/* ──────────────────────────── Surfaces ──────────────────────────────────── */

const surfaces: Record<SignUpVariant, string> = {
  centered: 'bg-elevated border border-edge/10 shadow-luxe',
  split: 'bg-elevated border border-edge/10 shadow-luxe overflow-hidden',
  card: 'bg-panel/80 border border-edge/12 shadow-luxe-sm backdrop-blur-xl',
  glass: 'glass',
  steps: 'bg-elevated border border-edge/10 shadow-luxe',
  social: 'bg-elevated border border-edge/10 shadow-luxe-sm',
};

/* ──────────────────────────── Inline icons ──────────────────────────────── */

function ProviderIcon({ provider, className }: { provider: SignUpSocialProvider['provider']; className?: string }) {
  if (provider === 'github') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85l-.01 2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }
  if (provider === 'apple') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M16.37 12.7c.03 2.83 2.49 3.77 2.52 3.78-.02.07-.39 1.35-1.3 2.67-.78 1.14-1.6 2.28-2.89 2.3-1.26.03-1.67-.74-3.12-.74-1.45 0-1.9.72-3.1.77-1.24.05-2.19-1.23-2.98-2.37-1.61-2.33-2.85-6.59-1.19-9.46.82-1.42 2.3-2.32 3.9-2.35 1.22-.02 2.37.82 3.12.82.74 0 2.14-1.02 3.61-.87.61.03 2.35.25 3.46 1.86-.09.06-2.07 1.21-2.05 3.6ZM14.1 4.6c.66-.8 1.1-1.92.98-3.03-.95.04-2.1.63-2.78 1.43-.61.71-1.14 1.84-1 2.92 1.06.08 2.14-.54 2.8-1.32Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path fill="currentColor" d="M21.6 12.23c0-.68-.06-1.34-.17-1.97H12v3.73h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.89-1.74 2.99-4.3 2.99-7.28Z" opacity=".85" />
      <path fill="currentColor" d="M12 22c2.7 0 4.96-.9 6.61-2.43l-3.23-2.5c-.9.6-2.05.95-3.38.95-2.6 0-4.8-1.75-5.59-4.11H3.07v2.58A10 10 0 0 0 12 22Z" opacity=".6" />
      <path fill="currentColor" d="M6.41 13.91a6 6 0 0 1 0-3.82V7.51H3.07a10 10 0 0 0 0 8.98l3.34-2.58Z" opacity=".75" />
      <path fill="currentColor" d="M12 5.98c1.47 0 2.78.5 3.81 1.49l2.85-2.85C16.95 2.99 14.69 2 12 2A10 10 0 0 0 3.07 7.51l3.34 2.58C7.2 7.73 9.4 5.98 12 5.98Z" opacity=".5" />
    </svg>
  );
}

const providerLabels: Record<SignUpSocialProvider['provider'], string> = {
  google: 'Sign up with Google',
  github: 'Sign up with GitHub',
  apple: 'Sign up with Apple',
};

/* ----------------------------------- Root --------------------------------- */

const SignUpRoot = forwardRef<HTMLDivElement, SignUpProps>(function SignUp(
  {
    variant = 'card',
    className,
    tw,
    children,
    title = 'Create your account',
    subtitle = 'Start your 14-day free trial — no card required.',
    onSubmit,
    socials,
    signinHref,
    ...rest
  },
  ref
) {
  const hasChildren = React.Children.count(children) > 0;
  const isSplit = variant === 'split';
  const isSteps = variant === 'steps';
  const isSocialFirst = variant === 'social';
  const [step, setStep] = useState(1);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  const terms = (
    <Checkbox
      name="terms"
      label="I agree to the Terms of Service and Privacy Policy"
      tw="text-fg-muted"
    />
  );

  const footer = (
    <SignUpFooter>
      Already have an account?{' '}
      <a href={signinHref ?? '#'} onClick={(e) => !signinHref && e.preventDefault()} className="font-medium text-primary hover:underline">
        Sign in
      </a>
    </SignUpFooter>
  );

  /* —— steps design: split the fields across two panes —— */
  if (isSteps && !hasChildren) {
    return (
      <BlockVariantContext.Provider value={variant as never}>
        <div
          ref={ref}
          className={mergeTw('w-full max-w-md rounded-2xl text-fg', surfaces[variant], className, tw)}
          {...rest}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-7 sm:p-8">
            <Stepper step={step} steps={['Account', 'Profile']} />
            <SignUpHeader title={title} subtitle={subtitle} />
            {step === 1 ? (
              <>
                <SignUpField type="email" name="email" label="Email" placeholder="you@example.com" autoComplete="email" />
                <SignUpField type="password" name="password" label="Password" placeholder="••••••••" autoComplete="new-password" />
                <Button
                  type="button"
                  fullWidth
                  intent="ghost"
                  onClick={() => setStep(2)}
                  tw={mergeTw('mt-1 h-11 rounded-xl', accentSolid)}
                >
                  Continue
                </Button>
              </>
            ) : (
              <>
                <SignUpField type="text" name="name" label="Full name" placeholder="Ada Lovelace" autoComplete="name" />
                <SignUpField type="text" name="company" label="Company (optional)" placeholder="Analytical Engines Ltd." />
                {terms}
                <div className="mt-1 flex gap-2.5">
                  <Button
                    type="button"
                    intent="ghost"
                    onClick={() => setStep(1)}
                    tw={mergeTw('h-11 rounded-xl', ghostControl)}
                  >
                    Back
                  </Button>
                  <SignUpActions>Create account</SignUpActions>
                </div>
              </>
            )}
            {footer}
          </form>
        </div>
      </BlockVariantContext.Provider>
    );
  }

  const formBody = (
    <>
      {isSocialFirst && socials?.length ? (
        <>
          <SignUpSocial socials={socials} />
          <Divider>or sign up with email</Divider>
        </>
      ) : null}

      <SignUpField type="text" name="name" label="Full name" placeholder="Ada Lovelace" autoComplete="name" />
      <SignUpField type="email" name="email" label="Email" placeholder="you@example.com" autoComplete="email" />
      <SignUpField type="password" name="password" label="Password" placeholder="••••••••" autoComplete="new-password" />

      {terms}

      <SignUpActions>Create account</SignUpActions>

      {!isSocialFirst && socials?.length ? (
        <>
          <Divider>or continue with</Divider>
          <SignUpSocial socials={socials} />
        </>
      ) : null}

      {footer}
    </>
  );

  return (
    <BlockVariantContext.Provider value={variant as never}>
      <div
        ref={ref}
        className={mergeTw(
          'w-full text-fg',
          isSplit ? 'max-w-4xl' : 'max-w-md',
          'rounded-2xl',
          surfaces[variant],
          className,
          tw
        )}
        {...rest}
      >
        {hasChildren ? (
          <div className="p-7 sm:p-8">{children}</div>
        ) : isSplit ? (
          <div className="grid md:grid-cols-2">
            <SignUpPanel title={title} subtitle={subtitle} />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-7 sm:p-8">
              <SignUpHeader title="Get started" subtitle="It only takes a minute." />
              {formBody}
            </form>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-7 sm:p-8">
            <SignUpHeader title={title} subtitle={subtitle} />
            {formBody}
          </form>
        )}
      </div>
    </BlockVariantContext.Provider>
  );
});

/* ----------------------------------- Stepper ------------------------------ */

function Stepper({ step, steps }: { step: number; steps: string[] }) {
  return (
    <div className="mb-2 flex items-center gap-3">
      {steps.map((label, i) => {
        const n = i + 1;
        const done = n < step;
        const active = n === step;
        return (
          <React.Fragment key={label}>
            <div className="flex items-center gap-2">
              <span
                className={mergeTw(
                  'grid h-7 w-7 place-items-center rounded-full border text-xs font-semibold transition',
                  active || done
                    ? 'border-primary bg-primary text-primary-fg'
                    : 'border-edge/20 bg-fg/[0.04] text-fg-subtle'
                )}
              >
                {n}
              </span>
              <span className={mergeTw('text-sm font-medium', active ? 'text-fg' : 'text-fg-subtle')}>{label}</span>
            </div>
            {n < steps.length ? <span className="h-px flex-1 bg-edge/15" /> : null}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ----------------------------------- Panel -------------------------------- */

const SignUpPanel = forwardRef<HTMLDivElement, Omit<SlotProps, 'title'> & { title?: ReactNode; subtitle?: ReactNode }>(
  function SignUpPanel({ title, subtitle, children, className, tw, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={mergeTw(
          'relative hidden flex-col justify-between gap-8 overflow-hidden bg-gradient-to-br from-primary/15 via-panel/40 to-accent2/10 p-8 md:flex',
          className,
          tw
        )}
        {...rest}
      >
        {children ?? (
          <>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-fg shadow-accent">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
                <path d="M12 2 14.5 9.5 22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z" />
              </svg>
            </span>
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-fg">{title}</h3>
              <p className="mt-2 text-sm text-fg-muted">{subtitle}</p>
              <ul className="mt-5 flex flex-col gap-2.5 text-sm text-fg-muted">
                {['Unlimited components', 'Theme across 4 palettes', 'Cancel anytime'].map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/15 text-primary">
                      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-3 w-3">
                        <path d="m4 10 4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">comp·lib · join 12k builders</p>
          </>
        )}
      </div>
    );
  }
);

/* ----------------------------------- Header ------------------------------- */

export interface SignUpHeaderProps extends Omit<SlotProps, 'title'> {
  title?: ReactNode;
  subtitle?: ReactNode;
}

const SignUpHeader = forwardRef<HTMLDivElement, SignUpHeaderProps>(function SignUpHeader(
  { title, subtitle, children, className, tw, ...rest },
  ref
) {
  return (
    <div ref={ref} className={mergeTw('mb-2 flex flex-col gap-1.5', className, tw)} {...rest}>
      {children ?? (
        <>
          {title ? <h2 className="font-display text-2xl font-semibold tracking-tight text-fg">{title}</h2> : null}
          {subtitle ? <p className="text-sm text-fg-muted">{subtitle}</p> : null}
        </>
      )}
    </div>
  );
});

/* ----------------------------------- Field -------------------------------- */

export interface SignUpFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Field label. */
  label?: ReactNode;
  /** Extra Tailwind classes (merged last). */
  tw?: string;
}

const SignUpField = forwardRef<HTMLInputElement, SignUpFieldProps>(function SignUpField(
  { label, type = 'text', children, className, tw, ...rest },
  ref
) {
  if (children) {
    return <div className={mergeTw('w-full', className, tw)}>{children}</div>;
  }
  return (
    <div className={mergeTw('w-full', className)}>
      {label ? <span className="mb-1.5 block text-sm font-medium text-fg-muted">{label}</span> : null}
      <Input
        ref={ref}
        type={type}
        tw={mergeTw(inputSurface, 'h-11 rounded-xl', tw)}
        {...(rest as Record<string, unknown>)}
      />
    </div>
  );
});

/* ----------------------------------- Actions ------------------------------ */

const SignUpActions = forwardRef<HTMLButtonElement, SlotProps<HTMLButtonElement>>(
  function SignUpActions({ children, className, tw, ...rest }, ref) {
    return (
      <Button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="submit"
        fullWidth
        intent="ghost"
        tw={mergeTw('mt-1 h-11 rounded-xl', accentSolid, className, tw)}
        {...(rest as Record<string, unknown>)}
      >
        {children}
      </Button>
    );
  }
);

/* ----------------------------------- Social ------------------------------- */

export interface SignUpSocialProps extends SlotProps {
  socials?: SignUpSocialProvider[];
}

const SignUpSocial = forwardRef<HTMLDivElement, SignUpSocialProps>(function SignUpSocial(
  { socials, children, className, tw, ...rest },
  ref
) {
  return (
    <div ref={ref} className={mergeTw('flex flex-col gap-2.5', className, tw)} {...rest}>
      {children ??
        socials?.map((s, i) => (
          <Button
            key={i}
            intent="ghost"
            fullWidth
            as="a"
            href={s.href ?? '#'}
            onClick={(e: React.MouseEvent) => !s.href && e.preventDefault()}
            tw={mergeTw('h-11 rounded-xl', ghostControl)}
          >
            <ProviderIcon provider={s.provider} className="h-[18px] w-[18px]" />
            {s.label ?? providerLabels[s.provider]}
          </Button>
        ))}
    </div>
  );
});

/* ----------------------------------- Footer ------------------------------- */

const SignUpFooter = forwardRef<HTMLParagraphElement, SlotProps<HTMLParagraphElement>>(
  function SignUpFooter({ children, className, tw, ...rest }, ref) {
    return (
      <p ref={ref} className={mergeTw('mt-1 text-center text-sm text-fg-muted', className, tw)} {...rest}>
        {children}
      </p>
    );
  }
);

/* ----------------------------------- Divider ------------------------------ */

function Divider({ children }: { children: ReactNode }) {
  return (
    <div className="my-1 flex items-center gap-3 text-xs text-fg-subtle">
      <span className="h-px flex-1 bg-edge/15" />
      <span className="font-mono uppercase tracking-widest">{children}</span>
      <span className="h-px flex-1 bg-edge/15" />
    </div>
  );
}

/* --------------------------------- Export --------------------------------- */

type SignUpComponent = typeof SignUpRoot & {
  Panel: typeof SignUpPanel;
  Header: typeof SignUpHeader;
  Field: typeof SignUpField;
  Actions: typeof SignUpActions;
  Social: typeof SignUpSocial;
  Footer: typeof SignUpFooter;
};

export const SignUp = SignUpRoot as SignUpComponent;
SignUp.Panel = SignUpPanel;
SignUp.Header = SignUpHeader;
SignUp.Field = SignUpField;
SignUp.Actions = SignUpActions;
SignUp.Social = SignUpSocial;
SignUp.Footer = SignUpFooter;
