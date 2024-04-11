import { test, expect } from '@playwright/test'

test('should change the application language to Portuguese', async ({
  page
}) => {
  await page.goto('http://localhost:3000/')

  await page.getByTestId('locale-switcher-trigger').click()

  await Promise.all([
    page.waitForURL('http://localhost:3000/pt'),
    page.getByText('PT', { exact: true }).click()
  ])

  await expect(page).toHaveURL('http://localhost:3000/pt')
})

test('should change the application language to English', async ({ page }) => {
  await page.goto('http://localhost:3000/pt')

  await page.getByTestId('locale-switcher-trigger').click()

  await Promise.all([
    page.waitForURL('http://localhost:3000/en'),
    page.getByText('EN', { exact: true }).click()
  ])

  await expect(page).toHaveURL('http://localhost:3000/en')
})
