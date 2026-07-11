import type {Philosopher,ReadingEntry,SourceLink} from '../types/philosophy';

const reading=(author:string,title:string,difficulty:ReadingEntry['difficulty'],whyRead:string,type:ReadingEntry['type']='primary'):ReadingEntry=>({author,title,difficulty,type,whyRead});
const sep=(label:string,slug:string):SourceLink=>({label:`Stanford Encyclopedia: ${label}`,url:`https://plato.stanford.edu/entries/${slug}/`,type:'SEP'});
const wiki=(label:string,slug:string):SourceLink=>({label:`${label} overview`,url:`https://en.wikipedia.org/wiki/${slug}`,type:'Wikipedia'});

export const medievalCompletionDetails:Record<string,Partial<Philosopher>>={
  'saadia-gaon':{
    beginnerReadingPath:[reading('Saadia Gaon','Book of Beliefs and Opinions, Introduction','intermediate','Begin with sources of knowledge, error, inquiry, and the relation of reason to tradition.'),reading('Saadia Gaon','Book of Beliefs and Opinions, creation and unity selections','intermediate','Study Jewish kalam arguments about creation, divine unity, and language.'),reading('Saadia Gaon','Arabic translation and commentary on the Torah, selections','intermediate','See philosophical interpretation applied to grammar, scriptural language, law, and community.')],
    advancedReadingPath:[reading('Saadia Gaon','Book of Beliefs and Opinions, complete','advanced','Follow the architecture from knowledge and creation through commandment, soul, and redemption.'),reading('Saadia Gaon','Commentary on Sefer Yetzirah, selections','advanced','Examine cosmology, creation, and interpretation in another major genre.')],
    sourceLinks:[sep('Saadya Gaon','saadya')]
  },
  'judah-halevi':{
    beginnerReadingPath:[reading('Judah Halevi','Kuzari, Book I','intermediate','Enter the dialogue through competing accounts of philosophy, revelation, action, and historical testimony.'),reading('Judah Halevi','Kuzari, Books II–III, selections','intermediate','Study commandment, prophecy, language, practice, and the life of the religious community.'),reading('Judah Halevi','Selected sacred and secular poems','beginner','Let poetic address, exile, friendship, and longing complicate the prose philosophy.')],
    advancedReadingPath:[reading('Judah Halevi','Kuzari, Books IV–V','advanced','Follow the critique of philosophical abstraction and the final movement toward lived commitment.'),reading('Judah Halevi','Kuzari, complete','advanced','Assess the dialogue’s literary development rather than treating one speaker as a flat doctrine list.')],
    sourceLinks:[sep('Judah Halevi','halevi')]
  },
  'ibn-tufayl':{
    beginnerReadingPath:[reading('Ibn Tufayl','Hayy ibn Yaqzan, opening and natural inquiry','beginner','Begin with Hayy’s education through embodied attention to an island environment.'),reading('Ibn Tufayl','Hayy ibn Yaqzan, philosophical ascent','intermediate','Trace the movement from natural investigation toward metaphysics and contemplation.'),reading('Ibn Tufayl','Hayy ibn Yaqzan, encounter with Absal and society','intermediate','Study prophecy, symbolic law, pedagogy, and the limits of public philosophical reform.')],
    advancedReadingPath:[reading('Ibn Tufayl','Hayy ibn Yaqzan, complete','advanced','Read the narrative form as part of the argument rather than extracting a rationalist slogan.'),reading('Avicenna','The Floating Man and philosophical psychology selections','advanced','Supply important context for self-awareness and philosophical ascent.')],
    sourceLinks:[wiki('Ibn Tufayl','Ibn_Tufail')]
  },
  suhrawardi:{
    beginnerReadingPath:[reading('Suhrawardi','The Philosophy of Illumination, logical introduction','intermediate','Begin with the critique of definition and the argumentative preparation for illumination.'),reading('Suhrawardi','The Philosophy of Illumination, metaphysics of lights','advanced','Study knowledge by presence, degrees of light, and relations of dependence.'),reading('Suhrawardi','Selected symbolic narratives','intermediate','Ask what philosophical narration discloses without decoding every image mechanically.')],
    advancedReadingPath:[reading('Suhrawardi','The Intimations, selections','advanced','See the continuing Peripatetic curriculum within the Illuminationist project.'),reading('Suhrawardi','The Philosophy of Illumination with an early commentary','advanced','Follow how later interpreters turned a difficult work into a continuing school.')],
    sourceLinks:[sep('Suhrawardi','suhrawardi')]
  },
  'mulla-sadra':{
    beginnerReadingPath:[reading('Mulla Sadra','The Book of Metaphysical Penetrations','intermediate','Use a compact route into the primacy and gradation of existence and causal dependence.'),reading('Mulla Sadra','The Wisdom of the Throne, selections','intermediate','Connect ontology, soul, imagination, and resurrection in a shorter work.'),reading('Mulla Sadra','The Four Journeys, selected introduction','advanced','Meet the systematic and transformative itinerary of transcendent philosophy.')],
    advancedReadingPath:[reading('Mulla Sadra','The Four Journeys, selections on substantial motion and soul','advanced','Study how material process and embodied development reshape philosophical psychology.'),reading('Mulla Sadra','Quranic commentary, selections','advanced','See demonstration, spiritual insight, theology, and scriptural interpretation interact.')],
    sourceLinks:[sep('Mulla Sadra','mulla-sadra')]
  }
};
