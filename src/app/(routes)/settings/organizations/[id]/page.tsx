'use client'

import { useRouter } from 'next/navigation'
import useCustomToast from '@/hooks/use-custom-toast'
import { Breadcrumb } from '@/components/breadcrumb'
import { PageHeader } from '@/components/page-header'
import { Skeleton } from '@/components/ui/skeleton'
import { useIntl } from 'react-intl'
import { useGetOrganization } from '@/client/organizations'
import { OrganizationsForm } from '../organizations-form'

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const intl = useIntl()
  const organizationId: string = params.id

  const { data, isPending } = useGetOrganization({ organizationId })
  const { showSuccess } = useCustomToast()

  const handleSuccess = () => {
    showSuccess(
      intl.formatMessage({
        id: 'organizations.toast.update.success',
        defaultMessage: 'Organization updated successfully!'
      })
    )
    router.push('/settings')
  }

  if (isPending && !data) {
    return <Skeleton className="h-screen bg-zinc-200" />
  }

  return (
    <>
      <Breadcrumb
        paths={[
          {
            name: intl.formatMessage({
              id: 'organizations.organizationView.breadcrumbs.settings',
              defaultMessage: 'Settings'
            }),
            href: `/settings`
          },
          {
            name: intl.formatMessage({
              id: 'organizations.organizationView.breadcrumbs.organizations',
              defaultMessage: 'Organizations'
            }),
            href: `/settings?tab=organizations`
          },
          {
            name: params.id
          }
        ]}
      />

      <PageHeader.Root>
        <PageHeader.Wrapper className="border-none">
          <PageHeader.InfoTitle
            title={data.legalName}
            subtitle={organizationId}
          >
            <PageHeader.InfoTooltip subtitle={data.id} />
          </PageHeader.InfoTitle>
          <PageHeader.ActionButtons>
            <PageHeader.StatusButton />
          </PageHeader.ActionButtons>
        </PageHeader.Wrapper>
      </PageHeader.Root>

      <OrganizationsForm data={data} onSuccess={handleSuccess} />
    </>
  )
}

export default Page
