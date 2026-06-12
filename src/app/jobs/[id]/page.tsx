'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, MapPin, Briefcase, DollarSign, ExternalLink, Clock, Tag, Bookmark } from 'lucide-react'
import { jobService } from '../../../services/jobService'
import { Job } from '../../../types/job'

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    loadJob()
    if (typeof window !== 'undefined') {
      const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]')
      setIsSaved(savedJobs.includes(Number(params.id)))
    }
  }, [params.id])

  const loadJob = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await jobService.getJob(Number(params.id))
      setJob(data)
    } catch (err: any) {
      setError('Failed to load job details')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveJob = async () => {
    if (!job) return
    try {
      // Save job to localStorage for now (can be replaced with API call later)
      const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]')
      if (isSaved) {
        const updated = savedJobs.filter((id: number) => id !== job.id)
        localStorage.setItem('savedJobs', JSON.stringify(updated))
      } else {
        savedJobs.push(job.id)
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs))
      }
      setIsSaved(!isSaved)
    } catch (error) {
      console.error('Error saving job:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-red-600 mb-4">{error || 'Job not found'}</p>
            <button
              onClick={() => router.back()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Jobs
        </button>

        {/* Job Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <p className="text-xl text-gray-600 font-medium">{job.company}</p>
            </div>
            <button
              onClick={handleSaveJob}
              className={`p-2 rounded-lg ${
                isSaved ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
              } hover:bg-gray-200`}
            >
              <Bookmark size={24} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
            {job.location && (
              <div className="flex items-center gap-2">
                <MapPin size={20} />
                <span>{job.location}</span>
              </div>
            )}
            {job.salary && (
              <div className="flex items-center gap-2">
                <DollarSign size={20} />
                <span>{job.salary}</span>
              </div>
            )}
            {job.job_type && (
              <div className="flex items-center gap-2">
                <Briefcase size={20} />
                <span className="capitalize">{job.job_type}</span>
              </div>
            )}
            {job.posted_date && (
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>{job.posted_date}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2 mb-6">
            {job.remote && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Remote
              </span>
            )}
            {job.experience_level && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium capitalize">
                {job.experience_level}
              </span>
            )}
            {job.industry && (
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium capitalize">
                {job.industry}
              </span>
            )}
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
              {job.source}
            </span>
          </div>

          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Apply on {job.source.charAt(0).toUpperCase() + job.source.slice(1)}
            <ExternalLink size={20} />
          </a>
        </div>

        {/* Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Tag size={24} className="text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">Required Skills</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
          <div className="prose max-w-none text-gray-700 whitespace-pre-line">
            {job.description}
          </div>
        </div>

        {/* Source Info */}
        <div className="mt-6 text-sm text-gray-500">
          <p>Source: {job.source.charAt(0).toUpperCase() + job.source.slice(1)}</p>
          <p>Posted: {job.posted_date || 'Recently'}</p>
          {job.sources && job.sources.length > 1 && (
            <p>Also found on: {job.sources.filter(s => s !== job.source).join(', ')}</p>
          )}
        </div>
      </div>
    </div>
  )
}
