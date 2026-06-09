export interface Job {
  id: number
  title: string
  company: string
  location: string
  description: string
  salary?: string
  url: string
  source: string
  sources: string[]
  skills: string[]
  job_type?: string
  experience_level?: string
  industry?: string
  remote: boolean
  posted_date?: string
  created_at: string
}

export interface JobSearchParams {
  query?: string
  location?: string
  skills?: string
  remote_only?: boolean
  skip?: number
  limit?: number
}

export interface JobStatistics {
  total_jobs: number
  source_counts: Record<string, number>
  remote_count: number
  job_type_counts: Record<string, number>
}
