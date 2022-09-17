import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { login } from './utils/login';

dotenv.config();

const APP_URL =
	process.env.PROD === 'false'
		? 'http://localhost:3000'
		: 'https://publish-it.opuchalski.pl';

test.beforeEach(async ({ page }) => {
	login(page, APP_URL);
});

test('User open post and checks title', async ({ page }) => {
	const articleItem = await page.locator('article').first();
	const headerText = await articleItem.locator('h2').textContent();
	await articleItem.click();

	await page.locator(`text=${headerText}`);
});

test('User can save post and see it in saved posts', async ({ page }) => {
	const articleItem = await page.locator('article').first();
	const headerText = await articleItem.locator('h2').textContent();
	const articleSaveButton = await articleItem.locator('button');
});
