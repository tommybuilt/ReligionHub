import { siteConfig } from '@/lib/config';

export const metadata = {
  title: 'Cookie Policy',
  description: `Cookie Policy for ${siteConfig.name}. Learn about the cookies we use, their purposes, and how to manage them.`,
};

export default function CookiesPage() {
  const name = siteConfig.name;
  return (
    <div className="container max-w-3xl py-12">
      <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Effective date: March 17, 2026 &middot; Last updated: March 17, 2026</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">What Are Cookies</h2>
          <p>Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences, understand usage patterns, and improve your experience. Some cookies are essential for the site to function; others are optional and require your consent.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">1. Strictly Necessary Cookies</h2>
          <p>These cookies are required for the website to function and cannot be disabled. They do not collect personal information.</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>cookie_consent</strong>, Stores your cookie consent preferences so we don&apos;t ask again on every visit.</li>
            <li><strong>theme</strong>, Remembers your light/dark mode preference.</li>
            <li><strong>locale</strong>, Remembers your language selection.</li>
            <li><strong>cf_clearance</strong>, Set by Cloudflare for bot protection and security challenges (Turnstile).</li>
            <li><strong>__cf_bm</strong>, Set by Cloudflare to distinguish humans from bots.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">2. Analytics Cookies</h2>
          <p>These cookies are set only with your explicit consent. They help us understand how visitors interact with {name} so we can improve content and user experience.</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>_ga, _ga_*</strong>, Set by Google Analytics 4 (GA4). Distinguish unique users and sessions. Retain for up to 14 months. <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google cookie details</a>.</li>
          </ul>
          <p>GA4 collects anonymized data including pages visited, session duration, device type, geographic region, and referral source. IP addresses are anonymized before storage.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">3. Advertising Cookies</h2>
          <p>These cookies are set only with your explicit consent. They are used by Google AdSense to serve ads and measure ad performance.</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>__gads, __gpi</strong>, Set by Google AdSense. Used to serve and measure effectiveness of ads.</li>
            <li><strong>IDE, DSID, NID</strong>, Set by Google DoubleClick. Used for ad personalization and targeting across the Google Display Network.</li>
          </ul>
          <p>If you decline advertising cookies, ads may still appear but will not be personalized to your browsing history. See <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google&apos;s advertising cookie policies</a> for full details.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">4. How We Obtain Consent</h2>
          <p>When you first visit {name}, a cookie consent banner will appear. You can choose to: <strong>Accept All</strong> (enables analytics and advertising cookies), <strong>Reject Non-Essential</strong> (only strictly necessary cookies are set), or <strong>Customize</strong> (granular control over analytics and advertising cookies separately). Non-essential cookies will not be set until you provide consent.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">5. Managing Cookies</h2>
          <p>You can change your cookie preferences at any time by clicking the cookie settings link in the site footer, or through your browser settings:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
            <li><strong>Firefox:</strong> Settings → Privacy &amp; Security → Cookies</li>
            <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
            <li><strong>Edge:</strong> Settings → Cookies and Site Permissions</li>
          </ul>
          <p>Note that disabling strictly necessary cookies may affect site functionality (e.g., theme preference may not persist).</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">6. Contact</h2>
          <p>For questions about our cookie practices:</p>
          <p>ReligionCompare, a TPS Worldwide LLC property<br />Phoenix, AZ, USA<br />Email: <a href="mailto:support@tpsworldwidellc.com" className="text-primary hover:underline">support@tpsworldwidellc.com</a></p>
        </section>
      </div>
    </div>
  );
}
