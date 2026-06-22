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
import { Textarea } from '../../Textarea';
import { Toggle } from '../../Toggle';
import { Avatar } from '../../Avatar';
import { Tabs } from '../../Tabs';
import {
  mergeTw,
  accentSolid,
  ghostControl,
  inputSurface,
  SlotProps,
  BlockVariantContext,
} from '../_shared';

/* ════════════════════════════════════════════════════════════════════════
   SettingsForm — pre-assembled, themeable account-settings surface.
   Composed from library primitives (Input, Select, Textarea, Toggle, Avatar,
   Tabs, Button) and semantic tokens. 6 layout designs via `variant`, a sticky
   save bar, and a data-prop form that renders Profile / Account / Notifications
   groups out of the box.

     // Data-prop form:
     <SettingsForm variant="sections" onSubmit={save} />

     // Slot-composition form:
     <SettingsForm variant="cards">
       <SettingsForm.Group title="Profile">
         <SettingsForm.Field label="Name"><Input … /></SettingsForm.Field>
       </SettingsForm.Group>
       <SettingsForm.SaveBar />
     </SettingsForm>
   ════════════════════════════════════════════════════════════════════════ */

export type SettingsFormVariant =
  | 'tabs'
  | 'sections'
  | 'sidebar'
  | 'cards'
  | 'inline'
  | 'split';

export const SETTINGSFORM_VARIANTS: SettingsFormVariant[] = [
  'tabs',
  'sections',
  'sidebar',
  'cards',
  'inline',
  'split',
];

export interface SettingsFormProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onSubmit'> {
  /** One of the 6 layout designs. */
  variant?: SettingsFormVariant;
  className?: string;
  tw?: string;

  /* —— Data props (used when no children are provided) —— */
  /** Submit handler — receives the native event (default-prevented). */
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

const GROUPS = ['Profile', 'Account', 'Notifications'] as const;
type GroupKey = (typeof GROUPS)[number];

/* ──────────────────────────── Field labels ──────────────────────────────── */

function fieldClasses(extra?: string) {
  return mergeTw(inputSurface, 'h-11 rounded-xl', extra);
}

/* ----------------------------------- Field -------------------------------- */

export interface SettingsFieldProps extends Omit<SlotProps, 'title'> {
  /** Field label. */
  label?: ReactNode;
  /** Helper / hint text below the control. */
  hint?: ReactNode;
}

const SettingsField = forwardRef<HTMLDivElement, SettingsFieldProps>(function SettingsField(
  { label, hint, children, className, tw, ...rest },
  ref
) {
  return (
    <div ref={ref} className={mergeTw('w-full', className, tw)} {...rest}>
      {label ? <span className="mb-1.5 block text-sm font-medium text-fg-muted">{label}</span> : null}
      {children}
      {hint ? <p className="mt-1.5 text-xs text-fg-subtle">{hint}</p> : null}
    </div>
  );
});

/* ----------------------------------- Group -------------------------------- */

export interface SettingsGroupProps extends Omit<SlotProps, 'title'> {
  /** Group heading. */
  title?: ReactNode;
  /** Group description. */
  description?: ReactNode;
  /** Render as a bordered card (used by the `cards` design). */
  carded?: boolean;
}

