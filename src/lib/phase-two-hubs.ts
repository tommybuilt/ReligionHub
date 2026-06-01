export interface PhaseTwoHubItem {
  title: string;
  description: string;
  meta: string;
  href?: string;
}

export const GLOSSARY_HUB_ITEMS: PhaseTwoHubItem[] = [
  {
    title: 'Karma',
    description: 'How moral causation is understood across Hindu, Buddhist, Jain, and Sikh traditions, and why it is more than “what goes around comes around.”',
    meta: 'Shared term',
    href: '/compare/hinduism-vs-buddhism',
  },
  {
    title: 'Dharma',
    description: 'A key comparative term that can mean duty, law, truth, or teaching depending on the tradition and textual setting.',
    meta: 'Practice & ethics',
    href: '/religions/hinduism',
  },
  {
    title: 'Nirvana',
    description: 'A Buddhist liberation concept often misunderstood as generic bliss rather than freedom from craving and suffering.',
    meta: 'Buddhism',
    href: '/religions/buddhism',
  },
  {
    title: 'Halal',
    description: 'An introduction to what counts as permitted in Islamic law, with attention to diet, practice, and everyday ethics.',
    meta: 'Islam',
    href: '/religions/islam',
  },
  {
    title: 'Kosher',
    description: 'A clear guide to Jewish dietary law, communal identity, and why observance differs across Jewish communities.',
    meta: 'Judaism',
    href: '/religions/judaism',
  },
  {
    title: 'Reincarnation',
    description: 'A comparison-friendly overview of rebirth language across traditions that do not all mean the same thing by it.',
    meta: 'Afterlife & rebirth',
    href: '/compare/hinduism-vs-buddhism-vs-jainism',
  },
];

export const BEGINNER_GUIDE_HUB_ITEMS: PhaseTwoHubItem[] = [
  {
    title: 'Christianity for Beginners',
    description: 'Start with Jesus, the Bible, worship, and the major branches of Christian life without flattening Catholic, Orthodox, and Protestant differences.',
    meta: 'Beginner path',
    href: '/recommended-reading/christianity',
  },
  {
    title: 'Islam for Beginners',
    description: 'A practical introduction to the Quran, Muhammad, the Five Pillars, and the diversity of Muslim life around the world.',
    meta: 'Beginner path',
    href: '/recommended-reading/islam',
  },
  {
    title: 'Hinduism for Beginners',
    description: 'A guide to learning Hinduism as a family of traditions rather than a single founder-centered creed.',
    meta: 'Beginner path',
    href: '/recommended-reading/hinduism',
  },
  {
    title: 'Buddhism for Beginners',
    description: 'An introduction to suffering, the Eightfold Path, meditation, and the major Buddhist schools.',
    meta: 'Beginner path',
    href: '/recommended-reading/buddhism',
  },
  {
    title: 'Judaism for Beginners',
    description: 'Learn Judaism through peoplehood, covenant, Torah, Sabbath, and denominational diversity.',
    meta: 'Beginner path',
    href: '/recommended-reading/judaism',
  },
  {
    title: 'Sikhism for Beginners',
    description: 'Start with the Gurus, the Guru Granth Sahib, the gurdwara, langar, and Sikh teachings on equality and service.',
    meta: 'Beginner path',
    href: '/recommended-reading/sikhism',
  },
];

export const ETIQUETTE_HUB_ITEMS: PhaseTwoHubItem[] = [
  {
    title: 'Visiting a Church Respectfully',
    description: 'What to wear, when to observe quietly, and why communion etiquette differs across Christian traditions.',
    meta: 'Visitor etiquette',
    href: '/religions/christianity',
  },
  {
    title: 'Visiting a Mosque Respectfully',
    description: 'Dress, shoes, prayer-space etiquette, and how to behave during congregational prayer and sermons.',
    meta: 'Visitor etiquette',
    href: '/religions/islam',
  },
  {
    title: 'Visiting a Synagogue Respectfully',
    description: 'How to plan ahead, expect security, and navigate Sabbath and worship customs as a guest.',
    meta: 'Visitor etiquette',
    href: '/religions/judaism',
  },
  {
    title: 'Visiting a Hindu Temple Respectfully',
    description: 'A practical guide to shoes, darshan, offerings, and the diversity of temple customs.',
    meta: 'Visitor etiquette',
    href: '/religions/hinduism',
  },
  {
    title: 'Visiting a Buddhist Temple Respectfully',
    description: 'A primer on shrine etiquette, silence, posture, and how Buddhist settings vary across traditions.',
    meta: 'Visitor etiquette',
    href: '/religions/buddhism',
  },
  {
    title: 'Visiting a Gurdwara Respectfully',
    description: 'Head coverings, shoes, langar, and how to move respectfully through Sikh sacred space.',
    meta: 'Visitor etiquette',
    href: '/religions/sikhism',
  },
];

