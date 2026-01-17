import { NextResponse } from 'next/server';

interface JobApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverLetter: string;
  jobTitle: string;
}

export async function POST(request: Request) {
  try {
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

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicationData.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Log the submission (in production, you'd send this to your email service or database)
    console.log('New job application received:', {
      ...applicationData,
      resumeFileName: resumeFile.name,
      resumeSize: resumeFile.size,
      submittedAt: new Date().toISOString(),
    });

    // If Resend is configured, send notification emails
    if (process.env.RESEND_API_KEY) {
      // You can add Resend email logic here to:
      // 1. Send notification to hiring team
      // 2. Send confirmation to candidate
      // Example:
      // const resend = new Resend(process.env.RESEND_API_KEY);
      // await resend.emails.send({
      //   from: 'Protocoding Careers <careers@protocoding.com>',
      //   to: ['hiring@protocoding.com'],
      //   subject: `New Job Application - ${applicationData.jobTitle}`,
      //   html: `<p>New application from ${applicationData.firstName} ${applicationData.lastName}</p>`
      // });
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
