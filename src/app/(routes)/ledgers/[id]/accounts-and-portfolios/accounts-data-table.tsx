import React from 'react'
import { useIntl } from 'react-intl'

import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody
} from '@/components/ui/table'
import { Minus } from 'lucide-react'
import useCustomToast from '@/hooks/use-custom-toast'
import { useCreateUpdateSheet } from '@/components/sheet/use-create-update-sheet'
import { isNil } from 'lodash'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Arrow } from '@radix-ui/react-tooltip'
import { truncateString } from '@/helpers'

interface AccountEntity {
  id?: string
  ledgerId?: string
  organizationId?: string
  parentAccountId?: string | null
  portfolioName?: string | null
  productId?: string | null
  entityId?: string | null
  name: string
  alias: string
  type: string
  assetCode: string
  status: {
    code: string
    description: string
  }
  metadata: Record<string, any>
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

type AccountsTableProps = {
  accounts: { items: AccountEntity[] }
  isLoading: boolean
  table: {
    getRowModel: () => {
      rows: { id: string; original: AccountEntity }[]
    }
  }
  handleDialogOpen: (id: string, name: string) => void
  refetch: () => void
  isTableExpanded: boolean
}

type AccountRowProps = {
  account: { id: string; original: AccountEntity }
  handleCopyToClipboard: (value: string, message: string) => void
  handleDialogOpen: (id: string, name: string) => void
}

const AccountRow: React.FC<AccountRowProps> = ({
  account,
  handleCopyToClipboard,
  handleDialogOpen
}) => {
  const intl = useIntl()
  const id = account.original.id || ''
  const displayId =
    account.original.id && account.original.id.length > 8
      ? `${truncateString(account.original.id, 8)}`
      : account.original.id
  const status = account.original.status
  const badgeVariant = status.code === 'ACTIVE' ? 'active' : 'inactive'
  const metadataCount = Object.entries(account.original.metadata || []).length

  return (
    <TableRow key={account.id}>
      <TableCell>
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger
              onClick={() =>
                handleCopyToClipboard(
                  id,
                  intl.formatMessage({
                    id: 'ledgers.toast.copyId',
                    defaultMessage: 'The id has been copied to your clipboard.'
                  })
                )
              }
            >
              <p className="text-shadcn-600 underline">{displayId}</p>
            </TooltipTrigger>
            <TooltipContent
              className="border-none bg-shadcn-600"
              arrowPadding={0}
            >
              <p className="text-shadcn-400">{id}</p>
              <p className="text-center text-white">
                {intl.formatMessage({
                  id: 'ledgers.columnsTable.tooltipCopyText',
                  defaultMessage: 'Click to copy'
                })}
              </p>
              <Arrow height={8} width={15} />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>{account.original.name}</TableCell>
      <TableCell>{account.original.assetCode}</TableCell>
      <TableCell>
        {metadataCount === 0 ? (
          <Minus size={20} />
        ) : (
          intl.formatMessage(
            {
              id: 'common.table.metadata',
              defaultMessage:
                '{number, plural, =0 {-} one {# record} other {# records}}'
            },
            {
              number: metadataCount
            }
          )
        )}
      </TableCell>
      <TableCell>{account.original.portfolioName}</TableCell>
      <TableCell className="w-0">
        {/* ... DropdownMenu (similar to LedgerRow) ... */}
      </TableCell>
    </TableRow>
  )
}

export const AccountsDataTable: React.FC<AccountsTableProps> = ({
  accounts,
  table,
  handleDialogOpen,
  refetch,
  isTableExpanded
}) => {
  const intl = useIntl()
  const { handleCreate, sheetProps } = useCreateUpdateSheet<any>()
  const { showInfo } = useCustomToast()

  const handleCopyToClipboard = (value: string, message: string) => {
    navigator.clipboard.writeText(value)
    showInfo(message)
  }

  return (
    <div>
      {!isNil(accounts?.items) &&
        accounts?.items.length > 0 &&
        isTableExpanded && (
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {intl.formatMessage({
                      id: 'common.id',
                      defaultMessage: 'ID'
                    })}
                  </TableHead>
                  <TableHead>
                    {intl.formatMessage({
                      id: 'entity.account.name',
                      defaultMessage: 'Account Name'
                    })}
                  </TableHead>
                  <TableHead>
                    {intl.formatMessage({
                      id: 'entity.account.currency',
                      defaultMessage: 'Assets'
                    })}
                  </TableHead>
                  <TableHead>
                    {intl.formatMessage({
                      id: 'common.metadata',
                      defaultMessage: 'Metadata'
                    })}
                  </TableHead>
                  <TableHead>
                    {/* {intl.formatMessage({
                    id: 'common.metadata',
                    defaultMessage: 'Portfolio'
                  })} */}
                    Portfolio
                  </TableHead>
                  <TableHead className="w-0">
                    {intl.formatMessage({
                      id: 'common.actions',
                      defaultMessage: 'Actions'
                    })}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((account) => (
                  <AccountRow
                    key={account.id}
                    account={account}
                    handleCopyToClipboard={handleCopyToClipboard}
                    handleDialogOpen={handleDialogOpen}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

      {/* <AccountsSheet onSuccess={refetch} {...sheetProps} /> */}
    </div>
  )
}
