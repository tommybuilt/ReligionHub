import { buildAmazonAffiliateUrl, extractAmazonProductId } from '@/lib/affiliate-links';
import type { ProductBadge } from '@/lib/sacred-items';

type ReadingLevel = 'Introductory' | 'Primary Text' | 'Academic';

interface RawBookRecommendation {
  title: string;
  author: string;
  description: string;
  amazonUrl: string;
  level?: ReadingLevel;
}

export interface BookRecommendation extends RawBookRecommendation {
  amazonProductId: string;
  badges: ProductBadge[];
  featuredNote: string;
  level: ReadingLevel;
}

const STAFF_PICK_NOTES: Record<string, string> = {
  christianity: 'This is the cleanest first step for readers who want a respected introduction before moving into church history or study Bibles.',
  islam: 'This title gives beginners historical context and theological orientation before they move into Quran translation choices.',
  hinduism: 'For many beginners, this is the single most approachable entry point because it introduces a major text without assuming too much background.',
  buddhism: 'It remains one of the clearest introductions to early Buddhist teaching and still works well as a first serious book.',
  judaism: 'This concise overview gives new readers vocabulary and historical framing before they enter more technical Jewish study tools.',
  sikhism: 'It offers accessible historical grounding, which helps the rest of Sikh scripture and practice make more sense.',
  'bahai-faith': 'It remains the classic introductory doorway for general readers who want the Baha’i Faith in one readable volume.',
  jainism: 'This is still the strongest general academic introduction for readers who want both doctrinal clarity and historical background.',
  shinto: 'It explains Shinto through lived Japanese religious culture rather than through a narrow list of abstract doctrines.',
  taoism: 'A reliable translation of the Tao Te Ching is the best first move because so much later Taoist vocabulary circles back to it.',
  zoroastrianism: 'This overview is still the standard place to begin before moving into more specialized historical work.',
  'indigenous-traditions': 'This title is especially useful because it corrects outsider assumptions and centers Indigenous categories of thought.',
  druze: 'A modern overview is essential here because the Druze tradition is often discussed from the outside and oversimplified.',
  'unitarian-universalism': 'This book is still the quickest way to understand how Unitarian Universalism explains itself to newcomers.',
  catholicism: 'It gives readers a readable overview of Catholic life before they take on more formal doctrinal texts.',
  protestantism: 'This is the best entry point for understanding why Protestant diversity became so large in the first place.',
  'orthodox-christianity': 'It remains the classic English-language starting place for Eastern Orthodox history, theology, and worship.',
  'jehovahs-witnesses': 'A strong academic overview matters here because outsider summaries often flatten the movement into slogans.',
  'latter-day-saints': 'This is the most balanced single-volume introduction for readers who want history without polemics.',
  confucianism: 'It combines the life of Confucius with the key text that students usually meet first.',
  'secular-humanism': 'For readers coming from religious traditions, this is the easiest bridge into humanist ethics and reasoning.',
  'african-diaspora': 'This book is a practical starting point because it introduces ritual worlds that many readers know only through stereotypes.',
  'paganism-wicca': 'It remains one of the most influential surveys for understanding modern Pagan and Wiccan communities from the inside.',
  'seventh-day-adventism': 'A broad historical study helps readers place Adventist theology inside its American and global development.',
  rastafari: 'This short introduction is the fastest way to get accurate historical and conceptual grounding before exploring deeper studies.',
  'cao-dai': 'A single scholarly study goes a long way here because Caodai is less familiar to most general readers.',
  tenrikyo: 'An official introductory volume is useful because Tenrikyo terminology can be unfamiliar at first encounter.',
};

const BEST_SELLER_TITLES = new Set([
  'Mere Christianity',
  'What the Buddha Taught',
  'The Bhagavad Gita (Easwaran translation)',
  'The Jewish Study Bible (TANAKH)',
  'The Tao of Pooh',
  'Drawing Down the Moon',
]);

const TOP_RATED_TITLES = new Set([
  'The New Oxford Annotated Bible (NRSV)',
  'The Qur\'an (Oxford World\'s Classics)',
  'The Foundations of Buddhism',
  'Sikhism: A Very Short Introduction',
  'The Orthodox Church',
  'Humanism: A Very Short Introduction',
]);