const SettingsGroup = forwardRef<HTMLDivElement, SettingsGroupProps>(function SettingsGroup(
  { title, description, carded, children, className, tw, ...rest },
  ref
) {
  return (
    <section
      ref={ref}
      className={mergeTw(
        carded ? 'rounded-2xl border border-edge/12 bg-panel/60 p-6 shadow-luxe-sm' : '',
        className,
        tw
      )}
      {...rest}
    >
      {(title || description) && (
        <header className="mb-4">
          {title ? <h3 className="font-display text-lg font-semibold tracking-tight text-fg">{title}</h3> : null}
          {description ? <p className="mt-1 text-sm text-fg-muted">{description}</p> : null}
        </header>
      )}
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
});

/* ------------------------------ Group bodies ------------------------------ */
/* The default field sets per group, reused across every design. */

function ProfileFields() {
  return (
    <>
      <div className="flex items-center gap-4">
        <Avatar size="xl" tw="bg-primary/15 text-primary font-semibold">AL</Avatar>
        <div className="flex flex-col gap-2">
          <Button intent="ghost" tw={mergeTw('h-9 rounded-lg', ghostControl)}>Upload new photo</Button>
          <p className="text-xs text-fg-subtle">PNG or JPG, up to 2MB.</p>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <SettingsField label="First name">
          <Input defaultValue="Ada" tw={fieldClasses()} />
        </SettingsField>
        <SettingsField label="Last name">
          <Input defaultValue="Lovelace" tw={fieldClasses()} />
        </SettingsField>
      </div>
      <SettingsField label="Bio" hint="Brief description for your profile.">
        <Textarea
          rows={3}
          defaultValue="Building delightful interfaces with comp·lib."
          tw={mergeTw(inputSurface, 'rounded-xl')}
        />
      </SettingsField>
    </>
  );
}

function AccountFields() {
  return (
    <>
      <SettingsField label="Email">
        <Input type="email" defaultValue="ada@example.com" tw={fieldClasses()} />
      </SettingsField>
      <div className="grid gap-5 sm:grid-cols-2">
        <SettingsField label="Language">
          <Select defaultValue="en" tw={fieldClasses('bg-elevated/70')}>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </Select>
        </SettingsField>
        <SettingsField label="Timezone">
          <Select defaultValue="utc" tw={fieldClasses('bg-elevated/70')}>
            <option value="utc">UTC</option>
            <option value="est">Eastern (EST)</option>
            <option value="pst">Pacific (PST)</option>
          </Select>
        </SettingsField>
      </div>
    </>
  );
}

function NotificationFields() {
  const rows = [
    { label: 'Product updates', desc: 'News about features and improvements.', on: true },
    { label: 'Security alerts', desc: 'Critical alerts about your account.', on: true },
    { label: 'Weekly digest', desc: 'A summary of activity every Monday.', on: false },
  ];
  return (
    <>
      {rows.map((r) => (
        <ToggleRow key={r.label} label={r.label} description={r.desc} defaultChecked={r.on} />
      ))}
    </>
  );
}

const groupBodies: Record<GroupKey, () => ReactNode> = {
  Profile: ProfileFields,
  Account: AccountFields,
  Notifications: NotificationFields,
};

const groupDescriptions: Record<GroupKey, string> = {
  Profile: 'Update your photo and personal details.',
  Account: 'Manage your email, language, and region.',
  Notifications: 'Choose what we email you about.',
};

/* --------------------------------- ToggleRow ------------------------------ */
/* Self-contained labelled toggle that themes correctly (own label, Toggle control). */

export interface ToggleRowProps extends SlotProps<HTMLInputElement> {
  label?: ReactNode;
  description?: ReactNode;
  defaultChecked?: boolean;
}

const ToggleRow = forwardRef<HTMLInputElement, ToggleRowProps>(function ToggleRow(
  { label, description, defaultChecked, className, tw, ...rest },
  ref
) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <div
      className={mergeTw('flex items-center justify-between gap-4 rounded-xl border border-edge/10 bg-fg/[0.03] px-4 py-3', className, tw)}
    >
      <div className="flex flex-col">
        {label ? <span className="text-sm font-medium text-fg">{label}</span> : null}
        {description ? <span className="text-xs text-fg-subtle">{description}</span> : null}
      </div>
      <Toggle
        ref={ref}
        checked={on}
        onChange={(e) => setOn(e.currentTarget.checked)}
        {...(rest as Record<string, unknown>)}
      />
    </div>
  );
});

/* ----------------------------------- SaveBar ------------------------------ */

export interface SettingsSaveBarProps extends SlotProps {
  /** Sticky to the bottom (default true). */
  sticky?: boolean;
}

const SettingsSaveBar = forwardRef<HTMLDivElement, SettingsSaveBarProps>(function SettingsSaveBar(
  { sticky = true, children, className, tw, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={mergeTw(
        'z-10 flex items-center justify-end gap-3 border-t border-edge/10 bg-canvas/80 px-1 py-4 backdrop-blur-xl',
        sticky ? 'sticky bottom-0' : '',
        className,
        tw
      )}
      {...rest}
    >
      {children ?? (
        <>
          <Button type="button" intent="ghost" tw={mergeTw('h-10 rounded-xl', ghostControl)}>Cancel</Button>
          <Button type="submit" intent="ghost" tw={mergeTw('h-10 rounded-xl', accentSolid)}>Save changes</Button>
        </>
      )}
    </div>
  );
});

