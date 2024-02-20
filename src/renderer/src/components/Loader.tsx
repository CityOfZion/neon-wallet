import { TbLoader2 } from 'react-icons/tb'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

type TProps = {
  flat?: boolean
  className?: string
}

export const Loader = ({ flat, className }: TProps) => {
  return (
    <div className={StyleHelper.mergeStyles('flex justify-center w-full', className)}>
      <TbLoader2 className={StyleHelper.mergeStyles('animate-spin', { 'w-6 h-6': !flat, 'w-5 h-5': flat })} />
    </div>
  )
}
