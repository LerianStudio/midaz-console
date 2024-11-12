import { chromium } from '@playwright/test'
import { config } from '../fixtures/config'

async function globalSetup() {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.goto(config.baseUrl + '/signin')
  await page.waitForLoadState('networkidle')

  await page.fill('input[name="username"]', config.username)
  await page.fill('input[name="password"]', config.password)
  await page.click('button[type="submit"]')
  await page.waitForURL(config.baseUrl)

  await page.context().storageState({ path: 'tests/storage/data.json' })

  await browser.close()
}

export default globalSetup
