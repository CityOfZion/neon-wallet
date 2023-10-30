import { cloneElement } from 'react'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

export type TCustomClickableProps = {
  label: string
  leftIcon?: JSX.Element
  variant?: 'outlined' | 'contained'
  disabled?: boolean
  flat?: boolean
  iconFilled?: boolean
}

export type TClickableProps = TCustomClickableProps & React.ComponentProps<'div'>

const Outline = ({ leftIcon, label, disabled = false, iconFilled = true, flat = false, ...props }: TClickableProps) => {
  return (
    <div
      {...props}
      aria-disabled={disabled}
      className={StyleHelper.mergeStyles(
        'group flex items-center w-full border text-center rounded py-3 px-5 gap-x-2.5 cursor-pointer transition-colors aria-[disabled=false]:text-neon aria-[disabled=false]:border-neon aria-[disabled=false]:hover:bg-gray-200/15 aria-[disabled=true]:border-gray-100/50 aria-[disabled=true]:text-gray-100/50 aria-[disabled=true]:cursor-not-allowed',
        { 'h-12 text-sm': !flat },
        { 'h-8 text-xs': flat },
        props.className
      )}
    >
      {leftIcon &&
        cloneElement(leftIcon, {
          className: StyleHelper.mergeStyles(
            ' object-contain ',
            {
              'w-6 h-6': !flat,
              'w-5 h-5': flat,
              'fill-neon group-aria-[disabled=true]:fill-gray-100/50': iconFilled,
              'stroke-neon group-aria-[disabled=true]:stroke-gray-100/50': !iconFilled,
            },
            leftIcon.props.className
          ),
          ...leftIcon.props,
        })}

      <span className="flex-grow font-medium whitespace-nowrap">{label}</span>
    </div>
  )
}

const Contained = ({
  leftIcon,
  label,
  disabled = false,
  iconFilled = true,
  flat = false,
  ...props
}: TClickableProps) => {
  return (
    <div
      aria-disabled={disabled}
      className={StyleHelper.mergeStyles(
        'flex items-center text-center w-full py-3 px-5 gap-x-2.5 transition-colors rounded',
        'aria-[disabled=true]:bg-gray-200/30 aria-[disabled=true]:text-gray-100/50 aria-[disabled=true]:cursor-not-allowed',
        'aria-[disabled=false]:cursor-pointer aria-[disabled=false]:bg-gradient-to-t aria-[disabled=false]:from-gray-800 aria-[disabled=false]:to-gray-600 aria-[disabled=false]:text-neon aria-[disabled=false]:shadow-[4px_8px_20px_0px_rgba(18,21,23,0.40),inset_1px_1px_0px_0px_rgba(214,210,210,0.14),inset_-1px_-1px_0px_0px_rgba(0,0,0,0.32)] aria-[disabled=false]:hover:from-gray-600 aria-[disabled=false]:hover:to-gray-600',
        { 'h-12 text-sm': !flat },
        { 'h-8 text-xs': flat },
        props.className
      )}
    >
      {leftIcon &&
        cloneElement(leftIcon, {
          className: StyleHelper.mergeStyles(
            'object-contain ',
            {
              'w-6 h-6': !flat,
              'w-5 h-5': flat,
              'fill-neon group-aria-[disabled=true]:fill-gray-100/50': iconFilled,
              'stroke-neon group-aria-[disabled=true]:stroke-gray-100/50': !iconFilled,
            },

            leftIcon.props.className
          ),
          ...leftIcon.props,
        })}

      <span className="flex-grow font-medium whitespace-nowrap">{label}</span>
    </div>
  )
}

export const Clickable = (props: TClickableProps) => {
  return props.variant === 'outlined' ? <Outline {...props} /> : <Contained {...props} />
}
