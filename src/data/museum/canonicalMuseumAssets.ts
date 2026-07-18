import type {MuseumAssetRecord, MuseumAssetVariant} from './museumAssetTypes';

type CanonicalAssetFolder =
  | 'renaissance-humanism-new-method'
  | 'justice-democratic-reason'
  | 'core-questions-forum';

const variant = (
  folder: CanonicalAssetFolder,
  id: string,
  kind: 'scene' | 'panel',
  width: number,
  height: number,
): MuseumAssetVariant => ({
  path: `assets/museum/${folder}/${id}-${kind}.webp`,
  width,
  height,
});

const derivativeNotice = 'Resized and converted to WebP by Philosophy Atlas; no generative or compositional alteration.';

/** New identity media for canonical assignments that had no appropriate approved local object. */
export const CANONICAL_MUSEUM_ASSETS = [
  {
    id: 'francis-bacon-portrait-1617',
    entityKind: 'philosopher',
    entityId: 'bacon',
    role: 'identity',
    mediaKind: 'painting',
    title: 'Portrait of Francis Bacon',
    creator: 'Paul van Somer I (formerly attributed to Frans Pourbus the Younger)',
    objectDate: '1617',
    institution: 'Łazienki Palace, Warsaw, accession ŁKr 896',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Francis_Bacon_(cropped).jpg',
    license: 'Public Domain Mark 1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    rightsKind: 'rights-status',
    derivativeNotice,
    attribution: 'Paul van Somer I, Portrait of Francis Bacon, 1617. Łazienki Palace, Warsaw. Public domain.',
    variants: {
      scene: variant('renaissance-humanism-new-method', 'francis-bacon-portrait-1617', 'scene', 487, 640),
      panel: variant('renaissance-humanism-new-method', 'francis-bacon-portrait-1617', 'panel', 738, 969),
    },
    alt: 'Seventeenth-century painted portrait of Francis Bacon wearing a tall black hat and dark formal clothing against a red background.',
    caption: 'Paul van Somer I, Portrait of Francis Bacon, 1617. Łazienki Palace, Warsaw.',
    historicalNote: 'A lifetime court portrait, now attributed to Paul van Somer I after an earlier attribution to Frans Pourbus the Younger. It identifies Bacon but does not visualize experimental method or prove the later idea of a single Baconian scientific program.',
    likenessStatus: 'lifetime-portrait',
    focalPoint: {x: 0.5, y: 0.39},
  },
  {
    id: 'alfred-north-whitehead-portrait-1923',
    entityKind: 'philosopher',
    entityId: 'whitehead',
    role: 'identity',
    mediaKind: 'photograph',
    title: 'Alfred North Whitehead',
    creator: 'Unknown photographer',
    objectDate: 'Published 1923',
    imageCreator: 'Digital reproduction of the photograph published in Splendour of the Heavens',
    institution: 'Published by Hutchinson & Co. in Splendour of the Heavens (1923), p. 675',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:ANWhitehead.jpg',
    objectPageUrl: 'https://archive.org/details/splendourofheave00phil/page/674/mode/2up',
    license: 'Public domain in the United States; status may differ elsewhere',
    licenseUrl: 'https://commons.wikimedia.org/wiki/File:ANWhitehead.jpg#Licensing',
    rightsKind: 'rights-status',
    derivativeNotice,
    attribution: 'Unknown photographer, Alfred North Whitehead, published in Splendour of the Heavens, 1923. Public domain in the United States.',
    variants: {
      scene: variant('core-questions-forum', 'alfred-north-whitehead-portrait-1923', 'scene', 390, 522),
      panel: variant('core-questions-forum', 'alfred-north-whitehead-portrait-1923', 'panel', 390, 522),
    },
    alt: 'Black-and-white lifetime head-and-shoulders photograph of Alfred North Whitehead in a dark suit, facing slightly left.',
    caption: 'Alfred North Whitehead, unknown photographer, published in Splendour of the Heavens, 1923.',
    historicalNote: 'This is a lifetime publication portrait with an unidentified photographer. It establishes historical presence but does not make process, relation, or creativity visible in Whitehead’s expression; the source page also cautions that rights status may differ outside the United States.',
    likenessStatus: 'lifetime-photograph',
    focalPoint: {x: 0.5, y: 0.4},
  },
  {
    id: 'martha-nussbaum-portrait-2010',
    entityKind: 'philosopher',
    entityId: 'martha-nussbaum',
    role: 'identity',
    mediaKind: 'photograph',
    title: 'Martha C. Nussbaum',
    creator: 'Sally Ryan',
    objectDate: '24 August 2010',
    imageCreator: 'Sally Ryan',
    institution: 'Photographed in the Harold J. Green Law Lounge, University of Chicago Law School',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Martha_Nussbaum_2010.jpg',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    rightsKind: 'license',
    derivativeNotice,
    attribution: 'Sally Ryan, Martha C. Nussbaum, 24 August 2010, CC BY-SA 3.0; permission confirmed through Wikimedia VRT ticket 2010102910008061.',
    variants: {
      scene: variant('justice-democratic-reason', 'martha-nussbaum-portrait-2010', 'scene', 354, 640),
      panel: variant('justice-democratic-reason', 'martha-nussbaum-portrait-2010', 'panel', 707, 1280),
    },
    alt: 'Color lifetime portrait of Martha Nussbaum seated indoors, looking toward the camera and wearing a patterned dress.',
    caption: 'Sally Ryan, Martha C. Nussbaum, University of Chicago Law School, 24 August 2010.',
    historicalNote: 'A licensed lifetime institutional portrait. It identifies a living philosopher but does not itself represent the capabilities approach, its list of central capabilities, or debates over universalism, culture, disability, and political implementation.',
    likenessStatus: 'lifetime-photograph',
    focalPoint: {x: 0.5, y: 0.32},
  },
] as const satisfies readonly MuseumAssetRecord[];
