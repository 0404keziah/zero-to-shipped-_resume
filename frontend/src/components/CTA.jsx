import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

function CTA() {
  return (
    <section className="bg-white px-6 pb-24">
      <Reveal>
        <div className="mx-auto max-w-5xl rounded-3xl bg-blue-950 px-8 py-16 text-center shadow-2xl shadow-blue-950/20 sm:px-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to make your resume stronger?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-blue-100/80">
            Get your personalized resume analysis and discover exactly what you
            can improve.
          </p>
          <a
            href="#analyze"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-blue-950 shadow-lg transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-blue-950"
          >
            Analyze My Resume — It's Free
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>
  )
}

export default CTA
