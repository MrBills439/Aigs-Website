'use client';

import { useState } from 'react';

type MediaItem = {
  id: string;
  url: string;
  type: 'IMAGE' | 'VIDEO';
  publicId?: string | null;
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

  async function uploadSingle(file: File, mediaType: 'IMAGE' | 'VIDEO') {
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
      throw new Error('Missing Cloudinary cloud name');
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
      throw new Error('Upload failed');
    }

    const mediaResponse = await fetch(`/api/admin/products/${productId}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: mediaType,
        url: uploadData.secure_url,
        publicId: uploadData.public_id,
        alt: uploadData.original_filename,
        sortOrder: media.length + 1
      })
    });

    if (!mediaResponse.ok) {
      throw new Error('Unable to save media');
    }

    return mediaResponse.json() as Promise<MediaItem>;
  }

  async function handleUpload(files: FileList, mediaType: 'IMAGE' | 'VIDEO') {
    setUploading(true);
    try {
      if (mediaType === 'IMAGE') {
        const currentImageCount = media.filter((item) => item.type === 'IMAGE').length;
        const remainingSlots = Math.max(0, 5 - currentImageCount);
        const selectedFiles = Array.from(files).slice(0, remainingSlots);
        if (selectedFiles.length === 0) {
          alert('This wig already has 5 images.');
          return;
        }
        const uploaded: MediaItem[] = [];
        for (const file of selectedFiles) {
          const newMedia = await uploadSingle(file, 'IMAGE');
          uploaded.push(newMedia);
        }
        onChange([...media, ...uploaded]);
        if (files.length > selectedFiles.length) {
          alert('Only 5 images are allowed per wig.');
        }
        return;
      }

      const videoFile = files[0];
      if (!videoFile) return;
      const newMedia = await uploadSingle(videoFile, 'VIDEO');
      onChange([...media, newMedia]);
    } catch (error) {
      console.error(error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
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
      <p className="text-xs text-deep/60">
        Add up to 5 images per wig. Video is optional and can be added when available.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="rounded-2xl border border-rose/30 bg-white p-3 text-xs">
          <p className="mb-2 uppercase tracking-[0.2em] text-deep/60">Upload image</p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(event) => {
              if (event.target.files?.length) handleUpload(event.target.files, 'IMAGE');
            }}
            className="block w-full text-sm"
          />
        </label>
        <label className="rounded-2xl border border-rose/30 bg-white p-3 text-xs">
          <p className="mb-2 uppercase tracking-[0.2em] text-deep/60">Upload video (optional)</p>
          <input
            type="file"
            accept="video/*"
            onChange={(event) => {
              if (event.target.files?.length) handleUpload(event.target.files, 'VIDEO');
            }}
            className="block w-full text-sm"
          />
        </label>
      </div>
      {uploading && <p className="text-xs text-deep/60">Uploading...</p>}
      <div className="space-y-3">
        {media.map((item, index) => (
          <div key={item.id} className="flex items-center justify-between gap-4 rounded-2xl border border-rose/30 bg-white p-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 overflow-hidden rounded-xl border border-rose/30 bg-sand/50">
                {item.type === 'VIDEO' ? (
                  <video src={item.url} className="h-full w-full object-cover" muted playsInline />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url} alt={item.alt || 'Media'} className="h-full w-full object-cover" />
                )}
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-deep/60">{item.type}</p>
                <p className="max-w-[240px] truncate text-deep/70">{item.alt || item.url}</p>
              </div>
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
        {media.length === 0 && <p className="text-xs text-deep/60">No media uploaded yet.</p>}
      </div>
    </div>
  );
}
