'use client'
import { Card, CardHeader } from '@/components/ui/card/card'
import { Button } from '@/components/ui/button/button'
import { Plus } from 'lucide-react'

import { useTranslations } from 'next-intl'
import { useOrganizations } from '@/utils/queries'
import { DataTable } from '@/components/DataTable'
import { useRouter, usePathname } from 'next/navigation'
import { OrganizationsType } from '@/types/OrganizationsType'
import { getOrganizationsColumns } from '@/app/[locale]/(routes)/settings/organizations/organizations-columns'

const OrganizationsTable = () => {
  const t = useTranslations('organizations')
  const organizations = useOrganizations()
  const router = useRouter()
  const pathname = usePathname()

  const handleOpenEditSheet = (organizationData: OrganizationsType) => {
    console.log('organizationData', organizationData)
    router.push(`${pathname}/organizations/${organizationData.id}`)
  }

  const handleOpenViewSheet = (organizationData: OrganizationsType) => {}

  const handleOpenDeleteSheet = (organizationData: OrganizationsType) => {}

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
                <p className="text-md text-base-400">{t('subtitle')}</p>
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
        {organizations.data && organizations.data.length > 0 && (
          <DataTable columns={organizationsColumns} data={organizations.data} />
        )}
      </div>
    </div>
  )
}

export default OrganizationsTable
