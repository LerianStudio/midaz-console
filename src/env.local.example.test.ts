import fs from 'fs'

const getValue = (file: string, variable: string) => {
  const match = file.match(new RegExp(`^${variable}=(.*)$`, 'm'))
  const value = match ? match[1] : null
  return value?.replaceAll("'", '').replaceAll('\"', '').trim()
}

describe('.env.local.example', () => {
  let envExample: string

  beforeAll(() => {
    envExample = fs.readFileSync('.env.local.example', 'utf-8')
  })

  it('should have NEXTAUTH_SECRET set to "SECRET_HERE"', () => {
    expect(getValue(envExample, 'NEXTAUTH_SECRET')).toBe('SECRET_HERE')
  })

  it('should have PLUGIN_AUTH_CLIENT_ID set to "CLIENT_ID_HERE"', () => {
    expect(getValue(envExample, 'PLUGIN_AUTH_CLIENT_ID')).toBe('SECRET_HERE')
  })

  it('should have PLUGIN_AUTH_CLIENT_SECRET set to "CLIENT_SECRET_HERE"', () => {
    expect(getValue(envExample, 'PLUGIN_AUTH_CLIENT_SECRET')).toBe(
      'SECRET_HERE'
    )
  })
})
