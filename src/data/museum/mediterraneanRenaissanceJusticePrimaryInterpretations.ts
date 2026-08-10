import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumPrimaryInterpretationEnrichment} from './scholasticRationalistPrimaryInterpretationEnrichment';
import type {MuseumExhibitReview} from '../../editorial/exhibitReview';

type VisitorGuideSection = {
  readonly heading: string;
  readonly items: readonly {readonly label: string; readonly description: string}[];
};

const standardReview = (lock: string): MuseumExhibitReview => ({
  status: 'standard-compliant',
  reviewedOn: '2026-08-09',
  method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and subject-specific visitor guide reviewed against the locked exhibit standard.',
  lock,
});

const STANDARD_REVIEW_BY_NAME: Readonly<Record<string, MuseumExhibitReview>> = {
  Socrates: standardReview('fnv1a64:97e1ac48d7bea19b'),
  'Niccolò Machiavelli': standardReview('fnv1a64:6627b4e4442f73ed'),
  'Marsilio Ficino': standardReview('fnv1a64:592f8b630ad048df'),
  'Francis Bacon': standardReview('fnv1a64:6e542f89c55c7dc0'),
  'Galileo Galilei': standardReview('fnv1a64:9fba361386c7259f'),
  'Thomas Hobbes': standardReview('fnv1a64:4c5ec3e27386804e'),
  'Political Philosophy': standardReview('fnv1a64:f008eb2c2e19f808'),
};

const standard = (
  name: string,
  paragraphs: readonly string[],
  orientation: readonly VisitorGuideSection[],
  assetId: MuseumAssetId,
  objectText: string,
): MuseumPrimaryInterpretationEnrichment => ({
  lead: '',
  keyIdeas: [],
  keyWorks: [],
  sections: [{heading: '', paragraphs}],
  presentation: {
    mode: 'concise',
    orientation,
    articleActionLabel: `Read the full sourced ${name} article`,
    bodyLayout: 'prose',
    exhibitLayout: 'object-led',
    plaqueKicker: '',
    plaqueSubtitleLines: 4,
  },
  objectInterpretations: {[assetId]: objectText},
  review: STANDARD_REVIEW_BY_NAME[name],
});

/**
 * Object-led primary interpretations for the Mediterranean, Renaissance, and
 * Justice galleries. Review state and locks are supplied during integration.
 */
