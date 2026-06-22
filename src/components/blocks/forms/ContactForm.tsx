import React, {
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
  type FormEvent,
} from 'react';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { Textarea } from '../../Textarea';
import {
  mergeTw,
  accentSolid,
  inputSurface,
  SlotProps,
  BlockVariantContext,
} from '../_shared';

/* ════════════════════════════════════════════════════════════════════════
   ContactForm — pre-assembled, themeable contact form.
   Composed from library primitives (Input, Textarea, Button) and semantic
   tokens. 6 layout designs via `variant`, an optional contact-info sidebar,
   and a data-prop form that renders name / email / subject / message out of
   the box.

     // Data-prop form:
     <ContactForm variant="withDetails" title="Get in touch"
       details={{ email: 'hi@acme.com', phone: '+1 555 000', address: 'NYC' }} />

     // Slot-composition form:
     <ContactForm variant="card">
       <ContactForm.Header title="Contact us" />
       <ContactForm.Field label="Name"><Input … /></ContactForm.Field>
       <ContactForm.Submit>Send message</ContactForm.Submit>
     </ContactForm>
   ════════════════════════════════════════════════════════════════════════ */

export type ContactFormVariant =
  | 'simple'
  | 'split'
  | 'card'
  | 'glass'
  | 'withDetails'
  | 'minimal';

export const CONTACTFORM_VARIANTS: ContactFormVariant[] = [
  'simple',
  'split',
  'card',
  'glass',
  'withDetails',
  'minimal',
];

export interface ContactDetails {
  email?: string;
  phone?: string;
  address?: string;
}

export interface ContactFormProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onSubmit'> {
  /** One of the 6 layout designs. */
  variant?: ContactFormVariant;
  className?: string;
  tw?: string;

  /* —— Data props (used when no children are provided) —— */
  /** Heading. */
  title?: ReactNode;
  /** Sub-heading. */
  subtitle?: ReactNode;
  /** Submit handler — receives the native event (default-prevented). */
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  /** Contact info shown in the sidebar (split / withDetails designs). */
  details?: ContactDetails;
}

/* ──────────────────────────── Surfaces ──────────────────────────────────── */

const surfaces: Record<ContactFormVariant, string> = {
  simple: 'bg-elevated border border-edge/10 shadow-luxe-sm',
  split: 'bg-elevated border border-edge/10 shadow-luxe overflow-hidden',
  card: 'bg-panel/80 border border-edge/12 shadow-luxe-sm backdrop-blur-xl',
  glass: 'glass',
  withDetails: 'bg-elevated border border-edge/10 shadow-luxe overflow-hidden',
  minimal: 'bg-transparent',
};

/* ──────────────────────────── Inline icons ──────────────────────────────── */

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M5 4h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/* ----------------------------------- Root --------------------------------- */

const ContactFormRoot = forwardRef<HTMLDivElement, ContactFormProps>(function ContactForm(
  {
    variant = 'simple',
    className,
    tw,
    children,
    title = 'Get in touch',
    subtitle = 'We usually reply within one business day.',
    onSubmit,
    details = { email: 'hello@comp-lib.dev', phone: '+1 (555) 012-3456', address: '500 Market St, San Francisco' },
    ...rest
  },
  ref
) {
  const hasChildren = React.Children.count(children) > 0;
  const withSidebar = variant === 'split' || variant === 'withDetails';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  const fields = (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <ContactField label="Name">
          <Input name="name" placeholder="Ada Lovelace" autoComplete="name" tw={mergeTw(inputSurface, 'h-11 rounded-xl')} />
        </ContactField>
        <ContactField label="Email">
          <Input type="email" name="email" placeholder="you@example.com" autoComplete="email" tw={mergeTw(inputSurface, 'h-11 rounded-xl')} />
        </ContactField>
      </div>
      <ContactField label="Subject">
        <Input name="subject" placeholder="How can we help?" tw={mergeTw(inputSurface, 'h-11 rounded-xl')} />
      </ContactField>
      <ContactField label="Message">
        <Textarea name="message" rows={5} placeholder="Tell us a bit more…" tw={mergeTw(inputSurface, 'rounded-xl')} />
      </ContactField>
      <ContactSubmit>Send message</ContactSubmit>
    </>
  );

  const form = (
    <form
      onSubmit={handleSubmit}
      className={mergeTw('flex flex-col gap-4', variant === 'minimal' ? '' : 'p-7 sm:p-8')}
    >
      {!withSidebar ? <ContactHeader title={title} subtitle={subtitle} /> : null}
      {fields}
    </form>
  );

  return (
    <BlockVariantContext.Provider value={variant as never}>
      <div
        ref={ref}
        className={mergeTw(
          'w-full text-fg',
          withSidebar ? 'max-w-4xl' : 'max-w-xl',
          'rounded-2xl',
          surfaces[variant],
          className,
          tw
        )}
        {...rest}
      >
        {hasChildren ? (
          <div className={mergeTw(variant === 'minimal' ? '' : 'p-7 sm:p-8')}>{children}</div>
        ) : withSidebar ? (
          <div className={mergeTw('grid md:grid-cols-2', variant === 'withDetails' && 'md:grid-cols-[1fr_1.2fr]')}>
            <ContactDetailsPanel title={title} subtitle={subtitle} details={details} />
            {form}
          </div>
        ) : (
          form
        )}
      </div>
    </BlockVariantContext.Provider>
  );
});

