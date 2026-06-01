import { siteConfig } from '@/lib/config';

export const metadata = {
  title: 'Terms of Service',
  description: `Terms of Service for ${siteConfig.name}. Read our terms and conditions for using the site.`,
};

export default function TermsPage() {
  const name = siteConfig.name;

  return (
    <div className="container max-w-3xl py-12">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-8">Effective date: March 17, 2026 &middot; Last updated: March 17, 2026</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">1. Acceptance of Terms</h2>
          <p>By accessing or using {name} (&quot;the Site&quot;), operated by ReligionCompare, a TPS Worldwide LLC property (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms of Service. If you do not agree with any part of these Terms, you must not use the Site.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">2. Description of Service</h2>
          <p>{name} is a free educational website that provides factual, citation-backed information about world religions for comparison and learning purposes. The Site includes religion profiles, side-by-side comparisons, interactive quizzes, and related educational content.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">3. Educational Purpose Disclaimer</h2>
          <p>All content on {name} is for educational and informational purposes only. Content does not constitute religious advice, spiritual guidance, legal advice, or professional counsel of any kind. Comparison content and quiz results do not constitute an endorsement of or recommendation for any particular religious tradition. You should consult qualified professionals or religious leaders for guidance on personal spiritual matters.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">4. Acceptable Use</h2>
          <p>You agree to use {name} only for lawful purposes and in accordance with these Terms. You may not: use the Site in any way that could damage, disable, overburden, or impair the service; attempt to gain unauthorized access to any part of the Site or its systems; use automated tools (bots, scrapers) to access the Site without our written permission; frame, mirror, or otherwise incorporate any part of the Site into another site; or use the Site for any illegal, harmful, or fraudulent purpose.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">5. Intellectual Property</h2>
          <p>All original content on {name}, including but not limited to text, editorial synthesis, design, layout, graphics, and code, is owned by ReligionCompare, a TPS Worldwide LLC property, and protected by United States and international copyright laws. Factual claims are supported by citations from academic and reference sources and are presented under principles of fair use. You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise exploit our content without prior written permission from ReligionCompare.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">6. Third-Party Content and Links</h2>
          <p>The Site contains citations and links to external sources. These links are provided for reference and attribution purposes. We do not control and are not responsible for the content, accuracy, or availability of third-party sites. Inclusion of a link does not imply endorsement.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">7. Advertising</h2>
          <p>The Site may display advertisements provided by third-party advertising networks (such as Google AdSense). We do not endorse the products or services advertised. Advertising content is clearly distinguishable from editorial content. Your interactions with advertisers are solely between you and the advertiser.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">8. Affiliate Links</h2>
          <p>This Site contains affiliate links to products on Amazon. When you click these links and make a purchase, we may earn a small commission at no additional cost to you. Affiliate relationships do not influence our editorial content or product recommendations. See our full Affiliate Disclosure for details.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">9. Disclaimers</h2>
          <p>THE SITE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. While we strive for accuracy and cite all sources, we do not guarantee that all information is complete, current, or error-free. Religious interpretations vary by tradition, denomination, region, and individual practitioner.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">10. Limitation of Liability</h2>
          <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, RELIGIONCOMPARE, TPS WORLDWIDE LLC, AND THEIR OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF OR INABILITY TO USE THE SITE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">11. Indemnification</h2>
          <p>You agree to indemnify and hold harmless ReligionCompare and TPS Worldwide LLC from any claims, damages, losses, or expenses arising from your use of the Site or violation of these Terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">12. Governing Law &amp; Dispute Resolution</h2>
          <p>These Terms are governed by the laws of the State of Arizona, USA, without regard to conflict of law principles. Any disputes arising from these Terms or your use of the Site shall be resolved in the state or federal courts located in Maricopa County, Arizona. You consent to the personal jurisdiction of such courts.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">13. Modifications</h2>
          <p>We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated effective date. Your continued use of the Site after such changes constitutes acceptance of the revised Terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">14. Contact</h2>
          <p>For questions about these Terms of Service:</p>
          <p>ReligionCompare, a TPS Worldwide LLC property<br />Phoenix, AZ, USA<br />Email: <a href="mailto:support@tpsworldwidellc.com" className="text-primary hover:underline">support@tpsworldwidellc.com</a></p>
        </section>
      </div>
    </div>
  );
}
