import type { Metadata } from 'next';
import { CircleHelp } from 'lucide-react';
import { ResourceHubPage } from '@/components/resource-hub-page';
import { generateMetadata as genMeta } from '@/lib/seo';
import { PHASE_TWO_SOURCE_NOTES } from '@/lib/phase-two-hubs';
import { FAQ_DETAILS } from '@/lib/resource-details/faqs';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {
  return genMeta({
    title: 'FAQs',
    description:
      'Frequently asked questions about religion, conversion, sacred texts, comparison, dietary laws, and respectful study.',
    path: '/faqs',
    type: 'website',
  });
}

const faqItems = FAQ_DETAILS.map((entry) => ({
  title: entry.title,
  description: entry.summary,
  meta: entry.wordCountLabel,
  href: `/faqs/${entry.slug}`,
}));

export default function FaqsPage() {
  return (
    <ResourceHubPage
      title="FAQs"
      description="These answers tackle common religion questions that beginners, students, and curious readers ask most often. The goal is to answer clearly without collapsing real differences between traditions or treating one religion’s categories as universal for all others."
      path="/faqs"
      icon={CircleHelp}
      items={faqItems}
      sourceNotes={PHASE_TWO_SOURCE_NOTES}
    />
  );
}
