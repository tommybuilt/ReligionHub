import { siteConfig } from '@/lib/config';

export const metadata = {
  title: 'Affiliate Disclosure',
  description: `Affiliate disclosure for ${siteConfig.name}. Learn how affiliate relationships support the site without changing editorial standards.`,
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="container max-w-3xl py-12">
      <h1 className="text-3xl font-bold mb-8">Affiliate Disclosure</h1>
      <p className="text-sm text-muted-foreground mb-8">Effective date: March 21, 2026</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
        <p>
          ReligionCompare participates in affiliate programs, which means we may earn a small commission when you purchase products through links on our site. This does not affect the price you pay, and it does not influence our editorial recommendations.
        </p>

        <p>We are a participant in the following affiliate program:</p>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Amazon Associates Program</h2>
          <p>
            As an Amazon Associate, ReligionCompare earns from qualifying purchases. Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Editorial Independence</h2>
          <p>
            Our editorial content is created independently of our affiliate relationships. Book recommendations and product suggestions are selected based on quality, relevance, and scholarly reputation, not commission rates.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Questions</h2>
          <p>
            If you have questions about our affiliate relationships, contact ReligionCompare, a TPS Worldwide LLC property, at{' '}
            <a href="mailto:support@tpsworldwidellc.com" className="text-primary hover:underline">
              support@tpsworldwidellc.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
