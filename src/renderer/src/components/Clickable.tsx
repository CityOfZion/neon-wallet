import { cloneElement } from 'react'
import { TbLoader2 } from 'react-icons/tb'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

export type TCustomClickableProps = {
  label: string
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  variant?: 'outlined' | 'contained' | 'text'
  disabled?: boolean
  loading?: boolean
  flat?: boolean
  colorSchema?: 'neon' | 'gray' | 'white' | 'error'
  iconsOnEdge?: boolean
}

export type TClickableProps = TCustomClickableProps & React.ComponentProps<'div'>

type TLoadingProps = {
  flat?: boolean
}

const Loading = ({ flat }: TLoadingProps) => {
  return (
    <div className="flex justify-center w-full">
      <TbLoader2 className={StyleHelper.mergeStyles('animate-spin', { 'w-6 h-6': !flat, 'w-5 h-5': flat })} />
    </div>
  )
}

const Outline = ({ className, colorSchema = 'neon', ...props }: TClickableProps) => {
  return (
    <Base
      className={StyleHelper.mergeStyles(
        className,
        'group flex items-center w-full justify-center border text-center rounded py-3 gap-x-2.5 cursor-pointer transition-colors aria-[disabled=false]:hover:bg-gray-300/15 aria-[disabled=true]:opacity-50 aria-[disabled=true]:cursor-not-allowed',
        {
          'aria-[disabled=false]:text-neon aria-[disabled=false]:border-neon': colorSchema === 'neon',
          'aria-[disabled=false]:text-gray-100 aria-[disabled=false]:border-gray-100': colorSchema === 'gray',
          'aria-[disabled=false]:text-white aria-[disabled=false]:border-white': colorSchema === 'white',
          'aria-[disabled=false]:text-pink aria-[disabled=false]:border-pink': colorSchema === 'error',
        }
      )}
      {...props}
    />
  )
}

const Contained = ({ className, ...props }: TClickableProps) => {
  return (
    <Base
      className={StyleHelper.mergeStyles(
        'flex justify-center items-center text-center w-full py-3 gap-x-2.5 transition-colors rounded',
        'aria-[disabled=true]:bg-gray-300/30 aria-[disabled=true]:text-gray-100/50 aria-[disabled=true]:cursor-not-allowed',
        'aria-[disabled=false]:cursor-pointer aria-[disabled=false]:bg-gradient-to-t aria-[disabled=false]:from-gray-800 aria-[disabled=false]:to-gray-600 aria-[disabled=false]:shadow-[4px_8px_20px_0px_rgba(18,21,23,0.40),inset_1px_1px_0px_0px_rgba(214,210,210,0.14),inset_-1px_-1px_0px_0px_rgba(0,0,0,0.32)] aria-[disabled=false]:hover:from-gray-600 aria-[disabled=false]:hover:to-gray-600',
        className
      )}
      {...props}
    />
  )
}

const Text = ({ className, ...props }: TClickableProps) => {
  return (
    <Base
      className={StyleHelper.mergeStyles(className, 'flex justify-center items-center text-center w-full gap-x-1.5')}
      {...props}
    />
  )
}

const Base = ({
  leftIcon,
  rightIcon,
  label,
  disabled = false,
  loading = false,
  flat = false,
  colorSchema = 'neon',
  iconsOnEdge = true,
  ...props
}: TClickableProps) => {
  const { className: leftIconClassName = '', ...leftIconProps } = leftIcon ? leftIcon.props : {}
  const { className: rightIconClassName = '', ...rightIconProps } = rightIcon ? rightIcon.props : {}

  const isDisabled = disabled ?? loading

  const buildIconClassName = (className: string) => {
    return StyleHelper.mergeStyles(
      'object-contain group-aria-[disabled=true]:fill-gray-100/50',
      {
        'w-6 h-6': !flat,
        'w-5 h-5': flat,
        'text-neon': colorSchema === 'neon',
        'text-gray-200': colorSchema === 'gray',
        'text-white': colorSchema === 'white',
        'text-pink': colorSchema === 'error',
        'text-gray-100/50': isDisabled,
      },
      className
    )
  }

  return (
    <div
      aria-disabled={isDisabled}
      className={StyleHelper.mergeStyles(
        {
          'h-12 text-sm px-5': !flat,
          'h-8.5 text-xs px-4': flat,
          'aria-[disabled=false]:text-neon': colorSchema === 'neon',
          'aria-[disabled=false]:text-gray-200': colorSchema === 'gray',
          'aria-[disabled=false]:text-white': colorSchema === 'white',
          'aria-[disabled=false]:text-pink': colorSchema === 'error',
        },

        props.className
      )}
    >
      {!loading ? (
        <>
          {leftIcon &&
            cloneElement(leftIcon, {
              className: buildIconClassName(leftIconClassName),
              ...leftIconProps,
            })}

          <span
            className={StyleHelper.mergeStyles('font-medium whitespace-nowrap', {
              'flex-grow': iconsOnEdge,
            })}
          >
            {label}
          </span>

          {rightIcon &&
            cloneElement(rightIcon, {
              className: buildIconClassName(rightIconClassName),
              ...rightIconProps,
            })}
        </>
      ) : (
        <Loading flat={flat} />
      )}
    </div>
  )
}

export const Clickable = (props: TClickableProps) => {
  return props.variant === 'outlined' ? (
    <Outline {...props} />
  ) : props.variant === 'text' ? (
    <Text {...props} />
  ) : (
    <Contained {...props} />
  )
}
