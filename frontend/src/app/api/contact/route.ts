import { NextResponse } from 'next/server';

// In-memory rate limiting map
// Format: { [ip: string]: { count: number; resetTime: number } }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_MAX = 5; // Max requests
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 Hour

export async function POST(req: Request) {
  try {
    // Determine client IP
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown-ip';

    const now = Date.now();
    const rateData = rateLimitMap.get(ip);

    // Rate Limiting Logic
    if (rateData) {
      if (now < rateData.resetTime) {
        if (rateData.count >= RATE_LIMIT_MAX) {
          return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429 }
          );
        }
        rateData.count += 1;
        rateLimitMap.set(ip, rateData);
      } else {
        // Reset window
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
      }
    } else {
      // First request from this IP
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    }

    // Optional: Parse the JSON body to ensure it's a valid contact request
    const body = await req.json();
    if (!body.email || !body.message) {
      return NextResponse.json(
        { error: 'Email and message are required.' },
        { status: 400 }
      );
    }

    // TODO: Send exact email using Resend, Nodemailer, etc.
    // For now, we simulate success securely on the backend.
    
    return NextResponse.json(
      { success: true, message: 'Message securely processed.' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
