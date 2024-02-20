import Breadcrumb, { BreadcrumbPath } from '@/components/Breadcrumb'
import { PageTitle } from '@/components/PageTitle'

const Page = () => {
  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'All transactions', href: '/transactions', active: false },
    { name: 'Transactions', href: '/transactions', active: true }
  ]

  return (
    <div>
      <Breadcrumb paths={breadcrumbPaths} />
      <PageTitle title="Transactions" />
    </div>
  )
}

export default Page
