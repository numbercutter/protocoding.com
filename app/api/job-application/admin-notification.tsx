import { Body, Button, Container, Head, Html, Link, Preview, Section, Text, Tailwind } from '@react-email/components';
import * as React from 'react';

interface AdminJobNotificationEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverLetter: string;
  jobTitle: string;
}

export const AdminJobNotificationEmail = ({ 
  firstName, 
  lastName, 
  email, 
  phone, 
  coverLetter, 
  jobTitle
}: AdminJobNotificationEmailProps) => {
  const previewText = `New Job Application: ${firstName} ${lastName} applied for ${jobTitle} 🎯`;
  const submissionDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className='bg-black'>
          <Container className='mx-auto py-8'>
            <Section className='bg-[#09090B] rounded-xl max-w-[640px] mx-auto'>
              <Section className='px-8 pt-4 pb-6'>
                <Text className='text-2xl font-semibold text-white mb-2'>New Job Application</Text>
                <div className='flex justify-between items-center'>
                  <Text className='text-[#8F9098] text-sm'>
                    Position: <span className='text-white'>{jobTitle}</span>
                  </Text>
                  <Text className='text-[#8F9098] text-sm'>{submissionDate}</Text>
                </div>
              </Section>

              <Section className='px-8 pb-6'>
                <div className='flex gap-3'>
                  <Button 
                    href={`mailto:${email}`} 
                    className='bg-white mr-2 text-black px-6 py-3 rounded-xl font-medium text-sm no-underline'
                  >
                    Reply to Candidate →
                  </Button>
                </div>
              </Section>

              <Section className='px-8 py-6'>
                <Text className='text-white font-semibold text-xs uppercase tracking-wider mb-6'>Candidate Information</Text>
                <div className='space-y-4'>
                  <div className='flex'>
                    <Text className='text-[#8F9098] text-sm w-24'>Name</Text>
                    <Text className='text-white text-sm'>{firstName} {lastName}</Text>
                  </div>
                  <div className='flex'>
                    <Text className='text-[#8F9098] text-sm w-24'>Email</Text>
                    <Link href={`mailto:${email}`} className='text-blue-400 text-sm no-underline'>
                      {email}
                    </Link>
                  </div>
                  <div className='flex'>
                    <Text className='text-[#8F9098] text-sm w-24'>Phone</Text>
                    <Text className='text-white text-sm'>{phone || 'Not provided'}</Text>
                  </div>
                  <div className='flex'>
                    <Text className='text-[#8F9098] text-sm w-24'>Position</Text>
                    <Text className='text-white text-sm'>{jobTitle}</Text>
                  </div>
                </div>
              </Section>

              {coverLetter && (
                <Section className='px-8 py-6'>
                  <Text className='text-white font-semibold text-xs uppercase tracking-wider mb-4'>Cover Letter</Text>
                  <Text className='text-white text-sm leading-relaxed whitespace-pre-wrap'>{coverLetter}</Text>
                </Section>
              )}

              <Section className='px-8 py-6 bg-[#101014] rounded-[15px] mx-8 mb-6'>
                <Text className='text-white font-semibold text-xs uppercase tracking-wider mb-4'>Resume</Text>
                <Text className='text-[#8F9098] text-sm'>
                  Resume attached to this email
                </Text>
              </Section>

              <Section className='px-8 py-4 border-t border-[#1d1d1d]'>
                <Text className='text-[#8F9098] text-xs'>Application received on {submissionDate}</Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
