import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { generateBreadcrumbJsonLd, generateMetadata as genMeta } from '@/lib/seo';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, MapPin, BookOpen, Calendar } from 'lucide-react';
import { collapseInlineCitations, stripInlineCitations } from '@/lib/utils';

/* SOURCE LOG: /sacred-places/[slug] */
/* Last updated: 2026-02-15 (attribution pass) */
/* References consulted for fact verification (no text copied):
   - UNESCO World Heritage Centre site listings
   - Encyclopaedia Britannica sacred-site and religion entries
   - Oxford Reference comparative religion and pilgrimage entries
   - Pew Research Center religion demographic context
   - CIA World Factbook country-level data
*/
/* ALL VISIBLE TEXT IS ORIGINAL. */

interface SacredPlacePageProps {
  params: Promise<{ slug: string }>;
}

interface PlaceContent {
  name: string;
  traditions: string;
  region: string;
  overview: string;
  history: string;
  significance: string;
  visiting: string;
  sources: { label: string; url?: string }[];
}

const PLACE_CONTENT: Record<string, PlaceContent> = {
  jerusalem: {
    name: 'Jerusalem',
    traditions: 'Judaism, Christianity, Islam',
    region: 'Middle East',
    overview: 'Jerusalem is one of the oldest cities in the world and holds profound religious significance for Judaism, Christianity, and Islam [1][2]. The Old City contains sites sacred to all three Abrahamic faiths within a compact area of less than one square kilometer [1].',
    history: 'Archaeological evidence suggests settlement dating back to the 4th millennium BCE [1]. The city became central to Jewish identity with the construction of Solomon\'s Temple, traditionally dated to the 10th century BCE [1][2]. It later became significant in Christianity as the site of Jesus\'s crucifixion and resurrection, and in Islam as the location of Muhammad\'s Night Journey [1][2].',
    significance: 'For Judaism, the Western Wall is the closest accessible point to the site of the ancient Temple [1]. For Christianity, the Church of the Holy Sepulchre marks the traditional site of the crucifixion and tomb of Jesus [1][2]. For Islam, the Al-Aqsa Mosque and the Dome of the Rock on the Temple Mount / Haram al-Sharif are among the holiest sites [1][2].',
    visiting: 'Jerusalem\'s Old City is a UNESCO World Heritage Site [3]. Millions of pilgrims and visitors from all three faiths visit annually [1][4].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Jerusalem."', url: 'https://www.britannica.com/place/Jerusalem' },
      { label: 'Oxford Reference, entries on Jerusalem and Abrahamic holy sites.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Old City of Jerusalem and its Walls."', url: 'https://whc.unesco.org/en/list/148' },
      { label: 'Pew Research Center, religion demographic context for the region.', url: 'https://www.pewresearch.org/religion/' },
    ],
  },
  mecca: {
    name: 'Mecca',
    traditions: 'Islam',
    region: 'Middle East (Saudi Arabia)',
    overview: 'Mecca (Makkah) is the holiest city in Islam and the birthplace of the Prophet Muhammad [1][2]. It is the destination of the Hajj pilgrimage, one of the Five Pillars of Islam, which draws millions of Muslims annually [1][2].',
    history: 'Islamic tradition holds that the Kaaba was originally built by the prophet Ibrahim (Abraham) and his son Ismail [1][2]. The city was a major trading center in pre-Islamic Arabia and became the spiritual center of Islam following Muhammad\'s conquest of Mecca in 630 CE [1][2].',
    significance: 'The Masjid al-Haram (Grand Mosque) surrounds the Kaaba, the cube-shaped structure toward which Muslims worldwide orient their daily prayers [1][2]. The Hajj pilgrimage to Mecca is obligatory for all Muslims who are physically and financially able to undertake it [1][2].',
    visiting: 'Entry to Mecca is restricted to Muslims. The Saudi government manages Hajj logistics for approximately 2-3 million pilgrims each year [1][4].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Mecca."', url: 'https://www.britannica.com/place/Mecca' },
      { label: 'Oxford Islamic Studies, entries on Hajj and the Kaaba.', url: 'https://www.oxfordreference.com/' },
      { label: 'Pew Research Center, Muslim population and pilgrimage data.', url: 'https://www.pewresearch.org/religion/' },
      { label: 'CIA World Factbook, Saudi Arabia demographics.', url: 'https://www.cia.gov/the-world-factbook/countries/saudi-arabia/' },
    ],
  },
  varanasi: {
    name: 'Varanasi',
    traditions: 'Hinduism, Buddhism, Jainism',
    region: 'South Asia (India)',
    overview: 'Varanasi (also known as Benares or Kashi) is one of the oldest continuously inhabited cities in the world and among the holiest cities in Hinduism [1][2]. It is also significant in Buddhism and Jainism [1].',
    history: 'References to Varanasi appear in ancient texts dating back to the 8th century BCE or earlier [1][2]. The nearby deer park at Sarnath is where the Buddha is traditionally said to have delivered his first sermon [1][2]. The city has been a center of learning, philosophy, and devotion for millennia [1].',
    significance: 'Hindus believe that dying in Varanasi and being cremated on the banks of the Ganges can lead to moksha (liberation from the cycle of rebirth) [1][2]. The city\'s ghats (stepped riverbanks) host daily rituals, cremation ceremonies, and the famous Ganga Aarti [1][2].',
    visiting: 'Varanasi receives millions of pilgrims and tourists annually. The ghats along the Ganges are the primary sites of religious activity [1][2].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Varanasi."', url: 'https://www.britannica.com/place/Varanasi' },
      { label: 'Oxford Reference, entries on Hindu pilgrimage and sacred rivers.', url: 'https://www.oxfordreference.com/' },
      { label: 'Pew Research Center, Hindu population data.', url: 'https://www.pewresearch.org/religion/' },
    ],
  },
  'bodh-gaya': {
    name: 'Bodh Gaya',
    traditions: 'Buddhism',
    region: 'South Asia (India)',
    overview: 'Bodh Gaya is the most important pilgrimage site in Buddhism, marking the location where Siddhartha Gautama attained enlightenment and became the Buddha [1][2].',
    history: 'The Mahabodhi Temple complex dates to the 3rd century BCE, when Emperor Ashoka is believed to have visited and built a shrine at the site [1][3]. The current temple structure dates primarily to the 5th-6th century CE [1][3].',
    significance: 'The Bodhi Tree at the Mahabodhi Temple is a descendant of the original tree under which the Buddha sat in meditation [1][2]. The site attracts Buddhist pilgrims from across the world and is one of the four main pilgrimage sites in Buddhism [1][2].',
    visiting: 'The Mahabodhi Temple Complex was inscribed as a UNESCO World Heritage Site in 2002 [3]. Pilgrims from Theravada, Mahayana, and Vajrayana traditions visit throughout the year [1].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Bodh Gaya."', url: 'https://www.britannica.com/place/Bodh-Gaya' },
      { label: 'Oxford Reference, entries on Buddhist pilgrimage.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Mahabodhi Temple Complex at Bodh Gaya."', url: 'https://whc.unesco.org/en/list/1056' },
    ],
  },
  amritsar: {
    name: 'Amritsar',
    traditions: 'Sikhism',
    region: 'South Asia (India)',
    overview: 'Amritsar is the spiritual and cultural center of Sikhism, home to the Harmandir Sahib (Golden Temple), the holiest gurdwara in the Sikh tradition [1][2].',
    history: 'The city was founded in 1577 by Guru Ram Das, the fourth Sikh Guru [1][2]. The Harmandir Sahib was completed in 1604 under Guru Arjan, who also installed the Adi Granth (the first compilation of Sikh scripture) within it [1][2].',
    significance: 'The Golden Temple is open to people of all faiths and backgrounds, reflecting the Sikh principle of equality [1][2]. Its community kitchen (langar) serves free meals to tens of thousands of visitors daily regardless of religion, caste, or status [1][2].',
    visiting: 'The Golden Temple complex is free to enter and operates 24 hours a day. It is one of the most visited religious sites in the world [1][2].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Amritsar" and "Golden Temple."', url: 'https://www.britannica.com/place/Amritsar' },
      { label: 'Oxford Reference, entries on Sikh gurdwaras and pilgrimage.', url: 'https://www.oxfordreference.com/' },
      { label: 'Pew Research Center, Sikh population context.', url: 'https://www.pewresearch.org/religion/' },
    ],
  },
  ise: {
    name: 'Ise Grand Shrine',
    traditions: 'Shinto',
    region: 'East Asia (Japan)',
    overview: 'The Ise Grand Shrine (Ise Jingū) is widely considered the most sacred shrine in Shinto, dedicated to the sun goddess Amaterasu [1][2].',
    history: 'Traditional accounts date the shrine\'s origins to the 3rd century BCE, though historical records confirm its existence by at least the 7th century CE [1][2]. The shrine is rebuilt every 20 years in a ceremony called Shikinen Sengu, a practice documented for over 1,300 years [1][2].',
    significance: 'The Inner Shrine (Naikū) houses the Sacred Mirror, one of the three Imperial Regalia of Japan [1][2]. The 20-year rebuilding cycle symbolizes themes of renewal, impermanence, and the continuity of tradition [1][2].',
    visiting: 'The shrine complex is set within a large forested area. Visitors can access the outer grounds but the innermost sanctuaries are restricted [1][2].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Ise Shrine."', url: 'https://www.britannica.com/topic/Ise-Shrine' },
      { label: 'Oxford Reference, entries on Shinto shrines and practices.', url: 'https://www.oxfordreference.com/' },
    ],
  },
  rome: {
    name: 'Rome & Vatican City',
    traditions: 'Christianity (Catholic)',
    region: 'Europe (Italy)',
    overview: 'Rome and Vatican City together form the spiritual center of Roman Catholicism, the largest Christian denomination with over 1.3 billion members worldwide [1][2][4].',
    history: 'Christian tradition holds that the apostles Peter and Paul were martyred in Rome in the 1st century CE [1][2]. The Vatican became the seat of the papacy, and St. Peter\'s Basilica was built over what is traditionally identified as Peter\'s burial site [1][2].',
    significance: 'Vatican City is an independent city-state and the headquarters of the Roman Catholic Church [1][2]. St. Peter\'s Basilica, the Sistine Chapel, and the Vatican Museums are among the most visited religious and cultural sites in the world [1][2].',
    visiting: 'Vatican City is a UNESCO World Heritage Site [3]. St. Peter\'s Square hosts papal audiences and major liturgical celebrations attended by hundreds of thousands [1].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Vatican City" and "St. Peter\'s Basilica."', url: 'https://www.britannica.com/place/Vatican-City' },
      { label: 'Oxford Reference, entries on the papacy and Catholic sacred sites.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Vatican City."', url: 'https://whc.unesco.org/en/list/286' },
      { label: 'Pew Research Center, global Catholic population data.', url: 'https://www.pewresearch.org/religion/' },
    ],
  },
  medina: {
    name: 'Medina',
    traditions: 'Islam',
    region: 'Middle East (Saudi Arabia)',
    overview: 'Medina (al-Madinah) is the second holiest city in Islam, where the Prophet Muhammad established the first Muslim community after the Hijra (migration) from Mecca in 622 CE [1][2].',
    history: 'The Hijra to Medina marks the beginning of the Islamic calendar [1][2]. Muhammad lived in Medina until his death in 632 CE, and the city served as the capital of the early Islamic state under the first caliphs [1][2].',
    significance: 'The Prophet\'s Mosque (Al-Masjid an-Nabawi) contains the tomb of Muhammad and is one of the largest mosques in the world [1][2]. Many Hajj pilgrims also visit Medina before or after their pilgrimage to Mecca [1].',
    visiting: 'Unlike Mecca, Medina is accessible to non-Muslims in most areas, though the Prophet\'s Mosque interior is reserved for Muslim worshippers [1][2].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Medina."', url: 'https://www.britannica.com/place/Medina-Saudi-Arabia' },
      { label: 'Oxford Islamic Studies, entries on the Hijra and early Islamic history.', url: 'https://www.oxfordreference.com/' },
      { label: 'Pew Research Center, Muslim population context.', url: 'https://www.pewresearch.org/religion/' },
    ],
  },
  lhasa: {
    name: 'Lhasa',
    traditions: 'Buddhism (Tibetan)',
    region: 'East Asia (Tibet/China)',
    overview: 'Lhasa is the traditional capital of Tibet and the historical seat of the Dalai Lama, serving as the spiritual heart of Tibetan Buddhism [1][2].',
    history: 'Lhasa became the center of Tibetan Buddhism in the 7th century CE under King Songtsen Gampo [1][2]. The Potala Palace was expanded into its current form in the 17th century by the Fifth Dalai Lama [1][3].',
    significance: 'The Potala Palace, Jokhang Temple, and Norbulingka are UNESCO World Heritage Sites [3]. The Jokhang Temple is considered the most sacred temple in Tibetan Buddhism [1][2]. Pilgrims perform kora (circumambulation) around the Jokhang along the Barkhor circuit [1].',
    visiting: 'The Potala Palace and Jokhang Temple are open to visitors. Lhasa remains a major pilgrimage destination for Tibetan Buddhists [1][3].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Lhasa" and "Potala Palace."', url: 'https://www.britannica.com/place/Lhasa' },
      { label: 'Oxford Reference, entries on Tibetan Buddhism and pilgrimage.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Historic Ensemble of the Potala Palace, Lhasa."', url: 'https://whc.unesco.org/en/list/707' },
    ],
  },
  'mount-athos': {
    name: 'Mount Athos',
    traditions: 'Christianity (Orthodox)',
    region: 'Europe (Greece)',
    overview: 'Mount Athos is a self-governing monastic community on a peninsula in northeastern Greece, home to 20 Eastern Orthodox monasteries with over 1,000 years of continuous monastic life [1][3].',
    history: 'The first monastery on Mount Athos, Great Lavra, was founded in 963 CE [1][2]. The peninsula has been exclusively dedicated to monastic life since a Byzantine imperial decree, and women have been prohibited from entering since the 11th century [1][2].',
    significance: 'Mount Athos is considered the spiritual center of Eastern Orthodox monasticism [1][2]. The monasteries preserve significant collections of manuscripts, icons, and liturgical art [1][3].',
    visiting: 'Access is restricted to male visitors with a special permit (diamonitirion). Mount Athos is a UNESCO World Heritage Site [3].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Mount Athos."', url: 'https://www.britannica.com/place/Mount-Athos' },
      { label: 'Oxford Reference, entries on Orthodox monasticism.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Mount Athos."', url: 'https://whc.unesco.org/en/list/454' },
    ],
  },
  haifa: {
    name: 'Haifa',
    traditions: "Baha'i Faith",
    region: 'Middle East (Israel)',
    overview: "Haifa is the location of the Baha'i World Centre, the spiritual and administrative heart of the Baha'i Faith [1][2].",
    history: "The Bab, a central figure in Baha'i history, was executed in Persia in 1850, and his remains were eventually interred on Mount Carmel in Haifa in 1909 [1][2]. The Shrine of the Bab and surrounding terraced gardens were completed in their current form in 2001 [1][3].",
    significance: "The Shrine of the Bab and the terraced gardens on Mount Carmel are a UNESCO World Heritage Site [3]. The Universal House of Justice, the governing body of the Baha'i Faith, is also located in Haifa [1][2].",
    visiting: 'The gardens and shrine are open to visitors of all backgrounds. The terraced gardens are one of the most visited tourist attractions in Israel [1][3].',
    sources: [
      { label: "Encyclopaedia Britannica, \"Baha'i Faith\" and \"Haifa.\"", url: 'https://www.britannica.com/topic/Bahai-Faith' },
      { label: "Oxford Reference, entries on Baha'i sacred sites.", url: 'https://www.oxfordreference.com/' },
      { label: "UNESCO World Heritage Centre, \"Baha'i Holy Places in Haifa and the Western Galilee.\"", url: 'https://whc.unesco.org/en/list/1220' },
    ],
  },
  'mount-koya': {
    name: 'Mount Kōya',
    traditions: 'Buddhism (Shingon)',
    region: 'East Asia (Japan)',
    overview: 'Mount Kōya (Kōyasan) is the center of Shingon Buddhism in Japan, founded by the monk Kūkai (Kōbō Daishi) in 816 CE [1][2].',
    history: 'Kūkai established a monastic community on the mountain after receiving imperial permission in 816 CE [1][2]. The site grew to include over 100 temples and became one of the most important religious centers in Japan [1][2].',
    significance: 'The Okunoin cemetery, containing over 200,000 memorial stones, leads to the mausoleum of Kūkai, where devotees believe he rests in eternal meditation [1][2]. The Danjō Garan complex is the central temple area [1].',
    visiting: 'Mount Kōya is part of the UNESCO-listed "Sacred Sites and Pilgrimage Routes in the Kii Mountain Range" [3]. Many temples offer overnight stays (shukubō) for visitors [1].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Kōyasan."', url: 'https://www.britannica.com/place/Koyasan' },
      { label: 'Oxford Reference, entries on Shingon Buddhism.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Sacred Sites and Pilgrimage Routes in the Kii Mountain Range."', url: 'https://whc.unesco.org/en/list/1142' },
    ],
  },
  'angkor-wat': {
    name: 'Angkor Wat',
    traditions: 'Hinduism, Buddhism',
    region: 'Southeast Asia (Cambodia)',
    overview: 'Angkor Wat is the largest religious monument in the world, originally constructed as a Hindu temple dedicated to Vishnu and later converted to Buddhist use [1][3].',
    history: 'Built by King Suryavarman II in the early 12th century CE, Angkor Wat served as the state temple and capital of the Khmer Empire [1][2]. By the late 13th century, the site had transitioned to Theravada Buddhist use [1][2].',
    significance: 'The temple\'s architecture represents Mount Meru, the cosmic mountain in Hindu and Buddhist cosmology [1][2]. Its bas-reliefs depict scenes from Hindu epics including the Ramayana and Mahabharata [1][2].',
    visiting: 'Angkor Wat is a UNESCO World Heritage Site and Cambodia\'s most visited tourist destination, receiving over 2 million visitors annually before 2020 [3][4].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Angkor Wat."', url: 'https://www.britannica.com/place/Angkor-Wat' },
      { label: 'Oxford Reference, entries on Khmer architecture and Hindu-Buddhist art.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Angkor."', url: 'https://whc.unesco.org/en/list/668' },
      { label: 'CIA World Factbook, Cambodia demographics.', url: 'https://www.cia.gov/the-world-factbook/countries/cambodia/' },
    ],
  },
  'mount-sinai': {
    name: 'Mount Sinai',
    traditions: 'Judaism, Christianity, Islam',
    region: 'Middle East (Egypt)',
    overview: 'Mount Sinai (Jebel Musa) is traditionally identified as the mountain where Moses received the Ten Commandments from God, a foundational event in Judaism, Christianity, and Islam [1][2].',
    history: 'The identification of Jebel Musa with the biblical Mount Sinai dates to at least the 4th century CE [1][2]. St. Catherine\'s Monastery, one of the oldest continuously operating Christian monasteries, was built at the foot of the mountain in the 6th century CE by order of Emperor Justinian I [1][3].',
    significance: 'The site is sacred in all three Abrahamic traditions [1][2]. St. Catherine\'s Monastery houses one of the world\'s oldest collections of Christian manuscripts and icons [1][3].',
    visiting: 'St. Catherine\'s Monastery and the surrounding area are a UNESCO World Heritage Site [3]. Pilgrims and hikers climb the mountain, often beginning before dawn to reach the summit at sunrise [1].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Mount Sinai" and "St. Catherine\'s Monastery."', url: 'https://www.britannica.com/place/Mount-Sinai-mountain-Egypt' },
      { label: 'Oxford Reference, entries on biblical geography.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Saint Catherine Area."', url: 'https://whc.unesco.org/en/list/954' },
    ],
  },
  uluru: {
    name: 'Uluru',
    traditions: 'Indigenous Australian',
    region: 'Oceania (Australia)',
    overview: 'Uluru (also known as Ayers Rock) is a massive sandstone monolith in central Australia that holds deep spiritual significance for the Anangu people, the traditional custodians of the land [1][3].',
    history: 'The Anangu have inhabited the area around Uluru for tens of thousands of years [1][2]. The site features rock art, caves, and water sources that are integral to Anangu Tjukurpa (law, knowledge, and belief system) [1][2].',
    significance: 'Uluru is central to Anangu creation narratives and ongoing spiritual practice [1][2]. Certain areas of the rock are considered sacred and access is restricted out of respect for Anangu cultural protocols [1]. Climbing Uluru was officially closed to visitors in October 2019 at the request of the Anangu [1].',
    visiting: 'Uluru-Kata Tjuta National Park is a UNESCO World Heritage Site listed for both natural and cultural significance [3]. Visitors are encouraged to learn about Anangu culture through the park\'s cultural center [1].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Uluru/Ayers Rock."', url: 'https://www.britannica.com/place/Uluru-Ayers-Rock' },
      { label: 'Oxford Reference, entries on Indigenous Australian spirituality.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Uluru-Kata Tjuta National Park."', url: 'https://whc.unesco.org/en/list/447' },
    ],
  },
  'ganges-river': {
    name: 'Ganges River',
    traditions: 'Hinduism',
    region: 'South Asia (India)',
    overview: 'The Ganges (Ganga) is considered the holiest river in Hinduism and plays a central role in Hindu ritual life, pilgrimage, and cosmology [1][2].',
    history: 'Reverence for the Ganges is documented in the earliest Hindu scriptures, including the Rigveda [1][2]. The river has been a focal point of Hindu civilization for thousands of years, with major cities like Varanasi, Haridwar, and Allahabad (Prayagraj) situated along its banks [1][2].',
    significance: 'Hindus believe that bathing in the Ganges washes away sins and that immersing the ashes of the deceased in the river aids in achieving moksha [1][2]. The Kumbh Mela, held at the confluence of the Ganges and Yamuna rivers, is one of the largest religious gatherings in the world [1][2].',
    visiting: 'The ghats of Varanasi and Haridwar are the most visited pilgrimage points along the Ganges. The Kumbh Mela draws tens of millions of participants [1][4].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Ganges River."', url: 'https://www.britannica.com/place/Ganges-River' },
      { label: 'Oxford Reference, entries on Hindu pilgrimage and sacred rivers.', url: 'https://www.oxfordreference.com/' },
      { label: 'Pew Research Center, Hindu population context.', url: 'https://www.pewresearch.org/religion/' },
      { label: 'CIA World Factbook, India demographics.', url: 'https://www.cia.gov/the-world-factbook/countries/india/' },
    ],
  },
  wittenberg: {
    name: 'Wittenberg',
    traditions: 'Christianity (Protestant)',
    region: 'Europe (Germany)',
    overview: 'Wittenberg is the city where Martin Luther posted his 95 Theses in 1517, an event widely regarded as a catalyst of the Protestant Reformation [1][2].',
    history: 'Luther, an Augustinian monk and theology professor at the University of Wittenberg, challenged the Catholic Church\'s practice of selling indulgences [1][2]. The 95 Theses were reportedly posted on the door of the Castle Church (Schlosskirche) on October 31, 1517 [1][2].',
    significance: 'Wittenberg is considered the birthplace of the Protestant Reformation, which reshaped Christianity and European history [1][2]. Luther\'s translation of the Bible into German, completed in Wittenberg, was a landmark in both religious and literary history [1][2].',
    visiting: 'The Luther Memorials in Wittenberg are a UNESCO World Heritage Site [3]. The Castle Church and Luther House museum are the primary pilgrimage and tourist sites [1][3].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Wittenberg" and "Martin Luther."', url: 'https://www.britannica.com/place/Wittenberg-Germany' },
      { label: 'Oxford Reference, entries on the Protestant Reformation.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Luther Memorials in Eisleben and Wittenberg."', url: 'https://whc.unesco.org/en/list/783' },
    ],
  },
  'mount-tai': {
    name: 'Mount Tai',
    traditions: 'Taoism, Confucianism, Buddhism',
    region: 'East Asia (China)',
    overview: 'Mount Tai (Taishan) is the most revered of the Five Great Mountains of China and holds significance in Taoism, Confucianism, and Buddhism [1][2].',
    history: 'Imperial worship at Mount Tai dates back over 3,000 years [1][2]. Confucius is recorded as having climbed the mountain, and it became a site of imperial Feng and Shan sacrifices performed by Chinese emperors [1][2].',
    significance: 'In Taoist cosmology, Mount Tai is associated with the east, sunrise, birth, and renewal [1][2]. The mountain hosts numerous temples, inscriptions, and stone tablets from multiple dynasties and religious traditions [1][2].',
    visiting: 'Mount Tai is a UNESCO World Heritage Site listed for both cultural and natural significance [3]. Millions of visitors climb the mountain annually via the traditional stone stairway of over 6,000 steps [1].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Mount Tai."', url: 'https://www.britannica.com/place/Mount-Tai' },
      { label: 'Oxford Reference, entries on Chinese sacred mountains.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Mount Taishan."', url: 'https://whc.unesco.org/en/list/437' },
    ],
  },
  palitana: {
    name: 'Palitana',
    traditions: 'Jainism',
    region: 'South Asia (India)',
    overview: 'Palitana, located in Gujarat, India, is home to over 800 Jain temples on Shatrunjaya Hill, making it one of the holiest pilgrimage sites in Jainism [1][2].',
    history: 'Jain tradition holds that Rishabhadeva (Adinatha), the first Tirthankara, attained moksha on Shatrunjaya Hill [1][2]. Temples have been built and rebuilt on the site over many centuries, with the current structures dating primarily from the 11th century CE onward [1][2].',
    significance: 'The temple complex is considered so sacred that no one is permitted to stay on the hill overnight, including monks [1][2]. Palitana was declared the world\'s first vegetarian city in 2014, reflecting Jain principles of non-violence (ahimsa) [1][2].',
    visiting: 'Pilgrims climb approximately 3,500 steps to reach the temple complex. The site is a major destination for Jain pilgrims, especially during festivals [1][2].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Palitana" and "Jainism."', url: 'https://www.britannica.com/topic/Jainism' },
      { label: 'Oxford Reference, entries on Jain pilgrimage and sacred sites.', url: 'https://www.oxfordreference.com/' },
      { label: 'Pew Research Center, Jain population context.', url: 'https://www.pewresearch.org/religion/' },
    ],
  },
  lalibela: {
    name: 'Lalibela',
    traditions: 'Christianity (Ethiopian Orthodox)',
    region: 'Africa (Ethiopia)',
    overview: 'Lalibela is famous for its 11 medieval rock-hewn churches, carved directly from volcanic rock in the 12th-13th centuries CE, and remains an active site of Ethiopian Orthodox Christian worship [1][3].',
    history: 'The churches are traditionally attributed to King Lalibela, who ruled the Zagwe dynasty in the late 12th to early 13th century [1][2]. According to tradition, he sought to create a "New Jerusalem" after Muslim conquests made pilgrimage to the Holy Land difficult [1][2].',
    significance: 'The Church of St. George (Bete Giyorgis), carved in the shape of a cross, is the most iconic of the 11 churches [1][3]. The site remains a major pilgrimage destination, especially during Ethiopian Orthodox festivals like Timkat (Epiphany) and Meskel [1][2].',
    visiting: 'The rock-hewn churches of Lalibela are a UNESCO World Heritage Site [3]. The churches are still in active use for daily worship and major religious celebrations [1].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Lalibela."', url: 'https://www.britannica.com/place/Lalibela' },
      { label: 'Oxford Reference, entries on Ethiopian Christianity.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Rock-Hewn Churches, Lalibela."', url: 'https://whc.unesco.org/en/list/18' },
    ],
  },
  'hagia-sophia': {
    name: 'Hagia Sophia',
    traditions: 'Christianity (Orthodox), Islam',
    region: 'Europe/Asia (Turkey)',
    overview: 'Hagia Sophia in Istanbul is one of the most significant architectural and religious monuments in the world, serving successively as an Eastern Orthodox cathedral, a Roman Catholic cathedral, a mosque, a museum, and since 2020 once again a mosque [1][3].',
    history: 'The current structure was built by Emperor Justinian I between 532 and 537 CE, replacing two earlier churches on the same site [1][2]. It served as the principal cathedral of the Eastern Orthodox Church for nearly a thousand years until the Ottoman conquest of Constantinople in 1453, when Sultan Mehmed II converted it into a mosque [1][2]. In 1934, Mustafa Kemal Ataturk secularized it as a museum, and in 2020 it was reconverted to a mosque [1][2].',
    significance: 'Hagia Sophia\'s massive dome was an engineering marvel that influenced both Byzantine and Ottoman architecture for centuries [1][2]. It contains significant Byzantine mosaics (some now covered during prayer times) and Ottoman calligraphic panels [1][2]. The building symbolizes the complex religious history of Istanbul and the broader region [1][2].',
    visiting: 'Hagia Sophia is a UNESCO World Heritage Site as part of the Historic Areas of Istanbul [3]. It is open to visitors outside of prayer times, with modest dress required [1].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Hagia Sophia."', url: 'https://www.britannica.com/topic/Hagia-Sophia' },
      { label: 'Oxford Reference, entries on Byzantine and Ottoman architecture.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Historic Areas of Istanbul."', url: 'https://whc.unesco.org/en/list/356' },
    ],
  },
  'western-wall': {
    name: 'Western Wall',
    traditions: 'Judaism',
    region: 'Middle East (Israel/Palestine)',
    overview: 'The Western Wall (Kotel) in Jerusalem is the most sacred site accessible to Jewish worshippers, being the last remaining retaining wall of the Second Temple compound destroyed by the Romans in 70 CE [1][2].',
    history: 'The wall was part of the expansion of the Second Temple by Herod the Great in approximately 19 BCE [1][2]. After the Roman destruction of the Temple, the Western Wall became the focal point of Jewish mourning and prayer, earning the name "Wailing Wall" in English [1][2]. Following the 1967 Six-Day War, Israel gained control of the Old City and the Western Wall plaza was created [1][2].',
    significance: 'Jews pray at the wall facing the Temple Mount, the holiest site in Judaism where the First and Second Temples stood [1][2]. The tradition of placing written prayers in the cracks between the stones is practiced by millions of visitors annually [1][2]. The wall is a symbol of Jewish resilience and connection to the ancient homeland [1][2].',
    visiting: 'The Western Wall plaza is open 24 hours a day, 7 days a week, and is free to visit. Separate prayer sections exist for men and women [1][2].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Western Wall."', url: 'https://www.britannica.com/topic/Western-Wall' },
      { label: 'Oxford Reference, entries on Jewish sacred sites.', url: 'https://www.oxfordreference.com/' },
      { label: 'Pew Research Center, Jewish population data.', url: 'https://www.pewresearch.org/religion/' },
    ],
  },
  'al-aqsa': {
    name: 'Al-Aqsa Mosque',
    traditions: 'Islam',
    region: 'Middle East (Israel/Palestine)',
    overview: 'The Al-Aqsa Mosque compound (Haram al-Sharif / Temple Mount) in Jerusalem is the third holiest site in Islam, after Mecca and Medina, and is believed to be the destination of the Prophet Muhammad\'s Night Journey (Isra and Mi\'raj) [1][2].',
    history: 'Islamic tradition holds that Muhammad was transported from Mecca to Jerusalem and ascended to heaven from this site [1][2]. The Dome of the Rock, built in 691 CE by Caliph Abd al-Malik, is one of the oldest surviving Islamic structures [1][2]. The Al-Aqsa Mosque itself was first constructed in the early 8th century and has been rebuilt and expanded multiple times [1][2].',
    significance: 'The compound is sacred in Islam as the site of Muhammad\'s Night Journey and as the location of the "Farthest Mosque" (al-masjid al-aqsa) mentioned in the Quran (17:1) [1][2]. The Dome of the Rock enshrines the Foundation Stone, which is also sacred in Judaism as the site where Abraham prepared to sacrifice Isaac [1][2].',
    visiting: 'The compound is a highly sensitive site at the intersection of Israeli-Palestinian and Jewish-Muslim tensions [1][2]. Non-Muslim visitors may access the compound during limited hours but may not pray there [1].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Al-Aqsa Mosque" and "Dome of the Rock."', url: 'https://www.britannica.com/topic/al-Aqsa-Mosque' },
      { label: 'Oxford Reference, entries on Islamic sacred sites in Jerusalem.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Old City of Jerusalem."', url: 'https://whc.unesco.org/en/list/148' },
    ],
  },
  'santiago-de-compostela': {
    name: 'Santiago de Compostela',
    traditions: 'Christianity (Catholic)',
    region: 'Europe (Spain)',
    overview: 'Santiago de Compostela is the destination of the Camino de Santiago (Way of St. James), one of the most important Christian pilgrimage routes in the world, believed to house the remains of the apostle James [1][3].',
    history: 'According to tradition, the tomb of the apostle James was discovered in the early 9th century CE [1][2]. The cathedral was built over the site beginning in 1075, and the pilgrimage route became one of the three great Christian pilgrimages of the medieval period, alongside Rome and Jerusalem [1][2].',
    significance: 'The Camino de Santiago has experienced a dramatic revival since the late 20th century, with over 300,000 pilgrims completing the route annually in recent years [1][2]. The pilgrimage is undertaken for religious, spiritual, cultural, and personal reasons [1][2]. The cathedral\'s Botafumeiro (giant incense burner) and the Portico de la Gloria are among its most famous features [1][2].',
    visiting: 'The Cathedral of Santiago de Compostela and the Old Town are a UNESCO World Heritage Site [3]. The Camino routes themselves are also UNESCO-listed [3].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Santiago de Compostela."', url: 'https://www.britannica.com/place/Santiago-de-Compostela' },
      { label: 'Oxford Reference, entries on Christian pilgrimage.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Santiago de Compostela (Old Town)."', url: 'https://whc.unesco.org/en/list/347' },
    ],
  },
  stonehenge: {
    name: 'Stonehenge',
    traditions: 'Prehistoric/Pagan',
    region: 'Europe (England)',
    overview: 'Stonehenge is a prehistoric stone circle in Wiltshire, England, dating to approximately 3000-2000 BCE, and is one of the most famous and enigmatic sacred sites in the world [1][3].',
    history: 'The monument was constructed in several phases over approximately 1,500 years [1][2]. The earliest phase (c. 3000 BCE) consisted of a circular ditch and bank. The iconic sarsen stones and bluestones were erected between approximately 2500 and 2000 BCE [1][2]. The bluestones were transported from Wales, over 150 miles away, a remarkable feat of Neolithic engineering [1][2].',
    significance: 'The precise purpose of Stonehenge remains debated, but it is widely believed to have served as a ceremonial or religious site, possibly related to astronomical observation, ancestor worship, or healing [1][2]. The monument is aligned with the sunrise on the summer solstice and the sunset on the winter solstice [1][2]. Modern Druids and pagans celebrate the solstices at Stonehenge [1][2].',
    visiting: 'Stonehenge is a UNESCO World Heritage Site [3]. English Heritage manages the site, which receives over 1.5 million visitors annually [1].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Stonehenge."', url: 'https://www.britannica.com/topic/Stonehenge' },
      { label: 'Oxford Reference, entries on prehistoric religion and megalithic monuments.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Stonehenge, Avebury and Associated Sites."', url: 'https://whc.unesco.org/en/list/373' },
    ],
  },
  'machu-picchu': {
    name: 'Machu Picchu',
    traditions: 'Inca/Indigenous Andean',
    region: 'South America (Peru)',
    overview: 'Machu Picchu is a 15th-century Inca citadel set high in the Andes Mountains of Peru, believed to have served as a royal estate and sacred religious site for Inca rulers [1][3].',
    history: 'Built during the reign of Inca emperor Pachacuti (c. 1438-1472 CE), Machu Picchu was abandoned approximately a century later during the Spanish conquest [1][2]. The site was largely unknown to the outside world until American historian Hiram Bingham brought it to international attention in 1911 [1][2].',
    significance: 'The site includes temples, terraces, and water channels that reflect Inca cosmology and their reverence for natural features including mountains (apus), the sun (Inti), and water [1][2]. The Intihuatana stone is believed to have served as an astronomical observatory and ritual stone [1][2]. The Temple of the Sun and the Room of the Three Windows are among the most important ceremonial structures [1][2].',
    visiting: 'Machu Picchu is a UNESCO World Heritage Site and one of the New Seven Wonders of the World [3]. Visitor numbers are limited to protect the site [1].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Machu Picchu."', url: 'https://www.britannica.com/place/Machu-Picchu' },
      { label: 'Oxford Reference, entries on Inca religion and architecture.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Historic Sanctuary of Machu Picchu."', url: 'https://whc.unesco.org/en/list/274' },
    ],
  },
  'borobudur': {
    name: 'Borobudur',
    traditions: 'Buddhism (Mahayana)',
    region: 'Southeast Asia (Indonesia)',
    overview: 'Borobudur is the world\'s largest Buddhist temple, a 9th-century Mahayana monument in Central Java, Indonesia, featuring over 500 Buddha statues and 2,672 relief panels [1][3].',
    history: 'Built during the Sailendra dynasty (c. 780-840 CE), Borobudur was abandoned following the decline of Buddhist kingdoms in Java and the shift to Islam [1][2]. The monument was rediscovered in 1814 under volcanic ash and jungle growth, and was restored with UNESCO assistance in the 1970s-1980s [1][3].',
    significance: 'The temple\'s design represents Buddhist cosmology, the journey from the world of desire through the world of forms to the world of formlessness (nirvana) [1][2]. Pilgrims walk clockwise through the corridors, ascending through ten levels while contemplating the relief panels that depict the life of the Buddha and Buddhist teachings [1][2].',
    visiting: 'Borobudur is a UNESCO World Heritage Site [3]. It remains an active pilgrimage site, particularly during Vesak (the celebration of the Buddha\'s birth, enlightenment, and death) [1].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Borobudur."', url: 'https://www.britannica.com/place/Borobudur' },
      { label: 'Oxford Reference, entries on Buddhist art and architecture.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Borobudur Temple Compounds."', url: 'https://whc.unesco.org/en/list/592' },
    ],
  },
  qufu: {
    name: 'Qufu (Temple of Confucius)',
    traditions: 'Confucianism',
    region: 'East Asia (China)',
    overview: 'Qufu in Shandong Province, China, is the birthplace of Confucius and home to the Temple of Confucius (Kong Miao), the Cemetery of Confucius (Kong Lin), and the Kong Family Mansion (Kong Fu), collectively the most important Confucian sites in the world [1][3].',
    history: 'The Temple of Confucius was first established in 478 BCE, one year after Confucius\'s death, when the Duke of Lu converted his house into a temple [1][2]. The complex was expanded over the centuries by successive dynasties, reaching its current scale primarily during the Ming and Qing dynasties [1][2].',
    significance: 'The temple complex is the largest and most elaborate Confucian temple in the world, with over 100 buildings and 460 rooms [1][2]. The Cemetery of Confucius is the oldest and largest family cemetery in the world, with over 100,000 graves spanning 2,500 years [1][2]. Annual ceremonies honoring Confucius are held on his birthday (September 28) [1][2].',
    visiting: 'The Temple and Cemetery of Confucius and the Kong Family Mansion are a UNESCO World Heritage Site [3]. The site receives millions of visitors annually [1].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Qufu" and "Confucius."', url: 'https://www.britannica.com/place/Qufu' },
      { label: 'Oxford Reference, entries on Confucian temples and rituals.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Temple and Cemetery of Confucius and the Kong Family Mansion in Qufu."', url: 'https://whc.unesco.org/en/list/704' },
    ],
  },
  'salt-lake-temple': {
    name: 'Salt Lake Temple',
    traditions: 'Latter-day Saints (LDS)',
    region: 'North America (United States)',
    overview: 'The Salt Lake Temple in Salt Lake City, Utah, is the most prominent temple of The Church of Jesus Christ of Latter-day Saints and the centerpiece of Temple Square, the most visited tourist attraction in Utah [1][2].',
    history: 'Construction began in 1853 under the direction of Brigham Young and took 40 years to complete, with the temple dedicated in 1893 [1][2]. The granite was quarried from Little Cottonwood Canyon and transported by ox-drawn wagons and later by railroad [1][2]. A major renovation was completed in 2024 [1][2].',
    significance: 'LDS temples are considered the most sacred spaces in the Latter-day Saint tradition, where ordinances including baptisms for the dead, endowments, and eternal marriage sealings are performed [1][2]. The Salt Lake Temple is the symbolic heart of the LDS Church and the most recognizable LDS building worldwide [1][2].',
    visiting: 'The temple interior is accessible only to LDS members with a temple recommend. Temple Square, including the grounds, visitors\' centers, and the Tabernacle (home of the Mormon Tabernacle Choir), is open to all visitors [1][2].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Salt Lake City" and "Latter-day Saints."', url: 'https://www.britannica.com/place/Salt-Lake-City-Utah' },
      { label: 'Oxford Reference, entries on LDS temples and sacred architecture.', url: 'https://www.oxfordreference.com/' },
      { label: 'Pew Research Center, LDS population data.', url: 'https://www.pewresearch.org/religion/' },
    ],
  },
  'golden-temple-dambulla': {
    name: 'Dambulla Cave Temple',
    traditions: 'Buddhism (Theravada)',
    region: 'South Asia (Sri Lanka)',
    overview: 'The Dambulla Cave Temple (also known as the Golden Temple of Dambulla) is the largest and best-preserved cave temple complex in Sri Lanka, containing over 150 Buddha statues and extensive murals [1][3].',
    history: 'The caves have been used as a place of worship since the 1st century BCE, when King Valagamba took refuge there during an invasion [1][2]. He later converted the caves into a temple complex after reclaiming his throne [1][2]. The site has been expanded and embellished by successive Sinhalese kings over two millennia [1][2].',
    significance: 'The five caves contain a remarkable collection of Buddhist art, including a 14-meter reclining Buddha carved from rock [1][2]. The murals covering approximately 2,100 square meters of ceiling and wall space depict scenes from the life of the Buddha and the history of Sri Lanka [1][2].',
    visiting: 'The Dambulla Cave Temple is a UNESCO World Heritage Site [3]. It remains an active place of worship and a major pilgrimage destination for Sri Lankan Buddhists [1].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Dambulla."', url: 'https://www.britannica.com/place/Dambulla' },
      { label: 'Oxford Reference, entries on Theravada Buddhist art.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Golden Temple of Dambulla."', url: 'https://whc.unesco.org/en/list/561' },
    ],
  },
  'chartres-cathedral': {
    name: 'Chartres Cathedral',
    traditions: 'Christianity (Catholic)',
    region: 'Europe (France)',
    overview: 'Chartres Cathedral (Cathedrale Notre-Dame de Chartres) is one of the finest examples of French Gothic architecture and has been a major Christian pilgrimage site since the Middle Ages, famous for its stained glass windows and labyrinth [1][3].',
    history: 'The current cathedral was built primarily between 1194 and 1220 CE after a fire destroyed the earlier Romanesque church [1][2]. The cathedral houses the Sancta Camisa, a relic believed to be the tunic worn by the Virgin Mary at the time of Christ\'s birth [1][2].',
    significance: 'Chartres preserves the most complete collection of medieval stained glass in the world, with 176 windows covering approximately 2,600 square meters [1][2]. The labyrinth set into the nave floor (c. 1200 CE) is one of the largest and best-preserved medieval labyrinths, used as a meditative walking path [1][2].',
    visiting: 'Chartres Cathedral is a UNESCO World Heritage Site [3]. It continues to function as an active Catholic parish church and pilgrimage destination [1].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Chartres Cathedral."', url: 'https://www.britannica.com/topic/Chartres-Cathedral' },
      { label: 'Oxford Reference, entries on Gothic architecture and Christian pilgrimage.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Chartres Cathedral."', url: 'https://whc.unesco.org/en/list/81' },
    ],
  },
  'yazd-fire-temple': {
    name: 'Yazd Atash Behram',
    traditions: 'Zoroastrianism',
    region: 'Middle East (Iran)',
    overview: 'The Yazd Atash Behram (Fire Temple) in Yazd, Iran, houses a sacred fire that Zoroastrians believe has been burning continuously since approximately 470 CE, making it one of the oldest continuously maintained sacred fires in the world [1][2].',
    history: 'The fire is said to have been transferred from the Pars Karyan fire temple and has been maintained through successive relocations over 1,500 years [1][2]. The current temple building was constructed in 1934 with the assistance of the Parsi community of India [1][2].',
    significance: 'Fire is the most important symbol in Zoroastrianism, representing Asha (truth, righteousness) and the presence of Ahura Mazda [1][2]. The Atash Behram is the highest grade of Zoroastrian fire temple, and the Yazd fire is one of only nine Atash Behrams in the world (the others are in India) [1][2].',
    visiting: 'The temple is open to visitors, though the inner sanctum where the fire burns is visible through a glass partition. Yazd itself is a UNESCO World Heritage Site for its historic urban fabric [3].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Zoroastrianism" and "Yazd."', url: 'https://www.britannica.com/topic/Zoroastrianism' },
      { label: 'Oxford Reference, entries on Zoroastrian fire temples.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Historic City of Yazd."', url: 'https://whc.unesco.org/en/list/1544' },
    ],
  },
  'adam-peak': {
    name: "Adam's Peak (Sri Pada)",
    traditions: 'Buddhism, Hinduism, Islam, Christianity',
    region: 'South Asia (Sri Lanka)',
    overview: "Adam's Peak (Sri Pada) is a 2,243-meter mountain in Sri Lanka revered by four major religions, each of which claims the footprint-shaped impression at its summit as sacred [1][2].",
    history: 'Pilgrimage to the summit has been documented for over 1,000 years [1][2]. The mountain is mentioned in accounts by Arab traders, Chinese Buddhist monks, and European travelers from the medieval period onward [1][2].',
    significance: "Buddhists believe the footprint is that of the Buddha; Hindus attribute it to Shiva; Muslims and Christians associate it with Adam's first step after being expelled from the Garden of Eden [1][2]. The mountain is one of the rare sacred sites venerated by multiple religions simultaneously [1][2].",
    visiting: 'The pilgrimage season runs from December to May. Thousands of pilgrims climb the 5,500 steps to the summit, typically beginning at night to arrive for sunrise [1][2].',
    sources: [
      { label: "Encyclopaedia Britannica, \"Adam's Peak.\"", url: 'https://www.britannica.com/place/Adams-Peak' },
      { label: 'Oxford Reference, entries on multi-faith sacred sites.', url: 'https://www.oxfordreference.com/' },
      { label: 'Pew Research Center, Sri Lanka religious demographics.', url: 'https://www.pewresearch.org/religion/' },
    ],
  },
  'great-mosque-djenne': {
    name: 'Great Mosque of Djenne',
    traditions: 'Islam',
    region: 'Africa (Mali)',
    overview: 'The Great Mosque of Djenne in Mali is the largest mud-brick (adobe) building in the world and one of the most distinctive examples of Sudano-Sahelian architecture, serving as the spiritual center of the city of Djenne [1][3].',
    history: 'The original mosque was built in the 13th century CE, but the current structure dates to 1907, built on the foundations of earlier mosques [1][2]. Djenne has been a center of Islamic learning and trade in West Africa since the medieval period [1][2].',
    significance: 'The mosque is the focal point of the annual Crepissage festival, when the entire community participates in replastering the mosque with fresh mud, a communal act of devotion and maintenance [1][2]. The building exemplifies the integration of Islamic worship with local African architectural traditions [1][2].',
    visiting: 'The Great Mosque and the Old Towns of Djenne are a UNESCO World Heritage Site [3]. Non-Muslims are generally not permitted to enter the mosque interior [1].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Djenne."', url: 'https://www.britannica.com/place/Djenne' },
      { label: 'Oxford Reference, entries on Islamic architecture in Africa.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Old Towns of Djenne."', url: 'https://whc.unesco.org/en/list/116' },
    ],
  },
  'meiji-shrine': {
    name: 'Meiji Shrine',
    traditions: 'Shinto',
    region: 'East Asia (Japan)',
    overview: 'Meiji Shrine (Meiji Jingu) in Tokyo is one of the most visited Shinto shrines in Japan, dedicated to the deified spirits of Emperor Meiji and Empress Shoken [1][2].',
    history: 'The shrine was built in 1920, eight years after the death of Emperor Meiji, who presided over Japan\'s transformation from a feudal society to a modern nation [1][2]. The original buildings were destroyed in World War II air raids and rebuilt in 1958 [1][2].',
    significance: 'The shrine is set within a 170-acre forest of approximately 120,000 trees donated from across Japan and planted when the shrine was established [1][2]. It represents the intersection of Shinto spirituality with modern Japanese national identity [1][2]. Hatsumode (the first shrine visit of the New Year) at Meiji Shrine draws approximately 3 million visitors over the first three days of January [1][2].',
    visiting: 'The shrine is free to enter and is located adjacent to Harajuku in central Tokyo. It is one of the most popular tourist destinations in Japan [1][2].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Meiji Shrine."', url: 'https://www.britannica.com/topic/Meiji-Shrine' },
      { label: 'Oxford Reference, entries on Shinto shrines and State Shinto.', url: 'https://www.oxfordreference.com/' },
    ],
  },
  'karnak-temple': {
    name: 'Karnak Temple Complex',
    traditions: 'Ancient Egyptian',
    region: 'Africa (Egypt)',
    overview: 'The Karnak Temple Complex near Luxor, Egypt, is the largest ancient religious site in the world, dedicated primarily to the god Amun-Ra, and represents over 2,000 years of continuous temple construction [1][3].',
    history: 'Construction began during the Middle Kingdom (c. 2000 BCE) and continued through the Ptolemaic period (c. 300 BCE) [1][2]. Approximately 30 pharaohs contributed to the complex, each adding temples, pylons, obelisks, and other structures [1][2]. The Great Hypostyle Hall, with its 134 massive columns, was primarily built by Seti I and Ramesses II (13th century BCE) [1][2].',
    significance: 'Karnak was the most important religious center in ancient Egypt, where the cult of Amun-Ra was maintained by thousands of priests [1][2]. The annual Opet Festival, in which the statue of Amun was carried from Karnak to Luxor Temple, was one of the most important religious celebrations in ancient Egypt [1][2].',
    visiting: 'Karnak is part of the UNESCO World Heritage Site "Ancient Thebes with its Necropolis" [3]. It is one of Egypt\'s most visited archaeological sites [1].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Karnak."', url: 'https://www.britannica.com/place/Karnak' },
      { label: 'Oxford Reference, entries on ancient Egyptian religion and temples.', url: 'https://www.oxfordreference.com/' },
      { label: 'UNESCO World Heritage Centre, "Ancient Thebes with its Necropolis."', url: 'https://whc.unesco.org/en/list/87' },
    ],
  },
  'glastonbury-tor': {
    name: 'Glastonbury Tor',
    traditions: 'Christianity, Paganism, New Age',
    region: 'Europe (England)',
    overview: 'Glastonbury Tor is a hill in Somerset, England, topped by the roofless St. Michael\'s Tower, that has been a site of spiritual significance for centuries, attracting Christians, pagans, and New Age practitioners alike [1][2].',
    history: 'Archaeological evidence suggests human activity on the Tor dating back to the Neolithic period [1][2]. Christian tradition associates Glastonbury with Joseph of Arimathea, who is said to have brought the Holy Grail to Britain and planted his staff on nearby Wearyall Hill [1][2]. Glastonbury Abbey, at the foot of the Tor, was one of the most important monasteries in medieval England [1][2].',
    significance: 'For Christians, Glastonbury is associated with the earliest introduction of Christianity to Britain [1][2]. For pagans and New Age practitioners, the Tor is believed to be a site of powerful earth energy, associated with the mythical Isle of Avalon from Arthurian legend [1][2]. The Chalice Well at the base of the Tor is a sacred spring visited by pilgrims of various spiritual traditions [1][2].',
    visiting: 'Glastonbury Tor is managed by the National Trust and is free to visit. The town of Glastonbury is a major center of alternative spirituality in Britain [1][2].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Glastonbury."', url: 'https://www.britannica.com/place/Glastonbury-England' },
      { label: 'Oxford Reference, entries on Arthurian legend and British sacred sites.', url: 'https://www.oxfordreference.com/' },
    ],
  },
  'shashamane': {
    name: 'Shashamane',
    traditions: 'Rastafari',
    region: 'Africa (Ethiopia)',
    overview: 'Shashamane is a town in southern Ethiopia that is home to a Rastafari community established on land granted by Emperor Haile Selassie I to people of African descent from the Caribbean and the Americas [1][2].',
    history: 'In 1948, Haile Selassie granted 500 acres of land near Shashamane to the Ethiopian World Federation for settlement by people of African descent [1][2]. Rastafari settlers began arriving in the 1960s, particularly from Jamaica, and established a community that continues to this day [1][2]. The community has faced challenges including land disputes and the political upheavals of the Derg regime (1974-1991) [1][2].',
    significance: 'Shashamane represents the realization of the Rastafari ideal of repatriation to Africa, the return of the African diaspora to the motherland [1][2]. For Rastas, Ethiopia holds a unique spiritual significance as the land of Zion, and Shashamane is the most tangible expression of that connection [1][2].',
    visiting: 'The Rastafari community in Shashamane welcomes visitors interested in learning about Rastafari culture and the repatriation movement. The community includes a Nyahbinghi tabernacle, cultural centers, and the Jamaica-Ethiopia Friendship Garden [1][2].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Rastafari" and "Haile Selassie."', url: 'https://www.britannica.com/topic/Rastafari' },
      { label: 'Oxford Reference, entries on Rastafari and pan-Africanism.', url: 'https://www.oxfordreference.com/' },
      { label: 'Pew Research Center, Ethiopian religious demographics.', url: 'https://www.pewresearch.org/religion/' },
    ],
  },
  'touba': {
    name: 'Great Mosque of Touba',
    traditions: 'Islam (Mouride Sufi)',
    region: 'Africa (Senegal)',
    overview: 'The Great Mosque of Touba is the largest mosque in sub-Saharan Africa and the spiritual center of the Mouride brotherhood, one of the most influential Sufi orders in West Africa [1][2].',
    history: 'Touba was founded in 1887 by Cheikh Ahmadou Bamba, the founder of the Mouride order [1][2]. Construction of the Great Mosque began in 1932 and has been expanded multiple times, with the most recent minaret completed in 2006 [1][2]. Bamba is buried within the mosque [1][2].',
    significance: 'The annual Grand Magal pilgrimage to Touba commemorates Cheikh Ahmadou Bamba\'s exile by French colonial authorities and draws approximately 3-5 million pilgrims, making it one of the largest annual pilgrimages in Africa [1][2]. The Mouride brotherhood plays a significant role in Senegalese society, economics, and politics [1][2].',
    visiting: 'The mosque is open to visitors, though modest dress is required. The Grand Magal (typically in October or November) is the most significant time to visit [1][2].',
    sources: [
      { label: 'Encyclopaedia Britannica, "Mouride" and "Touba."', url: 'https://www.britannica.com/topic/Muridiyyah' },
      { label: 'Oxford Reference, entries on Sufi orders in West Africa.', url: 'https://www.oxfordreference.com/' },
      { label: 'Pew Research Center, Senegal religious demographics.', url: 'https://www.pewresearch.org/religion/' },
    ],
  },
};

