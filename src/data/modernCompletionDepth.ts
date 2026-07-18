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
  },
  'jiddu-krishnamurti':{
    shortBio:'Jiddu Krishnamurti was an Indian-born international speaker and educator who turned a childhood shaped by the Theosophical World Teacher project into a lifelong inquiry into conditioning, authority, attention, relationship, and psychological freedom.',
    extendedBio:[
      'Born at Madanapalle in the Madras Presidency, Krishnamurti entered the orbit of the Theosophical Society at Adyar as a boy. Annie Besant and C. W. Leadbeater promoted him as the expected vehicle of a World Teacher, educated him for a public spiritual role, and placed him at the head of the Order of the Star. The arrangement gave him international reach while subjecting his childhood and identity to an extraordinary institutional projection.',
      'On 3 August 1929 at Ommen, Krishnamurti dissolved the Order built around him. He thereafter rejected guru authority, spiritual organizations that claimed to lead people to truth, and fixed methods of inward transformation. For more than five decades he spoke, held dialogues, founded or supported schools, and examined how thought, fear, memory, comparison, and images divide human beings from one another and from direct attention.',
      'His surviving corpus is not a conventional system written as a sequence of treatises. It includes public talks, question-and-answer meetings, dialogues, notebooks, school discussions, recordings, and books edited from transcripts. That archive makes changes of context and editorial mediation important. It also makes it misleading to turn recurring formulations into a creed that he himself refused to authorize.'
    ],
    centralQuestions:[
      'Can a mind conditioned by memory, fear, belief, and social identity see its conditioning without turning that inquiry into another method?',
      'What happens when the apparent division between observer and observed is examined as a movement of thought?',
      'Can attention be free of choice, motive, reward, authority, and the psychological project of becoming someone?',
      'How should education cultivate intelligence, relationship, care, and freedom rather than only competition and technical success?'
    ],
    majorIdeasDetailed:[
      {name:'Conditioning and thought',explanation:'Thought is indispensable for language, planning, and technical knowledge, yet it is also a response of memory and therefore limited by the past. Psychological conditioning operates when those partial responses present themselves as a complete self or unquestionable identity.',whyItMatters:'The distinction lets Krishnamurti criticize inherited fear and division without dismissing practical knowledge or treating every thought as an enemy.'},
      {name:'Psychological time',explanation:'Chronological time organizes practical life. Psychological time is the inward movement that projects a remembered self toward an imagined state—“I will become free”—and thereby carries conflict and fear forward.',whyItMatters:'It shifts attention from a promised future cure to the present activity by which fear and self-image are renewed.'},
      {name:'Choiceless awareness',explanation:'Awareness is not selecting a preferred experience or following a prescribed meditation routine. It is observation of sensation, thought, reaction, and relationship without immediately condemning, justifying, or controlling what appears.',whyItMatters:'It proposes an inquiry that resists both passive drift and the authority of a technique, while raising the difficult question of whether a non-method can itself become a method.'},
      {name:'Observer and observed',explanation:'The observer often appears to stand apart from anger, fear, or desire, but the observer is itself composed of memory, labels, and past reactions. Seeing that shared movement challenges the inner division between a controller and the state to be controlled.',whyItMatters:'The claim connects consciousness, conflict, attention, and relationship without requiring a permanent metaphysical self behind experience.'},
      {name:'Freedom in relationship',explanation:'People meet one another through accumulated images—roles, injuries, hopes, and expectations. Relationship becomes a mirror in which those images and the fears sustaining them can be seen.',whyItMatters:'Freedom is tested in ordinary contact rather than reserved for private mystical experience or obedience to a spiritual specialist.'}
    ],
    keyWorksDetailed:[
      {title:'Dissolution Speech',year:1929,summary:'The Ommen address dissolving the Order of the Star rejects institutional paths and spiritual authority while announcing freedom as the central concern.',whyItMatters:'It is a primary historical act and text, not merely a later slogan about a pathless truth.'},
      {title:'The First and Last Freedom',year:1954,summary:'An edited presentation of talks on self-knowledge, belief, fear, relationship, and transformation, introduced by Aldous Huxley.',whyItMatters:'It became an influential early route into Krishnamurti’s mature public teaching, but should be read as an arranged talk-based volume.'},
      {title:'Education and the Significance of Life',year:1953,summary:'A concise account of education as the cultivation of integrated intelligence rather than narrow career preparation and competitive conformity.',whyItMatters:'It connects inward freedom to institutions, teachers, students, and the practical life of schools.'},
      {title:'Freedom from the Known',year:1969,summary:'A short, edited introduction to conditioning, fear, thought, attention, and freedom.',whyItMatters:'Its accessibility makes it a good entry point, provided compact formulations are tested against fuller talks and dialogues.'},
      {title:'The Ending of Time',year:1985,summary:'Dialogues with physicist David Bohm about thought, time, fragmentation, insight, and whether humanity can undergo radical psychological change.',whyItMatters:'The dialogue form exposes questions and disagreements that disappear when his teaching is reduced to isolated aphorisms.'},
      {title:'Krishnamurti’s Notebook',year:1976,summary:'Journal-like observations of landscape, silence, bodily pain, and states he regarded as religious or sacred.',whyItMatters:'It documents a different register of experience while requiring caution: first-person testimony is neither a scientific report nor philosophical proof.'}
    ],
    lifeEvents:[
      {approximateYear:1895,label:'Born in Madanapalle',description:'Born into a Telugu-speaking family in the Madras Presidency; 11 May is the foundation convention, while independent scholarship cautions against false exactness.'},
      {year:1909,label:'Drawn into the Theosophical project',description:'At Adyar, C. W. Leadbeater identified the boy as a possible vehicle for the expected World Teacher; Annie Besant soon became his guardian and sponsor.'},
      {year:1911,label:'Order of the Star established',description:'The Order was founded to prepare for the World Teacher, with Krishnamurti placed at its center.'},
      {year:1925,label:'Death of Nitya',description:'The death of his brother and closest companion intensified a crisis in the promises and assurances surrounding his Theosophical role.'},
      {year:1929,label:'Dissolved the Order of the Star',description:'At Ommen on 3 August, he ended the organization and publicly rejected spiritual authority, followers, and any institution claiming a path to truth.'},
      {approximateYear:1930,label:'Independent public work',description:'Began decades of international talks, dialogues, school visits, and discussions outside inherited religious allegiance.'},
      {approximateYear:1968,label:'Schools and foundations consolidate',description:'Institutions in India, Britain, and the United States increasingly preserved the work and supported schools, while insisting they did not confer spiritual authority.'},
      {year:1986,label:'Died in Ojai',description:'Died on 17 February in Ojai, California, after continuing public talks into the final months of his life.'}
    ],
    intellectualDevelopment:[
      'A childhood formed inside colonial India and the international Theosophical movement placed him within a messianic role authored largely by adults around him.',
      'Grief, reported transformative experiences, and growing resistance to ceremony and hierarchy preceded the decisive dissolution of the Order in 1929.',
      'Mature talks repeatedly investigated the operation of thought and fear in immediate experience rather than constructing a cumulative doctrinal system.',
      'Later dialogues with educators, scientists, psychologists, and public audiences tested the same questions through conversation, while recordings made the editorial history of the corpus increasingly visible.'
    ],
    influencesReceived:[
      'Theosophical formation under Annie Besant and C. W. Leadbeater, understood as historical formation rather than a school he continued to profess',
      'Telugu-speaking South Indian family and colonial social setting',
      'The loss of his brother Nitya and the collapse of institutional assurances surrounding the World Teacher project',
      'Decades of dialogue with teachers, students, scientists, psychotherapists, and international audiences'
    ],
    influenceOnLaterThought:[
      'International nonsectarian spiritual and psychological inquiry',
      'Schools emphasizing attention, relationship, environmental care, and freedom from fear',
      'Dialogical inquiry involving David Bohm and other scientific or psychological interlocutors',
      'Twentieth-century discussions of meditation and awareness outside formal religious allegiance'
    ],
    controversiesOrInterpretiveTensions:[
      'Rejecting gurus and followers did not prevent audiences from treating him as a charismatic authority; interpretation must preserve that structural tension.',
      'Foundations and schools preserve the work while his 1929 argument warns that spiritual organizations easily become cages. Administrative preservation and claimed spiritual authority should not be conflated.',
      '“Choiceless awareness” can harden into a repeatable technique even though he denied that fixed methods produce freedom.',
      'His universal language about human consciousness can illuminate ordinary fear and relationship while underdescribing political institutions, colonial history, class, caste, race, and gender.',
      'Accounts of the painful “process” and experiences of the sacred are biographical testimony. They should not be presented as medical diagnoses, supernatural proof, or necessary grounds for the philosophical claims.',
      'Many books are editorial constructions from talks and conversations, so publication dates, speakers, transcription, and selection history matter.'
    ],
    commonMisunderstandings:[
      'He did not found a new inherited school, and comparisons with Yoga, Vedānta, or Buddhism do not establish membership in those traditions.',
      'His criticism of thought concerns its psychological overreach, not the abandonment of reasoning, language, memory, or technical knowledge.',
      'Choiceless awareness is not indifference, passivity, or a branded meditation sequence.',
      'The claim that observer and observed are not psychologically separate is not a denial that people and material objects are distinct.',
      'Rejecting organized spiritual authority is not the same as rejecting cooperative schools, archives, travel, publishing, or every practical institution.'
    ],
    schoolMemberships:['Theosophical formation (historical; later rejected as spiritual allegiance)','Independent international inquiry','Krishnamurti schools and foundations (educational and archival, not a philosophical school)'],
    branchContributions:[
      {branchId:'philosophy-of-mind',summary:'Offers a comparative analysis of conditioning, attention, fear, psychological time, self-image, and the observer–observed division without claiming membership in an academic mind school.'},
      {branchId:'philosophy-of-religion',summary:'Critiques guru authority, organized spiritual allegiance, ritual dependence, and fixed paths while continuing to ask about meditation and the sacred.'},
      {branchId:'indian-philosophy',summary:'Supplies a biographical and cross-cultural secondary route to South Asian intellectual worlds, explicitly not inherited-school membership.'}
    ],
    beginnerReadingPath:[
      reading('Jiddu Krishnamurti','Freedom from the Known','beginner','Begin with a concise edited route into conditioning, fear, thought, attention, and freedom.'),
      {...reading('Jiddu Krishnamurti','Dissolution Speech, 3 August 1929','beginner','Read the primary historical statement rejecting the Order, followers, and fixed spiritual paths.','lecture'),sourceUrl:'https://kfoundation.org/dissolution-speech/'},
      reading('Jiddu Krishnamurti','The First and Last Freedom','intermediate','Broaden the inquiry through talks on belief, self-knowledge, relationship, fear, and transformation.')
    ],
    advancedReadingPath:[
      reading('Jiddu Krishnamurti','Education and the Significance of Life','intermediate','Connect inward inquiry to schools, competition, vocation, intelligence, and whole-person education.'),
      reading('Jiddu Krishnamurti and David Bohm','The Ending of Time','advanced','Follow a sustained dialogue on fragmentation, insight, thought, time, and radical change.','dialogue'),
      reading('Jiddu Krishnamurti','Krishnamurti’s Notebook','advanced','Read the first-person record of landscape, pain, silence, and the sacred with careful genre and evidential distinctions.')
    ],
    sourceLinks:[
      {label:'Krishnamurti Foundation Trust: Dissolution Speech (3 August 1929)',url:'https://kfoundation.org/dissolution-speech/',type:'primary-text',notes:'Primary address preserved by the foundation; quoted sparingly and read in its institutional setting.'},
      {label:'Krishnamurti Foundation India: Core of the Teachings',url:'https://web.jkrishnamurti.in/teachings/',type:'primary-text',notes:'Includes Krishnamurti’s 1980 summary and the foundation’s teaching archive.'},
      {label:'Krishnamurti Foundation Trust: Biography and archive overview',url:'https://kfoundation.org/krishnamurti-biography/',type:'other',notes:'Institutional biography written by foundation staff; useful for archive scale and chronology but not an independent source.'},
      {label:'Krishnamurti Foundation India: About Krishnamurti',url:'https://www.jkrishnamurti.in/about-krishnamurti',type:'other',notes:'Foundation account for dates, career, education, and declared non-affiliation.'},
      {label:'Christine V. Williams: Jiddu Krishnamurti, World Philosopher (bibliographic record)',url:'https://books.google.com/books/about/Jiddu_Krishnamurti_World_Philosopher_189.html?id=d2ag0QEACAAJ',type:'other',notes:'Independent historical study used to temper exact-date and biographical claims.'},
      {label:'Roland Vernon: Star in the East (publisher record)',url:'https://www.simonandschuster.com/books/Star-in-the-East/Roland-Vernon/9780971078680',type:'other',notes:'Critical biography of the World Teacher project and its paradoxes.'},
      {label:'Treccani: Jiddu Krishnamurti',url:'https://www.treccani.it/enciclopedia/jiddu-krishnamurti/',type:'other',notes:'Independent encyclopedia overview.'},
      {label:'Wikimedia Commons: Jiddu Krishnamurti, 1920s',url:'https://commons.wikimedia.org/wiki/File:Jiddu_Krishnamurti_01.jpg',type:'Wikimedia',notes:'Bain News Service / Library of Congress lifetime photograph with no known restrictions.'}
    ],
    image:{url:'assets/museum/core-questions-forum/jiddu-krishnamurti-bain-portrait-panel.webp',alt:'Black-and-white 1920s studio portrait of a young Jiddu Krishnamurti in a dark suit, facing the camera.',sourceUrl:'https://commons.wikimedia.org/wiki/File:Jiddu_Krishnamurti_01.jpg',credit:'Unknown photographer, Bain News Service / Library of Congress Prints and Photographs Division.',license:'No known copyright restrictions / public domain',licenseUrl:'https://www.loc.gov/pictures/collection/ggbain/'},
    relatedImages:[
      {url:'assets/museum/core-questions-forum/jiddu-krishnamurti-besant-1927-panel.webp',alt:'Annie Besant and Jiddu Krishnamurti together in a March 1927 press photograph.',sourceUrl:'https://commons.wikimedia.org/wiki/File:Annie_Bessant_et_Krishnamurti_(Pacific)_-_btv1b53177929b.jpg',credit:'Agence Rol / Bibliothèque nationale de France, département Estampes et photographie.',license:'Public domain in France and the United States',licenseUrl:'https://commons.wikimedia.org/wiki/File:Annie_Bessant_et_Krishnamurti_(Pacific)_-_btv1b53177929b.jpg',notes:'Documents public Theosophical formation; it does not establish later allegiance or philosophical agreement.'}
    ]
  }
};
