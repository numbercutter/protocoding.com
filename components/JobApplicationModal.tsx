'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, CheckCircle, Loader2 } from 'lucide-react';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverLetter: string;
}

export default function JobApplicationModal({ isOpen, onClose, jobTitle }: JobApplicationModalProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: ''
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('document') || file.type === 'image/png')) {
      setResumeFile(file);
    } else {
      alert('Please upload a PDF, Word document, or PNG file');
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('document') || file.type === 'image/png')) {
      setResumeFile(file);
    } else {
      alert('Please upload a PDF, Word document, or PNG file');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !resumeFile) {
      setSubmitError('Please fill in all required fields and upload your resume');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const submitFormData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitFormData.append(key, value);
      });
      submitFormData.append('jobTitle', jobTitle);
      submitFormData.append('resume', resumeFile);

      const response = await fetch('/api/job-application', {
        method: 'POST',
        body: submitFormData
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          coverLetter: ''
        });
        setResumeFile(null);
        setSubmitSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitError('Failed to submit application. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto p-4"
      >
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl mx-auto my-8"
        >
          <div className="relative bg-[var(--dark-bg)] border border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1">Apply Now</p>
                <h2 className="text-xl font-bold text-white">{jobTitle}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {submitSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Application Submitted!</h3>
                  <p className="text-white/50">Thank you for your interest. We&apos;ll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-white/50 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white text-sm
                                 focus:border-accent focus:outline-none transition-colors
                                 placeholder:text-white/30"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-white/50 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white text-sm
                                 focus:border-accent focus:outline-none transition-colors
                                 placeholder:text-white/30"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-white/50 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white text-sm
                               focus:border-accent focus:outline-none transition-colors
                               placeholder:text-white/30"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-white/50 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white text-sm
                               focus:border-accent focus:outline-none transition-colors
                               placeholder:text-white/30"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-white/50 mb-2">
                      Resume *
                    </label>
                    <div
                      className={`border-2 border-dashed ${isDragOver ? 'border-accent bg-accent/5' : 'border-white/10'} 
                                p-6 text-center hover:border-white/20 transition-all cursor-pointer`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById('resume-upload')?.click()}
                    >
                      <input
                        type="file"
                        id="resume-upload"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.png"
                        onChange={handleFileChange}
                      />
                      {resumeFile ? (
                        <div className="flex items-center justify-center gap-3">
                          <CheckCircle size={20} className="text-accent" />
                          <span className="text-white text-sm">{resumeFile.name}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setResumeFile(null);
                            }}
                            className="text-white/40 hover:text-white"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload size={24} className="mx-auto text-white/30 mb-2" />
                          <p className="text-sm text-white/50">
                            Drag & drop or <span className="text-accent">browse</span>
                          </p>
                          <p className="text-xs text-white/30 mt-1">PDF, DOC, DOCX, or PNG</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-white/50 mb-2">
                      Cover Letter
                    </label>
                    <textarea
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white text-sm
                               focus:border-accent focus:outline-none transition-colors
                               placeholder:text-white/30 resize-none"
                      placeholder="Tell us why you're a great fit for this role..."
                    />
                  </div>

                  {/* Error message */}
                  {submitError && (
                    <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-3">
                      {submitError}
                    </div>
                  )}

                  {/* Alternative contact */}
                  <p className="text-xs text-white/40 text-center">
                    or email us directly at <a href="mailto:contact@protocoding.com" className="text-accent hover:underline">contact@protocoding.com</a>
                  </p>

                  {/* Submit button */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-3 border border-white/10 text-white/60 text-sm font-bold tracking-wide
                               hover:bg-white/5 hover:text-white transition-all"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.email || !resumeFile}
                      className="flex-1 py-3 bg-accent text-black/80 text-sm font-bold tracking-wide
                               hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed
                               flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
