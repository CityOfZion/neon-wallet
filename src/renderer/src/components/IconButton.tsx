import { cloneElement, ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

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
      className={twMerge(
        props.className,
        'flex flex-col h-fit  justify-center items-center disabled:cursor-not-allowed flex-grow-0 hover:bg-gray-200/15 rounded transition-colors',
        size === 'sm' ? 'py-1 px-2 gap-y-0.5' : 'py-1.5 px-3 gap-y-1'
      )}
    >
      {cloneElement(icon, {
        className: twMerge(
          'object-contain',
          size === 'sm' ? 'w-4 h-4 ' : 'w-6 h-6',
          filled ? 'fill-gray-200/50' : 'stroke-gray-200/50',
          icon.props.className
        ),
        ...icon.props,
      })}
      {text && <span className="text-2xs text-gray-200 whitespace-nowrap">{text}</span>}
    </button>
  )
}
