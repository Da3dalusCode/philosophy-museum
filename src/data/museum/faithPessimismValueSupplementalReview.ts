import type {
  MuseumCanonicalContextRef,
  MuseumSupplementalExhibit,
  MuseumSupplementalInterpretationSource,
} from './platoSupplementalExhibits';

type SourceSpec = MuseumSupplementalInterpretationSource & {id: string};
type Evidence = {
  plaqueTitle: string;
  plaqueType: NonNullable<MuseumSupplementalExhibit['wallPlaque']>['type'];
  invitation: string;
  articleTitle: string;
  dateLabel: string;
  objectInterpretation: string;
  additions: readonly [string, string, string];
  sources?: readonly SourceSpec[];
  guide: readonly [string, string, string, string];
  resolution: string;
  lock: string;
};

const collection = (id: string, label: string, url: string): SourceSpec => ({id, label, url, kind: 'collection-record'});
const academic = (id: string, label: string, url: string): SourceSpec => ({id, label, url, kind: 'academic-reference'});
const primary = (id: string, label: string, url: string): SourceSpec => ({id, label, url, kind: 'primary-text'});
const evidence: Record<string, Evidence> = {
  'schopenhauer-kant-and-representation': {
    plaqueTitle: 'Hagemann’s Portrait of Immanuel Kant', plaqueType: 'paired-or-grouped-historical-figures',
    invitation: 'Friedrich Hagemann’s 1801 marble bust presents Schopenhauer’s critical predecessor while the object itself supplies no evidence of Schopenhauer’s encounter with it.',
    articleTitle: 'Schopenhauer', dateLabel: 'Friedrich Hagemann · marble, 1801 · Hamburger Kunsthalle · photograph Emmanuel Fromm, 2015, CC0',
    objectInterpretation: 'The installed image is Emmanuel Fromm’s 2015 CC0 photograph of Friedrich Hagemann’s 1801 marble Portrait of Immanuel Kant at the Hamburger Kunsthalle. The accessible record supplies no accession number or object provenance, and the bust has no demonstrated Schopenhauer provenance.',
    additions: ['Fromm’s record identifies Hagemann, marble, 1801, and the Hamburger Kunsthalle; a later gallery photograph records likeness and material, not the transmission of Kant’s arguments to Schopenhauer.', 'Schopenhauer inherits Kant’s appearance–thing-in-itself distinction but revises its reach through the body’s double aspect; that relation rests on texts and scholarship rather than on this portrait.', 'The extrapolation from embodied striving to will as the world’s inner character remains an interpretive argument. The bust can orient the inheritance but cannot settle the analogy or make Kant responsible for it. Its persuasive likeness must not substitute for reconstructing their different arguments. Portrait authority is never textual authority itself.'],
    guide: ['Hagemann made the marble portrait in 1801; Fromm photographed it in 2015.', 'No accession, full provenance, or Schopenhauer connection was located for the object.', 'Representation names the subject–object form of experience, not a second physical world.', 'Body-to-world analogy is Schopenhauer’s contested extension beyond Kant.'],
    resolution: 'verified maker, object date, institution, photographer and CC0 basis; disclosed absent accession/provenance and bounded the portrait’s philosophical role; preserved the natural ratio and current canonical article.', lock: 'fnv1a64:a6a7c325b6b37031',
  },
  'schopenhauer-frankfurt-work': {
    plaqueTitle: 'Schöne Aussicht with the Schopenhauerhaus', plaqueType: 'object-manuscript-site-or-archaeological-context',
    invitation: 'Carl Friedrich Mylius’s 1861 riverfront photograph contains Schopenhauer’s Frankfurt house within a changing urban panorama made one year after his death.',
    articleTitle: 'Schopenhauer', dateLabel: 'Carl Friedrich Mylius · albumen-print reproduction, 1861 · Historisches Museum Frankfurt, Ph 2572 · public-domain work',
    objectInterpretation: 'The installed image reproduces Carl Friedrich Mylius’s 1861 Frankfurt on the Main: Schöne Aussicht with the Schopenhauerhaus, an albumen print recorded by Commons as Historisches Museum Frankfurt Ph 2572. It is a broad riverfront view, not a close architectural portrait, and no full provenance was verified.',
    additions: ['The wide view places the house within streets, riverfront, and urban change; its date makes it later evidence of place and commemoration rather than a view of Schopenhauer at work.', 'Schopenhauer’s 1844 expanded edition and 1851 Parerga document revision and altered access to the system. Those publications, not the building, ground claims about his sustained authorship.', 'Reviews, advocates, translations, and new readers made late recognition historically possible. That reception history explains visibility without treating success as proof that every philosophical claim was vindicated. The reproduced streetscape records later urban memory rather than the quality of work composed there. Place supports history, not evaluation.'],
    sources: [primary('primary', 'Schopenhauer — Parerga und Paralipomena, 1851 edition', 'https://sammlungen.ub.uni-frankfurt.de/schopenhauer/content/titleinfo/4243474')],
    guide: ['Mylius’s image is a riverfront panorama containing the Schopenhauerhaus.', 'The 1861 exposure postdates Schopenhauer’s death and has no eyewitness-work claim.', 'The 1844 edition expands rather than replaces the first volume’s architecture.', 'Late reception depended on essays, advocates, periodicals, and changing audiences.'],
    resolution: 'corrected the caption from a house close-up to a riverfront view, retained the reported Ph 2572 identity and public-domain basis, separated place from labor and reception, and preserved the ratio and article.', lock: 'fnv1a64:2785e842b562d2fa',
  },
  'schopenhauer-music-and-wagner': {
    plaqueTitle: 'Portrait of Richard Wagner', plaqueType: 'reception-or-transmission-history',
    invitation: 'A lithograph after Pierre Petit’s photograph presents a later reader whose Wagnerian reception must remain distinct from Schopenhauer’s aesthetics and politics.',
    articleTitle: 'Schopenhauer', dateLabel: 'After Pierre Petit · lithograph after a photograph, after 1861 · Metropolitan Museum of Art, 01.2.141 · CC0',
    objectInterpretation: 'The installed work is Portrait of Richard Wagner, a lithograph after a photograph by Pierre Petit, dated after 1861, Metropolitan Museum of Art 01.2.141, Crosby Brown Collection of Musical Instruments, 1901. The Met releases its image through Open Access; it does not identify a lithographer.',
    additions: ['The object identifies a sitter, source photographer, print medium, date range, accession, and collection history; it does not visualize aesthetic contemplation or document Wagner reading Schopenhauer.', 'Schopenhauer gives music exceptional status as an analogue or expression of will rather than a representation of particular worldly events. Textual argument, not Wagner’s likeness, supports that hierarchy.', 'Wagner’s encounter from 1854 belongs to later reception. His music drama, nationalism, and cultural program selectively redirect Schopenhauer and cannot be imported back into the philosopher’s own position. Influence is documented reading followed by transformation, not philosophical identity. The portrait confirms neither agreement nor artistic endorsement by Schopenhauer.'],
    sources: [collection('met', 'Metropolitan Museum of Art — Portrait of Richard Wagner, 01.2.141', 'https://www.metmuseum.org/art/collection/search/393146'), academic('music', 'Stanford Encyclopedia of Philosophy — Western philosophy of music since 1800', 'https://plato.stanford.edu/entries/hist-westphilmusic-since-1800/')],
    guide: ['The Met catalogs the print as after Pierre Petit and after 1861.', 'Wagner is a later reader, not a collaborator or authorized interpreter.', 'Aesthetic contemplation suspends interested striving only temporarily.', 'Music’s special status and Wagner’s reception are related but nonidentical claims.'],
    resolution: 'corrected maker and date to the Met record, supplied medium, accession, collection and CC0 status, separated later reception from doctrine, and preserved the ratio and current Schopenhauer article.', lock: 'fnv1a64:d4f0530824b8a88e',
  },
  'schopenhauer-oupnekhat-route': {
    plaqueTitle: 'Medallion Portrait of Anquetil-Duperron', plaqueType: 'reception-or-transmission-history',
    invitation: 'David d’Angers’s later medallion portraits a translator in the Persian–Latin route through which Schopenhauer encountered selected Upanishadic materials.',
    articleTitle: 'Schopenhauer', dateLabel: 'Pierre-Jean David d’Angers · medallion, nineteenth century · Musée Carnavalet, S629 · photograph released CC0',
    objectInterpretation: 'The installed image is a CC0 photograph of Pierre-Jean David d’Angers’s nineteenth-century medallion Portrait d’Abraham-Hyacinthe Anquetil-Duperron, Musée Carnavalet S629, diameter 17.8 cm. It is a portrait of a translator, not an Upanishadic manuscript or proof of direct Sanskrit reading.',
    additions: ['The relief supplies a later commemorative likeness and museum identity. Its material cannot display the Persian intermediary, Latin choices, or textual selections that structured the Oupnek’hat.', 'Schopenhauer read the Latin Oupnek’hat produced through Anquetil-Duperron’s translation of Dara Shikoh’s Persian compilation; claims of direct Sanskrit mastery would erase that mediated route.', 'Comparison with Indian traditions remains later interpretation rather than transparent equivalence. Similar vocabulary can clarify Schopenhauer while translation, selection, chronology, and doctrinal difference remain active limits. Naming every intermediary prevents a European reception history from masquerading as unmediated access to a uniform Indian doctrine. Transmission changes what later readers receive.'],
    guide: ['The medallion is a nineteenth-century portrait, not a source manuscript.', 'Musée Carnavalet records it as S629 with a diameter of 17.8 cm.', 'Dara Shikoh’s Persian compilation preceded Anquetil-Duperron’s Latin translation.', 'Mediation must remain visible when comparing will, appearance, and liberation.'],
    resolution: 'verified maker, object type, museum number, dimensions and CC0 photograph, kept the Persian–Latin transmission explicit, rejected direct-Sanskrit inference, and preserved the ratio and article.', lock: 'fnv1a64:1759c6690aef6aec',
  },
  'schopenhauer-pessimism-afterlife': {
    plaqueTitle: 'Schopenhauer Monument in Frankfurt', plaqueType: 'reception-or-transmission-history',
    invitation: 'Friedrich Schierholz’s monument records civic canonization in 1895 and a 1952 reinstallation, not Schopenhauer’s standing during his lifetime.',
    articleTitle: 'Schopenhauer', dateLabel: 'Friedrich Schierholz · monument unveiled 5 June 1895; reinstalled 1952 · Frankfurt · Frank Behnsen photograph, 2010, CC BY-SA 3.0',
    objectInterpretation: 'The installed image is Frank Behnsen’s 2010 CC BY-SA 3.0 photograph of Friedrich Schierholz’s Schopenhauer monument in Frankfurt’s Obermainanlage. The monument was unveiled on 5 June 1895 and reinstalled in 1952 after theft, so object history and photograph date are separate.',
    additions: ['The bronze bust, high pedestal, park setting, later reinstallation, and modern photograph show public commemoration assembled after the philosopher’s death rather than contemporary recognition.', 'Schopenhauer’s account connects recurrent striving with lack, brief satisfaction, and boredom while distinguishing aesthetic respite, compassion, and ascetic denial as different responses.', 'Canonization can domesticate polemic. A responsible afterlife retains hostile and exclusionary claims as well as the system’s ethical resources instead of turning pessimism into temperament or the monument into endorsement. Theft, replacement, landscaping, photography, and maintenance show commemoration as an ongoing civic practice rather than one completed act. Public honor always remains historically and politically revisable today.'],
    sources: [collection('city', 'City of Frankfurt — Schopenhauer monument', 'https://www.kunst-im-oeffentlichen-raum-frankfurt.de/de/page162.html?id=71')],
    guide: ['Schierholz’s monument was unveiled in 1895 and reinstalled in 1952.', 'Behnsen’s 2010 photograph requires attribution and share-alike reuse.', 'Pessimism describes a structure of striving, not simply a gloomy mood.', 'Monumental reception is evidence of canonization, not philosophical correctness.'],
    resolution: 'reconciled the 1895 monument, 1952 reinstallation, 2010 photograph and CC BY-SA terms, separated commemoration from lifetime reception, and preserved the ratio and article.', lock: 'fnv1a64:f04d617a1c2a9c96',
  },
  'kierkegaard-indirect-communication': {
    plaqueTitle: 'Kierkegaard Entering a Copenhagen Salon', plaqueType: 'historical-event-or-institutional-context',
    invitation: 'Klæstrup’s nineteenth-century salon scene locates Kierkegaard among social roles while remaining unrelated to any single pseudonymous text and unresolved in present custody.',
    articleTitle: 'Kierkegaard', dateLabel: 'Peter Christian Klæstrup · pen, ink, and watercolor, between 1838 and 1882 · sold Bruun Rasmussen, 2005 · current custody unknown',
    objectInterpretation: 'The installed reproduction shows Peter Christian Klæstrup’s Søren Kierkegaard entering a salon in Copenhagen, dated between 1838 and 1882. The source records a Bruun Rasmussen sale on 19 April 2005 but no current custodian; Wikimedia Commons is a distributor, not a holding institution.',
    additions: ['The drawing presents a social entrance, seated and standing figures, and a period newspaper; it cannot assign a pseudonym, doctrine, or communicative intention to the depicted moment.', 'Kierkegaard’s signed and pseudonymous writings stage distinct voices so that a reader must appropriate a problem rather than simply repeat an authorial proposition.', 'Johannes de Silentio, Climacus, and Anti-Climacus cannot be collapsed into Kierkegaard without argument. The object makes social performance visible, while authorship evidence remains textual and interpretive. The unresolved ownership chain also separates claims about the pictured scene from claims about the surviving sheet. Social visibility and inward appropriation are never simple or stable opposites.'],
    guide: ['Klæstrup’s work is broadly dated and its current custody is unknown.', 'The 2005 auction is the last documented custody event in the accessible record.', 'Pseudonyms organize perspectives rather than provide a code for one hidden doctrine.', 'Indirect communication concerns readerly appropriation, not mere obscurity.'],
    resolution: 'removed Wikimedia Commons as a false institution, disclosed the 2005 sale and unknown custody, bounded the salon’s relation to pseudonymous authorship, and preserved rights, ratio, and article.', lock: 'fnv1a64:1c0d42dc66c531de',
  },
  'kierkegaard-fear-trembling': {
    plaqueTitle: 'Caravaggio’s Sacrifice of Isaac', plaqueType: 'work-or-text',
    invitation: 'Caravaggio’s c. 1603 painting interprets Genesis 22 roughly 240 years before Fear and Trembling and cannot serve as Kierkegaard’s illustration.',
    articleTitle: 'Kierkegaard', dateLabel: 'Caravaggio · oil on canvas, c. 1603 · Uffizi, inv. 1890 no. 4659 · public-domain artwork',
    objectInterpretation: 'The installed image reproduces Caravaggio’s Sacrifice of Isaac, oil on canvas, c. 1603, Uffizi inv. 1890 no. 4659. Commissioned by Maffeo Barberini and donated in 1917 by John Fairfax Murray, it is earlier interpretive imagery for Genesis 22, not evidence of Kierkegaard’s visual source.',
    additions: ['The angel’s grasp, Abraham’s knife, Isaac’s body, and the ram compose Caravaggio’s dramatic reading. The Uffizi provenance distinguishes this seventeenth-century painting from Kierkegaard’s nineteenth-century text.', 'Johannes de Silentio presents Abraham through repeated retellings, contrasting ethical universality, infinite resignation, faith, silence, and the paradox of a claimed absolute duty.', 'The teleological suspension is not a public rule licensing private violence. Interpretations remain ethically contested, and the painting intensifies that problem without proving a divine command or resolving the text. Visual drama cannot erase de Silentio’s declared inability to understand Abraham.'],
    sources: [collection('uffizi', 'Uffizi Galleries — Sacrifice of Isaac, inv. 1890 no. 4659', 'https://www.uffizi.it/en/artworks/sacrifice-of-isaac'), primary('genesis', 'Genesis 22 — primary narrative', 'https://en.wikisource.org/wiki/Bible_(King_James)/Genesis#22')],
    guide: ['The Uffizi records medium, dimensions, inventory, commissioner, and 1917 gift.', 'Caravaggio’s scene predates Fear and Trembling by about 240 years.', 'Johannes de Silentio is the pseudonymous speaker, not a simple authorial mouthpiece.', 'Private-command claims remain ethically dangerous and interpretively unresolved.'],
    resolution: 'verified the Uffizi object, inventory and provenance, classified it as earlier interpretive imagery, sourced Genesis and Kierkegaard context, and preserved rights, ratio, and article.', lock: 'fnv1a64:f54e7814fd0738ae',
  },
  'kierkegaard-christendom-attack': {
    plaqueTitle: 'Interior of the Church of Our Lady, Copenhagen', plaqueType: 'historical-event-or-institutional-context',
    invitation: 'An 1880–1910 photograph of Copenhagen’s principal church supplies later institutional context for Kierkegaard’s 1854–55 attack on Christendom, not its scene.',
    articleTitle: 'Kierkegaard', dateLabel: 'Anonymous photographer; published by Vilhelm Trydes · photograph, 1880–1910 · Rijksmuseum RP-F-F18138 · CC0',
    objectInterpretation: 'The installed photograph is Interior of the Church of Our Lady in Copenhagen, made by an anonymous photographer and published by Vilhelm Trydes between 1880 and 1910, Rijksmuseum RP-F-F18138. The Rijksmuseum releases it CC0; its date postdates Kierkegaard’s polemic.',
    additions: ['The long nave, columns, statues, and altar document a later photographic presentation of an institution. They do not record Mynster, Martensen, a sermon, or reception of The Moment.', 'Kierkegaard’s 1854–55 polemic accused established Christendom of confusing cultural membership and official profession with costly imitation and lived Christian commitment.', 'A polemical text is not a complete sociology of Danish religious life. The later interior can anchor institutional scale while disagreement, practice, congregants, and unequal access remain outside its frame. Its orderly perspective is a photographic construction, not a measure of consensus. Empty architecture cannot speak for congregants.'],
    guide: ['The Rijksmuseum records an anonymous photographer and Vilhelm Trydes as publisher.', 'The 1880–1910 image postdates Kierkegaard’s attack and cannot depict it.', 'Christendom names an institutional-cultural target, not Christianity in every form.', 'The Moment belongs to a public polemic whose social reach requires separate evidence.'],
    resolution: 'verified maker uncertainty, publisher, date range, Rijksmuseum number and CC0 status, kept later institutional context distinct from the polemic, and preserved ratio and article.', lock: 'fnv1a64:03be6c8807129c53',
  },
  'dostoevsky-brothers-karamazov': {
    plaqueTitle: 'Kramskoi’s Meditator', plaqueType: 'work-or-text',
    invitation: 'Ivan Kramskoi’s 1876 painting is explicitly invoked when the novel describes Smerdyakov’s contemplator type, but it was not commissioned as an illustration.',
    articleTitle: 'Fyodor Dostoevsky', dateLabel: 'Ivan Kramskoi · Meditator / The Contemplator, 1876 · Kyiv National Picture Gallery · accession and full provenance unverified',
    objectInterpretation: 'The installed reproduction is Ivan Kramskoi’s 1876 Meditator, also called The Contemplator, reported at the Kyiv National Picture Gallery. No accession or full provenance was verified. The Brothers Karamazov explicitly invokes Kramskoi’s contemplator while characterizing Smerdyakov; the painting is not a character portrait or commissioned illustration.',
    additions: ['The solitary peasant, winter clothing, snow, and stillness belong to Kramskoi’s composed painting. The primary novel supplies the link, while custody details remain incomplete.', 'Book III, chapter 6 names Kramskoi’s painting in a comparison used to characterize Smerdyakov. Ivan’s rebellion, the Grand Inquisitor, and innocent suffering require their own passages rather than visual inference.', 'Zosima and Alyosha do not simply cancel Ivan’s protest. The novel distributes responsibility, doubt, active love, and violence across voices, leaving philosophical judgment as a reader’s task. Smerdyakov’s relation to the painted contemplator is narrator-mediated and morally charged; it must not become a diagnosis of peasants, passivity, or hidden violence. Painting and novel remain distinct authored works even where the novel explicitly connects them. That intertextual connection is highly specific, never total.'],
    sources: [primary('novel', 'The Brothers Karamazov — Book III, chapter 6', 'https://en.wikisource.org/wiki/The_Brothers_Karamazov/Book_III/Chapter_6')],
    guide: ['The painting is reported at Kyiv; accession and full provenance remain unverified.', 'Dostoevsky’s primary text explicitly invokes Kramskoi’s contemplator type.', 'The object is neither a portrait of Smerdyakov nor a commissioned illustration.', 'Ivan, Zosima, Alyosha, and Smerdyakov retain distinct argumentative roles.'],
    resolution: 'anchored the visual relation in the primary novel, disclosed missing accession and provenance, rejected character-portrait inference, supplied the exact Fyodor Dostoevsky CTA, and preserved rights and ratio.', lock: 'fnv1a64:b7f673aa4c773322',
  },
  'nietzsche-birth-tragedy': {
    plaqueTitle: 'Ancient Terracotta Theatrical Mask, Taranto', plaqueType: 'object-manuscript-site-or-archaeological-context',
    invitation: 'A museum-case photograph presents an ancient theater object whose maker, date, accession, and relationship to any named tragedy or to Nietzsche remain undocumented.',
    articleTitle: 'Friedrich Nietzsche', dateLabel: 'Unidentified ancient maker · terracotta theatrical mask, date and accession unverified · National Archaeological Museum of Taranto · Livioandronico2013 photograph, 2015, CC BY-SA 4.0',
    objectInterpretation: 'The installed image is Livioandronico2013’s 2015 CC BY-SA 4.0 photograph of an ancient terracotta theatrical mask at the National Archaeological Museum of Taranto. The source provides no maker, archaeological date, accession, named play, or documented Nietzsche connection.',
    additions: ['Paint, open mouth, eye apertures, terracotta, and display case are visible; the catalog gaps prevent assigning the mask to tragedy, comedy, a performance, or a precise period.', 'The Birth of Tragedy develops the Apollonian–Dionysian framework in a Wagnerian and Schopenhauerian setting. Nietzsche’s reconstruction of Greek culture is a modern argument, not metadata inherent in the mask.', 'The 1886 Attempt at a Self-Criticism is later self-reception that exposes youthful excess and framing without withdrawing every question. Object, early text, and later revision must remain separate. Archaeological uncertainty also blocks using this mask as a representative specimen of all Greek performance. One artifact cannot stand for an entire theater culture.'],
    guide: ['The source identifies a terracotta theatrical mask and Taranto museum context only.', 'The photograph’s CC BY-SA terms require credit and share alike.', 'Apollonian and Dionysian are Nietzsche’s interpretive categories.', 'The 1886 self-criticism is later reception, not ancient evidence.'],
    resolution: 'retained the responsible generic identity, disclosed maker/date/accession and connection limits, separated ancient object from Nietzschean reconstruction and later self-criticism, and preserved ratio and CTA.', lock: 'fnv1a64:7d97b18b39a99b70',
  },
  'nietzsche-lou-interlocutor': {
    plaqueTitle: 'Lou Andreas-Salomé, c. 1897', plaqueType: 'paired-or-grouped-historical-figures',
    invitation: 'A later studio portrait introduces Andreas-Salomé as an independent author about fifteen years after the 1882 Nietzsche–Rée episode, with original custody unresolved.',
    articleTitle: 'Friedrich Nietzsche', dateLabel: 'Portrait attributed to Atelier Elvira, Munich · c. 1897 · magazine reproduction; original print custody unverified · reported public-domain basis',
    objectInterpretation: 'The installed image is a magazine reproduction of a c. 1897 Lou Andreas-Salomé portrait attributed through an Atelier Elvira blind stamp. No collection record establishes the original print’s custody, and the Commons public-domain assertion rests on the reproduction chain rather than a museum object record.',
    additions: ['The softly lit pose is later self-presentation and cannot document the 1882 relationship with Nietzsche and Paul Rée, their private conversations, or Andreas-Salomé’s mature positions.', 'Andreas-Salomé wrote independently and later published a Nietzsche study. Biography and correspondence can establish encounter and disagreement, but neither reduces her work to influence on a male philosopher.', 'Causal myths that explain Nietzsche’s philosophy through one rejected proposal or rupture exceed the evidence. Textual development, friendship, conflict, and later reception require separate, sourced histories. The later studio construction cannot be read backward as a judgment on 1882 or forward as a summary of Andreas-Salomé’s career. Portraiture is not causal biography.'],
    guide: ['Atelier Elvira attribution and c. 1897 date are reported through a reproduction.', 'The original print’s custodian, accession, and direct rights chain remain unresolved.', 'Andreas-Salomé was an author and interpreter, not merely a biographical episode.', 'The 1882 episode cannot explain Nietzsche’s whole philosophy.'],
    resolution: 'removed Wikimedia Commons as a false institution, disclosed the magazine source and unresolved original custody and rights chain, restored Andreas-Salomé’s independent authorship, and preserved ratio and CTA.', lock: 'fnv1a64:a2f48d1643477d56',
  },
  'nietzsche-writing-machine': {
    plaqueTitle: 'Nietzsche’s Malling-Hansen Writing Ball', plaqueType: 'object-manuscript-site-or-archaeological-context',
    invitation: 'Serial no. 125 records Nietzsche’s brief 1882 experiment with machine writing while related typescripts—and not the device—belong to the Goethe- und Schiller-Archiv.',
    articleTitle: 'Friedrich Nietzsche', dateLabel: 'Rasmus Malling-Hansen · writing ball, after 1878, serial no. 125 · Klassik Stiftung Weimar NKg/00329 · Streckhardt photograph, 2011, CC BY-SA 4.0',
    objectInterpretation: 'The installed image is B.-Christoph Streckhardt’s 2011 CC BY-SA 4.0 photograph of Rasmus Malling-Hansen’s writing ball from Nietzsche’s estate, after 1878, serial no. 125, 22 × 25.3 × 20.8 cm, Klassik Stiftung Weimar art-and-crafts collection / Nietzsche-Archiv, NKg/00329. The GSA holds related typescripts, not the machine.',
    additions: ['Brass, steel, celluloid, spherical keys, serial number, dimensions, and provenance make the apparatus unusually specific material evidence. The photograph and object still cannot reveal composition unaided.', 'The Klassik Stiftung records arrival in Genoa in February 1882, nearly sixty typed pages over about six weeks, repeated mechanical difficulty, and abandonment; those facts bound the experiment’s duration.', 'The machine permits analysis of eyesight, touch, travel, error, repair, and medium. It does not establish that technology caused Nietzsche’s aphoristic style or determine the philosophy of the resulting texts. Comparing device and separately held typescripts keeps mechanism, output, and interpretation distinct. Material constraint is not technological determinism.'],
    sources: [collection('ksw', 'Klassik Stiftung Weimar — Friedrich Nietzsche’s writing ball', 'https://www.klassik-stiftung.de/en/home/digital/collection-highlights/friedrich-nietzsches-writing-ball/')],
    guide: ['The machine is Klassik Stiftung Weimar NKg/00329, serial no. 125.', 'The GSA’s related typescript record must not be mistaken for machine custody.', 'Nietzsche used the device briefly in 1882 amid poor eyesight and repair problems.', 'Medium and bodily constraint invite interpretation but do not dictate writing style.'],
    resolution: 'corrected custody from the GSA to the Klassik Stiftung collection, added maker, date, serial, dimensions and catalog number, separated related typescripts, bounded technological inference, and preserved licensed ratio.', lock: 'fnv1a64:e08bfd704301ab1c',
  },
  'nietzsche-eternal-recurrence': {
    plaqueTitle: 'The Nietzsche Stone near Surlej', plaqueType: 'reception-or-transmission-history',
    invitation: 'Armin Kübelbeck’s 2009 photograph records a commemoratively named site near Surlej, not independent evidence that an 1881 thought occurred beside this stone.',
    articleTitle: 'Friedrich Nietzsche', dateLabel: 'Armin Kübelbeck · photograph, 29 August 2009 · near Surlej, Lake Silvaplana · CC BY-SA 3.0',
    objectInterpretation: 'The installed image is Armin Kübelbeck’s 29 August 2009 CC BY-SA 3.0 photograph of the commemoratively named Nietzsche Stone beside Lake Silvaplana near Surlej. It is an outdoor landmark without accession or holding institution and cannot independently document Nietzsche’s 1881 experience.',
    additions: ['The boulder, plaque, lake, and mountains establish present memorial geography. Site naming and photography are later reception rather than a contemporaneous record of composition.', 'The Gay Science §341’s demon scenario, Zarathustra’s literary staging, and unpublished notebook speculation differ in speaker, genre, and evidential status; published and unpublished formulations should not be conflated.', 'Cosmological, existential, ethical-test, and literary readings remain contested. The site can frame that plurality but cannot turn recurrence into a settled fact or motivational slogan. Memorial geography intensifies encounter while adding proof to none of those readings. This landscape itself remains reception evidence.'],
    sources: [primary('primary', 'Nietzsche Source — critical digital texts', 'https://doc.nietzschesource.org/en/ekgwb')],
    guide: ['The landmark is near Surlej, not Sils Maria proper.', 'Kübelbeck’s 2009 photograph requires attribution and share alike.', 'Published scenarios and unpublished notebook speculation have different status.', 'Cosmology, ethical test, and literary challenge remain rival readings.'],
    resolution: 'identified the photograph and commemorative site precisely, removed any collection implication, distinguished memorial evidence from primary texts and contested interpretations, and preserved license, ratio, and CTA.', lock: 'fnv1a64:cefc92c65604ff81',
  },
  'nietzsche-archive-afterlife': {
    plaqueTitle: 'Villa Silberblick and the Nietzsche Archive', plaqueType: 'reception-or-transmission-history',
    invitation: 'A 2021 exterior introduces the archive’s editorial and political afterlife while distinguishing its 1896 move to Weimar, the 1897 villa residence, and the 1900–03 conversion.',
    articleTitle: 'Friedrich Nietzsche', dateLabel: 'Villa residence from 1897; converted as archive and residence, 1900–03 · Carl Novator photograph, 2021 · CC BY-SA 4.0',
    objectInterpretation: 'The installed image is Carl Novator’s 2021 CC BY-SA 4.0 photograph of Villa Silberblick in Weimar. The Nietzsche-Archiv moved to Weimar in 1896, Elisabeth and Friedrich entered the villa in 1897, and Henry van de Velde’s representative archive conversion followed Nietzsche’s 1900 death through 1903.',
    additions: ['The modern façade documents a surviving reception site, not the arrangement of manuscripts, edition decisions, visitors, or the written estate’s present storage.', 'Elisabeth Förster-Nietzsche controlled access and shaped editions; notebook fragments arranged as The Will to Power were not a completed book authorized by Nietzsche. Later critical editing challenged that construction.', 'Nationalist and Nazi appropriation is reception history, not identity with Nietzsche’s philosophy. Yet separating distortion cannot sanitize his own hierarchy, anti-egalitarianism, or troubling political rhetoric. The building’s pilgrimage function belongs to histories of authority, access, publication, and selective remembrance. Archives actively organize evidence as well as preserving it.'],
    sources: [collection('ksw', 'Klassik Stiftung Weimar — Nietzsche-Archiv history', 'https://www.klassik-stiftung.de/en/nietzsche-archiv/')],
    guide: ['The archive moved to Weimar in 1896; the siblings entered Villa Silberblick in 1897.', 'The representative archive conversion occurred after Nietzsche’s death, from 1900 to 1903.', 'The Will to Power is an editorial construction, not an authorized finished book.', 'Appropriation and Nietzsche’s own troubling claims must be distinguished without erasure.'],
    resolution: 'corrected the villa chronology, distinguished exterior, archive institution and manuscript custody, bounded editorial and political reception claims, and preserved licensed ratio and exact Friedrich Nietzsche CTA.', lock: 'fnv1a64:e8310e15a851bc29',
  },
};

