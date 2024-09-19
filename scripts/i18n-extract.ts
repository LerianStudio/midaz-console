import { extract } from '@formatjs/cli-lib'
import { glob } from 'glob'
import { intlConfig } from '../intl.config'
import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

const outputPath = './locales/extracted'
const formatJsConfig = {
  format: 'simple',
  additionalFunctionNames: ['$t'],
  throws: true
}

/**
 * Clears default messages from a extracted keys JSON string
 * @param data JSON string data
 * @returns
 */
function clearDefaultMessages(data: string) {
  let json = JSON.parse(data)

  // Clear keys
  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      json[key] = ''
    }
  }

  return JSON.stringify(json, null, 2)
}

/**
 * Checks if a locale json file already exists
 * If exists, merge the already existing data with new data from arguments
 * and save the file
 * @param locale
 * @param data JSON string data
 */
async function extractLocale(locale: string, data: string) {
  let output = data
  const localePath = path.join(outputPath, `${locale}.json`)

  // Checks if file exists
  if (existsSync(localePath)) {
    let outputJson = JSON.parse(output)

    // Reads file contents
    const localeFile = await readFile(localePath)
    const localeJson = JSON.parse(localeFile.toString('utf-8'))

    // Merge existing keys with new empty keys, given preference to existing ones
    outputJson = Object.assign({}, outputJson, localeJson)

    output = JSON.stringify(outputJson, null, 2)
  }

  // Output into a file
  await writeFile(localePath, output, 'utf-8')
}

async function main() {
  // Get the list of files
  const paths = await glob('./src/**/*.{js,ts,tsx}')

  // Creates output path in case it doesn't exists
  await mkdir(outputPath, { recursive: true })

  // Runs formatjs and get the extracted keys
  const extracted = await extract(paths, formatJsConfig)

  // Save default language
  await writeFile(
    path.join(outputPath, `${intlConfig.defaultLocale}.json`),
    extracted
  )

  // Remove default messages
  const extractedClean = clearDefaultMessages(extracted)

  // Outputs json files for each locale
  intlConfig.locales.map(async (locale) => {
    // Skips default locale
    if (locale === intlConfig.defaultLocale) {
      return
    }

    // Diff data and outputs each locale in a new file
    await extractLocale(locale, extractedClean)
  })
}

main()
