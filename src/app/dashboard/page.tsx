'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Key, ShoppingBag, Download, User, ArrowRight, Copy, CheckCircle2, Loader2, Package, ExternalLink } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useAuthStore } from '@/lib/store'
import { licensesAPI, ordersAPI, downloadsAPI } from '@/lib/api'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [tab, setTab]         = useState<'licenses'|'orders'|'downloads'>('licenses')
  const [licenses,  setLicenses]  = useState<any[]>([])
  const [orders,    setOrders]    = useState<any[]>([])
  const [downloads, setDownloads] = useState<any[]>([])
  const [loading, setLoading]     = useState(true)

  // Client-side auth guard (middleware is a no-op; see src/middleware.ts).
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login?from=/dashboard')
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (!isAuthenticated) return
    Promise.all([licensesAPI.mine(), ordersAPI.myOrders(), downloadsAPI.history()])
      .then(([l,o,d]) => {
        setLicenses(Array.isArray(l.data) ? l.data : l.data.results || [])
        setOrders(Array.isArray(o.data) ? o.data : o.data.results || [])
        setDownloads(Array.isArray(d.data) ? d.data : d.data.results || [])
      }).catch(()=>{}).finally(()=>setLoading(false))
  }, [isAuthenticated])

  const copy = (text: string) => { navigator.clipboard.writeText(text); toast.success('Copied!') }

  const STATS = [
    { icon: Key,         label: 'Active Licenses', value: licenses.filter(l=>l.is_active).length,  color: 'rgba(124,58,237,0.15)', iconColor: '#A78BFA' },
    { icon: ShoppingBag, label: 'Total Orders',    value: orders.length,                            color: 'rgba(37,99,235,0.15)',  iconColor: '#93C5FD' },
    { icon: Download,    label: 'Downloads',        value: downloads.length,                         color: 'rgba(16,185,129,0.15)', iconColor: '#6EE7B7' },
    { icon: User,        label: 'Account Status',  value: 'Active',                                 color: 'rgba(245,158,11,0.15)', iconColor: '#FCD34D' },
  ]

  const TABS = [
    { id:'licenses',  label:'My Licenses',  icon: Key },
    { id:'orders',    label:'Orders',        icon: ShoppingBag },
    { id:'downloads', label:'Downloads',     icon: Download },
  ]

  return (
    <div style={{background:'var(--bg)'}}>
      <Navbar />
      <div className="pt-24 min-h-screen">
        <div className="container py-12">
          {/* Welcome */}
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-sm mb-1" style={{color:'var(--text-3)',fontFamily:'var(--font-body)'}}>Dashboard</p>
              <h1 className="text-3xl font-bold text-white" style={{fontFamily:'var(--font-body)'}}>
                Welcome back, {user?.first_name || 'there'} 👋
              </h1>
            </div>
            <Link href="/products" className="btn-amber py-2.5 px-6 text-sm">
              Browse More Software <ArrowRight className="w-4 h-4"/>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {STATS.map((s,i)=>(
              <motion.div key={s.label} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}
                className="card-glass p-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{background:s.color}}>
                  <s.icon className="w-5 h-5" style={{color:s.iconColor}}/>
                </div>
                <p className="text-2xl font-bold text-white" style={{fontFamily:'var(--font-body)'}}>{s.value}</p>
                <p className="text-xs mt-0.5" style={{color:'var(--text-3)',fontFamily:'var(--font-body)'}}>{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 p-1 rounded-2xl w-fit" style={{background:'var(--bg-2)',border:'1px solid var(--border)'}}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id as any)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: tab===t.id?'rgba(124,58,237,0.2)':'transparent',
                  border: tab===t.id?'1px solid rgba(124,58,237,0.35)':'1px solid transparent',
                  color: tab===t.id?'#A78BFA':'var(--text-3)',
                  fontFamily:'var(--font-body)'
                }}>
                <t.icon className="w-4 h-4"/> {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin" style={{color:'var(--violet-l)'}}/></div>
          ) : (
            <div className="space-y-4">
              {/* LICENSES */}
              {tab==='licenses' && (
                licenses.length===0 ? (
                  <div className="card-glass p-16 text-center">
                    <Key className="w-12 h-12 mx-auto mb-4" style={{color:'var(--text-3)'}}/>
                    <h3 className="text-xl font-semibold text-white mb-2" style={{fontFamily:'var(--font-body)'}}>No licenses yet</h3>
                    <p className="mb-6" style={{color:'var(--text-3)',fontFamily:'var(--font-body)'}}>Purchase a product to get your license key</p>
                    <Link href="/products" className="btn-primary">Browse Products <ArrowRight className="w-4 h-4"/></Link>
                  </div>
                ) : licenses.map((l:any)=>(
                  <div key={l.id} className="card-glass p-6">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="font-bold text-white" style={{fontFamily:'var(--font-body)'}}>{l.product_name||l.product?.name}</h3>
                          <span className={`badge ${l.is_active?'badge-emerald':'badge-violet'}`}>
                            {l.is_active?<><CheckCircle2 className="w-3 h-3"/> Active</>:'Inactive'}
                          </span>
                          {l.plan_name&&<span className="badge badge-amber text-[10px]">{l.plan_name}</span>}
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <code className="text-sm px-3 py-1.5 rounded-lg" style={{background:'rgba(124,58,237,0.1)',color:'#A78BFA',fontFamily:'var(--font-mono)'}}>
                            {l.license_key}
                          </code>
                          <button onClick={()=>copy(l.license_key)} className="p-1.5 rounded-lg transition-all hover:bg-white/[0.05]" style={{color:'var(--text-3)'}}>
                            <Copy className="w-4 h-4"/>
                          </button>
                        </div>
                        <p className="text-xs" style={{color:'var(--text-3)',fontFamily:'var(--font-body)'}}>
                          Activations: {l.activation_count||0} / {l.max_activations||1} devices
                          {l.expires_at && ` · Expires: ${new Date(l.expires_at).toLocaleDateString()}`}
                        </p>
                      </div>
                      <Link href={`/dashboard/licenses/${l.id}`} className="btn-ghost text-sm py-2 px-4">
                        Manage <ExternalLink className="w-3.5 h-3.5"/>
                      </Link>
                    </div>
                  </div>
                ))
              )}

              {/* ORDERS */}
              {tab==='orders' && (
                orders.length===0 ? (
                  <div className="card-glass p-16 text-center">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-4" style={{color:'var(--text-3)'}}/>
                    <h3 className="text-xl font-semibold text-white mb-2" style={{fontFamily:'var(--font-body)'}}>No orders yet</h3>
                    <Link href="/products" className="btn-primary mt-4 inline-flex">Browse Products <ArrowRight className="w-4 h-4"/></Link>
                  </div>
                ) : orders.map((o:any)=>(
                  <div key={o.id} className="card-glass p-6 flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="font-bold text-white mb-1" style={{fontFamily:'var(--font-body)'}}>{o.product_name||o.product?.name}</h3>
                      <p className="text-xs" style={{color:'var(--text-3)',fontFamily:'var(--font-body)'}}>
                        Order #{o.id?.slice(0,8)} · {new Date(o.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="badge badge-emerald">{o.status||'Completed'}</span>
                      <p className="font-bold text-white" style={{fontFamily:'var(--font-body)'}}>₹{parseFloat(o.amount||0).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))
              )}

              {/* DOWNLOADS */}
              {tab==='downloads' && (
                downloads.length===0 ? (
                  <div className="card-glass p-16 text-center">
                    <Download className="w-12 h-12 mx-auto mb-4" style={{color:'var(--text-3)'}}/>
                    <h3 className="text-xl font-semibold text-white mb-2" style={{fontFamily:'var(--font-body)'}}>No downloads yet</h3>
                  </div>
                ) : downloads.map((d:any)=>(
                  <div key={d.id} className="card-glass p-6 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <Package className="w-8 h-8" style={{color:'var(--violet-l)'}}/>
                      <div>
                        <p className="font-semibold text-white" style={{fontFamily:'var(--font-body)'}}>{d.product_name||d.file_name}</p>
                        <p className="text-xs" style={{color:'var(--text-3)',fontFamily:'var(--font-body)'}}>{new Date(d.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {d.download_url&&<a href={d.download_url} className="btn-primary text-sm py-2 px-4"><Download className="w-4 h-4"/> Download</a>}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
