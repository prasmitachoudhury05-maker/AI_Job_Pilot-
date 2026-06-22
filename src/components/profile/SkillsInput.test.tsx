import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SkillsInput from './SkillsInput'

describe('SkillsInput', () => {
  it('renders input field and add button', () => {
    render(<SkillsInput value={[]} onChange={jest.fn()} />)
    
    expect(screen.getByPlaceholderText('Add a skill...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
  })

  it('displays existing skills', () => {
    const skills = ['JavaScript', 'Python', 'React']
    render(<SkillsInput value={skills} onChange={jest.fn()} />)
    
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('adds a new skill when Add button is clicked', async () => {
    const handleChange = jest.fn()
    render(<SkillsInput value={['JavaScript']} onChange={handleChange} />)
    
    const input = screen.getByPlaceholderText('Add a skill...')
    const addButton = screen.getByRole('button', { name: /add/i })
    
    await act(async () => { await userEvent.type(input, 'Python') })
    await act(async () => { await userEvent.click(addButton) })
    
    expect(handleChange).toHaveBeenCalledWith(['JavaScript', 'Python'])
  })

  it('adds a new skill when Enter key is pressed', async () => {
    const handleChange = jest.fn()
    render(<SkillsInput value={['JavaScript']} onChange={handleChange} />)
    
    const input = screen.getByPlaceholderText('Add a skill...')
    
    await act(async () => { await userEvent.type(input, 'Python{Enter}') })
    
    expect(handleChange).toHaveBeenCalledWith(['JavaScript', 'Python'])
  })

  it('does not add duplicate skills', async () => {
    const handleChange = jest.fn()
    render(<SkillsInput value={['JavaScript']} onChange={handleChange} />)
    
    const input = screen.getByPlaceholderText('Add a skill...')
    const addButton = screen.getByRole('button', { name: /add/i })
    
    await act(async () => { await userEvent.type(input, 'JavaScript') })
    await act(async () => { await userEvent.click(addButton) })
    
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('does not add empty skills', async () => {
    const handleChange = jest.fn()
    render(<SkillsInput value={[]} onChange={handleChange} />)
    
    const addButton = screen.getByRole('button', { name: /add/i })
    await act(async () => { await userEvent.click(addButton) })
    
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('removes a skill when X button is clicked', async () => {
    const handleChange = jest.fn()
    render(<SkillsInput value={['JavaScript', 'Python']} onChange={handleChange} />)
    
    const removeButtons = screen.getAllByRole('button')
    await act(async () => { await userEvent.click(removeButtons[0]) })
    
    expect(handleChange).toHaveBeenCalledWith(['Python'])
  })

  it('removes last skill when Backspace is pressed on empty input', async () => {
    const handleChange = jest.fn()
    render(<SkillsInput value={['JavaScript']} onChange={handleChange} />)
    
    const input = screen.getByPlaceholderText('Add a skill...')
    await act(async () => { await userEvent.clear(input) })
    await act(async () => { await userEvent.keyboard('{Backspace}') })
    
    expect(handleChange).toHaveBeenCalledWith([])
  })

  it('clears input after adding a skill', async () => {
    const handleChange = jest.fn()
    render(<SkillsInput value={[]} onChange={handleChange} />)
    
    const input = screen.getByPlaceholderText('Add a skill...')
    const addButton = screen.getByRole('button', { name: /add/i })
    
    await act(async () => { await userEvent.type(input, 'Python') })
    await act(async () => { await userEvent.click(addButton) })
    
    expect(input).toHaveValue('')
  })
})
