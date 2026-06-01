'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { QuizEngine, type QuizQuestion } from '@/components/quiz-engine';

/* SOURCE LOG: /quiz/demographics */
/* Last updated: 2026-02-15 (full content build) */
/* References consulted for fact verification (no text copied):
   - Pew Research Center religion reports and datasets
   - CIA World Factbook demographic data
   - World Religion Database estimates
   - Encyclopaedia Britannica religion entries
*/
/* ALL VISIBLE TEXT IS ORIGINAL. */

const DEMOGRAPHICS_QUESTIONS: QuizQuestion[] = [
  {
    id: 'd1',
    question: 'Which is the largest religion in the world by number of adherents?',
    options: [
      { label: 'Islam', value: 'islam' },
      { label: 'Hinduism', value: 'hinduism' },
      { label: 'Christianity', value: 'christianity' },
      { label: 'Buddhism', value: 'buddhism' },
    ],
    correctAnswer: 'christianity',
    explanation: 'Christianity is the world\'s largest religion with approximately 2.4 billion adherents (about 31% of the global population) [1].',
    citation: '[1] Pew Research Center, "The Global Religious Landscape"',
  },
  {
    id: 'd2',
    question: 'Which religion is projected to grow the fastest in the 21st century?',
    options: [
      { label: 'Christianity', value: 'christianity' },
      { label: 'Islam', value: 'islam' },
      { label: 'Hinduism', value: 'hinduism' },
      { label: 'Buddhism', value: 'buddhism' },
    ],
    correctAnswer: 'islam',
    explanation: 'Islam is projected to be the fastest-growing major religion, primarily due to higher birth rates in Muslim-majority countries. Pew projects near parity with Christianity by 2060 [2].',
    citation: '[2] Pew Research Center, "The Future of World Religions: Population Growth Projections, 2010-2050"',
  },
  {
    id: 'd3',
    question: 'Approximately what percentage of the world\'s population is religiously unaffiliated ("nones")?',
    options: [
      { label: '5%', value: '5' },
      { label: '16%', value: '16' },
      { label: '30%', value: '30' },
      { label: '45%', value: '45' },
    ],
    correctAnswer: '16',
    explanation: 'The religiously unaffiliated constitute approximately 16% of the global population (about 1.2 billion people), making them the third-largest category [3].',
    citation: '[3] Pew Research Center, "The Global Religious Landscape"',
  },
  {
    id: 'd4',
    question: 'Which country has the largest Muslim population in the world?',
    options: [
      { label: 'Saudi Arabia', value: 'saudi' },
      { label: 'Pakistan', value: 'pakistan' },
      { label: 'Indonesia', value: 'indonesia' },
      { label: 'Egypt', value: 'egypt' },
    ],
    correctAnswer: 'indonesia',
    explanation: 'Indonesia has the world\'s largest Muslim population, with approximately 230 million Muslims (about 87% of its population) [4].',
    citation: '[4] Pew Research Center, Muslim population data; CIA World Factbook, Indonesia',
  },
  {
    id: 'd5',
    question: 'Approximately how many Sikhs are there worldwide?',
    options: [
      { label: '5 million', value: '5m' },
      { label: '25-30 million', value: '25m' },
      { label: '100 million', value: '100m' },
      { label: '500 million', value: '500m' },
    ],
    correctAnswer: '25m',
    explanation: 'There are approximately 25-30 million Sikhs worldwide, with the vast majority (about 75%) living in the Indian state of Punjab [5].',
    citation: '[5] Pew Research Center, Sikh population data',
  },
  {
    id: 'd6',
    question: 'In which region of the world is Christianity growing fastest?',
    options: [
      { label: 'Europe', value: 'europe' },
      { label: 'North America', value: 'north-america' },
      { label: 'Sub-Saharan Africa', value: 'africa' },
      { label: 'East Asia', value: 'east-asia' },
    ],
    correctAnswer: 'africa',
    explanation: 'Sub-Saharan Africa is the fastest-growing region for Christianity. The continent\'s Christian population has grown from about 9 million in 1900 to over 600 million today [6].',
    citation: '[6] Pew Research Center, "Global Christianity" report',
  },
  {
    id: 'd7',
    question: 'Which European country has the highest percentage of non-religious people?',
    options: [
      { label: 'Italy', value: 'italy' },
      { label: 'Czech Republic', value: 'czech' },
      { label: 'Poland', value: 'poland' },
      { label: 'Greece', value: 'greece' },
    ],
    correctAnswer: 'czech',
    explanation: 'The Czech Republic (Czechia) consistently ranks as one of the least religious countries in Europe, with surveys showing 70-80% of the population identifying as non-religious [7].',
    citation: '[7] Pew Research Center, "Being Christian in Western Europe"; Eurobarometer surveys',
  },
  {
    id: 'd8',
    question: 'How many Jews are there worldwide?',
    options: [
      { label: 'About 5 million', value: '5m' },
      { label: 'About 15 million', value: '15m' },
      { label: 'About 50 million', value: '50m' },
      { label: 'About 100 million', value: '100m' },
    ],
    correctAnswer: '15m',
    explanation: 'The global Jewish population is approximately 15 million, with the largest communities in Israel (about 7 million) and the United States (about 6 million) [8].',
    citation: '[8] Pew Research Center, Jewish population data',
  },
  {
    id: 'd9',
    question: 'What percentage of India\'s population is Hindu?',
    options: [
      { label: 'About 50%', value: '50' },
      { label: 'About 65%', value: '65' },
      { label: 'About 80%', value: '80' },
      { label: 'About 95%', value: '95' },
    ],
    correctAnswer: '80',
    explanation: 'Approximately 80% of India\'s population (over 1 billion people) identifies as Hindu, making India home to the vast majority of the world\'s Hindus [9].',
    citation: '[9] Pew Research Center, "Religion in India" (2021); CIA World Factbook, India',
  },
  {
    id: 'd10',
    question: 'The "nones" (religiously unaffiliated) in the United States have grown from about 6% in 1991 to approximately what percentage today?',
    options: [
      { label: '10%', value: '10' },
      { label: '18%', value: '18' },
      { label: '28-30%', value: '28' },
      { label: '50%', value: '50' },
    ],
    correctAnswer: '28',
    explanation: 'The religiously unaffiliated in the U.S. have grown from about 6% in 1991 to approximately 28-30% in recent surveys, with younger generations significantly more likely to be unaffiliated [10].',
    citation: '[10] Pew Research Center, "In U.S., Decline of Christianity Continues at Rapid Pace"',
  },
  {
    id: 'd11',
    question: 'Approximately how many Buddhists are there worldwide?',
    options: [
      { label: '100 million', value: '100m' },
      { label: '500 million', value: '500m' },
      { label: '1 billion', value: '1b' },
      { label: '2 billion', value: '2b' },
    ],
    correctAnswer: '500m',
    explanation: 'There are approximately 500 million Buddhists worldwide (about 7% of the global population), concentrated primarily in East and Southeast Asia [11].',
    citation: '[11] Pew Research Center, "The Global Religious Landscape"',
  },
  {
    id: 'd12',
    question: 'Which country has the largest number of Catholics?',
    options: [
      { label: 'Italy', value: 'italy' },
      { label: 'Philippines', value: 'philippines' },
      { label: 'Brazil', value: 'brazil' },
      { label: 'Mexico', value: 'mexico' },
    ],
    correctAnswer: 'brazil',
    explanation: 'Brazil has the world\'s largest Catholic population, with approximately 123 million Catholics, though the percentage has been declining as Protestantism grows [12].',
    citation: '[12] Pew Research Center, "Religion in Latin America"',
  },
  {
    id: 'd13',
    question: 'How many active Jehovah\'s Witnesses are there worldwide?',
    options: [
      { label: 'About 1 million', value: '1m' },
      { label: 'About 8.7 million', value: '8m' },
      { label: 'About 50 million', value: '50m' },
      { label: 'About 100 million', value: '100m' },
    ],
    correctAnswer: '8m',
    explanation: 'There are approximately 8.7 million active Jehovah\'s Witnesses worldwide, present in virtually every country and territory [13].',
    citation: '[13] Encyclopaedia Britannica, "Jehovah\'s Witnesses"; Watchtower Society annual reports',
  },
  {
    id: 'd14',
    question: 'In how many countries can apostasy (leaving Islam) carry the death penalty?',
    options: [
      { label: '0', value: '0' },
      { label: '5-6', value: '5' },
      { label: '12-13', value: '12' },
      { label: '30+', value: '30' },
    ],
    correctAnswer: '12',
    explanation: 'Approximately 12-13 countries have laws that make apostasy or blasphemy punishable by death, though enforcement varies significantly [14].',
    citation: '[14] Pew Research Center, "Laws Penalizing Blasphemy, Apostasy and Defamation of Religion"',
  },
  {
    id: 'd15',
    question: 'What is the estimated number of Zoroastrians worldwide?',
    options: [
      { label: '10,000-20,000', value: '10k' },
      { label: '100,000-200,000', value: '100k' },
      { label: '1-2 million', value: '1m' },
      { label: '10 million', value: '10m' },
    ],
    correctAnswer: '100k',
    explanation: 'There are approximately 100,000-200,000 Zoroastrians worldwide, with the largest communities in India (Parsis) and Iran [15].',
    citation: '[15] Pew Research Center; Encyclopaedia Britannica, "Zoroastrianism"',
  },
];

