import Image from 'next/image'
import { OrganizationsData } from '@/core/domain/entities/organization-switcher-entity'
import { useIntl } from 'react-intl'
import { PopoverContent } from '../ui/popover'
import { StatusDisplay } from './status'
import { ArrowRight, Settings } from 'lucide-react'
import Link from 'next/link'
import {
  PopoverPanel,
  PopoverPanelActions,
  PopoverPanelContent,
  PopoverPanelFooter,
  PopoverPanelLink,
  PopoverPanelTitle
} from './popover-panel'

export type OrganizationSwitcherProps = {
  data: OrganizationsData[]
  orgName: string
  status: 'active' | 'inactive'
  image: string
  alt: string
}

export type OrganizationSwitcherContentProps = OrganizationSwitcherProps & {
  onClose: () => void
}

export const OrganizationSwitcherContent = ({
  orgName,
  status,
  alt,
  image,
  data,
  onClose
}: OrganizationSwitcherContentProps) => {
  const intl = useIntl()

  return (
    <PopoverContent className="flex w-auto gap-4" side="right">
      <PopoverPanel>
        <PopoverPanelTitle>
          {orgName}
          <StatusDisplay status={status} />
        </PopoverPanelTitle>
        <PopoverPanelContent>
          <Image
            src={image}
            alt={alt}
            className="rounded-full"
            height={112}
            width={112}
          />
        </PopoverPanelContent>
        <PopoverPanelFooter>
          <Link href="/settings?tab=organizations" onClick={onClose}>
            {intl.formatMessage({
              id: 'common.edit',
              defaultMessage: 'Edit'
            })}
          </Link>
        </PopoverPanelFooter>
      </PopoverPanel>

      <PopoverPanelActions>
        {data.map((organization) => (
          <PopoverPanelLink
            key={organization.id}
            href={`/${organization.id}`}
            icon={<ArrowRight />}
            dense={data.length >= 4}
            onClick={onClose}
          >
            <Image
              src={organization.image}
              alt={organization.alt}
              className="rounded-full"
              height={24}
            />

            {organization.name}
          </PopoverPanelLink>
        ))}

        <PopoverPanelLink
          href="/settings?tab=organizations"
          dense={data.length >= 4}
          onClick={onClose}
          icon={<Settings />}
        >
          {intl.formatMessage({
            id: 'entity.organization',
            defaultMessage: 'Organization'
          })}
        </PopoverPanelLink>
      </PopoverPanelActions>
    </PopoverContent>
  )
}
