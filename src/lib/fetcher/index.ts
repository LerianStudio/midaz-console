/**
 * TODO: Better error handling
 */

import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'

export const getFetcher = (url: string) => {
  return async () => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return fetcherResponseHandler(response)
  }
}

export const postFetcher = (url: string) => {
  return async (body: any) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    return fetcherResponseHandler(response)
  }
}

export const patchFetcher = (url: string) => {
  return async (body: any) => {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    return fetcherResponseHandler(response)
  }
}

export const deleteFetcher = (url: string) => {
  return async ({ id }: { id: string }) => {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return fetcherResponseHandler(response)
  }
}

export const serverFetcher = async <T = void>(action: () => Promise<T>) => {
  try {
    return await action()
  } catch (error) {
    redirect('/signin')
    return null
  }
}

const fetcherResponseHandler = async (response: Response) => {
  console.log('Fetcher Error', response)

  if (!response.ok) {
    if (response.status === 401) {
      signOut({ callbackUrl: '/login' })
      return
    }
    throw new Error('Fetcher Error')
  }

  return await response.json()
}
