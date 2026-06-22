'use client'

import { MapPin, Briefcase, DollarSign, ExternalLink, Clock, Tag } from 'lucide-react'
import { Job } from '../../types/job'

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  const postedTime = job.posted_date || 'Recently'

  return (
    <div className="bg-black border-2 border-amber-900/50 rounded-none shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-amber-50 mb-2">{job.title}</h3>
          <p className="text-amber-400/80 font-medium">{job.company}</p>
        </div>
        <div className="flex gap-2">
          {job.remote && (
            <span className="px-3 py-1 bg-green-900/30 border-2 border-green-500 text-green-500 text-green-500 rounded-none text-sm font-medium">
              Remote
            </span>
          )}
          <span className="px-3 py-1 bg-red-900/30 text-red-300 rounded-none text-sm font-medium capitalize">
            {job.source}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-4 text-sm text-amber-400/80">
        {job.location && (
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <span>{job.location}</span>
          </div>
        )}
        {job.salary && (
          <div className="flex items-center gap-1">
            <DollarSign size={16} />
            <span>{job.salary}</span>
          </div>
        )}
        {job.job_type && (
          <div className="flex items-center gap-1">
            <Briefcase size={16} />
            <span className="capitalize">{job.job_type}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>{postedTime}</span>
        </div>
      </div>

      {job.skills && job.skills.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Tag size={16} className="text-amber-400/80" />
            <span className="text-sm font-medium text-amber-200">Skills</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.skills.slice(0, 5).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-black border-2 border-amber-800/50 text-amber-50 text-amber-200 rounded text-sm"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 5 && (
              <span className="px-2 py-1 bg-black border-2 border-amber-800/50 text-amber-50 text-amber-200 rounded text-sm">
                +{job.skills.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-amber-900/50">
        <p className="text-sm text-amber-400/80 line-clamp-2">
          {job.description.substring(0, 150)}...
        </p>
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-red-500 hover:text-blue-700 font-medium text-sm"
        >
          View Job
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  )
}
