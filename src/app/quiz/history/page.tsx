'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { QuizEngine, type QuizQuestion } from '@/components/quiz-engine';

/* SOURCE LOG: /quiz/history */
/* Last updated: 2026-02-15 (full content build) */
/* References consulted for fact verification (no text copied):
   - Encyclopaedia Britannica religion and history entries
   - Oxford Reference comparative religion resources
   - Pew Research Center religion reports
   - Academic introductions to world religions
*/
/* ALL VISIBLE TEXT IS ORIGINAL. */

const HISTORY_QUESTIONS: QuizQuestion[] = [
  {
    id: 'h1',
    question: 'Which event in 1054 CE split Christianity into Roman Catholic and Eastern Orthodox branches?',
    options: [
      { label: 'The Protestant Reformation', value: 'reformation' },
      { label: 'The Great Schism', value: 'schism' },
      { label: 'The Council of Nicaea', value: 'nicaea' },
      { label: 'The Fall of Rome', value: 'rome' },
    ],
    correctAnswer: 'schism',
    explanation: 'The Great Schism of 1054 formally divided Christianity into the Roman Catholic Church in the West and the Eastern Orthodox Church in the East, primarily over papal authority and the Filioque clause [1].',
    citation: '[1] Encyclopaedia Britannica, "Great Schism"',
  },
  {
    id: 'h2',
    question: 'In what year did Martin Luther post his 95 Theses, sparking the Protestant Reformation?',
    options: [
      { label: '1054', value: '1054' },
      { label: '1453', value: '1453' },
      { label: '1517', value: '1517' },
      { label: '1776', value: '1776' },
    ],
    correctAnswer: '1517',
    explanation: 'Martin Luther posted his 95 Theses on the door of the Castle Church in Wittenberg on October 31, 1517, challenging the Catholic practice of selling indulgences [2].',
    citation: '[2] Encyclopaedia Britannica, "Martin Luther" and "Reformation"',
  },
  {
    id: 'h3',
    question: 'The Hijra (migration of Muhammad from Mecca to Medina) marks the beginning of which calendar?',
    options: [
      { label: 'The Gregorian calendar', value: 'gregorian' },
      { label: 'The Jewish calendar', value: 'jewish' },
      { label: 'The Islamic calendar', value: 'islamic' },
      { label: 'The Hindu calendar', value: 'hindu' },
    ],
    correctAnswer: 'islamic',
    explanation: 'The Hijra in 622 CE marks year one of the Islamic (Hijri) calendar. Muhammad\'s migration to Medina established the first organized Muslim community [3].',
    citation: '[3] Encyclopaedia Britannica, "Hijra" and "Islamic calendar"',
  },
  {
    id: 'h4',
    question: 'Guru Nanak, the founder of Sikhism, was born in which century?',
    options: [
      { label: '12th century', value: '12th' },
      { label: '15th century', value: '15th' },
      { label: '17th century', value: '17th' },
      { label: '19th century', value: '19th' },
    ],
    correctAnswer: '15th',
    explanation: 'Guru Nanak was born in 1469 CE in the Punjab region. He founded Sikhism, teaching the oneness of God and the equality of all people [4].',
    citation: '[4] Encyclopaedia Britannica, "Guru Nanak"',
  },
  {
    id: 'h5',
    question: 'The Edict of Milan (313 CE) is significant in Christian history because it:',
    options: [
      { label: 'Established Christianity as the only legal religion', value: 'only' },
      { label: 'Granted religious tolerance, ending persecution of Christians in the Roman Empire', value: 'tolerance' },
      { label: 'Created the first Bible', value: 'bible' },
      { label: 'Founded the papacy', value: 'papacy' },
    ],
    correctAnswer: 'tolerance',
    explanation: 'The Edict of Milan, issued by Emperors Constantine and Licinius, granted religious tolerance throughout the Roman Empire, effectively ending the persecution of Christians [5].',
    citation: '[5] Encyclopaedia Britannica, "Edict of Milan"',
  },
  {
    id: 'h6',
    question: 'The Bab, whose teachings led to the founding of the Baha\'i Faith, declared his mission in which year?',
    options: [
      { label: '1744', value: '1744' },
      { label: '1844', value: '1844' },
      { label: '1900', value: '1900' },
      { label: '1930', value: '1930' },
    ],
    correctAnswer: '1844',
    explanation: 'The Bab declared his mission in 1844 in Shiraz, Persia. His teachings prepared the way for Baha\'u\'llah, the founder of the Baha\'i Faith [6].',
    citation: '[6] Encyclopaedia Britannica, "Bab" and "Baha\'i Faith"',
  },
  {
    id: 'h7',
    question: 'The coronation of Haile Selassie I in 1930 is the founding event of which religious movement?',
    options: [
      { label: 'Nation of Islam', value: 'noi' },
      { label: 'Rastafari', value: 'rastafari' },
      { label: 'Vodou', value: 'vodou' },
      { label: 'Candomble', value: 'candomble' },
    ],
    correctAnswer: 'rastafari',
    explanation: 'When Ras Tafari Makonnen was crowned Emperor Haile Selassie I of Ethiopia in 1930, some Jamaicans interpreted this as fulfillment of biblical prophecy, giving rise to the Rastafari movement [7].',
    citation: '[7] Encyclopaedia Britannica, "Rastafari"',
  },
  {
    id: 'h8',
    question: 'Gerald Gardner published "Witchcraft Today" in 1954, introducing which religion to the public?',
    options: [
      { label: 'Druidry', value: 'druidry' },
      { label: 'Wicca', value: 'wicca' },
      { label: 'Thelema', value: 'thelema' },
      { label: 'Heathenry', value: 'heathenry' },
    ],
    correctAnswer: 'wicca',
    explanation: 'Gerald Gardner is considered the "father of Wicca." His 1954 book introduced modern witchcraft practice to the public after the repeal of Britain\'s Witchcraft Act [8].',
    citation: '[8] Ronald Hutton, The Triumph of the Moon (Oxford University Press)',
  },
  {
    id: 'h9',
    question: 'The destruction of the Second Temple in Jerusalem by the Romans occurred in which year?',
    options: [
      { label: '586 BCE', value: '586bce' },
      { label: '70 CE', value: '70ce' },
      { label: '325 CE', value: '325ce' },
      { label: '1099 CE', value: '1099ce' },
    ],
    correctAnswer: '70ce',
    explanation: 'The Romans destroyed the Second Temple in 70 CE, a catastrophic event that fundamentally reshaped Judaism, leading to the development of Rabbinic Judaism [9].',
    citation: '[9] Encyclopaedia Britannica, "Temple of Jerusalem"',
  },
  {
    id: 'h10',
    question: 'Emperor Ashoka\'s conversion to Buddhism in the 3rd century BCE led to:',
    options: [
      { label: 'The destruction of Buddhist temples', value: 'destruction' },
      { label: 'The spread of Buddhism across Asia through missionaries and edicts', value: 'spread' },
      { label: 'The founding of Hinduism', value: 'hinduism' },
      { label: 'The end of Buddhism in India', value: 'end' },
    ],
    correctAnswer: 'spread',
    explanation: 'Emperor Ashoka\'s conversion led to the widespread promotion of Buddhism through rock edicts, missionary activity, and the construction of stupas across his empire and beyond [10].',
    citation: '[10] Encyclopaedia Britannica, "Ashoka"',
  },
  {
    id: 'h11',
    question: 'The Haitian Revolution (1791-1804) began with a ceremony from which religious tradition?',
    options: [
      { label: 'Catholicism', value: 'catholic' },
      { label: 'Protestantism', value: 'protestant' },
      { label: 'Vodou', value: 'vodou' },
      { label: 'Islam', value: 'islam' },
    ],
    correctAnswer: 'vodou',
    explanation: 'The Haitian Revolution is traditionally said to have begun with a Vodou ceremony at Bois Caiman in 1791, led by the houngan Dutty Boukman [11].',
    citation: '[11] Encyclopaedia Britannica, "Haitian Revolution"',
  },
  {
    id: 'h12',
    question: 'Joseph Smith founded The Church of Jesus Christ of Latter-day Saints in which year?',
    options: [
      { label: '1776', value: '1776' },
      { label: '1830', value: '1830' },
      { label: '1870', value: '1870' },
      { label: '1920', value: '1920' },
    ],
    correctAnswer: '1830',
    explanation: 'Joseph Smith formally organized The Church of Jesus Christ of Latter-day Saints on April 6, 1830, in Fayette, New York [12].',
    citation: '[12] Encyclopaedia Britannica, "Joseph Smith" and "Latter-day Saints"',
  },
  {
    id: 'h13',
    question: 'Confucius lived during which period of Chinese history?',
    options: [
      { label: 'The Shang Dynasty (c. 1600-1046 BCE)', value: 'shang' },
      { label: 'The Spring and Autumn Period (c. 771-476 BCE)', value: 'spring-autumn' },
      { label: 'The Han Dynasty (206 BCE-220 CE)', value: 'han' },
      { label: 'The Tang Dynasty (618-907 CE)', value: 'tang' },
    ],
    correctAnswer: 'spring-autumn',
    explanation: 'Confucius (551-479 BCE) lived during the Spring and Autumn Period, a time of political fragmentation that shaped his emphasis on social harmony and ethical governance [13].',
    citation: '[13] Encyclopaedia Britannica, "Confucius"',
  },
  {
    id: 'h14',
    question: 'The "New Atheism" movement of the 2000s was primarily associated with which group of authors?',
    options: [
      { label: 'Sartre, Camus, and de Beauvoir', value: 'existentialists' },
      { label: 'Dawkins, Harris, Hitchens, and Dennett', value: 'new-atheists' },
      { label: 'Marx, Engels, and Lenin', value: 'marxists' },
      { label: 'Nietzsche, Feuerbach, and Freud', value: 'classical' },
    ],
    correctAnswer: 'new-atheists',
    explanation: 'The "New Atheism" movement was associated with Richard Dawkins, Sam Harris, Christopher Hitchens, and Daniel Dennett, whose bestselling books brought atheism into mainstream discourse [14].',
    citation: '[14] Encyclopaedia Britannica, "New Atheism"',
  },
  {
    id: 'h15',
    question: 'Zoroastrianism is believed to have originated approximately when?',
    options: [
      { label: '3000-2500 BCE', value: '3000' },
      { label: '1500-500 BCE', value: '1500' },
      { label: '500-100 BCE', value: '500' },
      { label: '1st century CE', value: '1st' },
    ],
    correctAnswer: '1500',
    explanation: 'Zoroastrianism is one of the world\'s oldest monotheistic religions, with the prophet Zoroaster (Zarathustra) traditionally dated to approximately 1500-500 BCE, though scholars debate the exact period [15].',
    citation: '[15] Encyclopaedia Britannica, "Zoroastrianism" and "Zoroaster"',
  },
];

