import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const LAST_UPDATED = 'May 13, 2026'

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-body)' }}>{title}</h2>
    <div className="space-y-3 text-sm leading-relaxed" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>
      {children}
    </div>
  </section>
)

export default function PrivacyPage() {
  return (
    <div style={{ background: 'var(--bg)' }}>
      <Navbar />
      <div className="pt-24">
        {/* Hero */}
        <div className="relative py-16 overflow-hidden" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.10) 0%, transparent 70%)' }} />
          <div className="container relative z-10 max-w-3xl">
            <div className="badge badge-violet mb-4 inline-flex">Legal</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-body)' }}>
              Privacy Policy
            </h1>
            <p style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </div>

        <div className="container max-w-3xl py-16">
          <Section title="1. Who We Are">
            <p>
              Vexen Labs (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website vexenlabs.com and sells
              offline desktop software products. This Privacy Policy explains how we collect, use, and protect your
              personal information when you visit our website or purchase our software.
            </p>
            {/* ── ⚠ FILL IN ── */}
            <p className="p-3 rounded-lg" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', color: '#FCD34D' }}>
              📍 Registered address: [YOUR REGISTERED BUSINESS ADDRESS] · GST IN: [YOUR GSTIN IF APPLICABLE]
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We collect the following categories of information:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-white">Account information:</strong> Name, email address, and password when you register.</li>
              <li><strong className="text-white">Purchase information:</strong> Order details, payment method type, billing address. We do not store full card numbers — payments are processed by Razorpay.</li>
              <li><strong className="text-white">License activation data:</strong> Device identifiers and IP address at the time of license activation, to enforce per-device limits.</li>
              <li><strong className="text-white">Usage data:</strong> Pages visited, browser type, and referral source collected via server logs for analytics.</li>
              <li><strong className="text-white">Communications:</strong> Messages you send us via the contact form or email.</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To process and fulfil your software orders and deliver license keys.</li>
              <li>To manage your account and customer dashboard.</li>
              <li>To enforce license terms (device activation limits, expiry dates).</li>
              <li>To send transactional emails: order confirmation, license delivery, invoice, and password reset.</li>
              <li>To respond to your support and sales enquiries.</li>
              <li>To improve our website and products based on aggregated usage analytics.</li>
              <li>To comply with legal obligations (tax records, fraud prevention).</li>
            </ul>
            <p>We do <strong className="text-white">not</strong> sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </Section>

          <Section title="4. Our Software and Your Data">
            <p>
              Our desktop software runs <strong className="text-white">entirely on your local machine</strong>. All data you enter
              into the software (patient records, student data, inventory, accounts) is stored in a local database on
              your device. Vexen Labs does not have access to, and does not collect, any data you enter into the software.
            </p>
            <p>
              The only time our software communicates with our servers is for:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Initial license key activation (one-time)</li>
              <li>Periodic license validity checks (every 30 days, if internet is available)</li>
              <li>Optional software update checks</li>
            </ul>
          </Section>

          <Section title="5. Third-Party Services">
            <p>We use the following third-party services which have their own privacy policies:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-white">Razorpay</strong> — Payment processing. See <a href="https://razorpay.com/privacy/" className="underline" target="_blank" rel="noopener noreferrer">razorpay.com/privacy</a></li>
              <li><strong className="text-white">Google Fonts</strong> — Font delivery via CDN.</li>
            </ul>
          </Section>

          <Section title="6. Data Retention">
            <p>
              We retain your account and purchase records for as long as your account is active, or as required by
              applicable tax and accounting law (typically 7 years in India). License activation logs are retained
              for the duration of your license. You may request deletion of your account data at any time (see Section 8).
            </p>
          </Section>

          <Section title="7. Security">
            <p>
              We use industry-standard security measures including TLS/HTTPS for all data transmission, bcrypt password
              hashing, JWT-based authentication with short-lived tokens, and AES-256 encryption for sensitive stored data.
              No method of transmission over the internet is 100% secure; we cannot guarantee absolute security but
              commit to reasonable industry-standard protections.
            </p>
          </Section>

          <Section title="8. Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-white">Access</strong> the personal data we hold about you.</li>
              <li><strong className="text-white">Correct</strong> inaccurate data via your dashboard or by emailing us.</li>
              <li><strong className="text-white">Delete</strong> your account and associated personal data (except records we are legally required to retain).</li>
              <li><strong className="text-white">Object</strong> to processing of your data for marketing.</li>
              <li><strong className="text-white">Portability</strong> — request an export of your data in a machine-readable format.</li>
            </ul>
            <p>To exercise any of these rights, email <strong className="text-white">support@vexenlabs.com</strong> with the subject "Data Request". We will respond within 30 days.</p>
          </Section>

          <Section title="9. Cookies">
            <p>
              We use minimal, essential cookies only: a session cookie to keep you logged in, and a CSRF token for
              security. We do not use third-party tracking cookies or advertising pixels.
            </p>
          </Section>

          <Section title="10. Children's Privacy">
            <p>
              Our website and services are intended for users aged 18 and above. We do not knowingly collect personal
              information from children under 18. If you believe a minor has created an account, please contact us
              immediately and we will delete it.
            </p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will notify registered users of significant
              changes by email. The "Last Updated" date at the top of this page will always reflect the current version.
              Continued use of our services after changes constitutes acceptance of the revised policy.
            </p>
          </Section>

          <Section title="12. Contact Us">
            <p>
              For privacy-related questions or requests, contact us at:<br />
              <strong className="text-white">Email:</strong> support@vexenlabs.com<br />
              <strong className="text-white">Subject line:</strong> Privacy — [your request]
            </p>
          </Section>
        </div>
      </div>
      <Footer />
    </div>
  )
}