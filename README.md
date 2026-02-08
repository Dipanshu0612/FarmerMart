# FarmerMart — Local Farmer Marketplace

A full-stack marketplace built with Next.js where customers can discover and purchase fresh produce directly from local farmers, while sellers can manage products and track orders from a dedicated dashboard.

## Overview

FarmerMart connects two user roles:

- **Customers** can browse products, search/filter listings, manage wishlist/cart, checkout, and view orders.
- **Farmers/Sellers** can onboard as sellers, add/update/delete products, and monitor sales performance from a seller dashboard.

The app uses Clerk for authentication, MongoDB (Mongoose) for persistence, and Stripe for payments.

## Key Features

### Customer Experience

- Role-based onboarding (customer or seller)
- Product catalog with search and filtering
- Product details page
- Wishlist management
- Cart and checkout flow
- Order history and status tracking

### Seller Experience

- Seller-specific dashboard and navigation
- Add/update/delete products
- Product publish/unpublish toggle
- Seller orders view
- Dashboard KPIs (revenue, orders, customers, average order value)
- Chart-based order/revenue insights

### Platform & UX

- Auth + middleware route protection with Clerk
- Responsive UI with Tailwind CSS + reusable UI components
- Loading/skeleton states and global error boundaries
- Modern App Router structure (Next.js)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Auth:** Clerk (`@clerk/nextjs`, `@clerk/backend`)
- **Database:** MongoDB + Mongoose
- **Payments:** Stripe
- **State Management:** Zustand
- **Validation/Form Tools:** Yup, Formik
- **UI:** Tailwind CSS, Radix UI primitives, shadcn-style components, Lucide icons
- **Charts:** Recharts

## Project Structure

```text
app/
  (auth)/              # Sign-in, sign-up, onboarding
  (user)/              # Customer-facing pages (home, products, cart, orders, etc.)
  seller/              # Seller dashboard and management pages
  api/                 # Route handlers (payment, user, seller product ops)
components/            # Shared and feature components
lib/
  actions/             # Server-side data/actions layer
  models/              # Mongoose models
  store/               # Zustand store
  mongoDB.ts           # MongoDB connection utility
utils/                 # Helper utilities
public/                # Static assets
```

## Getting Started

### 1) Prerequisites

- Node.js 18+
- npm
- MongoDB database
- Clerk application credentials
- Stripe account and API key

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables

Create a `.env.local` file in the root and add:

```env
# Database
MONGODB_URL=your_mongodb_connection_string

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 4) Run in development

```bash
npm run dev
```

App will be available at `http://localhost:3000`.

## Available Scripts

- `npm run dev` — Start dev server
- `npm run build` — Build for production
- `npm run start` — Run production build
- `npm run lint` — Run lint checks

## API Highlights

- `POST /api/payment` — Creates Stripe Checkout session
- Seller product management APIs under:
  - `/api/seller/(product)/add-product`
  - `/api/seller/(product)/update-product`
  - `/api/seller/(product)/delete-product`
  - `/api/seller/(product)/update-product-toggle`
- User-related APIs under:
  - `/api/users`
  - `/api/users/wishlist`
  - `/api/users/review`
  - `/api/users/orders-success`

## Notes

- Currency configuration in payment flow is set to **INR**.
- Shipping is configured with a fixed delivery charge in Stripe checkout.
- MongoDB connection uses a shared singleton-style guard to avoid duplicate connections during development.

## License

This project is currently unlicensed (private/internal usage unless otherwise specified by the repository owner).
