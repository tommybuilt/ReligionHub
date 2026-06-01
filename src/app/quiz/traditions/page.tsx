'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { QuizEngine, type QuizQuestion } from '@/components/quiz-engine';

/* SOURCE LOG: /quiz/traditions */
/* Last updated: 2026-02-15 (attribution pass) */
/* References consulted for fact verification (no text copied):
   - Encyclopaedia Britannica religion entries
   - Oxford Reference comparative religion resources
   - Pew Research Center religion reports
   - Cambridge and Routledge academic introductions
   - Public-domain scripture translation catalogs
*/
/* ALL VISIBLE TEXT IS ORIGINAL. */

const TRADITIONS_QUESTIONS: QuizQuestion[] = [
  {
    id: 't1',
    question: 'Which religion observes the festival of Diwali as one of its most important celebrations?',
    options: [
      { label: 'Buddhism', value: 'buddhism' },
      { label: 'Hinduism', value: 'hinduism' },
      { label: 'Sikhism', value: 'sikhism' },
      { label: 'All of the above celebrate Diwali in some form', value: 'all' },
    ],
    correctAnswer: 'all',
    explanation: 'Diwali is celebrated by Hindus, Sikhs, Jains, and some Buddhists, though the religious narratives behind the festival differ across traditions [1][2].',
    citation: '[1] Encyclopaedia Britannica, "Diwali"; [2] Oxford Reference, comparative festival entries',
  },
  {
    id: 't2',
    question: 'What is the name of the Islamic month of fasting?',
    options: [
      { label: 'Muharram', value: 'muharram' },
      { label: 'Ramadan', value: 'ramadan' },
      { label: 'Shawwal', value: 'shawwal' },
      { label: 'Dhul Hijjah', value: 'dhul-hijjah' },
    ],
    correctAnswer: 'ramadan',
    explanation: 'Ramadan is the ninth month of the Islamic lunar calendar, during which Muslims fast from dawn to sunset as one of the Five Pillars of Islam [3].',
    citation: '[3] Encyclopaedia Britannica, "Ramadan"',
  },
  {
    id: 't3',
    question: 'In Judaism, what is the weekly day of rest called?',
    options: [
      { label: 'Shabbat', value: 'shabbat' },
      { label: 'Yom Kippur', value: 'yom-kippur' },
      { label: 'Sukkot', value: 'sukkot' },
      { label: 'Purim', value: 'purim' },
    ],
    correctAnswer: 'shabbat',
    explanation: 'Shabbat is observed from Friday evening to Saturday evening and is rooted in the Genesis creation narrative and the Ten Commandments [4].',
    citation: '[4] Encyclopaedia Britannica, "Sabbath"',
  },
  {
    id: 't4',
    question: 'Which tradition practices the tea ceremony (chadō) as a form of spiritual discipline?',
    options: [
      { label: 'Hinduism', value: 'hinduism' },
      { label: 'Zen Buddhism', value: 'zen' },
      { label: 'Taoism', value: 'taoism' },
      { label: 'Confucianism', value: 'confucianism' },
    ],
    correctAnswer: 'zen',
    explanation: 'The Japanese tea ceremony developed under strong Zen Buddhist influence, emphasizing mindfulness, simplicity, and presence [5].',
    citation: '[5] Encyclopaedia Britannica, "tea ceremony"; Oxford Reference, Zen Buddhism entries',
  },
  {
    id: 't5',
    question: 'What is the Sikh practice of serving free communal meals called?',
    options: [
      { label: 'Prasad', value: 'prasad' },
      { label: 'Langar', value: 'langar' },
      { label: 'Seva', value: 'seva' },
      { label: 'Kirtan', value: 'kirtan' },
    ],
    correctAnswer: 'langar',
    explanation: 'Langar is the communal kitchen and meal served at Sikh gurdwaras, open to all regardless of religion, caste, or background. It was institutionalized by Guru Nanak and expanded by subsequent Gurus [6].',
    citation: '[6] Encyclopaedia Britannica, "langar"; Oxford Reference, Sikh practice entries',
  },
  {
    id: 't6',
    question: 'In which tradition is the practice of zazen (seated meditation) central?',
    options: [
      { label: 'Theravada Buddhism', value: 'theravada' },
      { label: 'Zen Buddhism', value: 'zen' },
      { label: 'Hinduism', value: 'hinduism' },
      { label: 'Jainism', value: 'jainism' },
    ],
    correctAnswer: 'zen',
    explanation: 'Zazen is the primary meditative practice of Zen Buddhism, emphasizing seated meditation as a direct path to insight [7].',
    citation: '[7] Encyclopaedia Britannica, "zazen"; Rupert Gethin, The Foundations of Buddhism (Oxford)',
  },
  {
    id: 't7',
    question: 'What is the Hindu festival celebrating the triumph of good over evil, marked by bonfires?',
    options: [
      { label: 'Holi', value: 'holi' },
      { label: 'Navaratri', value: 'navaratri' },
      { label: 'Holika Dahan / Holi', value: 'holika' },
      { label: 'Pongal', value: 'pongal' },
    ],
    correctAnswer: 'holika',
    explanation: 'Holika Dahan, the night before Holi, involves bonfires symbolizing the triumph of good over evil, drawn from the story of Prahlada and Holika [8].',
    citation: '[8] Encyclopaedia Britannica, "Holi"',
  },
  {
    id: 't8',
    question: 'Which Christian tradition observes Lent as a 40-day period of fasting and penitence before Easter?',
    options: [
      { label: 'Only Roman Catholic', value: 'catholic-only' },
      { label: 'Only Eastern Orthodox', value: 'orthodox-only' },
      { label: 'Most major Christian denominations observe some form of Lent', value: 'most' },
      { label: 'Only Protestant churches', value: 'protestant-only' },
    ],
    correctAnswer: 'most',
    explanation: 'Lent is observed in Catholic, Orthodox, Anglican, Lutheran, and many other Christian traditions, though the specific practices and duration vary [9].',
    citation: '[9] Encyclopaedia Britannica, "Lent"; Oxford Reference, Christian liturgical calendar entries',
  },
  {
    id: 't9',
    question: 'What is the Jain practice of extreme fasting unto death, undertaken voluntarily at the end of life?',
    options: [
      { label: 'Santhara', value: 'santhara' },
      { label: 'Tapas', value: 'tapas' },
      { label: 'Ahimsa', value: 'ahimsa' },
      { label: 'Samadhi', value: 'samadhi' },
    ],
    correctAnswer: 'santhara',
    explanation: 'Santhara (also called Sallekhana) is a Jain practice of voluntarily fasting to death, viewed not as suicide but as a spiritually disciplined renunciation at the end of life [10].',
    citation: '[10] Paul Dundas, The Jains (Routledge); Encyclopaedia Britannica, "Jainism"',
  },
  {
    id: 't10',
    question: 'In Shinto, what are the ritual gates marking the entrance to a sacred space called?',
    options: [
      { label: 'Pagoda', value: 'pagoda' },
      { label: 'Torii', value: 'torii' },
      { label: 'Stupa', value: 'stupa' },
      { label: 'Mandala', value: 'mandala' },
    ],
    correctAnswer: 'torii',
    explanation: 'Torii gates mark the transition from the mundane to the sacred in Shinto, typically found at the entrance to shrine grounds [11].',
    citation: '[11] Encyclopaedia Britannica, "torii"',
  },
  {
    id: 't11',
    question: 'What is the Zoroastrian practice of exposing the dead to be consumed by vultures called?',
    options: [
      { label: 'Sky burial', value: 'sky' },
      { label: 'Tower of Silence (dakhma)', value: 'dakhma' },
      { label: 'Cremation', value: 'cremation' },
      { label: 'Mummification', value: 'mummy' },
    ],
    correctAnswer: 'dakhma',
    explanation: 'Zoroastrians traditionally placed the dead in Towers of Silence (dakhmas) to avoid contaminating earth, fire, or water, all considered sacred elements [12].',
    citation: '[12] Encyclopaedia Britannica, "Tower of Silence" and "Zoroastrianism"',
  },
  {
    id: 't12',
    question: 'What is the Catholic sacrament in which bread and wine are believed to become the body and blood of Christ?',
    options: [
      { label: 'Baptism', value: 'baptism' },
      { label: 'Confirmation', value: 'confirmation' },
      { label: 'The Eucharist (Holy Communion)', value: 'eucharist' },
      { label: 'Confession', value: 'confession' },
    ],
    correctAnswer: 'eucharist',
    explanation: 'The Eucharist is the central act of Catholic worship. The doctrine of transubstantiation teaches that the bread and wine become the actual body and blood of Christ [13].',
    citation: '[13] Catechism of the Catholic Church; Encyclopaedia Britannica, "Eucharist"',
  },
  {
    id: 't13',
    question: 'What are the eight seasonal festivals celebrated by many Wiccans and pagans collectively called?',
    options: [
      { label: 'The Holy Days', value: 'holy-days' },
      { label: 'The Wheel of the Year', value: 'wheel' },
      { label: 'The Sacred Calendar', value: 'calendar' },
      { label: 'The Eightfold Path', value: 'eightfold' },
    ],
    correctAnswer: 'wheel',
    explanation: 'The Wheel of the Year consists of eight sabbats marking the solstices, equinoxes, and four cross-quarter days, reflecting the cycle of seasons [14].',
    citation: '[14] Ronald Hutton, The Triumph of the Moon (Oxford University Press)',
  },
  {
    id: 't14',
    question: 'What is the Rastafari practice of communal discussion and spiritual reflection called?',
    options: [
      { label: 'Groundation', value: 'groundation' },
      { label: 'Reasoning', value: 'reasoning' },
      { label: 'Nyahbinghi', value: 'nyahbinghi' },
      { label: 'Livity', value: 'livity' },
    ],
    correctAnswer: 'reasoning',
    explanation: 'Reasoning sessions are informal gatherings where Rastas discuss theology, philosophy, and current events, often accompanied by communal ganja use and chanting [15].',
    citation: '[15] Encyclopaedia Britannica, "Rastafari"',
  },
  {
    id: 't15',
    question: 'In Confucianism, what is the practice of honoring and respecting one\'s parents and ancestors called?',
    options: [
      { label: 'Ren (benevolence)', value: 'ren' },
      { label: 'Xiao (filial piety)', value: 'xiao' },
      { label: 'Li (ritual propriety)', value: 'li' },
      { label: 'Yi (righteousness)', value: 'yi' },
    ],
    correctAnswer: 'xiao',
    explanation: 'Xiao (filial piety) is one of the most important Confucian virtues, encompassing respect, obedience, and care for one\'s parents and ancestors [16].',
    citation: '[16] Encyclopaedia Britannica, "xiao"; Oxford Reference, Confucian virtue entries',
  },
  {
    id: 't16',
    question: 'What is the name of the annual Mouride pilgrimage to Touba, Senegal?',
    options: [
      { label: 'Hajj', value: 'hajj' },
      { label: 'Grand Magal', value: 'magal' },
      { label: 'Mawlid', value: 'mawlid' },
      { label: 'Eid al-Fitr', value: 'eid' },
    ],
    correctAnswer: 'magal',
    explanation: 'The Grand Magal of Touba draws 3-5 million pilgrims annually to commemorate the exile of Cheikh Ahmadou Bamba, founder of the Mouride Sufi order [17].',
    citation: '[17] Encyclopaedia Britannica, "Muridiyyah"',
  },
  {
    id: 't17',
    question: 'What is the LDS practice of performing religious ordinances on behalf of deceased ancestors called?',
    options: [
      { label: 'Ancestral worship', value: 'worship' },
      { label: 'Baptism for the dead', value: 'baptism-dead' },
      { label: 'Last rites', value: 'last-rites' },
      { label: 'Canonization', value: 'canonization' },
    ],
    correctAnswer: 'baptism-dead',
    explanation: 'Baptism for the dead is a distinctive Latter-day Saint practice in which living members are baptized by proxy on behalf of deceased individuals, performed in LDS temples [18].',
    citation: '[18] Encyclopaedia Britannica, "Latter-day Saints"',
  },
  {
    id: 't18',
    question: 'In African diaspora religions like Santeria, what is the term for divine beings who serve as intermediaries between God and humanity?',
    options: [
      { label: 'Angels', value: 'angels' },
      { label: 'Orishas', value: 'orishas' },
      { label: 'Saints', value: 'saints' },
      { label: 'Prophets', value: 'prophets' },
    ],
    correctAnswer: 'orishas',
    explanation: 'Orishas are divine beings in Yoruba-derived traditions (Santeria, Candomble) who serve as intermediaries between the supreme deity and humanity, each with distinct personalities and domains [19].',
    citation: '[19] Encyclopaedia Britannica, "orisha"; UNESCO, Ifa Divination System listing',
  },
  {
    id: 't19',
    question: 'What do Jehovah\'s Witnesses call their door-to-door evangelism?',
    options: [
      { label: 'Missionary work', value: 'missionary' },
      { label: 'The preaching work / field ministry', value: 'field' },
      { label: 'Crusading', value: 'crusading' },
      { label: 'Proselytizing', value: 'proselytizing' },
    ],
    correctAnswer: 'field',
    explanation: 'Jehovah\'s Witnesses refer to their evangelism as "the preaching work" or "field ministry," which they consider a primary obligation based on Matthew 24:14 and 28:19-20 [20].',
    citation: '[20] Encyclopaedia Britannica, "Jehovah\'s Witnesses"',
  },
  {
    id: 't20',
    question: 'What is the Hindu practice of circumambulating (walking around) a sacred object or temple called?',
    options: [
      { label: 'Puja', value: 'puja' },
      { label: 'Pradakshina', value: 'pradakshina' },
      { label: 'Darshan', value: 'darshan' },
      { label: 'Aarti', value: 'aarti' },
    ],
    correctAnswer: 'pradakshina',
    explanation: 'Pradakshina is the Hindu practice of walking clockwise around a temple, deity, or sacred object as an act of devotion and respect [21].',
    citation: '[21] Encyclopaedia Britannica, "Hinduism"; Oxford Reference, Hindu ritual entries',
  },
];