export const MEDITERRANEAN_RENAISSANCE_JUSTICE_PRIMARY_INTERPRETATIONS:
Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>> = {
  socrates: standard(
    'Socrates',
    [
      'Socrates was a conspicuous Athenian conversational figure, conventionally born around 470 or 469 BCE and executed in 399 BCE. The strongest evidence does not yield a neutral biography. Plato, Xenophon, Aristophanes, and later writers give unlike portraits shaped by literary and argumentative purpose. Plato’s speaker is not a transcript of historical Socrates; Aristophanes’ comic Socrates is not a court record; Xenophon’s defense is not unmediated recollection. This “Socratic problem” asks visitors to distinguish secure orientation—trial, execution, public questioning, lasting influence—from the harder task of assigning doctrines or practices to him.',
      'Across the testimonies, Socrates tests claims to wisdom by asking for reasons, definitions, consequences, and consistency. “Socratic method” names a family of conversations, not one technique that exposes truth. Discussion may end in aporia, a productive impasse showing the question is unsettled. Concern for character or soul gives questioning ethical force: success, reputation, and power do not excuse an unexamined life. The popular saying “I know that I know nothing” is not his verbatim sentence in Plato’s Apology. Professions of limited knowledge belong to a practice of testing oneself and companions.',
      'This marble head is a Roman work of about 75–125 CE, after a posthumous portrait type associated with Lysippos. Its broad brow, curled beard, and individualized features make a powerful ancient memory, but it was not made from life and cannot settle what Socrates looked like or which Platonic claims were historical. The sculpture makes reception material: later viewers wanted a face for a figure whose conversations became a model. His prosecution involved formal religious and educational charges amid a politically damaged Athens; no single secret motive resolves the case. The exhibit asks whether examination remains ethical when it discomforts a community, and what obligations questioning has toward people it challenges.',
    ],
    [
      {heading: 'Evidence and practice', items: [
        {label: 'The Socratic problem', description: 'Plato, Xenophon, Aristophanes, and later writers portray Socrates differently, so no one text provides a transparent biography.'},
        {label: 'Elenchus', description: 'A testing conversation that asks whether a claim, its reasons, and its consequences can stand together.'},
      ]},
      {heading: 'Why the questioning matters', items: [
        {label: 'Aporia', description: 'A revealing impasse: recognizing that an apparently confident answer has not yet been justified.'},
        {label: 'Care of soul', description: 'Attention to character and ethical judgment rather than treating wealth, success, or reputation as sufficient goods.'},
      ]},
      {heading: 'Reading the object', items: [
        {label: 'Roman reception', description: 'This posthumous Roman portrait type preserves a later ancient memory of Socrates, not a likeness made while he lived.'},
      ]},
    ],
    'socrates-louvre-head',
    'This marble head was made in Roman imperial times, around 75–125 CE, after the posthumous portrait type associated with Lysippos. Its strongly individualized face records a later ancient image of Socrates, not a likeness made from life. The object supports the history of commemoration while Plato, Xenophon, Aristophanes, and other witnesses remain the evidence for the contested Socratic figure.',
  ),
  machiavelli: standard(
    'Niccolò Machiavelli',
    [
      'Niccolò Machiavelli served the Florentine republic as a chancery official and diplomat during the Italian Wars, unstable alliances, papal power, and conflict. The Medici restoration of 1512 cost him office; imprisonment and torture followed. His later writing drew on that experience, Roman history, diplomatic observation, and divided Italian states. The Prince examines principalities, arms, reputation, founding, and necessity. The Discourses on Livy asks about republican liberty, law, conflict, corruption, citizen arms, and renewal. Reading one work as secret truth and the other as camouflage oversimplifies their tensions and shared pressure to judge politics in difficult circumstances.',
      'Virtù is neither ordinary moral virtue nor mere ruthlessness. It names adaptive political capacity: judgment, energy, organization, and the ability to grasp an occasion. Fortuna names contingency and pressures no actor fully controls. A successful response in one situation may fail when circumstances alter, which is why Machiavelli’s histories teach diagnosis and timing rather than a timeless recipe. His account of conflict is equally unfamiliar. He can treat public tension between elites seeking command and people seeking not to be dominated as a resource for liberty when laws give it a form. That is not an endorsement of faction, civil war, universal democracy, or expansion without cost.',
      'Santi di Tito’s posthumous portrait shows a composed Florentine official in dark dress with red sleeves. Painted decades after Machiavelli died, it offers civic memory, not a verified likeness or visual argument for his doctrine. Its air of control should not turn analysis of fear, force, deception, and violence into approval. “The ends justify the means” is not his sentence, and necessity can disclose tragedy as readily as excuse tyranny. Machiavelli makes power less mysterious while refusing reassurance that clean motives guarantee good outcomes. The exhibit asks who may judge necessity, which institutions can discipline it, and whose liberty emergency measures protect.',
    ],
    [
      {heading: 'Works and setting', items: [
        {label: 'The Prince', description: 'An analysis of new principalities, political survival, arms, reputation, and the problems faced by a ruler.'},
        {label: 'Discourses on Livy', description: 'A longer study of republican institutions, liberty, conflict, corruption, and renewal through Roman history.'},
      ]},
      {heading: 'Key terms', items: [
        {label: 'Virtù', description: 'Adaptive political capacity—judgment, energy, and organized response—not a synonym for ordinary virtue or cruelty.'},
        {label: 'Fortuna', description: 'Contingency and shifting circumstance, which preparation can address but never completely master.'},
      ]},
      {heading: 'Continuing pressure', items: [
        {label: 'Conflict and liberty', description: 'Publicly regulated conflict can check domination, but it can also slide into faction, exclusion, or violence.'},
      ]},
    ],
    'machiavelli-santi-di-tito',
    'Santi di Tito’s later-sixteenth-century painting depicts a composed Machiavelli in a dark cap and black-and-red civic dress. Produced decades after his death, it is a posthumous reception portrait, not a likeness from life or proof of his political intentions. The small book and official bearing show how later Florence wished to remember him, while his arguments must be read in his works and surviving political record.',
  ),
  ficino: standard(
    'Marsilio Ficino',
    [
      'Marsilio Ficino made translation into philosophical work. Greek and Byzantine transmission, manuscript collecting, Italian humanism, printers, readers, friendship networks, and Medici patronage made his achievement possible; he neither recovered Plato alone nor headed a modern chartered Florentine Academy. His Latin Plato and Plotinus, introductions, commentaries, letters, and teaching transformed what many western European readers could ask. Translation involved vocabulary, corpus order, summaries, and argumentative framing. Ficino’s Christian Platonism was not neutral delivery. It joined ancient sources to a Renaissance account of providence, soul, love, cosmic order, medicine, and religious aspiration, while Greek, Arabic, Jewish, and Byzantine routes remain more than background.',
      'The Platonic Theology defends the rational soul’s immortality and mediating role between intelligible and bodily reality. In the Symposium commentary, desire awakened by beauty can be educated toward higher goods; “Platonic love” is not merely sexless affection. Ficino’s prisca theologia arranged Hermes, Orpheus, Pythagoras, Plato, and others into a providential ancient wisdom. That genealogy relied on mistaken chronologies, but remains important as his construction of historical and religious authority. Three Books on Life combines scholarly health, melancholy, diet, music, spiritus, astrology, and natural magic. It should be neither sanitized into metaphor nor collapsed into a simple story of prohibited demonic practice.',
      'The bronze medal, made in the style of Niccolò Fiorentino around 1499, gives Ficino a left-facing learned profile circled by his name. It is near-contemporary commemoration, not a transparent record of his face, the attribution’s certainty, or a picture of his intellectual workshop. The object makes Renaissance humanist identity and memorialization visible while its inscription cannot settle doctrine or the reality of an Academy. Ficino shows that recovery is transformation: a translator’s choices can make a past text newly authoritative while changing its later uses. The exhibit asks what responsibility follows when someone receives a tradition, rearranges its possibilities, and presents that work as a path toward wisdom.',
    ],
    [
      {heading: 'Translation as philosophy', items: [
        {label: 'A Latin Plato and Plotinus', description: 'Translations, summaries, and commentaries that made major Platonic texts newly available while guiding their Renaissance interpretation.'},
        {label: 'A network, not a modern Academy', description: 'Patronage, manuscripts, conversation, and teaching formed a flexible program, not a securely chartered school with one fixed doctrine.'},
      ]},
      {heading: 'Key projects', items: [
        {label: 'Platonic Theology', description: 'A defense of the rational soul’s immortality and mediating place between intelligible and bodily reality.'},
        {label: 'Prisca theologia', description: 'Ficino’s providential history of ancient wisdom, important as a Renaissance construction even though its chronology was mistaken.'},
      ]},
      {heading: 'Difficult practice', items: [
        {label: 'Three Books on Life', description: 'A work joining health, music, astrology, spiritus, and natural magic whose causal claims should not be reduced to harmless metaphor.'},
      ]},
    ],
    'ficino-nga-medal-1499',
    'This c. 1499 bronze portrait medal, made in the style of Niccolò Fiorentino, shows Ficino in profile within an inscribed circular field. It is a near-contemporary commemorative object, not a transparent record of his appearance, the attribution’s certainty, or a working image of his translations. It reveals a Renaissance practice of making learned identity durable while the texts and transmission networks carry the exhibit’s philosophical evidence.',
  ),
  bacon: standard(
    'Francis Bacon',
    [
      'Francis Bacon was a lawyer, parliamentarian, royal officer, essayist, historian, and philosopher whose political ascent ended in a 1621 bribery conviction. His Great Instauration was an unfinished architecture for reforming knowledge, not a completed manual called “the scientific method.” Bacon wanted inquiry to become cumulative, cooperative, and practically fruitful. He criticized habits that leapt from few observations to vast systems or defended inherited authority through verbal dispute. Reform required natural histories, records of phenomena, experiments, instruments, trained judgment, division of labor, and institutions that could preserve and test work. He did not invent observation or experiment, but gave their organization distinctive philosophical and political urgency.',
      'The idols of tribe, cave, marketplace, and theater name recurring distortions rooted in shared habits, individual formation, unstable words, and inherited systems. They are not four errors one can delete forever. In Novum Organum, Bacon proposes tables of presence, absence, and degree, compares cases, excludes inadequate explanations, and works toward provisional axioms. This induction is more disciplined than collecting examples and generalizing, but it does not anticipate every role later science gives mathematics, hypotheses, models, or theory. Natural history supplies varied evidence from which a better account might be made and criticized.',
      'Van Somer’s 1617 portrait shows Bacon in a high black hat, elaborate ruff, and court dress against a red ground. It is a lifetime identification at political prominence, not an image of laboratory work, induction, or science’s solitary inventor. Its staged authority is instructive because Bacon’s program depended on office, patronage, governance, and collective labor. New Atlantis imagines Salomon’s House organizing observation, experiment, travel, storage, interpretation, and application; the fiction is not a modern research blueprint. Promises to relieve the human estate also sit beside language of dominion, extraction, and conquest. The exhibit asks who benefits from organized knowledge, who controls it, and which institutions make error correctable rather than merely powerful.',
    ],
    [
      {heading: 'The reform project', items: [
        {label: 'Great Instauration', description: 'Bacon’s unfinished plan for reorganizing knowledge through records, investigation, collaboration, and useful works.'},
        {label: 'Natural history', description: 'Systematic accounts of phenomena and variations intended to provide material for testing explanations, not random fact collection.'},
      ]},
      {heading: 'How inquiry is tested', items: [
        {label: 'Idols', description: 'Recurring habits of error arising from human tendency, personal formation, unstable language, and inherited systems.'},
        {label: 'Exclusion', description: 'Comparing cases to eliminate inadequate explanations before reaching a provisional account.'},
      ]},
      {heading: 'Institutional question', items: [
        {label: 'Salomon’s House', description: 'The fictional research institution in New Atlantis, useful for thinking about coordination and power but not a literal modern laboratory blueprint.'},
      ]},
    ],
    'francis-bacon-portrait-1617',
    'Paul van Somer I’s 1617 lifetime portrait identifies Bacon through high hat, ruff, formal dress, and a red courtly ground. It records a lawyer and officeholder at political prominence, not a scene of experiment or a proof of one Baconian method. The image makes patronage and public authority visible while the Great Instauration, Novum Organum, and New Atlantis supply the evidence for his unfinished program of organized inquiry.',
  ),
  galileo: standard(
    'Galileo Galilei',
    [
      'Galileo Galilei worked within late Renaissance mathematics and natural philosophy, rather than outside tradition as the first modern scientist. At Pisa, Padua, and Florence, he drew on Archimedean analysis, instrument craft, astronomy, engineering, court patronage, and university controversy. His telescopes revealed mountains and shadows on the Moon, unfamiliar stars, satellites around Jupiter, and the phases of Venus. These observations did not interpret themselves. Lenses had to be made and assessed; views repeated, drawn, compared, named, geometrically argued for, and circulated in print. Instrument-mediated seeing became public evidence through construction, calibration, skilled observation, and dispute, not because a device gave unquestionable access to reality.',
      'Astronomy and mechanics were related but distinct achievements. Telescopic discoveries challenged claims about a smooth, unchanging heaven and Ptolemaic arrangements, though they did not prove every detail of Copernican cosmology or remove the Tychonic alternative. In accounts of falling bodies and projectiles, Galileo combined measurement, idealization, geometrical relation, controlled experiment, and thought experiment. His conclusions should not become finished Newtonian versions. The leaning-tower anecdote is uncertain and cannot replace inclined-plane work, correspondence, arguments, and Two New Sciences. Galileo’s importance lies in combined practice, not a recipe that makes theory-free observation decisive.',
      'Justus Sustermans’s portrait presents an elderly Galileo in dark clothing holding a short optical instrument. Painted between 1636 and 1640, after the 1633 trial, it is a lifetime likeness, not a scene of observation, diagram of discovery, or Inquisition record. In 1616 Galileo was warned not to hold or defend heliocentrism; after the 1632 Dialogue he was tried, made to abjure, and placed under house arrest. This cannot be compressed into “science versus religion,” though coercion and institutional injustice remain real. The whispered “and yet it moves” is later legend. The exhibit asks how evidence, interpretation, authority, and dissent become entangled when a new way of seeing challenges settled institutions.',
    ],
    [
      {heading: 'How seeing becomes evidence', items: [
        {label: 'Instrument-mediated observation', description: 'Telescopic results required crafted lenses, repeated viewing, drawing, geometric argument, and public testing.'},
        {label: 'The phases of Venus', description: 'A telescopic observation that challenged Ptolemaic astronomy but did not by itself eliminate every alternative to Copernicus.'},
      ]},
      {heading: 'Arguments about motion', items: [
        {label: 'Idealization', description: 'Studying a simplified case to clarify a relation, while recognizing that no physical experiment perfectly matches it.'},
        {label: 'Two New Sciences', description: 'The late work on motion and materials that joins mathematical demonstration, experiment, and thought experiment.'},
      ]},
      {heading: 'Trial and myth', items: [
        {label: 'The 1633 proceedings', description: 'A coercive legal and institutional process involving theology, censorship, patronage, rhetoric, and the status of Copernican claims.'},
        {label: '“And yet it moves”', description: 'A later story, not secure contemporary evidence of Galileo’s courtroom words.'},
      ]},
    ],
    'galileo-sustermans-portrait-1636',
    'Justus Sustermans’s 1636–1640 lifetime portrait shows an elderly Galileo in dark clothing holding a short optical instrument. Painted after the 1633 trial, it establishes a late public likeness but cannot document an observation, prove heliocentrism, or record a courtroom defiance. Its formal presentation belongs beside the separately evidenced telescopic work, writings, institutional disputes, trial papers, and later myths.',
  ),
  hobbes: standard(
    'Thomas Hobbes',
    [
      'Thomas Hobbes lived through scientific controversy, English civil war, exile, restoration, and disputes over church and state. Leviathan is not only a social-contract book. Its argument moves from sense and imagination through language, reason, passions, and persons before it reaches the commonwealth. Hobbes’s materialism treats mental life as bodily motion, but his system is not borrowed finished mechanical science. Mathematics, optics, motion, rhetoric, theology, and arguments with contemporaries shape an ambitious explanation whose standards remain contested. This wider project matters because political obligation addresses vulnerable bodies, competing judgments, desire for recognition, and fragile authority of words.',
      'The state of nature tests what can happen among roughly equal people when no common authority can settle disputes. It is not a claim that every society passed through a prehistoric war of isolated individuals. Competition, distrust, glory, uncertainty, and anticipatory violence can make even peace-seeking people unsafe. Laws of nature direct people toward peace, but agreements remain fragile without enforcement. Fear does not cancel rationality: fear of violent death makes peace urgent. This connects natural right, self-preservation, covenant, and civil order without making them synonyms for later democratic “social contract.”',
      'John Michael Wright’s portrait presents Hobbes in his eighties, with long white hair and black robes. It is a lifetime likeness, but the calm private face cannot show the artificial public person created when people authorize a representative, or prove sovereign power morally infallible. Individuals covenant with one another to authorize a person or assembly; the sovereign is not a party to the founding covenant. Authority is extensive and undivided in final public judgment, while subjects retain liberty to resist immediate threats to self-preservation. Religion remains central because rival claims to scripture and church authority can divide judgment. The exhibit asks whether protection can justify concentrated authority, and how a state can prevent disorder without becoming the unchecked danger it was meant to contain.',
    ],
    [
      {heading: 'Before the sovereign', items: [
        {label: 'Materialism', description: 'Hobbes’s attempt to explain human life through body and motion, joined to arguments about language, reasoning, and passion.'},
        {label: 'State of nature', description: 'An analysis of insecurity without a common judge, not a verified universal prehistoric stage.'},
      ]},
      {heading: 'Making a commonwealth', items: [
        {label: 'Covenant', description: 'An agreement among individuals intended to escape insecurity by creating a common public authority.'},
        {label: 'Authorization', description: 'The act through which a representative’s public acts count as the acts of the people who authorize it.'},
      ]},
      {heading: 'Continuing tension', items: [
        {label: 'Protection and obligation', description: 'Security gives political authority its purpose, yet subjects retain immediate self-preservative liberty and may question failed protection.'},
        {label: 'Religion and judgment', description: 'Rival claims to scripture and church authority matter because they can divide who has the final public voice.'},
      ]},
    ],
    'hobbes-wright-portrait',
    'John Michael Wright’s c. 1669–1670 painting is a lifetime portrait of Hobbes in his eighties, showing long white hair, black robes, and an attentive private face. It establishes late biographical identity, not the artificial public person created by authorization or an image of a sovereign’s powers. The Leviathan frontispiece and the book’s arguments bear those different interpretive burdens.',
  ),
  'political-philosophy': standard(
    'Political Philosophy',
    [
      'Political philosophy asks how power should be organized, justified, limited, resisted, and answered for. It studies authority, legitimacy, obligation, justice, liberty, democracy, domination, membership, and public action, but these are not interchangeable. A regime can wield power without legitimacy; law can be valid without obligation; consent need not be the sole ground of authority. The field has no origin story that begins in early-modern Europe and later adds the world. Ancient, Islamic, Jewish, South Asian, East Asian, Indigenous, Africana, Black, feminist, disability, anticolonial, and global traditions contain distinct questions, institutions, texts, and disagreements. Their relation is not one tradition’s gradual expansion toward a universal view.',
      'Political arguments ask what justice requires, who counts as a political agent, how collective decisions should be made, and what protects people from domination. Negative liberty, positive liberty, republican non-domination, capabilities, democratic self-government, and liberation identify different dangers and goods. Democracy is more than votes: equality, rights, representation, agenda control, expertise, minority protection, and material conditions alter public rule. Ideal pictures of fair institutions must meet nonideal diagnoses of colonialism, racialization, gendered dependency, disability exclusion, dispossession, migration, and resistance. These are not peripheral applications; they can change the field’s units of analysis and expose who has been left outside a supposedly public order.',
      'Lorenzetti’s Allegory of Good Government was painted in 1338–1339 for Siena’s civic council chamber. Its crowded fresco personifies justice, peace, virtues, a communal ruler, and an ordered city, making one medieval Italian account of legitimate rule compelling. It is not a neutral diagram of political philosophy, a photograph of civic life, or a definition of justice for every society. Its hierarchy and personified virtues reveal what this polity hoped good government would look like. The object shows that political ideals are pictured through institutions, exclusions, and historical hopes. Political philosophy asks who may rule, by what reasons, under what limits, and with what remedies when order becomes a form of injury.',
    ],
    [
      {heading: 'Core distinctions', items: [
        {label: 'Power and legitimacy', description: 'Power is the ability to secure outcomes; legitimacy concerns whether rule is justified and answerable to those subject to it.'},
        {label: 'Authority and obligation', description: 'Authority is a recognized right to direct; political obligation asks when people have reason or duty to comply.'},
      ]},
      {heading: 'Central questions', items: [
        {label: 'Justice', description: 'Debates about fair institutions, distribution, rights, repair, and the social conditions people need to live as equals.'},
        {label: 'Democracy', description: 'Collective rule involving inclusion, equality, representation, rights, contestation, expertise, and protection for minorities.'},
        {label: 'Domination', description: 'Being subject to another’s uncontrolled power, even where no one is currently issuing an order or using force.'},
      ]},
      {heading: 'Beyond one genealogy', items: [
        {label: 'Nonideal diagnosis', description: 'Inquiry into colonialism, racialization, gendered dependency, disability exclusion, dispossession, and resistance as structural political problems.'},
      ]},
    ],
    'political-philosophy-good-government',
    'Ambrogio Lorenzetti’s 1338–1339 fresco fills Siena’s council chamber with a communal ruler, personified justice and peace, civic virtues, and an ordered public. It is a medieval Italian allegory of good government, not a neutral map of political philosophy or documentary image of civic life. Its hierarchy and symbolism show one historical effort to picture legitimate rule while leaving the field’s competing accounts of authority, justice, resistance, and membership open.',
  ),
};
