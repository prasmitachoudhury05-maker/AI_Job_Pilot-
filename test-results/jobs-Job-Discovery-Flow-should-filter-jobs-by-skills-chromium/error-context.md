# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: jobs.spec.ts >> Job Discovery Flow >> should filter jobs by skills
- Location: e2e\jobs.spec.ts:43:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[placeholder*="Skills"]')

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
      - generic [ref=e80]:
        - generic [ref=e81]: Showing 4 jobs
        - generic [ref=e82]:
          - generic [ref=e83]:
            - generic [ref=e84]:
              - heading "Software Engineer Engineer" [level=3] [ref=e85]
              - paragraph [ref=e86]: Tech Innovations Inc.
            - generic [ref=e87]:
              - generic [ref=e88]: Remote
              - generic [ref=e89]: indeed
          - generic [ref=e90]:
            - generic [ref=e91]:
              - img [ref=e92]
              - generic [ref=e95]: Remote
            - generic [ref=e96]:
              - img [ref=e97]
              - generic [ref=e100]: Recently
          - generic [ref=e101]:
            - generic [ref=e102]:
              - img [ref=e103]
              - generic [ref=e105]: Skills
            - generic [ref=e106]:
              - generic [ref=e107]: JavaScript
              - generic [ref=e108]: Next.js
              - generic [ref=e109]: React
          - generic [ref=e110]:
            - paragraph [ref=e111]: We are looking for a Software Engineer expert in remote....
            - link "View Job" [ref=e112] [cursor=pointer]:
              - /url: https://example.com/jobs/1780991384240-1
              - text: View Job
              - img [ref=e113]
        - generic [ref=e117]:
          - generic [ref=e118]:
            - generic [ref=e119]:
              - heading "Senior Software Engineer Developer" [level=3] [ref=e120]
              - paragraph [ref=e121]: Global Solutions
            - generic [ref=e123]: linkedin
          - generic [ref=e124]:
            - generic [ref=e125]:
              - img [ref=e126]
              - generic [ref=e129]: New York, NY
            - generic [ref=e130]:
              - img [ref=e131]
              - generic [ref=e134]: Recently
          - generic [ref=e135]:
            - generic [ref=e136]:
              - img [ref=e137]
              - generic [ref=e139]: Skills
            - generic [ref=e140]:
              - generic [ref=e141]: Python
              - generic [ref=e142]: TypeScript
              - generic [ref=e143]: SQL
          - generic [ref=e144]:
            - paragraph [ref=e145]: Join our global team as a senior Software Engineer developer....
            - link "View Job" [ref=e146] [cursor=pointer]:
              - /url: https://example.com/jobs/1780991384240-2
              - text: View Job
              - img [ref=e147]
        - generic [ref=e151]:
          - generic [ref=e152]:
            - generic [ref=e153]:
              - heading "React Developer Engineer" [level=3] [ref=e154]
              - paragraph [ref=e155]: Tech Innovations Inc.
            - generic [ref=e156]:
              - generic [ref=e157]: Remote
              - generic [ref=e158]: indeed
          - generic [ref=e159]:
            - generic [ref=e160]:
              - img [ref=e161]
              - generic [ref=e164]: Remote
            - generic [ref=e165]:
              - img [ref=e166]
              - generic [ref=e169]: Recently
          - generic [ref=e170]:
            - generic [ref=e171]:
              - img [ref=e172]
              - generic [ref=e174]: Skills
            - generic [ref=e175]:
              - generic [ref=e176]: JavaScript
              - generic [ref=e177]: Next.js
              - generic [ref=e178]: React
          - generic [ref=e179]:
            - paragraph [ref=e180]: We are looking for a React Developer expert in remote....
            - link "View Job" [ref=e181] [cursor=pointer]:
              - /url: https://example.com/jobs/1780991499344-1
              - text: View Job
              - img [ref=e182]
        - generic [ref=e186]:
          - generic [ref=e187]:
            - generic [ref=e188]:
              - heading "Senior React Developer Developer" [level=3] [ref=e189]
              - paragraph [ref=e190]: Global Solutions
            - generic [ref=e192]: linkedin
          - generic [ref=e193]:
            - generic [ref=e194]:
              - img [ref=e195]
              - generic [ref=e198]: New York, NY
            - generic [ref=e199]:
              - img [ref=e200]
              - generic [ref=e203]: Recently
          - generic [ref=e204]:
            - generic [ref=e205]:
              - img [ref=e206]
              - generic [ref=e208]: Skills
            - generic [ref=e209]:
              - generic [ref=e210]: Python
              - generic [ref=e211]: TypeScript
              - generic [ref=e212]: SQL
          - generic [ref=e213]:
            - paragraph [ref=e214]: Join our global team as a senior React Developer developer....
            - link "View Job" [ref=e215] [cursor=pointer]:
              - /url: https://example.com/jobs/1780991499344-2
              - text: View Job
              - img [ref=e216]
        - paragraph [ref=e221]: No more jobs to load
  - alert [ref=e222]
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
> 45  |     await skillsInput.fill('python, react')
      |                       ^ Error: locator.fill: Test timeout of 30000ms exceeded.
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
```