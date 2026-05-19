import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const LAST_UPDATED = 'May 13, 2026'
const S = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-body)' }}>{title}</h2>
    <div className="space-y-3 text-sm leading-relaxed" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>{children}</div>
  </section>
)

export default function EulaPage() {
  return (
    <div style={{ background: 'var(--bg)' }}>
      <Navbar />
      <div className="pt-24">
        <div className="relative py-16 overflow-hidden" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.10) 0%, transparent 70%)' }} />
          <div className="container relative z-10 max-w-3xl">
            <div className="badge badge-violet mb-4 inline-flex">Legal</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-body)' }}>
              End User Licence Agreement
            </h1>
            <p className="mb-1" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)', fontSize: 14 }}>EULA — Vexen Labs Desktop Software</p>
            <p style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>Last updated: {LAST_UPDATED}</p>
          </div>
        </div>

        <div className="container max-w-3xl py-16">

          <div className="card-glass p-5 mb-10 text-sm" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>
            <strong className="text-white">IMPORTANT:</strong> This End User Licence Agreement (&quot;EULA&quot;) is a legal
            agreement between you (&quot;Licensee&quot;) and Vexen Labs (&quot;Licensor&quot;) for the use of our desktop software
            products. By installing or using the software, you agree to the terms of this EULA. If you do not agree,
            do not install or use the software and contact us within 7 days for a refund.
          </div>

          <S title="1. Grant of Licence">
            <p>
              Subject to the terms of this EULA and payment of the applicable licence fee, Vexen Labs grants you a
              non-exclusive, non-transferable, perpetual licence to install and use the software on the number of
              devices permitted by your purchased plan:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-white">Starter:</strong> 1 device</li>
              <li><strong className="text-white">Professional:</strong> 3 devices</li>
              <li><strong className="text-white">Enterprise:</strong> 10 devices</li>
            </ul>
            <p>
              A &quot;device&quot; means one physical or virtual machine. Using the software in a virtualised or containerised
              environment counts as one device per running instance.
            </p>
          </S>

          <S title="2. Restrictions">
            <p>You must not, and must not permit others to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Copy, modify, adapt, translate, or create derivative works of the software.</li>
              <li>Reverse engineer, decompile, disassemble, or attempt to derive the source code.</li>
              <li>Sell, resell, sublicence, rent, lease, lend, or transfer the software or licence key to any third party.</li>
              <li>Use the software to provide a hosted or managed service to third parties (SaaS).</li>
              <li>Remove, alter, or obscure any copyright, trademark, or proprietary notices.</li>
              <li>Use the software to build a product that competes with any Vexen Labs product.</li>
              <li>Circumvent licence protection mechanisms, including device activation limits.</li>
              <li>Share licence keys publicly (e.g. on forums, GitHub, social media).</li>
            </ul>
          </S>

          <S title="3. Intellectual Property">
            <p>
              The software, including all source code, object code, interfaces, documentation, graphics, and
              all other components, is owned by Vexen Labs and is protected by copyright law and international
              treaties. This EULA grants you a licence to use the software; it does not transfer ownership
              of the software or any intellectual property rights.
            </p>
          </S>

          <S title="4. Licence Key and Activation">
            <p>
              The software requires activation with a valid licence key obtained from Vexen Labs. Your licence
              key is personal and tied to your account. You are responsible for keeping your licence key
              confidential. Internet connectivity is required only for initial activation and periodic validity
              checks (every 30 days). All other functionality is fully offline.
            </p>
            <p>
              If a licence key is used on more devices than permitted, Vexen Labs reserves the right to revoke
              the key. You may deactivate devices via your customer dashboard to free up slots.
            </p>
          </S>

          <S title="5. Updates and Maintenance">
            <p>
              Vexen Labs may provide updates, patches, and new versions of the software during the included
              update period. Updates are optional but recommended for security and stability. Vexen Labs has
              no obligation to provide updates beyond the included update period.
            </p>
          </S>

          <S title="6. Data and Privacy">
            <p>
              All data you enter into the software is stored locally on your device. Vexen Labs does not access,
              collect, or process any data you enter into the software. See our{' '}
              <a href="/privacy" className="underline" style={{ color: 'var(--violet-l)' }}>Privacy Policy</a> for
              information about data collected by our website and licence server.
            </p>
          </S>

          <S title="7. Disclaimer of Warranties">
            <p>
              The software is provided &quot;as is&quot; without warranty of any kind. Vexen Labs disclaims all
              warranties, express or implied, including warranties of merchantability, fitness for a particular
              purpose, and non-infringement. Vexen Labs does not warrant that the software will be uninterrupted,
              error-free, or free of harmful components.
            </p>
          </S>

          <S title="8. Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable law, Vexen Labs shall not be liable for any indirect,
              incidental, special, consequential, punitive, or exemplary damages, including loss of profits, data,
              goodwill, or business interruption. Vexen Labs' total liability under this EULA shall not exceed the
              licence fee paid for the relevant software product in the twelve months preceding the claim.
            </p>
          </S>

          <S title="9. Termination">
            <p>
              This EULA is effective until terminated. Vexen Labs may terminate this EULA immediately and revoke
              your licence if you breach any term. Upon termination, you must uninstall the software and destroy
              all copies. Sections 2, 3, 7, 8, 9, and 10 survive termination.
            </p>
          </S>

          <S title="10. Governing Law">
            <p>
              This EULA is governed by and construed in accordance with the laws of India. Any disputes arising
              under this EULA shall be subject to the exclusive jurisdiction of the courts of India.
            </p>
          </S>

          <S title="11. Entire Agreement">
            <p>
              This EULA, together with the Terms of Service and Privacy Policy at vexenlabs.com, constitutes
              the entire agreement between you and Vexen Labs regarding the software and supersedes all prior
              agreements and understandings.
            </p>
          </S>

          <S title="12. Contact">
            <p>
              For EULA queries: <strong className="text-white">support@vexenlabs.com</strong>
            </p>
          </S>
        </div>
      </div>
      <Footer />
    </div>
  )
}