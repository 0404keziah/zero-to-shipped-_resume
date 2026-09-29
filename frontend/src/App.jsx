import { SignIn, SignUp } from '@clerk/react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustSection from './components/TrustSection'
import ProblemSection from './components/ProblemSection'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import ScorePreview from './components/ScorePreview'
import BeforeAfter from './components/BeforeAfter'
import UploadDemo from './components/UploadDemo'
import CTA from './components/CTA'
import Footer from './components/Footer'

function LandingPage({ authConfigured }) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased">
      <Navbar authConfigured={authConfigured} />
      <main>
        <Hero />
        <TrustSection />
        <ProblemSection />
        <Features />
        <HowItWorks />
        <ScorePreview />
        <BeforeAfter />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

function AuthPage({ authConfigured, children }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar authConfigured={authConfigured} />
      <main className="mx-auto flex max-w-6xl justify-center px-6 py-16">
        {authConfigured ? (
          children
        ) : (
          <p className="max-w-lg rounded-2xl border border-amber-200 bg-white p-6 text-center text-sm text-slate-700 shadow-sm">
            Authentication is not configured. Set
            VITE_CLERK_PUBLISHABLE_KEY and the backend Clerk environment
            variables to sign in or create an account.
          </p>
        )}
      </main>
    </div>
  )
}

function AnalyzerPage({ authConfigured }) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased">
      <Navbar authConfigured={authConfigured} />
      <main>
        <UploadDemo />
      </main>
      <Footer />
    </div>
  )
}

function App({ authConfigured }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage authConfigured={authConfigured} />}
      />
      <Route
        path="/login"
        element={
          <AuthPage authConfigured={authConfigured}>
            <SignIn
              routing="hash"
              signUpUrl="/signup"
              fallbackRedirectUrl="/app"
            />
          </AuthPage>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthPage authConfigured={authConfigured}>
            <SignUp
              routing="hash"
              signInUrl="/login"
              fallbackRedirectUrl="/app"
            />
          </AuthPage>
        }
      />
      <Route
        path="/app"
        element={<AnalyzerPage authConfigured={authConfigured} />}
      />
      <Route path="*" element={<LandingPage authConfigured={authConfigured} />} />
    </Routes>
  )
}

export default App
