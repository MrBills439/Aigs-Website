import crypto from 'crypto';

export function createCloudinarySignature(paramsToSign: Record<string, string>) {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!apiSecret) {
    throw new Error('CLOUDINARY_API_SECRET is not configured');
  }
  const sorted = Object.keys(paramsToSign)
    .sort()
    .map((key) => `${key}=${paramsToSign[key]}`)
    .join('&');

  return crypto.createHash('sha1').update(sorted + apiSecret).digest('hex');
}

export async function deleteCloudinaryAsset(params: {
  publicId: string;
  resourceType: 'image' | 'video';
}) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  if (!cloudName || !apiKey) {
    throw new Error('CLOUDINARY_API_KEY or NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not configured');
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = createCloudinarySignature({
    public_id: params.publicId,
    timestamp
  });

  const body = new URLSearchParams();
  body.set('public_id', params.publicId);
  body.set('timestamp', timestamp);
  body.set('api_key', apiKey);
  body.set('signature', signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${params.resourceType}/destroy`,
    { method: 'POST', body }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Cloudinary delete failed: ${text}`);
  }
}
