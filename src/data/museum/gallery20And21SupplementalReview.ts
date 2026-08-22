import type {
  MuseumCanonicalContextRef,
  MuseumSupplementalExhibit,
  MuseumSupplementalInterpretationSource,
} from './platoSupplementalExhibits';
import {getMuseumAsset} from './museumAssets';

type PlaqueType = NonNullable<MuseumSupplementalExhibit['wallPlaque']>['type'];
type Evidence = {
  plaqueTitle: string;
  plaqueType: PlaqueType;
  invitation: string;
  articleTitle: string;
  visualReading: string;
  claim: string;
  boundary: string;
  guide: readonly [string, string];
  resolution: string;
  leadOverride?: string;
};

const locks: Record<string, string> = {
  'russell-whitehead-principia': 'fnv1a64:7cc1fa77fe194c43',
  'russell-logical-types': 'fnv1a64:e6fd61ca5b9f1051',
  'frege-sense-reference': 'fnv1a64:d705e555a51f5d63',
  'moore-principia-ethica': 'fnv1a64:b2c2b8cb74d0ecf0',
  'moore-open-question': 'fnv1a64:f2172ec1b7a87c62',
  'moore-common-sense': 'fnv1a64:8c224995a43c2c95',
  'moore-external-world': 'fnv1a64:ea235bcfff8ba592',
  'moore-cambridge-practice': 'fnv1a64:aa5294798003d978',
  'wittgenstein-tractatus': 'fnv1a64:d974b810dfbbd49d',
  'wittgenstein-tractatus-opening': 'fnv1a64:c7e68446f13da84e',
  'wittgenstein-truth-tables': 'fnv1a64:77b09ca6440364dc',
  'wittgenstein-investigations': 'fnv1a64:1df7e7d97b3709b4',
  'wittgenstein-language-games': 'fnv1a64:316fbc968ee768c6',
  'quine-two-dogmas': 'fnv1a64:bada819478306643',
  'quine-ontology': 'fnv1a64:1cac9f2779c0ddc2',
  'quine-word-object': 'fnv1a64:ced01bc5f1d47b8f',
  'quine-naturalized-epistemology': 'fnv1a64:97e83354a1dc192e',
  'carnap-tolerance': 'fnv1a64:752607951689cc23',
  'anscombe-intention-why': 'fnv1a64:2937558a7de1306f',
  'anscombe-practical-knowledge': 'fnv1a64:1c15b2c2e7548058',
  'anscombe-modern-moral-philosophy': 'fnv1a64:83149446f5d364a0',
  'anscombe-truman-degree': 'fnv1a64:266d53f974b2ca09',
  'anscombe-causality': 'fnv1a64:8e59e4bbd6239457',
  'phenomenology-intentionality': 'fnv1a64:92d33a4c9b0855e5',
  'husserl-crisis-lifeworld': 'fnv1a64:1b9f86525dac2056',
  'husserl-epoche-reduction': 'fnv1a64:86c7f1db9f39f296',
  'husserl-time-consciousness': 'fnv1a64:7330e984271422c7',
  'heidegger-being-time': 'fnv1a64:d1266d0e1f7e15f7',
  'heidegger-being-with': 'fnv1a64:9625fbc9d87d7d46',
  'merleau-phenomenology-perception': 'fnv1a64:7df5c765fce9a094',
  'merleau-flesh-reversibility': 'fnv1a64:aaaaabd0810eaaba',
  'existentialism-kierkegaard-precursor': 'fnv1a64:9bdf9990240c3d36',
  'existentialism-facticity-freedom': 'fnv1a64:a2514524c41dffe9',
  'beauvoir-ethics-ambiguity': 'fnv1a64:8b84b906d224098a',
  'beauvoir-second-sex': 'fnv1a64:0a29914c2166c938',
  'sartre-bad-faith': 'fnv1a64:24ef24c08b1140a8',
  'sartre-existentialism-humanism': 'fnv1a64:551d1e72ae1bf238',
  'camus-absurd-revolt': 'fnv1a64:d2dc7a4f40025145',
  'camus-plague-solidarity': 'fnv1a64:22af404b484b7704',
  'fanon-colonial-experience': 'fnv1a64:159edefa3565acc8',
  'levinas-ethics-before-ontology': 'fnv1a64:3b5ccc59ef9e0725',
  'levinas-saying-said': 'fnv1a64:b00915896141c92d',
  'gadamer-truth-method': 'fnv1a64:0f52331672e59519',
  'gadamer-art-play-truth': 'fnv1a64:511d771e8a3392ad',
};

