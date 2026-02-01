# How to edit content

## Brand text
- Home hero copy: `app/page.tsx`
- About story: `app/about/page.tsx`
- Footer description: `components/SiteFooter.tsx`

## Policies
- Shipping: `app/policies/shipping/page.tsx`
- Returns: `app/policies/returns/page.tsx`
- Privacy: `app/policies/privacy/page.tsx`
- Terms: `app/policies/terms/page.tsx`

## Contact details
- Contact page messaging: `app/contact/page.tsx`
- Owner notification email address: `OWNER_EMAIL` in `.env`

## Images and media
- Product images/videos are uploaded in the admin dashboard and stored as Cloudinary URLs.
- Featured visuals (hero/Instagram placeholders) are simple blocks in `app/page.tsx` and can be replaced with real imagery.

## Logo
- Replace `components/BrandLogo.tsx` with your final logo component.

## Testimonials
- Edit testimonials in `components/Testimonials.tsx`.

## Newsletter
- Newsletter form is front-end only in `components/Newsletter.tsx`.

## SEO
- Metadata lives in `app/layout.tsx`.
- OpenGraph artwork is `public/opengraph-image.svg`.
