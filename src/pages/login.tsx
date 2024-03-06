import { LoginFlow, UpdateLoginFlowBody } from '@ory/client'
import { AxiosError } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { LogoutLink, Flow } from '../pkg'
import { handleGetFlowError, handleFlowError } from '../pkg/errors'
import ory from '../pkg/sdk'
import Image from 'next/image'
import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardHeader
} from '../components/ui/card'
import GeometricShape from '../../public/images/geometric-shape.svg'
import LeriandLogo from '../../public/images/leriand-logo.png'
import Link from 'next/link'
import { Button } from '../components/ui/button'

const Login: NextPage = () => {
  const [flow, setFlow] = useState<LoginFlow>()

  // Get ?flow=... from the URL
  const router = useRouter()
  const {
    return_to: returnTo,
    flow: flowId,
    // Refresh means we want to refresh the session. This is needed, for example, when we want to update the password
    // of a user.
    refresh,
    // AAL = Authorization Assurance Level. This implies that we want to upgrade the AAL, meaning that we want
    // to perform two-factor authentication/verification.
    aal
  } = router.query

  // This might be confusing, but we want to show the user an option
  // to sign out if they are performing two-factor authentication!
  const onLogout = LogoutLink([aal, refresh])

  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (!router.isReady || flow) {
      return
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      ory
        .getLoginFlow({ id: String(flowId) })
        .then(({ data }) => {
          setFlow(data)
        })
        .catch(handleGetFlowError(router, 'login', setFlow))
      return
    }

    // Otherwise we initialize it
    ory
      .createBrowserLoginFlow({
        refresh: Boolean(refresh),
        aal: aal ? String(aal) : undefined,
        returnTo: returnTo ? String(returnTo) : undefined
      })
      .then(({ data }) => {
        setFlow(data)
      })
      .catch(handleFlowError(router, 'login', setFlow))
  }, [flowId, router, router.isReady, aal, refresh, returnTo, flow])

  const onSubmit = (values: UpdateLoginFlowBody) =>
    router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/login?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        ory
          .updateLoginFlow({
            flow: String(flow?.id),
            updateLoginFlowBody: values
          })
          // We logged in successfully! Let's bring the user home.
          .then(() => {
            if (flow?.return_to) {
              window.location.href = flow?.return_to
              return
            }
            router.push('/')
          })
          .then(() => {})
          .catch(handleFlowError(router, 'login', setFlow))
          .catch((err: AxiosError) => {
            // If the previous handler did not catch the error it's most likely a form validation error
            if (err.response?.status === 400) {
              // Yup, it is!
              setFlow(err.response?.data as LoginFlow)
              return
            }

            return Promise.reject(err)
          })
      )

  return (
    <>
      <Head>
        <title>Midaz - Login</title>
        <meta name="description" content="" />
      </Head>
      <div className="flex h-screen w-screen flex-col bg-[#faf9f9]">
        <div className="mt-6 flex w-full justify-center">
          <Image src={LeriandLogo} alt="Leriand Logo" />
        </div>

        <div className="absolute flex h-screen w-full items-center justify-center">
          <div className="w-full">
            <Image src={GeometricShape} alt="Rectangle" />
          </div>

          <div className="absolute">
            <Card className="min-h-[505px] w-full min-w-[430px] border-none px-8 shadow-none">
              <CardHeader className="px-0 pt-[72px]">
                <CardTitle className="text-3xl font-semibold">
                  {(() => {
                    if (flow?.refresh) {
                      return 'Confirm Action'
                    } else if (flow?.requested_aal === 'aal2') {
                      return 'Two-Factor Authentication'
                    }

                    return 'Bem-vindo(a) de volta!'
                  })()}
                </CardTitle>
                <CardDescription className="text-black">
                  Insira seu e-mail e senha pra entrar.
                </CardDescription>
              </CardHeader>
              <Flow onSubmit={onSubmit} flow={flow} />
              {aal || refresh ? (
                <h1>...</h1>
              ) : (
                <div className="mt-6 flex w-full justify-between">
                  <Link href="/registration">
                    <Button
                      variant="link"
                      className="h-fit p-0 text-base font-semibold text-[#C7C7C7] underline"
                    >
                      Criar conta
                    </Button>
                  </Link>
                  <Link href="/recovery">
                    <Button
                      variant="link"
                      className="h-fit p-0 text-base font-semibold text-[#DFC844] underline"
                    >
                      Esqueci a senha.
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
