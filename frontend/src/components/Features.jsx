import {
  BrainCircuit,
  ClipboardCheck,
  Crosshair,
  Gauge,
  KeyRound,
  Lightbulb,
} from 'lucide-react'
import Reveal from './Reveal'

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Resume Review',
    text: 'Get detailed feedback on your resume content.',
  },
  {
    icon: Gauge,
    title: 'ATS Score',
    text: 'Understand how well your resume performs against ATS systems.',
  },
  {
    icon: KeyRound,
    title: 'Keyword Analysis',
    text: 'Find important keywords missing from your resume.',
  },
  {
    icon: Crosshair,
    title: 'Skill Gap Detection',
    text: 'Identify skills you should highlight or improve.',
  },
  {
    icon: ClipboardCheck,
    title: 'Job Match',
    text: 'Compare your resume with a specific job description.',
  },
  {
    icon: Lightbulb,
    title: 'Actionable Recommendations',
    text: 'Get clear suggestions instead of generic advice.',
  },
]

function Features() {
  return (
    <section id="features" className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold tracking-wide text-violet-600 uppercase">
            Features
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to improve your resume
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            One analysis, six angles on what is working and what is holding you
            back.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 100}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-600/5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 transition group-hover:bg-violet-100">
                  <Icon className="h-5 w-5 text-violet-600" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
