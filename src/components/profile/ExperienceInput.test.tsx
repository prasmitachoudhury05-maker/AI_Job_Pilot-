import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ExperienceInput from './ExperienceInput'

describe('ExperienceInput', () => {
  it('renders add experience button when empty', () => {
    render(<ExperienceInput value={[]} onChange={jest.fn()} />)
    
    expect(screen.getByRole('button', { name: /add experience/i })).toBeInTheDocument()
  })

  it('renders experience items', () => {
    const experiences = [
      {
        company: 'Tech Corp',
        position: 'Software Engineer',
        start_date: '2020-01-01',
        end_date: '2022-01-01',
        description: 'Built great software',
        location: 'San Francisco',
      },
    ]
    render(<ExperienceInput value={experiences} onChange={jest.fn()} />)
    
    expect(screen.getByText('Experience 1')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Tech Corp')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Software Engineer')).toBeInTheDocument()
  })

  it('adds new experience when add button is clicked', () => {
    const handleChange = jest.fn()
    render(<ExperienceInput value={[]} onChange={handleChange} />)
    
    const addButton = screen.getByRole('button', { name: /add experience/i })
    fireEvent.click(addButton)
    
    expect(handleChange).toHaveBeenCalledWith([
      expect.objectContaining({
        company: '',
        position: '',
        start_date: '',
        end_date: '',
        description: '',
        location: '',
      }),
    ])
  })

  it('removes experience when delete button is clicked', () => {
    const handleChange = jest.fn()
    const experiences = [
      {
        company: 'Tech Corp',
        position: 'Software Engineer',
        start_date: '2020-01-01',
        end_date: '2022-01-01',
        description: 'Built great software',
        location: 'San Francisco',
      },
    ]
    render(<ExperienceInput value={experiences} onChange={handleChange} />)
    
    const deleteButton = screen.getByRole('button', { name: /delete experience 1/i })
    fireEvent.click(deleteButton)
    
    expect(handleChange).toHaveBeenCalledWith([])
  })

  it('updates experience field when input changes', () => {
    const handleChange = jest.fn()
    const experiences = [
      {
        company: 'Tech Corp',
        position: 'Software Engineer',
        start_date: '2020-01-01',
        end_date: '2022-01-01',
        description: 'Built great software',
        location: 'San Francisco',
      },
    ]
    render(<ExperienceInput value={experiences} onChange={handleChange} />)
    
    const companyInput = screen.getByDisplayValue('Tech Corp')
    fireEvent.change(companyInput, { target: { value: 'New Corp' } })
    
    expect(handleChange).toHaveBeenCalledWith([
      expect.objectContaining({
        company: 'New Corp',
      }),
    ])
  })

  it('renders multiple experience items', () => {
    const experiences = [
      {
        company: 'Tech Corp',
        position: 'Software Engineer',
        start_date: '2020-01-01',
        end_date: '2022-01-01',
        description: 'Built great software',
        location: 'San Francisco',
      },
      {
        company: 'Startup Inc',
        position: 'Senior Developer',
        start_date: '2018-01-01',
        end_date: '2020-01-01',
        description: 'Led development team',
        location: 'New York',
      },
    ]
    render(<ExperienceInput value={experiences} onChange={jest.fn()} />)
    
    expect(screen.getByText('Experience 1')).toBeInTheDocument()
    expect(screen.getByText('Experience 2')).toBeInTheDocument()
  })

  it('has correct labels for all fields', () => {
    const experiences = [
      {
        company: 'Tech Corp',
        position: 'Software Engineer',
        start_date: '2020-01-01',
        end_date: '2022-01-01',
        description: 'Built great software',
        location: 'San Francisco',
      },
    ]
    render(<ExperienceInput value={experiences} onChange={jest.fn()} />)
    
    expect(screen.getByLabelText('Company')).toBeInTheDocument()
    expect(screen.getByLabelText('Position')).toBeInTheDocument()
    expect(screen.getByLabelText('Start Date')).toBeInTheDocument()
    expect(screen.getByLabelText('End Date')).toBeInTheDocument()
    expect(screen.getByLabelText('Location')).toBeInTheDocument()
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
  })
})
