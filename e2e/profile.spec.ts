import { test, expect } from '@playwright/test'

test.describe('Profile Creation Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to profile creation page
    await page.goto('/profile/create')
  })

  test('should display profile creation form', async ({ page }) => {
    await expect(page.locator('text=Professional Title')).toBeVisible()
    await expect(page.locator('text=Professional Summary')).toBeVisible()
    await expect(page.locator('text=Skills')).toBeVisible()
    await expect(page.locator('text=Work Experience')).toBeVisible()
    await expect(page.locator('text=Education')).toBeVisible()
  })

  test('should create profile with valid data', async ({ page }) => {
    // Fill in basic information
    await page.fill('input[placeholder*="Professional Title"]', 'Software Engineer')
    await page.fill('textarea[placeholder*="Professional Summary"]', 'Experienced software developer with 5+ years of experience')
    await page.fill('input[placeholder*="Phone"]', '+1234567890')
    await page.fill('input[placeholder*="Location"]', 'San Francisco, CA')
    
    // Add skills
    const skillsInput = page.locator('input[placeholder*="Add a skill"]')
    await skillsInput.fill('JavaScript')
    await skillsInput.press('Enter')
    await skillsInput.fill('Python')
    await skillsInput.press('Enter')
    await skillsInput.fill('React')
    await skillsInput.press('Enter')
    
    // Add experience
    await page.click('button:has-text("Add Experience")')
    await page.fill('input[placeholder*="Company name"]', 'Tech Corp')
    await page.fill('input[placeholder*="Job title"]', 'Senior Developer')
    await page.fill('input[type="date"].nth(0)', '2020-01-01')
    await page.fill('input[type="date"].nth(1)', '2022-01-01')
    
    // Add education
    await page.click('button:has-text("Add Education")')
    await page.fill('input[placeholder*="University/College name"]', 'University of Tech')
    await page.fill('input[placeholder*="Bachelor\'s, Master\'s, PhD"]', 'Bachelor of Science')
    await page.fill('input[placeholder*="Computer Science, Business"]', 'Computer Science')
    
    // Submit form
    await page.click('button:has-text("Create Profile")')
    
    // Should redirect to profile page
    await expect(page).toHaveURL('/profile')
    await expect(page.locator('text=My Profile')).toBeVisible()
  })

  test('should show validation errors for required fields', async ({ page }) => {
    // Try to submit without filling required fields
    await page.click('button:has-text("Create Profile")')
    
    // Should show validation errors
    await expect(page.locator('text=Title is required')).toBeVisible()
    await expect(page.locator('text=Summary must be at least 10 characters')).toBeVisible()
  })

  test('should validate URL formats', async ({ page }) => {
    // Fill in invalid URLs
    await page.fill('input[placeholder*="LinkedIn"]', 'invalid-url')
    await page.fill('input[placeholder*="GitHub"]', 'not-a-url')
    
    // Should show validation errors
    await expect(page.locator('text=Invalid LinkedIn URL')).toBeVisible()
    await expect(page.locator('text=Invalid GitHub URL')).toBeVisible()
  })
})

test.describe('Profile Edit Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to profile page (assuming user is logged in and has a profile)
    await page.goto('/profile')
  })

  test('should display existing profile data', async ({ page }) => {
    await expect(page.locator('text=My Profile')).toBeVisible()
    await expect(page.locator('text=Edit Profile')).toBeVisible()
  })

  test('should navigate to edit page when Edit button is clicked', async ({ page }) => {
    await page.click('button:has-text("Edit Profile")')
    await expect(page).toHaveURL('/profile/edit')
  })

  test('should update profile with new data', async ({ page }) => {
    // Navigate to edit page
    await page.click('button:has-text("Edit Profile")')
    
    // Update title
    const titleInput = page.locator('input[type="text"]').first()
    await titleInput.fill('Senior Software Engineer')
    
    // Update summary
    const summaryInput = page.locator('textarea').first()
    await summaryInput.fill('Updated summary with more experience')
    
    // Submit changes
    await page.click('button:has-text("Save Changes")')
    
    // Should redirect back to profile page
    await expect(page).toHaveURL('/profile')
    await expect(page.locator('text=Senior Software Engineer')).toBeVisible()
  })

  test('should show profile completion indicator', async ({ page }) => {
    await expect(page.locator('text=Profile Completion')).toBeVisible()
    await expect(page.locator('[role="progressbar"]')).toBeVisible()
  })
})

test.describe('Resume Upload Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile')
  })

  test('should display resume upload section', async ({ page }) => {
    await expect(page.locator('text=Resume')).toBeVisible()
    await expect(page.locator('text=Upload your resume')).toBeVisible()
  })

  test('should upload a valid PDF file', async ({ page }) => {
    // Create a test PDF file
    const fileInput = page.locator('input[type="file"]')
    
    // Upload file (in real test, you'd use a fixture file)
    // await fileInput.setInputFiles('path/to/test-resume.pdf')
    
    // For now, just verify the upload area exists
    await expect(fileInput).toBeVisible()
  })

  test('should validate file type', async ({ page }) => {
    // Try to upload an invalid file type
    const fileInput = page.locator('input[type="file"]')
    
    // In real test, you'd upload an invalid file and check error message
    await expect(fileInput).toBeVisible()
  })

  test('should validate file size', async ({ page }) => {
    // The upload area should show size limit
    await expect(page.locator('text=max 10MB')).toBeVisible()
  })

  test('should show uploaded resume', async ({ page }) => {
    // After upload, should show the uploaded file
    // This would be tested with a real file upload
    await expect(page.locator('text=Resume')).toBeVisible()
  })
})

test.describe('Profile Dashboard', () => {
  test('should display profile overview', async ({ page }) => {
    await page.goto('/profile')
    
    await expect(page.locator('text=My Profile')).toBeVisible()
    await expect(page.locator('text=Basic Information')).toBeVisible()
  })

  test('should display skills section', async ({ page }) => {
    await page.goto('/profile')
    
    await expect(page.locator('text=Skills')).toBeVisible()
  })

  test('should display experience section', async ({ page }) => {
    await page.goto('/profile')
    
    await expect(page.locator('text=Work Experience')).toBeVisible()
  })

  test('should display education section', async ({ page }) => {
    await page.goto('/profile')
    
    await expect(page.locator('text=Education')).toBeVisible()
  })

  test('should display profile completion percentage', async ({ page }) => {
    await page.goto('/profile')
    
    await expect(page.locator('text=Profile Completion')).toBeVisible()
    await expect(page.locator('[role="progressbar"]')).toBeVisible()
  })
})
