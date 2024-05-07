'use client'
import { cn } from '@/lib/utils'
import { useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import OrganizationsView from '@/[locale]/(routes)/settings/organizations/organizations-view'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { BreadcrumbComponent, BreadcrumbPath } from '@/components/Breadcrumb'

const Page = () => {
  const t = useTranslations('settings')
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const initialTab = searchParams.get('tab') || 'organizations'
  const [activeTab, setActiveTab] = useState(initialTab)
  const breadcrumbPaths: BreadcrumbPath[] = [
    {
      name: t('title'),
      href: '#',
      active: false
    }
  ]

  const handleBreadcrumb = (
    breadCrumpath: BreadcrumbPath,
    action: 'add' | 'replace' | 'remove'
  ) => {
    const index = breadcrumbPaths.findIndex(
      (path) => path.name === breadCrumpath.name
    )

    if (action === 'add' && index === -1) {
      breadcrumbPaths.push(breadCrumpath)
    }

    if (action === 'replace' && index !== -1) {
      breadcrumbPaths[index] = breadCrumpath
    }

    if (action === 'remove' && index !== -1) {
      breadcrumbPaths.splice(index, 1)
    }
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    router.push(`${pathname}?${createQueryString('tab', tab)}`)
  }

  const handleRouterQueryParams = (tab: string) => {
    router.push(`${pathname}?${createQueryString('tab', tab)}`)
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  useEffect(() => {
    handleTabChange(activeTab)
  }, [searchParams])

  return (
    <div>
      <BreadcrumbComponent paths={breadcrumbPaths} />

      <div className="mb-12 mt-12">
        <h1 className={cn('text-4xl font-bold text-[#3f3f46]')}>
          {t('title')}
        </h1>
      </div>

      <div>
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          {/*className={cn('mt-5', data.length >= 4 && 'mt-0')}*/}
          {/*<TabsList className="gap-4 pb-0 pl-0">*/}
          <TabsList className="gap-4 pb-0 pl-0">
            <TabsTrigger
              className={cn('data-[state=active]:bg-amber-400')}
              value="organizations"
            >
              {t('tabs.organizations')}
            </TabsTrigger>
            <TabsTrigger
              className={cn('data-[state=active]:bg-amber-400')}
              value="others"
            >
              {t('tabs.others')}
            </TabsTrigger>
          </TabsList>
          <div className="mb-4 mt-4">
            <TabsContent value="organizations">
              <div>
                <OrganizationsView />
              </div>
            </TabsContent>
            <TabsContent value="others">
              <div>Others Configurations</div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default Page
