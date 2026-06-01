import { ALL_ARTICLES } from '@/app/articles/content';
import { HOLIDAYS_2026 } from '@/app/holidays/data';
import { INFOGRAPHICS } from '@/app/infographics/data';
import { RELIGION_CONTENT } from '@/app/religions/[slug]/content';
import { RECOMMENDED_READING } from '@/app/religions/[slug]/recommended-reading';
import { TRENDING_TOPICS } from '@/app/trending/data';
import { EDUCATOR_RESOURCE_DETAILS } from '@/lib/resource-details/educator-resources';
import { FAQ_DETAILS } from '@/lib/resource-details/faqs';
import { GLOSSARY_DETAILS } from '@/lib/resource-details/glossary';
import { BEGINNER_GUIDE_DETAILS } from '@/lib/resource-details/beginner-guides';
import { SACRED_TEXT_DETAILS } from '@/lib/resource-details/sacred-texts';
import { ETIQUETTE_GUIDE_DETAILS } from '@/lib/resource-details/etiquette-guides';

export type SearchItemType =
  | 'religion'
  | 'comparison'
  | 'quiz'
  | 'article'
  | 'legal'
  | 'about'
  | 'infographic'
  | 'holiday'
  | 'sacred-place'
  | 'trending'
  | 'reading-list'
  | 'glossary'
  | 'guide'
  | 'sacred-text'
  | 'faq'
  | 'educator';

export interface SearchIndexItem {
  label: string;
  href: string;
  type: SearchItemType;
  keywords: string[];
  summary: string;
  searchText: string;
}

export const SEARCH_TYPE_LABELS: Record<SearchItemType, string> = {
  religion: 'Religion',
  comparison: 'Comparison',
  quiz: 'Quiz',
  article: 'Article',
  legal: 'Legal',
  about: 'About',
  infographic: 'Infographic',
  holiday: 'Holiday',
  'sacred-place': 'Sacred Place',
  trending: 'Trending',
  'reading-list': 'Reading List',
  glossary: 'Glossary',
  guide: 'Guide',
  'sacred-text': 'Sacred Text',
  faq: 'FAQ',
  educator: 'Educator',
};

const QUIZ_PAGES: SearchIndexItem[] = [
  {
    label: 'Quizzes',
    href: '/quiz',
    type: 'quiz',
    keywords: ['quiz hub', 'world religions quiz', 'knowledge quiz', 'alignment quiz'],
    summary: 'Eight citation-backed quizzes covering knowledge, alignment, traditions, symbols, sacred places, history, demographics, and ethics.',
    searchText: 'Quizzes Eight citation-backed quizzes covering knowledge alignment traditions symbols sacred places history demographics ethics world religions questions answers learning',
  },
  {
    label: 'What Religion Am I?',
    href: '/quiz/what-religion-am-i',
    type: 'quiz',
    keywords: ['personality quiz', 'belief quiz', 'which religion', 'worldview'],
    summary: '25-question personality quiz to discover which world religions resonate most with your values.',
    searchText: 'What Religion Am I 25 question personality quiz beliefs values worldview world religions educational not prescriptive',
  },
  {
    label: 'World Religions Knowledge Quiz',
    href: '/quiz/knowledge',
    type: 'quiz',
    keywords: ['knowledge', 'facts', 'test your knowledge', 'religion trivia'],
    summary: 'Test your knowledge with questions about beliefs, practices, history, and sacred texts.',
    searchText: 'World Religions Knowledge Quiz beliefs practices history sacred texts facts questions trivia',
  },
  {
    label: 'Belief Alignment Explorer',
    href: '/quiz/alignment',
    type: 'quiz',
    keywords: ['alignment', 'values', 'worldview', 'belief alignment'],
    summary: 'Answer questions about ethics, spirituality, and worldview to see which traditions align with your beliefs.',
    searchText: 'Belief Alignment Explorer ethics spirituality worldview traditions values beliefs',
  },
  {
    label: 'Traditions & Practices Quiz',
    href: '/quiz/traditions',
    type: 'quiz',
    keywords: ['traditions', 'practices', 'rituals', 'festivals'],
    summary: 'How well do you know religious festivals, rituals, and daily practices from around the world?',
    searchText: 'Traditions Practices Quiz religious festivals rituals daily practices world religions',
  },
  {
    label: 'Religious Symbols & Icons Quiz',
    href: '/quiz/symbols',
    type: 'quiz',
    keywords: ['symbols', 'icons', 'cross', 'crescent', 'wheel'],
    summary: 'Can you match sacred symbols to their traditions? Test your knowledge of crosses, crescents, wheels, and more.',
    searchText: 'Religious Symbols Icons Quiz sacred symbols icons crosses crescents wheels traditions',
  },
  {
    label: 'Sacred Places Quiz',
    href: '/quiz/sacred-places',
    type: 'quiz',
    keywords: ['sacred places', 'pilgrimage', 'temples', 'holy sites'],
    summary: 'How well do you know the world\'s most important sacred sites, temples, and pilgrimage destinations?',
    searchText: 'Sacred Places Quiz sacred sites temples pilgrimage holy places destinations shrines',
  },
  {
    label: 'History & Origins Quiz',
    href: '/quiz/history',
    type: 'quiz',
    keywords: ['history', 'origins', 'founders', 'turning points'],
    summary: 'Test your knowledge of the key events, founders, and turning points in the history of world religions.',
    searchText: 'History Origins Quiz founders key events turning points history of world religions',
  },
  {
    label: 'Religion Demographics Quiz',
    href: '/quiz/demographics',
    type: 'quiz',
    keywords: ['demographics', 'population', 'growth', 'distribution'],
    summary: 'How well do you know the numbers behind world religions, populations, growth trends, and geographic distribution?',
    searchText: 'Religion Demographics Quiz populations growth trends geographic distribution world religions',
  },
  {
    label: 'Ethics & Philosophy Quiz',
    href: '/quiz/ethics',
    type: 'quiz',
    keywords: ['ethics', 'philosophy', 'moral teachings', 'philosophical foundations'],
    summary: 'Explore the moral teachings, ethical principles, and philosophical foundations of world religions.',
    searchText: 'Ethics Philosophy Quiz moral teachings ethical principles philosophical foundations world religions',
  },
];

