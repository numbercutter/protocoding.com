'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import JobApplicationModal from '@/components/JobApplicationModal';

interface Job {
  title: string;
  location: string;
  type: string;
  compensation: string;
  postedAgo: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferred: string[];
}

interface JobsListProps {
  jobs: Job[];
}

export default function JobsList({ jobs }: JobsListProps) {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  return (
    <>
      {/* Jobs list - expanded format */}
      {jobs.map((job) => (
        <div key={job.title} className="section-row">
          <div className="gutter-left" />
          <div className="material">
            {/* Job header */}
            <div className="p-6 lg:p-8 border-b border-black/[0.08]">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] bg-gray-100 text-gray-600">
                  {job.type}
                </span>
                <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] bg-accent/20 text-accent">
                  Remote
                </span>
                <span className="text-[10px] text-gray-400">Posted {job.postedAgo}</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">{job.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">{job.description}</p>
              <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold mt-4">
                <span>{job.location}</span>
                <span>·</span>
                <span>{job.compensation}</span>
              </div>
            </div>

            {/* Job details grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* Responsibilities */}
              <div className="p-6 lg:p-8 cell">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Responsibilities</h4>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, i) => (
                    <li key={i} className="flex gap-3 text-xs text-gray-600 leading-relaxed">
                      <span className="w-1 h-1 bg-accent mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="p-6 lg:p-8 cell">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Requirements</h4>
                <ul className="space-y-3">
                  {job.requirements.map((item, i) => (
                    <li key={i} className="flex gap-3 text-xs text-gray-600 leading-relaxed">
                      <span className="w-1 h-1 bg-accent mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preferred */}
              <div className="p-6 lg:p-8 cell">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Nice to Have</h4>
                <ul className="space-y-3">
                  {job.preferred.map((item, i) => (
                    <li key={i} className="flex gap-3 text-xs text-gray-500 leading-relaxed">
                      <span className="w-1 h-1 bg-gray-300 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Apply CTA */}
            <div className="p-6 lg:p-8 material-inset flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-gray-500">
                <span className="font-bold text-gray-700">Note:</span> Visa sponsorship is not available at this time.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedJob(job.title)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-black/80 text-xs font-bold tracking-wide uppercase hover:brightness-110 transition-all"
                >
                  Apply Now <ArrowUpRight size={12} />
                </button>
                <span className="text-xs text-gray-400">or email us at <a href="mailto:contact@protocoding.com" className="text-accent hover:underline">contact@protocoding.com</a></span>
              </div>
            </div>
          </div>
          <div className="gutter-right" />
        </div>
      ))}

      {/* Application Modal */}
      <JobApplicationModal
        isOpen={selectedJob !== null}
        onClose={() => setSelectedJob(null)}
        jobTitle={selectedJob || ''}
      />
    </>
  );
}
