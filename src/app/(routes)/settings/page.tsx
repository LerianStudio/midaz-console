'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSearchParams } from 'next/navigation'
import { Breadcrumb } from '@/components/breadcrumb'
import { useIntl } from 'react-intl'
import { useTabs } from '@/hooks/use-tabs'
import { getBreadcrumbPaths } from '@/components/breadcrumb/get-breadcrumb-paths'
import { OrganizationsTabContent } from './organizations-tab-content'
import { PageHeader } from '@/components/page-header'

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
          <TabsTrigger value="others">
            {intl.formatMessage({
              id: 'settings.tabs.others',
              defaultMessage: 'Others Settings'
            })}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="organizations">
          <OrganizationsTabContent />
        </TabsContent>
        <TabsContent value="others">Others Configurations</TabsContent>
      </Tabs>
    </>
  )
}

export default Page
