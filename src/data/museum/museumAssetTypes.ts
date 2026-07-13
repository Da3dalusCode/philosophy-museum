import type {MuseumExhibitKind} from '../museumCatalog';

export type MuseumAssetId =
  | 'socrates-louvre-head'
  | 'socrates-death-of-socrates'
  | 'plato-capitoline-bust'
  | 'plato-school-of-athens'
  | 'aristotle-altemps-bust'
  | 'aristotle-athenian-constitution-papyrus'
  | 'cynicism-diogenes-walters'
  | 'cynicism-alexander-and-diogenes'
  | 'epicureanism-double-herm'
  | 'epicureanism-lucretius-manuscript'
  | 'stoicism-zeno-naples'
  | 'stoicism-marcus-aurelius-bust'
  | 'skepticism-sextus-riedel'
  | 'skepticism-adversus-mathematicos'
  | 'neoplatonism-plotinus-ostia'
  | 'neoplatonism-ficino-enneads';

export type MuseumAssetRole =
  | 'identity'
  | 'primary-source'
  | 'material-history'
  | 'context';

export type MuseumMediaKind =
  | 'sculpture-photograph'
  | 'painting'
  | 'engraving'
  | 'manuscript'
  | 'papyrus'
  | 'book-page';

export type MuseumLikenessStatus =
  | 'not-applicable'
  | 'roman-copy'
  | 'later-traditional-representation'
  | 'imagined'
  | 'attributed'
  | 'uncertain';

export type MuseumAssetVariant = {
  path: string;
  width: number;
  height: number;
};

export type MuseumAssetRecord = {
  id: MuseumAssetId;
  entityKind: MuseumExhibitKind;
  entityId: string;
  role: MuseumAssetRole;
  mediaKind: MuseumMediaKind;
  title: string;
  creator: string;
  objectDate: string;
  imageCreator?: string;
  institution: string;
  sourcePageUrl: string;
  objectPageUrl?: string;
  license: string;
  licenseUrl?: string;
  attribution: string;
  variants: {
    scene: MuseumAssetVariant;
    panel: MuseumAssetVariant;
  };
  alt: string;
  caption: string;
  historicalNote: string;
  likenessStatus: MuseumLikenessStatus;
  focalPoint?: {x: number; y: number};
};
