import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumSupplementalExhibitId} from './museumWorldTypes';

type WallFillInput = {
  id: MuseumSupplementalExhibitId;
  assetId: MuseumAssetId;
  displayName: string;
  shortTitle: string;
  workLabel: string;
  dateLabel: string;
  question: string;
  frontSubtitle: string;
  lead: string;
  keyIdeas: readonly [string, string, string];
  cautions: readonly [string, string];
  sections: readonly [
    {heading: string; paragraph: string},
    {heading: string; paragraph: string},
    {heading: string; paragraph: string},
  ];
  imageSource: {label: string; url: string};
  reference: {label: string; url: string};
  articleRoute: MuseumSupplementalExhibit['articleRoute'];
  entityKind: 'philosopher' | 'branch';
};

type Gallery05WallFillReviewEvidence = {
  plaqueTitle: string;
  invitation: string;
  objectInterpretation: string;
  detail: readonly [string, string, string];
  sources: MuseumSupplementalExhibit['sources'];
  sectionSourceIds: readonly [readonly string[], readonly string[], readonly string[]];
  visitorGuide: NonNullable<MuseumSupplementalExhibit['visitorGuide']>;
  articleTitle: string;
  canonicalContexts: NonNullable<MuseumSupplementalExhibit['wallPlaque']>['canonicalContexts'];
  plaqueType: NonNullable<MuseumSupplementalExhibit['wallPlaque']>['type'];
  resolution: string;
  lock: string;
};

