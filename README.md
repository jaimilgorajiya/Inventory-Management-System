# Inventory Management System

A full‑stack inventory app with authentication, Stock In and Stock Out flows, records/reports, and barcode generation for product details. Frontend is Vite + React; backend is Express + MongoDB.

## Features
- Stock In with vendor and product details
- Stock Out with party/dispatch details
- Product details dropdowns (category/size/color) sourced from past entries
- Stock summary for in‑stock product variants with remaining quantities
- Stock Out product selector shows only items currently available
- Client‑side validation prevents stock out beyond available
- PDF receipts generated on server for Stock In/Out
- Barcode (Code128) generation on submit (encodes product details)
- Auth (JWT) with protected routes
- Voice Assistant navigation (hands‑free page switching and help)

## Tech Stack
- Frontend: React 19, Vite, React Router
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- Extras: jsbarcode, qrcode (legacy), three.js background, Web Speech API (speech recognition + TTS), framer‑motion

## Monorepo Structure
- backend/
- frontend1/

## Prerequisites
- Node.js 18+
- MongoDB instance (local or hosted)

## Backend Setup
1. Create backend/.env
```
PORT=5000
MONGO_URI=<YOUR_MONGO_CONNECTION_STRING>
JWT_SECRET=<YOUR_JWT_SECRET>
```
2. Install & run
```
cd backend
npm install
npm run start
```
The server starts; check your console for the bound port.

### Backend Endpoints (summary)
- Auth: `POST /api/auth/login`, `POST /api/auth/register`
- Stock In:
  - `POST /api/stock-in` (auth)
  - `GET /api/stock-in` (auth)
  - `GET /api/stock-in/:id` (auth)
- Stock Out:
  - `POST /api/stock-out` (auth)
  - `GET /api/stock-out` (auth)
  - `GET /api/stock-out/:id` (auth)
- Stock utilities:
  - `GET /api/stock/summary` (auth) → available variants with remaining quantity
  - `GET /api/stock/options` (auth) → distinct categories/sizes/colors
- Static receipts
  - `/uploads/StockIn/:id.pdf`
  - `/uploads/StockOut/:id.pdf`

All protected routes require `Authorization: Bearer <JWT>`.

## Frontend Setup
1. Create frontend1/.env
```
VITE_API_BASE_URL=<YOUR_BACKEND_BASE_URL>
```
2. Install & run
```
cd frontend1
npm install
npm run dev
```
Open the printed local URL from the dev server output.

## Usage Tips
- Login/Register first. App sets the Authorization header for subsequent API calls.
- Stock In: use the datalist dropdowns for category/size/color or type new values.
- Stock Out: select a product from the "Select Product (in stock)" dropdown; fields auto‑fill and the available quantity is displayed. Quantity is validated against availability.
- After submit, a PNG barcode is generated for the product details; receipts can be downloaded from the success message link.

## Voice Assistant (Navigation)
The app includes a lightweight voice assistant for quick navigation between pages.

### How to use
- Click the microphone button in the bottom‑right, or press `Ctrl + Shift + V` (Cmd + Shift + V on macOS).
- Speak a command after the prompt. The assistant will read back status and navigate.

### Supported commands
- "Dashboard" or "Home"
- "Stock In"
- "Stock Out"
- "Records" or "View Records"
- "Reports", "Stock In Report", "Stock Out Report"
- "Logout"
- "Help" (reads the available commands)

### Permissions and privacy
- Uses the browser's Web Speech API for on‑device speech recognition and text‑to‑speech.
- No audio is uploaded by this app. Behavior may vary by browser implementation.
- You must allow microphone access when prompted.

### Troubleshooting
- If you see "Voice recognition not supported", try Chrome/Edge on desktop.
- If nothing happens after clicking the mic, ensure mic permission is granted and no other app is using it.
- Recognition auto‑stops after ~10 seconds of silence; click the mic again to retry.

## Environment Notes
- If you see backend errors about missing env vars, ensure `.env` has `MONGO_URI` and `JWT_SECRET` defined.
- If frontend 401s appear, the app will redirect to /login and clear tokens automatically.

## Scripts
Backend
- `npm start` – start API

Frontend
- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview production build
