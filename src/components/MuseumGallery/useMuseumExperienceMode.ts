import {
  useCallback,
  useEffect,
  useState,
  type RefObject,
} from 'react';

const IMMERSIVE_BODY_CLASS = 'museum-immersive';
const FULLSCREEN_ERROR_MESSAGE = 'Fullscreen could not be started. The Museum remains available in the current view.';

const supportsFullscreen = (): boolean =>
  typeof document !== 'undefined'
  && document.fullscreenEnabled
  && typeof document.documentElement.requestFullscreen === 'function'
  && typeof document.exitFullscreen === 'function';

const isInteractiveTarget = (target: EventTarget | null): boolean =>
  target instanceof Element
  && Boolean(target.closest(
    'input, textarea, select, button, a, [contenteditable]:not([contenteditable="false"])',
  ));

export type MuseumExperienceModeOptions = {
  experienceRootRef: RefObject<HTMLElement | null>;
  shortcutBlocked: boolean;
};

export type MuseumExperienceMode = {
  immersive: boolean;
  fullscreen: boolean;
  fullscreenSupported: boolean;
  fullscreenError: string | null;
  toggleImmersive: () => void;
  toggleFullscreen: () => Promise<void>;
  clearError: () => void;
};

/** Owns route-scoped immersive presentation and the Museum root's real fullscreen state. */
export function useMuseumExperienceMode({
  experienceRootRef,
  shortcutBlocked,
}: MuseumExperienceModeOptions): MuseumExperienceMode {
  const [immersive, setImmersive] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState<string | null>(null);
  const fullscreenSupported = supportsFullscreen();

  const clearError = useCallback(() => setFullscreenError(null), []);
  const toggleImmersive = useCallback(() => setImmersive((active) => !active), []);

  const toggleFullscreen = useCallback(async () => {
    const root = experienceRootRef.current;
    setFullscreenError(null);
    if (!root || !supportsFullscreen()) return;

    try {
      if (document.fullscreenElement === root) await document.exitFullscreen();
      else await root.requestFullscreen();
    } catch {
      setFullscreenError(FULLSCREEN_ERROR_MESSAGE);
    }
  }, [experienceRootRef]);

  useEffect(() => {
    document.body.classList.toggle(IMMERSIVE_BODY_CLASS, immersive);
    return () => document.body.classList.remove(IMMERSIVE_BODY_CLASS);
  }, [immersive]);

  useEffect(() => {
    const ownedRoot = experienceRootRef.current;
    const syncFullscreenState = () => {
      setFullscreen(Boolean(
        experienceRootRef.current
        && document.fullscreenElement === experienceRootRef.current,
      ));
    };
    const handleFullscreenError = () => setFullscreenError(FULLSCREEN_ERROR_MESSAGE);

    syncFullscreenState();
    document.addEventListener('fullscreenchange', syncFullscreenState);
    document.addEventListener('fullscreenerror', handleFullscreenError);
    return () => {
      document.removeEventListener('fullscreenchange', syncFullscreenState);
      document.removeEventListener('fullscreenerror', handleFullscreenError);
      if (ownedRoot && document.fullscreenElement === ownedRoot) {
        void document.exitFullscreen().catch(() => undefined);
      }
    };
  }, [experienceRootRef]);

  useEffect(() => {
    if (!fullscreenSupported) return;
    const handleShortcut = (event: KeyboardEvent) => {
      if (
        event.code !== 'KeyF'
        || event.repeat
        || event.altKey
        || event.ctrlKey
        || event.metaKey
        || event.shiftKey
        || shortcutBlocked
        || isInteractiveTarget(event.target)
      ) return;
      event.preventDefault();
      void toggleFullscreen();
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, [fullscreenSupported, shortcutBlocked, toggleFullscreen]);

  return {
    immersive,
    fullscreen,
    fullscreenSupported,
    fullscreenError,
    toggleImmersive,
    toggleFullscreen,
    clearError,
  };
}
