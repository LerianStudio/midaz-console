export interface DeleteLedgerRepository {
  delete: (organizationId: string, ledgerId: string) => Promise<void>
}