const COMPARISON_PAGES: SearchIndexItem[] = [
  { label: 'Compare Religions', href: '/compare', type: 'comparison', keywords: ['compare religions', 'side by side', 'beliefs', 'practices'], summary: 'Select 2-4 religions to compare side-by-side with citation-backed facts.', searchText: 'Compare Religions select 2 3 4 religions compare side by side beliefs practices history demographics texts' },
  { label: 'Christianity vs Islam', href: '/compare/christianity-vs-islam', type: 'comparison', keywords: ['christianity', 'islam', 'abrahamic'], summary: 'Side-by-side comparison of Christianity and Islam.', searchText: 'Christianity vs Islam comparison compare beliefs practices scriptures abrahamic traditions' },
  { label: 'Hinduism vs Buddhism', href: '/compare/hinduism-vs-buddhism', type: 'comparison', keywords: ['hinduism', 'buddhism', 'karma', 'rebirth'], summary: 'Shared roots and major differences between Hinduism and Buddhism.', searchText: 'Hinduism vs Buddhism comparison karma rebirth moksha nirvana beliefs practices' },
  { label: 'Christianity vs Judaism', href: '/compare/christianity-vs-judaism', type: 'comparison', keywords: ['christianity', 'judaism', 'abrahamic'], summary: 'Compare Christianity and Judaism across texts, beliefs, practices, and history.', searchText: 'Christianity vs Judaism comparison texts beliefs practices history abrahamic' },
  { label: 'Islam vs Judaism', href: '/compare/islam-vs-judaism', type: 'comparison', keywords: ['islam', 'judaism', 'abrahamic'], summary: 'Compare Islam and Judaism across law, scripture, ritual, and history.', searchText: 'Islam vs Judaism comparison law scripture ritual history abrahamic' },
  { label: 'Hinduism vs Jainism', href: '/compare/hinduism-vs-jainism', type: 'comparison', keywords: ['hinduism', 'jainism', 'karma', 'ahimsa'], summary: 'Compare Hinduism and Jainism on karma, liberation, ritual, and ethics.', searchText: 'Hinduism vs Jainism comparison karma ahimsa liberation ritual ethics' },
  { label: 'Buddhism vs Shinto', href: '/compare/buddhism-vs-shinto', type: 'comparison', keywords: ['buddhism', 'shinto', 'japan'], summary: 'Compare Buddhism and Shinto on ritual, cosmology, and sacred places.', searchText: 'Buddhism vs Shinto comparison japan ritual cosmology sacred places' },
  { label: 'Christianity vs Hinduism', href: '/compare/christianity-vs-hinduism', type: 'comparison', keywords: ['christianity', 'hinduism'], summary: 'Compare Christianity and Hinduism across worldview, salvation, ritual, and scripture.', searchText: 'Christianity vs Hinduism comparison worldview salvation ritual scripture' },
  { label: 'Islam vs Hinduism', href: '/compare/islam-vs-hinduism', type: 'comparison', keywords: ['islam', 'hinduism'], summary: 'Compare Islam and Hinduism across monotheism, ritual, scripture, and law.', searchText: 'Islam vs Hinduism comparison monotheism ritual scripture law' },
  { label: 'Catholicism vs Protestantism', href: '/compare/catholicism-vs-protestantism', type: 'comparison', keywords: ['catholicism', 'protestantism', 'christian denominations'], summary: 'Compare Catholicism and Protestantism on authority, sacraments, and worship.', searchText: 'Catholicism vs Protestantism comparison authority sacraments worship christian denominations' },
  { label: 'Catholicism vs Orthodox Christianity', href: '/compare/catholicism-vs-orthodox-christianity', type: 'comparison', keywords: ['catholicism', 'orthodox christianity'], summary: 'Compare Catholic and Orthodox Christianity on leadership, liturgy, and theology.', searchText: 'Catholicism vs Orthodox Christianity comparison leadership liturgy theology' },
  { label: 'Christianity vs Buddhism', href: '/compare/christianity-vs-buddhism', type: 'comparison', keywords: ['christianity', 'buddhism'], summary: 'Compare Christianity and Buddhism on God, salvation, ethics, and practice.', searchText: 'Christianity vs Buddhism comparison God salvation ethics practice' },
  { label: 'Islam vs Sikhism', href: '/compare/islam-vs-sikhism', type: 'comparison', keywords: ['islam', 'sikhism'], summary: 'Compare Islam and Sikhism on monotheism, scripture, practice, and community.', searchText: 'Islam vs Sikhism comparison monotheism scripture practice community' },
  { label: 'Hinduism vs Sikhism', href: '/compare/hinduism-vs-sikhism', type: 'comparison', keywords: ['hinduism', 'sikhism'], summary: 'Compare Hinduism and Sikhism on devotion, scripture, ritual, and history.', searchText: 'Hinduism vs Sikhism comparison devotion scripture ritual history' },
  { label: 'Judaism vs Christianity', href: '/compare/judaism-vs-christianity', type: 'comparison', keywords: ['judaism', 'christianity'], summary: 'Compare Judaism and Christianity on covenant, messiah, scripture, and worship.', searchText: 'Judaism vs Christianity comparison covenant messiah scripture worship' },
  { label: 'Buddhism vs Taoism', href: '/compare/buddhism-vs-taoism', type: 'comparison', keywords: ['buddhism', 'taoism'], summary: 'Compare Buddhism and Taoism on harmony, liberation, ritual, and philosophy.', searchText: 'Buddhism vs Taoism comparison harmony liberation ritual philosophy' },
  { label: 'Christianity vs Islam vs Judaism', href: '/compare/christianity-vs-islam-vs-judaism', type: 'comparison', keywords: ['christianity', 'islam', 'judaism', 'abrahamic'], summary: 'Three-way comparison of the major Abrahamic traditions.', searchText: 'Christianity vs Islam vs Judaism three way comparison abrahamic traditions beliefs practices scripture' },
  { label: 'Hinduism vs Buddhism vs Jainism', href: '/compare/hinduism-vs-buddhism-vs-jainism', type: 'comparison', keywords: ['hinduism', 'buddhism', 'jainism', 'dharmic'], summary: 'Three-way comparison of Hinduism, Buddhism, and Jainism.', searchText: 'Hinduism vs Buddhism vs Jainism three way comparison dharmic traditions karma liberation ethics' },
  { label: 'Islam vs Baha\'i Faith', href: '/compare/islam-vs-bahai-faith', type: 'comparison', keywords: ['islam', 'bahai faith'], summary: 'Compare Islam and the Baha\'i Faith on revelation, law, and community.', searchText: 'Islam vs Baha\'i Faith comparison revelation law community' },
  { label: 'Christianity vs Latter-day Saints', href: '/compare/christianity-vs-latter-day-saints', type: 'comparison', keywords: ['christianity', 'latter-day saints', 'lds'], summary: 'Compare mainstream Christianity and the Latter-day Saint tradition.', searchText: 'Christianity vs Latter day Saints comparison LDS scripture authority theology' },
  { label: 'Christianity vs Jehovah\'s Witnesses', href: '/compare/christianity-vs-jehovahs-witnesses', type: 'comparison', keywords: ['christianity', 'jehovahs witnesses'], summary: 'Compare mainstream Christianity and Jehovah\'s Witnesses.', searchText: 'Christianity vs Jehovah\'s Witnesses comparison theology scripture authority practice' },
  { label: 'Protestantism vs Orthodox Christianity', href: '/compare/protestantism-vs-orthodox-christianity', type: 'comparison', keywords: ['protestantism', 'orthodox christianity'], summary: 'Compare Protestant and Orthodox Christianity on liturgy, authority, and doctrine.', searchText: 'Protestantism vs Orthodox Christianity comparison liturgy authority doctrine' },
  { label: 'Buddhism vs Confucianism', href: '/compare/buddhism-vs-confucianism', type: 'comparison', keywords: ['buddhism', 'confucianism'], summary: 'Compare Buddhism and Confucianism on ethics, ritual, and social order.', searchText: 'Buddhism vs Confucianism comparison ethics ritual social order' },
  { label: 'Taoism vs Confucianism', href: '/compare/taoism-vs-confucianism', type: 'comparison', keywords: ['taoism', 'confucianism'], summary: 'Compare Taoism and Confucianism on harmony, duty, ritual, and governance.', searchText: 'Taoism vs Confucianism comparison harmony duty ritual governance' },
  { label: 'Shinto vs Buddhism', href: '/compare/shinto-vs-buddhism', type: 'comparison', keywords: ['shinto', 'buddhism'], summary: 'Compare Shinto and Buddhism on kami, ritual, sacred space, and cosmology.', searchText: 'Shinto vs Buddhism comparison kami ritual sacred space cosmology' },
  { label: 'Hinduism vs Islam', href: '/compare/hinduism-vs-islam', type: 'comparison', keywords: ['hinduism', 'islam'], summary: 'Compare Hinduism and Islam on ritual, scripture, monotheism, and society.', searchText: 'Hinduism vs Islam comparison ritual scripture monotheism society' },
  { label: 'Judaism vs Islam', href: '/compare/judaism-vs-islam', type: 'comparison', keywords: ['judaism', 'islam'], summary: 'Compare Judaism and Islam on law, prayer, scripture, and identity.', searchText: 'Judaism vs Islam comparison law prayer scripture identity' },
  { label: 'Sikhism vs Baha\'i Faith', href: '/compare/sikhism-vs-bahai-faith', type: 'comparison', keywords: ['sikhism', 'bahai faith'], summary: 'Compare Sikhism and the Baha\'i Faith on revelation, equality, and community.', searchText: 'Sikhism vs Baha\'i Faith comparison revelation equality community' },
  { label: 'Zoroastrianism vs Islam', href: '/compare/zoroastrianism-vs-islam', type: 'comparison', keywords: ['zoroastrianism', 'islam'], summary: 'Compare Zoroastrianism and Islam on monotheism, eschatology, and ritual purity.', searchText: 'Zoroastrianism vs Islam comparison monotheism eschatology ritual purity' },
  { label: 'Zoroastrianism vs Christianity', href: '/compare/zoroastrianism-vs-christianity', type: 'comparison', keywords: ['zoroastrianism', 'christianity'], summary: 'Compare Zoroastrianism and Christianity on dualism, salvation, and history.', searchText: 'Zoroastrianism vs Christianity comparison dualism salvation history' },
  { label: 'Jainism vs Buddhism', href: '/compare/jainism-vs-buddhism', type: 'comparison', keywords: ['jainism', 'buddhism'], summary: 'Compare Jainism and Buddhism on nonviolence, karma, liberation, and practice.', searchText: 'Jainism vs Buddhism comparison nonviolence karma liberation practice' },
  { label: 'Paganism & Wicca vs Indigenous Traditions', href: '/compare/paganism-wicca-vs-indigenous-traditions', type: 'comparison', keywords: ['paganism', 'wicca', 'indigenous traditions'], summary: 'Compare Pagan and Indigenous traditions on ritual, cosmology, and sacred land.', searchText: 'Paganism Wicca vs Indigenous Traditions comparison ritual cosmology sacred land' },
  { label: 'African Diaspora vs Indigenous Traditions', href: '/compare/african-diaspora-vs-indigenous-traditions', type: 'comparison', keywords: ['african diaspora', 'indigenous traditions'], summary: 'Compare African Diaspora religions and Indigenous traditions on ancestors, ritual, and sacred power.', searchText: 'African Diaspora vs Indigenous Traditions comparison ancestors ritual sacred power' },
  { label: 'Christianity vs Secular Humanism', href: '/compare/christianity-vs-secular-humanism', type: 'comparison', keywords: ['christianity', 'secular humanism'], summary: 'Compare Christianity and Secular Humanism on morality, meaning, and the afterlife.', searchText: 'Christianity vs Secular Humanism comparison morality meaning afterlife' },
  { label: 'Islam vs Secular Humanism', href: '/compare/islam-vs-secular-humanism', type: 'comparison', keywords: ['islam', 'secular humanism'], summary: 'Compare Islam and Secular Humanism on ethics, law, belief, and society.', searchText: 'Islam vs Secular Humanism comparison ethics law belief society' },
  { label: 'Buddhism vs Secular Humanism', href: '/compare/buddhism-vs-secular-humanism', type: 'comparison', keywords: ['buddhism', 'secular humanism'], summary: 'Compare Buddhism and Secular Humanism on suffering, ethics, and human flourishing.', searchText: 'Buddhism vs Secular Humanism comparison suffering ethics human flourishing' },
  { label: 'Rastafari vs Christianity', href: '/compare/rastafari-vs-christianity', type: 'comparison', keywords: ['rastafari', 'christianity'], summary: 'Compare Rastafari and Christianity on scripture, liberation, and identity.', searchText: 'Rastafari vs Christianity comparison scripture liberation identity' },
  { label: 'Latter-day Saints vs Jehovah\'s Witnesses', href: '/compare/latter-day-saints-vs-jehovahs-witnesses', type: 'comparison', keywords: ['latter-day saints', 'jehovahs witnesses'], summary: 'Compare the Latter-day Saint tradition and Jehovah\'s Witnesses.', searchText: 'Latter day Saints vs Jehovah\'s Witnesses comparison authority scripture organization' },
  { label: 'Taoism vs Shinto', href: '/compare/taoism-vs-shinto', type: 'comparison', keywords: ['taoism', 'shinto'], summary: 'Compare Taoism and Shinto on harmony, nature, ritual, and sacred beings.', searchText: 'Taoism vs Shinto comparison harmony nature ritual sacred beings' },
  { label: 'Hinduism vs Zoroastrianism', href: '/compare/hinduism-vs-zoroastrianism', type: 'comparison', keywords: ['hinduism', 'zoroastrianism'], summary: 'Compare Hinduism and Zoroastrianism on ritual, cosmology, and historical roots.', searchText: 'Hinduism vs Zoroastrianism comparison ritual cosmology historical roots' },
  { label: 'Sikhism vs Islam', href: '/compare/sikhism-vs-islam', type: 'comparison', keywords: ['sikhism', 'islam'], summary: 'Compare Sikhism and Islam on devotion, monotheism, scripture, and practice.', searchText: 'Sikhism vs Islam comparison devotion monotheism scripture practice' },
  { label: 'Confucianism vs Taoism vs Buddhism', href: '/compare/confucianism-vs-taoism-vs-buddhism', type: 'comparison', keywords: ['confucianism', 'taoism', 'buddhism'], summary: 'Three-way comparison of the major East Asian traditions.', searchText: 'Confucianism vs Taoism vs Buddhism three way comparison East Asian traditions ethics ritual liberation' },
  { label: 'Christianity vs Islam vs Hinduism', href: '/compare/christianity-vs-islam-vs-hinduism', type: 'comparison', keywords: ['christianity', 'islam', 'hinduism'], summary: 'Three-way comparison of Christianity, Islam, and Hinduism.', searchText: 'Christianity vs Islam vs Hinduism three way comparison beliefs practices scripture salvation' },
  { label: 'Catholicism vs Latter-day Saints', href: '/compare/catholicism-vs-latter-day-saints', type: 'comparison', keywords: ['catholicism', 'latter-day saints'], summary: 'Compare Catholicism and the Latter-day Saint tradition on authority, scripture, and sacraments.', searchText: 'Catholicism vs Latter day Saints comparison authority scripture sacraments' },
  { label: 'Protestantism vs Latter-day Saints', href: '/compare/protestantism-vs-latter-day-saints', type: 'comparison', keywords: ['protestantism', 'latter-day saints'], summary: 'Compare Protestantism and the Latter-day Saint tradition on theology and practice.', searchText: 'Protestantism vs Latter day Saints comparison theology practice scripture authority' },
  { label: 'Baha\'i Faith vs Christianity', href: '/compare/bahai-faith-vs-christianity', type: 'comparison', keywords: ['bahai faith', 'christianity'], summary: 'Compare the Baha\'i Faith and Christianity on revelation, Jesus, and global unity.', searchText: 'Baha\'i Faith vs Christianity comparison revelation Jesus global unity' },
  { label: 'African Diaspora vs Catholicism', href: '/compare/african-diaspora-vs-catholicism', type: 'comparison', keywords: ['african diaspora', 'catholicism'], summary: 'Compare African Diaspora religions and Catholicism on ritual, saints, and syncretism.', searchText: 'African Diaspora vs Catholicism comparison ritual saints syncretism' },
  { label: 'Paganism & Wicca vs Secular Humanism', href: '/compare/paganism-wicca-vs-secular-humanism', type: 'comparison', keywords: ['paganism', 'wicca', 'secular humanism'], summary: 'Compare Paganism, Wicca, and Secular Humanism on meaning, ritual, and worldview.', searchText: 'Paganism Wicca vs Secular Humanism comparison meaning ritual worldview' },
  { label: 'Rastafari vs African Diaspora', href: '/compare/rastafari-vs-african-diaspora', type: 'comparison', keywords: ['rastafari', 'african diaspora'], summary: 'Compare Rastafari and African Diaspora traditions on history, symbolism, and liberation.', searchText: 'Rastafari vs African Diaspora comparison history symbolism liberation' },
  { label: 'Hinduism vs Confucianism', href: '/compare/hinduism-vs-confucianism', type: 'comparison', keywords: ['hinduism', 'confucianism'], summary: 'Compare Hinduism and Confucianism on duty, ritual, and moral order.', searchText: 'Hinduism vs Confucianism comparison duty ritual moral order' },
  { label: 'Judaism vs Baha\'i Faith', href: '/compare/judaism-vs-bahai-faith', type: 'comparison', keywords: ['judaism', 'bahai faith'], summary: 'Compare Judaism and the Baha\'i Faith on revelation, law, and peoplehood.', searchText: 'Judaism vs Baha\'i Faith comparison revelation law peoplehood' },
  { label: 'Druze vs Islam', href: '/compare/druze-vs-islam', type: 'comparison', keywords: ['druze', 'islam'], summary: 'Compare Druze and Islam on esotericism, tawhid, community, and history.', searchText: 'Druze vs Islam comparison esotericism tawhid community history' },
  { label: 'Druze vs Judaism', href: '/compare/druze-vs-judaism', type: 'comparison', keywords: ['druze', 'judaism'], summary: 'Compare Druze and Judaism on identity, scripture, community, and law.', searchText: 'Druze vs Judaism comparison identity scripture community law' },
  { label: 'Druze vs Christianity', href: '/compare/druze-vs-christianity', type: 'comparison', keywords: ['druze', 'christianity'], summary: 'Compare Druze and Christianity on theology, scripture, and communal life.', searchText: 'Druze vs Christianity comparison theology scripture communal life' },
  { label: 'Druze vs Baha\'i Faith', href: '/compare/druze-vs-bahai-faith', type: 'comparison', keywords: ['druze', 'bahai faith'], summary: 'Compare Druze and the Baha\'i Faith on revelation, unity, and religious identity.', searchText: 'Druze vs Baha\'i Faith comparison revelation unity religious identity' },
  { label: 'Christianity vs Unitarian Universalism', href: '/compare/christianity-vs-unitarian-universalism', type: 'comparison', keywords: ['christianity', 'unitarian universalism'], summary: 'Compare Christianity and Unitarian Universalism on creed, scripture, and practice.', searchText: 'Christianity vs Unitarian Universalism comparison creed scripture practice' },
  { label: 'Secular Humanism vs Unitarian Universalism', href: '/compare/secular-humanism-vs-unitarian-universalism', type: 'comparison', keywords: ['secular humanism', 'unitarian universalism'], summary: 'Compare Secular Humanism and Unitarian Universalism on ethics, pluralism, and meaning.', searchText: 'Secular Humanism vs Unitarian Universalism comparison ethics pluralism meaning' },
  { label: 'Judaism vs Unitarian Universalism', href: '/compare/judaism-vs-unitarian-universalism', type: 'comparison', keywords: ['judaism', 'unitarian universalism'], summary: 'Compare Judaism and Unitarian Universalism on community, identity, and ritual.', searchText: 'Judaism vs Unitarian Universalism comparison community identity ritual' },
  { label: 'Buddhism vs Unitarian Universalism', href: '/compare/buddhism-vs-unitarian-universalism', type: 'comparison', keywords: ['buddhism', 'unitarian universalism'], summary: 'Compare Buddhism and Unitarian Universalism on spirituality, ethics, and practice.', searchText: 'Buddhism vs Unitarian Universalism comparison spirituality ethics practice' },
];

