import {Component, createRef, type ErrorInfo, type ReactNode} from 'react';
import {routeToHash} from './hashRouter';
import {isRouteLoadError} from './routeLoadErrors';
import {DEFAULT_ROUTES} from './routes';

type RouteLoadBoundaryProps = {
  children: ReactNode;
  resetKey: string;
};

type RouteLoadBoundaryState = {
  error: unknown;
  resetKey: string;
};

export class RouteLoadBoundary extends Component<RouteLoadBoundaryProps, RouteLoadBoundaryState> {
  private readonly headingRef = createRef<HTMLHeadingElement>();

  state: RouteLoadBoundaryState = {
    error: null,
    resetKey: this.props.resetKey,
  };

  static getDerivedStateFromError(error: unknown): Partial<RouteLoadBoundaryState> {
    return {error};
  }

  static getDerivedStateFromProps(
    props: RouteLoadBoundaryProps,
    state: RouteLoadBoundaryState,
  ): Partial<RouteLoadBoundaryState> | null {
    return props.resetKey === state.resetKey
      ? null
      : {error: null, resetKey: props.resetKey};
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    if (isRouteLoadError(error)) {
      console.error('A route module could not be loaded.', error, info.componentStack);
      this.headingRef.current?.focus();
    }
  }

  render() {
    if (!this.state.error) return this.props.children;
    if (!isRouteLoadError(this.state.error)) throw this.state.error;

    return <section className="route-load-state route-load-error" role="alert">
      <p className="eyebrow">This gallery needs a fresh copy</p>
      <h2 ref={this.headingRef} tabIndex={-1}>The requested exhibit could not be loaded.</h2>
      <p>A deployment may have replaced an older cached module. Reload the atlas to request the current files.</p>
      <div className="route-load-actions">
        <button className="btn btn-primary" type="button" onClick={() => window.location.reload()}>Reload atlas</button>
        <a className="btn" href={routeToHash(DEFAULT_ROUTES.history)}>Return to Big History</a>
      </div>
    </section>;
  }
}

export function RouteLoading() {
  return <div className="route-load-state route-loading" role="status" aria-live="polite">
    <span className="route-loading-mark" aria-hidden="true"/>
    <div><b>Opening exhibit</b><p>Preparing this part of the atlas…</p></div>
  </div>;
}
