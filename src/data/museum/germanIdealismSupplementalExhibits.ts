import type {MuseumAssetId} from './museumAssetTypes';
import {
  authorSupplementalExhibit,
  authorSupplementalLayout,
} from './museumSupplementalAuthoring';
import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import {
  GERMAN_IDEALISM_GALLERY_ID,
  GERMAN_IDEALISM_ROOM_SIGN_COPY,
} from './germanIdealismGalleryCuration';
import type {GermanIdealismGalleryAssetId} from './germanIdealismGalleryAssets';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
  MuseumSupplementalInstallationKind,
} from './museumWorldTypes';

export {GERMAN_IDEALISM_GALLERY_ID, GERMAN_IDEALISM_ROOM_SIGN_COPY};

export const GERMAN_IDEALISM_PALETTE = Object.freeze({
  ink: '#343334',
  critiqueBlue: '#536d86',
  activityRed: '#985e54',
  natureGreen: '#587264',
  romanticViolet: '#77617f',
  dialecticGold: '#a57c45',
  archiveCharcoal: '#343334',
});

export type GermanIdealismSupplementalExhibitId =
  | 'idealism-jena-system-labor'
  | 'idealism-weimar-intellectual-world'
  | 'fichte-napoleonic-political-geography'
  | 'fichte-revolution-freedom'
  | 'nature-caroline-intellectual-network'
  | 'nature-romantic-beholder'
  | 'nature-goethe-color'
  | 'nature-galvani-living-force'
  | 'nature-voltaic-pile'
  | 'hegel-lecture-room'
  | 'hegel-napoleon-jena'
  | 'hegel-birthplace-stuttgart'
  | 'hegel-berlin-institution'
  | 'hegel-haiti-recognition-debate'
  | 'afterlives-holderlin'
  | 'afterlives-novalis'
  | 'afterlives-runge-morning'
  | 'afterlives-young-hegelians'
  | 'afterlives-feuerbach'
  | 'afterlives-strauss';

type GermanIdealismParent = 'german-idealism' | 'fichte' | 'schelling' | 'hegel';
type CuratedInput = {
  id: GermanIdealismSupplementalExhibitId;
  assetId: GermanIdealismGalleryAssetId;
  parent: GermanIdealismParent;
  displayName: string;
  shortTitle: string;
  focus: string;
  dateLabel: string;
  question: string;
  lead: string;
  ideas: readonly [string, string, string];
  sectionDetails: readonly [string, string, string];
  cautions: readonly [string, string];
  imageSource: string;
  academicSource?: {label: string; url: string};
};

const image = (url: string) => ({
  label: 'Wikimedia Commons — displayed object or image record',
  url,
  kind: 'collection-record' as const,
});
const academicByParent = {
  'german-idealism': {
    label: 'Stanford Encyclopedia of Philosophy — Idealism, including German Idealism',
    url: 'https://plato.stanford.edu/entries/idealism/',
    kind: 'academic-reference' as const,
  },
  fichte: {
    label: 'Stanford Encyclopedia of Philosophy — Johann Gottlieb Fichte',
    url: 'https://plato.stanford.edu/entries/johann-fichte/',
    kind: 'academic-reference' as const,
  },
  schelling: {
    label: 'Stanford Encyclopedia of Philosophy — Friedrich Wilhelm Joseph von Schelling',
    url: 'https://plato.stanford.edu/entries/schelling/',
    kind: 'academic-reference' as const,
  },
  hegel: {
    label: 'Stanford Encyclopedia of Philosophy — Georg Wilhelm Friedrich Hegel',
    url: 'https://plato.stanford.edu/entries/hegel/',
    kind: 'academic-reference' as const,
  },
};

const curated = (input: CuratedInput): MuseumSupplementalExhibit => {
  const isBranch = input.parent === 'german-idealism';
  return authorSupplementalExhibit({
    id: input.id as MuseumSupplementalExhibitId,
    assetId: input.assetId as MuseumAssetId,
    displayName: input.displayName,
    shortTitle: input.shortTitle,
    workLabel: input.focus,
    dateLabel: input.dateLabel,
    question: input.question,
    frontSubtitle: input.question,
    lead: input.lead,
    keyIdeas: input.ideas,
    cautions: input.cautions,
    sections: [
      {heading: 'Look closely', paragraph: `${input.ideas[0]} ${input.sectionDetails[0]}`},
      {heading: 'Historical argument', paragraph: `${input.ideas[1]} ${input.sectionDetails[1]}`},
      {heading: 'What remains at stake', paragraph: `${input.ideas[2]} ${input.sectionDetails[2]}`},
    ],
    sources: [
      image(input.imageSource),
      input.academicSource
        ? {...input.academicSource, kind: 'academic-reference' as const}
        : academicByParent[input.parent],
    ],
    articleRoute: isBranch
      ? {kind: 'branch', branchId: 'german-idealism'}
      : {kind: 'philosopher', philosopherId: input.parent},
    entityKind: isBranch ? 'branch' : 'philosopher',
    panelKicker: 'Gallery 19 work and context exhibit',
  });
};