const gallery05WallFillReviewEvidence: Partial<Record<MuseumSupplementalExhibitId, Gallery05WallFillReviewEvidence>> = {
  'buddhist-first-sermon-four-truths': {
    plaqueTitle: 'Gandharan Relief of the First Sermon',
    invitation: 'This later relief remembers the teaching associated with the Four Truths; the Buddha article distinguishes the transmitted discourse from a historical eyewitness record.',
    objectInterpretation: 'Gary Todd’s CC0 photograph records a Kushan-period Gandharan relief displayed at the Aurora Museum, Shanghai. The Commons description supplies no accession record; the sculpture is later reception, not an eyewitness image or transcript of the first sermon.',
    detail: [
      'The installed landscape image is Gary Todd’s CC0 photograph of a second- or third-century Gandharan relief displayed at the Aurora Museum in Shanghai. The file record identifies the remembered first-sermon subject but supplies no institutional accession number or catalogue page. The holding therefore remains source-reported rather than independently verified.',
      'Saṃyutta Nikāya 56.11 organizes the teaching around suffering, its origin, cessation, and a path, with each truth framed through tasks of understanding and cultivation. The discourse is a transmitted textual witness. It cannot convert a sculpture made centuries later into evidence that the scene records Sarnath as it appeared or preserves the Buddha’s exact words.',
      'Gandharan artists made Buddhist narrative memory visible through later regional materials and conventions. The relief supports reception history: a teaching scene, assembled listeners, and the visual authority of a remembered event. Claims about the Four Truths and path remain mapped to the discourse and historical scholarship, while the object record supports only identity, reported display, date range, photograph, and rights.',
    ],
    sources: [
      {id: 'first-sermon-commons', label: 'Wikimedia Commons — Gandharan first-sermon relief photograph', url: 'https://commons.wikimedia.org/wiki/File:Buddha%27s_First_Sermon_at_Sarnath_(22220250308).jpg', kind: 'collection-record'},
      {id: 'first-sermon-sutta', label: 'SuttaCentral — SN 56.11, Setting the Dhamma Wheel in Motion', url: 'https://suttacentral.net/sn56.11/en/sujato', kind: 'primary-text'},
      {id: 'buddha-sep', label: 'Stanford Encyclopedia of Philosophy — Buddha', url: 'https://plato.stanford.edu/entries/buddha/', kind: 'academic-reference'},
      {id: 'gandhara-met', label: 'Metropolitan Museum of Art — Gandhara', url: 'https://www.metmuseum.org/essays/gandhara', kind: 'academic-reference'},
    ],
    sectionSourceIds: [['first-sermon-commons', 'first-sermon-sutta'], ['first-sermon-sutta', 'buddha-sep'], ['first-sermon-commons', 'gandhara-met', 'buddha-sep']],
    visitorGuide: [
      {heading: 'Reading the Gandharan relief', items: [
        {label: 'Later reception', description: 'A Kushan-period relief gives material form to the remembered first teaching centuries after the Buddha.', sourceIds: ['first-sermon-commons', 'gandhara-met']},
        {label: 'Holding limit', description: 'Commons reports display at the Aurora Museum but supplies no accession or institutional object page.', sourceIds: ['first-sermon-commons']},
      ]},
      {heading: 'Four truths as tasks', items: [
        {label: 'Diagnosis and response', description: 'The discourse pairs suffering and its origin with cessation and a path of cultivation.', sourceIds: ['first-sermon-sutta', 'buddha-sep']},
        {label: 'Text is not eyewitness access', description: 'A transmitted discourse and a later relief require historical comparison rather than claims of direct recording.', sourceIds: ['buddha-sep', 'first-sermon-commons']},
      ]},
    ],
    articleTitle: 'Siddhartha Gautama / the Buddha', canonicalContexts: [{kind: 'philosopher', id: 'buddha'}], plaqueType: 'reception-or-transmission-history',
    resolution: 'Resolved: retitled the object as a Gandharan first-sermon relief, exposed the lack of an Aurora accession record, preserved Todd’s CC0 credit and natural ratio, and mapped Four Truths claims to SN 56.11 and historical scholarship rather than the later sculpture.', lock: 'fnv1a64:70910247cfd2ab0e',
  },
  'ashoka-dhamma-public-ethics': {
    plaqueTitle: 'Lion Capital of Aśoka at Sarnath',
    invitation: 'This Mauryan capital stood above a pillar; Aśoka’s inscriptions—not the sculpture alone—are evidence for dhamma, administration, patronage, and imperial authority.',
    objectInterpretation: 'The c. 250 BCE Lion Capital at the Sarnath Archaeological Museum establishes the monumental and imperial setting of Aśoka’s program. It is sculpture from a pillar, not an edict; inscriptions must support claims about dhamma and policy.',
    detail: [
      'The installed CC BY 2.0 photograph by lisa bat records the polished sandstone Lion Capital of Aśoka at the Sarnath Archaeological Museum. Made around 250 BCE by a Mauryan imperial workshop, the four lions, abacus, animals, wheels, and inverted lotus once crowned a pillar. The capital contains no substitute for reading Aśoka’s inscriptions.',
      'Major Rock Edicts and related inscriptions address welfare, restraint, administration, religious communities, remorse, conquest, and respect across sectarian difference. “Dhamma” in this imperial register should not be reduced to a concise statement of Buddhist doctrine. A ruler’s public ethical language also operates through unequal institutional power, officials, punishment, patronage, and claims to legitimacy.',
      'The monument and inscriptions must therefore remain distinct sources. Sculpture establishes scale, imperial craft, place, custody, and later symbolic afterlives; the edicts establish what Aśoka publicly ordered or commended. The exhibit can ask how Buddhist patronage entered public policy without romanticizing empire or claiming that the capital itself speaks the content of an edict.',
    ],
    sources: [
      {id: 'ashoka-capital-commons', label: 'Wikimedia Commons — Lion Capital of Aśoka at Sarnath', url: 'https://commons.wikimedia.org/wiki/File:Lion_capital_of_Ashoka,_Sarnath.jpg', kind: 'collection-record'},
      {id: 'ashoka-capital-smarthistory', label: 'Smarthistory — Lion Capital, Ashokan Pillar at Sarnath', url: 'https://smarthistory.org/lion-capital-ashokan-pillar-at-sarnath/', kind: 'academic-reference'},
      {id: 'ashoka-edicts', label: 'Columbia University — The Edicts of King Asoka, trans. Ven. S. Dhammika', url: 'https://www.columbia.edu/itc/religion/f2001/edit/docs/edicts_asoka.pdf', kind: 'primary-text'},
    ],
    sectionSourceIds: [['ashoka-capital-commons', 'ashoka-capital-smarthistory'], ['ashoka-edicts'], ['ashoka-capital-smarthistory', 'ashoka-edicts']],
    visitorGuide: [
      {heading: 'Separating capital and edicts', items: [
        {label: 'Mauryan sculpture', description: 'The polished sandstone capital crowned a pillar and is now held at the Sarnath Archaeological Museum.', sourceIds: ['ashoka-capital-smarthistory', 'ashoka-capital-commons']},
        {label: 'Not an inscription', description: 'The sculpture establishes imperial context; translated edicts establish the content of Aśoka’s public claims.', sourceIds: ['ashoka-capital-smarthistory', 'ashoka-edicts']},
      ]},
      {heading: 'Dhamma and public power', items: [
        {label: 'Broad ethical register', description: 'Aśoka’s dhamma addresses welfare, restraint, administration, and plural communities beyond a doctrinal summary.', sourceIds: ['ashoka-edicts']},
        {label: 'Imperial tension', description: 'Remorse, patronage, persuasion, authority, and punitive capacity coexist in the inscriptional program.', sourceIds: ['ashoka-edicts']},
      ]},
    ],
    articleTitle: 'Buddhist Philosophy', canonicalContexts: [{kind: 'branch', id: 'buddhist-philosophy'}], plaqueType: 'object-manuscript-site-or-archaeological-context',
    resolution: 'Resolved: verified the Sarnath capital, maker horizon, holding and CC BY rights, separated sculpture from inscriptional evidence, added an edict translation, qualified imperial dhamma, and corrected the natural portrait mount.', lock: 'fnv1a64:32d5aba9a994fcfb',
  },
  'early-buddhist-stupa-community': {
    plaqueTitle: 'Great Stupa (Stupa 1), Sanchi',
    invitation: 'Built and transformed across centuries, Sanchi’s Great Stupa makes relics, pilgrimage, donor networks, and monastic communities integral to Buddhist philosophical history.',
    objectInterpretation: 'Asitjain’s CC BY-SA photograph records Great Stupa 1 at the Archaeological Survey of India-managed Sanchi site. Its Aśokan beginnings and later expansions span centuries; the present monument is not one unchanged third-century BCE object.',
    detail: [
      'UNESCO describes Sanchi’s Buddhist monuments as beginning with Aśokan work in the third century BCE and expanding under later dynasties. The installed photograph by Asitjain shows Great Stupa 1 with a carved gateway, rail, ambulatory, and hemispherical mound. It is a managed archaeological and religious site rather than a museum-held portable object.',
      'Relic veneration, circumambulation, donation, narrative carving, monastic residence, patronage, and pilgrimage made philosophical and ethical traditions durable through embodied communal practices. Inscriptions and architectural phases also record many contributors. Those histories resist the fantasy that Buddhist philosophy moved only through disembodied propositions or through one founder speaking to passive recipients.',
      'The current view incorporates construction, alteration, conservation, and restoration across long periods. It cannot document one original appearance or prove that every Buddhist school shared the same doctrine, ritual, or institutional organization. The site instead shows how communities repeatedly rebuilt relationships among memory, merit, teaching, movement, image, and authority.',
    ],
    sources: [
      {id: 'sanchi-commons', label: 'Wikimedia Commons — Great Stupa 1 at Sanchi', url: 'https://commons.wikimedia.org/wiki/File:Sanchi1_N-MP-220.jpg', kind: 'collection-record'},
      {id: 'sanchi-unesco', label: 'UNESCO World Heritage Centre — Buddhist Monuments at Sanchi', url: 'https://whc.unesco.org/en/list/524/', kind: 'collection-record'},
      {id: 'buddhist-philosophy-iep', label: 'Internet Encyclopedia of Philosophy — Buddhist Philosophy', url: 'https://iep.utm.edu/buddha/', kind: 'academic-reference'},
    ],
    sectionSourceIds: [['sanchi-unesco', 'sanchi-commons'], ['sanchi-unesco', 'buddhist-philosophy-iep'], ['sanchi-unesco', 'sanchi-commons']],
    visitorGuide: [
      {heading: 'Reading a layered site', items: [
        {label: 'Many building phases', description: 'Aśokan beginnings were expanded, decorated, altered, and conserved across later centuries.', sourceIds: ['sanchi-unesco']},
        {label: 'Site stewardship', description: 'The Archaeological Survey of India manages Sanchi; it is not a conventional museum holding.', sourceIds: ['sanchi-unesco', 'sanchi-commons']},
      ]},
      {heading: 'Community and practice', items: [
        {label: 'Embodied participation', description: 'Relics, circumambulation, gateways, donations, pilgrimage, and monastic life join material and intellectual history.', sourceIds: ['sanchi-unesco', 'buddhist-philosophy-iep']},
        {label: 'No timeless consensus', description: 'One accumulated monument cannot represent every Buddhist school, period, or community.', sourceIds: ['sanchi-unesco', 'buddhist-philosophy-iep']},
      ]},
    ],
    articleTitle: 'Buddhist Philosophy', canonicalContexts: [{kind: 'branch', id: 'buddhist-philosophy'}], plaqueType: 'object-manuscript-site-or-archaeological-context',
    resolution: 'Resolved: added UNESCO’s institutional site record, distinguished ASI stewardship from museum holding, retained the multi-phase chronology and CC BY-SA credit, mapped community claims carefully, and corrected the mount to the photograph’s natural ratio.', lock: 'fnv1a64:d4510293aea76cb0',
  },
  'kumarajiva-madhyamaka-translation': {
    plaqueTitle: 'Kumārajīva Translates the Madhyamaka',
    invitation: 'This modern Buddhavanam relief commemorates Kumārajīva’s translation work; the Buddhist Philosophy article traces how Chinese Madhyamaka developed through texts, interpretation, and institutions.',
    objectInterpretation: 'Anandajoti Bhikkhu’s 2024 CC BY-SA photograph records a modern Buddhavanam relief imagining Kumārajīva and collaborators. It is commemorative public art, not documentary evidence for his appearance, workshop, or any precise translation session.',
    detail: [
      'The installed image was photographed by Anandajoti Bhikkhu on 9 December 2024 at Buddhavanam Stupa, Telangana, and is licensed CC BY-SA 4.0. The modern relief artist is not stated. Its seated translator and collaborators intentionally visualize collective work, but the scene was created about sixteen centuries after Kumārajīva and cannot reconstruct his workshop.',
      'Kumārajīva reached Chang’an in 401 and his translation activity helped transmit works central to Chinese Madhyamaka and the Three Treatises tradition. Choosing vocabulary, comparing texts, explaining arguments, organizing assistants, and establishing a corpus are philosophical acts. Chinese interpreters then developed those resources within new linguistic, institutional, and polemical settings rather than merely storing an Indian original.',
      'The relief supports claims about modern commemoration only. Specialist Madhyamaka history supports translation, corpus, and Chinese reception. That division lets visitors use the visual scene without mistaking its details for evidence, and it preserves disagreement about how translated terms, attributions, and later commentaries should shape interpretation of emptiness and the middle way.',
    ],
    sources: [
      {id: 'kumarajiva-relief-commons', label: 'Wikimedia Commons — Kumārajīva translation relief at Buddhavanam', url: 'https://commons.wikimedia.org/wiki/File:202_Kumarajiva_Translates_the_Madhyamaka_into_Chinese.jpg', kind: 'collection-record'},
      {id: 'madhyamaka-iep', label: 'Internet Encyclopedia of Philosophy — Madhyamaka Buddhist Philosophy', url: 'https://iep.utm.edu/madhyamaka-buddhist-philosophy/', kind: 'academic-reference'},
      {id: 'chinese-madhyamaka-rep', label: 'Routledge Encyclopedia of Philosophy — Chinese Buddhist philosophy: Madhyamaka', url: 'https://www.rep.routledge.com/articles/overview/buddhist-philosophy-chinese/v-1/sections/indian-transplants-madhyamaka-and-icchantikas', kind: 'academic-reference'},
    ],
    sectionSourceIds: [['kumarajiva-relief-commons'], ['madhyamaka-iep', 'chinese-madhyamaka-rep'], ['kumarajiva-relief-commons', 'madhyamaka-iep', 'chinese-madhyamaka-rep']],
    visitorGuide: [
      {heading: 'Reading the modern relief', items: [
        {label: 'Commemorative scene', description: 'The 2024 photograph records modern Buddhavanam public art, not a historical translation session.', sourceIds: ['kumarajiva-relief-commons']},
        {label: 'Unknown relief maker', description: 'The source credits the photographer but does not identify the sculptor.', sourceIds: ['kumarajiva-relief-commons']},
      ]},
      {heading: 'Translation creates traditions', items: [
        {label: 'A selected corpus', description: 'Kumārajīva’s translations became central resources for Chinese Madhyamaka and the Three Treatises tradition.', sourceIds: ['madhyamaka-iep', 'chinese-madhyamaka-rep']},
        {label: 'Interpretive labor', description: 'Terminology, assistants, commentary, institutions, and later readers all shape what a translated argument becomes.', sourceIds: ['chinese-madhyamaka-rep']},
      ]},
    ],
    articleTitle: 'Buddhist Philosophy', canonicalContexts: [{kind: 'branch', id: 'buddhist-philosophy'}], plaqueType: 'reception-or-transmission-history',
    resolution: 'Resolved: retained the verified modern Buddhavanam relief and CC BY-SA credit, made unknown authorship and commemorative status explicit, added Chinese Madhyamaka evidence, separated image from historical claims, and corrected the natural mount ratio.', lock: 'fnv1a64:9d200fc553d7a908',
  },
  'tripitaka-koreana-printing-canon': {
    plaqueTitle: 'Tripiṭaka Koreana Woodblocks',
    invitation: 'Haeinsa’s thirteenth-century woodblocks show how Korean Buddhist institutions preserved and reproduced a canon through collation, carving, storage, and continuing stewardship.',
    objectInterpretation: 'Arian Zwegers’s 2006 CC BY photograph records shelves of the Tripiṭaka Koreana at Haeinsa. UNESCO dates the 81,258 printing blocks to 1237–1248; the fifteenth-century depository is later and should not date the blocks.',
    detail: [
      'The installed CC BY 2.0 image derives from Arian Zwegers’s 3 November 2006 photograph of the woodblocks at Haeinsa. UNESCO records 81,258 blocks carved between 1237 and 1248 under Goryeo patronage. The purpose-built depository buildings are fifteenth-century structures, so collection, carving, and storage architecture require separate dates.',
      'At this scale, a canon depends on textual comparison, correction, ordering, skilled carving, funding, buildings, environmental management, and continuing stewardship. Printing makes repeated impressions possible but does not erase editorial choice, textual variants, damaged blocks, or later interpretation. Material infrastructure helps determine what later readers can encounter as an authoritative collection.',
      'Haeinsa is a Korean center of Buddhist intellectual and institutional history, not a passive endpoint of an exclusively Indian story. The blocks do not contain every Buddhist text or establish one final reading. Their survival instead demonstrates sustained regional work through which a selected canon could be collated, reproduced, preserved, studied, and reinterpreted.',
    ],
    sources: [
      {id: 'tripitaka-commons', label: 'Wikimedia Commons — Tripiṭaka Koreana woodblocks', url: 'https://commons.wikimedia.org/wiki/File:Tripitaka_Koreana.jpg', kind: 'collection-record'},
      {id: 'tripitaka-unesco-mow', label: 'UNESCO Memory of the World — Printing woodblocks of the Tripiṭaka Koreana', url: 'https://www.unesco.org/en/memory-world/printing-woodblocks-tripitaka-koreana-and-miscellaneous-buddhist-scriptures', kind: 'collection-record'},
      {id: 'haeinsa-unesco', label: 'UNESCO World Heritage Centre — Haeinsa Temple Janggyeong Panjeon', url: 'https://whc.unesco.org/en/list/737/', kind: 'collection-record'},
    ],
    sectionSourceIds: [['tripitaka-commons', 'tripitaka-unesco-mow', 'haeinsa-unesco'], ['tripitaka-unesco-mow', 'haeinsa-unesco'], ['tripitaka-unesco-mow', 'haeinsa-unesco']],
    visitorGuide: [
      {heading: 'Reading the Haeinsa collection', items: [
        {label: 'Blocks and buildings', description: 'The 1237–1248 blocks predate the fifteenth-century depository that protects them.', sourceIds: ['tripitaka-unesco-mow', 'haeinsa-unesco']},
        {label: 'Photographic rights', description: 'The installed 2006 photograph is credited to Arian Zwegers through its CC BY 2.0 derivative record.', sourceIds: ['tripitaka-commons']},
      ]},
      {heading: 'Canon as infrastructure', items: [
        {label: '81,258 carved blocks', description: 'Collation, correction, carving, funding, storage, and stewardship make canonical reproduction possible.', sourceIds: ['tripitaka-unesco-mow']},
        {label: 'A Korean center', description: 'Haeinsa actively shaped transmission rather than merely preserving an untouched origin.', sourceIds: ['tripitaka-unesco-mow', 'haeinsa-unesco']},
      ]},
    ],
    articleTitle: 'Buddhist Philosophy', canonicalContexts: [{kind: 'branch', id: 'buddhist-philosophy'}], plaqueType: 'object-manuscript-site-or-archaeological-context',
    resolution: 'Resolved: added UNESCO institutional records, separated the 1237–1248 blocks from their fifteenth-century depository, preserved Zwegers’s CC BY attribution, qualified canon and regional-history claims, and corrected the natural mount ratio.', lock: 'fnv1a64:8fc2cdd331e247e9',
  },
  'pali-kammavaca-southeast-asia': {
    plaqueTitle: 'Burmese Kammavācā Manuscript',
    invitation: 'This nineteenth-century Pāli ritual manuscript connects Buddhist Philosophy to monastic procedure and to the distinctive material traditions through which Burmese communities preserved it.',
    objectInterpretation: 'Kaldari’s 2018 CC0 photograph records a nineteenth-century Burmese Kammavācā at San Diego Public Library. Its Pāli formulae serve formal monastic acts; this lavish Burmese object does not represent all Southeast Asian manuscripts or traditions.',
    detail: [
      'The installed CC0 photograph was made by Kaldari on 9 December 2018 at San Diego Public Library. The source identifies a nineteenth-century Burmese Kammavācā, with Pāli writing presented across richly gilded manuscript leaves. The makers are unknown. Its striking material form is historically specific rather than a generic image of Buddhist scripture.',
      'Kammavācā collections draw on Vinaya passages recited for formal acts of a monastic community. Meaning depends on qualified participants, occasions, procedure, recitation, and institutional continuity as well as written words. Gilding, script, boards, ordered leaves, patronage, and craft give those formulae ceremonial and material authority in a Burmese setting.',
      'The object opens a route into Theravāda and Southeast Asian histories without claiming that one Burmese example stands for Sri Lanka, Thailand, Cambodia, Laos, Myanmar, every period, or every community. It is also not an early Buddhist manuscript. The source record supports the particular photographed object, while the genre source supports the bounded description of monastic function.',
    ],
    sources: [
      {id: 'kammavaca-commons', label: 'Wikimedia Commons — Burmese Kammavācā at San Diego Public Library', url: 'https://commons.wikimedia.org/wiki/File:Burmese_Kammavaca.jpg', kind: 'collection-record'},
      {id: 'kammavaca-lacma', label: 'Los Angeles County Museum of Art — Kammavaca manuscript', url: 'https://collections.lacma.org/object/223306', kind: 'collection-record'},
      {id: 'buddhist-philosophy-iep', label: 'Internet Encyclopedia of Philosophy — Buddhist Philosophy', url: 'https://iep.utm.edu/buddha/', kind: 'academic-reference'},
    ],
    sectionSourceIds: [['kammavaca-commons', 'kammavaca-lacma'], ['kammavaca-lacma', 'buddhist-philosophy-iep'], ['kammavaca-commons', 'kammavaca-lacma']],
    visitorGuide: [
      {heading: 'Reading the Burmese manuscript', items: [
        {label: 'Specific object', description: 'Kaldari photographed this nineteenth-century Burmese Kammavācā at San Diego Public Library in 2018.', sourceIds: ['kammavaca-commons']},
        {label: 'Ceremonial material form', description: 'Gilded leaves, script, ordered text, and protective elements mark a distinctive manuscript tradition.', sourceIds: ['kammavaca-commons', 'kammavaca-lacma']},
      ]},
      {heading: 'Text as monastic action', items: [
        {label: 'Vinaya procedure', description: 'Kammavācā formulae are recited for formal acts of the monastic community.', sourceIds: ['kammavaca-lacma', 'buddhist-philosophy-iep']},
        {label: 'Regional limit', description: 'One Burmese object cannot represent every Southeast Asian or Theravāda tradition.', sourceIds: ['kammavaca-commons', 'buddhist-philosophy-iep']},
      ]},
    ],
    articleTitle: 'Buddhist Philosophy', canonicalContexts: [{kind: 'branch', id: 'buddhist-philosophy'}], plaqueType: 'object-manuscript-site-or-archaeological-context',
    resolution: 'Resolved: verified the nineteenth-century Burmese manuscript, San Diego holding, Kaldari credit and CC0 rights, added a genre record, limited regional generalization, explained ceremonial function, and corrected the natural mount ratio.', lock: 'fnv1a64:978e58c2fcf49430',
  },
};