/* ----------------------------------- Root --------------------------------- */

const SettingsFormRoot = forwardRef<HTMLDivElement, SettingsFormProps>(function SettingsForm(
  { variant = 'sections', className, tw, children, onSubmit, ...rest },
  ref
) {
  const hasChildren = React.Children.count(children) > 0;
  const [active, setActive] = useState<GroupKey>('Profile');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  const renderGroup = (key: GroupKey, carded = false) => {
    const Body = groupBodies[key];
    return (
      <SettingsGroup key={key} title={key} description={groupDescriptions[key]} carded={carded}>
        <Body />
      </SettingsGroup>
    );
  };

  let body: ReactNode;

  if (hasChildren) {
    body = children;
  } else if (variant === 'tabs') {
    body = (
      <>
        <Tabs.Root defaultValue="Profile">
          <Tabs.TabList tw="gap-1 border-edge/12">
            {GROUPS.map((g) => (
              <Tabs.Tab
                key={g}
                value={g}
                tw="rounded-none border-b-2 border-transparent px-4 py-2.5 text-fg-muted aria-selected:border-primary aria-selected:text-fg hover:text-fg"
              >
                {g}
              </Tabs.Tab>
            ))}
          </Tabs.TabList>
          <Tabs.TabPanels tw="mt-6">
            {GROUPS.map((g) => (
              <Tabs.TabPanel key={g} value={g}>
                {renderGroup(g)}
              </Tabs.TabPanel>
            ))}
          </Tabs.TabPanels>
        </Tabs.Root>
        <SettingsSaveBar tw="mt-6" />
      </>
    );
  } else if (variant === 'sidebar' || variant === 'split') {
    body = (
      <div className="grid gap-8 md:grid-cols-[200px_1fr]">
        <nav className="flex flex-row gap-1 md:flex-col">
          {GROUPS.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setActive(g)}
              aria-current={active === g ? 'true' : undefined}
              className={mergeTw(
                'rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors',
                active === g ? 'bg-primary/10 text-primary' : 'text-fg-muted hover:bg-fg/[0.05] hover:text-fg'
              )}
            >
              {g}
            </button>
          ))}
        </nav>
        <div>
          {variant === 'split'
            ? GROUPS.map((g) => renderGroup(g, true))
            : renderGroup(active)}
          <SettingsSaveBar tw="mt-6" />
        </div>
      </div>
    );
  } else if (variant === 'cards') {
    body = (
      <>
        <div className="flex flex-col gap-6">{GROUPS.map((g) => renderGroup(g, true))}</div>
        <SettingsSaveBar tw="mt-6" />
      </>
    );
  } else if (variant === 'inline') {
    body = (
      <>
        <div className="flex flex-col divide-y divide-edge/10">
          {GROUPS.map((g) => (
            <div key={g} className="py-6 first:pt-0">
              {renderGroup(g)}
            </div>
          ))}
        </div>
        <SettingsSaveBar tw="mt-2" />
      </>
    );
  } else {
    /* sections (default) */
    body = (
      <>
        <div className="flex flex-col gap-10">{GROUPS.map((g) => renderGroup(g))}</div>
        <SettingsSaveBar tw="mt-8" />
      </>
    );
  }

  const split = variant === 'split';

  return (
    <BlockVariantContext.Provider value={variant as never}>
      <form
        ref={ref as never}
        onSubmit={handleSubmit}
        className={mergeTw(
          'w-full text-fg',
          split ? 'max-w-4xl' : 'max-w-2xl',
          'rounded-2xl border border-edge/10 bg-elevated p-6 shadow-luxe-sm sm:p-8',
          className,
          tw
        )}
        {...(rest as Record<string, unknown>)}
      >
        {body}
      </form>
    </BlockVariantContext.Provider>
  );
});

/* --------------------------------- Export --------------------------------- */

type SettingsFormComponent = typeof SettingsFormRoot & {
  Group: typeof SettingsGroup;
  Field: typeof SettingsField;
  ToggleRow: typeof ToggleRow;
  SaveBar: typeof SettingsSaveBar;
};

export const SettingsForm = SettingsFormRoot as SettingsFormComponent;
SettingsForm.Group = SettingsGroup;
SettingsForm.Field = SettingsField;
SettingsForm.ToggleRow = ToggleRow;
SettingsForm.SaveBar = SettingsSaveBar;
