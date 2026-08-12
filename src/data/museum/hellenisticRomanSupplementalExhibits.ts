import type {MuseumAssetId} from './museumAssetTypes';
import {
  getHellenisticRomanInstallationSlot,
  HELLENISTIC_ROMAN_GALLERY_ID,
  HELLENISTIC_ROMAN_ROOM_SIGN_COPY,
} from './hellenisticRomanGalleryCuration';
import {
  authorSupplementalExhibit,
  authorSupplementalLayout,
  type SupplementalExhibitAuthoring,
} from './museumSupplementalAuthoring';
import type {
  MuseumSupplementalExhibit,
  MuseumSupplementalInterpretationSource,
  MuseumSupplementalVisitorGuideSection,
  MuseumSupplementalWallPlaque,
} from './platoSupplementalExhibits';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
  MuseumSupplementalInstallationKind,
} from './museumWorldTypes';

export {HELLENISTIC_ROMAN_GALLERY_ID, HELLENISTIC_ROMAN_ROOM_SIGN_COPY};

export const HELLENISTIC_ROMAN_PALETTE = Object.freeze({
  ink: '#211d1b',
  cynic: '#a0693f',
  garden: '#70805d',
  stoic: '#4d677d',
  skeptic: '#74627d',
  bronze: '#a7854a',
  parchment: '#e8ddc6',
});

type ReviewedSupplementalInput = Omit<SupplementalExhibitAuthoring, 'panelKicker' | 'sections' | 'sources'> & {
  sections: readonly {paragraph: string; sourceIds: readonly string[]}[];
  visitorGuide: readonly MuseumSupplementalVisitorGuideSection[];
  sources: readonly MuseumSupplementalInterpretationSource[];
  objectInterpretation: string;
  wallPlaque: MuseumSupplementalWallPlaque;
  resolution: string;
  lock: string;
};

const record = (input: ReviewedSupplementalInput): MuseumSupplementalExhibit => {
  const authored = authorSupplementalExhibit({
    ...input,
    sections: input.sections.map(({paragraph}) => ({heading: '', paragraph})),
    sources: input.sources,
    panelKicker: 'Gallery 02 supplemental exhibit',
  });
  return {
    ...authored,
    sections: input.sections.map(({paragraph, sourceIds}) => ({heading: '', paragraphs: [paragraph], sourceIds})),
    visitorGuide: input.visitorGuide,
    objectInterpretation: input.objectInterpretation,
    presentation: {...authored.presentation!, exhibitLayout: 'object-led'},
    wallPlaque: input.wallPlaque,
    review: {
      status: 'standard-compliant',
      reviewedOn: '2026-08-12',
      method: 'Gallery 02 supplemental review: object identity, claims, source mapping, rights, accessibility, provenance, subject-specific structured interpretation, and aspect-safe object-led presentation.',
      resolution: input.resolution,
      lock: input.lock,
    },
  };
};