const STATIC_PAGES: SearchIndexItem[] = [
  {
    label: 'Religions',
    href: '/religions',
    type: 'religion',
    keywords: ['religions directory', 'religion profiles', 'world religions'],
    summary: 'Browse citation-backed profiles for major world religions, denominations, and movements.',
    searchText: 'Religions directory citation backed profiles for major world religions denominations movements beliefs practices texts history demographics',
  },
  {
    label: 'Articles',
    href: '/articles',
    type: 'article',
    keywords: ['articles', 'religion explainers', 'deep dives'],
    summary: 'In-depth, citation-backed articles on beliefs, practices, history, and culture across world religions.',
    searchText: 'Articles in depth citation backed articles beliefs practices history culture world religions explainers',
  },
  {
    label: 'Recommended Reading',
    href: '/recommended-reading',
    type: 'reading-list',
    keywords: ['recommended reading', 'book lists', 'religion books', 'study books'],
    summary: 'Curated reading lists for major religions with beginner-friendly introductions and respected academic titles.',
    searchText: 'Recommended Reading book lists religion books study books beginner introductions academic titles sacred texts reading guidance',
  },
  {
    label: 'Sacred Items & Gifts',
    href: '/sacred-items',
    type: 'guide',
    keywords: ['sacred items', 'religious gifts', 'material culture', 'meditation supplies', 'religious decor'],
    summary: 'Curated sacred items and gifts from world traditions, with educational context and affiliate purchase links.',
    searchText: 'Sacred Items Gifts religious gifts material culture buddhist gifts hindu puja items jewish gifts christian gifts meditation supplies religious decor amazon',
  },
  {
    label: 'Glossary',
    href: '/glossary',
    type: 'glossary',
    keywords: ['glossary', 'religion terms', 'definitions', 'karma', 'dharma', 'halal', 'kosher'],
    summary: 'Definitions for key comparative religion terms used across multiple traditions.',
    searchText: 'Glossary religion terms definitions karma dharma nirvana halal kosher reincarnation comparative religion vocabulary',
  },
  {
    label: 'Beginner Guides',
    href: '/beginner-guides',
    type: 'guide',
    keywords: ['beginner guides', 'start here', 'religion basics', 'first-time learners'],
    summary: 'Beginner-friendly pathways into major religions, including beliefs, practice, texts, and internal diversity.',
    searchText: 'Beginner Guides start here religion basics first time learners Christianity Islam Hinduism Buddhism Judaism Sikhism',
  },
  {
    label: 'Etiquette Guides',
    href: '/etiquette-guides',
    type: 'guide',
    keywords: ['etiquette guides', 'visitor etiquette', 'mosque etiquette', 'church etiquette', 'temple etiquette'],
    summary: 'Practical visitor guidance for churches, mosques, synagogues, temples, and gurdwaras.',
    searchText: 'Etiquette Guides visitor etiquette mosque church synagogue temple gurdwara respectful behavior dress photography worship spaces',
  },
  {
    label: 'Sacred Texts',
    href: '/sacred-texts',
    type: 'sacred-text',
    keywords: ['sacred texts', 'scripture guide', 'bible', 'quran', 'torah', 'bhagavad gita'],
    summary: 'Introductory guides to major scriptures across world religions.',
    searchText: 'Sacred Texts scripture guide Bible Quran Torah Bhagavad Gita Tripitaka Guru Granth Sahib Avesta Analects Tao Te Ching',
  },
  {
    label: 'FAQs',
    href: '/faqs',
    type: 'faq',
    keywords: ['faqs', 'common questions', 'religion questions', 'conversion', 'belief'],
    summary: 'Frequently asked questions about religion, conversion, sacred texts, dietary laws, and respectful comparison.',
    searchText: 'FAQs common questions religion questions conversion belief sacred texts dietary laws respectful comparison',
  },
  {
    label: 'Educator Resources',
    href: '/educator-resources',
    type: 'educator',
    keywords: ['educator resources', 'teacher resources', 'classroom religion', 'lesson planning'],
    summary: 'Teaching-oriented resources for world religions units, discussion norms, and source literacy.',
    searchText: 'Educator Resources teacher resources classroom religion lesson planning world religions unit discussion norms source literacy',
  },
  {
    label: 'Religious Holidays Calendar',
    href: '/holidays',
    type: 'holiday',
    keywords: ['holidays', 'calendar', 'religious festivals', '2026'],
    summary: 'Browse religious holidays across ten traditions for 2026 with calendar views and downloads.',
    searchText: 'Religious Holidays Calendar 2026 religious festivals observances calendar timeline monthly by religion ics downloads',
  },
  {
    label: 'Infographics',
    href: '/infographics',
    type: 'infographic',
    keywords: ['infographics', 'visual guides', 'religion charts'],
    summary: 'Data-driven visual guides exploring populations, sacred texts, timelines, and afterlife beliefs.',
    searchText: 'Infographics data driven visual guides populations sacred texts timelines afterlife beliefs charts religion visuals',
  },
  {
    label: 'Sacred Places',
    href: '/sacred-places',
    type: 'sacred-place',
    keywords: ['sacred places', 'pilgrimage', 'holy sites', 'temples', 'shrines'],
    summary: 'Explore sacred sites, pilgrimage destinations, temples, mosques, churches, shrines, and holy cities from world religions.',
    searchText: 'Sacred Places pilgrimage holy sites temples mosques churches shrines holy cities world religions Jerusalem Mecca Varanasi Bodh Gaya',
  },
  {
    label: 'Trending Topics',
    href: '/trending',
    type: 'trending',
    keywords: ['trending', 'current events', 'religion news', 'interfaith'],
    summary: 'Curated trending topics at the intersection of religion, culture, demographics, and current events.',
    searchText: 'Trending Topics religion culture demographics current events interfaith politics scholarship human rights',
  },
  {
    label: 'How We Source Facts',
    href: '/about/how-we-source',
    type: 'about',
    keywords: ['how we source', 'methodology', 'citations', 'fact checking'],
    summary: 'Learn how ReligionCompare researches, verifies, and cites factual claims.',
    searchText: 'How We Source Facts methodology citations fact checking research verification',
  },
  {
    label: 'Editorial Policy',
    href: '/about/editorial-policy',
    type: 'about',
    keywords: ['editorial policy', 'neutrality', 'standards'],
    summary: 'Read the editorial standards and neutrality commitments behind ReligionCompare content.',
    searchText: 'Editorial Policy editorial standards neutrality commitments ReligionCompare content policy',
  },
  {
    label: 'Terms of Service',
    href: '/legal/terms',
    type: 'legal',
    keywords: ['terms', 'conditions', 'legal'],
    summary: 'Terms and conditions governing use of ReligionCompare.',
    searchText: 'Terms of Service terms conditions legal educational use disclaimer Arizona law',
  },
  {
    label: 'Affiliate Disclosure',
    href: '/legal/affiliate-disclosure',
    type: 'legal',
    keywords: ['affiliate disclosure', 'amazon associates'],
    summary: 'How ReligionCompare uses affiliate links and maintains editorial independence.',
    searchText: 'Affiliate Disclosure amazon associates commissions editorial independence affiliate links',
  },
  {
    label: 'Cookie Policy',
    href: '/legal/cookies',
    type: 'legal',
    keywords: ['cookie policy', 'cookies', 'consent'],
    summary: 'How cookies are used on ReligionCompare and how visitors can manage preferences.',
    searchText: 'Cookie Policy cookies consent analytics advertising preferences',
  },
  {
    label: 'Accessibility',
    href: '/legal/accessibility',
    type: 'legal',
    keywords: ['accessibility', 'wcag'],
    summary: 'Accessibility commitment and standards for ReligionCompare.',
    searchText: 'Accessibility WCAG accessibility commitment standards keyboard screen reader',
  },
  {
    label: 'DMCA / Contact',
    href: '/legal/dmca',
    type: 'legal',
    keywords: ['dmca', 'copyright', 'contact'],
    summary: 'DMCA notice procedures and contact information for ReligionCompare.',
    searchText: 'DMCA copyright contact takedown procedures legal notice',
  },
  {
    label: 'Disclaimers',
    href: '/legal/disclaimers',
    type: 'legal',
    keywords: ['disclaimers', 'educational purpose'],
    summary: 'Educational, legal, and methodology disclaimers for ReligionCompare content.',
    searchText: 'Disclaimers educational purpose methodology fair use estimates no endorsement',
  },
  {
    label: 'Image Credits',
    href: '/legal/image-credits',
    type: 'legal',
    keywords: ['image credits', 'attribution', 'icons'],
    summary: 'Credits and attribution for visuals, iconography, and chart sources.',
    searchText: 'Image Credits attribution visuals iconography chart sources',
  },
  {
    label: 'Site Guidelines',
    href: '/legal/guidelines',
    type: 'legal',
    keywords: ['guidelines', 'site guidelines'],
    summary: 'Guidelines page covering respectful communication and submission standards.',
    searchText: 'Site Guidelines respectful communication submission standards guidelines',
  },
];

 function cleanText(text: string): string {
   return text
     .replace(/\[\d+\]/g, ' ')
     .replace(/<[^>]+>/g, ' ')
     .replace(/\s+/g, ' ')
     .trim();
 }

 function normalizeText(text: string): string {
   return cleanText(text)
     .normalize('NFD')
     .replace(/[\u0300-\u036f]/g, '')
     .toLowerCase();
 }

 function truncate(text: string, maxLength = 180): string {
   if (text.length <= maxLength) {
     return text;
   }

   return `${text.slice(0, maxLength - 1).trimEnd()}…`;
 }

 function buildSnippet(item: SearchIndexItem, terms: string[]): string {
   const text = cleanText(item.searchText || item.summary);
   if (!text) {
     return item.summary;
   }

   const normalized = normalizeText(text);
   const firstMatch = terms
     .map((term) => normalized.indexOf(term))
     .filter((index) => index >= 0)
     .sort((a, b) => a - b)[0];

   if (firstMatch === undefined) {
     return truncate(text);
   }

   const start = Math.max(0, firstMatch - 50);
   const end = Math.min(text.length, start + 180);
   const prefix = start > 0 ? '…' : '';
   const suffix = end < text.length ? '…' : '';
   return `${prefix}${text.slice(start, end).trim()}${suffix}`;
 }

 function keywordsFromSlug(slug: string): string[] {
   return slug.split('-').filter(Boolean);
 }