const reviewMethod = 'Galleries 18–19 supplemental review: exactly three concurrent GPT-5.6 Terra/High read-only evidence scopes of twelve, eleven, and eleven non-overlapping exhibits were reconciled by the Sol parent across installed-object identity, attribution, dating, institution, provenance, rights, captions, alt text, primary evidence, later reception, interpretive imagery, unresolved evidence, claim-level sources, factual plaques, subject-specific guidance, canonical relationships, exact article actions, current review locks, natural-ratio mounting, and desktop, mobile, and fresh staged-3D presentation.';

const visualReview = (id: string): NonNullable<NonNullable<MuseumSupplementalExhibit['review']>['visualReview']> => ({
  desktop: {reviewedOn: '2026-08-20', viewport: '1440×900', evidence: `Direct route inspected with the full uncropped object preview, three untitled sourced paragraphs, subject-specific evidence guide, factual plaque relationship, exact article action, and no horizontal overflow. Evidence: docs/visual-validation/gallery-18-19-supplementals/desktop/${id}.png`},
  mobile: {reviewedOn: '2026-08-20', viewport: '390×844', evidence: `Direct route inspected with a wrapped factual title, aspect-safe object preview, scrollable interpretation, complete controls, and no horizontal overflow. Evidence: docs/visual-validation/gallery-18-19-supplementals/mobile/${id}.png`},
  threeDimensional: {reviewedOn: '2026-08-20', viewport: '1280×720 fresh direct-route session', evidence: `Fresh direct-route session inspected after closing the detail view: the sole staged activation remained this routed target, with a factual two-level plaque, unobstructed controls, and a natural-ratio mount. Evidence: docs/visual-validation/gallery-18-19-supplementals/staged-3d/${id}.png`},
});

