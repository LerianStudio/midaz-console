import { AccountsContent } from './accounts-content'
import { PortfoliosContent } from './portfolios-content'

export const AccountsPortfoliosTabContent = () => {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <PortfoliosContent />
      {/* <AccountsContent /> */}
    </div>
  )
}
