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
