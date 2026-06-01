'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { QuizEngine, type QuizQuestion } from '@/components/quiz-engine';

/* SOURCE LOG: /quiz/ethics */
/* Last updated: 2026-02-15 (full content build) */
/* References consulted for fact verification (no text copied):
   - Encyclopaedia Britannica religion and ethics entries
   - Oxford Reference comparative religion resources
   - Academic introductions to religious ethics
*/
/* ALL VISIBLE TEXT IS ORIGINAL. */

const ETHICS_QUESTIONS: QuizQuestion[] = [
  {
    id: 'e1',
    question: 'The Golden Rule ("treat others as you would wish to be treated") appears in which religions?',
    options: [
      { label: 'Only Christianity', value: 'christianity-only' },
      { label: 'Only Abrahamic religions', value: 'abrahamic' },
      { label: 'Virtually all major world religions in some form', value: 'all' },
      { label: 'Only Eastern religions', value: 'eastern' },
    ],
    correctAnswer: 'all',
    explanation: 'Versions of the Golden Rule appear in virtually all major religions, Christianity, Islam, Judaism, Hinduism, Buddhism, Confucianism, Jainism, Sikhism, and others [1].',
    citation: '[1] Encyclopaedia Britannica, "Golden Rule"; Oxford Reference, comparative ethics entries',
  },
  {
    id: 'e2',
    question: 'In Jainism, the principle of ahimsa (non-violence) extends to:',
    options: [
      { label: 'Only humans', value: 'humans' },
      { label: 'Humans and large animals', value: 'large-animals' },
      { label: 'All living beings, including insects and microorganisms', value: 'all-beings' },
      { label: 'Only fellow Jains', value: 'jains' },
    ],
    correctAnswer: 'all-beings',
    explanation: 'Jain ahimsa is the most rigorous form of non-violence in any religion, extending to all living beings including insects and microorganisms. Jain monks may sweep the ground before walking and wear mouth coverings to avoid harming tiny creatures [2].',
    citation: '[2] Paul Dundas, The Jains (Routledge); Encyclopaedia Britannica, "ahimsa"',
  },
  {
    id: 'e3',
    question: 'The Euthyphro dilemma, often cited by secular humanists, asks:',
    options: [
      { label: 'Whether God exists', value: 'exists' },
      { label: 'Whether something is good because God commands it, or God commands it because it is good', value: 'euthyphro' },
      { label: 'Whether humans have free will', value: 'free-will' },
      { label: 'Whether the soul survives death', value: 'soul' },
    ],
    correctAnswer: 'euthyphro',
    explanation: 'The Euthyphro dilemma (from Plato\'s dialogue) asks whether goodness is defined by divine command or exists independently. If the latter, morality can be discovered through reason without God [3].',
    citation: '[3] Plato, Euthyphro; Encyclopaedia Britannica, "Euthyphro"',
  },
  {
    id: 'e4',
    question: 'In Islam, the concept of zakat (one of the Five Pillars) requires:',
    options: [
      { label: 'Daily prayer five times', value: 'prayer' },
      { label: 'Giving a percentage of one\'s wealth to those in need', value: 'zakat' },
      { label: 'Fasting during Ramadan', value: 'fasting' },
      { label: 'Pilgrimage to Mecca', value: 'hajj' },
    ],
    correctAnswer: 'zakat',
    explanation: 'Zakat is obligatory almsgiving in Islam, typically 2.5% of a Muslim\'s accumulated wealth, distributed to the poor and other specified categories of recipients [4].',
    citation: '[4] Encyclopaedia Britannica, "zakat"',
  },
  {
    id: 'e5',
    question: 'The Buddhist concept of "Right Livelihood" (part of the Eightfold Path) teaches that one should:',
    options: [
      { label: 'Earn as much money as possible', value: 'money' },
      { label: 'Avoid occupations that cause harm to others', value: 'right-livelihood' },
      { label: 'Only work in religious occupations', value: 'religious' },
      { label: 'Not work at all', value: 'no-work' },
    ],
    correctAnswer: 'right-livelihood',
    explanation: 'Right Livelihood in Buddhism means earning a living in ways that do not cause harm, traditionally avoiding trades in weapons, living beings, meat, intoxicants, and poisons [5].',
    citation: '[5] Bhikkhu Bodhi, The Noble Eightfold Path (Buddhist Publication Society)',
  },
  {
    id: 'e6',
    question: 'The Wiccan Threefold Law teaches that:',
    options: [
      { label: 'There are three gods to worship', value: 'three-gods' },
      { label: 'Whatever energy you send out returns to you threefold', value: 'threefold' },
      { label: 'You must perform three rituals daily', value: 'three-rituals' },
      { label: 'The world was created in three stages', value: 'three-stages' },
    ],
    correctAnswer: 'threefold',
    explanation: 'The Threefold Law (or Rule of Three) teaches that whatever energy, positive or negative, one sends out through actions or magic returns threefold [6].',
    citation: '[6] Ronald Hutton, The Triumph of the Moon (Oxford University Press)',
  },
  {
    id: 'e7',
    question: 'In Confucian ethics, the concept of "li" (禮) refers to:',
    options: [
      { label: 'Military strategy', value: 'military' },
      { label: 'Ritual propriety, social norms, and proper conduct', value: 'li' },
      { label: 'Economic theory', value: 'economic' },
      { label: 'Scientific inquiry', value: 'science' },
    ],
    correctAnswer: 'li',
    explanation: 'Li encompasses ritual propriety, social norms, etiquette, and proper conduct in all relationships, a cornerstone of Confucian ethics alongside ren (benevolence) [7].',
    citation: '[7] Encyclopaedia Britannica, "li"; Oxford Reference, Confucian ethics entries',
  },
  {
    id: 'e8',
    question: 'The Catholic principle of "just war theory" was developed primarily by which thinkers?',
    options: [
      { label: 'Jesus and the apostles', value: 'jesus' },
      { label: 'Augustine and Thomas Aquinas', value: 'augustine-aquinas' },
      { label: 'Martin Luther and John Calvin', value: 'luther-calvin' },
      { label: 'Pope Francis and Pope Benedict', value: 'modern-popes' },
    ],
    correctAnswer: 'augustine-aquinas',
    explanation: 'Just war theory was developed primarily by Augustine of Hippo (4th-5th century) and Thomas Aquinas (13th century), establishing criteria for when warfare may be morally justified [8].',
    citation: '[8] Encyclopaedia Britannica, "just war"; Catechism of the Catholic Church',
  },
  {
    id: 'e9',
    question: 'In Rastafari, the concept of "livity" refers to:',
    options: [
      { label: 'A type of music', value: 'music' },
      { label: 'Righteous, natural living in accordance with the will of Jah', value: 'livity' },
      { label: 'A political movement', value: 'political' },
      { label: 'A form of meditation', value: 'meditation' },
    ],
    correctAnswer: 'livity',
    explanation: 'Livity is the Rastafari concept of righteous living, encompassing natural diet (ital), spiritual practice, resistance to Babylon, and harmony with nature and Jah [9].',
    citation: '[9] Encyclopaedia Britannica, "Rastafari"',
  },
  {
    id: 'e10',
    question: 'The Hindu concept of dharma is best described as:',
    options: [
      { label: 'A specific god', value: 'god' },
      { label: 'Cosmic order, moral duty, and righteous conduct', value: 'dharma' },
      { label: 'A type of meditation', value: 'meditation' },
      { label: 'The afterlife', value: 'afterlife' },
    ],
    correctAnswer: 'dharma',
    explanation: 'Dharma in Hinduism encompasses cosmic order, moral law, and one\'s duty according to caste, stage of life, and individual circumstances [10].',
    citation: '[10] Gavin Flood, An Introduction to Hinduism (Cambridge University Press)',
  },
  {
    id: 'e11',
    question: 'The Jewish concept of tikkun olam means:',
    options: [
      { label: 'Strict observance of dietary laws', value: 'dietary' },
      { label: 'Repairing or healing the world through acts of justice and kindness', value: 'tikkun' },
      { label: 'Study of the Torah', value: 'torah' },
      { label: 'Observance of the Sabbath', value: 'sabbath' },
    ],
    correctAnswer: 'tikkun',
    explanation: 'Tikkun olam ("repair of the world") is a concept in Judaism that emphasizes social action and the pursuit of justice as a religious obligation [11].',
    citation: '[11] Encyclopaedia Britannica, "tikkun olam"; Oxford Reference, Jewish ethics entries',
  },
  {
    id: 'e12',
    question: 'In African diaspora religions, the Yoruba concept of "iwa pele" refers to:',
    options: [
      { label: 'Spirit possession', value: 'possession' },
      { label: 'Good/gentle character, the highest ethical aspiration', value: 'iwa-pele' },
      { label: 'Animal sacrifice', value: 'sacrifice' },
      { label: 'Divination practice', value: 'divination' },
    ],
    correctAnswer: 'iwa-pele',
    explanation: 'Iwa pele (good/gentle character) is the highest ethical aspiration in Yoruba-derived traditions, encompassing honesty, patience, generosity, and respect [12].',
    citation: '[12] Encyclopaedia Britannica, "Yoruba religion"; UNESCO, Ifa Divination System listing',
  },
  {
    id: 'e13',
    question: 'The Sikh concept of seva refers to:',
    options: [
      { label: 'Meditation', value: 'meditation' },
      { label: 'Selfless service to others', value: 'seva' },
      { label: 'Warrior training', value: 'warrior' },
      { label: 'Scripture reading', value: 'scripture' },
    ],
    correctAnswer: 'seva',
    explanation: 'Seva (selfless service) is a core Sikh value, expressed through community service, volunteering, and the langar (free communal kitchen) tradition [13].',
    citation: '[13] Encyclopaedia Britannica, "Sikhism"; Oxford Reference, Sikh ethics entries',
  },
  {
    id: 'e14',
    question: 'The Humanist Manifesto III (2003) states that ethical values are derived from:',
    options: [
      { label: 'Divine revelation', value: 'divine' },
      { label: 'Human need and interest as tested by experience', value: 'human' },
      { label: 'Ancient scriptures', value: 'scriptures' },
      { label: 'Government legislation', value: 'government' },
    ],
    correctAnswer: 'human',
    explanation: 'The Humanist Manifesto III states: "Ethical values are derived from human need and interest as tested by experience", grounding morality in reason and evidence rather than divine command [14].',
    citation: '[14] American Humanist Association, Humanist Manifesto III (2003)',
  },
  {
    id: 'e15',
    question: 'In Taoism, the concept of wu wei is best translated as:',
    options: [
      { label: 'Aggressive action', value: 'aggressive' },
      { label: 'Non-action or effortless action, acting in harmony with the natural flow', value: 'wu-wei' },
      { label: 'Strict obedience to rules', value: 'obedience' },
      { label: 'Complete withdrawal from society', value: 'withdrawal' },
    ],
    correctAnswer: 'wu-wei',
    explanation: 'Wu wei means acting in accordance with the natural flow of the Tao, not forcing or striving against nature, but responding spontaneously and appropriately [15].',
    citation: '[15] Encyclopaedia Britannica, "wuwei"; Oxford Reference, Taoist philosophy entries',
  },
];

