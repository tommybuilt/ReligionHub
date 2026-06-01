'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { QuizEngine, type QuizQuestion } from '@/components/quiz-engine';

/* SOURCE LOG: /quiz/knowledge */
/* Last updated: 2026-02-15 (attribution pass) */
/* References consulted for fact verification (no text copied):
   - Encyclopaedia Britannica religion entries
   - Oxford Reference and Oxford Islamic Studies reference pages
   - Cambridge and Routledge academic introductions
   - Catholic Catechism (public catechetical reference)
   - Buddhist Publication Society and public-domain translation collections
*/
/* ALL VISIBLE TEXT IS ORIGINAL. */

const KNOWLEDGE_QUESTIONS: QuizQuestion[] = [
  {
    id: 'k1',
    question: 'What is the central holy text of Islam?',
    options: [
      { label: 'The Torah', value: 'torah' },
      { label: 'The Quran', value: 'quran' },
      { label: 'The Vedas', value: 'vedas' },
      { label: 'The Tripitaka', value: 'tripitaka' },
    ],
    correctAnswer: 'quran',
    explanation: 'The Quran is the central religious text of Islam, believed by Muslims to be a revelation from God (Allah) [1].',
    citation: '[1] Encyclopaedia Britannica, "Quran"',
  },
  {
    id: 'k2',
    question: 'Which religion teaches the concept of the Four Noble Truths?',
    options: [
      { label: 'Hinduism', value: 'hinduism' },
      { label: 'Buddhism', value: 'buddhism' },
      { label: 'Jainism', value: 'jainism' },
      { label: 'Sikhism', value: 'sikhism' },
    ],
    correctAnswer: 'buddhism',
    explanation: 'The Four Noble Truths are foundational in Buddhism and describe suffering, its cause, its cessation, and the path leading to cessation [2].',
    citation: '[2] Rupert Gethin, The Foundations of Buddhism (Oxford University Press)',
  },
  {
    id: 'k3',
    question: 'What is the name of the Jewish day of rest observed from Friday evening to Saturday evening?',
    options: [
      { label: 'Yom Kippur', value: 'yom-kippur' },
      { label: 'Shabbat', value: 'shabbat' },
      { label: 'Hanukkah', value: 'hanukkah' },
      { label: 'Passover', value: 'passover' },
    ],
    correctAnswer: 'shabbat',
    explanation: 'Shabbat (Sabbath) is the weekly Jewish day of rest, observed from Friday evening to Saturday evening [3].',
    citation: '[3] Encyclopaedia Britannica, "Sabbath" and "Judaism" reference entries',
  },
  {
    id: 'k4',
    question: 'The concept of "karma" is central to which group of religions?',
    options: [
      { label: 'Abrahamic religions (Judaism, Christianity, Islam)', value: 'abrahamic' },
      { label: 'Dharmic religions (Hinduism, Buddhism, Jainism, Sikhism)', value: 'dharmic' },
      { label: 'East Asian religions (Confucianism, Taoism, Shinto)', value: 'east-asian' },
      { label: 'Indigenous traditions', value: 'indigenous' },
    ],
    correctAnswer: 'dharmic',
    explanation: 'Karma appears across Dharmic religions, including Hindu, Buddhist, Jain, and Sikh traditions, with school-specific interpretations [4].',
    citation: '[4] Encyclopaedia Britannica, "Karma"',
  },
  {
    id: 'k5',
    question: 'Which of the following is one of the Five Pillars of Islam?',
    options: [
      { label: 'Meditation', value: 'meditation' },
      { label: 'Pilgrimage to Mecca (Hajj)', value: 'hajj' },
      { label: 'Baptism', value: 'baptism' },
      { label: 'Confession', value: 'confession' },
    ],
    correctAnswer: 'hajj',
    explanation: 'The Five Pillars are shahada, salah, zakat, sawm in Ramadan, and hajj for those able to perform it [5].',
    citation: '[5] Oxford Islamic Studies and Encyclopaedia Britannica, "Five Pillars of Islam"',
  },
  {
    id: 'k6',
    question: 'The Guru Granth Sahib is the holy scripture of which religion?',
    options: [
      { label: 'Hinduism', value: 'hinduism' },
      { label: 'Buddhism', value: 'buddhism' },
      { label: 'Sikhism', value: 'sikhism' },
      { label: 'Jainism', value: 'jainism' },
    ],
    correctAnswer: 'sikhism',
    explanation: 'The Guru Granth Sahib is the central scripture of Sikhism and is treated as the eternal Guru in mainstream Sikh tradition [6].',
    citation: '[6] Encyclopaedia Britannica, "Adi Granth" / "Guru Granth Sahib"',
  },
  {
    id: 'k7',
    question: 'What does the Christian doctrine of the Trinity teach?',
    options: [
      { label: 'God exists as three separate gods', value: 'three-gods' },
      { label: 'God exists as one God in three persons: Father, Son, and Holy Spirit', value: 'trinity' },
      { label: 'Jesus is the only form of God', value: 'jesus-only' },
      { label: 'God changes between three forms at different times', value: 'modalism' },
    ],
    correctAnswer: 'trinity',
    explanation: 'The Trinity, in mainstream Christian theology, teaches one God in three persons: Father, Son, and Holy Spirit [7].',
    citation: '[7] Catechism of the Catholic Church, paragraphs 232-267',
  },
  {
    id: 'k8',
    question: 'Ahimsa (non-violence) is a core principle most emphasized in which religion?',
    options: [
      { label: 'Islam', value: 'islam' },
      { label: 'Christianity', value: 'christianity' },
      { label: 'Jainism', value: 'jainism' },
      { label: 'Shinto', value: 'shinto' },
    ],
    correctAnswer: 'jainism',
    explanation: 'Ahimsa is present in multiple Dharmic traditions but is especially central and rigorous in Jain ethics [8].',
    citation: '[8] Paul Dundas, The Jains (Routledge)',
  },
  {
    id: 'k9',
    question: 'Which religion has no single founder and is considered the oldest major world religion?',
    options: [
      { label: 'Buddhism', value: 'buddhism' },
      { label: 'Judaism', value: 'judaism' },
      { label: 'Hinduism', value: 'hinduism' },
      { label: 'Zoroastrianism', value: 'zoroastrianism' },
    ],
    correctAnswer: 'hinduism',
    explanation: 'Hinduism has no single founder and developed over long historical periods in the Indian subcontinent [9].',
    citation: '[9] Gavin Flood, An Introduction to Hinduism (Cambridge University Press)',
  },
  {
    id: 'k10',
    question: 'What is the Eightfold Path in Buddhism?',
    options: [
      { label: 'Eight gods to worship', value: 'eight-gods' },
      { label: 'Eight stages of reincarnation', value: 'eight-stages' },
      { label: 'A guide to ethical and mental development leading to the end of suffering', value: 'eightfold' },
      { label: 'Eight sacred texts to study', value: 'eight-texts' },
    ],
    correctAnswer: 'eightfold',
    explanation: 'The Noble Eightfold Path is presented in Buddhist teaching as a framework for ethical conduct, mental discipline, and wisdom [10].',
    citation: '[10] Bhikkhu Bodhi, The Noble Eightfold Path (Buddhist Publication Society)',
  },
  {
    id: 'k11',
    question: 'What is the name of the supreme deity in Zoroastrianism?',
    options: [
      { label: 'Brahma', value: 'brahma' },
      { label: 'Ahura Mazda', value: 'ahura-mazda' },
      { label: 'Olodumare', value: 'olodumare' },
      { label: 'Tengri', value: 'tengri' },
    ],
    correctAnswer: 'ahura-mazda',
    explanation: 'Ahura Mazda (Wise Lord) is the supreme deity in Zoroastrianism, representing truth, light, and righteousness [11].',
    citation: '[11] Encyclopaedia Britannica, "Ahura Mazda"',
  },
  {
    id: 'k12',
    question: 'Which religion teaches that all prophets, including Moses, Jesus, Muhammad, and others, are messengers of one God?',
    options: [
      { label: 'Islam', value: 'islam' },
      { label: "Baha'i Faith", value: 'bahai' },
      { label: 'Christianity', value: 'christianity' },
      { label: 'Sikhism', value: 'sikhism' },
    ],
    correctAnswer: 'bahai',
    explanation: "The Baha'i Faith teaches progressive revelation, that God has sent a series of divine messengers throughout history, each suited to the needs of their era [12].",
    citation: "[12] Encyclopaedia Britannica, \"Baha'i Faith\"",
  },
  {
    id: 'k13',
    question: 'What is the Tao Te Ching?',
    options: [
      { label: 'A Buddhist meditation manual', value: 'buddhist' },
      { label: 'The foundational text of Taoism, attributed to Laozi', value: 'taoism' },
      { label: 'A Confucian book of rituals', value: 'confucian' },
      { label: 'A Shinto creation myth', value: 'shinto' },
    ],
    correctAnswer: 'taoism',
    explanation: 'The Tao Te Ching (Daodejing) is the foundational text of philosophical Taoism, traditionally attributed to the sage Laozi (Lao Tzu) [13].',
    citation: '[13] Encyclopaedia Britannica, "Daodejing"',
  },
  {
    id: 'k14',
    question: 'In Confucianism, what is the concept of "ren" (仁)?',
    options: [
      { label: 'Ritual propriety', value: 'ritual' },
      { label: 'Benevolence or humaneness toward others', value: 'ren' },
      { label: 'Filial piety', value: 'filial' },
      { label: 'The mandate of heaven', value: 'mandate' },
    ],
    correctAnswer: 'ren',
    explanation: 'Ren is the central virtue in Confucian ethics, often translated as benevolence, humaneness, or compassion, the quality of being a good human being [14].',
    citation: '[14] Encyclopaedia Britannica, "ren"; Oxford Reference, Confucian ethics entries',
  },
  {
    id: 'k15',
    question: 'What distinguishes Orthodox Christianity from Roman Catholicism?',
    options: [
      { label: 'Orthodox Christians do not believe in Jesus', value: 'no-jesus' },
      { label: 'Orthodox Christians reject the authority of the Pope and differ on the Filioque clause', value: 'pope-filioque' },
      { label: 'Orthodox Christians do not use the Bible', value: 'no-bible' },
      { label: 'There are no significant differences', value: 'no-diff' },
    ],
    correctAnswer: 'pope-filioque',
    explanation: 'The Great Schism of 1054 divided Christianity over issues including papal authority and the Filioque clause (whether the Holy Spirit proceeds from the Father alone or from the Father and the Son) [15].',
    citation: '[15] Encyclopaedia Britannica, "Great Schism" and "Filioque"',
  },
  {
    id: 'k16',
    question: 'What is the Book of Mormon?',
    options: [
      { label: 'An ancient Egyptian text', value: 'egyptian' },
      { label: 'A scripture of the Latter-day Saints, believed to be translated by Joseph Smith from golden plates', value: 'lds' },
      { label: 'A medieval European manuscript', value: 'medieval' },
      { label: 'A collection of Jewish prayers', value: 'jewish' },
    ],
    correctAnswer: 'lds',
    explanation: 'The Book of Mormon is a sacred text of The Church of Jesus Christ of Latter-day Saints, which Joseph Smith said he translated from golden plates revealed to him by an angel [16].',
    citation: '[16] Encyclopaedia Britannica, "Book of Mormon"',
  },
  {
    id: 'k17',
    question: 'What is the Wiccan Rede?',
    options: [
      { label: 'A list of gods to worship', value: 'gods' },
      { label: '"An it harm none, do what ye will", a central ethical principle', value: 'rede' },
      { label: 'A book of spells', value: 'spells' },
      { label: 'A calendar of festivals', value: 'calendar' },
    ],
    correctAnswer: 'rede',
    explanation: 'The Wiccan Rede ("An it harm none, do what ye will") is the most widely cited ethical principle in Wicca, affirming individual freedom while establishing a boundary against causing harm [17].',
    citation: '[17] Ronald Hutton, The Triumph of the Moon (Oxford University Press)',
  },
  {
    id: 'k18',
    question: 'In Rastafari, who is considered the returned messiah?',
    options: [
      { label: 'Marcus Garvey', value: 'garvey' },
      { label: 'Bob Marley', value: 'marley' },
      { label: 'Haile Selassie I', value: 'selassie' },
      { label: 'Nelson Mandela', value: 'mandela' },
    ],
    correctAnswer: 'selassie',
    explanation: 'Rastafari teaches that Emperor Haile Selassie I of Ethiopia (1892-1975) is the returned messiah and the earthly manifestation of God (Jah) [18].',
    citation: '[18] Encyclopaedia Britannica, "Rastafari"',
  },
  {
    id: 'k19',
    question: 'What is the Ifa divination system?',
    options: [
      { label: 'A Hindu astrological system', value: 'hindu' },
      { label: 'A Yoruba/African diaspora system of divination using sacred verses', value: 'ifa' },
      { label: 'A Chinese fortune-telling method', value: 'chinese' },
      { label: 'A Native American vision quest', value: 'native' },
    ],
    correctAnswer: 'ifa',
    explanation: 'Ifa is a Yoruba divination system recognized by UNESCO as Intangible Cultural Heritage, using 256 odu (sacred verses) to communicate with the orishas and ancestors [19].',
    citation: '[19] UNESCO, "Ifa Divination System" (2005 ICH listing)',
  },
  {
    id: 'k20',
    question: 'What percentage of the world population is religiously unaffiliated ("nones")?',
    options: [
      { label: 'About 5%', value: '5' },
      { label: 'About 16%', value: '16' },
      { label: 'About 50%', value: '50' },
      { label: 'About 75%', value: '75' },
    ],
    correctAnswer: '16',
    explanation: 'The religiously unaffiliated constitute approximately 16% of the global population (about 1.2 billion people), making them the third-largest category after Christians and Muslims [20].',
    citation: '[20] Pew Research Center, "The Global Religious Landscape" (2012, updated estimates)',
  },
  {
    id: 'k21',
    question: 'What is the Druze belief about the soul after death?',
    options: [
      { label: 'The soul ceases to exist', value: 'cease' },
      { label: 'The soul is immediately reborn into another human body (transmigration)', value: 'reincarnation' },
      { label: 'The soul enters paradise or hell', value: 'paradise' },
      { label: 'The soul merges with the universal spirit', value: 'merge' },
    ],
    correctAnswer: 'reincarnation',
    explanation: 'The Druze believe in taqammus, the transmigration of souls, in which the soul is immediately reborn into a new human body at the moment of death [21].',
    citation: '[21] Nissim Dana, The Druze in the Middle East (Sussex Academic Press); Encyclopaedia Britannica, "Druze"',
  },
  {
    id: 'k22',
    question: 'Which historical figure do the Druze regard as a manifestation of God?',
    options: [
      { label: 'Saladin', value: 'saladin' },
      { label: 'al-Hakim bi-Amr Allah', value: 'al-hakim' },
      { label: 'Ibn Rushd (Averroes)', value: 'averroes' },
      { label: 'Ali ibn Abi Talib', value: 'ali' },
    ],
    correctAnswer: 'al-hakim',
    explanation: 'The Druze regard the Fatimid Caliph al-Hakim bi-Amr Allah (985-1021 CE) as the ultimate manifestation of God on earth, a belief that distinguishes them from all other Abrahamic traditions [22].',
    citation: '[22] Encyclopaedia Britannica, "Druze"; Nissim Dana, The Druze in the Middle East',
  },
  {
    id: 'k23',
    question: 'What is the primary symbol of Unitarian Universalism?',
    options: [
      { label: 'A cross', value: 'cross' },
      { label: 'A flaming chalice', value: 'chalice' },
      { label: 'A lotus flower', value: 'lotus' },
      { label: 'A star and crescent', value: 'star-crescent' },
    ],
    correctAnswer: 'chalice',
    explanation: 'The flaming chalice is the primary symbol of Unitarian Universalism, designed in 1941 by Hans Deutsch for the Unitarian Service Committee during World War II [23].',
    citation: '[23] Unitarian Universalist Association; David Robinson, The Unitarians and the Universalists (Greenwood Press)',
  },
  {
    id: 'k24',
    question: 'Unitarian Universalism is best described as:',
    options: [
      { label: 'A branch of Catholicism', value: 'catholic' },
      { label: 'A non-creedal religion that draws from multiple traditions', value: 'non-creedal' },
      { label: 'A form of Buddhism adapted for the West', value: 'buddhist' },
      { label: 'A denomination that requires belief in the Trinity', value: 'trinitarian' },
    ],
    correctAnswer: 'non-creedal',
    explanation: 'Unitarian Universalism is a non-creedal religion, it has no required statement of belief. UUs draw from Christianity, humanism, Buddhism, earth-centered traditions, and other sources [24].',
    citation: '[24] Encyclopaedia Britannica, "Unitarian Universalism"; UUA Principles and Sources',
  },
];

