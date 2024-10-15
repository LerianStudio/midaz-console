export interface AuthLoginDto {
  username: string
  password: string
  grant_type: string
  client_id: string
  client_secret: string
}

export interface AuthLoginResponseDto {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
  scope: string
}

export interface AuthSessionDto {
  id: string
  username: string
  name: string
  access_token: string
  refresh_token: string
}
