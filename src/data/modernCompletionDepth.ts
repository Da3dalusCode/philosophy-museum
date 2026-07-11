import type {Philosopher,ReadingEntry,SourceLink} from '../types/philosophy';

const reading=(author:string,title:string,difficulty:ReadingEntry['difficulty'],whyRead:string,type:ReadingEntry['type']='primary'):ReadingEntry=>({author,title,difficulty,type,whyRead});
const sep=(label:string,slug:string):SourceLink=>({label:`Stanford Encyclopedia: ${label}`,url:`https://plato.stanford.edu/entries/${slug}/`,type:'SEP'});

export const modernCompletionDetails:Record<string,Partial<Philosopher>>={
  arendt:{
    beginnerReadingPath:[reading('Hannah Arendt','Between Past and Future, selected essays','beginner','Enter through essays on freedom, authority, truth, and education.'),reading('Hannah Arendt','The Human Condition','intermediate','Study labor, work, action, plurality, natality, and the public world.'),reading('Hannah Arendt','Eichmann in Jerusalem','intermediate','Read the banality-of-evil argument together with serious historical criticism.')],
    advancedReadingPath:[reading('Hannah Arendt','The Origins of Totalitarianism, selected chapters','advanced','Connect statelessness, imperialism, ideology, terror, and loneliness.'),reading('Hannah Arendt','The Life of the Mind and Lectures on Kant’s Political Philosophy, selections','advanced','Follow thinking, willing, and the unfinished project of judgment.')],
    sourceLinks:[sep('Hannah Arendt','arendt')]
  },
  rawls:{
    beginnerReadingPath:[reading('John Rawls','Justice as Fairness: A Restatement','beginner','Use Rawls’s later concise presentation of the basic structure and two principles.'),reading('John Rawls','A Theory of Justice, §§1–17','intermediate','Study the original position, veil of ignorance, and principles of justice.'),reading('John Rawls','Political Liberalism, Introduction and Lectures I–IV','intermediate','See why reasonable pluralism changes the account of justification and stability.')],
    advancedReadingPath:[reading('John Rawls','A Theory of Justice, parts on institutions and stability','advanced','Examine fair opportunity, the difference principle, and congruence in the full theory.'),reading('John Rawls','The Law of Peoples','advanced','Assess the contested extension from domestic justice to international society.')],
    sourceLinks:[sep('John Rawls','rawls')]
  },
  nozick:{
    beginnerReadingPath:[reading('Robert Nozick','Anarchy, State, and Utopia, Preface and Part II','intermediate','Begin with side constraints, entitlement, patterned principles, and rectification.'),reading('Robert Nozick','Anarchy, State, and Utopia, Part I','intermediate','Reconstruct the invisible-hand argument for the minimal state.'),reading('Robert Nozick','Anarchy, State, and Utopia, Part III','intermediate','Study the pluralistic framework for voluntary communities.')],
    advancedReadingPath:[reading('Robert Nozick','Philosophical Explanations, selections','advanced','Encounter knowledge, identity, explanation, value, and the experience machine in a wider system.'),reading('Robert Nozick','The Examined Life','advanced','Read the later reflections on meaning, love, politics, death, and value.')],
    sourceLinks:[sep('Robert Nozick’s political philosophy','nozick-political')]
  },
  derrida:{
    beginnerReadingPath:[reading('Jacques Derrida','Structure, Sign and Play','intermediate','Begin with center, structure, substitution, and play in a compact essay.'),reading('Jacques Derrida','Positions, selected interviews','intermediate','Use Derrida’s clarifications without turning them into a deconstruction checklist.'),reading('Jacques Derrida','Of Grammatology, Rousseau selections','advanced','Follow supplement, writing, trace, and the critique of pure origins in a close reading.')],
    advancedReadingPath:[reading('Jacques Derrida','Limited Inc','advanced','Study iterability, context, intention, and the debate with speech-act theory.'),reading('Jacques Derrida','Force of Law and Of Hospitality','advanced','Connect undecidability to justice, decision, borders, and responsibility.')],
    sourceLinks:[sep('Jacques Derrida','derrida')]
  },
  habermas:{
    beginnerReadingPath:[reading('Jürgen Habermas','Modernity: An Unfinished Project','beginner','Enter the defense of modernity as an unfinished, self-correcting project.'),reading('Jürgen Habermas','The Structural Transformation of the Public Sphere, selections','intermediate','Study publicity, media, exclusion, and the historical public sphere.'),reading('Jürgen Habermas','Between Facts and Norms, selected chapters','intermediate','Connect rights, law, public communication, and democratic legitimacy.')],
    advancedReadingPath:[reading('Jürgen Habermas','The Theory of Communicative Action, selections','advanced','Work through communicative action, validity claims, system, lifeworld, and colonization.'),reading('Jürgen Habermas','Moral Consciousness and Communicative Action','advanced','Study discourse ethics and its procedural account of valid norms.')],
    sourceLinks:[sep('Jürgen Habermas','habermas'),{label:'Goethe University obituary for Jürgen Habermas',url:'https://aktuelles.uni-frankfurt.de/en/english/goethe-university-frankfurt-mourns-juergen-habermas/',type:'other',notes:'Official obituary, March 2026'}]
  },
  fanon:{
    beginnerReadingPath:[reading('Frantz Fanon','Black Skin, White Masks','intermediate','Begin with racialization, language, embodiment, recognition, and the colonial gaze.'),reading('Frantz Fanon','The Wretched of the Earth, “On National Culture”','intermediate','Study culture as a contested practice within decolonizing struggle.'),reading('Frantz Fanon','A Dying Colonialism','intermediate','See how institutions and everyday practices change during the Algerian revolution.')],
    advancedReadingPath:[reading('Frantz Fanon','The Wretched of the Earth, complete','advanced','Read violence, political organization, national consciousness, and clinical aftermath together.'),reading('Frantz Fanon','Toward the African Revolution','advanced','Trace journalism, political strategy, solidarity, and Fanon’s changing anticolonial commitments.')],
    sourceLinks:[sep('Frantz Fanon','frantz-fanon')]
  }
};
