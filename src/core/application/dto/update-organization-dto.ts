// {
//   "legalName": "Sanchez Tech LTDA",
//   "parentOrganizationId": "8cc11bfe-f90f-4a98-ae51-61571f69f75e",
//   "doingBusinessAs": "The ledger.io",
//   "address": {
//     "line1": "Avenida Paulista, 1234",
//     "line2": "CJ 203",
//     "zipCode": "04696040",
//     "city": "Sao Paulo",
//     "state": "SP",
//     "country": "BR"
//   },
//   "status": {
//     "code": "MY_CODE",
//     "description": "MY_DESCRIPTION"
//   }
// }

import { AddressDto } from './address-dto'
import { StatusDto } from './status.dto'

export interface UpdateOrganizationDto {
  legalName?: string
  parentOrganizationId?: string
  doingBusinessAs?: string
  address?: AddressDto
  status?: StatusDto
  metadata?: Record<string, any>
}
