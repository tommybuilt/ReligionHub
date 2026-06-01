import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {

  return genMeta({
    title: 'Religion Demographics Quiz',
    description: 'How well do you know the numbers behind world religions? Test your knowledge of populations, growth trends, and geographic distribution.',
    path: '/quiz/demographics',
    type: 'website',
  });
}

export default function DemographicsQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
