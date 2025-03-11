export const casdoorSdkConfig = {
  endpoint: process.env.NEXTAUTH_CASDOOR_AUTH_URL as string,
  clientId: process.env.NEXTAUTH_AUTH_SERVICE_CLIENT_ID as string,
  clientSecret: process.env.NEXTAUTH_AUTH_SERVICE_CLIENT_SECRET as string,
  certificate: '',
  orgName: process.env.NEXTAUTH_AUTH_SERVICE_ORGANIZATION_NAME as string,
  applicationName: process.env.NEXTAUTH_AUTH_SERVICE_APPLICATION_NAME as string
}
