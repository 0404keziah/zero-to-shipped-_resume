import { BrainCircuit, Lock, ScanSearch, Zap } from 'lucide-react'
import Reveal from './Reveal'

const items = [
  { icon: ScanSearch, label: 'ATS Friendly' },
  { icon: BrainCircuit, label: 'AI-Powered Analysis' },
  { icon: Zap, label: 'Instant Feedback' },
  { icon: Lock, label: 'Privacy Focused' },
]

function TrustSection() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <Reveal>
          <p className="text-center text-sm font-medium text-slate-500">
            Built to help job seekers apply with confidence
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {items.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center justify-center gap-2.5 text-slate-600"
              >
                <Icon className="h-5 w-5 text-blue-950" aria-hidden="true" />
                <span className="text-sm font-semibold">{label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

export default TrustSection
