# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: jobs.spec.ts >> Job Discovery Flow >> should display job discovery page
- Location: e2e\jobs.spec.ts:8:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Job Discovery')
Expected: visible
Error: strict mode violation: locator('text=Job Discovery') resolved to 2 elements:
    1) <a href="/discover" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm hover:bg-slate-800 hover:text-white">…</a> aka getByRole('link', { name: 'Job Discovery' })
    2) <h1 class="text-4xl font-bold text-gray-900 mb-2">Job Discovery</h1> aka getByRole('heading', { name: 'Job Discovery' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Job Discovery')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - heading "J JobPilot" [level=1] [ref=e4]:
      - generic [ref=e6]: J
      - text: JobPilot
    - navigation [ref=e7]:
      - link "Analytics" [ref=e8] [cursor=pointer]:
        - /url: /analytics
        - img [ref=e9]
        - text: Analytics
      - link "Job Discovery" [ref=e14] [cursor=pointer]:
        - /url: /discover
        - img [ref=e15]
        - text: Job Discovery
      - link "Tailoring Studio" [ref=e18] [cursor=pointer]:
        - /url: /tailoring
        - img [ref=e19]
        - text: Tailoring Studio
      - link "Cover Letters" [ref=e23] [cursor=pointer]:
        - /url: /documents
        - img [ref=e24]
        - text: Cover Letters
      - link "App Tracking" [ref=e27] [cursor=pointer]:
        - /url: /applications
        - img [ref=e28]
        - text: App Tracking
      - link "Interview Prep" [ref=e31] [cursor=pointer]:
        - /url: /interview-prep
        - img [ref=e32]
        - text: Interview Prep
      - link "My Profile" [ref=e34] [cursor=pointer]:
        - /url: /profile
        - img [ref=e35]
        - text: My Profile
    - generic [ref=e39]:
      - button "Toggle Dark Mode" [ref=e40] [cursor=pointer]:
        - img [ref=e41]
      - generic [ref=e43]: JobPilot v1.0
  - main [ref=e44]:
    - generic [ref=e46]:
      - generic [ref=e47]:
        - heading "Job Discovery" [level=1] [ref=e48]
        - paragraph [ref=e49]: Find your next opportunity from multiple sources
      - generic [ref=e51]:
        - generic [ref=e52]:
          - img [ref=e53]
          - textbox "Search jobs (e.g., Software Engineer, Data Scientist)" [ref=e56]
        - generic [ref=e57]:
          - img [ref=e58]
          - textbox "Location (e.g., San Francisco, Remote)" [ref=e61]
        - button "Discover Jobs" [disabled] [ref=e62]:
          - img [ref=e63]
          - text: Discover Jobs
      - generic [ref=e66]:
        - generic [ref=e68]:
          - img [ref=e69]
          - heading "Filters" [level=3] [ref=e71]
        - generic [ref=e72]:
          - generic [ref=e73]:
            - generic [ref=e74]: Skills (comma-separated)
            - textbox "e.g., python, react, aws" [ref=e75]
          - generic [ref=e77] [cursor=pointer]:
            - checkbox "Remote Only" [ref=e78]
            - generic [ref=e79]: Remote Only
  - alert [ref=e82]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test'
  2   | 
  3   | test.describe('Job Discovery Flow', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     await page.goto('/jobs')
  6   |   })
  7   | 
  8   |   test('should display job discovery page', async ({ page }) => {
> 9   |     await expect(page.locator('text=Job Discovery')).toBeVisible()
      |                                                      ^ Error: expect(locator).toBeVisible() failed
  10  |     await expect(page.locator('text=Find your next opportunity')).toBeVisible()
  11  |   })
  12  | 
  13  |   test('should display search inputs', async ({ page }) => {
  14  |     await expect(page.locator('input[placeholder*="Search jobs"]')).toBeVisible()
  15  |     await expect(page.locator('input[placeholder*="Location"]')).toBeVisible()
  16  |     await expect(page.locator('button:has-text("Discover Jobs")')).toBeVisible()
  17  |   })
  18  | 
  19  |   test('should display filters section', async ({ page }) => {
  20  |     await expect(page.locator('text=Filters')).toBeVisible()
  21  |     await expect(page.locator('input[placeholder*="Skills"]')).toBeVisible()
  22  |     await expect(page.locator('text=Remote Only')).toBeVisible()
  23  |   })
  24  | 
  25  |   test('should search for jobs', async ({ page }) => {
  26  |     const searchInput = page.locator('input[placeholder*="Search jobs"]')
  27  |     await searchInput.fill('Software Engineer')
  28  |     
  29  |     const discoverButton = page.locator('button:has-text("Discover Jobs")')
  30  |     await discoverButton.click()
  31  |     
  32  |     // Should show loading state or results
  33  |     await expect(page.locator('text=Discovering...') || page.locator('text=Showing')).toBeVisible()
  34  |   })
  35  | 
  36  |   test('should filter jobs by remote', async ({ page }) => {
  37  |     const remoteCheckbox = page.locator('input[type="checkbox"]')
  38  |     await remoteCheckbox.check()
  39  |     
  40  |     await expect(remoteCheckbox).toBeChecked()
  41  |   })
  42  | 
  43  |   test('should filter jobs by skills', async ({ page }) => {
  44  |     const skillsInput = page.locator('input[placeholder*="Skills"]')
  45  |     await skillsInput.fill('python, react')
  46  |     
  47  |     await expect(skillsInput).toHaveValue('python, react')
  48  |   })
  49  | 
  50  |   test('should clear all filters', async ({ page }) => {
  51  |     const skillsInput = page.locator('input[placeholder*="Skills"]')
  52  |     await skillsInput.fill('python')
  53  |     
  54  |     const remoteCheckbox = page.locator('input[type="checkbox"]')
  55  |     await remoteCheckbox.check()
  56  |     
  57  |     const clearButton = page.locator('text=Clear All')
  58  |     await clearButton.click()
  59  |     
  60  |     await expect(skillsInput).toHaveValue('')
  61  |     await expect(remoteCheckbox).not.toBeChecked()
  62  |   })
  63  | 
  64  |   test('should display job cards when jobs are available', async ({ page }) => {
  65  |     // This test assumes jobs are already in the database
  66  |     await page.goto('/jobs')
  67  |     
  68  |     // Wait for jobs to load
  69  |     await page.waitForTimeout(2000)
  70  |     
  71  |     const jobCards = page.locator('.bg-white.rounded-xl.shadow-md')
  72  |     if (await jobCards.count() > 0) {
  73  |       await expect(jobCards.first()).toBeVisible()
  74  |     }
  75  |   })
  76  | 
  77  |   test('should display empty state when no jobs found', async ({ page }) => {
  78  |     // Search for something unlikely to exist
  79  |     const searchInput = page.locator('input[placeholder*="Search jobs"]')
  80  |     await searchInput.fill('xyz123nonexistentjob')
  81  |     
  82  |     const discoverButton = page.locator('button:has-text("Discover Jobs")')
  83  |     await discoverButton.click()
  84  |     
  85  |     await page.waitForTimeout(2000)
  86  |     
  87  |     await expect(page.locator('text=No jobs found')).toBeVisible()
  88  |   })
  89  | })
  90  | 
  91  | test.describe('Job Detail View', () => {
  92  |   test('should navigate to job detail page', async ({ page }) => {
  93  |     await page.goto('/jobs')
  94  |     
  95  |     // Wait for jobs to load
  96  |     await page.waitForTimeout(2000)
  97  |     
  98  |     const jobCards = page.locator('.bg-white.rounded-xl.shadow-md')
  99  |     if (await jobCards.count() > 0) {
  100 |       await jobCards.first().click()
  101 |       
  102 |       // Should navigate to job detail page
  103 |       await expect(page).toHaveURL(/\/jobs\/\d+/)
  104 |     }
  105 |   })
  106 | 
  107 |   test('should display job details', async ({ page }) => {
  108 |     // Navigate to a specific job ID (this assumes job with ID 1 exists)
  109 |     await page.goto('/jobs/1')
```