/* ----------------------------------- Header ------------------------------- */

export interface ContactHeaderProps extends Omit<SlotProps, 'title'> {
  title?: ReactNode;
  subtitle?: ReactNode;
}

const ContactHeader = forwardRef<HTMLDivElement, ContactHeaderProps>(function ContactHeader(
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

export interface ContactFieldProps extends Omit<SlotProps, 'title'> {
  label?: ReactNode;
}

const ContactField = forwardRef<HTMLDivElement, ContactFieldProps>(function ContactField(
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

/* ----------------------------------- Submit ------------------------------- */

const ContactSubmit = forwardRef<HTMLButtonElement, SlotProps<HTMLButtonElement>>(
  function ContactSubmit({ children, className, tw, ...rest }, ref) {
    return (
      <Button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="submit"
        intent="ghost"
        tw={mergeTw('mt-1 h-11 rounded-xl px-6 sm:self-start', accentSolid, className, tw)}
        {...(rest as Record<string, unknown>)}
      >
        {children}
      </Button>
    );
  }
);

/* --------------------------------- Details -------------------------------- */

export interface ContactDetailsPanelProps extends Omit<SlotProps, 'title'> {
  title?: ReactNode;
  subtitle?: ReactNode;
  details?: ContactDetails;
}

const ContactDetailsPanel = forwardRef<HTMLDivElement, ContactDetailsPanelProps>(
  function ContactDetailsPanel({ title, subtitle, details, children, className, tw, ...rest }, ref) {
    const rows = [
      details?.email ? { icon: <MailIcon className="h-[18px] w-[18px]" />, label: 'Email', value: details.email } : null,
      details?.phone ? { icon: <PhoneIcon className="h-[18px] w-[18px]" />, label: 'Phone', value: details.phone } : null,
      details?.address ? { icon: <PinIcon className="h-[18px] w-[18px]" />, label: 'Office', value: details.address } : null,
    ].filter(Boolean) as { icon: ReactNode; label: string; value: string }[];

    return (
      <div
        ref={ref}
        className={mergeTw(
          'relative flex flex-col gap-7 overflow-hidden bg-gradient-to-br from-primary/15 via-panel/40 to-accent2/10 p-7 sm:p-8',
          className,
          tw
        )}
        {...rest}
      >
        {children ?? (
          <>
            <div>
              {title ? <h2 className="font-display text-2xl font-semibold tracking-tight text-fg">{title}</h2> : null}
              {subtitle ? <p className="mt-2 text-sm text-fg-muted">{subtitle}</p> : null}
            </div>
            <ul className="flex flex-col gap-5">
              {rows.map((r) => (
                <li key={r.label} className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    {r.icon}
                  </span>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">{r.label}</p>
                    <p className="mt-0.5 text-sm font-medium text-fg">{r.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
);

/* --------------------------------- Export --------------------------------- */

type ContactFormComponent = typeof ContactFormRoot & {
  Header: typeof ContactHeader;
  Field: typeof ContactField;
  Submit: typeof ContactSubmit;
  Details: typeof ContactDetailsPanel;
};

export const ContactForm = ContactFormRoot as ContactFormComponent;
ContactForm.Header = ContactHeader;
ContactForm.Field = ContactField;
ContactForm.Submit = ContactSubmit;
ContactForm.Details = ContactDetailsPanel;
