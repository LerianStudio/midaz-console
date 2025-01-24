import { TableCell } from '@/components/ui/table'
import { Metadata } from '@/types/metadata-type'
import { useIntl } from 'react-intl'

export type MetadataTableCellProps = {
  metadata?: Metadata
}

export const MetadataTableCell = ({ metadata }: MetadataTableCellProps) => {
  const intl = useIntl()

  return (
    <TableCell>
      {intl.formatMessage(
        {
          id: 'common.table.metadata',
          defaultMessage:
            '{number, plural, =0 {-} one {# record} other {# records}}'
        },
        {
          number: Object.entries(metadata || []).length
        }
      )}
    </TableCell>
  )
}
