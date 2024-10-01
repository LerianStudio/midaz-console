import { PanelLeftClose, PanelRightClose } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'
import { useIntl } from 'react-intl'
import { SidebarFooter } from './sidebar'

export type SidebarExpandButtonProps = {
  collapsed?: boolean
  onClick?: React.MouseEventHandler
}

export const SidebarExpandButton = ({
  collapsed,
  onClick
}: SidebarExpandButtonProps) => {
  const intl = useIntl()

  return (
    <>
      {!collapsed && (
        <div className="flex w-full border-shadcn-200">
          <div className="absolute bottom-4 right-[-20px]">
            <Button
              variant="white"
              className="rounded-full border border-shadcn-200 p-2"
              onClick={onClick}
            >
              <PanelLeftClose className="text-shadcn-400" />
            </Button>
          </div>
        </div>
      )}

      {collapsed && (
        <SidebarFooter>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                className="group/expand-button rounded-sm bg-transparent p-2 text-shadcn-400 hover:bg-accent"
                onClick={onClick}
              >
                <PanelRightClose className="group-hover/expand-button:text-white dark:text-white" />
              </TooltipTrigger>
              <TooltipContent side="right">
                {intl.formatMessage({
                  id: 'common.expand',
                  defaultMessage: 'Expand'
                })}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </SidebarFooter>
      )}
    </>
  )
}
