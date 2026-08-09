import {
  MEDITERRANEAN_EXHIBIT_CURATION,
  MEDITERRANEAN_GALLERY_ID,
  type MediterraneanExhibitCuration,
  type MediterraneanExhibitId,
} from '../../data/museum/mediterraneanGalleryCuration';
import {
  RENAISSANCE_EXHIBIT_CURATION,
  RENAISSANCE_GALLERY_ID,
  type RenaissancePrimaryExhibitId,
} from '../../data/museum/renaissanceGalleryCuration';
import {MUSEUM_TEXTURE_SPECS, museumTextureDimensionsForPlane} from '../../data/museum/museumTexturePolicy';
import type {MuseumExhibitLayout, MuseumHallDefinition} from '../../data/museum/museumWorldTypes';
import {getMuseumHallCatalog} from '../../data/museumCatalog';
import type {PlaqueTextureOptions} from './plaqueTextures';

export type PrimaryPlaqueConfiguration = PlaqueTextureOptions & {
  contentKind: 'primary';
  kicker: '';
  subtitle: string;
  hallId: string;
  hallTitle: string;
  roomId: string;
  roomTitle: string;
  exhibitId: string;
  entityKind: 'philosopher' | 'branch';
  entityId: string;
  roomIndex: number;
  physicalWidth: number;
  physicalHeight: number;
  mediterraneanGroupLabel?: string;
  renaissance: boolean;
};

