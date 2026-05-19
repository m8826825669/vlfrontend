import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Auth gating is handled client-side in each protected page via the zustand
 * `useAuthStore` (see src/lib/store.ts). Tokens live in localStorage, which
 * middleware can't read on the edge. Pages redirect to /auth/login themselves
 * when unauthenticated.
 *
 * This middleware is intentionally a no-op for now. Keep the file so the
 * matcher config below can be reactivated when we move tokens to cookies.
 */
export function middleware(_req: NextRequest) {
  return NextResponse.next()
}

// Empty matcher = middleware never runs. Replace with the protected paths
// once cookie-based tokens are in place.
export const config = {
  matcher: [],
}
