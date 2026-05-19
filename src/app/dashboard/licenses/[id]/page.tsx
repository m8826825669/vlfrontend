'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Key, Copy, Check, Monitor, Trash2, Loader2,
  Shield, Calendar, AlertTriangle, Download, RefreshCw, X,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { licensesAPI, downloadsAPI } from '@/lib/api'
import { useAuthStore } from '@/lib/store'
import toast from 'react-hot-toast'

export default function LicenseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = (params?.id as string) || ''
  const { isAuthenticated } = useAuthStore()

  const [license, setLicense] = useState<any>(null)
  const [activations, setActivations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [confirmDeactivate, setConfirmDeactivate] = useState<string | null>(null)
  const [deactivating, setDeactivating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/auth/login?redirect=/dashboard/licenses/${id}`)
    }
  }, [isAuthenticated, router, id])

  const fetchData = () => {
    setLoading(true)
    Promise.all([
      licensesAPI.detail(id).catch(() => ({ data: null })),
      licensesAPI.activations(id).catch(() => ({ data: [] })),
    ]).then(([l, a]) => {
      setLicense(l.data)
      setActivations(Array.isArray(a.data) ? a.data : a.data?.results || [])
    }).finally(() => setLoading(false))
  }

  useEffect(() => { if (id) fetchData() }, [id])

  const copy = () => {
    if (!license?.license_key) return
    navigator.clipboard.writeText(license.license_key)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
    toast.success('License key copied')
  }

  const deactivate = async (activationId: string) => {
    setDeactivating(true)
    try {
      await licensesAPI.deactivate(id, { activation_id: activationId })
      toast.success('Device deactivated')
      setConfirmDeactivate(null)
      fetchData()
    } catch {
      toast.error('Could not deactivate device. Please try again.')
    } finally {
      setDeactivating(false)
    }
  }

  const requestDownload = async () => {
    setDownloading(true)
    try {
      const { data } = await downloadsAPI.request({ license_id: id })
      if (data.download_url) {
        window.location.href = data.download_url
      } else {
        toast.error('Download link not available — contact support')
      }
    } catch {
      toast.error('Could not generate download link')
    } finally {
      setDownloading(false)
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

  if (!license) {
    return (
      <div style={{ background: 'var(--bg)' }}>
        <Navbar />
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--text-3)' }} />
            <p className="text-lg text-white mb-4" style={{ fontFamily: 'var(--font-body)' }}>License not found</p>
            <Link href="/dashboard" className="btn-primary">Back to Dashboard</Link>
          </div>
        </div>
      </div>
    )
  }

  const maxActivations = license.max_activations || 1
  const currentActivations = activations.length
  const slotsLeft = Math.max(0, maxActivations - currentActivations)

  return (
    <div style={{ background: 'var(--bg)' }}>
      <Navbar />
      <div className="pt-24 pb-20 min-h-screen">
        <div className="container max-w-5xl">
          {/* Back */}
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-white"
            style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>

          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-10 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-body)' }}>
                  {license.product_name || license.product?.name || 'License Details'}
                </h1>
                <span className={`badge ${license.is_active ? 'badge-emerald' : 'badge-violet'}`}>
                  {license.is_active ? <><Check className="w-3 h-3" /> Active</> : 'Inactive'}
                </span>
                {license.plan_name && <span className="badge badge-amber">{license.plan_name}</span>}
              </div>
              <p className="text-sm" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
                Purchased on {license.created_at ? new Date(license.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
              </p>
            </div>
            <button onClick={requestDownload} disabled={downloading || !license.is_active}
              className="btn-amber py-2.5 px-5 text-sm disabled:opacity-50">
              {downloading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating…</> :
                <><Download className="w-4 h-4" /> Download Installer</>}
            </button>
          </div>

          {/* License key card */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="card-glass p-7 mb-6 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-20"
              style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Key className="w-4 h-4" style={{ color: 'var(--violet-l)' }} />
                <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                  License Key
                </p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <code className="text-lg md:text-2xl font-bold break-all" style={{ color: 'var(--violet-l)', fontFamily: 'var(--font-mono)' }}>
                  {license.license_key}
                </code>
                <button onClick={copy} className="btn-ghost py-2 px-4 text-xs">
                  {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                </button>
              </div>
              <p className="text-xs mt-4" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
                💡 Enter this key in the desktop app to activate. Keep it private.
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Stat icon={Monitor} label="Devices" value={`${currentActivations} / ${maxActivations}`} color="#A78BFA" />
            <Stat icon={Shield} label="Slots Left" value={`${slotsLeft}`} color="#6EE7B7" />
            <Stat icon={Calendar} label="Expires"
              value={license.expires_at ? new Date(license.expires_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Lifetime'}
              color="#FCD34D" />
            <Stat icon={RefreshCw} label="Updates"
              value={license.updates_until ? new Date(license.updates_until).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Included'}
              color="#93C5FD" />
          </div>

          {/* Activations */}
          <div className="card-glass p-6">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <h2 className="font-semibold text-white" style={{ fontFamily: 'var(--font-body)' }}>Activated Devices</h2>
              <p className="text-xs" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                {currentActivations} OF {maxActivations} USED
              </p>
            </div>

            {activations.length === 0 ? (
              <div className="text-center py-10">
                <Monitor className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--text-3)' }} />
                <p className="text-sm" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
                  No devices activated yet. Install the app and enter your license key to activate.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {activations.map((a) => (
                  <div key={a.id} className="p-4 rounded-2xl flex items-center justify-between gap-4 flex-wrap"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(124,58,237,0.12)' }}>
                        <Monitor className="w-5 h-5" style={{ color: '#A78BFA' }} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-white truncate" style={{ fontFamily: 'var(--font-body)' }}>
                          {a.device_name || a.machine_name || 'Unknown Device'}
                        </p>
                        <p className="text-xs truncate" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                          {a.machine_id ? `${a.machine_id.slice(0, 16)}…` : '—'} · activated {a.activated_at ? new Date(a.activated_at).toLocaleDateString('en-IN') : '—'}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => setConfirmDeactivate(a.id)}
                      className="text-xs flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all"
                      style={{
                        background: 'rgba(239,68,68,0.06)',
                        border: '1px solid rgba(239,68,68,0.2)',
                        color: '#FCA5A5', fontFamily: 'var(--font-body)',
                      }}>
                      <Trash2 className="w-3.5 h-3.5" /> Deactivate
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Help */}
          <div className="mt-8 p-5 rounded-2xl"
            style={{ background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.2)' }}>
            <p className="text-sm font-semibold text-white mb-1" style={{ fontFamily: 'var(--font-body)' }}>
              💡 Moving to a new computer?
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>
              Deactivate the old device above to free up a slot, then enter your license key on the new machine. Need help? <Link href="/contact" className="underline" style={{ color: 'var(--violet-l)' }}>Contact support</Link>.
            </p>
          </div>
        </div>
      </div>

      {/* Deactivate confirmation modal */}
      {confirmDeactivate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(4,4,10,0.85)', backdropFilter: 'blur(8px)' }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="card-glass p-7 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-body)' }}>Deactivate device?</h3>
              <button onClick={() => setConfirmDeactivate(null)} className="p-1 rounded-lg hover:bg-white/[0.05]">
                <X className="w-5 h-5" style={{ color: 'var(--text-3)' }} />
              </button>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>
              This will free up one slot. The app on that device will stop working after its next license check
              {license.offline_grace_days ? ` (within ${license.offline_grace_days} days)` : ''}. You can reactivate it later by entering your license key again.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDeactivate(null)} className="btn-ghost py-2.5 px-5 text-sm">Cancel</button>
              <button onClick={() => deactivate(confirmDeactivate)} disabled={deactivating}
                className="py-2.5 px-5 text-sm rounded-xl font-semibold transition-all flex items-center gap-2 disabled:opacity-50"
                style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.35)', color: '#FCA5A5', fontFamily: 'var(--font-body)' }}>
                {deactivating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                Deactivate
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  )
}

function Stat({ icon: Icon, label, value, color }: any) {
  return (
    <div className="card-glass p-5">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
        style={{ background: `${color}22` }}>
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <p className="text-lg font-bold text-white truncate" style={{ fontFamily: 'var(--font-body)' }}>{value}</p>
      <p className="text-xs" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>{label}</p>
    </div>
  )
}