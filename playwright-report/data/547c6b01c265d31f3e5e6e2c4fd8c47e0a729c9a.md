# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ranking.spec.ts >> Ranking Flow E2E Tests >> should navigate to ranking detail view
- Location: e2e\ranking.spec.ts:54:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('h1')
Expected substring: "Ranking Details"
Error: strict mode violation: locator('h1') resolved to 2 elements:
    1) <h1 class="text-2xl font-bold text-white tracking-tight flex items-center gap-2">…</h1> aka getByRole('heading', { name: 'J JobPilot' })
    2) <h1 class="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">…</h1> aka getByRole('heading', { name: 'Job Ranking Dashboard' })

Call log:
  - Expect "toContainText" with timeout 5000ms
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
      - generic [ref=e47]:
        - heading "Job Ranking Dashboard" [level=1] [ref=e48]:
          - img [ref=e49]
          - text: Job Ranking Dashboard
        - paragraph [ref=e52]: AI-powered job matching and ranking based on your profile
      - generic [ref=e53]:
        - generic [ref=e54]:
          - generic [ref=e56]:
            - checkbox "Use AI Ranking" [checked] [ref=e57]
            - generic [ref=e58]: Use AI Ranking
          - generic [ref=e59]:
            - button "Refresh" [ref=e60] [cursor=pointer]:
              - img [ref=e61]
              - text: Refresh
            - button "Export" [ref=e66] [cursor=pointer]:
              - img [ref=e67]
              - text: Export
        - paragraph [ref=e71]: "API Cost: $0.0000 | Tokens Used: 0"
      - generic [ref=e72]:
        - generic [ref=e73]:
          - heading "Ranked Jobs" [level=2] [ref=e74]
          - paragraph [ref=e75]: 6 jobs ranked by match score
        - generic [ref=e76]:
          - generic [ref=e77] [cursor=pointer]:
            - generic [ref=e78]:
              - generic [ref=e79]:
                - generic [ref=e81]: "#1"
                - generic [ref=e82]:
                  - 'heading "Job #1" [level=3] [ref=e83]'
                  - paragraph [ref=e84]: "Overall Score: 46.7%"
              - generic [ref=e85]:
                - generic [ref=e86]:
                  - paragraph [ref=e87]: Confidence
                  - paragraph [ref=e88]: 50.0%
                - generic [ref=e89]:
                  - paragraph [ref=e90]: Skills
                  - paragraph [ref=e91]: 33.3%
                - generic [ref=e92]:
                  - paragraph [ref=e93]: Experience
                  - paragraph [ref=e94]: 75.0%
            - paragraph [ref=e96]: Unable to generate AI explanation at this time.
          - generic [ref=e97] [cursor=pointer]:
            - generic [ref=e98]:
              - generic [ref=e99]:
                - generic [ref=e101]: "#2"
                - generic [ref=e102]:
                  - 'heading "Job #3" [level=3] [ref=e103]'
                  - paragraph [ref=e104]: "Overall Score: 46.7%"
              - generic [ref=e105]:
                - generic [ref=e106]:
                  - paragraph [ref=e107]: Confidence
                  - paragraph [ref=e108]: 50.0%
                - generic [ref=e109]:
                  - paragraph [ref=e110]: Skills
                  - paragraph [ref=e111]: 33.3%
                - generic [ref=e112]:
                  - paragraph [ref=e113]: Experience
                  - paragraph [ref=e114]: 75.0%
            - paragraph [ref=e116]: Unable to generate AI explanation at this time.
          - generic [ref=e117] [cursor=pointer]:
            - generic [ref=e118]:
              - generic [ref=e119]:
                - generic [ref=e121]: "#3"
                - generic [ref=e122]:
                  - 'heading "Job #5" [level=3] [ref=e123]'
                  - paragraph [ref=e124]: "Overall Score: 46.7%"
              - generic [ref=e125]:
                - generic [ref=e126]:
                  - paragraph [ref=e127]: Confidence
                  - paragraph [ref=e128]: 50.0%
                - generic [ref=e129]:
                  - paragraph [ref=e130]: Skills
                  - paragraph [ref=e131]: 33.3%
                - generic [ref=e132]:
                  - paragraph [ref=e133]: Experience
                  - paragraph [ref=e134]: 75.0%
            - paragraph [ref=e136]: Unable to generate AI explanation at this time.
          - generic [ref=e137] [cursor=pointer]:
            - generic [ref=e138]:
              - generic [ref=e139]:
                - generic [ref=e141]: "#4"
                - generic [ref=e142]:
                  - 'heading "Job #2" [level=3] [ref=e143]'
                  - paragraph [ref=e144]: "Overall Score: 31.7%"
              - generic [ref=e145]:
                - generic [ref=e146]:
                  - paragraph [ref=e147]: Confidence
                  - paragraph [ref=e148]: 50.0%
                - generic [ref=e149]:
                  - paragraph [ref=e150]: Skills
                  - paragraph [ref=e151]: 33.3%
                - generic [ref=e152]:
                  - paragraph [ref=e153]: Experience
                  - paragraph [ref=e154]: 75.0%
            - paragraph [ref=e156]: Unable to generate AI explanation at this time.
          - generic [ref=e157] [cursor=pointer]:
            - generic [ref=e158]:
              - generic [ref=e159]:
                - generic [ref=e161]: "#5"
                - generic [ref=e162]:
                  - 'heading "Job #4" [level=3] [ref=e163]'
                  - paragraph [ref=e164]: "Overall Score: 31.7%"
              - generic [ref=e165]:
                - generic [ref=e166]:
                  - paragraph [ref=e167]: Confidence
                  - paragraph [ref=e168]: 50.0%
                - generic [ref=e169]:
                  - paragraph [ref=e170]: Skills
                  - paragraph [ref=e171]: 33.3%
                - generic [ref=e172]:
                  - paragraph [ref=e173]: Experience
                  - paragraph [ref=e174]: 75.0%
            - paragraph [ref=e176]: Unable to generate AI explanation at this time.
          - generic [ref=e177] [cursor=pointer]:
            - generic [ref=e178]:
              - generic [ref=e179]:
                - generic [ref=e181]: "#6"
                - generic [ref=e182]:
                  - 'heading "Job #6" [level=3] [ref=e183]'
                  - paragraph [ref=e184]: "Overall Score: 31.7%"
              - generic [ref=e185]:
                - generic [ref=e186]:
                  - paragraph [ref=e187]: Confidence
                  - paragraph [ref=e188]: 50.0%
                - generic [ref=e189]:
                  - paragraph [ref=e190]: Skills
                  - paragraph [ref=e191]: 33.3%
                - generic [ref=e192]:
                  - paragraph [ref=e193]: Experience
                  - paragraph [ref=e194]: 75.0%
            - paragraph [ref=e196]: Unable to generate AI explanation at this time.
  - alert [ref=e197]
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
> 66  |       await expect(page.locator('h1')).toContainText('Ranking Details');
      |                                        ^ Error: expect(locator).toContainText(expected) failed
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
  84  |       await expect(page.locator('text=/Skills/i')).toBeVisible();
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