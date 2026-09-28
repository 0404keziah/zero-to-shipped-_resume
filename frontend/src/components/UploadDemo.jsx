import { useRef, useState } from 'react'
import { ArrowRight, FileText, Loader2, UploadCloud } from 'lucide-react'

function UploadDemo() {
  const [file, setFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [dragging, setDragging] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState(null)
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
    setAnalysis(null)
    setError('')
  }

  const analyze = async () => {
    if (!file || !jobDescription.trim()) return

    setAnalyzing(true)
    setAnalysis(null)
    setError('')

    const formData = new FormData()
    formData.append('resume', file)
    formData.append('jobDescription', jobDescription.trim())

    try {
      const response = await fetch(
        'https://zero-to-shipped-resume-8p4z.vercel.app/api/analyze',
        {
          method: 'POST',
          body: formData,
        },
      )

      const result = await response.json()
      if (!response.ok) {
        throw new Error(
          result.message || 'We could not analyze your resume right now.',
        )
      }

      setAnalysis(result)
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Something went wrong while analyzing your resume. Please try again.',
      )
    } finally {
      setAnalyzing(false)
    }
  }

  const matchMessage =
    analysis?.score >= 90
      ? 'Excellent match'
      : analysis?.score >= 75
        ? 'Strong match'
        : analysis?.score >= 60
          ? 'Moderate match'
          : 'Needs improvement'

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

        <div className="mt-8 text-left">
          <label
            htmlFor="job-description"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            Job Description
          </label>
          <textarea
            id="job-description"
            value={jobDescription}
            onChange={(event) => {
              setJobDescription(event.target.value)
              setAnalysis(null)
              setError('')
            }}
            placeholder="Paste the job description you want to match against..."
            rows={6}
            className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
          />
        </div>

        <button
          type="button"
          disabled={!file || !jobDescription.trim() || analyzing}
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

        {error && (
          <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
            {error}
          </p>
        )}

        {analysis && (
          <div className="mt-10 space-y-5 text-left">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Resume Match
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {matchMessage} for this job description
                  </p>
                </div>
                <p className="text-4xl font-bold tracking-tight text-blue-950">
                  {analysis.score}%
                </p>
              </div>
              <div
                className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-label="Resume match score"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={analysis.score}
              >
                <div
                  className="h-full rounded-full bg-blue-950 transition-all"
                  style={{ width: `${analysis.score}%` }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-lg font-semibold text-slate-900">
                Matching Skills
              </h3>
              {analysis.matchingKeywords.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {analysis.matchingKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-900"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-600">
                  No matching keywords were detected.
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-lg font-semibold text-slate-900">
                Missing Skills
              </h3>
              {analysis.missingKeywords.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {analysis.missingKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-900"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm font-medium text-emerald-800">
                  Great match — no important missing keywords detected.
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-lg font-semibold text-slate-900">
                What to Improve
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                {analysis.suggestions.map((suggestion) => (
                  <li key={suggestion}>{suggestion}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default UploadDemo
