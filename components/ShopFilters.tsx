'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const textures = ['Straight', 'Body Wave', 'Loose Curl', 'Deep Wave'];
const lengths = ['12', '16', '20', '24', '28'];
const laceTypes = ['HD Lace', 'Transparent Lace', 'Swiss Lace'];
const capSizes = ['Small', 'Medium', 'Large'];

export default function ShopFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');

  const updateParam = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="card space-y-4 p-6">
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-deep/60">Search</label>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => updateParam('q', query || undefined)}
          placeholder="Search wigs"
          className="mt-2 w-full rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
        />
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-deep/60">Texture</label>
        <select
          className="mt-2 w-full rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
          value={searchParams.get('texture') ?? ''}
          onChange={(event) => updateParam('texture', event.target.value || undefined)}
        >
          <option value="">All</option>
          {textures.map((texture) => (
            <option key={texture} value={texture}>
              {texture}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-deep/60">Length</label>
        <select
          className="mt-2 w-full rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
          value={searchParams.get('length') ?? ''}
          onChange={(event) => updateParam('length', event.target.value || undefined)}
        >
          <option value="">All</option>
          {lengths.map((length) => (
            <option key={length} value={length}>
              {length}" 
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-deep/60">Lace Type</label>
        <select
          className="mt-2 w-full rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
          value={searchParams.get('laceType') ?? ''}
          onChange={(event) => updateParam('laceType', event.target.value || undefined)}
        >
          <option value="">All</option>
          {laceTypes.map((lace) => (
            <option key={lace} value={lace}>
              {lace}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-deep/60">Cap Size</label>
        <select
          className="mt-2 w-full rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
          value={searchParams.get('capSize') ?? ''}
          onChange={(event) => updateParam('capSize', event.target.value || undefined)}
        >
          <option value="">All</option>
          {capSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-3">
        <label className="text-xs uppercase tracking-[0.2em] text-deep/60">In stock</label>
        <input
          type="checkbox"
          checked={searchParams.get('inStock') === '1'}
          onChange={(event) => updateParam('inStock', event.target.checked ? '1' : undefined)}
          className="h-4 w-4 rounded border-rose/40"
        />
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-deep/60">Sort</label>
        <select
          className="mt-2 w-full rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
          value={searchParams.get('sort') ?? ''}
          onChange={(event) => updateParam('sort', event.target.value || undefined)}
        >
          <option value="">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
