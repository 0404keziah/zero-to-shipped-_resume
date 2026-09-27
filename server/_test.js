// One-shot integration test for the resume upload server.
// Builds a minimal valid PDF, POSTs it to /api/analyze, and reports the response.
const { spawn } = require('child_process')
const http = require('http')

const PORT = 5999

const minimalPdf = Buffer.from(
  '%PDF-1.4\n' +
    '1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n' +
    '2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n' +
    '3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Contents 4 0 R>>endobj\n' +
    '4 0 obj<</Length 44>>stream\n' +
    'BT /F1 12 Tf 72 700 Td (Hello from the resume) Tj ET\n' +
    'endstream\nendobj\n' +
    '5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj\n' +
    'trailer<</Root 1 0 R>>\n' +
    '%%EOF\n'
)

function post(path, fieldName, fieldValue, filename, contentType) {
  const boundary = '----labdtest' + Date.now()
  const head =
    '--' + boundary + '\r\n' +
    'Content-Disposition: form-data; name="' + fieldName + '"; filename="' + filename + '"\r\n' +
    'Content-Type: ' + contentType + '\r\n\r\n'
  const tail = '\r\n--' + boundary + '--\r\n'
  const body = Buffer.concat([Buffer.from(head, 'utf8'), fieldValue, Buffer.from(tail, 'utf8')])

  const req = http.request({
    host: '127.0.0.1',
    port: PORT,
    path,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data; boundary=' + boundary,
      'Content-Length': body.length,
    },
  })
  req.end(body)
  return req
}

const srv = spawn('node', ['index.js'], {
  env: { ...process.env, PORT: String(PORT), CLIENT_ORIGIN: 'http://localhost:5173' },
})

let sawServing = false
function waitForServer() {
  return new Promise((resolve, reject) => {
    const t = Date.now()
    const tick = new Promise((ok, no) => {
      ;(function tryUp() {
        if (Date.now() - t > 5000) return no(new Error('server did not start'))
        const p = http.request({ host: '127.0.0.1', port: PORT, path: '/api/health', method: 'GET' })
        p.on('response', (r) => { r.resume(); ok(true) })
        p.on('error', () => setTimeout(tryUp, 150))
        p.end()
      })()
    })
    resolve(tick)
  })
}

async function main() {
  try {
    await waitForServer()

    const cases = [
      ['success', post('/api/analyze', 'resume', minimalPdf, 'resume.pdf', 'application/pdf')],
      ['wrong type', post('/api/analyze', 'resume', Buffer.from('not a pdf'), 'resume.txt', 'text/plain')],
      [
        'too large',
        post('/api/analyze', 'resume', Buffer.alloc(6 * 1024 * 1024, 120), 'big.pdf', 'application/pdf'),
      ],
      ['no file', post('/api/analyze', 'empty', Buffer.from('x'), 'x.pdf', 'application/pdf')],
    ]

    for (const [name, req] of cases) {
      const status = await new Promise((ok) => req.on('response', (r) => {
        const chunks = []
        r.on('data', (c) => chunks.push(c))
        r.on('end', () => ok({ code: r.statusCode, body: Buffer.concat(chunks).toString() }))
      }))
      console.log('===', name, '->', status.code)
      console.log(status.body.slice(0, 300))
    }
  } finally {
    srv.kill()
  }
}

main().catch((e) => {
  console.error('TEST_ERROR', e.message)
  srv.kill()
  process.exit(1)
})