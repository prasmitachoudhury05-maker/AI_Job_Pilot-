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
    <div className="bg-black border-2 border-amber-900/50 rounded-none shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-amber-400/80" />
          <h3 className="font-semibold text-amber-50">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-amber-400/80 hover:text-amber-50"
          >
            <X size={16} />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Skills Filter */}
        <div>
          <label className="block text-sm font-medium text-amber-200 mb-2">
            Skills (comma-separated)
          </label>
          <input
            type="text"
            placeholder="e.g., python, react, aws"
            className="w-full px-3 py-2 border border-2 border-amber-900/50 bg-black text-amber-50 hover:border-red-600 transition-colors rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
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
              className="w-5 h-5 text-red-500 rounded focus:ring-red-500"
            />
            <span className="text-sm font-medium text-amber-200">Remote Only</span>
          </label>
        </div>
      </div>
    </div>
  )
}
