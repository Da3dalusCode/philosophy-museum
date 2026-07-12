import {routeToHash} from './hashRouter';
import {DEFAULT_ROUTES,type NotFoundRoute} from './routes';

export function RouteNotFound({route}:{route:NotFoundRoute}){
  return <div className="page compact-content-page route-not-found"><div className="eyebrow">Route not found</div><h1>That atlas route does not exist</h1><p>{route.reason}</p><p><code>{route.requestedHash||'(empty route)'}</code></p><div className="hero-actions"><a className="btn btn-primary" href={routeToHash(DEFAULT_ROUTES.history)}>Return to Big History</a><a className="btn btn-secondary" href={routeToHash(DEFAULT_ROUTES.branch)}>Browse branches</a><a className="btn btn-secondary" href={routeToHash(DEFAULT_ROUTES.philosopher)}>Browse philosophers</a></div></div>;
}
