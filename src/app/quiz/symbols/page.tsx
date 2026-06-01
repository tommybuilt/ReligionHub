'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { QuizEngine, type QuizQuestion } from '@/components/quiz-engine';

/* SOURCE LOG: /quiz/symbols */
/* Last updated: 2026-02-15 (attribution pass) */
/* References consulted for fact verification (no text copied):
   - Encyclopaedia Britannica religion and symbol entries
   - Oxford Reference comparative religion resources
   - Pew Research Center religion reports
   - Academic introductions to world religions (Cambridge/Routledge)
*/
/* ALL VISIBLE TEXT IS ORIGINAL. */

const SYMBOLS_QUESTIONS: QuizQuestion[] = [
  {
    id: 's1',
    question: 'Which religion is most commonly associated with the crescent moon and star symbol?',
    options: [
      { label: 'Hinduism', value: 'hinduism' },
      { label: 'Islam', value: 'islam' },
      { label: 'Sikhism', value: 'sikhism' },
      { label: 'Zoroastrianism', value: 'zoroastrianism' },
    ],
    correctAnswer: 'islam',
    explanation: 'The crescent moon and star became widely associated with Islam through the Ottoman Empire, though it is not a religious symbol prescribed in Islamic scripture [1].',
    citation: '[1] Encyclopaedia Britannica, "crescent" and Islamic symbolism entries',
  },
  {
    id: 's2',
    question: 'What does the Om (ॐ) symbol represent in Hinduism?',
    options: [
      { label: 'The god Shiva specifically', value: 'shiva' },
      { label: 'The sacred syllable representing ultimate reality (Brahman)', value: 'brahman' },
      { label: 'The cycle of reincarnation', value: 'reincarnation' },
      { label: 'The Ganges River', value: 'ganges' },
    ],
    correctAnswer: 'brahman',
    explanation: 'Om is considered the primordial sound and a representation of Brahman (ultimate reality) in Hindu philosophy. It appears in the Mandukya Upanishad and other foundational texts [2].',
    citation: '[2] Encyclopaedia Britannica, "Om"; Gavin Flood, An Introduction to Hinduism (Cambridge)',
  },
  {
    id: 's3',
    question: 'The Dharma Wheel (dharmachakra) with eight spokes is a symbol of which religion?',
    options: [
      { label: 'Jainism', value: 'jainism' },
      { label: 'Buddhism', value: 'buddhism' },
      { label: 'Sikhism', value: 'sikhism' },
      { label: 'Taoism', value: 'taoism' },
    ],
    correctAnswer: 'buddhism',
    explanation: 'The eight-spoked Dharma Wheel represents the Noble Eightfold Path in Buddhism. It is one of the oldest Buddhist symbols, appearing in art from the 3rd century BCE [3].',
    citation: '[3] Encyclopaedia Britannica, "dharmachakra"; Oxford Reference, Buddhist symbol entries',
  },
  {
    id: 's4',
    question: 'What does the yin-yang symbol represent in Taoism?',
    options: [
      { label: 'Good versus evil', value: 'good-evil' },
      { label: 'The complementary and interdependent nature of opposing forces', value: 'complementary' },
      { label: 'The sun and moon', value: 'sun-moon' },
      { label: 'Male and female deities', value: 'deities' },
    ],
    correctAnswer: 'complementary',
    explanation: 'The yin-yang (taijitu) represents the Taoist concept that seemingly opposite forces are interconnected and interdependent in the natural world [4].',
    citation: '[4] Encyclopaedia Britannica, "yinyang"; Oxford Reference, Taoist philosophy entries',
  },
  {
    id: 's5',
    question: 'The Khanda is the symbol of which religion?',
    options: [
      { label: 'Islam', value: 'islam' },
      { label: 'Hinduism', value: 'hinduism' },
      { label: 'Sikhism', value: 'sikhism' },
      { label: 'Jainism', value: 'jainism' },
    ],
    correctAnswer: 'sikhism',
    explanation: 'The Khanda consists of a double-edged sword, a chakkar (circle), and two kirpans (curved swords), symbolizing divine knowledge, unity, and spiritual-temporal authority in Sikhism [5].',
    citation: '[5] Encyclopaedia Britannica, "Khanda" and Sikh symbol entries',
  },
  {
    id: 's6',
    question: 'What is the Star of David (Magen David) primarily associated with?',
    options: [
      { label: 'Christianity', value: 'christianity' },
      { label: 'Islam', value: 'islam' },
      { label: 'Judaism', value: 'judaism' },
      { label: 'Zoroastrianism', value: 'zoroastrianism' },
    ],
    correctAnswer: 'judaism',
    explanation: 'The six-pointed Star of David became a widely recognized symbol of Judaism and Jewish identity, particularly from the 17th century onward, and appears on the flag of Israel [6].',
    citation: '[6] Encyclopaedia Britannica, "Star of David"',
  },
  {
    id: 's7',
    question: 'The Ahimsa Hand with a wheel on the palm is a symbol of which religion?',
    options: [
      { label: 'Buddhism', value: 'buddhism' },
      { label: 'Hinduism', value: 'hinduism' },
      { label: 'Jainism', value: 'jainism' },
      { label: 'Sikhism', value: 'sikhism' },
    ],
    correctAnswer: 'jainism',
    explanation: 'The Jain hand symbol with a wheel on the palm and the word "ahimsa" represents the central Jain commitment to non-violence toward all living beings [7].',
    citation: '[7] Paul Dundas, The Jains (Routledge); Encyclopaedia Britannica, "Jainism"',
  },
  {
    id: 's8',
    question: 'What does the cross primarily symbolize in Christianity?',
    options: [
      { label: 'The creation of the world', value: 'creation' },
      { label: 'The crucifixion and resurrection of Jesus Christ', value: 'crucifixion' },
      { label: 'The Ten Commandments', value: 'commandments' },
      { label: 'The Holy Trinity', value: 'trinity' },
    ],
    correctAnswer: 'crucifixion',
    explanation: 'The cross is the central symbol of Christianity, representing the crucifixion of Jesus and, in Christian theology, his subsequent resurrection and the promise of salvation [8].',
    citation: '[8] Encyclopaedia Britannica, "cross"; Oxford Reference, Christian symbol entries',
  },
  {
    id: 's9',
    question: 'The nine-pointed star is a symbol of which faith?',
    options: [
      { label: 'Judaism', value: 'judaism' },
      { label: "Baha'i Faith", value: 'bahai' },
      { label: 'Zoroastrianism', value: 'zoroastrianism' },
      { label: 'Shinto', value: 'shinto' },
    ],
    correctAnswer: 'bahai',
    explanation: "The nine-pointed star is the most commonly used symbol of the Baha'i Faith. The number nine, the highest single digit, symbolizes completeness and the unity of all religions in Baha'i teaching [9].",
    citation: "[9] Encyclopaedia Britannica, \"Baha'i Faith\"; Oxford Reference, Baha'i symbol entries",
  },
  {
    id: 's10',
    question: 'The Faravahar (winged figure) is the primary symbol of which ancient religion?',
    options: [
      { label: 'Ancient Egyptian religion', value: 'egyptian' },
      { label: 'Zoroastrianism', value: 'zoroastrianism' },
      { label: 'Hinduism', value: 'hinduism' },
      { label: 'Mesopotamian religion', value: 'mesopotamian' },
    ],
    correctAnswer: 'zoroastrianism',
    explanation: 'The Faravahar is the best-known symbol of Zoroastrianism, representing the human soul and its journey toward righteousness. It derives from ancient Persian iconography [10].',
    citation: '[10] Encyclopaedia Britannica, "Faravahar"; Oxford Reference, Zoroastrian symbol entries',
  },
  {
    id: 's11',
    question: 'What does the pentacle (five-pointed star in a circle) represent in Wicca?',
    options: [
      { label: 'The five senses', value: 'senses' },
      { label: 'Earth, air, fire, water, and spirit', value: 'elements' },
      { label: 'The five books of Moses', value: 'moses' },
      { label: 'The five pillars of faith', value: 'pillars' },
    ],
    correctAnswer: 'elements',
    explanation: 'In Wicca, the five points of the pentacle represent the four classical elements (earth, air, fire, water) plus spirit, enclosed in a circle of unity [11].',
    citation: '[11] Ronald Hutton, The Triumph of the Moon (Oxford University Press)',
  },
  {
    id: 's12',
    question: 'The Lion of Judah is a central symbol in which religious movement?',
    options: [
      { label: 'Judaism', value: 'judaism' },
      { label: 'Rastafari', value: 'rastafari' },
      { label: 'Christianity', value: 'christianity' },
      { label: 'Islam', value: 'islam' },
    ],
    correctAnswer: 'rastafari',
    explanation: 'The Lion of Judah is the most important Rastafari symbol, representing Haile Selassie I, whose title included "Conquering Lion of the Tribe of Judah" [12].',
    citation: '[12] Encyclopaedia Britannica, "Rastafari"',
  },
  {
    id: 's13',
    question: 'What does the Orthodox Christian cross with three horizontal bars represent?',
    options: [
      { label: 'The Holy Trinity', value: 'trinity' },
      { label: 'The inscription, crossbar, and footrest of the crucifixion', value: 'crucifixion' },
      { label: 'Three levels of heaven', value: 'heaven' },
      { label: 'Three sacraments', value: 'sacraments' },
    ],
    correctAnswer: 'crucifixion',
    explanation: 'The Orthodox cross has three bars: the top bar represents the inscription placed by Pilate, the middle bar is where Christ\'s hands were nailed, and the slanted bottom bar represents the footrest [13].',
    citation: '[13] Encyclopaedia Britannica, "cross"; Oxford Reference, Orthodox Christian symbol entries',
  },
  {
    id: 's14',
    question: 'The "Happy Human" is the official symbol of which worldview organization?',
    options: [
      { label: 'Unitarianism', value: 'unitarian' },
      { label: 'Humanists International', value: 'humanist' },
      { label: 'Quakers', value: 'quakers' },
      { label: 'Universalism', value: 'universalism' },
    ],
    correctAnswer: 'humanist',
    explanation: 'The Happy Human, depicting a stylized human figure with arms raised, has been the official symbol of Humanists International (formerly IHEU) since 1965 [14].',
    citation: '[14] Humanists International official resources',
  },
  {
    id: 's15',
    question: 'What does the lotus flower symbolize in Buddhism?',
    options: [
      { label: 'Wealth and prosperity', value: 'wealth' },
      { label: 'Purity rising from muddy waters, spiritual awakening', value: 'purity' },
      { label: 'The cycle of seasons', value: 'seasons' },
      { label: 'Military victory', value: 'victory' },
    ],
    correctAnswer: 'purity',
    explanation: 'The lotus flower, which grows from muddy water to bloom above the surface, symbolizes spiritual purity, enlightenment, and the potential for awakening in Buddhist art and teaching [15].',
    citation: '[15] Encyclopaedia Britannica, "lotus"; Oxford Reference, Buddhist symbol entries',
  },
  {
    id: 's16',
    question: 'Thor\'s Hammer (Mjolnir) is the primary symbol of which modern religious movement?',
    options: [
      { label: 'Wicca', value: 'wicca' },
      { label: 'Heathenry / Asatru', value: 'heathenry' },
      { label: 'Druidry', value: 'druidry' },
      { label: 'Satanism', value: 'satanism' },
    ],
    correctAnswer: 'heathenry',
    explanation: 'Mjolnir (Thor\'s Hammer) is the primary symbol of Heathenry/Asatru, the modern reconstruction of Norse and Germanic pre-Christian religion [16].',
    citation: '[16] Encyclopaedia Britannica, "Asatru"; Oxford Reference, Norse religion entries',
  },
  {
    id: 's17',
    question: 'The ichthys (fish symbol) is an ancient symbol of which religion?',
    options: [
      { label: 'Hinduism', value: 'hinduism' },
      { label: 'Christianity', value: 'christianity' },
      { label: 'Buddhism', value: 'buddhism' },
      { label: 'Shinto', value: 'shinto' },
    ],
    correctAnswer: 'christianity',
    explanation: 'The ichthys (fish) was used as a secret symbol by early Christians. The Greek word ΙΧΘΥΣ (ichthys) is an acronym for "Jesus Christ, God\'s Son, Savior" [17].',
    citation: '[17] Encyclopaedia Britannica, "ichthys"; Oxford Reference, early Christian symbol entries',
  },
  {
    id: 's18',
    question: 'Veves (intricate geometric designs drawn on the ground) are ritual symbols in which tradition?',
    options: [
      { label: 'Hinduism', value: 'hinduism' },
      { label: 'Haitian Vodou', value: 'vodou' },
      { label: 'Shinto', value: 'shinto' },
      { label: 'Zoroastrianism', value: 'zoroastrianism' },
    ],
    correctAnswer: 'vodou',
    explanation: 'Veves are intricate geometric designs drawn in cornmeal or other powders to invoke specific lwa (divine beings) in Haitian Vodou ceremonies [18].',
    citation: '[18] Encyclopaedia Britannica, "Vodou"; Maya Deren, Divine Horsemen',
  },
  {
    id: 's19',
    question: 'The menorah (seven-branched candelabrum) is one of the oldest symbols of which religion?',
    options: [
      { label: 'Christianity', value: 'christianity' },
      { label: 'Judaism', value: 'judaism' },
      { label: 'Islam', value: 'islam' },
      { label: 'Zoroastrianism', value: 'zoroastrianism' },
    ],
    correctAnswer: 'judaism',
    explanation: 'The menorah is one of the oldest symbols of Judaism, described in the Book of Exodus as standing in the Tabernacle and later in the Temple in Jerusalem [19].',
    citation: '[19] Encyclopaedia Britannica, "menorah"',
  },
  {
    id: 's20',
    question: 'The Awen (three rays of light) is the primary symbol of which tradition?',
    options: [
      { label: 'Modern Druidry', value: 'druidry' },
      { label: 'Wicca', value: 'wicca' },
      { label: 'Heathenry', value: 'heathenry' },
      { label: 'Kemeticism', value: 'kemeticism' },
    ],
    correctAnswer: 'druidry',
    explanation: 'The Awen, consisting of three rays of light, is the primary symbol of modern Druidry, representing poetic inspiration and divine illumination [20].',
    citation: '[20] Philip Carr-Gomm, Druid Mysteries (Rider); Oxford Reference, Druid symbol entries',
  },
];

