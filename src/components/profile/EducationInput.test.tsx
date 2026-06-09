import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EducationInput from './EducationInput'

describe('EducationInput', () => {
  it('renders add education button when empty', () => {
    render(<EducationInput value={[]} onChange={jest.fn()} />)
    
    expect(screen.getByRole('button', { name: /add education/i })).toBeInTheDocument()
  })

  it('renders education items', () => {
    const educations = [
      {
        institution: 'University of Tech',
        degree: 'Bachelor of Science',
        field_of_study: 'Computer Science',
        start_date: '2016-01-01',
        end_date: '2020-01-01',
        gpa: 3.5,
        description: 'Graduated with honors',
      },
    ]
    render(<EducationInput value={educations} onChange={jest.fn()} />)
    
    expect(screen.getByText('Education 1')).toBeInTheDocument()
    expect(screen.getByDisplayValue('University of Tech')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Bachelor of Science')).toBeInTheDocument()
  })

  it('adds new education when add button is clicked', () => {
    const handleChange = jest.fn()
    render(<EducationInput value={[]} onChange={handleChange} />)
    
    const addButton = screen.getByRole('button', { name: /add education/i })
    fireEvent.click(addButton)
    
    expect(handleChange).toHaveBeenCalledWith([
      expect.objectContaining({
        institution: '',
        degree: '',
        field_of_study: '',
        start_date: '',
        end_date: '',
        gpa: undefined,
        description: '',
      }),
    ])
  })

  it('removes education when delete button is clicked', () => {
    const handleChange = jest.fn()
    const educations = [
      {
        institution: 'University of Tech',
        degree: 'Bachelor of Science',
        field_of_study: 'Computer Science',
        start_date: '2016-01-01',
        end_date: '2020-01-01',
        gpa: 3.5,
        description: 'Graduated with honors',
      },
    ]
    render(<EducationInput value={educations} onChange={handleChange} />)
    
    const deleteButton = screen.getByRole('button')
    fireEvent.click(deleteButton)
    
    expect(handleChange).toHaveBeenCalledWith([])
  })

  it('updates education field when input changes', async () => {
    const handleChange = jest.fn()
    const educations = [
      {
        institution: 'University of Tech',
        degree: 'Bachelor of Science',
        field_of_study: 'Computer Science',
        start_date: '2016-01-01',
        end_date: '2020-01-01',
        gpa: 3.5,
        description: 'Graduated with honors',
      },
    ]
    render(<EducationInput value={educations} onChange={handleChange} />)
    
    const institutionInput = screen.getByDisplayValue('University of Tech')
    await userEvent.clear(institutionInput)
    await userEvent.type(institutionInput, 'New University')
    
    expect(handleChange).toHaveBeenCalledWith([
      expect.objectContaining({
        institution: 'New University',
      }),
    ])
  })

  it('renders multiple education items', () => {
    const educations = [
      {
        institution: 'University of Tech',
        degree: 'Bachelor of Science',
        field_of_study: 'Computer Science',
        start_date: '2016-01-01',
        end_date: '2020-01-01',
        gpa: 3.5,
        description: 'Graduated with honors',
      },
      {
        institution: 'State College',
        degree: 'Master of Science',
        field_of_study: 'Data Science',
        start_date: '2020-01-01',
        end_date: '2022-01-01',
        gpa: 3.8,
        description: 'Research focus on ML',
      },
    ]
    render(<EducationInput value={educations} onChange={jest.fn()} />)
    
    expect(screen.getByText('Education 1')).toBeInTheDocument()
    expect(screen.getByText('Education 2')).toBeInTheDocument()
  })

  it('has correct labels for all fields', () => {
    const educations = [
      {
        institution: 'University of Tech',
        degree: 'Bachelor of Science',
        field_of_study: 'Computer Science',
        start_date: '2016-01-01',
        end_date: '2020-01-01',
        gpa: 3.5,
        description: 'Graduated with honors',
      },
    ]
    render(<EducationInput value={educations} onChange={jest.fn()} />)
    
    expect(screen.getByLabelText('Institution')).toBeInTheDocument()
    expect(screen.getByLabelText('Degree')).toBeInTheDocument()
    expect(screen.getByLabelText('Field of Study')).toBeInTheDocument()
    expect(screen.getByLabelText('Start Date')).toBeInTheDocument()
    expect(screen.getByLabelText('End Date')).toBeInTheDocument()
    expect(screen.getByLabelText('GPA')).toBeInTheDocument()
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
  })

  it('handles GPA input correctly', async () => {
    const handleChange = jest.fn()
    const educations = [
      {
        institution: 'University of Tech',
        degree: 'Bachelor of Science',
        field_of_study: 'Computer Science',
        start_date: '2016-01-01',
        end_date: '2020-01-01',
        gpa: 3.5,
        description: 'Graduated with honors',
      },
    ]
    render(<EducationInput value={educations} onChange={handleChange} />)
    
    const gpaInput = screen.getByDisplayValue('3.5')
    await userEvent.clear(gpaInput)
    await userEvent.type(gpaInput, '3.8')
    
    expect(handleChange).toHaveBeenCalledWith([
      expect.objectContaining({
        gpa: 3.8,
      }),
    ])
  })
})