/** Walking order is deliberately identical to Galleries 20 and 21. */
const evidence: Record<string, Evidence> = {
  'russell-whitehead-principia': {
    plaqueTitle: 'Alfred North Whitehead', plaqueType: 'other', articleTitle: 'Bertrand Russell',
    invitation: 'An undated lifetime photograph restores Whitehead’s coauthorship without pretending to show the making or contents of Principia Mathematica.',
    visualReading: 'The seated figure and domestic interior establish a portrait setting; they do not disclose collaboration, authorship shares, mathematical method, or a date.',
    claim: 'Principia Mathematica was jointly authored by Whitehead and Russell and issued in three volumes from 1910 to 1913; its ramified theory of types and formal derivations must be established from the work and histories of logic, not this portrait.',
    boundary: 'Wellcome identifies Whitehead and one photograph but records neither photographer nor date. Image identifier V0027330 and work reference 13736i belong to the reproduction and collection records, not to a Principia manuscript.',
    guide: ['Joint authorship matters: the portrait counters a Russell-only reception without measuring either author’s contribution.', 'Use the photograph for identity and reception; use Principia and scholarship for the logical architecture and publication history.'],
    resolution: 'reconciled the installed Whitehead portrait, Wellcome identifiers, missing maker/date, CC BY terms, joint authorship, and the absence of documentary evidence for collaboration.',
    leadOverride: 'The installed image is a lifetime portrait of Alfred North Whitehead, not a page from Principia Mathematica. Whitehead and Bertrand Russell jointly authored the three-volume project, but a later history that centers Russell can obscure that collaboration. The work’s project was to derive mathematics through an explicitly formal logical system while blocking contradictions through restrictions on admissible totalities. Its notation, axioms, and type hierarchy belong to the published volumes; posture and setting in an undated portrait cannot reveal them.',
  },
  'russell-logical-types': {
    plaqueTitle: 'Bertrand Russell at Caltech', plaqueType: 'other', articleTitle: 'Bertrand Russell',
    invitation: 'A 1929 press photograph identifies Russell years after Principia while leaving the theory of types and Whitehead’s coauthorship outside the frame.',
    visualReading: 'Russell’s coat, hat, outdoor pose, and Caltech setting document a visit and public likeness, not a paradox, a hierarchy of types, or proposition *54·43.',
    claim: 'Russell’s paradox motivates restrictions on self-membership and totality, while Principia’s type theory is more intricate than a single visual hierarchy; the notation often leaves types implicit rather than marking every expression with a type symbol.',
    boundary: 'The Los Angeles Times photograph dates to 28 October 1929 and cannot be treated as a 1910 primary-text detail. Its presence must not erase Alfred North Whitehead from the jointly authored formal project.',
    guide: ['Separate the 1929 portrait from the 1910–13 publication and from the proposition formerly associated with this asset ID.', 'Type restrictions are formal responses to paradox, not facts visible in Russell’s appearance or Caltech surroundings.'],
    resolution: 'replaced the stale proposition-page reading with the actual 1929 UCLA/Los Angeles Times portrait and restored the distinction between identity evidence, formal claims, and joint authorship.',
    leadOverride: 'The displayed object is a Los Angeles Times photograph of Bertrand Russell at the California Institute of Technology on 28 October 1929. It is not proposition *54·43, a proof crop, or a diagram of logical types. Russell’s paradox exposes trouble in allowing unrestricted collections, and Principia Mathematica responds through a ramified hierarchy of types and related formal devices. Those claims come from the texts and scholarship. The portrait supplies a later public image of one coauthor while Whitehead’s equal authorship remains explicit.',
  },
  'frege-sense-reference': {
    plaqueTitle: 'Phases of Venus', plaqueType: 'concept-argument-diagram-or-method', articleTitle: 'Gottlob Frege',
    invitation: 'A 2014 astronomical diagram shows Venus under changing illumination but is only a later cue for Frege’s Morning Star and Evening Star example.',
    visualReading: 'The sequence depicts illuminated phases as viewing geometry changes; it does not depict two linguistic expressions, their cognitive value, or Frege’s 1892 publication.',
    claim: 'Frege distinguishes an expression’s referent from its mode of presentation to explain how true identity statements can be informative. “Morning Star” and “Evening Star” present Venus differently; the planet’s phases are another phenomenon.',
    boundary: 'Fernando de Gorocica’s CC BY-SA diagram is later interpretive imagery after Galileo, not a Frege diagram, journal scan, or proof that the semantic distinction is settled in every case.',
    guide: ['Read the diagram as contextual astronomy: phases are not the Morning Star and Evening Star names.', 'Frege’s argument concerns reference, sense, and informative identity; its evidence is the 1892 essay and subsequent analysis.'],
    resolution: 'identified the installed 2014 Venus diagram, removed the false essay-page interpretation, preserved its license, and separated astronomical appearance from Fregean semantics.',
    leadOverride: 'The installed image is Fernando de Gorocica’s 2014 diagram of the phases of Venus, not a scan of Frege’s 1892 essay. It supplies astronomical context for the shared referent in Frege’s famous Morning Star and Evening Star example, but those names do not mean the planet’s illuminated phases. Frege asks how two expressions can refer to Venus while presenting it differently, making a true identity statement informative. The semantic argument comes from Über Sinn und Bedeutung and its reception, not from this later diagram.',
  },
  'moore-principia-ethica': {
    plaqueTitle: 'Principia Ethica Title Page', plaqueType: 'work-or-text', articleTitle: 'G. E. Moore',
    invitation: 'A reproduced 1903 title page authenticates Moore’s book and publication date while offering no visual shortcut to its arguments.',
    visualReading: 'Typography, author, title, and imprint are visible; the source does not identify the scanned copy, holding library, accession, or full custody chain.',
    claim: 'Moore’s book separates questions about what “good” means from empirical descriptions and develops the open-question argument; the title page witnesses publication, not the validity of those claims.',
    boundary: 'Commons supplies a term-expired and simple-title-page reuse rationale, but neither a verified institutional copy nor the intellectual content of the displayed page should be invented.',
    guide: ['The installed object is a title-page reproduction from the 1903 work, with the physical copy’s provenance unresolved.', 'Treat the page as publication evidence and the text as argument evidence; do not infer doctrine from typography.'],
    resolution: 'bounded the title-page reproduction, unknown copy provenance, rights rationale, 1903 publication witness, and the difference between object identity and philosophical argument.',
  },
  'moore-open-question': {
    plaqueTitle: 'Natural Facts and an Open Evaluative Question', plaqueType: 'concept-argument-diagram-or-method', articleTitle: 'G. E. Moore',
    invitation: 'A contemporary Museum illustration stages an evaluative question without claiming that an image can prove Moore’s non-naturalism.',
    visualReading: 'The constructed scene juxtaposes measurable features with an unresolved evaluative prompt; every element is a contemporary interpretive choice of unknown generation date rather than historical evidence.',
    claim: 'Moore argues that for a proposed naturalistic definition of good it can remain intelligible to ask whether the defining property is good. That semantic pressure does not by itself settle every metaphysical reading of value.',
    boundary: 'The internally generated image has no outside accession or independent provenance and is neither Moore’s diagram nor a demonstration that natural properties and evaluative properties must be ontologically separate.',
    guide: ['Use the image to rehearse a question, not as evidence for the answer or for Moore’s intentions.', 'Test a proposed definition carefully; distinguish conceptual openness, non-naturalism, and later criticisms.'],
    resolution: 'retained the immutable repository derivative while marking unavailable prompt, model, version, date, raw output, and raw-output hash as unknown, and tightened the distinction among visual prompt, open-question reasoning, and contested metaphysical conclusions.',
  },
  'moore-common-sense': {
    plaqueTitle: 'Earth’s Western Hemisphere', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'G. E. Moore',
    invitation: 'NASA’s 2002 Blue Marble composite presents Earth as shared context, not as a photograph Moore used or a theory-free deliverance of common sense.',
    visualReading: 'Land, ocean, clouds, and darkness form a seamless composite assembled from satellite and cartographic data; the apparent single view is technically mediated.',
    claim: 'Moore’s 1925 “A Defence of Common Sense” lists ordinary propositions, including that the Earth existed long before his body, as things he claims to know. The composite is a modern companion to that claim.',
    boundary: 'The image postdates Moore, was not evidence in his argument, and should not turn common sense into unaided seeing. Its construction is itself a reminder that ordinary knowledge can depend on instruments and models.',
    guide: ['Credit the 2002 NASA Visible Earth composite and its named image/data contributors rather than calling it one photograph.', 'Compare Moore’s claims about ordinary knowledge with skeptical challenges; the image cannot adjudicate that dispute.'],
    resolution: 'reconciled the NASA composite, creators, data sources, government-work reuse, 2002 date, and its contextual rather than evidentiary relation to Moore.',
  },
  'moore-external-world': {
    plaqueTitle: 'Study of Hands', plaqueType: 'object-manuscript-site-or-archaeological-context', articleTitle: 'G. E. Moore',
    invitation: 'Dürer’s 1506 study makes hands visible while remaining unrelated to the hands Moore raised in his 1939 lecture.',
    visualReading: 'Pen, ink, white heightening, and posed hands belong to an artistic study associated with Christ among the Doctors, not to a philosophical demonstration.',
    claim: 'Moore’s performance begins from “Here is one hand” and “here is another” in arguing that at least two external objects exist. Whether that satisfies a skeptic remains contested.',
    boundary: 'The source records the Blasius Collection in Braunschweig, not the Albertina. No accession is supplied, and faithful-reproduction reuse can vary outside the United States.',
    guide: ['Distinguish Dürer’s study, its collection record, and Moore’s two-hand performance.', 'The drawing illustrates neither Moore’s actual hands nor the success of his proof against skeptical standards.'],
    resolution: 'corrected the false Albertina holding to the Blasius Collection, retained missing accession and rights limits, and separated Dürer’s study from Moore’s lecture.',
  },
  'moore-cambridge-practice': {
    plaqueTitle: 'Cambridge Moral Sciences Club, c. 1913', plaqueType: 'paired-or-grouped-historical-figures', articleTitle: 'G. E. Moore',
    invitation: 'An anonymous group photograph places Moore and Russell within a philosophical institution but records no particular argument or exchange.',
    visualReading: 'Posed rows and reported identifications document membership and proximity; they cannot reveal speech, disagreement, influence, hierarchy, or the circumstances of the sitting.',
    claim: 'The Moral Sciences Club formed part of Cambridge’s culture of papers and discussion in which Moore worked. Institutional history supports that setting without making this image evidence of a specific debate.',
    boundary: 'Commons reports the photograph through Ray Monk’s biography and supplies no verified holding collection or accession. Its anonymous-photo rights rationale and sitter identifications remain source-dependent.',
    guide: ['Moore is reported third from right in the second row; Russell appears in front, but the image is not a meeting transcript.', 'Use archival and biographical sources for club practices; do not infer intellectual positions from pose or placement.'],
    resolution: 'kept the reported sitter identifications and c. 1913 date while disclosing anonymous authorship, indirect publication provenance, and absent holding/accession.',
  },
  'wittgenstein-tractatus': {
    plaqueTitle: 'Tractatus Title Page, 1922', plaqueType: 'work-or-text', articleTitle: 'Ludwig Wittgenstein',
    invitation: 'The first English-language edition’s title page establishes an edition and translation context, not the book’s arguments or later reception.',
    visualReading: 'The bilingual title, author line, publishers, and restrained layout identify the 1922 edition; no displayed proposition can be read from this page.',
    claim: 'The Tractatus organizes numbered propositions around world, fact, picture, truth-function, logic, and the limits of meaningful saying. C. K. Ogden’s English translation mediates this edition.',
    boundary: 'The source supplies no holding copy or accession, and its reuse rationale concerns simple typography. A title page cannot verify the interpretation, completeness, or influence of the text.',
    guide: ['Identify this as the 1922 Harcourt/Kegan Paul English-language edition and name Ogden’s translation role.', 'Move from title-page evidence to the numbered primary text before making claims about picture theory or logical positivist reception.'],
    resolution: 'specified the edition and translator, retained unresolved copy provenance and title-layout rights basis, and separated bibliographic evidence from doctrine and reception.',
  },
  'wittgenstein-tractatus-opening': {
    plaqueTitle: 'Opening Proposition Page of the Tractatus', plaqueType: 'work-or-text', articleTitle: 'Ludwig Wittgenstein',
    invitation: 'A bilingual 1922 page makes the opening propositions and early translation visible while remaining a mediated edition rather than an autograph.',
    visualReading: 'German appears beside C. K. Ogden’s English, and nested numbers make the architecture visible; the page is p. 30 of the edition, not a free-standing aphorism poster.',
    claim: 'The opening moves from the world as what is the case to facts and states of affairs. Its numbered structure suggests dependencies but does not make every later proposition a simple deduction from the first.',
    boundary: 'The scan’s physical copy, holding, and accession are unresolved. Parallel text records translation history and cannot be called an unmediated German original.',
    guide: ['Read both the numbered hierarchy and the German/English pairing as features of the 1922 edition.', 'Use the page for primary wording and structure, while consulting the whole work and scholarship for interpretation.'],
    resolution: 'identified the exact bilingual opening page, named Ogden, disclosed copy provenance limits, and bounded claims about structure, translation, and argument.',
  },
  'wittgenstein-truth-tables': {
    plaqueTitle: 'Modern Truth-Table Schema', plaqueType: 'concept-argument-diagram-or-method', articleTitle: 'Ludwig Wittgenstein',
    invitation: 'AlessandroDiCaro’s 2005 teaching schema clarifies combinations of truth values but is not a drawing or manuscript by Wittgenstein.',
    visualReading: 'Rows, symbols, and truth-value combinations make a formal operation compactly inspectable; design choices belong to a modern explainer.',
    claim: 'The Tractatus treats propositions as truth-functions of elementary propositions and develops a general operation. Its logical atomism and picture theory cannot be reduced to this one schema.',
    boundary: 'The uploader’s public-domain dedication covers the modern diagram. The reported derivation from a 1960 edition does not turn it into primary evidence or establish an institutional holding.',
    guide: ['Attribute the diagram to AlessandroDiCaro in 2005 and label it later teaching material.', 'Use it to inspect truth-functional combinations, then return to the Tractatus for the broader account of representation.'],
    resolution: 'retained the modern diagram’s maker and dedication, removed any primary-object implication, and bounded its role within the larger Tractarian project.',
  },
  'wittgenstein-investigations': {
    plaqueTitle: 'Wittgenstein’s House at Skjolden', plaqueType: 'object-manuscript-site-or-archaeological-context', articleTitle: 'Ludwig Wittgenstein',
    invitation: 'A 2022 landscape photograph records the reconstructed Skjolden house and site, providing bounded biographical context for the later work.',
    visualReading: 'Fjord, steep slope, small dark structure, and boat situate a remote working place; distance and reconstruction prevent claims about an untouched interior or writing session.',
    claim: 'Philosophical Investigations §1 opens with Augustine’s Confessions I.8 and identifies there a picture in which words name objects and sentences combine names; the ensuing examples test how limited that picture is. Wittgenstein worked repeatedly at Skjolden, but the site supports only a biographical connection to his developing work.',
    boundary: 'Mia1964 photographed the reconstructed, returned building on 3 October 2022 under CC BY-SA 4.0. It is a present-day site image, not a primary manuscript, an untouched writing room, or a 1930s fabric survey.',
    guide: ['Read the image as a reconstructed place with monument number 247129.', 'Use Philosophical Investigations §1 for the Augustine passage and language picture; the landscape cannot establish a doctrine, passage, or composition date.'],
    resolution: 'reconciled the stale object account with the actual Skjolden landscape, reconstruction status, 2022 authorship and license; directly sourced the Augustine and language-picture claim to Philosophical Investigations §1; and bounded biographical inference.',
    leadOverride: 'The mounted object is Mia1964’s 2022 photograph of the reconstructed house at Skjolden where Wittgenstein worked during several periods. The posthumous 1953 Philosophical Investigations reorganizes philosophy around language-games, use, family resemblance, rule-following, and forms of life. Its opening quotes Augustine and extracts a naming-centered picture of language before testing that picture against other uses. Biographical sources connect Wittgenstein’s Norwegian work periods to his developing thought, but the distant building cannot assign a sentence, doctrine, or date to what occurred there.',
  },
  'wittgenstein-language-games': {
    plaqueTitle: 'Tools, Games, Builders, and Changing Uses', plaqueType: 'concept-argument-diagram-or-method', articleTitle: 'Ludwig Wittgenstein',
    invitation: 'A contemporary Museum collage gathers recurring examples while declaring itself an interpretation rather than Wittgenstein’s diagram.',
    visualReading: 'Toolbox, chess arrangements, builders, and blocks juxtapose activities without claiming that one visual grammar unifies every language-game.',
    claim: 'Philosophical Investigations §§2 and 23 develop builders and a plurality of language-games; later rule-following discussions resist a private interpretation fixing every application in advance.',
    boundary: 'The internal repository-pinned interpretive asset has no independent accession or outside provenance. “Meaning is use” is an orientation, not an exhaustive formula, and contested social readings should not be presented as direct quotation.',
    guide: ['Track how words function within different activities instead of looking for one pictorial essence.', 'Distinguish Wittgenstein’s textual examples from this contemporary synthesis and from later rule-following debates.'],
    resolution: 'preserved internal-image disclosure, mapped the builders and language-game claims to texts, and qualified the image’s synthesis and later social reception.',
  },
  'quine-two-dogmas': {
    plaqueTitle: 'A Revisable Web under Observational Pressure', plaqueType: 'concept-argument-diagram-or-method', articleTitle: 'W. V. O. Quine',
    invitation: 'A contemporary network image interprets Quine’s web metaphor without claiming to be his diagram or to rank every belief equally.',
    visualReading: 'Connected strands and pressures make distributed revision imaginable, while position and color are curatorial inventions rather than a formal Quinean model.',
    claim: '“Two Dogmas of Empiricism” challenges accounts of analyticity and reductionism and describes statements facing experience as a corporate body. Revisions differ in cost and centrality.',
    boundary: 'The repository-pinned interpretive derivative has no external provenance or accession. It cannot prove that logic is revised casually, that any response is equally rational, or that Quine supplied this exact web.',
    guide: ['Use the network as a metaphor for interconnected adjustment, not a metric or causal diagram.', 'Map analyticity, reductionism, confirmation, and revision to the essay’s sections rather than to visual proximity.'],
    resolution: 'kept the image explicitly interpretive, tied claims to the 1951 essay, and bounded strong conclusions about holism, logic, and equal revisability.',
  },
  'quine-ontology': {
    plaqueTitle: 'Arbor Porphyrii, 1730', plaqueType: 'reception-or-transmission-history', articleTitle: 'W. V. O. Quine',
    invitation: 'A historical classification tree serves as a foil for Quine’s criterion of commitment rather than as his ontology or notation.',
    visualReading: 'Latin labels branch from general to specific categories in an inherited Porphyrian form; the diagram predates Quine by two centuries.',
    claim: 'In “On What There Is,” Quine links ontological commitment to the values variables must take for a regimented theory to be true. The criterion applies to theories and formal paraphrases, not simply to pictured branches or nouns.',
    boundary: 'Commons attributes the 1730 print to Purchotius, a Latinized form associated with Edmond Pourchot, and supplies no holding copy or accession. It is contextual reception, not Quine evidence.',
    guide: ['Treat the tree as a 1730 historical taxonomy and reconcile Purchotius/Pourchot as source forms.', 'Apply Quine’s criterion to quantified theories; do not read his commitments directly from ordinary vocabulary or this tree.'],
    resolution: 'reconciled the historical diagram, name forms, unknown copy custody, public-domain basis, and its foil rather than primary-evidence role.',
  },
  'quine-word-object': {
    plaqueTitle: 'Young Hare', plaqueType: 'object-manuscript-site-or-archaeological-context', articleTitle: 'W. V. O. Quine',
    invitation: 'Dürer’s 1502 watercolor supplies a hare as visual cue while remaining unrelated to Quine’s radical-translation thought experiment.',
    visualReading: 'Fur, ears, body, shadow, and crouched pose sustain close depiction of one animal; nothing in the sheet identifies an utterance, speaker, translation manual, or stimulus situation.',
    claim: 'Word and Object’s “gavagai” scenario asks what behavioral evidence can determine among rival translations. Alternatives are structured theoretical choices, not merely interchangeable synonyms.',
    boundary: 'The Albertina records object 3073 and a documented collection history. The reproduction is contextual art, not field evidence, an image of an Indigenous language community, or a record of Quine’s encounter.',
    guide: ['Begin with Dürer’s specific Albertina object and then mark the leap to Quine’s invented scenario.', 'Do not caricature actual speakers; radical translation tests evidential determination under deliberately sparse conditions.'],
    resolution: 'added the Albertina object record and provenance while sharply separating the artwork from gavagai, fieldwork, actual languages, and settled synonymy.',
  },
  'quine-naturalized-epistemology': {
    plaqueTitle: 'Laboratory of Experimental Psychology, 1896', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'W. V. O. Quine',
    invitation: 'An 1896 laboratory photograph visualizes an earlier empirical setting without depicting Quine, his laboratory, or one required method.',
    visualReading: 'Tables, apparatus, room arrangement, and a posed working environment show material experimentation while leaving procedures, subjects, results, and institution unidentified.',
    claim: 'Quine’s 1969 “Epistemology Naturalized” proposes studying how sensory input leads to theory within empirical science. Whether and how normativity survives that relocation remains disputed.',
    boundary: 'The image was published in Popular Science Monthly; photographer, original print, holding institution, and accession remain unverified. Its age supports U.S. term-expired reuse but not provenance beyond the periodical witness.',
    guide: ['Use the scene as historical laboratory context, not as Quine’s empirical program made visible.', 'Separate Quine’s descriptive naturalization from later disputes over reasons, norms, circularity, and instrumental advice.'],
    resolution: 'retained the 1896 periodical witness and reuse basis, disclosed missing photographer/custody, and bounded the relation between laboratory imagery and naturalized epistemology.',
  },
  'carnap-tolerance': {
    plaqueTitle: 'Logical Positivists Collage', plaqueType: 'paired-or-grouped-historical-figures', articleTitle: 'Rudolf Carnap',
    invitation: 'A 2025 collage gathers Schlick, Neurath, Hahn, and Ayer while making Carnap’s absence and the group’s heterogeneity explicit.',
    visualReading: 'Four reused portraits share one modern grid, creating visual unity that no historical sitting or single doctrine supplied.',
    claim: 'Carnap formulates the principle of tolerance in Logical Syntax of Language §17: linguistic frameworks are adopted and evaluated through proposals and consequences rather than one uniquely correct logical language.',
    boundary: 'Valeriy Shunkov’s CC BY-SA collage is later reception, not a Vienna Circle group portrait. Ayer was an associated British interpreter rather than a member of the Vienna Circle, and Carnap is not pictured.',
    guide: ['Name the four people actually shown and resist treating the composite as one historical event.', 'Anchor tolerance in Carnap’s 1934 work and distinguish it from his later framework discussions and from “anything goes.”'],
    resolution: 'identified the collage and its license, preserved Carnap’s deliberate absence, corrected Ayer’s status, and located tolerance in the appropriate primary text.',
  },
  'anscombe-intention-why': {
    plaqueTitle: 'One Action under Widening Descriptions', plaqueType: 'concept-argument-diagram-or-method', articleTitle: 'Elizabeth Anscombe',
    invitation: 'A Museum cutaway interprets Anscombe’s pump example without deciding which distant consequences belong to the agent’s intention.',
    visualReading: 'Hand, pump, moving water, and garden form a widening chain; the chosen cutaway and arrows compress time, agency, knowledge, and possible interference.',
    claim: 'In Intention, the question “Why?” can reveal reasons and descriptions under which an action is intentional. One bodily movement may fall under several descriptions without every consequence being intended.',
    boundary: 'The repository-pinned interpretive illustration has internal provenance only and is not Anscombe’s diagram. The pump case must be read in the text, including the possibility that an agent lacks knowledge of wider effects.',
    guide: ['Ask “Why?” at each description and note where the question is refused, unknown, or answered by evidence rather than reason.', 'Do not infer intention merely from causal contribution, foreseeability, or the diagram’s uninterrupted visual chain.'],
    resolution: 'retained explicit generated-image status, tied the chain to Intention’s sections, and prevented foreseen or remote consequences from becoming automatically intended.',
  },
  'anscombe-practical-knowledge': {
    plaqueTitle: 'Hand Water Pump on Third Avenue, 1898', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Elizabeth Anscombe',
    invitation: 'James Reuel Smith’s Bronx street photograph supplies a real pump while predating Anscombe and remaining unrelated to her example.',
    visualReading: 'Pump, fence, roadway, and urban surroundings establish a material apparatus and place, but no person is shown operating it and no intention can be inferred.',
    claim: 'Anscombe describes practical knowledge as knowledge in acting, not ordinarily reached by observing oneself as a spectator. “Without observation” does not make action infallible or guarantee success.',
    boundary: 'The New-York Historical Society connection is reported through the Commons release, but no direct object page or accession is stored. The photograph is contextual and not the pump, garden, or action chain in Intention.',
    guide: ['Separate the 1898 Bronx object record from Anscombe’s philosophical pump case.', 'Practical knowledge concerns the agent’s action description; failure, ignorance, and mismatch between intention and result remain possible.'],
    resolution: 'bounded the historical photograph, incomplete direct repository record, CC0 release, and the distinction between a real pump and practical knowledge in Anscombe’s example.',
  },
  'anscombe-modern-moral-philosophy': {
    plaqueTitle: 'Seven Virtues, about 1450', plaqueType: 'reception-or-transmission-history', articleTitle: 'Elizabeth Anscombe',
    invitation: 'Pesellino and Workshop’s cassone panel offers a historical virtue vocabulary without turning Anscombe’s 1958 polemic into a medieval program.',
    visualReading: 'Seven personifications and named exemplars extend across a gold-ground panel designed for a cassone; arrangement and iconography belong to a Renaissance social setting.',
    claim: '“Modern Moral Philosophy” calls for adequate moral psychology, attacks consequentialist permission, and questions a law-like moral “ought.” It helped motivate later virtue-ethics reception without supplying one complete replacement theory.',
    boundary: 'The Birmingham Museum of Art dates the panel about 1450, attributes it to Francesco Pesellino and Workshop, and records 1961.102 plus provenance through Toscanelli, Wittgenstein, Contini-Bonacossi, Kress, and loans. It was not chosen by Anscombe.',
    guide: ['Read the panel as a specific cassone front with documented provenance, not as a timeless list of all virtues.', 'Distinguish Anscombe’s three polemical theses, later virtue ethics, and disputed histories of obligation.'],
    resolution: 'corrected attribution and date, added BMA accession and provenance, and separated the Renaissance object from Anscombe’s essay and later virtue-ethics revival.',
  },
  'anscombe-truman-degree': {
    plaqueTitle: 'Harry S. Truman at His White House Desk', plaqueType: 'other', articleTitle: 'Elizabeth Anscombe',
    invitation: 'A 1946 official portrait identifies the officeholder Anscombe opposed while showing neither her 1956 protest nor the bombings and their victims.',
    visualReading: 'Truman sits at the Oval Office desk with pen in hand; the composed portrait conveys office and authority but no policy deliberation, ceremony, protest, or wartime event.',
    claim: 'Anscombe opposed Oxford’s 1956 honorary degree and later published “Mr Truman’s Degree,” arguing against intentionally killing noncombatants. The action and pamphlet dates should not be collapsed.',
    boundary: 'The Truman Library record 96-911-01 dates the photograph to 1946 and says it knows of no claims but requires users to assess rights; Commons separately asserts a federal-work public-domain basis and records a retouch.',
    guide: ['Keep the 1946 portrait, 1956 Oxford protest, and later pamphlet publication distinct.', 'Study intention, double effect, historical alternatives, and victim testimony beyond the officeholder’s portrait.'],
    resolution: 'supplied the Truman accession and exact institutional rights caution, distinguished portrait/protest/pamphlet dates, and kept victims and contested history outside a heroic portrait frame.',
  },
  'anscombe-causality': {
    plaqueTitle: 'Newton’s Cradle in Motion', plaqueType: 'concept-argument-diagram-or-method', articleTitle: 'Elizabeth Anscombe',
    invitation: 'A 2018 mechanics photograph offers a deliberately limited foil for Anscombe’s rejection of necessary determination as the essence of causation.',
    visualReading: 'Aligned spheres and one displaced ball present a controlled transfer whose apparent regularity can hide friction, setup, interference, and idealization.',
    claim: 'In “Causality and Determination,” Anscombe separates causation from determinism and begins with production verbs and singular causal processes rather than one universal-law template.',
    boundary: 'The Dean of Physics created and licensed this contemporary image under CC BY-SA 4.0; it is not Anscombe’s example or evidence that her lecture supplied a finished mechanism theory.',
    guide: ['Use the cradle to notice contact and transfer while resisting the inference that every cause necessitates its effect.', 'Track Anscombe’s own causal verbs and indeterministic cases; later mechanism accounts are reception, not her stated conclusion.'],
    resolution: 'kept creator and license explicit, treated the cradle as a potentially misleading foil, and bounded claims about determinism, mechanisms, and theoretical completeness.',
  },
  'phenomenology-intentionality': {
    plaqueTitle: 'Intentionality: Object, Profile, and Horizon', plaqueType: 'concept-argument-diagram-or-method', articleTitle: 'Phenomenology',
    invitation: 'A contemporary Museum collage interprets profiles and horizons without claiming to be a historical Husserl diagram or an inner picture of consciousness.',
    visualReading: 'Overlapping views of an ordinary object make partial appearance and anticipated sides visible through a designed composite rather than a documentary scene.',
    claim: 'Phenomenological intentionality names directedness toward objects in differing modes of givenness; it is not primarily an intention to act. Husserl develops the correlation across Logical Investigations and Ideas I.',
    boundary: 'The repository-pinned interpretive asset has internal provenance only. It cannot establish realism or idealism, reduce intentionality to vision, or assign every surrounding phenomenological development to Husserl alone.',
    guide: ['Compare perception, memory, imagination, doubt, and expectation as different modes rather than as copies inside a mind.', 'Treat the collage as a prompt for profile and horizon; use primary and scholarly sources for the philosophical distinctions.'],
    resolution: 'preserved the image’s interpretive status, distinguished directedness from action-intention and inner imagery, and bounded Husserl’s role within the broader branch.',
  },
  'husserl-crisis-lifeworld': {
    plaqueTitle: 'Street Paver', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Husserl',
    invitation: 'Atget’s 1899–1900 street photograph makes embodied labor and an inherited city visible without becoming evidence from Husserl’s Crisis.',
    visualReading: 'Body, paving stones, tools, street, and camera position show work in progress; the frame withholds the worker’s name, conditions, voice, and wider infrastructure.',
    claim: 'The Crisis examines how scientific idealization presupposes a historically sedimented lifeworld. Parts I–II appeared in 1936, with further materials published posthumously in 1954.',
    boundary: 'The Metropolitan Museum records the work as a 1956 gelatin-silver print from Atget’s glass negative, object 56.610.12, and makes its open-access public-domain image available. It neither depicts Husserl nor licenses universal claims about “Europe.”',
    guide: ['Distinguish Atget’s exposure date, the 1956 print, and the Met acquisition record.', 'Use labor and street materiality to ask what abstraction presupposes, while criticizing exclusionary accounts of Europe and reason.'],
    resolution: 'added the Met object, print process and accession, kept exposure/print/publication dates distinct, and bounded the image’s relation to lifeworld and contested European vocation.',
  },
  'husserl-epoche-reduction': {
    plaqueTitle: 'Edmund Husserl, c. 1900', plaqueType: 'other', articleTitle: 'Husserl',
    invitation: 'An incompletely provenanced lifetime portrait identifies Husserl but cannot show the epoché, reduction, or their changing formulations.',
    visualReading: 'Formal dress, beard, pose, and photographic crop support identity and period context only; expression cannot disclose a method or philosophical attitude.',
    claim: 'Ideas I §§31–33 and 56–62 distinguish bracketing the natural attitude from phenomenological reduction. Epoché and reduction are related operations, not interchangeable slogans or denial of the world.',
    boundary: 'The Commons record plausibly dates the photograph around 1900 but identifies neither photographer, original repository, accession, nor a complete rights chain. Those gaps remain visible rather than converted into a confident Public Domain Mark claim.',
    guide: ['Use the portrait only for lifetime identity around the Logical Investigations period.', 'Bracket commitment is not erase existence: compare epoché, reduction, reflection, and later developments in Husserl’s texts.'],
    resolution: 'retained approximate identity/date while disclosing absent maker, repository, accession and rights chain, and kept portrait evidence separate from method.',
  },
  'husserl-time-consciousness': {
    plaqueTitle: 'Beethoven Op. 101 Manuscript Sketch', plaqueType: 'work-or-text', articleTitle: 'Husserl',
    invitation: 'Beethoven’s 1816 sketch supplies a material musical sequence while predating Husserl and remaining unrelated to his lectures.',
    visualReading: 'Notation, revision, crossing-out, and page sequence make composition materially visible; a static manuscript is not the heard duration Husserl analyzes.',
    claim: 'Husserl’s 1905 lectures distinguish primal impression, retention, and protention in temporal experience; retention is not ordinary recollection, and protention is not explicit prediction.',
    boundary: 'The Library of Congress identifies the autograph sketch through digital ID molden-0508. The object is neither a lecture illustration nor evidence that Beethoven’s sonata was Husserl’s example.',
    guide: ['Read the manuscript as an 1816 LOC object and conceptual companion, not as a score analysis supplied by Husserl.', 'Attend to a sounding phrase: retention holds the just-past while protention opens the immediate next, without turning either into a separate act.'],
    resolution: 'supplied the LOC locator and manuscript status, separated 1816 composition from Husserl’s 1905 lectures, and clarified retention/protention limits.',
  },
  'heidegger-being-time': {
    plaqueTitle: 'Equipment, Breakdown, and Being-in-the-World', plaqueType: 'concept-argument-diagram-or-method', articleTitle: 'Heidegger',
    invitation: 'A contemporary workshop collage interprets equipmental involvement without claiming to be historical evidence or a moral defense of Heidegger.',
    visualReading: 'Tools, workbench, hand, task, and interruption compress a network of use into one designed image; no single pictured tool carries an ontology by itself.',
    claim: 'Being and Time §§15–18 analyzes equipment and worldhood, while thrownness, projection, anxiety, and temporality develop elsewhere in the unfinished 1927 project.',
    boundary: 'The internal repository-pinned interpretive asset has no external accession and cannot prove the analysis or substitute authenticity for ethics. Heidegger’s Nazi Party membership, rectorship, and antisemitic passages remain essential critical context.',
    guide: ['Follow relations among tool, material, task, user, and others before isolating an object’s properties.', 'Keep ontological analysis, the work’s incompleteness, and political judgment in view without using one to erase another.'],
    resolution: 'retained generated-image disclosure, mapped equipment claims to the text, corrected the unfinished-project context, and preserved explicit political and ethical limits.',
  },
  'heidegger-being-with': {
    plaqueTitle: 'Street Scene, Crowd Walking, 1923', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Heidegger',
    invitation: 'A Harris & Ewing street photograph records people sharing a route but does not picture Mitsein or diagnose anyone as “the they.”',
    visualReading: 'A large crowd, trees, clothing, and direction of movement establish a public street moment while leaving identities, purposes, relationships, and experience unknown.',
    claim: 'Being and Time §§26–27 treats being-with as an ontological structure of a shared world and das Man as ordinary impersonal norms, not simply a visible crowd or moral insult.',
    boundary: 'The Library of Congress records LCCN 2016892098 and digital file hec.42851 from the original negative. Collection status supports reuse, but the exact LOC rights statement should not be inflated into proof of every jurisdiction.',
    guide: ['Use the image for a 1923 shared public setting, never as a literal photograph of das Man.', 'Distinguish being-with from conformity and connect political criticism to historical and scholarly evidence beyond this street.'],
    resolution: 'added exact LOC identifiers, bounded reuse language, and prevented a real crowd from becoming visual proof of an ontological or political category.',
  },
  'merleau-phenomenology-perception': {
    plaqueTitle: 'The Body Opens a Field of Perception', plaqueType: 'concept-argument-diagram-or-method', articleTitle: 'Maurice Merleau-Ponty',
    invitation: 'A Museum illustration presents bodily orientation as an interpretive field without claiming to reproduce Merleau-Ponty’s cases or clinical evidence.',
    visualReading: 'Body, reachable objects, paths, and changing depth organize a practical field; composition turns philosophical relations into a contemporary visual metaphor.',
    claim: 'Phenomenology of Perception, published in 1945, develops the body schema as a pre-reflective practical organization of movement and space, drawing critically on Gestalt psychology and neurology.',
    boundary: 'The repository-pinned interpretive asset has internal provenance only. It must not anonymize disabled people, turn clinical cases into spectacle, or collapse Merleau-Ponty into later embodied-cognition programs.',
    guide: ['Notice reach, posture, habit, and orientation before treating the body as an observed object.', 'Return to the text’s historical cases and terminology; contemporary embodiment research is reception, not identity.'],
    resolution: 'preserved interpretive-image disclosure, anchored body-schema claims to the 1945 work, and retained disability, clinical-evidence, and later-reception cautions.',
  },
  'merleau-flesh-reversibility': {
    plaqueTitle: 'The Cathedral', plaqueType: 'object-manuscript-site-or-archaeological-context', articleTitle: 'Maurice Merleau-Ponty',
    invitation: 'Rodin’s two right hands make near-touch visually available while remaining an earlier sculpture, not a diagram of flesh or reversibility.',
    visualReading: 'The hands approach with fingertips nearly touching; orientation, bronze surface, scale, lighting, and camera angle shape an encounter with a three-dimensional object.',
    claim: 'Merleau-Ponty’s later ontology of flesh and reversibility uses touching/touched to resist a simple split between subject and object while preserving divergence rather than perfect coincidence.',
    boundary: 'The Philadelphia Museum of Art records F1929-7-40, modeled 1908, cast by Alexis Rudier in 1925, and bequeathed by Jules E. Mastbaum. Regan Vercruysse’s photograph is CC BY 2.0; the sculpture predates the philosophy.',
    guide: ['Attend to two right hands, near contact, bronze surface, cast history, and the photographic viewpoint.', 'Use the object as a companion for reversibility, not proof that touching and being touched coincide without remainder.'],
    resolution: 'replaced the generic Rodin Museum credit with PMA accession, foundry and bequest data, retained the photographer’s license, and bounded philosophical analogy.',
  },
  'existentialism-kierkegaard-precursor': {
    plaqueTitle: 'Morning View of Østerbro, 1836', plaqueType: 'object-manuscript-site-or-archaeological-context', articleTitle: 'Kierkegaard',
    invitation: 'Købke’s Copenhagen street painting supplies Kierkegaard’s period and city while remaining neither his portrait nor an illustration of anxiety.',
    visualReading: 'Road, lake, walkers, workers, cattle, houses, morning light, and large sky compose an everyday urban edge through artistic selection rather than documentary capture.',
    claim: 'Kierkegaard’s analyses of choice, anxiety, despair, faith, and subjective existence precede twentieth-century existentialism but should not be absorbed into a later uniform school.',
    boundary: 'The Statens Museum for Kunst records KMS844, oil on canvas, 1836, and Public Domain image use. The scene’s Copenhagen proximity does not establish Kierkegaard’s presence or intention.',
    guide: ['Read Købke’s specific social scene and SMK object record before using it as period atmosphere.', 'Call Kierkegaard a precursor with qualifications: later existentialists inherit and transform rather than simply repeat his project.'],
    resolution: 'added the authoritative SMK object page, medium, inventory and reuse status, and bounded both biographical presence and precursor genealogy.',
  },
  'existentialism-facticity-freedom': {
    plaqueTitle: 'Situated Freedom', plaqueType: 'concept-argument-diagram-or-method', articleTitle: 'Existentialism',
    invitation: 'A contemporary Museum image stages constrained possibility without turning facticity and freedom into a single diagram accepted by all existentialists.',
    visualReading: 'Body, barriers, paths, inherited setting, and open choices form a designed tension between condition and action rather than a measured social situation.',
    claim: 'Existentialist accounts reject freedom as creation from nothing: projects begin amid bodies, histories, institutions, relationships, and consequences. Thinkers disagree about ontology, ethics, politics, and oppression.',
    boundary: 'The internal repository-pinned interpretive asset has no external accession and cannot distribute responsibility, quantify constraint, or represent every existentialist and situated person.',
    guide: ['Name concrete conditions before describing possibilities; neither facticity nor freedom cancels the other.', 'Compare Sartre, Beauvoir, Fanon, and other voices without treating one visual balance as the school’s consensus.'],
    resolution: 'kept the image interpretive, made plural existentialist disagreement explicit, and bounded visual claims about constraint, agency, responsibility, and oppression.',
  },
  'beauvoir-ethics-ambiguity': {
    plaqueTitle: 'Eshkol Welcoming Beauvoir in Tel Aviv', plaqueType: 'paired-or-grouped-historical-figures', articleTitle: 'Simone de Beauvoir',
    invitation: 'Fritz Cohen’s 1967 press photograph records a diplomatic welcome, not Beauvoir lecturing or enacting The Ethics of Ambiguity.',
    visualReading: 'The cropped frame shows Beauvoir smiling and shaking hands with Israeli prime minister Levi Eshkol in his office; it withholds the wider delegation, conversation, itinerary, and politics.',
    claim: 'The Ethics of Ambiguity joins freedom to situated responsibility and the freedom of others. A later official visit cannot serve as evidence that Beauvoir consistently realized those commitments.',
    boundary: 'The Israel Government Press Office identifies 29 March 1967, HaKirya in Tel Aviv, photographer Fritz Cohen, and D804-102. The crop and expired-term rights basis must remain visible.',
    guide: ['Identify both participants, the handshake, office, date, GPO number, and the fact that this is a crop.', 'Use the photograph to ask how public intellectual life meets institutions; test ethical claims through texts and historical criticism.'],
    resolution: 'corrected the false speaking description to the Eshkol welcome, supplied GPO setting and identifier, and separated diplomatic context from ethical proof.',
    leadOverride: 'The installed crop is Fritz Cohen’s 29 March 1967 photograph of Israeli prime minister Levi Eshkol welcoming Simone de Beauvoir in his HaKirya office in Tel Aviv. It does not show Beauvoir giving a lecture or a feminist meeting. The Ethics of Ambiguity, published two decades earlier, develops freedom as situated, dependent on a world shared with other freedoms, and answerable to oppression. The official encounter provides later public-intellectual context only; text and historical analysis must establish the ethical claims and their limits.',
  },
  'beauvoir-second-sex': {
    plaqueTitle: 'French Women’s Suffrage Poster, 1924', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Simone de Beauvoir',
    invitation: 'A 1924 suffrage poster documents organized political advocacy before The Second Sex without becoming evidence for Beauvoir’s authorship or every woman’s experience.',
    visualReading: 'Typography, figure, appeal, and organizational authorship frame a public campaign object; the poster’s rhetoric selects an audience and compresses political disagreement.',
    claim: 'The Second Sex analyzes woman as historically produced “Other” across biology, psychoanalysis, material history, myth, and lived experience. Its reach and exclusions have generated extensive feminist criticism and revision.',
    boundary: 'The Union française pour le suffrage des femmes created the poster; Archives nationales records F/7/13266 and the reproduction is released CC0. It predates the 1949 book and was not Beauvoir’s illustration.',
    guide: ['Treat the poster as a specific French suffrage campaign object with organizational authorship and archival identifier.', 'Distinguish formal voting rights, Beauvoir’s existential-social analysis, and later critiques concerning race, class, colonialism, sexuality, and trans experience.'],
    resolution: 'added the Archives nationales identifier and organizational authorship, preserved CC0 status, and separated suffrage history from Beauvoir’s book and its critical reception.',
  },
  'sartre-bad-faith': {
    plaqueTitle: 'The Look and Bad Faith', plaqueType: 'concept-argument-diagram-or-method', articleTitle: 'Jean-Paul Sartre',
    invitation: 'A contemporary Museum scene interprets self-presentation and another’s look without reducing bad faith to lying or one theatrical gesture.',
    visualReading: 'Mirror, role, observer, posture, and divided setting stage tensions between being-for-itself and being-for-others through curatorial symbolism.',
    claim: 'Being and Nothingness describes bad faith as a motivated instability between facticity and transcendence, while the look discloses oneself as appearing in another’s world. Neither concept is a clinical diagnosis.',
    boundary: 'The internal repository-pinned interpretive asset has no outside provenance or accession and is not Sartre’s diagram. It cannot establish another person’s motives from appearance or excuse deception and domination.',
    guide: ['Ask which facts and possibilities a role emphasizes or denies; avoid labeling ordinary social performance automatically bad faith.', 'Separate Sartre’s examples, the ontology of the look, later social criticism, and the contemporary visual staging.'],
    resolution: 'retained explicit generated-image status, sourced the conceptual distinctions, and bounded motive-reading, diagnosis, theatricality, and later reception.',
  },
  'sartre-existentialism-humanism': {
    plaqueTitle: 'Jean-Paul Sartre at the ENS, c. 1924', plaqueType: 'other', articleTitle: 'Jean-Paul Sartre',
    invitation: 'A student portrait identifies Sartre two decades before his 1945 lecture without making future existential commitments visible in his face.',
    visualReading: 'Young sitter, formal clothing, pose, crop, and studio conventions establish an institutional portrait; physiognomy cannot reveal doctrine, freedom, or responsibility.',
    claim: '“Existentialism Is a Humanism” was delivered in 1945 and published in 1946 as a public defense centered on existence preceding essence, choice, responsibility, and situation. It does not exhaust Sartre’s philosophy.',
    boundary: 'The source credits an unknown photographer and the École normale supérieure record PHO D/2/1924/1 under CC0. The approximate date and later lecture must remain distinct.',
    guide: ['Use the portrait for early ENS identity only; do not read a mature philosophy from expression.', 'Read the public lecture alongside Being and Nothingness, later political work, critics, and Sartre’s own changing emphases.'],
    resolution: 'supplied the ENS identifier and CC0 record, retained approximate date and unknown maker, and separated student identity from the later public lecture and mature corpus.',
  },
  'camus-absurd-revolt': {
    plaqueTitle: 'Sisyphus, 1920', plaqueType: 'reception-or-transmission-history', articleTitle: 'Albert Camus',
    invitation: 'Franz von Stuck’s painting predates Camus’s essay and offers mythic reception rather than an illustration commissioned for his absurd.',
    visualReading: 'A muscular figure strains beneath a boulder in a dark, dramatic composition; pose and color intensify punishment but cannot define Camus’s argument.',
    claim: 'The Myth of Sisyphus frames the absurd as confrontation between human demand and an indifferent world, rejects suicide as resolution, and concludes with lucid persistence and revolt.',
    boundary: 'The accessible reproduction identifies von Stuck and 1920 but does not supply a verified holding collection or accession. The painting neither proves Camus’s interpretation nor exhausts the myth’s reception.',
    guide: ['Keep von Stuck’s 1920 artistic choices separate from Camus’s 1942 essay.', 'Trace absurdity, suicide, lucidity, revolt, and the final Sisyphus image through the text rather than the painted posture.'],
    resolution: 'retained the earlier reception painting and public-domain basis, disclosed missing holding/accession, and prevented visual strain from standing in for Camus’s argument.',
  },
  'camus-plague-solidarity': {
    plaqueTitle: 'Oran Harbour, April 1943', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Albert Camus',
    invitation: 'A wartime view records the real colonial city Camus transformed into fiction while depicting neither plague, solidarity, nor the novel’s characters.',
    visualReading: 'Port, ships, tanks, warehouses, city, and broad shoreline show wartime infrastructure through a distant view; people and colonial relations are largely unreadable at this scale.',
    claim: 'The Plague uses epidemic, separation, routine, testimony, and collective action to explore solidarity without guaranteeing purity or victory. Its fictional Oran belongs to French colonial Algeria.',
    boundary: 'Commons dates the image to April 1943 and cites a 2002 book annotated to U.S. Army Signal Corps archives, but records the author as unannotated and supplies no original repository or accession.',
    guide: ['Use the photograph for wartime urban context with uncertain creator/provenance, not as a scene from the novel.', 'Keep colonial Algeria, excluded local perspectives, medical history, allegorical reception, and the fictional narrative distinct.'],
    resolution: 'removed the unsupported definite Signal Corps creator and archive holding, retained the annotated source and U.S. reuse rationale, and centered colonial and fictional boundaries.',
  },
  'fanon-colonial-experience': {
    plaqueTitle: 'Frantz Fanon on a 1967 U.S. Dust Jacket', plaqueType: 'paired-or-grouped-historical-figures', articleTitle: 'Frantz Fanon',
    invitation: 'An unknown-maker lifetime portrait survives through a posthumous American jacket, documenting reception while withholding the sitting’s date and circumstances.',
    visualReading: 'Head-and-shoulders likeness, crop, printing, and dust-jacket reuse identify Fanon but disclose no clinical encounter, colonial gaze, speech, or political act.',
    claim: 'Black Skin, White Masks joins phenomenology, psychiatry, language, literature, and lived testimony to analyze racialization as historically and socially produced rather than biological destiny.',
    boundary: 'The 1967 date belongs to Grove Press reproduction after Fanon’s 1961 death. Photographer and original source remain unknown; Commons’ no-notice determination is U.S.-specific and may not control elsewhere.',
    guide: ['Distinguish the lifetime capture, unknown original date, 1967 dust-jacket witness, and 2025 Commons upload.', 'Use Fanon’s texts and historical scholarship for sociogeny, embodiment, violence, and liberation; a portrait supplies identity only.'],
    resolution: 'kept unknown maker and capture date explicit, treated 1967 as reproduction history, preserved jurisdictional rights limits, and bounded portrait inference.',
  },
  'levinas-ethics-before-ontology': {
    plaqueTitle: 'Interrupted Passage', plaqueType: 'concept-argument-diagram-or-method', articleTitle: 'Emmanuel Levinas',
    invitation: 'A contemporary Museum scene imagines interruption by another person while refusing to reduce Levinas’s “face” to visible features or a rescue script.',
    visualReading: 'A passerby pauses before an exhausted stranger outside a clinic after rain; setting, vulnerability, distance, and response are all authored interpretive choices.',
    claim: 'Totality and Infinity argues that encounter with the other interrupts totalizing comprehension and places the self under ethical demand. “Face” is not simply physiognomy, eye contact, or a pictured expression.',
    boundary: 'The installed asset is a contemporary Philosophy Atlas interpretation, not historical evidence about Levinas. Its durable repository source-art file does not recover the generation prompt, model, version, date, raw original output, or raw-output hash.',
    guide: ['Read every visible person and action as contemporary interpretation, not as Levinas’s example or biography.', 'Distinguish ethical asymmetry from passivity, limitless rescue, facial appearance, and institutional replacement.'],
    resolution: 'aligned the exhibit with the installed interpretive social scene, removed retired object and publication fields, recorded unavailable generation lineage as unknown, and bounded face, alterity, rescue, provenance, and evidentiary claims.',
    leadOverride: 'The installed image is Interrupted Passage, a contemporary Philosophy Atlas Museum interpretation whose generation details are unavailable. It is not a documentary photograph, historical reconstruction, or portrait of Levinas. The scene of one passerby stopping before an exhausted stranger offers a visual prompt for ethical interruption. Levinas’s “face” is not reducible to visible features, and no staged act can prove his claim that responsibility precedes theoretical mastery. The argument must be read in the text and its critical reception.',
  },
  'levinas-saying-said': {
    plaqueTitle: 'Stalag XI-B Prisoners Welcome Their Liberators', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Emmanuel Levinas',
    invitation: 'Sgt Smith’s 1945 photograph records the camp’s liberation while neither identifying Levinas nor illustrating the Saying and the Said.',
    visualReading: 'Prisoners crowd behind wire and greet arriving liberators; the public moment cannot disclose individual identities, captivity experiences, notebooks, or later philosophical meanings.',
    claim: 'Otherwise than Being distinguishes ethical exposure in the saying from thematized content in the said while insisting that justice and communication require repeated passage into formulations.',
    boundary: 'Imperial War Museums identifies BU 3661, Sgt Smith, No. 5 Army Film and Photographic Unit, and 16 April 1945. Levinas was held at Stalag XI-B, but the image does not locate him or his barrack and is not the dedication formerly attached to this asset ID.',
    guide: ['Begin with the specific liberation photograph and its limits; do not claim that Levinas appears in it.', 'Connect captivity to biography with evidence, then treat saying/said through the 1974 text rather than barbed-wire symbolism.'],
    resolution: 'replaced the stale dedication reading with IWM BU 3661, identified maker/date/event, retained UK-government rights status, and bounded Levinas identification and conceptual inference.',
    leadOverride: 'The mounted object is Sgt Smith’s 16 April 1945 photograph of prisoners at Stalag XI-B welcoming their liberators, Imperial War Museums BU 3661. It is not Levinas’s 1983 dedication, and the source does not identify Levinas among the people shown. Levinas was held at Stalag XI-B and pursued philosophical and literary work during captivity, but Otherwise than Being’s distinction between the saying and the said belongs to his later text. Captivity is consequential context, not a complete causal explanation or visual diagram of ethical language.',
  },
  'gadamer-truth-method': {
    plaqueTitle: 'Reported Gadamer–Pawliszyn Correspondence', plaqueType: 'object-manuscript-site-or-archaeological-context', articleTitle: 'Hans-Georg Gadamer',
    invitation: 'A 2018 photograph is reported as scholarly correspondence, but its source does not independently verify the letter’s author, date, custody, or underlying rights.',
    visualReading: 'Typed German text, stationery, and a signature-like mark are visible; reading those features cannot by itself authenticate authorship, date, recipient, or provenance.',
    claim: 'Truth and Method develops historically effected consciousness and the fusion of horizons as descriptions of situated understanding, not as permission to ignore evidence or make every interpretation equivalent.',
    boundary: 'Commons records Robert Dolewski’s own photograph on 24 August 2018 under CC BY-SA 4.0 and reports a Gadamer–Pawliszyn context. It does not substantiate the former exact 13 February 1989 date or license the underlying letter independently.',
    guide: ['Separate what the photograph visibly shows from the uploader’s reported correspondence description and from unverified original custody.', 'Apply Gadamer’s account through texts and criticism; neither signature-like appearance nor dialogue rhetoric authenticates a claim.'],
    resolution: 'withdrew unsupported exact date, authorship, custody and rights certainty while retaining the reported context, photographer, 2018 date, and image license.',
    leadOverride: 'The installed image is Robert Dolewski’s 2018 photograph reported on Commons as a letter from Hans-Georg Gadamer to Aleksandra Pawliszyn about hermeneutics and psychoanalysis. The accessible record licenses the photograph but does not independently verify the original letter’s author, date, custody, provenance, or underlying rights. Truth and Method’s 1960 account of historically effected understanding and horizons must therefore be sourced from the text and scholarship. This uncertain correspondence image can prompt questions about transmission, but it cannot authenticate or prove hermeneutical claims.',
  },
  'gadamer-art-play-truth': {
    plaqueTitle: 'Wassili Lepanto and Gadamer in Conversation', plaqueType: 'paired-or-grouped-historical-figures', articleTitle: 'Hans-Georg Gadamer',
    invitation: 'Leena Ruuskanen’s late lifetime photograph records an artist and philosopher conversing without staging Gadamer’s theory of play.',
    visualReading: 'Two seated figures, tea, outdoor setting, gestures, and reciprocal orientation document a social encounter but not its words, agreement, subject, or effects.',
    claim: 'Truth and Method treats play as a movement and structure exceeding an individual player and artistic presentation as an event that can disclose a subject matter. Intensity alone is not truth.',
    boundary: 'Ruuskanen contributed the photograph under CC BY 3.0; no institutional holding or accession is supplied. Conversation is contextual material, not evidence that participation is equal or that one interpretation is correct.',
    guide: ['Identify Lepanto and Gadamer and describe the visible encounter without inventing their topic or conclusions.', 'Compare performance, participation, presentation, tradition, institutions, exclusion, and critical judgment through the philosophical sources.'],
    resolution: 'retained named participants, photographer and license, disclosed absent institution/accession, and bounded dialogue, play, artistic truth, equality, and reception claims.',
  },
};

