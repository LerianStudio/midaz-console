'use client'

import Breadcrumb from '@/components/Breadcrumb'
import { DataTable } from '@/components/DataTable'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { Organizations } from '@/types/OrganizationsType'
import { useTranslation } from 'next-export-i18n'
import useSWR from 'swr'
import { fetcher } from '../libs/fetcher'
import { Skeleton } from '@/components/ui/skeleton'

const Page = () => {
  const { t } = useTranslation()
  const { data, isLoading } = useSWR<Organizations[]>(
    '/api/organizations',
    fetcher
  )

  const breadcrumbPaths = [
    { name: t('breadcrumb.myOrganizations'), active: false },
    {
      name: t('breadcrumb.organizations'),
      href: '/organizations',
      active: true
    }
  ]

  const columns: ColumnDef<Organizations>[] = [
    {
      accessorKey: 'name',
      header: t('table.headerName')
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <Button
              size="icon"
              onClick={() => alert('clicked')}
              variant="secondary"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )
      }
    }
  ]

  return (
    <div>
      <Breadcrumb paths={breadcrumbPaths} />
      {!isLoading ? (
        <DataTable columns={columns} data={data || []} />
      ) : (
        <Skeleton className="h-[100px] w-full rounded-md" />
      )}
    </div>
  )
}

export default Page
