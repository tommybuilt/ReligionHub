import type { Metadata } from 'next';
import { Compass } from 'lucide-react';
import { ResourceHubPage } from '@/components/resource-hub-page';
import { generateMetadata as genMeta } from '@/lib/seo';
import { PHASE_TWO_SOURCE_NOTES } from '@/lib/phase-two-hubs';
import { BEGINNER_GUIDE_DETAILS } from '@/lib/resource-details/beginner-guides';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {
  return genMeta({
    title: 'Beginner Guides',
    description:
      'Beginner-friendly pathways into major world religions, with clear starting points for belief, practice, texts, and internal diversity.',
    path: '/beginner-guides',
    type: 'website',
  });
}

const beginnerGuideItems = BEGINNER_GUIDE_DETAILS.map((entry) => ({
  title: entry.title,
  description: entry.summary,
  meta: entry.wordCountLabel,
  href: `/beginner-guides/${entry.slug}`,
}));

export default function BeginnerGuidesPage() {
  return (
    <ResourceHubPage
      title="Beginner Guides"
      description="These guides are built for first-time learners who want a reliable starting point before diving into debates, denominational complexity, or advanced scholarship. Each path emphasizes what to learn first, what vocabulary matters early, and where readers usually get confused."
      path="/beginner-guides"
      icon={Compass}
      items={beginnerGuideItems}
      sourceNotes={PHASE_TWO_SOURCE_NOTES}
    />
  );
}
