# ADIS WiGS AND Beauty — eCommerce Platform

Production-ready wig store with customer storefront, manual checkout, and an admin dashboard.

## Tech stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- PostgreSQL + Prisma ORM
- NextAuth (admin-only login)
- Cloudinary (image/video uploads)
- Resend (transactional email)
- Zod + React Hook Form
- Zustand for cart state

## Quick start
1) Install dependencies
```bash
npm install
```

2) Create `.env`
```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/dbname"
NEXTAUTH_SECRET="replace-with-strong-secret"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="owner@adiswigsandbeauty.com"
ADMIN_PASSWORD="ChangeMe123!"
OWNER_EMAIL="owner@adiswigsandbeauty.com"
RESEND_API_KEY="re_..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
```

3) Run Prisma and seed
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

4) Start the dev server
```bash
npm run dev
```

Visit:
- Storefront: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

## Manual payment flow
Checkout does not charge the customer. After order placement:
- Owner receives a detailed email
- Customer receives confirmation and next steps

## Cloudinary uploads
The admin product form uploads media using signed uploads:
- Signature: `POST /api/upload-signature`
- Upload target: Cloudinary `auto/upload`
- Stored in DB as secure URLs only

## Resend emails
Order confirmation and owner notifications are sent via Resend. Ensure the sender domain is verified or change the `from` address in `lib/email.ts`.

## Database seed
Seed script creates:
- Admin user
- 8 sample products
- Product media placeholders

Default admin credentials come from `.env` values.

## Deployment notes
- Set all env variables in your host
- Use a managed Postgres database
- Run `prisma migrate deploy` in production

## Scripts
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run prisma:migrate`
- `npm run prisma:seed`
