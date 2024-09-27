import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { isNil } from 'lodash'

export type UseTabsProps = {
  initialValue?: string
  onTabChange?: (tab: string) => void
}

/**
 * Hook designed to simplify usage of Tabs together with other components
 * that needs this information. Ex: Breadcrumb
 * @param param0
 * @returns
 */
export const useTabs = ({ initialValue, onTabChange }: UseTabsProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [activeTab, setActiveTab] = React.useState(initialValue || '')

  /**
   * Update state and route application with the respective tab as a URL search param
   * @param tab
   */
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

  /**
   * Updates activeTab when changed from URL parameters
   */
  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const tab = params.get('tab')

    // Avoid if no tab params is found
    if (isNil(tab)) {
      return
    }

    setActiveTab(tab)
  }, [searchParams])

  return {
    activeTab,
    handleTabChange
  }
}
