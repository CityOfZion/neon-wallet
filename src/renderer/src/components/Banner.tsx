import { ComponentProps } from 'react'
import { MdInfoOutline, MdVerified } from 'react-icons/md'
import { TbAlertHexagonFilled } from 'react-icons/tb'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

export type TBannerType = 'info' | 'error' | 'success'

export type TBanner = {
  type: TBannerType
  message: string
}

type TProps = TBanner & ComponentProps<'div'>

const iconByType: Record<TBannerType, JSX.Element> = {
  error: <TbAlertHexagonFilled className="w-6 h-6 text-pink" />,
  info: <MdInfoOutline className="w-6 h-6 fill-blue" />,
  success: <MdVerified className="w-6 h-6 fill-green" />,
}

export const Banner = ({ message, type, className, ...props }: TProps) => {
  return (
    <div
      className={StyleHelper.mergeStyles('flex bg-gray-300/15 rounded-md overflow-hidden items-center', className)}
      {...props}
    >
      <div className="py-3 px-4 bg-gray-300/30">{iconByType[type]}</div>

      <p className=" px-5 text-xs">{message}</p>
    </div>
  )
}
