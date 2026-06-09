'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProfileForm from '../../../components/profile/ProfileForm'
import { CandidateProfile } from '../../../types/profile'

export default function CreateProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<CandidateProfile | null>(null)

  const handleSuccess = (createdProfile: CandidateProfile) => {
    setProfile(createdProfile)
    // Redirect to profile overview after a short delay
    setTimeout(() => {
      router.push('/profile')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your Profile</h1>
          <p className="text-gray-600">
            Build your professional profile to get discovered by recruiters
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {profile ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Profile Created!</h2>
              <p className="text-gray-600 mb-6">Redirecting to your profile...</p>
            </div>
          ) : (
            <ProfileForm mode="create" onSuccess={handleSuccess} />
          )}
        </div>
      </div>
    </div>
  )
}
