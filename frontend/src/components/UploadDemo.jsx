import { useRef, useState } from 'react'
import { ArrowRight, FileText, Loader2, UploadCloud } from 'lucide-react'

function UploadDemo() {
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const pickFile = (files) => {
    const picked = files?.[0]
    if (!picked) return
    if (picked.type !== 'application/pdf') {
      alert('Please upload a PDF file.')
      return
    }
    setFile(picked)
    setDone(false)
    setError('')
  }

  const analyze = async () => {
    if (!file) return

    setAnalyzing(true)
    setDone(false)
    setError('')

    const formData = new FormData()
    formData.append('resume', file)

    try {
      const response = await fetch(
        'https://zero-to-shipped-resume-8p4z.vercel.app/api/analyze',
        {
          method: 'POST',
          body: formData,
        },
      )

      if (!response.ok) {
        throw new Error('We could not analyze your resume right now.')
      }

      setDone(true)
    } catch {
      setError(
        'Something went wrong while analyzing your resume. Please try again.',
      )
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <section id="analyze" className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Try it now — drop in your resume
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          Upload your PDF resume and see the analysis flow in action. Your file
          stays in your browser; nothing is uploaded yet.
        </p>

        <div
          className={`mt-10 cursor-pointer rounded-2xl border-2 border-dashed p-12 transition ${
            dragging
              ? 'border-violet-500 bg-violet-50'
              : 'border-slate-300 bg-slate-50 hover:border-violet-400 hover:bg-violet-50/40'
          }`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            pickFile(e.dataTransfer.files)
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              inputRef.current?.click()
            }
          }}
          aria-label="Upload your resume as a PDF"
        >
          <UploadCloud
            className="mx-auto h-12 w-12 text-violet-500"
            aria-hidden="true"
          />
          {file ? (
            <div className="mt-4 flex items-center justify-center gap-2">
              <FileText className="h-5 w-5 text-slate-500" aria-hidden="true" />
              <p className="font-medium text-slate-900">{file.name}</p>
              <span className="text-sm text-slate-500">
                ({(file.size / 1024).toFixed(0)} KB)
              </span>
            </div>
          ) : (
            <>
              <p className="mt-4 font-medium text-slate-900">
                Drag &amp; drop your resume here
              </p>
              <p className="mt-1 text-sm text-slate-500">
                or click to browse — PDF only
              </p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => pickFile(e.target.files)}
          />
        </div>

        <button
          type="button"
          disabled={!file || analyzing}
          onClick={analyze}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-950 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {analyzing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Analyzing your resume...
            </>
          ) : (
            <>
              Analyze My Resume
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>

        {done && (
          <p className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
            Analysis complete! In the full product your detailed report would
            appear here — score, keywords, and recommendations. This demo keeps
            everything in the browser.
          </p>
        )}

        {error && (
          <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
            {error}
          </p>
        )}
      </div>
    </section>
  )
}

export default UploadDemo
