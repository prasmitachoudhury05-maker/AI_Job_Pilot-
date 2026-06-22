'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, MapPin, Mail, Link as LinkIcon, Briefcase, GraduationCap, Edit, FileText, Upload } from 'lucide-react'
import ProfileCompletion from '../../components/profile/ProfileCompletion'
import ResumeUpload from '../../components/profile/ResumeUpload'
import { CandidateProfile, Resume } from '../../types/profile'
import { profileService, resumeService } from '../../services/profileService'

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<CandidateProfile | null>(null)
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [profileData, resumesData] = await Promise.all([
        profileService.getMyProfile(),
        resumeService.listResumes(),
      ])
      setProfile(profileData)
      setResumes(resumesData)
    } catch (err: any) {
      if (err.response?.status === 404) {
        router.push('/profile/create')
      } else {
        setError('Failed to load profile')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResumeUpload = (resume: Resume) => {
    setResumes([...resumes, resume])
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-none border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-amber-400/80">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-900/30 border-2 border-red-600 text-red-500 rounded-none mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-amber-50 mb-2">Error</h2>
          <p className="text-amber-400/80">{error}</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return null
  }

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-amber-50 mb-2">My Profile</h1>
            <p className="text-amber-400/80">Manage your professional profile</p>
          </div>
          <button
            onClick={() => router.push('/profile/edit')}
            className="px-4 py-2 bg-red-600 text-amber-50 rounded-none hover:bg-black hover:text-red-600 hover:border-red-600 border-2 border-transparent transition-all hover:-translate-y-1 flex items-center gap-2"
          >
            <Edit size={18} />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information Card */}
            <div className="bg-black border-2 border-amber-900/50 rounded-none shadow-lg p-6">
              <h2 className="text-xl font-semibold text-amber-50 mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-amber-50">{profile.title || 'No title set'}</h3>
                  <p className="text-amber-400/80 mt-1">{profile.summary || 'No summary provided'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  {profile.phone && (
                    <div className="flex items-center gap-2 text-amber-400/80">
                      <User size={18} />
                      <span>{profile.phone}</span>
                    </div>
                  )}
                  {profile.location && (
                    <div className="flex items-center gap-2 text-amber-400/80">
                      <MapPin size={18} />
                      <span>{profile.location}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t">
                  {profile.linkedin_url && (
                    <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-red-500 hover:text-blue-700">
                      <LinkIcon size={18} />
                      LinkedIn
                    </a>
                  )}
                  {profile.github_url && (
                    <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-amber-200 hover:text-amber-50">
                      <LinkIcon size={18} />
                      GitHub
                    </a>
                  )}
                  {profile.portfolio_url && (
                    <a href={profile.portfolio_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-amber-200 hover:text-amber-50">
                      <LinkIcon size={18} />
                      Portfolio
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Skills Card */}
            <div className="bg-black border-2 border-amber-900/50 rounded-none shadow-lg p-6">
              <h2 className="text-xl font-semibold text-amber-50 mb-4">Skills</h2>
              {profile.skills && profile.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-red-900/30 text-red-300 rounded-none text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-amber-400/80">No skills added yet</p>
              )}
            </div>

            {/* Experience Card */}
            <div className="bg-black border-2 border-amber-900/50 rounded-none shadow-lg p-6">
              <h2 className="text-xl font-semibold text-amber-50 mb-4 flex items-center gap-2">
                <Briefcase size={20} />
                Work Experience
              </h2>
              {profile.experience && profile.experience.length > 0 ? (
                <div className="space-y-4">
                  {profile.experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-red-500 pl-4">
                      <h3 className="font-medium text-amber-50">{exp.position}</h3>
                      <p className="text-amber-400/80">{exp.company}</p>
                      <p className="text-sm text-amber-400/80 mt-1">
                        {exp.start_date} - {exp.end_date || 'Present'}
                      </p>
                      {exp.description && (
                        <p className="text-amber-400/80 mt-2 text-sm">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-amber-400/80">No experience added yet</p>
              )}
            </div>

            {/* Education Card */}
            <div className="bg-black border-2 border-amber-900/50 rounded-none shadow-lg p-6">
              <h2 className="text-xl font-semibold text-amber-50 mb-4 flex items-center gap-2">
                <GraduationCap size={20} />
                Education
              </h2>
              {profile.education && profile.education.length > 0 ? (
                <div className="space-y-4">
                  {profile.education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-green-500 pl-4">
                      <h3 className="font-medium text-amber-50">{edu.degree}</h3>
                      <p className="text-amber-400/80">{edu.institution}</p>
                      <p className="text-sm text-amber-400/80 mt-1">
                        {edu.field_of_study} • {edu.start_date} - {edu.end_date || 'Present'}
                      </p>
                      {edu.gpa && (
                        <p className="text-sm text-amber-400/80 mt-1">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-amber-400/80">No education added yet</p>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <ProfileCompletion percentage={profile.completion_percentage} />

            {/* Resume Upload */}
            <div className="bg-black border-2 border-amber-900/50 rounded-none shadow-lg p-6">
              <h2 className="text-xl font-semibold text-amber-50 mb-4 flex items-center gap-2">
                <FileText size={20} />
                Resume
              </h2>
              <ResumeUpload candidateId={profile.id} onUploadSuccess={handleResumeUpload} />
              
              {resumes.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <h3 className="text-sm font-medium text-amber-200 mb-2">Uploaded Resumes</h3>
                  <div className="space-y-2">
                    {resumes.map((resume) => (
                      <div key={resume.id} className="flex items-center justify-between p-2 bg-amber-950/50 rounded">
                        <span className="text-sm text-amber-200 truncate">{resume.file_name}</span>
                        {resume.is_active && (
                          <span className="text-xs bg-green-900/30 border-2 border-green-500 text-green-500 text-green-500 px-2 py-1 rounded">Active</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
