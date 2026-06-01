import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {

  return genMeta({
    title: 'Traditions & Practices Quiz',
    description: 'Test your knowledge of religious traditions, festivals, rituals, and practices from around the world.',
    path: '/quiz/traditions',
    type: 'website',
  });
}

export default function TraditionsQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
