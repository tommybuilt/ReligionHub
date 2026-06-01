'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { QuizEngine, type QuizQuestion } from '@/components/quiz-engine';

/* SOURCE LOG: /quiz/alignment */
/* Last updated: 2026-02-15 (attribution pass) */
/* References consulted for fact verification (no text copied):
   - Pew Research Center overview reports
   - Encyclopaedia Britannica religion entries
   - Oxford Reference comparative religion topics
   - Introductory academic surveys of world religions
   - Public-domain translation catalogs for major scriptures
*/
/* ALL VISIBLE TEXT IS ORIGINAL. */

const ALIGNMENT_QUESTIONS: QuizQuestion[] = [
  {
    id: 'a1',
    question: 'How do you view the nature of the divine?',
    options: [
      { label: 'One personal God who is involved in the world', value: 'monotheism-personal' },
      { label: 'One ultimate reality that manifests in many forms', value: 'monism' },
      { label: 'The divine is found in nature and all living things', value: 'pantheism' },
      { label: 'I focus more on ethical living than the nature of God', value: 'ethical-focus' },
    ],
    weights: {
      'monotheism-personal': { christianity: 3, islam: 3, judaism: 3, sikhism: 2 },
      'monism': { hinduism: 3, 'bahai-faith': 2, sikhism: 2 },
      'pantheism': { hinduism: 2, shinto: 3, taoism: 3, 'indigenous-traditions': 3 },
      'ethical-focus': { buddhism: 3, jainism: 3, taoism: 2 },
    },
    explanation: 'This question maps broad theological orientation patterns discussed in comparative religion surveys [1][2].',
    citation: '[1] Encyclopaedia Britannica religion entries; [2] Oxford Reference comparative religion resources',
  },
  {
    id: 'a2',
    question: 'What happens after death?',
    options: [
      { label: 'Heaven or hell based on faith and deeds', value: 'afterlife-judgment' },
      { label: 'Reincarnation until spiritual liberation', value: 'reincarnation' },
      { label: 'The soul returns to or merges with the divine', value: 'merge-divine' },
      { label: 'I\'m uncertain and focus on this life', value: 'uncertain' },
    ],
    weights: {
      'afterlife-judgment': { christianity: 3, islam: 3, judaism: 1 },
      'reincarnation': { hinduism: 3, buddhism: 3, jainism: 3, sikhism: 2 },
      'merge-divine': { hinduism: 2, sikhism: 3, 'bahai-faith': 2 },
      'uncertain': { buddhism: 2, taoism: 2, judaism: 2, shinto: 2 },
    },
    explanation: 'Afterlife answer clusters reflect common doctrinal patterns in introductory comparative religion references [2][3].',
    citation: '[2] Oxford Reference; [3] Encyclopaedia Britannica theology and afterlife entries',
  },
  {
    id: 'a3',
    question: 'How should sacred knowledge be transmitted?',
    options: [
      { label: 'Through a single authoritative holy book', value: 'single-text' },
      { label: 'Through multiple sacred texts and oral traditions', value: 'multiple-texts' },
      { label: 'Through direct experience and meditation', value: 'direct-experience' },
      { label: 'Through community rituals and living teachers', value: 'community' },
    ],
    weights: {
      'single-text': { islam: 3, christianity: 2, sikhism: 2 },
      'multiple-texts': { hinduism: 3, judaism: 2, 'bahai-faith': 2 },
      'direct-experience': { buddhism: 3, taoism: 3, jainism: 2 },
      'community': { shinto: 3, 'indigenous-traditions': 3, judaism: 2 },
    },
    explanation: 'Transmission models are grouped from scholarship on scripture-centered, oral, and practice-centered traditions [2][4].',
    citation: '[2] Oxford Reference; [4] Introductory world religions survey texts',
  },
  {
    id: 'a4',
    question: 'What is the most important ethical principle?',
    options: [
      { label: 'Love and compassion for all people', value: 'love-compassion' },
      { label: 'Non-violence toward all living beings', value: 'non-violence' },
      { label: 'Living in harmony with nature and the cosmos', value: 'harmony' },
      { label: 'Justice, fairness, and submission to divine will', value: 'justice' },
    ],
    weights: {
      'love-compassion': { christianity: 3, buddhism: 2, 'bahai-faith': 3, sikhism: 2 },
      'non-violence': { jainism: 3, buddhism: 3, hinduism: 2 },
      'harmony': { taoism: 3, shinto: 3, 'indigenous-traditions': 3 },
      'justice': { islam: 3, judaism: 3, sikhism: 2 },
    },
    explanation: 'Ethical categories in this question summarize recurring motifs (compassion, non-violence, harmony, justice) across major traditions [1][2][4].',
    citation: '[1] Britannica overview entries; [2] Oxford Reference; [4] Comparative religion survey texts',
  },
  {
    id: 'a5',
    question: 'How do you view religious diversity?',
    options: [
      { label: 'There is one true path to God', value: 'exclusivist' },
      { label: 'Many paths lead to the same truth', value: 'pluralist' },
      { label: 'Each tradition has partial truth; a new revelation unifies them', value: 'progressive' },
      { label: 'Truth is found through personal spiritual practice, not doctrine', value: 'experiential' },
    ],
    weights: {
      'exclusivist': { islam: 2, christianity: 2 },
      'pluralist': { hinduism: 3, sikhism: 2, 'indigenous-traditions': 2 },
      'progressive': { 'bahai-faith': 3 },
      'experiential': { buddhism: 3, taoism: 3, jainism: 2, shinto: 2 },
    },
    explanation: 'The diversity question reflects typologies (exclusivist, pluralist, progressive, experiential) used in comparative theology and religious studies [2][4].',
    citation: '[2] Oxford Reference comparative entries; [4] Introductory religious studies typologies',
  },
  {
    id: 'a6',
    question: 'What role should ritual and worship play in daily life?',
    options: [
      { label: 'Structured daily prayers at set times', value: 'structured-prayer' },
      { label: 'Meditation and mindfulness practice', value: 'meditation' },
      { label: 'Devotional worship through songs, offerings, and ceremonies', value: 'devotional' },
      { label: 'Living ethically is more important than formal worship', value: 'ethical-living' },
    ],
    weights: {
      'structured-prayer': { islam: 3, judaism: 2, christianity: 2 },
      'meditation': { buddhism: 3, jainism: 2, hinduism: 2, taoism: 2 },
      'devotional': { hinduism: 3, shinto: 3, sikhism: 2, 'indigenous-traditions': 2 },
      'ethical-living': { 'bahai-faith': 2, jainism: 2, taoism: 2, buddhism: 2 },
    },
    explanation: 'Ritual-practice weighting follows common liturgical and contemplative emphasis patterns described in reference works [1][2][3].',
    citation: '[1] Britannica religion entries; [2] Oxford Reference; [3] Pew context reports',
  },
  {
    id: 'a7',
    question: 'How do you view the relationship between humans and nature?',
    options: [
      { label: 'Humans are stewards of God\'s creation', value: 'stewardship' },
      { label: 'Humans are part of nature, not above it', value: 'part-of-nature' },
      { label: 'All living beings have souls and deserve respect', value: 'all-souls' },
      { label: 'Nature itself is sacred and filled with spirits', value: 'nature-sacred' },
    ],
    weights: {
      'stewardship': { christianity: 3, islam: 3, judaism: 2 },
      'part-of-nature': { taoism: 3, buddhism: 2 },
      'all-souls': { jainism: 3, hinduism: 2, sikhism: 2 },
      'nature-sacred': { shinto: 3, 'indigenous-traditions': 3, hinduism: 1 },
    },
    explanation: 'Human-nature relationships are clustered by stewardship, interdependence, and sacred-land frameworks described in comparative scholarship [1][2][4].',
    citation: '[1] Britannica entries; [2] Oxford Reference; [4] Comparative ethics and religion surveys',
  },
  {
    id: 'a8',
    question: 'What is the ultimate spiritual goal?',
    options: [
      { label: 'Eternal life with God in heaven', value: 'heaven' },
      { label: 'Liberation from the cycle of rebirth (moksha/nirvana)', value: 'liberation' },
      { label: 'Living in balance and harmony in this life', value: 'balance' },
      { label: 'Unity of all humanity and world peace', value: 'unity' },
    ],
    weights: {
      'heaven': { christianity: 3, islam: 3 },
      'liberation': { hinduism: 3, buddhism: 3, jainism: 3, sikhism: 2 },
      'balance': { taoism: 3, shinto: 2, 'indigenous-traditions': 2 },
      'unity': { 'bahai-faith': 3, sikhism: 2 },
    },
    explanation: 'Ultimate-goal options summarize common teleological themes: salvation, liberation, harmony, and unity [1][2][4].',
    citation: '[1] Britannica overview entries; [2] Oxford Reference; [4] Introductory world religions surveys',
  },
];

