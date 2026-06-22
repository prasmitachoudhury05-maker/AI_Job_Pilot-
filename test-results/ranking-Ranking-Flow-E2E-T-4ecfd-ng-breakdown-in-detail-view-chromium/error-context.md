# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ranking.spec.ts >> Ranking Flow E2E Tests >> should display scoring breakdown in detail view
- Location: e2e\ranking.spec.ts:71:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=/Skills/i')
Expected: visible
Error: strict mode violation: locator('text=/Skills/i') resolved to 4 elements:
    1) <span class="text-sm font-medium text-gray-700 capitalize">skills</span> aka getByText('skills', { exact: true })
    2) <h2 class="text-xl font-semibold text-gray-900 mb-4">Skills Match</h2> aka getByRole('heading', { name: 'Skills Match' })
    3) <p class="text-sm text-gray-600 mb-2">Matched Skills (1):</p> aka getByText('Matched Skills (1):')
    4) <p class="text-sm text-gray-600 mb-2">Missing Skills (2):</p> aka getByText('Missing Skills (2):')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=/Skills/i')

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
        - button "Back to Rankings" [ref=e48] [cursor=pointer]:
          - img [ref=e49]
          - text: Back to Rankings
        - 'heading "Job #1 Ranking Details" [level=1] [ref=e51]'
        - paragraph [ref=e52]: "Rank # • Overall Score: 46.7%"
      - generic [ref=e53]:
        - generic [ref=e54]:
          - heading "Overall Match Score" [level=2] [ref=e55]:
            - img [ref=e56]
            - text: Overall Match Score
          - generic [ref=e59]: 46.7%
        - generic [ref=e62]:
          - generic [ref=e63]: "Confidence Score: 50.0%"
          - generic [ref=e64]: "AI Ranking: Disabled"
      - generic [ref=e65]:
        - heading "Scoring Breakdown" [level=2] [ref=e66]:
          - img [ref=e67]
          - text: Scoring Breakdown
        - generic [ref=e69]:
          - generic [ref=e71]:
            - generic [ref=e72]: skills
            - generic [ref=e73]: "33.3% (Weight: 50%)"
          - generic [ref=e77]:
            - generic [ref=e78]: experience
            - generic [ref=e79]: "75.0% (Weight: 10%)"
          - generic [ref=e83]:
            - generic [ref=e84]: location
            - generic [ref=e85]: "100.0% (Weight: 20%)"
          - generic [ref=e89]:
            - generic [ref=e90]: salary
            - generic [ref=e91]: "80.0% (Weight: 10%)"
          - generic [ref=e95]:
            - generic [ref=e96]: industry
            - generic [ref=e97]: "70.0% (Weight: 5%)"
          - generic [ref=e101]:
            - generic [ref=e102]: seniority
            - generic [ref=e103]: "85.0% (Weight: 5%)"
      - generic [ref=e106]:
        - heading "Skills Match" [level=2] [ref=e107]
        - generic [ref=e108]:
          - paragraph [ref=e109]: "Matched Skills (1):"
          - generic [ref=e111]:
            - img [ref=e112]
            - text: React
        - generic [ref=e115]:
          - paragraph [ref=e116]: "Missing Skills (2):"
          - generic [ref=e117]:
            - generic [ref=e118]:
              - img [ref=e119]
              - text: JavaScript
            - generic [ref=e123]:
              - img [ref=e124]
              - text: Next.js
      - generic [ref=e128]:
        - heading "AI Explanation" [level=2] [ref=e129]:
          - img [ref=e130]
          - text: AI Explanation
        - paragraph [ref=e133]: Unable to generate AI explanation at this time.
      - generic [ref=e134]:
        - heading "Match Status" [level=2] [ref=e135]
        - generic [ref=e136]:
          - generic [ref=e137]:
            - paragraph [ref=e138]: Experience
            - paragraph [ref=e139]: 75.0%
            - paragraph [ref=e140]: Acceptable
          - generic [ref=e141]:
            - paragraph [ref=e142]: Location
            - paragraph [ref=e143]: 100.0%
            - paragraph [ref=e144]: Perfect
          - generic [ref=e145]:
            - paragraph [ref=e146]: Salary
            - paragraph [ref=e147]: 80.0%
            - paragraph [ref=e148]: Matched
          - generic [ref=e149]:
            - paragraph [ref=e150]: Industry
            - paragraph [ref=e151]: 70.0%
            - paragraph [ref=e152]: Related
          - generic [ref=e153]:
            - paragraph [ref=e154]: Seniority
            - paragraph [ref=e155]: 85.0%
            - paragraph [ref=e156]: Matched
  - alert [ref=e157]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Ranking Flow E2E Tests', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     // Navigate to ranking dashboard
  6   |     await page.goto('/ranking');
  7   |   });
  8   | 
  9   |   test('should display ranking dashboard', async ({ page }) => {
  10  |     // Check page title
  11  |     await expect(page.locator('h1')).toContainText('Job Ranking Dashboard');
  12  |     
  13  |     // Check for AI ranking toggle
  14  |     await expect(page.locator('input[type="checkbox"]')).toBeVisible();
  15  |     
  16  |     // Check for refresh button
  17  |     await expect(page.locator('button:has-text("Refresh")')).toBeVisible();
  18  |     
  19  |     // Check for export button
  20  |     await expect(page.locator('button:has-text("Export")')).toBeVisible();
  21  |   });
  22  | 
  23  |   test('should toggle AI ranking', async ({ page }) => {
  24  |     const checkbox = page.locator('input[type="checkbox"]');
  25  |     
  26  |     // Check initial state
  27  |     await expect(checkbox).toBeChecked();
  28  |     
  29  |     // Toggle off
  30  |     await checkbox.click();
  31  |     await expect(checkbox).not.toBeChecked();
  32  |     
  33  |     // Toggle on
  34  |     await checkbox.click();
  35  |     await expect(checkbox).toBeChecked();
  36  |   });
  37  | 
  38  |   test('should display rankings list', async ({ page }) => {
  39  |     // Wait for rankings to load
  40  |     await page.waitForSelector('.divide-y');
  41  |     
  42  |     // Check for ranking items
  43  |     const rankings = page.locator('.divide-y > div');
  44  |     const count = await rankings.count();
  45  |     
  46  |     if (count > 0) {
  47  |       // Check first ranking item
  48  |       await expect(rankings.first()).toContainText('Job #');
  49  |       await expect(rankings.first()).toContainText('Overall Score');
  50  |       await expect(rankings.first()).toContainText('Confidence');
  51  |     }
  52  |   });
  53  | 
  54  |   test('should navigate to ranking detail view', async ({ page }) => {
  55  |     // Wait for rankings to load
  56  |     await page.waitForSelector('.divide-y');
  57  |     
  58  |     // Click on first ranking
  59  |     const firstRanking = page.locator('.divide-y > div').first();
  60  |     const count = await firstRanking.count();
  61  |     
  62  |     if (count > 0) {
  63  |       await firstRanking.click();
  64  |       
  65  |       // Check navigation to detail view
  66  |       await expect(page.locator('h1')).toContainText('Ranking Details');
  67  |       await expect(page.locator('button:has-text("Back to Rankings")')).toBeVisible();
  68  |     }
  69  |   });
  70  | 
  71  |   test('should display scoring breakdown in detail view', async ({ page }) => {
  72  |     // Navigate to ranking detail
  73  |     await page.waitForSelector('.divide-y');
  74  |     const firstRanking = page.locator('.divide-y > div').first();
  75  |     const count = await firstRanking.count();
  76  |     
  77  |     if (count > 0) {
  78  |       await firstRanking.click();
  79  |       
  80  |       // Check for scoring breakdown section
  81  |       await expect(page.locator('h2:has-text("Scoring Breakdown")')).toBeVisible();
  82  |       
  83  |       // Check for individual factor scores
> 84  |       await expect(page.locator('text=/Skills/i')).toBeVisible();
      |                                                    ^ Error: expect(locator).toBeVisible() failed
  85  |       await expect(page.locator('text=/Experience/i')).toBeVisible();
  86  |       await expect(page.locator('text=/Location/i')).toBeVisible();
  87  |     }
  88  |   });
  89  | 
  90  |   test('should display AI explanation in detail view', async ({ page }) => {
  91  |     // Navigate to ranking detail
  92  |     await page.waitForSelector('.divide-y');
  93  |     const firstRanking = page.locator('.divide-y > div').first();
  94  |     const count = await firstRanking.count();
  95  |     
  96  |     if (count > 0) {
  97  |       await firstRanking.click();
  98  |       
  99  |       // Check for AI explanation section
  100 |       await expect(page.locator('h2:has-text("AI Explanation")')).toBeVisible();
  101 |     }
  102 |   });
  103 | 
  104 |   test('should display confidence score visualization', async ({ page }) => {
  105 |     // Navigate to ranking detail
  106 |     await page.waitForSelector('.divide-y');
  107 |     const firstRanking = page.locator('.divide-y > div').first();
  108 |     const count = await firstRanking.count();
  109 |     
  110 |     if (count > 0) {
  111 |       await firstRanking.click();
  112 |       
  113 |       // Check for confidence score
  114 |       await expect(page.locator('text=/Confidence Score/i')).toBeVisible();
  115 |       
  116 |       // Check for progress bar
  117 |       await expect(page.locator('.rounded-full').first()).toBeVisible();
  118 |     }
  119 |   });
  120 | 
  121 |   test('should navigate back to dashboard from detail view', async ({ page }) => {
  122 |     // Navigate to ranking detail
  123 |     await page.waitForSelector('.divide-y');
  124 |     const firstRanking = page.locator('.divide-y > div').first();
  125 |     const count = await firstRanking.count();
  126 |     
  127 |     if (count > 0) {
  128 |       await firstRanking.click();
  129 |       
  130 |       // Click back button
  131 |       await page.click('button:has-text("Back to Rankings")');
  132 |       
  133 |       // Check navigation back to dashboard
  134 |       await expect(page.locator('h1')).toContainText('Job Ranking Dashboard');
  135 |     }
  136 |   });
  137 | 
  138 |   test('should refresh rankings', async ({ page }) => {
  139 |     // Click refresh button
  140 |     await page.click('button:has-text("Refresh")');
  141 |     
  142 |     // Wait for rankings to reload
  143 |     await page.waitForSelector('.divide-y', { timeout: 10000 });
  144 |     
  145 |     // Check rankings are displayed
  146 |     await expect(page.locator('.divide-y')).toBeVisible();
  147 |   });
  148 | });
  149 | 
```