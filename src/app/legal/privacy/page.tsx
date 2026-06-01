import { siteConfig } from '@/lib/config';

export const metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${siteConfig.name}. Learn how we handle data, cookies, and your rights under GDPR and CCPA.`,
};

export default function PrivacyPage() {
  const name = siteConfig.name;

  return (
    <div className="container max-w-3xl py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Effective date: March 17, 2026 &middot; Last updated: March 17, 2026</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">1. Data Controller</h2>
          <p>{name} is operated by ReligionCompare, a TPS Worldwide LLC property, Phoenix, AZ, USA (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). We are the data controller for the purposes of the General Data Protection Regulation (GDPR), the California Consumer Privacy Act / California Privacy Rights Act (CCPA/CPRA), and other applicable data protection laws.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">2. What We Collect</h2>
          <p><strong>No Personal Information:</strong> We do not collect your name, email address, password, or any personally identifiable information (PII) through the site itself.</p>
          <p><strong>Analytics Data (with consent):</strong> With your consent, Google Analytics 4 (GA4) collects anonymized usage data including pages visited, session duration, approximate geographic region (country/city level derived from IP), device type, browser, and referral source. IP addresses are anonymized by Google before storage.</p>
          <p><strong>Advertising Data (with consent):</strong> With your consent, Google AdSense may collect data to serve personalized advertisements. This includes cookie identifiers and browsing behavior across sites in the Google Display Network. See <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google&apos;s ad technology policies</a> for details.</p>
          <p><strong>Cookies:</strong> We use strictly necessary cookies (theme preference, cookie consent, locale) and, with your consent, analytics and advertising cookies. See our <a href="/legal/cookies" className="text-primary hover:underline">Cookie Policy</a> for a full breakdown.</p>
          <p><strong>Server Logs:</strong> Our hosting provider (Cloudflare) may log IP addresses, request timestamps, and user agent strings for security and performance purposes. These logs are retained per Cloudflare&apos;s data processing policies.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">3. How We Use Information</h2>
          <p>We use the information described above to: operate and maintain the website; understand how visitors use the site (analytics); display relevant advertising (AdSense); detect and prevent abuse or security threats; improve content and user experience; and comply with legal obligations.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">4. Third-Party Services</h2>
          <p><strong>Google Analytics 4:</strong> Provided by Google LLC. Collects anonymized usage data. <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google Privacy Policy</a>.</p>
          <p><strong>Google AdSense:</strong> Provided by Google LLC. May serve personalized or non-personalized ads depending on your consent. <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google Ad Policies</a>.</p>
          <p><strong>Cloudflare:</strong> Provides hosting, CDN, and security services including bot protection (Turnstile). <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Cloudflare Privacy Policy</a>.</p>
          <p><strong>Amazon Associates:</strong> Amazon may use cookies to track referrals from our site. See Amazon&apos;s privacy policy for details.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">5. Data Sharing</h2>
          <p>We do not sell, rent, or trade your personal information. Data may be shared with: the third-party service providers listed above (Google, Cloudflare) as necessary to operate the site; law enforcement or regulatory authorities if required by law or to protect our legal rights; and a successor entity in the event of a merger, acquisition, or asset sale, with appropriate notice.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">6. Your Rights</h2>
          <p><strong>GDPR Rights (EU/EEA/UK):</strong> You have the right to: access the data we hold about you; request rectification or erasure; restrict or object to processing; data portability; withdraw consent at any time (without affecting prior lawful processing); and lodge a complaint with a supervisory authority.</p>
          <p><strong>CCPA/CPRA Rights (California):</strong> You have the right to: know what personal information is collected; request deletion of personal information; opt out of the &quot;sale&quot; or &quot;sharing&quot; of personal information (we do not sell personal information); and not be discriminated against for exercising your rights.</p>
          <p>To exercise any of these rights, contact us at support@tpsworldwidellc.com. We will respond within 30 days (GDPR) or 45 days (CCPA).</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">7. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect data, including encryption in transit (HTTPS/TLS), access controls, and security monitoring via Cloudflare. However, no method of electronic transmission or storage is 100% secure.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">8. Data Retention</h2>
          <p>Since we do not collect PII, there is no personal account data to retain. Anonymized analytics data is retained per Google&apos;s default retention settings (14 months). Cookie consent preferences are stored locally on your device. Cloudflare server logs are retained per their data processing agreement.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">9. Children&apos;s Privacy</h2>
          <p>This site is not directed at children under 13 (or 16 in the EU/UK). We do not knowingly collect personal information from children. If you believe we have inadvertently collected data from a child, please contact us immediately at support@tpsworldwidellc.com and we will take steps to delete it.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">10. International Data Transfers</h2>
          <p>Data processed by Google and Cloudflare may be transferred to and stored in the United States or other countries. These transfers are covered by Standard Contractual Clauses or other appropriate safeguards as required by GDPR.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">11. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. Your continued use of the site after changes constitutes acceptance of the revised policy.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">12. Contact Us</h2>
          <p>For privacy-related inquiries, data access requests, or complaints:</p>
          <p>ReligionCompare, a TPS Worldwide LLC property<br />Phoenix, AZ, USA<br />Email: <a href="mailto:support@tpsworldwidellc.com" className="text-primary hover:underline">support@tpsworldwidellc.com</a></p>
        </section>
      </div>
    </div>
  );
}
