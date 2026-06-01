import { siteConfig } from '@/lib/config';

export const metadata = {
  title: 'Disclaimers',
  description: `Disclaimers for ${siteConfig.name}. Important notices about the nature of our content.`,
};

export default function DisclaimersPage() {
  const name = siteConfig.name;
  return (
    <div className="container max-w-3xl py-12">
      <h1 className="text-3xl font-bold mb-8">Disclaimers</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: March 17, 2026</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Educational Purpose</h2>
          <p>{name} is an educational resource designed to present factual, citation-backed information about world religions. The content is intended for informational and comparative purposes only and does not constitute religious advice, spiritual guidance, or endorsement of any particular faith tradition.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Neutrality</h2>
          <p>We strive to present all religions with equal respect and factual accuracy. Our content does not advocate for or against any religion. The inclusion or exclusion of specific beliefs, practices, or denominations is based on editorial judgment about relevance and available sourcing, not on any value judgment about those traditions.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Accuracy</h2>
          <p>While we make every effort to ensure accuracy and cite reputable sources, religious traditions are complex, diverse, and evolving. Beliefs and practices can vary significantly between denominations, regions, and individual adherents. Our content represents general, widely-accepted descriptions and may not capture every nuance or minority interpretation.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Not Professional Advice</h2>
          <p>Nothing on {name} should be construed as legal, medical, psychological, or professional advice. If you are experiencing a spiritual crisis or need professional guidance, please consult a qualified professional or religious leader in your community.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">External Links</h2>
          <p>Our citations may link to external websites. We are not responsible for the content, accuracy, or availability of external sites. The inclusion of a link does not imply endorsement of the linked site or its content.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Quiz Results</h2>
          <p>Quiz results, including belief alignment scores, are for entertainment and educational purposes only. They are based on simplified models and should not be taken as definitive assessments of religious compatibility or personal beliefs.</p>
        </section>
      </div>
    </div>
  );
}
