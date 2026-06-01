import { readingTimeLabel, slugify } from '@/lib/resource-details/helpers';
import type { ResourceDetailEntry } from '@/lib/resource-details/types';

interface EducatorSeed {
  title: string;
  audience: string;
  problem: string;
  approach: string;
  payoff: string;
  relatedLinks: { label: string; href: string }[];
}

const EDUCATOR_SEEDS: EducatorSeed[] = [
  { title: 'World Religions Unit Starter Pack', audience: 'teachers planning an introductory religions unit', problem: 'new instructors often need a neutral frame that avoids both devotional teaching and dismissive oversimplification', approach: 'build the unit around vocabulary, comparison method, historical framing, and respectful use of sources', payoff: 'students gain a conceptual map before moving into individual traditions', relatedLinks: [{ label: 'Compare hub', href: '/compare' }, { label: 'Glossary', href: '/glossary' }] },
  { title: 'Discussion Norms for Sensitive Topics', audience: 'teachers, librarians, and facilitators', problem: 'religion discussions can become personal, defensive, or careless when norms are not established early', approach: 'set expectations for curiosity, precision, non-ranking language, and respect for lived identity before discussing contested issues', payoff: 'students can disagree analytically without turning the classroom into a debate stage', relatedLinks: [{ label: 'Editorial policy', href: '/about/editorial-policy' }, { label: 'FAQs', href: '/faqs' }] },
  { title: 'Primary vs Secondary Sources in Religion Study', audience: 'students learning research habits', problem: 'many learners cannot yet distinguish scripture, commentary, scholarship, journalism, and apologetic writing', approach: 'teach source classification explicitly and model how different source types answer different questions', payoff: 'research becomes more accurate and less vulnerable to cherry-picking', relatedLinks: [{ label: 'How We Source', href: '/about/how-we-source' }, { label: 'Sacred texts', href: '/sacred-texts' }] },
  { title: 'Beginner Pathways by Tradition', audience: 'teachers building reading sequences', problem: 'students are often handed isolated facts without a sequence that moves from basics to depth', approach: 'start with overview, then texts, then key terms, then comparison', payoff: 'students build context instead of memorizing disconnected trivia', relatedLinks: [{ label: 'Beginner guides', href: '/beginner-guides' }, { label: 'Recommended reading', href: '/recommended-reading' }] },
  { title: 'Glossary Terms Worth Teaching Early', audience: 'middle-school, high-school, and introductory college instructors', problem: 'students regularly confuse terms that sound similar across traditions but carry different meanings', approach: 'front-load a glossary of the most reusable terms before dense content reading', payoff: 'later comparisons become more precise and less stereotype-driven', relatedLinks: [{ label: 'Glossary', href: '/glossary' }, { label: 'Religions hub', href: '/religions' }] },
  { title: 'Field Visit Preparation Guides', audience: 'educators organizing visits to sacred spaces', problem: 'students often arrive at sites without enough cultural or ritual orientation', approach: 'prepare them with etiquette, vocabulary, dress expectations, and post-visit reflection questions', payoff: 'site visits become educational rather than awkward or extractive', relatedLinks: [{ label: 'Etiquette guides', href: '/etiquette-guides' }, { label: 'Sacred places', href: '/sacred-places' }] },
  { title: 'How to Teach Comparison Without Ranking Religions', audience: 'comparative religion instructors', problem: 'students easily slide from comparison into winner-loser thinking', approach: 'frame comparison around themes, categories, and interpretive questions instead of value judgments', payoff: 'comparison becomes analytical, not adversarial', relatedLinks: [{ label: 'Compare hub', href: '/compare' }, { label: 'FAQs', href: '/faqs' }] },
  { title: 'Source Credibility Checklist for Religion Research', audience: 'students writing essays or presentations', problem: 'internet research often mixes reputable scholarship with low-context or agenda-driven sources', approach: 'use a checklist that examines authorship, institution, citations, purpose, genre, and date', payoff: 'students make better choices before weak sources shape their conclusions', relatedLinks: [{ label: 'How We Source', href: '/about/how-we-source' }, { label: 'Recommended reading', href: '/recommended-reading' }] },
  { title: 'Assessment Ideas for Religion Units', audience: 'teachers designing projects and evaluations', problem: 'assessment can reward memorization instead of actual understanding', approach: 'use comparisons, source-analysis tasks, term explanations, and reflection prompts rather than fact dumps alone', payoff: 'students demonstrate understanding of categories, nuance, and interpretation', relatedLinks: [{ label: 'Glossary', href: '/glossary' }, { label: 'Compare hub', href: '/compare' }] },
  { title: 'Common Pitfalls in Classroom Religion Coverage', audience: 'anyone teaching religion for the first time', problem: 'well-meaning instruction can unintentionally flatten traditions, overfocus on controversy, or center one religion as the norm', approach: 'identify predictable pitfalls before the unit begins and plan content that restores context and balance', payoff: 'classroom coverage becomes more respectful, accurate, and pedagogically durable', relatedLinks: [{ label: 'Editorial policy', href: '/about/editorial-policy' }, { label: 'Beginner guides', href: '/beginner-guides' }] },
];

