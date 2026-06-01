import { readingTimeLabel, slugify } from '@/lib/resource-details/helpers';
import type { ResourceDetailEntry } from '@/lib/resource-details/types';

interface FaqSeed {
  question: string;
  shortAnswer: string;
  nuance: string;
  whyItMatters: string;
  relatedLinks: { label: string; href: string }[];
}

const FAQ_SEEDS: FaqSeed[] = [
  { question: 'Do All Religions Believe in God?', shortAnswer: 'No. Some religions are strongly monotheistic, some include many divine beings, and some are not centered on a creator God at all.', nuance: 'The English word “God” does not map cleanly onto all traditions, so comparison works better when readers ask how each religion describes ultimate reality, sacred power, and spiritual authority.', whyItMatters: 'This question shapes how beginners compare Christianity, Islam, Hinduism, Buddhism, Sikhism, Taoism, and other traditions without forcing them into one theological template.', relatedLinks: [{ label: 'Compare Christianity vs Buddhism', href: '/compare/christianity-vs-buddhism' }, { label: 'Glossary', href: '/glossary' }] },
  { question: 'Can You Convert to a Religion?', shortAnswer: 'Often yes, but the process, meaning, and social implications differ from one tradition to another.', nuance: 'Some communities emphasize formal initiation, some emphasize belief and practice, and some connect belonging to peoplehood, ancestry, or long communal formation as well as personal conviction.', whyItMatters: 'Conversion questions often reveal the difference between religion as belief alone and religion as community, law, memory, and embodied practice.', relatedLinks: [{ label: 'Judaism profile', href: '/religions/judaism' }, { label: 'Islam profile', href: '/religions/islam' }] },
  { question: 'What Is the Difference Between a Religion and a Denomination?', shortAnswer: 'A religion is a broader tradition, while a denomination is usually a branch or stream within it.', nuance: 'The difference matters because Catholicism, Protestantism, and Orthodoxy are not the same analytical category as Christianity itself, and similar distinctions appear elsewhere too.', whyItMatters: 'Many comparison mistakes happen when readers place a whole religion on one side and a sub-branch on the other without noticing the mismatch.', relatedLinks: [{ label: 'Compare Catholicism vs Protestantism', href: '/compare/catholicism-vs-protestantism' }, { label: 'Christianity profile', href: '/religions/christianity' }] },
  { question: 'Why Do Religions Have Dietary Rules?', shortAnswer: 'Dietary rules often express holiness, discipline, memory, identity, and communal boundaries rather than mere nutrition.', nuance: 'Food rules can mark belonging, cultivate restraint, and shape daily life in ways that link ordinary eating with moral or sacred order.', whyItMatters: 'Comparing kosher, halal, fasting, vegetarian discipline, or ritual purity practices helps readers see how religion enters daily routine.', relatedLinks: [{ label: 'Compare Islam vs Judaism', href: '/compare/islam-vs-judaism' }, { label: 'Glossary: Halal', href: '/glossary/halal' }] },
  { question: 'How Should I Compare Religions Respectfully?', shortAnswer: 'Start by understanding each tradition on its own terms before ranking or reducing it to slogans.', nuance: 'Respectful comparison avoids cherry-picking, avoids assuming one tradition’s vocabulary is universal, and notices internal diversity before making sweeping statements.', whyItMatters: 'The entire purpose of ReligionHub depends on careful comparison that informs rather than caricatures.', relatedLinks: [{ label: 'Compare hub', href: '/compare' }, { label: 'How We Source', href: '/about/how-we-source' }] },
  { question: 'Are Sacred Texts Meant to Be Read Literally?', shortAnswer: 'Sometimes, sometimes not, and often only in part.', nuance: 'Genre, commentary traditions, liturgy, doctrine, and historical setting all shape how communities read scripture.', whyItMatters: 'Literalism is only one interpretive option, and readers who assume it is universal usually misunderstand both scripture and the communities that preserve it.', relatedLinks: [{ label: 'Sacred texts hub', href: '/sacred-texts' }, { label: 'Recommended reading', href: '/recommended-reading' }] },
  { question: 'Why Do Religions Use Ritual?', shortAnswer: 'Ritual turns beliefs into embodied habits, communal memory, and sacred time.', nuance: 'Ritual is not simply symbolic decoration; it often forms identity, discipline, belonging, and emotional memory through repeated practice.', whyItMatters: 'Beginners understand religions better when they study practice and ritual life alongside doctrine.', relatedLinks: [{ label: 'Etiquette guides', href: '/etiquette-guides' }, { label: 'Religions hub', href: '/religions' }] },
  { question: 'What Makes a Place Sacred?', shortAnswer: 'Sacred places become meaningful through story, revelation, ritual use, pilgrimage, memory, and community recognition.', nuance: 'A site may be sacred because of a founder, a miracle, a burial place, a temple, a mountain, a city, or a long ritual history.', whyItMatters: 'Understanding sacred space helps readers connect texts, rituals, history, and geography in a more complete picture of religious life.', relatedLinks: [{ label: 'Sacred places', href: '/sacred-places' }, { label: 'Etiquette guides', href: '/etiquette-guides' }] },
  { question: 'Why Do Religions Fast?', shortAnswer: 'Fasting often cultivates discipline, remembrance, dependence, solidarity, repentance, or spiritual clarity.', nuance: 'Different traditions fast for different reasons and on different schedules, so the practice should not be assumed to mean the same thing everywhere.', whyItMatters: 'Fasting is a good example of how an outwardly similar practice can carry different theological and communal meanings.', relatedLinks: [{ label: 'Islam profile', href: '/religions/islam' }, { label: 'Christianity profile', href: '/religions/christianity' }] },
  { question: 'Do Religions Change Over Time?', shortAnswer: 'Yes. Every living tradition develops, adapts, debates, and reinterprets across history.', nuance: 'Change may appear through new denominations, reform movements, legal interpretation, translation, migration, political context, or new media.', whyItMatters: 'Readers who expect a religion to be historically static often misunderstand both ancient sources and modern communities.', relatedLinks: [{ label: 'Religions hub', href: '/religions' }, { label: 'Compare traditions', href: '/compare' }] },
  { question: 'How Important Are Founders in Religion?', shortAnswer: 'In some traditions founders are central, while in others origins are diffuse, layered, or ancestral.', nuance: 'A founder-centered model works well for some religions but less well for traditions shaped over long periods without a single origin figure.', whyItMatters: 'This matters when readers compare Buddhism, Christianity, Islam, Sikhism, Hinduism, Shinto, Taoism, and Indigenous traditions.', relatedLinks: [{ label: 'Buddhism profile', href: '/religions/buddhism' }, { label: 'Hinduism profile', href: '/religions/hinduism' }] },
  { question: 'What Is the Difference Between Myth and Belief?', shortAnswer: 'Myth is not simply “falsehood”; in religion it often means a meaning-bearing sacred story.', nuance: 'Sacred narratives can shape identity and worldview whether they are read historically, symbolically, liturgically, or some mixture of all three.', whyItMatters: 'Using the word myth carelessly can sound dismissive, so careful readers define what they mean before applying it.', relatedLinks: [{ label: 'Sacred texts', href: '/sacred-texts' }, { label: 'Glossary', href: '/glossary' }] },
  { question: 'Why Do Religions Have Clergy or Teachers?', shortAnswer: 'Many traditions rely on trained leaders to preserve texts, rituals, law, teaching, and communal continuity.', nuance: 'Not every tradition structures leadership the same way, and some have more diffuse or less centralized authority than others.', whyItMatters: 'Leadership patterns affect how communities interpret scripture, settle disputes, and organize worship.', relatedLinks: [{ label: 'Christianity profile', href: '/religions/christianity' }, { label: 'Islam profile', href: '/religions/islam' }] },
  { question: 'What Counts as a Sacred Text?', shortAnswer: 'A sacred text is a writing treated as authoritative, formative, or spiritually significant within a religious community.', nuance: 'Authority can come from revelation, tradition, legal importance, liturgical use, philosophical status, or communal reverence.', whyItMatters: 'Not every religion uses scripture in the same way, and some traditions rely heavily on commentary, oral transmission, or ritual performance as well.', relatedLinks: [{ label: 'Sacred texts hub', href: '/sacred-texts' }, { label: 'Recommended reading', href: '/recommended-reading' }] },
  { question: 'Can a Religion Be More Than One Thing at Once?', shortAnswer: 'Yes. A religion can be simultaneously a theology, a way of life, a people, a legal tradition, a ritual system, and a civilization-scale memory.', nuance: 'Reducing religion to belief alone leaves out practice, identity, politics, aesthetics, and community life.', whyItMatters: 'This is one of the most important insights for beginners who want to compare traditions accurately.', relatedLinks: [{ label: 'Beginner guides', href: '/beginner-guides' }, { label: 'Religions hub', href: '/religions' }] },
];

