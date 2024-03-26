import { Button } from '@/components/ui/button/button'
import NoResourceLogo from '../../public/images/no-resource.png'
import Image from 'next/image'

type Props = {
  resourceName: string
  pronoun: string
  onClick: () => void
}

type PronounText = {
  possessive: string
  object: string
}

const pronounTexts: Record<string, PronounText> = {
  he: {
    possessive: 'seu primeiro',
    object: 'nenhum'
  },
  she: {
    possessive: 'sua primeira',
    object: 'nenhuma'
  }
}

export const NoResource = ({ resourceName, onClick, pronoun }: Props) => {
  const { possessive, object } = pronounTexts[pronoun] || pronounTexts['he']

  return (
    <div className="flex h-[calc(100vh-229px)] items-center justify-center">
      <div className="flex w-full max-w-[455px] flex-col items-center justify-center gap-4">
        <Image src={NoResourceLogo} alt="" />
        <h1 className="text-3xl">
          Crie {possessive} {resourceName}
        </h1>
        <div className="flex w-full justify-center">
          <div className="w-full max-w-[256px]">
            <h1 className="text-center text-xl">
              Parece que você ainda não possui {object}{' '}
              {resourceName.toLowerCase()}. Crie {possessive}{' '}
              {resourceName.toLowerCase()} clicando no botão abaixo.
            </h1>
          </div>
        </div>
        <div className="flex">
          <Button
            className="w-fit rounded bg-[#F9DF4BF5] p-6 text-[18px] font-semibold text-black hover:bg-[#F9DF4BF5]/60"
            onClick={onClick}
          >
            Criar {resourceName}
          </Button>
        </div>
      </div>
    </div>
  )
}
