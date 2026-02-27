import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PrivacyHeroPlayer } from '@/components/legal/PrivacyHeroPlayer';
import { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-8 md:pt-12">
        <PrivacyHeroPlayer />
      </div>
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mb-10">Last Updated: February 27, 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/85">
          {/* 1 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">1. Who We Are</h2>
            <p>
              This Privacy Policy explains how <strong>ShubhzTechWork</strong> ("we", "us", "our"), a technology services
              company based in Mumbai, Maharashtra, India, collects, uses, and protects your personal information when
              you visit <strong>services.shubhztechwork.com</strong> (the "Website").
            </p>
            <p>
              For any privacy-related questions, contact us at{' '}
              <a href="mailto:info@shubhztechwork.com" className="text-primary hover:underline">
                info@shubhztechwork.com
              </a>.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">2. Information We Collect</h2>

            <h3 className="font-semibold text-foreground mt-4">A. Information You Provide</h3>
            <p>
              When you submit our contact form, we collect your <strong>first name</strong>, <strong>last name</strong>,{' '}
              <strong>email address</strong>, and <strong>message content</strong>. We do not collect payment information,
              passwords, or any other sensitive personal data.
            </p>

            <h3 className="font-semibold text-foreground mt-4">B. Automatically Stored Information</h3>
            <p>
              We store your <strong>theme preference</strong> (light or dark mode) in your browser's localStorage. This
              is a non-personal, functional preference stored entirely on your device — we do not transmit or store it on
              any server.
            </p>

            <h3 className="font-semibold text-foreground mt-4">C. Hosting Logs</h3>
            <p>
              Our Website is hosted on GitHub Pages (Microsoft). Their servers may automatically collect standard access
              logs including IP addresses, browser type, and access timestamps. This data is governed by{' '}
              <a
                href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub's Privacy Statement
              </a>.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Contact form data</strong> — To respond to your inquiry or service request. By submitting the
                form, you consent to us processing your information for this purpose.
              </li>
              <li>
                <strong>Theme preference</strong> — To remember your display setting across page loads (strictly
                functional, not linked to your identity).
              </li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> use your data for marketing, profiling, or advertising purposes. We will never
              send you unsolicited emails beyond responding to your inquiry.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">4. Third-Party Service Providers</h2>
            <p>We use the following third-party services to operate the Website:</p>
            <div className="overflow-x-auto mt-3">
              <table className="w-full min-w-[480px] text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-3 font-semibold">Service</th>
                    <th className="text-left p-3 font-semibold">Purpose</th>
                    <th className="text-left p-3 font-semibold">Data Shared</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3">Web3Forms</td>
                    <td className="p-3">Contact form submission</td>
                    <td className="p-3">Name, email, message, IP address</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3">GitHub Pages (Microsoft)</td>
                    <td className="p-3">Website hosting</td>
                    <td className="p-3">Server access logs</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3">
              We do <strong>not</strong> sell, rent, or trade your personal data to any third parties.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">5. Data Retention</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Contact form submissions</strong> — Retained by Web3Forms for up to 30 days, then automatically
                deleted. We retain the email notification for as long as necessary to respond to your inquiry.
              </li>
              <li>
                <strong>Theme preference</strong> — Stored locally in your browser until you clear your browser storage.
              </li>
              <li>
                <strong>Server logs</strong> — Retained per GitHub Pages / Microsoft's retention policies.
              </li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">6. Cookies and Tracking</h2>
            <p>This Website:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Does <strong>not</strong> use tracking cookies</li>
              <li>Does <strong>not</strong> use analytics tools (Google Analytics, etc.)</li>
              <li>Does <strong>not</strong> use advertising or remarketing pixels</li>
              <li>
                Uses <strong>localStorage only</strong> for your theme preference — a functional, non-personal setting
                stored entirely in your browser
              </li>
            </ul>
            <p className="mt-3">You can clear localStorage at any time through your browser settings.</p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">7. Data Security</h2>
            <p>We take reasonable measures to protect your information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The Website is served over HTTPS encryption</li>
              <li>Contact form submissions are transmitted securely via Web3Forms' encrypted API</li>
              <li>No sensitive personal data (passwords, financial data, health data) is collected</li>
              <li>Access to inquiry data is limited to authorized ShubhzTechWork personnel</li>
            </ul>
          </section>

          {/* 8 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">8. Your Rights</h2>
            <p>
              Under the Digital Personal Data Protection Act, 2023 (India) and applicable international regulations, you
              have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access</strong> — Request confirmation of what data we hold about you</li>
              <li><strong>Correction</strong> — Request correction of inaccurate data</li>
              <li><strong>Erasure</strong> — Request deletion of your data</li>
              <li><strong>Grievance redressal</strong> — Submit a complaint to us; if unresolved, escalate to the Data Protection Board of India</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at{' '}
              <a href="mailto:info@shubhztechwork.com" className="text-primary hover:underline">
                info@shubhztechwork.com
              </a>. We will respond within 30 days.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">9. Cross-Border Data Transfers</h2>
            <p>
              Our third-party service providers (Web3Forms, GitHub Pages) are based in the United States. By using this
              Website and submitting the contact form, you acknowledge that your data may be processed outside India.
              These transfers comply with the provisions of the Digital Personal Data Protection Act, 2023.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">10. Children's Privacy</h2>
            <p>
              This Website is not directed at individuals under the age of 18. We do not knowingly collect personal data
              from minors. If you are under 18, please do not submit the contact form without parental consent.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised
              "Last Updated" date. We encourage you to review this page periodically.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to exercise your data rights, contact us:
            </p>
            <ul className="list-none pl-0 space-y-1 mt-3">
              <li><strong>ShubhzTechWork</strong></li>
              <li>Mumbai, Maharashtra, India</li>
              <li>
                Email:{' '}
                <a href="mailto:info@shubhztechwork.com" className="text-primary hover:underline">
                  info@shubhztechwork.com
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
