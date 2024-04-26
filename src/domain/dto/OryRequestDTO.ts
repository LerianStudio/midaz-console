export interface OrySubmitLoginRequestDTO {
  identifier: string
  password: string
  nextActionUrl: string
  csrfToken: string
  csrfCookie: string
}