const RELIGION_ITEMS: SearchIndexItem[] = Object.entries(RELIGION_CONTENT).map(([slug, content]) => {
  const summary = truncate(cleanText(content.overview), 180);
  const searchText = cleanText([
    content.name,
    content.family,
    content.overview,
    content.beliefs,
    content.practices,
    content.texts,
    content.demographics,
    content.timeline,
    content.denominations,
    content.holidays,
    content.leadership,
    content.symbols,
    content.keyFigures,
    content.ethics,
    content.afterlife,
    content.origins,
  ].join(' '));

  return {
    label: content.name,
    href: `/religions/${slug}`,
    type: 'religion',
    keywords: [content.family, slug.replace(/-/g, ' '), ...keywordsFromSlug(slug)],
    summary,
    searchText,
  };
});

const RECOMMENDED_READING_ITEMS: SearchIndexItem[] = Object.entries(RECOMMENDED_READING)
  .filter(([slug, books]) => Boolean(RELIGION_CONTENT[slug]) && books.length > 0)
  .map(([slug, books]) => ({
    label: `${RELIGION_CONTENT[slug].name} Recommended Reading`,
    href: `/recommended-reading/${slug}`,
    type: 'reading-list',
    keywords: [slug.replace(/-/g, ' '), RELIGION_CONTENT[slug].name, 'recommended reading', 'book list', ...books.flatMap((book) => [book.title, book.author])],
    summary: `Curated ${RELIGION_CONTENT[slug].name} reading list with ${books.length} recommended title${books.length === 1 ? '' : 's'}.`,
    searchText: cleanText([
      RELIGION_CONTENT[slug].name,
      'recommended reading',
      books.map((book) => `${book.title} ${book.author} ${book.description}`).join(' '),
    ].join(' ')),
  }));

