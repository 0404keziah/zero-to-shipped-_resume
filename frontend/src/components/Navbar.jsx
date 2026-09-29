import { useState } from 'react'
import { useAuth, useClerk, UserButton } from '@clerk/react'
import { Menu, ScanText, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Resume Score', href: '#score' },
  { label: 'Resources', href: '#resources' },
]

function AuthNavigation({ mobile = false, onNavigate }) {
  const { isLoaded, isSignedIn } = useAuth()
  const { signOut } = useClerk()
  const layout = mobile ? 'flex flex-col gap-2' : 'flex items-center gap-3'
  const linkClass = mobile
    ? 'rounded-lg px-3 py-2 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50'
    : 'rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-blue-950'

  if (!isLoaded) return null

  if (isSignedIn) {
    return (
      <div className={layout}>
        <Link
          to="/app"
          onClick={onNavigate}
          className="rounded-lg bg-blue-950 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900"
        >
          Open Analyzer
        </Link>
        <button
          type="button"
          onClick={() => {
            onNavigate?.()
            void signOut({ redirectUrl: '/' })
          }}
          className={linkClass}
        >
          Sign Out
        </button>
        {!mobile && <UserButton />}
      </div>
    )
  }

  return (
    <div className={layout}>
      <Link to="/login" onClick={onNavigate} className={linkClass}>
        Log In
      </Link>
      <Link
        to="/signup"
        onClick={onNavigate}
        className="rounded-lg bg-blue-950 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-blue-900"
      >
        Sign Up
      </Link>
    </div>
  )
}

function Navbar({ authConfigured }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const onAnalyzer = location.pathname === '/app'

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-950 text-white">
            <ScanText className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            ResumeAI
          </span>
        </Link>

        {/* Desktop links */}
        {!onAnalyzer && (
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-slate-600 transition hover:text-blue-950"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="hidden md:flex">
          {authConfigured ? (
            <AuthNavigation />
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-blue-950"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-blue-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          {!onAnalyzer && (
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 border-t border-slate-100 pt-4">
            {authConfigured ? (
              <AuthNavigation mobile onNavigate={() => setOpen(false)} />
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-blue-950 px-3 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
