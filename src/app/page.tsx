'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight, Check, Star, Shield, Zap, Globe, Lock,
  Download, Clock, HeadphonesIcon, ChevronDown, ChevronUp,
  Sparkles, Users, Award, TrendingUp, Package
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { productsAPI } from '@/lib/api'

// ── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = to / 50
    const t = setInterval(() => {
      start += step
      if (start >= to) { setN(to); clearInterval(t) } else setN(Math.floor(start))
    }, 20)
    return () => clearInterval(t)
  }, [inView, to])
  return <span ref={ref}>{prefix}{n.toLocaleString()}{suffix}</span>
}

// ── Section heading ────────────────────────────────────────────────────────────
function SectionHead({ badge, title, sub }: { badge?: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center mb-16">
      {badge && <div className="badge badge-violet mb-5 inline-flex">{badge}</div>}
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: 'var(--font-body)' }}>
        {title}
      </h2>
      {sub && <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>{sub}</p>}
    </div>
  )
}

const PRODUCTS = [
  {
    emoji: '🏫', slug: 'school-erp', name: 'School Management ERP',
    tagline: 'Run an entire school from one screen.',
    desc: 'Admissions, attendance, fees, exams, library, timetables — complete school administration without the chaos.',
    tags: ['Admissions', 'Attendance', 'Fee Collection', 'Examinations', 'Library'],
    price: '4,999', badge: null, color: 'from-blue-500/20 to-violet-500/20',
  },
  {
    emoji: '🏥', slug: 'clinic-manager', name: 'Clinic Manager Pro',
    tagline: 'Your clinic, fully digital. Finally.',
    desc: 'Patient records, SOAP notes, prescriptions, appointment scheduling, and billing — built for modern practitioners.',
    tags: ['OPD Management', 'Prescriptions', 'Appointments', 'Billing'],
    price: '7,999', badge: 'Most Popular', color: 'from-violet-500/20 to-pink-500/20',
  },
  {
    emoji: '💊', slug: 'medical-store', name: 'Medical Store ERP',
    tagline: 'Smarter inventory. Zero wastage.',
    desc: 'FEFO inventory management, GST-compliant billing, expiry alerts, barcode scanning, and a lightning-fast POS.',
    tags: ['FEFO Inventory', 'GST Billing', 'Barcode POS', 'Expiry Alerts'],
    price: '3,499', badge: null, color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    emoji: '📊', slug: 'accounting', name: 'BharatBooks Accounting',
    tagline: 'Accounting without the accountant fees.',
    desc: 'GST invoicing, expense tracking, P&L reports, bank reconciliation — the Tally alternative you\'ve been waiting for.',
    tags: ['GST Invoicing', 'P&L Reports', 'Bank Recon', 'GSTR Export'],
    price: '2,999', badge: null, color: 'from-amber-500/20 to-orange-500/20',
  },
]

const FEATURES = [
  { icon: Lock,     title: 'Truly Offline',     desc: 'Works with zero internet. Your data lives on your machine — not our cloud.' },
  { icon: Zap,      title: 'Native Performance', desc: 'Built with Spring Boot + JavaFX for desktop-grade speed. No browser lag.' },
  { icon: Shield,   title: 'Bank-Grade Security', desc: 'AES-256 encrypted storage. JWT tokens. HMAC payment verification.' },
  { icon: Globe,    title: 'Works Everywhere',    desc: 'Windows, macOS, Linux. Deploy anywhere in the world.' },
  { icon: Download, title: 'Instant Delivery',    desc: 'Pay → License key in seconds → Download → Install. Under 10 minutes total.' },
  { icon: HeadphonesIcon, title: '24/7 Support',  desc: 'Real humans, real answers. Not a chatbot. Response within 4 hours.' },
]

const TESTIMONIALS = [
  { name: 'Dr. Sarah Chen', role: 'Principal', company: 'Westbrook Academy, Singapore', rating: 5, initials: 'SC', content: 'We evaluated 12 school management systems. Vexen Labs was the only one that worked offline without compromise. Our fee collection time dropped from 4 hours to 18 minutes.' },
  { name: 'Mohammed Al-Rashid', role: 'Pharmacist', company: 'Al-Shifa Medical, Dubai', rating: 5, initials: 'MR', content: 'The FEFO inventory system alone saved us over $8,000 in expired stock in the first year. The ROI was immediate. I wish I found this sooner.' },
  { name: 'Dr. Priya Nair', role: 'General Physician', company: 'Nair Clinic, Bangalore', rating: 5, initials: 'PN', content: 'I see 60+ patients daily. Clinic Manager cut my prescription time in half. The offline capability is a game-changer in areas with unstable internet.' },
]

