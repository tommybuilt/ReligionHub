import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {

  return genMeta({
    title: 'History & Origins Quiz',
    description: 'Test your knowledge of the key events, founders, and turning points in the history of world religions.',
    path: '/quiz/history',
    type: 'website',
  });
}

export default function HistoryQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
