export interface OrySessionEntity {
  id: string
  sessionId: string
  sessionToken: string
  active: boolean
  expiresAt: string
  authenticatedAt: string
  userInfo: UserInfo
}

interface UserInfo {
  name: string
  email: string
  company: CompanyInfo
}

interface CompanyInfo {
  city: string
  name: string
  state: string
  address: string
  country: string
  document: string
  trade_name: string
  additional_address: string
}
