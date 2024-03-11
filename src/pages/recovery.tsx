import { LoginFlow, RecoveryFlow, UpdateRecoveryFlowBody } from '@ory/client'
import { AxiosError } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { handleFlowError } from '../pkg/errors'
import ory from '../pkg/sdk'
import { Flow } from '../pkg'
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

const Recovery: NextPage = () => {
  const [flow, setFlow] = useState<RecoveryFlow>()

  // Get ?flow=... from the URL
  const router = useRouter()
  const { flow: flowId, return_to: returnTo } = router.query

  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (!router.isReady || flow) {
      return
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      ory
        .getRecoveryFlow({ id: String(flowId) })
        .then(({ data }) => {
          setFlow(data)
        })
        .catch(handleFlowError(router, 'recovery', setFlow))
      return
    }

    // Otherwise we initialize it
    ory
      .createBrowserRecoveryFlow({
        returnTo: String(returnTo || '')
      })
      .then(({ data }) => {
        setFlow(data)
      })
      .catch(handleFlowError(router, 'recovery', setFlow))
      .catch((err: AxiosError) => {
        // If the previous handler did not catch the error it's most likely a form validation error
        if (err.response?.status === 400) {
          // Yup, it is!
          setFlow(err.response?.data as LoginFlow)
          return
        }

        return Promise.reject(err)
      })
  }, [flowId, router, router.isReady, returnTo, flow])

  const onSubmit = (values: UpdateRecoveryFlowBody) =>
    router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/recovery?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        ory
          .updateRecoveryFlow({
            flow: String(flow?.id),
            updateRecoveryFlowBody: values
          })
          .then(({ data }) => {
            // Form submission was successful, show the message to the user!
            setFlow(data)
          })
          .catch(handleFlowError(router, 'recovery', setFlow))
          .catch((err: AxiosError) => {
            switch (err.response?.status) {
              case 400:
                // Status code 400 implies the form validation had an error
                setFlow(err.response?.data as LoginFlow)
                return
            }

            throw err
          })
      )

  return (
    <>
      <Head>
        <title>Midaz</title>
        <meta name="description" content="NextJS + React + Vercel + Ory" />
      </Head>
      <>
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
                    Esqueceu a senha?
                  </CardTitle>
                  <CardDescription className="text-black">
                    Coloque seu endereço de e-mail abaixo para enviarmos o link
                    para alteração da sua senha.
                  </CardDescription>
                </CardHeader>
                <Flow onSubmit={onSubmit} flow={flow} />
              </Card>
            </div>
          </div>
        </div>
      </>
    </>
  )
}

export default Recovery
