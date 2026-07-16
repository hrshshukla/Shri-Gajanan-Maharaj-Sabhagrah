import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'

// Mirrors the Vercel serverless function (api/send-email.js) so the booking
// form works identically in local development and in production on Vercel.
function bookingApiPlugin(): Plugin {
  return {
    name: 'booking-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/send-email', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ ok: false, message: 'Method not allowed.' }))
          return
        }
        try {
          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(chunk as Buffer)
          const raw = Buffer.concat(chunks).toString('utf-8') || '{}'
          const body = JSON.parse(raw)

          const { validateBooking, sendBookingEmail } = await server.ssrLoadModule('/api/_mailer.js')

          const validationError = validateBooking(body)
          if (validationError) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, message: validationError }))
            return
          }

          await sendBookingEmail(body)
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: true, message: 'Inquiry sent successfully.' }))
        } catch (error: any) {
          console.error('[booking-api-dev-middleware] send-email error:', error)
          res.statusCode = error?.statusCode || 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({
            ok: false,
            message: 'Something went wrong while sending your inquiry. Please try again or call us directly.',
          }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), bookingApiPlugin()],
  server: {
    port: 5000,
    host: '0.0.0.0',
    allowedHosts: true,
  },
})
