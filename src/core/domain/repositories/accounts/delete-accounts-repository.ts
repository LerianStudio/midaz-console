export interface DeleteAccountsRepository {
  delete: (
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    accountId: string
  ) => Promise<void>
}
