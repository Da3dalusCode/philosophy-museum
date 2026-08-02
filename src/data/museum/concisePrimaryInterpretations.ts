import type {MuseumPrimaryInterpretationEnrichment} from './scholasticRationalistPrimaryInterpretationEnrichment';

const objectInterpretation = (assetId: string, text: string): Readonly<Record<string, string>> => ({
  [assetId]: text,
});

/**
 * Bespoke, object-led interpretation for primary exhibits whose canonical
 * articles are intentionally much deeper than a visitor should encounter in a
 * spatial modal. The concise presentation keeps the article available as the
 * sourced reference without reproducing its catalogs or dispute inventory.
 */
export const CONCISE_PRIMARY_INTERPRETATIONS:
Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>> = {
  kantianism: {
    lead: 'Kantianism is not Kant repeated. It is the history of thinkers testing which parts of critique can survive new objections, sciences, institutions, and demands for freedom.',
    keyIdeas: [],
    keyWorks: [],
    sections: [
      {
        heading: 'When critique became a program',
        paragraphs: [
          'Kant asked how knowledge, moral obligation, judgment, and freedom are possible without letting reason claim more than it can justify. His readers immediately disagreed about whether the critical system had secured those limits or left unstable divisions between sensibility and understanding, nature and freedom, appearances and things in themselves. Their debate moved critique from the interpretation of one author into rival efforts to explain how reason could be both limited and authoritative. Kantianism began in that argument. It became a family of programs, not a doctrine handed down intact.',
        ],
      },
      {
        heading: 'Why Reinhold stands here',
        paragraphs: [
          'Karl Leonhard Reinhold helped make Kant’s philosophy a public controversy through his influential Letters on the Kantian Philosophy, first published in 1786, and then sought a single foundation that Kant had not supplied in the same form. His portrait marks the moment when reception became reconstruction. Reinhold was an important mediator among Kant, early critics, and younger system-builders—not Kantianism’s founder, final authority, or only early voice. Maimon and other first readers opened different paths through the same unresolved problems.',
        ],
      },
      {
        heading: 'An inheritance kept alive by revision',
        paragraphs: [
          'Fichte, Schelling, and Hegel transformed the demand for systematic unity; Schopenhauer attacked the results; later neo-Kantians rebuilt critique around science, culture, and value. Twentieth- and twenty-first-century philosophers carried selected Kantian questions into phenomenology, analytic philosophy, critical theory, ethics, and democratic thought. The inheritance survives because it can be criticized and reconstructed. Live disputes concern whether transcendental idealism is essential, how concepts answer to experience, whether autonomy is socially enabled, and whether universal reason can confront racial, colonial, gendered, and ableist exclusions without losing its critical force.',
        ],
      },
    ],
    presentation: {
      mode: 'concise',
      orientation: [
        {label: 'Reception landmark', value: 'Reinhold’s Letters, 1786'},
        {label: 'Early reception', value: 'Kant · Reinhold · Maimon'},
        {label: 'First transformations', value: 'Fichte · Schelling · Hegel'},
        {label: 'Later reconstructions', value: 'Neo-Kantianism · phenomenology · analytic philosophy · critical theory'},
        {label: 'Questions carried forward', value: 'Objectivity · autonomy · judgment · public reason'},
        {label: 'Status', value: 'A contested reception family, not one settled doctrine'},
      ],
      articleActionLabel: 'Read the full sourced Kantianism article',
      plaqueSubtitleLines: 3,
    },
    objectInterpretations: objectInterpretation(
      'german-idealism-reinhold-rijksmuseum-1795',
      'The 1795 engraving makes an early mediator visible at the point where reading Kant became a program of reconstruction. It does not portray the founder or sole voice of Kantianism, and a formal likeness cannot show the disagreements that soon divided the inheritance.',
    ),
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Immanuel Kant', url: 'https://plato.stanford.edu/archives/spr2024/entries/kant/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Karl Leonhard Reinhold', url: 'https://plato.stanford.edu/archives/sum2026/entries/karl-reinhold/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Neo-Kantianism', url: 'https://plato.stanford.edu/archives/sum2021/entries/neo-kantianism/', kind: 'academic-reference'},
    ],
  },
  marxism: {
    lead: 'Marxism is not a synonym for Marx’s writings. It is the disputed history of attempts to turn a critique of capitalism into analysis, organization, collective action, and governing power.',
    keyIdeas: [],
    keyWorks: [],
    sections: [
      {
        heading: 'From a body of writing to competing traditions',
        paragraphs: [
          'Marx left a changing and partly unfinished body of work, produced in sustained collaboration with Friedrich Engels. Marxism formed through editing, interpretation, labor organizing, socialist parties, and arguments about reform, revolution, class, empire, and historical change. Later thinkers did not simply apply a finished doctrine. They selected, systematized, rejected, and extended different parts of the inheritance as they confronted new institutions and political crises.',
        ],
      },
      {
        heading: 'Why a congress belongs in this exhibit',
        paragraphs: [
          'The Zürich photograph shows organizers and theorists gathered around the 1893 International Socialist Workers’ Congress. A political congress is an apt object because Marxism became unions, parties, councils, educational networks, social movements, and international organizations as well as books. Yet this image records one European socialist network on the day after the congress; it is not a complete delegate portrait, a picture of global Marxism, or proof that those present shared one strategy.',
        ],
      },
      {
        heading: 'Emancipation, organization, and the danger of rule',
        paragraphs: [
          'Marxists have asked how dispersed workers and oppressed groups can build collective power without letting party or state authority replace self-emancipation. Revolutionary governments pursued redistribution, industrialization, education, and anticolonial alliances while also creating one-party systems, censorship, imprisonment, mass repression, and catastrophic policies. Neither Soviet history nor abstract theory exhausts the tradition. Anticolonial Marxists revised European stage theories; Black Marxism challenged accounts that subordinated racial domination; feminist and social-reproduction traditions exposed unpaid care and gendered labor; later democratic, analytical, ecological, and critical reconstructions reopened questions of evidence, planning, pluralism, and freedom. The live dispute is therefore institutional as well as theoretical: who decides, who can dissent, and what forms of power remain answerable to the people they claim to emancipate?',
        ],
      },
    ],
    presentation: {
      mode: 'concise',
      orientation: [
        {label: 'Post-Marx anchor', value: 'Marx’s death in 1883; no single birth date for the tradition'},
        {label: 'Formation', value: 'Texts · editing · labor organization · parties · movements'},
        {label: 'Political forms', value: 'Unions · councils · parties · fronts · states'},
        {label: 'Global revisions', value: 'Anticolonial · Black · feminist · ecological Marxisms'},
        {label: 'Live disputes', value: 'Reform or rupture · party or self-emancipation · planning and democracy'},
        {label: 'Status', value: 'Competing traditions, not one doctrine or one state history'},
      ],
      articleActionLabel: 'Read the full sourced Marxism article',
      plaqueSubtitleLines: 3,
    },
    objectInterpretations: objectInterpretation(
      'utility-marxism-zurich-congress-1893',
      'This gathering makes Marxism’s organizational life visible: theories became congresses, parties, alliances, and strategic disagreements. The photograph represents one European network after one congress, not the whole international tradition, a complete roster, or a single agreed program.',
    ),
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Socialism', url: 'https://plato.stanford.edu/archives/fall2025/entries/socialism/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Karl Marx', url: 'https://plato.stanford.edu/archives/sum2025/entries/marx/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Feminist Perspectives on Class and Work', url: 'https://plato.stanford.edu/archives/fall2024/entries/feminism-class/', kind: 'academic-reference'},
      {label: 'Library of Congress — Soviet Union: A Country Study', url: 'https://www.loc.gov/item/90025756/', kind: 'collection-record'},
    ],
  },
};
