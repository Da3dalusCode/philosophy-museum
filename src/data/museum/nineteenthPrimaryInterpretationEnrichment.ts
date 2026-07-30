import type {MuseumPrimaryInterpretationEnrichment} from './scholasticRationalistPrimaryInterpretationEnrichment';

/**
 * Object readings and focused depth for canonical primaries promoted with
 * Galleries 20 and 21. Existing deep legacy interpretations remain intact.
 */
export const NINETEENTH_PRIMARY_INTERPRETATION_ENRICHMENT:
Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>> = {
  bentham: {
    objectInterpretations: {
      'utility-bentham-auto-icon': 'Bentham’s auto-icon is his posthumous material program: his preserved skeleton and clothes sit with a wax replacement head inside UCL. The object records his wish to remain publicly useful and the later institutional management of his image. It is neither a lifetime likeness nor evidence that Bentham founded UCL.',
    },
  },
  mill: {
    objectInterpretations: {
      'utility-mill-watts-portrait': 'George Frederic Watts painted this restrained lifetime portrait in 1873, the year Mill died. The late likeness anchors identity but cannot make Mill’s revisions of utility, liberty, character, women’s equality, representative government, and empire appear more unified than the texts warrant.',
    },
  },
  marx: {
    objectInterpretations: {
      'utility-marx-1861-beard-portrait': 'Richard Beard photographed Marx in London in May 1861. The standing lifetime image belongs to the long period of research, journalism, organizing, illness, and financial strain before the first volume of Capital appeared in 1867. It is distinct from the familiar 1875 Mayall portrait.',
    },
  },
  schopenhauer: {
    lead: 'Schopenhauer begins from Kant’s claim that experienced objects appear within forms supplied by cognition, then gives that boundary a radical metaphysical turn. The world encountered as ordered objects is representation; one’s own body, however, is not only perceived from outside but lived as striving. Schopenhauer identifies that striving with will—not deliberate choice, but a restless, aim-renewing impulse expressed throughout nature. Because satisfaction is temporary and desire continually returns, suffering is structural rather than accidental. His response is not resignation alone: aesthetic contemplation can suspend interested striving, compassion can loosen egoistic separation, and ascetic practices can quiet willing more radically. The system developed through selective readings of Kant, Plato, science, and Asian texts available in mediated European translations. Its reach into music, literature, psychology, and later philosophy is substantial, but so are its speculative leaps and its degrading claims about women and non-European peoples.',
    keyIdeas: [
      'World as representation: every experienced object appears in relation to a knowing subject and within forms of intelligibility.',
      'Will through the body: embodied striving supplies Schopenhauer’s controversial route beyond a merely external description of nature.',
      'Pessimism: desire repeatedly renews lack, conflict, boredom, and temporary satisfaction rather than converging on stable fulfillment.',
      'Aesthetic respite and music: absorbed contemplation can briefly suspend individual willing, with music given exceptional metaphysical significance.',
      'Compassion and ascetic quieting: ethical concern begins when another’s suffering disrupts egoistic separation, while denial of will proposes a more radical release.',
    ],
    keyWorks: [
      'On the Fourfold Root of the Principle of Sufficient Reason',
      'The World as Will and Representation',
      'On the Will in Nature',
      'The Two Fundamental Problems of Ethics',
      'Parerga and Paralipomena',
    ],
    sections: [
      {
        heading: 'Representation, embodiment, and a metaphysics of striving',
        paragraphs: [
          'Schopenhauer distinguishes the world as representation from will without describing two independently existing worlds. The same body is known externally as an object among objects and internally through action, effort, desire, and resistance. He generalizes from this double aspect to nature as will. That move gives embodiment philosophical importance but remains a speculative inference whose scope must be argued rather than assumed.',
          'Pessimism follows from the dynamics of willing: a satisfied desire removes one lack only for another to appear, while competition makes different expressions of will injure one another. Art, compassion, and ascetic quieting are therefore not decorative appendices. They test whether attention and conduct can interrupt the ordinary standpoint of appropriation. Schopenhauer’s reading of the Latin Oupnek’hat and European reports about Buddhism widened his resources, yet those routes were selective and should never be converted into direct Sanskrit mastery or membership in an Asian school.',
        ],
      },
    ],
    sectionCaution: 'Schopenhauer’s “will” is not ordinary conscious choice, and “pessimism” is not a mood or the thesis that nothing matters. His comparisons with Upanishadic and Buddhist materials are mediated receptions, not identity claims. His misogyny and racialized generalizations should be confronted as parts of the corpus rather than excused by period or hidden behind later influence.',
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Arthur Schopenhauer', url: 'https://plato.stanford.edu/entries/schopenhauer/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Arthur Schopenhauer', url: 'https://iep.utm.edu/schopenh/', kind: 'academic-reference'},
      {label: 'Project Gutenberg — The World as Will and Idea', url: 'https://www.gutenberg.org/ebooks/38427', kind: 'primary-text'},
    ],
    objectInterpretations: {
      'value-schopenhauer-schaefer-portrait': 'J. Schäfer made this lifetime photograph in March 1859, one year before Schopenhauer’s death and during his late public recognition. The direct gaze, cane, and carefully arranged clothing establish an identifiable historical person; they do not illustrate pessimism, will, or character.',
    },
  },
  kierkegaard: {
    objectInterpretations: {
      'value-kierkegaard-copenhagen-portrait': 'Luplau Janssen painted Kierkegaard at a high writing desk around 1902, nearly five decades after the philosopher’s death. The posthumous reconstruction fittingly foregrounds writing but must not be presented as a lifetime likeness or used to collapse the pseudonymous authors into one direct authorial voice.',
    },
  },
  nietzsche: {
    objectInterpretations: {
      'value-nietzsche-1869-siebe-portrait': 'An unidentified photographer at the Gebrüder Siebe studio made this lifetime portrait in Leipzig on 25 August 1869. The young professor stands near the beginning of his Basel period and before The Birth of Tragedy. It should not be misdated 1875 or read backward as the face of a completed doctrine.',
    },
  },
};
