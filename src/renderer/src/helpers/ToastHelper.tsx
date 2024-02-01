import { ErrorToast, SuccessToast, TBaseToastProps } from '@renderer/libs/sonner'
import { toast } from 'sonner'

export class ToastHelper {
  static success(props: Pick<TBaseToastProps, 'message'>) {
    toast.custom(sonnerId => <SuccessToast sonnerId={sonnerId} {...props} />, {})
  }

  static error(props: Pick<TBaseToastProps, 'message'>) {
    toast.custom(sonnerId => <ErrorToast sonnerId={sonnerId} {...props} />)
  }
}
