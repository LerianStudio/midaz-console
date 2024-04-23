import { toast } from 'react-hot-toast'
import { Check, X, AlertTriangle, Info, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const customToast = (message: string, icon: JSX.Element, bgColor: string) => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } pointer-events-auto flex w-full max-w-[330px] rounded-lg bg-white px-4 py-5 shadow-lg`}
      >
        <div className="flex flex-1">
          <div className="flex items-center gap-[10px]">
            <div className={cn('rounded-md p-2', bgColor)}>{icon}</div>
            <div className="w-full min-w-[234px] text-wrap">
              <p className="text-sm font-medium text-shadcn-500">{message}</p>
            </div>
          </div>
          <button onClick={() => toast.dismiss(t.id)} className="flex">
            <X className="text-[#9CA3AF]" size={20} />
          </button>
        </div>
      </div>
    ),
    {
      duration: 99999
    }
  )
}

const useCustomToast = () => {
  const showSuccess = (message: string) => {
    customToast(
      message,
      <Check size={16} className="text-[#009F6F]" />,
      'bg-[#D1FAE5]'
    )
  }

  const showError = (message: string) => {
    customToast(
      message,
      <XCircle size={16} className="text-[#EF4444]" />,
      'bg-[#FEE2E2]'
    )
  }

  const showInfo = (message: string) => {
    customToast(
      message,
      <Info size={16} className="text-[#2563EB]" />,
      'bg-[#BFDBFE]'
    )
  }

  const showWarning = (message: string) => {
    customToast(
      message,
      <AlertTriangle size={16} className="text-[#FBBF24]" />,
      'bg-yellow-100'
    )
  }

  return { showSuccess, showError, showInfo, showWarning }
}

export default useCustomToast
