import dotenv from 'dotenv'

dotenv.config({ path: './.env.playwright' })

export const config = {
  baseUrl: process.env.MIDAZ_CONSOLE_URL!,
  username: process.env.USERNAME!,
  password: process.env.PASSWORD!
}
