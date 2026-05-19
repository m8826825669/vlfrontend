'use client'
import { useEffect, useState, useMemo } from 'react'
import { useParams, useRouter, notFound } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Check, Star, Shield, Zap, Download, Award, Loader2,
  ChevronRight, MessageSquare, Play, FileText, ChevronDown, Sparkles,
  Users, Building2, HeartPulse, GraduationCap, IndianRupee, Lock,
  RefreshCw, HeadphonesIcon, Globe, Monitor, Smartphone,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DemoModal, { DemoConfig } from '@/components/DemoModal'
import { productsAPI } from '@/lib/api'
import { useAuthStore } from '@/lib/store'

// ─── Fallback catalog (mirrors /products page) ──────────────────────────────
const FALLBACK_CATALOG: Record<string, any> = {
  'school-erp': {
    id: '1', slug: 'school-erp', name: 'School Management ERP',
    emoji: '🏫', tagline: 'Run an entire school from one screen.',
    description: 'Complete school administration in one desktop app — from admissions to alumni records. Built for Indian schools with offline-first reliability, GST-ready fee management, and zero monthly fees.',
    long_description: 'School Management ERP brings together everything a school office runs on — admissions, attendance, fee collection, exam marks, library, timetables, and parent communication — into one cohesive desktop application. Designed to work even when your internet is unreliable, with local data storage and optional cloud sync.',
    category: { slug: 'education', name: 'Education' },
    starting_price: '4999',
    rating: 4.9, rating_count: 87, is_featured: false,
    demo_type: 'request',
    tags: ['Admissions', 'Attendance', 'Fees', 'Library', 'Exams', 'Timetable'],
    audience: ['K-12 Schools', 'Coaching Institutes', 'Pre-schools', 'Tuition Centers'],
    features: [
      { icon: 'users', title: 'Student Lifecycle', desc: 'Admissions, transfer certificates, alumni — every student record from entry to exit.' },
      { icon: 'calendar', title: 'Attendance Tracking', desc: 'Class-wise daily attendance with biometric and QR integration support.' },
      { icon: 'wallet', title: 'Fee Management', desc: 'Custom fee structures, GST invoices, partial payments, due reminders.' },
      { icon: 'award', title: 'Exam & Marks', desc: 'Configurable grading, report cards, CBSE/ICSE/State board templates.' },
      { icon: 'book', title: 'Library Module', desc: 'Book catalog, issue-return, fines, member cards with barcode scanning.' },
      { icon: 'clock', title: 'Timetable Builder', desc: 'Drag-drop class timetables with conflict detection and teacher schedules.' },
    ],
    pricing_plans: [
      { id: 'starter', name: 'Starter', price: '4999', features: ['Up to 200 students', 'Single device license', '1 year free updates', 'Email support'], max_devices: 1, is_popular: false },
      { id: 'pro', name: 'Professional', price: '9999', features: ['Unlimited students', '3 device licenses', '2 years free updates', 'Priority support', 'Biometric integration', 'Custom report cards'], max_devices: 3, is_popular: true },
      { id: 'enterprise', name: 'Enterprise', price: '19999', features: ['Unlimited everything', '10 device licenses', 'Lifetime updates', 'Dedicated support', 'Custom branding', 'On-site training (NCR only)'], max_devices: 10, is_popular: false },
    ],
    faqs: [
      { q: 'Does it work offline?', a: 'Yes. All data is stored locally on your machine. You only need internet for license activation and optional cloud sync.' },
      { q: 'Can I migrate from my existing software?', a: 'We support CSV imports for students, teachers, and fee records. Our team can help with one-time migration on Pro and Enterprise plans.' },
      { q: 'Is GST compliant?', a: 'Yes — invoices are generated with proper GST breakup (CGST/SGST/IGST) and HSN codes where applicable.' },
      { q: 'How many computers can I install it on?', a: 'Depends on your plan: Starter (1), Professional (3), Enterprise (10). You can deactivate a device and move the license freely.' },
      { q: 'Do you provide training?', a: 'A complete user manual (PDF + video) is included. Enterprise plan includes on-site training within NCR.' },
    ],
    requirements: { os: 'Windows 10 / 11 (64-bit)', ram: '4 GB minimum, 8 GB recommended', disk: '500 MB free space', other: 'Internet required only for license activation' },
    testimonials: [
      { name: 'Rajesh Sharma', role: 'Principal · St. Mary\'s School, Ghaziabad', text: 'We switched from a subscription tool that cost us ₹3000/month. One-time payment and the software is faster than what we were using.', rating: 5 },
      { name: 'Priya Mehta', role: 'Admin · Brilliant Coaching Center', text: 'Fee collection used to be our biggest headache. Now parents pay online and receipts go out automatically.', rating: 5 },
    ],
  },
  'clinic-manager': {
    id: '2', slug: 'clinic-manager', name: 'Clinic Manager Pro',
    emoji: '🏥', tagline: 'Your clinic, fully digital. Finally.',
    description: 'Patient records, SOAP notes, e-prescriptions, appointments, and billing — built for Indian clinics with ABHA integration and full GST compliance.',
    long_description: 'Clinic Manager Pro is the operating system your clinic actually needs. From patient registration and SOAP notes to e-prescriptions, appointment management, and GST billing — everything works offline and syncs when you\'re back online. ABHA-ready for the National Digital Health Mission.',
    category: { slug: 'healthcare', name: 'Healthcare' },
    starting_price: '7999',
    rating: 4.8, rating_count: 54, is_featured: true,
    demo_type: 'request',
    tags: ['OPD', 'Prescriptions', 'Billing', 'ABHA', 'SOAP Notes'],
    audience: ['General Physicians', 'Dental Clinics', 'Multi-specialty Clinics', 'Diagnostic Centers'],
    features: [
      { icon: 'users', title: 'Patient Records', desc: 'Complete medical history, allergies, vitals, and visit logs — all searchable.' },
      { icon: 'book', title: 'SOAP Notes', desc: 'Structured Subjective-Objective-Assessment-Plan templates by specialty.' },
      { icon: 'award', title: 'E-Prescriptions', desc: 'Drug database with brand-generic mapping, dosage helpers, and print templates.' },
      { icon: 'calendar', title: 'Appointment Scheduler', desc: 'Drag-drop calendar with SMS reminders and double-booking prevention.' },
      { icon: 'wallet', title: 'GST Billing', desc: 'Consultation, procedure, and package billing with proper HSN/SAC codes.' },
      { icon: 'clock', title: 'ABHA Integration', desc: 'Link patient records with their Ayushman Bharat Health Account.' },
    ],
    pricing_plans: [
      { id: 'solo', name: 'Solo', price: '7999', features: ['Single doctor', '1 device license', '1 year updates', 'Email support'], max_devices: 1, is_popular: false },
      { id: 'clinic', name: 'Clinic', price: '14999', features: ['Up to 5 doctors', '3 device licenses', '2 years updates', 'Priority support', 'WhatsApp reminders', 'Custom templates'], max_devices: 3, is_popular: true },
      { id: 'enterprise', name: 'Multi-Branch', price: '29999', features: ['Unlimited doctors', '10 devices', 'Lifetime updates', 'Dedicated support', 'Multi-location sync', 'On-site training'], max_devices: 10, is_popular: false },
    ],
    faqs: [
      { q: 'Is patient data secure?', a: 'All data is encrypted at rest using AES-256 on your local machine. Cloud sync (optional) uses TLS 1.3.' },
      { q: 'Can multiple doctors use it simultaneously?', a: 'Yes. Clinic and Enterprise plans support concurrent multi-user access on a local network.' },
      { q: 'Does it integrate with WhatsApp?', a: 'Yes — appointment reminders, prescription PDFs, and receipts can be sent via WhatsApp on Clinic/Enterprise plans.' },
      { q: 'Is the drug database updated?', a: 'Quarterly updates are pushed automatically during your update window. Database covers 50,000+ Indian drugs.' },
    ],
    requirements: { os: 'Windows 10 / 11 (64-bit)', ram: '4 GB minimum, 8 GB recommended', disk: '1 GB free space', other: 'Internet for license activation and optional cloud sync' },
    testimonials: [
      { name: 'Dr. Anita Kapoor', role: 'GP · Wellness Clinic, Noida', text: 'Switched from a fancy SaaS that kept charging me more every year. This pays for itself in 4 months.', rating: 5 },
      { name: 'Dr. Vikram Singh', role: 'Dentist · Smile Studio', text: 'The SOAP templates saved me hours each week. Prescription printing is finally professional.', rating: 5 },
    ],
  },
  'medical-store': {
    id: '3', slug: 'medical-store', name: 'Medical Store ERP',
    emoji: '💊', tagline: 'Smarter inventory. Zero wastage.',
    description: 'FEFO inventory, GST billing, expiry alerts, barcode scanning, and POS — purpose-built for Indian pharmacies and medical stores.',
    long_description: 'Medical Store ERP brings First-Expiry-First-Out inventory management, drug license tracking, and a fast counter POS interface into one Windows application. Stop losing money to expired stock and stop wasting time on Excel.',
    category: { slug: 'healthcare', name: 'Healthcare' },
    starting_price: '3499',
    rating: 4.7, rating_count: 43, is_featured: false,
    demo_type: 'online',
    demo_url: 'https://demo.vexenlabs.com/medical-store',
    tags: ['FEFO', 'GST', 'Barcode', 'POS', 'Inventory'],
    audience: ['Retail Pharmacies', 'Hospital Pharmacies', 'Surgical Stores', 'Ayurvedic Stores'],
    features: [
      { icon: 'wallet', title: 'FEFO Allocation', desc: 'First-Expiry-First-Out batch picking prevents stale stock from sitting on shelves.' },
      { icon: 'clock', title: 'Expiry Alerts', desc: 'Configurable warnings 30/60/90 days before expiry with returns workflow.' },
      { icon: 'award', title: 'Barcode + POS', desc: 'Fast counter checkout with barcode scanning and strip-unit conversion.' },
      { icon: 'users', title: 'GST Billing', desc: 'CGST/SGST/IGST handling with HSN codes and GSTR-1 export.' },
      { icon: 'book', title: 'Drug License Tracking', desc: 'Maintain DL numbers per supplier with auto-renewal reminders.' },
      { icon: 'calendar', title: 'Reorder Suggestions', desc: 'ML-light algorithm suggests reorder quantities based on velocity.' },
    ],
    pricing_plans: [
      { id: 'starter', name: 'Single Counter', price: '3499', features: ['1 counter', 'Up to 5,000 SKUs', '1 year updates', 'Email support'], max_devices: 1, is_popular: false },
      { id: 'pro', name: 'Multi-Counter', price: '8999', features: ['Up to 3 counters', 'Unlimited SKUs', '2 years updates', 'Priority support', 'Barcode label printing'], max_devices: 3, is_popular: true },
      { id: 'chain', name: 'Chain', price: '19999', features: ['10 counters', 'Multi-store sync', 'Lifetime updates', 'Dedicated support', 'Analytics dashboard'], max_devices: 10, is_popular: false },
    ],
    faqs: [
      { q: 'Does it support barcode printing?', a: 'Yes, on Multi-Counter plan and above. Compatible with most thermal label printers (TSC, Honeywell, Zebra).' },
      { q: 'Can I import my existing stock?', a: 'Yes via CSV. We provide a template and one-time import assistance.' },
      { q: 'GSTR-1 filing supported?', a: 'You can export GSTR-1 JSON ready for upload to the GST portal.' },
    ],
    requirements: { os: 'Windows 10 / 11 (64-bit)', ram: '4 GB minimum', disk: '500 MB free space', other: 'USB barcode scanner recommended for counter use' },
    testimonials: [
      { name: 'Amit Goel', role: 'Owner · Goel Medical Store', text: 'FEFO has saved us from at least ₹50,000 in expired stock this year alone.', rating: 5 },
    ],
  },
  'accounting': {
    id: '4', slug: 'accounting', name: 'BharatBooks Accounting',
    emoji: '📊', tagline: 'Accounting without the accountant fees.',
    description: 'GST invoicing, P&L reports, bank reconciliation, GSTR exports — the no-nonsense Tally alternative for Indian SMBs.',
    long_description: 'BharatBooks gives you everything a small business needs to manage finances: GST-compliant invoicing, expense tracking, bank reconciliation, P&L and balance sheet reports, and ready GSTR-1/3B exports. Familiar, fast, and one-time priced.',
    category: { slug: 'finance', name: 'Finance & Accounting' },
    starting_price: '2999',
    rating: 4.6, rating_count: 31, is_featured: false,
    demo_type: 'trial', trial_days: 14,
    tags: ['GST', 'Invoicing', 'P&L', 'GSTR', 'Bank Recon'],
    audience: ['Small Businesses', 'Traders', 'Consultants', 'Freelancers'],
    features: [
      { icon: 'wallet', title: 'GST Invoicing', desc: 'Generate compliant tax invoices with CGST/SGST/IGST and HSN codes.' },
      { icon: 'book', title: 'Double-Entry Ledger', desc: 'Full double-entry bookkeeping with chart of accounts and journal entries.' },
      { icon: 'award', title: 'P&L + Balance Sheet', desc: 'Live financial reports — drill down from totals to individual entries.' },
      { icon: 'calendar', title: 'Bank Reconciliation', desc: 'Import bank statements (CSV/PDF) and auto-match transactions.' },
      { icon: 'users', title: 'GSTR-1 / 3B Export', desc: 'One-click export of returns in JSON format ready for the GST portal.' },
      { icon: 'clock', title: 'Multi-Currency', desc: 'Invoice in foreign currency with auto exchange rate from RBI reference rates.' },
    ],
    pricing_plans: [
      { id: 'basic', name: 'Basic', price: '2999', features: ['1 company', '1 user', '1 year updates'], max_devices: 1, is_popular: false },
      { id: 'pro', name: 'Professional', price: '5999', features: ['Up to 3 companies', '3 users', '2 years updates', 'Priority support'], max_devices: 3, is_popular: true },
      { id: 'biz', name: 'Business', price: '11999', features: ['Unlimited companies', '10 users', 'Lifetime updates', 'Dedicated support'], max_devices: 10, is_popular: false },
    ],
    faqs: [
      { q: 'How does it compare to Tally?', a: 'Modern UI, native GST workflows, and a one-time price. We don\'t replicate every Tally feature — we focus on what 90% of small businesses actually need.' },
      { q: 'Can my CA access my books remotely?', a: 'Yes — export a portable backup and share it, or use optional cloud sync on Professional/Business plans.' },
    ],
    requirements: { os: 'Windows 10 / 11 (64-bit), macOS 12+', ram: '4 GB minimum', disk: '500 MB free space', other: 'No internet required after activation' },
    testimonials: [
      { name: 'Sunita Verma', role: 'Founder · Verma Traders', text: 'I was paying ₹999/month for invoicing software. BharatBooks paid for itself in 3 months.', rating: 5 },
    ],
  },
  'hrms': {
    id: '5', slug: 'hrms', name: 'HRMS Pro',
    emoji: '👥', tagline: 'Happy teams start with great HR software.',
    description: 'Recruitment, payroll, attendance, leaves, and appraisals — complete HR in one desktop app, designed for Indian compliance.',
    long_description: 'HRMS Pro covers your full employee lifecycle: from applicant tracking through onboarding, attendance, payroll (with PF/ESI/TDS), leave management, and annual appraisals. Built for Indian labor compliance from day one.',
    category: { slug: 'hr', name: 'HR & Payroll' },
    starting_price: '5999',
    rating: 4.5, rating_count: 22, is_featured: false,
    demo_type: 'request',
    tags: ['Payroll', 'Recruitment', 'Leaves', 'PF/ESI', 'Appraisals'],
    audience: ['SMBs (10–250 employees)', 'Startups', 'Manufacturing', 'IT Services'],
    features: [
      { icon: 'users', title: 'Employee Records', desc: 'Complete employee master with documents, statutory IDs, and bank details.' },
      { icon: 'wallet', title: 'Payroll Engine', desc: 'Automated PF, ESI, PT, TDS calculation with Form 16 and salary slips.' },
      { icon: 'calendar', title: 'Leave Management', desc: 'Custom leave types, balances, calendar view, and approval workflows.' },
      { icon: 'clock', title: 'Attendance', desc: 'Biometric/RFID integration, shift management, and overtime tracking.' },
      { icon: 'award', title: 'Recruitment', desc: 'Job postings, applicant tracking, interview scheduling, and offer letters.' },
      { icon: 'book', title: 'Appraisals', desc: 'Configurable performance review cycles with self/manager/peer feedback.' },
    ],
    pricing_plans: [
      { id: 'starter', name: 'Starter', price: '5999', features: ['Up to 25 employees', '1 device', '1 year updates'], max_devices: 1, is_popular: false },
      { id: 'growth', name: 'Growth', price: '11999', features: ['Up to 100 employees', '3 devices', '2 years updates', 'Priority support'], max_devices: 3, is_popular: true },
      { id: 'enterprise', name: 'Enterprise', price: '24999', features: ['Up to 250 employees', '10 devices', 'Lifetime updates', 'Dedicated support', 'Custom workflows'], max_devices: 10, is_popular: false },
    ],
    faqs: [
      { q: 'Does it handle PF/ESI compliance?', a: 'Yes — calculations follow current EPFO and ESIC rules. Return-ready exports for ECR and ESIC challan.' },
      { q: 'Biometric devices supported?', a: 'ZKTeco, eSSL, Realtime, and most devices that expose CSV/Excel logs.' },
    ],
    requirements: { os: 'Windows 10 / 11 (64-bit)', ram: '8 GB recommended', disk: '1 GB free space', other: 'Network access for multi-device sync (Growth+ plans)' },
    testimonials: [],
  },
  'fantasy-sports': {
    id: '6', slug: 'fantasy-sports', name: 'Fantasy Sports Platform',
    emoji: '🏏', tagline: 'Launch your own fantasy sports empire.',
    description: 'Full-stack fantasy sports platform: real-time scoring, wallet, KYC, UPI payments — ready to launch your Dream11 competitor.',
    long_description: 'Everything you need to launch a fantasy sports platform: real-time score ingestion, contest builder, prize distribution, KYC, wallet, UPI integration, and admin dashboard. Web + mobile (PWA) ready.',
    category: { slug: 'gaming', name: 'Gaming & Sports' },
    starting_price: '29999',
    rating: 4.8, rating_count: 12, is_featured: false,
    demo_type: 'request',
    tags: ['Real-time', 'Wallet', 'KYC', 'UPI', 'Contest'],
    audience: ['Sports Tech Startups', 'Fantasy Operators', 'Media Companies'],
    features: [
      { icon: 'clock', title: 'Real-time Scoring', desc: 'Live cricket/football scoring with sub-second leaderboard updates.' },
      { icon: 'wallet', title: 'Wallet & Payouts', desc: 'In-app wallet, UPI deposits, RTGS/IMPS withdrawals with auto-reconciliation.' },
      { icon: 'users', title: 'KYC Workflow', desc: 'PAN/Aadhaar verification with manual review queue and AML flags.' },
      { icon: 'award', title: 'Contest Builder', desc: 'Public, private, head-to-head, and mega contests with custom prize structures.' },
      { icon: 'book', title: 'Admin Dashboard', desc: 'Live ops view: active users, contest fill rates, revenue, fraud signals.' },
      { icon: 'calendar', title: 'Notifications', desc: 'Push, SMS, email engines with templated campaigns and triggered messages.' },
    ],
    pricing_plans: [
      { id: 'license', name: 'Source License', price: '29999', features: ['Full source code', '1 deployment', 'Self-hosted', '3 months support'], max_devices: 1, is_popular: true },
      { id: 'managed', name: 'Managed Setup', price: '79999', features: ['Source + deployment', 'Custom branding', '6 months support', '5 enhancement requests'], max_devices: 1, is_popular: false },
    ],
    faqs: [
      { q: 'Is this legally compliant in India?', a: 'Fantasy sports is regulated state-by-state in India. We provide the platform — you are responsible for legal compliance and licensing in your operating states.' },
      { q: 'Can I customize the branding?', a: 'Yes. The Managed plan includes full white-labeling. The Source license lets you customize freely.' },
    ],
    requirements: { os: 'Linux server (Ubuntu 22.04+ recommended)', ram: '8 GB+ for production', disk: '50 GB SSD', other: 'PostgreSQL 14+, Redis 7+, Node.js 20+' },
    testimonials: [],
  },
}

