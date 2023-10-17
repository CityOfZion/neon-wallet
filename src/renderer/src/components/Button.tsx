import { cloneElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  label: string
  leftIcon?: JSX.Element
  variant?: 'outlined' | 'contained'
} & React.ComponentProps<'button'>

const OutlineButton = ({ leftIcon, label, ...props }: Props) => {
  return (
    <button
      {...props}
      className={twMerge(
        props.className,
        'flex items-center w-full h-12 text-neon border-neon border rounded py-3 px-5 gap-x-2.5 cursor-pointer hover:bg-neon/5 transition-colors'
      )}
    >
      {leftIcon &&
        cloneElement(leftIcon, {
          className: twMerge('w-6 h-6 fill-neon object-contain', leftIcon.props.className),
          ...leftIcon.props,
        })}

      <span className="flex-grow text-center text-sm font-medium whitespace-nowrap">{label}</span>
    </button>
  )
}

const ContainedButton = ({ leftIcon, label, ...props }: Props) => {
  return (
    <button
      {...props}
      className={twMerge(
        props.className,
        'flex items-center w-full h-12  py-3 px-5 gap-x-2.5 cursor-pointer hover:bg-[linear-gradient(180deg,#273139_0%,#42535D_100%)] transition-colors text-neon rounded bg-[linear-gradient(180deg,#42535D_0%,#273139_100%)] shadow-[4px_8px_20px_0px_rgba(18,21,23,0.40),inset_1px_1px_0px_0px_rgba(214,210,210,0.14),inset_-1px_-1px_0px_0px_rgba(0,0,0,0.32)]'
      )}
    >
      {leftIcon &&
        cloneElement(leftIcon, {
          className: twMerge('w-6 h-6 fill-neon object-contain', leftIcon.props.className),
          ...leftIcon.props,
        })}

      <span className="flex-grow text-center text-sm font-medium whitespace-nowrap">{label}</span>
    </button>
  )
}

export const Button = (props: Props) => {
  return props.variant === 'outlined' ? <OutlineButton {...props} /> : <ContainedButton {...props} />
}
