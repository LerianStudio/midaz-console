import { Card } from '@/components/card'
import { ILedgerType } from '@/types/ledgers-type'
import { useIntl } from 'react-intl'

type OverviewTabContentProps = {
  data: ILedgerType
}

export const OverviewTabContent = ({ data }: OverviewTabContentProps) => {
  const intl = useIntl()

  return (
    <div className="flex gap-6">
      <div className="flex flex-1 flex-col gap-6">
        <Card.Root>
          <Card.Header
            title={intl.formatMessage({
              id: 'common.identification',
              defaultMessage: 'Identification'
            })}
            className="text-lg font-semibold capitalize text-[#52525B]"
          />

          <Card.Content data={data} />
        </Card.Root>

        <Card.Root>
          <Card.Header title="Metadados" className="text-lg capitalize" />
          <Card.Metadata data={data} />
        </Card.Root>

        <Card.Root className="py-4">
          <Card.Header
            title={intl.formatMessage({
              id: 'common.resources',
              defaultMessage: 'Resources'
            })}
          />

          <Card.Resources />
        </Card.Root>
      </div>
    </div>
  )
}
