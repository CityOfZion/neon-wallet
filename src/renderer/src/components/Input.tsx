import { forwardRef, useState } from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'

import { IconButton } from './IconButton'

type TProps = React.ComponentProps<'input'> & {
  containerClassName?: string
  errorMessage?: string
}

export const Input = forwardRef<HTMLInputElement, TProps>(
  ({ className, containerClassName, type, errorMessage, ...props }, ref) => {
    const [hidden, setHidden] = useState(type === 'password')
    const realType = type === 'password' ? (hidden ? 'password' : 'text') : type

    const toggleHidden: React.MouseEventHandler<HTMLButtonElement> = event => {
      event.stopPropagation()
      setHidden(prev => !prev)
    }

    return (
      <div className={twMerge('relative w-full', containerClassName)}>
        <input
          className={twMerge(
            'h-12 rounded bg-asphalt ring-2 ring-transparent w-full px-5 py-2 outline-none text-sm font-medium placeholder:text-white text-neon',
            errorMessage ? 'ring-magenta' : 'focus:ring-neon',
            className
          )}
          type={realType}
          {...props}
          ref={ref}
        />

        {type === 'password' && (
          <IconButton
            className="absolute right-5 top-6 transform -translate-y-1/2"
            icon={hidden ? <MdVisibility /> : <MdVisibilityOff />}
            onClick={toggleHidden}
            type="button"
          />
        )}

        <span className="text-xs text-magenta">{errorMessage}</span>
      </div>
    )
  }
)
