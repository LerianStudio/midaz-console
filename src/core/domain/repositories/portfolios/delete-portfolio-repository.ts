export interface DeletePortfolioRepository {
  delete: (
    organizationId: string,
    ledgerId: string,
    portfolioId: string
  ) => Promise<void>
}
