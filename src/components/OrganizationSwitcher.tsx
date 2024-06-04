'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { ArrowRight, ChevronDown, Settings } from 'lucide-react'
import Image from 'next/image'
import { Link } from 'navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  OrganizationLinkProps,
  OrganizationSwitcherProps,
  PopoverContentComponentProps,
  StatusIndicatorProps,
  SwitcherTriggerProps
} from '@/core/domain/entities/OrganizationSwitcherEntity'
import { useTranslations } from 'next-intl'

const OrganizationLink = ({
  organization,
  dataLength,
  setIsPopoverOpen
}: OrganizationLinkProps) => {
  return (
    <Link
      href={`/${organization.id}`}
      onClick={() => setIsPopoverOpen(false)}
      className={cn(
        'flex w-[320px] flex-1 items-center justify-between rounded-md bg-white p-4 text-black outline-none hover:bg-shadcn-100',
        dataLength >= 4 && 'h-10 flex-auto'
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-2',
          dataLength >= 4 && 'flex-row items-center'
        )}
      >
        <Image
          src={organization.image}
          alt={organization.alt}
          className="rounded-full"
          height={24}
        />

        <h2 className="text-sm font-medium text-[#52525b]">
          {organization.name}
        </h2>
      </div>
      <div>
        <ArrowRight size={24} className="text-shadcn-400" />
      </div>
    </Link>
  )
}

const StatusIndicator = ({ status }: StatusIndicatorProps) => (
  <div
    className={cn(
      'h-[10px] w-[10px] rounded-full',
      status === 'active' && 'bg-deYork-300',
      status === 'inactive' && 'bg-red-600'
    )}
  />
)

const StatusDisplay = ({ status, t }: StatusIndicatorProps) => (
  <div className="flex items-center gap-2">
    <StatusIndicator status={status} />
    <span className="text-xs font-medium text-shadcn-400">
      {status === 'active' && t('active')}
      {status === 'inactive' && t('inactive')}
    </span>
  </div>
)

const PopoverContentComponent = ({
  orgName,
  status,
  alt,
  image,
  data,
  setIsPopoverOpen
}: PopoverContentComponentProps) => {
  const t = useTranslations('organizationSwitcher')

  return (
    <PopoverContent className="flex w-auto gap-4" side="right">
      <div className="min-w-[160px] flex-1 rounded-md border border-shadcn-200 p-4">
        <div className="flex h-full flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-base font-semibold text-[#3f3f46]">
              {orgName}
            </h1>
            <StatusDisplay status={status} t={t} />
          </div>

          <div className="flex flex-1 items-center justify-center">
            <Image
              src={image}
              alt={alt}
              className="rounded-full"
              height={112}
            />
          </div>

          <div className={cn('mt-5', data.length >= 4 && 'mt-0')}>
            <Link
              href="/settings?tab=organizations"
              onClick={() => setIsPopoverOpen(false)}
              className="text-xs font-normal text-[#3F3F46] underline"
            >
              {t('edit')}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-auto flex-col gap-4">
        {data.map((organization) => (
          <OrganizationLink
            organization={organization}
            setIsPopoverOpen={setIsPopoverOpen}
            dataLength={data.length}
            key={organization.id}
          />
        ))}

        <Link
          href="/settings?tab=organizations"
          onClick={() => setIsPopoverOpen(false)}
          className={cn(
            'flex w-[320px] flex-1 items-center justify-between rounded-md bg-white p-4 text-black hover:bg-shadcn-100',
            data.length >= 4 && 'h-20 flex-auto'
          )}
        >
          <div>
            <h2 className="text-sm font-medium text-[#52525B]">
              {t('organizations')}
            </h2>
          </div>
          <div>
            <Settings size={24} className="text-shadcn-400" />
          </div>
        </Link>
      </div>
    </PopoverContent>
  )
}

const SwitcherTrigger = ({
  image,
  alt,
  orgName,
  isPopoverOpen,
  isCollapsed
}: SwitcherTriggerProps) => {
  return (
    <PopoverTrigger asChild>
      <div className="group flex items-center gap-3">
        <Image
          src={image}
          alt={alt}
          height={40}
          className={cn(
            'box-border rounded-lg border-[3px] p-[1px] group-hover:border-shadcn-300',
            isPopoverOpen && 'border-shadcn-400 group-hover:border-shadcn-400'
          )}
        />

        {!isCollapsed && (
          <h1
            className={cn(
              'text-sm font-medium capitalize text-shadcn-600',
              isPopoverOpen && 'text-shadcn-400'
            )}
          >
            {orgName}
          </h1>
        )}

        {!isCollapsed && (
          <ChevronDown
            size={16}
            className={cn('', isPopoverOpen && 'rotate-180 text-shadcn-400')}
          />
        )}
      </div>
    </PopoverTrigger>
  )
}

export const OrganizationSwitcher = ({
  image,
  alt,
  orgName,
  status,
  data,
  isCollapsed
}: OrganizationSwitcherProps & {
  isCollapsed: boolean
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <SwitcherTrigger
        image={image}
        alt={alt}
        orgName={orgName}
        isPopoverOpen={isPopoverOpen}
        isCollapsed={isCollapsed}
      />

      <PopoverContentComponent
        orgName={orgName}
        status={status}
        alt={alt}
        image={image}
        data={data}
        setIsPopoverOpen={setIsPopoverOpen}
      />
    </Popover>
  )
}
