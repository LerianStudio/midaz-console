'use client'

import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSearchParams } from 'next/navigation'
import { Breadcrumb } from '@/components/breadcrumb'
import OrganizationsTable from '@/app/(routes)/settings/organizations/organizations-table'
import { useIntl } from 'react-intl'
import { useTabs } from '@/hooks/use-tabs'
import { getBreadcrumbPaths } from '@/components/breadcrumb/get-breadcrumb-paths'

const Page = () => {
  const intl = useIntl()
  const searchParams = useSearchParams()

  const { activeTab, handleTabChange } = useTabs({
    initialValue: searchParams.get('tab') || 'organizations'
  })

  return (
    <div>
      <Breadcrumb
        paths={getBreadcrumbPaths([
          {
            name: intl.formatMessage({
              id: `settings.title`,
              defaultMessage: 'Settings'
            }),
            href: '#'
          },
          {
            name: intl.formatMessage({
              id: `settings.tab.organizations`,
              defaultMessage: 'Organizations'
            }),
            active: () => activeTab === 'organizations'
          },
          {
            name: intl.formatMessage({
              id: `settings.tab.otherSettings`,
              defaultMessage: 'Other Settings'
            }),
            active: () => activeTab === 'others'
          }
        ])}
      />

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
