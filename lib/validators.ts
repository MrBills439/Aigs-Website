import { z } from 'zod';

export const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Name is required'),
  customerEmail: z.string().email('Valid email required'),
  phone: z.string().min(6, 'Phone is required'),
  deliveryMethod: z.enum(['STANDARD', 'EXPRESS', 'COLLECTION']),
  shippingAddressLine1: z.string().optional(),
  shippingAddressLine2: z.string().optional(),
  city: z.string().optional(),
  postcode: z.string().optional(),
  country: z.string().optional(),
  paymentMethod: z.enum(['BANK_TRANSFER', 'CASH_ON_COLLECTION', 'PAYMENT_LINK', 'OTHER']),
  notes: z.string().optional()
}).superRefine((data, ctx) => {
  // Shipping fields are optional only for in-store collection.
  if (data.deliveryMethod !== 'COLLECTION') {
    if (!data.shippingAddressLine1) {
      ctx.addIssue({ code: 'custom', path: ['shippingAddressLine1'], message: 'Address line 1 is required' });
    }
    if (!data.city) {
      ctx.addIssue({ code: 'custom', path: ['city'], message: 'City is required' });
    }
    if (!data.postcode) {
      ctx.addIssue({ code: 'custom', path: ['postcode'], message: 'Postcode is required' });
    }
    if (!data.country) {
      ctx.addIssue({ code: 'custom', path: ['country'], message: 'Country is required' });
    }
  }
});

export const productSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().min(10),
  price: z.number().min(0),
  currency: z.string().min(3),
  wigType: z.string().min(2),
  texture: z.string().min(2),
  lengthInches: z.array(z.string()).min(1),
  density: z.string().min(2),
  laceType: z.string().min(2),
  capSize: z.string().min(1),
  color: z.string().min(2),
  sku: z.string().min(2),
  stockQty: z.number().min(0),
  isFeatured: z.boolean(),
  isActive: z.boolean()
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});
