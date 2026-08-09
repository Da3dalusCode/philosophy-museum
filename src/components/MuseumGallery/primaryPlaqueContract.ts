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
