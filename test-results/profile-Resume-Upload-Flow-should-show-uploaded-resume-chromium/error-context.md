# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: profile.spec.ts >> Resume Upload Flow >> should show uploaded resume
- Location: e2e\profile.spec.ts:151:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Resume')
Expected: visible
Error: strict mode violation: locator('text=Resume') resolved to 4 elements:
    1) <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">…</h2> aka getByRole('heading', { name: 'Resume', exact: true })
    2) <p class="font-medium text-gray-900">Upload your resume</p> aka getByText('Upload your resume')
    3) <h3 class="text-sm font-medium text-gray-700 mb-2">Uploaded Resumes</h3> aka getByRole('heading', { name: 'Uploaded Resumes' })
    4) <span class="text-sm text-gray-700 truncate">john_doe_resume.pdf</span> aka getByText('john_doe_resume.pdf')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Resume')

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
        - generic [ref=e48]:
          - heading "My Profile" [level=1] [ref=e49]
          - paragraph [ref=e50]: Manage your professional profile
        - button "Edit Profile" [ref=e51] [cursor=pointer]:
          - img [ref=e52]
          - text: Edit Profile
      - generic [ref=e55]:
        - generic [ref=e56]:
          - generic [ref=e57]:
            - heading "Basic Information" [level=2] [ref=e58]
            - generic [ref=e60]:
              - heading "Senior Software Engineer" [level=3] [ref=e61]
              - paragraph [ref=e62]: Updated summary with more experience
          - generic [ref=e65]:
            - heading "Skills" [level=2] [ref=e66]
            - generic [ref=e67]:
              - generic [ref=e68]: React
              - generic [ref=e69]: TypeScript
              - generic [ref=e70]: Node.js
          - generic [ref=e71]:
            - heading "Work Experience" [level=2] [ref=e72]:
              - img [ref=e73]
              - text: Work Experience
            - paragraph [ref=e76]: No experience added yet
          - generic [ref=e77]:
            - heading "Education" [level=2] [ref=e78]:
              - img [ref=e79]
              - text: Education
            - paragraph [ref=e82]: No education added yet
        - generic [ref=e83]:
          - generic [ref=e84]:
            - generic [ref=e85]:
              - heading "Profile Completion" [level=3] [ref=e86]
              - generic [ref=e87]: 0%
            - progressbar [ref=e88]
            - generic [ref=e90]:
              - img [ref=e91]
              - generic [ref=e93]: Needs Work
            - paragraph [ref=e94]: Complete your profile to increase visibility to recruiters.
          - generic [ref=e95]:
            - heading "Resume" [level=2] [ref=e96]:
              - img [ref=e97]
              - text: Resume
            - generic [ref=e102] [cursor=pointer]:
              - img [ref=e104]
              - generic [ref=e107]:
                - paragraph [ref=e108]: Upload your resume
                - paragraph [ref=e109]: PDF or DOCX, max 10MB
            - generic [ref=e110]:
              - heading "Uploaded Resumes" [level=3] [ref=e111]
              - generic [ref=e113]:
                - generic [ref=e114]: john_doe_resume.pdf
                - generic [ref=e115]: Active
  - alert [ref=e116]
