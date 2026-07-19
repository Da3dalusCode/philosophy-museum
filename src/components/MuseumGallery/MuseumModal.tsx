import {
  useEffect,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from 'react';

const focusableSelector = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';
const isVisibleFocusTarget = (item: HTMLElement | null | undefined): item is HTMLElement => Boolean(
  item
  && item.isConnected
  && !item.matches(':disabled')
  && !item.closest('[inert],[aria-hidden="true"],[hidden]')
  && (item.offsetWidth || item.offsetHeight || item.getClientRects().length),
);
const visibleFocusable = (root: HTMLElement): HTMLElement[] => [...root.querySelectorAll<HTMLElement>(focusableSelector)]
  .filter(isVisibleFocusTarget);

/** Shared accessible overlay shell for Museum directory, help, and visitor map. */
export function MuseumModal({labelledBy, describedBy, panelClassName, returnFocus, onClose, children}: {
  labelledBy: string;
  describedBy?: string;
  panelClassName?: string;
  returnFocus?: HTMLElement | null;
  onClose: () => void;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    const previous = returnFocus
      ?? (document.activeElement instanceof HTMLElement ? document.activeElement : undefined);
    dialogRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const activeTarget = document.activeElement instanceof HTMLElement
            ? document.activeElement
            : undefined;
          // A travel failure deliberately moves focus to its visible Retry
          // action before this delayed cleanup runs. Preserve that newer,
          // connected target instead of restoring the stale modal opener.
          if (activeTarget !== document.body && isVisibleFocusTarget(activeTarget)) return;
          // Resumed exploration owns focus after an overlay closes. Resolve
          // this at cleanup time so an explicit travel action cannot be
          // overridden by the opener captured when the modal first mounted.
          const exploringCanvas = document.querySelector<HTMLElement>(
            '.museum-page[data-exploring="true"] .museum-scene-canvas',
          );
          const fallback = document.getElementById('museum-enter-button')
            ?? document.querySelector<HTMLElement>('.museum-scene-canvas');
          const target = isVisibleFocusTarget(exploringCanvas)
            ? exploringCanvas
            : isVisibleFocusTarget(previous)
              ? previous
              : isVisibleFocusTarget(fallback)
                ? fallback
                : undefined;
          target?.focus({preventScroll: true});
        });
      });
    };
  }, []);

  const trapFocus = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== 'Tab' || !dialogRef.current) return;
    const focusable = visibleFocusable(dialogRef.current);
    if (!focusable.length) {
      event.preventDefault();
      dialogRef.current.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable.at(-1)!;
    if (!focusable.includes(document.activeElement as HTMLElement)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return <div className="museum-overlay-backdrop" role="presentation" onMouseDown={(event) => {
    if (event.target === event.currentTarget) onClose();
  }}>
    <section
      className={['museum-overlay-panel', panelClassName].filter(Boolean).join(' ')}
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      tabIndex={-1}
      onKeyDown={trapFocus}
    >{children}</section>
  </div>;
}
