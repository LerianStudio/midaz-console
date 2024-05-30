import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import useCustomToast from '@/hooks/useCustomToast'
import { Arrow } from '@radix-ui/react-tooltip'
import { Copy } from 'lucide-react'
import { useTranslations } from 'next-intl'

type InfoTooltipProps = {
  subtitle: string
}

export const InfoTooltip = ({ subtitle }: InfoTooltipProps) => {
  const t = useTranslations()
  const { showInfo } = useCustomToast()

  const handleCopyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value)
    showInfo(t('genericCopyMessage'))
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger onClick={() => handleCopyToClipboard(subtitle)}>
          <Copy size={16} className="cursor-pointer" />
        </TooltipTrigger>

        <TooltipContent className="border-none bg-shadcn-600" arrowPadding={0}>
          <p className="text-sm font-medium text-shadcn-400">{subtitle}</p>
          <p className="text-center text-white">{t('tooltipCopyText')}</p>
          <Arrow height={8} width={15} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
