'use client'
import { ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, Mail } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface Props {
  title: string
  subtitle?: string
  effectiveDate: string
  children: ReactNode
}

export default function LegalPage({ title, subtitle, effectiveDate, children }: Props) {
  return (
    <div style={{ background: 'var(--bg)' }}>
      <Navbar />
      <div className="pt-24 pb-20 min-h-screen">
        {/* Breadcrumb */}
        <div className="container py-6">
          <nav className="flex items-center gap-2 text-xs"
            style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: 'var(--violet-l)' }}>{title}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="relative pb-12">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 60%)' }} />
          <div className="container relative z-10">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <p className="badge badge-violet mb-4 inline-flex">Legal</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight"
                style={{ fontFamily: 'var(--font-body)' }}>
                {title}
              </h1>
              {subtitle && (
                <p className="text-lg mb-3" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>
                  {subtitle}
                </p>
              )}
              <p className="text-xs uppercase tracking-wider"
                style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                Effective {effectiveDate}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-16">
          <div className="container max-w-3xl">
            <div className="card-glass p-8 md:p-10 legal-content">
              {children}
            </div>

            {/* Contact callout */}
            <div className="mt-8 p-6 rounded-2xl flex items-center gap-4 flex-wrap"
              style={{ background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.2)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(124,58,237,0.15)' }}>
                <Mail className="w-5 h-5" style={{ color: '#A78BFA' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white" style={{ fontFamily: 'var(--font-body)' }}>
                  Questions about this policy?
                </p>
                <p className="text-sm" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>
                  Email us at <a href="mailto:legal@vexenlabs.com" className="underline" style={{ color: 'var(--violet-l)' }}>legal@vexenlabs.com</a>
                </p>
              </div>
              <Link href="/contact" className="btn-ghost text-sm py-2.5 px-5">Contact Us</Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      {/* Inline styles for legal content */}
      <style jsx global>{`
        .legal-content { font-family: var(--font-body); color: var(--text-2); line-height: 1.75; }
        .legal-content h2 {
          color: white; font-weight: 700; font-size: 1.35rem; margin-top: 2.25rem; margin-bottom: 0.75rem;
          padding-top: 1.5rem; border-top: 1px solid var(--border);
        }
        .legal-content h2:first-child { margin-top: 0; padding-top: 0; border-top: none; }
        .legal-content h3 { color: white; font-weight: 600; font-size: 1.05rem; margin-top: 1.5rem; margin-bottom: 0.5rem; }
        .legal-content p { margin-bottom: 1rem; }
        .legal-content ul, .legal-content ol { margin-left: 1.25rem; margin-bottom: 1rem; }
        .legal-content li { margin-bottom: 0.5rem; }
        .legal-content ul li { list-style: disc; }
        .legal-content ol li { list-style: decimal; }
        .legal-content a { color: var(--violet-l); text-decoration: underline; }
        .legal-content a:hover { color: white; }
        .legal-content strong { color: white; font-weight: 600; }
        .legal-content code {
          font-family: var(--font-mono); font-size: 0.85em;
          background: rgba(124,58,237,0.1); color: var(--violet-l);
          padding: 2px 8px; border-radius: 6px;
        }
      `}</style>
    </div>
  )
}