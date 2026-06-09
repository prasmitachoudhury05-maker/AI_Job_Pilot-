import React from 'react'
import { render, screen } from '@testing-library/react'
import ProfileCompletion from './ProfileCompletion'

describe('ProfileCompletion', () => {
  it('renders profile completion percentage', () => {
    render(<ProfileCompletion percentage={75} />)
    
    expect(screen.getByText('75%')).toBeInTheDocument()
    expect(screen.getByText('Profile Completion')).toBeInTheDocument()
  })

  it('shows excellent status for 80%+ completion', () => {
    render(<ProfileCompletion percentage={85} />)
    
    expect(screen.getByText('Excellent')).toBeInTheDocument()
  })

  it('shows in progress status for 50-79% completion', () => {
    render(<ProfileCompletion percentage={65} />)
    
    expect(screen.getByText('In Progress')).toBeInTheDocument()
  })

  it('shows needs work status for <50% completion', () => {
    render(<ProfileCompletion percentage={30} />)
    
    expect(screen.getByText('Needs Work')).toBeInTheDocument()
  })

  it('shows completion message when not 100% complete', () => {
    render(<ProfileCompletion percentage={75} />)
    
    expect(screen.getByText(/complete your profile to increase visibility/i)).toBeInTheDocument()
  })

  it('does not show completion message when 100% complete', () => {
    render(<ProfileCompletion percentage={100} />)
    
    expect(screen.queryByText(/complete your profile to increase visibility/i)).not.toBeInTheDocument()
  })

  it('renders progress bar', () => {
    render(<ProfileCompletion percentage={50} />)
    
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
  })

  it('handles 0% completion', () => {
    render(<ProfileCompletion percentage={0} />)
    
    expect(screen.getByText('0%')).toBeInTheDocument()
    expect(screen.getByText('Needs Work')).toBeInTheDocument()
  })

  it('handles 100% completion', () => {
    render(<ProfileCompletion percentage={100} />)
    
    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByText('Excellent')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<ProfileCompletion percentage={50} className="custom-class" />)
    
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