export const EDUCATOR_RESOURCE_DETAILS: ResourceDetailEntry[] = EDUCATOR_SEEDS.map((seed) => {
  const sections = [
    {
      heading: 'Who this resource is for',
      body: [
        `This resource is designed for ${seed.audience}. In classroom religion coverage, audience matters because the same material can land very differently with younger students, advanced readers, mixed-faith groups, or adult learners returning to the subject after many years [1][2].`,
        `${seed.problem} A practical educator resource must therefore solve a real teaching problem rather than simply repeat content students could already find on a profile page.`
      ]
    },
    {
      heading: 'A workable teaching approach',
      body: [
        `${seed.approach} This usually works best when teachers are explicit about what students are learning to do: define terms, read sources carefully, compare categories, distinguish branches, or trace how practice connects to belief [1][2].`,
        `In religion teaching, method is often as important as content. Students learn not only facts about traditions but also how to handle contested language, different kinds of authority, and communities they may not know from direct experience [2][3].`
      ]
    },
    {
      heading: 'Why it improves learning outcomes',
      body: [
        `${seed.payoff} Better pedagogy around religion almost always means more context, more source literacy, and fewer assumptions that one model fits every tradition [1][2].`,
        `A resource like this also supports SEO-oriented public education because it turns vague teacher searches into structured next steps. Instead of “how do I teach religion respectfully,” the reader leaves with a framework that can guide actual lesson design.`
      ]
    }
  ];

  return {
    slug: slugify(seed.title),
    title: seed.title,
    description: `A classroom-ready educator resource on ${seed.title.toLowerCase()}.`,
    summary: `${seed.problem}; this guide suggests how educators can respond with a clearer instructional framework [1][2].`,
    categoryLabel: 'Educator Resource',
    wordCountLabel: readingTimeLabel(sections.flatMap((section) => section.body)),
    sections,
    relatedLinks: [...seed.relatedLinks, { label: 'Educator resources hub', href: '/educator-resources' }, { label: 'Religions hub', href: '/religions' }],
    sources: [
      { label: 'Pew Research Center religion reports and classroom-facing summaries.', url: 'https://www.pewresearch.org/religion/' },
      { label: 'Encyclopaedia Britannica entries on religion and world traditions.', url: 'https://www.britannica.com/topic/religion' },
      { label: 'ReligionCompare sourcing and editorial methodology.', url: 'https://www.religioncompare.com/about/how-we-source' },
    ],
    faq: [
      { question: 'Can this be adapted for short units?', answer: 'Yes. The framework can be scaled down by prioritizing terminology, one or two traditions, and one strong comparison task.' },
      { question: 'Does this require students to agree with a religion?', answer: 'No. The goal is understanding, not devotion, and the resource is designed for neutral, educational use.' },
    ],
  } satisfies ResourceDetailEntry;
}).sort((a, b) => a.title.localeCompare(b.title));
