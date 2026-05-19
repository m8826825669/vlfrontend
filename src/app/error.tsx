'use client'
import { useEffect } from 'react'
import { RefreshCw, Home } from 'lucide-react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])
  return (
    <div className="min-h-screen flex items-center justify-center text-center p-4" style={{background:'var(--bg)'}}>
      <div>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{background:'rgba(239,68,68,0.12)',border:'1px solid rgba(239,68,68,0.25)'}}>
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3" style={{fontFamily:'var(--font-body)'}}>Something went wrong</h2>
        <p className="mb-8 max-w-sm" style={{color:'var(--text-2)',fontFamily:'var(--font-body)'}}>An unexpected error occurred. Please try again or contact support if the problem persists.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn-primary"><RefreshCw className="w-4 h-4"/> Try Again</button>
          <a href="/" className="btn-ghost"><Home className="w-4 h-4"/> Go Home</a>
        </div>
      </div>
    </div>
  )
}