export const SACRED_PLACE_SLUGS = Object.keys(PLACE_CONTENT).sort();

export async function generateMetadata({ params }: SacredPlacePageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = PLACE_CONTENT[slug];
  if (!content) return { title: 'Sacred Place Not Found' };
  return genMeta({
    title: content.name,
    description: `Learn about ${content.name}, a sacred site in ${content.traditions}. ${stripInlineCitations(content.overview).slice(0, 120)}...`,
    path: `/sacred-places/${slug}`,
    type: 'website',
  });
}

export function generateStaticParams() {
  return SACRED_PLACE_SLUGS.map((slug) => ({ slug }));
}

export default async function SacredPlacePage({ params }: SacredPlacePageProps) {
  const { slug } = await params;
  const content = PLACE_CONTENT[slug];
  if (!content) notFound();

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Sacred Places', url: '/sacred-places' },
    { name: content.name, url: `/sacred-places/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container py-8 max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li><Link href="/sacred-places" className="hover:text-foreground transition-colors">Sacred Places</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-foreground font-medium" aria-current="page">{content.name}</li>
          </ol>
        </nav>

        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 text-primary/70" aria-hidden="true" />
            <span>{content.region}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{content.name}</h1>
          <p className="text-primary/80 font-medium">{content.traditions}</p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary/70" aria-hidden="true" />
              Overview
            </h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm leading-relaxed text-muted-foreground">{collapseInlineCitations(content.overview)}</p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary/70" aria-hidden="true" />
              History
            </h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm leading-relaxed text-muted-foreground">{collapseInlineCitations(content.history)}</p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Religious Significance</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm leading-relaxed text-muted-foreground">{collapseInlineCitations(content.significance)}</p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Visiting</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm leading-relaxed text-muted-foreground">{collapseInlineCitations(content.visiting)}</p>
              </CardContent>
            </Card>
          </section>

          <section className="rounded-xl border bg-muted/30 p-5" aria-labelledby="place-sources-heading">
            <h2 id="place-sources-heading" className="text-xl font-semibold mb-3">Sources &amp; Further Reading</h2>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
              {content.sources.map((src, i) => (
                <li key={i}>
                  {src.label}
                  {src.url && (
                    <a href={src.url} target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                      {src.url}
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </>
  );
}
