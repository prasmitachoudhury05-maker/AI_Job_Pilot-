import api from '../utils/api'
import { CandidateProfile, Resume } from '../types/profile'

export const profileService = {
  // Get current user's profile
  getMyProfile: async (): Promise<CandidateProfile> => {
    const response = await api.get('/api/v1/profiles/me')
    return response.data
  },

  // Create profile
  createProfile: async (data: Partial<CandidateProfile>): Promise<CandidateProfile> => {
    const response = await api.post('/api/v1/profiles', data)
    return response.data
  },

  // Update profile
  updateProfile: async (data: Partial<CandidateProfile>): Promise<CandidateProfile> => {
    const response = await api.put('/api/v1/profiles/me', data)
    return response.data
  },

  // Get profile by ID
  getProfileById: async (id: number): Promise<CandidateProfile> => {
    const response = await api.get(`/api/v1/profiles/${id}`)
    return response.data
  },

  // List profiles with filters
  listProfiles: async (params?: { skills?: string; location?: string; skip?: number; limit?: number }): Promise<CandidateProfile[]> => {
    const response = await api.get('/api/v1/profiles', { params })
    return response.data
  },
}

export const resumeService = {
  // Upload resume
  uploadResume: async (file: File): Promise<Resume> => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await api.post('/api/v1/resumes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // List resumes
  listResumes: async (): Promise<Resume[]> => {
    const response = await api.get('/api/v1/resumes')
    return response.data
  },

  // Get resume by ID
  getResumeById: async (id: number): Promise<Resume> => {
    const response = await api.get(`/api/v1/resumes/${id}`)
    return response.data
  },

  // Delete resume
  deleteResume: async (id: number): Promise<void> => {
    await api.delete(`/api/v1/resumes/${id}`)
  },

  // Parse resume
  parseResume: async (id: number): Promise<{ resume_id: number; parsed_data: Record<string, any>; success: boolean; message: string }> => {
    const response = await api.post(`/api/v1/resumes/${id}/parse`)
    return response.data
  },
}
