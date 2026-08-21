import type {
  MuseumCanonicalContextRef,
  MuseumSupplementalExhibit,
  MuseumSupplementalInterpretationSource,
} from './platoSupplementalExhibits';
import {getMuseumAsset} from './museumAssets';

type PlaqueType = NonNullable<MuseumSupplementalExhibit['wallPlaque']>['type'];
type Evidence = {
  plaqueTitle: string;
  plaqueType: PlaqueType;
  articleTitle: string;
  invitation: string;
  visualReading: string;
  claim: string;
  boundary: string;
  guide: readonly [string, string];
  resolution: string;
  additionalSources?: readonly MuseumSupplementalInterpretationSource[];
};

const source = (
  label: string,
  url: string,
  kind: MuseumSupplementalInterpretationSource['kind'],
): MuseumSupplementalInterpretationSource => ({label, url, kind});

const locks: Record<string, string> = {
  'continental-saussure-sign-system': 'fnv1a64:11885f3ad31c97d0',
  'continental-freud-interpretive-depth': 'fnv1a64:849b0d69229bc469',
  'continental-college-institutions': 'fnv1a64:063ea4b1f1b154b4',
  'continental-berlin-history-rupture': 'fnv1a64:558428a8deebfeb4',
  'continental-freiburg-phenomenological-line': 'fnv1a64:c5759eabc477a83a',
  'foucault-panopticon-visibility': 'fnv1a64:cfcec56002eef819',
  'foucault-clinical-gaze': 'fnv1a64:121985b32cf320ff',
  'foucault-bertillon-examination': 'fnv1a64:0322c879819df82f',
  'foucault-mettray-disciplinary-labor': 'fnv1a64:b94e67ab7d8b75d4',
  'foucault-archive-practice': 'fnv1a64:db867b4253fe0546',
  'derrida-colonial-language-algeria': 'fnv1a64:81e858bdb8e0e8b7',
  'derrida-rosetta-translation': 'fnv1a64:6afba225f880e985',
  'derrida-babel-difference': 'fnv1a64:b09e7b9fa805e45c',
  'derrida-ens-institution': 'fnv1a64:a6ce15916bd6623a',
  'derrida-writing-material-trace': 'fnv1a64:1aaa4edba832094a',
  'critical-theory-institute': 'fnv1a64:9626ad5e325b40eb',
  'habermas-coffeehouse-public-sphere': 'fnv1a64:96555c527ed832b5',
  'habermas-parliament-deliberation': 'fnv1a64:e1100b018631e4e0',
  'critical-theory-radio-culture-industry': 'fnv1a64:829ca504be2fb462',
  'critical-theory-adorno-memorial': 'fnv1a64:c2233499804d733c',
  'ethics-confucian-ritual-practice': 'fnv1a64:680d067e728a7d98',
  'ethics-jain-nonviolence-practice': 'fnv1a64:c8da672b49130c7d',
  'ethics-buddhist-discipline-compassion': 'fnv1a64:899282b324941e2c',
  'ethics-care-attention-practice': 'fnv1a64:609ca7783a16a3b5',
  'ethics-labor-social-position': 'fnv1a64:ccae516594284072',
  'virtue-practice-habituation': 'fnv1a64:597f3c4a725ff52d',
  'murdoch-kestrel-unselfing': 'fnv1a64:dadc2a2c660c0502',
  'foot-natural-goodness': 'fnv1a64:7e63c183251f9639',
  'duty-kant-autonomy': 'fnv1a64:cd89f886af2af7f3',
  'utility-bentham-reform': 'fnv1a64:be888b3d2c83d17a',
  'utility-equality-inclusion': 'fnv1a64:98bbd6fa463ddfef',
  'utility-public-health-welfare': 'fnv1a64:ece4068eb633217d',
  'thomson-violinist-bodily-rights': 'fnv1a64:fce4d6148609155f',
  'thomson-bodily-autonomy-context': 'fnv1a64:bf5f17b00042851b',
  'parfit-psychological-continuity': 'fnv1a64:eae9d9e0cedf9397',
  'parfit-future-generations': 'fnv1a64:749a756b152f6480',
};

