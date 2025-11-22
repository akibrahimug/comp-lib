import { useEffect, useRef } from 'react';

/**
 * Returns focus to the previously focused element when unmounted.
 * Useful for dialogs and modals.
 */
export function useFocusReturn(): void {
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement;

    return () => {
      if (previousFocus.current && typeof previousFocus.current.focus === 'function') {
        previousFocus.current.focus();
      }
    };
  }, []);
}
