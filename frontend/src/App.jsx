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

function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased">
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <ProblemSection />
        <Features />
        <HowItWorks />
        <ScorePreview />
        <BeforeAfter />
        <UploadDemo />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
