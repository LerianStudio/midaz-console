'use client'
import { cn } from '@/lib/utils'
import { useCallback, useEffect, useState } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs/tabs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { BreadcrumbComponent, BreadcrumbPath } from '@/components/breadcrumb'
import OrganizationsTable from '@/app/(routes)/settings/organizations/organizations-table'
import { useIntl } from 'react-intl'

const Page = () => {
  const intl = useIntl()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const initialTab = searchParams.get('tab') || 'organizations'
  const [activeTab, setActiveTab] = useState(initialTab)
  const [breadcrumbPaths, setBreadcrumbPaths] = useState<BreadcrumbPath[]>([
    {
      name: intl.formatMessage({
        id: `settings.title`,
        defaultMessage: 'Settings'
      }),
      href: '#',
      active: false
    }
  ])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    router.push(`${pathname}?${createQueryString('tab', tab)}`)
    handleBreadCrumb(tab)
  }

  const handleBreadCrumb = (tab: string) => {
    if (breadcrumbPaths.length > 1) {
      breadcrumbPaths.pop()
    }
    breadcrumbPaths.push({
      // name: intl.formatMessage({ id: `settings.tabs.${tab}` }),
      name: '',
      active: true
    })
    setBreadcrumbPaths([...breadcrumbPaths])
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
          {intl.formatMessage({
            id: 'settings.title',
            defaultMessage: 'Settings'
          })}
        </h1>
      </div>

      <div>
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="organizations">
              {intl.formatMessage({
                id: 'settings.tabs.organizations',
                defaultMessage: 'Organizations'
              })}
            </TabsTrigger>
            <TabsTrigger value="others">
              {intl.formatMessage({
                id: 'settings.tabs.others',
                defaultMessage: 'Others Settings'
              })}
            </TabsTrigger>
          </TabsList>
          <div className="mb-4 mt-4">
            <TabsContent value="organizations">
              <div>
                <OrganizationsTable />
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
