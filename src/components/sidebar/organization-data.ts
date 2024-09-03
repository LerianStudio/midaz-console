import { OrganizationsData } from '@/core/domain/entities/organization-switcher-entity'
import MidazLogo from '/public/svg/brand-midaz.svg'

export const getOrganizationData = (): OrganizationsData[] => {
  return [
    {
      id: 1,
      name: 'Midaz 1',
      image: MidazLogo,
      alt: 'Midaz Logo'
    }
  ]
}
