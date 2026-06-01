import { readingTimeLabel, slugify } from '@/lib/resource-details/helpers';
import type { ResourceDetailEntry } from '@/lib/resource-details/types';

interface GlossarySeed {
  term: string;
  traditions: string;
  category: string;
  coreMeaning: string;
  nuance: string;
  relatedLinks?: { label: string; href: string }[];
}

type GlossarySeedTuple = [
  term: string,
  traditions: string,
  category: string,
  coreMeaning: string,
  nuance: string,
  relatedLinks?: { label: string; href: string }[],
];

const RAW_GLOSSARY_SEEDS: GlossarySeedTuple[] = [
  ['Karma', 'Hinduism, Buddhism, Jainism, and Sikhism', 'Ethics & causation', 'the moral consequences of intentional action across lives, communities, and spiritual practice', 'the term is often flattened in English into a slogan about instant payback, which misses its deeper role in rebirth, discipline, and liberation'],
  ['Dharma', 'Hinduism, Buddhism, Jainism, and Sikhism', 'Practice & moral order', 'a layered term for duty, law, teaching, truth, or righteous order depending on the tradition and context', 'no single English translation captures the way the word shifts between cosmic order, ethics, and spiritual teaching'],
  ['Nirvana', 'Buddhism', 'Liberation', 'liberation from craving, ignorance, and the cycles of suffering', 'popular English often uses nirvana for bliss or calm, but Buddhist traditions treat it as a far deeper spiritual goal'],
  ['Samsara', 'Hinduism, Buddhism, Jainism, and Sikhism', 'Rebirth', 'the ongoing cycle of birth, death, and rebirth from which liberation is sought', 'traditions that speak of samsara do not all define the self, continuity, or liberation in exactly the same way'],
  ['Moksha', 'Hinduism, Jainism, and some Sikh contexts', 'Liberation', 'release from the cycle of rebirth and the realization of the highest spiritual goal', 'moksha is not simply heaven; it often refers to a transformed state beyond ordinary worldly attachment and rebirth'],
  ['Atman', 'Hinduism', 'Selfhood', 'the deeper self or soul discussed in many Hindu philosophical traditions', 'different Hindu schools interpret atman differently, and comparison with Buddhist non-self teaching must be done carefully'],
  ['Brahman', 'Hinduism', 'Ultimate reality', 'the ultimate reality or absolute ground discussed in many Hindu philosophical traditions', 'Brahman is not simply a deity among others; it often points to the deepest metaphysical reality behind existence'],
  ['Bhakti', 'Hinduism and devotional movements across South Asia', 'Devotion', 'loving devotion directed toward a deity or divine presence', 'bhakti is both emotional and disciplined, and it has produced poetry, song, ritual, and theology across many regions'],
  ['Puja', 'Hinduism', 'Ritual', 'devotional worship involving offerings, prayer, gesture, and reverence before the divine', 'puja ranges from home devotion to elaborate temple ritual, so one form should not be treated as the only model'],
  ['Darshan', 'Hinduism and related South Asian traditions', 'Sacred encounter', 'the act of seeing and being seen by a deity, saint, or sacred presence', 'darshan is often misunderstood as simple looking, when it usually carries relational and devotional meaning'],
  ['Murti', 'Hinduism', 'Sacred image', 'a consecrated image or form through which divine presence is approached in worship', 'outsiders sometimes reduce murti to idol, but practitioners usually understand the image within a more complex theology of presence'],
  ['Guru', 'Hinduism, Sikhism, Buddhism, and modern spirituality', 'Teacher', 'a spiritual guide or teacher whose authority is tied to knowledge, practice, and transmission', 'the word is often used casually in English, but in religious contexts it usually carries weighty obligations and lineage implications'],
  ['Mantra', 'Hinduism, Buddhism, Jainism, and Sikhism', 'Prayer & recitation', 'a sacred phrase, sound, or formula used in prayer, meditation, or ritual repetition', 'mantras are not magic words in a simplistic sense; their meaning depends on tradition, initiation, practice, and intent'],
  ['Yoga', 'Hinduism and global modern spirituality', 'Practice', 'disciplined paths of bodily, mental, and spiritual training aimed at union, clarity, or liberation', 'modern postural yoga is only one strand of a much larger religious and philosophical history'],
  ['Avatar', 'Hinduism', 'Divine manifestation', 'a descent or manifestation of the divine in embodied form', 'the concept is often associated especially with Vishnu, but its theological meaning differs from Christian ideas such as incarnation'],
  ['Vedas', 'Hinduism', 'Scripture', 'ancient Sanskrit scriptures foundational to the historical development of Hindu traditions', 'they are central to Hindu religious history even though many Hindus encounter later texts more directly in daily devotion'],
  ['Upanishads', 'Hinduism', 'Philosophical scripture', 'texts that explore selfhood, ultimate reality, knowledge, and liberation', 'their philosophical density means they are often best approached with commentary rather than as isolated quotations'],
  ['Bhagavad Gita', 'Hinduism', 'Scripture', 'a major Hindu text structured as a dialogue on duty, action, devotion, and liberation', 'the Gita is widely read because it condenses major philosophical and devotional themes into a vivid narrative setting'],
  ['Ahimsa', 'Hinduism, Buddhism, Jainism, and Gandhi-influenced ethics', 'Ethics', 'the principle of non-harm toward living beings', 'different traditions interpret ahimsa differently, ranging from broad ethical restraint to highly detailed disciplines of nonviolence'],
  ['Seva', 'Sikhism and broader South Asian traditions', 'Service', 'selfless service offered to others as a spiritual practice', 'in Sikh contexts, seva is deeply tied to equality, humility, community, and the ethics of action'],
  ['Kirtan', 'Sikhism, Hinduism, and devotional traditions', 'Music & devotion', 'devotional singing or chanting of sacred words and names', 'kirtan is both an aesthetic and spiritual practice rather than background music for ritual'],
  ['Langar', 'Sikhism', 'Community meal', 'the shared meal served in a gurdwara to all without distinction', 'langar is not only hospitality; it is a practical enactment of equality and service'],
  ['Khalsa', 'Sikhism', 'Community identity', 'the initiated Sikh order established with a strong emphasis on discipline, equality, and courage', 'Khalsa identity must be understood in relation to Sikh history, scripture, and collective practice rather than only outward symbols'],
  ['Sangat', 'Sikhism', 'Community', 'the gathered Sikh congregation or fellowship', 'sangat points to the communal dimension of spiritual life, not merely attendance at an event'],
  ['Hukam', 'Sikhism', 'Divine order', 'divine order, command, or will in Sikh thought', 'the term combines spiritual submission with ethical orientation rather than passive resignation'],
  ['Waheguru', 'Sikhism', 'Divine name', 'a revered name for God used in prayer and devotion', 'its devotional use is tied to remembrance, awe, and communal practice'],
  ['Guru Granth Sahib', 'Sikhism', 'Scripture', 'the Sikh scripture revered as the eternal Guru', 'the text is treated with living authority and ritual reverence, not merely as literature'],
  ['Torah', 'Judaism', 'Scripture', 'the foundational written teaching at the heart of Jewish life and learning', 'Torah can refer narrowly to the Five Books of Moses or more broadly to divine teaching and interpretive tradition'],
  ['Talmud', 'Judaism', 'Rabbinic tradition', 'a foundational rabbinic compendium of law, debate, and interpretation', 'the Talmud is not easily summarized because it models a way of reasoning as much as a set of fixed conclusions'],
  ['Halakhah', 'Judaism', 'Law', 'the legal and practical framework governing much of Jewish religious life', 'halakhah is lived differently across communities, so legal authority and observance vary in important ways'],
  ['Mitzvah', 'Judaism', 'Commandment', 'a commandment or religious obligation, often also used for a morally good deed', 'the term combines divine command, ethics, and communal practice in ways English equivalents only partly capture'],
  ['Kashrut', 'Judaism', 'Dietary law', 'the system of Jewish dietary law that shapes what is fit to eat', 'kashrut is broader than individual food choices because it helps structure household, ritual, and communal identity'],
  ['Kosher', 'Judaism', 'Dietary practice', 'what is ritually fit or proper under Jewish dietary law', 'many people use kosher only for food branding, but the term belongs to a larger legal and communal world'],
  ['Shabbat', 'Judaism', 'Sacred time', 'the Sabbath observed from Friday evening to Saturday evening', 'Shabbat is not simply a day off; it is sacred time structured by rest, prayer, food, and communal memory'],
  ['Synagogue', 'Judaism', 'Sacred space', 'a Jewish place of prayer, study, and community gathering', 'synagogues vary widely across Jewish movements, so no one architectural or ritual style defines them all'],
  ['Rabbi', 'Judaism', 'Teacher & leader', 'a Jewish teacher or religious leader trained in text, law, and communal guidance', 'the role differs across denominations and is not identical to priesthood models in other religions'],
  ['Midrash', 'Judaism', 'Interpretation', 'a mode and body of interpretive reflection on scripture', 'midrash is not merely commentary in the narrow sense; it can be imaginative, legal, narrative, and theological'],
  ['Minyan', 'Judaism', 'Prayer community', 'the quorum required in many Jewish contexts for certain communal prayers', 'the rules and social meaning of minyan differ across Jewish communities and legal interpretations'],
  ['Kippah', 'Judaism', 'Dress & reverence', 'a head covering worn especially by Jewish men in many contexts as a sign of reverence or identity', 'practice varies widely by movement, place, and level of observance'],
  ['Shekhinah', 'Judaism', 'Divine presence', 'a term associated with the indwelling or manifest presence of God', 'the word carries theological, mystical, and liturgical resonances that are not captured by the phrase presence alone'],
  ['Covenant', 'Judaism, Christianity, and related traditions', 'Theology', 'a binding relationship of promise, obligation, and identity between God and a people or community', 'covenant language is shared across traditions but interpreted differently in each'],
  ['Messiah', 'Judaism and Christianity', 'Theology', 'an anointed figure associated with redemption, hope, or divine purpose', 'Jewish and Christian understandings of messiah diverge sharply despite shared scriptural language'],
  ['Zakat', 'Islam', 'Practice', 'obligatory almsgiving and one of the Five Pillars of Islam', 'zakat is not generic charity; it is a structured religious duty with social and spiritual significance'],
  ['Salah', 'Islam', 'Prayer', 'the prescribed ritual prayer performed by Muslims at set times daily', 'salah combines bodily movement, recitation, direction, timing, and intention in a disciplined devotional form'],
  ['Sawm', 'Islam', 'Fasting', 'ritual fasting, especially during Ramadan', 'sawm is tied to discipline, gratitude, remembrance, and communal religious life rather than diet alone'],
  ['Hajj', 'Islam', 'Pilgrimage', 'the pilgrimage to Mecca required of Muslims able to perform it', 'hajj is both a personal act of devotion and a global ritual of Muslim unity'],
  ['Ummah', 'Islam', 'Community', 'the wider community of Muslims', 'ummah can refer to an ideal of global solidarity even when local practice and politics remain diverse'],
  ['Sharia', 'Islam', 'Law & ethics', 'the broad path of divine guidance in Islamic thought and practice', 'public discussion often reduces sharia to criminal law, ignoring its ethical, devotional, and jurisprudential dimensions'],
  ['Fiqh', 'Islam', 'Jurisprudence', 'the human understanding and interpretation of Islamic law', 'distinguishing fiqh from sharia helps readers see the role of scholarship, debate, and school differences'],
  ['Sunnah', 'Islam', 'Tradition', 'the normative example associated especially with the Prophet Muhammad', 'sunnah is closely linked to hadith but not identical to any one report'],
  ['Hadith', 'Islam', 'Tradition', 'reports about the sayings, actions, and approvals of the Prophet Muhammad', 'hadith literature is complex and evaluated through traditions of transmission and authenticity'],
  ['Tawhid', 'Islam', 'Theology', 'the oneness and uniqueness of God', 'tawhid is not only an abstract doctrine; it shapes worship, ethics, and critiques of idolatry or divided allegiance'],
  ['Imam', 'Islam and Shia Islam in particular', 'Leadership', 'a leader in prayer or, in some contexts, a figure of theological and communal authority', 'the word has different implications in Sunni and Shia settings'],
  ['Qibla', 'Islam', 'Prayer orientation', 'the direction Muslims face in prayer, toward the Kaaba in Mecca', 'qibla expresses communal unity and ritual orientation rather than geographical symbolism alone'],
  ['Wudu', 'Islam', 'Purification', 'ritual ablution before prayer', 'wudu connects bodily preparation with spiritual readiness in a way that should not be reduced to mere hygiene'],
  ['Halal', 'Islam', 'Law & daily life', 'what is permitted under Islamic law', 'halal applies beyond food to wider domains of moral and practical life'],
  ['Haram', 'Islam', 'Law & daily life', 'what is forbidden under Islamic law', 'understanding haram alongside halal helps explain how Islamic ethics shapes ordinary decisions'],
  ['Jihad', 'Islam', 'Ethics & struggle', 'striving or struggle in the path of God', 'the term has moral, spiritual, intellectual, and at times military senses, so sensational definitions are misleading'],
  ['Dhikr', 'Islam, especially Sufi practice', 'Devotional remembrance', 'the remembrance of God through repeated phrases, names, or prayerful attention', 'dhikr can be quiet or communal and is central to many forms of Muslim spiritual practice'],
  ['Sufi', 'Islam', 'Mysticism', 'relating to Islamic mystical or spiritual traditions often called Sufism', 'Sufism is not outside Islam but one dimension of Islamic devotional and ethical life'],
  ['Caliphate', 'Islamic history', 'Political theology', 'the institution historically associated with succession and leadership in the Muslim community', 'the caliphate is a historical and political concept that cannot be reduced to one modern slogan'],
  ['Mosque', 'Islam', 'Sacred space', 'a place of Muslim prayer, teaching, and communal gathering', 'mosques vary widely by region, culture, and legal tradition while sharing core ritual functions'],
  ['Mihrab', 'Islam', 'Architecture', 'the niche in a mosque indicating the qibla direction', 'the mihrab is both functional and aesthetically significant in Islamic sacred architecture'],
  ['Minaret', 'Islam', 'Architecture', 'a tower associated with mosques', 'while often iconic, the minaret is historically and regionally variable in form and use'],
  ['Trinity', 'Christianity', 'Theology', 'the Christian doctrine that God is one in essence and three in persons', 'the Trinity is often misunderstood as either three gods or a simple metaphor, neither of which reflects classical doctrine well'],
  ['Incarnation', 'Christianity', 'Theology', 'the doctrine that the Word became flesh in Jesus Christ', 'incarnation is more specific than divine appearance because it concerns the union of divinity and humanity in Christ'],
  ['Atonement', 'Christianity', 'Theology', 'teachings about how Christ’s life, death, and resurrection reconcile humanity with God', 'Christian traditions explain atonement through multiple models rather than one single formula'],
  ['Salvation', 'Christianity and many other traditions', 'Liberation', 'deliverance, redemption, or ultimate spiritual restoration', 'the goal and mechanism of salvation differ sharply across traditions, which is why comparison is essential'],
  ['Grace', 'Christianity', 'Theology', 'divine favor, gift, or empowering presence', 'grace can describe both God’s initiating action and the transformation of human life'],
  ['Baptism', 'Christianity', 'Ritual', 'the rite of initiation involving water', 'baptism is understood differently across denominations, including questions of age, mode, and sacramental meaning'],
  ['Eucharist', 'Christianity', 'Ritual', 'the rite of communion commemorating and participating in the Last Supper of Jesus', 'views on presence, symbolism, and access differ strongly across Christian traditions'],
  ['Sacrament', 'Christianity', 'Ritual theology', 'a rite treated as a visible sign and means of grace in many Christian traditions', 'the number and meaning of sacraments vary among Catholic, Orthodox, and Protestant communities'],
  ['Liturgy', 'Christianity and other ritual traditions', 'Worship', 'the structured form of communal worship', 'liturgy is not opposed to sincerity; it is one way communities shape prayer over time'],
  ['Gospel', 'Christianity', 'Scripture', 'good news and, more specifically, the canonical narratives of Jesus’ life and teaching', 'gospel can refer both to message and to literary genre'],
  ['Apostle', 'Christianity', 'Leadership & origins', 'one sent with authority, especially in relation to Jesus and the early church', 'the term carries historical, theological, and ecclesial meanings that differ across traditions'],
  ['Resurrection', 'Christianity and other traditions', 'Afterlife & hope', 'rising from the dead or restoration to life', 'resurrection differs from reincarnation and should not be treated as the same religious concept'],
  ['Communion', 'Christianity', 'Ritual', 'a term often used for participation in the Eucharist', 'communion also carries the sense of fellowship and shared union within the body of believers'],
  ['Catechism', 'Christianity, especially Catholicism', 'Teaching', 'an organized summary of doctrine and instruction', 'catechisms are pedagogical tools and not necessarily the only expression of a tradition’s belief'],
  ['Orthodoxy', 'Christianity and comparative religion', 'Doctrine', 'right belief or correct teaching in relation to a tradition', 'orthodoxy is often paired with orthopraxy, and the balance between the two differs across traditions'],
  ['Monasticism', 'Christianity, Buddhism, Jainism, and other traditions', 'Ascetic life', 'forms of disciplined communal or solitary religious life marked by vows, renunciation, or special practice', 'monasticism varies greatly and should not be treated as one universal model'],
  ['Icon', 'Orthodox Christianity and other traditions', 'Sacred image', 'a sacred image used devotionally and theologically', 'icons are often misunderstood as decorative art rather than as windows into worship and teaching'],
  ['Saint', 'Christianity', 'Holy person', 'a person recognized as especially holy or exemplary', 'some traditions emphasize saintly intercession strongly, while others use saint in a broader or more restrained way'],
  ['Pilgrimage', 'Many traditions', 'Sacred journey', 'travel to a sacred place for devotion, penance, blessing, or transformation', 'pilgrimage is a near-universal pattern, but its meaning varies with theology, geography, and communal identity'],
  ['Bodhisattva', 'Mahayana Buddhism', 'Spiritual ideal', 'a being committed to awakening for the benefit of all beings', 'the bodhisattva ideal is one of the clearest markers of Mahayana Buddhist vision'],
  ['Bodhi', 'Buddhism', 'Awakening', 'awakening or enlightenment', 'bodhi refers to transformative insight and is not identical to vague self-improvement language'],
  ['Sutra', 'Buddhism and other Indian traditions', 'Scripture', 'a sacred or instructional text', 'the word is used across traditions, so context matters when identifying which canon is in view'],
  ['Sangha', 'Buddhism', 'Community', 'the monastic or broader community of Buddhist practitioners', 'some usages stress the ordained community while others include lay followers more broadly'],
  ['Dhamma', 'Buddhism', 'Teaching', 'the Buddha’s teaching and, in some contexts, reality or phenomena', 'dhamma is sometimes translated as dharma, but Buddhist usage gives it distinct doctrinal contours'],
  ['Meditation', 'Buddhism, Hinduism, Christianity, and many traditions', 'Practice', 'disciplined mental or contemplative practice', 'meditation is not one thing; methods, goals, and theological assumptions differ widely'],
  ['Mindfulness', 'Buddhism and global modern practice', 'Practice', 'careful awareness or attentive presence', 'modern secular mindfulness often draws selectively from Buddhist contexts while changing its framework'],
  ['Zazen', 'Zen Buddhism', 'Meditation', 'seated meditation in Zen practice', 'zazen is not generic relaxation but disciplined posture, attention, and often community-shaped instruction'],
  ['Koan', 'Zen Buddhism', 'Teaching method', 'a paradoxical statement, question, or exchange used in Zen training', 'koans are not riddles for cleverness but tools for transforming perception and practice'],
  ['Vipassana', 'Buddhism', 'Meditation', 'insight meditation associated especially with Theravada and modern meditation movements', 'vipassana is sometimes presented as technique alone, but it belongs to a larger ethical and doctrinal path'],
  ['Metta', 'Buddhism', 'Ethics & meditation', 'loving-kindness or benevolent goodwill', 'metta is cultivated as a disciplined disposition rather than only an emotion'],
  ['Karuna', 'Buddhism', 'Compassion', 'compassion toward suffering beings', 'karuna is part of a larger web of virtues in Buddhist thought and practice'],
  ['Mandala', 'Buddhism and Hinduism', 'Symbol & ritual art', 'a symbolic diagram or sacred configuration', 'mandalas can function ritually, meditatively, and cosmologically rather than merely decoratively'],
  ['Mudra', 'Buddhism, Hinduism, and ritual arts', 'Gesture', 'a meaningful hand gesture or bodily sign used in ritual, art, or meditation', 'mudras carry context-specific meaning and are not interchangeable symbols'],
  ['Tantra', 'Hinduism and Buddhism', 'Esoteric practice', 'a cluster of esoteric ritual and contemplative traditions', 'tantra is one of the most misunderstood religious terms because it is often reduced to sensational fragments'],
  ['Lama', 'Tibetan Buddhism', 'Teacher', 'a spiritual teacher in Tibetan Buddhist traditions', 'the term signals lineage, training, and authority rather than celebrity spirituality'],
  ['Zen', 'Buddhism', 'School', 'a Buddhist tradition emphasizing meditation, practice, and direct engagement with awakening', 'Zen is often romanticized in modern culture in ways that detach it from monastic, ritual, and doctrinal contexts'],
  ['Theravada', 'Buddhism', 'Tradition', 'one of the major living Buddhist traditions, historically rooted in the Pali Canon', 'Theravada should not be simplistically labeled original Buddhism without historical care'],
  ['Mahayana', 'Buddhism', 'Tradition', 'a major Buddhist family of traditions shaped by expanded scriptural and philosophical developments', 'Mahayana is diverse and should not be reduced to one doctrine or one geography'],
  ['Vajrayana', 'Buddhism', 'Tradition', 'a form of Buddhist practice emphasizing esoteric methods, ritual, and accelerated paths', 'Vajrayana belongs within Buddhism and is not an unrelated mystical add-on'],
  ['Kami', 'Shinto', 'Sacred beings', 'the sacred presences or powers associated with Shinto life and ritual', 'kami cannot be mapped neatly onto Western categories such as god or spirit without losing important nuance'],
  ['Torii', 'Shinto', 'Sacred architecture', 'a gate marking entry into shrine space', 'torii signals transition into sacred space, not only a decorative national symbol'],
  ['Matsuri', 'Shinto and Japanese religion', 'Festival', 'a festival associated with shrine life, community celebration, and ritual observance', 'matsuri combines sacred, local, seasonal, and civic dimensions'],
  ['Shrine', 'Shinto and many traditions', 'Sacred space', 'a place of focused reverence, often marking the presence of the sacred', 'not all shrines function like congregational temples or churches, so local context matters'],
  ['Purification', 'Shinto, Islam, Hinduism, Judaism, and others', 'Ritual', 'ritual acts that prepare a person or space for sacred engagement', 'purification is about more than cleanliness; it often marks spiritual readiness and boundary-crossing'],
  ['Dao', 'Taoism', 'Ultimate reality & way', 'the Way, path, or underlying order discussed in Taoist thought', 'dao is not easily translated because it can name both cosmic process and the proper way of living'],
  ['Wu wei', 'Taoism', 'Ethics & action', 'non-forcing or effortless action aligned with the Dao', 'wu wei does not mean passivity; it points toward action without coercive strain'],
  ['Qi', 'Chinese traditions', 'Vital energy', 'vital force or energy discussed in multiple Chinese philosophical and religious traditions', 'qi changes meaning across medicine, cosmology, martial practice, and spiritual discourse'],
  ['Yin yang', 'Chinese traditions', 'Cosmology', 'a polarity describing dynamic complementary forces', 'yin and yang are not simple opposites or personality labels but relational principles of balance and change'],
  ['Ren', 'Confucianism', 'Ethics', 'humaneness, benevolence, or authoritative humanity', 'ren is central to Confucian moral cultivation and cannot be reduced to vague kindness'],
  ['Li', 'Confucianism and Chinese traditions', 'Ritual propriety', 'ritual propriety, patterned behavior, and the shaping of moral life through form', 'li includes etiquette, ceremony, and cultivated conduct, not mere social politeness'],
  ['Junzi', 'Confucianism', 'Moral ideal', 'the exemplary or cultivated person in Confucian thought', 'junzi is a moral and educational ideal rather than a social class label alone'],
  ['Filial piety', 'Confucianism and East Asian traditions', 'Ethics & family', 'devotion, respect, and obligation toward parents and ancestors', 'filial piety is frequently oversimplified when detached from broader Confucian virtue ethics and ritual life'],
  ['Analects', 'Confucianism', 'Scripture & classic text', 'the classic collection of teachings associated with Confucius', 'the Analects is short but dense, which is why commentary matters for interpretation'],
  ['Asha', 'Zoroastrianism', 'Truth & order', 'truth, right order, and cosmic righteousness', 'asha is a key Zoroastrian concept linking ethics, cosmology, and proper living'],
  ['Avesta', 'Zoroastrianism', 'Scripture', 'the surviving scriptural corpus of Zoroastrianism', 'the Avesta is both ritually important and historically fragmentary, so readers need context to approach it well'],
  ['Fravashi', 'Zoroastrianism', 'Spiritual anthropology', 'a spiritual principle or pre-existent aspect associated with persons and divine order', 'the term is complex and should not be forced into a one-word Western equivalent'],
  ['Tirthankara', 'Jainism', 'Holy figure', 'a ford-maker or enlightened teacher who shows the path to liberation', 'the term marks a specifically Jain model of spiritual exemplarity'],
  ['Jiva', 'Jainism', 'Soul', 'the living soul or sentient principle', 'Jain thought gives jiva a particularly detailed role in explaining karma, bondage, and liberation'],
  ['Anekantavada', 'Jainism', 'Philosophy', 'the doctrine of many-sidedness or the complexity of truth', 'the term is often invoked for tolerance, but it arises from a specific Jain epistemological framework'],
  ['Sallekhana', 'Jainism', 'Ascetic practice', 'a highly disciplined end-of-life fasting practice in specific Jain contexts', 'the term is easily misunderstood outside Jain ethical and ascetic frameworks'],
  ['Manifestation of God', 'Baha’i Faith', 'Theology', 'a central Baha’i term for major revelatory figures through whom divine guidance is disclosed', 'it should not be reduced either to prophet or to incarnation without attention to Baha’i theology'],
  ['Oneness of humanity', 'Baha’i Faith', 'Ethics & society', 'the Baha’i teaching that humanity is one and should move toward justice and unity', 'the phrase carries spiritual, social, and political implications within Baha’i thought'],
  ['Progressive revelation', 'Baha’i Faith', 'Theology', 'the idea that divine revelation unfolds through successive messengers across history', 'the teaching is central to Baha’i approaches to religious plurality and history'],
  ['Orisha', 'Yoruba religion and African Diaspora traditions', 'Sacred beings', 'divine powers or deities especially important in Yoruba-derived traditions', 'outsiders often collapse all African Diaspora traditions into one model, but understandings of orisha vary by community'],
  ['Ancestor veneration', 'African, East Asian, Indigenous, and many traditions', 'Ritual & memory', 'ritual respect, remembrance, and ongoing relationship with ancestors', 'the practice is not simply worship of the dead; it often concerns memory, kinship, blessing, and continuity'],
  ['Lwa', 'Haitian Vodou', 'Sacred beings', 'spirits central to Haitian Vodou ritual and devotion', 'lwa should be understood through Haitian history, ritual, and theology rather than through caricature'],
  ['Syncretism', 'Comparative religion', 'Method & history', 'the blending, overlapping, or interweaving of religious forms', 'the term can be descriptive, but it can also hide power dynamics and historical complexity if used lazily'],
  ['Animism', 'Comparative religion', 'Category term', 'a term historically used for belief in spiritually animated beings or forces', 'many scholars use the term cautiously because of its colonial baggage and oversimplifying history'],
  ['Monotheism', 'Comparative religion', 'Theology', 'belief in one God', 'even among monotheistic traditions, ideas of divine unity, personhood, revelation, and worship can differ greatly'],
  ['Polytheism', 'Comparative religion', 'Theology', 'belief in or worship involving multiple divine beings', 'the term can describe a pattern, but it does not erase philosophical sophistication or hierarchy among deities'],
  ['Pantheism', 'Comparative religion', 'Theology', 'the view that divinity and the universe are identical', 'the label is often applied too quickly to traditions that have more complex accounts of divine immanence'],
  ['Panentheism', 'Comparative religion', 'Theology', 'the view that the divine includes the world yet exceeds it', 'the term is useful for nuanced theology but is often confused with pantheism'],
  ['Nontheism', 'Comparative religion', 'Theology', 'a framework not centered on a creator God', 'nontheistic traditions are not therefore devoid of ritual, ethics, transcendence, or spiritual depth'],
  ['Revelation', 'Many traditions', 'Theology', 'divine disclosure or unveiling of truth', 'how revelation occurs and who can interpret it differ widely across traditions'],
  ['Prophecy', 'Many traditions', 'Theology & history', 'speech, warning, or teaching associated with divine commission', 'prophecy is not merely prediction; it often involves justice, guidance, critique, and communal memory'],
  ['Canon', 'Scriptural traditions', 'Scripture', 'the recognized body of authoritative texts within a tradition', 'questions of canon show that scripture is shaped by community recognition as well as textual content'],
  ['Denomination', 'Comparative religion', 'Classification', 'a branch within a larger religious tradition', 'the term fits some traditions better than others, so classification should be done carefully'],
  ['Clergy', 'Many traditions', 'Leadership', 'trained religious leaders with ritual, teaching, or pastoral roles', 'not every religion uses a centralized clergy model, and authority structures differ sharply'],
  ['Ritual', 'Many traditions', 'Practice', 'formalized actions that shape sacred meaning, memory, and communal life', 'ritual is not empty repetition; it often carries dense ethical, theological, and emotional significance'],
  ['Sacred space', 'Many traditions', 'Category term', 'space treated as holy, set apart, or especially charged with religious meaning', 'sacred space can be architectural, natural, domestic, temporary, or mobile depending on the tradition'],
  ['Sacred time', 'Many traditions', 'Category term', 'time marked as holy through festivals, sabbaths, fasts, or ritual cycles', 'religions often organize time itself as part of spiritual formation'],
  ['Festival', 'Many traditions', 'Practice', 'a communal observance marking sacred memory, seasonal rhythm, or theological significance', 'festivals often combine worship, food, identity, and public visibility'],
  ['Prayer', 'Many traditions', 'Devotion', 'speech, silence, thought, or gesture directed toward the sacred', 'prayer varies from liturgical recitation to spontaneous address to contemplative silence'],
  ['Contemplation', 'Many traditions', 'Spiritual practice', 'deep reflective or prayerful attention oriented toward spiritual transformation', 'contemplation differs from study alone because it aims at interior formation and presence'],
  ['Mysticism', 'Many traditions', 'Spirituality', 'forms of religious life oriented toward union, intimacy, or profound encounter with ultimate reality', 'the term is useful but broad, so it needs careful definition in each tradition'],
  ['Asceticism', 'Many traditions', 'Practice', 'disciplined restraint or renunciation for spiritual ends', 'asceticism is not simply self-denial; it often aims at freedom, concentration, holiness, or compassion'],
  ['Eschatology', 'Many traditions', 'Last things', 'teaching about the end, final destiny, or ultimate fulfillment', 'eschatology includes more than apocalyptic disaster imagery and often shapes present ethics'],
  ['Apocalypse', 'Many traditions', 'Revelation & end times', 'a revelation of hidden truth, often concerning cosmic conflict or final transformation', 'modern use reduces apocalypse to catastrophe, but the term has a richer scriptural history'],
  ['Afterlife', 'Many traditions', 'Last things', 'what happens after death according to a tradition or worldview', 'afterlife concepts vary so much that comparison requires careful attention to each tradition’s categories'],
  ['Reincarnation', 'Hinduism, Buddhism, Jainism, Sikhism, Druze, and modern spiritual discourse', 'Rebirth', 'the idea of life continuing through repeated rebirth or re-embodiment', 'different traditions define the self and the mechanics of rebirth differently, so the English label can mislead'],
  ['Orthopraxy', 'Comparative religion', 'Method & practice', 'right practice or correct action', 'orthopraxy is often contrasted with orthodoxy, though living traditions usually combine both in complex ways'],
  ['Exegesis', 'Scriptural traditions', 'Interpretation', 'careful interpretation of texts, especially scripture', 'exegesis differs from casual reading because it brings method, context, and interpretive discipline to the text'],
  ['Hermeneutics', 'Comparative religion and theology', 'Interpretation theory', 'the theory and method of interpretation', 'hermeneutics asks not only what a text says but how meaning is produced, received, and contested'],
  ['Devotion', 'Many traditions', 'Spiritual practice', 'loving, reverent, or disciplined attachment directed toward the sacred', 'devotion may be emotional, ritual, intellectual, or communal depending on the tradition'],
  ['Offerings', 'Many traditions', 'Ritual', 'gifts such as food, incense, flowers, money, or acts presented in a sacred context', 'offerings can express gratitude, dependence, remembrance, reciprocity, or worship'],
  ['Purity', 'Many traditions', 'Ritual & ethics', 'states of cleanliness, fitness, or right relation in ritual or moral life', 'purity language can be ritual, symbolic, moral, or social, and its meaning differs by tradition'],
];