const wallFill = (input: WallFillInput): MuseumSupplementalExhibit => {
  const baseline: MuseumSupplementalExhibit = ({
  id: input.id,
  displayName: input.displayName,
  shortTitle: input.shortTitle,
  workLabel: input.workLabel,
  dateLabel: input.dateLabel,
  question: input.question,
  frontSubtitle: input.frontSubtitle,
  lead: input.lead,
  keyIdeas: input.keyIdeas,
  cautions: input.cautions,
  sections: input.sections.map(({heading, paragraph}) => ({heading, paragraphs: [paragraph]})),
  sources: [
    {label: input.imageSource.label, url: input.imageSource.url, kind: 'collection-record'},
    {label: input.reference.label, url: input.reference.url, kind: 'academic-reference'},
  ],
  assetId: input.assetId,
  panelAssetId: input.assetId,
  articleRoute: input.articleRoute,
  presentation: {
    panelKicker: 'Gallery 08 supporting exhibit',
    proximityKicker: input.shortTitle,
    factRows: [
      {label: 'Focus', value: input.workLabel},
      {label: 'Question', value: input.question},
      {label: 'Status', value: 'Contextual witness, read with the stated caution'},
    ],
    articleActionLabel: input.entityKind === 'philosopher'
      ? 'Open the philosopher in the Atlas'
      : 'Open the tradition in the Atlas',
    entityKind: input.entityKind,
    keyIdeasLabel: 'Interpretive anchors',
    cautionsLabel: 'Keep in view',
  },
  });
  const evidence = gallery05WallFillReviewEvidence[input.id];
  if (!evidence) return baseline;
  const basePresentation = baseline.presentation;
  if (!basePresentation) throw new Error(`Missing Gallery 05 presentation for ${input.id}.`);
  return {
    ...baseline,
    sections: [
      {heading: '', paragraphs: [`${input.lead} ${evidence.detail[0]} ${input.sections[0].paragraph}`], sourceIds: evidence.sectionSourceIds[0]},
      {heading: '', paragraphs: [`${input.sections[1].paragraph} ${evidence.detail[1]} ${input.keyIdeas.join(' ')}`], sourceIds: evidence.sectionSourceIds[1]},
      {heading: '', paragraphs: [`${input.sections[2].paragraph} ${evidence.detail[2]} ${input.cautions.join(' ')}`], sourceIds: evidence.sectionSourceIds[2]},
    ],
    visitorGuide: evidence.visitorGuide,
    sources: evidence.sources,
    objectInterpretation: evidence.objectInterpretation,
    presentation: {
      ...basePresentation,
      panelKicker: 'Gallery 05 supplemental exhibit',
      articleActionLabel: `Read the full sourced ${evidence.articleTitle} article`,
      exhibitLayout: 'object-led',
    },
    wallPlaque: {type: evidence.plaqueType, title: evidence.plaqueTitle, invitation: evidence.invitation, canonicalContexts: evidence.canonicalContexts},
    review: {
      status: 'standard-compliant', reviewedOn: '2026-08-12',
      method: 'Gallery 05 supplemental review: two non-overlapping Terra/High evidence scopes of six exhibits each reconciled by the Sol parent across installed-object identity, interpretation, attribution, dating, institution, provenance, rights, source mapping, accessibility, article relationship, routes, and aspect-safe presentation.',
      resolution: evidence.resolution, lock: evidence.lock,
      visualReview: {
        desktop: {reviewedOn: '2026-08-12', viewport: '1280×720', evidence: `Direct route inspected with the installed object, three-paragraph interpretation, subject-specific sidebar, article CTA, and no horizontal overflow. Evidence: docs/visual-validation/gallery-05-supplementals/desktop/${input.id}.png`},
        mobile: {reviewedOn: '2026-08-12', viewport: '390×844', evidence: `Direct route inspected with wrapped copy, loaded object preview, scrollable interpretation, visible controls, and no horizontal overflow. Evidence: docs/visual-validation/gallery-05-supplementals/mobile/${input.id}.png`},
        threeDimensional: {reviewedOn: '2026-08-12', viewport: '1280×720 fresh direct-route session', evidence: `Fresh-session authored viewpoint inspected with a live 3D canvas, closed detail panel, readable plaque, distinct installation, and the image mounted at its natural scene ratio. Evidence: docs/visual-validation/gallery-05-supplementals/staged-3d/${input.id}.png`},
      },
    },
  };
};

