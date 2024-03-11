import { getNodeLabel } from '@ory/integrations/ui'
import { Button } from '../../components/ui/button'

import { NodeInputProps } from './helpers'

export function NodeInputSubmit<T>({
  node,
  attributes,
  disabled
}: NodeInputProps) {
  return (
    <Button
      className="h-auto w-full bg-[#F9DF4B] px-4 py-3 text-black hover:bg-[#F9DF4B]/50"
      name={attributes.name}
      value={attributes.value || ''}
      disabled={attributes.disabled || disabled}
    >
      {getNodeLabel(node)}
    </Button>
  )
}
