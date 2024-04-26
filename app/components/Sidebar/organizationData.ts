import { OrganizationsData } from '@/domain/entities/OrganizationSwitcherEntity'
import LerianLogo from '/public/svg/brand-lerian-symbol.svg'

export const getOrganizationData = (): OrganizationsData[] => {
  return [
    {
      id: 1,
      name: 'Lerian 1',
      image: LerianLogo,
      alt: 'Lerian Logo'
    }
  ]
}
