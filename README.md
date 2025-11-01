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

## Tech Stack
- Frontend: React 19, Vite, React Router
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- Extras: jsbarcode, qrcode (legacy), three.js background

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

## Troubleshooting
- Barcode import errors in Vite: ensure `jsbarcode` is installed in `frontend1` and restart the dev server.
- Mongo connection: verify `MONGO_URI` and that MongoDB is running.
- CORS: backend enables CORS by default; update if deploying across domains.

## Deployment
- Set production `MONGO_URI` and `JWT_SECRET` on the server.
- Serve backend with a process manager (PM2/forever) or a platform (Railway/Render/Heroku alternative).
- Build frontend and host statics (Netlify/Vercel) or serve behind the backend.

## License
Proprietary – internal project. Update this section if you want to open‑source.