/** Wall-only copy overrides used only when the complete catalog invitation cannot fit legibly. */
export const PRIMARY_PLAQUE_INVITATION_OVERRIDES = {
  leucippus: 'How did atoms and void answer the problem of change, and why is Leucippus’s contribution so difficult to separate from the later work of Democritus?',
  iamblichus: 'Why might embodied souls require divinely grounded ritual, and how do the Abamon persona and fragmented transmission shape what we can reconstruct from Iamblichus today?',
  porphyry: 'How did Porphyry reshape Platonism through editing, commentary, teaching, and practical inquiry?',
  proclus: 'How did Proclus unite metaphysics, commentary, mathematics, prayer, and ritual within a philosophical way of life?',
  origen: 'How did Origen join scriptural scholarship to questions of God, freedom, embodiment, and restoration across a corpus preserved in originals, translations, fragments, and hostile reports?',
  'gregory-nyssa': 'How did Gregory of Nyssa connect divine infinity, embodied freedom, virtue, resurrection, and transformation toward the good?',
  'pseudo-dionysius': 'How did an anonymous late-antique Christian transform divine names, hierarchy, procession, return, and apophatic unknowing across a corpus later received in Byzantine and Latin worlds?',
  nagarjuna: 'Nāgārjuna asks: if all things arise with other things, what has a fixed core? His reply links arising and emptiness, tests each claim, and guides later Madhyamaka thought, text, and debate today.',
  boethius: 'Boethius joins Greek logic to Latin study and asks how we may face luck, pain, choice, and divine care. His lost plan, prison book, final years, and use shape two linked legacies.',
  'sextus-empiricus': 'Sextus tests each claim, sets one case against another, says not yet, and asks us to go on. His work on truth, signs, cause, mind, and life keeps skeptical doubt in play.',
  marxism: 'Marxism asks how labor, class, profit, and power shape social life, why capitalism changes through conflict, and how shared action might change it. Its theories, movements, aims, and political forms remain contested.',
  eriugena: 'Eriugena put Greek Christian ideas into Latin and asked how all things can come from God yet not be God. Read his bold book on words, the world, and the unknown divine.',
  'medieval-scholasticism': 'Scholastic readers set old books by new doubts and asked what each word meant. See how close study, new texts, and debate made one shared book spark fresh questions and more debate.',
  anselm: 'Anselm joins prayerful inquiry to exact argument, asking what faith seeks to understand about God, freedom, truth, and responsibility. Read the Proslogion beside its early critic and the wider monastic work that frames it.',
  abelard: 'Abelard set rival texts side by side and asked readers to test words and reasons. Follow his work on common terms and moral choice, and keep Héloïse’s own sharp claims in view.',
  aquinas: 'Aquinas tests objections, then answers questions on God, virtue, law, and human ends. Read his unfinished Summa, watch it join many sources, and ask why later fame is no proof by itself.',
  'duns-scotus': 'Scotus asks how one idea of being can join God and creatures yet keep them unlike, and what makes each person this one. Follow his sharp terms through layered texts with care.',
  ockham: 'Ockham asks how signs and thought work without adding things we do not need. Test his famed razor, then see how logic links to fights over wealth, law, power, and just rule.',
  'meister-eckhart': 'Eckhart asks in school works and German sermons how a free heart, clear thought, and words about God may change a life. Read by genre, copies, and later church rulings with care.',
  'marsilius-padua': 'Marsilius asks who may make law, use force, rule, and claim church power. Read his book on civic peace, and see why its chosen citizens do not make it a modern democracy.',
  jainism: 'Enter a Jain cosmos where nonviolence, karma, and care join ideas to daily life. Test how limited views can speak truly, and ask what freedom from harm demands of each of us.',
  mahavira: 'Meet Mahāvīra, the Jain teacher recalled as a ford-maker. See how vows, care, and nonviolence face karmic bonds, while stories of his life remain distinct from firm historical evidence for us today.',
  kanada: 'Follow a layered Vaiśeṣika text as it asks which categories, relations, and imperceptible atoms can explain a changing world without mistaking its realist metaphysics or later commentary for modern physical science itself.',
  patanjali: 'Explore Yoga through a layered text on ethics, breath, focus, and meditation. See why posture is one limb, then ask how a trained mind may find freedom amid change in daily life.',
  vedanta: 'Compare Vedānta schools as they read shared texts on Brahman, self, world, devotion, action, and grace. See why their deep disputes resist one fixed answer for all readers today in every age.',
  shankara: 'Enter Śaṅkara’s Advaita through ideas of self, error, words, and freedom. See why nonduality need not erase daily life, while later sacred stories remain apart from firm historical proof about his life.',
  ramanuja: 'Meet Rāmānuja’s Vedānta, where God, souls, and world form one real whole. Ask how dependence can keep difference, and why freedom may preserve loving bonds rather than erase them in the end.',
  madhva: 'Test Madhva’s claim that God alone is independent while souls and matter remain real and different, then confront what liberation, divine grace, agency, and an unequal hierarchy of souls can mean together.',
  confucius: 'Enter Confucius’s world of learning, ritual, and humane judgment. Trace how a layered collection asks relationships and public roles to earn trust, then decide when inherited forms educate—and when humane criticism must revise them.',
  mencius: 'Meet Mencius’s argument that moral concern begins fragile and grows through practice, livelihood, and criticism of rule. Follow the four beginnings beyond sympathy, and ask what institutions allow people’s capacities to flourish.',
  xunzi: 'Explore Xunzi’s demanding account of education, ritual, and public standards. See why desire requires shaping rather than denial, then ask who can justify inherited rules—and whether constructed order can still welcome correction.',
  laozi: 'Enter the Daodejing through Laozi’s uncertain textual persona. Compare its shifting language of way, potency, and noncoercive action with later legend, and ask how a compact verse resists force without becoming a slogan.',
  zhuangzi: 'Follow Zhuangzi’s tales of skill, change, and shifting views. Let this layered book unsettle fixed ideas of use and self, then ask if freedom can stay alert to harm in daily life.',
  mozi: 'Meet Mozi’s challenge to count harms beyond family and state. Test inclusive concern, public standards, and resistance to aggressive war against the movement’s own hierarchy, discipline, and difficult demands for enforceable judgment.',
  'han-feizi': 'Examine Han Feizi’s hard-edged account of standards, office, and power. Trace how it confronts favoritism and unreliable reports, then ask who can check a ruler when institutional control itself silences public correction.',
} as const satisfies Readonly<Record<string, string>>;

