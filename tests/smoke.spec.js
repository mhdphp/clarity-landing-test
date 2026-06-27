const { test, expect } = require('@playwright/test');

const PAGE = 'file:///i:/Claude%20Code%20with%20Python%2C%20Power%20BI%2C%20Excel%2C%20PowerPoint%20%26%20Word/Project2%20-%20Clarity%20Landing/index.html';

test.describe('Clarity Landing — Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE, { waitUntil: 'domcontentloaded' });
  });

  test('page title is correct', async ({ page }) => {
    await expect(page).toHaveTitle('Clarity — Spreadsheet Replacement for Modern Teams');
  });

  test('nav logo and links are present', async ({ page }) => {
    await expect(page.locator('.nav__logo')).toHaveText('Clarity');
    await expect(page.locator('.nav__links .nav__link')).toHaveCount(4);
  });

  test('hero heading second line is green', async ({ page }) => {
    const accent = page.locator('.hero__heading-accent');
    await expect(accent).toHaveText('Start Understanding It.');
    const color = await accent.evaluate(el => getComputedStyle(el).color);
    // --color-accent resolves to rgb(34, 197, 94)
    expect(color).toBe('rgb(34, 197, 94)');
  });

  test('hero static first line never changes', async ({ page }) => {
    const html = await page.locator('.hero__heading').innerHTML();
    expect(html).toContain('Stop Managing Data.');
  });

  test('all 9 sections are present', async ({ page }) => {
    for (const id of ['hero', 'social-proof', 'features', 'how-it-works', 'testimonials', 'pricing', 'cta']) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('sign-up modal opens and closes', async ({ page }) => {
    await page.locator('[data-open-modal]').first().click();
    await expect(page.locator('#signup-modal')).toHaveClass(/is-open/);
    await page.keyboard.press('Escape');
    await expect(page.locator('#signup-modal')).not.toHaveClass(/is-open/);
  });

  test('pricing toggle switches Pro price to annual', async ({ page }) => {
    const amount = page.locator('.pricing__amount[data-monthly]');
    await expect(amount).toHaveText('$29');
    await page.locator('.pricing__toggle-btn').click();
    await expect(amount).toHaveText('$23');
  });
});
