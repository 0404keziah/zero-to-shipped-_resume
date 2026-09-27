import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react'

// Animates a number from 0 up to `target` over `duration` ms (eased out).
function useCountUp(target, duration = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let frame
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration])

  return value
}

function ScoreBar({ label, value, barClass }) {
  const animated = useCountUp(value)
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="font-medium text-slate-600">{label}</span>
        <span className="font-semibold text-slate-900">{animated}%</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-1000 ease-out ${barClass}`}
          style={{ width: `${animated}%` }}
        />
      </div>
    </div>
  )
}

// Right-hand side: a static demo of what the analysis report looks like.
function DashboardPreview() {
  const score = useCountUp(87)
  const strengths = [
    'Strong action verbs',
    'Quantified achievements',
    'Clean formatting',
  ]

  return (
    <div className="relative">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-blue-950/5">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-slate-400" aria-hidden="true" />
            <span className="text-sm font-semibold text-slate-900">
              sarah-chen-resume.pdf
            </span>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            Analyzed
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 flex items-center justify-between rounded-xl bg-blue-950 p-4 text-white">
            <div>
              <p className="text-xs font-medium text-blue-200">Resume Score</p>
              <p className="mt-1 text-3xl font-extrabold tracking-tight">
                {score}
                <span className="text-lg font-semibold text-blue-300">
                  /100
                </span>
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <TrendingUp className="h-6 w-6 text-emerald-300" aria-hidden="true" />
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <ScoreBar
              label="ATS Compatibility"
              value={92}
              barClass="bg-emerald-500"
            />
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <ScoreBar label="Skills Match" value={84} barClass="bg-violet-500" />
          </div>
          <div className="col-span-2 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <ScoreBar
              label="Keyword Match"
              value={76}
              barClass="bg-blue-600"
            />
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-slate-100 p-4">
          <p className="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Strengths
          </p>
          <ul className="space-y-1.5">
            {strengths.map((s) => (
              <li
                key={s}
                className="flex items-center gap-2 text-sm text-slate-700"
              >
                <CheckCircle2
                  className="h-4 w-4 shrink-0 text-emerald-500"
                  aria-hidden="true"
                />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Floating suggestion card */}
      <div className="absolute -bottom-6 -left-4 hidden w-64 rounded-xl border border-slate-200 bg-white p-4 shadow-lg shadow-blue-950/10 sm:block">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-100">
            <Sparkles className="h-4 w-4 text-violet-600" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold text-slate-900">
              Improvement found
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
              Add 3 missing keywords from the job description to your skills
              section.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  const fileRef = useRef(null)

  return (
    <section id="top" className="relative overflow-hidden bg-slate-50">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 pt-20 pb-28 lg:grid-cols-2 lg:pt-28">
        {/* Left: copy + CTAs */}
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold tracking-wide text-violet-700">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            AI-POWERED RESUME ANALYZER
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Turn Your Resume Into Your Next{' '}
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Opportunity.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            Get an instant AI-powered resume review, ATS score, keyword
            analysis, and actionable recommendations to make your resume
            job-ready.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#analyze"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              Analyze My Resume
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              <PlayCircle className="h-4 w-4" aria-hidden="true" />
              See How It Works
            </a>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-500" aria-hidden="true" />
            No credit card required &bull; Instant analysis &bull; Built for job
            seekers
          </p>
        </div>

        {/* Right: dashboard preview */}
        <DashboardPreview />
      </div>

      {/* Hidden input kept for the future upload flow */}
      <input ref={fileRef} type="file" accept=".pdf" className="hidden" />
    </section>
  )
}

export default Hero
