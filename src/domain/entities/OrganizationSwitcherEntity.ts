export type OrganizationsData = {
  id: number
  name: string
  image: string
  alt: string
}

export type OrganizationLinkProps = {
  organization: OrganizationsData
  dataLength: number
  setIsPopoverOpen: (open: boolean) => void
}

export type StatusIndicatorProps = {
  status: 'active' | 'inactive'
  t?: any
}

export type OrganizationSwitcherProps = {
  data: OrganizationsData[]
  orgName: string
  status: 'active' | 'inactive'
  image: string
  alt: string
}

export type SwitcherTriggerProps = {
  image: string
  alt: string
  orgName: string
  isPopoverOpen: boolean
  isCollapsed: boolean
}

export type PopoverContentComponentProps = OrganizationSwitcherProps & {
  setIsPopoverOpen: (open: boolean) => void
}