export default function DemographicsQuizPage() {
  return (
    <div className="container py-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
          <li><Link href="/quiz" className="hover:text-foreground transition-colors">Quizzes</Link></li>
          <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
          <li className="text-foreground font-medium" aria-current="page">Demographics Quiz</li>
        </ol>
      </nav>

      <QuizEngine
        title="Religion Demographics Quiz"
        description="How well do you know the numbers behind world religions? Test your knowledge of populations, growth trends, and geographic distribution."
        questions={DEMOGRAPHICS_QUESTIONS}
        type="knowledge"
      />

      <section className="mt-8 rounded-xl border bg-muted/30 p-5" aria-labelledby="demo-sources-heading">
        <h2 id="demo-sources-heading" className="text-xl font-semibold mb-3">Sources &amp; Further Reading</h2>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
          <li>
            Pew Research Center, religion reports and datasets.
            <a href="https://www.pewresearch.org/religion/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.pewresearch.org/religion/
            </a>
          </li>
          <li>
            CIA World Factbook, country-level demographic data.
            <a href="https://www.cia.gov/the-world-factbook/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.cia.gov/the-world-factbook/
            </a>
          </li>
          <li>
            World Religion Database, global religion estimates.
            <a href="https://www.worldreligiondatabase.org/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.worldreligiondatabase.org/
            </a>
          </li>
        </ol>
      </section>
    </div>
  );
}
