import type { Metadata } from 'next';
import { BookText } from 'lucide-react';
import { ResourceHubPage } from '@/components/resource-hub-page';
import { generateMetadata as genMeta } from '@/lib/seo';
import { PHASE_TWO_SOURCE_NOTES } from '@/lib/phase-two-hubs';
import { GLOSSARY_DETAILS } from '@/lib/resource-details/glossary';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {
  return genMeta({
    title: 'Glossary',
    description:
      'A comparative religion glossary covering key terms such as karma, dharma, nirvana, halal, kosher, and rebirth language across traditions.',
    path: '/glossary',
    type: 'website',
  });
}

const glossaryItems = GLOSSARY_DETAILS.map((entry) => ({
  title: entry.title,
  description: entry.summary,
  meta: entry.wordCountLabel,
  href: `/glossary/${entry.slug}`,
}));

export default function GlossaryPage() {
  return (
    <ResourceHubPage
      title="Glossary"
      description="Key religion terms often sound familiar in English while carrying very different meanings inside living traditions. This glossary hub is designed to help readers compare carefully, define terms clearly, and avoid flattening distinct ideas into one generic definition."
      path="/glossary"
      icon={BookText}
      items={glossaryItems}
      sourceNotes={PHASE_TWO_SOURCE_NOTES}
    />
  );
}
