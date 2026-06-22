'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProfileForm from '../../../components/profile/ProfileForm'
import { CandidateProfile } from '../../../types/profile'
import { profileService } from '../../../services/profileService'

export default function EditProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<CandidateProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const data = await profileService.getMyProfile()
      setProfile(data)
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

  const handleSuccess = (updatedProfile: CandidateProfile) => {
    setProfile(updatedProfile)
    // Redirect to profile overview after a short delay
    setTimeout(() => {
      router.push('/profile')
    }, 1500)
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

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-50 mb-2">Edit Your Profile</h1>
          <p className="text-amber-400/80">
            Update your professional information
          </p>
        </div>

        <div className="bg-black border-2 border-amber-900/50 rounded-none shadow-lg p-8">
          <ProfileForm mode="edit" existingProfile={profile} onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  )
}
