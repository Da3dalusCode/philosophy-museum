import {BookOpen, CheckCircle2, RefreshCw, Scale, SearchCheck} from 'lucide-react';

const statuses = [
  ['Editorial review not started', 'No claim-level source review is recorded. The page may still be useful as an atlas draft.'],
  ['Bibliography available', 'References are present, but they are not mapped to the claims they might support.'],
  ['Sources mapped to claims', 'Citations point from claims to source records, but a complete editorial claim review is not recorded.'],
  ['Claim review current', 'The page received the documented pilot review and its current claim-bearing content matches the stored review lock.'],
  ['Claim review needs renewal', 'The content, citation, or cited-source metadata changed after review. The current badge is withdrawn automatically.'],
] as const;

export function EditorialMethodology() {
  return <div className="page methodology-page">
    <header className="methodology-hero">
      <div className="eyebrow"><SearchCheck size={16}/> Editorial credibility</div>
      <h1>How Philosophy Atlas reviews claims</h1>
      <p>Philosophy Atlas is an educational atlas, not a peer-reviewed journal. Its editorial system makes the state and limits of each page visible instead of treating a bibliography as proof that every sentence has been checked.</p>
    </header>

    <section className="methodology-grid" aria-label="Editorial method overview">
      <article><BookOpen/><h2>Evidence is separated from reading</h2><p>Numbered citations identify sources actually used for a nearby claim. “Further reading” is a recommendation list and does not count as evidence in the coverage report.</p></article>
      <article><Scale/><h2>Disagreement stays visible</h2><p>When evidence permits competing interpretations, the page names the disagreement and attributes positions. It does not convert one reconstruction into consensus.</p></article>
      <article><RefreshCw/><h2>Reviews can become stale</h2><p>A deterministic lock covers claim-bearing prose, structured facts, citations, and cited-source metadata. A mismatch changes the public status until the page is reviewed again.</p></article>
    </section>

    <section className="methodology-section">
      <h2>What the statuses mean</h2>
      <div className="methodology-status-list">{statuses.map(([label, explanation]) => <article key={label}><CheckCircle2/><div><h3>{label}</h3><p>{explanation}</p></div></article>)}</div>
    </section>

    <section className="methodology-section prose-stack">
      <h2>Review method and limits</h2>
      <p>A claim review checks the visitor-facing article, structured profile facts, classifications, dates, works, influence statements, reading recommendations, and the reused atlas descriptions included in that pilot’s recorded scope. Reviewers prefer primary texts in recognized editions or translations, specialist reference works, university-press scholarship, peer-reviewed research, and stable institutional archives. Exact locators use durable divisions such as dialogue sections, chapters, verses, or article sections whenever possible.</p>
      <p>“Claim review current” means the recorded scope was checked against the listed evidence on the recorded date. It does not mean the page is exhaustive, permanently correct, independently peer reviewed, or free from interpretive judgment. Automated checks validate structure, coverage, identifiers, locators, and review freshness; they cannot decide whether a philosophical interpretation is fair or whether scholarship has reached consensus.</p>
      <p>Dates may be approximate, traditional biographies may exceed what historical evidence can establish, translations can encode interpretation, and categories such as “school,” “founder,” or “influence” may be retrospective. Cross-cultural pages therefore distinguish textual evidence, later tradition, and modern scholarly reconstruction, and they avoid presenting one modern taxonomy as a culture’s own uncontested scheme.</p>
      <p>Automated writing tools may assist with organization, code, consistency checks, and draft synthesis. They are not treated as sources. Citable assertions must be supported by the recorded source set, and the pilot review notes preserve corrections, qualifications, disputes, unresolved questions, commands, and the review lock.</p>
    </section>

    <section className="methodology-section">
      <h2>Phased review</h2>
      <p>The atlas contains a large local corpus. Most pages therefore begin as unreviewed or bibliography-only material. Review proceeds in globally diverse batches, with high-risk biography, quotation, chronology, influence, origin, and cross-cultural claims prioritized. The public status on each page—not the presence of polished prose—indicates how far that work has progressed.</p>
    </section>
  </div>;
}
