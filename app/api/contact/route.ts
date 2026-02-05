import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validators';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.parse(body);

    if (!process.env.RESEND_API_KEY || !process.env.OWNER_EMAIL) {
      return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'ADIS WiGS AND Beauty <contact@adiswigsandbeauty.com>',
      to: process.env.OWNER_EMAIL,
      subject: `New contact message from ${parsed.name}`,
      html: `<p><strong>Name:</strong> ${parsed.name}</p><p><strong>Email:</strong> ${parsed.email}</p><p>${parsed.message}</p>`
    });

    return NextResponse.json({ status: 'sent' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to send message.' }, { status: 400 });
  }
}
