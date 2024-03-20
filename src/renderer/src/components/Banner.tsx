import { ComponentProps, ReactNode } from 'react'
import { MdInfoOutline, MdVerified } from 'react-icons/md'
import { TbAlertHexagonFilled, TbAlertSmall, TbAlertTriangle } from 'react-icons/tb'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

export type TBannerType = 'info' | 'error' | 'success' | 'warning' | 'warningOrange'

export type TBanner = {
  type: TBannerType
  message: ReactNode
}

type TProps = TBanner & ComponentProps<'div'>

const iconByType: Record<TBannerType, JSX.Element> = {
  error: <TbAlertHexagonFilled className="w-6 h-6 text-pink" />,
  info: <MdInfoOutline className="w-6 h-6 text-blue" />,
  success: <MdVerified className="w-6 h-6 text-green" />,
  warning: <TbAlertTriangle className="w-6 h-6 text-yellow" />,
  warningOrange: (
    <div className="flex h-full items-center justify-center relative">
      <TbAlertSmall className="text-orange w-6 h-6" />
      <div className="absolute w-4 h-4 border-2 border-orange rotate-45 rounded-sm"></div>
    </div>
  ),
}

export const Banner = ({ message, type, className, ...props }: TProps) => {
  return (
    <div
      className={StyleHelper.mergeStyles('flex bg-gray-300/15 rounded-md overflow-hidden items-center', className)}
      {...props}
    >
      <div className="flex py-3 px-4 h-full items-center justify-center bg-gray-300/30">{iconByType[type]}</div>

      <p className="px-5 text-xs text-white py-2">{message}</p>
    </div>
  )
}