export const FAQ_DETAILS: ResourceDetailEntry[] = FAQ_SEEDS.map((seed) => {
  const sections = [
    {
      heading: 'Short answer',
      body: [
        `${seed.shortAnswer} That is the clearest first answer, but it is only the beginning because religious comparison almost always gets more precise when readers ask how a tradition uses its own categories rather than relying on one borrowed framework [1][2].`,
        `${seed.nuance} This is why a quick yes-or-no answer can mislead even when it contains a kernel of truth.`
      ]
    },
    {
      heading: 'Why the question is harder than it looks',
      body: [
        `Questions like this sound simple because they use familiar English words. In practice, the same words often cover very different realities in different traditions [1][2]. That means a good answer has to pay attention to language, history, community life, and the way insiders actually use the category in question.`,
        `Beginners often go wrong by assuming that one tradition provides the normal model and all others are deviations from it. Better comparison starts by learning multiple models and then asking where they overlap, where they diverge, and why [2][3].`
      ]
    },
    {
      heading: 'Why it matters for understanding religion',
      body: [
        `${seed.whyItMatters} It also shows why serious religion study combines doctrine, practice, history, and interpretation instead of treating any one of them as the whole story [1][2][3].`,
        `This kind of question is especially useful for SEO-driven beginner learning because it often introduces readers to a larger conceptual map. Once that map is in place, the profiles, reading lists, sacred texts, and comparison pages across the site become much more understandable.`
      ]
    }
  ];

  return {
    slug: slugify(seed.question),
    title: seed.question,
    description: `A detailed answer to the question: ${seed.question}`,
    summary: `${seed.shortAnswer} ${seed.nuance} [1][2]`,
    categoryLabel: 'FAQ',
    wordCountLabel: readingTimeLabel(sections.flatMap((section) => section.body)),
    sections,
    relatedLinks: [...seed.relatedLinks, { label: 'Recommended reading', href: '/recommended-reading' }, { label: 'Sacred Items & Gifts', href: '/sacred-items' }, { label: 'All FAQs', href: '/faqs' }, { label: 'Compare traditions', href: '/compare' }],
    sources: [
      { label: 'Encyclopaedia Britannica comparative religion entries.', url: 'https://www.britannica.com/topic/religion' },
      { label: 'Oxford Reference entries on religion, scripture, ritual, and comparison.', url: 'https://www.oxfordreference.com/' },
      { label: 'Pew Research Center religion reports and backgrounders.', url: 'https://www.pewresearch.org/religion/' },
    ],
    faq: [
      { question: seed.question, answer: `${seed.shortAnswer} ${seed.nuance}` },
    ],
  } satisfies ResourceDetailEntry;
}).sort((a, b) => a.title.localeCompare(b.title));
