# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: profile.spec.ts >> Resume Upload Flow >> should validate file type
- Location: e2e\profile.spec.ts:138:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('input[type="file"]')
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('input[type="file"]')
    10 × locator resolved to <input type="file" class="hidden" id="resume-upload" accept=".pdf,.doc,.docx"/>
       - unexpected value "hidden"

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
  - heading "My Profile" [level=1]
  - paragraph: Manage your professional profile
  - button "Edit Profile":
    - img
    - text: Edit Profile
  - heading "Basic Information" [level=2]
  - heading "Senior Software Engineer" [level=3]
  - paragraph: Updated summary with more experience
  - heading "Skills" [level=2]
  - text: React TypeScript Node.js
  - heading "Work Experience" [level=2]:
    - img
    - text: Work Experience
  - paragraph: No experience added yet
  - heading "Education" [level=2]:
    - img
    - text: Education
  - paragraph: No education added yet
  - heading "Profile Completion" [level=3]
  - text: 0%
  - progressbar
  - img
  - text: Needs Work
  - paragraph: Complete your profile to increase visibility to recruiters.
  - heading "Resume" [level=2]:
    - img
    - text: Resume
  - img
  - paragraph: Upload your resume
  - paragraph: PDF or DOCX, max 10MB
  - heading "Uploaded Resumes" [level=3]
  - text: john_doe_resume.pdf Active
- alert
```

# Test source

```ts
  43  |     await page.fill('input[placeholder*="Bachelor\'s, Master\'s, PhD"]', 'Bachelor of Science')
  44  |     await page.fill('input[placeholder*="Computer Science, Business"]', 'Computer Science')
  45  |     
  46  |     // Submit form
  47  |     await page.click('button:has-text("Create Profile")')
  48  |     
  49  |     // Should redirect to profile page
  50  |     await expect(page).toHaveURL('/profile')
  51  |     await expect(page.locator('text=My Profile')).toBeVisible()
  52  |   })
  53  | 
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
> 143 |     await expect(fileInput).toBeVisible()
      |                             ^ Error: expect(locator).toBeVisible() failed
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
  154 |     await expect(page.locator('text=Resume')).toBeVisible()
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