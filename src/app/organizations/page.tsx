'use client'

import { PageTitle } from '@/components/PageTitle'
import Breadcrumb from '@/components/Breadcrumb'
import { DataTable } from '@/components/DataTable'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { fetchOrganization } from '@/client/organizationsClient'
import { Organizations } from '@/types/OrganizationsType'

const Page = () => {
  const [organizations, setOrganizations] = useState<Organizations[]>([])

  const breadcrumbPaths = [
    { name: 'My organizations', href: '/organizations', active: false },
    { name: 'Organizations', href: '/organizations', active: true }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchOrganization()
        setOrganizations(response)
      } catch (error) {
        console.error('Failed to fetch ledgers:', error)
      }
    }

    fetchData()
  }, [])

  const columns: ColumnDef<Organizations>[] = [
    {
      accessorKey: 'name',
      header: 'Name'
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <Button size="icon" onClick={() => 'clicked'} variant="secondary">
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
