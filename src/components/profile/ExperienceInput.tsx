'use client'

import { Trash2, Plus } from 'lucide-react'
import { ExperienceItem } from '../../types/profile'
import { cn } from '../../utils/cn'

interface ExperienceInputProps {
  value: ExperienceItem[]
  onChange: (experience: ExperienceItem[]) => void
  className?: string
}

export default function ExperienceInput({ value = [], onChange, className }: ExperienceInputProps) {
  const addExperience = () => {
    onChange([
      ...value,
      {
        company: '',
        position: '',
        start_date: '',
        end_date: '',
        description: '',
        location: '',
      },
    ])
  }

  const removeExperience = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const updateExperience = (index: number, field: keyof ExperienceItem, fieldValue: string) => {
    const updated = [...value]
    updated[index] = { ...updated[index], [field]: fieldValue }
    onChange(updated)
  }

  return (
    <div className={cn('space-y-4', className)}>
      {value.map((exp, index) => (
        <div key={index} className="p-4 border border-amber-900/50 rounded-none space-y-3">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-amber-50">Experience {index + 1}</h4>
            <button
              type="button"
              aria-label={`Delete Experience ${index + 1}`}
              onClick={() => removeExperience(index)}
              className="text-red-600 hover:text-red-500"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor={`exp-company-${index}`} className="block text-sm font-medium text-amber-200 mb-1">Company</label>
              <input
                id={`exp-company-${index}`}
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                className="w-full px-3 py-2 border border-2 border-amber-900/50 bg-black text-amber-50 hover:border-red-600 transition-colors rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Company name"
              />
            </div>
            <div>
              <label htmlFor={`exp-position-${index}`} className="block text-sm font-medium text-amber-200 mb-1">Position</label>
              <input
                id={`exp-position-${index}`}
                type="text"
                value={exp.position}
                onChange={(e) => updateExperience(index, 'position', e.target.value)}
                className="w-full px-3 py-2 border border-2 border-amber-900/50 bg-black text-amber-50 hover:border-red-600 transition-colors rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Job title"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor={`exp-start-date-${index}`} className="block text-sm font-medium text-amber-200 mb-1">Start Date</label>
              <input
                id={`exp-start-date-${index}`}
                type="date"
                value={exp.start_date}
                onChange={(e) => updateExperience(index, 'start_date', e.target.value)}
                className="w-full px-3 py-2 border border-2 border-amber-900/50 bg-black text-amber-50 hover:border-red-600 transition-colors rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label htmlFor={`exp-end-date-${index}`} className="block text-sm font-medium text-amber-200 mb-1">End Date</label>
              <input
                id={`exp-end-date-${index}`}
                type="date"
                value={exp.end_date || ''}
                onChange={(e) => updateExperience(index, 'end_date', e.target.value)}
                className="w-full px-3 py-2 border border-2 border-amber-900/50 bg-black text-amber-50 hover:border-red-600 transition-colors rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor={`exp-location-${index}`} className="block text-sm font-medium text-amber-200 mb-1">Location</label>
            <input
              id={`exp-location-${index}`}
              type="text"
              value={exp.location || ''}
              onChange={(e) => updateExperience(index, 'location', e.target.value)}
              className="w-full px-3 py-2 border border-2 border-amber-900/50 bg-black text-amber-50 hover:border-red-600 transition-colors rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="City, State"
            />
          </div>
          <div>
            <label htmlFor={`exp-description-${index}`} className="block text-sm font-medium text-amber-200 mb-1">Description</label>
            <textarea
              id={`exp-description-${index}`}
              value={exp.description || ''}
              onChange={(e) => updateExperience(index, 'description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-2 border-amber-900/50 bg-black text-amber-50 hover:border-red-600 transition-colors rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Describe your responsibilities and achievements"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addExperience}
        className="w-full px-4 py-2 border-2 border-dashed border-2 border-amber-900/50 bg-black text-amber-50 hover:border-red-600 transition-colors rounded-none text-amber-400/80 hover:border-red-500 hover:text-red-600 flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        Add Experience
      </button>
    </div>
  )
}
