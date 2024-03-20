import { ComponentProps } from 'react'
import { TbAlertTriangle } from 'react-icons/tb'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

export type TAlertErrorBanner = {
  message: string | JSX.Element
}

type TProps = TAlertErrorBanner & ComponentProps<'div'>

export const AlertErrorBanner = ({ message, className, ...props }: TProps) => {
  return (
    <div
      className={StyleHelper.mergeStyles('bg-magenta-700 rounded flex items-center pl-5 py-2.5 gap-5', className)}
      {...props}
    >
      <TbAlertTriangle className="text-magenta h-6 w-6" />
      <span className="text-xs">{message}</span>
    </div>
  )
}