export const museumHallUsesPrimaryEmphasis = (
  definition: MuseumHallDefinition,
): boolean => {
  const supplementalLayouts = definition.layout.supplementalExhibits ?? [];
  const largestSupplementalWidth = Math.max(
    0,
    ...supplementalLayouts.map(({footprint}) => footprint.width),
  );
  const largestSupplementalHeight = Math.max(
    0,
    ...supplementalLayouts.map(({footprint}) => footprint.height),
  );
  return definition.id !== MEDITERRANEAN_GALLERY_ID
    && definition.id !== RENAISSANCE_GALLERY_ID
    && supplementalLayouts.length > 0
    && definition.layout.exhibits.every(({scene}) =>
      scene.footprint.width >= largestSupplementalWidth - .001
      && scene.footprint.height >= largestSupplementalHeight - .001);
};

/**
 * Resolves the exact production inputs for one canonical wall plaque. The
 * renderer and the canonical-plaque browser audit both consume this path.
 */
export const resolvePrimaryPlaqueConfiguration = (
  definition: MuseumHallDefinition,
  layout: MuseumExhibitLayout,
): PrimaryPlaqueConfiguration => {
  const hall = getMuseumHallCatalog(definition.id);
  const catalog = hall?.exhibits.find(({id}) => id === layout.id);
  const roomIndex = hall?.zones.findIndex(({id}) => id === layout.zoneId) ?? -1;
  const room = hall?.zones[roomIndex];
  const backing = layout.scene.objectBounds.find(({id}) => id.endsWith('-backing'));
  if (!hall || !catalog || !room || !backing) {
    throw new Error(`Cannot resolve the canonical primary plaque for ${definition.id}/${layout.zoneId}/${layout.id}.`);
  }

  const mediterranean: MediterraneanExhibitCuration | undefined = definition.id === MEDITERRANEAN_GALLERY_ID
    ? MEDITERRANEAN_EXHIBIT_CURATION[layout.id as MediterraneanExhibitId]
    : undefined;
  const renaissance = definition.id === RENAISSANCE_GALLERY_ID
    ? RENAISSANCE_EXHIBIT_CURATION[layout.id as RenaissancePrimaryExhibitId]
    : undefined;
  const hasMedia = layout.scene.mediaMounts.length > 0;
  const primaryEmphasis = museumHallUsesPrimaryEmphasis(definition);
  const physicalWidth = backing.size.width - .16;
  const physicalHeight = mediterranean
    ? .7
    : hasMedia
      ? primaryEmphasis ? .72 : .42
      : primaryEmphasis
        ? backing.size.height - .16
        : Math.min(1.55, backing.size.height - .48);
  const textureSize = museumTextureDimensionsForPlane(
    physicalWidth,
    physicalHeight,
    mediterranean
      ? MUSEUM_TEXTURE_SPECS.mediterraneanNameStrip
      : primaryEmphasis && hasMedia
        ? MUSEUM_TEXTURE_SPECS.platoSupplementalLabel
        : MUSEUM_TEXTURE_SPECS.contemporaryNameStrip,
  );

  return {
    contentKind: 'primary',
    title: catalog.displayName,
    kicker: '',
    subtitle: mediterranean?.frontTitle
      ?? PRIMARY_PLAQUE_INVITATION_OVERRIDES[layout.id as keyof typeof PRIMARY_PLAQUE_INVITATION_OVERRIDES]
      ?? catalog.question,
    width: textureSize.width,
    height: textureSize.height,
    theme: mediterranean ? 'mediterranean' : 'dark',
    hallId: definition.id,
    hallTitle: hall.title,
    roomId: String(layout.zoneId),
    roomTitle: room.title,
    exhibitId: layout.id,
    entityKind: catalog.entityKind,
    entityId: catalog.entityId,
    roomIndex,
    physicalWidth,
    physicalHeight,
    mediterraneanGroupLabel: mediterranean?.groupLabel,
    renaissance: Boolean(renaissance),
  };
};
