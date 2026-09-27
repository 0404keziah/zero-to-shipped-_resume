import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react'
import Reveal from './Reveal'

function BeforeAfter() {
  return (
    <section id="resources" className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold tracking-wide text-violet-600 uppercase">
            See the difference
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            From a duty to an achievement
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            The same experience, rewritten the way hiring managers and ATS
            systems reward: specific, quantified, and action-led.
          </p>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-[1fr_auto_1fr]">
          {/* Before */}
          <Reveal>
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
                <span className="text-sm font-semibold tracking-wide text-red-600 uppercase">
                  Before
                </span>
              </div>
              <blockquote className="mt-4 rounded-xl bg-slate-50 p-4 text-slate-700 italic">
                "Worked on website development."
              </blockquote>
              <ul className="mt-4 space-y-2 text-sm text-slate-500">
                <li>&bull; Passive verb, no ownership</li>
                <li>&bull; No scope, tools, or outcome</li>
                <li>&bull; Nothing for an ATS to match against</li>
              </ul>
            </div>
          </Reveal>

          {/* Arrow */}
          <Reveal delay={100} className="flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-950 text-white shadow-lg shadow-blue-950/20 max-md:rotate-90">
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </span>
          </Reveal>

          {/* After */}
          <Reveal delay={150}>
            <div className="h-full rounded-2xl border border-emerald-200 bg-white p-6 shadow-lg shadow-emerald-600/5">
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className="h-5 w-5 text-emerald-500"
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold tracking-wide text-emerald-600 uppercase">
                  After
                </span>
              </div>
              <blockquote className="mt-4 rounded-xl bg-emerald-50 p-4 text-slate-800">
                "Designed and developed responsive web interfaces, improving
                usability and reducing task completion time."
              </blockquote>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>&bull; Strong action verbs: designed, developed</li>
                <li>&bull; Keywords an ATS can match: responsive web interfaces</li>
                <li>&bull; Measurable impact on usability and completion time</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default BeforeAfter
