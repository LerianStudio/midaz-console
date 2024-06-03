import { Button } from '@/components/ui/button/button'
import NoResourceImage from '../../public/images/no-resource.png'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Plus } from 'lucide-react'

type Props = {
  resourceName: string
  pronoun: string
  onClick?: () => void
}

type PronounText = {
  possessive: string
  object: string
}

export const NoResource = ({ resourceName, onClick, pronoun }: Props) => {
  const t = useTranslations('emptyState')

  const pronounTexts: Record<string, PronounText> = {
    he: {
      possessive: t('pronouns.he.possessive'),
      object: t('pronouns.he.object')
    },
    she: {
      possessive: t('pronouns.she.possessive'),
      object: t('pronouns.she.object')
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
              {t('texts.hasNoResource')} {object}{' '}
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
            {t('texts.createBtn')} {resourceName}
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
