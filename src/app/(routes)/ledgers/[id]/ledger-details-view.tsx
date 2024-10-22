'use client'

import { BottomDrawer } from '@/components/bottom-drawer'
import { Breadcrumb } from '@/components/breadcrumb'
import { PageHeader } from '@/components/page-header'
import useCustomToast from '@/hooks/use-custom-toast'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { OverviewTabContent } from './overview-tab-content'
import { useFormState } from '@/context/form-details-context'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useIntl } from 'react-intl'
import { AccountsPortfoliosTabContent } from './accounts-and-portfolios/accounts-portfolios-tab-content'
import { ProductsTabContent } from './products/products-tab-content'
import { useTabs } from '@/hooks/use-tabs'
import { getBreadcrumbPaths } from '@/components/breadcrumb/get-breadcrumb-paths'
import { AssetsTabContent } from './assets/assets-tab-content'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { ILedgerType } from '@/types/ledgers-type'
import { useUpdateLedger } from '@/client/ledger-client'
import { LedgerDetailsSkeleton } from './ledger-details-skeleton'

type LedgerDetailsViewProps = {
  data: ILedgerType
}

const LedgerDetailsView = ({ data }: LedgerDetailsViewProps) => {
  const intl = useIntl()
  const { currentOrganization } = useOrganization()
  const { activeTab, handleTabChange } = useTabs({ initialValue: 'overview' })
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
      active: () => activeTab === 'overview'
    },
    {
      name: intl.formatMessage({
        id: `ledgers.tab.assets`,
        defaultMessage: 'Assets'
      }),
      active: () => activeTab === 'assets'
    },
    {
      name: intl.formatMessage({
        id: `settings.tab.products`,
        defaultMessage: 'Products'
      }),
      active: () => activeTab === 'products'
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
        defaultValue="overview"
        onValueChange={handleTabChange}
      >
        <TabsList>
          <TabsTrigger value="overview">
            {intl.formatMessage({
              id: 'ledgers.tab.overview',
              defaultMessage: 'Overview'
            })}
          </TabsTrigger>
          <TabsTrigger value="assets">
            {intl.formatMessage({
              id: 'ledgers.tab.assets',
              defaultMessage: 'Assets'
            })}
          </TabsTrigger>

          <TabsTrigger value="portfolios-and-accounts">
            {intl.formatMessage({
              id: 'ledgers.tab.portfolios-and-accounts',
              defaultMessage: 'Portfolios and Accounts'
            })}
          </TabsTrigger>
          <TabsTrigger value="products">
            {intl.formatMessage({
              id: 'ledgers.tab.products',
              defaultMessage: 'Products'
            })}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewTabContent data={data} />
        </TabsContent>
        <TabsContent value="assets">
          <AssetsTabContent data={data} />
        </TabsContent>
        <TabsContent value="portfolios-and-accounts">
          <AccountsPortfoliosTabContent />
        </TabsContent>
        <TabsContent value="products">
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
