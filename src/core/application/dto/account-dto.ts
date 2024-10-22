import { StatusDto } from './status.dto'

export interface CreateAccountDto {
  name: string
  status: StatusDto
  alias: string
  type: string
  parentAccountId: string
  productId: string
  metadata: Record<string, any>
}

export interface AccountResponseDto {
  id: string
  ledgerId: string
  type: string
  entityId: string
  organizationId: string
  name: string
  status: StatusDto
  metadata: Record<string, any>
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

// export interface UpdateAccountDto {
//   name?: string
//   status?: StatusDto
//   metadata?: Record<string, any>
// }

// {
//   "assetCode":"BRL",
//   "name":"BRL deposit account", //optional, default = "{{asset}} {{type}} account"
//   "alias":"conta1",
//   "type":"deposit",
//   "entityId":null, //optional, default = portfolios.entityId
//   "parentAccountId":null, // optional, id of the parent
//   "productId":"aca9abcc-4dcd-454c-8ec1-b22df0e88795", // optional
//   "status":{
//      "code":"c346fed3-e915-4a19-b9fb-f63114a3e76b",
//      "description":"Random description to describe the code",
//      "allowSending":true,
//      "allowReceiving":true
//   },
//   "metadata":{
//      "country":"japan"
//   }
// }
