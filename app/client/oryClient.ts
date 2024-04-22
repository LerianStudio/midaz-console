import { createApiHandler } from '@ory/integrations/next-edge'

export default createApiHandler({
  fallbackToPlayground: true,
  dontUseTldForCookieDomain: true,
  forwardAdditionalHeaders: ['x-forwarded-host'],
  forceCookieSecure: true
})
//
// createApiHandler({ fallbackToPlayground: true,
//
// const publicApi = new FrontendApi(configuration)
//
// export default publicApi
