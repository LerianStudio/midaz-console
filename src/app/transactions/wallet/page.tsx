import { PageTitle } from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Page = () => {
  return (
    <div>
      <PageTitle title="Transactions - Wallet" />
      <Link href="/transactions">
        <Button variant="outline" className="mt-3">
          back
        </Button>
      </Link>
    </div>
  )
}

export default Page
