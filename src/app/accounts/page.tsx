import Breadcrumb, { BreadcrumbPath } from '@/components/Breadcrumb'
import { PageTitle } from '@/components/PageTitle'

const Page = () => {
  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'All accounts', href: '/accounts', active: false },
    { name: 'Accounts', href: '/accounts', active: true }
  ]

  return (
    <div>
      <Breadcrumb paths={breadcrumbPaths} />
      <PageTitle title="Accounts" />
    </div>
  )
}

export default Page
