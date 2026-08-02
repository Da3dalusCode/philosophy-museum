import type {
  ArticleSection,
  CitationReference,
  EditorialSource,
  Philosopher,
} from '../../types/philosophy';
import {citation as c, paragraph as p, structuredClaim as claim} from './pilotHelpers';

const sources: EditorialSource[] = [
  {
    id: 'kant-sep', type: 'scholarly-reference', authors: ['Michael Rohlf'], title: 'Immanuel Kant',
    containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'],
    publisher: 'Metaphysics Research Lab, Stanford University', year: 2024,
    url: 'https://plato.stanford.edu/entries/kant/', accessedOn: '2026-08-01',
    note: 'Specialist overview used for biography, the critical project, theoretical philosophy, practical philosophy, and reception.',
  },
  {
    id: 'kant-iep', type: 'scholarly-reference', authors: ['Tim Jankowiak'], title: 'Immanuel Kant',
    containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin',
    url: 'https://iep.utm.edu/kantview/', accessedOn: '2026-08-01',
    note: 'Independent specialist overview used for chronology, development, and cross-checking the system-wide summary.',
  },
  {
    id: 'kant-ti-sep', type: 'scholarly-reference', authors: ['Nicholas F. Stang'], title: 'Kant’s Transcendental Idealism',
    containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta'],
    publisher: 'Metaphysics Research Lab, Stanford University', year: 2016,
    url: 'https://plato.stanford.edu/entries/kant-transcendental-idealism/', accessedOn: '2026-08-01',
    note: 'Specialist account used to preserve major one-world, two-world, and related interpretive disputes.',
  },
  {
    id: 'kant-moral-sep', type: 'scholarly-reference', authors: ['Robert Johnson', 'Adam Cureton'], title: 'Kant’s Moral Philosophy',
    containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'],
    publisher: 'Metaphysics Research Lab, Stanford University', year: 2025,
    url: 'https://plato.stanford.edu/entries/kant-moral/', accessedOn: '2026-08-01',
    note: 'Specialist account used for duty, autonomy, the categorical imperative, virtue, motivation, and objections.',
  },
  {
    id: 'kant-aesthetics-sep', type: 'scholarly-reference', authors: ['Hannah Ginsborg'], title: 'Kant’s Aesthetics and Teleology',
    containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta'],
    publisher: 'Metaphysics Research Lab, Stanford University', year: 2022,
    url: 'https://plato.stanford.edu/entries/kant-aesthetics/', accessedOn: '2026-08-01',
    note: 'Specialist account used for beauty, sublimity, reflective judgment, organisms, and purposiveness.',
  },
  {
    id: 'kant-politics-sep', type: 'scholarly-reference', authors: ['Frederick Rauscher'], title: 'Kant’s Social and Political Philosophy',
    containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'],
    publisher: 'Metaphysics Research Lab, Stanford University', year: 2026,
    url: 'https://plato.stanford.edu/entries/kant-social-political/', accessedOn: '2026-08-01',
    note: 'Specialist account used for right, coercion, property, punishment, citizenship, history, and cosmopolitan right.',
  },
  {
    id: 'kant-religion-sep', type: 'scholarly-reference', authors: ['Lawrence Pasternack', 'Courtney Fugate'], title: 'Kant’s Philosophy of Religion',
    containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'],
    publisher: 'Metaphysics Research Lab, Stanford University', year: 2025,
    url: 'https://plato.stanford.edu/entries/kant-religion/', accessedOn: '2026-08-01',
    note: 'Specialist account used for rational faith, religion, evil, and the postulates.',
  },
  {
    id: 'kant-science-sep', type: 'scholarly-reference', authors: ['Eric Watkins', 'Marius Stan'], title: 'Kant’s Philosophy of Science',
    containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta'],
    publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Fall 2022', year: 2022,
    url: 'https://plato.stanford.edu/archives/fall2022/entries/kant-science/', accessedOn: '2026-08-01',
    note: 'Archived specialist entry used for natural science, matter, mathematics, and the limits of Kant’s scientific framework.',
  },
  {
    id: 'kant-reason-sep', type: 'scholarly-reference', authors: ['Garrath Williams'], title: 'Kant’s Account of Reason',
    containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'],
    publisher: 'Metaphysics Research Lab, Stanford University', year: 2023,
    url: 'https://plato.stanford.edu/entries/kant-reason/', accessedOn: '2026-08-01',
    note: 'Specialist account used for critique, reason’s self-government, regulative ideas, and practical reason.',
  },
  {
    id: 'kant-akademie', type: 'primary-text', authors: ['Immanuel Kant'], title: 'Kants gesammelte Schriften, Akademie edition, volumes 1–23',
    publisher: 'Bonner Kant-Korpus', url: 'https://www.korpora.org/Kant/', accessedOn: '2026-08-01',
    note: 'German primary-text corpus. Citations use standard A/B pagination for the first Critique and Akademie volume:page, work divisions, or sections elsewhere; paraphrases do not imply one preferred English translation.',
  },
  {
    id: 'kant-kleingeld-race', type: 'journal-article', authors: ['Pauline Kleingeld'], title: 'Kant’s Second Thoughts on Race',
    containerTitle: 'The Philosophical Quarterly', year: 2007, doi: '10.1111/j.1467-9213.2007.498.x',
    url: 'https://doi.org/10.1111/j.1467-9213.2007.498.x', accessedOn: '2026-08-01',
    note: 'Used as evidence for the influential but contested claim that Kant changed important racial views in the 1790s; the page does not treat that argument as consensus or erase earlier hierarchy.',
  },
  {
    id: 'kant-lu-adler-race', type: 'scholarly-book', authors: ['Huaping Lu-Adler'], title: 'Kant, Race, and Racism: Views from Somewhere',
    publisher: 'Oxford University Press', year: 2023, doi: '10.1093/oso/9780197685211.001.0001',
    url: 'https://academic.oup.com/book/45865', accessedOn: '2026-08-01',
    note: 'Opened book and chapter abstracts used as a specialist counterweight to late-reform readings and for the systemic relation among Kant’s race concepts, anthropology, history, teleology, and universalism; no unseen chapter detail is claimed.',
  },
  {
    id: 'kant-buroker', type: 'scholarly-book', authors: ['Jill Vance Buroker'], title: 'Kant’s Critique of Pure Reason: An Introduction',
    publisher: 'Cambridge University Press', year: 2006,
    url: 'https://www.cambridge.org/core/books/kants-critique-of-pure-reason/47AD18688D7671067A37C6801644072A',
    note: 'Further reading only; it does not count toward reviewed claim coverage.',
  },
];