const GLOSSARY_SEEDS: GlossarySeed[] = RAW_GLOSSARY_SEEDS.map(
  ([term, traditions, category, coreMeaning, nuance, relatedLinks]) => ({
    term,
    traditions,
    category,
    coreMeaning,
    nuance,
    relatedLinks,
  })
);

function relatedLinksForSeed(seed: GlossarySeed) {
  if (seed.relatedLinks) {
    return seed.relatedLinks;
  }

  const lower = seed.traditions.toLowerCase();

  if (lower.includes('hindu')) return [{ label: 'Hinduism profile', href: '/religions/hinduism' }, { label: 'Beginner guides', href: '/beginner-guides' }];
  if (lower.includes('buddh')) return [{ label: 'Buddhism profile', href: '/religions/buddhism' }, { label: 'Sacred texts', href: '/sacred-texts' }];
  if (lower.includes('sikh')) return [{ label: 'Sikhism profile', href: '/religions/sikhism' }, { label: 'Recommended reading', href: '/recommended-reading/sikhism' }];
  if (lower.includes('jud')) return [{ label: 'Judaism profile', href: '/religions/judaism' }, { label: 'FAQs', href: '/faqs' }];
  if (lower.includes('islam') || lower.includes('muslim')) return [{ label: 'Islam profile', href: '/religions/islam' }, { label: 'Compare traditions', href: '/compare' }];
  if (lower.includes('christ')) return [{ label: 'Christianity profile', href: '/religions/christianity' }, { label: 'Recommended reading', href: '/recommended-reading/christianity' }];
  if (lower.includes('tao')) return [{ label: 'Taoism profile', href: '/religions/taoism' }, { label: 'Sacred texts', href: '/sacred-texts' }];
  if (lower.includes('confuc')) return [{ label: 'Confucianism profile', href: '/religions/confucianism' }, { label: 'Compare traditions', href: '/compare' }];
  if (lower.includes('zoro')) return [{ label: 'Zoroastrianism profile', href: '/religions/zoroastrianism' }, { label: 'Recommended reading', href: '/recommended-reading/zoroastrianism' }];
  if (lower.includes('jain')) return [{ label: 'Jainism profile', href: '/religions/jainism' }, { label: 'Compare traditions', href: '/compare' }];
  if (lower.includes('baha')) return [{ label: 'Baha’i Faith profile', href: '/religions/bahai-faith' }, { label: 'Recommended reading', href: '/recommended-reading/bahai-faith' }];
  if (lower.includes('shinto')) return [{ label: 'Shinto profile', href: '/religions/shinto' }, { label: 'Sacred texts', href: '/sacred-texts' }];
  return [{ label: 'Religions hub', href: '/religions' }, { label: 'Compare traditions', href: '/compare' }];
}

