'use client'
import { cn } from '@/lib/utils'
import { useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { BreadcrumbComponent, BreadcrumbPath } from '@/components/breadcrumb'
import OrganizationsTable from '@/app/[locale]/(routes)/settings/organizations/organizations-table'

const Page = () => {
  const t = useTranslations('settings')
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const initialTab = searchParams.get('tab') || 'organizations'
  const [activeTab, setActiveTab] = useState(initialTab)
  const [breadcrumbPaths, setBreadcrumbPaths] = useState<BreadcrumbPath[]>([
    {
      name: t('title'),
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
      name: t(`tabs.${tab}`),
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
          {t('title')}
        </h1>
      </div>

      <div>
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="gap-4 pb-0 pl-0">
            <TabsTrigger
              className={cn(
                'text-zinc-700 data-[state=active]:bg-amber-400 data-[state=active]:text-zinc-700'
              )}
              value="organizations"
            >
              {t('tabs.organizations')}
            </TabsTrigger>
            <TabsTrigger
              className={cn(
                ' data-[state=active]:bg-amber-400 data-[state=active]:text-zinc-700'
              )}
              value="others"
            >
              {t('tabs.others')}
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
