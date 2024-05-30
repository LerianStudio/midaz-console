import { Button } from '@/components/ui/button/button'
import NoResourceLogo from '../../public/images/no-resource.png'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

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

  const { possessive, object } = pronounTexts[pronoun] || pronounTexts['he']

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex w-full max-w-[455px] flex-col items-center justify-center gap-4">
        <Image src={NoResourceLogo} alt="" />
        <h1 className="text-3xl">
          {t('texts.create')} {possessive} {resourceName}
        </h1>
        <div className="flex w-full justify-center">
          <div className="w-full max-w-[260px]">
            <p className="text-center text-xl">
              {t('texts.hasNoResource')} {object} {resourceName.toLowerCase()}.{' '}
              <br />
              {t('texts.create')} {possessive} {resourceName.toLowerCase()}{' '}
              {t('texts.clickBtnBelow')}.
            </p>
          </div>
        </div>
        <div className="flex">
          <Button
            className="w-fit rounded bg-sunglow-400 p-6 text-[18px] font-semibold text-black hover:bg-sunglow-400/60"
            onClick={onClick}
          >
            {t('texts.createBtn')} {resourceName}
          </Button>
        </div>
      </div>
    </div>
  )
}
