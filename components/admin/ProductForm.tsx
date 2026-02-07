'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { productSchema } from '@/lib/validators';
import MediaUploader from '@/components/admin/MediaUploader';
import { slugify } from '@/lib/slugify';

export type ProductFormValues = z.infer<typeof productSchema>;

type MediaItem = {
  id: string;
  url: string;
  type: 'IMAGE' | 'VIDEO';
  alt?: string | null;
  sortOrder: number;
};

export default function ProductForm({
  productId,
  defaultValues,
  initialMedia
}: {
  productId?: string;
  defaultValues?: Partial<ProductFormValues> & { priceDisplay?: string };
  initialMedia?: MediaItem[];
}) {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia ?? []);
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: defaultValues?.title ?? '',
      slug: defaultValues?.slug ?? '',
      description: defaultValues?.description ?? '',
      price: defaultValues?.price ?? 0,
      currency: defaultValues?.currency ?? 'GHS',
      wigType: defaultValues?.wigType ?? '',
      texture: defaultValues?.texture ?? '',
      lengthInches: defaultValues?.lengthInches ?? ['20'],
      density: defaultValues?.density ?? '',
      laceType: defaultValues?.laceType ?? '',
      capSize: defaultValues?.capSize ?? 'Medium',
      color: defaultValues?.color ?? '',
      sku: defaultValues?.sku ?? '',
      stockQty: defaultValues?.stockQty ?? 0,
      isFeatured: defaultValues?.isFeatured ?? false,
      isActive: defaultValues?.isActive ?? true
    }
  });

  const [priceDisplay, setPriceDisplay] = useState(
    defaultValues?.priceDisplay ?? (form.getValues('price') / 100).toString()
  );

  async function onSubmit(values: ProductFormValues) {
    const slug = values.slug && values.slug.trim().length > 0 ? values.slug : slugify(values.title);
    const payload = {
      ...values,
      slug,
      price: Math.round(Number(priceDisplay) * 100)
    };

    const response = await fetch(productId ? `/api/admin/products/${productId}` : '/api/admin/products', {
      method: productId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      alert('Unable to save product');
      return;
    }

    if (!productId) {
      const data = await response.json();
      window.location.href = `/admin/products/${data.slug ?? slug}`;
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="card grid gap-6 p-6 md:grid-cols-2">
        <div className="space-y-4">
          <input placeholder="Title" className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm" {...form.register('title')} />
          <input placeholder="Slug" className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm" {...form.register('slug')} />
          <textarea placeholder="Description" className="min-h-[140px] rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm" {...form.register('description')} />
          <div className="grid gap-4 md:grid-cols-2">
            <input
              placeholder="Price (GHS)"
              className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
              value={priceDisplay}
              onChange={(event) => setPriceDisplay(event.target.value)}
            />
            <input placeholder="Currency" className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm" {...form.register('currency')} />
          </div>
          <input placeholder="Wig type" className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm" {...form.register('wigType')} />
          <input placeholder="Texture" className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm" {...form.register('texture')} />
        </div>
        <div className="space-y-4">
          <input
            placeholder="Lengths (comma separated)"
            className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
            value={form.watch('lengthInches').join(', ')}
            onChange={(event) => form.setValue('lengthInches', event.target.value.split(',').map((v) => v.trim()).filter(Boolean))}
          />
          <input placeholder="Density" className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm" {...form.register('density')} />
          <input placeholder="Lace type" className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm" {...form.register('laceType')} />
          <input placeholder="Cap size" className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm" {...form.register('capSize')} />
          <input placeholder="Color" className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm" {...form.register('color')} />
          <div className="grid gap-4 md:grid-cols-2">
            <input placeholder="SKU" className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm" {...form.register('sku')} />
            <input
              placeholder="Stock"
              type="number"
              className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
              {...form.register('stockQty', { valueAsNumber: true })}
            />
          </div>
          <div className="flex items-center gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...form.register('isFeatured')} /> Featured
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" {...form.register('isActive')} /> Active
            </label>
          </div>
        </div>
      </div>
      {productId && (
        <div className="card p-6">
          <MediaUploader productId={productId} media={media} onChange={setMedia} />
        </div>
      )}
      <button type="submit" className="rounded-full bg-deep px-6 py-3 text-xs uppercase tracking-[0.2em] text-white">
        {productId ? 'Save changes' : 'Create product'}
      </button>
    </form>
  );
}