const buddhistReference = {
  label: 'Internet Encyclopedia of Philosophy — Buddhist Philosophy',
  url: 'https://iep.utm.edu/buddha/',
} as const;
const nagarjunaReference = {
  label: 'Stanford Encyclopedia of Philosophy — Nāgārjuna',
  url: 'https://plato.stanford.edu/entries/nagarjuna/',
} as const;
const vasubandhuReference = {
  label: 'Stanford Encyclopedia of Philosophy — Vasubandhu',
  url: 'https://plato.stanford.edu/entries/vasubandhu/',
} as const;
const dharmakirtiReference = {
  label: 'Stanford Encyclopedia of Philosophy — Dharmakīrti',
  url: 'https://plato.stanford.edu/entries/dharmakiirti/',
} as const;

export const BUDDHIST_WALL_FILL_EXHIBITS = [
  wallFill({
    id: 'buddhist-first-sermon-four-truths',
    assetId: 'buddhist-first-sermon-gandhara',
    displayName: 'The Buddha’s First Sermon: Four Truths and a Path',
    shortTitle: 'The Buddha: First Sermon',
    workLabel: 'BUDDHA · FOUR TRUTHS AND THE PATH',
    dateLabel: 'Gandharan relief · 2nd–3rd century CE',
    question: 'How does diagnosis become a practical path out of suffering?',
    frontSubtitle: 'Suffering, its arising, its cessation, and disciplined cultivation',
    lead: 'A Gandharan relief depicts the Buddha’s first teaching at Sarnath through a visual tradition created centuries after his lifetime. The scene anchors the four truths as a practical structure: identify suffering, understand its arising, recognize the possibility of cessation, and cultivate a path. It is later narrative art, not a transcript or portrait from the event.',
    keyIdeas: ['The truths organize diagnosis, cause, possibility, and practice.', 'The path joins ethical conduct, meditation, and understanding.', 'Later reliefs make communal memory visible without documenting the event.'],
    cautions: ['The relief is a later Gandharan representation, not eyewitness evidence.', 'The four truths should not be reduced to the slogan that life is only suffering.'],
    sections: [
      {heading: 'A diagnosis points toward practice', paragraph: 'The teaching does not stop at naming distress. It analyzes craving, ignorance, and conditioned patterns while directing attention toward habits of speech, action, livelihood, mindfulness, concentration, and understanding.'},
      {heading: 'A path has mutually supporting dimensions', paragraph: 'Ethics, meditation, and wisdom are often separated for explanation, but Buddhist traditions treat them as interdependent forms of training. Conduct shapes attention, attention clarifies experience, and insight changes conduct.'},
      {heading: 'The image belongs to reception', paragraph: 'Gandharan artists gave material form to events remembered in texts and communities. Their choices reveal a later devotional and artistic world, while historical claims about the earliest teachings require comparison among textual traditions.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Buddha’s First Sermon at Sarnath relief', url: 'https://commons.wikimedia.org/wiki/File:Buddha%27s_First_Sermon_at_Sarnath_(22220250308).jpg'},
    reference: buddhistReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'buddha'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'ashoka-dhamma-public-ethics',
    assetId: 'buddhist-ashoka-lion-capital',
    displayName: 'Buddhist Philosophy in Public: Aśoka’s Dhamma',
    shortTitle: 'Buddhist Philosophy: Aśoka’s Dhamma',
    workLabel: 'EARLY BUDDHISM · ETHICS AND EMPIRE',
    dateLabel: 'Sarnath lion capital · c. 250 BCE',
    question: 'What happens when ethical language enters imperial policy?',
    frontSubtitle: 'Public exhortation, religious patronage, welfare, authority, and political power',
    lead: 'The Sarnath lion capital monumentalizes the political world of Aśoka, a major patron of Buddhist institutions who addressed subjects through a public vocabulary of dhamma. His inscriptions commend restraint, welfare, generosity, and respect, yet speak from imperial power. The exhibit asks how Buddhist ethical commitments change when carried by administration rather than treating Aśoka as a simple philosopher-king.',
    keyIdeas: ['Patronage helped Buddhist communities and monuments expand.', 'Public ethics can persuade while also expressing authority.', 'Aśokan dhamma is broader than a summary of Buddhist doctrine.'],
    cautions: ['The capital is not itself an edict or philosophical treatise.', 'Imperial support should not be confused with universal or coercion-free agreement.'],
    sections: [
      {heading: 'Ideas acquire institutions', paragraph: 'Monasteries, pilgrimage sites, inscriptions, and officials gave teachings new forms of durability and reach. Those material supports influenced which practices became visible and how communities related to political authority.'},
      {heading: 'Ethical rule contains tension', paragraph: 'A ruler can promote restraint and welfare while retaining unequal power and punitive capacity. Aśoka’s aftermath of conquest makes the relation between remorse, legitimacy, policy, and imperial memory philosophically important.'},
      {heading: 'Public symbols continue to change', paragraph: 'The capital and wheel acquired later Buddhist and national meanings. Those afterlives matter, but the museum separates them from the precise claims, audiences, and historical circumstances of individual Aśokan inscriptions.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Lion capital of Aśoka at Sarnath', url: 'https://commons.wikimedia.org/wiki/File:Lion_capital_of_Ashoka,_Sarnath.jpg'},
    reference: buddhistReference,
    articleRoute: {kind: 'branch', branchId: 'buddhist-philosophy'},
    entityKind: 'branch',
  }),
  wallFill({
    id: 'early-buddhist-stupa-community',
    assetId: 'buddhist-sanchi-great-stupa',
    displayName: 'Buddhist Philosophy at Sanchi: Relics, Memory, and Saṅgha',
    shortTitle: 'Buddhist Philosophy: Sanchi',
    workLabel: 'EARLY BUDDHISM · COMMUNITY AND MEMORY',
    dateLabel: 'Great Stupa core, 3rd century BCE; gateways, c. 1st century BCE–1st century CE',
    question: 'How do communities make teachings durable beyond a teacher’s life?',
    frontSubtitle: 'Relics, pilgrimage, donation, narrative, architecture, and communal practice',
    lead: 'The Great Stupa at Sanchi joins relic memory, pilgrimage, donation, narrative art, and architecture. It does not illustrate one philosophical proposition. Instead, it shows that Buddhist thought developed within communities whose practices organized attention, merit, authority, and historical memory. The monument’s visible parts span periods, so the photograph should never be labeled as one moment of construction.',
    keyIdeas: ['Communal practices transmit teachings alongside texts.', 'Architecture directs movement, attention, and memory.', 'A monument accumulates historical layers and later interpretations.'],
    cautions: ['The current complex is not a single unchanged object from one date.', 'Relic devotion should not be treated as philosophically irrelevant decoration.'],
    sections: [
      {heading: 'Movement becomes interpretation', paragraph: 'Circumambulation, gateways, railings, and narrative scenes shape how visitors encounter the monument. Bodily movement and visual sequence can cultivate attention and belonging without functioning like a written argument.'},
      {heading: 'Communities preserve difference', paragraph: 'The historical saṅgha contained changing schools, disciplines, patrons, and regional practices. A shared monument does not mean every participant held one doctrine or understood relics in an identical way.'},
      {heading: 'Material history belongs to philosophy', paragraph: 'Accounts of impermanence, karma, generosity, and liberation were lived through institutions and objects. Bringing those conditions into view prevents Buddhist philosophy from becoming a list of ideas detached from historical practitioners.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Great Stupa at Sanchi', url: 'https://commons.wikimedia.org/wiki/File:Sanchi1_N-MP-220.jpg'},
    reference: buddhistReference,
    articleRoute: {kind: 'branch', branchId: 'buddhist-philosophy'},
    entityKind: 'branch',
  }),
  wallFill({
    id: 'nagarjuna-root-verses-middle-way',
    assetId: 'nagarjuna-composes-madhyamaka-relief',
    displayName: 'Nāgārjuna’s Root Verses: Arguments without Foundations',
    shortTitle: 'Nāgārjuna: Root Verses',
    workLabel: 'NĀGĀRJUNA · MŪLAMADHYAMAKAKĀRIKĀ',
    dateLabel: 'Modern Buddhavanam relief · photographed 2024',
    question: 'What remains when supposedly self-grounding things are analyzed?',
    frontSubtitle: 'Conditions, conceptual dependence, reductio arguments, and the middle way',
    lead: 'A modern relief imagines Nāgārjuna composing Madhyamaka texts. It is commemorative rather than historical evidence, but it gives the room a clear work-centered anchor. The Root Verses test claims that things possess independent natures by following their consequences through causation, motion, self, time, and nirvāṇa, repeatedly returning analysis to dependent arising.',
    keyIdeas: ['Reductio arguments expose problems in claims of independent essence.', 'Dependent arising and emptiness illuminate one another.', 'The middle way avoids both reified existence and simple annihilation.'],
    cautions: ['The relief is a modern public monument, not a lifetime scene.', 'Madhyamaka critique should not be reduced to saying that nothing exists.'],
    sections: [
      {heading: 'The chapters proceed through cases', paragraph: 'Rather than announcing one abstract formula and stopping, Nāgārjuna examines how ordinary and philosophical categories behave when treated as self-established. The arguments target foundations across many domains.'},
      {heading: 'Dependence is the turning point', paragraph: 'What arises through causes, parts, concepts, and practices cannot possess an isolated essence. That absence does not prevent conventional functioning; it explains why relations, change, and practical distinctions remain possible.'},
      {heading: 'A modern scene stages reception', paragraph: 'The relief records contemporary commemoration at Buddhavanam. It can identify composition and argument as the focus while its label keeps the represented face, setting, and act from being mistaken for historical documentation.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Nāgārjuna composes the Madhyamaka texts', url: 'https://commons.wikimedia.org/wiki/File:201_Nagarjuna_Composes_the_Madhyamaka_Texts.jpg'},
    reference: nagarjunaReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'nagarjuna'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'madhyamaka-lineage-aryadeva',
    assetId: 'nagarjuna-aryadeva-rubin-painting',
    displayName: 'Nāgārjuna and Āryadeva: Building a Madhyamaka Lineage',
    shortTitle: 'Nāgārjuna: Āryadeva and Lineage',
    workLabel: 'MADHYAMAKA · TEACHING AND DEVELOPMENT',
    dateLabel: 'Tibetan painting · 19th century',
    question: 'How does an argument become a lineage rather than remain one author’s work?',
    frontSubtitle: 'Teacher, student, commentary, debate, attribution, and later Tibetan memory',
    lead: 'A nineteenth-century Tibetan painting presents Nāgārjuna and Āryadeva as two great Indian scholastics. Made long after their lifetimes, it belongs to a lineage’s memory rather than portrait evidence. The pairing shifts attention from a solitary founder to transmission: arguments are selected, criticized, commented upon, attributed, and reorganized as later communities define what “Madhyamaka” means.',
    keyIdeas: ['Āryadeva extends and redirects Madhyamaka argument.', 'Lineages preserve texts while also interpreting their relations.', 'Later images reveal reception, not historical appearance.'],
    cautions: ['The painting is not a lifetime likeness of either philosopher.', 'Teacher-student lineage should not erase disputed chronology, attribution, or later diversity.'],
    sections: [
      {heading: 'A school develops through response', paragraph: 'Āryadeva’s works engage philosophical and practical problems in ways that later interpreters connect with Nāgārjuna. Continuity is real, yet it does not require identical vocabulary, method, or emphasis in every text.'},
      {heading: 'Commentary creates structured disagreement', paragraph: 'Indian and Tibetan interpreters later debated how Madhyamaka arguments work, what conventional truth permits, and how reasoning relates to liberation. A lineage can hold sustained disagreement without becoming meaningless.'},
      {heading: 'Pairing is itself an interpretation', paragraph: 'The painting canonizes a relation between celebrated figures for a later audience. Museum visitors should read its composition as evidence for Tibetan reception while consulting texts and historical scholarship for the earlier intellectual relationship.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Nāgārjuna and Āryadeva, Rubin Museum', url: 'https://commons.wikimedia.org/wiki/File:Nagarjuna_and_Aryadeva_as_Two_Great_Indian_Buddhist_Scholastics_-_Google_Art_Project.jpg'},
    reference: nagarjunaReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'nagarjuna'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'prajnaparamita-wisdom-embodied',
    assetId: 'buddhist-prajnaparamita-pala-bronze',
    displayName: 'Nāgārjuna’s Context: Prajñāpāramitā, Wisdom beyond Reification',
    shortTitle: 'Nāgārjuna: Prajñāpāramitā',
    workLabel: 'MADHYAMAKA · PERFECTION OF WISDOM',
    dateLabel: 'Pāla-period bronze · 12th century',
    question: 'How can wisdom be personified without becoming a permanent essence?',
    frontSubtitle: 'Wisdom literature, emptiness, devotion, image, and later material reception',
    lead: 'A Pāla-period bronze personifies Prajñāpāramitā, the perfection of wisdom associated with a major body of Mahāyāna literature. Nāgārjuna’s thought is often read in relation to that literature, though the sculpture was made centuries later. The image gives wisdom a devotional body while the philosophy warns against treating any form, concept, or attainment as independently self-grounding.',
    keyIdeas: ['Prajñāpāramitā literature critiques attachment to fixed categories.', 'Personification can support devotion without asserting an eternal substance.', 'Madhyamaka and wisdom literature have related but complex histories.'],
    cautions: ['The bronze is not an image owned or designed by Nāgārjuna.', 'Do not turn a symbolic female figure into proof of one simple doctrine.'],
    sections: [
      {heading: 'Wisdom is practiced through non-grasping', paragraph: 'Perfection-of-wisdom texts repeatedly unsettle attachment to persons, dharmas, stages, and even the idea of wisdom itself. Their paradoxical language aims at transformation rather than a merely decorative celebration of learning.'},
      {heading: 'Material form and emptiness are not enemies', paragraph: 'A richly made image can participate in devotion, teaching, and merit while its tradition denies that the object possesses an isolated essence. Dependence on makers, materials, concepts, and users is part of what it is.'},
      {heading: 'Historical relation needs care', paragraph: 'Later traditions associate Nāgārjuna closely with Prajñāpāramitā. Scholarship must distinguish textual influence, legendary biography, chronology, and retrospective lineage rather than converting a meaningful association into an unsupported autograph claim.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Pāla bronze Prajñāpāramitā', url: 'https://commons.wikimedia.org/wiki/File:Prajnaparamita,_northeast_India,_12th_century_AD,_Pala_Period,_bronze_-_Fitchburg_Art_Museum_-_DSC08844.JPG'},
    reference: nagarjunaReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'nagarjuna'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'asanga-vasubandhu-yogacara-lineage',
    assetId: 'buddhist-asanga-vasubandhu-relief',
    displayName: 'Vasubandhu and Asaṅga: Building Yogācāra',
    shortTitle: 'Vasubandhu: Yogācāra with Asaṅga',
    workLabel: 'VASUBANDHU · YOGĀCĀRA DEVELOPMENT',
    dateLabel: 'Modern Buddhavanam relief · photographed 2024',
    question: 'How does collaboration reshape an inherited analysis of mind?',
    frontSubtitle: 'Brothers in later memory, texts, attribution, practice, and contested intellectual development',
    lead: 'A modern relief presents Asaṅga and Vasubandhu establishing Vijñānavāda or Yogācāra. The scene is commemorative, and scholarship continues to debate Vasubandhu’s biography, chronology, and textual affiliations. It nevertheless introduces a real intellectual development: analyses of cognition, dispositions, representation, and transformation grew through multiple authors, texts, institutions, and later lineage narratives.',
    keyIdeas: ['Yogācāra developed through a corpus rather than one isolated doctrine.', 'Cognition is analyzed for soteriological transformation as well as theory.', 'Biographical and attribution questions remain open.'],
    cautions: ['The modern relief is not evidence for the brothers’ appearance or a historical meeting.', 'Do not reduce Yogācāra to the slogan that only a private mind exists.'],
    sections: [
      {heading: 'A lineage organizes a complex corpus', paragraph: 'Works associated with Asaṅga, Vasubandhu, Maitreya, and later commentators differ in genre and emphasis. Retrospective school labels clarify connections while risking a false picture of complete doctrinal uniformity.'},
      {heading: 'Analysis aims at transformation', paragraph: 'Accounts of representation, stored dispositions, three natures, and transformed cognition diagnose how mistaken subject-object structures arise. Their purpose is not exhausted by a modern debate over metaphysical idealism.'},
      {heading: 'Modern commemoration needs a caution', paragraph: 'The Buddhavanam relief makes textual collaboration legible for today’s visitors. Its labels must separate that educational aim from claims about precise authorship, conversion narratives, or events it cannot document.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Asaṅga and Vasubandhu establish Vijñānavāda', url: 'https://commons.wikimedia.org/wiki/File:212_Asanga_and_Vasubandhu_Establish_the_Vijnanavada.jpg'},
    reference: vasubandhuReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'vasubandhu'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'abhidharma-cosmology-mount-meru',
    assetId: 'buddhist-mount-meru-met-tapestry',
    displayName: 'Vasubandhu’s Abhidharma Context: A Structured Cosmos',
    shortTitle: 'Vasubandhu: Abhidharma Cosmos',
    workLabel: 'ABHIDHARMA · MOUNT MERU COSMOLOGY',
    dateLabel: 'Chinese silk tapestry mandala · 14th century',
    question: 'Why would analysis of experience include a detailed cosmos?',
    frontSubtitle: 'World systems, realms, karmic conditions, classification, and later visual transmission',
    lead: 'This fourteenth-century Chinese tapestry organizes Mount Meru and surrounding cosmology in intricate visual form. It postdates Vasubandhu by many centuries and is not an illustration from the Abhidharmakośa. The comparison matters because that work analyzes not only cognition and mental factors but realms, world systems, karma, and the conditioned situations in which different forms of life arise.',
    keyIdeas: ['Abhidharma classification joins psychology, cosmology, and causation.', 'Cosmic realms locate kinds of embodied and karmic condition.', 'Later visual traditions reorganize inherited models.'],
    cautions: ['The tapestry is not Vasubandhu’s diagram or an Indian manuscript page.', 'Do not present every Buddhist cosmology as one unchanged map.'],
    sections: [
      {heading: 'A cosmos supports analysis of condition', paragraph: 'World systems and realms provide a structured account of possible rebirth and experience. They connect ethical action with different forms of embodiment without requiring a permanent self that owns the sequence.'},
      {heading: 'Classification becomes an arena of dispute', paragraph: 'Vasubandhu reports and criticizes scholastic positions rather than merely listing settled facts. Cosmological categories therefore belong inside argument about causation, perception, karma, and what should count as ultimately real.'},
      {heading: 'Transmission transforms the image', paragraph: 'The Chinese tapestry places inherited cosmology within a later artistic, ritual, and institutional setting. Its extraordinary visual coherence is evidence of reception, not proof that every earlier school drew the same mandala.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Cosmological Mandala with Mount Meru, Met', url: 'https://commons.wikimedia.org/wiki/File:%E5%85%83_%E7%B7%99%E7%B5%B2_%E9%A0%88%E5%BD%8C%E5%B1%B1%E6%9B%BC%E9%99%80%E7%BE%85-Cosmological_Mandala_with_Mount_Meru_MET_DP276037.jpg'},
    reference: vasubandhuReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'vasubandhu'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'asanga-yogacara-transmission',
    assetId: 'buddhist-asanga-kofukuji-statue',
    displayName: 'Vasubandhu’s Yogācāra Lineage: Asaṅga across Asia',
    shortTitle: 'Vasubandhu: Asaṅga in East Asia',
    workLabel: 'YOGĀCĀRA · EAST ASIAN RECEPTION',
    dateLabel: 'Unkei, portrait of Muchaku (Asaṅga) · c. 1212',
    question: 'How does an Indian scholastic become present in a later East Asian institution?',
    frontSubtitle: 'Hossō reception, portrait sculpture, lineage, translation, and historical distance',
    lead: 'Unkei’s celebrated sculpture at Kōfuku-ji represents Muchaku, the Japanese name for Asaṅga, within the East Asian Hossō reception of Yogācāra. Made roughly eight centuries after the philosopher, it is not a lifetime portrait. The work shows how translation and institutional lineage can make an absent scholar powerfully present while developing ideas in a new cultural setting.',
    keyIdeas: ['East Asian Yogācāra developed through translation and commentary.', 'Portrait sculpture can materialize lineage authority.', 'Reception creates new intellectual forms rather than merely copying an origin.'],
    cautions: ['The sculpture is a later Japanese representation, not Asaṅga’s likeness from life.', 'It should not be used as Vasubandhu’s portrait or as proof of identical doctrine across regions.'],
    sections: [
      {heading: 'A name crosses languages', paragraph: 'Asaṅga’s works and attributed corpus traveled through translation, cataloguing, commentary, and teaching. “Muchaku” marks a reception history in which terminology and institutional identity were remade for new readers.'},
      {heading: 'Presence is artistically constructed', paragraph: 'The sculpture’s individualized face and bodily immediacy make a remote authority seem available to a community. That achievement belongs to Kamakura-period art, not documentary knowledge of Asaṅga’s physical appearance.'},
      {heading: 'Transmission is philosophical labor', paragraph: 'Choosing equivalents, organizing curricula, resolving textual differences, and debating interpretation all change the life of an argument. East Asian Yogācāra should therefore appear as intellectual development, not a passive endpoint.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Unkei’s Muchaku at Kōfuku-ji', url: 'https://commons.wikimedia.org/wiki/File:Kofukuji_Hokuendo_Muchaku_Unkei.jpg'},
    reference: vasubandhuReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'vasubandhu'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'buddhist-pramana-two-sources',
    assetId: 'buddhist-pramana-perception-inference-diagram',
    displayName: 'Buddhist Epistemology: Perception and Inference',
    shortTitle: 'Buddhist Epistemology: Two Sources',
    workLabel: 'BUDDHIST PRAMĀṆA · KNOWLEDGE SOURCES',
    dateLabel: 'Modern educational diagram · 2016',
    question: 'Why recognize perception and inference as distinct sources of knowledge?',
    frontSubtitle: 'Direct awareness, conceptual construction, reasons, error, and competing Indian systems',
    lead: 'This modern diagram summarizes a common account of Buddhist pramāṇa theory as recognizing perception and inference. It is a teaching aid, not a historical chart drawn by Dignāga or Dharmakīrti. Its clarity helps frame a difficult project: distinguish nonconceptual awareness from conceptual reasoning while explaining how both can guide successful action and liberating understanding.',
    keyIdeas: ['Perception and inference have different objects and structures.', 'Concepts organize experience without simply copying unique particulars.', 'Reliability is tied to successful cognition and causal conditions.'],
    cautions: ['The two-part diagram compresses disagreement and historical development.', 'Modern visual symmetry should not imply that every Buddhist author used identical definitions.'],
    sections: [
      {heading: 'Perception is analyzed closely', paragraph: 'Buddhist epistemologists ask what makes awareness direct, how error enters, and whether conceptual classification can present a unique particular as it is. The resulting accounts are technical and contested.'},
      {heading: 'Inference depends on reasons', paragraph: 'A sign must be connected with what is to be established and applied correctly to the case. Dignāga and Dharmakīrti refined how valid reasons, examples, and exclusions constrain argument.'},
      {heading: 'A diagram opens, rather than ends, study', paragraph: 'The clean split provides visitor orientation. The interpretation panel then restores disputes about reflexive awareness, exclusion, universals, language, and the soteriological role of warranted cognition.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Two Pramāṇas in Buddhist epistemology', url: 'https://commons.wikimedia.org/wiki/File:2_Pramana_Epistemology_Buddhism.svg'},
    reference: dharmakirtiReference,
    articleRoute: {kind: 'branch', branchId: 'buddhist-epistemology'},
    entityKind: 'branch',
  }),
  wallFill({
    id: 'nalanda-scholastic-institution',
    assetId: 'buddhist-nalanda-scholastic-ruins',
    displayName: 'Dignāga’s Scholastic World: Nālandā as Philosophical Practice',
    shortTitle: 'Dignāga’s Context: Nālandā',
    workLabel: 'BUDDHIST PRAMĀṆA · INSTITUTIONS OF DEBATE',
    dateLabel: 'Nālandā Mahāvihāra ruins · photographed 2012',
    question: 'What institutions turn reasoning into a durable practice?',
    frontSubtitle: 'Teaching, debate, commentary, travel, manuscripts, and the limits of archaeological inference',
    lead: 'The ruins of Nālandā evoke a major Buddhist scholastic institution associated with teaching, travel, commentary, and debate. They do not identify a room where Dignāga argued, nor do they prove every later account of his life. The site grounds Buddhist logic in the material practices that made specialist reasoning teachable, contestable, and transmissible across generations.',
    keyIdeas: ['Arguments persist through institutions and trained communities.', 'Debate and commentary are social practices with material supports.', 'Archaeology cannot assign a surviving wall to a named philosopher without evidence.'],
    cautions: ['Do not label the photographed structure as Dignāga’s classroom.', 'Nālandā contained changing communities and curricula, not one timeless school.'],
    sections: [
      {heading: 'Rigor requires training', paragraph: 'Technical accounts of perception, inference, language, and proof demand teachers, examples, memorization, manuscripts, and repeated objection. Institutions can stabilize that training while also establishing hierarchies of authority.'},
      {heading: 'Travel expands the conversation', paragraph: 'Students, translators, and pilgrims connected Nālandā with other parts of South, Central, and East Asia. Movement carried texts and arguments into settings where new vocabularies and debates emerged.'},
      {heading: 'Ruins require disciplined interpretation', paragraph: 'The photograph records conserved remains spanning historical phases. It makes scale and material investment visible, but textual and archaeological evidence must be joined before claims about a precise philosopher, school, or activity are made.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Nālandā University ruins', url: 'https://commons.wikimedia.org/wiki/File:Nalanda_University_ruins.JPG'},
    reference: dharmakirtiReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'dignaga'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'dharmakirti-pramanavarttika-reception',
    assetId: 'dharmakirti-tibetan-woodblock-portrait',
    displayName: 'Dharmakīrti’s Pramāṇavārttika: A Tradition of Commentary',
    shortTitle: 'Dharmakīrti: Pramāṇavārttika Reception',
    workLabel: 'DHARMAKĪRTI · REASON AND COMMENTARY',
    dateLabel: 'Traditional Tibetan woodblock portrait · date and collection not supplied',
    question: 'How does a difficult work remain alive through commentary?',
    frontSubtitle: 'Inference, perception, authority, later portraiture, and a long Tibetan curriculum',
    lead: 'This traditional Tibetan woodblock portrait identifies Dharmakīrti but supplies neither a documented object date nor a lifetime likeness. Its value lies in reception: the Pramāṇavārttika generated extensive Indian and Tibetan commentary on perception, inference, language, authority, and Buddhist commitments. The later portrait marks the philosopher’s curricular presence while its missing provenance remains visible rather than invented.',
    keyIdeas: ['The Pramāṇavārttika became a central, contested commentarial work.', 'Reasoning and Buddhist soteriology remain connected.', 'Later portrait conventions establish identity without preserving appearance.'],
    cautions: ['The file page does not supply the artist, object date, or holding collection.', 'Do not treat the woodblock as a historical portrait or Dharmakīrti’s own illustration.'],
    sections: [
      {heading: 'A work lives through readers', paragraph: 'Commentators explain compressed arguments, propose structures, resolve apparent conflict, and create new questions. Their disagreements are part of the philosophical tradition rather than noise around an unchanged original.'},
      {heading: 'Epistemology has practical stakes', paragraph: 'Dharmakīrti’s accounts of reliable cognition and authority participate in Buddhist arguments about error, action, and liberation. Technical reasoning is not detached from the larger question of how suffering and mistaken construction can cease.'},
      {heading: 'Missing metadata stays missing', paragraph: 'The image is useful because it shows later Tibetan recognition of Dharmakīrti. Responsible attribution also states what the source does not provide, refusing to invent a date, artist, institution, or biographical certainty.'},
    ],
    imageSource: {label: 'Wikimedia Commons — traditional Tibetan woodblock portrait of Dharmakīrti', url: 'https://commons.wikimedia.org/wiki/File:Dharmakirti.gif'},
    reference: dharmakirtiReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'dharmakirti'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'kumarajiva-madhyamaka-translation',
    assetId: 'buddhist-kumarajiva-translation-relief',
    displayName: 'Buddhist Transmission: Kumārajīva Translates the Middle Way',
    shortTitle: 'Buddhist Transmission: Kumārajīva',
    workLabel: 'TRANSLATION · MADHYAMAKA IN CHINESE',
    dateLabel: 'Modern Buddhavanam relief · photographed 2024',
    question: 'What philosophical choices occur inside translation?',
    frontSubtitle: 'Teams, terminology, textual selection, Chinese Madhyamaka, and a modern commemorative image',
    lead: 'A modern Buddhavanam relief depicts Kumārajīva translating Madhyamaka works into Chinese. It is not a historical scene, but it makes translation itself visible as collaborative philosophical labor. Choosing terms, comparing manuscripts, teaching audiences, and organizing a corpus helped shape Chinese understandings of emptiness and the middle way rather than carrying an untouched doctrine between languages.',
    keyIdeas: ['Translation creates and stabilizes philosophical vocabulary.', 'Text selection influences which arguments become canonical.', 'Chinese Madhyamaka develops through interpretation, not passive copying.'],
    cautions: ['The relief is a contemporary commemoration, not documentary evidence.', 'Translation does not transfer one fixed meaning without remainder.'],
    sections: [
      {heading: 'A translation team makes judgments', paragraph: 'Rendering technical language requires decisions about established usage, ambiguity, rhythm, and explanatory additions. Those choices become resources—and sometimes problems—for later commentators and rival translations.'},
      {heading: 'A corpus is curated', paragraph: 'Which works are translated, grouped, attributed, and repeatedly taught affects the intellectual shape of a tradition. Transmission can amplify some voices while leaving other texts unavailable or marginal.'},
      {heading: 'New settings produce new philosophy', paragraph: 'Chinese interpreters related Madhyamaka arguments to existing vocabularies, institutions, and controversies. The resulting traditions belong to Buddhist history in their own right rather than serving only as containers for an Indian origin.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Kumārajīva translates Madhyamaka into Chinese', url: 'https://commons.wikimedia.org/wiki/File:202_Kumarajiva_Translates_the_Madhyamaka_into_Chinese.jpg'},
    reference: nagarjunaReference,
    articleRoute: {kind: 'branch', branchId: 'buddhist-philosophy'},
    entityKind: 'branch',
  }),
  wallFill({
    id: 'tripitaka-koreana-printing-canon',
    assetId: 'buddhist-tripitaka-koreana-blocks',
    displayName: 'Buddhist Transmission: Tripiṭaka Koreana, Canon and Carving',
    shortTitle: 'Buddhist Transmission: Tripiṭaka Koreana',
    workLabel: 'KOREA · CANON AND WOODBLOCK PRINTING',
    dateLabel: '13th-century woodblocks · Haeinsa',
    question: 'What does it take to preserve a canon at enormous scale?',
    frontSubtitle: 'Carving, collation, storage, patronage, reproducibility, and Korean Buddhist history',
    lead: 'Rows of Tripiṭaka Koreana woodblocks make the labor of canon preservation visible at architectural scale. Carved in the thirteenth century and housed at Haeinsa, the collection joins textual collation, skilled craft, storage, patronage, and printing. It is not simply a neutral container: decisions about editions, ordering, correction, and preservation shape what later readers can study.',
    keyIdeas: ['A canon is produced through selection, comparison, and material labor.', 'Woodblocks enable reproducibility while requiring exacting care.', 'Korean Buddhist institutions actively shaped transmission.'],
    cautions: ['The blocks do not represent every Buddhist text or tradition.', 'Preservation and textual authority are historical achievements, not automatic guarantees of one final reading.'],
    sections: [
      {heading: 'Scale changes textual life', paragraph: 'Thousands of carved blocks require coordinated artisans, editors, funding, buildings, and environmental management. The project turns “the canon” from an abstract list into a sustained institutional practice.'},
      {heading: 'Reproduction still involves judgment', paragraph: 'Printing can stabilize a selected text, but establishing the copy to carve depends on comparison and correction. Reproducibility does not end interpretation or eliminate variant textual histories.'},
      {heading: 'Transmission has regional centers', paragraph: 'Haeinsa is not a distant afterthought to an Indian story. The woodblocks demonstrate Korean innovation and stewardship within a trans-Asian Buddhist history whose institutions create their own authoritative forms.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Tripiṭaka Koreana woodblocks', url: 'https://commons.wikimedia.org/wiki/File:Tripitaka_Koreana.jpg'},
    reference: buddhistReference,
    articleRoute: {kind: 'branch', branchId: 'buddhist-philosophy'},
    entityKind: 'branch',
  }),
  wallFill({
    id: 'pali-kammavaca-southeast-asia',
    assetId: 'buddhist-burmese-kammavaca',
    displayName: 'Buddhist Transmission: Pāli Kammavācā in Southeast Asia',
    shortTitle: 'Buddhist Transmission: Kammavācā',
    workLabel: 'SOUTHEAST ASIA · DISCIPLINE AND MATERIAL FORM',
    dateLabel: 'Burmese gilded palm-leaf manuscript · 19th century',
    question: 'How does disciplinary text become a distinctive ceremonial object?',
    frontSubtitle: 'Pāli recitation, monastic procedure, gilded leaves, local craft, and institutional continuity',
    lead: 'A Burmese kammavācā manuscript presents Pāli passages used in formal monastic acts on gilded palm leaves. Its striking material form shows that transmission is not merely the movement of propositions. Recitation, procedure, script, craft, patronage, and institutional authority give a disciplinary text a new local life while connecting it to a wider Theravāda world.',
    keyIdeas: ['Monastic discipline is enacted through communal procedures.', 'Material form can mark authority and ceremonial value.', 'Pāli transmission developed through distinctive regional practices.'],
    cautions: ['This nineteenth-century object is not an early Buddhist manuscript.', 'One Burmese kammavācā cannot represent every Southeast Asian Buddhist tradition.'],
    sections: [
      {heading: 'A text performs an action', paragraph: 'Kammavācā passages are recited in formal acts of the monastic community. Their meaning therefore depends on participants, procedures, qualifications, and occasions rather than on silent reading alone.'},
      {heading: 'Local craft shapes authority', paragraph: 'Gilded leaves, lacquer, script, boards, and ordered bundles make the object durable and ceremonially powerful. Those choices belong to Burmese material and institutional history, not decorative packaging around an unchanged essence.'},
      {heading: 'Transmission multiplies centers', paragraph: 'Buddhist traditions in Sri Lanka and mainland Southeast Asia preserved, debated, and reorganized Pāli texts through their own institutions. The manuscript closes the gallery by opening toward those histories rather than treating movement eastward as a single route.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Burmese Kammavācā', url: 'https://commons.wikimedia.org/wiki/File:Burmese_Kammavaca.jpg'},
    reference: buddhistReference,
    articleRoute: {kind: 'branch', branchId: 'buddhist-philosophy'},
    entityKind: 'branch',
  }),
] as const satisfies readonly MuseumSupplementalExhibit[];
