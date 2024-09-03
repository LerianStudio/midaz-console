'use client'
import { Card, CardHeader } from '@/components/ui/card/card'
import { Button } from '@/components/ui/button/button'
import { Plus } from 'lucide-react'

import { useTranslations } from 'next-intl'
import { useOrganizations } from '@/utils/queries'
import { DataTable } from '@/components/data-table'
import { useRouter, usePathname } from 'next/navigation'
import { OrganizationsType } from '@/types/organizations-type'
import { getOrganizationsColumns } from '@/app/[locale]/(routes)/settings/organizations/organizations-columns'
import useCustomToast from '@/hooks/use-custom-toast'
import { deleteOrganization } from '@/client/organization-client'
import { ClientToastException } from '@/exceptions/client/client-toast-exception'
import { NoResource } from '@/components/no-resource'
import React from 'react'

const OrganizationsTable = () => {
  const t = useTranslations('organizations')
  const { showError, showSuccess } = useCustomToast()
  const organizations = useOrganizations()
  const router = useRouter()
  const pathname = usePathname()

  const handleOpenEditSheet = (organizationData: OrganizationsType) => {
    console.log('organizationData', organizationData)
    router.push(`${pathname}/organizations/${organizationData.id}`)
  }

  const handleOpenViewSheet = (organizationData: OrganizationsType) => {}

  const handleOpenDeleteSheet = async (id: string) => {
    try {
      await deleteOrganization(id)
    } catch (error: any) {
      const errorMessage =
        error instanceof ClientToastException
          ? t(`toast.${error.messageAttributeName}`, { organizationId: id })
          : t('toast.genericError')
      return showError(errorMessage)
    }
  }

  const organizationsColumns = getOrganizationsColumns(
    {
      handleOpenEditSheet,
      handleOpenViewSheet,
      handleOpenDeleteSheet
    },
    t
  )

  const handleCreateOrganization = () => {
    router.push(`${pathname}/organizations/new-organization`)
  }

  return (
    <div>
      <div className="mr-16 w-full">
        <Card className="rounded-lg border bg-card shadow-sm ">
          <CardHeader>
            <div className="flex w-full justify-between">
              <div>
                <h1 className="text-xl font-normal">{t('title')}</h1>
                <p className="text-sm font-medium text-zinc-400">
                  {t('subtitle')}
                </p>
              </div>

              <Button
                onClick={() => handleCreateOrganization()}
                variant="default"
                className="flex gap-2"
                size="default"
              >
                <span>{t('listingTemplate.addButton')}</span>
                <Plus size={24} />
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="mt-6">
        {organizations.data && organizations.data.length > 0 ? (
          <DataTable columns={organizationsColumns} data={organizations.data} />
        ) : (
          <NoResource
            resourceName="Ledger"
            onClick={handleCreateOrganization}
            pronoun="he"
          />
        )}
      </div>
    </div>
  )
}

export default OrganizationsTable
