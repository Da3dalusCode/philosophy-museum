import {Component, lazy, Suspense, useEffect, useState, type ReactNode} from 'react';

const LazyConstellationScene = lazy(() => import('./IdeaConstellationScene'));

type IdleWindow = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback?: (handle: number) => void;
};

class ConstellationBoundary extends Component<{children: ReactNode}, {failed: boolean}> {
  state = {failed: false};

  static getDerivedStateFromError(): {failed: boolean} {
    return {failed: true};
  }

  componentDidCatch(error: unknown): void {
    console.warn('The decorative idea constellation could not be rendered.', error);
  }

  render() {
    return this.state.failed ? <ConstellationPlaceholder/> : this.props.children;
  }
}

function ConstellationPlaceholder() {
  return <div className="constellation-static" aria-hidden="true"/>;
}

export function IdeaConstellation() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const idleWindow = window as IdleWindow;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;
    let cancelled = false;

    const clearPending = () => {
      if (idleHandle !== undefined) idleWindow.cancelIdleCallback?.(idleHandle);
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
      idleHandle = undefined;
      timeoutHandle = undefined;
      window.removeEventListener('load', scheduleAfterLoad);
      document.removeEventListener('visibilitychange', scheduleWhenVisible);
    };

    const reveal = () => {
      idleHandle = undefined;
      timeoutHandle = undefined;
      if (!cancelled && !motion.matches) setShouldLoad(true);
    };

    const scheduleIdle = () => {
      if (cancelled || motion.matches) return;
      if (document.hidden) {
        document.addEventListener('visibilitychange', scheduleWhenVisible, {once: true});
        return;
      }
      if (idleWindow.requestIdleCallback) {
        idleHandle = idleWindow.requestIdleCallback(reveal, {timeout: 2500});
      } else {
        timeoutHandle = window.setTimeout(reveal, 1200);
      }
    };

    function scheduleAfterLoad() {
      scheduleIdle();
    }

    function scheduleWhenVisible() {
      if (!document.hidden) scheduleIdle();
    }

    const schedule = () => {
      if (document.readyState === 'complete') scheduleIdle();
      else window.addEventListener('load', scheduleAfterLoad, {once: true});
    };

    const onMotionChange = () => {
      clearPending();
      if (motion.matches) setShouldLoad(false);
      else schedule();
    };

    motion.addEventListener('change', onMotionChange);
    if (!motion.matches) schedule();

    return () => {
      cancelled = true;
      clearPending();
      motion.removeEventListener('change', onMotionChange);
    };
  }, []);

  return <div className="constellation" aria-hidden="true">
    <ConstellationBoundary>
      {shouldLoad
        ? <Suspense fallback={<ConstellationPlaceholder/>}><LazyConstellationScene/></Suspense>
        : <ConstellationPlaceholder/>}
    </ConstellationBoundary>
  </div>;
}
