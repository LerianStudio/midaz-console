import { PageTitle } from '@/components/PageTitle'
import Breadcrumb from '@/components/Breadcrumb'

const Page = () => {
  const breadcrumbPaths = [
    { name: 'My organizations', href: '/organizations', active: false },
    { name: 'Organizations', href: '/organizations', active: true }
  ]

  return (
    <div>
      <Breadcrumb paths={breadcrumbPaths} />
      <PageTitle title="Organizations" />
    </div>
  )
}

export default Page
