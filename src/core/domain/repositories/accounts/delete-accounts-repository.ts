export abstract class DeleteAccountsRepository {
  abstract delete: (
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    accountId: string
  ) => Promise<void>
}