const q = (sourceId: string, kind: Parameters<typeof c>[1], value: string, note?: string) => c(sourceId, kind, value, note);

const sectionCitations: Record<string, CitationReference[]> = {
  setting: [q('kant-sep', 'section', '1. Life and works'), q('kant-iep', 'section', '1. Life'), q('kant-akademie', 'standard-division', '8:33–42; 8:341–386')],
  'critical-project': [q('kant-sep', 'section', '1–2; 5–7'), q('kant-reason-sep', 'section', '1–4'), q('kant-akademie', 'standard-division', 'CPR Ax–Bxxxix; CPrR 5:3–163; CPJ 5:167–485')],
  'method-architecture': [q('kant-sep', 'section', '2. Kant’s project in the Critique of Pure Reason'), q('kant-reason-sep', 'section', '1. Theoretical reason: reason’s cognitive role and limitations'), q('kant-akademie', 'standard-division', 'CPR A11/B25–A16/B30; A832/B860–A851/B879')],
  'copernican-revolution': [q('kant-sep', 'section', '2.2 Kant’s Copernican revolution in philosophy'), q('kant-iep', 'section', '2.b. Dogmatic Slumber, Synthetic A Priori Knowledge, and the Copernican Shift'), q('kant-akademie', 'standard-division', 'CPR Bxvi–Bxviii; B10–B24')],
  'intuition-categories': [q('kant-sep', 'section', '4. The transcendental deduction'), q('kant-ti-sep', 'section', '1. Appearances and Things in Themselves; 4. The Two-Aspect View; 6. Things in Themselves, Noumena, and the Transcendental Object'), q('kant-akademie', 'standard-division', 'CPR A19/B33–A130/B169')],
  'synthesis-imagination': [q('kant-sep', 'section', '4.1 Self-consciousness; 4.2 Objectivity and judgment; 4.3 The law-giver of nature'), q('kant-akademie', 'standard-division', 'CPR A95–A130; B129–B169')],
  idealism: [q('kant-ti-sep', 'section', '1–6'), q('kant-sep', 'section', '3. Transcendental idealism'), q('kant-akademie', 'standard-division', 'CPR A369–A380; A490/B518–A496/B525; A506/B534–A565/B593')],
  'reason-limits': [q('kant-reason-sep', 'section', '1. Theoretical reason: reason’s cognitive role and limitations; 3. The unity of theoretical and practical reason'), q('kant-sep', 'section', '2. Kant’s project in the Critique of Pure Reason'), q('kant-akademie', 'standard-division', 'CPR A293/B349–A704/B732')],
  freedom: [q('kant-sep', 'section', '5.1 Theoretical and practical autonomy; 5.2 Freedom; 5.3 The fact of reason'), q('kant-moral-sep', 'section', '10. Autonomy'), q('kant-akademie', 'standard-division', 'CPR A532/B560–A558/B586; CPrR 5:28–50')],
  'good-will-duty': [q('kant-moral-sep', 'section', '1. Aims and Methods of Moral Philosophy; 2. Good Will, Moral Worth and Duty; 4. Categorical and Hypothetical Imperatives'), q('kant-akademie', 'standard-division', 'Groundwork 4:393–421')],
  'categorical-imperative': [q('kant-moral-sep', 'section', '5. The Formula of the Universal Law of Nature; 6. The Formula of Humanity; 7. The Formula of Autonomy; 8. The Kingdom of Ends Formula'), q('kant-akademie', 'standard-division', 'Groundwork 4:421–440')],
  'virtue-motivation': [q('kant-moral-sep', 'section', '2. Good Will, Moral Worth and Duty; 3. Duty and Respect for Moral Law; 12. Virtue and Vice; 13. Normative Ethical Theory'), q('kant-akademie', 'standard-division', 'Metaphysics of Morals 6:375–491')],
  'right-property-punishment': [q('kant-politics-sep', 'section', '1. The Place of Political Philosophy within Kant’s Philosophical System; 2. Freedom as the Basis of the State; 5. Property and Contract Right; 7. Punishment'), q('kant-akademie', 'standard-division', 'Metaphysics of Morals 6:229–372')],
  'highest-good-religion': [q('kant-sep', 'section', '6. The highest good and practical postulates'), q('kant-religion-sep', 'section', '1. Overview; 3. Kant’s Philosophy of Religion during the Critical Period'), q('kant-akademie', 'standard-division', 'CPrR 5:107–148; Religion 6:1–202')],
  'beauty-sublime': [q('kant-aesthetics-sep', 'section', '2. Aesthetics'), q('kant-akademie', 'standard-division', 'CPJ §§1–29, 5:203–278')],
  teleology: [q('kant-aesthetics-sep', 'section', '3. Teleology'), q('kant-sep', 'section', '7. The unity of nature and freedom'), q('kant-akademie', 'standard-division', 'CPJ §§61–91, 5:359–485')],
  'natural-science-change': [q('kant-science-sep', 'section', '1–5'), q('kant-akademie', 'standard-division', 'Metaphysical Foundations of Natural Science 4:465–565'), q('kant-sep', 'section', '1. Life and works')],
  'politics-history': [q('kant-politics-sep', 'section', '4. Republics, Enlightenment, and Democracy; 8. International Relations and History; 9. Cosmopolitan Right'), q('kant-akademie', 'standard-division', '8:33–42; 8:273–313; 8:341–386; 6:311–355')],
  'exclusion-anthropology': [q('kant-politics-sep', 'section', '2. Freedom as the Basis of the State; 10. Social Philosophy'), q('kant-moral-sep', 'section', '11. Non-rational Beings and Disabled Humans'), q('kant-kleingeld-race', 'page', '573–592'), q('kant-lu-adler-race', 'chapter', 'Introduction and chapters 1–3 — opened book/chapter abstracts'), q('kant-akademie', 'standard-division', '2:205–256; 6:277–279; 7:119–333; 8:89–106; 8:157–184')],
  influence: [q('kant-sep', 'section', '1. Life and works'), q('kant-iep', 'section', 'Article overview; sections 2–8'), q('kant-ti-sep', 'section', '7. Conclusion (closing reception discussion)')],
  'disputes-reading': [q('kant-ti-sep', 'section', '1–6'), q('kant-moral-sep', 'section', '11–12'), q('kant-kleingeld-race', 'page', '573–592'), q('kant-lu-adler-race', 'chapter', 'Introduction and chapters 1–3 — opened book/chapter abstracts'), q('kant-akademie', 'standard-division', 'CPR A edition preface; B edition preface; Groundwork 4:393–463')],
};

