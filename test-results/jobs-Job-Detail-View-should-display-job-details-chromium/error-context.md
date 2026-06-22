# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: jobs.spec.ts >> Job Detail View >> should display job details
- Location: e2e\jobs.spec.ts:107:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('h1')
Expected: visible
Error: strict mode violation: locator('h1') resolved to 2 elements:
    1) <h1 class="text-2xl font-bold text-white tracking-tight flex items-center gap-2">…</h1> aka getByRole('heading', { name: 'J JobPilot' })
    2) <h1 class="text-3xl font-bold text-gray-900 mb-2">Software Engineer Engineer</h1> aka getByRole('heading', { name: 'Software Engineer Engineer' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('h1')

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
      - button "Back to Jobs" [ref=e47] [cursor=pointer]:
        - img [ref=e48]
        - text: Back to Jobs
      - generic [ref=e50]:
        - generic [ref=e51]:
          - generic [ref=e52]:
            - heading "Software Engineer Engineer" [level=1] [ref=e53]
            - paragraph [ref=e54]: Tech Innovations Inc.
          - button [ref=e55] [cursor=pointer]:
            - img [ref=e56]
        - generic [ref=e58]:
          - generic [ref=e59]:
            - img [ref=e60]
            - generic [ref=e63]: Remote
          - generic [ref=e64]:
            - img [ref=e65]
            - generic [ref=e68]: Recently
        - generic [ref=e69]:
          - generic [ref=e70]: Remote
          - generic [ref=e71]: indeed
        - link "Apply on Indeed" [ref=e72] [cursor=pointer]:
          - /url: https://example.com/jobs/1780991384240-1
          - text: Apply on Indeed
          - img [ref=e73]
      - generic [ref=e77]:
        - generic [ref=e78]:
          - img [ref=e79]
          - heading "Required Skills" [level=2] [ref=e81]
        - generic [ref=e82]:
          - generic [ref=e83]: JavaScript
          - generic [ref=e84]: Next.js
          - generic [ref=e85]: React
      - generic [ref=e86]:
        - heading "Job Description" [level=2] [ref=e87]
        - generic [ref=e88]: We are looking for a Software Engineer expert in remote.
      - generic [ref=e89]:
        - paragraph [ref=e90]: "Source: Indeed"
        - paragraph [ref=e91]: "Posted: Recently"
  - alert [ref=e92]
```

# Test source

```ts
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
  110 |     
  111 |     await expect(page.locator('text=Back to Jobs')).toBeVisible()
  112 |     
  113 |     // Check for common job detail elements
  114 |     const title = page.locator('h1')
  115 |     if (await title.count() > 0) {
> 116 |       await expect(title).toBeVisible()
      |                           ^ Error: expect(locator).toBeVisible() failed
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
  188 |   })
  189 | })
  190 | 
```