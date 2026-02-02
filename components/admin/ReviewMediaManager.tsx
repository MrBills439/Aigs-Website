'use client';

import { useState } from 'react';

type ReviewMedia = {
  id: string;
  title: string;
  type: 'IMAGE' | 'VIDEO';
  url: string;
  alt?: string | null;
  sortOrder: number;
};

export default function ReviewMediaManager({ initialMedia }: { initialMedia: ReviewMedia[] }) {
  const [media, setMedia] = useState<ReviewMedia[]>(initialMedia);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);

  async function handleUpload(file: File) {
    if (!title.trim()) {
      alert('Add a short title or client name for the review.');
      return;
    }
    setUploading(true);
    const signatureResponse = await fetch('/api/upload-signature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folder: 'adis-wigs/reviews' })
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

    const createResponse = await fetch('/api/admin/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.trim(),
        type: uploadData.resource_type === 'video' ? 'VIDEO' : 'IMAGE',
        url: uploadData.secure_url,
        alt: uploadData.original_filename,
        sortOrder: media.length + 1
      })
    });

    const newMedia = await createResponse.json();
    setMedia((prev) => [...prev, newMedia]);
    setTitle('');
    setUploading(false);
  }

  async function removeMedia(id: string) {
    await fetch(`/api/admin/reviews?mediaId=${id}`, { method: 'DELETE' });
    setMedia((prev) => prev.filter((item) => item.id !== id));
  }

  async function moveMedia(id: string, direction: 'up' | 'down') {
    const index = media.findIndex((item) => item.id === id);
    if (index === -1) return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= media.length) return;
    const newMedia = [...media];
    const [moved] = newMedia.splice(index, 1);
    newMedia.splice(newIndex, 0, moved);

    const updates = newMedia.map((item, idx) => ({ id: item.id, sortOrder: idx + 1 }));
    await fetch('/api/admin/reviews', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updates })
    });
    setMedia(newMedia.map((item, idx) => ({ ...item, sortOrder: idx + 1 })));
  }

  return (
    <div className="card space-y-4 p-6">
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-deep/60">Review title / client name</label>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. Amina O. - Lace melt review"
          className="mt-2 w-full rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
        />
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-deep/60">Upload review media</label>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) handleUpload(file);
          }}
          className="mt-2 block w-full text-sm"
        />
        {uploading && <p className="mt-2 text-xs text-deep/60">Uploading...</p>}
      </div>
      <div className="space-y-3">
        {media.map((item, index) => (
          <div key={item.id} className="flex items-center justify-between gap-4 rounded-2xl border border-rose/30 bg-white p-3 text-xs">
            <div>
              <p className="font-semibold text-deep">{item.title}</p>
              <p className="text-deep/60">{item.type} · {item.url}</p>
            </div>
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
        {media.length === 0 && <p className="text-xs text-deep/60">No review media yet.</p>}
      </div>
    </div>
  );
}
