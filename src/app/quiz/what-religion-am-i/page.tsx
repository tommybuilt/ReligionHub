import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { generateBreadcrumbJsonLd, generateMetadata as genMeta, getCanonicalUrl } from '@/lib/seo';
import { siteConfig } from '@/lib/config';
import { WhatReligionQuiz } from './quiz-client';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {
  return genMeta({
    title: 'What Religion Am I?, Personality Quiz',
    description:
      'Answer 25 thought-provoking questions about your beliefs, values, and worldview to discover which world religions resonate most with you. Educational, not prescriptive.',
    path: '/quiz/what-religion-am-i',
    type: 'website',
  });
}

export default async function WhatReligionAmIPage({
  params,
}: {
  params: Promise<Record<string, never>>;
}) {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Quizzes', url: '/quiz' },
    { name: 'What Religion Am I?', url: '/quiz/what-religion-am-i' },
  ]);

  const quizJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: 'What Religion Am I?',
    description: 'Answer 25 thought-provoking questions about your beliefs, values, and worldview to discover which world religions resonate most with you.',
    url: getCanonicalUrl('/quiz/what-religion-am-i'),
    educationalAlignment: {
      '@type': 'AlignmentObject',
      alignmentType: 'educationalSubject',
      targetName: 'Comparative Religion',
    },
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizJsonLd) }} />

      <div className="container py-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li><Link href="/quiz" className="hover:text-foreground transition-colors">Quizzes</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-foreground font-medium" aria-current="page">What Religion Am I?</li>
          </ol>
        </nav>

        <WhatReligionQuiz />

        <div className="mt-8 p-4 bg-muted/30 rounded-lg text-sm text-muted-foreground max-w-2xl mx-auto">
          <p>
            <strong>Disclaimer:</strong> This quiz is for educational and entertainment purposes only.
            It does not constitute religious advice. Beliefs are complex and personal; no quiz can fully
            capture the depth of any religious tradition. Your results indicate which traditions your
            answers most closely aligned with, not which religion you &quot;should&quot; follow.
          </p>
        </div>
      </div>
    </>
  );
}
