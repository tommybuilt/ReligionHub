import type { Metadata } from 'next';
import { GraduationCap } from 'lucide-react';
import { ResourceHubPage } from '@/components/resource-hub-page';
import { generateMetadata as genMeta } from '@/lib/seo';
import { PHASE_TWO_SOURCE_NOTES } from '@/lib/phase-two-hubs';
import { EDUCATOR_RESOURCE_DETAILS } from '@/lib/resource-details/educator-resources';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {
  return genMeta({
    title: 'Educator Resources',
    description:
      'Teaching-oriented resources for world religions units, discussion norms, source literacy, field visits, and beginner learning pathways.',
    path: '/educator-resources',
    type: 'website',
  });
}

const educatorResourceItems = EDUCATOR_RESOURCE_DETAILS.map((entry) => ({
  title: entry.title,
  description: entry.summary,
  meta: entry.wordCountLabel,
  href: `/educator-resources/${entry.slug}`,
}));

export default function EducatorResourcesPage() {
  return (
    <ResourceHubPage
      title="Educator Resources"
      description="These resources are designed for teachers, homeschoolers, librarians, and facilitators who need reliable comparative religion support. The emphasis is on neutral framing, source literacy, respectful discussion norms, and practical pathways for teaching complicated traditions clearly."
      path="/educator-resources"
      icon={GraduationCap}
      items={educatorResourceItems}
      sourceNotes={PHASE_TWO_SOURCE_NOTES}
    />
  );
}
