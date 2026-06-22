'use client'

import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { cn } from '../../utils/cn'

interface SkillsInputProps {
  value: string[]
  onChange: (skills: string[]) => void
  placeholder?: string
  className?: string
}

export default function SkillsInput({ value = [], onChange, placeholder = 'Add a skill...', className }: SkillsInputProps) {
  const [inputValue, setInputValue] = useState('')

  const handleAddSkill = () => {
    if (inputValue.trim() && !value.includes(inputValue.trim())) {
      onChange([...value, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    onChange(value.filter(skill => skill !== skillToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      handleRemoveSkill(value[value.length - 1])
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex flex-wrap gap-2">
        {value.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1 px-3 py-1 bg-red-900/30 text-red-300 rounded-none text-sm"
          >
            {skill}
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="hover:text-red-600"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 border border-2 border-amber-900/50 bg-black text-amber-50 hover:border-red-600 transition-colors rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="button"
          onClick={handleAddSkill}
          className="px-4 py-2 bg-red-600 text-amber-50 rounded-none hover:bg-black hover:text-red-600 hover:border-red-600 border-2 border-transparent transition-all hover:-translate-y-1 flex items-center gap-2"
        >
          <Plus size={16} />
          Add
        </button>
      </div>
    </div>
  )
}
