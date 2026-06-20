import React, {
  createContext,
  useContext,
  useState,
  forwardRef,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { useStableId } from '../hooks/useStableId';
import { mergeTw } from '../core/mergeTw';

/* --------------------------------- Context -------------------------------- */

interface AccordionContextValue {
  isOpen: (value: string) => boolean;
  toggle: (value: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('Accordion components must be used within Accordion.Root');
  return ctx;
}

interface ItemContextValue {
  value: string;
  open: boolean;
  disabled?: boolean;
  triggerId: string;
  panelId: string;
}

const ItemContext = createContext<ItemContextValue | null>(null);

function useItemContext() {
  const ctx = useContext(ItemContext);
  if (!ctx) throw new Error('Accordion.Trigger / Content must be used within Accordion.Item');
  return ctx;
}

/* ---------------------------------- Root ---------------------------------- */

export interface AccordionRootProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Whether one or many items can be open at once */
  type?: 'single' | 'multiple';
  /** Controlled open values */
  value?: string[];
  /** Default open values (uncontrolled) */
  defaultValue?: string[];
  /** Change callback */
  onValueChange?: (value: string[]) => void;
  /** In `single` mode, allow closing the open item */
  collapsible?: boolean;
  className?: string;
  tw?: string;
}

const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>(function AccordionRoot(
  { type = 'single', value, defaultValue = [], onValueChange, collapsible = true, className, tw, children, ...props },
  ref
) {
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const isControlled = value !== undefined;
  const open = isControlled ? value : internal;

  const setOpen = (next: string[]) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  const toggle = (val: string) => {
    const isOpen = open.includes(val);
    if (type === 'single') {
      setOpen(isOpen ? (collapsible ? [] : [val]) : [val]);
    } else {
      setOpen(isOpen ? open.filter((v) => v !== val) : [...open, val]);
    }
  };

  return (
    <AccordionContext.Provider value={{ isOpen: (v) => open.includes(v), toggle, type }}>
      <div ref={ref} className={mergeTw('w-full divide-y divide-gray-200', className, tw)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
});

/* ---------------------------------- Item ---------------------------------- */

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  className?: string;
  tw?: string;
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { value, disabled, className, tw, children, ...props },
  ref
) {
  const { isOpen } = useAccordionContext();
  const id = useStableId('accordion');
  const open = isOpen(value);

  return (
    <ItemContext.Provider
      value={{ value, open, disabled, triggerId: `${id}-trigger`, panelId: `${id}-panel` }}
    >
      <div ref={ref} data-state={open ? 'open' : 'closed'} className={mergeTw(className, tw)} {...props}>
        {children}
      </div>
    </ItemContext.Provider>
  );
});

/* -------------------------------- Trigger --------------------------------- */

export interface AccordionTriggerProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  className?: string;
  tw?: string;
}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(function AccordionTrigger(
  { className, tw, children, ...props },
  ref
) {
  const { toggle } = useAccordionContext();
  const { value, open, disabled, triggerId, panelId } = useItemContext();

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!disabled) toggle(value);
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      id={triggerId}
      aria-expanded={open}
      aria-controls={panelId}
      disabled={disabled}
      onClick={() => !disabled && toggle(value)}
      onKeyDown={handleKeyDown}
      className={mergeTw(
        'flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium text-gray-900',
        'transition-colors hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600',
        disabled && 'cursor-not-allowed opacity-50',
        className,
        tw
      )}
      {...props}
    >
      <span className="flex-1">{children}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={mergeTw('shrink-0 text-gray-400 transition-transform duration-200', open && 'rotate-180')}
      >
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
});

/* -------------------------------- Content --------------------------------- */

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  tw?: string;
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(function AccordionContent(
  { className, tw, children, ...props },
  ref
) {
  const { open, triggerId, panelId } = useItemContext();

  return (
    <div
      ref={ref}
      id={panelId}
      role="region"
      aria-labelledby={triggerId}
      hidden={!open}
      className={mergeTw('overflow-hidden text-sm text-gray-600', open && 'animate-fade-in', className, tw)}
      {...props}
    >
      <div className="pb-4">{children}</div>
    </div>
  );
});

/* --------------------------------- Export --------------------------------- */

/**
 * Accordion with single/multiple expansion, full keyboard support and ARIA wiring.
 *
 * @example
 * <Accordion.Root type="single" collapsible defaultValue={['a']}>
 *   <Accordion.Item value="a">
 *     <Accordion.Trigger>Question?</Accordion.Trigger>
 *     <Accordion.Content>Answer.</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion.Root>
 */
export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};
