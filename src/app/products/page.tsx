'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Package, Loader2, ArrowRight, Star, Filter } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { productsAPI } from '@/lib/api'

const FALLBACK = [
  { id:'1', slug:'school-erp',     name:'School Management ERP',  emoji:'🏫', tagline:'Run an entire school from one screen.', description:'Complete school administration — admissions, attendance, fees, exams, library, timetables.', tags:['Admissions','Attendance','Fees','Library'], starting_price:'4999', is_featured:false, rating:4.9, rating_count:87,  demo_type:'request', category:{slug:'education'} },
  { id:'2', slug:'clinic-manager', name:'Clinic Manager Pro',     emoji:'🏥', tagline:'Your clinic, fully digital. Finally.', description:'Patient records, SOAP notes, prescriptions, appointments, and billing in one app.', tags:['OPD','Prescriptions','Billing','ABHA'], starting_price:'7999', is_featured:true,  rating:4.8, rating_count:54,  demo_type:'request', category:{slug:'healthcare'} },
  { id:'3', slug:'medical-store',  name:'Medical Store ERP',      emoji:'💊', tagline:'Smarter inventory. Zero wastage.', description:'FEFO inventory, GST billing, expiry alerts, barcode scanning, POS interface.', tags:['FEFO','GST','Barcode','POS'], starting_price:'3499', is_featured:false, rating:4.7, rating_count:43,  demo_type:'online',  category:{slug:'healthcare'} },
  { id:'4', slug:'accounting',     name:'BharatBooks Accounting', emoji:'📊', tagline:'Accounting without the accountant fees.', description:'GST invoicing, P&L reports, bank reconciliation — the Tally alternative.', tags:['GST','Invoicing','P&L','GSTR'], starting_price:'2999', is_featured:false, rating:4.6, rating_count:31,  demo_type:'trial',   category:{slug:'finance'} },
  { id:'5', slug:'hrms',           name:'HRMS Pro',               emoji:'👥', tagline:'Happy teams start with great HR software.', description:'Recruitment, payroll, attendance, leaves, appraisals — complete HR in one app.', tags:['Payroll','Recruitment','Leaves'], starting_price:'5999', is_featured:false, rating:4.5, rating_count:22,  demo_type:'request', category:{slug:'hr'} },
  { id:'6', slug:'fantasy-sports', name:'Fantasy Sports Platform',emoji:'🏏', tagline:'Launch your own fantasy sports empire.', description:'Real-time scoring, wallet system, KYC, UPI payments — full-stack fantasy platform.', tags:['Real-time','Wallet','KYC','UPI'],  starting_price:'29999',is_featured:false, rating:4.8, rating_count:12, demo_type:'request', category:{slug:'gaming'} },
]

const FALLBACK_CATS = [
  { slug:'', name:'All Products' },
  { slug:'education', name:'Education' },
  { slug:'healthcare', name:'Healthcare' },
  { slug:'finance', name:'Finance & Accounting' },
  { slug:'hr', name:'HR & Payroll' },
  { slug:'gaming', name:'Gaming & Sports' },
]

