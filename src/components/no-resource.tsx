import { Button } from '@/components/ui/button'
import NoResourceImage from '../../public/images/no-resource.png'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import { useIntl } from 'react-intl'

type Props = {
  resourceName: string
  pronoun: string
  onClick?: () => void
}

type PronounText = {
  possessive: string
  object: string
}

/**
 * TODO: This solution is not gonna work like this,
 * Needs refactor
 * @param param0
 * @returns
 */
export const NoResource = ({ resourceName, onClick, pronoun }: Props) => {
  const intl = useIntl()

  const pronounTexts: Record<string, PronounText> = {
    he: {
      possessive: intl.formatMessage({
        id: 'emptyState.pronouns.he.possessive',
        defaultMessage: 'your first'
      }),
      object: intl.formatMessage({
        id: 'emptyState.pronouns.he.object',
        defaultMessage: 'none'
      })
    },
    she: {
      possessive: intl.formatMessage({
        id: 'emptyState.pronouns.she.possessive',
        defaultMessage: 'your first'
      }),
      object: intl.formatMessage({
        id: 'emptyState.pronouns.she.object',
        defaultMessage: 'none'
      })
    }
  }

  const { object } = pronounTexts[pronoun] || pronounTexts['he']

  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-lg bg-white shadow-dataTable">
      <div className="flex w-full flex-col items-center justify-center gap-4 p-6">
        <div className="flex flex-col items-center gap-6">
          <Image src={NoResourceImage} alt="No Resource" />
          <div className="flex w-fit justify-center">
            <p className="text-center text-sm font-medium text-shadcn-400">
              {intl.formatMessage({
                id: 'emptyState.texts.hasNoResource',
                defaultMessage: "You don't have any yet"
              })}{' '}
              {object}{' '}
              {resourceName[0].toUpperCase() + resourceName.substring(1)}.{' '}
            </p>
          </div>
        </div>
        <div className="flex">
          <Button
            variant="outline"
            size="default"
            className="w-fit rounded-lg border-shadcn-300 text-[#52525b]"
            onClick={onClick}
            icon={<Plus className="text-[#52525B]" />}
          >
            {intl.formatMessage({
              id: 'common.create',
              defaultMessage: 'Create'
            })}{' '}
            {resourceName}
          </Button>
        </div>
      </div>
      <div className="w-full border-t px-6 py-5">
        <p className="text-sm font-normal italic text-shadcn-400">
          Nenhum ledger encontrado.
        </p>
      </div>
    </div>
  )
}
