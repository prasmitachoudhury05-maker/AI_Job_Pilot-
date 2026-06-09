'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, ArrowRight } from 'lucide-react'
import { CandidateProfile, ExperienceItem, EducationItem } from '../../types/profile'
import { profileService } from '../../services/profileService'
import SkillsInput from './SkillsInput'
import ExperienceInput from './ExperienceInput'
import EducationInput from './EducationInput'
import { cn } from '../../utils/cn'

const profileSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin_url: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  github_url: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  portfolio_url: z.string().url('Invalid portfolio URL').optional().or(z.literal('')),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  experience: z.array(z.object({
    company: z.string().min(1, 'Company is required'),
    position: z.string().min(1, 'Position is required'),
    start_date: z.string().min(1, 'Start date is required'),
    end_date: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
  })).optional(),
  education: z.array(z.object({
    institution: z.string().min(1, 'Institution is required'),
    degree: z.string().min(1, 'Degree is required'),
    field_of_study: z.string().min(1, 'Field of study is required'),
    start_date: z.string().min(1, 'Start date is required'),
    end_date: z.string().optional(),
    gpa: z.number().optional(),
    description: z.string().optional(),
  })).optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface ProfileFormProps {
  existingProfile?: CandidateProfile
  onSuccess?: (profile: CandidateProfile) => void
  mode?: 'create' | 'edit'
  className?: string
}

export default function ProfileForm({ existingProfile, onSuccess, mode = 'create', className }: ProfileFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: existingProfile ? {
      title: existingProfile.title || '',
      summary: existingProfile.summary || '',
      phone: existingProfile.phone || '',
      location: existingProfile.location || '',
      linkedin_url: existingProfile.linkedin_url || '',
      github_url: existingProfile.github_url || '',
      portfolio_url: existingProfile.portfolio_url || '',
      skills: existingProfile.skills || [],
      experience: existingProfile.experience || [],
      education: existingProfile.education || [],
    } : {
      title: '',
      summary: '',
      phone: '',
      location: '',
      linkedin_url: '',
      github_url: '',
      portfolio_url: '',
      skills: [],
      experience: [],
      education: [],
    },
  })

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true)
    setError(null)

    try {
      let profile: CandidateProfile
      if (mode === 'create') {
        profile = await profileService.createProfile(data)
      } else {
        profile = await profileService.updateProfile(data)
      }
      onSuccess?.(profile)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to save profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-6', className)}>
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
          <input
            {...register('title')}
            type="text"
            placeholder="e.g., Senior Software Engineer"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
          <textarea
            {...register('summary')}
            rows={4}
            placeholder="Write a brief summary of your professional background and goals"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.summary && <p className="text-red-600 text-sm mt-1">{errors.summary.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              {...register('phone')}
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              {...register('location')}
              type="text"
              placeholder="San Francisco, CA"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
            <input
              {...register('linkedin_url')}
              type="url"
              placeholder="https://linkedin.com/in/..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.linkedin_url && <p className="text-red-600 text-sm mt-1">{errors.linkedin_url.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
            <input
              {...register('github_url')}
              type="url"
              placeholder="https://github.com/..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.github_url && <p className="text-red-600 text-sm mt-1">{errors.github_url.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio URL</label>
            <input
              {...register('portfolio_url')}
              type="url"
              placeholder="https://..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.portfolio_url && <p className="text-red-600 text-sm mt-1">{errors.portfolio_url.message}</p>}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
        <SkillsInput
          value={watch('skills') || []}
          onChange={(skills) => setValue('skills', skills)}
        />
        {errors.skills && <p className="text-red-600 text-sm">{errors.skills.message}</p>}
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
        <ExperienceInput
          value={watch('experience') || []}
          onChange={(experience) => setValue('experience', experience)}
        />
      </div>

      {/* Education */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Education</h3>
        <EducationInput
          value={watch('education') || []}
          onChange={(education) => setValue('education', education)}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-2"
        >
          {loading ? (
            'Saving...'
          ) : (
            <>
              <Save size={18} />
              {mode === 'create' ? 'Create Profile' : 'Save Changes'}
            </>
          )}
        </button>
      </div>
    </form>
  )
}
