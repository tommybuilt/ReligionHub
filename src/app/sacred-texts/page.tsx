import type { Metadata } from 'next';
import { ScrollText } from 'lucide-react';
import { ResourceHubPage } from '@/components/resource-hub-page';
import { generateMetadata as genMeta } from '@/lib/seo';
import { PHASE_TWO_SOURCE_NOTES } from '@/lib/phase-two-hubs';
import { SACRED_TEXT_DETAILS } from '@/lib/resource-details/sacred-texts';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {
  return genMeta({
    title: 'Sacred Texts',
    description:
      'Introductory guides to major sacred texts including the Bible, Quran, Bhagavad Gita, Torah, Tripitaka, Guru Granth Sahib, and more.',
    path: '/sacred-texts',
    type: 'website',
  });
}

const sacredTextItems = SACRED_TEXT_DETAILS.map((entry) => ({
  title: entry.title,
  description: entry.summary,
  meta: entry.wordCountLabel,
  href: `/sacred-texts/${entry.slug}`,
  quickActionHref: `/sacred-texts/${entry.slug}`,
  quickActionLabel: `Get editions for ${entry.title}`,
}));

export default function SacredTextsPage() {
  return (
    <ResourceHubPage
      title="Sacred Texts"
      description="Sacred texts are best understood as living sources of practice, memory, authority, and interpretation inside real communities. This hub introduces major texts across traditions and helps beginners understand what each text is, why it matters, and how to start reading it responsibly."
      path="/sacred-texts"
      icon={ScrollText}
      items={sacredTextItems}
      sourceNotes={PHASE_TWO_SOURCE_NOTES}
    />
  );
}
