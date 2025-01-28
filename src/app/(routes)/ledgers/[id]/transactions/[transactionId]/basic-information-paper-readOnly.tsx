import { useListAssets } from '@/client/assets'
import { InputField } from '@/components/form'
import { Paper } from '@/components/ui/paper'
import { Separator } from '@/components/ui/separator'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { Control, Form, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import DolarSign from '/public/svg/dolar-sign.svg'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { ChangeEvent, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { LoadingButton } from '@/components/ui/loading-button'
import { ArrowRight } from 'lucide-react'
import { PageFooter, PageFooterSection } from '@/components/page-footer'

export type BasicInformationPaperProps = {
  control: Control<any>
  values: {
    chartOfAccountsGroupName?: string
    value?: number
    asset?: string
    description?: string
  }
  onCancel?: () => void
  onSave?: (description: string) => void
}

export const BasicInformationPaperReadOnly = ({
  control,
  values,
  onCancel,
  onSave
}: BasicInformationPaperProps) => {
  const intl = useIntl()
  const { id } = useParams<{ id: string }>()
  const { currentOrganization } = useOrganization()
  const [isEditing, setIsEditing] = useState(false)
  const [initialDescription, setInitialDescription] = useState(
    values.description || ''
  )
  const [currentDescription, setCurrentDescription] = useState(
    values.description || ''
  )

  const form = useForm({
    defaultValues: {
      description: initialDescription
    },
    values: {
      description: initialDescription
    }
  })

  useEffect(() => {
    console.log('values.description', values.description)
    setInitialDescription(values.description || '')
    setCurrentDescription(values.description || '')
  }, [values.description])

  const handleDescriptionChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value
    setCurrentDescription(newValue)
    setIsEditing(newValue !== initialDescription)
  }

  console.log(currentDescription, isEditing, values.description)

  const handleCancel = () => {
    setCurrentDescription(initialDescription)
    setIsEditing(false)
    console.log(initialDescription, currentDescription)
    form.reset({ description: initialDescription })
    console.log(values.description)
    onCancel?.()
  }

  const handleSave = () => {
    console.log(currentDescription, isEditing, values.description)
    onSave?.(currentDescription)
    setIsEditing(false)
  }

  const formatCurrency = (value: string | number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Number(value))
  }

  return (
    <Form {...form}>
      <Paper className="mb-6 flex flex-col">
        <div className="grid grid-cols-2 gap-5 p-6">
          <InputField
            name="description"
            label={intl.formatMessage({
              id: 'transactions.field.description',
              defaultMessage: 'Transaction description'
            })}
            control={control}
            maxHeight={100}
            textArea
            value={currentDescription}
            onChange={handleDescriptionChange}
          />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              {intl.formatMessage({
                id: 'transactions.create.field.chartOfAccountsGroupName',
                defaultMessage: 'Accounting route group'
              })}
            </label>
            <div className="flex h-9 items-center rounded-md bg-shadcn-100 px-3">
              {values?.chartOfAccountsGroupName}
            </div>
          </div>
        </div>
        <Separator orientation="horizontal" />
        <div className="grid grid-cols-4 gap-5 p-6">
          <div className="col-span-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                {intl.formatMessage({
                  id: 'entity.transaction.value',
                  defaultMessage: 'Value'
                })}
              </label>
              <div className="flex h-9 items-center rounded-md bg-shadcn-100 px-3">
                {formatCurrency(values.value || 0)}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              {intl.formatMessage({
                id: 'entity.transaction.asset',
                defaultMessage: 'Asset'
              })}
            </label>
            <div className="flex h-9 items-center rounded-md bg-shadcn-100 px-3">
              {values?.asset}
            </div>
          </div>
          <div className="flex items-end justify-end">
            <Image alt="" src={DolarSign} />
          </div>
        </div>
      </Paper>

      <PageFooter open={isEditing}>
        <PageFooterSection>
          <Button variant="outline" onClick={handleCancel}>
            {intl.formatMessage({
              id: 'common.cancel',
              defaultMessage: 'Cancel'
            })}
          </Button>
        </PageFooterSection>
        <PageFooterSection>
          <LoadingButton
            icon={<ArrowRight />}
            iconPlacement="end"
            onClick={handleSave}
          >
            {intl.formatMessage({
              id: 'common.save',
              defaultMessage: 'Save'
            })}
          </LoadingButton>
        </PageFooterSection>
      </PageFooter>
    </Form>
  )
}
