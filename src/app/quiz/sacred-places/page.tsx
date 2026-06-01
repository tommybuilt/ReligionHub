'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { QuizEngine, type QuizQuestion } from '@/components/quiz-engine';

/* SOURCE LOG: /quiz/sacred-places */
/* Last updated: 2026-02-15 (full content build) */
/* References consulted for fact verification (no text copied):
   - UNESCO World Heritage Centre site listings
   - Encyclopaedia Britannica sacred-site entries
   - Oxford Reference comparative religion resources
*/
/* ALL VISIBLE TEXT IS ORIGINAL. */

const SACRED_PLACES_QUESTIONS: QuizQuestion[] = [
  {
    id: 'sp1',
    question: 'Which city is considered holy by Judaism, Christianity, and Islam?',
    options: [
      { label: 'Mecca', value: 'mecca' },
      { label: 'Jerusalem', value: 'jerusalem' },
      { label: 'Rome', value: 'rome' },
      { label: 'Varanasi', value: 'varanasi' },
    ],
    correctAnswer: 'jerusalem',
    explanation: 'Jerusalem is sacred to all three Abrahamic faiths, home to the Western Wall (Judaism), the Church of the Holy Sepulchre (Christianity), and the Al-Aqsa Mosque (Islam) [1].',
    citation: '[1] Encyclopaedia Britannica, "Jerusalem"',
  },
  {
    id: 'sp2',
    question: 'What is the name of the cube-shaped structure in Mecca toward which Muslims pray?',
    options: [
      { label: 'The Dome of the Rock', value: 'dome' },
      { label: 'The Kaaba', value: 'kaaba' },
      { label: 'The Masjid al-Nabawi', value: 'nabawi' },
      { label: 'The Black Stone', value: 'stone' },
    ],
    correctAnswer: 'kaaba',
    explanation: 'The Kaaba is the cube-shaped structure at the center of the Masjid al-Haram in Mecca. Muslims worldwide face the Kaaba during their five daily prayers [2].',
    citation: '[2] Encyclopaedia Britannica, "Kaaba"',
  },
  {
    id: 'sp3',
    question: 'Bodh Gaya is the most important pilgrimage site in Buddhism because it is where:',
    options: [
      { label: 'The Buddha was born', value: 'born' },
      { label: 'The Buddha attained enlightenment', value: 'enlightenment' },
      { label: 'The Buddha died', value: 'died' },
      { label: 'The Buddha gave his first sermon', value: 'sermon' },
    ],
    correctAnswer: 'enlightenment',
    explanation: 'Bodh Gaya marks the location where Siddhartha Gautama sat under the Bodhi Tree and attained enlightenment, becoming the Buddha [3].',
    citation: '[3] Encyclopaedia Britannica, "Bodh Gaya"; UNESCO World Heritage listing',
  },
  {
    id: 'sp4',
    question: 'The Golden Temple (Harmandir Sahib) in Amritsar is the holiest site of which religion?',
    options: [
      { label: 'Hinduism', value: 'hinduism' },
      { label: 'Buddhism', value: 'buddhism' },
      { label: 'Sikhism', value: 'sikhism' },
      { label: 'Jainism', value: 'jainism' },
    ],
    correctAnswer: 'sikhism',
    explanation: 'The Harmandir Sahib (Golden Temple) in Amritsar is the holiest gurdwara in Sikhism, known for its community kitchen (langar) that serves free meals to all visitors [4].',
    citation: '[4] Encyclopaedia Britannica, "Golden Temple"',
  },
  {
    id: 'sp5',
    question: 'How often is the Ise Grand Shrine in Japan ceremonially rebuilt?',
    options: [
      { label: 'Every 10 years', value: '10' },
      { label: 'Every 20 years', value: '20' },
      { label: 'Every 50 years', value: '50' },
      { label: 'Every 100 years', value: '100' },
    ],
    correctAnswer: '20',
    explanation: 'The Ise Grand Shrine is rebuilt every 20 years in a ceremony called Shikinen Sengu, a practice documented for over 1,300 years [5].',
    citation: '[5] Encyclopaedia Britannica, "Ise Shrine"',
  },
  {
    id: 'sp6',
    question: 'Angkor Wat in Cambodia was originally built as a temple dedicated to which Hindu deity?',
    options: [
      { label: 'Shiva', value: 'shiva' },
      { label: 'Brahma', value: 'brahma' },
      { label: 'Vishnu', value: 'vishnu' },
      { label: 'Ganesh', value: 'ganesh' },
    ],
    correctAnswer: 'vishnu',
    explanation: 'Angkor Wat was built by King Suryavarman II in the early 12th century as a Hindu temple dedicated to Vishnu, later converted to Buddhist use [6].',
    citation: '[6] Encyclopaedia Britannica, "Angkor Wat"; UNESCO World Heritage listing',
  },
  {
    id: 'sp7',
    question: 'Mount Athos in Greece is famous for being:',
    options: [
      { label: 'The site of the ancient Olympic Games', value: 'olympics' },
      { label: 'A self-governing monastic community with over 1,000 years of continuous Orthodox Christian monastic life', value: 'monastic' },
      { label: 'The birthplace of democracy', value: 'democracy' },
      { label: 'A major Islamic pilgrimage site', value: 'islamic' },
    ],
    correctAnswer: 'monastic',
    explanation: 'Mount Athos is a self-governing monastic republic with 20 Eastern Orthodox monasteries and over 1,000 years of continuous monastic life [7].',
    citation: '[7] Encyclopaedia Britannica, "Mount Athos"; UNESCO World Heritage listing',
  },
  {
    id: 'sp8',
    question: 'Hagia Sophia in Istanbul has served as all of the following EXCEPT:',
    options: [
      { label: 'An Eastern Orthodox cathedral', value: 'orthodox' },
      { label: 'A mosque', value: 'mosque' },
      { label: 'A museum', value: 'museum' },
      { label: 'A Buddhist temple', value: 'buddhist' },
    ],
    correctAnswer: 'buddhist',
    explanation: 'Hagia Sophia has served as an Orthodox cathedral (537-1453), a mosque (1453-1934), a museum (1934-2020), and a mosque again (2020-present), but never a Buddhist temple [8].',
    citation: '[8] Encyclopaedia Britannica, "Hagia Sophia"; UNESCO World Heritage listing',
  },
  {
    id: 'sp9',
    question: 'Uluru in Australia is sacred to which people?',
    options: [
      { label: 'The Maori', value: 'maori' },
      { label: 'The Anangu', value: 'anangu' },
      { label: 'The Aboriginal Tasmanians', value: 'tasmanian' },
      { label: 'The Torres Strait Islanders', value: 'torres' },
    ],
    correctAnswer: 'anangu',
    explanation: 'Uluru holds deep spiritual significance for the Anangu people, the traditional custodians of the land. Climbing was officially closed in 2019 at their request [9].',
    citation: '[9] Encyclopaedia Britannica, "Uluru"; UNESCO World Heritage listing',
  },
  {
    id: 'sp10',
    question: 'Borobudur in Indonesia is the world\'s largest temple of which religion?',
    options: [
      { label: 'Hinduism', value: 'hinduism' },
      { label: 'Islam', value: 'islam' },
      { label: 'Buddhism', value: 'buddhism' },
      { label: 'Jainism', value: 'jainism' },
    ],
    correctAnswer: 'buddhism',
    explanation: 'Borobudur is the world\'s largest Buddhist temple, a 9th-century Mahayana monument featuring over 500 Buddha statues and 2,672 relief panels [10].',
    citation: '[10] Encyclopaedia Britannica, "Borobudur"; UNESCO World Heritage listing',
  },
  {
    id: 'sp11',
    question: 'The Yazd Atash Behram in Iran houses a sacred fire believed to have been burning since approximately:',
    options: [
      { label: '100 BCE', value: '100bce' },
      { label: '470 CE', value: '470ce' },
      { label: '1200 CE', value: '1200ce' },
      { label: '1934 CE', value: '1934ce' },
    ],
    correctAnswer: '470ce',
    explanation: 'The Yazd fire temple houses a sacred Zoroastrian fire believed to have been burning continuously since approximately 470 CE [11].',
    citation: '[11] Encyclopaedia Britannica, "Zoroastrianism" and "Yazd"',
  },
  {
    id: 'sp12',
    question: 'Stonehenge is aligned with astronomical events. Which alignment is most notable?',
    options: [
      { label: 'The North Star', value: 'north-star' },
      { label: 'The summer solstice sunrise and winter solstice sunset', value: 'solstice' },
      { label: 'The spring equinox moonrise', value: 'equinox' },
      { label: 'The constellation Orion', value: 'orion' },
    ],
    correctAnswer: 'solstice',
    explanation: 'Stonehenge is aligned with the sunrise on the summer solstice and the sunset on the winter solstice, suggesting astronomical and ceremonial significance [12].',
    citation: '[12] Encyclopaedia Britannica, "Stonehenge"; UNESCO World Heritage listing',
  },
  {
    id: 'sp13',
    question: 'The Camino de Santiago pilgrimage route leads to which city?',
    options: [
      { label: 'Rome', value: 'rome' },
      { label: 'Jerusalem', value: 'jerusalem' },
      { label: 'Santiago de Compostela', value: 'santiago' },
      { label: 'Lourdes', value: 'lourdes' },
    ],
    correctAnswer: 'santiago',
    explanation: 'The Camino de Santiago (Way of St. James) leads to Santiago de Compostela in Spain, believed to house the remains of the apostle James [13].',
    citation: '[13] Encyclopaedia Britannica, "Santiago de Compostela"; UNESCO World Heritage listing',
  },
  {
    id: 'sp14',
    question: 'Adam\'s Peak (Sri Pada) in Sri Lanka is unique because it is venerated by how many religions?',
    options: [
      { label: 'One', value: '1' },
      { label: 'Two', value: '2' },
      { label: 'Three', value: '3' },
      { label: 'Four', value: '4' },
    ],
    correctAnswer: '4',
    explanation: 'Adam\'s Peak is revered by Buddhists (footprint of Buddha), Hindus (Shiva), Muslims (Adam), and Christians (Adam), making it one of the rare multi-faith sacred sites [14].',
    citation: '[14] Encyclopaedia Britannica, "Adam\'s Peak"',
  },
  {
    id: 'sp15',
    question: 'Shashamane in Ethiopia is a sacred settlement for which religious movement?',
    options: [
      { label: 'Ethiopian Orthodox Christianity', value: 'orthodox' },
      { label: 'Rastafari', value: 'rastafari' },
      { label: 'Islam', value: 'islam' },
      { label: 'Judaism', value: 'judaism' },
    ],
    correctAnswer: 'rastafari',
    explanation: 'Shashamane is home to a Rastafari community established on land granted by Emperor Haile Selassie I to people of African descent [15].',
    citation: '[15] Encyclopaedia Britannica, "Rastafari"',
  },
];