export default function HistoryQuizPage() {
  return (
    <div className="container py-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
          <li><Link href="/quiz" className="hover:text-foreground transition-colors">Quizzes</Link></li>
          <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
          <li className="text-foreground font-medium" aria-current="page">History &amp; Origins Quiz</li>
        </ol>
      </nav>

      <QuizEngine
        title="History & Origins Quiz"
        description="Test your knowledge of the key events, founders, and turning points in the history of world religions."
        questions={HISTORY_QUESTIONS}
        type="knowledge"
      />

      <section className="mt-8 rounded-xl border bg-muted/30 p-5" aria-labelledby="history-sources-heading">
        <h2 id="history-sources-heading" className="text-xl font-semibold mb-3">Sources &amp; Further Reading</h2>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
          <li>
            Encyclopaedia Britannica, religion and history entries.
            <a href="https://www.britannica.com/topic/religion" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/religion
            </a>
          </li>
          <li>
            Oxford Reference, comparative religion and historical resources.
            <a href="https://www.oxfordreference.com/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.oxfordreference.com/
            </a>
          </li>
          <li>
            Pew Research Center, religion reports and datasets.
            <a href="https://www.pewresearch.org/religion/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.pewresearch.org/religion/
            </a>
          </li>
        </ol>
      </section>
    </div>
  );
}
