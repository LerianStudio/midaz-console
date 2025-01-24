import { useListAssets } from '@/client/assets'
import { InputField, SelectField } from '@/components/form'
import { Paper } from '@/components/ui/paper'
import { SelectItem } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { Control } from 'react-hook-form'
import { useIntl } from 'react-intl'
import DolarSign from '/public/svg/dolar-sign.svg'
import Image from 'next/image'
import { useParams } from 'next/navigation'

export type BasicInformationPaperProps = {
  control: Control<any>
  readOnly?: boolean
}

export const BasicInformationPaper = ({
  control,
  readOnly = false
}: BasicInformationPaperProps) => {
  const intl = useIntl()
  const { id } = useParams<{ id: string }>()
  const { currentOrganization } = useOrganization()

  const { data: assets } = useListAssets({
    organizationId: currentOrganization.id!,
    ledgerId: id
  })

  console.log('control teste', control)

  return (
    <Paper className="mb-6 flex flex-col">
      <p className="p-6 text-sm font-medium text-shadcn-400">
        {intl.formatMessage({
          id: 'transactions.create.paper.description',
          defaultMessage:
            'Fill in the details of the Transaction you want to create.'
        })}
      </p>
      <Separator orientation="horizontal" />
      <div className="grid grid-cols-2 gap-5 p-6">
        <InputField
          name="description"
          label={intl.formatMessage({
            id: 'transactions.field.description',
            defaultMessage: 'Transaction description'
          })}
          description={intl.formatMessage({
            id: 'common.optional',
            defaultMessage: 'Optional'
          })}
          control={control}
          maxHeight={100}
          textArea
        />
        <InputField
          name="chartOfAccountsGroupName"
          label={intl.formatMessage({
            id: 'transactions.create.field.chartOfAccountsGroupName',
            defaultMessage: 'Accounting route group'
          })}
          description={intl.formatMessage({
            id: 'common.optional',
            defaultMessage: 'Optional'
          })}
          control={control}
          disabled={readOnly}
        />
      </div>
      <Separator orientation="horizontal" />
      <div className="grid grid-cols-4 gap-5 p-6">
        <div className="col-span-2">
          <InputField
            name="value"
            type="number"
            label={intl.formatMessage({
              id: 'entity.transaction.value',
              defaultMessage: 'Value'
            })}
            control={control}
            disabled={readOnly}
          />
        </div>
        <SelectField
          name="asset"
          label={intl.formatMessage({
            id: 'entity.transaction.asset',
            defaultMessage: 'Asset'
          })}
          control={control}
          disabled={readOnly}
        >
          {assets?.items?.map((asset) => (
            <SelectItem key={asset.code} value={asset.code} disabled={readOnly}>
              {asset.code}
            </SelectItem>
          ))}
        </SelectField>
        <div className="flex items-end justify-end">
          <Image alt="" src={DolarSign} />
        </div>
      </div>
    </Paper>
  )
}
