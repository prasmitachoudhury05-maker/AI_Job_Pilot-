'use client'

import { Filter, X } from 'lucide-react'
import { JobSearchParams } from '../../types/job'

interface JobFiltersProps {
  onFilterChange: (filters: Partial<JobSearchParams>) => void
  currentFilters: JobSearchParams
}

export default function JobFilters({ onFilterChange, currentFilters }: JobFiltersProps) {
  const handleToggleRemote = () => {
    onFilterChange({ remote_only: !currentFilters.remote_only })
  }

  const handleSkillsChange = (skills: string) => {
    onFilterChange({ skills })
  }

  const clearFilters = () => {
    onFilterChange({
      skills: '',
      remote_only: false,
    })
  }

  const hasActiveFilters = currentFilters.skills || currentFilters.remote_only

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <X size={16} />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Skills Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills (comma-separated)
          </label>
          <input
            type="text"
            placeholder="e.g., python, react, aws"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={currentFilters.skills || ''}
            onChange={(e) => handleSkillsChange(e.target.value)}
          />
        </div>

        {/* Remote Toggle */}
        <div className="flex items-center">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={currentFilters.remote_only || false}
              onChange={handleToggleRemote}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Remote Only</span>
          </label>
        </div>
      </div>
    </div>
  )
}
