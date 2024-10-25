// otp/send/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Redis from 'ioredis';

// Initialize Redis client
const client = new Redis(process.env.REDIS_URL);

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP in Redis with a TTL of 5 minutes
  await client.set(`otp:${email}`, otp);

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

    return NextResponse.json({ message: 'OTP sent' }, { status: 200 });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({ message: 'Error sending OTP' }, { status: 500 });
  }
}
