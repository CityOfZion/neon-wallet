import { cloneElement, ComponentProps, forwardRef } from 'react'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

type TProps = {
  icon: JSX.Element
  text?: string
  size?: 'sm' | 'md'
  compacted?: boolean
  colorSchema?: 'neon' | 'gray'
} & ComponentProps<'button'>

export const IconButton = forwardRef<HTMLButtonElement, TProps>(
  ({ text, icon, size = 'sm', compacted, colorSchema = 'gray', ...props }, ref) => {
    const { className: iconClassName, ...iconProps } = icon.props

    return (
      <button
        ref={ref}
        {...props}
        className={StyleHelper.mergeStyles(
          'flex flex-col h-fit  justify-center items-center disabled:cursor-not-allowed disabled:opacity-50 flex-grow-0 rounded transition-colors hover:enabled:bg-gray-300/15 aria-selected:bg-gray-300/15 aria-selected:hover:bg-gray-300/30',
          {
            'py-1 px-2 gap-y-0.5': size === 'sm' && !compacted,
            'p-1 gap-y-0.5': size === 'sm' && compacted,
            'py-1.5 px-3 gap-y-1': size === 'md' && !compacted,
            'p-1 gap-y-1': size === 'md' && compacted,
            'text-neon ': colorSchema === 'neon',
            'text-gray-100 ': colorSchema === 'gray',
          },
          props.className
        )}
      >
        {cloneElement(icon, {
          className: StyleHelper.mergeStyles(
            'object-contain ',
            {
              'w-4 h-4': size === 'sm',
              'w-6 h-6': size === 'md',
            },
            iconClassName
          ),
          ...iconProps,
        })}
        {text && <span className="text-1xs whitespace-nowrap">{text}</span>}
      </button>
    )
  }
)
