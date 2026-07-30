import type {
  MuseumAssetId,
  MuseumAssetRecord,
  MuseumAssetVariant,
  MuseumLikenessStatus,
  MuseumMediaKind,
  MuseumVisualCharacter,
} from './museumAssetTypes';

export type ColonialismRaceLiberationGalleryAssetId =
  | 'colonial-fanon-portrait'
  | 'colonial-fanon-racial-schema'
  | 'colonial-fanon-clinic'
  | 'colonial-fanon-algerian-revolution'
  | 'colonial-fanon-war-displacement'
  | 'colonial-fanon-national-consciousness'
  | 'colonial-davis-portrait'
  | 'colonial-hooks-portrait'
  | 'colonial-davis-prison-abolition'
  | 'colonial-davis-race-gender-class'
  | 'colonial-hooks-margin-center'
  | 'colonial-hooks-engaged-pedagogy'
  | 'colonial-cesaire-anticolonialism'
  | 'colonial-dubois-pan-africanism'
  | 'colonial-said-orientalism'
  | 'colonial-spivak-subaltern'
  | 'colonial-ngugi-language'
  | 'colonial-wynter-humanism';

type ColonialismRaceLiberationEntityId =
  | 'fanon'
  | 'angela-davis'
  | 'bell-hooks';

type Rights = Pick<
  MuseumAssetRecord,
  'license' | 'licenseUrl' | 'rightsKind'
>;

type AssetInput = {
  id: ColonialismRaceLiberationGalleryAssetId;
  entityKind: 'philosopher';
  entityId: ColonialismRaceLiberationEntityId;
  role: MuseumAssetRecord['role'];
  mediaKind: MuseumMediaKind;
  visualCharacter: MuseumVisualCharacter;
  title: string;
  creator: string;
  objectDate: string;
  institution: string;
  sourcePageUrl: string;
  rights: Rights;
  attribution: string;
  scene: readonly [number, number];
  panel: readonly [number, number];
  alt: string;
  caption: string;
  historicalNote: string;
  likenessStatus?: MuseumLikenessStatus;
  focalPoint: {x: number; y: number};
};

const folder = 'colonialism-race-liberation';
const derivativeNotice =
  'Original Commons image retained uncropped; resized and converted to WebP by Philosophy Atlas.';

const publicDomain: Rights = {
  license: 'Public Domain Mark 1.0',
  licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
  rightsKind: 'rights-status',
};
const publicDomainTunisia: Rights = {
  license: 'Public domain in Tunisia (photographic term expired)',
  licenseUrl: 'https://commons.wikimedia.org/wiki/Template:PD-Tunisia',
  rightsKind: 'rights-status',
};
const publicDomainAlgeria: Rights = {
  license: 'Public domain in Algeria and the United States',
  licenseUrl: 'https://commons.wikimedia.org/wiki/Template:PD-Algeria-photo-except',
  rightsKind: 'rights-status',
};
const publicDomainUSGovernment: Rights = {
  license: 'Public domain in the United States (federal government work)',
  licenseUrl: 'https://commons.wikimedia.org/wiki/Template:PD-USGov',
  rightsKind: 'rights-status',
};
const publicDomainUSExpired: Rights = {
  license: 'Public domain in the United States (publication before 1931)',
  licenseUrl: 'https://commons.wikimedia.org/wiki/Template:PD-US-expired',
  rightsKind: 'rights-status',
};
const publicDomainDedication: Rights = {
  license: 'Released into the public domain by the rights holder',
  licenseUrl: 'https://commons.wikimedia.org/wiki/Template:PD-self',
  rightsKind: 'dedication',
};
const ccBy2: Rights = {
  license: 'CC BY 2.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
  rightsKind: 'license',
};
const ccBy25: Rights = {
  license: 'CC BY 2.5',
  licenseUrl: 'https://creativecommons.org/licenses/by/2.5/',
  rightsKind: 'license',
};
const ccBySa4: Rights = {
  license: 'CC BY-SA 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  rightsKind: 'license',
};

const variant = (
  id: ColonialismRaceLiberationGalleryAssetId,
  kind: 'scene' | 'panel',
  size: readonly [number, number],
): MuseumAssetVariant => ({
  path: `assets/museum/${folder}/${id}-${kind}.webp`,
  width: size[0],
  height: size[1],
});

