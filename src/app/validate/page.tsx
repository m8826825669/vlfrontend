'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Loader2, Search } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { licensesAPI } from '@/lib/api'

export default function ValidatePage() {
  const [key, setKey] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const validate = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setResult(null)
    try {
      const { data } = await licensesAPI.validate({ license_key: key.trim() })
      setResult({ valid: true, data })
    } catch (err: any) {
      setResult({ valid: false, error: err.response?.data?.error || 'Invalid or inactive license key.' })
    } finally { setLoading(false) }
  }

  return (
    <div style={{background:'var(--bg)'}}>
      <Navbar />
      <div className="pt-24 min-h-screen">
        <div className="container py-20 max-w-xl">
          <div className="text-center mb-10">
            <div className="badge badge-violet mb-5 inline-flex">License Validator</div>
            <h1 className="text-4xl font-bold text-white mb-3" style={{fontFamily:'var(--font-body)'}}>Verify your license</h1>
            <p style={{color:'var(--text-2)',fontFamily:'var(--font-body)'}}>Check if a license key is valid and active</p>
          </div>
          <div className="card-glass p-8">
            <form onSubmit={validate} className="space-y-4">
              <input value={key} onChange={e=>setKey(e.target.value.toUpperCase())} className="input text-center text-lg tracking-widest"
                placeholder="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX" style={{fontFamily:'var(--font-mono)'}}/>
              <button type="submit" disabled={loading||key.length<5} className="btn-primary w-full justify-center py-3.5">
                {loading?<Loader2 className="w-5 h-5 animate-spin"/>:<><Search className="w-5 h-5"/> Validate License</>}
              </button>
            </form>
            {result && (
              <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="mt-6 p-5 rounded-2xl"
                style={{background:result.valid?'rgba(16,185,129,0.08)':'rgba(239,68,68,0.08)',border:`1px solid ${result.valid?'rgba(16,185,129,0.25)':'rgba(239,68,68,0.25)'}`}}>
                {result.valid ? (
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0"/>
                    <div>
                      <p className="font-bold text-emerald-400 mb-1" style={{fontFamily:'var(--font-body)'}}>✓ Valid License</p>
                      <p className="text-sm" style={{color:'var(--text-2)',fontFamily:'var(--font-body)'}}>Product: {result.data?.product_name}</p>
                      <p className="text-sm" style={{color:'var(--text-2)',fontFamily:'var(--font-body)'}}>Plan: {result.data?.plan}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <XCircle className="w-6 h-6 text-red-400"/>
                    <p className="text-red-400 font-medium" style={{fontFamily:'var(--font-body)'}}>{result.error}</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