function inferLevel(book: RawBookRecommendation): ReadingLevel {
  const normalizedTitle = book.title.toLowerCase();
  const normalizedDescription = book.description.toLowerCase();

  if (
    normalizedTitle.includes('bible') ||
    normalizedTitle.includes('qur') ||
    normalizedTitle.includes('gita') ||
    normalizedTitle.includes('analects') ||
    normalizedTitle.includes('tao te ching') ||
    normalizedTitle.includes('granth sahib') ||
    normalizedDescription.includes('translation') ||
    normalizedDescription.includes('scripture')
  ) {
    return 'Primary Text';
  }

  if (
    normalizedDescription.includes('academic') ||
    normalizedDescription.includes('textbook') ||
    normalizedDescription.includes('scholarly') ||
    normalizedDescription.includes('comprehensive')
  ) {
    return 'Academic';
  }

  return 'Introductory';
}

function enrichBook(slug: string, book: RawBookRecommendation, index: number): BookRecommendation {
  const amazonProductId = extractAmazonProductId(book.amazonUrl) ?? '';
  const badges: ProductBadge[] = [];

  if (index === 0) {
    badges.push('Staff Pick');
  }

  if (BEST_SELLER_TITLES.has(book.title)) {
    badges.push('Best Seller');
  }

  if (TOP_RATED_TITLES.has(book.title)) {
    badges.push('Top Rated');
  }

  return {
    ...book,
    amazonUrl: buildAmazonAffiliateUrl(amazonProductId),
    amazonProductId,
    badges,
    featuredNote: STAFF_PICK_NOTES[slug] || 'This is a strong first-stop recommendation for readers who want a reliable, non-polemical introduction.',
    level: book.level || inferLevel(book),
  };
}