export default function TraditionsQuizPage() {
  return (
    <div className="container py-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
          <li><Link href="/quiz" className="hover:text-foreground transition-colors">Quizzes</Link></li>
          <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
          <li className="text-foreground font-medium" aria-current="page">Traditions &amp; Practices Quiz</li>
        </ol>
      </nav>

      <QuizEngine
        title="Traditions & Practices Quiz"
        description="Test your knowledge of religious traditions, festivals, rituals, and practices from around the world."
        questions={TRADITIONS_QUESTIONS}
        type="knowledge"
      />

      <section className="mt-8 rounded-xl border bg-muted/30 p-5" aria-labelledby="traditions-sources-heading">
        <h2 id="traditions-sources-heading" className="text-xl font-semibold mb-3">Sources &amp; Further Reading</h2>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
          <li>
            Encyclopaedia Britannica, &ldquo;Diwali.&rdquo;
            <a href="https://www.britannica.com/topic/Diwali-Hindu-festival" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/Diwali-Hindu-festival
            </a>
          </li>
          <li>
            Oxford Reference, comparative festival and practice entries.
            <a href="https://www.oxfordreference.com/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.oxfordreference.com/
            </a>
          </li>
          <li>
            Encyclopaedia Britannica, &ldquo;Ramadan.&rdquo;
            <a href="https://www.britannica.com/topic/Ramadan" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/Ramadan
            </a>
          </li>
          <li>
            Encyclopaedia Britannica, &ldquo;Sabbath.&rdquo;
            <a href="https://www.britannica.com/topic/Sabbath" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/Sabbath
            </a>
          </li>
          <li>
            Encyclopaedia Britannica, &ldquo;tea ceremony&rdquo; and Zen Buddhism entries.
            <a href="https://www.britannica.com/topic/tea-ceremony" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/tea-ceremony
            </a>
          </li>
          <li>
            Encyclopaedia Britannica, &ldquo;langar&rdquo; and Sikh practice entries.
            <a href="https://www.britannica.com/topic/Sikhism" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/Sikhism
            </a>
          </li>
          <li>
            Rupert Gethin, <em>The Foundations of Buddhism</em> (Oxford University Press).
          </li>
          <li>
            Encyclopaedia Britannica, &ldquo;Holi.&rdquo;
            <a href="https://www.britannica.com/topic/Holi" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/Holi
            </a>
          </li>
          <li>
            Encyclopaedia Britannica, &ldquo;Lent&rdquo; and Christian liturgical calendar entries.
            <a href="https://www.britannica.com/topic/Lent" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/Lent
            </a>
          </li>
          <li>
            Paul Dundas, <em>The Jains</em> (Routledge); Encyclopaedia Britannica, &ldquo;Jainism.&rdquo;
          </li>
          <li>
            Encyclopaedia Britannica, &ldquo;torii.&rdquo;
            <a href="https://www.britannica.com/technology/torii" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/technology/torii
            </a>
          </li>
        </ol>
      </section>
    </div>
  );
}
