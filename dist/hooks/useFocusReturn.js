import { useEffect, useRef } from 'react';
/**
 * Returns focus to the previously focused element when unmounted.
 * Useful for dialogs and modals.
 */
export function useFocusReturn() {
    const previousFocus = useRef(null);
    useEffect(() => {
        previousFocus.current = document.activeElement;
        return () => {
            if (previousFocus.current && typeof previousFocus.current.focus === 'function') {
                previousFocus.current.focus();
            }
        };
    }, []);
}
