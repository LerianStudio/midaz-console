'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import useCustomToast from '@/hooks/useCustomToast'
import { BreadcrumbComponent, BreadcrumbPath } from '@/components/Breadcrumb'
import { OrganizationsType } from '@/types/OrganizationsType'
import { createOrganization } from '@/client/organizationClient'
import { cn } from '@/lib/utils'
import OrganizationsView from '@/app/[locale]/(routes)/settings/organizations/organizations-view'
import { FormDetailsProvider } from '@/context/FormDetailsContext'
import { ClientToastException } from '@/exceptions/client/clientToastException'

const Page = () => {
  const t = useTranslations('organizations.organizationView')
  const toastTranslator = useTranslations('organizations.toast')
  const pathname = usePathname()
  const intlBasePath = pathname.split('/').filter(Boolean)[0]
  const { showSuccess, showError } = useCustomToast()
  const router = useRouter()

  const breadCrumbPaths: BreadcrumbPath[] = [
    {
      name: t('breadcrumbs.settings'),
      href: `/settings`,
      active: true
    },
    {
      name: t('breadcrumbs.organizations'),
      href: `/settings?tab=organizations`,
      active: true
    },
    {
      name: t('breadcrumbs.newOrganization'),
      active: false
    }
  ]

  const handleOnSubmit = async (values: OrganizationsType) => {
    try {
      await createOrganization(values)
      showSuccess(
        toastTranslator('organizationCreateSuccess', {
          organizationName: values.legalName
        })
      )
      router.replace(`/${intlBasePath}/settings?tab=organizations`)
    } catch (error) {
      const errorMessage =
        error instanceof ClientToastException
          ? toastTranslator(error.messageAttributeName)
          : toastTranslator('genericError')

      return showError(errorMessage)
    }
  }

  return (
    <div>
      <BreadcrumbComponent paths={breadCrumbPaths} />
      <div className="mt-0">
        <div className="mb-12 mt-12">
          <h1 className={cn('text-4xl font-bold text-[#3f3f46]')}>
            {t('newOrganization.title')}
          </h1>
        </div>
        <FormDetailsProvider>
          <OrganizationsView onSubmit={handleOnSubmit} />
        </FormDetailsProvider>
      </div>
    </div>
  )
}

export default Page