const reviewedSections = (sections: ArticleSection[] | undefined): ArticleSection[] => (sections ?? []).map((section) => ({
  ...section,
  paragraphs: section.paragraphs.map((paragraph, index) => p(
    `kant-${section.id}-${index + 1}`,
    typeof paragraph === 'string' ? paragraph : paragraph.text,
    sectionCitations[section.id] ?? [q('kant-sep', 'section', '1–7')],
  )),
}));

const serialize = (value: unknown) => typeof value === 'string' ? value : JSON.stringify(value);

const structuredClaims = (record: Philosopher) => ({
  classification: claim(`${record.region} · ${record.tradition}`, [q('kant-sep', 'section', '1. Life and works'), q('kant-iep', 'section', '1. Life')]),
  date: claim(record.dateDisplay ?? record.lifespan, [q('kant-sep', 'section', '1. Life and works'), q('kant-iep', 'section', '1. Life')]),
  'dating-note': claim(record.dateNote ?? '', [q('kant-sep', 'section', '1. Life and works')]),
  'contribution-summary': claim(record.contributionSummary, [q('kant-sep', 'section', '2–7'), q('kant-iep', 'section', '2–8')]),
  'short-biography': claim(record.shortBio ?? record.lifeStory, [q('kant-sep', 'section', '1. Life and works'), q('kant-iep', 'section', '1. Life')]),
  'historical-context': claim(record.historicalContext, [q('kant-sep', 'section', '1. Life and works; 2.1 The crisis of the Enlightenment'), q('kant-iep', 'section', '1. Life')]),
  'central-problem': claim(record.centralQuestions?.[0] ?? record.contributionSummary, [q('kant-sep', 'section', '2–7'), q('kant-reason-sep', 'section', '1–4')]),
  branches: claim(serialize({primary: record.primaryBranchIds, secondary: record.secondaryBranchIds, memberships: record.branchMemberships}), [q('kant-sep', 'section', '2–7'), q('kant-moral-sep', 'section', '1–12'), q('kant-politics-sep', 'section', '1–10')]),
  'ideas-and-works': claim(serialize({ideas: record.mainIdeas, works: record.keyWorks}), [q('kant-sep', 'section', '1–7'), q('kant-akademie', 'work', 'Critical works and essays')]),
  biography: claim(serialize({lifeStory: record.lifeStory, extendedBio: record.extendedBio, lifeEvents: record.lifeEvents}), [q('kant-sep', 'section', '1. Life and works'), q('kant-iep', 'section', '1. Life')]),
  explanation: claim(record.beginnerExplanation, [q('kant-sep', 'section', '2–7'), q('kant-iep', 'section', '2–8')]),
  influence: claim(serialize({received: record.influencesReceived, idsReceived: record.influencedByIds, later: record.influenceOnLaterThought, idsLater: record.influencedIds}), [q('kant-sep', 'section', '1. Life and works'), q('kant-iep', 'section', 'Article overview; sections 2–8')]),
  'detailed-ideas': claim(serialize(record.majorIdeasDetailed), [q('kant-ti-sep', 'section', '1–6'), q('kant-moral-sep', 'section', '1–12'), q('kant-aesthetics-sep', 'section', '1–3')]),
  'detailed-works': claim(serialize(record.keyWorksDetailed), [q('kant-sep', 'section', '1. Life and works'), q('kant-akademie', 'work', 'Critical works and essays')]),
  'development-and-disputes': claim(serialize({development: record.intellectualDevelopment, tensions: record.controversiesOrInterpretiveTensions, misunderstandings: record.commonMisunderstandings}), [q('kant-sep', 'section', '1–7'), q('kant-ti-sep', 'section', '1–6'), q('kant-kleingeld-race', 'page', '573–592'), q('kant-lu-adler-race', 'chapter', 'Introduction and chapters 1–3 — opened book/chapter abstracts')]),
  'branch-contributions': claim(serialize(record.branchContributions), [q('kant-sep', 'section', '2–7'), q('kant-politics-sep', 'section', '1–10'), q('kant-science-sep', 'section', '1–5')]),
  'reading-paths': claim(serialize({first: record.suggestedFirstReading, beginner: record.beginnerReadingPath, advanced: record.advancedReadingPath}), [q('kant-sep', 'section', 'Bibliography'), q('kant-iep', 'section', '9. References and Further Reading')]),
});