const asset = ({
  id,
  rights,
  scene,
  panel,
  likenessStatus = 'not-applicable',
  ...input
}: AssetInput): MuseumAssetRecord => ({
  ...input,
  ...rights,
  id: id as MuseumAssetId,
  derivativeNotice,
  variants: {
    scene: variant(id, 'scene', scene),
    panel: variant(id, 'panel', panel),
  },
  likenessStatus,
});

export const COLONIALISM_RACE_LIBERATION_GALLERY_ASSETS = [
  asset({
    id: 'colonial-fanon-portrait',
    entityKind: 'philosopher',
    entityId: 'fanon',
    role: 'identity',
    mediaKind: 'photograph',
    visualCharacter: 'portrait-or-figure',
    title: 'Frantz Fanon at a writers’ congress press conference in Tunis',
    creator: 'Unknown photographer',
    objectDate: 'Tunis, 1957 or 1959; the Commons record is internally inconsistent',
    institution: 'Tricontinental source reproduction via Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:02_Frantz-Fanon-lors-dune-conf%C3%A9rence-de-presse-du-Congr%C3%A8s-des-%C3%A9crivains-%C3%A0-Tunis-1959.jpg',
    rights: publicDomainTunisia,
    attribution: 'Unknown photographer, Frantz Fanon at a press conference in Tunis, 1957 or 1959. Public domain in Tunisia; source record via Wikimedia Commons.',
    scene: [640, 444],
    panel: [950, 659],
    alt: 'Frantz Fanon speaks into microphones at a press conference in Tunis.',
    caption: 'Fanon appears as a public anticolonial intellectual in Tunis, where writing, journalism, and revolutionary diplomacy met.',
    historicalNote: 'This is a lifetime photograph, but its date must remain approximate: the Commons filename, summary, and structured data identify 1959 while an English caption identifies 1957. It records one public event, not a timeless studio portrait or proof of every position Fanon held.',
    likenessStatus: 'lifetime-photograph',
    focalPoint: {x: .48, y: .43},
  }),
  asset({
    id: 'colonial-fanon-racial-schema',
    entityKind: 'philosopher',
    entityId: 'fanon',
    role: 'context',
    mediaKind: 'photograph',
    visualCharacter: 'artwork-or-social-scene',
    title: 'A man at a segregated water cooler in Oklahoma City',
    creator: 'Russell Lee; Commons restoration by Adam Cuerden',
    objectDate: 'July 1939',
    institution: 'Library of Congress, Farm Security Administration / Office of War Information Collection',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Negro_drinking_at_%22Colored%22_water_cooler_in_streetcar_terminal,_Oklahoma_City,_Oklahoma_by_Russell_Lee.jpg',
    rights: publicDomainUSGovernment,
    attribution: 'Russell Lee, segregated water cooler in Oklahoma City, July 1939, FSA/OWI Collection, Library of Congress; restored by Adam Cuerden. U.S. public domain.',
    scene: [640, 430],
    panel: [1280, 861],
    alt: 'A Black man drinks from a water cooler marked for segregated use in an Oklahoma City streetcar terminal.',
    caption: 'Jim Crow infrastructure made racial classification spatial and routine, offering a comparison for Fanon’s analysis of socially imposed bodily meaning.',
    historicalNote: 'This is a United States segregation record, not a scene Fanon described and not evidence that Oklahoma Jim Crow was identical to Martinican, French, or Algerian colonial racialization. The Library of Congress catalog title uses period racial terminology; visitor-facing text replaces it while the exact archival title remains only in the source URL.',
    focalPoint: {x: .55, y: .48},
  }),
  asset({
    id: 'colonial-fanon-clinic',
    entityKind: 'philosopher',
    entityId: 'fanon',
    role: 'context',
    mediaKind: 'photograph',
    visualCharacter: 'place-or-architecture',
    title: 'Administration pavilion at Blida-Joinville psychiatric hospital',
    creator: 'amekinfo',
    objectDate: 'Historic view labeled 1933; Commons-hosted digitization uploaded in 2009',
    institution: 'Blida-Joinville Psychiatric Hospital record via Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Frantz_Fanon_hospital_in_1933.jpg',
    rights: ccBy2,
    attribution: 'amekinfo, administration pavilion of Blida-Joinville Psychiatric Hospital, view labeled 1933. CC BY 2.0.',
    scene: [640, 446],
    panel: [738, 514],
    alt: 'A broad institutional pavilion stands behind a formal drive and planted grounds at Blida-Joinville psychiatric hospital.',
    caption: 'The hospital makes visible the institutional setting Fanon entered as a psychiatrist in 1953.',
    historicalNote: 'The view is labeled 1933 and therefore predates Fanon’s work at Blida-Joinville by about twenty years; it cannot show his reforms, patients, colleagues, or outcomes. The current Commons source was cropped from an earlier upload in 2019; Philosophy Atlas applies no additional crop.',
    focalPoint: {x: .5, y: .51},
  }),
  asset({
    id: 'colonial-fanon-algerian-revolution',
    entityKind: 'philosopher',
    entityId: 'fanon',
    role: 'context',
    mediaKind: 'photograph',
    visualCharacter: 'portrait-or-figure',
    title: 'An Algerian woman identified as an FLN fighter',
    creator: 'Unknown photographer',
    objectDate: 'Algerian War, circa 1954–1962; capture date unknown',
    institution: 'Echaab “Dhakira” historical-memory portal via Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:A_female_fighter_of_the_Front_de_Lib%C3%A9ration_Nationale_(FLN).jpg',
    rights: publicDomainAlgeria,
    attribution: 'Unknown photographer, Algerian woman identified by the source as an FLN fighter during the Algerian War. Public domain in Algeria and the United States.',
    scene: [640, 334],
    panel: [670, 350],
    alt: 'An Algerian woman identified by the source as an FLN fighter poses outdoors during the war of independence.',
    caption: 'The photograph keeps collective Algerian agency in view rather than turning the revolution into the achievement of one famous theorist.',
    historicalNote: 'The Commons date of 19 February 2026 is the upload date, not the date of capture. The subject is unnamed and the precise place, photographer, and event are not cataloged, so the photograph must not be used to assign a specific operation or to represent all women in the Algerian struggle.',
    focalPoint: {x: .5, y: .44},
  }),
  asset({
    id: 'colonial-fanon-war-displacement',
    entityKind: 'philosopher',
    entityId: 'fanon',
    role: 'context',
    mediaKind: 'photograph',
    visualCharacter: 'artwork-or-social-scene',
    title: 'Algerian refugees sheltering in caves',
    creator: 'Unknown photographer',
    objectDate: '1958 according to the source description',
    institution: 'National Archives of Tunisia and L’Action Tunisienne via Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:R%C3%A9fugi%C3%A9s_algeriens_dans_des_grottes_1958_(cropped).jpg',
    rights: publicDomainTunisia,
    attribution: 'Unknown photographer, Algerian refugees sheltering in caves, source description dated 1958, National Archives of Tunisia. Public domain in Tunisia.',
    scene: [453, 640],
    panel: [905, 1280],
    alt: 'Adults and children gather at the entrance of a cave used as shelter during the Algerian War.',
    caption: 'Displacement places Fanon’s violence debate inside a war borne by civilians as well as combatants.',
    historicalNote: 'This is an archival war-context image, not a scene from Fanon’s writing and not proof of a particular family’s experience. Wikimedia Commons extracted the standalone photograph from its newspaper scan with a source-recorded crop of about 36 percent horizontally and 32 percent vertically; Philosophy Atlas applies no further crop. The photographer, exact location, and circumstances remain incompletely cataloged.',
    focalPoint: {x: .5, y: .47},
  }),
  asset({
    id: 'colonial-fanon-national-consciousness',
    entityKind: 'philosopher',
    entityId: 'fanon',
    role: 'context',
    mediaKind: 'photograph',
    visualCharacter: 'artwork-or-social-scene',
    title: 'Algerian flags for National Independence Day',
    creator: 'Emna Mizouni',
    objectDate: '5 July 2015',
    institution: 'Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Celebration_of_National_Independence_Day_(Algeria).jpg',
    rights: ccBySa4,
    attribution: 'Emna Mizouni, building decorated with Algerian flags for National Independence Day in Algiers, 5 July 2015. CC BY-SA 4.0.',
    scene: [640, 360],
    panel: [1280, 720],
    alt: 'An Algiers building is decorated with Algerian flags for National Independence Day.',
    caption: 'A public commemoration keeps the national symbol visible while leaving Fanon’s harder question open: what social order follows the flag?',
    historicalNote: 'This is a 2015 commemoration in Algiers, not the 1962 independence moment and not evidence that Fanon’s account of national consciousness was realized. Decorations mark an official public memory; they cannot demonstrate political unity, decolonization’s completion, or agreement on a national program.',
    focalPoint: {x: .5, y: .48},
  }),
  asset({
    id: 'colonial-davis-portrait',
    entityKind: 'philosopher',
    entityId: 'angela-davis',
    role: 'identity',
    mediaKind: 'photograph',
    visualCharacter: 'portrait-or-figure',
    title: 'Angela Davis speaking at the University of Alberta',
    creator: 'Nick Wiebe',
    objectDate: '28 March 2006',
    institution: 'Myer Horowitz Theatre, University of Alberta',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Angela-Davis-Mar-28-2006.jpg',
    rights: ccBy25,
    attribution: 'Nick Wiebe, Angela Davis speaking at the University of Alberta, 28 March 2006. CC BY 2.5.',
    scene: [640, 480],
    panel: [1067, 800],
    alt: 'Angela Davis speaks at a lectern during a university event.',
    caption: 'Davis appears in the public teaching and organizing role through which abolition, feminism, and collective freedom remain linked.',
    historicalNote: 'This is a verified lifetime event photograph. It dates from 2006 and does not depict Davis’s 1970 arrest, 1972 trial, or any single phase of her decades of activism; those histories require their own evidence.',
    likenessStatus: 'lifetime-photograph',
    focalPoint: {x: .52, y: .4},
  }),
  asset({
    id: 'colonial-hooks-portrait',
    entityKind: 'philosopher',
    entityId: 'bell-hooks',
    role: 'identity',
    mediaKind: 'photograph',
    visualCharacter: 'portrait-or-figure',
    title: 'bell hooks',
    creator: 'Cmongirl',
    objectDate: '1 November 2009',
    institution: 'Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Bellhooks.jpg',
    rights: publicDomainDedication,
    attribution: 'Cmongirl, bell hooks, 1 November 2009. Released into the public domain by the photographer.',
    scene: [640, 503],
    panel: [764, 600],
    alt: 'bell hooks looks toward the camera in a close lifetime photograph.',
    caption: 'hooks anchors a practice joining cultural criticism, engaged pedagogy, feminism, and an ethic of love.',
    historicalNote: 'This is a verified lifetime photograph, but the Commons record does not identify a venue or event. It establishes the person’s likeness and should not be treated as documentation of a particular lecture, classroom, or political action.',
    likenessStatus: 'lifetime-photograph',
    focalPoint: {x: .51, y: .42},
  }),
  asset({
    id: 'colonial-davis-prison-abolition',
    entityKind: 'philosopher',
    entityId: 'angela-davis',
    role: 'context',
    mediaKind: 'photograph',
    visualCharacter: 'artwork-or-social-scene',
    title: 'Prison-abolition demonstration outside Belmarsh Prison',
    creator: 'Alisdare Hickson',
    objectDate: '22 January 2022',
    institution: 'Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Abolish_All_Prisons_Protest_outside_Belmarsh_Prison.jpg',
    rights: ccBySa4,
    attribution: 'Alisdare Hickson, prison-abolition demonstration outside Belmarsh Prison, London, 22 January 2022. CC BY-SA 4.0.',
    scene: [640, 360],
    panel: [1280, 720],
    alt: 'Demonstrators hold prison-abolition signs outside Belmarsh Prison in London.',
    caption: 'A contemporary public demand makes abolition visible as an organized horizon rather than a proposal attributed to one author.',
    historicalNote: 'This 2022 British demonstration outside Belmarsh Prison in London was not organized by Angela Davis and is not a photograph of the United States abolition movement. The event included several causes concerning imprisonment and detention; it supplies contemporary context, not evidence that every participant shared Davis’s analysis.',
    focalPoint: {x: .5, y: .48},
  }),
  asset({
    id: 'colonial-davis-race-gender-class',
    entityKind: 'philosopher',
    entityId: 'angela-davis',
    role: 'context',
    mediaKind: 'photograph',
    visualCharacter: 'artwork-or-social-scene',
    title: 'Black women’s council hosts British and American labor women',
    creator: 'Unknown Office of War Information photographer',
    objectDate: '21 April 1945',
    institution: 'U.S. National Archives, NAID 535812',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:%22The_National_Council_of_Negro_Women_entertained_British_war_workers_representing_labor_unions_and_American_labor_women_-_NARA_-_535812.jpg',
    rights: publicDomainUSGovernment,
    attribution: 'Unknown Office of War Information photographer, National Council of Negro Women gathering with British war workers and American labor women, 21 April 1945, U.S. National Archives. U.S. public domain.',
    scene: [640, 519],
    panel: [1280, 1039],
    alt: 'Black women, British war workers, and American labor women gather around a table at a 1945 council event.',
    caption: 'The meeting places race, gender, labor, and wartime politics in one organized setting without pretending that coalition erased difference.',
    historicalNote: 'This is an official wartime-agency photograph made almost three decades before Women, Race & Class. It cannot prove political unity or settle tensions within coalition. The National Archives source title uses period racial terminology; visitor-facing text modernizes it while the exact catalog title remains only in the source URL.',
    focalPoint: {x: .5, y: .46},
  }),
  asset({
    id: 'colonial-hooks-margin-center',
    entityKind: 'philosopher',
    entityId: 'bell-hooks',
    role: 'context',
    mediaKind: 'photograph',
    visualCharacter: 'artwork-or-social-scene',
    title: 'A patron entering a segregated cinema entrance in Belzoni',
    creator: 'Marion Post Wolcott',
    objectDate: 'October 1939',
    institution: 'Library of Congress, Farm Security Administration / Office of War Information Collection',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Negro_going_in_colored_entrance_of_movie_house_on_Saturday_afternoon,_Belzoni,_Mississippi_Delta,_Mississippi_LOC_3549667550.jpg',
    rights: publicDomainUSGovernment,
    attribution: 'Marion Post Wolcott, patron entering a segregated cinema entrance in Belzoni, Mississippi, October 1939, FSA/OWI Collection, Library of Congress. U.S. public domain.',
    scene: [640, 458],
    panel: [1024, 733],
    alt: 'A Black cinema patron climbs the separate exterior stairs assigned under Jim Crow segregation in Belzoni, Mississippi.',
    caption: 'The cinema entrance turns “margin” and “center” into built space while hooks’s argument asks how such positions can also become sites of critical knowledge.',
    historicalNote: 'This 1939 Mississippi photograph predates bell hooks and is not a scene from her life or writing. It documents one U.S. Jim Crow arrangement, not every cultural margin. The archival source title uses period racial terminology; visitor-facing text replaces it while the exact catalog title remains only in the source URL.',
    focalPoint: {x: .53, y: .49},
  }),
  asset({
    id: 'colonial-hooks-engaged-pedagogy',
    entityKind: 'philosopher',
    entityId: 'bell-hooks',
    role: 'context',
    mediaKind: 'photograph',
    visualCharacter: 'artwork-or-social-scene',
    title: 'Teacher and pupils reading in a rural Oklahoma classroom',
    creator: 'Russell Lee',
    objectDate: 'February 1940',
    institution: 'Library of Congress, Farm Security Administration / Office of War Information Collection',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Schoolchildren_reading_with_teacher_1940.jpg',
    rights: publicDomainUSGovernment,
    attribution: 'Russell Lee, teacher and pupils reading in a rural Black school in Creek County, Oklahoma, February 1940, FSA/OWI Collection, Library of Congress. U.S. public domain.',
    scene: [473, 640],
    panel: [698, 944],
    alt: 'A teacher reads with children gathered closely around a book in a rural Oklahoma classroom.',
    caption: 'Teaching continues amid unequal resources, opening a question central to hooks: can a classroom become a practice of freedom?',
    historicalNote: 'The Library of Congress record dates this rural Black school in Creek County, Oklahoma, to February 1940 and notes unequal access to free books. The image predates hooks, is not her Kentucky classroom, and does not depict “engaged pedagogy” as a named method; it provides historically specific educational context.',
    focalPoint: {x: .5, y: .47},
  }),
  asset({
    id: 'colonial-cesaire-anticolonialism',
    entityKind: 'philosopher',
    entityId: 'fanon',
    role: 'context',
    mediaKind: 'document',
    visualCharacter: 'map-or-diagram',
    title: 'Eighteenth-century plan of Martinique',
    creator: 'Houl, engineer, and Thomas Jefferys',
    objectDate: '1760',
    institution: 'Historic chart reproduced via Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:1760_Plan_of_Martinique.jpg',
    rights: publicDomain,
    attribution: 'Houl and Thomas Jefferys, plan of Martinique, 1760. Public domain.',
    scene: [640, 597],
    panel: [1280, 1195],
    alt: 'A detailed eighteenth-century chart maps Martinique’s coasts, terrain, settlements, and routes.',
    caption: 'A colonial-era plan renders Césaire’s home island as surveyed territory, a visual form whose order leaves domination and lived experience largely outside the frame.',
    historicalNote: 'The map predates Aimé Césaire by more than 150 years and is neither his work nor a direct illustration of Discourse on Colonialism. Its surveying conventions are evidence of a colonial way of organizing space, not a neutral or complete record of Martinique’s people and history.',
    focalPoint: {x: .5, y: .5},
  }),
  asset({
    id: 'colonial-dubois-pan-africanism',
    entityKind: 'philosopher',
    entityId: 'angela-davis',
    role: 'context',
    mediaKind: 'photograph',
    visualCharacter: 'artwork-or-social-scene',
    title: 'A session of the 1919 Pan-African Congress in Paris',
    creator: 'Unknown photographer',
    objectDate: '19–22 February 1919',
    institution: 'The Crisis, May 1919, via Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Pan-African_Congress,_Paris,_February_19-22,_1919.png',
    rights: publicDomainUSExpired,
    attribution: 'Unknown photographer, session of the Pan-African Congress in Paris, 19–22 February 1919, reproduced in The Crisis, May 1919. U.S. public domain.',
    scene: [640, 415],
    panel: [1070, 694],
    alt: 'Delegates sit together during a formal session of the 1919 Pan-African Congress in Paris.',
    caption: 'The exact congress session shows Pan-Africanism as organized deliberation across national and imperial borders.',
    historicalNote: 'The Commons record identifies this as a session of the Pan-African Congress in Paris on 19–22 February 1919, reproduced in The Crisis in May 1919; it is not a generic meeting photograph. The image still cannot recover every speaker, disagreement, constituency, or political demand from the congress.',
    focalPoint: {x: .5, y: .48},
  }),
  asset({
    id: 'colonial-said-orientalism',
    entityKind: 'philosopher',
    entityId: 'fanon',
    role: 'context',
    mediaKind: 'painting',
    visualCharacter: 'artwork-or-social-scene',
    title: 'Women of Algiers in Their Apartment',
    creator: 'Eugène Delacroix',
    objectDate: '1833–1834',
    institution: 'Museum of Fine Arts, Houston',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Women_of_Algiers_in_Their_Apartment_by_Eug%C3%A8ne_Delacroix_(Houston).jpg',
    rights: publicDomain,
    attribution: 'Eugène Delacroix, Women of Algiers in Their Apartment, 1833–1834, Museum of Fine Arts, Houston. Public domain.',
    scene: [521, 640],
    panel: [834, 1024],
    alt: 'Delacroix’s painting presents three seated Algerian women and an attendant within a richly furnished interior.',
    caption: 'An image canonized within European Orientalist art makes representation itself the exhibit: who is permitted to look, classify, and speak for another world?',
    historicalNote: 'The painting predates Edward Said and is not an illustration commissioned for Orientalism. It offers evidence of a European representational tradition, not unmediated access to the depicted women’s lives, intentions, or self-understanding; Said’s argument also cannot be reduced to one painting.',
    focalPoint: {x: .5, y: .49},
  }),
  asset({
    id: 'colonial-spivak-subaltern',
    entityKind: 'philosopher',
    entityId: 'bell-hooks',
    role: 'context',
    mediaKind: 'digital-image',
    visualCharacter: 'map-or-diagram',
    title: 'Map of the 1905 partition of Bengal',
    creator: 'XrysD',
    objectDate: 'Map created 20 November 2017 from historical survey and gazetteer data',
    institution: 'Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:BengalPartition1905_Map.png',
    rights: ccBySa4,
    attribution: 'XrysD, map of the 1905 partition of Bengal, 2017, based on historical Survey of India and Imperial Gazetteer data. CC BY-SA 4.0.',
    scene: [640, 424],
    panel: [1280, 849],
    alt: 'A modern historical map distinguishes Bengal from Eastern Bengal and Assam after the 1905 colonial partition.',
    caption: 'A line imposed through colonial administration reorganizes territory; Spivak’s question asks what such authoritative representation cannot let subordinated subjects say for themselves.',
    historicalNote: 'This is a 2017 reconstruction of the 1905 partition, not a colonial original and not an image of “the subaltern.” It supplies territorial context only. A map can clarify administrative scale while concealing displacement, political dispute, caste, gender, language, and the voices Spivak warns readers not to appropriate.',
    focalPoint: {x: .5, y: .5},
  }),
  asset({
    id: 'colonial-ngugi-language',
    entityKind: 'philosopher',
    entityId: 'fanon',
    role: 'context',
    mediaKind: 'photograph',
    visualCharacter: 'artwork-or-social-scene',
    title: 'Primary-school class at the Kikuyu mission in Kenya',
    creator: 'Unknown photographer',
    objectDate: 'Circa 1905–1940',
    institution: 'Centre for the Study of World Christianity, University of Edinburgh; USC Digital Library',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Primary_School_Class,_Kikuyu,_Kenya,_ca.1905-ca.1940_(imp-cswc-GB-237-CSWC47-LS7-024).jpg',
    rights: publicDomain,
    attribution: 'Unknown photographer, primary-school class at the Church of Scotland Kikuyu mission in Kenya, circa 1905–1940, Centre for the Study of World Christianity. Public domain.',
    scene: [640, 640],
    panel: [1279, 1280],
    alt: 'Young women and men gather in a crowded classroom at the Church of Scotland Kikuyu mission in Kenya.',
    caption: 'The exact mission-school context places language and education inside colonial institutions rather than treating the choice of classroom language as culturally neutral.',
    historicalNote: 'The archive specifically identifies a primary-school class at the Kikuyu mission in Kenya and gives the broad date range 1905–1940; it is not a generic or relabeled classroom. It is not Ngũgĩ wa Thiong’o’s classroom or the Kamĩrĩĩthũ theater, and the photograph does not establish which language was being taught. The missionary archive’s framing must also be read critically.',
    focalPoint: {x: .5, y: .48},
  }),
  asset({
    id: 'colonial-wynter-humanism',
    entityKind: 'philosopher',
    entityId: 'fanon',
    role: 'context',
    mediaKind: 'engraving',
    visualCharacter: 'artwork-or-social-scene',
    title: 'British illustration of the Morant Bay rebellion',
    creator: 'Unidentified illustrator for Cassell’s Illustrated History of England',
    objectDate: 'Published 1875; depicting the 1865 Morant Bay rebellion',
    institution: 'Cassell Petter & Galpin volume reproduced through Wikisource and Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:The_Jamaica_Insurrection.png',
    rights: publicDomainUSExpired,
    attribution: 'Unidentified illustrator, British representation of the Morant Bay rebellion, published in Cassell’s Illustrated History of England, volume 9, 1875. Public domain in the United States.',
    scene: [640, 431],
    panel: [1280, 861],
    alt: 'A nineteenth-century British illustration depicts armed volunteers firing during the Morant Bay rebellion in Jamaica.',
    caption: 'A colonial history pictures the rebellion through imperial eyes; Wynter’s later work returns the struggle to questions of who counts as fully human and who controls its narration.',
    historicalNote: 'This is not a portrait of Sylvia Wynter and predates her work. The period publisher caption describes Jamaican participants with the hostile label “mob,” so the print must be read as a British colonial representation rather than a neutral report. It is included partly because Wynter wrote the 1966 play 1865—A Ballad for a Rebellion, not because the print illustrates her interpretation.',
    focalPoint: {x: .5, y: .52},
  }),
] as const satisfies readonly MuseumAssetRecord[];
