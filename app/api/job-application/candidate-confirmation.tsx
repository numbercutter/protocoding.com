import { Body, Button, Container, Head, Heading, Html, Link, Preview, Section, Text, Tailwind, Row, Column } from '@react-email/components';
import * as React from 'react';

interface CandidateConfirmationEmailProps {
  firstName: string;
  jobTitle: string;
}

export const CandidateConfirmationEmail = ({ firstName, jobTitle }: CandidateConfirmationEmailProps) => {
  const previewText = `Application received for ${jobTitle} - Thank you for applying to join our team! 🎯`;

  const systemFonts = {
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
  };

  const gradientBorder = {
    background: 'linear-gradient(to right, #6366f1, #8b5cf6, #d946ef)',
    padding: '1px'
  };

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body style={systemFonts} className='bg-black'>
          <div style={{ display: 'none', lineHeight: '1px', maxHeight: '0px', maxWidth: '0px', opacity: 0, overflow: 'hidden' }}>‌</div>

          <Container className='mx-auto py-5'>
            <Section className='bg-[#09090B] border border-[#1d1d1d] rounded-3xl overflow-hidden max-w-[640px] mx-auto'>
              <Section className='px-8 pt-8 pb-6'>
                <Heading className='text-3xl font-semibold text-white m-0 mb-3'>Application Received</Heading>
                <Text className='text-[#8F9098] text-base leading-6 m-0'>Thank you for your interest in joining our team.</Text>
              </Section>

              <Section className='px-8 py-6'>
                <Text className='text-white text-base leading-6 mb-6'>Hi {firstName},</Text>
                <Text className='text-[#8F9098] text-base leading-6 mb-8'>
                  Thank you for applying to the <span className='text-white font-medium'>{jobTitle}</span> position at Protocoding. We've successfully received your application and resume, and we're excited to learn more about you.
                </Text>

                <div style={gradientBorder} className='rounded-2xl mb-8'>
                  <Section className='bg-[#101014] p-6 rounded-[15px]'>
                    <Text className='text-white font-semibold text-sm uppercase tracking-wider mb-4'>Application Summary</Text>
                    <Row>
                      <Column>
                        <Text className='text-[#8F9098] text-sm mb-2'>Position Applied For</Text>
                        <Text className='text-white text-base font-medium'>{jobTitle}</Text>
                      </Column>
                      <Column>
                        <Text className='text-[#8F9098] text-sm mb-2'>Application Date</Text>
                        <Text className='text-white text-base font-medium'>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
                      </Column>
                      <Column>
                        <Text className='text-[#8F9098] text-sm mb-2'>Status</Text>
                        <Text className='text-green-400 text-base font-medium'>Under Review</Text>
                      </Column>
                    </Row>
                  </Section>
                </div>

                <div style={gradientBorder} className='rounded-2xl mb-8'>
                  <Section className='bg-[#101014] p-6 rounded-[15px]'>
                    <Text className='text-white font-semibold text-sm uppercase tracking-wider mb-4'>What Happens Next</Text>
                    <Row className='mb-4'>
                      <Column className='w-10 pr-4'>
                        <Text className='text-[#8F9098] text-xl font-medium m-0'>01</Text>
                      </Column>
                      <Column>
                        <Text className='text-white text-base m-0 mb-1'>Application Review</Text>
                        <Text className='text-[#8F9098] text-sm m-0'>Our team carefully reviews your application and resume</Text>
                      </Column>
                    </Row>
                    <Row className='mb-4'>
                      <Column className='w-10 pr-4'>
                        <Text className='text-[#8F9098] text-xl font-medium m-0'>02</Text>
                      </Column>
                      <Column>
                        <Text className='text-white text-base m-0 mb-1'>Initial Screening</Text>
                        <Text className='text-[#8F9098] text-sm m-0'>If you're a good fit, we'll reach out to schedule an interview</Text>
                      </Column>
                    </Row>
                    <Row>
                      <Column className='w-10 pr-4'>
                        <Text className='text-[#8F9098] text-xl font-medium m-0'>03</Text>
                      </Column>
                      <Column>
                        <Text className='text-white text-base m-0 mb-1'>Interview Process</Text>
                        <Text className='text-[#8F9098] text-sm m-0'>Technical and cultural fit assessment with our team</Text>
                      </Column>
                    </Row>
                  </Section>
                </div>

                <Section className='mb-8'>
                  <Text className='text-[#8F9098] text-base leading-6 mb-4'>
                    While you wait, feel free to learn more about our culture, values, and the amazing projects we work on.
                  </Text>
                </Section>

                <Section className='text-center mb-8'>
                  <Button href='https://protocoding.com/about' className='bg-white text-black px-6 py-4 rounded-xl font-medium text-base no-underline inline-block hover:bg-gray-50 mr-4'>
                    About Us →
                  </Button>
                  <Button href='https://protocoding.com/portfolio' className='bg-transparent border border-white text-white px-6 py-4 rounded-xl font-medium text-base no-underline inline-block hover:bg-white hover:text-black'>
                    View Our Work →
                  </Button>
                </Section>

                <Text className='text-[#8F9098] text-sm text-center italic mb-8'>We aim to respond to all applications within 1-2 weeks. Thank you for your patience!</Text>
              </Section>

              <Section className='px-8 py-6 border-t border-[#1d1d1d] text-center'>
                <Text className='text-[#8F9098] text-sm mb-4 text-center'>
                  Questions about your application? Email us at{' '}
                  <Link href='mailto:careers@protocoding.com' className='text-blue-400 no-underline'>
                    careers@protocoding.com
                  </Link>
                </Text>

                <Text className='text-[#8F9098] text-xs text-center mt-4'>© {new Date().getFullYear()} Protocoding. All rights reserved.</Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
