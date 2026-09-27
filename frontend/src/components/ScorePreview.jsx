import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'

const metrics = [
  { label: 'ATS Compatibility', value: 92, barClass: 'bg-emerald-500' },
  { label: 'Content Quality', value: 85, barClass: 'bg-blue-600' },
  { label: 'Skills Match', value: 84, barClass: 'bg-violet-500' },
  { label: 'Keyword Optimization', value: 88, barClass: 'bg-indigo-500' },
]

const CIRCUMFERENCE = 2 * Math.PI * 56 // r = 56 on a 140px viewBox

// SVG ring that fills up to the target score once scrolled into view.
function ScoreRing({ target }) {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const duration = 1500
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1)
          setProgress(target * (1 - Math.pow(1 - p, 3)))
          if (p < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target])

  return (
    <div ref={ref} className="relative h-40 w-40">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
        <circle
          cx="70"
          cy="70"
          r="56"
          fill="none"
          strokeWidth="12"
          className="stroke-slate-100"
        />
        <circle
          cx="70"
          cy="70"
          r="56"
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          className="stroke-violet-600 transition-none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress / 100)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold tracking-tight text-slate-900">
          {Math.round(progress)}
        </span>
        <span className="text-sm font-medium text-slate-500">/ 100</span>
      </div>
    </div>
  )
}

function MetricRow({ label, value, barClass }) {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWidth(value)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref}>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-600">{label}</span>
        <span className="font-semibold text-slate-900">{value}%</span>
      </div>
      <div
        className="h-2.5 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-1000 ease-out ${barClass}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

function ScorePreview() {
  return (
    <section id="score" className="bg-blue-950">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2">
        <Reveal>
          <span className="text-sm font-semibold tracking-wide text-violet-300 uppercase">
            Resume Score
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Know exactly where your resume stands.
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-blue-100/80">
            Every resume gets a single score out of 100, built from four
            weighted signals: how well it parses in ATS systems, the quality of
            your content, how your skills match your target role, and whether
            the right keywords are present. No guesswork — just a number you can
            watch climb as you improve.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              'Weighted across the signals recruiters actually filter on',
              'Benchmarked against resumes that landed interviews',
              'Re-score as many times as you like while you edit',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-blue-100">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400"
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-3xl border border-white/10 bg-white p-8 shadow-2xl shadow-black/20">
            <div className="flex flex-col items-center gap-8 sm:flex-row">
              <div className="text-center">
                <ScoreRing target={87} />
                <p className="mt-3 text-sm font-semibold text-slate-900">
                  Overall Score
                </p>
                <p className="text-xs text-slate-500">87 / 100</p>
              </div>
              <div className="w-full flex-1 space-y-5">
                {metrics.map((m) => (
                  <MetricRow key={m.label} {...m} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default ScorePreview
