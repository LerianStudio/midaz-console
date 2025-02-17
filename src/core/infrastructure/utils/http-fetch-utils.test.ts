import { LoggerAggregator } from '@/core/application/logger/logger-aggregator'
import { getServerSession } from 'next-auth'
import { MidazRequestContext } from '../logger/decorators/midaz-id'
import { HTTP_METHODS, MidazHttpFetchUtils } from './http-fetch-utils'
import { handleMidazError } from './midaz-error-handler'

jest.mock('next-auth', () => ({
  getServerSession: jest.fn()
}))

jest.mock('./midaz-error-handler', () => ({
  handleMidazError: jest.fn(() => {
    throw new Error('Error occurred')
  })
}))

jest.mock('../next-auth/casdoor/next-auth-casdoor-provider', () => ({
  nextAuthCasdoorOptions: {}
}))

describe('MidazHttpFetchUtils', () => {
  let midazHttpFetchUtils: MidazHttpFetchUtils
  let midazRequestContext: MidazRequestContext
  let midazLogger: LoggerAggregator

  beforeEach(() => {
    midazRequestContext = {
      getMidazId: jest.fn().mockReturnValue('test-request-id')
    } as unknown as MidazRequestContext

    midazLogger = {
      error: jest.fn(),
      info: jest.fn()
    } as unknown as LoggerAggregator

    midazHttpFetchUtils = new MidazHttpFetchUtils(
      midazRequestContext,
      midazLogger
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should successfully fetch data', async () => {
    const mockResponse = { data: 'test' }
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
      body: true,
      status: 200
    })
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
      body: true,
      status: 200
    })
    ;(getServerSession as jest.Mock).mockResolvedValue({
      user: { access_token: 'test-token' }
    })

    const result = await midazHttpFetchUtils.httpMidazAuthFetch({
      url: 'https://api.example.com/test',
      method: HTTP_METHODS.GET
    })

    expect(result).toEqual(mockResponse)
    expect(midazLogger.info).toHaveBeenCalledWith(
      '[INFO] - httpMidazAuthFetch ',
      {
        url: 'https://api.example.com/test',
        method: 'GET',
        status: 200
      }
    )
  })

  it('should handle fetch error', async () => {
    const mockErrorResponse = { error: 'test error' }
    const mockFetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue(mockErrorResponse),
      body: true,
      status: 400
    })
    global.fetch = mockFetch
    ;(getServerSession as jest.Mock).mockResolvedValue({
      user: { access_token: 'test-token' }
    })
    ;(handleMidazError as jest.Mock).mockImplementation(() => {
      throw new Error('Handled error')
    })

    await expect(
      midazHttpFetchUtils.httpMidazAuthFetch({
        url: 'https://api.example.com/test',
        method: HTTP_METHODS.GET
      })
    ).rejects.toThrow('Handled error')

    expect(midazLogger.error).toHaveBeenCalledWith(
      '[ERROR] - httpMidazAuthFetch ',
      {
        url: 'https://api.example.com/test',
        method: 'GET',
        status: 400,
        response: mockErrorResponse
      }
    )
  })

  it('should set the correct headers', async () => {
    const mockResponse = { data: 'test' }
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
      body: true,
      status: 200
    })
    global.fetch = mockFetch
    ;(getServerSession as jest.Mock).mockResolvedValue({
      user: { access_token: 'test-token' }
    })

    await midazHttpFetchUtils.httpMidazAuthFetch({
      url: 'https://api.example.com/test',
      method: HTTP_METHODS.GET,
      headers: {
        'Custom-Header': 'CustomValue'
      }
    })

    expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/test', {
      method: 'GET',
      body: undefined,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer test-token',
        'X-Request-Id': 'test-request-id',
        'Custom-Header': 'CustomValue'
      }
    })
  })
})