export default function KnowledgeQuizPage() {
  return (
    <div className="container py-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
          <li><Link href="/quiz" className="hover:text-foreground transition-colors">Quizzes</Link></li>
          <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
          <li className="text-foreground font-medium" aria-current="page">Knowledge Quiz</li>
        </ol>
      </nav>

      <QuizEngine
        title="World Religions Knowledge Quiz"
        description="Test your knowledge of world religions with citation-backed questions."
        questions={KNOWLEDGE_QUESTIONS}
        type="knowledge"
      />

      <section className="mt-8 rounded-xl border bg-muted/30 p-5" aria-labelledby="knowledge-sources-heading">
        <h2 id="knowledge-sources-heading" className="text-xl font-semibold mb-3">Sources &amp; Further Reading</h2>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
          <li>
            Encyclopaedia Britannica, &ldquo;Quran.&rdquo;
            <a href="https://www.britannica.com/topic/Quran" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/Quran
            </a>
          </li>
          <li>
            Rupert Gethin, <em>The Foundations of Buddhism</em> (Oxford University Press).
          </li>
          <li>
            Encyclopaedia Britannica, Judaism and Sabbath entries.
            <a href="https://www.britannica.com/topic/Sabbath" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/Sabbath
            </a>
          </li>
          <li>
            Encyclopaedia Britannica, &ldquo;Karma.&rdquo;
            <a href="https://www.britannica.com/topic/karma" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/karma
            </a>
          </li>
          <li>
            Oxford Islamic Studies and Britannica references on the Five Pillars of Islam.
          </li>
          <li>
            Encyclopaedia Britannica, &ldquo;Adi Granth&rdquo; / &ldquo;Guru Granth Sahib.&rdquo;
            <a href="https://www.britannica.com/topic/Adi-Granth" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/Adi-Granth
            </a>
          </li>
          <li>
            Catechism of the Catholic Church, paragraphs 232-267.
            <a href="https://www.vatican.va/archive/ENG0015/__P17.HTM" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.vatican.va/archive/ENG0015/__P17.HTM
            </a>
          </li>
          <li>
            Paul Dundas, <em>The Jains</em> (Routledge).
          </li>
          <li>
            Gavin Flood, <em>An Introduction to Hinduism</em> (Cambridge University Press).
          </li>
          <li>
            Bhikkhu Bodhi, <em>The Noble Eightfold Path</em> (Buddhist Publication Society).
            <a href="https://www.accesstoinsight.org/lib/authors/bodhi/waytoend.html" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.accesstoinsight.org/lib/authors/bodhi/waytoend.html
            </a>
          </li>
        </ol>
      </section>
    </div>
  );
}
