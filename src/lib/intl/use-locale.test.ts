import { renderHook } from '@testing-library/react'
import { useLocale } from './use-locale'
import { setCookie } from 'cookies-next'
import { useIntl } from 'react-intl'

jest.mock('cookies-next', () => ({
  setCookie: jest.fn()
}))

jest.mock('react-intl', () => ({
  useIntl: jest.fn()
}))

describe('useLocale', () => {
  it('should return the current locale', () => {
    ;(useIntl as jest.Mock).mockReturnValue({ locale: 'en' })
    const { result } = renderHook(() => useLocale())
    expect(result.current.locale).toBe('en')
  })

  it('should set the locale cookie', () => {
    ;(useIntl as jest.Mock).mockReturnValue({ locale: 'en' })
    const { result } = renderHook(() => useLocale())
    result.current.setLocale('fr')
    expect(setCookie).toHaveBeenCalledWith('locale', 'fr')
  })
})
