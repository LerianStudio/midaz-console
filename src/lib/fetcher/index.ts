/**
 * TODO: Better error handling
 */

export const getFetcher = (url: string) => {
  return async () => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('GET Fetcher error')
    }

    return await response.json()
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

    if (!response.ok) {
      throw new Error('POST Fetcher error')
    }

    return await response.json()
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

    if (!response.ok) {
      throw new Error('PATCH Fetcher error')
    }

    return await response.json()
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

    if (!response.ok) {
      throw new Error('DELETE Fetcher error')
    }

    return await response.json()
  }
}
