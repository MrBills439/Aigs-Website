'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ProductMedia } from '@prisma/client';

export default function MediaGallery({ media, title }: { media: ProductMedia[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = media[activeIndex];

  if (media.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center rounded-3xl border border-rose/30 bg-white text-sm text-deep/60">
        No media uploaded yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-3xl border border-rose/30 bg-white">
        {active.type === 'VIDEO' ? (
          <video src={active.url} controls className="h-96 w-full object-cover" />
        ) : (
          <div className="relative h-96 w-full">
            <Image
              src={active.url}
              alt={active.alt || title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
      </div>
      <div className="flex gap-3 overflow-x-auto">
        {media.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveIndex(index)}
            className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border ${
              index === activeIndex ? 'border-deep' : 'border-rose/30'
            }`}
          >
            {item.type === 'VIDEO' ? (
              <div className="flex h-full items-center justify-center bg-deep text-xs uppercase tracking-[0.3em] text-white">
                Video
              </div>
            ) : (
              <Image src={item.url} alt={item.alt || title} fill className="object-cover" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