export default function EthicsQuizPage() {
  return (
    <div className="container py-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
          <li><Link href="/quiz" className="hover:text-foreground transition-colors">Quizzes</Link></li>
          <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
          <li className="text-foreground font-medium" aria-current="page">Ethics &amp; Philosophy Quiz</li>
        </ol>
      </nav>

      <QuizEngine
        title="Ethics & Philosophy Quiz"
        description="Explore the moral teachings, ethical principles, and philosophical foundations of world religions."
        questions={ETHICS_QUESTIONS}
        type="knowledge"
      />

      <section className="mt-8 rounded-xl border bg-muted/30 p-5" aria-labelledby="ethics-sources-heading">
        <h2 id="ethics-sources-heading" className="text-xl font-semibold mb-3">Sources &amp; Further Reading</h2>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
          <li>
            Encyclopaedia Britannica, religion and ethics entries.
            <a href="https://www.britannica.com/topic/religion" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/religion
            </a>
          </li>
          <li>
            Oxford Reference, comparative religion and ethics resources.
            <a href="https://www.oxfordreference.com/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.oxfordreference.com/
            </a>
          </li>
          <li>
            American Humanist Association, Humanist Manifesto III.
            <a href="https://americanhumanist.org/what-is-humanism/manifesto3/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://americanhumanist.org/what-is-humanism/manifesto3/
            </a>
          </li>
        </ol>
      </section>
    </div>
  );
}
