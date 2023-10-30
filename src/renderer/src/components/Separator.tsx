import { ComponentProps } from 'react'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

type TProps = ComponentProps<'div'>

export const Separator = ({ className, ...props }: TProps) => {
  return <div className={StyleHelper.mergeStyles('w-full h-px bg-gray-200/30', className)} {...props} />
}