const reviewMethod = 'Galleries 20–21 supplemental review: exactly three concurrent GPT-5.6 Terra/High read-only evidence scopes of fifteen, fifteen, and fourteen non-overlapping exhibits were reconciled by the Sol parent against the assembled runtime registry and installed bytes across object identity, attribution, date, institution, provenance, rights, caption, alt text, natural ratio, primary evidence, later reception, interpretive imagery, unresolved evidence, exactly three claim-mapped object-led paragraphs, factual two-level plaques, subject-specific guidance, canonical relationships, exact article actions, current review locks, and desktop, mobile, and fresh staged-3D presentation.';

const visualReview = (id: string): NonNullable<NonNullable<MuseumSupplementalExhibit['review']>['visualReview']> => {
  const reviewedOn = id === 'levinas-ethics-before-ontology' ? '2026-08-22' : '2026-08-20';
  return {
    desktop: {reviewedOn, viewport: '1440×900', evidence: `Direct route inspected with the full uncropped object preview, three untitled sourced paragraphs, subject-specific evidence guide, factual plaque relationship, exact article action, and no horizontal overflow. Evidence: docs/visual-validation/gallery-20-21-supplementals/desktop/${id}.png`},
    mobile: {reviewedOn, viewport: '390×844', evidence: `Direct route inspected with a wrapped factual title, aspect-safe object preview, scrollable interpretation, complete controls, and no horizontal overflow. Evidence: docs/visual-validation/gallery-20-21-supplementals/mobile/${id}.png`},
    threeDimensional: {reviewedOn, viewport: '1280×720 fresh direct-route session', evidence: `Fresh direct-route session verified direct target activation, close/resume, the sole intended proximity card, and exact routed-target reopening without neighboring-card substitution. Evidence: docs/visual-validation/gallery-20-21-supplementals/staged-3d/${id}.png`},
  };
};