const canonicalContext = (input: MuseumSupplementalExhibit): MuseumCanonicalContextRef => {
  if (input.articleRoute?.kind === 'philosopher') return {kind: 'philosopher', id: input.articleRoute.philosopherId};
  throw new Error(`Gallery 18 supplemental exhibit ${input.id} lacks a canonical philosopher route.`);
};

export const reviewFaithPessimismValueSupplementalExhibit = (input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => {
  const reviewed = evidence[input.id];
  if (!reviewed) throw new Error(`Missing Gallery 18 review evidence for ${input.id}.`);
  if (!input.presentation) throw new Error(`Missing Gallery 18 presentation for ${input.id}.`);
  const baseParagraphs = input.sections.map((section) => section.paragraphs.join(' '));
  if (baseParagraphs.length !== 3) throw new Error(`Gallery 18 supplemental exhibit ${input.id} must begin with exactly three paragraphs.`);
  const sources: readonly MuseumSupplementalInterpretationSource[] = [
    {...input.sources[0], id: 'object'},
    {...input.sources[1], id: 'context'},
    ...(reviewed.sources ?? []),
  ];
  const sourceIds = sources.flatMap((source) => source.id ? [source.id] : []);
  const argumentIds = sources.flatMap((source) => source.id && source.kind !== 'collection-record' ? [source.id] : []);
  return {
    ...input,
    dateLabel: reviewed.dateLabel,
    sections: baseParagraphs.map((paragraph, index) => ({heading: '', paragraphs: [`${paragraph} ${reviewed.additions[index]}`], sourceIds: index === 0 ? sourceIds : argumentIds.length ? argumentIds : sourceIds})),
    sources,
    visitorGuide: [
      {heading: `${reviewed.plaqueTitle}: object record`, items: reviewed.guide.slice(0, 2).map((description, index) => ({label: ['Identity', 'Material limit'][index], description, sourceIds}))},
      {heading: `${reviewed.plaqueTitle}: interpretive limits`, items: reviewed.guide.slice(2).map((description, index) => ({label: ['Philosophical claim', 'Interpretive limit'][index], description, sourceIds}))},
    ],
    objectInterpretation: reviewed.objectInterpretation,
    presentation: {...input.presentation, panelKicker: 'Gallery 18 supplemental exhibit', proximityKicker: reviewed.plaqueTitle, factRows: [{label: 'Object', value: reviewed.plaqueTitle}, {label: 'Evidence', value: reviewed.dateLabel}, {label: 'Atlas route', value: reviewed.articleTitle}], articleActionLabel: `Read the full sourced ${reviewed.articleTitle} article`, exhibitLayout: 'object-led'},
    wallPlaque: {type: reviewed.plaqueType, title: reviewed.plaqueTitle, invitation: reviewed.invitation, canonicalContexts: [canonicalContext(input)]},
    review: {status: 'standard-compliant', reviewedOn: '2026-08-20', method: reviewMethod, resolution: `Resolved: ${reviewed.resolution}`, lock: reviewed.lock, visualReview: visualReview(input.id)},
  };
};
