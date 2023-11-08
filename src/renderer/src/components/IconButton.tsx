import { cloneElement, ComponentProps, forwardRef } from 'react'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

type TProps = {
  icon: JSX.Element
  filled?: boolean
  text?: string
  size?: 'sm' | 'md'
  compacted?: boolean
} & ComponentProps<'button'>

export const IconButton = forwardRef<HTMLButtonElement, TProps>(
  ({ text, icon, size = 'sm', filled = true, compacted, ...props }, ref) => {
    const { className: iconClassName, ...iconProps } = icon.props

    return (
      <button
        ref={ref}
        {...props}
        className={StyleHelper.mergeStyles(
          'flex flex-col h-fit  justify-center items-center disabled:cursor-not-allowed flex-grow-0 hover:enabled:bg-gray-300/15 rounded transition-colors',
          {
            'py-1 px-2 gap-y-0.5': size === 'sm' && !compacted,
            'py-0.5 px-0.5 gap-y-0.5': size === 'sm' && compacted,
            'py-1.5 px-3 gap-y-1': size === 'md' && !compacted,
            'py-1 px-1 gap-y-1': size === 'md' && compacted,
          },
          props.className
        )}
      >
        {cloneElement(icon, {
          className: StyleHelper.mergeStyles(
            'object-contain',
            {
              'w-4 h-4': size === 'sm',
              'w-6 h-6': size === 'md',
              'fill-gray-300/50': filled,
              'stroke-gray-300/50': !filled,
            },
            iconClassName
          ),
          ...iconProps,
        })}
        {text && <span className="text-2xs text-gray-300 whitespace-nowrap">{text}</span>}
      </button>
    )
  }
)
