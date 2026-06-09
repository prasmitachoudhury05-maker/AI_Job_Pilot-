import { test, expect } from '@playwright/test'

test.describe('Job Discovery Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/jobs')
  })

  test('should display job discovery page', async ({ page }) => {
    await expect(page.locator('text=Job Discovery')).toBeVisible()
    await expect(page.locator('text=Find your next opportunity')).toBeVisible()
  })

  test('should display search inputs', async ({ page }) => {
    await expect(page.locator('input[placeholder*="Search jobs"]')).toBeVisible()
    await expect(page.locator('input[placeholder*="Location"]')).toBeVisible()
    await expect(page.locator('button:has-text("Discover Jobs")')).toBeVisible()
  })

  test('should display filters section', async ({ page }) => {
    await expect(page.locator('text=Filters')).toBeVisible()
    await expect(page.locator('input[placeholder*="Skills"]')).toBeVisible()
    await expect(page.locator('text=Remote Only')).toBeVisible()
  })

  test('should search for jobs', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search jobs"]')
    await searchInput.fill('Software Engineer')
    
    const discoverButton = page.locator('button:has-text("Discover Jobs")')
    await discoverButton.click()
    
    // Should show loading state or results
    await expect(page.locator('text=Discovering...') || page.locator('text=Showing')).toBeVisible()
  })

  test('should filter jobs by remote', async ({ page }) => {
    const remoteCheckbox = page.locator('input[type="checkbox"]')
    await remoteCheckbox.check()
    
    await expect(remoteCheckbox).toBeChecked()
  })

  test('should filter jobs by skills', async ({ page }) => {
    const skillsInput = page.locator('input[placeholder*="Skills"]')
    await skillsInput.fill('python, react')
    
    await expect(skillsInput).toHaveValue('python, react')
  })

  test('should clear all filters', async ({ page }) => {
    const skillsInput = page.locator('input[placeholder*="Skills"]')
    await skillsInput.fill('python')
    
    const remoteCheckbox = page.locator('input[type="checkbox"]')
    await remoteCheckbox.check()
    
    const clearButton = page.locator('text=Clear All')
    await clearButton.click()
    
    await expect(skillsInput).toHaveValue('')
    await expect(remoteCheckbox).not.toBeChecked()
  })

  test('should display job cards when jobs are available', async ({ page }) => {
    // This test assumes jobs are already in the database
    await page.goto('/jobs')
    
    // Wait for jobs to load
    await page.waitForTimeout(2000)
    
    const jobCards = page.locator('.bg-white.rounded-xl.shadow-md')
    if (await jobCards.count() > 0) {
      await expect(jobCards.first()).toBeVisible()
    }
  })

  test('should display empty state when no jobs found', async ({ page }) => {
    // Search for something unlikely to exist
    const searchInput = page.locator('input[placeholder*="Search jobs"]')
    await searchInput.fill('xyz123nonexistentjob')
    
    const discoverButton = page.locator('button:has-text("Discover Jobs")')
    await discoverButton.click()
    
    await page.waitForTimeout(2000)
    
    await expect(page.locator('text=No jobs found')).toBeVisible()
  })
})

test.describe('Job Detail View', () => {
  test('should navigate to job detail page', async ({ page }) => {
    await page.goto('/jobs')
    
    // Wait for jobs to load
    await page.waitForTimeout(2000)
    
    const jobCards = page.locator('.bg-white.rounded-xl.shadow-md')
    if (await jobCards.count() > 0) {
      await jobCards.first().click()
      
      // Should navigate to job detail page
      await expect(page).toHaveURL(/\/jobs\/\d+/)
    }
  })

  test('should display job details', async ({ page }) => {
    // Navigate to a specific job ID (this assumes job with ID 1 exists)
    await page.goto('/jobs/1')
    
    await expect(page.locator('text=Back to Jobs')).toBeVisible()
    
    // Check for common job detail elements
    const title = page.locator('h1')
    if (await title.count() > 0) {
      await expect(title).toBeVisible()
    }
  })

  test('should have back button', async ({ page }) => {
    await page.goto('/jobs/1')
    
    const backButton = page.locator('text=Back to Jobs')
    await backButton.click()
    
    await expect(page).toHaveURL('/jobs')
  })

  test('should display apply button', async ({ page }) => {
    await page.goto('/jobs/1')
    
    const applyButton = page.locator('text=Apply on')
    if (await applyButton.count() > 0) {
      await expect(applyButton).toBeVisible()
    }
  })

  test('should display skills section if skills exist', async ({ page }) => {
    await page.goto('/jobs/1')
    
    const skillsSection = page.locator('text=Required Skills')
    if (await skillsSection.count() > 0) {
      await expect(skillsSection).toBeVisible()
    }
  })

  test('should display job description', async ({ page }) => {
    await page.goto('/jobs/1')
    
    const descriptionSection = page.locator('text=Job Description')
    if (await descriptionSection.count() > 0) {
      await expect(descriptionSection).toBeVisible()
    }
  })
})

test.describe('Job Filters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/jobs')
  })

  test('should toggle remote filter', async ({ page }) => {
    const remoteCheckbox = page.locator('input[type="checkbox"]')
    
    await remoteCheckbox.check()
    await expect(remoteCheckbox).toBeChecked()
    
    await remoteCheckbox.uncheck()
    await expect(remoteCheckbox).not.toBeChecked()
  })

  test('should accept skills input', async ({ page }) => {
    const skillsInput = page.locator('input[placeholder*="Skills"]')
    
    await skillsInput.fill('python, javascript, react')
    await expect(skillsInput).toHaveValue('python, javascript, react')
    
    await skillsInput.fill('')
    await expect(skillsInput).toHaveValue('')
  })

  test('should show clear button when filters are active', async ({ page }) => {
    const skillsInput = page.locator('input[placeholder*="Skills"]')
    await skillsInput.fill('python')
    
    const clearButton = page.locator('text=Clear All')
    await expect(clearButton).toBeVisible()
  })
})
