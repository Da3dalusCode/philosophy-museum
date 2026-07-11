import type {Philosopher,ReadingEntry,SourceLink} from '../types/philosophy';

const reading=(author:string,title:string,difficulty:ReadingEntry['difficulty'],whyRead:string,type:ReadingEntry['type']='primary'):ReadingEntry=>({author,title,difficulty,type,whyRead});
const sep=(label:string,slug:string):SourceLink=>({label:`Stanford Encyclopedia: ${label}`,url:`https://plato.stanford.edu/entries/${slug}/`,type:'SEP'});

export const philosopherCompletionDetails:Record<string,Partial<Philosopher>>={
  fichte:{
    beginnerReadingPath:[
      reading('Johann Gottlieb Fichte','The Vocation of Man','beginner','Enter Fichte through a literary presentation of doubt, knowledge, freedom, and practical faith.'),
      reading('Johann Gottlieb Fichte','First and Second Introductions to the Wissenschaftslehre','intermediate','See why transcendental philosophy begins from activity rather than a thing-like ego.'),
      reading('Johann Gottlieb Fichte','Foundations of Natural Right, selections','intermediate','Follow the argument from embodied agency and summons to reciprocal recognition and right.')
    ],
    advancedReadingPath:[
      reading('Johann Gottlieb Fichte','Foundation of the Entire Wissenschaftslehre','advanced','Study the difficult 1794–95 presentation of self-positing, opposition, limitation, and striving.'),
      reading('Johann Gottlieb Fichte','The System of Ethics','advanced','Connect the Wissenschaftslehre to freedom, duty, embodiment, and concrete moral agency.')
    ],
    sourceLinks:[sep('Johann Gottlieb Fichte','johann-fichte')]
  },
  schelling:{
    beginnerReadingPath:[
      reading('F. W. J. Schelling','Philosophical Investigations into the Essence of Human Freedom','intermediate','Begin with the mature problem of freedom, evil, personality, and the ground of existence.'),
      reading('F. W. J. Schelling','Ideas for a Philosophy of Nature, selections','intermediate','Encounter nature as productive and self-organizing rather than inert mechanism.'),
      reading('F. W. J. Schelling','System of Transcendental Idealism, art sections','intermediate','See why art becomes a privileged presentation of conscious and unconscious productivity.')
    ],
    advancedReadingPath:[
      reading('F. W. J. Schelling','The Ages of the World, selected draft','advanced','Approach the unfinished middle-period attempt to think time, freedom, and divine becoming.'),
      reading('F. W. J. Schelling','Philosophy of Revelation, selections','advanced','Study the later distinction between negative and positive philosophy.')
    ],
    sourceLinks:[sep('F. W. J. Schelling','schelling')]
  },
  husserl:{
    beginnerReadingPath:[
      reading('Edmund Husserl','The Idea of Phenomenology','intermediate','Use five compact lectures to enter reduction, givenness, and phenomenological method.'),
      reading('Edmund Husserl','Cartesian Meditations, Meditations I–II','intermediate','Meet transcendental subjectivity and intentional analysis in a relatively concise presentation.'),
      reading('Edmund Husserl','The Crisis of European Sciences, selections','intermediate','Connect phenomenology to the lifeworld, history, and the crisis of scientific meaning.')
    ],
    advancedReadingPath:[
      reading('Edmund Husserl','Logical Investigations, selected investigations','advanced','Study the anti-psychologistic and descriptive beginnings of the project.'),
      reading('Edmund Husserl','Ideas I','advanced','Work through epoché, reduction, noesis, noema, and transcendental phenomenology.')
    ],
    sourceLinks:[sep('Edmund Husserl','husserl')]
  },
  sartre:{
    beginnerReadingPath:[
      reading('Jean-Paul Sartre','Existentialism Is a Humanism','beginner','Start with a lucid public defense of freedom and responsibility while remembering that it simplifies the larger philosophy.'),
      reading('Jean-Paul Sartre','No Exit','beginner','See conflict, self-deception, and dependence on others staged dramatically.'),
      reading('Jean-Paul Sartre','Anti-Semite and Jew, selections','intermediate','Connect bad faith and situation to a concrete political analysis of antisemitism.')
    ],
    advancedReadingPath:[
      reading('Jean-Paul Sartre','Being and Nothingness, selected parts','advanced','Study consciousness, nothingness, bad faith, embodiment, and relations with others in the systematic work.'),
      reading('Jean-Paul Sartre','Critique of Dialectical Reason, selections','advanced','Follow the later effort to place freedom within material scarcity, groups, and history.')
    ],
    sourceLinks:[sep('Jean-Paul Sartre','sartre')]
  },
  camus:{
    beginnerReadingPath:[
      reading('Albert Camus','The Myth of Sisyphus','beginner','Begin with the absurd, the question of suicide, lucid refusal, and life without appeal.'),
      reading('Albert Camus','The Plague','beginner','Encounter solidarity and responsibility through a novel of collective catastrophe.'),
      reading('Albert Camus','The Stranger','beginner','Read the novel beside, not as a simple illustration of, the philosophical essays.')
    ],
    advancedReadingPath:[
      reading('Albert Camus','The Rebel','advanced','Study revolt, limits, historical murder, revolution, and solidarity after the analysis of absurdity.'),
      reading('Albert Camus','Resistance, Rebellion, and Death','advanced','Trace Camus’s public arguments about resistance, punishment, Algeria, and political responsibility.')
    ],
    sourceLinks:[sep('Albert Camus','camus')]
  }
};
