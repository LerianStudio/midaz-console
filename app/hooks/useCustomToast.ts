import { useToast } from '@/components/ui/use-toast'

const useCustomToast = () => {
  const { toast } = useToast()

  const showSuccess = (message: string) => {
    toast({
      description: message,
      variant: 'success'
    })
  }

  const showError = (message: string) => {
    toast({
      description: message,
      variant: 'destructive'
    })
  }

  const showInfo = (message: string) => {
    toast({
      description: message
    })
  }

  const showWarning = (message: string) => {
    toast({
      description: message
    })
  }

  return { showSuccess, showError, showInfo, showWarning }
}

export default useCustomToast