const canonicalContext = (input: MuseumSupplementalExhibit): MuseumCanonicalContextRef => {
  if (input.articleRoute?.kind === 'philosopher') return {kind: 'philosopher', id: input.articleRoute.philosopherId};
  if (input.articleRoute?.kind === 'branch') return {kind: 'branch', id: input.articleRoute.branchId};
  throw new Error(`Gallery 20–21 supplemental exhibit ${input.id} lacks a canonical article route.`);
};

const visitorSafe = (copy: string): string => copy.replace(
  /\bgenerated (?:museum )?(?:image|illustration)\b/giu,
  'contemporary Museum interpretation',
);

const reviewSupplementalExhibit = (galleryNumber: 20 | 21, input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => {
  const reviewed = evidence[input.id];
  if (!reviewed) throw new Error(`Missing Gallery ${galleryNumber} review evidence for ${input.id}.`);
  if (!input.presentation) throw new Error(`Missing Gallery ${galleryNumber} presentation for ${input.id}.`);
  const baseParagraphs = input.sections.map((section) => section.paragraphs.join(' '));
  if (baseParagraphs.length !== 3) throw new Error(`Gallery ${galleryNumber} supplemental exhibit ${input.id} must begin with exactly three paragraphs.`);
  const asset = getMuseumAsset(input.assetId);
  const objectSources: MuseumSupplementalInterpretationSource[] = [
    {id: 'object', label: `${asset.title} — installed source record`, url: asset.sourcePageUrl, kind: 'collection-record'},
    ...(asset.objectPageUrl && asset.objectPageUrl !== asset.sourcePageUrl
      ? [{id: 'holding', label: `${asset.institution} — object or institutional record`, url: asset.objectPageUrl, kind: 'collection-record'} as const]
      : []),
  ];
  const objectSourceUrls = new Set(objectSources.map(({url}) => url));
  const claimSources: MuseumSupplementalInterpretationSource[] = input.sources
    .filter(({url}) => !objectSourceUrls.has(url))
    .map((source, index) => ({...source, id: `claim-${index + 1}`}));
  const sources = [...objectSources, ...claimSources];
  const objectIds = objectSources.flatMap((source) => source.id ? [source.id] : []);
  const claimIds = claimSources.flatMap((source) => source.id ? [source.id] : []);
  const lead = reviewed.leadOverride ?? input.lead;
  const objectInterpretation = `${asset.attribution} Recorded institution or provenance: ${asset.institution}. Rights: ${asset.license}. ${asset.historicalNote}`;
  const dateLabel = `${asset.creator} · ${asset.objectDate} · ${asset.institution} · ${asset.license}`;
  const structuralFactRows = input.presentation.factRows.filter(({label}) => label === 'Museum status');
  return {
    ...input,
    dateLabel,
    sections: [
      {heading: '', paragraphs: [visitorSafe(`${objectInterpretation} ${reviewed.visualReading} ${baseParagraphs[0]}`)], sourceIds: objectIds},
      {heading: '', paragraphs: [visitorSafe(`Read beside this installed object as bounded evidence rather than transparent illustration. ${lead} ${baseParagraphs[1]} ${input.keyIdeas.join(' ')} ${reviewed.claim}`)], sourceIds: [...objectIds, ...claimIds]},
      {heading: '', paragraphs: [visitorSafe(`The installed object’s evidentiary boundary is decisive: ${reviewed.boundary} ${baseParagraphs[2]} ${input.cautions.join(' ')} ${reviewed.guide[1]}`)], sourceIds: [...objectIds, ...claimIds]},
    ],
    sources,
    visitorGuide: [
      {heading: `${reviewed.plaqueTitle}: object record`, items: [
        {label: 'Identity and date', description: `${asset.title}; ${asset.creator}; ${asset.objectDate}.`, sourceIds: objectIds},
        {label: 'Custody and rights', description: `${asset.institution}. ${asset.license}. ${asset.derivativeNotice ?? 'The installed local derivative preserves the recorded object without an asserted interpretive alteration.'}`, sourceIds: objectIds},
      ]},
      {heading: `${reviewed.articleTitle}: how to interpret this object`, items: [
        {label: 'Claim boundary', description: reviewed.guide[0], sourceIds: [...objectIds, ...claimIds]},
        {label: 'What to carry forward', description: reviewed.guide[1], sourceIds: claimIds},
      ]},
    ],
    objectInterpretation,
    presentation: {
      ...input.presentation,
      panelKicker: /anchor secondary/iu.test(input.presentation.panelKicker)
        ? input.presentation.panelKicker
        : `Gallery ${galleryNumber} supplemental exhibit`,
      proximityKicker: reviewed.plaqueTitle,
      factRows: [
        ...structuralFactRows,
        {label: 'Object', value: reviewed.plaqueTitle},
        {label: 'Evidence', value: dateLabel},
        {label: 'Atlas route', value: reviewed.articleTitle},
      ],
      articleActionLabel: `Read the full sourced ${reviewed.articleTitle} article`,
      exhibitLayout: 'object-led',
    },
    wallPlaque: {type: reviewed.plaqueType, title: reviewed.plaqueTitle, invitation: reviewed.invitation, canonicalContexts: [canonicalContext(input)]},
    review: {
      status: 'standard-compliant',
      reviewedOn: input.id === 'levinas-ethics-before-ontology' ? '2026-08-22' : '2026-08-20',
      method: reviewMethod,
      resolution: `Resolved: ${reviewed.resolution}`,
      lock: locks[input.id],
      visualReview: visualReview(input.id),
    },
  };
};

export const reviewAnalyticSupplementalExhibit = (input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => reviewSupplementalExhibit(20, input);
export const reviewPhenomenologySupplementalExhibit = (input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => reviewSupplementalExhibit(21, input);
