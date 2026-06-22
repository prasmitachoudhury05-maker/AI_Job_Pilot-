# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: jobs.spec.ts >> Job Discovery Flow >> should display empty state when no jobs found
- Location: e2e\jobs.spec.ts:77:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=No jobs found')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=No jobs found')

```

```yaml
- heading "J JobPilot" [level=1]
- navigation:
  - link "Analytics":
    - /url: /analytics
    - img
    - text: Analytics
  - link "Job Discovery":
    - /url: /discover
    - img
    - text: Job Discovery
  - link "Tailoring Studio":
    - /url: /tailoring
    - img
    - text: Tailoring Studio
  - link "Cover Letters":
    - /url: /documents
    - img
    - text: Cover Letters
  - link "App Tracking":
    - /url: /applications
    - img
    - text: App Tracking
  - link "Interview Prep":
    - /url: /interview-prep
    - img
    - text: Interview Prep
  - link "My Profile":
    - /url: /profile
    - img
    - text: My Profile
- button "Toggle Dark Mode":
  - img
- text: JobPilot v1.0
- main:
  - heading "Job Discovery" [level=1]
  - paragraph: Find your next opportunity from multiple sources
  - img
  - textbox "Search jobs (e.g., Software Engineer, Data Scientist)": xyz123nonexistentjob
  - img
  - textbox "Location (e.g., San Francisco, Remote)"
  - button "Discover Jobs":
    - img
    - text: Discover Jobs
  - img
  - heading "Filters" [level=3]
  - text: Skills (comma-separated)
  - textbox "e.g., python, react, aws"
  - checkbox "Remote Only"
  - text: Remote Only Showing 6 jobs
  - heading "Software Engineer Engineer" [level=3]
  - paragraph: Tech Innovations Inc.
  - text: Remote indeed
  - img
  - text: Remote
  - img
  - text: Recently
  - img
  - text: Skills JavaScript Next.js React
  - paragraph: We are looking for a Software Engineer expert in remote....
  - link "View Job":
    - /url: https://example.com/jobs/1780991384240-1
    - text: View Job
    - img
  - heading "Senior Software Engineer Developer" [level=3]
  - paragraph: Global Solutions
  - text: linkedin
  - img
  - text: New York, NY
  - img
  - text: Recently
  - img
  - text: Skills Python TypeScript SQL
  - paragraph: Join our global team as a senior Software Engineer developer....
  - link "View Job":
    - /url: https://example.com/jobs/1780991384240-2
    - text: View Job
    - img
  - heading "React Developer Engineer" [level=3]
  - paragraph: Tech Innovations Inc.
  - text: Remote indeed
  - img
  - text: Remote
  - img
  - text: Recently
  - img
  - text: Skills JavaScript Next.js React
  - paragraph: We are looking for a React Developer expert in remote....
  - link "View Job":
    - /url: https://example.com/jobs/1780991499344-1
    - text: View Job
    - img
  - heading "Senior React Developer Developer" [level=3]
  - paragraph: Global Solutions
  - text: linkedin
  - img
  - text: New York, NY
  - img
  - text: Recently
  - img
  - text: Skills Python TypeScript SQL
  - paragraph: Join our global team as a senior React Developer developer....
  - link "View Job":
    - /url: https://example.com/jobs/1780991499344-2
    - text: View Job
    - img
  - heading "xyz123nonexistentjob Engineer" [level=3]
  - paragraph: Tech Innovations Inc.
  - text: Remote indeed
  - img
  - text: Remote
  - img
  - text: Recently
  - img
  - text: Skills JavaScript Next.js React
  - paragraph: We are looking for a xyz123nonexistentjob expert in remote....
  - link "View Job":
    - /url: https://example.com/jobs/1781368698309-1
    - text: View Job
    - img
  - heading "Senior xyz123nonexistentjob Developer" [level=3]
  - paragraph: Global Solutions
  - text: linkedin
  - img
  - text: New York, NY
  - img
  - text: Recently
  - img
  - text: Skills Python TypeScript SQL
  - paragraph: Join our global team as a senior xyz123nonexistentjob developer....
  - link "View Job":
    - /url: https://example.com/jobs/1781368698309-2
    - text: View Job
    - img
  - paragraph: No more jobs to load
- alert
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
  9   |     await expect(page.locator('text=Job Discovery')).toBeVisible()
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
> 87  |     await expect(page.locator('text=No jobs found')).toBeVisible()
      |                                                      ^ Error: expect(locator).toBeVisible() failed
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
  110 |     
  111 |     await expect(page.locator('text=Back to Jobs')).toBeVisible()
  112 |     
  113 |     // Check for common job detail elements
  114 |     const title = page.locator('h1')
  115 |     if (await title.count() > 0) {
  116 |       await expect(title).toBeVisible()
  117 |     }
  118 |   })
  119 | 
  120 |   test('should have back button', async ({ page }) => {
  121 |     await page.goto('/jobs/1')
  122 |     
  123 |     const backButton = page.locator('text=Back to Jobs')
  124 |     await backButton.click()
  125 |     
  126 |     await expect(page).toHaveURL('/jobs')
  127 |   })
  128 | 
  129 |   test('should display apply button', async ({ page }) => {
  130 |     await page.goto('/jobs/1')
  131 |     
  132 |     const applyButton = page.locator('text=Apply on')
  133 |     if (await applyButton.count() > 0) {
  134 |       await expect(applyButton).toBeVisible()
  135 |     }
  136 |   })
  137 | 
  138 |   test('should display skills section if skills exist', async ({ page }) => {
  139 |     await page.goto('/jobs/1')
  140 |     
  141 |     const skillsSection = page.locator('text=Required Skills')
  142 |     if (await skillsSection.count() > 0) {
  143 |       await expect(skillsSection).toBeVisible()
  144 |     }
  145 |   })
  146 | 
  147 |   test('should display job description', async ({ page }) => {
  148 |     await page.goto('/jobs/1')
  149 |     
  150 |     const descriptionSection = page.locator('text=Job Description')
  151 |     if (await descriptionSection.count() > 0) {
  152 |       await expect(descriptionSection).toBeVisible()
  153 |     }
  154 |   })
  155 | })
  156 | 
  157 | test.describe('Job Filters', () => {
  158 |   test.beforeEach(async ({ page }) => {
  159 |     await page.goto('/jobs')
  160 |   })
  161 | 
  162 |   test('should toggle remote filter', async ({ page }) => {
  163 |     const remoteCheckbox = page.locator('input[type="checkbox"]')
  164 |     
  165 |     await remoteCheckbox.check()
  166 |     await expect(remoteCheckbox).toBeChecked()
  167 |     
  168 |     await remoteCheckbox.uncheck()
  169 |     await expect(remoteCheckbox).not.toBeChecked()
  170 |   })
  171 | 
  172 |   test('should accept skills input', async ({ page }) => {
  173 |     const skillsInput = page.locator('input[placeholder*="Skills"]')
  174 |     
  175 |     await skillsInput.fill('python, javascript, react')
  176 |     await expect(skillsInput).toHaveValue('python, javascript, react')
  177 |     
  178 |     await skillsInput.fill('')
  179 |     await expect(skillsInput).toHaveValue('')
  180 |   })
  181 | 
  182 |   test('should show clear button when filters are active', async ({ page }) => {
  183 |     const skillsInput = page.locator('input[placeholder*="Skills"]')
  184 |     await skillsInput.fill('python')
  185 |     
  186 |     const clearButton = page.locator('text=Clear All')
  187 |     await expect(clearButton).toBeVisible()
```