/** Walking order is deliberately identical to Galleries 22 and 23. */
const evidence: Record<string, Evidence> = {
  'continental-saussure-sign-system': {
    plaqueTitle: 'Ferdinand de Saussure, Studio Portrait', plaqueType: 'other', articleTitle: 'Continental Philosophy',
    invitation: 'A lifetime portrait identifies Saussure while the posthumously assembled Course requires a separate history of texts, editors, lectures, and later structuralist reception.',
    visualReading: 'The seated figure, dark suit, chair, and studio conventions support identification only. The mark “F. Jullien Genève” is visible in the source history, but its expansion to Frank-Henri Jullien remains tentative and no original holding is named.',
    claim: 'Charles Bally and Albert Sechehaye assembled the 1916 Course in General Linguistics after Saussure’s death from lecture materials. Its signifier/signified distinction and account of value through differences became resources that later structuralists transformed rather than one doctrine they simply inherited.',
    boundary: 'The photograph cannot authenticate the Course’s wording, make character visible, or establish a straight intellectual lineage. “Arbitrary” concerns socially instituted relations inside a language, not unrestricted private choice, and structuralist uses of Saussure must be distinguished from later criticism and deconstruction.',
    guide: ['Separate the tentative studio attribution from the posthumous editorial history of the Course.', 'Follow signifier, signified, value, and difference through texts; treat later structuralism as selective reception rather than a portrait’s message.'],
    resolution: 'retitled the portrait, retained tentative authorship and absent custody, and separated likeness, posthumous editing, structuralism, and later reception.',
  },
  'continental-freud-interpretive-depth': {
    plaqueTitle: 'Freud’s Psychoanalytic Couch', plaqueType: 'object-manuscript-site-or-archaeological-context', articleTitle: 'Continental Philosophy',
    invitation: 'Freud’s couch locates interpretation in a material clinical arrangement without making furniture evidence for the truth or efficacy of psychoanalysis.',
    visualReading: 'Layered rugs, cushions, couch, room, and camera viewpoint record the preserved couch. The Freud Museum identifies the object, its use, and a gift around 1890; the 2019 photograph records the museum setting rather than a historical treatment session.',
    claim: 'Psychoanalysis challenges the image of a wholly self-transparent subject by reading dreams, symptoms, slips, repetition, resistance, and transference. Later critical theorists, Lacanians, Derrida, and Foucault adopted, revised, or disputed different parts of Freud rather than sharing one unconscious.',
    boundary: 'The object establishes neither a diagnosis nor a therapeutic outcome and cannot disclose a patient’s speech or experience. Clinical authority, suggestion, sexuality, evidence, and scientific status remain disputed, while later philosophical reception must not be mistaken for agreement with every Freudian claim.',
    guide: ['Identify the museum object and consulting-room arrangement before moving to clinical or philosophical claims.', 'Distinguish Freud’s texts and practice from later psychoanalytic, critical-theory, deconstructive, and genealogical receptions.'],
    resolution: 'added the Freud Museum record and gift history, made the caption factual, and bounded clinical efficacy, patient evidence, and later philosophical use.',
  },
  'continental-college-institutions': {
    plaqueTitle: 'Courtyard of the Collège de France', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Continental Philosophy',
    invitation: 'A courtyard photograph makes one institution visible while warning against turning Paris, a chair, or a curriculum into the whole of continental philosophy.',
    visualReading: 'The image records an arcaded courtyard, façade, and statue of Guillaume Budé in 2006. It does not show an appointment, lecture, archive, audience, or Foucault, and its single Paris location cannot stand for traditions developed across many languages and institutions.',
    claim: 'The Collège de France documents Foucault’s History of Systems of Thought chair from 1970 to 1984. Chairs, hiring, translation, publishing, archives, and curricula shape circulation, but institutional conditions do not mechanically determine arguments or erase movements outside recognized centers.',
    boundary: 'The familiar category “continental philosophy” is partly retrospective and especially consequential in anglophone teaching. It can orient readers across heterogeneous traditions but becomes misleading when it implies one method, one continent, one genealogy, or an uncontested procession of famous men.',
    guide: ['Read the courtyard as one 2006 institutional setting, not a photograph of philosophy being produced.', 'Track chairs, lectures, archives, translations, appointments, exclusions, and counter-institutions without reducing thought to a building.'],
    resolution: 'replaced architectural symbolism with a factual courtyard record and linked the separate Foucault chair history while preserving geographic and institutional limits.',
  },
  'continental-berlin-history-rupture': {
    plaqueTitle: 'People at the Berlin Wall, 9–10 November 1989', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Continental Philosophy',
    invitation: 'A night photograph records people at the newly opened border while resisting the claim that one event fulfilled or defeated a philosophy of history.',
    visualReading: 'People gather atop and beside the Wall with the Brandenburg Gate behind them. The frame supports a dated public scene but does not identify individuals, document their motives, or prove that the pictured section was already being physically dismantled.',
    claim: 'The opening of border crossings and the subsequent end of the East German regime altered political horizons and prompted competing interpretations of ideology, emancipation, capitalism, socialism, memory, and historical rupture. Those interpretations depend on chronology and argument beyond this photograph.',
    boundary: 'Sue Ream’s image has no institutional object record or accession in the accessible source. A celebrated scene can become shorthand that excludes prior protest, state coercion, migration, reunification’s uneven effects, and the plurality of philosophical responses before and after 1989.',
    guide: ['Describe the people, Wall, Gate, night, and date without inferring identities, demolition, or consensus.', 'Use historical records for border opening and aftermath; compare philosophical interpretations instead of declaring a final historical verdict.'],
    resolution: 'removed the unsupported breached-wall claim, kept uncertain custody explicit, and separated event evidence from later political and philosophical interpretation.',
    additionalSources: [source('German Historical Museum — Berliners celebrate at the Brandenburg Gate', 'https://www.dhm.de/lemo/bestand/objekt/berliner-feiern-am-brandenburger-tor-den-fall-der-mauer-1989', 'collection-record')],
  },
  'continental-freiburg-phenomenological-line': {
    plaqueTitle: 'Kollegiengebäude I, University of Freiburg', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Continental Philosophy',
    invitation: 'A university building locates a consequential phenomenological lineage while leaving philosophical difference, institutional power, and political responsibility unresolved.',
    visualReading: 'The photograph records Kollegiengebäude I behind trees and lawn in 2005. Architecture alone cannot show a seminar, doctrine, teacher-student relation, dismissal, or political choice, and the present building does not collapse the university’s changing history into one moment.',
    claim: 'Freiburg connects Husserl and Heidegger through appointments, teaching, and succession, yet their projects and political histories diverge. The university distinguishes restrictions imposed on Husserl in 1933 from withdrawal of his teaching license in 1936; precise chronology matters.',
    boundary: 'Institutional genealogy cannot turn Husserl, Heidegger, phenomenology, hermeneutics, or existentialism into a continuous school. Heidegger’s Nazi Party membership and rectorship remain essential to reception, while the building neither explains his thought nor repairs the exclusions enacted there.',
    guide: ['Use the photograph for place and the university records for appointments, restrictions, and chronology.', 'Distinguish intellectual inheritance from agreement, and institutional association from philosophical or political exoneration.'],
    resolution: 'added university history, separated 1933 restrictions from the 1936 license withdrawal, and bounded architectural and genealogical inference.',
    additionalSources: [source('University of Freiburg — Edmund Husserl', 'https://uni-freiburg.de/en/edmund-husserl-2/', 'collection-record')],
  },
  'foucault-panopticon-visibility': {
    plaqueTitle: 'Proposed Prison at Outram, Singapore', plaqueType: 'object-manuscript-site-or-archaeological-context', articleTitle: 'Michel Foucault',
    invitation: 'An unbuilt colonial prison proposal visualizes radial inspection while its missing custody and undocumented relation to Bentham and Foucault remain explicit.',
    visualReading: 'Radiating wings meet a central hub in McNair’s 1880s drawing, photographed in 2006. The plan supports description of a proposed spatial arrangement but not claims about construction, operation, effects, or the whereabouts of the original sheet.',
    claim: 'Foucault used Bentham’s Panopticon as a model for analyzing asymmetric visibility and disciplinary power, not as the single origin or universal blueprint of modern institutions. This later Singapore proposal can only prompt comparison with that analysis.',
    boundary: 'Commons identifies an unbuilt proposal but supplies no holding institution, accession, full provenance, or documented transmission from Bentham’s plans. No evidence connects Foucault to this drawing, and its colonial setting requires historical research rather than an inferred story of ideas traveling unchanged.',
    guide: ['Begin with the proposed, unbuilt, photographed drawing and its unresolved original custody.', 'Compare radial visibility with Foucault’s text while withholding claims about construction, effects, direct transmission, or authorial use.'],
    resolution: 'corrected the portrait-oriented distortion, disclosed missing custody and provenance, and withdrew unsupported claims of direct transfer or Foucault use.',
  },
  'foucault-clinical-gaze': {
    plaqueTitle: 'A Clinical Lesson at the Salpêtrière', plaqueType: 'reception-or-transmission-history', articleTitle: 'Michel Foucault',
    invitation: 'Brouillet’s staged 1887 clinical scene invites scrutiny of observation and authority without becoming transparent evidence of a lesson, patient, or Foucault’s analysis.',
    visualReading: 'Charcot presents a supported patient before a predominantly male medical audience in a large composed painting. Gesture, arrangement, costume, and viewpoint are artistic choices; describing the patient as fainting or assigning her interior state exceeds what the image establishes.',
    claim: 'Foucault’s histories ask how clinical perception, institutions, classifications, case records, and professional authority shape what can count as disease and knowledge. That argument comes from texts and medical history, not from treating Brouillet’s representation as a neutral photograph.',
    boundary: 'The 2014 AP-HP record locates the work at the Faculté de médecine, Université Paris V René Descartes. The painting predates Foucault, was not witnessed by him, and cannot disclose the represented patient’s consent, diagnosis, testimony, or experience.',
    guide: ['Identify Brouillet’s staged painting, date, setting, and supported patient before interpreting clinical authority.', 'Distinguish artistic representation, medical institutional history, patient experience, and Foucault’s later genealogical argument.'],
    resolution: 'corrected the institution and alt text, added the AP-HP record, and separated painting, patient evidence, medical history, and Foucault reception.',
  },
  'foucault-bertillon-examination': {
    plaqueTitle: 'Bertillon-Related Identification Display', plaqueType: 'object-manuscript-site-or-archaeological-context', articleTitle: 'Michel Foucault',
    invitation: 'A modern museum stand gathers identification tools while leaving the originality, association, and historical use of each displayed item unresolved.',
    visualReading: 'The photograph shows standardized photographs, measuring devices, and camera equipment arranged in a museum case. The accessible record relates the stand to work prepared for an 1889 exposition but does not establish that it reconstructs one exact apparatus.',
    claim: 'Bertillon’s identification practices joined measurement, photography, files, comparison, and administrative expertise. Foucault’s examination names a wider coupling of knowledge and normalization; the display is contextual history rather than an object Foucault designed or necessarily studied.',
    boundary: 'No direct museum accession, inventory, item-by-item provenance, or reproduction history was located. A 2010 installation cannot be treated as an original nineteenth-century ensemble, and visible technologies do not by themselves establish outcomes, neutrality, accuracy, or the experience of classified people.',
    guide: ['Call this a Bertillon-related modern display unless individual objects receive direct catalog support.', 'Separate measurement apparatus, museum reconstruction, historical policing practice, and Foucault’s broader concept of examination.'],
    resolution: 'retitled the installation, qualified the 1889 association, and disclosed absent accession, item provenance, originality, and direct Foucault connection.',
  },
  'foucault-mettray-disciplinary-labor': {
    plaqueTitle: 'Wooden-Shoe Workshop at Mettray, c. 1910', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Michel Foucault',
    invitation: 'An unidentified postcard represents labor at Mettray while withholding the pictured people’s names, roles, experience, and the conditions of its production.',
    visualReading: 'Figures pose in rows outside a workshop holding tools and wooden shoes. Clothing, posture, props, and arrangement support description, but the image does not establish that every figure is a boy, inmate, supervisor, or shoemaker.',
    claim: 'Mettray began in 1839 and opened on 22 January 1840. Foucault treats it as consequential within a history of disciplinary institutions joining enclosure, hierarchy, training, labor, moralization, and documentation; that analysis cannot be read directly from a promotional image.',
    boundary: 'The accessible source comes through a later Drouot sale and supplies no photographer, publisher, named sitter, original postcard provenance, or institutional accession. A c. 1910 representation cannot summarize seventy years of the colony or substitute for inmates’ testimony and institutional records.',
    guide: ['Describe unidentified figures, tools, wooden shoes, workshop, postcard form, and approximate date only.', 'Use institutional and testimonial history for labor and discipline; never infer roles or experience from pose alone.'],
    resolution: 'removed unsupported sitter roles, supplied the opening chronology, and disclosed postcard authorship, publication, custody, provenance, and testimony limits.',
  },
  'foucault-archive-practice': {
    plaqueTitle: 'Salle Labrouste, INHA Library', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Michel Foucault',
    invitation: 'A restored reading room makes research infrastructure visible without reducing Foucault’s archive to a building or a store of documents.',
    visualReading: 'Domes, columns, desks, lamps, shelves, and ordered workspaces define the 2022 photograph. The room’s current use by the INHA Library since 2016 must be distinguished from its earlier BnF history and from any particular researcher’s activity.',
    claim: 'Libraries and archives organize preservation, access, classification, cataloging, and scholarly labor. Foucault’s technical archive instead concerns historical rules governing the appearance and transformation of statements, so the material institution and conceptual method illuminate but do not equal one another.',
    boundary: 'The photograph cannot show what was excluded, inaccessible, uncataloged, destroyed, or interpreted, and it does not document Foucault working there. Present INHA custody, former BnF use, architectural history, and philosophical analysis require distinct records rather than a generic library credit.',
    guide: ['Name the present INHA Library use and former BnF history before making an archival analogy.', 'Distinguish collections and reading practices from Foucault’s rule-governed field of statements, exclusions, and transformations.'],
    resolution: 'corrected the current institution, added the INHA record, and separated physical research infrastructure, former use, and Foucault’s archive concept.',
  },
  'derrida-colonial-language-algeria': {
    plaqueTitle: 'Administrative Map of French Algeria, 1905–1955', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Jacques Derrida',
    invitation: 'A modern derivative map locates colonial divisions while refusing to make administrative lines a neutral or complete account of Derrida’s Algerian childhood.',
    visualReading: 'Colored departments and southern territories divide the mapped space, but the file combines divisions dated 1905–1955 with international boundaries dated 1934–1962. It therefore visualizes no single historical year and remains a 2012 cartographic synthesis.',
    claim: 'Derrida’s childhood in colonial Algeria and his Jewish family’s exclusion under Vichy matter to later questions of language, citizenship, belonging, and inheritance. Those biographical and legal claims require dedicated sources; they are not encoded by the administrative map.',
    boundary: 'Commons identifies source maps and editor but no institutional historical-map holding. Administrative cartography can make state categories appear natural while obscuring Indigenous places, languages, violence, movement, and lived experience; the image must not stand for Algeria or prove a causal origin for deconstruction.',
    guide: ['Read the 2012 derivative, division dates, boundary dates, language, and administrative categories separately.', 'Use biographical and colonial-history sources for citizenship and education; do not infer lived experience from mapped borders.'],
    resolution: 'corrected the date range and custody description while distinguishing modern derivative cartography, colonial administration, biography, and philosophical reception.',
  },
  'derrida-rosetta-translation': {
    plaqueTitle: 'Rosetta Stone, British Museum EA24', plaqueType: 'object-manuscript-site-or-archaeological-context', articleTitle: 'Jacques Derrida',
    invitation: 'A priestly decree in three scripts opens questions about translation and authority while retaining its Ptolemaic purpose, acquisition history, and lack of connection to Derrida.',
    visualReading: 'The dark broken stone carries hieroglyphic, Demotic, and Greek inscriptions in visible bands. The British Museum identifies a priestly decree concerning Ptolemy V from 196 BCE; the 2012 photograph records its current display rather than its findspot.',
    claim: 'One decree in multiple scripts materially supports comparison, decipherment, and transmission, but translation is not simple replacement of identical meanings. Derrida’s work on writing and difference comes from other texts; the stone is a comparative object, not a source or illustration he chose.',
    boundary: 'The museum records its 1799 discovery and transfer to British custody after the 1801 Treaty of Alexandria. Ancient makers remain unnamed, and colonial seizure, museum display, damage, genre, and unequal scholarly histories cannot disappear behind a triumphant story of decipherment.',
    guide: ['Identify EA24, the 196 BCE priestly decree, three scripts, photographer, and acquisition history.', 'Separate Ptolemaic authority, modern decipherment, colonial custody, and Derrida’s later philosophical arguments about writing and translation.'],
    resolution: 'added the British Museum object record and acquisition history, corrected maker language, and bounded translation analogy and Derrida connection.',
  },
  'derrida-babel-difference': {
    plaqueTitle: 'The Tower of Babel', plaqueType: 'reception-or-transmission-history', articleTitle: 'Jacques Derrida',
    invitation: 'Bruegel’s 1563 Babel offers earlier visual reception of a biblical story, not evidence for Derrida’s later account of translation.',
    visualReading: 'Tower, city, rulers, workers, scaffolding, landscape, and unfinished construction fill Bruegel’s oak support. These features belong to a sixteenth-century painting and its biblical reception; they cannot visualize différance, a proper name, or a translation theory by themselves.',
    claim: 'Derrida’s “Des Tours de Babel” appeared in a bilingual 1985 volume and reads Babel as making translation both necessary and structurally incomplete. The essay’s arguments must be distinguished from the painting and from the simplifying claim that it was merely published in English.',
    boundary: 'KHM records GG 1026, medium, dimensions, provenance, and an image-copyright assertion, while the installed Commons source marks its reproduction public domain. That rights conflict remains disclosed. No documented Bruegel–Derrida connection turns this earlier artwork into primary philosophical evidence.',
    guide: ['Read artist, date, object, biblical reception, and reproduction-rights conflict before the philosophical comparison.', 'Use Derrida’s 1985 essay for translation claims; do not assign deconstruction to the tower’s visual incompletion.'],
    resolution: 'added the KHM object record, disclosed conflicting reproduction-rights statements, corrected the 1985 publication context, and bounded philosophical inference.',
  },
  'derrida-ens-institution': {
    plaqueTitle: 'École Normale Supérieure, Rue d’Ulm', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Jacques Derrida',
    invitation: 'A c. 1900 postcard frames an institutional entrance while remaining decades earlier than Derrida’s admission and silent about his formation and teaching.',
    visualReading: 'Façade, gate, pavement, and postcard conventions record the rue d’Ulm entrance around 1900. The heliotype publisher is known, but the original card’s holding and accession are not; no pictured detail records Derrida, an examination, or a curriculum.',
    claim: 'Derrida passed the ENS entrance examination in 1952 and later taught there. Selection, canons, appointments, pedagogy, and belonging form relevant institutional history, but architecture does not explain deconstruction or determine an individual’s intellectual relation to an institution.',
    boundary: 'The postcard substantially predates Derrida and supplies contextual imagery only. Institutional critique can emerge within institutions without making every inside/outside relation equivalent, and the photograph cannot establish admissions experience, exclusion, teaching content, colleagues, or later disputes.',
    guide: ['Keep the c. 1900 postcard, unknown original custody, and Derrida’s 1952 admission chronologically distinct.', 'Use biography and ENS history for formation and teaching; treat architecture as context, never causal proof.'],
    resolution: 'added ENS history, preserved postcard provenance limits, and separated the c. 1900 façade from Derrida’s later admission, teaching, and critique.',
  },
  'derrida-writing-material-trace': {
    plaqueTitle: 'Tablet 44: A Dated Debt Record', plaqueType: 'object-manuscript-site-or-archaeological-context', articleTitle: 'Jacques Derrida',
    invitation: 'A Roman debt record makes writing’s material survival visible without turning an archaeological tablet into Derrida’s diagram or doctrine.',
    visualReading: 'A dark wooden tablet lies beside a stylus in a museum case. MOLA identifies tablet WT44 and its date of 8 January 57 CE; the original black wax is gone, and the reviewed record does not link the pictured stylus uniquely to this tablet.',
    claim: 'The transaction records Tibullus owing Gratus 105 denarii for delivered merchandise. A mark can outlast writer, addressee, and initial occasion, offering comparative material for iterability, while Derrida’s écriture extends beyond literal handwriting and cannot be derived from archaeology.',
    boundary: 'The accessible sources do not settle current ownership, accession, or the stylus association. Calling it the earliest dated handwritten British document is narrower than claiming the oldest commercial transaction in London, and neither label creates a historical Derrida connection.',
    guide: ['Identify WT44, 8 January 57 CE, lost wax, transaction, display setting, and uncertain stylus association.', 'Use the tablet for material comparison; source iterability and écriture from Derrida rather than archaeological survival alone.'],
    resolution: 'identified WT44 and the transaction, narrowed the earliest-document claim, and disclosed custody, wax, stylus, and Derrida-connection limits.',
  },
  'critical-theory-institute': {
    plaqueTitle: 'Institute for Social Research, Frankfurt', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Jürgen Habermas',
    invitation: 'A 2007 façade marks the Institute for Social Research while its founding, exile, return, and internal disagreements require a longer chronology.',
    visualReading: 'The photograph records the low building, trees, street, and address at Senckenberganlage 26. It is neither the original 1920s home nor a picture of exile, research practice, or a unified Frankfurt School gathered inside.',
    claim: 'The institute was founded in 1923, closed by the Nazis in 1933, continued in exile, returned to Frankfurt in 1949, was re-established as a private foundation in 1950, and inaugurated its new building in 1951. Its intellectual generations remained contested.',
    boundary: 'No architectural object record for the exact pictured structure was located beyond institutional and Commons histories. Habermas’s reconstructive work on reason, communication, law, and democracy revises first-generation Critical Theory rather than making him an uncontested heir to one doctrine.',
    guide: ['Separate the 2007 photograph from the 1923 foundation, 1933 closure, exile, return, and 1951 building.', 'Treat Critical Theory as changing interdisciplinary research and disagreement, not one doctrine embodied by a façade.'],
    resolution: 'corrected the return and re-establishment chronology, added the institute history, and bounded building identity and generational succession.',
  },
  'habermas-coffeehouse-public-sphere': {
    plaqueTitle: 'The Coffee-House', plaqueType: 'reception-or-transmission-history', articleTitle: 'Jürgen Habermas',
    invitation: 'A satirical 1781 print tests the public-sphere model against representation, access, exclusion, and the difference between historical ideal and social practice.',
    visualReading: 'Men converse, eat, drink, gesture, and observe within a densely staged comic interior. The print’s satire, selected figures, and artistic conventions prevent it from functioning as neutral documentation of a typical coffee house or rational debate.',
    claim: 'Habermas reconstructs a bourgeois public sphere across print, sociability, commerce, and political discussion while also treating its ideals and transformations critically. Later scholarship emphasizes gender, property, labor, race, empire, counterpublics, and inequalities that the original model underdescribed.',
    boundary: 'The British Museum identifies the print after Bunbury, published by Dickinson on 15 October 1781, and John Wilkes among its figures. The image alone cannot establish entry rules, inclusion, conversation content, political effect, or the normative conditions of democratic legitimacy.',
    guide: ['Read title, satire, maker roles, publication date, object number, and selected scene before generalizing.', 'Compare historical coffee-house claims with exclusion and counterpublic critiques; do not turn sociability into proof of legitimacy.'],
    resolution: 'corrected the severe horizontal distortion, added the British Museum record, and separated satire, social history, public-sphere reconstruction, and critique.',
  },
  'habermas-parliament-deliberation': {
    plaqueTitle: 'Bundestag Chamber from the Reichstag Dome', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Jürgen Habermas',
    invitation: 'A view from the public dome makes observation and representation visible without mistaking glass, access, or sightline for democratic legitimacy.',
    visualReading: 'The 2009 camera looks through the Reichstag dome toward the blue-seated plenary chamber. Public viewpoint, architecture, distance, and transparency are visible; equal political voice, reason-giving, agenda control, opposition, and accountability are not.',
    claim: 'Habermas distinguishes formal lawmaking institutions from informal public communication and asks how reasons circulate between them. Legitimate law requires more than visibility: rights, participation, information, contestation, institutional procedure, and protection from strategic domination remain necessary.',
    boundary: 'The Bundestag records the dome’s public access and the renewed building’s 1999 opening, ten years before this photograph. A reciprocal sightline is not reciprocal power, and architecture cannot establish whether actual deliberation includes affected people or produces justified outcomes.',
    guide: ['Separate the 1999 architectural opening from Bukowski’s 2009 photograph and its licensed viewpoint.', 'Use the view to ask about formal and informal publics; test legitimacy through rights, participation, reasons, and contestation.'],
    resolution: 'added Bundestag architectural history and bounded transparency, reciprocal sightline, public access, deliberation, and legitimacy claims.',
  },
  'critical-theory-radio-culture-industry': {
    plaqueTitle: 'Model 326 Radio Receiver', plaqueType: 'object-manuscript-site-or-archaeological-context', articleTitle: 'Jürgen Habermas',
    invitation: 'A specific 1935/36 receiver materializes one-to-many broadcast without deciding what programs, owners, institutions, or listeners did with it.',
    visualReading: 'Wooden cabinet, speaker cloth, tuning dial, and controls identify a domestic receiver form. Commons names Dr. Georg Seibt AG and Model 326, while the 2015 photograph and museum location are separate from the object’s 1935/36 manufacture.',
    claim: 'Culture-industry critique analyzes standardization, commodity form, concentration, and managed reception, but an apparatus alone does not prove passive audiences. Broadcast infrastructure, ownership, programming, household practice, resistance, and later networked platforms require distinct evidence and comparison.',
    boundary: 'The model and maker come from the Commons source description; no museum accession, exact production record, ownership history, or household use was located. The receiver is not evidence that all mass culture is identical or that radio and digital platforms share one structure.',
    guide: ['Name maker, Model 326, 1935/36 object date, photographers, 2015 date, and missing accession.', 'Distinguish apparatus, broadcasting institutions, programming, commodity form, and active reception before comparing later media.'],
    resolution: 'restored maker and model identity, retained provenance limits, and bounded apparatus, audience, broadcasting regime, culture industry, and platform analogy.',
    additionalSources: [source('Museum Foundation Post and Telecommunication — collection framework', 'https://www.mfk-frankfurt.de/wp-content/uploads/MSPT-Sammlungskonzept-Sammlungsgebiete-Sammlungsstatistik-2020.pdf', 'collection-record')],
  },
  'critical-theory-adorno-memorial': {
    plaqueTitle: 'Adorno Memorial', plaqueType: 'reception-or-transmission-history', articleTitle: 'Jürgen Habermas',
    invitation: 'Zakharov’s public artwork reconstructs a thinker’s workspace as memorial, enclosure, citation, and contested inheritance rather than preserving Adorno’s office.',
    visualReading: 'Desk, chair, lamp, papers, open book, and metronome sit inside a transparent glass cube. The city identifies the open volume as Negative Dialectics and the metronome as working; none of the furniture becomes Adorno’s original property through resemblance.',
    claim: 'The memorial was inaugurated in 2003 and stages a public afterlife for Adorno’s work. Habermas inherits and revises first-generation Critical Theory through disagreement about reason, communication, modernity, and democracy rather than a simple succession sealed by commemoration.',
    boundary: 'This is Vadim Zakharov’s constructed installation, not a preserved office or direct evidence of Adorno’s writing practice. Canonization, access, enclosure, and lineage remain curatorial questions, and no claim about Habermas follows from the memorial’s objects alone.',
    guide: ['Identify the 2003 artwork, named artist, glass enclosure, book, metronome, and 2010 photograph.', 'Treat commemoration as contested reception; compare Adorno and Habermas through their arguments rather than a staged desk.'],
    resolution: 'added the city object record and exact contents while separating artwork, office, commemoration, canonization, and Habermas succession.',
  },
  'ethics-confucian-ritual-practice': {
    plaqueTitle: 'Apricot Platform, Qufu', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Ethics',
    invitation: 'A later commemorative pavilion opens a question about ritual formation without claiming to preserve Confucius’s classroom or one timeless Confucian ethic.',
    visualReading: 'The 2005 photograph records an ornate pavilion on a raised platform within the Qufu temple complex. UNESCO documents repeated destruction and reconstruction, while the exact phase and historical function of this particular structure remain unresolved.',
    claim: 'Confucian ethics links li, or ritual practice, with ren, humane responsiveness, cultivated judgment, family and civic roles, and moral learning. Confucius, Mencius, Xunzi, and later traditions disagree about human tendencies, education, hierarchy, government, and metaphysics.',
    boundary: 'A commemorative site is not proof that Confucius taught here or that practice passed unchanged from antiquity. Ritual can educate perception and sustain memory while also reproducing humiliation, hierarchy, and exclusion; its ethical value remains open to correction and internal argument.',
    guide: ['Distinguish the 2005 photograph, reconstructed memorial complex, specific pavilion, and unresolved construction phase.', 'Interpret li with ren, cultivation, role, hierarchy, and internal disagreement instead of reducing Confucian ethics to ceremony.'],
    resolution: 'added UNESCO history, bounded the teaching-site claim, and separated reconstructed commemoration, ritual formation, hierarchy, and diverse Confucian traditions.',
    additionalSources: [source('Stanford Encyclopedia of Philosophy — Chinese Ethics', 'https://plato.stanford.edu/entries/ethics-chinese/', 'academic-reference')],
  },
  'ethics-jain-nonviolence-practice': {
    plaqueTitle: 'Jain Charity Birds Hospital, Chandni Chowk', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Ethics',
    invitation: 'A signed hospital entrance locates one Jain-associated care institution without claiming to show treatment or represent every practice of ahimsa.',
    visualReading: 'The photograph shows an interior entrance, Charity Birds Hospital signage, a mural, a person, and a small cage or collection box. It does not show a courtyard of stacked enclosures, feeding equipment, treatment, or attendants caring for injured birds.',
    claim: 'Jain ethics places ahimsa within vows, attention, diet, possession, truthfulness, karma, and liberation, with different demands for mendicants and householders. Digambara and Śvetāmbara traditions are not interchangeable, and one Delhi institution offers only a local contemporary case.',
    boundary: 'The accessible sources establish location and Jain association but not governance, founding date, capacity, clinical procedure, animal outcomes, labor, cost, or ecological effect. Care may involve intervention and confinement, so nonviolence intensifies practical conflict rather than automatically resolving it.',
    guide: ['Describe the signed entrance and visible details; do not invent enclosures, treatment, attendants, outcomes, or costs.', 'Use Jain sources for ahimsa, jīva, vows, sectarian difference, unavoidable harm, and care beyond one institution.'],
    resolution: 'replaced the materially inaccurate alt and care scene, made the caption factual, and disclosed governance, practice, outcome, and representativeness limits.',
    additionalSources: [source('Delhi Tourism — Old Delhi heritage walk', 'https://delhitourism.gov.in/pdf/Small-walk.pdf', 'collection-record')],
  },
  'ethics-buddhist-discipline-compassion': {
    plaqueTitle: 'Elephants and Dharmachakra, Sanchi Stupa No. 2', plaqueType: 'object-manuscript-site-or-archaeological-context', articleTitle: 'Ethics',
    invitation: 'An ancient relief marks one Buddhist visual tradition while withholding its precise date, patron, position, and any claim to summarize Buddhist ethics.',
    visualReading: 'Two elephants appear beneath and beside a wheel amid carved ornament. The file identifies Sanchi Stupa No. 2 but supplies no exact archaeological phase, component, accession, patron, or commissioned interpretation for this relief.',
    claim: 'Buddhist ethical traditions connect intention, conduct, precepts, monastic and lay discipline, karma, compassion, wisdom, and liberation in different ways. A dharmachakra conventionally evokes teaching, but one motif neither encodes a complete doctrine nor erases school and regional diversity.',
    boundary: 'The relief is primary material evidence for ancient Buddhist visual culture, not a portrait of the Buddha or proof of one philosophical interpretation. Precise dating and iconography require archaeological support; no-self and compassion must not be forced into Western theory labels or read directly from stone.',
    guide: ['Keep the exact relief location, visible elephants and wheel, photographer, and missing archaeological particulars explicit.', 'Use Buddhist texts and scholarship for intention, precepts, discipline, compassion, karma, no-self, and tradition-level differences.'],
    resolution: 'corrected the alt, added UNESCO context, and disclosed missing archaeological date, phase, position, accession, patronage, and doctrinal evidence.',
  },
  'ethics-care-attention-practice': {
    plaqueTitle: 'The Child’s Bath', plaqueType: 'reception-or-transmission-history', articleTitle: 'Ethics',
    invitation: 'Cassatt’s 1893 painting makes dependency and attentive labor available for later reflection without becoming evidence for modern care ethics.',
    visualReading: 'An adult steadies a child and washes the child’s feet in a patterned basin. Composition, touch, angle, domestic setting, and patterned surfaces are Cassatt’s artistic construction, not transparent documentation of one household or every care relationship.',
    claim: 'Late-twentieth-century care ethics foregrounds relationship, dependency, attention, responsiveness, emotion, practice, and the perspectives of care receivers. Feminist criticism also examines paid and unpaid labor, gender assignment, race, class, institutions, boundaries, justice, and unequal vulnerability.',
    boundary: 'The Art Institute records the 1893 work, accession 1910.2, Robert A. Waller Fund, provenance, and public-domain/CC0 access. No direct Cassatt–care-ethics connection exists, and the painting cannot naturalize women’s care work or establish consent, identity, or lived experience.',
    guide: ['Identify Cassatt’s object, provenance, representation, and artistic choices before applying a later ethical vocabulary.', 'Join attention and dependency to justice, labor, power, boundaries, agency, and the care receiver’s perspective.'],
    resolution: 'added the Art Institute record, provenance and rights, and separated artistic representation from later care-ethics interpretation and gendered duty.',
  },
  'ethics-labor-social-position': {
    plaqueTitle: 'The Gleaners', plaqueType: 'reception-or-transmission-history', articleTitle: 'Ethics',
    invitation: 'Millet’s 1857 painting asks how moral judgment changes when land, labor, property, and scarcity already distribute possibilities unequally.',
    visualReading: 'Three women bend in the foreground while harvest stacks, carts, workers, and a mounted figure occupy the distance. The museum discusses authorized evening gleaning, but the image itself does not identify a documented overseer or supply the workers’ testimony.',
    claim: 'Ethical assessment depends not only on isolated choices but on social position, resource distribution, property rules, labor relations, vulnerability, and available alternatives. Distributive justice asks which inequalities need justification and how institutions shape responsibility and opportunity.',
    boundary: 'The Musée d’Orsay records Salon display and provenance ending in Mme Pommery’s 1890 donation. The painting remains artistic primary evidence for Millet’s representation, not neutral labor documentation or proof of every local gleaning custom, law, worker experience, or moral conclusion.',
    guide: ['Describe composition, 1857 object history, authorized gleaning context, and the unknown role of the mounted figure.', 'Distinguish represented workers from testimony; source property, labor, scarcity, and distributive claims through social history and ethics.'],
    resolution: 'added the Musée d’Orsay record and provenance, corrected the overseer inference, and separated representation, testimony, social history, and distributive ethics.',
    additionalSources: [source('Stanford Encyclopedia of Philosophy — Distributive Justice', 'https://plato.stanford.edu/entries/justice-distributive/', 'academic-reference')],
  },
  'virtue-practice-habituation': {
    plaqueTitle: 'Panathenaic Prize Amphora with Foot-Race', plaqueType: 'object-manuscript-site-or-archaeological-context', articleTitle: 'Virtue Ethics',
    invitation: 'A prize amphora joins training, excellence, and public judgment while leaving moral virtue, practical wisdom, and ancient exclusions to separate evidence.',
    visualReading: 'Four black-figure runners move around the curved vessel. The British Museum identifies an Attic Panathenaic prize amphora attributed to the Euphiletos Painter, c. 530–520 BCE, with findspot, purchase, and accession history.',
    claim: 'Aristotle argues that repeated action helps form dispositions, but virtue also requires practical wisdom, right perception, feeling, choice, and a conception of flourishing. Athletic practice is a useful analogy for cultivated capacity, not an identity between winning and moral excellence.',
    boundary: 'The vessel is primary evidence for a prize object and foot-race imagery, not Aristotle’s ethical theory, one contest’s rules, or every participant’s status. Claims about gender, citizenship, slavery, exemplars, and civic ideals require historical sources beyond the object.',
    guide: ['Identify maker attribution, date, prize function, findspot, accession, photographed side, and visible runners.', 'Use Aristotle for habituation and phronēsis; keep athletic analogy, civic ideals, competition, and ancient exclusions distinct.'],
    resolution: 'added the British Museum record and provenance while separating material evidence, athletic analogy, habituation, practical wisdom, and exclusion claims.',
    additionalSources: [source('Aristotle, Nicomachean Ethics II — Perseus', 'https://www.perseus.tufts.edu/hopper/text?doc=Aristot.+Nic.+Eth.+2.1', 'primary-text')],
  },
  'murdoch-kestrel-unselfing': {
    plaqueTitle: 'Common Kestrel in Flight at Pfyn-Finges', plaqueType: 'reception-or-transmission-history', articleTitle: 'Iris Murdoch',
    invitation: 'A modern wildlife photograph accompanies Murdoch’s kestrel example without depicting her encounter or turning an animal into proof of unselfing.',
    visualReading: 'A wild common kestrel flies in profile with wings extended against a soft gray background. The frame records Laurent’s 2022 photograph at Pfyn-Finges; it does not visibly show hovering and the location is not a holding institution.',
    claim: 'Murdoch describes attention as a disciplined redirection from consoling fantasy toward independent reality and the Good. Her kestrel example concerns an interruption of self-absorbed consciousness, but the moral value of attention requires philosophical argument rather than an attractive bird image.',
    boundary: 'This is not Murdoch’s kestrel, an image she selected, or evidence that aesthetic attention produces virtue. The animal remains an agent outside the anecdote, while criticisms concerning institutions, social structure, power, and the conditions of attention require named scholarship rather than assertion.',
    guide: ['Identify Laurent’s flying kestrel, date, location, license, and lack of historical Murdoch connection.', 'Read Murdoch for attention, fantasy, unselfing, and the Good; keep animal independence and social criticism present.'],
    resolution: 'corrected hovering and institution implications, made the caption factual, and separated modern illustration, Murdoch’s episode, animal agency, and moral proof.',
  },
  'foot-natural-goodness': {
    plaqueTitle: 'Japanese Oak Branch with Acorns', plaqueType: 'object-manuscript-site-or-archaeological-context', articleTitle: 'Philippa Foot',
    invitation: 'An unattributed botanical watercolor asks how life-form judgments work while refusing an unsupported artist identity or a direct moral law from nature.',
    visualReading: 'Green leaves and clustered acorns appear on a carefully rendered oak branch. Wellcome supplies the title and identifiers but neither maker nor date, so the plant’s geographic name cannot be converted into the artist’s nationality.',
    claim: 'Foot argues that natural-historical judgments about characteristic functioning can illuminate evaluations of living things and human virtue. Human practical reason, culture, agency, and social life make this more than statistical normality or the uncritical transfer of a plant’s functions to persons.',
    boundary: 'The watercolor is primary evidence for an archived botanical representation, not Foot’s diagram or proof of a human life-form. Maker, date, deeper provenance, and taxonomic certainty beyond the catalog title remain unresolved; disability and exclusion objections require careful engagement rather than biological shorthand.',
    guide: ['Use “creator not stated,” “date unknown,” Wellcome identifiers, catalog title, and exact file license.', 'Distinguish characteristic function, statistical frequency, practical reason, culture, disability critique, and moral naturalism.'],
    resolution: 'removed the unsupported Japanese-artist attribution, added Wellcome’s record, retained unknown date and provenance, and bounded botanical and moral inference.',
    additionalSources: [source('Stanford Encyclopedia of Philosophy — Moral Naturalism', 'https://plato.stanford.edu/entries/naturalism-moral/', 'academic-reference')],
  },
  'duty-kant-autonomy': {
    plaqueTitle: 'Kant Monument, Kaliningrad', plaqueType: 'reception-or-transmission-history', articleTitle: 'Deontology',
    invitation: 'A 1992 reconstruction separates Kant’s civic afterlife from the rational self-legislation he called autonomy and from deontology’s wider history.',
    visualReading: 'The bronze standing figure rises on a stone pedestal among trees in a 2015 photograph. Haacke reconstructed Rauch’s monument in 1992; it is a later memorial image rather than a lifetime likeness or the lost original.',
    claim: 'Kantian autonomy concerns acting on rational principles one can will as law, not personal preference or absence of constraint. The categorical imperative’s formulations, dignity, duties, and disputes must be established from Kant and scholarship, while deontology extends beyond Kant.',
    boundary: 'Rauch’s statue was completed or cast in 1857 and installed or unveiled in Königsberg in 1864; it has been missing since 1945. The replica cannot establish moral universality, and Kant’s racist writings and contested reception remain necessary critical context.',
    guide: ['Distinguish Rauch’s 1857 completion, 1864 installation, disappearance after 1945, Haacke’s 1992 replica, and 2015 photograph.', 'Read maxims, autonomy, universal law, humanity, dignity, and critical reception through texts rather than commemoration.'],
    resolution: 'reconciled 1857 completion with 1864 installation, clarified reconstruction and disappearance, and separated memorial reception, Kantian autonomy, and wider deontology.',
    additionalSources: [source('Kant, Groundwork of the Metaphysics of Morals — Project Gutenberg', 'https://www.gutenberg.org/ebooks/5682', 'primary-text')],
  },
  'utility-bentham-reform': {
    plaqueTitle: 'Elevation Plan of the Houses of Inspection', plaqueType: 'work-or-text', articleTitle: 'Utilitarianism',
    invitation: 'A contemporaneous design makes Bentham’s reform architecture inspectable without converting proposal into building, outcome, or the definition of utility.',
    visualReading: 'The elevation cuts through stacked cells, stairs, service spaces, and a central inspection structure. UCL identifies Willey Reveley, c. 1791, and Bentham Papers 119a/121; it remains a drawing for an unrealized project.',
    claim: 'Bentham proposed an inspection principle intended to permit observation with fewer inspectors and linked it to reform, labor, and economy. Those are programmatic aims, not demonstrated results, and utilitarian evaluation must include confinement, error, coercion, unequal exposure, and unintended effects.',
    boundary: 'The plan is strong primary evidence for proposed architecture but cannot prove construction, surveillance efficacy, cost reduction, welfare, or legitimacy. The underlying drawing is public domain, yet a direct UCL rights statement for the exact installed derivative was not located.',
    guide: ['Identify Reveley, Bentham, folios, c. 1791 date, elevation, unrealized status, and reuse uncertainty.', 'Separate proposed inspection and reform aims from actual outcomes, coercive power, and utilitarianism’s broader arguments.'],
    resolution: 'added UCL identifiers and unrealized status, clarified rights limits, and separated design evidence, programmatic aims, outcomes, coercion, and utilitarianism.',
    additionalSources: [
      source('Bentham, Panopticon and collected works — Online Library of Liberty', 'https://oll.libertyfund.org/titles/bentham-works-of-jeremy-bentham-11-vols', 'primary-text'),
      source('Stanford Encyclopedia of Philosophy — Jeremy Bentham', 'https://plato.stanford.edu/entries/bentham/', 'academic-reference'),
    ],
  },
  'utility-equality-inclusion': {
    plaqueTitle: 'Signing the Equal Pay Act', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Utilitarianism',
    invitation: 'A law’s public signing begins rather than completes the work of asking whose welfare counts and how institutions distribute power and opportunity.',
    visualReading: 'Kennedy signs a document at an Oval Office desk surrounded by advocates, legislators, and officials. NARA identifies Cecil Stoughton, 10 June 1963, NARA 12000179, and image ST-304-6-63; the photograph records one event, not enforcement.',
    claim: 'The Equal Pay Act addressed sex-based wage differentials within a limited statutory scope. Utilitarian concern for each affected person and diminishing marginal utility can support attention to inequality, but aggregate welfare alone does not settle distribution, rights, voice, or institutional power.',
    boundary: 'NARA’s rights status is No Copyright—United States, so worldwide public-domain status is not asserted. The photograph cannot prove the Act’s adequacy, participant beliefs, enforcement, amendments, later outcomes, or a causal line from Mill’s equality arguments to this law.',
    guide: ['Identify Stoughton, office, date, NARA and image numbers, signing event, and U.S.-scoped rights status.', 'Separate statute, coverage, enforcement, outcomes, welfare aggregation, distribution, equality, rights, and voice.'],
    resolution: 'restored Cecil Stoughton, added NARA identifiers and U.S. rights scope, and bounded statutory, enforcement, outcome, and utilitarian claims.',
    additionalSources: [
      source('JFK Library — civil-rights legislative summary', 'https://www.jfklibrary.org/archives/other-resources/legislative-summary/civil-rights', 'collection-record'),
      source('Mill, The Subjection of Women — Online Library of Liberty', 'https://oll.libertyfund.org/titles/mill-the-subjection-of-women-1878-ed', 'primary-text'),
    ],
  },
  'utility-public-health-welfare': {
    plaqueTitle: 'Edward Jenner Vaccinating a Boy', plaqueType: 'reception-or-transmission-history', articleTitle: 'Utilitarianism',
    invitation: 'An 1884 history painting asks what disappears when population benefit is pictured as a simple heroic medical encounter.',
    visualReading: 'Jenner tends a seated boy’s arm while adults and children watch in a domestic interior. The represented affect and patient identity remain unverified; this is Hillemacher’s later artistic reconstruction, not eyewitness documentation of an early vaccination.',
    claim: 'Public-health ethics weighs benefit and harm alongside evidence, consent, liberty, trust, authority, distribution, access, uncertainty, and institutional history. Population outcomes matter, but neither utilitarianism nor vaccination policy reduces responsibly to one aggregate number or heroic scene.',
    boundary: 'The installed Commons record offers CC BY 4.0, while Wellcome’s live record marks Public Domain; both are disclosed. The painting cannot verify James Phipps, Sarah Nelmes, global knowledge routes, coercive campaigns, modern vaccine efficacy, or a triumphal historical narrative.',
    guide: ['Identify Hillemacher, 1884, Wellcome references, later history painting, unknown patient, and conflicting rights records.', 'Distinguish benefit, risk, consent, trust, liberty, evidence, distribution, historical context, and present policy.'],
    resolution: 'added Wellcome’s current record and rights conflict, removed emotional and patient inference, and separated later painting, medical history, public-health ethics, and utility.',
    additionalSources: [source('Stanford Encyclopedia of Philosophy — Public Health Ethics', 'https://plato.stanford.edu/entries/publichealth-ethics/', 'academic-reference')],
  },
  'thomson-violinist-bodily-rights': {
    plaqueTitle: 'Portrait of a Violinist', plaqueType: 'reception-or-transmission-history', articleTitle: 'Judith Jarvis Thomson',
    invitation: 'An eighteenth-century portrait gives a violinist visual presence while explicitly not depicting Thomson’s coercive medical thought experiment.',
    visualReading: 'A seated woman in a rose-colored dress holds a violin, bow, and open score. Nationalmuseum identifies Vallayer-Coster, 1773, NM 7297, and 2015 acquisition; the sitter is only tentatively associated with one of the artist’s sisters.',
    claim: 'Thomson’s imagined unconscious violinist tests whether a right to life entails a right to use another person’s body. The argument grants a premise for analysis and distinguishes rights from every demand of decency; its application and analogies remain disputed.',
    boundary: 'The painting has no historical connection to Thomson, abortion, bodily attachment, illness, consent, or the 1971 essay. It establishes an art object only, while pregnancy, responsibility, dependency, Samaritan duties, and disanalogies require philosophical and lived evidence beyond a violin motif.',
    guide: ['Identify the Nationalmuseum object, tentative sitter, acquisition, and complete absence of a Thomson connection.', 'Read the conditional rights argument, consent, bodily support, Samaritan duty, and objections without treating the portrait as evidence.'],
    resolution: 'added the Nationalmuseum record and sitter qualification while separating artwork, later illustration, thought experiment, rights argument, and disputed analogy.',
    additionalSources: [
      source('Judith Jarvis Thomson, “A Defense of Abortion”', 'https://doi.org/10.2307/2265091', 'primary-text'),
      source('Stanford Encyclopedia of Philosophy — The Ethics of Abortion', 'https://plato.stanford.edu/entries/abortion/', 'academic-reference'),
    ],
  },
  'thomson-bodily-autonomy-context': {
    plaqueTitle: 'Women’s Liberation March, Washington, D.C.', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Judith Jarvis Thomson',
    invitation: 'A 1970 march supplies nearby political context for bodily-rights arguments without turning a movement into evidence for Thomson’s conclusion.',
    visualReading: 'A dense procession carries equality and liberation signs through Washington. The Library of Congress identifies a march from Farragut Square to Lafayette Park on 26 August 1970, photographer Warren K. Leffler, and ppmsca.03425.',
    claim: 'Thomson’s essay appeared in 1971 amid public struggles over sex equality, reproduction, authority, and rights. Temporal proximity is historically relevant, but analytic argument, movement claims, legislation, personal testimony, and later reproductive-justice frameworks remain different forms of evidence.',
    boundary: 'The photograph does not establish every participant’s identity, view, organization, placard wording, or relation to abortion politics. The march neither commissioned nor demonstrably caused Thomson’s paper, and no single philosopher can represent a movement divided by race, class, sexuality, strategy, and priority.',
    guide: ['Use the LOC title, route, date, photographer, collection, and rights statement without assigning beliefs.', 'Separate temporal context, movement history, bodily autonomy, rights analysis, testimony, and reproductive-justice reception.'],
    resolution: 'adopted the factual LOC event title and record, preserved rights, and bounded participant beliefs, causation, movement representation, and Thomson connection.',
    additionalSources: [
      source('Judith Jarvis Thomson, “A Defense of Abortion”', 'https://doi.org/10.2307/2265091', 'primary-text'),
      source('Stanford Encyclopedia of Philosophy — Rights', 'https://plato.stanford.edu/entries/rights/', 'academic-reference'),
    ],
  },
  'parfit-psychological-continuity': {
    plaqueTitle: 'Movements in Pole Vaulting', plaqueType: 'reception-or-transmission-history', articleTitle: 'Derek Parfit',
    invitation: 'Marey’s motion study makes a bodily sequence visible while Parfit asks why psychological survival need not equal one unbroken numerical identity.',
    visualReading: 'Successive dark phases of a pole vault overlap across one field from approach through airborne movement and descent. MFAH identifies a c. 1890 gelatin-silver print, accession 2004.586, collection history, and provenance.',
    claim: 'Parfit distinguishes psychological connectedness from continuity and argues that identity may not be what fundamentally matters in survival. Branching cases pressure one-one identity, but a photographic trajectory cannot decide memory, intention, character, causation, responsibility, or reductionism.',
    boundary: 'Marey’s study predates Parfit and is neither his diagram nor evidence for Relation R. Its staged motion analysis concerns one body under a photographic method; rival bodily, animalist, narrative, and practical accounts of identity remain philosophical alternatives rather than visual phases.',
    guide: ['Identify Marey’s c. 1890 MFAH print, method, accession, provenance, and visibly superimposed phases.', 'Distinguish connectedness, continuity, numerical identity, Relation R, reductionism, branching, and rival accounts.'],
    resolution: 'adopted MFAH’s c. 1890 date and accession, added provenance, and separated chronophotographic sequence, psychological continuity, identity, and branching.',
    additionalSources: [source('Stanford Encyclopedia of Philosophy — Personal Identity and Ethics', 'https://plato.stanford.edu/entries/identity-ethics/', 'academic-reference')],
  },
  'parfit-future-generations': {
    plaqueTitle: 'Entrance to the Svalbard Global Seed Vault', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Derek Parfit',
    invitation: 'A seed vault makes long-term stewardship visible while Parfit asks how present choices can affect future people whose identities depend on those choices.',
    visualReading: 'An illuminated angular entrance projects from a snowy mountainside beneath a blue sky in 2015. The photograph records an exterior threshold, not the stored collections, depositors, refrigeration systems, governance decisions, or future use.',
    claim: 'The vault stores depositor-controlled duplicate samples under black-box arrangements and has received climate-resilience upgrades. Parfit’s non-identity problem asks how a choice can be worse for future people when different choices would have produced different people; preservation does not solve that argument.',
    boundary: 'The image cannot establish which crops are stored, whose knowledge shaped collection, who benefits, or whether the vault solves food security, climate vulnerability, and population ethics. Official records distinguish deposit ownership and institutional roles from an imagined central authority selecting every seed.',
    guide: ['Identify photographer, 2015 exterior, duplication, depositor ownership, black-box storage, and official governance roles.', 'Separate intergenerational stewardship, non-identity, future persons, crop diversity, climate risk, access, and present justice.'],
    resolution: 'added official operating and depositor boundaries while separating exterior photograph, vault governance, seed custody, non-identity, and food-security claims.',
    additionalSources: [
      source('Svalbard Global Seed Vault — depositor conditions', 'https://www.seedvault.no/depositors/', 'collection-record'),
      source('Stanford Encyclopedia of Philosophy — Intergenerational Justice', 'https://plato.stanford.edu/entries/justice-intergenerational/', 'academic-reference'),
    ],
  },
};

