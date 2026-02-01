'use client';

import { useState } from 'react';

type MediaItem = {
  id: string;
  url: string;
  type: 'IMAGE' | 'VIDEO';
  alt?: string | null;
  sortOrder: number;
};

export default function MediaUploader({
  productId,
  media,
  onChange
}: {
  productId: string;
  media: MediaItem[];
  onChange: (media: MediaItem[]) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(file: File) {
    setUploading(true);
    const signatureResponse = await fetch('/api/upload-signature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folder: 'adis-wigs' })
    });
    const signatureData = await signatureResponse.json();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', signatureData.apiKey);
    formData.append('timestamp', signatureData.timestamp);
    formData.append('signature', signatureData.signature);
    formData.append('folder', signatureData.folder);

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      alert('Missing Cloudinary cloud name');
      setUploading(false);
      return;
    }

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      {
        method: 'POST',
        body: formData
      }
    );
    const uploadData = await uploadResponse.json();

    if (!uploadResponse.ok) {
      alert('Upload failed');
      setUploading(false);
      return;
    }

    const mediaResponse = await fetch(`/api/admin/products/${productId}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: uploadData.resource_type === 'video' ? 'VIDEO' : 'IMAGE',
        url: uploadData.secure_url,
        alt: uploadData.original_filename,
        sortOrder: media.length + 1
      })
    });

    const newMedia = await mediaResponse.json();
    onChange([...media, newMedia]);
    setUploading(false);
  }

  async function removeMedia(mediaId: string) {
    await fetch(`/api/admin/products/${productId}/media?mediaId=${mediaId}`, {
      method: 'DELETE'
    });
    onChange(media.filter((item) => item.id !== mediaId));
  }

  async function moveMedia(mediaId: string, direction: 'up' | 'down') {
    const index = media.findIndex((item) => item.id === mediaId);
    if (index === -1) return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= media.length) return;
    const newMedia = [...media];
    const [moved] = newMedia.splice(index, 1);
    newMedia.splice(newIndex, 0, moved);

    const updates = newMedia.map((item, idx) => ({ id: item.id, sortOrder: idx + 1 }));
    await fetch(`/api/admin/products/${productId}/media`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updates })
    });
    onChange(newMedia.map((item, idx) => ({ ...item, sortOrder: idx + 1 })));
  }

  return (
    <div className="space-y-4">
      <label className="text-xs uppercase tracking-[0.2em] text-deep/60">Media</label>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) handleUpload(file);
        }}
        className="block w-full text-sm"
      />
      {uploading && <p className="text-xs text-deep/60">Uploading...</p>}
      <div className="space-y-3">
        {media.map((item, index) => (
          <div key={item.id} className="flex items-center justify-between gap-4 rounded-2xl border border-rose/30 bg-white p-3 text-xs">
            <span>{item.type}</span>
            <span className="truncate text-deep/70">{item.url}</span>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => moveMedia(item.id, 'up')} disabled={index === 0}>
                Up
              </button>
              <button type="button" onClick={() => moveMedia(item.id, 'down')} disabled={index === media.length - 1}>
                Down
              </button>
              <button type="button" onClick={() => removeMedia(item.id)} className="text-deep/60">
                Remove
              </button>
            </div>
          </div>
        ))}
        {media.length === 0 && <p className="text-xs text-deep/60">No media uploaded yet.</p>}
      </div>
    </div>
  );
}
