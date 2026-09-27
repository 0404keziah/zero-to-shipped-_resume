import { ScanText } from 'lucide-react'

const columns = [
  {
    title: 'Product',
    links: ['Features', 'How It Works', 'Resume Score', 'Pricing'],
  },
  {
    title: 'Resources',
    links: ['Resume Guide', 'ATS Tips', 'Blog', 'Help Center'],
  },
  {
    title: 'Company',
    links: ['Privacy', 'Terms', 'Contact'],
  },
]

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-950 text-white">
                <ScanText className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                ResumeAI
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
              AI-powered resume review and scoring that helps job seekers get
              past the filters and into the interview.
            </p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={`Footer: ${col.title}`}>
              <h3 className="text-sm font-semibold text-slate-900">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-sm text-slate-600 transition hover:text-slate-900"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          &copy; 2026 ResumeAI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
