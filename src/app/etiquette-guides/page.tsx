import type { Metadata } from 'next';
import { HandHeart } from 'lucide-react';
import { ResourceHubPage } from '@/components/resource-hub-page';
import { generateMetadata as genMeta } from '@/lib/seo';
import { PHASE_TWO_SOURCE_NOTES } from '@/lib/phase-two-hubs';
import { ETIQUETTE_GUIDE_DETAILS } from '@/lib/resource-details/etiquette-guides';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {
  return genMeta({
    title: 'Etiquette Guides',
    description:
      'Respectful visitor guides for churches, mosques, synagogues, temples, and gurdwaras, with practical do-and-don’t guidance.',
    path: '/etiquette-guides',
    type: 'website',
  });
}

const etiquetteGuideItems = ETIQUETTE_GUIDE_DETAILS.map((entry) => ({
  title: entry.title,
  description: entry.summary,
  meta: entry.wordCountLabel,
  href: `/etiquette-guides/${entry.slug}`,
}));

export default function EtiquetteGuidesPage() {
  return (
    <ResourceHubPage
      title="Etiquette Guides"
      description="Religious spaces are living communities, not museum exhibits. These guides help visitors show respect before, during, and after a visit by covering clothing, photography, prayer-space behavior, questions, and common mistakes first-time guests make."
      path="/etiquette-guides"
      icon={HandHeart}
      items={etiquetteGuideItems}
      sourceNotes={PHASE_TWO_SOURCE_NOTES}
    />
  );
}
