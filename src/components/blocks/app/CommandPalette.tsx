import React, {
  forwardRef,
  useMemo,
  useState,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import { Dialog } from "../../Dialog";
import { Input } from "../../Input";
import { Kbd } from "../../Kbd";
import {
  mergeTw,
  SlotProps,
  BlockVariantContext,
  useBlockVariant,
} from "../_shared";

/* ════════════════════════════════════════════════════════════════════════
   CommandPalette — themeable ⌘K command menu.
   Composes the library Dialog (focus trap, scroll lock, Esc) + Input + Kbd.
   Controlled via `open` / `onOpenChange`. Filters items by typed text. 6 designs
   via `variant`, a compound slot API for full control, plus a data-prop form.
   Theme-following through semantic tokens only (Dialog's light defaults are
   overridden via `tw`).

     Data-prop form:
     <CommandPalette variant="grouped" open={open} onOpenChange={setOpen}
       groups={[{ label: 'Actions', items: [
         { label: 'New file', shortcut: '⌘N' },
       ] }]} />
   ════════════════════════════════════════════════════════════════════════ */

export type CommandPaletteVariant =
  | "minimal"
  | "grouped"
  | "withFooter"
  | "icons"
  | "recent"
  | "glass";

export const COMMAND_PALETTE_VARIANTS: CommandPaletteVariant[] = [
  "minimal",
  "grouped",
  "withFooter",
  "icons",
  "recent",
  "glass",
];

export interface CommandItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  shortcut?: ReactNode;
  onSelect?: () => void;
}

export interface CommandGroup {
  label?: ReactNode;
  items: CommandItem[];
}

export interface CommandPaletteProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  /** One of the 6 designs. */
  variant?: CommandPaletteVariant;
  className?: string;
  tw?: string;

  /** Whether the palette is open (controlled). */
  open: boolean;
  /** Open-state change callback. */
  onOpenChange: (open: boolean) => void;

  /* —— Data props (used when no children are provided) —— */
  /** Grouped command items. Items are filtered by the typed query. */
  groups?: CommandGroup[];
  /** Input placeholder. */
  placeholder?: string;
}

/* ─────────────────────────────── Surfaces ──────────────────────────────── */

const contentSurfaces: Record<CommandPaletteVariant, string> = {
  minimal: "border border-edge/12 bg-elevated shadow-luxe-sm",
  grouped: "border border-edge/12 bg-elevated shadow-luxe-sm",
  withFooter: "border border-edge/12 bg-elevated shadow-luxe-sm",
  icons: "border border-edge/12 bg-elevated shadow-luxe-sm",
  recent: "border border-edge/12 bg-elevated shadow-luxe-sm",
  glass: "glass",
};

/* ──────────────────────────── Inline icons ──────────────────────────────── */

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="m17 17-3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DefaultCommandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="3.5"
        y="3.5"
        width="13"
        height="13"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M7 10h6M10 7v6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ----------------------------------- Input -------------------------------- */

export interface CommandPaletteInputProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  tw?: string;
}

const CommandPaletteInput = forwardRef<
  HTMLInputElement,
  CommandPaletteInputProps
>(function CommandPaletteInput(
  { value, onValueChange, placeholder, className, tw },
  ref,
) {
  return (
    <div className="flex items-center gap-2 border-b border-edge/10 px-3">
      <span className="text-fg-subtle">
        <SearchIcon className="h-[18px] w-[18px]" />
      </span>
      <Input
        ref={ref}
        autoFocus
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        placeholder={placeholder ?? "Type a command or search…"}
        aria-label="Command"
        className={className}
        tw={mergeTw(
          "h-12 border-0 bg-transparent px-0 text-fg shadow-none placeholder:text-fg-subtle",
          "focus:ring-0 focus:ring-offset-0",
          tw,
        )}
      />
    </div>
  );
});

/* ----------------------------------- Group -------------------------------- */

export interface CommandPaletteGroupProps extends SlotProps {
  label?: ReactNode;
}

const CommandPaletteGroup = forwardRef<
  HTMLDivElement,
  CommandPaletteGroupProps