export const GERMAN_IDEALISM_SUPPLEMENTAL_EXHIBITS = [
  curated({
    id: 'idealism-jena-system-labor',
    assetId: 'german-idealism-collegium-jenense',
    parent: 'fichte',
    displayName: 'Jena: Philosophy Becomes a Shared Institutional Project',
    shortTitle: 'The Jena Workshop',
    focus: 'JENA · LECTURES, JOURNALS, APPOINTMENTS, CONTROVERSY, AND REVISION',
    dateLabel: 'Fichte at Jena 1794–1799 · modern photograph of the Collegium Jenense',
    question: 'What becomes visible when a philosophical system is treated as work carried by institutions and arguments rather than a revelation inside one mind?',
    lead: 'The Collegium Jenense anchors German Idealism in classrooms, appointments, printers, correspondence, reviews, and controversy. Jena’s concentration of intellectual labor let new systems develop quickly—and made them vulnerable to institutional power.',
    ideas: [
      'A university building turns apparently solitary thought into a practice dependent on rooms, schedules, audiences, books, and patronage.',
      'Jena’s post-Kantian systems developed through close proximity and disagreement rather than a smooth relay from one master to the next.',
      'Institutions enable intellectual freedom while also deciding who may teach, publish, study, and survive a public dispute.',
    ],
    sectionDetails: [
      'The modern photograph shows long façades and an enclosed court, but no picture can recover the sound and social texture of a late eighteenth-century lecture. The building matters as infrastructure: philosophical arguments reached listeners through repeated oral presentations, circulated through print, and were revised in response to critics. Fichte’s Wissenschaftslehre itself appeared in many versions, making the university workshop part of the form of the project rather than incidental background.',
      'Fichte held his Jena professorship from 1794 until the atheism controversy and his departure in 1799. Schelling joined the university in 1798, and Hegel arrived in Jena in 1801. Their timelines overlap unevenly; each appropriated and criticized the others while working among Romantic writers and debates in natural science, theology, and politics. The result was not a settled school doctrine but competing attempts to rethink subject, object, nature, reason, and freedom after Kant.',
      'The same university that gathered arguments could discipline them. Fichte’s departure shows how theological accusation, government pressure, reputation, and employment entered a dispute about the moral world order. Looking at institutional conditions also reveals absences: access to chairs and recognized authorship was shaped by gender, class, confession, and patronage. Intellectual history becomes more accurate when systems remain philosophically demanding without being detached from the structures that sustained their authors.',
    ],
    cautions: [
      'The photograph is modern and does not show an unchanged 1790s campus.',
      'Jena’s proximity should not be converted into one unified doctrine or an inevitable sequence culminating in Hegel.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Collegium_Jenense_(Jena).jpg',
  }),
  curated({
    id: 'idealism-weimar-intellectual-world',
    assetId: 'german-idealism-weimar-musenhof',
    parent: 'german-idealism',
    displayName: 'Weimar Remembered: Literature, Court Culture, and Philosophy',
    shortTitle: 'The Weimar Intellectual World',
    focus: 'NETWORK · POETRY, THEATER, PATRONAGE, CONVERSATION, AND CULTURAL MEMORY',
    dateLabel: 'Theobald von Oer painting, 1860 · imagining an earlier Weimar gathering',
    question: 'How did philosophy take shape within a cultural landscape shared with poetry, theater, criticism, science, and courtly patronage?',
    lead: 'Von Oer’s carefully composed gathering turns Weimar into a remembered community of genius. Its very theatricality helps visitors distinguish the real importance of intellectual networks from the later myth of effortless collective greatness.',
    ideas: [
      'The staged gathering makes reading and listening social while signaling hierarchy through dress, placement, and attention.',
      'Weimar and nearby Jena connected philosophy to literary form, aesthetic judgment, natural inquiry, and institutions of patronage.',
      'Cultural memory can preserve networks while smoothing their disagreements, exclusions, labor, and changing alliances.',
    ],
    sectionDetails: [
      'Schiller reads while an attentive group is arranged across architecture, garden, and courtly costume. The scene gives ideas bodies and audiences, but its visual harmony is an artistic achievement made decades after the represented world. A visitor should ask who occupies the center, who listens, and whose work remains offstage. Conversation was real, yet the image converts many separate occasions and relationships into a legible cultural tableau.',
      'German Idealism developed beside Goethe’s and Schiller’s writing, early Romantic criticism, debates over tragedy and the novel, and new approaches to organism and color. These were not decorative accompaniments to metaphysics. Kant, Schelling, and Hegel each gave art a role in thinking how freedom and intelligible form appear sensibly, while Romantic writers tested what systematic prose could not contain. Influence moved through reading, friendship, rivalry, editing, appointments, and institutions rather than one shared manifesto.',
      'Later commemoration often presents Weimar Classicism as a stable national inheritance. That framing can clarify why these figures became canonical while concealing the retrospective work needed to make a canon. The useful question is not whether the gathering happened exactly as painted, but how a culture chooses images of intellectual community. The painting invites both appreciation of interdisciplinary exchange and criticism of the social boundaries within which recognized culture was produced.',
    ],
    cautions: [
      'Von Oer painted this scene retrospectively; it is not eyewitness documentation.',
      'The painting does not depict a meeting of Fichte, Schelling, Hegel, or a unified German Idealist circle.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Oer-Weimarer_Musenhof.jpg',
  }),
  curated({
    id: 'fichte-napoleonic-political-geography',
    assetId: 'german-idealism-rhine-confederation-map',
    parent: 'fichte',
    displayName: 'A Political Map in Motion: Fichte after Prussian Defeat',
    shortTitle: 'Napoleonic Political Geography',
    focus: 'WAR · TERRITORY, OCCUPATION, EDUCATION, LANGUAGE, AND NATIONAL RHETORIC',
    dateLabel: 'Political geography represented for 1812 · atlas published 1902',
    question: 'How did territorial collapse and occupation change Fichte’s public language of freedom, education, and collective identity?',
    lead: 'Putzger’s retrospective map makes central Europe’s Napoleonic reorganization visible. It supplies the political pressure behind Fichte’s Berlin addresses without turning borders into a complete explanation of his contested national rhetoric.',
    ideas: [
      'Colored territories make political fragmentation and imperial reorganization legible while hiding how people experienced war, taxation, reform, and occupation.',
      'Fichte’s later national addresses join moral regeneration to education and language in a setting profoundly changed by Napoleonic power.',
      'Historical context explains why a problem became urgent but does not excuse exclusions or make later nationalist appropriations inevitable.',
    ],
    sectionDetails: [
      'The Confederation of the Rhine, Prussia, Austria, and neighboring territories appear as bounded colored units. This visual clarity is useful but retrospective: the atlas converts changing allegiances, administrations, armies, and local jurisdictions into a stable 1812 snapshot. A border does not reveal whether inhabitants welcomed reforms, resisted conscription, suffered requisition, or understood themselves through the identities later historians place upon the map.',
      'The Holy Roman Empire ended in 1806, and Prussia’s defeat intensified debates over reform and collective renewal. Fichte delivered the Addresses to the German Nation in occupied Berlin in 1807–1808. He argued that a transformed national education could cultivate freedom and moral agency, using language and cultural continuity to name a public not reducible to existing states. This differs in setting and emphasis from his early defense of revolutionary rights, though practical freedom remains a connecting concern.',
      'Fichte’s rhetoric has a double afterlife. It can be read as resistance to imperial domination and as an educational project directed toward moral autonomy; it can also rank peoples, narrow universality, and furnish vocabulary later nationalists could appropriate. Responsible interpretation neither identifies him directly with twentieth-century racial nationalism nor treats cultural definitions as harmless. The map helps visitors examine how political emergency can redirect universal claims toward a privileged collective subject.',
    ],
    cautions: [
      'This is a 1902 school-atlas reconstruction, not a map Fichte used in 1812.',
      'Neither Napoleonic occupation nor cultural nationalism removes the need to examine hierarchy and exclusion in Fichte’s language.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:(Putzger)_Germany_and_Confederation_of_the_Rhine,_1812.jpg',
  }),
  curated({
    id: 'fichte-revolution-freedom',
    assetId: 'german-idealism-bastille-1789',
    parent: 'fichte',
    displayName: 'Revolution and the Right to Transform Political Order',
    shortTitle: 'Fichte and Revolutionary Freedom',
    focus: 'REVOLUTION · LEGITIMACY, FREEDOM OF THOUGHT, CONSTITUTION, AND CHANGE',
    dateLabel: 'Bastille taken 14 July 1789 · Fichte’s revolutionary writings published in the early 1790s',
    question: 'When may people refuse an inherited political order and claim the authority to make a new one?',
    lead: 'The Bastille scene gives revolutionary rupture a crowded and violent visual field. Fichte’s early political writings defended freedom of thought and the legitimacy of constitutional change, but the painting cannot make his argument—or the Revolution—simple.',
    ideas: [
      'Smoke, weapons, fortress walls, and mass action make political transformation appear as a contested event rather than an abstract declaration.',
      'Early Fichte joins critical philosophy to the claim that human beings cannot be treated as the inherited property of rulers.',
      'A philosophy of freedom must still explain institutions, coercion, economic dependence, and who counts as an authorized political agent.',
    ],
    sectionDetails: [
      'The unidentified painter concentrates multiple actions around the fortress: attack, defense, surrender, arrest, fear, and spectatorship. The image captures rupture but not the longer processes that produced 1789 or followed it. Reading it philosophically means resisting two shortcuts: revolutionary violence is neither self-justifying liberation nor sufficient reason to preserve any inherited authority. Legitimacy remains a question about persons, rights, purposes, and accountable institutions.',
      'In his Contribution to the Rectification of the Public’s Judgment of the French Revolution, Fichte defended a people’s right to alter its political constitution. His argument proceeds from freedom and moral personality rather than from loyalty to every decision made in France. He also defended freedom of thought against rulers who treated subjects as dependents. These writings helped move transcendental questions about autonomy into disputes over political authority and historical change.',
      'Fichte later proposed more extensive legal and economic organization, and his wartime national rhetoric complicates any portrait of a consistently liberal revolutionary. The continuity lies in asking what institutions make free agency possible; the danger lies in letting an asserted moral whole overrule dissenting persons. Visitors can therefore use the revolutionary scene to test whether appeals to freedom remain reciprocal when a movement governs, regulates economic life, or defines the community in whose name it acts.',
    ],
    cautions: [
      'The Bastille painting does not document Fichte’s reaction or illustrate a passage from his work.',
      'Support for a right of revolution should not be confused with endorsement of every revolutionary act or every later Fichtean proposal.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Anonymous_-_Prise_de_la_Bastille.jpg',
  }),
  curated({
    id: 'nature-caroline-intellectual-network',
    assetId: 'german-idealism-caroline-schelling-tischbein',
    parent: 'schelling',
    displayName: 'Caroline Schlegel-Schelling: Collaboration Beyond the Canon',
    shortTitle: 'Caroline and the Jena Circle',
    focus: 'AUTHORSHIP · TRANSLATION, CRITICISM, EDITING, CONVERSATION, AND ATTRIBUTION',
    dateLabel: 'Portrait painted 1798, when the sitter was Caroline Schlegel',
    question: 'How can intellectual collaboration be reconstructed when recognized authorship and surviving attribution are unequal?',
    lead: 'Tischbein’s lifetime portrait restores a face to Caroline’s work within Jena Romanticism. The harder museum task is to show translation, criticism, editing, and conversation without either erasing her or inventing certainty the record cannot support.',
    ideas: [
      'A named likeness can make a participant visible while leaving collaborative intellectual labor largely outside the frame.',
      'Caroline’s literary and editorial work belonged to the Romantic network in which Schelling’s philosophical projects developed.',
      'Responsible attribution recognizes structural inequality and uncertainty at the same time.',
    ],
    sectionDetails: [
      'The portrait presents an individual sitter through dress, pose, and direct gaze, yet its familiar title uses a surname acquired only later. In 1798 she was Caroline Schlegel, married to August Wilhelm Schlegel and active in the Jena circle. Naming her accurately at the date of the image prevents biography from being reorganized solely around her later marriage to Schelling in 1803.',
      'Caroline participated in translation, reviewing, editing, and sustained intellectual exchange within early Romantic networks. Parts of this labor entered projects publicly associated with male authors, and the exact division of work is not always recoverable. Her relation to Schelling was personal and intellectual, but it would be equally misleading to make her an anonymous muse or to assign particular philosophical doctrines to her without evidence.',
      'The attribution problem extends beyond one household. Canonical philosophy often preserves signed books more readily than conversation, revision, translation, hospitality, and editorial intervention. Recovering those practices changes the picture of how ideas are made while leaving room for evidentiary limits. The aim is not to dissolve all authorship into a network; it is to ask which forms of contribution became citable and which were rendered supportive, private, or invisible.',
    ],
    cautions: [
      'At the portrait’s date the sitter was Caroline Schlegel, not yet Caroline Schelling.',
      'Do not reduce her to a wife or muse, but do not claim unsupported authorship of specific Schelling texts.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Johann_Heinrich_Tischbein_-_Bildnis_der_Caroline_Schelling_(1798).jpg',
  }),
  curated({
    id: 'nature-romantic-beholder',
    assetId: 'german-idealism-wanderer-friedrich',
    parent: 'schelling',
    displayName: 'The Beholder and a Nature That Exceeds Possession',
    shortTitle: 'Romantic Nature and the Beholder',
    focus: 'NATURE · VIEWPOINT, SUBLIMITY, FINITUDE, WORLD, AND INTERPRETATION',
    dateLabel: 'Caspar David Friedrich painting, c. 1818',
    question: 'Does a landscape become meaningful only through a subject, or can nature confront the viewer as productive and irreducible?',
    lead: 'Friedrich’s figure surveys a landscape he cannot fully see or master. The painting offers a Romantic parallel to Schelling’s refusal to treat nature as dead material, while remaining an artwork with no duty to demonstrate his metaphysics.',
    ideas: [
      'The figure seen from behind places visitors inside a viewpoint while withholding his face and private response.',
      'Schelling asks how nature can be intelligible as productive enough to generate organisms and consciousness rather than as an alien mechanism.',
      'A philosophical parallel is most useful when differences between artwork, metaphysical argument, and contemporary ecology remain visible.',
    ],
    sectionDetails: [
      'Rock, fog, and repeated peaks create depth while interrupting a clear survey. The Rückenfigur offers orientation and obstruction at once: visitors see with the wanderer but cannot simply become him. That structure makes subjectivity world-involving without reducing the landscape to a possession. It can evoke sublimity, uncertainty, elevation, solitude, or mastery, and the painting’s force partly lies in refusing to dictate one response.',
      'Schelling’s philosophy of nature asks how mind could emerge within nature if nature were nothing but inert extension governed from outside. He describes productive powers and organized forms whose temporary stability does not exhaust their activity. His provocative relation of nature as visible spirit and spirit as invisible nature resists fixed dualism. Friedrich’s painting does not state that thesis, but its interdependence of beholder and more-than-visible landscape gives the problem an experiential form.',
      'Contemporary environmental thought can learn from the refusal to make nature mere resource, yet historical care matters. Schelling was not writing modern ecology, and Romantic solitude can hide labor, settlement, political boundaries, and material use of landscapes. The productive question is whether an account of freedom can acknowledge dependence on natural processes and more-than-human life without assigning nature a voice tailored to human philosophical needs.',
    ],
    cautions: [
      'The painting is a cultural parallel, not an illustration of Schelling or evidence of direct influence.',
      'Do not relabel Schelling or Friedrich as contemporary ecologists without marking major historical differences.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Wanderer_above_the_Sea_of_Fog.jpeg',
  }),
  curated({
    id: 'nature-goethe-color',
    assetId: 'german-idealism-goethe-color-wheel',
    parent: 'schelling',
    displayName: 'Color Between Measurement, Perception, and Meaning',
    shortTitle: 'Goethe’s Color Circle',
    focus: 'COLOR · PHENOMENON, PERCEPTION, AFFECT, ORDER, AND SYMBOL',
    dateLabel: 'Goethe diagram, 1809 · Theory of Colours published 1810',
    question: 'What is lost when color is treated only as measurable stimulus, and what is risked when experience becomes symbolic system?',
    lead: 'Goethe’s circle arranges chromatic relations alongside qualities of intellectual and psychic life. It belongs to the same broad effort to understand nature and experience together, but it remains Goethe’s diagram rather than a compact map of Schelling.',
    ideas: [
      'The circle organizes relations among colors instead of presenting isolated swatches, making opposition and transition immediately visible.',
      'Goethe’s color inquiry emphasizes phenomena as they appear through conditions of light, darkness, media, and perceiving bodies.',
      'Joining observation to symbolic and affective meaning can resist reduction while also inviting projection beyond the evidence.',
    ],
    sectionDetails: [
      'Six colored sectors form a balanced whole whose small labels connect chromatic positions to modes of mind and feeling. The diagram is visually persuasive because circular symmetry makes the relations seem complete. Visitors should separate what can be directly inspected—the ordering, contrast, and adjacency—from claims that psychological or spiritual qualities belong necessarily to those colors.',
      'Goethe’s Theory of Colours grew from sustained observation and disagreement with accounts he thought abstracted too quickly from experienced phenomena. Schelling likewise resisted a picture of nature as a finished mechanism, and both worked within Jena and Weimar’s exchanges among natural inquiry, art, and philosophy. Their approaches were not identical. Schelling’s speculative powers and Goethe’s phenomenological descriptions answer different questions and should not be merged into one Romantic science.',
      'The circle still poses a live methodological challenge. Quantitative optics can explain wavelengths, instruments, and causal processes, while perception, language, culture, and design shape how color is discriminated and used. A richer account need not reject measurement; it can ask which level of explanation addresses which question. Conversely, symbolic interpretation must remain revisable rather than treating an elegant visual order as proof of universal psychic laws.',
    ],
    cautions: [
      'This is Goethe’s diagram, not a diagram by Schelling.',
      'Its symbolic labels should not be presented as modern experimental psychology or as universal color meanings.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Goethe,_Farbenkreis_zur_Symbolisierung_des_menschlichen_Geistes-_und_Seelenlebens,_1809,_square.jpg',
  }),
  curated({
    id: 'nature-galvani-living-force',
    assetId: 'german-idealism-galvani-frog-experiment',
    parent: 'schelling',
    displayName: 'Animal Electricity: Experiment at the Boundary of Life',
    shortTitle: 'Galvani and Living Force',
    focus: 'EXPERIMENT · ELECTRICITY, NERVE, MUSCLE, ORGANISM, AND EXPLANATION',
    dateLabel: 'Experimental plate published by Luigi Galvani, 1791',
    question: 'How does an experiment change the concept of life when invisible force produces visible movement?',
    lead: 'Galvani’s frogs, conductors, and apparatus place life inside an experimental arrangement. The plate clarifies the scientific environment of Schelling’s Naturphilosophie while warning against confusing speculative reconstruction with laboratory result.',
    ideas: [
      'The plate decomposes an event into bodies, instruments, contacts, and repeatable arrangements that viewers can compare.',
      'Debates over animal electricity made the relation among living organization, matter, and force newly contestable around 1800.',
      'Philosophy may ask how findings fit a conception of nature, but it cannot replace experimental controls or inherit their authority automatically.',
    ],
    sectionDetails: [
      'The image presents prepared frogs beside metallic arcs and electrical devices, translating muscular contraction into a visible sequence of interventions. Its clarity depends on removal from an ordinary living setting and on the ability to repeat contacts under chosen conditions. That experimental power also narrows the phenomenon: the plate does not by itself settle what life is, how a whole organism is organized, or how the intervention should be interpreted.',
      'Galvani published his work on electrical forces in muscular motion in 1791, and disagreement with Volta helped drive further investigation of animal electricity and contact between metals. Schelling treated magnetism, electricity, chemical process, and organism as evidence that nature should be understood dynamically. His philosophical constructions drew upon contemporary science, yet their stages and polarities were not straightforward reports of Galvani’s experiments.',
      'The case remains useful because it exposes reciprocal risks. A purely mechanical vocabulary may describe contraction while leaving organization and life conceptually obscure; speculative philosophy may impose a satisfying pattern on incomplete evidence. Productive exchange requires both levels to remain answerable to correction. Ethical questions also stay visible: knowledge of living bodies has often depended on interventions whose subjects cannot consent and whose suffering may disappear behind an elegant plate.',
    ],
    cautions: [
      'The plate supplies scientific context; it is not evidence that Schelling used this exact image.',
      'Naturphilosophie should be neither credited with later biology nor dismissed as if it made no contact with contemporary science.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Luigi_Galvani_Experiment.jpeg',
  }),
  curated({
    id: 'nature-voltaic-pile',
    assetId: 'german-idealism-voltaic-pile',
    parent: 'schelling',
    displayName: 'The Voltaic Pile: Matter Arranged into Continuous Action',
    shortTitle: 'An Early Electrical Battery',
    focus: 'OBJECT · METALS, CONTACT, CURRENT, EXPERIMENT, AND PRODUCTIVE NATURE',
    dateLabel: 'Object c. 1800 · Wellcome Collection attribution qualified as “probably”',
    question: 'What philosophical possibilities open when a carefully arranged material object produces sustained electrical activity?',
    lead: 'Alternating discs and separators make an invisible process available through a manipulable object. The pile gives Schelling’s dynamic scientific context material presence without claiming that this museum object generated his philosophy.',
    ideas: [
      'The vertical stack makes repetition and material difference visible before any current can be seen.',
      'Volta’s pile enabled sustained electrical effects and intensified disputes about whether electricity belonged specifically to living tissue or to material contact.',
      'An artifact can reorganize concepts by making new phenomena repeatable, but no object carries one metaphysical interpretation inside it.',
    ],
    sectionDetails: [
      'The pile’s power lies in arrangement: alternating materials, conductive contact, and repeated units transform familiar substances into an apparatus with unfamiliar effects. Its museum stillness contrasts with what made such devices historically consequential—the possibility of connecting a circuit and producing continuous activity. Looking closely therefore requires imagining use while respecting that the displayed object’s exact history is only partially documented.',
      'Volta announced the pile in 1800 amid debate with Galvani over electrical phenomena. The device supported sustained current and opened paths toward electrochemistry, while the conceptual dispute crossed boundaries among physics, physiology, and the study of life. Schelling’s nature philosophy emerged within this rapidly changing field and used electricity among the dynamic processes through which nature differentiates and organizes itself.',
      'The artifact challenges both inert matter and easy vitalism. Material construction can generate behavior not apparent in isolated components, yet philosophical claims about emergence, organism, or spirit require arguments beyond analogy. Today, batteries structure infrastructures of mobility, communication, extraction, and waste. The historical pile can therefore prompt a wider question: when technical control reveals a natural process, does it deepen reciprocal understanding or primarily increase the power to mobilize materials?',
    ],
    cautions: [
      'The Wellcome record says this pile was probably made or used by Volta; retain that uncertainty.',
      'There is no evidence here that Schelling saw or handled this particular object.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Original_Voltaic_pile._Wellcome_M0017447.jpg',
  }),
  curated({
    id: 'hegel-lecture-room',
    assetId: 'german-idealism-hegel-lecturing-kugler',
    parent: 'hegel',
    displayName: 'Hegel in the Lecture Room: A System Performed in Time',
    shortTitle: 'Hegel Lecturing',
    focus: 'TEACHING · VOICE, SEQUENCE, AUDIENCE, REVISION, AND SYSTEM',
    dateLabel: 'Franz Kugler image, 1828 · later reproduced in a 1931 publication',
    question: 'How does a philosophical system change when it must be spoken in sequence, heard by students, repeated, and revised?',
    lead: 'Kugler’s crowded room makes Hegelian philosophy a pedagogical event. The lecturer, listeners, notes, and ordered rows remind visitors that the system circulated through changing courses as well as difficult published books.',
    ideas: [
      'The lecture image distributes attention across speaker, audience, furniture, and collective time rather than isolating a solitary author.',
      'Hegel’s Berlin courses expanded and reorganized subjects whose published presentations never captured every spoken development.',
      'Reception begins inside teaching: students select, record, interpret, and sometimes transform what they hear.',
    ],
    sectionDetails: [
      'Hegel stands at a lectern before rows of listeners, and the compressed drawing makes the room feel both communal and hierarchical. The image does not identify a course or preserve a sentence. Its evidence is more basic: philosophy occupies bodies for a duration, depends on audibility and attention, and reaches an audience through a setting whose architecture organizes who speaks and who is expected to listen.',
      'Hegel published the Phenomenology, Science of Logic, Encyclopedia, and Philosophy of Right, but important treatments of art, religion, history, and the history of philosophy circulated through lecture courses and later editorial reconstruction. He repeated courses while changing examples and emphases. A visitor should therefore distinguish Hegel’s own published texts, surviving manuscripts and student notes, and posthumous lecture editions rather than citing all of them as one uniform finished voice.',
      'Pedagogy makes systematic ambition answerable to sequence. A lecturer cannot present every relation simultaneously; each term must be introduced before later connections alter its meaning. Students can misunderstand, challenge, abbreviate, or extend that movement. This helps explain why Hegelian schools diverged after his death and why no classroom image can guarantee doctrinal unity. A system survives not by remaining untouched but through practices of reading whose fidelity is always argued.',
    ],
    cautions: [
      'Kugler’s image is not a transcript or neutral record of a named lecture.',
      'Do not treat later edited lecture compilations as textually identical to Hegel’s own published works.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Friedrich_Hegel_mit_Studenten_Lithographie_F_Kugler.jpg',
  }),
  curated({
    id: 'hegel-napoleon-jena',
    assetId: 'german-idealism-hegel-napoleon-jena',
    parent: 'hegel',
    displayName: 'Jena 1806: History Appears on Horseback',
    shortTitle: 'Hegel and Napoleon',
    focus: 'HISTORY · REVOLUTION, STATE POWER, WAR, RECOGNITION, AND RETROSPECTION',
    dateLabel: 'Event in October 1806 · illustration published 1895',
    question: 'How can an event appear historically transformative without making conquest morally right or its outcome inevitable?',
    lead: 'Kurtz’s later illustration imagines Hegel watching Napoleon ride through Jena as the Phenomenology neared completion. The charged anecdote opens Hegel’s philosophy of history while demanding distance from heroic legend.',
    ideas: [
      'The vertical composition separates the observing philosopher from mounted military power while visually binding both to one narrated moment.',
      'Hegel’s letter described Napoleon as a world-soul because the emperor seemed to concentrate a vast historical transformation in individual action.',
      'Historical intelligibility does not by itself justify violence, erase contingency, or make the victor the final measure of freedom.',
    ],
    sectionDetails: [
      'The illustration was produced almost ninety years after the battle, using contrast, gesture, and scale to turn an anecdote into historical theater. Napoleon dominates the moving column; Hegel appears as witness. This visual clarity is precisely what requires caution. It retrospectively organizes the encounter as if both figures already possessed the symbolic meanings later readers would attach to them.',
      'On 13 October 1806 Hegel wrote from Jena that he had seen Napoleon riding out on reconnaissance and called him a world-soul. The next day French forces defeated Prussia nearby. Hegel was completing the Phenomenology amid upheaval, and the Napoleonic state could appear to carry post-revolutionary legal and administrative transformation across old political forms. The familiar wording about a world spirit on horseback is a later paraphrase rather than his exact phrase.',
      'Hegelian history is strongest when it identifies contradictions within forms of life and asks whether freedom becomes institutionally actual. It becomes dangerous when retrospective meaning turns casualties, domination, and defeated alternatives into mere instruments of progress. Napoleon’s reforms and conquests therefore need simultaneous analysis: they transformed institutions and extended imperial war. Visitors should ask whose freedom an apparently world-historical agent advances, whose voice disappears, and what possibilities hindsight makes look impossible.',
    ],
    cautions: [
      'The 1895 image is retrospective, not eyewitness documentation.',
      'Do not substitute the popular “world spirit on horseback” wording for Hegel’s letter or portray him as an unqualified worshipper of Napoleon.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Hegel-and-Napoleon-in-Jena-1806.jpg',
  }),
  curated({
    id: 'hegel-birthplace-stuttgart',
    assetId: 'german-idealism-hegelhaus-stuttgart',
    parent: 'hegel',
    displayName: 'A Birthplace Becomes a Museum',
    shortTitle: 'Hegel House, Stuttgart',
    focus: 'BIOGRAPHY · PLACE, MEMORY, PRESERVATION, SCALE, AND RECEPTION',
    dateLabel: 'Hegel born here in 1770 · exterior photographed 2021',
    question: 'What can a preserved birthplace reveal about a philosopher, and what meanings are created only after it becomes a museum?',
    lead: 'The Hegel House places a globally influential system inside a narrow Stuttgart façade. Its survival offers biographical orientation while exposing how later institutions turn ordinary sites into public memory.',
    ideas: [
      'The present streetscape brings philosophical biography down to urban scale without displaying Hegel’s later concepts directly.',
      'Hegel’s movement through Tübingen, Jena, Nuremberg, Heidelberg, and Berlin complicates any attempt to let one birthplace explain a career.',
      'A museum site is both historical evidence and a later act of selection, interpretation, preservation, and civic identity.',
    ],
    sectionDetails: [
      'The photograph shows a building embedded in contemporary Stuttgart rather than isolated as a timeless monument. Windows, façade, neighboring structures, and museum signage make continuity visible, but they also show change. Visitors can locate a birth without imagining that the exterior preserves the sensory world of 1770 or contains a material key to dialectic, recognition, or absolute spirit.',
      'Hegel was born in Stuttgart and studied at the Tübinger Stift before teaching and writing across several cities. Jena was the setting of early collaboration and the Phenomenology; Nuremberg brought school administration and the Science of Logic; Heidelberg and Berlin brought mature university positions. Each setting linked intellectual work to employment, political institutions, students, and available publics. Biography clarifies these conditions but does not reduce arguments to local impressions.',
      'Birthplace museums ask communities to decide which lives deserve space, funding, and interpretation. They can invite careful study by preserving documents and making historical context accessible. They can also turn conflict into heritage and famous names into civic property. A philosophically responsible visit holds both functions together: the house makes Hegel approachable as a finite historical person while the museum label remains accountable for how it constructs his relevance.',
    ],
    cautions: [
      'The current exterior is not an untouched reconstruction of the building in 1770.',
      'A birthplace supplies biographical context, not a causal explanation of Hegel’s philosophy.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Hegelhaus_Stuttgart.jpg',
  }),
  curated({
    id: 'hegel-berlin-institution',
    assetId: 'german-idealism-berlin-university-1855',
    parent: 'hegel',
    displayName: 'Berlin University: Philosophy, Education, and the State',
    shortTitle: 'Hegel’s Berlin Institution',
    focus: 'UNIVERSITY · PROFESSORSHIP, CURRICULUM, STATE, PUBLIC, AND AUTHORITY',
    dateLabel: 'Hegel taught in Berlin 1818–1831 · university view published 1855',
    question: 'How can a university cultivate free thought while depending on offices, curricula, recognition, and state authority?',
    lead: 'The broad Opernplatz view turns Hegel’s Berlin institution into part of a capital city. Philosophy here is not outside public power: it teaches within an organization whose authority and promise both demand scrutiny.',
    ideas: [
      'The university façade shares an urban square with circulation and state culture, making education visibly public and institutional.',
      'Hegel’s Berlin chair gave his system unusual reach through courses, students, administration, and publication.',
      'Institutional freedom cannot be judged by abstract independence alone; it depends on who may enter, speak, dissent, and hold office.',
    ],
    sectionDetails: [
      'The 1855 image opens the square before the former Prince Henry Palace with pedestrians and carriages moving across it. The university appears ordered and monumental, but the print postdates Hegel by twenty-four years. Its value lies in showing the scale and civic placement of the institution, not reconstructing the precise appearance of his lecture days or the atmosphere inside a classroom.',
      'Hegel joined the University of Berlin in 1818 and taught there until 1831, also serving in administrative roles. His mature philosophy of objective spirit treats law, family, civil society, and the state as institutions through which freedom can become actual rather than remain private choice. Teaching that argument within a state university creates a real tension: institutional embodiment may support rational freedom, yet an existing institution is not rational merely because it exists.',
      'The recurring caricature of Hegel as a simple official philosopher of Prussia obscures both his critical distinctions and genuine political limitations. His account can expose how markets and formal rights depend on wider institutions; it can also understate exclusion, empire, gender hierarchy, and democratic contest. The university view invites a contemporary test: when does public education enlarge shared reason, and when do funding, appointment, discipline, and prestige protect authority from those it excludes?',
    ],
    cautions: [
      'The university is now called Humboldt University, but that was not its ordinary name during Hegel’s lifetime.',
      'The 1855 print is not an exact view of the university in the 1820s, and Hegel should not be reduced to a mouthpiece for the Prussian state.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:OpernplatzUniversitaet1855.jpg',
  }),
  curated({
    id: 'hegel-haiti-recognition-debate',
    assetId: 'german-idealism-haiti-crete-a-pierrot',
    parent: 'hegel',
    displayName: 'Haiti and Lordship–Bondage: A Necessary Debate',
    shortTitle: 'Hegel and the Haitian Question',
    focus: 'ATLANTIC WORLD · SLAVERY, REVOLT, RECOGNITION, LABOR, AND EVIDENCE',
    dateLabel: 'Crête-à-Pierrot fought in 1802 · engraving published 1839 · Phenomenology published 1807',
    question: 'How should a plausible historical context reshape interpretation when direct textual dependence remains disputed?',
    lead: 'The battle at Crête-à-Pierrot brings the Haitian Revolution’s struggle against colonial slavery into Hegel’s historical horizon. It supports an indispensable interpretive question, not a license to claim a proven one-to-one source for lordship and bondage.',
    ideas: [
      'The engraving represents a particular 1802 battle, forcing the broad phrase Haitian Revolution back into military, colonial, and racial conflict.',
      'Hegel’s lordship-and-bondage sequence analyzes unstable dependence, fear, labor, and self-consciousness rather than offering a transparent chronicle.',
      'Responsible contextual interpretation weighs circulation and contemporaneity against missing citations, contested evidence, and the passage’s systematic role.',
    ],
    sectionDetails: [
      'Smoke, fortification, and advancing troops depict the attack on Crête-à-Pierrot during Napoleon’s expedition to Saint-Domingue. The image was published in 1839, long after both the battle and Hegel’s Phenomenology, so it cannot show what Hegel saw. It does make concrete the violence behind a revolution in which enslaved and formerly enslaved people defeated colonial rule and Haiti declared independence in 1804.',
      'The Phenomenology’s lordship-and-bondage passage follows two self-consciousnesses seeking recognition. Domination fails to give the lord independent confirmation, while the bondsman’s fear, service, and transforming labor alter the relation to self and world. Scholars have argued that contemporary reports from Saint-Domingue illuminate this analysis; others question the documentary link or warn that the passage’s conceptual setting cannot be reduced to one event. Both the historical claim and its limits belong on the wall.',
      'The debate changes what counts as philosophical evidence. Reading only an internal chain of concepts can detach freedom from the Atlantic economy of slavery and revolt; treating Haiti as a hidden key can overstate influence and absorb a distinct revolution into a European author’s achievement. A better interpretation lets Haitian agency remain historically central, examines the information available in Hegel’s world, and marks exactly where the textual case becomes inference.',
    ],
    cautions: [
      'The image depicts Crête-à-Pierrot in 1802 and was made in 1839; it is not a generic eyewitness view of the whole revolution.',
      'A Haitian context for lordship and bondage is a significant scholarly argument, not an uncontested proven direct source.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Haitian_Revolution.jpg',
    academicSource: {
      label: 'Caterina Maurer — The shadow of the Haitian uprising on Hegel’s thought',
      url: 'https://mimesisjournals.com/ojs/index.php/babelonline/article/view/2932',
    },
  }),
  curated({
    id: 'afterlives-holderlin',
    assetId: 'german-idealism-holderlin-hiemer-1792',
    parent: 'german-idealism',
    displayName: 'Hölderlin: Unity Without Erasing Difference',
    shortTitle: 'Hölderlin’s Independent Path',
    focus: 'POETRY AND PHILOSOPHY · JUDGMENT, BEING, BEAUTY, FREEDOM, AND FORM',
    dateLabel: 'Lifetime portrait c. 1792 · Tübingen years shared with Hegel and Schelling',
    question: 'Can poetry disclose a relation between unity and difference that a closed philosophical system cannot adequately state?',
    lead: 'Hiemer’s young Hölderlin enters the gallery as Hegel and Schelling’s friend, interlocutor, and independent thinker. His poetry and fragments test idealist ambitions without becoming decorative evidence for someone else’s system.',
    ideas: [
      'The lifetime portrait restores Hölderlin’s historical presence before later images of isolated genius or illness dominate his reception.',
      'Hölderlin’s reflections on judgment, being, beauty, and separation engage post-Kantian problems through forms distinct from systematic deduction.',
      'Philosophy and poetry can challenge one another without collapsing into the claim that one medium simply says what the other cannot.',
    ],
    sectionDetails: [
      'The pastel presents a young writer in the years when friendships and study at the Tübinger Stift helped form a shared post-Kantian problem field. Nothing in the face discloses a doctrine, future poem, or medical fate. Its museum value is corrective: Hölderlin appears as a contemporary participant rather than only as the tragic figure constructed by later biography.',
      'Hölderlin questioned whether reflective judgment divides subject and object while presupposing a prior unity that cannot be reproduced by simply adding the terms back together. His poetry explores belonging and estrangement, nature and history, divine absence, political hope, and the difficulty of return. These concerns overlap with Schelling and Hegel, yet his fragmentary prose and poetic practice should not be treated as preliminary versions of their systems.',
      'The disputed authorship of the so-called Oldest System-Programme of German Idealism illustrates the network’s evidentiary difficulty: a manuscript in Hegel’s hand has been attributed in different ways, and certainty remains unavailable. Hölderlin’s afterlife is most productive when such ambiguity is preserved. His later mental illness must not be used as a retrospective explanation of demanding ideas or as proof that poetic thought failed where a system succeeded.',
    ],
    cautions: [
      'Hölderlin was a friend and independent thinker, not a disciple of Hegel or Schelling.',
      'Do not explain his philosophy through his later illness or assign disputed texts with false certainty.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:FK_Hiemer_-_Friedrich_H%C3%B6lderlin_(Pastell_1792).jpg',
  }),
  curated({
    id: 'afterlives-novalis',
    assetId: 'german-idealism-novalis-eichens-1845',
    parent: 'german-idealism',
    displayName: 'Novalis: The Fragment as a Method of Inquiry',
    shortTitle: 'Novalis and Open-Ended System',
    focus: 'ROMANTICISM · FRAGMENT, POETRY, SCIENCE, SELF, AND INCOMPLETION',
    dateLabel: 'Posthumous engraving, 1845 · Novalis lived 1772–1801',
    question: 'Can a fragment be rigorous when its purpose is to keep relations open rather than close them into a finished system?',
    lead: 'Eichens’s posthumous portrait helped construct the remembered Novalis. His notebooks and fragments reveal something more demanding: sustained engagement with Fichte, natural science, poetry, religion, and the possibility of an unfinished encyclopedia.',
    ideas: [
      'The oval reception portrait offers coherence and completion that Novalis’s fragmentary writings often deliberately withhold.',
      'Novalis studied Fichtean self-activity while testing how philosophy changes through poetry, mathematics, medicine, mining, and natural inquiry.',
      'Fragmentary form can expose the provisional character of knowledge without making every association equally valid.',
    ],
    sectionDetails: [
      'The engraving was made more than four decades after Novalis’s death and presents a smooth, memorable profile. That temporal distance matters because Romantic reception often turned Friedrich von Hardenberg into an ethereal poet detached from technical work and disciplined study. The image should open an inquiry into that construction rather than authenticate a precise living appearance.',
      'Novalis’s Fichte Studies engage the relation among self, representation, feeling, and world instead of simply repeating the Wissenschaftslehre. His writing moves across philosophy, poetry, natural science, medicine, law, and professional knowledge from mining administration. Fragments allowed connections to be tested in multiple directions and helped imagine an encyclopedia that would remain generative rather than merely inventory completed facts.',
      'Open form has philosophical costs as well as powers. Suggestive analogies can reveal patterns hidden by disciplinary separation, but they can also escape standards of evidence. Novalis’s practice therefore should not be romanticized as inspired disorder or opposed wholesale to reason. It asks whether rigor might include the explicit marking of incompletion, the juxtaposition of methods, and the invitation for a reader to continue work whose system remains purposefully unfinished.',
    ],
    cautions: [
      'The 1845 engraving is a posthumous reception likeness, not an authoritative life portrait.',
      'Novalis should not be reduced to irrational mysticism; his fragmentary method included serious engagement with philosophy and science.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Novalis2.jpg',
    academicSource: {
      label: 'Stanford Encyclopedia of Philosophy — Novalis',
      url: 'https://plato.stanford.edu/entries/novalis/',
    },
  }),
  curated({
    id: 'afterlives-runge-morning',
    assetId: 'german-idealism-runge-morning-1808',
    parent: 'german-idealism',
    displayName: 'Runge’s Morning: A Visual System That Remains an Artwork',
    shortTitle: 'Romantic Dawn',
    focus: 'ART · COLOR, GROWTH, ALLEGORY, TEMPORALITY, AND TOTAL FORM',
    dateLabel: 'Philipp Otto Runge, Der Morgen, 1808',
    question: 'How can an artwork organize nature, spirit, and time without becoming a diagram whose meaning is exhausted by labels?',
    lead: 'Runge’s luminous vertical field draws flower, child, woman, light, and dawn into one visual order. It parallels idealist ambitions for unity while preserving the sensuous excess and interpretive openness of painting.',
    ideas: [
      'Symmetry and vertical ascent bind natural growth, human figures, light, and ornamental border into a deliberately total field.',
      'Romantic allegory can present relations among temporality, divinity, nature, and consciousness without translating them into one proposition.',
      'An artwork’s philosophical significance depends on its own form and history, not on being recruited as evidence for a famous system.',
    ],
    sectionDetails: [
      'Runge organizes the image from flowers and infants through a central female figure toward expanding light. Repetition joins border and interior, making ornament part of the event rather than an external frame. The work invites symbolic readings, but its colors, scale, bodily gestures, and layered spatial ambiguities continue to act after a symbol has been named. That remainder is central to why the painting cannot be replaced by a conceptual chart.',
      'Der Morgen belongs to Runge’s ambitious Times of Day project, which sought a cycle relating natural rhythm, human life, and Christian-Romantic cosmology. The completed 1808 work should be distinguished from the unfinished larger version. Schelling’s philosophy of art likewise made artistic production important because conscious intention and an unmastered productivity meet in a sensible whole, but the conceptual parallel does not establish direct dependence or turn Runge’s imagery into Schellingian code.',
      'The painting tests a recurring idealist temptation: unity may organize difference, yet an overly confident interpretation can make every element serve a predetermined whole. Visitors should notice where the image resists that closure. Its theological symbolism is historically particular; its bodies and gendered allegory are not neutral universals; its dawn can signify renewal without proving historical progress. Art contributes to thought precisely because looking remains an active task rather than a decoded conclusion.',
    ],
    cautions: [
      'Do not identify the work as a diagram of Schelling or Hegel or claim direct influence without evidence.',
      'Keep this completed 1808 Morning distinct from Runge’s unfinished Great Morning.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Philipp_Otto_Runge_-_Der_Morgen.jpg',
  }),
  curated({
    id: 'afterlives-young-hegelians',
    assetId: 'german-idealism-young-hegelians-engels',
    parent: 'hegel',
    displayName: 'Die Freien: Hegelian Critique Becomes a Public Performance',
    shortTitle: 'The Young Hegelian Milieu',
    focus: 'AFTERLIFE · RELIGION, PRESS, SATIRE, POLITICS, AND COMPETING CRITIQUE',
    dateLabel: 'Friedrich Engels caricature, 1842',
    question: 'What happens when a philosophical inheritance becomes a contested style of criticism, journalism, sociability, and political identity?',
    lead: 'Engels arranges the Berlin circle Die Freien as unruly satire rather than a dignified school portrait. The drawing captures post-Hegelian argument in motion while refusing to serve as a reliable membership chart.',
    ideas: [
      'Exaggerated bodies, props, and procession turn intellectual disagreement into social and political comedy.',
      'Young Hegelians used historical and philosophical criticism to dispute religion, state authority, emancipation, and the meaning of Hegel’s method.',
      'A shared critical vocabulary did not produce one program; alliances shifted and later critics transformed or rejected the group’s premises.',
    ],
    sectionDetails: [
      'Engels’s line drawing identifies several figures associated with Die Freien and surrounds them with satirical signs, including Bruno Bauer stepping on a newspaper and a visual joke aimed at the Prussian education minister. These details make the group’s polemical culture vivid, but caricature intentionally distorts bodies, status, and relation. It tells us how Engels chose to stage the circle, not how every meeting looked.',
      'After Hegel’s death, disputes over religion and politics helped differentiate readers often grouped as Right, Center, or Young Hegelians. David Friedrich Strauss, Bruno Bauer, Ludwig Feuerbach, Arnold Ruge, Max Stirner, and others did not share a single doctrine. Criticism of scripture, theological concepts, state institutions, and liberal reform took distinct paths. Die Freien was a particular Berlin social circle inside this wider and unstable milieu, not another name for everyone influenced by Hegel.',
      'Marx and Engels emerged from this critical environment but later attacked what they considered its confinement to criticism of consciousness and religion. Stirner’s challenge provoked another extended response. These breakups matter because intellectual afterlives branch through disagreement rather than descend as property from a founder. Satire also remains politically double-edged: it can puncture authority and group vanity, yet it can replace argument with ridicule or make an insider’s joke look like neutral history.',
    ],
    cautions: [
      'Die Freien was one Berlin circle, not a synonym for every Young Hegelian.',
      'Engels’s drawing is satire; do not treat every distorted figure or relation as neutral documentary evidence.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Skiz-hegel.png',
    academicSource: {
      label: 'Stanford Encyclopedia of Philosophy — Ludwig Feuerbach and the Young Hegelian context',
      url: 'https://plato.stanford.edu/entries/ludwig-feuerbach/',
    },
  }),
  curated({
    id: 'afterlives-feuerbach',
    assetId: 'german-idealism-feuerbach-c1840',
    parent: 'hegel',
    displayName: 'Feuerbach: Theology Returns to Embodied Human Life',
    shortTitle: 'Feuerbach’s Anthropological Turn',
    focus: 'CRITIQUE · RELIGION, ALIENATION, SENSUOUSNESS, NATURE, AND SPECIES',
    dateLabel: 'Conventionally identified portrait, c. 1840 · The Essence of Christianity published 1841',
    question: 'What changes when divine predicates are interpreted as estranged expressions of human powers and relationships?',
    lead: 'The weakly documented portrait requires the same caution Feuerbach directed toward abstraction: begin from the concrete evidence available. His critique redirects post-Hegelian thought toward embodied human life without becoming merely a preface to Marx.',
    ideas: [
      'The direct portrait gaze creates personal presence even though the image’s maker, technique, original holder, and chain of transmission remain unknown.',
      'Feuerbach interprets theological attributes through human capacities and alienation rather than treating religion as a simple deliberate fraud.',
      'His turn to sensuousness and nature influenced later critique while remaining vulnerable to questions about history, practice, and social difference.',
    ],
    sectionDetails: [
      'Commons dates the image approximately and identifies Feuerbach but traces it only through a 1972 biography. That is enough for a conventionally attributed historical portrait, not enough to invent a studio, artist, or secure sitting. The evidentiary gap becomes an interpretive lesson: a compelling face can produce confidence that the catalog record does not warrant.',
      'In The Essence of Christianity, Feuerbach argues that attributes assigned to God express human powers separated from the people and relations in which they arise. Religion is therefore not adequately explained as a priestly lie or an intellectual mistake; it can disclose real needs and capacities in alienated form. His wider work increasingly emphasizes sensuous embodiment, nature, interpersonal relation, and a critique of speculative abstraction.',
      'Marx drew upon Feuerbach’s reversal of theological and speculative priorities but criticized his materialism for remaining contemplative and insufficiently historical or practical. Feuerbach also should not be reduced to one projection formula, since his later naturalism and ethics develop other emphases. Contemporary visitors can test both moves: does returning abstractions to embodied life expose alienation, and which bodies, institutions, labors, and power relations remain hidden if humanity is treated as one undifferentiated species?',
    ],
    cautions: [
      'The selected portrait is conventionally identified but not independently authenticated by strong provenance on Commons.',
      'Do not reduce Feuerbach to “religion is invented” or treat him merely as a transitional proto-Marxist.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Ludwig-Feuerbach.jpg',
    academicSource: {
      label: 'Stanford Encyclopedia of Philosophy — Ludwig Feuerbach',
      url: 'https://plato.stanford.edu/entries/ludwig-feuerbach/',
    },
  }),
  curated({
    id: 'afterlives-strauss',
    assetId: 'german-idealism-strauss-rijksmuseum',
    parent: 'hegel',
    displayName: 'David Friedrich Strauss: Gospel History under Critique',
    shortTitle: 'Strauss and Historical Criticism',
    focus: 'THEOLOGY · MYTH, HISTORY, SCRIPTURE, COMMUNITY, AND HEGELIAN DIVISION',
    dateLabel: 'The Life of Jesus Critically Examined, 1835–1836 · portrait print dated 1837–1868',
    question: 'How does historical criticism change scripture when myth is understood as communal meaning rather than conscious deception?',
    lead: 'The Rijksmuseum print gives Strauss a conventional public likeness as his biblical criticism fractured theological uses of Hegel. His category of myth challenged Gospel historicity without simply declaring every narrative a lie.',
    ideas: [
      'The formal oval portrait stabilizes a controversial author whose printed intervention destabilized academic and religious careers.',
      'Strauss used historical and literary criticism to question supernatural and harmonizing readings of the Gospel narratives.',
      'His reception shows that Hegelian vocabulary could divide theology rather than supply one agreed reconciliation of faith and reason.',
    ],
    sectionDetails: [
      'The print names Strauss and presents a composed intellectual figure, but its maker worked after another drawing and the record spans more than three decades. It cannot identify a particular sitting or moment of controversy. That distance is useful: public portraits often regularize figures whose ideas were received as disruptive, giving historical conflict the calm face of later commemoration.',
      'Strauss’s Life of Jesus Critically Examined examined tensions and supernatural elements in the Gospel narratives through the category of myth. Myth in this argument was neither reliable event-report nor necessarily a fraud consciously fabricated by an individual; it could emerge within a community as religious ideas took narrative form. Strauss did not merely assert that Jesus never existed, and many theologians influenced by Hegel rejected his conclusions and methods.',
      'The controversy damaged Strauss’s academic prospects and helped make disagreements within Hegelian theology publicly visible. Historical criticism poses a durable problem: texts are situated products with sources, genres, editorial histories, and communities, yet believers and institutions may claim truths not exhausted by factual reconstruction. The point is not that criticism automatically produces secular disbelief. It is that inherited authority must answer methods whose findings no philosophical synthesis can predetermine.',
    ],
    cautions: [
      'The broad date range and derivative technique do not document a specific life sitting.',
      'Strauss’s use of myth does not mean simple falsehood, denial that Jesus existed, or an inevitable single path from Hegel to secularism.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Portret_van_David_Friedrich_Strauss,_RP-P-1913-325.jpg',
    academicSource: {
      label: 'Stanford Encyclopedia of Philosophy — Ludwig Feuerbach and post-Hegelian theology',
      url: 'https://plato.stanford.edu/entries/ludwig-feuerbach/',
    },
  }),
] as const satisfies readonly MuseumSupplementalExhibit[];

type GermanIdealismRoomId =
  | 'german-idealism-orientation'
  | 'german-idealism-nature'
  | 'german-idealism-hegel'
  | 'german-idealism-afterlives-room';
type InstallationKind = 'idealism-work' | 'idealism-context' | 'idealism-concept';

const layout = (
  id: GermanIdealismSupplementalExhibitId,
  parentExhibitId: GermanIdealismParent,
  guidedAfterExhibitId: GermanIdealismParent,
  zoneId: GermanIdealismRoomId,
  position: {x: number; z: number},
  rotationY: number,
  assetId: GermanIdealismGalleryAssetId,
  mediaWidth: number,
  mediaHeight: number,
  installationKind: InstallationKind,
  accent: string,
) => authorSupplementalLayout({
  id: id as MuseumSupplementalExhibitId,
  parentExhibitId,
  guidedAfterExhibitId,
  zoneId,
  position,
  rotationY,
  assetId: assetId as MuseumAssetId,
  mediaWidth,
  mediaHeight,
  installationKind: installationKind as MuseumSupplementalInstallationKind,
  accent,
});

export const GERMAN_IDEALISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  // Room 01: the branch and Fichte occupy both outer side walls; these complete the four transverse-wall positions.
  layout(
    'idealism-jena-system-labor',
    'fichte',
    'fichte',
    'german-idealism-orientation',
    {x: -5.55, z: -26.88},
    0,
    'german-idealism-collegium-jenense',
    3.2,
    1.25,
    'idealism-context',
    GERMAN_IDEALISM_PALETTE.critiqueBlue,
  ),
  layout(
    'idealism-weimar-intellectual-world',
    'german-idealism',
    'german-idealism',
    'german-idealism-orientation',
    {x: -5.55, z: -15.12},
    Math.PI,
    'german-idealism-weimar-musenhof',
    3.1,
    2.4,
    'idealism-context',
    GERMAN_IDEALISM_PALETTE.romanticViolet,
  ),
  layout(
    'fichte-napoleonic-political-geography',
    'fichte',
    'fichte',
    'german-idealism-orientation',
    {x: 5.55, z: -26.88},
    0,
    'german-idealism-rhine-confederation-map',
    3.05,
    2.46,
    'idealism-context',
    GERMAN_IDEALISM_PALETTE.dialecticGold,
  ),
  layout(
    'fichte-revolution-freedom',
    'fichte',
    'fichte',
    'german-idealism-orientation',
    {x: 5.55, z: -15.12},
    Math.PI,
    'german-idealism-bastille-1789',
    3.1,
    2.45,
    'idealism-context',
    GERMAN_IDEALISM_PALETTE.activityRed,
  ),

  // Room 02: Schelling occupies the west wall; five records complete the remaining faces.
  layout(
    'nature-caroline-intellectual-network',
    'schelling',
    'schelling',
    'german-idealism-nature',
    {x: 10.85, z: -7},
    -Math.PI / 2,
    'german-idealism-caroline-schelling-tischbein',
    2.2,
    2.7,
    'idealism-context',
    GERMAN_IDEALISM_PALETTE.romanticViolet,
  ),
  layout(
    'nature-romantic-beholder',
    'schelling',
    'schelling',
    'german-idealism-nature',
    {x: -5.55, z: -12.88},
    0,
    'german-idealism-wanderer-friedrich',
    2.1,
    2.7,
    'idealism-concept',
    GERMAN_IDEALISM_PALETTE.natureGreen,
  ),
  layout(
    'nature-goethe-color',
    'schelling',
    'schelling',
    'german-idealism-nature',
    {x: -5.55, z: -1.12},
    Math.PI,
    'german-idealism-goethe-color-wheel',
    2.65,
    2.65,
    'idealism-concept',
    GERMAN_IDEALISM_PALETTE.dialecticGold,
  ),
  layout(
    'nature-galvani-living-force',
    'schelling',
    'schelling',
    'german-idealism-nature',
    {x: 5.55, z: -12.88},
    0,
    'german-idealism-galvani-frog-experiment',
    3.12,
    2.24,
    'idealism-context',
    GERMAN_IDEALISM_PALETTE.critiqueBlue,
  ),
  layout(
    'nature-voltaic-pile',
    'schelling',
    'schelling',
    'german-idealism-nature',
    {x: 5.55, z: -1.12},
    Math.PI,
    'german-idealism-voltaic-pile',
    1.42,
    2.7,
    'idealism-work',
    GERMAN_IDEALISM_PALETTE.activityRed,
  ),

  // Room 03: Hegel occupies the west wall; five records complete the remaining faces.
  layout(
    'hegel-lecture-room',
    'hegel',
    'hegel',
    'german-idealism-hegel',
    {x: -5.55, z: 1.12},
    0,
    'german-idealism-hegel-lecturing-kugler',
    3.2,
    1.8,
    'idealism-context',
    GERMAN_IDEALISM_PALETTE.critiqueBlue,
  ),
  layout(
    'hegel-napoleon-jena',
    'hegel',
    'hegel',
    'german-idealism-hegel',
    {x: -5.55, z: 12.88},
    Math.PI,
    'german-idealism-hegel-napoleon-jena',
    1.63,
    2.7,
    'idealism-context',
    GERMAN_IDEALISM_PALETTE.activityRed,
  ),
  layout(
    'hegel-birthplace-stuttgart',
    'hegel',
    'hegel',
    'german-idealism-hegel',
    {x: 5.55, z: 1.12},
    0,
    'german-idealism-hegelhaus-stuttgart',
    3,
    2.25,
    'idealism-context',
    GERMAN_IDEALISM_PALETTE.dialecticGold,
  ),
  layout(
    'hegel-berlin-institution',
    'hegel',
    'hegel',
    'german-idealism-hegel',
    {x: 10.85, z: 7},
    -Math.PI / 2,
    'german-idealism-berlin-university-1855',
    3.2,
    2.1,
    'idealism-context',
    GERMAN_IDEALISM_PALETTE.archiveCharcoal,
  ),
  layout(
    'hegel-haiti-recognition-debate',
    'hegel',
    'hegel',
    'german-idealism-hegel',
    {x: 5.55, z: 12.88},
    Math.PI,
    'german-idealism-haiti-crete-a-pierrot',
    3.15,
    2.33,
    'idealism-concept',
    GERMAN_IDEALISM_PALETTE.romanticViolet,
  ),

  // Room 04 keeps all six contextual installations; Kantianism shares a divided west-wall run with Novalis.
  layout(
    'afterlives-holderlin',
    'german-idealism',
    'hegel',
    'german-idealism-afterlives-room',
    {x: -5.55, z: 15.12},
    0,
    'german-idealism-holderlin-hiemer-1792',
    2.02,
    2.7,
    'idealism-context',
    GERMAN_IDEALISM_PALETTE.romanticViolet,
  ),
  layout(
    'afterlives-novalis',
    'german-idealism',
    'hegel',
    'german-idealism-afterlives-room',
    {x: -10.85, z: 17.5},
    Math.PI / 2,
    'german-idealism-novalis-eichens-1845',
    1.98,
    2.7,
    'idealism-context',
    GERMAN_IDEALISM_PALETTE.critiqueBlue,
  ),
  layout(
    'afterlives-runge-morning',
    'german-idealism',
    'hegel',
    'german-idealism-afterlives-room',
    {x: -5.55, z: 26.88},
    Math.PI,
    'german-idealism-runge-morning-1808',
    2.05,
    2.7,
    'idealism-work',
    GERMAN_IDEALISM_PALETTE.natureGreen,
  ),
  layout(
    'afterlives-young-hegelians',
    'hegel',
    'hegel',
    'german-idealism-afterlives-room',
    {x: 5.55, z: 15.12},
    0,
    'german-idealism-young-hegelians-engels',
    3.1,
    2.45,
    'idealism-context',
    GERMAN_IDEALISM_PALETTE.activityRed,
  ),
  layout(
    'afterlives-feuerbach',
    'hegel',
    'hegel',
    'german-idealism-afterlives-room',
    {x: 10.85, z: 21},
    -Math.PI / 2,
    'german-idealism-feuerbach-c1840',
    1.74,
    2.7,
    'idealism-concept',
    GERMAN_IDEALISM_PALETTE.dialecticGold,
  ),
  layout(
    'afterlives-strauss',
    'hegel',
    'hegel',
    'german-idealism-afterlives-room',
    {x: 5.55, z: 26.88},
    Math.PI,
    'german-idealism-strauss-rijksmuseum',
    1.72,
    2.7,
    'idealism-concept',
    GERMAN_IDEALISM_PALETTE.archiveCharcoal,
  ),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getGermanIdealismSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const record = GERMAN_IDEALISM_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!record) throw new Error(`Gallery 19 supplemental exhibit ${id} is missing.`);
  return record;
};
