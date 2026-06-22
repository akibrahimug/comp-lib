import React, {
  forwardRef,
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
   SignIn — pre-assembled, themeable authentication form.
   Composed from library primitives (Input, Checkbox, Button) and semantic
   tokens, exposing 6 layout designs via `variant`, a compound slot API, and a
   data-prop form that renders a complete sign-in card out of the box.

     // Data-prop form:
     <SignIn variant="card" title="Welcome back"
       subtitle="Sign in to continue" forgotHref="#" signupHref="#"
       socials={[{ provider: 'google' }, { provider: 'github' }]} />

     // Slot-composition form:
     <SignIn variant="glass">
       <SignIn.Header title="Welcome back" subtitle="Sign in to continue" />
       <SignIn.Field type="email" label="Email" />
       <SignIn.Field type="password" label="Password" />
       <SignIn.Actions>Sign in</SignIn.Actions>
       <SignIn.Footer>New here? <a href="#">Create account</a></SignIn.Footer>
     </SignIn>
   ════════════════════════════════════════════════════════════════════════ */

export type SignInVariant =
  | 'centered'
  | 'split'
  | 'card'
  | 'glass'
  | 'minimal'
  | 'social';

export const SIGNIN_VARIANTS: SignInVariant[] = [
  'centered',
  'split',
  'card',
  'glass',
  'minimal',
  'social',
];

export interface SocialProvider {
  /** Provider key (drives the inline icon + default label). */
  provider: 'google' | 'github' | 'apple';
  /** Link target. */
  href?: string;
  /** Override the button label. */
  label?: ReactNode;
}

export interface SignInProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onSubmit'> {
  /** One of the 6 layout designs. */
  variant?: SignInVariant;
  className?: string;
  tw?: string;

  /* —— Data props (used when no children are provided) —— */
  /** Heading. */
  title?: ReactNode;
  /** Sub-heading. */
  subtitle?: ReactNode;
  /** Submit handler — receives the native event (default-prevented). */
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  /** Social sign-in providers. */
  socials?: SocialProvider[];
  /** "Forgot password" link target. */
  forgotHref?: string;
  /** "Create account" link target. */
  signupHref?: string;
}

/* ──────────────────────────── Surfaces ──────────────────────────────────── */

const surfaces: Record<SignInVariant, string> = {
  centered: 'bg-elevated border border-edge/10 shadow-luxe',
  split: 'bg-elevated border border-edge/10 shadow-luxe overflow-hidden',
  card: 'bg-panel/80 border border-edge/12 shadow-luxe-sm backdrop-blur-xl',
  glass: 'glass',
  minimal: 'bg-transparent',
  social: 'bg-elevated border border-edge/10 shadow-luxe-sm',
};

/* ──────────────────────────── Inline icons ──────────────────────────────── */

function ProviderIcon({ provider, className }: { provider: SocialProvider['provider']; className?: string }) {
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

const providerLabels: Record<SocialProvider['provider'], string> = {
  google: 'Continue with Google',
  github: 'Continue with GitHub',
  apple: 'Continue with Apple',
};

/* ──────────────────────────── Field labels ──────────────────────────────── */

function fieldLabel(children: ReactNode) {
  return (
    <span className="mb-1.5 block text-sm font-medium text-fg-muted">{children}</span>
  );
}

/* ----------------------------------- Root --------------------------------- */

const SignInRoot = forwardRef<HTMLDivElement, SignInProps>(function SignIn(
  {
    variant = 'card',
    className,
    tw,
    children,
    title = 'Welcome back',
    subtitle = 'Sign in to your account to continue.',
    onSubmit,
    socials,
    forgotHref,
    signupHref,
    ...rest
  },
  ref
) {
  const hasChildren = React.Children.count(children) > 0;
  const isSplit = variant === 'split';
  const isSocialFirst = variant === 'social';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  const formBody = (
    <>
      {isSocialFirst && socials?.length ? (
        <>
          <SignInSocial socials={socials} />
          <Divider>or sign in with email</Divider>
        </>
      ) : null}

      <SignInField type="email" name="email" label="Email" placeholder="you@example.com" autoComplete="email" />
      <SignInField
        type="password"
        name="password"
        label="Password"
        placeholder="••••••••"
        autoComplete="current-password"
        action={forgotHref ? <a href={forgotHref} className="text-sm font-medium text-primary hover:underline">Forgot?</a> : undefined}
      />

      <Checkbox name="remember" label="Remember me for 30 days" tw="text-fg-muted" />

      <SignInActions>Sign in</SignInActions>

      {!isSocialFirst && socials?.length ? (
        <>
          <Divider>or continue with</Divider>
          <SignInSocial socials={socials} />
        </>
      ) : null}

      <SignInFooter>
        New here?{' '}
        <a href={signupHref ?? '#'} onClick={(e) => !signupHref && e.preventDefault()} className="font-medium text-primary hover:underline">
          Create an account
        </a>
      </SignInFooter>
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
          <div className={mergeTw(variant === 'minimal' ? '' : 'p-7 sm:p-8')}>{children}</div>
        ) : isSplit ? (
          <div className="grid md:grid-cols-2">
            <SignInPanel title={title} subtitle={subtitle} />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-7 sm:p-8">
              <SignInHeader title="Sign in" subtitle="Use your account credentials." />
              {formBody}
            </form>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={mergeTw('flex flex-col gap-4', variant === 'minimal' ? '' : 'p-7 sm:p-8')}
          >
            <SignInHeader title={title} subtitle={subtitle} />
            {formBody}
          </form>
        )}
      </div>
    </BlockVariantContext.Provider>
  );
});

