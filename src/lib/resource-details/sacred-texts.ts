import { buildAmazonSearchUrl } from '@/lib/affiliate-links';
import { readingTimeLabel, slugify } from '@/lib/resource-details/helpers';
import type { ResourceDetailEntry } from '@/lib/resource-details/types';

export interface SacredTextEdition {
  label: string;
  note: string;
  query: string;
  amazonUrl: string;
}

export interface SacredTextDetailEntry extends ResourceDetailEntry {
  editions: SacredTextEdition[];
}

interface SacredTextSeedEdition {
  label: string;
  note: string;
  query: string;
}

interface SacredTextSeed {
  title: string;
  tradition: string;
  traditionHref: string;
  description: string;
  significance: string;
  readingAdvice: string;
  history: string;
  structure: string;
  practice: string;
  editions: SacredTextSeedEdition[];
}

const SACRED_TEXT_SEEDS: SacredTextSeed[] = [
  {
    title: 'The Bible',
    tradition: 'Christianity',
    traditionHref: '/religions/christianity',
    description: 'A library of texts central to Christian faith, worship, theology, and ethics.',
    significance: 'Its diverse books shape doctrine, liturgy, moral reasoning, and the story Christians tell about creation, covenant, Jesus, and the church.',
    readingAdvice: 'Beginners usually do best starting with a Gospel and an annotated study edition rather than reading straight through without context.',
    history: 'The Bible formed across many centuries in Hebrew, Aramaic, and Greek. Christian communities also preserved somewhat different canons over time, which is why Protestant, Catholic, and Orthodox Bibles are not always identical in contents or ordering [1][2].',
    structure: 'Most Christians encounter the Bible as Old Testament and New Testament collections containing law, narrative, poetry, prophecy, gospels, letters, and apocalyptic writing. That variety matters because different genres ask to be read in different ways [1][2].',
    practice: 'Biblical passages are proclaimed in worship, memorized in prayer, interpreted in sermons, and studied in small groups, seminaries, and homes. Many churches meet the Bible through lectionaries, so scripture is often heard inside a liturgical cycle rather than only through private sequential reading [1][2][3].',
    editions: [
      { label: 'NRSV Bible', note: 'A respected translation for broad academic and ecumenical use.', query: 'NRSV Bible' },
      { label: 'NIV Study Bible', note: 'A widely used evangelical study edition with notes and maps.', query: 'NIV Study Bible' },
      { label: 'ESV Study Bible', note: 'A popular study Bible with extensive essays and commentary.', query: 'ESV Study Bible' },
    ],
  },
  {
    title: 'The Quran',
    tradition: 'Islam',
    traditionHref: '/religions/islam',
    description: 'The central scripture of Islam, believed by Muslims to be divine revelation in Arabic.',
    significance: 'It anchors theology, law, prayer, ethics, and devotional recitation across Muslim communities.',
    readingAdvice: 'A reliable translation with introductions to surahs, revelation context, and key themes makes the text more approachable for first-time readers.',
    history: 'Muslims understand the Quran as revelation delivered to the Prophet Muhammad in Arabic and then collected into a written codex within the earliest Muslim community. Questions about recitation, textual preservation, and revelation setting therefore matter from the first page [1][2].',
    structure: 'The Quran contains 114 surahs of varying length, organized neither as simple chronology nor as a single narrative arc. Readers move among proclamation, warning, prayer, legal guidance, stories of earlier prophets, and theological reflection [1][2].',
    practice: 'In Muslim life the Quran is recited aloud in ritual prayer, memorized in part or in full, studied with tafsir commentary, and heard intensively during Ramadan. Its role is therefore sonic and devotional as well as literary and doctrinal [1][2][3].',
    editions: [
      { label: 'The Quran, Abdel Haleem translation', note: 'A highly regarded Oxford translation in clear modern English.', query: 'Quran Abdel Haleem Oxford' },
      { label: 'The Quran, Sahih International', note: 'A common English translation used by many readers.', query: 'Quran Sahih International' },
    ],
  },
  {
    title: 'The Torah',
    tradition: 'Judaism',
    traditionHref: '/religions/judaism',
    description: 'The foundational written teaching at the heart of Jewish scripture and communal life.',
    significance: 'Torah shapes covenant, law, memory, worship, and the interpretive traditions that surround Jewish learning.',
    readingAdvice: 'Reading the Torah with Jewish commentary and liturgical context prevents beginners from missing how the text functions in living communities.',
    history: 'Torah refers especially to the Five Books of Moses as transmitted in Hebrew scripture and interpreted within Jewish tradition. Its authority has never been isolated from commentary, law, synagogue reading, and communal memory [1][2].',
    structure: 'The Torah moves from creation and the patriarchs through exodus, covenant, wilderness formation, ritual law, and final speeches before entry into the land. Narrative and law are deeply intertwined, which means legal passages are embedded in a larger covenant story [1][2].',
    practice: 'In Jewish life the Torah is read publicly from a scroll, studied with classic commentators, and revisited through annual reading cycles, festivals, and lifecycle events. A beginner who notices only content but not liturgical setting will miss much of its lived meaning [1][2][3].',
    editions: [
      { label: 'JPS Torah translation', note: 'A standard Jewish English translation for many learners.', query: 'Torah JPS translation' },
      { label: 'ArtScroll Stone Edition Torah', note: 'A widely used Orthodox edition with notes and commentary.', query: 'Torah Stone Edition Artscroll' },
    ],
  },
  {
    title: 'The Talmud',
    tradition: 'Judaism',
    traditionHref: '/religions/judaism',
    description: 'A foundational rabbinic compendium of legal reasoning, debate, and interpretation.',
    significance: 'The Talmud is essential for understanding how Jewish law, commentary, and communal reasoning developed over time.',
    readingAdvice: 'New readers should begin with guides to rabbinic method before attempting sustained direct reading.',
    history: 'The Talmud grew from the Mishnah and later rabbinic discussions known as Gemara, with major centers of compilation in late antique Palestine and Babylonia. The Babylonian Talmud became especially authoritative in much of later Judaism [1][2].',
    structure: 'Its tractates are arranged by legal subject, but within each tractate readers encounter argument, precedent, scriptural interpretation, storytelling, and conceptual debate. That layered form is part of the point, since rabbinic authority emerges through reasoning rather than through a single uninterrupted voice [1][2].',
    practice: 'The Talmud is studied in yeshivot, synagogues, classrooms, and paired learning settings such as chavruta. Even communities that never read full tractates directly are shaped by the legal and interpretive traditions that Talmudic study sustained [1][2][3].',
    editions: [
      { label: 'Steinsaltz Talmud in English', note: 'A common gateway edition for English readers.', query: 'Talmud English Steinsaltz' },
    ],
  },
  {
    title: 'The Bhagavad Gita',
    tradition: 'Hinduism',
    traditionHref: '/religions/hinduism',
    description: 'A major Hindu scripture presented as a dialogue about duty, action, devotion, and liberation.',
    significance: 'Its enduring importance comes from the way it brings philosophy, ethics, and devotion into one accessible narrative setting.',
    readingAdvice: 'A translation with notes helps readers understand the epic, philosophical, and devotional layers of the text.',
    history: 'The Bhagavad Gita appears within the Mahabharata, where it frames a crisis of duty on the battlefield. Over time it became one of the most translated, commented upon, and globally recognized Hindu scriptures [1][2].',
    structure: 'Its eighteen chapters unfold as a dialogue between Arjuna and Krishna, moving among karma yoga, jnana yoga, bhakti, cosmic revelation, and reflections on disciplined action. The text works because philosophical teaching is carried by a dramatic moral crisis rather than by abstract lecture alone [1][2].',
    practice: 'Many Hindus recite verses from the Gita, study it in satsang or classroom settings, and use it for ethical reflection, devotional inspiration, and philosophical orientation. It is often the first Hindu scripture recommended to beginners because it is compact, teachable, and widely available in English [1][2][3].',
    editions: [
      { label: 'Bhagavad Gita, Easwaran translation', note: 'A very accessible English translation for beginners.', query: 'Bhagavad Gita Easwaran translation' },
      { label: 'Bhagavad Gita, Penguin Classics', note: 'A widely available annotated edition.', query: 'Bhagavad Gita Penguin Classics' },
    ],
  },
  {
    title: 'The Vedas',
    tradition: 'Hinduism',
    traditionHref: '/religions/hinduism',
    description: 'Ancient Sanskrit scriptures foundational to the historical development of Hindu traditions.',
    significance: 'The Vedas matter historically, ritually, and symbolically even for many Hindus who do not read them devotionally in daily life.',
    readingAdvice: 'Beginners often benefit from overview essays first because the Vedas are older, more layered, and less immediately accessible than later devotional texts.',
    history: 'The Vedas are among the oldest surviving Sanskrit materials and were preserved through exceptionally careful oral transmission long before modern print editions. Their authority in Hindu traditions is tied not only to content but to antiquity, recitation, and ritual status [1][2].',
    structure: 'Readers usually distinguish the Rig, Yajur, Sama, and Atharva Vedas, each with hymn collections and later ritual or interpretive layers such as Brahmanas and Aranyakas. This is not one small volume but a textual world with multiple strata and functions [1][2].',
    practice: 'For many Hindus the Vedas are encountered indirectly through ritual prestige, chant traditions, priestly learning, and later schools of philosophy rather than through casual direct reading. That is one reason beginner guides often recommend selected hymns and scholarly introductions instead of cover-to-cover reading [1][2][3].',
    editions: [
      { label: 'Rig Veda, Penguin Classics', note: 'A mainstream English edition useful for introductory sampling.', query: 'Rig Veda Penguin Classics' },
    ],
  },
  {
    title: 'The Upanishads',
    tradition: 'Hinduism',
    traditionHref: '/religions/hinduism',
    description: 'Philosophical texts exploring selfhood, ultimate reality, and liberation.',
    significance: 'They have profoundly shaped Hindu thought on Brahman, Atman, knowledge, and the spiritual goal of liberation.',
    readingAdvice: 'Reading selected Upanishads with commentary works better than approaching them as a single uniform book.',
    history: 'The Upanishads emerged in the later Vedic period and became decisive for many currents of Hindu philosophy, especially Vedanta. Their prestige rests partly on antiquity and partly on the depth of the questions they ask about self, reality, and release [1][2].',
    structure: 'There are multiple Upanishads, not one single text, and they vary in style from compact instruction to extended dialogue and visionary teaching. Many famous passages are short, but they sit inside larger interpretive traditions that later commentators helped define [1][2].',
    practice: 'The Upanishads are studied in philosophical schools, quoted in devotional and monastic settings, and used by readers interested in contemplative Hindu thought. In practice, many newcomers encounter them through anthologies or guided translations rather than through the full classical corpus [1][2][3].',
    editions: [
      { label: 'Upanishads, Easwaran translation', note: 'A readable gateway edition for general readers.', query: 'Upanishads Easwaran translation' },
    ],
  },
  {
    title: 'The Tripitaka (Pali Canon)',
    tradition: 'Buddhism',
    traditionHref: '/religions/buddhism',
    description: 'A major Buddhist canonical collection preserved in the Theravada tradition.',
    significance: 'It preserves early teachings on monastic discipline, sermons, and doctrine that remain central to Buddhist study and practice.',
    readingAdvice: 'Start with selected discourses, anthologies, or the Dhammapada before diving into the full canonical structure.',
    history: 'The Pali Canon was transmitted orally and later written down within Theravada Buddhist communities, especially in Sri Lanka. It is often treated as the closest large surviving witness to early Buddhist teaching, though even that statement requires historical nuance [1][2].',
    structure: 'Tripitaka means three baskets, referring to Vinaya, Sutta, and Abhidhamma collections. Together they address monastic discipline, discourses attributed to the Buddha and key disciples, and later doctrinal analysis [1][2].',
    practice: 'Most Buddhists do not read the full canon straight through. Instead they meet selected suttas, liturgical excerpts, chanting passages, or curated anthologies in monastic instruction, meditation settings, and study groups, which makes a guided anthology a much better first purchase than the entire canon [1][2][3].',
    editions: [
      { label: 'In the Buddha\'s Words', note: 'A respected anthology of early discourses translated and curated by Bhikkhu Bodhi.', query: 'In the Buddha\'s Words Bhikkhu Bodhi' },
    ],
  },
  {
    title: 'The Dhammapada',
    tradition: 'Buddhism',
    traditionHref: '/religions/buddhism',
    description: 'A widely read Buddhist anthology of verses on ethical and spiritual life.',
    significance: 'Its concise form has made it one of the most approachable and globally read Buddhist texts.',
    readingAdvice: 'The Dhammapada is best read slowly, with attention to commentary and the larger doctrinal setting of Buddhist ethics and liberation.',
    history: 'The Dhammapada belongs to the Khuddaka Nikaya within the Pali Canon and gathered verses that became especially portable across languages and cultures. Its accessibility made it one of the Buddhist texts most widely translated into English [1][2].',
    structure: 'Its short chapters group verses by themes such as mind, heedfulness, anger, fools, the wise, and the path. Because the format is aphoristic, readers can mistake memorable sayings for free-floating wisdom unless they reconnect them to the broader Buddhist path [1][2].',
    practice: 'The Dhammapada is often quoted in sermons, beginner classes, meditation communities, gift editions, and daily devotional reading. It works well as a first text precisely because it is small, but it works best when paired with explanation of karma, suffering, and liberation [1][2][3].',
    editions: [
      { label: 'The Dhammapada, Easwaran translation', note: 'A very approachable literary translation for beginners.', query: 'Dhammapada Easwaran' },
      { label: 'The Dhammapada, Penguin Classics', note: 'A mainstream edition with helpful framing.', query: 'Dhammapada Penguin Classics' },
    ],
  },
  {
    title: 'The Lotus Sutra',
    tradition: 'Buddhism',
    traditionHref: '/religions/buddhism',
    description: 'A highly influential Mahayana scripture with major importance in East Asian Buddhism.',
    significance: 'It shaped ideas of skillful means, buddhahood, devotion, and universal access to awakening in many Mahayana communities.',
    readingAdvice: 'Readers should learn at least the broad difference between Theravada and Mahayana before beginning the Lotus Sutra.',
    history: 'The Lotus Sutra emerged within the Mahayana Buddhist world and became especially important in Chinese, Korean, and Japanese traditions. It is best approached as a scripture with a long reception history, not only as a document to date narrowly [1][2].',
    structure: 'The text combines sermons, parables, cosmic scenes, prophecy, and devotional promises. Famous passages on skillful means and universal buddhahood become much clearer when readers see how the sutra persuades as much through imagery and narrative as through argument [1][2].',
    practice: 'The Lotus Sutra is chanted, copied, revered, commented upon, and doctrinally centered in traditions such as Tiantai, Tendai, and Nichiren forms of Buddhism. That devotional and ritual use is part of why the text feels different from a modern classroom anthology [1][2][3].',
    editions: [
      { label: 'The Lotus Sutra, Burton Watson translation', note: 'A common English starting point for general readers.', query: 'Lotus Sutra Burton Watson' },
      { label: 'The Lotus Sutra, Gene Reeves translation', note: 'Another readable English edition used in study groups.', query: 'Lotus Sutra Gene Reeves' },
    ],
  },
  {
    title: 'The Guru Granth Sahib',
    tradition: 'Sikhism',
    traditionHref: '/religions/sikhism',
    description: 'The Sikh scripture revered as the eternal Guru.',
    significance: 'It functions not only as scripture but as the continuing spiritual authority of the Sikh community.',
    readingAdvice: 'A guide to Sikh history and worship will help readers understand why the text is approached with such reverence.',
    history: 'The Guru Granth Sahib was compiled from the hymns of Sikh Gurus and other revered saints, and it reached its final form under Guru Gobind Singh, after which it became the eternal Guru of the Sikh community. That transition from book to living authority is central to Sikh understanding [1][2].',
    structure: 'Its hymns are arranged largely by musical measure, or raga, which means the text is organized for sung performance as well as for reading. The arrangement itself teaches readers that worship, music, and scripture cannot be sharply separated here [1][2].',
    practice: 'In gurdwaras the Guru Granth Sahib is enthroned, ceremonially opened, sung through kirtan, and treated with visible bodily reverence. English readers who approach it only as a printed anthology miss the ritual, communal, and musical framework that gives it meaning [1][2][3].',
    editions: [
      { label: 'Guru Granth Sahib in English translation', note: 'Search for accessible English translations and selections.', query: 'Guru Granth Sahib English translation' },
    ],
  },
  {
    title: 'The Tao Te Ching',
    tradition: 'Taoism',
    traditionHref: '/religions/taoism',
    description: 'A foundational Taoist text of brief, poetic reflections on the Dao and right action.',
    significance: 'Its influence extends across philosophy, spirituality, political reflection, and global modern interpretations of Taoism.',
    readingAdvice: 'Because translations differ sharply, comparing editions or reading with commentary is especially useful.',
    history: 'The Tao Te Ching is traditionally linked to Laozi, though scholars debate its formation and redaction across early Chinese history. For beginners, that matters less than recognizing that the text comes from a very different linguistic and philosophical world than modern self-help writing [1][2].',
    structure: 'Most editions present eighty-one brief chapters that move through paradox, political wisdom, contemplative insight, and reflections on non-forceful action. Its compression is part of both its power and its difficulty, because translators inevitably make strong interpretive choices [1][2].',
    practice: 'The Tao Te Ching is read in philosophical study, meditative reflection, popular spirituality, and comparative religion classrooms. It is also one of the most mistranslated and selectively quoted religious texts in English, which is why careful editions matter so much [1][2][3].',
    editions: [
      { label: 'Tao Te Ching, Stephen Mitchell', note: 'A very popular and readable English rendering.', query: 'Tao Te Ching Stephen Mitchell' },
      { label: 'Tao Te Ching, Penguin Classics', note: 'A common mainstream edition for students.', query: 'Tao Te Ching Penguin Classics' },
    ],
  },
  {
    title: 'The Zhuangzi',
    tradition: 'Taoism',
    traditionHref: '/religions/taoism',
    description: 'A classic Taoist text known for narrative, paradox, and philosophical playfulness.',
    significance: 'It widens the Taoist imagination beyond formulaic slogans and presents a richer vision of spontaneity, perspective, and transformation.',
    readingAdvice: 'Beginners should approach the Zhuangzi as philosophical literature rather than a doctrinal manual.',
    history: 'The Zhuangzi developed through early Chinese philosophical transmission and later editorial shaping, which means the text contains layers rather than a single authorial voice in the modern sense. Even so, its distinctive style made it one of the classic pillars of Taoist thought [1][2].',
    structure: 'Readers often distinguish inner, outer, and miscellaneous chapters, with storytelling, absurd dialogue, and perspective shifts doing much of the philosophical work. The book rewards slow reading because its arguments are often carried by images rather than by straight exposition [1][2].',
    practice: 'The Zhuangzi is encountered in philosophy courses, contemplative reading, Taoist study, and literary traditions that value its humor and anti-rigidity. Many readers find it easier to enter after they have first met core Taoist vocabulary through the Tao Te Ching [1][2][3].',
    editions: [
      { label: 'Zhuangzi, Brook Ziporyn translation', note: 'A respected modern English translation.', query: 'Zhuangzi Brook Ziporyn translation' },
      { label: 'Chuang Tzu, Burton Watson translation', note: 'A classic readable English edition.', query: 'Chuang Tzu Burton Watson translation' },
    ],
  },
  {
    title: 'The Analects',
    tradition: 'Confucianism',
    traditionHref: '/religions/confucianism',
    description: 'A foundational Confucian collection of sayings and dialogues associated with Confucius.',
    significance: 'The text shaped moral cultivation, education, governance, and ritual propriety across East Asia.',
    readingAdvice: 'An annotated translation is essential because the text is concise and culturally dense.',
    history: 'The Analects likely took shape through the sayings and teaching memories of Confucius and his disciples before later compilation. For centuries it stood near the center of Confucian education, political formation, and classical commentary across East Asia [1][2].',
    structure: 'Its short books collect aphorisms, anecdotes, brief conversations, and moral observations rather than one long systematic treatise. That brevity can mislead modern readers into oversimplification unless they read with commentary and historical context [1][2].',
    practice: 'The Analects has been used in moral education, civil service culture, family instruction, and philosophical self-cultivation. Even where formal Confucian institutions weakened, its ideals about ritual propriety, humane conduct, and disciplined character remained culturally influential [1][2][3].',
    editions: [
      { label: 'Analects, Penguin Classics', note: 'A reliable mainstream English option for many readers.', query: 'Analects Confucius Penguin Classics' },
    ],
  },
  {
    title: 'The Avesta',
    tradition: 'Zoroastrianism',
    traditionHref: '/religions/zoroastrianism',
    description: 'The surviving scriptural corpus of Zoroastrianism.',
    significance: 'It preserves liturgy, hymns, and doctrinal elements central to Zoroastrian ritual and memory.',
    readingAdvice: 'A general introduction to Zoroastrian history should come first, since the surviving corpus is specialized and fragmentary.',
    history: 'The Avesta survives only in part from what was once a larger Zoroastrian textual world, and its materials were transmitted through liturgical preservation as well as manuscript tradition. That fragmentary survival is one reason the text can feel difficult to newcomers [1][2].',
    structure: 'Modern readers meet sections such as the Gathas, Yasna, Visperad, Vendidad, and Yashts, each with different ritual or literary roles. Some portions are especially ancient and liturgical, while others preserve later religious and legal material [1][2].',
    practice: 'Zoroastrian communities encounter the Avesta above all in prayer and ritual settings, not only through private reading. English editions are valuable for orientation, but a beginner also needs history of the community, priestly practice, and Persian context to make sense of what is being read [1][2][3].',
    editions: [
      { label: 'Avesta in English', note: 'Search for English editions of the main Zoroastrian scriptures.', query: 'Avesta Zoroastrian scripture English' },
    ],
  },
  {
    title: 'The Kojiki',
    tradition: 'Shinto',
    traditionHref: '/religions/shinto',
    description: 'An early Japanese text preserving mythic and genealogical material important to Shinto history.',
    significance: 'It matters for understanding kami narratives, imperial mythology, and the literary background of Shinto tradition.',
    readingAdvice: 'Readers should distinguish between historical Shinto practice and the literary role of the Kojiki in state and mythic imagination.',
    history: 'Compiled in the early eighth century, the Kojiki preserves mythic narratives, genealogies, and courtly memory that later became important for understanding Japanese religious history. It is not simply a timeless manual of shrine practice [1][2].',
    structure: 'The text moves through cosmogony, kami narratives, and dynastic genealogy rather than through law or direct devotional instruction. That makes it especially useful for origins, mythic imagination, and political-religious symbolism [1][2].',
    practice: 'Many people interested in Shinto never read the Kojiki directly, because shrine life is more often learned through ritual, festival, prayer forms, and local custom. Still, the Kojiki remains a key doorway for understanding the mythic world that later Shinto discourse drew upon [1][2][3].',
    editions: [
      { label: 'Kojiki in English translation', note: 'Search for a readable English translation with notes.', query: 'Kojiki English translation' },
    ],
  },
  {
    title: 'The Kitab-i-Aqdas',
    tradition: 'Baha’i Faith',
    traditionHref: '/religions/bahai-faith',
    description: 'A central text of Baha’i law and guidance.',
    significance: 'It is important for understanding the Baha’i approach to law, ethics, community order, and spiritual practice.',
    readingAdvice: 'Beginners benefit from first reading a general Baha’i introduction so the legal and theological setting is clear.',
    history: 'The Kitab-i-Aqdas was written by Bahá’u’lláh in the nineteenth century and became a central source for Baha’i law, devotion, and community order. Its role is closely tied to later authorized interpretation and community application [1][2].',
    structure: 'Readers encounter laws, exhortations, spiritual counsel, and social guidance rather than one purely narrative or doctrinal work. The text is therefore best read with introductory framing about Baha’i history and the broader place of law within the faith [1][2].',
    practice: 'Baha’is do not use the Kitab-i-Aqdas in isolation. It is read alongside prayer, community consultation, authorized interpretations, and broader Baha’i teachings on unity, ethics, and spiritual discipline. That context keeps beginners from reducing it to an isolated rulebook [1][2][3].',
    editions: [
      { label: 'Kitab-i-Aqdas', note: 'Search for mainstream editions and study companions.', query: 'Kitab-i-Aqdas Bahai' },
    ],
  },
  {
    title: 'The Book of Mormon',
    tradition: 'Latter-day Saints',
    traditionHref: '/religions/latter-day-saints',
    description: 'A foundational scripture of the Latter-day Saint movement alongside the Bible.',
    significance: 'It is central to Latter-day Saint identity, missionary work, and theological self-understanding.',
    readingAdvice: 'Readers should approach it alongside a basic history of the movement and an explanation of how Latter-day Saints position it relative to the Bible.',
    history: 'The Book of Mormon was published by Joseph Smith in 1830, with Latter-day Saints understanding it as translation from ancient records. Because its origin claims are central to the movement, historical background becomes part of the reading experience very quickly [1][2].',
    structure: 'The text presents itself as a record compiled from multiple prophetic voices narrating migrations, preaching, war, covenant, and the visit of the risen Christ. It therefore reads as a narrative scripture with sermons and embedded records rather than as a compact law code or wisdom book [1][2].',
    practice: 'Within Latter-day Saint life the Book of Mormon is studied in homes, worship settings, missionary teaching, and daily devotional programs. It is often treated as the clearest textual entry point into Latter-day Saint identity, especially when paired with basic history of Joseph Smith and the movement [1][2][3].',
    editions: [
      { label: 'The Book of Mormon', note: 'Search for standard English editions and study versions.', query: 'Book of Mormon' },
    ],
  },
];