export const SACRED_TEXT_HUB_ITEMS: PhaseTwoHubItem[] = [
  {
    title: 'The Bible',
    description: 'A guide to how Christians use the Bible, why canons differ, and where beginners often start reading.',
    meta: 'Christianity',
    href: '/recommended-reading/christianity',
  },
  {
    title: 'The Quran',
    description: 'An introduction to revelation, recitation, translation, and why context matters for new readers.',
    meta: 'Islam',
    href: '/recommended-reading/islam',
  },
  {
    title: 'The Bhagavad Gita',
    description: 'A beginner-friendly entry point into one of Hinduism’s most widely read scriptures.',
    meta: 'Hinduism',
    href: '/recommended-reading/hinduism',
  },
  {
    title: 'The Tripitaka (Pali Canon)',
    description: 'How the earliest surviving large Buddhist canon is organized and why most beginners start with selections.',
    meta: 'Buddhism',
    href: '/recommended-reading/buddhism',
  },
  {
    title: 'The Torah',
    description: 'Why Torah means more than just a text and how Jewish reading traditions shape its interpretation.',
    meta: 'Judaism',
    href: '/recommended-reading/judaism',
  },
  {
    title: 'The Guru Granth Sahib',
    description: 'An overview of the Sikh scripture as the eternal Guru and the center of communal worship.',
    meta: 'Sikhism',
    href: '/recommended-reading/sikhism',
  },
  {
    title: 'The Tao Te Ching',
    description: 'A short guide to one of Taoism’s foundational texts and the challenges of reading it well in translation.',
    meta: 'Taoism',
    href: '/recommended-reading/taoism',
  },
  {
    title: 'The Avesta',
    description: 'A high-level introduction to the surviving Zoroastrian scriptures and their ritual significance.',
    meta: 'Zoroastrianism',
    href: '/recommended-reading/zoroastrianism',
  },
];

export const FAQ_HUB_ITEMS: PhaseTwoHubItem[] = [
  {
    title: 'Do All Religions Believe in God?',
    description: 'Why monotheism, polytheism, nontheism, and other frameworks make this simple question harder than it first appears.',
    meta: 'Common question',
    href: '/compare/christianity-vs-buddhism',
  },
  {
    title: 'Can You Convert to a Religion?',
    description: 'A quick guide to why conversion is welcomed in some traditions, regulated in others, and not always the whole identity question.',
    meta: 'Common question',
    href: '/religions/judaism',
  },
  {
    title: 'What Is the Difference Between a Religion and a Denomination?',
    description: 'A primer on why Catholicism and Protestantism sit differently from Christianity itself in comparative study.',
    meta: 'Common question',
    href: '/compare/catholicism-vs-protestantism',
  },
  {
    title: 'Why Do Religions Have Dietary Rules?',
    description: 'How food laws can express holiness, discipline, memory, identity, and community boundaries.',
    meta: 'Common question',
    href: '/compare/islam-vs-judaism',
  },
  {
    title: 'How Should I Compare Religions Respectfully?',
    description: 'Ground rules for comparison that avoid stereotypes, rankings, and flattening living traditions into slogans.',
    meta: 'Method',
    href: '/compare',
  },
  {
    title: 'Are Sacred Texts Meant to Be Read Literally?',
    description: 'A comparative answer that highlights why interpretation varies across traditions, communities, and genres.',
    meta: 'Interpretation',
    href: '/sacred-texts',
  },
];

export const EDUCATOR_RESOURCE_HUB_ITEMS: PhaseTwoHubItem[] = [
  {
    title: 'World Religions Unit Starter Pack',
    description: 'A teacher-friendly overview of how to frame a religions unit around vocabulary, comparison, and source evaluation.',
    meta: 'Classroom planning',
    href: '/compare',
  },
  {
    title: 'Discussion Norms for Sensitive Topics',
    description: 'Suggested classroom expectations for handling belief, disagreement, and lived identity with care.',
    meta: 'Classroom culture',
    href: '/about/editorial-policy',
  },
  {
    title: 'Primary vs Secondary Sources in Religion Study',
    description: 'How to help students distinguish scripture, official doctrine, commentary, journalism, and scholarship.',
    meta: 'Source literacy',
    href: '/about/how-we-source',
  },
  {
    title: 'Beginner Pathways by Tradition',
    description: 'Recommended reading sequences that move from overview to key terms, texts, and comparisons.',
    meta: 'Curriculum support',
    href: '/recommended-reading',
  },
  {
    title: 'Glossary Terms Worth Teaching Early',
    description: 'A curated list of terms that prevent confusion later when students begin comparing traditions.',
    meta: 'Vocabulary support',
    href: '/glossary',
  },
  {
    title: 'Field Visit Preparation Guides',
    description: 'How to prepare students before visiting churches, mosques, temples, synagogues, and gurdwaras.',
    meta: 'Experiential learning',
    href: '/etiquette-guides',
  },
];

export const PHASE_TWO_SOURCE_NOTES = [
  'Encyclopaedia Britannica religion entries and topic guides for baseline definitions and historical framing.',
  'Oxford Reference entries for cross-tradition vocabulary, doctrinal terms, and interpretive distinctions.',
  'Pew Research Center religion reports for comparative demographic context and classroom-friendly summaries.',
  'Major academic introductions and study editions already cited elsewhere on ReligionCompare reading lists.',
];