const GLOSSARY_DETAIL_ITEMS: SearchIndexItem[] = GLOSSARY_DETAILS.map((entry) => ({
  label: entry.title,
  href: `/glossary/${entry.slug}`,
  type: 'glossary',
  keywords: [entry.title, 'glossary', entry.categoryLabel, ...entry.relatedLinks.map((link) => link.label)],
  summary: entry.summary,
  searchText: cleanText([
    entry.title,
    entry.description,
    entry.summary,
    ...entry.sections.flatMap((section) => [section.heading, ...section.body]),
  ].join(' ')),
}));

const BEGINNER_GUIDE_DETAIL_ITEMS: SearchIndexItem[] = BEGINNER_GUIDE_DETAILS.map((entry) => ({
  label: entry.title,
  href: `/beginner-guides/${entry.slug}`,
  type: 'guide',
  keywords: [entry.title, 'beginner guide', ...entry.relatedLinks.map((link) => link.label)],
  summary: entry.summary,
  searchText: cleanText([
    entry.title,
    entry.description,
    entry.summary,
    ...entry.sections.flatMap((section) => [section.heading, ...section.body]),
  ].join(' ')),
}));

const ETIQUETTE_GUIDE_DETAIL_ITEMS: SearchIndexItem[] = ETIQUETTE_GUIDE_DETAILS.map((entry) => ({
  label: entry.title,
  href: `/etiquette-guides/${entry.slug}`,
  type: 'guide',
  keywords: [entry.title, 'etiquette guide', 'visitor etiquette', ...entry.relatedLinks.map((link) => link.label)],
  summary: entry.summary,
  searchText: cleanText([
    entry.title,
    entry.description,
    entry.summary,
    ...entry.sections.flatMap((section) => [section.heading, ...section.body]),
  ].join(' ')),
}));

