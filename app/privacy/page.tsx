import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Protocoding collects, uses, and protects your personal information.',
};

const LAST_UPDATED = 'January 18, 2026';

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-8 pt-20 md:p-12 md:pt-12 lg:p-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Legal</p>
          <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Privacy <span className="text-accent">Policy</span>
          </h1>
          <p className="text-sm text-white/40">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Content */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material-elevated p-6 md:p-10 lg:p-16">
          <div className="max-w-3xl space-y-10">
            
            {/* Introduction */}
            <section>
              <p className="text-sm text-gray-600 leading-relaxed">
                Protocoding, Inc. (&quot;Protocoding,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at protocoding.com or engage with our services.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">Information We Collect</h2>
              
              <h3 className="text-sm font-bold text-gray-900 mb-2 mt-6">Information You Provide</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                We collect information you voluntarily provide when you:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 leading-relaxed space-y-1 ml-2">
                <li>Submit a contact form or project inquiry</li>
                <li>Apply for a job or career opportunity</li>
                <li>Subscribe to our newsletter or updates</li>
                <li>Communicate with us via email or other channels</li>
              </ul>
              <p className="text-sm text-gray-600 leading-relaxed mt-3">
                This may include your name, email address, phone number, company name, job title, project details, resume, and any other information you choose to share.
              </p>

              <h3 className="text-sm font-bold text-gray-900 mb-2 mt-6">Information Collected Automatically</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                When you visit our website, we may automatically collect:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 leading-relaxed space-y-1 ml-2">
                <li>Device information (browser type, operating system, device type)</li>
                <li>IP address and approximate location</li>
                <li>Pages visited, time spent, and navigation patterns</li>
                <li>Referring website or source</li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">How We Use Your Information</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 leading-relaxed space-y-1 ml-2">
                <li>Respond to your inquiries and provide requested services</li>
                <li>Process job applications and evaluate candidates</li>
                <li>Send project updates and communications you&apos;ve requested</li>
                <li>Improve our website, services, and user experience</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Protect against fraud and maintain security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">Cookies & Tracking Technologies</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                We use cookies and similar technologies to enhance your experience. These include:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 leading-relaxed space-y-1 ml-2">
                <li><strong>Essential cookies:</strong> Required for website functionality</li>
                <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p className="text-sm text-gray-600 leading-relaxed mt-3">
                You can control cookies through your browser settings. Disabling certain cookies may affect website functionality.
              </p>
            </section>

            {/* Sharing */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">Information Sharing</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 leading-relaxed space-y-1 ml-2">
                <li><strong>Service providers:</strong> Third parties that help us operate our business (hosting, analytics, email services)</li>
                <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              </ul>
              <p className="text-sm text-gray-600 leading-relaxed mt-3">
                All service providers are contractually obligated to protect your information and use it only for specified purposes.
              </p>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">Data Security</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">Data Retention</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Contact form submissions and project inquiries are retained for the duration of potential and active business relationships. Job applications are retained for up to two years unless you request earlier deletion.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">Your Rights</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 leading-relaxed space-y-1 ml-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict certain processing activities</li>
                <li>Request portability of your data</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>
              <p className="text-sm text-gray-600 leading-relaxed mt-3">
                To exercise these rights, please contact us at{' '}
                <a href="mailto:privacy@protocoding.com" className="text-accent hover:underline">privacy@protocoding.com</a>.
              </p>
            </section>

            {/* California Residents */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">California Residents</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, the right to delete your information, and the right to opt-out of the sale of your information. We do not sell personal information. To exercise your CCPA rights, contact us at{' '}
                <a href="mailto:privacy@protocoding.com" className="text-accent hover:underline">privacy@protocoding.com</a>.
              </p>
            </section>

            {/* Third-Party Links */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">Third-Party Links</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
              </p>
            </section>

            {/* Children */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">Children&apos;s Privacy</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">Changes to This Policy</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. Your continued use of our website after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">Contact Us</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="material-inset p-4 text-sm text-gray-600">
                <p className="font-bold text-gray-900">Protocoding, Inc.</p>
                <p>San Francisco, CA</p>
                <p>Email: <a href="mailto:privacy@protocoding.com" className="text-accent hover:underline">privacy@protocoding.com</a></p>
              </div>
            </section>

          </div>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Back link */}
      <div className="section-row">
        <div className="gutter-left" />
        <Link
          href="/"
          className="material-inset flex items-center justify-center gap-2 p-6 text-xs font-bold text-gray-900 hover:material transition-all uppercase tracking-[0.2em]"
        >
          ← Back to Home
        </Link>
        <div className="gutter-right" />
      </div>
    </>
  );
}
