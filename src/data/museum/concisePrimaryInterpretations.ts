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
    lead: 'Kantianism is a family of philosophies that develops Immanuel Kant’s account of the powers and limits of reason. It asks how knowledge, moral freedom, judgment, and shared political life are possible.',
    keyIdeas: [],
    keyWorks: [],
    sections: [
      {
        heading: '',
        paragraphs: [
          'Kantianism is the broad family of philosophies that begins from Immanuel Kant’s critical project. Kant argued that philosophy should examine what human reason can legitimately know, how experience becomes intelligible, and why reason must acknowledge limits when it moves beyond possible experience. He also treated persons as capable of moral self-government and asked how freedom, obligation, judgment, and public reasoning can be justified. Kantianism therefore names neither simple loyalty to Kant nor one fixed doctrine. It names continuing work on the questions and methods his philosophy made unavoidable.',
          'Its central concerns connect knowledge and freedom. Kantian thinkers investigate how the mind contributes to experience without merely inventing the world, how objective judgment is possible, and how moral requirements can bind agents who are nevertheless free. They also ask how aesthetic and political judgment can claim shared validity without becoming mechanical rules. This critical method changed later debates because it made the authority of reason itself a subject of inquiry: reason must establish its powers while also testing the boundaries and social conditions of their use.',
          'The tradition divided from its beginning. Reinhold, Maimon, Fichte, Schelling, and Hegel offered competing responses to perceived gaps in Kant’s system. Later neo-Kantians reconstructed critique around science, culture, and value, while phenomenology, analytic philosophy, critical theory, ethics, and democratic thought carried selected Kantian problems into new settings. Disputes continue over transcendental idealism, the relation between concepts and experience, whether autonomy depends on social institutions, and whether universal reason can confront racial, colonial, gendered, and ableist exclusions without repeating them.',
          'The 1795 engraving of Karl Leonhard Reinhold belongs here because he helped turn the interpretation of Kant into an active philosophical movement. His Letters on the Kantian Philosophy brought the critical project to a wider public, and his search for a more unified foundation shows how quickly reception became revision. The portrait represents one influential mediator, not the founder or sole voice of Kantianism. It helps mark a tradition whose identity lies in argument about what critique requires and how it should change.',
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
      bodyLayout: 'prose',
      plaqueKicker: '',
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
    lead: 'Marxism is a family of intellectual and political traditions developed from Karl Marx’s critique of capitalism. It studies labor, class, exploitation, historical change, and the possibilities and risks of collective emancipation.',
    keyIdeas: [],
    keyWorks: [],
    sections: [
      {
        heading: '',
        paragraphs: [
          'Marxism is a family of theories and political traditions developed from Karl Marx’s critique of capitalism, much of it produced in sustained collaboration with Friedrich Engels. It examines how labor becomes organized through commodity production, wage relations, private control of productive resources, and class power. Marxists ask how these social relations shape institutions, ideas, and everyday life, why capitalism repeatedly changes and generates conflict, and whether people acting together can create less exploitative forms of social organization.',
          'Marxism is historically significant because it joins interpretation to practice. Its account of society is not only an explanation of economic structures; it is also an inquiry into how those structures might be transformed. That connection made Marxism influential in labor movements, socialist parties, anticolonial struggles, revolutions, scholarship, and debates about planning and democracy. It also generated persistent questions about who can act collectively, how class relates to race, gender, empire, and nation, and whether reform can overcome domination or merely reorganize it.',
          'No single doctrine or political history exhausts the tradition. Later thinkers selected, systematized, rejected, and extended different parts of Marx’s changing and partly unfinished work. Anticolonial Marxists revised European accounts of historical development; Black Marxism challenged theories that subordinated racial domination; feminist and social-reproduction approaches exposed unpaid care and gendered labor. Democratic, analytical, ecological, and critical reconstructions reopened questions about evidence, pluralism, planning, and freedom. Revolutionary governments also made Marxism inseparable from disputes over one-party rule, censorship, imprisonment, mass repression, and catastrophic policy.',
          'The photograph from the 1893 International Socialist Workers’ Congress in Zürich shows why Marxism became more than a body of texts. Organizers and theorists carried its arguments into congresses, unions, parties, educational networks, and international alliances. The image records one European socialist network after one congress, not a complete delegate portrait, a picture of global Marxism, or proof of a shared strategy. It illustrates the continuing problem rather than resolving it: how can collective power pursue emancipation while remaining answerable to those in whose name it acts?',
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
      bodyLayout: 'prose',
      plaqueKicker: '',
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
