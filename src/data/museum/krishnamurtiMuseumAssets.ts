import type {MuseumAssetRecord, MuseumAssetVariant} from './museumAssetTypes';

const variant = (
  id: string,
  kind: 'scene' | 'panel',
  width: number,
  height: number,
): MuseumAssetVariant => ({
  path: `assets/museum/core-questions-forum/${id}-${kind}.webp`,
  width,
  height,
});

const derivativeNotice = 'Resized and converted to WebP by Philosophy Atlas; no generative or compositional alteration.';

export const KRISHNAMURTI_MUSEUM_ASSETS = [
  {
    id: 'jiddu-krishnamurti-bain-portrait',
    entityKind: 'philosopher',
    entityId: 'jiddu-krishnamurti',
    role: 'identity',
    mediaKind: 'photograph',
    title: 'Jiddu Krishnamurti',
    creator: 'Unknown photographer; Bain News Service collection',
    objectDate: '1920s',
    imageCreator: 'Library of Congress digital reproduction',
    institution: 'Library of Congress, Prints and Photographs Division, George Grantham Bain Collection, ggbain.38863',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Jiddu_Krishnamurti_01.jpg',
    objectPageUrl: 'https://www.loc.gov/item/ggb2006014268/',
    license: 'No known copyright restrictions (Bain Collection)',
    licenseUrl: 'https://www.loc.gov/pictures/collection/ggbain/',
    rightsKind: 'rights-status',
    derivativeNotice,
    attribution: 'Unknown photographer, Jiddu Krishnamurti, 1920s. George Grantham Bain Collection, Library of Congress. No known copyright restrictions.',
    variants: {
      scene: variant('jiddu-krishnamurti-bain-portrait', 'scene', 470, 640),
      panel: variant('jiddu-krishnamurti-bain-portrait', 'panel', 940, 1280),
    },
    alt: 'Black-and-white lifetime press portrait of a young Jiddu Krishnamurti in a dark suit, facing the camera.',
    caption: 'Jiddu Krishnamurti, 1920s. Bain News Service Collection, Library of Congress.',
    historicalNote: 'A lifetime press photograph from Krishnamurti’s Theosophical-era public career. It documents his early international image; it is not evidence that his mature post-1929 teaching retained Theosophical allegiance or World Teacher claims.',
    likenessStatus: 'lifetime-photograph',
    focalPoint: {x: 0.5, y: 0.39},
  },
  {
    id: 'jiddu-krishnamurti-besant-1927',
    entityKind: 'philosopher',
    entityId: 'jiddu-krishnamurti',
    role: 'context',
    mediaKind: 'photograph',
    title: 'Annie Besant and Jiddu Krishnamurti aboard the Pacific',
    creator: 'Agence Rol (commissioning agency; photographer not named in the catalogue)',
    objectDate: 'March 1927',
    imageCreator: 'Bibliothèque nationale de France / Gallica digital reproduction',
    institution: 'Bibliothèque nationale de France, département Estampes et photographie, EI-13 (1421); Rol 118226',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Annie_Bessant_et_Krishnamurti_(Pacific)_-_btv1b53177929b.jpg',
    objectPageUrl: 'https://catalogue.bnf.fr/ark:/12148/cb45559699s',
    license: 'Public domain in France and the United States',
    licenseUrl: 'https://commons.wikimedia.org/wiki/File:Annie_Bessant_et_Krishnamurti_(Pacific)_-_btv1b53177929b.jpg#Licensing',
    rightsKind: 'rights-status',
    derivativeNotice,
    attribution: 'Agence Rol, Annie Besant and Jiddu Krishnamurti aboard the Pacific, March 1927. Bibliothèque nationale de France, EI-13 (1421). Public domain.',
    variants: {
      scene: variant('jiddu-krishnamurti-besant-1927', 'scene', 465, 640),
      panel: variant('jiddu-krishnamurti-besant-1927', 'panel', 930, 1280),
    },
    alt: 'Black-and-white 1927 press photograph of Jiddu Krishnamurti and Annie Besant standing together on the deck of a ship.',
    caption: 'Agence Rol, Annie Besant and Jiddu Krishnamurti aboard the Pacific, March 1927. BnF EI-13 (1421).',
    historicalNote: 'This lifetime press photograph documents Krishnamurti’s public association with Annie Besant two years before he dissolved the Order of the Star. It records formation and institutional context, not permanent Theosophical allegiance or membership in an inherited philosophical school.',
    likenessStatus: 'lifetime-photograph',
    focalPoint: {x: 0.5, y: 0.42},
  },
] as const satisfies readonly MuseumAssetRecord[];
