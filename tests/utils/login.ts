import { Page } from '@playwright/test';

const login = async (page: Page, url: string) => {
	await page.goto(url);
	await page.locator('[placeholder="mail\\@company\\.com"]').click();
	await page
		.locator('[placeholder="mail\\@company\\.com"]')
		.fill('test3@gmail.com');
	await page.locator('[placeholder="mail\\@company\\.com"]').press('Tab');
	await page.locator('[placeholder="min\\. 6 characters"]').fill('123456');
	await page.locator('text=Sign in').first().click();
	// await expect(page).toHaveURL(url);
};

export { login };
