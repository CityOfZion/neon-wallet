import { forwardRef, useState } from 'react'
import { MdSearch, MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

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
      <div className={StyleHelper.mergeStyles('relative w-full', containerClassName)}>
        {type === 'search' && (
          <IconButton
            className="absolute left-1 top-2 transform"
            size="md"
            icon={<MdSearch />}
            compacted
            type="button"
          />
        )}

        <input
          className={StyleHelper.mergeStyles(
            'h-12 rounded bg-asphalt ring-2 ring-transparent w-full px-5 py-2 outline-none text-sm font-medium placeholder:text-white/50 text-neon',
            {
              'ring-magenta': !!errorMessage,
              'focus:ring-neon': !errorMessage,
              'pl-10': type === 'search',
            },
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

        {errorMessage && <span className="block mt-1 text-xs text-magenta">{errorMessage}</span>}
      </div>
    )
  }
)
