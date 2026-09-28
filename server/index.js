require('dotenv').config()

const express = require('express')
const cors = require('cors')
const multer = require('multer')
const { MongoClient } = require('mongodb')

const app = express()
const PORT = process.env.PORT || 5000
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

// --- MongoDB Atlas ---
// The connection string lives in server/.env and is never stored in code.
const MONGO_URI = process.env.MONGODB_URI
const DB_NAME = 'resumeai'

// A single shared client + database handle, created once at startup.
const mongoClient = MONGO_URI
  ? new MongoClient(MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // fail fast if unreachable
    })
  : null
let db = null // becomes the Mongo database handle once connected

// Try to connect, but do NOT block HTTP startup — the API still runs even
// if the database is down. /api/db-health reports the real connection state.
async function connectMongo() {
  if (!mongoClient) {
    console.warn(
      '[mongo] MONGODB_URI is not set in .env — database features disabled. Add your Atlas URI to use the database.'
    )
    return
  }
  try {
    await mongoClient.connect()
    db = mongoClient.db(DB_NAME)
    console.log(`[mongo] Connected to MongoDB Atlas database "${DB_NAME}".`)
  } catch (err) {
    console.error(`[mongo] Could not connect to MongoDB Atlas: ${err.message}`)
    db = null
  }
}

// Only the Vite dev server may call this API.
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

// Files are kept in memory (never written to disk) and limited to 5 MB.
// fileFilter rejects anything that is not a PDF before the body is parsed.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    const isPdf =
      file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')
    if (isPdf) {
      cb(null, true)
    } else {
      cb(new Error('ONLY_PDF_ALLOWED'))
    }
  },
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// GET /api/db-health
// Confirms whether the MongoDB Atlas connection is live. If it is not, we
// return a 503 with a generic message — never exposing the URI or credentials.
app.get('/api/db-health', (req, res) => {
  if (!mongoClient || !db) {
    return res.status(503).json({
      status: 'error',
      database: 'disconnected',
      message: 'The database is not available right now. Please try again shortly.',
    })
  }
  res.json({
    status: 'ok',
    database: 'connected',
  })
})

// POST /api/analyze
// Expects: multipart/form-data with the PDF in a field named "resume".
// Returns: extracted resume text and metadata, or a JSON error describing what went wrong.
app.post('/api/analyze', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'NO_FILE',
        message: 'No resume was uploaded. Send the PDF in a form field named "resume".',
      })
    }

    // Load the worker first so it initializes the Node canvas globals before
    // pdf-parse is loaded. Keep both imports lazy so /api/health does not load
    // the heavy native canvas binding at startup.
    const { CanvasFactory } = require('pdf-parse/worker')
    const { PDFParse } = require('pdf-parse')

    let text
    let numPages
    try {
      const parser = new PDFParse({
        data: req.file.buffer,
        CanvasFactory,
      })
      const result = await parser.getText()
      await parser.destroy()
      text = result.text
      numPages = result.total
    } catch (parseError) {
      // The file claimed to be a PDF but could not be parsed
      // (corrupt file, encrypted, or not actually a PDF).
      return res.status(422).json({
        success: false,
        error: 'PDF_PARSE_FAILED',
        message:
          'We could not read this file. It may be corrupted or password-protected. Please export your resume as a standard PDF and try again.',
      })
    }

    const trimmed = (text || '').trim()
    if (trimmed.length === 0) {
      // Parsed fine but contains no text layer — typically a scanned image PDF.
      return res.status(422).json({
        success: false,
        error: 'NO_TEXT_FOUND',
        message:
          'No readable text was found in this PDF. If it is a scanned document, export your resume from a word processor instead.',
      })
    }

    return res.json({
      success: true,
      message: 'Resume content extracted successfully.',
      fileName: req.file.originalname,
      fileSizeKB: Math.round(req.file.size / 1024),
      pages: numPages,
      extractedText: trimmed,
    })
  } catch (err) {
    console.error('Unexpected error in /api/analyze:', err)
    return res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'Something went wrong on our side. Please try again.',
    })
  }
})

// Multer errors (file too large, wrong type) land here and become JSON.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      success: false,
      error: 'FILE_TOO_LARGE',
      message: 'The resume is larger than 5 MB. Please upload a smaller PDF.',
    })
  }
  if (err && err.message === 'ONLY_PDF_ALLOWED') {
    return res.status(415).json({
      success: false,
      error: 'INVALID_FILE_TYPE',
      message: 'Only PDF files are accepted.',
    })
  }
  console.error('Unhandled error:', err)
  return res.status(500).json({
    success: false,
    error: 'SERVER_ERROR',
    message: 'Something went wrong on our side. Please try again.',
  })
})

app.listen(PORT, () => {
  console.log(`ResumeAI server listening on http://localhost:${PORT}`)
})

// Kick off the MongoDB connection after the server is listening.
connectMongo()