export const SACRED_TEXT_DETAILS: SacredTextDetailEntry[] = SACRED_TEXT_SEEDS.map((seed) => {
  const sections = [
    {
      heading: `What ${seed.title} is`,
      body: [
        `${seed.title} is best understood as more than a title on a shelf or a quotation source for debate. In ${seed.tradition}, it lives inside interpretation, communal memory, ritual use, and practices of transmission that shape how the text is heard and trusted [1][2]. ${seed.description}`,
        `Readers often miss the social side of scripture. A sacred text may be recited, sung, enthroned, copied, debated, taught to children, or treated with bodily reverence. Those habits are not decorative extras, they are part of what makes the text authoritative within a living tradition [1][2][3].`,
      ],
    },
    {
      heading: 'Historical background and transmission',
      body: [
        `${seed.history}`,
        `Historical background matters because sacred texts are usually encountered through communities that preserved, translated, commented on, and organized them over time. A beginner gains far more by learning who transmitted a text and how it was used than by treating the page as if it arrived in a vacuum [1][2][3].`,
      ],
    },
    {
      heading: 'Structure and major themes',
      body: [
        `${seed.structure}`,
        `${seed.significance} The themes that dominate a text are usually tied to its form, so genre and arrangement matter when deciding how to read any passage responsibly [1][2].`,
      ],
    },
    {
      heading: 'How communities use it in practice',
      body: [
        `${seed.practice}`,
        `This is why the most useful beginner question is not only “What does this text say?” but also “How is this text used?” In many traditions, authority is mediated through teachers, commentary, liturgy, legal reasoning, music, or devotional habit rather than through isolated private interpretation alone [2][3].`,
      ],
    },
    {
      heading: 'How beginners should approach it',
      body: [
        `${seed.readingAdvice} That usually prevents readers from confusing translation choices, genre, and historical context with the whole meaning of the text [1][2].`,
        `A strong beginner pathway is to pair scripture with one high-quality introduction to ${seed.tradition}, one guide to core vocabulary, and one comparison page that places this text alongside scripture in another tradition. That sequence makes both similarity and real difference clearer without reducing the text to slogans [2][3].`,
      ],
    },
    {
      heading: 'Best next steps on the site',
      body: [
        `After reading a guide like this, the most productive next move is to visit the ${seed.tradition} profile, then the recommended reading page for the tradition, and then one comparison page. That progression helps readers move from scripture in isolation to scripture in context [1][2].`,
        `This is especially important because sacred texts are often invoked in modern argument without enough attention to who reads them, how they are interpreted, and what kinds of authority different communities attach to them. Good beginner study always reconnects text, tradition, and practice [2][3].`,
      ],
    },
  ];

  return {
    slug: slugify(seed.title),
    title: seed.title,
    description: `An introductory guide to ${seed.title}, including what it is, how it developed, how communities use it, and how a beginner should start reading it.`,
    summary: `${seed.description} ${seed.significance} [1][2]`,
    categoryLabel: 'Sacred Text Guide',
    wordCountLabel: readingTimeLabel(sections.flatMap((section) => section.body)),
    sections,
    editions: seed.editions.map((edition) => ({
      ...edition,
      amazonUrl: buildAmazonSearchUrl(edition.query),
    })),
    relatedLinks: [
      { label: `${seed.tradition} profile`, href: seed.traditionHref },
      { label: 'Recommended reading', href: seed.traditionHref.replace('/religions/', '/recommended-reading/') },
      { label: 'Sacred Items & Gifts', href: '/sacred-items' },
      { label: 'All sacred texts', href: '/sacred-texts' },
      { label: 'Glossary', href: '/glossary' },
    ],
    sources: [
      { label: 'Encyclopaedia Britannica entries on sacred texts and religious traditions.', url: 'https://www.britannica.com/topic/religion' },
      { label: 'Oxford Reference entries on scripture, canon, and interpretation.', url: 'https://www.oxfordreference.com/' },
      { label: 'ReligionCompare reading lists and cited introductory editions.', url: 'https://www.religioncompare.com/recommended-reading' },
    ],
    faq: [
      {
        question: `Is ${seed.title} meant to be read literally?`,
        answer: 'That depends on genre, translation, commentary, and how communities in the tradition interpret the text. Literal reading is only one part of the interpretive picture.',
      },
      {
        question: `Should beginners start with the full text right away?`,
        answer: 'Usually a guided introduction, selected passages, or an annotated edition helps more than an unguided first reading from beginning to end.',
      },
    ],
  } satisfies SacredTextDetailEntry;
}).sort((a, b) => a.title.localeCompare(b.title));