const FAQS = [
  { q: 'Does the software work without internet?', a: 'Yes — completely. All our software is offline-first. The database runs embedded on your machine. Internet is only needed for the initial license activation and optional updates every 30 days.' },
  { q: 'How does licensing work across multiple devices?', a: 'Each plan specifies device limits: Starter (1 device), Professional (3 devices), Enterprise (10 devices). You manage activations from your dashboard — deactivate old machines and activate new ones anytime.' },
  { q: 'What operating systems are supported?', a: 'Windows 10/11, macOS 12 Monterey and later, and Ubuntu 20.04+. Our installer bundles Java 21 — no separate Java installation needed on customer machines.' },
  { q: 'Is this a one-time purchase or subscription?', a: 'Strictly one-time. You pay once and own the software. Free updates are included for 1-2 years depending on your plan. After that, the software continues working — you can optionally upgrade at a discounted rate.' },
  { q: 'What currencies and payment methods do you accept?', a: 'USD, EUR, GBP, INR, AED, and 30+ currencies. We accept Visa, Mastercard, PayPal, UPI, and bank transfers. All transactions are secured by Razorpay with 256-bit encryption.' },
  { q: 'Do you offer refunds?', a: 'Yes — 7-day no-questions refund guarantee. If the software doesn\'t work on your system or doesn\'t meet your needs, email us within 7 days for a full refund. No complex forms, no delays.' },
]

