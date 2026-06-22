'use client'

import { Trash2, Plus } from 'lucide-react'
import { EducationItem } from '../../types/profile'
import { cn } from '../../utils/cn'

interface EducationInputProps {
  value: EducationItem[]
  onChange: (education: EducationItem[]) => void
  className?: string
}

export default function EducationInput({ value = [], onChange, className }: EducationInputProps) {
  const addEducation = () => {
    onChange([
      ...value,
      {
        institution: '',
        degree: '',
        field_of_study: '',
        start_date: '',
        end_date: '',
        gpa: undefined,
        description: '',
      },
    ])
  }

  const removeEducation = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const updateEducation = (index: number, field: keyof EducationItem, fieldValue: any) => {
    const updated = [...value]
    updated[index] = { ...updated[index], [field]: fieldValue }
    onChange(updated)
  }

  return (
    <div className={cn('space-y-4', className)}>
      {value.map((edu, index) => (
        <div key={index} className="p-4 border border-amber-900/50 rounded-none space-y-3">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-amber-50">Education {index + 1}</h4>
            <button
              type="button"
              aria-label={`Delete Education ${index + 1}`}
              onClick={() => removeEducation(index)}
              className="text-red-600 hover:text-red-500"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <div>
            <label htmlFor={`edu-institution-${index}`} className="block text-sm font-medium text-amber-200 mb-1">Institution</label>
            <input
              id={`edu-institution-${index}`}
              type="text"
              value={edu.institution}
              onChange={(e) => updateEducation(index, 'institution', e.target.value)}
              className="w-full px-3 py-2 border border-2 border-amber-900/50 bg-black text-amber-50 hover:border-red-600 transition-colors rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="University/College name"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor={`edu-degree-${index}`} className="block text-sm font-medium text-amber-200 mb-1">Degree</label>
              <input
                id={`edu-degree-${index}`}
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                className="w-full px-3 py-2 border border-2 border-amber-900/50 bg-black text-amber-50 hover:border-red-600 transition-colors rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Bachelor's, Master's, PhD, etc."
              />
            </div>
            <div>
              <label htmlFor={`edu-field-${index}`} className="block text-sm font-medium text-amber-200 mb-1">Field of Study</label>
              <input
                id={`edu-field-${index}`}
                type="text"
                value={edu.field_of_study}
                onChange={(e) => updateEducation(index, 'field_of_study', e.target.value)}
                className="w-full px-3 py-2 border border-2 border-amber-900/50 bg-black text-amber-50 hover:border-red-600 transition-colors rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Computer Science, Business, etc."
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor={`edu-start-date-${index}`} className="block text-sm font-medium text-amber-200 mb-1">Start Date</label>
              <input
                id={`edu-start-date-${index}`}
                type="date"
                value={edu.start_date}
                onChange={(e) => updateEducation(index, 'start_date', e.target.value)}
                className="w-full px-3 py-2 border border-2 border-amber-900/50 bg-black text-amber-50 hover:border-red-600 transition-colors rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label htmlFor={`edu-end-date-${index}`} className="block text-sm font-medium text-amber-200 mb-1">End Date</label>
              <input
                id={`edu-end-date-${index}`}
                type="date"
                value={edu.end_date || ''}
                onChange={(e) => updateEducation(index, 'end_date', e.target.value)}
                className="w-full px-3 py-2 border border-2 border-amber-900/50 bg-black text-amber-50 hover:border-red-600 transition-colors rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label htmlFor={`edu-gpa-${index}`} className="block text-sm font-medium text-amber-200 mb-1">GPA</label>
              <input
                id={`edu-gpa-${index}`}
                type="number"
                step="0.01"
                min="0"
                max="4.0"
                value={edu.gpa || ''}
                onChange={(e) => updateEducation(index, 'gpa', parseFloat(e.target.value) || undefined)}
                className="w-full px-3 py-2 border border-2 border-amber-900/50 bg-black text-amber-50 hover:border-red-600 transition-colors rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="3.5"
              />
            </div>
          </div>
          <div>
            <label htmlFor={`edu-description-${index}`} className="block text-sm font-medium text-amber-200 mb-1">Description</label>
            <textarea
              id={`edu-description-${index}`}
              value={edu.description || ''}
              onChange={(e) => updateEducation(index, 'description', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-2 border-amber-900/50 bg-black text-amber-50 hover:border-red-600 transition-colors rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Honors, achievements, relevant coursework"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addEducation}
        className="w-full px-4 py-2 border-2 border-dashed border-2 border-amber-900/50 bg-black text-amber-50 hover:border-red-600 transition-colors rounded-none text-amber-400/80 hover:border-red-500 hover:text-red-600 flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        Add Education
      </button>
    </div>
  )
}
