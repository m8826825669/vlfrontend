'use client'
import { Suspense, useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Shield, Check, Loader2, IndianRupee, CreditCard,
  Lock, FileText, Sparkles, AlertCircle,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { productsAPI, ordersAPI } from '@/lib/api'
import { useAuthStore } from '@/lib/store'
import toast from 'react-hot-toast'

declare global {
  interface Window { Razorpay: any }
}

const FALLBACK_PLANS: Record<string, any[]> = {
  'school-erp': [
    { id: 'starter', name: 'Starter', price: '4999', max_devices: 1 },
    { id: 'pro', name: 'Professional', price: '9999', max_devices: 3, is_popular: true },
    { id: 'enterprise', name: 'Enterprise', price: '19999', max_devices: 10 },
  ],
  'clinic-manager': [
    { id: 'solo', name: 'Solo', price: '7999', max_devices: 1 },
    { id: 'clinic', name: 'Clinic', price: '14999', max_devices: 3, is_popular: true },
    { id: 'enterprise', name: 'Multi-Branch', price: '29999', max_devices: 10 },
  ],
  'medical-store': [
    { id: 'starter', name: 'Single Counter', price: '3499', max_devices: 1 },
    { id: 'pro', name: 'Multi-Counter', price: '8999', max_devices: 3, is_popular: true },
    { id: 'chain', name: 'Chain', price: '19999', max_devices: 10 },
  ],
  'accounting': [
    { id: 'basic', name: 'Basic', price: '2999', max_devices: 1 },
    { id: 'pro', name: 'Professional', price: '5999', max_devices: 3, is_popular: true },
    { id: 'biz', name: 'Business', price: '11999', max_devices: 10 },
  ],
  'hrms': [
    { id: 'starter', name: 'Starter', price: '5999', max_devices: 1 },
    { id: 'growth', name: 'Growth', price: '11999', max_devices: 3, is_popular: true },
    { id: 'enterprise', name: 'Enterprise', price: '24999', max_devices: 10 },
  ],
  'fantasy-sports': [
    { id: 'license', name: 'Source License', price: '29999', max_devices: 1, is_popular: true },
    { id: 'managed', name: 'Managed Setup', price: '79999', max_devices: 1 },
  ],
}

const FALLBACK_PRODUCT: Record<string, any> = {
  'school-erp': { name: 'School Management ERP', emoji: '🏫', tagline: 'Run an entire school from one screen.' },
  'clinic-manager': { name: 'Clinic Manager Pro', emoji: '🏥', tagline: 'Your clinic, fully digital. Finally.' },
  'medical-store': { name: 'Medical Store ERP', emoji: '💊', tagline: 'Smarter inventory. Zero wastage.' },
  'accounting': { name: 'BharatBooks Accounting', emoji: '📊', tagline: 'The Tally alternative.' },
  'hrms': { name: 'HRMS Pro', emoji: '👥', tagline: 'Complete HR in one app.' },
  'fantasy-sports': { name: 'Fantasy Sports Platform', emoji: '🏏', tagline: 'Launch your fantasy empire.' },
}

function CheckoutContent() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const slug = (params?.slug as string) || ''
  const planParam = searchParams.get('plan') || ''
  const { user, isAuthenticated } = useAuthStore()

  const [product, setProduct] = useState<any>(FALLBACK_PRODUCT[slug] || null)
  const [plans, setPlans] = useState<any[]>(FALLBACK_PLANS[slug] || [])
  const [selectedPlanId, setSelectedPlanId] = useState<string>(planParam)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)
  const [agreed, setAgreed] = useState(false)
  const [billing, setBilling] = useState({
    name: '', email: '', phone: '', company: '', gstin: '',
    address: '', city: '', state: '', pincode: '',
  })

  // Auth redirect
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/auth/login?redirect=/checkout/${slug}${planParam ? `?plan=${planParam}` : ''}`)
    }
  }, [isAuthenticated, router, slug, planParam])

  // Prefill billing from user
  useEffect(() => {
    if (user) {
      setBilling((b) => ({
        ...b,
        name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || b.name,
        email: user.email || b.email,
        phone: user.phone || b.phone,
        company: user.company || b.company,
      }))
    }
  }, [user])

  // Fetch product
  useEffect(() => {
    if (!slug) return
    productsAPI.detail(slug)
      .then((r) => {
        if (r.data) {
          setProduct({ ...FALLBACK_PRODUCT[slug], ...r.data })
          if (r.data.pricing_plans?.length) setPlans(r.data.pricing_plans)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  // Auto-select plan
  useEffect(() => {
    if (plans.length && !selectedPlanId) {
      const popular = plans.find((p) => p.is_popular)
      setSelectedPlanId(popular?.id || plans[0].id)
    }
  }, [plans, selectedPlanId])

  // Razorpay script
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.Razorpay) return
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

  const selectedPlan = plans.find((p) => p.id === selectedPlanId)
  const subtotal = selectedPlan ? parseFloat(selectedPlan.price) : 0
  const couponDiscount = (subtotal * discount) / 100
  const taxable = subtotal - couponDiscount
  const gst = Math.round(taxable * 0.18)
  const total = Math.round(taxable + gst)

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase()
    if (!code) return
    // Demo coupon table; replace with API call when backend supports it
    const coupons: Record<string, number> = { WELCOME10: 10, LAUNCH20: 20, VEXEN5: 5 }
    if (coupons[code]) {
      setDiscount(coupons[code])
      toast.success(`${coupons[code]}% discount applied`)
    } else {
      toast.error('Invalid coupon code')
      setDiscount(0)
    }
  }

  const validate = () => {
    if (!billing.name.trim()) return 'Please enter your full name'
    if (!billing.email.trim() || !/^\S+@\S+\.\S+$/.test(billing.email)) return 'Please enter a valid email'
    if (!billing.phone.trim() || !/^[6-9]\d{9}$/.test(billing.phone.replace(/\D/g, '').slice(-10))) return 'Please enter a valid 10-digit phone number'
    if (!billing.city.trim() || !billing.state.trim()) return 'Please enter city and state'
    if (!billing.pincode.trim() || !/^\d{6}$/.test(billing.pincode)) return 'Please enter a valid 6-digit pincode'
    if (billing.gstin && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(billing.gstin)) return 'GSTIN format is invalid'
    if (!agreed) return 'Please accept the terms and refund policy'
    if (!selectedPlan) return 'Please select a plan'
    return null
  }

  const handlePay = async () => {
    const err = validate()
    if (err) { toast.error(err); return }
    if (!window.Razorpay) { toast.error('Payment SDK still loading — please retry in a moment'); return }
    if (!selectedPlan) return

    setProcessing(true)
    try {
      // 1. Create order on backend
      const { data: order } = await ordersAPI.create({
        product_slug: slug,
        plan_id: selectedPlan.id,
        amount: total,
        currency: 'INR',
        billing,
        coupon_code: discount > 0 ? coupon.trim().toUpperCase() : undefined,
      })

      // 2. Open Razorpay
      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || 'INR',
        name: 'Vexen Labs',
        description: `${product.name} — ${selectedPlan.name}`,
        order_id: order.razorpay_order_id || order.id,
        prefill: { name: billing.name, email: billing.email, contact: billing.phone },
        theme: { color: '#7C3AED' },
        handler: async (response: any) => {
          try {
            const { data: verify } = await ordersAPI.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              order_id: order.id,
            })
            const licenseKey = verify.license_key || verify.license?.license_key || ''
            router.push(`/payment-success?license_key=${encodeURIComponent(licenseKey)}&product=${encodeURIComponent(product.name)}`)
          } catch {
            toast.error('Payment verification failed. Contact support — your payment is safe.')
            setProcessing(false)
          }
        },
        modal: {
          ondismiss: () => { setProcessing(false); toast('Payment cancelled', { icon: 'ℹ️' }) },
        },
      })
      rzp.open()
    } catch (e: any) {
      toast.error(e?.response?.data?.detail || 'Could not create order. Please try again.')
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div style={{ background: 'var(--bg)' }}>
        <Navbar />
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin" style={{ color: 'var(--violet-l)' }} />
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div style={{ background: 'var(--bg)' }}>
        <Navbar />
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--text-3)' }} />
            <p className="text-lg text-white mb-4" style={{ fontFamily: 'var(--font-body)' }}>Product not found</p>
            <Link href="/products" className="btn-primary">Browse Products</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--bg)' }}>
      <Navbar />
      <div className="pt-24 pb-20 min-h-screen">
        <div className="container">
          <Link href={`/products/${slug}`} className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-white"
            style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
            <ArrowLeft className="w-4 h-4" /> Back to {product.name}
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-body)' }}>
            Secure <span className="grad-violet">Checkout</span>
          </h1>
          <p className="mb-10" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
            Complete your purchase. License key delivered instantly after payment.
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Plan selector */}
              <div className="card-glass p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="w-4 h-4" style={{ color: 'var(--violet-l)' }} />
                  <h2 className="font-semibold text-white" style={{ fontFamily: 'var(--font-body)' }}>1. Choose your plan</h2>
                </div>
                <div className="space-y-3">
                  {plans.map((p) => {
                    const sel = selectedPlanId === p.id
                    return (
                      <button key={p.id} onClick={() => setSelectedPlanId(p.id)}
                        className="w-full text-left p-4 rounded-2xl transition-all"
                        style={{
                          background: sel ? 'rgba(124,58,237,0.08)' : 'rgba(255,255,255,0.02)',
                          border: sel ? '1px solid rgba(124,58,237,0.4)' : '1px solid var(--border)',
                        }}>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{
                                background: sel ? 'rgba(124,58,237,0.25)' : 'transparent',
                                border: sel ? '1px solid rgba(124,58,237,0.5)' : '1px solid var(--text-3)',
                              }}>
                              {sel && <div className="w-2 h-2 rounded-full" style={{ background: '#A78BFA' }} />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-semibold text-white" style={{ fontFamily: 'var(--font-body)' }}>{p.name}</p>
                                {p.is_popular && <span className="badge badge-amber text-[9px] py-0.5">Popular</span>}
                              </div>
                              <p className="text-xs" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
                                {p.max_devices} {p.max_devices === 1 ? 'device' : 'devices'} · Lifetime license
                              </p>
                            </div>
                          </div>
                          <span className="font-bold text-white whitespace-nowrap" style={{ fontFamily: 'var(--font-body)' }}>
                            ₹{parseFloat(p.price).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Billing */}
              <div className="card-glass p-6">
                <div className="flex items-center gap-2 mb-5">
                  <FileText className="w-4 h-4" style={{ color: 'var(--violet-l)' }} />
                  <h2 className="font-semibold text-white" style={{ fontFamily: 'var(--font-body)' }}>2. Billing details</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Full Name *" value={billing.name} onChange={(v) => setBilling({ ...billing, name: v })} />
                  <Field label="Email *" type="email" value={billing.email} onChange={(v) => setBilling({ ...billing, email: v })} />
                  <Field label="Phone *" type="tel" value={billing.phone} onChange={(v) => setBilling({ ...billing, phone: v })} placeholder="10 digit mobile" />
                  <Field label="Company (optional)" value={billing.company} onChange={(v) => setBilling({ ...billing, company: v })} />
                  <Field label="GSTIN (optional)" value={billing.gstin} onChange={(v) => setBilling({ ...billing, gstin: v.toUpperCase() })} placeholder="22AAAAA0000A1Z5" />
                  <div className="hidden md:block" />
                  <div className="md:col-span-2">
                    <Field label="Address" value={billing.address} onChange={(v) => setBilling({ ...billing, address: v })} />
                  </div>
                  <Field label="City *" value={billing.city} onChange={(v) => setBilling({ ...billing, city: v })} />
                  <Field label="State *" value={billing.state} onChange={(v) => setBilling({ ...billing, state: v })} />
                  <Field label="Pincode *" value={billing.pincode} onChange={(v) => setBilling({ ...billing, pincode: v })} placeholder="6 digits" />
                </div>
              </div>

              {/* Coupon */}
              <div className="card-glass p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4" style={{ color: 'var(--violet-l)' }} />
                  <h2 className="font-semibold text-white" style={{ fontFamily: 'var(--font-body)' }}>3. Have a coupon?</h2>
                </div>
                <div className="flex gap-2">
                  <input value={coupon} onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className="input flex-1" style={{ textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }} />
                  <button onClick={applyCoupon} className="btn-ghost py-3 px-6 text-sm whitespace-nowrap">Apply</button>
                </div>
                {discount > 0 && (
                  <p className="text-xs mt-2 flex items-center gap-1.5" style={{ color: '#6EE7B7', fontFamily: 'var(--font-body)' }}>
                    <Check className="w-3 h-3" /> {discount}% discount applied
                  </p>
                )}
              </div>
            </div>

            {/* Right: summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-4">
                <div className="card-glass p-6">
                  <h2 className="font-semibold text-white mb-5" style={{ fontFamily: 'var(--font-body)' }}>Order Summary</h2>

                  {/* Product */}
                  <div className="flex items-center gap-4 mb-5 pb-5" style={{ borderBottom: '1px solid var(--border)' }}>
                    <div className="text-4xl">{product.emoji}</div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white truncate" style={{ fontFamily: 'var(--font-body)' }}>{product.name}</p>
                      <p className="text-xs truncate" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
                        {selectedPlan?.name || 'Select a plan'}
                      </p>
                    </div>
                  </div>

                  {/* Totals */}
                  <dl className="space-y-3 mb-5">
                    <Row label="Subtotal" value={`₹${subtotal.toLocaleString('en-IN')}`} />
                    {discount > 0 && <Row label={`Discount (${discount}%)`} value={`−₹${couponDiscount.toLocaleString('en-IN')}`} color="#6EE7B7" />}
                    <Row label="GST (18%)" value={`₹${gst.toLocaleString('en-IN')}`} />
                  </dl>

                  <div className="flex items-baseline justify-between pt-5" style={{ borderTop: '1px solid var(--border)' }}>
                    <span className="font-semibold text-white" style={{ fontFamily: 'var(--font-body)' }}>Total</span>
                    <span className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-body)' }}>
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Terms */}
                  <label className="flex items-start gap-2 mt-5 mb-5 cursor-pointer">
                    <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 flex-shrink-0 accent-violet-500" />
                    <span className="text-xs leading-relaxed" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
                      I agree to the <Link href="/terms" className="underline" style={{ color: 'var(--violet-l)' }}>Terms</Link>,{' '}
                      <Link href="/eula" className="underline" style={{ color: 'var(--violet-l)' }}>EULA</Link> and{' '}
                      <Link href="/refund" className="underline" style={{ color: 'var(--violet-l)' }}>Refund Policy</Link>.
                    </span>
                  </label>

                  <button onClick={handlePay} disabled={processing || !selectedPlan}
                    className="btn-amber w-full justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed">
                    {processing ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing…</> :
                      <><Lock className="w-4 h-4" /> Pay ₹{total.toLocaleString('en-IN')}</>}
                  </button>
                </div>

                {/* Trust */}
                <div className="card-glass p-5 space-y-3">
                  <Trust icon={Shield} text="256-bit SSL encryption" />
                  <Trust icon={CreditCard} text="UPI, Cards, NetBanking, Wallets" />
                  <Trust icon={IndianRupee} text="Razorpay · PCI DSS certified" />
                  <Trust icon={Check} text="Instant license delivery" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

// ─── Small subcomponents ────────────────────────────────────────────────────
function Field({ label, value, onChange, type = 'text', placeholder }: any) {
  return (
    <div>
      <label className="text-xs mb-1.5 block uppercase tracking-wider" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="input" />
    </div>
  )
}

function Row({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>{label}</span>
      <span style={{ color: color || 'var(--text-1)', fontFamily: 'var(--font-body)' }}>{value}</span>
    </div>
  )
}

function Trust({ icon: Icon, text }: any) {
  return (
    <div className="flex items-center gap-2.5 text-xs" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>
      <Icon className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--violet-l)' }} /> {text}
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--violet-l)' }} />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}