import { buildAmazonSearchUrl } from '@/lib/affiliate-links';

export type ProductBadge = 'Staff Pick' | 'Best Seller' | 'Top Rated' | 'New';

export interface SacredItemEntry {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  amazonProductId?: string;
  amazonUrl?: string;
  amazonSearchQuery?: string;
  badges?: ProductBadge[];
  firstSeen?: string;
  featured?: boolean;
}

export interface SacredItemCollection {
  slug: string;
  traditionName: string;
  intro?: string;
  items: SacredItemEntry[];
}

export const SACRED_ITEMS: Record<string, SacredItemCollection> = {
  buddhism: {
    slug: 'buddhism',
    traditionName: 'Buddhism',
    intro: 'Buddhist material culture often supports meditation, chanting, pilgrimage memory, and visual reminders of the path. Different schools use these objects differently, so context matters [1][2].',
    items: [
      { id: 'buddhism-mala-beads', name: 'Mala Beads (108-bead Prayer Beads)', description: 'Mala beads are commonly used to count mantras, breaths, or recitations during meditation and chanting practice in many Buddhist communities [1][2].', priceRange: '$15-40', badges: ['Staff Pick', 'Top Rated'], firstSeen: '2026-03-10', featured: true },
      { id: 'buddhism-zafu', name: 'Meditation Cushion (Zafu)', description: 'A zafu supports seated meditation by helping practitioners keep a stable posture during longer sessions of zazen or mindfulness practice [1][2].', priceRange: '$30-80', badges: ['Best Seller'], firstSeen: '2026-02-18', featured: true },
      { id: 'buddhism-singing-bowl', name: 'Singing Bowl', description: 'Singing bowls are used in some Himalayan and Tibetan Buddhist settings for ritual sound, meditation cues, and contemplative atmosphere [1][2].', priceRange: '$30-90', badges: [], firstSeen: '2026-03-02' },
      { id: 'buddhism-buddha-statue', name: 'Buddha Statue, Meditation Pose', description: 'Images of the Buddha function as devotional and instructional reminders, pointing attention toward awakening, calm, and compassion rather than toward worship of an object itself [1][2].', priceRange: '$25-75', badges: ['Top Rated'], firstSeen: '2026-02-26', featured: true },
      { id: 'buddhism-incense-holder', name: 'Incense Holder with Sandalwood Incense', description: 'Incense is widely used across Buddhist Asia as an offering and as a sensory marker of reverence, remembrance, and meditative focus [1][2].', priceRange: '$12-30', badges: [], firstSeen: '2026-03-14' },
      { id: 'buddhism-prayer-flags', name: 'Prayer Flags', description: 'Prayer flags are especially associated with Tibetan Buddhism, where printed prayers and blessings are hung so that wind symbolically carries them outward [1][2].', priceRange: '$10-25', badges: ['New'], firstSeen: '2026-03-18' },
      { id: 'buddhism-zen-garden', name: 'Zen Garden Kit', description: 'Miniature Zen gardens echo the aesthetics of Japanese contemplative space and are often used as desk reminders of simplicity, order, and attention [1][2].', priceRange: '$20-50', badges: ['Best Seller'], firstSeen: '2026-01-28', featured: true },
    ],
  },
  hinduism: {
    slug: 'hinduism',
    traditionName: 'Hinduism',
    intro: 'Hindu devotional life often includes home shrine practice, temple offerings, sacred imagery, and objects used in puja, festival observance, and daily remembrance [1][2].',
    items: [
      { id: 'hinduism-puja-thali', name: 'Puja Thali Set', description: 'A puja thali is a worship tray used for offerings such as flowers, incense, lamps, and blessed food in home or temple devotion [1][2].', priceRange: '$25-60', badges: ['Staff Pick'], firstSeen: '2026-03-04', featured: true },
      { id: 'hinduism-ganesh-statue', name: 'Ganesh Statue', description: 'Images of Ganesha are common in homes and shops because the deity is widely associated with wisdom and the removal of obstacles [1][2].', priceRange: '$30-90', badges: ['Best Seller'], firstSeen: '2026-02-12', featured: true },
      { id: 'hinduism-om-art', name: 'Om Symbol Wall Art', description: 'The syllable Om is treated as a sacred sound in many Hindu traditions and appears in homes, shrines, and devotional art [1][2].', priceRange: '$15-40', badges: [], firstSeen: '2026-01-31' },
      { id: 'hinduism-rudraksha', name: 'Rudraksha Mala Beads', description: 'Rudraksha beads are especially associated with Shaiva devotion and may be worn or used for mantra recitation and prayer [1][2].', priceRange: '$18-45', badges: ['Top Rated'], firstSeen: '2026-03-09' },
      { id: 'hinduism-diya', name: 'Brass Diya Oil Lamp', description: 'The diya is a lamp used in puja and festival settings, especially as a symbol of light, blessing, and divine presence [1][2].', priceRange: '$15-40', badges: ['Staff Pick'], firstSeen: '2026-03-16', featured: true },
      { id: 'hinduism-incense', name: 'Incense Set with Holder', description: 'Incense is a familiar part of many Hindu devotional settings, helping mark puja as reverent, fragrant, and set apart from ordinary activity [1][2].', priceRange: '$12-30', badges: ['New'], firstSeen: '2026-03-20' },
      { id: 'hinduism-krishna-statue', name: 'Krishna Statue', description: 'Krishna imagery is especially important in Vaishnava devotion, where visual presence supports prayer, song, and loving remembrance [1][2].', priceRange: '$30-90', badges: ['Top Rated'], firstSeen: '2026-02-14' },
    ],
  },
  islam: {
    slug: 'islam',
    traditionName: 'Islam',
    intro: 'Islamic material culture often emphasizes prayer, Quranic recitation, calligraphy, and respectful adornment rather than figurative sacred imagery in worship settings [1][2].',
    items: [
      { id: 'islam-prayer-mat', name: 'Prayer Mat (Janamaz)', description: 'Prayer mats create a clean, dedicated surface for salah and often include visual orientation cues for prayer [1][2].', priceRange: '$20-50', badges: ['Staff Pick', 'Best Seller'], firstSeen: '2026-03-05', featured: true },
      { id: 'islam-rihal', name: 'Quran Stand (Rihal)', description: 'A wooden or carved stand helps support the Quran during reading and recitation, especially in home study and teaching contexts [1][2].', priceRange: '$20-50', badges: [], firstSeen: '2026-02-22' },
      { id: 'islam-tasbeeh', name: 'Tasbeeh Prayer Beads', description: 'Prayer beads are used by many Muslims to count repeated phrases of remembrance, especially forms of dhikr [1][2].', priceRange: '$12-30', badges: ['Top Rated'], firstSeen: '2026-03-03', featured: true },
      { id: 'islam-calligraphy', name: 'Arabic Calligraphy Wall Art', description: 'Islamic calligraphy has long been a major art form, expressing reverence through Quranic verses, divine names, and sacred phrases [1][2].', priceRange: '$30-90', badges: ['Top Rated'], firstSeen: '2026-02-10' },
      { id: 'islam-attar', name: 'Attar Perfume Oil', description: 'Perfume oils are used in many Muslim cultures as part of grooming, hospitality, and preparation for prayer and communal gathering [1][2].', priceRange: '$15-40', badges: ['New'], firstSeen: '2026-03-19' },
      { id: 'islam-kaaba-model', name: 'Kaaba Decorative Model', description: 'Decorative Kaaba models are used as educational or commemorative objects, especially in homes where Hajj memory is important [1][2].', priceRange: '$20-50', badges: ['Best Seller'], firstSeen: '2026-01-24' },
    ],
  },
  christianity: {
    slug: 'christianity',
    traditionName: 'Christianity',
    intro: 'Christian objects vary widely across Catholic, Orthodox, and Protestant settings, but crosses, devotional aids, icons, journals, and festival items remain common markers of religious life [1][2].',
    items: [
      { id: 'christianity-cross-necklace', name: 'Cross Necklace', description: 'The cross is Christianity\'s most recognizable symbol, used in jewelry and devotion as a reminder of Jesus\' crucifixion and resurrection [1][2].', priceRange: '$15-40', badges: ['Best Seller'], firstSeen: '2026-02-09', featured: true },
      { id: 'christianity-rosary', name: 'Rosary Beads', description: 'The rosary is especially associated with Catholic prayer, where repeated formulas and mysteries structure meditation on the life of Christ and Mary [1][2].', priceRange: '$12-30', badges: ['Staff Pick', 'Top Rated'], firstSeen: '2026-03-11', featured: true },
      { id: 'christianity-journal', name: 'Prayer Journal', description: 'Prayer journals support reflection, gratitude, scripture note-taking, and personal devotional routines in many Christian settings [1][2].', priceRange: '$15-35', badges: ['Top Rated'], firstSeen: '2026-02-21' },
      { id: 'christianity-nativity', name: 'Nativity Set', description: 'Nativity sets visually retell the Christmas story and are common in homes and churches during Advent and Christmas observance [1][2].', priceRange: '$40-120', badges: [], firstSeen: '2026-01-19' },
      { id: 'christianity-icon-prints', name: 'Orthodox Icon Prints', description: 'Icons hold particular importance in Eastern Christianity, where they serve devotional, liturgical, and teaching purposes [1][2].', priceRange: '$20-50', badges: ['Staff Pick'], firstSeen: '2026-03-06', featured: true },
      { id: 'christianity-candles', name: 'Devotional Candles', description: 'Candles are used in many churches and homes as signs of prayer, remembrance, vigil, and sacred presence [1][2].', priceRange: '$15-40', badges: [], firstSeen: '2026-02-03' },
      { id: 'christianity-bible-cover', name: 'Bible Cover or Case', description: 'Bible covers protect a frequently used personal scripture copy and often include space for notes, pens, or study materials [1][2].', priceRange: '$18-45', badges: ['Best Seller'], firstSeen: '2026-02-25' },
    ],
  },
  judaism: {
    slug: 'judaism',
    traditionName: 'Judaism',
    intro: 'Jewish material culture is closely tied to sacred time, household ritual, memory, and commandments, especially around Shabbat, festivals, and visible covenantal identity [1][2].',
    items: [
      { id: 'judaism-menorah', name: 'Menorah', description: 'The menorah is most widely recognized in Hanukkah observance, where lighting marks the eight-day festival of rededication [1][2].', priceRange: '$40-120', badges: ['Staff Pick'], firstSeen: '2026-03-08', featured: true },
      { id: 'judaism-mezuzah', name: 'Mezuzah Case', description: 'A mezuzah case holds a scroll with biblical verses and is attached to doorposts in fulfillment of a commandment and as a sign of Jewish home identity [1][2].', priceRange: '$20-50', badges: ['Top Rated'], firstSeen: '2026-02-17', featured: true },
      { id: 'judaism-kiddush-cup', name: 'Kiddush Cup', description: 'The Kiddush cup is used for blessings over wine on Shabbat and festivals, making it a central household ritual item [1][2].', priceRange: '$20-50', badges: [], firstSeen: '2026-02-28' },
      { id: 'judaism-candle-holders', name: 'Shabbat Candle Holders', description: 'Many Jewish households light candles before Shabbat, marking sacred time and a transition from weekday labor to rest [1][2].', priceRange: '$30-80', badges: ['Staff Pick', 'New'], firstSeen: '2026-03-17' },
      { id: 'judaism-jewelry', name: 'Star of David Jewelry', description: 'The Magen David functions as a common visual marker of Jewish identity, memory, and belonging in modern Jewish life [1][2].', priceRange: '$15-40', badges: ['Best Seller'], firstSeen: '2026-01-22' },
      { id: 'judaism-seder-plate', name: 'Seder Plate', description: 'A seder plate organizes symbolic foods used during the Passover meal, connecting household ritual to Exodus memory and interpretation [1][2].', priceRange: '$25-60', badges: [], firstSeen: '2026-02-06' },
      { id: 'judaism-tzedakah', name: 'Tzedakah Box', description: 'A tzedakah box supports the practice of charitable giving, linking household life to the ethical obligation of justice and generosity [1][2].', priceRange: '$15-35', badges: ['Top Rated'], firstSeen: '2026-03-01' },
    ],
  },
  sikhism: {
    slug: 'sikhism',
    traditionName: 'Sikhism',
    intro: 'Sikh objects are often closely tied to identity, scripture reverence, service, and the historical memory of the Khalsa [1][2].',
    items: [
      { id: 'sikhism-khanda-art', name: 'Khanda Symbol Wall Art', description: 'The Khanda symbol combines elements associated with divine unity, moral courage, and Sikh communal identity [1][2].', priceRange: '$20-50', badges: ['Best Seller'], firstSeen: '2026-02-11', featured: true },
      { id: 'sikhism-kara', name: 'Kara Steel Bangle', description: 'The kara is one of the five visible articles of faith associated with initiated Khalsa Sikhs and symbolizes restraint, discipline, and divine remembrance [1][2].', priceRange: '$15-40', badges: ['Staff Pick', 'Top Rated'], firstSeen: '2026-03-13', featured: true },
      { id: 'sikhism-kirpan', name: 'Ceremonial Kirpan, Decorative', description: 'The kirpan is one of the Sikh articles of faith and symbolizes moral responsibility, dignity, and the defense of justice [1][2].', priceRange: '$40-120', badges: [], firstSeen: '2026-02-07' },
      { id: 'sikhism-gutka', name: 'Gutka Prayer Book', description: 'A gutka is a portable collection of Sikh prayers used for daily devotion and remembrance [1][2].', priceRange: '$12-30', badges: ['Top Rated'], firstSeen: '2026-03-07' },
      { id: 'sikhism-rumala', name: 'Rumala Cloth Cover', description: 'Rumala cloths are used to cover the Guru Granth Sahib respectfully, reflecting the scripture\'s status as the eternal Guru [1][2].', priceRange: '$30-80', badges: ['New'], firstSeen: '2026-03-18' },
    ],
  },
  taoism: {
    slug: 'taoism',
    traditionName: 'Taoism',
    intro: 'Taoist material culture spans classic texts, household symbolism, incense, and objects tied to cultivation, harmony, and ritual practice [1][2].',
    items: [
      { id: 'taoism-yinyang', name: 'Yin Yang Decor', description: 'The yin yang symbol represents dynamic complementarity and balance, a widely recognized visual shorthand for classical Chinese cosmology [1][2].', priceRange: '$15-40', badges: ['Best Seller'], firstSeen: '2026-02-08', featured: true },
      { id: 'taoism-taoteching', name: 'Tao Te Ching Gift Edition', description: 'Gift editions of the Tao Te Ching make the foundational Taoist classic accessible for reading, reflection, and display [1][2].', priceRange: '$12-30', badges: ['Staff Pick'], firstSeen: '2026-03-12', featured: true },
      { id: 'taoism-fengshui', name: 'Feng Shui Compass', description: 'The luopan compass is associated with classical feng shui traditions that connect orientation, space, and cosmological harmony [1][2].', priceRange: '$30-90', badges: [], firstSeen: '2026-02-23' },
      { id: 'taoism-taichi', name: 'Tai Chi Training Set', description: 'Tai chi materials are often used for movement practice connected to balance, breath, discipline, and classical Chinese cultivation traditions [1][2].', priceRange: '$20-50', badges: ['Top Rated'], firstSeen: '2026-03-15' },
      { id: 'taoism-incense-burner', name: 'Chinese Incense Burner', description: 'Incense burners are common in household and temple devotional settings across Chinese religious life, including Taoist practice [1][2].', priceRange: '$18-45', badges: [], firstSeen: '2026-02-01' },
    ],
  },
  shinto: {
    slug: 'shinto',
    traditionName: 'Shinto',
    intro: 'Shinto material culture often centers on shrine memory, purification, protective charms, and symbolic markers of sacred space [1][2].',
    items: [
      { id: 'shinto-torii', name: 'Torii Gate Decor', description: 'The torii marks a transition into shrine space and remains one of the most recognizable symbols of Shinto sacred geography [1][2].', priceRange: '$20-50', badges: ['Best Seller'], firstSeen: '2026-02-13', featured: true },
      { id: 'shinto-omamori', name: 'Omamori Protective Charm', description: 'Omamori are protective amulets sold at shrines for purposes such as travel safety, exam success, or health [1][2].', priceRange: '$10-25', badges: ['Staff Pick', 'New'], firstSeen: '2026-03-17', featured: true },
      { id: 'shinto-shimenawa', name: 'Shimenawa Sacred Rope Decor', description: 'Shimenawa ropes mark spaces, trees, or objects as sacred or ritually significant in Shinto practice [1][2].', priceRange: '$18-45', badges: [], firstSeen: '2026-02-27' },
      { id: 'shinto-daruma', name: 'Daruma Doll', description: 'Daruma dolls are widely used in Japanese goal-setting and perseverance traditions and are often connected to temple and cultural practice [1][2].', priceRange: '$15-40', badges: ['Top Rated'], firstSeen: '2026-03-05' },
      { id: 'shinto-incense', name: 'Japanese Incense Set', description: 'Japanese incense sets are often used for household ritual atmosphere, remembrance, and calm in spaces shaped by shrine and temple culture [1][2].', priceRange: '$15-40', badges: [], firstSeen: '2026-02-20' },
    ],
  },
  jainism: {
    slug: 'jainism',
    traditionName: 'Jainism',
    intro: 'Jain traditions place unusually strong emphasis on discipline, nonviolence, and restraint. The relatively modest commercial footprint of Jain items reflects that ethos [1][2].',
    items: [
      { id: 'jainism-symbol-art', name: 'Jain Symbol Wall Art', description: 'The Jain emblem and ahimsa hand are often used as visual teaching tools for nonviolence, truth, and liberation [1][2].', priceRange: '$15-40', badges: [], firstSeen: '2026-02-24' },
      { id: 'jainism-prayer-book', name: 'Jain Prayer or Sutra Book', description: 'Prayer books and sutra collections support recitation, study, and household devotion in Jain communities [1][2].', priceRange: '$12-30', badges: ['Staff Pick'], firstSeen: '2026-03-08' },
      { id: 'jainism-tirthankara', name: 'Tirthankara Statue', description: 'Images of Tirthankaras can function as contemplative focal points that represent perfected beings and the possibility of liberation [1][2].', priceRange: '$30-80', badges: ['Top Rated'], firstSeen: '2026-03-01' },
    ],
  },
  zoroastrianism: {
    slug: 'zoroastrianism',
    traditionName: 'Zoroastrianism',
    intro: 'Zoroastrian communities have a smaller global footprint, so commercial items are fewer. Available objects usually emphasize symbols, texts, and heritage memory [1][2].',
    items: [
      { id: 'zoroastrianism-faravahar', name: 'Faravahar Pendant or Wall Art', description: 'The Faravahar is widely used as a visual marker of Zoroastrian heritage and identity, even though its interpretation varies [1][2].', priceRange: '$15-40', badges: ['Best Seller'], firstSeen: '2026-02-04' },
      { id: 'zoroastrianism-avesta', name: 'Avesta or Prayer Book Edition', description: 'Prayer books and scripture editions support study and devotional recitation for a tradition whose liturgical memory remains textually rich [1][2].', priceRange: '$12-30', badges: ['Staff Pick'], firstSeen: '2026-03-09' },
      { id: 'zoroastrianism-fire-holder', name: 'Sacred Flame Inspired Candle Holder', description: 'Flame imagery appears frequently in Zoroastrian heritage items because fire symbolizes truth, purity, and divine order in ritual life [1][2].', priceRange: '$25-60', badges: [], firstSeen: '2026-03-03' },
    ],
  },
  'bahai-faith': {
    slug: 'bahai-faith',
    traditionName: 'Baha’i Faith',
    intro: 'The Baha’i Faith generally emphasizes devotion, scripture, and unity more than a large commercial object culture, so available items tend to be modest and symbolic [1][2].',
    items: [
      { id: 'bahai-ringstone', name: 'Ringstone Symbol Jewelry', description: 'The ringstone symbol is a recognizable Baha’i design used in jewelry and devotional art to express divine connection and the station of the Manifestations [1][2].', priceRange: '$18-45', badges: ['Staff Pick'], firstSeen: '2026-03-06' },
      { id: 'bahai-prayer-book', name: 'Baha’i Prayer Book', description: 'Prayer books gather devotional texts used in personal and communal worship across the Baha’i world [1][2].', priceRange: '$12-30', badges: ['Top Rated'], firstSeen: '2026-02-16' },
      { id: 'bahai-nine-pointed-star', name: 'Nine-Pointed Star Decor', description: 'The nine-pointed star is commonly used in Baha’i settings as a visual sign of unity and completeness [1][2].', priceRange: '$15-40', badges: ['New'], firstSeen: '2026-03-20' },
    ],
  },
  confucianism: {
    slug: 'confucianism',
    traditionName: 'Confucianism',
    intro: 'Confucian traditions are often expressed through texts, ancestral reverence, calligraphy, and cultivated study rather than a large retail culture of devotional objects [1][2].',
    items: [
      { id: 'confucianism-analects', name: 'Analects Gift Edition', description: 'A well-made edition of the Analects supports the study of moral cultivation, ritual propriety, and social ethics central to Confucian thought [1][2].', priceRange: '$10-24', badges: ['Staff Pick'], firstSeen: '2026-03-07' },
      { id: 'confucianism-calligraphy', name: 'Confucian Calligraphy Art', description: 'Calligraphy featuring virtues such as ren or li can serve as a household reminder of moral cultivation and disciplined learning [1][2].', priceRange: '$18-42', badges: [], firstSeen: '2026-02-15' },
      { id: 'confucianism-ancestor-tablet', name: 'Ancestor Memorial Tablet Decor', description: 'Objects inspired by ancestral remembrance reflect the importance of family continuity, reverence, and ritual memory in East Asian traditions shaped by Confucian ethics [1][2].', priceRange: '$18-48', badges: ['Top Rated'], firstSeen: '2026-03-02' },
    ],
  },
  catholicism: {
    slug: 'catholicism',
    traditionName: 'Catholicism',
    intro: 'Catholic material culture often centers sacramentals, Marian devotion, saintly memory, and home prayer. These objects are best understood as aids to worship and remembrance, not as replacements for sacramental life [1][2].',
    items: [
      { id: 'catholicism-rosary', name: 'Catholic Rosary Beads', description: 'The rosary guides repeated prayer and meditation on the mysteries of the lives of Jesus and Mary in Catholic devotion. It is one of the most recognizable Catholic sacramentals for home prayer, pilgrimage, and parish gift giving [1][2].', priceRange: '$12-35', amazonUrl: buildAmazonSearchUrl('catholic rosary beads'), badges: ['Staff Pick'], firstSeen: '2026-03-23', featured: true },
      { id: 'catholicism-brown-scapular', name: 'Brown Scapular', description: 'The Brown Scapular is a devotional garment associated with Carmelite spirituality and Marian dedication. Many Catholics wear it as a sign of prayer, commitment, and spiritual remembrance rather than as a magical object [1][2].', priceRange: '$8-18', amazonUrl: buildAmazonSearchUrl('brown scapular catholic'), badges: [], firstSeen: '2026-03-23' },
      { id: 'catholicism-holy-water-font', name: 'Holy Water Font for Home', description: 'A small home holy water font holds blessed water near a doorway or prayer corner, helping mark the sign of the cross on entering or leaving. It connects domestic space with habits of blessing and remembrance [1][2].', priceRange: '$18-45', amazonUrl: buildAmazonSearchUrl('holy water font wall mount catholic'), badges: [], firstSeen: '2026-03-23' },
      { id: 'catholicism-saint-medal', name: 'Saint Medal Necklace', description: 'Saint medals, such as Saint Christopher or the Miraculous Medal, are worn as reminders of intercession, discipleship, and Catholic identity. They function as personal devotional symbols more than as liturgical necessities [1][2].', priceRange: '$15-40', amazonUrl: buildAmazonSearchUrl('miraculous medal necklace catholic'), badges: [], firstSeen: '2026-03-23' },
      { id: 'catholicism-prayer-cards', name: 'Catholic Prayer Card Set', description: 'Catholic prayer cards pair short devotional texts with sacred images of Jesus, Mary, saints, or feast days. They are widely used for memorized prayer, gift exchange, and parish instruction [1][2].', priceRange: '$10-24', amazonUrl: buildAmazonSearchUrl('catholic prayer card set'), badges: [], firstSeen: '2026-03-23' },
      { id: 'catholicism-crucifix', name: 'Crucifix Wall Cross', description: 'A crucifix, unlike a plain cross, includes the figure of Christ and keeps the Passion visually central in Catholic homes, classrooms, and hospitals. It is commonly displayed in prayer spaces and above doorways [1][2].', priceRange: '$25-75', amazonUrl: buildAmazonSearchUrl('catholic crucifix wall cross'), badges: [], firstSeen: '2026-03-23' },
      { id: 'catholicism-first-communion-set', name: 'First Communion Gift Set', description: 'First Communion gift sets often combine a rosary, prayer book, keepsake box, or cross for a child celebrating the sacrament. They mark a major moment of initiation into the Eucharistic life of the church [1][2].', priceRange: '$25-60', amazonUrl: buildAmazonSearchUrl('first communion gift set catholic'), badges: ['New'], firstSeen: '2026-03-23' },
    ],
  },
  'orthodox-christianity': {
    slug: 'orthodox-christianity',
    traditionName: 'Orthodox Christianity',
    intro: 'Orthodox material culture is shaped by icons, candles, prayer ropes, incense, and the home icon corner. These objects support veneration, remembrance, and prayer within a liturgical tradition that emphasizes continuity with historic Christian worship [1][2].',
    items: [
      { id: 'orthodox-icon', name: 'Orthodox Icon, Mounted or Framed', description: 'Icons of Christ, the Theotokos, or the saints are venerated in Orthodox Christianity as windows into sacred memory and worship. They are kissed, censed, and placed in homes or churches as aids to prayer, not as ordinary decoration [1][2].', priceRange: '$25-90', amazonUrl: buildAmazonSearchUrl('orthodox icon mounted christ pantocrator'), badges: ['Staff Pick'], firstSeen: '2026-03-23', featured: true },
      { id: 'orthodox-prayer-rope', name: 'Orthodox Prayer Rope', description: 'An Orthodox prayer rope, often called a chotki or komboskini, helps count the Jesus Prayer in personal devotion. Its knots support steady repetition, attention, and repentance in monastic and lay practice [1][2].', priceRange: '$12-28', amazonUrl: buildAmazonSearchUrl('orthodox prayer rope chotki'), badges: [], firstSeen: '2026-03-23' },
      { id: 'orthodox-incense-set', name: 'Incense and Charcoal Set', description: 'Orthodox worship makes extensive use of incense as a sign of prayer rising before God and as a way of honoring icons, scripture, and the gathered people. Home prayer corners often use small incense and charcoal sets as well [1][2].', priceRange: '$18-40', amazonUrl: buildAmazonSearchUrl('orthodox incense charcoal set'), badges: [], firstSeen: '2026-03-23' },
      { id: 'orthodox-icon-shelf', name: 'Icon Corner Shelf', description: 'Many Orthodox homes maintain an icon corner, a dedicated place for icons, candles, and prayer. A corner shelf helps set apart that domestic space for daily devotion and feast day observance [1][2].', priceRange: '$30-80', amazonUrl: buildAmazonSearchUrl('orthodox icon corner shelf'), badges: [], firstSeen: '2026-03-23' },
      { id: 'orthodox-cross-necklace', name: 'Orthodox Cross Necklace', description: 'The three bar Orthodox cross is a familiar emblem of Eastern Christian identity and memory. Worn as jewelry, it signals belonging, baptismal commitment, and reverence [1][2].', priceRange: '$18-45', amazonUrl: buildAmazonSearchUrl('orthodox cross necklace three bar'), badges: [], firstSeen: '2026-03-23' },
      { id: 'orthodox-beeswax-candles', name: 'Beeswax Taper Candles', description: 'Beeswax taper candles are widely used in Orthodox churches and home prayer because they burn cleanly and carry strong liturgical symbolism. Lighting a candle often accompanies intercession, remembrance, and icon veneration [1][2].', priceRange: '$15-35', amazonUrl: buildAmazonSearchUrl('beeswax taper candles orthodox'), badges: ['New'], firstSeen: '2026-03-23' },
    ],
  },
  protestantism: {
    slug: 'protestantism',
    traditionName: 'Protestantism',
    intro: 'Protestant communities often emphasize scripture reading, preaching, congregational song, and personal devotion more than a large sacramental object culture. Many common items support Bible study, worship planning, journaling, and household remembrance [1][2].',
    items: [
      { id: 'protestantism-study-bible', name: 'Study Bible, NIV or ESV', description: 'Study Bibles pair the biblical text with notes, maps, introductions, and cross references that support sermon listening and personal study. They are among the most common Protestant gifts for confirmation, graduation, and new believers [1][2].', priceRange: '$30-70', amazonUrl: buildAmazonSearchUrl('niv esv study bible'), badges: ['Staff Pick'], firstSeen: '2026-03-23', featured: true },
      { id: 'protestantism-devotional-journal', name: 'Devotional Journal', description: 'A devotional journal gives space for prayer requests, scripture notes, and reflections from sermons or daily readings. It reflects the Protestant habit of pairing personal piety with direct engagement with the Bible [1][2].', priceRange: '$12-28', amazonUrl: buildAmazonSearchUrl('christian devotional journal'), badges: [], firstSeen: '2026-03-23' },
      { id: 'protestantism-hymnal', name: 'Protestant Hymnal Book', description: 'Hymnals preserve congregational songs that shape memory, doctrine, and shared worship across Protestant churches. Printed collections remain useful for choirs, home singing, and church musicians even in digital settings [1][2].', priceRange: '$15-35', amazonUrl: 'https://www.amazon.com/s?k=protestant%20hymnal%20book&tag=religioncompa-20', badges: [], firstSeen: '2026-03-23' },
      { id: 'protestantism-wwjd-bracelet', name: 'WWJD Bracelet', description: 'WWJD bracelets popularize the phrase What Would Jesus Do, turning a short moral prompt into a visible reminder of discipleship. They are especially associated with evangelical youth culture and personal witness [1][2].', priceRange: '$8-16', amazonUrl: buildAmazonSearchUrl('WWJD bracelet'), badges: [], firstSeen: '2026-03-23' },
      { id: 'protestantism-portable-communion-set', name: 'Portable Communion Set', description: 'Portable communion sets are commonly used by chaplains, pastors, and small group leaders who bring the Lord’s Supper to hospitals, homes, or retreats. Their use varies by denomination, but they support pastoral care outside the main sanctuary [1][2].', priceRange: '$35-85', amazonUrl: buildAmazonSearchUrl('portable communion set'), badges: ['New'], firstSeen: '2026-03-23' },
    ],
  },
  'latter-day-saints': {
    slug: 'latter-day-saints',
    traditionName: 'Latter-day Saints',
    intro: 'Latter-day Saint material culture often centers scripture study, family devotion, missionary preparation, and temple-centered memory. Many popular items function as reminders of covenant living and home religious practice [1][2].',
    items: [
      { id: 'lds-book-of-mormon', name: 'Book of Mormon, Leather Bound Edition', description: 'The Book of Mormon is central to Latter-day Saint scripture study alongside the Bible and other standard works. A durable edition is commonly used for personal reading, family study, and missionary preparation [1][2].', priceRange: '$20-45', amazonUrl: buildAmazonSearchUrl('book of mormon leather bound edition'), badges: ['Staff Pick'], firstSeen: '2026-03-23', featured: true },
      { id: 'lds-ctr-ring', name: 'CTR Ring', description: 'CTR stands for Choose the Right, a phrase widely taught in Latter-day Saint childhood formation and youth culture. The ring functions as a wearable reminder of moral agency, covenant identity, and daily discipleship [1][2].', priceRange: '$10-28', amazonUrl: buildAmazonSearchUrl('CTR ring LDS'), badges: [], firstSeen: '2026-03-23' },
      { id: 'lds-temple-art', name: 'LDS Temple Art Print', description: 'Temple art prints depict important temples and are frequently displayed in homes as reminders of sealing, worship, and long term spiritual goals. They often mark weddings, missionary farewells, and family milestones [1][2].', priceRange: '$15-50', amazonUrl: buildAmazonSearchUrl('LDS temple painting'), badges: [], firstSeen: '2026-03-23' },
      { id: 'lds-scripture-case', name: 'Scripture Case or Cover', description: 'Scripture cases protect well used copies of the standard works and create space for notes, pens, and study tabs. They are common gifts for seminary students, missionaries, and youth classes [1][2].', priceRange: '$18-40', amazonUrl: buildAmazonSearchUrl('LDS scripture case'), badges: [], firstSeen: '2026-03-23' },
      { id: 'lds-missionary-gift', name: 'Missionary Preparation Gift', description: 'Missionary themed gifts often combine journals, luggage tags, art, or keepsakes that mark a person’s call to serve. They reflect the strong place of missionary work in Latter-day Saint communal life [1][2].', priceRange: '$15-40', amazonUrl: buildAmazonSearchUrl('LDS missionary gift'), badges: [], firstSeen: '2026-03-23' },
      { id: 'lds-family-home-evening-kit', name: 'Family Home Evening Kit', description: 'Family home evening kits gather lesson prompts, games, and scripture activities for weekly household religious teaching. They support the Latter-day Saint emphasis on family centered formation and shared study [1][2].', priceRange: '$20-45', amazonUrl: buildAmazonSearchUrl('LDS family home evening'), badges: ['New'], firstSeen: '2026-03-23' },
    ],
  },
  'paganism-wicca': {
    slug: 'paganism-wicca',
    traditionName: 'Paganism & Wicca',
    intro: 'Pagan and Wiccan material culture often centers home ritual, seasonal observance, divination, and symbolic tools gathered for a personal altar. Practice varies widely, so these items are best read as common tools within modern Pagan and Wiccan settings rather than a universal checklist [1][2].',
    items: [
      { id: 'paganism-altar-kit', name: 'Altar Kit Starter Set', description: 'Starter altar kits often bundle candles, incense, a pentacle tile, and small ritual tools for a new practitioner’s working space. They are common entry points for people learning how modern Pagan and Wiccan altars are arranged [1][2].', priceRange: '$35-90', amazonUrl: buildAmazonSearchUrl('wiccan altar kit'), badges: ['Staff Pick'], firstSeen: '2026-03-23', featured: true },
      { id: 'paganism-pentacle-necklace', name: 'Pentacle Necklace', description: 'The pentacle is one of the most widely recognized symbols in Wiccan and broader Pagan settings. Worn as jewelry, it often signifies protection, elemental balance, and religious identity [1][2].', priceRange: '$12-32', amazonUrl: buildAmazonSearchUrl('pentacle pendant necklace'), badges: [], firstSeen: '2026-03-23' },
      { id: 'paganism-tarot-deck', name: 'Tarot Card Deck, Rider Waite Style', description: 'Tarot decks are used by many Pagan and Wiccan practitioners for divination, meditation, and symbolic reflection. The Rider Waite tradition remains a common starting point because its imagery is widely taught and interpreted [1][2].', priceRange: '$15-30', amazonUrl: buildAmazonSearchUrl('Rider Waite tarot deck'), badges: [], firstSeen: '2026-03-23' },
      { id: 'paganism-crystal-set', name: 'Crystal Set for Rituals', description: 'Crystal sets are commonly used in modern Pagan practice for altar decoration, intention setting, and ritual symbolism. Meanings assigned to particular stones vary, but the sets often serve as tactile aids for focus and seasonal work [1][2].', priceRange: '$15-35', amazonUrl: buildAmazonSearchUrl('healing crystal set'), badges: [], firstSeen: '2026-03-23' },
      { id: 'paganism-athame', name: 'Athame or Ritual Knife', description: 'An athame is a ceremonial blade used in some Wiccan traditions for directing energy and marking ritual space. It is typically symbolic rather than utilitarian and is handled according to tradition specific etiquette [1][2].', priceRange: '$20-55', amazonUrl: buildAmazonSearchUrl('athame ritual knife'), badges: [], firstSeen: '2026-03-23' },
      { id: 'paganism-book-of-shadows', name: 'Book of Shadows Journal', description: 'A Book of Shadows is a personal or coven journal used to keep rituals, correspondences, seasonal notes, and reflections. It combines study, memory, and practice in a single working text [1][2].', priceRange: '$15-35', amazonUrl: buildAmazonSearchUrl('book of shadows journal'), badges: [], firstSeen: '2026-03-23' },
      { id: 'paganism-sage-bundle', name: 'Sage Smudge Stick Bundle', description: 'Bundles marketed for smoke cleansing are common in modern spiritual retail, including Pagan shops and online marketplaces. Because white sage also holds importance in Indigenous traditions, many practitioners encourage careful sourcing and cultural awareness when choosing these products [1][2].', priceRange: '$10-22', amazonUrl: buildAmazonSearchUrl('white sage smudge stick'), badges: ['New'], firstSeen: '2026-03-23' },
    ],
  },
  'african-diaspora': {
    slug: 'african-diaspora',
    traditionName: 'African Diaspora Religions',
    intro: 'African Diaspora religions such as Vodou, Santería, and Candomblé involve lineages, initiatory boundaries, and regionally specific altar practice. Because sacred objects can be tradition specific, this guide emphasizes widely recognized candles, cleansing tools, and heritage symbols that often appear in storefront and household practice [1][2].',
    items: [
      { id: 'african-diaspora-seven-powers-candle', name: 'Seven African Powers Candle', description: 'Seven African Powers candles are widely sold in botanicas and spiritual supply shops connected to Afro Caribbean devotional practice. They bring together imagery and petitionary prayer associated with several powerful orishas or lwa in popular devotional settings [1][2].', priceRange: '$10-20', amazonUrl: buildAmazonSearchUrl('seven african powers candle'), badges: ['Staff Pick'], firstSeen: '2026-03-23', featured: true },
      { id: 'african-diaspora-orisha-statue', name: 'Orisha Statue or Figure', description: 'Orisha figures are used in some homes and spiritual shops as visual reminders of deities, stories, and ritual identities tied to traditions such as Santería and Candomblé. Specific ritual uses vary widely by lineage and initiation status [1][2].', priceRange: '$25-75', amazonUrl: buildAmazonSearchUrl('orisha statue'), badges: [], firstSeen: '2026-03-23' },
      { id: 'african-diaspora-cowrie-set', name: 'Cowrie Shell Divination Set', description: 'Cowrie shells are strongly associated with divination and spiritual consultation across several African and African Diaspora traditions. Sets sold to the public often function as educational or symbolic items unless a buyer has training in a specific practice [1][2].', priceRange: '$12-28', amazonUrl: buildAmazonSearchUrl('cowrie shells divination'), badges: [], firstSeen: '2026-03-23' },
      { id: 'african-diaspora-florida-water', name: 'Florida Water Cologne', description: 'Florida Water is widely used in cleansing, blessing, and altar preparation across many African Diaspora spiritual settings. It is one of the most recognizable crossover products between household ritual and commercial spiritual supply culture [1][2].', priceRange: '$8-18', amazonUrl: buildAmazonSearchUrl('florida water spiritual'), badges: [], firstSeen: '2026-03-23' },
      { id: 'african-diaspora-ancestor-cloth', name: 'Ancestor Altar Cloth', description: 'Ancestor altar cloths help define and beautify a ritual surface dedicated to remembrance, offerings, and family honor. They are especially useful in home shrine settings where cloth, color, and pattern communicate reverence [1][2].', priceRange: '$15-35', amazonUrl: buildAmazonSearchUrl('african ancestor altar cloth'), badges: [], firstSeen: '2026-03-23' },
      { id: 'african-diaspora-libation-cup', name: 'Libation Cup', description: 'Libation cups are used for pouring offerings in ceremonies that honor ancestors, deities, or the dead. Their presence highlights the importance of reciprocity, remembrance, and ritual hospitality in many African Diaspora traditions [1][2].', priceRange: '$18-42', amazonUrl: buildAmazonSearchUrl('libation cup african'), badges: ['New'], firstSeen: '2026-03-23' },
    ],
  },
  rastafari: {
    slug: 'rastafari',
    traditionName: 'Rastafari',
    intro: 'Rastafari material culture often centers Ethiopian memory, biblical imagery, music, and symbols of liberation and Black dignity. Many common items are identity markers and visual reminders rather than formal liturgical requirements [1][2].',
    items: [
      { id: 'rastafari-lion-of-judah', name: 'Lion of Judah Flag or Tapestry', description: 'The Lion of Judah is one of the clearest symbols of Rastafari identity, linking Ethiopian imperial imagery with biblical kingship and liberation. Flags and tapestries often appear in homes, studios, and gathering spaces shaped by Rastafari culture [1][2].', priceRange: '$12-35', amazonUrl: buildAmazonSearchUrl('lion of judah tapestry'), badges: ['Staff Pick'], firstSeen: '2026-03-23', featured: true },
      { id: 'rastafari-ethiopian-cross', name: 'Ethiopian Cross Necklace', description: 'Ethiopian cross pendants connect Rastafari identity to Ethiopia, a central symbolic homeland in the movement’s theology and imagination. They are worn as signs of faith, heritage, and solidarity [1][2].', priceRange: '$15-40', amazonUrl: buildAmazonSearchUrl('ethiopian cross pendant'), badges: [], firstSeen: '2026-03-23' },
      { id: 'rastafari-nyabinghi-drum', name: 'Nyabinghi Style Hand Drum', description: 'Drumming is central to many Rastafari gatherings, especially in reasoning sessions and Nyabinghi style music. A hand drum points to the movement’s deep connection between worship, rhythm, and communal memory [1][2].', priceRange: '$45-120', amazonUrl: buildAmazonSearchUrl('african hand drum'), badges: [], firstSeen: '2026-03-23' },
      { id: 'rastafari-haile-selassie-art', name: 'Haile Selassie Portrait Art', description: 'Portraits of Haile Selassie often appear in Rastafari homes and gathering spaces as symbols of reverence, memory, and theological conviction. They also connect the movement to Ethiopian sovereignty and anti colonial identity [1][2].', priceRange: '$15-45', amazonUrl: buildAmazonSearchUrl('haile selassie portrait'), badges: [], firstSeen: '2026-03-23' },
      { id: 'rastafari-rasta-bracelet', name: 'Red Gold Green Bracelet', description: 'Jewelry in the red, gold, and green color pattern expresses Rastafari identity and links the wearer to Ethiopian colors and liberation themes. These items are often worn daily rather than reserved for formal worship [1][2].', priceRange: '$8-18', amazonUrl: buildAmazonSearchUrl('rasta bracelet'), badges: ['New'], firstSeen: '2026-03-23' },
    ],
  },
  'indigenous-traditions': {
    slug: 'indigenous-traditions',
    traditionName: 'Indigenous & Traditional Religions',
    intro: 'Indigenous traditions are diverse, place based, and often tied to specific nations and ceremonial protocols, so no single product list can represent them fairly. When purchasing items connected to Indigenous traditions, we encourage supporting Native owned businesses and artists whenever possible [1][2].',
    items: [
      { id: 'indigenous-dreamcatcher', name: 'Dreamcatcher', description: 'Dreamcatchers are associated especially with Ojibwe and related traditions and are often sold far beyond their original cultural setting. When buying one, it is best to support Native artists so the item reflects living communities rather than generic imitation [1][2].', priceRange: '$15-40', amazonUrl: buildAmazonSearchUrl('dreamcatcher native american'), badges: ['Staff Pick'], firstSeen: '2026-03-23', featured: true },
      { id: 'indigenous-sweetgrass', name: 'Sweetgrass Braid', description: 'Sweetgrass braids are used in some Indigenous traditions for prayer, purification, and honoring sacred space. Use and meaning vary by nation, and responsible purchasing should favor Native harvesters when possible [1][2].', priceRange: '$12-25', amazonUrl: buildAmazonSearchUrl('sweetgrass braid'), badges: [], firstSeen: '2026-03-23' },
      { id: 'indigenous-medicine-bag', name: 'Medicine Bag or Pouch', description: 'Medicine bags are personal carrying pouches used in some Native traditions for items tied to protection, identity, or prayer. Because meanings differ greatly between nations, they should be approached with respect and cultural specificity [1][2].', priceRange: '$18-45', amazonUrl: buildAmazonSearchUrl('medicine bag native american'), badges: [], firstSeen: '2026-03-23' },
      { id: 'indigenous-abalone-shell', name: 'Abalone Shell for Smudging', description: 'Abalone shells are often paired with smoke cleansing bundles in contemporary retail settings and in some Indigenous ceremonial contexts. Their use should be approached carefully because both shell and smoke practices carry specific cultural meanings [1][2].', priceRange: '$12-28', amazonUrl: buildAmazonSearchUrl('abalone shell smudging'), badges: [], firstSeen: '2026-03-23' },
      { id: 'indigenous-talking-stick', name: 'Talking Stick', description: 'Talking sticks are associated with structured listening and respectful turn taking in some Indigenous inspired educational and ceremonial settings. Because the practice is not universal, buyers should treat the object as nation specific rather than as a generic Native symbol [1][2].', priceRange: '$20-55', amazonUrl: buildAmazonSearchUrl('talking stick native american'), badges: ['New'], firstSeen: '2026-03-23' },
    ],
  },
  druze: {
    slug: 'druze',
    traditionName: 'Druze',
    intro: 'The Druze faith is an esoteric tradition, and many sacred practices and texts are reserved for initiated members. The items here represent cultural symbols and introductory study materials rather than liturgical objects [1][2].',
    items: [
      { id: 'druze-star-pendant', name: 'Druze Star Symbol Jewelry', description: 'The five colored Druze star is a visible symbol of communal identity and heritage. Jewelry featuring the star is generally cultural and representational rather than part of ritual worship [1][2].', priceRange: '$15-35', amazonUrl: buildAmazonSearchUrl('druze star pendant'), badges: ['Staff Pick'], firstSeen: '2026-03-23', featured: true },
      { id: 'druze-religion-book', name: 'Book About the Druze Faith', description: 'Introductory books about the Druze faith help readers learn about a community whose inner teachings are not fully public. They are often the most appropriate entry point for respectful study [1][2].', priceRange: '$15-35', amazonUrl: buildAmazonSearchUrl('druze religion book'), badges: [], firstSeen: '2026-03-23' },
      { id: 'druze-flag', name: 'Druze Flag', description: 'The Druze flag uses five colors that correspond to important theological ideas in community teaching and identity. In everyday use it functions as a cultural symbol of visibility and belonging [1][2].', priceRange: '$10-22', amazonUrl: buildAmazonSearchUrl('druze flag'), badges: ['New'], firstSeen: '2026-03-23' },
    ],
  },
  'unitarian-universalism': {
    slug: 'unitarian-universalism',
    traditionName: 'Unitarian Universalism',
    intro: 'Unitarian Universalism draws from many sources and traditions. These items reflect its values of openness, reason, and spiritual exploration rather than a fixed liturgical object culture [1][2].',
    items: [
      { id: 'uu-flaming-chalice', name: 'Flaming Chalice Necklace', description: 'The flaming chalice is the best known symbol of Unitarian Universalism and often appears in worship spaces, congregational logos, and personal jewelry. It represents shared community, conscience, and the search for truth [1][2].', priceRange: '$15-35', amazonUrl: buildAmazonSearchUrl('flaming chalice necklace UU'), badges: ['Staff Pick'], firstSeen: '2026-03-23', featured: true },
      { id: 'uu-principles-poster', name: 'UU Principles Poster or Wall Art', description: 'Posters of the Unitarian Universalist principles are common in classrooms, homes, and congregation offices. They place ethical commitments such as justice, compassion, and interdependence in daily view [1][2].', priceRange: '$12-30', amazonUrl: buildAmazonSearchUrl('unitarian universalist principles poster'), badges: [], firstSeen: '2026-03-23' },
      { id: 'uu-meditation-supplies', name: 'Meditation Candle Set', description: 'Meditation supplies fit well with the contemplative and open ended spiritual practices found in many UU communities. They support silence, reflection, and personal ritual without implying a single mandated form of worship [1][2].', priceRange: '$15-30', amazonUrl: buildAmazonSearchUrl('meditation candle set'), badges: [], firstSeen: '2026-03-23' },
      { id: 'uu-world-religions-set', name: 'Interfaith or Multifaith Book Collection', description: 'Many Unitarian Universalists study multiple traditions as part of their spiritual formation and ethical reflection. A world religions book set reflects that broad educational and interfaith posture [1][2].', priceRange: '$25-80', amazonUrl: buildAmazonSearchUrl('world religions book set'), badges: ['New'], firstSeen: '2026-03-23' },
    ],
  },
  'secular-humanism': {
    slug: 'secular-humanism',
    traditionName: 'Secular Humanism',
    intro: 'Secular Humanism is a non-religious ethical framework. These items reflect its values of reason, science, compassion, and human dignity rather than devotional practice [1][2].',
    items: [
      { id: 'secular-humanism-happy-human', name: 'Happy Human Symbol Pin or Pendant', description: 'The Happy Human symbol is widely used in humanist organizations as a sign of dignity, freedom, and ethical life centered on people. Pins and pendants make that identity visible in conferences, campus groups, and everyday wear [1][2].', priceRange: '$8-20', amazonUrl: buildAmazonSearchUrl('secular humanist pin'), badges: ['Staff Pick'], firstSeen: '2026-03-23', featured: true },
      { id: 'secular-humanism-books', name: 'Secular Humanism Books', description: 'Books on secular humanism explain the movement’s emphasis on reason, ethics, democratic values, and human flourishing without appeal to revelation. They are often the clearest entry point for understanding the worldview [1][2].', priceRange: '$12-28', amazonUrl: buildAmazonSearchUrl('secular humanism books'), badges: [], firstSeen: '2026-03-23' },
      { id: 'secular-humanism-science-art', name: 'Science and Reason Themed Wall Art', description: 'Science themed wall art connects humanist commitments to inquiry, evidence, and wonder about the natural world. It functions more as ethical and intellectual inspiration than as a sacred object [1][2].', priceRange: '$15-40', amazonUrl: buildAmazonSearchUrl('science wall art inspirational'), badges: [], firstSeen: '2026-03-23' },
      { id: 'secular-humanism-pale-blue-dot', name: 'Pale Blue Dot Poster', description: 'Carl Sagan’s Pale Blue Dot has become an emblem of humility, shared humanity, and scientific perspective in secular culture. A poster of that image or quotation is common in classrooms, offices, and homes shaped by humanist values [1][2].', priceRange: '$12-30', amazonUrl: buildAmazonSearchUrl('pale blue dot poster'), badges: ['New'], firstSeen: '2026-03-23' },
    ],
  },
  'jehovahs-witnesses': {
    slug: 'jehovahs-witnesses',
    traditionName: 'Jehovah\'s Witnesses',
    intro: 'Jehovah\'s Witnesses emphasize Bible study over material religious objects. The tradition does not use icons, crosses, or devotional items, so the catalog here focuses on study resources that support personal and group scripture reading [1][2].',
    items: [
      { id: 'jw-new-world-translation', name: 'New World Translation Bible', description: 'The New World Translation is the Bible edition most associated with Jehovah\'s Witnesses and is central to personal study, meetings, and ministry. A durable printed copy remains the clearest material item connected to the tradition’s religious life [1][2].', priceRange: '$12-28', amazonUrl: buildAmazonSearchUrl('new world translation bible'), badges: ['Staff Pick'], firstSeen: '2026-03-23', featured: true },
      { id: 'jw-study-aids', name: 'Bible Study Aids and Workbooks', description: 'Study aids help readers organize themes, key verses, and discussion questions for scripture centered learning. They fit a tradition that places far more emphasis on reading, teaching, and meeting preparation than on devotional objects [1][2].', priceRange: '$10-25', amazonUrl: buildAmazonSearchUrl('jehovah\'s witnesses study book'), badges: ['New'], firstSeen: '2026-03-23' },
    ],
  },
};

export function getFeaturedSacredItems(limit = 4): SacredItemEntry[] {
  return Object.values(SACRED_ITEMS)
    .flatMap((collection) => collection.items.filter((item) => item.featured))
    .slice(0, limit * 2);
}

