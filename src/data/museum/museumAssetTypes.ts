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
  | 'neoplatonism-ficino-enneads'
  | 'machiavelli-santi-di-tito'
  | 'machiavelli-prince-1532'
  | 'descartes-hals-portrait'
  | 'descartes-discourse-1637'
  | 'hobbes-wright-portrait'
  | 'hobbes-leviathan-1651'
  | 'locke-kneller-portrait'
  | 'locke-two-treatises-1690'
  | 'spinoza-hab-portrait'
  | 'spinoza-ethics-1677'
  | 'hume-ramsay-portrait'
  | 'hume-treatise-1739'
  | 'rousseau-la-tour-portrait'
  | 'rousseau-social-contract-1762'
  | 'kant-raab-portrait'
  | 'kant-critique-1781'
  | 'kierkegaard-royal-library-portrait'
  | 'kierkegaard-fragments-manuscript'
  | 'marx-mayall-portrait'
  | 'marx-capital-1867'
  | 'nietzsche-schultze-1882'
  | 'nietzsche-zarathustra-1883'
  | 'heidegger-wetterauer-portrait'
  | 'heidegger-pragher-lecture-1954'
  | 'sartre-anefo-1965'
  | 'sartre-beauvoir-balzac'
  | 'beauvoir-gpo-1967'
  | 'beauvoir-suffrage-poster-1924'
  | 'camus-loc-1957'
  | 'camus-combat-1943'
  | 'foucault-portugal-1968'
  | 'foucault-panopticon-plan'
  | 'peirce-sarony-portrait'
  | 'peirce-existential-graphs'
  | 'frege-portrait'
  | 'frege-begriffsschrift-1879'
  | 'russell-portrait-1894'
  | 'russell-on-denoting-1905'
  | 'dewey-portrait-1902'
  | 'dewey-democracy-education-1916'
  | 'carnap-portrait'
  | 'carnap-reichenbach-collection'
  | 'popper-portrait-1987'
  | 'popper-alien-registration'
  | 'quine-portrait'
  | 'quine-qualitative-sphere'
  | 'kuhn-portrait-1977'
  | 'kuhn-structure-1962'
  | 'bentham-pickering-portrait'
  | 'bentham-principles-1823'
  | 'wollstonecraft-opie-portrait'
  | 'wollstonecraft-vindication-1792'
  | 'mill-stereoscopic-portrait'
  | 'mill-on-liberty-1859'
  | 'arendt-portrait-1933'
  | 'arendt-grave-bard'
  | 'fanon-portrait'
  | 'fanon-paris-plaque'
  | 'rawls-portrait'
  | 'rawls-theory-justice-1971'
  | 'nozick-portrait'
  | 'nozick-anarchy-state-utopia-1974'
  | 'habermas-portrait'
  | 'habermas-lecture-2011'
  | 'patanjali-statue'
  | 'patanjali-yoga-sutra-manuscript'
  | 'vasubandhu-statue'
  | 'vasubandhu-abhidharmakosha-manuscript'
  | 'william-james-portrait'
  | 'william-james-principles-1890'
  | 'husserl-portrait'
  | 'husserl-goettingen-plaque'
  | 'merleau-ponty-portrait'
  | 'merleau-ponty-grave'
  | 'anscombe-portrait'
  | 'anscombe-philosophical-investigations-1953'
  | 'thomas-nagel-portrait'
  | 'thomas-nagel-teaching'
  | 'derek-parfit-portrait'
  | 'derek-parfit-repugnant-conclusion'
  | 'jiddu-krishnamurti-bain-portrait'
  | 'jiddu-krishnamurti-besant-1927'
  | 'francis-bacon-portrait-1617'
  | 'alfred-north-whitehead-portrait-1923'
  | 'martha-nussbaum-portrait-2010';

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
  | 'book-page'
  | 'photograph'
  | 'drawing'
  | 'document'
  | 'architectural-plan';

export type MuseumLikenessStatus =
  | 'not-applicable'
  | 'ancient-portrait'
  | 'roman-copy'
  | 'later-traditional-representation'
  | 'imagined'
  | 'attributed'
  | 'uncertain'
  | 'lifetime-portrait'
  | 'lifetime-photograph'
  | 'posthumous-portrait';

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
  rightsKind: 'license' | 'rights-status' | 'dedication';
  derivativeNotice?: string;
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