const RELATED_BY_CATEGORY: Record<string, string[]> = {
  education: ['school-erp'],
  healthcare: ['clinic-manager', 'medical-store'],
  finance: ['accounting'],
  hr: ['hrms'],
  gaming: ['fantasy-sports'],
}

const ICON_MAP: any = {
  users: Users, calendar: GraduationCap, wallet: IndianRupee, award: Award,
  book: FileText, clock: RefreshCw,
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = (params?.slug as string) || ''
  const { isAuthenticated } = useAuthStore()

  const [product, setProduct] = useState<any>(FALLBACK_CATALOG[slug] || null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'features'|'requirements'|'faq'>('features')
  const [activeFAQ, setActiveFAQ] = useState<number | null>(0)
  const [selectedPlan, setSelectedPlan] = useState<string>('')
  const [demoOpen, setDemoOpen] = useState(false)

  useEffect(() => {
    if (!slug) return
    productsAPI.detail(slug)
      .then(r => { if (r.data) setProduct({ ...FALLBACK_CATALOG[slug], ...r.data }) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  // Auto-select popular plan once product loads
  useEffect(() => {
    if (product?.pricing_plans?.length && !selectedPlan) {
      const popular = product.pricing_plans.find((p: any) => p.is_popular)
      setSelectedPlan(popular?.id || product.pricing_plans[0].id)
    }
  }, [product, selectedPlan])

  // Related products
  const related = useMemo(() => {
    if (!product) return []
    const slugs = RELATED_BY_CATEGORY[product.category?.slug || ''] || []
    return slugs.filter(s => s !== slug).map(s => FALLBACK_CATALOG[s]).filter(Boolean).slice(0, 3)
  }, [product, slug])

  if (!loading && !product) return notFound()

  if (loading && !product) {
    return (
      <div style={{ background: 'var(--bg)' }}>
        <Navbar />
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin" style={{ color: 'var(--violet-l)' }} />
        </div>
        <Footer />
      </div>
    )
  }

  const demoConfig: DemoConfig = {
    type: (product.demo_type || 'request') as any,
    url: product.demo_url,
    trialDays: product.trial_days,
    productName: product.name,
    productSlug: product.slug,
    productEmoji: product.emoji,
  }

  const handleBuy = () => {
    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=/checkout/${product.slug}${selectedPlan ? `?plan=${selectedPlan}` : ''}`)
      return
    }
    router.push(`/checkout/${product.slug}${selectedPlan ? `?plan=${selectedPlan}` : ''}`)
  }

  return (
    <div style={{ background: 'var(--bg)' }}>
      <Navbar />

      <div className="pt-24">
        {/* ─── Breadcrumb ─────────────────────────────────────────────── */}
        <div className="container py-6">
          <nav className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: 'var(--violet-l)' }}>{product.name}</span>
          </nav>
        </div>

        {/* ─── Hero ───────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pb-20">
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at 30% 0%, rgba(124,58,237,0.16) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(245,158,11,0.08) 0%, transparent 50%)',
          }} />
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Left: text */}
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-7">
                <div className="flex items-center gap-2 mb-5 flex-wrap">
                  <span className="badge badge-violet">{product.category?.name || 'Software'}</span>
                  {product.is_featured && <span className="badge badge-amber">Most Popular</span>}
                  <span className="badge badge-emerald">
                    <Check className="w-3 h-3" /> One-time purchase
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-5" style={{ fontFamily: 'var(--font-body)' }}>
                  {product.name}
                </h1>
                <p className="display text-2xl md:text-3xl mb-6 leading-snug" style={{ color: 'var(--violet-l)' }}>
                  {product.tagline}
                </p>
                <p className="text-base md:text-lg leading-relaxed mb-8 max-w-2xl" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>
                  {product.long_description || product.description}
                </p>

                {/* Trust row */}
                <div className="flex items-center gap-6 mb-8 flex-wrap">
                  {product.rating > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-700'}`} />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-body)' }}>
                        {parseFloat(product.rating).toFixed(1)}
                      </span>
                      <span className="text-sm" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
                        · {product.rating_count} reviews
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>
                    <Shield className="w-4 h-4 text-emerald-400" />
                    30-day money back
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex gap-3 flex-wrap">
                  <button onClick={handleBuy} className="btn-amber text-base py-4 px-7">
                    Buy Now <ArrowRight className="w-5 h-5" />
                  </button>
                  {product.demo_type !== 'none' && (
                    <button onClick={() => setDemoOpen(true)} className="btn-ghost text-base py-4 px-7">
                      <Play className="w-4 h-4" />
                      {product.demo_type === 'online' ? 'Live Demo' : product.demo_type === 'trial' ? 'Try Free' : 'Request Demo'}
                    </button>
                  )}
                </div>

                {/* Tags */}
                {product.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-8">
                    {product.tags.map((t: string) => (
                      <span key={t} className="badge text-[10px]" style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-2)',
                      }}>{t}</span>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Right: product mockup card */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}
                className="lg:col-span-5">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl opacity-50 blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.35), transparent 70%)' }} />
                  <div className="card-product relative p-8 md:p-10">
                    <div className="text-7xl md:text-8xl mb-6 text-center">{product.emoji}</div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
                        <span className="text-xs" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>STARTING PRICE</span>
                        <span className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-body)' }}>
                          ₹{parseFloat(product.starting_price).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
                        <span className="text-xs" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>PLATFORM</span>
                        <span className="flex items-center gap-1.5 text-sm text-white" style={{ fontFamily: 'var(--font-body)' }}>
                          <Monitor className="w-4 h-4" /> Windows
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
                        <span className="text-xs" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>LICENSE</span>
                        <span className="text-sm text-white" style={{ fontFamily: 'var(--font-body)' }}>Lifetime · One-time</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
                        <span className="text-xs" style={{ color: '#6EE7B7', fontFamily: 'var(--font-mono)' }}>INSTANT DELIVERY</span>
                        <span className="text-sm font-semibold" style={{ color: '#6EE7B7', fontFamily: 'var(--font-body)' }}>
                          ✓ License + Download
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Why buy bar ────────────────────────────────────────────── */}
        <section className="py-12" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-2)' }}>
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: IndianRupee, label: 'Pay in INR · GST invoice', color: '#A78BFA' },
                { icon: Shield, label: '30-day money back', color: '#6EE7B7' },
                { icon: RefreshCw, label: 'Free updates included', color: '#FCD34D' },
                { icon: HeadphonesIcon, label: 'Email + WhatsApp support', color: '#93C5FD' },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
                    <f.icon className="w-5 h-5" style={{ color: f.color }} />
                  </div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Audience ───────────────────────────────────────────────── */}
        {product.audience?.length > 0 && (
          <section className="py-16">
            <div className="container">
              <div className="text-center mb-10">
                <p className="badge badge-violet mb-4 inline-flex">Built For</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-body)' }}>
                  Who uses <span className="grad-violet">{product.name}</span>
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {product.audience.map((a: string, i: number) => (
                  <motion.div key={a} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                    className="card-glass p-5 text-center">
                    <Building2 className="w-6 h-6 mx-auto mb-3" style={{ color: 'var(--violet-l)' }} />
                    <p className="text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-body)' }}>{a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── Tabs: Features / Requirements / FAQ ────────────────────── */}
        <section className="py-16">
          <div className="container">
            <div className="flex gap-2 mb-10 p-1 rounded-2xl w-fit mx-auto"
              style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
              {[
                { id: 'features', label: 'Features', icon: Sparkles },
                { id: 'requirements', label: 'Requirements', icon: Monitor },
                { id: 'faq', label: 'FAQ', icon: MessageSquare },
              ].map((t) => (
                <button key={t.id} onClick={() => setActiveTab(t.id as any)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: activeTab === t.id ? 'rgba(124,58,237,0.2)' : 'transparent',
                    border: activeTab === t.id ? '1px solid rgba(124,58,237,0.35)' : '1px solid transparent',
                    color: activeTab === t.id ? '#A78BFA' : 'var(--text-3)',
                    fontFamily: 'var(--font-body)',
                  }}>
                  <t.icon className="w-4 h-4" /> {t.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'features' && (
                <motion.div key="features" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {(product.features || []).map((f: any, i: number) => {
                    const Icon = ICON_MAP[f.icon] || Zap
                    return (
                      <motion.div key={f.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                        className="card-glass p-6">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                          style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)' }}>
                          <Icon className="w-5 h-5" style={{ color: '#A78BFA' }} />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'var(--font-body)' }}>{f.title}</h3>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>{f.desc}</p>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}

              {activeTab === 'requirements' && (
                <motion.div key="req" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="max-w-2xl mx-auto">
                  <div className="card-glass p-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3" style={{ fontFamily: 'var(--font-body)' }}>
                      <Monitor className="w-5 h-5" style={{ color: 'var(--violet-l)' }} />
                      System Requirements
                    </h3>
                    <dl className="space-y-4">
                      {[
                        { k: 'Operating System', v: product.requirements?.os },
                        { k: 'RAM', v: product.requirements?.ram },
                        { k: 'Disk Space', v: product.requirements?.disk },
                        { k: 'Network', v: product.requirements?.other },
                      ].filter(x => x.v).map((x) => (
                        <div key={x.k} className="flex justify-between gap-4 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
                          <dt className="text-sm font-mono uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>{x.k}</dt>
                          <dd className="text-sm text-white text-right" style={{ fontFamily: 'var(--font-body)' }}>{x.v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </motion.div>
              )}

              {activeTab === 'faq' && (
                <motion.div key="faq" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="max-w-3xl mx-auto space-y-3">
                  {(product.faqs || []).map((f: any, i: number) => (
                    <div key={i} className="card-glass overflow-hidden">
                      <button onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                        className="w-full p-5 flex items-center justify-between gap-4 text-left transition-colors hover:bg-white/[0.02]">
                        <span className="font-semibold text-white" style={{ fontFamily: 'var(--font-body)' }}>{f.q}</span>
                        <ChevronDown className="w-5 h-5 transition-transform flex-shrink-0"
                          style={{ color: 'var(--violet-l)', transform: activeFAQ === i ? 'rotate(180deg)' : 'rotate(0)' }} />
                      </button>
                      <AnimatePresence>
                        {activeFAQ === i && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <p className="px-5 pb-5 text-sm leading-relaxed"
                              style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>{f.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ─── Pricing Plans ──────────────────────────────────────────── */}
        {product.pricing_plans?.length > 0 && (
          <section className="py-20" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-2)' }}>
            <div className="container">
              <div className="text-center mb-12">
                <p className="badge badge-amber mb-4 inline-flex">Pricing</p>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                  Choose your <span className="grad-amber">plan</span>
                </h2>
                <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>
                  One-time payment. No hidden fees. GST invoice provided.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {product.pricing_plans.map((plan: any) => {
                  const isSelected = selectedPlan === plan.id
                  return (
                    <motion.div key={plan.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} onClick={() => setSelectedPlan(plan.id)}
                      className="card-glass p-7 cursor-pointer relative"
                      style={{
                        borderColor: isSelected ? 'rgba(124,58,237,0.5)' : plan.is_popular ? 'rgba(245,158,11,0.3)' : 'var(--border)',
                        boxShadow: isSelected
                          ? '0 0 0 2px rgba(124,58,237,0.4), 0 24px 48px rgba(124,58,237,0.15)'
                          : plan.is_popular
                            ? '0 0 0 1px rgba(245,158,11,0.2), 0 16px 32px rgba(245,158,11,0.08)'
                            : 'none',
                      }}>
                      {plan.is_popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="badge badge-amber text-[10px]">Most Popular</span>
                        </div>
                      )}
                      {isSelected && (
                        <div className="absolute top-4 right-4">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)' }}>
                            <Check className="w-3.5 h-3.5" style={{ color: '#A78BFA' }} />
                          </div>
                        </div>
                      )}

                      <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-body)' }}>{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mb-5">
                        <span className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-body)' }}>
                          ₹{parseFloat(plan.price).toLocaleString('en-IN')}
                        </span>
                        <span className="text-sm" style={{ color: 'var(--text-3)' }}>+GST</span>
                      </div>
                      <p className="text-xs mb-6" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                        ONE-TIME · {plan.max_devices} {plan.max_devices === 1 ? 'DEVICE' : 'DEVICES'}
                      </p>
                      <ul className="space-y-3 mb-7">
                        {plan.features.map((f: string) => (
                          <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>
                            <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#6EE7B7' }} /> {f}
                          </li>
                        ))}
                      </ul>
                      <button onClick={(e) => { e.stopPropagation(); setSelectedPlan(plan.id); handleBuy() }}
                        className={isSelected || plan.is_popular ? 'btn-primary w-full justify-center' : 'btn-ghost w-full justify-center'}>
                        Get {plan.name} <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* ─── Testimonials ───────────────────────────────────────────── */}
        {product.testimonials?.length > 0 && (
          <section className="py-20">
            <div className="container">
              <div className="text-center mb-12">
                <p className="badge badge-emerald mb-4 inline-flex">Customer Stories</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-body)' }}>
                  What our customers say
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {product.testimonials.map((t: any, i: number) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="card-glass p-7">
                    <div className="flex gap-1 mb-3">
                      {[...Array(t.rating || 5)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--text-1)', fontFamily: 'var(--font-body)' }}>
                      "{t.text}"
                    </p>
                    <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                        style={{ background: 'rgba(124,58,237,0.15)', color: '#A78BFA', fontFamily: 'var(--font-body)' }}>
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-body)' }}>{t.name}</p>
                        <p className="text-xs" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── Final CTA ──────────────────────────────────────────────── */}
        <section className="py-20" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <div className="card-glass p-12 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.1), transparent 60%)' }} />
              <div className="relative z-10">
                <div className="text-5xl mb-5">{product.emoji}</div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                  Ready to transform your workflow?
                </h2>
                <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>
                  Join hundreds of businesses that ditched expensive subscriptions for {product.name}.
                  One payment. Lifetime ownership.
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button onClick={handleBuy} className="btn-amber text-base py-4 px-7">
                    Buy Now from ₹{parseFloat(product.starting_price).toLocaleString('en-IN')}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <Link href="/contact" className="btn-ghost text-base py-4 px-7">
                    Talk to Sales <MessageSquare className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Related products ────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="pb-20">
            <div className="container">
              <h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-body)' }}>
                You may also like
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link key={p.slug} href={`/products/${p.slug}`}
                    className="card-product p-6 group block">
                    <div className="text-4xl mb-4">{p.emoji}</div>
                    <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'var(--font-body)' }}>{p.name}</h3>
                    <p className="text-sm font-medium mb-3" style={{ color: 'var(--violet-l)', fontFamily: 'var(--font-body)' }}>{p.tagline}</p>
                    <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>{p.description}</p>
                    <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                      <span className="font-bold text-white" style={{ fontFamily: 'var(--font-body)' }}>
                        ₹{parseFloat(p.starting_price).toLocaleString('en-IN')}
                      </span>
                      <span className="text-sm flex items-center gap-1 transition-transform group-hover:translate-x-1" style={{ color: 'var(--violet-l)' }}>
                        View <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer />

      <DemoModal demo={demoConfig} open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  )
}