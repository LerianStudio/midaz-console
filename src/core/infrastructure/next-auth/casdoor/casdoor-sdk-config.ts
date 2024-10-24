import fs from 'fs'

export const casdoorSdkConfig = {
  endpoint: process.env.NEXTAUTH_CASDOOR_AUTH_URL as string,
  clientId: process.env.NEXTAUTH_CASDOOR_CLIENT_ID as string,
  clientSecret: process.env.NEXTAUTH_CASDOOR_CLIENT_SECRET as string,
  certificate: fs.readFileSync('./certs/casdoor-cert.pem', 'utf8'),
  orgName: process.env.CASDOOR_ORGANIZATION_NAME as string,
  applicationName: process.env.CASDOOR_APPLICATION_NAME as string
}
