import { PageHeader } from '@/components/page-header'
import { useIntl } from 'react-intl'

type TransactionsHeaderProps = {
  hasLoadedLedger?: boolean
}

export const TransactionsHeader = ({
  hasLoadedLedger
}: TransactionsHeaderProps) => {
  const intl = useIntl()

  return (
    <PageHeader.Root>
      <PageHeader.Wrapper>
        <PageHeader.InfoTitle
          title={intl.formatMessage({
            id: 'transactions.title',
            defaultMessage: 'Transactions'
          })}
          subtitle={intl.formatMessage({
            id: 'transactions.subtitle',
            defaultMessage:
              'View, edit, and manage the transactions of a specific ledger..'
          })}
        />

        {hasLoadedLedger && (
          <PageHeader.ActionButtons>
            <PageHeader.CollapsibleInfoTrigger
              question={intl.formatMessage({
                id: 'transactions.helperTrigger.question',
                defaultMessage: 'What is a Transaction?'
              })}
            />
          </PageHeader.ActionButtons>
        )}
      </PageHeader.Wrapper>

      <PageHeader.CollapsibleInfo
        question={intl.formatMessage({
          id: 'transactions.helperTrigger.question',
          defaultMessage: 'What is a Transaction?'
        })}
        answer={intl.formatMessage({
          id: 'ledgers.helperTrigger.answer',
          defaultMessage:
            'Book with the record of all transactions and operations of the Organization.'
        })}
        seeMore={intl.formatMessage({
          id: 'ledgers.helperTrigger.seeMore',
          defaultMessage: 'Read the docs'
        })}
      />
    </PageHeader.Root>
  )
}
