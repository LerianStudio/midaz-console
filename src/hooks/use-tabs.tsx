import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export type UseTabsProps = {
  initialValue?: string
  onTabChange?: (tab: string) => void
}

export const useTabs = ({ initialValue, onTabChange }: UseTabsProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [activeTab, setActiveTab] = React.useState(initialValue || '')

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    router.push(`${pathname}?${createQueryString('tab', tab)}`)
    onTabChange?.(tab)
  }

  /**
   * Function provided by NextJS official documentation:
   * https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams
   */
  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  React.useEffect(() => {
    handleTabChange(activeTab)
  }, [searchParams])

  return {
    activeTab,
    handleTabChange
  }
}