const SACRED_TEXT_DETAIL_ITEMS: SearchIndexItem[] = SACRED_TEXT_DETAILS.map((entry) => ({
  label: entry.title,
  href: `/sacred-texts/${entry.slug}`,
  type: 'sacred-text',
  keywords: [entry.title, 'sacred text', 'scripture', ...entry.relatedLinks.map((link) => link.label)],
  summary: entry.summary,
  searchText: cleanText([
    entry.title,
    entry.description,
    entry.summary,
    ...entry.sections.flatMap((section) => [section.heading, ...section.body]),
  ].join(' ')),
}));

const FAQ_DETAIL_ITEMS: SearchIndexItem[] = FAQ_DETAILS.map((entry) => ({
  label: entry.title,
  href: `/faqs/${entry.slug}`,
  type: 'faq',
  keywords: [entry.title, 'faq', ...entry.relatedLinks.map((link) => link.label)],
  summary: entry.summary,
  searchText: cleanText([
    entry.title,
    entry.description,
    entry.summary,
    ...entry.sections.flatMap((section) => [section.heading, ...section.body]),
  ].join(' ')),
}));

const EDUCATOR_RESOURCE_DETAIL_ITEMS: SearchIndexItem[] = EDUCATOR_RESOURCE_DETAILS.map((entry) => ({
  label: entry.title,
  href: `/educator-resources/${entry.slug}`,
  type: 'educator',
  keywords: [entry.title, 'educator resource', 'teacher resource', ...entry.relatedLinks.map((link) => link.label)],
  summary: entry.summary,
  searchText: cleanText([
    entry.title,
    entry.description,
    entry.summary,
    ...entry.sections.flatMap((section) => [section.heading, ...section.body]),
  ].join(' ')),
}));

const ARTICLE_ITEMS: SearchIndexItem[] = ALL_ARTICLES.map((article) => ({
  label: article.title,
  href: `/articles/${article.slug}`,
  type: 'article',
  keywords: [article.author, article.category, ...article.relatedReligions, ...article.relatedComparisons.flatMap((value) => keywordsFromSlug(value))],
  summary: article.excerpt,
  searchText: cleanText([
    article.title,
    article.author,
    article.category,
    article.excerpt,
    article.content,
    article.relatedReligions.join(' '),
    article.relatedComparisons.join(' '),
  ].join(' ')),
}));

const INFOGRAPHIC_ITEMS: SearchIndexItem[] = INFOGRAPHICS.map((item) => ({
  label: item.title,
  href: `/infographics/${item.slug}`,
  type: 'infographic',
  keywords: [...keywordsFromSlug(item.slug), 'infographic', 'visual guide'],
  summary: item.description,
  searchText: cleanText([item.title, item.description, item.source, item.slug.replace(/-/g, ' ')].join(' ')),
}));

const HOLIDAY_ITEMS: SearchIndexItem[] = HOLIDAYS_2026.map((holiday) => ({
  label: `${holiday.name} (${holiday.tradition})`,
  href: '/holidays',
  type: 'holiday',
  keywords: [holiday.tradition, holiday.name, 'holiday', 'festival', ...keywordsFromSlug(holiday.id)],
  summary: `${holiday.displayDate}, ${holiday.description}`,
  searchText: cleanText([holiday.name, holiday.tradition, holiday.displayDate, holiday.description, holiday.source].join(' ')),
}));

const TRENDING_ITEMS: SearchIndexItem[] = TRENDING_TOPICS.map((topic) => ({
  label: topic.title,
  href: `/trending#${topic.id}`,
  type: 'trending',
  keywords: [topic.category, ...topic.relatedLinks.map((link) => link.label), ...keywordsFromSlug(topic.id)],
  summary: topic.summary,
  searchText: cleanText([topic.title, topic.summary, topic.context, topic.category, topic.source].join(' ')),
}));

