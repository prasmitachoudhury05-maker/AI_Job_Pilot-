import axios from 'axios'
import { Job, JobSearchParams, JobStatistics } from '../types/job'

const API_BASE_URL = typeof window !== 'undefined' 
  ? window.location.origin 
  : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000');

class JobService {
  async discoverJobs(params: {
    query: string
    location?: string
    sources?: string
    limit?: number
  }) {
    const response = await axios.post(`${API_BASE_URL}/api/v1/jobs/discover`, params)
    return response.data
  }

  async listJobs(params: JobSearchParams = {}): Promise<Job[]> {
    const response = await axios.get(`${API_BASE_URL}/api/v1/jobs`, { params })
    return response.data
  }

  async getJob(jobId: number): Promise<Job> {
    const response = await axios.get(`${API_BASE_URL}/api/v1/jobs/${jobId}`)
    return response.data
  }

  async getStatistics(): Promise<JobStatistics> {
    const response = await axios.get(`${API_BASE_URL}/api/v1/jobs/statistics/overview`)
    return response.data
  }

  async parseJob(jobId: number): Promise<Job> {
    const response = await axios.post(`${API_BASE_URL}/api/v1/jobs/${jobId}/parse`)
    return response.data
  }
}

export const jobService = new JobService()
