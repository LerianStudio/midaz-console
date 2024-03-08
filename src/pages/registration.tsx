import {
  LoginFlow,
  RegistrationFlow,
  UpdateRegistrationFlowBody
} from '@ory/client'
import { AxiosError } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// Import render helpers
import { handleFlowError } from '../pkg/errors'
// Import the SDK
import ory from '../pkg/sdk'
import { Flow } from '@/pkg'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import GeometricShape from '../../public/images/geometric-shape.svg'
import LeriandLogo from '../../public/images/leriand-logo.png'
import { Progress } from '@/components/ui/progress'

// Renders the registration page
const Registration: NextPage = () => {
  const router = useRouter()

  // The "flow" represents a registration process and contains
  // information about the form we need to render (e.g. username + password)
  const [flow, setFlow] = useState<RegistrationFlow>()

  // Get ?flow=... from the URL
  const { flow: flowId, return_to: returnTo } = router.query

  // In this effect we either initiate a new registration flow, or we fetch an existing registration flow.
  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (!router.isReady || flow) {
      return
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      ory
        .getRegistrationFlow({ id: String(flowId) })
        .then(({ data }) => {
          // We received the flow - let's use its data and render the form!
          setFlow(data)
        })
        .catch(handleFlowError(router, 'registration', setFlow))
      return
    }

    // Otherwise we initialize it
    ory
      .createBrowserRegistrationFlow({
        returnTo: returnTo ? String(returnTo) : undefined
      })
      .then(({ data }) => {
        setFlow(data)
      })
      .catch(handleFlowError(router, 'registration', setFlow))
  }, [flowId, router, router.isReady, returnTo, flow])

  const onSubmit = async (values: UpdateRegistrationFlowBody) => {
    await router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/registration?flow=${flow?.id}`, undefined, { shallow: true })

    ory
      .updateRegistrationFlow({
        flow: String(flow?.id),
        updateRegistrationFlowBody: values
      })
      .then(async ({ data }) => {
        // If we ended up here, it means we are successfully signed up!
        //
        // You can do cool stuff here, like having access to the identity which just signed up:
        console.log('This is the user session: ', data, data.identity)

        // continue_with is a list of actions that the user might need to take before the registration is complete.
        // It could, for example, contain a link to the verification form.
        if (data.continue_with) {
          for (const item of data.continue_with) {
            switch (item.action) {
              case 'show_verification_ui':
                await router.push('/verification?flow=' + item.flow.id)
                return
            }
          }
        }

        // If continue_with did not contain anything, we can just return to the home page.
        await router.push(flow?.return_to || '/')
      })
      .catch(handleFlowError(router, 'registration', setFlow))
      .catch((err: AxiosError) => {
        // If the previous handler did not catch the error it's most likely a form validation error
        if (err.response?.status === 400) {
          // Yup, it is!
          setFlow(err.response?.data as LoginFlow)
          return
        }

        return Promise.reject(err)
      })
  }

  return (
    <>
      <Head>
        <title>Create account - Ory NextJS Integration Example</title>
        <meta name="description" content="" />
      </Head>
      <div className="flex h-screen flex-col bg-[#faf9f9]">
        <div className="mt-6 flex w-full flex-col items-center">
          <Image src={LeriandLogo} alt="Leriand Logo" />
          <div className="mt-6 flex w-full max-w-[429px] flex-col gap-2">
            <h1 className="text-center text-3xl font-semibold text-black">
              Crie sua conta
            </h1>
            <p className="text-center text-sm font-normal text-black">
              Confirme seus{' '}
              <span className="font-bold text-[#DFC844]">dados pessoais</span>.
            </p>
            <Progress
              value={50}
              className="mt-5 w-full"
              indicatorColor="bg-[#F9DF4B]"
            />
          </div>
        </div>

        <div className="mt-3 flex w-full">
          <div className="z-10 h-screen w-fit">
            <Image src={GeometricShape} alt="Rectangle" />
          </div>

          <div className="absolute flex w-full justify-center">
            <Card className="min-h-[407px] min-w-[429px] border-none py-8 shadow-none">
              <CardContent className="flex flex-col gap-6 pt-2">
                <Flow onSubmit={onSubmit} flow={flow} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default Registration
