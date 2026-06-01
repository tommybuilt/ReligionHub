export interface InfographicMeta {
  slug: string;
  title: string;
  description: string;
  source: string;
  sourceUrl?: string;
}

export const INFOGRAPHICS: InfographicMeta[] = [
  {
    slug: 'world-religions-by-population',
    title: 'World Religions by Population',
    description: 'A visual breakdown of the world\'s major religions by estimated number of adherents (2024 estimates).',
    source: 'Pew Research Center, "Global Religious Landscape," updated 2024.',
    sourceUrl: 'https://www.pewresearch.org/religion/2012/12/18/global-religious-landscape-exec/',
  },
  {
    slug: 'religions-founded-timeline',
    title: 'When Were the World\'s Religions Founded?',
    description: 'A visual timeline showing the approximate founding dates of major world religions.',
    source: 'Encyclopaedia Britannica, various religion entries; academic consensus dates.',
  },
  {
    slug: 'holy-books-comparison',
    title: 'Sacred Texts of World Religions',
    description: 'Key facts about the sacred scriptures of the world\'s major religions, language, length, and age.',
    source: 'Encyclopaedia Britannica; Oxford Reference; academic consensus.',
  },
  {
    slug: 'five-pillars-of-islam',
    title: 'The Five Pillars of Islam',
    description: 'A visual guide to the five foundational practices that every Muslim is expected to observe.',
    source: 'Encyclopaedia Britannica, "Five Pillars of Islam."',
    sourceUrl: 'https://www.britannica.com/topic/Five-Pillars-of-Islam',
  },
  {
    slug: 'branches-of-christianity',
    title: 'Major Branches of Christianity',
    description: 'A visual overview of Christianity\'s three main branches, Catholic, Protestant, and Orthodox, with estimated populations.',
    source: 'Pew Research Center, "Global Christianity," December 2011.',
    sourceUrl: 'https://www.pewresearch.org/religion/2011/12/19/global-christianity-exec/',
  },
  {
    slug: 'afterlife-beliefs-compared',
    title: 'Afterlife Beliefs Across Religions',
    description: 'How the world\'s major religions understand what happens after death, from heaven and hell to reincarnation and nirvana.',
    source: 'Encyclopaedia Britannica; academic consensus from comparative religion scholarship.',
  },
];
