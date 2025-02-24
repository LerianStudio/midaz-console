'use client'

import { Breadcrumb } from '@/components/breadcrumb'
import { PageHeader } from '@/components/page-header'
import React from 'react'
import { cn } from '@/lib/utils'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useIntl } from 'react-intl'
import { useTabs } from '@/hooks/use-tabs'
import { getBreadcrumbPaths } from '@/components/breadcrumb/get-breadcrumb-paths'
import { ILedgerType } from '@/types/ledgers-type'
import { LedgerDetailsSkeleton } from './ledger-details-skeleton'
import { OverviewTabContent } from './overview/overview-tab-content'
import { AssetsTabContent } from './assets/assets-tab-content'
import { PortfoliosTabContent } from './portfolios/portfolios-tab-content'
import { AccountsTabContent } from './accounts/accounts-tab-content'
import { SegmentsTabContent } from './segments/segments-tab-content'

const TAB_VALUES = {
  OVERVIEW: 'overview',
  ASSETS: 'assets',
  SEGMENTS: 'segments',
  PORTFOLIOS: 'portfolios',
  ACCOUNTS: 'accounts'
}

const DEFAULT_TAB_VALUE = TAB_VALUES.OVERVIEW

type LedgerDetailsViewProps = {
  data: ILedgerType
}

const LedgerDetailsView = ({ data }: LedgerDetailsViewProps) => {
  const intl = useIntl()

  const { activeTab, handleTabChange } = useTabs({
    initialValue: DEFAULT_TAB_VALUE
  })

  const breadcrumbPaths = getBreadcrumbPaths([
    {
      name: intl.formatMessage({
        id: `ledgers.title`,
        defaultMessage: 'Ledgers'
      }),
      href: '/ledgers'
    },
    {
      name: intl.formatMessage({
        id: `ledgers.tab.overview`,
        defaultMessage: 'Overview'
      }),
      active: () => activeTab === TAB_VALUES.OVERVIEW
    },
    {
      name: intl.formatMessage({
        id: `common.assets`,
        defaultMessage: 'Assets'
      }),
      active: () => activeTab === TAB_VALUES.ASSETS
    },
    {
      name: intl.formatMessage({
        id: `settings.tab.segments`,
        defaultMessage: 'Segments'
      }),
      active: () => activeTab === TAB_VALUES.SEGMENTS
    },
    {
      name: intl.formatMessage({
        id: `settings.tab.portfolios`,
        defaultMessage: 'Portfolios'
      }),
      active: () => activeTab === TAB_VALUES.PORTFOLIOS
    },
    {
      name: intl.formatMessage({
        id: `ledgers.tab.accounts`,
        defaultMessage: 'Accounts'
      }),
      active: () => activeTab === TAB_VALUES.ACCOUNTS
    }
  ])

  if (!data) {
    return <LedgerDetailsSkeleton />
  }

  return (
    <div>
      <Breadcrumb paths={breadcrumbPaths} />

      <PageHeader.Root>
        <PageHeader.Wrapper>
          <PageHeader.InfoTitle
            title={data.name ?? ''}
            subtitle={data.id ?? ''}
          >
            <PageHeader.InfoTooltip subtitle={data.id ?? ''} />
          </PageHeader.InfoTitle>
        </PageHeader.Wrapper>
      </PageHeader.Root>

      <Tabs
        value={activeTab}
        defaultValue={DEFAULT_TAB_VALUE}
        onValueChange={handleTabChange}
      >
        <TabsList>
          <TabsTrigger value={TAB_VALUES.OVERVIEW}>
            {intl.formatMessage({
              id: 'ledgers.tab.overview',
              defaultMessage: 'Overview'
            })}
          </TabsTrigger>

          <TabsTrigger value={TAB_VALUES.ASSETS}>
            {intl.formatMessage({
              id: 'common.assets',
              defaultMessage: 'Assets'
            })}
          </TabsTrigger>

          <TabsTrigger value={TAB_VALUES.SEGMENTS}>
            {intl.formatMessage({
              id: 'ledgers.tab.segments',
              defaultMessage: 'Segments'
            })}
          </TabsTrigger>

          <TabsTrigger value={TAB_VALUES.ACCOUNTS}>
            {intl.formatMessage({
              id: 'ledgers.tab.accounts',
              defaultMessage: 'Accounts'
            })}
          </TabsTrigger>

          <TabsTrigger value={TAB_VALUES.PORTFOLIOS}>
            {intl.formatMessage({
              id: 'ledgers.tab.portfolios',
              defaultMessage: 'Portfolios'
            })}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={TAB_VALUES.OVERVIEW}>
          <OverviewTabContent data={data} />
        </TabsContent>

        <TabsContent value={TAB_VALUES.ASSETS}>
          <AssetsTabContent data={data} />
        </TabsContent>

        <TabsContent value={TAB_VALUES.SEGMENTS}>
          <SegmentsTabContent />
        </TabsContent>

        <TabsContent value={TAB_VALUES.PORTFOLIOS}>
          <PortfoliosTabContent />
        </TabsContent>

        <TabsContent value={TAB_VALUES.ACCOUNTS}>
          <AccountsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default LedgerDetailsView
