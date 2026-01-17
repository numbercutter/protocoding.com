import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact - Protocoding',
  description: 'Get in touch with our team.',
};

export default function ContactPage() {
  return (
    <div className="section-row min-h-screen">
      {/* Left gutter */}
      <div className="gutter-left" />
      
      {/* Content */}
      <div className="material flex items-center justify-center p-6 pt-20 md:p-8 md:pt-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">Contact</p>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight mb-2">Get a free assessment</h1>
            <p className="text-sm text-gray-500">Tell us about your project.</p>
          </div>
          <ContactForm />
        </div>
      </div>
      
      {/* Right gutter */}
      <div className="gutter-right" />
    </div>
  );
}
