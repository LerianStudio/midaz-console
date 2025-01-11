'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSearchParams } from 'next/navigation'
import { Breadcrumb } from '@/components/breadcrumb'
import { useIntl } from 'react-intl'
import { useTabs } from '@/hooks/use-tabs'
import { getBreadcrumbPaths } from '@/components/breadcrumb/get-breadcrumb-paths'
import { OrganizationsTabContent } from './organizations-tab-content'
import { PageHeader } from '@/components/page-header'
import { SystemTabContent } from './system-tab-content'

const Page = () => {
  const intl = useIntl()
  const searchParams = useSearchParams()

  const { activeTab, handleTabChange } = useTabs({
    initialValue: searchParams.get('tab') || 'organizations'
  })

  return (
    <>
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
              id: `settings.tabs.organizations`,
              defaultMessage: 'Organizations'
            }),
            active: () => activeTab === 'organizations'
          },
          {
            name: intl.formatMessage({
              id: `settings.tabs.system`,
              defaultMessage: 'System'
            }),
            active: () => activeTab === 'system'
          }
        ])}
      />

      <PageHeader.Root>
        <PageHeader.Wrapper className="border-none">
          <PageHeader.InfoTitle
            title={intl.formatMessage({
              id: 'settings.title',
              defaultMessage: 'Settings'
            })}
          />
        </PageHeader.Wrapper>
      </PageHeader.Root>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="organizations">
            {intl.formatMessage({
              id: 'settings.tabs.organizations',
              defaultMessage: 'Organizations'
            })}
          </TabsTrigger>
          <TabsTrigger value="system">
            {intl.formatMessage({
              id: 'settings.tabs.system',
              defaultMessage: 'System'
            })}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="organizations">
          <OrganizationsTabContent />
        </TabsContent>
        <TabsContent value="system">
          <SystemTabContent />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default Page
