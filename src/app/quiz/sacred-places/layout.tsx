import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {

  return genMeta({
    title: 'Sacred Places Quiz',
    description: "Test your knowledge of the world's most important sacred sites, temples, and pilgrimage destinations.",
    path: '/quiz/sacred-places',
    type: 'website',
  });
}

export default function SacredPlacesQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
