import type {Philosopher,ReadingEntry,SourceLink} from '../types/philosophy';

const reading=(author:string,title:string,difficulty:ReadingEntry['difficulty'],whyRead:string,type:ReadingEntry['type']='primary'):ReadingEntry=>({author,title,difficulty,whyRead,type});
const source=(label:string,url:string,type:SourceLink['type'],notes?:string):SourceLink=>({label,url,type,notes});

export function applyBuddhaFlagshipDetails(philosopher:Philosopher):Philosopher{
  if(philosopher.id!=='buddha') return philosopher;
  return{
    ...philosopher,
    contributionSummary:'The foundational teacher represented in early Buddhist textual traditions, offering a path that connects ethical conduct, cultivated attention, and understanding to the cessation of suffering.',
    beginnerExplanation:'The Buddha asks why vulnerable, changing lives become bound up with suffering. His answer is practical and philosophical: suffering has conditions, especially ignorance, craving, and clinging; those conditions can cease; and a coordinated path of conduct, meditation, and wisdom can transform them. Because the surviving texts were transmitted for generations, this profile distinguishes cautious historical reconstruction from later Buddhist development.',
    shortBio:'A historically difficult north Indian teacher, probably active around the fifth century BCE, whose remembered discourses organize liberation around the four truths, dependent arising, ethical discipline, meditation, and the critique of a permanent self.',
    historicalContext:'A changing north Indian world of kingdoms, clans, towns, trade, sacrificial and household traditions, and competing renunciant movements debating action, rebirth, knowledge, discipline, and liberation. Exact chronology remains disputed, and surviving sources were preserved through long communal transmission.',
    centralQuestions:['Why do conditioned lives become vulnerable to dukkha, and how can its causes cease?','How can continuity, action, and responsibility be explained without a permanent self?','How do ethical conduct, attention, concentration, and understanding support one another?','What can reasoning, testimony, and cultivated experience contribute to liberation?'],
    majorIdeasDetailed:[
      {name:'Four truths as tasks',explanation:'Dukkha is to be comprehended, its origin abandoned, cessation realized, and the path developed.',whyItMatters:'The framework joins diagnosis, causal explanation, possibility, and practice instead of presenting a pessimistic creed.'},
      {name:'Dependent arising',explanation:'Patterns arise and cease through specific conditions rather than through an independent essence.',whyItMatters:'It makes suffering intelligible and intervention possible without appealing to a permanent controller.'},
      {name:'Not-self',explanation:'Bodily and mental aggregates are examined as impermanent, vulnerable, and not an independently governing self.',whyItMatters:'The analysis loosens appropriation while leaving room for conventional persons and causal responsibility.'},
      {name:'The eightfold path',explanation:'View, intention, speech, action, livelihood, effort, mindfulness, and concentration form an integrated training.',whyItMatters:'Liberation involves intellectual, ethical, social, and contemplative transformation rather than one technique.'}
    ],
    controversiesOrInterpretiveTensions:['The Buddha’s exact dates and the historical sequence of his life remain disputed.','Early texts preserve layered oral and communal transmission rather than verbatim modern transcripts.','Scholars debate whether not-self is a comprehensive metaphysical denial or chiefly a therapeutic strategy.','Nirvāṇa receives competing negative, positive, ontological, and practical interpretations.','Modern secular and scientific portraits can illuminate selected features while omitting rebirth, cosmology, devotion, and institutions.'],
    commonMisunderstandings:['The four truths do not say that every moment is miserable; they diagnose the vulnerability of conditioned life and prescribe tasks.','Buddhism does not condemn every desire; craving is distinguished from skillful aspiration.','Not-self does not mean that people, pain, agency, or responsibility simply vanish.','Mindfulness is one capacity within an ethical and intellectual path, not the whole teaching.','Later doctrines such as mature Madhyamaka emptiness or Yogācāra store consciousness should not automatically be attributed to the historical Buddha.'],
    beginnerReadingPath:[
      reading('Early Buddhist traditions','Dhammacakkappavattana Sutta (SN 56.11)','beginner','Introduces the Middle Way, four truths, their tasks, and the path.'),
      reading('Early Buddhist traditions','Anattalakkhaṇa Sutta (SN 22.59)','beginner','Shows the aggregate-based argument for not-self.'),
      reading('Peter Harvey','An Introduction to Buddhism','beginner','Provides historical breadth before later schools are projected backward.','secondary')
    ],
    advancedReadingPath:[
      reading('Early Buddhist traditions','Ariyapariyesanā Sutta (MN 26)','intermediate','Offers an early-layer narrative of the noble search and teaching career.'),
      reading('Early Buddhist traditions','Mahāparinibbāna Sutta (DN 16)','advanced','Examines final-days traditions, authority, community, death, and relic memory.'),
      reading('Mark Siderits','Buddhism as Philosophy','intermediate','Develops a philosophically rigorous interpretation with clear arguments.','secondary'),
      reading('Steven Collins','Selfless Persons','advanced','Studies personhood and no-self across early and Theravāda materials.','secondary')
    ],
    sourceLinks:[
      source('Dhammacakkappavattana Sutta (SN 56.11), translated by Thanissaro Bhikkhu','https://www.accesstoinsight.org/tipitaka/sn/sn56/sn56.011.than.html','primary-text'),
      source('Anattalakkhaṇa Sutta (SN 22.59), translated by Ñāṇamoli Thera','https://www.accesstoinsight.org/ati/tipitaka/sn/sn22/sn22.059.nymo.html','primary-text'),
      source('Ariyapariyesanā Sutta (MN 26), translated by Thanissaro Bhikkhu','https://www.accesstoinsight.org/tipitaka/mn/mn.026.than.html','primary-text'),
      source('Cūḷamāluṅkyovāda Sutta (MN 63), translated by Thanissaro Bhikkhu','https://www.accesstoinsight.org/tipitaka/mn/mn.063.than.html','primary-text'),
      source('Mahāparinibbāna Sutta (DN 16), translated by Sister Vajirā and Francis Story','https://www.accesstoinsight.org/tipitaka/dn/dn.16.1-6.vaji.html','primary-text'),
      source('SuttaCentral — early Buddhist discourses and parallels','https://suttacentral.net/','primary-text','Use parallel collections and translation metadata when comparing textual layers.'),
      source('Stanford Encyclopedia of Philosophy — Buddha','https://plato.stanford.edu/entries/buddha/','SEP'),
      source('Internet Encyclopedia of Philosophy — Buddha','https://iep.utm.edu/buddha/','IEP'),
      source('Peter Harvey — An Introduction to Buddhism, Cambridge University Press','https://www.cambridge.org/highereducation/books/an-introduction-to-buddhism/9CA7B749D45ABAAB372422AEEE863A97','other'),
      source('Philip C. Almond — The Buddha, Cambridge University Press','https://www.cambridge.org/core/books/buddha/85B547C2F3D0FC43D37F61A4C53918C7','other')
    ]
  };
}
