import {ArrowRight, BookOpen, Landmark} from 'lucide-react';
import {
  getMuseumLegacyExhibitCompatibility,
  MUSEUM_HALL_ROUTE_ALIASES,
} from '../../data/museumCatalog';
import type {MuseumCompatibilityRoute, RouteHref} from '../../routing/routes';

export function MuseumCompatibilityPage({route, href}: {
  route: MuseumCompatibilityRoute;
  href: RouteHref;
}) {
  const record = getMuseumLegacyExhibitCompatibility(route.formerHallId, route.exhibitId);
  const successorHallId = MUSEUM_HALL_ROUTE_ALIASES[
    route.formerHallId as keyof typeof MUSEUM_HALL_ROUTE_ALIASES
  ];

  if (!record) return <main className="page compact-content-page museum-compatibility-page">
    <div className="eyebrow">Museum collection update</div>
    <h1>This former installation cannot be resolved</h1>
    <p>The requested route is preserved, but its former exhibit record is unavailable.</p>
    <a className="btn btn-primary" href={href({kind: 'museum', hallId: successorHallId})}>Open the permanent Museum</a>
  </main>;

  const articleRoute = record.entityKind === 'philosopher'
    ? {kind: 'philosopher' as const, philosopherId: record.entityId}
    : {kind: 'branch' as const, branchId: record.entityId};

  return <main className="page compact-content-page museum-compatibility-page">
    <div className="eyebrow">Museum collection update</div>
    <h1>{record.displayName} is not currently installed</h1>
    <p className="lead">The former prototype installation has been retired while the permanent Ring of Wings is built. The underlying Atlas record, article, relationships, media, and source data have not been deleted.</p>

    <section className="museum-compatibility-status" aria-labelledby="museum-compatibility-status-title">
      <Landmark aria-hidden="true"/>
      <div>
        <p className="eyebrow" id="museum-compatibility-status-title">Planned primary home</p>
        <h2>{record.plannedHallTitle}</h2>
        <p>This hall belongs to the approved Museum masterplan but is not open in the current six-hall construction stage.</p>
      </div>
    </section>

    <div className="hero-actions">
      <a className="btn btn-primary" href={href(articleRoute)}><BookOpen size={16}/> Open the full Atlas article</a>
      <a className="btn btn-secondary" href={href({kind: 'museum', hallId: successorHallId})}>Enter the permanent Museum <ArrowRight size={16}/></a>
    </div>
  </main>;
}
