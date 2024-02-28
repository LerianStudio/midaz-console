'use client'

import { PageTitle } from '@/components/PageTitle'
import Breadcrumb from '@/components/Breadcrumb'
import { DataTable } from '@/components/DataTable'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { Organizations } from '@/types/OrganizationsType'
import { useTranslation } from 'next-export-i18n'

const Page = () => {
  const [organizations, setOrganizations] = useState<Organizations[]>([])
  const { t } = useTranslation()

  const breadcrumbPaths = [
    { name: 'My organizations', active: false },
    { name: 'Organizations', href: '/organizations', active: true }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orgReq = await fetch('http://localhost:3000/api/organizations')
        const organization: Organizations[] = await orgReq.json()
        setOrganizations(organization)
      } catch (error) {
        console.error('Failed to fetch ledgers:', error)
      }
    }

    fetchData()
  }, [])

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
      <PageTitle title="Organizations" />
      <div className="mt-5">
        <DataTable columns={columns} data={organizations} />
      </div>
    </div>
  )
}

export default Page
