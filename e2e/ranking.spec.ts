import { test, expect } from '@playwright/test';

test.describe('Ranking Flow E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to ranking dashboard
    await page.goto('/ranking');
  });

  test('should display ranking dashboard', async ({ page }) => {
    // Check page title
    await expect(page.locator('h1')).toContainText('Job Ranking Dashboard');
    
    // Check for AI ranking toggle
    await expect(page.locator('input[type="checkbox"]')).toBeVisible();
    
    // Check for refresh button
    await expect(page.locator('button:has-text("Refresh")')).toBeVisible();
    
    // Check for export button
    await expect(page.locator('button:has-text("Export")')).toBeVisible();
  });

  test('should toggle AI ranking', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]');
    
    // Check initial state
    await expect(checkbox).toBeChecked();
    
    // Toggle off
    await checkbox.click();
    await expect(checkbox).not.toBeChecked();
    
    // Toggle on
    await checkbox.click();
    await expect(checkbox).toBeChecked();
  });

  test('should display rankings list', async ({ page }) => {
    // Wait for rankings to load
    await page.waitForSelector('.divide-y');
    
    // Check for ranking items
    const rankings = page.locator('.divide-y > div');
    const count = await rankings.count();
    
    if (count > 0) {
      // Check first ranking item
      await expect(rankings.first()).toContainText('Job #');
      await expect(rankings.first()).toContainText('Overall Score');
      await expect(rankings.first()).toContainText('Confidence');
    }
  });

  test('should navigate to ranking detail view', async ({ page }) => {
    // Wait for rankings to load
    await page.waitForSelector('.divide-y');
    
    // Click on first ranking
    const firstRanking = page.locator('.divide-y > div').first();
    const count = await firstRanking.count();
    
    if (count > 0) {
      await firstRanking.click();
      
      // Check navigation to detail view
      await expect(page.locator('h1')).toContainText('Ranking Details');
      await expect(page.locator('button:has-text("Back to Rankings")')).toBeVisible();
    }
  });

  test('should display scoring breakdown in detail view', async ({ page }) => {
    // Navigate to ranking detail
    await page.waitForSelector('.divide-y');
    const firstRanking = page.locator('.divide-y > div').first();
    const count = await firstRanking.count();
    
    if (count > 0) {
      await firstRanking.click();
      
      // Check for scoring breakdown section
      await expect(page.locator('h2:has-text("Scoring Breakdown")')).toBeVisible();
      
      // Check for individual factor scores
      await expect(page.locator('text=/Skills/i')).toBeVisible();
      await expect(page.locator('text=/Experience/i')).toBeVisible();
      await expect(page.locator('text=/Location/i')).toBeVisible();
    }
  });

  test('should display AI explanation in detail view', async ({ page }) => {
    // Navigate to ranking detail
    await page.waitForSelector('.divide-y');
    const firstRanking = page.locator('.divide-y > div').first();
    const count = await firstRanking.count();
    
    if (count > 0) {
      await firstRanking.click();
      
      // Check for AI explanation section
      await expect(page.locator('h2:has-text("AI Explanation")')).toBeVisible();
    }
  });

  test('should display confidence score visualization', async ({ page }) => {
    // Navigate to ranking detail
    await page.waitForSelector('.divide-y');
    const firstRanking = page.locator('.divide-y > div').first();
    const count = await firstRanking.count();
    
    if (count > 0) {
      await firstRanking.click();
      
      // Check for confidence score
      await expect(page.locator('text=/Confidence Score/i')).toBeVisible();
      
      // Check for progress bar
      await expect(page.locator('.rounded-full').first()).toBeVisible();
    }
  });

  test('should navigate back to dashboard from detail view', async ({ page }) => {
    // Navigate to ranking detail
    await page.waitForSelector('.divide-y');
    const firstRanking = page.locator('.divide-y > div').first();
    const count = await firstRanking.count();
    
    if (count > 0) {
      await firstRanking.click();
      
      // Click back button
      await page.click('button:has-text("Back to Rankings")');
      
      // Check navigation back to dashboard
      await expect(page.locator('h1')).toContainText('Job Ranking Dashboard');
    }
  });

  test('should refresh rankings', async ({ page }) => {
    // Click refresh button
    await page.click('button:has-text("Refresh")');
    
    // Wait for rankings to reload
    await page.waitForSelector('.divide-y', { timeout: 10000 });
    
    // Check rankings are displayed
    await expect(page.locator('.divide-y')).toBeVisible();
  });
});
