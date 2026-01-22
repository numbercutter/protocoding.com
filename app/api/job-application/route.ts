import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { AdminJobNotificationEmail } from './admin-notification';
import { CandidateConfirmationEmail } from './candidate-confirmation';
import { render } from '@react-email/render';
import { rateLimit, getClientIP } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

interface JobApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverLetter: string;
  jobTitle: string;
}

async function sendEmails(data: JobApplicationData, resumeFile: File) {
  // Check field lengths for security
  const maxLengthFields = ['firstName', 'lastName', 'email', 'phone', 'coverLetter', 'jobTitle'] as const;
  for (const field of maxLengthFields) {
    const value = data[field];
    if (value && value.length > 2000) {
      throw new Error(`Field ${field} is too long`);
    }
  }

  const [adminHtml, candidateHtml] = await Promise.all([
    render(
      AdminJobNotificationEmail({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        coverLetter: data.coverLetter,
        jobTitle: data.jobTitle
      })
    ),
    render(
      CandidateConfirmationEmail({
        firstName: data.firstName,
        jobTitle: data.jobTitle
      })
    )
  ]);

  // Convert File to Buffer for attachment
  const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());

  return Promise.all([
    resend.emails.send({
      from: 'Protocoding Careers <careers@protocoding.com>',
      to: ['ryan@protocoding.com', 'jordan@protocoding.com'],
      subject: `New Job Application - ${data.jobTitle}`,
      html: adminHtml,
      attachments: [
        {
          filename: resumeFile.name,
          content: resumeBuffer
        }
      ]
    }),
    resend.emails.send({
      from: 'Protocoding Careers <careers@protocoding.com>',
      to: data.email,
      subject: `Application Received - ${data.jobTitle}`,
      html: candidateHtml
    })
  ]);
}

export async function POST(request: Request) {
  try {
    // Rate limiting: 3 applications per hour per IP (stricter for file uploads)
    const clientIP = getClientIP(request);
    const rateLimitResult = rateLimit(`job-application:${clientIP}`, { limit: 3, windowSeconds: 3600 });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: `Too many applications. Please try again in ${Math.ceil(rateLimitResult.resetIn / 60)} minutes.` },
        { 
          status: 429,
          headers: {
            'Retry-After': rateLimitResult.resetIn.toString(),
          }
        }
      );
    }

    const formData = await request.formData();

    // Extract form fields
    const applicationData: JobApplicationData = {
      firstName: formData.get('firstName')?.toString() || '',
      lastName: formData.get('lastName')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      coverLetter: formData.get('coverLetter')?.toString() || '',
      jobTitle: formData.get('jobTitle')?.toString() || ''
    };

    // Get the resume file
    const resumeFile = formData.get('resume') as File | null;

    // Validate required fields
    if (!applicationData.firstName || !applicationData.lastName || !applicationData.email || !applicationData.jobTitle) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!resumeFile) {
      return NextResponse.json({ error: 'Resume is required' }, { status: 400 });
    }

    // Validate file size (max 10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (resumeFile.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size must be under 10MB' }, { status: 400 });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicationData.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Log the submission
    console.log('New job application received:', {
      ...applicationData,
      resumeFileName: resumeFile.name,
      resumeSize: resumeFile.size,
      submittedAt: new Date().toISOString(),
    });

    // Send emails if Resend is configured
    if (process.env.RESEND_API_KEY) {
      await sendEmails(applicationData, resumeFile);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully. We will review your application and get back to you soon.' 
    });

  } catch (error) {
    console.error('Job application submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process application. Please try again.' },
      { status: 500 }
    );
  }
}
