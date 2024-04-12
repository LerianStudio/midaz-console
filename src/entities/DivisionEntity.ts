

export type DivisionEntity = {
  id: string
  doingBusinessAs: string
  legalName: string
  legalDocument: string
  address: {
    country: string
    state: string
  }
}