export const HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBITS = [
  record({
    id: 'cynic-frank-speech-in-public', assetId: 'cynic-diogenes-honest-man',
    displayName: 'Diogenes with His Lantern', shortTitle: 'Diogenes with His Lantern',
    workLabel: 'PIETER VAN MOL · EARLY-MODERN CYNIC RECEPTION', dateLabel: 'c. 1620–1650 · oil on panel · later reception',
    question: 'How can a late anecdote turn a philosopher’s way of life into a public challenge?',
    frontSubtitle: 'Van Mol’s imagined Diogenes opens a careful inquiry into frank speech, performance, and the limits of anecdotal biography.',
    lead: 'Pieter van Mol’s seventeenth-century painting dramatizes the later story of Diogenes searching by lamplight for an honest human being. It is reception art, not documentary evidence.',
    keyIdeas: ['The lamp anecdote survives in a source written centuries after Diogenes.', 'Cynic frank speech joins risk-taking speech to practiced independence.', 'Anecdotes transmit philosophical exemplars while reshaping biography.'],
    cautions: ['The painting is not a likeness or record of an event.', 'Frank speech is not made true merely by being provocative.'],
    sections: [
      {paragraph: 'Pieter van Mol painted this dark, crowded encounter around 1620–1650, almost two thousand years after Diogenes lived. At the right, an elderly white-bearded figure holds a lantern toward the faces gathered around him. The scene visualizes a story reported by Diogenes Laertius: Diogenes lit a lamp in daylight and said that he was looking for a human being. Van Mol turns that compact saying into theatrical reception art. The painting is not a portrait made from life, evidence that the event occurred, or a view of an ancient street. It shows how later viewers learned to recognize Diogenes through a memorable prop and gesture.', sourceIds: ['diogenes-commons', 'diogenes-sothebys', 'diogenes-laertius-six']},
      {paragraph: 'The philosophical force of the story lies less in an impossible search for one literally honest person than in the Cynic use of performance to expose convention. Ancient reports associate Diogenes with askēsis, the training that reduces dependence on possessions and approval, and parrhesia, frank speech that can confront rulers, patrons, and crowds. A speaker with little to lose may challenge habits that wealth or rank protects from criticism. Yet provocation is not automatically truthful. Cynic freedom matters when a gesture reveals a real contradiction between professed values and lived dependence, not when offense becomes an end in itself.', sourceIds: ['diogenes-laertius-six', 'diogenes-iep-cynics']},
      {paragraph: 'Nearly everything known about Diogenes reaches us through writers who lived much later and arranged sayings into vivid character scenes. Such anecdotes can preserve an ethical posture—reduced need, shameless testing, humor, and fearless address—while remaining insecure as literal biography. The lantern therefore belongs to two histories at once. It helps explain why conduct could function as a Cynic argument, and it reveals how reception condensed a difficult philosophical life into an image that traveled easily. Reading the painting critically does not drain it of meaning; it lets the object teach both Cynic practice and the care required when philosophy survives through retelling.', sourceIds: ['diogenes-laertius-six', 'diogenes-iep-cynics']},
    ],
    visitorGuide: [
      {
        heading: 'The lantern as performance',
        items: [
          {label: 'Public gesture', description: 'The daylight search stages criticism before an audience rather than offering a literal census of honest people.', sourceIds: ['diogenes-laertius-six', 'diogenes-iep-cynics']},
          {label: 'Practiced freedom', description: 'Cynic frank speech gains force from training that reduces dependence on possessions, rank, and approval.', sourceIds: ['diogenes-laertius-six', 'diogenes-iep-cynics']},
        ],
      },
      {
        heading: 'Anecdote and evidence',
        items: [
          {label: 'Late report', description: 'Diogenes Laertius preserves the lamp story centuries after Diogenes lived.', sourceIds: ['diogenes-laertius-six']},
          {label: 'Reception image', description: 'Van Mol’s painting shows the anecdote’s later visual power, not the appearance of an ancient event.', sourceIds: ['diogenes-commons', 'diogenes-sothebys']},
        ],
      },
    ],
    sources: [
      {id: 'diogenes-commons', label: 'Wikimedia Commons: Pieter van Mol, Diogenes with His Lantern', url: 'https://commons.wikimedia.org/wiki/File:Pieter_van_Mol_-_Diogenes_with_his_lantern_looking_for_an_honest_man.jpg', kind: 'collection-record'},
      {id: 'diogenes-sothebys', label: 'Sotheby’s: Pieter van Mol, Diogenes with His Lantern Looking for an Honest Man', url: 'https://www.sothebys.com/en/buy/auction/2022/master-paintings-sculpture-part-i/diogenes-with-his-lantern-looking-for-an-honest', kind: 'collection-record'},
      {id: 'diogenes-laertius-six', label: 'Diogenes Laertius, Lives of Eminent Philosophers VI.41 and VI.69 (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0258:book=6', kind: 'primary-text'},
      {id: 'diogenes-iep-cynics', label: 'Internet Encyclopedia of Philosophy: Cynics', url: 'https://iep.utm.edu/cynics/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'Van Mol’s early-modern painting gives the lamp anecdote a dramatic cast and audience. It documents Diogenes’s later visual reception, not his appearance or a witnessed ancient event.',
    articleRoute: {kind: 'philosopher', philosopherId: 'diogenes'}, entityKind: 'philosopher', articleActionLabel: 'Read the full sourced Diogenes article',
    wallPlaque: {type: 'reception-or-transmission-history', title: 'Diogenes with His Lantern', invitation: 'Van Mol’s imagined Diogenes turns a late lamp anecdote into a challenge about Cynic frank speech, practiced independence, and the uncertain line between philosophical example and biography.', canonicalContexts: [{kind: 'philosopher', id: 'diogenes'}]},
    resolution: 'Resolved: identified van Mol’s painting as early-modern reception, mapped the anecdote and frank speech, restored a claim-mapped performance-and-evidence sidebar, and matched the wall frame to the complete painting.', lock: 'fnv1a64:9653206a85f4ec0c',
  }),
  record({
    id: 'cynic-hipparchia-crates', assetId: 'cynic-hipparchia-crates-print',
    displayName: 'Hipparchia and Crates', shortTitle: 'Hipparchia and Crates',
    workLabel: 'CRISPIJN VAN DEN QUEBORN AFTER JACOB GERRITSZ. CUYP', dateLabel: '1643 · Rijksmuseum RP-P-1938-2026',
    question: 'What can a much later image reveal about the contested memory of a shared Cynic life?',
    frontSubtitle: 'A 1643 book illustration opens a cautious account of Hipparchia, Crates, philosophical partnership, and gendered public roles.',
    lead: 'This Dutch print imagines Crates proposing marriage to Hipparchia. It visualizes later testimony about their Cynic partnership rather than documenting their appearance or meeting.',
    keyIdeas: ['Later testimony presents Hipparchia as choosing Cynic practice with Crates.', 'Her public philosophical presence challenges the gendered limits of the surviving canon.', 'Sparse evidence requires uncertainty without erasure.'],
    cautions: ['The principal narrative is a late literary report.', 'The print uses seventeenth-century conventions to imagine antiquity.'],
    sections: [
      {paragraph: 'Crispijn van den Queborn made this book illustration in 1643 after a design by Jacob Gerritsz. Cuyp. Hipparchia sits beside a table and books while Crates stands before her; Dutch verse surrounds the scene. The Rijksmuseum identifies the episode as Crates proposing marriage. Nothing here is documentary portraiture. The print was made almost two millennia after the pair lived and clothes the story in early-modern visual conventions. Its value is reception: it shows that later European readers encountered Hipparchia not merely as a name beside Crates, but as a figure whose decision required a pictured moment of confrontation and choice.', sourceIds: ['hipparchia-rijksmuseum', 'hipparchia-commons']},
      {paragraph: 'The underlying account comes chiefly from Diogenes Laertius, writing centuries after the fourth-century BCE setting. He reports that Hipparchia rejected wealthy suitors, chose Crates and his way of life, adopted Cynic dress, and appeared in public philosophical exchange. The same source preserves an argument directed at Theodorus and mentions writings that no longer survive. These details are important but cannot be read as an eyewitness biography. They arrive through a male-authored literary tradition that valued memorable reversals and exemplary lives. Careful interpretation therefore says that later testimony presents a shared Cynic vocation; it does not pretend to recover every motive, conversation, or event.', sourceIds: ['hipparchia-laertius-six', 'hipparchia-iep']},
      {paragraph: 'Even under that caution, Hipparchia changes the philosophical picture. Cynic independence is often imagined as the achievement of a solitary man who abandons household and status. Her remembered partnership with Crates makes relation itself part of the question: can two people train together against artificial needs, and who is permitted to make such a life visible in public? The reports do not yield a modern theory of gender equality, and the print’s proposal scene can domesticate the very challenge it records. Yet excluding Hipparchia because the archive is sparse would reproduce the archive’s imbalance. Her presence exposes how social power shaped both ancient participation and later canons of philosophy.', sourceIds: ['hipparchia-laertius-six', 'hipparchia-iep']},
    ],
    visitorGuide: [
      {
        heading: 'Choosing a Cynic life',
        items: [
          {label: 'Reported decision', description: 'Later testimony presents Hipparchia as rejecting wealthy suitors and choosing Crates’s way of life.', sourceIds: ['hipparchia-laertius-six', 'hipparchia-iep']},
          {label: 'Shared practice', description: 'Her remembered public argument and Cynic dress make partnership part of philosophical practice.', sourceIds: ['hipparchia-laertius-six', 'hipparchia-iep']},
        ],
      },
      {
        heading: 'Reading a sparse archive',
        items: [
          {label: 'Late testimony', description: 'The main narrative is not eyewitness biography and preserves no secure transcript of the proposal.', sourceIds: ['hipparchia-laertius-six', 'hipparchia-iep']},
          {label: 'Gendered canon', description: 'Uncertainty should qualify the account without erasing a woman whom the surviving tradition already marginalizes.', sourceIds: ['hipparchia-laertius-six', 'hipparchia-iep']},
        ],
      },
    ],
    sources: [
      {id: 'hipparchia-rijksmuseum', label: 'Rijksmuseum: Hipparchia and Crates, RP-P-1938-2026', url: 'https://www.rijksmuseum.nl/nl/collectie/object/Hipparchia-en-Krates--7a0ca4174aff943d9543754550034db9', kind: 'collection-record'},
      {id: 'hipparchia-commons', label: 'Wikimedia Commons: Hipparchia and Crates reproduction and CC0 record', url: 'https://commons.wikimedia.org/wiki/File:Hipparchia_en_Krates,_RP-P-1938-2026.jpg', kind: 'collection-record'},
      {id: 'hipparchia-laertius-six', label: 'Diogenes Laertius, Lives of Eminent Philosophers VI.96–98 (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0258:book=6', kind: 'primary-text'},
      {id: 'hipparchia-iep', label: 'Internet Encyclopedia of Philosophy: Hipparchia', url: 'https://iep.utm.edu/hipparch/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'The 1643 print imagines the proposal scene through Dutch book illustration. It is evidence for Hipparchia and Crates in later reception, not for their physical appearance or the literal form of their encounter.',
    articleRoute: {kind: 'branch', branchId: 'cynicism'}, entityKind: 'branch', articleActionLabel: 'Read the full sourced Cynicism article',
    wallPlaque: {type: 'paired-or-grouped-historical-figures', title: 'Hipparchia and Crates', invitation: 'A 1643 proposal scene introduces later testimony about Hipparchia and Crates, whose remembered Cynic partnership tests gendered expectations about who may live and argue publicly as a philosopher.', canonicalContexts: [{kind: 'branch', id: 'cynicism'}]},
    resolution: 'Resolved: corrected the Rijksmuseum print’s credit, distinguished reception from ancient evidence, restored a claim-mapped choice-and-archive sidebar, and confirmed the complete print’s natural 3:5 wall format.', lock: 'fnv1a64:1e272ed138041b1f',
  }),
  record({
    id: 'cynic-cosmopolitan-constellation', assetId: 'cynic-philosophers-constellation',
    displayName: 'Cynic Cosmopolitanism', shortTitle: 'Cynic Cosmopolitanism',
    workLabel: 'JOHN WILLIAM COOK · PRINTED PHILOSOPHER CANON', dateLabel: '1825 · Wellcome Collection 546725i',
    question: 'What does “citizen of the world” claim—and what did later canons add to it?',
    frontSubtitle: 'A nineteenth-century portrait grid frames the attributed Cynic refusal of exclusive civic identity and the disputed lineages built around it.',
    lead: 'Cook’s imagined portrait grid includes Antisthenes and Diogenes among twenty ancient thinkers. It is a later classification, not an ancient Cynic genealogy.',
    keyIdeas: ['Diogenes is reported to have called himself a citizen of the world.', 'The fragmentary claim refuses an exclusive civic identity without specifying a world-state.', 'Later succession stories and portrait grids organize uncertain evidence into canons.'],
    cautions: ['The printed faces are imagined likenesses.', 'Cynic cosmopolitanism is not identical to later Stoic theory or modern international institutions.'],
    sections: [
      {paragraph: 'John William Cook’s 1825 engraving arranges twenty labeled philosopher busts beneath the heading “Ancient Philosophers.” Antisthenes and Diogenes appear among figures drawn from different centuries and schools. The Wellcome Collection describes the sheet as a group portrait, but none of these engraved faces should be treated as a secure likeness. Nor is the grid a Cynic family tree. It is a nineteenth-century instrument of classification that makes a canon look simultaneous, settled, and visible. Precisely because it is so orderly, the print helps reveal how later reference culture can compress disputed relationships and uneven evidence into a memorable gallery of names.', sourceIds: ['cosmopolitan-wellcome', 'cosmopolitan-commons']},
      {paragraph: 'The philosophical center of the exhibit is a much older report. Diogenes Laertius says that when Diogenes was asked where he came from, he replied that he was a kosmopolitēs, a citizen of the world. The answer refuses to let one polis, birthplace, or inherited rank exhaust a person’s identity. Its positive institutional meaning remains uncertain. The surviving evidence does not show Diogenes proposing a world government or a developed system of equal global citizenship. The challenge begins as a critical loosening of local status, asking what obligations and freedoms remain when conventional membership no longer supplies the final measure of a life.', sourceIds: ['cosmopolitan-laertius-six', 'cosmopolitan-sep']},
      {paragraph: 'Cynic genealogy is similarly reconstructed. Later sources connect Socrates, Antisthenes, Diogenes, Crates, Hipparchia, and Stoic successors, but the links do not form an uncontested institutional succession. Claiming Socratic ancestry gave Cynic training and frank speech a prestigious origin; print culture then gave those relationships imagined faces. Later Stoics developed cosmopolitan ideas within a systematic account of nature, law, and mutual obligation that should not be read back into Diogenes’s brief refusal. Cook’s portrait grid therefore becomes a productive warning: lineage and cosmopolitanism both acquire clearer structure in reception than the fragmentary ancient evidence alone can securely provide.', sourceIds: ['cosmopolitan-laertius-six', 'cosmopolitan-iep-cynics', 'cosmopolitan-sep']},
    ],
    visitorGuide: [
      {
        heading: 'A phrase with limits',
        items: [
          {label: 'Critical refusal', description: 'Diogenes’s attributed kosmopolitēs reply refuses to let one polis or inherited status define the whole person.', sourceIds: ['cosmopolitan-laertius-six', 'cosmopolitan-sep']},
          {label: 'No world-state', description: 'The fragment does not set out a government, constitution, or complete theory of global citizenship.', sourceIds: ['cosmopolitan-laertius-six', 'cosmopolitan-sep']},
        ],
      },
      {
        heading: 'How lineages are made',
        items: [
          {label: 'Printed canon', description: 'Cook’s grid makes different periods and disputed affiliations appear settled and simultaneous.', sourceIds: ['cosmopolitan-wellcome', 'cosmopolitan-commons']},
          {label: 'Later system', description: 'Stoic cosmopolitanism developed claims about nature, law, and obligation that should not be read back into the brief Cynic saying.', sourceIds: ['cosmopolitan-iep-cynics', 'cosmopolitan-sep']},
        ],
      },
    ],
    sources: [
      {id: 'cosmopolitan-wellcome', label: 'Wellcome Collection: Philosophers—Twenty Portraits of Ancient Thinkers', url: 'https://wellcomecollection.org/works/s4k9sh5j', kind: 'collection-record'},
      {id: 'cosmopolitan-commons', label: 'Wikimedia Commons: Cook portrait grid and CC BY 4.0 record', url: 'https://commons.wikimedia.org/wiki/File:Philosophers;_twenty_portraits_of_classical_thinkers._Engrav_Wellcome_V0006810.jpg', kind: 'collection-record'},
      {id: 'cosmopolitan-laertius-six', label: 'Diogenes Laertius, Lives of Eminent Philosophers VI.63 (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0258:book=6', kind: 'primary-text'},
      {id: 'cosmopolitan-iep-cynics', label: 'Internet Encyclopedia of Philosophy: Cynics', url: 'https://iep.utm.edu/cynics/', kind: 'academic-reference'},
      {id: 'cosmopolitan-sep', label: 'Stanford Encyclopedia of Philosophy: Cosmopolitanism', url: 'https://plato.stanford.edu/entries/cosmopolitanism/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'Cook’s 1825 grid turns philosophers from different periods into a single printed canon. It contains imagined portraits and a later taxonomy, not evidence for a formal Cynic succession.',
    articleRoute: {kind: 'branch', branchId: 'cynicism'}, entityKind: 'branch', articleActionLabel: 'Read the full sourced Cynicism article',
    wallPlaque: {type: 'concept-argument-diagram-or-method', title: 'Cynic Cosmopolitanism', invitation: 'An imagined portrait canon frames Diogenes’s attributed claim to be a citizen of the world—a critical refusal that later Stoics developed into a more systematic cosmopolitan theory.', canonicalContexts: [{kind: 'branch', id: 'cynicism'}]},
    resolution: 'Resolved: recast the portrait grid as nineteenth-century reception, separated the Cynic saying from later Stoic theory, restored a claim-mapped phrase-and-lineage sidebar, and matched the wall frame to the complete print.', lock: 'fnv1a64:fed375424943dbc9',
  }),
  record({
    id: 'epicurean-fourfold-remedy', assetId: 'epicurean-tetrapharmakos',
    displayName: 'The Epicurean Inscription at Oinoanda', shortTitle: 'The Epicurean Inscription at Oinoanda',
    workLabel: 'DIOGENES OF OINOANDA · MONUMENTAL PUBLIC TEXT', dateLabel: 'Second century CE · photographed fragment',
    question: 'What changes when philosophical therapy is carved into a public wall?',
    frontSubtitle: 'A photographed fragment opens Epicurean physics and ethics as teaching addressed to citizens, visitors, and future readers.',
    lead: 'Diogenes of Oinoanda commissioned a monumental Epicurean inscription in second-century Lycia. The displayed fragment belongs to that public project, not to the fourfold-remedy papyrus.',
    keyIdeas: ['The inscription carried Epicurean teaching into civic space.', 'Epicurean therapy links freedom from fear to arguments about nature, mortality, pleasure, and desire.', 'A fragment reveals both public ambition and severe material loss.'],
    cautions: ['This photographed block does not contain the tetrapharmakos wording.', 'The surviving fragments do not reconstruct one perfectly complete wall text.'],
    sections: [
      {paragraph: 'The photograph shows a weathered stone block from the monumental Greek inscription commissioned by Diogenes of Oinoanda in Lycia during the second century CE. Lines of text remain visible across its face, while other inscribed blocks and ruined masonry surround it. This fragment belongs to an extraordinary public act of philosophical publication. Diogenes placed Epicurean arguments in civic space for fellow citizens, visitors, and future readers, turning a school tradition encountered in books and communities into architecture in the open.', sourceIds: ['oinoanda-commons', 'oinoanda-oxford']},
      {paragraph: 'Epicurean therapy was not a collection of encouraging slogans detached from explanation. Arguments about atoms and void aimed to remove fear of divine intervention; the claim that death is nothing to us depends on the end of sensation; and the analysis of desire distinguishes needs that are natural and necessary from pursuits that expand without limit. Pleasure, on this account, is not continuous excess but freedom from bodily pain and mental disturbance, sustained by prudent choice, friendship, and a sober understanding of nature. Diogenes’s inscription carried this connected program into a later Roman imperial setting, showing Epicureanism as a living practice rather than a doctrine sealed in the founder’s Garden.', sourceIds: ['oinoanda-epicurus-book-ten', 'oinoanda-sep-epicurus', 'oinoanda-oxford']},
      {paragraph: 'The object also makes loss unavoidable. The inscription survives in scattered blocks whose positions and readings scholars continue to reconstruct. A fragment cannot display the whole philosophical sequence, identify every neighboring passage, or prove how any particular passerby responded. Its importance lies in scale and address: Diogenes used durable stone and public placement to offer what he regarded as intellectual and ethical help beyond a private circle. The broken block therefore holds together confidence and vulnerability. Epicurean reasoning was presented as transmissible across distance and generations, yet the material record through which that ambition reaches the present remains partial, displaced, and dependent on continuing archaeological and editorial work.', sourceIds: ['oinoanda-commons', 'oinoanda-oxford']},
    ],
    visitorGuide: [
      {
        heading: 'Philosophy in public stone',
        items: [
          {label: 'Civic address', description: 'Diogenes of Oinoanda placed Epicurean teaching where citizens, visitors, and later readers could encounter it.', sourceIds: ['oinoanda-oxford']},
          {label: 'Connected therapy', description: 'Arguments about nature, mortality, pleasure, and desire support the ethical promise rather than functioning as detached slogans.', sourceIds: ['oinoanda-epicurus-book-ten', 'oinoanda-sep-epicurus', 'oinoanda-oxford']},
        ],
      },
      {
        heading: 'The fragment and the whole',
        items: [
          {label: 'What survives', description: 'The photographed block preserves part of the monumental inscription and its ambition to teach durably in public.', sourceIds: ['oinoanda-commons', 'oinoanda-oxford']},
          {label: 'What remains open', description: 'This block does not contain the fourfold-remedy wording, and scattered fragments cannot recover one complete wall without editorial reconstruction.', sourceIds: ['oinoanda-commons', 'oinoanda-oxford']},
        ],
      },
    ],
    sources: [
      {id: 'oinoanda-commons', label: 'Wikimedia Commons: Oinoanda inscription fragment and CC BY-SA 3.0 record', url: 'https://commons.wikimedia.org/wiki/File:OinoandaInscription.JPG', kind: 'collection-record'},
      {id: 'oinoanda-oxford', label: 'Oxford Handbook of Epicurus and Epicureanism: Diogenes of Oenoanda', url: 'https://academic.oup.com/edited-volume/34518/chapter-abstract/292885388', kind: 'academic-reference'},
      {id: 'oinoanda-epicurus-book-ten', label: 'Diogenes Laertius, Lives of Eminent Philosophers X: Epicurus’s letters and doctrines (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0130:book=10', kind: 'primary-text'},
      {id: 'oinoanda-sep-epicurus', label: 'Stanford Encyclopedia of Philosophy: Epicurus', url: 'https://plato.stanford.edu/entries/epicurus/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'The photographed block belongs to Diogenes of Oinoanda’s public Epicurean inscription. It materializes philosophical teaching in civic space but does not contain the fourfold-remedy wording.',
    articleRoute: {kind: 'branch', branchId: 'epicureanism'}, entityKind: 'branch', articleActionLabel: 'Read the full sourced Epicureanism article',
    wallPlaque: {type: 'object-manuscript-site-or-archaeological-context', title: 'The Epicurean Inscription at Oinoanda', invitation: 'Diogenes of Oinoanda carved Epicurean physics and ethics into a public monument, extending philosophy as therapy beyond a school community to citizens, visitors, and imagined future readers.', canonicalContexts: [{kind: 'branch', id: 'epicureanism'}]},
    resolution: 'Resolved: retitled the exhibit around the installed Oinoanda fragment, corrected its object record, restored a claim-mapped public-stone-and-fragment sidebar, and replaced the landscape wall aperture with the photograph’s natural 3:4 portrait format.', lock: 'fnv1a64:9adaf7e68465a70c',
  }),
  record({
    id: 'epicurean-philodemus-library', assetId: 'epicurean-philodemus-subscription',
    displayName: 'Athena from the Villa of the Papyri', shortTitle: 'Athena from the Villa of the Papyri',
    workLabel: 'ROMAN VILLA · SCULPTURE COLLECTION · PHILOSOPHICAL LIBRARY', dateLabel: 'Roman period · excavated at Herculaneum · photographed 2014',
    question: 'What can one villa reveal—and not reveal—about Epicurean philosophy in Roman elite life?',
    frontSubtitle: 'A Villa sculpture introduces the library environment in which many Philodemus texts survived without turning Athena into an Epicurean emblem.',
    lead: 'This Athena was recovered from the Villa of the Papyri, whose library preserved many Epicurean and Philodemus texts. The statue is material context, not a portrait or doctrinal image.',
    keyIdeas: ['The Villa joined sculpture, domestic display, status, and a Greek philosophical library.', 'Many surviving rolls are Epicurean and associated with Philodemus.', 'Ownership, residence, copying, and use remain partly conjectural.'],
    cautions: ['The statue does not identify a papyrus author or Epicurean cult practice.', 'The Villa should not be called Philodemus’s personal library as settled fact.'],
    sections: [
      {paragraph: 'The displayed marble Athena, photographed in the National Archaeological Museum in Naples, was recovered from the Villa of the Papyri at Herculaneum. Helmeted and extending her aegis, she once belonged to a rich sculptural environment of Greek cultural display inside a Roman villa. The object does not portray Philodemus, identify a scroll, or function as evidence for an Epicurean cult of Athena. Its value is architectural and social. It returns philosophy to a furnished place where statues, gardens, patrons, servants, readers, and a substantial collection of Greek books coexisted, complicating the idea that Epicurean life simply withdrew from Roman wealth and public hierarchy.', sourceIds: ['villa-athena-commons', 'villa-papyri-society']},
      {paragraph: 'The Villa’s carbonized library preserves the only ancient collection to survive on anything like this scale. Most of its identified philosophical texts are Epicurean, and many are works by Philodemus of Gadara or materials closely connected with his scholarship. They range across ethics, rhetoric, poetry, music, theology, logic, school history, and arguments against rivals. That breadth presents Epicureanism as continuing inquiry rather than a short list of maxims inherited unchanged from Epicurus. It also reveals a Greek intellectual tradition moving within Roman networks of patronage. The rolls give unusually direct evidence for what was read and debated, but the surviving collection is damaged and incomplete.', sourceIds: ['villa-papyri-society', 'villa-sep-philodemus']},
      {paragraph: 'Important limits remain. No ancient testimony securely establishes that Philodemus lived in the Villa, owned its library, supervised its copying, or arranged every roll now associated with the site. Scholars have proposed relationships between the collection, Philodemus, and the Roman Piso family, but those reconstructions must remain visible as arguments rather than facts built into a label. Athena is useful precisely because she refuses a narrow literary picture. The Villa was not only a container for texts; it was an elite household and collection whose material culture shaped the setting in which philosophy circulated. The statue anchors that environment while the papyri, not her image, establish the Epicurean and Philodemean content.', sourceIds: ['villa-athena-commons', 'villa-sep-philodemus', 'villa-papyri-society']},
    ],
    visitorGuide: [
      {
        heading: 'A sculpture in the library setting',
        items: [
          {label: 'Villa context', description: 'Athena belonged to the elite sculptural and domestic environment in which the papyrus collection survived.', sourceIds: ['villa-athena-commons', 'villa-papyri-society']},
          {label: 'No doctrinal emblem', description: 'The statue is neither Philodemus nor evidence for an Epicurean cult of Athena.', sourceIds: ['villa-athena-commons', 'villa-papyri-society']},
        ],
      },
      {
        heading: 'What the papyri establish',
        items: [
          {label: 'Epicurean holdings', description: 'Many identified philosophical rolls are Epicurean, including numerous works associated with Philodemus.', sourceIds: ['villa-papyri-society', 'villa-sep-philodemus']},
          {label: 'Open questions', description: 'Residence, ownership, patronage, copying, and the collection’s arrangement remain partly reconstructed rather than settled.', sourceIds: ['villa-papyri-society', 'villa-sep-philodemus']},
        ],
      },
    ],
    sources: [
      {id: 'villa-athena-commons', label: 'Wikimedia Commons: Athena from the Villa of the Papyri and CC BY-SA 2.0 record', url: 'https://commons.wikimedia.org/wiki/File:From_the_Villa_of_the_Papyri_in_Herculaneum,_Naples_National_Archaeological_Museum_(49439110928).jpg', kind: 'collection-record'},
      {id: 'villa-papyri-society', label: 'The Herculaneum Society: The Papyri', url: 'https://www.herculaneum.ox.ac.uk/index.php/papyri/', kind: 'academic-reference'},
      {id: 'villa-sep-philodemus', label: 'Stanford Encyclopedia of Philosophy: Philodemus', url: 'https://plato.stanford.edu/entries/philodemus/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'Athena locates the papyrus library within the Villa’s elite sculptural and domestic setting. She is not Philodemus, an Epicurean cult image, or evidence that he owned or lived in the Villa.',
    articleRoute: {kind: 'branch', branchId: 'epicureanism'}, entityKind: 'branch', articleActionLabel: 'Read the full sourced Epicureanism article',
    wallPlaque: {type: 'object-manuscript-site-or-archaeological-context', title: 'Athena from the Villa of the Papyri', invitation: 'A Villa sculpture places the Epicurean and Philodemean library inside Roman elite material life while keeping uncertain claims about Philodemus’s residence, ownership, and patronage open.', canonicalContexts: [{kind: 'branch', id: 'epicureanism'}]},
    resolution: 'Resolved: identified the installed Athena, qualified the Villa and Philodemus claims, restored a claim-mapped sculpture-and-papyri sidebar, and matched the wall frame to the complete photograph.', lock: 'fnv1a64:b59f1e29fdabcec0',
  }),
  record({
    id: 'epicurean-herculaneum-afterlife', assetId: 'epicurean-herculaneum-papyrus',
    displayName: 'Piaggio’s Papyrus-Unrolling Machine', shortTitle: 'Piaggio’s Papyrus-Unrolling Machine',
    workLabel: 'ANTONIO PIAGGIO · HERCULANEUM CONSERVATION', dateLabel: 'Eighteenth-century device · diagram published 1858',
    question: 'How can opening a text make knowledge possible while destroying part of its evidence?',
    frontSubtitle: 'Castrucci’s diagram connects carbonization, mechanical unrolling, copied layers, modern imaging, and the ethics of reconstruction.',
    lead: 'This 1858 diagram records Antonio Piaggio’s apparatus for opening carbonized Herculaneum rolls. It is a conservation image, not a papyrus page.',
    keyIdeas: ['The eruption both preserved and damaged the rolls.', 'Mechanical unrolling exposed writing while risking irreversible loss.', 'Imaging adds evidence but does not eliminate interpretation or uncertainty.'],
    cautions: ['Not every Herculaneum roll is Epicurean or attributable to Philodemus.', 'A reconstruction should keep copied, imaged, inferred, and missing material distinct.'],
    sections: [
      {paragraph: 'Giacomo Castrucci published this technical diagram in 1858 to show the apparatus devised by Antonio Piaggio in the eighteenth century for opening Herculaneum papyri. Threads, rollers, weights, supports, and a mounted scroll turn an apparently simple act—unrolling a book—into a slow mechanical operation. The diagram contains no ancient philosophical text; it documents the conservation history through which such texts became available. The rolls had been carbonized in the eruption of Vesuvius in 79 CE: buried and blackened by the same disaster that enabled their exceptional survival.', sourceIds: ['piaggio-commons', 'piaggio-herculaneum-society']},
      {paragraph: 'Physical opening created knowledge and loss together. Charred layers could adhere, split, crumble, or preserve writing on surfaces later peeled away. Piaggio’s method was more controlled than many earlier attempts, but it did not transform fragile rolls into intact modern books. Copies made during unrolling sometimes retain letters from layers that subsequently deteriorated, which gives those drawings evidential value of their own while also introducing a copyist’s possible errors. Philological reconstruction must therefore distinguish the ancient ink, the order of damaged layers, an early drawing, a modern edition, and editorial inference. A recovered argument is never independent of the material and technical path by which it was read.', sourceIds: ['piaggio-herculaneum-society', 'piaggio-sep-philodemus']},
      {paragraph: 'Modern multispectral imaging and noninvasive scanning change what can be examined without pretending to restore a pristine original. Different wavelengths can clarify ink on darkened surfaces, while digital models may help readers analyze rolled or fragmentary structures. Each process produces new data and new decisions about alignment, contrast, segmentation, and proposed sequence. Those choices must remain documented and open to correction. The Villa collection contains many Epicurean and Philodemean works, but not every Herculaneum papyrus belongs to that school or author. Castrucci’s machine makes the central lesson visible: intellectual history here depends on conservation, and responsible interpretation advances by preserving uncertainty alongside every newly legible line.', sourceIds: ['piaggio-herculaneum-society', 'piaggio-sep-philodemus']},
    ],
    visitorGuide: [
      {
        heading: 'Reading through intervention',
        items: [
          {label: 'Controlled opening', description: 'Piaggio’s mechanism opened carbonized rolls gradually, but their adhered layers could still split, peel, or crumble.', sourceIds: ['piaggio-herculaneum-society']},
          {label: 'Layered evidence', description: 'Ancient ink, early copies, damaged surfaces, modern editions, and editorial inference must remain distinguishable.', sourceIds: ['piaggio-herculaneum-society', 'piaggio-sep-philodemus']},
        ],
      },
      {
        heading: 'New tools, continuing judgment',
        items: [
          {label: 'Imaging', description: 'Noninvasive techniques can reveal more data while introducing choices about contrast, alignment, and sequence.', sourceIds: ['piaggio-herculaneum-society', 'piaggio-sep-philodemus']},
          {label: 'Attribution', description: 'The Villa holds many Epicurean and Philodemean texts, but not every roll belongs to that school or author.', sourceIds: ['piaggio-herculaneum-society', 'piaggio-sep-philodemus']},
        ],
      },
    ],
    sources: [
      {id: 'piaggio-commons', label: 'Wikimedia Commons: Castrucci’s diagram of Piaggio’s papyrus-unrolling machine', url: 'https://commons.wikimedia.org/wiki/File:Abbot_Piaggios_machine_Device-to-unroll-papyri_1756_Vatican.jpg', kind: 'collection-record'},
      {id: 'piaggio-herculaneum-society', label: 'The Herculaneum Society: The Papyri', url: 'https://www.herculaneum.ox.ac.uk/index.php/papyri/', kind: 'academic-reference'},
      {id: 'piaggio-sep-philodemus', label: 'Stanford Encyclopedia of Philosophy: Philodemus—papyri, unrolling, and reconstruction', url: 'https://plato.stanford.edu/entries/philodemus/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'Castrucci’s diagram explains the mechanism used to open fragile carbonized rolls. It belongs to their eighteenth- and nineteenth-century conservation history, not to the ancient library itself.',
    articleRoute: {kind: 'branch', branchId: 'epicureanism'}, entityKind: 'branch', articleActionLabel: 'Read the full sourced Epicureanism article',
    wallPlaque: {type: 'object-manuscript-site-or-archaeological-context', title: 'Piaggio’s Papyrus-Unrolling Machine', invitation: 'Piaggio’s mechanism made Herculaneum texts readable while exposing fragile layers to loss, showing why Epicurean transmission depends on conservation choices, copied states, imaging, and revisable reconstruction.', canonicalContexts: [{kind: 'branch', id: 'epicureanism'}]},
    resolution: 'Resolved: identified Castrucci’s 1858 diagram, mapped its conservation limits, restored a claim-mapped intervention-and-imaging sidebar, and matched the wall frame to the complete diagram.', lock: 'fnv1a64:9a81f5cd45cbe7ea',
  }),
  record({
    id: 'skeptical-arguments-preserved', assetId: 'skeptical-sextus-adversus-edition',
    displayName: 'Pyrrho in the Storm', shortTitle: 'Pyrrho in the Storm',
    workLabel: 'MASTER OF PETRARCH · PYRRHONIAN RECEPTION', dateLabel: 'First quarter of the sixteenth century · imagined episode',
    question: 'Is tranquility a doctrine to defend, a practiced response, or a story later skeptics must also examine?',
    frontSubtitle: 'An early-modern storm scene connects Pyrrho’s anecdotal example with Sextus’s later, more carefully articulated skeptical practice.',
    lead: 'This early-sixteenth-century drawing visualizes a late anecdote about Pyrrho remaining calm during a storm. It is reception art, not an ancient portrait or witnessed event.',
    keyIdeas: ['Diogenes Laertius preserves the storm-and-pig anecdote as late testimony.', 'Sextus presents Pyrrhonism as a skill of opposing considerations and suspending judgment.', 'Later Pyrrhonism invokes Pyrrho without simply reproducing his recoverable views.'],
    cautions: ['The drawing’s lesson-like clarity exceeds the historical evidence.', 'Pyrrhonian suspension is not the dogmatic claim that nothing can be known or believed.'],
    sections: [
      {paragraph: 'The early-sixteenth-century drawing shows sailors struggling amid waves while Pyrrho points toward a pig that continues eating aboard ship. Latin and German inscriptions turn the scene into an explicit lesson in security and wisdom. The anecdote is preserved by Diogenes Laertius, who attributes it to Posidonius: Pyrrho remained calm during a storm and held the animal’s composure up as an example. The image was made many centuries later. It is not a portrait, proof that the voyage occurred, or evidence that Pyrrho reduced philosophy to animal indifference. It shows how reception can convert a difficult ancient reputation into a vivid moral tableau.', sourceIds: ['pyrrho-storm-commons', 'pyrrho-storm-pinakothek', 'pyrrho-laertius-nine']},
      {paragraph: 'Sextus Empiricus, writing probably in the second or third century CE, gives the fullest surviving account of the later movement called Pyrrhonism. He presents skepticism as an ability to set opposed appearances or considerations against one another so that neither side gains decisive authority. Suspension of judgment, epochē, follows the experienced balance, and tranquility is said to come unexpectedly rather than through a dogmatic proof that nothing can be known. The skeptic continues to live through appearances, bodily needs, skills, customs, and laws. Interpreters disagree about how much ordinary belief this permits, so action should not be described as a simple problem that Sextus conclusively solved.', sourceIds: ['pyrrho-sextus-primary', 'pyrrho-sep-sextus', 'pyrrho-sep-ancient']},
      {paragraph: 'Pyrrho and Sextus should not be collapsed. Pyrrho wrote nothing, and the evidence for his views comes through later testimony whose philosophical reconstruction remains contested. Sextus invokes Pyrrho as an important predecessor but articulates practices, modes, phrases, and distinctions shaped by centuries of skeptical debate. That gap makes the storm image useful. Its hero, sailors, pig, and written moral give later viewers exactly the certainty that Pyrrhonian inquiry teaches them to inspect. The picture can invite reflection on equanimity without becoming a transparent diagram of Sextus’s philosophy. It belongs to the history of how Pyrrho was made exemplary, while Sextus preserves a more recursive practice that also questions its own formulations.', sourceIds: ['pyrrho-laertius-nine', 'pyrrho-sep-pyrrho', 'pyrrho-sep-sextus']},
    ],
    visitorGuide: [
      {
        heading: 'The storm as moral tableau',
        items: [
          {label: 'Exemplary calm', description: 'The late anecdote makes Pyrrho point to the untroubled pig while sailors struggle in the storm.', sourceIds: ['pyrrho-laertius-nine']},
          {label: 'Reception evidence', description: 'The early-modern drawing shows how the story was moralized, not whether the voyage occurred.', sourceIds: ['pyrrho-storm-commons', 'pyrrho-storm-pinakothek']},
        ],
      },
      {
        heading: 'From Pyrrho to Sextus',
        items: [
          {label: 'Contested predecessor', description: 'Pyrrho wrote nothing, and later testimony does not yield a single secure reconstruction of his views.', sourceIds: ['pyrrho-laertius-nine', 'pyrrho-sep-pyrrho']},
          {label: 'Skeptical practice', description: 'Sextus describes opposing considerations, suspending judgment, and continuing through appearances without asserting that nothing can be known.', sourceIds: ['pyrrho-sextus-primary', 'pyrrho-sep-sextus', 'pyrrho-sep-ancient']},
        ],
      },
    ],
    sources: [
      {id: 'pyrrho-storm-commons', label: 'Wikimedia Commons: Pyrrho of Elis in a Storm and public-domain record', url: 'https://commons.wikimedia.org/wiki/File:Petrarca-Meister_001.jpg', kind: 'collection-record'},
      {id: 'pyrrho-storm-pinakothek', label: 'Bavarian State Painting Collections: Pyrrho in a Storm, accession 3688', url: 'https://www.sammlung.pinakothek.de/en/artwork/ma4dDWj4rO', kind: 'collection-record'},
      {id: 'pyrrho-laertius-nine', label: 'Diogenes Laertius, Lives of Eminent Philosophers IX.61–68 (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0258:book=9:chapter=11', kind: 'primary-text'},
      {id: 'pyrrho-sextus-primary', label: 'Sextus Empiricus, Outlines of Pyrrhonism I, especially §§7–30 (Internet Archive)', url: 'https://archive.org/details/sextusempiricus0001sext', kind: 'primary-text'},
      {id: 'pyrrho-sep-pyrrho', label: 'Stanford Encyclopedia of Philosophy archive: Pyrrho', url: 'https://plato.stanford.edu/archives/fall2024/entries/pyrrho/', kind: 'academic-reference'},
      {id: 'pyrrho-sep-sextus', label: 'Stanford Encyclopedia of Philosophy: Sextus Empiricus', url: 'https://plato.stanford.edu/entries/sextus-empiricus/', kind: 'academic-reference'},
      {id: 'pyrrho-sep-ancient', label: 'Stanford Encyclopedia of Philosophy: Ancient Skepticism', url: 'https://plato.stanford.edu/entries/skepticism-ancient/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'The early-modern drawing turns Pyrrho’s storm anecdote into a moral lesson. It is imagined reception, not an ancient likeness, and it should not be mistaken for a diagram of Sextus’s later Pyrrhonism.',
    articleRoute: {kind: 'philosopher', philosopherId: 'sextus-empiricus'}, entityKind: 'philosopher', articleActionLabel: 'Read the full sourced Sextus Empiricus article',
    wallPlaque: {type: 'reception-or-transmission-history', title: 'Pyrrho in the Storm', invitation: 'An early-modern storm scene makes Pyrrho an emblem of tranquility, while Sextus’s later Pyrrhonism turns opposed considerations, suspension, ordinary life, and even skeptical formulas into continuing questions.', canonicalContexts: [{kind: 'philosopher', id: 'sextus-empiricus'}]},
    resolution: 'Resolved: identified the Pyrrho storm drawing, corrected the anecdote to Diogenes Laertius 9.68, restored a claim-mapped reception-and-practice sidebar, and replaced the portrait wall aperture with the drawing’s natural landscape format.', lock: 'fnv1a64:e47d21a98d95434c',
  }),
] as const satisfies readonly MuseumSupplementalExhibit[];

const layout = ({
  id,
  parentExhibitId,
  slotId,
  assetId,
  mediaWidth,
  mediaHeight,
  installationKind,
  accent,
}: {
  id: MuseumSupplementalExhibitId;
  parentExhibitId: 'cynicism' | 'diogenes' | 'epicureanism' | 'sextus-empiricus';
  slotId: string;
  assetId: MuseumAssetId;
  mediaWidth: number;
  mediaHeight: number;
  installationKind: MuseumSupplementalInstallationKind;
  accent: string;
}): MuseumSupplementalExhibitLayout => {
  const authoredSlot = getHellenisticRomanInstallationSlot(slotId);
  const position = {x: authoredSlot.x, z: authoredSlot.z};
  const authored = authorSupplementalLayout({
    id,
    parentExhibitId,
    zoneId: authoredSlot.spatialCellId,
    position,
    rotationY: authoredSlot.rotationY,
    assetId,
    mediaWidth,
    mediaHeight,
    installationKind,
    accent,
    width: 3.58,
  });
  return {
    ...authored,
    interactionRadius: 3.3,
    viewpoint: {
      x: position.x + Math.sin(authoredSlot.rotationY) * authoredSlot.supplementalViewpointDistance,
      z: position.z + Math.cos(authoredSlot.rotationY) * authoredSlot.supplementalViewpointDistance,
      yaw: authoredSlot.rotationY,
      pitch: -.055,
    },
  };
};

export const HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  layout({id: 'cynic-frank-speech-in-public', parentExhibitId: 'diogenes', slotId: 'hell-cynic-way:east-cross-face', assetId: 'cynic-diogenes-honest-man', mediaWidth: 3.02, mediaHeight: 2.3310625, installationKind: 'hellenistic-concept', accent: HELLENISTIC_ROMAN_PALETTE.cynic}),
  layout({id: 'cynic-hipparchia-crates', parentExhibitId: 'cynicism', slotId: 'hell-cynic-way:south-room-face', assetId: 'cynic-hipparchia-crates-print', mediaWidth: 1.62, mediaHeight: 2.7, installationKind: 'hellenistic-context', accent: HELLENISTIC_ROMAN_PALETTE.bronze}),
  layout({id: 'cynic-cosmopolitan-constellation', parentExhibitId: 'cynicism', slotId: 'hell-cynic-way:south-cross-face', assetId: 'cynic-philosophers-constellation', mediaWidth: 1.9575, mediaHeight: 2.7, installationKind: 'hellenistic-context', accent: HELLENISTIC_ROMAN_PALETTE.cynic}),
  layout({id: 'epicurean-fourfold-remedy', parentExhibitId: 'epicureanism', slotId: 'hell-epicurean-garden:west-cross-face', assetId: 'epicurean-tetrapharmakos', mediaWidth: 2.025, mediaHeight: 2.7, installationKind: 'hellenistic-concept', accent: HELLENISTIC_ROMAN_PALETTE.garden}),
  layout({id: 'epicurean-philodemus-library', parentExhibitId: 'epicureanism', slotId: 'hell-epicurean-garden:south-room-face', assetId: 'epicurean-philodemus-subscription', mediaWidth: 1.78875, mediaHeight: 2.7, installationKind: 'hellenistic-work', accent: HELLENISTIC_ROMAN_PALETTE.bronze}),
  layout({id: 'epicurean-herculaneum-afterlife', parentExhibitId: 'epicureanism', slotId: 'hell-epicurean-garden:south-cross-face', assetId: 'epicurean-herculaneum-papyrus', mediaWidth: 1.7465625, mediaHeight: 2.7, installationKind: 'hellenistic-context', accent: HELLENISTIC_ROMAN_PALETTE.garden}),
  layout({id: 'skeptical-arguments-preserved', parentExhibitId: 'sextus-empiricus', slotId: 'hell-skeptical-lineages:north-cross-face', assetId: 'skeptical-sextus-adversus-edition', mediaWidth: 3.05, mediaHeight: 2.2303125, installationKind: 'hellenistic-work', accent: HELLENISTIC_ROMAN_PALETTE.skeptic}),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getHellenisticRomanSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const recordValue = HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!recordValue) throw new Error(`Gallery 14 supplemental exhibit ${id} is missing.`);
  return recordValue;
};