export default function SacredPlacesQuizPage() {
  return (
    <div className="container py-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
          <li><Link href="/quiz" className="hover:text-foreground transition-colors">Quizzes</Link></li>
          <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
          <li className="text-foreground font-medium" aria-current="page">Sacred Places Quiz</li>
        </ol>
      </nav>

      <QuizEngine
        title="Sacred Places Quiz"
        description="Test your knowledge of the world's most important sacred sites, temples, and pilgrimage destinations."
        questions={SACRED_PLACES_QUESTIONS}
        type="knowledge"
      />

      <section className="mt-8 rounded-xl border bg-muted/30 p-5" aria-labelledby="sp-sources-heading">
        <h2 id="sp-sources-heading" className="text-xl font-semibold mb-3">Sources &amp; Further Reading</h2>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
          <li>
            Encyclopaedia Britannica, sacred site and religion entries.
            <a href="https://www.britannica.com/topic/religion" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/religion
            </a>
          </li>
          <li>
            UNESCO World Heritage Centre, sacred and historic site listings.
            <a href="https://whc.unesco.org/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://whc.unesco.org/
            </a>
          </li>
          <li>
            Oxford Reference, comparative religion and pilgrimage resources.
            <a href="https://www.oxfordreference.com/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.oxfordreference.com/
            </a>
          </li>
        </ol>
      </section>
    </div>
  );
}
