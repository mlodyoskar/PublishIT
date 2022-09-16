import { test, expect } from '@playwright/test';

const APP_URL =
	process.env.REACT_APP_PROD === 'false'
		? 'http://localhost:3000'
		: 'https://publish-it.opuchalski.pl';

test.beforeEach(async ({ page }) => {
	await page.goto(APP_URL);
	await page.locator('[placeholder="mail\\@company\\.com"]').click();
	await page
		.locator('[placeholder="mail\\@company\\.com"]')
		.fill('test3@gmail.com');
	await page.locator('[placeholder="mail\\@company\\.com"]').press('Tab');
	await page.locator('[placeholder="min\\. 6 characters"]').fill('123456');
	await page.locator('text=Sign in').first().click();
	await expect(page).toHaveURL(APP_URL);
});

test('User can logut', async ({ page }) => {
	await page.locator('[id="headlessui-menu-button-\\:r1\\:"]').click();
	await page.locator('text=Logout').click();

	await page.locator('text=Login');
	await expect(page).toHaveURL('http://localhost:3000/login');
});
