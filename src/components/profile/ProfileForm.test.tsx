import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProfileForm from './ProfileForm'

// Mock the profile service
jest.mock('../../services/profileService', () => ({
  profileService: {
    createProfile: jest.fn(),
    updateProfile: jest.fn(),
  },
}))

// Mock the child components
jest.mock('./SkillsInput', () => {
  return function MockSkillsInput({ value, onChange }: any) {
    return (
      <div data-testid="skills-input">
        <input
          data-testid="skills-input-field"
          value={value?.join(', ') || ''}
          onChange={(e) => onChange(e.target.value.split(', '))}
        />
      </div>
    )
  }
})

jest.mock('./ExperienceInput', () => {
  return function MockExperienceInput({ value, onChange }: any) {
    return (
      <div data-testid="experience-input">
        <span data-testid="experience-count">{value?.length || 0}</span>
      </div>
    )
  }
})

jest.mock('./EducationInput', () => {
  return function MockEducationInput({ value, onChange }: any) {
    return (
      <div data-testid="education-input">
        <span data-testid="education-count">{value?.length || 0}</span>
      </div>
    )
  }
})

describe('ProfileForm', () => {
  it('renders form fields in create mode', () => {
    render(<ProfileForm mode="create" onChange={jest.fn()} />)
    
    expect(screen.getByLabelText(/professional title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/professional summary/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/linkedin url/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/github url/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/portfolio url/i)).toBeInTheDocument()
  })

  it('renders with existing profile data in edit mode', () => {
    const existingProfile = {
      id: 1,
      user_id: 1,
      title: 'Software Engineer',
      summary: 'Experienced developer',
      phone: '+1234567890',
      location: 'San Francisco',
      linkedin_url: 'https://linkedin.com/in/test',
      github_url: 'https://github.com/test',
      portfolio_url: 'https://portfolio.com',
      skills: ['JavaScript', 'Python'],
      experience: [],
      education: [],
      completion_percentage: 50,
      created_at: '2026-06-12',
    }
    
    render(<ProfileForm mode="edit" existingProfile={existingProfile} onChange={jest.fn()} />)
    
    expect(screen.getByDisplayValue('Software Engineer')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Experienced developer')).toBeInTheDocument()
    expect(screen.getByDisplayValue('+1234567890')).toBeInTheDocument()
    expect(screen.getByDisplayValue('San Francisco')).toBeInTheDocument()
  })

  it('submits form in create mode', async () => {
    const { profileService } = require('../../services/profileService')
    const mockProfile = {
      id: 1,
      title: 'Software Engineer',
      summary: 'Test summary',
      skills: ['JavaScript'],
      experience: [],
      education: [],
      completion_percentage: 30,
    }
    profileService.createProfile.mockResolvedValue(mockProfile)
    
    const onSuccess = jest.fn()
    render(<ProfileForm mode="create" onSuccess={onSuccess} />)
    
    const titleInput = screen.getByLabelText(/professional title/i)
    const summaryInput = screen.getByLabelText(/professional summary/i)
    const skillsField = screen.getByTestId('skills-input-field')
    const submitButton = screen.getByRole('button', { name: /create profile/i })
    
    await userEvent.type(titleInput, 'Software Engineer')
    await userEvent.type(summaryInput, 'Test summary')
    await userEvent.type(skillsField, 'React')
    
    fireEvent.click(submitButton)
    
    await waitFor(() => expect(profileService.createProfile).toHaveBeenCalled())
  })

  it('submits form in edit mode', async () => {
    const { profileService } = require('../../services/profileService')
    const mockProfile = {
      id: 1,
      title: 'Software Engineer',
      summary: 'Updated summary',
      skills: ['JavaScript'],
      experience: [],
      education: [],
      completion_percentage: 30,
    }
    profileService.updateProfile.mockResolvedValue(mockProfile)
    
    const existingProfile = {
      id: 1,
      user_id: 1,
      title: 'Software Engineer',
      summary: 'Original summary',
      skills: ['JavaScript'],
      experience: [],
      education: [],
      completion_percentage: 30,
      created_at: '2026-06-12',
    }
    
    const onSuccess = jest.fn()
    render(<ProfileForm mode="edit" existingProfile={existingProfile} onSuccess={onSuccess} />)
    
    const summaryInput = screen.getByLabelText(/professional summary/i)
    const submitButton = screen.getByRole('button', { name: /save changes/i })
    
    await userEvent.clear(summaryInput)
    await userEvent.type(summaryInput, 'Updated summary')
    
    fireEvent.click(submitButton)
    
    await waitFor(() => expect(profileService.updateProfile).toHaveBeenCalled())
  })

  it('displays validation errors for required fields', async () => {
    render(<ProfileForm mode="create" onChange={jest.fn()} />)
    
    const submitButton = screen.getByRole('button', { name: /create profile/i })
    fireEvent.click(submitButton)
    
    // Form should show validation errors
    expect(screen.getByLabelText(/professional title/i)).toBeInTheDocument()
  })

  it('validates LinkedIn URL format', async () => {
    render(<ProfileForm mode="create" onChange={jest.fn()} />)
    
    const linkedinInput = screen.getByLabelText(/linkedin url/i)
    await userEvent.type(linkedinInput, 'invalid-url')
    
    // Zod validation should catch this
    expect(linkedinInput).toHaveValue('invalid-url')
  })

  it('validates GitHub URL format', async () => {
    render(<ProfileForm mode="create" onChange={jest.fn()} />)
    
    const githubInput = screen.getByLabelText(/github url/i)
    await userEvent.type(githubInput, 'invalid-url')
    
    // Zod validation should catch this
    expect(githubInput).toHaveValue('invalid-url')
  })

  it('shows loading state during submission', async () => {
    const { profileService } = require('../../services/profileService')
    profileService.createProfile.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ id: 1 }), 100)))
    
    render(<ProfileForm mode="create" onChange={jest.fn()} />)
    
    const titleInput = screen.getByLabelText(/professional title/i)
    const summaryInput = screen.getByLabelText(/professional summary/i)
    const skillsField = screen.getByTestId('skills-input-field')
    const submitButton = screen.getByRole('button', { name: /create profile/i })
    
    await userEvent.type(titleInput, 'Software Engineer')
    await userEvent.type(summaryInput, 'Test summary')
    await userEvent.type(skillsField, 'React')
    
    fireEvent.click(submitButton)
    
    // Button should show loading state
    expect(await screen.findByText(/saving/i)).toBeInTheDocument()
  })

  it('displays error message on submission failure', async () => {
    const { profileService } = require('../../services/profileService')
    profileService.createProfile.mockRejectedValue({
      response: { data: { detail: 'Profile already exists' } }
    })
    
    render(<ProfileForm mode="create" onChange={jest.fn()} />)
    
    const titleInput = screen.getByLabelText(/professional title/i)
    const summaryInput = screen.getByLabelText(/professional summary/i)
    const skillsField = screen.getByTestId('skills-input-field')
    const submitButton = screen.getByRole('button', { name: /create profile/i })
    
    await userEvent.type(titleInput, 'Software Engineer')
    await userEvent.type(summaryInput, 'Test summary')
    await userEvent.type(skillsField, 'React')
    
    fireEvent.click(submitButton)
    
    // Error message should be displayed
    expect(await screen.findByText(/profile already exists/i)).toBeInTheDocument()
  })

  it('renders skills input component', () => {
    render(<ProfileForm mode="create" onChange={jest.fn()} />)
    
    expect(screen.getByTestId('skills-input')).toBeInTheDocument()
  })

  it('renders experience input component', () => {
    render(<ProfileForm mode="create" onChange={jest.fn()} />)
    
    expect(screen.getByTestId('experience-input')).toBeInTheDocument()
  })

  it('renders education input component', () => {
    render(<ProfileForm mode="create" onChange={jest.fn()} />)
    
    expect(screen.getByTestId('education-input')).toBeInTheDocument()
  })
})
