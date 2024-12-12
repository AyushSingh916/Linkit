import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { serialize } from 'cookie';

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Set up Nodemailer transport using environment variables
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Send OTP email
  try {
    await transporter.sendMail({
      from: `"LinkIt" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    });

    // Set OTP as a secure, HTTP-only cookie with a 5-minute expiration
    const cookie = serialize('otp', otp, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 5 * 60, // 5 minutes
      path: '/',
    });

    const response = NextResponse.json({ message: 'OTP sent' });
    response.headers.set('Set-Cookie', cookie);

    return response;
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({ message: 'Error sending OTP' }, { status: 500 });
  }
}
