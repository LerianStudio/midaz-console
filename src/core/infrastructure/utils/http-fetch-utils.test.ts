import { getServerSession } from 'next-auth'
import { nextAuthCasdoorOptions } from '../next-auth/casdoor/next-auth-casdoor-provider'
import { handleMidazError } from './midaz-error-handler'
import {
  httpMidazAuthFetch,
  HTTP_METHODS,
  HttpFetchOptions
} from './http-fetch-utils'

jest.mock('next-auth', () => ({
  getServerSession: jest.fn()
}))

jest.mock('../next-auth/casdoor/next-auth-casdoor-provider', () => ({
  nextAuthCasdoorOptions: {}
}))

jest.mock('./midaz-error-handler', () => ({
  handleMidazError: jest.fn(() => {
    throw new Error('Error occurred')
  })
}))

global.fetch = jest.fn()

describe('httpMidazAuthFetch', () => {
  const mockSession = {
    user: {
      access_token: 'mock_access_token'
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(getServerSession as jest.Mock).mockResolvedValue(mockSession)
  })

  it('should fetch data successfully', async () => {
    const mockResponse = { data: 'test' }
    ;(fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
      ok: true
    })

    const httpFetchOptions: HttpFetchOptions = {
      url: 'https://api.example.com/data',
      method: HTTP_METHODS.GET
    }

    const result = await httpMidazAuthFetch(httpFetchOptions)

    expect(getServerSession).toHaveBeenCalledWith(nextAuthCasdoorOptions)
    expect(fetch).toHaveBeenCalledWith(httpFetchOptions.url, {
      method: httpFetchOptions.method,
      body: httpFetchOptions.body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${mockSession.user.access_token}`
      }
    })
    expect(result).toEqual(mockResponse)
  })

  it('should make a POST request with the correct headers and body', async () => {
    const mockResponse = { ok: true, json: jest.fn().mockResolvedValue({}) }
    ;(fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
      ok: true
    })

    const options: HttpFetchOptions = {
      url: 'https://api.example.com/data',
      method: HTTP_METHODS.POST,
      body: JSON.stringify({ key: 'value' })
    }

    const response = await httpMidazAuthFetch(options)

    expect(getServerSession).toHaveBeenCalledWith(nextAuthCasdoorOptions)
    expect(fetch).toHaveBeenCalledWith(options.url, {
      method: options.method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer mock_access_token`
      },
      body: options.body
    })
    expect(response).toBe(mockResponse)
  })

  it('should include additional headers if provided', async () => {
    const mockResponse = { ok: true, json: jest.fn().mockResolvedValue({}) }
    ;(fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
      ok: true
    })

    const options: HttpFetchOptions = {
      url: 'https://api.example.com/data',
      method: HTTP_METHODS.GET,
      headers: {
        'Custom-Header': 'CustomValue'
      }
    }

    const response = await httpMidazAuthFetch(options)

    expect(getServerSession).toHaveBeenCalledWith(nextAuthCasdoorOptions)
    expect(fetch).toHaveBeenCalledWith(options.url, {
      method: options.method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer mock_access_token`,
        'Custom-Header': 'CustomValue'
      },
      body: undefined
    })
    expect(response).toBe(mockResponse)
  })

  it('should handle errors when fetching data', async () => {
    const mockErrorResponse = { message: 'Error occurred' }
    ;(fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockErrorResponse),
      ok: false
    })

    const httpFetchOptions: HttpFetchOptions = {
      url: 'https://api.example.com/data',
      method: HTTP_METHODS.GET
    }

    await expect(httpMidazAuthFetch(httpFetchOptions)).rejects.toThrow(
      'Error occurred'
    )

    expect(getServerSession).toHaveBeenCalledWith(nextAuthCasdoorOptions)
    expect(fetch).toHaveBeenCalledWith(httpFetchOptions.url, {
      method: httpFetchOptions.method,
      body: httpFetchOptions.body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${mockSession.user.access_token}`
      }
    })
    expect(handleMidazError).toHaveBeenCalledWith(mockErrorResponse)
  })
})

// import {
//   httpMidazAuthFetch,
//   HTTP_METHODS,
//   HttpFetchOptions
// } from './http-fetch-utils'
// import { getServerSession } from 'next-auth'
// import { nextAuthCasdoorOptions } from '../next-auth/casdoor/next-auth-casdoor-provider'
// const fetch = require('node-fetch')

// jest.mock('next-auth')
// jest.mock('node-fetch', () => jest.fn())

// describe('httpMidazAuthFetch', () => {
//   beforeEach(() => {
//     jest.clearAllMocks()
//   })

//   it('should make a GET request with the correct headers', async () => {
//     const mockSession = { user: { access_token: 'mockAccessToken' } }
//     ;(getServerSession as jest.Mock).mockResolvedValue(mockSession)
//     const mockResponse = { ok: true, json: jest.fn().mockResolvedValue({}) }
//     fetch.mockResolvedValue(mockResponse)

//     const options: HttpFetchOptions = {
//       url: 'https://api.example.com/data',
//       method: HTTP_METHODS.GET
//     }

//     const response = await httpMidazAuthFetch(options)

//     expect(getServerSession).toHaveBeenCalledWith(nextAuthCasdoorOptions)
//     expect(fetch).toHaveBeenCalledWith(options.url, {
//       method: options.method,
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer mockAccessToken`
//       },
//       body: undefined
//     })
//     expect(response).toBe(mockResponse)
//   })

//   it('should make a POST request with the correct headers and body', async () => {
//     const mockSession = { user: { access_token: 'mockAccessToken' } }
//     ;(getServerSession as jest.Mock).mockResolvedValue(mockSession)
//     const mockResponse = { ok: true, json: jest.fn().mockResolvedValue({}) }
//     fetch.mockResolvedValue(mockResponse)

//     const options: HttpFetchOptions = {
//       url: 'https://api.example.com/data',
//       method: HTTP_METHODS.POST,
//       body: JSON.stringify({ key: 'value' })
//     }

//     const response = await httpMidazAuthFetch(options)

//     expect(getServerSession).toHaveBeenCalledWith(nextAuthCasdoorOptions)
//     expect(fetch).toHaveBeenCalledWith(options.url, {
//       method: options.method,
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer mockAccessToken`
//       },
//       body: options.body
//     })
//     expect(response).toBe(mockResponse)
//   })

//   it('should include additional headers if provided', async () => {
//     const mockSession = { user: { access_token: 'mockAccessToken' } }
//     ;(getServerSession as jest.Mock).mockResolvedValue(mockSession)
//     const mockResponse = { ok: true, json: jest.fn().mockResolvedValue({}) }
//     fetch.mockResolvedValue(mockResponse)

//     const options: HttpFetchOptions = {
//       url: 'https://api.example.com/data',
//       method: HTTP_METHODS.GET,
//       headers: {
//         'Custom-Header': 'CustomValue'
//       }
//     }

//     const response = await httpMidazAuthFetch(options)

//     expect(getServerSession).toHaveBeenCalledWith(nextAuthCasdoorOptions)
//     expect(fetch).toHaveBeenCalledWith(options.url, {
//       method: options.method,
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer mockAccessToken`,
//         'Custom-Header': 'CustomValue'
//       },
//       body: undefined
//     })
//     expect(response).toBe(mockResponse)
//   })
// })
