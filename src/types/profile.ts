export interface ExperienceItem {
  company: string
  position: string
  start_date: string
  end_date?: string
  description?: string
  location?: string
}

export interface EducationItem {
  institution: string
  degree: string
  field_of_study: string
  start_date: string
  end_date?: string
  gpa?: number
  description?: string
}

export interface ProfileData {
  title?: string
  summary?: string
  phone?: string
  location?: string
  linkedin_url?: string
  github_url?: string
  portfolio_url?: string
  website_url?: string
}

export interface CandidateProfile extends ProfileData {
  id: number
  user_id: number
  skills?: string[]
  experience?: ExperienceItem[]
  education?: EducationItem[]
  completion_percentage: number
  created_at: string
  updated_at?: string
}

export interface Resume {
  id: number
  candidate_id: number
  file_name: string
  file_path: string
  file_size: number
  file_type: string
  parsed_content?: string
  parsed_data?: Record<string, any>
  is_active: boolean
  created_at: string
  updated_at?: string
}
