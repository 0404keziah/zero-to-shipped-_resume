import { BrainCircuit, Send, UploadCloud } from 'lucide-react'
import Reveal from './Reveal'

const steps = [
  {
    number: '01',
    icon: UploadCloud,
    title: 'Upload Resume',
    text: 'Upload your PDF resume in seconds.',
  },
  {
    number: '02',
    icon: BrainCircuit,
    title: 'AI Analysis',
    text: 'Our AI evaluates content, skills, keywords and ATS compatibility.',
  },
  {
    number: '03',
    icon: Send,
    title: 'Improve & Apply',
    text: 'Follow personalized recommendations and apply with confidence.',
  },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold tracking-wide text-violet-600 uppercase">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            From upload to interview-ready in three steps
          </h2>
        </Reveal>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-3">
          {/* Connecting line (desktop only) */}
          <div
            className="absolute top-8 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-violet-200 via-blue-300 to-violet-200 md:block"
            aria-hidden="true"
          />
          {steps.map(({ number, icon: Icon, title, text }, i) => (
            <Reveal key={number} delay={i * 150}>
              <li className="relative text-center">
                <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-950 text-white shadow-lg shadow-blue-950/20">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <span className="mt-5 inline-block text-sm font-bold tracking-widest text-violet-600">
                  {number}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-600">
                  {text}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default HowItWorks
