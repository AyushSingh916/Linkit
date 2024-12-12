import { NextResponse } from 'next/server';
import { parse, serialize } from 'cookie';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { otp: providedOtp } = body;

    if (!providedOtp) {
      return NextResponse.json(
        { message: 'OTP is required' }, 
        { status: 400 }
      );
    }

    // Extract cookies from the request
    const cookies = req.headers.get('cookie') || '';
    const parsedCookies = parse(cookies);

    // Retrieve the stored OTP from the cookie
    const storedOtp = parsedCookies.otp;

    if (!storedOtp) {
      return NextResponse.json(
        { message: 'OTP has expired or does not exist' }, 
        { status: 400 }
      );
    }

    // Compare stored OTP with the provided OTP
    if (storedOtp.trim() === providedOtp.trim()) {
      // Clear the OTP cookie after successful validation
      const response = NextResponse.json({ message: 'OTP is valid' }, { status: 200 });
      response.headers.set('Set-Cookie', serialize('otp', '', { maxAge: -1, path: '/' }));
      return response;
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
