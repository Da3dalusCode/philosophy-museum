import {useEffect, useState} from 'react';
import {museumPilotDebugEnabled} from './museumPilotDebug';

export type MuseumControlScheme = 'desktop' | 'touch';

const TOUCH_POINTER_QUERY = '(any-pointer: coarse)';

export const readMuseumControlScheme = (): MuseumControlScheme => {
  if (typeof window === 'undefined') return 'desktop';
  const forcedTouchPilot = museumPilotDebugEnabled()
    && new URLSearchParams(window.location.search).get('museumControls') === 'touch';
  return forcedTouchPilot
    || window.matchMedia(TOUCH_POINTER_QUERY).matches
    || navigator.maxTouchPoints > 0
    ? 'touch'
    : 'desktop';
};

/** Keep rendered controls and first-visit guidance on the same input contract. */
export function useMuseumControlScheme(): MuseumControlScheme {
  const [scheme, setScheme] = useState(readMuseumControlScheme);

  useEffect(() => {
    const pointerQuery = window.matchMedia(TOUCH_POINTER_QUERY);
    const reconcile = () => setScheme(readMuseumControlScheme());
    pointerQuery.addEventListener('change', reconcile);
    window.addEventListener('resize', reconcile);
    window.addEventListener('orientationchange', reconcile);
    return () => {
      pointerQuery.removeEventListener('change', reconcile);
      window.removeEventListener('resize', reconcile);
      window.removeEventListener('orientationchange', reconcile);
    };
  }, []);

  return scheme;
}