const RAW_RECOMMENDED_READING: Record<string, RawBookRecommendation[]> = {
  christianity: [
    { title: 'Mere Christianity', author: 'C.S. Lewis', description: 'A widely read introduction to Christian theology, originally delivered as BBC radio talks during World War II.', amazonUrl: 'https://www.amazon.com/dp/0060652926' },
    { title: 'The New Oxford Annotated Bible (NRSV)', author: 'Michael D. Coogan (ed.)', description: 'The standard academic study Bible with scholarly annotations, maps, and essays.', amazonUrl: 'https://www.amazon.com/dp/0190276088' },
    { title: 'Christianity: The First Three Thousand Years', author: 'Diarmaid MacCulloch', description: 'A comprehensive, award-winning history of Christianity from its origins to the present.', amazonUrl: 'https://www.amazon.com/dp/0143118692' },
    { title: 'The Story of Christianity (2 vols.)', author: 'Justo L. González', description: 'An accessible and widely used survey of Christian history, popular in college courses.', amazonUrl: 'https://www.amazon.com/dp/006185588X' },
  ],
  islam: [
    { title: 'No god but God: The Origins, Evolution, and Future of Islam', author: 'Reza Aslan', description: 'A bestselling, accessible introduction to Islam\'s history, theology, and internal debates.', amazonUrl: 'https://www.amazon.com/dp/0812982444' },
    { title: 'The Qur\'an (Oxford World\'s Classics)', author: 'M.A.S. Abdel Haleem (trans.)', description: 'A widely praised modern English translation by an Oxford scholar, clear and readable.', amazonUrl: 'https://www.amazon.com/dp/0199535957' },
    { title: 'Islam: The Straight Path', author: 'John L. Esposito', description: 'A standard college textbook providing a comprehensive overview of Islamic beliefs, history, and contemporary issues.', amazonUrl: 'https://www.amazon.com/dp/0190632151' },
    { title: 'Muhammad: His Life Based on the Earliest Sources', author: 'Martin Lings', description: 'A beautifully written biography of the Prophet Muhammad drawn from the earliest Arabic sources.', amazonUrl: 'https://www.amazon.com/dp/1594771537' },
  ],
  hinduism: [
    { title: 'The Bhagavad Gita (Easwaran translation)', author: 'Eknath Easwaran (trans.)', description: 'One of the most accessible and widely read English translations of Hinduism\'s best-known scripture.', amazonUrl: 'https://www.amazon.com/dp/1586380192' },
    { title: 'An Introduction to Hinduism', author: 'Gavin Flood', description: 'A comprehensive academic introduction covering history, philosophy, practice, and regional diversity.', amazonUrl: 'https://www.amazon.com/dp/0521438780' },
    { title: 'The Hindus: An Alternative History', author: 'Wendy Doniger', description: 'A sweeping narrative history of Hinduism emphasizing its diversity, creativity, and internal debates.', amazonUrl: 'https://www.amazon.com/dp/0143116533' },
    { title: 'Am I a Hindu?', author: 'Ed Viswanathan', description: 'A conversational Q&A format introduction to Hindu beliefs and practices, accessible to beginners.', amazonUrl: 'https://www.amazon.com/dp/1538150689' },
  ],
  buddhism: [
    { title: 'What the Buddha Taught', author: 'Walpola Rahula', description: 'A concise, authoritative introduction to Theravada Buddhist doctrine by a Sri Lankan monk-scholar.', amazonUrl: 'https://www.amazon.com/dp/0802130313' },
    { title: 'The Foundations of Buddhism', author: 'Rupert Gethin', description: 'An excellent academic introduction covering all major Buddhist schools and concepts.', amazonUrl: 'https://www.amazon.com/dp/0192892231' },
    { title: 'An Introduction to Buddhism', author: 'Peter Harvey', description: 'A comprehensive textbook covering Theravada, Mahayana, and Vajrayana traditions in historical and doctrinal detail.', amazonUrl: 'https://www.amazon.com/dp/0521676746' },
    { title: 'The Heart of the Buddha\'s Teaching', author: 'Thich Nhat Hanh', description: 'A warm, accessible introduction to core Buddhist teachings by one of the most beloved Buddhist teachers of the modern era.', amazonUrl: 'https://www.amazon.com/dp/0767903692' },
  ],
  judaism: [
    { title: 'Judaism: A Very Short Introduction', author: 'Norman Solomon', description: 'A compact, balanced overview of Jewish history, belief, practice, and diversity.', amazonUrl: 'https://www.amazon.com/dp/0199687358' },
    { title: 'The Jewish Study Bible (TANAKH)', author: 'Adele Berlin & Marc Zvi Brettler (eds.)', description: 'The standard annotated edition of the Hebrew Bible with scholarly commentary from a Jewish perspective.', amazonUrl: 'https://www.amazon.com/dp/0199978468' },
    { title: 'A History of the Jews', author: 'Paul Johnson', description: 'A sweeping, readable narrative history of the Jewish people from antiquity to the modern era.', amazonUrl: 'https://www.amazon.com/dp/0060915331' },
    { title: 'To Be a Jew', author: 'Hayim Halevy Donin', description: 'A practical guide to Jewish observance, covering daily life, holidays, prayers, and lifecycle events.', amazonUrl: 'https://www.amazon.com/dp/0465086322' },
  ],
  sikhism: [
    { title: 'The Sikhs', author: 'Patwant Singh', description: 'A comprehensive, readable history of the Sikh people from Guru Nanak to the present.', amazonUrl: 'https://www.amazon.com/dp/0385502060' },
    { title: 'Sikhism: A Very Short Introduction', author: 'Eleanor Nesbitt', description: 'A concise academic introduction to Sikh history, beliefs, practices, and contemporary issues.', amazonUrl: 'https://www.amazon.com/dp/0192806017' },
    { title: 'A History of the Sikhs (2 vols.)', author: 'Khushwant Singh', description: 'The definitive history of the Sikhs, covering the period from 1469 to the present.', amazonUrl: 'https://www.amazon.com/dp/0195673085' },
    { title: 'The Guru Granth Sahib (selections)', author: 'Various translators', description: 'Selections from the Sikh sacred scripture, the eternal Guru of the Sikh faith.', amazonUrl: 'https://www.amazon.com/dp/0140449582' },
  ],
  'bahai-faith': [
    { title: 'Bahá\'u\'lláh and the New Era', author: 'J.E. Esslemont', description: 'The standard introductory text on the Bahá\'í Faith, covering its history, principles, and global community.', amazonUrl: 'https://www.amazon.com/dp/0877432147' },
    { title: 'The Bahá\'í Faith: A Short Introduction', author: 'Moojan Momen', description: 'A concise academic overview of Bahá\'í history, theology, and social teachings.', amazonUrl: 'https://www.amazon.com/dp/1851682090' },
    { title: 'God Speaks Again: An Introduction to the Bahá\'í Faith', author: 'Kenneth E. Bowers', description: 'An accessible, well-structured introduction for general readers.', amazonUrl: 'https://www.amazon.com/dp/1931847126' },
  ],
  jainism: [
    { title: 'The Jains', author: 'Paul Dundas', description: 'The standard academic introduction to Jain history, philosophy, and practice.', amazonUrl: 'https://www.amazon.com/dp/0415266068' },
    { title: 'Jainism: An Introduction', author: 'Jeffery D. Long', description: 'A comprehensive, accessible introduction covering doctrine, ethics, and contemporary Jain life.', amazonUrl: 'https://www.amazon.com/dp/1845116267' },
    { title: 'The Heart of Jainism', author: 'Sinclair Stevenson', description: 'A classic study of Jain belief and practice, still widely referenced for its depth.', amazonUrl: 'https://www.amazon.com/dp/8121509432' },
  ],
  shinto: [
    { title: 'Shinto: The Way Home', author: 'Thomas P. Kasulis', description: 'A thoughtful introduction exploring Shinto\'s relationship to Japanese culture, nature, and identity.', amazonUrl: 'https://www.amazon.com/dp/0824836189' },
    { title: 'A Year in the Life of a Shinto Shrine', author: 'John K. Nelson', description: 'An ethnographic account of daily life and annual rituals at a major Shinto shrine.', amazonUrl: 'https://www.amazon.com/dp/0295975008' },
    { title: 'Shinto: A Short History', author: 'Inoue Nobutaka (ed.)', description: 'A concise academic history covering Shinto from its origins to its modern forms.', amazonUrl: 'https://www.amazon.com/dp/0415319137' },
  ],
  taoism: [
    { title: 'Tao Te Ching', author: 'Lao Tzu (Stephen Mitchell trans.)', description: 'One of the most popular English translations of Taoism\'s foundational text, praised for its clarity and beauty.', amazonUrl: 'https://www.amazon.com/dp/0061142662' },
    { title: 'The Tao of Pooh', author: 'Benjamin Hoff', description: 'A beloved, playful introduction to Taoist principles using the characters of Winnie-the-Pooh.', amazonUrl: 'https://www.amazon.com/dp/0140067477' },
    { title: 'Daoism: A Short Introduction', author: 'James Miller', description: 'A concise academic overview of Taoist history, philosophy, ritual, and contemporary practice.', amazonUrl: 'https://www.amazon.com/dp/1851682538' },
  ],
  zoroastrianism: [
    { title: 'Zoroastrians: Their Religious Beliefs and Practices', author: 'Mary Boyce', description: 'The standard introduction by the leading Western scholar of Zoroastrianism.', amazonUrl: 'https://www.amazon.com/dp/0415239028' },
    { title: 'The Good Religion: A Primer on Zoroastrianism', author: 'Roshan Rivetna (ed.)', description: 'An accessible introduction for general readers, covering belief, practice, and community life.', amazonUrl: 'https://www.amazon.com/dp/0988886200' },
    { title: 'In Search of Zarathustra', author: 'Paul Kriwaczek', description: 'A travel-and-history narrative exploring Zoroastrian influence on Judaism, Christianity, and Islam.', amazonUrl: 'https://www.amazon.com/dp/1400031427' },
  ],
  'indigenous-traditions': [
    { title: 'God Is Red: A Native View of Religion', author: 'Vine Deloria Jr.', description: 'A foundational work contrasting Indigenous spiritual worldviews with Western Christianity.', amazonUrl: 'https://www.amazon.com/dp/1555914985' },
    { title: 'Indigenous Religions: A Companion', author: 'Graham Harvey (ed.)', description: 'A comprehensive academic collection covering indigenous traditions across the globe.', amazonUrl: 'https://www.amazon.com/dp/0304704482' },
    { title: 'The Sacred Hoop: Recovering the Feminine in American Indian Traditions', author: 'Paula Gunn Allen', description: 'An influential study of women\'s roles and the feminine sacred in Native American cultures.', amazonUrl: 'https://www.amazon.com/dp/0807046175' },
  ],
  druze: [
    { title: 'The Druze: A New Study of Their History, Faith and Society', author: 'Abbas Halabi', description: 'A readable overview of Druze history, theology, and community life by a Druze scholar.', amazonUrl: 'https://www.amazon.com/dp/9004188452' },
    { title: 'The Druze Faith', author: 'Sami Nasib Makarem', description: 'A concise introduction to Druze beliefs and practices by a respected Druze author.', amazonUrl: 'https://www.amazon.com/dp/1463206399' },
  ],
  'unitarian-universalism': [
    { title: 'A Chosen Faith: An Introduction to Unitarian Universalism', author: 'John A. Buehrens & Forrest Church', description: 'The most widely read introduction to UU history, principles, and what draws people to the tradition.', amazonUrl: 'https://www.amazon.com/dp/0807016179' },
    { title: 'The Unitarian Universalist Pocket Guide', author: 'Various contributors', description: 'A compact overview of UU beliefs, practices, and community life.', amazonUrl: 'https://www.amazon.com/dp/1558966218' },
  ],
  catholicism: [
    { title: 'Catholicism: A Journey to the Heart of the Faith', author: 'Robert Barron', description: 'A visually rich, accessible introduction to Catholic faith and culture by a prominent bishop and media personality.', amazonUrl: 'https://www.amazon.com/dp/0307720527' },
    { title: 'Catechism of the Catholic Church', author: 'Catholic Church', description: 'The official comprehensive summary of Catholic doctrine, covering faith, sacraments, morals, and prayer.', amazonUrl: 'https://www.amazon.com/dp/0385508190' },
    { title: 'The Church in History', author: 'B.K. Kuiper', description: 'A widely used historical overview of the Catholic Church from its beginnings through the modern era.', amazonUrl: 'https://www.amazon.com/dp/0802817327' },
  ],
  protestantism: [
    { title: 'Christianity\'s Dangerous Idea', author: 'Alister McGrath', description: 'A comprehensive history of Protestantism from Luther to the present, exploring its revolutionary impact.', amazonUrl: 'https://www.amazon.com/dp/0061436860' },
    { title: 'The Reformation', author: 'Diarmaid MacCulloch', description: 'A magisterial history of the Protestant Reformation and its lasting consequences.', amazonUrl: 'https://www.amazon.com/dp/0143035384' },
    { title: 'Protestantism: A Very Short Introduction', author: 'Mark A. Noll', description: 'A concise, balanced overview of Protestant history, theology, and global diversity.', amazonUrl: 'https://www.amazon.com/dp/0199560978' },
  ],
  'orthodox-christianity': [
    { title: 'The Orthodox Church', author: 'Timothy (Kallistos) Ware', description: 'The standard English-language introduction to Eastern Orthodox history, theology, and worship.', amazonUrl: 'https://www.amazon.com/dp/0140146563' },
    { title: 'The Orthodox Way', author: 'Kallistos Ware', description: 'A companion volume exploring Orthodox spirituality, theology, and the inner life of faith.', amazonUrl: 'https://www.amazon.com/dp/0913836583' },
    { title: 'The Mystical Theology of the Eastern Church', author: 'Vladimir Lossky', description: 'A classic introduction to Orthodox theological tradition, focusing on the mystical dimension.', amazonUrl: 'https://www.amazon.com/dp/0913836311' },
  ],
  'jehovahs-witnesses': [
    { title: 'Jehovah\'s Witnesses: Continuity and Change', author: 'George D. Chryssides', description: 'An academic study of Witness history, theology, and organizational development.', amazonUrl: 'https://www.amazon.com/dp/1409456069' },
    { title: 'Apocalypse Delayed: The Story of Jehovah\'s Witnesses', author: 'M. James Penton', description: 'A comprehensive history by a former Witness and academic, widely cited in scholarly literature.', amazonUrl: 'https://www.amazon.com/dp/0802079733' },
  ],
  'latter-day-saints': [
    { title: 'The Mormon People', author: 'Matthew Bowman', description: 'A balanced, readable narrative history of the Latter-day Saint movement from Joseph Smith to the present.', amazonUrl: 'https://www.amazon.com/dp/0679644903' },
    { title: 'Rough Stone Rolling: A Cultural Biography of Mormonism\'s Founder', author: 'Richard Lyman Bushman', description: 'The most comprehensive scholarly biography of Joseph Smith, written by an eminent LDS historian.', amazonUrl: 'https://www.amazon.com/dp/1400077532' },
  ],
  confucianism: [
    { title: 'Confucius and the Analects', author: 'Annping Chin', description: 'A readable introduction to Confucius\'s life and teachings alongside the Analects.', amazonUrl: 'https://www.amazon.com/dp/0307277836' },
    { title: 'The Analects of Confucius (Slingerland trans.)', author: 'Edward Slingerland (trans.)', description: 'A well-annotated scholarly translation of the foundational Confucian text.', amazonUrl: 'https://www.amazon.com/dp/0872206351' },
  ],
  'secular-humanism': [
    { title: 'Humanism: A Very Short Introduction', author: 'Stephen Law', description: 'A concise overview of humanist ethics, secular reasoning, and the modern humanist tradition.', amazonUrl: 'https://www.amazon.com/dp/0199553645' },
    { title: 'The Little Book of Humanism', author: 'Alice Roberts & Andrew Copson', description: 'A readable collection of short reflections introducing humanist values, meaning, and ethics without theism.', amazonUrl: 'https://www.amazon.com/dp/0349429794' },
    { title: 'The Good Book: A Humanist Bible', author: 'A.C. Grayling', description: 'An anthology of philosophy, poetry, and ethical reflection assembled for secular readers seeking a human-centered wisdom text.', amazonUrl: 'https://www.amazon.com/dp/0802778089' },
  ],
  'african-diaspora': [
    { title: 'Santería: The Beliefs and Rituals of a Growing Religion in America', author: 'Migene González-Wippler', description: 'A widely read introduction to Santería, its ritual world, and its historical development in the Americas.', amazonUrl: 'https://www.amazon.com/dp/0806527919' },
    { title: 'Mama Lola: A Vodou Priestess in Brooklyn', author: 'Karen McCarthy Brown', description: 'A classic ethnographic study that introduces Haitian Vodou through the life and community of a Brooklyn priestess.', amazonUrl: 'https://www.amazon.com/dp/0520219716' },
    { title: 'Black Gods: Orisa Studies in the New World', author: 'John Mason (ed.)', description: 'An accessible collection exploring Yoruba-derived Orisha traditions across the African diaspora.', amazonUrl: 'https://www.amazon.com/dp/0942272627' },
  ],
  'paganism-wicca': [
    { title: 'Drawing Down the Moon', author: 'Margot Adler', description: 'A landmark survey of contemporary Pagan and Wiccan communities, practices, and beliefs in North America.', amazonUrl: 'https://www.amazon.com/dp/0143038197' },
    { title: 'Paganism: An Introduction to Earth-Centered Religions', author: 'Joyce Higginbotham & River Higginbotham', description: 'A clear beginner-friendly introduction to Pagan worldviews, ritual life, and ethics.', amazonUrl: 'https://www.amazon.com/dp/0738702226' },
    { title: 'Wicca: A Guide for the Solitary Practitioner', author: 'Scott Cunningham', description: 'One of the most widely read introductory books for people exploring modern Wiccan practice.', amazonUrl: 'https://www.amazon.com/dp/0875421180' },
  ],
  'seventh-day-adventism': [
    { title: 'Seeking a Sanctuary: Seventh-day Adventism and the American Dream', author: 'Malcolm Bull & Keith Lockhart', description: 'A comprehensive academic study of Adventist history, theology, and sociology.', amazonUrl: 'https://www.amazon.com/dp/0253348803' },
    { title: 'Ellen Harmon White: American Prophet', author: 'Terrie Dopp Aamodt et al. (eds.)', description: 'Scholarly essays examining the life and legacy of the Adventist movement\'s most influential figure.', amazonUrl: 'https://www.amazon.com/dp/0199373876' },
  ],
  'rastafari': [
    { title: 'Rastafari: A Very Short Introduction', author: 'Ennis B. Edmonds', description: 'A concise academic overview of Rastafari history, beliefs, and cultural impact.', amazonUrl: 'https://www.amazon.com/dp/0199584524' },
    { title: 'Dread: The Rastafarians of Jamaica', author: 'Joseph Owens', description: 'A foundational study of Rastafari beliefs and community life based on extensive fieldwork.', amazonUrl: 'https://www.amazon.com/dp/9768100583' },
  ],
  'cao-dai': [
    { title: 'Caodaism: A Vietnamese-Chinese Mystical Tradition', author: 'Sergei Blagov', description: 'An academic study of Caodai\'s syncretic theology, organizational structure, and history.', amazonUrl: 'https://www.amazon.com/dp/1558764003' },
  ],
  'tenrikyo': [
    { title: 'Tenrikyo: The Path to Joyousness', author: 'Tenrikyo Overseas Mission Department', description: 'An official introduction to Tenrikyo\'s foundational teachings and spiritual practice.', amazonUrl: 'https://www.amazon.com/dp/0890760012' },
  ],
};

export const RECOMMENDED_READING: Record<string, BookRecommendation[]> = Object.fromEntries(
  Object.entries(RAW_RECOMMENDED_READING).map(([slug, books]) => [
    slug,
    books.map((book, index) => enrichBook(slug, book, index)),
  ])
) as Record<string, BookRecommendation[]>;
