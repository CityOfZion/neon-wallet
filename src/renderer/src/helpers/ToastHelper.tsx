import { ErrorToast, InfoToast, SuccessToast } from '@renderer/libs/sonner'
import { toast } from 'sonner'

import { UtilsHelper } from './UtilsHelper'

type TToastProp = {
  message: string
  id?: string | number
}

export class ToastHelper {
  static success(props: TToastProp) {
    const customId = props.id ?? UtilsHelper.uuid()
    toast.custom(sonnerId => <SuccessToast sonnerId={sonnerId} message={props.message} />, { id: customId })
  }

  static error(props: TToastProp) {
    const customId = props.id ?? UtilsHelper.uuid()
    toast.custom(sonnerId => <ErrorToast sonnerId={sonnerId} message={props.message} />, { id: customId })
  }

  static info(props: TToastProp) {
    const customId = props.id ?? UtilsHelper.uuid()
    toast.custom(sonnerId => <InfoToast sonnerId={sonnerId} message={props.message} />, { id: customId })
  }
}