const SACRED_PLACE_ITEMS: SearchIndexItem[] = [
  { label: 'Jerusalem', href: '/sacred-places/jerusalem', type: 'sacred-place', keywords: ['judaism', 'christianity', 'islam', 'holy city', 'western wall', 'al-aqsa'], summary: 'Holy city to Judaism, Christianity, and Islam, home to the Western Wall, Church of the Holy Sepulchre, and Al-Aqsa Mosque.', searchText: 'Jerusalem sacred place Judaism Christianity Islam holy city Western Wall Church of the Holy Sepulchre Al-Aqsa Mosque Abrahamic' },
  { label: 'Mecca', href: '/sacred-places/mecca', type: 'sacred-place', keywords: ['islam', 'kaaba', 'hajj', 'pilgrimage'], summary: 'Birthplace of the Prophet Muhammad and location of the Kaaba, the holiest site in Islam.', searchText: 'Mecca sacred place Islam Kaaba Hajj pilgrimage Prophet Muhammad holy city Saudi Arabia' },
  { label: 'Varanasi', href: '/sacred-places/varanasi', type: 'sacred-place', keywords: ['hinduism', 'buddhism', 'jainism', 'ganges'], summary: 'Ancient holy city on the Ganges, sacred in Hinduism and significant in Buddhism and Jainism.', searchText: 'Varanasi sacred place Hinduism Buddhism Jainism Ganges pilgrimage moksha cremation ghats India' },
  { label: 'Bodh Gaya', href: '/sacred-places/bodh-gaya', type: 'sacred-place', keywords: ['buddhism', 'bodhi tree', 'enlightenment'], summary: 'Site where Siddhartha Gautama attained enlightenment and became the Buddha.', searchText: 'Bodh Gaya sacred place Buddhism Bodhi Tree enlightenment Buddha Mahabodhi Temple pilgrimage India' },
  { label: 'Amritsar', href: '/sacred-places/amritsar', type: 'sacred-place', keywords: ['sikhism', 'golden temple', 'harmandir sahib'], summary: 'Home of the Golden Temple, a major center of Sikh devotion and community service.', searchText: 'Amritsar sacred place Sikhism Golden Temple Harmandir Sahib langar pilgrimage India' },
  { label: 'Ise Grand Shrine', href: '/sacred-places/ise', type: 'sacred-place', keywords: ['shinto', 'japan', 'amaterasu'], summary: 'Often described as the most sacred Shinto shrine, rebuilt every 20 years.', searchText: 'Ise Grand Shrine sacred place Shinto Japan Amaterasu shrine pilgrimage' },
  { label: 'Rome & Vatican City', href: '/sacred-places/rome', type: 'sacred-place', keywords: ['catholicism', 'christianity', 'vatican', 'st peters basilica'], summary: 'Seat of the Roman Catholic Church and home to St. Peter’s Basilica and Vatican City.', searchText: 'Rome Vatican City sacred place Catholicism Christianity St Peter Basilica papacy pilgrimage' },
  { label: 'Medina', href: '/sacred-places/medina', type: 'sacred-place', keywords: ['islam', 'prophets mosque', 'hijra'], summary: 'Location of the Prophet’s Mosque and the early Muslim community established after the Hijra.', searchText: 'Medina sacred place Islam Prophet Mosque Hijra Muhammad Saudi Arabia' },
  { label: 'Lhasa', href: '/sacred-places/lhasa', type: 'sacred-place', keywords: ['buddhism', 'tibetan buddhism', 'potala palace'], summary: 'Traditional seat of the Dalai Lama and spiritual heart of Tibetan Buddhism.', searchText: 'Lhasa sacred place Tibetan Buddhism Dalai Lama Potala Palace Jokhang Tibet pilgrimage' },
  { label: 'Mount Athos', href: '/sacred-places/mount-athos', type: 'sacred-place', keywords: ['orthodox christianity', 'monasticism', 'greece'], summary: 'A monastic republic with over a thousand years of Eastern Orthodox monastic life.', searchText: 'Mount Athos sacred place Orthodox Christianity monasticism Greece monasteries pilgrimage' },
  { label: 'Haifa', href: '/sacred-places/haifa', type: 'sacred-place', keywords: ['bahai faith', 'shrine of the bab', 'mount carmel'], summary: 'Location of the Baha’i World Centre and the Shrine of the Bab.', searchText: 'Haifa sacred place Baha i Faith Baha i World Centre Shrine of the Bab Mount Carmel' },
  { label: 'Mount Kōya', href: '/sacred-places/mount-koya', type: 'sacred-place', keywords: ['buddhism', 'shingon', 'japan'], summary: 'Center of Shingon Buddhism in Japan with temples and pilgrimage routes.', searchText: 'Mount Koya sacred place Buddhism Shingon Japan Kukai temples pilgrimage' },
  { label: 'Angkor Wat', href: '/sacred-places/angkor-wat', type: 'sacred-place', keywords: ['hinduism', 'buddhism', 'cambodia'], summary: 'The world’s largest religious monument, originally Hindu and later Buddhist.', searchText: 'Angkor Wat sacred place Hinduism Buddhism Cambodia temple Vishnu Khmer' },
  { label: 'Mount Sinai', href: '/sacred-places/mount-sinai', type: 'sacred-place', keywords: ['judaism', 'christianity', 'islam', 'moses'], summary: 'Traditionally identified as the mountain where Moses received the Ten Commandments.', searchText: 'Mount Sinai sacred place Moses Ten Commandments Judaism Christianity Islam St Catherine' },
  { label: 'Uluru', href: '/sacred-places/uluru', type: 'sacred-place', keywords: ['indigenous australian', 'anangu', 'australia'], summary: 'A sacred site for the Anangu people with deep spiritual significance.', searchText: 'Uluru sacred place Indigenous Australian Anangu Australia Tjukurpa sacred land' },
  { label: 'Ganges River', href: '/sacred-places/ganges-river', type: 'sacred-place', keywords: ['hinduism', 'ganga', 'river', 'moksha'], summary: 'The holiest river in Hinduism, central to pilgrimage, ritual bathing, and cremation practices.', searchText: 'Ganges River sacred place Hinduism Ganga pilgrimage ritual bathing cremation moksha India' },
  { label: 'Wittenberg', href: '/sacred-places/wittenberg', type: 'sacred-place', keywords: ['protestantism', 'reformation', 'martin luther'], summary: 'City where Martin Luther posted the 95 Theses, a landmark of the Protestant Reformation.', searchText: 'Wittenberg sacred place Protestantism Reformation Martin Luther 95 theses Germany' },
  { label: 'Mount Tai', href: '/sacred-places/mount-tai', type: 'sacred-place', keywords: ['taoism', 'confucianism', 'buddhism', 'china'], summary: 'One of China’s Five Great Mountains, sacred across Taoism, Confucianism, and Buddhism.', searchText: 'Mount Tai sacred place Taoism Confucianism Buddhism China sacred mountain pilgrimage' },
  { label: 'Palitana', href: '/sacred-places/palitana', type: 'sacred-place', keywords: ['jainism', 'shatrunjaya hill', 'temples'], summary: 'Hilltop complex of hundreds of Jain temples and one of Jainism’s holiest pilgrimage sites.', searchText: 'Palitana sacred place Jainism Shatrunjaya Hill temples pilgrimage ahimsa India' },
  { label: 'Lalibela', href: '/sacred-places/lalibela', type: 'sacred-place', keywords: ['ethiopian orthodox', 'christianity', 'rock-hewn churches'], summary: 'Famous for its medieval rock-hewn churches and Ethiopian Orthodox pilgrimage tradition.', searchText: 'Lalibela sacred place Ethiopian Orthodox Christianity rock hewn churches Ethiopia pilgrimage' },
  { label: 'Hagia Sophia', href: '/sacred-places/hagia-sophia', type: 'sacred-place', keywords: ['orthodox christianity', 'islam', 'istanbul'], summary: 'A major religious monument that has served as cathedral, mosque, and museum.', searchText: 'Hagia Sophia sacred place Orthodox Christianity Islam Istanbul cathedral mosque museum' },
  { label: 'Western Wall', href: '/sacred-places/western-wall', type: 'sacred-place', keywords: ['judaism', 'kotel', 'jerusalem'], summary: 'The most sacred site accessible to Jewish worshippers, part of the Second Temple complex.', searchText: 'Western Wall sacred place Judaism Kotel Jerusalem Temple Mount prayer' },
  { label: 'Al-Aqsa Mosque', href: '/sacred-places/al-aqsa', type: 'sacred-place', keywords: ['islam', 'jerusalem', 'night journey'], summary: 'The third holiest site in Islam, associated with Muhammad’s Night Journey.', searchText: 'Al Aqsa Mosque sacred place Islam Jerusalem Night Journey Dome of the Rock' },
  { label: 'Santiago de Compostela', href: '/sacred-places/santiago-de-compostela', type: 'sacred-place', keywords: ['catholicism', 'camino de santiago', 'pilgrimage'], summary: 'Destination of the Camino de Santiago, one of Christianity’s great pilgrimage routes.', searchText: 'Santiago de Compostela sacred place Catholicism Camino de Santiago pilgrimage Spain' },
  { label: 'Stonehenge', href: '/sacred-places/stonehenge', type: 'sacred-place', keywords: ['pagan', 'prehistoric', 'solstice'], summary: 'Prehistoric stone circle associated with solstice alignments and modern pagan interest.', searchText: 'Stonehenge sacred place pagan prehistoric solstice ritual England' },
  { label: 'Machu Picchu', href: '/sacred-places/machu-picchu', type: 'sacred-place', keywords: ['inca', 'indigenous andean', 'peru'], summary: 'Inca citadel believed to have served as both royal estate and sacred religious site.', searchText: 'Machu Picchu sacred place Inca Indigenous Andean Peru ritual mountain' },
  { label: 'Borobudur', href: '/sacred-places/borobudur', type: 'sacred-place', keywords: ['buddhism', 'mahayana', 'indonesia'], summary: 'The world’s largest Buddhist temple, a monument of Mahayana Buddhist art and pilgrimage.', searchText: 'Borobudur sacred place Buddhism Mahayana Indonesia temple pilgrimage stupas' },
  { label: 'Qufu (Temple of Confucius)', href: '/sacred-places/qufu', type: 'sacred-place', keywords: ['confucianism', 'confucius', 'china'], summary: 'Birthplace of Confucius and home to the largest Confucian temple complex in the world.', searchText: 'Qufu Temple of Confucius sacred place Confucianism Confucius China temple' },
  { label: 'Salt Lake Temple', href: '/sacred-places/salt-lake-temple', type: 'sacred-place', keywords: ['latter-day saints', 'lds', 'temple square'], summary: 'The most prominent Latter-day Saint temple and centerpiece of Temple Square.', searchText: 'Salt Lake Temple sacred place Latter day Saints LDS Temple Square Utah' },
  { label: 'Dambulla Cave Temple', href: '/sacred-places/golden-temple-dambulla', type: 'sacred-place', keywords: ['buddhism', 'theravada', 'sri lanka'], summary: 'Major Sri Lankan cave temple complex with Buddhist statues and murals.', searchText: 'Dambulla Cave Temple sacred place Buddhism Theravada Sri Lanka cave temple' },
  { label: 'Chartres Cathedral', href: '/sacred-places/chartres-cathedral', type: 'sacred-place', keywords: ['catholicism', 'christianity', 'france'], summary: 'A Gothic cathedral famous for medieval stained glass and Christian pilgrimage traditions.', searchText: 'Chartres Cathedral sacred place Catholicism Christianity France gothic pilgrimage' },
  { label: 'Yazd Atash Behram', href: '/sacred-places/yazd-fire-temple', type: 'sacred-place', keywords: ['zoroastrianism', 'fire temple', 'iran'], summary: 'Zoroastrian fire temple housing a sacred flame said to have burned for centuries.', searchText: 'Yazd Atash Behram sacred place Zoroastrianism fire temple Iran sacred fire' },
  { label: 'Adam’s Peak (Sri Pada)', href: '/sacred-places/adam-peak', type: 'sacred-place', keywords: ['buddhism', 'hinduism', 'islam', 'christianity'], summary: 'Mountain revered by multiple religions, each associating the summit footprint with sacred figures.', searchText: 'Adam s Peak Sri Pada sacred place Buddhism Hinduism Islam Christianity pilgrimage mountain' },
  { label: 'Great Mosque of Djenne', href: '/sacred-places/great-mosque-djenne', type: 'sacred-place', keywords: ['islam', 'mali', 'sahel'], summary: 'The largest mud-brick building in the world and a major Islamic monument in Mali.', searchText: 'Great Mosque of Djenne sacred place Islam Mali mud brick mosque Sahel' },
  { label: 'Meiji Shrine', href: '/sacred-places/meiji-shrine', type: 'sacred-place', keywords: ['shinto', 'japan', 'tokyo'], summary: 'One of Japan’s most visited Shinto shrines, set in a large forest in Tokyo.', searchText: 'Meiji Shrine sacred place Shinto Japan Tokyo shrine pilgrimage' },
  { label: 'Karnak Temple Complex', href: '/sacred-places/karnak-temple', type: 'sacred-place', keywords: ['ancient egyptian', 'egypt', 'temple complex'], summary: 'One of the largest ancient religious sites in the world, representing centuries of temple building.', searchText: 'Karnak Temple Complex sacred place Ancient Egyptian religion Egypt temple complex' },
  { label: 'Glastonbury Tor', href: '/sacred-places/glastonbury-tor', type: 'sacred-place', keywords: ['christianity', 'paganism', 'new age'], summary: 'Hill of spiritual significance for Christians, pagans, and New Age practitioners.', searchText: 'Glastonbury Tor sacred place Christianity Paganism New Age England spiritual hill' },
  { label: 'Shashamane', href: '/sacred-places/shashamane', type: 'sacred-place', keywords: ['rastafari', 'ethiopia', 'haile selassie'], summary: 'Ethiopian town home to a Rastafari community on land associated with Haile Selassie.', searchText: 'Shashamane sacred place Rastafari Ethiopia Haile Selassie diaspora' },
  { label: 'Great Mosque of Touba', href: '/sacred-places/touba', type: 'sacred-place', keywords: ['islam', 'mouride', 'sufi', 'senegal'], summary: 'Spiritual center of the Mouride brotherhood and one of Africa’s largest mosques.', searchText: 'Great Mosque of Touba sacred place Islam Mouride Sufi Senegal pilgrimage' },
];

