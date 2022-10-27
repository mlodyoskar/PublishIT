import { test } from '@playwright/test';
import { login } from './utils/login';

const APP_URL =
	process.env.REACT_APP_PROD === 'false'
		? ('http://localhost:3000' as const)
		: ('https://publish-it.vercel.app' as const);

test.beforeEach(async ({ page }) => {
	login(page, APP_URL);
});

test('User can logut bla', async ({ page }) => {
	await page.locator('data-testid=user-button').click();
	await page.locator('text=Logout').click();

	await page.locator('text=Login');
	// await expect(page).toHaveURL(`${APP_URL[0]}`);
});