/* ----------------------------------- Panel -------------------------------- */
/* Side panel for the `split` design. */

const SignInPanel = forwardRef<HTMLDivElement, Omit<SlotProps, 'title'> & { title?: ReactNode; subtitle?: ReactNode }>(
  function SignInPanel({ title, subtitle, children, className, tw, ...rest }, ref) {
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
            </div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">comp·lib · secure auth</p>
          </>
        )}
      </div>
    );
  }
);

/* ----------------------------------- Header ------------------------------- */

export interface SignInHeaderProps extends Omit<SlotProps, 'title'> {
  title?: ReactNode;
  subtitle?: ReactNode;
}

const SignInHeader = forwardRef<HTMLDivElement, SignInHeaderProps>(function SignInHeader(
  { title, subtitle, children, className, tw, ...rest },
  ref
) {
  return (
    <div ref={ref} className={mergeTw('mb-2 flex flex-col gap-1.5', className, tw)} {...rest}>
      {children ?? (
        <>
          {title ? (
            <h2 className="font-display text-2xl font-semibold tracking-tight text-fg">{title}</h2>
          ) : null}
          {subtitle ? <p className="text-sm text-fg-muted">{subtitle}</p> : null}
        </>
      )}
    </div>
  );
});

/* ----------------------------------- Field -------------------------------- */

export interface SignInFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Field label. */
  label?: ReactNode;
  /** Trailing action shown on the label row (e.g. "Forgot?"). */
  action?: ReactNode;
  /** Extra Tailwind classes (merged last). */
  tw?: string;
}

const SignInField = forwardRef<HTMLInputElement, SignInFieldProps>(function SignInField(
  { label, type = 'text', action, children, className, tw, ...rest },
  ref
) {
  if (children) {
    return (
      <div className={mergeTw('w-full', className, tw)}>{children}</div>
    );
  }
  return (
    <div className={mergeTw('w-full', className)}>
      {(label || action) && (
        <div className="mb-1.5 flex items-center justify-between">
          {fieldLabel(label)}
          {action}
        </div>
      )}
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

const SignInActions = forwardRef<HTMLButtonElement, SlotProps<HTMLButtonElement>>(
  function SignInActions({ children, className, tw, ...rest }, ref) {
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

export interface SignInSocialProps extends SlotProps {
  socials?: SocialProvider[];
}

const SignInSocial = forwardRef<HTMLDivElement, SignInSocialProps>(function SignInSocial(
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

const SignInFooter = forwardRef<HTMLParagraphElement, SlotProps<HTMLParagraphElement>>(
  function SignInFooter({ children, className, tw, ...rest }, ref) {
    return (
      <p
        ref={ref}
        className={mergeTw('mt-1 text-center text-sm text-fg-muted', className, tw)}
        {...rest}
      >
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

type SignInComponent = typeof SignInRoot & {
  Panel: typeof SignInPanel;
  Header: typeof SignInHeader;
  Field: typeof SignInField;
  Actions: typeof SignInActions;
  Social: typeof SignInSocial;
  Footer: typeof SignInFooter;
};

export const SignIn = SignInRoot as SignInComponent;
SignIn.Panel = SignInPanel;
SignIn.Header = SignInHeader;
SignIn.Field = SignInField;
SignIn.Actions = SignInActions;
SignIn.Social = SignInSocial;
SignIn.Footer = SignInFooter;
