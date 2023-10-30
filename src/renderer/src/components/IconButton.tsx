import { cloneElement, ComponentProps } from 'react'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

type Props = {
  icon: JSX.Element
  filled?: boolean
  text?: string
  size?: 'sm' | 'md'
} & ComponentProps<'button'>

export const IconButton = ({ text, icon, size = 'sm', filled = true, ...props }: Props) => {
  return (
    <button
      {...props}
      className={StyleHelper.mergeStyles(
        'flex flex-col h-fit  justify-center items-center disabled:cursor-not-allowed flex-grow-0 hover:enabled:bg-gray-200/15 rounded transition-colors',
        { 'py-1 px-2 gap-y-0.5': size === 'sm', 'py-1.5 px-3 gap-y-1': size === 'md' },
        props.className
      )}
    >
      {cloneElement(icon, {
        className: StyleHelper.mergeStyles(
          'object-contain',
          {
            'w-4 h-4': size === 'sm',
            'w-6 h-6': size === 'md',
            'fill-gray-200/50': filled,
            'stroke-gray-200/50': !filled,
          },
          icon.props.className
        ),
        ...icon.props,
      })}
      {text && <span className="text-2xs text-gray-200 whitespace-nowrap">{text}</span>}
    </button>
  )
}