export default function ProductsPage() {
  const [products,  setProducts]  = useState<any[]>(FALLBACK)
  const [cats,      setCats]      = useState<any[]>(FALLBACK_CATS)
  const [loading,   setLoading]   = useState(true)
  const [search,    setSearch]    = useState('')
  const [cat,       setCat]       = useState('')
  const [sortBy,    setSortBy]    = useState('featured')

  useEffect(() => {
    productsAPI.list().then(r => {
      const d = r.data.results || r.data
      if (Array.isArray(d) && d.length) setProducts(d)
    }).catch(()=>{}).finally(()=>setLoading(false))

    productsAPI.categories().then(r => {
      const d = r.data.results || r.data
      if (Array.isArray(d) && d.length) {
        // Only show categories that have at least 1 product, plus the "All" pill
        const withProducts = d.filter((c: any) => c.product_count > 0)
        setCats([{ slug: '', name: 'All Products' }, ...withProducts])
      }
    }).catch(()=>{})
  }, [])

  const filtered = products
    .filter(p =>
      (!search || p.name.toLowerCase().includes(search.toLowerCase()) || p.tagline?.toLowerCase().includes(search.toLowerCase())) &&
      (!cat || p.category?.slug === cat)
    )
    .sort((a,b) => sortBy==='price-asc' ? parseFloat(a.starting_price)-parseFloat(b.starting_price)
                 : sortBy==='price-desc'? parseFloat(b.starting_price)-parseFloat(a.starting_price)
                 : sortBy==='rating'    ? parseFloat(b.rating||0)-parseFloat(a.rating||0)
                 : (b.is_featured?1:0)-(a.is_featured?1:0))

  return (
    <div style={{background:'var(--bg)'}}>
      <Navbar />
      <div className="pt-24">

        {/* Hero */}
        <div className="relative py-20 overflow-hidden" style={{borderBottom:'1px solid var(--border)'}}>
          <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 70%)'}}>
            <div className="absolute inset-0" style={{backgroundImage:`linear-gradient(rgba(124,58,237,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.05) 1px,transparent 1px)`,backgroundSize:'60px 60px'}}/>
          </div>
          <div className="container relative z-10 text-center">
            <div className="badge badge-violet mb-6 inline-flex">Our Software</div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-5 leading-tight" style={{fontFamily:'var(--font-body)'}}>
              All <span style={{background:'linear-gradient(135deg,#C4B5FD,#7C3AED)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Products</span>
            </h1>
            <p className="text-lg max-w-xl mx-auto" style={{color:'var(--text-2)',fontFamily:'var(--font-body)'}}>
              Professional desktop software for every type of business. One-time purchase. No subscriptions.
            </p>
          </div>
        </div>

        <div className="container py-12">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{color:'var(--text-3)'}} />
              <input value={search} onChange={e=>setSearch(e.target.value)} className="input pl-11" placeholder="Search software..." />
            </div>
            <div className="flex gap-2 flex-wrap flex-1">
              {cats.map(c=>(
                <button key={c.slug} onClick={()=>setCat(c.slug)}
                  className="badge text-xs px-4 py-2 cursor-pointer transition-all"
                  style={{
                    background: cat===c.slug?'rgba(124,58,237,0.2)':'rgba(255,255,255,0.04)',
                    border: cat===c.slug?'1px solid rgba(124,58,237,0.4)':'1px solid var(--border)',
                    color: cat===c.slug?'#A78BFA':'var(--text-3)',
                    fontFamily:'var(--font-body)',borderRadius:'999px'
                  }}>
                  {c.name}
                </button>
              ))}
            </div>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
              className="input max-w-[200px]" style={{fontFamily:'var(--font-body)'}}>
              <option value="featured">Featured First</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="flex justify-center py-32">
              <Loader2 className="w-10 h-10 animate-spin" style={{color:'var(--violet-l)'}} />
            </div>
          ) : filtered.length===0 ? (
            <div className="text-center py-32">
              <Package className="w-16 h-16 mx-auto mb-4" style={{color:'var(--text-3)'}} />
              <p className="text-xl font-semibold text-white mb-2" style={{fontFamily:'var(--font-body)'}}>No products found</p>
              <p style={{color:'var(--text-3)',fontFamily:'var(--font-body)'}}>Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p,i)=>(
                <motion.div key={p.id||p.slug}
                  initial={{opacity:0,y:24}} animate={{opacity:1,y:0}}
                  transition={{delay:i*0.07}} className="card-product p-7 flex flex-col"
                >
                  {p.is_featured && <div className="absolute top-5 right-5 badge badge-amber">Most Popular</div>}
                  <div className="text-5xl mb-5">{p.emoji||'📦'}</div>
                  <h3 className="text-xl font-bold text-white mb-1" style={{fontFamily:'var(--font-body)'}}>{p.name}</h3>
                  <p className="text-sm font-medium mb-3" style={{color:'var(--violet-l)',fontFamily:'var(--font-body)'}}>{p.tagline}</p>
                  <p className="text-sm leading-relaxed mb-4 flex-1" style={{color:'var(--text-2)',fontFamily:'var(--font-body)'}}>{p.description}</p>
                  {p.tags?.length>0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.tags.slice(0,4).map((t:string)=><span key={t} className="badge badge-violet text-[10px]">{t}</span>)}
                    </div>
                  )}
                  {p.rating>0 && (
                    <div className="flex items-center gap-1.5 mb-4">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs" style={{color:'var(--text-3)',fontFamily:'var(--font-body)'}}>
                        {parseFloat(p.rating).toFixed(1)} ({p.rating_count} reviews)
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-5 mt-auto" style={{borderTop:'1px solid var(--border)'}}>
                    <div>
                      <p className="text-xl font-bold text-white" style={{fontFamily:'var(--font-body)'}}>
                        ₹{parseFloat(p.starting_price||'0').toLocaleString('en-IN')}
                        <span className="text-xs font-normal ml-1" style={{color:'var(--text-3)'}}>+tax</span>
                      </p>
                      <p className="text-[10px]" style={{color:'var(--text-3)',fontFamily:'var(--font-body)'}}>one-time · lifetime</p>
                    </div>
                    <Link href={`/products/${p.slug}`} className="btn-primary text-sm py-2.5 px-5">
                      Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
