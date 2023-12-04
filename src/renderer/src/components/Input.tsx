import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { MdCancel, MdSearch, MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

import { IconButton } from './IconButton'

type TProps = Omit<React.ComponentProps<'input'>, 'type'> & {
  containerClassName?: string
  errorMessage?: string
  error?: boolean
  clearable?: boolean
  compact?: boolean
  type?: 'text' | 'password' | 'search'
}

export const Input = forwardRef<HTMLInputElement, TProps>(
  ({ className, containerClassName, type, errorMessage, error, compact, clearable, ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null)
    const [hidden, setHidden] = useState(type === 'password')
    const realType = type === 'password' ? (hidden ? 'password' : 'text') : type

    const toggleHidden: React.MouseEventHandler<HTMLButtonElement> = event => {
      event.stopPropagation()
      setHidden(prev => !prev)
    }

    const clear = () => {
      if (internalRef.current) {
        internalRef.current.value = ''
        internalRef.current.focus()
      }
    }

    useImperativeHandle(ref, () => internalRef.current!, [])

    return (
      <div className={StyleHelper.mergeStyles('w-full', containerClassName)}>
        <div
          className={StyleHelper.mergeStyles(
            'flex items-center gap-x-1 rounded bg-asphalt ring-2 ring-transparent w-full px-5 outline-none font-medium placeholder:text-white/50 text-white',
            {
              'h-8.5 py-1.5 text-xs': compact,
              'h-12 py-2 text-sm': !compact,
              'ring-pink': !!errorMessage || error === true,
              'focus:ring-neon': !errorMessage || error === false,
              'pl-3': type === 'search',
              'pr-3': type === 'password' || clearable,
            },
            className
          )}
        >
          {type === 'search' && <MdSearch className="w-6 h-6 fill-gray-300/50" />}

          <input
            ref={internalRef}
            className={StyleHelper.mergeStyles('bg-transparent flex-grow outline-none', className)}
            type={realType}
            spellCheck="false"
            {...props}
          />

          {type === 'password' && (
            <IconButton icon={hidden ? <MdVisibility /> : <MdVisibilityOff />} onClick={toggleHidden} type="button" />
          )}

          {clearable && <IconButton icon={<MdCancel />} type="button" onClick={clear} />}
        </div>

        {errorMessage && <span className="block mt-1 text-xs text-pink">{errorMessage}</span>}
      </div>
    )
  }
)
