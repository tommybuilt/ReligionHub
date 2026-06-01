export interface TrendingTopic {
  id: string;
  title: string;
  summary: string;
  context: string;
  date: string;
  displayDate: string;
  category: 'Interfaith' | 'Politics' | 'Culture' | 'Demographics' | 'Scholarship' | 'Human Rights';
  relatedLinks: { label: string; href: string }[];
  source: string;
  sourceUrl?: string;
}

export const TRENDING_TOPICS: TrendingTopic[] = [
  {
    id: 'global-rise-of-nones',
    title: 'The Global Rise of the "Nones": What It Means for Religion',
    summary: 'The religiously unaffiliated are the fastest-growing demographic in many Western countries.',
    context: 'Pew Research Center projects that by 2050, the religiously unaffiliated will decline as a share of the global population (due to lower birth rates), even as they grow rapidly in Europe and North America. This trend has profound implications for religious institutions, politics, and cultural identity. The "nones" include atheists, agnostics, and people who identify as "nothing in particular", a diverse group with widely varying beliefs and values.',
    date: '2026-01-15',
    displayDate: 'January 15, 2026',
    category: 'Demographics',
    relatedLinks: [
      { label: 'Article: Do All Religions Believe in God?', href: '/articles/do-all-religions-believe-in-god' },
      { label: 'Article: Religion vs. Spirituality', href: '/articles/difference-religion-spirituality' },
      { label: 'Infographic: World Religions by Population', href: '/infographics/world-religions-by-population' },
    ],
    source: 'Pew Research Center, "The Future of World Religions," 2015 (updated projections).',
    sourceUrl: 'https://www.pewresearch.org/religion/2015/04/02/religious-projections-2010-2050/',
  },
  {
    id: 'interfaith-climate-action',
    title: 'Interfaith Leaders Unite on Climate Action',
    summary: 'Religious leaders from multiple traditions are increasingly framing environmental protection as a moral and spiritual obligation.',
    context: 'Pope Francis\'s encyclical Laudato Si\' (2015) was a landmark document framing climate change as a moral issue. Since then, Islamic, Hindu, Buddhist, Jewish, and Indigenous leaders have issued parallel declarations. The interfaith climate movement argues that stewardship of the earth is a shared religious value, from the Christian concept of creation care to the Buddhist emphasis on interdependence to Indigenous teachings on sacred land. Critics note tensions between environmental advocacy and economic development priorities in some religious communities.',
    date: '2026-02-20',
    displayDate: 'February 20, 2026',
    category: 'Interfaith',
    relatedLinks: [
      { label: 'Religion: Christianity', href: '/religions/christianity' },
      { label: 'Religion: Islam', href: '/religions/islam' },
      { label: 'Religion: Buddhism', href: '/religions/buddhism' },
      { label: 'Article: Meditation Across Religions', href: '/articles/meditation-across-religions' },
    ],
    source: 'Vatican, Laudato Si\' (2015); Parliament of the World\'s Religions climate statements.',
  },
  {
    id: 'ai-and-religion',
    title: 'Can AI Be Spiritual? The Growing Debate Over Artificial Intelligence and Religion',
    summary: 'As AI systems become more sophisticated, theologians and ethicists are grappling with questions about consciousness, soul, and moral agency.',
    context: 'Some Buddhist thinkers have suggested that if consciousness arises from causes and conditions, an artificial system could theoretically be conscious. Christian and Islamic scholars generally argue that only God can create a soul. Hindu perspectives vary, with some seeing consciousness as a fundamental property of the universe rather than something exclusive to biological beings. The debate has practical implications for how societies treat AI systems and how religious communities respond to technological change.',
    date: '2026-03-10',
    displayDate: 'March 10, 2026',
    category: 'Scholarship',
    relatedLinks: [
      { label: 'Article: Is Buddhism a Religion or a Philosophy?', href: '/articles/is-buddhism-religion-or-philosophy' },
      { label: 'Article: Buddhism and Science', href: '/articles/buddhism-and-science' },
      { label: 'Article: Do All Religions Believe in God?', href: '/articles/do-all-religions-believe-in-god' },
    ],
    source: 'Multiple academic sources; ongoing scholarly debate in theology and AI ethics.',
  },
  {
    id: 'ramadan-global-observance',
    title: 'Ramadan 2026: 1.9 Billion Muslims Observe the Holy Month',
    summary: 'The annual month of fasting, prayer, and community brings Muslims worldwide together in shared spiritual practice.',
    context: 'Ramadan is the ninth month of the Islamic lunar calendar, during which Muslims fast from dawn to sunset. Beyond abstaining from food and drink, Ramadan emphasizes increased prayer, Quran recitation, charity, and self-reflection. The month ends with the celebration of Eid al-Fitr. In 2026, Ramadan is expected to begin around February 18, though the exact date depends on moon sighting. Ramadan\'s observance varies across cultures, from elaborate iftar gatherings in the Middle East to quiet family meals in Western diaspora communities.',
    date: '2026-02-18',
    displayDate: 'February 18, 2026',
    category: 'Culture',
    relatedLinks: [
      { label: 'Article: Why Do Muslims Fast During Ramadan?', href: '/articles/why-muslims-fast-ramadan' },
      { label: 'Religion: Islam', href: '/religions/islam' },
      { label: 'Article: Dietary Laws Across Religions', href: '/articles/dietary-laws-world-religions' },
      { label: 'Holidays Calendar', href: '/holidays' },
    ],
    source: 'Pew Research Center; Encyclopaedia Britannica, "Ramadan."',
    sourceUrl: 'https://www.britannica.com/topic/Ramadan',
  },
  {
    id: 'religious-freedom-global-report',
    title: 'Religious Freedom Under Pressure: 2026 Global Report',
    summary: 'Reports from multiple watchdog organizations indicate that restrictions on religious freedom are increasing worldwide.',
    context: 'The Pew Research Center\'s annual report on government restrictions and social hostilities involving religion consistently finds that both types of restriction are increasing globally. Regions of particular concern include parts of the Middle East, South Asia, and China. Issues range from blasphemy laws and anti-conversion legislation to social harassment and mob violence. At the same time, many countries are strengthening legal protections for religious minorities and expanding interfaith dialogue programs.',
    date: '2026-04-05',
    displayDate: 'April 5, 2026',
    category: 'Human Rights',
    relatedLinks: [
      { label: 'Article: How Did Christianity Spread?', href: '/articles/how-christianity-spread' },
      { label: 'Article: How Islam Began', href: '/articles/how-islam-began' },
      { label: 'Compare Religions', href: '/compare' },
    ],
    source: 'Pew Research Center, "Global Restrictions on Religion" series.',
    sourceUrl: 'https://www.pewresearch.org/religion/topic/restrictions-on-religion/',
  },
  {
    id: 'christian-denomination-shifts',
    title: 'The Changing Map of Christianity: Growth in the Global South',
    summary: 'Christianity\'s center of gravity continues to shift from Europe and North America to Africa, Asia, and Latin America.',
    context: 'In 1900, approximately 80% of the world\'s Christians lived in Europe and North America. By 2025, that figure has dropped below 40%, with the majority now living in Africa, Latin America, and Asia. This demographic shift is reshaping global Christianity, Pentecostal and charismatic movements are growing rapidly in sub-Saharan Africa and Latin America, while traditional churches in Western Europe face declining attendance. The shift has implications for theology, worship styles, social ethics, and the global balance of power within Christian institutions.',
    date: '2026-05-12',
    displayDate: 'May 12, 2026',
    category: 'Demographics',
    relatedLinks: [
      { label: 'Article: Why So Many Christian Denominations?', href: '/articles/why-so-many-christian-denominations' },
      { label: 'Infographic: Branches of Christianity', href: '/infographics/branches-of-christianity' },
      { label: 'Article: Catholic vs. Protestant', href: '/articles/difference-catholic-protestant' },
      { label: 'Religion: Christianity', href: '/religions/christianity' },
    ],
    source: 'Pew Research Center, "Global Christianity" (2011, updated); World Christian Encyclopedia.',
    sourceUrl: 'https://www.pewresearch.org/religion/2011/12/19/global-christianity-exec/',
  },
  {
    id: 'hindu-temple-movement-us',
    title: 'Hindu Temples in America: A Growing Landscape',
    summary: 'The number of Hindu temples in the United States has grown dramatically, reflecting the expanding South Asian diaspora.',
    context: 'There are now over 1,000 Hindu temples across the United States, up from just a handful in the 1970s. These temples serve as religious, cultural, and community centers for the growing Hindu American population (estimated at 2.5–3 million). The architecture ranges from traditional South Indian gopurams to adapted warehouse spaces. The growth reflects broader trends in American religious diversity and the increasing visibility of Hinduism in public life.',
    date: '2026-06-20',
    displayDate: 'June 20, 2026',
    category: 'Culture',
    relatedLinks: [
      { label: 'Religion: Hinduism', href: '/religions/hinduism' },
      { label: 'Article: Karma Explained', href: '/articles/karma-explained' },
      { label: 'Article: Hindu Funeral Rites', href: '/articles/hindu-funeral-rites' },
    ],
    source: 'Hindu American Foundation; Pew Research Center demographic data.',
  },
  {
    id: 'antisemitism-europe-report',
    title: 'Antisemitism in Europe: Monitoring Reports Show Persistent Concern',
    summary: 'Multiple monitoring organizations report that antisemitic incidents in Europe remain at elevated levels.',
    context: 'The European Union Agency for Fundamental Rights, the Anti-Defamation League, and national monitoring bodies have documented persistent and in some cases rising levels of antisemitic incidents across Europe, including verbal harassment, vandalism, and physical attacks. The trend has prompted increased security at Jewish institutions and renewed political attention to hate crime legislation. Jewish communities have responded with a combination of increased security measures, education initiatives, and interfaith outreach.',
    date: '2026-07-08',
    displayDate: 'July 8, 2026',
    category: 'Human Rights',
    relatedLinks: [
      { label: 'Religion: Judaism', href: '/religions/judaism' },
      { label: 'Article: Can You Convert to Judaism?', href: '/articles/can-you-convert-to-judaism' },
      { label: 'Article: What Is Kosher?', href: '/articles/what-is-kosher-jewish-dietary-laws' },
    ],
    source: 'ADL Global Antisemitism Report; EU Agency for Fundamental Rights.',
  },
  {
    id: 'mindfulness-mainstream',
    title: 'Mindfulness Goes Mainstream: Secular Meditation\'s Buddhist Roots',
    summary: 'Mindfulness meditation, now a billion-dollar industry, has complex roots in Buddhist contemplative traditions.',
    context: 'The global mindfulness industry is valued at over $5 billion, with apps like Headspace and Calm reaching tens of millions of users. While secular mindfulness has been shown to reduce stress and improve well-being in clinical studies, Buddhist scholars and practitioners have raised questions about whether extracting meditation from its ethical and philosophical context risks diluting its transformative potential. The debate touches on issues of cultural appropriation, commercialization, and the nature of spiritual practice itself.',
    date: '2026-08-15',
    displayDate: 'August 15, 2026',
    category: 'Culture',
    relatedLinks: [
      { label: 'Article: Meditation Across Religions', href: '/articles/meditation-across-religions' },
      { label: 'Article: What Is Nirvana?', href: '/articles/what-is-nirvana-buddhism' },
      { label: 'Article: Buddhism and Science', href: '/articles/buddhism-and-science' },
      { label: 'Religion: Buddhism', href: '/religions/buddhism' },
    ],
    source: 'Global Wellness Institute; academic literature on secular mindfulness.',
  },
  {
    id: 'sikh-representation-politics',
    title: 'Sikh Representation in Western Politics Grows',
    summary: 'Sikhs are increasingly visible in political leadership across the Western world.',
    context: 'From Canada\'s Jagmeet Singh to multiple Sikh members of the UK Parliament and US officials, Sikh representation in Western democratic institutions has grown significantly. This visibility has helped raise awareness of Sikhism, the world\'s fifth-largest religion, while also exposing Sikh communities to both positive attention and hate crimes driven by misidentification and ignorance. Sikh advocacy organizations have responded with public education campaigns emphasizing the faith\'s core values of equality, service, and justice.',
    date: '2026-09-22',
    displayDate: 'September 22, 2026',
    category: 'Politics',
    relatedLinks: [
      { label: 'Religion: Sikhism', href: '/religions/sikhism' },
      { label: 'Article: Sikh Beliefs on Equality', href: '/articles/sikh-beliefs-equality' },
      { label: 'Quiz: What Religion Am I?', href: '/quiz/what-religion-am-i' },
    ],
    source: 'Sikh Coalition; Pew Research Center demographic data on Sikhs.',
  },
];

export const TRENDING_CATEGORIES = ['Interfaith', 'Politics', 'Culture', 'Demographics', 'Scholarship', 'Human Rights'] as const;
