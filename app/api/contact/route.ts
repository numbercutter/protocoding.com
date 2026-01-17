import { NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectScope: string;
  timeline: string;
  budget: string;
}

export async function POST(request: Request) {
  try {
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

    if (!data.projectScope || data.projectScope.length < 10) {
      return NextResponse.json(
        { error: 'Project scope must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Send an email notification using Resend
    // 2. Store the submission in a database
    // 3. Send a confirmation email to the user
    
    // For now, we'll just log the submission
    console.log('New contact form submission:', {
      name: data.name,
      email: data.email,
      phone: data.phone || 'Not provided',
      company: data.company || 'Not provided',
      projectScope: data.projectScope,
      timeline: data.timeline,
      budget: data.budget,
      submittedAt: new Date().toISOString(),
    });

    // If Resend is configured, send emails
    if (process.env.RESEND_API_KEY) {
      // You can add Resend email logic here
      // import { Resend } from 'resend';
      // const resend = new Resend(process.env.RESEND_API_KEY);
      // await resend.emails.send({...});
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
