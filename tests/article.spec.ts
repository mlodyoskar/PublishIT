import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:3000/');
	await page.locator('[placeholder="mail\\@company\\.com"]').click();
	await page
		.locator('[placeholder="mail\\@company\\.com"]')
		.fill('test3@gmail.com');
	await page.locator('[placeholder="mail\\@company\\.com"]').press('Tab');
	await page.locator('[placeholder="min\\. 6 characters"]').fill('123456');
	await page.locator('text=Sign in').first().click();
	await expect(page).toHaveURL('http://localhost:3000/');
});

test('User open post', async ({ page }) => {
	await page
		.locator(
			'text=Mój ulubiony typ: ten o którym nic nie wiemNigdy nie pomyślałbym, że najciekawsz >> div'
		)
		.click();
	await expect(page).toHaveURL('http://localhost:3000/articles/62');
	await page.locator('text=Mój ulubiony typ: ten o którym nic nie wiem').click();
	await page
		.locator(
			'text=Nigdy nie pomyślałbym, że najciekawszym typem TS okaże się dla mnie unknown. Nie'
		)
		.click();
});
