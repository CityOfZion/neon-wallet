import { cloneElement } from 'react'
import { twMerge } from 'tailwind-merge'

export type TCustomClickableProps = {
  label: string
  leftIcon?: JSX.Element
  variant?: 'outlined' | 'contained'
  disabled?: boolean
}

export type TClickableProps = TCustomClickableProps & React.ComponentProps<'div'>

const Outline = ({ leftIcon, label, disabled, ...props }: TClickableProps) => {
  return (
    <div
      {...props}
      className={twMerge(
        'flex items-center w-full h-12  border rounded py-3 px-5 gap-x-2.5 cursor-pointer  transition-colors',
        disabled
          ? 'border-gray-100/50 text-gray-100/50 cursor-not-allowed'
          : 'text-neon border-neon hover:bg-gray-200/15',
        props.className
      )}
    >
      {leftIcon &&
        cloneElement(leftIcon, {
          className: twMerge('w-6 h-6 fill-neon object-contain', leftIcon.props.className),
          ...leftIcon.props,
        })}

      <span className="flex-grow text-center text-sm font-medium whitespace-nowrap">{label}</span>
    </div>
  )
}

const Contained = ({ leftIcon, label, disabled, ...props }: TClickableProps) => {
  return (
    <div
      className={twMerge(
        'flex items-center w-full h-12 py-3 px-5 gap-x-2.5 cursor-pointer transition-colors rounded ',
        disabled
          ? 'bg-gray-200/30 text-gray-100/50 cursor-not-allowed'
          : 'bg-gradient-to-t from-gray-800 to-gray-600 text-neon shadow-[4px_8px_20px_0px_rgba(18,21,23,0.40),inset_1px_1px_0px_0px_rgba(214,210,210,0.14),inset_-1px_-1px_0px_0px_rgba(0,0,0,0.32)] hover:from-gray-600 hover:to-gray-600',
        props.className
      )}
    >
      {leftIcon &&
        cloneElement(leftIcon, {
          className: twMerge('w-6 h-6 fill-neon object-contain', leftIcon.props.className),
          ...leftIcon.props,
        })}

      <span className="flex-grow text-center text-sm font-medium whitespace-nowrap">{label}</span>
    </div>
  )
}

export const Clickable = (props: TClickableProps) => {
  return props.variant === 'outlined' ? <Outline {...props} /> : <Contained {...props} />
}
