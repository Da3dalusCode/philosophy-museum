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
export function MuseumModal({labelledBy, describedBy, returnFocus, onClose, children}: {
  labelledBy: string;
  describedBy?: string;
  returnFocus?: HTMLElement | null;
  onClose: () => void;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const previous = returnFocus
      ?? (document.activeElement instanceof HTMLElement ? document.activeElement : undefined);
    dialogRef.current?.focus();
    return () => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const fallback = document.getElementById('museum-enter-button')
            ?? document.querySelector<HTMLElement>('.museum-scene-canvas');
          const target = isVisibleFocusTarget(previous) ? previous : isVisibleFocusTarget(fallback) ? fallback : undefined;
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
      className="museum-overlay-panel"
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
