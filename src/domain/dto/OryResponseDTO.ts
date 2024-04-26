export interface OryCreateLoginFlowResponseDTO {
  nextActionUrl: string
  csrfToken: string
  csrfCookie: string
}

export interface OrySubmitLoginResponseDTO {
  sessionToken: string
  session: {
    id: string
  }
}