export const applyKantEditorial = (record: Philosopher): Philosopher => {
  if (record.id !== 'kant') return record;

  const reviewed: Philosopher = {
    ...record,
    lifeStory: 'Immanuel Kant was born in Königsberg in 1724, worked as a private tutor and unsalaried lecturer, became professor of logic and metaphysics in 1770, and spent his career developing both natural-scientific and critical philosophy before his death in 1804.',
    beginnerExplanation: 'Kant asks what finite knowers and agents must contribute for experience, judgment, and obligation to be possible. His answer limits claims about things beyond possible experience while making autonomy, not obedience to desire or authority, central to morality.',
    influencedByIds: ['leibniz', 'hume', 'rousseau'],
    influencedIds: ['fichte', 'schelling', 'hegel', 'schopenhauer', 'rawls', 'habermas'],
    suggestedFirstReading: 'Groundwork of the Metaphysics of Morals, Sections I–II',
    historicalContext: 'Kant worked in eighteenth-century Königsberg amid Leibnizian-Wolffian philosophy, Newtonian science, British empiricism, Rousseau’s moral and political challenge, Prussian institutions, Enlightenment disputes over authority, and new arguments about race, history, and colonial order.',
    dateDisplay: '1724–1804',
    dateConfidence: 'high',
    dateNote: 'Birth and death dates are secure; the profile distinguishes publication dates and later editorial status for unfinished or student-transcribed material.',
    lifeEvents: [
      {year: 1724, label: 'Born in Königsberg', description: 'Born on 22 April in the capital of East Prussia.'},
      {year: 1770, label: 'Appointed professor', description: 'Became professor of logic and metaphysics at the University of Königsberg.'},
      {year: 1781, label: 'First Critique published', description: 'Published the first edition of the Critique of Pure Reason; a revised edition followed in 1787.'},
      {year: 1790, label: 'Critical project’s third major volume', description: 'Published the Critique of the Power of Judgment after the 1788 second Critique.'},
      {year: 1804, label: 'Died', description: 'Died in Königsberg on 12 February.'},
    ],
    schoolMemberships: ['Critical philosophy; major source and precursor for post-Kantian German Idealism rather than a straightforward member of its later systems.'],
    branchMemberships: [
      {branchId: 'epistemology', status: 'major', note: 'Transforms epistemology by asking how sensible receptivity and a priori forms and concepts make objective experience possible.', confidence: 'high'},
      {branchId: 'deontology', status: 'central', note: 'A foundational source for modern Kantian deontological ethics; “deontology” is a later family label with non-Kantian histories as well.', confidence: 'high'},
      {branchId: 'german-idealism', status: 'precursor', note: 'Kant’s critical philosophy supplies problems and starting points for post-Kantian German Idealism but is not simply one more system inside it.', confidence: 'high'},
    ],
    branchContributions: [
      {branchId: 'epistemology', summary: 'Recasts objective knowledge around the cooperation of sensible receptivity, a priori forms, concepts, synthesis, and limits on claims beyond possible experience.'},
      {branchId: 'deontology', summary: 'Makes good will, duty, autonomy, humanity, and universal law foundational for a major modern family of nonconsequentialist ethics; the family label is retrospective.'},
      {branchId: 'german-idealism', summary: 'Sets the post-Kantian agenda through transcendental idealism, freedom, self-consciousness, nature, and the disputed thing in itself while remaining a precursor to later systems.'},
    ],
    sourceLinks: [],
    articleSections: reviewedSections(record.articleSections),
  };

  return {
    ...reviewed,
    editorial: {
      sources,
      furtherReadingSourceIds: ['kant-buroker'],
      structuredClaims: structuredClaims(reviewed),
      review: {
        status: 'claim-reviewed',
        reviewedOn: '2026-08-01',
        method: 'Full page-level claim review of all article paragraphs and claim-bearing structured metadata against Kant’s texts, independent specialist references, domain-specific scholarship, explicit interpretive disputes, and directly reused summaries; locators and source roles were manually checked before lock generation.',
        reviewNotePath: 'docs/editorial/reviews/kant.md',
        lock: 'fnv1a64:4f72443fd8b735ac',
        evidencePolicy: {minimumIndependentSecondarySources: 3, minimumIndependentSecondaryDomains: 2, requiredSourceTypes: ['primary-text', 'journal-article']},
      },
    },
  };
};
