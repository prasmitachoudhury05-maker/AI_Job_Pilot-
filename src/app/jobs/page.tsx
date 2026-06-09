'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Search, MapPin, Briefcase, DollarSign, Filter, RefreshCw } from 'lucide-react'
import { jobService } from '../../services/jobService'
import { Job, JobSearchParams } from '../../types/job'
import JobCard from '../../components/jobs/JobCard'
import JobFilters from '../../components/jobs/JobFilters'

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useState<JobSearchParams>({
    query: '',
    location: '',
    skills: '',
    remote_only: false,
    skip: 0,
    limit: 20,
  })
  const [isDiscovering, setIsDiscovering] = useState(false)
  const observer = useRef<IntersectionObserver | null>(null)
  const loadingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadJobs()
  }, [searchParams])

  const loadJobs = async (append: boolean = false) => {
    if (!append) {
      setLoading(true)
    }
    setError(null)
    try {
      const data = await jobService.listJobs(searchParams)
      if (append) {
        setJobs(prev => [...prev, ...data])
      } else {
        setJobs(data)
      }
      setHasMore(data.length === searchParams.limit)
    } catch (err: any) {
      setError('Failed to load jobs')
    } finally {
      setLoading(false)
    }
  }

  const handleDiscover = async () => {
    if (!searchParams.query) {
      setError('Please enter a search query')
      return
    }

    setIsDiscovering(true)
    setError(null)
    try {
      await jobService.discoverJobs({
        query: searchParams.query,
        location: searchParams.location,
        limit: 50,
      })
      setSearchParams({ ...searchParams, skip: 0 })
      await loadJobs(false)
    } catch (err: any) {
      setError('Failed to discover jobs')
    } finally {
      setIsDiscovering(false)
    }
  }

  const handleFilterChange = (filters: Partial<JobSearchParams>) => {
    setSearchParams({ ...searchParams, ...filters, skip: 0 })
  }

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return
    setSearchParams(prev => ({ ...prev, skip: (prev.skip || 0) + 20 }))
  }, [loading, hasMore])

  useEffect(() => {
    if (!loadingRef.current) return

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore()
        }
      },
      { threshold: 1.0 }
    )

    observer.current.observe(loadingRef.current)

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [loadMore, hasMore, loading])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Job Discovery</h1>
          <p className="text-gray-600">Find your next opportunity from multiple sources</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search jobs (e.g., Software Engineer, Data Scientist)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchParams.query}
                onChange={(e) => setSearchParams({ ...searchParams, query: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && handleDiscover()}
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Location (e.g., San Francisco, Remote)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchParams.location}
                onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
              />
            </div>
            <button
              onClick={handleDiscover}
              disabled={isDiscovering || !searchParams.query}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-2"
            >
              {isDiscovering ? (
                <>
                  <RefreshCw className="animate-spin" size={18} />
                  Discovering...
                </>
              ) : (
                <>
                  <Search size={18} />
                  Discover Jobs
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filters */}
        <JobFilters onFilterChange={handleFilterChange} currentFilters={searchParams} />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Job Listings */}
        {!loading && (
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Briefcase className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or discover new jobs
                </p>
                <button
                  onClick={handleDiscover}
                  disabled={!searchParams.query}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  Discover Jobs
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4 text-gray-600">
                  Showing {jobs.length} jobs
                </div>
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
                <div ref={loadingRef} className="flex justify-center mt-8">
                  {loading && hasMore && (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  )}
                  {!hasMore && jobs.length > 0 && (
                    <p className="text-gray-500">No more jobs to load</p>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
