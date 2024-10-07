import { EntityBox } from '@/components/entity-box'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MoreVertical, Plus, Trash } from 'lucide-react'
import { useIntl } from 'react-intl'
import { ProductsSheet } from './products-sheet'
import React from 'react'

const products = [
  {
    id: '00001-PRD',
    name: 'BR Standard',
    metadata: 'Test'
  },
  {
    id: '00002-PRD',
    name: 'BR Gold',
    metadata: 'Test'
  },
  {
    id: '00003-PRD',
    name: 'BR VIP',
    metadata: 'Test'
  }
]

export const ProductsTabContent = () => {
  const intl = useIntl()
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <ProductsSheet
        open={open}
        onOpenChange={(value: boolean) => setOpen(value)}
      />

      <EntityBox.Root>
        <EntityBox.Header
          title={intl.formatMessage({
            id: 'ledgers.products.title',
            defaultMessage: 'Products'
          })}
          subtitle={intl.formatMessage({
            id: 'ledgers.products.subtitle',
            defaultMessage:
              'Clustering or allocation of customers at different levels.'
          })}
        />
        <EntityBox.Actions>
          <Button variant="secondary">
            <Plus onClick={() => setOpen(true)} />
          </Button>
        </EntityBox.Actions>
      </EntityBox.Root>

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
                  id: 'common.name',
                  defaultMessage: 'Name'
                })}
              </TableHead>
              <TableHead>
                {intl.formatMessage({
                  id: 'common.metadata',
                  defaultMessage: 'Metadata'
                })}
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
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.metadata}</TableCell>
                <TableCell className="w-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary">
                        <MoreVertical size={16} onClick={() => {}} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => {}}>
                        {intl.formatMessage({
                          id: `common.edit`,
                          defaultMessage: 'Edit'
                        })}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        {intl.formatMessage({
                          id: `common.inactivate`,
                          defaultMessage: 'Inactivate'
                        })}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="flex gap-3"
                        onClick={() => {}}
                      >
                        {intl.formatMessage({
                          id: `common.delete`,
                          defaultMessage: 'Delete'
                        })}
                        <Trash size={16} className="text-shadcn-400" />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
