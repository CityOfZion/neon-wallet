import { ComponentProps } from 'react'
import { Separator } from '@renderer/components/Separator'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

type TProps = {
  title: string
  actions?: JSX.Element
} & ComponentProps<'div'>

export const AccountDetailsLayout = ({ title, actions, children, className, ...props }: TProps): JSX.Element => {
  return (
    <div className={StyleHelper.mergeStyles('w-full flex flex-col flex-grow px-4 py-3 min-h-0', className)} {...props}>
      <div className="flex justify-between items-center text-sm mb-3 max-h-[1.75rem] h-full">
        <h1 className="text-white text-sm">{title}</h1>

        {actions}
      </div>

      <Separator />

      {children}
    </div>
  )
}
