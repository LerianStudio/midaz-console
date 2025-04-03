import { Meta, StoryObj } from '@storybook/react'
import { Toaster } from './toaster'
import { Toast, ToastAction } from '.'
import { Button } from '../button'
import { useToast } from '@/hooks/use-toast'

const meta: Meta<typeof Toast> = {
  title: 'Primitives/Toast',
  component: Toast
}

export default meta

export const Default: StoryObj<typeof Toast> = {
  render: (args) => {
    const { toast } = useToast()

    const handleClick = () => {
      toast({
        title: 'Toast Title',
        description: 'Toast Description',
        action: <ToastAction altText="Action">Action</ToastAction>,
        variant: args.variant
      })
    }

    return (
      <div className="flex h-96 flex-col items-center justify-center">
        <Button onClick={handleClick}>Show Toast</Button>
        <Toaster />
      </div>
    )
  }
}
