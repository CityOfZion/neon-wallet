import { cloneElement, ComponentProps, ReactNode } from 'react'
import { MdClose } from 'react-icons/md'
import { IconButton } from '@renderer/components/IconButton'
import { Separator } from '@renderer/components/Separator'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'

type TProps = {
  children?: ReactNode
  heading: JSX.Element | string
  headingIcon?: JSX.Element
  headingIconFilled?: boolean
  contentClassName?: string
} & ComponentProps<'div'>

export const ModalLayout = ({ heading, children, headingIcon, headingIconFilled = true, contentClassName }: TProps) => {
  const { modalNavigateWrapper } = useModalNavigate()

  return (
    <div className="w-[18.75rem] bg-gray-800 h-full px-4 text-white text-xs flex flex-col">
      <header className="flex justify-between items-center py-2.5">
        <div className="flex gap-x-2.5">
          {headingIcon &&
            cloneElement(headingIcon, {
              className: StyleHelper.mergeStyles('w-6 h-6', {
                'fill-blue': headingIconFilled,
                'stroke-blue': !headingIconFilled,
              }),
            })}
          <h2 className="text-sm">{heading}</h2>
        </div>

        <IconButton icon={<MdClose className="fill-white" />} size="md" compacted onClick={modalNavigateWrapper(-1)} />
      </header>

      <Separator />

      <main className={StyleHelper.mergeStyles('flex-grow py-10', contentClassName)}>{children}</main>
    </div>
  )
}
