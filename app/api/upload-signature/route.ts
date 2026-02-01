import { NextResponse } from 'next/server';
import { createCloudinarySignature } from '@/lib/cloudinary';

export async function POST(request: Request) {
  try {
    const { folder } = await request.json();
    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign: Record<string, string> = {
      timestamp: timestamp.toString(),
      folder: folder || 'adis-wigs'
    };

    const signature = createCloudinarySignature(paramsToSign);

    return NextResponse.json({
      signature,
      timestamp,
      folder: paramsToSign.folder,
      apiKey: process.env.CLOUDINARY_API_KEY
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to sign upload.' }, { status: 500 });
  }
}
