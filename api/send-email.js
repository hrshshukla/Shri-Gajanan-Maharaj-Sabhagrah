// Vercel Serverless Function: POST /api/send-email
// Sends the booking form data to talktoharshukla@gmail.com via Nodemailer/Gmail.
import { sendBookingEmail, validateBooking } from './_mailer.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Method not allowed.' })
    return
  }

  try {
    const body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}')

    const validationError = validateBooking(body)
    if (validationError) {
      res.status(400).json({ ok: false, message: validationError })
      return
    }

    await sendBookingEmail(body)

    res.status(200).json({ ok: true, message: 'Inquiry sent successfully.' })
  } catch (error) {
    console.error('send-email error:', error)
    const statusCode = error?.statusCode || 500
    res.status(statusCode).json({
      ok: false,
      message: 'Something went wrong while sending your inquiry. Please try again or call us directly.',
    })
  }
}