const reviewMethod = 'Galleries 22–23 supplemental review: exactly three concurrent GPT-5.6 Terra/High read-only evidence scopes of twelve, twelve, and twelve non-overlapping exhibits were reconciled by the Sol parent against the assembled runtime registry and installed bytes across identity, attribution, date, institution, provenance, rights, caption, alt text, natural ratio, primary evidence, later reception, reproduction, interpretive imagery, unresolved evidence, three claim-mapped object-led paragraphs, factual two-level plaques, subject-specific guidance, canonical relationships, exact article actions, current review locks, and desktop, mobile, and fresh staged-3D presentation.';

const visualReview = (id: string): NonNullable<NonNullable<MuseumSupplementalExhibit['review']>['visualReview']> => ({
  desktop: {reviewedOn: '2026-08-21', viewport: '1440×900', evidence: `Direct route inspected with the full aspect-safe object preview, three untitled sourced paragraphs, subject-specific evidence guide, factual plaque relationship, exact article action, and no horizontal overflow. Evidence: docs/visual-validation/gallery-22-23-supplementals/desktop/${id}.png`},
  mobile: {reviewedOn: '2026-08-21', viewport: '390×844', evidence: `Direct route inspected with a wrapped factual title, aspect-safe object preview, scrollable interpretation, complete controls, and no horizontal overflow. Evidence: docs/visual-validation/gallery-22-23-supplementals/mobile/${id}.png`},
  threeDimensional: {reviewedOn: '2026-08-21', viewport: '1280×720 fresh direct-route session', evidence: `Fresh direct-route session verified direct target activation, close/resume, the sole intended proximity card, and exact routed-target reopening without neighboring-card substitution. Evidence: docs/visual-validation/gallery-22-23-supplementals/staged-3d/${id}.png`},
});