>(function CommandPaletteGroup(
  { label, children, className, tw, ...rest },
  ref,
) {
  const variant = useBlockVariant() as unknown as CommandPaletteVariant;
  const showLabel = label && variant !== "minimal";
  // Hide an empty group (all items filtered out).
  if (React.Children.count(children) === 0) return null;

  return (
    <div ref={ref} className={mergeTw("px-2 py-1.5", className, tw)} {...rest}>
      {showLabel ? (
        <p className="px-2 pb-1 pt-1.5 font-mono text-[10px] uppercase tracking-widest text-fg-subtle">
          {label}
        </p>
      ) : null}
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
});

/* ----------------------------------- Item --------------------------------- */

export interface CommandPaletteItemProps extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  "onSelect"
> {
  label?: string;
  icon?: ReactNode;
  shortcut?: ReactNode;
  onSelect?: () => void;
  className?: string;
  tw?: string;
}

const CommandPaletteItem = forwardRef<
  HTMLButtonElement,
  CommandPaletteItemProps
>(function CommandPaletteItem(
  { label, icon, shortcut, onSelect, children, className, tw, ...rest },
  ref,
) {
  const variant = useBlockVariant() as unknown as CommandPaletteVariant;
  const showIcon = variant === "icons" || variant === "recent" || icon;

  return (
    <button
      ref={ref}
      type="button"
      onClick={onSelect}
      className={mergeTw(
        "group flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm text-fg-muted transition-colors",
        "hover:bg-primary/12 hover:text-fg focus:bg-primary/12 focus:text-fg focus:outline-none",
        className,
        tw,
      )}
      {...rest}
    >
      {showIcon ? (
        <span className="grid h-5 w-5 shrink-0 place-items-center text-fg-subtle group-hover:text-primary group-focus:text-primary">
          {icon ?? <DefaultCommandIcon className="h-[18px] w-[18px]" />}
        </span>
      ) : null}
      <span className="flex-1 truncate">{children ?? label}</span>
      {shortcut ? (
        <span className="ml-auto flex shrink-0 items-center gap-1">
          {typeof shortcut === "string"
            ? shortcut.split(" ").map((k, i) => <Kbd key={i}>{k}</Kbd>)
            : shortcut}
        </span>
      ) : null}
    </button>
  );
});

/* ----------------------------------- Footer ------------------------------- */

const CommandPaletteFooter = forwardRef<HTMLDivElement, SlotProps>(
  function CommandPaletteFooter({ children, className, tw, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={mergeTw(
          "flex items-center gap-4 border-t border-edge/10 px-3 py-2 text-[11px] text-fg-subtle",
          className,
          tw,
        )}
        {...rest}
      >
        {children ?? (
          <>
            <span className="flex items-center gap-1.5">
              <Kbd>↵</Kbd> to select
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd> to navigate
            </span>
            <span className="ml-auto flex items-center gap-1.5">
              <Kbd>esc</Kbd> to close
            </span>
          </>
        )}
      </div>
    );
  },
);

/* --------------------------------- Empty ---------------------------------- */

function CommandEmpty({ query }: { query: string }) {
  return (
    <div className="px-4 py-10 text-center">
      <p className="text-sm text-fg-muted">
        No results for <span className="font-medium text-fg">“{query}”</span>
      </p>
    </div>
  );
}

/* ----------------------------------- Root --------------------------------- */

const CommandPaletteRoot = forwardRef<HTMLDivElement, CommandPaletteProps>(
  function CommandPalette(
    {
      variant = "grouped",
      className,
      tw,
      open,
      onOpenChange,
      children,
      groups,
      placeholder,
      ...rest
    },
    ref,
  ) {
    const [query, setQuery] = useState("");
    const hasChildren = React.Children.count(children) > 0;
    const showFooter = variant === "withFooter" || variant === "glass";

    const close = () => onOpenChange(false);

    // Filter groups/items by the typed query (data-prop form only).
    const filtered = useMemo(() => {
      if (!groups) return [];
      const q = query.trim().toLowerCase();
      if (!q) return groups;
      return groups
        .map((g) => ({
          ...g,
          items: g.items.filter((it) => it.label.toLowerCase().includes(q)),
        }))
        .filter((g) => g.items.length > 0);
    }, [groups, query]);

    const isEmpty = !hasChildren && filtered.length === 0;

    return (
      <BlockVariantContext.Provider value={variant as never}>
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
          <Dialog.Overlay tw="z-40 bg-canvas/70 backdrop-blur-md" />
          <Dialog.Content
            ref={ref}
            data-variant={variant}
            className={className}
            tw={mergeTw(
              "mt-[-12vh] w-full max-w-xl overflow-hidden rounded-2xl p-0 text-fg",
              contentSurfaces[variant],
              tw,
            )}
            {...rest}
          >
            {/* a11y: title/description for the dialog, visually hidden */}
            <Dialog.Title tw="sr-only">Command palette</Dialog.Title>
            <Dialog.Description tw="sr-only">
              Search for a command or page and press Enter to run it.
            </Dialog.Description>

            {hasChildren ? (
              children
            ) : (
              <>
                <CommandPaletteInput
                  value={query}
                  onValueChange={setQuery}
                  placeholder={placeholder}
                />

                <div className="scrollbar-luxe max-h-[min(24rem,60vh)] overflow-y-auto py-1">
                  {isEmpty ? (
                    <CommandEmpty query={query} />
                  ) : (
                    filtered.map((g, gi) => (
                      <CommandPaletteGroup key={gi} label={g.label}>
                        {g.items.map((it, ii) => (
                          <CommandPaletteItem
                            key={ii}
                            label={it.label}
                            icon={it.icon}
                            shortcut={it.shortcut}
                            onSelect={() => {
                              it.onSelect?.();
                              close();
                            }}
                          />
                        ))}
                      </CommandPaletteGroup>
                    ))
                  )}
                </div>

                {showFooter ? <CommandPaletteFooter /> : null}
              </>
            )}
          </Dialog.Content>
        </Dialog.Root>
      </BlockVariantContext.Provider>
    );
  },
);

/* --------------------------------- Export --------------------------------- */

type CommandPaletteComponent = typeof CommandPaletteRoot & {
  Input: typeof CommandPaletteInput;
  Group: typeof CommandPaletteGroup;
  Item: typeof CommandPaletteItem;
  Footer: typeof CommandPaletteFooter;
};

export const CommandPalette = CommandPaletteRoot as CommandPaletteComponent;
CommandPalette.Input = CommandPaletteInput;
CommandPalette.Group = CommandPaletteGroup;
CommandPalette.Item = CommandPaletteItem;
CommandPalette.Footer = CommandPaletteFooter;
