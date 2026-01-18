import { Body, Button, Container, Head, Html, Link, Preview, Section, Text, Tailwind } from '@react-email/components';
import * as React from 'react';

interface AdminNotificationEmailProps {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectScope: string;
  timeline: string;
  budget: string;
}

export const AdminNotificationEmail = ({ 
  name, 
  email, 
  phone, 
  company, 
  projectScope, 
  timeline, 
  budget 
}: AdminNotificationEmailProps) => {
  const previewText = `New Project Inquiry from ${name} - ${budget} Budget 💼`;
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
                <Text className='text-2xl font-semibold text-white mb-2'>New Project Inquiry</Text>
                <div className='flex justify-between items-center'>
                  <Text className='text-[#8F9098] text-sm'>
                    Budget: <span className='text-white'>{budget}</span>
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
                    Reply Now →
                  </Button>
                </div>
              </Section>

              <Section className='px-8 py-6'>
                <Text className='text-white font-semibold text-xs uppercase tracking-wider mb-6'>Contact Information</Text>
                <div className='space-y-4'>
                  <div className='flex'>
                    <Text className='text-[#8F9098] text-sm w-24'>Name</Text>
                    <Text className='text-white text-sm'>{name}</Text>
                  </div>
                  <div className='flex'>
                    <Text className='text-[#8F9098] text-sm mt-4 w-24'>Email</Text>
                    <Link href={`mailto:${email}`} className='text-blue-400 text-sm no-underline'>
                      {email}
                    </Link>
                  </div>
                  <div className='flex'>
                    <Text className='text-[#8F9098] text-sm w-24'>Phone</Text>
                    <Text className='text-white text-sm'>{phone || 'Not provided'}</Text>
                  </div>
                  <div className='flex'>
                    <Text className='text-[#8F9098] text-sm w-24'>Company</Text>
                    <Text className='text-white text-sm'>{company || 'Not provided'}</Text>
                  </div>
                  <div className='flex'>
                    <Text className='text-[#8F9098] text-sm w-24'>Timeline</Text>
                    <Text className='text-white text-sm'>{timeline}</Text>
                  </div>
                  <div className='flex'>
                    <Text className='text-[#8F9098] text-sm w-24'>Budget</Text>
                    <Text className='text-white text-sm'>{budget}</Text>
                  </div>
                </div>
              </Section>

              <Section className='px-8 py-6'>
                <Text className='text-white font-semibold text-xs uppercase tracking-wider mb-4'>Project Scope</Text>
                <Text className='text-white text-sm leading-relaxed whitespace-pre-wrap'>{projectScope}</Text>
              </Section>

              <Section className='px-8 py-4 border-t border-[#1d1d1d]'>
                <Text className='text-[#8F9098] text-xs'>Submission received on {submissionDate}</Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