const canonicalContext = (input: MuseumSupplementalExhibit): MuseumCanonicalContextRef => {
  if (input.articleRoute?.kind === 'philosopher') return {kind: 'philosopher', id: input.articleRoute.philosopherId};
  if (input.articleRoute?.kind === 'branch') return {kind: 'branch', id: input.articleRoute.branchId};
  throw new Error(`Gallery 22–23 supplemental exhibit ${input.id} lacks a canonical article route.`);
};

const reviewSupplementalExhibit = (galleryNumber: 22 | 23, input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => {
  const reviewed = evidence[input.id];
  if (!reviewed) throw new Error(`Missing Gallery ${galleryNumber} review evidence for ${input.id}.`);
  if (!input.presentation) throw new Error(`Missing Gallery ${galleryNumber} presentation for ${input.id}.`);
  const asset = getMuseumAsset(input.assetId);
  const objectSources: MuseumSupplementalInterpretationSource[] = [
    {id: 'object', label: `${asset.title} — installed source record`, url: asset.sourcePageUrl, kind: 'collection-record'},
    ...(asset.objectPageUrl && asset.objectPageUrl !== asset.sourcePageUrl
      ? [{id: 'holding', label: `${asset.institution} — object or institutional record`, url: asset.objectPageUrl, kind: 'collection-record'} as const]
      : []),
  ];
  const objectSourceUrls = new Set(objectSources.map(({url}) => url));
  const supplementary = [...input.sources, ...(reviewed.additionalSources ?? [])]
    .filter(({url}, index, items) => !objectSourceUrls.has(url) && items.findIndex((item) => item.url === url) === index);
  const claimSources: MuseumSupplementalInterpretationSource[] = supplementary.map((item, index) => ({...item, id: `claim-${index + 1}`}));
  const sources = [...objectSources, ...claimSources];
  const objectIds = objectSources.flatMap((item) => item.id ? [item.id] : []);
  const claimIds = claimSources.flatMap((item) => item.id ? [item.id] : []);
  const allSourceIds = [...objectIds, ...claimIds];
  const objectInterpretation = `${asset.attribution} Recorded institution or provenance: ${asset.institution}. Rights: ${asset.license}. ${asset.historicalNote}`;
  const dateLabel = `${asset.creator} · ${asset.objectDate} · ${asset.institution} · ${asset.license}`;
  const structuralFactRows = input.presentation.factRows.filter(({label}) => label === 'Museum status');
  return {
    ...input,
    dateLabel,
    lead: reviewed.invitation,
    sections: [
      {heading: '', paragraphs: [`${objectInterpretation} ${reviewed.visualReading}`], sourceIds: allSourceIds},
      {heading: '', paragraphs: [`${reviewed.claim} ${input.keyIdeas[1]}`], sourceIds: allSourceIds},
      {heading: '', paragraphs: [`${reviewed.boundary} ${input.keyIdeas[2]} ${input.cautions.join(' ')}`], sourceIds: allSourceIds},
    ],
    sources,
    visitorGuide: [
      {heading: `${reviewed.plaqueTitle}: object evidence`, items: [
        {label: 'Identity and date', description: `${asset.title}; ${asset.creator}; ${asset.objectDate}.`, sourceIds: objectIds},
        {label: 'Custody and rights', description: `${asset.institution}. ${asset.license}.`, sourceIds: objectIds},
      ]},
      {heading: `${reviewed.articleTitle}: interpretive boundary`, items: [
        {label: 'Establish first', description: reviewed.guide[0], sourceIds: allSourceIds},
        {label: 'Carry forward', description: reviewed.guide[1], sourceIds: claimIds.length ? claimIds : objectIds},
      ]},
    ],
    objectInterpretation,
    presentation: {
      ...input.presentation,
      panelKicker: `Gallery ${galleryNumber} supplemental exhibit`,
      proximityKicker: reviewed.plaqueTitle,
      factRows: [
        ...structuralFactRows,
        {label: 'Object', value: reviewed.plaqueTitle},
        {label: 'Evidence', value: dateLabel},
        {label: 'Atlas route', value: reviewed.articleTitle},
      ],
      articleActionLabel: `Read the full sourced ${reviewed.articleTitle} article`,
      exhibitLayout: 'object-led',
    },
    wallPlaque: {
      type: reviewed.plaqueType,
      title: reviewed.plaqueTitle,
      invitation: reviewed.invitation,
      canonicalContexts: [canonicalContext(input)],
    },
    review: {
      status: 'standard-compliant',
      reviewedOn: '2026-08-21',
      method: reviewMethod,
      resolution: `Resolved: ${reviewed.resolution}`,
      lock: locks[input.id],
      visualReview: visualReview(input.id),
    },
  };
};

export const reviewCritiquePowerDeconstructionSupplementalExhibit = (input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => reviewSupplementalExhibit(22, input);
export const reviewMoralLifePracticalReasonSupplementalExhibit = (input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => reviewSupplementalExhibit(23, input);
