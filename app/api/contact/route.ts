import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { AdminNotificationEmail } from './admin-notification';
import { CustomerConfirmationEmail } from './customer-confirmation';
import { render } from '@react-email/render';
import { rateLimit, getClientIP } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

async function sendEmails(data: ContactFormData) {
  // Check field lengths for security
  const maxLengthFields = ['name', 'email', 'company', 'message'] as const;
  for (const field of maxLengthFields) {
    const value = data[field];
    if (value && value.length > 5000) {
      throw new Error(`Field ${field} is too long`);
    }
  }

  const [adminHtml, customerHtml] = await Promise.all([
    render(
      AdminNotificationEmail({
        name: data.name,
        email: data.email,
        phone: '',
        company: data.company || '',
        projectScope: data.message,
        timeline: '',
        budget: ''
      })
    ),
    render(
      CustomerConfirmationEmail({
        name: data.name,
        timeline: '',
        budget: ''
      })
    )
  ]);

  return Promise.all([
    resend.emails.send({
      from: 'Protocoding <contact@protocoding.com>',
      to: ['ryan@protocoding.com', 'jordan@protocoding.com'],
      subject: `New Project Inquiry from ${data.name}`,
      html: adminHtml
    }),
    resend.emails.send({
      from: 'Protocoding <contact@protocoding.com>',
      to: data.email,
      subject: 'Thank you for reaching out!',
      html: customerHtml
    })
  ]);
}

export async function POST(request: Request) {
  try {
    // Rate limiting: 5 requests per minute per IP
    const clientIP = getClientIP(request);
    const rateLimitResult = rateLimit(`contact:${clientIP}`, { limit: 5, windowSeconds: 60 });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: `Too many requests. Please try again in ${rateLimitResult.resetIn} seconds.` },
        { 
          status: 429,
          headers: {
            'Retry-After': rateLimitResult.resetIn.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetIn.toString(),
          }
        }
      );
    }

    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || data.name.length < 2) {
      return NextResponse.json(
        { error: 'Name is required and must be at least 2 characters' },
        { status: 400 }
      );
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json(
        { error: 'A valid email address is required' },
        { status: 400 }
      );
    }

    if (!data.message || data.message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Log the submission
    console.log('New contact form submission:', {
      name: data.name,
      email: data.email,
      company: data.company || 'Not provided',
      message: data.message,
      submittedAt: new Date().toISOString(),
    });

    // Send emails if Resend is configured
    if (process.env.RESEND_API_KEY) {
      await sendEmails(data);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your inquiry. We will get back to you within 48 hours.' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process submission. Please try again.' },
      { status: 500 }
    );
  }
}
