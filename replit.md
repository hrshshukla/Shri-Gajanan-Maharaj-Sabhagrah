# Grand Celebrations Venue

A marketing/booking site for a banquet hall & event venue business. Built as a static single-page React app (Hero, About, Services, Venue Spaces, Events, Location, Booking form, Footer).

## Tech stack
- Vite + React 19 + TypeScript
- Plain CSS (`src/index.css`), lucide-react icons
- No database. One serverless function (`api/send-email.js`) handles booking emails via Nodemailer.

## Running the app
- Workflow "Start application" runs `npm run dev` (Vite dev server on port 5000, `host: 0.0.0.0`, `allowedHosts: true` for the Replit preview proxy).
- Build for production: `npm run build` (runs `tsc` then `vite build`); preview with `npm run preview`.

## Booking form emails
- `BookingForm.tsx` POSTs to `/api/send-email` with loading/success/error states and duplicate-submission prevention.
- `api/send-email.js` is a Vercel serverless function that sends the inquiry to `talktoharshukla@gmail.com` via Nodemailer/Gmail. Shared logic lives in `api/_mailer.js` so behavior matches in dev and prod.
- Local dev: a Vite middleware plugin (`vite.config.ts`) serves `/api/send-email` using the same `api/_mailer.js` logic, so the form works during `npm run dev` without deploying.
- Requires env vars `GMAIL_USER` and `GMAIL_APP_PASSWORD` (a Gmail App Password, not the account password — generate at https://myaccount.google.com/apppasswords). See `.env.example`. On Vercel, set these as project environment variables.

## Notes
- The repo's original `README.md` describes an unrelated project layout (an "Asset-Manager" monorepo with API server, mockup sandbox, Drizzle db, etc.) that does not match the actual code in this repo. Treat the README as stale/inaccurate; this file is the source of truth for running the project.

## User preferences
None recorded yet.
