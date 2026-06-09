'use client'

import { useState } from 'react'
import { Upload, FileText, Trash2, CheckCircle } from 'lucide-react'
import { Resume } from '../../types/profile'
import { resumeService } from '../../services/profileService'
import { cn } from '../../utils/cn'

interface ResumeUploadProps {
  candidateId: number
  onUploadSuccess?: (resume: Resume) => void
  className?: string
}

export default function ResumeUpload({ candidateId, onUploadSuccess, className }: ResumeUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadedResume, setUploadedResume] = useState<Resume | null>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword']
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Please upload a PDF or DOCX file.')
      return
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit.')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const resume = await resumeService.uploadResume(file)
      setUploadedResume(resume)
      onUploadSuccess?.(resume)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to upload resume')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async () => {
    if (!uploadedResume) return

    try {
      await resumeService.deleteResume(uploadedResume.id)
      setUploadedResume(null)
    } catch (err: any) {
      setError('Failed to delete resume')
    }
  }

  return (
    <div className={cn('space-y-4', className)}>
      {uploadedResume ? (
        <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900">{uploadedResume.file_name}</p>
                <p className="text-sm text-gray-600">
                  {(uploadedResume.file_size / 1024).toFixed(1)} KB • {uploadedResume.file_type}
                </p>
              </div>
            </div>
            <button
              onClick={handleDelete}
              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
          <input
            type="file"
            id="resume-upload"
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
          />
          <label
            htmlFor="resume-upload"
            className="cursor-pointer flex flex-col items-center gap-3"
          >
            <div className="p-4 bg-blue-100 rounded-full">
              <Upload className="text-blue-600" size={32} />
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {uploading ? 'Uploading...' : 'Upload your resume'}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                PDF or DOCX, max 10MB
              </p>
            </div>
          </label>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}
    </div>
  )
}