export const GLOSSARY_DETAILS: ResourceDetailEntry[] = GLOSSARY_SEEDS.map((seed) => {
  const sections = [
    {
      heading: `What ${seed.term} means`,
      body: [
        `${seed.term} is a ${seed.category.toLowerCase()} term used especially in ${seed.traditions}. At its core, it refers to ${seed.coreMeaning} [1][2]. Readers often encounter the word in simplified internet summaries, but inside living traditions it usually sits inside a much wider network of beliefs, ritual practices, historical developments, and interpretive debates.`,
        `A good glossary entry should therefore do more than give a one-line definition. It should show how a term functions. In the case of ${seed.term}, that means noticing how the word helps communities talk about identity, authority, devotion, ethics, liberation, worship, or sacred order depending on the context [1][2][3].`
      ]
    },
    {
      heading: 'How the term works in context',
      body: [
        `Terms like ${seed.term} are rarely static labels. They often shift meaning between scripture, ritual use, philosophy, popular devotion, and academic explanation. In ${seed.traditions}, the word may appear in formal teaching, ordinary religious language, or comparative discussion, but its weight and nuance depend on who is using it and why [1][2].`,
        `${seed.nuance}. This is why careful readers avoid assuming that the first translation they see is sufficient. Context, community, and interpretive tradition all matter when deciding what the term is doing in a given passage or practice [2][3].`
      ]
    },
    {
      heading: `Why ${seed.term} is easy to misunderstand`,
      body: [
        `One reason ${seed.term} is easy to misunderstand is that English-language religion coverage often prizes speed over precision. A term gets turned into a slogan, then the slogan gets repeated until it sounds universal [1][2]. Once that happens, readers begin using the term in contexts where it no longer means what practitioners or scholars actually intend.`,
        `Another problem is cross-tradition borrowing. People may assume that because two religions use a related word or share a similar theme, they mean exactly the same thing. With ${seed.term}, careful comparison usually shows overlap at one level and important difference at another. Good comparative reading holds both realities together [2][3].`
      ]
    },
    {
      heading: 'Best next steps for learning',
      body: [
        `If you want to understand ${seed.term} better, the next step is to pair the term with a full religion profile, one recommended reading list, and one comparison page that brings neighboring traditions into view [1][2]. A glossary entry gives orientation, but deep understanding comes when the term is seen in practice, history, and scripture.`,
        `That is also why ReligionHub treats glossary terms as part of a learning path rather than as isolated dictionary items. The strongest sequence is: define the term, see how a tradition uses it, compare it with a nearby tradition, and then go to a reading list or sacred text guide for deeper study [2][3].`
      ]
    }
  ];

  return {
    slug: slugify(seed.term),
    title: seed.term,
    description: `${seed.term} explained for comparative religion readers, including definition, context, misunderstandings, and related study paths.`,
    summary: `${seed.term} refers to ${seed.coreMeaning} in ${seed.traditions}, though its meaning depends heavily on context and interpretation [1][2].`,
    categoryLabel: 'Glossary Term',
    wordCountLabel: readingTimeLabel(sections.flatMap((section) => section.body)),
    sections,
    relatedLinks: [...relatedLinksForSeed(seed), { label: 'Sacred Items & Gifts', href: '/sacred-items' }, { label: 'All glossary terms', href: '/glossary' }],
    sources: [
      { label: 'Encyclopaedia Britannica entries on religion and key doctrinal terms.', url: 'https://www.britannica.com/topic/religion' },
      { label: 'Oxford Reference entries on comparative religion vocabulary.', url: 'https://www.oxfordreference.com/' },
      { label: 'ReligionCompare reading lists and religion profiles for contextual study.', url: 'https://www.religioncompare.com/recommended-reading' },
    ],
    faq: [
      { question: `Does ${seed.term} mean the same thing in every religion that uses it?`, answer: `No. Even when a term appears across multiple traditions, context and theological framework often change its meaning significantly.` },
      { question: `What should I read after learning the definition of ${seed.term}?`, answer: 'The best next step is a full religion profile, then a comparison page, then a reading list or sacred text guide that shows the term in context.' },
    ],
  } satisfies ResourceDetailEntry;
}).sort((a, b) => a.title.localeCompare(b.title));
