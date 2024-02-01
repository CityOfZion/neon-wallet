import { cloneElement } from 'react'
import { MdCheckCircleOutline, MdClose, MdErrorOutline } from 'react-icons/md'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { toast, Toaster } from 'sonner'

export type TBaseToastProps = {
  message: string
  className?: string
  sonnerId: string | number
  icon?: JSX.Element
}

const BaseToast = ({ message, className, sonnerId, icon }: TBaseToastProps) => {
  return (
    <div
      className={StyleHelper.mergeStyles(
        'flex p-5 rounded items-center w-[22rem] text-sm font-medium gap-5 shadow-lg',
        className
      )}
    >
      {icon && cloneElement(icon, { className: StyleHelper.mergeStyles('w-6 h-6', icon.props.className) })}
      <p className="flex-grow">{message}</p>
      <MdClose className="w-6 h-6 opacity-50 cursor-pointer" onClick={() => toast.dismiss(sonnerId)} />
    </div>
  )
}

export const SuccessToast = ({ message, sonnerId }: Pick<TBaseToastProps, 'message' | 'sonnerId'>) => {
  return (
    <BaseToast
      className="bg-green-700 text-neon"
      message={message}
      sonnerId={sonnerId}
      icon={<MdCheckCircleOutline />}
    />
  )
}

export const ErrorToast = ({ message, sonnerId }: Pick<TBaseToastProps, 'message' | 'sonnerId'>) => {
  return (
    <BaseToast
      className="bg-pink-700 text-white"
      message={message}
      sonnerId={sonnerId}
      icon={<MdErrorOutline className="text-magenta" />}
    />
  )
}

export const ToastProvider = () => <Toaster position="bottom-center" expand gap={10} />