```

# Test source

```ts
  54  |   test('should show validation errors for required fields', async ({ page }) => {
  55  |     // Try to submit without filling required fields
  56  |     await page.click('button:has-text("Create Profile")')
  57  |     
  58  |     // Should show validation errors
  59  |     await expect(page.locator('text=Title is required')).toBeVisible()
  60  |     await expect(page.locator('text=Summary must be at least 10 characters')).toBeVisible()
  61  |   })
  62  | 
  63  |   test('should validate URL formats', async ({ page }) => {
  64  |     // Fill in invalid URLs
  65  |     await page.fill('input[placeholder*="LinkedIn"]', 'invalid-url')
  66  |     await page.fill('input[placeholder*="GitHub"]', 'not-a-url')
  67  |     
  68  |     // Should show validation errors
  69  |     await expect(page.locator('text=Invalid LinkedIn URL')).toBeVisible()
  70  |     await expect(page.locator('text=Invalid GitHub URL')).toBeVisible()
  71  |   })
  72  | })
  73  | 
  74  | test.describe('Profile Edit Flow', () => {
  75  |   test.beforeEach(async ({ page }) => {
  76  |     // Navigate to profile page (assuming user is logged in and has a profile)
  77  |     await page.goto('/profile')
  78  |   })
  79  | 
  80  |   test('should display existing profile data', async ({ page }) => {
  81  |     await expect(page.locator('text=My Profile')).toBeVisible()
  82  |     await expect(page.locator('text=Edit Profile')).toBeVisible()
  83  |   })
  84  | 
  85  |   test('should navigate to edit page when Edit button is clicked', async ({ page }) => {
  86  |     await page.click('button:has-text("Edit Profile")')
  87  |     await expect(page).toHaveURL('/profile/edit')
  88  |   })
  89  | 
  90  |   test('should update profile with new data', async ({ page }) => {
  91  |     // Navigate to edit page
  92  |     await page.click('button:has-text("Edit Profile")')
  93  |     
  94  |     // Update title
  95  |     const titleInput = page.locator('input[type="text"]').first()
  96  |     await titleInput.fill('Senior Software Engineer')
  97  |     
  98  |     // Update summary
  99  |     const summaryInput = page.locator('textarea').first()
  100 |     await summaryInput.fill('Updated summary with more experience')
  101 |     
  102 |     // Submit changes
  103 |     await page.click('button:has-text("Save Changes")')
  104 |     
  105 |     // Should redirect back to profile page
  106 |     await expect(page).toHaveURL('/profile')
  107 |     await expect(page.locator('text=Senior Software Engineer')).toBeVisible()
  108 |   })
  109 | 
  110 |   test('should show profile completion indicator', async ({ page }) => {
  111 |     await expect(page.locator('text=Profile Completion')).toBeVisible()
  112 |     await expect(page.locator('[role="progressbar"]')).toBeVisible()
  113 |   })
  114 | })
  115 | 
  116 | test.describe('Resume Upload Flow', () => {
  117 |   test.beforeEach(async ({ page }) => {
  118 |     // Navigate to profile page
  119 |     await page.goto('/profile')
  120 |   })
  121 | 
  122 |   test('should display resume upload section', async ({ page }) => {
  123 |     await expect(page.locator('text=Resume')).toBeVisible()
  124 |     await expect(page.locator('text=Upload your resume')).toBeVisible()
  125 |   })
  126 | 
  127 |   test('should upload a valid PDF file', async ({ page }) => {
  128 |     // Create a test PDF file
  129 |     const fileInput = page.locator('input[type="file"]')
  130 |     
  131 |     // Upload file (in real test, you'd use a fixture file)
  132 |     // await fileInput.setInputFiles('path/to/test-resume.pdf')
  133 |     
  134 |     // For now, just verify the upload area exists
  135 |     await expect(fileInput).toBeVisible()
  136 |   })
  137 | 
  138 |   test('should validate file type', async ({ page }) => {
  139 |     // Try to upload an invalid file type
  140 |     const fileInput = page.locator('input[type="file"]')
  141 |     
  142 |     // In real test, you'd upload an invalid file and check error message
  143 |     await expect(fileInput).toBeVisible()
  144 |   })
  145 | 
  146 |   test('should validate file size', async ({ page }) => {
  147 |     // The upload area should show size limit
  148 |     await expect(page.locator('text=max 10MB')).toBeVisible()
  149 |   })
  150 | 
  151 |   test('should show uploaded resume', async ({ page }) => {
  152 |     // After upload, should show the uploaded file
  153 |     // This would be tested with a real file upload
> 154 |     await expect(page.locator('text=Resume')).toBeVisible()
      |                                               ^ Error: expect(locator).toBeVisible() failed
  155 |   })
  156 | })
  157 | 
  158 | test.describe('Profile Dashboard', () => {
  159 |   test('should display profile overview', async ({ page }) => {
  160 |     await page.goto('/profile')
  161 |     
  162 |     await expect(page.locator('text=My Profile')).toBeVisible()
  163 |     await expect(page.locator('text=Basic Information')).toBeVisible()
  164 |   })
  165 | 
  166 |   test('should display skills section', async ({ page }) => {
  167 |     await page.goto('/profile')
  168 |     
  169 |     await expect(page.locator('text=Skills')).toBeVisible()
  170 |   })
  171 | 
  172 |   test('should display experience section', async ({ page }) => {
  173 |     await page.goto('/profile')
  174 |     
  175 |     await expect(page.locator('text=Work Experience')).toBeVisible()
  176 |   })
  177 | 
  178 |   test('should display education section', async ({ page }) => {
  179 |     await page.goto('/profile')
  180 |     
  181 |     await expect(page.locator('text=Education')).toBeVisible()
  182 |   })
  183 | 
  184 |   test('should display profile completion percentage', async ({ page }) => {
  185 |     await page.goto('/profile')
  186 |     
  187 |     await expect(page.locator('text=Profile Completion')).toBeVisible()
  188 |     await expect(page.locator('[role="progressbar"]')).toBeVisible()
  189 |   })
  190 | })
  191 | 
```