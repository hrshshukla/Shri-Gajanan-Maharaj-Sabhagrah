// Shared mail-sending logic used by both the Vercel serverless function
// (api/send-email.js) and the local Vite dev middleware (vite.config.ts),
// so behavior is identical in local development and production.

const TO_ADDRESS = 'talktoharshshukla@gmail.com'

const REQUIRED_FIELDS = ['name', 'phone', 'eventType', 'day', 'month', 'year', 'guestCount']

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function validateBooking(body) {
  if (!body || typeof body !== 'object') {
    return 'Invalid request body.'
  }
  for (const field of REQUIRED_FIELDS) {
    if (!String(body[field] ?? '').trim()) {
      return `Missing required field: ${field}`
    }
  }
  return null
}

export async function sendBookingEmail(body) {
  const gmailUser = process.env.GMAIL_USER
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD

  if (!gmailUser || !gmailAppPassword) {
    const err = new Error(
      'Email is not configured on the server. Set GMAIL_USER and GMAIL_APP_PASSWORD.'
    )
    err.statusCode = 500
    throw err
  }

  const { name, phone, eventType, day, month, year, guestCount } = body
  const monthLabel = MONTHS[Number(month) - 1] || month
  const eventDate = `${day} ${monthLabel} ${year}`

  // Imported lazily so the function works whether nodemailer is resolved
  // from the project root (Vercel) or from node_modules during local dev.
  const nodemailer = (await import('nodemailer')).default

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  })

  const subject = `New Booking Inquiry — ${name} (${eventType})`

  const text = [
    'New booking inquiry from Grand Celebrations Venue website',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Event Type: ${eventType}`,
    `Event Date: ${eventDate}`,
    `Expected Guests: ${guestCount}`,
  ].join('\n')

  const rows = [
    ['Name', name],
    ['Phone', phone],
    ['Event Type', eventType],
    ['Event Date', eventDate],
    ['Expected Guests', guestCount],
  ]

  const rowsHtml = rows
    .map(
      ([label, value], i) => `
        <tr>
          <td style="padding:16px 28px; border-top:${i === 0 ? 'none' : '1px solid #ece3cf'}; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px; font-weight:700; letter-spacing:0.04em; text-transform:uppercase; color:#9c7f2d; white-space:nowrap; vertical-align:top; width:1%;">
            ${escapeHtml(label)}
          </td>
          <td style="padding:16px 28px; border-top:${i === 0 ? 'none' : '1px solid #ece3cf'}; font-family:'Helvetica Neue',Arial,sans-serif; font-size:15px; color:#0d1b2a;">
            ${escapeHtml(value)}
          </td>
        </tr>`
    )
    .join('')

  const html = `
  <!DOCTYPE html>
  <html>
    <body style="margin:0; padding:0; background-color:#f2ede1; font-family:'Helvetica Neue',Arial,sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2ede1; padding:32px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 6px 24px rgba(13,27,42,0.08);">

              <!-- Header -->
              <tr>
                <td style="background:linear-gradient(135deg,#0d1b2a,#16324a); padding:32px 28px;">
                  <div style="font-family:Georgia,'Times New Roman',serif; font-size:22px; color:#f2d68a; letter-spacing:0.03em;">
                    Grand Celebrations Venue
                  </div>
                  <div style="font-family:'Helvetica Neue',Arial,sans-serif; font-size:12px; letter-spacing:0.16em; text-transform:uppercase; color:rgba(255,255,255,0.55); margin-top:4px;">
                    Premium Banquet &amp; Event Venue
                  </div>
                </td>
              </tr>

              <!-- Title -->
              <tr>
                <td style="padding:32px 28px 8px 28px;">
                  <div style="display:inline-block; padding:5px 14px; border-radius:20px; background:rgba(201,168,76,0.12); border:1px solid rgba(201,168,76,0.35); font-family:'Helvetica Neue',Arial,sans-serif; font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#9c7f2d; margin-bottom:12px;">
                    New Booking Inquiry
                  </div>
                  <h1 style="font-family:Georgia,'Times New Roman',serif; font-size:24px; color:#0d1b2a; margin:14px 0 4px 0;">
                    ${escapeHtml(name)} wants to book an event
                  </h1>
                  <p style="font-family:'Helvetica Neue',Arial,sans-serif; font-size:14px; color:#8a8578; margin:0;">
                    Submitted via the Grand Celebrations Venue website
                  </p>
                </td>
              </tr>

              <!-- Details card -->
              <tr>
                <td style="padding:20px 28px 8px 28px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ece3cf; border-radius:10px; overflow:hidden;">
                    ${rowsHtml}
                  </table>
                </td>
              </tr>

              <!-- CTA -->
              <tr>
                <td style="padding:24px 28px 8px 28px;">
                  <a href="tel:${escapeHtml(phone).replace(/\s+/g, '')}" style="display:inline-block; background:linear-gradient(135deg,#9c7f2d,#e0c369); color:#0d1b2a; font-family:'Helvetica Neue',Arial,sans-serif; font-size:14px; font-weight:700; text-decoration:none; padding:13px 26px; border-radius:50px;">
                    Call ${escapeHtml(name)} →
                  </a>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:28px 28px 32px 28px;">
                  <div style="border-top:1px solid #ece3cf; padding-top:18px; font-family:'Helvetica Neue',Arial,sans-serif; font-size:12px; color:#a8a294;">
                    This inquiry was sent automatically from the booking form on your website.
                  </div>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `

  await transporter.sendMail({
    from: `"Grand Celebrations Venue" <${gmailUser}>`,
    to: TO_ADDRESS,
    replyTo: gmailUser,
    subject,
    text,
    html,
  })
}
