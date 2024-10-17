import {
  httpMidazAuthFetch,
  HTTP_METHODS,
  HttpFetchOptions
} from './http-fetch-utils'
import { getServerSession } from 'next-auth'
import { nextAuthCasdoorOptions } from '../next-auth/casdoor/next-auth-casdoor-provider'
const fetch = require('node-fetch')

jest.mock('next-auth')
jest.mock('node-fetch', () => jest.fn())

describe('httpMidazAuthFetch', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should make a GET request with the correct headers', async () => {
    const mockSession = { user: { access_token: 'mockAccessToken' } }
    ;(getServerSession as jest.Mock).mockResolvedValue(mockSession)
    const mockResponse = { ok: true, json: jest.fn().mockResolvedValue({}) }
    fetch.mockResolvedValue(mockResponse)

    const options: HttpFetchOptions = {
      url: 'https://api.example.com/data',
      method: HTTP_METHODS.GET
    }

    const response = await httpMidazAuthFetch(options)

    expect(getServerSession).toHaveBeenCalledWith(nextAuthCasdoorOptions)
    expect(fetch).toHaveBeenCalledWith(options.url, {
      method: options.method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer mockAccessToken`
      },
      body: undefined
    })
    expect(response).toBe(mockResponse)
  })

  it('should make a POST request with the correct headers and body', async () => {
    const mockSession = { user: { access_token: 'mockAccessToken' } }
    ;(getServerSession as jest.Mock).mockResolvedValue(mockSession)
    const mockResponse = { ok: true, json: jest.fn().mockResolvedValue({}) }
    fetch.mockResolvedValue(mockResponse)

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
        Authorization: `Bearer mockAccessToken`
      },
      body: options.body
    })
    expect(response).toBe(mockResponse)
  })

  it('should include additional headers if provided', async () => {
    const mockSession = { user: { access_token: 'mockAccessToken' } }
    ;(getServerSession as jest.Mock).mockResolvedValue(mockSession)
    const mockResponse = { ok: true, json: jest.fn().mockResolvedValue({}) }
    fetch.mockResolvedValue(mockResponse)

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
        Authorization: `Bearer mockAccessToken`,
        'Custom-Header': 'CustomValue'
      },
      body: undefined
    })
    expect(response).toBe(mockResponse)
  })
})
