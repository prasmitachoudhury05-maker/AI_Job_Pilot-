'use client'

import { Progress } from '../../components/ui/progress'
import { CheckCircle2, Circle } from 'lucide-react'
import { cn } from '../../utils/cn'

interface ProfileCompletionProps {
  percentage: number
  className?: string
}

export default function ProfileCompletion({ percentage, className }: ProfileCompletionProps) {
  const getCompletionColor = (pct: number) => {
    if (pct >= 80) return 'text-green-600'
    if (pct >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getProgressColor = (pct: number) => {
    if (pct >= 80) return 'bg-green-500'
    if (pct >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getStatusText = (pct: number) => {
    if (pct >= 80) return 'Excellent'
    if (pct >= 50) return 'In Progress'
    return 'Needs Work'
  }

  return (
    <div className={cn('bg-white rounded-lg border border-gray-200 p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Profile Completion</h3>
        <span className={cn('text-sm font-medium', getCompletionColor(percentage))}>
          {percentage}%
        </span>
      </div>
      
      <Progress value={percentage} className="h-2 mb-4" />
      
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Circle size={16} className={cn(percentage >= 100 ? 'text-green-600' : 'text-gray-400')} />
        <span>{getStatusText(percentage)}</span>
      </div>

      {percentage < 100 && (
        <p className="text-xs text-gray-500 mt-3">
          Complete your profile to increase visibility to recruiters.
        </p>
      )}
    </div>
  )
}
