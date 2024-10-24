'use client'

import { BottomDrawer } from '@/components/bottom-drawer'
import { Breadcrumb } from '@/components/breadcrumb'
import { PageHeader } from '@/components/page-header'
import useCustomToast from '@/hooks/use-custom-toast'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useFormState } from '@/context/form-details-context'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useIntl } from 'react-intl'
import { AccountsPortfoliosTabContent } from './accounts-and-portfolios/accounts-portfolios-tab-content'
import { ProductsTabContent } from './products/products-tab-content'
import { useTabs } from '@/hooks/use-tabs'
import { getBreadcrumbPaths } from '@/components/breadcrumb/get-breadcrumb-paths'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { ILedgerType } from '@/types/ledgers-type'
import { useUpdateLedger } from '@/client/ledger-client'
import { LedgerDetailsSkeleton } from './ledger-details-skeleton'
import { OverviewTabContent } from './overview/overview-tab-content'

const TAB_VALUES = {
  OVERVIEW: 'overview',
  ASSETS: 'assets',
  PORTFOLIOS_AND_ACCOUNTS: 'portfolios-and-accounts',
  PRODUCTS: 'products'
}

const DEFAULT_TAB_VALUE = TAB_VALUES.OVERVIEW

type LedgerDetailsViewProps = {
  data: ILedgerType
}

const LedgerDetailsView = ({ data }: LedgerDetailsViewProps) => {
  const intl = useIntl()
  const { currentOrganization } = useOrganization()
  const { activeTab, handleTabChange } = useTabs({
    initialValue: DEFAULT_TAB_VALUE
  })
  const { formData, isDirty, resetForm } = useFormState()
  const { showSuccess, showError } = useCustomToast()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const { mutate: updateLedger, isPending: updatePending } = useUpdateLedger({
    organizationId: currentOrganization!.id!,
    ledgerId: data?.id!,
    onSuccess: () => {
      setIsDrawerOpen(false)
      resetForm()
      showSuccess(
        intl.formatMessage({
          id: 'ledgers.toast.ledgerUpdated',
          defaultMessage: 'Ledger changes saved successfully'
        })
      )
    },
    onError: () => {
      showError(
        intl.formatMessage({
          id: 'common.toast.error',
          defaultMessage: 'Error saving changes.'
        })
      )
    }
  })

  useEffect(() => {
    setIsDrawerOpen(isDirty)
  }, [isDirty])

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
        id: `ledgers.tab.portfolios-and-accounts`,
        defaultMessage: 'Portfolios and Accounts'
      }),
      active: () => activeTab === TAB_VALUES.PORTFOLIOS_AND_ACCOUNTS
    },
    {
      name: intl.formatMessage({
        id: `settings.tab.products`,
        defaultMessage: 'Products'
      }),
      active: () => activeTab === TAB_VALUES.PRODUCTS
    }
  ])

  const handleGlobalSubmit = async () => {
    const dataToSend = {
      ...formData
    }

    updateLedger(dataToSend)
  }

  const handleCancel = () => {
    setIsDrawerOpen(false)
    resetForm()
  }

  if (!data) {
    return <LedgerDetailsSkeleton />
  }

  return (
    <div className={cn(isDirty && 'pb-40')}>
      <Breadcrumb paths={breadcrumbPaths} />

      <PageHeader.Root>
        <div className="flex justify-between border-b">
          <PageHeader.InfoTitle
            title={data.name ?? ''}
            subtitle={data.id ?? ''}
          >
            <PageHeader.InfoTooltip subtitle={data.id ?? ''} />
          </PageHeader.InfoTitle>
          <PageHeader.ActionButtons>
            <PageHeader.StatusButton />
          </PageHeader.ActionButtons>
        </div>
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

          <TabsTrigger value={TAB_VALUES.PORTFOLIOS_AND_ACCOUNTS}>
            {intl.formatMessage({
              id: 'ledgers.tab.portfolios-and-accounts',
              defaultMessage: 'Portfolios and Accounts'
            })}
          </TabsTrigger>

          <TabsTrigger value={TAB_VALUES.PRODUCTS}>
            {intl.formatMessage({
              id: 'ledgers.tab.products',
              defaultMessage: 'Products'
            })}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={TAB_VALUES.OVERVIEW}>
          <OverviewTabContent data={data} />
        </TabsContent>

        <TabsContent value={TAB_VALUES.PORTFOLIOS_AND_ACCOUNTS}>
          <AccountsPortfoliosTabContent />
        </TabsContent>

        <TabsContent value={TAB_VALUES.PRODUCTS}>
          <ProductsTabContent />
        </TabsContent>
      </Tabs>

      <BottomDrawer
        isOpen={isDrawerOpen}
        handleSubmit={handleGlobalSubmit}
        handleCancel={handleCancel}
        isPending={updatePending}
      />
    </div>
  )
}

export default LedgerDetailsView