export default function HomePage() {
  const [faqs, setFaqs] = useState<number | null>(null)
  const [products, setProducts] = useState(PRODUCTS)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, -80])

  useEffect(() => {
    productsAPI.list({ page_size: 4 })
      .then(res => {
        const data = res.data.results || res.data
        if (Array.isArray(data) && data.length > 0) {
          // merge API data into our styled products
        }
      }).catch(() => {})
  }, [])

  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-screen">
      <Navbar />

      {/* ════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">

        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
            style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
            style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.06] blur-[150px]"
            style={{ background: 'radial-gradient(circle, #F59E0B, transparent)' }} />

          {/* Grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />

          {/* Floating product previews */}
          <motion.div style={{ y: heroY }}
            className="absolute right-8 top-32 hidden xl:block"
            animate={{ y: [-8, 8, -8] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="card-glass p-5 w-64 shadow-2xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🏫</span>
                <div>
                  <p className="text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-body)' }}>School ERP</p>
                  <p className="text-xs" style={{ color: 'var(--text-3)' }}>342 students enrolled</p>
                </div>
              </div>
              <div className="flex gap-2 mb-3">
                {['Attendance', 'Fees', 'Exams'].map(t => (
                  <span key={t} className="badge badge-violet text-[9px] px-2 py-1">{t}</span>
                ))}
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div className="h-full w-4/5 rounded-full" style={{ background: 'linear-gradient(90deg, #7C3AED, #4338CA)' }} />
              </div>
              <p className="text-[10px] mt-1.5" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>Fee collection 94% complete</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute left-8 bottom-32 hidden xl:block"
            animate={{ y: [8, -8, 8] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="card-glass p-4 w-52 shadow-2xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white" style={{ fontFamily: 'var(--font-body)' }}>License Active</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-3)' }}>Professional Plan</p>
                </div>
              </div>
              <div className="badge badge-emerald text-[10px] w-full justify-center">✓ 3 devices activated</div>
            </div>
          </motion.div>
        </div>

        {/* Hero content */}
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">

            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="badge badge-amber mb-8 inline-flex gap-2">
                <Sparkles className="w-3 h-3" />
                Trusted by 500+ businesses in 30+ countries
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.02] tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Software you{' '}
              <span className="display italic" style={{
                fontFamily: 'var(--font-display)',
                background: 'linear-gradient(135deg, #C4B5FD, #7C3AED, #4338CA)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>own</span>.
              <br />
              <span style={{ color: 'var(--text-2)' }}>Not rent.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
              style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}
            >
              Vexen Labs builds powerful offline-first desktop software for schools, clinics, medical stores, and businesses.
              <strong className="text-white"> Pay once. Own forever.</strong> No subscriptions, no cloud dependency, no surprises.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/products" className="btn-amber text-base px-8 py-4 font-bold">
                Explore All Software <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/about" className="btn-ghost text-base px-8 py-4">
                How it works
              </Link>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm"
              style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}
            >
              {[
                '🔒 256-bit encryption',
                '♾️ Lifetime license',
                '↩️ 7-day money back',
                '🌍 Ships worldwide',
                '📴 100% offline capable',
              ].map(t => <span key={t}>{t}</span>)}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ color: 'var(--text-3)' }}
        >
          <span className="text-xs" style={{ fontFamily: 'var(--font-mono)' }}>scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          STATS BAR
      ════════════════════════════════════════════════════════════ */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-2)' }} className="py-14">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 500,  suffix: '+', label: 'Businesses Worldwide',   sub: 'across 30+ countries' },
              { value: 1200, suffix: '+', label: 'Licenses Delivered',      sub: 'and counting' },
              { value: 99,   suffix: '.9%', label: 'Uptime Guaranteed',     sub: 'offline-first design' },
              { value: 7,    suffix: '-day', prefix: '', label: 'Refund Policy', sub: 'no questions asked' },
            ].map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl font-bold mb-1 grad-violet" style={{ fontFamily: 'var(--font-body)' }}>
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <p className="font-semibold text-white text-sm mb-0.5" style={{ fontFamily: 'var(--font-body)' }}>{s.label}</p>
                <p className="text-xs" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          PRODUCTS
      ════════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <SectionHead
            badge="Our Software"
            title={<>Everything your business needs,<br /><span className="grad-violet">in one purchase.</span></>}
            sub="Professional-grade desktop applications built for real-world business operations. No SaaS. No recurring fees. Just powerful software you own."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRODUCTS.map((p, i) => (
              <motion.div key={p.slug}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card-product p-8"
              >
                {p.badge && (
                  <div className="absolute top-5 right-5 badge badge-amber">{p.badge}</div>
                )}

                {/* Gradient bg on card */}
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl`} />

                <div className="relative">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="text-5xl">{p.emoji}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-body)' }}>{p.name}</h3>
                      <p className="font-medium" style={{ color: 'var(--violet-l)', fontFamily: 'var(--font-body)' }}>{p.tagline}</p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>{p.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map(t => <span key={t} className="badge badge-violet text-[10px]">{t}</span>)}
                  </div>

                  <div className="flex items-center justify-between pt-5" style={{ borderTop: '1px solid var(--border)' }}>
                    <div>
                      <div className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-body)' }}>
                        Starting ₹{p.price}
                        <span className="text-sm font-normal ml-1" style={{ color: 'var(--text-3)' }}>+tax</span>
                      </div>
                      <p className="text-xs" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>one-time · lifetime license</p>
                    </div>
                    <Link href={`/products/${p.slug}`} className="btn-primary text-sm py-2.5 px-5">
                      View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/products" className="btn-ghost">
              View all products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          WHY VEXEN LABS — FEATURES
      ════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <SectionHead
            badge="Why Vexen Labs"
            title={<>Built different.<br /><span className="grad-multi">By design.</span></>}
            sub="We made choices most software companies are too afraid to make. Here's what that means for you."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="card-glass p-6 group"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all group-hover:scale-110"
                  style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.2)' }}>
                  <f.icon className="w-5 h-5" style={{ color: 'var(--violet-l)' }} />
                </div>
                <h3 className="font-bold text-white mb-2" style={{ fontFamily: 'var(--font-body)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container max-w-4xl">
          <SectionHead
            badge="How it works"
            title={<>From purchase to running<br /><span className="grad-amber">in under 10 minutes.</span></>}
          />

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[28px] md:left-1/2 top-12 bottom-12 w-px hidden md:block"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(124,58,237,0.4), transparent)' }} />

            <div className="space-y-8">
              {[
                { n: '01', icon: Package,  title: 'Choose your software', desc: 'Browse our catalog. Every product page has full feature lists, screenshots, system requirements, and pricing plans. Pick the plan that fits your team size.' },
                { n: '02', icon: Shield,   title: 'Secure checkout',       desc: 'Pay via Visa, Mastercard, PayPal, UPI, or bank transfer. All transactions are encrypted. GST/VAT invoices generated instantly.' },
                { n: '03', icon: Zap,      title: 'Instant license delivery', desc: 'Your license key appears in your dashboard within seconds of payment confirmation. A copy is also emailed to you.' },
                { n: '04', icon: Download, title: 'Download & activate',   desc: 'Download the installer (Java runtime included — no separate installs). Enter your license key. You\'re running in minutes.' },
              ].map((s, i) => (
                <motion.div key={s.n}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={`flex gap-6 items-start ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold"
                    style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)', color: '#A78BFA', fontFamily: 'var(--font-mono)' }}>
                    {s.n}
                  </div>
                  <div className="card-glass p-6 flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <s.icon className="w-5 h-5" style={{ color: 'var(--violet-l)' }} />
                      <h3 className="font-bold text-white" style={{ fontFamily: 'var(--font-body)' }}>{s.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
{/* ─────────────────────────────────────────────────────────────────────────────
  PASTE THESE TWO SECTIONS INTO src/app/page.tsx

  1. COMPARISON TABLE — paste after the FEATURES section (after "Built different. By design.")
  2. WHATSAPP CTA STRIP — paste before the FINAL CTA section
─────────────────────────────────────────────────────────────────────────────── */}

{/* ════════════════════════════════════════════════════════════
    COMPARISON TABLE  — paste after the Features/Why Vexen section
════════════════════════════════════════════════════════════ */}
<section className="section">
  <div className="container max-w-5xl">
    <SectionHead
      badge="Why not the alternatives?"
      title={<>Vexen Labs vs <span className="grad-multi">the usual suspects.</span></>}
      sub="We're not the cheapest. We're not the flashiest. But here's what you actually get."
    />

    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-glass overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(124,58,237,0.04)' }}>
              <th className="px-6 py-4 text-left font-semibold text-white" style={{ fontFamily: 'var(--font-body)', width: '28%' }}>Feature</th>
              <th className="px-4 py-4 text-center" style={{ fontFamily: 'var(--font-body)', color: 'var(--violet-l)', fontWeight: 700 }}>Vexen Labs</th>
              <th className="px-4 py-4 text-center" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-3)' }}>Tally / Cloud ERP</th>
              <th className="px-4 py-4 text-center" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-3)' }}>Practo / Clinicware</th>
              <th className="px-4 py-4 text-center" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-3)' }}>Generic SaaS</th>
            </tr>
          </thead>
          <tbody>
            {[
              { feature: 'One-time price',            vexen: '✅', tally: '⚠️ Annual renewal', practo: '❌ Monthly fees', saas: '❌ Monthly fees' },
              { feature: 'Works offline (no internet)',vexen: '✅ 100%', tally: '⚠️ Limited', practo: '❌ Cloud-only', saas: '❌ Cloud-only' },
              { feature: 'Your data stays with you',  vexen: '✅ Local DB', tally: '⚠️ Partially', practo: '❌ On their servers', saas: '❌ On their servers' },
              { feature: 'India-specific (GST, UPI)',  vexen: '✅', tally: '✅', practo: '⚠️ Partial', saas: '⚠️ Varies' },
              { feature: 'Works in low-bandwidth areas', vexen: '✅', tally: '⚠️ Partially', practo: '❌', saas: '❌' },
              { feature: 'No per-user pricing',        vexen: '✅ Flat fee', tally: '❌ Per user', practo: '❌ Per doctor', saas: '❌ Per user' },
              { feature: 'Windows + Mac + Linux',      vexen: '✅', tally: '⚠️ Windows only', practo: '⚠️ Web only', saas: '⚠️ Web only' },
              { feature: 'ABHA / ABDM ready',          vexen: '✅ Clinic Manager', tally: '❌', practo: '✅', saas: '⚠️ Varies' },
              { feature: '7-day refund guarantee',     vexen: '✅', tally: '❌', practo: '❌', saas: '⚠️ Varies' },
            ].map((row, i) => (
              <tr key={row.feature} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                <td className="px-6 py-3.5 font-medium" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>{row.feature}</td>
                <td className="px-4 py-3.5 text-center text-sm font-medium" style={{ color: '#86EFAC', fontFamily: 'var(--font-body)' }}>{row.vexen}</td>
                <td className="px-4 py-3.5 text-center text-xs" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>{row.tally}</td>
                <td className="px-4 py-3.5 text-center text-xs" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>{row.practo}</td>
                <td className="px-4 py-3.5 text-center text-xs" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>{row.saas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  </div>
</section>


{/* ════════════════════════════════════════════════════════════
    WHATSAPP CTA STRIP — paste just before the FINAL CTA section
════════════════════════════════════════════════════════════ */}
<section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
  <div className="container py-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row items-center justify-between gap-6"
    >
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)' }}>
          {/* WhatsApp icon */}
          <svg className="w-7 h-7" style={{ color: '#25D366' }} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
        <div>
          <p className="font-bold text-white text-lg" style={{ fontFamily: 'var(--font-body)' }}>
            Have a question? Chat with us on WhatsApp.
          </p>
          <p className="text-sm" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
            Mon–Sat, 9AM–6PM IST · Typically replies within 1 hour · Support in English & Hindi
          </p>
        </div>
      </div>
      <a
        href="https://wa.me/YOURNUMBER?text=Hi%20Vexen%20Labs%2C%20I%20have%20a%20question%20about%20your%20software."
        target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-2.5 font-bold text-white px-8 py-4 rounded-2xl flex-shrink-0 transition-all hover:scale-105"
        style={{ background: '#25D366', fontSize: 15, fontFamily: 'var(--font-body)' }}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Chat on WhatsApp
      </a>
    </motion.div>
  </div>
</section>
      {/* ════════════════════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <SectionHead
            badge="Customer Stories"
            title={<>Real businesses.<br /><span className="grad-violet">Real results.</span></>}
            sub="Don't take our word for it. Here's what our customers are saying."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className="card-glass p-7 flex flex-col"
              >
                <div className="flex gap-1 mb-5">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white"
                    style={{ background: 'linear-gradient(135deg, #7C3AED, #4338CA)', fontFamily: 'var(--font-body)' }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-body)' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          PRICING CALLOUT
      ════════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0F0A24 0%, #0C0C1A 50%, #0A0F24 100%)', border: '1px solid rgba(124,58,237,0.2)' }}
          >
            {/* BG decorations */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-[80px] opacity-20"
                style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-[80px] opacity-15"
                style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }} />
            </div>

            <div className="relative z-10">
              <div className="badge badge-amber mb-6 inline-flex">
                <Award className="w-3 h-3" /> Launch offer — Save up to 40%
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: 'var(--font-body)' }}>
                Simple pricing.<br />
                <span className="grad-amber">No surprises. Ever.</span>
              </h2>
              <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>
                Every product comes with Starter, Professional, and Enterprise plans. All plans include lifetime software access and free updates for the first 1-2 years.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
                {[
                  { plan: 'Starter',      desc: '1 device · 1 year updates · Email support',     color: 'var(--border)' },
                  { plan: 'Professional', desc: '3 devices · 2 year updates · Priority support',  color: 'rgba(124,58,237,0.4)', highlight: true },
                  { plan: 'Enterprise',   desc: '10 devices · Lifetime updates · Dedicated CSM', color: 'var(--border)' },
                ].map(p => (
                  <div key={p.plan} className="p-4 rounded-2xl text-left"
                    style={{ border: `1px solid ${p.color}`, background: p.highlight ? 'rgba(124,58,237,0.08)' : 'rgba(255,255,255,0.02)' }}>
                    {p.highlight && <div className="badge badge-violet text-[9px] mb-2">Most chosen</div>}
                    <p className="font-bold text-white text-sm mb-1" style={{ fontFamily: 'var(--font-body)' }}>{p.plan}</p>
                    <p className="text-xs" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>{p.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products" className="btn-amber text-base px-10 py-4 font-bold">
                  See All Pricing <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="btn-ghost text-base px-10 py-4">
                  Talk to Sales
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="container max-w-3xl">
          <SectionHead
            badge="FAQ"
            title={<>Questions? We have <span className="grad-violet">answers.</span></>}
            sub="Anything else? Email support@vexenlabs.com — we respond within 4 hours."
          />

          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="card-glass overflow-hidden"
              >
                <button onClick={() => setFaqs(faqs === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4">
                  <span className="font-medium text-white" style={{ fontFamily: 'var(--font-body)' }}>{f.q}</span>
                  {faqs === i
                    ? <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--violet-l)' }} />
                    : <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--text-3)' }} />}
                </button>
                <AnimatePresence>
                  {faqs === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed"
                        style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)', borderTop: '1px solid var(--border)' }}>
                        <span className="block pt-4">{f.a}</span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-6xl mb-6">🚀</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: 'var(--font-body)' }}>
              Stop paying monthly.<br />
              <span className="grad-violet">Start owning forever.</span>
            </h2>
            <p className="text-lg mb-10" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>
              Join 500+ businesses worldwide who chose to own their software instead of renting it.
              One payment. Lifetime access. No strings attached.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/products" className="btn-amber text-base px-10 py-4 font-bold">
                Browse All Software <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/auth/register" className="btn-ghost text-base px-10 py-4">
                Create Free Account
              </Link>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
              No credit card required to create an account · 7-day refund guarantee · Instant license delivery
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