export const SEARCH_INDEX: SearchIndexItem[] = [
  ...STATIC_PAGES,
  ...RELIGION_ITEMS,
  ...RECOMMENDED_READING_ITEMS,
  ...GLOSSARY_DETAIL_ITEMS,
  ...BEGINNER_GUIDE_DETAIL_ITEMS,
  ...ETIQUETTE_GUIDE_DETAIL_ITEMS,
  ...SACRED_TEXT_DETAIL_ITEMS,
  ...FAQ_DETAIL_ITEMS,
  ...EDUCATOR_RESOURCE_DETAIL_ITEMS,
  ...COMPARISON_PAGES,
  ...QUIZ_PAGES,
  ...ARTICLE_ITEMS,
  ...INFOGRAPHIC_ITEMS,
  ...HOLIDAY_ITEMS,
  ...SACRED_PLACE_ITEMS,
  ...TRENDING_ITEMS,
];

export function searchIndex(query: string, limit = 20): SearchIndexItem[] {
  const trimmed = query.trim();
  if (trimmed.length < 2) {
    return [];
  }

  const normalizedQuery = normalizeText(trimmed);
  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  return SEARCH_INDEX
    .map((item) => {
      const label = normalizeText(item.label);
      const keywords = item.keywords.map((keyword) => normalizeText(keyword));
      const summary = normalizeText(item.summary);
      const searchText = normalizeText(item.searchText);

      let score = 0;

      if (label.includes(normalizedQuery)) {
        score += label.startsWith(normalizedQuery) ? 120 : 80;
      }

      for (const term of terms) {
        if (label === term) {
          score += 160;
        } else if (label.startsWith(term)) {
          score += 75;
        } else if (label.includes(term)) {
          score += 45;
        }

        if (keywords.some((keyword) => keyword === term)) {
          score += 50;
        } else if (keywords.some((keyword) => keyword.includes(term))) {
          score += 30;
        }

        if (summary.includes(term)) {
          score += 14;
        }

        if (searchText.includes(term)) {
          score += 8;
        }
      }

      const allTermsMatch = terms.every((term) => label.includes(term) || keywords.some((keyword) => keyword.includes(term)) || searchText.includes(term));
      if (allTermsMatch) {
        score += 40;
      }

      return {
        item: {
          ...item,
          summary: buildSnippet(item, terms),
        },
        score,
      };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.item.label.localeCompare(b.item.label))
    .slice(0, limit)
    .map((result) => result.item);
}
