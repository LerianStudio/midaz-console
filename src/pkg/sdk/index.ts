import { Configuration, FrontendApi } from '@ory/client'
import { edgeConfig } from '@ory/integrations/next'

const localConfig = {
  basePath: process.env.NEXT_PUBLIC_KRATOS_PUBLIC_URL,
  baseOptions: {
    withCredentials: true
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new FrontendApi(
  new Configuration(
    process.env.NEXT_PUBLIC_KRATOS_PUBLIC_URL ? localConfig : edgeConfig
  )
)
