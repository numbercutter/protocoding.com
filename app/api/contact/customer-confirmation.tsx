import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text, Tailwind, Row, Column } from '@react-email/components';
import * as React from 'react';

interface CustomerConfirmationEmailProps {
  name: string;
  timeline: string;
  budget: string;
}

export const CustomerConfirmationEmail = ({ name, timeline, budget }: CustomerConfirmationEmailProps) => {
  const previewText = `Got it! We're reviewing your project request and will be in touch within 48hrs 🚀`;

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
                <Heading className='text-3xl font-semibold text-white m-0 mb-3'>Thanks for reaching out!</Heading>
                <Text className='text-[#8F9098] text-base leading-6 m-0'>We're excited to learn about your project.</Text>
              </Section>

              <Section className='px-8 py-6'>
                <Text className='text-white text-base leading-6 mb-6'>Hi {name},</Text>
                <Text className='text-[#8F9098] text-base leading-6 mb-8'>
                  Thank you for reaching out to Protocoding. We've received your project inquiry and our team is reviewing your requirements.
                </Text>

                <div style={gradientBorder} className='rounded-2xl mb-8'>
                  <Section className='bg-[#101014] p-6 rounded-[15px]'>
                    <Text className='text-white font-semibold text-sm uppercase tracking-wider mb-4'>Project Overview</Text>
                    <Row>
                      <Column>
                        <Text className='text-[#8F9098] text-sm mb-2'>Timeline</Text>
                        <Text className='text-white text-base font-medium'>{timeline}</Text>
                      </Column>
                      <Column>
                        <Text className='text-[#8F9098] text-sm mb-2'>Budget</Text>
                        <Text className='text-white text-base font-medium'>{budget}</Text>
                      </Column>
                    </Row>
                  </Section>
                </div>

                <div style={gradientBorder} className='rounded-2xl mb-8'>
                  <Section className='bg-[#101014] p-6 rounded-[15px]'>
                    <Text className='text-white font-semibold text-sm uppercase tracking-wider mb-4'>What's Next</Text>
                    <Row className='mb-4'>
                      <Column className='w-10 pr-4'>
                        <Text className='text-[#8F9098] text-xl font-medium m-0'>01</Text>
                      </Column>
                      <Column>
                        <Text className='text-white text-base m-0 mb-1'>Project Review</Text>
                        <Text className='text-[#8F9098] text-sm m-0'>Our team will analyze your requirements</Text>
                      </Column>
                    </Row>
                    <Row className='mb-4'>
                      <Column className='w-10 pr-4'>
                        <Text className='text-[#8F9098] text-xl font-medium m-0'>02</Text>
                      </Column>
                      <Column>
                        <Text className='text-white text-base m-0 mb-1'>Strategy Call</Text>
                        <Text className='text-[#8F9098] text-sm m-0'>Deep dive into your project vision</Text>
                      </Column>
                    </Row>
                    <Row>
                      <Column className='w-10 pr-4'>
                        <Text className='text-[#8F9098] text-xl font-medium m-0'>03</Text>
                      </Column>
                      <Column>
                        <Text className='text-white text-base m-0 mb-1'>Custom Proposal</Text>
                        <Text className='text-[#8F9098] text-sm m-0'>Detailed plan tailored to your needs</Text>
                      </Column>
                    </Row>
                  </Section>
                </div>

                <Text className='text-[#8F9098] text-sm text-center italic mb-8'>We aim to respond to all inquiries within 48 hours.</Text>
              </Section>

              <Section className='px-8 py-6 border-t border-[#1d1d1d] text-center'>
                <Text className='text-[#8F9098] text-sm mb-4 text-center'>Have questions? Simply reply to this email.</Text>
                <Text className='text-[#8F9098] text-xs text-center mt-4'>© {new Date().getFullYear()} Protocoding. All rights reserved.</Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
