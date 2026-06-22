# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: profile.spec.ts >> Profile Creation Flow >> should display profile creation form
- Location: e2e\profile.spec.ts:9:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Education')
Expected: visible
Error: strict mode violation: locator('text=Education') resolved to 2 elements:
    1) <h3 class="text-lg font-semibold text-gray-900">Education</h3> aka getByRole('heading', { name: 'Education' })
    2) <button type="button" class="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-blue-500 hover:text-blue-600 flex items-center justify-center gap-2">…</button> aka getByRole('button', { name: 'Add Education' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Education')

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
        - heading "Create Your Profile" [level=1] [ref=e48]
        - paragraph [ref=e49]: Build your professional profile to get discovered by recruiters
      - generic [ref=e51]:
        - generic [ref=e52]:
          - heading "Basic Information" [level=3] [ref=e53]
          - generic [ref=e54]:
            - generic [ref=e55]: Professional Title
            - textbox "Professional Title" [ref=e56]:
              - /placeholder: e.g., Senior Software Engineer
          - generic [ref=e57]:
            - generic [ref=e58]: Professional Summary
            - textbox "Professional Summary" [ref=e59]:
              - /placeholder: Write a brief summary of your professional background and goals
          - generic [ref=e60]:
            - generic [ref=e61]:
              - generic [ref=e62]: Phone
              - textbox "Phone" [ref=e63]:
                - /placeholder: +1 (555) 123-4567
            - generic [ref=e64]:
              - generic [ref=e65]: Location
              - textbox "Location" [ref=e66]:
                - /placeholder: San Francisco, CA
          - generic [ref=e67]:
            - generic [ref=e68]:
              - generic [ref=e69]: LinkedIn URL
              - textbox "LinkedIn URL" [ref=e70]:
                - /placeholder: https://linkedin.com/in/...
            - generic [ref=e71]:
              - generic [ref=e72]: GitHub URL
              - textbox "GitHub URL" [ref=e73]:
                - /placeholder: https://github.com/...
            - generic [ref=e74]:
              - generic [ref=e75]: Portfolio URL
              - textbox "Portfolio URL" [ref=e76]:
                - /placeholder: https://...
        - generic [ref=e77]:
          - heading "Skills" [level=3] [ref=e78]
          - generic [ref=e80]:
            - textbox "Add a skill..." [ref=e81]
            - button "Add" [ref=e82] [cursor=pointer]:
              - img [ref=e83]
              - text: Add
        - generic [ref=e84]:
          - heading "Work Experience" [level=3] [ref=e85]
          - button "Add Experience" [ref=e87] [cursor=pointer]:
            - img [ref=e88]
            - text: Add Experience
        - generic [ref=e89]:
          - heading "Education" [level=3] [ref=e90]
          - button "Add Education" [ref=e92] [cursor=pointer]:
            - img [ref=e93]
            - text: Add Education
        - button "Create Profile" [ref=e95] [cursor=pointer]:
          - img [ref=e96]
          - text: Create Profile
  - alert [ref=e100]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test'
  2   | 
  3   | test.describe('Profile Creation Flow', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     // Navigate to profile creation page
  6   |     await page.goto('/profile/create')
  7   |   })
  8   | 
  9   |   test('should display profile creation form', async ({ page }) => {
  10  |     await expect(page.locator('text=Professional Title')).toBeVisible()
  11  |     await expect(page.locator('text=Professional Summary')).toBeVisible()
  12  |     await expect(page.locator('text=Skills')).toBeVisible()
  13  |     await expect(page.locator('text=Work Experience')).toBeVisible()
> 14  |     await expect(page.locator('text=Education')).toBeVisible()
      |                                                  ^ Error: expect(locator).toBeVisible() failed
  15  |   })
  16  | 
  17  |   test('should create profile with valid data', async ({ page }) => {
  18  |     // Fill in basic information
  19  |     await page.fill('input[placeholder*="Professional Title"]', 'Software Engineer')
  20  |     await page.fill('textarea[placeholder*="Professional Summary"]', 'Experienced software developer with 5+ years of experience')
  21  |     await page.fill('input[placeholder*="Phone"]', '+1234567890')
  22  |     await page.fill('input[placeholder*="Location"]', 'San Francisco, CA')
  23  |     
  24  |     // Add skills
  25  |     const skillsInput = page.locator('input[placeholder*="Add a skill"]')
  26  |     await skillsInput.fill('JavaScript')
  27  |     await skillsInput.press('Enter')
  28  |     await skillsInput.fill('Python')
  29  |     await skillsInput.press('Enter')
  30  |     await skillsInput.fill('React')
  31  |     await skillsInput.press('Enter')
  32  |     
  33  |     // Add experience
  34  |     await page.click('button:has-text("Add Experience")')
  35  |     await page.fill('input[placeholder*="Company name"]', 'Tech Corp')
  36  |     await page.fill('input[placeholder*="Job title"]', 'Senior Developer')
  37  |     await page.fill('input[type="date"].nth(0)', '2020-01-01')
  38  |     await page.fill('input[type="date"].nth(1)', '2022-01-01')
  39  |     
  40  |     // Add education
  41  |     await page.click('button:has-text("Add Education")')
  42  |     await page.fill('input[placeholder*="University/College name"]', 'University of Tech')
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
```