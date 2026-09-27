import { AlertTriangle, FileWarning, ListX, Type } from 'lucide-react'
import Reveal from './Reveal'

const problems = [
  {
    icon: ListX,
    title: 'Missing keywords',
    text: 'Recruiters search by keyword. If your resume does not use the language of the job posting, it never surfaces.',
  },
  {
    icon: AlertTriangle,
    title: 'Low ATS compatibility',
    text: '75% of resumes are filtered out by applicant tracking systems before a human ever reads them.',
  },
  {
    icon: FileWarning,
    title: 'Weak descriptions',
    text: 'Vague bullet points like "responsible for projects" tell hiring managers nothing about your actual impact.',
  },
  {
    icon: Type,
    title: 'Poor formatting',
    text: 'Columns, graphics and odd fonts break ATS parsing and make your resume hard to skim in six seconds.',
  },
]

function ProblemSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Your resume should work as hard as you do.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Most resumes fail for a handful of predictable reasons. Here is what
            stands between you and the interview.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                  <Icon className="h-5 w-5 text-red-500" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
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

export default ProblemSection