export default function AlignmentQuizPage() {
  return (
    <div className="container py-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
          <li><Link href="/quiz" className="hover:text-foreground transition-colors">Quizzes</Link></li>
          <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
          <li className="text-foreground font-medium" aria-current="page">Belief Alignment</li>
        </ol>
      </nav>

      <div className="mb-6 p-3 bg-muted/30 rounded-lg text-xs text-muted-foreground text-center max-w-2xl mx-auto">
        This quiz is for educational purposes only. Religious beliefs are complex and personal, no quiz can fully represent any tradition.
      </div>

      <QuizEngine
        title="Belief Alignment Explorer"
        description="Discover which religious traditions most align with your worldview."
        questions={ALIGNMENT_QUESTIONS}
        type="alignment"
      />

      <section className="mt-8 rounded-xl border bg-muted/30 p-5" aria-labelledby="alignment-sources-heading">
        <h2 id="alignment-sources-heading" className="text-xl font-semibold mb-3">Sources &amp; Further Reading</h2>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
          <li>
            Encyclopaedia Britannica, world religion reference portal.
            <a href="https://www.britannica.com/topic/religion" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/religion
            </a>
          </li>
          <li>
            Oxford Reference, comparative religion resources.
            <a href="https://www.oxfordreference.com/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.oxfordreference.com/
            </a>
          </li>
          <li>
            Pew Research Center, religion reports and methodological notes.
            <a href="https://www.pewresearch.org/religion/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.pewresearch.org/religion/
            </a>
          </li>
          <li>
            Introductory world religions academic survey texts (Cambridge/Oxford/Routledge series).
          </li>
          <li>
            World Religion Database, global adherence context.
            <a href="https://www.worldreligiondatabase.org/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.worldreligiondatabase.org/
            </a>
          </li>
        </ol>
      </section>
    </div>
  );
}
