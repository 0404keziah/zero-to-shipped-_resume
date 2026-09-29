import { cloneElement } from 'react'
import { useAuth } from '@clerk/react'

function ProtectedRoute({ authConfigured, children }) {
  if (!authConfigured) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center">
        <p className="max-w-lg rounded-2xl border border-amber-200 bg-white p-6 text-sm text-slate-700 shadow-sm">
          Authentication is not configured. Set VITE_CLERK_PUBLISHABLE_KEY and
          the backend Clerk environment variables to use the analyzer.
        </p>
      </main>
    )
  }

  return <AuthenticatedRoute>{children}</AuthenticatedRoute>
}

function AuthenticatedRoute({ children }) {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm font-medium text-slate-600">Checking sign-in...</p>
      </main>
    )
  }

  return cloneElement(children, { isAuthenticated: Boolean(isSignedIn) })
}

export default ProtectedRoute
