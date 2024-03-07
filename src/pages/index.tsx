import { AxiosError } from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import ory from '../pkg/sdk'
import MainLayout from '@/components/MainLayout'
import Breadcrumb, { BreadcrumbPath } from '@/components/Breadcrumb'
import { PageTitle } from '@/components/PageTitle'
import { AuthProvider } from '@/contexts/authContext'

const Home = () => {
  const [hasSession, setHasSession] = useState<boolean>(false)
  const router = useRouter()

  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'x', active: false },
    { name: 'x', href: '/', active: true }
  ]

  // useEffect(() => {
  //   ory
  //     .toSession()
  //     .then(({ data }) => {
  //       console.log(data)
  //       setHasSession(true)
  //     })
  //     .catch((err: AxiosError) => {
  //       switch (err.response?.status) {
  //         case 403:
  //         // This is a legacy error code thrown. See code 422 for
  //         // more details.
  //         case 422:
  //           // This status code is returned when we are trying to
  //           // validate a session which has not yet completed
  //           // its second factor
  //           return router.push('/login?aal=aal2')
  //         case 401:
  //           // Redirect to login if user is not authenticated
  //           router.push('/login')
  //           return
  //       }

  //       // Something else happened!
  //       return Promise.reject(err)
  //     })
  // }, [router])

  return (
    <AuthProvider>
      <div>
        <Head>
          <title>Midaz</title>
          <meta name="description" content="NextJS + React + Vercel + Ory" />
        </Head>

        <MainLayout>
          <div>
            <Breadcrumb paths={breadcrumbPaths} />
            <PageTitle title="x" />
          </div>
        </MainLayout>
      </div>
    </AuthProvider>
  )
}

export default Home
