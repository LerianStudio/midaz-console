'use client'
import { Card, CardHeader } from '@/components/ui/card/card'
import { Button } from '@/components/ui/button/button'
import { Plus } from 'lucide-react'
import { getOrganizationsColumns } from '@/[locale]/(routes)/settings/organizations/organizations-columns'
import { useTranslations } from 'next-intl'
import { OrganizationEntity } from '@/domain/entities/OrganizationEntity'
import { useOrganizations } from '@/utils/queries'
import { DataTable } from '@/components/DataTable'

const OrganizationsView = () => {
  const t = useTranslations('organizations')
  const organizations = useOrganizations()

  const handleOpenCreateSheet = () => {
    // setSheetMode({ isOpen: true, mode: 'create', ledgersData: null })
  }

  const handleOpenEditSheet = (organizationData: OrganizationEntity) => {
    // setSheetMode({ isOpen: true, mode: 'edit', ledgersData: ledgerData })
  }

  const handleOpenViewSheet = (organizationData: OrganizationEntity) => {
    // setSheetMode({ isOpen: true, mode: 'view', ledgersData: ledgerData })
  }

  const handleOpenDeleteSheet = (organizationData: OrganizationEntity) => {
    // setCurrentLedgerForDeletion(ledgerData)
    // setIsDialogOpen(true)
  }

  const organizationsColumns = getOrganizationsColumns(
    {
      handleOpenEditSheet,
      handleOpenViewSheet,
      handleOpenDeleteSheet
    },
    t
  )

  return (
    <div>
      <div className="mr-16 w-full">
        <Card className="rounded-lg border bg-card shadow-sm ">
          <CardHeader>
            <div className="flex w-full justify-between">
              <div>
                <h1 className="text-xl font-normal">{t('title')}</h1>

                <p className="text-md text-base-400">{t('subtitle')}</p>
              </div>

              <Button variant="default" className="flex gap-2" size="default">
                <span>{t('listingTemplate.addButton')}</span>
                <Plus size={24} />
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="mt-6">
        {organizations.data && organizations.data.length > 0 && (
          <DataTable columns={organizationsColumns} data={organizations.data} />
        )}
      </div>
    </div>
  )
}

export default OrganizationsView
