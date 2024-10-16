import { Card } from '@/components/card'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { useIntl } from 'react-intl'

export const AccountsContent = () => {
  const intl = useIntl()
  return (
    <Card.Root>
      <div className="flex items-center justify-between">
        <div>
          <Card.Header title="Contas" className="text-lg capitalize" />
          <p className="mt-2 text-sm text-gray-500">
            {intl.formatMessage({
              id: `common.delete`,
              defaultMessage: 'Delete'
            })}
          </p>
        </div>

        <Button
          variant="outline"
          size="lg"
          disabled={true}
          className="flex items-center rounded-md px-4 py-2 shadow transition"
        >
          <span>
            {intl.formatMessage({
              id: `ledger.accounts.button.create.account`,
              defaultMessage: 'Create first account'
            })}
          </span>

          <PlusIcon className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </Card.Root>
  )
}
