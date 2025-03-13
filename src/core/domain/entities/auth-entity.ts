export interface AuthEntity {
  username: string
  password: string
}

export interface AuthResponseEntity {
  access_token: string
  refresh_token: string
  id_token: string
  token_type: string
  expires_in: number
  scope: string
}

export interface AuthSessionEntity {
  id: string
  username: string
  name: string
  access_token: string
  refresh_token: string
  id_token: string
}
