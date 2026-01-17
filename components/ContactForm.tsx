'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface FormState { name: string; email: string; company: string; message: string; }

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name) e.name = 'Required';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.message || form.message.length < 10) e.message = 'At least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      setIsSuccess(true);
    } catch { setErrors({ message: 'Failed to submit' }); }
    finally { setIsSubmitting(false); }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  if (isSuccess) {
    return (
      <div className="text-center py-16 material-elevated">
        <div className="w-14 h-14 mx-auto mb-5 bg-accent flex items-center justify-center">
          <CheckCircle size={24} className="text-[var(--text-primary)]" />
        </div>
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">Thank you</h2>
        <p className="text-sm text-[var(--text-muted)] mb-6">We&apos;ll be in touch within 24 hours.</p>
        <Link href="/" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] font-bold">← Return home</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-0">
      <div className="grid grid-cols-2">
        <input 
          type="text" 
          name="name" 
          placeholder="Name *" 
          value={form.name} 
          onChange={handleChange} 
          className="w-full px-5 py-4 material text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:bg-white cell"
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email *" 
          value={form.email} 
          onChange={handleChange} 
          className="w-full px-5 py-4 material text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:bg-white cell"
        />
      </div>
      <input 
        type="text" 
        name="company" 
        placeholder="Company" 
        value={form.company} 
        onChange={handleChange} 
        className="w-full px-5 py-4 material text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:bg-white cell"
      />
      <textarea 
        name="message" 
        placeholder="Tell us about your project... *" 
        value={form.message} 
        onChange={handleChange} 
        rows={5} 
        className="w-full px-5 py-4 material-inset text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none resize-none cell"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full flex items-center justify-center gap-2 py-4 bg-accent text-[var(--text-primary)] text-sm font-bold tracking-wide ${isSubmitting ? 'opacity-70' : 'hover:brightness-110'}`}
      >
        {isSubmitting ? <><Loader2 size={14} className="animate-spin" /> Sending...</> : <>Send message <Send size={12} /></>}
      </button>
      {(errors.name || errors.email || errors.message) && (
        <p className="text-xs text-red-500 p-3 material font-bold">{errors.name || errors.email || errors.message}</p>
      )}
    </form>
  );
}
