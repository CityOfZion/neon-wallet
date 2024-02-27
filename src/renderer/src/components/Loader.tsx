import { TbLoader2 } from 'react-icons/tb'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

type TProps = {
  containerClassName?: string
  className?: string
}

export const Loader = ({ containerClassName, className }: TProps) => {
  return (
    <div className={StyleHelper.mergeStyles('flex justify-center w-full', containerClassName)}>
      <TbLoader2 className={StyleHelper.mergeStyles('animate-spin w-6 h-6', className)} />
    </div>
  )
}
