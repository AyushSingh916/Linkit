// Backend: app/api/otp/validate/route.ts
import { NextResponse } from 'next/server';
import Redis from 'ioredis';

const client = new Redis(process.env.REDIS_URL);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { message: 'Email and OTP are required' }, 
        { status: 400 }
      );
    }

    const storedOtp = await client.get(`otp:${email}`);

    // Ensure both values are strings and trim any whitespace
    const normalizedStoredOtp = storedOtp?.trim();
    const normalizedProvidedOtp = otp.trim();

    if (!storedOtp) {
      return NextResponse.json(
        { message: 'OTP has expired or does not exist' }, 
        { status: 400 }
      );
    }

    if (normalizedStoredOtp === normalizedProvidedOtp) {
      await client.del(`otp:${email}`); // Remove OTP after successful validation
      return NextResponse.json(
        { message: 'OTP is valid' }, 
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Invalid OTP' }, 
      { status: 400 }
    );
  } catch (error) {
    console.error('OTP validation error:', error);
    return NextResponse.json(
      { message: 'Internal server error during OTP validation' }, 
      { status: 500 }
    );
  }
}