export default function SymbolsQuizPage() {
  return (
    <div className="container py-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
          <li><Link href="/quiz" className="hover:text-foreground transition-colors">Quizzes</Link></li>
          <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
          <li className="text-foreground font-medium" aria-current="page">Symbols &amp; Icons Quiz</li>
        </ol>
      </nav>

      <QuizEngine
        title="Religious Symbols & Icons Quiz"
        description="How well do you know the symbols of the world's religions? Test your knowledge of sacred icons, emblems, and visual traditions."
        questions={SYMBOLS_QUESTIONS}
        type="knowledge"
      />

      <section className="mt-8 rounded-xl border bg-muted/30 p-5" aria-labelledby="symbols-sources-heading">
        <h2 id="symbols-sources-heading" className="text-xl font-semibold mb-3">Sources &amp; Further Reading</h2>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
          <li>
            Encyclopaedia Britannica, &ldquo;crescent&rdquo; and Islamic symbolism entries.
            <a href="https://www.britannica.com/topic/Islam" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/Islam
            </a>
          </li>
          <li>
            Encyclopaedia Britannica, &ldquo;Om&rdquo;; Gavin Flood, <em>An Introduction to Hinduism</em> (Cambridge University Press).
            <a href="https://www.britannica.com/topic/Om-Indian-religion" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/Om-Indian-religion
            </a>
          </li>
          <li>
            Encyclopaedia Britannica, &ldquo;dharmachakra&rdquo;; Oxford Reference, Buddhist symbol entries.
          </li>
          <li>
            Encyclopaedia Britannica, &ldquo;yinyang&rdquo;; Oxford Reference, Taoist philosophy entries.
            <a href="https://www.britannica.com/topic/yinyang" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/yinyang
            </a>
          </li>
          <li>
            Encyclopaedia Britannica, &ldquo;Khanda&rdquo; and Sikh symbol entries.
            <a href="https://www.britannica.com/topic/Sikhism" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/Sikhism
            </a>
          </li>
          <li>
            Encyclopaedia Britannica, &ldquo;Star of David.&rdquo;
            <a href="https://www.britannica.com/topic/Star-of-David" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/Star-of-David
            </a>
          </li>
          <li>
            Paul Dundas, <em>The Jains</em> (Routledge); Encyclopaedia Britannica, &ldquo;Jainism.&rdquo;
          </li>
          <li>
            Encyclopaedia Britannica, &ldquo;cross&rdquo;; Oxford Reference, Christian symbol entries.
            <a href="https://www.britannica.com/topic/cross-religious-symbol" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/cross-religious-symbol
            </a>
          </li>
          <li>
            Encyclopaedia Britannica, &ldquo;Baha&apos;i Faith&rdquo;; Oxford Reference, Baha&apos;i symbol entries.
            <a href="https://www.britannica.com/topic/Bahai-Faith" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/Bahai-Faith
            </a>
          </li>
          <li>
            Encyclopaedia Britannica, &ldquo;Faravahar&rdquo;; Oxford Reference, Zoroastrian symbol entries.
          </li>
        </ol>
      </section>
    </div>
  );
}
