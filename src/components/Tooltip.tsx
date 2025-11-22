import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { createPortal } from 'react-dom';
import { useStableId } from '../hooks/useStableId';
import { mergeTw } from '../core/mergeTw';

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  tooltipId: string;
  position: Position;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

function useTooltipContext() {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('Tooltip compound components must be used within Tooltip.Root');
  }
  return context;
}

type Position = 'top' | 'right' | 'bottom' | 'left';

/* ---------------------------------- Root ---------------------------------- */

export interface TooltipRootProps {
  /** Children */
  children: ReactNode;
  /** Position of the tooltip */
  position?: Position;
}

const TooltipRoot = ({ children, position = 'top' }: TooltipRootProps) => {
  const [open, setOpen] = useState(false);
  const tooltipId = useStableId('tooltip');

  return (
    <TooltipContext.Provider value={{ open, setOpen, tooltipId, position }}>
      {children}
    </TooltipContext.Provider>
  );
};

/* -------------------------------- Trigger --------------------------------- */

export interface TooltipTriggerProps extends HTMLAttributes<HTMLElement> {
  /** Children */
  children: ReactNode;
  /** Element type to render */
  as?: 'button' | 'span' | 'div';
  /** Additional className */
  className?: string;
  /** Additional Tailwind classes */
  tw?: string;
}

const TooltipTrigger = forwardRef<any, TooltipTriggerProps>(function TooltipTrigger(
  { children, as: Component = 'button', className, tw, ...props },
  ref
) {
  const { setOpen, tooltipId } = useTooltipContext();

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);
  const handleFocus = () => setOpen(true);
  const handleBlur = () => setOpen(false);

  const Element = Component as React.ElementType;

  return (
    <Element
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-describedby={tooltipId}
      className={mergeTw(className, tw)}
      {...props}
    >
      {children}
    </Element>
  );
});

/* -------------------------------- Content --------------------------------- */

export interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional className */
  className?: string;
  /** Additional Tailwind classes */
  tw?: string;
}

const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(function TooltipContent(
  { children, className, tw, ...props },
  ref
) {
  const { open, tooltipId, position } = useTooltipContext();
  const contentRef = useRef<HTMLDivElement | null>(null);

  if (!open) return null;

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900',
  };

  const handleRef = (node: HTMLDivElement | null) => {
    contentRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  };

  return createPortal(
    <div
      ref={handleRef}
      id={tooltipId}
      role="tooltip"
      className={mergeTw(
        'absolute z-50 px-3 py-1.5 text-sm text-white bg-gray-900 rounded-md shadow-lg',
        'animate-zoom-in-95',
        positionClasses[position],
        className,
        tw
      )}
      {...props}
    >
      {children}
      <div
        className={mergeTw('absolute w-0 h-0 border-4', arrowClasses[position])}
        aria-hidden="true"
      />
    </div>,
    document.body
  );
});

/* --------------------------------- Export --------------------------------- */

/**
 * Tooltip component that shows on hover or focus.
 * Supports top, right, bottom, and left positioning.
 *
 * @example
 * <Tooltip.Root position="top">
 *   <Tooltip.Trigger>Hover me</Tooltip.Trigger>
 *   <Tooltip.Content>Tooltip content</Tooltip.Content>
 * </Tooltip.Root>
 */
export const Tooltip = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
};
