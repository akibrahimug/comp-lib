import { useLayoutEffect } from 'react';
/**
 * SSR-safe layout effect hook. Uses useLayoutEffect on the client and useEffect on the server.
 */
export declare const useIsomorphicLayoutEffect: typeof useLayoutEffect;
