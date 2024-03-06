import Breadcrumb from '../components/Breadcrumb'
import { DataTable } from '../components/DataTable'
import { Button } from '../components/ui/button'
import { ArrowRight } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { Organizations } from '@/types/OrganizationsType'
import useSWR from 'swr'
import { fetcher } from '../lib/fetcher'
import { Skeleton } from '../components/ui/skeleton'
import MainLayout from '../components/MainLayout'

const Page = () => {
  const { data, isLoading } = useSWR<Organizations[]>(
    '/api/organizations',
    fetcher
  )

  const breadcrumbPaths = [
    { name: 'x', active: false },
    {
      name: 'x',
      href: '/organizations',
      active: true
    }
  ]

  const columns: ColumnDef<Organizations>[] = [
    {
      accessorKey: 'name',
      header: 'x'
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
    <MainLayout>
      <Breadcrumb paths={breadcrumbPaths} />
      {!isLoading ? (
        <DataTable columns={columns} data={data || []} />
      ) : (
        <Skeleton className="h-[100px] w-full rounded-md" />
      )}
    </MainLayout>
  )
}

export default Page
