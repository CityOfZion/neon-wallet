import { cloneElement, ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  icon: JSX.Element
  text?: string
  size?: 'sm' | 'md'
} & ComponentProps<'button'>

export const IconButton = ({ text, icon, size = 'sm', ...props }: Props) => {
  return (
    <button
      {...props}
      className={twMerge(
        props.className,
        'flex flex-col h-fit gap-y-1 justify-center items-center disabled:cursor-not-allowed flex-grow-0 hover:bg-gray-200/15 rounded transition-colors',
        size === 'sm' ? 'py-1 px-2' : 'py-1.5 px-3'
      )}
    >
      {cloneElement(icon, {
        className: twMerge(
          'fill-gray-100/50 object-contain',
          size === 'sm' ? 'w-4 h-4 ' : 'w-6 h-6',
          icon.props.className
        ),
        ...icon.props,
      })}
      {text && <span className="text-2xs text-on-surface/50 whitespace-nowrap">{text}</span>}
    </button>
  )
}
